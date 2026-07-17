import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import SeoHead from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { VisibleBreadcrumb } from '@/components/feature/VisibleBreadcrumb';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const UEMOACEMACPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // -------------------------------------------------------------------------
  // Data definitions
  // -------------------------------------------------------------------------
  const uemoaCountries = [
    { name: 'Bénin', flag: '🇧🇯', capital: 'Porto-Novo', gdp: '17Mds USD', population: '13M' },
    { name: 'Burkina Faso', flag: '🇧🇫', capital: 'Ouagadougou', gdp: '19Mds USD', population: '22M' },
    { name: "Côte d'Ivoire", flag: '🇨🇮', capital: 'Abidjan', gdp: '70Mds USD', population: '28M' },
    { name: 'Guinée-Bissau', flag: '🇬🇼', capital: 'Bissau', gdp: '1.5Mds USD', population: '2M' },
    { name: 'Mali', flag: '🇲🇱', capital: 'Bamako', gdp: '19Mds USD', population: '21M' },
    { name: 'Niger', flag: '🇳🇪', capital: 'Niamey', gdp: '14Mds USD', population: '25M' },
    { name: 'Sénégal', flag: '🇸🇳', capital: 'Dakar', gdp: '27Mds USD', population: '17M' },
    { name: 'Togo', flag: '🇹🇬', capital: 'Lomé', gdp: '8Mds USD', population: '8.5M' },
  ];

  const cemacCountries = [
    { name: 'Cameroun', flag: '🇨🇲', capital: 'Yaoundé', gdp: '45Mds USD', population: '28M' },
    { name: 'Centrafrique', flag: '🇨🇫', capital: 'Bangui', gdp: '2.5Mds USD', population: '5M' },
    { name: 'Congo', flag: '🇨🇬', capital: 'Brazzaville', gdp: '12Mds USD', population: '6M' },
    { name: 'Gabon', flag: '🇬🇦', capital: 'Libreville', gdp: '20Mds USD', population: '2.3M' },
    { name: 'Guinée Équatoriale', flag: '🇬🇶', capital: 'Malabo', gdp: '11Mds USD', population: '1.5M' },
    { name: 'Tchad', flag: '🇹🇩', capital: "N'Djamena", gdp: '11Mds USD', population: '17M' },
  ];

  const regulations = [
    {
      zone: 'UEMOA',
      regulator: 'BCEAO',
      icon: 'ri-bank-line',
      areas: [
        {
          title: currentLang === 'en' ? 'Microfinance Institutions' : 'Institutions de Microfinance',
          items: [
            'Instruction N°008-05-2010 relative aux SFD',
            "Loi Parmec sur les coopératives d'épargne et de crédit",
            'Normes prudentielles BCEAO',
            'Ratios de solvabilité et liquidité',
          ],
        },
        {
          title: currentLang === 'en' ? 'Credit Institutions' : 'Établissements de Crédit',
          items: [
            'Loi bancaire UEMOA',
            'Normes IFRS applicables',
            'Dispositif de gouvernance',
            'Gestion des risques (Bâle II/III)',
          ],
        },
        {
          title: currentLang === 'en' ? 'Fintech & Payments' : 'Fintech & Paiements',
          items: [
            'Instruction relative à la monnaie électronique',
            'Agrément émetteur de monnaie électronique',
            'Sécurité des systèmes de paiement',
            'Protection des données clients',
          ],
        },
      ],
    },
    {
      zone: 'CEMAC',
      regulator: 'COBAC',
      icon: 'ri-government-line',
      areas: [
        {
          title: currentLang === 'en' ? 'Credit Institutions' : 'Établissements de Crédit',
          items: [
            'Règlement COBAC EMF 2002/17',
            'Normes prudentielles CEMAC',
            'Gouvernance et contrôle interne',
            'Ratios réglementaires',
          ],
        },
        {
          title: 'Microfinance',
          items: [
            'Règlement relatif aux EMF',
            "Conditions d'agrément",
            'Supervision et contrôle',
            'Reporting réglementaire',
          ],
        },
        {
          title: currentLang === 'en' ? 'Digital Financial Services' : 'Services Financiers Digitaux',
          items: [
            'Cadre réglementaire paiements mobiles',
            'Interopérabilité des plateformes',
            'Cybersécurité financière',
            'Lutte anti-blanchiment (LAB/FT)',
          ],
        },
      ],
    },
  ];

  const keyRegulations = [
    {
      title: currentLang === 'en' ? 'BCEAO Key Regulations' : 'Réglementations clés BCEAO',
      items: [
        {
          name: 'Instruction N°008-05-2010',
          description: currentLang === 'en' 
            ? 'Regulatory framework for decentralized financial systems (SFD) in UEMOA'
            : 'Cadre réglementaire des systèmes financiers décentralisés (SFD) en UEMOA',
          scope: currentLang === 'en' ? 'Microfinance institutions' : 'Institutions de microfinance'
        },
        {
          name: 'Loi Parmec',
          description: currentLang === 'en'
            ? 'Law on savings and credit cooperatives and mutual organizations'
            : 'Loi sur les coopératives d\'épargne et de crédit et les mutuelles',
          scope: currentLang === 'en' ? 'Cooperatives and mutuals' : 'Coopératives et mutuelles'
        },
        {
          name: currentLang === 'en' ? 'Electronic Money Instruction' : 'Instruction Monnaie Électronique',
          description: currentLang === 'en'
            ? 'Regulatory framework for electronic money issuers and mobile money'
            : 'Cadre réglementaire des émetteurs de monnaie électronique et mobile money',
          scope: 'Fintech, Mobile Money'
        },
        {
          name: currentLang === 'en' ? 'UEMOA Banking Law' : 'Loi Bancaire UEMOA',
          description: currentLang === 'en'
            ? 'Harmonized banking law for credit institutions'
            : 'Loi bancaire harmonisée pour les établissements de crédit',
          scope: currentLang === 'en' ? 'Banks and financial institutions' : 'Banques et établissements financiers'
        }
      ]
    },
    {
      title: currentLang === 'en' ? 'COBAC Key Regulations' : 'Réglementations clés COBAC',
      items: [
        {
          name: 'Règlement COBAC EMF 2002/17',
          description: currentLang === 'en'
            ? 'Regulatory framework for microfinance establishments in CEMAC'
            : 'Cadre réglementaire des établissements de microfinance en CEMAC',
          scope: currentLang === 'en' ? 'Microfinance institutions' : 'Institutions de microfinance'
        },
        {
          name: currentLang === 'en' ? 'COBAC Prudential Standards' : 'Normes Prudentielles COBAC',
          description: currentLang === 'en'
            ? 'Prudential ratios and risk management requirements'
            : 'Ratios prudentiels et exigences de gestion des risques',
          scope: currentLang === 'en' ? 'All financial institutions' : 'Tous établissements financiers'
        },
        {
          name: currentLang === 'en' ? 'Mobile Payments Framework' : 'Cadre Paiements Mobiles',
          description: currentLang === 'en'
            ? 'Regulatory framework for mobile payment services'
            : 'Cadre réglementaire des services de paiement mobile',
          scope: 'Fintech, Telecom'
        },
        {
          name: currentLang === 'en' ? 'AML/CFT Regulations' : 'Réglementation LAB/FT',
          description: currentLang === 'en'
            ? 'Anti-money laundering and counter-terrorism financing'
            : 'Lutte anti-blanchiment et financement du terrorisme',
          scope: currentLang === 'en' ? 'All financial actors' : 'Tous acteurs financiers'
        }
      ]
    }
  ];

  const services = [
    {
      title: currentLang === 'en' ? 'Regulatory Compliance' : 'Conformité Réglementaire',
      icon: 'ri-shield-check-line',
      description: currentLang === 'en' 
        ? 'Compliance with BCEAO/COBAC requirements'
        : 'Mise en conformité avec les exigences BCEAO/COBAC',
      deliverables: [
        currentLang === 'en' ? 'Regulatory compliance audit' : 'Audit de conformité réglementaire',
        currentLang === 'en' ? 'Gap analysis vs current standards' : 'Gap analysis vs normes en vigueur',
        currentLang === 'en' ? 'Compliance action plan' : 'Plan de mise en conformité',
        currentLang === 'en' ? 'Licensing application support' : "Accompagnement dossier d'agrément",
        currentLang === 'en' ? 'Compliance team training' : 'Formation équipes conformité',
      ],
    },
    {
      title: currentLang === 'en' ? 'Governance & Internal Control' : 'Gouvernance & Contrôle Interne',
      icon: 'ri-organization-chart',
      description: currentLang === 'en'
        ? 'Governance structuring according to UEMOA/CEMAC standards'
        : 'Structuration de la gouvernance selon standards UEMOA/CEMAC',
      deliverables: [
        currentLang === 'en' ? 'Governance manual' : 'Manuel de gouvernance',
        currentLang === 'en' ? 'Internal control framework' : 'Dispositif de contrôle interne',
        currentLang === 'en' ? 'Risk mapping' : 'Cartographie des risques',
        currentLang === 'en' ? 'Operating procedures' : 'Procédures opérationnelles',
        currentLang === 'en' ? 'Governance committees' : 'Comités de gouvernance',
      ],
    },
    {
      title: currentLang === 'en' ? 'Regulatory Reporting' : 'Reporting Réglementaire',
      icon: 'ri-file-chart-line',
      description: currentLang === 'en'
        ? 'Automation and reliability of prudential reporting'
        : 'Automatisation et fiabilisation du reporting prudentiel',
      deliverables: [
        currentLang === 'en' ? 'Regulatory financial statements' : 'États financiers réglementaires',
        currentLang === 'en' ? 'Prudential ratios calculation' : 'Calcul ratios prudentiels',
        currentLang === 'en' ? 'Periodic declarations' : 'Déclarations périodiques',
        currentLang === 'en' ? 'Automated reporting tools' : 'Outils de reporting automatisés',
        currentLang === 'en' ? 'Regulatory data validation' : 'Validation données réglementaires',
      ],
    },
    {
      title: currentLang === 'en' ? 'Risk Management' : 'Gestion des Risques',
      icon: 'ri-alert-line',
      description: currentLang === 'en'
        ? 'Risk management framework compliant with Basel II/III'
        : 'Dispositif de gestion des risques conforme Bâle II/III',
      deliverables: [
        currentLang === 'en' ? 'Risk management policy' : 'Politique de gestion des risques',
        currentLang === 'en' ? 'Credit scoring models' : 'Modèles de scoring crédit',
        currentLang === 'en' ? 'Stress tests and scenarios' : 'Stress tests et scénarios',
        currentLang === 'en' ? 'Operational risk committee' : 'Comité risques opérationnel',
        currentLang === 'en' ? 'Risk indicators (KRI)' : 'Indicateurs de risque (KRI)',
      ],
    },
  ];

  const caseStudy = {
    client: currentLang === 'en' ? 'UEMOA Microfinance Network' : 'Réseau de Microfinance UEMOA',
    country: currentLang === 'en' ? '3 countries (Togo, Benin, Burkina Faso)' : '3 pays (Togo, Bénin, Burkina Faso)',
    challenge: currentLang === 'en'
      ? "Compliance with BCEAO Instruction N°008-05-2010 and governance restructuring of a network of 85 branches"
      : "Mise en conformité avec l'Instruction BCEAO N°008-05-2010 et restructuration de la gouvernance d'un réseau de 85 caisses",
    solution: [
      currentLang === 'en' ? 'Regulatory compliance audit on 85 service points' : 'Audit de conformité réglementaire sur 85 points de service',
      currentLang === 'en' ? 'Legal and governance restructuring of the network' : 'Restructuration juridique et gouvernance du réseau',
      currentLang === 'en' ? 'Implementation of centralized internal control system' : 'Mise en place dispositif de contrôle interne centralisé',
      currentLang === 'en' ? 'Training of 45 compliance officers and internal auditors' : 'Formation de 45 responsables conformité et auditeurs internes',
      currentLang === 'en' ? 'Automation of BCEAO regulatory reporting' : 'Automatisation du reporting réglementaire BCEAO',
    ],
    results: [
      { metric: '100%', label: currentLang === 'en' ? 'Regulatory compliance achieved' : 'Conformité réglementaire atteinte' },
      { metric: '18 mois', label: currentLang === 'en' ? 'Compliance timeline' : 'Délai de mise en conformité' },
      { metric: '85', label: currentLang === 'en' ? 'Restructured branches' : 'Caisses restructurées' },
      { metric: '-73%', label: currentLang === 'en' ? 'Reporting time reduction' : 'Réduction temps reporting' },
    ],
    duration: currentLang === 'en' ? '18 months' : '18 mois',
    team: currentLang === 'en' ? '8 consultants' : '8 consultants',
  };

  const expertise = [
    {
      title: currentLang === 'en' ? 'Deep Knowledge of Regulatory Frameworks' : 'Connaissance Approfondie des Cadres Réglementaires',
      points: [
        currentLang === 'en' ? '10+ years UEMOA/CEMAC experience' : "10+ années d'expérience UEMOA/CEMAC",
        currentLang === 'en' ? 'Permanent regulatory watch' : 'Veille réglementaire permanente',
        currentLang === 'en' ? 'Relations with BCEAO/COBAC' : 'Relations avec BCEAO/COBAC',
        currentLang === 'en' ? 'Participation in sector working groups' : 'Participation groupes de travail sectoriels',
      ],
    },
    {
      title: currentLang === 'en' ? 'Certified Multidisciplinary Team' : 'Équipe Multidisciplinaire Certifiée',
      points: [
        currentLang === 'en' ? 'CPA, ACCA, CGAP certified experts' : 'Experts certifiés CPA, ACCA, CGAP',
        currentLang === 'en' ? 'Former BCEAO/COBAC executives' : 'Anciens cadres BCEAO/COBAC',
        currentLang === 'en' ? 'Banking compliance specialists' : 'Spécialistes conformité bancaire',
        currentLang === 'en' ? 'Digital transformation consultants' : 'Consultants transformation digitale',
      ],
    },
    {
      title: currentLang === 'en' ? 'Pragmatic and Operational Approach' : 'Approche Pragmatique et Opérationnelle',
      points: [
        currentLang === 'en' ? 'Solutions adapted to local context' : 'Solutions adaptées au contexte local',
        currentLang === 'en' ? 'Field support' : 'Accompagnement terrain',
        currentLang === 'en' ? 'Skills transfer' : 'Transfert de compétences',
        currentLang === 'en' ? 'Post-mission support' : 'Support post-mission',
      ],
    },
  ];

  // Schema.org enrichi pour SEO international
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/regions/uemoa-cemac#service`,
        "name": currentLang === 'en' ? "UEMOA & CEMAC Regulatory Compliance Consulting" : "Conseil en Conformité Réglementaire UEMOA & CEMAC",
        "description": currentLang === 'en'
          ? "Specialized consulting firm in UEMOA and CEMAC regulatory compliance. BCEAO, COBAC expertise, compliance for financial institutions, microfinance, fintech. Licensing and governance support."
          : "Cabinet spécialisé en conformité réglementaire UEMOA et CEMAC. Expertise BCEAO, COBAC, mise en conformité institutions financières, microfinance, fintech. Accompagnement agrément et gouvernance.",
        "url": `${SITE_URL}/regions/uemoa-cemac`,
        "areaServed": [
          { "@type": "Place", "name": "UEMOA" },
          { "@type": "Place", "name": "CEMAC" },
          { "@type": "Country", "name": "Benin" },
          { "@type": "Country", "name": "Burkina Faso" },
          { "@type": "Country", "name": "Côte d'Ivoire" },
          { "@type": "Country", "name": "Senegal" },
          { "@type": "Country", "name": "Togo" },
          { "@type": "Country", "name": "Cameroon" },
          { "@type": "Country", "name": "Gabon" },
          { "@type": "Country", "name": "Congo" }
        ],
        "serviceType": [
          "BCEAO compliance consulting",
          "COBAC regulatory advisory",
          "Microfinance licensing",
          "Banking governance",
          "Prudential reporting",
          "Risk management Basel II/III",
          "Fintech regulatory compliance"
        ],
        "knowsAbout": [
          "BCEAO Instruction N°008-05-2010",
          "COBAC EMF 2002/17",
          "UEMOA banking law",
          "CEMAC prudential standards",
          "Electronic money regulations",
          "Mobile money compliance",
          "AML/CFT regulations",
          "IFRS financial reporting"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/regions/uemoa-cemac#breadcrumb`,
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
            "name": "UEMOA & CEMAC",
            "item": `${SITE_URL}/regions/uemoa-cemac`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('regions.uemoaCemac.seo.title')}
        description={t('regions.uemoaCemac.seo.description')}
        keywords={t('regions.uemoaCemac.seo.keywords')}
        canonicalPath="/regions/uemoa-cemac"
        structuredData={schemaData}
        geoRegion="TG"
        geoPlacename="Lomé, Togo"
        geoPosition="6.1256;1.2223"
        ogImage={OG_IMAGES.UEMOA_CEMAC}
        ogImageAlt={currentLang === 'en'
          ? "UEMOA & CEMAC Regulatory Compliance – KHEPRA EXPERTS | BCEAO COBAC Expertise"
          : "Conformité Réglementaire UEMOA & CEMAC – KHEPRA EXPERTS | Expertise BCEAO COBAC"}
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        ogLocale={currentLang === 'en' ? 'en_US' : 'fr_FR'}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
          <div
            className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20modern%20illustration%20representing%20west%20african%20economic%20union%20UEMOA%20CEMAC%20with%20interconnected%20financial%20symbols%20regulatory%20compliance%20theme%20professional%20consulting%20aesthetic%20dark%20navy%20background%20gold%20accents%20minimalist%20clean%20design&width=1920&height=800&seq=uemoa-cemac-hero&orientation=landscape')] opacity-5 bg-cover bg-center"
          ></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <VisibleBreadcrumb
              variant="light"
              items={[
                { label: currentLang === 'en' ? 'Home' : 'Accueil', href: '/', url: `${SITE_URL}/` },
                { label: currentLang === 'en' ? 'Regions' : 'Régions', href: '/regions', url: `${SITE_URL}/regions` },
                { label: 'UEMOA & CEMAC', url: `${SITE_URL}/regions/uemoa-cemac` }
              ]}
              className="mb-6"
              withSchema={false}
            />
            <Breadcrumb />

            <div className="mt-12 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <i className="ri-shield-check-line text-3xl text-white"></i>
                </div>
                <div>
                  <p className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
                    {currentLang === 'en' ? 'Regulatory Expertise' : 'Expertise Réglementaire'}
                  </p>
                  <p className="text-slate-300 text-sm">
                    UEMOA · CEMAC · BCEAO · COBAC
                  </p>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentLang === 'en' ? (
                  <>Regulatory compliance<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">UEMOA & CEMAC</span></>
                ) : (
                  <>Conformité réglementaire<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">UEMOA & CEMAC</span></>
                )}
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {currentLang === 'en'
                  ? 'Deep expertise in BCEAO and COBAC regulatory frameworks to support your compliance and development in UEMOA and CEMAC zones. Financial inclusion consulting, fintech advisory, microfinance compliance.'
                  : 'Expertise approfondie des cadres réglementaires BCEAO et COBAC pour accompagner votre conformité et votre développement dans les zones UEMOA et CEMAC. Conseil en inclusion financière, fintech, conformité microfinance.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  {currentLang === 'en' ? 'Compliance audit' : 'Audit de conformité'}
                </Link>
                <a
                  href="#reglementation"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 whitespace-nowrap cursor-pointer"
                >
                  {currentLang === 'en' ? 'Regulatory frameworks' : 'Cadres réglementaires'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* UEMOA vs CEMAC Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* UEMOA */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                    <i className="ri-bank-line text-3xl text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 line-clamp-1">UEMOA</h2>
                    <p className="text-slate-700">
                      {currentLang === 'en' ? 'West African Economic and Monetary Union' : 'Union Économique et Monétaire Ouest-Africaine'}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 mb-3">
                    {currentLang === 'en' ? 'Regulator: BCEAO' : 'Régulateur : BCEAO'}
                  </h3>
                  <p className="text-slate-700 mb-4">
                    {currentLang === 'en' ? 'Central Bank of West African States' : 'Banque Centrale des États de l\'Afrique de l\'Ouest'}
                  </p>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {currentLang === 'en' ? '8 member countries:' : '8 pays membres :'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {uemoaCountries.map((country, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <div className="text-sm font-medium text-slate-700">{country.name}</div>
                            <div className="text-xs text-slate-500">{country.population} · {country.gdp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'Common currency: CFA Franc (XOF)' : 'Monnaie commune : Franc CFA (XOF)'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'Population: 130+ million inhabitants' : 'Population : 130+ millions d\'habitants'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'GDP: $150+ billion USD' : 'PIB : 150+ milliards USD'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEMAC */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                    <i className="ri-government-line text-3xl text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">CEMAC</h2>
                    <p className="text-slate-700">
                      {currentLang === 'en' ? 'Economic and Monetary Community of Central Africa' : 'Communauté Économique et Monétaire de l\'Afrique Centrale'}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 mb-3">
                    {currentLang === 'en' ? 'Regulator: COBAC' : 'Régulateur : COBAC'}
                  </h3>
                  <p className="text-slate-700 mb-4">
                    {currentLang === 'en' ? 'Banking Commission of Central Africa' : 'Commission Bancaire de l\'Afrique Centrale'}
                  </p>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {currentLang === 'en' ? '6 member countries:' : '6 pays membres :'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {cemacCountries.map((country, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <div className="text-sm font-medium text-slate-700">{country.name}</div>
                            <div className="text-xs text-slate-500">{country.population} · {country.gdp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'Common currency: CFA Franc (XAF)' : 'Monnaie commune : Franc CFA (XAF)'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'Population: 55+ million inhabitants' : 'Population : 55+ millions d\'habitants'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-sm text-slate-700">
                        {currentLang === 'en' ? 'GDP: $120+ billion USD' : 'PIB : 120+ milliards USD'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Regulations Detail - NEW */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Key Regulations in Detail' : 'Réglementations clés en détail'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Deep understanding of BCEAO and COBAC regulatory frameworks' : 'Compréhension approfondie des cadres réglementaires BCEAO et COBAC'}
              </p>
            </div>

            <div className="space-y-12">
              {keyRegulations.map((regGroup, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">{regGroup.title}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {regGroup.items.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-6 border-l-4 border-amber-500">
                        <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2" title={item.name}>{item.name}</h4>
                        <p className="text-sm text-slate-700 mb-3">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                            {item.scope}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Frameworks */}
        <section id="reglementation" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Regulatory frameworks' : 'Cadres réglementaires'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Deep expertise in BCEAO and COBAC standards' : 'Expertise approfondie des normes BCEAO et COBAC'}
              </p>
            </div>

            <div className="space-y-12">
              {regulations.map((reg, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                      <i className={`${reg.icon} text-3xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900">
                        {reg.zone}
                      </h3>
                      <p className="text-slate-600">
                        {currentLang === 'en' ? 'Regulator:' : 'Régulateur :'} {reg.regulator}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {reg.areas.map((area, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-6"
                      >
                        <h4 className="text-lg font-bold text-slate-900 mb-4">
                          {area.title}
                        </h4>
                        <ul className="space-y-3">
                          {area.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <i className="ri-checkbox-circle-line text-amber-600 mt-1 flex-shrink-0"></i>
                              <span className="text-sm text-slate-700">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Our compliance services' : 'Nos services de conformité'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Complete support for your compliance' : 'Accompagnement complet pour votre mise en conformité'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${service.icon} text-2xl text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {currentLang === 'en' ? 'Deliverables:' : 'Livrables :'}
                    </h4>
                    {service.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <i className="ri-arrow-right-s-line text-amber-600 mt-1"></i>
                        <span className="text-sm text-slate-700">
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Case study: UEMOA Compliance' : 'Étude de cas : Conformité UEMOA'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Multi-country microfinance network compliance' : 'Mise en conformité d\'un réseau de microfinance multi-pays'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 shadow-xl">
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-2">{currentLang === 'en' ? 'Client' : 'Client'}</div>
                  <div className="font-bold text-slate-900">
                    {caseStudy.client}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-2">{currentLang === 'en' ? 'Duration' : 'Durée'}</div>
                  <div className="font-bold text-slate-900">
                    {caseStudy.duration}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-2">{currentLang === 'en' ? 'Team' : 'Équipe'}</div>
                  <div className="font-bold text-slate-900">
                    {caseStudy.team}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="ri-error-warning-line text-red-600"></i>
                    {currentLang === 'en' ? 'Challenge' : 'Défi'}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="ri-lightbulb-line text-amber-600"></i>
                    {currentLang === 'en' ? 'Implemented solution' : 'Solution mise en œuvre'}
                  </h3>
                  <ul className="space-y-3">
                    {caseStudy.solution.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-amber-600">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <i className="ri-trophy-line text-green-600"></i>
                    {currentLang === 'en' ? 'Results achieved' : 'Résultats obtenus'}
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {caseStudy.results.map((result, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center"
                      >
                        <div className="text-3xl font-bold text-green-700 mb-2">
                          {result.metric}
                        </div>
                        <div className="text-sm text-slate-700">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {currentLang === 'en' ? 'Why choose Khepra Experts?' : 'Pourquoi choisir Khepra Experts ?'}
              </h2>
              <p className="text-xl text-slate-600">
                {currentLang === 'en' ? 'Recognized expertise in UEMOA/CEMAC compliance' : 'Une expertise reconnue en conformité UEMOA/CEMAC'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="ri-check-line text-green-600 mt-1 flex-shrink-0"></i>
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              {currentLang === 'en' ? 'Need a compliance audit?' : 'Besoin d\'un audit de conformité ?'}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {currentLang === 'en'
                ? 'Our experts support you in your UEMOA/CEMAC compliance'
                : 'Nos experts vous accompagnent dans votre mise en conformité UEMOA/CEMAC'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'en' ? 'Request an audit' : 'Demander un audit'}
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'en' ? 'Our services' : 'Nos services'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default UEMOACEMACPage;
