import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  REGULATORY_TEXTS,
  PROCESSED_REGULATIONS,
  REGULATORY_BRAIN_AGENTS,
  REGULATORY_BRAIN_KPIS,
} from '@/mocks/kosRegulatoryBrain';
import type { RegulatoryTextInput, ProcessedRegulation } from '@/mocks/kosRegulatoryBrain';

interface UseKOSRegulatoryBrainReturn {
  availableTexts: RegulatoryTextInput[];
  processedRegulations: ProcessedRegulation[];
  agents: typeof REGULATORY_BRAIN_AGENTS;
  kpis: typeof REGULATORY_BRAIN_KPIS;
  selectedRegulation: ProcessedRegulation | null;
  processing: boolean;
  error: string | null;
  selectRegulation: (id: string) => void;
  processCustomText: (text: string, metadata: { autorite: string; titre: string; reference: string }) => void;
  isLive: boolean;
  loading: boolean;
  refetch: () => void;
}

export function useKOSRegulatoryBrain(): UseKOSRegulatoryBrainReturn {
  const [selectedRegulation, setSelectedRegulation] = useState<ProcessedRegulation | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('regulations')
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

  const selectRegulation = useCallback((id: string) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      const found = PROCESSED_REGULATIONS.find(r => r.input.id === id);
      if (found) {
        setSelectedRegulation(found);
      } else {
        setError('Texte réglementaire non trouvé.');
      }
      setProcessing(false);
    }, 800);
  }, []);

  const processCustomText = useCallback((_text: string, _metadata: { autorite: string; titre: string; reference: string }) => {
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      setError('UNKNOWN / NEED SOURCE — Le traitement de textes personnalisés nécessite la connexion à l\'Edge Function KOS Regulatory Brain. En mode MOCK, veuillez sélectionner un texte prétraité.');
      setProcessing(false);
    }, 1500);
  }, []);

  return {
    availableTexts: REGULATORY_TEXTS,
    processedRegulations: PROCESSED_REGULATIONS,
    agents: REGULATORY_BRAIN_AGENTS,
    kpis: REGULATORY_BRAIN_KPIS,
    selectedRegulation,
    processing,
    error,
    selectRegulation,
    processCustomText,
    isLive,
    loading,
    refetch,
  };
}