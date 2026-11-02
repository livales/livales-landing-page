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
5. **Bilingual copy.** Every user-facing string lives in `src/contexts/LanguageContext.tsx` with both `id` (default) and `en` values. Don't hard-code text in components.

---

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript, built with Vite 5 |
| Styling | Tailwind CSS 3 with CSS-variable tokens in `src/index.css`; shadcn/ui primitives in `src/components/ui` |
| Fonts | Unbounded (headings, `font-display`) + Figtree (body, `font-sans`) from Google Fonts. The logo wordmark is outlined Urbanist. |
| Icons | lucide-react |
| Backend | Firebase project **`livales`**: Firestore only, used for email sign-ups |
| Hosting | Netlify site `livales` (`netlify.toml`), served at **https://livales.com**. `livales.netlify.app` 301-redirects to it. |

## Getting started

```sh
npm install
npm run dev          # Vite dev server
npm run build        # production build → dist/, then prerenders "/" into dist/index.html
npm run lint
npm run test:rules   # Firestore rules tests in the emulator (needs Java)
npm run deploy:rules # deploy firestore.rules to the livales project (needs `firebase login`)
```

`npm` with `package-lock.json` is the source of truth. `bun.lockb` is a leftover from the original Lovable scaffold and is not kept in sync.

---

## Project structure

```
index.html                  HTML template: meta/OG tags (rewritten per page), Organization JSON-LD, favicons, fonts
netlify.toml                Build command, livales.netlify.app → livales.com redirect (no SPA fallback)
scripts/prerender.mjs       Build step: writes every page, 404.html and sitemap.xml into dist/
firebase.json / .firebaserc Firebase project "livales"; emulator on port 8085
firestore.rules             Security rules (only landing_subscribers is writable)
tests/                      Firestore rules tests (@firebase/rules-unit-testing)
public/
  brand/                    Official Livales logo files (SVG + PNG) and app icons
  products/                 Product marks (kado-livales.svg = Kado's gift-tag logo) and hearts-and-ladders/ (icon + screenshots from its site)
  favicon.* (svg, ico, 16–192 px png) / apple-touch-icon.png / site.webmanifest / og-image.png
  robots.txt                (sitemap.xml is generated by the prerender)
src/
  main.tsx                  Hydrates the prerendered page (createRoot in dev, where the root is empty)
  entry-server.tsx          Build-time render of a route to HTML, plus the SEO data the prerender needs
  App.tsx                   AppProviders + AppRoutes (shared by browser and prerender)
  pages/                    Index (/), Products (/produk), About (/tentang), Blog (/blog), BlogPost (/blog/:slug), NotFound
  components/layout/        SiteLayout (Navbar + page + Updates sign-up + Footer), PageHeader
  components/home/          Home page sections
  components/               ProductList, PostList, PhoneShot, TextLink, WaitlistForm, LanguageSelector
  components/brand/Logo.tsx <Logo />, <Logo markOnly />, <Logo inverted />
  components/brand/Embrace.tsx  <HeroLineup /> (home hero), <HeroMark /> (animated mark), <Embrace group=… />
  components/brand/ProductMark.tsx  Each product as a dot (Kado tag, Kana か, Hearts & Ladders icon)
  content/products.ts       The product shelf (order, URLs, live or testing)
  content/posts.ts          Blog articles (id + en)
  lib/seo.ts                ROUTES, per-page title/description, BlogPosting + breadcrumb JSON-LD
  hooks/usePageMeta.ts      Updates title/description/canonical on client navigation and language change
  components/LanguageSelector.tsx  ID/EN toggle
  contexts/LanguageContext.tsx     All copy (id/en) + t() helper; choice saved in localStorage
  lib/subscribe.ts          Writes a sign-up to Firestore (SDK lazy-loaded)
  index.css                 Design tokens + global/component styles
  components/ui/            shadcn/ui primitives (mostly unused; keep for future pages)
```

### Pages

Every page shares the layout: Navbar (Produk, Blog, Tentang, language toggle, "Ikuti kabar" → `#updates`), the page, the **Updates** sign-up (soft rose field, `#updates`), and the Footer.

| Path | File | Contents |
|---|---|---|
| `/` | `pages/Index.tsx` + `components/home/*` | Hero (the logo's L embracing the three apps as dots, the home page's one animation) → Hearts & Ladders (**soft rose**, screenshots, tester CTA to its site) → Lineup (**soft green**, `ProductList`) → Why Livales → latest blog posts → FAQ |
| `/produk` | `pages/Products.tsx` | One section per app (white, **soft green**, **soft rose**): description, features, platform/language/price facts, link |
| `/tentang` | `pages/About.tsx` | Why we exist (note from the team), Who it's for (**soft rose**, `Embrace`), How we work, Contact |
| `/blog` | `pages/Blog.tsx` | All articles, newest first |
| `/blog/:slug` | `pages/BlogPost.tsx` | Article, a callout for the related Livales app, more articles |

Section headings use the `.heading-lg` / `.heading-md` classes from `index.css`, content sits in `.page` (the max-width container), and article bodies use `.article`.

### Adding a blog post

Add an entry to `src/content/posts.ts` with both `id` and `en` copy, a `date`, `readMinutes`, and optionally the `product` it leads to. The route, prerendered HTML, sitemap entry, and `BlogPosting` JSON-LD all come from that list. Keep slugs in Indonesian and never change a published slug.

### Adding a product to the shelf

When a new Livales product goes live, update all of these in one PR:

1. `src/contexts/LanguageContext.tsx`: a URL constant (like `KADO_URL`), `product.<key>.*` (name, short, cta, status) and `products.<key>.*` (body, features, facts) in **both** `id` and `en`. Update `lineup.*`, `products.body`, and the FAQ answers (`faq.a2`, `faq.a4`) too.
2. `src/content/products.ts`: add it to the list (live products before the one in testing). Navbar, footer, home lineup and `/produk` read from here; add its feature keys in `pages/Products.tsx`.
3. `src/components/brand/ProductMark.tsx`: its dot (put image files in `public/products/`), and its place in `HeroLineup` (`Embrace.tsx`).
4. `index.html`: add it to the JSON-LD and its `@id` to the Organization's `owns`. `src/lib/seo.ts`: update the home and products descriptions.
5. `scripts/prerender.mjs`: bump `PAGES_UPDATED`.
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

Tokens live in `src/index.css` (`:root` HSL variables for shadcn) and `tailwind.config.ts` (`ink`, `livales.*`). Never put white text on green or rose, because the contrast is too low. Use ink.

### Visual system

- **Colour comes in flat fields**: whole sections in the *soft* tints (`green-soft`, `rose-soft`), never as gradients, glows, blurred blobs, or shadows. Full-strength green and rose as section backgrounds were rejected as too high-contrast, so keep saturated colour for the logo, illustrations, and small accents. Hairlines are `border-ink/10`–`/15`.
- **Shapes come from the logo:** pills (fully rounded rectangles) and dots. Illustrations are the logo's gesture, an L embracing dots (`Embrace.tsx`). Buttons and inputs are pills.
- **Type:** Unbounded for headings (sentence case, tight tracking), Figtree for everything else. No uppercase labels above headings, no single highlighted word in a headline, no monospace captions, no "→" on buttons.
- **Motion:** only one orchestrated moment, where the hero dot settles into the L's embrace on load (`embrace-dot` / `embrace-arm` keyframes). No scroll-triggered animations. Interaction feedback (accordion open, button hover) is fine.
- **Structure means something:** no decorative numbering, stat rows, or bento grids. Lists are lists; the product shelf is literally a lineup that will grow.
- **Copy voice:** plain, warm Indonesian ("kami" talking to "kamu"), specific rather than salesy.

---

## How things work

### Copy and language

`t("section.key")` reads from `translations[language]` in `LanguageContext.tsx`. Missing keys render the key itself, so add both `id` and `en` values for every new string. The selected language is stored in `localStorage` (`livales.lang`) and sets `<html lang>`.

### Prerendering and SEO

- `npm run build` runs `vite build`, then an SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`, which renders every path in `prerenderPaths` (`src/lib/seo.ts`) to its own file: `index.html`, `produk.html`, `tentang.html`, `blog.html`, `blog/<slug>.html`, plus `404.html` (noindex) and `sitemap.xml`. Netlify serves `/produk` from `produk.html` without a trailing-slash redirect, so URLs match their canonicals, and unknown paths get `404.html` with a real 404 status (there is no SPA fallback). `main.tsx` hydrates whichever page loaded.
- **Per-page meta:** the prerender rewrites `<title>`, description, canonical, `og:*` and `twitter:*` in the `index.html` template from `getPageMeta()` (Indonesian), and appends `BlogPosting` + `BreadcrumbList` JSON-LD on articles. In the browser, `usePageMeta` keeps them in step with navigation and the language toggle. Keep those tags on one line in `index.html`; the prerender fails loudly if it can't find one.
- **Keep the first render deterministic.** Anything that differs between the build-time render and the browser's first render causes a hydration mismatch, for example reading `localStorage`, `window`, dates, or random values during render. Read those in `useEffect` instead. Example: `LanguageProvider` always starts in `id` and restores a saved `en` choice after mount.
- Site-wide JSON-LD lives in `index.html`: `Organization` (which `owns` each product), a `WebApplication` per web app, a `MobileApplication` for Hearts & Ladders, and `WebSite`. The sitemap uses each post's `date` and `PAGES_UPDATED` (in `prerender.mjs`) for other pages; bump it when their content changes meaningfully. `public/robots.txt` points to the sitemap.
- **FAQ answers are force-mounted** (`forceMount` + `data-[state=closed]:hidden`) so they're in the prerendered HTML; Radix would otherwise leave closed answers out and Google would only see the questions. Open and close are both instant on purpose: animating only the open made the footer jump when switching questions.
- **Put whitespace between adjacent inline elements** (`{" "}` in JSX) when they hold separate phrases, such as two buttons side by side or a name + description in a card. Without it, extracted text glues words together. Google once showed "Lihat produk kamiIkuti kabar".
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
- SEO backlog: add separate `/en` URLs + `hreflang` if English should be indexed (only Indonesian is prerendered now); keep publishing blog posts for non-brand keywords; submit the regenerated sitemap in Search Console after the multipage launch.
- **Open Graph image** (`public/og-image.png`) still uses the earlier style (blurred green/rose glow behind the logo), which the current visual system rules out. Redraw it flat: white or a soft tint, the full logo, and maybe the tagline.
- **Google Search favicon:** Google's favicon service already has the new mark, but search results showed the default globe right after launch. They update on Google's schedule; Search Console → URL Inspection → Request indexing can speed it up.
- Social: only LinkedIn (`linkedin.com/company/livales`) exists so far. Add others to `Footer.tsx` when they're created.
- Optional: Firebase App Check if the sign-up form gets spammed.
- Housekeeping: `package.json` still has the scaffold name `vite_react_shadcn_ts`. `gsap` is no longer used, `@tanstack/react-query` only wraps the app with a provider (no queries), and packages like `recharts` or `embla-carousel-react` are only pulled in by unused shadcn/ui components.

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
- **Google Search Console:** a *Domain* property verified by the `TXT` record above. **Don't delete that record**, or verification is lost. The sitemap is submitted as the full URL `https://livales.com/sitemap.xml`, because Domain properties require the full URL.
