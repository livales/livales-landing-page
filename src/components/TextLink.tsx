import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const style =
  "font-semibold text-ink underline decoration-livales-rose decoration-[3px] underline-offset-[6px] hover:decoration-ink";

/** The site's secondary link: ink text over a rose underline. External links open in a new tab. */
const TextLink = ({
  to,
  children,
  className,
  newTabLabel,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  /** Screen-reader note for external links, e.g. "(opens in a new tab)". */
  newTabLabel?: string;
}) =>
  to.startsWith("mailto:") ? (
    <a href={to} className={cn(style, className)}>
      {children}
    </a>
  ) : to.startsWith("http") ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cn(style, className)}>
      {children}
      {newTabLabel && <span className="sr-only"> {newTabLabel}</span>}
    </a>
  ) : (
    <Link to={to} className={cn(style, className)}>
      {children}
    </Link>
  );

export default TextLink;
