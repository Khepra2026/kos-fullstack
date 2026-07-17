import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { DOMAIN_SUMMARIES as MOCK_DOMAINS, BLOCK_CORRECTIVE_MANIFESTS as MOCK_BLOCKS, GLOBAL_SCAN_STATS as MOCK_STATS } from '@/mocks/kosGlobalAgentScan';
import { AGENT_PERFORMANCES } from '@/mocks/kosGlobalAgentScanAgents';
import { useGlobalAgentPerformance } from '@/hooks/useGlobalAgentPerformance';
import type { AgentPerformance, CorrectiveAction, BlockCorrectiveManifest, DomainSummary, GlobalScanStats } from '@/hooks/useGlobalAgentPerformance';

function getHealthColor(score: number): string {
  if (score >= 90) return '#86BC25';
  if (score >= 75) return '#E8C547';
  if (score >= 60) return '#E8943A';
  return '#C2410C';
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'optimal': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Optimal', dot: 'bg-emerald-500' };
    case 'stable': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Stable', dot: 'bg-amber-500' };
    case 'degraded': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'Dégradé', dot: 'bg-orange-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', dot: 'bg-red-500' };
    case 'major': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'MAJEUR', dot: 'bg-amber-500' };
    case 'minor': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'MINEUR', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getActionStatus(actionStatus: string) {
  switch (actionStatus) {
    case 'open': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Ouvert', dot: 'bg-red-500' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500' };
    case 'fixed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Corrigé', dot: 'bg-emerald-500' };
    case 'pending_block': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'Bloc en attente', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

type TabId = 'overview' | 'agents' | 'corrective' | 'logs';

export default function KOSGlobalAgentPerformancePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [executingBlock, setExecutingBlock] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [executingAll, setExecutingAll] = useState(false);

  const { agents: liveAgents, blocks: liveBlocks, domainSummaries: liveDomains, globalStats: liveStats, loading, error, dataSource, retry, executeBlock, executeAllBlocks } = useGlobalAgentPerformance();

  const displayAgents = useMemo(() => {
    if (dataSource === 'supabase' && liveAgents.length > 0) return liveAgents;
    return AGENT_PERFORMANCES;
  }, [dataSource, liveAgents]);

  const displayBlocks = useMemo(() => {
    if (dataSource === 'supabase' && liveBlocks.length > 0) return liveBlocks;
    return MOCK_BLOCKS;
  }, [dataSource, liveBlocks]);

  const displayDomainSummaries: DomainSummary[] = useMemo(() => {
    if (dataSource === 'supabase' && liveDomains.length > 0) return liveDomains;
    return MOCK_DOMAINS;
  }, [dataSource, liveDomains]);

  const displayGlobalStats: GlobalScanStats = useMemo(() => {
    if (dataSource === 'supabase' && liveStats) return liveStats;
    return MOCK_STATS;
  }, [dataSource, liveStats]);

  const filteredAgents = useMemo(() => {
    if (selectedDomain === 'all') return displayAgents;
    return displayAgents.filter((a) => a.domainId === selectedDomain);
  }, [selectedDomain, displayAgents]);

  const allCorrectiveActions = useMemo(() => {
    return displayAgents.flatMap((a) =>
      a.correctiveActions
        .filter((c) => c.status !== 'fixed')
        .map((c) => ({ ...c, agentName: a.agentName, agentIcon: a.icon, agentColor: a.color, domainName: a.domainName }))
    ).sort((a, b) => {
      const sev = { critical: 0, major: 1, minor: 2 };
      return sev[a.severity as 'critical' | 'major' | 'minor'] - sev[b.severity as 'critical' | 'major' | 'minor'];
    });
  }, [displayAgents]);

  const handleExecuteBlock = async (blockId: string) => {
    setExecutingBlock(blockId);
    const blockName = displayBlocks.find(b => b.blockId === blockId)?.blockName || blockId;
    setToastMessage(`Exécution du bloc "${blockName}" lancée...`);

    try {
      await executeBlock(blockId);
      setToastMessage(`Bloc "${blockName}" exécuté avec succès — LIVE DB mis à jour.`);
      // Auto-refresh is handled by executeBlock → fetchAll
    } catch (err) {
      setToastMessage(`Erreur lors de l'exécution du bloc "${blockName}". Réessayez.`);
    } finally {
      setExecutingBlock(null);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleExecuteAllBlocks = async () => {
    setExecutingAll(true);
    setToastMessage('Exécution GLOBALE de tous les blocs correctifs lancée...');

    try {
      await executeAllBlocks();
      setToastMessage('Correction globale terminée — Tous les blocs exécutés. Score cible 100% Big Four. LIVE DB à jour.');
    } catch (err) {
      setToastMessage('Erreur lors de l\'exécution globale. Réessayez.');
    } finally {
      setExecutingAll(false);
      setTimeout(() => setToastMessage(null), 6000);
    }
  };

  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: String(displayDomainSummaries.length) },
    { id: 'agents', label: 'Agents', icon: 'ri-robot-line', count: String(displayAgents.length) },
    { id: 'corrective', label: 'Actions Correctives', icon: 'ri-tools-line', count: String(displayBlocks.length) },
    { id: 'logs', label: 'Journal', icon: 'ri-history-line', count: String(allCorrectiveActions.length) },
  ];

  return (
    <KOSHubLayout hubId={62}>
      <SeoHead
        title="KOS Global Agent Performance Scan — 75 Agents, 7 Domaines, 100% Big Four | KHEPRA EXPERTS"
        description="Scan global des performances agents et automates KOS. 75 agents scannés sur 7 domaines. 399 problèmes détectés, 6 blocs correctifs. Actions correctives en bloc pour atteindre 100% Big Four."
        keywords="KOS Global Agent Performance, scan agents KOS, actions correctives bloc, Big Four 100%, KHEPRA EXPERTS"
        canonicalPath="/kos-global-agent-performance"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=futuristic%20enterprise%20command%20center%20dashboard%20with%20holographic%20globe%20surrounded%20by%20orbiting%20agent%20nodes%20each%20glowing%20with%20status%20colors%20emerald%20for%20optimal%20amber%20for%20warning%20and%20red%20for%20critical%20interconnected%20data%20streams%20flowing%20between%20nodes%20representing%20automated%20agent%20performance%20scanning%20dark%20sophisticated%20enterprise%20monitoring%20visualization%20with%20deep%20depth%20of%20field%20and%20subtle%20particle%20effects%20no%20text%20no%20human%20figures%20premium%20corporate%20technology%20aesthetic&width=1920&height=600&seq=kos-global-agent-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/65 via-foreground-950/85 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                SCAN GLOBAL — {displayGlobalStats.totalAgents} Agents · {displayGlobalStats.totalIssues} Problèmes
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Scan Global des Performances
              <span className="block text-red-400 mt-2">Agents & Automates KOS</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{displayGlobalStats.totalAgents} agents</strong> scannés sur{' '}
              <strong className="text-white">{displayDomainSummaries.length} domaines</strong>.{' '}
              <strong className="text-red-300">{displayGlobalStats.criticalOpen} critiques</strong>,{' '}
              <strong className="text-amber-300">{displayGlobalStats.majorOpen} majeurs</strong>.{' '}
              <strong className="text-emerald-300">{displayGlobalStats.autoFixable} actions auto-fixables.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleExecuteAllBlocks}
                disabled={executingAll}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-flashlight-line ${executingAll ? 'animate-pulse' : ''}`} />
                {executingAll ? 'Exécution en cours...' : 'Corriger TOUT en bloc'}
              </button>
              {dataSource === 'supabase' ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-300 font-bold whitespace-nowrap">LIVE DB · Supabase</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-sm text-amber-300 font-bold whitespace-nowrap">MOCK · Fallback</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-red-300 font-semibold">{displayGlobalStats.criticalOpen} Critiques</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-amber-300 font-semibold">{displayGlobalStats.majorOpen} Majeurs</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-emerald-300 font-semibold">{displayGlobalStats.totalFixed} Corrigés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex items-center justify-center gap-2 mb-3 text-xs text-foreground-400">
              <i className="ri-loader-4-line animate-spin" />
              <span>Chargement LIVE DB...</span>
            </div>
          )}
          {error && !loading && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xs text-amber-600">Données mock — </span>
              <button onClick={retry} className="text-xs text-primary-600 hover:text-primary-700 font-bold underline cursor-pointer">Réessayer LIVE DB</button>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Agents scannés', value: `${displayAgents.length}`, icon: 'ri-robot-line', color: '#4F46E5' },
              { label: 'Domaines', value: String(displayDomainSummaries.length), icon: 'ri-stack-line', color: '#86BC25' },
              { label: 'Score Big Four', value: `${displayGlobalStats.avgBigFourScore}%`, icon: 'ri-medal-line', color: '#9B7B2C' },
              { label: 'Critiques', value: String(displayAgents.filter(a => a.status === 'critical').length), icon: 'ri-close-circle-line', color: '#C2410C' },
              { label: 'Majeurs', value: String(displayGlobalStats.majorOpen), icon: 'ri-alert-line', color: '#E8943A' },
              { label: 'Auto-fixables', value: String(displayAgents.reduce((sum, a) => sum + a.autoFixable, 0)), icon: 'ri-flashlight-line', color: '#0D7B5F' },
              { label: 'Corrigés', value: String(displayAgents.reduce((sum, a) => sum + a.fixedIssues, 0)), icon: 'ri-check-double-line', color: '#86BC25' },
              { label: 'Blocs correctifs', value: String(displayBlocks.length), icon: 'ri-tools-line', color: '#6B4A3A' },
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

      {/* === TAB: OVERVIEW === */}
      {activeTab === 'overview' && (
        <>
          {/* Domain Cards */}
          <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  {displayDomainSummaries.length} Domaines — Vue d'Ensemble
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Score Big Four moyen : <strong className="text-foreground-950">{displayGlobalStats.avgBigFourScore}%</strong>.{' '}
                  {displayDomainSummaries.filter(d => d.avgHealthScore >= 85).length} domaines au-dessus de 85%.{' '}
                  Dernier scan : {new Date(displayGlobalStats.lastFullScan).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {displayDomainSummaries.map((domain) => {
                  const healthColor = getHealthColor(domain.avgHealthScore);
                  const agents = displayAgents.filter((a) => a.domainId === domain.domainId);
                  return (
                    <div key={domain.domainId} className="rounded-2xl bg-white border border-background-200 p-6 hover:shadow-md transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${domain.color}15` }}>
                          <i className={`${domain.icon} text-xl`} style={{ color: domain.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base font-bold text-foreground-950 mb-1">{domain.domainName}</h3>
                          <p className="text-xs text-foreground-500">{domain.agentCount} agents</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${healthColor}15`, color: healthColor }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: healthColor }} />
                              Big Four {domain.avgBigFourScore}%
                            </span>
                            <span className="text-[10px] text-foreground-400">Santé {domain.avgHealthScore}%</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold font-heading" style={{ color: healthColor }}>{domain.avgHealthScore}%</div>
                          <div className="text-[9px] text-foreground-400">Score santé</div>
                        </div>
                      </div>
                      {/* Health bar */}
                      <div className="w-full h-1.5 rounded-full bg-background-200 overflow-hidden mb-4">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${domain.avgHealthScore}%`, backgroundColor: healthColor }} />
                      </div>
                      {/* Status breakdown */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center p-2 rounded-lg bg-background-50">
                          <span className="block text-sm font-bold text-emerald-600">{domain.agentsOptimal}</span>
                          <span className="text-[9px] text-foreground-400">Optimal</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-background-50">
                          <span className="block text-sm font-bold text-amber-600">{domain.agentsStable}</span>
                          <span className="text-[9px] text-foreground-400">Stable</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-background-50">
                          <span className="block text-sm font-bold text-orange-600">{domain.agentsDegraded}</span>
                          <span className="text-[9px] text-foreground-400">Dégradé</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-background-50">
                          <span className="block text-sm font-bold text-red-600">{domain.agentsCritical}</span>
                          <span className="text-[9px] text-foreground-400">Critique</span>
                        </div>
                      </div>
                      {/* Issues */}
                      <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                        <span className="text-red-600 font-bold">{domain.criticalIssues} critiques</span>
                        <span className="text-amber-600 font-bold">{domain.majorIssues} majeurs</span>
                        <span className="text-emerald-600 font-bold">{domain.fixedIssues} corrigés</span>
                        <span className="ml-auto text-accent-600 font-bold">{domain.autoFixable} auto-fixables</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Block Corrective Section */}
          <section className="py-10 bg-background-50 border-t border-background-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                  {displayBlocks.length} Blocs Correctifs
                </h2>
                <p className="text-foreground-600 max-w-2xl mx-auto">
                  Actions correctives groupées par bloc. {displayBlocks.filter(b => b.status === 'in_progress').length} en cours,{' '}
                  {displayBlocks.filter(b => b.status === 'pending').length} en attente.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayBlocks.map((block) => (
                  <div key={block.blockId} className={`rounded-2xl border p-5 transition-all ${block.status === 'in_progress' ? 'border-red-300 bg-red-50/30' : 'bg-white border-background-200 hover:shadow-md'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${block.status === 'in_progress' ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span className={`text-xs font-bold uppercase ${block.status === 'in_progress' ? 'text-red-600' : 'text-slate-500'}`}>
                        {block.status === 'in_progress' ? 'En cours' : 'En attente'}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 mb-2">{block.blockName}</h3>
                    <p className="text-xs text-foreground-500 mb-3 line-clamp-2">{block.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 rounded-lg bg-background-50">
                        <span className="block text-sm font-bold text-red-600">{block.criticalActions}</span>
                        <span className="text-[9px] text-foreground-400">Critiques</span>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background-50">
                        <span className="block text-sm font-bold text-amber-600">{block.majorActions}</span>
                        <span className="text-[9px] text-foreground-400">Majeurs</span>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-background-50">
                        <span className="block text-sm font-bold text-accent-600">{block.autoFixableActions}</span>
                        <span className="text-[9px] text-foreground-400">Auto-fix</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400 mb-1">
                      <i className="ri-timer-line" />
                      <span>{block.estimatedTotalEffort}</span>
                      <span className="ml-auto">{block.totalAgentsAffected} agents</span>
                    </div>
                    <p className="text-[10px] text-emerald-600 font-medium">{block.globalImpact}</p>
                    <button
                      onClick={() => handleExecuteBlock(block.blockId)}
                      disabled={executingBlock === block.blockId}
                      className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        block.status === 'in_progress'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-foreground-950 hover:bg-foreground-900 text-white'
                      } disabled:opacity-50`}
                    >
                      <i className={`ri-play-line ${executingBlock === block.blockId ? 'animate-spin' : ''}`} />
                      {executingBlock === block.blockId ? 'Exécution...' : 'Exécuter le bloc'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* === TAB: AGENTS === */}
      {activeTab === 'agents' && (
        <section className="py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Domain Filter */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <button onClick={() => setSelectedDomain('all')} className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${selectedDomain === 'all' ? 'bg-foreground-950 text-white' : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'}`}>
                Tous ({displayAgents.length})
              </button>
              {displayDomainSummaries.map((domain) => (
                <button
                  key={domain.domainId}
                  onClick={() => setSelectedDomain(domain.domainId)}
                  className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                    selectedDomain === domain.domainId
                      ? 'text-white'
                      : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                  }`}
                  style={selectedDomain === domain.domainId ? { backgroundColor: domain.color } : {}}
                >
                  <i className={`${domain.icon} mr-1 text-xs`} />
                  {domain.domainName.split(' & ')[0]} ({domain.agentCount})
                </button>
              ))}
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map((agent) => {
                const isExpanded = expandedAgent === agent.agentId;
                const healthColor = getHealthColor(agent.healthScore);
                const statusBadge = getStatusBadge(agent.status);
                const openActions = agent.correctiveActions.filter((a) => a.status !== 'fixed').length;

                return (
                  <div key={agent.agentId} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'bg-white border-background-200 hover:shadow-md'}`}>
                    <button
                      onClick={() => setExpandedAgent(isExpanded ? null : agent.agentId)}
                      className="w-full p-4 text-left flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${agent.color}15` }}>
                        <i className={`${agent.icon} text-base`} style={{ color: agent.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <h3 className="text-xs font-bold text-foreground-950 truncate">{agent.agentName}</h3>
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                            <span className={`w-1 h-1 rounded-full ${statusBadge.dot}`} />
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-foreground-500 line-clamp-1">{agent.description}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[9px]">
                          <span style={{ color: healthColor }} className="font-bold">Big Four {agent.bigFourScore}%</span>
                          <span className="text-foreground-400">|</span>
                          <span className="text-foreground-400">{openActions} actions</span>
                          <span className="text-foreground-400">|</span>
                          <span className="text-foreground-400">{agent.autoFixable} auto</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-base font-bold font-heading" style={{ color: healthColor }}>{agent.healthScore}%</div>
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-sm`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-200 pt-3">
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          <div className="text-center p-2 rounded-lg bg-background-50">
                            <span className="block text-xs font-bold text-red-600">{agent.criticalIssues}</span>
                            <span className="text-[8px] text-foreground-400">Critiques</span>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-background-50">
                            <span className="block text-xs font-bold text-amber-600">{agent.majorIssues}</span>
                            <span className="text-[8px] text-foreground-400">Majeurs</span>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-background-50">
                            <span className="block text-xs font-bold text-slate-600">{agent.minorIssues}</span>
                            <span className="text-[8px] text-foreground-400">Mineurs</span>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-background-50">
                            <span className="block text-xs font-bold text-emerald-600">{agent.fixedIssues}</span>
                            <span className="text-[8px] text-foreground-400">Corrigés</span>
                          </div>
                        </div>
                        {agent.correctiveActions.length > 0 && (
                          <>
                            <h5 className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-2">Actions correctives</h5>
                            <div className="space-y-1.5">
                              {agent.correctiveActions.map((action) => {
                                const sevBadge = getSeverityBadge(action.severity);
                                const actStatus = getActionStatus(action.status);
                                return (
                                  <div key={action.actionId} className="p-2 rounded-lg bg-background-50 border border-background-100">
                                    <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                                      <span className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[7px] font-bold ${sevBadge.bg} ${sevBadge.border} ${sevBadge.text}`}>{sevBadge.label}</span>
                                      <span className={`inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[7px] font-bold ${actStatus.bg} ${actStatus.border} ${actStatus.text}`}>{actStatus.label}</span>
                                      {action.autoFixAvailable && <span className="text-[7px] text-emerald-600 font-bold">Auto</span>}
                                      <span className="text-[7px] text-foreground-400 ml-auto">{action.estimatedEffort}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-foreground-800">{action.title}</p>
                                    <p className="text-[8px] text-foreground-400 mt-0.5">{action.impactEstimate}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                        <a
                          href={agent.hubUrl}
                          className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-primary-600 hover:text-primary-700 cursor-pointer"
                        >
                          <i className="ri-external-link-line text-xs" />
                          Ouvrir le hub
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: CORRECTIVE === */}
      {activeTab === 'corrective' && (
        <section className="py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Bannière urgence */}
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-red-600 text-lg" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-700">{allCorrectiveActions.filter(a => a.severity === 'critical').length} actions critiques en attente</p>
                <p className="text-xs text-red-500">{displayGlobalStats.autoFixable} actions auto-fixables sur {allCorrectiveActions.length} totales. Effort global estimé : {displayGlobalStats.estimatedGlobalEffort}.</p>
              </div>
              <button
                onClick={handleExecuteAllBlocks}
                disabled={executingAll}
                className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-flashlight-line ${executingAll ? 'animate-pulse' : ''}`} />
                Tout corriger
              </button>
            </div>

            {/* Blocs détaillés */}
            <div className="space-y-6">
              {displayBlocks.map((block) => {
                const blockAgents = displayAgents.filter((a) => block.targetDomains.includes(a.domainId));
                const blockActions = blockAgents.flatMap((a) =>
                  a.correctiveActions.filter((c) => c.status !== 'fixed')
                );

                return (
                  <div key={block.blockId} className={`rounded-2xl border-2 p-6 ${block.status === 'in_progress' ? 'border-red-300 bg-red-50/20' : 'border-background-200 bg-white'}`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${block.status === 'in_progress' ? 'bg-red-100' : 'bg-background-100'}`}>
                        <i className={`ri-stack-line text-xl ${block.status === 'in_progress' ? 'text-red-600' : 'text-foreground-500'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-heading text-lg font-bold text-foreground-950">{block.blockName}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${block.status === 'in_progress' ? 'bg-red-100 border border-red-200 text-red-700' : 'bg-slate-100 border border-slate-200 text-slate-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${block.status === 'in_progress' ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                            {block.status === 'in_progress' ? 'En cours' : 'En attente'}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-600 mb-3">{block.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="text-red-600 font-bold">{block.criticalActions} critiques</span>
                          <span className="text-amber-600 font-bold">{block.majorActions} majeures</span>
                          <span className="text-emerald-600 font-bold">{block.autoFixableActions} auto-fixables</span>
                          <span className="text-foreground-400">{block.totalAgentsAffected} agents</span>
                          <span className="text-foreground-400">{block.estimatedTotalEffort}</span>
                        </div>
                        <p className="text-xs text-emerald-600 font-medium mt-2">{block.globalImpact}</p>
                      </div>
                      <button
                        onClick={() => handleExecuteBlock(block.blockId)}
                        disabled={executingBlock === block.blockId}
                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                          block.status === 'in_progress'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-foreground-950 hover:bg-foreground-900 text-white'
                        } disabled:opacity-50`}
                      >
                        <i className={`ri-play-line ${executingBlock === block.blockId ? 'animate-spin' : ''}`} />
                        Exécuter
                      </button>
                    </div>

                    {/* Actions list */}
                    {blockActions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-background-200">
                        <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">
                          {blockActions.length} actions ({blockActions.filter(a => a.status === 'in_progress').length} en cours)
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                          {blockActions.map((action) => {
                            const sevBadge = getSeverityBadge(action.severity);
                            const actStatus = getActionStatus(action.status);
                            return (
                              <div key={action.actionId} className="p-3 rounded-xl bg-background-50 border border-background-100">
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${sevBadge.bg} ${sevBadge.border} ${sevBadge.text}`}>{sevBadge.label}</span>
                                  <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${actStatus.bg} ${actStatus.border} ${actStatus.text}`}>{actStatus.label}</span>
                                  {action.autoFixAvailable && <span className="text-[8px] text-emerald-600 font-bold">Auto-fix</span>}
                                  <span className="text-[8px] text-foreground-400 ml-auto">{action.estimatedEffort}</span>
                                </div>
                                <p className="text-xs font-bold text-foreground-800">{action.title}</p>
                                <p className="text-[9px] text-foreground-500 mt-0.5">{action.description}</p>
                                <div className="flex items-center gap-2 mt-1 text-[8px] text-foreground-400">
                                  <span><i className="ri-robot-line mr-0.5" />{action.assignedAgent}</span>
                                  <span className="text-emerald-600">{action.impactEstimate}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: LOGS === */}
      {activeTab === 'logs' && (
        <section className="py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                Journal des Actions — {allCorrectiveActions.length} en attente
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                Toutes les actions correctives identifiées lors du scan global. Priorisées par criticité.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <button className="px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white cursor-pointer whitespace-nowrap">
                Critiques ({allCorrectiveActions.filter(a => a.severity === 'critical').length})
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-bold bg-white border border-background-200 text-foreground-600 cursor-pointer whitespace-nowrap">
                Majeures ({allCorrectiveActions.filter(a => a.severity === 'major').length})
              </button>
              <button className="px-4 py-2 rounded-full text-sm font-bold bg-white border border-background-200 text-foreground-600 cursor-pointer whitespace-nowrap">
                Mineures ({allCorrectiveActions.filter(a => a.severity === 'minor').length})
              </button>
            </div>

            <div className="space-y-2">
              {allCorrectiveActions.map((action) => {
                const sevBadge = getSeverityBadge(action.severity);
                const actStatus = getActionStatus(action.status);
                return (
                  <div key={action.actionId} className="rounded-xl bg-white border border-background-200 p-4 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${action.agentColor}15` }}>
                        <i className={`${action.agentIcon} text-xs`} style={{ color: action.agentColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${sevBadge.bg} ${sevBadge.border} ${sevBadge.text}`}>{sevBadge.label}</span>
                          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-bold ${actStatus.bg} ${actStatus.border} ${actStatus.text}`}>{actStatus.label}</span>
                          <span className="text-[9px] text-foreground-400">{action.domainName}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground-800">{action.title}</p>
                        <p className="text-xs text-foreground-500 mt-0.5">{action.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[9px] text-foreground-400">
                          <span><i className="ri-robot-line mr-0.5" />{action.assignedAgent}</span>
                          <span><i className="ri-timer-line mr-0.5" />{action.estimatedEffort}</span>
                          <span className="text-emerald-600 font-medium">{action.impactEstimate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {allCorrectiveActions.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-double-line text-2xl text-emerald-500" />
                </div>
                <p className="text-foreground-700 font-bold text-lg">Aucune action en attente !</p>
                <p className="text-xs text-foreground-400 mt-1">Tous les agents sont à 100% Big Four.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-foreground-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <i className="ri-flashlight-line text-amber-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Cross-link */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Command Centers
            </h2>
            <p className="text-foreground-600">Tous les hubs de commandement interconnectés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { label: 'Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#4F46E5' },
              { label: 'Block Scanner', path: '/kos-agent-block-updates', icon: 'ri-stack-line', color: '#86BC25' },
              { label: 'SEO + AEO', path: '/kos-seo-aeo-command', icon: 'ri-search-line', color: '#0D7B5F' },
              { label: 'KPI Tower', path: '/kos-enterprise-kpi-command', icon: 'ri-bar-chart-grouped-line', color: '#9B7B2C' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-dashboard-line', color: '#C2410C' },
              { label: 'Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-git-merge-line', color: '#0891B2' },
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