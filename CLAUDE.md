# R&B Services Online

## What this is
Marketing + enquiry website for R&B Services, a local "all-in-one" services
marketplace in **Ghana and Canada**.
R&B connects users with local providers (supplies, professionals, repairs,
food, cars, rentals, rides...) and
charges a **small, transparent connection fee**. We are a
connector/marketplace, not the provider itself.
There is NO login, NO accounts, NO payments. Visitors browse, then send an
enquiry by email or chat with RNB Bot.

## Stack
Frontend: React 18 + TypeScript + Vite, React Router, Tailwind CSS, three.js
(@react-three/fiber, drei),
GSAP + ScrollTrigger, Lenis, Framer Motion, react-helmet-async, zod.
Backend: small Node + Express server in /server (TypeScript) for email
(nodemailer) and the DeepSeek chatbot.
NOT Next.js. Do not introduce Next.js.

## Project layout
- /            React app (Vite): src/, public/
- /server      Express API (POST /api/enquiry, POST /api/chat, GET
/api/health)
- Vite dev server proxies /api to the Express server (default port 5174 for
the API).
- One `npm run dev` at the root runs both (use concurrently).

## Brand
- Logos in /public/brand: rnb-main (blue shopping cart, "e"), rnb-driver
(orange taxi), rnb-seller (green basket), rnb-user (green "RU" badge).
- Palette (tune after sampling the logos): royal blue #2F5BEA, taxi orange
#DF6D2E, amber #EFB231, forest green #3E7A45, ink #0B0F1A, off-white #F7F7F5.
- Typography: elegant serif display (e.g. Playfair Display, echoing the logo)
+ clean sans for UI (Inter or Plus Jakarta Sans).
- Feel: premium, calm, Apple-like: big type, generous whitespace, smooth
scroll-driven motion.

## Rules
- Content/data lives in /src/data/*.ts. Components never hardcode copy.
- Secrets only in server/.env (DEEPSEEK_API_KEY, SMTP_*, CLIENT_EMAIL).
Frontend .env may only hold VITE_GOOGLE_MAPS_API_KEY
  (public, referrer-restricted). Never commit .env files. Keep .env.example
files updated.
- DeepSeek and SMTP are called ONLY from the Express server. Never from the
browser.
- Lazy-load routes and the 3D scenes (React.lazy / dynamic import) to keep
the first load light.
- Respect prefers-reduced-motion. Provide non-3D fallbacks. Keep Lighthouse
performance >= 85 on mobile.
- Accessibility: semantic HTML, alt text, keyboard nav, AA contrast.
- Currency display: GH₵ for Ghana content, CA$ for Canada content (toggle by
country).
- Listings (cars, properties, products, providers) are SAMPLE/illustrative;
label them "Sample listing" and never invent real people's names, phone
numbers or reviews.
- Health & wellness content must include a short "not medical advice" note.
- Run `npm run lint` and `npm run build` before declaring any phase done.

## Implementation notes (added while building)
- Shared zod schemas live in /shared and are imported by both client (`@shared/*`) and server.
- Shared brand/company facts live in /src/data/company.ts; the server's bot prompt imports them, so keep that file free of Vite-only imports (no asset imports, no `import.meta.env`).
- Photos: drop files in /_assets/photos/<slug>/ then run `npm run photos` (converts to WebP, writes src/data/imageManifest.json). `npm run image-todo` regenerates IMAGE_TODO.md.
- Logos: `npx tsx scripts/process-logos.ts` regenerates /public/brand from /_assets/logos.
- Stack versions: React 18 -> @react-three/fiber 8 + drei 9 (v9/v10 of those need React 19). Tailwind v4 (CSS-first config in src/styles/index.css).
- Env files: `.env` (VITE_GOOGLE_MAPS_API_KEY) and `server/.env` (DeepSeek, SMTP, CLIENT_EMAIL, ALLOWED_ORIGINS...) exist with EMPTY values on purpose; the app degrades gracefully without them. `EMAIL_DRY_RUN=true` logs enquiries instead of emailing.
- GSAP gotchas: `gsap.matchMedia` only runs its callback when AT LEAST ONE condition matches, so `useScrollAnimation` includes an always-true `always` query. GSAP/ScrollTrigger/Lenis are loaded lazily (`src/lib/loadGsap.ts`) - never import `@/lib/gsap` statically from layout/entry code.
- Framer Motion: use the lightweight `m` component (not `motion`); features load lazily via `<LazyMotion strict>` in App.tsx.
- Tailwind gotcha: a component that sets its own `display` (e.g. Button `inline-flex`) is NOT hidden by a `hidden` class passed in - wrap it in a `<div className="hidden md:block">` instead.
- Home page: Hero + Statement render eagerly; everything below is `HomeBelowFold` (code-split, mounted after first paint or immediately when the URL has a #hash).
- Hero layout rule: the `wide` Tailwind variant (aspect-ratio >= 5:4) is also what `HeroScene` uses to choose side-by-side vs stacked 3D layout - keep them in sync.
- Server: SSE chat route must stay OUTSIDE the `compression()` middleware (compression is mounted only for static files).
- Never skip the legal placeholders review: /privacy and /terms are drafts flagged for client/counsel.
