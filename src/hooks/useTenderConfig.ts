import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { qualificationCriteria, kpiOverview, donorIntelligence, donorStats } from '@/mocks/tenderIntelligence';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

export function useTenderConfig() {
  const [criteria, setCriteria] = useState(qualificationCriteria);
  const [kpis, setKpis] = useState(kpiOverview);
  const [donors, setDonors] = useState(donorIntelligence);
  const [donorKpis, setDonorKpis] = useState(donorStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [auditEntry, setAuditEntry] = useState<HookAuditEntry | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data, error: err } = await supabase
        .from('tender_intelligence')
        .select('*')
        .limit(100);

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (data && data.length > 0) {
        setCriteria(qualificationCriteria);
        setKpis(kpiOverview);
        setDonors(donorIntelligence);
        setDonorKpis(donorStats);
        setIsLive(false);
        const entry = createAuditEntry('useTenderConfig', 'supabase_structure_mismatch', 1, 'tender_intelligence', 'Données LIVE mais config structurée via mock — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      } else {
        setCriteria(qualificationCriteria);
        setKpis(kpiOverview);
        setDonors(donorIntelligence);
        setDonorKpis(donorStats);
        setIsLive(false);
        const entry = createAuditEntry('useTenderConfig', 'mock_fallback', 1, 'tender_intelligence', 'Fallback mock', durationMs);
        logHookAudit(entry);
        setAuditEntry(entry);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setCriteria(qualificationCriteria);
      setKpis(kpiOverview);
      setDonors(donorIntelligence);
      setDonorKpis(donorStats);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useTenderConfig', 'error_fallback', 1, 'tender_intelligence', message, durationMs);
      logHookAudit(entry);
      setAuditEntry(entry);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { criteria, kpis, donors, donorKpis, loading, error, isLive, refetch: fetchConfig, auditEntry };
}