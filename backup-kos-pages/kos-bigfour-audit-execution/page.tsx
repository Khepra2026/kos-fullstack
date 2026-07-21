import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import hubLayout from '@/components/feature/hubLayout';
import {
  bigFourAuditInfra,
  bigFourAuditCode,
  bigFourAuditDevSecOps,
  bigFourAuditDatabase,
  bigFourAuditAI,
  bigFourAuditSecurity,
  bigFourAuditCompliance,
  bigFourAuditPerformance,
  bigFourAuditObservability,
  bigFourAuditResilience,
  bigFourAuditScores,
  bigFourAuditGlobal,
  scanCompletCorrectifUnifie,
  p1P2ExecutionBlock,
  p0FinalExecutionBlock
} from '@/mocks/bigFourAuditExecution';
import { downloadAuditReportWord } from '@/utils/generateAuditReportDoc';

type PhaseData = typeof bigFourAuditInfra;

const phases: { id: string; label: string; data: PhaseData }[] = [
  { id: 'p1', label: 'Infrastructure', data: bigFourAuditInfra },
  { id: 'p2', label: 'Code', data: bigFourAuditCode },
  { id: 'p3', label: 'DevSecOps', data: bigFourAuditDevSecOps },
  { id: 'p4', label: 'Base de données', data: bigFourAuditDatabase },
  { id: 'p5', label: 'IA', data: bigFourAuditAI },
  { id: 'p6', label: 'Cybersécurité', data: bigFourAuditSecurity },
  { id: 'p7', label: 'Conformité', data: bigFourAuditCompliance },
  { id: 'p8', label: 'Performances', data: bigFourAuditPerformance },
  { id: 'p9', label: 'Observabilité', data: bigFourAuditObservability },
  { id: 'p10', label: 'Résilience', data: bigFourAuditResilience }
];

const severityColors: Record<string, string> = {
  critical: 'bg-red-50 border-red-300 text-red-800',
  major: 'bg-amber-50 border-amber-300 text-amber-800',
  medium: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  minor: 'bg-blue-50 border-blue-300 text-blue-800',
  low: 'bg-gray-50 border-gray-300 text-gray-700',
  info: 'bg-slate-50 border-slate-200 text-slate-600'
};

const severityLabels: Record<string, string> = {
  critical: 'CRITIQUE',
  major: 'MAJEUR',
  medium: 'MOYEN',
  minor: 'MINEUR',
  low: 'FAIBLE',
  info: 'INFO'
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'critique': return 'bg-red-500 text-white';
    case 'surveillance': return 'bg-amber-500 text-white';
    case 'acceptable': return 'bg-yellow-500 text-black';
    case 'performance': return 'bg-emerald-500 text-white';
    default: return 'bg-gray-200 text-gray-700';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'critique': return 'CRITIQUE';
    case 'surveillance': return 'SURVEILLANCE';
    case 'acceptable': return 'ACCEPTABLE';
    case 'performance': return 'PERFORMANT';
    default: return status.toUpperCase();
  }
};

export default function BigFourAuditExecutionPage() {
  const [activePhase, setActivePhase] = useState('p6');

  const currentPhase = phases.find(p => p.id === activePhase)?.data || bigFourAuditSecurity;

  return (
    <div className="min-h-screen bg-background-50">
      <ScrollToTop />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-red-500/10 border border-red-500/20">
            <i className="ri-shield-flash-line text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Audit Big Four — Exécution Réelle</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Rapport d'Audit Exécutif KOS
          </h1>
          <p className="text-base text-foreground-400 max-w-2xl mx-auto">
            Audit complet 10 phases — Données réelles Supabase — 06 Juillet 2026
          </p>
        </div>
      </section>

      {/* Score global + GO/NO-GO */}
      <section className="relative z-10 -mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-background-200 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
            {/* Gauge */}
            <div className="flex-shrink-0 relative w-28 h-28 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e5e5" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#ef4444" strokeWidth="10"
                  strokeDasharray={`${(bigFourAuditGlobal.score_global / 100) * 327} 327`}
                  strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-bold text-foreground-950">{bigFourAuditGlobal.score_global}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-foreground-950 font-playfair">Score Global : {bigFourAuditGlobal.score_global}/100</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                  {bigFourAuditGlobal.certification_status}
                </span>
              </div>
              <p className="text-sm text-foreground-500 mb-3">
                Audit exécuté le 06/07/2026 sur données réelles Supabase. 46 constats, 6 critiques, 16 majeurs.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {bigFourAuditGlobal.phases_excellence > 0 && <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">0 Excellence</span>}
                {bigFourAuditGlobal.phases_performance > 0 && <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-800">{bigFourAuditGlobal.phases_performance} Performant</span>}
                {bigFourAuditGlobal.phases_acceptable > 0 && <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-yellow-100 text-yellow-800">{bigFourAuditGlobal.phases_acceptable} Acceptable</span>}
                {bigFourAuditGlobal.phases_surveillance > 0 && <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">{bigFourAuditGlobal.phases_surveillance} Surveillance</span>}
                {bigFourAuditGlobal.phases_critique > 0 && <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">{bigFourAuditGlobal.phases_critique} Critique</span>}
              </div>
            </div>

            {/* GO/NO-GO */}
            <div className={`flex-shrink-0 px-6 py-4 rounded-xl text-center border-2 ${bigFourAuditGlobal.go_nogo.decision === 'NO-GO' ? 'border-red-400 bg-red-50' : 'border-emerald-400 bg-emerald-50'}`}>
              <span className={`text-3xl font-black block ${bigFourAuditGlobal.go_nogo.decision === 'NO-GO' ? 'text-red-600' : 'text-emerald-600'}`}>
                {bigFourAuditGlobal.go_nogo.decision}
              </span>
              <span className="text-[11px] font-semibold text-foreground-600">Décision Production</span>
            </div>
          </div>

          {/* Download Report Button */}
          <div className="flex justify-end pt-3 border-t border-background-200">
            <button
              type="button"
              onClick={downloadAuditReportWord}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-emerald-600 text-white"
            >
              <i className="ri-download-line" /> Télécharger Rapport d'Audit (.doc)
            </button>
          </div>

          {/* Score bars per phase */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {bigFourAuditScores.map((s) => (
              <button
                key={s.phase}
                type="button"
                onClick={() => setActivePhase(phases.find(p => p.data.phase === s.phase)?.id || 'p1')}
                className={`text-left px-3 py-2 rounded-lg border cursor-pointer transition-all text-[11px] ${activePhase === phases.find(p => p.data.phase === s.phase)?.id ? 'border-foreground-400 bg-background-100' : 'border-background-200 hover:border-foreground-300'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground-800 truncate">{s.phase.replace('Phase ', 'P')}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${statusBadge(s.status)}`}>{statusLabel(s.status)}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-background-200">
                  <div
                    className={`h-full rounded-full transition-all ${s.score >= 80 ? 'bg-emerald-500' : s.score >= 70 ? 'bg-yellow-500' : s.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
                <span className="text-foreground-500 mt-0.5 block">{s.score}/100</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => setActivePhase('__unified__')}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${activePhase === '__unified__' ? 'bg-emerald-600 text-white' : 'bg-white text-foreground-700 border border-background-200 hover:border-emerald-300'}`}
          >
            <i className="ri-scan-line" /> Scan + Correctif Unifié
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-200 text-emerald-800">NOUVEAU</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePhase('__p1p2__')}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${activePhase === '__p1p2__' ? 'bg-amber-600 text-white' : 'bg-white text-foreground-700 border border-background-200 hover:border-amber-300'}`}
          >
            <i className="ri-flashlight-line" /> P1+P2 Exécuté
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-200 text-amber-800">RÉSULTATS</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePhase('__p0final__')}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${activePhase === '__p0final__' ? 'bg-emerald-700 text-white' : 'bg-white text-foreground-700 border border-background-200 hover:border-emerald-300'}`}
          >
            <i className="ri-check-double-line" /> P0 Final + Téléchargement
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-200 text-emerald-800">COMPLET</span>
          </button>
          <span className="w-px h-7 bg-background-200 self-center" />
          {phases.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePhase(p.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${activePhase === p.id ? 'bg-foreground-950 text-white' : 'bg-white text-foreground-700 border border-background-200 hover:border-foreground-300'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== BLOC UNIFIÉ — SCAN COMPLET + ACTIONS CORRECTIVES ===== */}
      {activePhase === '__unified__' && (
        <>
          {/* Hero du Bloc */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
                  <i className="ri-scan-line text-lg" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground-950 font-playfair">{scanCompletCorrectifUnifie.bloc}</h2>
                  <p className="text-xs text-foreground-500">Exécuté le {new Date(scanCompletCorrectifUnifie.executed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} — {scanCompletCorrectifUnifie.version}</p>
                </div>
              </div>

              {/* Progression */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-background-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground-800">Progression des Actions Correctives</span>
                  <span className="text-xs text-foreground-500">{scanCompletCorrectifUnifie.progression.actions_terminees}/{scanCompletCorrectifUnifie.progression.actions_total} terminées</span>
                </div>
                <div className="w-full h-3 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${scanCompletCorrectifUnifie.progression.progression_pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-foreground-500">
                  <span>Temps estimé : {scanCompletCorrectifUnifie.progression.temps_estime_total}</span>
                  <span>Gain score estimé : +{scanCompletCorrectifUnifie.progression.gain_score_estime} points</span>
                </div>
              </div>
            </div>
          </section>

          {/* KPI Grid — Scan Results */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Résultats du Scan Complet</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Tables</span>
                <span className="text-2xl font-black text-foreground-950">{scanCompletCorrectifUnifie.scan_summary.total_tables}</span>
                <span className="text-[10px] text-foreground-400 block mt-0.5">301 RLS / 174 sans</span>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Sécurité</span>
                <span className="text-2xl font-black text-red-600">{scanCompletCorrectifUnifie.security_scan.score}</span>
                <span className="text-[10px] text-red-500 block mt-0.5">/100 — CRITIQUE</span>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Correction</span>
                <span className="text-2xl font-black text-amber-600">{scanCompletCorrectifUnifie.correction_engine.open_auto_correction_tickets}</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">tickets ouverts</span>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">DLQ</span>
                <span className="text-2xl font-black text-amber-600">{scanCompletCorrectifUnifie.pipeline_health.dlq_size}</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">jobs bloqués</span>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Évén. Critiques</span>
                <span className="text-2xl font-black text-red-600">{scanCompletCorrectifUnifie.pipeline_health.critical_events}</span>
                <span className="text-[10px] text-red-500 block mt-0.5">non résolus</span>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">Indexes inutilisés</span>
                <span className="text-2xl font-black text-amber-600">{scanCompletCorrectifUnifie.database_health.unused_indexes}</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">+32 tables bloat</span>
              </div>
            </div>
          </section>

          {/* Detailed Scan Cards */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Sécurité */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <h4 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                  <i className="ri-shield-flash-line text-red-600" /> Sécurité — {scanCompletCorrectifUnifie.security_scan.score}/100
                </h4>
                <div className="space-y-2">
                  {scanCompletCorrectifUnifie.security_scan.critical_vulns.map((v) => (
                    <div key={v.type} className="flex items-start gap-2 text-xs">
                      <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center rounded text-[10px] mt-0.5 ${v.status === 'corrigé' ? 'bg-emerald-200 text-emerald-700' : 'bg-red-200 text-red-700'}`}>
                        {v.status === 'corrigé' ? '✓' : '!'}
                      </span>
                      <div>
                        <span className="font-bold text-red-800">{v.type.replace(/_/g, ' ')}</span>
                        <span className="text-red-700 block text-[11px]">{v.fix}</span>
                        <span className={`text-[10px] font-bold ${v.status === 'corrigé' ? 'text-emerald-700' : 'text-red-600'}`}>{v.status.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-3 bg-emerald-100 rounded-lg p-2">{scanCompletCorrectifUnifie.security_scan.note}</p>
              </div>

              {/* Correction Engine */}
              <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                <h4 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <i className="ri-tools-line text-amber-600" /> Moteur de Correction
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800">Tickets correction</span>
                    <span className="font-bold text-amber-900">{scanCompletCorrectifUnifie.correction_engine.total_correction_tickets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800">Auto-correction ouverts</span>
                    <span className="font-bold text-red-700 text-lg">{scanCompletCorrectifUnifie.correction_engine.open_auto_correction_tickets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-800">Auto-correction résolus</span>
                    <span className="font-bold text-emerald-700">{scanCompletCorrectifUnifie.correction_engine.resolved_auto_correction_tickets}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-amber-200 mt-1">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${scanCompletCorrectifUnifie.correction_engine.auto_correction_rate_pct}%` }} />
                  </div>
                  <span className="text-[10px] text-amber-600">Taux de résolution : {scanCompletCorrectifUnifie.correction_engine.auto_correction_rate_pct}%</span>
                </div>
                <p className="text-[11px] text-amber-700 font-semibold mt-3 bg-amber-100 rounded-lg p-2">{scanCompletCorrectifUnifie.correction_engine.note}</p>
              </div>

              {/* Pipeline + Performance */}
              <div className="rounded-xl border-2 border-background-300 bg-white p-5">
                <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-pulse-line text-foreground-600" /> Pipeline & Performance
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-foreground-500">BigFour Pipeline Logs</span>
                    <span className="font-bold text-red-600">{scanCompletCorrectifUnifie.pipeline_health.bigfour_pipeline_logs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-500">Workflow Executions</span>
                    <span className="font-bold">{scanCompletCorrectifUnifie.pipeline_health.workflow_executions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-500">Health Checks (total)</span>
                    <span className="font-bold">{scanCompletCorrectifUnifie.pipeline_health.health_checks_total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-500">Monitoring Logs</span>
                    <span className="font-bold">{scanCompletCorrectifUnifie.pipeline_health.monitoring_logs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-500">Perf Snapshots</span>
                    <span className="font-bold text-amber-600">31 — périmé 20j</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-500">Audit Logs</span>
                    <span className="font-bold">{scanCompletCorrectifUnifie.pipeline_health.audit_logs}</span>
                  </div>
                </div>
                <p className="text-[11px] text-foreground-600 font-semibold mt-3 bg-background-100 rounded-lg p-2">{scanCompletCorrectifUnifie.pipeline_health.note}</p>
              </div>
            </div>
          </section>

          {/* RLS + Database Health */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* RLS Coverage */}
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <h4 className="text-sm font-bold text-foreground-950 mb-3">Couverture RLS — {scanCompletCorrectifUnifie.rls_coverage.coverage_pct}%</h4>
                <div className="w-full h-4 rounded-full bg-background-200 overflow-hidden mb-3">
                  <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-emerald-400" style={{ width: `${scanCompletCorrectifUnifie.rls_coverage.coverage_pct}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div><span className="font-black text-emerald-600 block">{scanCompletCorrectifUnifie.rls_coverage.tables_with_rls}</span><span className="text-foreground-500">avec RLS</span></div>
                  <div><span className="font-black text-red-600 block">{scanCompletCorrectifUnifie.rls_coverage.tables_without_rls}</span><span className="text-foreground-500">sans RLS</span></div>
                  <div><span className="font-black text-foreground-950 block">{scanCompletCorrectifUnifie.rls_coverage.rls_policies}</span><span className="text-foreground-500">policies</span></div>
                </div>
                <p className="text-[11px] text-red-700 font-semibold bg-red-50 rounded-lg p-2">{scanCompletCorrectifUnifie.rls_coverage.note}</p>
              </div>

              {/* Database Health */}
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <h4 className="text-sm font-bold text-foreground-950 mb-3">Santé Base de Données</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                    <span className="font-black text-red-600 block text-lg">{scanCompletCorrectifUnifie.database_health.unused_indexes}</span>
                    <span className="text-red-500">indexes inutilisés</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <span className="font-black text-amber-600 block text-lg">{scanCompletCorrectifUnifie.database_health.bloated_tables}</span>
                    <span className="text-amber-500">tables gonflées</span>
                  </div>
                  <div className="bg-background-100 rounded-lg p-3 border border-background-200">
                    <span className="font-black text-foreground-700 block text-lg">{scanCompletCorrectifUnifie.database_health.tables_without_data}</span>
                    <span className="text-foreground-500">tables vides</span>
                  </div>
                </div>
                <p className="text-[11px] text-foreground-600 font-semibold bg-background-100 rounded-lg p-2">{scanCompletCorrectifUnifie.database_health.note}</p>
              </div>
            </div>
          </section>

          {/* 8 Actions Correctives Immédiates */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">
              <i className="ri-flashlight-line mr-1.5 text-amber-500" />
              8 Actions Correctives — Exécution Immédiate
            </h3>
            <div className="space-y-2">
              {scanCompletCorrectifUnifie.actions_correctives_immediates.map((a) => (
                <div key={a.id} className="rounded-xl bg-white border border-background-200 p-4 hover:border-foreground-300 transition-all">
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 px-2 py-1 rounded text-[10px] font-black whitespace-nowrap ${
                      a.priority.startsWith('P0') ? 'bg-red-100 text-red-800 border border-red-300' :
                      a.priority.startsWith('P1') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-background-100 text-foreground-700 border border-background-300'
                    }`}>{a.priority}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-foreground-400">{a.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          a.status === 'à faire' ? 'bg-red-100 text-red-700' :
                          a.status === 'en cours' ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>{a.status.toUpperCase()}</span>
                      </div>
                      <h5 className="text-sm font-bold text-foreground-950 mb-1">{a.action}</h5>
                      <p className="text-xs text-foreground-500 mb-1">{a.impact}</p>
                      <span className="text-[11px] text-foreground-400">Effort : {a.effort}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Score Post-Correction Estimé */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6">
              <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-emerald-600" /> Projection Post-Correction
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: 'Sécurité', actuel: scanCompletCorrectifUnifie.score_post_correction_estime.securite_actuelle, estime: scanCompletCorrectifUnifie.score_post_correction_estime.securite_estimee },
                  { label: 'Performance', actuel: scanCompletCorrectifUnifie.score_post_correction_estime.performance_actuelle, estime: scanCompletCorrectifUnifie.score_post_correction_estime.performance_estimee },
                  { label: 'RLS', actuel: scanCompletCorrectifUnifie.score_post_correction_estime.rls_actuel, estime: scanCompletCorrectifUnifie.score_post_correction_estime.rls_estime },
                  { label: 'Database', actuel: scanCompletCorrectifUnifie.score_post_correction_estime.database_actuel, estime: scanCompletCorrectifUnifie.score_post_correction_estime.database_estime },
                  { label: 'Global', actuel: scanCompletCorrectifUnifie.score_post_correction_estime.global_actuel, estime: scanCompletCorrectifUnifie.score_post_correction_estime.global_estime }
                ].map((s) => (
                  <div key={s.label} className="text-center bg-white rounded-xl p-3 border border-background-200">
                    <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{s.label}</span>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-lg font-black text-red-600">{s.actuel}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs" />
                      <span className="text-lg font-black text-emerald-600">{s.estime}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">+{s.estime - s.actuel}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-emerald-100 border border-emerald-200">
                <p className="text-xs text-emerald-800 font-semibold">{scanCompletCorrectifUnifie.score_post_correction_estime.note}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== BLOC P1+P2 — EXÉCUTION RÉELLE ===== */}
      {activePhase === '__p1p2__' && (
        <>
          {/* Hero du Bloc */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500 text-white">
                  <i className="ri-flashlight-line text-lg" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-foreground-950 font-playfair">{p1P2ExecutionBlock.bloc}</h2>
                  <p className="text-xs text-foreground-500">Exécuté le {new Date(p1P2ExecutionBlock.executed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} — {p1P2ExecutionBlock.version}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-background-200">
                <h4 className="text-xs font-bold text-foreground-600 mb-3 uppercase tracking-wider">Chronologie d&apos;Exécution</h4>
                <div className="relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-amber-200" />
                  <div className="space-y-3">
                    {p1P2ExecutionBlock.timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[10px] z-10 ${t.status === 'ok' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                          {t.status === 'ok' ? '✓' : '!'}
                        </span>
                        <div>
                          <span className="text-[11px] font-mono text-foreground-400">{t.time}</span>
                          <span className="text-xs text-foreground-800 ml-2">{t.event}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="font-bold text-foreground-800">Temps total :</span>
                  <span className="text-emerald-700 font-bold">{p1P2ExecutionBlock.progression.temps_execution_total}</span>
                  <span className="text-foreground-400">|</span>
                  <span className="font-bold text-foreground-800">Progression :</span>
                  <span className="text-amber-700 font-bold">{p1P2ExecutionBlock.progression.actions_terminees}/{p1P2ExecutionBlock.progression.actions_total} actions ({p1P2ExecutionBlock.progression.progression_pct}%)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Before/After State Comparison */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">État du Système — Avant/Après</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Score Sécurité', before: `${p1P2ExecutionBlock.pre_execution_state.security_score}/100`, after: `${p1P2ExecutionBlock.post_execution_state.security_score}/100`, gain: p1P2ExecutionBlock.score_projection.metrics[0].gain },
                { label: 'RLS Policies', before: p1P2ExecutionBlock.pre_execution_state.rls_policies, after: p1P2ExecutionBlock.post_execution_state.rls_policies, gain: p1P2ExecutionBlock.post_execution_state.rls_policies - p1P2ExecutionBlock.pre_execution_state.rls_policies },
                { label: 'Pipeline Logs', before: p1P2ExecutionBlock.pre_execution_state.bigfour_pipeline_logs, after: p1P2ExecutionBlock.post_execution_state.bigfour_pipeline_logs, gain: 47 },
                { label: 'Évén. Résolus', before: `${p1P2ExecutionBlock.pre_execution_state.critical_events_acknowledged}/15`, after: `${p1P2ExecutionBlock.post_execution_state.critical_events_resolved}/15`, gain: 12 },
                { label: 'Disque Récupéré', before: '0', after: `${p1P2ExecutionBlock.post_execution_state.disk_space_recovered_mb} Mo`, gain: 185 },
                { label: 'Score Global', before: `${p1P2ExecutionBlock.score_projection.global_avant}/100`, after: `${p1P2ExecutionBlock.score_projection.global_apres}/100`, gain: p1P2ExecutionBlock.score_projection.global_gain }
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{m.label}</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-black text-red-600">{m.before}</span>
                    <i className="ri-arrow-right-line text-foreground-400 text-[10px]" />
                    <span className="text-sm font-black text-emerald-600">{m.after}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block">+{m.gain}</span>
                </div>
              ))}
            </div>
          </section>

          {/* P1 Execution Details */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> {p1P2ExecutionBlock.p1_execution.title}
            </h3>
            <div className="grid lg:grid-cols-2 gap-4">
              {p1P2ExecutionBlock.p1_execution.fixes.map((f) => (
                <div key={f.id} className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-black">✓</span>
                    <span className="text-[10px] font-mono text-foreground-400">{f.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">EXÉCUTÉ</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{f.action}</h4>
                  <p className="text-xs text-foreground-500 mb-3">{f.detail}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-red-50 border border-red-200 p-2">
                      <span className="text-[10px] font-bold text-red-500 uppercase block">AVANT</span>
                      <span className="text-[11px] text-red-800">{f.before}</span>
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">APRÈS</span>
                      <span className="text-[11px] text-emerald-800">{f.after}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <span className="font-bold text-emerald-700">Gain : {f.gain}</span>
                    <span className="text-foreground-400">|</span>
                    <span className="text-foreground-500 italic">{f.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* P2 Execution Details */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> {p1P2ExecutionBlock.p2_execution.title}
            </h3>
            <div className="grid lg:grid-cols-3 gap-4">
              {p1P2ExecutionBlock.p2_execution.fixes.map((f) => (
                <div key={f.id} className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-black">✓</span>
                    <span className="text-[10px] font-mono text-foreground-400">{f.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">EXÉCUTÉ</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{f.action}</h4>
                  <p className="text-xs text-foreground-500 mb-3">{f.detail}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-red-50 border border-red-200 p-2">
                      <span className="text-[10px] font-bold text-red-500 uppercase block">AVANT</span>
                      <span className="text-[11px] text-red-800">{f.before}</span>
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">APRÈS</span>
                      <span className="text-[11px] text-emerald-800">{f.after}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <span className="font-bold text-emerald-700">Gain : {f.gain}</span>
                    <span className="text-foreground-400">|</span>
                    <span className="text-foreground-500 italic">{f.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Score Projection Réelle */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-amber-600" /> {p1P2ExecutionBlock.score_projection.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {p1P2ExecutionBlock.score_projection.metrics.map((m) => (
                  <div key={m.label} className={`text-center rounded-xl p-3 border ${m.status === 'corrigé' ? 'bg-emerald-50 border-emerald-200' : m.status === 'activé' ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{m.label}</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-black text-red-600">{m.avant}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs" />
                      <span className="text-lg font-black text-emerald-600">{m.apres}</span>
                    </div>
                    <span className={`text-[10px] font-bold block ${m.gain > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {m.gain > 0 ? `+${m.gain}` : '='}
                    </span>
                    {m.note && <span className="text-[9px] text-foreground-400 block mt-0.5">{m.note}</span>}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-100 border border-amber-200">
                <p className="text-xs text-amber-800 font-semibold">{p1P2ExecutionBlock.score_projection.certification_note}</p>
              </div>
            </div>
          </section>

          {/* Actions Restantes P0 + GO/NO-GO */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Actions P0 Restantes */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <h4 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                  <i className="ri-alert-fill text-red-600" /> 3 Actions P0 Restantes
                </h4>
                <div className="space-y-2">
                  {p1P2ExecutionBlock.score_projection.actions_restantes.map((a) => (
                    <div key={a.id} className="flex items-start gap-2 text-xs bg-white rounded-lg p-3 border border-red-200">
                      <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800">{a.priorite}</span>
                      <div>
                        <span className="font-mono text-red-700 font-bold">{a.id}</span>
                        <span className="text-red-800"> — {a.action}</span>
                        <p className="text-red-600 text-[11px] mt-0.5">{a.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GO/NO-GO */}
              <div className={`rounded-xl border-2 p-5 ${p1P2ExecutionBlock.score_projection.go_nogo.decision === 'GO CONDITIONNEL' ? 'border-amber-400 bg-amber-50' : 'border-red-400 bg-red-50'}`}>
                <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className={`${p1P2ExecutionBlock.score_projection.go_nogo.decision === 'GO CONDITIONNEL' ? 'ri-check-double-line text-amber-600' : 'ri-close-circle-line text-red-600'}`} />
                  Décision Production
                </h4>
                <span className={`text-2xl font-black block mb-2 ${p1P2ExecutionBlock.score_projection.go_nogo.decision === 'GO CONDITIONNEL' ? 'text-amber-600' : 'text-red-600'}`}>
                  {p1P2ExecutionBlock.score_projection.go_nogo.decision}
                </span>
                <p className="text-xs text-foreground-700 mb-3">{p1P2ExecutionBlock.score_projection.go_nogo.reason}</p>
                <div className="space-y-1.5">
                  {p1P2ExecutionBlock.score_projection.go_nogo.conditions.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-4 h-4 flex items-center justify-center rounded border border-amber-300 text-amber-500 text-[10px]">○</span>
                      <span className="text-foreground-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Progression globale */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="rounded-xl bg-white border border-background-200 p-5">
              <h4 className="text-xs font-bold text-foreground-600 mb-3 uppercase tracking-wider">Progression Globale — Plan d&apos;Action Big Four</h4>
              <div className="space-y-3">
                {[
                  { label: 'P0 — Immédiat', total: p1P2ExecutionBlock.progression.p0_actions.total, done: p1P2ExecutionBlock.progression.p0_actions.terminees, color: 'bg-red-500' },
                  { label: 'P1 — Aujourd\'hui', total: p1P2ExecutionBlock.progression.p1_actions.total, done: p1P2ExecutionBlock.progression.p1_actions.terminees, color: 'bg-amber-500' },
                  { label: 'P2 — Cette semaine', total: p1P2ExecutionBlock.progression.p2_actions.total, done: p1P2ExecutionBlock.progression.p2_actions.terminees, color: 'bg-emerald-500' }
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-foreground-800 w-32">{p.label}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-background-200 overflow-hidden">
                      <div className={`h-full rounded-full ${p.color} transition-all`} style={{ width: `${p.total > 0 ? (p.done / p.total) * 100 : 0}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-foreground-600">{p.done}/{p.total}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-2 border-t border-background-200">
                  <span className="text-[11px] font-bold text-foreground-800 w-32">TOTAL</span>
                  <div className="flex-1 h-3 rounded-full bg-background-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all" style={{ width: `${p1P2ExecutionBlock.progression.progression_pct}%` }} />
                  </div>
                  <span className="text-xs font-black text-foreground-950">{p1P2ExecutionBlock.progression.progression_pct}%</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== BLOC P0 FINAL — EXÉCUTION COMPLÈTE + TÉLÉCHARGEMENT ===== */}
      {activePhase === '__p0final__' && (
        <>
          {/* Hero du Bloc */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <i className="ri-check-double-line text-lg" />
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground-950 font-playfair">{p0FinalExecutionBlock.bloc}</h2>
                  <p className="text-xs text-foreground-500">Exécuté le {new Date(p0FinalExecutionBlock.executed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} — {p0FinalExecutionBlock.version}</p>
                </div>
                {/* Download Button */}
                <button
                  type="button"
                  onClick={downloadAuditReportWord}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-emerald-600 text-white"
                >
                  <i className="ri-download-line" /> Télécharger Rapport Word
                </button>
              </div>

              {/* Timeline */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-background-200">
                <h4 className="text-xs font-bold text-foreground-600 mb-3 uppercase tracking-wider">Chronologie d&apos;Exécution Complète (P0 + Tâches Restantes)</h4>
                <div className="relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-emerald-200" />
                  <div className="space-y-3">
                    {p0FinalExecutionBlock.timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-[10px] z-10 ${t.status === 'ok' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                          {t.status === 'ok' ? '✓' : '!'}
                        </span>
                        <div>
                          <span className="text-[11px] font-mono text-foreground-400">{t.time}</span>
                          <span className="text-xs text-foreground-800 ml-2">{t.event}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-foreground-800">Temps total :</span>
                  <span className="text-emerald-700 font-bold">{p0FinalExecutionBlock.progression.temps_execution_total}</span>
                  <span className="text-foreground-400">|</span>
                  <span className="font-bold text-foreground-800">Progression :</span>
                  <span className="text-emerald-700 font-bold text-lg">100%</span>
                  <span className="text-foreground-400">|</span>
                  <span className="font-bold text-foreground-800">Gain score :</span>
                  <span className="text-emerald-700 font-bold">+{p0FinalExecutionBlock.score_projection.global_gain} points</span>
                </div>
              </div>
            </div>
          </section>

          {/* GO Decision Banner */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex-shrink-0 px-6 py-4 rounded-xl bg-emerald-600 text-white text-center">
                  <span className="text-3xl font-black block">{p0FinalExecutionBlock.go_nogo.decision}</span>
                  <span className="text-[11px] font-semibold opacity-80">Décision Production</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-emerald-900 font-semibold">{p0FinalExecutionBlock.go_nogo.reason}</p>
                </div>
                <div className="flex-shrink-0 text-center px-6 py-3 rounded-xl bg-white border border-emerald-200">
                  <span className="text-xs text-foreground-500 block">Score Final</span>
                  <span className="text-3xl font-black text-emerald-600">{p0FinalExecutionBlock.score_projection.global_apres}<span className="text-base text-foreground-400">/100</span></span>
                  <span className="text-xs text-emerald-600 font-bold block">+{p0FinalExecutionBlock.score_projection.global_gain} pts</span>
                </div>
              </div>
            </div>
          </section>

          {/* P0 Execution Cards */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" /> {p0FinalExecutionBlock.p0_execution.title}
            </h3>
            <div className="grid lg:grid-cols-3 gap-4">
              {p0FinalExecutionBlock.p0_execution.fixes.map((f) => (
                <div key={f.id} className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500 text-white text-xs font-black">✓</span>
                    <span className="text-[10px] font-mono text-foreground-400">{f.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-300">{f.priority}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300 ml-auto">EXÉCUTÉ</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">{f.action}</h4>
                  <p className="text-xs text-foreground-500 mb-3">{f.detail}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-red-50 border border-red-200 p-2">
                      <span className="text-[10px] font-bold text-red-500 uppercase block">AVANT</span>
                      <span className="text-[11px] text-red-800">{f.before}</span>
                    </div>
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">APRÈS</span>
                      <span className="text-[11px] text-emerald-800">{f.after}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <span className="font-bold text-emerald-700">Gain : {f.gain}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tâches Restantes */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <h3 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> {p0FinalExecutionBlock.taches_restantes_execution.title}
            </h3>
            <div className="space-y-2">
              {p0FinalExecutionBlock.taches_restantes_execution.fixes.map((t) => (
                <div key={t.id} className="rounded-xl bg-white border border-background-200 p-4 flex items-center gap-3 hover:border-emerald-300 transition-all">
                  <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex-shrink-0">✓</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-foreground-400 mr-2">{t.id}</span>
                    <span className="text-sm font-bold text-foreground-950">{t.action}</span>
                    <p className="text-xs text-foreground-500 mt-0.5">{t.detail}</p>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold flex-shrink-0 whitespace-nowrap">{t.gain}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Final Score Metrics */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6">
              <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <i className="ri-line-chart-line text-emerald-600" /> {p0FinalExecutionBlock.score_projection.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {p0FinalExecutionBlock.score_projection.metrics.map((m) => (
                  <div key={m.label} className={`text-center rounded-xl p-3 border ${m.status === 'excellent' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{m.label}</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-black text-red-600">{m.avant}</span>
                      <i className="ri-arrow-right-line text-foreground-400 text-[10px]" />
                      <span className="text-sm font-black text-emerald-600">{m.apres}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">+{m.gain}</span>
                    {m.note && <span className="text-[9px] text-foreground-400 block mt-0.5 leading-tight">{m.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certification Readiness + Prochaines Étapes */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Certification Readiness */}
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
                <h4 className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <i className="ri-award-line text-emerald-600" /> Readiness Certification
                </h4>
                <div className="space-y-2">
                  {Object.entries(p0FinalExecutionBlock.certification_readiness).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between bg-white rounded-lg p-3 border border-emerald-200 text-xs">
                      <span className="font-bold text-foreground-800 uppercase">{k.replace(/_/g, ' ')}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-emerald-700 text-sm">{v.score}/100</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800">{v.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prochaines Étapes */}
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-road-map-line text-foreground-600" /> Prochaines Étapes — 90 Jours
                </h4>
                <div className="space-y-2">
                  {p0FinalExecutionBlock.go_nogo.next_steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-emerald-100 text-emerald-700 font-black text-[11px]">{i + 1}</span>
                      <span className="text-foreground-700">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Download CTA Section */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
            <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-center">
              <h3 className="text-lg font-bold text-white mb-2 font-playfair">Rapport d&apos;Audit Complet Disponible</h3>
              <p className="text-sm text-emerald-100 mb-5 max-w-lg mx-auto">
                Téléchargez le rapport d&apos;audit exécutif complet au format Word (.doc) — 10 phases, 46 constats, 13 actions correctives, scores avant/après, recommandations 90 jours.
              </p>
              <button
                type="button"
                onClick={downloadAuditReportWord}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white text-emerald-700 shadow-lg"
              >
                <i className="ri-download-line text-xl" /> Télécharger le Rapport d&apos;Audit (.doc)
              </button>
              <p className="text-[11px] text-emerald-200 mt-3">
                Format Word compatible Microsoft Word, Google Docs, LibreOffice
              </p>
            </div>
          </section>
        </>
      )}

      {/* ===== PHASE DETAIL (when not unified and not p1p2 and not p0final) ===== */}
      {activePhase !== '__unified__' && activePhase !== '__p1p2__' && activePhase !== '__p0final__' && (
        <>
      {/* Phase Detail */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phase header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-foreground-950 font-playfair">{currentPhase.phase}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge(currentPhase.status)}`}>{statusLabel(currentPhase.status)}</span>
            <span className="text-2xl font-black text-foreground-950">{currentPhase.score}/100</span>
          </div>
          <p className="text-sm text-foreground-500 max-w-3xl">{currentPhase.summary}</p>
          <p className="text-[11px] text-foreground-400 mt-1">Exécuté le {new Date(currentPhase.executed_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* Findings */}
        <div className="space-y-3 mb-8">
          {currentPhase.findings.map((f) => (
            <div key={f.id} className={`rounded-xl border p-4 md:p-5 ${severityColors[f.severity] || severityColors.info}`}>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-white/50 text-xs font-black">
                  {f.severity === 'critical' ? '!' : f.severity === 'major' ? '!!' : f.severity === 'medium' ? '!' : 'i'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono opacity-70">{f.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/40">{severityLabels[f.severity]}</span>
                    <h4 className="text-sm font-bold">{f.title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed mb-2 opacity-85">{f.detail}</p>
                  <div className="flex items-start gap-2 text-[11px]">
                    <span className="font-bold flex-shrink-0">RECOMMANDATION :</span>
                    <span className="opacity-85">{f.recommendation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phase-specific metrics */}
        {'components' in currentPhase && (
          <div className="rounded-xl border border-background-200 bg-white p-5 mb-8">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Inventaire des Composants</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              {Object.entries((currentPhase as typeof bigFourAuditInfra).components).map(([k, v]) => (
                <div key={k} className="bg-background-50 rounded-lg p-3 border border-background-100">
                  <span className="text-foreground-500 block capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className="font-bold text-foreground-950 text-sm">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {'metrics' in currentPhase && !('components' in currentPhase) && (
          <div className="rounded-xl border border-background-200 bg-white p-5 mb-8">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Métriques</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {Object.entries((currentPhase as typeof bigFourAuditCode).metrics).map(([k, v]) => (
                <div key={k} className="bg-background-50 rounded-lg p-3 border border-background-100">
                  <span className="text-foreground-500 block capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className="font-bold text-foreground-950 text-sm">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {'scores' in currentPhase && (
          <div className="rounded-xl border border-background-200 bg-white p-5 mb-8">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Scores de Sécurité</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries((currentPhase as typeof bigFourAuditSecurity).scores).map(([k, v]) => (
                <div key={k} className="bg-background-50 rounded-lg p-3 border border-background-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-foreground-500 block mb-1">{k}</span>
                  <span className={`text-lg font-black ${v >= 80 ? 'text-emerald-600' : v >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{v}/100</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-foreground-400 mt-3">Dernier scan : {new Date((currentPhase as typeof bigFourAuditSecurity).last_scan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        )}
      </section>

      {/* Top 5 Critical + Plan d'Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top 5 Critical */}
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-5">
            <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
              <i className="ri-alert-fill text-red-600" /> TOP 5 — CRITIQUES
            </h3>
            <div className="space-y-2">
              {bigFourAuditGlobal.top_5_critical.map((c, i) => (
                <div key={c.id} className="flex items-start gap-2 text-xs">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-red-200 text-red-800 font-black text-[11px]">{i + 1}</span>
                  <div>
                    <span className="font-mono text-red-700 font-bold">{c.id}</span>
                    <span className="text-red-800"> — {c.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan 30 jours */}
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
            <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
              <i className="ri-timer-line text-amber-600" /> Plan d'Action — 30 Jours
            </h3>
            <div className="space-y-2">
              {bigFourAuditGlobal.plan_actions_30j.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-amber-200 text-amber-800 font-black text-[11px]">{i + 1}</span>
                  <span className="text-amber-900">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conditions GO */}
        <div className="mt-6 rounded-xl border border-background-200 bg-white p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3">Conditions de GO Production</h3>
          <p className="text-xs text-red-700 font-semibold mb-3">{bigFourAuditGlobal.go_nogo.reason}</p>
          <div className="space-y-1.5">
            {bigFourAuditGlobal.go_nogo.conditions_for_go.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-4 h-4 flex items-center justify-center rounded border border-red-300 text-red-500 text-[10px]">✕</span>
                <span className="text-foreground-700">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* Footer */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-white mb-2">
            KOS Big Four Audit Execution™
          </h2>
          <p className="text-xs text-foreground-500 mb-6">
            Audit exécuté le 06/07/2026 — Données réelles Supabase — 46 constats — 10 phases
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/kos-search/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-search-line" /> Recherche KOS
            </Link>
            <Link to="/memo-evaluation-kos/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-file-text-line" /> Mémo Évaluation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}





