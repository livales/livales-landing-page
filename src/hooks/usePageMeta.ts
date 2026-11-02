import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { canonicalUrl, getPageMeta } from "@/lib/seo";

const setContent = (selector: string, value: string) =>
  document.head.querySelector(selector)?.setAttribute("content", value);

/**
 * Keeps <title>, the description and the canonical URL in step with client-side
 * navigation and the language toggle. The prerendered HTML already has the
 * Indonesian values, so this only matters after the first page.
 */
export const usePageMeta = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const meta = getPageMeta(path, language);
    if (!meta) return;
    document.title = meta.title;
    setContent('meta[name="description"]', meta.description);
    setContent('meta[property="og:title"]', meta.title);
    setContent('meta[property="og:description"]', meta.description);
    setContent('meta[property="og:url"]', canonicalUrl(meta.path));
    setContent('meta[name="twitter:title"]', meta.title);
    setContent('meta[name="twitter:description"]', meta.description);
    document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl(meta.path));
  }, [pathname, language]);
};
