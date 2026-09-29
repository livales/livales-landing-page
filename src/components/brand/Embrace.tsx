import { cn } from "@/lib/utils";

/*
 * Illustrations built from the logo's own parts: an L (stem + base) that
 * embraces one or more dots. The brand mark embraces one dot; each kind of
 * relationship is the same gesture around a different group.
 */

type Dot = { cx: number; cy: number; r: number; fill: string };

const INK = "#122023";
const GREEN = "#2ecc40";
const WHITE = "#ffffff";

const groups: Record<"couple" | "friends" | "family" | "anyone", { width: number; dots: Dot[] }> = {
  // Two people close enough to overlap.
  couple: {
    width: 118,
    dots: [
      { cx: 58, cy: 60, r: 19, fill: GREEN },
      { cx: 88, cy: 60, r: 19, fill: WHITE },
    ],
  },
  // Two people with room between them, still held together.
  friends: {
    width: 150,
    dots: [
      { cx: 56, cy: 62, r: 17, fill: GREEN },
      { cx: 118, cy: 62, r: 17, fill: WHITE },
    ],
  },
  // Two grown-ups and a little one.
  family: {
    width: 158,
    dots: [
      { cx: 54, cy: 56, r: 20, fill: GREEN },
      { cx: 100, cy: 56, r: 20, fill: WHITE },
      { cx: 138, cy: 74, r: 11, fill: INK },
    ],
  },
  // A group of any size.
  anyone: {
    width: 158,
    dots: [
      { cx: 50, cy: 44, r: 10, fill: WHITE },
      { cx: 80, cy: 38, r: 10, fill: GREEN },
      { cx: 110, cy: 46, r: 10, fill: INK },
      { cx: 140, cy: 40, r: 10, fill: WHITE },
      { cx: 64, cy: 72, r: 10, fill: GREEN },
      { cx: 96, cy: 74, r: 10, fill: WHITE },
      { cx: 128, cy: 72, r: 10, fill: GREEN },
    ],
  },
};

export type EmbraceGroup = keyof typeof groups;

export const Embrace = ({ group, className }: { group: EmbraceGroup; className?: string }) => {
  const { width, dots } = groups[group];
  return (
    <svg viewBox="0 0 164 112" className={cn("h-auto w-full", className)} aria-hidden="true">
      <rect x="0" y="86" width={width} height="26" rx="13" fill={WHITE} />
      <rect x="0" y="0" width="26" height="112" rx="13" fill={INK} />
      {dots.map((d, i) => (
        <circle key={i} {...d} />
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
