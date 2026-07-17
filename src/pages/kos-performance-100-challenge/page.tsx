import { useState, useCallback, useEffect, useRef } from 'react';
import SeoHead from '@/components/feature/SeoHead';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { supabase } from '@/lib/supabase';
import { usePerformance100Challenge } from '@/hooks/usePerformance100Challenge';
import type { PerformanceGap } from '@/hooks/usePerformance100Challenge';
import ChallengeOverview from './components/ChallengeOverview';
import GapHuntBoard from './components/GapHuntBoard';
import AgentMissionsPanel from './components/AgentMissionsPanel';
import ChallengeTimeline from './components/ChallengeTimeline';
import SprintActivation from './components/SprintActivation';
import AutomationEngine from './components/AutomationEngine';
import MassUpgradeCommand from './components/MassUpgradeCommand';
import KOSAutoHealingPanel from './components/KOSAutoHealingPanel';
import type { SystemTask } from '@/mocks/kosMassSystemUpgrade';

const SUPABASE_WRITE_BATCH_SIZE = 5;
const SUPABASE_WRITE_INTERVAL_MS = 3000;

const TABS = [
  { key: 'overview', label: "Vue d'Ensemble", icon: 'ri-dashboard-3-line' },
  { key: 'health', label: 'Santé Système', icon: 'ri-heart-pulse-line' },
  { key: 'gaps', label: 'Chasse aux GAPs', icon: 'ri-crosshair-line' },
  { key: 'agents', label: 'Agents en Mission', icon: 'ri-team-line' },
  { key: 'timeline', label: 'Timeline', icon: 'ri-calendar-check-line' },
  { key: 'strategy', label: 'Stratégie', icon: 'ri-flag-2-line' },
  { key: 'mass-upgrade', label: 'Mass Upgrade', icon: 'ri-rocket-2-line' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function KOSPerformance100ChallengePage() {
  const {
    manifest: challengeManifest,
    gaps: initialGaps,
    agentMissions,
    executionLogs,
    dataSource,
    loading,
    refresh: refreshChallenge,
  } = usePerformance100Challenge();

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [sprintActive, setSprintActive] = useState(false);
  const [liveGaps, setLiveGaps] = useState<PerformanceGap[]>(initialGaps);
  const [massUpgradeActive, setMassUpgradeActive] = useState(false);
  const [massUpgradeTaskCount, setMassUpgradeTaskCount] = useState(0);
  const pendingSupabaseWrites = useRef<Array<{ taskId: string; agentName: string; agentIcon: string; action: string }>>([]);
  const supabaseFlushTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync liveGaps when hook data loads/refreshes
  useEffect(() => {
    if (initialGaps.length > 0) {
      setLiveGaps(initialGaps);
    }
  }, [initialGaps]);

  // Supabase batch flush for Mass Upgrade execution logs
  const flushSupabaseLogs = useCallback(async () => {
    const batch = pendingSupabaseWrites.current.splice(0);
    if (batch.length === 0) return;

    try {
      const logRows = batch.map(entry => ({
        block_id: 'CHALLENGE-100',
        agent_name: entry.agentName,
        action: entry.action,
        status: 'success',
        timestamp: new Date().toISOString(),
        details: { gap: entry.taskId },
      }));
      await supabase.from('kos_execution_logs').insert(logRows);
    } catch (err: any) {
      console.warn('[MassUpgrade Supabase] Log write skipped:', err.message);
    }
  }, []);

  // Cleanup flush timer
  useEffect(() => {
    return () => {
      if (supabaseFlushTimer.current) clearInterval(supabaseFlushTimer.current);
    };
  }, []);

  const handleActivateSprint = useCallback(() => {
    setSprintActive(true);
  }, []);

  const handleActivateMassUpgrade = useCallback(() => {
    setMassUpgradeActive(true);
    setSprintActive(true);
    // Start periodic Supabase flush
    if (!supabaseFlushTimer.current) {
      supabaseFlushTimer.current = setInterval(() => {
        flushSupabaseLogs();
      }, SUPABASE_WRITE_INTERVAL_MS);
    }
  }, [flushSupabaseLogs]);

  // Mass Upgrade tasks update handler — persists to Supabase + updates gaps
  const handleMassUpgradeTasksUpdate = useCallback((updates: SystemTask[], upgrades: SystemTask[]) => {
    const allTasks = [...updates, ...upgrades];
    const completedTasks = allTasks.filter(t => t.status === 'completed');

    // Map completed Mass Upgrade tasks to PerformanceGap updates
    setLiveGaps(prev => prev.map(gap => {
      // Map system tasks to gaps based on category keywords
      const gapKeywordMap: Record<string, string[]> = {
        'GAP-01': ['Performance', 'Mobile', 'Lighthouse', 'Tree shaking', 'AVIF', 'CSS', 'TBT'],
        'GAP-02': ['Desktop', 'Preload', 'CDN', 'Font'],
        'GAP-03': ['LCP', 'Hero', 'Responsive', 'CrUX'],
        'GAP-04': ['TBT', 'Bundle', 'Lazy', 'Animation'],
        'GAP-05': ['CLS', 'Dimension', 'Stability'],
        'GAP-06': ['SEO', 'Hreflang', 'Meta', 'Canonical', 'Schema'],
        'GAP-07': ['Accessibility', 'WCAG', 'Alt', 'Aria', 'Focus'],
        'GAP-08': ['Security', 'CSP', 'Trusted', 'Permissions', 'OWASP'],
        'GAP-09': ['Weight', 'Compression', 'Brotli', 'Image optimization', 'Subset'],
        'GAP-10': ['Cache', 'Edge', 'TTL', 'Immutable'],
        'GAP-11': ['Schema.org', 'FAQPage', 'Article', 'Breadcrumb'],
        'GAP-12': ['FCP', 'Critical CSS', 'TTFB', 'Preload'],
      };

      const matchingGapEntry = Object.entries(gapKeywordMap).find(([, keywords]) =>
        completedTasks.some(ct =>
          keywords.some(kw => ct.module.toLowerCase().includes(kw.toLowerCase()) || ct.description.toLowerCase().includes(kw.toLowerCase()))
        )
      );

      if (matchingGapEntry && gap.id === matchingGapEntry[0]) {
        const newProgress = Math.min(gap.progress + 15, 100);
        const newStatus = newProgress >= 100 ? 'closed' as const : 'in_progress' as const;
        return { ...gap, progress: newProgress, status: newStatus };
      }
      return gap;
    }));

    // Queue Supabase writes for completed tasks
    completedTasks.forEach((task) => {
      pendingSupabaseWrites.current.push({
        taskId: task.id,
        agentName: task.assignedAgent,
        agentIcon: task.agentIcon,
        action: `${task.module} — COMPLÉTÉ`,
      });
      // Also update kos_challenge_gaps progress in Supabase
      supabase
        .from('kos_challenge_gaps')
        .update({
          progress: 100,
          status: 'closed',
        })
        .eq('gap_code', task.id)
        .then(({ error }) => {
          if (error) console.warn('[MassUpgrade GAP] Write skipped:', error.message);
        });
    });

    // Flush immediately if batch is full
    if (pendingSupabaseWrites.current.length >= SUPABASE_WRITE_BATCH_SIZE) {
      flushSupabaseLogs();
    }

    // Increment task counter to track progress
    setMassUpgradeTaskCount(prev => prev + 1);

    // Trigger a full refresh every 8 task completions
    if ((massUpgradeTaskCount + 1) % 8 === 0) {
      refreshChallenge();
    }
  }, [flushSupabaseLogs, massUpgradeTaskCount, refreshChallenge]);

  const handleGapsUpdate = useCallback((updatedGaps: PerformanceGap[]) => {
    setLiveGaps(updatedGaps);
  }, []);

  const totalSubtasks = liveGaps.reduce((s, g) => s + g.subtasks.length, 0);
  const doneSubtasks = liveGaps.reduce((s, g) => s + g.subtasks.filter(st => st.done).length, 0);
  const liveGlobalScore = Math.min(93.5 + (doneSubtasks / Math.max(totalSubtasks, 1)) * 6.5, 100);

  const criticalCount = liveGaps.filter(g => g.severity === 'critical').length;
  const inProgressCount = sprintActive
    ? liveGaps.filter(g => g.status === 'in_progress' || g.status === 'open').length
    : liveGaps.filter(g => g.status === 'in_progress').length;
  const closedCount = liveGaps.filter(g => g.status === 'closed').length;
  const avgAgentScore = Math.round(agentMissions.reduce((s, a) => s + a.score, 0) / Math.max(agentMissions.length, 1));

  return (
    <>
      <SeoHead
        title="KOS Performance 100% Challenge — KHEPRA EXPERTS"
        description="Mission critique : 12 agents KOS mobilisés pour atteindre 100% Big Four Supreme. Lighthouse, Core Web Vitals, SEO, Accessibilité, Sécurité — Sprint final 14 jours. Certification AAAA sur khepraexperts.com"
        canonicalPath="/kos-performance-100-challenge"
        noIndex={true}
      />
      <KOSHubLayout hubId={59} activeTab="100% Challenge" tabLabel="Performance 100% Challenge">
        <div className="bg-background-50 min-h-screen">
          {/* Hero Header */}
          <section className="relative overflow-hidden bg-background-100 border-b border-background-200/70">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-100/20 rounded-full translate-y-1/2" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-700 shrink-0">
                    <i className="ri-trophy-line text-2xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      {/* Data source badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-body tracking-wide ${
                        dataSource === 'supabase'
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {dataSource === 'supabase' ? 'DONNÉES LIVE — SUPABASE' : 'DONNÉES MOCK — DÉMO'}
                      </span>
                      {massUpgradeActive ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white font-body tracking-wide animate-pulse">
                          MASS UPGRADE ACTIF — 18 AGENTS
                        </span>
                      ) : sprintActive ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white font-body tracking-wide animate-pulse">
                          SPRINT ACTIF
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 font-body tracking-wide animate-pulse">
                          MISSION CRITIQUE
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-700 font-body tracking-wide">
                        {challengeManifest.daysRemaining} JOURS
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-100 text-accent-700 font-body tracking-wide">
                        {challengeManifest.agentsMobilized} AGENTS
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-100 text-secondary-700 font-body tracking-wide">
                        {challengeManifest.totalGaps} GAPS
                      </span>
                      {sprintActive && closedCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 font-body tracking-wide animate-pulse">
                          {closedCount} FERMÉS
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground-950 font-heading">
                      Performance 100% Challenge
                    </h1>
                    <p className="text-sm text-foreground-600 mt-1.5 max-w-2xl font-body">
                      Sprint final vers l&apos;excellence absolue. Objectif : certification AAAA — Big Four Supreme.
                      12 agents KOS en mission 24/7 pour fermer les {challengeManifest.totalGaps} derniers gaps
                      et atteindre 100/100 sur tous les indicateurs Big Four avant le {challengeManifest.deadline}.
                    </p>
                  </div>
                </div>

                {/* Stats Cluster */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-center">
                    <div className="relative w-18 h-18 mx-auto mb-1">
                      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
                        <circle cx="36" cy="36" r="30" fill="none" stroke="oklch(var(--background-200))" strokeWidth="5" />
                        <circle
                          cx="36" cy="36" r="30" fill="none" stroke={sprintActive ? 'oklch(var(--emerald-500))' : 'oklch(var(--primary-500))'}
                          strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 30}`}
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - liveGlobalScore / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground-950 font-heading">
                        {liveGlobalScore.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-foreground-500 font-body">Score Global</span>
                  </div>
                  <div className="w-px h-12 bg-background-200/70" />
                  <div className="text-center">
                    <span className="text-xl font-bold text-red-600 font-heading">{criticalCount}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Critiques</span>
                  </div>
                  <div className="w-px h-12 bg-background-200/70" />
                  <div className="text-center">
                    <span className="text-xl font-bold text-primary-500 font-heading">{inProgressCount}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">En cours</span>
                  </div>
                  <div className="w-px h-12 bg-background-200/70" />
                  <div className="text-center">
                    <span className="text-xl font-bold text-foreground-950 font-heading">{doneSubtasks}/{totalSubtasks}</span>
                    <span className="text-[10px] font-medium text-foreground-500 font-body block">Sous-tâches</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alert Banner */}
          {!sprintActive && criticalCount > 0 && (
            <div className="bg-red-50 border-b border-red-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="ri-error-warning-line text-red-600 animate-pulse"></i>
                    <span className="font-semibold text-red-700 font-body">
                      {criticalCount} GAPs critiques — {challengeManifest.daysRemaining} jours pour les fermer
                    </span>
                    <span className="text-red-500 font-body">
                      — Chaque jour compte. La certification AAAA est à portée.
                    </span>
                  </div>
                  <span className="text-[10px] text-red-400 font-body">
                    Deadline : {challengeManifest.deadline}
                  </span>
                </div>
              </div>
            </div>
          )}
          {sprintActive && closedCount < challengeManifest.totalGaps && (
            <div className="bg-emerald-50 border-b border-emerald-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="ri-rocket-2-line text-emerald-600"></i>
                    <span className="font-semibold text-emerald-700 font-body">
                      SPRINT ACTIF — 12 agents en mission 24/7
                    </span>
                    <span className="text-emerald-500 font-body">
                      — Tous les GAPs sont en cours de correction. Prochaine étape : J-2 certification 96%.
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-body flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>
            </div>
          )}
          {sprintActive && closedCount >= challengeManifest.totalGaps && (
            <div className="bg-amber-50 border-b border-amber-200">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="ri-trophy-line text-amber-600"></i>
                    <span className="font-semibold text-amber-700 font-body">
                      TOUS LES GAPS SONT FERMÉS ! — Certification AAAA imminente
                    </span>
                    <span className="text-amber-500 font-body">
                      — Validation CrUX + Lighthouse en cours. Rapport final en préparation.
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-500 font-body flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Vérification finale
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Switcher */}
          <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-primary-500 text-background-50'
                        : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                    }`}
                    type="button"
                  >
                    <i className={`${tab.icon} text-sm`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <SprintActivation isActive={sprintActive} onActivate={handleActivateSprint} agentMissions={agentMissions} />
                <AutomationEngine
                  isActive={sprintActive}
                  gaps={liveGaps}
                  onGapsUpdate={handleGapsUpdate}
                />
                <ChallengeOverview
                  sprintActive={sprintActive}
                  liveGaps={liveGaps}
                  liveGlobalScore={liveGlobalScore}
                  manifest={challengeManifest}
                />
              </div>
            )}
            {activeTab === 'gaps' && <GapHuntBoard sprintActive={sprintActive} liveGaps={liveGaps} />}
            {activeTab === 'agents' && <AgentMissionsPanel sprintActive={sprintActive} liveGaps={liveGaps} agentMissions={agentMissions} />}
            {activeTab === 'timeline' && <ChallengeTimeline sprintActive={sprintActive} liveGaps={liveGaps} manifest={challengeManifest} />}
            {activeTab === 'strategy' && <StrategyPanel sprintActive={sprintActive} liveGaps={liveGaps} />}
            {activeTab === 'health' && <KOSAutoHealingPanel />}
            {activeTab === 'mass-upgrade' && (
              <div className="space-y-8">
                <MassUpgradeCommand
                  isActive={massUpgradeActive}
                  onActivate={handleActivateMassUpgrade}
                  onTasksUpdate={handleMassUpgradeTasksUpdate}
                />
                {massUpgradeActive && (
                  <AutomationEngine
                    isActive={sprintActive}
                    gaps={liveGaps}
                    onGapsUpdate={handleGapsUpdate}
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer Info Bar */}
          <footer className="border-t border-background-200/70 bg-background-100 mt-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[10px] text-foreground-500 font-body">
                  <span className={`flex items-center gap-1 ${
                    dataSource === 'supabase' ? 'text-emerald-600' : 'text-foreground-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dataSource === 'supabase' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                    {dataSource === 'supabase' ? 'Données Live — Supabase' : 'Données Mock — Démo'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${sprintActive ? 'bg-emerald-500' : 'bg-red-500'} ${sprintActive ? '' : 'animate-pulse'}`}></span>
                    {sprintActive ? 'Sprint actif — ' : 'Sprint final — '}{challengeManifest.daysRemaining} jours restants
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {challengeManifest.agentsOnMission} agents en mission 24/7
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                    Score agent moyen : {avgAgentScore}/100
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-foreground-400 font-body">
                  <i className="ri-rocket-2-line"></i>
                  <span>Objectif : {challengeManifest.certificationTarget} — {challengeManifest.deadline}</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </KOSHubLayout>
    </>
  );
}

function StrategyPanel({ sprintActive = false, liveGaps }: { sprintActive?: boolean; liveGaps?: PerformanceGap[] }) {
  const gaps = liveGaps || [];
  const closedCount = gaps.filter(g => g.status === 'closed').length;
  const inProgressCount = gaps.filter(g => g.status === 'in_progress').length;
  const openCount = gaps.filter(g => g.status === 'open').length;

  return (
    <div className="space-y-8">
      {/* Strategy Overview */}
      <div className="bg-background-50 rounded-lg border border-background-200/70 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-100 text-accent-700">
            <i className="ri-focus-3-line text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground-950 font-heading">STRATÉGIE DE FERMETURE — LES 4 VAGUES</h3>
            <p className="text-xs text-foreground-500 font-body">
              {sprintActive
                ? `SPRINT ACTIF — Exécution parallèle des 4 vagues simultanément. ${closedCount} GAPs fermés, ${inProgressCount} en cours, ${openCount} restants.`
                : 'Approche méthodique pour atteindre 100% en 14 jours'}
            </p>
          </div>
          {sprintActive && (
            <div className="ml-auto px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold animate-pulse">
              EN COURS — {closedCount}/{gaps.length}
            </div>
          )}
        </div>

        {/* Wave 1 */}
        <div className="mb-8 p-5 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white font-body">VAGUE 1</span>
            <span className="text-xs font-semibold text-red-800 font-heading">JOURS 1-3 — CRITIQUES</span>
            <span className="text-[10px] text-red-600 font-body">3 GAPs</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-red-800 font-body">
              <i className="ri-checkbox-circle-line text-red-500 mt-0.5"></i>
              <span><strong>GAP-01 — Lighthouse Mobile 94→100 :</strong> Tree shaking JS, conversion AVIF résiduelle, purge CSS, reduce TBT</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-red-800 font-body">
              <i className="ri-checkbox-circle-line text-red-500 mt-0.5"></i>
              <span><strong>GAP-03 — LCP 2.1→1.8s :</strong> Conversion hero images, preload, responsive srcset, validation CrUX</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-red-800 font-body">
              <i className="ri-checkbox-circle-line text-red-500 mt-0.5"></i>
              <span><strong>GAP-04 — TBT 98→40ms :</strong> Remplacer bundles lourds, lazy loading, animations CSS natives</span>
            </li>
          </ul>
        </div>

        {/* Wave 2 */}
        <div className="mb-8 p-5 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white font-body">VAGUE 2</span>
            <span className="text-xs font-semibold text-amber-800 font-heading">JOURS 4-7 — ÉLEVÉS</span>
            <span className="text-[10px] text-amber-600 font-body">5 GAPs</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-amber-800 font-body">
              <i className="ri-checkbox-circle-line text-amber-500 mt-0.5"></i>
              <span><strong>GAP-02 — Desktop 98→100 :</strong> Preload images, font-display swap, CDN Edge HTML</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800 font-body">
              <i className="ri-checkbox-circle-line text-amber-500 mt-0.5"></i>
              <span><strong>GAP-06 — SEO 95→100 :</strong> hreflang, metas, orphelines, canonical, schema</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800 font-body">
              <i className="ri-checkbox-circle-line text-amber-500 mt-0.5"></i>
              <span><strong>GAP-07 — Accessibilité 96→100 :</strong> alt, aria-label, focus states, skip-link</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800 font-body">
              <i className="ri-checkbox-circle-line text-amber-500 mt-0.5"></i>
              <span><strong>GAP-09 — Page Weight 1.7→1.2 Mo :</strong> Conversion AVIF massive, subset fonts, Brotli</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800 font-body">
              <i className="ri-checkbox-circle-line text-amber-500 mt-0.5"></i>
              <span><strong>GAP-12 — FCP 1.6→1.2s :</strong> Critical CSS inline, font preload, TTFB optimisation</span>
            </li>
          </ul>
        </div>

        {/* Wave 3 */}
        <div className="mb-8 p-5 rounded-lg bg-secondary-50 border border-secondary-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-500 text-white font-body">VAGUE 3</span>
            <span className="text-xs font-semibold text-secondary-800 font-heading">JOURS 8-10 — MOYENS</span>
            <span className="text-[10px] text-secondary-600 font-body">3 GAPs</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-secondary-800 font-body">
              <i className="ri-checkbox-circle-line text-secondary-500 mt-0.5"></i>
              <span><strong>GAP-05 — CLS 0.06→0.03 :</strong> Dimensions images, font-size-adjust, stabilité CTA</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-secondary-800 font-body">
              <i className="ri-checkbox-circle-line text-secondary-500 mt-0.5"></i>
              <span><strong>GAP-10 — CDN Edge Cache 85→100% :</strong> HTML Edge Cache, immutable fonts, TTL API</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-secondary-800 font-body">
              <i className="ri-checkbox-circle-line text-secondary-500 mt-0.5"></i>
              <span><strong>GAP-11 — Schema.org 88→100% :</strong> FAQPage, Article, BreadcrumbList, validation</span>
            </li>
          </ul>
        </div>

        {/* Wave 4 */}
        <div className="p-5 rounded-lg bg-emerald-50 border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white font-body">VAGUE 4</span>
            <span className="text-xs font-semibold text-emerald-800 font-heading">JOURS 11-14 — VALIDATION</span>
            <span className="text-[10px] text-emerald-600 font-body">1 GAP + Validation</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-emerald-800 font-body">
              <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
              <span><strong>GAP-08 — Sécurité A+→A++ :</strong> Trusted Types enforced, server signature, Permissions-Policy max, COEP credentialless</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-emerald-800 font-body">
              <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
              <span><strong>Validation CrUX + Lighthouse :</strong> Re-run complet sur 28 pages, validation Core Web Vitals, GSC verification</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-emerald-800 font-body">
              <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
              <span><strong>Rollback monitoring :</strong> Surveillance 48h post-déploiement, alerte si régression &gt; 1 point</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-emerald-800 font-body">
              <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5"></i>
              <span><strong>Certification AAAA — Big Four Supreme :</strong> Rapport final, badge certification, communiqué de presse</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}