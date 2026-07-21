import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/pages/home/components/Navigation';
import { Footer } from '@/pages/home/components/Footer';
import ScrollToTop from '@/components/feature/ScrollToTop';
import {
  auditLiveSummary,
  phasesScores,
  globalScore,
  p0CorrectionsExecutees,
  p1ActionsRecommandees,
  certificationRoadmap,
  top5Critiques,
  goNogoConditions,
  timeline,
} from '@/mocks/bigFourAudit';

const certColors: Record<string, string> = {
  emerald: 'border-emerald-300 bg-emerald-50',
  amber: 'border-amber-300 bg-amber-50',
};

export default function BigFourAuditPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'corrections' | 'certification' | 'actions'>('overview');

  return (
    <div className="min-h-screen bg-background-50">
      <ScrollToTop />
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="relative pt-28 pb-14 bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #c4a235 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 bg-emerald-500/10 border border-emerald-500/20">
                <i className="ri-shield-check-line text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Audit Big Four — Scan Complet</span>
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                KOS System Audit
              </h1>
              <p className="text-base text-foreground-400 max-w-xl">
                Scan intégral exécuté sur données réelles Supabase — 06 Juillet 2026. 462 tables, 101 Edge Functions, 127 hubs, 15 événements critiques.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <Link
                  to="/kos-bigfour-audit-execution/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-emerald-600 text-white"
                >
                  <i className="ri-file-list-3-line" /> Rapport d&apos;Audit Complet
                </Link>
                <Link
                  to="/kos-bigfour-quality-governance/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10"
                >
                  <i className="ri-government-line" /> Gouvernance Qualité
                </Link>
              </div>
            </div>

            {/* Score Gauge */}
            <div className="flex-shrink-0 flex items-center gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#86BC25" strokeWidth="10"
                    strokeDasharray={`${(globalScore.score / 100) * 327} 327`}
                    strokeLinecap="round" />
                </svg>
                <span className="absolute text-2xl font-black text-white">{globalScore.score}</span>
              </div>
              <div>
                <span className="text-xs text-foreground-400 block">Score Global</span>
                <span className="text-lg font-bold text-emerald-400">{globalScore.certification_status}</span>
                <div className="mt-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-sm font-black text-emerald-400">{globalScore.go_nogo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KPI BAND ===== */}
      <section className="relative z-10 -mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-background-200 p-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          <div className="text-center px-2 py-2 rounded-lg bg-emerald-50">
            <span className="text-xl font-black text-emerald-600 block">{auditLiveSummary.rls_coverage_pct}%</span>
            <span className="text-[10px] text-foreground-500">Couverture RLS</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-emerald-50">
            <span className="text-xl font-black text-emerald-600 block">{auditLiveSummary.security_score_apres_fix}</span>
            <span className="text-[10px] text-foreground-500">Score Sécurité</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-amber-50">
            <span className="text-xl font-black text-amber-600 block">{auditLiveSummary.critical_events_unacknowledged}</span>
            <span className="text-[10px] text-foreground-500">Évén. Critiques</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-amber-50">
            <span className="text-xl font-black text-amber-600 block">{auditLiveSummary.dlq_pending}</span>
            <span className="text-[10px] text-foreground-500">DLQ Pending</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-amber-50">
            <span className="text-xl font-black text-amber-600 block">{auditLiveSummary.correction_tickets_open}</span>
            <span className="text-[10px] text-foreground-500">Tickets Ouverts</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-red-50">
            <span className="text-xl font-black text-red-600 block">{auditLiveSummary.pipeline_logs}</span>
            <span className="text-[10px] text-foreground-500">Pipeline Logs</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-amber-50">
            <span className="text-xl font-black text-amber-600 block">{auditLiveSummary.perf_data_age_days}j</span>
            <span className="text-[10px] text-foreground-500">Data Perf Âge</span>
          </div>
          <div className="text-center px-2 py-2 rounded-lg bg-red-50">
            <span className="text-xl font-black text-red-600 block">{auditLiveSummary.edge_functions}/{auditLiveSummary.edge_functions_limit}</span>
            <span className="text-[10px] text-foreground-500">Edge Functions</span>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-2">
          {([
            { key: 'overview' as const, label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
            { key: 'corrections' as const, label: 'Corrections P0', icon: 'ri-tools-line' },
            { key: 'certification' as const, label: 'Certification', icon: 'ri-award-line' },
            { key: 'actions' as const, label: 'Plan d\'Action', icon: 'ri-road-map-line' },
          ]).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.key ? 'bg-foreground-950 text-white' : 'bg-white text-foreground-700 border border-background-200 hover:border-foreground-300'}`}
            >
              <i className={tab.icon} /> {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === 'overview' && (
        <>
          {/* Phases Scores Grid */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <h2 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Scores par Phase — 10 Axes Big Four</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {phasesScores.map((p) => (
                <div key={p.phase} className="rounded-xl bg-white border border-background-200 p-4 hover:border-foreground-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground-800">{p.phase}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      p.status === 'performance' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'acceptable' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>{p.status.toUpperCase()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-background-200 mb-1.5">
                    <div className={`h-full rounded-full transition-all ${p.color}`} style={{ width: `${p.score}%` }} />
                  </div>
                  <span className="text-lg font-black text-foreground-950">{p.score}<span className="text-sm text-foreground-400">/100</span></span>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline + Top 5 */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Timeline */}
              <div className="rounded-xl border border-background-200 bg-white p-5">
                <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                  <i className="ri-history-line text-foreground-600" /> Chronologie — 06 Juillet 2026
                </h3>
                <div className="relative">
                  <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-emerald-200" />
                  <div className="space-y-3">
                    {timeline.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 relative">
                        <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[10px] z-10 ${t.status === 'ok' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-background-100 text-foreground-500 border border-background-300'}`}>
                          {t.status === 'ok' ? '\u2713' : 'i'}
                        </span>
                        <div>
                          <span className="text-[11px] font-mono text-foreground-400">{t.time}</span>
                          <span className="text-xs text-foreground-800 ml-2">{t.event}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top 5 Critiques */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                  <i className="ri-alert-fill text-red-600" /> Top 5 — Actions Prioritaires
                </h3>
                <div className="space-y-2">
                  {top5Critiques.map((c, i) => (
                    <div key={c.id} className="flex items-start gap-2 text-xs bg-white rounded-lg p-3 border border-red-100">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-red-200 text-red-800 font-black text-[11px]">{i + 1}</span>
                      <div className="min-w-0">
                        <span className="font-mono text-red-700 font-bold">{c.id}</span>
                        <span className="text-red-800 font-semibold"> — {c.title}</span>
                        <p className="text-red-600 text-[11px] mt-0.5">{c.fix}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* GO/NO-GO Banner */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex-shrink-0 px-8 py-5 rounded-xl bg-emerald-600 text-white text-center">
                  <span className="text-3xl font-black block">{goNogoConditions.decision}</span>
                  <span className="text-xs font-semibold opacity-80">Décision Production</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-emerald-900 font-semibold mb-2">{goNogoConditions.reason}</p>
                  <div className="grid sm:grid-cols-2 gap-1.5 text-xs">
                    <div>
                      <span className="text-emerald-700 font-bold block mb-1">Conditions remplies :</span>
                      {goNogoConditions.conditions_remplies.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> {c}</div>
                      ))}
                    </div>
                    <div>
                      <span className="text-amber-700 font-bold block mb-1">Restant :</span>
                      {goNogoConditions.conditions_restantes.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5"><span className="text-amber-500">○</span> {c}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== CORRECTIONS TAB ===== */}
      {activeTab === 'corrections' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <h2 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Corrections P0 Exécutées — 06 Juillet 2026</h2>
          <div className="space-y-3">
            {p0CorrectionsExecutees.map((corr) => (
              <div key={corr.id} className={`rounded-xl border-2 p-5 ${corr.status === 'exécuté' || corr.status === 'vérifié' ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-white' : 'border-amber-300 bg-gradient-to-br from-amber-50 to-white'}`}>
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-sm ${corr.status === 'exécuté' || corr.status === 'vérifié' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                    {corr.status === 'exécuté' || corr.status === 'vérifié' ? '\u2713' : '!'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-foreground-400">{corr.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${corr.priority === 'P0' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-amber-100 text-amber-700 border border-amber-300'}`}>
                        {corr.priority}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${corr.status === 'exécuté' || corr.status === 'vérifié' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {corr.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground-950 mb-1">{corr.action}</h3>
                    <p className="text-xs text-foreground-500">{corr.impact}</p>
                    <span className="text-[10px] text-foreground-400 mt-1 block">
                      {new Date(corr.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== CERTIFICATION TAB ===== */}
      {activeTab === 'certification' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <h2 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Roadmap Certification — Big Four + ISO</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {certificationRoadmap.map((cert) => (
              <div key={cert.cert} className={`rounded-xl border-2 p-6 ${certColors[cert.color]}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-playfair text-foreground-950">{cert.cert}</h3>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    cert.color === 'emerald' ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                  }`}>{cert.status}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-background-200 overflow-hidden mb-3">
                  <div className={`h-full rounded-full transition-all ${cert.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${cert.score}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-foreground-500">Score</span>
                  <span className="font-black text-foreground-950 text-lg">{cert.score}<span className="text-sm text-foreground-400">/100</span></span>
                </div>
                <p className="text-xs text-foreground-600 mb-3">{cert.description}</p>
                <span className="text-[11px] font-bold text-foreground-500">ETA : {cert.eta}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== ACTIONS TAB ===== */}
      {activeTab === 'actions' && (
        <>
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <h2 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Plan d&apos;Action — Prochaines 24h (P1)</h2>
            <div className="rounded-xl border border-background-200 bg-white p-5">
              <div className="space-y-2">
                {p1ActionsRecommandees.map((action, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-100 hover:border-amber-300 transition-all">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700 text-xs font-black">{i + 1}</span>
                    <span className="text-xs text-foreground-800">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <h2 className="text-sm font-bold text-foreground-600 mb-3 uppercase tracking-wider">Roadmap 90 Jours</h2>
            <div className="rounded-xl border border-background-200 bg-white p-5">
              <div className="space-y-2">
                {goNogoConditions.next_steps_90j.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background-50 border border-background-100 hover:border-emerald-300 transition-all">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black">{i + 1}</span>
                    <span className="text-xs text-foreground-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== FOOTER ===== */}
      <section className="py-12 bg-foreground-950 mt-8">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-white mb-2">
            KOS Big Four Audit&trade;
          </h2>
          <p className="text-xs text-foreground-500 mb-6">
            Scan exécuté le 06/07/2026 — Données réelles Supabase — 462 tables — RLS 100% — Score 95/100
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/kos-bigfour-audit-execution/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-file-list-3-line" /> Rapport d&apos;Audit Exécutif
            </Link>
            <Link to="/kos-bigfour-quality-governance/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all hover:scale-105 whitespace-nowrap bg-white/8 text-foreground-300 border border-white/10">
              <i className="ri-government-line" /> Gouvernance Qualité Big Four
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}





