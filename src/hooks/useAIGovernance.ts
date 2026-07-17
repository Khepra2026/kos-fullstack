import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface AIGovernanceEntry {
  id: string;
  agent_name: string;
  agent_version?: string;
  model_name?: string;
  model_provider?: string;
  role_description?: string;
  owner?: string;
  risk_level: string;
  explicability_level: string;
  human_validation_required: boolean;
  total_decisions: number;
  validated_decisions: number;
  hallucinations_detected: number;
  cost_estimate: number;
  is_active: boolean;
  last_audit_at?: string;
}

export interface AIDecisionLog {
  id: number;
  agent_id: string;
  decision_type?: string;
  input_summary?: string;
  output_summary?: string;
  confidence_score?: number;
  human_validated: boolean;
  hallucination_detected: boolean;
  bias_flag: boolean;
  tokens_used?: number;
  cost?: number;
  response_time_ms?: number;
  created_at: string;
}

interface AIGovernanceState {
  agents: AIGovernanceEntry[];
  decisionLogs: AIDecisionLog[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useAIGovernance() {
  const [state, setState] = useState<AIGovernanceState>({
    agents: [],
    decisionLogs: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data: agents, error: agErr } = await supabase.from('kos_ai_governance_registry').select('*').order('agent_name');
      if (agErr) throw agErr;

      const { data: logs, error: logErr } = await supabase.from('kos_ai_decision_log').select('*').order('created_at', { ascending: false }).limit(100);
      if (logErr) throw logErr;

      setState({
        agents: (agents || []) as AIGovernanceEntry[],
        decisionLogs: (logs || []) as AIDecisionLog[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      const { data: fallback } = await supabase.from('kos_automates').select('id, status, success_rate, last_execution').limit(20);
      if (fallback) {
        const mapped: AIGovernanceEntry[] = (fallback || []).map((a: any) => ({
          id: a.id,
          agent_name: a.id,
          agent_version: '1.0',
          risk_level: 'medium',
          explicability_level: 'partial',
          human_validation_required: false,
          total_decisions: a.tasks_completed || 0,
          validated_decisions: Math.floor((a.tasks_completed || 0) * (a.success_rate || 0.9)),
          hallucinations_detected: 0,
          cost_estimate: 0,
          is_active: a.status === 'active',
        }));
        setState(prev => ({ ...prev, agents: mapped, isLoading: false, isLive: false, error: null }));
      } else {
        setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getHallucinationRate = useCallback((): number => {
    const total = state.agents.reduce((s, a) => s + a.total_decisions, 0);
    const hallucinations = state.agents.reduce((s, a) => s + a.hallucinations_detected, 0);
    return total > 0 ? (hallucinations / total) * 100 : 0;
  }, [state.agents]);

  const getValidationRate = useCallback((): number => {
    const total = state.agents.reduce((s, a) => s + a.total_decisions, 0);
    const validated = state.agents.reduce((s, a) => s + a.validated_decisions, 0);
    return total > 0 ? (validated / total) * 100 : 0;
  }, [state.agents]);

  const getActiveAgentCount = useCallback((): number => {
    return state.agents.filter(a => a.is_active).length;
  }, [state.agents]);

  const getTotalCost = useCallback((): number => {
    return state.agents.reduce((s, a) => s + (a.cost_estimate || 0), 0);
  }, [state.agents]);

  return {
    ...state,
    fetchData,
    getHallucinationRate,
    getValidationRate,
    getActiveAgentCount,
    getTotalCost,
  };
}