import { getFooter } from '@/lib/content';

const footer = getFooter();

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border relative">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">
              {footer.brand || 'Ansh'}<span className="text-gradient">.</span>
            </span>
          </div>

          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {footer.copyright || '© Ansh Hedau. Designed with precision and care.'}
          </p>

          <a href="#" className="text-sm hover:text-primary transition-colors" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
