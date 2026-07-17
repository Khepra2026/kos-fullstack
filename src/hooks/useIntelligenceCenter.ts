import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { IC_PUBLICATIONS, IC_AGENTS, IC_GLOBAL_METRICS, type ICPublication, type ICAgent } from '@/mocks/kosBloc02IntelligenceCenter';

interface UseIntelligenceCenterReturn {
  publications: ICPublication[];
  agents: ICAgent[];
  globalMetrics: typeof IC_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useIntelligenceCenter(): UseIntelligenceCenterReturn {
  const [publications, setPublications] = useState<ICPublication[]>([]);
  const [agents] = useState<ICAgent[]>(IC_AGENTS);
  const [globalMetrics] = useState(IC_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('knowledge_graph').select('id').limit(1);
      if (!error && data) {
        setIsLive(true);
      }
      setPublications(IC_PUBLICATIONS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setPublications(IC_PUBLICATIONS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { publications, agents, globalMetrics, isLive, loading, error, refetch: fetchData };
}