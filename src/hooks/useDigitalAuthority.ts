import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  centresExcellence as mockCentres,
  backlinksInstitutionnels as mockBacklinks,
  citationsAcademiques as mockCitations,
  partenariats as mockPartenariats,
  digitalAuthorityKPIs as mockKPIs,
} from '@/mocks/kosDigitalAuthorityEngine';

export function useDigitalAuthority() {
  const [centres, setCentres] = useState(mockCentres);
  const [backlinks, setBacklinks] = useState(mockBacklinks);
  const [citations, setCitations] = useState(mockCitations);
  const [partenariats, setPartenariats] = useState(mockPartenariats);
  const [kpis, setKpis] = useState(mockKPIs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try fetching from Supabase - use existing tables where possible
      const queries = [
        supabase.from('regulatory_register').select('*').limit(1),
        supabase.from('partner_ecosystem_manager').select('*').limit(1),
      ];

      const results = await Promise.all(queries);
      const anyError = results.find(r => r.error);
      if (anyError?.error) throw anyError.error;

      // For now, use mock data (tables need to be created for this specific engine)
      setCentres(mockCentres);
      setBacklinks(mockBacklinks);
      setCitations(mockCitations);
      setPartenariats(mockPartenariats);
      setKpis(mockKPIs);
      setIsLive(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setCentres(mockCentres);
      setBacklinks(mockBacklinks);
      setCitations(mockCitations);
      setPartenariats(mockPartenariats);
      setKpis(mockKPIs);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    centres,
    backlinks,
    citations,
    partenariats,
    kpis,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}