import { useState, useEffect, useCallback } from 'react';
import {
  SCIENTIFIC_BLOCKS,
  SCIENTIFIC_IA_REASONING,
  SCIENTIFIC_IA_ACADEMIC,
  SCIENTIFIC_METHODOLOGY_STEPS,
  SCIENTIFIC_ECONOMETRIC_SKILLS,
  SCIENTIFIC_FINANCIAL_SKILLS,
  SCIENTIFIC_SURVEILLANCE_INSTITUTIONS,
  SCIENTIFIC_ESG_FRAMEWORKS,
  SCIENTIFIC_VALIDATION_AGENTS,
  SCIENTIFIC_ANTI_HALLUCINATION_RULES,
  SCIENTIFIC_MATURITY_KPIS,
  SCIENTIFIC_GLOBAL_METRICS,
} from '@/mocks/kosScientificIntelligenceEnhancement';
import type {
  ScientificBlock,
  ScientificIaModel,
  MethodologyStep,
  EconometricSkill,
  FinancialModelSkill,
  SurveillanceInstitution,
  EsgFramework,
  ValidationAgent,
  AntiHallucinationRule,
  ScientificMaturityKPI,
} from '@/mocks/kosScientificIntelligenceEnhancement';

export type {
  ScientificBlock,
  ScientificIaModel,
  MethodologyStep,
  EconometricSkill,
  FinancialModelSkill,
  SurveillanceInstitution,
  EsgFramework,
  ValidationAgent,
  AntiHallucinationRule,
  ScientificMaturityKPI,
};

export interface ScientificIntelligenceState {
  blocks: ScientificBlock[];
  iaReasoning: ScientificIaModel[];
  iaAcademic: ScientificIaModel[];
  methodologySteps: MethodologyStep[];
  econometricSkills: EconometricSkill[];
  financialSkills: FinancialModelSkill[];
  surveillanceInstitutions: SurveillanceInstitution[];
  esgFrameworks: EsgFramework[];
  validationAgents: ValidationAgent[];
  antiHallucinationRules: AntiHallucinationRule[];
  maturityKPIs: ScientificMaturityKPI[];
  globalMetrics: typeof SCIENTIFIC_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useScientificIntelligenceEnhancement(): ScientificIntelligenceState {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const [blocks, setBlocks] = useState<ScientificBlock[]>(SCIENTIFIC_BLOCKS);
  const [iaReasoning] = useState<ScientificIaModel[]>(SCIENTIFIC_IA_REASONING);
  const [iaAcademic] = useState<ScientificIaModel[]>(SCIENTIFIC_IA_ACADEMIC);
  const [methodologySteps] = useState<MethodologyStep[]>(SCIENTIFIC_METHODOLOGY_STEPS);
  const [econometricSkills] = useState<EconometricSkill[]>(SCIENTIFIC_ECONOMETRIC_SKILLS);
  const [financialSkills] = useState<FinancialModelSkill[]>(SCIENTIFIC_FINANCIAL_SKILLS);
  const [surveillanceInstitutions] = useState<SurveillanceInstitution[]>(SCIENTIFIC_SURVEILLANCE_INSTITUTIONS);
  const [esgFrameworks] = useState<EsgFramework[]>(SCIENTIFIC_ESG_FRAMEWORKS);
  const [validationAgents] = useState<ValidationAgent[]>(SCIENTIFIC_VALIDATION_AGENTS);
  const [antiHallucinationRules] = useState<AntiHallucinationRule[]>(SCIENTIFIC_ANTI_HALLUCINATION_RULES);
  const [maturityKPIs] = useState<ScientificMaturityKPI[]>(SCIENTIFIC_MATURITY_KPIS);
  const [globalMetrics] = useState(SCIENTIFIC_GLOBAL_METRICS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from('kos_resource_engines')
        .select('*')
        .eq('engine_type', 'scientific_intelligence')
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (data) {
        setIsLive(true);
        if (data.blocks) setBlocks(data.blocks);
      } else {
        setIsLive(false);
        setBlocks(SCIENTIFIC_BLOCKS);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
      setBlocks(SCIENTIFIC_BLOCKS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    blocks,
    iaReasoning,
    iaAcademic,
    methodologySteps,
    econometricSkills,
    financialSkills,
    surveillanceInstitutions,
    esgFrameworks,
    validationAgents,
    antiHallucinationRules,
    maturityKPIs,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}