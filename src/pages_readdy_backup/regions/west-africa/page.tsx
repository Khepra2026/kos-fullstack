import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function WestAfricaPage() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '16', label: isEnglish ? 'Countries' : 'Pays', icon: 'ri-map-2-line' },
    { value: '411M', label: isEnglish ? 'Population' : 'Population', icon: 'ri-group-line' },
    { value: '$780B', label: isEnglish ? 'GDP 2024' : 'PIB 2024', icon: 'ri-line-chart-line' },
    { value: '5.8%', label: isEnglish ? 'GDP Growth' : 'Croissance PIB', icon: 'ri-arrow-up-line' },
    { value: '280M', label: isEnglish ? 'Mobile Money Accounts' : 'Comptes Mobile Money', icon: 'ri-smartphone-line' },
    { value: '450+', label: isEnglish ? 'Active Fintechs' : 'Fintechs Actives', icon: 'ri-rocket-line' }
  ];

  const countries = [
    { name: 'Nigeria', population: '223M', gdp: '$440Mds', hub: isEnglish ? 'Fintech Hub (Lagos)' : 'Hub Fintech (Lagos)' },
    { name: 'Ghana', population: '33M', gdp: '$75Mds', hub: isEnglish ? 'Digital Banking Leader' : 'Leader Banque Digitale' },
    { name: 'Côte d\'Ivoire', population: '28M', gdp: '$70Mds', hub: isEnglish ? 'UEMOA Financial Hub' : 'Hub Financier UEMOA' },
    { name: 'Sénégal', population: '18M', gdp: '$28Mds', hub: isEnglish ? 'Mobile Money Pioneer' : 'Pionnier Mobile Money' },
    { name: 'Bénin', population: '13M', gdp: '$17Mds', hub: isEnglish ? 'Digital Transformation' : 'Transformation Digitale' },
    { name: 'Burkina Faso', population: '22M', gdp: '$19Mds', hub: isEnglish ? 'Microfinance Growth' : 'Croissance Microfinance' },
    { name: 'Mali', population: '22M', gdp: '$19Mds', hub: isEnglish ? 'Financial Inclusion' : 'Inclusion Financière' },
    { name: 'Niger', population: '26M', gdp: '$14Mds', hub: isEnglish ? 'Mobile Banking' : 'Banque Mobile' },
    { name: 'Togo', population: '9M', gdp: '$8Mds', hub: isEnglish ? 'Digital Services' : 'Services Digitaux' },
    { name: 'Guinée', population: '14M', gdp: '$16Mds', hub: isEnglish ? 'Banking Modernization' : 'Modernisation Bancaire' },
    { name: 'Sierra Leone', population: '8M', gdp: '$4Mds', hub: isEnglish ? 'Fintech Adoption' : 'Adoption Fintech' },
    { name: 'Liberia', population: '5M', gdp: '$4Mds', hub: isEnglish ? 'Mobile Money Growth' : 'Croissance Mobile Money' }
  ];

  const ecosystems = [
    {
      title: isEnglish ? 'UEMOA Economic Zone' : 'Zone Économique UEMOA',
      icon: 'ri-bank-line',
      description: isEnglish
        ? 'The West African Economic and Monetary Union (UEMOA) comprises 8 countries sharing the CFA Franc and harmonized banking regulations under BCEAO supervision. This integration facilitates cross-border operations, regional payments, and financial services expansion.'
        : 'L\'Union Économique et Monétaire Ouest-Africaine (UEMOA) regroupe 8 pays partageant le Franc CFA et une réglementation bancaire harmonisée sous supervision BCEAO. Cette intégration facilite les opérations transfrontalières, les paiements régionaux et l\'expansion des services financiers.',
      countries: isEnglish ? '8 countries: Benin, Burkina Faso, Côte d\'Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo' : '8 pays : Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo',
      link: '/regions/uemoa-cemac'
    },
    {
      title: isEnglish ? 'Nigeria Fintech Ecosystem' : 'Écosystème Fintech Nigeria',
      icon: 'ri-rocket-line',
      description: isEnglish
        ? 'Nigeria hosts Africa\'s largest fintech ecosystem with 250+ active fintechs, $3.5B raised since 2019, and 5 unicorns (Flutterwave, Interswitch, OPay, Andela, Jumia). Lagos is the continent\'s fintech capital, driving innovation in payments, lending, insurtech, and wealthtech.'
        : 'Le Nigeria abrite le plus grand écosystème fintech d\'Afrique avec 250+ fintechs actives, 3,5Mds$ levés depuis 2019 et 5 licornes (Flutterwave, Interswitch, OPay, Andela, Jumia). Lagos est la capitale fintech du continent, moteur d\'innovation en paiements, crédit, insurtech et wealthtech.',
      countries: isEnglish ? '250+ fintechs, $3.5B funding, 5 unicorns' : '250+ fintechs, 3,5Mds$ levés, 5 licornes',
      link: '/pillar/fintech-advisory-africa'
    },
    {
      title: isEnglish ? 'Mobile Money Leadership' : 'Leadership Mobile Money',
      icon: 'ri-smartphone-line',
      description: isEnglish
        ? 'West Africa leads the continent in mobile money adoption with 280M active accounts (45% of African total). Key players: MTN Mobile Money, Orange Money, Moov Money, Wave. Transaction volume reached $150B in 2023, driven by remittances, bill payments, and merchant transactions.'
        : 'L\'Afrique de l\'Ouest mène le continent en adoption mobile money avec 280M comptes actifs (45% du total africain). Acteurs clés : MTN Mobile Money, Orange Money, Moov Money, Wave. Le volume de transactions a atteint 150Mds$ en 2023, porté par les transferts, paiements de factures et transactions marchandes.',
      countries: isEnglish ? '280M accounts, $150B transactions 2023' : '280M comptes, 150Mds$ transactions 2023',
      link: '/pillar/financial-inclusion-africa'
    }
  ];

  const opportunities = [
    {
      title: isEnglish ? 'Cross-Border Payments' : 'Paiements Transfrontaliers',
      description: isEnglish
        ? 'UEMOA integration and regional payment systems (GIMAC, WAMZ) enable seamless cross-border transactions. Opportunity: $45B annual intra-regional trade, 25M diaspora remittances.'
        : 'L\'intégration UEMOA et les systèmes de paiement régionaux (GIMAC, WAMZ) permettent des transactions transfrontalières fluides. Opportunité : 45Mds$ commerce intra-régional annuel, 25M transferts diaspora.',
      icon: 'ri-exchange-line'
    },
    {
      title: isEnglish ? 'Digital Banking Transformation' : 'Transformation Banque Digitale',
      description: isEnglish
        ? 'Traditional banks accelerate digital transformation to compete with fintechs. Opportunity: 150M unbanked adults, 85% mobile penetration, growing demand for digital services.'
        : 'Les banques traditionnelles accélèrent leur transformation digitale pour concurrencer les fintechs. Opportunité : 150M adultes non bancarisés, 85% pénétration mobile, demande croissante services digitaux.',
      icon: 'ri-bank-line'
    },
    {
      title: isEnglish ? 'SME Financing Solutions' : 'Solutions Financement PME',
      description: isEnglish
        ? 'SMEs represent 90% of West African businesses but face $120B financing gap. Digital credit scoring, supply chain finance, and alternative lending unlock growth opportunities.'
        : 'Les PME représentent 90% des entreprises ouest-africaines mais font face à un déficit de 120Mds$. Le credit scoring digital, supply chain finance et prêts alternatifs ouvrent des opportunités de croissance.',
      icon: 'ri-store-2-line'
    },
    {
      title: isEnglish ? 'Microfinance Modernization' : 'Modernisation Microfinance',
      description: isEnglish
        ? '2,500+ microfinance institutions serve 25M clients but need digital transformation and BCEAO compliance. Opportunity: core banking migration, mobile channels, regulatory advisory.'
        : '2 500+ institutions de microfinance servent 25M clients mais nécessitent transformation digitale et conformité BCEAO. Opportunité : migration core banking, canaux mobiles, conseil réglementaire.',
      icon: 'ri-community-line'
    },
    {
      title: isEnglish ? 'Insurtech & Embedded Finance' : 'Insurtech & Finance Embarquée',
      description: isEnglish
        ? 'Insurance penetration remains below 3% despite growing middle class. Microinsurance, embedded insurance, and digital distribution channels offer massive growth potential.'
        : 'La pénétration assurance reste sous 3% malgré la classe moyenne croissante. Microassurance, assurance embarquée et canaux de distribution digitaux offrent un potentiel de croissance massif.',
      icon: 'ri-shield-check-line'
    },
    {
      title: isEnglish ? 'Regulatory Technology (RegTech)' : 'Technologie Réglementaire (RegTech)',
      description: isEnglish
        ? 'Strengthened regulations (AML/CFT, data protection, cybersecurity) create demand for compliance solutions. Opportunity: KYC automation, transaction monitoring, regulatory reporting.'
        : 'Le renforcement réglementaire (LBC/FT, protection données, cybersécurité) crée une demande pour solutions de conformité. Opportunité : automatisation KYC, surveillance transactions, reporting réglementaire.',
      icon: 'ri-shield-line'
    }
  ];

  const services = [
    {
      title: isEnglish ? 'Fintech Strategy & Launch' : 'Stratégie & Lancement Fintech',
      description: isEnglish
        ? 'End-to-end support for fintech ventures: business model design, regulatory licensing, technology architecture, go-to-market strategy, investor relations.'
        : 'Accompagnement end-to-end pour ventures fintech : conception business model, licensing réglementaire, architecture technologique, stratégie go-to-market, relations investisseurs.',
      link: '/pillar/fintech-advisory-africa'
    },
    {
      title: isEnglish ? 'Digital Banking Transformation' : 'Transformation Banque Digitale',
      description: isEnglish
        ? 'Digital transformation roadmap for banks: core banking migration, mobile/web app development, agent network expansion, digital product innovation, change management.'
        : 'Feuille de route transformation digitale pour banques : migration core banking, développement apps mobile/web, expansion réseau agents, innovation produits digitaux, conduite du changement.',
      link: '/pillar/digital-transformation-africa'
    },
    {
      title: isEnglish ? 'BCEAO Compliance & Governance' : 'Conformité & Gouvernance BCEAO',
      description: isEnglish
        ? 'Regulatory compliance for UEMOA financial institutions: BCEAO prudential ratios, AML/CFT compliance, governance frameworks, internal audit, risk management.'
        : 'Mise en conformité réglementaire pour institutions financières UEMOA : ratios prudentiels BCEAO, conformité LBC/FT, cadres de gouvernance, audit interne, gestion des risques.',
      link: '/services/gouvernance-conformite'
    },
    {
      title: isEnglish ? 'Mobile Money Strategy' : 'Stratégie Mobile Money',
      description: isEnglish
        ? 'Mobile money ecosystem development: platform selection, agent network design, partnership strategy, product innovation, regulatory compliance, financial inclusion impact.'
        : 'Développement écosystème mobile money : sélection plateforme, conception réseau agents, stratégie partenariats, innovation produits, conformité réglementaire, impact inclusion financière.',
      link: '/pillar/financial-inclusion-africa'
    }
  ];

  const caseStudies = [
    {
      country: 'Nigeria',
      title: isEnglish ? 'Fintech Unicorn Advisory' : 'Conseil Licorne Fintech',
      description: isEnglish
        ? 'Strategic advisory for a Nigerian payments fintech during Series C fundraising: investor deck optimization, financial modeling, due diligence preparation, expansion strategy. Result: $150M raised, valuation $1.2B.'
        : 'Conseil stratégique pour une fintech de paiements nigériane lors d\'une levée Série C : optimisation pitch investisseurs, modélisation financière, préparation due diligence, stratégie d\'expansion. Résultat : 150M$ levés, valorisation 1,2Mds$.',
      impact: isEnglish ? '$150M raised, $1.2B valuation' : '150M$ levés, 1,2Mds$ valorisation'
    },
    {
      country: 'Sénégal',
      title: isEnglish ? 'Microfinance Network Digital Transformation' : 'Transformation Digitale Réseau Microfinance',
      description: isEnglish
        ? 'Complete digital transformation of a Senegalese microfinance network (45 branches, 120K clients): core banking migration, mobile app launch, agent network deployment, BCEAO compliance. Result: 60% cost reduction, 100% compliance.'
        : 'Transformation digitale complète d\'un réseau de microfinance sénégalais (45 agences, 120K clients) : migration core banking, lancement app mobile, déploiement réseau agents, conformité BCEAO. Résultat : 60% réduction coûts, 100% conformité.',
      impact: isEnglish ? '60% cost reduction, 100% compliance' : '60% réduction coûts, 100% conformité'
    },
    {
      country: 'Côte d\'Ivoire',
      title: isEnglish ? 'Regional Bank Digital Strategy' : 'Stratégie Digitale Banque Régionale',
      description: isEnglish
        ? 'Digital transformation strategy for an Ivorian regional bank (8 UEMOA countries): digital roadmap, technology vendor selection, mobile banking launch, digital marketing strategy. Result: 500K digital customers in 24 months.'
        : 'Stratégie de transformation digitale pour une banque régionale ivoirienne (8 pays UEMOA) : roadmap digitale, sélection fournisseurs technologiques, lancement mobile banking, stratégie marketing digital. Résultat : 500K clients digitaux en 24 mois.',
      impact: isEnglish ? '500K digital customers in 24 months' : '500K clients digitaux en 24 mois'
    },
    {
      country: 'Ghana',
      title: isEnglish ? 'SME Digital Lending Platform' : 'Plateforme Crédit Digital PME',
      description: isEnglish
        ? 'Design and launch of a digital SME lending platform for a Ghanaian bank: credit scoring model, digital onboarding, automated underwriting, mobile disbursement. Result: 8,000 SMEs financed, $65M disbursed in 18 months.'
        : 'Conception et lancement d\'une plateforme de crédit digital PME pour une banque ghanéenne : modèle credit scoring, onboarding digital, souscription automatisée, décaissement mobile. Résultat : 8 000 PME financées, 65M$ décaissés en 18 mois.',
      impact: isEnglish ? '8,000 SMEs financed, $65M disbursed' : '8 000 PME financées, 65M$ décaissés'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/regions/west-africa#service`,
        name: 'Khepra Experts - West Africa',
        description: t('regions.westAfrica.seo.description'),
        areaServed: {
          '@type': 'Place',
          name: 'West Africa'
        },
        provider: {
          '@type': 'Organization',
          name: 'Khepra Experts',
          url: SITE_URL
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/regions/west-africa#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Regions',
            item: `${SITE_URL}/regions`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'West Africa',
            item: `${SITE_URL}/regions/west-africa`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('regions.westAfrica.seo.title')}
        description={t('regions.westAfrica.seo.description')}
        keywords={t('regions.westAfrica.seo.keywords')}
        canonicalPath="/regions/west-africa"
        ogType="website"
        schemaJson={jsonLd}
        ogImage={OG_IMAGES.WEST_AFRICA}
        ogImageAlt={isEnglish
          ? "West Africa Financial Services – KHEPRA EXPERTS | UEMOA OHADA Expertise"
          : "Services Financiers Afrique de l'Ouest – KHEPRA EXPERTS | Expertise UEMOA OHADA"}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={isEnglish ? 'en_US' : 'fr_FR'}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="max-w-7xl mx-auto px-6 pt-8">
          <VisibleBreadcrumb
            variant="dark"
            items={[
              { label: isEnglish ? 'Home' : 'Accueil', href: '/', url: `${SITE_URL}/` },
              { label: isEnglish ? 'Regions' : 'Régions', href: '/regions', url: `${SITE_URL}/regions` },
              { label: isEnglish ? 'West Africa' : 'Afrique de l\'Ouest', url: `${SITE_URL}/regions/west-africa` }
            ]}
          />
        </div>
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.regions'), href: '/regions' },
            { label: t('breadcrumb.westAfrica') }
          ]}
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                <i className="ri-map-pin-line text-amber-700"></i>
                <span className="text-sm font-medium text-amber-900">
                  {isEnglish ? '16 Countries • 411M Population • $780B GDP' : '16 Pays • 411M Habitants • 780Mds$ PIB'}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {isEnglish ? 'Strategic Consulting' : 'Conseil Stratégique'}<br />
                <span className="text-amber-600">{isEnglish ? 'West Africa' : 'Afrique de l\'Ouest'}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {isEnglish 
                  ? 'Khepra Experts supports West African institutions in their digital and strategic transformation. With deep expertise in UEMOA regulations, Nigeria\'s fintech ecosystem, and regional payment systems, we help build inclusive and innovative financial services across 16 countries.'
                  : 'Khepra Experts accompagne les institutions ouest-africaines dans leur transformation digitale et stratégique. Avec une expertise approfondie des réglementations UEMOA, de l\'écosystème fintech nigérian et des systèmes de paiement régionaux, nous contribuons à bâtir des services financiers inclusifs et innovants dans 16 pays.'}
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
                  to="/regions/uemoa-cemac" 
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-amber-600 hover:text-amber-600 transition-all font-medium whitespace-nowrap"
                >
                  {isEnglish ? 'UEMOA Expertise' : 'Expertise UEMOA'}
                  <i className="ri-bank-line"></i>
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

        {/* Countries Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Regional Coverage' : 'Couverture Régionale'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Deep expertise across 16 West African countries, from Nigeria\'s fintech hub to UEMOA\'s integrated financial zone.'
                  : 'Expertise approfondie dans 16 pays d\'Afrique de l\'Ouest, du hub fintech nigérian à la zone financière intégrée UEMOA.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {countries.map((country, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1" title={country.name}>{country.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-group-line text-amber-600"></i>
                      <span>{country.population}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-line-chart-line text-amber-600"></i>
                      <span>{country.gdp}</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-lg">
                    <i className="ri-star-line text-amber-600 text-sm"></i>
                    <span className="text-xs font-medium text-amber-900">{country.hub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystems Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Financial Ecosystems' : 'Écosystèmes Financiers'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'West Africa hosts diverse and dynamic financial ecosystems, from UEMOA\'s integrated zone to Nigeria\'s fintech powerhouse.'
                  : 'L\'Afrique de l\'Ouest abrite des écosystèmes financiers diversifiés et dynamiques, de la zone intégrée UEMOA à la puissance fintech nigériane.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ecosystems.map((eco, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                  <div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center mb-6">
                    <i className={`${eco.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2" title={eco.title}>{eco.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{eco.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full mb-6">
                    <i className="ri-information-line text-amber-700"></i>
                    <span className="text-sm font-medium text-amber-900">{eco.countries}</span>
                  </div>
                  <Link 
                    to={eco.link}
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

        {/* Opportunities Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Strategic Opportunities' : 'Opportunités Stratégiques'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'West Africa offers exceptional opportunities for financial innovation, driven by mobile penetration, regulatory harmonization, and entrepreneurial dynamism.'
                  : 'L\'Afrique de l\'Ouest offre des opportunités exceptionnelles pour l\'innovation financière, portées par la pénétration mobile, l\'harmonisation réglementaire et le dynamisme entrepreneurial.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opportunities.map((opp, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${opp.icon} text-2xl text-amber-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2" title={opp.title}>{opp.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{opp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Our Services' : 'Nos Services'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Comprehensive advisory services tailored to West African financial institutions, fintechs, and development organizations.'
                  : 'Services de conseil complets adaptés aux institutions financières, fintechs et organisations de développement ouest-africaines.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2" title={service.title}>{service.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <Link 
                    to={service.link}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {isEnglish ? 'Explore service' : 'Explorer le service'}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Success Stories' : 'Histoires de Succès'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Proven track record of successful transformations across West African markets.'
                  : 'Historique éprouvé de transformations réussies dans les marchés ouest-africains.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-xl text-amber-600"></i>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{study.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2" title={study.title}>{study.title}</h3>
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
                ? 'Contact our West Africa team to discuss your strategic challenges and explore tailored solutions.'
                : 'Contactez notre équipe Afrique de l\'Ouest pour discuter de vos défis stratégiques et explorer des solutions sur mesure.'}
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
        <ScrollToTop />
      </div>
    </>
  );
}



