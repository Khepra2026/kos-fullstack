import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { OHADAActs as mockData, type OHADAAct } from '@/mocks/ohadaActs';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export function useOHADARegulations() {
  const [regulations, setRegulations] = useState<OHADAAct[]>([]);
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
        .ilike('source_authority', '%OHADA%')
        .order('created_at', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (data && data.length > 0) {
        setRegulations(mockData);
        setIsLive(false);
        const entry = createAuditEntry('useOHADARegulations', 'supabase_structure_mismatch', mockData.length, 'regulations', 'Données LIVE mais structure incompatible avec OHADAAct — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      } else {
        setRegulations(mockData);
        setIsLive(false);
        const entry = createAuditEntry('useOHADARegulations', 'mock_fallback', mockData.length, 'regulations', 'Table vide ou pas de données OHADA — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setRegulations(mockData);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useOHADARegulations', 'error_fallback', mockData.length, 'regulations', message, durationMs);
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



