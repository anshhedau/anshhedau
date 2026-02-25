import { getAbout } from '@/lib/content';

const about = getAbout();
const paragraphs = (about.paragraphs as string[]) || [];
const beliefs = (about.beliefs as string[]) || [];
const stats = (about.stats as Array<{ label: string; value: string }>) || [];

const About = () => {
  return (
    <section id="about" className="section-spacing bg-card/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">{about.subheading || 'About'}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              {about.heading || 'A bit about me'}
            </h2>
          </div>

          {/* Profile Image */}
          {about.profile_image && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-border max-w-sm">
              <img src={about.profile_image} alt="About me" className="w-full h-auto" />
            </div>
          )}

          {/* Content */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border mt-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {beliefs.length > 0 && (
              <div className="pt-6 border-t border-border mt-8">
                <h3 className="text-foreground font-medium mb-4">What I believe in:</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {beliefs.map((belief, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{belief}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
