# Livales — company website

The public landing page for **Livales**, an Indonesian technology company that designs and builds its own software to strengthen relationships between couples, best friends (*besti*), family, and others.

This README is also the main context file for AI coding assistants working on the repo. Read the **Rules** section before changing copy, visuals, or the logo.

---

## Rules (read first)

1. **The page is about the company, not a product.** Livales is presented as a company with a growing product line. The first app is in development and gets only a short, generic mention ("Aplikasi 01", "Dalam pengembangan").
2. **The first product is confidential.** Never name it or describe what it is or how it works, in copy, meta tags, alt text, comments, commit messages, or this README. This repo is public. Don't use words like "game"/"dimainkan", and avoid board or grid visuals that could hint at it.
3. **Light and warm, never dark.** The brand is for couples and friends, so it should feel friendly and romantic. Use an ivory background, white cards, the brand green, and soft rose accents. A dark design was tried and rejected as feeling "menyeramkan" (creepy).
4. **Use the official logo files only** (see [Brand](#brand)). Don't redraw, recolor, rotate, stretch, or add effects to the mark. The old striped-arc logo was a stock design shared with another company, so never bring it or arc-stripe motifs back.
5. **Bilingual copy.** Every user-facing string lives in `src/contexts/LanguageContext.tsx` with both `id` (default) and `en` values. Don't hard-code text in components.

---

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript, built with Vite 5 |
| Styling | Tailwind CSS 3 with CSS-variable tokens in `src/index.css`; shadcn/ui primitives in `src/components/ui` |
| Fonts | Urbanist (display/headings, `font-display`) + Inter (body, `font-sans`) from Google Fonts |
| Icons | lucide-react |
| Backend | Firebase project **`livales`**: Firestore only, used for email sign-ups |
| Hosting | Netlify (`netlify.toml`: publishes `dist/`, SPA fallback to `index.html`) |

## Getting started

```sh
npm install
npm run dev          # Vite dev server
npm run build        # production build → dist/
npm run lint
npm run test:rules   # Firestore rules tests in the emulator (needs Java)
npm run deploy:rules # deploy firestore.rules to the livales project (needs `firebase login`)
```

`npm` with `package-lock.json` is the source of truth. `bun.lockb` is a leftover from the original Lovable scaffold and is not kept in sync.

---

## Project structure

```
index.html                  Meta/OG tags, favicons, fonts, inline reveal failsafe script
firebase.json / .firebaserc Firebase project "livales"; emulator on port 8085
firestore.rules             Security rules (only landing_subscribers is writable)
tests/                      Firestore rules tests (@firebase/rules-unit-testing)
public/
  brand/                    Official logo files (SVG + PNG) and app icons
  favicon.* / apple-touch-icon.png / site.webmanifest / og-image.png
src/
  pages/Index.tsx           The landing page: composes all sections, calls useReveal()
  pages/NotFound.tsx        404 page
  components/landing/       One file per section + shared pieces (see below)
  components/brand/Logo.tsx <Logo />, <Logo markOnly />, <Logo inverted />
  components/LanguageSelector.tsx  ID/EN toggle
  contexts/LanguageContext.tsx     All copy (id/en) + t() helper; choice saved in localStorage
  hooks/use-reveal.ts       Scroll-reveal logic for .reveal elements
  lib/subscribe.ts          Writes a sign-up to Firestore (SDK lazy-loaded)
  index.css                 Design tokens + global/component styles
  components/ui/            shadcn/ui primitives (mostly unused; keep for future pages)
```

### Page sections (in order)

| Section | File | Anchor | Notes |
|---|---|---|---|
| Navbar | `Navbar.tsx` | – | Nav links, language toggle, CTA to `#updates` |
| Hero | `Hero.tsx` + `ConnectionVisual.tsx` | `#top` | Company headline; the logo mark connected to "Pasangan / Sahabat / Keluarga / Dan lainnya" |
| About | `About.tsx` | `#about` | Mission and 3 stats |
| Who it's for | `Audience.tsx` | `#audience` | 4 cards, each with its own pastel tint |
| Principles | `Approach.tsx` | `#approach` | 4 principles in a bento grid |
| Products | `Product.tsx` | `#product` | "Aplikasi 01, in development" + "more to come". Keep it generic. |
| FAQ | `Faq.tsx` | `#faq` | Radix accordion |
| Updates CTA | `FinalCta.tsx` + `WaitlistForm.tsx` | `#updates` | Email sign-up form |
| Footer | `Footer.tsx` | – | Links + LinkedIn |

`SectionHeading.tsx` renders the eyebrow + title used by most sections. `BrandShape.tsx` is a decorative outline of the logo mark used in backgrounds.

---

## Brand

**Logo: "L Memeluk"** (adopted Sept 2026). The **L** of Livales (green stem + rose base) embraces a green dot, the person you care about.

- Mark geometry (80 × 92 units): stem `30×92, r15` green; base `80×30, r15` rose, drawn *under* the stem; dot `ø30` centered at `(58, 32)`.
- Full-logo canvas is 375 × 94. It's 2 units taller than the mark because round letters overshoot the baseline.
- Wordmark: lowercase "livales" in Urbanist SemiBold, tracking −1.5%, outlined to paths in the SVGs.
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
| `livales-green` / `primary` | `#2ECC40` | Logo, primary buttons (with ink text) |
| `livales-green-deep` | `#168A2A` | Green **text** on light backgrounds (brand green fails contrast for text) |
| `livales-rose` | `#F07C8F` | Logo base, warm accents and glows |
| `ink` / `foreground` | `#122023` | Text, wordmark |
| `background` | `#FDFBF7` | Page background (warm ivory) |
| `livales-mint` / `livales-blush` | `#EFFAF0` / `#FFF1F2` | Soft section tints |

Tokens live in `src/index.css` (`:root` HSL variables for shadcn) and `tailwind.config.ts` (`ink`, `livales.*`). Use `border-ink/[0.06]`-style alphas for hairlines, not `white/*`.

Pastel tints per relationship (hero chips + audience cards): couples = rose, friends = amber, family = emerald, others = sky.

---

## How things work

### Copy and language

`t("section.key")` reads from `translations[language]` in `LanguageContext.tsx`. Missing keys render the key itself, so add both `id` and `en` values for every new string. The selected language is stored in `localStorage` (`livales.lang`) and sets `<html lang>`.

### Scroll reveal

Add `className="reveal"` (and optionally `style={{ "--reveal-delay": "80ms" }}`) to animate an element in.

- `useReveal()` (called once in `Index.tsx`) marks any `.reveal` element whose top is above 92% of the viewport as `.is-visible`. It re-checks on every scroll, resize, and hash change, so elements skipped by fast scrolling or anchor jumps are still revealed.
- Hidden state only applies under `html.reveal-ready`. An inline script in `index.html` sets that class and removes it after 3 s if the app never boots, so content can't stay invisible.
- The fade is a CSS **animation**, not a transition, so utilities like `transition-transform` on the same element don't cancel it.

### Email sign-ups (Firebase)

- `WaitlistForm` → `subscribe(email, lang, source)` in `src/lib/subscribe.ts` → Firestore collection **`landing_subscribers`** in Firebase project **`livales`** (region `asia-southeast2`, Jakarta). Fields: `email`, `lang`, `source`, `createdAt` (server timestamp).
- `firebase/app` and `firebase/firestore/lite` are dynamically imported on submit, so they're not in the main bundle.
- The web config in `subscribe.ts` is public by design. Security comes from `firestore.rules`: anonymous **create only**, with strict validation (exact field set, email format and max 254 chars, `lang ∈ {id,en}`, `source` ≤ 32 chars, `createdAt == request.time`). No reads, updates, or deletes from clients. View sign-ups in the Firebase Console.
- **This site must never use any other Firebase project.** Other Livales projects are separate on purpose.
- After changing rules, run `npm run test:rules`, then `npm run deploy:rules`. New rules can take 1–2 minutes to go live, so an early `permission-denied` right after deploying is expected.

---

## Status and TODO

- **Domain not purchased yet.** `index.html` still points `og:url` / `og:image` / `twitter:image` at the placeholder `https://livales.app`, so link previews won't show an image until the real domain is set. After buying the domain, update those URLs, and add a canonical tag and `sitemap.xml`.
- SEO backlog: Organization JSON-LD (name, logo, LinkedIn); prerender the page to static HTML; separate `/en` URL + `hreflang` if English should be indexed; Google Search Console.
- Social: only LinkedIn (`linkedin.com/company/livales`) exists so far. Add others to `Footer.tsx` when they're created.
- Optional: Firebase App Check if the sign-up form gets spammed.
- Housekeeping: `package.json` still has the scaffold name `vite_react_shadcn_ts`. `gsap` is no longer used, `@tanstack/react-query` only wraps the app with a provider (no queries), and packages like `recharts` or `embla-carousel-react` are only pulled in by unused shadcn/ui components.

## Deployment

The site deploys through Netlify: `npm run build`, publishing `dist/` (see `netlify.toml`), with `main` as the production branch. Firestore rules are **not** deployed by Netlify; run `npm run deploy:rules` separately.
