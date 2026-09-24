import { Heart, Home, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

// Each relationship gets its own soft tint.
const audiences: { key: string; icon: LucideIcon; tint: string; glow: string }[] = [
  { key: "a1", icon: Heart, tint: "bg-rose-100 text-rose-500", glow: "group-hover:bg-rose-200/60" },
  { key: "a2", icon: Users, tint: "bg-amber-100 text-amber-600", glow: "group-hover:bg-amber-200/60" },
  { key: "a3", icon: Home, tint: "bg-emerald-100 text-emerald-600", glow: "group-hover:bg-emerald-200/60" },
  { key: "a4", icon: Sparkles, tint: "bg-sky-100 text-sky-600", glow: "group-hover:bg-sky-200/60" },
];

const Audience = () => {
  const { t } = useLanguage();

  return (
    <section id="audience" className="bg-gradient-to-b from-livales-blush/70 to-background py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
          <SectionHeading eyebrow={t("audience.eyebrow")} title={t("audience.title")} />
          <p className="reveal max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("audience.body")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ key, icon: Icon, tint, glow }, i) => (
            <article
              key={key}
              className="reveal group surface relative overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className={cn("absolute -right-10 -top-10 h-32 w-32 rounded-full bg-transparent blur-2xl transition-colors duration-500", glow)} />
              <span className="font-mono text-[11px] text-muted-foreground/70">0{i + 1}</span>
              <span className={cn("mt-6 flex h-12 w-12 items-center justify-center rounded-2xl", tint)}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {t(`audience.${key}.title`)}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {t(`audience.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
