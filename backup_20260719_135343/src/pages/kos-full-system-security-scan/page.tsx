import { useState } from "react";
import { useKOSFullSystemSecurityScan } from "@/hooks/useKOSFullSystemSecurityScan";
import hubLayout from "@/components/feature/hubLayout";

const layers = [
  { id: "database" as const, label: "Base de données", icon: "ri-database-2-line" },
  { id: "edge_functions" as const, label: "Edge Functions", icon: "ri-function-line" },
  { id: "frontend" as const, label: "Frontend", icon: "ri-reactjs-line" },
  { id: "headers" as const, label: "Headers HTTP", icon: "ri-shield-keyhole-line" },
  { id: "npm_audit" as const, label: "NPM Audit", icon: "ri-npmjs-line" },
  { id: "owasp_top10" as const, label: "OWASP Top 10", icon: "ri-bug-line" },
];

const severityConfig: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "bg-red-600", text: "text-white", label: "CRITIQUE" },
  high: { bg: "bg-red-100", text: "text-red-700", label: "Haute" },
  medium: { bg: "bg-amber-100", text: "text-amber-700", label: "Moyenne" },
  low: { bg: "bg-secondary-100", text: "text-secondary-700", label: "Basse" },
};

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  critical: { bg: "bg-red-50 border-red-200", text: "text-red-700", label: "Critique", icon: "ri-close-circle-fill" },
  warning: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", label: "Attention", icon: "ri-error-warning-fill" },
  pass: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", label: "OK", icon: "ri-checkbox-circle-fill" },
};

const phaseConfig: Record<number, { bg: string; border: string; accent: string }> = {
  1: { bg: "bg-red-50", border: "border-red-300", accent: "bg-red-500" },
  2: { bg: "bg-amber-50", border: "border-amber-300", accent: "bg-amber-500" },
  3: { bg: "bg-secondary-50", border: "border-secondary-300", accent: "bg-secondary-500" },
};

export default function fullSystemSecurityScanPage() {
  const {
    findings,
    stats,
    loading,
    error,
    activeLayer,
    setActiveLayer,
    expandedFinding,
    setExpandedFinding,
    runFullScan,
    applyAutomatedFixes,
    applyingFixes,
    fixesApplied,
    rlsCheckResult,
  } = useKOSFullSystemSecurityScan();

  const [showUpgradePlan, setShowUpgradePlan] = useState(false);
  const [activePhase, setActivePhase] = useState(1);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 65) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-emerald-100 text-emerald-700";
    if (score >= 65) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const currentLayer = findings.layers[activeLayer];

  return (
    <hubLayout hubId={32}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
              KOS Full System Security Scan™
            </h1>
            <p className="text-sm text-foreground-600 mt-1">
              Analyse 360° — Base de données · Edge Functions · Frontend · Headers · NPM · OWASP Top 10
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-xs text-foreground-500">
              <div>Scan ID : {findings.scan_id}</div>
              <div>{new Date(findings.scan_timestamp).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
            </div>
            <button
              onClick={runFullScan}
              disabled={loading}
              className="whitespace-nowrap px-5 py-2.5 bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <i className={`${loading ? "ri-loader-4-line animate-spin" : "ri-radar-line"}`}></i>
              {loading ? "Scan..." : "Scanner"}
            </button>
            <button
              onClick={() => setShowUpgradePlan(!showUpgradePlan)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-md transition-colors text-sm font-medium flex items-center gap-2 cursor-pointer ${
                showUpgradePlan ? "bg-foreground-950 text-background-50" : "bg-background-100 text-foreground-700 hover:bg-background-200/70"
              }`}
            >
              <i className="ri-tools-line"></i>
              Plan Remédiation
            </button>
          </div>
        </div>

        {/* Global Score Banner */}
        <div className={`rounded-xl p-6 mb-6 border-2 ${
          findings.risk_level.includes("Élevé") ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="8" className="text-background-200/70" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="8"
                    strokeLinecap="round"
                    className={findings.overall_security_score < 70 ? "text-red-500" : "text-amber-500"}
                    strokeDasharray={`${findings.overall_security_score * 2.136} 213.6`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(findings.overall_security_score)}`}>
                    {findings.overall_security_score}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                  Score Global : {findings.overall_security_score}/100
                </div>
                <div className="text-sm text-foreground-600">Cible : {findings.overall_target}/100</div>
                <div className="text-sm font-medium text-red-600 mt-1">{findings.risk_level}</div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { v: stats.critical, l: "Critiques", c: "text-red-600" },
                { v: stats.high, l: "Hautes", c: "text-red-500" },
                { v: stats.medium, l: "Moyennes", c: "text-amber-600" },
                { v: stats.low, l: "Basses", c: "text-secondary-600" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${s.c}`}>{s.v}</div>
                  <div className="text-xs text-foreground-500">{s.l}</div>
                </div>
              ))}
            </div>
            {fixesApplied > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-center flex-shrink-0">
                <div className="text-emerald-600 text-sm font-medium">Correctifs auto</div>
                <div className="text-2xl font-bold text-emerald-700 font-[family-name:var(--font-heading)]">{fixesApplied}/{findings.automated_fixes_total}</div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        {/* Layer Navigation */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 overflow-x-auto">
          {layers.map(layer => {
            const ldata = findings.layers[layer.id];
            const st = ldata.status;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                  activeLayer === layer.id ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                }`}
              >
                <i className={layer.icon}></i>
                {layer.label}
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  st === "critical" ? "bg-red-100 text-red-700" :
                  st === "warning" ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>
                  {ldata.score}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layer Detail */}
        <div className="space-y-6">
          {/* Layer Header Card */}
          <div className={`rounded-xl p-5 border ${statusConfig[currentLayer.status].bg}`}>
            <div className="flex items-center gap-3 mb-3">
              <i className={`${currentLayer.icon} text-xl ${statusConfig[currentLayer.status].text}`}></i>
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">{currentLayer.label}</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getScoreBg(currentLayer.score)}`}>
                {currentLayer.score}/100 — Cible {currentLayer.target}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[currentLayer.status].bg} ${statusConfig[currentLayer.status].text}`}>
                {statusConfig[currentLayer.status].label}
              </span>
            </div>

            {/* Layer-specific KPIs */}
            <div className="flex flex-wrap gap-3 text-xs text-foreground-600">
              {activeLayer === "database" && (
                <>
                  <span>{currentLayer.total_tables} tables · RLS actif sur {currentLayer.tables_with_rls}</span>
                  <span className="text-red-600 font-medium">{currentLayer.critical_policies} politiques ALL+true</span>
                  <span>{currentLayer.total_policies} politiques totales</span>
                </>
              )}
              {activeLayer === "edge_functions" && (
                <>
                  <span>{currentLayer.total_functions} functions · {currentLayer.functions_with_jwt} avec JWT</span>
                  <span className="text-red-600 font-medium">{currentLayer.functions_without_jwt} sans JWT</span>
                </>
              )}
              {activeLayer === "headers" && (
                <>
                  <span>{Object.keys(currentLayer.headers).length} headers présents</span>
                  <span className="text-amber-600 font-medium">{currentLayer.missing_headers.length} manquants</span>
                </>
              )}
              {activeLayer === "frontend" && (
                <>
                  <span>{currentLayer.findings.length} problèmes détectés</span>
                </>
              )}
              {activeLayer === "npm_audit" && (
                <>
                  <span>{currentLayer.findings.length} vulnérabilités</span>
                </>
              )}
              {activeLayer === "owasp_top10" && (
                <>
                  <span>{currentLayer.items.filter((i: any) => i.status === "pass").length}/10 passés</span>
                  <span className="text-red-600 font-medium">{currentLayer.items.filter((i: any) => i.status === "fail").length} échoués</span>
                </>
              )}
            </div>
          </div>

          {/* OWASP Grid */}
          {activeLayer === "owasp_top10" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {currentLayer.items.map((item: any) => (
                <div key={item.id} className={`rounded-lg p-4 border ${
                  item.status === "fail" ? "bg-red-50 border-red-200" :
                  item.status === "warning" ? "bg-amber-50 border-amber-200" :
                  "bg-emerald-50 border-emerald-200"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground-500">{item.id}</span>
                    <span className={`text-xs font-medium ${getScoreColor(item.score)}`}>{item.score}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground-900 mb-1">{item.name}</div>
                  <div className="text-xs text-foreground-500">{item.detail.length > 80 ? item.detail.slice(0, 80) + "..." : item.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Headers Table */}
          {activeLayer === "headers" && (
            <>
              <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200/70 bg-background-50">
                        <th className="text-left py-3 px-4 font-medium text-foreground-700">Header</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground-700">Valeur</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground-700">Score</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground-700">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(currentLayer.headers).map(([key, h]: [string, any]) => (
                        <tr key={key} className="border-b border-background-100/70 hover:bg-background-50/50">
                          <td className="py-3 px-4 font-mono text-xs text-foreground-900">{key}</td>
                          <td className="py-3 px-4 text-xs text-foreground-600 break-all">{h.value}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`font-bold ${getScoreColor(h.score)}`}>{h.score}</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              h.status === "ok" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {h.status === "ok" ? "OK" : "À revoir"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {currentLayer.missing_headers.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-amber-800 mb-2">Headers Manquants</div>
                  <div className="flex flex-wrap gap-2">
                    {currentLayer.missing_headers.map((h: string) => (
                      <span key={h} className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{h}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Findings Cards - for database, frontend, edge_functions, npm, headers */}
          {["database", "frontend", "edge_functions", "npm_audit"].includes(activeLayer) && (
            <div className="space-y-3">
              {currentLayer.findings.map((finding: any) => {
                const sev = severityConfig[finding.severity];
                const isExpanded = expandedFinding === finding.id;
                return (
                  <div
                    key={finding.id}
                    className={`bg-white border rounded-lg transition-all ${
                      isExpanded ? "border-foreground-300/60 shadow-sm" : "border-background-200/70 hover:border-background-300/60"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFinding(isExpanded ? null : finding.id)}
                      className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
                    >
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${sev.bg} ${sev.text}`}>
                        {sev.label}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground-900">{finding.description}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {finding.automated !== undefined && (
                          <span className={`text-xs ${finding.automated ? "text-emerald-600" : "text-amber-600"}`}>
                            <i className={finding.automated ? "ri-robot-2-line" : "ri-user-line"}></i>
                            {" "}{finding.automated ? "Auto" : "Manuel"}
                          </span>
                        )}
                        <span className="text-xs text-foreground-400">{finding.effort}</span>
                        <i className={`text-foreground-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                          ri-arrow-down-s-line
                        </i>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100/70 pt-3 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {finding.table && (
                            <div>
                              <span className="text-foreground-500">Table :</span>
                              <span className="text-foreground-900 font-mono ml-1">{finding.table}</span>
                            </div>
                          )}
                          {finding.policy && (
                            <div>
                              <span className="text-foreground-500">Politique :</span>
                              <span className="text-foreground-900 font-mono ml-1">{finding.policy}</span>
                            </div>
                          )}
                          {finding.function_name && (
                            <div>
                              <span className="text-foreground-500">Fonction :</span>
                              <span className="text-foreground-900 font-mono ml-1">{finding.function_name}</span>
                            </div>
                          )}
                          {finding.package && (
                            <div>
                              <span className="text-foreground-500">Package :</span>
                              <span className="text-foreground-900 font-mono ml-1">{finding.package}</span>
                            </div>
                          )}
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <div className="text-xs font-medium text-red-700 mb-1">Impact</div>
                          <div className="text-xs text-red-600">{finding.impact}</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <div className="text-xs font-medium text-emerald-700 mb-1">Remédiation</div>
                          <div className="text-xs text-emerald-600">{finding.remediation}</div>
                        </div>
                        {finding.locations && (
                          <div className="bg-background-50 rounded-lg p-3">
                            <div className="text-xs font-medium text-foreground-700 mb-1">Emplacements</div>
                            <div className="space-y-1">
                              {finding.locations.map((loc: string, i: number) => (
                                <div key={i} className="text-xs font-mono text-foreground-500">{loc}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Headers Findings */}
          {activeLayer === "headers" && (
            <div className="space-y-3">
              {currentLayer.findings.map((finding: any) => {
                const sev = severityConfig[finding.severity];
                const isExpanded = expandedFinding === finding.id;
                return (
                  <div key={finding.id} className="bg-white border border-background-200/70 rounded-lg">
                    <button
                      onClick={() => setExpandedFinding(isExpanded ? null : finding.id)}
                      className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
                    >
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${sev.bg} ${sev.text}`}>
                        {sev.label}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground-900">{finding.description}</span>
                      <span className="text-xs text-foreground-400">{finding.effort}</span>
                      <i className={`text-foreground-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>ri-arrow-down-s-line</i>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-100/70 pt-3">
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <div className="text-xs font-medium text-emerald-700 mb-1">Remédiation</div>
                          <div className="text-xs text-emerald-600">{finding.remediation}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upgrade Plan Modal-ish */}
        {showUpgradePlan && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                <i className="ri-tools-line mr-2 text-primary-500"></i>
                Plan de Remédiation — 72 Heures
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-foreground-500">Effort total :</span>
                <span className="font-semibold text-foreground-950">{findings.upgrade_plan.total_effort_hours}h</span>
                <span className="text-foreground-400">·</span>
                <span className="text-foreground-500">Score projeté :</span>
                <span className="font-semibold text-emerald-600">{findings.upgrade_plan.estimated_score_after}/100</span>
              </div>
            </div>

            {/* Phase Tabs */}
            <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 w-fit">
              {findings.upgrade_plan.phases.map(p => (
                <button
                  key={p.phase}
                  onClick={() => setActivePhase(p.phase)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    activePhase === p.phase ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                  }`}
                >
                  Phase {p.phase} — {p.label.split("—")[0].trim()}
                </button>
              ))}
            </div>

            {/* Phase Content */}
            {findings.upgrade_plan.phases.filter(p => p.phase === activePhase).map(phase => {
              const cfg = phaseConfig[phase.phase as keyof typeof phaseConfig];
              return (
                <div key={phase.phase} className={`rounded-xl border-2 ${cfg.border} ${cfg.bg} p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${cfg.accent}`}></span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                        Phase {phase.phase} — {phase.label}
                      </h3>
                      <p className="text-xs text-foreground-500">{phase.timeframe}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {phase.actions.map(action => (
                      <div key={action.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-background-200/70">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          action.status === "pending" ? "bg-amber-400" : "bg-emerald-500"
                        }`}></span>
                        <span className="text-xs font-mono text-foreground-400 flex-shrink-0 w-16">{action.id}</span>
                        <span className="flex-1 text-sm text-foreground-900">{action.action}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          action.automated ? "bg-emerald-100 text-emerald-700" : "bg-secondary-100 text-secondary-700"
                        }`}>
                          {action.automated ? "Auto" : "Manuel"}
                        </span>
                        <span className="text-xs text-foreground-400 flex-shrink-0">{action.effort}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                          action.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {action.status === "pending" ? "En attente" : "Fait"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Apply Automated Fixes Button */}
            <div className="bg-white border border-background-200/70 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                    Correctifs Automatisés
                  </div>
                  <div className="text-sm text-foreground-500 mt-1">
                    {findings.upgrade_plan.critical_fixes_count} fixes critiques · {findings.upgrade_plan.high_fixes_count} hautes · {findings.upgrade_plan.medium_fixes_count} moyennes
                  </div>
                  {findings.drops_blocked_by_readdy > 0 && (
                    <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <i className="ri-information-line"></i>
                      {findings.drops_blocked_reason}
                    </div>
                  )}
                </div>
                <button
                  onClick={applyAutomatedFixes}
                  disabled={applyingFixes || fixesApplied >= findings.automated_fixes_total}
                  className="whitespace-nowrap px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <i className={`${applyingFixes ? "ri-loader-4-line animate-spin" : "ri-shield-flash-line"}`}></i>
                  {applyingFixes ? `Application ${fixesApplied}/${findings.automated_fixes_total}...` :
                   fixesApplied >= findings.automated_fixes_total ? "Tous appliqués" :
                   "Appliquer les correctifs auto"}
                </button>
              </div>
              {fixesApplied > 0 && (
                <div className="mt-4 w-full bg-background-100 rounded-full h-2.5 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(fixesApplied / findings.automated_fixes_total) * 100}%` }}></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scan Comparison */}
        <div className="mt-8 bg-white border border-background-200/70 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
            <i className="ri-history-line mr-2"></i>
            Évolution de la Posture de Sécurité
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-background-50 rounded-lg p-4">
              <div className="text-xs text-foreground-500 mb-1">Scan précédent</div>
              <div className="text-sm font-medium text-foreground-900">{findings.scan_comparison.previous_scan_date}</div>
              <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(findings.scan_comparison.previous_score)} mt-2`}>
                {findings.scan_comparison.previous_score}/100
              </div>
            </div>
            <div className="bg-background-50 rounded-lg p-4">
              <div className="text-xs text-foreground-500 mb-1">Scan actuel</div>
              <div className="text-sm font-medium text-foreground-900">{findings.scan_id}</div>
              <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(findings.scan_comparison.current_score)} mt-2`}>
                {findings.scan_comparison.current_score}/100
              </div>
              <div className="text-xs text-red-500 mt-1">
                {findings.scan_comparison.delta} pts — {findings.scan_comparison.delta_reason}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Gaps */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-verified-badge-line text-amber-600"></i>
              <span className="text-sm font-medium text-amber-800">ISO 27001:2022</span>
            </div>
            <div className="text-xs text-amber-700">{stats.compliance_gap_iso27001}</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-building-4-line text-amber-600"></i>
              <span className="text-sm font-medium text-amber-800">SOC 2 Type II</span>
            </div>
            <div className="text-xs text-amber-700">{stats.compliance_gap_soc2}</div>
          </div>
        </div>

      </div>
    </hubLayout>
  );
}



