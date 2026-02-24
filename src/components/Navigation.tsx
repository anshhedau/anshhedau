import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getResume } from '@/lib/content';

const resume = getResume();

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const resumeFile = resume.file || '/resume.pdf';
  const showResume = resume.show_in_nav !== false;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="text-xl font-display font-bold text-foreground hover:text-primary transition-colors">
            Ansh<span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link text-sm font-medium">
                {link.name}
              </a>
            ))}
            {showResume && (
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-2 px-5"
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="section-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            {showResume && (
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-2"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
