/**
 * Optimises the four brand logos from /_assets/logos into /public/brand and
 * generates favicon / touch-icon / OG image.
 *
 *   npx tsx scripts/process-logos.ts
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const src = (f: string) => path.join(root, '_assets', 'logos', f)
const out = (f: string) => path.join(root, 'public', 'brand', f)

await mkdir(path.join(root, 'public', 'brand'), { recursive: true })

/** The JPEG exports have thin black strips on the left/right edges - crop them off. */
async function cropEdges(file: string, edge = 34) {
  const meta = await sharp(src(file)).metadata()
  return sharp(src(file)).extract({
    left: edge,
    top: 0,
    width: (meta.width ?? 0) - edge * 2,
    height: meta.height ?? 0,
  })
}

// Main logo (square, already clean)
await sharp(src('rnb-main.png')).resize(640).webp({ quality: 92 }).toFile(out('rnb-main.webp'))
await sharp(src('rnb-main.png')).resize(512).png({ compressionLevel: 9 }).toFile(out('rnb-main.png'))

// App logos
for (const [file, name] of [
  ['rnb-seller.jpg', 'rnb-seller'],
  ['rnb-user.jpg', 'rnb-user'],
] as const) {
  const img = await cropEdges(file)
  await img.clone().resize({ width: 1000 }).webp({ quality: 88 }).toFile(out(`${name}.webp`))
  await img.clone().resize({ width: 480 }).webp({ quality: 85 }).toFile(out(`${name}-sm.webp`))
}

/**
 * Driver app logo (RUNNER). The source is a square, transparent 4000px PNG, so: flatten onto white (like the
 * seller/user logos), trim the empty margin and centre it on the same ~1.15:1 canvas the other app logos use.
 * The 3D hero cards (2.2 x 1.9) and every <img width/height> assume that shape.
 */
const driverArt = await sharp(src('rnb-driver.png'))
  .flatten({ background: '#ffffff' })
  .trim({ background: '#ffffff', threshold: 12 })
  .toBuffer()
for (const [width, height, quality, file] of [
  [1000, 867, 90, 'rnb-driver.webp'],
  [480, 416, 88, 'rnb-driver-sm.webp'],
] as const) {
  const art = await sharp(driverArt)
    .resize({ width: Math.round(width * 0.84), height: Math.round(height * 0.84), fit: 'inside' })
    .toBuffer()
  await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite([{ input: art, gravity: 'centre' }])
    .webp({ quality })
    .toFile(out(file))
}

// Favicons
await sharp(src('rnb-main.png')).resize(64, 64).png().toFile(path.join(root, 'public', 'favicon.png'))
await sharp(src('rnb-main.png'))
  .resize(150, 150)
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' })
  .png()
  .toFile(path.join(root, 'public', 'apple-touch-icon.png'))

// Open Graph image (1200x630): off-white canvas, centred logo, three app-colour bars
const logo = await sharp(src('rnb-main.png')).resize(520, 520).png().toBuffer()
const bars = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
     <rect width="1200" height="630" fill="#F7F7F5"/>
     <rect x="0" y="606" width="400" height="24" fill="#2F5FE0"/>
     <rect x="400" y="606" width="400" height="24" fill="#DF6D2E"/>
     <rect x="800" y="606" width="400" height="24" fill="#3E7742"/>
   </svg>`,
)
await sharp(bars)
  .composite([{ input: logo, left: 340, top: 55 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'public', 'og-image.png'))

console.log('Logos processed into public/brand')
