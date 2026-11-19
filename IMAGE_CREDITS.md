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

Hero photos supplied for nine services (FixIt Now, Health & Wellness, Artisan & Carpenter, Buy Any Car, Rent & Lease, Event Decor & Event Planning, Good to Eat, Professional Services, Building Supplies & Home Hardware), plus listing photos for all six Health & Wellness items, all six Buy Any Car items, all six Rent & Lease items, all six Events items, all six Good to Eat items, all six Professional Services items and all six Building Supplies items (every other service's cards still show branded placeholders - see `IMAGE_TODO.md`).

> **⚠ Licence check needed before launch.** Nearly all of these files look like **watermarked preview images from stock-photo sites**
> (the carpenter, Buy Any Car and Good to Eat heroes clearly show tiled "Vecteezy" watermarks; the plumber photo has a faint watermark too).
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
> The six Good to Eat listing photos are mixed: `banku-tilapia` is a **Dreamstime** preview (tiled watermark plus a blue ID banner),
> `kelewele` has a faint repeating Dreamstime-style mark, `jollof-grilled-chicken` is a **Shutterstock** preview (the file includes a
> Shutterstock ID footer line), `waakye` has a transparent-PNG checkerboard baked into the picture (get the original with a plain
> background), and `suya-skewers` and `poutine` have no watermark but an unknown source.
> The Professional Services hero has no watermark, but its source is unknown and it shows identifiable people (a team portrait):
> confirm the licence and that they agreed to its use, or replace it. The site shows it as an *illustrative* image (see its alt
> text) - do not caption it as R&B's own team or as real providers.
> The six Professional Services listing photos are staged business scenes: `immigration-documentation` is a **Vecteezy** preview
> (tiled watermarks across the photo) and the other five have no watermark (checked with local-contrast enhancement) but an
> unknown source. Five show identifiable people (`legal-consultation` shows only hands) - confirm the licences and that the
> people agreed to their use when you replace them. They are shown as illustrative images, so never caption them as real
> providers or clients.
> The Building Supplies hero has only a very faint watermark across the shirt (it looks like Dreamstime's wordmark and swirl logo;
> barely visible at normal size). Its source is unknown and it shows an identifiable person (a man posing in a hardware store):
> confirm the licence and that he agreed to its use, or replace it. It is also the first card of the desktop spotlight carousel.
> The six Building Supplies listing photos have no watermark (checked with local-contrast enhancement) but an unknown source; they
> look like online-shop / supplier product photos. Four things to know: `cement-50kg` shows a real brand (Empire Cement, "GS
> 1118-1:2024", "Made in Ghana") next to a sample price, and it also appears beside the Toronto / CA$ price when the Canada toggle is
> on - confirm the brand owner is happy to appear, or use an unbranded bag; `paint-20l` shows buckets labelled "Polyurethane
> Waterproof Coating" (English and Chinese), a waterproofing product rather than the emulsion paint the listing describes;
> `electrical-wiring-kit` shows an inverter-style generator / load / grid wiring panel rather than a room wiring kit; and
> `power-drill-set` is only 225 x 225 px.
> Preview images are not licensed for commercial use. Buy/download the licensed originals (or use the client's own photos) and
> replace them: put the new file in `_assets/photos/<slug>/` named `hero.jpg` (or the item id, e.g. `home-nursing.jpg`),
> then run `npm run photos`. Only the file changes - the per-photo framing lives in `imageFocus` in `src/data/services.ts`.
>
> Sizes: the Rent & Lease hero is only 239 x 192 px, the nurses hero 220 x 148 px and the `power-drill-set` listing photo
> 225 x 225 px (all three are shown 1.5-2.5x larger than that, so they look soft - replace these first). The Professional Services
> hero is 525 x 350 px (about 1.3x enlarged in the desktop hero spot), the Buy Any Car and Good to Eat heroes are 678 x 452 px and
> the Building Supplies hero is 800 x 533 px (sharp on standard screens). The other listing photos are 400-611 px (Health &
> Wellness), 494-700 px (cars), 540-693 px (Rent & Lease), 468-738 px (Events), 440-738 px (Good to Eat), 547-678 px (Professional
> Services) and 451-680 px (Building Supplies) wide. Everything looks soft on high-density (retina) screens. Listing cards need
> roughly 700 px or more of width to stay sharp; heroes (shown up to ~560 px wide) are best at around 1100 px.

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence |
|---|---|---|---|---|
| `fixit-now/hero.webp` | `RNB_plumber.webp` | FixIt Now: Book a Repair Pro | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `health-wellness/hero.webp` | `RNB_Health_wellness.jpg` | Health & Wellness | Unknown stock preview (supplied by client) | **Not confirmed - replace with licensed copy** |
| `artisan-carpenter/hero.webp` | `RNB_carpenter.jpg` | Artisan & Carpenter | Vecteezy preview (watermarked, supplied by client) | **Not confirmed - replace with licensed copy** |
| `buy-any-car/hero.webp` | `7.jpg` | Buy Any Car | Vecteezy preview (tiled watermarks across the whole photo; supplied by client) | **Not confirmed - replace with licensed copy** |
| `rent-and-lease/hero.webp` | `14.jpg` | Rent & Lease | Unknown source (supplied by client); no watermark; only 239 x 192 px | **Not confirmed - replace with licensed copy** |
| `events/hero.webp` | `21.webp` | Event Decor & Event Planning | Unknown source (supplied by client); no watermark; professional event photo of an identifiable person | **Not confirmed - confirm the licence and the person's consent, or replace** |
| `good-to-eat/hero.webp` | `28.jpg` | Good to Eat | Vecteezy preview (tiled watermarks across the whole photo; supplied by client) | **Not confirmed - replace with licensed copy** |
| `building-supplies/hero.webp` | `43.webp` | Building Supplies & Home Hardware | Unknown source (supplied by client); very faint watermark across the shirt (looks like Dreamstime); identifiable person | **Not confirmed - confirm the licence and the person's consent, or replace** |
| `professional-services/hero.webp` | `35.jpg` | Professional Services | Unknown source (supplied by client); no watermark; team portrait of identifiable people | **Not confirmed - confirm the licence and the people's consent, or replace** |
| `professional-services/accountant-tax.webp` | `41.jpg` | Professional Services: Accountant & tax filing | Unknown source (supplied by client); no watermark; staged business meeting with identifiable people | **Not confirmed - replace with licensed copy** |
| `professional-services/legal-consultation.webp` | `40.jpg` | Professional Services: Legal consultation | Unknown source (supplied by client); no watermark; gavel, scales and hands only (no faces) | **Not confirmed - replace with licensed copy** |
| `professional-services/web-it-support.webp` | `39.jpg` | Professional Services: Web & IT support | Unknown source (supplied by client); no watermark; identifiable person at a desk | **Not confirmed - replace with licensed copy** |
| `professional-services/business-registration.webp` | `38.jpg` | Professional Services: Business registration consultant | Unknown source (supplied by client); no watermark; two identifiable people reviewing paperwork | **Not confirmed - replace with licensed copy** |
| `professional-services/architect-drafting.webp` | `37.jpg` | Professional Services: Architect & drafting | Unknown source (supplied by client); no watermark; identifiable person at a drafting table | **Not confirmed - replace with licensed copy** |
| `professional-services/immigration-documentation.webp` | `36.jpg` | Professional Services: Immigration & documentation help | Vecteezy preview (tiled watermarks across the whole photo; supplied by client); identifiable person | **Not confirmed - replace with licensed copy** |
| `building-supplies/cement-50kg.webp` | `49.jpg` | Building Supplies: Cement (50kg bag) | Unknown source (supplied by client); no watermark; shows a real brand (Empire Cement, Made in Ghana) | **Not confirmed - confirm the brand owner's OK, or use an unbranded bag** |
| `building-supplies/roofing-sheets.webp` | `48.jpg` | Building Supplies: Roofing sheets | Unknown source (supplied by client); no watermark; looks like a supplier-catalogue product photo | **Not confirmed - replace with licensed copy** |
| `building-supplies/power-drill-set.webp` | `47.jpg` | Building Supplies: Power drill set | Unknown source (supplied by client); no watermark; looks like an online-shop product photo; only 225 x 225 px | **Not confirmed - replace with a licensed, larger copy** |
| `building-supplies/paint-20l.webp` | `46.jpg` | Building Supplies: Paint (20L) | Unknown source (supplied by client); no watermark; buckets labelled "Polyurethane Waterproof Coating" (English + Chinese) - a waterproofing product, not emulsion paint | **Not confirmed - replace with licensed copy of wall paint** |
| `building-supplies/plumbing-fittings.webp` | `45.webp` | Building Supplies: Plumbing pipes & fittings | Unknown source (supplied by client); no watermark; stacked PVC pipes (no fittings visible) | **Not confirmed - replace with licensed copy** |
| `building-supplies/electrical-wiring-kit.webp` | `44.jpg` | Building Supplies: Electrical wiring kit | Unknown source (supplied by client); no watermark; an inverter-style generator / load / grid wiring panel | **Not confirmed - replace with licensed copy** |
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
| `good-to-eat/jollof-grilled-chicken.webp` | `34.jpg` | Good to Eat: Jollof rice & grilled chicken | Shutterstock preview (the file includes a Shutterstock footer line; ID 2585552247; supplied by client) | **Not confirmed - replace with licensed copy** |
| `good-to-eat/waakye.webp` | `30.jpg` | Good to Eat: Waakye | Unknown source (supplied by client); transparent-PNG checkerboard baked into the picture | **Not confirmed - replace with a clean copy** |
| `good-to-eat/banku-tilapia.webp` | `29.jpg` | Good to Eat: Banku & tilapia | Dreamstime preview (tiled watermark + blue banner; credit shown: Mieszko9; ID 398333746; supplied by client) | **Not confirmed - replace with licensed copy** |
| `good-to-eat/kelewele.webp` | `33.jpg` | Good to Eat: Kelewele | Unknown stock source (supplied by client); faint repeating watermark (looks like Dreamstime) | **Not confirmed - replace with licensed copy** |
| `good-to-eat/poutine.webp` | `32.jpg` | Good to Eat: Poutine | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |
| `good-to-eat/suya-skewers.webp` | `31.jpg` | Good to Eat: Suya skewers | Unknown source (supplied by client); no watermark | **Not confirmed - replace with licensed copy** |

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
The Good to Eat hero was supplied as `28.jpg`; the unmodified file is `_assets/photos/good-to-eat/hero.jpg`.
The six Good to Eat listing photos were supplied as `29.jpg` - `34.jpg`; the unmodified files sit in
`_assets/photos/good-to-eat/` under their listing ids (see the "Supplied as" column).
The Professional Services hero was supplied as `35.jpg`; the unmodified file is `_assets/photos/professional-services/hero.jpg`.
The six Professional Services listing photos were supplied as `36.jpg` - `41.jpg`; the unmodified files sit in
`_assets/photos/professional-services/` under their listing ids (see the "Supplied as" column).
The Building Supplies hero was supplied as `43.webp`; the unmodified file is `_assets/photos/building-supplies/hero.webp`.
The six Building Supplies listing photos were supplied as `44.jpg` - `49.jpg` (`45.webp` is a WebP); the unmodified files sit in
`_assets/photos/building-supplies/` under their listing ids (see the "Supplied as" column).

When you add more photos, record each one in the table above (one row per file in `public/images/`), e.g.:

| File in `public/images/` | Supplied as | Used for | Source / photographer | Licence (e.g. Unsplash License, Pexels License, CC0, client-owned) |
|---|---|---|---|---|
| _example:_ `good-to-eat/hero.webp` | `jollof.jpg` | Good to Eat | _Name - https://..._ | _Unsplash License_ |

Notes
- Unsplash / Pexels / Pixabay licences allow free commercial use without attribution, but keep this record anyway.
- Do not present stock photos as real customers, staff, vehicles or offices.
- For real client photos (team, vehicles, offices) record "Client-owned" and get written permission from anyone who is recognisable.
