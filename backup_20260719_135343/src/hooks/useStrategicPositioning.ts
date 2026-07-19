import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { strategicPositioningData } from '@/mocks/strategicPositioning';

export interface StrategicAnalysis {
  id: string;
  title: string;
  domain: string;
  score: number;
  status: string;
  context_analysis: Record<string, unknown>;
  root_causes: Record<string, unknown>;
  risks: Record<string, unknown>;
  opportunities: Record<string, unknown>;
  scenarios: Record<string, unknown>;
  recommendations: Record<string, unknown>;
  executive_summary: string;
  methodology: string;
  metadata: Record<string, unknown>;
}

interface UseStrategicPositioningReturn {
  data: typeof strategicPositioningData;
  analyses: StrategicAnalysis[];
  loading: boolean;
  error: string | null;
  isLive: boolean;
  refresh: () => Promise<void>;
}

export function useStrategicPositioning(): UseStrategicPositioningReturn {
  const [data] = useState(structuredClone(strategicPositioningData));
  const [analyses, setAnalyses] = useState<StrategicAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchAnalyses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: live, error: err } = await supabase
        .from('strategic_analyses')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;

      if (live && live.length > 0) {
        setAnalyses(live as StrategicAnalysis[]);
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de connexion Supabase');
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  return { data, analyses, loading, error, isLive, refresh: fetchAnalyses };
}



