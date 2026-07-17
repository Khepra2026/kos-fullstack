/**
 * Génère des objets Schema.org JSON-LD enrichis pour les pages de service KHEPRA EXPERTS.
 * Inclut : Service, ServicePage, WebPage, BreadcrumbList, FAQPage, HowTo, Offer + PriceRange
 * Objectif : rich snippets Google + boost SEO local Afrique (UEMOA/CEMAC)
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export interface ServiceSchemaOptions {
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  serviceType: string;
  breadcrumbLabel: string;
  breadcrumbLabelEn?: string;
  /** ISO 8601 duration (ex: "P3M" = 3 months) */
  duration?: string;
  /** Human-readable duration for display */
  durationLabel?: string;
  /** Target sectors */
  sectors?: string[];
  /** FAQ items */
  faq?: Array<{ question: string; answer: string }>;
  /** Process steps (HowTo) */
  steps?: Array<{ name: string; text: string }>;
  /** Additional SEO keywords */
  keywords?: string[];
  /**
   * Price range indicator (e.g. "XOF 500,000 – XOF 5,000,000")
   * Used for priceRange on ServicePage
   */
  priceRange?: string;
}

// ── Shared organization node ────────────────────────────────────────────────
const ORGANIZATION = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'KHEPRA EXPERTS',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/hero-executive.webp`,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lomé',
    addressLocality: 'Lomé',
    addressRegion: 'Maritime',
    addressCountry: 'TG',
    postalCode: '00228',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.1256,
    longitude: 1.2223,
  },
  telephone: '+22893984909',
  email: 'contact@khepraexperts.com',
  foundingDate: '2002',
  sameAs: [
    'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
    'https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/',
  ],
};

// ── Countries/places covered by KHEPRA EXPERTS ─────────────────────────────
const AREA_SERVED = [
  // UEMOA zone
  { '@type': 'Country', name: 'Togo', identifier: 'TG' },
  { '@type': 'Country', name: 'Bénin', identifier: 'BJ' },
  { '@type': 'Country', name: "Côte d'Ivoire", identifier: 'CI' },
  { '@type': 'Country', name: 'Burkina Faso', identifier: 'BF' },
  { '@type': 'Country', name: 'Sénégal', identifier: 'SN' },
  { '@type': 'Country', name: 'Mali', identifier: 'ML' },
  { '@type': 'Country', name: 'Niger', identifier: 'NE' },
  { '@type': 'Country', name: 'Guinée-Bissau', identifier: 'GW' },
  // CEMAC / Central Africa
  { '@type': 'Country', name: 'Gabon', identifier: 'GA' },
  { '@type': 'Country', name: 'Cameroun', identifier: 'CM' },
  { '@type': 'Country', name: 'Congo', identifier: 'CG' },
  { '@type': 'Country', name: 'République Démocratique du Congo', identifier: 'CD' },
  { '@type': 'Country', name: 'Tchad', identifier: 'TD' },
  // Other
  { '@type': 'Country', name: 'Ghana', identifier: 'GH' },
  { '@type': 'Country', name: 'Guinée', identifier: 'GN' },
];

// ── Geographic region nodes ─────────────────────────────────────────────────
const AREA_SERVED_REGIONS = [
  {
    '@type': 'AdministrativeArea',
    name: 'UEMOA',
    description: 'Union Économique et Monétaire Ouest-Africaine',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'CEMAC',
    description: 'Communauté Économique et Monétaire de l\'Afrique Centrale',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'West Africa',
    alternateName: 'Afrique de l\'Ouest',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Central Africa',
    alternateName: 'Afrique Centrale',
  },
];

// ── Main schema builder ─────────────────────────────────────────────────────
export function buildServiceSchema(opts: ServiceSchemaOptions) {
  const {
    slug,
    name,
    nameEn,
    description,
    descriptionEn,
    serviceType,
    breadcrumbLabel,
    breadcrumbLabelEn,
    duration = 'P3M',
    durationLabel,
    sectors = ['Finance', 'Microfinance', 'PME', 'Secteur Public'],
    faq = [],
    steps = [],
    keywords = [],
    priceRange = 'XOF 300,000 – XOF 15,000,000',
  } = opts;

  const pageUrl = `${SITE_URL}/services/${slug}`;
  const resolvedNameEn = nameEn || name;
  const resolvedDescEn = descriptionEn || description;
  const resolvedBreadcrumbEn = breadcrumbLabelEn || breadcrumbLabel;

  const graph: object[] = [
    // ── 1. Service ─────────────────────────────────────────────────────
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name,
      alternateName: resolvedNameEn,
      description,
      serviceType,
      url: pageUrl,
      provider: ORGANIZATION,
      areaServed: [
        ...AREA_SERVED,
        ...AREA_SERVED_REGIONS,
      ],
      audience: {
        '@type': 'Audience',
        audienceType: sectors.join(', '),
        geographicArea: {
          '@type': 'AdministrativeArea',
          name: 'West and Central Africa',
        },
      },
      ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
      offers: {
        '@type': 'Offer',
        '@id': `${pageUrl}#offer`,
        name: `${name} — KHEPRA EXPERTS`,
        description,
        url: pageUrl,
        seller: ORGANIZATION,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'XOF',
        priceRange,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'XOF',
          description: 'Devis sur mesure selon le périmètre de la mission. Diagnostic initial gratuit (30 min).',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitText: 'mission',
          },
        },
        eligibleRegion: [
          ...AREA_SERVED,
          ...AREA_SERVED_REGIONS,
        ],
        eligibleCustomerType: sectors,
        businessFunction: 'https://purl.org/goodrelations/v1#ProvideService',
        itemOffered: {
          '@type': 'Service',
          name,
          description,
        },
      },
      ...(durationLabel && {
        additionalProperty: {
          '@type': 'PropertyValue',
          name: 'Durée estimée',
          value: durationLabel,
        },
      }),
      termsOfService: `${SITE_URL}/legal`,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services KHEPRA EXPERTS',
        url: `${SITE_URL}/services`,
      },
    },

    // ── 2. ServicePage (enriched, replaces WebPage for service pages) ───
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${name} | KHEPRA EXPERTS`,
      alternateName: `${resolvedNameEn} | KHEPRA EXPERTS`,
      description,
      inLanguage: ['fr-FR', 'en'],
      dateModified: new Date().toISOString().split('T')[0],
      datePublished: '2024-01-01',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'KHEPRA EXPERTS',
        publisher: ORGANIZATION,
        inLanguage: ['fr-FR', 'en'],
      },
      about: {
        '@id': `${pageUrl}#service`,
      },
      breadcrumb: {
        '@id': `${pageUrl}#breadcrumb`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/hero-executive.webp`,
        width: 1440,
        height: 900,
      },
      mentions: ORGANIZATION,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.service-description'],
      },
    },

    // ── 3. BreadcrumbList (bilingual via alternateName) ─────────────────
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          alternateName: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${SITE_URL}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: breadcrumbLabel,
          alternateName: resolvedBreadcrumbEn,
          item: pageUrl,
        },
      ],
    },

    // ── 4. LocalBusiness specialization ────────────────────────────────
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'KHEPRA EXPERTS',
      description: "Cabinet de référence en Due Diligence, ESG Advisory, Investment Readiness et Gouvernance en Afrique francophone. Expertise BCEAO, COBAC, OHADA, IFC, GRI, ISSB. 22+ ans d'expérience réglementaire terrain.",
      url: SITE_URL,
      telephone: '+22893984909',
      email: 'contact@khepraexperts.com',
      priceRange,
      currenciesAccepted: 'XOF, USD, EUR',
      paymentAccepted: 'Invoice, Bank Transfer',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lomé',
        addressRegion: 'Maritime',
        addressCountry: 'TG',
        postalCode: '00228',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 6.1256,
        longitude: 1.2223,
      },
      areaServed: AREA_SERVED,
      hasMap: 'https://maps.google.com/?q=Lomé,Togo',
      sameAs: ['https://www.linkedin.com/in/essoyom%C3%A8w%C3%A8-simda-650a5142/'],
    },
  ];

  // ── 5. FAQPage (if FAQ provided) ────────────────────────────────────
  if (faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      name: `FAQ — ${name}`,
      alternateName: `FAQ — ${resolvedNameEn}`,
      inLanguage: ['fr-FR', 'en'],
      mainEntity: faq.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  // ── 6. HowTo (if steps provided) ────────────────────────────────────
  if (steps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: `Comment fonctionne notre service ${name}`,
      alternateName: `How our ${resolvedNameEn} service works`,
      description: `Processus d'accompagnement KHEPRA EXPERTS pour le service ${name}`,
      inLanguage: ['fr-FR', 'en'],
      totalTime: duration,
      supply: {
        '@type': 'HowToSupply',
        name: 'Votre organisation',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Expertise KHEPRA EXPERTS — 22+ ans terrain Afrique',
      },
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
        url: pageUrl,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

// ── Per-service enriched schemas ────────────────────────────────────────────

export const SERVICE_SCHEMAS = {
  'conseil-strategique': buildServiceSchema({
    slug: 'conseil-strategique',
    name: 'Conseil Stratégique & ESG Advisory',
    nameEn: 'Strategic & ESG Advisory',
    description: 'Conseil stratégique et ESG Advisory pour investisseurs, entreprises et institutions en Afrique francophone. Alignement avec les standards IFC, GRI, ISSB, SASB, TCFD et BCEAO ESG. Plan stratégique 3-5 ans avec objectifs ESG, PGES conforme aux Normes de Performance IFC, et reporting GRI/ISSB pour investisseurs institutionnels.',
    descriptionEn: 'Strategic advisory and ESG consulting for investors, companies and institutions in Francophone Africa. Alignment with IFC, GRI, ISSB, SASB, TCFD and BCEAO ESG standards. 3-5 year strategic plan with ESG objectives, ESMP compliant with IFC Performance Standards, and GRI/ISSB reporting for institutional investors.',
    serviceType: 'Strategic Advisory & ESG Consulting',
    breadcrumbLabel: 'Conseil Stratégique & ESG Advisory',
    breadcrumbLabelEn: 'Strategic & ESG Advisory',
    duration: 'P6M',
    durationLabel: '3 à 12 mois / 3 to 12 months',
    priceRange: 'XOF 1,500,000 – XOF 15,000,000',
    sectors: ['Investisseurs', 'Entreprises', 'IMF', 'Projets industriels', 'Institutions publiques'],
    keywords: ['ESG advisory Afrique', 'conseil stratégique ESG', 'ESG IFC PS 1-8', 'reporting GRI ISSB', 'PGES conforme', 'BCEAO ESG', 'fonds impact Afrique', 'standards ESG UEMOA'],
    faq: [
      {
        question: "Qu'est-ce que l'ESG Advisory pour une entreprise africaine ?",
        answer: "L'ESG Advisory consiste à accompagner une organisation dans l'intégration des critères Environnement, Social et Gouvernance dans sa stratégie et ses opérations. En Afrique francophone, cela inclut l'alignement avec les Normes de Performance IFC (PS 1-8), les standards GRI, ISSB S1/S2, SASB et les exigences ESG de la BCEAO et du COBAC. Un positionnement ESG solide est indispensable pour accéder aux financements DFI (BOAD, IFC, Proparco, DEG).",
      },
      {
        question: "Pourquoi les DFI (BOAD, IFC, Proparco) exigent-ils une conformité ESG ?",
        answer: "Les institutions de financement du développement appliquent les Normes de Performance IFC (PS 1-8) comme condition d'accès à leurs financements. Ces normes couvrent l'évaluation des risques environnementaux et sociaux, la préservation de la biodiversité, les droits des communautés et des travailleurs, et la divulgation d'informations. Sans plan de gestion environnementale et sociale (PGES), les projets ne peuvent obtenir de financement DFI.",
      },
      {
        question: "Quelle est la différence entre GRI, ISSB et IFC pour l'ESG en Afrique ?",
        answer: "Le GRI (Global Reporting Initiative) est le standard de référence pour la divulgation d'informations ESG. Les normes ISSB S1 (informations financières générales) et S2 (risques climatiques) sont les nouvelles normes comptables ESG adoptées par les régulateurs internationaux. Les Normes de Performance IFC (PS 1-8) sont les standards opérationnels exigés par les DFI pour les projets. En Afrique francophone, la BCEAO intègre progressivement ces standards dans ses exigences prudentielles.",
      },
      {
        question: "Combien coûte une mission de conseil stratégique ESG en Afrique ?",
        answer: "Les honoraires varient selon le périmètre : un diagnostic ESG rapide (6-8 semaines) représente un investissement différent d'un programme ESG complet avec plan de gestion, reporting GRI et accompagnement sur 12 mois. Nous proposons systématiquement un diagnostic flash gratuit pour évaluer vos besoins avant tout engagement. Nos tarifs sont adaptés aux réalités des marchés africains.",
      },
      {
        question: "Quel est le lien entre stratégie d'entreprise et ESG en Afrique ?",
        answer: "En Afrique francophone, l'ESG n'est plus un simple outil de communication. C'est un impératif stratégique pour accéder aux marchés de capitaux internationaux, aux financements DFI, aux fonds d'impact et aux partenariats stratégiques. Les entreprises avec un solide positionnement ESG accèdent à des financements moins chers, bénéficient d'une meilleure réputation et attirent des talents de qualité. Notre approche intègre l'ESG comme levier de création de valeur, pas comme contrainte.",
      },
    ],
    steps: [
      { name: 'Diagnostic stratégique & ESG', text: "Analyse SWOT, benchmark concurrentiel, évaluation de la maturité ESG, audit d'éligibilité aux financements DFI et identification des 3 leviers de croissance prioritaires." },
      { name: 'Vision, Positionnement & Feuille de route ESG', text: 'Co-construction de la vision à 3–5 ans, stratégie de positionnement différenciant, plan d\'intégration ESG et alignement sur les standards IFC/GRI/ISSB.' },
      { name: 'Plan stratégique pluriannuel', text: 'Plan stratégique avec objectifs ESG, KPI actionnables, jalons trimestriels, budget prévisionnel aligné sur les cibles et PGES (Plan de Gestion Environnementale et Sociale).' },
      { name: 'Déploiement, Pilotage & Reporting ESG', text: 'Accompagnement à l\'exécution, revues trimestrielles, reporting ESG (GRI/ISSB), communication avec les investisseurs DFI et amélioration continue de la performance ESG.' },
    ],
  }),

  'gestion-de-projets': buildServiceSchema({
    slug: 'gestion-de-projets',
    name: 'Gestion de Projets',
    nameEn: 'Project Management',
    description: 'Pilotage et gestion de projets complexes pour organisations africaines. Méthodologies PMI, PRINCE2 et agile adaptées au contexte africain. 90% des projets livrés dans les délais.',
    descriptionEn: 'Project management for complex transformation initiatives in Africa. PMI, PRINCE2 and Agile methodologies. 90% on-time delivery rate.',
    serviceType: 'Project Management',
    breadcrumbLabel: 'Gestion de Projets',
    breadcrumbLabelEn: 'Project Management',
    duration: 'P6M',
    durationLabel: 'Variable selon le projet',
    priceRange: 'XOF 800,000 – XOF 10,000,000',
    sectors: ['Institutions financières', 'Secteur public', 'ONG', 'PME'],
    keywords: ['gestion de projets Afrique', 'chef de projet Togo', 'PMI PRINCE2 Afrique', 'pilotage projet UEMOA', 'project management Africa'],
    faq: [
      {
        question: 'Quelles méthodologies de gestion de projets utilisez-vous ?',
        answer: 'KHEPRA EXPERTS maîtrise les méthodologies PMI (PMBOK), PRINCE2 et les approches agiles (Scrum, Kanban). Nous adaptons la méthodologie au contexte et à la culture organisationnelle africaine pour garantir l\'adhésion des équipes.',
      },
      {
        question: 'Pouvez-vous gérer des projets financés par des bailleurs internationaux ?',
        answer: 'Oui, nous avons une expertise avérée dans la gestion de projets financés par la Banque Mondiale, l\'AFD, l\'USAID, le PNUD et d\'autres bailleurs. Nous maîtrisons leurs exigences en matière de reporting, de passation de marchés et de gestion financière.',
      },
      {
        question: 'Comment assurez-vous le suivi et le reporting des projets ?',
        answer: 'Nous mettons en place des tableaux de bord de pilotage, des rapports d\'avancement périodiques et des revues de projet régulières. Nous utilisons des outils de gestion de projet adaptés et formons vos équipes à leur utilisation.',
      },
    ],
    steps: [
      { name: 'Cadrage du projet', text: 'Définition du périmètre, des objectifs, des parties prenantes et du plan de projet détaillé.' },
      { name: 'Planification', text: 'Élaboration du planning, du budget, du plan de gestion des risques et du plan de communication.' },
      { name: 'Exécution & Pilotage', text: 'Coordination des équipes, suivi de l\'avancement, gestion des risques et reporting aux parties prenantes.' },
      { name: 'Clôture & Capitalisation', text: 'Livraison des résultats, évaluation finale, documentation des leçons apprises et transfert de compétences.' },
    ],
  }),

  'developpement-organisationnel': buildServiceSchema({
    slug: 'developpement-organisationnel',
    name: 'Développement Organisationnel',
    nameEn: 'Organizational Development',
    description: 'Accompagnement au développement organisationnel pour renforcer la performance et la gouvernance des organisations africaines. +30% d\'efficacité opérationnelle observée.',
    descriptionEn: 'Organizational development consulting to strengthen performance and governance of African organizations. +30% operational efficiency observed.',
    serviceType: 'Organizational Development',
    breadcrumbLabel: 'Développement Organisationnel',
    breadcrumbLabelEn: 'Organizational Development',
    duration: 'P4M',
    durationLabel: '2 à 4 mois / 2 to 4 months',
    priceRange: 'XOF 1,000,000 – XOF 8,000,000',
    sectors: ['Institutions financières', 'ONG', 'Secteur public', 'PME'],
    keywords: ['développement organisationnel Afrique', 'restructuration organisation', 'gouvernance entreprise Togo', 'performance organisationnelle UEMOA', 'organizational development Africa'],
    faq: [
      {
        question: "Qu'est-ce que le développement organisationnel ?",
        answer: "Le développement organisationnel est un ensemble d'interventions planifiées visant à améliorer la performance, la gouvernance et la culture d'une organisation. Chez KHEPRA EXPERTS, cela inclut la révision des structures, des processus, des systèmes de management et de la culture organisationnelle.",
      },
      {
        question: 'Comment KHEPRA EXPERTS améliore-t-il la gouvernance des organisations ?',
        answer: "Nous intervenons sur la clarification des rôles et responsabilités, la mise en place de comités de gouvernance, l'élaboration de chartes et de politiques, et le renforcement des mécanismes de contrôle interne conformément aux standards BCEAO et internationaux.",
      },
      {
        question: 'Combien de temps dure une mission de développement organisationnel ?',
        answer: "Une mission de développement organisationnel dure généralement de 3 à 6 mois pour la phase de diagnostic et de conception, suivie d'un accompagnement à la mise en œuvre de 6 à 12 mois selon la complexité des changements à opérer.",
      },
    ],
    steps: [
      { name: 'Diagnostic organisationnel', text: 'Évaluation de la structure, des processus, de la gouvernance et de la culture organisationnelle.' },
      { name: 'Conception du modèle cible', text: 'Définition de la structure organisationnelle cible, des processus optimisés et du système de gouvernance.' },
      { name: 'Plan de transformation', text: 'Élaboration du plan de changement organisationnel avec jalons, responsabilités et indicateurs.' },
      { name: 'Accompagnement au changement', text: 'Soutien aux équipes dans l\'adoption des nouvelles structures, processus et pratiques de gouvernance.' },
    ],
  }),

  'renforcement-capacites': buildServiceSchema({
    slug: 'renforcement-capacites',
    name: 'Renforcement des Capacités',
    nameEn: 'Capacity Building',
    description: 'Programmes de renforcement des capacités et formation professionnelle pour organisations africaines. Formation en gouvernance, finance, management et transformation digitale. 97% de satisfaction.',
    descriptionEn: 'Capacity building and professional training programs for African organizations. Training in governance, finance, management and digital transformation. 97% satisfaction rate.',
    serviceType: 'Capacity Building',
    breadcrumbLabel: 'Renforcement des Capacités',
    breadcrumbLabelEn: 'Capacity Building',
    duration: 'P2M',
    durationLabel: 'Variable — présentiel, distanciel ou hybride',
    priceRange: 'XOF 300,000 – XOF 5,000,000',
    sectors: ['Institutions financières', 'ONG', 'Secteur public', 'PME', 'Coopératives'],
    keywords: ['renforcement capacités Afrique', 'formation professionnelle Togo', 'formation gouvernance UEMOA', 'capacity building Africa', 'formation microfinance'],
    faq: [
      {
        question: 'Quels types de formations proposez-vous ?',
        answer: "KHEPRA EXPERTS propose des formations en gouvernance d'entreprise, management stratégique, gestion financière, conformité réglementaire BCEAO, transformation digitale, gestion de projets et leadership. Nos formations sont adaptées au contexte africain et disponibles en présentiel et en ligne.",
      },
      {
        question: 'Vos formations sont-elles certifiantes ?',
        answer: "Certaines de nos formations donnent lieu à des attestations de participation reconnues. Nous travaillons également avec des organismes de certification internationaux pour proposer des formations certifiantes en gestion de projets (PMI) et en gouvernance.",
      },
      {
        question: 'Pouvez-vous former des équipes entières sur site ?',
        answer: "Oui, nous proposons des formations intra-entreprise sur site, adaptées aux besoins spécifiques de votre organisation. Nous pouvons former des équipes de 5 à 50 personnes avec des approches pédagogiques variées : ateliers, études de cas, simulations et coaching.",
      },
    ],
    steps: [
      { name: 'Analyse des besoins', text: 'Évaluation des compétences existantes et identification des gaps à combler pour atteindre les objectifs organisationnels.' },
      { name: 'Conception du programme', text: "Élaboration d'un programme de formation sur mesure avec objectifs pédagogiques, contenus et modalités adaptés." },
      { name: 'Déploiement des formations', text: 'Animation des sessions de formation en présentiel ou en ligne avec des formateurs experts du contexte africain.' },
      { name: 'Évaluation & Suivi', text: "Mesure de l'impact des formations sur les compétences et la performance, avec un suivi post-formation." },
    ],
  }),

  'diagnostic-organisationnel': buildServiceSchema({
    slug: 'diagnostic-organisationnel',
    name: 'Diagnostic Organisationnel',
    nameEn: 'Organizational Diagnostic',
    description: "Diagnostic organisationnel complet en 4–8 semaines : 6 dimensions analysées, 3–5 leviers de croissance identifiés. Plan d'action 30j/90j/6 mois. Institutions financières et PME en Afrique.",
    descriptionEn: 'Complete organizational diagnostic in 4–8 weeks: 6 dimensions analyzed, 3–5 growth levers identified. 30d/90d/6-month action plan. Financial institutions and SMEs in Africa.',
    serviceType: 'Organizational Diagnostic',
    breadcrumbLabel: 'Diagnostic Organisationnel',
    breadcrumbLabelEn: 'Organizational Diagnostic',
    duration: 'P2M',
    durationLabel: '4 à 8 semaines / 4 to 8 weeks',
    priceRange: 'XOF 500,000 – XOF 5,000,000',
    sectors: ['Institutions financières', 'Microfinance', 'PME', 'ONG', 'Secteur public'],
    keywords: ['diagnostic organisationnel Afrique', 'audit organisation Togo', 'évaluation performance organisation', 'diagnostic SFD BCEAO', 'organizational diagnostic Africa'],
    faq: [
      {
        question: "Qu'est-ce qu'un diagnostic organisationnel ?",
        answer: "Un diagnostic organisationnel est une évaluation systématique de la structure, des processus, de la gouvernance, des ressources humaines et de la performance d'une organisation. Il permet d'identifier les forces, les faiblesses et les axes d'amélioration prioritaires.",
      },
      {
        question: "Quelle est la durée d'un diagnostic organisationnel ?",
        answer: "Un diagnostic organisationnel complet dure généralement de 4 à 8 semaines selon la taille et la complexité de l'organisation. Il comprend des entretiens, des analyses documentaires, des observations terrain et la rédaction du rapport de diagnostic.",
      },
      {
        question: "Quels sont les livrables d'un diagnostic organisationnel ?",
        answer: "Les livrables incluent : un rapport de diagnostic complet avec analyse SWOT, une cartographie des processus, une évaluation de la gouvernance, des recommandations priorisées et un plan d'action pour la mise en œuvre des améliorations.",
      },
    ],
    steps: [
      { name: 'Collecte de données', text: 'Entretiens avec les dirigeants et équipes, analyse documentaire, observations terrain et questionnaires.' },
      { name: 'Analyse & Diagnostic', text: "Analyse des données collectées, identification des dysfonctionnements et des opportunités d'amélioration." },
      { name: 'Rapport de diagnostic', text: 'Rédaction du rapport complet avec constats, recommandations priorisées et plan d\'action.' },
      { name: 'Restitution & Validation', text: "Présentation des résultats aux dirigeants, discussion des recommandations et validation du plan d'action." },
    ],
  }),

  'audit-social': buildServiceSchema({
    slug: 'audit-social',
    name: 'Audit Social',
    nameEn: 'Social Audit & HR Compliance',
    description: 'Audit social et évaluation de la conformité RH pour institutions financières en Afrique. Conformité droit du travail, cartographie des risques sociaux, plan d\'action correctif. Cabinet Lomé, Togo.',
    descriptionEn: 'Social audit and HR compliance assessment for financial institutions in Africa. Labor law compliance, social risk mapping, corrective action plan. Advisory firm in Lomé, Togo.',
    serviceType: 'Social Audit',
    breadcrumbLabel: 'Audit Social',
    breadcrumbLabelEn: 'Social Audit & HR Compliance',
    duration: 'P2M',
    durationLabel: '3 à 6 semaines / 3 to 6 weeks',
    priceRange: 'XOF 500,000 – XOF 4,000,000',
    sectors: ['Microfinance', 'SFD', 'ONG', 'Coopératives', 'Institutions financières'],
    keywords: ['audit social Afrique', 'conformité RH Togo', 'audit SFD BCEAO', 'évaluation sociale institution financière', 'social audit Africa'],
    faq: [
      {
        question: "Qu'est-ce qu'un audit social pour une institution de microfinance ?",
        answer: "Un audit social évalue la performance sociale d'une institution de microfinance : sa mission sociale, son ciblage des populations vulnérables, la qualité de ses services, la protection des clients et son impact sur les bénéficiaires. Il est souvent requis par les bailleurs et régulateurs.",
      },
      {
        question: "L'audit social est-il obligatoire pour les SFD en UEMOA ?",
        answer: "La BCEAO et les autorités de régulation de l'UEMOA encouragent fortement les audits sociaux pour les SFD. Certains bailleurs de fonds l'exigent comme condition de financement. KHEPRA EXPERTS vous accompagne dans cette démarche de conformité et d'amélioration continue.",
      },
      {
        question: "Quels référentiels utilisez-vous pour l'audit social ?",
        answer: "Nous utilisons les référentiels CERISE SPI4, les Principes de Protection des Clients (Smart Campaign), les standards SPTF (Social Performance Task Force) et les exigences réglementaires BCEAO. Nous adaptons notre approche aux spécificités de chaque institution.",
      },
    ],
    steps: [
      { name: "Cadrage de l'audit", text: "Définition du périmètre, des objectifs et des référentiels de l'audit social selon les standards BCEAO et internationaux." },
      { name: 'Collecte de données', text: "Entretiens, enquêtes clients, analyse documentaire et visites terrain pour évaluer la performance sociale." },
      { name: 'Analyse & Rapport', text: "Analyse des données, scoring de performance sociale et rédaction du rapport d'audit avec recommandations." },
      { name: "Plan d'amélioration", text: "Élaboration du plan d'amélioration de la performance sociale et accompagnement à sa mise en œuvre." },
    ],
  }),

  'ressources-humaines': buildServiceSchema({
    slug: 'ressources-humaines',
    name: 'Ressources Humaines',
    nameEn: 'Human Resources Management',
    description: 'Conseil en gestion des ressources humaines pour organisations africaines. Politique RH, recrutement, évaluation des performances, rémunération et développement des talents.',
    descriptionEn: 'Human resources consulting for African organizations. HR policy, recruitment, performance evaluation, compensation and talent development.',
    serviceType: 'Human Resources Consulting',
    breadcrumbLabel: 'Ressources Humaines',
    breadcrumbLabelEn: 'Human Resources',
    duration: 'P3M',
    durationLabel: '2 à 6 mois / 2 to 6 months',
    priceRange: 'XOF 600,000 – XOF 6,000,000',
    sectors: ['Institutions financières', 'PME', 'ONG', 'Secteur public'],
    keywords: ['conseil RH Afrique', 'gestion ressources humaines Togo', 'politique RH institution financière', 'gestion talents Afrique', 'HR consulting Africa'],
    faq: [
      {
        question: 'Quels services RH proposez-vous aux organisations africaines ?',
        answer: "KHEPRA EXPERTS propose : l'élaboration de politiques et procédures RH, la conception de systèmes d'évaluation des performances, la gestion des talents et des carrières, la mise en place de grilles salariales, le recrutement de cadres et la gestion des conflits sociaux.",
      },
      {
        question: 'Pouvez-vous aider à mettre en conformité notre politique RH avec le droit du travail local ?',
        answer: "Oui, nous accompagnons les organisations dans la mise en conformité de leurs pratiques RH avec le droit du travail togolais et des pays d'intervention. Nous travaillons en collaboration avec des juristes spécialisés pour garantir la conformité légale.",
      },
      {
        question: 'Comment gérez-vous la gestion des talents dans le contexte africain ?',
        answer: "Nous développons des stratégies de rétention adaptées au contexte africain, incluant des plans de carrière clairs, des programmes de formation continue, des systèmes de reconnaissance et des politiques de rémunération compétitives alignées sur les marchés locaux.",
      },
    ],
    steps: [
      { name: 'Audit RH', text: "Évaluation des pratiques RH existantes, identification des gaps et des risques de non-conformité." },
      { name: 'Conception du système RH', text: "Élaboration des politiques, procédures et outils RH adaptés à votre organisation et au contexte local." },
      { name: 'Déploiement', text: "Mise en place des nouveaux systèmes RH, formation des managers et des équipes RH." },
      { name: 'Suivi & Optimisation', text: "Accompagnement dans l'utilisation des outils RH et optimisation continue des pratiques." },
    ],
  }),

  'transformation-digitale': buildServiceSchema({
    slug: 'transformation-digitale',
    name: 'Gouvernance, Risques & Conformité',
    nameEn: 'Governance, Risk & Compliance',
    description: 'Conseil en gouvernance d\'entreprise, gestion des risques (ERM) et conformité réglementaire (BCEAO, COBAC, OHADA) pour banques, IMF et PME en Afrique francophone. Audit gouvernance, contrôle interne COSO, LCB-FT, conformité prudentielle Bâle II/III. 22+ ans d\'expertise réglementaire terrain.',
    descriptionEn: 'Governance, risk management (ERM) and regulatory compliance (BCEAO, COBAC, OHADA) advisory for banks, MFIs and SMEs in Francophone Africa. Governance audit, COSO internal control, AML/CFT, Basel II/III prudential compliance. 22+ years of regulatory field experience.',
    serviceType: 'Governance, Risk & Compliance Advisory',
    breadcrumbLabel: 'Gouvernance, Risques & Conformité',
    breadcrumbLabelEn: 'Governance, Risk & Compliance',
    duration: 'P4M',
    durationLabel: '4 à 12 semaines / 4 to 12 weeks',
    priceRange: 'XOF 1,000,000 – XOF 12,000,000',
    sectors: ['Banques', 'Institutions de Microfinance', 'Fintech', 'SMEs', 'ONG', 'Établissements de crédit'],
    keywords: ['gouvernance entreprise Afrique', 'conformité BCEAO COBAC', 'gestion des risques ERM', 'contrôle interne COSO', 'LCB-FT UEMOA', 'audit gouvernance BCEAO', 'conseil conformité réglementaire', 'prudentielle Bâle II III Afrique'],
    faq: [
      {
        question: 'Qu\'est-ce que la gouvernance d\'entreprise selon les standards BCEAO/COBAC ?',
        answer: 'La gouvernance d\'entreprise selon les standards BCEAO (Circulaire 01-2017 pour les banques UEMOA) et COBAC (Règlement COBAC R-2016/01) couvre : la composition et le fonctionnement du Conseil d\'Administration, les comités spécialisés (Audit, Risques, Rémunération), l\'indépendance des administrateurs, la déontologie des dirigeants et le système de contrôle interne. Ces textes sont obligatoires pour toute institution financière agréée.',
      },
      {
        question: 'Quelles sont les trois lignes de défense en contrôle interne ?',
        answer: 'Le modèle des 3 lignes de défense (Circulaire BCEAO 03-2017) distingue : (1) Les opérationnels qui gèrent les risques au quotidien, (2) Les fonctions de contrôle (compliance, gestion des risques, contrôle permanent) qui supervisent, et (3) L\'audit interne qui évalue l\'efficacité du dispositif. La BCEAO exige l\'application rigoureuse de ce modèle pour toutes les banques et SFD sous sa supervision.',
      },
      {
        question: 'Quelles sont les exigences BCEAO en matière de LCB-FT pour les SFD ?',
        answer: 'La Directive 02-2015/CM/UEMOA sur la LCB-FT impose aux SFD : la désignation d\'un responsable de conformité, la mise en place d\'un programme KYC (Know Your Customer), la déclaration de transactions suspectes à la CENTIF, la surveillance des personnes politiquement exposées (PPE) et la formation du personnel. Le non-respect expose à des sanctions administratives et des retraits d\'agrément.',
      },
      {
        question: 'Comment fonctionne le contrôle interne selon le référentiel COSO ?',
        answer: 'Le référentiel COSO (Committee of Sponsoring Organizations) définit 5 composantes du contrôle interne : (1) Environnement de contrôle, (2) Évaluation des risques, (3) Activités de contrôle, (4) Information et communication, (5) Pilotage. COSO est la référence internationale pour l\'audit interne et est compatible avec les exigences BCEAO, COBAC et OHADA. Notre méthodologie d\'audit est alignée sur COSO 2013.',
      },
      {
        question: 'Quelles sanctions encourt une institution qui ne respecte pas les exigences de gouvernance BCEAO ?',
        answer: 'Les sanctions BCEAO pour non-conformité aux exigences de gouvernance incluent : avertissement formel, injonction de mise en conformité, restriction d\'activités, nomination d\'un administrateur provisoire, suspension des dirigeants et, en dernier recours, retrait d\'agrément. Les sanctions financières peuvent aller jusqu\'à 10% du capital minimum réglementaire. Une mise en conformité proactive est nettement préférable à une intervention réglementaire.',
      },
    ],
    steps: [
      { name: 'Diagnostic stratégique & ESG', text: "Analyse SWOT, benchmark concurrentiel, évaluation de la maturité ESG, audit d'éligibilité aux financements DFI et identification des 3 leviers de croissance prioritaires." },
      { name: 'Vision, Positionnement & Feuille de route ESG', text: 'Co-construction de la vision à 3–5 ans, stratégie de positionnement différenciant, plan d\'intégration ESG et alignement sur les standards IFC/GRI/ISSB.' },
      { name: 'Plan stratégique pluriannuel', text: 'Plan stratégique avec objectifs ESG, KPI actionnables, jalons trimestriels, budget prévisionnel aligné sur les cibles et PGES (Plan de Gestion Environnementale et Sociale).' },
      { name: 'Déploiement, Pilotage & Reporting ESG', text: 'Accompagnement à l\'exécution, revues trimestrielles, reporting ESG (GRI/ISSB), communication avec les investisseurs DFI et amélioration continue de la performance ESG.' },
    ],
  }),

  'communication-strategique': buildServiceSchema({
    slug: 'communication-strategique',
    name: 'Communication Stratégique',
    nameEn: 'Strategic Communication',
    description: 'Conseil en communication stratégique pour organisations africaines. Identité de marque, messaging investisseurs, stratégie de présence digitale multi-canal FR/EN.',
    descriptionEn: 'Strategic communication consulting for African organizations. Brand identity, investor messaging, multi-channel digital presence strategy FR/EN.',
    serviceType: 'Strategic Communication',
    breadcrumbLabel: 'Communication Stratégique',
    breadcrumbLabelEn: 'Strategic Communication',
    duration: 'P3M',
    durationLabel: '2 à 6 mois / 2 to 6 months',
    priceRange: 'XOF 400,000 – XOF 5,000,000',
    sectors: ['Institutions financières', 'PME', 'ONG', 'Secteur public', 'Startups'],
    keywords: ['communication stratégique Afrique', 'relations publiques Togo', 'communication institutionnelle UEMOA', 'stratégie communication PME', 'strategic communication Africa'],
    faq: [
      {
        question: "Qu'est-ce que la communication stratégique pour une organisation africaine ?",
        answer: "La communication stratégique aligne les messages et les actions de communication sur les objectifs stratégiques de l'organisation. Elle englobe la communication institutionnelle, les relations avec les parties prenantes, la communication de crise et la communication digitale.",
      },
      {
        question: "Comment améliorer la visibilité d'une institution financière en Afrique ?",
        answer: "Nous développons des stratégies de communication multicanal adaptées au contexte africain : présence digitale (site web, réseaux sociaux), relations presse, événements sectoriels, publications et partenariats stratégiques pour renforcer la notoriété et la crédibilité.",
      },
    ],
    steps: [
      { name: 'Audit de communication', text: "Évaluation de la communication existante, analyse des parties prenantes et identification des gaps." },
      { name: 'Stratégie de communication', text: "Définition des messages clés, des cibles, des canaux et du plan de communication annuel." },
      { name: 'Déploiement', text: "Mise en œuvre du plan de communication avec production de contenus et activation des canaux." },
      { name: 'Mesure & Optimisation', text: "Suivi des indicateurs de performance et optimisation continue de la stratégie de communication." },
    ],
  }),

  'levee-de-fonds': buildServiceSchema({
    slug: 'levee-de-fonds',
    name: 'Investment Readiness & Levée de Fonds',
    nameEn: 'Investment Readiness & Fundraising',
    description: 'Investment Readiness et accompagnement à la levée de fonds pour startups, PME et institutions en Afrique francophone. Diagnostic de readiness sur 5 dimensions, pitch deck investor-grade, modèle financier 5 ans, data room structurée et mise en relation avec investisseurs PE/VC, DFI et fonds impact. 120M€+ levés.',
    descriptionEn: 'Investment Readiness and fundraising advisory for startups, SMEs and institutions in Francophone Africa. 5-dimension readiness diagnostic, investor-grade pitch deck, 5-year financial model, structured data room and matchmaking with PE/VC, DFI and impact fund investors. €120M+ raised.',
    serviceType: 'Investment Readiness & Fundraising Advisory',
    breadcrumbLabel: 'Investment Readiness & Levée de Fonds',
    breadcrumbLabelEn: 'Investment Readiness & Fundraising',
    duration: 'P6M',
    durationLabel: '90 à 180 jours / 90 to 180 days',
    priceRange: 'XOF 500,000 – XOF 8,000,000 + commission',
    sectors: ['Startups', 'PME', 'Institutions financières', 'ONG', 'Coopératives', 'Fintech'],
    keywords: ['investment readiness Afrique', 'levée de fonds Afrique', 'pitch deck investisseurs', 'fonds PE VC Afrique', 'DFI BIDC BOAD IFC Proparco', 'fonds impact Afrique', 'due diligence préparatoire', 'data room startup'],
    faq: [
      {
        question: 'Qu\'est-ce que l\'Investment Readiness ?',
        answer: 'L\'Investment Readiness désigne le niveau de préparation d\'une organisation à lever des fonds auprès d\'investisseurs institutionnels (PE/VC, DFI, fonds impact). Il évalue 5 dimensions : solidité financière, gouvernance, modèle économique, équipe et potentiel de croissance. Un score élevé multiplie par 3 les chances d\'obtenir un financement.',
      },
      {
        question: 'Combien de temps faut-il pour préparer une levée de fonds en Afrique ?',
        answer: 'En Afrique francophone, la durée moyenne est de 6 à 12 mois. La phase de préparation (diagnostic, dossier, due diligence préparatoire) prend 2 à 3 mois. La mise en relation et les négociations avec les investisseurs prennent 3 à 6 mois supplémentaires. Les fonds PE/VC et DFI comme le BIDC, BOAD ou BAD ont des processus d\'instruction rigoureux qui nécessitent des dossiers très solides.',
      },
      {
        question: 'Quels investisseurs ciblez-vous pour les entreprises africaines ?',
        answer: 'Nous ciblons les investisseurs les plus actifs en Afrique francophone : fonds PE/VC (Partech Africa, Orange Ventures, Verod Capital), DFI (BIDC, BOAD, BAD, IFC, Proparco, DEG, FMO), fonds d\'impact (Symbiotics, responsAbility, OPIC), fonds souverains régionaux et banques commerciales pour la dette. Nous qualifions chaque investisseur selon votre secteur, ticket et stade de développement.',
      },
      {
        question: 'Quelle est la différence entre pitch deck et mémorandum d\'information ?',
        answer: 'Le pitch deck (15-20 slides) est l\'outil de premier contact visuel avec l\'investisseur. Il capte l\'attention et génère la réunion. Le mémorandum d\'information (IM, 40-80 pages) est le document de diligence qui détaille le business plan, les états financiers, la gouvernance, les risques et les projections. Les deux sont complémentaires et nécessaires pour toute levée sérieuse.',
      },
      {
        question: 'Comment garantir la confidentialité lors d\'une levée de fonds ?',
        answer: 'Nous mettons en place un protocole de confidentialité rigoureux : NDA systématique avant tout partage de documents, data room sécurisée avec accès tracé, watermarking des documents sensibles, et protocole d\'approche séquentielle des investisseurs pour éviter les fuites.',
      },
    ],
    steps: [
      { name: 'Diagnostic Investment Readiness', text: 'Évaluation du readiness sur 5 dimensions : solidité financière, gouvernance, modèle économique, équipe, potentiel de croissance. Score avec plan d\'action priorisé.' },
      { name: 'Dossier Investor-Grade', text: 'Création du pitch deck (20 slides), mémorandum d\'information, modèle financier 5 ans audité, teaser exécutif et structuration de la data room.' },
      { name: 'Ciblage & Approche Investisseurs', text: 'Cartographie des fonds PE/VC, DFI (BIDC, BOAD, IFC, Proparco), fonds impact et banques commerciales alignés avec le profil. Approche personnalisée.' },
      { name: 'Due Diligence & Closing', text: "Accompagnement lors de la due diligence investisseur, négociation du term sheet, documentation juridique et closing financier. Conseil gouvernance post-closing." },
    ],
  }),
};
