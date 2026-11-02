// Build-time entry: renders a route to static HTML (see scripts/prerender.mjs).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

export { getPageMeta, canonicalUrl, prerenderPaths, SITE_URL } from "./lib/seo";
export { posts } from "./content/posts";

export function render(url: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>
  );
}
