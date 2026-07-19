import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface EvidenceItem {
  id: string;
  evidence_type: string;
  title: string;
  description?: string;
  linked_action_id?: string;
  linked_domain?: string;
  linked_kpi_id?: string;
  linked_risk_id?: string;
  confidence_level: number;
  validation_status: string;
  validated_by?: string;
  validated_at?: string;
  is_automated: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface ValidationRule {
  id: string;
  rule_name: string;
  applies_to_domain?: string;
  required_evidence_types: string[];
  min_confidence: number;
  requires_independent_validation: boolean;
  requires_technical_proof: boolean;
}

export interface AuditLogEntry {
  id: number;
  event_type: string;
  entity_type: string;
  entity_id: string;
  action: string;
  actor?: string;
  previous_state?: any;
  new_state?: any;
  evidence_ids: string[];
  created_at: string;
}

interface EvidenceEngineState {
  evidenceItems: EvidenceItem[];
  validationRules: ValidationRule[];
  auditLog: AuditLogEntry[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useEvidenceEngine(domainFilter?: string) {
  const [state, setState] = useState<EvidenceEngineState>({
    evidenceItems: [],
    validationRules: [],
    auditLog: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchEvidence = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      let query = supabase.from('kos_evidence_registry').select('*').order('created_at', { ascending: false }).limit(100);
      if (domainFilter) {
        query = query.eq('linked_domain', domainFilter);
      }
      const { data: evidence, error: evErr } = await query;
      if (evErr) throw evErr;

      const { data: rules, error: ruleErr } = await supabase.from('kos_evidence_validation_rules').select('*').eq('is_active', true);
      if (ruleErr) throw ruleErr;

      const { data: logs, error: logErr } = await supabase.from('kos_universal_audit_log').select('*').order('created_at', { ascending: false }).limit(50);
      if (logErr) throw logErr;

      setState({
        evidenceItems: (evidence || []) as EvidenceItem[],
        validationRules: (rules || []) as ValidationRule[],
        auditLog: (logs || []) as AuditLogEntry[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
    }
  }, [domainFilter]);

  useEffect(() => {
    fetchEvidence();
  }, [fetchEvidence]);

  const validateAction = useCallback(async (actionId: string, domain: string): Promise<{ valid: boolean; missingEvidence: string[] }> => {
    const rule = state.validationRules.find(r => r.applies_to_domain === domain);
    if (!rule) return { valid: true, missingEvidence: [] };

    const { data: evidence } = await supabase.from('kos_evidence_registry').select('evidence_type').eq('linked_action_id', actionId).eq('validation_status', 'validated');
    const existingTypes = (evidence || []).map((e: any) => e.evidence_type);

    const requiredTypes: string[] = Array.isArray(rule.required_evidence_types) ? rule.required_evidence_types : [];
    const missingEvidence = requiredTypes.filter(t => !existingTypes.includes(t));

    return { valid: missingEvidence.length === 0, missingEvidence };
  }, [state.validationRules]);

  const addEvidence = useCallback(async (item: Partial<EvidenceItem>): Promise<string | null> => {
    try {
      const id = `EVD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const { error } = await supabase.from('kos_evidence_registry').insert({
        id,
        ...item,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;

      await supabase.from('kos_universal_audit_log').insert({
        event_type: 'evidence_created',
        entity_type: 'evidence',
        entity_id: id,
        action: 'create',
        actor: 'KOS_EvidenceEngine',
        new_state: item,
        created_at: new Date().toISOString(),
      });

      fetchEvidence();
      return id;
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message }));
      return null;
    }
  }, [fetchEvidence]);

  const getActionEvidenceScore = useCallback(async (actionId: string): Promise<number> => {
    const { data } = await supabase.from('kos_evidence_registry').select('confidence_level').eq('linked_action_id', actionId).eq('validation_status', 'validated');
    if (!data || data.length === 0) return 0;
    const scores = (data || []).map((e: any) => e.confidence_level || 0);
    return scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
  }, []);

  return {
    ...state,
    fetchEvidence,
    validateAction,
    addEvidence,
    getActionEvidenceScore,
  };
}



