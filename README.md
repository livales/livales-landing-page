# Livales — company website

The public landing page for **Livales**, an Indonesian technology company that designs and builds its own software that **brings people closer**: to the people they love, and to new languages and cultures.

This README is also the main context file for AI coding assistants working on the repo. Read the **Rules** section before changing copy, visuals, or the logo.

---

## Rules (read first)

1. **The page is about the company, not one product.** Positioning: "software yang mendekatkan", meaning closer to people you love, and closer to new languages and cultures. Products are shown as a growing shelf:
   - **Kana Speed** (live, public): a free web app for learning Japanese through quizzes, at [kana.livales.com](https://kana.livales.com/id/). It can be named, described, and linked.
   - **Kado Livales** (live, public, Indonesian only): gift recommendations from Indonesian marketplaces, plus wishlists and group gifts ("patungan"), at [kado.livales.com](https://kado.livales.com/). It can be named, described, and linked.
   - **An app for couples** (in development): only its category may be mentioned ("aplikasi untuk pasangan", "sedang dibuat").
2. **The couples app is confidential.** Never write its name or describe its concept or how it works: not in copy, meta tags, alt text, comments, commit messages, or this README. This repo is public. Don't use words like "game"/"dimainkan", and avoid board or grid visuals that could hint at it.
3. **Light, never dark, and no generic "AI template" styling.** The brand is about people and the things they care about (couples, friends, family, learners), so it should feel friendly. A dark design was rejected as creepy ("menyeramkan"). A later design full of stock patterns (eyebrow labels, gradient headline words, glows, identical shadowed cards, 01/02 numbering, stat rows, fade-up animations) was rejected as "AI slop". Follow the visual system in [Brand → Visual system](#visual-system).
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
index.html                  Meta/OG/canonical tags, JSON-LD, favicons, fonts
netlify.toml                Build command, livales.netlify.app → livales.com redirect, SPA fallback
scripts/prerender.mjs       Build step: injects the server-rendered home page into dist/index.html
firebase.json / .firebaserc Firebase project "livales"; emulator on port 8085
firestore.rules             Security rules (only landing_subscribers is writable)
tests/                      Firestore rules tests (@firebase/rules-unit-testing)
public/
  brand/                    Official Livales logo files (SVG + PNG) and app icons
  products/                 Product marks shown on the shelf (kado-livales.svg is temporary)
  favicon.* (svg, ico, 16–192 px png) / apple-touch-icon.png / site.webmanifest / og-image.png
  sitemap.xml / robots.txt
src/
  main.tsx                  Hydrates the prerendered "/" (createRoot for other paths)
  entry-server.tsx          Build-time render of a route to HTML (used by prerender)
  App.tsx                   AppProviders + AppRoutes (shared by browser and prerender)
  pages/Index.tsx           The landing page: composes all sections
  pages/NotFound.tsx        404 page
  components/landing/       One file per section + shared pieces (see below)
  components/brand/Logo.tsx <Logo />, <Logo markOnly />, <Logo inverted />
  components/brand/Embrace.tsx  <HeroMark /> (animated mark) and <Embrace group=… /> illustrations
  components/LanguageSelector.tsx  ID/EN toggle
  contexts/LanguageContext.tsx     All copy (id/en) + t() helper; choice saved in localStorage
  lib/subscribe.ts          Writes a sign-up to Firestore (SDK lazy-loaded)
  index.css                 Design tokens + global/component styles
  components/ui/            shadcn/ui primitives (mostly unused; keep for future pages)
```

### Page sections (in order)

| Section | File | Anchor | Notes |
|---|---|---|---|
| Navbar | `Navbar.tsx` | – | Nav links, language toggle, CTA to `#updates` |
| Hero | `Hero.tsx` + `HeroMark` | `#top` | Headline, short company description, the animated mark |
| About | `About.tsx` | `#about` | "Kenapa Livales ada": a short note signed by the team |
| Who it's for | `Audience.tsx` + `Embrace` | `#audience` | **Soft rose field.** The logo's L embracing learners (lesson pills), couples, friends & family, anyone (dots) |
| How we work | `Approach.tsx` | `#approach` | 4 principles as a definition list |
| Products | `Product.tsx` | `#product` | **Soft green field.** A "shelf": live products (Kana Speed → `KANA_URL[language]`, Kado Livales → `KADO_URL`; add new ones to the `live` array), the app for couples (category only), and an empty slot |
| FAQ | `Faq.tsx` | `#faq` | Radix accordion; answers stay in the HTML (see [Prerendering and SEO](#prerendering-and-seo)) |
| Updates | `FinalCta.tsx` + `WaitlistForm.tsx` | `#updates` | **Soft rose field.** Email sign-up form |
| Footer | `Footer.tsx` | – | Section links, product links, LinkedIn |

Section headings use the `.heading-lg` / `.heading-md` classes from `index.css`, and content sits in `.page` (the max-width container).

### Adding a product to the shelf

When a new Livales product goes live, update all of these in one PR:

1. `src/contexts/LanguageContext.tsx`: a URL constant (like `KADO_URL`), and `product.<key>.name` / `.desc` / `.cta` in **both** `id` and `en`. Update `product.title`, `product.body`, and the products FAQ answer (`faq.a2`) too.
2. `src/components/landing/Product.tsx`: add an entry to the `live` array with its `mark` (put image files in `public/products/`).
3. `src/components/landing/Footer.tsx`: add the link under Products.
4. `index.html`: add a `WebApplication` to the JSON-LD and its `@id` to the Organization's `owns`. Update the meta description if the product changes how Livales is described.
5. `public/sitemap.xml`: bump `<lastmod>`.
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

- `npm run build` runs `vite build`, then an SSR build of `src/entry-server.tsx`, then `scripts/prerender.mjs`, which writes the rendered home page into `dist/index.html`. Crawlers and link previews get real HTML, and `main.tsx` hydrates it.
- **Keep the first render deterministic.** Anything that differs between the build-time render and the browser's first render causes a hydration mismatch, for example reading `localStorage`, `window`, dates, or random values during render. Read those in `useEffect` instead. Example: `LanguageProvider` always starts in `id` and restores a saved `en` choice after mount.
- SEO tags live in `index.html`: canonical `https://livales.com/`, Open Graph/Twitter tags, and JSON-LD: `Organization` (which `owns` each product), one `WebApplication` per live product, and `WebSite`. `public/sitemap.xml` lists the URL; update its `<lastmod>` when content changes meaningfully. `public/robots.txt` points to the sitemap.
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
- SEO backlog: add a separate `/en` URL + `hreflang` if English should be indexed; add content pages or a blog for non-brand keywords; bump `<lastmod>` in `public/sitemap.xml` after meaningful content changes.
- **Open Graph image** (`public/og-image.png`) still uses the earlier style (blurred green/rose glow behind the logo), which the current visual system rules out. Redraw it flat: white or a soft tint, the full logo, and maybe the tagline.
- **Kado Livales icon** (`public/products/kado-livales.svg`) is a temporary mark from the Kado team. Replace the file when the final one is ready; no code change needed.
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
