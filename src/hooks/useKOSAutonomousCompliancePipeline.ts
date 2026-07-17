import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  PIPELINE_SCENARIOS,
  PIPELINE_DELIVERABLES,
  PIPELINE_AGENTS,
  PIPELINE_KPIS,
} from '@/mocks/kosAutonomousCompliancePipeline';
import type { PipelineScenario, PipelineDeliverable } from '@/mocks/kosAutonomousCompliancePipeline';

interface UseKOSAutonomousCompliancePipelineReturn {
  scenarios: PipelineScenario[];
  deliverables: PipelineDeliverable[];
  agents: typeof PIPELINE_AGENTS;
  kpis: typeof PIPELINE_KPIS;
  selectedDeliverable: PipelineDeliverable | null;
  processing: boolean;
  error: string | null;
  selectScenario: (id: string) => void;
  loading: boolean;
  refetch: () => void;
  isLive: boolean;
}

export function useKOSAutonomousCompliancePipeline(): UseKOSAutonomousCompliancePipelineReturn {
  const [selectedDeliverable, setSelectedDeliverable] = useState<PipelineDeliverable | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('pipeline_state')
        .select('*')
        .limit(1);
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
      const found = PIPELINE_DELIVERABLES.find(d => d.scenario.id === id);
      if (found) {
        setSelectedDeliverable(found);
      } else {
        setError('Scénario non trouvé. Veuillez réessayer.');
      }
      setProcessing(false);
    }, 2000);
  }, []);

  return {
    scenarios: PIPELINE_SCENARIOS,
    deliverables: PIPELINE_DELIVERABLES,
    agents: PIPELINE_AGENTS,
    kpis: PIPELINE_KPIS,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
    loading,
    refetch,
    isLive,
  };
}