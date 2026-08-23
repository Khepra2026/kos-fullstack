import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ScrollReveal from '@/components/feature/ScrollReveal';

const STEPS_FR = [
  {
    number: '01',
    title: 'Premier contact confidentiel',
    desc: 'Appel de 20 min sous NDA. Vous présentez le deal, nous évaluons la compatibilité et la faisabilité.',
    icon: 'ri-shield-check-line',
    color: '#86BC25',
  },
  {
    number: '02',
    title: 'Diagnostic express',
    desc: 'Pré-évaluation technique, financière et réglementaire en 3-5 jours. Go / no-go avec recommandations.',
    icon: 'ri-stethoscope-line',
    color: '#86BC25',
  },
  {
    number: '03',
    title: 'Proposition sur mesure',
    desc: 'Devis détaillé, équipe dédiée, calendrier, livrables précis. Aucun engagement avant validation.',
    icon: 'ri-file-list-3-line',
    color: '#86BC25',
  },
  {
    number: '04',
    title: 'Exécution & livraison',
    desc: 'Mission en mode boutique : équipe senior, reporting hebdo, livrables bankables prêts pour le comité.',
    icon: 'ri-rocket-line',
    color: '#86BC25',
  },
  {
    number: '05',
    title: 'Closing & suivi',
    desc: 'Accompagnement jusqu\'au closing. Post-mission : revue des résultats et recommandations de suivi.',
    icon: 'ri-check-double-line',
    color: '#86BC25',
  },
];

const STEPS_EN = [
  {
    number: '01',
    title: 'Confidential first contact',
    desc: '20-min call under NDA. You present the deal, we assess compatibility and feasibility.',
    icon: 'ri-shield-check-line',
    color: '#86BC25',
  },
  {
    number: '02',
    title: 'Express diagnostic',
    desc: 'Pre-evaluation technical, financial and regulatory in 3-5 days. Go / no-go with recommendations.',
    icon: 'ri-stethoscope-line',
    color: '#86BC25',
  },
  {
    number: '03',
    title: 'Tailored proposal',
    desc: 'Detailed quote, dedicated team, timeline, precise deliverables. No commitment before validation.',
    icon: 'ri-file-list-3-line',
    color: '#86BC25',
  },
  {
    number: '04',
    title: 'Execution & delivery',
    desc: 'Boutique-style mission: senior team, weekly reporting, bankable deliverables ready for committee.',
    icon: 'ri-rocket-line',
    color: '#86BC25',
  },
  {
    number: '05',
    title: 'Closing & follow-up',
    desc: 'Support through closing. Post-mission: results review and follow-up recommendations.',
    icon: 'ri-check-double-line',
    color: '#86BC25',
  },
];

export const InvestisseursProcess = memo(function InvestisseursProcess() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const steps = isEn ? STEPS_EN : STEPS_FR;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(201,162,39,0.10)', border: '1px solid rgba(201,162,39,0.25)' }}
          >
            <i className="ri-route-line text-xs" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6B9B1F' }}>
              {isEn ? 'How we work' : 'Notre méthode'}
            </span>
          </div>
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {isEn ? 'From first contact to closing' : 'Du premier contact au closing'}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {isEn
              ? 'A boutique process: senior team, total confidentiality, bankable deliverables.'
              : 'Un process boutique : équipe senior, confidentialité totale, livrables bankables.'}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-0 right-0 hidden lg:block">
            <div className="h-0.5 mx-20" style={{ background: 'linear-gradient(90deg, #86BC25, #86BC25, #86BC25)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative text-center">
                  {/* Number circle */}
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

                  {/* Content */}
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



