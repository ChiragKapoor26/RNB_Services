import type { Offer, Service, ServiceSlug } from './types'

/**
 * The 11 R&B services. Each has exactly 6 items.
 *
 * - All items are SAMPLE / illustrative listings - prices are indicative "from" prices
 *   in local currency (GH₵ for Ghana, CA$ for Canada). The provider's own price is
 *   always agreed directly with the customer.
 * - No real people, phone numbers or reviews are invented here. Vendors are described
 *   generically (e.g. "Home-chef kitchen").
 * - Item `id` doubles as the image file name: /images/<slug>/<id>.webp  (hero: hero.webp)
 */

const gh = (price: number, city: string, unit?: string): Offer => ({ price, city, unit })
const ca = (price: number, city: string, unit?: string): Offer => ({ price, city, unit })

const STANDARD_FEE =
  "You pay a small connection fee when you book; the provider's own price is agreed directly."

export const services: Service[] = [
  // ---------------------------------------------------------------- 1
  {
    slug: 'building-supplies',
    title: 'Building Supplies & Home Hardware',
    shortTitle: 'Building Supplies',
    summary: 'Cement, roofing, tools, paint and fittings from suppliers near your site.',
    accent: 'amber',
    icon: 'hardhat',
    intro: [
      'Building or renovating should not mean driving across town comparing prices. R&B connects you with trusted local suppliers of cement, roofing, tools, paint, plumbing and electrical materials in Ghana and Canada.',
      'Tell us what you need and where your site is. We introduce you to nearby suppliers so you can confirm stock, price and delivery directly with them.',
    ],
    steps: [
      { title: 'Tell us what you need', text: 'Choose an item or describe your materials list and delivery location.' },
      { title: 'Get connected', text: 'We introduce you to a nearby supplier who has your items.' },
      { title: 'Agree & receive', text: 'Confirm price and delivery with the supplier, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    items: [
      {
        id: 'cement-50kg',
        title: 'Cement (50kg bag)',
        description: 'Portland cement for foundations, blocks and plastering. Bulk and pallet orders welcome.',
        tag: 'Materials',
        offers: { ghana: gh(95, 'Accra', 'per bag'), canada: ca(19, 'Toronto', 'per bag') },
        details: ['50kg bag', 'Bulk pricing on request'],
      },
      {
        id: 'roofing-sheets',
        title: 'Roofing sheets',
        description: 'Long-span aluminium and galvanised roofing sheets in several gauges and colours.',
        tag: 'Roofing',
        offers: { ghana: gh(210, 'Kumasi', 'per sheet'), canada: ca(48, 'Ottawa', 'per sheet') },
        details: ['Multiple gauges', 'Cut-to-length available'],
      },
      {
        id: 'power-drill-set',
        title: 'Power drill set',
        description: 'Cordless drill with batteries, charger and a starter bit set in a carry case.',
        tag: 'Tools',
        offers: { ghana: gh(560, 'Accra'), canada: ca(99, 'Calgary') },
        details: ['Cordless', 'Bit set included'],
      },
      {
        id: 'paint-20l',
        title: 'Paint (20L)',
        description: 'Premium emulsion paint for interior and exterior walls, with a wide colour range.',
        tag: 'Paint',
        offers: { ghana: gh(780, 'Takoradi', 'per 20L'), canada: ca(159, 'Toronto', 'per 20L') },
        details: ['Interior / exterior', 'Colour matching'],
      },
      {
        id: 'plumbing-fittings',
        title: 'Plumbing pipes & fittings',
        description: 'PVC and PPR pipes, elbows, valves and fittings for new builds and repairs.',
        tag: 'Plumbing',
        offers: { ghana: gh(180, 'Accra', 'starter kit'), canada: ca(54, 'Ottawa', 'starter kit') },
        details: ['PVC & PPR', 'Fittings kit'],
      },
      {
        id: 'electrical-wiring-kit',
        title: 'Electrical wiring kit',
        description: 'Cable, switches, sockets and breakers sized for a room or small-home installation.',
        tag: 'Electrical',
        offers: { ghana: gh(420, 'Kumasi', 'per kit'), canada: ca(110, 'Calgary', 'per kit') },
        details: ['Certified components', 'Installer referral available'],
      },
    ],
  },

  // ---------------------------------------------------------------- 2
  {
    slug: 'professional-services',
    title: 'Professional Services',
    shortTitle: 'Professional Services',
    summary: 'Accountants, legal help, IT support, architects and documentation specialists.',
    accent: 'blue',
    icon: 'briefcase',
    intro: [
      'Whether you are starting a business, filing taxes or planning a build, the right professional saves time and money. R&B connects you with independent professionals in Ghana and Canada.',
      'Describe what you need and we will introduce you to a provider who handles it. You agree scope and fees directly - we simply make the introduction.',
    ],
    steps: [
      { title: 'Describe your need', text: 'Pick a service and tell us a little about your situation and timeline.' },
      { title: 'Meet your professional', text: 'We connect you with a suitable provider for an initial conversation.' },
      { title: 'Agree scope & fee', text: 'Confirm what is included with the provider, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'General information only',
      text: 'R&B connects you with independent professionals and does not provide legal, tax or immigration advice itself. Please confirm each provider’s registration or licence before engaging them.',
    },
    items: [
      {
        id: 'accountant-tax',
        title: 'Accountant & tax filing',
        description: 'Bookkeeping, annual returns and tax filing for individuals and small businesses.',
        tag: 'Finance',
        offers: { ghana: gh(450, 'Accra', 'per filing'), canada: ca(129, 'Toronto', 'per filing') },
        details: ['Individuals & SMEs', 'Annual returns'],
      },
      {
        id: 'legal-consultation',
        title: 'Legal consultation',
        description: 'A first conversation with an independent legal professional about contracts, property or disputes.',
        tag: 'Legal',
        offers: { ghana: gh(380, 'Accra', 'per 30 min'), canada: ca(150, 'Ottawa', 'per 30 min') },
        details: ['Initial consultation', 'In person or online'],
      },
      {
        id: 'web-it-support',
        title: 'Web & IT support',
        description: 'Websites, email setup, Wi-Fi, devices and day-to-day IT help for homes and small offices.',
        tag: 'Technology',
        offers: { ghana: gh(260, 'Kumasi', 'per hour'), canada: ca(75, 'Calgary', 'per hour') },
        details: ['Remote or on-site', 'Home & small office'],
      },
      {
        id: 'business-registration',
        title: 'Business registration consultant',
        description: 'Guidance through registering a company or sole proprietorship and getting tax-ready.',
        tag: 'Business',
        offers: { ghana: gh(950, 'Accra', 'package'), canada: ca(320, 'Toronto', 'package') },
        details: ['Registration paperwork', 'Tax set-up guidance'],
      },
      {
        id: 'architect-drafting',
        title: 'Architect & drafting',
        description: 'House plans, permit drawings and renovation layouts from experienced drafters and architects.',
        tag: 'Design',
        offers: { ghana: gh(1800, 'Takoradi', 'per drawing set'), canada: ca(480, 'Ottawa', 'per drawing set') },
        details: ['Permit drawings', 'Renovation layouts'],
      },
      {
        id: 'immigration-documentation',
        title: 'Immigration & documentation help',
        description: 'Help organising forms, supporting documents and applications with a qualified consultant.',
        tag: 'Documents',
        offers: { ghana: gh(520, 'Accra', 'per consultation'), canada: ca(210, 'Toronto', 'per consultation') },
        details: ['Document checklists', 'Application support'],
      },
    ],
  },

  // ---------------------------------------------------------------- 3
  {
    slug: 'health-wellness',
    title: 'Health & Wellness',
    shortTitle: 'Health & Wellness',
    summary: 'Consultations, physiotherapy, massage, nutrition, counselling and home nursing.',
    accent: 'green',
    icon: 'heart-pulse',
    imageFocus: '50% 30%',
    intro: [
      'Looking after your health should be simple. R&B connects you with licensed independent practitioners in Ghana and Canada - from telehealth consultations to physiotherapy and home nursing.',
      'Choose a service and tell us when and where. We introduce you to a practitioner and you agree the appointment and fee directly with them.',
    ],
    steps: [
      { title: 'Choose a service', text: 'Pick the care you are looking for and your preferred time and place.' },
      { title: 'Get introduced', text: 'We connect you with an independent, registered practitioner near you.' },
      { title: 'Confirm your appointment', text: 'Agree the visit and fee with the practitioner, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'Not medical advice',
      text: 'The information on this site is not medical advice. In an emergency, call your local emergency number immediately (112 or 999 in Ghana, 911 in Canada).',
    },
    items: [
      {
        id: 'gp-telehealth',
        title: 'GP / telehealth consultation',
        description: 'A video or phone consultation with a registered general practitioner for everyday concerns.',
        tag: 'Consultation',
        offers: { ghana: gh(220, 'Accra', 'per consult'), canada: ca(65, 'Toronto', 'per consult') },
        details: ['Video or phone', 'Registered GPs'],
        imageFocus: '47% 50%',
      },
      {
        id: 'physiotherapy',
        title: 'Physiotherapy',
        description: 'Assessment and treatment for injuries, back pain and recovery after surgery.',
        tag: 'Rehab',
        offers: { ghana: gh(320, 'Kumasi', 'per session'), canada: ca(110, 'Ottawa', 'per session') },
        details: ['Clinic or home visit', 'Injury & recovery'],
        imageFocus: '50% 15%', // tall photo: keep the therapist's face + the leg stretch in a landscape card
      },
      {
        id: 'massage-therapy',
        title: 'Massage therapy',
        description: 'Relaxation and therapeutic massage from qualified therapists, in clinic or at home.',
        tag: 'Wellness',
        offers: { ghana: gh(260, 'Accra', 'per hour'), canada: ca(98, 'Calgary', 'per hour') },
        details: ['60-minute sessions', 'Clinic or mobile'],
        imageFocus: '12% 50%',
      },
      {
        id: 'nutrition-coaching',
        title: 'Nutrition coaching',
        description: 'Practical eating plans built around your goals, budget and the foods you love.',
        tag: 'Nutrition',
        offers: { ghana: gh(290, 'Accra', 'per session'), canada: ca(95, 'Toronto', 'per session') },
        details: ['Personalised plan', 'Online or in person'],
        imageFocus: '85% 50%',
      },
      {
        id: 'mental-wellness-counselling',
        title: 'Mental-wellness counselling',
        description: 'Confidential, supportive conversations with a trained counsellor.',
        tag: 'Counselling',
        offers: { ghana: gh(350, 'Takoradi', 'per session'), canada: ca(135, 'Ottawa', 'per session') },
        details: ['Confidential', 'Online or in person'],
        imageFocus: '40% 40%',
      },
      {
        id: 'home-nursing',
        title: 'Home nursing care',
        description: 'Qualified nurses for wound care, post-operative support and elder care at home.',
        tag: 'Home care',
        offers: { ghana: gh(480, 'Accra', 'per visit'), canada: ca(90, 'Toronto', 'per hour') },
        details: ['Qualified nurses', 'Visit or longer shifts'],
        imageFocus: '45% 40%',
      },
    ],
  },

  // ---------------------------------------------------------------- 4
  {
    slug: 'artisan-carpenter',
    title: 'Artisan & Carpenter',
    shortTitle: 'Artisan & Carpenter',
    summary: 'Skilled carpenters, tilers, painters and welders for homes and businesses.',
    accent: 'orange',
    icon: 'hammer',
    imageFocus: '25% 40%',
    intro: [
      'Good craftsmanship is built on trust. R&B connects you with skilled carpenters, fitters, tilers, painters and welders in Ghana and Canada who take pride in their work.',
      'Share your measurements, photos or ideas and we introduce you to an artisan near you. You agree the design, timeline and price directly.',
    ],
    steps: [
      { title: 'Share your project', text: 'Tell us what you want built or fitted, with sizes or photos if you have them.' },
      { title: 'Meet your artisan', text: 'We connect you with a skilled local craftsperson for a quote.' },
      { title: 'Agree & build', text: 'Confirm design, timeline and price with the artisan, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    items: [
      {
        id: 'custom-furniture',
        title: 'Custom furniture',
        description: 'Beds, wardrobes, dining sets and office desks made to your size and style.',
        tag: 'Carpentry',
        offers: { ghana: gh(2800, 'Kumasi', 'per piece'), canada: ca(650, 'Toronto', 'per piece') },
        details: ['Made to measure', 'Choice of timber & finish'],
      },
      {
        id: 'door-window-fitting',
        title: 'Door & window fitting',
        description: 'Supply and professional fitting of timber, aluminium and steel doors and windows.',
        tag: 'Fitting',
        offers: { ghana: gh(650, 'Accra', 'per opening'), canada: ca(190, 'Ottawa', 'per opening') },
        details: ['Supply & fit', 'Timber, aluminium, steel'],
      },
      {
        id: 'kitchen-cabinets',
        title: 'Kitchen cabinets',
        description: 'Fitted kitchen cabinets and worktops designed around your space and budget.',
        tag: 'Kitchens',
        offers: { ghana: gh(6500, 'Accra', 'per kitchen'), canada: ca(2600, 'Calgary', 'per kitchen') },
        details: ['Design & install', 'Worktops available'],
      },
      {
        id: 'tiling-flooring',
        title: 'Tiling & flooring',
        description: 'Floor and wall tiling, laminate and vinyl flooring with clean, level finishes.',
        tag: 'Finishing',
        offers: { ghana: gh(65, 'Takoradi', 'per m²'), canada: ca(9, 'Toronto', 'per sq ft') },
        details: ['Floors & walls', 'Labour or supply & fit'],
      },
      {
        id: 'painting-plastering',
        title: 'Painting & plastering',
        description: 'Interior and exterior painting and smooth plastering for homes and shops.',
        tag: 'Finishing',
        offers: { ghana: gh(38, 'Kumasi', 'per m²'), canada: ca(3.5, 'Ottawa', 'per sq ft') },
        details: ['Interior & exterior', 'Surface preparation'],
      },
      {
        id: 'welding-metal-gates',
        title: 'Welding & metal gates',
        description: 'Gates, burglar-proofing, railings and custom steelwork fabricated and installed.',
        tag: 'Metalwork',
        offers: { ghana: gh(2400, 'Accra', 'per gate'), canada: ca(850, 'Calgary', 'per gate') },
        details: ['Gates & railings', 'Fabricate & install'],
      },
    ],
  },

  // ---------------------------------------------------------------- 5
  {
    slug: 'events',
    title: 'Event Decor & Event Planning',
    shortTitle: 'Events',
    summary: 'Weddings, decor, catering, photography and entertainment for your big day.',
    accent: 'amber',
    icon: 'party',
    imageFocus: '30% 15%', // keeps the stylist (with headroom above her hair) + the decorated table in frame in every crop
    intro: [
      'From traditional weddings to birthdays and corporate functions, R&B connects you with planners, decorators, caterers, photographers and entertainers who make events memorable.',
      'Tell us the date, venue and style you have in mind. We introduce you to the right people and you agree the details directly with each one.',
    ],
    steps: [
      { title: 'Share your event', text: 'Tell us the date, venue, guest count and the feel you want.' },
      { title: 'Meet your team', text: 'We connect you with planners, decorators and vendors who fit your budget.' },
      { title: 'Agree & celebrate', text: 'Confirm packages with each provider, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    items: [
      {
        id: 'wedding-planning',
        title: 'Wedding planning',
        description: 'Full or partial planning for traditional, white and destination weddings.',
        tag: 'Planning',
        offers: { ghana: gh(5500, 'Accra', 'per event'), canada: ca(2100, 'Toronto', 'per event') },
        details: ['Full or partial', 'Day-of coordination'],
        imageFocus: '50% 6%', // tall photo: keep both faces (with headroom) in a landscape card
      },
      {
        id: 'stage-backdrop-decor',
        title: 'Stage & backdrop decor',
        description: 'Stage design, draping and statement backdrops for ceremonies and receptions.',
        tag: 'Decor',
        offers: { ghana: gh(2600, 'Kumasi', 'per event'), canada: ca(950, 'Ottawa', 'per event') },
        details: ['Stage & draping', 'Custom backdrops'],
      },
      {
        id: 'balloon-floral-decor',
        title: 'Balloon & floral decor',
        description: 'Balloon arches, centrepieces and fresh or faux floral arrangements.',
        tag: 'Decor',
        offers: { ghana: gh(1300, 'Accra', 'per event'), canada: ca(420, 'Calgary', 'per event') },
        details: ['Arches & centrepieces', 'Fresh or faux florals'],
      },
      {
        id: 'catering-coordination',
        title: 'Catering coordination',
        description: 'We help you shortlist caterers and menus that suit your guests and budget.',
        tag: 'Catering',
        offers: { ghana: gh(65, 'Takoradi', 'per guest'), canada: ca(30, 'Toronto', 'per guest') },
        details: ['Menu shortlisting', 'Local & continental dishes'],
      },
      {
        id: 'photography-video',
        title: 'Photography & video',
        description: 'Photographers and videographers to capture the moments that matter.',
        tag: 'Media',
        offers: { ghana: gh(2100, 'Accra', 'per event'), canada: ca(780, 'Ottawa', 'per event') },
        details: ['Photo & film', 'Edited gallery'],
        imageFocus: '10% 50%', // the photographer is at the left of this photo
      },
      {
        id: 'sound-dj-mc',
        title: 'Sound, DJ & MC',
        description: 'Sound systems, DJs and MCs to keep the energy right from start to finish.',
        tag: 'Entertainment',
        offers: { ghana: gh(1600, 'Kumasi', 'per event'), canada: ca(540, 'Calgary', 'per event') },
        details: ['PA & lighting', 'DJ & MC'],
      },
    ],
  },

  // ---------------------------------------------------------------- 6
  {
    slug: 'property-booking',
    title: 'Property Booking',
    shortTitle: 'Property Booking',
    summary: 'Short-stay apartments, guest houses and serviced homes across both countries.',
    accent: 'blue',
    icon: 'building',
    intro: [
      'Need somewhere to stay for a night, a week or a month? R&B connects you with hosts of short-stay and serviced properties in Accra, Kumasi, Takoradi, Toronto, Ottawa and Calgary.',
      'Tell us your dates, guests and area. We introduce you to a host and you confirm availability, the nightly rate and house rules directly.',
    ],
    steps: [
      { title: 'Tell us your dates', text: 'Share your city, dates and number of guests.' },
      { title: 'Meet your host', text: 'We connect you with a host whose property fits.' },
      { title: 'Confirm your stay', text: 'Agree the rate and house rules with the host, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'Sample listings',
      text: 'The properties below are illustrative samples to show how listings will look. Availability and rates are confirmed directly with the host.',
    },
    items: [
      {
        id: 'accra-serviced-apartment',
        title: 'Serviced 2-bed apartment',
        description: 'Bright serviced apartment with backup power, Wi-Fi and secure parking.',
        tag: 'Apartment',
        offers: { ghana: gh(750, 'Accra - Airport Residential', 'per night') },
        details: ['2 beds', '2 baths', 'Sleeps 4'],
      },
      {
        id: 'kumasi-guest-house',
        title: 'Garden guest house',
        description: 'Quiet three-bedroom guest house with a shaded garden, ideal for families.',
        tag: 'House',
        offers: { ghana: gh(520, 'Kumasi - Ahodwo', 'per night') },
        details: ['3 beds', '2 baths', 'Sleeps 6'],
      },
      {
        id: 'takoradi-studio',
        title: 'Coastal studio',
        description: 'Compact, comfortable studio a short drive from the beach and the harbour.',
        tag: 'Studio',
        offers: { ghana: gh(380, 'Takoradi - Anaji', 'per night') },
        details: ['1 bed', '1 bath', 'Sleeps 2'],
      },
      {
        id: 'toronto-condo',
        title: 'Downtown condo',
        description: 'Modern one-bedroom condo steps from transit, cafés and the waterfront.',
        tag: 'Condo',
        offers: { canada: ca(145, 'Toronto - Liberty Village', 'per night') },
        details: ['1 bed', '1 bath', 'Sleeps 3'],
      },
      {
        id: 'ottawa-townhouse',
        title: 'Townhouse stay',
        description: 'Two-storey townhouse with a full kitchen and parking, close to the city centre.',
        tag: 'Townhouse',
        offers: { canada: ca(170, 'Ottawa - Centretown', 'per night') },
        details: ['2 beds', '1.5 baths', 'Sleeps 5'],
      },
      {
        id: 'calgary-apartment',
        title: 'Beltline apartment',
        description: 'Furnished two-bedroom apartment with a balcony, close to restaurants and the C-Train.',
        tag: 'Apartment',
        offers: { canada: ca(155, 'Calgary - Beltline', 'per night') },
        details: ['2 beds', '1 bath', 'Sleeps 4'],
      },
    ],
  },

  // ---------------------------------------------------------------- 7
  {
    slug: 'fixit-now',
    title: 'FixIt Now: Book a Repair Pro',
    shortTitle: 'FixIt Now',
    summary: 'Plumbers, electricians, mechanics and device repairers, booked in minutes.',
    accent: 'orange',
    icon: 'wrench',
    imageFocus: '68% 40%',
    intro: [
      'A leaking pipe, a dead fridge or a phone that will not charge - FixIt Now gets a repair pro on the way. R&B connects you with vetted independent repairers near you in Ghana and Canada.',
      'Describe the problem and your location, and we introduce you to a pro who can help. You agree the call-out and repair cost directly.',
    ],
    steps: [
      { title: 'Describe the problem', text: 'Pick the type of repair, add a few details and your address.' },
      { title: 'Meet your pro', text: 'We connect you with a nearby repairer who is available soon.' },
      { title: 'Agree & get fixed', text: 'Confirm the call-out and price with the pro, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    items: [
      {
        id: 'plumber',
        title: 'Plumber',
        description: 'Leaks, blocked drains, taps, toilets and water-heater fixes.',
        tag: 'Plumbing',
        offers: { ghana: gh(150, 'Accra', 'call-out'), canada: ca(95, 'Toronto', 'call-out') },
        details: ['Emergency call-outs', 'Residential & small commercial'],
      },
      {
        id: 'electrician',
        title: 'Electrician',
        description: 'Faults, rewiring, sockets, lighting and consumer-unit repairs.',
        tag: 'Electrical',
        offers: { ghana: gh(180, 'Kumasi', 'call-out'), canada: ca(110, 'Ottawa', 'call-out') },
        details: ['Fault finding', 'Safe, tidy work'],
      },
      {
        id: 'ac-fridge-repair',
        title: 'AC & fridge repair',
        description: 'Servicing, gas top-ups and repairs for air conditioners, fridges and freezers.',
        tag: 'Cooling',
        offers: { ghana: gh(260, 'Accra', 'per visit'), canada: ca(125, 'Calgary', 'per visit') },
        details: ['Servicing & gas', 'Home & shop units'],
      },
      {
        id: 'phone-laptop-repair',
        title: 'Phone & laptop repair',
        description: 'Cracked screens, batteries, charging ports and software issues.',
        tag: 'Devices',
        offers: { ghana: gh(120, 'Takoradi', 'diagnosis'), canada: ca(70, 'Toronto', 'diagnosis') },
        details: ['Screens & batteries', 'Same-day options'],
      },
      {
        id: 'auto-mechanic-mobile',
        title: 'Auto mechanic (mobile)',
        description: 'A mechanic comes to you for diagnostics, servicing and common repairs.',
        tag: 'Vehicles',
        offers: { ghana: gh(320, 'Accra', 'call-out'), canada: ca(125, 'Ottawa', 'call-out') },
        details: ['Mobile service', 'Diagnostics & servicing'],
      },
      {
        id: 'appliance-repair',
        title: 'Appliance repair',
        description: 'Washing machines, cookers, microwaves, TVs and other household appliances.',
        tag: 'Appliances',
        offers: { ghana: gh(200, 'Kumasi', 'per visit'), canada: ca(100, 'Calgary', 'per visit') },
        details: ['Washers, cookers, TVs', 'Parts sourced locally'],
      },
    ],
  },

  // ---------------------------------------------------------------- 8
  {
    slug: 'good-to-eat',
    title: 'Good to Eat',
    shortTitle: 'Good to Eat',
    summary: 'Local favourites from restaurants and home-chefs near you.',
    accent: 'green',
    icon: 'utensils',
    intro: [
      'From smoky jollof to crispy poutine, Good to Eat connects you with restaurants and home-chef kitchens serving the dishes you crave in Ghana and Canada.',
      'Pick a dish and your area. We introduce you to a nearby vendor and you confirm the menu, price and pick-up or delivery directly.',
    ],
    steps: [
      { title: 'Pick a dish', text: 'Choose what you are hungry for and tell us your area.' },
      { title: 'Meet the kitchen', text: 'We connect you with a restaurant or home-chef nearby.' },
      { title: 'Order & enjoy', text: 'Confirm price and delivery with the vendor, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'Sample vendors',
      text: 'The dishes and kitchens shown are illustrative samples. Menus, prices and allergen information are confirmed directly with each vendor.',
    },
    items: [
      {
        id: 'jollof-grilled-chicken',
        title: 'Jollof rice & grilled chicken',
        description: 'Smoky party-style jollof with spiced grilled chicken, shito and salad.',
        tag: 'Ghanaian classic',
        offers: { ghana: gh(85, 'Accra - Osu', 'per plate'), canada: ca(19, 'Toronto - Scarborough', 'per plate') },
        vendor: 'Sample restaurant kitchen',
      },
      {
        id: 'waakye',
        title: 'Waakye',
        description: 'Rice and beans with spaghetti, gari, egg, fish or meat and the full works.',
        tag: 'Street-food favourite',
        offers: { ghana: gh(45, 'Accra - Madina', 'per plate') },
        vendor: 'Sample home-chef kitchen',
      },
      {
        id: 'banku-tilapia',
        title: 'Banku & tilapia',
        description: 'Fermented corn-and-cassava banku with grilled tilapia, pepper sauce and onions.',
        tag: 'Grill & fish',
        offers: { ghana: gh(120, 'Kumasi - Adum', 'per plate') },
        vendor: 'Sample grill spot',
      },
      {
        id: 'kelewele',
        title: 'Kelewele',
        description: 'Ginger-spiced fried plantain cubes - sweet, spicy and perfect with groundnuts.',
        tag: 'Snack',
        offers: { ghana: gh(30, 'Takoradi - Market Circle', 'per portion'), canada: ca(9, 'Ottawa - Vanier', 'per portion') },
        vendor: 'Sample snack stall',
      },
      {
        id: 'poutine',
        title: 'Poutine',
        description: 'Crispy fries, squeaky cheese curds and hot gravy - a Canadian comfort classic.',
        tag: 'Canadian classic',
        offers: { canada: ca(12, 'Ottawa - ByWard Market', 'per serving') },
        vendor: 'Sample diner',
      },
      {
        id: 'suya-skewers',
        title: 'Suya skewers',
        description: 'Peppery grilled beef skewers with yaji spice, sliced onions and tomatoes.',
        tag: 'Grill',
        offers: { ghana: gh(60, 'Accra - Tema', 'per 5 skewers'), canada: ca(16, 'Calgary - Forest Lawn', 'per 5 skewers') },
        vendor: 'Sample grill vendor',
      },
    ],
  },

  // ---------------------------------------------------------------- 9
  {
    slug: 'buy-any-car',
    title: 'Buy Any Car',
    shortTitle: 'Buy Any Car',
    summary: 'Find a quality second-hand car from local sellers in Ghana and Canada.',
    accent: 'blue',
    icon: 'car',
    imageFocus: '55% 30%', // keeps the smiling face + the raised car key in frame in every crop (page hero, home tile, spotlight)
    intro: [
      'Buying a car is a big decision. R&B connects you with local sellers of second-hand cars, SUVs and pickups in Ghana and Canada, so you can compare options and talk to sellers directly.',
      'Tell us your budget, body type and city. We introduce you to sellers with matching vehicles; you agree viewing, price and paperwork directly.',
    ],
    steps: [
      { title: 'Share your budget', text: 'Tell us the type of car, your budget and your city.' },
      { title: 'Meet the seller', text: 'We connect you with sellers who have matching vehicles.' },
      { title: 'Inspect & agree', text: 'View the car, agree the price with the seller, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'Independent inspection recommended',
      text: 'Always have a trusted, independent mechanic inspect a vehicle - and check ownership papers - before you pay a deposit or buy. Listings below are illustrative samples.',
    },
    items: [
      {
        id: 'toyota-corolla-2016',
        title: 'Toyota Corolla',
        description: 'Fuel-efficient family saloon with a clean interior and full service history.',
        tag: 'Saloon',
        offers: { ghana: gh(118000, 'Accra') },
        details: ['2016', '98,000 km', 'Automatic', 'Petrol'],
        imageFocus: '50% 55%',
      },
      {
        id: 'honda-civic-2018',
        title: 'Honda Civic',
        description: 'Sporty, reliable compact with a smooth CVT and modern safety features.',
        tag: 'Saloon',
        offers: { canada: ca(19500, 'Toronto') },
        details: ['2018', '82,000 km', 'Automatic (CVT)', 'Petrol'],
        imageFocus: '45% 50%',
      },
      {
        id: 'hyundai-elantra-2017',
        title: 'Hyundai Elantra',
        description: 'Comfortable and economical, popular with ride-hailing and families alike.',
        tag: 'Saloon',
        offers: { ghana: gh(96000, 'Kumasi') },
        details: ['2017', '76,000 km', 'Automatic', 'Petrol'],
        imageFocus: '50% 75%', // tall photo: keep the car, not the sky
      },
      {
        id: 'toyota-rav4-2017',
        title: 'Toyota RAV4',
        description: 'Spacious all-wheel-drive SUV, trusted for winter roads and long trips.',
        tag: 'SUV',
        offers: { canada: ca(24900, 'Ottawa') },
        details: ['2017', '112,000 km', 'Automatic', 'AWD'],
        imageFocus: '48% 50%',
      },
      {
        id: 'nissan-rogue-2016',
        title: 'Nissan Rogue',
        description: 'Roomy crossover with a quiet cabin and comfortable ride.',
        tag: 'SUV',
        offers: { canada: ca(17800, 'Calgary') },
        details: ['2016', '120,000 km', 'Automatic', 'AWD'],
        imageFocus: '100% 50%', // the front (grille + badge) is at the right edge of this photo
      },
      {
        id: 'ford-ranger-2015',
        title: 'Ford Ranger',
        description: 'Tough double-cab pickup for work, roads and rougher terrain.',
        tag: 'Pickup',
        offers: { ghana: gh(185000, 'Takoradi') },
        details: ['2015', '140,000 km', 'Manual', 'Diesel'],
        imageFocus: '40% 50%',
      },
    ],
  },

  // ---------------------------------------------------------------- 10
  {
    slug: 'rent-and-lease',
    title: 'Rent & Lease',
    shortTitle: 'Rent & Lease',
    summary: 'Long-term apartments, shops, offices and warehouses from local landlords.',
    accent: 'green',
    icon: 'key',
    imageFocus: '50% 36%', // both faces + the documents stay in frame in the wide (16:10) crops
    intro: [
      'Looking for a home, a shop or an office for the long term? R&B connects you with local landlords and agents offering rentals and leases in Ghana and Canada.',
      'Share what you need, your budget and preferred area. We introduce you to matching landlords and you agree viewing, terms and lease details directly.',
    ],
    steps: [
      { title: 'Describe your space', text: 'Tell us the type of space, budget, area and when you need it.' },
      { title: 'Meet the landlord', text: 'We connect you with landlords or agents with matching places.' },
      { title: 'View & agree', text: 'Visit, agree the lease terms with the landlord, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    notice: {
      title: 'Sample listings',
      text: 'The rentals below are illustrative samples. Always read the full lease and verify ownership before paying any deposit.',
    },
    items: [
      {
        id: 'accra-apartment-lease',
        title: 'Two-bedroom apartment',
        description: 'Secure gated apartment with water storage, parking and reliable internet nearby.',
        tag: 'Apartment',
        offers: { ghana: gh(6500, 'Accra - East Legon', 'per month') },
        details: ['12-month lease', '2 beds', '2 baths'],
        imageFocus: '15% 50%', // the man on the sofa is at the left of this photo
      },
      {
        id: 'kumasi-townhouse-lease',
        title: 'Family townhouse',
        description: 'Three-bedroom townhouse in a quiet estate with a compound and security.',
        tag: 'Townhouse',
        offers: { ghana: gh(5200, 'Kumasi - Santasi', 'per month') },
        details: ['12-month lease', '3 beds', '2 baths'],
        imageFocus: '75% 40%', // keeps all three faces in the square phone thumbnail
      },
      {
        id: 'accra-shop-space',
        title: 'Street-front shop space',
        description: 'Ground-floor retail unit with good foot traffic and shutter security.',
        tag: 'Shop space',
        offers: { ghana: gh(4800, 'Accra - Osu', 'per month') },
        details: ['24-month lease', '45 m²'],
      },
      {
        id: 'toronto-office',
        title: 'Private small office',
        description: 'Furnished private office for 2-4 people with meeting-room access.',
        tag: 'Office',
        offers: { canada: ca(1850, 'Toronto - Downtown', 'per month') },
        details: ['12-month lease', 'Up to 4 desks'],
        imageFocus: '80% 45%',
      },
      {
        id: 'ottawa-co-living-room',
        title: 'Co-living room',
        description: 'Furnished private bedroom in a shared house with utilities and Wi-Fi included.',
        tag: 'Co-living',
        offers: { canada: ca(950, 'Ottawa - Sandy Hill', 'per month') },
        details: ['6-month lease', 'Utilities included'],
        imageFocus: '42% 50%', // the room: window light, the couple and the bed
      },
      {
        id: 'calgary-warehouse',
        title: 'Light-industrial warehouse',
        description: 'Clear-span warehouse unit with a loading door, yard and office space.',
        tag: 'Warehouse',
        offers: { canada: ca(3400, 'Calgary - Foothills', 'per month') },
        details: ['36-month lease', '280 m²'],
      },
    ],
  },

  // ---------------------------------------------------------------- 11
  {
    slug: 'rides-and-parcels',
    title: 'Rides & Parcels',
    shortTitle: 'Rides & Parcels',
    summary: 'R&B Taxi, R&B Go and R&B Parcel Express - moving people and packages.',
    accent: 'orange',
    icon: 'taxi',
    featuredApp: 'driver',
    intro: [
      'Need to get somewhere - or get something delivered? Rides & Parcels brings together three R&B services: R&B Taxi for classic taxi rides, R&B Go for everyday trips and R&B Parcel Express for home parcel pick-up and delivery.',
      'Request a ride or parcel and we connect you with a nearby driver from the R&B Driver app network. You agree the fare directly with the driver.',
    ],
    steps: [
      { title: 'Tell us where', text: 'Choose a ride or a parcel, then add your pick-up and drop-off.' },
      { title: 'Meet your driver', text: 'We connect you with a nearby R&B driver or courier.' },
      { title: 'Agree & go', text: 'Confirm the fare with the driver, and pay our small connection fee.' },
    ],
    feeNote: STANDARD_FEE,
    subServices: [
      {
        name: 'R&B Taxi',
        description: 'Classic taxi rides for airport runs, intercity trips and when you want a dependable ride.',
        icon: 'taxi',
      },
      {
        name: 'R&B Go',
        description: 'Everyday rides around town - to work, the market, school or a night out.',
        icon: 'car',
      },
      {
        name: 'R&B Parcel Express',
        description: 'Home parcel pick-up and delivery, same-day or scheduled, for people and businesses.',
        icon: 'parcel',
      },
    ],
    items: [
      {
        id: 'airport-transfer',
        title: 'Airport transfer',
        description: 'Meet-and-greet pick-ups and drop-offs, with flight-time monitoring.',
        tag: 'R&B Taxi',
        offers: { ghana: gh(240, 'Accra - Kotoka (ACC)', 'per trip'), canada: ca(68, 'Toronto - Pearson (YYZ)', 'per trip') },
        details: ['Door to terminal', 'Luggage friendly'],
      },
      {
        id: 'city-ride',
        title: 'City ride',
        description: 'Quick, everyday rides across town, whenever you need to be somewhere.',
        tag: 'R&B Go',
        offers: { ghana: gh(35, 'Accra', 'per ride'), canada: ca(13, 'Ottawa', 'per ride') },
        details: ['On-demand', 'Short & medium trips'],
      },
      {
        id: 'intercity-trip',
        title: 'Intercity trip',
        description: 'Comfortable long-distance rides between cities with experienced drivers.',
        tag: 'R&B Taxi',
        offers: { ghana: gh(1300, 'Accra to Kumasi', 'per trip'), canada: ca(430, 'Toronto to Ottawa', 'per trip') },
        details: ['Pre-booked', 'Door to door'],
      },
      {
        id: 'same-day-parcel',
        title: 'Same-day parcel',
        description: 'Pick-up from your door and delivery across the city on the same day.',
        tag: 'R&B Parcel Express',
        offers: { ghana: gh(45, 'Kumasi', 'per parcel'), canada: ca(16, 'Calgary', 'per parcel') },
        details: ['Door-to-door', 'Same-day'],
      },
      {
        id: 'scheduled-pickup',
        title: 'Scheduled pick-up',
        description: 'Book a ride or parcel collection for a set time - great for early starts.',
        tag: 'R&B Go',
        offers: { ghana: gh(60, 'Takoradi', 'per pick-up'), canada: ca(22, 'Toronto', 'per pick-up') },
        details: ['Book ahead', 'Recurring options'],
      },
      {
        id: 'business-courier',
        title: 'Business courier',
        description: 'Regular document and parcel runs for shops, offices and online sellers.',
        tag: 'R&B Parcel Express',
        offers: { ghana: gh(280, 'Accra', 'per week'), canada: ca(95, 'Ottawa', 'per week') },
        details: ['Weekly plans', 'Multiple stops'],
      },
    ],
  },
]

export const getService = (slug: string): Service | undefined => services.find((s) => s.slug === slug)

export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug)
