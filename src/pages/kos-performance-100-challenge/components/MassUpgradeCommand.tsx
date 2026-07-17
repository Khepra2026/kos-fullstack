import { useState, useEffect, useCallback, useRef } from 'react';
import {
  systemUpdateTasks as initialSystemUpdates,
  systemUpgradeTasks as initialSystemUpgrades,
  massLaunchManifest,
  unifiedAgentsForMassLaunch,
} from '@/mocks/kosMassSystemUpgrade';

interface Subtask {
  id: string;
  label: string;
  done: boolean;
}

interface SystemTask {
  id: string;
  category: string;
  module: string;
  severity: string;
  assignedAgent: string;
  agentIcon: string;
  currentVersion?: string;
  targetVersion?: string;
  description: string;
  impact: string;
  benefit?: string;
  status: string;
  progress: number;
  subtasks: Subtask[];
}

interface LiveLog {
  id: number;
  timestamp: string;
  agent: string;
  agentIcon: string;
  taskId: string;
  action: string;
  type: 'subtask_done' | 'task_complete' | 'agent_started' | 'milestone' | 'speed_change' | 'wave_complete';
}

const SPEED_PRESETS = [
  { label: '1x', value: 1, icon: 'ri-speed-line' },
  { label: '2x', value: 2, icon: 'ri-speed-up-line' },
  { label: '5x', value: 5, icon: 'ri-flashlight-line' },
  { label: '10x', value: 10, icon: 'ri-rocket-2-line' },
] as const;

const LAUNCH_SEQUENCE_LOGS = [
  { agent: 'ORCHESTRATOR', agentIcon: 'ri-rocket-2-line', taskId: 'ALL', action: 'MASS SYSTEM UPGRADE ACTIVÉ — 18 agents KOS reçoivent leurs ordres simultanément', type: 'milestone' as const },
  { agent: 'Dependency Guardian Engine', agentIcon: 'ri-npmjs-line', taskId: 'SYS-UPDATE-01', action: 'Démarrage : audit npm + upgrade React 19.0.0 → 19.2.0', type: 'agent_started' as const },
  { agent: 'Security Hardening Engine', agentIcon: 'ri-shield-keyhole-line', taskId: 'SYS-UPDATE-02', action: 'Démarrage : CSP enforced + Trusted Types + Permissions-Policy', type: 'agent_started' as const },
  { agent: 'Performance Engine', agentIcon: 'ri-speed-up-line', taskId: 'SYS-UPDATE-03', action: 'Démarrage : Core Web Vitals — Lighthouse Mobile 94→100', type: 'agent_started' as const },
  { agent: 'SEO Technical Engine', agentIcon: 'ri-search-eye-line', taskId: 'SYS-UPDATE-04', action: 'Démarrage : hreflang + metas + schema — SEO 95→100', type: 'agent_started' as const },
  { agent: 'Accessibility Engine', agentIcon: 'ri-wheelchair-line', taskId: 'SYS-UPDATE-05', action: 'Démarrage : WCAG 2.2 AA — alt + aria-label + focus states', type: 'agent_started' as const },
  { agent: 'Cache Optimization Engine', agentIcon: 'ri-cloud-line', taskId: 'SYS-UPDATE-06', action: 'Démarrage : CDN Edge Cache 85→100% + Brotli niveau 11', type: 'agent_started' as const },
  { agent: 'Infrastructure Architect', agentIcon: 'ri-server-line', taskId: 'SYS-UPGRADE-01', action: 'Démarrage : Node.js 22 LTS migration complète', type: 'agent_started' as const },
  { agent: 'KOS Enterprise Architect', agentIcon: 'ri-stack-line', taskId: 'SYS-UPGRADE-02', action: 'Démarrage : Refactorisation 159→12 edge functions', type: 'agent_started' as const },
  { agent: 'Data Performance Engine', agentIcon: 'ri-database-2-line', taskId: 'SYS-UPGRADE-03', action: 'Démarrage : 84 nouveaux index + RLS simplification', type: 'agent_started' as const },
  { agent: 'Security Architecture Engine', agentIcon: 'ri-shield-flash-line', taskId: 'SYS-UPGRADE-04', action: 'Démarrage : OWASP scanner CI/CD + rate limiting', type: 'agent_started' as const },
  { agent: 'KOS Multi-Agent Orchestrator', agentIcon: 'ri-node-tree', taskId: 'SYS-UPGRADE-05', action: 'Démarrage : Agent Mesh Protocol v2.0 — communication inter-agents', type: 'agent_started' as const },
  { agent: 'KOS AI Governance Council', agentIcon: 'ri-brain-line', taskId: 'SYS-UPGRADE-06', action: 'Démarrage : LLM Router multi-fournisseurs', type: 'agent_started' as const },
  { agent: 'ORCHESTRATOR', agentIcon: 'ri-rocket-2-line', taskId: 'ALL', action: 'VAGUE 1 LANCÉE — 6 agents de mise à jour + 6 agents d\'upgrade actifs', type: 'wave_complete' as const },
  { agent: 'Social Content Generator', agentIcon: 'ri-quill-pen-line', taskId: 'SOCIAL', action: 'Démarrage : Génération contenu LinkedIn 14 posts/semaine', type: 'agent_started' as const },
  { agent: 'LinkedIn Publisher', agentIcon: 'ri-linkedin-fill', taskId: 'SOCIAL', action: 'Démarrage : Publication auto 6 créneaux/semaine', type: 'agent_started' as const },
  { agent: 'Smart Scheduler', agentIcon: 'ri-calendar-schedule-line', taskId: 'SOCIAL', action: 'Démarrage : Planification optimale créneaux LinkedIn', type: 'agent_started' as const },
  { agent: 'Hashtag Optimizer', agentIcon: 'ri-hashtag', taskId: 'SOCIAL', action: 'Démarrage : Optimisation hashtags portée maximale', type: 'agent_started' as const },
  { agent: 'Engagement Analyzer', agentIcon: 'ri-heart-pulse-line', taskId: 'SOCIAL', action: 'Démarrage : Analyse engagement temps réel', type: 'agent_started' as const },
  { agent: 'Content Repurposer', agentIcon: 'ri-repeat-line', taskId: 'SOCIAL', action: 'Démarrage : Cross-plateforme repurposing', type: 'agent_started' as const },
  { agent: 'ORCHESTRATOR', agentIcon: 'ri-trophy-line', taskId: 'ALL', action: 'VAGUE 2 LANCÉE — 6 automates sociaux activés. 18 agents en mission 24/7.', type: 'wave_complete' as const },
];

interface MassUpgradeCommandProps {
  isActive: boolean;
  onActivate: () => void;
  onTasksUpdate: (updates: SystemTask[], upgrades: SystemTask[]) => void;
}

export default function MassUpgradeCommand({ isActive, onActivate, onTasksUpdate }: MassUpgradeCommandProps) {
  const [updates, setUpdates] = useState<SystemTask[]>(initialSystemUpdates);
  const [upgrades, setUpgrades] = useState<SystemTask[]>(initialSystemUpgrades);
  const [logs, setLogs] = useState<LiveLog[]>([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [launchPhase, setLaunchPhase] = useState<'idle' | 'countdown' | 'animating' | 'live'>('idle');
  const [launchStep, setLaunchStep] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [tasksTotal, setTasksTotal] = useState(0);
  const processedRef = useRef<Set<string>>(new Set());
  const logIdRef = useRef(0);

  // Computed stats
  const allTasks = [...updates, ...upgrades];
  const allSubtasks = allTasks.flatMap(t => t.subtasks);
  const totalSubtasks = allSubtasks.length;
  const doneSubtasks = allSubtasks.filter(s => s.done).length;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const criticalCount = allTasks.filter(t => t.severity === 'critical').length;
  const overallProgress = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;
  const globalScore = Math.min(93.5 + (doneSubtasks / Math.max(totalSubtasks, 1)) * 6.5, 100);

  const getTimestamp = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  };

  const addLog = useCallback((log: Omit<LiveLog, 'id' | 'timestamp'>) => {
    logIdRef.current += 1;
    setLogs(prev => [{ ...log, id: logIdRef.current, timestamp: getTimestamp() }, ...prev.slice(0, 99)]);
  }, []);

  // Launch sequence animation
  useEffect(() => {
    if (launchPhase !== 'animating') return;
    const interval = setInterval(() => {
      setLaunchStep(prev => {
        if (prev >= LAUNCH_SEQUENCE_LOGS.length) {
          clearInterval(interval);
          setLaunchPhase('live');
          return prev;
        }
        addLog(LAUNCH_SEQUENCE_LOGS[prev]);
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [launchPhase, addLog]);

  // Auto-execution engine
  useEffect(() => {
    if (!isActive || isPaused || launchPhase !== 'live') return;

    const allUndone: { task: SystemTask; subtask: Subtask; isUpdate: boolean }[] = [];
    [...updates, ...upgrades].forEach(task => {
      if (task.status === 'completed') return;
      task.subtasks.forEach(st => {
        if (!st.done && !processedRef.current.has(st.id)) {
          allUndone.push({ task, subtask: st, isUpdate: task.id.startsWith('SYS-UPDATE') });
        }
      });
    });

    if (allUndone.length === 0) {
      addLog({
        agent: 'ORCHESTRATOR',
        agentIcon: 'ri-trophy-line',
        taskId: 'ALL',
        action: 'TOUS LES SYSTÈMES SONT À JOUR ! 100% BIG FOUR ATTEINT. Certification AAAA imminente.',
        type: 'milestone',
      });
      return;
    }

    const baseInterval = 1000;
    const interval = baseInterval / speed;

    const timer = setInterval(() => {
      const freshUndone: { task: SystemTask; subtask: Subtask; isUpdate: boolean }[] = [];
      const currentUpdates = [...updates];
      const currentUpgrades = [...upgrades];
      [...currentUpdates, ...currentUpgrades].forEach(task => {
        if (task.status === 'completed') return;
        task.subtasks.forEach(st => {
          if (!st.done && !processedRef.current.has(st.id)) {
            freshUndone.push({ task, subtask: st, isUpdate: task.id.startsWith('SYS-UPDATE') });
          }
        });
      });

      if (freshUndone.length === 0) {
        clearInterval(timer);
        addLog({
          agent: 'ORCHESTRATOR',
          agentIcon: 'ri-trophy-line',
          taskId: 'ALL',
          action: 'TOUS LES SYSTÈMES SONT À JOUR ! 100% BIG FOUR ATTEINT.',
          type: 'milestone',
        });
        return;
      }

      const pick = freshUndone[Math.floor(Math.random() * freshUndone.length)];
      processedRef.current.add(pick.subtask.id);

      const updatedAll = (pick.isUpdate ? currentUpdates : currentUpgrades).map(task => {
        if (task.id !== pick.task.id) return task;
        const updatedSubtasks = task.subtasks.map(st =>
          st.id === pick.subtask.id ? { ...st, done: true } : st
        );
        const doneCount = updatedSubtasks.filter(s => s.done).length;
        const totalCount = updatedSubtasks.length;
        const newProgress = Math.round((doneCount / totalCount) * 100);
        const newStatus = newProgress >= 100 ? 'completed' as const : 'in_progress' as const;

        return { ...task, subtasks: updatedSubtasks, progress: newProgress, status: newStatus };
      });

      if (pick.isUpdate) {
        setUpdates(updatedAll as SystemTask[]);
      } else {
        setUpgrades(updatedAll as SystemTask[]);
      }

      const taskCompleted = updatedAll.find(t => t.id === pick.task.id);
      setTasksDone(prev => prev + 1);

      if (taskCompleted && taskCompleted.status === 'completed') {
        addLog({
          agent: pick.task.assignedAgent,
          agentIcon: pick.task.agentIcon,
          taskId: pick.task.id,
          action: `${pick.subtask.label} ✓ — ${pick.task.id} TERMINÉ ! ${pick.task.module}`,
          type: 'task_complete',
        });
      } else {
        addLog({
          agent: pick.task.assignedAgent,
          agentIcon: pick.task.agentIcon,
          taskId: pick.task.id,
          action: `${pick.subtask.label} ✓`,
          type: 'subtask_done',
        });
      }

      const newUpdates = pick.isUpdate ? updatedAll as SystemTask[] : currentUpdates;
      const newUpgrades = pick.isUpdate ? currentUpgrades : updatedAll as SystemTask[];
      onTasksUpdate(newUpdates, newUpgrades);
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, isPaused, launchPhase, speed, updates, upgrades, onTasksUpdate, addLog]);

  // Update totals
  useEffect(() => {
    setTasksTotal(totalSubtasks);
  }, [totalSubtasks]);

  // Handle activation
  const handleActivate = () => {
    setLaunchPhase('countdown');
    setCountdown(3);
    const cd = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(cd);
          setCountdown(null);
          onActivate();
          setLaunchPhase('animating');
          return null;
        }
        return prev - 1;
      });
    }, 700);
  };

  if (!isActive || launchPhase === 'idle' || launchPhase === 'countdown') {
    return (
      <div className="relative overflow-hidden bg-background-50 rounded-lg border-2 border-red-300 p-10 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/20 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-100/15 rounded-full translate-y-1/2" />
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-accent-100/10 rounded-full -translate-x-1/2" />

        <div className="relative">
          {launchPhase === 'countdown' && countdown !== null ? (
            <div className="space-y-6">
              <div className="w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-red-100 animate-pulse">
                <span className="text-6xl font-bold text-red-600 font-heading">{countdown}</span>
              </div>
              <p className="text-xl font-bold text-red-700 font-heading">Activation massive en cours...</p>
              <p className="text-sm text-foreground-500 font-body max-w-lg mx-auto">
                Tous les agents KOS reçoivent leurs ordres simultanément. Synchronisation des 18 agents en cours.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-2xl bg-red-100">
                <i className="ri-rocket-2-line text-5xl text-red-600"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground-950 font-heading mb-3">
                  KOS MASS SYSTEM UPGRADE COMMAND
                </h3>
                <p className="text-sm text-foreground-500 max-w-2xl mx-auto font-body leading-relaxed">
                  {massLaunchManifest.subtitle}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                {[
                  { label: 'Mises à jour', val: String(massLaunchManifest.totalSystemUpdates), icon: 'ri-refresh-line', color: 'primary' },
                  { label: 'Upgrades', val: String(massLaunchManifest.totalSystemUpgrades), icon: 'ri-arrow-up-circle-line', color: 'accent' },
                  { label: 'Agents', val: String(massLaunchManifest.totalAgents), icon: 'ri-team-line', color: 'secondary' },
                  { label: 'Sous-tâches', val: String(massLaunchManifest.totalSubtasks), icon: 'ri-list-check', color: 'primary' },
                  { label: 'Critiques', val: String(massLaunchManifest.criticalTasks), icon: 'ri-error-warning-line', color: 'red' },
                  { label: 'Score actuel', val: `${massLaunchManifest.currentScore}%`, icon: 'ri-dashboard-3-line', color: 'secondary' },
                ].map(s => (
                  <div key={s.label} className="p-3 rounded-xl bg-background-100 border border-background-200/70 text-center">
                    <div className="w-8 h-8 mx-auto mb-1.5 flex items-center justify-center rounded-lg bg-background-200/50">
                      <i className={`${s.icon} text-sm ${s.color === 'red' ? 'text-red-500' : `text-${s.color}-500`}`}></i>
                    </div>
                    <div className="text-lg font-bold text-foreground-950 font-heading">{s.val}</div>
                    <div className="text-[10px] text-foreground-400 font-body">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Agent roster */}
              <div className="max-w-3xl mx-auto">
                <p className="text-xs text-foreground-400 font-body mb-3">Agents en attente d&apos;activation :</p>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {unifiedAgentsForMassLaunch.map(a => (
                    <div
                      key={a.agent}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-background-100 border border-background-200/50 text-[11px] text-foreground-500 font-body"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      <i className={`${a.icon} text-foreground-400`}></i>
                      {a.agent.split(' ').slice(0, 3).join(' ')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch button */}
              <button
                onClick={handleActivate}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-red-600 text-white font-bold text-base hover:bg-red-700 transition-all duration-200 cursor-pointer whitespace-nowrap shadow-lg shadow-red-200 animate-pulse mt-2"
                type="button"
              >
                <i className="ri-rocket-2-line text-xl"></i>
                LANCER EN BLOC — 18 AGENTS KOS
              </button>

              <p className="text-[10px] text-foreground-400 font-body max-w-lg mx-auto">
                6 mises à jour système + 6 upgrades infrastructure + 6 automates sociaux. Lancement simultané. Exécution automatique. Zéro intervention manuelle.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-50 rounded-lg border-2 border-emerald-300 overflow-hidden">
      {/* Active Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20">
              <i className="ri-cpu-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                KOS MASS UPGRADE — EXÉCUTION EN BLOC
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              </h3>
              <p className="text-xs text-white/80 font-body">
                {isPaused ? '⏸️ PAUSÉ' : launchPhase === 'animating' ? 'Séquence de lancement...' : 'Exécution automatique en cours'} — {doneSubtasks}/{totalSubtasks} sous-tâches exécutées
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/15 rounded-full p-0.5">
              {SPEED_PRESETS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setSpeed(preset.value);
                    addLog({
                      agent: 'ORCHESTRATOR', agentIcon: 'ri-dashboard-3-line', taskId: 'ALL',
                      action: `Vitesse changée à ${preset.label}`,
                      type: 'speed_change',
                    });
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    speed === preset.value ? 'bg-white text-emerald-700 shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  type="button"
                >
                  <i className={`${preset.icon} text-xs`}></i>
                  {preset.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
              type="button"
            >
              <i className={`${isPaused ? 'ri-play-fill' : 'ri-pause-fill'} text-sm`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Dual Progress Dashboard */}
      <div className="bg-emerald-50/70 border-b border-emerald-200">
        {/* Global progress bar */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <i className="ri-trophy-line text-emerald-600"></i>
              <span className="text-sm font-bold text-emerald-800 font-heading">
                PROGRESSION GLOBALE — SCORE BIG FOUR
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-700 font-heading">{globalScore.toFixed(1)}%</span>
              <span className="text-xs text-emerald-500 font-body">/ 100%</span>
            </div>
          </div>
          <div className="w-full h-3 bg-emerald-200/60 rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-emerald-600 font-body">
            <span>{doneSubtasks} / {totalSubtasks} sous-tâches</span>
            <span>{completedTasks} / {allTasks.length} tâches complétées</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 px-6 pb-5">
          {[
            { label: 'Mises à jour', val: `${updates.filter(t => t.status === 'completed').length}/${updates.length}`, icon: 'ri-refresh-line', color: 'text-primary-600' },
            { label: 'Upgrades', val: `${upgrades.filter(t => t.status === 'completed').length}/${upgrades.length}`, icon: 'ri-arrow-up-circle-line', color: 'text-accent-600' },
            { label: 'Sous-tâches', val: `${doneSubtasks}/${totalSubtasks}`, icon: 'ri-list-check', color: 'text-emerald-600' },
            { label: 'Critiques', val: String(criticalCount), icon: 'ri-error-warning-line', color: 'text-red-500' },
            { label: 'Agents', val: '18/18', icon: 'ri-team-line', color: 'text-secondary-600' },
            { label: 'Social', val: '6/6 actifs', icon: 'ri-share-line', color: 'text-primary-600' },
            { label: 'Vitesse', val: `${speed}x`, icon: 'ri-flashlight-line', color: 'text-accent-600' },
            { label: 'Score', val: `${globalScore.toFixed(1)}%`, icon: 'ri-dashboard-3-line', color: 'text-emerald-600' },
          ].map((s, i) => (
            <div key={i} className="text-center p-2.5 rounded-lg bg-background-50 border border-emerald-200/50">
              <div className={`text-lg font-bold font-heading ${s.color}`}>{s.val}</div>
              <div className="text-[10px] text-foreground-400 font-body">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Status Cards */}
      <div className="px-6 py-5 border-b border-background-200/70">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* System Updates Column */}
          <div>
            <h4 className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <i className="ri-refresh-line"></i>
              MISES À JOUR SYSTÈME ({updates.filter(t => t.status === 'completed').length}/{updates.length})
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
              {updates.map(task => {
                const sevColor = task.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500';
                return (
                  <div key={task.id} className={`p-3 rounded-lg border transition-colors ${
                    task.status === 'completed' ? 'bg-emerald-50/60 border-emerald-200' :
                    task.status === 'in_progress' ? 'bg-primary-50/40 border-primary-200' :
                    'bg-background-50 border-background-200/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full ${sevColor} ${task.status === 'in_progress' ? 'animate-pulse' : ''}`}></span>
                      <span className="text-[10px] font-bold text-foreground-500 font-body">{task.id}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold font-body ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        task.status === 'in_progress' ? 'bg-primary-100 text-primary-700' :
                        'bg-background-100 text-foreground-500'
                      }`}>
                        {task.status === 'completed' ? 'TERMINÉ' : task.status === 'in_progress' ? 'EN COURS' : 'EN ATTENTE'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground-800 font-body leading-snug">{task.module}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${
                          task.status === 'completed' ? 'bg-emerald-500' : 'bg-primary-500'
                        }`} style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-foreground-400 font-body w-8 text-right">{task.progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Upgrades Column */}
          <div>
            <h4 className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <i className="ri-arrow-up-circle-line"></i>
              UPGRADES SYSTÈME ({upgrades.filter(t => t.status === 'completed').length}/{upgrades.length})
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
              {upgrades.map(task => {
                const sevColor = task.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500';
                return (
                  <div key={task.id} className={`p-3 rounded-lg border transition-colors ${
                    task.status === 'completed' ? 'bg-emerald-50/60 border-emerald-200' :
                    task.status === 'in_progress' ? 'bg-accent-50/40 border-accent-200' :
                    'bg-background-50 border-background-200/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full ${sevColor} ${task.status === 'in_progress' ? 'animate-pulse' : ''}`}></span>
                      <span className="text-[10px] font-bold text-foreground-500 font-body">{task.id}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold font-body ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        task.status === 'in_progress' ? 'bg-accent-100 text-accent-700' :
                        'bg-background-100 text-foreground-500'
                      }`}>
                        {task.status === 'completed' ? 'TERMINÉ' : task.status === 'in_progress' ? 'EN COURS' : 'EN ATTENTE'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground-800 font-body leading-snug">{task.module}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-background-200/70 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${
                          task.status === 'completed' ? 'bg-emerald-500' : 'bg-accent-500'
                        }`} style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-foreground-400 font-body w-8 text-right">{task.progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Live Log Feed */}
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin">
        <div className="divide-y divide-background-200/40">
          {logs.length === 0 && (
            <div className="px-6 py-16 text-center">
              <i className="ri-cpu-line text-4xl text-emerald-200 mb-3 block"></i>
              <p className="text-sm text-foreground-400 font-body">En attente du lancement de la séquence d&apos;exécution...</p>
            </div>
          )}
          {logs.map(log => (
            <div
              key={log.id}
              className={`px-6 py-3 flex items-start gap-3 transition-colors hover:bg-background-50 ${
                log.type === 'task_complete' ? 'bg-emerald-50/60' :
                log.type === 'milestone' ? 'bg-amber-50/50' :
                log.type === 'wave_complete' ? 'bg-primary-50/40' :
                log.type === 'agent_started' ? 'bg-accent-50/30' :
                log.type === 'speed_change' ? 'bg-secondary-50/40' : ''
              }`}
            >
              <span className="text-[10px] text-foreground-400 font-mono w-16 shrink-0 pt-0.5">{log.timestamp}</span>

              {log.type === 'task_complete' ? (
                <i className="ri-check-double-fill text-emerald-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'milestone' ? (
                <i className="ri-star-fill text-amber-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'wave_complete' ? (
                <i className="ri-flag-fill text-primary-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'agent_started' ? (
                <i className="ri-play-circle-fill text-accent-500 text-sm mt-0.5 shrink-0"></i>
              ) : log.type === 'speed_change' ? (
                <i className="ri-dashboard-3-line text-secondary-500 text-sm mt-0.5 shrink-0"></i>
              ) : (
                <i className={`${log.agentIcon} text-primary-500 text-sm mt-0.5 shrink-0`}></i>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-semibold font-body ${
                    log.type === 'task_complete' ? 'text-emerald-700' :
                    log.type === 'milestone' ? 'text-amber-700' :
                    log.type === 'wave_complete' ? 'text-primary-700' :
                    log.type === 'agent_started' ? 'text-accent-700' :
                    log.type === 'speed_change' ? 'text-secondary-700' :
                    'text-foreground-700'
                  }`}>
                    {log.agent}
                  </span>
                  {log.taskId !== 'ALL' && log.taskId !== 'SOCIAL' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-background-100 text-foreground-500 font-body">
                      {log.taskId}
                    </span>
                  )}
                  {log.type === 'task_complete' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 font-body animate-pulse">
                      TERMINÉ
                    </span>
                  )}
                  {log.type === 'wave_complete' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-100 text-primary-700 font-body">
                      VAGUE
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground-600 font-body">{log.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="border-t border-background-200/70 bg-background-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[10px] text-foreground-400 font-body">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            18 agents en mission 24/7
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            Vitesse {speed}x — {isPaused ? 'PAUSE' : 'ACTIF'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {doneSubtasks} actions exécutées
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
            Score : {globalScore.toFixed(1)}%
          </span>
        </div>
        <span className="text-[10px] text-emerald-600 font-body flex items-center gap-1">
          <i className="ri-refresh-line animate-spin"></i>
          KOS Mass Upgrade Engine — Live
        </span>
      </div>
    </div>
  );
}