import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  SCENARIOS,
  WEBSITE_DELIVERABLES,
  WEBSITE_AGENTS,
  WEBSITE_KPIS,
} from '@/mocks/websiteAutomationEngine';
import type { WebsiteScenario, WebsiteDeliverable } from '@/mocks/websiteAutomationEngine';

interface UseKOSWebsiteAutomationEngineReturn {
  scenarios: WebsiteScenario[];
  deliverables: WebsiteDeliverable[];
  agents: typeof WEBSITE_AGENTS;
  kpis: typeof WEBSITE_KPIS;
  selectedDeliverable: WebsiteDeliverable | null;
  processing: boolean;
  error: string | null;
  selectScenario: (id: string) => void;
  loading: boolean;
  refetch: () => void;
  isLive: boolean;
}

export function useKOSWebsiteAutomationEngine(): UseKOSWebsiteAutomationEngineReturn {
  const [selectedDeliverable, setSelectedDeliverable] = useState<WebsiteDeliverable | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('site_health_checks')
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
      const found = WEBSITE_DELIVERABLES.find(d => d.scenario.id === id);
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
    deliverables: WEBSITE_DELIVERABLES,
    agents: WEBSITE_AGENTS,
    kpis: WEBSITE_KPIS,
    selectedDeliverable,
    processing,
    error,
    selectScenario,
    loading,
    refetch,
    isLive,
  };
}



