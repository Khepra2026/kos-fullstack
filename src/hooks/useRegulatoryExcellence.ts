import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { REGULATORY_DOMAINS, REGULATORY_AGENTS, REGULATORY_ALERTS, REGULATORY_GLOBAL_METRICS, type RegulatoryDomain, type RegulatoryAgent, type RegulatoryAlert } from '@/mocks/kosBloc08RegulatoryExcellence';
import { logHookAudit, createAuditEntry, type HookAuditEntry } from '@/utils/hookAuditLogger';

interface RegulatoryRegisterEntry {
  id: string;
  reference: string;
  autorite: string;
  domaine: string;
  titre: string;
  exigence: string;
  obligations: string[];
  preuves_requises: string[];
  statut_texte: string;
  statut_conformite: string;
  niveau_risque: string;
  composants_kos: string[];
  articles_associes: string[];
  score_conformite: number;
  texte_remplace_par: string | null;
  created_at: string;
  updated_at: string;
}

interface AuditMeta {
  register: HookAuditEntry | null;
}

interface UseRegulatoryExcellenceReturn {
  domains: RegulatoryDomain[];
  agents: RegulatoryAgent[];
  alerts: RegulatoryAlert[];
  globalMetrics: typeof REGULATORY_GLOBAL_METRICS;
  registerEntries: RegulatoryRegisterEntry[];
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  auditTrail: AuditMeta;
}

export function useRegulatoryExcellence(): UseRegulatoryExcellenceReturn {
  const [domains, setDomains] = useState<RegulatoryDomain[]>(REGULATORY_DOMAINS);
  const [agents, setAgents] = useState<RegulatoryAgent[]>(REGULATORY_AGENTS);
  const [alerts, setAlerts] = useState<RegulatoryAlert[]>(REGULATORY_ALERTS);
  const [globalMetrics, setGlobalMetrics] = useState(REGULATORY_GLOBAL_METRICS);
  const [registerEntries, setRegisterEntries] = useState<RegulatoryRegisterEntry[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditMeta>({ register: null });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const { data: live, error: err } = await supabase
        .from('regulatory_register')
        .select('*')
        .order('created_at', { ascending: false });

      const durationMs = Math.round(performance.now() - startTime);

      if (err) throw err;

      if (live && live.length > 0) {
        setRegisterEntries(live as RegulatoryRegisterEntry[]);
        setIsLive(true);
        const entry = createAuditEntry('useRegulatoryExcellence', 'supabase', live.length, 'regulatory_register', undefined, durationMs);
        logHookAudit(entry);
        setAuditTrail({ register: entry });
      } else {
        setRegisterEntries([]);
        setIsLive(false);
        const entry = createAuditEntry('useRegulatoryExcellence', 'mock_fallback', 0, 'regulatory_register', 'Table vide — fallback mock', durationMs);
        logHookAudit(entry);
        setAuditTrail({ register: entry });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur de connexion Supabase';
      setError(msg);
      setIsLive(false);
      const durationMs = Math.round(performance.now() - startTime);
      const entry = createAuditEntry('useRegulatoryExcellence', 'error_fallback', 0, 'regulatory_register', msg, durationMs);
      logHookAudit(entry);
      setAuditTrail({ register: entry });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { domains, agents, alerts, globalMetrics, registerEntries, isLive, loading, error, refetch: fetchData, auditTrail };
}