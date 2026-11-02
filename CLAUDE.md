# CLAUDE.md

Livales company website: Astro 7 (static) + TypeScript + Tailwind, with small React islands, live at https://livales.com (Netlify, DNS on Cloudflare; keep DNS records grey-cloud). Full context is in `README.md`. Read only the section you need.

## Hard rules
- **Company-first.** Tagline (same as Instagram and Threads): "Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal." / "Closer to the people you love, and the world you want to know." (the world = new languages and cultures). **Relationships are the main focus** (couples, family, friends); language learning is never presented as a second pillar (hero, About, audience, FAQ). Products, in this order: **Kado Livales** (`KADO_URL`), **Kana Speed** (`KANA_URL`), then **Hearts & Ladders** (`HL_URL`, snakes and ladders for couples, in Android testing): live products before the one in testing, and no "side project" label. All three are public: name and link them freely (list in `src/content/products.ts`).
- **Hearts & Ladders: only say what its own site (heartsandladders.livales.com) says.** Never mention its private repo, its Firebase project, or unannounced features.
- **Light, flat, logo-derived; never dark, never "AI template".** White page, ink text, whole sections in soft flat tints (`livales-green-soft` / `livales-rose-soft`); saturated green `#2ECC40` / rose `#F07C8F` only for the logo, illustrations and small accents; shapes are the logo's pills and dots. No gradients, glows, shadows, eyebrow labels, highlighted headline words, 01/02 numbering, stat rows, or scroll animations. Headings Unbounded, body Figtree. See README → Brand → Visual system.
- **Logo** = "L Memeluk". Use `<Logo />` or the files in `public/brand/`. Never redraw it, and never bring back the old striped-arc logo or arc motifs.
- **All copy is bilingual.** Add both `id` and `en` keys in `src/i18n/ui.ts` and use `t()` from `useTranslations(lang)`. Never hard-code strings. Every page exists in Indonesian (root) and English (`/en/...`, URLs in `src/i18n/routes.ts`).
- **Zero JS by default.** Pages and components are `.astro`. Only `src/components/islands/` (MobileMenu, QuestionCard, Faq, WaitlistForm) ship JavaScript; keep it that way.
- **Firebase = project `livales` only** (collection `landing_subscribers`). After editing `firestore.rules`, run `npm run test:rules` before `npm run deploy:rules`.

## Commands
`npm run dev` · `npm run build` (static HTML per page and language + sitemap) · `npm run lint` · `npm run check` (astro check) · `npm run test:rules` (emulator on port 8085)

## Where things are
- Routes: `src/pages/` (Indonesian) and `src/pages/en/` (English), thin wrappers around `src/views/*.astro` (one view per page, both languages). Shared layout: `src/layouts/Base.astro` (head tags, hreflang, Organization JSON-LD) with Navbar, Updates sign-up and Footer from `src/components/layout/`
- Home sections: `src/components/home/`. Per-page title/description and JSON-LD builders: `src/lib/seo.ts`
- Blog articles: Markdown in `src/content/blog/<lang>/<slug>.md` (same slug in both languages; schema in `src/content.config.ts`). Adding the two files is enough: routes, lists, sitemap with hreflang, and JSON-LD follow (README → Adding a blog post)
- Tokens: `src/index.css` + `tailwind.config.ts`; layout helpers `.page`, `.heading-lg`, `.heading-md`, `.btn-ink`
- Illustrations: `src/components/brand/Embrace.astro` (the L embracing dots)
- Islands are rendered at build time and hydrated, so never read `localStorage`/`window` during their render; use `useEffect` (see README → Rendering and SEO)
- The canonical domain is `https://livales.com/`, no trailing slashes (`build.format: "file"`). SEO gotchas (FAQ answers stay in the HTML while closed, `{" "}` between inline phrases, square ≥48 px favicons) are in README → Rendering and SEO
- New live product? Follow README → Adding a product to the shelf (6 places)

## README sections
Rules · Project structure (section map, adding a post, adding a product) · Brand (logo geometry, colors, visual system) · How things work (i18n, rendering + SEO, Firebase) · Status and TODO · Deployment (previews, domain, DNS, Search Console)

Private notes that must not be committed go in `CLAUDE.local.md` (gitignored).
