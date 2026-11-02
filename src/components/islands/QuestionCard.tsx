import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  /** The numbered lists of "30 questions for couples", light to deep (src/lib/posts.ts → orderedLists). */
  lists: string[][];
  /** Link to that article in this page's language. */
  moreHref: string;
  /** The `hero.ask.*` strings from src/i18n/ui.ts, in this page's language. */
  copy: Record<string, string>;
  className?: string;
}

/**
 * Home hero: one question to ask the person you love tonight, drawn from the
 * "30 questions for couples" article (its three numbered lists are the three
 * levels, light to deep). A small working taste of what Livales makes, instead
 * of a picture of it. The first question is fixed so the server-rendered HTML
 * and the first client render match; shuffling starts on click.
 */
const QuestionCard = ({ lists, moreHref, copy, className }: QuestionCardProps) => {
  const t = (key: string) => copy[key] ?? key;
  const questions = lists.flatMap((items, level) => items.map((text) => ({ text, level })));
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const next = () => {
    setShuffled(true);
    setIndex((i) => {
      if (questions.length < 2) return i;
      let n = i;
      while (n === i) n = Math.floor(Math.random() * questions.length);
      return n;
    });
  };

  const current = questions[index];
  if (!current) return null;

  return (
    <figure className={className}>
      <div className="rounded-[2.5rem] bg-livales-rose-soft p-7 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <figcaption className="text-[1rem] font-semibold text-ink/70">{t("hero.ask.label")}</figcaption>
          {/* How deep the question goes: one to three filled pills. */}
          <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-3 pr-4 text-[0.9rem] font-semibold">
            <span aria-hidden="true" className="flex gap-1">
              {lists.map((_, l) => (
                <span key={l} className={cn("h-2 w-4 rounded-full", l <= current.level ? "bg-livales-rose" : "bg-ink/15")} />
              ))}
            </span>
            {t(`hero.ask.level${current.level + 1}`)}
          </span>
        </div>
        <p
          key={index}
          aria-live="polite"
          className={cn(
            "mt-7 min-h-[5.2em] font-display text-[1.6rem] font-semibold leading-[1.22] tracking-[-0.015em] sm:text-[2.1rem]",
            shuffled && "animate-in fade-in duration-300"
          )}
        >
          {current.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          {/* The two of you: the logo's dots, close enough to overlap. */}
          <span aria-hidden="true" className="flex">
            <span className="h-11 w-11 rounded-full bg-livales-green" />
            <span className="-ml-3.5 h-11 w-11 rounded-full bg-livales-rose" />
          </span>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[1rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            {t("hero.ask.next")}
          </button>
        </div>
      </div>
      <a
        href={moreHref}
        className="ml-2 mt-5 inline-block text-[1rem] font-semibold underline decoration-livales-rose decoration-[3px] underline-offset-[6px] hover:decoration-ink"
      >
        {t("hero.ask.more")}
      </a>
    </figure>
  );
};

export default QuestionCard;
