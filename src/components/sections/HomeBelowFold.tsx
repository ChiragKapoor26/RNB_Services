import { useEffect } from 'react'
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
 */
export default function HomeBelowFold({ onMount }: { onMount: () => void }) {
  useEffect(() => {
    onMount()
    // pinned sections just appeared - re-measure once layout has settled
    const id = window.setTimeout(() => refreshScrollTriggers(), 400)
    return () => window.clearTimeout(id)
  }, [onMount])

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
