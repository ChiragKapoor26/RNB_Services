export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalDoc {
  title: string
  description: string
  updated: string
  reviewNotice: string
  sections: LegalSection[]
}

const REVIEW_NOTICE =
  'Draft placeholder text. This page has not been reviewed by a lawyer and must be reviewed and approved by the client and qualified legal counsel before launch.'

export const about = {
  title: 'About R&B Services',
  description: 'R&B Services is an all-in-one services marketplace connecting people in Ghana and Canada with trusted local providers.',
  lead: 'We make finding trusted local help simple - wherever home is.',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'R&B Services is an all-in-one app and marketplace for Ghana and Canada. We connect everyday people with trusted local providers - suppliers, professionals, repairers, chefs, sellers and drivers.',
        'We are a connector. The providers on our platform are independent, and they set their own prices. R&B introduces you to them and charges a small, transparent connection fee.',
      ],
    },
    {
      heading: 'Why we exist',
      paragraphs: [
        'Finding someone reliable shouldn’t depend on who you happen to know. We believe good local businesses and everyday customers deserve an easier way to meet - with clear, honest pricing on our side of the deal.',
        'Many of us live between Ghana and Canada. R&B is built for that reality: one brand, familiar services and the same standards in both countries.',
      ],
    },
    {
      heading: 'What we value',
      paragraphs: [
        'Transparency about how we earn. Respect for local providers and their craft. Simple technology that works on any phone. And honest communication - we will always tell you what we know and what we don’t.',
      ],
    },
  ] as LegalSection[],
}

export const privacy: LegalDoc = {
  title: 'Privacy policy',
  description: 'How R&B Services Online collects, uses and protects your personal information.',
  updated: 'Draft - last updated 17 November 2026',
  reviewNotice: REVIEW_NOTICE,
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'R&B Services Online ("R&B", "we", "us") operates rnbservices.online. This policy explains what personal information we collect through this website and how we use it. [TODO(client): insert the legal entity name, registered address and data-protection contact.]',
      ],
    },
    {
      heading: 'What we collect',
      paragraphs: [
        'Enquiry form: your name, email address, phone / WhatsApp number, country, the service you are interested in and your message.',
        'RNB Bot chat: the messages you type. Chat history is kept only in your browser while the page is open. Messages are sent to our server and to an AI service provider (DeepSeek) to generate replies. Please do not share sensitive personal information in chat.',
        'Technical data: like most websites, our hosting provider may log your IP address and basic request information for security and reliability.',
        'Google Maps: when you view the map, Google may collect data according to its own privacy policy.',
      ],
    },
    {
      heading: 'How we use it',
      paragraphs: [
        'To respond to your enquiry and connect you with a suitable provider; to send you a confirmation of your enquiry; to keep the website secure and prevent abuse; and to improve our service. We do not sell your personal information.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We may share the details of your enquiry with the provider we connect you with, and with service providers that help us run the website (for example email delivery, hosting and AI chat). They may only use the data to provide those services.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Depending on where you live you have rights to access, correct or delete your personal information and to withdraw consent. Our practices are intended to follow Ghana’s Data Protection Act, 2012 (Act 843) and Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA). [TODO(counsel): confirm applicable laws, retention periods and any required registrations.]',
        'To exercise your rights, contact us through the enquiry form and mention "privacy request".',
      ],
    },
    {
      heading: 'Retention & security',
      paragraphs: [
        'We keep enquiries only as long as needed to respond and for reasonable business records. We use reasonable technical and organisational measures to protect your information, but no online service can be completely secure. [TODO(counsel): add specific retention periods.]',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: ['We may update this policy from time to time. The latest version will always be on this page.'],
    },
  ],
}

export const terms: LegalDoc = {
  title: 'Terms of use',
  description: 'The terms that apply when you use the R&B Services Online website.',
  updated: 'Draft - last updated 17 November 2026',
  reviewNotice: REVIEW_NOTICE,
  sections: [
    {
      heading: 'About these terms',
      paragraphs: [
        'By using rnbservices.online you agree to these terms. If you do not agree, please do not use the website.',
      ],
    },
    {
      heading: 'What R&B does',
      paragraphs: [
        'R&B is a connector and marketplace. We introduce you to independent local providers and charge a small connection fee. We are not the provider of the goods or services, and we are not a party to the agreement between you and the provider.',
      ],
    },
    {
      heading: 'Fees',
      paragraphs: [
        'A small connection fee applies when you book through R&B and will be shown to you before you confirm. The provider’s own price is agreed directly with you. This website does not take payments.',
      ],
    },
    {
      heading: 'Sample listings and information',
      paragraphs: [
        'Listings, prices and images on this website are illustrative samples unless stated otherwise. Prices are indicative "from" prices and may change. Always confirm details with the provider.',
        'Health & wellness information is not medical advice. In an emergency, call your local emergency number.',
      ],
    },
    {
      heading: 'Your responsibilities',
      paragraphs: [
        'Provide accurate information in enquiries, treat providers respectfully, check credentials and inspect goods (including vehicles and properties) before paying, and do not misuse the website or RNB Bot.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'To the extent permitted by law, R&B is not liable for the acts, omissions, quality, safety or legality of services and goods provided by independent providers, or for losses arising from your use of the website. [TODO(counsel): review limitation-of-liability wording for Ghana and Canada.]',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: ['[TODO(counsel): specify governing law and dispute-resolution arrangements.]'],
    },
  ],
}
