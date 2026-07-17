import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { esgMaterialiteMock } from '@/mocks/esgMaterialite';
import ESGStatsCards from './components/ESGStatsCards';
import ESGMaterialityMatrix from './components/ESGMaterialityMatrix';
import ESGISSBKPIs from './components/ESGISSBKPIs';
import ESGImprovementPlan from './components/ESGImprovementPlan';

interface Enjeu {
  enjeu: string;
  categorie: string;
  impact_financier: number;
  impact_durabilite: number;
  quadrant: string;
  description: string;
}

interface ESGData {
  matrice_materialite: Enjeu[];
  indicateurs_issb_s1: Record<string, unknown>;
  indicateurs_issb_s2: Record<string, unknown>;
  plan_amelioration: {
    plan_amelioration: Array<{
      phase: string;
      actions: string[];
      budget_estime_fcfa: number;
      responsable: string;
      kpis_cibles: string[];
    }>;
    date_generation: string;
  };
  meta: {
    entite_id: string;
    date_analyse: string;
    nb_enjeux: number;
    score_moyen_f: number;
    score_moyen_d: number;
  };
}

export default function ESGDashboardPage() {
  const [data, setData] = useState<ESGData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState(false);

  const entiteId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('kos_esg_materialite', {
        p_entite_id: entiteId,
      });

      if (rpcError || !rpcData) {
        throw rpcError || new Error('Aucune donnée retournée');
      }

      const parsed = rpcData as ESGData;
      setData(parsed);
      setUsingMock(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de chargement';
      if (import.meta.env.DEV) {
        console.warn('[ESG Dashboard] Fallback mock:', message);
      }
      setData(esgMaterialiteMock as unknown as ESGData);
      setUsingMock(true);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [entiteId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = data
    ? {
        nb_enjeux: data.meta.nb_enjeux,
        score_moyen_f: data.meta.score_moyen_f,
        score_moyen_d: data.meta.score_moyen_d,
        prioritaires: data.matrice_materialite.filter((e) => e.quadrant === 'Prioritaire').length,
        financiers: data.matrice_materialite.filter((e) => e.quadrant === 'Financier').length,
        durabilite: data.matrice_materialite.filter((e) => e.quadrant === 'Durabilite').length,
        veille: data.matrice_materialite.filter((e) => e.quadrant === 'Veille').length,
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary-300 border-t-primary-500 rounded-full animate-spin"></div>
              <span className="text-sm text-foreground-500 font-body">
                Analyse double matérialité ISSB S1/S2 en cours...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-error-warning-line text-red-500"></i>
              <span className="text-sm font-bold text-red-700 font-body">Erreur de chargement ESG</span>
            </div>
            <p className="text-xs text-red-600 font-body">{error || 'Données indisponibles'}</p>
            <button
              onClick={fetchData}
              className="mt-2 px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors cursor-pointer font-body"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <div className="border-b border-background-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 font-body">
                  ISSB S1/S2
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-700 border border-primary-200 font-body">
                  Double Matérialité
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-100 text-secondary-700 border border-secondary-200 font-body">
                  KOS ESG Engine
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground-950 font-heading">
                Dashboard ESG — Analyse Double Matérialité
              </h1>
              <p className="text-sm text-foreground-500 font-body mt-1 max-w-2xl">
                Matrice de matérialité, indicateurs ISSB S1 (Climat) et S2 (Social), et plan d'amélioration généré par IA
                pour l'alignement réglementaire UEMOA/CEMAC.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {usingMock && (
                <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 font-body">
                  Mode démo
                </span>
              )}
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-background-200/70 bg-background-50 text-xs text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer font-body"
              >
                <i className="ri-refresh-line"></i>
                Actualiser
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-foreground-400 font-body">
            <span>
              <i className="ri-building-line mr-1"></i>
              Entité : {data.meta.entite_id.slice(0, 8)}...
            </span>
            <span>
              <i className="ri-time-line mr-1"></i>
              Analyse :{' '}
              {new Date(data.meta.date_analyse).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Stats */}
        {stats && <ESGStatsCards stats={stats} />}

        {/* Matrix */}
        <ESGMaterialityMatrix enjeux={data.matrice_materialite} />

        {/* KPIs */}
        <ESGISSBKPIs
          s1={data.indicateurs_issb_s1 as Record<string, unknown>}
          s2={data.indicateurs_issb_s2 as Record<string, unknown>}
        />

        {/* Plan */}
        <ESGImprovementPlan plan={data.plan_amelioration} />
      </div>
    </div>
  );
}