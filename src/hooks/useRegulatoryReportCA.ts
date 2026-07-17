import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface CAReport {
  period: string;
  generated_at: string;
  titre: string;
  executive_summary: {
    score_global_conformite: number;
    total_textes_references: number;
    actions_ouvertes: number;
    actions_critiques: number;
    preuves_collectees: number;
    preuves_validees: number;
    preuves_en_attente: number;
    alertes_non_traitees: number;
    recommandation: string;
  };
  scores_par_domaine: Array<{
    domaine: string;
    score_moyen: number;
    total_textes: number;
    conformes: number;
    partiels: number;
    non_conformes: number;
    gaps_critiques: number;
  }>;
  actions_critiques_ouvertes: Array<{
    id: string;
    reference: string;
    type: string;
    ancien_texte: string;
    nouveau_texte: string;
    fichier: string;
    date: string;
    statut: string;
  }>;
  preuves_audit: Array<{
    id: string;
    type: string;
    titre: string;
    reference: string;
    statut: string;
    horodatage: string;
    responsable: string;
  }>;
  alertes_veille: Array<{
    id: string;
    source: string;
    autorite: string;
    titre: string;
    severite: string;
    date_detection: string;
  }>;
}

export function useRegulatoryReportCA() {
  const [data, setData] = useState<CAReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (month?: string, year?: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: err } = await supabase
        .rpc('generate_regulatory_report_ca', {
          report_month: month || null,
          report_year: year || null,
        });
      if (err) throw err;
      setData(result as CAReport);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de génération');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    generateReport,
  };
}