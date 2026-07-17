import { useState, useCallback } from 'react';
import { computePhaseMetrics, usePhaseLoading, usePhaseLiveData } from '@/hooks/usePhaseDataCore';
import {
  phase3Stats,
  phase3Chantiers,
  phase3ExecutionLog,
  phase3Timeline,
  phase3Budget,
  phase3Dependencies,
} from '@/mocks/kosPhase3Qualite';

export function usePhase3Qualite() {
  const [retryCount, setRetryCount] = useState(0);
  const loading = usePhaseLoading(retryCount);
  const retry = useCallback(() => setRetryCount(c => c + 1), []);
  const { liveData, isLive } = usePhaseLiveData(3);

  const m = computePhaseMetrics(phase3Chantiers, 19500000, 2400000, '2026-07-14', '2026-07-28');

  return {
    loading,
    retry,
    isLive,
    liveData,
    phase3Stats,
    phase3Chantiers,
    phase3ExecutionLog,
    phase3Timeline,
    phase3Budget,
    phase3Dependencies,
    openChantiers: m.openItems,
    inProgressChantiers: m.inProgressItems,
    completedChantiers: m.completedItems,
    totalActions: m.totalActions,
    completedActions: m.completedActions,
    inProgressActions: m.inProgressActions,
    globalProgress: m.globalProgress,
    criticalPathBlockers: m.criticalPathBlockers,
    daysRemaining: m.daysRemaining,
    budgetUtilizationPercent: m.budgetUtilizationPercent,
  };
}