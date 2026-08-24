import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  systemScanStats,
  integrityByBlock,
  criticalTasks,
  remainingTasksByBlock,
  architectureIssues,
  productionGoLivePlan,
  quarterlyKPIs
} from '@/mocks/systemIntegrityScanner';

export function useSystemIntegrityScanner() {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    supabase.from('kos_system_scan_results').select('id').limit(1).then(({ data }) => {
      if (data && data.length > 0) setIsLive(true);
    }).catch(() => {});
    return () => clearTimeout(t);
  }, [retryCount]);

  const retry = () => setRetryCount((c) => c + 1);

  const criticalCount = useMemo(() =>
    criticalTasks.filter(t => t.severity === 'critical').length, []
  );

  const openCriticalTasks = useMemo(() =>
    criticalTasks.filter(t => t.status === 'open' && t.priority === 'P0').length, []
  );

  const inProgressCritical = useMemo(() =>
    criticalTasks.filter(t => t.status === 'in_progress').length, []
  );

  const totalErrors = useMemo(() =>
    integrityByBlock.reduce((sum, b) => sum + b.errors, 0), []
  );

  const totalBugs = useMemo(() =>
    integrityByBlock.reduce((sum, b) => sum + b.bugs, 0), []
  );

  const totalWarnings = useMemo(() =>
    integrityByBlock.reduce((sum, b) => sum + b.warnings, 0), []
  );

  const totalRemainingTasks = useMemo(() =>
    remainingTasksByBlock.reduce((sum, b) => sum + b.tasks.length, 0), []
  );

  const p0RemainingTasks = useMemo(() => {
    let count = 0;
    remainingTasksByBlock.forEach(b => {
      b.tasks.forEach(t => { if (t.priority === 'P0') count++; });
    });
    return count;
  }, []);

  const blocksSummary = useMemo(() => ({
    total: integrityByBlock.length,
    critical: integrityByBlock.filter(b => b.status === 'critical').length,
    stable: integrityByBlock.filter(b => b.status === 'stable').length,
    optimal: integrityByBlock.filter(b => b.status === 'optimal').length
  }), []);

  const criticalTasksByPriority = useMemo(() => {
    const p0 = criticalTasks.filter(t => t.priority === 'P0').length;
    const p1 = criticalTasks.filter(t => t.priority === 'P1').length;
    const p2 = criticalTasks.filter(t => t.priority === 'P2').length;
    return { p0, p1, p2 };
  }, []);

  const goLiveProgress = useMemo(() =>
    Math.round((productionGoLivePlan.phases.filter(p => p.targetScore <= systemScanStats.global_integrity_score).length / productionGoLivePlan.phases.length) * 100),
    []
  );

  const architectureStats = useMemo(() => ({
    circularDeps: architectureIssues.circular_deps,
    deadFiles: architectureIssues.dead_files,
    orphanRoutes: architectureIssues.orphan_routes,
    oversizedFiles: architectureIssues.oversized_files,
    totalFindings: architectureIssues.findings.length
  }), []);

  return {
    loading,
    retry,
    isLive,
    systemScanStats,
    integrityByBlock,
    criticalTasks,
    remainingTasksByBlock,
    architectureIssues,
    productionGoLivePlan,
    quarterlyKPIs,
    criticalCount,
    openCriticalTasks,
    inProgressCritical,
    totalErrors,
    totalBugs,
    totalWarnings,
    totalRemainingTasks,
    p0RemainingTasks,
    blocksSummary,
    criticalTasksByPriority,
    goLiveProgress,
    architectureStats
  };
}



