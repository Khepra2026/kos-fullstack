import { useState } from "react";
import { useSecurityScan } from "@/hooks/useSecurityScan";
import { iso27001Compliance, nistCSFProfile, socOperations, enterpriseSecurityStats } from "@/mocks/enterpriseSecurityFull";
import hubLayout from '@/components/feature/hubLayout';

export default function securityCommandPage() {
  const { data, stats, loading, error, runScan } = useSecurityScan();
  const [activeTab, setActiveTab] = useState<"overview" | "owasp" | "iso27001" | "nist" | "soc" | "headers" | "vulnerabilities" | "compliance">("overview");
  const [selectedIsoDomain, setSelectedIsoDomain] = useState<string | null>(null);
  const [selectedNistFunction, setSelectedNistFunction] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [isoFilter, setIsoFilter] = useState<"all" | "conform" | "partial" | "gaps">("all");

  const tabs = [
    { id: "overview" as const, label: "Vue d'Ensemble", icon: "ri-radar-line", badge: null },
    { id: "owasp" as const, label: "OWASP Top 10", icon: "ri-bug-line", badge: `${data.owasp_top10_compliance.filter((i: any) => i.status === "pass").length}/10` },
    { id: "iso27001" as const, label: "ISO 27001", icon: "ri-verified-badge-line", badge: `${iso27001Compliance.overall_score}%` },
    { id: "nist" as const, label: "NIST CSF 2.0", icon: "ri-building-4-line", badge: `${nistCSFProfile.overall_score}%` },
    { id: "soc" as const, label: "SOC 24/7", icon: "ri-radar-line", badge: `${socOperations.active_alerts.length} actif` },
    { id: "headers" as const, label: "Headers HTTP", icon: "ri-code-line", badge: null },
    { id: "vulnerabilities" as const, label: "Vulnérabilités", icon: "ri-alert-line", badge: `${data.vulnerabilities.length}` },
    { id: "compliance" as const, label: "Conformité", icon: "ri-award-line", badge: null },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 75) return "text-amber-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-700";
    if (score >= 75) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const getSeverityBadge = (severity: string) => {
    const map: Record<string, string> = {
      high: "bg-red-100 text-red-700",
      medium: "bg-amber-100 text-amber-700",
      low: "bg-secondary-100 text-secondary-700",
      critical: "bg-red-600 text-white",
    };
    return map[severity] || "bg-background-100 text-foreground-600";
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pass: "bg-emerald-100 text-emerald-700",
      conform: "bg-emerald-100 text-emerald-700",
      partial: "bg-amber-100 text-amber-700",
      review: "bg-amber-100 text-amber-700",
      strong: "bg-emerald-100 text-emerald-700",
      adequate: "bg-secondary-100 text-secondary-700",
      needs_improvement: "bg-red-100 text-red-700",
      resolved: "bg-emerald-100 text-emerald-700",
      investigating: "bg-amber-100 text-amber-700",
      acknowledged: "bg-secondary-100 text-secondary-700",
      triaging: "bg-background-100 text-foreground-600",
    };
    return map[status] || "bg-background-100 text-foreground-600";
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pass: "OK",
      conform: "Conforme",
      partial: "Partiel",
      review: "À revoir",
      strong: "Fort",
      adequate: "Adéquat",
      needs_improvement: "À améliorer",
      resolved: "Résolu",
      investigating: "En cours",
      acknowledged: "Acquitté",
      triaging: "Triage",
      available: "Disponible",
      on_leave: "En congé",
    };
    return map[status] || status;
  };

  const selectedDomain = iso27001Compliance.domains.find(d => d.id === selectedIsoDomain);
  const selectedFunction = nistCSFProfile.functions.find(f => f.id === selectedNistFunction);
  const selectedInc = socOperations.recent_incidents.find(i => i.id === selectedIncident);

  const filteredIsoDomains = iso27001Compliance.domains.filter(d => {
    if (isoFilter === "conform") return d.status === "conform";
    if (isoFilter === "partial") return d.status === "partial";
    if (isoFilter === "gaps") return d.controls_failed > 0;
    return true;
  });

  return (
    <hubLayout hubId={31}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
              KOS Enterprise Security™
            </h1>
            <p className="text-sm text-foreground-600 mt-1">
              OWASP Top 10 · ISO 27001:2022 · NIST CSF 2.0 · SOC 24/7 — Governance, Risk & Compliance automatisé
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-xs text-foreground-500">
              <div>Certifications : {enterpriseSecurityStats.certifications_held}/{enterpriseSecurityStats.certifications_target}</div>
              <div>Posture : <span className="text-amber-600 font-medium">{enterpriseSecurityStats.risk_posture}</span></div>
            </div>
            <button
              onClick={runScan}
              disabled={loading}
              className="whitespace-nowrap px-5 py-2.5 bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <i className={`${loading ? "ri-loader-4-line animate-spin" : "ri-shield-flash-line"}`}></i>
              {loading ? "Scan..." : "Lancer Scan"}
            </button>
          </div>
        </div>

        {/* Enterprise Security KPIs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          {[
            { label: "Score Global", value: data.score, icon: "ri-shield-check-line", color: getScoreColor(data.score), target: 95 },
            { label: "ISO 27001", value: enterpriseSecurityStats.iso27001_progress, icon: "ri-verified-badge-line", color: getScoreColor(enterpriseSecurityStats.iso27001_progress), target: 100 },
            { label: "NIST CSF", value: enterpriseSecurityStats.nist_csf_score, icon: "ri-building-4-line", color: getScoreColor(enterpriseSecurityStats.nist_csf_score), target: 95 },
            { label: "SOC Uptime", value: enterpriseSecurityStats.soc_uptime, icon: "ri-radar-line", color: "text-emerald-600", target: 99.99, suffix: "%" },
            { label: "MTTD", value: socOperations.mttd_current, icon: "ri-timer-line", color: "text-amber-600", target: 5, suffix: "min" },
            { label: "SLA", value: socOperations.sla_compliance, icon: "ri-contract-line", color: "text-emerald-600", target: 100, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                <i className={stat.icon + " " + stat.color}></i>
                {stat.label}
              </div>
              <div className={`text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] ${stat.color}`}>
                {stat.value}{stat.suffix || "/100"}
              </div>
              <div className="text-xs text-foreground-400 mt-0.5">Cible : {stat.target}{stat.suffix || ""}</div>
            </div>
          ))}
        </div>

        {/* Big Four Gap */}
        <div className="bg-white border border-background-200/70 rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground-700">
              Progression vers Certification ISO 27001 & NIST CSF Tier 3
            </span>
            <span className="text-xs text-foreground-500">
              Prochain audit : {enterpriseSecurityStats.next_audit}
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-foreground-500 mb-1">
                <span>ISO 27001:2022</span>
                <span>{iso27001Compliance.overall_score}% — {iso27001Compliance.controls_passed}/{iso27001Compliance.total_controls} contrôles</span>
              </div>
              <div className="w-full bg-background-100 rounded-full h-2.5 overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${iso27001Compliance.overall_score}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-foreground-500 mb-1">
                <span>NIST CSF 2.0</span>
                <span>{nistCSFProfile.overall_score}% — {nistCSFProfile.current_tier}</span>
              </div>
              <div className="w-full bg-background-100 rounded-full h-2.5 overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full transition-all" style={{ width: `${nistCSFProfile.overall_score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700 flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-background-100 rounded-full p-1 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              {tab.badge && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id ? "bg-primary-100 text-primary-700" : "bg-background-200/70 text-foreground-500"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW ============ */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Alerts Actives */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                  <i className="ri-alert-line text-red-500 mr-2"></i>
                  Alertes Actives SOC 24/7
                </h2>
                <span className="text-xs text-foreground-500">{socOperations.active_alerts.length} alertes en cours</span>
              </div>
              <div className="space-y-2">
                {socOperations.active_alerts.map(alert => (
                  <div key={alert.id} className="flex items-center gap-3 p-3 bg-background-50 rounded-lg">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity === "high" ? "Haute" : alert.severity === "medium" ? "Moyenne" : "Basse"}
                    </span>
                    <span className="text-sm font-medium text-foreground-900">{alert.type}</span>
                    <span className="text-xs text-foreground-500">{alert.source} → {alert.target}</span>
                    <span className="text-xs text-foreground-400 ml-auto">{new Date(alert.timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                      {getStatusLabel(alert.status)}
                    </span>
                    <span className="text-xs text-foreground-400">TTR: {alert.ttr} min</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ISO 27001 + NIST summary cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-background-200/70 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                  <i className="ri-verified-badge-line text-primary-500 mr-2"></i>
                  ISO 27001:2022 — Statut Certification
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600 font-[family-name:var(--font-heading)]">{iso27001Compliance.overall_score}%</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground-900">{iso27001Compliance.maturity_level}</div>
                    <div className="text-sm text-foreground-500">Cible : Certifié ({iso27001Compliance.target_certification})</div>
                    <div className="text-sm text-foreground-500">{iso27001Compliance.controls_passed}/{iso27001Compliance.total_controls} contrôles passés · {iso27001Compliance.critical_gaps.length} gaps critiques</div>
                  </div>
                </div>
                <div className="text-xs text-foreground-500 mt-2">
                  Dernier audit : {iso27001Compliance.audit_trail[0].date} — {iso27001Compliance.audit_trail[0].event}
                </div>
              </div>

              <div className="bg-white border border-background-200/70 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                  <i className="ri-building-4-line text-accent-500 mr-2"></i>
                  NIST CSF 2.0 — Profil Actuel
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {nistCSFProfile.functions.map(fn => (
                    <div key={fn.id} className="flex items-center gap-2 bg-background-50 rounded-lg px-3 py-2">
                      <span className="text-xs font-semibold text-foreground-700">{fn.id}</span>
                      <span className={`text-sm font-bold ${getScoreColor(fn.score)}`}>{fn.score}%</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-foreground-700">
                  Tier actuel : <span className="font-semibold text-accent-600">{nistCSFProfile.current_tier}</span> → Cible : <span className="font-semibold text-emerald-600">{nistCSFProfile.target_profile}</span>
                </div>
              </div>
            </div>

            {/* Historique */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Historique des Scans</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70 bg-background-50">
                      <th className="text-left py-3 px-4 font-medium text-foreground-700">Date</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Score</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Problèmes</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Résolus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.scan_history.map((scan: any, i: number) => (
                      <tr key={i} className="border-b border-background-100/70">
                        <td className="py-3 px-4 font-medium text-foreground-900">{scan.date}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`font-bold ${getScoreColor(scan.score)}`}>{scan.score}</span>
                        </td>
                        <td className="py-3 px-4 text-center text-foreground-700">{scan.issues_found}</td>
                        <td className="py-3 px-4 text-center text-emerald-600">{scan.issues_fixed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============ OWASP ============ */}
        {activeTab === "owasp" && (
          <div className="space-y-4">
            <div className="bg-white border border-background-200/70 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200/70 bg-background-50">
                      <th className="text-left py-3 px-4 font-medium text-foreground-700">Catégorie OWASP Top 10</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Score</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Statut</th>
                      <th className="text-center py-3 px-4 font-medium text-foreground-700">Écart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.owasp_top10_compliance.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-background-100/70 hover:bg-background-50/50">
                        <td className="py-3 px-4 font-medium text-foreground-900">{item.category}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 ${getScoreColor(item.score)}`}>
                            <strong>{item.score}</strong>/100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-xs font-medium ${item.score >= 85 ? "text-emerald-600" : "text-amber-600"}`}>
                            {item.score >= 85 ? "—" : `+${85 - item.score} pts`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============ ISO 27001 ============ */}
        {activeTab === "iso27001" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Domains List */}
            <div className="lg:col-span-2 bg-white border border-background-200/70 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)]">
                  Annexe A — 14 Domaines ({iso27001Compliance.total_controls} contrôles)
                </h2>
                <div className="flex items-center gap-1 bg-background-100 rounded-full p-1">
                  {(["all", "conform", "partial", "gaps"] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setIsoFilter(f)}
                      className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        isoFilter === f ? "bg-white text-foreground-950 shadow-sm" : "text-foreground-500 hover:text-foreground-700"
                      }`}
                    >
                      {f === "all" ? "Tous" : f === "conform" ? "Conformes" : f === "partial" ? "Partiels" : "Gaps"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                {filteredIsoDomains.map(domain => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedIsoDomain(selectedIsoDomain === domain.id ? null : domain.id)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedIsoDomain === domain.id ? "bg-primary-50 border border-primary-200" : "bg-background-50 hover:bg-background-100 border border-transparent"
                    }`}
                  >
                    <span className="text-xs font-bold text-foreground-400 w-10">{domain.id}</span>
                    <span className="flex-1 text-sm font-medium text-foreground-900">{domain.name}</span>
                    <span className={`text-sm font-bold ${getScoreColor(domain.score)}`}>{domain.score}%</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(domain.status)}`}>
                      {getStatusLabel(domain.status)}
                    </span>
                    <span className="text-xs text-foreground-400">{domain.controls_passed}/{domain.controls_total}</span>
                    {selectedIsoDomain === domain.id ? <i className="ri-arrow-up-s-line text-foreground-400"></i> : <i className="ri-arrow-down-s-line text-foreground-400"></i>}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Detail */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              {selectedDomain ? (
                <div>
                  <h3 className="text-base font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-1">
                    {selectedDomain.id} — {selectedDomain.name}
                  </h3>
                  <div className="text-xs text-foreground-500 mb-4">
                    Lead : {selectedDomain.lead} · Revue : {selectedDomain.last_review}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-foreground-500 mb-1">
                        <span>Conformité</span>
                        <span>{selectedDomain.controls_passed}/{selectedDomain.controls_total} contrôles</span>
                      </div>
                      <div className="w-full bg-background-100 rounded-full h-2 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${selectedDomain.score >= 80 ? "bg-emerald-500" : "bg-amber-500"}`}
                          style={{ width: `${selectedDomain.score}%` }}></div>
                      </div>
                    </div>
                    <div className="text-sm text-foreground-700">
                      Score : <span className={`font-bold ${getScoreColor(selectedDomain.score)}`}>{selectedDomain.score}/100</span>
                    </div>
                    <div className="p-3 bg-background-50 rounded-lg">
                      <div className="text-xs font-medium text-foreground-700 mb-1">Actions Recommandées</div>
                      <ul className="text-xs text-foreground-500 space-y-1">
                        <li>· Formaliser les procédures documentées</li>
                        <li>· Planifier revue trimestrielle avec le lead</li>
                        {selectedDomain.controls_failed > 0 && (
                          <li className="text-red-600">· Résoudre {selectedDomain.controls_failed} contrôles non conformes</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-foreground-400 py-8">
                  <i className="ri-mouse-line text-2xl block mb-2"></i>
                  <span className="text-sm">Sélectionnez un domaine</span>
                </div>
              )}
            </div>

            {/* Critical Gaps */}
            <div className="lg:col-span-3 bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                <i className="ri-error-warning-line text-red-500 mr-2"></i>
                Gaps Critiques ({iso27001Compliance.critical_gaps.length})
              </h2>
              <div className="space-y-2">
                {iso27001Compliance.critical_gaps.map(gap => (
                  <div key={gap.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-background-50 rounded-lg">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getSeverityBadge(gap.severity)}`}>
                      {gap.severity === "high" ? "Haute" : "Moyenne"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground-900">{gap.description}</div>
                      <div className="text-xs text-foreground-500 mt-0.5">{gap.domain} — Contrôle {gap.control}</div>
                    </div>
                    <div className="text-xs text-foreground-500 text-right flex-shrink-0">
                      <div>Deadline : {gap.remediation_deadline}</div>
                      <div className="font-medium text-foreground-700">{gap.estimated_cost_fcfa.toLocaleString("fr-FR")} FCFA</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ NIST CSF ============ */}
        {activeTab === "nist" && (
          <div className="space-y-6">
            {/* Functions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {nistCSFProfile.functions.map(fn => (
                <button
                  key={fn.id}
                  onClick={() => setSelectedNistFunction(selectedNistFunction === fn.id ? null : fn.id)}
                  className={`text-left bg-white border rounded-lg p-4 transition-all cursor-pointer ${
                    selectedNistFunction === fn.id ? "border-accent-300 ring-1 ring-accent-200" : "border-background-200/70 hover:border-background-300/60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-foreground-400">{fn.id}</span>
                    <span className="text-xs text-foreground-500">{fn.name}</span>
                  </div>
                  <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(fn.score)}`}>
                    {fn.score}%
                  </div>
                  <div className="text-xs text-foreground-400 mt-1">Cible : {fn.target}%</div>
                  <div className="w-full bg-background-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${fn.score >= 85 ? "bg-emerald-500" : fn.score >= 75 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${fn.score}%` }}></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Function Detail */}
            {selectedFunction && (
              <div className="bg-white border border-accent-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-2">
                  {selectedFunction.id} — {selectedFunction.name}
                </h2>
                <p className="text-sm text-foreground-600 mb-4">{selectedFunction.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedFunction.categories.map(cat => (
                    <div key={cat.id} className="bg-background-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-foreground-500">{cat.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(cat.status)}`}>
                          {getStatusLabel(cat.status)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-foreground-900">{cat.name}</div>
                      <div className={`text-lg font-bold mt-1 ${getScoreColor(cat.score)}`}>{cat.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Roadmap */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                <i className="ri-road-map-line text-accent-500 mr-2"></i>
                Roadmap d'Amélioration NIST CSF
              </h2>
              <div className="space-y-2">
                {nistCSFProfile.improvement_roadmap.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-background-50 rounded-lg">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      item.priority === "critical" ? "bg-red-600 text-white" : item.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.priority === "critical" ? "Critique" : item.priority === "high" ? "Haute" : "Moyenne"}
                    </span>
                    <span className="text-xs font-bold text-foreground-400 flex-shrink-0">{item.function}</span>
                    <span className="flex-1 text-sm text-foreground-900">{item.action}</span>
                    <span className="text-xs text-foreground-500 flex-shrink-0">{item.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ SOC 24/7 ============ */}
        {activeTab === "soc" && (
          <div className="space-y-6">
            {/* SOC KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Uptime", value: `${socOperations.uptime_current}%`, target: `${socOperations.uptime_target}%`, icon: "ri-check-double-line", color: "text-emerald-600" },
                { label: "MTTD", value: `${socOperations.mttd_current} min`, target: `${socOperations.mttd_target} min`, icon: "ri-timer-line", color: socOperations.mttd_current <= 15 ? "text-emerald-600" : "text-amber-600" },
                { label: "MTTR", value: `${socOperations.mttr_current} min`, target: `${socOperations.mttr_target} min`, icon: "ri-heart-pulse-line", color: socOperations.mttr_current <= 20 ? "text-emerald-600" : "text-amber-600" },
                { label: "SLA", value: `${socOperations.sla_compliance}%`, target: "100%", icon: "ri-contract-line", color: "text-emerald-600" },
                { label: "Alertes 24h", value: socOperations.kpi_trends.alerts_24h.value, target: "↓", icon: "ri-notification-3-line", color: "text-amber-600" },
                { label: "Faux Positifs", value: `${socOperations.kpi_trends.false_positive_rate.value}%`, target: "↓", icon: "ri-filter-off-line", color: "text-emerald-600" },
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-background-200/70 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs text-foreground-500 mb-2">
                    <i className={kpi.icon + " " + kpi.color}></i>
                    {kpi.label}
                  </div>
                  <div className={`text-xl font-bold font-[family-name:var(--font-heading)] ${kpi.color}`}>
                    {kpi.value}
                  </div>
                  <div className="text-xs text-foreground-400 mt-0.5">Cible : {kpi.target}</div>
                </div>
              ))}
            </div>

            {/* Active Alerts */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                <i className="ri-notification-3-line text-red-500 mr-2"></i>
                Alertes Actives
              </h2>
              <div className="space-y-2">
                {socOperations.active_alerts.map(alert => (
                  <div key={alert.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-background-50 rounded-lg">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity === "high" ? "Haute" : alert.severity === "medium" ? "Moyenne" : "Basse"}
                    </span>
                    <span className="text-sm font-medium text-foreground-900">{alert.type}</span>
                    <span className="text-xs text-foreground-500">{alert.source} → {alert.target}</span>
                    <span className="text-xs text-foreground-400">{alert.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                      {getStatusLabel(alert.status)}
                    </span>
                    <span className="text-xs text-foreground-500">Analyste : {alert.analyst}</span>
                    <span className="text-xs text-foreground-400">TTR: {alert.ttr} min</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Incidents + Team */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Incidents */}
              <div className="lg:col-span-2 bg-white border border-background-200/70 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                  <i className="ri-history-line mr-2"></i>
                  Incidents Récents
                </h2>
                <div className="space-y-2">
                  {socOperations.recent_incidents.map(inc => (
                    <button
                      key={inc.id}
                      onClick={() => setSelectedIncident(selectedIncident === inc.id ? null : inc.id)}
                      className={`w-full text-left flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg transition-colors cursor-pointer ${
                        selectedIncident === inc.id ? "bg-primary-50 border border-primary-200" : "bg-background-50 hover:bg-background-100"
                      }`}
                    >
                      <span className="text-xs font-bold text-foreground-400 flex-shrink-0">{inc.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getSeverityBadge(inc.severity)}`}>
                        {inc.severity === "high" ? "Haute" : inc.severity === "medium" ? "Moyenne" : "Basse"}
                      </span>
                      <span className="text-sm font-medium text-foreground-900 flex-1">{inc.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusBadge(inc.status)}`}>
                        {getStatusLabel(inc.status)}
                      </span>
                      <span className="text-xs text-foreground-400 flex-shrink-0">{inc.duration_min} min</span>
                    </button>
                  ))}
                </div>
                {selectedInc && (
                  <div className="mt-4 p-4 bg-background-50 rounded-lg">
                    <div className="text-sm font-semibold text-foreground-900 mb-2">{selectedInc.id} — Détail</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-foreground-500">Début :</span> <span className="text-foreground-900">{selectedInc.start}</span></div>
                      <div><span className="text-foreground-500">Fin :</span> <span className="text-foreground-900">{selectedInc.end}</span></div>
                      <div><span className="text-foreground-500">Impact :</span> <span className="text-foreground-900">{selectedInc.impact}</span></div>
                      <div><span className="text-foreground-500">Analyste :</span> <span className="text-foreground-900">{selectedInc.analyst}</span></div>
                      <div className="col-span-2"><span className="text-foreground-500">Résolution :</span> <span className="text-foreground-900">{selectedInc.resolution}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* SOC Team */}
              <div className="bg-white border border-background-200/70 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                  <i className="ri-team-line mr-2"></i>
                  Équipe SOC
                </h2>
                <div className="space-y-2">
                  {socOperations.team.map(member => (
                    <div key={member.name} className="p-3 bg-background-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${member.availability === "available" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        <span className="text-sm font-medium text-foreground-900">{member.name}</span>
                      </div>
                      <div className="text-xs text-foreground-500">{member.role}</div>
                      <div className="text-xs text-foreground-400">{member.shift}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.certs.slice(0, 3).map((cert: string) => (
                          <span key={cert} className="px-1.5 py-0.5 bg-background-200/70 rounded text-xs text-foreground-500">{cert}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ HEADERS ============ */}
        {activeTab === "headers" && (
          <div className="bg-white border border-background-200/70 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Headers de Sécurité HTTP</h2>
            <div className="space-y-2">
              {Object.entries(data.security_headers).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-background-50 rounded-lg">
                  <span className="text-sm font-mono font-medium text-foreground-900 w-48 flex-shrink-0">{key}:</span>
                  <span className="text-sm font-mono text-foreground-600 break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ VULNERABILITIES ============ */}
        {activeTab === "vulnerabilities" && (
          <div className="space-y-3">
            {data.vulnerabilities.length === 0 ? (
              <div className="bg-white border border-background-200/70 rounded-lg p-8 text-center text-foreground-500">
                <i className="ri-check-double-line text-3xl text-emerald-500 block mb-2"></i>
                Aucune vulnérabilité détectée
              </div>
            ) : (
              data.vulnerabilities.map((vuln: any, i: number) => (
                <div key={i} className="bg-white border border-background-200/70 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      vuln.severity === "high" ? "bg-red-100 text-red-700" :
                      vuln.severity === "medium" ? "bg-amber-100 text-amber-700" :
                      "bg-secondary-100 text-secondary-700"
                    }`}>
                      {vuln.severity === "high" ? "Haute" : vuln.severity === "medium" ? "Moyenne" : "Basse"}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-foreground-900">{vuln.type.replace(/_/g, " ")}</div>
                      <div className="text-sm text-foreground-600 mt-1">{vuln.description}</div>
                      <div className="text-xs text-foreground-500 mt-2 bg-background-50 p-2 rounded">
                        <i className="ri-lightbulb-line mr-1"></i>
                        {vuln.recommendation}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ============ COMPLIANCE ============ */}
        {activeTab === "compliance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(data.compliance_score).map(([key, val]: any) => (
                <div key={key} className="bg-white border border-background-200/70 rounded-lg p-5 text-center">
                  <div className="text-xs text-foreground-500 uppercase mb-2">{key}</div>
                  <div className={`text-2xl font-bold font-[family-name:var(--font-heading)] ${getScoreColor(val)}`}>
                    {val}/100
                  </div>
                  {val >= 80 ? (
                    <div className="text-xs text-emerald-600 mt-1">Conforme</div>
                  ) : val >= 70 ? (
                    <div className="text-xs text-amber-600 mt-1">Partiel</div>
                  ) : (
                    <div className="text-xs text-red-500 mt-1">Non conforme</div>
                  )}
                </div>
              ))}
            </div>

            {/* ISO 27001 Audit Trail */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">
                Piste d'Audit ISO 27001
              </h2>
              <div className="space-y-2">
                {iso27001Compliance.audit_trail.map((audit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-background-50 rounded-lg">
                    <span className="text-xs text-foreground-400 w-24 flex-shrink-0">{audit.date}</span>
                    <span className="flex-1 text-sm text-foreground-900">{audit.event}</span>
                    <span className={`text-sm font-bold ${getScoreColor(audit.score)}`}>{audit.score}%</span>
                    <span className="text-xs text-foreground-500">{audit.findings} findings</span>
                    <span className="text-xs text-foreground-400">{audit.auditor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-background-200/70 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground-950 font-[family-name:var(--font-heading)] mb-4">Recommandations</h2>
              <div className="space-y-3">
                {data.recommendations.map((rec: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-background-50 rounded-lg">
                    <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      rec.priority === "high" ? "bg-red-500" : rec.priority === "medium" ? "bg-amber-500" : "bg-secondary-400"
                    }`}></span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rec.priority === "high" ? "bg-red-100 text-red-700" : rec.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-secondary-100 text-secondary-900"
                        }`}>
                          {rec.priority === "high" ? "Prioritaire" : rec.priority === "medium" ? "Important" : "Secondaire"}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          rec.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-background-100 text-foreground-500"
                        }`}>
                          {rec.status === "pending" ? "En cours" : "À faire"}
                        </span>
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

      </div>
    </hubLayout>
  );
}



