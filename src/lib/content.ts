// Simple YAML frontmatter parser for content files
// Parses --- delimited frontmatter from .md files loaded via import.meta.glob

function parseFrontmatter(raw: string): Record<string, any> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return parseYaml(match[1]);
}

function parseYaml(yaml: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = yaml.split('\n');
  let currentKey = '';
  let currentList: string[] | Record<string, string>[] | null = null;
  let listItemObj: Record<string, string> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') continue;

    // Nested list item field (e.g., "    name: value")
    const nestedField = line.match(/^    (\w+):\s*"?(.+?)"?\s*$/);
    if (nestedField && listItemObj !== null) {
      listItemObj[nestedField[1]] = nestedField[2].replace(/^"|"$/g, '');
      continue;
    }

    // List item that is an object (e.g., "  - name: value")
    const listObjItem = line.match(/^  - (\w+):\s*"?(.+?)"?\s*$/);
    if (listObjItem && currentList !== null) {
      if (listItemObj) {
        (currentList as Record<string, string>[]).push(listItemObj);
      }
      listItemObj = { [listObjItem[1]]: listObjItem[2].replace(/^"|"$/g, '') };
      continue;
    }

    // Simple list item (e.g., "  - value")
    const listItem = line.match(/^  - "?(.+?)"?\s*$/);
    if (listItem && currentList !== null && listItemObj === null) {
      (currentList as string[]).push(listItem[1].replace(/^"|"$/g, ''));
      continue;
    }

    // Key-value pair
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      // Flush previous list
      if (currentList !== null) {
        if (listItemObj) {
          (currentList as Record<string, string>[]).push(listItemObj);
          listItemObj = null;
        }
        result[currentKey] = currentList;
        currentList = null;
      }

      const key = kv[1];
      let value: any = kv[2].replace(/^"|"$/g, '');

      // Boolean
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      // Number
      else if (/^\d+$/.test(value)) value = parseInt(value, 10);

      result[key] = value;
      currentKey = key;
      continue;
    }

    // Key with no value (start of list)
    const listStart = line.match(/^(\w+):$/);
    if (listStart) {
      // Flush previous list
      if (currentList !== null) {
        if (listItemObj) {
          (currentList as Record<string, string>[]).push(listItemObj);
          listItemObj = null;
        }
        result[currentKey] = currentList;
      }
      currentKey = listStart[1];
      currentList = [];
      listItemObj = null;
      continue;
    }
  }

  // Flush final list
  if (currentList !== null) {
    if (listItemObj) {
      (currentList as Record<string, string>[]).push(listItemObj);
    }
    result[currentKey] = currentList;
  }

  return result;
}

// ── Load single file collections ──

const singleFiles = import.meta.glob('/content/*.md', { as: 'raw', eager: true });

export function getSingleContent(name: string): Record<string, any> {
  const raw = singleFiles[`/content/${name}.md`];
  if (!raw) return {};
  return parseFrontmatter(raw as string);
}

// ── Load folder collections ──

const skillFiles = import.meta.glob('/content/skills/*.md', { as: 'raw', eager: true });
const projectFiles = import.meta.glob('/content/projects/*.md', { as: 'raw', eager: true });
const experienceFiles = import.meta.glob('/content/experience/*.md', { as: 'raw', eager: true });

function loadCollection(files: Record<string, unknown>): Record<string, any>[] {
  return Object.values(files)
    .map((raw) => parseFrontmatter(raw as string))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getSkills() {
  return loadCollection(skillFiles);
}

export function getProjects() {
  return loadCollection(projectFiles);
}

export function getExperience() {
  return loadCollection(experienceFiles);
}

export function getHero() {
  return getSingleContent('hero');
}

export function getAbout() {
  return getSingleContent('about');
}

export function getContact() {
  return getSingleContent('contact');
}

export function getFooter() {
  return getSingleContent('footer');
}

export function getResume() {
  return getSingleContent('resume');
}
