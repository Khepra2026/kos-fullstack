import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  TRANSFORMATION_SCENARIOS,
  TRANSFORMATION_DELIVERABLES,
  TRANSFORMATION_AGENTS,
  TRANSFORMATION_KPIS,
} from '@/mocks/transformationOffice';
import type { TransformationScenario, TransformationDeliverable } from '@/mocks/transformationOffice';

interface UseKOSTransformationOfficeReturn {
  scenarios: TransformationScenario[];
  deliverables: TransformationDeliverable[];
  agents: typeof TRANSFORMATION_AGENTS;
  kpis: typeof TRANSFORMATION_KPIS;
  selectedDeliverable: TransformationDeliverable | null;
  processing: boolean;
  error: string | null;
  selectScenario: (id: string) => void;
  loading: boolean;
  refetch: () => void;
  isLive: boolean;
}

export function useKOSTransformationOffice(): UseKOSTransformationOfficeReturn {
  const [selectedDeliverable, setSelectedDeliverable] = useState<TransformationDeliverable | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('transformation_programs')
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
      const found = TRANSFORMATION_DELIVERABLES.find(d => d.scenario.id === id);
      if (found) {
        setSelectedDeliverable(found);
      } else {
        setError('Scénario de transformation non trouvé. Veuillez réessayer.');
      }
      setProcessing(false);
    }, 1500);
  }, []);

  return {
    scenarios: TRANSFORMATION_SCENARIOS,
    deliverables: TRANSFORMATION_DELIVERABLES,
    agents: TRANSFORMATION_AGENTS,
    kpis: TRANSFORMATION_KPIS,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
    loading,
    refetch,
    isLive,
  };
}



