import { useId, useState } from "react";

interface FaqProps {
  /** Questions and answers in this page's language (`faq.q1`/`faq.a1`, … in src/i18n/ui.ts). */
  items: { q: string; a: string }[];
}

/**
 * The home FAQ: one answer open at a time, each question an h3 with a button
 * (so screen readers can jump between questions by heading). Every answer is in
 * the HTML even while closed, so search engines can read it; CSS hides it.
 * Open and close are both instant: animating only the open made the page shrink
 * then grow (the footer jumped) when switching questions.
 */
const Faq = ({ items }: FaqProps) => {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-ink/15">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="border-b border-ink/15">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.15rem] font-semibold sm:text-[1.25rem]"
              >
                {q}
                {/* Plus that turns into a minus: two pills, the vertical one collapses. */}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[3px] w-4 -translate-y-1/2 rounded-full bg-ink" />
                  <span className="absolute left-1/2 top-0 h-4 w-[3px] -translate-x-1/2 rounded-full bg-ink transition-transform duration-200 group-aria-expanded:scale-y-0" />
                </span>
              </button>
            </h3>
            <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className={isOpen ? undefined : "hidden"}>
              <p className="max-w-[40rem] pb-7 pr-10 text-[1.05rem] leading-relaxed text-ink/75">{a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
