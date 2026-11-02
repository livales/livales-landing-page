import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionCard from "./QuestionCard";
import { ROUTES } from "@/lib/seo";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="page grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14 lg:pb-28 lg:pt-24">
      <div>
        <h1 className="heading-xl max-w-[17ch]">{t("hero.title")}</h1>
        <p className="prose-copy mt-7 text-ink/80">{t("hero.body")}</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link to={ROUTES.products} className="btn-ink">
            {t("hero.cta.primary")}
          </Link>{" "}
          <a
            href="#updates"
            className="font-semibold text-ink underline decoration-livales-rose decoration-[3px] underline-offset-[6px] hover:decoration-ink"
          >
            {t("hero.cta.secondary")}
          </a>
        </div>
      </div>

      <QuestionCard className="w-full max-w-[32rem] lg:max-w-none" />
    </section>
  );
};

export default Hero;
