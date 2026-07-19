import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { DomainAssessment, CorrectiveAction, RiskMatrixItem, RoadmapPhase, ReadinessReport } from '@/mocks/bigFourMaturityAssessment';
import {
  roadmap12Mois as mockRoadmap12,
  roadmap24Mois as mockRoadmap24,
  roadmap36Mois as mockRoadmap36,
  readinessReport as mockReport,
  maturityKPIs as mockKPIs,
} from '@/mocks/bigFourMaturityAssessment';

type SupabaseDomain = {
  id: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  description: string;
  score_actuel: number;
  score_cible: number;
  ecart: number;
  standard_reference: string;
  gap_analysis: string;
  kpis: { nom: string; valeur: number; cible: number }[];
};

type SupabaseAction = {
  id: string;
  domain_id: string;
  action: string;
  description: string;
  budget: string;
  planning: string;
  responsable: string;
  kpi: string;
  priorite: string;
  statut: string | null;
  progression: number | null;
};

type SupabaseRisk = {
  id: string;
  domaine: string;
  risque: string;
  probabilite: number;
  impact: number;
  score: number;
  mitigation: string;
  statut: string;
};

export type ActionStatut = 'a_faire' | 'en_cours' | 'termine' | 'bloque';

export interface BigFourExecutionKPIs {
  total: number;
  a_faire: number;
  en_cours: number;
  termine: number;
  bloque: number;
  progression_globale: number;
}

function parseStatut(raw: string | null): ActionStatut {
  if (!raw) return 'a_faire';
  const valid = ['a_faire', 'en_cours', 'termine', 'bloque'];
  return valid.includes(raw) ? (raw as ActionStatut) : 'a_faire';
}

export function useBigFourMaturity() {
  const [domains, setDomains] = useState<DomainAssessment[]>([]);
  const [allActions, setAllActions] = useState<CorrectiveAction[]>([]);
  const [risks, setRisks] = useState<RiskMatrixItem[]>([]);
  const [roadmap12, setRoadmap12] = useState<RoadmapPhase[]>(mockRoadmap12);
  const [roadmap24, setRoadmap24] = useState<RoadmapPhase[]>(mockRoadmap24);
  const [roadmap36, setRoadmap36] = useState<RoadmapPhase[]>(mockRoadmap36);
  const [report, setReport] = useState<ReadinessReport>(mockReport);
  const [kpis, setKpis] = useState(mockKPIs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const computeExecutionKPIs = useCallback((actions: CorrectiveAction[]): BigFourExecutionKPIs => {
    const aFaire = actions.filter(a => a.statut === 'a_faire').length;
    const enCours = actions.filter(a => a.statut === 'en_cours').length;
    const termine = actions.filter(a => a.statut === 'termine').length;
    const bloque = actions.filter(a => a.statut === 'bloque').length;
    const prog = actions.length > 0 ? Math.round(actions.reduce((acc, a) => acc + a.progression, 0) / actions.length) : 0;
    return { total: actions.length, a_faire: aFaire, en_cours: enCours, termine, bloque, progression_globale: prog };
  }, []);

  const [execKPIs, setExecKPIs] = useState<BigFourExecutionKPIs>({ total: 0, a_faire: 0, en_cours: 0, termine: 0, bloque: 0, progression_globale: 0 });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [domainsRes, actionsRes, risksRes] = await Promise.all([
        supabase.from('kos_bigfour_domains').select('*').order('score_actuel', { ascending: false }),
        supabase.from('kos_bigfour_corrective_actions').select('*'),
        supabase.from('kos_bigfour_risk_matrix').select('*'),
      ]);

      if (domainsRes.error) throw domainsRes.error;
      if (actionsRes.error) throw actionsRes.error;
      if (risksRes.error) throw risksRes.error;

      const rawDomains = (domainsRes.data || []) as SupabaseDomain[];
      const rawActions = (actionsRes.data || []) as SupabaseAction[];
      const rawRisks = (risksRes.data || []) as SupabaseRisk[];

      const flatActions: CorrectiveAction[] = rawActions.map((a) => ({
        id: a.id,
        action: a.action,
        description: a.description,
        budget: a.budget,
        planning: a.planning,
        responsable: a.responsable,
        kpi: a.kpi,
        priorite: (a.priorite === 'critique' ? 'critique' : a.priorite === 'haute' ? 'haute' : 'moyenne') as CorrectiveAction['priorite'],
        statut: parseStatut(a.statut),
        progression: a.progression ?? 0,
      }));

      const mergedDomains: DomainAssessment[] = rawDomains.map((d) => {
        const domainActions = flatActions.filter((a) => {
          const rawA = rawActions.find(ra => ra.id === a.id);
          return rawA?.domain_id === d.id;
        });

        return {
          id: d.id,
          nom: d.nom,
          acronyme: d.acronyme,
          icon: d.icon,
          couleur: d.couleur,
          description: d.description,
          score_actuel: d.score_actuel,
          score_cible: d.score_cible,
          ecart: d.ecart,
          standard_reference: d.standard_reference,
          gap_analysis: d.gap_analysis,
          actions_correctives: domainActions,
          kpis: (d.kpis || []).map((k) => ({
            nom: k.nom,
            valeur: typeof k.valeur === 'number' ? k.valeur : 0,
            cible: typeof k.cible === 'number' ? k.cible : 100,
          })),
        };
      });

      const mappedRisks: RiskMatrixItem[] = rawRisks.map((r) => ({
        id: r.id,
        domaine: r.domaine,
        risque: r.risque,
        probabilite: r.probabilite,
        impact: r.impact,
        score: r.score,
        mitigation: r.mitigation,
        statut: (r.statut === 'actif' ? 'actif' : r.statut === 'mitige' ? 'mitige' : 'resolu') as RiskMatrixItem['statut'],
      }));

      const realScore = mergedDomains.length > 0
        ? parseFloat((mergedDomains.reduce((acc, d) => acc + d.score_actuel, 0) / mergedDomains.length).toFixed(1))
        : mockKPIs.score_global;

      setDomains(mergedDomains);
      setAllActions(flatActions);
      setRisks(mappedRisks);
      setExecKPIs(computeExecutionKPIs(flatActions));
      setReport({
        ...mockReport,
        score_global: realScore,
        domaines_scores: mergedDomains.map((d) => ({ domaine: d.nom, score: d.score_actuel })),
      });
      setKpis({
        ...mockKPIs,
        score_global: realScore,
        domaines_total: mergedDomains.length,
        domaines_excellence: mergedDomains.filter((d) => d.score_actuel >= 95).length,
        domaines_surveillance: mergedDomains.filter((d) => d.score_actuel >= 85 && d.score_actuel < 95).length,
        domaines_action: mergedDomains.filter((d) => d.score_actuel < 85).length,
        actions_correctives_total: rawActions.length,
        actions_critiques: rawActions.filter((a) => a.priorite === 'critique').length,
        actions_hautes: rawActions.filter((a) => a.priorite === 'haute').length,
        actions_moyennes: rawActions.filter((a) => a.priorite === 'moyenne').length,
      });
      setRoadmap12(mockRoadmap12);
      setRoadmap24(mockRoadmap24);
      setRoadmap36(mockRoadmap36);
      setIsLive(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, [computeExecutionKPIs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateActionStatus = useCallback(async (actionId: string, statut: string, progression?: number) => {
    const payload: Record<string, unknown> = { statut, updated_at: new Date().toISOString() };
    if (progression !== undefined) payload.progression = progression;

    const { error: updateErr } = await supabase
      .from('kos_bigfour_corrective_actions')
      .update(payload)
      .eq('id', actionId);

    if (updateErr) throw updateErr;

    await fetchData();
  }, [fetchData]);

  const updateActionProgression = useCallback(async (actionId: string, progression: number) => {
    await updateActionStatus(actionId, undefined as unknown as string, progression);
  }, [updateActionStatus]);

  const bulkStartAll = useCallback(async () => {
    const aFaire = allActions.filter(a => a.statut === 'a_faire');
    if (aFaire.length === 0) { showToast('Aucune action à lancer.'); return; }
    const ids = aFaire.map(a => a.id);
    const { error: err } = await supabase
      .from('kos_bigfour_corrective_actions')
      .update({ statut: 'en_cours', updated_at: new Date().toISOString() })
      .in('id', ids);
    if (err) throw err;
    await fetchData();
    showToast(`${ids.length} actions Big Four lancées en bloc !`);
  }, [allActions, fetchData, showToast]);

  const bulkCompleteAll = useCallback(async () => {
    const enCours = allActions.filter(a => a.statut === 'en_cours');
    if (enCours.length === 0) { showToast('Aucune action en cours.'); return; }
    const ids = enCours.map(a => a.id);
    const { error: err } = await supabase
      .from('kos_bigfour_corrective_actions')
      .update({ statut: 'termine', progression: 100, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (err) throw err;
    await fetchData();
    showToast(`${ids.length} actions Big Four terminées en bloc !`);
  }, [allActions, fetchData, showToast]);

  const bulkResetAll = useCallback(async () => {
    const notPending = allActions.filter(a => a.statut !== 'a_faire');
    if (notPending.length === 0) { showToast('Aucune action à réinitialiser.'); return; }
    const ids = notPending.map(a => a.id);
    const { error: err } = await supabase
      .from('kos_bigfour_corrective_actions')
      .update({ statut: 'a_faire', progression: 0, updated_at: new Date().toISOString() })
      .in('id', ids);
    if (err) throw err;
    await fetchData();
    showToast(`${ids.length} actions Big Four réinitialisées`);
  }, [allActions, fetchData, showToast]);

  const getActionsByDomain = useCallback((domainId: string): CorrectiveAction[] => {
    const domain = domains.find(d => d.id === domainId);
    return domain?.actions_correctives || [];
  }, [domains]);

  return {
    domains,
    allActions,
    risks,
    roadmap12,
    roadmap24,
    roadmap36,
    report,
    kpis,
    execKPIs,
    isLive,
    loading,
    error,
    toast,
    refetch: fetchData,
    updateActionStatus,
    updateActionProgression,
    bulkStartAll,
    bulkCompleteAll,
    bulkResetAll,
    getActionsByDomain,
    showToast,
  };
}



