import { getAbout } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const about = getAbout();
const paragraphs = (about.paragraphs as string[]) || [];
const beliefs = (about.beliefs as string[]) || [];
const stats = (about.stats as Array<{ label: string; value: string }>) || [];

const About = () => {
  return (
    <section id="about" className="section-spacing relative">
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(280_80%_60%/0.06)] rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Sticky label column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <AnimatedSection>
              <span className="section-label mb-6 inline-block">{about.subheading || 'About'}</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                A bit <span className="display-serif text-gradient">about me</span>
              </h2>
            </AnimatedSection>
          </div>

          {/* Content column */}
          <div className="lg:col-span-8 space-y-8">
            {paragraphs.map((p, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.06}>
                <p className="text-lg lg:text-xl leading-relaxed text-foreground/85 first:text-2xl first:lg:text-[1.65rem] first:font-light first:leading-snug">
                  {p}
                </p>
              </AnimatedSection>
            ))}

            {stats.length > 0 && (
              <AnimatedSection delay={0.25}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-border">
                  {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-5">
                      <p className="font-display text-3xl md:text-4xl font-semibold text-gradient">{stat.value}</p>
                      <p className="text-sm mt-2 text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {beliefs.length > 0 && (
              <AnimatedSection delay={0.35}>
                <div className="pt-8 border-t border-border mt-6">
                  <h3 className="font-display text-sm uppercase tracking-[0.24em] text-primary-glow mb-5">What I believe in</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {beliefs.map((belief, i) => (
                      <li key={i} className="flex items-center gap-3 glass-card px-4 py-3.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                        <span className="text-sm">{belief}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
