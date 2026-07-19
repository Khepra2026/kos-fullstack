import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  INSTITUTIONS,
  COMPLIANCE_AUDITS,
  AUDITOR_AGENTS,
  AUDITOR_KPIS,
} from '@/mocks/seniorComplianceAuditor';
import type { AuditInstitution, ComplianceAudit } from '@/mocks/seniorComplianceAuditor';

interface UseKOSSeniorComplianceAuditorReturn {
  institutions: AuditInstitution[];
  audits: ComplianceAudit[];
  agents: typeof AUDITOR_AGENTS;
  kpis: typeof AUDITOR_KPIS;
  selectedAudit: ComplianceAudit | null;
  processing: boolean;
  error: string | null;
  selectInstitution: (id: string) => void;
  isLive: boolean;
  loading: boolean;
  refetch: () => void;
}

export function useKOSSeniorComplianceAuditor(): UseKOSSeniorComplianceAuditorReturn {
  const [selectedAudit, setSelectedAudit] = useState<ComplianceAudit | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchSupabase = useCallback(async () => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('compliance_reviews')
        .select('*')
        .limit(10);

      if (supabaseError) throw supabaseError;
      if (data && data.length > 0) setIsLive(true);
    } catch {
      setIsLive(false);
    }
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchSupabase();
    setTimeout(() => setLoading(false), 600);
  }, [fetchSupabase]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    fetchSupabase();
    return () => clearTimeout(t);
  }, [fetchSupabase]);

  const selectInstitution = useCallback((id: string) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      const found = COMPLIANCE_AUDITS.find(a => a.institution.id === id);
      if (found) {
        setSelectedAudit(found);
      } else {
        setError('Audit non trouvé pour cette institution.');
      }
      setProcessing(false);
    }, 1000);
  }, []);

  return {
    institutions: INSTITUTIONS,
    audits: COMPLIANCE_AUDITS,
    agents: AUDITOR_AGENTS,
    kpis: AUDITOR_KPIS,
    selectedAudit,
    processing,
    error,
    selectInstitution,
    isLive,
    loading,
    refetch,
  };
}



