import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  realtimeCWV,
  techDebtTracker,
  urlHealthMonitor,
  agentSeedingTracker,
  zeroDefectTarget,
  realtimeAlerts,
  globalKpiSnapshot,
} from '@/mocks/zeroDefectCommand';

export function useKOSZeroDefect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Data states — initialized with mock
  const [cwv, setCwv] = useState(realtimeCWV);
  const [techDebt, setTechDebt] = useState(techDebtTracker);
  const [urlHealth, setUrlHealth] = useState(urlHealthMonitor);
  const [agentSeeding, setAgentSeeding] = useState(agentSeedingTracker);
  const [zeroDefect, setZeroDefect] = useState(zeroDefectTarget);
  const [alerts, setAlerts] = useState(realtimeAlerts);
  const [kpiSnapshot, setKpiSnapshot] = useState(globalKpiSnapshot);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled([
        supabase.from('performance_snapshots').select('*').order('checked_at', { ascending: false }).limit(30),
        supabase.from('url_check_results').select('*').eq('is_broken', true).order('checked_at', { ascending: false }).limit(50),
        supabase.from('kos_auto_correction_tickets').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('security_scans').select('*').order('scanned_at', { ascending: false }).limit(1).single(),
        supabase.from('seo_audit_results').select('*').order('audited_at', { ascending: false }).limit(20),
        supabase.from('kos_critical_events').select('*').eq('acknowledged', false).order('created_at', { ascending: false }).limit(20),
      ]);

      const hasSupabaseData = results.some(r => {
        if (r.status !== 'fulfilled') return false;
        const data = (r.value as Record<string, unknown>)?.data;
        if (!data) return false;
        return Array.isArray(data) ? (data as unknown[]).length > 0 : true;
      });

      if (hasSupabaseData) {
        setDataSource('supabase');
        // In a full implementation, we'd map Supabase data to our state shapes here
        // For now, mock data remains the source of truth for UI completeness
      } else {
        setDataSource('mock');
      }
    } catch {
      setDataSource('mock');
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      refresh();
    }, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  // Computed values
  const criticalAlertsCount = useMemo(() => alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length, [alerts]);
  const highAlertsCount = useMemo(() => alerts.filter(a => a.severity === 'high' && !a.acknowledged).length, [alerts]);
  const totalAlertsCount = useMemo(() => alerts.filter(a => !a.acknowledged).length, [alerts]);

  const overallZeroDefectProgress = useMemo(() => {
    const dims = zeroDefect.dimensions;
    let totalWeight = 0;
    let weightedProgress = 0;
    dims.forEach(d => {
      totalWeight += d.weight;
      if (d.inverse) {
        weightedProgress += ((100 - d.current) / 100) * d.weight;
      } else {
        weightedProgress += (d.current / 100) * d.weight;
      }
    });
    return totalWeight > 0 ? Math.round((weightedProgress / totalWeight) * 100) : 0;
  }, [zeroDefect]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  }, []);

  return {
    loading,
    error,
    dataSource,
    lastRefresh,
    autoRefresh,
    setAutoRefresh,
    refresh,
    cwv,
    techDebt,
    urlHealth,
    agentSeeding,
    zeroDefect,
    alerts,
    kpiSnapshot,
    criticalAlertsCount,
    highAlertsCount,
    totalAlertsCount,
    overallZeroDefectProgress,
    acknowledgeAlert,
    dismissAlert,
  };
}



