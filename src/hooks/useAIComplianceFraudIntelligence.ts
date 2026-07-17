import { useState, useEffect, useCallback } from "react";
import { supabase } from '@/lib/supabase';
import {
  aiFraudDetection,
  iso27001SOC2Compliance,
  blockchainTraceability,
  correctivePlan,
  quarterlyKPIs,
  riskMatrix,
  executiveSummary,
} from "@/mocks/kosAIComplianceFraudIntelligence";

export function useAIComplianceFraudIntelligence() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fraud = aiFraudDetection;
  const compliance = iso27001SOC2Compliance;
  const blockchain = blockchainTraceability;
  const plan = correctivePlan;
  const kpis = quarterlyKPIs;
  const risques = riskMatrix;
  const resume = executiveSummary;

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    supabase.from('ai_compliance_engine').select('id').limit(1).then(({ error }) => {
      if (!error) console.log('[useAIComplianceFraudIntelligence] Supabase alive — hybrid mode');
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return {
    loading,
    error,
    fraud,
    compliance,
    blockchain,
    plan,
    kpis,
    risques,
    resume,
    refetch,
  };
}