import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { PARTENAIRES, PARTNERSHIP_AGENTS, PARTNERSHIP_GLOBAL_METRICS, type Partenaire, type PartnershipAgent } from '@/mocks/kosBloc06PartnershipEngine';

interface UsePartnershipEngineReturn {
  partenaires: Partenaire[];
  agents: PartnershipAgent[];
  globalMetrics: typeof PARTNERSHIP_GLOBAL_METRICS;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function mapDbPartner(db: Record<string, unknown>): Partenaire {
  return {
    id: db.id as string,
    nom: (db.partner_name as string) || (db.name as string) || '',
    type: (db.partner_type as Partenaire['type']) || 'Cabinet international',
    pays: (db.country as string) || '',
    score_compatibilite: Number(db.compatibility_score) || Number(db.match_score) || 75,
    statut: ((db.status as string) === 'active' ? 'Actif' : (db.status as string) === 'negotiating' ? 'En discussion' : 'Identifié') as Partenaire['statut'],
    missions_conjointes: Number(db.collaborations_count) || Number(db.joint_missions) || 0,
    valeur_pipeline_fcfa: Number(db.pipeline_value_fcfa) || 0,
    contact_etabli: Boolean(db.contact_established) || false,
  };
}

export function usePartnershipEngine(): UsePartnershipEngineReturn {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [agents] = useState<PartnershipAgent[]>(PARTNERSHIP_AGENTS);
  const [globalMetrics, setGlobalMetrics] = useState(PARTNERSHIP_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: dbErr } = await supabase
        .from('partner_ecosystem_manager')
        .select('*')
        .order('compatibility_score', { ascending: false });

      if (dbErr) throw dbErr;

      if (data && data.length > 0) {
        const livePartenaires: Partenaire[] = (data as Record<string, unknown>[]).map(mapDbPartner);

        const actifs = livePartenaires.filter((p) => p.statut === 'Actif').length;
        const enDiscussion = livePartenaires.filter((p) => p.statut === 'En discussion').length;
        const totalPipeline = livePartenaires.reduce((sum, p) => sum + p.valeur_pipeline_fcfa, 0);
        const totalMissions = livePartenaires.reduce((sum, p) => sum + p.missions_conjointes, 0);
        const avgScore = Math.round(livePartenaires.reduce((sum, p) => sum + p.score_compatibilite, 0) / livePartenaires.length);

        setPartenaires(livePartenaires);
        setGlobalMetrics({
          ...PARTNERSHIP_GLOBAL_METRICS,
          partenaires_actifs: actifs,
          en_discussion: enDiscussion,
          score_compatibilite_moyen: avgScore,
          missions_conjointes_total: totalMissions,
          pipeline_conjoint_fcfa: totalPipeline,
          score_global: Math.round((avgScore + actifs * 2) / 2),
          certification: 'AAAA — Big Four Supreme — Partnership Engine LIVE DB',
        });
        setIsLive(true);
      } else {
        setPartenaires(PARTENAIRES);
        setGlobalMetrics(PARTNERSHIP_GLOBAL_METRICS);
        setIsLive(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setPartenaires(PARTENAIRES);
      setGlobalMetrics(PARTNERSHIP_GLOBAL_METRICS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { partenaires, agents, globalMetrics, isLive, loading, error, refetch: fetchData };
}