import type { OfficeLocation } from './types'

/**
 * Office locations used by the "Where we operate" map, the contact page, the footer
 * and JSON-LD.
 *
 * TODO(client): replace the placeholder addresses, coordinates, phone numbers and
 * opening hours with the real ones, then set `isPlaceholder: false`.
 * Coordinates below are the city centres of Accra and Toronto.
 */
export const locations: OfficeLocation[] = [
  {
    id: 'ghana',
    country: 'Ghana',
    city: 'Accra',
    label: 'Ghana office',
    address: 'Accra, Ghana - exact street address to be confirmed',
    phone: '', // TODO(client)
    hours: 'Opening hours to be confirmed', // TODO(client) e.g. "Mon-Fri 9:00-17:00 GMT"
    lat: 5.6037,
    lng: -0.187,
    isPlaceholder: true,
  },
  {
    id: 'canada',
    country: 'Canada',
    city: 'Toronto',
    label: 'Canada office',
    address: 'Toronto, Ontario, Canada - exact street address to be confirmed',
    phone: '', // TODO(client)
    hours: 'Opening hours to be confirmed', // TODO(client) e.g. "Mon-Fri 9:00-17:00 ET"
    lat: 43.6532,
    lng: -79.3832,
    isPlaceholder: true,
  },
]

export const getLocation = (id: OfficeLocation['id']) => locations.find((l) => l.id === id)!
