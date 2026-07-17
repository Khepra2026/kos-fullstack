import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

const TESTIMONIALS_FR = [
  {
    quote: 'Khepra a réalisé la due diligence de notre cible en Côte d\'Ivoire en 4 semaines. Le rapport a identifié 3 red flags critiques que nous avons négociés. Économie estimée : 2,3M€.',
    author: 'Directeur des Investissements',
    company: 'Fonds PE — France',
    metric: '2,3M€',
    metricLabel: 'économisés en négociation',
  },
  {
    quote: 'L\'investment readiness de Khepra nous a permis de lever 8M€ en 4 mois. Le data room, le pitch deck et le financial model ont impressionné tous les fonds contactés.',
    author: 'DG & Co-fondateur',
    company: 'Startup fintech — Sénégal',
    metric: '8M€',
    metricLabel: 'levés en 4 mois',
  },
  {
    quote: 'L\'étude de faisabilité intégrée pour notre projet agro-industriel au Togo a été acceptée par le comité de crédit de la BOAD du premier jet. Un travail de niveau international.',
    author: 'Directeur Général',
    company: 'Promoteur agro-business — Togo',
    metric: '100%',
    metricLabel: 'acceptation comité crédit',
  },
];

const TESTIMONIALS_EN = [
  {
    quote: 'Khepra conducted due diligence on our target in Ivory Coast in 4 weeks. The report identified 3 critical red flags that we negotiated. Estimated savings: €2.3M.',
    author: 'Investment Director',
    company: 'PE Fund — France',
    metric: '€2.3M',
    metricLabel: 'saved in negotiation',
  },
  {
    quote: 'Khepra\'s investment readiness enabled us to raise €8M in 4 months. The data room, pitch deck and financial model impressed every fund we contacted.',
    author: 'CEO & Co-founder',
    company: 'Fintech startup — Senegal',
    metric: '€8M',
    metricLabel: 'raised in 4 months',
  },
  {
    quote: 'The integrated feasibility study for our agro-industrial project in Togo was accepted by the BOAD credit committee on the first submission. International-level work.',
    author: 'Managing Director',
    company: 'Agribusiness promoter — Togo',
    metric: '100%',
    metricLabel: 'credit committee approval',
  },
];

export const InvestisseursTestimonials = memo(function InvestisseursTestimonials() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const testimonials = isEn ? TESTIMONIALS_EN : TESTIMONIALS_FR;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(34,160,90,0.08)', border: '1px solid rgba(34,160,90,0.20)' }}
          >
            <i className="ri-chat-quote-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#86BC25' }}>
              {isEn ? 'Investor Testimonials' : 'Témoignages investisseurs'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'Results that speak for themselves' : 'Des résultats qui parlent d\'eux-mêmes'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div
                className="rounded-2xl border p-8 h-full flex flex-col"
                style={{ background: 'linear-gradient(180deg, #ffffff, #fafaf9)', borderColor: 'rgba(201,162,39,0.15)' }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <i key={si} className="ri-star-fill text-sm" style={{ color: '#86BC25' }} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-6 flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,162,39,0.12)' }}>
                    <i className="ri-user-line text-sm" style={{ color: '#6B9B1F' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.company}</p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.12)' }}
                >
                  <span className="font-playfair text-xl font-bold" style={{ color: '#86BC25' }}>
                    {t.metric}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{t.metricLabel}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});