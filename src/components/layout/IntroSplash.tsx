import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { apps } from '@/data/apps'
import { company } from '@/data/company'
import { intro } from '@/data/intro'
import { cn } from '@/lib/cn'

/**
 * Brand intro: a ~3 second animated splash shown when the site first loads on Home.
 *
 * Why a coded animation and not a .gif file: a full-screen GIF is typically 1-3 MB, limited to 256
 * colours (the logo gradients would band), soft on retina screens and cannot be skipped or switched
 * off. This is a few kB of CSS, razor sharp, and runs on the compositor - so it stays smooth even
 * while the page is still loading underneath.
 *
 * The whole timeline lives in CSS (src/styles/index.css, ".intro-*"). This component only decides
 * WHETHER to play, waits for the logos/fonts, keeps the page behind it still, and tidies up.
 *
 * Good-citizen rules:
 *  - Home only, once per session (see data/intro.ts); never for deep links like /#faq or /services/...
 *  - Never for visitors who prefer reduced motion.
 *  - Skippable by tap/click anywhere or Esc. There is deliberately no visible Skip button.
 *  - Purely decorative: hidden from assistive tech (aria-hidden) with nothing focusable inside, so
 *    screen-reader and keyboard users are never held up. We also do NOT mark #root `inert`: toggling it
 *    on the whole mounted page cost ~60ms each way on a throttled phone (a long task each time).
 *  - It can never leave the page covered: a failsafe timer removes it whatever happens.
 *  - It is non-essential, so it can never take the site down: an error boundary swallows any failure.
 */

const SEEN_KEY = 'rnb-intro-seen'
const FAILSAFE_MS = intro.maxAssetWaitMs + 5000

/** "R&B Services Online" -> big wordmark "R&B" + small line "Services Online" */
const [mark, ...nameWords] = company.name.split(' ')
const subName = nameWords.join(' ')
const tagline = [company.tagline, ...company.countries].join(' · ')

/**
 * Resting pose of each app card in the fan - mirrors the Hero's static fan:
 * Driver behind-left, Seller behind-right, User in front. `delay` staggers their entrance.
 */
const fan: Record<string, { x: string; y: string; r: string; z: number; delay: string }> = {
  driver: { x: '-5.6em', y: '1.1em', r: '-9deg', z: 1, delay: '0.08s' },
  seller: { x: '5.6em', y: '1.1em', r: '9deg', z: 2, delay: '0.14s' },
  user: { x: '0em', y: '2em', r: '0deg', z: 3, delay: '0.2s' },
}

function shouldPlay(pathname: string, hash: string, search: string): boolean {
  if (!intro.enabled) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (new URLSearchParams(search).has('intro')) return true // ?intro replays it on demand
  if (pathname !== '/' || hash) return false // deep links go straight to their content
  if (intro.oncePerSession) {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return false
    } catch {
      // storage blocked (private mode etc.) - just play it
    }
  }
  return true
}

/** A broken splash must never blank the site: on any error it simply renders nothing (effect clean-up still runs). */
class IntroBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function IntroSplash() {
  return (
    <IntroBoundary>
      <IntroGate />
    </IntroBoundary>
  )
}

function IntroGate() {
  const { pathname, hash, search } = useLocation()
  // Decided once, on the very first render - navigating around later never re-triggers it
  const [active, setActive] = useState(() => shouldPlay(pathname, hash, search))
  const done = useCallback(() => setActive(false), [])
  return active ? <Splash onDone={done} /> : null
}

function Splash({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false) // logos + fonts are in -> start the timeline
  const [skipping, setSkipping] = useState(false)
  const skip = useCallback(() => setSkipping(true), [])

  // Hold the Hero's entrance animation (it is CSS-driven, see index.css) until the intro starts to
  // fade, so the headline rises INTO view as the splash lifts instead of finishing behind it.
  // Layout effect = set before the first paint.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-intro', 'playing')
    return () => document.documentElement.removeAttribute('data-intro')
  }, [])

  // While it is up: keep the page behind it still, allow Esc to skip, and guarantee clean-up.
  useEffect(() => {
    const el = rootRef.current
    const stopWheel = (e: Event) => {
      // mouse-wheel / trackpad must not scroll the page (or Lenis) behind the splash
      e.preventDefault()
      e.stopPropagation()
    }
    el?.addEventListener('wheel', stopWheel, { passive: false })

    // The root's only own animations are the exit fade (intro-exit) and the quick skip fade (intro-skip).
    // Native listeners, not React props: the ~17 child animations fire ~34 bubbling start/end events, and
    // React would run every one through its synthetic dispatch for nothing. We swallow them right here.
    const onAnimStart = (e: AnimationEvent) => {
      e.stopPropagation()
      // the fade has begun: let the Hero's entrance run underneath it
      if (e.target === el) document.documentElement.removeAttribute('data-intro')
    }
    const onAnimEnd = (e: AnimationEvent) => {
      e.stopPropagation()
      if (e.target === el) onDone()
    }
    el?.addEventListener('animationstart', onAnimStart)
    el?.addEventListener('animationend', onAnimEnd)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSkipping(true)
    }
    window.addEventListener('keydown', onKey)

    try {
      window.sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // storage blocked - fine
    }

    // Failsafe: whatever happens to the CSS timeline, never leave the page covered
    const failsafe = window.setTimeout(onDone, FAILSAFE_MS)

    return () => {
      el?.removeEventListener('wheel', stopWheel)
      el?.removeEventListener('animationstart', onAnimStart)
      el?.removeEventListener('animationend', onAnimEnd)
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(failsafe)
    }
  }, [onDone])

  // Start the timeline only once the logos are decoded and the fonts are loaded (capped), so the
  // wordmark never flashes in a fallback font and the cards never pop in half-loaded.
  useEffect(() => {
    let cancelled = false
    const logos = ['/brand/rnb-main.webp', ...apps.map((a) => a.logoSmall)].map((src) => {
      const img = new Image()
      img.src = src
      return typeof img.decode === 'function' ? img.decode() : Promise.resolve()
    })
    // (older browsers may not have document.fonts - then we simply don't wait for fonts)
    const fonts = [
      document.fonts?.load('600 1em "Playfair Display Variable"', mark),
      document.fonts?.load('italic 500 1em "Playfair Display Variable"', '&'),
      document.fonts?.load('700 1em "Plus Jakarta Sans Variable"', subName),
    ]
    let cap: number | undefined
    const timeout = new Promise<void>((resolve) => {
      cap = window.setTimeout(resolve, intro.maxAssetWaitMs)
    })
    void Promise.race([Promise.allSettled([...logos, ...fonts]), timeout]).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
      window.clearTimeout(cap)
    }
  }, [])

  return createPortal(
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn('intro-root', ready && 'is-playing', skipping && 'is-skipping')}
      onClick={skip}
    >
      <div className="intro-stack">
        <div className="intro-settle">
          {/* three apps fan in, then merge into the one R&B badge */}
          <div className="intro-stage">
            {apps.map((app) => {
              const p = fan[app.id]
              if (!p) return null // an app added to data/apps.ts later simply isn't part of the fan
              return (
                <img
                  key={app.id}
                  src={app.logoSmall}
                  alt=""
                  width={480}
                  height={416}
                  decoding="async"
                  className="intro-card"
                  style={{ '--x': p.x, '--y': p.y, '--r': p.r, zIndex: p.z, animationDelay: p.delay } as CSSProperties}
                />
              )
            })}
            <span className="intro-ring" />
            <span className="intro-badge">
              <img src="/brand/rnb-main.webp" alt="" width={640} height={640} decoding="async" />
            </span>
          </div>

          <p className="intro-wordmark">
            {[...mark].map((ch, i) => (
              <span key={i} className="intro-mask">
                <span className={cn('intro-letter', ch === '&' && 'intro-amp')} style={{ '--i': i } as CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
          </p>
          <p className="intro-name">{subName}</p>
          <div className="intro-bar">
            <span />
          </div>
          <p className="intro-tagline">{tagline}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
