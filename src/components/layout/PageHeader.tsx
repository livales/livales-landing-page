import type { ReactNode } from "react";

/** The top of an inner page: its h1 and a short lead. */
const PageHeader = ({ title, lead, aside }: { title: string; lead: string; aside?: ReactNode }) => (
  <header className="page grid items-end gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:gap-20 lg:pt-24">
    <div>
      <h1 className="heading-xl max-w-[16ch]">{title}</h1>
      <p className="prose-copy mt-7 text-ink/80">{lead}</p>
    </div>
    {aside}
  </header>
);

export default PageHeader;
