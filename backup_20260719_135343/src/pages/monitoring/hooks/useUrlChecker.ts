import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface UrlCheckResult {
  id: string;
  check_run_id: string;
  source_url: string | null;
  target_url: string;
  status_code: number | null;
  is_internal: boolean;
  is_broken: boolean;
  error_message: string | null;
  content_type: string | null;
  redirect_url: string | null;
  check_type: string;
  checked_at: string;
}

export interface UrlCheckerStats {
  total_checked: number;
  broken: number;
  redirected: number;
  ok: number;
  internal_links_checked: number;
  last_check_run_id: string | null;
  last_checked_at: string | null;
}

export function useUrlChecker() {
  const [results, setResults] = useState<UrlCheckResult[]>([]);
  const [stats, setStats] = useState<UrlCheckerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: latestRun } = await supabase
        .from('url_check_results')
        .select('check_run_id, checked_at')
        .order('checked_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const runId = latestRun?.check_run_id;
      if (!runId) {
        setStats({
          total_checked: 0,
          broken: 0,
          redirected: 0,
          ok: 0,
          internal_links_checked: 0,
          last_check_run_id: null,
          last_checked_at: null,
        });
        setResults([]);
        setLoading(false);
        return;
      }

      const { data: allResults, error: resultsError } = await supabase
        .from('url_check_results')
        .select('*')
        .eq('check_run_id', runId)
        .order('checked_at', { ascending: false });

      if (resultsError) throw resultsError;

      const rows: UrlCheckResult[] = allResults || [];
      setResults(rows);

      const broken = rows.filter((r) => r.is_broken).length;
      const redirected = rows.filter((r) => r.redirect_url && !r.is_broken).length;
      const ok = rows.filter((r) => !r.is_broken && !r.redirect_url).length;
      const internalLinksChecked = rows.filter((r) => r.check_type === 'internal_link').length;

      setStats({
        total_checked: rows.length,
        broken,
        redirected,
        ok,
        internal_links_checked: internalLinksChecked,
        last_check_run_id: runId,
        last_checked_at: latestRun.checked_at,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerCrawl = useCallback(async (mode: 'full' | 'pages' = 'full') => {
    setCrawling(true);
    setError(null);
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/crawl-internal-links?mode=${mode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
          },
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(body?.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      await loadResults();
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors du crawl';
      setError(msg);
      throw err;
    } finally {
      setCrawling(false);
    }
  }, [loadResults]);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  return {
    results,
    stats,
    loading,
    crawling,
    error,
    refresh: loadResults,
    triggerCrawl,
  };
}



