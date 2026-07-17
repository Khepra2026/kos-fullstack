import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AboutCTA() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 md:p-14 rounded-3xl" style={{ background: '#0a0a0a' }}>
          {/* Left */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6" style={{ background: '#86BC25' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: '#86BC25' }}>
                {t('aboutCTA.badge', 'Démarrez votre transformation')}
              </span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {t('aboutCTA.title')}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
              {t('aboutCTA.description')}
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigate('/tools/diagnostic-organisationnel')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#0a0a0a' }}
            >
              <i className="ri-stethoscope-line" />
              {t('aboutCTA.ctaDiagnostic')}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-expert-modal'))}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {t('aboutCTA.ctaExpert', 'Parler à un expert')}
              <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AboutCTA };
export default AboutCTA;