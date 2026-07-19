import { useState, useCallback } from 'react';
import { computePhaseMetrics, usePhaseLoading, usePhaseLiveData } from '@/hooks/usePhaseDataCore';
import {
  phase7Stats,
  phase7Chantiers,
  phase7ExecutionLog,
  phase7Timeline,
  phase7Budget,
  phase7Dependencies,
} from '@/mocks/phase7Domination';

export function usePhase7Domination() {
  const [retryCount, setRetryCount] = useState(0);
  const loading = usePhaseLoading(retryCount);
  const retry = useCallback(() => setRetryCount(c => c + 1), []);
  const { liveData, isLive } = usePhaseLiveData(7);

  const m = computePhaseMetrics(phase7Chantiers, 48500000, 3200000, '2026-09-22', '2026-10-03');

  return {
    loading,
    retry,
    isLive,
    liveData,
    phase7Stats,
    phase7Chantiers,
    phase7ExecutionLog,
    phase7Timeline,
    phase7Budget,
    phase7Dependencies,
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



