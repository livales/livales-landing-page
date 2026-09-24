import { Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/brand/Logo";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/livales/", icon: Linkedin },
];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/[0.06] bg-white/60 pt-16 pb-10">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo className="h-8" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.company")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["about", "audience", "approach", "product", "faq"].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-foreground/80 transition-colors hover:text-livales-green-deep">
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.social")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-livales-green-deep"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/[0.06] pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Livales. {t("footer.rights")}
          </p>
          <p>{t("footer.made")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
