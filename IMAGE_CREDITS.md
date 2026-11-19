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

Hero photos supplied for six services (FixIt Now, Health & Wellness, Artisan & Carpenter, Buy Any Car, Rent & Lease, Event Decor & Event Planning), plus listing photos for all six Health & Wellness items, all six Buy Any Car items, all six Rent & Lease items and all six Events items (every other service's cards still show branded placeholders - see `IMAGE_TODO.md`).

> **⚠ Licence check needed before launch.** Nearly all of these files look like **watermarked preview images from stock-photo sites**
> (the carpenter and Buy Any Car heroes clearly show tiled "Vecteezy" watermarks; the plumber photo has a faint watermark too).
> The six Health & Wellness listing photos are previews as well: `home-nursing` and `gp-telehealth` carry visible **Getty Images**
> watermarks, `massage-therapy` shows a **Shutterstock** caption strip, and `physiotherapy` has faint repeating marks.
> The six Buy Any Car listing photos have no watermark, but they look like web-search images (press, dealer and car-review photos)
> of unknown origin, so their licence is unconfirmed too. The Rent & Lease photos are mixed: `accra-shop-space` carries a
> visible **Getty Images** watermark, `accra-apartment-lease` has a faint repeating logo mark, and the hero plus the other four
> have no watermark but an unknown source.
> The Events hero has no watermark and is high-resolution, but its source is unknown and it shows an identifiable person (an event
> stylist at work): confirm the licence, and that she and the photographer agreed to its use, or replace it.
> The six Events listing photos are mixed: `photography-video` carries a visible **Getty Images** watermark, `balloon-floral-decor`
> and `catering-coordination` have faint repeating watermarks (they look like Dreamstime), and the other three have no watermark but
> an unknown source. `wedding-planning` shows identifiable people - confirm they agreed to its use.
> Preview images are not licensed for commercial use. Buy/download the licensed originals (or use the client's own photos) and
> replace them: put the new file in `_assets/photos/<slug>/` named `hero.jpg` (or the item id, e.g. `home-nursing.jpg`),
> then run `npm run photos`. Only the file changes - the per-photo framing lives in `imageFocus` in `src/data/services.ts`.
>
> Sizes: the Rent & Lease hero is only 239 x 192 px and the nurses hero 220 x 148 px (both are shown 2-3x larger than that, so
> they look soft - replace these first), the Buy Any Car hero is 678 x 452 px, the six Health & Wellness listing photos
> 400-611 px, the six car photos 494-700 px, the six Rent & Lease listing photos 540-693 px and the six Events listing photos
> 468-738 px wide, so they look soft on
> high-density (retina) screens. Listing cards need
> roughly 700 px or more of width to stay sharp; heroes (shown up to ~560 px wide) are best at around 1100 px.

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence |
|---|---|---|---|---|
| `fixit-now/hero.webp` | `RNB_plumber.webp` | FixIt Now: Book a Repair Pro | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/hero.webp` | `RNB_Health_wellness.jpg` | Health & Wellness | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `artisan-carpenter/hero.webp` | `RNB_carpenter.jpg` | Artisan & Carpenter | Vecteezy preview (watermarked, supplied by client) | **Not confirmed - replace with licensed copy** |
| `buy-any-car/hero.webp` | `7.jpg` | Buy Any Car | Vecteezy preview (tiled watermarks across the whole photo; supplied by client) | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/hero.webp` | `14.jpg` | Rent & Lease | Unknown source (supplied by client); no watermark; only 239 x 192 px | **Not confirmed - replace with licensed copy** |
| `events/hero.webp` | `21.webp` | Event Decor & Event Planning | Unknown source (supplied by client); no watermark; professional event photo of an identifiable person | **Not confirmed - confirm the licence and the person's consent, or replace** |
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
| `rent-and-lease/accra-apartment-lease.webp` | `19.jpg` | Rent & Lease: Two-bedroom apartment | Unknown stock source (supplied by client); faint repeating logo watermark across the photo | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/kumasi-townhouse-lease.webp` | `16.jpg` | Rent & Lease: Family townhouse | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/accra-shop-space.webp` | `15.jpg` | Rent & Lease: Street-front shop space | Getty Images preview (watermarked; credit shown: Mitch Diamond; ID 593432551; supplied by client) | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/toronto-office.webp` | `20.jpg` | Rent & Lease: Private small office | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/ottawa-co-living-room.webp` | `17.jpg` | Rent & Lease: Co-living room | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/calgary-warehouse.webp` | `18.jpg` | Rent & Lease: Light-industrial warehouse | Unknown source (supplied by client); no watermark; black-and-white image | **Not confirmed - replace with licensed copy** |
| `events/wedding-planning.webp` | `27.jpg` | Events: Wedding planning | Unknown source (supplied by client); no watermark; wedding portrait of identifiable people | **Not confirmed - confirm the licence and the couple's consent, or replace** |
| `events/stage-backdrop-decor.webp` | `26.jpg` | Events: Stage & backdrop decor | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `events/balloon-floral-decor.webp` | `25.jpg` | Events: Balloon & floral decor | Unknown stock source (supplied by client); faint repeating watermark (looks like Dreamstime) | **Not confirmed - replace with licensed copy** |
| `events/catering-coordination.webp` | `24.jpg` | Events: Catering coordination | Unknown stock source (supplied by client); faint repeating watermark (looks like Dreamstime) | **Not confirmed - replace with licensed copy** |
| `events/photography-video.webp` | `23.jpg` | Events: Photography & video | Getty Images preview (watermarked; credit shown: Alexander Shelegov; ID 1335978911; supplied by client) | **Not confirmed - replace with licensed copy** |
| `events/sound-dj-mc.webp` | `22.jpg` | Events: Sound, DJ & MC | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |

The original hero files are kept, under the names they were supplied with, in `_assets/photos/_originals/`.
The six Health & Wellness listing photos were supplied as `1.jpg` - `6.jpg`; the unmodified files now sit in
`_assets/photos/health-wellness/` under their item ids (the "Supplied as" column says which was which).
The Buy Any Car hero was supplied as `7.jpg`; the unmodified file is `_assets/photos/buy-any-car/hero.jpg`.
The six Buy Any Car listing photos were supplied as `8.jpg` - `13.jpg`; the unmodified files sit in
`_assets/photos/buy-any-car/` under their listing ids (see the "Supplied as" column).
The Rent & Lease hero was supplied as `14.jpg`; the unmodified file is `_assets/photos/rent-and-lease/hero.jpg`.
The six Rent & Lease listing photos were supplied as `15.jpg` - `20.jpg`; the unmodified files sit in
`_assets/photos/rent-and-lease/` under their listing ids (see the "Supplied as" column).
The Events hero was supplied as `21.webp` at 1732 x 1155 px (`npm run photos` shrinks anything wider than 1200 px to keep pages
fast); the unmodified file is `_assets/photos/events/hero.webp`.
The six Events listing photos were supplied as `22.jpg` - `27.jpg`; the unmodified files sit in `_assets/photos/events/`
under their listing ids (see the "Supplied as" column).

When you add more photos, record each one in the table above (one row per file in `public/images/`), e.g.:

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence (e.g. Unsplash License, Pexels License, CC0, client-owned) |
|---|---|---|---|---|
| _example:_ `good-to-eat/hero.webp` | `jollof.jpg` | Good to Eat | _Name - https://..._ | _Unsplash License_ |

Notes
- Unsplash / Pexels / Pixabay licences allow free commercial use without attribution, but keep this record anyway.
- Do not present stock photos as real customers, staff, vehicles or offices.
- For real client photos (team, vehicles, offices) record "Client-owned" and get written permission from anyone who is recognisable.
