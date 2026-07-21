import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useKOSTotalGovernanceRegulatoryExcellence } from '@/hooks/useKOSTotalGovernanceRegulatoryExcellence';

type Tab = 'executive' | 'content' | 'agents' | 'websites' | 'social' | 'knowledge' | 'frameworks' | 'alerts';

export default function totalGovernanceRegulatoryExcellencePage() {
  const {
    contentVerificationRecords,
    agentGovernanceRecords,
    websiteAuditRecords,
    socialMediaChecks,
    knowledgeSources,
    complianceFrameworkAssessments,
    governanceKPIs,
    executiveSummary,
    priorityTargets,
    regleSupreme,
    filteredAlerts,
    filteredContent,
    alertFilter,
    setAlertFilter,
    alertStatusFilter,
    setAlertStatusFilter,
    contentStatusFilter,
    setContentStatusFilter,
    searchQuery,
    setSearchQuery,
    criticalAlertsCount,
    activeAlertsCount,
    totalBlockedContent,
    frameworksConformesCount,
    loading,
    refresh,
  } = useKOSTotalGovernanceRegulatoryExcellence();

  const [activeTab, setActiveTab] = useState<Tab>('executive');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [expandedWebsite, setExpandedWebsite] = useState<string | null>(null);

  const getScoreColor = (score: number, threshold: number = 80) => {
    if (score >= threshold) return 'text-emerald-600';
    if (score >= threshold - 15) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number, threshold: number = 80) => {
    if (score >= threshold) return 'bg-emerald-500';
    if (score >= threshold - 15) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      excellent: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      bon: 'bg-sky-100 text-sky-700 border-sky-200',
      acceptable: 'bg-secondary-100 text-secondary-700 border-secondary-200',
      surveillance: 'bg-amber-100 text-amber-700 border-amber-200',
      critique: 'bg-red-100 text-red-700 border-red-200',
      conforme: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      partiellement_conforme: 'bg-amber-100 text-amber-700 border-amber-200',
      non_conforme: 'bg-red-100 text-red-700 border-red-200',
      VALIDÉE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      À_CONFIRMER: 'bg-amber-100 text-amber-700 border-amber-200',
      NON_VÉRIFIÉE: 'bg-red-100 text-red-700 border-red-200',
      active: 'bg-red-100 text-red-700 border-red-200',
      en_cours: 'bg-amber-100 text-amber-700 border-amber-200',
      resolue: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return map[status] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getVerificationIcon = (status: string) => {
    if (status === 'VALIDÉE') return 'ri-check-double-line text-emerald-500';
    if (status === 'À_CONFIRMER') return 'ri-time-line text-amber-500';
    return 'ri-close-circle-line text-red-500';
  };

  const tabs: { id: Tab; label: string; icon: string; badge?: string }[] = [
    { id: 'executive', label: 'Dashboard Exécutif', icon: 'ri-dashboard-3-line', badge: `${executiveSummary.score_global_gouvernance}/100` },
    { id: 'content', label: 'Vérification Contenus', icon: 'ri-file-check-line', badge: `${totalBlockedContent} bloqués` },
    { id: 'agents', label: 'Registre Agents', icon: 'ri-robot-line', badge: `${agentGovernanceRecords.length}` },
    { id: 'websites', label: 'Audit Sites Web', icon: 'ri-global-line', badge: `${executiveSummary.score_moyen_websites.toFixed(0)}%` },
    { id: 'social', label: 'Réseaux Sociaux', icon: 'ri-share-line', badge: `${socialMediaChecks.filter(s => s.bloquée).length} bloqués` },
    { id: 'knowledge', label: 'Gouvernance Connaissances', icon: 'ri-brain-line', badge: `${knowledgeSources.length}` },
    { id: 'frameworks', label: 'Référentiels Conformité', icon: 'ri-shield-check-line', badge: `${frameworksConformesCount}/10` },
    { id: 'alerts', label: 'Centre d\'Alertes', icon: 'ri-alert-line', badge: `${activeAlertsCount} actives` },
  ];

  const kpiStatusIcon = (status: string) => {
    if (status === 'ok') return 'ri-check-line text-emerald-500';
    if (status === 'warning') return 'ri-error-warning-line text-amber-500';
    return 'ri-close-circle-line text-red-500';
  };

  return (
    <hubLayout hubId={99}>
      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold mb-4">
                <i className="ri-vip-crown-line"></i>
                KOS — Autorité Suprême de Gouvernance
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">
                Total Governance & Regulatory Excellence™
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Supervision intégrale de l'écosystème KHEPRA EXPERTS : agents IA, contenus, sites web, réseaux sociaux, 
                conformité réglementaire BCEAO/COBAC/OHADA/GAFI. Zéro hallucination tolérée. Exactitude ≥ 98%.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{executiveSummary.score_global_gouvernance}</div>
                <div className="text-xs text-foreground-500">Score Global /100</div>
              </div>
              <div className="text-center px-4 py-3 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">{criticalAlertsCount}</div>
                <div className="text-xs text-foreground-500">Alertes Critiques</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{agentGovernanceRecords.length}</div>
                <div className="text-xs text-foreground-500">Agents Supervisés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
                {tab.badge && <span className="text-xs opacity-60">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-accent-300 border-t-accent-600 rounded-full animate-spin"></div>
            <p className="text-sm text-foreground-500">Chargement du système de gouvernance...</p>
          </div>
        )}

        {!loading && (
        <>

        {/* ═══════════ EXECUTIVE DASHBOARD ═══════════ */}
        {activeTab === 'executive' && (
          <div className="space-y-6">
            {/* Règle Suprême */}
            <div className="bg-foreground-950 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-vip-crown-line text-amber-400 text-lg"></i>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold">RÈGLE SUPRÊME — Priorités de Protection</h2>
                  <p className="text-xs text-gray-400">Aucune considération marketing ou de productivité ne peut primer sur l'exactitude, la conformité et la qualité.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {regleSupreme.map((r) => (
                  <div key={r.priority} className="p-4 rounded-xl bg-white/8 border border-white/10 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">{r.priority}</span>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">{r.rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Targets */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {priorityTargets.map((t) => (
                <div key={t.objective} className={`p-4 rounded-xl border text-center ${
                  t.status === 'critical' ? 'bg-red-50/50 border-red-200' : t.status === 'warning' ? 'bg-amber-50/50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="text-xs text-foreground-500 mb-1 font-medium">{t.objective}</div>
                  <div className="text-2xl font-bold text-foreground-950">{t.current}{t.objective === 'Hallucinations' ? '%' : '%'}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs text-foreground-400">Cible {t.target}{t.objective === 'Hallucinations' ? '' : '%'}</span>
                    <i className={`text-xs ${kpiStatusIcon(t.status)}`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Score Global + KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-50 rounded-2xl border border-background-200/70 p-6">
                <h3 className="font-heading text-base font-bold text-foreground-950 mb-4">KPIs Gouvernance</h3>
                <div className="space-y-4">
                  {governanceKPIs.map((kpi) => (
                    <div key={kpi.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground-700">{kpi.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${getScoreColor(kpi.current_value, kpi.target_value)}`}>
                            {kpi.unit === 'FCFA' ? `${(kpi.current_value / 1000000).toFixed(1)}M` : kpi.current_value}{kpi.unit !== 'FCFA' ? kpi.unit : ''}
                          </span>
                          <i className={kpiStatusIcon(kpi.status)}></i>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getScoreBg(kpi.current_value, kpi.target_value)}`} style={{ width: `${Math.min((kpi.current_value / kpi.target_value) * 100, 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                    <div className="text-3xl font-bold text-foreground-950">{executiveSummary.total_agents_audited}</div>
                    <div className="text-xs text-foreground-500">Agents Audités</div>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{executiveSummary.agents_excellents} excellents</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700">{executiveSummary.agents_bons} bons</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">{executiveSummary.agents_critiques} critique</span>
                    </div>
                  </div>
                  <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                    <div className="text-3xl font-bold text-foreground-950">{executiveSummary.total_contents_verified}</div>
                    <div className="text-xs text-foreground-500">Contenus Vérifiés</div>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{executiveSummary.contents_validees} validés</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{executiveSummary.contents_a_confirmer} à confirmer</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">{executiveSummary.contents_non_verifiees} non vérifiés</span>
                    </div>
                  </div>
                  <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                    <div className="text-3xl font-bold text-foreground-950">{executiveSummary.total_websites_audited}</div>
                    <div className="text-xs text-foreground-500">Sites Web Audités</div>
                    <div className="text-xs text-foreground-400 mt-1">Score moyen {executiveSummary.score_moyen_websites.toFixed(0)}%</div>
                  </div>
                  <div className="p-4 bg-background-50 rounded-xl border border-background-200/70 text-center">
                    <div className="text-3xl font-bold text-red-600">{executiveSummary.total_alerts}</div>
                    <div className="text-xs text-foreground-500">Alertes Totales</div>
                    <div className="flex justify-center gap-1 mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">{executiveSummary.alerts_critiques} critiques</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">{executiveSummary.alerts_hautes} hautes</span>
                    </div>
                  </div>
                </div>

                {/* Critical Alerts Quick View */}
                {filteredAlerts.filter(a => a.severity === 'critique' && a.status === 'active').length > 0 && (
                  <div className="bg-red-50/50 rounded-xl border border-red-200 p-5">
                    <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                      <i className="ri-alert-line"></i>Alertes Critiques Actives
                    </h4>
                    {filteredAlerts.filter(a => a.severity === 'critique' && a.status === 'active').map((alert) => (
                      <div key={alert.id} className="flex items-start gap-2 p-2 text-sm">
                        <i className="ri-error-warning-line text-red-500 mt-0.5 flex-shrink-0"></i>
                        <div>
                          <span className="font-semibold text-foreground-900">{alert.title}</span>
                          <p className="text-xs text-foreground-500 mt-0.5">{alert.description.slice(0, 120)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={refresh} className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer flex items-center gap-2">
                <i className="ri-refresh-line"></i>Rafraîchir le Dashboard
              </button>
            </div>
          </div>
        )}

        {/* ═══════════ CONTENT VERIFICATION ═══════════ */}
        {activeTab === 'content' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Rechercher par titre, auteur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-300"
                />
              </div>
              <select
                value={contentStatusFilter}
                onChange={(e) => setContentStatusFilter(e.target.value as typeof contentStatusFilter)}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous statuts</option>
                <option value="VALIDÉE">Validée</option>
                <option value="À_CONFIRMER">À Confirmer</option>
                <option value="NON_VÉRIFIÉE">Non Vérifiée</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200 text-center">
                <div className="text-lg font-bold text-emerald-700">{filteredContent.filter(c => c.verification_status === 'VALIDÉE').length}</div>
                <div className="text-xs text-foreground-500">Validées</div>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-700">{filteredContent.filter(c => c.verification_status === 'À_CONFIRMER').length}</div>
                <div className="text-xs text-foreground-500">À Confirmer</div>
              </div>
              <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{filteredContent.filter(c => c.verification_status === 'NON_VÉRIFIÉE').length}</div>
                <div className="text-xs text-foreground-500">Non Vérifiées</div>
              </div>
              <div className="p-3 bg-foreground-50/50 rounded-lg border border-foreground-200 text-center">
                <div className="text-lg font-bold text-foreground-700">{filteredContent.filter(c => c.auto_blocked).length}</div>
                <div className="text-xs text-foreground-500">Auto-Bloquées</div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredContent.map((content) => (
                <div key={content.id} className={`rounded-xl border p-5 ${content.auto_blocked ? 'bg-red-50/30 border-red-200' : 'bg-background-50 border-background-200/70'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{content.content_type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(content.verification_status)}`}>
                          {content.verification_status === 'VALIDÉE' ? '✓ Validée' : content.verification_status === 'À_CONFIRMER' ? '⟳ À Confirmer' : '✗ Non Vérifiée'}
                        </span>
                        {content.auto_blocked && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">BLOQUÉ</span>}
                      </div>
                      <h4 className="text-sm font-bold text-foreground-950">{content.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-foreground-500 flex-wrap">
                        <span><i className="ri-user-line mr-1"></i>{content.author}</span>
                        <span><i className="ri-calendar-line mr-1"></i>{new Date(content.published_at).toLocaleDateString('fr-FR')}</span>
                        <span><i className="ri-file-text-line mr-1"></i>{content.verified_sources_count}/{content.source_count} sources vérifiées</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                        <div className={`text-lg font-bold ${getScoreColor(content.fact_check_score, 85)}`}>{content.fact_check_score}%</div>
                        <div className="text-[10px] text-foreground-500">Fact Check</div>
                      </div>
                      <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                        <div className={`text-lg font-bold ${getScoreColor(content.regulatory_compliance_score, 85)}`}>{content.regulatory_compliance_score}%</div>
                        <div className="text-[10px] text-foreground-500">Réglementaire</div>
                      </div>
                    </div>
                  </div>
                  {content.issues.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-background-200/70">
                      {content.issues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                          <i className="ri-error-warning-line text-amber-500 mt-0.5 flex-shrink-0"></i>
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ AGENT REGISTRY ═══════════ */}
        {activeTab === 'agents' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'Excellents', val: agentGovernanceRecords.filter(a => a.status === 'excellent').length, color: 'emerald' },
                { label: 'Bons', val: agentGovernanceRecords.filter(a => a.status === 'bon').length, color: 'sky' },
                { label: 'Acceptables', val: agentGovernanceRecords.filter(a => a.status === 'acceptable').length, color: 'secondary' },
                { label: 'Surveillance', val: agentGovernanceRecords.filter(a => a.status === 'surveillance').length, color: 'amber' },
                { label: 'Critiques', val: agentGovernanceRecords.filter(a => a.status === 'critique').length, color: 'red' },
              ].map((s) => (
                <div key={s.label} className={`p-3 rounded-lg border text-center bg-${s.color}-50/50 border-${s.color}-200`}>
                  <div className={`text-lg font-bold text-${s.color}-700`}>{s.val}</div>
                  <div className="text-xs text-foreground-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {agentGovernanceRecords.map((agent) => (
                <div key={agent.id} className={`rounded-xl border ${agent.status === 'critique' ? 'bg-red-50/30 border-red-200' : 'bg-background-50 border-background-200/70'}`}>
                  <button
                    onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                    className="w-full text-left p-5 cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{agent.hub}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(agent.status)}`}>
                            {agent.status === 'excellent' ? 'Excellent' : agent.status === 'bon' ? 'Bon' : agent.status === 'surveillance' ? 'Surveillance' : 'Critique'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-foreground-950">{agent.agent_name}</h4>
                      </div>
                      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
                        <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                          <div className={`text-sm font-bold ${getScoreColor(agent.precision, 90)}`}>{agent.precision}%</div>
                          <div className="text-[10px] text-foreground-500">Précision</div>
                        </div>
                        <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                          <div className={`text-sm font-bold ${agent.conformite >= 90 ? 'text-emerald-600' : agent.conformite >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{agent.conformite}%</div>
                          <div className="text-[10px] text-foreground-500">Conformité</div>
                        </div>
                        <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                          <div className={`text-sm font-bold ${agent.taux_erreur < 3 ? 'text-emerald-600' : agent.taux_erreur < 7 ? 'text-amber-600' : 'text-red-600'}`}>{agent.taux_erreur}%</div>
                          <div className="text-[10px] text-foreground-500">Erreurs</div>
                        </div>
                        <div className="text-center px-3 py-2 bg-background-100 rounded-lg">
                          <div className="text-sm font-bold text-foreground-950">{agent.score_qualite}</div>
                          <div className="text-[10px] text-foreground-500">Score/10</div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedAgent === agent.id && (
                    <div className="px-5 pb-5 border-t border-background-200/70 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        <div className="p-3 bg-background-100 rounded-lg">
                          <span className="text-xs text-foreground-500">Dernier Audit</span>
                          <p className="text-sm font-semibold text-foreground-950">{new Date(agent.dernier_audit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="p-3 bg-background-100 rounded-lg">
                          <span className="text-xs text-foreground-500">Incidents 30j</span>
                          <p className={`text-sm font-semibold ${agent.incidents_30j === 0 ? 'text-emerald-600' : agent.incidents_30j <= 2 ? 'text-amber-600' : 'text-red-600'}`}>{agent.incidents_30j}</p>
                        </div>
                        <div className="p-3 bg-background-100 rounded-lg">
                          <span className="text-xs text-foreground-500">Productivité</span>
                          <p className="text-sm font-semibold text-foreground-950">{agent.productivite}/10</p>
                        </div>
                      </div>
                      {agent.recommandations.length > 0 && (
                        <div>
                          <h5 className="text-xs font-bold text-foreground-950 mb-2">Recommandations</h5>
                          <div className="space-y-1">
                            {agent.recommandations.map((r, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                                <i className="ri-arrow-right-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                                {r}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ WEBSITES & SYSTEMS AUDIT ═══════════ */}
        {activeTab === 'websites' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {websiteAuditRecords.map((site) => (
                <div key={site.id} className={`p-4 rounded-xl border text-center cursor-pointer transition-colors ${
                  expandedWebsite === site.id ? 'bg-accent-50/50 border-accent-300' : 'bg-background-50 border-background-200/70 hover:border-background-300/60'
                }`} onClick={() => setExpandedWebsite(expandedWebsite === site.id ? null : site.id)}>
                  <div className={`text-2xl font-bold ${getScoreColor(site.score_global, 85)}`}>{site.score_global}%</div>
                  <div className="text-xs text-foreground-500 mt-1">{site.site}</div>
                </div>
              ))}
            </div>

            {expandedWebsite && (() => {
              const site = websiteAuditRecords.find(w => w.id === expandedWebsite)!;
              return (
                <div className="bg-background-50 rounded-xl border border-accent-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 font-medium">{site.site}</span>
                    <span className="text-xs text-foreground-400">{site.url}</span>
                    <span className={`ml-auto text-lg font-bold ${getScoreColor(site.score_global, 85)}`}>{site.score_global}%</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-foreground-950">{site.pages_verifiees}/{site.pages_total}</div>
                      <div className="text-xs text-foreground-500">Pages Vérifiées</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className={`text-lg font-bold ${site.liens_casses === 0 ? 'text-emerald-600' : 'text-red-600'}`}>{site.liens_casses}</div>
                      <div className="text-xs text-foreground-500">Liens Cassés / {site.liens_total}</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className={`text-lg font-bold ${site.certificat_ssl ? 'text-emerald-600' : 'text-red-600'}`}>
                        <i className={site.certificat_ssl ? 'ri-check-line' : 'ri-close-line'}></i>
                      </div>
                      <div className="text-xs text-foreground-500">SSL</div>
                    </div>
                    <div className="p-3 bg-background-100 rounded-lg text-center">
                      <div className={`text-lg font-bold ${site.headers_securite ? 'text-emerald-600' : 'text-red-600'}`}>
                        <i className={site.headers_securite ? 'ri-check-line' : 'ri-close-line'}></i>
                      </div>
                      <div className="text-xs text-foreground-500">Headers Sécurité</div>
                    </div>
                  </div>
                  {site.issues.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold text-foreground-950 mb-2">Issues</h5>
                      <div className="space-y-1">
                        {site.issues.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-foreground-600">
                            <i className="ri-error-warning-line text-amber-500 mt-0.5 flex-shrink-0"></i>
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══════════ SOCIAL MEDIA CONTROL ═══════════ */}
        {activeTab === 'social' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-200 text-center">
                <div className="text-lg font-bold text-emerald-700">{socialMediaChecks.filter(s => s.verification_status === 'VALIDÉE' && !s.bloquée).length}</div>
                <div className="text-xs text-foreground-500">Publiées OK</div>
              </div>
              <div className="p-4 bg-red-50/50 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{socialMediaChecks.filter(s => s.bloquée).length}</div>
                <div className="text-xs text-foreground-500">Bloquées</div>
              </div>
              <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-700">{socialMediaChecks.filter(s => s.verification_status === 'À_CONFIRMER').length}</div>
                <div className="text-xs text-foreground-500">À Confirmer</div>
              </div>
              <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{socialMediaChecks.length}</div>
                <div className="text-xs text-foreground-500">Total Contrôles</div>
              </div>
            </div>

            <div className="space-y-3">
              {socialMediaChecks.map((check) => (
                <div key={check.id} className={`rounded-xl border p-5 ${check.bloquée ? 'bg-red-50/30 border-red-200' : 'bg-background-50 border-background-200/70'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{check.platform}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(check.verification_status)}`}>
                          {check.verification_status === 'VALIDÉE' ? '✓ Validée' : check.verification_status === 'À_CONFIRMER' ? '⟳ À Confirmer' : '✗ Non Vérifiée'}
                        </span>
                        {check.bloquée && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">BLOQUÉ</span>}
                      </div>
                      <h4 className="text-sm font-bold text-foreground-950">{check.post_title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-foreground-500">
                        <span>{check.author}</span>
                        <span>{new Date(check.scheduled_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${check.url_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {check.url_active ? 'URL OK' : 'URL KO'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${check.image_valide ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {check.image_valide ? 'Image OK' : 'Image KO'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${check.rattachement_entreprise ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {check.rattachement_entreprise ? 'Page OK' : 'Page KO'}
                      </span>
                    </div>
                  </div>
                  {check.motif_blocage && (
                    <div className="mt-3 pt-3 border-t border-red-200 flex items-start gap-2 text-xs text-red-700">
                      <i className="ri-close-circle-line mt-0.5 flex-shrink-0"></i>
                      <strong>Motif blocage :</strong> {check.motif_blocage}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ KNOWLEDGE GOVERNANCE ═══════════ */}
        {activeTab === 'knowledge' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeSources.map((src) => (
                <div key={src.id} className="bg-background-50 rounded-xl border border-background-200/70 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      src.authority_level === 'primaire' ? 'bg-emerald-100 text-emerald-700' : src.authority_level === 'secondaire' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'
                    }`}>
                      <i className={`${src.category === 'regulateur' ? 'ri-government-line' : src.category === 'standard_international' ? 'ri-global-line' : 'ri-building-line'} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-foreground-950">{src.source_name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          src.authority_level === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-accent-100 text-accent-700'
                        }`}>{src.authority_level}</span>
                      </div>
                      <p className="text-xs text-foreground-500 line-clamp-2">{src.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-foreground-400">
                        <span><i className="ri-file-copy-line mr-1"></i>{src.documents_count} documents</span>
                        <span><i className="ri-calendar-line mr-1"></i>{new Date(src.last_updated).toLocaleDateString('fr-FR')}</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          src.access_status === 'actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{src.access_status}</span>
                        {src.integration_kos && <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent-100 text-accent-700">Intégré KOS</span>}
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div className="text-lg font-bold text-foreground-950">{src.priority_score}</div>
                      <div className="text-[10px] text-foreground-500">/10</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ COMPLIANCE FRAMEWORKS ═══════════ */}
        {activeTab === 'frameworks' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200 text-center">
                <div className="text-lg font-bold text-emerald-700">{complianceFrameworkAssessments.filter(f => f.status === 'conforme').length}</div>
                <div className="text-xs text-foreground-500">Conformes</div>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-700">{complianceFrameworkAssessments.filter(f => f.status === 'partiellement_conforme').length}</div>
                <div className="text-xs text-foreground-500">Partiels</div>
              </div>
              <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{complianceFrameworkAssessments.filter(f => f.status === 'non_conforme').length}</div>
                <div className="text-xs text-foreground-500">Non Conformes</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{complianceFrameworkAssessments.reduce((s, f) => s + f.critical_gaps, 0)}</div>
                <div className="text-xs text-foreground-500">Gaps Critiques</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{complianceFrameworkAssessments.length}</div>
                <div className="text-xs text-foreground-500">Référentiels</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceFrameworkAssessments.map((fw) => (
                <div key={fw.id} className={`rounded-xl border p-5 ${fw.status === 'non_conforme' ? 'bg-red-50/30 border-red-200' : fw.status === 'partiellement_conforme' ? 'bg-amber-50/30 border-amber-200' : 'bg-background-50 border-background-200/70'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{fw.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(fw.status)}`}>
                          {fw.status === 'conforme' ? 'Conforme' : fw.status === 'partiellement_conforme' ? 'Partiel' : 'Non Conforme'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground-950">{fw.framework}</h4>
                      <p className="text-xs text-foreground-500 mt-0.5">{fw.authority} · {fw.applicable_zone}</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(fw.current_score, fw.target_score)}`}>{fw.current_score}</div>
                      <div className="text-[10px] text-foreground-400">/ {fw.target_score}</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-background-200/70 rounded-full overflow-hidden mb-3">
                    <div className={`h-full rounded-full ${getScoreBg(fw.current_score, fw.target_score)}`} style={{ width: `${(fw.current_score / fw.target_score) * 100}%` }}></div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground-500">
                    <span>{fw.gaps_count} gaps · {fw.critical_gaps} critiques</span>
                    <span className="ml-auto">Audit : {new Date(fw.last_assessment).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ ALERTS CENTER ═══════════ */}
        {activeTab === 'alerts' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Rechercher dans les alertes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-foreground-300"
                />
              </div>
              <select
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value as typeof alertFilter)}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Toutes sévérités</option>
                <option value="critique">Critique</option>
                <option value="haute">Haute</option>
                <option value="moyenne">Moyenne</option>
                <option value="basse">Basse</option>
              </select>
              <select
                value={alertStatusFilter}
                onChange={(e) => setAlertStatusFilter(e.target.value as typeof alertStatusFilter)}
                className="px-4 py-2.5 rounded-full bg-background-50 border border-background-200 text-sm text-foreground-700 cursor-pointer"
              >
                <option value="all">Tous statuts</option>
                <option value="active">Active</option>
                <option value="en_cours">En cours</option>
                <option value="resolue">Résolue</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 bg-red-50/50 rounded-lg border border-red-200 text-center">
                <div className="text-lg font-bold text-red-700">{filteredAlerts.filter(a => a.severity === 'critique').length}</div>
                <div className="text-xs text-foreground-500">Critiques</div>
              </div>
              <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-200 text-center">
                <div className="text-lg font-bold text-orange-700">{filteredAlerts.filter(a => a.severity === 'haute').length}</div>
                <div className="text-xs text-foreground-500">Hautes</div>
              </div>
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-center">
                <div className="text-lg font-bold text-amber-700">{filteredAlerts.filter(a => a.severity === 'moyenne').length}</div>
                <div className="text-xs text-foreground-500">Moyennes</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-700">{filteredAlerts.filter(a => a.severity === 'basse').length}</div>
                <div className="text-xs text-foreground-500">Basses</div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`rounded-xl border p-5 ${
                  alert.severity === 'critique' ? 'bg-red-50/30 border-red-200' : alert.severity === 'haute' ? 'bg-orange-50/30 border-orange-200' : alert.severity === 'moyenne' ? 'bg-amber-50/30 border-amber-200' : 'bg-background-50 border-background-200/70'
                }`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      alert.severity === 'critique' ? 'bg-red-100 text-red-600' : alert.severity === 'haute' ? 'bg-orange-100 text-orange-600' : alert.severity === 'moyenne' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <i className={`${alert.severity === 'critique' ? 'ri-error-warning-line' : alert.severity === 'haute' ? 'ri-alert-line' : 'ri-information-line'} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${
                          alert.severity === 'critique' ? 'bg-red-100 text-red-700 border-red-200' : alert.severity === 'haute' ? 'bg-orange-100 text-orange-700 border-orange-200' : alert.severity === 'moyenne' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>{alert.severity.toUpperCase()}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium">{alert.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(alert.status)}`}>
                          {alert.status === 'active' ? 'Active' : alert.status === 'en_cours' ? 'En cours' : 'Résolue'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground-950">{alert.title}</h4>
                      <p className="text-xs text-foreground-600 mt-1">{alert.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-foreground-400">
                        <span><i className="ri-file-text-line mr-1"></i>{alert.source}</span>
                        <span><i className="ri-calendar-line mr-1"></i>{new Date(alert.detected_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span><i className="ri-user-line mr-1"></i>{alert.assigned_to}</span>
                        {alert.resolution_deadline && <span className="text-amber-600 font-bold"><i className="ri-timer-line mr-1"></i>{new Date(alert.resolution_deadline).toLocaleDateString('fr-FR')}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        </>
        )}
      </div>

      {/* Footer KPI Strip */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-4">Objectifs Cibles — Total Governance & Regulatory Excellence™</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Conformité', value: '88.5%', target: '≥ 95%', icon: 'ri-shield-check-line' },
              { label: 'Exactitude', value: '92.8%', target: '≥ 98%', icon: 'ri-check-double-line' },
              { label: 'Liens Valides', value: '97.2%', target: '≥ 99%', icon: 'ri-link' },
              { label: 'Disponibilité', value: '98.7%', target: '≥ 99%', icon: 'ri-server-line' },
              { label: 'Infos Vérifiées', value: '88.3%', target: '100%', icon: 'ri-file-check-line' },
              { label: 'Hallucinations', value: '3.4%', target: '0', icon: 'ri-mind-map' },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <i className={`${stat.icon} text-sm text-foreground-400 mb-1 block`}></i>
                <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                <div className="text-xs text-foreground-500">{stat.label}</div>
                <div className="text-[10px] text-foreground-400 mt-0.5">Cible: {stat.target}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





