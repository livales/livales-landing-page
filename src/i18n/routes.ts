/*
 * URLs per language. Indonesian is the default and lives at the root; English
 * lives under /en with translated page names (same pattern as kado.livales.com).
 * Blog posts keep one slug in both languages. No trailing slashes anywhere:
 * the build writes produk.html, en/products.html, … and Netlify serves them
 * at /produk, /en/products without a redirect.
 */

export type Locale = "id" | "en";
export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "id";

export const SITE_URL = "https://livales.com";

export type Page = "home" | "products" | "about" | "blog";

export const pagePaths: Record<Page, Record<Locale, string>> = {
  home: { id: "/", en: "/en" },
  products: { id: "/produk", en: "/en/products" },
  about: { id: "/tentang", en: "/en/about" },
  blog: { id: "/blog", en: "/en/blog" },
};

export const pagePath = (page: Page, lang: Locale) => pagePaths[page][lang];

export const postPath = (slug: string, lang: Locale) => `${pagePaths.blog[lang]}/${slug}`;

/** Absolute URL; only the home page keeps its slash. */
export const absoluteUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

/** The language of a path, read from its /en prefix. */
export const localeOf = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "id");

/**
 * The canonical form of a path: no .html, no /index, no trailing slash ("/" for
 * the home page). Astro.url and the sitemap can hand over any of those aliases.
 */
export const normalizePath = (path: string) =>
  path.replace(/\.html$/, "").replace(/\/index$/, "").replace(/(.)\/$/, "$1") || "/";

/** The blog slug of a post path in either language, or undefined for other pages. */
export const postSlug = (path: string): string | undefined => {
  const p = normalizePath(path);
  const blog = `${pagePaths.blog[localeOf(p)]}/`;
  return p.startsWith(blog) ? p.slice(blog.length) : undefined;
};

/**
 * The same page in the other language: a static page's pair, or the same post
 * slug under the other blog (callers check the post exists in that language).
 * Unknown paths fall back to that language's home.
 */
export const alternatePath = (path: string, target: Locale): string => {
  const p = normalizePath(path);
  const page = Object.values(pagePaths).find((paths) => paths.id === p || paths.en === p);
  if (page) return page[target];
  const slug = postSlug(p);
  return slug ? postPath(slug, target) : pagePaths.home[target];
};
