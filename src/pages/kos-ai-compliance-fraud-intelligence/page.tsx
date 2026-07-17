import { useState } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useAIComplianceFraudIntelligence } from '@/hooks/useAIComplianceFraudIntelligence';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : color === 'emerald' ? 'stroke-emerald-500' : color === 'amber' ? 'stroke-amber-500' : color === 'red' ? 'stroke-red-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-xs font-bold text-foreground-950">{value}</span></div>;
}

function StatPill({ label, value, target, color = 'primary' }: { label: string; value: string | number; target?: string; color?: string }) {
  const c = color === 'accent' ? 'bg-accent-100 border-accent-200 text-accent-900' : color === 'secondary' ? 'bg-secondary-100 border-secondary-200 text-secondary-900' : color === 'emerald' ? 'bg-emerald-100 border-emerald-200 text-emerald-900' : color === 'amber' ? 'bg-amber-100 border-amber-200 text-amber-900' : color === 'red' ? 'bg-red-100 border-red-200 text-red-900' : 'bg-primary-100 border-primary-200 text-primary-900';
  return (
    <div className={`rounded-lg border p-3 flex flex-col gap-0.5 ${c}`}>
      <span className="text-[10px] uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-lg font-bold">{value}</span>
      {target && <span className="text-[9px] opacity-60">Cible: {target}</span>}
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const m: Record<string, { cls: string; icon: string; label: string }> = {
    'conforme': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-check-line', label: 'Conforme' },
    'partiel': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-error-warning-line', label: 'Partiel' },
    'surveillance': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-error-warning-line', label: 'Surveillance' },
    'non_conforme': { cls: 'bg-red-100 text-red-700 border-red-200', icon: 'ri-close-circle-line', label: 'Non Conforme' },
    'critique': { cls: 'bg-red-100 text-red-700 border-red-200', icon: 'ri-alert-line', label: 'Critique' },
    'elevee': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-arrow-up-line', label: 'Élevée' },
    'moyenne': { cls: 'bg-secondary-100 text-secondary-700 border-secondary-200', icon: 'ri-subtract-line', label: 'Moyenne' },
    'production': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-check-double-line', label: 'Production' },
    'staging': { cls: 'bg-primary-100 text-primary-700 border-primary-200', icon: 'ri-loader-4-line', label: 'Staging' },
    'development': { cls: 'bg-background-200 text-foreground-600 border-background-200', icon: 'ri-code-line', label: 'Dev' },
    'investigation': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-search-eye-line', label: 'Investigation' },
    'resolu': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-check-line', label: 'Résolu' },
    'maitrise': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-shield-check-line', label: 'Maîtrisé' },
    'sous_surveillance': { cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'ri-error-warning-line', label: 'Sous Surveillance' },
    'alerte_elevee': { cls: 'bg-red-100 text-red-700 border-red-200', icon: 'ri-alert-line', label: 'Alerte Élevée' },
    'planned': { cls: 'bg-background-200 text-foreground-600 border-background-200', icon: 'ri-time-line', label: 'Planifié' },
    'active': { cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'ri-play-circle-line', label: 'Actif' },
  };
  const s = m[statut] || { cls: 'bg-background-200 text-foreground-600 border-background-200', icon: 'ri-time-line', label: statut };
  return <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${s.cls}`}><i className={`${s.icon} text-[8px]`}></i>{s.label}</span>;
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(0)}k`; return v.toLocaleString('fr-FR'); }
function formatFCFA(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)} M FCFA`; return `${v.toLocaleString('fr-FR')} FCFA`; }

const TABS = [
  { key: 'cockpit', label: 'Cockpit', icon: 'ri-dashboard-3-line' },
  { key: 'fraud', label: 'Détection Fraude IA', icon: 'ri-shield-flash-line' },
  { key: 'compliance', label: 'ISO 27001 & SOC 2', icon: 'ri-file-shield-2-line' },
  { key: 'blockchain', label: 'Blockchain TrustChain', icon: 'ri-link' },
  { key: 'plan', label: 'Plan Correctif', icon: 'ri-tools-line' },
  { key: 'kpis', label: 'KPIs Trimestriels', icon: 'ri-line-chart-line' },
  { key: 'risques', label: 'Matrice Risques', icon: 'ri-alert-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function KOSAIComplianceFraudIntelligencePage() {
  const { fraud, compliance, blockchain, plan, kpis, risques, resume, loading, error, refetch } = useAIComplianceFraudIntelligence();
  const [activeTab, setActiveTab] = useState<TabKey>('cockpit');

  if (loading) return <KOSHubLayout hubId={99} activeTab="cockpit" tabLabel="AI Compliance & Fraud Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement AI Compliance &amp; Fraud Intelligence...</span></div></div></KOSHubLayout>;

  if (error) return <KOSHubLayout hubId={99} activeTab="cockpit" tabLabel="AI Compliance & Fraud Intelligence"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><p className="text-red-600 text-sm">{error}</p><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></KOSHubLayout>;

  const scoreColor = resume.score_global >= 90 ? 'emerald' : resume.score_global >= 70 ? 'amber' : 'red';

  return (
    <KOSHubLayout hubId={99} activeTab={activeTab} tabLabel="AI Compliance & Fraud Intelligence">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc Sécurité & Conformité — Big Four Audit</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Surveillance Continue</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">ISO 27001 Readiness {compliance.iso27001.readiness_score}%</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium">SOC 2 Readiness {compliance.soc2.readiness_score}%</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">AI Compliance &amp; Fraud Intelligence&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">{resume.mandat}. Score global <strong className="text-foreground-950">{resume.score_global}/100</strong> → Cible <strong className="text-foreground-950">{resume.score_cible}/100</strong>. 5 modules prioritaires · Budget {resume.budget_total} · Certification {resume.delai_certification}.</p>
        </div>

        {/* Global Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <StatPill label="Score Global" value={`${resume.score_global}/100`} target={`${resume.score_cible}`} color={scoreColor} />
          <StatPill label="Algorithmes Actifs" value={`${fraud.algorithms.filter(a => a.status === 'production').length}/5`} target="5/5" color="primary" />
          <StatPill label="ISO 27001 Readiness" value={`${compliance.iso27001.readiness_score}%`} target="100%" color="amber" />
          <StatPill label="SOC 2 Readiness" value={`${compliance.soc2.readiness_score}%`} target="95%" color="accent" />
          <StatPill label="TrustChain Nodes" value={blockchain.nodes} target="5" color="secondary" />
          <StatPill label="Smart Contracts" value={blockchain.smart_contracts_deployed} target="52" color="emerald" />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.key ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span></button>
          ))}
        </div>

        {/* ===== COCKPIT TAB ===== */}
        {activeTab === 'cockpit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-1 bg-background-50 border border-background-200/60 rounded-lg p-5 flex flex-col items-center justify-center gap-3">
                <CircularGauge value={resume.score_global} size={110} strokeWidth={8} color={scoreColor} />
                <p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Global IA Compliance</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Cible {resume.score_cible}/100 — Juin 2027</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Alertes Fraude (30j)</p><p className="text-2xl font-bold text-foreground-950 mt-1">{fraud.alerts_generated_30d}</p><p className="text-[10px] text-red-600">{fraud.confirmed_frauds_30d} confirmées</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">MTTD (Détection)</p><p className="text-2xl font-bold text-foreground-950 mt-1">{fraud.mean_time_to_detect}</p><p className="text-[10px] text-emerald-600">Cible &lt; 1s</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">Faux Positifs</p><p className="text-2xl font-bold text-foreground-950 mt-1">{fraud.false_positive_rate}%</p><p className="text-[10px] text-emerald-600">Cible &lt; 1%</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">ISO 27001 Contrôles OK</p><p className="text-2xl font-bold text-foreground-950 mt-1">{compliance.iso27001.controls_conformes}/{compliance.iso27001.controls_total}</p><p className="text-[10px] text-amber-600">{compliance.iso27001.controls_non_conformes} non conformes</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">SOC 2 Controls Testés</p><p className="text-2xl font-bold text-foreground-950 mt-1">{compliance.soc2.control_testing.tested_30d}/{compliance.soc2.control_testing.total_controls}</p><p className="text-[10px] text-red-600">{compliance.soc2.control_testing.failed} échoués</p></div>
                <div className="bg-background-50 border border-background-200/60 rounded-lg p-4"><p className="text-[10px] text-foreground-500 uppercase tracking-wider">On-Chain TX</p><p className="text-2xl font-bold text-foreground-950 mt-1">{formatNumber(blockchain.total_transactions_on_chain)}</p><p className="text-[10px] text-foreground-500">Block time {blockchain.average_block_time_ms}ms</p></div>
              </div>
            </div>

            {/* Constats Clés */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-search-eye-line text-accent-600"></i>Résumé Exécutif — Big Four Assessment</h3>
              <div className="space-y-3">
                {resume.constats_cles.map((c, i) => (
                  <div key={i} className="flex items-start gap-2"><span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${i <= 1 ? 'bg-emerald-500' : i <= 3 ? 'bg-amber-500' : 'bg-red-500'}`}></span><span className="text-xs text-foreground-600 leading-relaxed">{c}</span></div>
                ))}
              </div>
            </div>

            {/* Recommandations Immédiates */}
            <div className="bg-red-100/50 rounded-lg p-5 border border-red-200/30">
              <h3 className="text-sm font-semibold text-red-900 mb-3 flex items-center gap-2"><i className="ri-alert-line text-red-600"></i>Recommandations Immédiates — Actions P0</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resume.recommandations_immediates.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-red-800"><span className="w-5 h-5 rounded-full bg-red-500 text-background-50 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>{r}</div>
                ))}
              </div>
            </div>

            {/* Fraude Categories Overview */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-3">Catégories de Fraude — 30 derniers jours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {fraud.fraud_categories.map(cat => (
                  <div key={cat.id} className="border border-background-200/60 rounded-lg p-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><StatutBadge statut={cat.statut} /><span className="text-xs font-semibold text-foreground-900">{cat.nom}</span></div>
                      <p className="text-[10px] text-foreground-500">{cat.incidents_30j} incidents · Volume estimé {cat.volume_estime}</p>
                      <div className="flex flex-wrap gap-1 mt-2">{cat.patterns.map((p, i) => <span key={i} className="text-[9px] bg-background-100 text-foreground-600 px-1.5 py-0.5 rounded-full">{p}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== FRAUD TAB ===== */}
        {activeTab === 'fraud' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatPill label="Alertes (30j)" value={fraud.alerts_generated_30d} target="" color="primary" />
              <StatPill label="Fraudes Confirmées" value={fraud.confirmed_frauds_30d} target="0" color="red" />
              <StatPill label="Faux Positifs" value={`${fraud.false_positive_rate}%`} target="&lt;1%" color="amber" />
              <StatPill label="MTTD" value={fraud.mean_time_to_detect} target="&lt;1s" color="emerald" />
            </div>

            {/* Algorithms */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Algorithmes KOS FraudShield&trade;</h3>
              <div className="space-y-3">
                {fraud.algorithms.map(algo => (
                  <div key={algo.id} className="border border-background-200/60 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${algo.status === 'production' ? 'bg-emerald-100 text-emerald-600' : 'bg-primary-100 text-primary-600'}`}><i className={`text-lg ${algo.type === 'Non-Supervisé' ? 'ri-brain-line' : algo.type === 'Semi-Supervisé' ? 'ri-mind-map' : algo.type === 'Déterministe' ? 'ri-settings-3-line' : algo.type === 'Supervisé' ? 'ri-bar-chart-2-line' : 'ri-file-search-line'}`}></i></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1"><h4 className="text-sm font-semibold text-foreground-950">{algo.name}</h4><span className="text-[9px] bg-background-200 text-foreground-600 px-1.5 py-0.5 rounded-full">{algo.type}</span><StatutBadge statut={algo.status} /></div>
                          <p className="text-xs text-foreground-600 mb-2">{algo.description}</p>
                          <div className="grid grid-cols-4 gap-2 text-[10px]">
                            <div><span className="text-foreground-400">Précision</span><p className="font-bold text-foreground-900">{algo.precision}%</p></div>
                            <div><span className="text-foreground-400">Rappel</span><p className="font-bold text-foreground-900">{algo.recall}%</p></div>
                            <div><span className="text-foreground-400">F1 Score</span><p className="font-bold text-emerald-700">{algo.f1_score}%</p></div>
                            <div><span className="text-foreground-400">Latence</span><p className="font-bold text-foreground-900">{algo.latency_ms}ms</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4 flex items-center gap-2"><i className="ri-notification-3-line text-red-600"></i>Alertes Récentes — Détection Temps Réel</h3>
              <div className="space-y-3">
                {fraud.recent_alerts.map(alert => (
                  <div key={alert.alert_id} className="border border-background-200/60 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex flex-col items-center gap-0.5 shrink-0"><CircularGauge value={alert.score_risque} size={36} strokeWidth={3} color={alert.score_risque >= 90 ? 'red' : alert.score_risque >= 70 ? 'amber' : 'primary'} /><span className="text-[8px] text-foreground-400">Risque</span></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1"><h4 className="text-sm font-semibold text-foreground-950">{alert.alert_id}</h4><StatutBadge statut={alert.statut} /><span className="text-[9px] bg-foreground-100 text-foreground-600 px-1.5 py-0.5 rounded-full">{alert.categorie}</span></div>
                          <p className="text-xs text-foreground-600">{alert.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-[10px]">
                            <span className="text-foreground-400">{alert.timestamp}</span>
                            <span className="text-primary-700 font-medium">{alert.action}</span>
                            <span className="text-foreground-500">Analyste: {alert.analyste}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== COMPLIANCE TAB ===== */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            {/* ISO 27001 Section */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><i className="ri-file-shield-2-line text-lg"></i></div><div><h3 className="text-sm font-semibold text-foreground-950">ISO 27001:2022 — Readiness Assessment</h3><p className="text-[10px] text-foreground-500">Certification ciblée {compliance.iso27001.certification_target}</p></div></div>
                <CircularGauge value={compliance.iso27001.readiness_score} size={56} strokeWidth={5} color="amber" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <StatPill label="Contrôles Totaux" value={compliance.iso27001.controls_total} target="" color="primary" />
                <StatPill label="Conformes" value={compliance.iso27001.controls_conformes} target="" color="emerald" />
                <StatPill label="Partiels" value={compliance.iso27001.controls_partiels} target="0" color="amber" />
                <StatPill label="Non Conformes" value={compliance.iso27001.controls_non_conformes} target="0" color="red" />
              </div>

              {/* Annex A Mapping */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {Object.entries(compliance.iso27001.annex_a_mapping).map(([key, val]) => {
                  const sc = val.score >= 90 ? 'emerald' : val.score >= 70 ? 'amber' : 'red';
                  return (
                    <div key={key} className="border border-background-200/60 rounded p-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-foreground-600 font-medium truncate">{key}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-bold text-foreground-900">{val.conformes}/{val.total}</span>
                        <CircularGauge value={val.score} size={22} strokeWidth={2.5} color={sc} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Critical Gaps */}
              <h4 className="text-xs font-semibold text-red-700 mb-2">Gaps Critiques ISO 27001 — Actions Requises</h4>
              <div className="space-y-2">
                {compliance.iso27001.critical_gaps.map(gap => (
                  <div key={gap.gap_id} className="border border-red-200/60 bg-red-50/30 rounded p-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-bold text-red-700">{gap.controle}</span><StatutBadge statut={gap.severity} /></div>
                        <p className="text-xs text-foreground-700">{gap.description}</p>
                        <p className="text-[10px] text-primary-700 mt-1 font-medium">{gap.remediation} — Échéance {gap.deadline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOC 2 Section */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className="ri-medal-line text-lg"></i></div><div><h3 className="text-sm font-semibold text-foreground-950">SOC 2 Type II — Readiness Assessment</h3><p className="text-[10px] text-foreground-500">Certification ciblée {compliance.soc2.certification_target}</p></div></div>
                <CircularGauge value={compliance.soc2.readiness_score} size={56} strokeWidth={5} color="accent" />
              </div>

              {/* Trust Services */}
              <div className="space-y-2 mb-4">
                {compliance.soc2.trust_services.map(ts => (
                  <div key={ts.criterion} className="border border-background-200/60 rounded p-3 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5"><h4 className="text-xs font-semibold text-foreground-900">{ts.criterion}</h4><StatutBadge statut={ts.status} /></div>
                      <p className="text-[10px] text-foreground-600">{ts.description}</p>
                    </div>
                    <CircularGauge value={ts.score} size={32} strokeWidth={3} color={ts.score >= 80 ? 'emerald' : ts.score >= 70 ? 'amber' : 'red'} />
                  </div>
                ))}
              </div>

              {/* Control Testing */}
              <div className="bg-amber-100/50 rounded-lg p-3 border border-amber-200/30">
                <h4 className="text-xs font-semibold text-amber-900 mb-2">SOC 2 Control Testing — 30 derniers jours</h4>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <StatPill label="Testés" value={`${compliance.soc2.control_testing.tested_30d}/${compliance.soc2.control_testing.total_controls}`} target="" color="primary" />
                  <StatPill label="Passés" value={compliance.soc2.control_testing.passed} target="" color="emerald" />
                  <StatPill label="Échoués" value={compliance.soc2.control_testing.failed} target="0" color="red" />
                </div>
                {compliance.soc2.control_testing.deviations.map(dev => (
                  <div key={dev.dev_id} className="border border-amber-200/60 rounded p-2 mb-1 text-[10px]">
                    <span className="font-semibold text-amber-800">{dev.control}</span> — {dev.description}. <span className="text-primary-700">{dev.remediation} (Échéance {dev.deadline})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Roadmap */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Roadmap Certification — 12 Mois</h3>
              <div className="space-y-3">
                {compliance.compliance_roadmap.map((phase, i) => (
                  <div key={i} className="border border-background-200/60 rounded-lg p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-primary-500 text-background-50 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground-950">{phase.phase}</h4>
                        <span className="text-[10px] text-foreground-500">{phase.period} · Budget {phase.budget}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-foreground-400">Actions</span>
                        <ul className="text-[10px] text-foreground-600 mt-1 space-y-0.5">{phase.actions.map((a, j) => <li key={j} className="flex items-start gap-1"><span className="text-primary-500 mt-0.5">•</span>{a}</li>)}</ul>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-foreground-400">Livrables</span>
                        <ul className="text-[10px] text-emerald-700 mt-1 space-y-0.5">{phase.deliverables.map((d, j) => <li key={j} className="flex items-start gap-1"><i className="ri-check-line text-[8px] mt-0.5"></i>{d}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== BLOCKCHAIN TAB ===== */}
        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-link text-2xl"></i></div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground-950">{blockchain.architecture}</h3>
                  <p className="text-[10px] text-foreground-500">{blockchain.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <StatPill label="Smart Contracts" value={blockchain.smart_contracts_deployed} target="52" color="emerald" />
                <StatPill label="Transactions On-Chain" value={formatNumber(blockchain.total_transactions_on_chain)} target="" color="primary" />
                <StatPill label="Block Time" value={`${blockchain.average_block_time_ms}ms`} target="" color="secondary" />
                <StatPill label="Total Nodes" value={blockchain.components.reduce((sum, c) => sum + c.nodes, 0)} target="" color="accent" />
              </div>
              <p className="text-[10px] text-foreground-500 mb-4">Mécanisme Privacy: <strong className="text-foreground-700">{blockchain.data_privacy_mechanism}</strong></p>
            </div>

            {/* Components */}
            <div className="space-y-3">
              {blockchain.components.map(comp => (
                <div key={comp.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${comp.status === 'production' ? 'bg-emerald-100 text-emerald-600' : comp.status === 'staging' ? 'bg-primary-100 text-primary-600' : 'bg-background-200 text-foreground-500'}`}><i className={`text-lg ${comp.chain.includes('Hyperledger') ? 'ri-database-2-line' : 'ri-eth-line'}`}></i></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><h4 className="text-sm font-semibold text-foreground-950">{comp.name}</h4><StatutBadge statut={comp.status} /><span className="text-[9px] bg-secondary-100 text-secondary-700 px-1.5 py-0.5 rounded-full">{comp.chain}</span></div>
                        <p className="text-xs text-foreground-600">{comp.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-[10px] text-foreground-500">
                          <span><strong className="text-foreground-700">{formatNumber(comp.tps)}</strong> TPS</span>
                          <span><strong className="text-foreground-700">{comp.nodes}</strong> nœuds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Nodes */}
            <div className="bg-accent-100/50 rounded-lg p-5 border border-accent-200/30">
              <h3 className="text-sm font-semibold text-accent-900 mb-3 flex items-center gap-2"><i className="ri-government-line"></i>Nœuds Régulateurs — Déploiement Progressif</h3>
              <div className="space-y-2">
                {blockchain.regulatory_nodes.map(rn => (
                  <div key={rn.regulator} className="border border-accent-200/60 rounded p-3 flex items-center justify-between gap-4 bg-background-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-accent-600"><i className="ri-building-line text-sm"></i></div>
                      <div>
                        <p className="text-xs font-semibold text-foreground-900">{rn.regulator}</p>
                        <p className="text-[10px] text-foreground-500">{rn.node_type} · {rn.access_level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <StatutBadge statut={rn.status} />
                      <span className="text-[9px] text-foreground-400">{rn.deployment_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PLAN CORRECTIF TAB ===== */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatPill label="Score Actuel" value={`${plan.score_global_actuel}/100`} target={`${plan.score_cible_12mois}`} color="red" />
              <StatPill label="Modules" value={plan.modules.length} target="" color="primary" />
              <StatPill label="Budget 12 Mois" value={plan.budget_total_12mois} target="" color="amber" />
              <StatPill label="ROI Projeté" value="×8" target="" color="emerald" />
            </div>

            <div className="bg-accent-100/50 rounded-lg p-4 border border-accent-200/30 text-xs text-accent-800">{plan.roi_projete}</div>

            <div className="space-y-4">
              {plan.modules.map(mod => (
                <div key={mod.id} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap ${mod.priorite.includes('P0') ? 'bg-red-100 text-red-700' : mod.priorite.includes('P1') ? 'bg-amber-100 text-amber-700' : 'bg-secondary-100 text-secondary-700'}`}>{mod.priorite}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground-950">{mod.titre}</h3>
                        <p className="text-xs text-foreground-600 mt-0.5">{mod.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right"><p className="text-[9px] text-foreground-400">Score</p><p className="text-xs font-bold text-foreground-900">{mod.score_actuel} → {mod.score_cible}</p></div>
                      <CircularGauge value={mod.score_actuel} size={40} strokeWidth={4} color={mod.score_actuel >= 80 ? 'emerald' : mod.score_actuel >= 60 ? 'amber' : 'red'} />
                    </div>
                  </div>

                  <div className="space-y-2 ml-2">
                    {mod.actions.map(act => (
                      <div key={act.action_id} className="border border-background-200/60 rounded p-3 bg-background-100/50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground-900">{act.action_id}: {act.action}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[10px]">
                              <span className="text-foreground-500">Budget: <strong className="text-foreground-700">{act.budget}</strong></span>
                              <span className="text-foreground-500">Échéance: <strong className="text-foreground-700">{act.delai}</strong></span>
                              <span className="text-foreground-500">Resp: <strong className="text-foreground-700">{act.responsable}</strong></span>
                            </div>
                            <p className="text-[10px] text-emerald-700 mt-1">KPI: {act.kpi}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== KPIs TRIMESTRIELS TAB ===== */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {kpis.trimestres.map((tri, i) => (
                <div key={i} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground-950">{tri.trimestre}</h3>
                      <p className="text-[10px] text-foreground-500">{tri.objectif_principal}</p>
                    </div>
                    <span className="text-xs font-bold text-foreground-700 bg-background-100 px-2 py-1 rounded-full">{tri.budget}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {tri.kpis.map(kpi => (
                      <div key={kpi.kpi} className="flex items-center justify-between text-[10px] border-b border-background-100 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <i className={`${kpi.icone} text-foreground-400 text-xs`}></i>
                          <span className="text-foreground-700">{kpi.kpi}</span>
                        </div>
                        <span className={`font-semibold ${typeof kpi.valeur === 'string' && kpi.valeur.includes('→') ? 'text-primary-700' : 'text-foreground-900'}`}>{kpi.valeur}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent-100/50 rounded p-3 border border-accent-200/30">
                    <p className="text-[9px] text-accent-800 font-medium mb-1">Livrables</p>
                    <div className="flex flex-wrap gap-1">{tri.livrables.map((l, j) => <span key={j} className="text-[9px] bg-background-50 text-accent-700 px-1.5 py-0.5 rounded-full border border-accent-200/50">{l}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trajectoire */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Trajectoire Score Global — 2026-2027</h3>
              <div className="flex items-center gap-2 h-20">
                {[{ q: 'Q2 2026', v: 67 }, { q: 'Q3 2026', v: 78 }, { q: 'Q4 2026', v: 86 }, { q: 'Q1 2027', v: 92 }, { q: 'Q2 2027', v: 96 }].map((p, i) => (
                  <div key={p.q} className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-bold ${i === 4 ? 'text-emerald-600' : i === 0 ? 'text-red-600' : 'text-foreground-900'}`}>{p.v}</span>
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${i === 4 ? 'bg-emerald-500 border-emerald-600' : i === 0 ? 'bg-red-500 border-red-600' : i === 3 ? 'bg-primary-500 border-primary-600' : 'bg-amber-500 border-amber-600'}`}></div>
                    </div>
                    <span className="text-[8px] text-foreground-400">{p.q}</span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-background-200 rounded-full mt-3 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" style={{ width: `${resume.score_global}%` }}></div>
              </div>
              <p className="text-[10px] text-foreground-500 mt-2">Trajectoire : 67 → 96 en 12 mois. Certifications ISO 27001 (Q1 2027) + SOC 2 (Q2 2027) déclenchent le saut décisif.</p>
            </div>
          </div>
        )}

        {/* ===== MATRICE RISQUES TAB ===== */}
        {activeTab === 'risques' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Risk Heatmap */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Matrice des Risques 5×5 — Probabilité × Impact</h3>
                <div className="grid grid-cols-5 gap-1">
                  {/* Header */}
                  <div className="text-[8px] text-foreground-400 text-center"></div>
                  {[1, 2, 3, 4, 5].map(l => <div key={l} className="text-[8px] text-foreground-400 text-center font-medium">Impact {l}</div>)}
                  {/* Rows */}
                  {[5, 4, 3, 2, 1].map(p => (
                    <>
                      <div key={`lp-${p}`} className="text-[8px] text-foreground-400 text-right pr-1 font-medium flex items-center justify-end">Prob {p}</div>
                      {[1, 2, 3, 4, 5].map(imp => {
                        const match = risques.filter(r => Math.ceil(r.probabilite / 20) === p && Math.ceil(r.impact / 20) === imp);
                        const bg = p * imp >= 16 ? 'bg-red-100/70' : p * imp >= 9 ? 'bg-amber-100/70' : p * imp >= 4 ? 'bg-accent-100/50' : 'bg-emerald-100/30';
                        return (
                          <div key={`${p}-${imp}`} className={`rounded aspect-square flex items-center justify-center text-[9px] relative ${bg}`}>
                            {match.length > 0 && <span className="absolute w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2 text-[9px] text-foreground-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Critique</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Élevé</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent-500"></span> Modéré</span>
                </div>
              </div>

              {/* Risk List */}
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-950 mb-4">Registre des Risques</h3>
                <div className="space-y-2">
                  {risques.map(r => (
                    <div key={r.id} className="border border-background-200/60 rounded p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-foreground-400">{r.id}</span>
                          <h4 className="text-xs font-semibold text-foreground-900">{r.risque}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <StatutBadge statut={r.statut} />
                          <span className={`text-[9px] font-bold ${r.score >= 25 ? 'text-red-600' : r.score >= 15 ? 'text-amber-600' : 'text-emerald-600'}`}>{r.score}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] mb-1">
                        <span className="text-foreground-500">Prob: <strong className="text-foreground-700">{r.probabilite}%</strong></span>
                        <span className="text-foreground-500">Impact: <strong className="text-foreground-700">{r.impact}%</strong></span>
                      </div>
                      <p className="text-[10px] text-primary-700">{r.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Summary */}
            <div className="bg-red-100/50 rounded-lg p-4 border border-red-200/30">
              <div className="flex items-center gap-2 mb-2"><i className="ri-alert-line text-red-600"></i><span className="text-xs font-semibold text-red-900">Résumé des Risques</span></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-red-800">
                <span><strong>{risques.filter(r => r.score >= 25).length}</strong> risques critiques</span>
                <span><strong>{risques.filter(r => r.score >= 15 && r.score < 25).length}</strong> risques élevés</span>
                <span><strong>{risques.filter(r => r.score < 15).length}</strong> risques modérés</span>
                <span><strong>{risques.filter(r => r.statut === 'sous_surveillance').length}</strong> sous surveillance</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Summary */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-shield-check-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">KOS AI Compliance &amp; Fraud Intelligence&trade; — Diagnostic Big Four Unifié</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{resume.score_global}/100</strong> Score Global</span>
            <span><strong>{fraud.algorithms.filter(a => a.status === 'production').length}/5</strong> Algorithmes FraudShield</span>
            <span><strong>{compliance.iso27001.controls_conformes}/{compliance.iso27001.controls_total}</strong> Contrôles ISO 27001</span>
            <span><strong>{blockchain.smart_contracts_deployed}</strong> Smart Contracts</span>
            <span><strong>{resume.budget_total}</strong> Budget 12 mois</span>
            <span><strong>{plan.modules.length}</strong> Modules prioritaires</span>
            <span><strong>{risques.length}</strong> Risques cartographiés</span>
            <span className="text-emerald-700 font-semibold">Cible 96/100 — Juin 2027</span>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}