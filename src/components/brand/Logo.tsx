import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show only the mark (the L embracing a dot), without the wordmark. */
  markOnly?: boolean;
  /** Use the white wordmark, for dark backgrounds. */
  inverted?: boolean;
}

/** Official Livales logo. Source files live in /public/brand. */
const Logo = ({ className, markOnly = false, inverted = false }: LogoProps) =>
  markOnly ? (
    <img
      src="/brand/livales-mark.svg"
      alt="Livales"
      width={80}
      height={92}
      className={cn("h-8 w-auto", className)}
    />
  ) : (
    <img
      src={inverted ? "/brand/livales-logo-white.svg" : "/brand/livales-logo.svg"}
      alt="Livales"
      width={375}
      height={94}
      className={cn("h-8 w-auto", className)}
    />
  );

export default Logo;
