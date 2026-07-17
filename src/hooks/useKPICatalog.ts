import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface KPIDefinition {
  id: string;
  kpi_code: string;
  kpi_name: string;
  definition?: string;
  formula?: string;
  unit?: string;
  domain?: string;
  owner?: string;
  alert_threshold?: number;
  target_threshold?: number;
  frequency: string;
  is_automated: boolean;
  current_value?: number;
  last_calculated_at?: string;
  weight: number;
  is_active: boolean;
}

export interface KPIRecalculationLog {
  id: number;
  kpi_id: string;
  domain?: string;
  previous_value?: number;
  new_value?: number;
  delta?: number;
  trigger_event?: string;
  status: string;
  evidence_id?: string;
  created_at: string;
}

interface KPICatalogState {
  kpis: KPIDefinition[];
  recalculationLogs: KPIRecalculationLog[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useKPICatalog(domainFilter?: string) {
  const [state, setState] = useState<KPICatalogState>({
    kpis: [],
    recalculationLogs: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchKPIs = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      let query = supabase.from('kos_kpi_catalog').select('*').eq('is_active', true).order('domain');
      if (domainFilter) {
        query = query.eq('domain', domainFilter);
      }
      const { data: kpis, error: kpiErr } = await query;
      if (kpiErr) throw kpiErr;

      const { data: logs, error: logErr } = await supabase.from('kos_kpi_recalculation_log').select('*').order('created_at', { ascending: false }).limit(50);
      if (logErr) throw logErr;

      setState({
        kpis: (kpis || []) as KPIDefinition[],
        recalculationLogs: (logs || []) as KPIRecalculationLog[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      const { data: mockRules } = await supabase.from('kos_evidence_validation_rules').select('*').limit(1);
      if (mockRules) {
        setState(prev => ({ ...prev, isLoading: false, isLive: false }));
      } else {
        setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
      }
    }
  }, [domainFilter]);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  const recalculateDomainScore = useCallback(async (domain: string, newValue: number, triggerEvent: string): Promise<boolean> => {
    try {
      const kpi = state.kpis.find(k => k.domain === domain && k.kpi_code?.endsWith('_SCORE'));
      if (!kpi) return false;

      const previousValue = kpi.current_value || 0;
      const delta = newValue - previousValue;

      const { error } = await supabase.from('kos_kpi_catalog').update({
        current_value: newValue,
        last_calculated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('id', kpi.id);

      if (error) throw error;

      await supabase.from('kos_kpi_recalculation_log').insert({
        kpi_id: kpi.id,
        domain,
        previous_value: previousValue,
        new_value: newValue,
        delta,
        trigger_event: triggerEvent,
        status: 'success',
        created_at: new Date().toISOString(),
      });

      await supabase.from('kos_bigfour_domains').update({
        score_actuel: Math.round(newValue),
        updated_at: new Date().toISOString(),
      }).eq('acronyme', domain);

      fetchKPIs();
      return true;
    } catch {
      return false;
    }
  }, [state.kpis, fetchKPIs]);

  const getDomainKPIs = useCallback((domain: string): KPIDefinition[] => {
    return state.kpis.filter(k => k.domain === domain && k.is_active);
  }, [state.kpis]);

  const getAllDomainScores = useCallback((): { domain: string; score: number; target: number; gap: number }[] => {
    const scoreKPIs = state.kpis.filter(k => k.kpi_code?.endsWith('_SCORE') && k.is_active);
    return scoreKPIs.map(k => ({
      domain: k.domain || '',
      score: k.current_value || 0,
      target: k.target_threshold || 95,
      gap: (k.target_threshold || 95) - (k.current_value || 0),
    }));
  }, [state.kpis]);

  return {
    ...state,
    fetchKPIs,
    recalculateDomainScore,
    getDomainKPIs,
    getAllDomainScores,
  };
}