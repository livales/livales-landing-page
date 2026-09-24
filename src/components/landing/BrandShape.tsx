import { cn } from "@/lib/utils";

/**
 * Decorative outline of the Livales mark (the L embracing a dot).
 * Purely visual — hidden from assistive tech.
 */
const BrandShape = ({ className }: { className?: string }) => (
  <svg
    viewBox="-4 -4 88 100"
    fill="none"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <rect x="0" y="62" width="80" height="30" rx="15" stroke="#f07c8f" strokeWidth="2" />
    <rect x="0" y="0" width="30" height="92" rx="15" stroke="#2ecc40" strokeWidth="2" />
    <circle cx="58" cy="32" r="15" stroke="#2ecc40" strokeWidth="2" />
  </svg>
);

export default BrandShape;
