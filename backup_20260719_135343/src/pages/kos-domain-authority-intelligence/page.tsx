import { useState } from "react";
import hubLayout from "@/components/feature/hubLayout";
import { useDomainAuthorityIntelligence } from "@/hooks/useDomainAuthorityIntelligence";

function CircularGauge({ value, size = 48, strokeWidth = 4, color = "primary" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === "accent" ? "stroke-accent-500" : color === "secondary" ? "stroke-secondary-500" : color === "red" ? "stroke-red-500" : "stroke-primary-500";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function ProgressBar({ value, target, color = "primary", showLabels = true }: { value: number; target: number; color?: string; showLabels?: boolean }) {
  const pct = Math.min((value / target) * 100, 100);
  const barColor = color === "accent" ? "bg-accent-500" : color === "secondary" ? "bg-secondary-500" : color === "red" ? "bg-red-500" : "bg-primary-500";
  return (
    <div>
      {showLabels && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-foreground-500">{value}</span>
          <span className="text-xs text-foreground-400">Cible: {target}</span>
        </div>
      )}
      <div className="w-full bg-background-100 rounded-full h-2">
        <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}

function getPrioriteBadge(p: string) {
  const map: Record<string, string> = {
    critique: "bg-red-100 text-red-700 border-red-200",
    haute: "bg-accent-100 text-accent-700 border-accent-200",
    moyenne: "bg-secondary-100 text-secondary-700 border-secondary-200",
  };
  return `text-xs px-2 py-0.5 rounded-full border font-medium ${map[p] || "bg-background-100 text-foreground-500"}`;
}

function getPrioriteLabel(p: string) {
  const map: Record<string, string> = { critique: "🔴 Critique", haute: "🟠 Haute", moyenne: "🟡 Moyenne" };
  return map[p] || p;
}

function getImpactBadge(i: string) {
  const map: Record<string, string> = {
    critique: "bg-red-100 text-red-700",
    haute: "bg-accent-100 text-accent-700",
    elevee: "bg-accent-100 text-accent-700",
    moyenne: "bg-secondary-100 text-secondary-700",
  };
  return `text-xs px-2 py-0.5 rounded-full font-medium ${map[i] || "bg-background-100 text-foreground-500"}`;
}

function getImpactLabel(i: string) {
  const map: Record<string, string> = { critique: "🔴 Critique", haute: "🟠 Élevé", elevee: "🟠 Élevé", moyenne: "🟡 Moyen" };
  return map[i] || i;
}

const formatNumber = (n: number) => n.toLocaleString("fr-FR");

export default function domainAuthorityIntelligencePage() {
  const { loading, overview, faiblesses, actions, trilingue, planTrimestriel, benchmark, kpis, refetch } = useDomainAuthorityIntelligence();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaiblesse, setExpandedFaiblesse] = useState<string | null>(null);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [selectedLangue, setSelectedLangue] = useState<string>("FR");

  const tabs = [
    { id: "overview", label: "Vue d'Ensemble", icon: "ri-dashboard-line", count: 5 },
    { id: "faiblesses", label: "Faiblesses", icon: "ri-bug-line", count: faiblesses.length, color: "red" as const },
    { id: "actions", label: "Actions Correctives", icon: "ri-tools-line", count: actions.length, color: "accent" as const },
    { id: "trilingue", label: "Stratégie Trilingue", icon: "ri-global-line", count: 3, color: "secondary" as const },
    { id: "benchmark", label: "Benchmark", icon: "ri-bar-chart-grouped-line", count: 4 },
    { id: "plan", label: "Plan Priorisé", icon: "ri-calendar-check-line", count: 4, color: "primary" as const },
    { id: "kpis", label: "KPIs", icon: "ri-line-chart-line", count: 4 },
  ];

  if (loading) {
    return (
      <hubLayout hubId={74}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-foreground-500">
            <div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
            <span className="text-sm">Chargement du diagnostic...</span>
          </div>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={74}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Master Prompt 11</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${overview.score_global < 50 ? "bg-red-100 text-red-700" : "bg-accent-100 text-accent-700"}`}>
                Score Global {overview.score_global}/100
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
              KOS Domain Authority Intelligence
            </h1>
            <p className="text-sm text-foreground-600 mt-1">
              Audit complet de l'autorité de domaine khepraexperts.com — Méthodologie Big Four — DA {overview.domain_authority_actuel} → {overview.domain_authority_cible} — Plan Trilingue FR/EN/PT
            </p>
          </div>
        </div>

        {/* KPIs Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4 mb-8">
          {[
            { label: "Domain Authority", value: overview.domain_authority_actuel, cible: overview.domain_authority_cible, icon: "ri-bar-chart-line", color: "text-yellow-600" },
            { label: "Domain Rating", value: overview.domain_rating_actuel, cible: overview.domain_rating_cible, icon: "ri-radar-line", color: "text-accent-600" },
            { label: "Backlinks", value: overview.backlinks_totaux, cible: overview.backlinks_cible_12m, icon: "ri-link-m" },
            { label: "Domaines Référents", value: overview.domaines_referents_actuels, cible: overview.domaines_referents_cible, icon: "ri-global-line", color: "text-red-500" },
            { label: "Trafic/Mois", value: formatNumber(overview.trafic_organique_mensuel), cible: formatNumber(overview.trafic_cible_mensuel), icon: "ri-line-chart-line" },
            { label: "Pages Linkées", value: `${overview.pages_avec_backlinks}/${overview.pages_indexees}`, cible: "120/312", icon: "ri-pages-line", color: "text-red-500" },
            { label: "Score Global", value: overview.score_global, cible: overview.score_cible, icon: "ri-trophy-line", color: "text-primary-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                <i className={`${stat.icon} ${stat.color || "text-foreground-500"}`}></i>
                {stat.label}
              </div>
              <div className="text-xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">{stat.value}</div>
              <div className="text-xs text-foreground-500 mt-1">Cible: {stat.cible}</div>
            </div>
          ))}
        </div>

        {/* Progression DA */}
        <div className="bg-white border border-background-200/70 rounded-lg p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground-700">Progression Domain Authority — 6 mois</span>
            <span className="text-sm text-green-600 font-medium">+{overview.progression_da_6m[5].da - overview.progression_da_6m[0].da} points</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {overview.progression_da_6m.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-medium text-foreground-700">{m.da}</div>
                <div className="w-full bg-accent-500 rounded-t-md transition-all" style={{ height: `${(m.da / overview.domain_authority_cible) * 80}px` }}></div>
                <div className="text-xs text-foreground-500">{m.mois}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Score par Pilier */}
        <div className="bg-white border border-background-200/70 rounded-lg p-5 mb-8">
          <h3 className="text-sm font-semibold text-foreground-800 mb-4">Score par Pilier d'Autorité</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(overview.score_par_pilier).map(([key, val]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground-600 capitalize">{key.replace(/_/g, " ")}</span>
                  <span className={`text-xs font-medium ${val < 30 ? "text-red-600" : val < 50 ? "text-yellow-600" : "text-green-600"}`}>{val}/100</span>
                </div>
                <div className="w-full bg-background-100 rounded-full h-1.5">
                  <div className={`h-full rounded-full ${val < 30 ? "bg-red-500" : val < 50 ? "bg-accent-500" : "bg-green-500"}`} style={{ width: `${val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 w-fit overflow-x-auto sticky top-20 z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? tab.color === "red" ? "bg-red-500 text-white shadow-sm" : tab.color === "accent" ? "bg-accent-500 text-white shadow-sm" : tab.color === "secondary" ? "bg-secondary-500 text-white shadow-sm" : tab.color === "primary" ? "bg-primary-500 text-white shadow-sm" : "bg-white text-foreground-950 shadow-sm"
                  : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              <span className="opacity-60 text-xs">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Tab: Faiblesses */}
        {activeTab === "faiblesses" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground-800">7 Faiblesses Critiques identifiées</h3>
              <span className="text-xs text-foreground-500">{faiblesses.filter(f => f.impact === "critique").length} critiques · {faiblesses.filter(f => f.impact === "haute").length} hautes · {faiblesses.filter(f => f.impact === "moyenne").length} moyennes</span>
            </div>
            {faiblesses.map((f) => (
              <div
                key={f.id}
                onClick={() => setExpandedFaiblesse(expandedFaiblesse === f.id ? null : f.id)}
                className="bg-white border border-background-200/70 rounded-lg p-5 cursor-pointer hover:border-background-300/70 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
                    f.impact === "critique" ? "bg-red-100 text-red-600" : f.impact === "haute" ? "bg-accent-100 text-accent-600" : "bg-secondary-100 text-secondary-600"
                  }`}>
                    <i className={f.impact === "critique" ? "ri-error-warning-fill text-lg" : f.impact === "haute" ? "ri-alert-fill text-lg" : "ri-information-fill text-lg"}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground-900">{f.titre}</span>
                      <span className={getImpactBadge(f.impact)}>{getImpactLabel(f.impact)}</span>
                      <span className="text-xs px-2 py-0.5 bg-background-100 text-foreground-500 rounded-full">{f.dimension}</span>
                    </div>
                    <p className="text-sm text-foreground-600 mb-2">{f.description}</p>
                    <div className="flex items-center gap-3 text-xs flex-wrap">
                      <span className="text-foreground-500">Score actuel: <strong className="text-red-600">{f.score_actuel}</strong></span>
                      <span className="text-foreground-500">Cible: <strong className="text-green-600">{f.score_cible}</strong></span>
                      <span className="text-foreground-500">Écart: <strong className="text-red-600">+{f.ecart}</strong></span>
                      <span className="text-foreground-500">Délai: <strong>{f.delai_correction}</strong></span>
                    </div>
                    {expandedFaiblesse === f.id && (
                      <div className="mt-3 pt-3 border-t border-background-200/70">
                        <div className="text-xs text-foreground-500 mb-1">Recommandation Big Four :</div>
                        <div className="text-sm text-accent-700 bg-accent-50 p-3 rounded">{f.recommandation}</div>
                      </div>
                    )}
                  </div>
                  {expandedFaiblesse === f.id ? <i className="ri-arrow-up-s-line text-foreground-400 mt-1"></i> : <i className="ri-arrow-down-s-line text-foreground-400 mt-1"></i>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Actions Correctives */}
        {activeTab === "actions" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground-800">9 Actions Correctives Priorisées</h3>
              <span className="text-xs text-foreground-500">{actions.filter(a => a.priorite === "critique").length} critiques · {actions.filter(a => a.priorite === "haute").length} hautes · {actions.filter(a => a.priorite === "moyenne").length} moyennes</span>
            </div>
            <div className="space-y-3">
              {actions.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setExpandedAction(expandedAction === a.id ? null : a.id)}
                  className="bg-white border border-background-200/70 rounded-lg p-5 cursor-pointer hover:border-background-300/70 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 ${
                      a.priorite === "critique" ? "bg-primary-100 text-primary-600" : a.priorite === "haute" ? "bg-accent-100 text-accent-600" : "bg-secondary-100 text-secondary-600"
                    }`}>
                      <i className={a.priorite === "critique" ? "ri-rocket-line text-lg" : a.priorite === "haute" ? "ri-flashlight-line text-lg" : "ri-tools-line text-lg"}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-foreground-900">{a.axe}</span>
                        <span className={getPrioriteBadge(a.priorite)}>{getPrioriteLabel(a.priorite)}</span>
                        <span className="text-xs px-2 py-0.5 bg-background-100 text-foreground-500 rounded-full">{a.delai}</span>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">{a.budget_estime}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs flex-wrap mt-2">
                        <span className="text-foreground-500">Responsable: <strong>{a.responsable}</strong></span>
                        <span className="text-green-600"><i className="ri-link-m mr-1"></i>+{a.backlinks_estimes} backlinks</span>
                        <span className="text-accent-600">DA moyen cible: {a.da_moyen_cible}</span>
                        <span className="text-foreground-500">KPI: {a.kpi_succes}</span>
                      </div>
                      {expandedAction === a.id && (
                        <div className="mt-3 pt-3 border-t border-background-200/70">
                          <div className="text-xs text-foreground-500 mb-2">Plan d'exécution détaillé :</div>
                          <div className="space-y-1.5">
                            {a.etapes.map((e, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-foreground-700">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background-100 text-xs text-foreground-500 flex-shrink-0 mt-0.5">{i + 1}</span>
                                {e}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {expandedAction === a.id ? <i className="ri-arrow-up-s-line text-foreground-400 mt-1"></i> : <i className="ri-arrow-down-s-line text-foreground-400 mt-1"></i>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Stratégie Trilingue */}
        {activeTab === "trilingue" && (
          <div>
            <div className="flex items-center gap-2 mb-6 bg-background-100 rounded-full p-1 w-fit">
              {["FR", "EN", "PT"].map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLangue(l)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    selectedLangue === l ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                  }`}
                >
                  <span>{l === "FR" ? "🇫🇷" : l === "EN" ? "🇬🇧" : "🇵🇹"}</span>
                  {l === "FR" ? "Français" : l === "EN" ? "English" : "Português"}
                  <span className="text-xs opacity-60">
                    {l === "FR" ? trilingue.francais.backlinks_actuels : l === "EN" ? trilingue.anglais.backlinks_actuels : trilingue.portugais.backlinks_actuels} bl
                  </span>
                </button>
              ))}
            </div>

            {/* Synthèse trilingue */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { code: "FR", data: trilingue.francais, color: "bg-primary-500" },
                { code: "EN", data: trilingue.anglais, color: "bg-accent-500" },
                { code: "PT", data: trilingue.portugais, color: "bg-secondary-500" },
              ].map((l) => (
                <div key={l.code} className="bg-white border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{l.code === "FR" ? "🇫🇷" : l.code === "EN" ? "🇬🇧" : "🇵🇹"}</span>
                    <div>
                      <span className="text-sm font-semibold text-foreground-900">{l.data.langue}</span>
                      <p className="text-xs text-foreground-500">{l.data.marche_principal}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground-500">Backlinks</span>
                        <span className="text-foreground-700 font-medium">{l.data.backlinks_actuels} → {l.data.objectif_12m}</span>
                      </div>
                      <ProgressBar value={l.data.backlinks_actuels} target={l.data.objectif_12m} color={l.code === "FR" ? "primary" : l.code === "EN" ? "accent" : "secondary"} showLabels={false} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Langue sélectionnée — détails */}
            {(() => {
              const data = selectedLangue === "FR" ? trilingue.francais : selectedLangue === "EN" ? trilingue.anglais : trilingue.portugais;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-background-200/70 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-foreground-800 mb-3">Cibles Prioritaires — {selectedLangue}</h3>
                    <div className="space-y-2">
                      {data.cibles_prioritaires.map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-background-50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground-800">{c.nom}</span>
                            <span className="text-xs px-2 py-0.5 bg-background-200/70 text-foreground-500 rounded-full">DA {c.da}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            c.statut === "acquis" ? "bg-green-100 text-green-700" : c.statut === "en_discussion" ? "bg-accent-100 text-accent-700" : c.statut === "contacte" ? "bg-secondary-100 text-secondary-700" : "bg-background-100 text-foreground-500"
                          }`}>
                            {c.statut === "acquis" ? "✅ Acquis" : c.statut === "en_discussion" ? "🟠 En discussion" : c.statut === "contacte" ? "🔵 Contacté" : "⚪ À contacter"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-background-200/70 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-foreground-800 mb-3">Contenus Phares — {selectedLangue}</h3>
                    <div className="space-y-2">
                      {data.contenus_phares.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-background-50 rounded">
                          <i className="ri-file-text-line text-accent-500"></i>
                          <span className="text-sm text-foreground-700">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Tab: Benchmark */}
        {activeTab === "benchmark" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Concurrents Table */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Comparaison Concurrentielle — Big Four vs KHEPRA</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70">
                        <th className="text-left py-2 px-2 text-xs text-foreground-500 font-medium">Cabinet</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">DA</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">DR</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Backlinks</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Domaines</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Trafic</th>
                        <th className="text-center py-2 px-2 text-xs text-foreground-500 font-medium">Écart DA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-background-100 bg-accent-50/50">
                        <td className="py-2.5 px-2 font-medium text-foreground-800">{benchmark.khepra.nom}</td>
                        <td className="py-2.5 px-2 text-center font-medium text-accent-600">{benchmark.khepra.da}</td>
                        <td className="py-2.5 px-2 text-center">{benchmark.khepra.dr}</td>
                        <td className="py-2.5 px-2 text-center">{formatNumber(benchmark.khepra.backlinks)}</td>
                        <td className="py-2.5 px-2 text-center">{benchmark.khepra.domaines_referents}</td>
                        <td className="py-2.5 px-2 text-center">{formatNumber(benchmark.khepra.trafic_organique)}</td>
                        <td className="py-2.5 px-2 text-center text-foreground-500">—</td>
                      </tr>
                      {benchmark.concurrents.map((c, i) => (
                        <tr key={i} className="border-b border-background-100">
                          <td className="py-2.5 px-2 font-medium text-foreground-800">{c.nom}</td>
                          <td className="py-2.5 px-2 text-center">{c.da}</td>
                          <td className="py-2.5 px-2 text-center">{c.dr}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.backlinks)}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.domaines_referents)}</td>
                          <td className="py-2.5 px-2 text-center">{formatNumber(c.trafic_organique)}</td>
                          <td className="py-2.5 px-2 text-center text-red-600 font-medium">+{c.ecart_da}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gap Analysis */}
              <div className="bg-white border border-background-200/70 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground-800 mb-4">Gap Analysis — Écart vs Deloitte (Leader)</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Domain Authority</span>
                      <span className="text-xs font-medium text-red-600">Gap ×{Math.round(benchmark.gap_analysis.da_gap_vs_deloitte / benchmark.khepra.da)}</span>
                    </div>
                    <ProgressBar value={benchmark.khepra.da} target={benchmark.concurrents[0].da} color="red" showLabels={false} />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-foreground-500">KHEPRA {benchmark.khepra.da}</span>
                      <span className="text-xs text-foreground-500">Deloitte {benchmark.concurrents[0].da}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Backlinks</span>
                      <span className="text-xs font-medium text-red-600">Gap {formatNumber(benchmark.gap_analysis.backlinks_gap_vs_deloitte)}</span>
                    </div>
                    <ProgressBar value={benchmark.khepra.backlinks} target={benchmark.concurrents[0].backlinks} color="red" showLabels={false} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground-500">Domaines Référents</span>
                      <span className="text-xs font-medium text-red-600">Gap {formatNumber(benchmark.gap_analysis.domaines_gap_vs_deloitte)}</span>
                    </div>
                    <ProgressBar value={benchmark.khepra.domaines_referents} target={benchmark.concurrents[0].domaines_referents} color="red" showLabels={false} />
                  </div>
                  <div className="mt-4 pt-4 border-t border-background-200/70">
                    <div className="text-xs text-foreground-500 mb-2">Temps estimé pour atteindre un niveau compétitif</div>
                    <div className="text-lg font-semibold text-accent-700">{benchmark.gap_analysis.temps_estime_competitif}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Actions Clés */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-3">5 Actions Clés pour Combler le Gap</h3>
              <div className="space-y-2">
                {benchmark.gap_analysis.actions_cles.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-background-50 rounded">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                    <span className="text-sm text-foreground-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Plan Priorisé */}
        {activeTab === "plan" && (
          <div>
            {/* Vision */}
            <div className="bg-accent-50 border border-accent-200/50 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <i className="ri-focus-3-line text-accent-600 text-xl mt-0.5"></i>
                <div>
                  <span className="text-xs tracking-widest uppercase text-accent-600 font-medium">Vision 12 Mois</span>
                  <p className="text-sm text-accent-800 mt-1">{planTrimestriel.vision}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-accent-700">
                    <span>Budget : <strong>{planTrimestriel.budget_total}</strong></span>
                    <span>ROSI : <strong>{planTrimestriel.synthese_12m.rosi}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Trimestres */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {planTrimestriel.trimestres.map((t, i) => (
                <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground-800">{t.nom}</h3>
                      <p className="text-xs text-foreground-500">{t.mois}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">{t.trimestre}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center bg-background-50 rounded p-2">
                      <div className="text-lg font-semibold text-foreground-950">+{t.objectif_backlinks}</div>
                      <div className="text-[10px] text-foreground-500">Backlinks</div>
                    </div>
                    <div className="text-center bg-background-50 rounded p-2">
                      <div className="text-lg font-semibold text-foreground-950">+{t.objectif_domaines}</div>
                      <div className="text-[10px] text-foreground-500">Domaines</div>
                    </div>
                    <div className="text-center bg-background-50 rounded p-2">
                      <div className="text-lg font-semibold text-accent-600">DA {t.objectif_da}</div>
                      <div className="text-[10px] text-foreground-500">Cible</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {t.actions_cles.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground-600">
                        <i className="ri-checkbox-blank-circle-fill text-[6px] text-accent-500 mt-1.5 flex-shrink-0"></i>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-background-200/70 pt-3">
                    <span className="text-[10px] uppercase tracking-wider text-foreground-500">Jalons</span>
                    {t.jalons.map((j, k) => (
                      <div key={k} className="flex items-center gap-2 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 flex-shrink-0"></div>
                        <span className="text-xs text-foreground-700">{j.date} — {j.evenement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Synthèse 12 Mois */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Synthèse 12 Mois — Trajectoire vers l'Excellence</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Backlinks Total", value: planTrimestriel.synthese_12m.backlinks_total, icon: "ri-link-m" },
                  { label: "Domaines Référents", value: planTrimestriel.synthese_12m.domaines_referents, icon: "ri-global-line" },
                  { label: "DA Final", value: planTrimestriel.synthese_12m.da_final, icon: "ri-bar-chart-line", color: "text-accent-600" },
                  { label: "DR Final", value: planTrimestriel.synthese_12m.dr_final, icon: "ri-radar-line", color: "text-primary-600" },
                  { label: "Trafic Mensuel", value: formatNumber(planTrimestriel.synthese_12m.trafic_mensuel_final), icon: "ri-line-chart-line" },
                  { label: "Croissance", value: planTrimestriel.synthese_12m.croissance_trafic, icon: "ri-arrow-up-line", color: "text-green-600" },
                ].map((m, i) => (
                  <div key={i} className="text-center p-3 bg-background-50 rounded">
                    <i className={`${m.icon} ${m.color || "text-foreground-400"} text-lg mb-1`}></i>
                    <div className="text-xl font-semibold text-foreground-950">{m.value}</div>
                    <div className="text-xs text-foreground-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: KPIs */}
        {activeTab === "kpis" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temps de Traitement */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Temps de Traitement</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">Backlinks / Mois</span>
                    <span className="text-xs text-red-600">{kpis.temps_traitement.backlinks_par_mois} / {kpis.temps_traitement.cible_backlinks_par_mois}</span>
                  </div>
                  <ProgressBar value={kpis.temps_traitement.backlinks_par_mois} target={kpis.temps_traitement.cible_backlinks_par_mois} color="red" showLabels={false} />
                </div>
                <div className="flex items-center justify-between p-3 bg-background-50 rounded">
                  <span className="text-xs text-foreground-500">Temps moyen acquisition backlink</span>
                  <span className="text-sm font-semibold text-foreground-900">{kpis.temps_traitement.temps_moyen_acquisition} jours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background-50 rounded">
                  <span className="text-xs text-foreground-500">Délai contact → backlink</span>
                  <span className="text-sm font-semibold text-foreground-900">{kpis.temps_traitement.delai_moyen_contact_to_backlink} jours</span>
                </div>
              </div>
            </div>

            {/* Qualité */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Qualité</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">DA Moyen Backlinks Acquis</span>
                    <span className="text-xs text-accent-600">{kpis.qualite.da_moyen_backlinks_acquis} / {kpis.qualite.cible_da_moyen}</span>
                  </div>
                  <ProgressBar value={kpis.qualite.da_moyen_backlinks_acquis} target={kpis.qualite.cible_da_moyen} color="accent" showLabels={false} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">Ratio Backlinks Éditoriaux</span>
                    <span className="text-xs text-red-600">{kpis.qualite.ratio_backlinks_editoriaux}% / {kpis.qualite.cible_ratio_editoriaux}%</span>
                  </div>
                  <ProgressBar value={kpis.qualite.ratio_backlinks_editoriaux} target={kpis.qualite.cible_ratio_editoriaux} color="red" showLabels={false} />
                </div>
                <div className="flex items-center justify-between p-3 bg-background-50 rounded">
                  <span className="text-xs text-foreground-500">Taux Backlinks Toxiques</span>
                  <span className={`text-sm font-semibold ${kpis.qualite.taux_backlinks_toxiques === 0 ? "text-green-600" : "text-red-600"}`}>{kpis.qualite.taux_backlinks_toxiques}%</span>
                </div>
              </div>
            </div>

            {/* Productivité */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Productivité</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-xs text-foreground-500">Coût par Backlink</span>
                  <span className="text-sm font-semibold text-green-700">{kpis.productivite.cout_par_backlink}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background-50 rounded">
                  <span className="text-xs text-foreground-500">Backlinks / Action Corrective</span>
                  <span className="text-sm font-semibold text-foreground-900">{kpis.productivite.backlinks_par_action_corrective}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">Taux Conversion Outreach</span>
                    <span className="text-xs text-accent-600">{kpis.productivite.taux_conversion_outreach}% / {kpis.productivite.cible_conversion}%</span>
                  </div>
                  <ProgressBar value={kpis.productivite.taux_conversion_outreach} target={kpis.productivite.cible_conversion} color="accent" showLabels={false} />
                </div>
              </div>
            </div>

            {/* Couverture Linguistique */}
            <div className="bg-white border border-background-200/70 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Couverture Linguistique</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">🇫🇷 Français</span>
                    <span className="text-xs text-foreground-700">{kpis.couverture_linguistique.fr_pourcentage}%</span>
                  </div>
                  <div className="w-full bg-background-100 rounded-full h-2">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${kpis.couverture_linguistique.fr_pourcentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">🇬🇧 Anglais</span>
                    <span className="text-xs text-foreground-700">{kpis.couverture_linguistique.en_pourcentage}% (cible: {kpis.couverture_linguistique.cible_en}%)</span>
                  </div>
                  <div className="w-full bg-background-100 rounded-full h-2">
                    <div className="h-full bg-accent-500 rounded-full" style={{ width: `${kpis.couverture_linguistique.en_pourcentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground-500">🇵🇹 Portugais</span>
                    <span className="text-xs text-foreground-700">{kpis.couverture_linguistique.pt_pourcentage}% (cible: {kpis.couverture_linguistique.cible_pt}%)</span>
                  </div>
                  <div className="w-full bg-background-100 rounded-full h-2">
                    <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${kpis.couverture_linguistique.pt_pourcentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer synthese */}
        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-shield-check-line text-accent-700 text-lg"></i>
            <span className="text-sm font-semibold text-accent-900">KOS Domain Authority Intelligence — Audit Big Four</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>DA {overview.domain_authority_actuel}</strong> → {overview.domain_authority_cible}</span>
            <span><strong>DR {overview.domain_rating_actuel}</strong> → {overview.domain_rating_cible}</span>
            <span><strong>{overview.backlinks_totaux}</strong> → {overview.backlinks_cible_12m} backlinks</span>
            <span><strong>{overview.domaines_referents_actuels}</strong> → {overview.domaines_referents_cible} domaines</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}



