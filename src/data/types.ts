import type { CountryCode, ServiceSlug } from '../../shared/constants'

export type { CountryCode, ServiceSlug }

export type Accent = 'blue' | 'orange' | 'amber' | 'green'

/** Keys map to lucide icons in src/components/ui/Icon.tsx */
export type IconName =
  | 'hardhat'
  | 'briefcase'
  | 'heart-pulse'
  | 'hammer'
  | 'party'
  | 'building'
  | 'wrench'
  | 'utensils'
  | 'car'
  | 'key'
  | 'taxi'
  | 'basket'
  | 'user'
  | 'cart'
  | 'parcel'
  | 'map-pin'
  | 'shield'
  | 'coins'
  | 'zap'
  | 'handshake'

/** A price + city for ONE country. Price is in that country's currency. */
export interface Offer {
  price: number
  /** e.g. "per 50kg bag", "per night", "per month" */
  unit?: string
  city: string
}

export interface ServiceItem {
  /** Also the image file name: /images/<slug>/<id>.webp */
  id: string
  title: string
  description: string
  tag: string
  offers: Partial<Record<CountryCode, Offer>>
  /** Short factual chips: beds/baths, year/mileage, lease term... */
  details?: string[]
  /** Generic, non-personal vendor descriptor for food/sample vendors */
  vendor?: string
}

export interface HowStep {
  title: string
  text: string
}

export interface Service {
  slug: ServiceSlug
  title: string
  /** Short label for nav + chips */
  shortTitle: string
  /** One line for overview cards */
  summary: string
  accent: Accent
  icon: IconName
  /** CSS object-position for this service's photo, so crops keep the subject (e.g. '25% 40%') */
  imageFocus?: string
  intro: [string, string]
  steps: [HowStep, HowStep, HowStep]
  feeNote: string
  /** Optional safety/disclaimer callout shown on the page */
  notice?: { title: string; text: string }
  /** Sub-brands (Rides & Parcels) */
  subServices?: { name: string; description: string; icon: IconName }[]
  /** Which app logo to feature on this service page */
  featuredApp?: 'driver' | 'seller' | 'user'
  items: ServiceItem[]
}

export interface AppInfo {
  id: 'user' | 'seller' | 'driver'
  name: string
  audience: string
  description: string
  logo: string
  logoSmall: string
  accent: Accent
  /** Store links - leave empty until the apps are published ("Coming soon") */
  stores: { ios: string; android: string }
  screenTitle: string
  screenLines: string[]
}

export interface OfficeLocation {
  id: CountryCode
  country: string
  city: string
  label: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
  /** True until the client supplies the real details */
  isPlaceholder: boolean
}

export interface FaqItem {
  q: string
  a: string
}
