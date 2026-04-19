import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

export const projects = getProjects();

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const num = String((index % projects.length) + 1).padStart(2, '0');
  return (
    <Link
      to={`/projects/${project.id}`}
      className="project-card group block overflow-hidden shrink-0 w-[300px] sm:w-[360px] md:w-[420px]"
    >
      {project.cover_image && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden">
          <img
            src={project.cover_image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <span className="absolute top-4 left-4 font-display text-xs tracking-[0.3em] text-primary-glow">— {num}</span>
        </div>
      )}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:text-gradient transition-colors duration-300 leading-tight truncate">
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
  );
};

const Projects = () => {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...projects, ...projects];

  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.08] rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <AnimatedSection>
          <div className="mb-12">
            <span className="section-label mb-4 inline-block">Selected Work</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4">
              Things I've <span className="display-serif text-gradient">built</span>
            </h2>
          </div>
        </AnimatedSection>
      </div>

      {/* Infinite marquee — pauses on hover */}
      <div className="marquee group relative max-w-[100vw] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex gap-5 py-4 px-6 w-max group-hover:[animation-play-state:paused]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: Math.max(28, projects.length * 7), ease: 'linear', repeat: Infinity }}
        >
          {loop.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
