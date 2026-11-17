import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { home } from '@/data/home'
import { getService } from '@/data/services'
import type { Service } from '@/data/types'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'

/** The track holds this many identical copies; the CSS animation slides exactly one copy (-100% / COPIES). */
const COPIES = 3

/**
 * "Featured spotlight": a continuous, seamless marquee of service cards that slides from right to left.
 *  - Pure CSS animation (no scroll jank, no JS per frame).
 *  - Pauses on hover and while a card has keyboard focus, plus an explicit Pause/Play button (WCAG 2.2.2).
 *  - Reduced motion: no animation - the row becomes a normal, swipeable/scrollable list.
 *  - Duplicate copies are hidden from assistive tech and removed from the tab order.
 */
export function SpotlightCarousel() {
  const sp = home.spotlight
  const [paused, setPaused] = useState(false)
  const featured = sp.slugs.map((slug) => getService(slug)).filter((s): s is Service => Boolean(s))

  return (
    <section
      id="spotlight"
      data-theme="royal"
      aria-labelledby="spotlight-title"
      className="relative overflow-x-clip py-24 text-white md:py-32"
    >
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div id="spotlight-title">
          <SectionHeading eyebrow={sp.eyebrow} title={sp.title} subtitle={sp.subtitle} tone="dark" />
        </div>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? sp.playLabel : sp.pauseLabel}
          onClick={() => setPaused((p) => !p)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/35 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink motion-reduce:hidden"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          {paused ? sp.play : sp.pause}
        </button>
      </div>

      {/* viewport: clips the track, fades the edges. The left padding aligns the first card with the page grid. */}
      <div
        className={cn(
          'mt-12 overflow-hidden pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]',
          '[mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]',
          'motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]',
        )}
      >
        <div
          data-paused={paused}
          className={cn(
            'flex w-max animate-marquee [--marquee-duration:40s] md:[--marquee-duration:70s]',
            'hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]',
            'data-[paused=true]:[animation-play-state:paused] motion-reduce:animate-none',
          )}
        >
          {Array.from({ length: COPIES }, (_, copy) => {
            const isClone = copy > 0
            return (
              <ul
                key={copy}
                aria-hidden={isClone ? true : undefined}
                className={cn('flex shrink-0 gap-5 pr-5 md:gap-7 md:pr-7', isClone && 'motion-reduce:hidden')}
              >
                {featured.map((s, i) => (
                  <li key={s.slug} className="shrink-0">
                    <Link
                      to={`/services/${s.slug}`}
                      tabIndex={isClone ? -1 : undefined}
                      className="group relative block h-[440px] w-[78vw] max-w-[400px] overflow-hidden rounded-[32px] bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:w-[400px] md:h-[440px] md:w-[460px] md:max-w-none"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-105">
                        <SmartImage
                          slug={s.slug}
                          alt={isClone ? '' : `${s.title} - illustrative image`}
                          accent={s.accent}
                          icon={s.icon}
                          width={920}
                          height={1100}
                          iconAlign="top"
                          focus={s.imageFocus}
                          className="!aspect-auto h-full"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" aria-hidden="true" />
                      <div className="absolute inset-x-0 bottom-0 p-7">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                            <Icon name={s.icon} size={20} />
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                            {String(i + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl font-semibold leading-tight text-white">{s.title}</h3>
                        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/75">{s.summary}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
                          {sp.cta}
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          })}
        </div>
      </div>
    </section>
  )
}
