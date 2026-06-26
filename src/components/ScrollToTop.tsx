import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Remembers scroll position per history entry so that browser back/forward
// (POP navigation) restores the user where they were, while fresh PUSH
// navigations always start at the top.
const scrollPositions = new Map<string, number>();

type LenisLike = {
  scrollTo: (
    target: number,
    opts?: { immediate?: boolean; force?: boolean; lock?: boolean }
  ) => void;
};

const getLenis = (): LenisLike | undefined =>
  (window as unknown as { __lenis?: LenisLike }).__lenis;

const scrollToY = (y: number) => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { immediate: true, force: true, lock: true });
  }
  window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
};

export const ScrollToTop = () => {
  const location = useLocation();
  const navType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const lastKey = useRef<string>(location.key);

  // Save scroll position of the previous entry before the route changes
  useEffect(() => {
    return () => {
      scrollPositions.set(lastKey.current, window.scrollY);
    };
  }, [location.key]);

  useEffect(() => {
    if (navType === "POP") {
      const saved = scrollPositions.get(location.key) ?? 0;
      // Wait for the new page to render (AnimatePresence has a ~500ms exit
      // animation) before restoring the saved scroll position.
      const t = window.setTimeout(() => scrollToY(saved), 550);
      return () => window.clearTimeout(t);
    } else {
      scrollToY(0);
      // Re-assert after the route transition completes, in case Lenis or
      // late-mounting content nudges the scroll.
      const t = window.setTimeout(() => scrollToY(0), 550);
      lastKey.current = location.key;
      return () => window.clearTimeout(t);
    }
    lastKey.current = location.key;
  }, [location.key, navType]);

  return null;
};
