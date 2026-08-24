import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface EvidenceRecord {
  id: string;
  type: string;
  titre: string;
  reference_id: string;
  horodatage: string;
  responsable: string;
  format: string;
  taille: string | null;
  url: string | null;
  tags: string[] | null;
  statut: string;
  validateur: string | null;
  date_validation: string | null;
  created_at: string;
}

export function useEvidenceLibrary() {
  const [data, setData] = useState<EvidenceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase
        .from('evidence_library')
        .select('*')
        .order('horodatage', { ascending: false });
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

  const validateEvidence = async (id: string, validateur: string) => {
    const { data: row, error: err } = await supabase
      .from('evidence_library')
      .update({ statut: 'valide', validateur, date_validation: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (err) throw err;
    setData(prev => prev.map(d => (d.id === id ? row : d)));
    return row;
  };

  const stats = data.reduce(
    (acc, ev) => {
      acc.total++;
      acc[ev.type] = (acc[ev.type] || 0) + 1;
      if (ev.statut === 'valide') acc.validees++;
      else if (ev.statut === 'en_attente') acc.en_attente++;
      return acc;
    },
    { total: 0, validees: 0, en_attente: 0 } as Record<string, number>
  );

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    validateEvidence,
    stats,
  };
}



