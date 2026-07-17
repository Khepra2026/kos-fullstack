import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface MonitoringLog {
  id: string;
  type: '404' | 'performance' | 'error' | 'navigation';
  url: string;
  referrer: string | null;
  user_agent: string | null;
  duration_ms: number | null;
  status_code: number | null;
  error_message: string | null;
  created_at: string;
}

export interface MonitoringStats {
  total404: number;
  totalErrors: number;
  totalPerformance: number;
  totalNavigation: number;
  avgResponseTime: number;
  avgPageLoad: number;
}

export interface Top404Entry {
  url: string;
  count: number;
}

export interface TopErrorEntry {
  error_message: string;
  count: number;
}

export type TimeRange = '24h' | '7d' | '30d';

export function useMonitoringData() {
  const [logs, setLogs] = useState<MonitoringLog[]>([]);
  const [stats, setStats] = useState<MonitoringStats | null>(null);
  const [top404, setTop404] = useState<Top404Entry[]>([]);
  const [topErrors, setTopErrors] = useState<TopErrorEntry[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDateFilter = useCallback(() => {
    const now = new Date();
    switch (timeRange) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return '2020-01-01';
    }
  }, [timeRange]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dateFilter = getDateFilter();

      const { data: allLogs, error: logsError } = await supabase
        .from('monitoring_logs')
        .select('*')
        .gte('created_at', dateFilter)
        .order('created_at', { ascending: false })
        .limit(500);

      if (logsError) throw logsError;
      const rows = allLogs || [];
      setLogs(rows);

      const total404 = rows.filter((r) => r.type === '404').length;
      const totalErrors = rows.filter((r) => r.type === 'error').length;
      const totalPerformance = rows.filter((r) => r.type === 'performance').length;
      const totalNavigation = rows.filter((r) => r.type === 'navigation').length;

      const perfRows = rows.filter((r) => r.type === 'performance' && r.duration_ms);
      const avgResponseTime = perfRows.length > 0
        ? Math.round(perfRows.reduce((s, r) => s + (r.duration_ms || 0), 0) / perfRows.length)
        : 0;

      const navRows = rows.filter((r) => r.type === 'navigation' && r.duration_ms);
      const avgPageLoad = navRows.length > 0
        ? Math.round(navRows.reduce((s, r) => s + (r.duration_ms || 0), 0) / navRows.length)
        : 0;

      setStats({
        total404,
        totalErrors,
        totalPerformance,
        totalNavigation,
        avgResponseTime,
        avgPageLoad,
      });

      const urlCounts: Record<string, number> = {};
      rows.filter((r) => r.type === '404').forEach((r) => {
        urlCounts[r.url] = (urlCounts[r.url] || 0) + 1;
      });
      setTop404(
        Object.entries(urlCounts)
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      );

      const errorCounts: Record<string, number> = {};
      rows.filter((r) => r.type === 'error' && r.error_message).forEach((r) => {
        const key = r.error_message || 'Unknown';
        errorCounts[key] = (errorCounts[key] || 0) + 1;
      });
      setTopErrors(
        Object.entries(errorCounts)
          .map(([error_message, count]) => ({ error_message, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [getDateFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    logs,
    stats,
    top404,
    topErrors,
    timeRange,
    setTimeRange,
    loading,
    error,
    refresh: loadData,
  };
}