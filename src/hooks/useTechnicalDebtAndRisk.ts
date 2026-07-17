import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface TechnicalDebtItem {
  id: string;
  category: string;
  item_name: string;
  description?: string;
  file_path?: string;
  criticality: string;
  estimated_cost_hours?: number;
  impact_score: number;
  priority_order?: number;
  treatment_plan?: string;
  status: string;
  detected_at?: string;
  resolved_at?: string;
}

export interface RiskMatrixItem {
  id: string;
  domaine: string;
  risque: string;
  probabilite: number;
  impact: number;
  score: number;
  mitigation?: string;
  statut: string;
  vitesse?: string;
  detectabilite?: string;
  proprietaire?: string;
  controles_existants?: any[];
  efficacite_controles?: number;
  preuves_ids?: string[];
  plan_mitigation?: string;
  niveau_residuel?: number;
}

interface TechnicalDebtState {
  debtItems: TechnicalDebtItem[];
  risks: RiskMatrixItem[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useTechnicalDebtAndRisk() {
  const [state, setState] = useState<TechnicalDebtState>({
    debtItems: [],
    risks: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data: debt, error: debtErr } = await supabase.from('kos_technical_debt_registry').select('*').order('criticality');
      if (debtErr) throw debtErr;

      const { data: risks, error: riskErr } = await supabase.from('kos_bigfour_risk_matrix').select('*').order('score', { ascending: false });
      if (riskErr) throw riskErr;

      setState({
        debtItems: (debt || []) as TechnicalDebtItem[],
        risks: (risks || []) as RiskMatrixItem[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getActiveRisks = useCallback((): RiskMatrixItem[] => {
    return state.risks.filter(r => r.statut === 'actif');
  }, [state.risks]);

  const getMitigatedRisks = useCallback((): RiskMatrixItem[] => {
    return state.risks.filter(r => r.statut === 'mitigé');
  }, [state.risks]);

  const getRiskScore = useCallback((item: RiskMatrixItem): number => {
    return (item.probabilite || 0) * (item.impact || 0) / 100;
  }, []);

  const getDebtByCategory = useCallback((): Record<string, number> => {
    const cats: Record<string, number> = {};
    state.debtItems.forEach(d => {
      cats[d.category] = (cats[d.category] || 0) + 1;
    });
    return cats;
  }, [state.debtItems]);

  const getTotalDebtHours = useCallback((): number => {
    return state.debtItems.reduce((s, d) => s + (d.estimated_cost_hours || 0), 0);
  }, [state.debtItems]);

  const getCriticalDebtCount = useCallback((): number => {
    return state.debtItems.filter(d => d.criticality === 'critical').length;
  }, [state.debtItems]);

  return {
    ...state,
    fetchData,
    getActiveRisks,
    getMitigatedRisks,
    getRiskScore,
    getDebtByCategory,
    getTotalDebtHours,
    getCriticalDebtCount,
  };
}