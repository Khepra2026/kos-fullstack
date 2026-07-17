import { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { AUDIT_AXES, computeAuditFinalKPIs, ROADMAP_PRIORITAIRE } from '@/mocks/kosAuditFinalAnalysis';
import type { AuditAxe, AuditAction } from '@/mocks/kosAuditFinalAnalysis';

export type AFVueActive = 'dashboard' | 'axe' | 'actions' | 'roadmap' | 'synthese';

export function useKOSAuditFinalAnalysis() {
  const [vueActive, setVueActive] = useState<AFVueActive>('dashboard');
  const [axeSelectionne, setAxeSelectionne] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFiltersState] = useState<{ statut?: string | null; priorite?: string | null; axe?: string | null }>({ statut: null, priorite: null, axe: null });
  const [axes, setAxes] = useState<AuditAxe[]>(AUDIT_AXES);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const kpis = useMemo(() => computeAuditFinalKPIs(), []);
  const allActions = useMemo(() => axes.flatMap(a => a.actions.map(act => ({ ...act, axe: a }))), [axes]);
  const roadmap = ROADMAP_PRIORITAIRE;

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data: liveData, error: err } = await supabase
        .from('kos_action_execution')
        .select('*')
        .order('phase');
      if (!err && liveData && liveData.length > 0) {
        setIsLive(true);
      } else {
        setAxes(AUDIT_AXES);
        setIsLive(false);
      }
    } catch {
      setAxes(AUDIT_AXES);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const axeActuel = useMemo(() => axes.find(a => a.id === axeSelectionne) || null, [axes, axeSelectionne]);

  const actionsFiltrees = useMemo(() => {
    let filtered = allActions;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.action.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
    }
    if (filters.statut) filtered = filtered.filter(a => a.statut === filters.statut);
    if (filters.priorite) filtered = filtered.filter(a => a.priorite === filters.priorite);
    if (filters.axe) filtered = filtered.filter(a => a.axeId === filters.axe);
    return filtered;
  }, [allActions, searchQuery, filters]);

  const selectAxe = (id: string | null) => {
    setAxeSelectionne(id);
    if (id) setVueActive('axe');
    else setVueActive('dashboard');
  };

  const setFilter = (key: 'statut' | 'priorite' | 'axe', value: string | null) => {
    setFiltersState(prev => ({ ...prev, [key]: value === 'all' || value === '' ? null : value }));
  };

  const resetFilters = () => {
    setFiltersState({ statut: null, priorite: null, axe: null });
    setSearchQuery('');
  };

  return {
    axes, kpis, allActions, roadmap, actionsFiltrees, axeActuel,
    vueActive, setVueActive, axeSelectionne, selectAxe,
    filters, setFilter, resetFilters, searchQuery, setSearchQuery,
    isLive, loading, refetch,
  };
}