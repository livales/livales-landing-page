# Livales — company website

The public website for **Livales**, an Indonesian technology company that designs and builds its own apps. Tagline: **"Lebih dekat dengan orang tersayang, dan dunia yang ingin kamu kenal."** / **"Closer to the people you love, and the world you want to know."** (the world = new languages and cultures).

This README is also the main context file for AI coding assistants working on the repo. Read the **Rules** section before changing copy, visuals, or the logo.

---

## Rules (read first)

1. **The page is about the company, not one product.** Positioning follows the tagline shared with Instagram and Threads: closer to the people you love, and to the world you want to know (new languages and cultures). **Relationships are the main focus** (couples, family, friends). Language learning is not a second pillar, so don't present it as one in the hero, About, Who it's for, FAQ, or meta tags. Say "aplikasi / apps" rather than "software" in copy. Products are shown as a growing shelf, in this order:
   - **Kado Livales** (live, public, Indonesian with an English version at `/en`): gift recommendations from Indonesian marketplaces, plus wishlists and group gifts ("patungan"), at [kado.livales.com](https://kado.livales.com/). It can be named, described, and linked.
   - **Kana Speed** (live, public): a free web app for learning Japanese through quizzes, at [kana.livales.com](https://kana.livales.com/id/). It can be named, described, and linked. Don't label it a "side project": every live product counts.
   - **Hearts & Ladders** (public, in Android testing): snakes and ladders for couples, at [heartsandladders.livales.com](https://heartsandladders.livales.com/) (`/en` for English). Testers sign up on its own site (`#gabung`). Live products come before it.
2. **Describe Hearts & Ladders only with what its own site says.** It was confidential until its site launched (Nov 2026). Never mention its private repository, its Firebase project, or features its site doesn't announce. The screenshots in `public/products/hearts-and-ladders/` are copied from its site.
3. **Light, never dark, and no generic "AI template" styling.** The brand is about people and the things they care about (couples, family, friends), so it should feel friendly. A dark design was rejected as creepy ("menyeramkan"). A later design full of stock patterns (eyebrow labels, gradient headline words, glows, identical shadowed cards, 01/02 numbering, stat rows, fade-up animations) was rejected as "AI slop". Follow the visual system in [Brand → Visual system](#visual-system).
4. **Use the official logo files only** (see [Brand](#brand)). Don't redraw, recolor, rotate, stretch, or add effects to the mark. The old striped-arc logo was a stock design shared with another company, so never bring it or arc-stripe motifs back.
5. **Bilingual copy.** Every user-facing string lives in `src/i18n/ui.ts` with both `id` (default) and `en` values, and every page exists in both languages (Indonesian at the root, English under `/en`). Don't hard-code text in components.

---

## Stack

| | |
|---|---|
| Framework | Astro 7 (static output) + TypeScript. Pages and components are `.astro` and ship no JavaScript; the few interactive parts are React 18 islands |
| Content | Blog articles are Markdown in an Astro content collection (`src/content/blog/`) |
| Styling | Tailwind CSS 3 (via PostCSS) with CSS-variable tokens in `src/index.css` |
| Fonts | Unbounded (headings, `font-display`) + Figtree (body, `font-sans`) from Google Fonts. The logo wordmark is outlined Urbanist. |
| Icons | lucide-react |
| Backend | Firebase project **`livales`**: Firestore only, used for email sign-ups |
| Hosting | Netlify site `livales` (`netlify.toml`), served at **https://livales.com**. `livales.netlify.app` 301-redirects to it. |

## Getting started

```sh
npm install
npm run dev          # Astro dev server
npm run build        # static site → dist/ (one HTML file per page and language, sitemap)
npm run preview      # serve dist/ locally
npm run lint         # ESLint (TS/TSX)
npm run check        # astro check (types in .astro files)
npm run test:rules   # Firestore rules tests in the emulator (needs Java)
npm run deploy:rules # deploy firestore.rules to the livales project (needs `firebase login`)
```

`npm` with `package-lock.json` is the source of truth.

---

## Project structure

```
astro.config.mjs            Site URL, no trailing slashes, build.format "file", id/en i18n, React islands, sitemap (with hreflang)
netlify.toml                Build command, livales.netlify.app → livales.com, /sitemap.xml → /sitemap-index.xml, English 404
firebase.json / .firebaserc Firebase project "livales"; emulator on port 8085
firestore.rules             Security rules (only landing_subscribers is writable)
tests/                      Firestore rules tests (@firebase/rules-unit-testing)
public/
  brand/                    Official Livales logo files (SVG + PNG) and app icons
  products/                 Product marks (kado-livales.svg = Kado's gift-tag logo), per-app screenshots, hearts-and-ladders/ (icon + screenshots from its site)
  favicon.* (svg, ico, 16–192 px png) / apple-touch-icon.png / site.webmanifest
  og-image.png / og-image-en.png  Link previews (1200 × 630) per language, rendered from scripts/og-image.html by `npm run og-image` (tagline from ui.ts)
  robots.txt                Points to sitemap-index.xml (written by @astrojs/sitemap)
src/
  pages/                    Routes only: index, produk, tentang, blog/index, blog/[slug], 404, and the same under en/ (products, about, …)
  views/                    One file per page (Home, Products, About, Blog, BlogPost, NotFound), shared by both languages
  layouts/Base.astro        <head> (meta, canonical, hreflang, OG, Organization JSON-LD, favicons, fonts) + Navbar, page, Updates, Footer
  components/layout/        Navbar, Updates (sign-up section), Footer, PageHeader, nav.ts (navbar pages)
  components/home/          Home page sections (Hero, HeartsAndLadders, Lineup, Why, BlogTeaser, Faq)
  components/islands/       The only client JavaScript: MobileMenu, QuestionCard, Faq, WaitlistForm (React)
  components/               ProductList, ProductStack, PostList, PhoneShot, TextLink (.astro), LanguageLinks (React, rendered static in the navbar)
  components/brand/         Logo, HeroMark (animated mark, About), Embrace (illustrations), ProductMark (each product as a dot)
  content/blog/<lang>/      Blog articles, Markdown, one file per language with the same slug
  content.config.ts         Blog collection schema (title, description, date, order, readMinutes, product)
  content/products.ts       The product shelf (order, URLs, live or testing, screenshots)
  i18n/ui.ts                All copy (id/en), product/social URLs, useTranslations()
  i18n/routes.ts            URLs per language (pagePaths, postPath, normalizePath, alternatePath for the language switch and hreflang)
  lib/seo.ts                Per-page title/description, Organization graph, BlogPosting + breadcrumb JSON-LD
  lib/posts.ts              getPosts(lang), formatDate, orderedLists (the hero card's questions, from the article's rendered HTML)
  lib/subscribe.ts          Writes a sign-up to Firestore (SDK lazy-loaded)
  index.css                 Design tokens + global/component styles
```

### Pages

Every page shares `layouts/Base.astro`: Navbar (Produk, Blog, Tentang, ID / EN links to the same page in the other language, "Ikuti kabar" → `#updates`), the page, the **Updates** sign-up (soft rose field, `#updates`), and the Footer. Each page exists twice: Indonesian at the path below, English under `/en` (`/en`, `/en/products`, `/en/about`, `/en/blog`, `/en/blog/<slug>`).

| Path | View | Contents |
|---|---|---|
| `/` | `views/Home.astro` + `components/home/*` | Hero (tagline + a card with a question to ask your partner, reshuffled on click from the "30 pertanyaan untuk pasangan" article) → Hearts & Ladders (**soft rose**, screenshots, tester CTA to its site) → Lineup (**soft green**, `ProductList`) → Why Livales → latest blog posts → FAQ |
| `/produk` | `views/Products.astro` | Header with `ProductStack` (a fanned stack of real phone screenshots, one per app, each linking to its section), then one section per app (white, **soft green**, **soft rose**): description, features, platform/language/price facts, link |
| `/tentang` | `views/About.astro` | Why we exist (note from the team), Who it's for (**soft rose**, `Embrace`), How we work, Contact |
| `/blog` | `views/Blog.astro` | All articles, newest first |
| `/blog/<slug>` | `views/BlogPost.astro` | Article, a callout for the related Livales app, more articles |

Section headings use the `.heading-lg` / `.heading-md` classes from `index.css`, content sits in `.page` (the max-width container), and article bodies use `.article`.

### Adding a blog post

Add two Markdown files with the same name (the slug): `src/content/blog/id/<slug>.md` and `src/content/blog/en/<slug>.md`. Frontmatter:

```yaml
title: "…"            # also the <title> (with " | Livales")
description: "…"      # meta description and the lead paragraph
date: 2026-11-02      # YYYY-MM-DD; the newest post comes first
order: 4              # breaks ties between posts on the same date (lower first)
readMinutes: 5
product: kado         # optional: kado | kana | hl, the app the closing callout links to
```

The body is plain Markdown (`##` headings, paragraphs, `-` and `1.` lists; quotes and dashes are kept as typed). Both URLs, the blog lists, the sitemap entry with hreflang, and the `BlogPosting` + breadcrumb JSON-LD follow from the files. Keep slugs in Indonesian and never change a published slug. Write both languages when you can; a post in one language only works too (no hreflang, and the other language's link goes to its blog). The hero question card reads the numbered lists of `pertanyaan-untuk-pasangan.md` in each language, so keep those lists as questions: the build fails if they disappear.

### Adding a product to the shelf

When a new Livales product goes live, update all of these in one PR:

1. `src/i18n/ui.ts`: a URL constant (like `KADO_URL`), `product.<key>.*` (name, short, cta, status) and `products.<key>.*` (body, features, facts) in **both** `id` and `en`. Update `lineup.*`, `products.body`, and the FAQ answers (`faq.a2`, `faq.a4`) too.
2. `src/content/products.ts`: add it to the list (live products before the one in testing), with a `preview` screenshot per language: 600 × 1334 WebP of its home page at a 375 px-wide viewport, in `public/products/<key>/`. Add its place in `ProductStack.astro`. Footer, home lineup and `/produk` read from here; add its feature keys in `views/Products.astro`.
3. `src/components/brand/ProductMark.astro`: its dot (put image files in `public/products/`).
4. `src/lib/seo.ts`: add it to `organizationGraph` (and its `@id` to the Organization's `owns`), and update the home and products descriptions in both languages.
5. `astro.config.mjs`: bump `PAGES_UPDATED` (the sitemap's lastmod for non-blog pages).
6. This README (Rules → products list) and `CLAUDE.md`.

---

## Brand

**Logo: "L Memeluk"** (adopted Sept 2026). The **L** of Livales (green stem + rose base) embraces a green dot, the person you care about.

- Mark geometry (80 × 92 units): stem `30×92, r15` green; base `80×30, r15` rose, drawn *under* the stem; dot `ø30` centered at `(58, 32)`.
- Full-logo canvas is 375 × 94. It's 2 units taller than the mark because round letters overshoot the baseline.
- Wordmark: lowercase "livales" in Urbanist SemiBold, tracking −1.5%, outlined to paths in the SVGs. (The site itself uses Unbounded + Figtree; see below.)
- Clear space: at least one dot diameter (30 units) on every side. Minimum size: mark 16 px, full logo 96 px wide.

| File (`public/brand/`) | Use |
|---|---|
| `livales-logo.svg` / `.png` | Default logo, dark wordmark |
| `livales-logo-white.svg` / `.png` | On dark backgrounds |
| `livales-mark.svg` | Mark only |
| `icon-192.png`, `icon-512.png` | App/PWA icons (white background) |

### Colors

| Token | Hex | Use |
|---|---|---|
| `background` | `#FFFFFF` | Page (plain white) |
| `ink` / `foreground` | `#122023` | Text, primary buttons (`.btn-ink`), wordmark |
| `livales-green` / `primary` | `#2ECC40` | Logo, illustrations, small accents only, **never a section background** |
| `livales-rose` | `#F07C8F` | Logo, illustrations, link underlines, small accents only, **never a section background** |
| `livales-green-soft` | `#E6F5E3` | Section field behind Products |
| `livales-rose-soft` | `#FCE8EB` | Section fields behind Who it's for and Updates |
| `livales-green-deep` | `#168A2A` | Green **text** on white, if ever needed (brand green fails contrast as text) |

Tokens live in `src/index.css` (`:root` HSL variables) and `tailwind.config.ts` (`ink`, `livales.*`). Never put white text on green or rose, because the contrast is too low. Use ink.

### Visual system

- **Colour comes in flat fields**: whole sections in the *soft* tints (`green-soft`, `rose-soft`), never as gradients, glows, blurred blobs, or shadows. Full-strength green and rose as section backgrounds were rejected as too high-contrast, so keep saturated colour for the logo, illustrations, and small accents. Hairlines are `border-ink/10`–`/15`.
- **Shapes come from the logo:** pills (fully rounded rectangles) and dots. Illustrations are the logo's gesture, an L embracing dots (`Embrace.astro`). Buttons and inputs are pills.
- **Type:** Unbounded for headings (sentence case, tight tracking), Figtree for everything else. No uppercase labels above headings, no single highlighted word in a headline, no monospace captions, no "→" on buttons.
- **Motion:** at most one orchestrated moment per page: the mark's dot settling into the L's embrace on the About page (`embrace-dot` / `embrace-arm` keyframes). The home hero has no load animation; its question card only fades when you shuffle it. No scroll-triggered animations. Interaction feedback (accordion open, button hover) is fine.
- **Structure means something:** no decorative numbering, stat rows, or bento grids. Lists are lists; the product shelf is literally a lineup that will grow.
- **Copy voice:** plain, warm Indonesian ("kami" talking to "kamu"), specific rather than salesy.

---

## How things work

### Copy and language

- Each page knows its language from its route (`src/pages/` vs `src/pages/en/`) and passes `lang` down. Components call `const t = useTranslations(lang)` and `t("section.key")`, which reads `ui[lang]` in `src/i18n/ui.ts`. Missing keys render the key itself, so add both `id` and `en` values for every new string.
- URLs live in `src/i18n/routes.ts`. English pages have English names (`/en/products`, `/en/about`), blog posts keep one slug in both languages. `alternatePath()` gives the same page in the other language, used by the ID / EN links and the `hreflang` tags. A new page only needs its pair in `pagePaths`; `astro.config.mjs` builds the sitemap alternates from it. A blog post may exist in one language only: it then gets no hreflang for the other (in the page and the sitemap), and its other-language link goes to that language's blog.
- Islands don't import the dictionary: the page passes them only the strings they need as props.

### Rendering and SEO

- `npm run build` (Astro, `output: "static"`, `build.format: "file"`) writes every page in both languages to its own file: `index.html`, `produk.html`, `tentang.html`, `blog.html`, `blog/<slug>.html`, `en.html`, `en/products.html`, … plus `404.html` and `en/404.html` (noindex). Netlify serves `/produk` from `produk.html` without a trailing-slash redirect, so URLs match their canonicals (`trailingSlash: "never"`). Unknown paths get a real 404 status: `en/404.html` under `/en/*` (a `netlify.toml` rule), `404.html` elsewhere. There is no SPA fallback.
- **Only islands ship JavaScript:** `MobileMenu` (`client:load`; it also draws the line under the sticky header on scroll), `QuestionCard` (`client:load`, home only) `Faq` (`client:visible`, home only) and `WaitlistForm` (`client:load`: before hydration, a submit would reload the page). Everything else is `.astro` and renders to plain HTML. Keep new interactive bits small and in `src/components/islands/`.
- **Keep an island's first render deterministic.** Islands are rendered at build time and hydrated in the browser, so reading `localStorage`, `window`, dates, or random values during render causes a hydration mismatch. Read those in `useEffect`. Example: `QuestionCard` always starts on the first question and shuffles on click.
- **Per-page meta** comes from `Base.astro` props: title/description (`pageMeta` in `src/lib/seo.ts`, or the post's frontmatter), canonical, `hreflang` id/en/x-default, `og:*`, `twitter:*`, `og:locale`. Articles add `BlogPosting` + `BreadcrumbList` JSON-LD.
- Site-wide JSON-LD (`organizationGraph` in `src/lib/seo.ts`) is on every page: `Organization` (which `owns` each product), a `WebApplication` per web app, a `MobileApplication` for Hearts & Ladders, and `WebSite`.
- **Sitemap:** `@astrojs/sitemap` writes `sitemap-index.xml` + `sitemap-0.xml` with both languages, `xhtml:link` hreflang alternates for each pair, and `lastmod` from each post's `date` or `PAGES_UPDATED` (in `astro.config.mjs`) for other pages; bump it when their content changes meaningfully. `/sitemap.xml` 301-redirects to the index, and `public/robots.txt` points to it.
- **FAQ answers are in the HTML:** the `Faq` island renders every answer and hides closed ones with CSS, so search engines read them all. Each question is an `h3` holding a button (screen readers can jump between questions by heading). Open and close are both instant on purpose: animating only the open made the footer jump when switching questions.
- **Put whitespace between adjacent inline elements** (`{" "}` in `.astro`/JSX) when they hold separate phrases, such as two buttons side by side or a name + description in a card. Without it, extracted text glues words together. Google once showed "Lihat produk kamiIkuti kabar".
- **Favicons for Google Search** must be square (1:1) and a multiple of 48 px. `favicon.ico` (16/32/48), `favicon-96x96.png`, `favicon-192x192.png`, and a square `favicon.svg` cover this; keep them in sync if the mark changes.

### Email sign-ups (Firebase)

- `WaitlistForm` → `subscribe(email, lang, source)` in `src/lib/subscribe.ts` → Firestore collection **`landing_subscribers`** in Firebase project **`livales`** (region `asia-southeast2`, Jakarta). Fields: `email`, `lang`, `source`, `createdAt` (server timestamp).
- `firebase/app` and `firebase/firestore/lite` are dynamically imported on submit, so they're not in the main bundle.
- The web config in `subscribe.ts` is public by design. Security comes from `firestore.rules`: anonymous **create only**, with strict validation (exact field set, email format and max 254 chars, `lang ∈ {id,en}`, `source` ≤ 32 chars, `createdAt == request.time`). No reads, updates, or deletes from clients. View sign-ups in the Firebase Console.
- **This site must never use any other Firebase project.** Other Livales projects are separate on purpose.
- After changing rules, run `npm run test:rules`, then `npm run deploy:rules`. New rules can take 1–2 minutes to go live, so an early `permission-denied` right after deploying is expected.

---

## Status and TODO

- **Live** at https://livales.com (HTTPS, `www` → apex), verified in Google Search Console, with `sitemap.xml` submitted. See [Domain, DNS and Search Console](#domain-dns-and-search-console).
- SEO backlog: keep publishing blog posts for non-brand keywords; in Search Console, submit `https://livales.com/sitemap-index.xml` (it now lists the English pages too) after the Astro launch.
- **Google Search favicon:** Google's favicon service already has the new mark, but search results showed the default globe right after launch. They update on Google's schedule; Search Console → URL Inspection → Request indexing can speed it up.
- Social: only LinkedIn (`linkedin.com/company/livales`) exists so far. Add others to `src/components/layout/Footer.astro` when they're created.
- Optional: Firebase App Check if the sign-up form gets spammed.
- Optional: the islands use React 18 (~45 KB gzipped, shared). Preact (as on kana.livales.com) would cut that if page weight becomes a concern.

## Deployment

The site deploys through Netlify: `npm run build`, publishing `dist/` (see `netlify.toml`), with `main` as the production branch. Merging to `main` redeploys https://livales.com in about 1–2 minutes. Every PR gets a deploy preview at `https://deploy-preview-<PR number>--livales.netlify.app` (Netlify sends `X-Robots-Tag: noindex` on previews, so they never compete in search). Use it for design review before merging.

Redeploying doesn't reset search ranking: the URL, canonical, and content stay the same. Ranking moves on a new site and after big title or copy changes, so avoid frequent changes to the `<title>` and meta description. Firestore rules are **not** deployed by Netlify; run `npm run deploy:rules` separately.

### Domain, DNS and Search Console

- **Registrar and DNS:** `livales.com` is registered at Cloudflare Registrar (auto-renew on), with DNS hosted on Cloudflare.
- **DNS records** (Cloudflare → DNS → Records):

  | Type | Name | Content | Proxy |
  |---|---|---|---|
  | `A` | `@` | `75.2.60.5` (Netlify load balancer) | **DNS only** |
  | `CNAME` | `www` | `livales.netlify.app` | **DNS only** |
  | `TXT` | `@` | `google-site-verification=…` | – |

- **Keep both web records on DNS only (grey cloud).** Turning on the Cloudflare proxy (orange cloud) stops Netlify from renewing its Let's Encrypt certificate and breaks HTTPS. Netlify already serves the site through its own CDN.
- **Netlify** (Domain management): `livales.com` is the primary domain, and `www.livales.com` redirects to it automatically. The HTTPS certificate is issued by Let's Encrypt and auto-renews.
- **Google Search Console:** a *Domain* property verified by the `TXT` record above. **Don't delete that record**, or verification is lost. The sitemap was submitted as the full URL `https://livales.com/sitemap.xml` (Domain properties require the full URL); it now redirects to `https://livales.com/sitemap-index.xml`, which should be submitted too.
