import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { buildHreflang } from '@/utils/hreflang';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { AfricaMapInteractive } from '@/components/feature/AfricaMapInteractive';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const AfriqueExpertisePage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const countries = [
    { name: 'Togo', flag: '🇹🇬', clients: 45, sectors: ['Microfinance', 'PME', 'Secteur Public'], slug: 'togo' },
    { name: 'Bénin', flag: '🇧🇯', clients: 38, sectors: ['Banques', 'Fintech', 'PME'], slug: 'benin' },
    { name: 'Côte d\'Ivoire', flag: '🇨🇮', clients: 52, sectors: ['Institutions Financières', 'PME', 'Startups'], slug: 'cote-ivoire' },
    { name: 'Sénégal', flag: '🇸🇳', clients: 41, sectors: ['Fintech', 'Microfinance', 'Digital'], slug: 'senegal' },
    { name: 'Burkina Faso', flag: '🇧🇫', clients: 29, sectors: ['SFD', 'PME', 'Agriculture'], slug: 'burkina-faso' },
    { name: 'Ghana', flag: '🇬🇭', clients: 24, sectors: ['Fintech', 'Banking', 'SME'], slug: 'ghana' },
    { name: 'Cameroun', flag: '🇨🇲', clients: 33, sectors: ['Microfinance', 'PME', 'Public'], slug: 'cameroun' },
    { name: 'Mali', flag: '🇲🇱', clients: 18, sectors: ['SFD', 'Agriculture', 'PME'], slug: 'mali' },
    { name: 'Niger', flag: '🇳🇪', clients: 15, sectors: ['Microfinance', 'PME', 'Public'], slug: 'niger' },
    { name: 'Guinée', flag: '🇬🇳', clients: 21, sectors: ['Banques', 'PME', 'Mining'], slug: 'guinee' },
    { name: 'RD Congo', flag: '🇨🇩', clients: 27, sectors: ['Fintech', 'Banking', 'Telecom'], slug: 'rd-congo' },
    { name: 'Gabon', flag: '🇬🇦', clients: 16, sectors: ['Banques', 'PME', 'Oil & Gas'], slug: 'gabon' },
  ];

  const economicData = [
    {
      region: currentLang === 'en' ? 'West Africa (UEMOA)' : 'Afrique de l\'Ouest (UEMOA)',
      population: '130M+',
      gdp: currentLang === 'en' ? '$150B USD' : '150Mds USD',
      growth: '+5.2%',
      sectors: currentLang === 'en' 
        ? ['Financial inclusion', 'Fintech', 'Agriculture', 'Digital services']
        : ['Inclusion financière', 'Fintech', 'Agriculture', 'Services digitaux'],
      opportunities: currentLang === 'en'
        ? ['Mobile money penetration: 45%', 'Unbanked population: 65M', 'Digital transformation acceleration', 'Regional integration UEMOA']
        : ['Pénétration mobile money : 45%', 'Population non bancarisée : 65M', 'Accélération transformation digitale', 'Intégration régionale UEMOA']
    },
    {
      region: currentLang === 'en' ? 'Central Africa (CEMAC)' : 'Afrique Centrale (CEMAC)',
      population: '55M+',
      gdp: currentLang === 'en' ? '$120B USD' : '120Mds USD',
      growth: '+3.8%',
      sectors: currentLang === 'en'
        ? ['Banking', 'Natural resources', 'Infrastructure', 'Microfinance']
        : ['Banque', 'Ressources naturelles', 'Infrastructures', 'Microfinance'],
      opportunities: currentLang === 'en'
        ? ['Banking rate: 18%', 'Infrastructure investment', 'COBAC regulatory harmonization', 'Cross-border payments']
        : ['Taux de bancarisation : 18%', 'Investissements infrastructures', 'Harmonisation réglementaire COBAC', 'Paiements transfrontaliers']
    }
  ];

  const testimonials = [
    {
      country: 'Togo',
      flag: '🇹🇬',
      client: currentLang === 'en' ? 'CEO, Microfinance Institution' : 'Directeur Général, Institution de Microfinance',
      quote: currentLang === 'en' 
        ? 'Khepra Experts transformed our governance and risk management processes. Their knowledge of the Togolese context and BCEAO requirements is exceptional.'
        : 'Khepra Experts a transformé notre gouvernance et nos processus de gestion des risques. Leur connaissance du contexte togolais et des exigences BCEAO est exceptionnelle.',
      impact: currentLang === 'en' ? '+42% regulatory compliance' : '+42% de conformité réglementaire',
    },
    {
      country: 'Côte d\'Ivoire',
      flag: '🇨🇮',
      client: currentLang === 'en' ? 'CEO, Fintech Payment' : 'CEO, Fintech Payment',
      quote: currentLang === 'en'
        ? 'Khepra\'s support in our digital transformation was decisive. They understand the challenges of the Ivorian market and the UEMOA ecosystem.'
        : 'L\'accompagnement de Khepra dans notre transformation digitale a été déterminant. Ils comprennent les enjeux du marché ivoirien et de l\'écosystème UEMOA.',
      impact: currentLang === 'en' ? '3x growth in 18 months' : '3x croissance en 18 mois',
    },
    {
      country: 'Sénégal',
      flag: '🇸🇳',
      client: currentLang === 'en' ? 'CFO, Banking Group' : 'Directrice Financière, Groupe Bancaire',
      quote: currentLang === 'en'
        ? 'Their expertise in financial audit and IFRS compliance enabled us to strengthen our credibility with international investors.'
        : 'Leur expertise en audit financier et conformité IFRS nous a permis de renforcer notre crédibilité auprès des investisseurs internationaux.',
      impact: currentLang === 'en' ? 'ISO certification obtained' : 'Certification ISO obtenue',
    },
  ];

  const caseStudies = [
    {
      country: 'Bénin',
      flag: '🇧🇯',
      title: currentLang === 'en' ? 'Digital transformation of a 47-branch network' : 'Transformation digitale d\'un réseau de 47 agences',
      sector: 'Microfinance',
      challenge: currentLang === 'en' 
        ? 'Complete digitalization of operations and BCEAO compliance'
        : 'Digitalisation complète des opérations et mise en conformité BCEAO',
      solution: currentLang === 'en'
        ? 'Core banking system deployment and training of 180 agents'
        : 'Déploiement d\'un core banking system et formation de 180 agents',
      results: [
        currentLang === 'en' ? '-65% processing time' : '-65% temps de traitement',
        currentLang === 'en' ? '+89% customer satisfaction' : '+89% satisfaction client',
        currentLang === 'en' ? '100% regulatory compliance' : '100% conformité réglementaire'
      ],
      duration: currentLang === 'en' ? '8 months' : '8 mois',
    },
    {
      country: 'Burkina Faso',
      flag: '🇧🇫',
      title: currentLang === 'en' ? 'Financial restructuring and governance' : 'Restructuration financière et gouvernance',
      sector: currentLang === 'en' ? 'SME Agro-industry' : 'PME Agro-industrie',
      challenge: currentLang === 'en'
        ? 'Cash flow difficulties and inadequate family governance'
        : 'Difficultés de trésorerie et gouvernance familiale inadaptée',
      solution: currentLang === 'en'
        ? 'Financial audit, debt restructuring, board of directors implementation'
        : 'Audit financier, restructuration dette, mise en place conseil d\'administration',
      results: [
        currentLang === 'en' ? '+156% profitability' : '+156% rentabilité',
        currentLang === 'en' ? '€2M fundraising' : 'Levée de fonds 2M€',
        currentLang === 'en' ? 'Professionalized governance' : 'Gouvernance professionnalisée'
      ],
      duration: currentLang === 'en' ? '12 months' : '12 mois',
    },
    {
      country: 'Cameroun',
      flag: '🇨🇲',
      title: currentLang === 'en' ? 'Launch of a regional fintech platform' : 'Lancement d\'une plateforme fintech régionale',
      sector: currentLang === 'en' ? 'Fintech & Payments' : 'Fintech & Paiements',
      challenge: currentLang === 'en'
        ? 'COBAC compliance and CEMAC expansion strategy'
        : 'Conformité COBAC et stratégie d\'expansion CEMAC',
      solution: currentLang === 'en'
        ? 'Regulatory due diligence, business plan, banking partnerships'
        : 'Due diligence réglementaire, business plan, partenariats bancaires',
      results: [
        currentLang === 'en' ? 'COBAC approval obtained' : 'Agrément COBAC obtenu',
        currentLang === 'en' ? '50K users in 6 months' : '50K utilisateurs en 6 mois',
        currentLang === 'en' ? '4-country expansion' : 'Expansion 4 pays'
      ],
      duration: currentLang === 'en' ? '10 months' : '10 mois',
    },
  ];

  const partners = [
    { name: 'BCEAO', type: currentLang === 'en' ? 'Regulator' : 'Régulateur', countries: ['UEMOA'] },
    { name: 'COBAC', type: currentLang === 'en' ? 'Regulator' : 'Régulateur', countries: ['CEMAC'] },
    { name: currentLang === 'en' ? 'World Bank' : 'Banque Mondiale', type: currentLang === 'en' ? 'Donor' : 'Bailleur', countries: [currentLang === 'en' ? 'Multi-country' : 'Multi-pays'] },
    { name: 'AFD', type: currentLang === 'en' ? 'Donor' : 'Bailleur', countries: [currentLang === 'en' ? 'Francophone Africa' : 'Afrique francophone'] },
    { name: 'BAD', type: currentLang === 'en' ? 'Institution' : 'Institution', countries: [currentLang === 'en' ? 'Pan-African' : 'Panafricain'] },
    { name: 'CGAP', type: currentLang === 'en' ? 'Network' : 'Réseau', countries: ['Global'] },
  ];

  // Schema.org enrichi pour le SEO international
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/regions/afrique#service`,
        "name": currentLang === 'en' ? "Strategic Consulting in Africa" : "Conseil Stratégique en Afrique",
        "description": currentLang === 'en'
          ? "Pan-African consulting firm specialized in governance, financial audit and digital transformation. Active presence in 15+ West and Central African countries with deep local expertise."
          : "Cabinet de conseil panafricain spécialisé en gouvernance, audit financier et transformation digitale. Présence active dans 15+ pays d'Afrique de l'Ouest et Centrale avec expertise locale approfondie.",
        "url": `${SITE_URL}/regions/afrique`,
        "areaServed": [
          { "@type": "Country", "name": "Togo" },
          { "@type": "Country", "name": "Benin" },
          { "@type": "Country", "name": "Côte d'Ivoire" },
          { "@type": "Country", "name": "Senegal" },
          { "@type": "Country", "name": "Burkina Faso" },
          { "@type": "Country", "name": "Ghana" },
          { "@type": "Country", "name": "Cameroon" },
          { "@type": "Country", "name": "Mali" },
          { "@type": "Country", "name": "Niger" },
          { "@type": "Country", "name": "Guinea" },
          { "@type": "Country", "name": "DR Congo" },
          { "@type": "Country", "name": "Gabon" }
        ],
        "serviceType": [
          "Financial inclusion consulting",
          "Fintech advisory",
          "Digital transformation consulting",
          "Microfinance consulting",
          "SME development advisory",
          "Regulatory compliance BCEAO COBAC"
        ],
        "knowsAbout": [
          "BCEAO regulations",
          "COBAC compliance",
          "UEMOA financial sector",
          "CEMAC banking",
          "African fintech ecosystem",
          "Microfinance Africa",
          "Digital transformation Africa"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5"
        },
        "priceRange": "$$$$",
        "telephone": "+228-90-00-00-00",
        "email": "contact@khepraexperts.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Boulevard du 13 Janvier",
          "addressLocality": "Lomé",
          "addressCountry": "TG"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/regions/afrique#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": currentLang === 'en' ? "Home" : "Accueil",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": currentLang === 'en' ? "Regions" : "Régions",
            "item": `${SITE_URL}/regions`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": currentLang === 'en' ? "Africa" : "Afrique",
            "item": `${SITE_URL}/regions/afrique`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/regions/afrique#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLang === 'en' ? "What is Khepra Experts' presence in Africa?" : "Quelle est la présence de Khepra Experts en Afrique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'en' 
                ? "Khepra Experts operates in 15+ African countries including Togo, Benin, Côte d'Ivoire, Senegal, Burkina Faso, Ghana, Cameroon, Mali, Niger, Guinea, DR Congo, and Gabon. We have completed 250+ missions with 180+ active clients."
                : "Khepra Experts intervient dans 15+ pays africains dont le Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Ghana, Cameroun, Mali, Niger, Guinée, RD Congo et Gabon. Nous avons réalisé 250+ missions avec 180+ clients actifs."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'en' ? "What services does Khepra Experts offer in Africa?" : "Quels services propose Khepra Experts en Afrique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'en'
                ? "We offer financial inclusion consulting, fintech advisory, digital transformation consulting, microfinance compliance, SME development advisory, BCEAO/COBAC regulatory compliance, governance structuring, and financial audit services."
                : "Nous proposons du conseil en inclusion financière, advisory fintech, transformation digitale, conformité microfinance, développement PME, conformité réglementaire BCEAO/COBAC, structuration de la gouvernance et audit financier."
            }
          },
          {
            "@type": "Question",
            "name": currentLang === 'en' ? "Does Khepra Experts understand BCEAO and COBAC regulations?" : "Khepra Experts maîtrise-t-il les réglementations BCEAO et COBAC ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLang === 'en'
                ? "Yes, we have 10+ years of experience with BCEAO (UEMOA) and COBAC (CEMAC) regulatory frameworks. Our team includes former BCEAO/COBAC executives and certified compliance specialists."
                : "Oui, nous avons 10+ années d'expérience avec les cadres réglementaires BCEAO (UEMOA) et COBAC (CEMAC). Notre équipe comprend d'anciens cadres BCEAO/COBAC et des spécialistes conformité certifiés."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('regions.afrique.seo.title')}
        description={t('regions.afrique.seo.description')}
        keywords={t('regions.afrique.seo.keywords')}
        canonicalPath="/regions/afrique"
        structuredData={schemaData}
        hreflangLinks={buildHreflang('/regions/afrique')}
        geoRegion="TG"
        geoPlacename="Lomé, Togo"
        geoPosition="6.1256;1.2223"
        ogImage={OG_IMAGES.AFRIQUE}
        ogImageAlt={currentLang === 'en' 
          ? "Strategic Consulting in Africa – KHEPRA EXPERTS | Pan-African Presence 15+ Countries"
          : "Expertise Conseil Stratégique en Afrique – KHEPRA EXPERTS | Présence Panafricaine 15+ Pays"}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={currentLang === 'en' ? 'en_US' : 'fr_FR'}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20geometric%20pattern%20representing%20african%20continent%20map%20with%20interconnected%20network%20lines%20modern%20minimalist%20style%20dark%20navy%20background%20gold%20accents%20professional%20consulting%20aesthetic%20clean%20simple%20design&width=1920&height=800&seq=afrique-hero-bg&orientation=landscape')] opacity-5 bg-cover bg-center"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <VisibleBreadcrumb
              variant="light"
              items={[
                { label: currentLang === 'en' ? 'Home' : 'Accueil', href: '/', url: `${SITE_URL}/` },
                { label: currentLang === 'en' ? 'Regions' : 'Régions', href: '/regions', url: `${SITE_URL}/regions` },
                { label: currentLang === 'en' ? 'Africa' : 'Afrique', url: `${SITE_URL}/regions/afrique` }
              ]}
              withSchema={false}
            />
            <Breadcrumb />
            
            <div className="mt-12 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <i className="ri-global-line text-3xl text-white"></i>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
                    {currentLang === 'en' ? 'Pan-African Presence' : 'Présence Panafricaine'}
                  </p>
                  <p className="text-slate-300 text-sm">
                    {currentLang === 'en' ? '15+ countries · 250+ missions · 10 years experience' : '15+ pays · 250+ missions · 10 ans d\'expérience'}
                  </p>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentLang === 'en' ? (
                  <>Your strategic partner<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">in West and Central Africa</span></>
                ) : (
                  <>Votre partenaire stratégique<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">en Afrique de l'Ouest et Centrale</span></>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {currentLang === 'en'
                  ? 'Deep local expertise combined with international standards to support the transformation of African organizations. Financial inclusion consulting, fintech advisory, digital transformation, and regulatory compliance BCEAO/COBAC.'
                  : 'Une expertise locale approfondie combinée à des standards internationaux pour accompagner la transformation des organisations africaines. Conseil en inclusion financière, fintech, transformation digitale et conformité réglementaire BCEAO/COBAC.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  {currentLang === 'en' ? 'Discuss your project' : 'Discuter de votre projet'}
                </Link>
                <a
                  href="#carte-presence"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 whitespace-nowrap cursor-pointer"
                >
                  {currentLang === 'en' ? 'View our presence' : 'Voir notre présence'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">15+</div>
                <div className="text-slate-600">{currentLang === 'en' ? 'Countries of intervention' : 'Pays d\'intervention'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">250+</div>
                <div className="text-slate-600">{currentLang === 'en' ? 'Missions completed' : 'Missions réalisées'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">180+</div>
                <div className="text-slate-600">{currentLang === 'en' ? 'Active clients' : 'Clients actifs'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">10</div>
                <div className="text-slate-600">{currentLang === 'en' ? 'Years of experience' : 'Années d\'expérience'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Data Section - NEW */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'African Markets: Key Economic Data' : 'Marchés africains : Données économiques clés'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Strategic opportunities in West and Central Africa' : 'Opportunités stratégiques en Afrique de l\'Ouest et Centrale'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {economicData.map((data, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 line-clamp-2" title={data.region}>{data.region}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600 mb-1">{data.population}</div>
                      <div className="text-xs text-slate-600">{currentLang === 'en' ? 'Population' : 'Population'}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600 mb-1">{data.gdp}</div>
                      <div className="text-xs text-slate-600">PIB</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{data.growth}</div>
                      <div className="text-xs text-slate-600">{currentLang === 'en' ? 'Growth' : 'Croissance'}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-3">{currentLang === 'en' ? 'Key sectors:' : 'Secteurs clés :'}</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.sectors.map((sector, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-slate-700 text-sm rounded-full border border-slate-200">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">{currentLang === 'en' ? 'Strategic opportunities:' : 'Opportunités stratégiques :'}</h4>
                    <ul className="space-y-2">
                      {data.opportunities.map((opp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <i className="ri-arrow-right-s-line text-amber-600 mt-0.5"></i>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section id="carte-presence" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Our presence in Africa' : 'Notre présence en Afrique'}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {currentLang === 'en' 
                  ? 'Strategic presence in the main markets of West and Central Africa'
                  : 'Une implantation stratégique dans les principaux marchés d\'Afrique de l\'Ouest et Centrale'}
              </p>
            </div>

            <AfricaMapInteractive />
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Our countries of intervention' : 'Nos pays d\'intervention'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Local expertise and deep market knowledge' : 'Expertise locale et connaissance approfondie des marchés'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country, index) => (
                <Link
                  key={index}
                  to={`/regions/${country.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-400 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1" title={country.name}>
                          {country.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {country.clients} {currentLang === 'en' ? 'active clients' : 'clients actifs'}
                        </p>
                      </div>
                    </div>
                    <i className="ri-arrow-right-line text-2xl text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"></i>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {country.sectors.map((sector, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials by Country */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Client testimonials by country' : 'Témoignages clients par pays'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'The trust of our clients across Africa' : 'La confiance de nos clients à travers l\'Afrique'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{testimonial.flag}</span>
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.country}</div>
                      <div className="text-sm text-slate-600">{testimonial.client}</div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="text-amber-600 font-bold text-lg">{testimonial.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies by Country */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Case studies by country' : 'Études de cas par pays'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Concrete results and measurable impacts' : 'Résultats concrets et impacts mesurables'}
              </p>
            </div>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{study.flag}</span>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{study.country}</div>
                          <div className="text-sm text-slate-600">{study.sector}</div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{study.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <i className="ri-time-line"></i>
                        <span>{currentLang === 'en' ? 'Duration:' : 'Durée :'} {study.duration}</span>
                      </div>
                    </div>

                    <div className="lg:w-2/3 space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                          <i className="ri-error-warning-line text-red-600"></i>
                          {currentLang === 'en' ? 'Challenge' : 'Défi'}
                        </h4>
                        <p className="text-slate-700">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                          <i className="ri-lightbulb-line text-amber-600"></i>
                          Solution
                        </h4>
                        <p className="text-slate-700">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <i className="ri-trophy-line text-green-600"></i>
                          {currentLang === 'en' ? 'Results' : 'Résultats'}
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="bg-green-50 rounded-lg p-4 text-center">
                              <div className="font-bold text-green-700">{result}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'en' ? 'View all case studies' : 'Voir toutes les études de cas'}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Our institutional partners' : 'Nos partenaires institutionnels'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' 
                  ? 'Strategic collaborations with key players in African development'
                  : 'Collaborations stratégiques avec les acteurs clés du développement africain'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-building-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{partner.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{partner.type}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {partner.countries.map((country, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-medium rounded-full border border-slate-200">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              {currentLang === 'en' ? 'Let\'s develop your project in Africa together' : 'Développons ensemble votre projet en Afrique'}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {currentLang === 'en'
                ? 'Our local expertise and pan-African network at the service of your success'
                : 'Notre expertise locale et notre réseau panafricain au service de votre réussite'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'en' ? 'Schedule a meeting' : 'Planifier un échange'}
              </Link>
              <Link
                to="/tools/diagnostic-organisationnel"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'en' ? 'Free diagnostic' : 'Diagnostic gratuit'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AfriqueExpertisePage;
