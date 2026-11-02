import { cn } from "@/lib/utils";
import type { ProductKey } from "@/content/products";

/*
 * Each product as a dot, the same round shape the logo uses for people.
 * Kado and Hearts & Ladders use their own logo files (public/products/);
 * Kana Speed has no logo yet, so it's the か character on ink.
 */
export const ProductMark = ({ product, className }: { product: ProductKey; className?: string }) => {
  // className goes last so callers can change the size or the dot's fill.
  const base = (fill?: string) =>
    cn("flex shrink-0 items-center justify-center overflow-hidden rounded-full", fill, className);

  if (product === "kado")
    return (
      <span aria-hidden="true" className={base("bg-livales-green-soft")}>
        <img src="/products/kado-livales.svg" alt="" width={48} height={48} className="h-[70%] w-[70%]" />
      </span>
    );
  if (product === "hl")
    return (
      <span aria-hidden="true" className={base()}>
        <img src="/products/hearts-and-ladders/icon.png" alt="" width={192} height={192} className="h-full w-full" />
      </span>
    );
  return (
    <span aria-hidden="true" className={base("bg-ink")}>
      <svg viewBox="0 0 48 48" className="h-full w-full">
        <text x="24" y="25" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="24" fontWeight="700">
          か
        </text>
      </svg>
    </span>
  );
};
