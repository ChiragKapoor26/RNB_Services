/**
 * Regenerates IMAGE_TODO.md: every image the site expects that doesn't have a photo yet.
 *   npm run image-todo
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import manifest from '../src/data/imageManifest.json'
import { services } from '../src/data/services'

const root = path.resolve(import.meta.dirname, '..')
const m = manifest as unknown as Record<string, { hero?: string; items?: Record<string, string> }>

const searchHints: Record<string, string> = {
  'building-supplies': 'African carpenter, hardware store Accra, construction site Ghana, builders Toronto',
  'professional-services': 'Black accountant at desk, African businesswoman consultation, Toronto office meeting',
  'health-wellness': 'Black woman doctor, physiotherapist with patient, telehealth consultation',
  'artisan-carpenter': 'African carpenter workshop, tiler at work, welder making gate, Black craftsman',
  events: 'African wedding decor, traditional wedding Ghana, balloon arch, DJ and MC',
  'property-booking': 'modern apartment interior, Accra skyline apartment, Toronto condo, townhouse exterior',
  'fixit-now': 'Black plumber, electrician repairing, phone repair technician, mobile mechanic',
  'good-to-eat': 'jollof rice, waakye, banku and tilapia, kelewele, poutine, suya skewers, Black chef cooking',
  'buy-any-car': 'Toyota Corolla, Honda Civic, Hyundai Elantra, Toyota RAV4, Nissan Rogue, Ford Ranger',
  'rent-and-lease': 'apartment block Accra, townhouse Kumasi, shop front, small office, co-living room, warehouse',
  'rides-and-parcels': 'Black taxi driver, airport pickup, parcel delivery rider, courier',
}

let missing = 0
let total = 0
const sections: string[] = []

for (const s of services) {
  const have = m[s.slug] ?? {}
  const rows: string[] = []
  const check = (file: string, label: string, ok: boolean) => {
    total++
    if (!ok) missing++
    rows.push(`| ${ok ? '✅' : '⬜'} | \`${file}\` | ${label} |`)
  }
  check('hero.jpg', 'Hero image for the service page / home grid', Boolean(have.hero))
  for (const item of s.items) check(`${item.id}.jpg`, item.title, Boolean(have.items?.[item.id]))
  sections.push(
    `## ${s.title} (\`${s.slug}\`)\n\n` +
      `Drop files in \`_assets/photos/${s.slug}/\`.  Search ideas: ${searchHints[s.slug] ?? ''}\n\n` +
      `| Done | File name | For |\n|---|---|---|\n${rows.join('\n')}\n`,
  )
}

const md = `# IMAGE TODO

Until photos are supplied, the site shows clean branded placeholders. **${missing} of ${total}** images are still missing.

## How to add photos

1. Download 2-3 free-licence images per section from Unsplash, Pexels or Pixabay (or use the client's own photos).
   Prefer real photos of the client's actual team, vehicles and offices. Do **not** label stock photos as real customers or staff.
2. Put them in \`_assets/photos/<slug>/\`. Name a file \`hero.jpg\` for the hero, or use an item id (below) for a specific card.
   Any other file name is used automatically to fill gaps.
3. Run \`npm run photos\` (converts to WebP and updates \`src/data/imageManifest.json\`), then \`npm run image-todo\`.
4. Record the source + licence of every image in \`IMAGE_CREDITS.md\`.

${sections.join('\n')}`

await writeFile(path.join(root, 'IMAGE_TODO.md'), md)
console.log(`IMAGE_TODO.md written - ${missing}/${total} images missing`)
