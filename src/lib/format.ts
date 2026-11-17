import { countryMeta } from '@/data/company'
import type { CountryCode, Offer, ServiceItem } from '@/data/types'

/** Non-breaking space keeps the symbol and amount on one line */
const NBSP = String.fromCharCode(160)

export function formatPrice(price: number, country: CountryCode): string {
  const { currencySymbol } = countryMeta[country]
  const hasDecimals = !Number.isInteger(price)
  const n = price.toLocaleString('en-US', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })
  return `${currencySymbol}${NBSP}${n}`
}

export interface ResolvedOffer {
  country: CountryCode
  offer: Offer
  /** true when the item is not offered in the selected country */
  isFallback: boolean
}

/** Pick the offer for the selected country, or fall back to the country it IS available in. */
export function resolveOffer(item: ServiceItem, selected: CountryCode): ResolvedOffer {
  const own = item.offers[selected]
  if (own) return { country: selected, offer: own, isFallback: false }
  const other: CountryCode = selected === 'ghana' ? 'canada' : 'ghana'
  return { country: other, offer: item.offers[other]!, isFallback: true }
}

/** Sort so items available in the selected country come first (stable otherwise). */
export function sortItemsForCountry(items: ServiceItem[], selected: CountryCode): ServiceItem[] {
  return items
    .map((item, i) => ({ item, i, rank: item.offers[selected] ? 0 : 1 }))
    .sort((a, b) => a.rank - b.rank || a.i - b.i)
    .map((x) => x.item)
}

export function enquiryHref(opts: { service?: string; item?: string; country?: CountryCode }): string {
  const params = new URLSearchParams()
  if (opts.service) params.set('service', opts.service)
  if (opts.item) params.set('item', opts.item)
  if (opts.country) params.set('country', opts.country)
  const qs = params.toString()
  return qs ? `/contact?${qs}` : '/contact'
}

export function mapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
