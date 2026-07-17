import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { AO_OPPORTUNITES, AO_AGENTS, AO_GLOBAL_METRICS, type AOOpportunite, type AOAgent } from '@/mocks/kosBloc05AOAMI';

interface UseAOAMIReturn {
  opportunites: AOOpportunite[];
  agents: AOAgent[];
  globalMetrics: typeof AO_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useAOAMI(): UseAOAMIReturn {
  const [opportunites, setOpportunites] = useState<AOOpportunite[]>([]);
  const [agents] = useState<AOAgent[]>(AO_AGENTS);
  const [globalMetrics] = useState(AO_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('tender_intelligence')
        .select('*')
        .order('relevance_score', { ascending: false })
        .limit(20);

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        const mapped: AOOpportunite[] = data.map((t: Record<string, unknown>) => ({
          id: t.id as string,
          titre: t.tender_title as string,
          source: t.source_organization as string,
          pays: t.metadata ? (t.metadata as Record<string,string>).pays || 'Régional' : 'Régional',
          secteur: t.tender_type as string,
          budget_fcfa: (t.estimated_budget_fcfa as number) || 0,
          date_limite: t.submission_deadline as string,
          score_qualification: (t.relevance_score as number) || 80,
          statut: t.qualification_status === 'qualified' ? 'Qualifié' as const : t.qualification_status === 'submitted' ? 'Soumis' as const : 'En veille' as const,
          priorite: (t.relevance_score as number) >= 90 ? 'Haute' as const : (t.relevance_score as number) >= 80 ? 'Moyenne' as const : 'Basse' as const,
        }));
        setOpportunites(mapped);
        setIsLive(true);
      } else {
        setOpportunites(AO_OPPORTUNITES);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setOpportunites(AO_OPPORTUNITES);
      setIsLive(false);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { opportunites, agents, globalMetrics, isLive, loading, error, refetch: fetchData };
}