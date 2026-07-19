import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBrochureDownload } from '@/hooks/useBrochureDownload';

const STORAGE_KEY = 'khepera_exit_popup_dismissed';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

export function ExitIntentPopup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [isVisible, setIsVisible] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { handleDownload, isDownloading } = useBrochureDownload('exit-popup');

  const shouldShow = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return true;
      const { timestamp } = JSON.parse(stored);
      return Date.now() - timestamp > DISMISS_DURATION_MS;
    } catch {
      return true;
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
    } catch {
      // silently fail
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 10 && shouldShow()) {
        triggered = true;
        setIsVisible(true);
      }
    };

    // Délai de 3s avant d'activer le listener pour éviter les faux positifs
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldShow]);

  // Fermer avec Escape
  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isVisible, dismiss]);

  const onDownloadClick = () => {
    handleDownload();
    setDownloaded(true);
    setTimeout(() => dismiss(), 2500);
  };

  if (!isVisible) return null;

  // Personnalisation du message selon la page
  const getPageSpecificContent = () => {
    const path = location.pathname;
    
    // Page services → offre diagnostic
    if (path.startsWith('/services')) {
      return {
        badge: isEn ? 'Free Strategic Diagnostic' : 'Diagnostic Stratégique Gratuit',
        title: isEn 
          ? 'Get your free 30-minute strategic diagnostic!' 
          : 'Obtenez votre diagnostic stratégique gratuit en 30 min !',
        description: isEn
          ? 'Before you leave, book a confidential consultation with our experts to analyze your challenges and identify concrete solutions.'
          : 'Avant de partir, réservez une consultation confidentielle avec nos experts pour analyser vos défis et identifier des solutions concrètes.',
        points: isEn ? [
          'Personalized analysis of your situation',
          'Strategic recommendations from our experts',
          'No commitment • Response within 2 hours',
        ] : [
          'Analyse personnalisée de votre situation',
          'Recommandations stratégiques de nos experts',
          'Sans engagement • Réponse sous 2h',
        ],
        ctaText: isEn ? 'Book my free diagnostic' : 'Réserver mon diagnostic gratuit',
        ctaLink: '/#diagnostic-offer',
        ctaIcon: 'ri-calendar-check-line',
      };
    }
    
    // Page blog → newsletter
    if (path.startsWith('/blog')) {
      return {
        badge: isEn ? 'Expert Newsletter' : 'Newsletter Expert',
        title: isEn 
          ? 'Stay informed with our expert analyses!' 
          : 'Restez informé avec nos analyses d\'experts !',
        description: isEn
          ? 'Subscribe to our newsletter and receive exclusive insights, practical advice and regulatory updates for West Africa.'
          : 'Abonnez-vous à notre newsletter et recevez des insights exclusifs, conseils pratiques et actualités réglementaires pour l\'Afrique de l\'Ouest.',
        points: isEn ? [
          '1 monthly newsletter with strategic analyses',
          'Regulatory alerts and compliance updates',
          'Exclusive resources and practical guides',
        ] : [
          '1 newsletter mensuelle avec analyses stratégiques',
          'Alertes réglementaires et mises à jour conformité',
          'Ressources exclusives et guides pratiques',
        ],
        ctaText: isEn ? 'Subscribe to the newsletter' : 'S\'abonner à la newsletter',
        ctaLink: '/#newsletter',
        ctaIcon: 'ri-mail-send-line',
      };
    }
    
    // Par défaut → brochure
    return {
      badge: isEn ? 'Free Resource' : 'Ressource gratuite',
      title: isEn 
        ? 'Before you leave, take our brochure!' 
        : 'Avant de partir, emportez notre brochure !',
      description: isEn
        ? 'Discover our expertise, client references and methodological approach in West Africa — in a single PDF document.'
        : 'Découvrez nos expertises, références clients et approche méthodologique en Afrique de l\'Ouest — en un seul document PDF.',
      points: isEn ? [
        'Our 6 detailed areas of expertise',
        'Our presence in 23 African countries',
        'Methodological approach and consultant profiles',
      ] : [
        'Nos 6 domaines d\'expertise détaillés',
        'Notre présence dans 23 pays africains',
        'Approche méthodologique et profils consultants',
      ],
      ctaText: isEn ? 'Download the PDF brochure' : 'Télécharger la brochure PDF',
      ctaLink: null,
      ctaIcon: 'ri-download-2-line',
    };
  };

  const content = getPageSpecificContent();

  const handleCTA = () => {
    if (content.ctaLink) {
      const [path, hash] = content.ctaLink.split('#');
      navigate(path || '/');
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
      dismiss();
    } else {
      onDownloadClick();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={dismiss}
      />

      {/* Carte */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeSlideUp">

        {/* Bandeau doré en haut */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

        {/* Bouton fermer */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-10"
          aria-label={isEn ? 'Close' : 'Fermer'}
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image latérale */}
          <div className="hidden md:block w-44 flex-shrink-0 relative">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20African%20business%20consultant%20in%20modern%20office%20Lome%20Togo%20holding%20documents%20confident%20smile%20warm%20neutral%20background%20corporate%20attire%20natural%20light%20clean%20minimal%20setting%20high%20quality%20portrait&width=176&height=320&seq=exit-popup-img-01&orientation=portrait"
              alt={isEn ? 'KHEPRA EXPERTS Consultant' : 'Consultant KHEPRA EXPERTS'}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
          </div>

          {/* Contenu */}
          <div className="flex-1 p-7">
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <i className={`${content.ctaIcon} text-sm`}></i>
              {content.badge}
            </span>

            <h2
              id="exit-popup-title"
              className="text-xl font-bold text-gray-900 leading-snug mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.title}
            </h2>

            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              {content.description}
            </p>

            {/* Points clés */}
            <ul className="space-y-2 mb-6">
              {content.points.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-amber-500 text-base"></i>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Bouton CTA */}
            {content.ctaLink ? (
              <button
                onClick={handleCTA}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 px-5 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${content.ctaIcon} text-base`}></i>
                </div>
                {content.ctaText}
              </button>
            ) : (
              <button
                onClick={handleCTA}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 px-5 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {downloaded ? (
                  <>
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-check-line text-base"></i></div>
                    {isEn ? 'Download successful!' : 'Téléchargement réussi !'}
                  </>
                ) : isDownloading ? (
                  <>
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-loader-4-line animate-spin text-base"></i></div>
                    {isEn ? 'Generating...' : 'Génération...'}
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 flex items-center justify-center"><i className={`${content.ctaIcon} text-base`}></i></div>
                    {content.ctaText}
                  </>
                )}
              </button>
            )}

            {/* Lien de refus discret */}
            <button
              onClick={dismiss}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3 cursor-pointer transition-colors"
            >
              {isEn ? 'No thanks, I don\'t need this resource' : 'Non merci, je n\'ai pas besoin de cette ressource'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



