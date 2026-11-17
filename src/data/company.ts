import type { CountryCode } from './types'

/**
 * Company facts. Single source of truth for the site AND the RNB Bot's system prompt
 * (server/src/rnbBotPrompt.ts imports this file) - keep it free of Vite-only imports.
 *
 * TODO(client): fill in the empty contact fields below. Empty values are hidden in the UI.
 */
export const company = {
  name: 'R&B Services Online',
  shortName: 'R&B Services',
  domain: 'rnbservices.online',
  url: 'https://rnbservices.online',
  tagline: 'All in one app',
  description:
    'R&B Services connects everyday people in Ghana and Canada with trusted local providers - supplies, professionals, repairs, food, cars, rentals and rides - for one small, transparent connection fee.',

  /** How R&B makes money - used on the site, in FAQ and by the bot */
  feeConcept:
    "R&B is a connector, not the provider. You pay a small, transparent connection fee when you book; the provider's own price is agreed directly with you.",

  countries: ['Ghana', 'Canada'] as const,
  cities: {
    ghana: ['Accra', 'Kumasi', 'Takoradi'],
    canada: ['Toronto', 'Ottawa', 'Calgary'],
  } satisfies Record<CountryCode, string[]>,

  // TODO(client): supply real contact details
  contact: {
    email: '', // e.g. hello@rnbservices.online
    phone: '', // e.g. +233 ...
    whatsapp: '', // international format, digits only, e.g. 233200000000
  },

  social: {
    facebook: '',
    instagram: '',
    x: '',
    linkedin: '',
  },
} as const

export const countryMeta: Record<
  CountryCode,
  { label: string; currencySymbol: string; currencyCode: string; adjective: string }
> = {
  ghana: { label: 'Ghana', currencySymbol: 'GH₵', currencyCode: 'GHS', adjective: 'Ghanaian' },
  canada: { label: 'Canada', currencySymbol: 'CA$', currencyCode: 'CAD', adjective: 'Canadian' },
}
