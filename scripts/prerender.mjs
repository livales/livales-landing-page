// Writes every page as static HTML so crawlers and link previews get real
// content and per-page meta tags without running JavaScript:
//   dist/index.html, dist/produk.html, dist/blog/<slug>.html, …
//   (Netlify serves /produk from produk.html without a trailing-slash redirect,
//   so the URLs match the canonical ones)
//   dist/404.html (Netlify serves it with a 404 status for unknown paths)
//   dist/sitemap.xml
// Runs after `vite build` and `vite build --ssr` (see the "build" script).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// lastmod for pages that aren't blog posts. Bump it when their content changes
// meaningfully; changing it on every build would make the date meaningless.
const PAGES_UPDATED = "2026-11-02";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");

const { render, getPageMeta, canonicalUrl, prerenderPaths, posts, SITE_URL } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replaces one tag's attribute value, failing loudly if the tag isn't in the template. */
const setAttr = (html, tagPattern, attr, value) => {
  const re = new RegExp(`(<${tagPattern}[^>]*?\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: <${tagPattern}> not found in the template`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
};

const page = (url, { title, description, canonical, robots, type = "website", jsonLd = [] }) => {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = setAttr(html, 'meta name="description"', "content", description);
  html = setAttr(html, 'link rel="canonical"', "href", canonical);
  html = setAttr(html, 'meta property="og:title"', "content", title);
  html = setAttr(html, 'meta property="og:description"', "content", description);
  html = setAttr(html, 'meta property="og:url"', "content", canonical);
  html = setAttr(html, 'meta property="og:type"', "content", type);
  html = setAttr(html, 'meta name="twitter:title"', "content", title);
  html = setAttr(html, 'meta name="twitter:description"', "content", description);
  if (robots) html = setAttr(html, 'meta name="robots"', "content", robots);
  const ld = jsonLd
    .map((data) => `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n`)
    .join("");
  return html
    .replace("</head>", `${ld}  </head>`)
    .replace(placeholder, `<div id="root">${render(url)}</div>`);
};

const write = (file, html) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
};

for (const path of prerenderPaths) {
  const meta = getPageMeta(path, "id");
  if (!meta) throw new Error(`prerender: no meta for ${path} (add it in src/lib/seo.ts)`);
  const html = page(path, {
    title: meta.title,
    description: meta.description,
    canonical: canonicalUrl(path),
    type: path.startsWith("/blog/") ? "article" : "website",
    jsonLd: meta.jsonLd,
  });
  write(resolve(dist, path === "/" ? "index.html" : `.${path}.html`), html);
}

write(
  resolve(dist, "404.html"),
  page("/404", {
    title: "Halaman tidak ditemukan | Livales",
    description: "Halaman ini tidak ada.",
    canonical: `${SITE_URL}/`,
    robots: "noindex",
  })
);

const lastmod = (path) => posts.find((p) => path === `/blog/${p.slug}`)?.date ?? PAGES_UPDATED;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderPaths.map((path) => `  <url>\n    <loc>${canonicalUrl(path)}</loc>\n    <lastmod>${lastmod(path)}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${prerenderPaths.length} pages, 404.html and sitemap.xml`);
