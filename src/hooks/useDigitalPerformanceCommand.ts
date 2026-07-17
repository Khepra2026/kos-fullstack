import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  coreWebVitals,
  owaspSecurity,
  soc2Readiness,
  reportingInteractif,
  digitalPlanActions,
  digitalQuarterlyMilestones,
  digitalStats
} from '@/mocks/kosDigitalPerformanceCommand';

export function useDigitalPerformanceCommand() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const { data } = await supabase.from('site_health_checks').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
      setLoading(false);
    };
    const t = setTimeout(() => checkSupabase(), 300);
    return () => clearTimeout(t);
  }, []);

  // ... existing code ...
  const lcpMetric = useMemo(() =>
    coreWebVitals.metrics.find(m => m.id === 'lcp'),
    []
  );

  const ttfbMetric = useMemo(() =>
    coreWebVitals.metrics.find(m => m.id === 'ttfb'),
    []
  );

  const clsMetric = useMemo(() =>
    coreWebVitals.metrics.find(m => m.id === 'cls'),
    []
  );

  const siMetric = useMemo(() =>
    coreWebVitals.metrics.find(m => m.id === 'si'),
    []
  );

  const inpMetric = useMemo(() =>
    coreWebVitals.metrics.find(m => m.id === 'inp'),
    []
  );

  const owaspCriticalOpen = useMemo(() =>
    owaspSecurity.scan_summary.critical,
    []
  );

  const owaspUnresolved = useMemo(() =>
    owaspSecurity.scan_summary.unresolved,
    []
  );

  const soc2TSCCount = useMemo(() =>
    soc2Readiness.trust_criteria.length,
    []
  );

  const soc2CertificationPhases = useMemo(() =>
    soc2Readiness.certification_path.length,
    []
  );

  const reportingDashboards = useMemo(() =>
    reportingInteractif.dashboards.length,
    []
  );

  const reportingTemplates = useMemo(() =>
    reportingInteractif.dashboards.find(d => d.id === 'drill-regulatory')?.templates?.length || 6,
    []
  );

  const reportingRTCount = useMemo(() =>
    reportingInteractif.realtime_visualizations.length,
    []
  );

  const highPriorityActions = useMemo(() =>
    digitalPlanActions.filter(a => a.priority === 'P0').length,
    []
  );

  const quarterCount = useMemo(() =>
    digitalQuarterlyMilestones.quarters.length,
    []
  );

  const planPillars = useMemo(() => {
    const pillars = new Set<string>();
    digitalPlanActions.forEach(a => pillars.add(a.pillar));
    return Array.from(pillars);
  }, []);

  const actionsByPillar = useMemo(() => {
    const map: Record<string, number> = {};
    digitalPlanActions.forEach(a => {
      map[a.pillar] = (map[a.pillar] || 0) + 1;
    });
    return map;
  }, []);

  const actionStats = useMemo(() => ({
    total: digitalStats.total_actions,
    completed: digitalStats.actions_completed,
    in_progress: digitalStats.actions_in_progress,
    planned: digitalStats.actions_planned,
    p0: digitalStats.p0_actions,
    p1: digitalStats.p1_actions,
    p2: digitalStats.p2_actions,
    totalBudget: parseInt(digitalStats.budget_total.replace(/[^0-9]/g, '')) || 217600000
  }), []);

  const owaspHeadersSummary = useMemo(() => {
    const headers = owaspSecurity.security_headers;
    const present = Object.values(headers).filter((h: any) => h.status === 'Présent').length;
    const total = Object.keys(headers).length;
    return { present, total, percent: Math.round((present / total) * 100) };
  }, []);

  return {
    loading,
    isLive,
    coreWebVitals,
    owaspSecurity,
    soc2Readiness,
    reportingInteractif,
    digitalPlanActions,
    digitalQuarterlyMilestones,
    digitalStats,
    lcpMetric,
    ttfbMetric,
    clsMetric,
    siMetric,
    inpMetric,
    owaspCriticalOpen,
    owaspUnresolved,
    soc2TSCCount,
    soc2CertificationPhases,
    reportingDashboards,
    reportingTemplates,
    reportingRTCount,
    highPriorityActions,
    quarterCount,
    planPillars,
    actionsByPillar,
    actionStats,
    owaspHeadersSummary
  };
}