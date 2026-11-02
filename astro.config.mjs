// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { SITE_URL, absoluteUrl, locales, normalizePath, pagePaths, postPath } from "./src/i18n/routes";

// lastmod for pages that aren't blog posts. Bump it when their content changes
// meaningfully; changing it on every build would make the date meaningless.
const PAGES_UPDATED = "2026-11-02";

/** @typedef {Partial<Record<import("./src/i18n/routes").Locale, string>>} Versions */

/**
 * Each sitemap URL with its versions in every language (only the ones that
 * exist: a blog post can be written in one language) and its lastmod.
 * @type {Map<string, { versions: Versions, lastmod: string }>}
 */
const entries = new Map();
/** @param {Versions} versions */
const add = (versions, lastmod = PAGES_UPDATED) => {
  for (const path of Object.values(versions)) entries.set(path, { versions, lastmod });
};

for (const paths of Object.values(pagePaths)) add(paths);

// Blog posts: src/content/blog/<lang>/<slug>.md, lastmod is the post's date.
/** @type {Map<string, { versions: Versions, lastmod: string }>} */
const posts = new Map();
for (const lang of locales) {
  for (const file of readdirSync(`src/content/blog/${lang}`).filter((f) => f.endsWith(".md"))) {
    const slug = file.slice(0, -3);
    const date = readFileSync(`src/content/blog/${lang}/${file}`, "utf8").match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
    const post = posts.get(slug) ?? { versions: {}, lastmod: date ?? PAGES_UPDATED };
    post.versions[lang] = postPath(slug, lang);
    posts.set(slug, post);
  }
}
for (const { versions, lastmod } of posts.values()) add(versions, lastmod);

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
      filter: (page) => !/\/404$/.test(normalizePath(new URL(page).pathname)),
      // Each URL lists its other-language version (hreflang), like the <link rel="alternate"> tags.
      serialize(item) {
        const path = normalizePath(new URL(item.url).pathname);
        const entry = entries.get(path);
        const versions = Object.entries(entry?.versions ?? {});
        return {
          ...item,
          url: absoluteUrl(path),
          lastmod: entry?.lastmod ?? PAGES_UPDATED,
          links:
            versions.length > 1
              ? [
                  ...versions.map(([lang, p]) => ({ lang, url: absoluteUrl(p) })),
                  { lang: "x-default", url: absoluteUrl(entry.versions.id ?? versions[0][1]) },
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
