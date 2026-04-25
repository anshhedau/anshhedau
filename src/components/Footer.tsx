import { getFooter } from '@/lib/content';
import { ArrowUp } from 'lucide-react';

const footer = getFooter();

const Footer = () => {
  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="section-container">
        <div className="grid sm:grid-cols-3 items-center gap-6 text-center sm:text-left">
          <div>
            <span className="font-display font-bold text-2xl tracking-tight">
              {footer.brand || 'Ansh'}<span className="text-gradient">.</span>
            </span>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground mt-1">Designer · Developer · Builder</p>
          </div>

          <p className="text-sm text-muted-foreground sm:text-center">
            {footer.copyright || '© Ansh Hedau · Crafted with care.'}
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 text-sm hover:text-primary-glow transition-colors text-muted-foreground sm:justify-self-end"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
