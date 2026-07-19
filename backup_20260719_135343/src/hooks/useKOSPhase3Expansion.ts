import { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { action, sprint, journalEntry } from '@/hooks/useKOSPhase1P0Immediate';

export type P3VueActive = 'dashboard' | 'kanban' | 'sprints' | 'actions' | 'dependances';

const PHASE = 'phase3_expansion';

const PHASE3_META = {
  titre: `Phase 3 — Expansion & Domination Continentale`,
  version: `v1.0 LANCEMENT — 2026.06.26`,
  actionsTotal: 8,
  budgetTotal: `32 500 000 FCFA`,
  horizon: `180 jours (Février — Juillet 2027)`,
  gouvernance: `COMEX Mensuel Stratégique + Hebdo Opérationnel — Managing Partner + Growth Director + Knowledge Manager + CTO + Marketing Director`,
  messageCle: `La Phase 3 marque le basculement définitif de KOS : de la correction et l'optimisation (Phases 1-2) vers l'expansion et la domination continentale. 8 actions stratégiques. Budget 32.5M FCFA.`,
  risquePrincipal: `L'expansion géographique + le lancement simultané de l'Academy et du Summit = dispersion possible des ressources.`,
  jalonFinal: `31 Juillet 2027 — KOS Regulatory Summit Africa 1ère édition + Dashboard Exécutif Live.`,
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
    budget_total_millions: 32.5,
    sprint_actuel: sprintActuel,
  };
}

export function useKOSPhase3Expansion() {
  const [vueActive, setVueActive] = useState<P3VueActive>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtreSprint, setFiltreSprint] = useState<number | null>(null);
  const [filtreStatut, setFiltreStatut] = useState<string | null>(null);
  const [actionExpanded, setActionExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [actions, setActions] = useState<action[]>([]);
  const [sprints, setSprints] = useState<sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const meta = PHASE3_META;

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
      filtered = filtered.filter(a =>
        a.id.toLowerCase().includes(q) ||
        a.action.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.axeNom.toLowerCase().includes(q)
      );
    }
    if (filtreSprint !== null) filtered = filtered.filter(a => a.sprint === filtreSprint);
    if (filtreStatut) filtered = filtered.filter(a => a.statut === filtreStatut);
    return filtered;
  }, [actions, searchQuery, filtreSprint, filtreStatut]);

  const resetFilters = () => {
    setSearchQuery('');
    setFiltreSprint(null);
    setFiltreStatut(null);
  };

  const toggleActionExpand = (id: string) => {
    setActionExpanded(prev => prev === id ? null : id);
  };

  const getDependancesBloquantes = (): { from: string; to: string[] }[] => {
    const map: Record<string, string[]> = {};
    actions.forEach(a => {
      a.dependances.forEach(dep => {
        if (!map[dep]) map[dep] = [];
        map[dep].push(a.id);
      });
    });
    return Object.entries(map).map(([from, to]) => ({ from, to }));
  };

  const dependancesBloquantes = useMemo(() => getDependancesBloquantes(), [actions]);
  const actionsSansDependance = useMemo(() => actions.filter(a => a.dependances.length === 0), [actions]);
  const actionsAvecDependance = useMemo(() => actions.filter(a => a.dependances.length > 0), [actions]);

  const getSprintActions = (sprintNum: number): action[] => {
    const sprintActionIds = sprints.find(s => s.numero === sprintNum)?.actions || [];
    return actions.filter(a => sprintActionIds.includes(a.id));
  };

  const updateActionStatus = async (actionId: string, statut: action['statut']) => {
    const { error: updateError } = await supabase
      .from('kos_action_execution')
      .update({ statut, updated_at: new Date().toISOString() })
      .eq('id', actionId);
    if (updateError) return;
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, statut } : a));
    setToast(`Action ${actionId} arrow ${statut}`);
    setTimeout(() => setToast(null), 3000);
  };

  const updateActionProgression = async (actionId: string, progression: number) => {
    const { error: updateError } = await supabase
      .from('kos_action_execution')
      .update({ progression, updated_at: new Date().toISOString() })
      .eq('id', actionId);
    if (updateError) return;
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, progression } : a));
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 5000);
  };

  return {
    actions, sprints, meta, kpis,
    vueActive, setVueActive,
    actionsFiltrees,
    searchQuery, setSearchQuery,
    filtreSprint, setFiltreSprint,
    filtreStatut, setFiltreStatut,
    resetFilters,
    actionExpanded, toggleActionExpand,
    dependancesBloquantes,
    actionsSansDependance,
    actionsAvecDependance,
    toast, showToast,
    getSprintActions,
    loading, error, fetchData,
    updateActionStatus, updateActionProgression,
  };
}



