import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";
import LanguageSelector from "@/components/LanguageSelector";

const sections = ["about", "audience", "approach", "product", "faq"] as const;

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the md breakpoint,
  // otherwise the body scroll lock would outlive the (hidden) menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || isOpen
          ? "border-b border-ink/[0.06] bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a href="#top" onClick={close} className="flex items-center" aria-label="Livales">
          <Logo className="h-7" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSelector />
          <a
            href="#updates"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-livales-green-light"
          >
            {t("nav.cta")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          aria-expanded={isOpen}
          aria-label={t("nav.menu")}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="h-[calc(100dvh-4rem)] border-t border-ink/[0.06] md:hidden">
          <div className="container-page flex h-full flex-col py-6">
            <ul className="space-y-1">
              {sections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className="block rounded-xl px-3 py-3 font-display text-2xl font-semibold text-foreground hover:bg-ink/5"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4">
              <LanguageSelector />
              <a
                href="#updates"
                onClick={close}
                className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
              >
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
