import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/*
 * Blog articles, one Markdown file per language: src/content/blog/<lang>/<slug>.md.
 * Both languages share the slug (the URL is /blog/<slug> and /en/blog/<slug>).
 * Keep them useful on their own: the link to a Livales product comes at the end
 * (`product`), not in every paragraph.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences: the meta description and the lead paragraph. */
    description: z.string(),
    date: z.coerce.date(),
    /** Breaks ties between posts published on the same day (lower comes first). */
    order: z.number().default(0),
    readMinutes: z.number(),
    /** The Livales product the article leads to, if any. */
    product: z.enum(["kado", "kana", "hl"]).optional(),
  }),
});

export const collections = { blog };
