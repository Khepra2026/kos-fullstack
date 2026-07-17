import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { MAIN_OFFERS, DIFFERENTIATORS, SLOGANS } from '@/mocks/specializedOffers';

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

const DifferentiatorsBar = memo(function DifferentiatorsBar({
  isEn,
}: {
  isEn: boolean;
}) {
  return (
    <ScrollReveal>
      <div className="rounded-3xl p-8 lg:p-12 mt-20 gradient-border glow-gold-hover" style={{ background: 'linear-gradient(135deg, #f8f5ee 0%, #fdf9f0 100%)' }}>
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
  );
});

export const HomeMainOffers = memo(function HomeMainOffers() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section id="main-offers" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
            {isEn ? '4 Business Units for African leaders' : '4 Business Units pour dirigeants africains'}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
            {isEn
              ? 'We excel in 4 reconfigured, high-value Business Units: Financial Regulation & Compliance (BCEAO/COBAC Shield), Governance & Due Diligence (Board Observatory), Climate, Transition & ESG (Decarbonation Engineering), and KBR-Model & Business Intelligence (IP Monetization). Each delivers bankable, defendable deliverables. No public pricing — everything is on quote.'
              : 'Nous excellons sur 4 Business Units reconfigurées à forte valeur ajoutée : Régulation Financière & Conformité (Bouclier BCEAO/COBAC), Gouvernance & Due Diligence (Observatoire des Boards), Climat, Transition & ESG (Ingénierie de Décarbonation), et KBR-Model & Intelligence d\'Affaires (Monétisation de la PI). Chacune livre des livrables bankables et défendables. Aucun prix public — tout est sur devis.'}
          </p>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #86BC25)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#86BC25' }} />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #86BC25, transparent)' }} />
          </div>
        </div>

        {/* Grid 4 Business Units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MAIN_OFFERS.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} isEn={isEn} navigate={navigate} />
          ))}
        </div>

        {/* Differentiators */}
        <DifferentiatorsBar isEn={isEn} />

        {/* Bottom CTA */}
        <ScrollReveal delay={150}>
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #86BC25, #f4d03f)',
                color: '#0a1f33',
                boxShadow: '0 4px 24px rgba(212,168,42,0.45)',
              }}
            >
              <i className="ri-calendar-check-line" />
              {isEn ? 'Book a strategic consultation' : 'Prendre rendez-vous stratégique'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});