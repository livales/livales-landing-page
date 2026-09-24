import { useLanguage } from "@/contexts/LanguageContext";
import ArcField from "./ArcField";
import WaitlistForm from "./WaitlistForm";

const FinalCta = () => {
  const { t } = useLanguage();

  return (
    <section id="updates" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="reveal relative isolate overflow-hidden rounded-[32px] border border-ink/[0.06] bg-gradient-to-br from-livales-mint via-white to-livales-blush px-6 shadow-[0_30px_80px_-40px_rgba(18,32,35,0.35)] py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]" />
          <div className="absolute -bottom-40 -left-20 -z-10 h-[380px] w-[480px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-40 -right-20 -z-10 h-[380px] w-[480px] rounded-full bg-livales-rose/25 blur-[120px]" />
          <ArcField
            animate={false}
            className="absolute -left-40 -top-40 -z-10 w-[520px] opacity-[0.14]"
          />

          <span className="eyebrow justify-center">{t("cta.eyebrow")}</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("cta.body")}
          </p>
          <div className="mt-10 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
