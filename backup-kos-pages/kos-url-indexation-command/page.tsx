import { useState } from "react";
import { useKOSUrlIndexationCommand } from "@/hooks/useKOSUrlIndexationCommand";
import hubLayout from "@/components/feature/hubLayout";

export default function urlIndexationCommandPage() {
  const {
    overview,
    categories,
    causes,
    excludedUrls,
    actionPlan,
    progress,
    sitemaps,
    topIndexed,
    gscQueries,
    loading,
    error,
    dataSource,
    executingActionId,
    executionLog,
    executeAction,
    executeAllActions,
    forceIndexUrl,
    forceIndexAll,
    refreshData,
  } = useKOSUrlIndexationCommand();

  const [activeTab, setActiveTab] = useState<"overview" | "urls" | "actions" | "sitemaps" | "logs">("overview");
  const [causeFilter, setCauseFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showIndexed, setShowIndexed] = useState(false);

  const filteredUrls = excludedUrls.filter(u => {
    if (!showIndexed && u.indexed) return false;
    if (causeFilter !== "all" && u.cause !== causeFilter) return false;
    if (priorityFilter !== "all" && u.priority !== priorityFilter) return false;
    return true;
  });

  const tabs = [
    { id: "overview" as const, label: "Vue d'Ensemble", icon: "ri-dashboard-line", badge: `${overview.indexation_rate_current}%` },
    { id: "urls" as const, label: "URLs Non-Indexées", icon: "ri-link-unlink-m", badge: String(overview.total_not_indexed) },
    { id: "actions" as const, label: "Plan d'Action", icon: "ri-play-list-2-line", badge: `${actionPlan.filter(a => a.status === "completed").length}/${actionPlan.length}` },
    { id: "sitemaps" as const, label: "Sitemaps & GSC", icon: "ri-global-line", badge: `${sitemaps.length} sitemaps` },
    { id: "logs" as const, label: "Logs", icon: "ri-terminal-box-line", badge: String(executionLog.length) },
  ];

  const gaugePct = Math.min((overview.indexation_rate_current / overview.indexation_rate_target) * 100, 100);
  const gaugeColor = overview.indexation_rate_current >= 90 ? "#10b981" : overview.indexation_rate_current >= 75 ? "#f59e0b" : "#ef4444";

  const getPhaseColor = (phase: number) => {
    if (phase === 1) return "border-l-red-500 bg-red-50/50";
    if (phase === 2) return "border-l-amber-500 bg-amber-50/50";
    if (phase === 3) return "border-l-teal-500 bg-teal-50/50";
    return "border-l-emerald-500 bg-emerald-50/50";
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status === "in_progress") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-background-100 text-foreground-500 border-background-200";
  };

  const getCauseColor = (cause: string) => {
    const found = causes.find(c => c.id === cause);
    if (!found) return "bg-background-100 text-foreground-500";
    if (found.color === "red") return "bg-red-100 text-red-700 border-red-200";
    if (found.color === "amber") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "critical") return "bg-red-100 text-red-700";
    if (priority === "high") return "bg-amber-100 text-amber-700";
    if (priority === "medium") return "bg-teal-100 text-teal-700";
    return "bg-background-100 text-foreground-500";
  };

  return (
    <hubLayout hubId={35}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                KOS URL Indexation Command™
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                dataSource === "supabase"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}></span>
                {dataSource === "supabase" ? "DONNÉES LIVE" : "DONNÉES MOCK"}
              </span>
            </div>
            <p className="text-sm text-foreground-600 mt-1">
              Analyse exhaustive des URLs — Objectif 95% d'indexation Google — {overview.total_not_indexed} URLs à corriger
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={forceIndexAll}
              disabled={loading}
              className="whitespace-nowrap px-5 py-2.5 bg-accent-500 text-background-50 rounded-md hover:bg-accent-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <i className="ri-flashlight-line"></i>
              FORCER INDEXATION
            </button>
            <button
              onClick={refreshData}
              disabled={loading}
              className="whitespace-nowrap px-4 py-2.5 bg-background-100 text-foreground-700 rounded-md hover:bg-background-200 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <i className={`${loading ? "ri-loader-4-line animate-spin" : "ri-refresh-line"}`}></i>
              Scan
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-foreground-950 shadow-sm"
                  : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              <span className="text-xs opacity-60 ml-0.5">({tab.badge})</span>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
            <button onClick={refreshData} className="ml-auto underline cursor-pointer">Réessayer</button>
          </div>
        )}

        {/* ===== TAB: OVERVIEW ===== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Top KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Pages Indexées", value: `${overview.total_indexed}/${overview.total_urls_site}`, sub: `${overview.indexation_rate_current}%`, icon: "ri-checkbox-circle-line", color: "text-emerald-600" },
                { label: "Non Indexées", value: String(overview.total_not_indexed), sub: `${overview.urls_to_index} actionnables`, icon: "ri-close-circle-line", color: "text-red-500" },
                { label: "En Cours", value: String(overview.urls_in_progress), sub: "correction active", icon: "ri-loader-4-line", color: "text-amber-600" },
                { label: "Corrigées 7j", value: `+${overview.urls_fixed_last_7d}`, sub: "cette semaine", icon: "ri-arrow-up-circle-line", color: "text-teal-600" },
                { label: "Trafic Estimé", value: `+${overview.estimated_traffic_gain.toLocaleString()}`, sub: "visites/mois à 95%", icon: "ri-line-chart-line", color: "text-accent-600" },
                { label: "Clics Estimés", value: `+${overview.estimated_clicks_gain}`, sub: "/mois à 95%", icon: "ri-cursor-line", color: "text-primary-600" },
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                    <i className={`${kpi.icon} ${kpi.color}`}></i>
                    {kpi.label}
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">{kpi.value}</div>
                  <div className="text-[10px] text-foreground-400 mt-0.5">{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Indexation Gauge + Causes + Progression */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Gauge Card */}
              <div className="bg-white border border-background-200/70 rounded-lg p-6 text-center">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Taux d'Indexation</h3>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="-rotate-90 w-40 h-40" viewBox="0 0 160 160">
                    <circle cx={80} cy={80} r={68} fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle
                      cx={80} cy={80} r={68} fill="none" stroke={gaugeColor} strokeWidth="12"
                      strokeDasharray={`${(gaugePct / 100) * (2 * Math.PI * 68)} ${2 * Math.PI * 68}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground-950 font-[family-name:var(--font-heading)]">{overview.indexation_rate_current}%</span>
                    <span className="text-xs text-foreground-500 mt-1">Cible {overview.indexation_rate_target}%</span>
                  </div>
                </div>
                <div className="text-xs text-foreground-500">
                  Écart à combler : <strong className="text-foreground-950">{overview.indexation_rate_gap}%</strong> — {overview.urls_to_index} URLs
                </div>
              </div>

              {/* Causes Breakdown */}
              <div className="bg-white border border-background-200/70 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Causes de Non-Indexation</h3>
                <div className="space-y-3">
                  {causes.map(cause => (
                    <div key={cause.id} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        cause.color === "red" ? "bg-red-100" : cause.color === "amber" ? "bg-amber-100" : "bg-yellow-100"
                      }`}>
                        <i className={`${cause.icon} text-sm ${cause.color === "red" ? "text-red-600" : cause.color === "amber" ? "text-amber-600" : "text-yellow-600"}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground-900">{cause.label}</span>
                          <span className="text-xs font-bold text-foreground-950">{cause.count}</span>
                        </div>
                        <div className="h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cause.color === "red" ? "bg-red-500" : cause.color === "amber" ? "bg-amber-500" : "bg-yellow-500"}`}
                            style={{ width: `${cause.pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Progress */}
              <div className="bg-white border border-background-200/70 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Progression — 8 derniers jours</h3>
                <div className="flex items-end gap-2 h-36 mb-4">
                  {progress.daily_snapshots.map(snap => (
                    <div key={snap.date} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-foreground-950">{snap.rate}%</span>
                      <div
                        className="w-full bg-emerald-500 rounded-t-sm transition-all"
                        style={{ height: `${snap.rate * 1.2}px` }}
                      />
                      <span className="text-[9px] text-foreground-400">{snap.date.slice(5)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-background-100 pt-3">
                  <h4 className="text-xs font-semibold text-foreground-700 mb-2">Projection 95%</h4>
                  <div className="space-y-1.5">
                    {progress.projections.map(proj => (
                      <div key={proj.date} className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">{proj.date}</span>
                        <span className="font-bold text-emerald-600">{proj.projected_indexed} pages — {proj.projected_rate}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Indexed Pages */}
            <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-background-100">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">Top 10 Pages Indexées — Performance Google</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-100 bg-background-50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">Page</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">Impressions 30j</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">Clics 30j</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">CTR</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topIndexed.map((page, i) => (
                      <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                        <td className="py-3 px-4">
                          <div className="text-xs font-medium text-foreground-900">{page.title}</div>
                          <div className="text-[10px] text-foreground-500">{page.url}</div>
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-foreground-700">{page.impressions_30d.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-xs text-foreground-700">{page.clicks_30d.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-xs font-bold text-emerald-600">{((page.clicks_30d / page.impressions_30d) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold ${
                            page.avg_position <= 2 ? "bg-emerald-100 text-emerald-700" :
                            page.avg_position <= 3 ? "bg-amber-100 text-amber-700" : "bg-background-100 text-foreground-600"
                          }`}>{page.avg_position}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: URLs NON-INDEXÉES ===== */}
        {activeTab === "urls" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-500">Cause :</span>
                  <select
                    value={causeFilter}
                    onChange={e => setCauseFilter(e.target.value)}
                    className="text-xs border border-background-200/70 rounded-md px-3 py-1.5 bg-background-50 text-foreground-700 cursor-pointer"
                  >
                    <option value="all">Toutes ({overview.total_not_indexed})</option>
                    {causes.map(c => (
                      <option key={c.id} value={c.id}>{c.label} ({c.count})</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground-500">Priorité :</span>
                  <select
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                    className="text-xs border border-background-200/70 rounded-md px-3 py-1.5 bg-background-50 text-foreground-700 cursor-pointer"
                  >
                    <option value="all">Toutes</option>
                    <option value="critical">Critique</option>
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-foreground-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIndexed}
                  onChange={e => setShowIndexed(e.target.checked)}
                  className="rounded border-background-300 cursor-pointer"
                />
                Afficher les déjà indexées
              </label>
            </div>

            {/* URL Table */}
            <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70 bg-background-50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">URL</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">Cause</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Priorité</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Sitemap</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">Trafic Est.</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Statut</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUrls.map((entry, i) => (
                      <tr key={i} className={`border-b border-background-100/70 hover:bg-background-50/50 ${entry.indexed ? "bg-emerald-50/30" : ""}`}>
                        <td className="py-3 px-4 max-w-[280px]">
                          <div className="text-xs text-foreground-700 truncate">{entry.title}</div>
                          <div className="text-[10px] text-foreground-400 truncate font-mono">{entry.url}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCauseColor(entry.cause)}`}>
                            {entry.cause_label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getPriorityColor(entry.priority)}`}>
                            {entry.priority === "critical" ? "CRITIQUE" : entry.priority === "high" ? "Haute" : entry.priority === "medium" ? "Moyenne" : "Basse"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {entry.in_sitemap ? (
                            <i className="ri-checkbox-circle-fill text-emerald-500"></i>
                          ) : (
                            <i className="ri-close-circle-fill text-foreground-300"></i>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-foreground-700">{entry.traffic_estimated > 0 ? entry.traffic_estimated.toLocaleString() : "—"}</td>
                        <td className="py-3 px-4 text-center">
                          {entry.indexed ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                              <i className="ri-checkbox-circle-fill"></i> Indexée
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-medium">
                              <i className="ri-close-circle-fill"></i> Non indexée
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {!entry.indexed && entry.priority !== "low" ? (
                            <button
                              onClick={() => forceIndexUrl(entry.url)}
                              className="text-[10px] px-2 py-1 bg-accent-500 text-background-50 rounded-md hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer font-medium"
                            >
                              <i className="ri-flashlight-line mr-1"></i>Forcer
                            </button>
                          ) : entry.indexed ? (
                            <span className="text-[10px] text-emerald-600">{entry.action_taken ? "Corrigée" : "Indexée"}</span>
                          ) : (
                            <span className="text-[10px] text-foreground-400">Intentionnel</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUrls.length === 0 && (
                <div className="text-center py-8 text-xs text-foreground-400">Aucune URL ne correspond aux filtres sélectionnés</div>
              )}
            </div>
          </div>
        )}

        {/* ===== TAB: PLAN D'ACTION ===== */}
        {activeTab === "actions" && (
          <div className="space-y-6">
            {/* Execute All Button */}
            <div className="flex items-center justify-between bg-foreground-950 rounded-lg p-5 text-white">
              <div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">Plan de Remédiation — 7 Actions</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {actionPlan.filter(a => a.status === "completed").length}/{actionPlan.length} actions complétées — Objectif 95% d'indexation
                </p>
              </div>
              <button
                onClick={executeAllActions}
                disabled={executingActionId !== null}
                className="whitespace-nowrap px-6 py-3 bg-accent-500 text-background-50 rounded-md hover:bg-accent-600 transition-colors text-sm font-semibold flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <i className={`${executingActionId !== null ? "ri-loader-4-line animate-spin" : "ri-play-circle-line"}`}></i>
                {executingActionId !== null ? "Exécution..." : "TOUT EXÉCUTER"}
              </button>
            </div>

            {/* Action Cards by Phase */}
            {[1, 2, 3, 4].map(phase => {
              const phaseActions = actionPlan.filter(a => a.phase === phase);
              if (phaseActions.length === 0) return null;
              return (
                <div key={phase}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${phase === 1 ? "bg-red-500" : phase === 2 ? "bg-amber-500" : phase === 3 ? "bg-teal-500" : "bg-emerald-500"}`}></div>
                    <h3 className="text-sm font-semibold text-foreground-950">{phaseActions[0].phase_label}</h3>
                  </div>
                  <div className="space-y-3">
                    {phaseActions.map(action => (
                      <div key={action.id} className={`bg-white border border-background-200/70 rounded-lg p-5 border-l-4 ${getPhaseColor(action.phase)}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusBadge(action.status)}`}>
                                {action.status === "completed" ? "Terminé" : action.status === "in_progress" ? "En cours" : "En attente"}
                              </span>
                              {action.auto && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">
                                  <i className="ri-cpu-line mr-0.5"></i>Auto
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium text-foreground-900 mb-1">{action.action}</p>
                            <div className="flex items-center gap-4 text-xs text-foreground-500">
                              <span><i className="ri-link mr-1"></i>{action.urls_concerned} URLs</span>
                              <span><i className="ri-timer-line mr-1"></i>{action.effort}</span>
                              <span className="text-emerald-600 font-medium"><i className="ri-line-chart-line mr-1"></i>{action.impact}</span>
                            </div>
                            <div className="text-[10px] text-foreground-400 mt-2">Assigné à : {action.assigned_to}</div>
                            {action.progress_pct > 0 && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1 text-[10px]">
                                  <span className="text-foreground-500">Progression</span>
                                  <span className="font-bold text-foreground-950">{action.progress_pct}%</span>
                                </div>
                                <div className="h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${action.status === "completed" ? "bg-emerald-500" : "bg-accent-500"}`}
                                    style={{ width: `${action.progress_pct}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          {action.status !== "completed" && (
                            <button
                              onClick={() => executeAction(action.id)}
                              disabled={executingActionId === action.id}
                              className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                                executingActionId === action.id
                                  ? "bg-background-200 text-foreground-400"
                                  : "bg-primary-500 text-background-50 hover:bg-primary-600"
                              }`}
                            >
                              <i className={`${executingActionId === action.id ? "ri-loader-4-line animate-spin" : "ri-play-line"}`}></i>
                              {executingActionId === action.id ? "En cours..." : "Exécuter"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== TAB: SITEMAPS & GSC ===== */}
        {activeTab === "sitemaps" && (
          <div className="space-y-6">
            {/* Sitemaps */}
            <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-background-100">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">Sitemaps Soumis — Google Search Console</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-100 bg-background-50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">Sitemap</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">URLs</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Soumis</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Traité</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Erreurs</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Warnings</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">Dernière soumission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sitemaps.map((sm, i) => (
                      <tr key={i} className="border-b border-background-100/70">
                        <td className="py-3 px-4 text-xs font-medium text-foreground-900 font-mono">{sm.name}</td>
                        <td className="py-3 px-4 text-center text-xs text-foreground-700">{sm.urls}</td>
                        <td className="py-3 px-4 text-center">{sm.submitted ? <i className="ri-checkbox-circle-fill text-emerald-500"></i> : <i className="ri-close-circle-fill text-red-400"></i>}</td>
                        <td className="py-3 px-4 text-center">{sm.processed ? <i className="ri-checkbox-circle-fill text-emerald-500"></i> : <i className="ri-close-circle-fill text-red-400"></i>}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs font-bold ${sm.errors > 0 ? "text-red-500" : "text-emerald-600"}`}>{sm.errors}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs ${sm.warnings > 0 ? "text-amber-600 font-bold" : "text-foreground-400"}`}>{sm.warnings}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-foreground-500">{new Date(sm.last_submitted).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top GSC Queries */}
            <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-background-100">
                <h3 className="text-sm font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">Top 10 Requêtes — Google Search Console</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-100 bg-background-50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-foreground-500">Requête</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">Clics</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">Impressions</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-foreground-500">CTR</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-foreground-500">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gscQueries.map((q, i) => (
                      <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                        <td className="py-3 px-4 text-xs font-medium text-foreground-900">{q.query}</td>
                        <td className="py-3 px-4 text-right text-xs text-foreground-700">{q.clicks.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-xs text-foreground-700">{q.impressions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-xs font-bold text-emerald-600">{q.ctr}%</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold ${
                            q.position <= 2 ? "bg-emerald-100 text-emerald-700" :
                            q.position <= 4 ? "bg-amber-100 text-amber-700" : "bg-background-100 text-foreground-600"
                          }`}>{q.position}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: LOGS ===== */}
        {activeTab === "logs" && (
          <div className="bg-foreground-950 rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-xs text-gray-400 font-mono">KOS URL Indexation Command — Execution Logs</span>
              <span className="text-[10px] text-gray-500 ml-auto">{executionLog.length} entrées</span>
            </div>
            <div className="p-4 font-mono text-xs h-96 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-gray-500 text-center py-10">
                  <i className="ri-terminal-box-line text-2xl block mb-2"></i>
                  Aucun log d'exécution — Lancez une action pour voir les logs
                </div>
              ) : (
                <div className="space-y-1">
                  {executionLog.map((log, i) => (
                    <div key={i} className={`${
                      log.includes("TERMINÉE") || log.includes("succès") ? "text-emerald-400" :
                      log.includes("ERREUR") || log.includes("ÉCHEC") ? "text-red-400" :
                      log.includes("===") ? "text-accent-400 font-bold" :
                      log.includes("🔄") ? "text-amber-400" :
                      "text-gray-300"
                    }`}>
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer source badge */}
        <div className="mt-10 pt-6 border-t border-background-200/70 flex items-center justify-center">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            dataSource === "supabase"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-500" : "bg-yellow-500"}`}></span>
            {dataSource === "supabase" ? "Données Live — Supabase" : "Données Mock — Démo"}
          </span>
        </div>
      </div>
    </hubLayout>
  );
}





