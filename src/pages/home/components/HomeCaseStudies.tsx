import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const ANONYMIZED_CASES = [
  {
    id: 'cs1',
    sector: 'Banque régionale',
    country: 'Côte d\'Ivoire',
    problem: 'Gouvernance obsolète, 23 écarts de conformité critiques BCEAO, risque de sanctions de 500M FCFA.',
    action: 'Restructuration du Conseil d\'Administration, création de 3 comités spécialisés, formation de 40h pour les administrateurs, reporting trimestriel au régulateur.',
    result: 'Conformité BCEAO certifiée en 6 mois. Ratio de solvabilité +18%. 2 nouveaux investisseurs institutionnels.',
    metric: '6 mois',
    metricLabel: 'certification BCEAO',
    color: '#86BC25',
    icon: 'ri-bank-line',
  },
  {
    id: 'cs2',
    sector: 'Groupe agroalimentaire',
    country: 'Cameroun',
    problem: 'Structure financière fragile, gouvernance informelle, impossibilité de lever des fonds institutionnels.',
    action: 'Diagnostic financier, restructuration du bilan (600M FCFA apurés), CA indépendant (5 membres), business plan investisseur sur 5 ans, 12 roadshows.',
    result: '2,5 Mds FCFA levés auprès de 3 investisseurs. +60% de croissance CA en 18 mois. Valorisation x3,2.',
    metric: '2,5 Mds FCFA',
    metricLabel: 'levés',
    color: '#c9a227',
    icon: 'ri-plant-line',
  },
  {
    id: 'cs3',
    sector: 'SFD majeur',
    country: 'Togo',
    problem: 'Absence de plan préventif de redressement, non-conformité Circulaire N°001-2020/CB/C article 44.',
    action: 'Diagnostic financier, 3 scénarios de stress modélisés, 5 axes de redressement, gouvernance du plan avec tableau de bord, présentation à la Commission Bancaire UMOA.',
    result: 'Plan validé par la CB-UMOA dans les délais. Conformité totale article 44. Dispositif de pilotage stratégique opérationnel.',
    metric: '100%',
    metricLabel: 'conformité CB-UMOA',
    color: '#86BC25',
    icon: 'ri-hand-coin-line',
  },
];

export default function HomeCaseStudies() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section id="preuves" className="py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fefefe 0%, #fafaf6 50%, #fefefe 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <BigFourSubtitleBar
                label={isEn ? 'Proven results' : 'Résultats prouvés'}
                variant="left-accent"
                icon="ri-briefcase-line"
                accentColor="primary"
              />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {isEn ? (
                <>3 missions, <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>90 days, measurable results</span></>
              ) : (
                <>3 missions, <span style={{ background: 'linear-gradient(90deg, #86BC25, #e8c04a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>90 jours, résultats mesurables</span></>
              )}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed text-justify">
              {isEn
                ? 'Real client cases, anonymized to respect confidentiality. Each follows the same method: Problem → 90-day Action → Quantified Result.'
                : 'Vrais cas clients, anonymisés pour respecter la confidentialité. Chacun suit la même méthode : Problème → Action 90j → Résultat chiffré.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANONYMIZED_CASES.map((cs, index) => (
            <ScrollReveal key={cs.id} delay={index * 120}>
              <div
                className="group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafaf9 100%)', border: `1px solid ${cs.color}20` }}
                onClick={() => navigate('/case-studies')}
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cs.color}, ${cs.color}88)` }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Sector + country */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: `${cs.color}12`, border: `1px solid ${cs.color}22` }}>
                        <i className={`${cs.icon} text-sm`} style={{ color: cs.color }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{cs.sector}</span>
                    </div>
                    <span className="text-xs text-gray-400">{cs.country}</span>
                  </div>

                  {/* Problem */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: 'rgba(239,68,68,0.12)' }}>
                        <i className="ri-error-warning-line text-xs" style={{ color: '#ef4444' }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ef4444' }}>
                        {isEn ? 'Problem' : 'Problème'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">{cs.problem}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center my-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: `${cs.color}12`, border: `1px solid ${cs.color}22` }}>
                      <i className="ri-arrow-down-line text-sm" style={{ color: cs.color }} />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: `${cs.color}15` }}>
                        <i className="ri-arrow-right-line text-xs" style={{ color: cs.color }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cs.color }}>
                        {isEn ? '90-day action' : 'Action 90j'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">{cs.action}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center my-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: 'rgba(34,160,90,0.12)', border: '1px solid rgba(34,160,90,0.22)' }}>
                      <i className="ri-arrow-down-line text-sm" style={{ color: '#22a05a' }} />
                    </div>
                  </div>

                  {/* Result */}
                  <div className="mb-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: 'rgba(34,160,90,0.12)' }}>
                        <i className="ri-checkbox-circle-line text-xs" style={{ color: '#22a05a' }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#22a05a' }}>
                        {isEn ? 'Result' : 'Résultat'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed text-justify font-medium">{cs.result}</p>
                  </div>

                  {/* Metric highlight */}
                  <div
                    className="rounded-2xl p-4 mb-4 flex items-center gap-4"
                    style={{ background: `linear-gradient(135deg, ${cs.color}08, ${cs.color}04)`, border: `1px solid ${cs.color}15` }}
                  >
                    <div className="font-playfair text-3xl font-bold" style={{ color: cs.color }}>
                      {cs.metric}
                    </div>
                    <p className="text-xs font-medium leading-snug" style={{ color: 'rgba(107,114,128,0.9)' }}>
                      {cs.metricLabel}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-xs font-bold" style={{ color: cs.color }}>
                    <span>{isEn ? 'Read the full case study' : 'Lire l\'étude de cas complète'}</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={150}>
          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #86BC25, #f4d03f)', color: '#050c18', boxShadow: '0 6px 24px rgba(212,168,42,0.35)' }}
            >
              <i className="ri-briefcase-line" />
              {isEn ? 'All case studies' : 'Toutes les études de cas'}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer whitespace-nowrap transition-all hover:opacity-80"
              style={{ border: '1.5px solid rgba(212,168,42,0.35)', color: '#6B9B1F', background: 'transparent' }}
            >
              <i className="ri-customer-service-2-line" />
              {isEn ? 'Talk to an expert' : 'Parler à un expert'}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}