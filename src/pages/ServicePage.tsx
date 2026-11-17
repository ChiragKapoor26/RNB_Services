import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { apps } from '@/data/apps'
import { company, countryMeta } from '@/data/company'
import { ui } from '@/data/nav'
import { getService, services } from '@/data/services'
import { useCountry } from '@/context/countryContext'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { enquiryHref, sortItemsForCountry } from '@/lib/format'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { ItemCard } from '@/components/cards/ItemCard'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/Button'
import { CountryToggle } from '@/components/ui/CountryToggle'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SmartImage } from '@/components/ui/SmartImage'
import NotFound from './NotFound'

export default function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug ?? '')
  const { country } = useCountry()

  const items = useMemo(() => (service ? sortItemsForCountry(service.items, country) : []), [service, country])

  if (!service) return <NotFound />

  const accent = accentStyles[service.accent]
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)
  const driverApp = service.featuredApp ? apps.find((a) => a.id === service.featuredApp) : undefined
  const path = `/services/${service.slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.summary,
      provider: { '@type': 'Organization', name: company.name, url: company.url },
      areaServed: ['GH', 'CA'],
      url: `${company.url}${path}`,
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: service.title, path },
    ]),
  ]

  return (
    <>
      <Seo title={service.title} description={`${service.summary} ${service.intro[0]}`.slice(0, 300)} path={path} jsonLd={jsonLd} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-x-clip pb-16 pt-32 sm:pt-40 lg:pb-24" aria-labelledby="service-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className={cn('absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl', accent.dot)} />
          <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-royal/10 blur-3xl" />
        </div>
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-ink">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={{ pathname: '/', hash: '#services' }} className="hover:text-ink">{ui.servicesMenu}</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-ink">{service.shortTitle}</li>
              </ol>
            </nav>
            <span className={cn('mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl', accent.soft)}>
              <Icon name={service.icon} size={28} />
            </span>
            <h1 id="service-title" className="text-balance text-5xl font-semibold text-ink sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{service.summary}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to={enquiryHref({ service: service.slug, country })} size="lg">
                {ui.service.enquireAbout}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to={{ pathname: path, hash: '#listings' }} variant="outline" size="lg">
                {ui.service.itemsTitle}
              </Button>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn('relative aspect-[5/4] overflow-hidden rounded-[36px]', accent.glow)}
          >
            <SmartImage
              slug={service.slug}
              alt={`${service.title} - illustrative image`}
              accent={service.accent}
              icon={service.icon}
              width={1000}
              height={800}
              priority
              focus={service.imageFocus}
            />
            {driverApp && (
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-xl backdrop-blur">
                <img src={driverApp.logoSmall} alt={`${driverApp.name} logo`} width={64} height={56} className="h-14 w-16 rounded-xl object-cover" />
                <span className="text-sm font-semibold text-ink">{ui.service.featuredApp}</span>
              </div>
            )}
          </m.div>
        </div>
      </section>

      {/* ---------- Intro + fee ---------- */}
      <section className="pb-16 lg:pb-24" aria-label="About this service">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-3">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="space-y-5 lg:col-span-2">
            <div className="rounded-[28px] bg-ink p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{ui.service.feeTitle}</p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug">{service.feeNote}</p>
            </div>
            {service.notice && (
              <div role="note" className={cn('flex gap-3 rounded-[28px] p-6', accent.soft)}>
                <Info size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-bold">{service.notice.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed">{service.notice.text}</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="pb-16 lg:pb-24" aria-labelledby="how-service-title">
        <div className="container-x">
          <h2 id="how-service-title" className="text-4xl font-semibold text-ink sm:text-5xl">
            {ui.service.howTitle}
          </h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {service.steps.map((s, i) => (
              <m.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.07] shadow-[0_24px_48px_-28px_rgba(11,15,26,0.3)]"
              >
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-full text-base font-bold', accent.solid)}>
                  {i + 1}
                </span>
                <h3 className="mt-5 font-sans text-xl font-bold tracking-normal text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Sub-services (Rides & Parcels) ---------- */}
      {service.subServices && (
        <section className="pb-16 lg:pb-24" aria-labelledby="sub-title">
          <div className="container-x">
            <h2 id="sub-title" className="text-4xl font-semibold text-ink sm:text-5xl">
              {ui.service.subServicesTitle}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {service.subServices.map((s) => (
                <li key={s.name} className="rounded-[28px] bg-taxi-soft p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-taxi text-ink">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Items ---------- */}
      <section id="listings" className="scroll-mt-24 pb-20 lg:pb-28" aria-labelledby="items-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div id="items-title">
              <SectionHeading title={ui.service.itemsTitle} subtitle={ui.service.itemsSubtitle} />
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <CountryToggle />
              <p className="text-xs text-muted">
                Prices shown in {countryMeta[country].currencySymbol} where available
              </p>
            </div>
          </div>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.id}>
                <ItemCard service={service} item={item} country={country} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className="bg-ink py-20 text-white lg:py-28" aria-labelledby="related-title">
        <div className="on-dark container-x">
          <h2 id="related-title" className="text-4xl font-semibold text-white sm:text-5xl">
            {ui.service.related}
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.05] p-7 transition-colors duration-300 hover:bg-white/[0.1]"
                >
                  <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', accentStyles[s.accent].solid)}>
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-sun">
                    {ui.service.explore}
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
