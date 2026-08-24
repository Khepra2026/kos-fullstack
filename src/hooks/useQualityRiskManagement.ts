import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { QUALITY_CONTROLS, QUALITY_AGENTS, AUDIT_LOGS, QUALITY_GLOBAL_METRICS, type QualityControl, type QualityAgent, type AuditLog } from '@/mocks/bloc12QualityRisk';

interface UseQualityRiskManagementReturn {
  controls: QualityControl[];
  agents: QualityAgent[];
  auditLogs: AuditLog[];
  globalMetrics: typeof QUALITY_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useQualityRiskManagement(): UseQualityRiskManagementReturn {
  const [controls, setControls] = useState<QualityControl[]>([]);
  const [agents] = useState<QualityAgent[]>(QUALITY_AGENTS);
  const [auditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [globalMetrics] = useState(QUALITY_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data, error } = await supabase.from('quality_assurance_reviews').select('id').limit(1);
      setIsLive(!error && !!data);
      setControls(QUALITY_CONTROLS);
    } catch (err: unknown) { const msg = err instanceof Error ? err.message : 'Erreur'; setError(msg); setControls(QUALITY_CONTROLS); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { controls, agents, auditLogs, globalMetrics, isLive, loading, error, refetch: fetchData };
}



