import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

export default function AfricaPage() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/regions/africa#service`,
        name: isEnglish ? 'Strategic Consulting Africa' : 'Conseil Stratégique Afrique',
        description: isEnglish
          ? 'Khepra Experts provides strategic advisory services across Africa: financial inclusion, fintech ecosystem development, digital transformation, microfinance modernization, SME development. 54 countries, 1.4B population, $3T GDP.'
          : 'Khepra Experts accompagne les institutions africaines : inclusion financière, développement écosystème fintech, transformation digitale, modernisation microfinance, développement PME. 54 pays, 1,4Md habitants, 3000Mds$ PIB.',
        url: `${SITE_URL}/regions/africa`,
        areaServed: {
          '@type': 'Place',
          name: 'Africa',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 0.0,
            longitude: 20.0
          }
        },
        provider: {
          '@type': 'Organization',
          name: 'KHEPRA EXPERTS',
          url: SITE_URL
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/regions/africa#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEnglish ? 'Home' : 'Accueil',
            item: SITE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEnglish ? 'Regions' : 'Régions',
            item: `${SITE_URL}/regions`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Africa',
            item: `${SITE_URL}/regions/africa`
          }
        ]
      }
    ]
  };

  const stats = [
    { value: '54', label: isEnglish ? 'Countries' : 'Pays', icon: 'ri-map-2-line' },
    { value: '1.4B', label: isEnglish ? 'Population' : 'Population', icon: 'ri-group-line' },
    { value: '3.0T$', label: isEnglish ? 'GDP 2024' : 'PIB 2024', icon: 'ri-line-chart-line' },
    { value: '66%', label: isEnglish ? 'Unbanked Adults' : 'Adultes non bancarisés', icon: 'ri-bank-line' },
    { value: '615M', label: isEnglish ? 'Mobile Money Accounts' : 'Comptes Mobile Money', icon: 'ri-smartphone-line' },
    { value: '6.5%', label: isEnglish ? 'GDP Growth 2024' : 'Croissance PIB 2024', icon: 'ri-arrow-up-line' }
  ];

  const regions = [
    {
      name: isEnglish ? 'West Africa' : 'Afrique de l\'Ouest',
      countries: isEnglish ? '16 countries' : '16 pays',
      population: '411M',
      gdp: '$780Mds',
      growth: '5.8%',
      highlights: isEnglish
        ? ['UEMOA economic zone', 'Mobile Money leader', 'Fintech hub (Nigeria, Ghana)']
        : ['Zone économique UEMOA', 'Leader Mobile Money', 'Hub fintech (Nigeria, Ghana)'],
      link: '/regions/west-africa'
    },
    {
      name: isEnglish ? 'East Africa' : 'Afrique de l\'Est',
      countries: isEnglish ? '18 countries' : '18 pays',
      population: '445M',
      gdp: '$520Mds',
      growth: '6.2%',
      highlights: isEnglish
        ? ['M-Pesa pioneer', 'EAC integration', 'Tech innovation (Kenya)']
        : ['Pionnier M-Pesa', 'Intégration EAC', 'Innovation tech (Kenya)'],
      link: '/regions/east-africa'
    },
    {
      name: isEnglish ? 'Central Africa' : 'Afrique Centrale',
      countries: isEnglish ? '9 countries' : '9 pays',
      population: '185M',
      gdp: '$280Mds',
      growth: '4.5%',
      highlights: isEnglish
        ? ['CEMAC zone', 'Natural resources', 'Banking modernization']
        : ['Zone CEMAC', 'Ressources naturelles', 'Modernisation bancaire'],
      link: '/regions/cemac'
    },
    {
      name: isEnglish ? 'Southern Africa' : 'Afrique Australe',
      countries: isEnglish ? '10 countries' : '10 pays',
      population: '195M',
      gdp: '$850Mds',
      growth: '3.8%',
      highlights: isEnglish
        ? ['SADC integration', 'Advanced banking', 'Mining & finance']
        : ['Intégration SADC', 'Banque avancée', 'Mines & finance'],
      link: '/regions/southern-africa'
    },
    {
      name: isEnglish ? 'North Africa' : 'Afrique du Nord',
      countries: isEnglish ? '7 countries' : '7 pays',
      population: '245M',
      gdp: '$720Mds',
      growth: '4.2%',
      highlights: isEnglish
        ? ['Maghreb integration', 'Islamic finance', 'Digital banking']
        : ['Intégration Maghreb', 'Finance islamique', 'Banque digitale'],
      link: '/regions/north-africa'
    }
  ];

  const opportunities = [
    {
      title: isEnglish ? 'Financial Inclusion' : 'Inclusion Financière',
      icon: 'ri-bank-line',
      description: isEnglish
        ? '66% of African adults remain unbanked, representing 450 million people. Digital financial services (mobile money, digital wallets, agent banking) offer unprecedented opportunities to reach underserved populations.'
        : '66% des adultes africains restent non bancarisés, soit 450 millions de personnes. Les services financiers digitaux (mobile money, portefeuilles numériques, agent banking) offrent des opportunités sans précédent pour atteindre les populations mal desservies.',
      stats: isEnglish ? '450M unbanked adults' : '450M adultes non bancarisés',
      link: '/pillar/financial-inclusion-africa'
    },
    {
      title: isEnglish ? 'Fintech Ecosystem' : 'Écosystème Fintech',
      icon: 'ri-rocket-line',
      description: isEnglish
        ? 'Africa hosts over 1,000 active fintechs with $6.5 billion raised since 2020. Key hubs: Nigeria (Lagos), Kenya (Nairobi), South Africa (Cape Town), Egypt (Cairo). Sectors: payments, lending, insurtech, wealthtech.'
        : 'L\'Afrique compte plus de 1 000 fintechs actives ayant levé 6,5 milliards $ depuis 2020. Hubs clés : Nigeria (Lagos), Kenya (Nairobi), Afrique du Sud (Le Cap), Égypte (Le Caire). Secteurs : paiements, crédit, insurtech, wealthtech.',
      stats: isEnglish ? '1,000+ active fintechs' : '1 000+ fintechs actives',
      link: '/pillar/fintech-advisory-africa'
    },
    {
      title: isEnglish ? 'Digital Transformation' : 'Transformation Digitale',
      icon: 'ri-smartphone-line',
      description: isEnglish
        ? 'Mobile penetration reaches 85% (1.1B connections), internet penetration 40% (550M users). Banks, microfinance institutions, and public services are accelerating their digital transformation to meet growing demand.'
        : 'La pénétration mobile atteint 85% (1,1Md de connexions), la pénétration internet 40% (550M d\'utilisateurs). Banques, institutions de microfinance et services publics accélèrent leur transformation digitale pour répondre à la demande croissante.',
      stats: isEnglish ? '85% mobile penetration' : '85% pénétration mobile',
      link: '/pillar/digital-transformation-africa'
    },
    {
      title: isEnglish ? 'SME Development' : 'Développement des PME',
      icon: 'ri-store-2-line',
      description: isEnglish
        ? 'SMEs represent 90% of African businesses and 60% of employment but face a $330 billion financing gap. Digital solutions (credit scoring, supply chain finance, e-commerce) unlock new growth opportunities.'
        : 'Les PME représentent 90% des entreprises africaines et 60% de l\'emploi mais font face à un déficit de financement de 330 milliards $. Les solutions digitales (credit scoring, supply chain finance, e-commerce) ouvrent de nouvelles opportunités de croissance.',
      stats: isEnglish ? '$330B financing gap' : '330Mds$ déficit financement',
      link: '/pillar/sme-development-africa'
    }
  ];

  const challenges = [
    {
      title: isEnglish ? 'Regulatory Fragmentation' : 'Fragmentation Réglementaire',
      description: isEnglish
        ? '54 different regulatory frameworks complicate cross-border operations. Regional harmonization (UEMOA, CEMAC, EAC, SADC) is progressing but remains incomplete.'
        : '54 cadres réglementaires différents compliquent les opérations transfrontalières. L\'harmonisation régionale (UEMOA, CEMAC, EAC, SADC) progresse mais reste incomplète.'
    },
    {
      title: isEnglish ? 'Infrastructure Gaps' : 'Déficit d\'Infrastructure',
      description: isEnglish
        ? 'Limited internet connectivity in rural areas (20% penetration), unreliable electricity (40% access), and weak payment infrastructure hinder digital adoption.'
        : 'Connectivité internet limitée en zones rurales (20% de pénétration), électricité peu fiable (40% d\'accès) et infrastructure de paiement faible freinent l\'adoption digitale.'
    },
    {
      title: isEnglish ? 'Cybersecurity Risks' : 'Risques Cybersécurité',
      description: isEnglish
        ? 'Rapid digitalization exposes institutions to cyber threats. Only 30% of African countries have comprehensive cybersecurity legislation. Investment in security infrastructure is critical.'
        : 'La digitalisation rapide expose les institutions aux cybermenaces. Seulement 30% des pays africains disposent d\'une législation cybersécurité complète. L\'investissement dans l\'infrastructure de sécurité est critique.'
    },
    {
      title: isEnglish ? 'Skills Gap' : 'Déficit de Compétences',
      description: isEnglish
        ? 'Shortage of digital skills (data science, cybersecurity, software development) limits innovation. Investment in training and capacity building is essential.'
        : 'Pénurie de compétences digitales (data science, cybersécurité, développement logiciel) limite l\'innovation. L\'investissement dans la formation et le renforcement des capacités est essentiel.'
    }
  ];

  const caseStudies = [
    {
      country: isEnglish ? 'Nigeria' : 'Nigeria',
      title: isEnglish ? 'Fintech Ecosystem Development' : 'Développement Écosystème Fintech',
      description: isEnglish
        ? 'Advisory for a Nigerian fintech hub on regulatory strategy, investor relations, and ecosystem partnerships. Result: 15 new fintechs launched, $120M raised.'
        : 'Conseil pour un hub fintech nigérian sur la stratégie réglementaire, relations investisseurs et partenariats écosystème. Résultat : 15 nouvelles fintechs lancées, 120M$ levés.',
      impact: isEnglish ? '15 fintechs launched' : '15 fintechs lancées'
    },
    {
      country: isEnglish ? 'Kenya' : 'Kenya',
      title: isEnglish ? 'Digital Banking Transformation' : 'Transformation Banque Digitale',
      description: isEnglish
        ? 'Digital transformation of a Kenyan commercial bank: core banking migration, mobile app launch, agent network expansion. Result: 2M new digital customers in 18 months.'
        : 'Transformation digitale d\'une banque commerciale kényane : migration core banking, lancement app mobile, expansion réseau agents. Résultat : 2M nouveaux clients digitaux en 18 mois.',
      impact: isEnglish ? '2M digital customers' : '2M clients digitaux'
    },
    {
      country: isEnglish ? 'Senegal' : 'Sénégal',
      title: isEnglish ? 'Microfinance Network Modernization' : 'Modernisation Réseau Microfinance',
      description: isEnglish
        ? 'BCEAO compliance and digital transformation for a Senegalese microfinance network (45 branches). Result: 100% regulatory compliance, 60% operational cost reduction.'
        : 'Mise en conformité BCEAO et transformation digitale d\'un réseau de microfinance sénégalais (45 agences). Résultat : 100% conformité réglementaire, 60% réduction coûts opérationnels.',
      impact: isEnglish ? '60% cost reduction' : '60% réduction coûts'
    },
    {
      country: isEnglish ? 'Ghana' : 'Ghana',
      title: isEnglish ? 'SME Financing Platform' : 'Plateforme Financement PME',
      description: isEnglish
        ? 'Design and launch of a digital SME financing platform for a Ghanaian development bank. Result: 5,000 SMEs financed, $45M disbursed in 2 years.'
        : 'Conception et lancement d\'une plateforme digitale de financement PME pour une banque de développement ghanéenne. Résultat : 5 000 PME financées, 45M$ décaissés en 2 ans.',
      impact: isEnglish ? '5,000 SMEs financed' : '5 000 PME financées'
    }
  ];

  return (
    <>
      <SeoHead
        title={t('regions.africa.seo.title')}
        description={t('regions.africa.seo.description')}
        keywords={t('regions.africa.seo.keywords')}
        canonicalPath="/regions/africa"
        schemaJson={schemaJson}
        ogImage={OG_IMAGES.AFRICA}
        ogImageAlt={isEnglish
          ? "Strategic Consulting Africa – KHEPRA EXPERTS | 54 Countries Financial Services"
          : "Conseil Stratégique Afrique – KHEPRA EXPERTS | Services Financiers 54 Pays"}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEnglish ? 'en_US' : 'fr_FR'}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-6">
            <VisibleBreadcrumb
              variant="dark"
              items={[
                { label: isEnglish ? 'Home' : 'Accueil', href: '/', url: `${SITE_URL}/` },
                { label: isEnglish ? 'Regions' : 'Régions', href: '/regions', url: `${SITE_URL}/regions` },
                { label: isEnglish ? 'Africa' : 'Afrique', url: `${SITE_URL}/regions/africa` }
              ]}
              className="mb-6"
            />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                <i className="ri-global-line text-amber-700"></i>
                <span className="text-sm font-medium text-amber-900">
                  {isEnglish ? '54 Countries • 1.4B Population • $3T GDP' : '54 Pays • 1,4Md Habitants • 3000Mds$ PIB'}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {isEnglish ? 'Strategic Consulting' : 'Conseil Stratégique'}<br />
                <span className="text-amber-600">{isEnglish ? 'Across Africa' : 'Pan-Africain'}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {isEnglish
                  ? 'Khepra Experts supports African institutions in their strategic transformation: financial inclusion, fintech ecosystem development, digital transformation, microfinance modernization, and SME development. With deep expertise across 54 countries, we help build inclusive and sustainable financial ecosystems.'
                  : 'Khepra Experts accompagne les institutions africaines dans leur transformation stratégique : inclusion financière, développement d\'écosystèmes fintech, transformation digitale, modernisation de la microfinance et développement des PME. Avec une expertise approfondie dans 54 pays, nous contribuons à bâtir des écosystèmes financiers inclusifs et durables.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-medium whitespace-nowrap"
                >
                  {isEnglish ? 'Request Advisory' : 'Demander un Conseil'}
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-amber-600 hover:text-amber-600 transition-all font-medium whitespace-nowrap"
                >
                  {isEnglish ? 'View Case Studies' : 'Voir Études de Cas'}
                  <i className="ri-file-list-3-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-amber-100 rounded-lg">
                    <i className={`${stat.icon} text-2xl text-amber-600`}></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Overview */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Regional Expertise' : 'Expertise Régionale'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Deep understanding of regional dynamics, regulatory frameworks, and market opportunities across all African regions.'
                  : 'Compréhension approfondie des dynamiques régionales, cadres réglementaires et opportunités de marché dans toutes les régions africaines.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regions.map((region, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{region.name}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-map-pin-line text-amber-600"></i>
                      <span>{region.countries}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-group-line text-amber-600"></i>
                      <span>{region.population} {isEnglish ? 'population' : 'habitants'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-line-chart-line text-amber-600"></i>
                      <span>{region.gdp} GDP</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-arrow-up-line text-green-600"></i>
                      <span>{region.growth} {isEnglish ? 'growth' : 'croissance'}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {region.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-amber-600 mt-1"></i>
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={region.link}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {isEnglish ? 'Explore region' : 'Explorer la région'}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Strategic Opportunities' : 'Opportunités Stratégiques'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Africa offers unprecedented opportunities for financial innovation and inclusive growth.'
                  : 'L\'Afrique offre des opportunités sans précédent pour l\'innovation financière et la croissance inclusive.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {opportunities.map((opp, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                  <div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center mb-6">
                    <i className={`${opp.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{opp.title}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full mb-4">
                    <i className="ri-bar-chart-line text-amber-700"></i>
                    <span className="text-sm font-medium text-amber-900">{opp.stats}</span>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{opp.description}</p>
                  <Link
                    to={opp.link}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {isEnglish ? 'Learn more' : 'En savoir plus'}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Strategic Challenges' : 'Défis Stratégiques'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Understanding and addressing key challenges is essential for successful transformation.'
                  : 'Comprendre et relever les défis clés est essentiel pour une transformation réussie.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-alert-line text-2xl text-red-600"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Success Stories Across Africa' : 'Succès à Travers l\'Afrique'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Proven track record of successful transformations across diverse African markets and sectors.'
                  : 'Historique éprouvé de transformations réussies dans divers marchés et secteurs africains.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-xl text-amber-600"></i>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{study.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{study.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                    <i className="ri-trophy-line text-green-700"></i>
                    <span className="text-sm font-medium text-green-900">{study.impact}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all font-medium whitespace-nowrap"
              >
                {isEnglish ? 'View All Case Studies' : 'Voir Toutes les Études de Cas'}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              {isEnglish ? 'Ready to Transform Your Institution?' : 'Prêt à Transformer Votre Institution ?'}
            </h2>
            <p className="text-xl text-amber-50 mb-8">
              {isEnglish
                ? 'Contact our team to discuss your strategic challenges and explore how we can support your transformation across Africa.'
                : 'Contactez notre équipe pour discuter de vos défis stratégiques et explorer comment nous pouvons accompagner votre transformation en Afrique.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-all font-medium whitespace-nowrap"
              >
                {isEnglish ? 'Contact Us' : 'Nous Contacter'}
                <i className="ri-mail-line"></i>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-amber-600 transition-all font-medium whitespace-nowrap"
              >
                {isEnglish ? 'Our Services' : 'Nos Services'}
                <i className="ri-service-line"></i>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}