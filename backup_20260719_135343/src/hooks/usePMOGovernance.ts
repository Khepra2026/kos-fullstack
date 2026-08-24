import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  PMO_PROCESSUS,
  PMO_AGENTS,
  PMO_KPIS,
  PMO_GLOBAL_METRICS,
  type PMOProcess,
  type PMOAgent,
  type PMOKPI,
} from '@/mocks/bloc00PMOGovernance';

interface UsePMOGovernanceReturn {
  processus: PMOProcess[];
  agents: PMOAgent[];
  kpis: PMOKPI[];
  globalMetrics: typeof PMO_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePMOGovernance(): UsePMOGovernanceReturn {
  const [processus, setProcessus] = useState<PMOProcess[]>([]);
  const [agents] = useState<PMOAgent[]>(PMO_AGENTS);
  const [kpis] = useState<PMOKPI[]>(PMO_KPIS);
  const [globalMetrics] = useState(PMO_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('autonomous_pmo')
        .select('id')
        .limit(1);

      if (dbError) throw new Error(dbError.message);

      if (data && data.length > 0) {
        setIsLive(true);
      } else {
        setIsLive(false);
        setProcessus(PMO_PROCESSUS);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setProcessus(PMO_PROCESSUS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    processus,
    agents,
    kpis,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}



