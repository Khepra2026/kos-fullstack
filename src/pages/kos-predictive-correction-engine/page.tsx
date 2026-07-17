import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSPredictiveCorrectionEngine } from '@/hooks/useKOSPredictiveCorrectionEngine';

type TabId = 'scanner' | 'forecasts' | 'preemptive' | 'patterns' | 'kpis';

function getRiskColor(level: string): string {
  const map: Record<string, string> = {
    critical: '#DC2626',
    high: '#EA580C',
    medium: '#E8C547',
    low: '#059669',
  };
  return map[level] || '#6366F1';
}

function getTrendIcon(trend: string) {
  if (trend === 'deteriorating') return 'ri-arrow-down-circle-line text-red-500';
  if (trend === 'improving') return 'ri-arrow-up-circle-line text-emerald-500';
  return 'ri-checkbox-blank-circle-line text-foreground-400';
}

export default function KOSPredictiveCorrectionEnginePage() {
  const engine = useKOSPredictiveCorrectionEngine();
  const [activeTab, setActiveTab] = useState<TabId>('scanner');
  const [expandedScan, setExpandedScan] = useState<string | null>(null);
  const [expandedForecast, setExpandedForecast] = useState<string | null>(null);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  const criticalCount = engine.scans.filter(s => s.risk_level === 'critical').length;
  const highCount = engine.scans.filter(s => s.risk_level === 'high').length;
  const preemptiveSuccessRate = engine.stats.preemptive_fixes_applied > 0 ? 100 : 0;
  const totalPrevented = engine.stats.defects_prevented_total;

  const tabs: { id: TabId; label: string; icon: string; badge: string }[] = [
    { id: 'scanner', label: 'Scanner Prédictif', icon: 'ri-radar-line', badge: `${engine.scans.length}` },
    { id: 'forecasts', label: 'Prévisions de Risques', icon: 'ri-eye-line', badge: `${engine.forecasts.length}` },
    { id: 'preemptive', label: 'Correctifs Préemptifs', icon: 'ri-shield-check-line', badge: `${engine.stats.preemptive_fixes_applied}` },
    { id: 'patterns', label: 'Patterns Appris', icon: 'ri-brain-line', badge: `${engine.patterns.length}` },
    { id: 'kpis', label: 'KPIs Prévention', icon: 'ri-speed-line', badge: `${engine.stats.prevention_rate_global}%` },
  ];

  const statusBadge = engine.isLive
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-amber-100 text-amber-700';

  if (engine.loading) {
    return (
      <KOSHubLayout hubId={402}>
        <div className="bg-background-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement du Moteur Prédictif...</p>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={402}>
      <SeoHead
        title="KOS Predictive Auto-Correction Engine™ — Anticipation & Prévention des Défauts | KHEPRA EXPERTS"
        description="Moteur d'auto-correction prédictive : scan continu, prévisions de risques, correctifs préemptifs, patterns auto-appris. 12 composants surveillés, 60 défauts évités, 328h économisées."
        keywords="predictive correction engine, auto-correction prédictive, prévention défauts, KHEPRA EXPERTS, Big Four"
        canonicalPath="/kos-predictive-correction-engine"
        noIndex={true}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-18 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Cinematic%20abstract%20predictive%20AI%20engine%20monitoring%20dashboard%20with%20flowing%20data%20streams%20of%20emerald%20and%20amber%20light%20forming%20neural%20network%20patterns%2C%20crystalline%20nodes%20pulsing%20with%20early%20warning%20signals%2C%20futuristic%20command%20center%20aesthetic%20with%20interconnected%20prediction%20pathways%2C%20dark%20atmospheric%20background%20with%20volumetric%20light%20rays%20revealing%20hidden%20threat%20patterns%20before%20they%20emerge%2C%20hyper%20realistic%208K%20render%2C%20no%20text%20no%20human%20figures%2C%20editorial%20quality&width=1920&height=700&seq=kos-predictive-hero-2026&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-10"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/30 border border-accent-400/40 backdrop-blur-sm">
                  <i className="ri-radar-line text-accent-400 text-sm" />
                  <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">KOS Predictive Auto-Correction Engine™</span>
                </span>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-semibold uppercase tracking-wider ${statusBadge} ${engine.isLive ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-amber-500/20 border-amber-400/30'}`}>
                  <span className={`w-2 h-2 rounded-full ${engine.isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {engine.dataSource === 'supabase' ? 'LIVE DB' : 'MOCK MODE'}
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Anticiper. Prévenir.
                <span className="block text-accent-400 mt-2">Corriger avant que le défaut n&apos;existe.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                <strong className="text-white">{engine.stats.total_scans_active} composants</strong> scannés en continu ·{' '}
                <strong className="text-white">{engine.stats.forecasts_generated} prévisions</strong> de risques actives ·{' '}
                <strong className="text-emerald-400">{totalPrevented} défauts évités</strong> avant qu&apos;ils ne surviennent ·{' '}
                <strong className="text-accent-400">{engine.stats.hours_saved_total}h</strong> économisées.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-xs text-red-300 font-bold">
                  <i className="ri-error-warning-line" /> {criticalCount} critiques
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-xs text-orange-300 font-bold">
                  <i className="ri-alert-line" /> {highCount} hautes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-300 font-bold">
                  <i className="ri-shield-check-line" /> {totalPrevented} défauts évités
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-500/20 border border-accent-400/30 text-xs text-accent-300 font-bold">
                  <i className="ri-brain-line" /> {engine.stats.patterns_learned} patterns appris
                </span>
              </div>
            </div>

            {/* Prevention Rate Gauge */}
            <div className="flex-shrink-0 w-full lg:w-64 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Taux Prévention Global</span>
              <div className="relative inline-flex mt-3 mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#86BC25" strokeWidth="5"
                    strokeDasharray={`${(engine.stats.prevention_rate_global / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white font-heading">{engine.stats.prevention_rate_global}%</span>
                  <span className="text-[9px] text-gray-400">/ {engine.stats.target_prevention_rate}%</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">Cible : {engine.stats.target_prevention_rate}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-3 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              { label: 'Scans Actifs', value: String(engine.stats.total_scans_active), icon: 'ri-radar-line', color: '#86BC25' },
              { label: 'Prévisions', value: String(engine.stats.forecasts_generated), icon: 'ri-eye-line', color: '#EA580C' },
              { label: 'Préemptifs', value: String(engine.stats.preemptive_fixes_applied), icon: 'ri-shield-check-line', color: '#059669' },
              { label: 'Défauts Évités', value: String(totalPrevented), icon: 'ri-check-double-line', color: '#0D7B5F' },
              { label: 'Heures Sauvées', value: `${engine.stats.hours_saved_total}h`, icon: 'ri-time-line', color: '#8B5CF6' },
              { label: 'Précision', value: `${engine.stats.accuracy_mean}%`, icon: 'ri-focus-2-line', color: '#6366F1' },
              { label: 'Faux Pos.', value: `${engine.stats.false_positive_mean}%`, icon: 'ri-error-warning-line', color: '#E8C547' },
              { label: 'Patterns', value: String(engine.stats.patterns_learned), icon: 'ri-brain-line', color: '#D97757' },
              { label: 'Horizon', value: `${Math.round(engine.stats.avg_prediction_horizon_hours / 24)}j`, icon: 'ri-hourglass-line', color: '#059669' },
              { label: 'Mode', value: engine.isLive ? 'LIVE' : 'MOCK', icon: 'ri-database-2-line', color: engine.isLive ? '#059669' : '#EA580C' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-[10px] mb-0.5 block`} style={{ color: stat.color }} />
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[9px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.badge}
                </span>
              </button>
            ))}
            <button onClick={engine.refresh} className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-primary-500 text-background-50 dark:text-foreground-950 hover:bg-primary-600 cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line" /> Rafraîchir
            </button>
          </div>
        </div>
      </section>

      {/* ===== TAB 1: PREDICTIVE SCANNER ===== */}
      {activeTab === 'scanner' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'critical', 'high', 'medium', 'low'].map(f => (
                <button key={f} onClick={() => engine.setScanFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                    engine.scanFilter === f ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}>
                  {f === 'all' ? 'Tous' : f.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Critiques', count: criticalCount, color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
                { label: 'Hautes', count: highCount, color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-700' },
                { label: 'Moyennes', count: engine.scans.filter(s => s.risk_level === 'medium').length, color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
                { label: 'Faibles', count: engine.scans.filter(s => s.risk_level === 'low').length, color: 'bg-emerald-50 border-emerald-200', textColor: 'text-emerald-700' },
              ].map(s => (
                <div key={s.label} className={`${s.color} rounded-xl p-4 text-center border`}>
                  <div className={`text-lg font-bold ${s.textColor}`}>{s.count}</div>
                  <div className="text-xs text-foreground-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {engine.scans.filter(s => engine.scanFilter === 'all' || s.risk_level === engine.scanFilter).map(scan => {
                const isExpanded = expandedScan === scan.id;
                const riskColor = getRiskColor(scan.risk_level);
                const healthColor = scan.current_health >= 90 ? '#059669' : scan.current_health >= 75 ? '#E8C547' : '#DC2626';
                const failDate = scan.predicted_failure_at ? new Date(scan.predicted_failure_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'N/A';
                return (
                  <div key={scan.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedScan(isExpanded ? null : scan.id)} className="w-full p-4 text-left cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${riskColor}15` }}>
                          <i className={`${scan.trend === 'deteriorating' ? 'ri-arrow-down-circle-line' : scan.trend === 'improving' ? 'ri-arrow-up-circle-line' : 'ri-checkbox-blank-circle-line'} text-lg`} style={{ color: riskColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: riskColor }}>{scan.risk_level.toUpperCase()}</span>
                            <span className="text-xs font-bold text-foreground-950">{scan.component}</span>
                            <span className="text-[10px] text-foreground-400">{scan.category}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="font-bold" style={{ color: healthColor }}>{scan.current_health}%</span>
                              <span className="text-foreground-400">santé</span>
                            </div>
                            <span className="text-foreground-300">·</span>
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-red-500 font-bold">{scan.degradation_rate > 0 ? `-${scan.degradation_rate}%` : `+${Math.abs(scan.degradation_rate)}%`}</span>
                              <span className="text-foreground-400">/sem</span>
                            </div>
                            <span className="text-foreground-300">·</span>
                            <span className="text-xs text-foreground-400">Défaillance prévue <strong className="text-foreground-700">{failDate}</strong></span>
                          </div>
                        </div>
                        <span className="text-xs font-bold" style={{ color: riskColor }}>{scan.confidence}%</span>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4 space-y-3">
                        <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${scan.current_health}%`, backgroundColor: healthColor }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-background-50">
                            <span className="text-[10px] text-foreground-400 font-bold">Signaux de dégradation</span>
                            <ul className="mt-1.5 space-y-1">
                              {scan.signals.map((s, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-xs text-foreground-600">
                                  <i className="ri-arrow-right-circle-line text-red-400 mt-0.5 flex-shrink-0" />{s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-lg bg-background-50">
                            <span className="text-[10px] text-foreground-400 font-bold">Analyse prédictive</span>
                            <div className="mt-1.5 space-y-1.5 text-xs text-foreground-600">
                              <div className="flex justify-between">
                                <span>Confiance prédiction</span>
                                <span className="font-bold" style={{ color: riskColor }}>{scan.confidence}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Taux dégradation</span>
                                <span className="font-bold text-red-500">{scan.degradation_rate}%/semaine</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Seuil critique</span>
                                <span className="font-bold text-red-600">{scan.category === 'performance' ? '<70%' : scan.category === 'seo' ? '<75%' : '<80%'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB 2: RISK FORECASTS ===== */}
      {activeTab === 'forecasts' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">{engine.stats.forecasts_generated} Prévisions de Risques Actives</h2>
              <p className="text-foreground-600 text-sm">Horizon de prédiction moyen : {Math.round(engine.stats.avg_prediction_horizon_hours / 24)} jours · Précision {engine.stats.accuracy_mean}%</p>
            </div>

            <div className="space-y-4">
              {engine.forecasts.filter(f => engine.forecastFilter === 'all' || f.severity_if_occurs === engine.forecastFilter).map(fcst => {
                const isExpanded = expandedForecast === fcst.id;
                const sevColor = getRiskColor(fcst.severity_if_occurs);
                return (
                  <div key={fcst.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedForecast(isExpanded ? null : fcst.id)} className="w-full p-5 text-left cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: `${sevColor}15` }}>
                          <i className={`ri-flashlight-line text-xl`} style={{ color: sevColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: sevColor }}>{fcst.severity_if_occurs.toUpperCase()}</span>
                            <span className="text-sm font-bold text-foreground-950">{fcst.defect_type}</span>
                          </div>
                          <p className="text-xs text-foreground-500">{fcst.predicted_impact}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs">
                            <span className="text-foreground-500">Probabilité <strong className="text-foreground-950">{fcst.probability}%</strong></span>
                            <span className="text-foreground-300">·</span>
                            <span className="text-foreground-500">Délai <strong className="text-amber-600">{Math.round(fcst.time_to_failure_hours / 24)} jours</strong></span>
                            <span className="text-foreground-300">·</span>
                            {fcst.auto_fix_deployed ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1"><i className="ri-check-line" /> Auto-fix déployé</span>
                            ) : (
                              <span className="text-amber-600 font-bold flex items-center gap-1"><i className="ri-time-line" /> En attente</span>
                            )}
                          </div>
                        </div>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 mt-2`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-background-50">
                            <span className="text-[10px] text-foreground-400 font-bold">Composants affectés</span>
                            <ul className="mt-1.5 space-y-0.5">
                              {fcst.affected_components.map((c, i) => (
                                <li key={i} className="text-xs text-foreground-700 flex items-center gap-1.5"><i className="ri-link text-foreground-400" />{c}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                            <span className="text-[10px] text-red-600 font-bold">Cause racine</span>
                            <p className="mt-1.5 text-xs text-foreground-700">{fcst.root_cause_pattern}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                            <span className="text-[10px] text-emerald-600 font-bold">Préemption recommandée</span>
                            <p className="mt-1.5 text-xs text-foreground-700">{fcst.recommended_preemption}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB 3: PREEMPTIVE FIXES ===== */}
      {activeTab === 'preemptive' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">Correctifs Préemptifs — {engine.stats.preemptive_fixes_applied} appliqués</h2>
              <p className="text-foreground-600 text-sm">{totalPrevented} défauts évités · {engine.stats.hours_saved_total}h économisées</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-emerald-700">{engine.stats.preemptive_fixes_applied}</div>
                <div className="text-xs text-foreground-500">Appliqués</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-amber-700">{engine.stats.preemptive_fixes_pending}</div>
                <div className="text-xs text-foreground-500">En attente</div>
              </div>
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-accent-700">{totalPrevented}</div>
                <div className="text-xs text-foreground-500">Défauts évités</div>
              </div>
              <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-secondary-700">{engine.stats.hours_saved_total}h</div>
                <div className="text-xs text-foreground-500">Heures sauvées</div>
              </div>
            </div>

            <div className="space-y-3">
              {engine.preemptiveFixesList.map(fix => (
                <div key={fix.id} className="rounded-xl bg-white border border-emerald-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <i className="ri-shield-check-line text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          fix.method === 'auto' ? 'bg-accent-100 text-accent-700 border-accent-200' :
                          fix.method === 'semi_auto' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-background-100 text-foreground-600 border-background-200'
                        }`}>
                          {fix.method === 'auto' ? 'AUTO' : fix.method === 'semi_auto' ? 'SEMI-AUTO' : 'MANUEL'}
                        </span>
                        <span className="text-sm font-bold text-foreground-950">{fix.description}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs mt-2">
                        <span className="text-emerald-600 font-bold"><i className="ri-check-double-line mr-1" />{fix.defect_prevented}</span>
                        <span className="text-foreground-500"><i className="ri-arrow-right-circle-line mr-1" />{fix.impact_avoided}</span>
                        <span className="text-secondary-600"><i className="ri-time-line mr-1" />{fix.time_saved_hours}h sauvées</span>
                      </div>
                      <div className="text-[10px] text-foreground-400 mt-1">
                        Appliqué le {new Date(fix.applied_at).toLocaleString('fr-FR')} · {fix.success_verified ? '✅ Vérifié' : '⏳ En vérification'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB 4: LEARNED PATTERNS ===== */}
      {activeTab === 'patterns' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'proven', 'validating', 'emerging'].map(f => (
                <button key={f} onClick={() => engine.setPatternFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                    engine.patternFilter === f ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}>
                  {f === 'all' ? 'Tous' : f === 'proven' ? 'Prouvés' : f === 'validating' ? 'En Validation' : 'Émergents'}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {engine.patterns.filter(p => engine.patternFilter === 'all' || p.maturity === engine.patternFilter).map(pt => {
                const isExpanded = expandedPattern === pt.id;
                const maturityColor = pt.maturity === 'proven' ? '#059669' : pt.maturity === 'validating' ? '#E8C547' : '#6366F1';
                const maturityLabel = pt.maturity === 'proven' ? 'PROUVÉ' : pt.maturity === 'validating' ? 'EN VALIDATION' : 'ÉMERGENT';
                return (
                  <div key={pt.id} className={`rounded-xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'}`}>
                    <button onClick={() => setExpandedPattern(isExpanded ? null : pt.id)} className="w-full p-4 text-left cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${maturityColor}15` }}>
                          <i className="ri-brain-line text-xl" style={{ color: maturityColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: maturityColor }}>{maturityLabel}</span>
                            <span className="text-sm font-bold text-foreground-950">{pt.pattern_name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-foreground-500">
                            <span>{pt.occurrences} occurrences</span>
                            <span>·</span>
                            <span>Taux succès <strong className="text-emerald-600">{pt.success_rate}%</strong></span>
                            <span>·</span>
                            <span>Faux positifs <strong className="text-amber-600">{pt.false_positive_rate}%</strong></span>
                          </div>
                        </div>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 mt-1`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-background-50">
                            <span className="text-[10px] text-foreground-400 font-bold">Déclencheurs typiques</span>
                            <ul className="mt-1.5 space-y-0.5">
                              {pt.typical_triggers.map((t, i) => (
                                <li key={i} className="text-xs text-foreground-700 flex items-start gap-1.5">
                                  <i className="ri-arrow-right-circle-line text-red-400 mt-0.5 flex-shrink-0" />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                            <span className="text-[10px] text-emerald-600 font-bold">Stratégie préemptive</span>
                            <p className="mt-1.5 text-xs text-foreground-700">{pt.preemptive_strategy}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-foreground-400">
                          <span>Première détection : {pt.first_seen}</span>
                          <span>Dernière : {pt.last_seen}</span>
                          <span>{pt.occurrences} occurrences</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB 5: PREVENTION KPIS ===== */}
      {activeTab === 'kpis' && (
        <section className="py-8 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-1">KPIs Prévention vs Réaction</h2>
              <p className="text-foreground-600 text-sm">Taux de prévention global : {engine.stats.prevention_rate_global}% · Cible : {engine.stats.target_prevention_rate}%</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {engine.kpis.map(kpi => {
                const preventionPct = kpi.prevention_rate;
                const targetPct = kpi.target_rate;
                const color = preventionPct >= 50 ? '#059669' : preventionPct >= 30 ? '#E8C547' : '#DC2626';
                return (
                  <div key={kpi.category} className="rounded-2xl bg-white border border-background-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-base font-bold text-foreground-950">{kpi.category}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                        kpi.trend === 'improving' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        kpi.trend === 'declining' ? 'bg-red-100 text-red-700 border-red-200' :
                        'bg-background-100 text-foreground-600 border-background-200'
                      }`}>
                        {kpi.trend === 'improving' ? '▲ En hausse' : kpi.trend === 'declining' ? '▼ En baisse' : '→ Stable'}
                      </span>
                    </div>

                    {/* Prevention vs Reactive */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground-500">Réactif</span>
                          <span className="font-bold text-red-600">{kpi.reactive_fixes}</span>
                        </div>
                        <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: `${(kpi.reactive_fixes / (kpi.reactive_fixes + kpi.preemptive_fixes)) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground-500">Préemptif</span>
                          <span className="font-bold text-emerald-600">{kpi.preemptive_fixes}</span>
                        </div>
                        <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(kpi.preemptive_fixes / (kpi.reactive_fixes + kpi.preemptive_fixes)) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Gauge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="26" fill="none" stroke="oklch(var(--background-200))" strokeWidth="4" />
                            <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="4"
                              strokeDasharray={`${(preventionPct / 100) * 2 * Math.PI * 26} ${2 * Math.PI * 26}`}
                              strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-foreground-950">{preventionPct}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-bold" style={{ color }}>Taux prévention</span>
                          <p className="text-[10px] text-foreground-400">Cible {targetPct}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-600">{kpi.defects_avoided} défauts évités</div>
                        <div className="text-xs text-secondary-600">{kpi.hours_saved}h sauvées</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preventive Impact Summary */}
            <div className="mt-8 bg-foreground-950 rounded-2xl p-8 text-center">
              <p className="text-white text-lg font-bold mb-4 font-heading">Impact Cumulé de la Prévention</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Défauts évités', value: totalPrevented, color: 'text-emerald-400' },
                  { label: 'Heures sauvées', value: `${engine.stats.hours_saved_total}h`, color: 'text-accent-400' },
                  { label: 'Taux prévention', value: `${engine.stats.prevention_rate_global}%`, color: 'text-secondary-400' },
                  { label: 'Patterns appris', value: engine.stats.patterns_learned, color: 'text-primary-400' },
                ].map(s => (
                  <div key={s.label}>
                    <div className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Cross-links */}
      <section className="py-6 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-foreground-500">Hubs connectés :</span>
            <Link to="/kos-correction-engine" className="text-xs px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300 cursor-pointer whitespace-nowrap">
              <i className="ri-tools-line mr-1" />Correction Engine
            </Link>
            <Link to="/kos-zero-defect-command" className="text-xs px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300 cursor-pointer whitespace-nowrap">
              <i className="ri-focus-3-line mr-1" />Zero-Defect Command
            </Link>
            <Link to="/kos-url-auto-pointage" className="text-xs px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300 cursor-pointer whitespace-nowrap">
              <i className="ri-link-unlink mr-1" />URL Auto-Pointage
            </Link>
            <Link to="/kos-performance-seo-command" className="text-xs px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300 cursor-pointer whitespace-nowrap">
              <i className="ri-rocket-2-line mr-1" />Perf & SEO
            </Link>
            <Link to="/kos-security-command" className="text-xs px-3 py-1.5 rounded-full bg-background-50 border border-background-200 text-foreground-600 hover:border-accent-300 cursor-pointer whitespace-nowrap">
              <i className="ri-shield-check-line mr-1" />Sécurité
            </Link>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}