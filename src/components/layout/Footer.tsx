import { Link } from "react-router-dom";
import { useLanguage, THREADS_URL, LINKEDIN_URL, CONTACT_EMAIL } from "@/contexts/LanguageContext";
import { products } from "@/content/products";
import Logo from "@/components/brand/Logo";
import { navItems } from "./Navbar";

const Footer = () => {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10">
      <div className="page grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Logo className="h-8" />
          <p className="mt-5 max-w-[20rem] text-[1rem] text-ink/75">{t("footer.tagline")}</p>
        </div>

        <nav aria-label={t("footer.company")}>
          <p className="text-[0.95rem] font-semibold">{t("footer.company")}</p>
          <ul className="mt-4 space-y-3 text-[1rem]">
            {navItems.map(({ to, key }) => (
              <li key={to}>
                <Link to={to} className="text-ink/75 hover:text-ink">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.95rem] font-semibold">{t("footer.products")}</p>
          <ul className="mt-4 space-y-3 text-[1rem]">
            {products.map(({ key, url }) => (
              <li key={key}>
                <a href={url[language]} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">
                  {t(`product.${key}.name`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.95rem] font-semibold">{t("footer.social")}</p>
          <ul className="mt-4 space-y-3 text-[1rem]">
            <li>
              <a href={THREADS_URL} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">
                Threads
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-ink/75 hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink/75 hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="page flex flex-col gap-2 border-t border-ink/10 py-6 text-[0.9rem] text-ink/60 sm:flex-row sm:justify-between">
        <p>
          © {year} Livales. {t("footer.rights")}
        </p>
        <p>{t("footer.made")}</p>
      </div>
    </footer>
  );
};

export default Footer;
