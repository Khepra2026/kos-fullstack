import { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// Types partagés — reflètent la structure DB
export interface action {
  id: string;
  phase: string;
  axeId: string;
  axeNom: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  standardVise: string;
  deadline: string;
  statut: 'a_faire' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiAction: string;
  dependances: string[];
  priorite: string | null;
  sprint: number;
  sortOrder: number;
}

export interface sprint {
  id: number;
  phase: string;
  numero: number;
  nom: string;
  periode: string;
  jours: number;
  actions: string[];
  objectif: string;
  couleur: string;
  progression: number;
  statut: 'a_venir' | 'en_cours' | 'termine';
}

export interface journalEntry {
  id: number;
  actionId: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'blocker';
  message: string;
}

export type P0VueActive = 'dashboard' | 'kanban' | 'sprints' | 'actions' | 'dependances';

const PHASE = 'phase1_p0';

const PHASE1_META = {
  titre: `Phase 1 Immédiate (P0) — 9 Actions Critiques`,
  version: `v1.0 LANCEMENT — 2026.06.26`,
  actionsTotal: 9,
  budgetTotal: `45 000 000 FCFA`,
  horizon: `90 jours (Juillet — Septembre 2026)`,
  gouvernance: `COMEX Hebdomadaire — Managing Partner + CTO + Growth Director + SEO Director + Creative Director`,
  messageCle: `La Phase 1 P0 lance l'exécution immédiate des 9 actions critiques identifiées par l'Audit Final. En 90 jours : positionnement formalisé, GEO lancée, CWV 100%, GSC zéro erreur, optimisation DB, qualité MECE/ISO, Design System V1. Budget : 45M FCFA. C'est le point de bascule vers l'excellence Big Four.`,
  risquePrincipal: `Le principal risque est la dispersion. 9 actions simultanées sur 4 axes nécessitent une coordination IRONCLAD. Le COMEX hebdomadaire est non-négociable.`,
  jalonFinal: `30 Septembre 2026 — Démo COMEX : les 9 actions P0 livrées et validées.`,
};

function computeKPIs(actions: action[], sprints: sprint[]) {
  const total = actions.length;
  const aFaire = actions.filter(a => a.statut === 'a_faire').length;
  const enCours = actions.filter(a => a.statut === 'en_cours').length;
  const termine = actions.filter(a => a.statut === 'termine').length;
  const bloque = actions.filter(a => a.statut === 'bloque').length;
  const progressionGlobale = total > 0 ? Math.round(actions.reduce((s, a) => s + a.progression, 0) / total) : 0;
  const sprintActuel = sprints.find(s => s.statut === 'en_cours') || sprints[0];

  return {
    actions_total: total,
    a_faire: aFaire,
    en_cours: enCours,
    termine,
    bloque,
    progression_globale: progressionGlobale,
    budget_total: '45 000 000 FCFA',
    sprints_actifs: sprints.filter(s => s.statut === 'en_cours').length,
    sprint_actuel: sprintActuel,
  };
}

export function useKOSPhase1P0Immediate() {
  const [vueActive, setVueActive] = useState<P0VueActive>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFiltersState] = useState<{ axeId?: string | null; sprint?: number | null; statut?: string | null }>({ axeId: null, sprint: null, statut: null });
  const [actions, setActions] = useState<action[]>([]);
  const [sprints, setSprints] = useState<sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const meta = PHASE1_META;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [actionsRes, sprintsRes] = await Promise.all([
        supabase.from('kos_action_execution').select('*').eq('phase', PHASE).order('sort_order'),
        supabase.from('kos_action_sprints').select('*').eq('phase', PHASE).order('numero'),
      ]);

      if (actionsRes.error) throw new Error(actionsRes.error.message);
      if (sprintsRes.error) throw new Error(sprintsRes.error.message);

      const rawActions = actionsRes.data || [];
      const rawSprints = sprintsRes.data || [];

      const mappedActions: action[] = rawActions.map((r: Record<string, unknown>) => ({
        id: r.id as string,
        phase: r.phase as string,
        axeId: r.axe_id as string,
        axeNom: r.axe_nom as string,
        action: r.action as string,
        description: r.description as string,
        effort: r.effort as string,
        budget: r.budget as string,
        responsable: r.responsable as string,
        kpi: r.kpi as string,
        standardVise: r.standard_vise as string,
        deadline: r.deadline as string,
        statut: (r.statut as action['statut']) || 'a_faire',
        progression: (r.progression as number) || 0,
        livrable: r.livrable as string,
        pourquoiAction: r.pourquoi_action as string,
        dependances: (r.dependances as string[]) || [],
        priorite: r.priorite as string | null,
        sprint: r.sprint as number,
        sortOrder: r.sort_order as number,
      }));

      const mappedSprints: sprint[] = rawSprints.map((r: Record<string, unknown>) => ({
        id: r.id as number,
        phase: r.phase as string,
        numero: r.numero as number,
        nom: r.nom as string,
        periode: r.periode as string,
        jours: r.jours as number,
        actions: (r.actions as string[]) || [],
        objectif: r.objectif as string,
        couleur: r.couleur as string,
        progression: (r.progression as number) || 0,
        statut: (r.statut as sprint['statut']) || 'a_venir',
      }));

      setActions(mappedActions);
      setSprints(mappedSprints);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const kpis = useMemo(() => computeKPIs(actions, sprints), [actions, sprints]);

  const actionsFiltrees = useMemo(() => {
    let filtered = actions;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.action.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
    }
    if (filters.axeId) filtered = filtered.filter(a => a.axeId === filters.axeId);
    if (filters.sprint) filtered = filtered.filter(a => a.sprint === filters.sprint);
    if (filters.statut) filtered = filtered.filter(a => a.statut === filters.statut);
    return filtered;
  }, [actions, searchQuery, filters]);

  const setFilter = (key: 'axeId' | 'sprint' | 'statut', value: string | number | null) => {
    setFiltersState(prev => ({ ...prev, [key]: value === 'all' || value === '' || value === -1 ? null : value }));
  };

  const resetFilters = () => {
    setFiltersState({ axeId: null, sprint: null, statut: null });
    setSearchQuery('');
  };

  const getActionById = (id: string): action | undefined => actions.find(a => a.id === id);

  const getSprintActions = (sprintNum: number): action[] => {
    const sprintActionIds = sprints.find(s => s.numero === sprintNum)?.actions || [];
    return actions.filter(a => sprintActionIds.includes(a.id));
  };

  const updateActionStatus = async (actionId: string, statut: action['statut']) => {
    const { error: updateError } = await supabase
      .from('kos_action_execution')
      .update({ statut, updated_at: new Date().toISOString() })
      .eq('id', actionId);
    if (updateError) {
      setToast('Erreur lors de la mise à jour');
      return;
    }
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, statut } : a));
    setToast(`Action ${actionId} arrow ${statut}`);
    setTimeout(() => setToast(null), 3000);
  };

  const updateActionProgression = async (actionId: string, progression: number) => {
    const { error: updateError } = await supabase
      .from('kos_action_execution')
      .update({ progression, updated_at: new Date().toISOString() })
      .eq('id', actionId);
    if (updateError) {
      setToast('Erreur lors de la mise à jour');
      return;
    }
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, progression } : a));
  };

  const addJournalEntry = async (actionId: string, type: journalEntry['type'], message: string) => {
    const { error: insertError } = await supabase
      .from('kos_action_journal')
      .insert({ action_id: actionId, date: new Date().toISOString().split('T')[0], type, message });
    if (insertError) {
      setToast('Erreur journal');
      return;
    }
    setToast(`Journal ajoute a ${actionId}`);
    setTimeout(() => setToast(null), 3000);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 5000);
  };

  return {
    actions, sprints, meta, kpis, actionsFiltrees,
    vueActive, setVueActive,
    filters, setFilter, resetFilters,
    searchQuery, setSearchQuery,
    getActionById, getSprintActions,
    loading, error, fetchData,
    toast, showToast,
    updateActionStatus, updateActionProgression, addJournalEntry,
  };
}



