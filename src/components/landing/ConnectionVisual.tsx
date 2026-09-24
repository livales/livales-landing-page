import { Heart, Home, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";

// Positions are % of the square canvas; lines are drawn from the centre.
const nodes: { key: string; icon: LucideIcon; x: number; y: number; delay: string; tint: string }[] = [
  { key: "couple", icon: Heart, x: 18, y: 20, delay: "0s", tint: "bg-rose-100 text-rose-500" },
  { key: "bestie", icon: Users, x: 84, y: 28, delay: "-2s", tint: "bg-amber-100 text-amber-600" },
  { key: "family", icon: Home, x: 14, y: 76, delay: "-4s", tint: "bg-emerald-100 text-emerald-600" },
  { key: "more", icon: Sparkles, x: 80, y: 82, delay: "-1s", tint: "bg-sky-100 text-sky-600" },
];

/** Hero illustration: Livales at the centre, connected to the relationships it serves. */
const ConnectionVisual = ({ className }: { className?: string }) => {
  const { t } = useLanguage();

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[460px]", className)}>
      <div className="absolute inset-[20%] -z-10 rounded-full bg-primary/25 blur-[70px]" />
      <div className="absolute inset-[30%] -z-10 translate-x-[20%] rounded-full bg-livales-rose/25 blur-[70px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[46, 36, 26].map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#122023"
            strokeOpacity={0.06 + i * 0.02}
            strokeWidth="0.25"
          />
        ))}
        {nodes.map(({ key, x, y }) => (
          <line
            key={key}
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="#2ecc40"
            strokeOpacity="0.7"
            strokeWidth="0.3"
            strokeDasharray="1 1.4"
          />
        ))}
      </svg>

      {/* Centre: the company */}
      <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] border border-ink/[0.06] bg-white shadow-[0_24px_60px_-20px_rgba(18,32,35,0.25),0_0_80px_-10px_rgba(46,204,64,0.35)]">
        <Logo markOnly className="h-[58%]" />
      </div>

      {/* Relationships */}
      {nodes.map(({ key, icon: Icon, x, y, delay, tint }) => (
        <div
          key={key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <div
            className="flex animate-float items-center gap-2 whitespace-nowrap rounded-full border border-ink/[0.06] bg-white/95 py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-foreground shadow-[0_10px_30px_-12px_rgba(18,32,35,0.25)] backdrop-blur"
            style={{ animationDelay: delay }}
          >
            <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", tint)}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            {t(`hero.chip.${key}`)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionVisual;
