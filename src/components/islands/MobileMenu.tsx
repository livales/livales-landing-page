import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/routes";
import { cn } from "@/lib/utils";
import LanguageLinks, { type LanguageLink } from "@/components/LanguageLinks";

interface MobileMenuProps {
  lang: Locale;
  /** Home first, then the navbar's pages. */
  items: { href: string; label: string; active: boolean }[];
  languages: LanguageLink[];
  copy: { menu: string; close: string; cta: string };
}

/**
 * The navbar's small-screen menu (an island). It also draws the line under
 * the sticky header once the page scrolls or the menu opens, through the
 * header's data-line attribute (see Navbar.astro).
 */
const MobileMenu = ({ lang, items, languages, copy }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.querySelector("[data-site-header]")?.toggleAttribute("data-line", isScrolled || isOpen);
  }, [isScrolled, isOpen]);

  // Close the menu past the md breakpoint so the scroll lock can't outlive it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink min-[900px]:hidden"
        aria-expanded={isOpen}
        aria-label={isOpen ? copy.close : copy.menu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        // Fixed under the 4.5rem header, so it can live inside the navbar's row.
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] bg-white min-[900px]:hidden">
          <div className="page flex h-full flex-col pb-8 pt-4">
            <ul>
              {items.map(({ href, label, active }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-ink/10 py-4 font-display text-[1.5rem] font-semibold",
                      !active && "text-ink/80"
                    )}
                  >
                    {label}
                    {active && <span aria-hidden="true" className="h-3 w-3 rounded-full bg-livales-rose" />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-4">
              <LanguageLinks links={languages} current={lang} />
              <a href="#updates" onClick={close} className="btn-ink">
                {copy.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
