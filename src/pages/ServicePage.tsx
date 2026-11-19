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
      <section className="relative isolate overflow-x-clip pb-8 pt-24 sm:pt-40 md:pb-16 lg:pb-24" aria-labelledby="service-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className={cn('absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl', accent.dot)} />
          <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-royal/10 blur-3xl" />
        </div>
        <div className="container-x grid items-center gap-6 md:gap-12 lg:grid-cols-2 lg:gap-16">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted md:mb-6">
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
            <span className={cn('mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl md:mb-5 md:h-14 md:w-14', accent.soft)}>
              <Icon name={service.icon} size={26} />
            </span>
            <h1 id="service-title" className="text-balance text-4xl font-semibold text-ink sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-xl md:mt-6">{service.summary}</p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:mt-9">
              <Button to={enquiryHref({ service: service.slug, country })} size="md" className="w-full sm:h-14 sm:w-auto sm:px-8 sm:text-base">
                {ui.service.enquireAbout}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to={{ pathname: path, hash: '#listings' }} variant="outline" size="md" className="w-full sm:h-14 sm:w-auto sm:px-8 sm:text-base">
                {ui.service.itemsTitle}
              </Button>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn('relative aspect-[16/10] overflow-hidden rounded-[28px] md:aspect-[5/4] md:rounded-[36px]', accent.glow)}
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
      <section className="pb-10 md:pb-16 lg:pb-24" aria-label="About this service">
        <div className="container-x grid gap-6 md:gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-4 text-base leading-relaxed text-ink/80 md:space-y-6 md:text-lg lg:col-span-3">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="space-y-3 md:space-y-5 lg:col-span-2">
            <div className="rounded-[24px] bg-ink p-5 text-white md:rounded-[28px] md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">{ui.service.feeTitle}</p>
              <p className="mt-2 font-display text-xl font-medium leading-snug md:mt-3 md:text-2xl">{service.feeNote}</p>
            </div>
            {service.notice && (
              <div role="note" className={cn('flex gap-3 rounded-[24px] p-5 md:rounded-[28px] md:p-6', accent.soft)}>
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
      <section className="pb-10 md:pb-16 lg:pb-24" aria-labelledby="how-service-title">
        <div className="container-x">
          <h2 id="how-service-title" className="text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
            {ui.service.howTitle}
          </h2>
          <ol className="mt-5 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-5">
            {service.steps.map((s, i) => (
              <m.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                // phones: number beside the text (a short checklist feel); desktop: stacked cards
                className="flex gap-4 rounded-[22px] bg-white p-4 ring-1 ring-ink/[0.07] shadow-[0_24px_48px_-28px_rgba(11,15,26,0.3)] md:block md:rounded-[28px] md:p-7"
              >
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold md:h-11 md:w-11 md:text-base', accent.solid)}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold tracking-normal text-ink md:mt-5 md:text-xl">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted md:mt-2 md:text-[15px]">{s.text}</p>
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Sub-services (Rides & Parcels) ---------- */}
      {service.subServices && (
        <section className="pb-10 md:pb-16 lg:pb-24" aria-labelledby="sub-title">
          <div className="container-x">
            <h2 id="sub-title" className="text-3xl font-semibold text-ink sm:text-4xl md:text-5xl">
              {ui.service.subServicesTitle}
            </h2>
            <ul className="mt-5 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-5">
              {service.subServices.map((s) => (
                <li key={s.name} className="flex gap-4 rounded-[22px] bg-taxi-soft p-4 md:block md:rounded-[28px] md:p-7">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-taxi text-ink md:h-12 md:w-12 md:rounded-2xl">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink md:mt-5 md:text-2xl">{s.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70 md:mt-2 md:text-[15px]">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Items ---------- */}
      <section id="listings" className="scroll-mt-24 pb-12 md:pb-20 lg:pb-28" aria-labelledby="items-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
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
          {/* phones: one compact row per listing (see ItemCard) so all six can be compared at a glance */}
          <ul className="mt-6 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.id}>
                <ItemCard service={service} item={item} country={country} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className="bg-ink py-12 text-white md:py-20 lg:py-28" aria-labelledby="related-title">
        <div className="on-dark container-x">
          <h2 id="related-title" className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {ui.service.related}
          </h2>
          <ul className="mt-5 grid gap-2.5 md:mt-10 md:grid-cols-3 md:gap-5">
            {related.map((s) => (
              <li key={s.slug}>
                {/* phones: a slim tappable row (icon, name, arrow); desktop: the full card */}
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:bg-white/[0.1] md:flex-col md:items-stretch md:gap-0 md:rounded-[28px] md:p-7"
                >
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12 md:rounded-2xl', accentStyles[s.accent].solid)}>
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h3 className="flex-1 font-display text-lg font-semibold text-white md:mt-5 md:flex-none md:text-2xl">{s.title}</h3>
                  <p className="mt-2 hidden text-[15px] leading-relaxed text-white/70 md:block">{s.summary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sun md:mt-auto md:pt-5">
                    <span className="max-md:sr-only">{ui.service.explore}</span>
                    <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
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
