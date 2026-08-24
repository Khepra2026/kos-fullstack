import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';
import { partners } from '@/data/partners';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function PartenairesPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('en') ? 'en' : 'fr';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/partenaires#webpage`,
        'url': `${SITE_URL}/partenaires`,
        'name': currentLang === 'fr' ? 'Nos Partenaires Stratégiques | KHEPRA EXPERTS' : 'Our Strategic Partners | KHEPRA EXPERTS',
        'description': currentLang === 'fr'
          ? 'Découvrez nos partenaires stratégiques : experts en finance digitale, technologies, juridique et ESG. Un réseau d\'excellence pour accompagner vos projets en Afrique.'
          : 'Discover our strategic partners: experts in digital finance, technology, legal and ESG. A network of excellence to support your projects in Africa.',
        'inLanguage': currentLang === 'fr' ? 'fr-FR' : 'en-US',
        'isPartOf': {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          'url': SITE_URL,
          'name': 'KHEPRA EXPERTS'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': currentLang === 'fr' ? 'Accueil' : 'Home',
            'item': SITE_URL
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': currentLang === 'fr' ? 'Partenaires' : 'Partners',
            'item': `${SITE_URL}/partenaires`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SeoHead
        title={currentLang === 'fr' 
          ? "Nos Partenaires Stratégiques | KHEPRA EXPERTS - Réseau d'Excellence en Afrique"
          : "Our Strategic Partners | KHEPRA EXPERTS - Network of Excellence in Africa"}
        description={currentLang === 'fr'
          ? "Découvrez nos partenaires stratégiques : Meba K. Consulting (Finance Digitale & Fintech USA), ATINFOCOM GABON (Technologies), Me AUGE François Roland (Juridique), AWITAZI Rodolphe (ESG). Un réseau d'experts pour vos projets en Afrique."
          : "Discover our strategic partners: Meba K. Consulting (Digital Finance & Fintech USA), ATINFOCOM GABON (Technology), Me AUGE François Roland (Legal), AWITAZI Rodolphe (ESG). A network of experts for your projects in Africa."}
        keywords={currentLang === 'fr'
          ? "partenaires KHEPRA EXPERTS, réseau experts Afrique, partenaires stratégiques conseil, Meba K Consulting, ATINFOCOM GABON, conseil juridique Afrique, expert ESG Afrique"
          : "KHEPRA EXPERTS partners, Africa expert network, strategic advisory partners, Meba K Consulting, ATINFOCOM GABON, legal advisory Africa, ESG expert Africa"}
        canonicalPath="/partenaires"
        ogType="website"
        ogImage={OG_IMAGES.ABOUT}
        ogImageWidth={String(OG_IMAGE_DIMENSIONS.width)}
        ogImageHeight={String(OG_IMAGE_DIMENSIONS.height)}
        schemaJson={schemaData}
      />
      <Navigation />
      
      <main className="pt-32 pb-20" id="main-content">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb
            items={[
              { label: currentLang === 'fr' ? 'Accueil' : 'Home', href: '/' },
              { label: currentLang === 'fr' ? 'Partenaires' : 'Partners', href: '/partenaires' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-200 rounded-full mb-6">
              <i className="ri-team-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Réseau d\'Excellence' : 'Network of Excellence'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 leading-tight">
              {currentLang === 'fr' 
                ? 'Nos Partenaires Stratégiques'
                : 'Our Strategic Partners'}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {currentLang === 'fr'
                ? 'KHEPRA EXPERTS s\'appuie sur un réseau de partenaires d\'excellence pour offrir à nos clients une expertise complète et multidisciplinaire. Ensemble, nous couvrons l\'ensemble des besoins stratégiques, technologiques, juridiques et environnementaux de vos projets en Afrique.'
                : 'KHEPRA EXPERTS relies on a network of excellent partners to offer our clients comprehensive and multidisciplinary expertise. Together, we cover all strategic, technological, legal and environmental needs of your projects in Africa.'}
            </p>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Partner Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{partner.name}</h2>
                    <p className="text-sm text-gold-300 font-medium">
                      {currentLang === 'fr' ? partner.role.fr : partner.role.en}
                    </p>
                  </div>
                </div>

                {/* Partner Content */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {currentLang === 'fr' ? partner.description.fr : partner.description.en}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-brand-900 mb-3 uppercase tracking-wider">
                      {currentLang === 'fr' ? 'Domaines d\'Expertise' : 'Areas of Expertise'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gold-50 text-gold-700 text-xs font-medium rounded-full border border-gold-200"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {partner.linkedin && (
                      <a
                        href={partner.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors duration-300"
                        aria-label={`LinkedIn ${partner.name}`}
                      >
                        <i className="ri-linkedin-fill text-lg" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors duration-300"
                        aria-label={`Site web ${partner.name}`}
                      >
                        <i className="ri-global-line text-lg" />
                        <span>{currentLang === 'fr' ? 'Site web' : 'Website'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {currentLang === 'fr' ? 'Pourquoi un Réseau de Partenaires ?' : 'Why a Partner Network?'}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {currentLang === 'fr'
                  ? 'Notre approche collaborative nous permet d\'offrir une expertise complète et adaptée à chaque projet'
                  : 'Our collaborative approach allows us to offer comprehensive expertise adapted to each project'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-500 text-white mb-6">
                  <i className="ri-team-line text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {currentLang === 'fr' ? 'Expertise Multidisciplinaire' : 'Multidisciplinary Expertise'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Accès à des experts spécialisés dans tous les domaines : stratégie, finance, technologie, juridique, ESG et plus encore.'
                    : 'Access to specialized experts in all areas: strategy, finance, technology, legal, ESG and more.'}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-500 text-white mb-6">
                  <i className="ri-global-line text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {currentLang === 'fr' ? 'Couverture Internationale' : 'International Coverage'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Un réseau qui s\'étend de l\'Afrique aux États-Unis, combinant expertise locale et standards internationaux.'
                    : 'A network extending from Africa to the United States, combining local expertise and international standards.'}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gold-500 text-white mb-6">
                  <i className="ri-shield-check-line text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {currentLang === 'fr' ? 'Qualité Garantie' : 'Guaranteed Quality'}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentLang === 'fr'
                    ? 'Tous nos partenaires sont rigoureusement sélectionnés pour leur expertise, leur éthique et leurs résultats prouvés.'
                    : 'All our partners are rigorously selected for their expertise, ethics and proven results.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 border border-gold-200 rounded-3xl p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gold-300 rounded-full mb-6">
              <i className="ri-user-add-line text-gold-600" />
              <span className="text-sm font-semibold text-gold-700">
                {currentLang === 'fr' ? 'Devenir Partenaire' : 'Become a Partner'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4">
              {currentLang === 'fr' 
                ? 'Vous Souhaitez Rejoindre Notre Réseau ?'
                : 'Want to Join Our Network?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentLang === 'fr'
                ? 'Nous sommes toujours à la recherche de partenaires d\'excellence pour enrichir notre réseau et offrir des solutions toujours plus complètes à nos clients.'
                : 'We are always looking for excellent partners to enrich our network and offer increasingly comprehensive solutions to our clients.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  const expertButton = document.getElementById('vapi-widget-floating-button') as HTMLButtonElement;
                  if (expertButton) expertButton.click();
                }}
                className="px-8 py-4 bg-gradient-to-r from-gold-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <i className="ri-phone-line text-xl" />
                {currentLang === 'fr' ? 'Discutons ensemble' : 'Let\'s talk'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-brand-900 border-2 border-brand-900 rounded-full font-semibold hover:bg-brand-900 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {currentLang === 'fr' ? 'Nous contacter' : 'Contact us'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}



