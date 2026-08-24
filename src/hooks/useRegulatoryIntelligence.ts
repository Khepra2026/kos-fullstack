import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface IntelligenceFeed {
  id: string;
  source: string;
  autorite: string;
  titre: string;
  reference: string | null;
  date_publication: string | null;
  type_evenement: string;
  resume: string | null;
  severite: string;
  url_source: string | null;
  date_detection: string;
  traite: boolean;
  created_at: string;
}

export function useRegulatoryIntelligence() {
  const [data, setData] = useState<IntelligenceFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: err } = await supabase
        .from('regulatory_intelligence_feed')
        .select('*')
        .order('date_detection', { ascending: false })
        .limit(50);
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

  const markAsProcessed = async (id: string) => {
    const { error: err } = await supabase
      .from('regulatory_intelligence_feed')
      .update({ traite: true })
      .eq('id', id);
    if (err) throw err;
    setData(prev => prev.map(d => (d.id === id ? { ...d, traite: true } : d)));
  };

  const stats = data.reduce(
    (acc, item) => {
      acc.total++;
      if (item.traite) acc.traitees++;
      else acc.non_traitees++;
      if (item.severite === 'warning') acc.warnings++;
      return acc;
    },
    { total: 0, traitees: 0, non_traitees: 0, warnings: 0 }
  );

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    markAsProcessed,
    stats,
  };
}



