import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { getHero } from '@/lib/content';

const hero = getHero();

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating orbs */}
      <div className="gradient-orb w-[500px] h-[500px] bg-primary/10 top-[10%] left-[10%]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-[hsl(260_80%_60%/0.08)] bottom-[10%] right-[10%]" style={{ animationDelay: '-7s' }} />
      <div className="gradient-orb w-[300px] h-[300px] bg-[hsl(200_80%_50%/0.06)] top-[60%] left-[60%]" style={{ animationDelay: '-14s' }} />


      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="section-label text-xs mb-10 inline-block">
            {hero.tagline || 'CSE · Cloud Computing · Developer · Builder'}
          </span>
        </motion.div>

        {/* Name with staggered reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.05] tracking-tight"
        >
          Hey, I'm{' '}
          <span className="text-gradient">{hero.name || 'Ansh Hedau'}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {hero.subtitle || 'I design and build products that merge aesthetics with innovation.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href={hero.cta_primary_link || '#projects'} className="btn-primary">
            {hero.cta_primary_text || 'View My Work'}
          </a>
          <a href={hero.cta_secondary_link || '#contact'} className="btn-outline">
            {hero.cta_secondary_text || 'Get in Touch'}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator"
        style={{ color: 'hsl(var(--muted-foreground))' }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
};

export default Hero;
