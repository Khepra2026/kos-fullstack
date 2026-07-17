import { useState } from 'react';

interface Phase {
  num: string;
  name: string;
  title: string;
  duration: string;
  deliverables: string[];
  kpi: string;
  icon: string;
}

const phases: Phase[] = [
  {
    num: '01',
    name: 'DISCOVERY',
    title: 'Diagnostic Stratégique 360°',
    duration: '2-4 semaines',
    deliverables: [
      'Cartographie des risques financiers, opérationnels et réglementaires',
      'Analyse du BFR, du cash conversion cycle et du mismatch ALM',
      'Matrice de conformité BCEAO / OHADA / COBAC',
      'Rapport de vulnérabilité avec prioritisation des leviers d\'action',
    ],
    kpi: '100% des zones de risque identifiées et chiffrées',
    icon: 'ri-radar-line',
  },
  {
    num: '02',
    name: 'DESIGN',
    title: 'Conception de la Solution Sur-Mesure',
    duration: '3-5 semaines',
    deliverables: [
      'Plan d\'action structuré avec jalons, responsables et budgets',
      'Modèle financier prévisionnel 3-5 ans (scénarios base, optimiste, pessimiste)',
      'Architecture de gouvernance : organigramme, comités, règlements intérieurs',
      'Politiques et procédures standardisées conformes référentiels réglementaires',
    ],
    kpi: 'Plan d\'action approuvé par le CA ou la Direction dans les 48h',
    icon: 'ri-pencil-ruler-2-line',
  },
  {
    num: '03',
    name: 'DEPLOY',
    title: 'Déploiement Opérationnel sur le Terrain',
    duration: '3-12 mois',
    deliverables: [
      'Mise en œuvre des procédures avec accompagnement terrain des équipes',
      'Déploiement des outils de pilotage : tableaux de bord, reporting automatisé',
      'Formation des équipes dirigeantes et opérationnelles (40-120h selon niveau)',
      'Premiers comités de pilotage avec revue des KPIs et ajustements',
    ],
    kpi: '80% des processus déployés et opérationnels dans les 90 jours',
    icon: 'ri-rocket-line',
  },
  {
    num: '04',
    name: 'DRIVE',
    title: 'Pilotage et Optimisation Continue',
    duration: '6-18 mois',
    deliverables: [
      'Comités de pilotage mensuels avec revue des indicateurs de performance',
      'Rapports trimestriels d\'impact financier et organisationnel',
      'Ajustements stratégiques basés sur les données réelles de performance',
      'Audit de conformité intermédiaire pour garantir la pérennité',
    ],
    kpi: 'Amélioration mesurable des KPIs de 25 à 40% sur la période',
    icon: 'ri-line-chart-line',
  },
  {
    num: '05',
    name: 'DELIVER',
    title: 'Livrables et Transfert de Capacités',
    duration: '2-4 semaines',
    deliverables: [
      'Rapport final d\'impact financier : ROI, VAN, économies réalisées',
      'Dossier de conformité complet pour les auditeurs et régulateurs',
      'Manuel opérationnel et kit de formation pour les équipes internes',
      'Recommandations de croissance et roadmap d\'optimisation post-mission',
    ],
    kpi: '100% des livrables validés et équipes autonomes à 90%',
    icon: 'ri-trophy-line',
  },
];

export default function OffreMethodology() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-white" id="offre-methodology">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(10,22,40,0.06)', border: '1px solid rgba(10,22,40,0.15)' }}>
            <i className="ri-award-line text-sm" style={{ color: '#86BC25' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#86BC25' }}>Méthodologie Propriétaire</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0a1628' }}>
            La méthode{' '}
            <span style={{ background: 'linear-gradient(135deg, #86BC25, #6B9B1F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KHEPRA FRAMEWORK
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Inspirée des standards des Big Four (Deloitte, PwC, EY, KPMG) et adaptée aux réalités des marchés africains. Une approche en 5 phases garantissant des résultats mesurables et durables.
          </p>
        </div>

        {/* 5D Pillars */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-12">
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative text-center py-5 px-2 rounded-xl transition-all duration-300 cursor-pointer border ${
                active === i
                  ? 'border-transparent'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              style={{
                background: active === i ? 'linear-gradient(135deg, #0a1628, #1a2d4a)' : '#ffffff',
              }}
            >
              <div className="text-xs font-black mb-1 tracking-wider" style={{ color: active === i ? '#86BC25' : '#86BC25' }}>
                {p.num}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: active === i ? '#ffffff' : '#0a1628' }}>
                {p.name}
              </div>
              {active === i && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ background: '#0a1628' }} />
              )}
            </button>
          ))}
        </div>

        {/* Active phase detail */}
        <div className="rounded-2xl p-8 lg:p-10 gradient-border glow-gold-hover transition-all duration-300" style={{ background: 'linear-gradient(135deg, #f8f6f0 0%, #ffffff 100%)' }}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Title + duration */}
            <div className="lg:col-span-1">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-5" style={{ background: 'rgba(212,168,42,0.1)', border: '1px solid rgba(212,168,42,0.2)' }}>
                <i className={`${phases[active].icon} text-2xl`} style={{ color: '#86BC25' }} />
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: '#0a1628' }}>
                {phases[active].title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-time-line text-sm" style={{ color: '#86BC25' }} />
                <span className="text-sm font-semibold text-gray-500">{phases[active].duration}</span>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(212,168,42,0.06)', border: '1px solid rgba(212,168,42,0.15)' }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#86BC25' }}>Engagement de résultat</div>
                <p className="text-sm font-semibold" style={{ color: '#0a1628' }}>{phases[active].kpi}</p>
              </div>
            </div>

            {/* Right: Deliverables */}
            <div className="lg:col-span-2">
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#86BC25' }}>
                Livrables standards
              </div>
              <div className="space-y-3">
                {phases[active].deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,168,42,0.12)', border: '1px solid rgba(212,168,42,0.25)' }}>
                      <i className="ri-check-line text-xs" style={{ color: '#86BC25' }} />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: engagement */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Durée moyenne mission', value: '4-12 mois' },
            { label: 'Livrables par mission', value: '15-25 documents' },
            { label: 'Taux de conformité', value: '100% post-mission' },
            { label: 'Équipes formées', value: '40-120h' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl gradient-border glow-gold-hover transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(10,22,40,0.03)' }}>
              <div className="font-playfair text-xl font-bold mb-1" style={{ color: '#86BC25' }}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}