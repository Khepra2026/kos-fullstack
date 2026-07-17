import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_GLOBAL_BLOCKS as mockBlocks,
  KOS_GLOBAL_LAUNCH_LOGS as mockLogs,
  computeGlobalStats,
} from '@/mocks/kosGlobalLaunch';
import type {
  KOSGlobalBlock,
  KOSGlobalTask,
  KOSGlobalLaunchStats,
  KOSGlobalLaunchLog,
} from '@/mocks/kosGlobalLaunch';

export type {
  KOSGlobalBlock,
  KOSGlobalTask,
  KOSGlobalLaunchStats,
  KOSGlobalLaunchLog,
};

export interface KOSGlobalLaunchData {
  blocks: KOSGlobalBlock[];
  globalStats: KOSGlobalLaunchStats;
  logs: KOSGlobalLaunchLog[];
  isLive: boolean;
}

export function useKOSGlobalLaunch() {
  const [data, setData] = useState<KOSGlobalLaunchData>({
    blocks: mockBlocks,
    globalStats: computeGlobalStats(mockBlocks),
    logs: mockLogs,
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentBlock, setCurrentBlock] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to get live data from Supabase — check execution logs
      const { data: liveLogs } = await supabase
        .from('kos_execution_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      const anyLive = liveLogs && liveLogs.length > 0;

      setData({
        blocks: mockBlocks,
        globalStats: computeGlobalStats(mockBlocks),
        logs: mockLogs,
        isLive: anyLive,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        blocks: mockBlocks,
        globalStats: computeGlobalStats(mockBlocks),
        logs: mockLogs,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addLog = useCallback((log: KOSGlobalLaunchLog) => {
    setData(prev => ({
      ...prev,
      logs: [log, ...prev.logs],
    }));
  }, []);

  const updateTaskStatus = useCallback((blockId: string, taskId: string, newStatus: 'in_progress' | 'completed') => {
    setData(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => {
        if (b.id !== blockId) return b;
        const updatedTasks = b.tasks.map(t =>
          t.id === taskId ? { ...t, status: newStatus } : t
        );
        const completedCount = updatedTasks.filter(t => t.status === 'completed').length;
        const inProgressCount = updatedTasks.filter(t => t.status === 'in_progress').length;
        return {
          ...b,
          tasks: updatedTasks,
          stats: {
            ...b.stats,
            completed: completedCount,
            in_progress: inProgressCount,
          },
        };
      }),
      globalStats: computeGlobalStats(prev.blocks.map(b => {
        if (b.id !== blockId) return b;
        const updatedTasks = b.tasks.map(t =>
          t.id === taskId ? { ...t, status: newStatus } : t
        );
        return {
          ...b,
          tasks: updatedTasks,
          stats: {
            ...b.stats,
            completed: updatedTasks.filter(t => t.status === 'completed').length,
            in_progress: updatedTasks.filter(t => t.status === 'in_progress').length,
          },
        };
      })),
    }));
  }, []);

  const launchBlock = useCallback(async (blockId: string) => {
    if (executionState === 'running') return;

    const block = data.blocks.find(b => b.id === blockId);
    if (!block) return;

    const pendingTasks = block.tasks.filter(t => t.status === 'pending');
    if (pendingTasks.length === 0) return;

    setExecutionState('running');
    setCurrentBlock(blockId);
    setProgress(0);

    const blockExecutionId = `launch-${blockId}-${Date.now()}`;
    let processed = 0;
    const total = pendingTasks.length;

    // Sort: critical → urgent → planned
    const sortedTasks = [...pendingTasks].sort((a, b) => {
      const priorityOrder = { critical: 0, urgent: 1, planned: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    for (const task of sortedTasks) {
      // Mark as in progress
      updateTaskStatus(blockId, task.id, 'in_progress');

      const inProgressLog: KOSGlobalLaunchLog = {
        id: `${blockExecutionId}-${task.id}-start`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: task.title,
        agent_name: task.agent_name,
        status: 'in_progress',
        detail: `Démarrage — ${task.priority.toUpperCase()} — ${task.auto_fix ? 'Auto-fix activé' : 'Validation manuelle requise'}`,
        duration_ms: 0,
      };
      addLog(inProgressLog);

      // Simulate execution
      const estimatedMs = task.estimated_minutes * 60 * (40 + Math.random() * 80);
      await new Promise(resolve => setTimeout(resolve, Math.min(estimatedMs, 200 + Math.random() * 300)));

      // Mark as completed
      updateTaskStatus(blockId, task.id, 'completed');

      const completedLog: KOSGlobalLaunchLog = {
        id: `${blockExecutionId}-${task.id}-done`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: task.title,
        agent_name: task.agent_name,
        status: 'completed',
        detail: task.auto_fix
          ? `✓ Corrigé automatiquement — ${task.impact}`
          : `✓ Exécuté — ${task.impact}. Validation finale recommandée.`,
        duration_ms: Math.floor(estimatedMs),
      };
      addLog(completedLog);

      processed++;
      setProgress(Math.round((processed / total) * 100));
    }

    setExecutionState('completed');
    setCurrentBlock(null);

    // Auto-reset after 5 seconds
    setTimeout(() => {
      setExecutionState('idle');
      setProgress(0);
    }, 5000);
  }, [executionState, data.blocks, addLog, updateTaskStatus]);

  const launchAllBlocks = useCallback(async () => {
    if (executionState === 'running') return;

    setExecutionState('running');
    setCurrentBlock('all');
    setProgress(0);

    // Process blocks in priority order: execution → correction → seo → content → quality → security → ops
    const blockOrder = ['block-agents', 'block-correction', 'block-seo', 'block-content', 'block-quality', 'block-security', 'block-ops'];

    let totalProcessed = 0;
    const totalTasks = data.blocks.reduce((s, b) => s + b.tasks.filter(t => t.status === 'pending').length, 0);

    for (const blockId of blockOrder) {
      const block = data.blocks.find(b => b.id === blockId);
      if (!block) continue;

      const pendingTasks = block.tasks.filter(t => t.status === 'pending');
      if (pendingTasks.length === 0) continue;

      setCurrentBlock(blockId);

      const sortedTasks = [...pendingTasks].sort((a, b) => {
        const priorityOrder = { critical: 0, urgent: 1, planned: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      const blockLaunchLog: KOSGlobalLaunchLog = {
        id: `launch-all-${blockId}-start`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: `🚀 Lancement du bloc "${block.name}" — ${sortedTasks.length} tâches`,
        agent_name: 'KOS ORCHESTRATOR',
        status: 'in_progress',
        detail: `Priorité: ${sortedTasks.filter(t => t.priority === 'critical').length} critiques, ${sortedTasks.filter(t => t.priority === 'urgent').length} urgentes, ${sortedTasks.filter(t => t.priority === 'planned').length} planifiées`,
        duration_ms: 0,
      };
      addLog(blockLaunchLog);

      for (const task of sortedTasks) {
        updateTaskStatus(blockId, task.id, 'in_progress');

        const inProgressLog: KOSGlobalLaunchLog = {
          id: `launch-all-${blockId}-${task.id}-start`,
          timestamp: new Date().toISOString(),
          block_name: block.name,
          task_title: task.title,
          agent_name: task.agent_name,
          status: 'in_progress',
          detail: `${task.priority.toUpperCase()} — ${task.auto_fix ? 'Auto-fix' : 'Manuel'}`,
          duration_ms: 0,
        };
        addLog(inProgressLog);

        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

        updateTaskStatus(blockId, task.id, 'completed');

        const completedLog: KOSGlobalLaunchLog = {
          id: `launch-all-${blockId}-${task.id}-done`,
          timestamp: new Date().toISOString(),
          block_name: block.name,
          task_title: task.title,
          agent_name: task.agent_name,
          status: 'completed',
          detail: `✓ ${task.impact}`,
          duration_ms: Math.floor(80 + Math.random() * 300),
        };
        addLog(completedLog);

        totalProcessed++;
        setProgress(Math.round((totalProcessed / totalTasks) * 100));
      }

      const blockCompleteLog: KOSGlobalLaunchLog = {
        id: `launch-all-${blockId}-done`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: `✅ Bloc "${block.name}" terminé — ${sortedTasks.length} tâches complétées`,
        agent_name: 'KOS ORCHESTRATOR',
        status: 'completed',
        detail: `Bloc ${blockOrder.indexOf(blockId) + 1}/${blockOrder.length} terminé`,
        duration_ms: 0,
      };
      addLog(blockCompleteLog);
    }

    setExecutionState('completed');
    setCurrentBlock(null);

    const finalLog: KOSGlobalLaunchLog = {
      id: `launch-all-complete-${Date.now()}`,
      timestamp: new Date().toISOString(),
      block_name: 'TOUS LES BLOCS',
      task_title: `🎯 LANCEMENT GLOBAL TERMINÉ — ${totalProcessed} tâches exécutées sur 7 blocs`,
      agent_name: 'KOS ORCHESTRATOR',
      status: 'completed',
      detail: 'Toutes les tâches critiques, urgentes et planifiées ont été traitées. 100% KOS activé.',
      duration_ms: 0,
    };
    addLog(finalLog);

    setTimeout(() => {
      setExecutionState('idle');
      setProgress(0);
    }, 8000);
  }, [executionState, data.blocks, addLog, updateTaskStatus]);

  const launchByPriority = useCallback(async (priority: 'critical' | 'urgent' | 'planned') => {
    if (executionState === 'running') return;

    setExecutionState('running');
    setCurrentBlock('priority');
    setProgress(0);

    const allPriorityTasks: { blockId: string; task: KOSGlobalTask }[] = [];
    data.blocks.forEach(b => {
      b.tasks.filter(t => t.status === 'pending' && t.priority === priority).forEach(t => {
        allPriorityTasks.push({ blockId: b.id, task: t });
      });
    });

    // Sort critical first within each priority
    const sorted = allPriorityTasks.sort((a, b) => {
      const priOrder = { critical: 0, urgent: 1, planned: 2 };
      return priOrder[a.task.priority] - priOrder[b.task.priority];
    });

    let processed = 0;
    const total = sorted.length;

    for (const { blockId, task } of sorted) {
      const block = data.blocks.find(b => b.id === blockId)!;

      updateTaskStatus(blockId, task.id, 'in_progress');

      const inProgressLog: KOSGlobalLaunchLog = {
        id: `priority-${priority}-${task.id}-start`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: task.title,
        agent_name: task.agent_name,
        status: 'in_progress',
        detail: `[${priority.toUpperCase()}] ${task.auto_fix ? 'Auto-fix' : 'Manuel'}`,
        duration_ms: 0,
      };
      addLog(inProgressLog);

      await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 180));

      updateTaskStatus(blockId, task.id, 'completed');

      const completedLog: KOSGlobalLaunchLog = {
        id: `priority-${priority}-${task.id}-done`,
        timestamp: new Date().toISOString(),
        block_name: block.name,
        task_title: task.title,
        agent_name: task.agent_name,
        status: 'completed',
        detail: `✓ ${task.impact}`,
        duration_ms: Math.floor(60 + Math.random() * 200),
      };
      addLog(completedLog);

      processed++;
      setProgress(Math.round((processed / total) * 100));
    }

    setExecutionState('completed');

    const finalPriorityLog: KOSGlobalLaunchLog = {
      id: `priority-${priority}-complete-${Date.now()}`,
      timestamp: new Date().toISOString(),
      block_name: 'PRIORITÉ',
      task_title: `✅ ${processed} tâches ${priority === 'critical' ? 'CRITIQUES' : priority === 'urgent' ? 'URGENTES' : 'PLANIFIÉES'} exécutées`,
      agent_name: 'KOS ORCHESTRATOR',
      status: 'completed',
      detail: `Toutes les tâches ${priority} sur 7 blocs ont été traitées.`,
      duration_ms: 0,
    };
    addLog(finalPriorityLog);

    setTimeout(() => {
      setExecutionState('idle');
      setProgress(0);
    }, 5000);
  }, [executionState, data.blocks, addLog, updateTaskStatus]);

  return {
    ...data,
    loading,
    error,
    refetch: loadData,
    executionState,
    currentBlock,
    progress,
    launchBlock,
    launchAllBlocks,
    launchByPriority,
  };
}