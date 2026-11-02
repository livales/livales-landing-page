import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Every page (and 404.html) is prerendered at build time (scripts/prerender.mjs),
// so hydrate it. The dev server serves an empty root, so render it fresh there.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
