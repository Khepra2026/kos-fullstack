import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  SCENARIOS,
  COMPLIANCE_DELIVERABLES,
  FACTORY_AGENTS,
  FACTORY_KPIS,
} from '@/mocks/kosComplianceFactoryEngine';
import type { ComplianceScenario, ComplianceDeliverable } from '@/mocks/kosComplianceFactoryEngine';

interface UseKOSComplianceFactoryEngineReturn {
  scenarios: ComplianceScenario[];
  deliverables: ComplianceDeliverable[];
  agents: typeof FACTORY_AGENTS;
  kpis: typeof FACTORY_KPIS;
  selectedDeliverable: ComplianceDeliverable | null;
  processing: boolean;
  error: string | null;
  selectScenario: (id: string) => void;
  loading: boolean;
  refetch: () => void;
  isLive: boolean;
}

export function useKOSComplianceFactoryEngine(): UseKOSComplianceFactoryEngineReturn {
  const [selectedDeliverable, setSelectedDeliverable] = useState<ComplianceDeliverable | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('kos_automates')
        .select('*')
        .eq('categorie', 'compliance_factory');
      if (!supabaseErr && liveData && liveData.length > 0) {
        setIsLive(true);
      }
    } catch {
      // fallback silencieux au mock
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const selectScenario = useCallback((id: string) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      const found = COMPLIANCE_DELIVERABLES.find(d => d.scenario.id === id);
      if (found) {
        setSelectedDeliverable(found);
      } else {
        setError('Scénario non trouvé. Veuillez réessayer.');
      }
      setProcessing(false);
    }, 1500);
  }, []);

  return {
    scenarios: SCENARIOS,
    deliverables: COMPLIANCE_DELIVERABLES,
    agents: FACTORY_AGENTS,
    kpis: FACTORY_KPIS,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
    loading,
    refetch,
    isLive,
  };
}