import { cn } from "@/lib/utils";

/**
 * Decorative concentric arcs echoing the Livales mark.
 * Purely visual — hidden from assistive tech.
 */
const ArcField = ({
  className,
  rings = 10,
  animate = true,
}: {
  className?: string;
  rings?: number;
  animate?: boolean;
}) => {
  const cx = 300;
  const cy = 300;
  const start = (205 * Math.PI) / 180;
  const end = (-25 * Math.PI) / 180;

  const arcs = Array.from({ length: rings }, (_, i) => {
    const r = 48 + i * 24;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy - r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy - r * Math.sin(end);
    return { d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 1 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`, i };
  });

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <defs>
        <linearGradient id="arc-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5fe06d" />
          <stop offset="60%" stopColor="#2ecc40" />
          <stop offset="100%" stopColor="#2ecc40" stopOpacity="0" />
        </linearGradient>
      </defs>
      {arcs.map(({ d, i }) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="url(#arc-stroke)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          opacity={1 - i * (0.7 / rings)}
          className={animate ? "animate-arc-draw" : undefined}
          style={animate ? { animationDelay: `${i * 90}ms` } : undefined}
        />
      ))}
    </svg>
  );
};

export default ArcField;
