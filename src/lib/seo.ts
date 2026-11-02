import type { Language } from "@/contexts/LanguageContext";
import { getPost, posts } from "@/content/posts";

/*
 * Per-page <title>, description and canonical URL. Used twice: by the
 * prerender (Indonesian, written into each page's HTML) and by usePageMeta in
 * the browser (follows the language toggle). Keep titles stable: changing
 * them often resets how search engines rank the page.
 */

export const SITE_URL = "https://livales.com";

export const ROUTES = {
  home: "/",
  products: "/produk",
  about: "/tentang",
  blog: "/blog",
} as const;

export const postPath = (slug: string) => `${ROUTES.blog}/${slug}`;

/** Every path the build writes as its own HTML file. */
export const prerenderPaths = [...Object.values(ROUTES), ...posts.map((p) => postPath(p.slug))];

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Extra JSON-LD for this page (the Organization graph is in index.html). */
  jsonLd?: object[];
}

type StaticPage = Exclude<keyof typeof ROUTES, "home">;

const pages: Record<Language, Record<"home" | StaticPage, Omit<PageMeta, "path">>> = {
  id: {
    home: {
      title: "Livales — Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal",
      description:
        "Livales membuat aplikasi yang mendekatkan kamu dengan orang tersayang: Kado Livales untuk mencari kado yang beneran disukai, Hearts & Ladders untuk pasangan, dan Kana Speed untuk belajar huruf Jepang.",
    },
    products: {
      title: "Produk — Kado Livales, Kana Speed, dan Hearts & Ladders | Livales",
      description:
        "Aplikasi buatan Livales: Kado Livales untuk mencari kado dan patungan, Kana Speed untuk belajar hiragana dan katakana, dan Hearts & Ladders, ular tangga untuk pasangan.",
    },
    about: {
      title: "Tentang Livales — Perusahaan teknologi dari Indonesia",
      description:
        "Livales merancang dan membangun aplikasi yang membuat kamu lebih dekat dengan pasangan, keluarga, dan teman. Kenali alasan kami ada dan cara kami bekerja.",
    },
    blog: {
      title: "Blog Livales — Hubungan, kado, dan kebiasaan yang mendekatkan",
      description:
        "Tulisan dari tim Livales: pertanyaan untuk pasangan, cara memilih kado, tips hubungan jarak jauh, dan kebiasaan kecil yang mendekatkan.",
    },
  },
  en: {
    home: {
      title: "Livales — Closer to the people you love, and the world you want to know",
      description:
        "Livales makes apps that bring you closer to the people you love: Kado Livales for finding gifts they'll actually like, Hearts & Ladders for couples, and Kana Speed for learning Japanese.",
    },
    products: {
      title: "Products — Kado Livales, Kana Speed, and Hearts & Ladders | Livales",
      description:
        "Apps by Livales: Kado Livales for finding and chipping in on gifts, Kana Speed for learning hiragana and katakana, and Hearts & Ladders, snakes and ladders for couples.",
    },
    about: {
      title: "About Livales — A technology company from Indonesia",
      description:
        "Livales designs and builds apps that bring you closer to your partner, family, and friends. Why we exist and how we work.",
    },
    blog: {
      title: "Livales blog — Relationships, gifts, and habits that bring people closer",
      description:
        "Writing from the Livales team: questions for couples, choosing gifts, long-distance tips, and small habits that bring people closer.",
    },
  },
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const getPageMeta = (path: string, language: Language): PageMeta | undefined => {
  const page = (Object.keys(ROUTES) as (keyof typeof ROUTES)[]).find((k) => ROUTES[k] === path);
  if (page) return { ...pages[language][page], path };

  const slug = path.startsWith(`${ROUTES.blog}/`) ? path.slice(ROUTES.blog.length + 1) : "";
  const post = getPost(slug);
  if (!post) return undefined;
  const copy = post.copy[language];
  return {
    title: `${copy.title} | Livales`,
    description: copy.description,
    path,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: copy.title,
        description: copy.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: language,
        mainEntityOfPage: `${SITE_URL}${path}`,
        image: `${SITE_URL}/og-image.png`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumbs([
        { name: "Livales", path: "/" },
        { name: "Blog", path: ROUTES.blog },
        { name: copy.title, path },
      ]),
    ],
  };
};

export const canonicalUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
