import { getFooter } from '@/lib/content';

const footer = getFooter();

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">
              {footer.brand || 'Ansh'}<span className="text-primary">.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {footer.copyright || '© Ansh Hedau. Designed with precision and care.'}
          </p>

          {/* Back to top */}
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
