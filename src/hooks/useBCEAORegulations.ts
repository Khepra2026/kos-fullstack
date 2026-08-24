import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { BCEAORegulations as mockData, type BCEAORegulation } from '@/mocks/bceaoRegulations';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export function useBCEAORegulations() {
  const [regulations, setRegulations] = useState<BCEAORegulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [auditEntry, setAuditEntry] = useState<HookAuditEntry | null>(null);

  const fetchRegulations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data, error: err } = await supabase
        .from('regulations')
        .select('*')
        .ilike('source_authority', '%BCEAO%')
        .order('created_at', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (data && data.length > 0) {
        setRegulations(mockData);
        setIsLive(false);
        const entry = createAuditEntry('useBCEAORegulations', 'supabase_structure_mismatch', mockData.length, 'regulations', 'Données LIVE mais structure incompatible avec BCEAORegulation — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      } else {
        setRegulations(mockData);
        setIsLive(false);
        const entry = createAuditEntry('useBCEAORegulations', 'mock_fallback', mockData.length, 'regulations', 'Table vide ou pas de données BCEAO — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setRegulations(mockData);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useBCEAORegulations', 'error_fallback', mockData.length, 'regulations', message, durationMs);
      logHookAudit(entry);
      setAuditEntry(entry);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegulations();
  }, [fetchRegulations]);

  return { regulations, loading, error, isLive, refetch: fetchRegulations, auditEntry };
}



