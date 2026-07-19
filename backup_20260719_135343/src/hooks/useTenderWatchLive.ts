import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export interface TenderAlertLive {
  id: string;
  title: string;
  description: string;
  source_name: string;
  region: string;
  source_url: string;
  published_at: string | null;
  deadline: string | null;
  relevance_score: number;
  relevance_class: 'high' | 'medium' | 'low';
  expertise_tags: string[];
  status: string;
  notified: boolean;
  notified_at: string | null;
  tender_type: string | null;
  match_category: string | null;
  country: string | null;
  estimated_budget_fcfa: number | null;
  created_at: string;
}

export interface TenderWatchStats {
  totalToday: number;
  highRelevance: number;
  critical: number;
  totalBudget: number;
  sources: number;
}

function computeStats(alerts: TenderAlertLive[]): TenderWatchStats {
  const today = new Date().toISOString().split('T')[0];
  const todayAlerts = alerts.filter(a => a.created_at?.startsWith(today));
  const high = alerts.filter(a => a.relevance_class === 'high');
  return {
    totalToday: todayAlerts.length,
    highRelevance: high.length,
    critical: high.filter(a => a.relevance_score >= 5).length,
    totalBudget: alerts.reduce((s, a) => s + (a.estimated_budget_fcfa || 0), 0),
    sources: new Set(alerts.map(a => a.source_name)).size,
  };
}

export function useTenderWatchLive() {
  const [alerts, setAlerts] = useState<TenderAlertLive[]>([]);
  const [stats, setStats] = useState<TenderWatchStats>({ totalToday: 0, highRelevance: 0, critical: 0, totalBudget: 0, sources: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      const { data, error: err } = await supabase
        .from('tender_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (err) throw err;

      if (data && data.length > 0) {
        const normalized = data as TenderAlertLive[];
        setAlerts(normalized);
        setStats(computeStats(normalized));
        setIsLive(true);
      } else {
        setIsLive(false);
      }
      setError(null);
      setLastRefresh(new Date());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      setError(msg);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();

    const channel = supabase
      .channel('tender-alerts-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tender_alerts' },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    channelRef.current = channel;

    const pollInterval = setInterval(fetchAlerts, 30000);

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      clearInterval(pollInterval);
    };
  }, [fetchAlerts]);

  const triggerScraper = useCallback(async () => {
    try {
      const { data, error: err } = await supabase.functions.invoke('kos-tender-master', {
        body: { action: 'scrape', dry_run: false },
      });
      if (err) throw err;
      await fetchAlerts();
      return data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur scraper';
      setError(msg);
      return null;
    }
  }, [fetchAlerts]);

  const notifyNow = useCallback(async (minRelevance: string = 'high') => {
    try {
      const { data, error: err } = await supabase.functions.invoke('kos-tender-master', {
        body: { action: 'notify', min_relevance: minRelevance, limit: 20 },
      });
      if (err) throw err;
      return data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur notification';
      setError(msg);
      return null;
    }
  }, []);

  return { alerts, stats, loading, error, isLive, lastRefresh, refetch: fetchAlerts, triggerScraper, notifyNow };
}



