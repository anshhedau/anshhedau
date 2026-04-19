import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getHero } from '@/lib/content';

const hero = getHero();

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative px-5 sm:px-6 overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="gradient-orb w-[600px] h-[600px] bg-primary/30 -top-20 -left-20" />
      <div className="gradient-orb w-[500px] h-[500px] bg-[hsl(280_80%_60%/0.25)] bottom-0 -right-20" style={{ animationDelay: '-7s' }} />
      <div className="gradient-orb w-[300px] h-[300px] bg-[hsl(220_90%_50%/0.2)] top-[40%] left-[40%]" style={{ animationDelay: '-14s' }} />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* PORTRAIT — left, asymmetric */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative w-[220px] sm:w-[300px] lg:w-[400px] aspect-square mx-auto lg:mx-0">
              {/* glow ring */}
              <div className="absolute -inset-6 rounded-full opacity-70 blur-3xl" style={{ background: 'var(--gradient-primary)' }} />
              {/* rotating border */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, hsl(243 75% 59%), hsl(280 85% 70%), hsl(220 90% 60%), hsl(243 75% 59%))' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-1 rounded-full bg-background overflow-hidden">
                {hero.profile_image ? (
                  <img src={hero.profile_image} alt={hero.name || 'Ansh Hedau'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full mesh-gradient" />
                )}
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -top-2 -right-4 sm:right-0 glass-card px-3 py-2 flex items-center gap-2 text-xs font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-[hsl(140_70%_55%)] animate-pulse" />
                Available for work
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-3 -left-3 sm:-left-6 glass-card px-3 py-2 flex items-center gap-2 text-xs font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
                Building
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-1/2 -right-8 sm:-right-12 hidden sm:flex glass-card w-20 h-20 items-center justify-center text-center"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Since</p>
                  <p className="text-lg font-bold text-gradient">'24</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* TEXT — right */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="section-label mb-6 inline-block">
                {hero.tagline || 'CSE · Cloud · Builder'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.95] tracking-tight font-semibold mb-6 break-words"
            >
              <span className="block">Hey, I'm</span>
              <span className="block">
                <span className="text-gradient">{(hero.name || 'Ansh').split(' ')[0]}</span>{' '}
                <span className="display-serif text-foreground/90">{(hero.name || 'Ansh Hedau').split(' ').slice(1).join(' ') || 'Hedau'}</span>
                <span className="text-primary-glow">.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg sm:text-xl max-w-xl mb-10 leading-relaxed text-muted-foreground"
            >
              {hero.subtitle || 'I design and build products that merge aesthetics with innovation.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href={hero.cta_primary_link || '#projects'} className="btn-primary">
                {hero.cta_primary_text || 'View My Work'}
              </a>
              <a href={hero.cta_secondary_link || '#contact'} className="btn-outline">
                {hero.cta_secondary_text || 'Get in Touch'}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
        aria-label="Scroll to about"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
};

export default Hero;
