import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { competencyModules as mockModules, allPillars } from '@/mocks/competencySeeding';

export interface CompetencyModule {
  id: string;
  module_key: string;
  titre: string;
  objectif: string;
  livrable_attendu: string;
  pilier_bigfour: string[];
  approche_cible: string;
  approche_obsolete: string;
  protocoles_action: { etape: number; action: string; description: string; outil: string; delai: string }[];
  maturite_score: number;
  statut: string;
  version: number;
  references_json?: any;
}

export interface SeedResult {
  success: boolean;
  modules?: { module_key: string; status: string; version: number }[];
  cross_pillar_evolutions?: { module_key: string; cross_references: string[]; shared_pillars: string[]; evolution_potential: number }[];
  pillar_coverage?: { pillar: string; status: string; covered_by?: string | string[]; recommendation?: string }[];
  evolutions?: any[];
  error?: string;
}

export function useKOSCompetencySeeding() {
  const [modules, setModules] = useState<CompetencyModule[]>(mockModules);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seedingResult, setSeedingResult] = useState<SeedResult | null>(null);
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchModules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('kos_competency_modules')
        .select('*')
        .order('maturite_score', { ascending: false });

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        const mapped: CompetencyModule[] = (data as any[]).map((d) => ({
          id: d.id,
          module_key: d.module_key,
          titre: d.titre,
          objectif: d.objectif,
          livrable_attendu: d.livrable_attendu,
          pilier_bigfour: d.pilier_bigfour || [],
          approche_cible: d.approche_cible || '',
          approche_obsolete: d.approche_obsolete || '',
          protocoles_action: d.protocoles_action || [],
          maturite_score: d.maturite_score || 50,
          statut: d.statut || 'seeded',
          version: d.version || 1,
          references_json: d.references_json || null,
        }));
        setModules(mapped);
        setIsLive(true);
      } else {
        setModules(mockModules);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setModules(mockModules);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const fullSeed = useCallback(async () => {
    setSeedingLoading(true);
    setSeedingResult(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke<SeedResult>(
        'kos-auto-development-seed',
        { body: { action: 'full_seed' } }
      );
      if (fnError) throw fnError;
      setSeedingResult(result);
      await fetchModules();
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSeedingResult({ success: false, error: msg });
      return { success: false, error: msg };
    } finally {
      setSeedingLoading(false);
    }
  }, [fetchModules]);

  const autoEvolve = useCallback(async () => {
    setSeedingLoading(true);
    setSeedingResult(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke<SeedResult>(
        'kos-auto-development-seed',
        { body: { action: 'auto_evolve' } }
      );
      if (fnError) throw fnError;
      setSeedingResult(result);
      await fetchModules();
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSeedingResult({ success: false, error: msg });
      return { success: false, error: msg };
    } finally {
      setSeedingLoading(false);
    }
  }, [fetchModules]);

  const crossPillarAudit = useCallback(async () => {
    setSeedingLoading(true);
    setSeedingResult(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke<SeedResult>(
        'kos-auto-development-seed',
        { body: { action: 'cross_pillar_audit' } }
      );
      if (fnError) throw fnError;
      setSeedingResult(result);
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSeedingResult({ success: false, error: msg });
      return { success: false, error: msg };
    } finally {
      setSeedingLoading(false);
    }
  }, []);

  const overallMaturity = modules.length > 0
    ? Math.round(modules.reduce((acc, m) => acc + m.maturite_score, 0) / modules.length)
    : 0;

  const getModuleByKey = useCallback(
    (key: string) => modules.find((m) => m.module_key === key),
    [modules],
  );

  return {
    modules,
    allPillars,
    loading,
    error,
    isLive,
    seedingResult,
    seedingLoading,
    overallMaturity,
    fetchModules,
    fullSeed,
    autoEvolve,
    crossPillarAudit,
    getModuleByKey,
  };
}



