import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSApiIndependence } from '@/hooks/useKOSApiIndependence';

function getStatusBadge(status: string) {
  const map: Record<string, string> = {
    optimal: 'bg-emerald-100 text-emerald-800',
    stable: 'bg-amber-100 text-amber-800',
    critical: 'bg-red-100 text-red-800',
    idle: 'bg-gray-100 text-gray-600',
  };
  const labels: Record<string, string> = {
    optimal: '100% Indépendant',
    stable: 'Partiellement indépendant',
    critical: 'Dépendance structurelle',
    idle: 'Non connecté',
  };
  return { className: map[status] || map.stable, label: labels[status] || status };
}

function IndependenceGauge({ score, size }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 48 : size === 'lg' ? 80 : 64;
  const strokeW = size === 'sm' ? 5 : 6;
  const r = (s - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const pct = score / 100;
  const offset = circ * (1 - pct);
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex items-center justify-center" style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <circle cx={s / 2} cy={s / 2} r={r} fill="none" stroke="oklch(var(--background-200))" strokeWidth={strokeW} />
        <circle
          cx={s / 2}
          cy={s / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${s / 2} ${s / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x={s / 2} y={s / 2} textAnchor="middle" dy="0.35em" className="fill-foreground-950 font-bold" style={{ fontSize: size === 'sm' ? 12 : size === 'lg' ? 20 : 16 }}>
          {score}%
        </text>
      </svg>
    </div>
  );
}

export default function apiIndependencePage() {
  const { providers, kpis, automatonCapabilities, fallbackStrategies, independenceRoadmap, independenceAlerts } = useKOSApiIndependence();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const tabs = [
    { key: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line' },
    { key: 'providers', label: '8 Providers', icon: 'ri-plug-line' },
    { key: 'automaton', label: 'KOS Automaton™', icon: 'ri-cpu-line' },
    { key: 'fallbacks', label: 'Fallback Chains', icon: 'ri-shield-line' },
    { key: 'roadmap', label: 'Roadmap Indépendance', icon: 'ri-road-map-line' },
    { key: 'alerts', label: 'Alertes', icon: 'ri-alert-line' },
  ];

  if (!kpis) return null;

  return (
    <hubLayout hubId={87}>
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                KOS API INDEPENDENCE COMMAND™
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap">
                Score Global {kpis.globalIndependenceScore}/100
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground-950 font-heading">
              Indépendance Système & APIs
            </h1>
            <p className="text-foreground-600 mt-2 max-w-2xl">
              Cartographie exhaustive des dépendances externes, stratégies de remplacement, fallback chains et progression vers l&apos;autonomie totale du système KOS.
            </p>
          </div>

          {/* KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { label: 'Score Global', value: `${kpis.globalIndependenceScore}%`, color: 'emerald' },
              { label: 'Providers', value: `${kpis.fullyIndependent}/${kpis.totalProviders} autonomes`, color: 'emerald' },
              { label: 'Endpoints Externes', value: kpis.endpointsExternal, color: 'amber' },
              { label: 'Endpoints Internes', value: kpis.endpointsInternal, color: 'emerald' },
              { label: 'Taux Autonomie', value: `${kpis.autonomyRate}%`, color: 'emerald' },
              { label: 'Coût Mensuel', value: '0 FCFA', color: 'emerald' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-background-50 border border-background-200/70 rounded-lg p-3 text-center">
                <div className="text-xs text-foreground-500 mb-1">{kpi.label}</div>
                <div className={`text-lg font-bold text-${kpi.color}-600`}>{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-6 bg-background-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-background-50 text-foreground-950 shadow-sm'
                    : 'text-foreground-600 hover:text-foreground-900'
                }`}
              >
                <i className={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {providers.map((p) => {
                  const badge = getStatusBadge(p.status);
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedProvider(p.id); setActiveTab('providers'); }}
                      className="bg-background-50 border border-background-200/70 rounded-xl p-5 text-left hover:border-accent-300/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-foreground-500 uppercase">{p.category}</span>
                        <IndependenceGauge score={p.independenceScore} size="sm" />
                      </div>
                      <div className="font-semibold text-foreground-950 mb-2 text-sm">{p.name}</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${badge.className}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-foreground-500">
                        <span>{p.autonomousPaths}/{p.totalPaths} chemins autonomes</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Automaton Quick Stats */}
              <div className="bg-background-100/70 border border-background-200/70 rounded-xl p-6">
                <h3 className="font-semibold text-foreground-950 mb-4 flex items-center gap-2">
                  <i className="ri-cpu-line text-emerald-600" />
                  KOS Automaton Engine™ — Cœur de l&apos;Indépendance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {automatonCapabilities.slice(0, 4).map((cap) => (
                    <div key={cap.name} className="bg-background-50 rounded-lg p-3">
                      <div className="text-xs text-foreground-500 mb-1">{cap.type}</div>
                      <div className="text-sm font-semibold text-foreground-950">{cap.name}</div>
                      <div className="text-xs text-emerald-600 mt-1">Remplace {cap.replaces}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <div className="space-y-4">
              {providers.map((p) => {
                const badge = getStatusBadge(p.status);
                const isSelected = selectedProvider === p.id;
                return (
                  <div key={p.id} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setSelectedProvider(isSelected ? null : p.id)}
                      className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-background-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <IndependenceGauge score={p.independenceScore} size="md" />
                        <div>
                          <div className="font-semibold text-foreground-950">{p.name}</div>
                          <div className="text-sm text-foreground-500">{p.category} · {p.endpoints.length} endpoints · {p.status === 'optimal' ? '100% autonome' : `${p.autonomousPaths}/${p.totalPaths} chemins autonomes`}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${badge.className}`}>{badge.label}</span>
                        <i className={`text-foreground-400 ${isSelected ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                      </div>
                    </button>
                    {isSelected && (
                      <div className="border-t border-background-200/70 p-5 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">Stratégie d&apos;Indépendance</div>
                          <p className="text-sm text-foreground-700">{p.strategy}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">Fallback Chain</div>
                            <div className="space-y-1">
                              {p.fallbackChain.map((fb, i) => (
                                <div key={fb} className="flex items-center gap-2 text-sm text-foreground-700">
                                  <span className="w-5 h-5 rounded-full bg-background-200 flex items-center justify-center text-xs font-bold text-foreground-600">{i + 1}</span>
                                  {fb}
                                  {i === 0 && <span className="text-xs text-emerald-600 font-medium">(primaire)</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">Chemins Critiques</div>
                            <div className="space-y-1">
                              {p.criticalPaths.map((cp) => (
                                <div key={cp} className="flex items-center gap-2 text-sm text-foreground-700">
                                  <i className={`text-xs ${p.autonomousPaths > 0 ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-close-circle-fill text-red-400'}`} />
                                  {cp}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-foreground-500">
                          <span>Remplacé par : <strong className="text-foreground-800">{p.replacedBy}</strong></span>
                          <span>·</span>
                          <span>Migration : {p.migrationDate}</span>
                          <span>·</span>
                          <span>Coût : {p.monthlyCost === 0 ? '0 FCFA' : `${p.monthlyCost} FCFA/mois`}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Automaton Tab */}
          {activeTab === 'automaton' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200/70 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <i className="ri-cpu-line text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground-950">KOS Automaton Engine™ v3.0</h3>
                    <p className="text-sm text-foreground-600">NLP 100% autonome · Zéro dépendance externe · Zéro latence réseau · Zéro coût</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {automatonCapabilities.map((cap) => (
                  <div key={cap.name} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                    <div className="text-xs font-semibold text-foreground-500 uppercase mb-2">{cap.type}</div>
                    <div className="font-semibold text-foreground-950 mb-2 text-sm">{cap.name}</div>
                    <div className="space-y-1.5 text-xs text-foreground-600">
                      <div className="flex justify-between">
                        <span>Remplace</span>
                        <span className="text-emerald-600 font-medium">{cap.replaces}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latence</span>
                        <span>{cap.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coût</span>
                        <span className="text-emerald-600 font-medium">0 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Statut</span>
                        <span className="text-emerald-600 font-medium capitalize">{cap.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallbacks Tab */}
          {activeTab === 'fallbacks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fallbackStrategies.map((fb) => (
                <div key={fb.name} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-foreground-500 uppercase">{fb.layer}</span>
                    <span className="text-xs font-medium text-emerald-600">Hit rate {fb.hitRate}%</span>
                  </div>
                  <div className="font-semibold text-foreground-950 mb-2">{fb.name}</div>
                  <div className="text-sm text-foreground-600 mb-3">{fb.pattern}</div>
                  <div className="text-xs text-foreground-500">Couverture : {fb.coverage}</div>
                </div>
              ))}
            </div>
          )}

          {/* Roadmap Tab */}
          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              {independenceRoadmap.map((phase) => (
                <div key={phase.phase} className="bg-background-50 border border-background-200/70 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${phase.progress === 100 ? 'bg-emerald-500' : phase.progress >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} />
                      <h3 className="font-semibold text-foreground-950">{phase.phase}</h3>
                    </div>
                    <span className="text-sm text-foreground-500">{phase.date}</span>
                  </div>
                  <div className="mb-3 bg-background-200 rounded-full h-2">
                    <div className="bg-emerald-500 rounded-full h-2 transition-all" style={{ width: `${phase.progress}%` }} />
                  </div>
                  <div className="text-xs text-foreground-500 mb-2">{phase.progress}% complété</div>
                  <div className="space-y-1">
                    {phase.achievements.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-foreground-700">
                        <i className="ri-checkbox-circle-fill text-emerald-500 text-xs" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-3">
              {independenceAlerts.map((alert) => {
                const sevColor = alert.severity === 'critical' ? 'border-red-300 bg-red-50' : alert.severity === 'high' ? 'border-amber-300 bg-amber-50' : alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50';
                const sevIcon = alert.severity === 'critical' ? 'ri-error-warning-fill text-red-500' : alert.severity === 'high' ? 'ri-alert-fill text-amber-500' : 'ri-information-fill text-blue-500';
                return (
                  <div key={alert.id} className={`border rounded-xl p-4 ${sevColor}`}>
                    <div className="flex items-start gap-3">
                      <i className={`${sevIcon} text-lg mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-foreground-500 uppercase">{alert.id}</span>
                          <span className="text-xs font-medium text-foreground-500">· {alert.provider.toUpperCase()}</span>
                          <span className={`text-xs font-bold uppercase ${alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-amber-600' : 'text-blue-600'}`}>{alert.severity}</span>
                        </div>
                        <p className="text-sm text-foreground-800 font-medium">{alert.message}</p>
                        <p className="text-sm text-foreground-600 mt-1">{alert.action}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer KPIs */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Providers 100% Indépendants', value: `${kpis.fullyIndependent}/${kpis.totalProviders}`, sub: 'n8n, Stripe, OpenAI (critique)' },
              { label: 'Endpoints Internes', value: kpis.endpointsInternal, sub: 'Edge Functions + Cron Jobs' },
              { label: 'Stratégies Fallback', value: kpis.fallbackStrategies, sub: '100% de couverture' },
              { label: 'Coût API Externe', value: '0 FCFA/mois', sub: 'Zéro coût récurrent' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-background-100/70 border border-background-200/70 rounded-xl p-4 text-center">
                <div className="text-xs text-foreground-500 mb-1">{kpi.label}</div>
                <div className="text-xl font-bold text-foreground-950">{kpi.value}</div>
                <div className="text-xs text-foreground-500 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



