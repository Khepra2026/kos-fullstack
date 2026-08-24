import { useState, useCallback } from 'react';
import { computePhaseMetrics, usePhaseLoading, usePhaseLiveData } from '@/hooks/usePhaseDataCore';
import {
  phase4Stats,
  phase4Chantiers,
  phase4ExecutionLog,
  phase4Timeline,
  phase4Budget,
  phase4Dependencies,
} from '@/mocks/phase4GoLive';

export function usePhase4GoLive() {
  const [retryCount, setRetryCount] = useState(0);
  const loading = usePhaseLoading(retryCount);
  const retry = useCallback(() => setRetryCount(c => c + 1), []);
  const { liveData, isLive } = usePhaseLiveData(4);

  const m = computePhaseMetrics(phase4Chantiers, 21300000, 1100000, '2026-08-11', '2026-08-22');

  return {
    loading,
    retry,
    isLive,
    liveData,
    phase4Stats,
    phase4Chantiers,
    phase4ExecutionLog,
    phase4Timeline,
    phase4Budget,
    phase4Dependencies,
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



