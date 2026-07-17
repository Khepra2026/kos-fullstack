/**
 * Utilitaires pour générer des Schema.org markup avancés
 * Optimisé pour les cabinets de conseil et services professionnels
 * Support complet des rich snippets Google 2025
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

// Real logo/OG image URL — already used in index.html as favicon and og:image
export const LOGO_IMAGE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-image-proxy?url=https%3A%2F%2Freaddy.ai%2Fapi%2Fsearch-image%3Fquery%3Dpremium%20dark%20black%20background%20with%20deloitte%20green%20geometric%20spiral%20pattern%20elegant%20minimalist%20corporate%20branding%20KHEPRA%20EXPERTS%20strategic%20consulting%20africa%20professional%20typography%20clean%20design%20high%20contrast%20dark%20green%20and%20white%20accents%20sophisticated%20modern%20aesthetic%20corporate%20identity%26width%3D1200%26height%3D630%26seq%3Dog-khepra-master-gold-v1%26orientation%3Dlandscape';

export interface OrganizationSchema {
  name: string;
  alternateName?: string;
  description?: string;
  url?: string;
  logo?: string;
  foundingDate?: string;
  numberOfEmployees?: number;
  slogan?: string;
  areaServed?: Array<{ '@type': string; name: string; identifier?: string }>;
  knowsAbout?: string[];
  contactPoint?: {
    telephone: string;
    email: string;
    contactType: string;
    areaServed?: string[];
    availableLanguage?: string[];
  };
  address?: {
    addressLocality: string;
    addressCountry: string;
    addressRegion?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  sameAs?: string[];
}

export interface ServiceSchema {
  name: string;
  serviceType: string;
  description: string;
  provider: { '@id': string };
  areaServed: Array<{ '@type': string; name: string; identifier?: string }>;
  offers?: {
    '@type': string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  wordCount?: number;
  articleBody?: string;
  keywords?: string;
}

export interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface HowToSchema {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}

export interface VideoSchema {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

/**
 * Génère le schema Organization complet avec rich snippets
 */
export function generateOrganizationSchema(data?: Partial<OrganizationSchema>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: data?.name || 'KHEPRA EXPERTS',
    alternateName: data?.alternateName || 'Khepra Experts',
    description: data?.description || 'Cabinet de conseil spécialisé en inclusion financière, fintech, transformation digitale et gouvernance en Afrique.',
    url: data?.url || SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: data?.logo || LOGO_IMAGE_URL,
      width: 250,
      height: 60,
    },
    image: {
      '@type': 'ImageObject',
      url: LOGO_IMAGE_URL,
      width: 1200,
      height: 630,
    },
    foundingDate: data?.foundingDate || '2004',
    numberOfEmployees: data?.numberOfEmployees ? {
      '@type': 'QuantitativeValue',
      value: data.numberOfEmployees,
    } : undefined,
    slogan: data?.slogan || 'Excellence, Intégrité, Impact',
    areaServed: data?.areaServed || [
      { '@type': 'Country', name: 'Togo', identifier: 'TG' },
      { '@type': 'Country', name: 'Bénin', identifier: 'BJ' },
      { '@type': 'Country', name: 'Côte d\'Ivoire', identifier: 'CI' },
      { '@type': 'Country', name: 'Burkina Faso', identifier: 'BF' },
      { '@type': 'Country', name: 'Sénégal', identifier: 'SN' },
      { '@type': 'Country', name: 'Ghana', identifier: 'GH' },
      { '@type': 'Country', name: 'Mali', identifier: 'ML' },
      { '@type': 'Country', name: 'Niger', identifier: 'NE' },
      { '@type': 'Place', name: 'West Africa' },
      { '@type': 'Place', name: 'Central Africa' },
    ],
    knowsAbout: data?.knowsAbout || [
      'Financial inclusion consulting Africa',
      'Fintech consulting Africa',
      'Digital transformation consulting',
      'Microfinance advisory',
      'SME development consulting',
      'Corporate governance',
      'Risk management',
      'Strategic consulting',
      'Regulatory compliance BCEAO',
      'UEMOA CEMAC advisory',
    ],
    contactPoint: data?.contactPoint || {
      '@type': 'ContactPoint',
      telephone: '+228-93-98-49-09',
      contactType: 'customer service',
      email: 'contact@khepraexperts.com',
      areaServed: ['TG', 'BJ', 'CI', 'BF', 'SN', 'GH', 'ML', 'NE'],
      availableLanguage: ['French', 'English'],
    },
    address: data?.address || {
      '@type': 'PostalAddress',
      addressLocality: 'Lomé',
      addressCountry: 'TG',
      addressRegion: 'Maritime',
    },
    geo: data?.geo ? {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    } : {
      '@type': 'GeoCoordinates',
      latitude: 6.1375,
      longitude: 1.2123,
    },
    sameAs: data?.sameAs || [
      'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
    ],
  };
}

/**
 * Génère le schema ProfessionalService (optimisé pour cabinets de conseil)
 */
export function generateProfessionalServiceSchema(data: ServiceSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/services/${data.serviceType.toLowerCase().replace(/\s+/g, '-')}`,
    name: data.name,
    serviceType: data.serviceType,
    description: data.description,
    provider: data.provider,
    areaServed: data.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${data.name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: data.name,
            description: data.description,
          },
        },
      ],
    },
    offers: data.offers || {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'XOF',
      },
    },
  };
}

/**
 * Génère le schema Service standard
 */
export function generateServiceSchema(data: ServiceSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    serviceType: data.serviceType,
    description: data.description,
    provider: data.provider,
    areaServed: data.areaServed,
    offers: data.offers,
  };
}

/**
 * Génère le schema Article pour les articles de blog (optimisé LinkedIn)
 */
export function generateArticleSchema(data: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: {
      '@type': 'ImageObject',
      url: data.image,
      width: 1200,
      height: 630,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: data.author,
    publisher: data.publisher,
    mainEntityOfPage: data.mainEntityOfPage,
    wordCount: data.wordCount,
    articleBody: data.articleBody,
    keywords: data.keywords,
    inLanguage: 'fr-FR',
  };
}

/**
 * Génère le schema FAQPage avec rich snippets
 */
export function generateFAQSchema(data: FAQSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Génère le schema HowTo (pour guides et tutoriels)
 */
export function generateHowToSchema(data: HowToSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Génère le schema VideoObject
 */
export function generateVideoSchema(data: VideoSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
  };
}

/**
 * Génère le schema BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; item?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * Génère le schema LocalBusiness (optimisé SEO local)
 */
export function generateLocalBusinessSchema(data?: Partial<OrganizationSchema>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: data?.name || 'KHEPRA EXPERTS',
    alternateName: data?.alternateName || 'Khepra Experts',
    description: data?.description || 'Cabinet de conseil et d\'expertise spécialisé en inclusion financière, fintech, transformation digitale, gouvernance et développement des PME en Afrique.',
    url: data?.url || SITE_URL,
    telephone: '+22893984909',
    email: 'contact@khepraexperts.com',
    foundingDate: data?.foundingDate || '2004',
    address: data?.address || {
      '@type': 'PostalAddress',
      addressLocality: 'Lomé',
      addressCountry: 'TG',
      addressRegion: 'Maritime',
    },
    geo: data?.geo ? {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    } : {
      '@type': 'GeoCoordinates',
      latitude: 6.1375,
      longitude: 1.2123,
    },
    hasMap: 'https://www.google.com/maps/place/6.1375,1.2123',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: data?.areaServed || [
      { '@type': 'Country', name: 'Togo' },
      { '@type': 'Country', name: 'Bénin' },
      { '@type': 'Country', name: 'Côte d\'Ivoire' },
      { '@type': 'Place', name: 'Afrique de l\'Ouest' },
      { '@type': 'Place', name: 'UEMOA' },
      { '@type': 'Place', name: 'CEMAC' },
    ],
    priceRange: '$$',
    image: LOGO_IMAGE_URL,
    sameAs: data?.sameAs || [
      'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
    ],
  };
}

/**
 * Génère le schema Person (pour profils d'experts)
 */
export function generatePersonSchema(data: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  alumniOf?: Array<{ name: string; description?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/about#${data.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    image: data.image,
    url: `${SITE_URL}/about`,
    sameAs: data.sameAs || [],
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
    },
    knowsLanguage: ['fr', 'en'],
    alumniOf: data.alumniOf?.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.name,
      description: edu.description,
    })),
  };
}

/**
 * Génère un schema @graph complet pour une page
 */
export function generatePageSchema(config: {
  organization?: Partial<OrganizationSchema>;
  services?: ServiceSchema[];
  article?: ArticleSchema;
  faq?: FAQSchema;
  howTo?: HowToSchema;
  video?: VideoSchema;
  breadcrumb?: Array<{ name: string; item?: string }>;
  webpage?: {
    url: string;
    name: string;
    description: string;
    inLanguage?: string;
  };
  includeLocalBusiness?: boolean;
}) {
  const graph: any[] = [];

  // Organization
  if (config.organization !== null) {
    graph.push(generateOrganizationSchema(config.organization));
  }

  // LocalBusiness
  if (config.includeLocalBusiness) {
    graph.push(generateLocalBusinessSchema(config.organization));
  }

  // Services
  if (config.services && config.services.length > 0) {
    config.services.forEach((service) => {
      graph.push(generateProfessionalServiceSchema(service));
    });
  }

  // Article
  if (config.article) {
    graph.push(generateArticleSchema(config.article));
  }

  // FAQ
  if (config.faq) {
    graph.push(generateFAQSchema(config.faq));
  }

  // HowTo
  if (config.howTo) {
    graph.push(generateHowToSchema(config.howTo));
  }

  // Video
  if (config.video) {
    graph.push(generateVideoSchema(config.video));
  }

  // WebPage
  if (config.webpage) {
    graph.push({
      '@type': 'WebPage',
      '@id': `${config.webpage.url}#webpage`,
      url: config.webpage.url,
      name: config.webpage.name,
      description: config.webpage.description,
      inLanguage: config.webpage.inLanguage || 'fr-FR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: config.breadcrumb ? generateBreadcrumbSchema(config.breadcrumb) : undefined,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Génère le schema WebSite avec SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'KHEPRA EXPERTS',
    description: 'Cabinet de conseil spécialisé en inclusion financière, fintech, transformation digitale et gouvernance en Afrique.',
    inLanguage: ['fr-FR', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export default {
  generateOrganizationSchema,
  generateServiceSchema,
  generateProfessionalServiceSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generatePersonSchema,
  generatePageSchema,
  generateWebSiteSchema,
};