const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">
              Ansh<span className="text-primary">.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © Ansh Hedau. Designed with precision and care.
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
