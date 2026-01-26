import { Mail, Linkedin, Github, Instagram, ExternalLink } from 'lucide-react';

const contactLinks = [
  {
    name: 'Email',
    value: 'anshhedau@outlook.com',
    href: 'mailto:anshhedau@outlook.com',
    icon: Mail,
  },
  {
    name: 'LinkedIn',
    value: '/in/anshhedau',
    href: 'https://linkedin.com/in/anshhedau',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    value: '/anshhedau1',
    href: 'https://github.com/anshhedau1',
    icon: Github,
  },
  {
    name: 'Instagram',
    value: '@anshhedau_',
    href: 'https://instagram.com/anshhedau_',
    icon: Instagram,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-spacing bg-card/30">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
            Let's connect
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>

          {/* Contact Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all group card-glow"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">{link.name}</p>
                    <p className="text-foreground font-medium">{link.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="mailto:anshhedau@outlook.com"
            className="btn-primary inline-flex"
          >
            <Mail className="w-5 h-5" />
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
