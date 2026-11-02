import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "@/i18n/routes";

export type Post = CollectionEntry<"blog"> & { slug: string; lang: Locale; isoDate: string };

/** One language's posts, newest first. */
export const getPosts = async (lang: Locale): Promise<Post[]> =>
  (await getCollection("blog", ({ id }) => id.startsWith(`${lang}/`)))
    .map((entry) => ({
      ...entry,
      slug: entry.id.slice(lang.length + 1),
      lang,
      isoDate: entry.data.date.toISOString().slice(0, 10),
    }))
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate) || a.data.order - b.data.order);

export const formatDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/**
 * The numbered lists of a post, read from its Markdown: the hero question card
 * uses the three lists of "30 questions for couples" as its three levels.
 */
export const orderedLists = (markdown: string): string[][] =>
  markdown
    .split(/\n{2,}/)
    .map((block) => block.split("\n"))
    .filter((lines) => lines.every((line) => /^\d+\.\s/.test(line)))
    .map((lines) => lines.map((line) => line.replace(/^\d+\.\s+/, "")));
