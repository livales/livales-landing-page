import { pagePath, type Locale, type Page } from "@/i18n/routes";

/** The navbar's pages, also listed in the footer. */
export const navItems: { page: Page; key: string }[] = [
  { page: "products", key: "nav.products" },
  { page: "blog", key: "nav.blog" },
  { page: "about", key: "nav.about" },
];

/** A section is current on its own page and the pages under it (a blog post keeps "Blog" current). */
export const isCurrent = (page: Page, lang: Locale, path: string) => {
  const href = pagePath(page, lang);
  return page === "home" ? path === href : path === href || path.startsWith(`${href}/`);
};
