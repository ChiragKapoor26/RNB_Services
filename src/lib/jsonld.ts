import { company } from '@/data/company'
import { locations } from '@/data/locations'

const countryCode = { ghana: 'GH', canada: 'CA' } as const

/** Organization + WebSite + one LocalBusiness per country office. */
export function homeJsonLd() {
  const socials = Object.values(company.social).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${company.url}/#org`,
        name: company.name,
        url: company.url,
        logo: `${company.url}/brand/rnb-main.png`,
        description: company.description,
        slogan: company.tagline,
        areaServed: ['GH', 'CA'],
        ...(socials.length ? { sameAs: socials } : {}),
        ...(company.contact.email ? { email: company.contact.email } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${company.url}/#website`,
        url: company.url,
        name: company.name,
        publisher: { '@id': `${company.url}/#org` },
      },
      ...locations.map((l) => ({
        '@type': 'LocalBusiness',
        '@id': `${company.url}/#${l.id}`,
        name: `${company.shortName} - ${l.city}`,
        url: company.url,
        image: `${company.url}/brand/rnb-main.png`,
        parentOrganization: { '@id': `${company.url}/#org` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: l.city,
          addressCountry: countryCode[l.id],
        },
        // only publish coordinates / phone once the client has confirmed real details
        ...(l.isPlaceholder ? {} : { geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng } }),
        ...(l.phone ? { telephone: l.phone } : {}),
      })),
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${company.url}${it.path === '/' ? '' : it.path}`,
    })),
  }
}
