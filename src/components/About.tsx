import { getAbout } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const about = getAbout();
const paragraphs = (about.paragraphs as string[]) || [];
const beliefs = (about.beliefs as string[]) || [];
const stats = (about.stats as Array<{ label: string; value: string }>) || [];

const About = () => {
  return (
    <section id="about" className="section-spacing relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <span className="section-label mb-4 inline-block">{about.subheading || 'About'}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2">
              {about.heading || 'A bit about me'}
            </h2>
          </AnimatedSection>

          {/* Profile Image */}
          {about.profile_image && (
            <AnimatedSection delay={0.1}>
              <div className="my-10 glass-card p-2 max-w-sm">
                <img src={about.profile_image} alt="About me" className="w-full h-auto rounded-lg" />
              </div>
            </AnimatedSection>
          )}

          {/* Content */}
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {paragraphs.map((p, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.05}>
                <p>{p}</p>
              </AnimatedSection>
            ))}

            {/* Stats */}
            {stats.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-10 border-t border-border">
                  {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-5 text-center">
                      <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                      <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {beliefs.length > 0 && (
              <AnimatedSection delay={0.3}>
                <div className="pt-8 border-t border-border mt-10">
                  <h3 className="font-semibold mb-5 text-[hsl(var(--foreground))]">What I believe in:</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {beliefs.map((belief, i) => (
                      <li key={i} className="flex items-center gap-3 glass-card px-4 py-3">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                        <span>{belief}</span>
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
