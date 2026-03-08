import { motion } from 'framer-motion';
import { getExperience } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const experiences = getExperience();

const Experience = () => {
  return (
    <section id="experience" className="section-spacing relative">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[hsl(200_80%_50%/0.04)] rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <span className="section-label mb-4 inline-block">Experience</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-16">
            Where I've worked
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl">
          <div className="relative border-l-2 border-border pl-8 space-y-10">
            {experiences.map((exp, index) => {
              const achievements = (exp.achievements as string[]) || [];
              const skillsUsed = (exp.skills_used as string[]) || [];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className="timeline-dot" />
                  <div className="glass-card p-6 group">
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                          {exp.type && (
                            <span className="section-label text-[10px] py-0.5 px-2">{exp.type}</span>
                          )}
                          <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{exp.period}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        {exp.company_logo && (
                          <img src={exp.company_logo} alt={exp.company} className="w-6 h-6 rounded object-contain" />
                        )}
                        <a href={exp.companyLink} target="_blank" rel="noopener noreferrer"
                          className="text-primary hover:underline underline-offset-4 font-medium">
                          {exp.company}
                        </a>
                        {exp.location && (
                          <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>· {exp.location}</span>
                        )}
                      </div>
                      
                      <p className="leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>{exp.description}</p>

                      {achievements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Key Achievements:</p>
                          <ul className="space-y-1.5">
                            {achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {skillsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {skillsUsed.map((s, i) => (
                            <span key={i} className="skill-tag text-xs">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
