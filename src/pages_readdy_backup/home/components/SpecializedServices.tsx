import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { MAIN_OFFERS, LEAD_SERVICES, DIFFERENTIATORS, SLOGANS } from '@/mocks/specializedOffers';

const OfferCard = memo(function OfferCard({
  offer,
  index,
  isEn,
  navigate,
}: {
  offer: (typeof MAIN_OFFERS)[0];
  index: number;
  isEn: boolean;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const isGold = index % 2 === 0;
  const accent = isGold ? '#86BC25' : '#86BC25';

  return (
    <ScrollReveal delay={index * 100}>
      <div
        className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer gradient-border glow-gold-hover"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
        }}
        onClick={() => navigate(offer.slug)}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${isGold ? '#f4d03f' : '#34d399'})` }} />

        <div className="p-8 lg:p-10">
          {/* Badge + numéro */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}
            >
              <i className={`${offer.icon} text-sm`} />
              {isEn ? 'Premium Service' : 'Service Premium'}
            </span>
            <span
              className="font-playfair text-5xl font-bold leading-none select-none"
              style={{ color: 'transparent', WebkitTextStroke: `1px ${accent}20` }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>
            {isEn ? offer.taglineEn : offer.taglineFr}
          </p>

          {/* Title */}
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? offer.nameEn : offer.nameFr}
          </h3>

          {/* Target */}
          <p className="text-xs font-medium mb-5" style={{ color: 'rgba(107,114,128,0.8)' }}>
            {isEn ? offer.targetEn : offer.targetFr}
          </p>

          {/* Problem → Solution → Result */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.10)' }}>
              <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.12)' }}>
                <i className="ri-error-warning-line text-xs" style={{ color: '#ef4444' }} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{isEn ? offer.problemEn : offer.problemFr}</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `${accent}06`, border: `1px solid ${accent}15` }}>
              <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: `${accent}15` }}>
                <i className="ri-arrow-right-line text-xs" style={{ color: accent }} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{isEn ? offer.solutionEn : offer.solutionFr}</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(34,160,90,0.04)', border: '1px solid rgba(34,160,90,0.10)' }}>
              <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,160,90,0.12)' }}>
                <i className="ri-checkbox-circle-line text-xs" style={{ color: '#86BC25' }} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">{isEn ? offer.resultEn : offer.resultFr}</p>
            </div>
          </div>

          {/* Benefits */}
          <ul className="space-y-2.5 mb-6">
            {(isEn ? offer.benefitsEn : offer.benefitsFr).map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: `${accent}12` }}>
                  <i className="ri-check-line text-[10px]" style={{ color: accent }} />
                </div>
                <span className="text-sm text-gray-600 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          {/* Metric highlight */}
          <div
            className="rounded-2xl p-4 mb-6 flex items-center gap-4"
            style={{ background: `linear-gradient(135deg, ${accent}08, ${accent}04)`, border: `1px solid ${accent}15` }}
          >
            <div className="font-playfair text-3xl font-bold" style={{ color: accent }}>
              {offer.metricValue}
            </div>
            <p className="text-xs font-medium leading-snug" style={{ color: 'rgba(107,114,128,0.9)' }}>
              {isEn ? offer.metricLabelEn : offer.metricLabelFr}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(offer.slug);
            }}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 group"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${isGold ? '#f4d03f' : '#34d399'})`,
              color: isGold ? '#0a1f33' : '#ffffff',
              boxShadow: `0 4px 20px ${accent}40`,
            }}
          >
            {isEn ? 'Explore this offer' : 'Explorer cette offre'}
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
});

const LeadServiceCard = memo(function LeadServiceCard({
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
        className="group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer gradient-border glow-gold-hover"
        style={{
          background: '#ffffff',
        }}
        onClick={() => navigate(service.slug)}
      >
        {/* Price badge */}
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

        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl mb-4"
          style={{ background: `${service.accentColor}10`, border: `1px solid ${service.accentColor}20` }}
        >
          <i className={`${service.icon} text-xl`} style={{ color: service.accentColor }} />
        </div>

        {/* Title */}
        <h4 className="font-playfair text-lg font-bold text-gray-900 mb-2">
          {isEn ? service.nameEn : service.nameFr}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {isEn ? service.descriptionEn : service.descriptionFr}
        </p>

        {/* Target */}
        <p className="text-xs font-medium mb-4" style={{ color: 'rgba(107,114,128,0.7)' }}>
          <i className="ri-user-line mr-1" />
          {isEn ? service.targetEn : service.targetFr}
        </p>

        {/* CTA */}
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

export const SpecializedServices = memo(function SpecializedServices() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== HEADER OFFRES PRINCIPALES ===== */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}
          >
            <i className="ri-vip-crown-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
              {isEn ? 'Premium Advisory' : 'Conseil Premium'}
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {isEn ? '4 advisory lines for investors \& projects' : '4 lignes de conseil pour investisseurs \& projets'}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
            {isEn
              ? 'We do not do everything. We excel in 4 precise offers: feasibility studies, due diligence, project structuring, and investment readiness. Each delivers bankable deliverables ready for credit committees.'
              : 'Nous ne faisons pas tout. Nous excellons sur 4 offres précises : études de faisabilité, due diligence, structuration de projets et investment readiness. Chacune livre des livrables bankables, prêts pour les comités de crédit.'}
          </p>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#86BC25' }} />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
          </div>
        </div>

        {/* ===== GRILLE 4 OFFRES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {MAIN_OFFERS.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} isEn={isEn} navigate={navigate} />
          ))}
        </div>

        {/* ===== DIFFÉRENCIATEURS ===== */}
        <ScrollReveal>
          <div className="rounded-3xl p-8 lg:p-12 mb-20 gradient-border glow-gold-hover" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)' }}>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#6B9B1F' }}>
                {isEn ? 'Why choose Khepra' : 'Pourquoi choisir Khepra'}
              </p>
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900">
                {isEn ? SLOGANS.primaryEn : SLOGANS.primaryFr}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENTIATORS.map((d, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="text-center">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl mx-auto mb-4" style={{ background: 'rgba(212,168,42,0.08)', border: '1px solid rgba(212,168,42,0.18)' }}>
                      <i className={`${d.icon} text-2xl`} style={{ color: '#86BC25' }} />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">
                      {isEn ? d.titleEn : d.titleFr}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {isEn ? d.descEn : d.descFr}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ===== SERVICES D'APPEL (LEAD GENERATION) ===== */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.20)' }}
            >
              <i className="ri-door-open-line text-xs" style={{ color: '#86BC25' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
                {isEn ? 'Free \& Low-Friction Entry Points' : 'Services d\'entrée gratuits \& abordables'}
              </span>
            </div>
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {isEn ? 'Start with a quick diagnostic' : 'Commencez par un diagnostic rapide'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              {isEn
                ? '7 express services. Understandable in 10 seconds. Free or low-cost. Each converts into a full mission when you are ready.'
                : '7 services express. Compréhensibles en 10 secondes. Gratuits ou sur devis. Chacun convertit vers une mission complète quand vous êtes prêt.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEAD_SERVICES.map((service, index) => (
              <LeadServiceCard key={service.id} service={service} index={index} isEn={isEn} navigate={navigate} />
            ))}
          </div>

          {/* CTA conversion */}
          <ScrollReveal delay={100}>
            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/tools')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #6B9B1F, #86BC25)',
                  color: '#ffffff',
                  boxShadow: '0 4px 24px rgba(34,160,90,0.35)',
                }}
              >
                {isEn ? 'See all 20 diagnostic tools' : 'Voir les 20 outils de diagnostic'}
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== TRUST BAR ===== */}
        <ScrollReveal>
          <div
            className="rounded-3xl p-8 lg:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#86BC25' }}>
              {isEn ? 'The numbers that matter' : 'Les chiffres qui comptent'}
            </p>
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-2">
              {isEn ? SLOGANS.trustEn : SLOGANS.trustFr}
            </h3>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
              {isEn
                ? 'Each interaction generates value. You only pay when you move forward concretely.'
                : 'Chaque interaction avec Khepra génère de la valeur. Vous ne payez que quand vous avancez concrètement.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/tools/diagnostic-organisationnel')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                  color: '#0a1f33',
                  boxShadow: '0 4px 20px rgba(212,168,42,0.45)',
                }}
              >
                <i className="ri-stethoscope-line" />
                {isEn ? 'Free strategic diagnosis' : 'Diagnostic stratégique gratuit'}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  border: '1.5px solid rgba(212,168,42,0.4)',
                  color: '#86BC25',
                  background: 'transparent',
                }}
              >
                <i className="ri-calendar-check-line" />
                {isEn ? 'Book a consultation' : 'Prendre rendez-vous'}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});



