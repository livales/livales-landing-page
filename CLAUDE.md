# CLAUDE.md

Livales company website: React 18 + Vite + TypeScript + Tailwind, live at https://livales.com (Netlify, DNS on Cloudflare; keep DNS records grey-cloud). Full context is in `README.md`. Read only the section you need.

## Hard rules
- **Company-first.** Tagline (same as Instagram and Threads): "Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal." / "Closer to the people you love, and the world you want to know." (the world = new languages and cultures). **Relationships are the main focus** (couples, family, friends); language learning is never presented as a second pillar (hero, About, audience, FAQ). Products, in this order: **Kado Livales** (`KADO_URL`), **Kana Speed** (`KANA_URL`), then **Hearts & Ladders** (`HL_URL`, snakes and ladders for couples, in Android testing): live products before the one in testing, and no "side project" label. All three are public: name and link them freely (list in `src/content/products.ts`).
- **Hearts & Ladders: only say what its own site (heartsandladders.livales.com) says.** Never mention its private repo, its Firebase project, or unannounced features.
- **Light, flat, logo-derived; never dark, never "AI template".** White page, ink text, whole sections in soft flat tints (`livales-green-soft` / `livales-rose-soft`); saturated green `#2ECC40` / rose `#F07C8F` only for the logo, illustrations and small accents; shapes are the logo's pills and dots. No gradients, glows, shadows, eyebrow labels, highlighted headline words, 01/02 numbering, stat rows, or scroll animations. Headings Unbounded, body Figtree. See README → Brand → Visual system.
- **Logo** = "L Memeluk". Use `<Logo />` or the files in `public/brand/`. Never redraw it, and never bring back the old striped-arc logo or arc motifs.
- **All copy is bilingual.** Add both `id` and `en` keys in `src/contexts/LanguageContext.tsx` and use `t()`. Never hard-code strings.
- **Firebase = project `livales` only** (collection `landing_subscribers`). After editing `firestore.rules`, run `npm run test:rules` before `npm run deploy:rules`.

## Commands
`npm run dev` · `npm run build` (includes prerender of every page) · `npm run lint` · `npm run test:rules` (emulator on port 8085)

## Where things are
- Pages: `/` `src/pages/Index.tsx` (sections in `src/components/home/`), `/produk`, `/tentang`, `/blog`, `/blog/:slug`. Routes in `src/App.tsx` + `ROUTES` in `src/lib/seo.ts` (also per-page title/description). Navbar, updates sign-up and footer: `src/components/layout/`
- Blog articles: `src/content/posts.ts` (id + en). Adding one there is enough: route, prerender, sitemap, and JSON-LD follow
- Tokens: `src/index.css` + `tailwind.config.ts`; layout helpers `.page`, `.heading-lg`, `.heading-md`, `.btn-ink`
- Illustrations: `src/components/brand/Embrace.tsx` (the L embracing dots)
- Every page is prerendered (`produk.html`, `blog/<slug>.html`, `404.html`, `sitemap.xml`) and hydrated, so never read `localStorage`/`window` during render; use `useEffect` (see README → Prerendering and SEO)
- SEO tags + JSON-LD live in `index.html`; the canonical domain is `https://livales.com/`. SEO gotchas (force-mounted FAQ answers, `{" "}` between inline phrases, square ≥48 px favicons) are in README → Prerendering and SEO
- New live product? Follow README → Adding a product to the shelf (6 places)
- `src/components/ui/` is shadcn scaffold. Mostly unused, so don't restyle it.

## README sections
Rules · Project structure (section map, adding a product) · Brand (logo geometry, colors, visual system) · How things work (i18n, prerender + SEO, Firebase) · Status and TODO · Deployment (previews, domain, DNS, Search Console)

Private notes that must not be committed go in `CLAUDE.local.md` (gitignored).
