/**
 * Constants shared by the React app, the data files and the Express server.
 * Keep this file dependency-free (no Vite-only imports).
 */

export const SERVICE_SLUGS = [
  'building-supplies',
  'professional-services',
  'health-wellness',
  'artisan-carpenter',
  'events',
  'property-booking',
  'fixit-now',
  'good-to-eat',
  'buy-any-car',
  'rent-and-lease',
  'rides-and-parcels',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const COUNTRY_CODES = ['ghana', 'canada'] as const
export type CountryCode = (typeof COUNTRY_CODES)[number]

export const CHAT_MAX_CHARS = 500
export const CHAT_MAX_MESSAGES = 20
