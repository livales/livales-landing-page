import { useLanguage } from "@/contexts/LanguageContext";
import { HeroMark } from "@/components/brand/Embrace";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="page grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20 lg:pb-28 lg:pt-24">
      <div>
        <h1 className="heading-xl max-w-[15ch]">{t("hero.title")}</h1>
        <p className="prose-copy mt-7 text-ink/80">{t("hero.body")}</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <a href="#product" className="btn-ink">
            {t("hero.cta.primary")}
          </a>
          <a
            href="#updates"
            className="text-[1rem] font-semibold underline decoration-livales-rose decoration-[3px] underline-offset-[6px] hover:decoration-ink"
          >
            {t("hero.cta.secondary")}
          </a>
        </div>
      </div>

      <div className="order-first mx-auto w-40 sm:w-52 lg:order-none lg:w-full lg:max-w-[20rem]">
        <HeroMark label={t("hero.markLabel")} />
      </div>
    </section>
  );
};

export default Hero;
