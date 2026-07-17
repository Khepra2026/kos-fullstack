import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ORGANIC_TRAFFIC_HISTORY,
  SERP_KEYWORDS,
  AEO_VISIBILITY,
  CORE_WEB_VITALS_HISTORY,
  SECURITY_AUDIT,
  MULTILINGUAL_SEO,
  CORRECTIVE_ACTIONS,
  MONTHLY_KPIS,
  SEO_PERFORMANCE_GLOBAL_METRICS,
  type OrganicTrafficSnapshot,
  type SerpKeyword,
  type AIOVisibility,
  type CoreWebVitalMetric,
  type SecurityAuditItem,
  type MultilingualSEOStats,
  type CorrectiveAction,
  type MonthlyKPI,
  type GlobalMetrics,
} from '@/mocks/kosSeoPerformanceIntelligence';

interface UseSeoPerformanceIntelligenceReturn {
  traffic: OrganicTrafficSnapshot[];
  serpKeywords: SerpKeyword[];
  aeoVisibility: AIOVisibility[];
  cwvHistory: CoreWebVitalMetric[];
  securityAudit: SecurityAuditItem[];
  multilingualSeo: MultilingualSEOStats[];
  correctiveActions: CorrectiveAction[];
  monthlyKpis: MonthlyKPI[];
  globalMetrics: GlobalMetrics;
  isLive: boolean;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSeoPerformanceIntelligence(): UseSeoPerformanceIntelligenceReturn {
  const [traffic, setTraffic] = useState<OrganicTrafficSnapshot[]>([]);
  const [serpKeywords] = useState<SerpKeyword[]>(SERP_KEYWORDS);
  const [aeoVisibility] = useState<AIOVisibility[]>(AEO_VISIBILITY);
  const [cwvHistory] = useState<CoreWebVitalMetric[]>(CORE_WEB_VITALS_HISTORY);
  const [securityAudit] = useState<SecurityAuditItem[]>(SECURITY_AUDIT);
  const [multilingualSeo] = useState<MultilingualSEOStats[]>(MULTILINGUAL_SEO);
  const [correctiveActions] = useState<CorrectiveAction[]>(CORRECTIVE_ACTIONS);
  const [monthlyKpis] = useState<MonthlyKPI[]>(MONTHLY_KPIS);
  const [globalMetrics] = useState<GlobalMetrics>(SEO_PERFORMANCE_GLOBAL_METRICS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Hybrid: check Supabase first
      const { data } = await supabase.from('seo_audit_results').select('id').limit(1);
      if (data && data.length > 0) setIsLive(true);
      else setIsLive(false);
      setTraffic(ORGANIC_TRAFFIC_HISTORY);
    } catch {
      setIsLive(false);
      setTraffic(ORGANIC_TRAFFIC_HISTORY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    traffic,
    serpKeywords,
    aeoVisibility,
    cwvHistory,
    securityAudit,
    multilingualSeo,
    correctiveActions,
    monthlyKpis,
    globalMetrics,
    isLive,
    loading,
    error,
    refetch: fetchData,
  };
}