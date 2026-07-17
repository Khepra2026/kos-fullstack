import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

const TESTIMONIALS_FR = [
  {
    quote: 'Khepra a structuré notre projet agro-industriel de 12M€ du concept au financement. Le dossier a été accepté par 3 banques sur 4 sollicitées. Un accompagnement de bout en bout.',
    author: 'Directeur Général',
    company: 'Promoteur agro-business — Côte d\'Ivoire',
    metric: '12M€',
    metricLabel: 'de financement sécurisé',
  },
  {
    quote: 'L\'étude de faisabilité intégrée pour notre unité de transformation au Bénin a couvert technique, marché, finance et ESG. Un livrable conforme aux standards IFC, prêt pour les investisseurs.',
    author: 'DG & Fondateur',
    company: 'Entreprise agro-alimentaire — Bénin',
    metric: 'IFC',
    metricLabel: 'conformité standards internationaux',
  },
  {
    quote: 'Le Project Viability Scan en 5 jours nous a permis de valider notre concept industriel avant d\'investir 2M€. Le go/no-go était clair, les recommandations actionnables.',
    author: 'Directeur des Opérations',
    company: 'PME industrielle — Sénégal',
    metric: '2M€',
    metricLabel: 'd\'investissement validé',
  },
];

const TESTIMONIALS_EN = [
  {
    quote: 'Khepra structured our €12M agro-industrial project from concept to financing. The dossier was accepted by 3 out of 4 banks approached. End-to-end support.',
    author: 'Managing Director',
    company: 'Agribusiness promoter — Ivory Coast',
    metric: '€12M',
    metricLabel: 'in secured financing',
  },
  {
    quote: 'The integrated feasibility study for our processing unit in Benin covered technical, market, finance and ESG. A deliverable compliant with IFC standards, ready for investors.',
    author: 'CEO & Founder',
    company: 'Agri-food company — Benin',
    metric: 'IFC',
    metricLabel: 'international standards compliance',
  },
  {
    quote: 'The Project Viability Scan in 5 days allowed us to validate our industrial concept before investing €2M. The go/no-go was clear, recommendations actionable.',
    author: 'Director of Operations',
    company: 'Industrial SME — Senegal',
    metric: '€2M',
    metricLabel: 'validated investment',
  },
];

export const ProjetsIndustrielsTestimonials = memo(function ProjetsIndustrielsTestimonials() {
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
              {isEn ? 'Project Developer Testimonials' : 'Témoignages promoteurs'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'Projects that went from idea to financing' : 'Des projets qui sont passés de l\'idée au financement'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div
                className="rounded-2xl border p-8 h-full flex flex-col"
                style={{ background: 'linear-gradient(180deg, #ffffff, #fafaf9)', borderColor: 'rgba(212,168,42,0.15)' }}
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
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,168,42,0.12)' }}>
                    <i className="ri-user-line text-sm" style={{ color: '#6B9B1F' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.company}</p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'rgba(34,160,90,0.06)', border: '1px solid rgba(34,160,90,0.12)' }}
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