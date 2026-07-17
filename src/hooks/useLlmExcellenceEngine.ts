import { useState, useEffect, useCallback } from 'react';
import {
  LLM_EXCELLENCE_BLOCKS,
  LLM_MODEL_CAPABILITIES,
  LLM_TASK_MATRIX,
  LLM_PROMPT_TECHNIQUES,
  LLM_RAG_SOURCES,
  LLM_FACT_VERIFICATION,
  LLM_SEO_GEO_SKILLS,
  LLM_LEARNING_LOOPS,
  LLM_BENCHMARK_INSTITUTIONS,
  LLM_MATURITY_KPIS,
  LLM_EXCELLENCE_GLOBAL_METRICS,
} from '@/mocks/kosLlmExcellenceEngine';
import type {
  LlmExcellenceBlock,
  LlmModelCapability,
  TaskAffectation,
  PromptTechnique,
  RagSource,
  FactVerificationStep,
  SeoGeoSkill,
  LearningLoop,
  BenchmarkInstitution,
  MaturityKPI,
  LlmExcellenceData,
} from '@/mocks/kosLlmExcellenceEngine';

export type {
  LlmExcellenceBlock,
  LlmModelCapability,
  TaskAffectation,
  PromptTechnique,
  RagSource,
  FactVerificationStep,
  SeoGeoSkill,
  LearningLoop,
  BenchmarkInstitution,
  MaturityKPI,
  LlmExcellenceData,
};

export interface LlmExcellenceEngineState {
  blocks: LlmExcellenceBlock[];
  llmCapabilities: LlmModelCapability[];
  taskMatrix: TaskAffectation[];
  promptTechniques: PromptTechnique[];
  ragSources: RagSource[];
  factVerificationSteps: FactVerificationStep[];
  seoGeoSkills: SeoGeoSkill[];
  learningLoops: LearningLoop[];
  benchmarkInstitutions: BenchmarkInstitution[];
  maturityKPIs: MaturityKPI[];
  globalMetrics: typeof LLM_EXCELLENCE_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLlmExcellenceEngine(): LlmExcellenceEngineState {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const [blocks, setBlocks] = useState<LlmExcellenceBlock[]>(LLM_EXCELLENCE_BLOCKS);
  const [llmCapabilities] = useState<LlmModelCapability[]>(LLM_MODEL_CAPABILITIES);
  const [taskMatrix] = useState<TaskAffectation[]>(LLM_TASK_MATRIX);
  const [promptTechniques] = useState<PromptTechnique[]>(LLM_PROMPT_TECHNIQUES);
  const [ragSources, setRagSources] = useState<RagSource[]>(LLM_RAG_SOURCES);
  const [factVerificationSteps] = useState<FactVerificationStep[]>(LLM_FACT_VERIFICATION);
  const [seoGeoSkills] = useState<SeoGeoSkill[]>(LLM_SEO_GEO_SKILLS);
  const [learningLoops] = useState<LearningLoop[]>(LLM_LEARNING_LOOPS);
  const [benchmarkInstitutions] = useState<BenchmarkInstitution[]>(LLM_BENCHMARK_INSTITUTIONS);
  const [maturityKPIs] = useState<MaturityKPI[]>(LLM_MATURITY_KPIS);
  const [globalMetrics] = useState(LLM_EXCELLENCE_GLOBAL_METRICS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      const { data, error: dbError } = await supabase
        .from('kos_resource_engines')
        .select('*')
        .eq('engine_type', 'llm_excellence')
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (data) {
        setIsLive(true);
        if (data.blocks) setBlocks(data.blocks);
        if (data.rag_sources) setRagSources(data.rag_sources);
      } else {
        setIsLive(false);
        setBlocks(LLM_EXCELLENCE_BLOCKS);
        setRagSources(LLM_RAG_SOURCES);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
      setBlocks(LLM_EXCELLENCE_BLOCKS);
      setRagSources(LLM_RAG_SOURCES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    blocks,
    llmCapabilities,
    taskMatrix,
    promptTechniques,
    ragSources,
    factVerificationSteps,
    seoGeoSkills,
    learningLoops,
    benchmarkInstitutions,
    maturityKPIs,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}