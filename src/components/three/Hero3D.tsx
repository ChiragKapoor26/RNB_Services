import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { hasWebGL, isLowPowerDevice } from '@/lib/device'
import { usePrefersReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'
import { HeroFallback } from './HeroFallback'

// three.js + react-three-fiber live in their own chunk and only load when needed
const HeroScene = lazy(() => import('./HeroScene'))

/**
 * Progressive 3D hero.
 *  1. The static hero art (real logo + service badges) paints immediately - it is the LCP element.
 *  2. After the page has loaded and the browser had a moment, the three.js chunk is fetched.
 *  3. Once the first 3D frame is on screen the scene crossfades in over the static art.
 * No 3D at all for: reduced motion, low-power / data-saver devices, or browsers without WebGL.
 */
export function Hero3D() {
  const reduce = usePrefersReducedMotion()
  const [capable] = useState(() => hasWebGL() && !isLowPowerDevice())
  const enabled = capable && !reduce
  const [load3d, setLoad3d] = useState(false)
  const [live, setLive] = useState(false)
  const onReady = useCallback(() => setLive(true), [])

  useEffect(() => {
    if (!enabled) return
    let timer: number | undefined
    const schedule = () => {
      timer = window.setTimeout(() => setLoad3d(true), 700)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', schedule)
    }
  }, [enabled])

  return (
    <>
      <div className={cn('absolute inset-0 transition-opacity duration-700', live && 'pointer-events-none opacity-0')}>
        <HeroFallback />
      </div>
      {enabled && load3d && (
        <Suspense fallback={null}>
          <div className={cn('absolute inset-0 transition-opacity duration-700', live ? 'opacity-100' : 'opacity-0')}>
            <HeroScene onReady={onReady} />
          </div>
        </Suspense>
      )}
    </>
  )
}
