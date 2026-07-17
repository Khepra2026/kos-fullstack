import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const Publications = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const publications = [
    {
      title: currentLang === 'fr'
        ? 'Guide Pratique de la Transformation Digitale'
        : 'Practical Guide to Digital Transformation',
      description: currentLang === 'fr'
        ? 'Un guide complet pour accompagner les institutions financières africaines dans leur transformation digitale, avec des méthodologies éprouvées et des études de cas concrètes.'
        : 'A comprehensive guide to support African financial institutions in their digital transformation, with proven methodologies and concrete case studies.',
      type: currentLang === 'fr' ? 'Guide Pratique' : 'Practical Guide',
      category: currentLang === 'fr' ? 'Transformation Digitale' : 'Digital Transformation',
      pages: 120,
      date: 'Juin 2026',
      icon: 'ri-smartphone-line',
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: currentLang === 'fr'
        ? 'Livre Blanc : Inclusion Financière en Afrique'
        : 'White Paper: Financial Inclusion in Africa',
      description: currentLang === 'fr'
        ? 'Analyse approfondie des enjeux et opportunités de l\'inclusion financière en Afrique de l\'Ouest, avec des recommandations stratégiques pour les décideurs.'
        : 'In-depth analysis of the challenges and opportunities of financial inclusion in West Africa, with strategic recommendations for decision-makers.',
      type: currentLang === 'fr' ? 'Livre Blanc' : 'White Paper',
      category: currentLang === 'fr' ? 'Inclusion Financière' : 'Financial Inclusion',
      pages: 85,
      date: 'Juin 2026',
      icon: 'ri-bank-line',
      color: 'from-emerald-600 to-emerald-800',
    },
    {
      title: currentLang === 'fr'
        ? 'Rapport : État des Fintech en Zone UEMOA'
        : 'Report: State of Fintech in the UEMOA Zone',
      description: currentLang === 'fr'
        ? 'Rapport détaillé sur l\'écosystème fintech dans la zone UEMOA, incluant les tendances, les défis réglementaires et les opportunités de croissance.'
        : 'Detailed report on the fintech ecosystem in the UEMOA zone, including trends, regulatory challenges and growth opportunities.',
      type: currentLang === 'fr' ? 'Rapport Sectoriel' : 'Sector Report',
      category: 'Fintech & UEMOA',
      pages: 70,
      date: 'Juillet 2026',
      icon: 'ri-line-chart-line',
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: currentLang === 'fr'
        ? 'Guide du Développement des PME Africaines'
        : 'Guide to African SME Development',
      description: currentLang === 'fr'
        ? 'Guide stratégique pour accompagner la croissance et le développement des PME en Afrique, avec des outils pratiques et des méthodologies adaptées au contexte africain.'
        : 'Strategic guide to support the growth and development of SMEs in Africa, with practical tools and methodologies adapted to the African context.',
      type: currentLang === 'fr' ? 'Guide Stratégique' : 'Strategic Guide',
      category: currentLang === 'fr' ? 'Développement PME' : 'SME Development',
      pages: 95,
      date: 'Juillet 2026',
      icon: 'ri-building-2-line',
      color: 'from-amber-600 to-amber-800',
    },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/publications#webpage`,
        "url": `${SITE_URL}/publications`,
        "name": "Publications et Ressources Stratégiques | Khepra Experts",
        "description": "Accédez à nos publications stratégiques, livres blancs et guides pratiques sur la transformation digitale, l'inclusion financière et le développement des PME en Afrique.",
        "inLanguage": "fr-FR",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Khepra Experts"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Publications",
            "item": `${SITE_URL}/publications`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={currentLang === 'fr'
          ? "Publications | Guides BCEAO, Conformite & Investment Readiness Afrique"
          : "Publications | BCEAO Guides, Compliance & Investment Readiness Africa"}
        description={currentLang === 'fr'
          ? "Téléchargez nos publications d'experts : livres blancs BCEAO, guides inclusion financière, études transformation digitale et rapports gouvernance d'entreprise en Afrique."
          : "Download our expert publications: BCEAO white papers, financial inclusion studies, digital transformation guides and governance reports for Africa."}
        keywords={currentLang === 'fr'
          ? "publications Afrique, livres blancs conformité BCEAO, études inclusion financière, guides transformation digitale, rapports gouvernance entreprise, recherche finance Afrique"
          : "Africa publications, BCEAO compliance white papers, financial inclusion studies, digital transformation guides, corporate governance reports, Africa finance research"}
        canonicalPath="/publications"
        ogType="website"
        ogImage={OG_IMAGES.RESOURCES}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
              <i className="ri-book-open-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Publications d\'Experts' : 'Expert Publications'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              {currentLang === 'fr'
                ? 'Publications & Recherches'
                : 'Publications & Research'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              {currentLang === 'fr'
                ? 'Livres blancs, études sectorielles et guides pratiques rédigés par nos experts pour vous accompagner dans vos décisions stratégiques.'
                : 'White papers, sector studies and practical guides written by our experts to support you in your strategic decisions.'}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/calendrier-editorial"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-calendar-schedule-line" />
                {currentLang === 'fr' ? 'Calendrier Éditorial' : 'Editorial Calendar'}
                <i className="ri-arrow-right-line" />
              </a>
              <a
                href="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold-200 text-gold-700 text-sm font-semibold hover:bg-gold-50 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-line" />
                {currentLang === 'fr' ? 'Télécharger nos ressources' : 'Download our resources'}
              </a>
            </div>
          </div>
        </section>

        {/* Publications Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header with Gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${pub.color} p-8 flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative">
                    <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-4 mx-auto group-hover:scale-110 transition-transform duration-500">
                      <i className={`${pub.icon} text-4xl text-white`} />
                    </div>
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-semibold text-white">
                        {pub.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-file-text-line" />
                      {pub.pages} {currentLang === 'fr' ? 'pages' : 'pages'}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line" />
                      {pub.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                    {pub.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pub.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                      {pub.category}
                    </span>
                    <button
                      onClick={() => navigate('/resources')}
                      className="flex items-center gap-2 text-gold-600 font-semibold hover:gap-4 transition-all duration-300 cursor-pointer"
                    >
                      <span>{currentLang === 'fr' ? 'Télécharger' : 'Download'}</span>
                      <i className="ri-download-line" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <i className="ri-mail-line text-gold-400" />
              <span className="text-sm font-semibold text-white">
                {currentLang === 'fr' ? 'Restez Informé' : 'Stay Informed'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {currentLang === 'fr'
                ? 'Recevez Nos Nouvelles Publications'
                : 'Receive Our New Publications'}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? 'Inscrivez-vous à notre newsletter pour recevoir nos dernières publications, analyses et insights sur la finance africaine.'
                : 'Subscribe to our newsletter to receive our latest publications, analyses and insights on African finance.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder={currentLang === 'fr' ? 'Votre adresse e-mail' : 'Your email address'}
                className="w-full px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-400 transition-colors duration-300"
              />
              <button
                onClick={() => navigate('/resources')}
                className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-white rounded-full font-semibold hover:bg-gold-600 hover:shadow-2xl transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'fr' ? 'S\'abonner' : 'Subscribe'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Publications;
