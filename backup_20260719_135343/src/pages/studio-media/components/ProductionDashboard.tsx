import { useState, useMemo } from 'react';
import {
  productionHistory,
  productionKPIs,
  agentPerformance,
  frameworkDistribution,
  type ProductionEntry,
} from '@/mocks/studioMediaAgents';

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string; dot: string }> = {
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Terminé', dot: 'bg-emerald-500' },
  in_progress: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500 animate-pulse' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Échoué', dot: 'bg-red-500' },
  queued: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'En attente', dot: 'bg-blue-500' },
};

const AGENT_COLORS: Record<string, { card: string; border: string; icon: string }> = {
  'community-manager': { card: 'border-l-accent-500', border: 'border-accent-200/70', icon: 'text-accent-500' },
  'designer-infographiste': { card: 'border-l-primary-500', border: 'border-primary-200/70', icon: 'text-primary-500' },
  'llm-content-generator': { card: 'border-l-secondary-500', border: 'border-secondary-200/70', icon: 'text-secondary-500' },
  'studio-media-orchestrator': { card: 'border-l-foreground-500', border: 'border-foreground-200/70', icon: 'text-foreground-500' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function ProductionDashboard() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in_progress' | 'failed' | 'queued'>('all');
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [expandedProd, setExpandedProd] = useState<string | null>(null);

  const filteredHistory = useMemo(() => {
    return productionHistory.filter((p) => {
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (filterAgent !== 'all' && p.agent_id !== filterAgent) return false;
      return true;
    });
  }, [filterStatus, filterAgent]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: productionHistory.length };
    productionHistory.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, []);

  const agentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: productionHistory.length };
    productionHistory.forEach((p) => {
      counts[p.agent_id] = (counts[p.agent_id] || 0) + 1;
    });
    return counts;
  }, []);

  const uniqueAgents = useMemo(() => {
    const seen = new Set<string>();
    return productionHistory.filter((p) => {
      if (seen.has(p.agent_id)) return false;
      seen.add(p.agent_id);
      return true;
    });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200/70 mb-6">
            <i className="ri-dashboard-3-line text-secondary-600 text-sm" />
            <span className="text-sm font-semibold text-secondary-700 uppercase tracking-wider">
              Tableau de Bord des Productions
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            Historique, Statuts & KPIs
          </h2>
          <p className="text-body-md text-foreground-600 max-w-3xl mx-auto leading-relaxed">
            Suivez en temps réel toutes les productions générées par les agents IA KOS Automaton. Historique complet, statuts de génération, scores de qualité et métriques de performance.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Productions Totales', value: productionKPIs.totalProductions, icon: 'ri-stack-line', color: 'primary' },
            { label: 'Cette Semaine', value: productionKPIs.productionsThisWeek, icon: 'ri-calendar-2-line', color: 'accent' },
            { label: "Aujourd'hui", value: productionKPIs.productionsToday, icon: 'ri-timer-line', color: 'secondary' },
            { label: 'Score Qualité Moyen', value: `${productionKPIs.averageQualityScore}%`, icon: 'ri-star-line', color: 'primary' },
            { label: 'Taux de Succès', value: `${productionKPIs.successRate}%`, icon: 'ri-check-double-line', color: 'accent' },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-2xl bg-white border border-background-200/70 p-5 hover:-translate-y-0.5 transition-all cursor-default`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-${kpi.color}-100`}>
                  <i className={`${kpi.icon} text-lg text-${kpi.color}-500`} />
                </div>
                <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">{kpi.label}</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold font-heading text-foreground-950">{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="rounded-2xl bg-white border border-background-200/70 p-5 text-center">
            <span className="text-xs text-foreground-400 uppercase tracking-wider">Temps Moyen</span>
            <div className="text-2xl font-bold font-heading text-foreground-950 mt-1">{productionKPIs.averageGenerationTime}</div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200/70 p-5 text-center">
            <span className="text-xs text-foreground-400 uppercase tracking-wider">Agent le Plus Actif</span>
            <div className="text-lg font-bold font-heading text-foreground-950 mt-1">{productionKPIs.mostUsedAgent}</div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200/70 p-5 text-center">
            <span className="text-xs text-foreground-400 uppercase tracking-wider">Framework Dominant</span>
            <div className="text-lg font-bold font-heading text-foreground-950 mt-1">{productionKPIs.mostUsedFramework}</div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200/70 p-5 text-center">
            <span className="text-xs text-foreground-400 uppercase tracking-wider">Mots Générés</span>
            <div className="text-2xl font-bold font-heading text-foreground-950 mt-1">{productionKPIs.totalWordsGenerated.toLocaleString()}</div>
          </div>
        </div>

        {/* Agent Performance Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {agentPerformance.map((agent) => (
            <div key={agent.agent} className={`rounded-2xl bg-white border border-background-200/70 p-5 hover:-translate-y-0.5 transition-all cursor-default`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-${agent.color}-100`}>
                  <i className={`${agent.icon} text-lg text-${agent.color}-500`} />
                </div>
                <span className="text-xs font-bold text-foreground-800 leading-tight">{agent.agent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-400">{agent.productions} productions</span>
                <span className={`text-sm font-bold font-heading text-${agent.color}-600`}>{agent.quality}% qualité</span>
              </div>
            </div>
          ))}
        </div>

        {/* Framework Distribution Bar */}
        <div className="rounded-2xl bg-white border border-background-200/70 p-6 mb-10">
          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-bar-chart-grouped-line text-primary-500" />
            Distribution par Framework
          </h3>
          <div className="space-y-3">
            {frameworkDistribution.map((fw) => (
              <div key={fw.framework} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-foreground-600 w-32 whitespace-nowrap">{fw.framework}</span>
                <div className="flex-1 h-7 bg-background-100 rounded-full relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary-500 rounded-full transition-all"
                    style={{ width: `${fw.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground-500 w-10 text-right">{fw.count}</span>
                <span className="text-xs text-foreground-400 w-10 text-right">{fw.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Statut :</span>
            {(['all', 'completed', 'in_progress', 'queued', 'failed'] as const).map((s) => {
              const cfg = s === 'all' ? { bg: 'bg-foreground-950', text: 'text-background-50' } : STATUS_CONFIG[s];
              const count = statusCounts[s] || 0;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                    filterStatus === s
                      ? s === 'all' ? 'bg-foreground-950 text-background-50' : `${cfg.bg} ${cfg.text}`
                      : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                  }`}
                >
                  {s === 'all' ? 'Tous' : cfg.label}
                  <span className="ml-1 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Agent :</span>
            <button
              onClick={() => setFilterAgent('all')}
              className={`px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                filterAgent === 'all' ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
              }`}
            >
              Tous ({agentCounts.all})
            </button>
            {uniqueAgents.map((agent) => (
              <button
                key={agent.agent_id}
                onClick={() => setFilterAgent(agent.agent_id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  filterAgent === agent.agent_id
                    ? `${AGENT_COLORS[agent.agent_id]?.icon || 'text-primary-500'} bg-${AGENT_COLORS[agent.agent_id]?.icon.includes('accent') ? 'accent' : AGENT_COLORS[agent.agent_id]?.icon.includes('secondary') ? 'secondary' : 'primary'}-50`
                    : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                }`}
              >
                <i className={`${agent.agent_icon} text-sm`} />
                {agent.agent_name}
                <span className="opacity-60">({agentCounts[agent.agent_id] || 0})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Production History Table */}
        <div className="rounded-2xl bg-white border border-background-200/70 overflow-hidden">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background-100 border-b border-background-200/70 text-xs font-bold text-foreground-400 uppercase tracking-wider">
            <div className="col-span-3">Production</div>
            <div className="col-span-2">Agent</div>
            <div className="col-span-2">Framework</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Statut</div>
            <div className="col-span-1">Sections</div>
            <div className="col-span-1">Score</div>
          </div>

          <div className="divide-y divide-background-200/70">
            {filteredHistory.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-background-100 mb-4">
                  <i className="ri-inbox-2-line text-2xl text-foreground-300" />
                </div>
                <p className="text-sm text-foreground-500">Aucune production trouvée pour ces filtres.</p>
              </div>
            )}

            {filteredHistory.map((prod) => {
              const statusCfg = STATUS_CONFIG[prod.status] || STATUS_CONFIG.completed;
              const agentCfg = AGENT_COLORS[prod.agent_id] || AGENT_COLORS['studio-media-orchestrator'];
              const isExpanded = expandedProd === prod.id;

              return (
                <div
                  key={prod.id}
                  className={`group cursor-pointer transition-colors hover:bg-background-50/80 border-l-4 ${agentCfg.card}`}
                  onClick={() => setExpandedProd(isExpanded ? null : prod.id)}
                >
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-5 items-center">
                    <div className="col-span-3 min-w-0">
                      <p className="text-sm font-bold text-foreground-900 truncate">{prod.topic}</p>
                      {prod.platform && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded">
                          <i className="ri-share-line text-[10px]" />
                          {prod.platform}
                        </span>
                      )}
                      {prod.format && (
                        <span className="inline-flex items-center gap-1 mt-1 ml-1 text-[10px] text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded">
                          <i className="ri-palette-line text-[10px]" />
                          {prod.format}
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <i className={`${prod.agent_icon} text-base ${agentCfg.icon}`} />
                      <span className="text-xs font-semibold text-foreground-700">{prod.agent_name}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs font-semibold text-foreground-500 bg-background-100 px-2 py-1 rounded-full whitespace-nowrap">
                        {prod.framework}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs text-foreground-500">{formatDate(prod.generated_at)}</span>
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-xs font-bold text-foreground-700">{prod.sections_count > 0 ? prod.sections_count : '—'}</span>
                    </div>
                    <div className="col-span-1">
                      {prod.quality_score > 0 ? (
                        <span className={`text-xs font-bold font-heading ${
                          prod.quality_score >= 90 ? 'text-emerald-600' : prod.quality_score >= 80 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {prod.quality_score}%
                        </span>
                      ) : (
                        <span className="text-xs text-foreground-400">—</span>
                      )}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-bold text-foreground-900 flex-1 min-w-0 mr-2 line-clamp-2">{prod.topic}</p>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${statusCfg.bg} ${statusCfg.text} flex-shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground-500">
                      <span className="flex items-center gap-1">
                        <i className={`${prod.agent_icon} text-sm ${agentCfg.icon}`} />
                        {prod.agent_name}
                      </span>
                      <span>·</span>
                      <span>{formatDate(prod.generated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold text-foreground-500 bg-background-100 px-2 py-0.5 rounded-full">{prod.framework}</span>
                      {prod.quality_score > 0 && (
                        <span className={`text-[10px] font-bold font-heading ${
                          prod.quality_score >= 90 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {prod.quality_score}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 pb-5 border-t border-background-200/70 animate-fade-in">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Agent ID</span>
                          <p className="text-xs font-mono text-foreground-600 mt-0.5">{prod.agent_id}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Production ID</span>
                          <p className="text-xs font-mono text-foreground-600 mt-0.5">{prod.id}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Durée</span>
                          <p className="text-xs text-foreground-600 mt-0.5">{prod.duration}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Sections</span>
                          <p className="text-xs text-foreground-600 mt-0.5">{prod.sections_count > 0 ? `${prod.sections_count} sections générées` : 'Non applicable'}</p>
                        </div>
                        {prod.originality_score && (
                          <div>
                            <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Score d'Originalité</span>
                            <p className={`text-xs font-bold font-heading mt-0.5 ${prod.originality_score >= 85 ? 'text-primary-600' : 'text-amber-600'}`}>
                              {prod.originality_score}/100
                            </p>
                          </div>
                        )}
                      </div>
                      {prod.status === 'completed' && (
                        <div className="mt-4 flex gap-2">
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-100 text-xs font-bold text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-eye-line text-sm" />
                            Voir le résultat
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-100 text-xs font-bold text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-file-copy-line text-sm" />
                            Dupliquer
                          </button>
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background-100 text-xs font-bold text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-download-line text-sm" />
                            Exporter
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-background-100 border-t border-background-200/70 flex items-center justify-between">
            <span className="text-xs text-foreground-500">
              Affichage de {filteredHistory.length} sur {productionHistory.length} productions
            </span>
            <span className="text-xs text-foreground-400">
              Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}



