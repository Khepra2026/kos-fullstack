import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const cemacSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/industries/cemac-beac#service`,
      name: 'Conformité CEMAC/BEAC — BCEAO & COBAC Inspection Readiness™ — KHEPRA EXPERTS',
      description:
        "Offre premium BCEAO & COBAC Inspection Readiness™ structurée en architecture 4 niveaux — Diagnostic gratuit → Mission Premium → Accompagnement → Abonnement. Accompagnement expert des institutions financières d'Afrique Centrale dans leur mise en conformité réglementaire BEAC/COBAC.",
      provider: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
      areaServed: { '@type': 'Place', name: 'CEMAC — Afrique Centrale' },
      url: `${SITE_URL}/industries/cemac-beac`,
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/industries/cemac-beac#webpage`,
      url: `${SITE_URL}/industries/cemac-beac`,
      name: 'Conformité CEMAC/BEAC Afrique Centrale | BCEAO & COBAC Inspection Readiness™ | KHEPRA EXPERTS',
      description:
        "Cabinet expert en conformité réglementaire BEAC/COBAC pour l'Afrique Centrale. Offre premium BCEAO & COBAC Inspection Readiness™ — architecture 4 niveaux. Accompagnement des institutions financières, SFD et fintechs dans la zone CEMAC.",
      inLanguage: 'fr-FR',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
          { '@type': 'ListItem', position: 3, name: 'Conformité CEMAC/BEAC — BCEAO & COBAC Inspection Readiness™', item: `${SITE_URL}/industries/cemac-beac` },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quels pays couvre la zone CEMAC ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La CEMAC (Communauté Économique et Monétaire de l\'Afrique Centrale) regroupe 6 pays : Cameroun, Congo, Gabon, République Centrafricaine, Guinée Équatoriale et Tchad. La BEAC (Banque des États de l\'Afrique Centrale) est l\'autorité monétaire de cette zone.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quelle est la différence entre BCEAO et BEAC ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La BCEAO (Banque Centrale des États de l\'Afrique de l\'Ouest) régule la zone UEMOA (8 pays d\'Afrique de l\'Ouest). La BEAC (Banque des États de l\'Afrique Centrale) régule la zone CEMAC (6 pays d\'Afrique Centrale). KHEPRA EXPERTS maîtrise les deux cadres réglementaires.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment KHEPRA EXPERTS accompagne-t-il les institutions en zone CEMAC ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nous offrons un accompagnement complet : diagnostic de conformité BEAC/COBAC, préparation des dossiers d\'agrément, restructuration de la gouvernance, formation des équipes et suivi post-agrément. Notre fondateur dispose d\'une expérience directe au Gabon (zone CEMAC).',
          },
        },
      ],
    },
  ],
};

const CEMACBEACPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'uemoa' | 'cemac'>('cemac');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cemacCountries = [
    { name: 'Cameroun', flag: '🇨🇲', capital: 'Yaoundé', status: 'Marché principal' },
    { name: 'Gabon', flag: '🇬🇦', capital: 'Libreville', status: 'Expérience directe' },
    { name: 'Congo', flag: '🇨🇬', capital: 'Brazzaville', status: 'Zone active' },
    { name: 'Tchad', flag: '🇹🇩', capital: "N'Djamena", status: 'Zone active' },
    { name: 'Rép. Centrafricaine', flag: '🇨🇫', capital: 'Bangui', status: 'Zone active' },
    { name: 'Guinée Équatoriale', flag: '🇬🇶', capital: 'Malabo', status: 'Zone active' },
  ];

  const services = [
    {
      icon: 'ri-search-eye-line',
      color: 'from-gold-500/15 to-gold-600/5',
      border: 'border-gold-400/30',
      iconColor: 'text-gold-600',
      title: 'Diagnostic BEAC/COBAC',
      description: 'Évaluation complète de votre conformité aux exigences réglementaires BEAC et aux normes COBAC pour les institutions de microfinance en zone CEMAC.',
      points: [
        'Audit de gouvernance institutionnelle COBAC',
        'Analyse des ratios prudentiels BEAC',
        'Cartographie des écarts réglementaires',
        'Rapport de recommandations priorisées',
      ],
    },
    {
      icon: 'ri-file-list-3-line',
      color: 'from-strategic-500/15 to-strategic-600/5',
      border: 'border-strategic-400/30',
      iconColor: 'text-strategic-600',
      title: "Dossier d'agrément COBAC",
      description: "Constitution et accompagnement du dossier d'agrément auprès de la COBAC pour les nouvelles institutions ou les extensions d'activité.",
      points: [
        "Montage complet du dossier d'agrément",
        'Coordination avec les autorités COBAC',
        'Suivi des demandes de compléments',
        'Accompagnement post-agrément',
      ],
    },
    {
      icon: 'ri-government-line',
      color: 'from-gold-500/15 to-gold-600/5',
      border: 'border-gold-400/30',
      iconColor: 'text-gold-600',
      title: 'Gouvernance CEMAC',
      description: 'Restructuration des organes de gouvernance selon les standards BEAC/COBAC : conseil d\'administration, comités spécialisés, contrôle interne.',
      points: [
        'Révision des statuts et règlements intérieurs',
        'Formation des administrateurs aux normes COBAC',
        'Mise en place du contrôle interne',
        'Politique de gestion des risques',
      ],
    },
    {
      icon: 'ri-bar-chart-grouped-line',
      color: 'from-strategic-500/15 to-strategic-600/5',
      border: 'border-strategic-400/30',
      iconColor: 'text-strategic-600',
      title: 'Gestion prudentielle BEAC',
      description: 'Accompagnement au respect des normes prudentielles BEAC : solvabilité, liquidité, fonds propres et limites de concentration.',
      points: [
        'Modélisation des ratios prudentiels BEAC',
        'Tableaux de bord de pilotage',
        'Reporting réglementaire COBAC',
        'Stress tests et scénarios de risque',
      ],
    },
    {
      icon: 'ri-smartphone-line',
      color: 'from-brand-500/15 to-brand-600/5',
      border: 'border-brand-400/30',
      iconColor: 'text-brand-600',
      title: 'Fintech & Monnaie Électronique CEMAC',
      description: 'Conformité des activités fintech et de monnaie électronique avec la réglementation BEAC sur les services financiers numériques en zone CEMAC.',
      points: [
        'Conformité mobile money BEAC',
        'Agrément monnaie électronique CEMAC',
        'Partenariats fintechs & institutions',
        'KYC digital et sécurité des données',
      ],
    },
    {
      icon: 'ri-team-line',
      color: 'from-red-500/15 to-red-600/5',
      border: 'border-red-400/30',
      iconColor: 'text-red-600',
      title: 'Renforcement des capacités',
      description: 'Formation des équipes dirigeantes et opérationnelles aux exigences réglementaires BEAC/COBAC et aux meilleures pratiques de microfinance en Afrique Centrale.',
      points: [
        'Formations sur mesure BEAC/COBAC',
        'Coaching des équipes de direction',
        'Transfert de compétences réglementaires',
        'Certification et accréditation',
      ],
    },
  ];

  const differentiators = [
    {
      icon: 'ri-map-pin-2-line',
      title: 'Expérience terrain au Gabon',
      desc: 'Notre fondateur a dirigé Atlantique Microfinance (AMIFA) au Gabon — obtention de l\'agrément COBAC, lancement opérationnel, management de 30+ collaborateurs sous supervision COBAC directe.',
    },
    {
      icon: 'ri-scales-line',
      title: 'Double expertise UEMOA + CEMAC',
      desc: 'Cabinet maîtrisant les cadres BCEAO (UEMOA) et BEAC (CEMAC) — une couverture panafricaine opérationnelle pour les institutions actives dans les deux zones.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Méthodologie COBAC éprouvée',
      desc: 'Approche structurée basée sur les référentiels COBAC, COSO et les meilleures pratiques internationales — adaptée aux réalités opérationnelles des institutions d\'Afrique Centrale.',
    },
    {
      icon: 'ri-time-line',
      title: 'Délais maîtrisés',
      desc: 'Grâce à notre connaissance approfondie des processus COBAC, nous optimisons les délais d\'agrément et de mise en conformité — en moyenne 3 à 6 mois selon la complexité.',
    },
  ];

  const faqs = [
    {
      q: 'Quels pays couvre la zone CEMAC ?',
      a: 'La CEMAC (Communauté Économique et Monétaire de l\'Afrique Centrale) regroupe 6 pays : Cameroun, Congo, Gabon, République Centrafricaine, Guinée Équatoriale et Tchad. La BEAC (Banque des États de l\'Afrique Centrale) est l\'autorité monétaire de cette zone, et la COBAC supervise les institutions de microfinance.',
    },
    {
      q: 'Quelle est la différence entre BCEAO et BEAC ?',
      a: 'La BCEAO régule la zone UEMOA (8 pays d\'Afrique de l\'Ouest : Togo, Bénin, Côte d\'Ivoire, Burkina Faso, Sénégal, Mali, Niger, Guinée-Bissau). La BEAC régule la zone CEMAC (6 pays d\'Afrique Centrale). KHEPRA EXPERTS maîtrise les deux cadres réglementaires — un avantage décisif pour les institutions opérant dans les deux zones.',
    },
    {
      q: 'Quelles sont les exigences de capital minimum pour un SFD en zone CEMAC ?',
      a: 'Les exigences varient selon la catégorie d\'institution et le pays. En zone CEMAC, la COBAC fixe des seuils de fonds propres minimaux selon le type d\'agrément. Nous vous accompagnons dans la détermination de la catégorie adaptée à votre projet et dans la structuration financière correspondante.',
    },
    {
      q: 'KHEPRA EXPERTS intervient-il directement au Cameroun, au Congo et au Gabon ?',
      a: 'Oui. Notre fondateur dispose d\'une expérience directe au Gabon (direction d\'AMIFA, agrément COBAC obtenu). Nous intervenons dans l\'ensemble des 6 pays de la zone CEMAC, avec un réseau de partenaires locaux dans chaque pays pour garantir une présence terrain efficace.',
    },
    {
      q: 'Combien de temps faut-il pour obtenir un agrément COBAC ?',
      a: 'Les délais varient selon la catégorie d\'institution et la complétude du dossier : de 6 à 18 mois en moyenne. Notre accompagnement vise à optimiser ces délais grâce à une préparation rigoureuse du dossier et une coordination proactive avec les autorités COBAC.',
    },
    {
      q: 'Proposez-vous des formations sur la réglementation BEAC/COBAC ?',
      a: 'Oui. Nous proposons des formations sur mesure pour les équipes dirigeantes et opérationnelles : réglementation COBAC, normes prudentielles BEAC, gouvernance institutionnelle, gestion des risques et reporting réglementaire. Ces formations peuvent être dispensées en présentiel ou à distance.',
    },
  ];

  const stats = [
    { value: '22 ans', label: "d'expérience du fondateur", icon: 'ri-award-line' },
    { value: '6 pays', label: 'zone CEMAC couverts', icon: 'ri-map-pin-2-line' },
    { value: '100%', label: 'taux de conformité atteint', icon: 'ri-shield-check-line' },
    { value: '3–6 mois', label: 'délai moyen de mise en conformité', icon: 'ri-time-line' },
  ];

  return (
    <>
      <SeoHead
        title="Conformité CEMAC/BEAC Afrique Centrale | BCEAO & COBAC Inspection Readiness™ | KHEPRA EXPERTS"
        description="Cabinet expert en conformité réglementaire BEAC/COBAC pour l'Afrique Centrale. Notre offre premium BCEAO & COBAC Inspection Readiness™ structure votre conformité via l'architecture 4 niveaux — Diagnostic gratuit → Mission Premium → Accompagnement → Abonnement. Accompagnement des institutions financières, SFD et fintechs dans la zone CEMAC : Cameroun, Congo, Gabon, RCA, Guinée Équatoriale, Tchad."
        keywords="conformité CEMAC, conformité BEAC, BCEAO COBAC Inspection Readiness, architecture 4 niveaux, conseil COBAC, réglementation microfinance Afrique Centrale, agrément institution financière CEMAC, normes prudentielles BEAC, gouvernance bancaire CEMAC, fintech CEMAC, SFD Afrique Centrale"
        canonicalPath="/industries/cemac-beac"
        structuredData={cemacSchema}
        ogLocale="fr_FR"
        ogImage={OG_IMAGES.MICROFINANCE}
        ogImageAlt="Conformité CEMAC/BEAC Afrique Centrale – KHEPRA EXPERTS | Expert COBAC"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
      />
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Central%20Africa%20financial%20district%20modern%20office%20building%20Cameroon%20Gabon%20professional%20business%20meeting%20room%20with%20African%20executives%20reviewing%20regulatory%20documents%2C%20warm%20amber%20and%20terracotta%20tones%2C%20sophisticated%20corporate%20atmosphere%2C%20high%20resolution%20editorial%20photography%20with%20natural%20light&width=1440&height=900&seq=cemac-hero-001&orientation=landscape"
            alt="Conformité CEMAC BEAC Afrique Centrale"
            className="w-full h-full object-cover object-top"
            width={1440}
            height={900}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-900/78 to-brand-900/35"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-36">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <button onClick={() => navigate('/')} className="hover:text-gold-300 transition-colors cursor-pointer whitespace-nowrap">Accueil</button>
              <i className="ri-arrow-right-s-line"></i>
              <button onClick={() => navigate('/industries')} className="hover:text-gold-300 transition-colors cursor-pointer whitespace-nowrap">Industries</button>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold-300 whitespace-nowrap">Conformité CEMAC/BEAC — BCEAO & COBAC Inspection Readiness™</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <i className="ri-bank-line"></i>
              Afrique Centrale — Zone CEMAC
            </div>

            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Conformité <span className="text-gold-400">CEMAC/BEAC</span> — L'expertise qui sécurise vos décisions
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Votre institution financière opère en Afrique Centrale ? Les exigences BEAC/COBAC évoluent. 
              KHEPRA EXPERTS vous accompagne avec une expertise terrain unique — forgée directement au Gabon — 
              pour transformer la conformité réglementaire en avantage compétitif durable.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg"
              >
                <i className="ri-file-list-3-line"></i>
                Demander un diagnostic BEAC gratuit
              </button>
              <button
                onClick={() => navigate('/sfd-conformite')}
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-medium whitespace-nowrap cursor-pointer"
              >
                <i className="ri-arrow-right-line"></i>
                Conformité SFD/BCEAO (UEMOA)
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-950/85 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0">
                  <i className={`${stat.icon} text-gold-400 text-lg`}></i>
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE CEMAC vs UEMOA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3">Couverture géographique</p>
            <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
              Double expertise UEMOA & CEMAC
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KHEPRA EXPERTS couvre les deux cadres réglementaires — 
              un positionnement opérationnel concret pour les institutions panafricaines.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white border border-gray-200 rounded-full p-1">
              <button
                onClick={() => setActiveTab('cemac')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'cemac' ? 'bg-brand-900 text-white' : 'text-gray-600 hover:text-brand-900'
                }`}
              >
                Zone CEMAC (BEAC)
              </button>
              <button
                onClick={() => setActiveTab('uemoa')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'uemoa' ? 'bg-brand-900 text-white' : 'text-gray-600 hover:text-brand-900'
                }`}
              >
                Zone UEMOA (BCEAO)
              </button>
            </div>
          </div>

          {activeTab === 'cemac' && (
            <div className="animate-fadeSlideUp">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {cemacCountries.map((country) => (
                  <div key={country.name} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-gold-300 hover:shadow-md transition-all">
                    <div className="text-4xl mb-3">{country.flag}</div>
                    <p className="font-bold text-brand-900 text-sm">{country.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{country.capital}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      country.status === 'Expérience directe' ? 'bg-gold-100 text-gold-700' : 
                      country.status === 'Marché principal' ? 'bg-strategic-100 text-strategic-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {country.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-brand-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0">
                  <i className="ri-bank-line text-gold-400 text-2xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">BEAC — Banque des États de l'Afrique Centrale</p>
                  <p className="text-white/70 text-sm">Autorité monétaire de la zone CEMAC · COBAC : superviseur des institutions de microfinance · Siège : Yaoundé, Cameroun</p>
                </div>
                <div className="shrink-0">
                  <span className="bg-gold-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">6 pays · 60M habitants</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uemoa' && (
            <div className="animate-fadeSlideUp">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
                {[
                  { name: 'Togo', flag: '🇹🇬', note: 'Siège' },
                  { name: 'Bénin', flag: '🇧🇯', note: '' },
                  { name: 'Côte d\'Ivoire', flag: '🇨🇮', note: '' },
                  { name: 'Burkina Faso', flag: '🇧🇫', note: '' },
                  { name: 'Sénégal', flag: '🇸🇳', note: '' },
                  { name: 'Mali', flag: '🇲🇱', note: '' },
                  { name: 'Niger', flag: '🇳🇪', note: '' },
                  { name: 'Guinée-Bissau', flag: '🇬🇼', note: '' },
                ].map((c) => (
                  <div key={c.name} className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-gold-300 transition-all">
                    <div className="text-3xl mb-2">{c.flag}</div>
                    <p className="font-semibold text-brand-900 text-xs">{c.name}</p>
                    {c.note && <span className="inline-block mt-1 px-2 py-0.5 bg-gold-100 text-gold-700 text-xs font-bold rounded-full">{c.note}</span>}
                  </div>
                ))}
              </div>
              <div className="bg-strategic-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 flex items-center justify-center bg-strategic-500/20 rounded-full shrink-0">
                  <i className="ri-bank-line text-strategic-400 text-2xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">BCEAO — Banque Centrale des États de l'Afrique de l'Ouest</p>
                  <p className="text-white/70 text-sm">Autorité monétaire de la zone UEMOA · Siège : Dakar, Sénégal · Voir notre page dédiée SFD/BCEAO</p>
                </div>
                <button
                  onClick={() => navigate('/sfd-conformite')}
                  className="shrink-0 bg-strategic-500 hover:bg-strategic-600 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer transition-all"
                >
                  Page BCEAO/UEMOA →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3">Nos prestations CEMAC</p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-brand-900 mb-5">
              Accompagnement complet BEAC/COBAC
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
              De l'audit initial à la mise en œuvre opérationnelle, nous couvrons l'ensemble des dimensions 
              de la conformité réglementaire en zone CEMAC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className={`bg-gradient-to-br ${service.color} border ${service.border} rounded-2xl p-7 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm mb-5">
                  <i className={`${service.icon} text-2xl ${service.iconColor}`}></i>
                </div>
                <h3 className="font-playfair text-xl font-bold text-brand-900 mb-3 line-clamp-2" title={service.title}>{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-check-line text-gold-500 mt-0.5 shrink-0"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI KHEPRA */}
      <section className="py-24 bg-brand-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gold-400 uppercase tracking-widest mb-3">Notre différence</p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-5">
              Pourquoi KHEPRA pour la zone CEMAC ?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Une expertise forgée sur le terrain — pas dans les manuels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-gold-400/30 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-gold-500/20 rounded-xl mb-5">
                  <i className={`${d.icon} text-gold-400 text-2xl`}></i>
                </div>
                <h3 className="font-bold text-xl text-white mb-3 line-clamp-2" title={d.title}>{d.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Founder callout */}
          <div className="mt-12 bg-gradient-to-r from-gold-500/10 to-gold-600/5 border border-gold-400/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 flex items-center justify-center bg-gold-500/20 rounded-full shrink-0">
              <i className="ri-user-star-line text-gold-400 text-3xl"></i>
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-2">Expérience directe en zone CEMAC</p>
              <p className="text-white font-bold text-xl mb-2">SIMDA Essoyomèwè — Fondateur KHEPRA EXPERTS</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Directeur Général d'Atlantique Microfinance (AMIFA) au Gabon (2016–2020) — obtention de l'agrément COBAC, 
                lancement opérationnel, management de 30+ collaborateurs sous supervision directe de la COBAC. 
                Une expérience terrain irremplaçable au service de vos projets en zone CEMAC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3">Notre méthode</p>
            <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
              4 étapes vers la conformité BEAC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: 'ri-search-eye-line', title: 'Diagnostic initial', desc: 'Évaluation gratuite de 30 min pour identifier vos enjeux de conformité BEAC/COBAC et définir les priorités d\'action.', duration: '30 min · Gratuit' },
              { step: '02', icon: 'ri-file-list-3-line', title: 'Plan de conformité', desc: 'Élaboration d\'une feuille de route personnalisée avec jalons, responsabilités et indicateurs de suivi COBAC.', duration: '2–4 semaines' },
              { step: '03', icon: 'ri-tools-line', title: 'Mise en œuvre', desc: 'Accompagnement opérationnel : restructuration de la gouvernance, procédures, formation des équipes et dossier d\'agrément.', duration: '3–6 mois' },
              { step: '04', icon: 'ri-bar-chart-line', title: 'Suivi & reporting', desc: 'Monitoring continu de la conformité, reporting réglementaire BEAC et ajustements selon les évolutions réglementaires.', duration: 'Continu' },
            ].map((step) => (
              <div key={step.step} className="bg-white border border-gray-100 rounded-2xl p-7 relative">
                <div className="absolute top-5 right-5 text-5xl font-black text-gray-100 leading-none select-none">{step.step}</div>
                <div className="w-12 h-12 flex items-center justify-center bg-gold-50 rounded-xl mb-5">
                  <i className={`${step.icon} text-gold-600 text-2xl`}></i>
                </div>
                <h3 className="font-bold text-brand-900 text-lg mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.desc}</p>
                <span className="inline-block px-3 py-1 bg-gold-50 text-gold-700 text-xs font-semibold rounded-full">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3">Questions fréquentes</p>
            <h2 className="font-playfair text-4xl font-bold text-brand-900 mb-4">
              Tout savoir sur la conformité CEMAC/BEAC
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-brand-900 pr-4">{faq.q}</span>
                  <i className={`ri-arrow-down-s-line text-xl text-gold-500 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-brand-950 to-brand-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <i className="ri-shield-check-line"></i>
            Diagnostic gratuit · Sans engagement · Réponse sous 24h
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6">
            Votre conformité BEAC commence ici
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Ne laissez pas les exigences réglementaires BEAC/COBAC freiner votre développement. 
            Nos experts analysent votre situation et vous proposent un plan d'action concret — 
            en 30 minutes, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-4 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold whitespace-nowrap cursor-pointer shadow-lg text-lg"
            >
              <i className="ri-calendar-check-line"></i>
              Réserver mon diagnostic BEAC gratuit
            </button>
            <button
              onClick={() => navigate('/sfd-conformite')}
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-right-line"></i>
              Conformité BCEAO/UEMOA
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
            {[
              { icon: 'ri-lock-line', label: 'Confidentiel' },
              { icon: 'ri-time-line', label: 'Réponse sous 24h' },
              { icon: 'ri-user-star-line', label: 'Expert dédié' },
              { icon: 'ri-map-pin-2-line', label: 'Expérience terrain CEMAC' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-white/50 text-sm">
                <i className={`${item.icon} text-gold-400`}></i>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CEMACBEACPage;




