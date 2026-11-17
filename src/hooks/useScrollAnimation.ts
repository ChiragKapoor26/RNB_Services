import { useLayoutEffect, type RefObject } from 'react'
import { loadGsap } from '@/lib/loadGsap'

type GsapModule = typeof import('@/lib/gsap')

export interface AnimCtx {
  gsap: GsapModule['gsap']
  ScrollTrigger: GsapModule['ScrollTrigger']
  /** visitor prefers reduced motion - skip scrubbed/pinned animation */
  reduce: boolean
  /** viewport < 768px - use simpler, non-pinned layouts */
  mobile: boolean
  /** viewport shorter than 640px (e.g. landscape phone) - pinned layouts would not fit */
  short: boolean
  scope: HTMLElement
}

/**
 * Runs GSAP/ScrollTrigger setup inside gsap.matchMedia scoped to `scope`.
 *
 * GSAP is loaded lazily (dynamic import) so it never blocks first paint; until it arrives the
 * section simply shows its normal static layout. Everything created inside is reverted
 * automatically on unmount, on route change and when a media query flips - and it is
 * StrictMode safe (a cancelled flag covers the double-invoked effect).
 */
export function useScrollAnimation(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: AnimCtx) => void | (() => void),
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    let cancelled = false
    let revert: (() => void) | undefined

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const mm = gsap.matchMedia(el)
      mm.add(
        {
          // NOTE: gsap.matchMedia only runs the callback when at least one condition matches,
          // so `always` guarantees it runs on plain desktops (where none of the others match).
          always: '(min-width: 0px)',
          reduce: '(prefers-reduced-motion: reduce)',
          mobile: '(max-width: 767px)',
          short: '(max-height: 639px)',
        },
        (context) => {
          const { reduce, mobile, short } = context.conditions as { reduce: boolean; mobile: boolean; short: boolean }
          return setup({ gsap, ScrollTrigger, reduce: !!reduce, mobile: !!mobile, short: !!short, scope: el })
        },
      )
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
