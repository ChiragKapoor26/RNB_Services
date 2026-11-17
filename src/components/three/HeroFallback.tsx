import { apps } from '@/data/apps'
import { home } from '@/data/home'
import { usePrefersReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/data/types'

/** Badges sit around (not on top of) the logo cards. */
const floaters: { icon: IconName; className: string; tone: string }[] = [
  // the three at the top are hidden in portrait so they never crowd the headline
  { icon: 'taxi', className: 'hidden wide:flex left-[-3%] top-[2%]', tone: 'bg-sun text-ink' },
  { icon: 'basket', className: 'left-[2%] bottom-[2%]', tone: 'bg-taxi text-ink' },
  { icon: 'building', className: 'hidden wide:flex right-[-3%] top-[2%]', tone: 'bg-white text-royal' },
  { icon: 'wrench', className: 'right-[0%] bottom-[4%]', tone: 'bg-royal text-white' },
  { icon: 'heart-pulse', className: 'hidden wide:flex left-[44%] top-[-6%]', tone: 'bg-forest text-white' },
  { icon: 'car', className: 'right-[30%] bottom-[-6%]', tone: 'bg-ink text-white' },
]

/**
 * Where each app card sits in the static fan - it mirrors the 3D orbit's starting pose:
 * User in front and centre, Driver behind on the left, Seller behind on the right.
 */
const fan: Record<string, { left: string; top: string; width: string; rotate: string; z: string }> = {
  driver: { left: '26%', top: '42%', width: '42%', rotate: '-8deg', z: 'z-10' },
  seller: { left: '74%', top: '42%', width: '42%', rotate: '8deg', z: 'z-10' },
  user: { left: '50%', top: '52%', width: '51%', rotate: '0deg', z: 'z-20' },
}

/**
 * Non-3D hero art: the real User / Seller / Driver app logos as a fanned stack of cards with softly
 * floating service badges. Used first (it is the LCP content), for reduced-motion visitors,
 * low-power devices, no-WebGL browsers, and while the three.js chunk downloads.
 */
export function HeroFallback() {
  const reduce = usePrefersReducedMotion()
  return (
    <div
      className="absolute inset-0 flex items-end justify-center pb-[20svh] wide:items-center wide:justify-end wide:pb-0 wide:pr-[5%]"
      role="img"
      aria-label={home.hero.fallbackAlt}
    >
      <div className="relative h-[min(72vw,48svh)] w-[min(72vw,48svh)] wide:h-[min(42vw,58svh)] wide:w-[min(42vw,58svh)]">
        {apps.map((app, i) => {
          const p = fan[app.id]
          return (
            <div
              key={app.id}
              className={cn('absolute -translate-x-1/2 -translate-y-1/2', p.z)}
              style={{ left: p.left, top: p.top, width: p.width, rotate: p.rotate }}
            >
              <div className={cn(!reduce && 'animate-float')} style={reduce ? undefined : { animationDelay: `${i * -2.3}s` }}>
                <img
                  src={app.logoSmall}
                  alt=""
                  width={480}
                  height={416}
                  // React 18 only knows the lowercase attribute (the camelCase prop arrives in React 19)
                  {...(app.id === 'user' ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
                  className="aspect-[1.153/1] w-full rounded-[1.4rem] bg-white object-cover shadow-[0_30px_60px_-24px_rgba(11,15,26,0.55)] ring-[5px] ring-[#10131c]"
                />
              </div>
            </div>
          )
        })}
        {floaters.map((f, i) => (
          <span
            key={f.icon}
            aria-hidden="true"
            style={reduce ? undefined : { animationDelay: `${i * -1.1}s` }}
            className={cn(
              'absolute z-30 flex h-12 w-12 items-center justify-center rounded-2xl shadow-xl sm:h-16 sm:w-16',
              !reduce && 'animate-float',
              f.className,
              f.tone,
            )}
          >
            <Icon name={f.icon} size={28} />
          </span>
        ))}
      </div>
    </div>
  )
}
