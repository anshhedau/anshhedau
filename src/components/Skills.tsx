import { Palette, Code, Cpu, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Design',
    icon: Palette,
    skills: ['UI/UX Design', 'Figma', 'Branding', 'Design Systems', 'Prototyping', 'Visual Design'],
  },
  {
    title: 'Development',
    icon: Code,
    skills: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Git', 'PHP', 'MySQL'],
  },
  {
    title: 'Tech & AI',
    icon: Cpu,
    skills: ['Computer Vision', 'ESP32', 'Python', 'OCR', 'Machine Learning', 'IoT'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['VS Code', 'GitHub', 'Linux', 'Vercel', 'Notion', 'AWS'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-spacing">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Skills</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            What I work with
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-card border border-border rounded-xl p-6 card-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
