import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/feature/ScrollReveal';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';
import { BU_HREFLANG_MAP } from '@/data/buHreflangMap';

/* ============================================================
   KOS — 4 Business Units — Configuration — Standards Internationaux
   JUIN 2026 : ZÉRO prix, tout sur devis
   ============================================================ */

const BUS = [
  {
    id: 'bu1',
    icon: 'ri-shield-check-line',
    titleFr: 'Régulation Financière & Conformité',
    titleEn: 'Financial Regulation & Compliance',
    accent: '#D4AF37',
    accentLight: '#fefce8',
    missionFr: 'Bouclier Réglementaire — Protéger les institutions financières africaines face à la complexité réglementaire BCEAO, COBAC, GABAC, GAFI et OHADA.',
    missionEn: 'Regulatory Shield — Protect African financial institutions against regulatory complexity from BCEAO, COBAC, GABAC, GAFI and OHADA.',
    products: [
      { name: 'Inspection Readiness', descFr: 'Préparation aux inspections BCEAO / COBAC — conformité totale', descEn: 'BCEAO / COBAC inspection readiness — full compliance' },
      { name: 'Conformité LBC/FT', descFr: 'Dispositif AML/CFT — normes GAFI, KYC, bénéficiaires effectifs', descEn: 'AML/CFT framework — GAFI standards, KYC, beneficial owners' },
      { name: 'Agrément & Licensing', descFr: 'Obtention et renouvellement d\'agréments bancaires et SFD', descEn: 'Banking and MFI license acquisition and renewal' },
      { name: 'Veille Réglementaire 24/7', descFr: 'Monitoring continu — 137+ textes réglementaires', descEn: 'Continuous monitoring — 137+ regulatory texts' },
    ],
    href: '/kos-bu1-financial-regulation/',
    stat: '137+',
    statLabelFr: 'textes réglementaires couverts',
    statLabelEn: 'regulatory texts covered',
    cta: 'Explorer',
    ctaEn: 'Explore',
  },
  {
    id: 'bu2',
    icon: 'ri-government-line',
    titleFr: 'Gouvernance & Due Diligence',
    titleEn: 'Governance & Due Diligence',
    accent: '#86BC25',
    accentLight: '#f0fdf4',
    missionFr: 'Observatoire de la Gouvernance — Évaluer, structurer et certifier la gouvernance des institutions financières pour attirer les investisseurs.',
    missionEn: 'Governance Observatory — Assess, structure and certify the governance of financial institutions to attract investors.',
    products: [
      { name: 'Due Diligence Full Scope', descFr: 'Due diligence réglementaire, financière et gouvernance — standard investisseur', descEn: 'Regulatory, financial and governance due diligence — investor standard' },
      { name: 'Board Advisory', descFr: 'Conseil CA, comités spécialisés, indépendance — circulaires BCEAO/COBAC', descEn: 'Board advisory, specialized committees, independence — BCEAO/COBAC circulars' },
      { name: 'Audit Gouvernance 7 Piliers', descFr: 'Évaluation exhaustive — conformité circulaire 01/2017/CB/C', descEn: 'Comprehensive assessment — circular 01/2017/CB/C compliance' },
      { name: 'KOS Investability Score™', descFr: 'Score 8 axes — standard de référence pour investisseurs en Afrique', descEn: '8-axis score — reference standard for investors in Africa' },
    ],
    href: '/kos-bu2-governance-due-diligence/',
    stat: '200+',
    statLabelFr: 'missions réalisées',
    statLabelEn: 'missions completed',
    cta: 'Explorer',
    ctaEn: 'Explore',
  },
  {
    id: 'bu3',
    icon: 'ri-leaf-line',
    titleFr: 'Climat, Transition & ESG',
    titleEn: 'Climate, Transition & ESG',
    accent: '#2E8B57',
    accentLight: '#ecfdf5',
    missionFr: 'Ingénierie de Décarbonation — Accompagner les institutions financières africaines dans leur transition ESG conforme aux standards ISSB, GRI et CSRD.',
    missionEn: 'Decarbonation Engineering — Support African financial institutions in their ESG transition compliant with ISSB, GRI and CSRD standards.',
    products: [
      { name: 'Bilan Carbone Scope 1-2-3', descFr: 'Mesure complète de l\'empreinte carbone — normes GHG Protocol', descEn: 'Full carbon footprint measurement — GHG Protocol standards' },
      { name: 'Stratégie ESG Intégrée', descFr: 'Déploiement ISSB/GRI/CSRD — gouvernances climat et rapport extra-financier', descEn: 'ISSB/GRI/CSRD deployment — climate governance and extra-financial reporting' },
      { name: 'Financements Verts', descFr: 'Accès Fonds Vert Climat, GEF, obligations vertes — structuration de dossiers', descEn: 'GCF, GEF access, green bonds — dossier structuring' },
      { name: 'Diagnostic ESG Maturité', descFr: 'Évaluation gratuite 15 minutes — positionnement ESG', descEn: 'Free 15-minute ESG maturity assessment', badge: 'Offert' },
    ],
    href: '/kos-bu3-climate-esg/',
    stat: '3',
    statLabelFr: 'standards maîtrisés (ISSB/GRI/CSRD)',
    statLabelEn: 'standards mastered (ISSB/GRI/CSRD)',
    cta: 'Explorer',
    ctaEn: 'Explore',
  },
  {
    id: 'bu4',
    icon: 'ri-line-chart-line',
    titleFr: 'KBR-Model & Intelligence d\'Affaires',
    titleEn: 'KBR-Model & Business Intelligence',
    accent: '#c9a227',
    accentLight: '#fefce8',
    missionFr: 'Monétisation de la Propriété Intellectuelle — Produire des études sectorielles, monographies et rapports High-Ticket pour éclairer les décisions stratégiques.',
    missionEn: 'IP Monetization — Produce sector studies, monographs and High-Ticket reports to inform strategic decisions.',
    products: [
      { name: 'Études Sectorielles Premium', descFr: 'Niveau L1 — Analyses sectorielles approfondies sur devis', descEn: 'Level L1 — In-depth sector analyses on quote' },
      { name: 'Monographies Premium', descFr: 'Niveau L2 — Articles et notes de recherche exclusifs', descEn: 'Level L2 — Exclusive research articles and notes' },
      { name: 'Rapports High-Ticket', descFr: 'Niveau L3 — Rapports stratégiques sur mission confidentielle', descEn: 'Level L3 — Strategic reports on confidential mission' },
      { name: 'KBR Intelligence Sample', descFr: 'Échantillon gratuit — découvrez la profondeur KBR', descEn: 'Free sample — discover KBR depth', badge: 'Offert' },
    ],
    href: '/kos-bu4-kbr-model/',
    stat: '3',
    statLabelFr: 'niveaux KBR (L1/L2/L3)',
    statLabelEn: 'KBR levels (L1/L2/L3)',
    cta: 'Explorer',
    ctaEn: 'Explore',
  },
];

export default function PlatformBusinessUnits() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [activeBu, setActiveBu] = useState<string>('bu1');
  const [hoveredProd, setHoveredProd] = useState<number | null>(null);

  const selectedBu = BUS.find(bu => bu.id === activeBu) || BUS[0];

  return (
    <section id="business-units" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <BigFourSubtitleBar
                label={isEn ? '4 Business Units — Standards Internationaux' : '4 Business Units — Standards Internationaux'}
                variant="left-accent"
                icon="ri-stack-line"
                accentColor="primary"
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: 'var(--font-heading), Georgia, serif', letterSpacing: '-0.02em' }}>
              {isEn
                ? 'Régulation, Gouvernance, Climat ESG & KBR-Model'
                : 'Régulation, Gouvernance, Climat ESG & KBR-Model'}
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed text-justify">
              {isEn
                ? 'KOS est un dispositif institutionnel aligné sur les standards internationaux — quatre Business Units reconfigurées qui transforment la complexité réglementaire, climatique et de gouvernance en avantage décisionnel pour les institutions financières d\'Afrique Francophone. Aucun prix public. Chaque mission donne lieu à un devis confidentiel.'
                : 'KOS est un dispositif institutionnel aligné sur les standards internationaux — quatre Business Units reconfigurées qui transforment la complexité réglementaire, climatique et de gouvernance en avantage décisionnel pour les institutions financières d\'Afrique Francophone. Aucun prix public. Chaque mission donne lieu à un devis confidentiel.'}
            </p>
          </div>
        </ScrollReveal>

        {/* BU Selector Tabs */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {BUS.map((bu) => (
              <button
                key={bu.id}
                onClick={() => setActiveBu(bu.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105"
                style={{
                  background: activeBu === bu.id ? `${bu.accent}15` : 'transparent',
                  color: activeBu === bu.id ? bu.accent : '#6b7280',
                  border: `1.5px solid ${activeBu === bu.id ? bu.accent + '40' : '#e5e7eb'}`,
                }}
              >
                <i className={`${bu.icon} text-base`} />
                {isEn ? bu.titleEn : bu.titleFr}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active BU Detail */}
        <ScrollReveal delay={150}>
          <div
            className="rounded-3xl p-8 md:p-10 transition-all duration-500"
            style={{
              background: selectedBu.accent === '#86BC25'
                ? 'linear-gradient(135deg, #f8fcf5 0%, #f0fdf4 50%, #fafdf8 100%)'
                : selectedBu.accent === '#2E8B57'
                  ? 'linear-gradient(135deg, #f5fdf8 0%, #ecfdf5 50%, #f8fdf9 100%)'
                  : 'linear-gradient(135deg, #fdfcf5 0%, #fefce8 50%, #fdfaf5 100%)',
              border: `1.5px solid ${selectedBu.accent}20`,
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left — BU Info */}
              <div className="flex-1">
                {/* Icon + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0" style={{ background: `${selectedBu.accent}15`, border: `2px solid ${selectedBu.accent}30` }}>
                    <i className={`${selectedBu.icon} text-2xl`} style={{ color: selectedBu.accent }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: `${selectedBu.accent}12`, color: selectedBu.accent }}>
                      {selectedBu.id.toUpperCase()}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}>
                      {isEn ? selectedBu.titleEn : selectedBu.titleFr}
                    </h3>
                  </div>
                </div>

                {/* Mission */}
                <p className="text-gray-600 text-base leading-relaxed mb-6 text-justify">
                  {isEn ? selectedBu.missionEn : selectedBu.missionFr}
                </p>

                {/* Stat */}
                <div className="inline-flex items-baseline gap-2 mb-6 px-4 py-2 rounded-xl" style={{ background: `${selectedBu.accent}08`, border: `1px solid ${selectedBu.accent}15` }}>
                  <span className="text-2xl font-bold" style={{ color: selectedBu.accent, fontFamily: 'var(--font-heading)' }}>
                    {selectedBu.stat}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {isEn ? selectedBu.statLabelEn : selectedBu.statLabelFr}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(selectedBu.href)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${selectedBu.accent}, ${selectedBu.accent}cc)`,
                    color: selectedBu.accent === '#D4AF37' || selectedBu.accent === '#c9a227' ? '#1a1a1a' : '#ffffff',
                    boxShadow: `0 4px 20px ${selectedBu.accent}40`,
                  }}
                >
                  {isEn ? selectedBu.ctaEn : selectedBu.cta}
                  <i className="ri-arrow-right-line" />
                </button>
              </div>

              {/* Right — Products */}
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  {isEn ? 'Services & Livrables' : 'Services & Livrables'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedBu.products.map((prod, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredProd(i)}
                      onMouseLeave={() => setHoveredProd(null)}
                      className="rounded-xl p-4 transition-all duration-300 cursor-default"
                      style={{
                        background: hoveredProd === i ? '#ffffff' : 'rgba(255,255,255,0.5)',
                        border: `1px solid ${hoveredProd === i ? selectedBu.accent + '40' : 'rgba(0,0,0,0.05)'}`,
                        boxShadow: hoveredProd === i ? `0 4px 16px rgba(0,0,0,0.06)` : 'none',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: selectedBu.accent }} />
                        <span className="text-sm font-bold text-gray-900">{prod.name}</span>
                        {(prod as any).badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded" style={{ background: `${selectedBu.accent}15`, color: selectedBu.accent }}>
                            {(prod as any).badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {isEn ? prod.descEn : prod.descFr}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Engagement model — pas de prix */}
                <div className="mt-5 pt-4 border-t border-gray-200/60">
                  <div className="flex items-center gap-2">
                    <i className="ri-file-text-line text-sm" style={{ color: selectedBu.accent }} />
                    <span className="text-sm font-medium text-gray-500">
                      {isEn ? 'Devis confidentiel sur entretien — aucun prix public' : 'Devis confidentiel sur entretien — aucun prix public'}
                    </span>
                  </div>

                  {/* Bilingual link to the other language version */}
                  {(() => {
                    const buEntry = BU_HREFLANG_MAP.find(b => b.buId === selectedBu.id);
                    if (!buEntry) return null;
                    const otherLangPath = isEn ? buEntry.pathFr : buEntry.pathEn;
                    const otherLabel = isEn ? 'FR' : 'EN';
                    return (
                      <a
                        href={otherLangPath}
                        onClick={(e) => { e.preventDefault(); navigate(otherLangPath); }}
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-global-line text-[11px]"></i>
                        <span>
                          {isEn ? 'Also available in French' : 'Également disponible en Anglais'}
                          <span className="inline-block ml-1 px-1 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-500">{otherLabel}</span>
                        </span>
                        <i className="ri-arrow-right-up-line text-[9px]"></i>
                      </a>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



