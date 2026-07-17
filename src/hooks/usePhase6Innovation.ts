import { useState, useCallback } from 'react';
import { computePhaseMetrics, usePhaseLoading, usePhaseLiveData } from '@/hooks/usePhaseDataCore';
import {
  phase6Stats,
  phase6Chantiers,
  phase6ExecutionLog,
  phase6Timeline,
  phase6Budget,
  phase6Dependencies,
} from '@/mocks/kosPhase6Innovation';

export function usePhase6Innovation() {
  const [retryCount, setRetryCount] = useState(0);
  const loading = usePhaseLoading(retryCount);
  const retry = useCallback(() => setRetryCount(c => c + 1), []);
  const { liveData, isLive } = usePhaseLiveData(6);

  const m = computePhaseMetrics(phase6Chantiers, 42200000, 3800000, '2026-09-08', '2026-09-19');

  return {
    loading,
    retry,
    isLive,
    liveData,
    phase6Stats,
    phase6Chantiers,
    phase6ExecutionLog,
    phase6Timeline,
    phase6Budget,
    phase6Dependencies,
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