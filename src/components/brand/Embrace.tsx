import { cn } from "@/lib/utils";

/*
 * Illustrations built from the logo's own parts: an L (stem + base) that
 * embraces something. The brand mark embraces one dot; each audience is the
 * same gesture around a different group (people are dots, lessons are pills).
 * Colours are the logo's own (ink, green, rose), drawn on soft tinted fields.
 */

type Dot = { cx: number; cy: number; r: number; fill: string };
type Pill = { x: number; y: number; w: number; fill: string };

const INK = "#122023";
const GREEN = "#2ecc40";
const ROSE = "#f07c8f";

const groups: Record<"learner" | "couple" | "family" | "anyone", { width: number; dots: Dot[]; pills?: Pill[] }> = {
  // Lessons stacked up, step by step.
  learner: {
    width: 150,
    dots: [],
    pills: [
      { x: 44, y: 22, w: 100, fill: GREEN },
      { x: 44, y: 44, w: 74, fill: ROSE },
      { x: 44, y: 66, w: 48, fill: INK },
    ],
  },
  // Two people close enough to overlap.
  couple: {
    width: 118,
    dots: [
      { cx: 58, cy: 60, r: 19, fill: GREEN },
      { cx: 88, cy: 60, r: 19, fill: ROSE },
    ],
  },
  // Friends and family: two grown-ups and a little one.
  family: {
    width: 158,
    dots: [
      { cx: 54, cy: 56, r: 20, fill: GREEN },
      { cx: 100, cy: 56, r: 20, fill: ROSE },
      { cx: 138, cy: 74, r: 11, fill: INK },
    ],
  },
  // A group of any size.
  anyone: {
    width: 158,
    dots: [
      { cx: 50, cy: 44, r: 10, fill: ROSE },
      { cx: 80, cy: 38, r: 10, fill: GREEN },
      { cx: 110, cy: 46, r: 10, fill: INK },
      { cx: 140, cy: 40, r: 10, fill: ROSE },
      { cx: 64, cy: 72, r: 10, fill: GREEN },
      { cx: 96, cy: 74, r: 10, fill: ROSE },
      { cx: 128, cy: 72, r: 10, fill: GREEN },
    ],
  },
};

export type EmbraceGroup = keyof typeof groups;

export const Embrace = ({ group, className }: { group: EmbraceGroup; className?: string }) => {
  const { width, dots, pills = [] } = groups[group];
  return (
    <svg viewBox="0 0 164 112" className={cn("h-auto w-full", className)} aria-hidden="true">
      <rect x="0" y="86" width={width} height="26" rx="13" fill={ROSE} />
      <rect x="0" y="0" width="26" height="112" rx="13" fill={INK} />
      {pills.map((p, i) => (
        <rect key={`p${i}`} x={p.x} y={p.y} width={p.w} height="14" rx="7" fill={p.fill} />
      ))}
      {dots.map((d, i) => (
        <circle key={`d${i}`} {...d} />
      ))}
    </svg>
  );
};

/**
 * The brand mark at hero size. On load the dot settles into the embrace and
 * the base closes around it — the page's single orchestrated motion.
 */
export const HeroMark = ({ label, className }: { label: string; className?: string }) => (
  <svg viewBox="-4 -4 88 100" role="img" aria-label={label} className={cn("h-auto w-full", className)}>
    <rect
      x="0"
      y="62"
      width="80"
      height="30"
      rx="15"
      fill="#f07c8f"
      className="animate-embrace-arm"
      style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
    />
    <rect x="0" y="0" width="30" height="92" rx="15" fill="#2ecc40" />
    <circle
      cx="58"
      cy="32"
      r="15"
      fill="#2ecc40"
      className="animate-embrace-dot"
      style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
    />
  </svg>
);
