import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { log404 } from '@/utils/monitoring';
import { resolveLegacySlug } from '@/data/articleSlugMap';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // ── Filet de sécurité : redirection automatique des anciens slugs ──
    const targetPath = resolveLegacySlug(location.pathname);
    if (targetPath) {
      setIsRedirecting(true);
      // Petit délai pour que le bot puisse lire le contenu si besoin
      const timer = setTimeout(() => {
        navigate(targetPath, { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
    // Sinon, log classique 404
    log404();
  }, [location.pathname, navigate]);

  const notFoundSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 – Page non trouvée | KHEPRA EXPERTS',
    description: "La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil de KHEPRA EXPERTS.",
    url: `${SITE_URL}${location.pathname}`,
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'KHEPRA EXPERTS',
    },
  };

  // ── Écran de redirection intermédiaire (pour les anciens slugs) ──
  if (isRedirecting) {
    const targetPath = resolveLegacySlug(location.pathname);
    return (
      <>
        <SeoHead
          title="Redirection en cours... | KHEPRA EXPERTS"
          description="Cette page a été déplacée. Vous êtes redirigé vers la nouvelle adresse."
          noIndex={true}
        >
          {/* Meta refresh pour les bots qui ne suivent pas JS */}
          <meta http-equiv="refresh" content={`1;url=${SITE_URL}${targetPath}`} />
          <link rel="canonical" href={`${SITE_URL}${targetPath}`} />
        </SeoHead>
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-6 animate-pulse">
              <i className="ri-arrow-right-up-line text-gold-600 text-3xl"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Redirection en cours...
            </h1>
            <p className="text-base text-gray-600 mb-2">
              Cette page a été déplacée vers une nouvelle adresse.
            </p>
            <p className="text-sm font-mono text-gray-500 mb-6">
              {location.pathname} → {targetPath}
            </p>
            <button
              onClick={() => navigate(targetPath || '/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-full hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-right-line text-lg"></i>
              Aller à la nouvelle page
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title="404 – Page non trouvée | KHEPRA EXPERTS"
        description="La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil de KHEPRA EXPERTS, cabinet de conseil en finance, gouvernance et stratégie en Afrique."
        noIndex={true}
        schemaJson={notFoundSchema}
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-100 select-none pointer-events-none z-0">
          404
        </h1>
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full mb-6">
              <i className="ri-error-warning-line text-gold-600 text-4xl"></i>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('notFound.title') || 'Page non trouvée'}
            </h1>
            <p className="text-base text-gray-600 font-mono mb-2">{location.pathname}</p>
            <p className="text-lg text-gray-700 mb-8">
              {t('notFound.message') || 'La page que vous recherchez n\'existe pas ou a été déplacée.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t('notFound.suggestionsTitle') || 'Pages suggérées'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-home-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.home') || 'Accueil'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.homeDesc') || 'Retour à l\'accueil'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/about/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-team-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.about') || 'À propos'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.aboutDesc') || 'Notre expertise'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/services/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-service-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.services') || 'Services'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.servicesDesc') || 'Nos expertises'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/case-studies/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-briefcase-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.caseStudies') || 'Études de cas'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.caseStudiesDesc') || 'Nos réalisations'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/decideurs/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-user-star-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.decideurs') || 'Décideurs'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.decideursDesc') || 'Solutions sur mesure'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/blog/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-article-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.blog') || 'Blog'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.blogDesc') || 'Articles & insights'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/resources/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-file-download-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t('nav.resources') || 'Ressources'}</p>
                  <p className="text-xs text-gray-600">{t('notFound.resourcesDesc') || 'Guides gratuits'}</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/sfd-conformite/')}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gold-50 hover:border-gold-200 border border-gray-200 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                  <i className="ri-shield-check-line text-gold-700 text-xl"></i>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">SFD Conformité</p>
                  <p className="text-xs text-gray-600">{t('notFound.sfdDesc') || 'Conformité SFD'}</p>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-full hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg cursor-pointer min-h-[44px] whitespace-nowrap"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            {t('notFound.backHome') || 'Retour à l\'accueil'}
          </button>
        </div>
      </div>
    </>
  );
}