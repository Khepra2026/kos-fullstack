import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { whitepapers } from '@/mocks/whitepapers';
import { whitepapersEn } from '@/mocks/whitepapersEn';
import ResourceDownloadModal from '@/pages/resources/components/ResourceDownloadModal';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function WhitepapersPage() {
  const { t, i18n } = useTranslation();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<any>(null);

  const activeWhitepapers = i18n.language.startsWith('en') ? whitepapersEn : whitepapers;

  const currentLang = i18n.language.startsWith('en') ? 'en-US' : 'fr-FR';

  const handleDownloadClick = (paper: any) => {
    setSelectedWhitepaper({
      id: paper.id,
      title: paper.title,
      downloadUrl: '',
      image: paper.image,
      description: paper.description,
      pages: paper.pages,
      year: paper.year,
      category: paper.category,
    });
    setDownloadModalOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/whitepapers#webpage`,
        url: `${SITE_URL}/whitepapers`,
        name: t('whitepapers.seo.title'),
        description: t('whitepapers.seo.description'),
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/whitepapers#breadcrumb` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/whitepapers#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Livres Blancs', item: `${SITE_URL}/whitepapers` }
        ]
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-inclusion-financiere-afrique`,
        name: 'Inclusion financière en Afrique de l\'Ouest : état des lieux et perspectives 2025 — UEMOA et CEMAC',
        description: 'Analyse approfondie des dynamiques d\'inclusion financière en zone UEMOA. Taux de bancarisation, rôle du mobile money, obstacles structurels et recommandations stratégiques pour les décideurs.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-01-15',
        inLanguage: currentLang,
        numberOfPages: 48,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20financial%20inclusion%20in%20West%20Africa%2C%20elegant%20dark%20navy%20and%20gold%20design%20with%20abstract%20map%20of%20UEMOA%20region%2C%20charts%20showing%20banking%20penetration%20rates%2C%20premium%20consulting%20firm%20publication%20aesthetic%2C%20clean%20minimalist%20layout%20with%20sophisticated%20typography&width=600&height=800&seq=wp001&orientation=portrait'
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-gouvernance-institutions-microfinance`,
        name: 'Gouvernance des SFD/EMF : référentiel institutionnel UEMOA (BCEAO) et CEMAC (COBAC)',
        description: 'Cadre de référence complet pour renforcer la gouvernance des IMF en Afrique subsaharienne. Rôle du conseil d\'administration, contrôle interne, gestion des risques et conformité réglementaire BCEAO.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-02-10',
        inLanguage: currentLang,
        numberOfPages: 56,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20microfinance%20governance%20best%20practices%2C%20sophisticated%20dark%20blue%20and%20gold%20design%20with%20abstract%20governance%20framework%20diagram%2C%20premium%20African%20consulting%20publication%2C%20clean%20corporate%20layout%20with%20elegant%20typography%20and%20subtle%20geometric%20patterns&width=600&height=800&seq=wp002&orientation=portrait'
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-transformation-digitale-banques`,
        name: 'Transformation digitale des banques africaines : feuille de route stratégique — cadre BCEAO/COBAC',
        description: 'Guide stratégique pour les dirigeants bancaires africains souhaitant accélérer leur transformation digitale. Architecture SI, open banking, cybersécurité et gestion du changement organisationnel.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-03-05',
        inLanguage: currentLang,
        numberOfPages: 62,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20digital%20transformation%20of%20African%20banks%2C%20modern%20dark%20background%20with%20digital%20network%20patterns%20and%20gold%20accents%2C%20fintech%20and%20banking%20technology%20theme%2C%20premium%20consulting%20firm%20publication%20design%2C%20sophisticated%20minimalist%20layout&width=600&height=800&seq=wp003&orientation=portrait'
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-financement-pme-uemoa`,
        name: 'Financement des PME en zones UEMOA et CEMAC : obstacles, mécanismes et solutions',
        description: 'Étude complète sur l\'accès au financement des PME dans l\'espace UEMOA. Analyse des gaps de financement, rôle des fintechs, finance islamique et recommandations pour les institutions financières et les décideurs publics.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-04-12',
        inLanguage: currentLang,
        numberOfPages: 44,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20SME%20financing%20in%20UEMOA%20zone%20West%20Africa%2C%20elegant%20gold%20and%20dark%20navy%20design%20with%20abstract%20economic%20growth%20charts%2C%20premium%20African%20business%20publication%2C%20clean%20sophisticated%20layout%20with%20subtle%20map%20elements%20and%20financial%20data%20visualization&width=600&height=800&seq=wp004&orientation=portrait'
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-cybersecurite-institutions-financieres`,
        name: 'Cybersécurité des institutions financières africaines : cadre BCEAO/COBAC et stratégies de résilience',
        description: 'Panorama des cybermenaces pesant sur les institutions financières africaines et cadre stratégique pour renforcer leur résilience. Gouvernance de la sécurité, gestion des incidents et conformité réglementaire.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-05-20',
        inLanguage: currentLang,
        numberOfPages: 52,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20cybersecurity%20for%20African%20financial%20institutions%2C%20dark%20dramatic%20background%20with%20digital%20security%20shield%20and%20network%20protection%20elements%2C%20gold%20and%20deep%20blue%20color%20scheme%2C%20premium%20consulting%20publication%20design%2C%20sophisticated%20tech%20security%20aesthetic&width=600&height=800&seq=wp005&orientation=portrait'
      },
      {
        '@type': 'Book',
        '@id': `${SITE_URL}/whitepapers#wp-mobile-money-afrique-subsaharienne`,
        name: 'Mobile Money en Afrique subsaharienne : modèles économiques et cadres réglementaires UEMOA/CEMAC',
        description: 'Analyse comparative des modèles de mobile money en Afrique subsaharienne. Interopérabilité, protection des utilisateurs, cadre réglementaire et perspectives de développement pour les opérateurs et régulateurs.',
        author: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'KHEPRA EXPERTS', url: SITE_URL },
        datePublished: '2025-06-08',
        inLanguage: currentLang,
        numberOfPages: 38,
        bookFormat: 'https://schema.org/EBook',
        url: `${SITE_URL}/whitepapers`,
        image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20mobile%20money%20in%20sub-Saharan%20Africa%2C%20vibrant%20yet%20sophisticated%20design%20with%20smartphone%20and%20digital%20payment%20icons%20on%20dark%20background%2C%20gold%20accents%20with%20African%20continent%20silhouette%2C%20premium%20fintech%20consulting%20publication%2C%20clean%20modern%20layout&width=600&height=800&seq=wp006&orientation=portrait'
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('whitepapers.seo.title')}
        description={t('whitepapers.seo.description')}
        keywords="livres blancs inclusion financière Afrique, whitepaper gouvernance SFD EMF, publication fintech UEMOA, étude transformation digitale banques africaines, rapport financement PME, cybersécurité institutions financières, mobile money Afrique, inspection BCEAO 2026, conformité LBC FT 127 points, ratios prudentiels UEMOA, agrément SFD BCEAO, prix de transfert Afrique BEPS, cartographie risques COSO, gouvernance groupes familiaux, audit interne COSO IIA"
        canonicalPath="/whitepapers"
        ogType="website"
        ogImage={OG_IMAGES.WHITEPAPERS}
        ogImageAlt="Livres Blancs KHEPRA EXPERTS – Publications Experts Finance & Gouvernance Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        structuredData={jsonLd}
        twitterLabel1={i18n.language.startsWith('en') ? 'White Papers' : 'Livres Blancs'}
        twitterData1="6"
        twitterLabel2={i18n.language.startsWith('en') ? 'Expert pages' : 'Pages d\'expertise'}
        twitterData2="350+"
      />

      <Navigation />

      <div className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.whitepapers'), href: '/whitepapers' }
          ]}
        />

        {/* Hero Section */}
        <section
          className="relative pt-32 pb-20 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-20 left-10 w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-10 right-10 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}
            >
              <i className="ri-file-text-line text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {t('whitepapers.expertPublications')}
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              {t('whitepapers.title')}
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('whitepapers.description')}
            </p>
          </div>
        </section>

        {/* White Papers Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeWhitepapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                    <img
                      src={paper.image}
                      alt={paper.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-white">
                        {paper.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <i className="ri-file-list-line text-gold-600" />
                        <span>{paper.pages} {t('whitepapers.pages')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-calendar-line text-gold-600" />
                        <span>{paper.year}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-xl text-brand-900 mb-3 line-clamp-2 min-h-[3.5rem]" title={paper.title}>
                      {paper.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3" title={paper.description}>
                      {paper.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleDownloadClick(paper)}
                      className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #86BC25 100%)', color: 'white' }}
                    >
                      <i className="ri-download-line" />
                      {t('whitepapers.downloadPdf')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)' }}
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #86BC25 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-4xl font-bold text-white mb-6">
              {t('whitepapers.needCustomResearch')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('whitepapers.ourExpertsCanDevelop')}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #86BC25 100%)', color: 'white' }}
            >
              <i className="ri-chat-3-line text-xl" />
              {t('whitepapers.contactOurExperts')}
            </a>
          </div>
        </section>
      </div>

      <Footer />

      <ResourceDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        resource={selectedWhitepaper}
        isWhitepaper={true}
      />
    </>
  );
}



