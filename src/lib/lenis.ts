import type Lenis from 'lenis'

/** Module-level handle so non-React code (scroll manager) can reach the active Lenis instance. */
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance

export function scrollToTop() {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function scrollToHash(hash: string, tries = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return
  const el = document.getElementById(id)
  if (!el) {
    // lazy sections may not be mounted yet - retry for ~6s
    if (tries < 120) window.setTimeout(() => scrollToHash(hash, tries + 1), 50)
    return
  }
  // give pinned ScrollTriggers a moment to measure first
  window.setTimeout(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: reduce ? 0 : 1.3, immediate: reduce })
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, tries === 0 ? 60 : 200)
}
