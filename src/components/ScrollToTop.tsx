import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Remembers scroll position per history entry so that browser back/forward
// (POP navigation) restores the user where they were, while fresh PUSH
// navigations always start at the top.
const scrollPositions = new Map<string, number>();

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
      // Wait a frame so the new page has rendered before restoring scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: saved, left: 0, behavior: "instant" as ScrollBehavior });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    lastKey.current = location.key;
  }, [location.key, navType]);

  return null;
};
