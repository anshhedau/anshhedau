import { motion } from 'framer-motion';
import { getExperience } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const experiences = getExperience();

const Experience = () => {
  return (
    <section id="experience" className="section-spacing relative">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[hsl(220_90%_50%/0.08)] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <div className="mb-14">
            <span className="section-label mb-4 inline-block">Trajectory</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4">
              Where I've <span className="display-serif text-gradient">worked</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl">
          <div className="relative pl-8 space-y-10" style={{ borderLeft: '1px dashed hsl(var(--border))' }}>
            {experiences.map((exp, index) => {
              const achievements = (exp.achievements as string[]) || [];
              const skillsUsed = (exp.skills_used as string[]) || [];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className="timeline-dot" />
                  <div className="glass-card p-6 group">
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h3 className="font-display text-xl font-semibold">{exp.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {exp.type && (<span className="section-label text-[10px] py-0.5 px-2 tracking-[0.2em]">{exp.type}</span>)}
                          <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        {exp.company_logo && (
                          <img src={exp.company_logo} alt={exp.company} className="w-7 h-7 rounded object-contain bg-white/5 p-0.5" />
                        )}
                        <a href={exp.companyLink} target="_blank" rel="noopener noreferrer"
                          className="text-primary-glow hover:underline underline-offset-4 font-medium">
                          {exp.company}
                        </a>
                        {exp.location && (
                          <span className="text-sm text-muted-foreground">· {exp.location}</span>
                        )}
                      </div>

                      <p className="leading-relaxed mb-4 text-foreground/80">{exp.description}</p>

                      {achievements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-display uppercase tracking-[0.2em] text-primary-glow mb-3">Key Achievements</p>
                          <ul className="space-y-2">
                            {achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {skillsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
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
