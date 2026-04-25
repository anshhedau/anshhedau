import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Disable browser's automatic scroll restoration so our ScrollToTop component
// has full control (prevents flicker / wrong restore on SPA navigation).
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
