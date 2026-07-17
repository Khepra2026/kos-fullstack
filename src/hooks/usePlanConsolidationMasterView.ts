import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  masterViewStats as mockStats,
  masterViewPhases as mockPhases,
  masterViewBudget as mockBudget,
  masterViewTimeline as mockTimeline,
  masterViewAggregatedStats as mockAggregatedStats
} from '@/mocks/kosPlanConsolidationMasterView';

export interface LivePhase {
  id: number;
  phase_id: number;
  code: string;
  name: string;
  subtitle: string;
  route: string;
  score_start: number;
  score_end: number;
  delta: number;
  timeline_start: string;
  timeline_end: string;
  duration: string;
  budget: string;
  budget_numeric: number;
  chantiers: number;
  actions: number;
  status: string;
  progress: number;
  icon: string;
  color: string;
  color_class: string;
  category: string;
  description: string;
  key_result: string;
  production_launched_at: string;
}

export interface PlanConsolidationStats {
  execution_id: string;
  total_phases: number;
  starting_score: number;
  final_score: number;
  total_score_delta: number;
  total_weeks: number;
  total_chantiers: number;
  total_actions: number;
  total_budget: string;
  total_budget_numeric: number;
  commander_intent: string;
  global_progress: number;
  phases_completed: number;
  phases_in_progress: number;
  phases_open: number;
  is_live: boolean;
}

export function usePlanConsolidationMasterView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [phases, setPhases] = useState<LivePhase[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [stats, setStats] = useState<PlanConsolidationStats | null>(null);

  const fetchFromSupabase = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('kos_plan_consolidation_phases')
        .select('*')
        .order('phase_id', { ascending: true });

      if (fetchError) throw fetchError;
      if (data && data.length > 0) {
        const livePhases = data as LivePhase[];
        setPhases(livePhases);
        setIsLive(true);

        const allLive = livePhases.every(p => p.status === 'live');
        const allComplete = livePhases.every(p => p.progress >= 100);

        setStats({
          execution_id: mockStats.execution_id,
          total_phases: livePhases.length,
          starting_score: livePhases[0]?.score_start || 76,
          final_score: livePhases[livePhases.length - 1]?.score_end || 120,
          total_score_delta: (livePhases[livePhases.length - 1]?.score_end || 120) - (livePhases[0]?.score_start || 76),
          total_weeks: mockStats.total_weeks,
          total_chantiers: livePhases.reduce((s, p) => s + p.chantiers, 0),
          total_actions: livePhases.reduce((s, p) => s + p.actions, 0),
          total_budget: `${(livePhases.reduce((s, p) => s + p.budget_numeric, 0)).toLocaleString('fr-FR')} FCFA`,
          total_budget_numeric: livePhases.reduce((s, p) => s + p.budget_numeric, 0),
          commander_intent: mockStats.commander_intent,
          global_progress: allLive ? 100 : Math.round(livePhases.reduce((s, p) => s + p.progress, 0) / Math.max(livePhases.length, 1)),
          phases_completed: allLive ? livePhases.length : livePhases.filter(p => p.status === 'live').length,
          phases_in_progress: livePhases.filter(p => p.status === 'in_progress').length,
          phases_open: livePhases.filter(p => p.status === 'open').length,
          is_live: allLive && allComplete,
        });
      } else {
        throw new Error('No data returned');
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using mock fallback:', err);
      setPhases(mockPhases.map(p => ({
        ...p,
        phase_id: p.id,
        color_class: p.colorClass,
        budget_numeric: parseInt(p.budget.replace(/\s/g, '').replace(/[^0-9]/g, '')) || 0,
        timeline_start: p.timeline_start,
        timeline_end: p.timeline_end,
        score_start: p.score_start,
        score_end: p.score_end,
        key_result: p.keyResult,
        production_launched_at: '',
      })) as unknown as LivePhase[]);
      setIsLive(false);
      setStats(null);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      fetchFromSupabase().finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [retryCount, fetchFromSupabase]);

  const retry = useCallback(() => setRetryCount((c) => c + 1), []);

  const masterViewStats = stats || mockStats;
  const masterViewPhases = phases.length > 0 ? phases : mockPhases.map(p => ({
    ...p,
    phase_id: p.id,
    color_class: p.colorClass,
    budget_numeric: 0,
    production_launched_at: '',
  })) as unknown as typeof mockPhases;

  const masterViewBudget = useMemo(() => {
    if (phases.length > 0) {
      return {
        total: `${phases.reduce((s, p) => s + p.budget_numeric, 0).toLocaleString('fr-FR')} FCFA`,
        breakdown: phases.map(p => ({
          phase: `${p.code} — ${p.name}`,
          amount: p.budget,
          amountNum: p.budget_numeric,
        })),
      };
    }
    return mockBudget;
  }, [phases]);

  const sortedPhases = useMemo(() => {
    const src = phases.length > 0 ? phases : mockPhases.map(p => ({
      ...p,
      phase_id: p.id,
      color_class: p.colorClass,
      budget_numeric: 0,
      production_launched_at: '',
    }));
    return src.sort((a: any, b: any) => (a.phase_id || a.id) - (b.phase_id || b.id));
  }, [phases]);

  const phasesInProgress = useMemo(() =>
    sortedPhases.filter(p => p.status === 'in_progress').length,
    [sortedPhases]
  );

  const phasesCompleted = useMemo(() =>
    sortedPhases.filter(p => p.status === 'live' || p.status === 'completed').length,
    [sortedPhases]
  );

  const phasesOpen = useMemo(() =>
    sortedPhases.filter(p => p.status === 'open').length,
    [sortedPhases]
  );

  const globalProgress = useMemo(() => {
    if (phasesCompleted === sortedPhases.length && sortedPhases.length > 0) return 100;
    const total = sortedPhases.reduce((sum, p) => sum + p.actions, 0);
    const weighted = sortedPhases.reduce((sum, p) => sum + (p.progress / 100) * p.actions, 0);
    return Math.round((weighted / Math.max(total, 1)) * 100);
  }, [sortedPhases, phasesCompleted]);

  const allLive = isLive && phasesCompleted === sortedPhases.length && sortedPhases.length > 0;

  const launchMasterView = () => {
    if (allLive) {
      setToast('🚀 PLAN CONSOLIDATION — PRODUCTION LIVE ! 8 phases déployées, score 120 atteint, 63 chantiers complétés. KOS est en production.');
    } else {
      setToast('Plan Consolidation Master View activé ! 8 phases, trajectoire 76→120, 63 chantiers, 300 actions. Dashboard unifié prêt.');
    }
    setTimeout(() => setToast(null), 6000);
  };

  return {
    loading,
    error,
    retry,
    toast,
    launchMasterView,
    isLive,
    allLive,
    masterViewStats,
    masterViewPhases: sortedPhases,
    masterViewBudget,
    masterViewTimeline: mockTimeline,
    masterViewAggregatedStats: mockAggregatedStats,
    phasesInProgress,
    phasesCompleted,
    phasesOpen,
    globalProgress
  };
}