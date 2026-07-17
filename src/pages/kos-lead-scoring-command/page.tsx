import { useState } from "react";
import { useLeadScores } from "@/hooks/useLeadScores";
import KOSHubLayout from '@/components/feature/KOSHubLayout';

export default function KOSLeadScoringCommandPage() {
  const { leads, pipeline, loading, error, runScoring, isLive } = useLeadScores();
  const [activeTab, setActiveTab] = useState<"overview" | "leads">("overview");

  const formatFCFA = (value: number) => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + " Md FCFA";
    if (value >= 1000000) return (value / 1000000).toFixed(1) + " M FCFA";
    return value.toLocaleString() + " FCFA";
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 bg-green-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-500 bg-red-100";
  };

  const getChurnColor = (risk: string) => {
    if (risk === "low") return "bg-green-100 text-green-700";
    if (risk === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <KOSHubLayout hubId={32}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                KOS Lead Scoring Command
              </h1>
              {isLive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  LIVE
                </span>
              )}
            </div>
            <p className="text-sm text-foreground-600 mt-1">
              Scoring Prédictif — Pipeline Intelligence — Next Best Action
              {isLive && <span className="ml-2 text-green-600 text-xs">● Scoring automatique en temps réel</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isLive && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <i className="ri-database-2-line"></i>
                Supabase Live
              </span>
            )}
            <button
              onClick={runScoring}
              disabled={loading}
              className="whitespace-nowrap px-5 py-2.5 bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <i className={`${loading ? "ri-loader-4-line animate-spin" : "ri-brain-line"}`}></i>
              {loading ? "Scoring..." : "Forcer Rescore"}
            </button>
          </div>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          {[
            { label: "Total Leads", value: pipeline.total_leads, icon: "ri-user-line", color: "text-foreground-700" },
            { label: "Chauds", value: pipeline.hot, icon: "ri-fire-line", color: "text-red-500", bg: "bg-red-50" },
            { label: "Tièdes", value: pipeline.warm, icon: "ri-sun-line", color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Froids", value: pipeline.cold, icon: "ri-snowy-line", color: "text-secondary-600", bg: "bg-secondary-50" },
            { label: "Score Moyen", value: pipeline.average_score, icon: "ri-bar-chart-line", color: "text-primary-600" },
            { label: "Pipeline Value", value: formatFCFA(pipeline.total_pipeline_value_fcfa), icon: "ri-money-dollar-circle-line", color: "text-accent-600" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg || "bg-white"} border border-background-200/70 rounded-lg p-4`}>
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

        {/* Additional Pipeline Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: "% Leads Chauds", value: pipeline.hot_percentage + "%" },
            { label: "Conv. Prob. Moyenne", value: pipeline.average_conversion_probability + "%" },
            { label: "Deals Gagnés (30j)", value: pipeline.deals_won_30d + " (" + formatFCFA(pipeline.deals_won_value_30d) + ")" },
            { label: "Ticket Moyen", value: formatFCFA(pipeline.average_deal_size_fcfa) },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="text-xs text-foreground-500 mb-1">{stat.label}</div>
              <div className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 w-fit">
          {[
            { id: "overview" as const, label: "Pipeline", icon: "ri-funds-line" },
            { id: "leads" as const, label: "Leads Scorés", icon: "ri-user-star-line" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        {/* Leads Table */}
        <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 bg-background-50">
                  <th className="text-left py-3 px-4 font-medium text-foreground-700">Lead</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-700">Secteur</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-700">Pays</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground-700">Score</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground-700">Conv. Prob.</th>
                  <th className="text-right py-3 px-4 font-medium text-foreground-700">Valeur Estimée</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground-700">Churn Risk</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground-700">Next Best Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground-900">{lead.lead_name}</div>
                      <div className="text-xs text-foreground-500">{lead.company}</div>
                    </td>
                    <td className="py-3 px-4 text-foreground-700">{lead.sector}</td>
                    <td className="py-3 px-4 text-foreground-700">{lead.country}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${getScoreColor(lead.predictive_score)}`}>
                        {lead.predictive_score}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-foreground-900">{lead.conversion_probability}%</span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground-900">{formatFCFA(lead.estimated_value_fcfa)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getChurnColor(lead.risk_of_churn)}`}>
                        {lead.risk_of_churn === "low" ? "Faible" : lead.risk_of_churn === "medium" ? "Moyen" : "Élevé"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-foreground-600 max-w-[220px]">{lead.next_best_action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}