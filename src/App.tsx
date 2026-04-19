import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import MagneticCursor from "./components/MagneticCursor";
import ImagePreloader from "./components/ImagePreloader";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import FileOpener from "./pages/FileOpener";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/file" element={<FileOpener />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MagneticCursor />
        <ImagePreloader />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
