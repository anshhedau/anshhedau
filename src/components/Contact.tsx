import { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter, Globe, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { getContact } from '@/lib/content';
import AnimatedSection from './AnimatedSection';

const iconMap: Record<string, any> = { Mail, Linkedin, Github, Instagram, ExternalLink, Twitter, Globe, Youtube };

const contact = getContact();
const contactLinks = (contact.links as Array<{ name: string; value: string; href: string; icon: string }>) || [];

const Contact = () => {
  return (
    <section id="contact" className="section-spacing relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="section-container relative">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-label mb-4 inline-block">Contact</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
              {contact.heading || "Let's connect"}
            </h2>
            <p className="text-lg mb-14" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {contact.subheading || "Have a project in mind or just want to say hi? I'd love to hear from you."}
            </p>
          </AnimatedSection>

          {/* Contact Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-14">
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
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="glass-card flex items-center gap-4 p-5 group text-left"
                >
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(83_100%_59%/0.2)]"
                      style={{ background: 'hsl(var(--glass-bg))' }}
                    >
                      <Icon className="w-5 h-5 group-hover:text-primary transition-colors duration-300" style={{ color: 'hsl(var(--muted-foreground))' }} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{link.name}</p>
                      <p className="font-medium">{link.value}</p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <AnimatedSection delay={0.2}>
            <a href={`mailto:${contact.email || 'anshhedau@outlook.com'}`} className="btn-primary inline-flex">
              <Mail className="w-5 h-5" />
              {contact.cta_text || 'Send me an email'}
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
