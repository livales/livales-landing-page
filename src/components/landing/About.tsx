import { useLanguage } from "@/contexts/LanguageContext";

/** A short note from the team — the company's reason for existing. */
const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-t border-ink/10">
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <h2 className="heading-lg">{t("about.title")}</h2>
        <div className="space-y-6 text-[1.15rem] leading-[1.75] sm:text-[1.3rem]">
          <p className="max-w-[38rem]">{t("about.p1")}</p>
          <p className="max-w-[38rem]">{t("about.p2")}</p>
          <p className="max-w-[38rem] text-ink/75">{t("about.p3")}</p>
          <p className="pt-2 font-display text-[1rem] font-semibold">{t("about.sign")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
