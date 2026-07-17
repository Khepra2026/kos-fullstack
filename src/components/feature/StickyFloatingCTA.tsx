import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StickyCTAProps {
  scrollThreshold?: number; // Pourcentage de scroll avant d'afficher (par défaut: 40)
  onCtaClick?: () => void;
}

export function StickyFloatingCTA({ scrollThreshold = 40, onCtaClick }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setIsVisible(scrollPercent >= scrollThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  const handleClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Ouvrir le modal expert flottant via l'événement global
      window.dispatchEvent(new Event('open-expert-modal'));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-[9990] hidden lg:flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full shadow-lg hover:from-gold-600 hover:to-gold-700 font-medium whitespace-nowrap cursor-pointer group transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      aria-label={t('cta.diagnostic_free', 'Diagnostic gratuit')}
    >
      <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
        <i className="ri-customer-service-2-line text-xl" aria-hidden="true"></i>
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold">
          {t('cta.diagnostic_free', 'Diagnostic gratuit')}
        </div>
        <div className="text-xs opacity-90">
          {t('cta.diagnostic_subtitle', 'Réponse sous 2h · Sans engagement')}
        </div>
      </div>
      <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
    </button>
  );
}