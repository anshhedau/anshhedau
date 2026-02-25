import { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter } from 'lucide-react';
import { getContact } from '@/lib/content';

const iconMap: Record<string, any> = { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter };

const contact = getContact();
const contactLinks = (contact.links as Array<{ name: string; value: string; href: string; icon: string }>) || [];

const Contact = () => {
  return (
    <section id="contact" className="section-spacing bg-card/30">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
            {contact.heading || "Let's connect"}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            {contact.subheading || "Have a project in mind or just want to say hi? I'd love to hear from you."}
          </p>

          {/* Contact Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {contactLinks.map((link) => {
              const Icon = iconMap[link.icon] || ExternalLink;
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
            href={`mailto:${contact.email || 'anshhedau@outlook.com'}`}
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
