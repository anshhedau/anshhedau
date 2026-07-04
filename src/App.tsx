import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import MagneticCursor from "./components/MagneticCursor";
import ImagePreloader from "./components/ImagePreloader";
import SmoothScroll from "./components/SmoothScroll";
import { lazy, Suspense, useEffect, useState } from "react";

// Lazy-loaded, client-only heavy 3D.
const ParticleField = lazy(() => import("./components/ParticleField"));

const queryClient = new QueryClient();

const AnimatedOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};

const ClientOnlyEffects = () => {
  // Only render browser-only decorations after mount so SSG output stays clean
  // and Three.js never touches window during prerender.
  const [mounted, setMounted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    setShowParticles(!isMobile);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <SmoothScroll />
      <MagneticCursor />
      <ImagePreloader />
      {showParticles && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <ClientOnlyEffects />
      <AnimatedOutlet />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
