import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getResume, getNavigation } from '@/lib/content';

const resume = getResume();
const nav = getNavigation();

const navLinks = ((nav.links as Array<{ name: string; href: string; visible?: boolean }>) || [
  { name: 'About', href: '#about', visible: true },
  { name: 'Skills', href: '#skills', visible: true },
  { name: 'Projects', href: '#projects', visible: true },
  { name: 'Experience', href: '#experience', visible: true },
  { name: 'Contact', href: '#contact', visible: true },
]).filter((l) => l.visible !== false);

const logoText = nav.logo_text || 'Ansh';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav' : ''
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            {logoText}<span className="text-gradient">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link px-4 py-2 rounded-full hover:bg-[hsl(var(--glass-bg))] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            {resume.show_in_nav !== false && (
              <a
                href={resume.file || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2 px-5 ml-2"
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[hsl(var(--glass-bg))] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 glass-nav rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg font-medium py-3 px-4 rounded-xl hover:bg-[hsl(var(--glass-bg))] transition-all"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  {link.name}
                </motion.a>
              ))}
              {resume.show_in_nav !== false && (
                <a
                  href={resume.file || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center mt-2"
                >
                  Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
