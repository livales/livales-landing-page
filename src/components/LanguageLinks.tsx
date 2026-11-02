import type { Locale } from "@/i18n/routes";
import { cn } from "@/lib/utils";

export interface LanguageLink {
  lang: Locale;
  /** The same page in that language. */
  href: string;
}

const labels: Record<Locale, string> = { id: "Bahasa Indonesia", en: "English" };

/**
 * Plain "ID / EN" text links to this page in each language. A React component
 * so the mobile menu island can reuse it; in the navbar it renders as static HTML.
 */
const LanguageLinks = ({ links, current, className }: { links: LanguageLink[]; current: Locale; className?: string }) => (
  <div className={cn("flex items-center gap-1 text-[0.95rem]", className)}>
    {links.map((link, i) => (
      <span key={link.lang} className="flex items-center gap-1">
        {i > 0 && <span aria-hidden="true" className="text-ink/30">/</span>}
        <a
          href={link.href}
          hrefLang={link.lang}
          lang={link.lang}
          aria-label={labels[link.lang]}
          aria-current={link.lang === current ? "page" : undefined}
          className={cn(
            "rounded px-1 py-0.5 font-semibold uppercase",
            link.lang === current ? "text-ink" : "text-ink/45 hover:text-ink"
          )}
        >
          {link.lang}
        </a>
      </span>
    ))}
  </div>
);

export default LanguageLinks;
