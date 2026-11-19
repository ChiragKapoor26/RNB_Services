/**
 * Converts photos you drop into /_assets/photos/<slug>/ into optimised WebP files in
 * /public/images/<slug>/ and writes src/data/imageManifest.json (which the site reads).
 *
 *   npm run photos
 *
 * Naming (inside each service folder):
 *   hero.jpg            -> the service's hero image
 *   <item-id>.jpg       -> that item's card image (ids are in src/data/services.ts, e.g. cement-50kg.jpg)
 *   anything else       -> used round-robin: first for a missing hero, then for items that have no image yet
 *
 * Remember to record every photo's source + licence in IMAGE_CREDITS.md.
 */
import sharp from 'sharp'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { services } from '../src/data/services'

const root = path.resolve(import.meta.dirname, '..')
const SRC = path.join(root, '_assets', 'photos')
const OUT = path.join(root, 'public', 'images')
const MANIFEST = path.join(root, 'src', 'data', 'imageManifest.json')
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i

type Manifest = Record<string, { hero?: string; items?: Record<string, string> }>
const manifest: Manifest = {}
let converted = 0

for (const service of services) {
  const srcDir = path.join(SRC, service.slug)
  if (!existsSync(srcDir)) continue
  const files = (await readdir(srcDir)).filter((f) => EXT.test(f)).sort()
  if (!files.length) continue

  const outDir = path.join(OUT, service.slug)
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  const base = (f: string) => f.replace(EXT, '').toLowerCase()
  const itemIds = new Set(service.items.map((i) => i.id))
  const entry: Manifest[string] = { items: {} }

  const convert = async (file: string, name: string) => {
    const dest = `${name}.webp`
    await sharp(path.join(srcDir, file))
      .rotate() // respect EXIF orientation
      // 1200px is plenty: the biggest place a photo is shown is a service hero (~560 CSS px = ~1120 px on 2x
      // screens) and it is the page's LCP image, so every extra KB slows that page's first load
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, dest))
    converted++
    return dest
  }

  const spare: string[] = []
  for (const file of files) {
    const b = base(file)
    if (b === 'hero') entry.hero = await convert(file, 'hero')
    else if (itemIds.has(b)) entry.items![b] = await convert(file, b)
    else spare.push(file)
  }

  // round-robin the unnamed photos: hero first, then any item still without an image
  let i = 0
  const nextSpare = () => (spare.length ? spare[i++ % spare.length] : undefined)
  if (!entry.hero) {
    const f = nextSpare()
    if (f) entry.hero = await convert(f, 'hero')
  }
  const converted_spare = new Map<string, string>()
  for (const item of service.items) {
    if (entry.items![item.id]) continue
    const f = nextSpare()
    if (!f) break
    if (!converted_spare.has(f)) converted_spare.set(f, await convert(f, `photo-${base(f)}`))
    entry.items![item.id] = converted_spare.get(f)!
  }

  manifest[service.slug] = entry
  console.log(`${service.slug}: ${files.length} photo(s)`)
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nConverted ${converted} image(s). Manifest written to src/data/imageManifest.json`)
console.log('Next: run `npm run image-todo` to refresh IMAGE_TODO.md, and update IMAGE_CREDITS.md.')
