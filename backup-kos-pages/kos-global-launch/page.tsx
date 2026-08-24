import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSGlobalLaunch } from '@/hooks/useKOSGlobalLaunch';
import type { globalBlock, globalTask, globalLaunchLog } from '@/hooks/useKOSGlobalLaunch';

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  critical: { label: 'CRITIQUE', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', icon: 'ri-alert-fill' },
  urgent: { label: 'URGENT', color: '#EA580C', bg: '#FFF7ED', border: '#FED7AA', icon: 'ri-error-warning-fill' },
  planned: { label: 'PLANIFIÉ', color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE', icon: 'ri-time-fill' },
};

const DOMAIN_COLORS: Record<string, string> = {
  execution: '#BE123C',
  correction: '#EA580C',
  seo: '#0D7B5F',
  content: '#4A7A1E',
  quality: '#6366F1',
  security: '#DC2626',
  ops: '#14B8A6',
};

const DOMAIN_NAMES: Record<string, string> = {
  execution: 'Exécution',
  correction: 'Correction',
  seo: 'SEO/AEO',
  content: 'Content AI',
  quality: 'Qualité',
  security: 'Sécurité',
  ops: 'Web Ops',
};

export default function globalLaunchPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    blocks, globalStats, logs, isLive,
    loading, error, refetch,
    executionState, currentBlock, progress,
    launchBlock, launchAllBlocks, launchByPriority,
  } = useKOSGlobalLaunch();

  const [activeTab, setActiveTab] = useState<'blocks' | 'logs'>('blocks');
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    if (executionState === 'running' && activeTab !== 'logs') {
      setActiveTab('logs');
    }
  }, [executionState, activeTab]);

  useEffect(() => {
    if (executionState === 'completed') {
      setCelebration(true);
      const t = setTimeout(() => setCelebration(false), 8000);
      return () => clearTimeout(t);
    }
  }, [executionState]);

  useEffect(() => {
    if (logsContainerRef.current && activeTab === 'logs') {
      logsContainerRef.current.scrollTop = 0;
    }
  }, [logs.length, activeTab]);

  const estimatedHours = Math.round(globalStats.total_estimated_minutes / 60);
  const estimatedRemainingMinutes = globalStats.total_estimated_minutes % 60;

  return (
    <hubLayout hubId={200}>
      <SeoHead
        title="KOS Global Launch System™ — Lancement Global Tous Blocs | KHEPRA EXPERTS"
        description="Centre de lancement global KOS : 7 blocs, 253+ tâches, 432 agents. Lancement par bloc, par priorité ou global. Critique, urgent, planifié — tout en un clic."
        keywords="KOS Global Launch, lancement global KOS, exécution blocs KOS, KHEPRA EXPERTS, KOS task launch"
        canonicalPath="/kos-global-launch"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* ============ CELEBRATION OVERLAY ============ */}
      {celebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground-950/85 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-7xl mb-4">🚀</div>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-emerald-400 mb-2">LANCEMENT GLOBAL TERMINÉ !</h2>
            <p className="text-xl text-white/80 mb-4">Tous les blocs KOS sont opérationnels</p>
            <div className="flex items-center justify-center gap-2 text-emerald-300">
              <i className="ri-check-double-line text-2xl" />
              <span className="text-lg font-bold">{globalStats.total_tasks} tâches exécutées</span>
              <i className="ri-check-double-line text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Epic%20cinematic%20sci-fi%20command%20bridge%20interior%20with%20seven%20concentric%20holographic%20rings%20each%20glowing%20with%20distinct%20colors%20red%20orange%20emerald%20green%20violet%20crimson%20teal%20representing%20autonomous%20system%20blocks%2C%20massive%20central%20countdown%20timer%2C%20dramatic%20volumetric%20lighting%20with%20god%20rays%20piercing%20through%20dark%20atmosphere%2C%20ultra%20detailed%20futuristic%20military%20command%20center%20aesthetic%20with%20complex%20geometric%20wireframe%20overlays%20and%20data%20streams%20cascading%20between%20rings%2C%20abstract%20high%20tech%20control%20room%20with%20pulsating%20energy%20nodes%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows%20and%20intense%20contrast&width=1920&height=700&seq=kos-global-launch-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
            width="1920"
            height="700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/30 via-foreground-950/60 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/30 border border-red-500/40 backdrop-blur-sm">
                  <i className="ri-rocket-2-line text-red-400 text-sm" />
                  <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                    KOS Global Launch System™
                  </span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                  isLive ? 'bg-emerald-500/20 border border-emerald-400/30' : 'bg-amber-500/20 border border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${isLive ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {isLive ? 'LIVE — SUPABASE' : 'MOCK — DÉMO'}
                  </span>
                </div>
                {executionState === 'running' && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider animate-pulse">
                      EXECUTING...
                    </span>
                  </div>
                )}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Lancement Global.
                <span className="block text-red-400 mt-2">{globalStats.total_tasks} tâches. 7 blocs. Un clic.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Le <strong className="text-white">KOS Global Launch System</strong> exécute toutes les tâches critiques, urgentes et planifiées sur les{' '}
                <strong className="text-white">{globalStats.total_blocks} blocs KOS</strong>.{' '}
                <strong className="text-red-400">{globalStats.total_critical} critiques</strong>,{' '}
                <strong className="text-amber-400">{globalStats.total_urgent} urgentes</strong>,{' '}
                <strong className="text-violet-400">{globalStats.total_planned} planifiées</strong>.{' '}
                {globalStats.total_agents} agents mobilisés.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={launchAllBlocks}
                  disabled={executionState === 'running'}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all cursor-pointer whitespace-nowrap ${
                    executionState === 'running'
                      ? 'bg-amber-600 text-white cursor-wait'
                      : 'bg-red-600 text-white hover:bg-red-500 hover:scale-105 shadow-lg shadow-red-600/30'
                  } disabled:opacity-80`}
                >
                  {executionState === 'running' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-lg" />
                      LANCEMENT EN COURS — {progress}%
                    </>
                  ) : (
                    <>
                      <i className="ri-rocket-2-line text-lg" />
                      LANCER TOUT — {globalStats.total_tasks} TÂCHES
                    </>
                  )}
                </button>
                <button
                  onClick={() => launchByPriority('critical')}
                  disabled={executionState === 'running' || globalStats.total_critical === 0}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 font-bold text-sm hover:bg-red-600/30 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm disabled:opacity-40"
                >
                  <i className="ri-alert-fill" />
                  Critiques ({globalStats.total_critical})
                </button>
                <button
                  onClick={() => launchByPriority('urgent')}
                  disabled={executionState === 'running' || globalStats.total_urgent === 0}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-300 font-bold text-sm hover:bg-amber-600/30 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm disabled:opacity-40"
                >
                  <i className="ri-error-warning-fill" />
                  Urgentes ({globalStats.total_urgent})
                </button>
                <button
                  onClick={() => launchByPriority('planned')}
                  disabled={executionState === 'running' || globalStats.total_planned === 0}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 font-bold text-sm hover:bg-violet-600/30 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm disabled:opacity-40"
                >
                  <i className="ri-time-fill" />
                  Planifiées ({globalStats.total_planned})
                </button>
                <button
                  onClick={refetch}
                  disabled={executionState === 'running'}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm disabled:opacity-50"
                >
                  <i className="ri-refresh-line" />
                  Rafraîchir
                </button>
              </div>
            </div>

            {/* Global Stats Card */}
            <div className="flex-shrink-0 w-full lg:w-72 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="text-center mb-4">
                <div className="relative inline-flex">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#DC2626" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white font-heading">{globalStats.total_tasks}</span>
                    <span className="text-[10px] text-gray-400">Tâches</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Critiques', value: globalStats.total_critical, color: '#DC2626' },
                  { label: 'Urgentes', value: globalStats.total_urgent, color: '#EA580C' },
                  { label: 'Planifiées', value: globalStats.total_planned, color: '#6366F1' },
                  { label: 'Blocs', value: globalStats.total_blocks, color: '#86BC25' },
                  { label: 'Agents', value: globalStats.total_agents, color: '#F59E0B' },
                  { label: 'Durée est.', value: `${estimatedHours}h${estimatedRemainingMinutes}`, color: '#14B8A6' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRESS BAR (during execution) ============ */}
      {executionState === 'running' && (
        <section className="py-2 bg-foreground-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {currentBlock === 'all' ? 'TOUS LES BLOCS' : currentBlock === 'priority' ? 'PAR PRIORITÉ' : blocks.find(b => b.id === currentBlock)?.name || ''}
              </span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-400 whitespace-nowrap">{progress}%</span>
            </div>
          </div>
        </section>
      )}

      {/* ============ TAB NAVIGATION ============ */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {[
              { id: 'blocks', label: 'Blocs', icon: 'ri-stack-line', count: String(globalStats.total_blocks) },
              { id: 'logs', label: 'Logs Live', icon: 'ri-terminal-box-line', count: logs.length > 0 ? String(logs.length) : '0' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-foreground-950 text-white'
                    : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
                }`}
              >
                <i className={`${tab.icon} text-xs`} />
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOADING / ERROR ============ */}
      {loading && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-background-200 border-t-red-500 rounded-full animate-spin" />
            <p className="text-sm text-foreground-500">Chargement des 7 blocs KOS...</p>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <i className="ri-error-warning-line text-red-600 text-2xl" />
            </div>
            <p className="text-sm text-foreground-700 font-medium">Erreur de chargement</p>
            <p className="text-xs text-foreground-500 max-w-md text-center">{error}</p>
            <button onClick={refetch} className="px-5 py-2.5 rounded-full bg-foreground-950 text-background-50 text-sm font-medium hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-refresh-line mr-2" />Réessayer
            </button>
          </div>
        </section>
      )}

      {/* ============ BLOCKS TAB ============ */}
      {!loading && !error && activeTab === 'blocks' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Domain Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
              {blocks.map(block => {
                const isActive = executionState === 'running' && currentBlock === block.id;
                const isDone = block.stats.completed === block.stats.total_tasks && block.stats.total_tasks > 0;
                const pendingTotal = block.stats.critical + block.stats.urgent + block.stats.planned;

                return (
                  <div key={block.id} className={`rounded-xl border p-3 text-center transition-all ${
                    isActive ? 'border-amber-300 bg-amber-50 ring-2 ring-amber-200' :
                    isDone ? 'border-emerald-200 bg-white' :
                    'border-background-200 bg-white'
                  }`}>
                    <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${block.color}15` }}>
                      <i className={`${block.icon} text-sm`} style={{ color: block.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-foreground-700 block leading-tight">{block.name}</span>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      {block.stats.critical > 0 && (
                        <span className="text-[9px] font-bold text-red-600">{block.stats.critical}C</span>
                      )}
                      {block.stats.urgent > 0 && (
                        <span className="text-[9px] font-bold text-amber-600">{block.stats.urgent}U</span>
                      )}
                      {block.stats.planned > 0 && (
                        <span className="text-[9px] font-bold text-violet-600">{block.stats.planned}P</span>
                      )}
                      {pendingTotal === 0 && (
                        <span className="text-[9px] font-bold text-emerald-600">
                          <i className="ri-check-double-line" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Blocks Detail */}
            <div className="space-y-4">
              {blocks.map(block => {
                const isExpanded = expandedBlock === block.id;
                const isActive = executionState === 'running' && currentBlock === block.id;
                const isAllActive = executionState === 'running' && currentBlock === 'all';
                const isBlockRunning = isActive || (isAllActive && block.tasks.some(t => t.status === 'in_progress'));
                const pendingTotal = block.stats.critical + block.stats.urgent + block.stats.planned;
                const allDone = pendingTotal === 0;

                return (
                  <div key={block.id} className={`rounded-2xl border transition-all ${
                    isBlockRunning ? 'border-amber-300 bg-amber-50/30 ring-2 ring-amber-200/50' :
                    allDone ? 'border-emerald-200 bg-white' :
                    'border-background-200 bg-white'
                  }`}>
                    {/* Block Header */}
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${block.color}15` }}>
                        <i className={`${block.icon} text-xl`} style={{ color: block.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base font-bold text-foreground-950">{block.name}</h3>
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold border" style={{ color: DOMAIN_COLORS[block.domain], backgroundColor: `${DOMAIN_COLORS[block.domain]}10`, borderColor: `${DOMAIN_COLORS[block.domain]}30` }}>
                            {DOMAIN_NAMES[block.domain]}
                          </span>
                          {isBlockRunning && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold animate-pulse">
                              EXECUTING...
                            </span>
                          )}
                          {allDone && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                              <i className="ri-check-double-line mr-0.5" />COMPLET
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-foreground-500 line-clamp-2">{block.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px]">
                          <span className="text-foreground-400">{block.stats.agents_count} agents</span>
                          <span className="text-foreground-400">{block.stats.estimated_minutes} min estimées</span>
                          <span className="text-foreground-400">{block.stats.success_rate}% succès</span>
                          <span className={block.stats.critical > 0 ? 'text-red-600 font-bold' : 'text-foreground-400'}>
                            {block.stats.critical} critiques
                          </span>
                          <span className={block.stats.urgent > 0 ? 'text-amber-600 font-bold' : 'text-foreground-400'}>
                            {block.stats.urgent} urgentes
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                          className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line`} />
                          {isExpanded ? 'Réduire' : 'Détail'}
                        </button>
                        <button
                          onClick={() => launchBlock(block.id)}
                          disabled={executionState === 'running' || pendingTotal === 0}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white transition-all cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                          style={{ backgroundColor: block.color }}
                        >
                          {allDone ? (
                            <><i className="ri-check-double-line" />OK</>
                          ) : (
                            <><i className="ri-play-fill" />Lancer ({pendingTotal})</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Tasks detail */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-100 pt-4">
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          {block.tasks.map(task => {
                            const prio = PRIORITY_CONFIG[task.priority];
                            const statusIcon = task.status === 'completed' ? 'ri-checkbox-circle-fill text-emerald-500' :
                              task.status === 'in_progress' ? 'ri-loader-4-line text-amber-500 animate-spin' :
                              'ri-time-line text-slate-300';

                            return (
                              <div key={task.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                                task.status === 'completed' ? 'bg-emerald-50/50 border-emerald-100' :
                                task.status === 'in_progress' ? 'bg-amber-50/50 border-amber-200' :
                                'bg-background-50 border-background-100'
                              }`}>
                                <i className={`${statusIcon} text-sm flex-shrink-0 mt-0.5`} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                    <span className="text-xs font-bold text-foreground-800">{task.title}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${prio.bg} ${prio.border}`} style={{ color: prio.color }}>
                                      {prio.label}
                                    </span>
                                    {task.auto_fix && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                                        <i className="ri-robot-line text-[7px] mr-0.5" />AUTO
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-[10px] text-foreground-400">
                                    <span><i className="ri-user-line mr-0.5" />{task.agent_name}</span>
                                    <span><i className="ri-timer-line mr-0.5" />{task.estimated_minutes} min</span>
                                    <span className="text-emerald-600"><i className="ri-arrow-up-line mr-0.5" />{task.impact}</span>
                                  </div>
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

            {/* Cross-links */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
              {blocks.map(block => (
                <a
                  key={block.id}
                  href={block.route}
                  className="rounded-xl border border-background-200 bg-white p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block"
                >
                  <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${block.color}15` }}>
                    <i className={`${block.icon} text-sm`} style={{ color: block.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-foreground-700 leading-tight">{block.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ LOGS TAB ============ */}
      {!loading && !error && activeTab === 'logs' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 mb-3">
                  {executionState === 'running' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Live Execution Log</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-terminal-box-line text-red-600 text-sm" />
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Logs d'Exécution</span>
                    </>
                  )}
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground-950">
                  {logs.length > 0 ? `${logs.length} entrées` : 'Aucune exécution récente'}
                </h2>
              </div>
            </div>

            {logs.length === 0 ? (
              <div className="rounded-2xl border border-background-200 bg-white p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-50 flex items-center justify-center">
                  <i className="ri-terminal-box-line text-3xl text-foreground-300" />
                </div>
                <p className="text-sm text-foreground-500">Lancez un bloc ou le lancement global pour voir les logs en direct.</p>
              </div>
            ) : (
              <div ref={logsContainerRef} className="rounded-2xl border border-background-200 bg-white overflow-hidden max-h-[600px] overflow-y-auto">
                <div className="divide-y divide-background-100">
                  {logs.map(log => {
                    const block = blocks.find(b => b.name === log.block_name);
                    const statusConfig: Record<string, { icon: string; color: string; bg: string }> = {
                      completed: { icon: 'ri-checkbox-circle-line', color: '#86BC25', bg: '#86BC2515' },
                      in_progress: { icon: 'ri-loader-4-line', color: '#F59E0B', bg: '#F59E0B15' },
                      failed: { icon: 'ri-close-circle-line', color: '#DC2626', bg: '#DC262615' },
                      queued: { icon: 'ri-time-line', color: '#9CA3AF', bg: '#9CA3AF15' },
                    };
                    const sc = statusConfig[log.status] || statusConfig.queued;

                    return (
                      <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-background-50 transition-colors">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: sc.bg }}>
                          <i className={`${sc.icon} text-xs ${log.status === 'in_progress' ? 'animate-spin' : ''}`} style={{ color: sc.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <span className="text-[11px] font-bold text-foreground-800">{log.task_title}</span>
                            {block && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ color: block.color, backgroundColor: `${block.color}10` }}>
                                {log.block_name}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-foreground-500">{log.detail}</p>
                        </div>
                        <span className="text-[9px] text-foreground-400 whitespace-nowrap flex-shrink-0">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ CROSS-LINKS ECOSYSTEM ============ */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS Complet
            </h2>
            <p className="text-foreground-600">Accès direct à tous les centres de commandement.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Block Execution', path: '/kos-block-execution', icon: 'ri-flashlight-line', color: '#BE123C' },
              { label: 'Synchroniseur Maître', path: '/kos-synchroniseur-maitre', icon: 'ri-refresh-line', color: '#F59E0B' },
              { label: 'Commandement Unifié', path: '/kos-commandement-operationnel-unifie', icon: 'ri-government-line', color: '#EA580C' },
              { label: 'Performance 100%', path: '/kos-performance-100-challenge', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-radar-line', color: '#BE123C' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-background-50 p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





