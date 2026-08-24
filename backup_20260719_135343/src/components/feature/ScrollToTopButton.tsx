import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
      setIsVisible(scrolled);

      // Calculer le pourcentage de progression
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / windowHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 cursor-pointer group hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-300"
      aria-label={i18n.language === 'fr' ? 'Retour en haut de la page' : 'Back to top'}
      title={i18n.language === 'fr' ? 'Retour en haut' : 'Back to top'}
      style={{
        background: `conic-gradient(#86BC25 ${progress * 3.6}deg, rgba(212, 168, 42, 0.2) ${progress * 3.6}deg)`
      }}
    >
      <div className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-600 rounded-full">
        <i className="ri-arrow-up-line text-xl group-hover:animate-bounce" aria-hidden="true"></i>
      </div>
    </button>
  );
}



