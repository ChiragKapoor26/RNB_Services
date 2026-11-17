# IMAGE CREDITS

Every image used on the site must be listed here with its source and licence.

## Brand logos (client-supplied)

| File | Description | Source / licence |
|---|---|---|
| `public/brand/rnb-main.*` | R&B Services Online - blue shopping cart "e" logo | Supplied by the client - all rights reserved by R&B Services |
| `public/brand/rnb-user.*` | R&B User App logo | Supplied by the client |
| `public/brand/rnb-seller.*` | R&B Seller App logo | Supplied by the client |
| `public/brand/rnb-driver.*` | R&B Taxi Driver App logo | Supplied by the client |
| `public/favicon.png`, `apple-touch-icon.png`, `og-image.png` | Derived from the main logo | Supplied by the client |

## Photos

Hero photos supplied for three services (the other services and all item cards still show branded placeholders - see `IMAGE_TODO.md`).

> **⚠ Licence check needed before launch.** These three files look like **watermarked preview images from stock-photo sites**
> (the carpenter photo clearly shows "Vecteezy" watermarks; the plumber photo has a faint watermark too). Preview images
> are not licensed for commercial use. Buy/download the licensed originals (or use the client's own photos) and
> replace them: put the new file in `_assets/photos/<slug>/` named `hero.jpg`, then run `npm run photos`.
> The nurses photo is also only 220 x 148 px, so it looks soft when enlarged - a larger version is needed.

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence |
|---|---|---|---|---|
| `fixit-now/hero.webp` | `RNB_plumber.webp` | FixIt Now: Book a Repair Pro | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/hero.webp` | `RNB_Health_wellness.jpg` | Health & Wellness | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `artisan-carpenter/hero.webp` | `RNB_carpenter.jpg` | Artisan & Carpenter | Vecteezy preview (watermarked, supplied by client) | **Not confirmed - replace with licensed copy** |

The original files are kept, under the names they were supplied with, in `_assets/photos/_originals/`.

When you add more photos, record each one in the table above (one row per file in `public/images/`), e.g.:

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence (e.g. Unsplash License, Pexels License, CC0, client-owned) |
|---|---|---|---|---|
| _example:_ `good-to-eat/hero.webp` | `jollof.jpg` | Good to Eat | _Name - https://..._ | _Unsplash License_ |

Notes
- Unsplash / Pexels / Pixabay licences allow free commercial use without attribution, but keep this record anyway.
- Do not present stock photos as real customers, staff, vehicles or offices.
- For real client photos (team, vehicles, offices) record "Client-owned" and get written permission from anyone who is recognisable.
