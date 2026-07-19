import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { KOS_RUNTIME_DATA, runtimeComponent, eventType, agentRegistryEntry } from '@/mocks/runtime';

type TabId = 'overview' | 'components' | 'event-bus' | 'registry' | 'config' | 'infra';

function CircularGauge({ value, size = 56, strokeWidth = 5 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const getColor = (v: number) => {
    if (v >= 90) return 'var(--primary-500)';
    if (v >= 75) return 'var(--accent-500)';
    if (v >= 50) return 'var(--secondary-500)';
    return '#ef4444';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(var(--background-200) / 0.7)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor(value)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
      </svg>
      <span className="absolute text-xs font-semibold text-foreground-950">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string }> = {
    operational: { label: 'Opérationnel', classes: 'bg-primary-100 text-primary-700' },
    degraded: { label: 'Dégradé', classes: 'bg-accent-100 text-accent-700' },
    critical: { label: 'Critique', classes: 'bg-red-100 text-red-700' },
    planned: { label: 'Planifié', classes: 'bg-secondary-100 text-secondary-700' },
    running: { label: 'Actif', classes: 'bg-primary-100 text-primary-700' },
    idle: { label: 'Inactif', classes: 'bg-secondary-100 text-secondary-700' },
    error: { label: 'Erreur', classes: 'bg-red-100 text-red-700' },
    maintenance: { label: 'Maintenance', classes: 'bg-accent-100 text-accent-700' },
  };
  const s = map[status] || { label: status, classes: 'bg-background-200/70 text-foreground-600' };
  return <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${s.classes}`}>{s.label}</span>;
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <i className="ri-arrow-up-line text-primary-500 text-xs" />;
  if (trend === 'down') return <i className="ri-arrow-down-line text-red-500 text-xs" />;
  return <i className="ri-subtract-line text-foreground-400 text-xs" />;
}

function MetricStatusDot({ status }: { status: string }) {
  if (status === 'ok') return <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />;
  if (status === 'warning') return <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />;
  return <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />;
}

export default function runtimePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedComp, setExpandedComp] = useState<string | null>('RT-001');
  const data = KOS_RUNTIME_DATA;

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'components', label: 'Composants', icon: 'ri-stack-line' },
    { id: 'event-bus', label: 'Event Bus', icon: 'ri-exchange-line' },
    { id: 'registry', label: 'Agent Registry', icon: 'ri-database-2-line' },
    { id: 'config', label: 'Configuration', icon: 'ri-settings-3-line' },
    { id: 'infra', label: 'Infrastructure', icon: 'ri-server-line' },
  ];

  return (
    <hubLayout hubId={64} activeTab="Runtime" tabLabel="Bloc 4">
      <main id="main-content">
        {/* Header */}
        <header className="bg-background-100 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary-100 text-primary-700 uppercase tracking-wider">{data.bloc_id}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background-200/70 text-foreground-600">{data.version}</span>
                  <span className="text-xs text-foreground-500">{data.architecture_version}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground-950">{data.bloc_name}</h1>
                <p className="text-sm text-foreground-600 mt-2 max-w-2xl">{data.executive_summary}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <CircularGauge value={data.current_maturity} size={72} strokeWidth={6} />
                  <p className="text-xs text-foreground-500 mt-1">Maturité</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">{data.target_maturity}</div>
                  <p className="text-xs text-foreground-500 mt-1">Cible</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <section className="border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs text-foreground-600">
              <div className="flex items-center gap-1.5">
                <i className="ri-cpu-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.infrastructure_stats.total_edge_functions}</strong> Edge Functions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-robot-2-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.infrastructure_stats.total_agents}</strong> Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-database-line text-foreground-500" />
                <span><strong className="text-foreground-950">{data.infrastructure_stats.total_tables}</strong> Tables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-timer-line text-foreground-500" />
                <span>Latence : <strong className="text-foreground-950">{data.infrastructure_stats.avg_latency_ms}ms</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-check-double-line text-primary-500" />
                <span>Uptime 30j : <strong className="text-foreground-950">{data.infrastructure_stats.uptime_30d}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="ri-rocket-line text-foreground-500" />
                <span>Déploiements : <strong className="text-foreground-950">{data.infrastructure_stats.deployments_30d}/mois</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-background-200/70 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-foreground-500 hover:text-foreground-700'
                  }`}
                >
                  <i className={tab.icon} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'components' && <ComponentsTab components={data.components} expandedComp={expandedComp} setExpandedComp={setExpandedComp} />}
          {activeTab === 'event-bus' && <EventBusTab eventTypes={data.event_types} />}
          {activeTab === 'registry' && <RegistryTab agents={data.agent_registry} />}
          {activeTab === 'config' && <ConfigTab components={data.components} />}
          {activeTab === 'infra' && <InfraTab stats={data.infrastructure_stats} />}
        </section>

        {/* Footer */}
        <footer className="border-t border-background-200/70 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: 'Edge Functions', value: data.infrastructure_stats.total_edge_functions, icon: 'ri-cpu-line', color: 'text-primary-500' },
                { label: 'Agents IA', value: data.infrastructure_stats.total_agents, icon: 'ri-robot-2-line', color: 'text-accent-500' },
                { label: 'Tables DB', value: data.infrastructure_stats.total_tables, icon: 'ri-database-line', color: 'text-secondary-500' },
                { label: 'Uptime 30j', value: `${data.infrastructure_stats.uptime_30d}%`, icon: 'ri-check-double-line', color: 'text-primary-500' },
                { label: 'Déploiements', value: data.infrastructure_stats.deployments_30d, icon: 'ri-rocket-line', color: 'text-accent-500' },
                { label: 'Incidents', value: data.infrastructure_stats.incidents_30d, icon: 'ri-error-warning-line', color: 'text-secondary-500' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <i className={`${stat.icon} ${stat.color} text-lg`} />
                  <p className="text-lg font-bold text-foreground-950 mt-1">{stat.value}</p>
                  <p className="text-xs text-foreground-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </hubLayout>
  );
}

function OverviewTab({ data }: { data: typeof KOS_RUNTIME_DATA }) {
  return (
    <div className="space-y-5 pt-5">
      {/* Architecture Layers */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-3">Architecture en Couches</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['Layer 1 — Core Orchestration', 'Layer 2 — Communication', 'Layer 3 — Execution', 'Layer 4 — Observability'].map((layer) => {
            const comps = data.components.filter((c) => c.architecture_layer === layer);
            const avgHealth = Math.round(comps.reduce((s, c) => s + c.health_score, 0) / comps.length);
            return (
              <div key={layer} className="bg-background-100 border border-background-200/70 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground-500 uppercase tracking-wider">{layer}</span>
                  <CircularGauge value={avgHealth} size={36} strokeWidth={4} />
                </div>
                <div className="space-y-1.5">
                  {comps.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-xs">
                      <i className={`${c.icon} text-foreground-500 w-4 h-4 flex items-center justify-center`} />
                      <span className="text-foreground-700">{c.name}</span>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Components Health Grid */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-3">Health Score des Composants</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.components.map((comp) => (
            <div key={comp.id} className="bg-background-100 border border-background-200/70 rounded-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <i className={`${comp.icon} text-lg text-foreground-700`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground-950">{comp.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StatusBadge status={comp.status} />
                  <span className="text-xs text-foreground-500">Uptime {comp.uptime_30d}%</span>
                </div>
              </div>
              <CircularGauge value={comp.health_score} size={44} strokeWidth={4} />
            </div>
          ))}
        </div>
      </div>

      {/* Events Snapshot */}
      <div>
        <h3 className="text-sm font-semibold text-foreground-950 mb-3">Top 5 Événements (24h)</h3>
        <div className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
          <div className="divide-y divide-background-200/60">
            {data.event_types.slice(0, 5).map((ev) => (
              <div key={ev.name} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                <span className="font-mono text-foreground-700 w-32 flex-shrink-0">{ev.name}</span>
                <span className="text-foreground-500 w-24 flex-shrink-0">{ev.category}</span>
                <span className="text-foreground-950 font-semibold w-20 text-right flex-shrink-0">{ev.volume_24h.toLocaleString()}</span>
                <span className="text-foreground-500 w-20 text-right flex-shrink-0">{ev.avg_latency_ms}ms</span>
                <span className="text-foreground-400 ml-auto">{ev.schema_version}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentsTab({ components, expandedComp, setExpandedComp }: { components: runtimeComponent[]; expandedComp: string | null; setExpandedComp: (id: string | null) => void }) {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? components : components.filter((c) => c.category === filter);

  return (
    <div className="space-y-4 pt-5">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { key: 'all', label: 'Tous' },
          { key: 'orchestration', label: 'Orchestration' },
          { key: 'integration', label: 'Intégration' },
          { key: 'communication', label: 'Communication' },
          { key: 'execution', label: 'Exécution' },
          { key: 'registry', label: 'Registre' },
          { key: 'monitoring', label: 'Monitoring' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filter === f.key ? 'bg-primary-500 text-background-50' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Components List */}
      <div className="space-y-3">
        {filtered.map((comp) => (
          <div key={comp.id} className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedComp(expandedComp === comp.id ? null : comp.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-background-200/30 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-background-200/70 flex-shrink-0">
                <i className={`${comp.icon} text-lg text-foreground-700`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground-950">{comp.name}</span>
                  <StatusBadge status={comp.status} />
                </div>
                <p className="text-xs text-foreground-600 mt-0.5 line-clamp-1">{comp.description}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <CircularGauge value={comp.health_score} size={40} strokeWidth={4} />
                <i className={`${expandedComp === comp.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-foreground-500 text-sm`} />
              </div>
            </button>

            {expandedComp === comp.id && (
              <div className="px-4 pb-4 border-t border-background-200/70 pt-4 space-y-4">
                {/* Description */}
                <p className="text-sm text-foreground-700 leading-relaxed">{comp.description}</p>

                {/* Metrics Grid */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-2">Métriques</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {comp.metrics.map((m) => (
                      <div key={m.name} className="bg-background-50 border border-background-200/60 rounded-md p-2.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <MetricStatusDot status={m.status} />
                          <span className="text-xs text-foreground-500">{m.name}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-bold text-foreground-950">{m.value}</span>
                          <span className="text-xs text-foreground-500">{m.unit}</span>
                          <TrendIcon trend={m.trend} />
                        </div>
                        {m.target && m.target !== 'N/A' && (
                          <p className="text-xs text-foreground-400 mt-0.5">Cible: {m.target}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dependencies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Dépendances</h4>
                    <div className="flex flex-wrap gap-1">
                      {comp.dependencies.map((d) => (
                        <span key={d} className="text-xs px-2 py-0.5 rounded-md bg-background-200/70 text-foreground-600">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Dépendants</h4>
                    <div className="flex flex-wrap gap-1">
                      {comp.dependents.slice(0, 6).map((d) => (
                        <span key={d} className="text-xs px-2 py-0.5 rounded-md bg-accent-100/70 text-accent-700">{d}</span>
                      ))}
                      {comp.dependents.length > 6 && (
                        <span className="text-xs text-foreground-500">+{comp.dependents.length - 6} autres</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edge Functions */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Edge Functions</h4>
                  <div className="flex flex-wrap gap-1">
                    {comp.edge_functions.map((ef) => (
                      <span key={ef} className="text-xs px-2 py-0.5 rounded-md bg-secondary-100/80 text-secondary-700 font-mono">{ef}</span>
                    ))}
                  </div>
                </div>

                {/* Last Incident */}
                {comp.last_incident && (
                  <div className="flex items-start gap-2 bg-accent-100/50 border border-accent-200/60 rounded-md p-3">
                    <i className="ri-error-warning-line text-accent-500 text-sm mt-0.5" />
                    <p className="text-xs text-foreground-700">{comp.last_incident}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EventBusTab({ eventTypes }: { eventTypes: eventType[] }) {
  const [filterCat, setFilterCat] = useState<string>('all');

  const cats = [...new Set(eventTypes.map((e) => e.category))];
  const filtered = filterCat === 'all' ? eventTypes : eventTypes.filter((e) => e.category === filterCat);
  const totalVolume = filtered.reduce((s, e) => s + e.volume_24h, 0);
  const avgLatency = Math.round(filtered.reduce((s, e) => s + e.avg_latency_ms, 0) / filtered.length);

  return (
    <div className="space-y-5 pt-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Types d\'événements', value: eventTypes.length, icon: 'ri-exchange-line', color: 'text-primary-500' },
          { label: 'Volume 24h', value: `${(totalVolume / 1000).toFixed(1)}K`, icon: 'ri-bar-chart-line', color: 'text-accent-500' },
          { label: 'Latence moyenne', value: `${avgLatency}ms`, icon: 'ri-timer-line', color: 'text-secondary-500' },
          { label: 'Catégories', value: cats.length, icon: 'ri-folder-line', color: 'text-foreground-500' },
        ].map((s, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`} />
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setFilterCat('all')}
          className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${filterCat === 'all' ? 'bg-primary-500 text-background-50' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'}`}
        >
          Toutes
        </button>
        {cats.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCat(cat)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${filterCat === cat ? 'bg-primary-500 text-background-50' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Types Table */}
      <div className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden">
        <div className="divide-y divide-background-200/60">
          <div className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-foreground-500 uppercase tracking-wider bg-background-200/30">
            <span className="w-40 flex-shrink-0">Événement</span>
            <span className="w-24 flex-shrink-0">Catégorie</span>
            <span className="w-28 flex-shrink-0">Producteurs</span>
            <span className="w-40 flex-shrink-0">Consommateurs</span>
            <span className="w-24 text-right flex-shrink-0">Volume/24h</span>
            <span className="w-20 text-right flex-shrink-0">Latence</span>
            <span className="w-16 text-right flex-shrink-0">Schema</span>
          </div>
          {filtered.map((ev) => (
            <div key={ev.name} className="flex items-center gap-3 px-4 py-2.5 text-xs hover:bg-background-200/20">
              <span className="w-40 flex-shrink-0 font-mono text-foreground-700">{ev.name}</span>
              <span className="w-24 flex-shrink-0 text-foreground-600">{ev.category}</span>
              <span className="w-28 flex-shrink-0 text-foreground-500 truncate">{ev.producers.join(', ')}</span>
              <span className="w-40 flex-shrink-0 text-foreground-500 truncate">{ev.consumers.join(', ')}</span>
              <span className="w-24 text-right flex-shrink-0 text-foreground-950 font-semibold">{ev.volume_24h.toLocaleString()}</span>
              <span className="w-20 text-right flex-shrink-0 text-foreground-600">{ev.avg_latency_ms}ms</span>
              <span className="w-16 text-right flex-shrink-0 text-foreground-400">{ev.schema_version}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegistryTab({ agents }: { agents: agentRegistryEntry[] }) {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statuses = [...new Set(agents.map((a) => a.status))];
  const filtered = statusFilter === 'all' ? agents : agents.filter((a) => a.status === statusFilter);
  const running = agents.filter((a) => a.status === 'running').length;

  return (
    <div className="space-y-5 pt-5">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Agents enregistrés', value: agents.length, icon: 'ri-robot-2-line', color: 'text-primary-500' },
          { label: 'Actifs', value: running, icon: 'ri-play-circle-line', color: 'text-accent-500' },
          { label: 'Uptime moyen', value: `${Math.round(agents.reduce((s, a) => s + a.uptime_hours, 0) / agents.length)}h`, icon: 'ri-timer-line', color: 'text-secondary-500' },
          { label: 'Mémoire totale', value: `${agents.reduce((s, a) => s + a.memory_mb, 0)} MB`, icon: 'ri-cpu-line', color: 'text-foreground-500' },
        ].map((s, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-3 text-center">
            <i className={`${s.icon} ${s.color} text-lg`} />
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-1.5">
        <button type="button" onClick={() => setStatusFilter('all')} className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${statusFilter === 'all' ? 'bg-primary-500 text-background-50' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'}`}>Tous</button>
        {statuses.map((s) => (
          <button key={s} type="button" onClick={() => setStatusFilter(s)} className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${statusFilter === s ? 'bg-primary-500 text-background-50' : 'bg-background-200/70 text-foreground-600 hover:bg-background-300/60'}`}>
            {s === 'running' ? 'Actif' : s === 'idle' ? 'Inactif' : s === 'error' ? 'Erreur' : 'Maintenance'}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((agent) => (
          <div key={agent.agent_id} className="bg-background-100 border border-background-200/70 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-foreground-500">{agent.agent_id}</span>
                <StatusBadge status={agent.status} />
              </div>
              <span className="text-xs text-foreground-400">{agent.version}</span>
            </div>
            <p className="text-sm font-semibold text-foreground-950 mb-2">{agent.agent_name}</p>
            <div className="space-y-1.5 text-xs text-foreground-600">
              <div className="flex justify-between">
                <span>Runtime</span>
                <span className="text-foreground-700">{agent.runtime_env}</span>
              </div>
              <div className="flex justify-between">
                <span>Mémoire</span>
                <span className="text-foreground-700">{agent.memory_mb} MB</span>
              </div>
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="text-foreground-700">{agent.uptime_hours}h</span>
              </div>
              <div className="flex justify-between">
                <span>Dernier déploiement</span>
                <span className="text-foreground-700">{agent.last_deploy}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-background-200/60">
              <p className="text-xs font-semibold text-foreground-500 mb-1.5">Health Checks</p>
              <div className="space-y-1">
                {agent.health_checks.map((hc) => (
                  <div key={hc.name} className="flex items-center justify-between text-xs">
                    <span className="text-foreground-600">{hc.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground-400">{hc.last_check}</span>
                      <span className={`font-medium ${hc.status === 'OK' ? 'text-primary-500' : hc.status === 'WARN' ? 'text-accent-500' : 'text-red-500'}`}>{hc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfigTab({ components }: { components: runtimeComponent[] }) {
  return (
    <div className="space-y-4 pt-5">
      <p className="text-sm text-foreground-600">Configuration runtime de chaque composant — scaling, timeouts, retry policies et circuit breakers.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {components.map((comp) => (
          <div key={comp.id} className="bg-background-100 border border-background-200/70 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background-200/70">
                <i className={`${comp.icon} text-foreground-700 text-sm`} />
              </div>
              <span className="text-sm font-semibold text-foreground-950">{comp.name}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-background-200/40">
                <span className="text-foreground-500">Scaling Policy</span>
                <span className="text-foreground-700 font-medium text-right max-w-[60%]">{comp.config.scaling_policy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-background-200/40">
                <span className="text-foreground-500">Timeout</span>
                <span className="text-foreground-700 font-medium">{comp.config.timeout_ms.toLocaleString()}ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-background-200/40">
                <span className="text-foreground-500">Retry Policy</span>
                <span className="text-foreground-700 font-medium text-right max-w-[55%]">{comp.config.retry_policy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-background-200/40">
                <span className="text-foreground-500">Circuit Breaker</span>
                <span className="text-foreground-700 font-medium text-right max-w-[55%]">{comp.config.circuit_breaker}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-foreground-500">Rate Limit</span>
                <span className="text-foreground-700 font-medium">{comp.config.rate_limit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfraTab({ stats }: { stats: typeof KOS_RUNTIME_DATA.infrastructure_stats }) {
  return (
    <div className="space-y-5 pt-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Edge Functions', value: stats.total_edge_functions, icon: 'ri-cpu-line', color: 'text-primary-500', sub: 'Deno Deploy' },
          { label: 'Agents IA', value: stats.total_agents, icon: 'ri-robot-2-line', color: 'text-accent-500', sub: 'Runtime actif' },
          { label: 'Tables DB', value: stats.total_tables, icon: 'ri-database-line', color: 'text-secondary-500', sub: 'PostgreSQL Supabase' },
          { label: 'Uptime 30j', value: `${stats.uptime_30d}%`, icon: 'ri-check-double-line', color: 'text-primary-500', sub: 'SLA respecté' },
        ].map((s, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-4 text-center">
            <i className={`${s.icon} ${s.color} text-xl`} />
            <p className="text-xl font-bold text-foreground-950 mt-2">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
            <p className="text-xs text-foreground-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Événements/24h', value: `${(stats.events_24h / 1000).toFixed(1)}K`, icon: 'ri-exchange-line', color: 'text-foreground-500' },
          { label: 'Latence moyenne', value: `${stats.avg_latency_ms}ms`, icon: 'ri-timer-line', color: 'text-foreground-500' },
          { label: 'Déploiements/mois', value: stats.deployments_30d, icon: 'ri-rocket-line', color: 'text-foreground-500' },
          { label: 'Incidents/mois', value: stats.incidents_30d, icon: 'ri-error-warning-line', color: 'text-foreground-500' },
        ].map((s, i) => (
          <div key={i} className="bg-background-100 border border-background-200/70 rounded-lg p-4 text-center">
            <i className={`${s.icon} ${s.color} text-lg`} />
            <p className="text-lg font-bold text-foreground-950 mt-1">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-background-100 border border-background-200/70 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground-950 mb-3">Stack Technique</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          {[
            { layer: 'Frontend', tech: 'React 19 + TailwindCSS + TypeScript', icon: 'ri-reactjs-line' },
            { layer: 'Backend', tech: 'Supabase Edge Functions (Deno)', icon: 'ri-server-line' },
            { layer: 'Database', tech: 'PostgreSQL 15 + Supabase', icon: 'ri-database-2-line' },
            { layer: 'Messaging', tech: 'Supabase Realtime + Webhooks', icon: 'ri-exchange-line' },
            { layer: 'Auth', tech: 'Supabase Auth + JWT + RBAC', icon: 'ri-shield-check-line' },
            { layer: 'Cache', tech: 'Edge Cache + Browser Cache', icon: 'ri-hard-drive-2-line' },
            { layer: 'CI/CD', tech: 'GitHub + Supabase CLI', icon: 'ri-git-branch-line' },
            { layer: 'Monitoring', tech: 'Edge Functions Logs + Custom Dashboards', icon: 'ri-radar-line' },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <i className={`${t.icon} text-foreground-500 mt-0.5`} />
              <div>
                <p className="font-semibold text-foreground-950">{t.layer}</p>
                <p className="text-foreground-500">{t.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



