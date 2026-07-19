import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { RemediationPhase } from '@/mocks/bigFourRemediation';
import {
  remediationOverallMetrics,
  remediationMethodology,
} from '@/mocks/bigFourRemediation';

type SupabaseRemediationPhase = {
  id: string;
  phase_number: number;
  name: string;
  description: string;
  icon: string;
  hub_name: string;
  hub_url: string;
  status: string;
  current_score: number;
  target_score: number;
  trend: string;
  trend_pct: number;
  last_audit_date: string;
  owner: string;
  kpis: Record<string, unknown>[];
  gaps: Record<string, unknown>[];
  actions_completed: number;
  actions_total: number;
  methodology_steps: string[];
  evidence_documents: string[];
};

export function useBigFourRemediation() {
  const [phases, setPhases] = useState<RemediationPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('kos_bigfour_remediation_phases')
        .select('*')
        .order('phase_number', { ascending: true });

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        const rawPhases = data as SupabaseRemediationPhase[];
        const mappedPhases: RemediationPhase[] = rawPhases.map((p) => ({
          id: p.id,
          phase_number: p.phase_number,
          name: p.name,
          description: p.description,
          icon: p.icon,
          hub_name: p.hub_name,
          hub_url: p.hub_url,
          status: p.status as RemediationPhase['status'],
          current_score: p.current_score,
          target_score: p.target_score,
          trend: p.trend as RemediationPhase['trend'],
          trend_pct: p.trend_pct,
          last_audit_date: p.last_audit_date,
          owner: p.owner,
          kpis: (p.kpis || []).map((k: Record<string, unknown>) => ({
            label: (k.label as string) || '',
            current: k.current as number | string,
            target: k.target as number | string,
            unit: (k.unit as string) || '',
            met: (k.met as boolean) || false,
          })),
          gaps: (p.gaps || []).map((g: Record<string, unknown>) => ({
            id: (g.id as string) || '',
            description: (g.description as string) || '',
            severity: (g.severity as RemediationPhase['gaps'][0]['severity']) || 'medium',
            status: (g.status as RemediationPhase['gaps'][0]['status']) || 'open',
            deadline: (g.deadline as string) || '',
            owner: (g.owner as string) || '',
          })),
          actions_completed: p.actions_completed,
          actions_total: p.actions_total,
          methodology_steps: p.methodology_steps || [],
          evidence_documents: p.evidence_documents || [],
        }));
        setPhases(mappedPhases);
        setIsLive(true);
      } else {
        setPhases([]);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const overallMetrics = remediationOverallMetrics;
  const methodology = remediationMethodology;

  return {
    phases,
    overallMetrics,
    methodology,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}



