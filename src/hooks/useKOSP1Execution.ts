import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  P1_EXECUTION_BLOCKS,
  P1_GLOBAL_MILESTONES,
  P1_TIMELINE,
  P1_EXECUTIVE_SUMMARY,
  computeP1ExecutionKPIs,
} from '@/mocks/kosP1Execution';
import type { P1ExecutionBlock } from '@/mocks/kosP1Execution';

export type P1ViewTab = 'dashboard' | 'bloc' | 'timeline' | 'milestones' | 'actions';
export type P1SortMode = 'priorite' | 'progression' | 'budget' | 'deadline';

export function useKOSP1Execution() {
  const [activeTab, setActiveTab] = useState<P1ViewTab>('dashboard');
  const [activeBlocId, setActiveBlocId] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<P1SortMode>('priorite');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedActions, setExpandedActions] = useState<Set<string>>(new Set());
  const [expandedBlocs, setExpandedBlocs] = useState<Set<string>>(new Set(P1_EXECUTION_BLOCKS.map(b => b.id)));
  const [isLive, setIsLive] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data: liveData, error: supabaseErr } = await supabase
        .from('kos_action_execution')
        .select('*')
        .eq('phase', 'phase2_p0p1');
      if (!supabaseErr && liveData && liveData.length > 0) {
        setIsLive(true);
      }
    } catch {
      // fallback mock
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const kpis = useMemo(() => computeP1ExecutionKPIs(), []);

  const sortedBlocs = useMemo(() => {
    const blocs = [...P1_EXECUTION_BLOCKS];
    if (sortMode === 'progression') blocs.sort((a, b) => a.progressionGlobale - b.progressionGlobale);
    else if (sortMode === 'budget') {
      const parseBudget = (s: string) => parseInt(s.replace(/[^0-9]/g, ''));
      blocs.sort((a, b) => parseBudget(b.budgetTotal) - parseBudget(a.budgetTotal));
    } else if (sortMode === 'deadline') {
      const getEarliest = (b: P1ExecutionBlock) => b.actions.map(a => a.deadline).sort()[0] || '';
      blocs.sort((a, b) => getEarliest(a).localeCompare(getEarliest(b)));
    }
    return blocs;
  }, [sortMode]);

  const activeBloc = useMemo(
    () => (activeBlocId ? P1_EXECUTION_BLOCKS.find(b => b.id === activeBlocId) || null : null),
    [activeBlocId],
  );

  const allActions = useMemo(() => {
    return sortedBlocs.flatMap(b =>
      b.actions.map(a => ({
        ...a,
        blocNom: b.nom,
        blocId: b.id,
        blocNumero: b.numero,
        blocCouleur: b.couleur,
        blocIcon: b.icon,
      }))
    );
  }, [sortedBlocs]);

  const milestones = useMemo(() => P1_GLOBAL_MILESTONES, []);
  const timeline = useMemo(() => P1_TIMELINE, []);
  const executiveSummary = useMemo(() => P1_EXECUTIVE_SUMMARY, []);

  const navigateToBloc = useCallback((blocId: string) => {
    setActiveBlocId(blocId);
    setActiveTab('bloc');
  }, []);

  const toggleActionExpanded = useCallback((actionId: string) => {
    setExpandedActions(prev => {
      const next = new Set(prev);
      if (next.has(actionId)) next.delete(actionId);
      else next.add(actionId);
      return next;
    });
  }, []);

  const toggleBlocExpanded = useCallback((blocId: string) => {
    setExpandedBlocs(prev => {
      const next = new Set(prev);
      if (next.has(blocId)) next.delete(blocId);
      else next.add(blocId);
      return next;
    });
  }, []);

  return {
    blocs: sortedBlocs,
    activeTab,
    setActiveTab,
    activeBloc,
    activeBlocId,
    navigateToBloc,
    sortMode,
    setSortMode,
    expandedActions,
    toggleActionExpanded,
    expandedBlocs,
    toggleBlocExpanded,
    allActions,
    milestones,
    timeline,
    executiveSummary,
    kpis,
    loading,
    error,
    refetch,
    isLive,
  };
}