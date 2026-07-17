import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { KOS_LLM_EXPERTS_AUTOMATES as mockAutomates, LLM_EXPERTS_CATEGORIES as mockCategories, LLM_EXPERTS_KPIS as mockKPIs } from '@/mocks/kosLlmExpertsAutomates';
import type { KOSLlmExpertsAutomate, LlmExpertsCategory } from '@/mocks/kosLlmExpertsAutomates';

export type { KOSLlmExpertsAutomate, LlmExpertsCategory };

export interface LlmExpertsKPIs {
  total_agents: number;
  deployed: number;
  partial: number;
  mock: number;
  auto_enabled: number;
  total_models_managed: number;
  total_prompts_optimized: number;
  total_tokens_processed: number;
  overall_evaluation_score: number;
  avg_accuracy_rate: number;
  avg_latency_ms: number;
  total_tasks: number;
  avg_success_rate: number;
  critical_agents: number;
  high_priority: number;
  medium_priority: number;
  categories: number;
}

export interface LlmExpertsData {
  automates: KOSLlmExpertsAutomate[];
  categories: LlmExpertsCategory[];
  kpis: LlmExpertsKPIs;
  isLive: boolean;
}

function mapAutomate(row: Record<string, unknown>): KOSLlmExpertsAutomate {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    tech_stack: typeof row.tech_stack === 'string' ? (row.tech_stack ? row.tech_stack.split(',').map((s: string) => s.trim()) : []) : Array.isArray(row.tech_stack) ? row.tech_stack as string[] : [],
    status: row.status as KOSLlmExpertsAutomate['status'],
    version: row.version as string,
    description: row.description as string,
    capabilities: typeof row.capabilities === 'string' ? (row.capabilities ? row.capabilities.split(',').map((s: string) => s.trim()) : []) : Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
    success_rate: Number(row.success_rate),
    tasks_completed: Number(row.tasks_completed),
    auto_enabled: Boolean(row.auto_enabled),
    icon: row.icon as string,
    color: row.color as string,
    last_execution: row.last_execution as string,
    priority: row.priority as KOSLlmExpertsAutomate['priority'],
    kpis: Array.isArray(row.kpis) ? row.kpis as KOSLlmExpertsAutomate['kpis'] : [],
    models_managed: Number(row.models_managed),
    prompts_optimized: Number(row.prompts_optimized),
    tokens_processed: Number(row.tokens_processed),
    evaluation_score: Number(row.evaluation_score),
    accuracy_rate: Number(row.accuracy_rate),
    latency_ms: Number(row.latency_ms),
  };
}

export function useLlmExpertsAutomates() {
  const [data, setData] = useState<LlmExpertsData>({
    automates: [],
    categories: [],
    kpis: { total_agents: 0, deployed: 0, partial: 0, mock: 0, auto_enabled: 0, total_models_managed: 0, total_prompts_optimized: 0, total_tokens_processed: 0, overall_evaluation_score: 0, avg_accuracy_rate: 0, avg_latency_ms: 0, total_tasks: 0, avg_success_rate: 0, critical_agents: 0, high_priority: 0, medium_priority: 0, categories: 0 },
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: automates, error: err } = await supabase
        .from('kos_llm_experts_automates')
        .select('*')
        .order('success_rate', { ascending: false });

      if (err) throw err;

      const rows = (automates as Record<string, unknown>[]) || [];
      const mapped = rows.map(mapAutomate);
      const hasData = mapped.length > 0;

      const computedKPIs: LlmExpertsKPIs = {
        total_agents: mapped.length,
        deployed: mapped.filter(a => a.status === 'deployed').length,
        partial: mapped.filter(a => a.status === 'partial').length,
        mock: mapped.filter(a => a.status === 'mock').length,
        auto_enabled: mapped.filter(a => a.auto_enabled).length,
        total_models_managed: mapped.reduce((s, a) => s + (a.models_managed || 0), 0),
        total_prompts_optimized: mapped.reduce((s, a) => s + (a.prompts_optimized || 0), 0),
        total_tokens_processed: mapped.reduce((s, a) => s + (a.tokens_processed || 0), 0),
        overall_evaluation_score: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.evaluation_score, 0) / mapped.length * 10) / 10 : 0,
        avg_accuracy_rate: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.accuracy_rate, 0) / mapped.length * 10) / 10 : 0,
        avg_latency_ms: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + (a.latency_ms || 0), 0) / mapped.length) : 0,
        total_tasks: mapped.reduce((s, a) => s + (a.tasks_completed || 0), 0),
        avg_success_rate: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.success_rate, 0) / mapped.length * 10) / 10 : 0,
        critical_agents: mapped.filter(a => a.priority === 'critical').length,
        high_priority: mapped.filter(a => a.priority === 'high').length,
        medium_priority: mapped.filter(a => a.priority === 'medium').length,
        categories: [...new Set(mapped.map(a => a.category))].length,
      };

      setData({
        automates: mapped,
        categories: mockCategories,
        kpis: computedKPIs,
        isLive: hasData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        automates: mockAutomates,
        categories: mockCategories,
        kpis: mockKPIs as LlmExpertsKPIs,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}