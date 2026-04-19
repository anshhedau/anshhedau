import { Link } from 'react-router-dom';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getProjects } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

export const projects = getProjects();

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const num = String((index % projects.length) + 1).padStart(2, '0');
  return (
    <Link
      to={`/projects/${project.id}`}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className="project-card group block overflow-hidden shrink-0 w-[300px] sm:w-[360px] md:w-[420px] select-none"
    >
      {project.cover_image && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/10] overflow-hidden">
          <img
            src={project.cover_image}
            alt={project.title}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
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

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const speed = 40; // px per second
  const dragStartX = useRef(0);
  const dragStartPointer = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrapX = (next: number) => {
    const track = trackRef.current;
    const half = track ? track.scrollWidth / 2 : 0;
    if (!half) return next;
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    return next;
  };

  const pauseAndScheduleResume = (ms = 1200) => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), ms);
  };

  // Continuously animates x leftward; wraps when half the track has passed
  useAnimationFrame((_, delta) => {
    if (paused) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (!half) return;
    x.set(wrapX(x.get() - (speed * delta) / 1000));
  });

  const handleDragStart = (_: any, info: { point: { x: number } }) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
    dragStartX.current = x.get();
    dragStartPointer.current = info.point.x;
  };

  const handleDrag = (_: any, info: { point: { x: number } }) => {
    x.set(wrapX(dragStartX.current + (info.point.x - dragStartPointer.current)));
  };

  const handleDragEnd = () => pauseAndScheduleResume();

  // Wheel / trackpad horizontal scroll support — captures both horizontal and
  // vertical wheel deltas while the cursor is inside the marquee.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      // Only intercept when the user is clearly scrolling horizontally OR using a trackpad swipe.
      // For a regular mouse wheel (vertical only), let the page scroll normally.
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      pauseAndScheduleResume();
      x.set(wrapX(x.get() - delta));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [x]);

  return (
    <section id="projects" className="section-spacing relative overflow-x-clip">
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

      {/* Auto-looping marquee — pauses on hover, supports drag + trackpad swipe */}
      <div
        ref={containerRef}
        className="marquee group relative max-w-[100vw] overflow-x-clip overflow-y-visible"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          ref={trackRef}
          className="flex gap-5 py-12 px-6 w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
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
