import { useEffect, type ReactNode } from 'react'
import { loadGsap } from '@/lib/loadGsap'
import { setLenis } from '@/lib/lenis'

/**
 * Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger.
 *  - Disabled entirely for visitors who prefer reduced motion (native scrolling instead).
 *  - Loaded lazily once the browser is idle, so it never competes with first paint.
 *  - Cleans up fully, so it is safe under React StrictMode's double-invoked effects.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const start = () => {
      void Promise.all([import('lenis'), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
        setLenis(lenis)
        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        // fonts shift layout - re-measure once they are ready
        void document.fonts?.ready.then(() => ScrollTrigger.refresh())

        cleanup = () => {
          gsap.ticker.remove(tick)
          lenis.destroy()
          setLenis(null)
        }
      })
    }

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 300)

    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
