import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// "/" is prerendered at build time (scripts/prerender.mjs), so hydrate it.
// Other paths get the same HTML via the SPA fallback, so render them fresh.
if (container.hasChildNodes() && window.location.pathname === "/") {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
