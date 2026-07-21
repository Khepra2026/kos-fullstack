import { useState } from "react";
import hubLayout from "@/components/feature/hubLayout";
import { useFrancophoneAfricaStrategicCenter } from "@/hooks/useFrancophoneAfricaStrategicCenter";

type Tab = "cockpit" | "capacities" | "modules" | "multilingual" | "governance" | "diffusion" | "kpis";

const severityBadge: Record<string, string> = {
  Excellence: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Avancé: "bg-teal-50 text-teal-700 border-teal-200",
  Intermédiaire: "bg-amber-50 text-amber-700 border-amber-200",
  Émergent: "bg-rose-50 text-rose-700 border-rose-200",
  Insuffisant: "bg-red-50 text-red-700 border-red-200",
};

const priorityBadge: Record<string, string> = {
  P0: "bg-red-50 text-red-700 border-red-200",
  P1: "bg-amber-50 text-amber-700 border-amber-200",
  P2: "bg-teal-50 text-teal-700 border-teal-200",
};

const colorMap: Record<string, { bg: string; text: string; bar: string; border: string; light: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500", border: "border-emerald-200", light: "bg-emerald-100/70" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", bar: "bg-teal-500", border: "border-teal-200", light: "bg-teal-100/70" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-amber-500", border: "border-amber-200", light: "bg-amber-100/70" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", bar: "bg-rose-500", border: "border-rose-200", light: "bg-rose-100/70" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", bar: "bg-violet-500", border: "border-violet-200", light: "bg-violet-100/70" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-700", bar: "bg-cyan-500", border: "border-cyan-200", light: "bg-cyan-100/70" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", bar: "bg-indigo-500", border: "border-indigo-200", light: "bg-indigo-100/70" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", bar: "bg-orange-500", border: "border-orange-200", light: "bg-orange-100/70" },
};

function ProgressBar({ value, max = 100, color = "emerald", label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.round((value / max) * 100);
  const c = colorMap[color] || colorMap.emerald;
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-foreground-600 mb-1"><span>{label}</span><span className="font-semibold text-foreground-950">{pct}%</span></div>}
      <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
        <div className={`h-full ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function CircularGauge({ value, size = 56, strokeWidth = 5, color = "emerald" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  const c = colorMap[color] || colorMap.emerald;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${c.bar.replace("bg-", "stroke-")} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
  { id: "cockpit", label: "Cockpit Exécutif", icon: "ri-dashboard-3-line" },
  { id: "capacities", label: "Capacités KOS", icon: "ri-radar-line", count: 8 },
  { id: "modules", label: "Modules Prospectifs", icon: "ri-stack-line", count: 6 },
  { id: "multilingual", label: "Plan Multilingue", icon: "ri-global-line", count: 3 },
  { id: "governance", label: "Gouvernance", icon: "ri-organization-chart", count: 4 },
  { id: "diffusion", label: "Diffusion", icon: "ri-share-forward-line", count: 6 },
  { id: "kpis", label: "KPIs & Budget", icon: "ri-funds-line", count: 4 },
];

export default function francophoneAfricaStrategicCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("cockpit");
  const { assessment, modules, contentPlan, governance, stats } = useFrancophoneAfricaStrategicCenter();

  return (
    <hubLayout hubId={56}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-4">
                <i className="ri-global-line"></i>PRIORITÉ STRATÉGIQUE — AFRIQUE FRANCOPHONE
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Centre d'Intelligence Stratégique — Afrique Francophone™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-3xl leading-relaxed">
                Mandat Big Four (PwC · Deloitte · EY · KPMG) — Transformation de KOS en centre d'intelligence
                stratégique de référence pour l'Afrique francophone. Diagnostic capacitaire, modules de recherche
                prospective, plan de contenu trilingue (FR/EN/PT) et modèle de gouvernance pour la diffusion des insights.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70 flex items-center gap-2">
                <CircularGauge value={stats.globalScore} size={48} strokeWidth={4} color={stats.globalScore >= 90 ? "emerald" : stats.globalScore >= 80 ? "teal" : "amber"} />
                <div>
                  <div className="text-xs text-foreground-500">Score Global</div>
                  <div className="text-lg font-bold text-foreground-950">{stats.globalScore}<span className="text-xs text-foreground-400">/100</span></div>
                </div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-lg font-bold text-foreground-950">{stats.modulesTotal}</div>
                <div className="text-xs text-foreground-500">Modules</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-lg font-bold text-accent-500">{stats.countriesCovered}</div>
                <div className="text-xs text-foreground-500">Pays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? "bg-foreground-950 text-background-50" : "text-foreground-600 hover:bg-background-100"
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.count && <span className="text-xs opacity-60">({tab.count})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB 1: COCKPIT EXÉCUTIF ============ */}
        {activeTab === "cockpit" && (
          <div className="space-y-8">
            {/* Score Radar */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-6 flex items-center gap-2">
                <i className="ri-radar-line text-amber-500"></i>
                Diagnostic Capacitaire — 8 Piliers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {assessment.pillars.map((p) => {
                  const c = colorMap[p.color];
                  return (
                    <div key={p.id} className={`rounded-lg p-4 border ${c.border} ${c.light}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${c.bg}`}>
                            <i className={`${p.icon} ${c.text} text-sm`}></i>
                          </div>
                          <span className="text-xs font-semibold text-foreground-950">{p.name}</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold text-foreground-950">{p.score}</span>
                        <span className="text-xs text-foreground-400 mb-0.5">/100</span>
                        <span className="text-xs text-emerald-600 ml-auto flex items-center gap-0.5"><i className="ri-arrow-up-line text-[10px]"></i>{p.trend}</span>
                      </div>
                      <ProgressBar value={p.score} color={p.color} />
                      <div className="mt-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${severityBadge[p.maturityLabel] || "bg-background-100 text-foreground-500 border-background-200"}`}>
                          {p.maturityLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Findings */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-lightbulb-flash-line text-amber-400"></i>
                Constats Clés — Consortium Big Four
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { text: "KOS dispose d'une base d'excellence en veille réglementaire (92/100) et analyse financière (85/100) — les deux piliers les plus solides du dispositif.", icon: "ri-check-double-line" },
                  { text: "Le gap critique est la modélisation économétrique (55/100) : sans modèle macroéconomique propriétaire, KOS dépend des analyses FMI/Banque Mondiale.", icon: "ri-error-warning-line" },
                  { text: "La diffusion multilingue est le frein principal à l'influence panafricaine : 312 pages FR vs 78 EN vs 12 PT. Le marché anglophone africain (Nigeria, Ghana, Kenya) est quasi inaccessible.", icon: "ri-global-line" },
                  { text: "6 modules de recherche prospective sont proposés pour combler ces gaps — budget total 345M FCFA avec ROI projeté ×6 en 24 mois.", icon: "ri-funds-box-line" },
                  { text: "La création d'un indice composite propriétaire ICCAF™ positionnera KOS comme référence incontournable — effet levier commercial massif.", icon: "ri-medal-line" },
                  { text: "Le modèle de gouvernance à 4 niveaux (CSIE, Comité Éditorial, Peer Review, Hubs Régionaux) garantit crédibilité, rigueur académique et ancrage local.", icon: "ri-organization-chart" },
                ].map((finding, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/8 border border-white/10">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-0.5 ${i < 3 ? "bg-amber-500/30 text-amber-400" : "bg-teal-500/30 text-teal-400"}`}>
                      <i className={finding.icon}></i>
                    </span>
                    <p className="text-sm text-gray-200 leading-relaxed">{finding.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Modules Planifiés", value: stats.modulesTotal, sub: `${stats.modulesP0} P0 · ${stats.modulesP1} P1 · ${stats.modulesP2} P2`, icon: "ri-stack-line", color: "emerald" },
                { label: "Pays Couverts", value: stats.countriesCovered, sub: "UEMOA + CEMAC + PALOP + East Africa", icon: "ri-earth-line", color: "teal" },
                { label: "Pages Trilingues (Cible)", value: stats.triLingualPagesTarget, sub: `Actuel : ${stats.triLingualPagesCurrent}`, icon: "ri-pages-line", color: "amber" },
                { label: "Budget Annuel", value: `${(stats.budgetAnnualFCFA / 1000000).toFixed(0)}M FCFA`, sub: `ROI projeté ×6`, icon: "ri-funds-line", color: "rose" },
              ].map((stat, i) => {
                const c = colorMap[stat.color];
                return (
                  <div key={i} className={`rounded-lg p-4 border ${c.border} ${c.light}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 flex items-center justify-center rounded-md ${c.bg}`}>
                        <i className={`${stat.icon} ${c.text} text-sm`}></i>
                      </div>
                      <span className="text-xs font-medium text-foreground-600">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-foreground-950">{stat.value}</div>
                    <div className="text-[10px] text-foreground-400 mt-0.5">{stat.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ TAB 2: CAPACITÉS KOS ============ */}
        {activeTab === "capacities" && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground-950">Évaluation Détaillée — 8 Piliers Capacitaires</h2>
                <p className="text-sm text-foreground-600 mt-1">Audit réalisé par le consortium PwC · Deloitte · EY · KPMG — {assessment.assessmentDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 bg-background-50 rounded-lg border border-background-200/70">
                  <CircularGauge value={assessment.globalMaturityScore} size={52} strokeWidth={5} color="emerald" />
                  <div className="text-[10px] text-foreground-500 mt-1">Score Global</div>
                </div>
                <div className="text-center px-4 py-2 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="text-lg font-bold text-foreground-950">95</div>
                  <div className="text-[10px] text-foreground-500">Cible Q2 2027</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed bg-background-100 rounded-lg p-4 border border-background-200/70">{assessment.executiveSummary}</p>

            <div className="space-y-4">
              {assessment.pillars.map((p) => {
                const c = colorMap[p.color];
                return (
                  <div key={p.id} className={`rounded-xl border p-5 ${c.border} ${c.light}`}>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${c.bg}`}>
                            <i className={`${p.icon} text-lg ${c.text}`}></i>
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-foreground-950">{p.name}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${severityBadge[p.maturityLabel] || "bg-background-100 text-foreground-500 border-background-200"}`}>
                              {p.maturityLabel}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-foreground-950">{p.score}</span>
                          <span className="text-sm text-foreground-400">→ {p.target}</span>
                          <span className="text-xs text-emerald-600 flex items-center gap-0.5"><i className="ri-arrow-up-line"></i>{p.trend}</span>
                        </div>
                        <ProgressBar value={p.score} color={p.color} label="Progression vers la cible" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-background-200/50">
                      <div>
                        <h4 className="text-xs font-semibold text-emerald-700 mb-2 flex items-center gap-1"><i className="ri-checkbox-circle-line text-xs"></i>Forces</h4>
                        <ul className="space-y-1">
                          {p.strengths.map((s, i) => (
                            <li key={i} className="text-xs text-foreground-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-rose-700 mb-2 flex items-center gap-1"><i className="ri-error-warning-line text-xs"></i>Gaps</h4>
                        <ul className="space-y-1">
                          {p.gaps.map((g, i) => (
                            <li key={i} className="text-xs text-foreground-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ TAB 3: MODULES PROSPECTIFS ============ */}
        {activeTab === "modules" && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground-950">6 Modules de Recherche Prospective</h2>
                <p className="text-sm text-foreground-600 mt-1">Architecture modulaire pour transformer KOS en centre d'intelligence stratégique panafricain</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full border font-medium bg-red-50 text-red-700 border-red-200">2 P0</span>
                <span className="text-xs px-2 py-1 rounded-full border font-medium bg-amber-50 text-amber-700 border-amber-200">3 P1</span>
                <span className="text-xs px-2 py-1 rounded-full border font-medium bg-teal-50 text-teal-700 border-teal-200">1 P2</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {modules.map((mod) => {
                const c = colorMap[mod.color];
                return (
                  <div key={mod.id} className={`rounded-xl border p-5 ${c.border} ${c.light}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${c.bg}`}>
                          <i className={`${mod.icon} text-lg ${c.text}`}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground-950 leading-tight">{mod.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${priorityBadge[mod.priority] || "bg-background-100 text-foreground-500 border-background-200"}`}>
                              {mod.priority}
                            </span>
                            <span className="text-[10px] text-foreground-400">{mod.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-foreground-600 leading-relaxed mb-4">{mod.description}</p>
                    <div className="space-y-2 mb-4">
                      <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider">Livrables</h4>
                      {mod.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-white/60 rounded-lg p-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <i className="ri-file-text-line text-foreground-400 flex-shrink-0"></i>
                            <span className="text-foreground-950 truncate">{del.name}</span>
                          </div>
                          <span className="text-[10px] text-foreground-400 whitespace-nowrap ml-2">{del.frequency}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-background-200/50">
                      <div className="text-[11px] text-foreground-500">
                        <span className="flex items-center gap-1"><i className="ri-team-line text-xs"></i>{mod.team.analysts + 2} ETP</span>
                      </div>
                      <div className="text-[11px] font-semibold text-foreground-950">
                        {(mod.budgetFCFA / 1000000).toFixed(0)}M FCFA
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-background-200/50">
                      <p className="text-[10px] text-foreground-400 italic">{mod.expectedImpact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ TAB 4: PLAN MULTILINGUE ============ */}
        {activeTab === "multilingual" && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground-950">Plan de Contenu Trilingue — FR/EN/PT</h2>
                <p className="text-sm text-foreground-600 mt-1">Objectif : {stats.triLingualPagesTarget} pages trilingues d'ici Q4 2027</p>
              </div>
            </div>

            {/* Current vs Target */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { lang: contentPlan.currentState.fr, target: contentPlan.targetState.fr, label: "Français (FR)", flag: "🇫🇷", icon: "ri-flag-line", color: "emerald" },
                { lang: contentPlan.currentState.en, target: contentPlan.targetState.en, label: "English (EN)", flag: "🇬🇧", icon: "ri-global-line", color: "teal" },
                { lang: contentPlan.currentState.pt, target: contentPlan.targetState.pt, label: "Português (PT)", flag: "🇵🇹", icon: "ri-global-line", color: "amber" },
              ].map((item, i) => {
                const c = colorMap[item.color];
                return (
                  <div key={i} className={`rounded-xl border p-5 ${c.border} ${c.light}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{item.flag}</span>
                      <span className="text-sm font-bold text-foreground-950">{item.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-foreground-950">{item.lang.pages}</div>
                        <div className="text-[10px] text-foreground-400">Pages Actuelles</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-accent-500">{item.target.pages}</div>
                        <div className="text-[10px] text-foreground-400">Pages Cible</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <div className="text-sm font-bold text-foreground-950">{item.lang.monthlyTraffic.toLocaleString()}</div>
                        <div className="text-[10px] text-foreground-400">Sessions/mois</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <div className="text-sm font-bold text-primary-500">{item.target.monthlyTraffic.toLocaleString()}</div>
                        <div className="text-[10px] text-foreground-400">Sessions Cible</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <ProgressBar value={item.lang.seoScore} color={item.color} label="Score SEO Actuel" />
                      <ProgressBar value={item.target.seoScore} max={100} color="teal" label="Score SEO Cible" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Content Batches */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground-950 flex items-center gap-2">
                <i className="ri-stack-line text-amber-500"></i>
                Lots de Contenu par Langue
              </h3>
              {contentPlan.contentBatches.map((batch) => (
                <div key={batch.id} className="rounded-xl bg-background-50 border border-background-200/70 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{batch.language === "FR" ? "🇫🇷" : batch.language === "EN" ? "🇬🇧" : "🇵🇹"}</span>
                      <div>
                        <h4 className="text-base font-bold text-foreground-950">{batch.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityBadge[batch.priority] || ""}`}>{batch.priority}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground-950">+{batch.pagesTarget}</div>
                        <div className="text-[9px] text-foreground-400">pages cible</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-accent-500">{(batch.budgetPerYearFCFA / 1000000).toFixed(0)}M FCFA</div>
                        <div className="text-[9px] text-foreground-400">budget/an</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {batch.contentTypes.map((ct, i) => (
                      <div key={i} className="flex items-center justify-between bg-background-100 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <i className="ri-file-text-line text-foreground-400 flex-shrink-0 text-xs"></i>
                          <span className="text-xs text-foreground-950 truncate">{ct.type}</span>
                          <span className="text-[10px] text-foreground-400 whitespace-nowrap">×{ct.count}</span>
                        </div>
                        <span className="text-[10px] text-foreground-500 whitespace-nowrap">{ct.frequency}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {batch.kpis.map((kpi, i) => (
                      <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{kpi}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Countries Served */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { lang: contentPlan.languagesBreakdown.france, label: "Français", color: "emerald" },
                { lang: contentPlan.languagesBreakdown.english, label: "English", color: "teal" },
                { lang: contentPlan.languagesBreakdown.portuguese, label: "Português", color: "amber" },
              ].map((item, i) => {
                const c = colorMap[item.color];
                return (
                  <div key={i} className={`rounded-xl border p-5 ${c.border} ${c.light}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{item.lang.flag}</span>
                      <span className="text-sm font-bold text-foreground-950">{item.lang.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.lang.countriesServed.map((ct, j) => (
                        <span key={j} className="text-[10px] bg-white/60 text-foreground-600 px-2 py-0.5 rounded-full border border-background-200/50">{ct}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Editorial Calendar */}
            <div className="rounded-xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-calendar-check-line text-amber-400"></i>
                Calendrier Éditorial — Roadmap 12 Mois
              </h3>
              <div className="space-y-0">
                {contentPlan.editorialCalendar.quarters.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 relative">
                    {i < contentPlan.editorialCalendar.quarters.length - 1 && (
                      <div className="absolute left-[13px] top-8 bottom-0 w-px bg-white/20"></div>
                    )}
                    <div className="w-[26px] h-[26px] rounded-full bg-amber-500/30 border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-amber-400">{q.quarter}</span>
                      <ul className="mt-1 space-y-0.5">
                        {q.milestones.map((m, j) => (
                          <li key={j} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0"></span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 5: GOUVERNANCE ============ */}
        {activeTab === "governance" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground-950">{governance.governanceModel.name}</h2>
              <p className="text-sm text-foreground-600 mt-1">Version {governance.governanceModel.version} — Approuvé par {governance.governanceModel.approvedBy}</p>
            </div>

            {/* Organizational Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[
                {
                  name: governance.governanceModel.organizationalStructure.strategicCommittee.name,
                  members: governance.governanceModel.organizationalStructure.strategicCommittee.members,
                  frequency: governance.governanceModel.organizationalStructure.strategicCommittee.frequency,
                  responsibilities: governance.governanceModel.organizationalStructure.strategicCommittee.responsibilities,
                  icon: "ri-vip-crown-line",
                  color: "emerald",
                },
                {
                  name: governance.governanceModel.organizationalStructure.editorialBoard.name,
                  members: governance.governanceModel.organizationalStructure.editorialBoard.members,
                  frequency: governance.governanceModel.organizationalStructure.editorialBoard.frequency,
                  responsibilities: governance.governanceModel.organizationalStructure.editorialBoard.responsibilities,
                  icon: "ri-edit-line",
                  color: "teal",
                },
                {
                  name: governance.governanceModel.organizationalStructure.peerReviewPanel.name,
                  members: governance.governanceModel.organizationalStructure.peerReviewPanel.members,
                  frequency: governance.governanceModel.organizationalStructure.peerReviewPanel.frequency,
                  responsibilities: governance.governanceModel.organizationalStructure.peerReviewPanel.responsibilities,
                  icon: "ri-user-star-line",
                  color: "amber",
                },
              ].map((org, i) => {
                const c = colorMap[org.color];
                return (
                  <div key={i} className={`rounded-xl border p-5 ${c.border} ${c.light}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${c.bg}`}>
                        <i className={`${org.icon} text-lg ${c.text}`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground-950">{org.name}</h3>
                        <span className="text-[10px] text-foreground-400">Réunion {org.frequency}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Membres</h4>
                        <div className="flex flex-wrap gap-1">
                          {org.members.map((m, j) => (
                            <span key={j} className="text-[10px] bg-white/60 text-foreground-700 px-2 py-0.5 rounded-full border border-background-200/50">{m}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold text-foreground-500 uppercase tracking-wider mb-1.5">Responsabilités</h4>
                        <ul className="space-y-1">
                          {org.responsibilities.map((r, j) => (
                            <li key={j} className="text-xs text-foreground-600 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-foreground-400 mt-1.5 flex-shrink-0"></span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Regional Hubs */}
              <div className="rounded-xl border p-5 bg-indigo-50 border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100">
                    <i className="ri-map-pin-line text-lg text-indigo-700"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">{governance.governanceModel.organizationalStructure.regionalHubs.name}</h3>
                    <span className="text-[10px] text-foreground-400">{governance.governanceModel.organizationalStructure.regionalHubs.hubs.length} hubs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {governance.governanceModel.organizationalStructure.regionalHubs.hubs.map((hub, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/60 rounded-lg p-2.5">
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-foreground-950">{hub.region}</span>
                        <span className="block text-[10px] text-foreground-400">{hub.location}</span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <span className="text-xs font-bold text-foreground-950">{hub.coverage}</span>
                        <span className="block text-[10px] text-foreground-400">{hub.team} ETP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Control Protocol */}
            <div className="rounded-xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-check-double-line text-amber-400"></i>
                {governance.qualityControlProtocol.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {governance.qualityControlProtocol.steps.map((step, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center text-xs font-bold text-amber-400">{step.step}</span>
                      <span className="text-sm font-semibold text-white">{step.name}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 6: DIFFUSION ============ */}
        {activeTab === "diffusion" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground-950">Canaux de Diffusion des Insights</h2>
              <p className="text-sm text-foreground-600 mt-1">{governance.diffusionChannels.length} canaux — du temps réel à l'événementiel annuel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {governance.diffusionChannels.map((ch, i) => (
                <div key={i} className={`rounded-xl border p-5 bg-background-50 border-background-200/70 ${i === 0 ? "ring-2 ring-accent-200" : ""}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-100">
                      <i className={`${ch.icon} text-lg text-accent-600`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">{ch.name}</h3>
                      <span className="text-[10px] text-foreground-400">{ch.channel}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground-500">Fréquence</span>
                      <span className="font-medium text-foreground-950">{ch.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground-500">Audience</span>
                      <span className="font-medium text-foreground-950 truncate ml-2 max-w-[180px]">{ch.audience}</span>
                    </div>
                    {ch.expectedReach && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Portée estimée</span>
                        <span className="font-medium text-accent-600">{ch.expectedReach}</span>
                      </div>
                    )}
                    {ch.targetSubscribers && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Abonnés</span>
                        <span className="font-medium text-foreground-950">{ch.currentSubscribers?.toLocaleString()} / {ch.targetSubscribers?.toLocaleString()}</span>
                      </div>
                    )}
                    {ch.firstEdition && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">1ère édition</span>
                        <span className="font-medium text-primary-600">{ch.firstEdition}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-background-200/50">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                      ch.status.includes("Actif") ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      ch.status.includes("construction") || ch.status.includes("Lancement") ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-background-100 text-foreground-500 border-background-200"
                    }`}>{ch.status}</span>
                    <span className="text-xs font-semibold text-foreground-950">{ch.budgetFCFA > 0 ? `${(ch.budgetFCFA / 1000000).toFixed(1)}M FCFA` : "Gratuit"}</span>
                  </div>
                  {ch.features && (
                    <div className="mt-3 pt-3 border-t border-background-200/50">
                      <div className="flex flex-wrap gap-1">
                        {ch.features.map((f, j) => (
                          <span key={j} className="text-[9px] bg-background-200/70 text-foreground-600 px-1.5 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Budget Summary for Diffusion */}
            <div className="rounded-xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <i className="ri-funds-line text-amber-400"></i>
                Budget de Diffusion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {governance.budgetSummary.breakdown.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10 text-center">
                    <span className="text-lg font-bold text-white">{(item.amountFCFA / 1000000).toFixed(0)}M</span>
                    <span className="block text-[10px] text-gray-400 mt-1">{item.category}</span>
                    <span className="block text-[9px] text-gray-500 mt-0.5">{item.note}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-300 flex items-center gap-1.5">
                  <i className="ri-funds-box-line"></i>
                  {governance.budgetSummary.roiProjection}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 7: KPIs & BUDGET ============ */}
        {activeTab === "kpis" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground-950">Tableau de Bord — KPIs Trimestriels & Budget</h2>
              <p className="text-sm text-foreground-600 mt-1">Trajectoire {stats.globalScore} → {stats.globalTarget} sur 4 trimestres (Q3 2026 → Q2 2027)</p>
            </div>

            {/* Quarterly KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {governance.kpiDashboard.quarters.map((q, i) => (
                <div key={i} className={`rounded-xl border p-5 ${i === 3 ? "bg-emerald-50/50 border-emerald-200" : i === 2 ? "bg-teal-50/50 border-teal-200" : i === 1 ? "bg-amber-50/50 border-amber-200" : "bg-rose-50/50 border-rose-200"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-foreground-950">{q.quarter}</span>
                    <div className="w-14 h-14 flex items-center justify-center">
                      <CircularGauge value={q.targetScore} size={52} strokeWidth={4} color={i === 3 ? "emerald" : i === 2 ? "teal" : i === 1 ? "amber" : "rose"} />
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {q.milestones.map((m, j) => (
                      <li key={j} className="text-[10px] text-foreground-600 flex items-start gap-1.5">
                        <i className="ri-checkbox-blank-circle-line text-[8px] mt-0.5 flex-shrink-0 text-foreground-400"></i>
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-background-200/50 flex items-center justify-between">
                    <span className="text-[10px] text-foreground-400">Score cible</span>
                    <span className="text-sm font-bold text-foreground-950">{q.targetScore}/100</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Global KPIs Summary */}
            <div className="rounded-xl bg-background-50 border border-background-200/70 p-6">
              <h3 className="text-sm font-bold text-foreground-950 mb-6 flex items-center gap-2">
                <i className="ri-bar-chart-grouped-line text-amber-500"></i>
                Indicateurs Clés de Succès
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Score Maturité Global", current: stats.globalScore, target: stats.globalTarget, unit: "/100", color: "emerald" },
                  { label: "Pages Trilingues", current: stats.triLingualPagesCurrent, target: stats.triLingualPagesTarget, unit: "pages", color: "teal" },
                  { label: "Modules Prospectifs", current: 0, target: stats.modulesTotal, unit: "modules", color: "amber" },
                  { label: "Pays Couverts", current: 14, target: stats.countriesCovered, unit: "pays", color: "rose" },
                  { label: "Canaux de Diffusion", current: 1, target: stats.diffusionChannels, unit: "canaux", color: "violet" },
                  { label: "Niveaux de Gouvernance", current: 0, target: stats.governanceLayers, unit: "niveaux", color: "indigo" },
                  { label: "CA Cible Intelligence", current: 2850, target: 8500, unit: "M FCFA", color: "cyan" },
                  { label: "Team Intelligence", current: 45, target: stats.teamTargetSize, unit: "collaborateurs", color: "orange" },
                ].map((kpi, i) => {
                  const c = colorMap[kpi.color];
                  return (
                    <div key={i} className={`rounded-lg border p-4 ${c.border} ${c.light}`}>
                      <div className="text-xs text-foreground-500 mb-2">{kpi.label}</div>
                      <div className="flex items-end gap-2 mb-1">
                        <span className="text-xl font-bold text-foreground-950">{kpi.current.toLocaleString()}</span>
                        <span className="text-sm text-foreground-400">→ {kpi.target.toLocaleString()}</span>
                        <span className="text-[10px] text-foreground-400">{kpi.unit}</span>
                      </div>
                      <ProgressBar value={Math.round((kpi.current / kpi.target) * 100)} color={kpi.color} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revenue Projection */}
            <div className="rounded-xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <i className="ri-funds-box-line text-amber-400"></i>
                Projection de Revenus — Pôle Intelligence Stratégique
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white/8 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-white">2,85 Md</div>
                  <div className="text-xs text-gray-400 mt-1">CA Actuel Pôle Intelligence</div>
                  <div className="text-[10px] text-amber-400 mt-2">FCFA — 2026</div>
                </div>
                <div className="p-5 rounded-xl bg-white/8 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-amber-400">8,5 Md</div>
                  <div className="text-xs text-gray-400 mt-1">CA Cible Pôle Intelligence</div>
                  <div className="text-[10px] text-amber-400 mt-2">FCFA — 2028</div>
                </div>
                <div className="p-5 rounded-xl bg-white/8 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-emerald-400">×3</div>
                  <div className="text-xs text-gray-400 mt-1">Multiplicateur en 24 mois</div>
                  <div className="text-[10px] text-emerald-400 mt-2">ROI ×6 sur investissement</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Summary Bar */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-4">KOS Centre d'Intelligence Stratégique — Afrique Francophone™</h4>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground-500">
            <span className="flex items-center gap-1.5"><i className="ri-check-double-line text-emerald-500 text-sm"></i>Score Global : {stats.globalScore}/100 → Cible {stats.globalTarget}</span>
            <span className="text-foreground-300">|</span>
            <span className="flex items-center gap-1.5"><i className="ri-stack-line text-sm"></i>{stats.modulesTotal} modules · {stats.modulesP0} P0 · {stats.modulesP1} P1 · {stats.modulesP2} P2</span>
            <span className="text-foreground-300">|</span>
            <span className="flex items-center gap-1.5"><i className="ri-global-line text-sm"></i>{stats.countriesCovered} pays · {stats.languagesServed} langues</span>
            <span className="text-foreground-300">|</span>
            <span className="flex items-center gap-1.5"><i className="ri-funds-line text-sm"></i>{(stats.budgetAnnualFCFA / 1000000).toFixed(0)}M FCFA/an · ROI ×6</span>
            <span className="text-foreground-300">|</span>
            <span className="flex items-center gap-1.5"><i className="ri-team-line text-sm"></i>Équipe cible : {stats.teamTargetSize}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-background-200/50">
            <a href="/kos-research-institute" className="text-xs text-accent-700 hover:text-accent-800 font-medium flex items-center gap-1">
              <i className="ri-arrow-right-line"></i> Accéder au Khepra Research Institute™ — 64 publications · 105,2k téléchargements
            </a>
            <a href="/kos-strategic-intelligence" className="text-xs text-accent-700 hover:text-accent-800 font-medium flex items-center gap-1 mt-1">
              <i className="ri-arrow-right-line"></i> Accéder au KOS Strategic Intelligence Engine™ — 9 agents autonomes
            </a>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





