import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ArcField from "./ArcField";
import ConnectionVisual from "./ConnectionVisual";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -left-40 top-[-10%] -z-10 h-[560px] w-[680px] rounded-full bg-primary/[0.16] blur-[140px]" />
      <div className="absolute -right-40 top-[10%] -z-10 h-[520px] w-[620px] rounded-full bg-livales-rose/[0.18] blur-[140px]" />
      <ArcField className="absolute -left-60 top-24 -z-10 hidden w-[720px] opacity-[0.10] lg:block" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <a
            href="#product"
            className="reveal group inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/80 py-1.5 shadow-sm pl-3 pr-3 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:text-[13px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("hero.badge")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1
            className="reveal mt-7 font-display text-[44px] font-semibold leading-[1.02] sm:text-6xl lg:text-[72px]"
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient-brand">{t("hero.title2")}</span>
          </h1>

          <p
            className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="reveal mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <a
              href="#about"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_rgba(46,204,64,0.6)] transition-colors hover:bg-livales-green-light sm:w-auto"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#updates"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-ink/15 bg-white/70 px-6 text-[15px] font-medium text-foreground transition-colors hover:border-ink/30 hover:bg-white sm:w-auto"
            >
              {t("hero.cta.secondary")}
            </a>
          </div>
        </div>

        <div
          className="reveal"
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          <ConnectionVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
