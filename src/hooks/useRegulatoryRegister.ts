import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface RegulatoryRegisterEntry {
  id: string;
  reference: string;
  autorite: string;
  domaine: string;
  date_publication: string;
  date_modification: string | null;
  titre: string;
  exigence: string | null;
  obligations: string[] | null;
  preuves_requises: string[] | null;
  statut_texte: string;
  statut_conformite: string;
  niveau_risque: string;
  composants_kos: string[] | null;
  articles_associes: string[] | null;
  score_conformite: number;
  texte_remplace_par: string | null;
  created_at: string;
  updated_at: string;
}

export interface DomainStats {
  domaine: string;
  total: number;
  conformes: number;
  partiels: number;
  non_conformes: number;
  score_moyen: number;
}

export function useRegulatoryRegister() {
  const [data, setData] = useState<RegulatoryRegisterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase
        .from('regulatory_register')
        .select('*')
        .order('score_conformite', { ascending: false });
      if (err) throw err;
      setData(rows || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = data.reduce(
    (acc, entry) => {
      acc.total++;
      if (entry.statut_conformite === 'conforme') acc.conformes++;
      else if (entry.statut_conformite === 'partiel') acc.partiels++;
      else acc.non_conformes++;
      acc.score_total += entry.score_conformite;
      return acc;
    },
    { total: 0, conformes: 0, partiels: 0, non_conformes: 0, score_total: 0 }
  );

  const domainStats: DomainStats[] = Object.entries(
    data.reduce<Record<string, DomainStats>>((acc, entry) => {
      const d = entry.domaine;
      if (!acc[d]) {
        acc[d] = {
          domaine: d,
          total: 0,
          conformes: 0,
          partiels: 0,
          non_conformes: 0,
          score_moyen: 0,
        };
      }
      acc[d].total++;
      if (entry.statut_conformite === 'conforme') acc[d].conformes++;
      else if (entry.statut_conformite === 'partiel') acc[d].partiels++;
      else acc[d].non_conformes++;
      acc[d].score_moyen += entry.score_conformite;
      return acc;
    }, {})
  ).map(([, v]) => ({
    ...v,
    score_moyen: Math.round(v.score_moyen / v.total),
  }));

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    stats,
    domainStats,
  };
}