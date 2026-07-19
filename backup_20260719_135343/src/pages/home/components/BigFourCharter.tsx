import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import InstitutionalAbstractBackground from '@/components/feature/InstitutionalAbstractBackground';

/* ============================================================
   KOS REGTECH AI — Engagement Qualité Institutionnel
   Inspiration des standards internationaux,
   adaptés aux réalités réglementaires de l'Afrique Francophone.
   Aucune donnée interne exposée — principes uniquement.
   ============================================================ */

const PRINCIPLES = [
  {
    icon: 'ri-scales-3-line',
    titleFr: 'Rigueur analytique',
    titleEn: 'Analytical Rigor',
    descriptionFr: 'Chaque mission suit une méthodologie structurée, documentée et reproductible, adaptée au contexte réglementaire local. L\'analyse s\'appuie sur les textes en vigueur dans la zone UEMOA/CEMAC.',
    descriptionEn: 'Every engagement follows a structured, documented and reproducible methodology adapted to the local regulatory context. Analysis is grounded in applicable UEMOA/CEMAC texts.',
  },
  {
    icon: 'ri-book-open-line',
    titleFr: 'Ancrage réglementaire',
    titleEn: 'Regulatory Grounding',
    descriptionFr: 'Nos travaux s\'appuient exclusivement sur le droit positif applicable : circulaires BCEAO/COBAC, instructions, décisions et jurisprudence des autorités de supervision compétentes.',
    descriptionEn: 'Our work relies exclusively on applicable positive law: BCEAO/COBAC circulars, instructions, decisions and case law from competent supervisory authorities.',
  },
  {
    icon: 'ri-file-text-line',
    titleFr: 'Exigence éditoriale',
    titleEn: 'Editorial Standards',
    descriptionFr: 'Chaque livrable est conçu pour être directement exploitable par les instances de gouvernance : synthèse exécutive, corps structuré, recommandations actionnables, annexes techniques.',
    descriptionEn: 'Every deliverable is designed to be directly usable by governance bodies: executive summary, structured body, actionable recommendations, technical appendices.',
  },
  {
    icon: 'ri-lightbulb-flash-line',
    titleFr: 'Impact décisionnel',
    titleEn: 'Decisional Impact',
    descriptionFr: 'L\'objectif de chaque mission est de fournir aux décideurs les éléments nécessaires à une prise de décision éclairée, dans le respect du cadre réglementaire et des réalités opérationnelles locales.',
    descriptionEn: 'The goal of each engagement is to provide decision-makers with the necessary elements for informed decision-making, in compliance with the regulatory framework and local operational realities.',
  },
];

const LOCAL_ADAPTATIONS = [
  {
    zone: 'UEMOA',
    flag: 'ri-global-line',
    descFr: '8 pays — dispositif BCEAO, Commission Bancaire, textes OHADA applicables',
    descEn: '8 countries — BCEAO framework, Banking Commission, applicable OHADA texts',
  },
  {
    zone: 'CEMAC',
    flag: 'ri-earth-line',
    descFr: '6 pays — dispositif COBAC, BEAC, réglementation GABAC',
    descEn: '6 countries — COBAC framework, BEAC, GABAC regulation',
  },
];

export default function BigFourCharter() {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <section
      id="big-four-charter"
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Fond abstrait institutionnel — signature visuelle KOS REGTECH AI */}
      <InstitutionalAbstractBackground opacity={0.035} />

      {/* Overlay vert subtil pour harmoniser */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'oklch(0.50 0.14 148 / 0.015)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — sobre, institutionnel */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label={isEn ? 'Our Quality Commitment' : 'Notre Engagement Qualité'}
                variant="centered-pillars"
                icon="ri-check-double-line"
                accentColor="primary"
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground-950 leading-tight mb-5" style={{ fontFamily: 'var(--font-heading), Georgia, serif', letterSpacing: '-0.02em' }}>
              {isEn ? (
                <>Inspired by <span style={{ color: '#6B9B1F' }}>international standards</span>, adapted to African regulatory realities</>
              ) : (
                <>Inspirés des <span style={{ color: '#6B9B1F' }}>standards internationaux</span>, adaptés aux réalités réglementaires africaines</>
              )}
            </h2>
            <p className="text-foreground-600 max-w-3xl mx-auto text-base leading-relaxed">
              {isEn
                ? 'Our methodological approach draws on the rigor and structuring principles of leading international advisory practices, systematically adapted to the institutional, regulatory and operational context of Francophone Africa — BCEAO, COBAC, OHADA, GAFI.'
                : 'Notre approche méthodologique s\'inspire de la rigueur et des principes structurants des grandes pratiques de conseil internationales, systématiquement adaptés au contexte institutionnel, réglementaire et opérationnel de l\'Afrique Francophone — BCEAO, COBAC, OHADA, GAFI.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Principles — cartes sobres */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#fafaf9', border: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4" style={{ background: 'rgba(107,155,31,0.08)', border: '1px solid rgba(107,155,31,0.15)' }}>
                  <i className={`${p.icon} text-lg`} style={{ color: '#6B9B1F' }} />
                </div>
                <h3 className="text-base font-bold text-foreground-950 mb-2" style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}>
                  {isEn ? p.titleEn : p.titleFr}
                </h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  {isEn ? p.descriptionEn : p.descriptionFr}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Local Adaptation — 2 zones */}
        <ScrollReveal delay={150}>
          <div className="rounded-3xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg, #f8faf6 0%, #f0f5ea 100%)', border: '1px solid rgba(107,155,31,0.12)' }}>
            <div className="text-center mb-8">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#5a8218' }}>
                {isEn ? 'Systematically adapted to' : 'Systématiquement adapté à'}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-foreground-950" style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}>
                {isEn ? 'Two regulatory zones' : 'Deux zones réglementaires'}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {LOCAL_ADAPTATIONS.map((zone, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-background-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'rgba(107,155,31,0.1)', border: '1px solid rgba(107,155,31,0.2)' }}>
                      <i className={`${zone.flag} text-base`} style={{ color: '#6B9B1F' }} />
                    </div>
                    <span className="text-lg font-bold text-foreground-950">{zone.zone}</span>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {isEn ? zone.descEn : zone.descFr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(107,155,31,0.10) 50%, transparent 100%)' }}
      />
    </section>
  );
}



