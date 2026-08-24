/* ============================================================
   KOS — Home Observatoire & Agréments Cross-Link Section
   Section dédiée à la cross-promotion des 3 nouvelles pages
   ============================================================ */

import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import ComplianceScorePreloader from '@/components/feature/ComplianceScorePreloader';

const CARDS = [
  {
    id: 'observatoire',
    titleFr: 'Observatoire Réglementaire Africain',
    titleEn: 'African Regulatory Observatory',
    descFr: '8 régulateurs couverts — BCEAO, COBAC, CIMA, COSUMAF, AMF-UEMOA, GAFI/GIABA/GABAC, Banques Centrales, Autorités FinTech. 1 247 textes suivis, alertes en temps réel, baromètres UEMOA/CEMAC.',
    descEn: '8 regulators covered — BCEAO, COBAC, CIMA, COSUMAF, AMF-UEMOA, GAFI/GIABA/GABAC, Central Banks, FinTech Authorities. 1,247 tracked texts, real-time alerts, UEMOA/CEMAC barometers.',
    href: '/observatoire-reglementaire-africain/',
    icon: 'ri-radar-line',
    accent: '#2E8B57',
    bgLight: 'rgba(46,139,87,0.06)',
    borderLight: 'rgba(46,139,87,0.15)',
    stats: [
      { value: '8', labelFr: 'Régulateurs', labelEn: 'Regulators' },
      { value: '1 247', labelFr: 'Textes suivis', labelEn: 'Tracked texts' },
      { value: '8', labelFr: 'Alertes actives', labelEn: 'Active alerts' },
    ],
    ctaFr: 'Explorer l\'Observatoire',
    ctaEn: 'Explore the Observatory',
  },
  {
    id: 'agrements',
    titleFr: 'Hub Agréments Afrique',
    titleEn: 'Africa Licensing Hub',
    descFr: '6 types d\'agrément — Banques, EMF/SFD, FinTech & Paiement, PSP, Assurance CIMA, Marchés Financiers. Guides complets, checklists, simulateurs, 5 étapes détaillées, cas d\'études.',
    descEn: '6 licensing types — Banks, EMF/SFD, FinTech & Payment, PSP, CIMA Insurance, Financial Markets. Complete guides, checklists, simulators, 5 detailed steps, case studies.',
    href: '/agrements-afrique/',
    icon: 'ri-shield-check-line',
    accent: '#D4AF37',
    bgLight: 'rgba(212,175,55,0.06)',
    borderLight: 'rgba(212,175,55,0.15)',
    stats: [
      { value: '6', labelFr: 'Types d\'agrément', labelEn: 'Licensing types' },
      { value: '5', labelFr: 'Étapes détaillées', labelEn: 'Detailed steps' },
      { value: '3', labelFr: 'Cas d\'études', labelEn: 'Case studies' },
    ],
    ctaFr: 'Découvrir le Hub',
    ctaEn: 'Discover the Hub',
  },
  {
    id: 'compliance-factory',
    titleFr: 'Digital Compliance Factory™',
    titleEn: 'Digital Compliance Factory™',
    descFr: 'Bibliothèque documentaire propriétaire — 78 documents, 6 catégories. Politiques, procédures, cartographies des risques, matrices de contrôle, plans d\'audit, rapports réglementaires.',
    descEn: 'Proprietary document library — 78 documents, 6 categories. Policies, procedures, risk maps, control matrices, audit plans, regulatory reports.',
    href: '/digital-compliance-factory/',
    icon: 'ri-file-list-3-line',
    accent: '#6B9B1F',
    bgLight: 'rgba(107,155,31,0.06)',
    borderLight: 'rgba(107,155,31,0.15)',
    stats: [
      { value: '78', labelFr: 'Documents', labelEn: 'Documents' },
      { value: '6', labelFr: 'Catégories', labelEn: 'Categories' },
      { value: '34', labelFr: 'Rapports types', labelEn: 'Report templates' },
    ],
    ctaFr: 'Accéder à la Bibliothèque',
    ctaEn: 'Access the Library',
  },
];

export default function HomeObservatoireAgrements() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-background-50 border-t border-background-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <div className="flex justify-center mb-4">
              <BigFourSubtitleBar
                label="KOS — Intelligence Expansion Engine™"
                variant="left-accent"
                icon="ri-radar-line"
                accentColor="primary"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-3">
              Nouveaux hubs stratégiques
            </h2>
            <p className="text-sm md:text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Trois dispositifs d'intelligence réglementaire et de conformité, déployés pour transformer KHEPRA EXPERTS en plateforme panafricaine de référence.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CARDS.map((card, idx) => (
            <ScrollReveal key={card.id} delay={idx * 100}>
              <div
                className="group relative rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col h-full"
                style={{
                  background: card.bgLight,
                  borderColor: card.borderLight,
                }}
                onClick={() => navigate(card.href)}
              >
                {/* Badge NEW */}
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-500 text-background-50 text-[10px] font-bold uppercase tracking-wider">
                  <i className="ri-sparkling-line text-[10px]" />
                  NEW
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mb-5 flex-shrink-0"
                  style={{ background: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
                >
                  <i className={`${card.icon} text-xl`} style={{ color: card.accent }} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground-950 mb-2 leading-snug">
                  {card.titleFr}
                </h3>

                {/* Description */}
                <p className="text-xs text-foreground-600 leading-relaxed mb-5 flex-1">
                  {card.descFr}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5">
                  {card.stats.map((stat, si) => (
                    <div key={si} className="text-center">
                      <div className="text-lg font-bold text-foreground-950 leading-none">{stat.value}</div>
                      <div className="text-[10px] text-foreground-500 mt-0.5">{stat.labelFr}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: card.accent }}>
                  <span>{card.ctaFr}</span>
                  <i className="ri-arrow-right-line text-sm transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom link to compliance score */}
        <ScrollReveal delay={300}>
          <ComplianceScorePreloader>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-background-100 border border-background-200 hover:border-primary-300 transition-colors cursor-pointer"
                onClick={() => navigate('/compliance-score/')}
              >
                <i className="ri-bar-chart-2-line text-primary-600" />
                <span className="text-sm font-semibold text-foreground-800">
                  Testez votre maturité conformité — KHEPRA Compliance Score™
                </span>
                <i className="ri-arrow-right-line text-primary-600" />
              </div>
            </div>
          </ComplianceScorePreloader>
        </ScrollReveal>
      </div>
    </section>
  );
}



