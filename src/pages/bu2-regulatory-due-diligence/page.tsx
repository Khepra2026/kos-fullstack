/* ============================================================
   KOS BU2 — Regulatory Intelligence & Due Diligence Authority
   KOS Regulatory Investability Index™ — Standard Africain
   ============================================================ */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import { SeoHead } from '@/components/feature/SeoHead';
import BigFourSubtitleBar from '@/components/base/BigFourSubtitleBar';

const PRODUCTS = [
  {
    id: 'full-scope',
    icon: 'ri-search-eye-line',
    name: 'KOS Full Scope Regulatory Assessment™',
    tagline: 'Évaluation réglementaire complète pour investisseurs majoritaires',
    description: 'Analyse réglementaire intégrale couvrant les 8 axes du KOS Regulatory Investability Index™ : conformité, LBC/FT, gouvernance, historique d\'inspection, risque de sanction, contrôle interne, sécurité SI et transparence.',
    deliverables: [
      'Rapport d\'évaluation réglementaire 40-60 pages',
      'KOS Regulatory Investability Index™ (0-100)',
      'Benchmark sectoriel avec percentiles',
      'Gap Analysis priorisé P0-P3',
      'Risk Matrix 5×5',
      'Recommandation Go/No-Go pour comité d\'investissement',
    ],
    duration: '4 à 6 semaines',
    suited: 'Private Equity, DFI, acquisition majoritaire',
    color: '#b8922e',
  },
  {
    id: 'aml-cft',
    icon: 'ri-fingerprint-line',
    name: 'KOS AML/CFT Compliance Audit™',
    tagline: 'Audit LBC/FT aligné GAFI 2026 pour secteurs réglementés',
    description: 'Audit focalisé LBC/FT : dispositif KYC, bénéficiaires effectifs, déclarations de soupçons, screening sanctions internationales, formation des équipes. Aligné Recommandation 40 du GAFI et réglementation GIABA/GABAC.',
    deliverables: [
      'Rapport LBC/FT 25-35 pages',
      'Score GAFI Compliance (0-100)',
      'Analyse DS 24 mois',
      'Cartographie des risques LBC/FT',
      'Plan de remédiation priorisé',
    ],
    duration: '2 à 3 semaines',
    suited: 'Banques, FinTech, Établissements de Paiement, IMF',
    color: '#2d7518',
  },
  {
    id: 'governance',
    icon: 'ri-government-line',
    name: 'KOS Governance & Board Effectiveness Review™',
    tagline: 'Évaluation de la gouvernance selon COSO 2013 et normes BCEAO/COBAC',
    description: 'Revue approfondie de la gouvernance : composition et efficacité du Conseil d\'Administration, comités spécialisés (audit, risques, rémunération), indépendance des administrateurs, dispositif de contrôle interne, lignes de défense.',
    deliverables: [
      'Rapport gouvernance 20-30 pages',
      'Board Effectiveness Scorecard',
      'Analyse composition CA (indépendance, diversité, compétences)',
      'Cartographie des comités et mandats',
      'Recommandations alignées circulaires BCEAO/COBAC',
    ],
    duration: '2 à 3 semaines',
    suited: 'Investisseurs activistes, DFI, family offices, conseils d\'administration',
    color: '#245d14',
  },
  {
    id: 'flash',
    icon: 'ri-flashlight-line',
    name: 'KOS Regulatory Risk Flash Assessment™',
    tagline: 'Évaluation rapide pour décision d\'investissement urgente',
    description: 'Analyse express focalisée sur les 10 risques réglementaires les plus critiques. Idéal pour les comités d\'investissement nécessitant une évaluation en urgence avant closing ou pour les opportunités à fenêtre courte.',
    deliverables: [
      'Note d\'évaluation 8-12 pages',
      'Top 10 risques réglementaires',
      'Score synthétique KOS RII™',
      'Recommandation Go/No-Go argumentée',
      'Estimation des coûts de remédiation',
    ],
    duration: '5 jours ouvrés',
    suited: 'Opportunités urgentes, fenêtre de négociation courte, décision rapide',
    color: '#378e1d',
  },
];

const SCORING_AXES = [
  { name: 'Conformité réglementaire', weight: 20, justification: 'Base légale — impact direct sur la continuité d\'exploitation. Non-négociable.', icon: 'ri-shield-check-line', color: '#2d7518' },
  { name: 'LBC/FT / AML', weight: 20, justification: 'Risque n°1 des régulateurs africains. Sanctions GAFI = exclusion financière internationale.', icon: 'ri-fingerprint-line', color: '#b8922e' },
  { name: 'Gouvernance', weight: 15, justification: 'Qualité du CA = premier rempart. Corrélé à 80% des crises bancaires (Source: BCEAO, 2023).', icon: 'ri-government-line', color: '#245d14' },
  { name: 'Historique d\'inspection', weight: 15, justification: 'Prédicteur le plus fiable du comportement futur. Sanctions passées = risque récurrent.', icon: 'ri-history-line', color: '#378e1d' },
  { name: 'Risque de sanction', weight: 10, justification: 'Sanctions imminentes = impact direct sur la valorisation de l\'actif.', icon: 'ri-alert-line', color: '#c4a235' },
  { name: 'Contrôle interne', weight: 10, justification: 'COSO 2013 — 17 principes. Efficacité opérationnelle mesurable et auditable.', icon: 'ri-eye-line', color: '#2d7518' },
  { name: 'Sécurité SI & Résilience', weight: 5, justification: 'Directive COBAC 2027, DORA — le risque cyber est devenu systémique.', icon: 'ri-lock-line', color: '#b8922e' },
  { name: 'Transparence & Reporting', weight: 5, justification: 'Qualité de l\'information disponible pour l\'investisseur. Due diligence = confiance.', icon: 'ri-bar-chart-2-line', color: '#378e1d' },
];

const SCORE_LEVELS = [
  { min: 85, max: 100, label: 'Investment Grade', sublabel: 'L\'institution dépasse les exigences minimales. Risque réglementaire faible.', action: 'Due Diligence légère ou monitoring continu recommandé.', color: '#2d7518', bg: 'rgba(45,117,24,0.06)' },
  { min: 70, max: 84, label: 'Investment Grade — Under Monitoring', sublabel: 'Conforme mais zones d\'attention identifiées.', action: 'Due Diligence standard + KOS Regulatory Monitoring™ 12 mois recommandé.', color: '#b8922e', bg: 'rgba(184,146,46,0.06)' },
  { min: 55, max: 69, label: 'Conditional — Remediation Required', sublabel: 'Non-conformités significatives détectées.', action: 'Full Scope DD + Plan de remédiation KOS + suivi trimestriel obligatoire avant closing.', color: '#c4a235', bg: 'rgba(196,162,53,0.06)' },
  { min: 0, max: 54, label: 'Non-Investable — Critical Risk', sublabel: 'Risque réglementaire trop élevé pour un investissement en l\'état.', action: 'Rapport détaillé des gaps + estimation coût/temps de remédiation fourni.', color: '#C62828', bg: 'rgba(198,40,40,0.05)' },
];

const SECTORS = [
  {
    name: 'Banques (UEMOA + CEMAC)',
    icon: 'ri-bank-line',
    percentiles: [
      { label: 'Score Conformité', p25: 62, p50: 74, p75: 85, p90: 92 },
      { label: 'Score LBC/FT', p25: 58, p50: 72, p75: 84, p90: 91 },
      { label: 'Score Gouvernance', p25: 65, p50: 76, p75: 86, p90: 93 },
      { label: 'Score Global', p25: 61, p50: 74, p75: 85, p90: 92 },
    ],
    color: '#2d7518',
  },
  {
    name: 'Microfinance (EMF/SFD)',
    icon: 'ri-hand-heart-line',
    percentiles: [
      { label: 'Score Conformité', p25: 48, p50: 62, p75: 76, p90: 85 },
      { label: 'Score LBC/FT', p25: 42, p50: 58, p75: 72, p90: 82 },
      { label: 'Score Gouvernance', p25: 52, p50: 65, p75: 78, p90: 87 },
      { label: 'Score Global', p25: 47, p50: 62, p75: 75, p90: 85 },
    ],
    color: '#b8922e',
  },
  {
    name: 'FinTech & Paiement',
    icon: 'ri-smartphone-line',
    percentiles: [
      { label: 'Score Conformité', p25: 55, p50: 68, p75: 80, p90: 88 },
      { label: 'Score LBC/FT', p25: 50, p50: 65, p75: 78, p90: 86 },
      { label: 'Score Gouvernance', p25: 58, p50: 70, p75: 82, p90: 89 },
      { label: 'Score Global', p25: 54, p50: 68, p75: 80, p90: 88 },
    ],
    color: '#378e1d',
  },
  {
    name: 'Banques Internationales',
    icon: 'ri-global-line',
    percentiles: [
      { label: 'Score Conformité', p25: 72, p50: 84, p75: 92, p90: 96 },
      { label: 'Score LBC/FT', p25: 75, p50: 86, p75: 93, p90: 97 },
      { label: 'Score Gouvernance', p25: 78, p50: 88, p75: 94, p90: 97 },
      { label: 'Score Global', p25: 75, p50: 86, p75: 93, p90: 97 },
    ],
    color: '#245d14',
  },
  {
    name: 'Assurance (CIMA)',
    icon: 'ri-umbrella-line',
    percentiles: [
      { label: 'Score Conformité', p25: 58, p50: 72, p75: 84, p90: 91 },
      { label: 'Score LBC/FT', p25: 52, p50: 66, p75: 78, p90: 86 },
      { label: 'Score Gouvernance', p25: 60, p50: 73, p75: 85, p90: 92 },
      { label: 'Score Global', p25: 57, p50: 70, p75: 82, p90: 90 },
    ],
    color: '#c4a235',
  },
  {
    name: 'Secteur Public & Entreprises d\'État',
    icon: 'ri-building-4-line',
    percentiles: [
      { label: 'Score Conformité', p25: 45, p50: 58, p75: 72, p90: 82 },
      { label: 'Score LBC/FT', p25: 40, p50: 52, p75: 66, p90: 76 },
      { label: 'Score Gouvernance', p25: 48, p50: 60, p75: 74, p90: 84 },
      { label: 'Score Global', p25: 44, p50: 57, p75: 71, p90: 81 },
    ],
    color: '#5ba832',
  },
];

const MATURITY = [
  { level: 'N5', label: 'Regulatory Leader', desc: 'Dépasse toutes les exigences. Référence sectorielle.', percentile: 'Top 10%', color: '#245d14' },
  { level: 'N4', label: 'Compliant +', desc: 'Conforme avec pratiques avancées.', percentile: '10-35%', color: '#2d7518' },
  { level: 'N3', label: 'Compliant', desc: 'Satisfait les exigences minimales.', percentile: '35-65%', color: '#b8922e' },
  { level: 'N2', label: 'Partiellement Conforme', desc: 'Écarts significatifs. Plan de remédiation requis.', percentile: '65-85%', color: '#c4a235' },
  { level: 'N1', label: 'Non-Conforme', desc: 'Risque réglementaire élevé. Action urgente requise.', percentile: 'Bottom 15%', color: '#C62828' },
];

const MONITORING_EVENTS = [
  { icon: 'ri-file-text-line', label: 'Évolutions réglementaires', desc: 'Nouveaux textes BCEAO, COBAC, OHADA, GAFI, CIMA', freq: 'Hebdomadaire' },
  { icon: 'ri-alert-line', label: 'Sanctions & avertissements', desc: 'Sanctions publiques, mises en demeure, injonctions', freq: 'Temps réel' },
  { icon: 'ri-government-line', label: 'Gouvernance', desc: 'Changements CA/DG, démissions, conflits actionnaires', freq: 'Mensuel' },
  { icon: 'ri-fingerprint-line', label: 'LBC/FT & Conformité', desc: 'Déclarations de soupçons, enquêtes GAFI/GIABA/GABAC', freq: 'Mensuel' },
  { icon: 'ri-shield-flash-line', label: 'Cyber & Résilience', desc: 'Incidents de sécurité, violations de données, attaques', freq: 'Temps réel' },
  { icon: 'ri-search-eye-line', label: 'Inspections réglementaires', desc: 'Missions BCEAO/COBAC, rapports, injonctions', freq: 'Trimestriel' },
];

const METHODOLOGY = [
  { num: '01', title: 'Collecte documentaire', desc: 'Documents institutionnels, politiques, registres, PV, rapports. Data room sécurisée.', days: 'J1-J3', norm: 'ISA 220' },
  { num: '02', title: 'Analyse réglementaire', desc: 'Mapping textes applicables, obligations, contrôles. Croisement 8 régulateurs.', days: 'J4-J10', norm: 'ISAE 3000' },
  { num: '03', title: 'Vérification sur site', desc: 'Entretiens direction, tests de contrôle, échantillonnage, confirmations tierces.', days: 'J11-J15', norm: 'COSO 2013' },
  { num: '04', title: 'Scoring KOS RII™', desc: 'Calcul score 8 axes pondérés, benchmark sectoriel, matrice des risques.', days: 'J16-J18', norm: 'Méthodologie KOS propriétaire' },
  { num: '05', title: 'Rapport & Restitution', desc: 'Rédaction, revue qualité Director, présentation au comité d\'investissement.', days: 'J19-J20', norm: 'ISA 220 · Double validation' },
];

const INVESTORS = [
  { type: 'Private Equity', icon: 'ri-funds-line', examples: 'Fonds panafricains, capital-développement, LBO' },
  { type: 'Venture Capital', icon: 'ri-seedling-line', examples: 'Capital-risque, Series A/B, amorçage' },
  { type: 'DFI & Banques de Développement', icon: 'ri-building-4-line', examples: 'IFC, Proparco, BAD, BOAD, DEG, FMO' },
  { type: 'Banques d\'Investissement', icon: 'ri-bank-line', examples: 'M&A, financement structuré, syndication' },
  { type: 'Fonds Souverains', icon: 'ri-government-line', examples: 'Fonds souverains africains et internationaux' },
  { type: 'Family Offices', icon: 'ri-home-4-line', examples: 'Familles patriarcales, bureaux de gestion privée' },
];

const NORMS = [
  { code: 'ISA 220', name: 'Quality Control for an Audit of Financial Statements', usage: 'Contrôle qualité de chaque mission' },
  { code: 'ISAE 3000', name: 'Assurance Engagements Other than Audits', usage: 'Cadre des missions d\'assurance' },
  { code: 'COSO 2013', name: 'Internal Control — Integrated Framework', usage: 'Évaluation du contrôle interne (17 principes)' },
  { code: 'GAFI 40+9', name: 'FATF Recommendations', usage: 'Évaluation LBC/FT' },
  { code: 'ISO 37000', name: 'Governance of Organizations', usage: 'Évaluation de la gouvernance' },
];

export default function BU2RegulatoryDueDiligencePage() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState(0);
  const [expandedAxis, setExpandedAxis] = useState<number | null>(null);

  return (
    <>
      <SeoHead
        title="BU2 — Regulatory Intelligence & Due Diligence Authority | KOS Regulatory Investability Index™ | KHEPRA EXPERTS"
        description="KOS BU2 est l'autorité de référence en due diligence réglementaire pour l'Afrique francophone. KOS Regulatory Investability Index™ — 8 axes pondérés, benchmark sectoriel 6 secteurs, normes ISA 220 & ISAE 3000. Private Equity, DFI, Banques. UEMOA/CEMAC. Devis confidentiel."
        keywords="due diligence réglementaire Afrique francophone, KOS Regulatory Investability Index, regulatory risk assessment, private equity compliance Africa, AML due diligence CEMAC UEMOA, gouvernance COSO 2013, audit LBC/FT GAFI"
        canonicalPath="/bu2-regulatory-due-diligence/"
        ogType="website"
      />
      <div className="min-h-screen bg-background-50">
        <Navigation />

        {/* ── HERO — Premium Institutionnel ── */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#fdfaf5] via-[#faf7ef] to-[#f5f0e5]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-[#b8922e]/20 blur-[120px]" />
            <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#2d7518]/15 blur-[120px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#b8922e]/10 border border-[#b8922e]/20">
                <i className="ri-search-eye-line text-lg text-[#b8922e]" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#b8922e]/8 text-[#9a7825] border border-[#b8922e]/15">BU2 — REGULATORY INTELLIGENCE & DUE DILIGENCE AUTHORITY</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground-950 mb-6 max-w-4xl leading-tight">
              Le{' '}
              <span className="bg-gradient-to-r from-[#b8922e] to-[#9a7825] bg-clip-text text-transparent">KOS Regulatory Investability Index™</span>
              {' '}— Le standard africain d'évaluation du risque réglementaire
            </h1>

            <p className="text-lg text-foreground-600 mb-10 max-w-3xl leading-relaxed">
              Notre analyse de plus de 200 dossiers réglementaires en Afrique francophone a révélé des écarts de conformité récurrents, insuffisamment détectés par les due diligence traditionnelles. Le KOS Regulatory Investability Index™ a été conçu pour fournir aux investisseurs un cadre d'évaluation rigoureux, documenté et comparable — aligné sur les normes ISA 220 et ISAE 3000.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #b8922e, #9a7825)' }}>
                <i className="ri-shield-check-line" />
                Solliciter un entretien confidentiel
              </button>
              <button onClick={() => navigate('/lead-magnets/mini-rapport-due-diligence/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap border border-[#b8922e]/30 text-[#9a7825] hover:bg-[#b8922e]/5 transition-all">
                <i className="ri-file-download-line" />
                Consulter un extrait de méthodologie
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '200+', label: 'Missions réalisées' },
                { value: '8 axes', label: 'KOS RII™ pondérés' },
                { value: '17 pays', label: 'UEMOA + CEMAC' },
                { value: '6 secteurs', label: 'Benchmarks sectoriels' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center bg-white/70 border border-background-200/70">
                  <div className="text-2xl font-bold mb-1 text-[#9a7825]">{s.value}</div>
                  <div className="text-xs text-foreground-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KOS REGULATORY INVESTABILITY INDEX™ ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex justify-start mb-5">
                  <BigFourSubtitleBar label="KOS Regulatory Investability Index™" variant="left-accent" icon="ri-award-line" accentColor="accent" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground-950 mb-5">Une méthodologie documentée, un cadre d'évaluation comparable</h2>
                <p className="text-foreground-600 mb-8 leading-relaxed">
                  8 axes pondérés et justifiés, gouvernance de scoring documentée, benchmark sectoriel. Chaque investisseur dispose d'un langage commun pour évaluer le risque réglementaire — avec une piste d'audit complète et la traçabilité de chaque notation.
                </p>
                <div className="space-y-2">
                  {SCORING_AXES.map((axis, i) => (
                    <div key={i}>
                      <div
                        className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all hover:bg-background-50"
                        onClick={() => setExpandedAxis(expandedAxis === i ? null : i)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${axis.color}12` }}>
                          <i className={`${axis.icon} text-xs`} style={{ color: axis.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground-950">{axis.name}</span>
                            <span className="text-xs font-bold ml-2" style={{ color: axis.color }}>{axis.weight}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-background-200">
                            <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${axis.weight * 4.5}%`, background: axis.color }} />
                          </div>
                        </div>
                        <i className={`text-xs text-foreground-400 transition-transform ${expandedAxis === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                      </div>
                      {expandedAxis === i && (
                        <div className="ml-12 mb-2 p-4 rounded-xl bg-background-50 border border-background-200/70">
                          <p className="text-sm text-foreground-600 leading-relaxed">{axis.justification}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-display font-bold text-foreground-950 mb-5">Niveaux d'Investissabilité</h3>
                <div className="space-y-4">
                  {SCORE_LEVELS.map((level, i) => (
                    <div key={i} className="rounded-xl p-5 border" style={{ background: level.bg, borderColor: `${level.color}25` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold" style={{ color: level.color }}>{level.label}</span>
                        <span className="text-sm font-bold" style={{ color: level.color }}>{level.min} – {level.max}</span>
                      </div>
                      <p className="text-sm text-foreground-600 mb-2">{level.sublabel}</p>
                      <p className="text-xs text-foreground-500 italic">{level.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENCHMARKS SECTORIELS ── */}
        <section className="py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="KOS Regulatory Benchmark™" variant="left-accent" icon="ri-bar-chart-grouped-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Chaque due diligence inclut un benchmark sectoriel</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Le client sait où se situe la cible par rapport à ses pairs. Données issues de notre base propriétaire de 200+ missions.</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {SECTORS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSector(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer whitespace-nowrap transition-all ${selectedSector === i ? 'text-white shadow-sm' : 'bg-white text-foreground-600 border border-background-200 hover:border-background-300'}`}
                  style={selectedSector === i ? { background: s.color } : {}}
                >
                  <i className={`${s.icon} text-sm`} />
                  {s.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="bg-white rounded-2xl p-8 border border-background-200">
                <h3 className="text-lg font-display font-bold text-foreground-950 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${SECTORS[selectedSector].color}12` }}>
                    <i className={`${SECTORS[selectedSector].icon} text-sm`} style={{ color: SECTORS[selectedSector].color }} />
                  </div>
                  {SECTORS[selectedSector].name}
                </h3>
                <div className="space-y-6">
                  {SECTORS[selectedSector].percentiles.map((p, pi) => (
                    <div key={pi}>
                      <p className="text-sm font-medium text-foreground-950 mb-3">{p.label}</p>
                      <div className="relative h-8">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C62828]/20 via-[#c4a235]/30 to-[#2d7518]/30" />
                        <div className="absolute top-0 bottom-0 w-px bg-foreground-300" style={{ left: '5%' }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-foreground-500">25e</span>
                        </div>
                        <div className="absolute top-0 bottom-0 w-0.5 bg-foreground-400" style={{ left: '50%' }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground-700">50e</span>
                        </div>
                        <div className="absolute top-0 bottom-0 w-px bg-foreground-300" style={{ left: '87.5%' }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-foreground-500">75e</span>
                        </div>
                        <div className="absolute top-0 bottom-0 w-px bg-foreground-300" style={{ left: '95%' }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-foreground-500">90e</span>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-2">
                          <span className="text-xs font-bold text-[#C62828]" style={{ position: 'absolute', left: `${p.p25 * 0.9}%` }}>{p.p25}</span>
                          <span className="text-sm font-bold text-foreground-950" style={{ position: 'absolute', left: `${p.p50 * 0.9}%` }}>{p.p50}</span>
                          <span className="text-xs font-bold" style={{ position: 'absolute', left: `${p.p75 * 0.88}%`, color: SECTORS[selectedSector].color }}>{p.p75}</span>
                          <span className="text-xs font-bold text-[#245d14]" style={{ position: 'absolute', left: `${p.p90 * 0.87}%` }}>{p.p90}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground-400 mt-6 italic">Données issues de notre base propriétaire de missions. Mise à jour trimestrielle.</p>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-foreground-950 mb-5">Échelle de Maturité Réglementaire</h3>
                <div className="space-y-3">
                  {MATURITY.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-background-200">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm flex-shrink-0 text-white" style={{ background: m.color }}>{m.level}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-bold text-foreground-950">{m.label}</span>
                          <span className="text-xs text-foreground-400">{m.percentile}</span>
                        </div>
                        <p className="text-xs text-foreground-500">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUITS ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="4 Produits — Devis Confidentiel" variant="left-accent" icon="ri-stack-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Une évaluation réglementaire adaptée à chaque besoin d'investissement</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Honoraires déterminés sur devis confidentiel, adaptés à la complexité de la cible et au périmètre requis. Sans engagement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTS.map((p, i) => (
                <div key={i} className="rounded-2xl p-8 bg-background-50 border border-background-200 hover:border-[#b8922e]/30 transition-all group">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                      <i className={`${p.icon} text-xl`} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-bold text-foreground-950 mb-1 line-clamp-2" title={p.name}>{p.name}</h3>
                      <p className="text-sm text-foreground-500">{p.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-600 mb-5 leading-relaxed">{p.description}</p>
                  <div className="mb-5">
                    <p className="text-xs font-bold text-foreground-400 uppercase tracking-widest mb-2">Livrables</p>
                    <div className="space-y-1.5">
                      {p.deliverables.map((d, di) => (
                        <div key={di} className="flex items-start gap-2 text-xs text-foreground-600">
                          <i className="ri-check-line text-xs flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-background-200 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground-950">{p.duration}</span>
                      <span className="text-xs text-foreground-400">{p.suited}</span>
                    </div>
                    <button onClick={() => navigate('/contact/')} className="text-xs font-bold px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition-all group-hover:scale-105 text-white" style={{ background: p.color }}>
                      Devis confidentiel
                      <i className="ri-arrow-right-line ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KOS REGULATORY MONITORING™ ── */}
        <section className="py-20 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="KOS Regulatory Monitoring™" variant="left-accent" icon="ri-radar-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Au-delà de la due diligence — la surveillance continue</h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Service post-due-diligence contractuel. Surveillance des événements réglementaires affectant la cible après l'investissement.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MONITORING_EVENTS.map((e, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-background-200 hover:border-[#b8922e]/20 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-4 bg-[#b8922e]/8">
                    <i className={`${e.icon} text-lg text-[#9a7825]`} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{e.label}</h3>
                  <p className="text-xs text-foreground-500 leading-relaxed mb-3">{e.desc}</p>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#b8922e]/8 text-[#9a7825]">{e.freq}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-white rounded-2xl p-8 border border-background-200">
              <h3 className="text-lg font-display font-bold text-foreground-950 mb-4">Modèle d'escalade</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { level: 'Vert', trigger: 'Aucun événement', action: 'Rapport trimestriel standard', color: '#2d7518' },
                  { level: 'Jaune', trigger: '1-2 événements mineurs', action: 'Alerte email + note d\'analyse sous 48h', color: '#b8922e' },
                  { level: 'Orange', trigger: 'Événement significatif', action: 'Appel Director + note d\'impact sous 24h', color: '#c4a235' },
                  { level: 'Rouge', trigger: 'Crise (retrait agrément, sanction majeure)', action: 'Intervention immédiate + recommandations COMEX sous 6h', color: '#C62828' },
                ].map((esc, i) => (
                  <div key={i} className="rounded-xl p-5 border" style={{ borderColor: `${esc.color}30`, background: `${esc.color}06` }}>
                    <div className="w-3 h-3 rounded-full mb-3" style={{ background: esc.color }} />
                    <p className="text-sm font-bold text-foreground-950 mb-1">{esc.level}</p>
                    <p className="text-xs text-foreground-500 mb-3">{esc.trigger}</p>
                    <p className="text-xs text-foreground-600 italic">{esc.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MÉTHODOLOGIE ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Méthodologie" variant="left-accent" icon="ri-route-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">5 phases — Aligné normes internationales</h2>
              <p className="text-foreground-600 max-w-xl mx-auto">Chaque due diligence suit un protocole rigoureux documenté. Double validation Director + Quality Assurance.</p>
            </div>
            <div className="relative">
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-background-300 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative z-10">
                {METHODOLOGY.map((m, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm mx-auto mb-4 relative z-10 text-white" style={{ background: 'linear-gradient(135deg, #b8922e, #9a7825)' }}>{m.num}</div>
                    <div className="text-xs font-bold text-foreground-950 mb-1 line-clamp-2" title={m.title}>{m.title}</div>
                    <div className="text-xs text-foreground-500 mb-2 leading-relaxed">{m.desc}</div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#b8922e]/8 text-[#9a7825]">{m.days}</span>
                    <p className="text-[10px] text-foreground-400 mt-2 font-medium">{m.norm}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NORMES ── */}
        <section className="py-16 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Normes Internationales" variant="left-accent" icon="ri-verified-badge-line" accentColor="accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground-950 mb-3">Normes internationales de référence</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {NORMS.map((n, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-background-200 text-center">
                  <p className="text-sm font-bold text-foreground-950 mb-1">{n.code}</p>
                  <p className="text-xs text-foreground-500 leading-relaxed mb-2">{n.name}</p>
                  <p className="text-[10px] text-[#9a7825] font-medium">{n.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INVESTISSEURS ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-5">
                <BigFourSubtitleBar label="Investisseurs" variant="left-accent" icon="ri-funds-line" accentColor="accent" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground-950 mb-3">Pour quels investisseurs ?</h2>
              <p className="text-foreground-600">Nos missions servent les investisseurs les plus exigeants en Afrique francophone.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {INVESTORS.map((c, i) => (
                <div key={i} className="bg-background-50 rounded-xl p-5 border border-background-200 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 bg-[#b8922e]/8 border border-[#b8922e]/15">
                    <i className={`${c.icon} text-base text-[#9a7825]`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground-950">{c.type}</div>
                    <div className="text-xs text-foreground-500">{c.examples}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20 bg-gradient-to-br from-[#fdfaf5] via-[#faf7ef] to-[#f5f0e5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground-950 mb-4">Votre prochain investissement mérite une certitude réglementaire</h2>
            <p className="text-foreground-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nos Directors sont disponibles pour un entretien confidentiel. Devis personnalisé sous 48h, sans engagement. Rapport Flash disponible sous 5 jours ouvrés pour les décisions urgentes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/contact/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap transition-all hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #b8922e, #9a7825)' }}>
                <i className="ri-shield-check-line" />
                Solliciter un entretien confidentiel
              </button>
              <button onClick={() => navigate('/lead-magnets/mini-rapport-due-diligence/')} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer whitespace-nowrap border border-[#b8922e]/30 text-[#9a7825] hover:bg-[#b8922e]/5 transition-all">
                <i className="ri-file-download-line" />
                Mini Due Diligence Réglementaire
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}