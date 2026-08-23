import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSFinalOrchestration } from '@/hooks/useKOSFinalOrchestration';
import type { hubRegistryEntry } from '@/mocks/finalOrchestration';

function GlobalScoreRing({ score, target, size = 80, strokeWidth = 6 }: { score: number; target: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.min((score / target) * 100, 100);
  const offset = circumference - (pct / 100) * circumference;
  const getColor = (v: number) => {
    if (v >= 9) return 'var(--primary-500)';
    if (v >= 8) return 'var(--accent-500)';
    if (v >= 7) return 'var(--secondary-500)';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(var(--background-200) / 0.5)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor(score)} strokeWidth={strokeWidth} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <span className="absolute text-xl font-bold text-foreground-950 font-heading">{score.toFixed(1)}</span>
    </div>
  );
}

function StatusBadge({ status, className }: { status: string; className?: string }) {
  const map: Record<string, { label: string; bg: string; border: string; color: string; dot: string }> = {
    nominal: { label: 'NOMINAL', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    degrade: { label: 'DÉGRADÉ', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500' },
    critical: { label: 'CRITIQUE', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', dot: 'bg-red-500' },
    maintenance: { label: 'MAINTENANCE', bg: 'bg-slate-50', border: 'border-slate-200', color: 'text-slate-700', dot: 'bg-slate-500' },
    open: { label: 'OUVERT', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', dot: 'bg-red-500' },
    acknowledged: { label: 'ACQUITTÉ', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500' },
    resolved: { label: 'RÉSOLU', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    active: { label: 'ACTIF', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    degraded: { label: 'DÉGRADÉ', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500' },
    broken: { label: 'ROMPU', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', dot: 'bg-red-500' },
    warning: { label: 'ATTENTION', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const s = map[status] || map.nominal;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.border} ${s.color} ${className || ''} whitespace-nowrap`}>
      <span className={`w-2 h-2 rounded-full ${s.dot} ${status === 'open' ? 'animate-pulse' : ''}`}></span>
      {s.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { label: string; bg: string; border: string; color: string }> = {
    critical: { label: 'CRITIQUE', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700' },
    major: { label: 'MAJEUR', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700' },
    minor: { label: 'MINEUR', bg: 'bg-slate-50', border: 'border-slate-200', color: 'text-slate-600' },
  };
  const s = map[severity] || map.minor;
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${s.bg} ${s.border} ${s.color} whitespace-nowrap`}>{s.label}</span>;
}

function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    gouvernance: { label: 'GOUVERNANCE', bg: 'bg-primary-100/70', color: 'text-primary-700' },
    operations: { label: 'OPÉRATIONS', bg: 'bg-secondary-100/80', color: 'text-secondary-700' },
    qualite: { label: 'QUALITÉ', bg: 'bg-emerald-100/70', color: 'text-emerald-700' },
    intelligence: { label: 'INTELLIGENCE', bg: 'bg-accent-100/80', color: 'text-accent-700' },
    conformite: { label: 'CONFORMITÉ', bg: 'bg-sky-100/70', color: 'text-sky-700' },
    orchestration: { label: 'ORCHESTRATION', bg: 'bg-violet-100/70', color: 'text-violet-700' },
  };
  const s = map[category] || { label: category, bg: 'bg-background-200/70', color: 'text-foreground-600' };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${s.bg} ${s.color} whitespace-nowrap`}>{s.label}</span>;
}

export default function finalOrchestrationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedHub, setExpandedHub] = useState<number | null>(null);

  const {
    hubs,
    globalState,
    crossAlerts,
    systemLinks,
    resources,
    commandersIntent,
    healthHistory,
    loading,
    error,
    dataSource,
    lastUpdated,
    refresh,
    globalStatus,
    nominalCount,
    degradedCount,
    criticalCount,
    totalCost,
    totalCPU,
    totalMemory,
    totalAPICalls,
    openCriticalAlerts,
    openMajorAlerts,
    brokenLinks,
    degradedLinks,
  } = useKOSFinalOrchestration();

  const filteredHubs = useMemo(() => {
    if (selectedCategory === 'all') return hubs;
    return hubs.filter(h => h.category === selectedCategory);
  }, [hubs, selectedCategory]);

  const categories = [...new Set(hubs.map(h => h.category))];

  const linksByStatus = useMemo(() => ({
    active: systemLinks.filter(l => l.status === 'active').length,
    degraded: systemLinks.filter(l => l.status === 'degraded').length,
    broken: systemLinks.filter(l => l.status === 'broken').length,
  }), [systemLinks]);

  const maxHealthScore = Math.max(...healthHistory.map(h => h.score));
  const minHealthScore = Math.min(...healthHistory.map(h => h.score));

  if (loading) {
    return (
      <hubLayout hubId={99}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Consolidation du système KOS en cours...</span>
            </div>
          </div>
        </div>
      </hubLayout>
    );
  }

  if (error && hubs.length === 0) {
    return (
      <hubLayout hubId={99}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-red-700 font-medium">Erreur de consolidation</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refresh} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 dark:text-foreground-950 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={99}>
      {/* Hero — Cockpit Ultime */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-foreground-500 bg-background-50 px-3 py-1 rounded-full">
                  KOS Enterprise+ — Phase Finale
                </span>
                <StatusBadge status={globalStatus} />
                {dataSource === 'supabase' ? (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    DONNÉES LIVE
                  </span>
                ) : (
                  <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full font-medium">Mode MOCK</span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                KOS Final Orchestration Command™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-2 max-w-3xl">
                Consolidation ultime du système KOS. 12 hubs interconnectés, 146 agents autonomes. Single Pane of Glass — une seule vue pour tout piloter.
              </p>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0">
              <GlobalScoreRing score={globalState?.globalHealthScore || 0} target={globalState?.targetHealthScore || 10} size={80} strokeWidth={6} />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground-950">
                  Score Global
                </div>
                <p className="text-xs text-foreground-500 mt-0.5">/10 — Standard Big Four</p>
                <div className="flex items-center gap-4 mt-2 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {nominalCount} nominaux
                  </span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {degradedCount} dégradés
                  </span>
                  {criticalCount > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      {criticalCount} critiques
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-foreground-500">Mise à jour</div>
                <div className="text-sm font-semibold text-foreground-950">
                  {lastUpdated ? lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex gap-3 overflow-x-auto">
            {[
              { label: 'Hubs', value: `${globalState?.nominalHubs}/${globalState?.totalHubs}`, icon: 'ri-stack-line', status: 'nominal' },
              { label: 'Agents', value: `${globalState?.activeAgents}/${globalState?.totalAgents}`, icon: 'ri-robot-2-line', status: 'nominal' },
              { label: 'Ops/24h', value: (globalState?.totalOperations24h || 0).toLocaleString(), icon: 'ri-flashlight-line', status: 'nominal' },
              { label: 'Corrections Auto', value: (globalState?.totalCorrectionsAuto || 0).toLocaleString(), icon: 'ri-tools-line', status: 'nominal' },
              { label: 'Alertes Crit.', value: String(globalState?.criticalAlerts || 0), icon: 'ri-error-warning-line', status: globalState?.criticalAlerts ? 'critical' : 'nominal' },
              { label: 'Liens Dégradés', value: String(degradedLinks), icon: 'ri-git-branch-line', status: degradedLinks > 0 ? 'warning' : 'nominal' },
              { label: 'CPU Total', value: `${totalCPU}%`, icon: 'ri-cpu-line', status: totalCPU > 300 ? 'warning' : 'nominal' },
              { label: 'RAM Total', value: `${totalMemory} GB`, icon: 'ri-hard-drive-2-line', status: 'nominal' },
              { label: 'Coût /mois', value: `$${(totalCost).toLocaleString()}`, icon: 'ri-money-dollar-circle-line', status: 'nominal' },
              { label: 'Uptime 30j', value: `${globalState?.uptime30d}%`, icon: 'ri-server-line', status: 'nominal' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-background-100 border border-background-200/60 flex-shrink-0">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                  stat.status === 'critical' ? 'bg-red-100 text-red-600' :
                  stat.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                  'bg-background-200/70 text-foreground-600'
                }`}>
                  <i className={`${stat.icon} text-sm`}></i>
                </div>
                <div>
                  <div className="text-[10px] text-foreground-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-sm font-bold text-foreground-950">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commander's Final Intent */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <i className="ri-flag-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Commander's Final Intent — {commandersIntent.date}</h3>
              <p className="text-[10px] text-foreground-500">{commandersIntent.author}</p>
            </div>
          </div>
          <p className="text-sm text-foreground-700 mb-4 leading-relaxed">{commandersIntent.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5">
                <i className="ri-play-circle-line text-primary-500"></i>Actions Prioritaires
              </h4>
              <ul className="space-y-1.5">
                {commandersIntent.priorityActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground-950 mb-2 flex items-center gap-1.5">
                <i className="ri-scales-line text-accent-500"></i>Décisions Requises
              </h4>
              <ul className="space-y-1.5">
                {commandersIntent.decisionsRequired.map((dec, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </span>
                    {dec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-System Alerts */}
      {crossAlerts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
          <div className={`rounded-lg border-2 p-5 ${
            openCriticalAlerts > 0 ? 'border-red-200 bg-red-50/50' :
            openMajorAlerts > 0 ? 'border-amber-200 bg-amber-50/50' :
            'border-background-200/70 bg-background-50'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                openCriticalAlerts > 0 ? 'bg-red-100 text-red-600' :
                openMajorAlerts > 0 ? 'bg-amber-100 text-amber-600' :
                'bg-background-200/70 text-foreground-500'
              }`}>
                <i className="ri-notification-3-line text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground-950">Alertes Cross-Système</h3>
                <p className="text-xs text-foreground-500">
                  {crossAlerts.length} alertes — {openCriticalAlerts} critiques, {openMajorAlerts} majeures
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {crossAlerts.map((alert) => {
                const sevBg = alert.severity === 'critical' ? 'border-red-200 bg-red-50/70' :
                  alert.severity === 'major' ? 'border-amber-200 bg-amber-50/70' :
                  'border-background-200 bg-background-100';
                const sevDot = alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'major' ? 'bg-amber-500' :
                  'bg-slate-400';
                return (
                  <div key={alert.id} className={`p-4 rounded-lg border ${sevBg}`}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <SeverityBadge severity={alert.severity} />
                      <StatusBadge status={alert.status} />
                      <span className="text-xs text-foreground-400">{new Date(alert.detectedAt).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-950 mb-1">{alert.title}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-2">{alert.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="text-foreground-500">Hubs affectés :</span>
                      {alert.affectedHubs.map((hub) => (
                        <span key={hub} className="px-1.5 py-0.5 rounded bg-background-200/60 text-foreground-600">{hub}</span>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-primary-600 font-medium flex items-center gap-1">
                      <i className="ri-lightbulb-line"></i>
                      {alert.recommendedAction}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hub Registry — 12 Hubs */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700">
              <i className="ri-stack-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Registre des Hubs KOS — {hubs.length} Hubs</h3>
              <p className="text-xs text-foreground-500">Cliquez pour accéder à chaque hub spécialisé</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs px-2.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-foreground-950 text-background-50 dark:text-foreground-950' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'
              }`}
            >
              Tous ({hubs.length})
            </button>
            {categories.map((cat) => {
              const count = hubs.filter(h => h.category === cat).length;
              const cfg: Record<string, string> = {
                gouvernance: 'hover:bg-primary-100/60',
                operations: 'hover:bg-secondary-100/60',
                qualite: 'hover:bg-emerald-100/60',
                intelligence: 'hover:bg-accent-100/60',
                conformite: 'hover:bg-sky-100/60',
                orchestration: 'hover:bg-violet-100/60',
              };
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${cfg[cat] || ''} ${
                    selectedCategory === cat ? 'bg-foreground-950 text-background-50 dark:text-foreground-950' : 'bg-background-200/70 text-foreground-600'
                  }`}
                >
                  <CategoryBadge category={cat} /> ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredHubs.map((hub) => (
            <a
              key={hub.id}
              href={hub.path}
              className={`bg-background-50 border rounded-lg p-4 block transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer ${
                hub.status === 'critical' ? 'border-red-200 ring-1 ring-red-100' :
                hub.status === 'degrade' ? 'border-amber-200 ring-1 ring-amber-50' :
                'border-background-200/60 hover:border-background-300/80'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  hub.status === 'critical' ? 'bg-red-100 text-red-600' :
                  hub.status === 'degrade' ? 'bg-amber-100 text-amber-600' :
                  'bg-background-200/70 text-foreground-600'
                } group-hover:scale-105 transition-transform`}>
                  <i className={`${hub.icon} text-base`}></i>
                </div>
                <div className="flex items-center gap-1.5">
                  <CategoryBadge category={hub.category} />
                  <StatusBadge status={hub.status} />
                </div>
              </div>
              <h4 className="text-sm font-semibold text-foreground-950 mb-1 group-hover:text-primary-600 transition-colors">{hub.name}</h4>
              <p className="text-[11px] text-foreground-500 leading-relaxed line-clamp-2 mb-3">{hub.description}</p>
              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-background-200/50">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-foreground-600">
                    <i className="ri-robot-2-line"></i>{hub.agents}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    hub.alerts > 0 ? 'text-red-600 font-medium' : 'text-foreground-400'
                  }`}>
                    <i className={`${hub.alerts > 0 ? 'ri-error-warning-line' : 'ri-check-line'}`}></i>{hub.alerts}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-foreground-500">
                  <span className="font-bold text-xs text-foreground-950">{hub.score}</span>
                  <span className="text-foreground-400">/10</span>
                </div>
              </div>
              <div className="mt-2 w-full h-1 rounded-full bg-background-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    hub.maturity >= 90 ? 'bg-emerald-500' :
                    hub.maturity >= 80 ? 'bg-primary-500' :
                    hub.maturity >= 70 ? 'bg-accent-500' :
                    'bg-secondary-500'
                  }`}
                  style={{ width: `${hub.maturity}%` }}
                ></div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* System Links — Architecture Vivante */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <i className="ri-git-branch-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">Architecture Vivante — Interconnexions Système</h3>
              <p className="text-xs text-foreground-500">
                {systemLinks.length} liens — {linksByStatus.active}
                <span className="text-emerald-600 ml-1">actifs</span>
                {linksByStatus.degraded > 0 && <span className="text-amber-600 ml-1">· {linksByStatus.degraded} dégradés</span>}
                {linksByStatus.broken > 0 && <span className="text-red-600 ml-1">· {linksByStatus.broken} rompus</span>}
              </p>
            </div>
          </div>

          <div className="bg-background-50 rounded-lg border border-background-200/70 p-4 overflow-x-auto">
            <div className="flex flex-col gap-2 min-w-[640px]">
              <div className="flex items-center gap-3 px-3 py-1.5 text-[10px] font-semibold text-foreground-400 uppercase tracking-wider">
                <span className="w-40">Source</span>
                <span className="w-8 text-center">→</span>
                <span className="w-40">Cible</span>
                <span className="w-20 text-center">Type</span>
                <span className="w-24 text-center">Statut</span>
                <span className="w-24 text-right">Débit</span>
              </div>
              {systemLinks.map((link, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs ${
                  link.status === 'broken' ? 'bg-red-50/50' :
                  link.status === 'degraded' ? 'bg-amber-50/50' :
                  'bg-background-100 hover:bg-background-200/30'
                }`}>
                  <span className="w-40 text-foreground-700 font-medium truncate">{link.source}</span>
                  <span className={`w-8 text-center ${
                    link.status === 'broken' ? 'text-red-400' :
                    link.status === 'degraded' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    <i className={`${
                      link.type === 'command' ? 'ri-arrow-right-double-line' :
                      link.type === 'feedback' ? 'ri-arrow-go-back-line' :
                      link.type === 'dependency' ? 'ri-link' :
                      'ri-arrow-right-line'
                    } text-base`}></i>
                  </span>
                  <span className="w-40 text-foreground-700 font-medium truncate">{link.target}</span>
                  <span className="w-20 text-center">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      link.type === 'command' ? 'bg-violet-100 text-violet-700' :
                      link.type === 'data-flow' ? 'bg-sky-100 text-sky-700' :
                      link.type === 'feedback' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-secondary-100 text-secondary-700'
                    }`}>
                      {link.type === 'command' ? 'Commande' :
                       link.type === 'data-flow' ? 'Data Flow' :
                       link.type === 'feedback' ? 'Feedback' : 'Dépendance'}
                    </span>
                  </span>
                  <span className="w-24 text-center">
                    <StatusBadge status={link.status} />
                  </span>
                  <span className={`w-24 text-right font-mono text-xs ${
                    link.status === 'broken' ? 'text-red-500' :
                    link.status === 'degraded' ? 'text-amber-500' :
                    'text-emerald-600'
                  }`}>{link.throughput}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Allocation + Health History */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Resource Allocation Summary */}
          <div>
            <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-hard-drive-2-line text-secondary-500"></i>
              Allocation Ressources — Top 6 Hubs
            </h3>
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-4">
              <div className="space-y-3">
                {resources.sort((a, b) => b.costMonthly - a.costMonthly).slice(0, 6).map((res) => (
                  <div key={res.hubName} className="flex items-center gap-3 text-xs">
                    <span className="w-36 flex-shrink-0 text-foreground-700 font-medium truncate">{res.hubName}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-foreground-400 w-8">CPU</span>
                        <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${Math.min(res.cpu, 100)}%` }}></div>
                        </div>
                        <span className="text-[10px] text-foreground-600 w-8 text-right">{res.cpu}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-foreground-400 w-8">RAM</span>
                        <div className="flex-1 h-1.5 rounded-full bg-background-200 overflow-hidden">
                          <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${Math.min(res.memory / 0.8, 100)}%` }}></div>
                        </div>
                        <span className="text-[10px] text-foreground-600 w-8 text-right">{res.memory}G</span>
                      </div>
                    </div>
                    <span className="w-16 text-right font-bold text-foreground-950">${res.costMonthly}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Health Evolution */}
          <div>
            <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-line-chart-line text-primary-500"></i>
              Évolution Santé Système — 2026
            </h3>
            <div className="bg-background-50 rounded-lg border border-background-200/70 p-4">
              <div className="flex items-end gap-3 h-40">
                {healthHistory.map((entry, i) => {
                  const range = maxHealthScore - minHealthScore || 1;
                  const hPct = ((entry.score - minHealthScore) / range) * 80 + 10;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full max-w-[32px] rounded-t-md bg-primary-500/80 transition-all duration-700 hover:bg-primary-500"
                        style={{ height: `${hPct}%` }}
                        title={`${entry.date}: ${entry.score}/10`}
                      ></div>
                      <span className="text-[10px] text-foreground-500 whitespace-nowrap">
                        {entry.date.split('-')[1] && (() => {
                          const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû'];
                          return months[parseInt(entry.date.split('-')[1]) - 1] || entry.date;
                        })()}
                      </span>
                      <span className="text-[10px] font-bold text-foreground-950">{entry.score}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-foreground-500">
                <span>Min: {minHealthScore}</span>
                <span className="flex items-center gap-1 text-primary-600">
                  <i className="ri-arrow-up-line text-xs"></i>
                  +{((maxHealthScore - healthHistory[0].score) / healthHistory[0].score * 100).toFixed(1)}% depuis janvier
                </span>
                <span>Max: {maxHealthScore}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maturité Finale & Cross-links */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-4">Maturité Consolidée KOS</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Couverture Fonctionnelle', pct: 94, color: 'bg-emerald-500' },
              { label: 'Intégration Supabase', pct: 70, color: 'bg-accent-500' },
              { label: 'Autonomie IA', pct: 88, color: 'bg-primary-500' },
              { label: 'Monitoring Proactif', pct: 85, color: 'bg-secondary-500' },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-foreground-600">{item.label}</span>
                  <span className="text-sm font-bold text-foreground-950">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-background-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation rapide vers autres hubs */}
          <div className="text-center">
            <p className="text-xs text-foreground-500 mb-3">Accès rapide aux hubs principaux :</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Executive Command', path: '/kos-executive-command', icon: 'ri-dashboard-3-line' },
                { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line' },
                { label: 'Control Tower', path: '/kos-control-tower', icon: 'ri-radar-line' },
                { label: 'ESG & Regulatory', path: '/kos-esg-regulatory', icon: 'ri-scales-3-line' },
                { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line' },
              ].map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-50 border border-background-200/70 text-sm font-medium text-foreground-700 hover:border-background-300/80 hover:text-foreground-950 transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className={`${link.icon} text-foreground-500`}></i>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



