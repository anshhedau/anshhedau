import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background noise-overlay overflow-hidden">
      <Navigation />
      <main className="relative pt-32 pb-24 min-h-[80vh] flex items-center">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[150px] pointer-events-none animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none animate-float-slow"
          style={{ background: 'hsl(260 80% 60% / 0.05)', animationDelay: '2s' }} />

        <div className="section-container relative text-center">
          <div className="text-[20vw] md:text-[14vw] font-black leading-none text-gradient select-none animate-float-slow"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            404
          </div>
          <p className="text-2xl md:text-3xl font-semibold mt-4 mb-3">
            This page slipped on a banana 🍌
          </p>
          <p className="max-w-md mx-auto mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
            The page <code className="px-2 py-0.5 rounded text-sm" style={{ background: 'hsl(var(--muted))' }}>{location.pathname}</code> doesn't exist — but everything else still does.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" /> Go home
            </Link>
            <Link to="/#projects" className="btn-outline">
              <ArrowLeft className="w-4 h-4" /> Browse projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
