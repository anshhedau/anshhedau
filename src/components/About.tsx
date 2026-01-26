const About = () => {
  return (
    <section id="about" className="section-spacing bg-card/30">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">About</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              A bit about me
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a <span className="text-foreground font-medium">Computer Science student specializing in Cloud Computing at DYPIU</span>, 
              passionate about building things that live at the intersection of design and technology.
            </p>
            
            <p>
              Whether it's crafting <span className="text-foreground">intuitive user interfaces</span>, 
              developing <span className="text-foreground">cloud-native solutions</span>, or leading 
              design projects — I thrive on turning complex ideas into elegant, functional products.
            </p>

            <p>
              I founded <span className="text-primary font-medium">SnapWeaz</span>, a design and tech 
              studio where I work on real-world projects, collaborate with talented people, and 
              continuously push the boundaries of what's possible.
            </p>

            <div className="pt-6 border-t border-border mt-8">
              <h3 className="text-foreground font-medium mb-4">What I believe in:</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Design with purpose</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Build to last</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Simplicity over complexity</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Learn by doing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
