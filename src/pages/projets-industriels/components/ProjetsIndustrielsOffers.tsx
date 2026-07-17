import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { MAIN_OFFERS } from '@/mocks/specializedOffers';

const PROJECT_OFFER_IDS = ['project-structuring', 'feasibility-studies'];

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
        className="group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)',
          borderColor: isGold ? 'rgba(212,168,42,0.25)' : 'rgba(34,160,90,0.25)',
        }}
        onClick={() => navigate(offer.slug)}
      >
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, ${isGold ? '#f4d03f' : '#34d399'})` }} />
        <div className="p-8 lg:p-10">
          <div className="flex items-center justify-between mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}
            >
              <i className={`${offer.icon} text-sm`} />
              {isEn ? 'For Project Developers' : 'Pour promoteurs'}
            </span>
            <span
              className="font-playfair text-5xl font-bold leading-none select-none"
              style={{ color: 'transparent', WebkitTextStroke: `1px ${accent}20` }}
            >
              0{index + 1}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>
            {isEn ? offer.taglineEn : offer.taglineFr}
          </p>
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2" title={isEn ? offer.nameEn : offer.nameFr}>
            {isEn ? offer.nameEn : offer.nameFr}
          </h3>
          <p className="text-xs font-medium mb-5" style={{ color: 'rgba(107,114,128,0.8)' }}>
            {isEn ? offer.targetEn : offer.targetFr}
          </p>

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
            {isEn ? 'Request a quote' : 'Demander un devis'}
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
});

export const ProjetsIndustrielsOffers = memo(function ProjetsIndustrielsOffers() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const offers = MAIN_OFFERS.filter((o) => PROJECT_OFFER_IDS.includes(o.id));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {isEn ? '2 services for project developers' : '2 services pour promoteurs'}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed">
            {isEn
              ? 'From feasibility study to project structuring, we cover the entire value chain to make your project bankable and investment-ready.'
              : 'De l\'étude de faisabilité à la structuration de projet, nous couvrons toute la chaîne de valeur pour rendre votre projet bankable et prêt à l\'investissement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} isEn={isEn} navigate={navigate} />
          ))}
        </div>

        <ScrollReveal>
          <div className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 60%, #0d0d0d 100%)' }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#86BC25' }}>
              {isEn ? 'Need both services?' : 'Besoin des deux services ?'}
            </p>
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-3">
              {isEn
                ? 'Package Feasibility + Structuring'
                : 'Package Étude + Structuration'}
            </h3>
            <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
              {isEn
                ? 'Combine both services for a turnkey solution. From project idea to investor-ready dossier. Preferential pricing on quote.'
                : 'Combinez les deux services pour une solution clé-en-main. De l\'idée de projet au dossier investisseur. Tarification préférentielle sur devis.'}
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
        </ScrollReveal>
      </div>
    </section>
  );
});