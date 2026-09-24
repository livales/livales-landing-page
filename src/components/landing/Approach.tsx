import { HeartHandshake, MousePointerClick, ShieldCheck, MapPin, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import ArcField from "./ArcField";

const pillars: { key: string; icon: LucideIcon; span: string }[] = [
  { key: "p1", icon: HeartHandshake, span: "md:col-span-2" },
  { key: "p2", icon: MousePointerClick, span: "" },
  { key: "p3", icon: ShieldCheck, span: "" },
  { key: "p4", icon: MapPin, span: "md:col-span-2" },
];

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section id="approach" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("approach.eyebrow")}
          title={t("approach.title")}
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {pillars.map(({ key, icon: Icon, span }, i) => (
            <article
              key={key}
              className={cn(
                "reveal group surface relative overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8",
                span
              )}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              {i === 0 && (
                <ArcField
                  animate={false}
                  rings={7}
                  className="absolute -right-24 -top-24 w-80 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25"
                />
              )}
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-livales-mint text-livales-green-deep">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground sm:text-2xl">
                {t(`approach.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {t(`approach.${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
