import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TACHES_RESTANTES_100, computeTasksRestantes100KPIs, type BlocTachesRestantes, type TacheRestante } from '@/mocks/kosTasksRestantes100';

export type VueActive = 'dashboard' | 'bloc' | 'taches' | 'standards' | 'timeline';

export interface FilterState {
  blocId: string | null;
  statut: string | null;
  standard: string | null;
}

export function useKOSTasksRestantes100() {
  const [vueActive, setVueActive] = useState<VueActive>('dashboard');
  const [blocSelectionne, setBlocSelectionne] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({ blocId: null, statut: null, standard: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function checkLive() {
      try {
        const { data, error } = await supabase
          .from('kos_action_execution')
          .select('*')
          .limit(1);
        if (!cancelled && !error && data && data.length > 0) {
          setIsLive(true);
        }
      } catch {
        // fallback mock
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    checkLive();
    return () => { cancelled = true; };
  }, []);

  const blocs = TACHES_RESTANTES_100;
  const kpis = useMemo(() => computeTasksRestantes100KPIs(), []);

  const allTaches = useMemo(() => blocs.flatMap(b => b.taches.map(t => ({ ...t, bloc: b }))), [blocs]);
  const allStandards = useMemo(() => blocs.flatMap(b => b.standards.map(s => ({ ...s, bloc: b }))), [blocs]);

  const tachesFiltrees = useMemo(() => {
    let result = allTaches;
    if (filters.blocId) result = result.filter(t => t.bloc.id === filters.blocId);
    if (filters.statut) result = result.filter(t => t.statut === filters.statut);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.action.toLowerCase().includes(q)
        || t.description.toLowerCase().includes(q)
        || t.standardVise.toLowerCase().includes(q)
        || t.bloc.nom.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allTaches, filters, searchQuery]);

  const blocActuel = useMemo(() => {
    return blocSelectionne ? blocs.find(b => b.id === blocSelectionne) || null : null;
  }, [blocSelectionne, blocs]);

  const selectBloc = (id: string | null) => {
    setBlocSelectionne(id);
    setFilters(prev => ({ ...prev, blocId: id }));
    if (id) setVueActive('bloc');
  };

  const setFilter = (key: keyof FilterState, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ blocId: null, statut: null, standard: null });
    setSearchQuery('');
  };

  return {
    blocs,
    kpis,
    allTaches,
    allStandards,
    tachesFiltrees,
    blocActuel,
    vueActive,
    setVueActive,
    blocSelectionne,
    selectBloc,
    filters,
    setFilter,
    resetFilters,
    searchQuery,
    setSearchQuery,
    isLive,
    loading,
  };
}