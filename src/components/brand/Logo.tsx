import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show only the arc mark, without the "livales" wordmark. */
  markOnly?: boolean;
}

/** Official Livales logo (green mark + ink wordmark), for light backgrounds. */
const Logo = ({ className, markOnly = false }: LogoProps) =>
  markOnly ? (
    <img
      src="/brand/livales-mark.png"
      alt="Livales"
      width={509}
      height={526}
      className={cn("h-8 w-auto", className)}
    />
  ) : (
    <img
      src="/brand/livales-logo-dark.png"
      alt="Livales"
      width={1476}
      height={526}
      className={cn("h-8 w-auto", className)}
    />
  );

export default Logo;
