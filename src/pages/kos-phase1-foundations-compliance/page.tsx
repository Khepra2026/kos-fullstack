import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { usePhase1FoundationsCompliance } from '@/hooks/usePhase1FoundationsCompliance';
import type { ProcessMappingEntry, RegionalComplianceRequirement, AIFraudDetectionModule, InfrastructureMetric, Phase1CorrectiveAction, ComplianceKPI } from '@/mocks/kosPhase1FoundationsCompliance';

type TabId = 'cockpit' | 'processus' | 'conformite' | 'ia-fraude' | 'infrastructure' | 'plan-action' | 'kpis';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'processus', label: 'Cartographie Processus', icon: 'ri-flow-chart' },
  { id: 'conformite', label: 'Conformité Régionale', icon: 'ri-scales-3-line' },
  { id: 'ia-fraude', label: 'IA Détection Fraude', icon: 'ri-cpu-line' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'ri-server-line' },
  { id: 'plan-action', label: 'Plan d\'Action', icon: 'ri-tools-line' },
  { id: 'kpis', label: 'KPIs', icon: 'ri-bar-chart-grouped-line' },
];

function StatusLight({ status }: { status: string }) {
  const map: Record<string, string> = {
    critique: 'bg-red-500',
    critical: 'bg-red-500',
    warning: 'bg-amber-500',
    acceptable: 'bg-secondary-500',
    excellent: 'bg-accent-500',
    conforme: 'bg-accent-500',
    partiel: 'bg-amber-500',
    non_conforme: 'bg-red-500',
    déployé: 'bg-accent-500',
    en_cours: 'bg-secondary-500',
    planifié: 'bg-amber-500',
    non_démarré: 'bg-background-300',
  };
  return <span className={`w-2 h-2 rounded-full inline-block ${map[status] || 'bg-background-300'}`}></span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200',
    P1: 'bg-amber-100 text-amber-700 border-amber-200',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap ${map[priority]}`}>{priority}</span>;
}

function ComplianceBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    conforme: 'bg-accent-100 text-accent-700 border-accent-200',
    partiel: 'bg-amber-100 text-amber-700 border-amber-200',
    non_conforme: 'bg-red-100 text-red-700 border-red-200',
    non_applicable: 'bg-background-100 text-foreground-400 border-background-200',
  };
  const labels: Record<string, string> = {
    conforme: 'Conforme',
    partiel: 'Partiel',
    non_conforme: 'Non conforme',
    non_applicable: 'N/A',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[status]}`}>{labels[status] || status}</span>;
}

function MaturityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    inexistant: 'bg-red-100 text-red-700 border-red-200',
    informel: 'bg-amber-100 text-amber-700 border-amber-200',
    défini: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    maîtrisé: 'bg-accent-100 text-accent-700 border-accent-200',
    optimisé: 'bg-green-100 text-green-700 border-green-200',
  };
  const labels: Record<string, string> = {
    inexistant: 'Inexistant',
    informel: 'Informel',
    défini: 'Défini',
    maîtrisé: 'Maîtrisé',
    optimisé: 'Optimisé',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[level]}`}>{labels[level] || level}</span>;
}

function ProgressBar({ current, target }: { current: number; target: number }) {
  const pct = Math.round((current / target) * 100);
  const color = pct >= 80 ? 'bg-accent-500' : pct >= 60 ? 'bg-secondary-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
    </div>
  );
}

export default function KosPhase1FoundationsCompliancePage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const data = usePhase1FoundationsCompliance();

  return (
    <KOSHubLayout hubId={93}>
      <SeoHead
        title="KOS Phase 1 — Fondations & Conformité Command™ | KHEPRA EXPERTS"
        description="Centre de commandement Phase 1 : Cartographie des processus, Conformité BCEAO/COBAC/OHADA, IA Détection de Fraude, Infrastructure Technique & SOC 2. Audit Big Four PwC·Deloitte·EY·KPMG. Score 27/100 → cible 95/100. Budget 86 M FCFA."
        canonical="/kos-phase1-foundations-compliance"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <ScrollReveal>
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: 'KOS Phase 1 — Fondations & Conformité', href: '/kos-phase1-foundations-compliance' },
            ]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-red-700">SCORE GLOBAL : {data.scores.global_score}/100 — CIBLE {data.scores.global_target}/100</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary-100 border border-secondary-200">
                    <i className="ri-time-line text-secondary-600 text-xs"></i>
                    <span className="text-xs font-semibold text-secondary-700">PHASE 1 — T1/T2 2026</span>
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS Phase 1 — Fondations & Conformité Command
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Premier quadrant du plan de transformation Big Four — <strong className="text-foreground-800">Cartographie des 25 processus clés, Conformité BCEAO/COBAC/OHADA (12 exigences), Déploiement de 6 modules IA de détection de fraude, Optimisation infrastructure (temps de chargement &lt;2s, SOC 2 readiness)</strong>. Plan de 16 actions prioritaires sur 6 mois.
                </p>
                <p className="mt-3 text-sm text-foreground-500">
                  Mandat exécuté par le consortium PwC · Deloitte · EY · KPMG — Practice Technology & Regulatory Compliance
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'Cartographie Processus', score: data.scores.process_mapping.score, target: data.scores.process_mapping.target, icon: 'ri-flow-chart', color: 'text-amber-600' },
                  { label: 'Conformité Régionale', score: data.scores.regional_compliance.score, target: data.scores.regional_compliance.target, icon: 'ri-scales-3-line', color: 'text-red-600' },
                  { label: 'IA Détection Fraude', score: data.scores.ai_fraud_detection.score, target: data.scores.ai_fraud_detection.target, icon: 'ri-cpu-line', color: 'text-secondary-600' },
                  { label: 'Infrastructure', score: data.scores.infrastructure.score, target: data.scores.infrastructure.target, icon: 'ri-server-line', color: 'text-accent-600' },
                ].map((s) => (
                  <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-3 text-center min-w-[100px]">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                      <i className={`${s.icon} ${s.color} text-sm`}></i>
                    </div>
                    <p className={`text-xl font-bold ${s.color}`}>{s.score}</p>
                    <p className="text-[10px] text-foreground-400 leading-tight">{s.label}</p>
                    <p className="text-[9px] text-foreground-300">→ {s.target}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {activeTab === 'cockpit' && <CockpitTab data={data} />}
        {activeTab === 'processus' && <ProcessusTab data={data} />}
        {activeTab === 'conformite' && <ConformiteTab data={data} />}
        {activeTab === 'ia-fraude' && <IAFraudeTab data={data} />}
        {activeTab === 'infrastructure' && <InfrastructureTab data={data} />}
        {activeTab === 'plan-action' && <PlanActionTab data={data} />}
        {activeTab === 'kpis' && <KPIsTab data={data} />}
      </div>

      {/* Cross-links to other Phases */}
      <section className="border-t border-background-200 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-semibold text-foreground-600 mb-4">Plan de Transformation Big Four — Les 4 Phases</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a href="/kos-phase1-foundations-compliance" className="bg-primary-500 text-white rounded-xl p-4 flex items-center gap-3 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><i className="ri-building-2-line text-lg"></i></div>
              <div><p className="text-sm font-bold">Phase 1</p><p className="text-xs opacity-80">Fondations & Conformité ←</p></div>
            </a>
            <a href="/kos-francophone-africa-strategic-center" className="bg-background-50 border border-background-200 rounded-xl p-4 flex items-center gap-3 hover:border-foreground-300 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center"><i className="ri-lightbulb-line text-secondary-600 text-lg"></i></div>
              <div><p className="text-sm font-bold text-foreground-900">Phase 2</p><p className="text-xs text-foreground-500">Intelligence & Prospective</p></div>
            </a>
            <a href="/kos-global-visibility-command" className="bg-background-50 border border-background-200 rounded-xl p-4 flex items-center gap-3 hover:border-foreground-300 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center"><i className="ri-global-line text-accent-600 text-lg"></i></div>
              <div><p className="text-sm font-bold text-foreground-900">Phase 3</p><p className="text-xs text-foreground-500">Visibilité & Autorité</p></div>
            </a>
            <a href="/kos-esg-regulatory-alignment" className="bg-background-50 border border-background-200 rounded-xl p-4 flex items-center gap-3 hover:border-foreground-300 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><i className="ri-leaf-line text-green-600 text-lg"></i></div>
              <div><p className="text-sm font-bold text-foreground-900">Phase 4</p><p className="text-xs text-foreground-500">Gouvernance ESG & Excellence</p></div>
            </a>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score Global Phase 1</h2>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--background-200)" strokeWidth="12" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(data.scores.global_score / 100) * 427} 427`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-foreground-950">{data.scores.global_score}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.scores.global_target}/100</strong></p>
            <p className="text-sm text-foreground-500">Timeline : <strong className="text-foreground-700">6 mois (Q3-Q4 2026)</strong></p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Radar — 4 Piliers Phase 1</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: data.scores.process_mapping.label, score: data.scores.process_mapping.score, target: data.scores.process_mapping.target },
                { name: data.scores.regional_compliance.label, score: data.scores.regional_compliance.score, target: data.scores.regional_compliance.target },
                { name: data.scores.ai_fraud_detection.label, score: data.scores.ai_fraud_detection.score, target: data.scores.ai_fraud_detection.target },
                { name: data.scores.infrastructure.label, score: data.scores.infrastructure.score, target: data.scores.infrastructure.target },
              ].map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground-800">{p.name}</span>
                    <span className="text-sm font-bold text-red-600">{p.score} / {p.target}</span>
                  </div>
                  <ProgressBar current={p.score} target={p.target} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-3">
          {[
            { label: 'Processus à documenter', value: `${data.summary.documented_processes}/${data.summary.total_processes}`, icon: 'ri-flow-chart', color: 'text-amber-600' },
            { label: 'Exigences conformes', value: `${data.summary.compliant_requirements}/${data.summary.compliance_requirements}`, icon: 'ri-scales-3-line', color: 'text-red-600' },
            { label: 'Modules IA déployés', value: `${data.summary.ai_modules_deployed}/${data.summary.ai_modules_total}`, icon: 'ri-cpu-line', color: 'text-secondary-600' },
            { label: 'Actions Correctives', value: data.summary.total_actions, icon: 'ri-tools-line', color: 'text-red-600' },
            { label: 'Critiques (P0)', value: data.summary.critical_actions, icon: 'ri-alert-line', color: 'text-red-600' },
            { label: 'Budget Total', value: '86 M', icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
            { label: 'Timeline', value: '6 mois', icon: 'ri-calendar-line', color: 'text-secondary-600' },
            { label: 'ROI Projeté', value: '> 23x', icon: 'ri-funds-line', color: 'text-accent-600' },
          ].map((s) => (
            <div key={s.label} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-background-100">
                <i className={`${s.icon} ${s.color} text-sm`}></i>
              </div>
              <p className="text-xl font-bold text-foreground-950">{s.value}</p>
              <p className="text-[10px] text-foreground-400">{s.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Key Findings */}
      <ScrollReveal>
        <h2 className="text-lg font-bold text-foreground-950 mb-4">Constatations Critiques — Phase 0 Diagnostic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.findings.map((f) => (
            <div key={f.id} className="bg-red-50/30 border border-red-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">{f.id}</span>
                <div>
                  <h3 className="text-sm font-bold text-red-800 mb-1">{f.title}</h3>
                  <p className="text-xs text-red-700 mb-2">{f.detail}</p>
                  <p className="text-[10px] text-red-500 flex items-start gap-1">
                    <i className="ri-error-warning-line mt-0.5"></i> Impact : {f.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Executive Summary */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-4">Synthèse Exécutive — Consortium Big Four</h2>
          <div className="text-sm text-foreground-600 leading-relaxed space-y-3">
            <p><strong className="text-foreground-800">Mandat :</strong> {data.summary.mandate}</p>
            <p><strong className="text-foreground-800">Auditeurs :</strong> {data.summary.auditors}</p>
            <p><strong className="text-foreground-800">Constat :</strong> KOS affiche un score de fondations de <strong className="text-red-600">27/100</strong>, avec des lacunes critiques sur les 4 piliers. L'infrastructure web est sous-performante (4.2s de chargement, 3 vulnérabilités OWASP), la cartographie des processus est lacunaire (5/25 documentés), et les modules IA de détection de fraude sont inexistants.</p>
            <p><strong className="text-foreground-800">ROI :</strong> {data.summary.roi_narrative}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Roadmap Preview */}
      <ScrollReveal>
        <h2 className="text-lg font-bold text-foreground-950 mb-4">Roadmap — Q3 → Q4 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.milestones.map((q, idx) => (
            <div key={q.quarter} className={`bg-background-50 border rounded-xl p-6 ${idx === 0 ? 'border-red-200' : 'border-secondary-200'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${idx === 0 ? 'bg-red-100 text-red-700' : 'bg-secondary-100 text-secondary-700'}`}>{q.quarter}</div>
                <div>
                  <h3 className="text-base font-bold text-foreground-950">{q.label}</h3>
                  <p className="text-xs text-foreground-500">{q.period}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-2xl font-bold text-foreground-950">{q.score_target}</span>
                  <span className="text-[10px] text-foreground-400 block">/100</span>
                </div>
              </div>
              <div className="space-y-2">
                {q.deliverables.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                    <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                    {d}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-foreground-400 mt-4 text-right">Budget : {q.budget}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : CARTOGRAPHIE PROCESSUS
// ================================================================
function ProcessusTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Cartographie des Processus KOS</h2>
          <p className="text-sm text-foreground-500">
            {data.processes.length} processus évalués · {data.summary.documented_processes}/{data.summary.total_processes} documentés · Score moyen {data.scores.process_mapping.score}/100 → cible {data.scores.process_mapping.target}/100
          </p>
        </div>
      </ScrollReveal>

      {/* Process Domains Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {data.processDomains.map((d) => (
          <div key={d.domain} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
            <p className="text-xs font-semibold text-foreground-800 mb-2 leading-tight">{d.domain}</p>
            <p className="text-lg font-bold text-foreground-950">{d.avgScore}</p>
            <p className="text-[10px] text-foreground-400">→ {d.avgTarget} | {d.count} processus</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {d.criticalRisks > 0 && <span className="w-3 h-3 rounded-full bg-red-500 inline-block" title={`${d.criticalRisks} risques critiques`}></span>}
              {d.highRisks > 0 && <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" title={`${d.highRisks} risques élevés`}></span>}
            </div>
          </div>
        ))}
      </div>

      {/* Process Details */}
      <div className="space-y-4">
        {data.processes.map((proc: ProcessMappingEntry) => (
          <ScrollReveal key={proc.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              proc.risk_level === 'critique' ? 'border-red-200 bg-red-50/10' :
              proc.risk_level === 'élevé' ? 'border-amber-200' :
              proc.risk_level === 'modéré' ? 'border-secondary-200' :
              'border-background-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{proc.domain}</span>
                    <MaturityBadge level={proc.maturity_level} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      proc.risk_level === 'critique' ? 'bg-red-100 text-red-700 border-red-200' :
                      proc.risk_level === 'élevé' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      proc.risk_level === 'modéré' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      'bg-background-200 text-foreground-500 border-background-300'
                    }`}>
                      Risque : {proc.risk_level}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{proc.process_name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-foreground-500">Score :</span>
                    <span className="text-sm font-bold text-red-600">{proc.current_score}</span>
                    <span className="text-xs text-foreground-400">→</span>
                    <span className="text-sm font-bold text-accent-600">{proc.target_score}</span>
                    <div className="w-32 h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(proc.current_score / proc.target_score) * 100}%` }}></div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-3">{proc.current_state}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 mb-2">Gaps</h4>
                      <ul className="space-y-1">
                        {proc.gaps.map((g, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-close-circle-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-accent-700 mb-2">Recommandations</h4>
                      <ul className="space-y-1">
                        {proc.recommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 p-2 bg-background-100 rounded-lg text-[10px] flex justify-between">
                        <span className="text-foreground-400">Owner : <span className="text-foreground-700">{proc.responsible}</span></span>
                        <span className="text-foreground-400">Deadline : <span className="text-foreground-700">{proc.deadline}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 3 : CONFORMITÉ RÉGIONALE
// ================================================================
function ConformiteTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  const [frameworkFilter, setFrameworkFilter] = useState<string>('tous');
  const frameworks = ['tous', ...new Set(data.complianceReqs.map(r => r.framework))];

  const filtered = frameworkFilter === 'tous'
    ? data.complianceReqs
    : data.complianceReqs.filter(r => r.framework === frameworkFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Conformité BCEAO / COBAC / OHADA</h2>
            <p className="text-sm text-foreground-500">
              {data.complianceReqs.length} exigences · {data.summary.compliant_requirements} conformes · Score {data.scores.regional_compliance.score}/100
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {frameworks.map((fw) => (
              <button key={fw} onClick={() => setFrameworkFilter(fw)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  frameworkFilter === fw ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {fw === 'tous' ? 'Tous' : fw}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Framework summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.complianceByFramework.map((fw) => (
          <div key={fw.framework} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
            <p className="text-sm font-bold text-foreground-950 mb-2">{fw.framework}</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span className="text-accent-600 font-bold">{fw.compliant}</span>
              <span className="text-amber-600 font-bold">{fw.partial}</span>
              <span className="text-red-600 font-bold">{fw.nonCompliant}</span>
            </div>
            <p className="text-[10px] text-foreground-400 mt-1">Conforme / Partiel / Non Conforme</p>
          </div>
        ))}
      </div>

      {/* Requirements list */}
      <div className="space-y-3">
        {filtered.map((req: RegionalComplianceRequirement) => (
          <ScrollReveal key={req.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              req.status === 'non_conforme' ? 'border-red-200 bg-red-50/10' :
              req.status === 'partiel' ? 'border-amber-200' :
              'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{req.framework}</span>
                    <span className="text-[10px] text-foreground-400 font-mono">{req.reference}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 border border-secondary-200">{req.category}</span>
                    <ComplianceBadge status={req.status} />
                    <PriorityBadge priority={req.priority} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{req.requirement}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block mb-1">Gap</span>
                      <span className="text-foreground-600">{req.gap_description}</span>
                    </div>
                    <div className="p-2 bg-accent-50 rounded-lg">
                      <span className="text-[10px] text-accent-600 block mb-1">Action de remédiation</span>
                      <span className="text-foreground-600">{req.remediation_action}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-foreground-400 flex-wrap">
                    <span><strong className="text-foreground-500">Deadline :</strong> {req.deadline}</span>
                    <span><strong className="text-foreground-500">Owner :</strong> {req.owner}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 4 : IA DÉTECTION FRAUDE
// ================================================================
function IAFraudeTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Modules IA de Détection de Fraude & Conformité</h2>
          <p className="text-sm text-foreground-500">
            {data.aiModules.length} modules · {data.aiModuleStats.deployed} déployés · {data.aiModuleStats.inProgress} en cours · Implémentation moyenne {data.aiModuleStats.avgImplementation}%
          </p>
        </div>
      </ScrollReveal>

      {/* Stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{data.aiModuleStats.p0Count}</p>
          <p className="text-[10px] text-red-500 font-semibold">Priorité P0</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{data.aiModuleStats.p1Count}</p>
          <p className="text-[10px] text-amber-500 font-semibold">Priorité P1</p>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.aiModuleStats.p2Count}</p>
          <p className="text-[10px] text-secondary-500 font-semibold">Priorité P2</p>
        </div>
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-accent-600">{data.aiModuleStats.deployed}</p>
          <p className="text-[10px] text-accent-500 font-semibold">Déployés</p>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.aiModuleStats.inProgress}</p>
          <p className="text-[10px] text-secondary-500 font-semibold">En cours</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground-950">{data.aiModuleStats.avgImplementation}%</p>
          <p className="text-[10px] text-foreground-400">Implémentation moyenne</p>
        </div>
      </div>

      {/* Module cards */}
      <div className="space-y-4">
        {data.aiModules.map((mod: AIFraudDetectionModule) => (
          <ScrollReveal key={mod.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              mod.status === 'déployé' ? 'border-accent-200 bg-accent-50/10' :
              mod.status === 'en_cours' ? 'border-secondary-200 bg-secondary-50/10' :
              mod.status === 'planifié' ? 'border-amber-200' :
              'border-background-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <PriorityBadge priority={mod.priority} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      mod.status === 'déployé' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                      mod.status === 'en_cours' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      mod.status === 'planifié' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-background-200 text-foreground-500 border-background-300'
                    }`}>
                      {mod.status === 'déployé' ? 'Déployé' : mod.status === 'en_cours' ? 'En cours' : mod.status === 'planifié' ? 'Planifié' : 'Non démarré'}
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-[10px] text-foreground-400">Implémentation :</span>
                      <div className="w-24 h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${mod.implementation_level > 60 ? 'bg-accent-500' : mod.implementation_level > 30 ? 'bg-secondary-500' : 'bg-red-500'}`} style={{ width: `${mod.implementation_level}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-foreground-700">{mod.implementation_level}%</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{mod.module_name}</h3>
                  <p className="text-xs text-foreground-500 mb-3">{mod.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Technologie</span>
                      <span className="text-foreground-700 font-medium">{mod.technology}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Taux détection</span>
                      <span className="text-foreground-700 font-medium">{mod.detection_rate}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Faux positifs</span>
                      <span className="text-foreground-700 font-medium">{mod.false_positive_rate}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Deadline</span>
                      <span className="text-foreground-700 font-medium">{mod.deadline}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-background-100 rounded-lg text-[10px]">
                    <span className="text-foreground-400">Sources : <span className="text-foreground-700">{mod.data_sources}</span></span>
                    <span className="text-foreground-400 ml-4">KPI : <span className="text-foreground-700">{mod.kpi}</span></span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 5 : INFRASTRUCTURE
// ================================================================
function InfrastructureTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  const [catFilter, setCatFilter] = useState<string>('tous');
  const categories = ['tous', ...new Set(data.infraMetrics.map(m => m.category))];

  const filtered = catFilter === 'tous'
    ? data.infraMetrics
    : data.infraMetrics.filter(m => m.category === catFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Infrastructure Technique & SOC 2</h2>
            <p className="text-sm text-foreground-500">
              {data.infraMetrics.length} métriques · Score {data.scores.infrastructure.score}/100 → cible {data.scores.infrastructure.target}/100
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  catFilter === c ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {c === 'tous' ? 'Tous' : c}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.infraByCategory.map((cat) => (
          <div key={cat.category} className="bg-background-50 border border-background-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">{cat.category}</h3>
            <div className="flex items-center gap-3 text-xs">
              {cat.critical > 0 && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-semibold">{cat.critical} critiques</span>}
              {cat.warning > 0 && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-semibold">{cat.warning} warning</span>}
              {cat.acceptable > 0 && <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full font-semibold">{cat.acceptable} acceptable</span>}
              {cat.excellent > 0 && <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full font-semibold">{cat.excellent} excellent</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Metrics list */}
      <div className="space-y-3">
        {filtered.map((m: InfrastructureMetric) => (
          <ScrollReveal key={m.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              m.status === 'critique' ? 'border-red-200 bg-red-50/10' :
              m.status === 'warning' ? 'border-amber-200' :
              m.status === 'acceptable' ? 'border-secondary-200' :
              'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{m.category}</span>
                    <StatusLight status={m.status} />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      m.status === 'critique' ? 'bg-red-100 text-red-700 border-red-200' :
                      m.status === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      m.status === 'acceptable' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      'bg-accent-100 text-accent-700 border-accent-200'
                    }`}>
                      {m.status === 'critique' ? 'Critique' : m.status === 'warning' ? 'Warning' : m.status === 'acceptable' ? 'Acceptable' : 'Excellent'}
                    </span>
                    <PriorityBadge priority={m.priority} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{m.metric_name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-background-100 rounded-lg px-3 py-2 text-center">
                      <span className="text-[10px] text-foreground-400 block">Actuel</span>
                      <span className="text-lg font-bold text-red-600">{m.current_value}</span>
                      <span className="text-[9px] text-foreground-400 block">{m.unit}</span>
                    </div>
                    <div className="text-foreground-400 text-lg">→</div>
                    <div className="bg-accent-50 rounded-lg px-3 py-2 text-center">
                      <span className="text-[10px] text-foreground-400 block">Cible</span>
                      <span className="text-lg font-bold text-accent-600">{m.target_value}</span>
                      <span className="text-[9px] text-foreground-400 block">{m.unit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-500 mb-2">{m.action_required}</p>
                  <div className="text-[10px] text-foreground-400">
                    <span>Deadline : <strong className="text-foreground-600">{m.deadline}</strong></span>
                    <span className="ml-4">Owner : <strong className="text-foreground-600">{m.owner}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 6 : PLAN D'ACTION
// ================================================================
function PlanActionTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  const [pillarFilter, setPillarFilter] = useState<string>('tous');
  const pillars = ['tous', ...new Set(data.actions.map(a => a.pillar))];

  const filtered = pillarFilter === 'tous'
    ? data.actions
    : data.actions.filter(a => a.pillar === pillarFilter);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan d'Action — 16 Actions Priorisées</h2>
            <p className="text-sm text-foreground-500">
              {data.actionStats.total} actions · {data.actionStats.p0} P0 · {data.actionStats.p1} P1 · {data.actionStats.p2} P2 · Budget {data.actionStats.totalBudget.toLocaleString()} FCFA
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {pillars.map((p) => (
              <button key={p} onClick={() => setPillarFilter(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  pillarFilter === p ? 'bg-foreground-950 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}>
                {p === 'tous' ? 'Tous' : p}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Action count cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{data.actionStats.p0}</p>
          <p className="text-[10px] text-red-500 font-semibold">Priorité P0</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{data.actionStats.p1}</p>
          <p className="text-[10px] text-amber-500 font-semibold">Priorité P1</p>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-secondary-600">{data.actionStats.p2}</p>
          <p className="text-[10px] text-secondary-500 font-semibold">Priorité P2</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-accent-600">{data.actionStats.completed}</p>
          <p className="text-[10px] text-foreground-400">Complétées</p>
        </div>
        <div className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground-950">{(data.actionStats.totalBudget / 1000000).toFixed(0)} M</p>
          <p className="text-[10px] text-foreground-400">Budget FCFA</p>
        </div>
      </div>

      {/* Actions list */}
      <div className="space-y-3">
        {filtered.map((action: Phase1CorrectiveAction) => (
          <ScrollReveal key={action.id}>
            <div className={`bg-background-50 border rounded-xl p-5 ${
              action.status === 'completed' ? 'border-accent-200 bg-accent-50/10' :
              action.status === 'in_progress' ? 'border-secondary-200 bg-secondary-50/10' :
              'border-background-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <PriorityBadge priority={action.priority} />
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{action.pillar}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      action.status === 'completed' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                      action.status === 'in_progress' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      'bg-background-200 text-foreground-500 border-background-300'
                    }`}>
                      {action.status === 'completed' ? 'Complété' : action.status === 'in_progress' ? 'En cours' : 'Non débuté'}
                    </span>
                    {action.progress > 0 && action.progress < 100 && (
                      <div className="w-24 h-1.5 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-500 rounded-full" style={{ width: `${action.progress}%` }}></div>
                      </div>
                    )}
                    <span className="text-[10px] text-foreground-400 ml-auto">Action #{action.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{action.action}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Responsable</span>
                      <span className="font-medium text-foreground-800">{action.responsible}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Période</span>
                      <span className="font-medium text-foreground-800">{action.start_date} → {action.end_date}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Budget</span>
                      <span className="font-medium text-foreground-800">{action.budget}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block">Résultat Attendu</span>
                      <span className="font-medium text-foreground-800 text-[11px]">{action.expected_outcome}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[10px] text-foreground-400">
                    <span className="font-medium text-accent-600">KPI : {action.kpi}</span>
                    {action.dependencies.length > 0 && (
                      <span>Dépendances : actions {action.dependencies.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// TAB 7 : KPIs
// ================================================================
function KPIsTab({ data }: { data: ReturnType<typeof usePhase1FoundationsCompliance> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Tableau de Bord KPIs — Phase 1</h2>
          <p className="text-sm text-foreground-500">
            {data.kpis.length} indicateurs clés de performance — Tracking continu de la transformation Phase 1
          </p>
        </div>
      </ScrollReveal>

      {/* KPIs by Category */}
      {data.kpisByCategory.map((group) => (
        <ScrollReveal key={group.category}>
          <div className="bg-background-50 border border-background-200 rounded-xl">
            <div className="px-6 py-4 border-b border-background-200">
              <h3 className="text-base font-bold text-foreground-950 flex items-center gap-2">
                <i className="ri-folder-line text-foreground-400"></i>
                {group.category}
                <span className="text-xs text-foreground-400 font-normal ml-2">{group.items.length} KPIs</span>
              </h3>
            </div>
            <div className="divide-y divide-background-100">
              {group.items.map((kpi: ComplianceKPI) => (
                <div key={kpi.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground-800">{kpi.kpi_name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                      <span><i className="ri-refresh-line mr-1"></i>{kpi.frequency}</span>
                      <span><i className="ri-time-line mr-1"></i>{kpi.last_updated}</span>
                      <span><i className="ri-user-line mr-1"></i>{kpi.responsible}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-lg font-bold text-red-600">{kpi.current_value}</span>
                    <i className={`text-sm ${
                      kpi.trend === 'up' ? 'ri-arrow-up-line text-accent-500' :
                      kpi.trend === 'down' ? 'ri-arrow-down-line text-red-500' :
                      'ri-subtract-line text-foreground-400'
                    }`}></i>
                    <span className="text-lg font-bold text-accent-600">{kpi.target_value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}

      {/* Global Progress */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-base font-bold text-foreground-950 mb-6">Progression Globale Phase 1 — Trajectoire 27 → 95</h3>
          <div className="flex items-end gap-3 h-40">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-red-600">27</span>
              <div className="w-full rounded-t-md bg-red-500 h-[45px]"></div>
              <span className="text-[9px] text-foreground-400">Juin 2026</span>
            </div>
            {data.milestones.map((q, idx) => (
              <div key={q.quarter} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-foreground-800">{q.score_target}</span>
                <div className="w-full rounded-t-md transition-all" style={{
                  height: `${(q.score_target / 100) * 140}px`,
                  backgroundColor: idx === 0 ? '#ef4444' : '#f59e0b',
                }}></div>
                <span className="text-[9px] text-foreground-400">{q.quarter} 2026</span>
              </div>
            ))}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-accent-600">95</span>
              <div className="w-full rounded-t-md bg-accent-500 h-[133px]"></div>
              <span className="text-[9px] text-foreground-400">Cible Q2 2027</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}