/**
 * KHEPRA EXPERTS — Configuration centralisée des profils sociaux
 * Utilisé pour :
 * - Schema.org sameAs (EEAT signals)
 * - Open Graph / Twitter Cards
 * - Composants de partage social
 */

export const SOCIAL_PROFILES = {
  linkedin: {
    company: 'https://www.linkedin.com/company/khepra-experts',
    founder: 'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
  },
  twitter: {
    handle: '@KhepraExperts',
    url: 'https://twitter.com/KhepraExperts',
  },
  whatsapp: {
    number: '22893984909',
    message: encodeURIComponent('Bonjour KHEPRA EXPERTS, je souhaite échanger sur vos services.'),
  },
};

export const BRAND_INFO = {
  name: 'KHEPRA EXPERTS',
  legalName: 'KHEPRA EXPERTS SARL',
  founder: 'SIMDA Essoyomewe',
  foundingDate: '2002',
  email: 'contact@khepraexperts.com',
  phone: '+228 93 98 49 09',
  address: {
    street: 'LOGOGOMÈ, Rue CARREFOUR AISED',
    locality: 'Lomé',
    region: 'Maritime',
    country: 'TG',
    postalCode: '00228',
  },
  geo: {
    latitude: 6.1375,
    longitude: 1.2123,
  },
  siteUrl: 'https://khepraexperts.com',
  tagline: 'Cabinet de référence en Gouvernance, Conformité BCEAO/COBAC, Due Diligence & Investment Readiness en Afrique francophone',
  description: 'KHEPRA EXPERTS est un cabinet boutique de conseil stratégique, financier et réglementaire. 22 ans\'expertise, 15 pays couverts, 500+ missions. Conformité BCEAO/COBAC, Due Diligence, ESG, Investment Readiness, Structuration Financière.',
  areasServed: [
    'Togo', 'Bénin', 'Côte d\'Ivoire', 'Sénégal', 'Burkina Faso',
    'Mali', 'Cameroun', 'Gabon', 'Congo', 'Guinée', 'Niger',
    'Tchad', 'Guinée-Bissau', 'Guinée Équatoriale',
  ],
  certifications: [
    'ISO 20700 (Management Consulting)',
    'Membre ATAF (African Tax Administration Forum)',
    'Membre IIA (Institute of Internal Auditors)',
  ],
};

/**
 * Generate the full sameAs array for Schema.org Organization
 */
export function getSameAsArray(): string[] {
  return [
    SOCIAL_PROFILES.linkedin.company,
    SOCIAL_PROFILES.linkedin.founder,
    SOCIAL_PROFILES.twitter.url,
  ];
}

/**
 * Generate Person Schema for the founder
 */
export function getFounderSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || BRAND_INFO.siteUrl;
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person-simda`,
    name: BRAND_INFO.founder,
    jobTitle: 'Directeur Associé & Fondateur',
    worksFor: {
      '@type': 'Organization',
      name: BRAND_INFO.name,
      url: siteUrl,
    },
    sameAs: SOCIAL_PROFILES.linkedin.founder,
    knowsAbout: [
      'Gouvernance d\'entreprise Afrique',
      'Conformité BCEAO COBAC',
      'Due Diligence investisseur',
      'Prix de transfert BEPS OCDE',
      'Structuration financière OHADA',
      'Investment Readiness',
      'ESG IFC GRI ISSB',
      'Gouvernance groupes familiaux',
      'CEO Advisory Board',
      'Microfinance SFD EMF',
    ],
  };
}

/**
 * Generate Organization Schema with full EEAT signals
 */
export function getOrganizationSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || BRAND_INFO.siteUrl;
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: BRAND_INFO.name,
    legalName: BRAND_INFO.legalName,
    url: siteUrl,
    logo: `${siteUrl}/images/hero-executive.webp`,
    email: BRAND_INFO.email,
    telephone: BRAND_INFO.phone,
    foundingDate: BRAND_INFO.foundingDate,
    description: BRAND_INFO.description,
    slogan: BRAND_INFO.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND_INFO.address.street,
      addressLocality: BRAND_INFO.address.locality,
      addressRegion: BRAND_INFO.address.region,
      postalCode: BRAND_INFO.address.postalCode,
      addressCountry: BRAND_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BRAND_INFO.geo.latitude,
      longitude: BRAND_INFO.geo.longitude,
    },
    sameAs: getSameAsArray(),
    founder: getFounderSchema(),
    areaServed: BRAND_INFO.areasServed.map(country => ({
      '@type': 'Country',
      name: country,
    })),
    knowsAbout: [
      'Conformité réglementaire BCEAO COBAC Afrique',
      'Due Diligence investisseur Afrique francophone',
      'Prix de transfert BEPS OCDE Action 13',
      'Gouvernance d\'entreprise OHADA UEMOA CEMAC',
      'Investment Readiness levée de fonds Afrique',
      'ESG IFC GRI ISSB conformité extra-financière',
      'Gouvernance groupes familiaux Afrique',
      'CEO Advisory Board conseil stratégique dirigeants',
      'Microfinance SFD EMF agrément BCEAO COBAC',
      'Structuration financière SYSCOHADA OHADA',
      'Audit pré-inspection BCEAO COBAC',
      'Family Office Afrique francophone',
      'RegTech regulatory engineering Afrique',
      'Transformation digitale secteur financier Afrique',
      'Stratégie B2B cabinets conseil Afrique',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'ISO 20700 — Management Consulting',
        recognizedBy: {
          '@type': 'Organization',
          name: 'ISO (International Organization for Standardization)',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'membership',
        name: 'Membre ATAF (African Tax Administration Forum)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'ATAF',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'membership',
        name: 'Membre IIA (Institute of Internal Auditors)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'IIA',
        },
      },
    ],
    owns: {
      '@type': 'SoftwareApplication',
      name: 'KOS AI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${BRAND_INFO.siteUrl}/kos-ai`,
      description: 'KOS AI : plateforme d\'intelligence réglementaire, gouvernance et conformité pour l\'Afrique francophone. Moteur RAG, agents autonomes, veille réglementaire temps réel.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'XOF',
      },
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    knowsLanguage: ['fr', 'en'],
  };
}

/**
 * Generate WebSite schema
 */
export function getWebSiteSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || BRAND_INFO.siteUrl;
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: BRAND_INFO.name,
    description: BRAND_INFO.description,
    inLanguage: ['fr-FR', 'en-US'],
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Get LinkedIn share URL
 */
export function getLinkedInShareUrl(pageUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
}

/**
 * Get Twitter/X share URL
 */
export function getTwitterShareUrl(pageUrl: string, title: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}&via=KhepraExperts`;
}

/**
 * Get WhatsApp share URL
 */
export function getWhatsAppShareUrl(pageUrl: string, title: string): string {
  const text = encodeURIComponent(`${title}\n\n${pageUrl}`);
  return `https://wa.me/?text=${text}`;
}

/**
 * Generate ProfessionalService Schema (LocalBusiness) with full EEAT signals
 */
export function getProfessionalServiceSchema() {
  const siteUrl = import.meta.env.VITE_SITE_URL || BRAND_INFO.siteUrl;
  return {
    '@type': 'ProfessionalService',
    name: BRAND_INFO.name,
    alternateName: 'KHEPRA',
    url: siteUrl,
    logo: `${siteUrl}/images/hero-executive.webp`,
    image: `${siteUrl}/images/hero-executive.webp`,
    description: BRAND_INFO.description,
    foundingDate: BRAND_INFO.foundingDate,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND_INFO.address.street,
      addressLocality: BRAND_INFO.address.locality,
      addressRegion: BRAND_INFO.address.region,
      postalCode: BRAND_INFO.address.postalCode,
      addressCountry: BRAND_INFO.address.country,
    },
    telephone: BRAND_INFO.phone,
    email: BRAND_INFO.email,
    openingHours: 'Mo,Tu,We,Th,Fr 08:00-18:00',
    priceRange: '\u20AC\u20AC\u20AC',
    currenciesAccepted: 'EUR, XOF, USD',
    paymentAccepted: 'Virement bancaire, Mobile Money',
    areaServed: {
      '@type': 'Place',
      name: 'Afrique Francophone',
      containedInPlace: {
        '@type': 'Continent',
        name: 'Africa',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services KHEPRA EXPERTS',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Intelligence Reglementaire UEMOA/CEMAC' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Due Diligence Reglementaire' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Conseil en Gouvernance OHADA' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Conformite ESG & Durabilite' },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '10',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Jean K.' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Expertise reglementaire BCEAO impeccable. Notre banque a obtenu son agrement en 3 mois grace a leur accompagnement.',
        datePublished: '2026-05-15',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Aminata D.' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'L\'equipe KHEPRA a structure notre gouvernance d\'entreprise selon les standards COBAC. Un vrai partenaire strategique.',
        datePublished: '2026-04-22',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Pierre M.' },
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        reviewBody: 'Diagnostic ESG complet et actionnable. La matrice risques/opportunites a convaincu nos investisseurs.',
        datePublished: '2026-03-10',
      },
    ],
    sameAs: getSameAsArray(),
    knowsAbout: [
      'Regulation financiere BCEAO',
      'Conformite COBAC CEMAC',
      'Gouvernance OHADA',
      'Conformite GAFI / LBC-FT',
      'Conseil strategique Afrique',
      'Due diligence reglementaire',
      'ESG & Durabilite',
      'Transformation digitale',
    ],
  };
}