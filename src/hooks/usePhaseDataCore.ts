import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface ChantierLike {
  statut?: string;
  actions?: unknown[];
}

interface PhaseMetrics {
  openItems: number;
  inProgressItems: number;
  completedItems: number;
  totalActions: number;
  completedActions: number;
  inProgressActions: number;
  globalProgress: number;
  criticalPathBlockers: number;
  daysRemaining: number;
  budgetUtilizationPercent: number;
}

export function computePhaseMetrics(
  chantiers: ChantierLike[],
  budget: number,
  spent: number,
  startDate: string,
  endDate: string,
): PhaseMetrics {
  const openItems = chantiers.filter(c => c.statut === 'ouvert' || c.statut === 'planned').length;
  const inProgressItems = chantiers.filter(c => c.statut === 'in_progress' || c.statut === 'en_cours').length;
  const completedItems = chantiers.filter(c => c.statut === 'completed' || c.statut === 'termine').length;
  const totalActions = chantiers.reduce((sum, c) => sum + (c.actions as unknown[])?.length || 0, 0);
  const completedActions = chantiers.filter(c => c.statut === 'completed' || c.statut === 'termine')
    .reduce((sum, c) => sum + (c.actions as unknown[])?.length || 0, 0);
  const inProgressActions = chantiers.filter(c => c.statut === 'in_progress' || c.statut === 'en_cours')
    .reduce((sum, c) => sum + (c.actions as unknown[])?.length || 0, 0);
  const globalProgress = chantiers.length > 0
    ? Math.round((completedItems / chantiers.length) * 100)
    : 0;
  const criticalPathBlockers = chantiers.filter(c => c.statut === 'blocked' || c.statut === 'bloque').length;

  const now = new Date();
  const end = new Date(endDate);
  const start = new Date(startDate);
  const totalDays = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = remainingDays;
  const budgetUtilizationPercent = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  return {
    openItems,
    inProgressItems,
    completedItems,
    totalActions,
    completedActions,
    inProgressActions,
    globalProgress,
    criticalPathBlockers,
    daysRemaining,
    budgetUtilizationPercent,
  };
}

export function usePhaseLoading(retryCount: number): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [retryCount]);

  return loading;
}

// ═══════════════════════════════════════════════════
// V5.1 HYBRID MIGRATION — Phase Live Data from Supabase
// ═══════════════════════════════════════════════════

export interface PhaseLiveData {
  phaseId: number;
  code: string;
  name: string;
  budget: number;
  budgetFormatted: string;
  chantiers: number;
  actions: number;
  progress: number;
  status: string;
  scoreStart: number;
  scoreEnd: number;
  delta: number;
  timelineStart: string;
  timelineEnd: string;
  duration: string;
}

export interface PhaseLiveState {
  liveData: PhaseLiveData | null;
  isLive: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Hook partagé pour récupérer les données live d'une phase depuis Supabase.
 * Tous les hooks Phase 1-8 utilisent ce hook central pour le support hybride.
 * Pattern: Supabase kos_plan_consolidation_phases → mock fallback
 */
export function usePhaseLiveData(phaseNumber: number): PhaseLiveState {
  const [liveData, setLiveData] = useState<PhaseLiveData | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseErr } = await supabase
        .from('kos_plan_consolidation_phases')
        .select('*')
        .eq('phase_id', phaseNumber)
        .maybeSingle();

      if (supabaseErr) throw supabaseErr;

      if (data) {
        const live: PhaseLiveData = {
          phaseId: data.phase_id as number,
          code: data.code as string,
          name: data.name as string,
          budget: (data.budget_numeric as number) || 0,
          budgetFormatted: (data.budget as string) || '',
          chantiers: (data.chantiers as number) || 0,
          actions: (data.actions as number) || 0,
          progress: (data.progress as number) || 0,
          status: (data.status as string) || 'in_progress',
          scoreStart: (data.score_start as number) || 0,
          scoreEnd: (data.score_end as number) || 0,
          delta: (data.delta as number) || 0,
          timelineStart: (data.timeline_start as string) || '',
          timelineEnd: (data.timeline_end as string) || '',
          duration: (data.duration as string) || '',
        };
        setLiveData(live);
        setIsLive(true);
      } else {
        setLiveData(null);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur connexion Supabase';
      setError(msg);
      setLiveData(null);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [phaseNumber]);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  return { liveData, isLive, loading, error };
}

// Default export for modules that import the full module
const phaseDataCore = { computePhaseMetrics, usePhaseLoading, usePhaseLiveData };
export default phaseDataCore;