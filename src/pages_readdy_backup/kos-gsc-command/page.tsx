import { useState } from "react";
import { useGSCMonitor } from "@/hooks/useGSCMonitor";
import hubLayout from '@/components/feature/hubLayout';

export default function gSCCommandPage() {
  const { overview, keywords, pages, opportunities, recommendations, checklist, loading, error, dataSource, runMonitor } = useGSCMonitor();
  const [activeTab, setActiveTab] = useState<"overview" | "keywords" | "pages" | "opportunities" | "checklist">("overview");

  const tabs = [
    { id: "overview" as const, label: "Vue d'Ensemble", icon: "ri-dashboard-line" },
    { id: "keywords" as const, label: "Mots-Clés", icon: "ri-hashtag" },
    { id: "pages" as const, label: "Pages", icon: "ri-file-list-line" },
    { id: "opportunities" as const, label: "Opportunités", icon: "ri-lightbulb-line" },
    { id: "checklist" as const, label: "Configuration", icon: "ri-settings-3-line" },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <i className="ri-arrow-up-line text-green-600"></i>;
    if (trend === "down") return <i className="ri-arrow-down-line text-red-500"></i>;
    return <i className="ri-subtract-line text-foreground-500"></i>;
  };

  return (
    <hubLayout hubId={30}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                Google Search Console Command
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                dataSource === "supabase"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}></span>
                {dataSource === "supabase" ? "DONNÉES LIVE — SUPABASE" : "DONNÉES MOCK — DÉMO"}
              </span>
            </div>
            <p className="text-sm text-foreground-600 mt-1">
              KOS GSC Monitor — Pilotage SEO via données Google Search Console
            </p>
          </div>
          <button
            onClick={runMonitor}
            disabled={loading}
            className="whitespace-nowrap px-5 py-2.5 bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            <i className={`${loading ? "ri-loader-4-line animate-spin" : "ri-refresh-line"}`}></i>
            {loading ? "Scan en cours..." : "Actualiser les données"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {[
            { label: "Impressions 30j", value: (overview.total_impressions_30d / 1000).toFixed(1) + "K", icon: "ri-eye-line", color: "text-primary-600" },
            { label: "Clics 30j", value: (overview.total_clicks_30d / 1000).toFixed(1) + "K", icon: "ri-cursor-line", color: "text-accent-600" },
            { label: "CTR Moyen", value: overview.average_ctr + "%", icon: "ri-percent-line", color: "text-secondary-600" },
            { label: "Position Moy.", value: overview.average_position.toFixed(1), icon: "ri-trophy-line", color: "text-yellow-600" },
            { label: "Top 3", value: overview.keywords_top3 + "/" + overview.keywords_tracked, icon: "ri-medal-line", color: "text-green-600" },
            { label: "Pages Indexées", value: overview.indexation_rate + "%", icon: "ri-checkbox-circle-line", color: "text-secondary-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                <i className={`${stat.icon} ${stat.color}`}></i>
                {stat.label}
              </div>
              <div className="text-xl md:text-2xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
            </div>
          ))}
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
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
            <button onClick={runMonitor} className="ml-auto underline cursor-pointer">Réessayer</button>
          </div>
        )}

        {/* Tab: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Performance Trends */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Tendances 30 jours</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Clics vs 30j précédents", value: "+" + overview.clicks_vs_previous_30d + "%", positive: true },
                  { label: "Impressions vs 30j précédents", value: "+" + overview.impressions_vs_previous_30d + "%", positive: true },
                  { label: "Mots-clés en hausse", value: overview.keywords_improving, positive: true },
                  { label: "Mots-clés en baisse", value: overview.keywords_declining, positive: false },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-background-50 rounded-lg">
                    <div className="text-xs text-foreground-500 mb-1">{item.label}</div>
                    <div className={`text-xl font-semibold font-[family-name:var(--font-heading)] ${item.positive ? "text-green-600" : "text-red-500"}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Recommandations</h2>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-background-50 rounded-lg">
                    <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      rec.priority === "high" ? "bg-red-500" : rec.priority === "medium" ? "bg-yellow-500" : "bg-secondary-400"
                    }`}></span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rec.priority === "high" ? "bg-red-100 text-red-700" : rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-secondary-100 text-secondary-900"
                        }`}>
                          {rec.priority === "high" ? "Prioritaire" : rec.priority === "medium" ? "Important" : "Secondaire"}
                        </span>
                        <span className="text-xs text-foreground-500">{rec.effort}</span>
                      </div>
                      <div className="text-sm font-medium text-foreground-900 mt-1">{rec.action}</div>
                      <div className="text-xs text-foreground-500 mt-0.5">{rec.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Keywords */}
        {activeTab === "keywords" && (
          <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200/70 bg-background-50">
                    <th className="text-left py-3 px-4 font-medium text-foreground-700">Mot-Clé</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground-700">Position</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">Impressions</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">Clics</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">CTR</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground-700">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw, i) => (
                    <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                      <td className="py-3 px-4 font-medium text-foreground-900">{kw.keyword}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          kw.position <= 3 ? "bg-green-100 text-green-700" : kw.position <= 5 ? "bg-yellow-100 text-yellow-700" : "bg-background-100 text-foreground-600"
                        }`}>
                          {kw.position}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-foreground-700">{kw.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-foreground-700">{kw.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-foreground-700">{kw.ctr}%</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6">{getTrendIcon(kw.trend)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Pages */}
        {activeTab === "pages" && (
          <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-background-200/70 bg-background-50">
                    <th className="text-left py-3 px-4 font-medium text-foreground-700">Page</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">Impressions</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">Clics</th>
                    <th className="text-right py-3 px-4 font-medium text-foreground-700">CTR</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground-700">Index</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground-700">Sitemap</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((p, i) => (
                    <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground-900">{p.title}</div>
                        <div className="text-xs text-foreground-500">{p.url}</div>
                      </td>
                      <td className="py-3 px-4 text-right text-foreground-700">{p.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-foreground-700">{p.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-foreground-700">{p.ctr}%</td>
                      <td className="py-3 px-4 text-center">
                        {p.indexed ? (
                          <i className="ri-checkbox-circle-fill text-green-500"></i>
                        ) : (
                          <i className="ri-close-circle-fill text-red-400"></i>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {p.sitemap ? (
                          <i className="ri-checkbox-circle-fill text-green-500"></i>
                        ) : (
                          <i className="ri-close-circle-fill text-red-400"></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Opportunities */}
        {activeTab === "opportunities" && (
          <div className="space-y-4">
            {opportunities.map((opp, i) => (
              <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full font-medium">
                        Position {opp.current_position} → Top {opp.potential === "top_3" ? "3" : "5"}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-background-100 text-foreground-600 rounded-full">
                        Difficulté : {opp.difficulty === "medium" ? "Moyenne" : "Élevée"}
                      </span>
                    </div>
                    <div className="font-medium text-foreground-900 mb-1">{opp.keyword}</div>
                    <div className="text-sm text-foreground-600 mb-2">{opp.action}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <i className="ri-arrow-up-line"></i>
                      Gain estimé : +{opp.estimated_clicks_gain} clics/mois
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Checklist */}
        {activeTab === "checklist" && (
          <div className="bg-white border border-background-200/70 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Configuration GSC</h2>
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-background-50 rounded-lg">
                  <span className="mt-0.5">
                    {item.status === "completed" ? (
                      <i className="ri-checkbox-circle-fill text-green-500 text-lg"></i>
                    ) : item.status === "warning" ? (
                      <i className="ri-error-warning-fill text-yellow-500 text-lg"></i>
                    ) : (
                      <i className="ri-checkbox-blank-circle-line text-foreground-400 text-lg"></i>
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground-900">{item.step}</div>
                    {item.note && <div className="text-xs text-foreground-500 mt-1">{item.note}</div>}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.status === "completed" ? "bg-green-100 text-green-700" :
                    item.status === "warning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-background-100 text-foreground-500"
                  }`}>
                    {item.status === "completed" ? "Fait" : item.status === "warning" ? "Attention" : "À faire"}
                  </span>
                </div>
              ))}
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



