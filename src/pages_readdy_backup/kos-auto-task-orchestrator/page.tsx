import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { supabase } from '@/lib/supabase';
import {
  KOS_TASKS as STATIC_TASKS,
  KOS_AUTOMATES,
  ENGINE_SUMMARIES,
  CATEGORY_MAP,
} from '@/mocks/autoTaskOrchestrator';
import type { task } from '@/mocks/autoTaskOrchestrator';

// ── Execution log type ──
interface ExecLog {
  id: string;
  timestamp: string;
  taskId: string;
  taskTitle: string;
  assignedAgent: string;
  priority: string;
  status: 'started' | 'completed' | 'failed' | 'blocked';
  detail: string;
  durationMs: number;
}

// ── Badge helpers ──
function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'P0': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'P0 — CRITIQUE', dot: 'bg-red-500' };
    case 'P1': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'P1 — HAUTE', dot: 'bg-amber-500' };
    case 'P2': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'P2 — MOYENNE', dot: 'bg-emerald-500' };
    case 'P3': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', label: 'P3 — LONG TERME', dot: 'bg-slate-400' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'blocked': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Bloqué', dot: 'bg-red-500' };
    case 'in_progress': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'En cours', dot: 'bg-amber-500' };
    case 'pending': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'En attente', dot: 'bg-slate-400' };
    case 'completed': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Terminé', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getAutomateStatusBadge(status: string) {
  switch (status) {
    case 'active': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Activé', dot: 'bg-emerald-500' };
    case 'partial': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Partiel', dot: 'bg-amber-500' };
    case 'gap': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'GAP', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

function getEngineStatusBadge(status: string) {
  switch (status) {
    case 'healthy': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Sain', dot: 'bg-emerald-500' };
    case 'degraded': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Dégradé', dot: 'bg-amber-500' };
    case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'Critique', dot: 'bg-red-500' };
    default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', label: 'N/A', dot: 'bg-gray-500' };
  }
}

type TabId = 'tasks' | 'automates' | 'engines' | 'logs';
type PriorityFilter = 'all' | 'P0' | 'P1' | 'P2' | 'P3';

// ── Deep clone helper ──
function cloneTasks(tasks: task[]): task[] {
  return tasks.map(t => ({
    ...t,
    deliverables: [...t.deliverables],
  }));
}

export default function autoTaskOrchestratorPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState<TabId>('tasks');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [expandedAutomate, setExpandedAutomate] = useState<string | null>(null);

  // ── Live state ──
  const [tasks, setTasks] = useState<task[]>(() => cloneTasks(STATIC_TASKS));
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [execProgress, setExecProgress] = useState(0);
  const [currentExecTask, setCurrentExecTask] = useState<string | null>(null);
  const [execLogs, setExecLogs] = useState<ExecLog[]>([]);
  const [lastExecMode, setLastExecMode] = useState<string | null>(null);
  const execAbortRef = useRef(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // ── Sync execution logs to Supabase ──
  const syncLogToSupabase = useCallback(async (log: ExecLog) => {
    try {
      await supabase.from('kos_execution_logs').insert({
        id: log.id,
        timestamp: log.timestamp,
        task_id: log.taskId,
        task_title: log.taskTitle,
        agent_name: log.assignedAgent,
        priority: log.priority,
        status: log.status,
        detail: log.detail,
        duration_ms: log.durationMs,
      });
    } catch {
      // silent — Supabase sync is best-effort
    }
  }, []);

  // ── Compute live stats ──
  const liveStats = useMemo(() => {
    const p0 = tasks.filter(t => t.priority === 'P0').length;
    const p1 = tasks.filter(t => t.priority === 'P1').length;
    const p2 = tasks.filter(t => t.priority === 'P2').length;
    const p3 = tasks.filter(t => t.priority === 'P3').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    return {
      totalTasks: tasks.length,
      p0Tasks: p0,
      p1Tasks: p1,
      p2Tasks: p2,
      p3Tasks: p3,
      blockedTasks: blocked,
      inProgressTasks: inProgress,
      pendingTasks: pending,
      completedTasks: completed,
      totalEstimatedHours: tasks.reduce((s, t) => s + t.estimatedHours, 0),
      totalAutomates: KOS_AUTOMATES.length,
      activeAutomates: KOS_AUTOMATES.filter(a => a.status === 'active').length,
      partialAutomates: KOS_AUTOMATES.filter(a => a.status === 'partial').length,
      gapAutomates: KOS_AUTOMATES.filter(a => a.status === 'gap').length,
      enginesWithTasks: ENGINE_SUMMARIES.length,
      criticalBlockers: ['LinkedIn MDP Approval'],
      globalProgress: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
    };
  }, [tasks]);

  const stats = liveStats;

  const filteredTasks = useMemo(() => {
    if (priorityFilter === 'all') return tasks;
    return tasks.filter(t => t.priority === priorityFilter);
  }, [tasks, priorityFilter]);

  const groupedTasks = useMemo(() => {
    const groups: Record<string, task[]> = {};
    ['P0', 'P1', 'P2', 'P3'].forEach(p => {
      groups[p] = filteredTasks.filter(t => t.priority === p);
    });
    return groups;
  }, [filteredTasks]);

  // ── Auto-scroll logs ──
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [execLogs]);

  // ── Push a log ──
  const pushLog = useCallback((log: ExecLog) => {
    setExecLogs(prev => [log, ...prev]);
    syncLogToSupabase(log);
  }, [syncLogToSupabase]);

  // ── Execute a single task ──
  const executeSingleTask = useCallback(async (task: task) => {
    if (executionState === 'running') return;

    execAbortRef.current = false;
    setExecutionState('running');
    setCurrentExecTask(task.id);
    setLastExecMode('single');
    setExecProgress(0);

    // If blocked, force to pending first
    if (task.status === 'blocked') {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'pending' as const, blockedBy: null } : t));
    }

    // Mark in_progress
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'in_progress' as const } : t));

    const startLog: ExecLog = {
      id: `exec-${task.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: task.id,
      taskTitle: task.title,
      assignedAgent: task.assignedAgent,
      priority: task.priority,
      status: 'started',
      detail: `Démarrage — ${task.priority} — Impact ${task.impact}/10 — ${task.estimatedHours}h estimées`,
      durationMs: 0,
    };
    pushLog(startLog);

    // Simulate execution (proportional to estimated hours)
    const duration = Math.min(task.estimatedHours * 200, 2500) * (0.6 + Math.random() * 0.8);
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      if (execAbortRef.current) break;
      await new Promise(r => setTimeout(r, duration / steps));
      setExecProgress(Math.round((i / steps) * 100));
    }

    if (!execAbortRef.current) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' as const } : t));
      setExecProgress(100);

      const doneLog: ExecLog = {
        id: `exec-${task.id}-done-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: task.id,
        taskTitle: task.title,
        assignedAgent: task.assignedAgent,
        priority: task.priority,
        status: 'completed',
        detail: `✓ Terminé — ${task.deliverables[0] || 'Tous les livrables générés'}`,
        durationMs: Math.round(duration),
      };
      pushLog(doneLog);
    }

    setExecutionState('completed');
    setCurrentExecTask(null);
    setTimeout(() => {
      if (!execAbortRef.current) {
        setExecutionState('idle');
        setExecProgress(0);
      }
    }, 4000);
  }, [executionState, pushLog]);

  // ── Execute all pending tasks (not blocked) ──
  const executeAllPending = useCallback(async () => {
    if (executionState === 'running') return;

    execAbortRef.current = false;
    setExecutionState('running');
    setLastExecMode('all');

    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const blockedTasks = tasks.filter(t => t.status === 'blocked');

    if (pendingTasks.length === 0) {
      setExecutionState('completed');
      setTimeout(() => setExecutionState('idle'), 3000);
      return;
    }

    // Log blocked tasks as skipped
    blockedTasks.forEach(bt => {
      const skipLog: ExecLog = {
        id: `exec-skip-${bt.id}-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: bt.id,
        taskTitle: bt.title,
        assignedAgent: bt.assignedAgent,
        priority: bt.priority,
        status: 'blocked',
        detail: `⛔ Ignoré — Bloqué par: ${bt.blockedBy || 'Dépendance externe'}`,
        durationMs: 0,
      };
      pushLog(skipLog);
    });

    const allLog: ExecLog = {
      id: `exec-all-start-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: 'ALL',
      taskTitle: `🚀 EXÉCUTION GLOBALE — ${pendingTasks.length} tâches en attente`,
      assignedAgent: 'KOS ORCHESTRATOR',
      priority: 'ALL',
      status: 'started',
      detail: `${pendingTasks.filter(t => t.priority === 'P0').length} P0, ${pendingTasks.filter(t => t.priority === 'P1').length} P1, ${pendingTasks.filter(t => t.priority === 'P2').length} P2, ${pendingTasks.filter(t => t.priority === 'P3').length} P3. ${blockedTasks.length} tâches bloquées ignorées.`,
      durationMs: 0,
    };
    pushLog(allLog);

    // Sort by priority P0 → P3
    const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
    const sorted = [...pendingTasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    let processed = 0;
    const total = sorted.length;

    for (const task of sorted) {
      if (execAbortRef.current) break;

      setCurrentExecTask(task.id);
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'in_progress' as const } : t));

      const startLog: ExecLog = {
        id: `exec-${task.id}-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: task.id,
        taskTitle: task.title,
        assignedAgent: task.assignedAgent,
        priority: task.priority,
        status: 'started',
        detail: `Démarrage — ${task.priority} — Impact ${task.impact}/10`,
        durationMs: 0,
      };
      pushLog(startLog);

      const duration = Math.min(task.estimatedHours * 120, 1800) * (0.5 + Math.random() * 0.8);
      const steps = 15;
      for (let i = 1; i <= steps; i++) {
        if (execAbortRef.current) break;
        await new Promise(r => setTimeout(r, duration / steps));
        setExecProgress(Math.round(((processed + i / steps) / total) * 100));
      }

      if (!execAbortRef.current) {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' as const } : t));

        const doneLog: ExecLog = {
          id: `exec-${task.id}-done-${Date.now()}`,
          timestamp: new Date().toISOString(),
          taskId: task.id,
          taskTitle: task.title,
          assignedAgent: task.assignedAgent,
          priority: task.priority,
          status: 'completed',
          detail: `✓ Terminé (${Math.round(duration / 1000)}s) — ${task.deliverables[0] || 'Livrables générés'}`,
          durationMs: Math.round(duration),
        };
        pushLog(doneLog);
      }

      processed++;
    }

    if (!execAbortRef.current) {
      const finalLog: ExecLog = {
        id: `exec-all-done-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: 'ALL',
        taskTitle: `✅ EXÉCUTION TERMINÉE — ${processed}/${total} tâches complétées`,
        assignedAgent: 'KOS ORCHESTRATOR',
        priority: 'ALL',
        status: 'completed',
        detail: `${processed} tâches exécutées avec succès. ${tasks.filter(t => t.status === 'blocked').length} tâches restent bloquées (LinkedIn MDP).`,
        durationMs: 0,
      };
      pushLog(finalLog);
    }

    setExecutionState('completed');
    setCurrentExecTask(null);
    setExecProgress(100);
    setTimeout(() => {
      if (!execAbortRef.current) {
        setExecutionState('idle');
        setExecProgress(0);
      }
    }, 6000);
  }, [executionState, tasks, pushLog]);

  // ── Execute by priority only ──
  const executeByPriority = useCallback(async (priority: 'P0' | 'P1' | 'P2' | 'P3') => {
    if (executionState === 'running') return;

    execAbortRef.current = false;
    setExecutionState('running');
    setLastExecMode(`priority-${priority}`);

    const priTasks = tasks.filter(t => t.priority === priority && t.status === 'pending');
    if (priTasks.length === 0) {
      setExecutionState('completed');
      setTimeout(() => setExecutionState('idle'), 3000);
      return;
    }

    const startLog: ExecLog = {
      id: `exec-pri-${priority}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: priority,
      taskTitle: `🚀 Exécution ${priority} — ${priTasks.length} tâches`,
      assignedAgent: 'KOS ORCHESTRATOR',
      priority,
      status: 'started',
      detail: `${priTasks.length} tâches ${priority} en attente d'exécution.`,
      durationMs: 0,
    };
    pushLog(startLog);

    let processed = 0;
    const total = priTasks.length;

    for (const task of priTasks) {
      if (execAbortRef.current) break;

      setCurrentExecTask(task.id);
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'in_progress' as const } : t));

      const tLog: ExecLog = {
        id: `exec-${task.id}-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: task.id,
        taskTitle: task.title,
        assignedAgent: task.assignedAgent,
        priority: task.priority,
        status: 'started',
        detail: `Démarrage — Impact ${task.impact}/10`,
        durationMs: 0,
      };
      pushLog(tLog);

      const duration = Math.min(task.estimatedHours * 150, 2000) * (0.5 + Math.random() * 0.7);
      const steps = 12;
      for (let i = 1; i <= steps; i++) {
        if (execAbortRef.current) break;
        await new Promise(r => setTimeout(r, duration / steps));
        setExecProgress(Math.round(((processed + i / steps) / total) * 100));
      }

      if (!execAbortRef.current) {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' as const } : t));

        const dLog: ExecLog = {
          id: `exec-${task.id}-done-${Date.now()}`,
          timestamp: new Date().toISOString(),
          taskId: task.id,
          taskTitle: task.title,
          assignedAgent: task.assignedAgent,
          priority: task.priority,
          status: 'completed',
          detail: `✓ Terminé — ${task.deliverables[0] || 'OK'}`,
          durationMs: Math.round(duration),
        };
        pushLog(dLog);
      }
      processed++;
    }

    if (!execAbortRef.current) {
      const doneLog: ExecLog = {
        id: `exec-pri-${priority}-done-${Date.now()}`,
        timestamp: new Date().toISOString(),
        taskId: priority,
        taskTitle: `✅ ${priority} TERMINÉ — ${processed} tâches`,
        assignedAgent: 'KOS ORCHESTRATOR',
        priority,
        status: 'completed',
        detail: `Toutes les tâches ${priority} non-bloquées ont été exécutées.`,
        durationMs: 0,
      };
      pushLog(doneLog);
    }

    setExecutionState('completed');
    setCurrentExecTask(null);
    setExecProgress(100);
    setTimeout(() => {
      if (!execAbortRef.current) {
        setExecutionState('idle');
        setExecProgress(0);
      }
    }, 5000);
  }, [executionState, tasks, pushLog]);

  // ── Abort execution ──
  const abortExecution = useCallback(() => {
    execAbortRef.current = true;
    setExecutionState('idle');
    setExecProgress(0);
    setCurrentExecTask(null);
    setTasks(prev => prev.map(t => t.status === 'in_progress' ? { ...t, status: 'pending' as const } : t));

    const abortLog: ExecLog = {
      id: `exec-abort-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: 'ABORT',
      taskTitle: '⏹ Exécution interrompue par l\'utilisateur',
      assignedAgent: 'KOS ORCHESTRATOR',
      priority: 'ALL',
      status: 'failed',
      detail: 'Toutes les tâches en cours sont revenues à "En attente".',
      durationMs: 0,
    };
    pushLog(abortLog);
  }, [pushLog]);

  // ── Reset all tasks ──
  const resetAllTasks = useCallback(() => {
    if (executionState === 'running') return;
    setTasks(cloneTasks(STATIC_TASKS));
    setExecLogs([]);
    setExecProgress(0);

    const resetLog: ExecLog = {
      id: `exec-reset-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: 'RESET',
      taskTitle: '🔄 Réinitialisation complète — Toutes les tâches remises à zéro',
      assignedAgent: 'KOS ORCHESTRATOR',
      priority: 'ALL',
      status: 'completed',
      detail: 'Les 25 tâches ont été réinitialisées à leur état initial.',
      durationMs: 0,
    };
    pushLog(resetLog);
  }, [executionState, pushLog]);

  // ── Force unblock a blocked task ──
  const forceUnblockTask = useCallback((task: task) => {
    if (executionState === 'running') return;
    if (task.status !== 'blocked') return;

    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'pending' as const, blockedBy: null } : t));

    const unblockLog: ExecLog = {
      id: `exec-unblock-${task.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      taskId: task.id,
      taskTitle: `🔓 ${task.title} — FORCÉ`,
      assignedAgent: 'KOS ORCHESTRATOR',
      priority: task.priority,
      status: 'completed',
      detail: `Blocage manuellement ignoré. Tâche débloquée et prête pour exécution. Raison initiale: ${task.blockedBy || 'Statut bloqué sans dépendance'}`,
      durationMs: 0,
    };
    pushLog(unblockLog);
  }, [executionState, pushLog]);

  // ── Tabs ──
  const tabs: { id: TabId; label: string; icon: string; count: string }[] = [
    { id: 'tasks', label: 'Tâches', icon: 'ri-list-check', count: String(stats.totalTasks) },
    { id: 'automates', label: 'Automates KOS', icon: 'ri-robot-line', count: String(stats.totalAutomates) },
    { id: 'engines', label: 'Moteurs', icon: 'ri-cpu-line', count: String(stats.enginesWithTasks) },
    { id: 'logs', label: 'Logs', icon: 'ri-terminal-box-line', count: String(execLogs.length) },
  ];

  const isRunning = executionState === 'running';

  return (
    <hubLayout hubId={47}>
      <SeoHead
        title="KOS Auto-Task Orchestrator™ — Exécution Live | KHEPRA EXPERTS"
        description="Hub central d'orchestration et d'exécution des tâches KOS. 25 tâches avec exécution live, progression temps réel. 16 automates KOS, 8 moteurs. Lancement global ou par priorité."
        keywords="KOS Auto-Task Orchestrator, exécution tâches, automatisation KOS, edge functions, diagnostic migration, content automation, SEO audit, KHEPRA EXPERTS"
        canonicalPath="/kos-auto-task-orchestrator"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20technological%20command%20center%20with%20multiple%20interconnected%20task%20flow%20lines%20and%20progress%20indicators%20radiating%20from%20a%20central%20hub%20node%2C%20glowing%20emerald%20green%20and%20warm%20amber%20data%20streams%20representing%20task%20orchestration%20and%20workflow%20automation%20across%20distributed%20systems%2C%20sophisticated%20corporate%20operations%20center%20aesthetic%20with%20precise%20geometric%20task%20tracking%20patterns%20and%20layered%20complexity%20no%20text%20no%20human%20figures%20premium%20enterprise%20orchestration%20visualization&width=1920&height=600&seq=kos-task-orchestrator-hero-v2&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-18"
            width="1920"
            height="600"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/60 via-foreground-950/80 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
              <i className="ri-cpu-line text-emerald-400 text-sm" />
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                KOS Auto-Task Orchestrator™ — Exécution Live
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Chaque tâche a son automate.
              <span className="block text-emerald-400 mt-2">Exécution en un clic.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">{stats.totalTasks} tâches</strong> ·{' '}
              <strong className="text-emerald-400">{stats.completedTasks} complétées</strong> ·{' '}
              <strong className="text-amber-400">{stats.inProgressTasks} en cours</strong> ·{' '}
              <strong className="text-red-400">{stats.blockedTasks} bloquées</strong>
            </p>

            {/* ── EXECUTION CONTROLS ── */}
            <div className="flex flex-col items-center gap-4">
              {/* Progress bar */}
              {(isRunning || executionState === 'completed') && (
                <div className="w-full max-w-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300 font-medium">
                      {isRunning ? 'Exécution en cours...' : 'Exécution terminée'}
                    </span>
                    <span className="text-sm font-bold text-emerald-400">{execProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${executionState === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-amber-400'}`}
                      style={{ width: `${execProgress}%` }}
                    />
                  </div>
                  {currentExecTask && (
                    <p className="text-xs text-gray-400 mt-1.5 text-center">
                      Tâche en cours : <span className="text-white font-medium">{tasks.find(t => t.id === currentExecTask)?.title || currentExecTask}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                {/* Execute All Pending */}
                <button
                  onClick={executeAllPending}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <i className="ri-play-circle-fill text-lg" />
                  {isRunning ? 'En cours...' : 'Exécuter TOUT'}
                </button>

                {/* Execute P0 */}
                <button
                  onClick={() => executeByPriority('P0')}
                  disabled={isRunning || tasks.filter(t => t.priority === 'P0' && t.status === 'pending').length === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-play-fill" />
                  P0 Critiques ({tasks.filter(t => t.priority === 'P0' && t.status === 'pending').length})
                </button>

                {/* Execute P1 */}
                <button
                  onClick={() => executeByPriority('P1')}
                  disabled={isRunning || tasks.filter(t => t.priority === 'P1' && t.status === 'pending').length === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-600 text-white font-bold text-sm hover:bg-amber-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-play-fill" />
                  P1 Haute ({tasks.filter(t => t.priority === 'P1' && t.status === 'pending').length})
                </button>

                {/* Abort / Reset */}
                {isRunning ? (
                  <button
                    onClick={abortExecution}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer backdrop-blur-sm"
                  >
                    <i className="ri-stop-circle-fill text-lg" />
                    Stopper
                  </button>
                ) : (
                  <button
                    onClick={resetAllTasks}
                    disabled={isRunning}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer backdrop-blur-sm"
                  >
                    <i className="ri-refresh-line" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Mini stats pills */}
              <div className="flex flex-wrap justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs text-red-300 font-semibold">{stats.p0Tasks} P0</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-amber-300 font-semibold">{stats.p1Tasks} P1</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-300 font-semibold">{stats.completedTasks} Terminées</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <i className="ri-lock-line text-red-400 text-xs" />
                  <span className="text-xs text-red-300 font-semibold">{stats.blockedTasks} Bloquées</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Blockers Alert */}
      {stats.blockedTasks > 0 && (
        <section className="py-4 bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <i className="ri-error-warning-fill text-red-600 text-sm" />
                </div>
                <span className="text-sm font-bold text-red-800">Blocages Critiques ({stats.blockedTasks} tâches) :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.criticalBlockers.map((blocker, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-red-200 text-red-700 whitespace-nowrap">
                    <i className="ri-lock-line text-red-500 text-xs" />
                    {blocker}
                  </span>
                ))}
                <span className="text-xs text-red-500 font-medium">
                  Ces tâches seront ignorées lors de l'exécution automatique.
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Row */}
      <section className="py-8 bg-white border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Total Tâches', value: String(stats.totalTasks), icon: 'ri-list-check', color: '#4F46E5' },
              { label: 'P0 Critiques', value: String(stats.p0Tasks), icon: 'ri-error-warning-line', color: '#C2410C' },
              { label: 'P1 Haute', value: String(stats.p1Tasks), icon: 'ri-alert-line', color: '#E8943A' },
              { label: 'Bloquées', value: String(stats.blockedTasks), icon: 'ri-lock-line', color: '#8B3040' },
              { label: 'En cours', value: String(stats.inProgressTasks), icon: 'ri-loader-4-line', color: '#E8C547' },
              { label: 'Complétées', value: String(stats.completedTasks), icon: 'ri-check-double-line', color: '#86BC25' },
              { label: 'En attente', value: String(stats.pendingTasks), icon: 'ri-time-line', color: '#6B7280' },
              { label: 'Automates', value: String(stats.totalAutomates), icon: 'ri-robot-line', color: '#0D7B5F' },
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

          {/* Global progress */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-bold text-foreground-500 whitespace-nowrap">Progression Globale</span>
            <div className="flex-1 h-2.5 rounded-full bg-background-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${stats.globalProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-foreground-700 whitespace-nowrap">{stats.globalProgress}%</span>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map(tab => (
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
      </section>

      {/* === TAB: TASKS === */}
      {activeTab === 'tasks' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-background-50 rounded-2xl border border-background-200 p-4">
              <span className="text-sm font-bold text-foreground-700">
                {stats.pendingTasks} tâches en attente · {stats.blockedTasks} bloquées
              </span>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={executeAllPending}
                  disabled={isRunning || stats.pendingTasks === 0}
                  className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-play-fill mr-1" />
                  Tout exécuter ({stats.pendingTasks})
                </button>
                <button
                  onClick={() => executeByPriority('P0')}
                  disabled={isRunning || tasks.filter(t => t.priority === 'P0' && t.status === 'pending').length === 0}
                  className="px-3 py-2 rounded-full bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  P0 uniquement
                </button>
                <button
                  onClick={() => executeByPriority('P1')}
                  disabled={isRunning || tasks.filter(t => t.priority === 'P1' && t.status === 'pending').length === 0}
                  className="px-3 py-2 rounded-full bg-amber-100 text-amber-700 text-xs font-bold hover:bg-amber-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  P1 uniquement
                </button>
                {isRunning && (
                  <button
                    onClick={abortExecution}
                    className="px-3 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-stop-fill mr-1" />
                    Stopper
                  </button>
                )}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {(['all', 'P0', 'P1', 'P2', 'P3'] as const).map(f => {
                const counts: Record<string, number> = {
                  all: stats.totalTasks,
                  P0: stats.p0Tasks,
                  P1: stats.p1Tasks,
                  P2: stats.p2Tasks,
                  P3: stats.p3Tasks,
                };
                const isActive = priorityFilter === f;
                let activeClass = '';
                if (isActive) {
                  if (f === 'all') activeClass = 'bg-foreground-950 text-white';
                  else if (f === 'P0') activeClass = 'bg-red-600 text-white';
                  else if (f === 'P1') activeClass = 'bg-amber-600 text-white';
                  else if (f === 'P2') activeClass = 'bg-emerald-600 text-white';
                  else activeClass = 'bg-slate-600 text-white';
                }
                return (
                  <button
                    key={f}
                    onClick={() => setPriorityFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                      isActive ? activeClass : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
                    }`}
                  >
                    {f === 'all' ? `Toutes (${counts.all})` : `${f} (${counts[f]})`}
                  </button>
                );
              })}
            </div>

            {/* Tasks by Priority Group */}
            {(['P0', 'P1', 'P2', 'P3'] as const).map(priority => {
              const groupTasks = groupedTasks[priority];
              if (groupTasks.length === 0) return null;
              const priBadge = getPriorityBadge(priority);
              const pendingHere = groupTasks.filter(t => t.status === 'pending').length;
              return (
                <div key={priority} className="mb-10">
                  <div className={`flex items-center gap-3 mb-5 px-4 py-2.5 rounded-2xl border ${priBadge.bg} ${priBadge.border}`}>
                    <span className={`w-3 h-3 rounded-full ${priBadge.dot}`} />
                    <h3 className="font-heading text-lg font-bold text-foreground-950">{priBadge.label}</h3>
                    <span className="text-sm text-foreground-500 ml-auto">{groupTasks.length} tâches · {groupTasks.reduce((s, t) => s + t.estimatedHours, 0)}h</span>
                    {pendingHere > 0 && (
                      <button
                        onClick={() => executeByPriority(priority)}
                        disabled={isRunning}
                        className="px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer whitespace-nowrap disabled:opacity-40 transition-all"
                        style={{ backgroundColor: priBadge.dot === 'bg-red-500' ? '#C2410C' : priBadge.dot === 'bg-amber-500' ? '#E8943A' : priBadge.dot === 'bg-emerald-500' ? '#0D7B5F' : '#6B7280', color: '#fff' }}
                      >
                        <i className="ri-play-fill mr-0.5 text-[10px]" />
                        Exécuter ({pendingHere})
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {groupTasks.map(task => {
                      const statusBadge = getStatusBadge(task.status);
                      const isExpanded = expandedTask === task.id;
                      const cat = CATEGORY_MAP[task.category];
                      const isThisRunning = currentExecTask === task.id;
                      return (
                        <div
                          key={task.id}
                          className={`rounded-2xl border transition-all duration-300 ${
                            isExpanded ? 'border-foreground-300 bg-white shadow-lg' : isThisRunning ? 'border-amber-300 bg-amber-50/40 shadow-md ring-1 ring-amber-300' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                          }`}
                        >
                          <button
                            onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                            className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                          >
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isThisRunning ? 'animate-pulse' : ''}`} style={{ backgroundColor: `${task.color}15` }}>
                                <i className={`${task.icon} text-xl`} style={{ color: task.color }} />
                              </div>
                              <span className="text-lg font-bold font-heading mt-1.5" style={{ color: task.color }}>{task.id}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <h3 className="font-heading text-base font-bold text-foreground-950">{task.title}</h3>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                                  {statusBadge.label}
                                </span>
                                {isThisRunning && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 border border-amber-200 text-amber-700 animate-pulse whitespace-nowrap">
                                    <i className="ri-loader-4-line animate-spin" />
                                    Exécution...
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-foreground-600 leading-relaxed line-clamp-2">{task.description}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                                <span className="flex items-center gap-1 text-foreground-400"><i className="ri-time-line" />{task.estimatedHours}h</span>
                                <span className="flex items-center gap-1 text-foreground-400"><i className="ri-robot-line" />{task.assignedAgent}</span>
                                {cat && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{cat.label}</span>
                                )}
                                <span className="flex items-center gap-1"><span className="text-foreground-400">Impact</span><span className="font-bold" style={{ color: task.color }}>{task.impact}/10</span></span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 pt-1 flex flex-col items-center gap-2">
                              <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                              {task.status === 'pending' && !isRunning && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); executeSingleTask(task); }}
                                  className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center cursor-pointer transition-all"
                                  title="Exécuter cette tâche"
                                >
                                  <i className="ri-play-fill text-sm" />
                                </button>
                              )}
                              {task.status === 'blocked' && !isRunning && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); executeSingleTask(task); }}
                                  className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center cursor-pointer transition-all"
                                  title="Force exécution — débloquer et exécuter"
                                >
                                  <i className="ri-lock-unlock-line text-sm" />
                                </button>
                              )}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-background-200 pt-4">
                              <p className="text-sm text-foreground-600 leading-relaxed mb-4">{task.description}</p>

                              {task.blockedBy && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <i className="ri-lock-line text-red-500 text-sm" />
                                    <span className="text-xs font-bold text-red-700">Bloqué par</span>
                                  </div>
                                  <p className="text-sm text-red-600">{task.blockedBy}</p>
                                </div>
                              )}

                              {/* Execute / Unblock button in expanded view */}
                              {task.status === 'pending' && !isRunning && (
                                <div className="mb-4">
                                  <button
                                    onClick={() => executeSingleTask(task)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all whitespace-nowrap cursor-pointer"
                                  >
                                    <i className="ri-play-fill" />
                                    Exécuter cette tâche
                                  </button>
                                </div>
                              )}
                              {task.status === 'blocked' && !isRunning && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                  <button
                                    onClick={() => forceUnblockTask(task)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-all whitespace-nowrap cursor-pointer"
                                    title="Forcer le déblocage et passer la tâche en 'En attente'"
                                  >
                                    <i className="ri-lock-unlock-line" />
                                    Débloquer (force)
                                  </button>
                                  <button
                                    onClick={() => executeSingleTask(task)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all whitespace-nowrap cursor-pointer"
                                    title="Exécuter directement malgré le blocage"
                                  >
                                    <i className="ri-play-fill" />
                                    Force exécution
                                  </button>
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Livrables</h5>
                                  <ul className="space-y-1.5">
                                    {task.deliverables.map((d, j) => (
                                      <li key={j} className="flex items-start gap-2 text-xs text-foreground-600">
                                        <i className={`${task.status === 'completed' ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-circle-line text-emerald-500'} flex-shrink-0 mt-px`} />
                                        {d}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-2">Détails</h5>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-background-50">
                                      <span className="text-foreground-500">Agent assigné</span>
                                      <span className="font-bold text-foreground-800">{task.assignedAgent}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-background-50">
                                      <span className="text-foreground-500">Dashboard</span>
                                      <a href={task.dashboardPath} className="font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                                        {task.dashboardPath} <i className="ri-external-link-line text-xs" />
                                      </a>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-background-50">
                                      <span className="text-foreground-500">Impact / Effort</span>
                                      <span className="font-bold text-foreground-800">{task.impact}/10 · {task.effort}/10</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* === TAB: AUTOMATES === */}
      {activeTab === 'automates' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {stats.totalAutomates} Automates KOS — Assignation des Tâches
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                {stats.activeAutomates} activés · {stats.partialAutomates} partiels · {stats.gapAutomates} en GAP
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { label: 'Activés', value: String(stats.activeAutomates), icon: 'ri-checkbox-circle-line', color: '#86BC25' },
                { label: 'Partiels', value: String(stats.partialAutomates), icon: 'ri-time-line', color: '#E8C547' },
                { label: 'GAP', value: String(stats.gapAutomates), icon: 'ri-error-warning-line', color: '#C2410C' },
                { label: 'Tâches totales', value: String(stats.totalTasks), icon: 'ri-list-check', color: '#4F46E5' },
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

            <div className="space-y-4">
              {KOS_AUTOMATES.map(automate => {
                const badge = getAutomateStatusBadge(automate.status);
                const isExpanded = expandedAutomate === automate.id;
                const automateTasks = tasks.filter(t => t.agentId === automate.id);
                const completedCount = automateTasks.filter(t => t.status === 'completed').length;
                const progressPct = automate.taskCount > 0 ? Math.round((completedCount / automate.taskCount) * 100) : 0;
                return (
                  <div
                    key={automate.id}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedAutomate(isExpanded ? null : automate.id)}
                      className="w-full p-5 text-left flex items-start gap-4 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${automate.color}15` }}>
                        <i className={`${automate.icon} text-lg`} style={{ color: automate.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base font-bold text-foreground-950">{automate.name}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${badge.bg} ${badge.border} ${badge.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-500 line-clamp-1">{automate.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="text-foreground-400">{automate.engine}</span>
                          <span className="text-foreground-400"><i className="ri-list-check mr-1" />{completedCount}/{automate.taskCount} tâches</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-background-200 overflow-hidden mt-2">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progressPct}%`, backgroundColor: automate.color }} />
                        </div>
                      </div>
                      <div className="flex-shrink-0 pt-1">
                        <i className={`ri-${isExpanded ? 'subtract' : 'add'}-line text-foreground-400 text-lg`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200 pt-4">
                        <div className="mb-4">
                          <a href={automate.enginePath} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                            <i className="ri-external-link-line" /> Ouvrir le dashboard {automate.engine}
                          </a>
                        </div>

                        <h5 className="text-xs font-bold text-foreground-400 uppercase tracking-wider mb-3">Tâches assignées ({automateTasks.length})</h5>
                        {automateTasks.length === 0 ? (
                          <p className="text-xs text-foreground-400 italic">Aucune tâche assignée à cet automate.</p>
                        ) : (
                          <div className="space-y-2">
                            {automateTasks.map(task => {
                              const taskStatus = getStatusBadge(task.status);
                              const priBadge = getPriorityBadge(task.priority);
                              return (
                                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                                  <div className="flex flex-col items-center flex-shrink-0">
                                    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${priBadge.bg} ${priBadge.border} ${priBadge.text}`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-foreground-800">{task.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-foreground-400">{task.estimatedHours}h</span>
                                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${taskStatus.bg} ${taskStatus.border} ${taskStatus.text}`}>
                                        {taskStatus.label}
                                      </span>
                                    </div>
                                  </div>
                                  {task.status === 'pending' && !isRunning && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); executeSingleTask(task); }}
                                      className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center cursor-pointer flex-shrink-0 transition-all"
                                    >
                                      <i className="ri-play-fill text-xs" />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* === TAB: ENGINES === */}
      {activeTab === 'engines' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-4">
                {stats.enginesWithTasks} Moteurs KOS — Répartition des Tâches
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">Vue consolidée par moteur avec progression live.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ENGINE_SUMMARIES.map(engine => {
                const engineTasks = tasks.filter(t => {
                  const autom = KOS_AUTOMATES.find(a => a.id === t.agentId);
                  return autom?.enginePath === engine.path || t.dashboardPath === engine.path;
                });
                const compTasks = engineTasks.filter(t => t.status === 'completed').length;
                const enginePct = engine.totalTasks > 0 ? Math.round((compTasks / engine.totalTasks) * 100) : 0;
                const dynStatus = engineTasks.filter(t => t.status === 'blocked').length > 0 ? 'critical' : compTasks === engine.totalTasks ? 'healthy' : engine.status;
                const engStatus = getEngineStatusBadge(dynStatus);
                return (
                  <a
                    key={engine.id}
                    href={engine.path}
                    className="rounded-2xl border border-background-200 bg-white p-5 hover:shadow-lg transition-all cursor-pointer block"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${engine.color}15` }}>
                          <i className={`${engine.icon} text-lg`} style={{ color: engine.color }} />
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground-950">{engine.name}</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${engStatus.bg} ${engStatus.border} ${engStatus.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${engStatus.dot}`} />
                        {engStatus.label}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground-500">Progression</span>
                        <span className="font-bold text-foreground-700">{compTasks}/{engine.totalTasks} tâches</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-background-200 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${enginePct}%`, backgroundColor: engine.color }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {engineTasks.filter(t => t.priority === 'P0' && t.status !== 'completed').length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold">
                          {engineTasks.filter(t => t.priority === 'P0' && t.status !== 'completed').length} P0
                        </span>
                      )}
                      {engineTasks.filter(t => t.priority === 'P1' && t.status !== 'completed').length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                          {engineTasks.filter(t => t.priority === 'P1' && t.status !== 'completed').length} P1
                        </span>
                      )}
                      <span className="text-foreground-400 ml-auto">Voir détails <i className="ri-arrow-right-line" /></span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Blockers Summary */}
            <div className="mt-10 rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 mb-4">
                  <i className="ri-lock-line text-red-400 text-sm" />
                  <span className="text-sm font-semibold text-red-300 uppercase tracking-wider">Blocages Critiques</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-4">1 blocage empêche l'automatisation complète</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-5 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <i className="ri-key-line text-red-400 text-lg" />
                      </div>
                      <div>
                        <h4 className="font-heading text-base font-bold text-white">LinkedIn MDP Approval</h4>
                        <p className="text-xs text-gray-400">Clé API manquante</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      Bloque 2 tâches (P0-2, P2-6). Sans MDP, pas de Company Page API, pas d'automatisation sociale.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Company Page API', 'Social Auto-Posting'].map(item => (
                        <span key={item} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/20 text-red-300 whitespace-nowrap">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/15 border border-emerald-400/20 p-5 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <i className="ri-check-double-line text-emerald-400 text-lg" />
                      </div>
                      <div>
                        <h4 className="font-heading text-base font-bold text-white">Tâches exécutables</h4>
                        <p className="text-xs text-gray-400">Prêtes pour exécution</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {stats.pendingTasks} tâches non-bloquées peuvent être exécutées immédiatement. Utilise le bouton « Exécuter TOUT » dans l'onglet Tâches.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Edge Functions', 'Content', 'Diagnostics', 'SEO/GEO', 'Chartes'].map(item => (
                        <span key={item} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 whitespace-nowrap">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === TAB: LOGS === */}
      {activeTab === 'logs' && (
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950">Journal d'Exécution</h2>
                <p className="text-sm text-foreground-500 mt-1">{execLogs.length} entrées — synchronisées avec Supabase</p>
              </div>
              <button
                onClick={() => setExecLogs([])}
                className="px-4 py-2 rounded-full bg-background-50 border border-background-200 text-xs font-bold text-foreground-500 hover:border-foreground-300 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-delete-bin-line mr-1" />
                Vider
              </button>
            </div>

            {execLogs.length === 0 ? (
              <div className="rounded-3xl bg-background-50 border border-background-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background-200 flex items-center justify-center">
                  <i className="ri-terminal-box-line text-2xl text-foreground-400" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-700 mb-2">Aucun log d'exécution</h3>
                <p className="text-sm text-foreground-500 max-w-md mx-auto">
                  Lancez l'exécution d'une tâche ou du lot complet depuis l'onglet <strong>Tâches</strong> pour voir les logs apparaître ici en temps réel.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto rounded-2xl bg-foreground-950 p-4">
                {execLogs.map(log => {
                  const isStart = log.status === 'started';
                  const isDone = log.status === 'completed';
                  const isBlocked = log.status === 'blocked';
                  const isFailed = log.status === 'failed';
                  return (
                    <div
                      key={log.id}
                      className={`px-3 py-2 rounded-lg font-mono text-xs flex items-start gap-2 ${
                        isStart ? 'bg-amber-500/10 border border-amber-500/20' :
                        isDone ? 'bg-emerald-500/10 border border-emerald-500/20' :
                        isBlocked ? 'bg-red-500/10 border border-red-500/20' :
                        isFailed ? 'bg-gray-500/10 border border-gray-500/20' :
                        'bg-white/5 border border-white/10'
                      }`}
                    >
                      <span className={`flex-shrink-0 mt-0.5 ${isStart ? 'text-amber-400' : isDone ? 'text-emerald-400' : isBlocked ? 'text-red-400' : isFailed ? 'text-gray-400' : 'text-gray-500'}`}>
                        <i className={`${isStart ? 'ri-play-circle-line' : isDone ? 'ri-checkbox-circle-fill' : isBlocked ? 'ri-lock-line' : isFailed ? 'ri-close-circle-line' : 'ri-information-line'} text-xs`} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString('fr-FR')}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            log.priority === 'P0' ? 'bg-red-500/30 text-red-300' :
                            log.priority === 'P1' ? 'bg-amber-500/30 text-amber-300' :
                            log.priority === 'P2' ? 'bg-emerald-500/30 text-emerald-300' :
                            log.priority === 'P3' ? 'bg-slate-500/30 text-slate-300' :
                            'bg-white/10 text-gray-300'
                          }`}>{log.priority}</span>
                          <span className={`font-bold ${isStart ? 'text-amber-200' : isDone ? 'text-emerald-200' : isBlocked ? 'text-red-200' : 'text-gray-200'}`}>{log.taskTitle}</span>
                        </div>
                        <p className="text-gray-400 mt-0.5">{log.detail}</p>
                        {log.durationMs > 0 && (
                          <span className="text-[9px] text-gray-500">Durée: {Math.round(log.durationMs / 1000)}s</span>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={logsEndRef} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Cross-link to all KOS Engines */}
      <section className="py-12 sm:py-16 bg-white border-t border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-2">
              Écosystème KOS Complet — 11 Moteurs
            </h2>
            <p className="text-foreground-600">Tous les moteurs autonomes interconnectés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Agents Experts', path: '/agents-experts', icon: 'ri-robot-line', color: '#86BC25' },
              { label: 'Unified Autopilot', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#0D7B5F' },
              { label: 'Orchestrator Engine', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#4F46E5' },
              { label: 'Quality System', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040' },
              { label: 'Task Orchestrator', path: '/kos-auto-task-orchestrator', icon: 'ri-cpu-line', color: '#4F46E5' },
            ].map(link => (
              <a
                key={link.path}
                href={link.path}
                className={`rounded-xl border border-background-200 bg-background-50 p-4 text-center hover:shadow-md hover:border-foreground-200 transition-all cursor-pointer block ${
                  link.path === '/kos-auto-task-orchestrator' ? 'ring-2 ring-emerald-400 bg-emerald-50/40' : ''
                }`}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${link.color}15` }}>
                  <i className={`${link.icon} text-lg`} style={{ color: link.color }} />
                </div>
                <span className="text-sm font-bold text-foreground-800">{link.label}</span>
                {link.path === '/kos-auto-task-orchestrator' && (
                  <span className="block text-[10px] text-emerald-600 font-bold mt-1">Vous êtes ici</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



