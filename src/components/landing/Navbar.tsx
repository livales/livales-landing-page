import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";
import LanguageSelector from "@/components/LanguageSelector";

export const sections = ["about", "audience", "approach", "product", "faq"] as const;

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu past the md breakpoint so the scroll lock can't outlive it.
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
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-[border-color] duration-200",
        isScrolled || isOpen ? "border-b border-ink/10" : "border-b border-transparent"
      )}
    >
      <nav className="page flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" onClick={close} aria-label="Livales" className="shrink-0">
          <Logo className="h-7" />
        </a>

        <ul className="hidden items-center gap-7 text-[0.98rem] font-medium min-[900px]:flex">
          {sections.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className="text-ink/75 hover:text-ink">
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 min-[900px]:flex">
          <LanguageSelector />
          <a href="#updates" className="btn-ink h-11 px-5 text-[0.95rem]">
            {t("nav.cta")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink min-[900px]:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? t("nav.close") : t("nav.menu")}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="h-[calc(100dvh-4.5rem)] bg-white min-[900px]:hidden">
          <div className="page flex h-full flex-col pb-8 pt-4">
            <ul>
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className="block border-b border-ink/10 py-4 font-display text-[1.5rem] font-semibold"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-4">
              <LanguageSelector />
              <a href="#updates" onClick={close} className="btn-ink">
                {t("nav.cta")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
