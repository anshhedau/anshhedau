import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient }) => {
    if (isClient && "scrollRestoration" in window.history) {
      // ScrollToTop owns scroll behaviour; disable the browser's default.
      window.history.scrollRestoration = "manual";
    }
  },
);
