import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface RemediationLog {
  id: string;
  reference_id: string;
  ancien_texte: string;
  nouveau_texte: string;
  type_correction: string;
  fichier_source: string;
  date_correction: string;
  statut: string;
  verifie_par: string | null;
  preuve: string | null;
  created_at: string;
}

export function useRemediationLogs() {
  const [data, setData] = useState<RemediationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase
        .from('remediation_logs')
        .select('*')
        .order('date_correction', { ascending: false });
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

  const addLog = async (log: Omit<RemediationLog, 'id' | 'created_at'>) => {
    const { data: row, error: err } = await supabase
      .from('remediation_logs')
      .insert(log)
      .select()
      .single();
    if (err) throw err;
    setData(prev => [row, ...prev]);
    return row;
  };

  const stats = data.reduce(
    (acc, log) => {
      acc.total++;
      acc[log.statut] = (acc[log.statut] || 0) + 1;
      return acc;
    },
    { total: 0 } as Record<string, number>
  );

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    addLog,
    stats,
  };
}



