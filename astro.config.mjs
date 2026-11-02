// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

const SITE_URL = "https://livales.com";

// lastmod for pages that aren't blog posts. Bump it when their content changes
// meaningfully; changing it on every build would make the date meaningless.
const PAGES_UPDATED = "2026-11-02";

// Static pages in both languages (keep in step with src/i18n/routes.ts).
const pairs = [
  ["/", "/en"],
  ["/produk", "/en/products"],
  ["/tentang", "/en/about"],
  ["/blog", "/en/blog"],
];

// Blog posts share one slug in both languages; lastmod is the post's date.
const postDates = Object.fromEntries(
  readdirSync("src/content/blog/id").map((file) => [
    file.replace(/\.md$/, ""),
    readFileSync(`src/content/blog/id/${file}`, "utf8").match(/^date: (\S+)$/m)?.[1] ?? PAGES_UPDATED,
  ])
);
for (const slug of Object.keys(postDates)) pairs.push([`/blog/${slug}`, `/en/blog/${slug}`]);

/** @param {string} path */
const url = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
/** @param {string} href */
const pathOf = (href) => new URL(href).pathname.replace(/(.)\/$/, "$1");

export default defineConfig({
  site: SITE_URL,
  // Every page is its own file (produk.html, en/products.html, blog/<slug>.html),
  // which Netlify serves at the canonical URL without a trailing-slash redirect.
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    // Keep the articles' straight quotes and dashes exactly as written.
    processor: satteri({ features: { smartPunctuation: false } }),
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/404$/.test(pathOf(page)),
      // Each URL lists its other-language version (hreflang), like the <link rel="alternate"> tags.
      serialize(item) {
        const path = pathOf(item.url);
        const pair = pairs.find((p) => p.includes(path));
        const slug = path.match(/\/blog\/([^/]+)$/)?.[1];
        return {
          ...item,
          url: url(path),
          lastmod: (slug && postDates[slug]) || PAGES_UPDATED,
          links: pair
            ? [
                { lang: "id", url: url(pair[0]) },
                { lang: "en", url: url(pair[1]) },
                { lang: "x-default", url: url(pair[0]) },
              ]
            : undefined,
        };
      },
    }),
  ],
  vite: {
    // Firebase is loaded with import() (src/lib/subscribe.ts); pre-bundling it
    // keeps the dev server from re-optimising deps mid-session.
    optimizeDeps: { include: ["firebase/app", "firebase/firestore/lite"] },
  },
});
