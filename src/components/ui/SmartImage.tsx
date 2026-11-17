import { getServiceImage } from '@/lib/images'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import type { Accent, IconName } from '@/data/types'
import { Icon } from './Icon'

interface Props {
  slug: string
  /** item id; omit for the service hero image */
  name?: string
  alt: string
  accent: Accent
  icon: IconName
  width: number
  height: number
  className?: string
  priority?: boolean
  /** where the placeholder icon sits - use 'top' when text is overlaid on the lower part */
  iconAlign?: 'center' | 'top'
  /** CSS object-position for real photos (keeps faces in frame when the box crops the image) */
  focus?: string
}

/**
 * Renders the real photo when one exists in the image manifest, otherwise a clean branded
 * placeholder (see IMAGE_TODO.md). Width/height are always set so there is no layout shift.
 */
export function SmartImage({ slug, name, alt, accent, icon, width, height, className, priority, iconAlign = 'center', focus }: Props) {
  const src = getServiceImage(slug, name)
  const style = { aspectRatio: `${width} / ${height}` }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={focus ? { ...style, objectPosition: focus } : style}
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      style={style}
      className={cn('relative h-full w-full overflow-hidden', accentStyles[accent].gradient, className)}
    >
      {/* soft depth: concentric rings + highlight */}
      <div className="absolute -right-1/4 -top-1/3 h-[120%] w-[120%] rounded-full border border-white/15" />
      <div className="absolute -right-1/6 -top-1/6 h-[80%] w-[80%] rounded-full border border-white/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className={cn('absolute inset-0 flex justify-center', iconAlign === 'top' ? 'items-start pt-[13%]' : 'items-center')}>
        <Icon name={icon} size={64} strokeWidth={1.25} className={cn(
            'h-1/3 w-1/3 text-white/90 drop-shadow-lg',
            iconAlign === 'top' ? 'max-h-14 max-w-14 md:max-h-24 md:max-w-24' : 'max-h-24 max-w-24',
          )}
        />
      </div>
    </div>
  )
}
