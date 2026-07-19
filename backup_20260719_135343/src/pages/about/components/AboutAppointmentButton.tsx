import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function AboutAppointmentButton() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Bouton flottant persistant */}
      <div
        className={`fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Carte dépliée */}
        {expanded && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-72 animate-fade-in">
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-100">
                <i className="ri-user-star-line text-gold-600 text-lg"></i>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">SIMDA Essoyomèwè</p>
                <p className="text-xs text-gray-500">
                  {isEn ? 'Senior Consultant' : 'Consultant Senior'}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {isEn
                ? 'Schedule a free 30-minute strategic consultation to discuss your challenges.'
                : 'Planifiez une consultation stratégique gratuite de 30 min pour discuter de vos enjeux.'}
            </p>
            <a
              href="https://calendly.com/essochamanu"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-5 py-3 rounded-full hover:from-gold-600 hover:to-gold-700 transition-all font-semibold text-sm whitespace-nowrap cursor-pointer w-full shadow-md"
            >
              <i className="ri-calendar-check-line"></i>
              {isEn ? 'Book a Free Meeting' : 'Réserver un créneau gratuit'}
            </a>
            <div className="flex items-center gap-2 mt-3 justify-center">
              <i className="ri-time-line text-gray-400 text-xs"></i>
              <span className="text-xs text-gray-400">
                {isEn ? 'Response within 24h' : 'Réponse sous 24h'}
              </span>
            </div>
          </div>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white pl-5 pr-6 py-4 rounded-full shadow-2xl hover:from-gold-600 hover:to-gold-700 transition-all font-semibold whitespace-nowrap cursor-pointer group"
          aria-label={isEn ? 'Book a meeting' : 'Prendre rendez-vous'}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
            <i className="ri-calendar-check-line text-white text-base"></i>
          </div>
          <span className="text-sm font-bold">
            {isEn ? 'Book a Meeting' : 'Prendre rendez-vous'}
          </span>
          <i className={expanded ? 'ri-arrow-down-s-line text-white/80 text-sm transition-transform' : 'ri-arrow-up-s-line text-white/80 text-sm transition-transform'}></i>
        </button>
      </div>
    </>
  );
}




