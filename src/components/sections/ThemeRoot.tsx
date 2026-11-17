import { useRef, type ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/** Brand background colours, keyed by a section's `data-theme`. Keep in sync with index.css. */
const THEMES: Record<string, [number, number, number]> = {
  paper: [247, 247, 245],
  ink: [11, 15, 26],
  royal: [20, 42, 122],
  forest: [23, 58, 29],
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

/**
 * Wraps the Home sections. While scrolling, the wrapper's background morphs smoothly between the
 * brand colours of neighbouring sections (paper -> ink -> royal -> forest ...). The sections keep
 * their own static colours in CSS, so without JS or with reduced motion nothing breaks.
 */
export function ThemeRoot({ children, version = 0 }: { children: ReactNode; /** bump when sections are added later (lazy-loaded) so they get re-measured */ version?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollAnimation(ref, ({ ScrollTrigger, reduce, scope }) => {
    if (reduce) return
    const sections = Array.from(scope.querySelectorAll<HTMLElement>(':scope > [data-theme]'))
    if (sections.length < 2) return
    const colors = sections.map((s) => THEMES[s.dataset.theme ?? 'paper'] ?? THEMES.paper)
    let tops: number[] = []

    const measure = () => {
      const base = window.scrollY
      tops = sections.map((s) => s.getBoundingClientRect().top + base)
    }
    const update = () => {
      if (!tops.length) return
      const vh = window.innerHeight
      const line = window.scrollY + vh * 0.55
      const zone = vh * 0.45
      let idx = 0
      for (let k = 1; k < tops.length; k++) if (line >= tops[k] - zone) idx = k
      let c = colors[idx]
      if (idx > 0) {
        const t = ease(clamp01((line - (tops[idx] - zone)) / zone))
        const p = colors[idx - 1]
        c = [p[0] + (c[0] - p[0]) * t, p[1] + (c[1] - p[1]) * t, p[2] + (c[2] - p[2]) * t]
      }
      scope.style.backgroundColor = `rgb(${Math.round(c[0])} ${Math.round(c[1])} ${Math.round(c[2])})`
    }

    scope.dataset.morph = 'on'
    const st = ScrollTrigger.create({
      trigger: scope,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: update,
      onRefresh: () => {
        measure()
        update()
      },
    })
    measure()
    update()

    return () => {
      st.kill()
      delete scope.dataset.morph
      scope.style.backgroundColor = ''
    }
  }, [version])

  return (
    <div ref={ref} className="theme-root">
      {children}
    </div>
  )
}
