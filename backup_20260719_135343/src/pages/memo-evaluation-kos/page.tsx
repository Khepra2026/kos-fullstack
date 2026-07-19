import { useState } from 'react';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import {
  maturitySnapshot,
  infraStats,
  regulatoryBase,
  iSOStatus,
  securityStatus,
  performanceStatus,
  bigFourActions,
  architectureSovereign,
  growthKPIs,
  roadmap90j,
  strengthsWeaknesses,
  bigFourComparison,
  memoExecutiveSummary,
  pRAPCAStatus
} from '@/mocks/regtechMaturityMemo';

type TabId = 'executive' | 'infrastructure' | 'regulatory' | 'iso' | 'security' | 'actions' | 'architecture' | 'growth' | 'comparison' | 'roadmap';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'executive', label: 'Résumé Exécutif', icon: 'ri-dashboard-3-line' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'ri-server-line' },
  { id: 'regulatory', label: 'Base Réglementaire', icon: 'ri-scales-line' },
  { id: 'iso', label: 'ISO & Conformité', icon: 'ri-award-line' },
  { id: 'security', label: 'Sécurité', icon: 'ri-shield-flash-line' },
  { id: 'actions', label: 'Actions Correctives', icon: 'ri-tools-line' },
  { id: 'architecture', label: 'Architecture Souveraine', icon: 'ri-building-4-line' },
  { id: 'growth', label: 'Croissance & KPIs', icon: 'ri-line-chart-line' },
  { id: 'comparison', label: 'vs Big Four', icon: 'ri-bar-chart-grouped-line' },
  { id: 'roadmap', label: 'Roadmap 90j', icon: 'ri-road-map-line' }
];

const scoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600';
  if (score >= 80) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const scoreBg = (score: number) => {
  if (score >= 90) return 'bg-emerald-50 border-emerald-200';
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 70) return 'bg-yellow-50 border-yellow-200';
  if (score >= 60) return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
};

const scoreBarColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

const severityBadge = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border border-red-300';
    case 'major': return 'bg-amber-100 text-amber-800 border border-amber-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    default: return 'bg-background-100 text-foreground-700 border border-background-200';
  }
};

const priorityBadge = (priority: string) => {
  if (priority.startsWith('P0')) return 'bg-red-100 text-red-800 border border-red-300';
  if (priority.startsWith('P1')) return 'bg-amber-100 text-amber-800 border border-amber-300';
  return 'bg-background-100 text-foreground-700 border border-background-200';
};

export default function MemoEvaluationKOSPage() {
  const [activeTab, setActiveTab] = useState<TabId>('executive');

  const { score_global, certification, tables_supabase, hubs, agents_ia, edge_functions } = memoExecutiveSummary.key_metrics;

  return (
    <div className="min-h-screen bg-background-50">
      <ScrollToTop />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-emerald-500/10 border border-emerald-500/20">
                <i className="ri-file-shield-2-line text-emerald-400 text-sm" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mémo Exécutif — 06 Juillet 2026</span>
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                KOS RegTech Platform
                <span className="block text-emerald-400 text-xl mt-1">Mémo Complet de Maturité</span>
              </h1>
              <p className="text-sm text-foreground-400 max-w-2xl">
                Rapport d'état exhaustif du Knowledge Operating System™ — KHEPRA EXPERTS. Infrastructure, Réglementation, Sécurité, ISO, IA, Croissance.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 text-[11px]">
                <span className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-bold">{certification}</span>
                <span className="px-2 py-1 rounded bg-white/8 text-foreground-400 border border-white/10">Score : {score_global}/100</span>
                <span className="px-2 py-1 rounded bg-white/8 text-foreground-400 border border-white/10">{tables_supabase} tables</span>
                <span className="px-2 py-1 rounded bg-white/8 text-foreground-400 border border-white/10">{hubs} hubs</span>
                <span className="px-2 py-1 rounded bg-white/8 text-foreground-400 border border-white/10">{agents_ia} agents IA</span>
              </div>
            </div>

            {/* Score Gauge */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-36 h-36 mx-auto">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#1f2937" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="10"
                    strokeDasharray={`${(score_global / 100) * 327} 327`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{score_global}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">/100</span>
                </div>
              </div>
              <p className="text-xs text-emerald-400 font-bold mt-2">{edge_functions} Edge Functions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Score Trajectory */}
      <section className="bg-foreground-900 border-b border-foreground-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-foreground-500 font-bold mr-2">Progression :</span>
            {maturitySnapshot.score_trajectory.map((t, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className={`font-black ${t.score >= 90 ? 'text-emerald-400' : t.score >= 80 ? 'text-green-400' : t.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{t.score}</span>
                <span className="text-foreground-600">{t.date.split(' ')[0]}</span>
                {i < maturitySnapshot.score_trajectory.length - 1 && <span className="text-foreground-700 mx-1">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-white border-b border-background-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-xs font-bold cursor-pointer transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                    : 'border-transparent text-foreground-500 hover:text-foreground-800 hover:bg-background-50'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===== EXECUTIVE SUMMARY ===== */}
        {activeTab === 'executive' && (
          <div className="space-y-8">
            {/* Verdict Banner */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <i className="ri-medal-line text-xl" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground-950 font-playfair">{memoExecutiveSummary.verdict}</h2>
                  <p className="text-xs text-foreground-500">{memoExecutiveSummary.date} — {memoExecutiveSummary.author}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed">{memoExecutiveSummary.executive_conclusion}</p>
              <div className="mt-4 p-3 rounded-xl bg-emerald-100 border border-emerald-200">
                <p className="text-xs text-emerald-900 font-semibold">
                  <i className="ri-arrow-right-circle-fill text-emerald-600 mr-1" />
                  {memoExecutiveSummary.next_critical_action}
                </p>
              </div>
            </div>

            {/* KPI Grid */}
            <div>
              <h3 className="text-sm font-bold text-foreground-600 mb-4 uppercase tracking-wider">Indicateurs Clés — État au 06/07/2026</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: 'Score Global', value: `${memoExecutiveSummary.key_metrics.score_global}/100`, color: 'text-emerald-600' },
                  { label: 'Tables Supabase', value: memoExecutiveSummary.key_metrics.tables_supabase.toLocaleString(), color: 'text-foreground-950' },
                  { label: 'Données Réelles', value: `${memoExecutiveSummary.key_metrics.tables_with_data_pct}%`, color: 'text-green-600' },
                  { label: 'Edge Functions', value: `${memoExecutiveSummary.key_metrics.edge_functions}/101`, color: 'text-amber-600' },
                  { label: 'Hubs KOS', value: memoExecutiveSummary.key_metrics.hubs, color: 'text-foreground-950' },
                  { label: 'Agents IA', value: memoExecutiveSummary.key_metrics.agents_ia, color: 'text-foreground-950' },
                  { label: 'Citations Vérifées', value: memoExecutiveSummary.key_metrics.citations_verifiees, color: 'text-foreground-950' },
                  { label: 'Autorités', value: memoExecutiveSummary.key_metrics.autorites, color: 'text-foreground-950' },
                  { label: 'ISO 27001', value: `${memoExecutiveSummary.key_metrics.iso_27001}%`, color: 'text-emerald-600' },
                  { label: 'ISO 42001', value: `${memoExecutiveSummary.key_metrics.iso_42001}%`, color: 'text-emerald-600' },
                  { label: 'Sécurité', value: `${memoExecutiveSummary.key_metrics.securite_score}/100`, color: 'text-emerald-600' },
                  { label: 'Tests Totaux', value: memoExecutiveSummary.key_metrics.tests_total, color: 'text-foreground-950' },
                  { label: 'Hooks Hybrides', value: `${memoExecutiveSummary.key_metrics.hooks_hybrid_pct}%`, color: 'text-green-600' },
                  { label: 'PCA RTO', value: `${memoExecutiveSummary.key_metrics.pca_rto_seconds}s`, color: 'text-emerald-600' },
                  { label: 'GEO Score', value: `${memoExecutiveSummary.key_metrics.geo_score}/100`, color: 'text-emerald-600' }
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl bg-white border border-background-200 p-4 text-center hover:border-emerald-200 transition-all">
                    <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{kpi.label}</span>
                    <span className={`text-xl font-black block ${kpi.color}`}>{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status by Dimension */}
            <div>
              <h3 className="text-sm font-bold text-foreground-600 mb-4 uppercase tracking-wider">Statut par Dimension</h3>
              <div className="space-y-2">
                {memoExecutiveSummary.status_by_dimension.map((d) => (
                  <div key={d.dimension} className={`rounded-xl border p-4 ${scoreBg(d.score)}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-foreground-950">{d.dimension}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${d.status === 'EXCELLENT' ? 'bg-emerald-200 text-emerald-800' : d.status === 'BON' ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'}`}>{d.status}</span>
                        </div>
                        <p className="text-xs text-foreground-500">{d.note}</p>
                      </div>
                      <div className="flex-shrink-0 text-center w-16">
                        <span className={`text-2xl font-black ${scoreColor(d.score)}`}>{d.score}</span>
                        <span className="text-[10px] text-foreground-400 block">/100</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full h-1.5 rounded-full bg-white/60">
                      <div className={`h-full rounded-full ${scoreBarColor(d.score)}`} style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== INFRASTRUCTURE ===== */}
        {activeTab === 'infrastructure' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Infrastructure KOS</h2>

            {/* Supabase */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-database-2-line text-foreground-600" /> Supabase — Base de Données
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { label: 'Tables totales', value: infraStats.supabase.tables_total, alert: false },
                  { label: 'Tables avec données', value: `${infraStats.supabase.tables_with_data} (${infraStats.supabase.ratio_pct}%)`, alert: false },
                  { label: 'Tables vides', value: infraStats.supabase.tables_empty, alert: true },
                  { label: 'Enregistrements', value: `${infraStats.supabase.records_total.toLocaleString()}+`, alert: false },
                  { label: 'Policies RLS', value: infraStats.supabase.rls_policies, alert: false },
                  { label: 'RLS Coverage', value: `${infraStats.supabase.rls_coverage_pct}%`, alert: false },
                  { label: 'Edge Functions', value: `${infraStats.supabase.edge_functions}/${infraStats.supabase.edge_functions_limit}`, alert: true },
                  { label: 'Cron Jobs', value: infraStats.supabase.cron_jobs, alert: false }
                ].map((item) => (
                  <div key={item.label} className={`rounded-lg p-3 border ${item.alert ? 'bg-amber-50 border-amber-200' : 'bg-background-50 border-background-100'}`}>
                    <span className="text-foreground-500 block mb-0.5">{item.label}</span>
                    <span className={`font-bold text-sm ${item.alert ? 'text-amber-700' : 'text-foreground-950'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-code-box-line text-foreground-600" /> Frontend React — KOS Hubs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { label: 'Hubs KOS', value: infraStats.frontend.hubs },
                  { label: 'React', value: `v${infraStats.frontend.react_version}` },
                  { label: 'Build Status', value: infraStats.frontend.build_status },
                  { label: 'Fichiers Mock', value: infraStats.frontend.mocks_files },
                  { label: 'Hooks Total', value: infraStats.frontend.hooks_total },
                  { label: 'Hooks Hybrides', value: `${infraStats.frontend.hooks_hybrid} (${infraStats.frontend.hooks_hybrid_pct}%)` },
                  { label: 'Hooks Mock-Only', value: infraStats.frontend.hooks_mock_only },
                  { label: 'Tests Total', value: `${infraStats.frontend.tests_total} (${infraStats.frontend.tests_unit}U+${infraStats.frontend.tests_integration}I)` }
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-background-50 border border-background-100 p-3">
                    <span className="text-foreground-500 block mb-0.5 text-[10px] uppercase">{item.label}</span>
                    <span className="font-bold text-sm text-foreground-950">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agents */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-robot-2-line text-foreground-600" /> Agents IA
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { label: 'Agents Total', value: infraStats.agents.total },
                  { label: 'En Production', value: infraStats.agents.in_production },
                  { label: 'Sous Supervision', value: infraStats.agents.under_supervision },
                  { label: 'AI Registry', value: infraStats.agents.registered_in_ai_registry },
                  { label: 'Équipes Autonomes', value: infraStats.agents.teams_autonomous },
                  { label: 'Hallucination Rate', value: `${infraStats.agents.hallucination_rate_pct}%` },
                  { label: 'ISO 42001', value: `${infraStats.agents.iso_42001_score}%` },
                  { label: 'EU AI Act Art.14', value: infraStats.agents.eu_ai_act_compliant ? '✓ Conforme' : '✗ Non conforme' }
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-background-50 border border-background-100 p-3">
                    <span className="text-foreground-500 block mb-0.5 text-[10px] uppercase">{item.label}</span>
                    <span className="font-bold text-sm text-foreground-950">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infra Souveraine */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                <i className="ri-server-fill text-amber-600" /> Infrastructure Souveraine — CODE PRÊT / NON DÉPLOYÉ
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                {[
                  { label: 'Docker Conteneurs', value: infraStats.infrastructure_sovereign.docker_containers_ready, note: 'Prêts' },
                  { label: 'Qdrant Collections', value: infraStats.infrastructure_sovereign.qdrant_collections_ready, note: 'Configurées' },
                  { label: 'n8n Workflows', value: infraStats.infrastructure_sovereign.n8n_workflows_ready, note: 'Prêts' },
                  { label: 'Systemd Services', value: infraStats.infrastructure_sovereign.systemd_services, note: 'Configurés' }
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white border border-amber-200 p-3 text-center">
                    <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-0.5">{item.label}</span>
                    <span className="text-xl font-black text-amber-700 block">{item.value}</span>
                    <span className="text-[10px] text-amber-600">{item.note}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-800 font-semibold bg-amber-100 rounded-lg p-3">
                <i className="ri-flashlight-fill text-amber-600 mr-1" />
                Action : <code className="bg-amber-200 rounded px-1">bash kos-autopilot.sh</code> sur serveur physique → déploiement Docker complet en 1 commande.
              </p>
            </div>
          </div>
        )}

        {/* ===== REGULATORY BASE ===== */}
        {activeTab === 'regulatory' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Base Réglementaire KOS</h2>

            {/* Global Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Citations Vérifiées', value: regulatoryBase.citations_verified, color: 'text-emerald-600' },
                { label: 'Autorités', value: regulatoryBase.authorities_covered, color: 'text-foreground-950' },
                { label: 'Textes Réglementaires', value: regulatoryBase.regulations, color: 'text-foreground-950' },
                { label: 'Sanctions Documentées', value: regulatoryBase.sanctions, color: 'text-foreground-950' }
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white border border-background-200 p-5 text-center">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{s.label}</span>
                  <span className={`text-3xl font-black block ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Authorities Table */}
            <div className="rounded-xl border border-background-200 bg-white overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left p-3 font-bold text-foreground-700">Autorité</th>
                    <th className="text-center p-3 font-bold text-foreground-700">Citations</th>
                    <th className="text-left p-3 font-bold text-foreground-700">Domaines couverts</th>
                  </tr>
                </thead>
                <tbody>
                  {regulatoryBase.texts_verified.map((t, i) => (
                    <tr key={t.authority} className={`border-b border-background-100 ${i % 2 === 0 ? 'bg-white' : 'bg-background-50'}`}>
                      <td className="p-3 font-bold text-foreground-950">{t.authority}</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground-950 text-white font-black text-xs">{t.count}</span>
                      </td>
                      <td className="p-3 text-foreground-600 text-[11px]">{t.domains}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== ISO ===== */}
        {activeTab === 'iso' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">ISO & Conformité — État de Certification</h2>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* ISO 27001 */}
              <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-emerald-900">ISO 27001:2022</h3>
                  <span className="text-2xl font-black text-emerald-600">{iSOStatus.iso_27001.score}</span>
                </div>
                <span className="px-2 py-1 rounded text-[11px] font-bold bg-emerald-200 text-emerald-800 block text-center mb-3">{iSOStatus.iso_27001.status}</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-emerald-700">Contrôles</span><span className="font-bold">{iSOStatus.iso_27001.controls_passed}/{iSOStatus.iso_27001.controls_total}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">Gaps fermés</span><span className="font-bold text-emerald-700">5/5 ✓</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">Gaps restants</span><span className="font-bold text-emerald-700">0 ✓</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">Certification cible</span><span className="font-bold">{iSOStatus.iso_27001.certification_target}</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">PCA/PRA</span><span className="font-bold text-emerald-700">Testé ✓</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">SDLC</span><span className="font-bold text-emerald-700">Documenté ✓</span></div>
                  <div className="flex justify-between"><span className="text-emerald-700">Formation</span><span className="font-bold text-amber-600">{iSOStatus.iso_27001.evidence.staff_training_pct}% formé</span></div>
                </div>
                <div className="mt-3 p-2 rounded bg-emerald-100 border border-emerald-200 text-[10px] text-emerald-800 font-semibold">
                  Organismes recommandés : {iSOStatus.iso_27001.recommended_bodies.join(' · ')}
                </div>
              </div>

              {/* ISO 42001 */}
              <div className="rounded-xl border-2 border-emerald-200 bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground-950">ISO 42001:2023 (IA)</h3>
                  <span className="text-2xl font-black text-emerald-600">{iSOStatus.iso_42001.score}</span>
                </div>
                <span className="px-2 py-1 rounded text-[11px] font-bold bg-emerald-200 text-emerald-800 block text-center mb-3">{iSOStatus.iso_42001.status}</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-foreground-600">Digital Twin</span><span className="font-bold text-emerald-600">{iSOStatus.iso_42001.digital_twin_score}/10 ✓</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">EU AI Act Art.14</span><span className="font-bold text-emerald-600">Conforme ✓</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">Taux hallucination</span><span className="font-bold text-emerald-600">{iSOStatus.iso_42001.hallucination_rate_pct}% ✓</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">Agents enregistrés</span><span className="font-bold">{iSOStatus.iso_42001.agents_registered}</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">SOP-009</span><span className="font-bold text-emerald-600">Déployée ✓</span></div>
                </div>
              </div>

              {/* ISO 9001 */}
              <div className="rounded-xl border-2 border-emerald-200 bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground-950">ISO 9001:2015 (Qualité)</h3>
                  <span className="text-2xl font-black text-emerald-600">{iSOStatus.iso_9001.score}</span>
                </div>
                <span className="px-2 py-1 rounded text-[11px] font-bold bg-emerald-200 text-emerald-800 block text-center mb-3">{iSOStatus.iso_9001.status}</span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-foreground-600">Processus documentés</span><span className="font-bold text-emerald-600">{iSOStatus.iso_9001.processes_documented}/26 ✓</span></div>
                  <div className="flex justify-between"><span className="text-foreground-600">Quality Controller actif</span><span className="font-bold text-emerald-600">Actif ✓</span></div>
                </div>
              </div>
            </div>

            {/* PCA / PRA */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">PRA/PCA — Tests de Continuité (ISO 27001 A.17)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">RTO Mesuré</span>
                  <span className="text-2xl font-black text-emerald-600">{pRAPCAStatus.rto_seconds}s</span>
                  <span className="text-[10px] text-emerald-600 block">Cible &lt; {pRAPCAStatus.rto_target_seconds}s ✓</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">RPO Mesuré</span>
                  <span className="text-2xl font-black text-emerald-600">{pRAPCAStatus.rpo_minutes}min</span>
                  <span className="text-[10px] text-emerald-600 block">Cible &lt; {pRAPCAStatus.rpo_target_minutes}min ✓</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Dernier Test</span>
                  <span className="text-sm font-black text-emerald-600">{pRAPCAStatus.last_test}</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Statut</span>
                  <span className="text-sm font-black text-emerald-600">{pRAPCAStatus.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SECURITY ===== */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground-950 font-playfair">Sécurité & Protection</h2>
              <span className="text-3xl font-black text-emerald-600">{securityStatus.score_global}/100</span>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Global', score: securityStatus.score_global },
                { label: 'Headers HTTP', score: securityStatus.headers.score },
                { label: 'CSP Niveau 3', score: securityStatus.csp.score },
                { label: 'CORS', score: securityStatus.cors.score },
                { label: 'Cookies', score: securityStatus.cookies.score },
                { label: 'HSTS', score: securityStatus.hsts.score }
              ].map((s) => (
                <div key={s.label} className={`rounded-xl border p-4 text-center ${scoreBg(s.score)}`}>
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{s.label}</span>
                  <span className={`text-2xl font-black ${scoreColor(s.score)}`}>{s.score}</span>
                  <div className="mt-1 w-full h-1 rounded-full bg-white/50">
                    <div className={`h-full rounded-full ${scoreBarColor(s.score)}`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Headers Detail */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Headers Sécurité Déployés</h3>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'HSTS', config: securityStatus.hsts.config, status: securityStatus.hsts.status },
                  { name: 'CSP', config: securityStatus.csp.config, status: securityStatus.csp.status },
                  { name: 'Cookies', config: 'Secure; SameSite=Strict', status: securityStatus.cookies.status },
                  { name: 'Headers HTTP', config: securityStatus.headers.status, status: 'Déployé' },
                  { name: 'WAF', config: `${securityStatus.waf.function} — ${securityStatus.waf.rules}`, status: 'Actif' },
                  { name: 'RLS', config: `${securityStatus.rls.tables} tables, ${securityStatus.rls.policies} policies`, status: `${securityStatus.rls.coverage_pct}%` }
                ].map((h) => (
                  <div key={h.name} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-100">
                    <span className="w-5 h-5 flex items-center justify-center rounded bg-emerald-100 text-emerald-700 text-[10px] font-black flex-shrink-0 mt-0.5">✓</span>
                    <div className="flex-1">
                      <span className="font-bold text-foreground-950">{h.name}</span>
                      <span className="text-foreground-500 ml-2">{h.config}</span>
                    </div>
                    <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">{h.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-background-200 bg-white p-5">
              <h3 className="text-sm font-bold text-foreground-950 mb-3">Actions Sécurité Restantes</h3>
              <div className="flex items-start gap-2 text-xs p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-black">P3</span>
                <span className="text-amber-800">{securityStatus.penetration_test}</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== ACTIONS ===== */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Actions Correctives — État 06/07/2026</h2>

            {/* Completed */}
            <div>
              <h3 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <i className="ri-check-double-fill text-emerald-500" /> Blocs Complétés — {bigFourActions.completed.length} actions
              </h3>
              <div className="space-y-2">
                {bigFourActions.completed.map((a) => (
                  <div key={a.bloc} className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-black flex-shrink-0">✓</span>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono text-emerald-600 font-bold mr-2">{a.bloc}</span>
                      <span className="text-sm font-bold text-foreground-950">{a.title}</span>
                    </div>
                    <span className="text-[11px] text-foreground-400">{a.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending */}
            <div>
              <h3 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-2">
                <i className="ri-time-line text-amber-500" /> Actions P0/P1/P2 Restantes — {bigFourActions.pending_p0.length} actions
              </h3>
              <div className="space-y-2">
                {bigFourActions.pending_p0.map((a) => (
                  <div key={a.id} className="rounded-xl bg-white border border-background-200 p-4 flex items-start gap-3 hover:border-amber-300 transition-all">
                    <span className={`px-2 py-1 rounded text-[10px] font-black whitespace-nowrap flex-shrink-0 ${priorityBadge(a.priority)}`}>{a.priority}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-foreground-950 mb-0.5">{a.title}</h4>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-emerald-600 font-semibold">{a.impact}</span>
                        <span className="text-foreground-400">·</span>
                        <span className="text-foreground-500">Effort : {a.effort}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ARCHITECTURE ===== */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Architecture Souveraine KOS</h2>

            <div className="rounded-xl border-2 border-background-300 bg-white p-5">
              <h3 className="text-sm font-bold text-foreground-950 mb-2">Vision Cible</h3>
              <p className="text-xs text-foreground-600 font-mono bg-background-50 p-3 rounded-lg">{architectureSovereign.target_architecture}</p>
            </div>

            <div className="space-y-3">
              {architectureSovereign.layers.map((layer) => (
                <div key={layer.layer} className={`rounded-xl border p-5 ${layer.status === 'OPÉRATIONNEL' ? 'bg-emerald-50 border-emerald-200' : layer.status === 'SATURÉ — LIMITE ATTEINTE' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-foreground-950 mb-1">{layer.layer}</h4>
                      <p className="text-xs text-foreground-600">{layer.role}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold block mb-1 ${layer.status === 'OPÉRATIONNEL' ? 'bg-emerald-200 text-emerald-800' : layer.status === 'SATURÉ — LIMITE ATTEINTE' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'}`}>
                        {layer.status}
                      </span>
                      {layer.score > 0 && <span className={`text-xl font-black ${scoreColor(layer.score)}`}>{layer.score}/100</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== GROWTH ===== */}
        {activeTab === 'growth' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Croissance & KPIs Commercial</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { label: 'Pipeline Total', value: `${(growthKPIs.pipeline_total_fcfa / 1e9).toFixed(2)} Md FCFA`, highlight: true },
                { label: 'Pipeline Pondéré', value: `${(growthKPIs.pipeline_pondere_fcfa / 1e9).toFixed(2)} Md FCFA`, highlight: false },
                { label: 'Deals Actifs', value: growthKPIs.deals_actifs, highlight: false },
                { label: 'Win Rate YTD', value: `${growthKPIs.win_rate_ytd_pct}%`, highlight: true },
                { label: 'Leads Actifs', value: growthKPIs.leads_actifs, highlight: false },
                { label: 'Bailleurs Trackés', value: growthKPIs.tenderers_tracked, highlight: false },
                { label: 'Bailleurs Accrédités', value: growthKPIs.donors_accredited, highlight: false },
                { label: 'Orgs Institutionnelles', value: `${(growthKPIs.institutional_orgs_tracked / 1000).toFixed(1)}K`, highlight: false },
                { label: 'Décideurs Mappés', value: `${(growthKPIs.decision_makers_mapped / 1000).toFixed(0)}K`, highlight: false },
                { label: 'Backlinks Actifs', value: growthKPIs.backlinks_active, highlight: false },
                { label: 'Domain Authority', value: growthKPIs.domain_authority, highlight: false },
                { label: 'Trafic Organique', value: `${(growthKPIs.organic_traffic_monthly / 1000).toFixed(0)}K/mois`, highlight: true },
                { label: 'Keywords Top 10', value: growthKPIs.seo_top10_keywords.toLocaleString(), highlight: false },
                { label: 'GEO Score', value: `${growthKPIs.geo_score}/100`, highlight: true },
                { label: 'Visibilité ChatGPT', value: `${growthKPIs.chatgpt_visibility_pct}%`, highlight: false },
                { label: 'Inscrits Nurturing', value: growthKPIs.nurturing_subscribers.toLocaleString(), highlight: false }
              ].map((kpi) => (
                <div key={kpi.label} className={`rounded-xl border p-4 text-center ${kpi.highlight ? 'bg-foreground-950 border-foreground-900' : 'bg-white border-background-200'}`}>
                  <span className={`text-[10px] uppercase font-bold block mb-1 ${kpi.highlight ? 'text-foreground-400' : 'text-foreground-500'}`}>{kpi.label}</span>
                  <span className={`text-lg font-black block ${kpi.highlight ? 'text-white' : 'text-foreground-950'}`}>{kpi.value}</span>
                </div>
              ))}
            </div>

            {/* Performance */}
            <div className="rounded-xl border border-background-200 bg-white p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Core Web Vitals — Dernier Scan {performanceStatus.last_scan}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Score Mobile</span>
                  <span className="text-2xl font-black text-emerald-600">{performanceStatus.homepage_mobile.score}</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">LCP Mobile</span>
                  <span className="text-2xl font-black text-emerald-600">{performanceStatus.homepage_mobile.lcp_ms}ms</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">TBT Mobile</span>
                  <span className="text-2xl font-black text-emerald-600">{performanceStatus.homepage_mobile.tbt_ms}ms</span>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">CWV Grade</span>
                  <span className="text-lg font-black text-emerald-600">{performanceStatus.core_web_vitals_grade}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== BIG FOUR COMPARISON ===== */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">KOS vs Big Four — Comparaison</h2>

            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4 mb-4">
              <p className="text-sm text-emerald-900 font-semibold">{bigFourComparison.verdict}</p>
            </div>

            <div className="rounded-xl border border-background-200 bg-white overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-foreground-950 text-white">
                    <th className="text-left p-3 font-bold">Dimension</th>
                    <th className="text-center p-3 font-bold text-emerald-400">KOS</th>
                    <th className="text-center p-3 font-bold">Deloitte</th>
                    <th className="text-center p-3 font-bold">PwC</th>
                    <th className="text-center p-3 font-bold">EY</th>
                    <th className="text-center p-3 font-bold">KPMG</th>
                    <th className="text-center p-3 font-bold text-emerald-400">Leader</th>
                  </tr>
                </thead>
                <tbody>
                  {bigFourComparison.dimensions.map((d, i) => (
                    <tr key={d.dimension} className={`border-b border-background-100 ${i % 2 === 0 ? 'bg-white' : 'bg-background-50'}`}>
                      <td className="p-3 font-bold text-foreground-950">{d.dimension}</td>
                      <td className="p-3 text-center">
                        <span className={`font-black text-base ${d.kos >= 95 ? 'text-emerald-600' : d.kos >= 85 ? 'text-green-600' : 'text-amber-600'}`}>{d.kos}</span>
                      </td>
                      <td className="p-3 text-center font-semibold text-foreground-600">{d.deloitte}</td>
                      <td className="p-3 text-center font-semibold text-foreground-600">{d.pwc}</td>
                      <td className="p-3 text-center font-semibold text-foreground-600">{d.ey}</td>
                      <td className="p-3 text-center font-semibold text-foreground-600">{d.kpmg}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.leader.startsWith('KOS') ? 'bg-emerald-100 text-emerald-800' : 'bg-foreground-100 text-foreground-700'}`}>{d.leader}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Strengths vs Weaknesses */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-emerald-700 mb-3">Forces KOS</h3>
                <div className="space-y-2">
                  {strengthsWeaknesses.strengths.map((s) => (
                    <div key={s.title} className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-emerald-900">{s.title}</h4>
                        <span className="text-lg font-black text-emerald-600">{s.score}</span>
                      </div>
                      <p className="text-[11px] text-emerald-700">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-amber-700 mb-3">Points à Améliorer</h3>
                <div className="space-y-2">
                  {strengthsWeaknesses.weaknesses.map((w) => (
                    <div key={w.title} className="rounded-xl bg-white border border-background-200 p-4">
                      <div className="flex items-start gap-2 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${severityBadge(w.severity)}`}>{w.severity.toUpperCase()}</span>
                        <h4 className="text-xs font-bold text-foreground-950">{w.title}</h4>
                      </div>
                      <p className="text-[11px] text-foreground-500 mb-2">{w.detail}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold">Fix : {w.fix} — {w.effort}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== ROADMAP ===== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">Roadmap 90 Jours — Vers 95/100</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="rounded-xl bg-foreground-950 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-400 block mb-1">Actuel</span>
                <span className="text-3xl font-black text-white">92</span>
                <span className="text-[10px] text-foreground-400 block">/100</span>
              </div>
              <div className="rounded-xl bg-emerald-600 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-100 block mb-1">Cible J+30</span>
                <span className="text-3xl font-black text-white">93</span>
                <span className="text-[10px] text-emerald-100 block">Docker + Grafana</span>
              </div>
              <div className="rounded-xl bg-emerald-700 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-100 block mb-1">Cible J+60</span>
                <span className="text-3xl font-black text-white">94</span>
                <span className="text-[10px] text-emerald-100 block">Qdrant + Tests</span>
              </div>
              <div className="rounded-xl bg-emerald-800 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-100 block mb-1">Cible J+90</span>
                <span className="text-3xl font-black text-white">95</span>
                <span className="text-[10px] text-emerald-100 block">ISO Certifié</span>
              </div>
            </div>

            <div className="space-y-4">
              {roadmap90j.map((phase) => (
                <div key={phase.priority} className="rounded-xl border border-background-200 bg-white p-5">
                  <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${phase.priority.includes('P0') ? 'text-red-700' : phase.priority.includes('P1') ? 'text-amber-700' : phase.priority.includes('P2') ? 'text-foreground-700' : 'text-emerald-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${phase.priority.includes('P0') ? 'bg-red-500' : phase.priority.includes('P1') ? 'bg-amber-500' : phase.priority.includes('P2') ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                    {phase.priority}
                  </h3>
                  <div className="space-y-2">
                    {phase.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded bg-background-100 text-foreground-600 font-bold text-[10px] mt-0.5">{i + 1}</span>
                        <span className="text-foreground-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Score Trajectory Replay */}
            <div className="rounded-xl border border-background-200 bg-white p-5">
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Trajectoire de Score — Historique Complet</h3>
              <div className="space-y-2">
                {maturitySnapshot.score_trajectory.map((t) => (
                  <div key={t.date} className="flex items-center gap-3">
                    <span className="text-[11px] text-foreground-400 w-32 flex-shrink-0 font-mono">{t.date}</span>
                    <div className="flex-1 h-4 rounded-full bg-background-100 overflow-hidden">
                      <div className={`h-full rounded-full ${scoreBarColor(t.score)} transition-all`} style={{ width: `${t.score}%` }} />
                    </div>
                    <span className={`text-sm font-black w-8 text-right flex-shrink-0 ${scoreColor(t.score)}`}>{t.score}</span>
                    <span className="text-[10px] text-foreground-400 flex-shrink-0 w-48 truncate">{t.event}</span>
                  </div>
                ))}
                {/* Cible */}
                <div className="flex items-center gap-3 border-t border-background-200 pt-2 mt-1">
                  <span className="text-[11px] text-emerald-600 w-32 flex-shrink-0 font-mono font-bold">J+90 (Cible)</span>
                  <div className="flex-1 h-4 rounded-full bg-background-100 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: '95%' }} />
                  </div>
                  <span className="text-sm font-black w-8 text-right flex-shrink-0 text-emerald-600">95</span>
                  <span className="text-[10px] text-emerald-600 flex-shrink-0 w-48 truncate font-bold">ISO 27001 Certifié + Docker Prod</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}



