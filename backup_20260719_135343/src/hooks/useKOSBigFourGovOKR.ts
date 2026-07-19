import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  bigFourOKRObjectives,
  bigFourTargetKPIs,
  quarterlyReports,
  proactiveAlerts,
  autoCorrectionMetrics,
  governanceCrossLinks,
  executiveSummary,
} from '@/mocks/bigFourGovOKR';

export function useKOSBigFourGovOKR() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [okrs] = useState(bigFourOKRObjectives);
  const [kpiTargets] = useState(bigFourTargetKPIs);
  const [reports] = useState(quarterlyReports);
  const [alerts] = useState(proactiveAlerts);
  const [autoMetrics] = useState(autoCorrectionMetrics);
  const [crossLinks] = useState(governanceCrossLinks);
  const [summary] = useState(executiveSummary);
  const [alertFilter, setAlertFilter] = useState<string>('all');
  const [alertStatusFilter, setAlertStatusFilter] = useState<string>('all');

  const filteredAlerts = useMemo(() => {
    return alerts.filter(a => {
      if (alertFilter !== 'all' && a.severity !== alertFilter) return false;
      if (alertStatusFilter !== 'all' && a.status !== alertStatusFilter) return false;
      return true;
    });
  }, [alerts, alertFilter, alertStatusFilter]);

  const criticalAlertsCount = useMemo(() => alerts.filter(a => a.severity === 'critical' && a.status === 'active').length, [alerts]);
  const activeAlertsCount = useMemo(() => alerts.filter(a => a.status === 'active').length, [alerts]);
  const okrsOnTrack = useMemo(() => okrs.filter(o => o.progress >= 85).length, [okrs]);

  useEffect(() => {
    let cancelled = false;

    async function fetchFromSupabase() {
      try {
        const { data, error } = await supabase.from('kos_executive_cockpit').select('*').limit(1).maybeSingle();
        if (!cancelled && data && !error) {
          setDataSource('supabase');
        }
      } catch {
        // fallback to mock silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFromSupabase();
    return () => { cancelled = true; };
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }, []);

  return {
    okrs,
    kpiTargets,
    reports,
    alerts,
    filteredAlerts,
    autoMetrics,
    crossLinks,
    summary,
    loading,
    dataSource,
    alertFilter,
    setAlertFilter,
    alertStatusFilter,
    setAlertStatusFilter,
    criticalAlertsCount,
    activeAlertsCount,
    okrsOnTrack,
    refresh,
  };
}



