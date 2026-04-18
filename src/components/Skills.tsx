import { Palette, Code, Cpu, Wrench, Globe, Server, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSkills } from '@/lib/content';
import AnimatedSection from './AnimatedSection';
import TiltCard from './TiltCard';

const iconMap: Record<string, any> = { Palette, Code, Cpu, Wrench, Globe, Server, Database, Shield };
const skillCategories = getSkills();

const Skills = () => {
  return (
    <section id="skills" className="section-spacing relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(280_80%_60%/0.08)] rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <span className="section-label mb-4 inline-block">Capabilities</span>
              <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4">
                What I work <span className="display-serif text-gradient">with</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">A toolkit refined across design systems, full-stack engineering and cloud infrastructure.</p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Wrench;
            const skills = (category.skills as string[]) || [];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <TiltCard max={6}>
                  <div className="glass-card p-6 group h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_hsl(243_75%_59%/0.4)]"
                        style={{ background: 'linear-gradient(135deg, hsl(243 75% 59% / 0.18), hsl(280 80% 60% / 0.12))' }}
                      >
                        <Icon className="w-5 h-5 text-primary-glow" />
                      </div>
                      <h3 className="font-display font-semibold text-lg">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {skills.map((skill) => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
