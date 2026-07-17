import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useProductionGoLive } from '@/hooks/useProductionGoLive';
import type { GoLiveChecklistItem, HubDeploymentEntry, ProductionEvent, ProductionKPI, ProductionAlert, GoLiveTimelineEntry, SystemLayer } from '@/mocks/kosProductionGoLive';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function StatusBadge({ status, className }: { status: string; className?: string }) {
  const map: Record<string, { label: string; bg: string; border: string; color: string; dot: string }> = {
    passed: { label: 'PASS', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    in_progress: { label: 'EN COURS', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500 animate-pulse' },
    pending: { label: 'EN ATTENTE', bg: 'bg-slate-50', border: 'border-slate-200', color: 'text-slate-600', dot: 'bg-slate-400' },
    failed: { label: 'ÉCHEC', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', dot: 'bg-red-500' },
    skipped: { label: 'IGNORÉ', bg: 'bg-gray-50', border: 'border-gray-200', color: 'text-gray-500', dot: 'bg-gray-400' },
    optimal: { label: 'OPTIMAL', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    stable: { label: 'STABLE', bg: 'bg-amber-50', border: 'border-amber-200', color: 'text-amber-700', dot: 'bg-amber-500' },
    degraded: { label: 'DÉGRADÉ', bg: 'bg-orange-50', border: 'border-orange-200', color: 'text-orange-700', dot: 'bg-orange-500' },
    critical: { label: 'CRITIQUE', bg: 'bg-red-50', border: 'border-red-200', color: 'text-red-700', dot: 'bg-red-500 animate-pulse' },
    live: { label: 'LIVE', bg: 'bg-emerald-50', border: 'border-emerald-200', color: 'text-emerald-700', dot: 'bg-emerald-500 animate-pulse' },
    GO: { label: 'GO', bg: 'bg-emerald-500', border: 'border-emerald-600', color: 'text-white', dot: 'bg-white' },
  };
  const s = map[status] || { label: status.toUpperCase(), bg: 'bg-slate-50', border: 'border-slate-200', color: 'text-slate-600', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.border} border ${s.color} ${className || ''} whitespace-nowrap`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
      {s.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    critical: { label: 'CRITIQUE', bg: 'bg-red-100', color: 'text-red-700' },
    major: { label: 'MAJEUR', bg: 'bg-amber-100', color: 'text-amber-700' },
    minor: { label: 'MINEUR', bg: 'bg-slate-100', color: 'text-slate-600' },
    info: { label: 'INFO', bg: 'bg-sky-100', color: 'text-sky-700' },
  };
  const s = map[severity] || map.info;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${s.bg} ${s.color} whitespace-nowrap`}>{s.label}</span>;
}

type Tab = 'overview' | 'checklist' | 'hubs' | 'infra' | 'timeline' | 'kpis' | 'events' | 'report';

export default function KOSProductionGoLivePage() {
  const {
    globalState, deploymentSummary, checklist, hubs, infrastructure,
    events, kpis, alerts, report, timeline, commandersIntent, systemLayers,
    loading, error, refresh, globalStatus, passedChecks, failedChecks,
    inProgressChecks, criticalAlertsOpen, majorAlertsOpen, optimalHubs, totalModules,
  } = useProductionGoLive();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedChecklistPhase, setExpandedChecklistPhase] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; icon: string; count?: number | string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'checklist', label: 'Go-Live Checklist', icon: 'ri-check-double-line', count: `${passedChecks}/${report.totalChecks}` },
    { id: 'hubs', label: 'Registre Hubs', icon: 'ri-stack-line', count: hubs.length },
    { id: 'infra', label: 'Infrastructure', icon: 'ri-server-line' },
    { id: 'timeline', label: 'Timeline', icon: 'ri-timeline-view' },
    { id: 'kpis', label: 'KPIs', icon: 'ri-line-chart-line', count: kpis.length },
    { id: 'events', label: 'Événements', icon: 'ri-history-line', count: events.length },
    { id: 'report', label: 'Rapport Final', icon: 'ri-file-chart-line' },
  ];

  const kpiCategories = [...new Set(kpis.map(k => k.category))];
  const checklistPhases = [...new Set(checklist.map(c => c.phase))];
  const hubPhases = [...new Set(hubs.map(h => h.phase))];
  const eventTypes = [...new Set(events.map(e => e.type))];

  // ═══ VUE D'ENSEMBLE ═══
  const renderOverview = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Commander's Intent */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <i className="ri-flag-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground-950">{commandersIntent.title}</h3>
              <p className="text-[10px] text-foreground-500">{commandersIntent.author} — {commandersIntent.date}</p>
            </div>
          </div>
          <p className="text-sm text-foreground-700 leading-relaxed">{commandersIntent.summary}</p>
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <i className="ri-shield-check-line"></i>{commandersIntent.riskStatement}
            </p>
          </div>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Build', value: globalState.buildVersion, icon: 'ri-hammer-line', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Statut Production', value: 'LIVE', icon: 'ri-rocket-2-line', color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Uptime 30j', value: `${globalState.uptime30d}%`, icon: 'ri-server-line', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Hubs en Production', value: `${optimalHubs}/${hubs.length}`, icon: 'ri-stack-line', color: 'text-primary-700', bg: 'bg-primary-50' },
            { label: 'MTTR', value: globalState.meanTimeToRecover, icon: 'ri-timer-flash-line', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Déploiements', value: `${globalState.totalDeployments}`, icon: 'ri-rocket-line', color: 'text-sky-600', bg: 'bg-sky-50' },
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-lg border border-background-200/70 ${stat.bg} text-center`}>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-foreground-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Deployment Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {deploymentSummary.map((ds) => (
            <div key={ds.category} className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ds.color}15` }}>
                <i className={`${ds.icon} text-lg`} style={{ color: ds.color }}></i>
              </div>
              <div className="text-xl font-bold text-foreground-950">{ds.deployed}/{ds.total}</div>
              <div className="text-[10px] text-foreground-500 uppercase tracking-wider">{ds.category}</div>
              <StatusBadge status={ds.status} className="mt-1.5 inline-flex" />
            </div>
          ))}
        </div>

        {/* Architecture Layers */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-stack-line text-primary-500"></i>Architecture en Production
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {systemLayers.map((layer) => (
              <div key={layer.name} className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${layer.color}15` }}>
                  <i className={`${layer.icon} text-sm`} style={{ color: layer.color }}></i>
                </div>
                <span className="text-[10px] font-bold text-foreground-700 block leading-tight">{layer.name}</span>
                <span className="text-xs font-bold" style={{ color: layer.color }}>{layer.components}</span>
                <StatusBadge status={layer.status} className="mt-1 inline-flex text-[9px] px-1.5 py-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts (si présentes) */}
        {alerts.filter(a => !a.autoResolved).length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-notification-3-line text-amber-500"></i>Alertes Actives ({alerts.filter(a => !a.autoResolved).length})
            </h3>
            <div className="space-y-2">
              {alerts.filter(a => !a.autoResolved).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <SeverityBadge severity={alert.severity} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-foreground-950">{alert.title}</span>
                    <p className="text-[10px] text-foreground-500">{alert.description}</p>
                  </div>
                  <span className="text-[10px] text-foreground-400 whitespace-nowrap">{formatDate(alert.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cross-links footer */}
        <div className="text-center pt-6 border-t border-background-200/70">
          <p className="text-xs text-foreground-500 mb-3">Accès rapide aux hubs de production :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Deployment Pipeline', path: '/kos-deployment-pipeline', icon: 'ri-git-branch-line' },
              { label: 'Final Orchestration', path: '/kos-final-orchestration', icon: 'ri-radar-line' },
              { label: 'Global Launch', path: '/kos-global-launch', icon: 'ri-rocket-2-line' },
              { label: 'Control Tower', path: '/kos-control-tower', icon: 'ri-radar-line' },
              { label: 'Executive Command', path: '/kos-executive-command', icon: 'ri-dashboard-3-line' },
              { label: 'KPI Tower', path: '/kos-enterprise-kpi-command', icon: 'ri-bar-chart-2-line' },
            ].map((link) => (
              <a key={link.path} href={link.path} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-50 border border-background-200/70 text-sm font-medium text-foreground-700 hover:border-background-300/80 hover:text-foreground-950 transition-all cursor-pointer whitespace-nowrap">
                <i className={`${link.icon} text-foreground-500`}></i>{link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ GO-LIVE CHECKLIST ═══
  const renderChecklist = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground-950">Go-Live Checklist — {report.version}</h2>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={report.overallStatus} />
              <span className="text-xs text-foreground-500">{passedChecks}/{report.totalChecks} passés · {failedChecks} échoués · {inProgressChecks} en cours</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-3 rounded-full bg-background-200 overflow-hidden w-48">
              <div className="bg-emerald-500 h-full" style={{ width: `${(passedChecks / report.totalChecks) * 100}%` }}></div>
              {failedChecks > 0 && <div className="bg-red-500 h-full" style={{ width: `${(failedChecks / report.totalChecks) * 100}%` }}></div>}
              {inProgressChecks > 0 && <div className="bg-amber-500 h-full animate-pulse" style={{ width: `${(inProgressChecks / report.totalChecks) * 100}%` }}></div>}
            </div>
            <span className="text-sm font-bold text-foreground-950">{Math.round((passedChecks / report.totalChecks) * 100)}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {checklistPhases.map((phase) => {
            const phaseItems = checklist.filter(c => c.phase === phase);
            const phasePassed = phaseItems.filter(c => c.status === 'passed').length;
            const isExpanded = expandedChecklistPhase === phase;
            return (
              <div key={phase} className="rounded-lg border border-background-200 bg-background-50 overflow-hidden">
                <button
                  onClick={() => setExpandedChecklistPhase(isExpanded ? null : phase)}
                  className="w-full flex items-center justify-between p-4 hover:bg-background-100 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      phasePassed === phaseItems.length ? 'bg-emerald-100 text-emerald-600' :
                      phaseItems.some(c => c.status === 'failed') ? 'bg-red-100 text-red-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      <i className={`${phasePassed === phaseItems.length ? 'ri-check-double-line' : 'ri-loader-4-line'} text-sm`}></i>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-foreground-950">{phase}</span>
                      <span className="text-xs text-foreground-500 ml-2">{phasePassed}/{phaseItems.length} checks</span>
                    </div>
                  </div>
                  <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400`}></i>
                </button>
                {isExpanded && (
                  <div className="border-t border-background-200 divide-y divide-background-100">
                    {phaseItems.map((item) => (
                      <div key={item.id} className={`flex items-start gap-4 p-4 ${
                        item.status === 'failed' ? 'bg-red-50/50' :
                        item.status === 'in_progress' ? 'bg-amber-50/50' : ''
                      }`}>
                        <StatusBadge status={item.status} className="flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-xs font-bold text-foreground-950">{item.task}</span>
                            {item.critical && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">CRITIQUE</span>
                            )}
                            <span className="text-[10px] text-foreground-400">{item.category}</span>
                          </div>
                          {item.notes && (
                            <p className="text-[10px] text-foreground-500">{item.notes}</p>
                          )}
                          <p className="text-[9px] text-foreground-400 mt-0.5">
                            Vérifié par {item.verifiedBy} — {formatDate(item.verifiedAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ═══ REGISTRE HUBS ═══
  const renderHubs = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground-950">Registre de Déploiement — {hubs.length} Hubs</h2>
            <p className="text-xs text-foreground-500">{optimalHubs} optimaux · {totalModules} modules · {hubs.filter(h => h.liveDb).length} LIVE DB</p>
          </div>
        </div>
        <div className="rounded-lg border border-background-200 bg-background-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background-100 border-b border-background-200">
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider">Hub</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden sm:table-cell">Phase</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden md:table-cell">Catégorie</th>
                  <th className="text-center p-3 font-bold text-foreground-500 uppercase tracking-wider">Modules</th>
                  <th className="text-center p-3 font-bold text-foreground-500 uppercase tracking-wider">StyleSystem</th>
                  <th className="text-center p-3 font-bold text-foreground-500 uppercase tracking-wider">LIVE DB</th>
                  <th className="text-center p-3 font-bold text-foreground-500 uppercase tracking-wider">Santé</th>
                  <th className="text-center p-3 font-bold text-foreground-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {hubs.map((hub) => (
                  <tr key={hub.id} className="border-b border-background-100 hover:bg-background-100/50 transition-colors">
                    <td className="p-3">
                      <a href={hub.path} className="text-foreground-900 font-bold hover:text-primary-600 transition-colors">{hub.name}</a>
                    </td>
                    <td className="p-3 text-foreground-600 hidden sm:table-cell">{hub.phase}</td>
                    <td className="p-3 text-foreground-500 hidden md:table-cell">{hub.category}</td>
                    <td className="p-3 text-center font-bold text-foreground-950">{hub.modules}</td>
                    <td className="p-3 text-center">
                      {hub.styleSystem ? <span className="text-emerald-600 font-bold">✅</span> : <span className="text-red-500">❌</span>}
                    </td>
                    <td className="p-3 text-center">
                      {hub.liveDb ? <span className="text-emerald-600 font-bold">✅ LIVE</span> : <span className="text-foreground-400">MOCK</span>}
                    </td>
                    <td className="p-3 text-center font-bold text-foreground-950">{hub.healthScore}</td>
                    <td className="p-3 text-center"><StatusBadge status={hub.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ INFRASTRUCTURE ═══
  const renderInfrastructure = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* CPU & Memory */}
          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-cpu-line text-primary-500"></i>Ressources Serveur
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground-500">CPU</span>
                  <span className="font-bold text-foreground-950">{infrastructure.cpuUsed}/{infrastructure.cpuTotal}%</span>
                </div>
                <div className="h-3 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500" style={{ width: `${infrastructure.cpuUsed}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground-500">Mémoire</span>
                  <span className="font-bold text-foreground-950">{infrastructure.memoryUsed}/{infrastructure.memoryTotal} GB</span>
                </div>
                <div className="h-3 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${(infrastructure.memoryUsed / infrastructure.memoryTotal) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground-500">Stockage</span>
                  <span className="font-bold text-foreground-950">{infrastructure.storageUsed}/{infrastructure.storageTotal} GB</span>
                </div>
                <div className="h-3 rounded-full bg-background-200 overflow-hidden">
                  <div className="h-full rounded-full bg-secondary-500" style={{ width: `${(infrastructure.storageUsed / infrastructure.storageTotal) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Network & Response Times */}
          <div className="rounded-lg border border-background-200 bg-background-50 p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
              <i className="ri-signal-wifi-line text-accent-500"></i>Performance Réseau
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Requêtes 30j', value: `${(infrastructure.requests30d / 1000000).toFixed(1)}M`, icon: 'ri-global-line' },
                { label: 'Bande Passante 30j', value: `${infrastructure.bandwidth30d} GB`, icon: 'ri-download-line' },
                { label: 'Temps Réponse Moyen', value: `${infrastructure.avgResponseTime}ms`, icon: 'ri-timer-line' },
                { label: 'P95 Response Time', value: `${infrastructure.p95ResponseTime}ms`, icon: 'ri-speed-line' },
                { label: 'P99 Response Time', value: `${infrastructure.p99ResponseTime}ms`, icon: 'ri-speed-up-line' },
                { label: 'Connexions Actives', value: `${infrastructure.activeConnections}`, icon: 'ri-plug-line' },
                { label: 'Taux d\'Erreur 24h', value: `${infrastructure.errorRate}%`, icon: 'ri-error-warning-line' },
                { label: 'Disponibilité 30j', value: `${globalState.uptime30d}%`, icon: 'ri-check-double-line' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-background-100 text-center">
                  <div className="text-sm font-bold text-foreground-950">{item.value}</div>
                  <div className="text-[10px] text-foreground-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ TIMELINE ═══
  const renderTimeline = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4">Timeline Go-Live — {report.version}</h2>
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-background-200"></div>
          <div className="space-y-3">
            {timeline.map((entry, i) => (
              <div key={i} className={`relative flex items-start gap-4 pl-10 ${
                entry.status === 'active' ? 'bg-red-50/30 rounded-lg -mx-2 px-2 py-2' : ''
              }`}>
                <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-white ${
                  entry.status === 'completed' ? 'bg-emerald-500' :
                  entry.status === 'active' ? 'bg-red-500 animate-pulse' :
                  'bg-slate-300'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-foreground-500">{entry.time}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      entry.phase === 'Pré-vol' ? 'bg-sky-100 text-sky-700' :
                      entry.phase === 'Build' ? 'bg-violet-100 text-violet-700' :
                      entry.phase === 'Quality Gates' ? 'bg-amber-100 text-amber-700' :
                      entry.phase === 'Go-Live' ? 'bg-red-100 text-red-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{entry.phase}</span>
                    <StatusBadge status={entry.status === 'active' ? 'in_progress' : entry.status === 'completed' ? 'passed' : 'pending'} />
                  </div>
                  <p className="text-sm text-foreground-800 mt-0.5">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-sm font-bold text-red-700">🚀 GO-LIVE EN COURS — {timeline.find(e => e.status === 'active')?.time || 'NOW'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ KPIs ═══
  const renderKpis = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {kpiCategories.map((cat) => {
          const catKpis = kpis.filter(k => k.category === cat);
          return (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className={`${
                  cat === 'Performance' ? 'ri-speed-line' :
                  cat === 'SEO' ? 'ri-search-line' :
                  cat === 'Infrastructure' ? 'ri-server-line' :
                  cat === 'Deployment' ? 'ri-rocket-line' :
                  'ri-funds-line'
                } text-primary-500`}></i>{cat}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {catKpis.map((kpi) => (
                  <div key={kpi.id} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-foreground-500 uppercase tracking-wider">{kpi.name}</span>
                      <StatusBadge status={kpi.status} className="text-[9px] px-1.5 py-0.5" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-foreground-950">{kpi.value}{kpi.unit.startsWith('/') ? '' : ''}</span>
                      <span className="text-xs text-foreground-400">{kpi.unit.startsWith('/') ? kpi.unit : ''}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-[10px] font-bold ${
                        kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-foreground-400'
                      }`}>
                        {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '→'}
                      </span>
                      <span className="text-[10px] text-foreground-400">Cible: {kpi.target}{kpi.unit.startsWith('/') ? '' : kpi.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ═══ EVENTS ═══
  const renderEvents = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-lg font-heading font-bold text-foreground-950 mb-4">Journal des Événements — {events.length} entrées</h2>
        <div className="rounded-lg border border-background-200 bg-background-50 overflow-hidden">
          <div className="divide-y divide-background-100">
            {events.map((evt) => {
              const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
                deployment: { icon: 'ri-rocket-line', color: '#6366F1', bg: '#6366F115' },
                incident: { icon: 'ri-error-warning-line', color: '#DC2626', bg: '#DC262615' },
                rollback: { icon: 'ri-arrow-go-back-line', color: '#EA580C', bg: '#EA580C15' },
                milestone: { icon: 'ri-flag-line', color: '#86BC25', bg: '#86BC2515' },
                scale: { icon: 'ri-expand-vertical-line', color: '#14B8A6', bg: '#14B8A615' },
                maintenance: { icon: 'ri-tools-line', color: '#9CA3AF', bg: '#9CA3AF15' },
              };
              const tc = typeConfig[evt.type] || typeConfig.deployment;
              return (
                <div key={evt.id} className={`flex items-start gap-3 p-4 transition-colors ${
                  evt.severity === 'critical' ? 'bg-red-50/30' : evt.severity === 'major' ? 'bg-amber-50/30' : ''
                }`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tc.bg }}>
                    <i className={`${tc.icon} text-sm`} style={{ color: tc.color }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-bold text-foreground-950">{evt.title}</span>
                      <SeverityBadge severity={evt.severity} />
                      <span className="text-[10px] text-foreground-400">{evt.type}</span>
                    </div>
                    <p className="text-[11px] text-foreground-600">{evt.description}</p>
                    {evt.hubName && (
                      <span className="text-[10px] text-foreground-400 mt-0.5 block">Hub: {evt.hubName}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-foreground-400 whitespace-nowrap flex-shrink-0">{formatDate(evt.timestamp)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ RAPPORT FINAL ═══
  const renderReport = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50/30 p-6 mb-6 text-center">
          <div className="text-6xl mb-3">🚀</div>
          <h2 className="font-heading text-3xl font-bold text-emerald-700 mb-2">GO-LIVE AUTORISÉ</h2>
          <p className="text-sm text-emerald-600">{report.certification}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 bg-background-50 rounded-lg border border-background-200/70 p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Résumé Exécutif</h3>
            <p className="text-sm text-foreground-700 leading-relaxed mb-4">{report.summary}</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-emerald-100">
                <span className="block text-2xl font-bold text-emerald-700">{report.passedChecks}/{report.totalChecks}</span>
                <span className="text-[10px] text-emerald-600">Checks Passés</span>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <span className="block text-2xl font-bold text-red-700">{report.failedChecks}</span>
                <span className="text-[10px] text-red-600">Checks Échoués</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-100">
                <span className="block text-2xl font-bold text-amber-700">{report.inProgressChecks}</span>
                <span className="text-[10px] text-amber-600">En Cours</span>
              </div>
            </div>
          </div>
          <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
            <h3 className="text-sm font-bold text-foreground-950 mb-3">Informations</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-foreground-500">Version</span><span className="font-bold text-foreground-950">{report.version}</span></div>
              <div className="flex justify-between"><span className="text-foreground-500">Date</span><span className="font-bold text-foreground-950">{formatDate(report.generatedAt)}</span></div>
              <div className="flex justify-between"><span className="text-foreground-500">Certifié par</span><span className="font-bold text-foreground-950 text-right max-w-[180px]">{report.certifiedBy}</span></div>
              <div className="flex justify-between"><span className="text-foreground-500">Décision</span><StatusBadge status={report.overallStatus} /></div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5 mb-6">
          <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-lightbulb-line text-amber-500"></i>Recommandations Post-Go-Live
          </h3>
          <ul className="space-y-1.5">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-foreground-700">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 flex-shrink-0 mt-0.5 text-[10px] font-bold">{i + 1}</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Rollback Plan */}
        <div className="bg-background-50 rounded-lg border border-background-200/70 p-5">
          <h3 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-arrow-go-back-line text-orange-500"></i>Plan de Rollback
          </h3>
          <p className="text-sm text-foreground-700">{report.rollbackPlan}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <KOSHubLayout hubId={73}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-foreground-500">
              <div className="w-5 h-5 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></div>
              <span className="text-sm">Initialisation du cockpit de production...</span>
            </div>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  if (error) {
    return (
      <KOSHubLayout hubId={73}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <i className="ri-error-warning-line text-xl"></i>
            </div>
            <p className="text-sm text-red-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500">{error}</p>
            <button onClick={refresh} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-1.5"></i>Réessayer
            </button>
          </div>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={73}>
      <SeoHead
        title="KOS Total Production Go-Live Command™ — Mise en Production Totale | KHEPRA EXPERTS"
        description="Cockpit ultime de mise en production du système KOS. 71 hubs, 98 edge functions, 248 tables, 32 cron jobs, 75 agents IA. Go-Live checklist 18 points, rapport de certification Big Four. GO-LIVE AUTORISÉ."
        keywords="KOS Production Go-Live, mise en production, déploiement, KHEPRA EXPERTS, Big Four"
        canonicalPath="/kos-production-go-live"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Epic%20cinematic%20command%20center%20launch%20control%20room%20with%20massive%20holographic%20countdown%20timer%20at%20zero%20surrounded%20by%20glowing%20green%20status%20indicators%20all%20systems%20go%2C%20dramatic%20volumetric%20lighting%20with%20intense%20warm%20amber%20and%20gold%20beams%20piercing%20through%20dark%20atmosphere%2C%20ultra%20detailed%20futuristic%20space%20launch%20control%20aesthetic%20with%20complex%20geometric%20terminal%20displays%20showing%20deployment%20progress%20bars%20and%20system%20health%20dashboards%2C%20high%20tech%20mission%20control%20with%20rows%20of%20operational%20workstations%20bathed%20in%20soft%20emerald%20monitor%20glow%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows%20and%20intense%20contrast%20celebrating%20successful%20go%20live%20moment&width=1920&height=600&seq=kos-go-live-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto pt-12 pb-10">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/30 border border-red-500/40 backdrop-blur-sm">
                <i className="ri-rocket-2-line text-red-400 text-sm"></i>
                <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">KOS Total Production Go-Live™</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">{globalState.buildVersion} · LIVE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-amber-400 text-sm"></i>
                <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">AAAA Big Four Supreme</span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Mise en Production Totale.
              <span className="block text-red-400 mt-2">71 hubs. 98 edge functions. 248 tables. GO.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">KOS Total Production Go-Live Command™</strong> — le cockpit ultime de mise en production.{' '}
              <strong className="text-emerald-400">{report.passedChecks}/{report.totalChecks} checks passés</strong>.{' '}
              <strong className="text-white">Uptime {globalState.uptime30d}%</strong>.{' '}
              Certification <strong className="text-amber-400">AAAA Big Four Supreme 100%</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <StatusBadge status={report.overallStatus} className="text-sm px-4 py-2" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm text-emerald-300 font-semibold">{globalState.buildVersion} · {globalState.totalDeployments} déploiements</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <i className="ri-timer-line text-amber-400"></i>
                <span className="text-sm text-amber-300 font-semibold">MTTR {globalState.meanTimeToRecover}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-sm">
                <i className="ri-global-line text-sky-400"></i>
                <span className="text-sm text-sky-300 font-semibold">{globalState.deployFrequency}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-background-100 text-foreground-400'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-screen bg-background-50">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'checklist' && renderChecklist()}
        {activeTab === 'hubs' && renderHubs()}
        {activeTab === 'infra' && renderInfrastructure()}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'kpis' && renderKpis()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'report' && renderReport()}
      </div>
    </KOSHubLayout>
  );
}