import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroLineup } from "@/components/brand/Embrace";
import TextLink from "@/components/TextLink";
import { ROUTES } from "@/lib/seo";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="page grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-14 lg:pb-28 lg:pt-24">
      <div>
        <h1 className="heading-xl max-w-[17ch]">{t("hero.title")}</h1>
        <p className="prose-copy mt-7 text-ink/80">{t("hero.body")}</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link to={ROUTES.products} className="btn-ink">
            {t("hero.cta.primary")}
          </Link>{" "}
          <TextLink to={ROUTES.blog}>{t("hero.cta.secondary")}</TextLink>
        </div>
      </div>

      <HeroLineup label={t("hero.art")} className="order-first max-w-[15rem] sm:max-w-[20rem] lg:order-none lg:max-w-none" />
    </section>
  );
};

export default Hero;
