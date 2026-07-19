import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { scanSocialUrls, autoCorrectUrl, type SocialUrlCorrectionScan, type UrlHealthReport, type AutoCorrectionResult } from '@/mocks/socialUrlCorrectionEngine';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

interface SocialUrlCorrectionState {
  scan: SocialUrlCorrectionScan | null;
  loading: boolean;
  error: string | null;
  autoFixes: AutoCorrectionResult[];
  lastScanDate: string | null;
  isLive: boolean;
}

function extractUniqueUrls(queue: SocialQueueItem[]): string[] {
  const urls = new Set<string>();
  for (const item of queue) {
    if (item.source_url) {
      urls.add(item.source_url);
    }
  }
  return Array.from(urls);
}

export function useSocialUrlCorrection(queue: SocialQueueItem[]) {
  const [state, setState] = useState<SocialUrlCorrectionState>({
    scan: null,
    loading: false,
    error: null,
    autoFixes: [],
    lastScanDate: null,
    isLive: false,
  });

  const uniqueUrls = useMemo(() => extractUniqueUrls(queue), [queue]);

  useEffect(() => {
    let cancelled = false;
    async function checkLive() {
      try {
        const { data, error } = await supabase
          .from('social_automation_queue')
          .select('*')
          .limit(1);
        if (!cancelled && !error && data && data.length > 0) {
          setState(prev => ({ ...prev, isLive: true }));
        }
      } catch {
        // fallback mock
      }
    }
    checkLive();
    return () => { cancelled = true; };
  }, []);

  const runScan = useCallback(() => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const scan = scanSocialUrls(uniqueUrls);

      const autoFixes: AutoCorrectionResult[] = [];
      for (const report of scan.reports) {
        if (report.status === 'broken') {
          const fix = autoCorrectUrl(report.url);
          if (fix) {
            autoFixes.push(fix);
          }
        }
      }

      setState(prev => ({
        ...prev,
        scan,
        loading: false,
        error: null,
        autoFixes,
        lastScanDate: scan.scan_date,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: (err as Error).message || 'Erreur lors du scan des URLs sociales',
      }));
    }
  }, [uniqueUrls]);

  useEffect(() => {
    if (uniqueUrls.length > 0) {
      runScan();
    }
  }, []);

  const healthScore = useMemo(() => {
    if (!state.scan) return 0;
    const { healthy, total_urls } = state.scan;
    return total_urls > 0 ? Math.round((healthy / total_urls) * 100) : 0;
  }, [state.scan]);

  const criticalIssues = useMemo(() => {
    if (!state.scan) return [];
    return state.scan.reports.filter(r => r.severity === 'critical' || r.severity === 'high');
  }, [state.scan]);

  const ogGaps = useMemo(() => {
    if (!state.scan) return [];
    return state.scan.reports.filter(r => r.issue_type === 'missing_og_tags');
  }, [state.scan]);

  return {
    ...state,
    uniqueUrls,
    healthScore,
    criticalIssues,
    ogGaps,
    runScan,
  };
}



