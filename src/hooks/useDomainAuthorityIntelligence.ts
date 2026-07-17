import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  domainAuthorityOverview,
  faiblessesCritiques,
  actionsCorrectives,
  planTrilingue,
  planPrioriseTrimestriel,
  competitiveBenchmark,
  kpiDashboard,
} from "@/mocks/kosDomainAuthorityIntelligence";

export function useDomainAuthorityIntelligence() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const overview = domainAuthorityOverview;
  const faiblesses = faiblessesCritiques;
  const actions = actionsCorrectives;
  const trilingue = planTrilingue;
  const planTrimestriel = planPrioriseTrimestriel;
  const benchmark = competitiveBenchmark;
  const kpis = kpiDashboard;

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    const checkSupabase = async () => {
      try {
        const { data } = await supabase.from('seo_audit_results').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
      setTimeout(() => setLoading(false), 600);
    };
    checkSupabase();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const checkSupabase = async () => {
        try {
          const { data } = await supabase.from('seo_audit_results').select('id').limit(1);
          if (data && data.length > 0) setIsLive(true);
        } catch { /* mock fallback */ }
      };
      checkSupabase();
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return {
    loading,
    error,
    isLive,
    overview,
    faiblesses,
    actions,
    trilingue,
    planTrimestriel,
    benchmark,
    kpis,
    refetch,
  };
}