import { getExperience } from '@/lib/content';

const experiences = getExperience();

const Experience = () => {
  return (
    <section id="experience" className="section-spacing">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Experience</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            Where I've worked
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl">
          <div className="relative border-l-2 border-border pl-8 space-y-12">
            {experiences.map((exp, index) => {
              const achievements = (exp.achievements as string[]) || [];
              const skillsUsed = (exp.skills_used as string[]) || [];
              return (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="timeline-dot" />
                  
                  {/* Content */}
                  <div className="bg-card border border-border rounded-xl p-6 card-glow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {exp.type && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md">
                            {exp.type}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      {exp.company_logo && (
                        <img src={exp.company_logo} alt={exp.company} className="w-6 h-6 rounded object-contain" />
                      )}
                      <a
                        href={exp.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4 font-medium"
                      >
                        {exp.company}
                      </a>
                      {exp.location && (
                        <span className="text-sm text-muted-foreground">· {exp.location}</span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {achievements.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-foreground mb-2">Key Achievements:</p>
                        <ul className="space-y-1.5">
                          {achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills Used */}
                    {skillsUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {skillsUsed.map((s, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
