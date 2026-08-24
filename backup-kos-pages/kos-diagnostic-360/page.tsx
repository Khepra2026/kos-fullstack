import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { Link } from 'react-router-dom';
import {
  diagnosticModules,
  diagnosticWorkflow,
  diagnostic360KPIs,
  scoringScale,
  recentDiagnostics,
  pipelineLeads,
  sectorBenchmarks,
} from '@/mocks/diagnostic360';

type Tab = 'dashboard' | 'gouvernance' | 'finance' | 'risques' | 'esg' | 'cyber' | 'conformite' | 'controle' | 'continuite' | 'workflow';

const moduleColorMap: Record<string, string> = {
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  red: 'bg-red-500',
};

const moduleBgMap: Record<string, string> = {
  emerald: 'bg-emerald-50',
  teal: 'bg-teal-50',
  amber: 'bg-amber-50',
  rose: 'bg-rose-50',
  red: 'bg-red-50',
};

const moduleTextMap: Record<string, string> = {
  emerald: 'text-emerald-700',
  teal: 'text-teal-700',
  amber: 'text-amber-700',
  rose: 'text-rose-700',
  red: 'text-red-700',
};

const moduleBorderMap: Record<string, string> = {
  emerald: 'border-emerald-200',
  teal: 'border-teal-200',
  amber: 'border-amber-200',
  rose: 'border-rose-200',
  red: 'border-red-200',
};

function formatNumber(val: number): string {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} Md`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(0)} M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
  return val.toLocaleString('fr-FR');
}

function renderProgressBar(value: number, max: number, colorClass: string) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function getScoreColor(score: number) {
  if (score <= 40) return { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500', border: 'border-red-200', label: 'Risque Élevé' };
  if (score <= 60) return { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500', border: 'border-amber-200', label: 'Risque Significatif' };
  if (score <= 80) return { bg: 'bg-teal-50', text: 'text-teal-700', bar: 'bg-teal-500', border: 'border-teal-200', label: 'Maturité Intermédiaire' };
  return { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500', border: 'border-emerald-200', label: 'Bon Niveau' };
}

function getLeadStatusColor(status: string) {
  if (status === 'Très Chaud') return 'bg-red-50 text-red-700 border-red-200';
  if (status === 'Chaud') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (status === 'Tiède') return 'bg-teal-50 text-teal-700 border-teal-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

export default function diagnostic360Page() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState(1);

  const kpi = diagnostic360KPIs;

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-3-line', badge: 'Vue d\'ensemble' },
    { id: 'gouvernance', label: 'Gouvernance', icon: 'ri-government-line' },
    { id: 'finance', label: 'Finance', icon: 'ri-funds-line' },
    { id: 'risques', label: 'Gestion des Risques', icon: 'ri-shield-flash-line' },
    { id: 'esg', label: 'ESG', icon: 'ri-seedling-line' },
    { id: 'cyber', label: 'Cybersécurité', icon: 'ri-lock-password-line' },
    { id: 'conformite', label: 'Conformité', icon: 'ri-scales-3-line' },
    { id: 'controle', label: 'Contrôle Interne', icon: 'ri-check-double-line' },
    { id: 'continuite', label: 'Continuité', icon: 'ri-restart-line' },
    { id: 'workflow', label: 'Workflow', icon: 'ri-flow-chart', badge: '6 étapes' },
  ];

  const moduleTabMap: Record<string, number> = {
    gouvernance: 1,
    finance: 2,
    risques: 3,
    esg: 4,
    cyber: 5,
    conformite: 6,
    controle: 7,
    continuite: 8,
  };

  const currentModule = diagnosticModules.find(m => m.id === (moduleTabMap[activeTab] || selectedModuleId)) || diagnosticModules[0];

  return (
    <hubLayout hubId={52} activeTab={activeTab} tabLabel={tabs.find(t => t.id === activeTab)?.label}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-4">
                <i className="ri-scan-2-line"></i>PRIORITÉ 2 — KHEPRA DIAGNOSTIC 360™
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Khepra Diagnostic 360™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Plateforme SaaS de diagnostic automatisé. 8 modules, workflow 6 étapes, scoring intelligent,
                benchmark sectoriel, rapport PDF, plan d'actions et capture CRM. Transformez vos visiteurs en leads qualifiés.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { value: formatNumber(kpi.totalDiagnostics), label: 'Diagnostics', icon: 'ri-scan-2-line' },
                { value: `${kpi.conversionRateAvg}%`, label: 'Conversion', icon: 'ri-line-chart-line' },
                { value: formatNumber(kpi.pipelineValueFCFA), label: 'Pipeline', icon: 'ri-funds-line' },
                { value: kpi.roiDiagnostics, label: 'ROI', icon: 'ri-trophy-line' },
              ].map((stat, i) => (
                <div key={i} className="text-center px-3 py-2 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                  <div className="text-[10px] text-foreground-400 flex items-center gap-1 justify-center">
                    <i className={`${stat.icon} text-[10px]`}></i>{stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-background-50'
                    : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.badge && <span className="text-xs opacity-60">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB 1: DASHBOARD ============ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Scoring Scale */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-speed-up-line text-teal-600"></i>
                Échelle de Scoring
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {scoringScale.map((s, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).bg} ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${s.icon} ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).text} text-lg`}></i>
                      <span className="text-xs font-bold text-foreground-950">{s.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground-950">{s.range}</span>
                    <p className="text-[10px] text-foreground-500 mt-1 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {diagnosticModules.map((mod) => {
                const sc = getScoreColor(mod.overallScore);
                return (
                  <div
                    key={mod.id}
                    onClick={() => { setActiveTab(moduleTabMap[mod.slug === 'diagnostic-gouvernance' ? 'gouvernance' : mod.slug === 'diagnostic-bancabilite' ? 'finance' : mod.slug === 'diagnostic-risques' ? 'risques' : mod.slug === 'diagnostic-esg-impact' ? 'esg' : mod.slug === 'evaluation-cybersecurite' ? 'cyber' : mod.slug === 'evaluation-conformite-reglementaire' ? 'conformite' : mod.slug === 'diagnostic-controle-interne' ? 'controle' : 'continuite'] as Tab); setSelectedModuleId(mod.id); }}
                    className={`rounded-xl border p-5 cursor-pointer transition-all bg-background-50 border-background-200/70 hover:border-background-300/60`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${moduleBgMap[mod.color]}`}>
                        <i className={`${mod.icon} text-lg ${moduleTextMap[mod.color]}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground-950 truncate">{mod.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-foreground-400 mt-0.5">
                          <span>{mod.completions} diagnostics</span>
                          {mod.status === 'Nouveau' && (
                            <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[9px] font-semibold">Nouveau</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1">{renderProgressBar(mod.overallScore, 100, sc.bar)}</div>
                      <span className="text-lg font-bold text-foreground-950">{mod.overallScore}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-foreground-400">
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${sc.bg} ${sc.text}`}>{sc.label}</span>
                      <span>{mod.avgCompletionTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pipeline + Récent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-user-add-line text-primary-500"></i>
                  Pipeline Leads — Cette Semaine
                </h3>
                <div className="space-y-2">
                  {pipelineLeads.map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-foreground-950 block truncate">{lead.entreprise}</span>
                          <span className="text-[10px] text-foreground-400">{lead.diagnostic} · {lead.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${getLeadStatusColor(lead.statut)}`}>
                          {lead.statut}
                        </span>
                        <span className="text-xs font-bold text-foreground-950">{formatNumber(lead.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
                <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-history-line text-accent-500"></i>
                  Derniers Diagnostics
                </h3>
                <div className="space-y-2">
                  {recentDiagnostics.map((diag, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background-100 rounded-lg border border-background-200/70">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[10px] text-foreground-400 flex-shrink-0 w-16">{diag.date}</span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-foreground-950 block truncate">{diag.entreprise}</span>
                          <span className="text-[10px] text-foreground-400">{diag.module} · {diag.pays}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getScoreColor(diag.score).bg} ${getScoreColor(diag.score).text}`}>
                          {diag.score}/100
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benchmarks Sectoriels */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-secondary-500"></i>
                Benchmarks Sectoriels
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sectorBenchmarks.map((sec, i) => {
                  const sc = getScoreColor(sec.avgScore);
                  return (
                    <div key={i} className="p-4 bg-background-100 rounded-lg border border-background-200/70">
                      <span className="text-xs font-bold text-foreground-950">{sec.secteur}</span>
                      <div className="flex items-center gap-2 mt-2 mb-1">
                        <div className="flex-1">{renderProgressBar(sec.avgScore, 100, sc.bar)}</div>
                        <span className="text-sm font-bold text-foreground-950">{sec.avgScore}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-foreground-400">
                        <span>{sec.diagnostics} diagnostics</span>
                        <span className={sc.text}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KPI Footer */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-dashboard-3-line text-teal-400"></i>
                KPIs — Khepra Diagnostic 360™
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                {[
                  { value: formatNumber(kpi.totalDiagnostics), label: 'Diagnostics Totaux' },
                  { value: formatNumber(kpi.diagnosticsThisMonth), label: 'Ce Mois' },
                  { value: `${kpi.avgScoreGlobal}/100`, label: 'Score Moyen' },
                  { value: `${kpi.conversionRateAvg}%`, label: 'Taux Conversion' },
                  { value: formatNumber(kpi.pipelineValueFCFA), label: 'Pipeline Value' },
                  { value: kpi.npsScore.toString(), label: 'NPS' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/8 border border-white/10">
                    <span className="block text-xl font-bold font-heading">{stat.value}</span>
                    <span className="text-[10px] text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ MODULE PAGES (Tabs 2-9) ============ */}
        {['gouvernance', 'finance', 'risques', 'esg', 'cyber', 'conformite', 'controle', 'continuite'].includes(activeTab) && (
          <ModuleDetail
            module={currentModule}
            moduleSlug={currentModule.slug}
          />
        )}

        {/* ============ TAB 10: WORKFLOW ============ */}
        {activeTab === 'workflow' && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <i className="ri-flow-chart text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground-950">Workflow Diagnostic 360™</h2>
                  <p className="text-sm text-foreground-500">6 étapes — du questionnaire à la capture CRM, 100% automatisé</p>
                </div>
              </div>
              <div className="space-y-4">
                {diagnosticWorkflow.steps.map((step, i) => (
                  <div key={step.id} className="relative">
                    {i < diagnosticWorkflow.steps.length - 1 && (
                      <div className="absolute left-[26px] top-[68px] bottom-[-16px] w-0.5 bg-background-200/70"></div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0 ${
                        step.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                        step.color === 'accent' ? 'bg-accent-100 text-accent-700' :
                        step.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' :
                        step.color === 'rose' ? 'bg-rose-100 text-rose-600' :
                        step.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        <i className={`${step.icon} text-xl`}></i>
                      </div>
                      <div className="flex-1 bg-background-100 rounded-xl border border-background-200/70 p-5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-foreground-950 text-background-50 flex items-center justify-center text-xs font-bold">
                              {step.id}
                            </span>
                            <h3 className="text-sm font-bold text-foreground-950">{step.title}</h3>
                          </div>
                          <span className="text-xs text-foreground-400 flex items-center gap-1">
                            <i className="ri-time-line"></i>{step.avgTime}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-600 mb-3">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.features.map((f, j) => (
                            <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-background-50 text-foreground-600 border border-background-200/70">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring recap */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-medal-line text-amber-500"></i>
                Récapitulatif du Scoring
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {scoringScale.map((s, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).bg} ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${s.icon} ${getScoreColor(s.range === '0-40' ? 30 : s.range === '41-60' ? 50 : s.range === '61-80' ? 70 : 90).text} text-lg`}></i>
                      <span className="text-xs font-bold text-foreground-950">{s.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground-950">{s.range}</span>
                    <p className="text-[10px] text-foreground-500 mt-1">{s.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer KPI Bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Indicateurs Clés — Khepra Diagnostic 360™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { label: 'Diagnostics Totaux', value: formatNumber(kpi.totalDiagnostics), sub: `${formatNumber(kpi.diagnosticsThisMonth)} ce mois`, icon: 'ri-scan-2-line', color: 'text-teal-600' },
              { label: 'Taux Conversion', value: `${kpi.conversionRateAvg}%`, sub: `${kpi.leadsGeneratedThisMonth} leads ce mois`, icon: 'ri-line-chart-line', color: 'text-emerald-600' },
              { label: 'Pipeline Value', value: formatNumber(kpi.pipelineValueFCFA), sub: `${formatNumber(kpi.revenueAttributedFCFA)} attribués`, icon: 'ri-funds-line', color: 'text-primary-500' },
              { label: 'ROI', value: kpi.roiDiagnostics, sub: 'Retour sur investissement', icon: 'ri-trophy-line', color: 'text-accent-500' },
              { label: 'Score Moyen', value: `${kpi.avgScoreGlobal}/100`, sub: `Meilleur module : ${diagnosticModules[0].name}`, icon: 'ri-speed-up-line', color: 'text-secondary-500' },
              { label: 'NPS', value: kpi.npsScore.toString(), sub: 'Satisfaction utilisateurs', icon: 'ri-heart-line', color: 'text-rose-500' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center gap-2 mb-1">
                  <i className={`${stat.icon} ${stat.color} text-sm`}></i>
                  <span className="text-xs text-foreground-500">{stat.label}</span>
                </div>
                <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                <div className="text-[10px] text-foreground-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}

/* ============ MODULE DETAIL COMPONENT ============ */
function ModuleDetail({ module: mod, moduleSlug }: { module: any; moduleSlug: string }) {
  const [selectedDim, setSelectedDim] = useState(0);
  const sc = getScoreColor(mod.overallScore);
  const dim = mod.dimensions[selectedDim];
  const dimSc = getScoreColor(dim.score);

  const moduleRoutes: Record<string, string> = {
    'diagnostic-gouvernance': '/tools/diagnostic-gouvernance',
    'diagnostic-bancabilite': '/tools/diagnostic-bancabilite',
    'diagnostic-risques': '/tools/diagnostic-risques',
    'diagnostic-esg-impact': '/tools/diagnostic-esg-impact',
    'evaluation-cybersecurite': '/tools/evaluation-cybersecurite',
    'evaluation-conformite-reglementaire': '/tools/evaluation-conformite-reglementaire',
    'diagnostic-controle-interne': '/tools/diagnostic-controle-interne',
    'diagnostic-continuite-activite': '/tools/diagnostic-continuite-activite',
  };

  const route = moduleRoutes[moduleSlug];

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${moduleBgMap[mod.color]}`}>
                <i className={`${mod.icon} text-2xl ${moduleTextMap[mod.color]}`}></i>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground-950">{mod.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${moduleBgMap[mod.color]} ${moduleTextMap[mod.color]} ${moduleBorderMap[mod.color]}`}>
                    {mod.status}
                  </span>
                  <span className="text-xs text-foreground-400">{mod.completions} diagnostics · {mod.avgCompletionTime}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed mb-4">{mod.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-500">
              <span><i className="ri-question-answer-line mr-1"></i>{mod.questions} questions</span>
              <span><i className="ri-group-line mr-1"></i>{mod.completions} complétions</span>
              <span><i className="ri-bar-chart-2-line mr-1"></i>Benchmark secteur : {mod.benchmarkIndustry}/100</span>
              <span><i className="ri-line-chart-line mr-1"></i>Conversion : {mod.conversionRate}%</span>
            </div>
          </div>
          <div className="lg:w-72 flex-shrink-0 space-y-3">
            <div className="p-4 rounded-xl bg-background-100 border border-background-200/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-foreground-500">Score Global</span>
                <span className="text-2xl font-bold text-foreground-950">{mod.overallScore}</span>
              </div>
              <div className="mb-2">{renderProgressBar(mod.overallScore, 100, sc.bar)}</div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${sc.bg} ${sc.text}`}>{sc.label}</span>
            </div>
            {route ? (
              <Link
                to={route}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-scan-2-line"></i>
                Lancer le Diagnostic
              </Link>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-background-100 text-foreground-400 text-sm font-semibold border border-background-200/70 cursor-not-allowed whitespace-nowrap">
                <i className="ri-tools-line"></i>
                Bientôt disponible
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${moduleBgMap[mod.color]}`}>
              <i className="ri-radar-line text-sm"></i>
            </div>
            <span className="text-sm font-bold text-foreground-950">Dimensions</span>
          </div>
          {mod.dimensions.map((d: any, i: number) => {
            const dc = getScoreColor(d.score);
            return (
              <div
                key={i}
                onClick={() => setSelectedDim(i)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  i === selectedDim
                    ? `${moduleBorderMap[mod.color]} ${moduleBgMap[mod.color]}`
                    : 'border-background-200/70 bg-background-50 hover:border-background-300/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground-950">{d.name}</span>
                  <span className="text-xs font-bold text-foreground-950">{d.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">{renderProgressBar(d.score, 100, dc.bar)}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${dc.bg} ${dc.text}`}>{dc.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dimension Detail */}
        <div className="lg:col-span-2">
          <div className="bg-background-50 rounded-lg border border-background-200/70 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground-950">{dim.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-foreground-950">{dim.score}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${dimSc.bg} ${dimSc.text}`}>{dimSc.label}</span>
              </div>
            </div>
            <p className="text-sm text-foreground-600 mb-6">{dim.description}</p>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground-500">Score sur 100</span>
                <span className="text-[10px] text-foreground-400">Pondération : {dim.weight}%</span>
              </div>
              {renderProgressBar(dim.score, 100, dimSc.bar)}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-foreground-400">Benchmark secteur :</span>
              <span className="font-bold text-foreground-950">{mod.benchmarkIndustry}/100</span>
              <span className="text-emerald-600 text-[10px] font-semibold">
                +{dim.score - mod.benchmarkIndustry} pts vs secteur
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4 p-5 bg-background-100 rounded-lg border border-background-200/70">
            <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-lightbulb-flash-line text-amber-500"></i>
              Recommandations — {dim.name}
            </h4>
            <p className="text-xs text-foreground-600 leading-relaxed">
              {dim.score <= 40
                ? `Score critique. Intervention urgente requise sur la dimension "${dim.name}". Nous recommandons une mission de diagnostic approfondi pour identifier les causes racines et élaborer un plan de remédiation prioritaire sous 30 jours.`
                : dim.score <= 60
                  ? `Des faiblesses significatives sont identifiées dans la dimension "${dim.name}". Un plan d'actions structuré est nécessaire pour renforcer ce pilier. Nos experts peuvent vous accompagner dans la mise en œuvre des mesures correctives.`
                  : dim.score <= 80
                    ? `La dimension "${dim.name}" présente un niveau intermédiaire. Des axes d'amélioration ciblés permettront d'atteindre un niveau de maturité supérieur. Nous recommandons des actions de renforcement progressif.`
                    : `Excellent niveau sur la dimension "${dim.name}". Maintenez vos standards et restez en veille pour anticiper les évolutions réglementaires et les meilleures pratiques du secteur.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Stats Footer for this module */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: 'ri-group-line', label: 'Complétions', value: mod.completions.toString() },
          { icon: 'ri-time-line', label: 'Temps moyen', value: mod.avgCompletionTime },
          { icon: 'ri-line-chart-line', label: 'Taux Conversion', value: `${mod.conversionRate}%` },
          { icon: 'ri-question-answer-line', label: 'Questions', value: mod.questions.toString() },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <i className={`${stat.icon} text-lg ${moduleTextMap[mod.color]} mb-1 block`}></i>
            <span className="block text-lg font-bold text-foreground-950">{stat.value}</span>
            <span className="text-[10px] text-foreground-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}





