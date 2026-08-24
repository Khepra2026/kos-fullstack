import { useState } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import hubLayout from '@/components/feature/hubLayout';
import { Breadcrumb } from '@/components/feature/Breadcrumb';
import ScrollReveal from '@/components/feature/ScrollReveal';
import { useESGRegulatoryAlignment } from '@/hooks/useESGRegulatoryAlignment';
import type { ESGGovernanceAssessment, AMLCFTRequirement, AuditCommitteeSetup, ISO27001Control, CorrectiveAction } from '@/mocks/eSGRegulatoryAlignment';

type TabId = 'cockpit' | 'esg' | 'aml-cft' | 'comites' | 'iso27001' | 'plan-correctif' | 'roadmap';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { id: 'esg', label: 'ESG Gouvernance', icon: 'ri-leaf-line' },
  { id: 'aml-cft', label: 'AML/CFT', icon: 'ri-shield-flash-line' },
  { id: 'comites', label: 'Comités d\'Audit', icon: 'ri-team-line' },
  { id: 'iso27001', label: 'ISO 27001', icon: 'ri-lock-line' },
  { id: 'plan-correctif', label: 'Plan Correctif', icon: 'ri-tools-line' },
  { id: 'roadmap', label: 'Roadmap', icon: 'ri-road-map-line' },
];

function SeverityBadge({ severity }: { severity: 'critical' | 'major' | 'moderate' | 'minor' }) {
  const map: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    major: 'bg-amber-100 text-amber-700 border-amber-200',
    moderate: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    minor: 'bg-accent-100 text-accent-700 border-accent-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[severity]}`}>{severity}</span>;
}

function ComplianceBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    compliant: 'bg-accent-100 text-accent-700 border-accent-200',
    partial: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    non_compliant: 'bg-red-100 text-red-700 border-red-200',
    not_applicable: 'bg-background-100 text-foreground-400 border-background-200',
  };
  const labels: Record<string, string> = {
    compliant: 'Conforme',
    partial: 'Partiel',
    non_compliant: 'Non conforme',
    not_applicable: 'N/A',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[status]}`}>{labels[status] || status}</span>;
}

function ISOStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    conform: 'bg-accent-100 text-accent-700 border-accent-200',
    non_conform: 'bg-red-100 text-red-700 border-red-200',
    major_nc: 'bg-red-200 text-red-800 border-red-300',
    minor_nc: 'bg-amber-100 text-amber-700 border-amber-200',
    not_started: 'bg-background-200 text-foreground-500 border-background-300',
  };
  const labels: Record<string, string> = {
    conform: 'Conforme',
    non_conform: 'NC',
    major_nc: 'NC Majeure',
    minor_nc: 'NC Mineure',
    not_started: 'Non débuté',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${map[status]}`}>{labels[status] || status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    P0: 'bg-red-100 text-red-700 border-red-200 font-bold',
    P1: 'bg-amber-100 text-amber-700 border-amber-200 font-bold',
    P2: 'bg-secondary-100 text-secondary-700 border-secondary-200 font-bold',
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-amber-100 text-amber-700 border-amber-200',
    medium: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    low: 'bg-accent-100 text-accent-700 border-accent-200',
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${map[priority]}`}>{priority}</span>;
}

function ProgressBar({ current, target, size = 'sm' }: { current: number; target: number; size?: 'sm' | 'lg' }) {
  const pct = Math.round((current / target) * 100);
  const color = pct >= 80 ? 'bg-accent-500' : pct >= 60 ? 'bg-secondary-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className={`w-full ${size === 'lg' ? 'h-3' : 'h-2'} bg-background-200 rounded-full overflow-hidden`}>
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
    </div>
  );
}

export default function eSGRegulatoryAlignmentPage() {
  const [activeTab, setActiveTab] = useState<TabId>('cockpit');
  const data = useESGRegulatoryAlignment();

  return (
    <hubLayout hubId={92}>
      <SeoHead
        title="KOS ESG & Regulatory Alignment Command — Alignement International | KHEPRA EXPERTS"
        description="Centre de commandement unifié pour l'alignement KOS sur les standards internationaux : ESG gouvernance, AML/CFT BCEAO-COBAC-OHADA, comités d'audit, ISO/IEC 27001. Audit Big Four PwC·Deloitte·EY·KPMG. Score 28/100 → cible 95/100. Budget 92.5 M FCFA."
        canonical="/kos-esg-regulatory-alignment"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background-50 border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-18">
          <ScrollReveal>
            <Breadcrumb items={[
              { label: 'Accueil', href: '/' },
              { label: 'KOS ESG & Regulatory Alignment', href: '/kos-esg-regulatory-alignment' },
            ]} />
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 border border-red-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-red-700">SCORE GLOBAL : {data.scores.global_score}/100 — CIBLE {data.scores.global_target}/100</span>
                  </span>
                  <span className="text-xs text-foreground-400">Phase 0 — Diagnostic initial — {data.summary.date}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
                  KOS ESG & Regulatory Alignment Command
                </h1>
                <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
                  Audit complet d'alignement de KOS sur les standards internationaux. Quatre piliers critiques — <strong className="text-foreground-800">ESG dans la gouvernance, AML/CFT (BCEAO, COBAC, OHADA, GAFI), comités d'audit & reporting ESG, certification ISO/IEC 27001:2022</strong>. Plan correctif de 17 actions sur 12 mois pour un budget de 92.5 M FCFA.
                </p>
                <p className="mt-3 text-sm text-foreground-500">
                  Mandat exécuté par le consortium PwC · Deloitte · EY · KPMG — Practice ESG & Regulatory Compliance
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
                {[
                  { label: 'ESG Gouvernance', score: data.scores.esg_governance.score, target: data.scores.esg_governance.target, icon: 'ri-leaf-line', color: 'text-green-600' },
                  { label: 'AML/CFT', score: data.scores.aml_cft.score, target: data.scores.aml_cft.target, icon: 'ri-shield-flash-line', color: 'text-red-600' },
                  { label: 'Comités Audit', score: data.scores.audit_committees.score, target: data.scores.audit_committees.target, icon: 'ri-team-line', color: 'text-amber-600' },
                  { label: 'ISO 27001', score: data.scores.iso_27001.score, target: data.scores.iso_27001.target, icon: 'ri-lock-line', color: 'text-secondary-600' },
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
        {activeTab === 'esg' && <ESGTab data={data} />}
        {activeTab === 'aml-cft' && <AMLCFTTab data={data} />}
        {activeTab === 'comites' && <ComitesTab data={data} />}
        {activeTab === 'iso27001' && <ISO27kTab data={data} />}
        {activeTab === 'plan-correctif' && <PlanCorrectifTab data={data} />}
        {activeTab === 'roadmap' && <RoadmapTab data={data} />}
      </div>
    </hubLayout>
  );
}

// ================================================================
// TAB 1 : COCKPIT
// ================================================================
function CockpitTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  return (
    <div className="space-y-10">
      {/* Score global */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground-950 mb-6">Score Global d'Alignement</h2>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--background-200)" strokeWidth="12" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--red-500)" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(data.scores.global_score / 100) * 427} 427`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-foreground-950">{data.scores.global_score}</span>
                <span className="text-xs text-foreground-400">/100</span>
              </div>
            </div>
            <p className="text-sm text-foreground-500">Cible : <strong className="text-accent-600">{data.scores.global_target}/100</strong></p>
            <p className="text-sm text-foreground-500">Timeline : <strong className="text-foreground-700">{data.summary.timeline}</strong></p>
          </div>
          <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground-950 mb-5">Radar d'Alignement — 4 Piliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'ESG Gouvernance', score: data.scores.esg_governance.score, target: data.scores.esg_governance.target },
                { name: 'AML/CFT (BCEAO/COBAC/GAFI)', score: data.scores.aml_cft.score, target: data.scores.aml_cft.target },
                { name: 'Comités d\'Audit & Reporting', score: data.scores.audit_committees.score, target: data.scores.audit_committees.target },
                { name: 'ISO/IEC 27001:2022', score: data.scores.iso_27001.score, target: data.scores.iso_27001.target },
              ].map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground-800">{p.name}</span>
                    <span className="text-sm font-bold text-red-600">{p.score} / {p.target}</span>
                  </div>
                  <ProgressBar current={p.score} target={p.target} size="lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Key Findings */}
      <ScrollReveal>
        <h2 className="text-lg font-bold text-foreground-950 mb-4">Constatations Critiques — Phase 0 Diagnostic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.criticalFindings.map((f) => (
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

      {/* Quick Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {[
            { label: 'Actions Correctives', value: data.summary.total_actions, icon: 'ri-tools-line', color: 'text-red-600' },
            { label: 'Critiques (P0)', value: data.summary.critical_actions, icon: 'ri-alert-line', color: 'text-red-600' },
            { label: 'Priorité Haute', value: data.summary.high_actions, icon: 'ri-arrow-up-line', color: 'text-amber-600' },
            { label: 'Budget Total', value: '92.5 M', icon: 'ri-money-dollar-circle-line', color: 'text-foreground-700' },
            { label: 'Timeline', value: '12 mois', icon: 'ri-calendar-line', color: 'text-secondary-600' },
            { label: 'Score Cible', value: '95/100', icon: 'ri-trophy-line', color: 'text-accent-600' },
            { label: 'ROI Projeté', value: '> 27x', icon: 'ri-funds-line', color: 'text-accent-600' },
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

      {/* Executive Summary */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 mb-4">Synthèse Exécutive — Consortium Big Four</h2>
          <div className="text-sm text-foreground-600 leading-relaxed space-y-3">
            <p><strong className="text-foreground-800">Mandat :</strong> {data.summary.mandate}</p>
            <p><strong className="text-foreground-800">Auditeurs :</strong> {data.summary.auditors}</p>
            <p><strong className="text-foreground-800">Constat :</strong> KOS affiche un score d'alignement global de <strong className="text-red-600">28/100</strong>, loin de la cible <strong className="text-accent-600">95/100</strong>. Les 4 piliers présentent des lacunes critiques nécessitant une intervention immédiate.</p>
            <p><strong className="text-foreground-800">ROI :</strong> {data.summary.roi_narrative}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ================================================================
// TAB 2 : ESG GOUVERNANCE
// ================================================================
function ESGTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">ESG Intégré dans la Gouvernance</h2>
          <p className="text-sm text-foreground-500">
            {data.esgAssessment.length} domaines évalués · Score moyen {data.esgStats.avgCurrentScore}/100 → cible {data.esgStats.avgTargetScore}/100 · {data.esgStats.criticalGaps} gaps critiques · Budget {data.esgStats.totalBudget.toLocaleString()} FCFA
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-6">
        {data.esgAssessment.map((domain: ESGGovernanceAssessment) => (
          <ScrollReveal key={domain.id}>
            <div className={`bg-background-50 border rounded-xl p-6 ${
              domain.gap_severity === 'critical' ? 'border-red-200' :
              domain.gap_severity === 'major' ? 'border-amber-200' :
              'border-background-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-base font-bold text-foreground-950">{domain.domain}</h3>
                    <SeverityBadge severity={domain.gap_severity} />
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-foreground-500">Score :</span>
                      <span className="text-sm font-bold text-red-600">{domain.current_score}</span>
                      <span className="text-xs text-foreground-400">→</span>
                      <span className="text-sm font-bold text-accent-600">{domain.target_score}</span>
                    </div>
                  </div>
                  <div className="w-full mb-4">
                    <div className="h-2 bg-background-200 rounded-full overflow-hidden">
                      <div className="h-full transition-all duration-700 flex" style={{ width: '100%' }}>
                        <div className="h-full bg-red-500 rounded-l-full" style={{ width: `${(domain.current_score / domain.target_score) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-700 mb-2">État Actuel</h4>
                      <p className="text-xs text-foreground-500 mb-3">{domain.current_state}</p>
                      <h4 className="text-xs font-semibold text-red-600 mb-2">Observations</h4>
                      <ul className="space-y-1">
                        {domain.observations.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-close-circle-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-accent-700 mb-2">Recommandations</h4>
                      <ul className="space-y-1">
                        {domain.recommendations.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-background-100 rounded-lg space-y-1 text-xs">
                        <div className="flex justify-between"><span className="text-foreground-500">Responsable</span><span className="font-medium text-foreground-800">{domain.responsible}</span></div>
                        <div className="flex justify-between"><span className="text-foreground-500">Timeline</span><span className="font-medium text-foreground-800">{domain.timeline}</span></div>
                        <div className="flex justify-between"><span className="text-foreground-500">Budget</span><span className="font-medium text-foreground-800">{domain.budget}</span></div>
                        <div className="flex justify-between"><span className="text-foreground-500">KPI Cible</span><span className="font-medium text-accent-700">{domain.kpi_target}</span></div>
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
// TAB 3 : AML/CFT
// ================================================================
function AMLCFTTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  const [frameworkFilter, setFrameworkFilter] = useState<string>('tous');

  const filtered = frameworkFilter === 'tous'
    ? data.amlRequirements
    : data.amlRequirements.filter(r => r.framework === frameworkFilter);

  const frameworks = ['tous', ...new Set(data.amlRequirements.map(r => r.framework))];

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Conformité AML/CFT — Référentiels Régionaux</h2>
            <p className="text-sm text-foreground-500">
              {data.amlRequirements.length} exigences couvrant BCEAO · COBAC · GAFI · OHADA · Score actuel {data.scores.aml_cft.score}/100
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
        {data.amlByFramework.map((fw) => (
          <div key={fw.framework} className="bg-background-50 border border-background-200 rounded-xl p-4 text-center">
            <p className="text-sm font-bold text-foreground-950 mb-2">{fw.framework}</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span className="text-accent-600 font-bold">{fw.compliant}</span>
              <span className="text-secondary-600 font-bold">{fw.partial}</span>
              <span className="text-red-600 font-bold">{fw.nonCompliant}</span>
            </div>
            <p className="text-[10px] text-foreground-400 mt-1">Conforme / Partiel / Non Conforme</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req: AMLCFTRequirement) => (
          <ScrollReveal key={req.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
              req.status === 'non_compliant' ? 'border-red-200 bg-red-50/10' :
              req.status === 'partial' ? 'border-secondary-200' :
              'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{req.framework}</span>
                    <span className="text-[10px] text-foreground-400 font-mono">{req.reference}</span>
                    <ComplianceBadge status={req.status} />
                    <PriorityBadge priority={req.priority} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{req.requirement}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block mb-1">État</span>
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
// TAB 4 : COMITÉS D'AUDIT
// ================================================================
function ComitesTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Comités d'Audit & Reporting ESG</h2>
          <p className="text-sm text-foreground-500">
            {data.committees.length} comités à déployer · 4 chartes à rédiger · Score actuel {data.scores.audit_committees.score}/100 → cible {data.scores.audit_committees.target}/100
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-6">
        {data.committees.map((committee: AuditCommitteeSetup) => (
          <ScrollReveal key={committee.id}>
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-base font-bold text-foreground-950">{committee.committee_name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      committee.charter_status === 'approved' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                      committee.charter_status === 'draft' ? 'bg-secondary-100 text-secondary-700 border-secondary-200' :
                      'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      Charte : {committee.charter_status === 'approved' ? 'Approuvée' : committee.charter_status === 'draft' ? 'Brouillon' : 'Absente'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200">{committee.meeting_frequency}</span>
                    <span className="text-xs text-accent-600 font-medium">Go-live : {committee.go_live}</span>
                  </div>

                  <p className="text-xs text-foreground-500 mb-4">{committee.mandate}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground-700 mb-3">Composition Cible</h4>
                      <div className="space-y-2">
                        {committee.members.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-background-100 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-background-200 flex items-center justify-center text-xs font-bold text-foreground-500">{m.name.charAt(0)}</div>
                            <div>
                              <p className="text-xs font-medium text-foreground-800">{m.name}</p>
                              <p className="text-[10px] text-foreground-400">{m.role} · {m.independence}</p>
                              <p className="text-[10px] text-foreground-300">{m.expertise}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 mb-3">Gaps Identifiés</h4>
                      <ul className="space-y-1.5">
                        {committee.gaps.map((g, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-error-warning-line text-red-400 mt-0.5 flex-shrink-0"></i>
                            {g}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                        <span className="text-[10px] text-secondary-600 font-semibold">Phase de déploiement : {committee.deployment_phase}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-foreground-500">
                    <strong className="text-foreground-600">Composition cible :</strong> {committee.composition_target}
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
// TAB 5 : ISO 27001
// ================================================================
function ISO27kTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Certification ISO/IEC 27001:2022</h2>
          <p className="text-sm text-foreground-500">
            {data.isoControls.length} contrôles évalués couvrant 6 domaines · Niveau d'implémentation moyen {Math.round(data.isoControls.reduce((s, c) => s + c.implementation_level, 0) / data.isoControls.length)}% · Score actuel {data.scores.iso_27001.score}/100
          </p>
        </div>
      </ScrollReveal>

      {/* Domain overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.isoDomains.map((domain) => (
          <div key={domain.domain} className="bg-background-50 border border-background-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">{domain.domain}</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${domain.avgImplementation}%` }}></div>
              </div>
              <span className="text-xs font-bold text-foreground-700">{domain.avgImplementation}%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-accent-600 font-medium">{domain.conformCount} conformes</span>
              <span className="text-red-600 font-medium">{domain.nonConformCount} non conformes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls detail */}
      <div className="space-y-3">
        {data.isoControls.map((ctrl: ISO27001Control) => (
          <ScrollReveal key={ctrl.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
              ctrl.status === 'not_started' ? 'border-background-200' :
              ctrl.status === 'major_nc' || ctrl.status === 'non_conform' ? 'border-red-200 bg-red-50/10' :
              'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 border border-background-200 font-semibold">{ctrl.domain}</span>
                    <span className="text-[10px] font-mono text-foreground-400">{ctrl.control_ref}</span>
                    <ISOStatusBadge status={ctrl.status} />
                    <PriorityBadge priority={ctrl.priority} />
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-[10px] text-foreground-400">Implémentation :</span>
                      <div className="w-20 h-2 bg-background-200 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${ctrl.implementation_level}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-foreground-700">{ctrl.implementation_level}%</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{ctrl.control_name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-2 bg-background-100 rounded-lg">
                      <span className="text-[10px] text-foreground-400 block mb-1">Action Requise</span>
                      <span className="text-foreground-600">{ctrl.action_required}</span>
                    </div>
                    <div className="p-2 bg-background-100 rounded-lg flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-foreground-400 block mb-1">Preuve</span>
                        <span className={`text-[10px] font-semibold ${
                          ctrl.evidence_status === 'available' ? 'text-accent-600' :
                          ctrl.evidence_status === 'partial' ? 'text-amber-600' :
                          'text-red-600'
                        }`}>
                          {ctrl.evidence_status === 'available' ? 'Disponible' : ctrl.evidence_status === 'partial' ? 'Partielle' : 'Absente'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground-400 block mb-1">Deadline</span>
                        <span className="text-xs font-medium text-foreground-700">{ctrl.deadline}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground-400 block mb-1">Owner</span>
                        <span className="text-xs font-medium text-foreground-700">{ctrl.owner}</span>
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
// TAB 6 : PLAN CORRECTIF
// ================================================================
function PlanCorrectifTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
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
            <h2 className="text-xl font-bold text-foreground-950 mb-1">Plan Correctif — 17 Actions Priorisées</h2>
            <p className="text-sm text-foreground-500">
              {data.actionStats.total} actions · {data.actionStats.p0} P0 · {data.actionStats.p1} P1 · {data.actionStats.p2} P2 · Budget total {data.actionStats.totalBudget.toLocaleString()} FCFA
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

      {/* Stats cards */}
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
          <p className="text-2xl font-bold text-foreground-950">{(data.actionStats.totalBudget / 1000000).toFixed(1)} M</p>
          <p className="text-[10px] text-foreground-400">Budget Total FCFA</p>
        </div>
      </div>

      {/* Actions list */}
      <div className="space-y-3">
        {filtered.map((action: CorrectiveAction) => (
          <ScrollReveal key={action.id}>
            <div className={`bg-background-50 border rounded-xl p-5 transition-colors ${
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
// TAB 7 : ROADMAP TRIMESTRIELLE
// ================================================================
function RoadmapTab({ data }: { data: ReturnType<typeof useESGRegulatoryAlignment> }) {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div>
          <h2 className="text-xl font-bold text-foreground-950 mb-1">Roadmap Trimestrielle — Q3 2026 → Q2 2027</h2>
          <p className="text-sm text-foreground-500">
            {data.milestones.length} trimestres · Trajectoire {data.scores.global_score} → {data.milestones[0].score_target} → {data.milestones[1].score_target} → {data.milestones[2].score_target} → {data.scores.global_target} · Budget total 92.5 M FCFA
          </p>
        </div>
      </ScrollReveal>

      {/* Score trajectory visual */}
      <ScrollReveal>
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-6">Trajectoire du Score Global</h3>
          <div className="flex items-end gap-3 h-48">
            {/* Starting point */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-red-600">{data.scores.global_score}</span>
              <div className="w-full rounded-t-md bg-red-500 h-[42px] transition-all duration-700"></div>
              <span className="text-[9px] text-foreground-400 whitespace-nowrap">Juin 2026</span>
              <span className="text-[8px] text-foreground-300 whitespace-nowrap">Diagnostic</span>
            </div>
            {/* Quarters */}
            {data.milestones.map((q, idx) => (
              <div key={q.quarter} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-foreground-800">{q.score_target}</span>
                <div
                  className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${(q.score_target / 100) * 160}px`,
                    backgroundColor: idx === 0 ? 'oklch(0.65 0.15 25)' : idx === 1 ? 'oklch(0.72 0.12 75)' : idx === 2 ? 'oklch(0.6 0.12 210)' : 'oklch(0.65 0.16 150)',
                  }}
                ></div>
                <span className="text-[9px] text-foreground-400 whitespace-nowrap">{q.quarter} {q.period.split(' — ')[1]?.split(' ')[1] || ''}</span>
                <span className="text-[8px] text-foreground-300 whitespace-nowrap">{q.label}</span>
              </div>
            ))}
            {/* Target */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-accent-600">{data.scores.global_target}</span>
              <div className="w-full rounded-t-md bg-accent-500 h-[152px] transition-all duration-700"></div>
              <span className="text-[9px] text-foreground-400 whitespace-nowrap">Juin 2027</span>
              <span className="text-[8px] text-foreground-300 whitespace-nowrap">Certifié</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quarterly details */}
      <div className="space-y-6">
        {data.milestones.map((q, idx) => (
          <ScrollReveal key={q.quarter}>
            <div className={`bg-background-50 border rounded-xl p-6 ${
              idx === 0 ? 'border-red-200' : idx === 1 ? 'border-amber-200' : idx === 2 ? 'border-secondary-200' : 'border-accent-200'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                  idx === 0 ? 'bg-red-100 text-red-700' : idx === 1 ? 'bg-amber-100 text-amber-700' : idx === 2 ? 'bg-secondary-100 text-secondary-700' : 'bg-accent-100 text-accent-700'
                }`}>{q.quarter}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground-950">{q.label}</h3>
                  <p className="text-sm text-foreground-500">{q.period}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-foreground-950">{q.score_target}</p>
                  <p className="text-[10px] text-foreground-400">Score Cible / 100</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-flag-line text-foreground-600"></i> Objectifs
                  </h4>
                  <ul className="space-y-2">
                    {q.objectives.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background-200 text-[10px] font-bold text-foreground-500 flex-shrink-0">{i + 1}</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                    <i className="ri-file-list-3-line text-foreground-600"></i> Livrables
                  </h4>
                  <ul className="space-y-1.5">
                    {q.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                        <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* KPIs */}
              <div className="mt-5 pt-4 border-t border-background-200">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {q.kpis.map((kpi) => (
                    <div key={kpi.name} className="bg-background-100 rounded-lg p-3 text-center">
                      <span className="text-[9px] text-foreground-400 block mb-1">{kpi.name}</span>
                      <span className="text-sm font-bold text-red-600">{kpi.current}</span>
                      <span className="text-[9px] text-foreground-400 mx-1">→</span>
                      <span className="text-sm font-bold text-accent-600">{kpi.target}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-3">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-background-200 text-foreground-600 font-semibold">Budget : {q.budget}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}



