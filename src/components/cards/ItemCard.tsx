import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { countryMeta } from '@/data/company'
import { ui } from '@/data/nav'
import type { CountryCode, Service, ServiceItem } from '@/data/types'
import { accentStyles } from '@/lib/accent'
import { cn } from '@/lib/cn'
import { enquiryHref, formatPrice, resolveOffer } from '@/lib/format'
import { SmartImage } from '@/components/ui/SmartImage'
import { TiltCard3D } from './TiltCard3D'

interface Props {
  service: Service
  item: ServiceItem
  country: CountryCode
  index: number
}

/**
 * One of the six sample items on a service page.
 *  - Desktop: a 3D tilt card (photo on top, details below).
 *  - Phones: a compact row - thumbnail beside the name, then description, facts and a price / Enquire
 *    footer - so six listings take ~1.5 screens instead of ~4 and can be compared at a glance.
 * The text wrapper uses `display: contents` on phones so its children join the card's grid.
 */
export function ItemCard({ service, item, country, index }: Props) {
  const { offer, country: offerCountry, isFallback } = resolveOffer(item, country)
  const accent = accentStyles[service.accent]
  const facts = [item.vendor, ...(item.details ?? [])].filter((f): f is string => Boolean(f))

  return (
    <TiltCard3D index={index} radiusClass="rounded-[22px] md:rounded-[28px]">
      <article
        className={cn(
          'relative grid h-full grid-cols-[5.5rem_1fr] content-start gap-x-3 gap-y-2.5 rounded-[22px] bg-white p-3 ring-1 ring-ink/[0.07]',
          'md:flex md:flex-col md:gap-0 md:rounded-[28px] md:p-4',
          'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_24px_48px_-24px_rgba(11,15,26,0.28)]',
          '[transform-style:preserve-3d]',
        )}
      >
        {/* depth layer 1: the image floats above the card */}
        <div className="relative aspect-square overflow-hidden rounded-xl shadow-[0_26px_40px_-20px_rgba(11,15,26,0.5)] [transform:translateZ(38px)] md:aspect-[4/3] md:rounded-2xl">
          <SmartImage
            slug={service.slug}
            name={item.id}
            alt={`${item.title} - illustrative image`}
            accent={service.accent}
            icon={service.icon}
            width={640}
            height={480}
            focus={item.imageFocus}
          />
          <span className="absolute left-3 top-3 hidden rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur md:block">
            {item.tag}
          </span>
        </div>

        {/* depth layer 2: text */}
        <div className="contents md:mt-5 md:flex md:flex-1 md:flex-col md:px-1 md:[transform:translateZ(22px)]">
          {/* chips + title form ONE grid cell beside the thumbnail on phones (no stretched gaps); the
              wrapper disappears on desktop so they stay separate children of the text column */}
          <div className="flex min-w-0 flex-col gap-1.5 md:contents">
            <div className="flex flex-wrap content-start items-center gap-1.5 md:mb-2.5 md:gap-2">
              <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted md:px-2.5 md:py-1">
                {ui.service.sample}
              </span>
              {/* the tag sits on the photo on desktop; on phones the photo is a thumbnail, so it joins the chips */}
              <span className="rounded-full border border-ink/10 px-2 py-0.5 text-[11px] font-bold text-ink/70 md:hidden">{item.tag}</span>
              {isFallback && (
                <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold md:px-2.5 md:py-1', accent.soft)}>
                  {ui.service.onlyIn} {countryMeta[offerCountry].label}
                </span>
              )}
            </div>

            <h3 className="font-display text-base font-semibold leading-snug text-ink md:text-[22px] md:leading-tight">{item.title}</h3>
          </div>
          <p className="col-span-2 line-clamp-2 text-[13px] leading-snug text-muted md:mt-2 md:line-clamp-none md:text-[15px] md:leading-relaxed">
            {item.description}
          </p>

          {facts.length > 0 && (
            <ul className="col-span-2 flex flex-wrap gap-1.5 md:mt-4">
              {facts.map((fact, i) => (
                <li
                  key={fact}
                  // phones show the first two facts only; the rest stay available from desktop up
                  className={cn('rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/70', i >= 2 && 'max-md:hidden')}
                >
                  {fact}
                </li>
              ))}
            </ul>
          )}

          <div className="col-span-2 flex items-end justify-between gap-3 md:mt-auto md:pt-6">
            <div>
              <p className="text-[11px] font-semibold text-muted md:text-xs">{ui.service.from}</p>
              <p className="font-display text-xl font-semibold leading-none text-ink md:text-2xl">
                {formatPrice(offer.price, offerCountry)}
              </p>
              {/* phones: unit and city share one line (saves a row per card); desktop: stacked as before */}
              <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 md:mt-0 md:block">
                {offer.unit && <p className="text-[11px] text-muted md:mt-1 md:text-xs">{offer.unit}</p>}
                <p className="flex items-center gap-1 text-[11px] font-medium text-ink/70 md:mt-2 md:text-xs">
                  <MapPin size={13} aria-hidden="true" />
                  {offer.city}
                </p>
              </div>
            </div>
            <Link
              to={enquiryHref({ service: service.slug, item: item.title, country: offerCountry })}
              aria-label={`${ui.service.enquire}: ${item.title}`}
              className={cn(
                'group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold md:h-11 md:px-5 md:text-sm',
                'bg-ink text-white transition-colors duration-300 hover:bg-royal',
              )}
            >
              {ui.service.enquire}
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </article>
    </TiltCard3D>
  )
}
