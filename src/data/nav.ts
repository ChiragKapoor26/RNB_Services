export interface NavLink {
  label: string
  to: string
  /** Optional in-page anchor on the target route */
  hash?: string
}

export const mainNav: NavLink[] = [
  { label: 'How it works', to: '/', hash: 'how-it-works' },
  { label: 'Apps', to: '/', hash: 'apps' },
  { label: 'Where we operate', to: '/', hash: 'locations' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About R&B', to: '/about' },
      { label: 'How it works', to: '/', hash: 'how-it-works' },
      { label: 'Contact', to: '/contact' },
      { label: 'FAQ', to: '/', hash: 'faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of use', to: '/terms' },
    ],
  },
]

export const ui = {
  skipToContent: 'Skip to content',
  homeLink: '- home page',
  headerCta: 'Enquire',
  servicesMenu: 'Services',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  footerBlurb: 'All in one app. Connecting people in Ghana and Canada with trusted local providers.',
  footerFee: 'R&B is a connector, not the provider. A small connection fee applies.',
  footerCopyright: 'R&B Services Online. All rights reserved.',
  footerApps: 'The R&B apps',
  footerServices: 'Services',
  footerOffices: 'Our offices',
  notFound: {
    title: 'Page not found',
    text: "We couldn't find the page you were looking for. It may have moved - or the link might be mistyped.",
    home: 'Back to home',
    services: 'Browse services',
  },
  service: {
    howTitle: 'How it works',
    feeTitle: 'Transparent fee',
    itemsTitle: 'Browse sample listings',
    itemsSubtitle: 'Illustrative samples with indicative “from” prices. The provider’s own price is agreed directly.',
    enquire: 'Enquire',
    enquireAbout: 'Enquire about this service',
    explore: 'Explore',
    sample: 'Sample listing',
    from: 'from',
    onlyIn: 'Available in',
    related: 'More services',
    subServicesTitle: 'Three services, one network',
    featuredApp: 'Drivers use the R&B Driver app',
  },
}
