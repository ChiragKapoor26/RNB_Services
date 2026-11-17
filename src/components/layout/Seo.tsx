import { Helmet } from 'react-helmet-async'
import { company } from '@/data/company'

interface Props {
  title?: string
  description: string
  /** Route path, e.g. "/services/events" - used for canonical + og:url */
  path?: string
  image?: string
  noindex?: boolean
  jsonLd?: object | object[]
}

const DEFAULT_TITLE = `${company.name} | ${company.tagline} for Ghana & Canada`

export function Seo({ title, description, path = '/', image = '/og-image.png', noindex, jsonLd }: Props) {
  const fullTitle = title ? `${title} | ${company.name}` : DEFAULT_TITLE
  const url = `${company.url}${path === '/' ? '' : path}`
  const img = image.startsWith('http') ? image : `${company.url}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
