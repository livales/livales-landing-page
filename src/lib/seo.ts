import { SITE_URL, absoluteUrl, type Locale, type Page } from "@/i18n/routes";

/*
 * Per-page <title> and description, and the JSON-LD the layout writes into
 * every page. Keep titles stable: changing them often resets how search
 * engines rank the page.
 */

export interface PageMeta {
  title: string;
  description: string;
}

export const pageMeta: Record<Locale, Record<Page, PageMeta>> = {
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

export const notFoundMeta: Record<Locale, PageMeta> = {
  id: { title: "Halaman tidak ditemukan | Livales", description: "Halaman ini tidak ada." },
  en: { title: "Page not found | Livales", description: "This page doesn't exist." },
};

/** The company and its apps, on every page (search engines read the logo, profiles and products from it). */
export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://livales.com/#organization",
      "name": "Livales",
      "url": "https://livales.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://livales.com/brand/icon-512.png",
        "width": 512,
        "height": 512
      },
      "description": "Perusahaan teknologi dari Indonesia yang merancang dan membangun aplikasinya sendiri, supaya kamu lebih dekat dengan orang tersayang: pasangan, keluarga, dan teman.",
      "areaServed": "ID",
      "sameAs": [
        "https://www.threads.com/@livalesofficial",
        "https://www.linkedin.com/company/livales/"
      ],
      "email": "admin@livales.com",
      "owns": [
        {
          "@id": "https://kado.livales.com/#app"
        },
        {
          "@id": "https://kana.livales.com/#app"
        },
        {
          "@id": "https://heartsandladders.livales.com/#app"
        }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://kana.livales.com/#app",
      "name": "Kana Speed",
      "url": "https://kana.livales.com/",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "inLanguage": [
        "id",
        "en"
      ],
      "description": "Belajar bahasa Jepang gratis dengan kuis interaktif: hiragana, katakana, salam, perkenalan diri, angka, dan waktu.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR"
      },
      "publisher": {
        "@id": "https://livales.com/#organization"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://kado.livales.com/#app",
      "name": "Kado Livales",
      "url": "https://kado.livales.com/",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "inLanguage": "id",
      "description": "Cari kado untuk ibu, ayah, pasangan, sahabat, atau rekan kerja: produk nyata dari marketplace Indonesia yang dipilih manual, plus wishlist dan patungan kado.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR"
      },
      "publisher": {
        "@id": "https://livales.com/#organization"
      }
    },
    {
      "@type": "MobileApplication",
      "@id": "https://heartsandladders.livales.com/#app",
      "name": "Hearts & Ladders",
      "url": "https://heartsandladders.livales.com/",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Android",
      "inLanguage": [
        "id",
        "en"
      ],
      "description": "Ular tangga untuk pasangan: lempar dadu, jawab pertanyaan dan tantangan, dan simpan jawabannya jadi kenangan. Main di satu HP atau dari jauh.",
      "publisher": {
        "@id": "https://livales.com/#organization"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://livales.com/#website",
      "name": "Livales",
      "url": "https://livales.com/",
      "inLanguage": [
        "id",
        "en"
      ],
      "publisher": {
        "@id": "https://livales.com/#organization"
      }
    }
  ]
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const blogPosting = (post: { title: string; description: string; date: string; lang: Locale; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: post.lang,
  mainEntityOfPage: absoluteUrl(post.path),
  image: `${SITE_URL}/og-image.png`,
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
});
