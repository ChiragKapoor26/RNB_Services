# R&B Services Online

Marketing + enquiry website for **R&B Services** - an all-in-one local services marketplace for **Ghana and Canada**
(rnbservices.online). Premium, Apple-style 3D + scroll-animated front end built with **React 18 + TypeScript + Vite +
Tailwind CSS**, plus a small **Node/Express** server that keeps secrets safe (enquiry email + the DeepSeek "RNB Bot").

There is **no login, no accounts, no payments, no database**. Visitors browse, then enquire by email form or chat with RNB Bot.

---

## 1. Quick start

```bash
npm install
npm run dev        # starts BOTH the Vite site and the Express API
```

| What | URL |
|---|---|
| Website | http://localhost:5173 |
| API (proxied by Vite under `/api`) | http://localhost:5174/api/health |

Other scripts: `npm run lint`, `npm run typecheck`, `npm run build`, `npm start` (runs the built server),
`npm run photos`, `npm run image-todo`, `npm run bot:test`.

Requires **Node 20.12+** (built and tested on Node 22).

---

## 2. API keys - where they go (all left blank for now)

Two env files already exist (git-ignored) with **empty slots ready to fill**. Examples live next to them.

| File | Holds | Public? |
|---|---|---|
| [`.env`](.env) | `VITE_GOOGLE_MAPS_API_KEY` | Yes - it ships to the browser by design, so **restrict it** (see below) |
| [`server/.env`](server/.env) | `DEEPSEEK_API_KEY`, `SMTP_*`, `MAIL_FROM`, `CLIENT_EMAIL`, `ALLOWED_ORIGINS`, ... | **No - secrets. Never commit, never put in the frontend** |

DeepSeek and SMTP are called **only from the Express server**. Restart `npm run dev` after editing an env file.

**What happens while a key is empty** (nothing crashes):

| Missing | Behaviour |
|---|---|
| Google Maps key | An elegant static map card with an "Open in Google Maps" link |
| SMTP / `CLIENT_EMAIL` | Enquiry form validates, then shows a polite "email isn't available right now" message (HTTP 503) |
| `DEEPSEEK_API_KEY` | RNB Bot replies that it's unavailable and offers "Talk to a human" |

Handy while testing the UI before SMTP is set up: set `EMAIL_DRY_RUN=true` in `server/.env` - enquiries are logged
(without personal details) and reported as sent, but **nothing is emailed**. Switch it back to `false` for real use.

### Google Maps key
1. Google Cloud Console -> enable **Maps JavaScript API**.
2. Create an API key -> restrict **by HTTP referrer** (`https://rnbservices.online/*`, `http://localhost:5173/*`) and **by API** (Maps JavaScript API only).
3. Set a billing budget alert. Paste the key into `.env` -> `VITE_GOOGLE_MAPS_API_KEY=`.
4. Optional: create a Map ID in Cloud Console for custom map styling and replace `DEMO_MAP_ID` in `src/components/sections/MapView.tsx`.

### DeepSeek (RNB Bot)
1. Create a key at https://platform.deepseek.com and **set a monthly spend cap** on their dashboard.
2. Put it in `server/.env` -> `DEEPSEEK_API_KEY=`. Check the current model name/pricing in DeepSeek's docs (`DEEPSEEK_MODEL`, default `deepseek-chat`).
3. Test it: `npm run bot:test` runs 10 questions including prompt-injection attempts. **Read the answers** - the bot should answer from the company facts only, never invent prices, and politely refuse the injection attempts.

### Enquiry email (SMTP)
**Gmail (easiest)**
1. Use a Google account with **2-Step Verification** turned on.
2. Go to https://myaccount.google.com/apppasswords -> create an app password (name it "R&B website") -> copy the 16 characters.
3. In `server/.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=you@gmail.com
   SMTP_PASS=<the 16-character app password>
   MAIL_FROM=you@gmail.com
   CLIENT_EMAIL=<inbox that should receive enquiries>
   ```

**Resend (alternative, better for a custom domain)**: verify your domain at resend.com, then
`SMTP_HOST=smtp.resend.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER=resend`, `SMTP_PASS=<Resend API key>`,
`MAIL_FROM=hello@yourdomain`.

**Test the endpoint** (with `npm run dev` running):
```bash
curl -i -X POST http://localhost:5174/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Visitor","email":"you@example.com","phone":"+233 20 123 4567","country":"ghana","service":"fixit-now","message":"Testing the enquiry form from curl.","consent":true}'
# -> {"ok":true}, an email lands in CLIENT_EMAIL (Reply-To = the visitor) and the visitor gets an auto-confirmation.
```

---

## 3. How the site is organised

```
src/
  data/          ALL copy + content (typed .ts files). Components never hardcode copy.
                 company.ts, services.ts (11 services x 6 items), apps.ts, locations.ts, faq.ts,
                 home.ts, contact.ts, chat.ts, nav.ts, legal.ts, imageManifest.json
  components/
    layout/      Header (mega-menu, country toggle), Footer, Layout (routes + transitions), Seo
    sections/    Hero, HowItWorks (pinned), ServicesGrid, SpotlightCarousel (continuous right-to-left marquee, pausable),
                 PhoneShowcase (3D ring), Apps, Locations (+Map), Why (+counters), FAQ, CTA, EnquiryForm
    three/       HeroScene (react-three-fiber), Hero3D (progressive loader), HeroFallback (static art)
    cards/       TiltCard3D, ItemCard, ServiceCard
    chat/        ChatWidget + useChat (streaming reader)
    ui/          Button, Icon, SmartImage, SectionHeading, CountryToggle, Toast
  pages/         Home, ServicePage (/services/:slug), Contact, About, LegalPage, NotFound
  hooks/ lib/ context/
shared/          zod schemas + constants used by BOTH the browser and the server
server/src/      Express API: app.ts, routes/enquiry.ts, routes/chat.ts, mailer.ts, rnbBotPrompt.ts, config.ts
scripts/         process-logos.ts, sync-photos.ts, image-todo.ts
public/          brand logos, favicon, og-image, robots.txt, sitemap.xml, _redirects
```

**Editing text/prices/listings:** change the typed files in `src/data/`. The RNB Bot's knowledge is built from the same
files (`server/src/rnbBotPrompt.ts`), so the bot and the website never disagree.

**Sample listings:** every card is labelled "Sample listing" with indicative "from" prices (GH₵ for Ghana, CA$ for Canada).
No real people, phone numbers or reviews are invented. Keep the labels until real vendors are onboarded.

### Photos
Cards show clean branded placeholders until photos exist ([IMAGE_TODO.md](IMAGE_TODO.md) lists every missing file).
1. Put photos in `_assets/photos/<service-slug>/` - name one `hero.jpg`, or name files after an item id (e.g. `cement-50kg.jpg`). Unnamed files fill any gaps.
2. `npm run photos` -> converts to optimised WebP in `public/images/` and updates `src/data/imageManifest.json`.
3. `npm run image-todo` -> refreshes IMAGE_TODO.md. Record every image's source + licence in [IMAGE_CREDITS.md](IMAGE_CREDITS.md).

Prefer real photos of the client's team, vehicles and offices. Don't label stock photos as real customers or staff.

### Logos
`_assets/logos/` holds the originals. `npx tsx scripts/process-logos.ts` regenerates `public/brand/*`, the favicon, touch icon and OG image.

---

## 4. Deployment

The React app uses client-side routing, so every host needs the **SPA fallback** (deep links like `/services/events`
must serve `index.html`). Configs are included: `public/_redirects` (Netlify), `netlify.toml`, `vercel.json`.

### Option A - one Node host (simplest)
Render / Railway / a VPS runs a single process that serves the site **and** the API (gzip-compressed, SPA fallback, strict CSP built in):
```bash
npm ci && npm run build
SERVE_STATIC=true NODE_ENV=production npm start      # PORT defaults to 5174
```
Set in the host's environment (or `server/.env`): `SERVE_STATIC=true`, `ALLOWED_ORIGINS=https://rnbservices.online`,
plus the DeepSeek/SMTP values. Point the domain `rnbservices.online` at it.

### Option B - static host for the site + Node host for the API
1. Deploy `dist/` (build command `npm run build`, publish dir `dist`) to Netlify/Vercel.
2. Deploy the API to Render/Railway: start command `npm start`, `SERVE_STATIC=false`, and
   `ALLOWED_ORIGINS=https://rnbservices.online`.
3. The browser calls **relative** `/api/...`, so make the static host forward `/api/*` to the API host:
   - Netlify (`netlify.toml`, before the SPA rule):
     `[[redirects]] from="/api/*" to="https://YOUR-API-HOST/api/:splat" status=200 force=true`
   - Vercel (`vercel.json`): `{ "source": "/api/:path*", "destination": "https://YOUR-API-HOST/api/:path*" }` as the first rewrite.
4. Behind a proxy the API must see the real client IP for rate limiting (`TRUST_PROXY=1`, the default).

Static-only hosts can't run Express. If you'd rather avoid a server, the two endpoints
(`server/src/routes/*.ts`) can be converted to serverless functions.

---

## 5. SEO, performance and accessibility

- **SEO:** per-route titles/descriptions/OpenGraph/Twitter via react-helmet-async, JSON-LD (Organization, WebSite, a LocalBusiness per country, Service + Breadcrumb on service pages), `sitemap.xml`, `robots.txt`, OG image.
  *A client-rendered React site is slightly weaker for search than a server-rendered one.* If SEO becomes a priority, **pre-render** the routes at build time (e.g. `vite-plugin-prerender`, or a small `react-dom/server` script over the route list in `public/sitemap.xml`). Pre-rendering also makes first paint near-instant.
- **Performance:** routes and the 3D scene are lazy-loaded; GSAP/Lenis load after first paint; framer-motion features are lazy; the 3D hero loads progressively (static art first, crossfade once ready) and is skipped on reduced-motion, data-saver, low-memory and no-WebGL devices; the canvas pauses off-screen; DPR capped at 1.5; critical fonts preloaded; images are lazy with width/height set.
- **Accessibility:** semantic landmarks, skip link, keyboard navigation, visible focus, AA contrast, `prefers-reduced-motion` honoured everywhere (no smooth-scroll, pins, tilt or 3D; static alternatives instead). axe-core reports 0 violations on the main pages.
- **Security:** helmet, CORS limited to `ALLOWED_ORIGINS`, cross-origin POST guard, 20 kB JSON limit, per-IP rate limits (enquiry 5 / 15 min, chat 20 / min and 150 / hour), zod validation on client **and** server, honeypot, HTML-escaped emails, no secrets or visitor details in logs.

---

## 6. What the client still needs to supply

- [ ] Real **addresses, phone numbers, opening hours** for the Ghana and Canada offices -> `src/data/locations.ts` (then set `isPlaceholder: false`)
- [ ] Public **email, WhatsApp number, social links** -> `src/data/company.ts`
- [ ] **App Store / Google Play links** for the User, Seller and Driver apps -> `src/data/apps.ts`
- [ ] **Real photos** (see IMAGE_TODO.md) and their credits
- [ ] **Legal review** of `/privacy` and `/terms` (placeholders, flagged in the UI and in `src/data/legal.ts`) - Ghana's Data Protection Act and Canada's PIPEDA apply to collected enquiries
- [ ] API keys (section 2) and the `ALLOWED_ORIGINS` / domain settings for production
