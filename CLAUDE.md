# CLAUDE.md

Livales company website: React 18 + Vite + TypeScript + Tailwind, live at https://livales.com (Netlify, DNS on Cloudflare; keep DNS records grey-cloud). Full context is in `README.md`. Read only the section you need.

## Hard rules
- **Company-first.** Livales is presented as a company that builds relationship software (couples, friends, family). The first app appears only as "Aplikasi 01, in development".
- **The first product is confidential and this repo is public.** Never write its name or describe it anywhere: copy, meta, alt text, comments, commits, PRs. Don't use "game"/"dimainkan", and avoid board or grid visuals.
- **Light, flat, logo-derived; never dark, never "AI template".** White page, ink text, whole sections in flat green `#2ECC40` / rose `#F07C8F` / blush fields; shapes are the logo's pills and dots. No gradients, glows, shadows, eyebrow labels, highlighted headline words, 01/02 numbering, stat rows, or scroll animations. Headings Unbounded, body Figtree. See README → Brand → Visual system.
- **Logo** = "L Memeluk". Use `<Logo />` or the files in `public/brand/`. Never redraw it, and never bring back the old striped-arc logo or arc motifs.
- **All copy is bilingual.** Add both `id` and `en` keys in `src/contexts/LanguageContext.tsx` and use `t()`. Never hard-code strings.
- **Firebase = project `livales` only** (collection `landing_subscribers`). After editing `firestore.rules`, run `npm run test:rules` before `npm run deploy:rules`.

## Commands
`npm run dev` · `npm run build` (includes prerender of "/") · `npm run lint` · `npm run test:rules` (emulator on port 8085)

## Where things are
- Page sections: `src/components/landing/*`, composed in `src/pages/Index.tsx`
- Tokens: `src/index.css` + `tailwind.config.ts`; layout helpers `.page`, `.heading-lg`, `.heading-md`, `.btn-ink`
- Illustrations: `src/components/brand/Embrace.tsx` (the L embracing dots)
- The home page is prerendered and hydrated, so never read `localStorage`/`window` during render; use `useEffect` (see README → Prerendering and SEO)
- SEO tags + JSON-LD live in `index.html`; the canonical domain is `https://livales.com/`
- `src/components/ui/` is shadcn scaffold. Mostly unused, so don't restyle it.

## README sections
Rules · Project structure (section map + anchors) · Brand (logo geometry, colors) · How things work (i18n, prerender, Firebase) · Status and TODO (domain, SEO)

Private notes that must not be committed go in `CLAUDE.local.md` (gitignored).
