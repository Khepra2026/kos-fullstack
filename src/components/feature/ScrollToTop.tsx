import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  // Remonter en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const label = i18n.language === 'fr' ? 'Retour en haut de la page' : 'Back to top';

  return (
    <button
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2
        bg-gradient-to-br from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 hover:shadow-xl hover:-translate-y-1
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <i className="ri-arrow-up-line text-xl" aria-hidden="true"></i>
    </button>
  );
}

export default ScrollToTop;
