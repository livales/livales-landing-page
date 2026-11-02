import { cn } from "@/lib/utils";
import type { ProductKey } from "@/content/products";
import { ProductMark } from "./ProductMark";

/*
 * Illustrations built from the logo's own parts: an L (stem + base) that
 * embraces something. The brand mark embraces one dot; each audience is the
 * same gesture around a different group of people (dots).
 * Colours are the logo's own (ink, green, rose), drawn on soft tinted fields.
 */

type Dot = { cx: number; cy: number; r: number; fill: string };

const INK = "#122023";
const GREEN = "#2ecc40";
const ROSE = "#f07c8f";

const groups: Record<"couple" | "family" | "anyone", { width: number; dots: Dot[] }> = {
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
  const { width, dots } = groups[group];
  return (
    <svg viewBox="0 0 164 112" className={cn("h-auto w-full", className)} aria-hidden="true">
      <rect x="0" y="86" width={width} height="26" rx="13" fill={ROSE} />
      <rect x="0" y="0" width="26" height="112" rx="13" fill={INK} />
      {dots.map((d, i) => (
        <circle key={`d${i}`} {...d} />
      ))}
    </svg>
  );
};

const lineup: { product: ProductKey; left: string; delay: string }[] = [
  { product: "kado", left: "20.5%", delay: "0.35s" },
  { product: "kana", left: "47.1%", delay: "0.5s" },
  { product: "hl", left: "73.8%", delay: "0.65s" },
];

/**
 * Home hero: the logo's L (green stem, rose base) embracing Livales' apps,
 * drawn as dots. On load they settle into the embrace one after another, the
 * home page's single orchestrated motion. Geometry is a 210 × 150 box.
 */
export const HeroLineup = ({ label, className }: { label: string; className?: string }) => (
  <div role="img" aria-label={label} className={cn("relative aspect-[210/150] w-full", className)}>
    <span
      className="absolute bottom-0 left-0 h-[21.3%] w-full animate-embrace-arm rounded-full bg-livales-rose"
      style={{ transformOrigin: "0% 50%" }}
    />
    <span className="absolute left-0 top-0 h-full w-[15.2%] rounded-full bg-livales-green" />
    {lineup.map(({ product, left, delay }) => (
      <span
        key={product}
        className="absolute top-[42.7%] w-[23.8%] animate-embrace-dot"
        style={{ left, animationDelay: delay }}
      >
        <ProductMark product={product} className="aspect-square w-full" />
      </span>
    ))}
  </div>
);

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
