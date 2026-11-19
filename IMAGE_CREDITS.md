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

Hero photos supplied for four services (FixIt Now, Health & Wellness, Artisan & Carpenter, Buy Any Car), plus listing photos for all six Health & Wellness items and all six Buy Any Car items (every other service's cards still show branded placeholders - see `IMAGE_TODO.md`).

> **⚠ Licence check needed before launch.** Nearly all of these files look like **watermarked preview images from stock-photo sites**
> (the carpenter and Buy Any Car heroes clearly show tiled "Vecteezy" watermarks; the plumber photo has a faint watermark too).
> The six Health & Wellness listing photos are previews as well: `home-nursing` and `gp-telehealth` carry visible **Getty Images**
> watermarks, `massage-therapy` shows a **Shutterstock** caption strip, and `physiotherapy` has faint repeating marks.
> The six Buy Any Car listing photos have no watermark, but they look like web-search images (press, dealer and car-review photos)
> of unknown origin, so their licence is unconfirmed too.
> Preview images are not licensed for commercial use. Buy/download the licensed originals (or use the client's own photos) and
> replace them: put the new file in `_assets/photos/<slug>/` named `hero.jpg` (or the item id, e.g. `home-nursing.jpg`),
> then run `npm run photos`. Only the file changes - the per-photo framing lives in `imageFocus` in `src/data/services.ts`.
>
> Sizes: the nurses hero is only 220 x 148 px, the Buy Any Car hero 678 x 452 px, the six Health & Wellness listing photos
> 400-611 px and the six car photos 494-700 px wide, so they look soft on high-density (retina) screens. Listing cards need
> roughly 700 px or more of width to stay sharp; heroes (shown up to ~560 px wide) are best at around 1100 px.

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence |
|---|---|---|---|---|
| `fixit-now/hero.webp` | `RNB_plumber.webp` | FixIt Now: Book a Repair Pro | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/hero.webp` | `RNB_Health_wellness.jpg` | Health & Wellness | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `artisan-carpenter/hero.webp` | `RNB_carpenter.jpg` | Artisan & Carpenter | Vecteezy preview (watermarked, supplied by client) | **Not confirmed - replace with licensed copy** |
| `buy-any-car/hero.webp` | `7.jpg` | Buy Any Car | Vecteezy preview (tiled watermarks across the whole photo; supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/gp-telehealth.webp` | `6.jpg` | Health & Wellness: GP / telehealth consultation | Getty Images preview (watermarked; credit shown: Sean Anthony Eddy; ID 2223908435; supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/physiotherapy.webp` | `5.jpg` | Health & Wellness: Physiotherapy | Unknown stock preview (faint repeating marks; supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/massage-therapy.webp` | `4.jpg` | Health & Wellness: Massage therapy | Shutterstock preview (caption strip shows ID 2222349701; supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/nutrition-coaching.webp` | `3.jpg` | Health & Wellness: Nutrition coaching | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/mental-wellness-counselling.webp` | `1.jpg` | Health & Wellness: Mental-wellness counselling | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/home-nursing.webp` | `2.jpg` | Health & Wellness: Home nursing care | Getty Images preview (watermarked; credit shown: ljubaphoto; ID 1412633159; supplied by client) | **Not confirmed - replace with licensed copy** |
| `buy-any-car/toyota-corolla-2016.webp` | `10.jpg` | Buy Any Car: Toyota Corolla | Unknown source (supplied by client); no watermark; looks like a used-car listing photo | **Not confirmed - replace with licensed copy** |
| `buy-any-car/honda-civic-2018.webp` | `13.jpg` | Buy Any Car: Honda Civic | Unknown source (supplied by client); no watermark; car-review-style photo (Polish number plate visible) | **Not confirmed - replace with licensed copy** |
| `buy-any-car/hyundai-elantra-2017.webp` | `9.jpg` | Buy Any Car: Hyundai Elantra | Unknown source (supplied by client); no watermark; looks like a dealer / social-media listing photo | **Not confirmed - replace with licensed copy** |
| `buy-any-car/toyota-rav4-2017.webp` | `12.jpg` | Buy Any Car: Toyota RAV4 | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `buy-any-car/nissan-rogue-2016.webp` | `11.jpg` | Buy Any Car: Nissan Rogue | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `buy-any-car/ford-ranger-2015.webp` | `8.jpg` | Buy Any Car: Ford Ranger | Unknown source (supplied by client); no watermark; press-style photo of a Ranger Raptor (UK number plate visible) | **Not confirmed - replace with licensed copy** |

The original hero files are kept, under the names they were supplied with, in `_assets/photos/_originals/`.
The six Health & Wellness listing photos were supplied as `1.jpg` - `6.jpg`; the unmodified files now sit in
`_assets/photos/health-wellness/` under their item ids (the "Supplied as" column says which was which).
The Buy Any Car hero was supplied as `7.jpg`; the unmodified file is `_assets/photos/buy-any-car/hero.jpg`.
The six Buy Any Car listing photos were supplied as `8.jpg` - `13.jpg`; the unmodified files sit in
`_assets/photos/buy-any-car/` under their listing ids (see the "Supplied as" column).

When you add more photos, record each one in the table above (one row per file in `public/images/`), e.g.:

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence (e.g. Unsplash License, Pexels License, CC0, client-owned) |
|---|---|---|---|---|
| _example:_ `good-to-eat/hero.webp` | `jollof.jpg` | Good to Eat | _Name - https://..._ | _Unsplash License_ |

Notes
- Unsplash / Pexels / Pixabay licences allow free commercial use without attribution, but keep this record anyway.
- Do not present stock photos as real customers, staff, vehicles or offices.
- For real client photos (team, vehicles, offices) record "Client-owned" and get written permission from anyone who is recognisable.
