import { Palette, Code, Cpu, Wrench, Globe, Server, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSkills } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const iconMap: Record<string, any> = { Palette, Code, Cpu, Wrench, Globe, Server, Database, Shield };
const skillCategories = getSkills();

const Skills = () => {
  return (
    <section id="skills" className="section-spacing relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[hsl(260_80%_60%/0.04)] rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <span className="section-label mb-4 inline-block">Skills</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-16">
            What I work with
          </h2>
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
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card p-6 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(83_100%_59%/0.2)]"
                    style={{ background: 'hsl(83 100% 59% / 0.08)' }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
