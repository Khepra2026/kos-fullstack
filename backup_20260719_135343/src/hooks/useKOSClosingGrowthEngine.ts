import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  LEAD_MAGNET_RECOMMENDATIONS,
  VISITOR_PROFILES,
  LEAD_MAGNET_CONVERSIONS,
  LEAD_MAGNET_ENGINE_STATS,
  CLOSING_TRIGGER_RULES,
  CLOSING_ALERTS,
  CLOSING_KPIS,
  CLOSING_ENGINE_STATS,
  OBSERVATION_SOURCES,
  EVOLUTION_MUTATIONS,
  EVOLUTION_CYCLES,
  EVOLUTION_CAPABILITIES,
  AUTO_EVOLUTION_STATS,
} from '@/mocks/closingGrowthEngine';
import type {
  LeadMagnetRecommendation,
  VisitorProfile,
  LeadMagnetConversion,
  ClosingTriggerRule,
  ClosingAlert,
  ClosingKPIs,
  EvolutionMutation,
  EvolutionCycle,
  EvolutionCapability,
} from '@/mocks/closingGrowthEngine';

interface UseKOSClosingGrowthEngineResult {
  // Lead Magnet Engine
  leadMagnets: LeadMagnetRecommendation[];
  visitorProfiles: VisitorProfile[];
  magnetConversions: LeadMagnetConversion[];
  magnetEngineStats: typeof LEAD_MAGNET_ENGINE_STATS;

  // AI Closing Trigger
  triggerRules: ClosingTriggerRule[];
  alerts: ClosingAlert[];
  closingKPIs: ClosingKPIs;
  closingEngineStats: typeof CLOSING_ENGINE_STATS;

  // Auto-Evolution Engine
  observationSources: typeof OBSERVATION_SOURCES;
  mutations: EvolutionMutation[];
  cycles: EvolutionCycle[];
  capabilities: EvolutionCapability[];
  evolutionStats: typeof AUTO_EVOLUTION_STATS;

  // State
  loading: boolean;
  selectedAlert: ClosingAlert | null;
  setSelectedAlert: (alert: ClosingAlert | null) => void;
  selectedMutation: EvolutionMutation | null;
  setSelectedMutation: (mutation: EvolutionMutation | null) => void;
}

export function useKOSClosingGrowthEngine(): UseKOSClosingGrowthEngineResult {
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<ClosingAlert | null>(null);
  const [selectedMutation, setSelectedMutation] = useState<EvolutionMutation | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkSupabase() {
      try {
        const { data } = await supabase.from('growth_kpis').select('id').limit(1);
        if (!cancelled && data && data.length > 0) {
          setIsLive(true);
        }
      } catch {
        setIsLive(false);
      }
    }
    checkSupabase();
    const timer = setTimeout(() => { if (!cancelled) setLoading(false); }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return {
    leadMagnets: LEAD_MAGNET_RECOMMENDATIONS,
    visitorProfiles: VISITOR_PROFILES,
    magnetConversions: LEAD_MAGNET_CONVERSIONS,
    magnetEngineStats: LEAD_MAGNET_ENGINE_STATS,

    triggerRules: CLOSING_TRIGGER_RULES,
    alerts: CLOSING_ALERTS,
    closingKPIs: CLOSING_KPIS,
    closingEngineStats: CLOSING_ENGINE_STATS,

    observationSources: OBSERVATION_SOURCES,
    mutations: EVOLUTION_MUTATIONS,
    cycles: EVOLUTION_CYCLES,
    capabilities: EVOLUTION_CAPABILITIES,
    evolutionStats: AUTO_EVOLUTION_STATS,

    loading,
    isLive,
    selectedAlert,
    setSelectedAlert,
    selectedMutation,
    setSelectedMutation,
  };
}



