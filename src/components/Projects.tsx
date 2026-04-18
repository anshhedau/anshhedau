import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { getProjects } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

export const projects = getProjects();

const Projects = () => {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 480, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.08] rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="section-label mb-4 inline-block">Selected Work</span>
              <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4">
                Things I've <span className="display-serif text-gradient">built</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground hidden sm:block">{projects.length} projects · scroll →</p>
              <button onClick={() => scroll(-1)} aria-label="Previous" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:text-primary-glow">←</button>
              <button onClick={() => scroll(1)} aria-label="Next" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:text-primary-glow">→</button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Horizontal rail breaks out of container */}
      <div ref={railRef} className="h-rail max-w-[100vw]">
        {projects.map((project, index) => {
          const num = String(index + 1).padStart(2, '0');
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="project-card group block h-full overflow-hidden"
              >
                {/* Cover */}
                {project.cover_image && (
                  <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden">
                    <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <span className="absolute top-4 left-4 font-display text-xs tracking-[0.3em] text-primary-glow">— {num}</span>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold group-hover:text-gradient transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">{project.role}</span>
                    </div>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 shrink-0 bg-glass">
                      <ArrowUpRight className="w-4 h-4 group-hover:text-primary-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-muted-foreground" />
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech as string[] || []).slice(0, 5).map((tech: string) => (
                      <span key={tech} className="skill-tag text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
