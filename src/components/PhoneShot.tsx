import { cn } from "@/lib/utils";

/**
 * A real app screenshot in a flat phone outline: an ink pill-cornered frame,
 * no shadow or perspective. Screenshots are 600 × 1334.
 */
const PhoneShot = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={cn("overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink", className)}>
    <img
      src={src}
      alt={alt}
      width={600}
      height={1334}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full rounded-[1.6rem]"
    />
  </div>
);

export default PhoneShot;
