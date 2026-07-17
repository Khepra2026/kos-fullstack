import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface UnifiedKpi {
  id: string;
  category: string;
  label: string;
  current: string;
  target: string;
  unit: string;
  trend: string;
  icon: string;
}

interface UseKosUnifiedKpisReturn {
  kpis: UnifiedKpi[];
  grouped: Record<string, UnifiedKpi[]>;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastRefresh: Date | null;
}

export function useKosUnifiedKpis(): UseKosUnifiedKpisReturn {
  const [kpis, setKpis] = useState<UnifiedKpi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchKpis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('kos_unified_kpis')
        .select('*')
        .order('category')
        .order('label');

      if (fetchError) throw fetchError;
      if (data) {
        setKpis(data as UnifiedKpi[]);
        setLastRefresh(new Date());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement KPI Supabase');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  const grouped: Record<string, UnifiedKpi[]> = kpis.reduce((acc, kpi) => {
    const key = kpi.category || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(kpi);
    return acc;
  }, {} as Record<string, UnifiedKpi[]>);

  return { kpis, grouped, loading, error, refresh: fetchKpis, lastRefresh };
}