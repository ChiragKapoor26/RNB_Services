import manifestJson from '@/data/imageManifest.json'

/**
 * Photos are optional. `npm run photos` converts files from /_assets/photos/<slug>/ into
 * /public/images/<slug>/*.webp and writes src/data/imageManifest.json. Anything not in the
 * manifest renders a clean branded placeholder (see IMAGE_TODO.md).
 */
type Manifest = Record<string, { hero?: string; items?: Record<string, string> }>
const manifest = manifestJson as unknown as Manifest

export function getServiceImage(slug: string, itemId?: string): string | null {
  const entry = manifest[slug]
  if (!entry) return null
  const file = itemId ? entry.items?.[itemId] : entry.hero
  return file ? `/images/${slug}/${file}` : null
}
