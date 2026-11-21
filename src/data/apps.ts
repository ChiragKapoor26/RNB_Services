import type { AppInfo } from './types'

/**
 * The three R&B apps. Store links are config placeholders - leave them empty
 * and the UI shows "Coming soon"; paste the real URLs once the apps are live.
 */
export const apps: AppInfo[] = [
  {
    id: 'user',
    name: 'R&B User App',
    audience: 'For everyone who needs a service',
    description:
      'Browse supplies, professionals, repairs, food, cars, rentals and rides in one place - and connect with a trusted local provider in a few taps.',
    logo: '/brand/rnb-user.webp',
    logoSmall: '/brand/rnb-user-sm.webp',
    accent: 'green',
    stores: { ios: '', android: '' }, // TODO(client): store URLs
    screenTitle: 'What do you need today?',
    screenLines: ['Building supplies', 'Book a repair pro', 'Good to eat', 'Rides & parcels'],
  },
  {
    id: 'seller',
    name: 'R&B Seller App',
    audience: 'For shops, vendors and home-chefs',
    description:
      'List your products and services, receive enquiries from nearby customers, and grow your local business without building a website.',
    logo: '/brand/rnb-seller.webp',
    logoSmall: '/brand/rnb-seller-sm.webp',
    accent: 'amber',
    stores: { ios: '', android: '' }, // TODO(client): store URLs
    screenTitle: 'Your shop, near everyone',
    screenLines: ['New enquiries', 'My listings', 'Opening hours', 'Connection fees'],
  },
  {
    id: 'driver',
    name: 'R&B Driver App',
    audience: 'For taxi drivers and parcel couriers',
    description:
      'Accept ride and parcel requests from your area, see the route up front, and drive when it suits you with the R&B Runner, R&B Go and R&B Parcel Express network.',
    logo: '/brand/rnb-driver.webp',
    logoSmall: '/brand/rnb-driver-sm.webp',
    accent: 'orange',
    stores: { ios: '', android: '' }, // TODO(client): store URLs
    screenTitle: 'Ready to drive?',
    screenLines: ['Incoming requests', 'Today\'s trips', 'Parcel pick-ups', 'Go online'],
  },
]
