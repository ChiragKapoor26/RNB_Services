import { lazy, Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { ui } from '@/data/nav'
import { getLenis, scrollToHash, scrollToTop } from '@/lib/lenis'
import { refreshScrollTriggers } from '@/lib/loadGsap'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileEnquireButton } from './MobileEnquireButton'
import { PageFallback } from './PageFallback'

// The landing page ships with the entry bundle (no extra round trip before first paint);
// every other route is lazy-loaded so the first load stays light
import Home from '@/pages/Home'
const ServicePage = lazy(() => import('@/pages/ServicePage'))
const Contact = lazy(() => import('@/pages/Contact'))
const About = lazy(() => import('@/pages/About'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))
// The chat widget is small but not needed for first paint
const ChatWidget = lazy(() => import('@/components/chat/ChatWidget'))

export default function Layout() {
  const location = useLocation()
  const firstRender = useRef(true)
  const prevPath = useRef(location.pathname)

  // Same-page navigation: hash links scroll to their section, "home" scrolls to top.
  // (Route changes are handled in onExitComplete below, after the old page fades out.)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (location.hash) scrollToHash(location.hash)
      return
    }
    if (prevPath.current === location.pathname) {
      if (location.hash) scrollToHash(location.hash)
      else {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(0, { duration: 1.1 })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    prevPath.current = location.pathname
  }, [location.key, location.pathname, location.hash])

  // New page mounted: re-measure pinned sections once layout has settled
  useEffect(() => {
    const id = window.setTimeout(() => refreshScrollTriggers(), 350)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  const handleExitComplete = () => {
    scrollToTop()
    if (location.hash) scrollToHash(location.hash)
  }

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        {ui.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="min-h-[100svh] outline-none">
        <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
          <m.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Suspense fallback={<PageFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<LegalPage doc="privacy" />} />
                <Route path="/terms" element={<LegalPage doc="terms" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileEnquireButton />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </>
  )
}
