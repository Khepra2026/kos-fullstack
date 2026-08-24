import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

export default function AfriqueFrancophonePage() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/regions/afrique-francophone#service`,
        name: isEnglish ? 'Francophone Africa Consulting' : 'Conseil Afrique Francophone',
        description: isEnglish
          ? 'Strategic advisory for Francophone African institutions: BCEAO/COBAC compliance, digital transformation, regional expansion, fintech strategy. 29 countries, 430M population, $950B GDP. UEMOA, CEMAC, Maghreb expertise.'
          : 'Conseil stratégique pour institutions africaines francophones : conformité BCEAO/COBAC, transformation digitale, expansion régionale, stratégie fintech. 29 pays, 430M habitants, 950Mds$ PIB. Expertise UEMOA, CEMAC, Maghreb.',
        url: `${SITE_URL}/regions/afrique-francophone`,
        areaServed: {
          '@type': 'Place',
          name: isEnglish ? 'Francophone Africa' : 'Afrique Francophone',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 10.0,
            longitude: 5.0
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
        '@id': `${SITE_URL}/regions/afrique-francophone#breadcrumb`,
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
            name: isEnglish ? 'Francophone Africa' : 'Afrique Francophone',
            item: `${SITE_URL}/regions/afrique-francophone`
          }
        ]
      }
    ]
  };

  const stats = [
    { value: '29', label: isEnglish ? 'Countries' : 'Pays', icon: 'ri-map-2-line' },
    { value: '430M', label: isEnglish ? 'Population' : 'Population', icon: 'ri-group-line' },
    { value: '$950B', label: isEnglish ? 'GDP 2024' : 'PIB 2024', icon: 'ri-line-chart-line' },
    { value: '5.5%', label: isEnglish ? 'GDP Growth' : 'Croissance PIB', icon: 'ri-arrow-up-line' },
    { value: '300M', label: isEnglish ? 'French Speakers' : 'Francophones', icon: 'ri-translate-2' },
    { value: '2', label: isEnglish ? 'Monetary Zones' : 'Zones Monétaires', icon: 'ri-bank-line' }
  ];

  const zones = [
    {
      name: 'UEMOA',
      fullName: isEnglish ? 'West African Economic and Monetary Union' : 'Union Économique et Monétaire Ouest-Africaine',
      countries: isEnglish ? '8 countries' : '8 pays',
      population: '130M',
      gdp: '$180Mds',
      currency: 'CFA Franc BCEAO',
      regulator: 'BCEAO',
      members: isEnglish 
        ? 'Benin, Burkina Faso, Côte d\'Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo'
        : 'Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo',
      link: '/regions/uemoa-cemac'
    },
    {
      name: 'CEMAC',
      fullName: isEnglish ? 'Economic and Monetary Community of Central Africa' : 'Communauté Économique et Monétaire de l\'Afrique Centrale',
      countries: isEnglish ? '6 countries' : '6 pays',
      population: '58M',
      gdp: '$120Mds',
      currency: 'CFA Franc BEAC',
      regulator: 'COBAC',
      members: isEnglish
        ? 'Cameroon, Central African Republic, Chad, Republic of Congo, Equatorial Guinea, Gabon'
        : 'Cameroun, République Centrafricaine, Tchad, République du Congo, Guinée Équatoriale, Gabon',
      link: '/regions/uemoa-cemac'
    },
    {
      name: isEnglish ? 'Maghreb' : 'Maghreb',
      fullName: isEnglish ? 'North African Francophone Countries' : 'Pays Francophones d\'Afrique du Nord',
      countries: isEnglish ? '5 countries' : '5 pays',
      population: '105M',
      gdp: '$380Mds',
      currency: isEnglish ? 'National currencies' : 'Monnaies nationales',
      regulator: isEnglish ? 'National central banks' : 'Banques centrales nationales',
      members: isEnglish
        ? 'Morocco, Algeria, Tunisia, Mauritania, Libya'
        : 'Maroc, Algérie, Tunisie, Mauritanie, Libye',
      link: '/regions/north-africa'
    },
    {
      name: isEnglish ? 'Indian Ocean' : 'Océan Indien',
      fullName: isEnglish ? 'Francophone Indian Ocean Islands' : 'Îles Francophones de l\'Océan Indien',
      countries: isEnglish ? '4 countries' : '4 pays',
      population: '32M',
      gdp: '$55Mds',
      currency: isEnglish ? 'National currencies' : 'Monnaies nationales',
      regulator: isEnglish ? 'National central banks' : 'Banques centrales nationales',
      members: isEnglish
        ? 'Madagascar, Mauritius, Comoros, Seychelles'
        : 'Madagascar, Maurice, Comores, Seychelles',
      link: '/regions/indian-ocean'
    }
  ];

  const advantages = [
    {
      title: isEnglish ? 'Linguistic Unity' : 'Unité Linguistique',
      icon: 'ri-translate-2',
      description: isEnglish
        ? 'French as common language facilitates business operations, regulatory compliance, and knowledge transfer across 29 countries. Shared legal frameworks (Napoleonic Code) and business practices reduce transaction costs and accelerate market entry.'
        : 'Le français comme langue commune facilite les opérations commerciales, la conformité réglementaire et le transfert de connaissances dans 29 pays. Les cadres juridiques partagés (Code Napoléon) et pratiques commerciales réduisent les coûts de transaction et accélèrent l\'entrée sur le marché.',
      stats: isEnglish ? '300M French speakers' : '300M francophones'
    },
    {
      title: isEnglish ? 'Monetary Integration' : 'Intégration Monétaire',
      icon: 'ri-bank-line',
      description: isEnglish
        ? 'UEMOA and CEMAC zones share common currencies (CFA Franc), harmonized banking regulations, and integrated payment systems. This monetary stability (fixed parity with Euro) reduces exchange rate risks and facilitates cross-border transactions.'
        : 'Les zones UEMOA et CEMAC partagent des monnaies communes (Franc CFA), des réglementations bancaires harmonisées et des systèmes de paiement intégrés. Cette stabilité monétaire (parité fixe avec l\'Euro) réduit les risques de change et facilite les transactions transfrontalières.',
      stats: isEnglish ? '14 countries, 1 currency' : '14 pays, 1 monnaie'
    },
    {
      title: isEnglish ? 'Regulatory Harmonization' : 'Harmonisation Réglementaire',
      icon: 'ri-shield-check-line',
      description: isEnglish
        ? 'BCEAO (UEMOA) and COBAC (CEMAC) provide unified banking supervision, prudential standards, and licensing frameworks. Regional directives on microfinance, mobile money, and fintech create predictable regulatory environments for financial innovation.'
        : 'La BCEAO (UEMOA) et la COBAC (CEMAC) assurent une supervision bancaire unifiée, des normes prudentielles et des cadres de licensing harmonisés. Les directives régionales sur la microfinance, le mobile money et la fintech créent des environnements réglementaires prévisibles pour l\'innovation financière.',
      stats: isEnglish ? 'Unified supervision' : 'Supervision unifiée'
    },
    {
      title: isEnglish ? 'Institutional Networks' : 'Réseaux Institutionnels',
      icon: 'ri-community-line',
      description: isEnglish
        ? 'Strong institutional networks (OIF, AUF, BOAD, AFD) facilitate knowledge sharing, capacity building, and project financing. Regional development banks and multilateral institutions prioritize Francophone Africa for financial inclusion and digital transformation initiatives.'
        : 'Des réseaux institutionnels solides (OIF, AUF, BOAD, AFD) facilitent le partage de connaissances, le renforcement des capacités et le financement de projets. Les banques régionales de développement et institutions multilatérales priorisent l\'Afrique francophone pour les initiatives d\'inclusion financière et transformation digitale.',
      stats: isEnglish ? 'Strong institutional support' : 'Fort soutien institutionnel'
    }
  ];

  const sectors = [
    {
      title: isEnglish ? 'Banking & Microfinance' : 'Banque & Microfinance',
      icon: 'ri-bank-line',
      description: isEnglish
        ? 'Francophone Africa hosts 180+ commercial banks and 2,500+ microfinance institutions serving 35M clients. Key challenges: BCEAO/COBAC compliance, digital transformation, risk management, governance modernization. Opportunities: regional expansion, digital banking, SME financing.'
        : 'L\'Afrique francophone compte 180+ banques commerciales et 2 500+ institutions de microfinance servant 35M clients. Défis clés : conformité BCEAO/COBAC, transformation digitale, gestion des risques, modernisation gouvernance. Opportunités : expansion régionale, banque digitale, financement PME.',
      link: '/industries/microfinance'
    },
    {
      title: isEnglish ? 'Mobile Money & Fintech' : 'Mobile Money & Fintech',
      icon: 'ri-smartphone-line',
      description: isEnglish
        ? '150M mobile money accounts across Francophone Africa, dominated by Orange Money, MTN Mobile Money, Moov Money. Fintech ecosystem growing rapidly: 200+ active fintechs, $1.2B raised since 2019. Key sectors: payments, lending, insurtech, remittances.'
        : '150M comptes mobile money en Afrique francophone, dominés par Orange Money, MTN Mobile Money, Moov Money. L\'écosystème fintech croît rapidement : 200+ fintechs actives, 1,2Mds$ levés depuis 2019. Secteurs clés : paiements, crédit, insurtech, transferts.',
      link: '/pillar/fintech-advisory-africa'
    },
    {
      title: isEnglish ? 'Public Sector Modernization' : 'Modernisation Secteur Public',
      icon: 'ri-government-line',
      description: isEnglish
        ? 'Governments accelerate digital transformation: e-government, digital identity, tax digitalization, public procurement platforms. Opportunities: advisory on digital strategy, system integration, capacity building, change management for ministries and public agencies.'
        : 'Les gouvernements accélèrent la transformation digitale : e-gouvernement, identité numérique, digitalisation fiscale, plateformes marchés publics. Opportunités : conseil en stratégie digitale, intégration systèmes, renforcement capacités, conduite du changement pour ministères et agences publiques.',
      link: '/industries/public-sector'
    },
    {
      title: isEnglish ? 'SME Development' : 'Développement PME',
      icon: 'ri-store-2-line',
      description: isEnglish
        ? 'SMEs represent 90% of businesses in Francophone Africa but face $150B financing gap. Digital solutions unlock opportunities: credit scoring, supply chain finance, e-commerce platforms, business management tools. Advisory needs: SME financing strategies, digital adoption, capacity building.'
        : 'Les PME représentent 90% des entreprises en Afrique francophone mais font face à un déficit de 150Mds$. Les solutions digitales ouvrent des opportunités : credit scoring, supply chain finance, plateformes e-commerce, outils gestion. Besoins conseil : stratégies financement PME, adoption digitale, renforcement capacités.',
      link: '/pillar/sme-development-africa'
    }
  ];

  const services = [
    {
      title: isEnglish ? 'BCEAO/COBAC Regulatory Compliance' : 'Conformité Réglementaire BCEAO/COBAC',
      description: isEnglish
        ? 'Complete regulatory compliance for UEMOA and CEMAC financial institutions: prudential ratios, AML/CFT compliance, governance frameworks, internal audit, risk management, regulatory reporting. Deep expertise in BCEAO and COBAC requirements.'
        : 'Mise en conformité réglementaire complète pour institutions financières UEMOA et CEMAC : ratios prudentiels, conformité LBC/FT, cadres de gouvernance, audit interne, gestion des risques, reporting réglementaire. Expertise approfondie des exigences BCEAO et COBAC.',
      icon: 'ri-shield-check-line',
      link: '/services/gouvernance-conformite'
    },
    {
      title: isEnglish ? 'Regional Expansion Strategy' : 'Stratégie d\'Expansion Régionale',
      description: isEnglish
        ? 'Strategic advisory for regional expansion across Francophone Africa: market entry strategy, regulatory licensing, partnership identification, operational setup, risk assessment. Leverage monetary integration and regulatory harmonization for efficient multi-country deployment.'
        : 'Conseil stratégique pour expansion régionale en Afrique francophone : stratégie d\'entrée marché, licensing réglementaire, identification partenaires, setup opérationnel, évaluation risques. Tirer parti de l\'intégration monétaire et harmonisation réglementaire pour déploiement multi-pays efficace.',
      icon: 'ri-global-line',
      link: '/services/strategie-croissance'
    },
    {
      title: isEnglish ? 'Digital Transformation' : 'Transformation Digitale',
      description: isEnglish
        ? 'End-to-end digital transformation for Francophone institutions: digital strategy, core banking migration, mobile/web channels, agent networks, digital products, change management. Adapted to local contexts and regulatory requirements.'
        : 'Transformation digitale end-to-end pour institutions francophones : stratégie digitale, migration core banking, canaux mobile/web, réseaux agents, produits digitaux, conduite du changement. Adaptée aux contextes locaux et exigences réglementaires.',
      icon: 'ri-smartphone-line',
      link: '/pillar/digital-transformation-africa'
    },
    {
      title: isEnglish ? 'Capacity Building & Training' : 'Renforcement Capacités & Formation',
      description: isEnglish
        ? 'Customized training programs in French for financial institutions: governance, risk management, digital banking, regulatory compliance, strategic planning. Workshops, seminars, and long-term capacity building programs adapted to Francophone contexts.'
        : 'Programmes de formation sur mesure en français pour institutions financières : gouvernance, gestion des risques, banque digitale, conformité réglementaire, planification stratégique. Ateliers, séminaires et programmes de renforcement des capacités adaptés aux contextes francophones.',
      icon: 'ri-graduation-cap-line',
      link: '/services/formation-conseil'
    }
  ];

  const caseStudies = [
    {
      zone: 'UEMOA',
      country: isEnglish ? 'Senegal' : 'Sénégal',
      title: isEnglish ? 'Regional Microfinance Network Transformation' : 'Transformation Réseau Microfinance Régional',
      description: isEnglish
        ? 'Digital transformation and BCEAO compliance for a Senegalese microfinance network operating in 5 UEMOA countries (45 branches, 120K clients): core banking migration, mobile channels, agent network, regulatory compliance. Result: 60% cost reduction, 100% compliance, 3x digital adoption.'
        : 'Transformation digitale et conformité BCEAO pour un réseau de microfinance sénégalais opérant dans 5 pays UEMOA (45 agences, 120K clients) : migration core banking, canaux mobiles, réseau agents, conformité réglementaire. Résultat : 60% réduction coûts, 100% conformité, 3x adoption digitale.',
      impact: isEnglish ? '60% cost reduction, 5 countries' : '60% réduction coûts, 5 pays'
    },
    {
      zone: 'CEMAC',
      country: isEnglish ? 'Cameroon' : 'Cameroun',
      title: isEnglish ? 'Regional Bank Digital Strategy' : 'Stratégie Digitale Banque Régionale',
      description: isEnglish
        ? 'Digital transformation roadmap for a Cameroonian regional bank (6 CEMAC countries): digital strategy, technology vendor selection, mobile banking launch, agent network expansion, digital marketing. Result: 800K digital customers in 30 months, 40% cost-to-income improvement.'
        : 'Feuille de route transformation digitale pour une banque régionale camerounaise (6 pays CEMAC) : stratégie digitale, sélection fournisseurs technologiques, lancement mobile banking, expansion réseau agents, marketing digital. Résultat : 800K clients digitaux en 30 mois, 40% amélioration cost-to-income.',
      impact: isEnglish ? '800K digital customers, 6 countries' : '800K clients digitaux, 6 pays'
    },
    {
      zone: 'UEMOA',
      country: isEnglish ? 'Côte d\'Ivoire' : 'Côte d\'Ivoire',
      title: isEnglish ? 'Fintech Regulatory Licensing' : 'Licensing Réglementaire Fintech',
      description: isEnglish
        ? 'Regulatory advisory for an Ivorian fintech startup seeking BCEAO licensing for mobile money services: regulatory strategy, licensing application, compliance framework, operational setup. Result: BCEAO approval in 8 months, successful launch in 3 UEMOA countries.'
        : 'Conseil réglementaire pour une startup fintech ivoirienne cherchant le licensing BCEAO pour services mobile money : stratégie réglementaire, dossier licensing, cadre de conformité, setup opérationnel. Résultat : approbation BCEAO en 8 mois, lancement réussi dans 3 pays UEMOA.',
      impact: isEnglish ? 'BCEAO approval, 3 countries launch' : 'Approbation BCEAO, lancement 3 pays'
    },
    {
      zone: 'Maghreb',
      country: isEnglish ? 'Morocco' : 'Maroc',
      title: isEnglish ? 'Digital Banking Transformation' : 'Transformation Banque Digitale',
      description: isEnglish
        ? 'Digital transformation for a Moroccan commercial bank: digital strategy, core banking modernization, mobile/web app development, digital product innovation, change management. Result: 1.2M digital customers, 50% digital transaction rate, 35% cost reduction.'
        : 'Transformation digitale pour une banque commerciale marocaine : stratégie digitale, modernisation core banking, développement apps mobile/web, innovation produits digitaux, conduite du changement. Résultat : 1,2M clients digitaux, 50% taux transactions digitales, 35% réduction coûts.',
      impact: isEnglish ? '1.2M digital customers, 50% digital rate' : '1,2M clients digitaux, 50% taux digital'
    }
  ];

  return (
    <>
      <SeoHead
        title={t('regions.francophoneAfrica.seo.title')}
        description={t('regions.francophoneAfrica.seo.description')}
        keywords={t('regions.francophoneAfrica.seo.keywords')}
        canonicalPath="/regions/afrique-francophone"
        schemaJson={schemaJson}
        ogImage={OG_IMAGES.FRANCOPHONE_AFRICA}
        ogImageAlt={isEnglish
          ? "Francophone Africa Consulting – KHEPRA EXPERTS | UEMOA CEMAC Maghreb Expertise"
          : "Conseil Afrique Francophone – KHEPRA EXPERTS | Expertise UEMOA CEMAC Maghreb"}
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
                { label: isEnglish ? 'Francophone Africa' : 'Afrique Francophone', url: `${SITE_URL}/regions/afrique-francophone` }
              ]}
              className="mb-6"
            />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                <i className="ri-translate-2 text-amber-700"></i>
                <span className="text-sm font-medium text-amber-900">
                  {isEnglish ? '29 Countries • 430M Population • 300M French Speakers' : '29 Pays • 430M Habitants • 300M Francophones'}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {isEnglish ? 'Strategic Consulting' : 'Conseil Stratégique'}<br />
                <span className="text-amber-600">{isEnglish ? 'Francophone Africa' : 'Afrique Francophone'}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {isEnglish 
                  ? 'Khepra Experts supports Francophone African institutions in their strategic transformation. With deep expertise in BCEAO/COBAC regulations, monetary integration (UEMOA, CEMAC), and Francophone business practices, we help financial institutions, fintechs, and public organizations build inclusive and sustainable ecosystems across 29 countries.'
                  : 'Khepra Experts accompagne les institutions africaines francophones dans leur transformation stratégique. Avec une expertise approfondie des réglementations BCEAO/COBAC, de l\'intégration monétaire (UEMOA, CEMAC) et des pratiques commerciales francophones, nous aidons les institutions financières, fintechs et organisations publiques à bâtir des écosystèmes inclusifs et durables dans 29 pays.'}
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
                  {isEnglish ? 'UEMOA/CEMAC Expertise' : 'Expertise UEMOA/CEMAC'}
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

        {/* Monetary Zones Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Monetary & Economic Zones' : 'Zones Monétaires & Économiques'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Francophone Africa benefits from integrated monetary zones and harmonized regulatory frameworks that facilitate regional operations and financial innovation.'
                  : 'L\'Afrique francophone bénéficie de zones monétaires intégrées et de cadres réglementaires harmonisés qui facilitent les opérations régionales et l\'innovation financière.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {zones.map((zone, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                      <i className="ri-bank-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 line-clamp-1" title={zone.name}>{zone.name}</h3>
                      <p className="text-sm text-gray-600">{zone.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{isEnglish ? 'Countries' : 'Pays'}</div>
                      <div className="text-lg font-bold text-gray-900">{zone.countries}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{isEnglish ? 'Population' : 'Population'}</div>
                      <div className="text-lg font-bold text-gray-900">{zone.population}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">GDP</div>
                      <div className="text-lg font-bold text-gray-900">{zone.gdp}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{isEnglish ? 'Regulator' : 'Régulateur'}</div>
                      <div className="text-lg font-bold text-gray-900">{zone.regulator}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-lg mb-3">
                      <i className="ri-money-dollar-circle-line text-green-700"></i>
                      <span className="text-sm font-medium text-green-900">{zone.currency}</span>
                    </div>
                    <p className="text-sm text-gray-700">{zone.members}</p>
                  </div>

                  <Link 
                    to={zone.link}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {isEnglish ? 'Explore zone' : 'Explorer la zone'}
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Strategic Advantages' : 'Avantages Stratégiques'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Francophone Africa offers unique advantages for financial institutions and fintechs seeking regional expansion and sustainable growth.'
                  : 'L\'Afrique francophone offre des avantages uniques pour les institutions financières et fintechs cherchant l\'expansion régionale et la croissance durable.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advantages.map((adv, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                  <div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center mb-6">
                    <i className={`${adv.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2" title={adv.title}>{adv.title}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full mb-4">
                    <i className="ri-star-line text-amber-700"></i>
                    <span className="text-sm font-medium text-amber-900">{adv.stats}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Key Sectors' : 'Secteurs Clés'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Our expertise spans critical sectors driving financial inclusion and digital transformation across Francophone Africa.'
                  : 'Notre expertise couvre les secteurs critiques qui portent l\'inclusion financière et la transformation digitale en Afrique francophone.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {sectors.map((sector, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <i className={`${sector.icon} text-3xl text-amber-600`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2" title={sector.title}>{sector.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{sector.description}</p>
                  <Link 
                    to={sector.link}
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

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {isEnglish ? 'Our Services' : 'Nos Services'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Comprehensive advisory services tailored to Francophone African institutions, delivered in French by experts who understand local contexts.'
                  : 'Services de conseil complets adaptés aux institutions africaines francophones, délivrés en français par des experts qui comprennent les contextes locaux.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${service.icon} text-2xl text-amber-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2" title={service.title}>{service.title}</h3>
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
                  ? 'Proven track record of successful transformations across Francophone African markets and monetary zones.'
                  : 'Historique éprouvé de transformations réussies dans les marchés et zones monétaires d\'Afrique francophone.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <i className="ri-map-pin-line text-xl text-amber-600"></i>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-amber-600">{study.zone}</span>
                      <div className="text-lg font-bold text-gray-900">{study.country}</div>
                    </div>
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
                ? 'Contact our Francophone Africa team to discuss your strategic challenges and explore tailored solutions in French.'
                : 'Contactez notre équipe Afrique francophone pour discuter de vos défis stratégiques et explorer des solutions sur mesure en français.'}
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



