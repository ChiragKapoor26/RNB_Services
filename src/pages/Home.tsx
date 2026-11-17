import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '@/data/company'
import { homeJsonLd } from '@/lib/jsonld'
import { Seo } from '@/components/layout/Seo'
import { ThemeRoot } from '@/components/sections/ThemeRoot'
import { Hero } from '@/components/sections/Hero'

// Everything below the hero is code-split and mounted right after first paint
const HomeBelowFold = lazy(() => import('@/components/sections/HomeBelowFold'))

/** Keeps the footer below the fold (no layout shift) while the lower sections load. */
const BelowFoldPlaceholder = () => <div aria-hidden="true" className="min-h-[100svh]" />

export default function Home() {
  const { hash } = useLocation()
  const [idleReady, setIdleReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  // a deep link like /#faq needs the lower sections straight away
  const showBelowFold = idleReady || Boolean(hash)
  const onMount = useCallback(() => setMounted(true), [])

  useEffect(() => {
    const start = () => setIdleReady(true)
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(start, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 400)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <>
      <Seo description={company.description} path="/" jsonLd={homeJsonLd()} />
      <ThemeRoot version={mounted ? 1 : 0}>
        <Hero />
        {showBelowFold ? (
          <Suspense fallback={<BelowFoldPlaceholder />}>
            <HomeBelowFold onMount={onMount} />
          </Suspense>
        ) : (
          <BelowFoldPlaceholder />
        )}
      </ThemeRoot>
    </>
  )
}
