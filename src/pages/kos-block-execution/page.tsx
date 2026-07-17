import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useKOSBlockExecution } from '@/hooks/useKOSBlockExecution';
import type { KOSBlockFamily, KOSBlockExecutionPhase, KOSBlockExecutionLog } from '@/hooks/useKOSBlockExecution';

function formatCurrency(value: number) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + ' M€';
  if (value >= 1000) return (value / 1000).toFixed(1) + ' K€';
  return value + ' €';
}

function formatNumber(value: number) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
  return String(value);
}

const DOMAIN_INFO: Record<string, { label: string; color: string; bg: string }> = {
  'front-office': { label: 'Front Office', color: '#5B8C2A', bg: '#5B8C2A15' },
  'croissance': { label: 'Croissance', color: '#EA580C', bg: '#EA580C15' },
  'production': { label: 'Production', color: '#BE123C', bg: '#BE123C15' },
  'qualite': { label: 'Qualité', color: '#6366F1', bg: '#6366F115' },
  'technique': { label: 'Technique', color: '#14B8A6', bg: '#14B8A615' },
  'intelligence': { label: 'Intelligence', color: '#F59E0B', bg: '#F59E0B15' },
  'creation': { label: 'Création', color: '#0EA5E9', bg: '#0EA5E915' },
};

export default function KOSBlockExecutionPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const {
    families, global, phases, logs, isLive,
    loading, error, refetch,
    executionState, currentPhase, progress,
    startBlockExecution,
    startFullSpectrumExecution,
    fullSpectrum,
    allCorrectionTasks,
  } = useKOSBlockExecution();

  const correctionDomainCounts = {
    performance: allCorrectionTasks.filter(t => t.domain === 'performance').length,
    seo: allCorrectionTasks.filter(t => t.domain === 'seo').length,
    assets: allCorrectionTasks.filter(t => t.domain === 'assets').length,
    security: allCorrectionTasks.filter(t => t.domain === 'security').length,
    accessibility: allCorrectionTasks.filter(t => t.domain === 'accessibility').length,
  };

  const CORRECTION_DOMAIN_INFO: Record<string, { label: string; icon: string; color: string }> = {
    performance: { label: 'Performance', icon: 'ri-speed-up-line', color: '#DC2626' },
    seo: { label: 'SEO', icon: 'ri-search-eye-line', color: '#F59E0B' },
    assets: { label: 'Assets', icon: 'ri-stack-line', color: '#0EA5E9' },
    security: { label: 'Sécurité', icon: 'ri-shield-check-line', color: '#059669' },
    accessibility: { label: 'Accessibilité', icon: 'ri-wheelchair-line', color: '#8B5CF6' },
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'families' | 'logs'>('overview');
  const [celebration, setCelebration] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-switch to logs tab when execution starts
  useEffect(() => {
    if (executionState === 'running') {
      setActiveTab('logs');
    }
  }, [executionState]);

  useEffect(() => {
    if (executionState === 'completed') {
      setCelebration(true);
      const timer = setTimeout(() => setCelebration(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [executionState]);

  useEffect(() => {
    if (logsContainerRef.current && activeTab === 'logs' && executionState === 'running') {
      logsContainerRef.current.scrollTop = 0;
    }
  }, [logs.length, activeTab, executionState]);

  const sortedFamilies = useMemo(() =>
    [...families].sort((a, b) => a.priority_order - b.priority_order),
    [families],
  );

  const familyProgress = useMemo(() => {
    return families.map(f => {
      const deployedPct = f.agents_total > 0 ? Math.round((f.deployed / f.agents_total) * 100) : 0;
      const remaining = f.tasks_pending;
      const inProgress = executionState === 'running' && currentPhase > 0;
      return { ...f, deployedPct, remaining, inProgress };
    });
  }, [families, executionState, currentPhase]);

  const currentKpo = useMemo(() => {
    if (executionState === 'completed') return 100;
    if (executionState === 'running') {
      const phaseKpo = phases.find(p => p.phase_number === currentPhase)?.kpo_after_phase || global.kpo_before;
      return Math.min(phaseKpo, 100);
    }
    return global.kpo_before;
  }, [executionState, currentPhase, phases, global.kpo_before]);

  const activePhaseObj = phases.find(p => p.phase_number === currentPhase);

  return (
    <KOSHubLayout hubId={101}>
      <SeoHead
        title="KOS Bloc Execution System™ — Déploiement 100% KPO | KHEPRA EXPERTS"
        description="KOS Bloc Execution System : exécution en bloc de toutes les tâches KOS. 13 familles, 333 agents, 99 gaps. Passez de 69.7% à 100% KPO Big Four en un clic."
        keywords="KOS Bloc Execution, déploiement 100% KPO, exécution en bloc KOS, Big Four, KHEPRA EXPERTS, KOS block execution"
        canonicalPath="/kos-block-execution"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* ============ CELEBRATION OVERLAY ============ */}
      {celebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground-950/80 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-8xl mb-4">🎯</div>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-emerald-400 mb-2">
              {fullSpectrum.phase === 'completed' ? 'FULL SPECTRUM COMPLET !' : '100% KPO ATTEINT !'}
            </h2>
            <p className="text-xl text-white/80 mb-4">
              {fullSpectrum.phase === 'completed'
                ? `${fullSpectrum.agentTotal} agents + ${fullSpectrum.correctionTotal} corrections — EXÉCUTION TOTALE`
                : '333 agents déployés — Standard Big Four validé'}
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-300">
              <i className="ri-check-double-line text-2xl" />
              <span className="text-lg font-bold">BLOC EXECUTION COMPLET</span>
              <i className="ri-check-double-line text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Epic%20sci-fi%20command%20bridge%20interior%20with%20massive%20central%20holographic%20countdown%20timer%20displaying%20100%20percent%2C%20surrounded%20by%20concentric%20rings%20of%20glowing%20emerald%20and%20crimson%20data%20streams%2C%20towering%20server%20racks%20with%20pulsing%20amber%20lights%2C%20dramatic%20cinematic%20lighting%20with%20volumetric%20rays%20piercing%20through%20dark%20atmosphere%2C%20ultra%20detailed%20futuristic%20military%20operations%20center%20aesthetic%2C%20abstract%20geometric%20wireframe%20overlays%20suggesting%20automated%20deployment%20sequences%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows&width=1920&height=700&seq=kos-block-exec-hero&orientation=landscape"
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
                  <i className="ri-flashlight-line text-red-400 text-sm" />
                  <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">
                    KOS Bloc Execution System™
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
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                    fullSpectrum.phase === 'both'
                      ? 'bg-rose-500/20 border border-rose-400/30'
                      : 'bg-amber-500/20 border border-amber-400/30'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${fullSpectrum.phase === 'both' ? 'bg-rose-400' : 'bg-amber-400'} animate-ping`} />
                    <span className={`text-sm font-semibold uppercase tracking-wider animate-pulse ${
                      fullSpectrum.phase === 'both' ? 'text-rose-300' : 'text-amber-300'
                    }`}>
                      {fullSpectrum.phase === 'both' ? 'FULL SPECTRUM...' : 'EXECUTING...'}
                    </span>
                  </div>
                )}
                {executionState === 'completed' && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                    <i className="ri-check-double-line text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                      COMPLETED
                    </span>
                  </div>
                )}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Exécution en Bloc.
                <span className="block text-red-400 mt-2">{global.gaps_total} agents à déployer. Un seul bouton.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Le <strong className="text-white">Bloc Execution System™</strong> déploie tous les agents KOS simultanément.{' '}
                <strong className="text-red-400">{global.gaps_total} gaps</strong> identifiés sur{' '}
                <strong className="text-white">{global.total_agents} agents</strong>. Passez de{' '}
                <strong className="text-red-400">{global.kpo_before}%</strong> à{' '}
                <strong className="text-emerald-400">100% KPO</strong> en {Math.round(global.total_estimated_minutes / 60)}h{global.total_estimated_minutes % 60}min.
              </p>

              {/* ===== FULL SPECTRUM STATUS BADGES (during execution) ===== */}
              {executionState === 'running' && fullSpectrum.phase === 'both' && (
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-6">
                    {/* Agent Track */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-gray-400 flex items-center gap-1">
                          <i className="ri-robot-line text-amber-400" /> Agents
                        </span>
                        <span className="text-amber-400 font-bold">{fullSpectrum.agentCompleted}/{fullSpectrum.agentTotal}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300" style={{ width: `${fullSpectrum.agentProgress}%` }} />
                      </div>
                    </div>
                    {/* Divider */}
                    <div className="w-px h-8 bg-white/10" />
                    {/* Correction Track */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-gray-400 flex items-center gap-1">
                          <i className="ri-tools-line text-emerald-400" /> Corrections
                        </span>
                        <span className="text-emerald-400 font-bold">{fullSpectrum.correctionCompleted}/{fullSpectrum.correctionTotal}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-300" style={{ width: `${fullSpectrum.correctionProgress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[9px]">
                    <span className="text-gray-500">{fullSpectrum.agentPhaseLabel}</span>
                    <span className="text-gray-500">{fullSpectrum.correctionLabel}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                {/* ===== FULL SPECTRUM BUTTON (PRIMARY) ===== */}
                <button
                  onClick={startFullSpectrumExecution}
                  disabled={executionState === 'running'}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all cursor-pointer whitespace-nowrap ${
                    executionState === 'completed'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : executionState === 'running'
                        ? 'bg-amber-600 text-white cursor-wait'
                        : 'bg-gradient-to-r from-red-600 to-rose-500 text-white hover:from-red-500 hover:to-rose-400 hover:scale-105 shadow-lg shadow-red-600/30'
                  } disabled:opacity-80`}
                >
                  {executionState === 'running' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-lg" />
                      FULL SPECTRUM — {fullSpectrum.combinedProgress}%
                    </>
                  ) : executionState === 'completed' ? (
                    <>
                      <i className="ri-check-double-line text-lg" />
                      FULL SPECTRUM TERMINÉ — RELANCER
                    </>
                  ) : (
                    <>
                      <i className="ri-flashlight-line text-lg" />
                      FULL SPECTRUM — AGENTS + CORRECTIONS
                    </>
                  )}
                </button>

                {/* ===== AGENTS ONLY BUTTON (SECONDARY) ===== */}
                <button
                  onClick={startBlockExecution}
                  disabled={executionState === 'running'}
                  className={`inline-flex items-center gap-2 px-5 py-4 rounded-full font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
                    executionState === 'running'
                      ? 'bg-white/5 text-white/40 cursor-wait'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  } disabled:opacity-50 backdrop-blur-sm`}
                >
                  <i className="ri-robot-line text-sm" />
                  Agents uniquement ({global.gaps_total} gaps)
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

            {/* ===== DUAL KPO + CORRECTIONS COUNTER ===== */}
            <div className="flex-shrink-0 w-full lg:w-80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="text-center mb-4">
                <div className="relative inline-flex">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={currentKpo >= 100 ? '#86BC25' : currentKpo >= 80 ? '#F59E0B' : '#DC2626'}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - currentKpo / 100)}`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold font-heading transition-colors duration-700 ${
                      currentKpo >= 100 ? 'text-emerald-400' : currentKpo >= 80 ? 'text-amber-400' : 'text-red-400'
                    }`}>{currentKpo}%</span>
                    <span className="text-[10px] text-gray-400">KPO Target</span>
                  </div>
                </div>
              </div>

              {/* Combined progress bar during Full Spectrum */}
              {executionState === 'running' && fullSpectrum.phase === 'both' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-gray-400">Progression Globale</span>
                    <span className="text-rose-400 font-bold">{fullSpectrum.combinedProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${fullSpectrum.combinedProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Agents déployés</span>
                  <span className="text-emerald-400 font-bold">{global.deployed_before}/{global.total_agents}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Gaps agents</span>
                  <span className="text-red-400 font-bold">{global.gaps_total}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Tâches agents</span>
                  <span className="text-amber-400 font-bold">{global.tasks_total}</span>
                </div>
                {/* ===== CORRECTIONS STATS ===== */}
                <div className="pt-2 mt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-400">Corrections en attente</span>
                    <span className="text-rose-400 font-bold">{allCorrectionTasks.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(correctionDomainCounts).filter(([_, count]) => count > 0).map(([domain, count]) => (
                      <span key={domain} className="text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white/80" style={{ backgroundColor: `${CORRECTION_DOMAIN_INFO[domain]?.color || '#666'}40` }}>
                        {CORRECTION_DOMAIN_INFO[domain]?.label} {count}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 mt-2 border-t border-white/10">
                  <span className="text-gray-400">Durée estimée</span>
                  <span className="text-white font-bold">{Math.round((global.total_estimated_minutes + 12) / 60)}h{((global.total_estimated_minutes + 12) % 60)}min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PHASE PROGRESS BAR (during execution) ============ */}
      {executionState === 'running' && (
        <section className="py-2 bg-foreground-950 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {fullSpectrum.phase === 'both' && (
              <div className="text-center mb-1.5">
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">
                  FULL SPECTRUM — {fullSpectrum.agentTotal} agents + {fullSpectrum.correctionTotal} corrections
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              {phases.map((phase) => {
                const isCompleted = phase.phase_number < currentPhase;
                const isActive = phase.phase_number === currentPhase;
                const isPending = phase.phase_number > currentPhase;

                return (
                  <div key={phase.phase_number} className="flex-1 flex items-center">
                    <div className={`flex-1 h-2 rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-500' :
                      isActive ? 'bg-amber-500 animate-pulse' :
                      'bg-white/10'
                    }`} />
                    {phase.phase_number < phases.length && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mx-1 transition-all ${
                        isCompleted ? 'bg-emerald-500' :
                        isActive ? 'bg-amber-500 ring-2 ring-amber-400/50' :
                        'bg-white/10'
                      }`}>
                        {isCompleted ? (
                          <i className="ri-check-line text-white text-[8px]" />
                        ) : isActive ? (
                          <span className="text-[8px] font-bold text-white">{phase.phase_number}</span>
                        ) : (
                          <span className="text-[8px] text-gray-500">{phase.phase_number}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-1">
              {phases.map(phase => (
                <span key={phase.phase_number} className={`text-[8px] ${
                  phase.phase_number < currentPhase ? 'text-emerald-400' :
                  phase.phase_number === currentPhase ? 'text-amber-400 font-bold' :
                  'text-gray-500'
                }`}>
                  {phase.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ GLOBAL KPI BAR ============ */}
      <section className="py-2.5 bg-foreground-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {[
              { label: 'Familles', value: String(global.total_families), icon: 'ri-stack-line' },
              { label: 'Agents', value: String(global.total_agents), icon: 'ri-robot-line' },
              { label: 'Déployés', value: `${global.deployed_before}/${global.total_agents}`, icon: 'ri-checkbox-circle-line' },
              { label: 'Gaps', value: String(global.gaps_total), icon: 'ri-error-warning-line' },
              { label: 'Tâches', value: String(global.tasks_total), icon: 'ri-task-line' },
              { label: 'Corrections', value: String(allCorrectionTasks.length), icon: 'ri-tools-line' },
              { label: 'Durée FS', value: `${Math.round((global.total_estimated_minutes + 12) / 60)}h${((global.total_estimated_minutes + 12) % 60)}`, icon: 'ri-timer-line' },
              { label: 'KPO Actuel', value: `${global.kpo_before}%`, icon: 'ri-line-chart-line' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <i className={`${stat.icon} text-[10px] mb-0.5 block text-gray-400`} />
                <span className="block text-sm font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[8px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TAB NAVIGATION ============ */}
      <section className="sticky top-20 z-30 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {[
              { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
              { id: 'phases', label: 'Phases d\'Exécution', icon: 'ri-stack-line' },
              { id: 'families', label: 'Familles', icon: 'ri-grid-line' },
              { id: 'logs', label: 'Logs Live', icon: 'ri-terminal-box-line' },
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
                {tab.id === 'logs' && logs.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[8px] font-bold">{logs.length}</span>
                )}
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
            <p className="text-sm text-foreground-500">Chargement du Bloc Execution System...</p>
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

      {/* ============ OVERVIEW TAB ============ */}
      {!loading && !error && activeTab === 'overview' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Execution Status */}
            {executionState !== 'idle' && (
              <div className={`rounded-2xl border p-6 mb-8 ${
                executionState === 'completed'
                  ? 'border-emerald-200 bg-white'
                  : 'border-amber-200 bg-white'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    executionState === 'completed' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    {executionState === 'running' ? (
                      <i className="ri-loader-4-line animate-spin text-amber-600 text-2xl" />
                    ) : executionState === 'completed' ? (
                      <i className="ri-check-double-line text-emerald-600 text-2xl" />
                    ) : (
                      <i className="ri-pause-line text-amber-600 text-2xl" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground-950">
                      {executionState === 'running' && fullSpectrum.phase === 'both' && 'FULL SPECTRUM — Agents Phase ' + currentPhase + '/' + phases.length + ' + Corrections en parallèle'}
                      {executionState === 'running' && fullSpectrum.phase !== 'both' && `Phase ${currentPhase}/${phases.length} — ${activePhaseObj?.label || ''}`}
                      {executionState === 'completed' && fullSpectrum.phase === 'completed' && `Full Spectrum Terminé — ${fullSpectrum.agentTotal} agents + ${fullSpectrum.correctionTotal} corrections déployés !`}
                      {executionState === 'completed' && fullSpectrum.phase !== 'completed' && 'Bloc Execution Terminé — 100% KPO Atteint !'}
                      {executionState === 'paused' && 'Exécution en pause'}
                    </h3>
                    <p className="text-sm text-foreground-500">
                      {executionState === 'running' && fullSpectrum.phase === 'both' && (
                        <>{fullSpectrum.agentPhaseLabel} · {fullSpectrum.correctionLabel}</>
                      )}
                      {executionState === 'running' && fullSpectrum.phase !== 'both' && activePhaseObj && (
                        <>{activePhaseObj.description}</>
                      )}
                      {executionState === 'completed' && fullSpectrum.phase === 'completed' && (
                        <>Tous les agents KPO et toutes les actions correctives (SEO, Performance, Assets, Sécurité, Accessibilité) ont été exécutés avec succès.</>
                      )}
                      {executionState === 'completed' && fullSpectrum.phase !== 'completed' && (
                        <>Les {global.total_agents} agents sont déployés. Standard Big Four validé sur les 6 dimensions KPO.</>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold font-heading ${
                      executionState === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {fullSpectrum.phase === 'both' ? `${fullSpectrum.combinedProgress}%` : `${progress}%`}
                    </span>
                    <span className="block text-[10px] text-foreground-400">
                      {fullSpectrum.phase === 'both' ? 'Global' : 'Complété'}
                    </span>
                  </div>
                </div>
                {executionState === 'running' && fullSpectrum.phase === 'both' && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-foreground-400">Agents</span>
                        <span className="text-amber-600 font-bold">{fullSpectrum.agentCompleted}/{fullSpectrum.agentTotal}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all" style={{ width: `${fullSpectrum.agentProgress}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-foreground-400">Corrections</span>
                        <span className="text-emerald-600 font-bold">{fullSpectrum.correctionCompleted}/{fullSpectrum.correctionTotal}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all" style={{ width: `${fullSpectrum.correctionProgress}%` }} />
                      </div>
                    </div>
                  </div>
                )}
                {executionState === 'running' && fullSpectrum.phase !== 'both' && (
                  <div className="mt-4 w-full h-2 rounded-full bg-background-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              {/* GAP Summary */}
              <div className="rounded-2xl border border-background-200 bg-white p-5 lg:col-span-2">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                  <i className="ri-error-warning-line text-red-500 mr-2" />
                  État des Gaps — {global.gaps_total} agents à déployer
                </h3>
                <div className="space-y-2">
                  {familyProgress.map(f => {
                    const remainingPct = f.agents_total > 0 ? Math.round((f.tasks_pending / f.agents_total) * 100) : 0;
                    if (f.tasks_pending === 0) return null;
                    return (
                      <div key={f.id} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${f.color}15` }}>
                          <i className={`${f.icon} text-xs`} style={{ color: f.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[11px] font-bold text-foreground-700">{f.name}</span>
                            <span className="text-[10px] text-red-600 font-bold">{f.tasks_pending} agents</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-background-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${f.deployedPct}%`, backgroundColor: f.color }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Priorities */}
              <div className="rounded-2xl border border-background-200 bg-white p-5">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                  <i className="ri-sort-asc text-amber-500 mr-2" />
                  Priorités
                </h3>
                <div className="space-y-2">
                  {sortedFamilies.slice(0, 6).map((f, i) => (
                    <div key={f.id} className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i < 3 ? 'bg-red-100 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>{f.priority_order}</span>
                      <span className="text-[11px] text-foreground-600">{f.name}</span>
                      <span className="ml-auto text-[10px] font-bold text-red-600">{f.tasks_pending}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Impact */}
            <div className="rounded-2xl border border-background-200 bg-white p-5 mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                <i className="ri-funds-line text-emerald-500 mr-2" />
                Impact Revenu du Bloc Execution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-background-50 p-4 text-center">
                  <span className="text-[10px] text-foreground-400 uppercase tracking-wider">Revenu Actuel</span>
                  <span className="block text-2xl font-bold text-foreground-950 font-heading mt-1">{formatCurrency(global.revenue_before)}</span>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 text-center">
                  <span className="text-[10px] text-emerald-600 uppercase tracking-wider">Revenu Cible 100%</span>
                  <span className="block text-2xl font-bold text-emerald-700 font-heading mt-1">{formatCurrency(global.revenue_target)}</span>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 text-center">
                  <span className="text-[10px] text-amber-600 uppercase tracking-wider">Gain Potentiel</span>
                  <span className="block text-2xl font-bold text-amber-700 font-heading mt-1">+{formatCurrency(global.revenue_target - global.revenue_before)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ PHASES TAB ============ */}
      {!loading && !error && activeTab === 'phases' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4">
                <i className="ri-stack-line text-red-600 text-sm" />
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Pipeline d'Exécution — 5 Phases</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
                {global.tasks_total} tâches en {phases.length} phases
              </h2>
              <p className="text-foreground-600">Chaque phase débloque des familles entières. Progression cumulative vers 100% KPO.</p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-9 top-10 bottom-10 w-0.5 bg-background-200" />
              <div className="space-y-8">
                {phases.map((phase) => {
                  const isActive = executionState === 'running' && currentPhase === phase.phase_number;
                  const isCompleted = executionState === 'completed' || (executionState === 'running' && currentPhase > phase.phase_number);
                  const isPending = !isActive && !isCompleted;

                  const phaseFamilies = families.filter(f => phase.families.includes(f.id));
                  const phaseAgentCount = phaseFamilies.reduce((s, f) => s + f.tasks_pending, 0);

                  return (
                    <div key={phase.phase_number} className="relative pl-16">
                      <div className={`absolute left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 border-white z-10 transition-all ${
                        isCompleted ? 'bg-emerald-500 text-white' :
                        isActive ? 'bg-amber-500 text-white ring-4 ring-amber-400/30 animate-pulse' :
                        'bg-background-100 text-foreground-400'
                      }`}>
                        {isCompleted ? <i className="ri-check-line" /> : phase.phase_number}
                      </div>

                      <div className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                        isActive ? 'border-amber-300 bg-amber-50/30 ring-2 ring-amber-200/50' :
                        isCompleted ? 'border-emerald-200 bg-white' :
                        'border-background-200 bg-white'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                isCompleted ? 'bg-emerald-100 text-emerald-700' :
                                isActive ? 'bg-amber-100 text-amber-700' :
                                'bg-background-100 text-foreground-500'
                              }`}>
                                {isCompleted ? 'Terminé' : isActive ? 'En cours...' : 'En attente'}
                              </span>
                              <span className="text-[10px] text-foreground-400">{phase.duration_minutes} min</span>
                              <span className="text-[10px] text-foreground-400">{phase.task_count} tâches</span>
                              <span className="text-[10px] text-foreground-400">{phase.agent_count} agents</span>
                            </div>
                            <h3 className="text-base font-bold text-foreground-950 flex items-center gap-2">
                              <i className={`${phase.icon}`} style={{ color: isCompleted ? '#86BC25' : isActive ? '#F59E0B' : '#9CA3AF' }} />
                              Phase {phase.phase_number} — {phase.label}
                            </h3>
                            <p className="text-sm text-foreground-500 mt-1 max-w-2xl">{phase.description}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <span className={`text-2xl font-bold font-heading ${
                              isCompleted ? 'text-emerald-600' : isActive ? 'text-amber-600' : 'text-foreground-300'
                            }`}>{phase.kpo_after_phase}%</span>
                            <span className="block text-[9px] text-foreground-400">KPO après phase</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {phaseFamilies.map(fam => (
                            <div key={fam.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-50 border border-background-200">
                              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${fam.color}15` }}>
                                <i className={`${fam.icon} text-[10px]`} style={{ color: fam.color }} />
                              </div>
                              <span className="text-[10px] font-bold text-foreground-600">{fam.name}</span>
                              <span className="text-[9px] text-red-500 font-bold">{fam.tasks_pending}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ FAMILIES TAB ============ */}
      {!loading && !error && activeTab === 'families' && (
        <section className="py-6 sm:py-10 bg-background-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground-950">
                  {families.length} Familles — {global.gaps_total} agents à déployer
                </h2>
                <p className="text-sm text-foreground-500">Triées par priorité de déploiement</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sortedFamilies.map(family => {
                const deployedPct = family.agents_total > 0 ? Math.round((family.deployed / family.agents_total) * 100) : 0;
                const domain = DOMAIN_INFO[family.domain] || DOMAIN_INFO['technique'];
                const isComplete = family.tasks_pending === 0;
                const isPriority = family.priority_order <= 3;

                return (
                  <div key={family.id} className={`rounded-2xl border bg-white overflow-hidden transition-all ${
                    isComplete ? 'border-emerald-200' :
                    isPriority ? 'border-red-200 ring-1 ring-red-100' :
                    'border-background-200'
                  }`}>
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${family.color}15` }}>
                          <i className={`${family.icon} text-lg`} style={{ color: family.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <h3 className="text-sm font-bold text-foreground-950 whitespace-nowrap">{family.name}</h3>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold border" style={{ color: domain.color, backgroundColor: domain.bg, borderColor: `${domain.color}40` }}>
                              {domain.label}
                            </span>
                            {isPriority && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-red-100 text-red-700 border border-red-200">
                                PRIO {family.priority_order}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-foreground-400">
                              {family.deployed}/{family.agents_total} déployés
                            </span>
                            <span className="text-foreground-400">{family.auto_enabled} auto</span>
                            {family.tasks_pending > 0 && (
                              <span className="text-red-600 font-bold">{family.tasks_pending} à faire</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* KPO Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-foreground-400">KPO</span>
                          <span className="font-bold" style={{ color: deployedPct >= 80 ? '#86BC25' : deployedPct >= 50 ? '#F59E0B' : '#DC2626' }}>
                            {family.kpo_before}% → {family.kpo_target}%
                          </span>
                        </div>
                        <div className="relative w-full h-2 rounded-full bg-background-100 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${deployedPct}%`, backgroundColor: family.color }} />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 mb-3 text-[10px]">
                        <i className="ri-timer-line text-foreground-400" />
                        <span className="text-foreground-500">{family.estimated_duration_minutes} min estimées</span>
                      </div>

                      {/* Blockers */}
                      {family.blockers.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
                          <span className="text-[9px] font-bold text-red-700 uppercase tracking-wider">Blocages</span>
                          <ul className="mt-1 space-y-0.5">
                            {family.blockers.map((b, j) => (
                              <li key={j} className="flex items-start gap-1 text-[10px] text-red-800">
                                <span className="mt-0.5">-</span><span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {isComplete && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-center">
                          <span className="text-[9px] font-bold text-emerald-700">
                            <i className="ri-check-double-line mr-1" />100% DÉPLOYÉ
                          </span>
                        </div>
                      )}
                    </div>

                    {family.route && (
                      <div className="px-5 py-2.5 border-t border-background-100 bg-background-50 text-right">
                        <a href={family.route} className="text-[10px] font-bold hover:underline cursor-pointer whitespace-nowrap" style={{ color: family.color }}>
                          Page détail <i className="ri-arrow-right-line" />
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
                      <span className="text-[10px] text-red-500 font-mono ml-1">
                        {progress}% — {Math.max(0, global.tasks_total - Math.round((progress / 100) * global.tasks_total))} restants
                      </span>
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
                {executionState === 'running' && (
                  <p className="text-sm text-foreground-500 mt-1">
                    Les agents sont déployés en temps réel — chaque ligne = un agent activé
                  </p>
                )}
              </div>
              {executionState === 'running' && (
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-4xl font-bold font-heading text-red-600 animate-pulse">
                    {Math.max(0, global.tasks_total - Math.round((progress / 100) * global.tasks_total))}
                  </span>
                  <span className="text-[10px] text-foreground-400 uppercase tracking-wider">agents restants</span>
                </div>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="rounded-2xl border border-background-200 bg-white p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-50 flex items-center justify-center">
                  <i className="ri-terminal-box-line text-2xl text-foreground-300" />
                </div>
                <p className="text-sm text-foreground-500">Lancez le Full Spectrum pour voir les logs en direct — agents + corrections.</p>
                <button
                  onClick={startFullSpectrumExecution}
                  disabled={executionState === 'running'}
                  className="mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-500 text-white text-sm font-bold hover:from-red-500 hover:to-rose-400 transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-flashlight-line mr-2" />FULL SPECTRUM
                </button>
              </div>
            ) : (
              <div ref={logsContainerRef} className="rounded-2xl border border-background-200 bg-white overflow-hidden max-h-[600px] overflow-y-auto">
                <div className="divide-y divide-background-100">
                  {logs.map(log => {
                    const family = families.find(f => f.name === log.family_name);
                    return (
                      <div key={log.id} className="flex items-start gap-3 p-4 hover:bg-background-50 transition-colors">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          log.status === 'completed' ? 'bg-emerald-100' :
                          log.status === 'in_progress' ? 'bg-amber-100' :
                          log.status === 'failed' ? 'bg-red-100' :
                          'bg-background-100'
                        }`}>
                          {log.status === 'completed' && <i className="ri-check-line text-emerald-600 text-sm" />}
                          {log.status === 'in_progress' && <i className="ri-loader-4-line animate-spin text-amber-600 text-sm" />}
                          {log.status === 'failed' && <i className="ri-close-line text-red-600 text-sm" />}
                          {log.status === 'queued' && <i className="ri-time-line text-foreground-400 text-sm" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="text-xs font-bold text-foreground-800">{log.agent_name}</span>
                            {family && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ color: family.color, backgroundColor: `${family.color}10` }}>
                                {log.family_name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground-600">{log.action}</p>
                          <p className="text-[10px] text-foreground-400">{log.detail}</p>
                        </div>
                        <span className="text-[10px] text-foreground-400 whitespace-nowrap flex-shrink-0">
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

      {/* ============ CROSS-LINKS ============ */}
      <section className="py-12 sm:py-16 bg-background-50 border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Commandement KOS — Tous les Centres
            </h2>
            <p className="text-foreground-600">Accès aux cockpits de pilotage et d'exécution du KOS.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'Synchroniseur Maître', path: '/kos-synchroniseur-maitre', icon: 'ri-refresh-line', color: '#F59E0B' },
              { label: 'Commandement Unifié', path: '/kos-commandement-operationnel-unifie', icon: 'ri-government-line', color: '#EA580C' },
              { label: 'Performance 100%', path: '/kos-performance-100-challenge', icon: 'ri-line-chart-line', color: '#86BC25' },
              { label: 'Enterprise Brain', path: '/kos-enterprise-brain-os', icon: 'ri-brain-line', color: '#8B5CF6' },
              { label: 'Control Tower', path: '/kos-control-tower-automation', icon: 'ri-radar-line', color: '#BE123C' },
              { label: 'KOS Dashboard', path: '/kos-dashboard', icon: 'ri-dashboard-line', color: '#5B8C2A' },
              { label: 'Executive Command', path: '/kos-executive-command', icon: 'ri-building-line', color: '#14B8A6' },
              { label: 'Expert LLM', path: '/kos-llm-experts-automates', icon: 'ri-brain-line', color: '#F59E0B' },
              { label: 'Managing Partner', path: '/kos-managing-partner-office', icon: 'ri-user-star-line', color: '#6366F1' },
              { label: 'Orchestrator', path: '/kos-orchestrator-engine', icon: 'ri-flow-chart', color: '#DC2626' },
            ].map(link => (
              <a key={link.path} href={link.path} className="rounded-xl border border-background-200 bg-white p-3 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block">
                <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-sm`} style={{ color: link.color }} />
                </div>
                <span className="text-[10px] font-bold text-foreground-700 leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}