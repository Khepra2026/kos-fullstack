import { useState, useMemo } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSMassInfraUpgrade } from '@/hooks/useKOSMassInfraUpgrade';
import type { MassTask, DomainSummary } from '@/hooks/useKOSMassInfraUpgrade';

type TabId = 'overview' | 'infrastructure' | 'geo' | 'seo' | 'ai_visibility' | 'lead_magnets' | 'logs';

const DOMAIN_CONFIG: Record<string, { label: string; icon: string; hexColor: string; bgClass: string; textClass: string; borderClass: string }> = {
  infrastructure: { label: 'Infrastructure', icon: 'ri-server-line', hexColor: '#DC2626', bgClass: 'bg-red-50', textClass: 'text-red-700', borderClass: 'border-red-200' },
  geo: { label: 'GEO Authority', icon: 'ri-radar-line', hexColor: '#0D7B5F', bgClass: 'bg-emerald-50', textClass: 'text-emerald-700', borderClass: 'border-emerald-200' },
  seo: { label: 'SEO / Indexation', icon: 'ri-search-line', hexColor: '#9B7B2C', bgClass: 'bg-amber-50', textClass: 'text-amber-700', borderClass: 'border-amber-200' },
  ai_visibility: { label: 'AI Visibility', icon: 'ri-robot-2-line', hexColor: '#0D9488', bgClass: 'bg-teal-50', textClass: 'text-teal-700', borderClass: 'border-teal-200' },
  lead_magnets: { label: 'Lead Magnets', icon: 'ri-user-star-line', hexColor: '#7C3AED', bgClass: 'bg-violet-50', textClass: 'text-violet-700', borderClass: 'border-violet-200' },
};

const PRIORITY_CONFIG: Record<string, { label: string; hexColor: string; bgClass: string; borderClass: string }> = {
  critical: { label: 'CRITIQUE', hexColor: '#DC2626', bgClass: 'bg-red-50', borderClass: 'border-red-200' },
  high: { label: 'HAUT', hexColor: '#EA580C', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' },
  medium: { label: 'MOYEN', hexColor: '#6366F1', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-200' },
};

function formatNumber(v: number): string {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return v.toLocaleString('fr-FR');
}

export default function massInfraUpgradePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const {
    tasks, domainSummaries, stats, executionLogs,
    isExecuting, currentDomain, overallProgress, executionMode,
    executeTask, executeDomain, executeAllCritical, executeAllAutoFixable, executeAll,
    cancelExecution, resetAll,
    realFunctionTasks, mockOnlyTasks,
  } = useKOSMassInfraUpgrade();

  const toggleExpand = (id: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredTasks = useMemo(() => {
    if (activeTab === 'overview' || activeTab === 'logs') return tasks;
    if (activeTab === 'infrastructure') return tasks.filter(t => t.domain === 'infrastructure');
    if (activeTab === 'geo') return tasks.filter(t => t.domain === 'geo');
    if (activeTab === 'seo') return tasks.filter(t => t.domain === 'seo');
    if (activeTab === 'ai_visibility') return tasks.filter(t => t.domain === 'ai_visibility');
    if (activeTab === 'lead_magnets') return tasks.filter(t => t.domain === 'lead_magnets');
    return tasks;
  }, [tasks, activeTab]);

  const logLines = useMemo(() => {
    if (executionLogs.length === 0 && !isExecuting) return [];
    return executionLogs.filter(l => activeTab === 'logs' || l.domain === activeTab || activeTab === 'overview').slice(0, 50);
  }, [executionLogs, activeTab, isExecuting]);

  const tabs: { id: TabId; label: string; icon: string; badge: string }[] = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-3-line', badge: `${stats.overallProgress}%` },
    { id: 'infrastructure', label: 'Infrastructure', icon: 'ri-server-line', badge: `${domainSummaries[0]?.progressPct || 0}%` },
    { id: 'geo', label: 'GEO', icon: 'ri-radar-line', badge: `${domainSummaries[1]?.progressPct || 0}%` },
    { id: 'seo', label: 'SEO', icon: 'ri-search-line', badge: `${domainSummaries[2]?.progressPct || 0}%` },
    { id: 'ai_visibility', label: 'AI Visibility', icon: 'ri-robot-2-line', badge: `${domainSummaries[3]?.progressPct || 0}%` },
    { id: 'lead_magnets', label: 'Lead Magnets', icon: 'ri-user-star-line', badge: `${domainSummaries[4]?.progressPct || 0}%` },
    { id: 'logs', label: 'Logs Live', icon: 'ri-terminal-box-line', badge: String(executionLogs.length) },
  ];

  return (
    <hubLayout hubId={999}>
      <SeoHead
        title="KOS Mass Infrastructure & Visibility Upgrade™ — Exécution Bloc | KHEPRA EXPERTS"
        description="Centre de commandement unifié KOS. Identification et exécution en bloc de toutes les tâches de renforcement : infrastructure, GEO, SEO, visibilité IA, lead magnets. 26 tâches, 5 domaines, 1 clic."
        keywords="KOS Mass Upgrade, infrastructure upgrade, GEO SEO AI visibility, lead magnets, KHEPRA EXPERTS, exécution bloc"
        canonicalPath="/kos-mass-infra-upgrade"
        ogType="website"
      />

      {/* ============ HERO ============ */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Epic%20cinematic%20visualization%20of%20a%20massive%20orbital%20command%20platform%20with%20five%20interconnected%20concentric%20rings%20each%20glowing%20with%20distinct%20neon%20colors%20crimson%20red%20for%20infrastructure%20emerald%20green%20for%20GEO%20authority%20amber%20gold%20for%20SEO%20teal%20for%20AI%20visibility%20and%20violet%20for%20lead%20magnets%2C%20the%20rings%20orbit%20a%20central%20pulsating%20energy%20core%20with%20countdown%20timer%2C%20massive%20holographic%20data%20streams%20cascade%20between%20rings%20showing%20task%20completion%20percentages%2C%20dark%20dramatic%20cosmic%20background%20with%20volumetric%20lighting%2C%20ultra%20detailed%20futuristic%20military%20command%20center%20aesthetic%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20cinematic%20render%20with%20deep%20shadows%20and%20intense%20luminous%20contrast&width=1920&height=650&seq=kos-mass-infra-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            width="1920"
            height="650"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/50 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                MASS UPGRADE — {stats.totalTasks} TÂCHES · 5 DOMAINES
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Mass Infrastructure &
              <span className="block text-red-400 mt-2">Visibility Upgrade™</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{stats.totalTasks} tâches</strong> identifiées sur{' '}
              <strong className="text-white">5 domaines</strong>.{' '}
              <strong className="text-red-300">{stats.totalCritical} critiques</strong>,{' '}
              <strong className="text-amber-300">{stats.totalHigh} hautes</strong>.{' '}
              <strong className="text-emerald-300">{stats.totalAutoFixable} auto-fixables</strong>.{' '}
              <strong className="text-cyan-300">{realFunctionTasks} Edge Functions</strong> réelles +{' '}
              <strong className="text-gray-300">{mockOnlyTasks} code-level</strong>.{' '}
              Gain trafic estimé : <strong className="text-white">+{formatNumber(stats.estimatedTrafficGain)} visites/mois</strong>.{' '}
              Gain leads : <strong className="text-white">+{stats.estimatedLeadGain} leads/mois</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={executeAll}
                disabled={isExecuting || stats.overallProgress >= 100}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <i className={`ri-flashlight-line ${isExecuting ? 'animate-pulse' : ''}`} />
                {isExecuting ? `EXÉCUTION... ${overallProgress}%` :
                 stats.overallProgress >= 100 ? 'TOUT EST COMPLET !' :
                 stats.overallProgress > 0 ? `CONTINUER (${overallProgress}%)` : 'TOUT EXÉCUTER — 26 TÂCHES'}
              </button>
              <button
                onClick={executeAllCritical}
                disabled={isExecuting || stats.totalCritical === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-sm font-bold hover:bg-red-600/40 transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-alert-fill" />
                Critiques ({stats.totalCritical})
              </button>
              <button
                onClick={executeAllAutoFixable}
                disabled={isExecuting || stats.totalAutoFixable === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-sm font-bold hover:bg-emerald-600/40 transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-cpu-line" />
                Auto-Fix ({stats.totalAutoFixable})
              </button>
              {isExecuting && (
                <button
                  onClick={cancelExecution}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 text-sm font-bold hover:bg-amber-600/40 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
                >
                  <i className="ri-stop-circle-line" />
                  Annuler
                </button>
              )}
              {stats.overallProgress > 0 && !isExecuting && (
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
                >
                  <i className="ri-refresh-line" />
                  Reset
                </button>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="text-sm text-emerald-300 font-semibold">+{formatNumber(stats.estimatedTrafficGain)} trafic/mois</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-sm">
                <span className="text-sm text-teal-300 font-semibold">+{formatNumber(stats.estimatedReachGain)} reach</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30 backdrop-blur-sm">
                <span className="text-sm text-violet-300 font-semibold">+{stats.estimatedLeadGain} leads/mois</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TAB NAVIGATION ============ */}
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
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ PROGRESS BAR ============ */}
      <div className="bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-foreground-500 whitespace-nowrap">
              {isExecuting && currentDomain ? `${DOMAIN_CONFIG[currentDomain]?.label} en cours...` : 'Progression Globale'}
            </span>
            <div className="flex-1 h-2 bg-background-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{overallProgress}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ============ TAB: OVERVIEW ============ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Domain Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {domainSummaries.map((ds) => {
                const cfg = DOMAIN_CONFIG[ds.domain];
                return (
                  <div key={ds.domain} className={`rounded-2xl border-2 p-5 ${ds.completed === ds.totalTasks ? 'border-emerald-200 bg-emerald-50/30' : 'bg-white border-background-200/70'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bgClass}`}>
                        <i className={`${cfg.icon} text-lg ${cfg.textClass}`} />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-bold text-foreground-950">{cfg.label}</h3>
                        <p className="text-[10px] text-foreground-500">{ds.completed}/{ds.totalTasks} tâches</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Critiques</span>
                        <span className={`font-bold ${ds.critical > 0 ? 'text-red-600' : 'text-foreground-300'}`}>{ds.critical}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Hautes</span>
                        <span className={`font-bold ${ds.high > 0 ? 'text-amber-600' : 'text-foreground-300'}`}>{ds.high}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-500">Auto-fix</span>
                        <span className="font-bold text-emerald-600">{ds.autoFixable}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-background-200 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${ds.progressPct}%`, backgroundColor: cfg.hexColor }}
                      />
                    </div>
                    <button
                      onClick={() => executeDomain(ds.domain)}
                      disabled={isExecuting || ds.completed === ds.totalTasks}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                      style={{ backgroundColor: ds.completed === ds.totalTasks ? '#86BC25' : cfg.hexColor }}
                    >
                      <i className={`${isExecuting && currentDomain === ds.domain ? 'ri-loader-4-line animate-spin' : ds.completed === ds.totalTasks ? 'ri-check-double-line' : 'ri-play-line'}`} />
                      {ds.completed === ds.totalTasks ? 'Complété' : isExecuting && currentDomain === ds.domain ? 'En cours...' : `Exécuter ${ds.label}`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Target Summary */}
            <div className="rounded-2xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <i className="ri-crosshair-line text-accent-400 text-lg" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">Objectifs Cibles — Post-Upgrade</h3>
                  <p className="text-xs text-gray-400">Completion estimée : {stats.targetDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                {[
                  { label: 'Trafic Organique', value: `+${formatNumber(stats.estimatedTrafficGain)}/mois`, icon: 'ri-line-chart-line', color: 'emerald' },
                  { label: 'Reach Social', value: `+${formatNumber(stats.estimatedReachGain)}`, icon: 'ri-share-line', color: 'teal' },
                  { label: 'Leads Mensuels', value: `+${stats.estimatedLeadGain}/mois`, icon: 'ri-user-star-line', color: 'violet' },
                  { label: 'Indexation', value: '89→95%', icon: 'ri-google-line', color: 'amber' },
                  { label: 'Score GEO', value: '78→92/100', icon: 'ri-radar-line', color: 'rose' },
                ].map((obj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/8 border border-white/10">
                    <i className={`${obj.icon} text-accent-400 text-xl mb-2 block`} />
                    <span className="block text-xl font-bold font-heading">{obj.value}</span>
                    <span className="text-[10px] text-gray-400">{obj.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge Functions Connectivity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-cyan-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <i className="ri-cloud-line text-cyan-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950">Edge Functions Supabase — Exécution Réelle</h3>
                    <p className="text-xs text-foreground-500">{realFunctionTasks} fonctions déployées et actives</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['kos-orchestrator-engine', 'kos-performance-monitor', 'kos-llms-generator', 'kos-geo-visibility-engine', 'kos-knowledge-manager', 'kos-gsc-monitor', 'crawl-internal-links', 'kos-llm-content-generator', 'sitemap-xml-dynamic', 'email-funnel-sequence', 'kos-lead-scoring'].map(fn => (
                    <span key={fn} className="text-[10px] font-mono px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200 whitespace-nowrap">
                      {fn}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <i className="ri-code-s-slash-line text-gray-600 text-lg" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950">Code-Level Changes — Déploiement Manu</h3>
                    <p className="text-xs text-foreground-500">{mockOnlyTasks} modifications code/config à appliquer</p>
                  </div>
                </div>
                <p className="text-xs text-foreground-500 leading-relaxed">
                  Ces tâches représentent des modifications directes du code source (dépendances npm, bundle splitting, headers Netlify, Schema.org, robots.txt, landing pages, formulaires). Elles nécessitent un déploiement via le pipeline CI/CD après revue.
                </p>
              </div>
            </div>

            {/* All Tasks Quick View */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">Toutes les Tâches — {stats.totalTasks} identifiées</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {tasks.map((task) => {
                  const cfg = DOMAIN_CONFIG[task.domain];
                  const prio = PRIORITY_CONFIG[task.priority];
                  const isExpanded = expandedTasks.has(task.id);
                  return (
                    <div key={task.id} className={`rounded-xl border p-4 transition-all ${
                      task.status === 'completed' ? 'border-emerald-200 bg-emerald-50/20' :
                      task.status === 'in_progress' ? 'border-amber-300 bg-amber-50/20' :
                      task.status === 'failed' ? 'border-red-300 bg-red-50/20' :
                      'border-background-200/70 bg-white'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bgClass}`}>
                          <i className={`${cfg.icon} text-sm ${cfg.textClass}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold text-foreground-950">{task.title}</span>
                            {task.supabaseFunction && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 border border-cyan-200 text-cyan-700">
                                <i className="ri-cloud-line" />EDGE FN
                              </span>
                            )}
                            {task.mockOnly && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 border border-gray-200 text-gray-600">
                                <i className="ri-code-s-slash-line" />CODE
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${prio.bgClass} ${prio.borderClass}`} style={{ color: prio.hexColor }}>
                              {prio.label}
                            </span>
                            {task.autoFixable && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                                <i className="ri-cpu-line mr-0.5" />Auto
                              </span>
                            )}
                            {task.status === 'completed' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓ Complété</span>
                            )}
                            {task.status === 'in_progress' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold animate-pulse">⏳ En cours</span>
                            )}
                            {task.status === 'failed' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">✗ Échec</span>
                            )}
                          </div>
                          <p className="text-xs text-foreground-500 mb-1">{task.description}</p>
                          <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                            <span><i className="ri-timer-line mr-1" />{task.effort}</span>
                            <span className="text-emerald-600 font-medium">{task.impact}</span>
                            <span>{task.assignedAgent}</span>
                            <span className={`flex items-center gap-1 ${cfg.textClass}`}><i className={cfg.icon} />{cfg.label}</span>
                          </div>
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-background-200 grid grid-cols-2 gap-3 text-[10px]">
                              <div className="p-2 rounded bg-red-50">
                                <span className="font-bold text-red-600 block mb-0.5">Avant</span>
                                <span className="text-red-700">{task.kpiBefore}</span>
                              </div>
                              <div className="p-2 rounded bg-emerald-50">
                                <span className="font-bold text-emerald-600 block mb-0.5">Après</span>
                                <span className="text-emerald-700">{task.kpiAfter}</span>
                              </div>
                              {task.supabaseFunction && (
                                <div className="col-span-2 p-2 rounded bg-cyan-50 border border-cyan-100">
                                  <span className="font-bold text-cyan-600 block mb-0.5">
                                    <i className="ri-cloud-line mr-1" />Edge Function
                                  </span>
                                  <code className="text-cyan-700 font-mono">{task.supabaseFunction}</code>
                                  {task.functionPayload && (
                                    <span className="text-cyan-500 ml-2">
                                      payload: {JSON.stringify(task.functionPayload)}
                                    </span>
                                  )}
                                </div>
                              )}
                              {task.mockOnly && (
                                <div className="col-span-2 p-2 rounded bg-gray-50 border border-gray-100">
                                  <span className="font-bold text-gray-600 block mb-0.5">
                                    <i className="ri-code-s-slash-line mr-1" />Code-Level Change
                                  </span>
                                  <span className="text-gray-500">Modification directe du code source ou de la configuration</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button
                            onClick={() => toggleExpand(task.id)}
                            className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors"
                          >
                            <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500 text-sm`} />
                          </button>
                          {task.status === 'pending' && (
                            <button
                              onClick={() => executeTask(task)}
                              disabled={isExecuting}
                              className="px-3 py-1.5 rounded-lg bg-foreground-950 hover:bg-foreground-800 text-white text-xs font-bold cursor-pointer transition-all whitespace-nowrap disabled:opacity-50"
                            >
                              Exécuter
                            </button>
                          )}
                          {task.status === 'failed' && (
                            <button
                              onClick={() => executeTask(task)}
                              disabled={isExecuting}
                              className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer transition-all whitespace-nowrap disabled:opacity-50"
                            >
                              ↻ Réessayer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============ DOMAIN TABS ============ */}
        {activeTab !== 'overview' && activeTab !== 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${DOMAIN_CONFIG[activeTab]?.bgClass}`}>
                <i className={`${DOMAIN_CONFIG[activeTab]?.icon} text-lg ${DOMAIN_CONFIG[activeTab]?.textClass}`} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground-950">{DOMAIN_CONFIG[activeTab]?.label}</h2>
                <p className="text-xs text-foreground-500">{filteredTasks.length} tâches — {filteredTasks.filter(t => t.status === 'completed').length} complétées</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => executeDomain(activeTab)}
                  disabled={isExecuting || filteredTasks.filter(t => t.status === 'pending').length === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: DOMAIN_CONFIG[activeTab]?.hexColor }}
                >
                  <i className="ri-play-line" />
                  Tout exécuter
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const cfg = DOMAIN_CONFIG[task.domain];
                const prio = PRIORITY_CONFIG[task.priority];
                const isExpanded = expandedTasks.has(task.id);
                return (
                  <div key={task.id} className={`rounded-xl border p-4 transition-all ${
                    task.status === 'completed' ? 'border-emerald-200 bg-emerald-50/20' :
                    task.status === 'in_progress' ? 'border-amber-300 bg-amber-50/20 animate-pulse' :
                    task.status === 'failed' ? 'border-red-300 bg-red-50/20' :
                    'border-background-200/70 bg-white'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-bold text-foreground-950">{task.title}</span>
                          {task.supabaseFunction && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 border border-cyan-200 text-cyan-700">
                              <i className="ri-cloud-line" />EDGE FN
                            </span>
                          )}
                          {task.mockOnly && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 border border-gray-200 text-gray-600">
                              <i className="ri-code-s-slash-line" />CODE
                            </span>
                          )}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${prio.bgClass} ${prio.borderClass}`} style={{ color: prio.hexColor }}>
                            {prio.label}
                          </span>
                          {task.autoFixable && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                              <i className="ri-cpu-line mr-0.5" />Auto
                            </span>
                          )}
                          {task.status === 'completed' && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">✓ Complété</span>}
                          {task.status === 'in_progress' && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">⏳ En cours</span>}
                        </div>
                        <p className="text-xs text-foreground-500 mb-1">{task.description}</p>
                        <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                          <span><i className="ri-timer-line mr-1" />{task.effort}</span>
                          <span className="text-emerald-600 font-medium">{task.impact}</span>
                          <span>{task.assignedAgent}</span>
                        </div>
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-background-200 grid grid-cols-2 gap-3 text-[10px]">
                            <div className="p-2 rounded bg-red-50">
                              <span className="font-bold text-red-600 block mb-0.5">Avant</span>
                              <span className="text-red-700">{task.kpiBefore}</span>
                            </div>
                            <div className="p-2 rounded bg-emerald-50">
                              <span className="font-bold text-emerald-600 block mb-0.5">Après</span>
                              <span className="text-emerald-700">{task.kpiAfter}</span>
                            </div>
                            {task.supabaseFunction && (
                              <div className="col-span-2 p-2 rounded bg-cyan-50 border border-cyan-100">
                                <span className="font-bold text-cyan-600 block mb-0.5">
                                  <i className="ri-cloud-line mr-1" />Edge Function
                                </span>
                                <code className="text-cyan-700 font-mono">{task.supabaseFunction}</code>
                                {task.functionPayload && (
                                  <span className="text-cyan-500 ml-2">
                                    payload: {JSON.stringify(task.functionPayload)}
                                  </span>
                                )}
                              </div>
                            )}
                            {task.mockOnly && (
                              <div className="col-span-2 p-2 rounded bg-gray-50 border border-gray-100">
                                <span className="font-bold text-gray-600 block mb-0.5">
                                  <i className="ri-code-s-slash-line mr-1" />Code-Level Change
                                </span>
                                <span className="text-gray-500">Modification directe du code source ou de la configuration</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button onClick={() => toggleExpand(task.id)} className="w-8 h-8 rounded-lg bg-background-100 flex items-center justify-center cursor-pointer hover:bg-background-200 transition-colors">
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-500 text-sm`} />
                        </button>
                        {task.status === 'pending' && (
                          <button onClick={() => executeTask(task)} disabled={isExecuting} className="px-3 py-1.5 rounded-lg bg-foreground-950 hover:bg-foreground-800 text-white text-xs font-bold cursor-pointer transition-all whitespace-nowrap disabled:opacity-50">
                            Exécuter
                          </button>
                        )}
                        {task.status === 'failed' && (
                          <button onClick={() => executeTask(task)} disabled={isExecuting} className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer transition-all whitespace-nowrap disabled:opacity-50">
                            ↻ Réessayer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ LOGS TAB ============ */}
        {activeTab === 'logs' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground-950">
                  <i className="ri-terminal-box-line text-white text-lg" />
                </div>
                <h3 className="text-sm font-bold text-foreground-950">Logs d'Exécution — {executionLogs.length} entrées</h3>
              </div>
            </div>
            <div className="rounded-2xl bg-foreground-950 border border-gray-800 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-gray-400 font-mono">KOS Mass Upgrade — Execution Log</span>
                <span className="text-[10px] text-gray-500 ml-auto">{isExecuting ? 'LIVE' : `${executionLogs.length} entrées`}</span>
              </div>
              <div className="p-4 font-mono text-xs h-[500px] overflow-y-auto">
                {executionLogs.length === 0 && !isExecuting ? (
                  <div className="text-gray-500 text-center py-16">
                    <i className="ri-terminal-box-line text-3xl block mb-3" />
                    Aucun log — Lancez l'exécution pour voir les logs en direct
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logLines.map((log, i) => (
                      <div key={i} className={`${
                        log.status === 'completed'
                          ? log.executionType === 'edge_function' ? 'text-emerald-400' : 'text-emerald-300'
                          : log.status === 'failed'
                            ? 'text-red-400'
                            : 'text-amber-400'
                      }`}>
                        <span className="text-gray-600">[{log.timestamp.slice(11, 19)}]</span>{' '}
                        <span className="text-gray-500">[{DOMAIN_CONFIG[log.domain]?.label || log.domain}]</span>{' '}
                        <span className={
                          log.executionType === 'edge_function' ? 'text-cyan-500 font-bold' : 'text-gray-500'
                        }>
                          [{log.executionType === 'edge_function' ? 'EDGE' : 'CODE'}]
                        </span>{' '}
                        <span>{log.status === 'completed' ? '✓' : log.status === 'failed' ? '✗' : '⟳'}</span>{' '}
                        <span>{log.detail}</span>{' '}
                        <span className="text-gray-600">({log.duration})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS — Centres Interconnectés
            </h2>
            <p className="text-foreground-600">Accès direct aux 5 centres de commandement sources.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Global System Upgrade', path: '/kos-global-system-upgrade', icon: 'ri-rocket-2-line', color: '#DC2626' },
              { label: 'GEO Authority Engine', path: '/kos-geo-authority-engine', icon: 'ri-radar-line', color: '#0D7B5F' },
              { label: 'SEO Autopilot', path: '/kos-seo-autopilot', icon: 'ri-search-line', color: '#9B7B2C' },
              { label: 'AI Visibility Command', path: '/kos-ai-visibility-command', icon: 'ri-robot-2-line', color: '#0D9488' },
              { label: 'Ultra Lead Magnets', path: '/kos-ultra-lead-magnets', icon: 'ri-user-star-line', color: '#7C3AED' },
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
    </hubLayout>
  );
}



