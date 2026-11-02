import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The top of an inner page: its h1 and a short lead, with an optional picture beside it. */
const PageHeader = ({
  title,
  lead,
  aside,
  wideAside = false,
}: {
  title: string;
  lead: string;
  aside?: ReactNode;
  /** Give the picture a wider column (for the product previews). */
  wideAside?: boolean;
}) => (
  <header
    className={cn(
      "page grid items-end gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:gap-20 lg:pt-24",
      wideAside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]"
    )}
  >
    <div>
      <h1 className="heading-xl max-w-[16ch]">{title}</h1>
      <p className="prose-copy mt-7 text-ink/80">{lead}</p>
    </div>
    {aside}
  </header>
);

export default PageHeader;
