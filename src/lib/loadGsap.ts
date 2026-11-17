/**
 * GSAP + ScrollTrigger are only needed for scroll animation, which starts AFTER first paint.
 * Loading them through a dynamic import keeps ~100 kB of JavaScript out of the entry bundle
 * (pages like Contact and the service pages start faster).
 */
type GsapModule = typeof import('./gsap')

let promise: Promise<GsapModule> | null = null
let loaded: GsapModule | null = null

export function loadGsap(): Promise<GsapModule> {
  promise ??= import('./gsap').then((m) => {
    loaded = m
    return m
  })
  return promise
}

/** Re-measure pinned sections - a no-op until GSAP has actually been loaded. */
export function refreshScrollTriggers() {
  loaded?.ScrollTrigger.refresh()
}
