import { useState, useEffect, useCallback } from 'react';
import {
  REGULATORY_LEGAL_AGENTS,
  COMPLIANCE_METHODOLOGY_PHASES,
  ANTI_HALLUCINATION_RULES,
  COMPLIANCE_KPIS,
  REGULATORY_LEGAL_GLOBAL_METRICS,
  LIVRABLE_STANDARDS,
} from '@/mocks/kosRegulatoryLegalComplianceExcellence';
import type {
  RegulatoryLegalAgent,
  ComplianceMethodologyPhase,
  AntiHallucinationRule,
  ComplianceKPI,
} from '@/mocks/kosRegulatoryLegalComplianceExcellence';

export type {
  RegulatoryLegalAgent,
  ComplianceMethodologyPhase,
  AntiHallucinationRule,
  ComplianceKPI,
};

export interface RegulatoryLegalComplianceState {
  agents: RegulatoryLegalAgent[];
  methodologyPhases: ComplianceMethodologyPhase[];
  antiHallucinationRules: AntiHallucinationRule[];
  complianceKPIs: ComplianceKPI[];
  globalMetrics: typeof REGULATORY_LEGAL_GLOBAL_METRICS;
  livrableStandards: { icon: string; label: string; color: string }[];
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRegulatoryLegalComplianceExcellence(): RegulatoryLegalComplianceState {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const [agents, setAgents] = useState<RegulatoryLegalAgent[]>(REGULATORY_LEGAL_AGENTS);
  const [methodologyPhases] = useState<ComplianceMethodologyPhase[]>(COMPLIANCE_METHODOLOGY_PHASES);
  const [antiHallucinationRules] = useState<AntiHallucinationRule[]>(ANTI_HALLUCINATION_RULES);
  const [complianceKPIs, setComplianceKPIs] = useState<ComplianceKPI[]>(COMPLIANCE_KPIS);
  const [globalMetrics, setGlobalMetrics] = useState(REGULATORY_LEGAL_GLOBAL_METRICS);
  const [livrableStandards] = useState(LIVRABLE_STANDARDS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from('kos_resource_engines')
        .select('*')
        .eq('engine_type', 'regulatory_legal_compliance_excellence')
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (data) {
        setIsLive(true);
        if (data.agents) setAgents(data.agents);
        if (data.compliance_kpis) setComplianceKPIs(data.compliance_kpis);
        if (data.global_metrics) setGlobalMetrics(data.global_metrics);
      } else {
        setIsLive(false);
        setAgents(REGULATORY_LEGAL_AGENTS);
        setComplianceKPIs(COMPLIANCE_KPIS);
        setGlobalMetrics(REGULATORY_LEGAL_GLOBAL_METRICS);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
      setAgents(REGULATORY_LEGAL_AGENTS);
      setComplianceKPIs(COMPLIANCE_KPIS);
      setGlobalMetrics(REGULATORY_LEGAL_GLOBAL_METRICS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    agents,
    methodologyPhases,
    antiHallucinationRules,
    complianceKPIs,
    globalMetrics,
    livrableStandards,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}