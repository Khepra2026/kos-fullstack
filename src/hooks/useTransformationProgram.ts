import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  TRANSFORMATION_BLOCKS,
  TRANSFORMATION_PHASES,
  TRANSFORMATION_KPIS,
  TRANSFORMATION_GLOBAL_METRICS,
  type TransformationBlock,
  type TransformationPhase,
  type TransformationKPI,
} from '@/mocks/kosTransformationProgram2028';

interface UseTransformationProgramReturn {
  blocks: TransformationBlock[];
  phases: TransformationPhase[];
  kpis: TransformationKPI[];
  globalMetrics: typeof TRANSFORMATION_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTransformationProgram(): UseTransformationProgramReturn {
  const [blocks, setBlocks] = useState<TransformationBlock[]>([]);
  const [phases] = useState<TransformationPhase[]>(TRANSFORMATION_PHASES);
  const [kpis] = useState<TransformationKPI[]>(TRANSFORMATION_KPIS);
  const [globalMetrics] = useState(TRANSFORMATION_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('transformation_programs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
      setBlocks(TRANSFORMATION_BLOCKS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setBlocks(TRANSFORMATION_BLOCKS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    blocks,
    phases,
    kpis,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}