import { useState, useEffect, useCallback } from 'react';
import {
  BUSINESS_INTEL_AGENTS,
  MONITORED_ENTITIES,
  VALIDATION_LEVELS,
  BUSINESS_INTEL_KPIS,
  BUSINESS_INTEL_GLOBAL_METRICS,
  LIVRABLE_STANDARDS,
} from '@/mocks/kosBusinessOpportunityIntelligence';
import type {
  BusinessIntelAgent,
  MonitoredEntity,
  ValidationLevel,
  BusinessIntelKPI,
} from '@/mocks/kosBusinessOpportunityIntelligence';

export type {
  BusinessIntelAgent,
  MonitoredEntity,
  ValidationLevel,
  BusinessIntelKPI,
};

export interface BusinessOpportunityIntelligenceState {
  agents: BusinessIntelAgent[];
  monitoredEntities: MonitoredEntity[];
  validationLevels: ValidationLevel[];
  businessKPIs: BusinessIntelKPI[];
  globalMetrics: typeof BUSINESS_INTEL_GLOBAL_METRICS;
  livrableStandards: { icon: string; label: string; color: string }[];
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBusinessOpportunityIntelligence(): BusinessOpportunityIntelligenceState {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const [agents, setAgents] = useState<BusinessIntelAgent[]>(BUSINESS_INTEL_AGENTS);
  const [monitoredEntities] = useState<MonitoredEntity[]>(MONITORED_ENTITIES);
  const [validationLevels] = useState<ValidationLevel[]>(VALIDATION_LEVELS);
  const [businessKPIs, setBusinessKPIs] = useState<BusinessIntelKPI[]>(BUSINESS_INTEL_KPIS);
  const [globalMetrics, setGlobalMetrics] = useState(BUSINESS_INTEL_GLOBAL_METRICS);
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
        .eq('engine_type', 'business_opportunity_intelligence')
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (data) {
        setIsLive(true);
        if (data.agents) setAgents(data.agents);
        if (data.business_kpis) setBusinessKPIs(data.business_kpis);
        if (data.global_metrics) setGlobalMetrics(data.global_metrics);
      } else {
        setIsLive(false);
        setAgents(BUSINESS_INTEL_AGENTS);
        setBusinessKPIs(BUSINESS_INTEL_KPIS);
        setGlobalMetrics(BUSINESS_INTEL_GLOBAL_METRICS);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
      setAgents(BUSINESS_INTEL_AGENTS);
      setBusinessKPIs(BUSINESS_INTEL_KPIS);
      setGlobalMetrics(BUSINESS_INTEL_GLOBAL_METRICS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    agents,
    monitoredEntities,
    validationLevels,
    businessKPIs,
    globalMetrics,
    livrableStandards,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}