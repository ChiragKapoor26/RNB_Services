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

/** One of the six sample items on a service page, rendered as a 3D tilt card. */
export function ItemCard({ service, item, country, index }: Props) {
  const { offer, country: offerCountry, isFallback } = resolveOffer(item, country)
  const accent = accentStyles[service.accent]

  return (
    <TiltCard3D index={index}>
      <article
        className={cn(
          'relative flex h-full flex-col rounded-[28px] bg-white p-4 ring-1 ring-ink/[0.07]',
          'shadow-[0_2px_4px_rgba(11,15,26,0.04),0_24px_48px_-24px_rgba(11,15,26,0.28)]',
          '[transform-style:preserve-3d]',
        )}
      >
        {/* depth layer 1: the image floats above the card */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_26px_40px_-20px_rgba(11,15,26,0.5)] [transform:translateZ(38px)]">
          <SmartImage
            slug={service.slug}
            name={item.id}
            alt={`${item.title} - illustrative image`}
            accent={service.accent}
            icon={service.icon}
            width={640}
            height={480}
          />
          <span
            className={cn(
              'absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur',
              'bg-white/90 text-ink',
            )}
          >
            {item.tag}
          </span>
        </div>

        {/* depth layer 2: text */}
        <div className="mt-5 flex flex-1 flex-col px-1 [transform:translateZ(22px)]">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
              {ui.service.sample}
            </span>
            {isFallback && (
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-bold', accent.soft)}>
                {ui.service.onlyIn} {countryMeta[offerCountry].label}
              </span>
            )}
          </div>

          <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.description}</p>

          {(item.details?.length || item.vendor) && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {item.vendor && (
                <li className="rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/70">{item.vendor}</li>
              )}
              {item.details?.map((d) => (
                <li key={d} className="rounded-full border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/70">
                  {d}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <div>
              <p className="text-xs font-semibold text-muted">
                {ui.service.from}
              </p>
              <p className="font-display text-2xl font-semibold leading-none text-ink">
                {formatPrice(offer.price, offerCountry)}
              </p>
              {offer.unit && <p className="mt-1 text-xs text-muted">{offer.unit}</p>}
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-ink/70">
                <MapPin size={13} aria-hidden="true" />
                {offer.city}
              </p>
            </div>
            <Link
              to={enquiryHref({ service: service.slug, item: item.title, country: offerCountry })}
              aria-label={`${ui.service.enquire}: ${item.title}`}
              className={cn(
                'group inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-semibold',
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
