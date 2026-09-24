import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";

const stats = ["stat1", "stat2", "stat3"] as const;

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
          <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:pt-10">
            <p>{t("about.body1")}</p>
            <p className="text-foreground/90">{t("about.body2")}</p>
          </div>
        </div>

        <dl className="surface mt-16 grid overflow-hidden sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s}
              className="reveal border-ink/[0.06] p-7 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <dt className="sr-only">{t(`about.${s}.label`)}</dt>
              <dd>
                <span className="font-display text-5xl font-semibold text-livales-green-deep">
                  {t(`about.${s}.value`)}
                </span>
                <p className="mt-3 max-w-[16rem] text-sm text-muted-foreground">
                  {t(`about.${s}.label`)}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default About;
