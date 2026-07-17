import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  OPTIMIZATION_METRICS,
  OPTIMIZATION_ACTIONS,
  SEO_PERF_SNAPSHOTS,
  GLOBAL_OPTIMIZATION_SCORE,
  CWV_DETAIL_BREAKDOWN,
  SEO_RANKINGS_TOP,
  AEO_PLATFORM_COVERAGE_OPTIMIZED,
} from '@/mocks/kosSEOPerfOptimization';

export function useKOSSEOPerfOptimization() {
  const [metrics, setMetrics] = useState(OPTIMIZATION_METRICS);
  const [actions, setActions] = useState(OPTIMIZATION_ACTIONS);
  const [snapshots, setSnapshots] = useState(SEO_PERF_SNAPSHOTS);
  const [globalScore, setGlobalScore] = useState(GLOBAL_OPTIMIZATION_SCORE);
  const [cwvDetail, setCwvDetail] = useState(CWV_DETAIL_BREAKDOWN);
  const [seoRankings, setSeoRankings] = useState(SEO_RANKINGS_TOP);
  const [aeoCoverage, setAeoCoverage] = useState(AEO_PLATFORM_COVERAGE_OPTIMIZED);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    setError(null);
    let liveCount = 0;

    try {
      const perfOk = await loadPerformanceSnapshots();
      if (perfOk) liveCount++;
    } catch { /* fallback to mock */ }

    try {
      const seoOk = await loadSEOAuditResults();
      if (seoOk) liveCount++;
    } catch { /* fallback to mock */ }

    try {
      const secOk = await loadSecurityScans();
      if (secOk) liveCount++;
    } catch { /* fallback to mock */ }

    setIsLive(liveCount >= 2);

    if (liveCount === 0) {
      setError('Données de démonstration — Supabase non disponible');
    }

    setLoading(false);
  }

  async function loadPerformanceSnapshots(): Promise<boolean> {
    try {
      const { data, error: dbErr } = await supabase
        .from('performance_snapshots')
        .select('*')
        .order('scanned_at', { ascending: false })
        .limit(30);

      if (dbErr || !data || data.length === 0) return false;

      const mobileSnaps = data.filter((s: any) => s.device_type === 'mobile');
      const desktopSnaps = data.filter((s: any) => s.device_type === 'desktop');

      const avgMobileScore = mobileSnaps.length > 0
        ? Math.round(mobileSnaps.reduce((a: number, s: any) => a + (s.pagespeed_score || 0), 0) / mobileSnaps.length)
        : 97;
      const avgDesktopScore = desktopSnaps.length > 0
        ? Math.round(desktopSnaps.reduce((a: number, s: any) => a + (s.pagespeed_score || 0), 0) / desktopSnaps.length)
        : 99;
      const avgLCP = data.length > 0
        ? Math.round(data.reduce((a: number, s: any) => a + (Number(s.lcp_value) || 0), 0) / data.length * 10) / 10
        : 1.6;
      const avgCLS = data.length > 0
        ? Math.round(data.reduce((a: number, s: any) => a + (Number(s.cls_value) || 0), 0) / data.length * 100) / 100
        : 0.03;
      const avgTBT = data.length > 0
        ? Math.round(data.reduce((a: number, s: any) => a + (s.tbt_value || 0), 0) / data.length)
        : 78;
      const totalWeightMB = data.length > 0
        ? Math.round(data.reduce((a: number, s: any) => a + (s.total_size_kb || 0), 0) / data.length / 10) / 100
        : 1.8;

      setGlobalScore(prev => ({
        ...prev,
        pagespeed: Math.round((avgMobileScore + avgDesktopScore) / 2),
        cwv: avgLCP <= 2.5 && avgCLS <= 0.1 && avgTBT <= 200 ? 98 : 85,
        lastScan: data[0]?.scanned_at || prev.lastScan,
      }));

      // Update LCP metric
      setMetrics(prev => prev.map(m => {
        if (m.category === 'LCP (Largest Contentful Paint)') {
          return { ...m, score: avgLCP <= 2.5 ? 96 : avgLCP <= 4 ? 80 : 60 };
        }
        return m;
      }));

      return true;
    } catch {
      return false;
    }
  }

  async function loadSEOAuditResults(): Promise<boolean> {
    try {
      const { data, error: dbErr } = await supabase
        .from('seo_audit_results')
        .select('*')
        .order('checked_at', { ascending: false })
        .limit(50);

      if (dbErr || !data || data.length === 0) return false;

      const avgSeoScore = Math.round(data.reduce((a: number, r: any) => a + (Number(r.seo_score) || 0), 0) / data.length);
      setGlobalScore(prev => ({ ...prev, seo: avgSeoScore }));

      return true;
    } catch {
      return false;
    }
  }

  async function loadSecurityScans(): Promise<boolean> {
    try {
      const { data, error: dbErr } = await supabase
        .from('security_scans')
        .select('*')
        .order('scanned_at', { ascending: false })
        .limit(1);

      if (dbErr || !data || data.length === 0) return false;

      return true;
    } catch {
      return false;
    }
  }

  return {
    metrics,
    actions,
    snapshots,
    globalScore,
    cwvDetail,
    seoRankings,
    aeoCoverage,
    loading,
    isLive,
    error,
  };
}