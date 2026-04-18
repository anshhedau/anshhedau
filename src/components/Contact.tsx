import { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter, Globe, Youtube, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getContact } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const iconMap: Record<string, any> = { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter, Globe, Youtube };

const contact = getContact();
const contactLinks = (contact.links as Array<{ name: string; value: string; href: string; icon: string }>) || [];

const Contact = () => {
  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      <div className="gradient-orb w-[600px] h-[600px] bg-primary/30 top-0 left-1/4" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-label mb-6 inline-block">Contact</span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mt-4 mb-6 leading-[0.95]">
              Let's make something <span className="display-serif text-gradient block sm:inline">unforgettable.</span>
            </h2>
            <p className="text-lg md:text-xl mb-14 text-muted-foreground max-w-2xl mx-auto">
              {contact.subheading || "Have a project in mind or just want to say hi? I'd love to hear from you."}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <a href={`mailto:${contact.email || 'anshhedau@outlook.com'}`}
              className="group inline-flex items-center gap-4 glass-card px-8 py-6 mb-14 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left relative z-10">
                <p className="text-xs uppercase tracking-[0.24em] text-primary-glow mb-1">Email</p>
                <p className="font-display text-xl md:text-2xl font-semibold">{contact.email || 'anshhedau@outlook.com'}</p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary-glow group-hover:rotate-45 transition-all relative z-10" />
            </a>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {contactLinks.map((link, i) => {
              const Icon = iconMap[link.icon] || ExternalLink;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  className="glass-card flex flex-col items-center gap-3 p-5 group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-glow transition-colors duration-300 relative z-10" />
                  <p className="text-sm font-medium relative z-10">{link.name}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
