import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/useMedia'
import { refreshScrollTriggers } from '@/lib/loadGsap'
import { HowItWorks } from './HowItWorks'
import { ServicesGrid } from './ServicesGrid'
import { SpotlightCarousel } from './SpotlightCarousel'
import { PhoneShowcase } from './PhoneShowcase'
import { AppsSection } from './AppsSection'
import { LocationsSection } from './LocationsSection'
import { WhySection } from './WhySection'
import { FaqSection } from './FaqSection'
import { CtaSection } from './CtaSection'

/**
 * Everything on Home below the first two screens. It is code-split and mounted right after first
 * paint (see pages/Home.tsx) so the above-the-fold content renders without waiting for it.
 *
 * Phones get a shorter, task-first page (the whole page used to be ~25 screens long):
 *  - Services come straight after the hero - choosing a service is the main job of the page.
 *  - The pinned 3D phone ring and the sliding spotlight are not rendered: they repeat the Apps and
 *    Services sections and the pinned ring alone added ~2.5 screens of scroll-jacking.
 *  - Lower-priority blocks (apps are "coming soon") sit below the trust content, and dark/light
 *    sections alternate so the page still has a rhythm.
 * Desktop keeps the full storytelling order.
 */
export default function HomeBelowFold({ onMount }: { onMount: () => void }) {
  const mobile = useIsMobile()

  useEffect(() => {
    onMount()
    // pinned sections just appeared - re-measure once layout has settled
    const id = window.setTimeout(() => refreshScrollTriggers(), 400)
    return () => window.clearTimeout(id)
  }, [onMount])

  if (mobile) {
    return (
      <>
        <ServicesGrid />
        <HowItWorks />
        <LocationsSection />
        <WhySection />
        <AppsSection />
        <FaqSection />
        <CtaSection />
      </>
    )
  }

  return (
    <>
      <HowItWorks />
      <ServicesGrid />
      <SpotlightCarousel />
      <PhoneShowcase />
      <AppsSection />
      <LocationsSection />
      <WhySection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
