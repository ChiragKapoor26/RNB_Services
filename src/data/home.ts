import type { ServiceSlug } from './types'

/** Copy for the Home page and shared section headings. Components must not hardcode copy. */
export const home = {
  hero: {
    eyebrow: 'Ghana  ·  Canada',
    // The headline is set on three lines; `emphasis` lines are shown in italic brand blue.
    titleParts: [
      { text: 'Everything you need', emphasis: false },
      { text: 'Booked and Delivered', emphasis: true },
      { text: 'in one App', emphasis: false },
    ],
    subtitle:
      'Supplies, professionals, repairs, food, cars, rentals and rides - from trusted local providers, for one small, transparent connection fee.',
    primaryCta: 'Explore services',
    secondaryCta: 'Chat with RNB Bot',
    scrollHint: 'Scroll to explore',
    fallbackAlt: 'The R&B User, Seller and Driver app logos',
  },

  statement: {
    lines: [
      'One app for everyday life.',
      'Eleven services you already look for.',
      'Two countries we call home.',
      'One small, transparent fee.',
    ],
  },

  how: {
    eyebrow: 'How it works',
    title: 'From “I need…” to “sorted” in three steps.',
    steps: [
      {
        title: 'Tell us what you need',
        text: 'Browse the services or chat with RNB Bot. Share what you are looking for and where you are.',
      },
      {
        title: 'We connect you',
        text: 'We introduce you to a trusted local provider who can help - a supplier, a professional, a driver or a chef.',
      },
      {
        title: 'Agree & get it done',
        text: "You agree the details and price directly with the provider, and pay a small, transparent connection fee. That's it.",
      },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'Eleven ways we make life easier.',
    subtitle: 'Pick a service to see how it works and browse sample listings.',
  },

  spotlight: {
    eyebrow: 'Featured',
    title: 'In the spotlight',
    subtitle: 'A few of the things people connect with R&B for.',
    cta: 'Explore this service',
    pause: 'Pause',
    play: 'Play',
    pauseLabel: 'Pause the sliding animation',
    playLabel: 'Resume the sliding animation',
    slugs: [
      'building-supplies',
      'fixit-now',
      'good-to-eat',
      'buy-any-car',
      'property-booking',
      'rides-and-parcels',
    ] as ServiceSlug[],
  },

  phones: {
    eyebrow: 'The apps',
    title: 'Three apps. One family.',
    subtitle: 'Scroll to meet the R&B User, Seller and Driver apps.',
  },

  apps: {
    eyebrow: 'Get the apps',
    title: 'Built for everyone in the marketplace.',
    subtitle: 'Whether you need a service, sell one or drive for us, there is an R&B app for you.',
    comingSoon: 'Coming soon',
    apple: 'App Store',
    google: 'Google Play',
  },

  map: {
    eyebrow: 'Where we operate',
    title: 'Local in Ghana. Local in Canada.',
    subtitle: 'Switch countries to see where to find us.',
    directions: 'Get directions',
    openInMaps: 'Open in Google Maps',
    placeholderNote: 'Exact address, phone and hours coming soon.',
    loading: 'Loading map…',
    staticLabel: 'Find us on the map',
    fallbackNote: 'Interactive map unavailable - add a Google Maps key to enable it.',
  },

  why: {
    eyebrow: 'Why R&B',
    title: 'Simple, honest and local.',
    subtitle: 'We are a connector - which means you get the right provider and a price you agree directly.',
    pillars: [
      {
        icon: 'handshake',
        title: 'We connect, you decide',
        text: 'R&B introduces you to local providers. You choose, and agree price and details directly with them.',
      },
      {
        icon: 'coins',
        title: 'One small, clear fee',
        text: 'A small connection fee is shown before you confirm. No hidden charges, no surprises.',
      },
      {
        icon: 'shield',
        title: 'Trust, built in',
        text: 'We encourage checking credentials and agreeing details in writing - and we are here if you need a hand.',
      },
      {
        icon: 'map-pin',
        title: 'Truly local',
        text: 'Real providers in Accra, Kumasi, Takoradi, Toronto, Ottawa and Calgary, with more cities to come.',
      },
    ] as { icon: 'handshake' | 'coins' | 'shield' | 'map-pin'; title: string; text: string }[],
    feeBox: {
      title: 'How our fee works',
      lines: [
        "You pay a small connection fee when you book.",
        "The provider's own price is agreed directly with you.",
        'You always see our fee before you confirm.',
      ],
    },
  },

  stats: {
    items: [
      { value: 11, suffix: '', label: 'Service categories' },
      { value: 2, suffix: '', label: 'Countries' },
      { value: 6, suffix: '', label: 'Launch cities' },
      { value: 3, suffix: '', label: 'Apps in the R&B family' },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
  },

  cta: {
    title: 'Ready when you are.',
    text: 'Tell us what you need and we will connect you with a trusted local provider.',
    primary: 'Send an enquiry',
    secondary: 'Ask RNB Bot',
  },
}
