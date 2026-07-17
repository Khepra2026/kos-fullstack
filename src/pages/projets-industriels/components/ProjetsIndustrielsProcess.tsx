import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

const STEPS_FR = [
  {
    number: '01',
    title: 'Premier contact & cartographie',
    desc: 'Appel de 30 min pour comprendre votre projet, vos contraintes et vos objectifs de financement.',
    icon: 'ri-map-pin-2-line',
    color: '#86BC25',
  },
  {
    number: '02',
    title: 'Viability scan express',
    desc: 'Analyse technique, marché et financière sommaire en 5-7 jours. Go / no-go avec feuille de route.',
    icon: 'ri-stethoscope-line',
    color: '#86BC25',
  },
  {
    number: '03',
    title: 'Étude de faisabilité',
    desc: 'Étude intégrée (technique, marché, finance, ESG) conforme standards BAD/IFC. 4-6 semaines.',
    icon: 'ri-file-chart-line',
    color: '#86BC25',
  },
  {
    number: '04',
    title: 'Structuration complète',
    desc: 'Montage juridique, modélisation multi-scénarios, stratégie ESG, dossier investisseur.',
    icon: 'ri-building-2-line',
    color: '#86BC25',
  },
  {
    number: '05',
    title: 'Roadshow & closing',
    desc: 'Accompagnement au roadshow investisseurs, négociation et closing. Suivi post-financement.',
    icon: 'ri-check-double-line',
    color: '#86BC25',
  },
];

const STEPS_EN = [
  {
    number: '01',
    title: 'First contact & mapping',
    desc: '30-min call to understand your project, constraints and financing objectives.',
    icon: 'ri-map-pin-2-line',
    color: '#86BC25',
  },
  {
    number: '02',
    title: 'Express viability scan',
    desc: 'Summary technical, market and financial analysis in 5-7 days. Go / no-go with roadmap.',
    icon: 'ri-stethoscope-line',
    color: '#86BC25',
  },
  {
    number: '03',
    title: 'Feasibility study',
    desc: 'Integrated study (technical, market, finance, ESG) compliant with AfDB/IFC standards. 4-6 weeks.',
    icon: 'ri-file-chart-line',
    color: '#86BC25',
  },
  {
    number: '04',
    title: 'Full structuring',
    desc: 'Legal framework, multi-scenario modeling, ESG strategy, investor package.',
    icon: 'ri-building-2-line',
    color: '#86BC25',
  },
  {
    number: '05',
    title: 'Roadshow & closing',
    desc: 'Investor roadshow support, negotiation and closing. Post-financing follow-up.',
    icon: 'ri-check-double-line',
    color: '#86BC25',
  },
];

export const ProjetsIndustrielsProcess = memo(function ProjetsIndustrielsProcess() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const steps = isEn ? STEPS_EN : STEPS_FR;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,168,42,0.10)', border: '1px solid rgba(212,168,42,0.25)' }}
          >
            <i className="ri-route-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
              {isEn ? 'How we work' : 'Notre méthode'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'From concept to financing' : 'Du concept au financement'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {isEn
              ? 'A structured methodology that transforms your project idea into a bankable dossier ready for investors and banks.'
              : 'Une méthodologie structurée qui transforme votre idée de projet en dossier bankable prêt pour les investisseurs et les banques.'}
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-16 left-0 right-0 hidden lg:block">
            <div className="h-0.5 mx-20" style={{ background: 'linear-gradient(90deg, #86BC25, #86BC25, #86BC25, #86BC25, #86BC25)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative text-center">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5 relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
                      border: `2px solid ${step.color}40`,
                      boxShadow: `0 4px 20px ${step.color}20`,
                    }}
                  >
                    <span className="font-playfair text-xl font-bold" style={{ color: step.color }}>
                      {step.number}
                    </span>
                  </div>
                  <h4 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});