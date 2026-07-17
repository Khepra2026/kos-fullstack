import { useState, useMemo } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSGlobalSystemUpgrade } from '@/hooks/useKOSGlobalSystemUpgrade';
import type { AgentCapabilityGap, AutomateUpgrade, GSCBoosterUrl, LinkedInBlockDiagnostic } from '@/mocks/kosGlobalSystemUpgrade';

type TabId = 'overview' | 'capabilities' | 'gsc' | 'linkedin';

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', label: 'CRITIQUE' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'MAJEUR' };
    case 'minor': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400', label: 'MINEUR' };
    case 'high': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500', label: 'HAUT' };
    case 'medium': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'MOYEN' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-500', label: 'N/A' };
  }
}

function getUpgradeStatusBadge(status: string) {
  switch (status) {
    case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'in_progress': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'failed': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-slate-50 text-slate-500 border-slate-200';
  }
}

function getLinkedInStatusBadge(status: string) {
  switch (status) {
    case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'fixing': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'detected': return 'bg-red-50 text-red-700 border-red-200';
    case 'diagnosing': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'monitoring': return 'bg-teal-50 text-teal-700 border-teal-200';
    default: return 'bg-slate-50 text-slate-500 border-slate-200';
  }
}

function getGSCStatusBadge(status: string) {
  switch (status) {
    case 'indexed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'submitted': return 'bg-teal-50 text-teal-700 border-teal-200';
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    default: return 'bg-red-50 text-red-700 border-red-200';
  }
}

function formatNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
  return String(val);
}

export default function KOSGlobalSystemUpgradePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [expandedDiag, setExpandedDiag] = useState<string | null>(null);

  const {
    agentGaps,
    automateUpgrades,
    gscUrls,
    gscStats,
    gscSubmitProgress,
    linkedInDiagnostics,
    linkedInHealth,
    linkedInFixProgress,
    summary,
    loading,
    executeAgentUpgrade,
    executeAutomateUpgrade,
    executeAllAgentUpgrades,
    submitGscUrls,
    fixLinkedInBlocking,
    executeAllUpgrades,
  } = useKOSGlobalSystemUpgrade();

  const completedAgents = useMemo(() => agentGaps.filter(a => a.upgradeStatus === 'completed').length, [agentGaps]);
  const completedAutomates = useMemo(() => automateUpgrades.filter(a => a.status === 'completed').length, [automateUpgrades]);
  const submittedUrls = useMemo(() => gscUrls.filter(u => u.indexStatus !== 'pending').length, [gscUrls]);
  const resolvedDiags = useMemo(() => linkedInDiagnostics.filter(d => d.status === 'resolved').length, [linkedInDiagnostics]);
  const totalProgress = useMemo(() => {
    const total = summary.totalUpgrades;
    const done = completedAgents + completedAutomates + submittedUrls + resolvedDiags;
    return Math.round((done / total) * 100);
  }, [summary.totalUpgrades, completedAgents, completedAutomates, submittedUrls, resolvedDiags]);

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: `${totalProgress}%` },
    { id: 'capabilities', label: 'Capacités Agents', icon: 'ri-robot-line', count: `${completedAgents}/${agentGaps.length}` },
    { id: 'gsc', label: 'GSC URL Booster', icon: 'ri-google-line', count: `${submittedUrls}/${gscUrls.length}` },
    { id: 'linkedin', label: 'LinkedIn Fix', icon: 'ri-linkedin-line', count: `${resolvedDiags}/${linkedInDiagnostics.length}` },
  ];

  const handleExecuteAll = async () => {
    await executeAllUpgrades();
  };

  return (
    <KOSHubLayout hubId={70}>
      <SeoHead
        title="KOS Global System Upgrade Command — Capacités Agents, GSC, LinkedIn | KHEPRA EXPERTS"
        description="Console unifiée d'upgrade système KOS. Renforcement capacités agents/automates, boost indexation Google Search Console, résolution blocages LinkedIn. Exécution massive."
        keywords="KOS Global System Upgrade, upgrade agents, GSC URL booster, LinkedIn fix, KHEPRA EXPERTS"
        canonicalPath="/kos-global-system-upgrade"
        ogType="website"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=futuristic%20system%20upgrade%20command%20center%20with%20three%20interconnected%20holographic%20stations%20representing%20agent%20capabilities%20enhancement%20in%20emerald%20green%20SEO%20indexation%20boost%20in%20amber%20gold%20and%20LinkedIn%20unblocking%20in%20red%20crimson%20all%20orbiting%20a%20central%20command%20node%20dark%20sophisticated%20tech%20visualization%20with%20glowing%20circuit%20patterns%20no%20text%20no%20human%20figures%20premium%20enterprise%20aesthetic&width=1920&height=600&seq=kos-global-upgrade-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                UPGRADE SYSTÈME — {summary.criticalUpgrades} Critiques · {summary.estimatedTotalEffort}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              KOS Global System
              <span className="block text-red-400 mt-2">Upgrade Command™</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{summary.totalUpgrades} upgrades</strong> identifiées sur 3 axes.{' '}
              <strong className="text-red-300">{summary.criticalUpgrades} critiques</strong>,{' '}
              <strong className="text-amber-300">{summary.majorUpgrades} majeurs</strong>.{' '}
              <strong className="text-emerald-300">{summary.autoFixableUpgrades} auto-fixables.</strong>{' '}
              Gain trafic estimé : <strong className="text-white">+{formatNumber(summary.estimatedTrafficGain)} visites/mois</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleExecuteAll}
                disabled={totalProgress >= 100}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-flashlight-line ${gscSubmitProgress.active || linkedInFixProgress.active ? 'animate-pulse' : ''}`} />
                {totalProgress >= 100 ? 'Tout est à jour !' : totalProgress > 0 ? 'Continuer les Upgrades' : 'TOUT EXÉCUTER'}
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-300 font-semibold">+{formatNumber(summary.estimatedTrafficGain)} trafic</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="text-sm text-amber-300 font-semibold">+{formatNumber(summary.estimatedReachGain)} reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-base`} />
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <section className="py-6 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Agents à upgrader', value: String(agentGaps.length), icon: 'ri-robot-line', color: '#4F46E5' },
              { label: 'Automates', value: String(automateUpgrades.length), icon: 'ri-cpu-line', color: '#86BC25' },
              { label: 'URLs GSC', value: String(gscUrls.length), icon: 'ri-google-line', color: '#9B7B2C' },
              { label: 'Diagnostics LI', value: String(linkedInDiagnostics.length), icon: 'ri-linkedin-line', color: '#0A66C2' },
              { label: 'Critiques', value: String(summary.criticalUpgrades), icon: 'ri-close-circle-line', color: '#C2410C' },
              { label: 'Auto-fixables', value: String(summary.autoFixableUpgrades), icon: 'ri-flashlight-line', color: '#0D7B5F' },
              { label: 'Complétés', value: String(completedAgents + completedAutomates + submittedUrls + resolvedDiags), icon: 'ri-check-double-line', color: '#86BC25' },
              { label: 'Progression', value: `${totalProgress}%`, icon: 'ri-pie-chart-line', color: '#6B4A3A' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl bg-background-50 border border-background-200 p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                </div>
                <span className="block text-lg font-bold text-foreground-950 font-heading">{stat.value}</span>
                <span className="text-[10px] text-foreground-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground-500 whitespace-nowrap">Progression Globale</span>
            <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{totalProgress}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB 1: OVERVIEW ============ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Three Axes Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Axe 1: Capabilities */}
              <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <i className="ri-robot-line text-lg text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-red-700">AXE 1 — Capacités Agents</h3>
                    <p className="text-xs text-red-500">{agentGaps.length} agents · {automateUpgrades.length} automates</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Agents scannés</span>
                    <span className="font-bold text-foreground-950">{agentGaps.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Compétences manquantes</span>
                    <span className="font-bold text-red-600">{agentGaps.reduce((s, a) => s + a.missingCapabilities.length, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Upgrades recommandées</span>
                    <span className="font-bold text-emerald-600">{agentGaps.reduce((s, a) => s + a.recommendedUpgrades.length, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Complétés</span>
                    <span className="font-bold text-foreground-950">{completedAgents}/{agentGaps.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Automates upgrader</span>
                    <span className="font-bold text-foreground-950">{completedAutomates}/{automateUpgrades.length}</span>
                  </div>
                </div>
                <button
                  onClick={executeAllAgentUpgrades}
                  disabled={completedAgents >= agentGaps.length}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-play-line" />
                  Upgrader tous les agents
                </button>
              </div>

              {/* Axe 2: GSC */}
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <i className="ri-google-line text-lg text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-amber-700">AXE 2 — GSC URL Booster</h3>
                    <p className="text-xs text-amber-500">{gscUrls.length} URLs · +{formatNumber(gscStats.estimatedTotalTraffic)} trafic</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-600">URLs à soumettre</span>
                    <span className="font-bold text-foreground-950">{gscUrls.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Critiques / Haute priorité</span>
                    <span className="font-bold text-red-600">{gscStats.criticalUrls + gscStats.highPriorityUrls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Taux indexation actuel</span>
                    <span className="font-bold text-amber-600">{gscStats.currentIndexedRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Taux indexation cible</span>
                    <span className="font-bold text-emerald-600">{gscStats.targetIndexedRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Soumises</span>
                    <span className="font-bold text-foreground-950">{submittedUrls}/{gscUrls.length}</span>
                  </div>
                </div>
                <button
                  onClick={submitGscUrls}
                  disabled={submittedUrls >= gscUrls.length || gscSubmitProgress.active}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className={`${gscSubmitProgress.active ? 'ri-loader-4-line animate-spin' : 'ri-send-plane-line'}`} />
                  {gscSubmitProgress.active ? 'Soumission...' : 'Soumettre toutes les URLs'}
                </button>
              </div>

              {/* Axe 3: LinkedIn */}
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <i className="ri-linkedin-line text-lg text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-blue-700">AXE 3 — LinkedIn Fix</h3>
                    <p className="text-xs text-blue-500">{linkedInDiagnostics.length} diagnostics · Statut : {linkedInHealth.bridgeStatus}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Diagnostics</span>
                    <span className="font-bold text-foreground-950">{linkedInDiagnostics.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Critiques / Bloquants</span>
                    <span className="font-bold text-red-600">{linkedInDiagnostics.filter(d => d.severity === 'critical').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Auto-fixables</span>
                    <span className="font-bold text-emerald-600">{linkedInDiagnostics.filter(d => d.autoFixable).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Posts échoués 7j</span>
                    <span className="font-bold text-red-600">{linkedInHealth.failedPostsLast7d}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-600">Résolus</span>
                    <span className="font-bold text-foreground-950">{resolvedDiags}/{linkedInDiagnostics.length}</span>
                  </div>
                </div>
                <button
                  onClick={fixLinkedInBlocking}
                  disabled={resolvedDiags >= linkedInDiagnostics.filter(d => d.autoFixable).length || linkedInFixProgress.active}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className={`${linkedInFixProgress.active ? 'ri-loader-4-line animate-spin' : 'ri-tools-line'}`} />
                  {linkedInFixProgress.active ? 'Correction...' : 'Corriger LinkedIn'}
                </button>
              </div>
            </div>

            {/* Target Summary */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-crosshair-line text-accent-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Objectifs Cibles — Post-Upgrade</h3>
                  <p className="text-xs text-gray-400">Completion estimée : {summary.targetCompletionDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: 'Trafic Organique', value: `+${formatNumber(summary.estimatedTrafficGain)}/mois`, icon: 'ri-line-chart-line', color: 'emerald' },
                  { label: 'Reach Social', value: `+${formatNumber(summary.estimatedReachGain)}`, icon: 'ri-share-line', color: 'teal' },
                  { label: 'Pages Indexées', value: gscStats.targetIndexedRate, icon: 'ri-google-line', color: 'amber' },
                  { label: 'Agents Upgradés', value: `${agentGaps.length}/${agentGaps.length}`, icon: 'ri-robot-line', color: 'rose' },
                ].map((obj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${obj.icon} text-accent-400 text-xl mb-2 block`} />
                    <span className="block text-xl font-bold font-heading">{obj.value}</span>
                    <span className="text-[10px] text-gray-400">{obj.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 2: CAPABILITIES ============ */}
        {activeTab === 'capabilities' && (
          <div className="space-y-8">
            {/* Agent Gaps */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-robot-line text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground-950">
                    Agents — {agentGaps.length} Gaps de Capacités
                  </h3>
                  <p className="text-xs text-foreground-500">{agentGaps.filter(a => a.upgradeStatus === 'pending').length} en attente · {completedAgents} complétés</p>
                </div>
              </div>
              <div className="space-y-4">
                {agentGaps.map((agent) => {
                  const isExpanded = expandedAgent === agent.agentId;
                  const sev = getSeverityBadge(agent.severity);
                  const statusStyle = getUpgradeStatusBadge(agent.upgradeStatus);
                  return (
                    <div key={agent.agentId} className={`rounded-2xl border-2 p-5 transition-all ${
                      agent.upgradeStatus === 'completed' ? 'border-emerald-200 bg-emerald-50/20' :
                      agent.upgradeStatus === 'in_progress' ? 'border-amber-300 bg-amber-50/20' :
                      agent.upgradeStatus === 'failed' ? 'border-red-300 bg-red-50/20' :
                      'border-background-200 bg-white'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${sev.bg}`}>
                          <i className={`${agent.icon} text-base ${sev.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-sm font-bold text-foreground-950">{agent.agentName}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.border} ${sev.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                              {sev.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}>
                              {agent.upgradeStatus === 'completed' ? 'Complété' : agent.upgradeStatus === 'in_progress' ? 'En cours' : agent.upgradeStatus === 'failed' ? 'Échec' : 'En attente'}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-600 mb-2">{agent.domain}</p>
                          
                          {/* Current vs Missing */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="p-3 rounded-lg bg-background-50 border border-background-200">
                              <p className="text-[10px] font-bold text-foreground-400 uppercase mb-1">Capacités actuelles</p>
                              <div className="space-y-0.5">
                                {agent.currentCapabilities.map((c, i) => (
                                  <span key={i} className="block text-[10px] text-foreground-600">✓ {c}</span>
                                ))}
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                              <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Compétences manquantes</p>
                              <div className="space-y-0.5">
                                {agent.missingCapabilities.map((c, i) => (
                                  <span key={i} className="block text-[10px] text-red-600">✗ {c}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-background-200">
                              <p className="text-[10px] font-bold text-foreground-400 uppercase mb-2">Upgrades recommandées</p>
                              <div className="space-y-1.5 mb-3">
                                {agent.recommendedUpgrades.map((u, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                                    <i className="ri-arrow-right-circle-line text-emerald-500" />
                                    <span>{u}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                                <span><i className="ri-timer-line mr-1" />{agent.estimatedEffort}</span>
                                <span className="text-emerald-600">{agent.expectedImpact}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            onClick={() => setExpandedAgent(isExpanded ? null : agent.agentId)}
                            className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors"
                          >
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500 text-sm`} />
                          </button>
                          <button
                            onClick={() => executeAgentUpgrade(agent.agentId)}
                            disabled={agent.upgradeStatus === 'completed' || agent.upgradeStatus === 'in_progress'}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                              agent.upgradeStatus === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                              agent.upgradeStatus === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                              'bg-foreground-950 hover:bg-foreground-900 text-white'
                            } disabled:opacity-50`}
                          >
                            {agent.upgradeStatus === 'completed' ? '✓ Upgradé' :
                             agent.upgradeStatus === 'in_progress' ? '⏳ En cours' :
                             agent.upgradeStatus === 'failed' ? '↻ Réessayer' : 'Upgrader'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Automate Upgrades */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <i className="ri-cpu-line text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground-950">
                    Automates — {automateUpgrades.length} Upgrades
                  </h3>
                  <p className="text-xs text-foreground-500">{automateUpgrades.filter(a => a.status === 'completed').length}/{automateUpgrades.length} complétés</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {automateUpgrades.map((automate) => {
                  const statusStyle = getUpgradeStatusBadge(automate.status);
                  return (
                    <div key={automate.automateId} className={`rounded-xl border-2 p-4 transition-all ${
                      automate.status === 'completed' ? 'border-emerald-200 bg-emerald-50/20' :
                      automate.status === 'in_progress' ? 'border-amber-300 bg-amber-50/20' :
                      automate.status === 'failed' ? 'border-red-300 bg-red-50/20' :
                      'bg-white border-background-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center">
                          <i className={`${automate.icon} text-sm text-foreground-500`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-foreground-950 truncate">{automate.automateName}</h4>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${statusStyle}`}>
                            {automate.status === 'completed' ? 'Complété' : automate.status === 'in_progress' ? 'En cours' : 'En attente'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-foreground-400 mb-2">
                        <span>{automate.currentVersion} → <strong className="text-emerald-600">{automate.targetVersion}</strong></span>
                      </div>
                      <div className="space-y-1 mb-3">
                        {automate.newAbilities.map((a, i) => (
                          <span key={i} className="block text-[10px] text-emerald-700">+ {a}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-foreground-400 mb-3">
                        <span>{automate.estimatedDuration}</span>
                        <span>{automate.dependencies.length} dépendances</span>
                      </div>
                      <button
                        onClick={() => executeAutomateUpgrade(automate.automateId)}
                        disabled={automate.status === 'completed' || automate.status === 'in_progress'}
                        className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                          automate.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                          automate.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                          'bg-foreground-950 hover:bg-foreground-900 text-white'
                        } disabled:opacity-50`}
                      >
                        {automate.status === 'completed' ? '✓ Upgradé' :
                         automate.status === 'in_progress' ? '⏳ En cours' : 'Upgrader'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 3: GSC URL BOOSTER ============ */}
        {activeTab === 'gsc' && (
          <div className="space-y-8">
            {/* GSC Overview */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <i className="ri-google-line text-amber-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Google Search Console — URL Booster</h3>
                  <p className="text-xs text-gray-400">{gscUrls.length} URLs à soumettre pour indexation</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-amber-400">{gscStats.currentIndexedRate}</div>
                  <div className="text-[10px] text-gray-400">Taux Actuel</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-emerald-400">{gscStats.targetIndexedRate}</div>
                  <div className="text-[10px] text-gray-400">Cible</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-accent-400">{formatNumber(gscStats.sitemapUrlCount)}</div>
                  <div className="text-[10px] text-gray-400">dans sitemap</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-red-400">{gscStats.totalSitePages - gscStats.sitemapUrlCount}</div>
                  <div className="text-[10px] text-gray-400">hors sitemap</div>
                </div>
              </div>
              {/* Submit progress */}
              {gscSubmitProgress.active && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
                    <span>Soumission en cours...</span>
                    <span className="text-amber-400 font-bold">{gscSubmitProgress.submitted}/{gscSubmitProgress.total}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${(gscSubmitProgress.submitted / gscSubmitProgress.total) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* URLs Grid */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <i className="ri-link-m text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground-950">URLs à Soumettre</h3>
                    <p className="text-xs text-foreground-500">{submittedUrls}/{gscUrls.length} soumises</p>
                  </div>
                </div>
                <button
                  onClick={submitGscUrls}
                  disabled={submittedUrls >= gscUrls.length || gscSubmitProgress.active}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-line" />
                  Tout soumettre
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-background-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Priorité</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">URL</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Catégorie</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Statut Actuel</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Trafic Est.</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gscUrls.map((url) => {
                      const sev = getSeverityBadge(url.priority);
                      const statusStyle = getGSCStatusBadge(url.indexStatus);
                      return (
                        <tr key={url.url} className="border-t border-background-100 hover:bg-background-50/70 transition-colors">
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.border} ${sev.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                              {sev.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold text-foreground-950">{url.title}</span>
                            <br />
                            <span className="text-[10px] text-foreground-400">{url.url}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] text-foreground-500 whitespace-nowrap">{url.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] text-red-600 font-medium whitespace-nowrap">{url.currentStatus.replace(/_/g, ' ')}</span>
                          </td>
                          <td className="px-4 py-3 text-xs font-bold text-foreground-950">+{formatNumber(url.estimatedTraffic)}</td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] text-foreground-500 max-w-[200px] block truncate">{url.action}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}>
                              {url.indexStatus === 'submitted' ? 'Soumise' : url.indexStatus === 'indexed' ? 'Indexée' : 'En attente'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB 4: LINKEDIN FIX ============ */}
        {activeTab === 'linkedin' && (
          <div className="space-y-8">
            {/* LinkedIn Health */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <i className="ri-linkedin-line text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold">LinkedIn Bridge — Santé Temps Réel</h3>
                  <p className="text-xs text-gray-400">Statut : 
                    <span className={`ml-1 font-bold ${
                      linkedInHealth.bridgeStatus === 'operational' ? 'text-emerald-400' :
                      linkedInHealth.bridgeStatus === 'degraded' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>{linkedInHealth.bridgeStatus}</span>
                  </p>
                </div>
                <button
                  onClick={fixLinkedInBlocking}
                  disabled={resolvedDiags >= linkedInDiagnostics.filter(d => d.autoFixable).length || linkedInFixProgress.active}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <i className={`ri-tools-line ${linkedInFixProgress.active ? 'animate-pulse' : ''}`} />
                  {linkedInFixProgress.active ? 'Correction...' : 'Corriger LinkedIn'}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className={`text-2xl font-bold font-heading ${linkedInHealth.blockedRequestsLastHour > 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {linkedInHealth.blockedRequestsLastHour}/{linkedInHealth.requestsLastHour}
                  </div>
                  <div className="text-[10px] text-gray-400">Requêtes bloquées/heure</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-red-400">{linkedInHealth.failedPostsLast7d}</div>
                  <div className="text-[10px] text-gray-400">Posts échoués (7j)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className="text-2xl font-bold font-heading text-emerald-400">{linkedInHealth.successfulPostsLast7d}</div>
                  <div className="text-[10px] text-gray-400">Posts réussis (7j)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/8 border border-white/10">
                  <div className={`text-sm font-bold font-heading ${linkedInHealth.oauthStatus === 'configured' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {linkedInHealth.oauthStatus === 'configured' ? 'Configuré' : 'Non configuré'}
                  </div>
                  <div className="text-[10px] text-gray-400">OAuth LinkedIn</div>
                </div>
              </div>
            </div>

            {/* Diagnostics */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <i className="ri-error-warning-line text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground-950">
                    {linkedInDiagnostics.length} Diagnostics — {resolvedDiags} résolus
                  </h3>
                  <p className="text-xs text-foreground-500">Solutions implémentables pour débloquer LinkedIn</p>
                </div>
              </div>
              <div className="space-y-4">
                {linkedInDiagnostics.map((diag) => {
                  const isExpanded = expandedDiag === diag.diagnosticId;
                  const sev = getSeverityBadge(diag.severity);
                  const statusStyle = getLinkedInStatusBadge(diag.status);
                  return (
                    <div key={diag.diagnosticId} className={`rounded-2xl border-2 p-5 transition-all ${
                      diag.status === 'resolved' ? 'border-emerald-200 bg-emerald-50/20' :
                      diag.status === 'fixing' ? 'border-amber-300 bg-amber-50/20' :
                      'border-red-200 bg-red-50/10'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${sev.bg}`}>
                          <i className={`text-base ${sev.text} ${
                            diag.category === 'auth' ? 'ri-shield-keyhole-line' :
                            diag.category === 'rate_limit' ? 'ri-speed-mini-line' :
                            diag.category === 'scraping' ? 'ri-search-line' :
                            diag.category === 'monitoring' ? 'ri-radar-line' :
                            'ri-error-warning-line'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="text-sm font-bold text-foreground-950">{diag.issue}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.border} ${sev.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                              {sev.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle}`}>
                              {diag.status === 'resolved' ? 'Résolu' : diag.status === 'fixing' ? 'En correction' : 'Détecté'}
                            </span>
                            {diag.autoFixable && <span className="text-[10px] text-emerald-600 font-bold">Auto-fix</span>}
                          </div>
                          <p className="text-xs text-foreground-600 mb-2">{diag.description}</p>
                          {diag.status !== 'resolved' && (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-2">
                              <p className="text-[10px] font-bold text-amber-700 mb-1">Cause racine :</p>
                              <p className="text-xs text-amber-800">{diag.rootCause}</p>
                            </div>
                          )}
                          <p className="text-xs text-emerald-700 font-medium mb-1">{diag.solution}</p>
                          <p className="text-[10px] text-foreground-400">Temps estimé : {diag.estimatedFixTime}</p>

                          {isExpanded && diag.implementationSteps.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-background-200">
                              <p className="text-[10px] font-bold text-foreground-400 uppercase mb-2">Étapes d'implémentation</p>
                              <div className="space-y-1">
                                {diag.implementationSteps.map((step, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs">
                                    <span className="w-5 h-5 rounded-full bg-background-100 text-foreground-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">{i + 1}</span>
                                    <span className="text-foreground-600 pt-0.5">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => setExpandedDiag(isExpanded ? null : diag.diagnosticId)}
                            className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors"
                          >
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500 text-sm`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Cross-link Ecosystem */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Systèmes Interconnectés
            </h2>
            <p className="text-foreground-600">Le Global System Upgrade impacte tous les command centers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { label: 'Agent Performance', path: '/kos-global-agent-performance', icon: 'ri-robot-line', color: '#4F46E5' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-search-line', color: '#0D7B5F' },
              { label: 'LinkedIn Distribution', path: '/kos-linkedin-distribution-program', icon: 'ri-linkedin-line', color: '#0A66C2' },
              { label: 'YouTube Studio', path: '/kos-youtube-download', icon: 'ri-youtube-line', color: '#FF0000' },
              { label: 'Social Command', path: '/kos-social-media-command', icon: 'ri-share-line', color: '#9B7B2C' },
              { label: 'Total Governance', path: '/kos-total-governance-regulatory-excellence', icon: 'ri-shield-check-line', color: '#C2410C' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}