import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { LEAD_SERVICES } from '@/mocks/specializedOffers';

const PROJECT_LEAD_IDS = ['project-viability-scan', 'esg-quick-scan', 'flash-diagnostic', 'financial-health-check'];

const LeadCard = memo(function LeadCard({
  service,
  index,
  isEn,
  navigate,
}: {
  service: (typeof LEAD_SERVICES)[0];
  index: number;
  isEn: boolean;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const isFree = service.priceFr === 'Gratuit';

  return (
    <ScrollReveal delay={index * 60}>
      <div
        className="group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        style={{ background: '#ffffff', borderColor: 'rgba(212,168,42,0.15)' }}
        onClick={() => navigate(service.slug)}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: isFree ? 'rgba(34,160,90,0.10)' : 'rgba(212,168,42,0.10)',
              color: isFree ? '#86BC25' : '#86BC25',
              border: `1px solid ${isFree ? 'rgba(34,160,90,0.20)' : 'rgba(212,168,42,0.20)'}`,
            }}
          >
            <i className={isFree ? 'ri-gift-line' : 'ri-coins-line'} />
            {isEn ? service.priceEn : service.priceFr}
          </span>
          <span className="text-xs font-medium text-gray-400">{isEn ? service.durationEn : service.durationFr}</span>
        </div>

        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
          style={{ background: `${service.accentColor}10`, border: `1px solid ${service.accentColor}20` }}
        >
          <i className={`${service.icon} text-xl`} style={{ color: service.accentColor }} />
        </div>

        <h4 className="font-playfair text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={isEn ? service.nameEn : service.nameFr}>
          {isEn ? service.nameEn : service.nameFr}
        </h4>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {isEn ? service.descriptionEn : service.descriptionFr}
        </p>
        <p className="text-xs font-medium mb-4" style={{ color: 'rgba(107,114,128,0.7)' }}>
          <i className="ri-user-line mr-1" />
          {isEn ? service.targetEn : service.targetFr}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(service.slug);
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(212,168,42,0.08)',
            border: '1.5px solid rgba(212,168,42,0.3)',
            color: '#6B9B1F',
          }}
        >
          {isEn ? service.ctaEn : service.ctaFr}
          <i className="ri-arrow-right-line" />
        </button>
      </div>
    </ScrollReveal>
  );
});

export const ProjetsIndustrielsLeadServices = memo(function ProjetsIndustrielsLeadServices() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const services = LEAD_SERVICES.filter((s) => PROJECT_LEAD_IDS.includes(s.id));

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.20)' }}
          >
            <i className="ri-door-open-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              {isEn ? 'Free & Quick Entry Points' : 'Services d\'entrée gratuits & rapides'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'Start with a quick diagnostic' : 'Commencez par un diagnostic rapide'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {isEn
              ? 'Understandable in 10 seconds. Free or on quote. Each converts into a full mission when you are ready.'
              : 'Compréhensibles en 10 secondes. Gratuits ou sur devis. Chacun convertit vers une mission complète quand vous êtes prêt.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <LeadCard key={service.id} service={service} index={index} isEn={isEn} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
});