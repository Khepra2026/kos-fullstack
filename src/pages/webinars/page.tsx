import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import { webinars } from '@/mocks/webinars';
import { webinarsEn } from '@/mocks/webinarsEn';
import { OG_DEFAULT_IMAGE, OG_DEFAULT_IMAGE_ALT } from '@/components/feature/OgDefaultImage';
import { OG_IMAGES, OG_IMAGE_DIMENSIONS } from '@/components/feature/OgImages';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

const CATEGORIES_FR = ['Tous', 'Conformité & Réglementation', 'Transformation Digitale', 'Finance & Investissement', 'Gouvernance & Management', 'Fintech & Innovation'];
const CATEGORIES_EN = ['All', 'Compliance & Regulation', 'Digital Transformation', 'Finance & Investment', 'Governance & Management', 'Fintech & Innovation'];

export default function WebinarsPage() {
  const { t, i18n } = useTranslation();

  const isEn = i18n.language.startsWith('en');
  const currentLang = isEn ? 'en-US' : 'fr-FR';

  const [langFilter, setLangFilter] = useState<'all' | 'fr' | 'en'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'replay'>('all');

  // Déterminer le pool selon le filtre langue
  const getWebinarPool = () => {
    if (langFilter === 'fr') return webinars;
    if (langFilter === 'en') return webinarsEn;
    // 'all' : langue de l'interface par défaut
    return isEn ? webinarsEn : webinars;
  };

  const categories = (langFilter === 'en' || (langFilter === 'all' && isEn)) ? CATEGORIES_EN : CATEGORIES_FR;

  const allWebinars = getWebinarPool();

  const filteredWebinars = allWebinars.filter((w) => {
    const matchCat = categoryFilter === 'all' || w.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchCat && matchStatus;
  });

  // Reset category filter when lang changes
  const handleLangFilter = (val: 'all' | 'fr' | 'en') => {
    setLangFilter(val);
    setCategoryFilter('all');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/webinars#webpage`,
        url: `${SITE_URL}/webinars`,
        name: t('webinars.seo.title'),
        description: t('webinars.seo.description'),
        inLanguage: currentLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${SITE_URL}/webinars#breadcrumb` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/webinars#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Webinaires', item: `${SITE_URL}/webinars` }
        ]
      }
    ]
  };

  return (
    <>
      <SeoHead
        title={t('webinars.meta.title')}
        description={t('webinars.meta.description')}
        keywords={t('webinars.meta.keywords')}
        canonicalPath="/webinars"
        structuredData={jsonLd}
        ogImage={OG_IMAGES.WEBINARS}
        ogImageAlt="Webinaires professionnels – KHEPRA EXPERTS | Formation en ligne et expertise en Afrique"
        ogImageWidth={OG_IMAGE_DIMENSIONS.width}
        ogImageHeight={OG_IMAGE_DIMENSIONS.height}
        twitterLabel1={isEn ? 'Webinars' : 'Webinaires'}
        twitterData1="12+"
        twitterLabel2={isEn ? 'Languages' : 'Langues'}
        twitterData2="FR + EN"
      />

      <Navigation />

      <div className="min-h-screen bg-white">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.webinars'), href: '/webinars' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)'}}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)'}}></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full" style={{background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)'}}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)'}}>
              <i className="ri-live-line text-gold-400"></i>
              <span className="text-sm font-medium text-gold-400">
                {t('webinars.expertWebinars')}
              </span>
            </div>

            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              {t('webinars.title')}
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('webinars.description')}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-10 border-b border-gray-100 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

              {/* Filtre Langue */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {isEn ? 'Language' : 'Langue'}
                </span>
                <div className="flex items-center gap-1 p-1 rounded-full bg-white shadow-sm border border-gray-200">
                  {[
                    { val: 'all', label: isEn ? 'All' : 'Tous', flag: '🌐' },
                    { val: 'fr', label: 'FR', flag: '🇫🇷' },
                    { val: 'en', label: 'EN', flag: '🇬🇧' },
                  ].map(({ val, label, flag }) => (
                    <button
                      key={val}
                      onClick={() => handleLangFilter(val as 'all' | 'fr' | 'en')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                        langFilter === val
                          ? 'text-white shadow-md'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      style={langFilter === val ? {background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 100%)'} : {}}
                    >
                      <span>{flag}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtre Statut */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {isEn ? 'Status' : 'Statut'}
                </span>
                <div className="flex items-center gap-1 p-1 rounded-full bg-white shadow-sm border border-gray-200">
                  {[
                    { val: 'all', label: isEn ? 'All' : 'Tous' },
                    { val: 'upcoming', label: isEn ? 'Upcoming' : 'À venir' },
                    { val: 'replay', label: 'Replay' },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setStatusFilter(val as 'all' | 'upcoming' | 'replay')}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                        statusFilter === val
                          ? 'text-white shadow-md'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      style={statusFilter === val ? {background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 100%)'} : {}}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtre Catégorie */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {isEn ? 'Category' : 'Catégorie'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const val = cat === 'Tous' || cat === 'All' ? 'all' : cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(val)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                          categoryFilter === val
                            ? 'text-white border-transparent shadow-sm'
                            : 'text-gray-600 border-gray-200 bg-white hover:border-gold-400 hover:text-gold-700'
                        }`}
                        style={categoryFilter === val ? {background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 100%)', borderColor: 'transparent'} : {}}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Compteur résultats */}
            <div className="mt-4 text-sm text-gray-500">
              {filteredWebinars.length} {isEn
                ? `webinar${filteredWebinars.length !== 1 ? 's' : ''} found`
                : `webinaire${filteredWebinars.length !== 1 ? 's' : ''} trouvé${filteredWebinars.length !== 1 ? 's' : ''}`}
              {langFilter !== 'all' && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gold-50 text-gold-700 border border-gold-200">
                  {langFilter === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Webinars Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredWebinars.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gray-100">
                  <i className="ri-search-line text-2xl text-gray-400"></i>
                </div>
                <p className="text-gray-500 text-lg">
                  {isEn ? 'No webinars match your filters.' : 'Aucun webinaire ne correspond à vos filtres.'}
                </p>
                <button
                  onClick={() => { setLangFilter('all'); setCategoryFilter('all'); setStatusFilter('all'); }}
                  className="mt-4 text-sm text-gold-700 underline cursor-pointer"
                >
                  {isEn ? 'Reset filters' : 'Réinitialiser les filtres'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWebinars.map((webinar) => (
                  <div key={webinar.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={webinar.image}
                        alt={webinar.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 border border-gray-200">
                          {langFilter === 'en' || (langFilter === 'all' && isEn) ? '🇬🇧 EN' : '🇫🇷 FR'}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          webinar.status === 'upcoming'
                            ? 'bg-gold-500 text-white'
                            : 'bg-strategic-500 text-white'
                        }`}>
                          {t(`webinars.status.${webinar.status}`)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gold-50 text-gold-700 border border-gold-100">
                          {webinar.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <i className="ri-calendar-line text-gold-600"></i>
                          <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="ri-time-line text-gold-600"></i>
                          <span>{webinar.duration}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-xl text-brand-900 mb-3 line-clamp-2">
                        {webinar.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {webinar.description}
                      </p>

                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                        <i className="ri-user-line text-gold-600"></i>
                        <span className="text-sm font-medium text-gray-700">{webinar.speaker}</span>
                      </div>

                      <button
                        onClick={() => {
                          const expertButton = document.querySelector('[aria-label*="expert"]') as HTMLButtonElement;
                          if (expertButton) expertButton.click();
                        }}
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                        style={{background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #86BC25 100%)', color: 'white'}}
                      >
                        {webinar.status === 'upcoming' ? (
                          <>
                            <i className="ri-calendar-check-line"></i>
                            {t('webinars.registerNow')}
                          </>
                        ) : (
                          <>
                            <i className="ri-play-circle-line"></i>
                            {t('webinars.watchReplay')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)'}}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #86BC25 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-4xl font-bold text-white mb-6">
              {t('webinars.stayInformed')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('webinars.subscribeDescription')}
            </p>
            <button
              onClick={() => {
                const expertButton = document.querySelector('[aria-label*="expert"]') as HTMLButtonElement;
                if (expertButton) expertButton.click();
              }}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto whitespace-nowrap cursor-pointer"
              style={{background: 'linear-gradient(135deg, #6B9B1F 0%, #86BC25 50%, #86BC25 100%)', color: 'white'}}
            >
              <i className="ri-notification-line text-xl"></i>
              {t('webinars.subscribeUpdates')}
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}