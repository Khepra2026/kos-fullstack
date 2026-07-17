import { useState, useCallback } from 'react';
import { computePhaseMetrics, usePhaseLoading, usePhaseLiveData } from '@/hooks/usePhaseDataCore';
import {
  phase1Stats,
  phase1Urgences,
  phase1ExecutionLog,
  phase1Timeline,
  phase1Budget,
} from '@/mocks/kosPhase1Consolidation';

export function usePhase1Consolidation() {
  const [retryCount, setRetryCount] = useState(0);
  const loading = usePhaseLoading(retryCount);
  const retry = useCallback(() => setRetryCount(c => c + 1), []);
  const { liveData, isLive } = usePhaseLiveData(1);

  const items = phase1Urgences;
  const m = computePhaseMetrics(items, 28400000, 2800000, '2026-06-19', '2026-07-03');

  return {
    loading,
    retry,
    isLive,
    liveData,
    phase1Stats,
    phase1Urgences,
    phase1ExecutionLog,
    phase1Timeline,
    phase1Budget,
    openUrgences: m.openItems,
    inProgressUrgences: m.inProgressItems,
    completedUrgences: m.completedItems,
    totalActions: m.totalActions,
    completedActions: m.completedActions,
    inProgressActions: m.inProgressActions,
    globalProgress: m.globalProgress,
    criticalPathBlockers: m.criticalPathBlockers,
    daysRemaining: m.daysRemaining,
    budgetUtilizationPercent: m.budgetUtilizationPercent,
  };
}