import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Greeting tag */}
        <div className="fade-in-up stagger-1">
          <span className="inline-block px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-full mb-8">
            CSE · Cloud Computing
            Designer · Engineer · Builder
          </span>
        </div>

        {/* Name */}
        <h1 className="fade-in-up stagger-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
          Hey, I'm{' '}
          <span className="text-gradient">Ansh Hedau</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in-up stagger-3 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          I design and build products that merge{' '}
          <span className="text-foreground">aesthetics</span> with{' '}
          <span className="text-foreground">innovation</span>.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors scroll-indicator"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
};

export default Hero;
