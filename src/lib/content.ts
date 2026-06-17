// Content loader: parses YAML frontmatter from markdown files
// using js-yaml for full YAML spec compliance (handles |, |+, >, >-, nested lists, etc.)
import yaml from 'js-yaml';

function parseFrontmatter(raw: string): Record<string, any> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    const data = yaml.load(match[1]);
    return (data && typeof data === 'object') ? (data as Record<string, any>) : {};
  } catch (err) {
    console.error('Failed to parse frontmatter:', err);
    return {};
  }
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

export function getSkills() { return loadCollection(skillFiles); }
export function getProjects() { return loadCollection(projectFiles); }
export function getExperience() { return loadCollection(experienceFiles); }

export function getProjectBySlug(slug: string): Record<string, any> | null {
  const all = getProjects();
  return all.find((p) => p.id === slug) || null;
}

export function getHero() { return getSingleContent('hero'); }
export function getAbout() { return getSingleContent('about'); }
export function getContact() { return getSingleContent('contact'); }
export function getFooter() { return getSingleContent('footer'); }
export function getResume() { return getSingleContent('resume'); }
export function getNavigation() { return getSingleContent('navigation'); }
export function getSeo() { return getSingleContent('seo'); }
