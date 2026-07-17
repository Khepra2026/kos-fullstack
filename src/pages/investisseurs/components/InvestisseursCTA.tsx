import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

export const InvestisseursCTA = memo(function InvestisseursCTA() {
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
            <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,162,39,0.12) 0%, transparent 55%)' }} />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(34,160,90,0.08) 0%, transparent 55%)' }} />

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.25)' }}
              >
                <i className="ri-calendar-check-line text-xs" style={{ color: '#86BC25' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                  {isEn ? 'Slots limited this month' : 'Places limitées ce mois-ci'}
                </span>
              </div>

              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                {isEn
                  ? 'Ready to secure your next investment ?'
                  : 'Prêt à sécuriser votre prochain investissement ?'}
              </h2>
              <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
                {isEn
                  ? 'Book a confidential 20-minute consultation. We will assess your needs and recommend the right approach. No commitment required.'
                  : 'Prenez un rendez-vous confidentiel de 20 minutes. Nous évaluerons vos besoins et recommanderons la bonne approche. Sans engagement.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                    color: '#0a0a0a',
                    boxShadow: '0 4px 20px rgba(201,162,39,0.45)',
                  }}
                >
                  <i className="ri-calendar-check-line" />
                  {isEn ? 'Book a confidential consultation' : 'Prendre rendez-vous confidentiel'}
                </button>
                <button
                  onClick={() => navigate('/tools/investment-readiness')}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1.5px solid rgba(201,162,39,0.4)',
                    color: '#86BC25',
                    background: 'transparent',
                  }}
                >
                  <i className="ri-bar-chart-grouped-line" />
                  {isEn ? 'Test my readiness — Free' : 'Tester ma readiness — Gratuit'}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});