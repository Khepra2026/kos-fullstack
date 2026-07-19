import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const QUICK_TOOLS = [
  {
    id: 'diagnostic-org',
    icon: 'ri-stethoscope-line',
    labelFr: 'Diagnostic org.',
    labelEn: 'Org. Diagnostic',
    link: '/tools/diagnostic-organisationnel',
  },
  {
    id: 'gouvernance',
    icon: 'ri-scales-line',
    labelFr: 'Gouvernance',
    labelEn: 'Governance',
    link: '/tools/evaluation-gouvernance',
  },
  {
    id: 'simulateur',
    icon: 'ri-calculator-line',
    labelFr: 'Simulateur',
    labelEn: 'Simulator',
    link: '/tools/simulateur-financier',
  },
];

export function ToolsStickyBanner() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 800px)
      const shouldShow = window.scrollY > 800 && !isDismissed;
      setIsVisible(shouldShow);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    // Remind user after 24 hours
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    localStorage.setItem('toolsBannerDismissedUntil', tomorrow.toISOString());
  };

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('toolsBannerDismissedUntil');
    if (dismissedUntil) {
      const untilDate = new Date(dismissedUntil);
      if (untilDate > new Date()) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem('toolsBannerDismissedUntil');
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] animate-slideUp"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
        borderTop: '2px solid rgba(201,162,39,0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: message + tools */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <i className="ri-tools-line text-sm" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold text-white whitespace-nowrap">
                {isEn ? 'Try our free tools:' : 'Essayez nos outils gratuits :'}
              </span>
            </div>

            {/* Tools pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
              {QUICK_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    navigate(tool.link);
                    setIsVisible(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap flex-shrink-0"
                  style={{
                    background: 'rgba(201,162,39,0.15)',
                    border: '1px solid rgba(201,162,39,0.3)',
                    color: '#86BC25',
                  }}
                >
                  <i className={`${tool.icon} text-xs`} />
                  <span>{isEn ? tool.labelEn : tool.labelFr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: CTA + close */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => {
                navigate('/tools/');
                setIsVisible(false);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #e8c04a)',
                color: '#0a0a0a',
              }}
            >
              {isEn ? 'All tools' : 'Tous les outils'}
              <i className="ri-arrow-right-line text-xs" />
            </button>
            <button
              onClick={handleDismiss}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10 cursor-pointer flex-shrink-0"
              aria-label={isEn ? 'Dismiss' : 'Masquer'}
            >
              <i className="ri-close-line text-sm text-white/50 hover:text-white/80" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ToolsStickyBanner;



