import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { Link } from 'react-router-dom';
import { useKOSUltimateCockpit } from '@/hooks/useKOSUltimateCockpit';
import { TrimestrielCockpitWidget } from '@/components/feature/TrimestrielCockpitWidget';
import { CrossSectorHeatmap, type CrossSectorHeatmapSector, type CrossSectorHeatmapDimension } from '@/components/feature/CrossSectorHeatmap';
import BigFourEvidenceTab from '';
import KPITowerTab from '';

// ═══════════════════════════════════════════════════════════════
// SEMANTIC REASONING WIDGET — Cross-Domain Intelligence
// ═══════════════════════════════════════════════════════════════
const LIVE_QUERIES = [
  {
    id: 'q1',
    question: 'Quelle est l\'impact de la nouvelle circulaire BCEAO sur les ratio de solvabilité des SFD qui ont aussi des opérations COBAC ?',
    domains: ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC'],
    hops: 4,
    sources: 12,
    confidence: 94.2,
    latency: 1.8,
    reasoning: [
      { step: 1, domain: 'BCEAO', insight: 'Circulaire 03-2024 — ratio solvabilité 8%→10% pour IMF cat. B' },
      { step: 2, domain: 'COBAC', insight: 'Instruction 012/GR/2024 — convergence réglementaire UEMOA/CEMAC prévue Q2 2025' },
      { step: 3, domain: 'Fintech', insight: '23 SFD transfrontaliers identifiés — impact double réglementation confirmé' },
      { step: 4, domain: 'Synthèse', insight: 'Action requise : capital renforcé +2% pour entités bi-réglementaires, délai 18 mois' },
    ],
    conclusion: 'Les SFD bi-réglementaires doivent renforcer leurs fonds propres de 2 points de pourcentage supplémentaires (cumul BCEAO 10% + ajustement COBAC). 23 entités concernées. Délai : Q2 2025.',
    status: 'completed',
  },
  {
    id: 'q2',
    question: 'Comment les nouvelles exigences GAFI 2024 affectent-elles le KYC des banques panafricaines opérant en zone OHADA ?',
    domains: ['GAFI', 'OHADA', 'LCB/FT', 'KYC'],
    hops: 5,
    sources: 18,
    confidence: 91.8,
    latency: 2.1,
    reasoning: [
      { step: 1, domain: 'GAFI', insight: 'R40 Recommandations révisées — KYC digital, PEP list unifiée, beneficial owner' },
      { step: 2, domain: 'OHADA', insight: 'AUDCG révisé 2023 — transparence UBO dans 17 pays membres' },
      { step: 3, domain: 'LCB/FT', insight: 'Groupe EGMONT — échange automatique FIU dans 12 pays africains' },
      { step: 4, domain: 'Digital', insight: 'eKYC accepté : BCEAO, BEAC, RDC — réduction onboarding 18j→3j' },
      { step: 5, domain: 'Synthèse', insight: '47 banques impactées. eKYC mandatory Q3 2025. Systèmes UBO à déployer.' },
    ],
    conclusion: 'Les banques panafricaines doivent déployer eKYC compatible GAFI, intégrer le registre UBO OHADA, et connecter les flux EGMONT pour 12 pays. Délai : Q3 2025. 47 banques concernées.',
    status: 'completed',
  },
  {
    id: 'q3',
    question: 'Quels sont les risques de conformité croisés pour une fintech qui veut s\'agréer simultanément en zone UEMOA et CEMAC ?',
    domains: ['BCEAO', 'COBAC', 'Fintech', 'Agrément'],
    hops: 6,
    sources: 24,
    confidence: 88.5,
    latency: 2.4,
    reasoning: [
      { step: 1, domain: 'UEMOA', insight: 'BCEAO Instruction 008-05-2015 — agrément en établissement de paiement, capital 300M FCFA' },
      { step: 2, domain: 'CEMAC', insight: 'COBAC R-2022/01 — fintech agréé, capital 500M FCFA, local data residency' },
      { step: 3, domain: 'LCB/FT', insight: 'Double obligation de déclaration — CENTIF (UEMOA) + ANIF (CEMAC)' },
      { step: 4, domain: 'Cyber', insight: 'Directive COBAC cyber 2024 + norme BCEAO — ISO 27001 requis pour les deux zones' },
      { step: 5, domain: 'Fiscalité', insight: 'Double imposition potentielle — convention OHADA + accord CEMAC, ambigüité sur TVA numérique' },
      { step: 6, domain: 'Synthèse', insight: '8 conflits réglementaires identifiés, 3 bloquants. Timeline agrément : 18-24 mois.' },
    ],
    conclusion: '8 conflits réglementaires croisés identifiés. 3 sont bloquants : capital consolidé 800M FCFA, double déclaration LCB/FT, data residency conflictuelle. Agrément séquentiel recommandé : UEMOA en premier (18 mois), puis CEMAC (12 mois).',
    status: 'completed',
  },
];

function SemanticReasoningWidget() {
  const [activeQuery, setActiveQuery] = useState<string>('q1');
  const [showReasoning, setShowReasoning] = useState<Record<string, boolean>>({});

  const toggleReasoning = (id: string) => {
    setShowReasoning(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary-100/40 border-b border-primary-200/40 px-5 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
              <i className="ri-brain-2-line text-white text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Semantic Reasoning Engine™ v1.0 — Raisonnement Cross-Domaines</h3>
              <p className="text-[11px] text-foreground-500">UPG-2 Deployé · 5 sauts max · 95.2% précision · Temps réel · 12 domaines</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              LIVE
            </span>
            <Link to="/kos-knowledge-graph" className="text-[10px] text-primary-600 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap">
              <i className="ri-external-link-line"></i>Knowledge Graph
            </Link>
          </div>
        </div>

        {/* Engine stats */}
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          {[
            { label: 'Précision', value: '95.2%', color: 'text-emerald-600' },
            { label: 'Latence moy.', value: '1.8s', color: 'text-primary-600' },
            { label: 'Sauts max', value: '5', color: 'text-foreground-950' },
            { label: 'Domaines', value: '12', color: 'text-foreground-950' },
            { label: 'Sources actives', value: '54', color: 'text-foreground-950' },
          ].map(s => (
            <span key={s.label} className="text-foreground-500">{s.label} : <strong className={s.color}>{s.value}</strong></span>
          ))}
        </div>
      </div>

      {/* Query selector */}
      <div className="flex gap-2 px-5 pt-4 overflow-x-auto">
        {LIVE_QUERIES.map(q => (
          <button
            key={q.id}
            onClick={() => setActiveQuery(q.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium cursor-pointer transition-colors whitespace-nowrap border ${
              activeQuery === q.id
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-background-100 text-foreground-600 border-background-200 hover:border-primary-300'
            }`}
          >
            <i className="ri-brain-line"></i>
            {q.domains.slice(0, 2).join(' × ')}
            <span className={`${ activeQuery === q.id ? 'bg-white/20' : 'bg-background-200'} px-1 rounded text-[9px]`}>{q.hops} sauts</span>
          </button>
        ))}
      </div>

      {/* Active query */}
      {LIVE_QUERIES.filter(q => q.id === activeQuery).map(q => (
        <div key={q.id} className="p-5">
          {/* Question */}
          <div className="bg-primary-50/50 border border-primary-200/40 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-question-line text-white text-xs"></i>
              </div>
              <p className="text-sm font-medium text-foreground-950 leading-relaxed">{q.question}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {q.domains.map(d => (
                <span key={d} className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full border border-primary-200">{d}</span>
              ))}
              <span className="text-[10px] text-foreground-400 flex items-center gap-1">
                <i className="ri-arrow-right-double-line"></i>{q.hops} sauts · {q.sources} sources · {q.latency}s · {q.confidence}% confiance
              </span>
            </div>
          </div>

          {/* Reasoning chain toggle */}
          <div className="mb-4">
            <button
              onClick={() => toggleReasoning(q.id)}
              className="flex items-center gap-2 text-xs text-primary-600 hover:text-primary-700 cursor-pointer"
            >
              <i className={`${showReasoning[q.id] ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-sm`}></i>
              {showReasoning[q.id] ? 'Masquer' : 'Voir'} la chaîne de raisonnement ({q.hops} étapes)
            </button>

            {showReasoning[q.id] && (
              <div className="mt-3 space-y-2">
                {q.reasoning.map(r => (
                  <div key={r.step} className="flex items-start gap-3">
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center text-[10px] font-bold">{r.step}</div>
                      {r.step < q.reasoning.length && <div className="w-px h-4 bg-secondary-200 ml-3 mt-1"></div>}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-secondary-700 bg-secondary-50 px-1.5 py-0.5 rounded">{r.domain}</span>
                      <p className="text-xs text-foreground-600 mt-0.5 leading-relaxed">{r.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conclusion */}
          <div className="bg-emerald-50/50 border border-emerald-200/40 rounded-lg p-4">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-check-line text-white text-xs"></i>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-emerald-700 mb-1">Synthèse — {q.confidence}% confiance</p>
                <p className="text-xs text-foreground-700 leading-relaxed">{q.conclusion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type TabId = 'overview' | 'command' | 'executive' | 'media' | 'compliance' | 'trimestriel' | 'system' | 'evidence' | 'kpitower';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
  { id: 'command', label: 'Commandement', icon: 'ri-radar-line' },
  { id: 'executive', label: 'Exécutif', icon: 'ri-vip-crown-line' },
  { id: 'evidence', label: 'Big Four Evidence', icon: 'ri-file-search-line' },
  { id: 'kpitower', label: 'KPI Tower', icon: 'ri-bar-chart-2-line' },
  { id: 'media', label: 'Médias', icon: 'ri-film-line' },
  { id: 'compliance', label: 'Conformité', icon: 'ri-shield-check-line' },
  { id: 'trimestriel', label: 'Trimestriel', icon: 'ri-calendar-check-line' },
  { id: 'system', label: 'Système', icon: 'ri-server-line' },
];

const STATUS_COLORS: Record<string, string> = {
  conforme: 'text-emerald-600 bg-emerald-100 border-emerald-200',
  surveillance: 'text-amber-600 bg-amber-100 border-amber-200',
  action: 'text-red-600 bg-red-100 border-red-200',
};

const STATUS_DOT: Record<string, string> = {
  conforme: 'bg-emerald-500',
  surveillance: 'bg-amber-500',
  action: 'bg-red-500',
};

export default function ultimateCockpitPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const ctx = useKOSUltimateCockpit();

  return (
    <hubLayout hubId={101} activeTab="Ultimate Cockpit" tabLabel="Ultimate Cockpit™">
      <main>
        {/* ── HERO BAR ── */}
        <section className="relative bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-foreground-950 text-background-50 font-body tracking-wide">
                      COCKPIT ULTIME
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 font-body">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {ctx.system.certification}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white font-body">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      LIVE — 23 Juin 2026
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 mb-2 font-heading">
                    KOS Ultimate Cockpit™
                  </h1>
                  <p className="text-sm text-foreground-600 max-w-3xl font-body">
                    Single Pane of Glass — Pilotage centralisé de tout l'écosystème KHEPRA OS.
                    {ctx.system.totalHubs} hubs · {ctx.system.totalAgents} agents IA · {ctx.system.totalEdgeFunctions} Edge Functions · {ctx.system.totalTables} tables Supabase · Score global {ctx.system.globalHealthScore}/10.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3 flex-shrink-0">
                  {[
                    { label: 'Hubs', value: ctx.system.activeHubs, icon: 'ri-stack-line', cls: 'bg-primary-100 text-primary-700' },
                    { label: 'Agents', value: ctx.system.totalAgents, icon: 'ri-robot-2-line', cls: 'bg-accent-100 text-accent-700' },
                    { label: 'EF', value: ctx.health.edgeFunctionsActive, icon: 'ri-function-line', cls: 'bg-secondary-100 text-secondary-700' },
                    { label: 'Uptime', value: `${ctx.health.uptime30d}%`, icon: 'ri-check-double-line', cls: 'bg-emerald-100 text-emerald-700' },
                  ].map(s => (
                    <div key={s.label} className={`${s.cls} rounded-xl p-3 text-center min-w-[70px]`}>
                      <i className={`${s.icon} text-base`}></i>
                      <p className="text-lg font-bold mt-0.5">{s.value}</p>
                      <p className="text-[10px] opacity-70">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SYSTEM STATUS BAR ── */}
        <div className="border-b border-background-200/70 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-4 overflow-x-auto text-xs text-foreground-500 font-body whitespace-nowrap">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><strong className="text-foreground-950">{ctx.health.edgeFunctionsActive}</strong> Edge Functions</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><strong className="text-foreground-950">{ctx.health.cronJobsActive}</strong> Cron Jobs</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><strong className="text-foreground-950">{ctx.health.tablesTotal}</strong> Tables</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><strong className="text-foreground-950">{ctx.health.agentsDeployed}</strong> Agents</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span><strong className="text-foreground-950">{ctx.criticalAlertsList.length}</strong> Alertes critiques</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><strong className="text-foreground-950">{ctx.health.deployments7d}</strong> Déploiements/7j</span>
              <span className="text-foreground-300">|</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Build <strong className="text-foreground-950">{ctx.system.avgBuildTime}</strong></span>
            </div>
          </div>
        </div>

        {/* ── TAB NAVIGATION ── */}
        <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-background-50'
                      : 'text-foreground-600 hover:bg-background-100'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {activeTab === 'overview' && <OverviewTab ctx={ctx} />}
          {activeTab === 'command' && <CommandTab ctx={ctx} />}
          {activeTab === 'executive' && <ExecutiveTab ctx={ctx} />}
          {activeTab === 'media' && <MediaTab ctx={ctx} />}
          {activeTab === 'compliance' && <ComplianceTab ctx={ctx} />}
          {activeTab === 'trimestriel' && <TrimestrielTab />}
          {activeTab === 'system' && <SystemTab ctx={ctx} />}
          {activeTab === 'evidence' && <BigFourEvidenceTab />}
          {activeTab === 'kpitower' && <KPITowerTab />}
        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 bg-foreground-950">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-3">KOS Ultimate Cockpit™ — Single Pane of Glass</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-6">
              9 onglets unifiés · 78 hubs · 75 agents IA · 99 Edge Functions · 261 tables Supabase. Pilotage centralisé de l'écosystème KHEPRA OS — Big Four Evidence, KPI Tower, Commandement, Exécutif, Médias, Conformité, Trimestriel, Système.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/kos-dashboard" className="px-5 py-3 rounded-xl bg-background-50 text-foreground-950 font-bold text-sm hover:bg-background-100 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-dashboard-line mr-2"></i>Dashboard Central
              </Link>
              <Link to="/kos-bloc-total-compliance" className="px-5 py-3 rounded-xl bg-accent-500 text-white font-bold text-sm hover:bg-accent-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-radar-line mr-2"></i>Bloc Total Compliance
              </Link>
              <Link to="/kos-control-tower-automation" className="px-5 py-3 rounded-xl bg-secondary-500 text-white font-bold text-sm hover:bg-secondary-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-building-line mr-2"></i>Control Tower
              </Link>
              <Link to="/kos-commandement-operationnel-unifie" className="px-5 py-3 rounded-xl bg-primary-500 text-background-50 dark:text-foreground-950 font-bold text-sm hover:bg-primary-600 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-government-line mr-2"></i>Commandement Unifié
              </Link>
            </div>
          </div>
        </section>
      </main>
    </hubLayout>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 1: VUE D'ENSEMBLE
// ═══════════════════════════════════════════════════════════════
function OverviewTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── Commander's Intent ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
              <i className="ri-flag-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Commander's Intent — {ctx.intent.date}</h3>
              <p className="text-xs text-foreground-500">{ctx.intent.author}</p>
            </div>
          </div>
          <p className="text-sm text-foreground-700 mb-4 leading-relaxed">{ctx.intent.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5">
                <i className="ri-play-circle-line text-primary-500"></i>Actions Prioritaires
              </h4>
              <ul className="space-y-1.5">
                {ctx.intent.priorityActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 flex-shrink-0 text-[10px] font-bold">{i + 1}</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5">
                <i className="ri-scales-line text-accent-500"></i>Décisions Requises
              </h4>
              <ul className="space-y-1.5">
                {ctx.intent.decisionsRequired.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 flex-shrink-0 text-[10px] font-bold">{i + 1}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── 4 Big Numbers ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Score Système', value: `${ctx.system.globalHealthScore}/10`, sub: 'Tous indicateurs au vert', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: 'ri-medal-line' },
          { label: 'Hubs Actifs', value: `${ctx.system.activeHubs}/${ctx.system.totalHubs}`, sub: '78 hubs en production', color: 'text-primary-500', bg: 'bg-primary-50', icon: 'ri-stack-line' },
          { label: 'Conformité', value: `${ctx.compliance.globalRate}%`, sub: `${ctx.compliance.compliant}/${ctx.compliance.total} cadres conformes`, color: 'text-accent-500', bg: 'bg-accent-50', icon: 'ri-scales-line' },
          { label: 'Alertes Critiques', value: ctx.criticalAlertsList.length, sub: ctx.criticalAlertsList.length === 0 ? 'Aucune alerte active' : 'Action requise', color: ctx.criticalAlertsList.length === 0 ? 'text-emerald-500' : 'text-red-500', bg: ctx.criticalAlertsList.length === 0 ? 'bg-emerald-50' : 'bg-red-50', icon: ctx.criticalAlertsList.length === 0 ? 'ri-check-double-line' : 'ri-alert-fill' },
        ].map(s => (
          <ScrollReveal key={s.label}>
            <div className={`${s.bg} border border-background-200/70 rounded-xl p-5 text-center`}>
              <i className={`${s.icon} ${s.color} text-2xl mb-2`}></i>
              <p className="text-3xl font-bold text-foreground-950 font-heading">{s.value}</p>
              <p className="text-xs text-foreground-500 mt-1">{s.sub}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── 10 Dimensions at a Glance ── */}
      <div>
        <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <i className="ri-dashboard-3-line text-primary-500"></i>10 Dimensions de Pilotage
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ctx.dimensions.map(dim => (
            <div key={dim.id} className="bg-background-50 border border-background-200/70 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-background-100">
                  <i className={`${dim.icon} text-sm text-foreground-700`}></i>
                </div>
                <span className={`w-2 h-2 rounded-full ${STATUS_DOT[dim.status]}`}></span>
              </div>
              <p className="text-xs font-bold text-foreground-950">{dim.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-xs font-bold ${dim.status === 'conforme' ? 'text-emerald-600' : dim.status === 'surveillance' ? 'text-amber-600' : 'text-red-600'}`}>{dim.score}</span>
                <span className="text-[10px] text-foreground-400">/ {dim.target}</span>
                {dim.trend === 'up' && <i className="ri-arrow-up-line text-[10px] text-emerald-500"></i>}
                {dim.trend === 'down' && <i className="ri-arrow-down-line text-[10px] text-red-500"></i>}
              </div>
              {dim.alertsCount > 0 && (
                <div className="mt-2 pt-2 border-t border-background-100">
                  <span className="text-[10px] text-amber-600 flex items-center gap-1">
                    <i className="ri-notification-3-line"></i>{dim.alertsCount} alerte{dim.alertsCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Trimestriel KPI Mini ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <TrimestrielCockpitWidget compact={true} />
        </div>
      </ScrollReveal>

      {/* ── 8 Media Factories Mini ── */}
      <div>
        <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <i className="ri-film-line text-accent-500"></i>8 Usines Médias
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ctx.mediaFactories.map(f => (
            <Link
              key={f.id}
              to={f.route}
              className="bg-background-50 border border-background-200/70 rounded-lg p-3 hover:border-foreground-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${f.status === 'operational' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  <i className={`${f.icon} text-sm`}></i>
                </div>
                <span className="text-xs font-semibold text-foreground-950">{f.shortName}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-foreground-400">
                <span>Santé {f.healthScore}</span>
                <span>Auto {f.automationRate}%</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 2: COMMANDEMENT — 10 Dimensions + Alertes + Semantic Reasoning
// ═══════════════════════════════════════════════════════════════
function CommandTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── Dimensions Status ── */}
      <ScrollReveal>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{ctx.compliantDimensions.length}</p>
            <p className="text-xs text-emerald-700">Conformes</p>
          </div>
          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{ctx.surveillanceDimensions.length}</p>
            <p className="text-xs text-amber-700">Surveillance</p>
          </div>
          <div className="bg-red-50 border border-red-200/60 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{ctx.actionDimensions.length}</p>
            <p className="text-xs text-red-700">Action</p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── SEMANTIC REASONING WIDGET ── */}
      <ScrollReveal>
        <SemanticReasoningWidget />
      </ScrollReveal>

      {/* ── 10 Dimensions Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ctx.dimensions.map(dim => (
          <ScrollReveal key={dim.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              dim.status === 'conforme' ? 'border-emerald-200/60' : dim.status === 'surveillance' ? 'border-amber-200/60' : 'border-red-200/60'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${STATUS_COLORS[dim.status].split(' ')[1]} ${STATUS_COLORS[dim.status].split(' ')[0]}`}>
                    <i className={`${dim.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{dim.name}</h3>
                    <p className="text-xs text-foreground-500">{dim.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${dim.status === 'conforme' ? 'text-emerald-600' : dim.status === 'surveillance' ? 'text-amber-600' : 'text-red-600'}`}>
                      {dim.score}
                    </span>
                    <span className="text-xs text-foreground-400">/ {dim.target}</span>
                  </div>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] ${dim.status === 'conforme' ? 'text-emerald-600' : dim.status === 'surveillance' ? 'text-amber-600' : 'text-red-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[dim.status]}`}></span>
                    {dim.status === 'conforme' ? 'Conforme' : dim.status === 'surveillance' ? 'Surveillance' : 'Action'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-foreground-500">
                  {dim.trend === 'up' && <i className="ri-arrow-up-line text-emerald-500"></i>}
                  {dim.trend === 'down' && <i className="ri-arrow-down-line text-red-500"></i>}
                  {dim.trend === 'stable' && <i className="ri-subtract-line text-foreground-400"></i>}
                  {dim.trendValue}
                </span>
                {dim.alertsCount > 0 && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <i className="ri-notification-3-line"></i>{dim.alertsCount} alerte{dim.alertsCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 3: EXÉCUTIF — KPIs + Pipeline + Missions + Agents
// ═══════════════════════════════════════════════════════════════
function ExecutiveTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ctx.kpis.map(kpi => (
          <ScrollReveal key={kpi.id}>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-background-100">
                  <i className={`${kpi.icon} text-sm text-foreground-600`}></i>
                </div>
                <span className={`text-[10px] font-bold ${kpi.variationPos ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.variation}
                </span>
              </div>
              <div className="text-xl font-bold text-foreground-950 font-heading">{kpi.value}</div>
              <div className="text-[10px] text-foreground-400 uppercase tracking-wide mt-0.5">{kpi.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Pipeline ── */}
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide mb-4">Pipeline 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-background-100">
                    <th className="text-left py-2 text-foreground-400 font-medium">Mois</th>
                    <th className="text-right py-2 text-foreground-400 font-medium">Suspects</th>
                    <th className="text-right py-2 text-foreground-400 font-medium">Leads</th>
                    <th className="text-right py-2 text-foreground-400 font-medium">Opps</th>
                    <th className="text-right py-2 text-foreground-400 font-medium">Missions</th>
                  </tr>
                </thead>
                <tbody>
                  {ctx.pipeline.map((p, i) => (
                    <tr key={p.mois} className={`border-b border-background-50 ${i === ctx.pipeline.length - 1 ? 'font-bold bg-accent-50/30' : ''}`}>
                      <td className="py-2.5 text-foreground-900">{p.mois}</td>
                      <td className="py-2.5 text-right text-foreground-600">{p.suspects}</td>
                      <td className="py-2.5 text-right text-foreground-600">{p.leads}</td>
                      <td className="py-2.5 text-right text-foreground-600">{p.opportunites}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-600">{p.missions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-8 mt-4 pt-3 border-t border-background-100">
              <div><span className="text-lg font-bold text-foreground-950">4.6%</span><p className="text-[10px] text-foreground-400">Conv. Globale</p></div>
              <div><span className="text-lg font-bold text-foreground-950">33%</span><p className="text-[10px] text-foreground-400">Lead → Opps</p></div>
              <div><span className="text-lg font-bold text-foreground-950">52j</span><p className="text-[10px] text-foreground-400">Cycle Moy.</p></div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Missions Actives ── */}
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Missions Actives</h2>
              <span className="text-xs text-foreground-400">{ctx.missions.length} missions</span>
            </div>
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {ctx.missions.map(m => {
                const statutColor = m.statut === 'Dans les délais' ? 'bg-emerald-500' : m.statut === 'En retard' ? 'bg-red-500' : 'bg-blue-500';
                const progColor = m.progression >= 80 ? '#059669' : m.progression >= 40 ? '#d97706' : '#dc2626';
                return (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-background-100 border border-background-200/50 text-xs">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0`} style={{ background: statutColor === 'bg-emerald-500' ? '#059669' : statutColor === 'bg-red-500' ? '#dc2626' : '#2563eb' }}></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-foreground-900 truncate">{m.client}</span>
                        <span className="text-foreground-400">·</span>
                        <span className="text-foreground-500">{m.secteur}</span>
                      </div>
                      <div className="text-foreground-600 truncate">{m.mission}</div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-foreground-400">
                        <span>{m.agentLead}</span>
                        <span>·</span>
                        <span>{new Date(m.deadline).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${m.progression}%`, background: progColor }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-foreground-500">{m.progression}%</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        m.statut === 'Dans les délais' ? 'bg-emerald-50 text-emerald-700' : m.statut === 'En retard' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                      }`}>{m.statut}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Agent Performance ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide">Performance Agents IA</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-foreground-500">Score Moy. <strong className="text-foreground-950">{ctx.avgAgentScore}</strong></span>
              <span className="text-foreground-500">Actifs <strong className="text-foreground-950">{ctx.agents.length}/15</strong></span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ctx.agents.map(a => {
              const color = a.score >= 95 ? '#059669' : a.score >= 90 ? '#d97706' : '#dc2626';
              return (
                <div key={a.agent} className="flex items-center gap-3 p-2.5 rounded-lg bg-background-100 text-xs">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold bg-accent-100 text-accent-700">{a.agent.substring(0, 4).replace(' ', '')}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground-900 truncate">{a.agent}</div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-foreground-400">
                      <span>{a.livrables} livrables</span>
                      <span>Délais {a.delais}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-10 h-1.5 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: color }}></div>
                    </div>
                    <span className="font-bold text-foreground-700 w-6 text-right">{a.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 4: MÉDIAS — 8 Factories + Alerts
// ═══════════════════════════════════════════════════════════════
function MediaTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── Media Overview ── */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Usines Opérationnelles', value: `${ctx.operationalFactories.length}/${ctx.mediaFactories.length}`, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Santé Moyenne', value: `${ctx.factoryAverageHealth}/100`, icon: 'ri-heart-pulse-line', color: 'text-primary-500', bg: 'bg-primary-50' },
            { label: 'Automatisation Moy.', value: `${ctx.factoryAverageAutomation}%`, icon: 'ri-git-branch-line', color: 'text-accent-500', bg: 'bg-accent-50' },
            { label: 'Assets Produits', value: '6 005', icon: 'ri-stack-line', color: 'text-secondary-500', bg: 'bg-secondary-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border border-background-200/70 rounded-lg p-3 text-center`}>
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── 8 Factory Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ctx.mediaFactories.map(factory => (
          <ScrollReveal key={factory.id}>
            <Link
              to={factory.route}
              className="block bg-background-50 border border-background-200/70 rounded-xl overflow-hidden cursor-pointer hover:border-foreground-300 transition-colors"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${factory.status === 'operational' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                      <i className={`${factory.icon} text-xl ${factory.status === 'operational' ? 'text-emerald-600' : 'text-amber-600'}`}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground-400 font-mono">Hub {factory.hubNumber}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          factory.status === 'operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {factory.status === 'operational' ? 'OPÉRATIONNEL' : 'DÉGRADÉ'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground-950 mt-0.5">{factory.name}</h3>
                    </div>
                  </div>
                  <i className="ri-arrow-right-line text-foreground-400"></i>
                </div>
                <p className="text-xs text-foreground-600 mb-3">{factory.description}</p>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center"><p className="text-[10px] text-foreground-400">Santé</p><p className="text-xs font-bold text-foreground-950">{factory.healthScore}</p></div>
                  <div className="text-center"><p className="text-[10px] text-foreground-400">Qualité</p><p className="text-xs font-bold text-foreground-950">{factory.qualityScore}</p></div>
                  <div className="text-center"><p className="text-[10px] text-foreground-400">Conformité</p><p className="text-xs font-bold text-foreground-950">{factory.complianceScore}</p></div>
                  <div className="text-center"><p className="text-[10px] text-foreground-400">Auto</p><p className="text-xs font-bold text-foreground-950">{factory.automationRate}%</p></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-foreground-400">
                  <span>{factory.outputCount.toLocaleString()} {factory.outputLabel}</span>
                  {factory.alertsCount > 0 && <span className="text-amber-600 flex items-center gap-1"><i className="ri-notification-3-line"></i>{factory.alertsCount}</span>}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 5: CONFORMITÉ & QUALITÉ
// ═══════════════════════════════════════════════════════════════
function ComplianceTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── Compliance Overview ── */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Taux Conformité', value: `${ctx.compliance.globalRate}%`, icon: 'ri-scales-line', color: 'text-emerald-500' },
            { label: 'Cadres Conformes', value: `${ctx.compliance.compliant}/${ctx.compliance.total}`, icon: 'ri-check-double-line', color: 'text-primary-500' },
            { label: 'Actions en Attente', value: ctx.compliance.pendingActions, icon: 'ri-timer-line', color: 'text-amber-500' },
            { label: 'Actions Correctives', value: ctx.compliance.total - ctx.compliance.compliant, icon: 'ri-error-warning-line', color: 'text-secondary-500' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
              <i className={`${s.icon} ${s.color} text-lg`}></i>
              <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
              <p className="text-xs text-foreground-500">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Frameworks ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ctx.compliance.frameworks.map(cf => (
          <ScrollReveal key={cf.name}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              cf.status === 'compliant' ? 'border-emerald-200/60' : 'border-amber-200/60'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cf.status === 'compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <i className="ri-scales-line text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{cf.name}</h3>
                    <p className="text-xs text-foreground-500">{cf.authority}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  cf.status === 'compliant' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {cf.status === 'compliant' ? 'CONFORME' : 'PARTIEL'}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-foreground-500">Score de conformité</span>
                  <span className="text-[10px] font-bold text-foreground-950">{cf.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cf.score >= 95 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${cf.score}%` }}></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ─── Critical Alerts ─── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground-950 uppercase tracking-wide flex items-center gap-2">
              <i className="ri-notification-3-line text-red-500"></i>
              Alertes Consolidées
            </h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span>Rouge {ctx.alertsByNiveau.ROUGE}</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Orange {ctx.alertsByNiveau.ORANGE}</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>Jaune {ctx.alertsByNiveau.JAUNE}</span>
            </div>
          </div>
          <div className="space-y-2">
            {ctx.alerts.map(a => {
              const niveauClass = a.niveau === 'ROUGE' ? 'border-red-200 bg-red-50/50' : a.niveau === 'ORANGE' ? 'border-amber-200 bg-amber-50/50' : 'border-yellow-200 bg-yellow-50/50';
              const dotColor = a.niveau === 'ROUGE' ? 'bg-red-500' : a.niveau === 'ORANGE' ? 'bg-amber-500' : 'bg-yellow-500';
              return (
                <div key={a.id} className={`p-3 rounded-lg border text-xs ${niveauClass}`}>
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full ${dotColor} flex-shrink-0 mt-1`}></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`font-bold ${a.niveau === 'ROUGE' ? 'text-red-700' : a.niveau === 'ORANGE' ? 'text-amber-700' : 'text-yellow-700'}`}>{a.niveau}</span>
                        <span className="text-foreground-400">{a.source}</span>
                      </div>
                      <p className="text-foreground-700 mb-1">{a.message}</p>
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                        <span>{a.date}</span>
                        <span className="text-primary-600 font-medium">→ {a.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 5.5: TRIMESTRIEL — Suivi KPI Autorité Digitale, SEO, IA + Heatmap Sectorielle
// ═══════════════════════════════════════════════════════════════

const HEATMAP_SECTORS: CrossSectorHeatmapSector[] = [
  { id: 'banques', name: 'Banques & Crédit', icon: 'ri-bank-line', color: '#2d7518', score: 76, breakdown: [{ label: 'Conformité', val: 82 }, { label: 'Gouvernance', val: 76 }, { label: 'Risque Crédit', val: 71 }, { label: 'Couverture', val: 88 }, { label: 'Publications', val: 100 }] },
  { id: 'fintechs', name: 'FinTechs', icon: 'ri-smartphone-line', color: '#d4a82a', score: 67, breakdown: [{ label: 'Conformité', val: 65 }, { label: 'Gouvernance', val: 62 }, { label: 'Open Banking', val: 54 }, { label: 'Couverture', val: 71 }, { label: 'Publications', val: 75 }] },
  { id: 'energie', name: 'Énergie', icon: 'ri-flashlight-line', color: '#5ba832', score: 73, breakdown: [{ label: 'Conformité', val: 84 }, { label: 'Gouvernance', val: 70 }, { label: 'Viabilité', val: 72 }, { label: 'Couverture', val: 82 }, { label: 'Publications', val: 75 }] },
  { id: 'agriculture', name: 'Agriculture', icon: 'ri-plant-line', color: '#2d7518', score: 65, breakdown: [{ label: 'Conformité', val: 71 }, { label: 'Gouvernance', val: 60 }, { label: 'Climat', val: 58 }, { label: 'Couverture', val: 59 }, { label: 'Publications', val: 50 }] },
  { id: 'pme', name: 'PME & ETI', icon: 'ri-store-2-line', color: '#378e1d', score: 62, breakdown: [{ label: 'Conformité', val: 65 }, { label: 'Gouvernance', val: 58 }, { label: 'Santé PME', val: 68 }, { label: 'Couverture', val: 71 }, { label: 'Publications', val: 75 }] },
  { id: 'esg', name: 'ESG', icon: 'ri-leaf-line', color: '#d4a82a', score: 67, breakdown: [{ label: 'Conformité', val: 79 }, { label: 'Gouvernance', val: 68 }, { label: 'Finance Durable', val: 64 }, { label: 'Couverture', val: 100 }, { label: 'Publications', val: 100 }] },
  { id: 'microfinance', name: 'Microfinance', icon: 'ri-hand-heart-line', color: '#378e1d', score: 62, breakdown: [{ label: 'Conformité', val: 74 }, { label: 'Gouvernance', val: 65 }, { label: 'Digitalisation', val: 52 }, { label: 'Couverture', val: 100 }, { label: 'Publications', val: 100 }] },
];

const HEATMAP_DIMENSIONS: CrossSectorHeatmapDimension[] = [
  { key: 'conformite', label: 'Conformité', icon: 'ri-shield-check-line' },
  { key: 'gouvernance', label: 'Gouvernance', icon: 'ri-government-line' },
  { key: 'operational', label: 'Opérationnel', icon: 'ri-settings-3-line' },
  { key: 'couverture', label: 'Couverture', icon: 'ri-global-line' },
  { key: 'publications', label: 'Publications', icon: 'ri-book-open-line' },
];

function TrimestrielTab() {
  return (
    <div className="space-y-6">
      <TrimestrielCockpitWidget compact={false} />

      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-accent-100/70 flex items-center justify-center">
              <i className="ri-grid-line text-accent-700 text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">KOS Cross-Sector Heatmap</h3>
              <p className="text-[10px] text-foreground-500">Benchmark comparatif 7 secteurs — Forces & Faiblesses par dimension</p>
            </div>
            <Link to="/observatoires-sectoriels/comparatif/" className="ml-auto text-[10px] font-bold text-primary-600 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap">
              <i className="ri-external-link-line text-xs"></i>Comparatif complet
            </Link>
          </div>
          <CrossSectorHeatmap
            sectors={HEATMAP_SECTORS}
            dimensions={HEATMAP_DIMENSIONS}
            quarter={1}
            variant="compact"
            title=""
            subtitle=""
          />
        </div>
      </ScrollReveal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TAB 6: SYSTÈME
// ═══════════════════════════════════════════════════════════════
function SystemTab({ ctx }: { ctx: ReturnType<typeof useKOSUltimateCockpit> }) {
  return (
    <div className="space-y-8">
      {/* ── Health Gauges ── */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Edge Functions', value: `${ctx.health.edgeFunctionsActive}/${ctx.health.edgeFunctionsTotal}`, pct: 100, color: 'bg-emerald-500', icon: 'ri-function-line' },
            { label: 'Cron Jobs', value: `${ctx.health.cronJobsActive}/${ctx.health.cronJobsTotal}`, pct: 100, color: 'bg-emerald-500', icon: 'ri-time-line' },
            { label: 'Tables Supabase', value: ctx.health.tablesTotal, pct: 100, color: 'bg-emerald-500', icon: 'ri-database-2-line' },
            { label: 'Agents Déployés', value: `${ctx.health.agentsDeployed}/${ctx.health.agentsInProduction}`, pct: 100, color: 'bg-emerald-500', icon: 'ri-robot-2-line' },
            { label: 'Uptime 30j', value: `${ctx.health.uptime30d}%`, pct: 99.99, color: 'bg-emerald-500', icon: 'ri-check-double-line' },
            { label: 'Déploiements 7j', value: ctx.health.deployments7d, pct: 100, color: 'bg-primary-500', icon: 'ri-rocket-2-line' },
          ].map(s => (
            <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-background-100 flex items-center justify-center">
                <i className={`${s.icon} text-foreground-600 text-lg`}></i>
              </div>
              <p className="text-lg font-bold text-foreground-950">{s.value}</p>
              <div className="w-full h-1.5 bg-background-200 rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${Math.min(s.pct, 100)}%` }}></div>
              </div>
              <p className="text-[10px] text-foreground-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── System KPIs ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-server-line text-primary-500"></i>
              Infrastructure
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Edge Functions', value: '98/98 actives', sub: '100%', color: 'text-emerald-600' },
                { label: 'Cron Jobs', value: '32/32 actifs', sub: '100%', color: 'text-emerald-600' },
                { label: 'Tables Supabase', value: '248 tables', sub: 'Production', color: 'text-primary-600' },
                { label: 'Agents IA', value: '75/75 en production', sub: '100%', color: 'text-emerald-600' },
                { label: 'Build Time', value: '12s en moyenne', sub: 'Vite', color: 'text-emerald-600' },
                { label: 'Déploiements', value: '22 en 7 jours', sub: 'Actif', color: 'text-primary-600' },
                { label: 'Uptime 30j', value: '99.99%', sub: 'AAAA', color: 'text-emerald-600' },
                { label: 'Certification', value: 'Big Four Supreme', sub: '100%', color: 'text-accent-600' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-background-100 last:border-0">
                  <span className="text-xs text-foreground-600">{item.label}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-foreground-950">{item.value}</span>
                    <span className={`text-[10px] ml-1.5 ${item.color}`}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-shield-keyhole-line text-accent-500"></i>
              Sécurité & Performance
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Score Sécurité', value: '9.8/10', sub: 'OWASP Top 10 couvert', color: 'text-emerald-600' },
                { label: 'Core Web Vitals Mobile', value: '95/100', sub: 'Cible atteinte', color: 'text-emerald-600' },
                { label: 'Core Web Vitals Desktop', value: '98/100', sub: 'AAAA', color: 'text-emerald-600' },
                { label: 'Accessibilité WCAG', value: '88/100', sub: 'AA — Cible AAA', color: 'text-amber-600' },
                { label: 'Lighthouse Score', value: '97/100', sub: 'Excellent', color: 'text-emerald-600' },
                { label: 'SEO Score', value: '94/100', sub: 'Très bon', color: 'text-primary-600' },
                { label: 'Pages Indexées', value: '312', sub: 'Google', color: 'text-primary-600' },
                { label: 'Domain Authority', value: '58', sub: 'Cible 65+', color: 'text-amber-600' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-background-100 last:border-0">
                  <span className="text-xs text-foreground-600">{item.label}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-foreground-950">{item.value}</span>
                    <span className={`text-[10px] ml-1.5 ${item.color}`}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Quick Links to KOS Hubs ── */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
          <h2 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-links-line text-secondary-500"></i>
            Accès Rapides — Hubs KOS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <Link to="/kos-dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-dashboard-line text-primary-500"></i>Dashboard
            </Link>
            <Link to="/kos-bloc-total-compliance" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-radar-line text-accent-500"></i>Bloc Compliance
            </Link>
            <Link to="/kos-control-tower-automation" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-building-line text-secondary-500"></i>Control Tower
            </Link>
            <Link to="/kos-correction-engine" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-tools-line text-primary-500"></i>Correction
            </Link>
            <Link to="/kos-performance-seo-command" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-rocket-2-line text-accent-500"></i>Perf SEO
            </Link>
            <Link to="/kos-commandement-operationnel-unifie" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-100 text-xs text-foreground-700 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-government-line text-secondary-500"></i>Commandement
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}



