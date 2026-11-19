import { lazy, Suspense, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { m } from 'framer-motion'
import { Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { company } from '@/data/company'
import { contactCopy } from '@/data/contact'
import { locations } from '@/data/locations'
import { home } from '@/data/home'
import { useChatUi } from '@/context/chatContext'
import { useOnceVisible } from '@/hooks/useOnceVisible'
import { hasGoogleMapsKey } from '@/lib/env'
import { mapsDirectionsUrl } from '@/lib/format'
import { EnquiryForm } from '@/components/sections/EnquiryForm'
import { MapFallback } from '@/components/sections/MapFallback'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/Button'

const MapView = lazy(() => import('@/components/sections/MapView'))

export default function Contact() {
  const [params] = useSearchParams()
  const { openChat } = useChatUi()
  const mapRef = useRef<HTMLDivElement>(null)
  const nearViewport = useOnceVisible(mapRef)
  const c = contactCopy
  const wa = company.contact.whatsapp.replace(/\D/g, '')

  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} path="/contact" />
      <section className="relative isolate overflow-x-clip pb-14 pt-24 sm:pt-40 md:pb-24" aria-labelledby="contact-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-20 h-[460px] w-[460px] rounded-full bg-royal/10 blur-3xl" />
          <div className="absolute -left-40 bottom-10 h-[420px] w-[420px] rounded-full bg-sun/20 blur-3xl" />
        </div>
        <div className="container-x">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-royal">{c.eyebrow}</p>
            <h1 id="contact-title" className="text-balance text-4xl font-semibold text-ink sm:text-6xl lg:text-7xl">
              {c.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-xl md:mt-6">{c.subtitle}</p>
          </m.div>

          <div className="mt-8 grid gap-6 md:mt-14 md:gap-8 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              {/* remount when the pre-fill (service / item / country) changes */}
              <EnquiryForm key={params.toString()} />
            </div>

            <aside className="space-y-4 md:space-y-6 lg:col-span-2" aria-label="Offices and contact">
              <div
                ref={mapRef}
                className="relative h-[250px] overflow-hidden rounded-[24px] bg-white shadow-[0_30px_60px_-30px_rgba(11,15,26,0.35)] ring-1 ring-ink/[0.07] sm:h-[360px] md:rounded-[32px]"
              >
                {hasGoogleMapsKey && nearViewport ? (
                  <Suspense fallback={<MapFallback loading />}>
                    <MapView />
                  </Suspense>
                ) : (
                  <MapFallback loading={hasGoogleMapsKey} />
                )}
              </div>

              <div className="rounded-[24px] bg-ink p-5 text-white md:rounded-[32px] md:p-8">
                <h2 className="font-display text-2xl font-semibold text-white">{c.side.title}</h2>
                <ul className="mt-5 space-y-5 md:mt-6 md:space-y-7">
                  {locations.map((l) => (
                    <li key={l.id}>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{l.label}</p>
                      <p className="mt-1 text-lg font-semibold">{l.city}, {l.country}</p>
                      <p className="mt-2 flex gap-2 text-[15px] text-white/75">
                        <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
                        {l.address}
                      </p>
                      {l.phone && (
                        <p className="mt-1.5 flex gap-2 text-[15px] text-white/75">
                          <Phone size={16} className="mt-1 shrink-0" aria-hidden="true" />
                          <a href={`tel:${l.phone.replace(/\s/g, '')}`} className="hover:text-white">{l.phone}</a>
                        </p>
                      )}
                      <p className="mt-1.5 text-[15px] text-white/60">{l.hours}</p>
                      <a
                        href={mapsDirectionsUrl(l.lat, l.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sun hover:text-white"
                      >
                        <Navigation size={14} aria-hidden="true" />
                        {home.map.directions}
                      </a>
                    </li>
                  ))}
                </ul>

                {(company.contact.email || wa) && (
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-5 text-[15px] md:mt-8 md:pt-6">
                    {company.contact.email && (
                      <li className="flex gap-2 text-white/80">
                        <Mail size={16} className="mt-1 shrink-0" aria-hidden="true" />
                        <a href={`mailto:${company.contact.email}`} className="hover:text-white">{company.contact.email}</a>
                      </li>
                    )}
                    {wa && (
                      <li className="flex gap-2 text-white/80">
                        <MessageCircle size={16} className="mt-1 shrink-0" aria-hidden="true" />
                        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                          {c.side.whatsappLabel}
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="rounded-[24px] bg-royal-soft p-5 md:rounded-[32px] md:p-7">
                <p className="text-[15px] leading-relaxed text-royal-deep">{c.side.note}</p>
                <Button variant="dark" size="sm" onClick={openChat} className="mt-4">
                  <MessageCircle size={16} aria-hidden="true" />
                  {home.hero.secondaryCta}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
