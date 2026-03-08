import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

export const projects = getProjects();

const Projects = () => {
  return (
    <section id="projects" className="section-spacing relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <span className="section-label mb-4 inline-block">Projects</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-16">
            Things I've built
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="project-card group block h-full"
              >
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{project.role}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10"
                      style={{ background: 'hsl(var(--glass-bg))' }}
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" style={{ color: 'hsl(var(--muted-foreground))' }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {(project.tech as string[] || []).map((tech: string) => (
                      <span key={tech} className="skill-tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
