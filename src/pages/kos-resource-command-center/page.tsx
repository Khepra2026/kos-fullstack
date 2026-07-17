import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useResourceCommandCenter } from '@/hooks/useResourceCommandCenter';
import type { KOSUnifiedAgent, ResourceOptimization, DeploymentAction } from '@/mocks/kosResourceCommandCenter';

function getStatusBadge(status: string) {
  switch (status) {
    case 'active': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Activé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'gap': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'GAP', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getEngineStatusBadge(status: string) {
  switch (status) {
    case 'healthy': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Healthy', dot: 'bg-emerald-500' };
    case 'degraded': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Degraded', dot: 'bg-amber-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critical', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getImpactBadge(impact: string) {
  switch (impact) {
    case 'high': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Impact Élevé', dot: 'bg-red-500' };
    case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Impact Moyen', dot: 'bg-amber-500' };
    case 'low': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'Impact Faible', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

type TabId = 'overview' | 'agents' | 'engines' | 'optimization' | 'deployment';

export default function KOSResourceCommandCenterPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'partial' | 'gap'>('all');
  const [engineFilter, setEngineFilter] = useState<string>('all');
  const [expandedOpt, setExpandedOpt] = useState<string | null>(null);
  const [deploymentFilter, setDeploymentFilter] = useState<'all' | 'critical' | 'major' | 'minor'>('all');
  const [appliedActions, setAppliedActions] = useState<Set<string>>(new Set());

  const {
    engines: KOS_ENGINES,
    agents: KOS_UNIFIED_AGENTS,
    health: SYSTEM_HEALTH,
    optimizations: RESOURCE_OPTIMIZATIONS,
    deployments: DEPLOYMENT_ACTIONS,
    isLive,
    loading,
    error,
    refetch,
  } = useResourceCommandCenter();

  const health = SYSTEM_HEALTH;

  const filteredAgents = useMemo(() => {
    let filtered = KOS_UNIFIED_AGENTS;
    if (statusFilter !== 'all') filtered = filtered.filter((a) => a.status === statusFilter);
    if (engineFilter !== 'all') filtered = filtered.filter((a) => a.engine === engineFilter);
    return filtered;
  }, [statusFilter, engineFilter]);

  const filteredDeployments = useMemo(() => {
    let filtered = DEPLOYMENT_ACTIONS.filter((a) => !appliedActions.has(a.id));
    if (deploymentFilter !== 'all') filtered = filtered.filter((a) => a.priority === deploymentFilter);
    return filtered;
  }, [deploymentFilter, appliedActions]);

  const applyAction = useCallback((actionId: string) => {
    setAppliedActions((prev) => {
      const next = new Set(prev);
      next.add(actionId);
      return next;
    });
  }, []);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
    { id: 'agents', label: 'Agents (48)', icon: 'ri-robot-line' },
    { id: 'engines', label: 'Moteurs (8)', icon: 'ri-cpu-line' },
    { id: 'optimization', label: 'Optimisations', icon: 'ri-speed-up-line' },
    { id: 'deployment', label: `Déploiement (${filteredDeployments.length})`, icon: 'ri-rocket-line' },
  ];

  const engineOptions = [
    { value: 'all', label: 'Tous les moteurs' },
    { value: 'orchestrator-engine', label: 'Orchestrator Engine' },
    { value: 'unified-autopilot', label: 'Unified Autopilot' },
    { value: 'quality-system', label: 'Quality System' },
    { value: 'growth-orchestrator', label: 'Growth Orchestrator' },
  ];

  return (
    <KOSHubLayout hubId={45}>
      <SeoHead
        title="KOS Resource Command Center™ — Maintenance & Activation | KHEPRA EXPERTS"
        description="Console centrale de maintenance et d'optimisation des ressources KOS. 48 agents unifiés, 8 moteurs, monitoring CPU/Mémoire, activation/déploiement automatisé, alertes et optimisations."
        keywords="KOS Resource Command Center, KOS maintenance, KOS agents activation, resource optimization, agent deployment, system health, KHEPRA EXPERTS"
        canonicalPath="/kos-resource-command-center"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

        {/* Hero */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-foreground-950">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=abstract%20dark%20technological%20command%20center%20with%20glowing%20interconnected%20network%20nodes%20forming%20a%20hub%20and%20spoke%20architecture%2C%20vibrant%20emerald%20green%20and%20warm%20amber%20data%20streams%20flowing%20across%20a%20sophisticated%20dashboard%2C%20minimalist%20corporate%20control%20room%20aesthetic%20with%20clean%20geometric%20patterns%20and%20subtle%20ambient%20light%2C%20no%20text%20no%20human%20figures%2C%20premium%20enterprise%20resource%20management%20visualization&width=1920&height=600&seq=kos-resource-center-hero&orientation=landscape"
              alt=""
              className="w-full h-full object-cover object-center opacity-18"
              width="1920"
              height="600"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <i className="ri-server-line text-emerald-400 text-sm" />
                  <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                    KOS Resource Command Center™ — Maintenance & Activation
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                  isLive
                    ? 'bg-emerald-500/20 border border-emerald-400/30'
                    : 'bg-amber-500/20 border border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isLive ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                  </span>
                </div>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Toutes les ressources KOS.
                <span className="block text-emerald-400 mt-2">Un seul centre de commande.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong className="text-white">48 agents</strong> répartis sur <strong className="text-white">8 moteurs</strong>.{' '}
                Monitoring temps réel CPU/Mémoire, activation des agents, file de déploiement, optimisations système.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-300 font-semibold">{health.activeAgents} Activés</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-amber-300 font-semibold">{health.partialAgents} Partiels</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-red-300 font-semibold">{health.gapAgents} GAPs</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <i className="ri-alert-line text-amber-400" />
                  <span className="text-sm text-amber-300 font-semibold">{health.alertsCritical} Alertes critiques</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-30 bg-white border-b border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-foreground-950 text-white'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Chargement des ressources KOS...</h2>
              <p className="text-foreground-500">Scan des 8 moteurs et 48 agents en cours.</p>
            </div>
          </section>
        )}

        {/* Error State */}
        {!loading && error && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <i className="ri-error-warning-line text-red-500 text-3xl" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground-950 mb-2">Erreur de connexion</h2>
              <p className="text-foreground-500 mb-4 max-w-md mx-auto">Impossible de charger les données depuis Supabase. Les données mock sont utilisées.</p>
              <button
                onClick={refetch}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground-950 text-white text-sm font-bold cursor-pointer hover:bg-foreground-800 transition-all whitespace-nowrap"
              >
                <i className="ri-refresh-line" />
                Réessayer
              </button>
            </div>
          </section>
        )}

        {/* Content */}
        {!loading && !error && health && (
          <>

        {/* === TAB: OVERVIEW === */}
        {activeTab === 'overview' && (
          <>
            {/* Health Overview */}
            <section className="py-8 sm:py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* System Health Banner */}
                <div className={`rounded-3xl p-6 sm:p-8 mb-8 text-center ${
                  health.globalScore >= 7 ? 'bg-gradient-to-r from-emerald-900/20 via-foreground-950 to-emerald-900/20 border border-emerald-500/20' :
                  health.globalScore >= 5 ? 'bg-gradient-to-r from-amber-900/20 via-foreground-950 to-amber-900/20 border border-amber-500/20' :
                  'bg-gradient-to-r from-red-900/20 via-foreground-950 to-red-900/20 border border-red-500/20'
                }`}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-4">
                    <i className="ri-heart-pulse-line text-emerald-400 text-sm" />
                    <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Système KOS — Santé Globale</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                      <span className="block text-6xl font-bold font-heading text-white">{health.globalScore.toFixed(1)}</span>
                      <span className="text-sm text-gray-400">Score Global /10</span>
                    </div>
                    <div className="hidden sm:block w-px h-16 bg-white/20" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: 'CPU Global', value: `${health.globalCpuUsage}%`, icon: 'ri-cpu-line', color: health.globalCpuUsage > 60 ? '#c2410c' : '#86BC25' },
                        { label: 'Mémoire', value: `${health.globalMemoryUsage}%`, icon: 'ri-database-2-line', color: health.globalMemoryUsage > 60 ? '#c2410c' : '#86BC25' },
                        { label: 'Req/24h', value: `${(health.totalQueries24h / 1000).toFixed(1)}K`, icon: 'ri-arrow-left-right-line', color: '#e8c547' },
                        { label: 'Temps réponse', value: `${health.avgResponseTime}ms`, icon: 'ri-timer-line', color: health.avgResponseTime > 300 ? '#e8c547' : '#86BC25' },
                      ].map((metric, i) => (
                        <div key={i} className="text-center">
                          <i className={`${metric.icon} text-xl mb-1 block`} style={{ color: metric.color }} />
                          <span className="block text-2xl font-bold text-white font-heading">{metric.value}</span>
                          <span className="text-xs text-gray-400">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {health.healthyEngines} moteurs sains
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {health.degradedEngines} dégradés
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {health.criticalEngines} critiques
                    </span>
                    <span className="text-gray-400">
                      Auto-deploy : {health.autoDeployEnabled}/{health.totalAgents} agents
                    </span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
                  {[
                    { label: 'Total Agents', value: String(health.totalAgents), icon: 'ri-robot-line', color: '#4F46E5' },
                    { label: 'Activés', value: String(health.activeAgents), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
                    { label: 'Partiels', value: String(health.partialAgents), icon: 'ri-time-line', color: '#E8C547' },
                    { label: 'GAPs', value: String(health.gapAgents), icon: 'ri-error-warning-line', color: '#C2410C' },
                    { label: 'Moteurs', value: String(health.totalEngines), icon: 'ri-cpu-line', color: '#0D7B5F' },
                    { label: 'Alertes actives', value: String(health.alertsActive), icon: 'ri-alert-line', color: '#C05A3A' },
                    { label: 'Critiques', value: String(health.alertsCritical), icon: 'ri-close-circle-line', color: '#8B3040' },
                    { label: 'Score cible', value: String(health.targetScore), icon: 'ri-flag-line', color: '#9B7B2C' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                      </div>
                      <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                      <span className="text-[10px] text-foreground-400">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* 8 Engines Health Grid */}
                <div className="text-center mb-6">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                    8 Moteurs KOS — État des Ressources
                  </h2>
                  <p className="text-foreground-600">CPU, Mémoire, Agents actifs, Dernier scan.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {KOS_ENGINES.map((engine) => {
                    const engStatus = getEngineStatusBadge(engine.status);
                    const cpuColor = engine.cpuUsage > 60 ? '#c2410c' : engine.cpuUsage > 40 ? '#e8c547' : '#86BC25';
                    const memColor = engine.memoryUsage > 60 ? '#c2410c' : engine.memoryUsage > 40 ? '#e8c547' : '#86BC25';
                    const actRatio = engine.activeAgents / engine.agentsCount;
                    return (
                      <a
                        key={engine.id}
                        href={engine.path}
                        className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all cursor-pointer block"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                              <i className={`${engine.icon} text-sm`} style={{ color: engine.color }} />
                            </div>
                            <h3 className="text-sm font-bold text-foreground-950 font-heading truncate max-w-[160px]">{engine.name}</h3>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${engStatus.bg} ${engStatus.border} ${engStatus.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${engStatus.dot}`} />
                            {engStatus.label}
                          </span>
                        </div>

                        <div className="space-y-3 mb-3">
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-foreground-400">CPU</span>
                              <span className="font-bold" style={{ color: cpuColor }}>{engine.cpuUsage}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${engine.cpuUsage}%`, backgroundColor: cpuColor }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-foreground-400">Mémoire</span>
                              <span className="font-bold" style={{ color: memColor }}>{engine.memoryUsage}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${engine.memoryUsage}%`, backgroundColor: memColor }} />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground-500">
                            <i className="ri-robot-line mr-1" />
                            {engine.activeAgents}/{engine.agentsCount} agents
                          </span>
                          <span className="text-foreground-400">
                            <i className="ri-time-line mr-1" />
                            {new Date(engine.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-background-100">
                          <div className="flex gap-1">
                            {Array.from({ length: engine.agentsCount }).map((_, i) => {
                              const isActive = i < engine.activeAgents;
                              const isPartial = i >= engine.activeAgents && i < engine.activeAgents + engine.partialAgents;
                              return (
                                <div
                                  key={i}
                                  className={`flex-1 h-1 rounded-full ${isActive ? 'bg-emerald-500' : isPartial ? 'bg-amber-400' : 'bg-red-400'}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Top Alerts */}
                <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-background-100 flex items-center justify-between">
                    <h3 className="font-heading text-base font-bold text-foreground-950 flex items-center gap-2">
                      <i className="ri-alert-line text-red-500" />
                      Alertes Critiques Actives ({health.alertsCritical})
                    </h3>
                    <a href="/kos-resource-command-center" className="text-xs font-bold text-foreground-500 hover:text-foreground-800 cursor-pointer">
                      Voir toutes les alertes ({health.alertsActive})
                    </a>
                  </div>
                  <div className="p-5 space-y-2">
                    {KOS_UNIFIED_AGENTS.flatMap((a) => a.alerts.filter((al) => al.severity === 'critical').map((al) => ({ ...al, agentName: a.name, agentColor: a.color, engineName: a.engineName })))
                      .slice(0, 6)
                      .map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/40 border border-red-100">
                          <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-error-warning-fill text-red-600 text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-xs font-bold text-red-800">{alert.agentName}</span>
                              <span className="text-[10px] text-red-400">{alert.engineName}</span>
                            </div>
                            <p className="text-xs text-red-700 leading-relaxed">{alert.message}</p>
                            <span className="text-[10px] text-red-400 mt-1 block">{new Date(alert.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* === TAB: AGENTS === */}
        {activeTab === 'agents' && (
          <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-1">
                    Registre Unifié — 48 Agents KOS
                  </h2>
                  <p className="text-foreground-600 text-sm">Filtrer par statut, moteur. Vue complète de l'écosystème.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>Tous (48)</button>
                  <button onClick={() => setStatusFilter('active')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'active' ? 'bg-emerald-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-emerald-200'}`}>Activés ({health.activeAgents})</button>
                  <button onClick={() => setStatusFilter('partial')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'partial' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-amber-200'}`}>Partiels ({health.partialAgents})</button>
                  <button onClick={() => setStatusFilter('gap')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${statusFilter === 'gap' ? 'bg-red-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-red-200'}`}>GAPs ({health.gapAgents})</button>
                  <select
                    value={engineFilter}
                    onChange={(e) => setEngineFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-background-200 text-foreground-600 cursor-pointer"
                  >
                    {engineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredAgents.map((agent) => {
                  const badge = getStatusBadge(agent.status);
                  const scoreColor = agent.score >= 8 ? '#86BC25' : agent.score >= 6 ? '#e8c547' : '#c2410c';
                  const cpuColor = agent.resourceUsage.cpu > 25 ? '#c2410c' : agent.resourceUsage.cpu > 15 ? '#e8c547' : '#86BC25';
                  return (
                    <div
                      key={agent.id}
                      className={`rounded-xl border p-4 transition-all hover:shadow-md ${
                        agent.status === 'active' ? 'border-emerald-100 bg-emerald-50/20' :
                        agent.status === 'partial' ? 'border-amber-100 bg-amber-50/20' :
                        'border-red-100 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                          <i className={`${agent.icon} text-sm`} style={{ color: agent.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-foreground-950 truncate">{agent.name}</h4>
                          <p className="text-[10px] text-foreground-400 truncate">{agent.engineName}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                          <span className={`w-1 h-1 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-foreground-500 leading-relaxed line-clamp-2 mb-2">{agent.mission}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1">
                          <span className="text-sm font-bold font-heading" style={{ color: scoreColor }}>{agent.score.toFixed(1)}</span>
                          <span className="text-[10px] text-foreground-400">/10</span>
                        </span>
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: cpuColor }}>
                          <i className="ri-cpu-line text-[10px]" />
                          {agent.resourceUsage.cpu}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-foreground-400 pt-2 border-t border-background-100">
                        <span className={`flex items-center gap-1 ${agent.autoDeploy ? 'text-emerald-600' : 'text-foreground-300'}`}>
                          <i className={`${agent.autoDeploy ? 'ri-refresh-fill' : 'ri-refresh-line'} text-xs`} />
                          {agent.autoDeploy ? 'Auto' : 'Manuel'}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-time-line text-xs" />
                          {Math.round(agent.resourceUsage.uptime)}%
                        </span>
                        <span className="flex items-center gap-1 ml-auto">
                          <i className="ri-alert-line text-xs" style={{ color: agent.alerts.length > 0 ? '#c2410c' : '#ccc' }} />
                          {agent.alerts.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredAgents.length === 0 && (
                <div className="text-center py-16">
                  <i className="ri-inbox-line text-5xl text-foreground-200 mb-4 block" />
                  <p className="text-foreground-400">Aucun agent ne correspond aux filtres.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* === TAB: ENGINES === */}
        {activeTab === 'engines' && (
          <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Les 8 Moteurs KOS — Diagnostic Ressources
                </h2>
                <p className="text-foreground-600">CPU, Mémoire, Queries, Uptime et ratio d'activation par moteur.</p>
              </div>

              <div className="space-y-5">
                {KOS_ENGINES.map((engine) => {
                  const engStatus = getEngineStatusBadge(engine.status);
                  const agentsInEngine = KOS_UNIFIED_AGENTS.filter((a) => a.engine === engine.id);
                  return (
                    <div key={engine.id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-72 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                                <i className={`${engine.icon} text-lg`} style={{ color: engine.color }} />
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-foreground-950 font-heading">{engine.name}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${engStatus.bg} ${engStatus.border} ${engStatus.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${engStatus.dot}`} />
                                  {engStatus.label}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2.5">
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-foreground-400">CPU</span><span className="font-bold text-foreground-700">{engine.cpuUsage}%</span></div>
                                <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${engine.cpuUsage}%`, backgroundColor: engine.cpuUsage > 60 ? '#c2410c' : engine.cpuUsage > 40 ? '#e8c547' : '#86BC25' }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1"><span className="text-foreground-400">Mémoire</span><span className="font-bold text-foreground-700">{engine.memoryUsage}%</span></div>
                                <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${engine.memoryUsage}%`, backgroundColor: engine.memoryUsage > 60 ? '#c2410c' : engine.memoryUsage > 40 ? '#e8c547' : '#86BC25' }} />
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-foreground-500 pt-2">
                                <span className="flex items-center gap-1"><i className="ri-robot-line" />{engine.activeAgents}/{engine.agentsCount} agents</span>
                                <span className="flex items-center gap-1"><i className="ri-time-line" />{new Date(engine.lastScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                              </div>
                            </div>
                            <a
                              href={engine.path}
                              className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-foreground-600 hover:text-foreground-900 cursor-pointer transition-colors"
                            >
                              <i className="ri-external-link-line" />
                              Ouvrir le dashboard
                            </a>
                          </div>

                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Agents dans ce moteur</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                              {agentsInEngine.map((agent) => {
                                const badge = getStatusBadge(agent.status);
                                return (
                                  <div key={agent.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-background-50 border border-background-100">
                                    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                                      <i className={`${agent.icon} text-[10px]`} style={{ color: agent.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs font-medium text-foreground-700 truncate block">{agent.name}</span>
                                    </div>
                                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                                      <span className={`w-1 h-1 rounded-full ${badge.dot}`} />
                                      {badge.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* === TAB: OPTIMIZATION === */}
        {activeTab === 'optimization' && (
          <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                  Optimisations Recommandées
                </h2>
                <p className="text-foreground-600">{RESOURCE_OPTIMIZATIONS.length} actions d'optimisation identifiées. Cliquez pour voir les détails.</p>
              </div>

              <div className="space-y-4">
                {RESOURCE_OPTIMIZATIONS.map((opt) => {
                  const impact = getImpactBadge(opt.impact);
                  const isExpanded = expandedOpt === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`rounded-2xl border transition-all duration-300 ${
                        isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedOpt(isExpanded ? null : opt.id)}
                        className="w-full p-5 text-left cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${opt.color}15` }}>
                            <i className={`${opt.icon} text-lg`} style={{ color: opt.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-sm font-bold text-foreground-950">{opt.title}</h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${impact.bg} ${impact.border} ${impact.text}`}>
                                <span className={`w-1 h-1 rounded-full ${impact.dot}`} />
                                {impact.label}
                              </span>
                            </div>
                            <p className="text-xs text-foreground-500 line-clamp-2">{opt.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="text-emerald-600 font-bold">{opt.estimatedGain}</span>
                              <span className="text-foreground-400">{opt.agentsAffected.length} agents concernés</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-2">
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                          </div>
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-background-200 pt-4">
                          <div className="mb-4">
                            <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Action recommandée</h5>
                            <p className="text-sm text-foreground-700 bg-background-50 rounded-lg p-3 border border-background-100">{opt.action}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Agents concernés</h5>
                            <div className="flex flex-wrap gap-2">
                              {opt.agentsAffected.map((agentId) => {
                                const agent = KOS_UNIFIED_AGENTS.find((a) => a.id === agentId);
                                if (!agent) return null;
                                const badge = getStatusBadge(agent.status);
                                return (
                                  <span key={agentId} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.border} ${badge.text}`}>
                                    <i className={`${agent.icon} text-[10px]`} />
                                    {agent.name}
                                  </span>
                                );
                              })}
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

        {/* === TAB: DEPLOYMENT === */}
        {activeTab === 'deployment' && (
          <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-1">
                    File de Déploiement
                  </h2>
                  <p className="text-foreground-600 text-sm">
                    {filteredDeployments.length} actions en attente. Cliquez pour appliquer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setDeploymentFilter('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${deploymentFilter === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600'}`}>
                    Toutes
                  </button>
                  <button onClick={() => setDeploymentFilter('critical')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${deploymentFilter === 'critical' ? 'bg-red-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-red-200'}`}>
                    Critiques
                  </button>
                  <button onClick={() => setDeploymentFilter('major')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${deploymentFilter === 'major' ? 'bg-amber-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-amber-200'}`}>
                    Majeures
                  </button>
                  <button onClick={() => setDeploymentFilter('minor')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${deploymentFilter === 'minor' ? 'bg-slate-600 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-slate-200'}`}>
                    Mineures
                  </button>
                </div>
              </div>

              {filteredDeployments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i className="ri-check-double-line text-emerald-500 text-3xl" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">File de déploiement vide</h3>
                  <p className="text-foreground-500">Toutes les actions ont été appliquées. Le système est à jour.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDeployments.map((action) => {
                    const priorityColor = action.priority === 'critical' ? '#C2410C' : action.priority === 'major' ? '#E8C547' : '#6B7280';
                    const priorityBg = action.priority === 'critical' ? 'bg-red-50 border-red-200' : action.priority === 'major' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200';
                    const priorityText = action.priority === 'critical' ? 'text-red-700' : action.priority === 'major' ? 'text-amber-700' : 'text-slate-600';
                    const actionLabel = action.action === 'activate' ? 'Activation' : action.action === 'optimize' ? 'Optimisation' : action.action === 'update' ? 'Mise à jour' : 'Patch';
                    const actionIcon = action.action === 'activate' ? 'ri-play-circle-line' : action.action === 'optimize' ? 'ri-speed-up-line' : action.action === 'update' ? 'ri-arrow-up-circle-line' : 'ri-tools-line';
                    return (
                      <div key={action.id} className="rounded-xl bg-white border border-background-200 p-4 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${priorityColor}15` }}>
                          <i className={`${actionIcon} text-lg`} style={{ color: priorityColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityBg} ${priorityText}`}>
                              {actionLabel}
                            </span>
                            <span className="text-sm font-bold text-foreground-950">{action.agentName}</span>
                          </div>
                          <p className="text-xs text-foreground-600 leading-relaxed">{action.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-foreground-400">
                            <span><i className="ri-time-line mr-1" />{action.estimatedTime}</span>
                            {action.autoApplicable && (
                              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                <i className="ri-robot-line" />Auto-applicable
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => applyAction(action.id)}
                          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap"
                          style={{ backgroundColor: `${priorityColor}`, color: '#fff' }}
                        >
                          <i className="ri-check-line" />
                          Appliquer
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Applied Actions History */}
              {appliedActions.size > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-check-double-line text-emerald-500" />
                    Actions Appliquées ({appliedActions.size})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DEPLOYMENT_ACTIONS.filter((a) => appliedActions.has(a.id)).map((action) => (
                      <div key={action.id} className="rounded-xl bg-emerald-50/30 border border-emerald-100 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-checkbox-circle-fill text-emerald-600 text-sm" />
                          <span className="text-sm font-bold text-emerald-800">{action.agentName}</span>
                        </div>
                        <p className="text-xs text-emerald-700">{action.action === 'activate' ? '✅ Activé' : action.action === 'optimize' ? '⚡ Optimisé' : action.action === 'update' ? '🔄 Mis à jour' : '🔧 Patché'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cross-link to all KOS Engines */}
        <section className="py-12 sm:py-16 bg-white border-t border-background-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                Écosystème KOS — Accès Rapide
              </h2>
              <p className="text-foreground-600">Les 8 moteurs + Resource Command Center.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ...KOS_ENGINES,
                { id: 'task-orchestrator', name: 'Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-cpu-line', color: '#4F46E5' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.path}
                  className={`rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block ${
                    link.id === 'resource-center' ? 'ring-2 ring-emerald-400 bg-emerald-50/40' : ''
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                    <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                  </div>
                  <span className="text-sm font-bold text-foreground-800">{link.name}</span>
                  {link.id === 'resource-center' && (
                    <span className="block text-[10px] text-emerald-600 font-bold mt-1">Vous êtes ici</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

          </>
        )}

    </KOSHubLayout>
  );
}