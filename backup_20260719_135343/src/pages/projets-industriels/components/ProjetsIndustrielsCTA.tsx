import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

export const ProjetsIndustrielsCTA = memo(function ProjetsIndustrielsCTA() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(212,168,42,0.12) 0%, transparent 55%)' }} />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(34,160,90,0.08) 0%, transparent 55%)' }} />

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(34,160,90,0.10)', border: '1px solid rgba(34,160,90,0.25)' }}
              >
                <i className="ri-calendar-check-line text-xs" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                  {isEn ? 'Limited slots this quarter' : 'Places limitées ce trimestre'}
                </span>
              </div>

              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                {isEn
                  ? 'Ready to structure your project ?'
                  : 'Prêt à structurer votre projet ?'}
              </h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
                {isEn
                  ? 'Book a 30-minute project review. We will assess viability, identify blockers, and propose a structuring roadmap. No commitment required.'
                  : 'Prenez un rendez-vous de 30 minutes pour revoir votre projet. Nous évaluerons la viabilité, identifierons les blocages, et proposerons une feuille de route de structuration. Sans engagement.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                    color: '#0a1f33',
                    boxShadow: '0 4px 20px rgba(212,168,42,0.45)',
                  }}
                >
                  <i className="ri-calendar-check-line" />
                  {isEn ? 'Request a project review' : 'Demander une revue de projet'}
                </button>
                <button
                  onClick={() => navigate('/tools/diagnostic-strategique')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1.5px solid rgba(212,168,42,0.4)',
                    color: '#86BC25',
                    background: 'transparent',
                  }}
                >
                  <i className="ri-rocket-line" />
                  {isEn ? 'Project viability scan' : 'Scanner la viabilité'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});



