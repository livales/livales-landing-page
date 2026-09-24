import { Lock, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";
import BrandShape from "./BrandShape";

/**
 * Product lineup. App 01 is in stealth — keep its card generic until launch.
 */
const Product = () => {
  const { t } = useLanguage();

  return (
    <section id="product" className="bg-gradient-to-b from-livales-mint/80 to-background py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <SectionHeading eyebrow={t("product.eyebrow")} title={t("product.title")} />
          <p className="reveal max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("product.body")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {/* App 01 — in development */}
          <article className="reveal surface relative isolate overflow-hidden p-7 sm:p-9">
            <BrandShape className="absolute -bottom-16 -right-10 -z-10 w-52 rotate-12 opacity-50" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("product.p1.tag")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-livales-mint px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-livales-green-deep">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary" />
                {t("product.p1.status")}
              </span>
            </div>
            <span className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-livales-mint">
              <Lock className="h-5 w-5 text-livales-green-deep" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
              {t("product.p1.title")}
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {t("product.p1.body")}
            </p>
          </article>

          {/* What's next */}
          <article
            className="reveal relative flex flex-col rounded-3xl border-2 border-dashed border-ink/10 bg-white/50 p-7 sm:p-9"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("product.p2.tag")}
              </span>
              <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("product.p2.status")}
              </span>
            </div>
            <span className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-ink/20">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
              {t("product.p2.title")}
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              {t("product.p2.body")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Product;
