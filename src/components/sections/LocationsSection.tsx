import { lazy, Suspense, useRef } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { useCountry } from '@/context/countryContext'
import { home } from '@/data/home'
import { getLocation } from '@/data/locations'
import { useOnceVisible } from '@/hooks/useOnceVisible'
import { hasGoogleMapsKey } from '@/lib/env'
import { mapsDirectionsUrl } from '@/lib/format'
import { Button } from '@/components/ui/Button'
import { CountryToggle } from '@/components/ui/CountryToggle'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MapFallback } from './MapFallback'

const MapView = lazy(() => import('./MapView'))

export function LocationsSection() {
  const { country } = useCountry()
  const loc = getLocation(country)
  const mapRef = useRef<HTMLDivElement>(null)
  const nearViewport = useOnceVisible(mapRef)
  const mapCopy = home.map

  return (
    <section id="locations" data-theme="paper" aria-labelledby="locations-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div id="locations-title">
            <SectionHeading eyebrow={mapCopy.eyebrow} title={mapCopy.title} subtitle={mapCopy.subtitle} />
          </div>
          <CountryToggle />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div
            ref={mapRef}
            className="relative h-[380px] overflow-hidden rounded-[32px] bg-white shadow-[0_30px_60px_-30px_rgba(11,15,26,0.35)] ring-1 ring-ink/[0.07] sm:h-[460px] lg:col-span-3 lg:h-[540px]"
          >
            {hasGoogleMapsKey && nearViewport ? (
              <Suspense fallback={<MapFallback loading />}>
                <MapView />
              </Suspense>
            ) : (
              <MapFallback loading={hasGoogleMapsKey} />
            )}
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <m.div
                key={loc.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col rounded-[32px] bg-ink p-8 text-white shadow-[0_30px_60px_-30px_rgba(11,15,26,0.6)] sm:p-10"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{loc.label}</p>
                <h3 className="mt-3 font-display text-4xl font-semibold leading-tight">
                  {loc.city}, {loc.country}
                </h3>

                <dl className="mt-8 space-y-5 text-[15px]">
                  <div className="flex gap-3">
                    <dt className="mt-0.5 text-sun"><MapPin size={18} aria-label="Address" /></dt>
                    <dd className="text-white/80">{loc.address}</dd>
                  </div>
                  {loc.phone && (
                    <div className="flex gap-3">
                      <dt className="mt-0.5 text-sun"><Phone size={18} aria-label="Phone" /></dt>
                      <dd>
                        <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-white/80 hover:text-white">
                          {loc.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <dt className="mt-0.5 text-sun"><Clock size={18} aria-label="Hours" /></dt>
                    <dd className="text-white/80">{loc.hours}</dd>
                  </div>
                </dl>

                {loc.isPlaceholder && (
                  <p className="mt-6 rounded-2xl bg-white/[0.08] px-4 py-3 text-sm text-white/70">{mapCopy.placeholderNote}</p>
                )}

                <div className="mt-auto pt-8">
                  <Button variant="sun" href={mapsDirectionsUrl(loc.lat, loc.lng)}>
                    <Navigation size={17} aria-hidden="true" />
                    {mapCopy.directions}
                  </Button>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
