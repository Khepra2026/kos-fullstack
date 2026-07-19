import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  backlinkOpportunities as seedOpportunities,
  backlinkContentPillars,
  backlinkStats,
  quickWins,
} from '@/mocks/backlinkOpportunities';

interface Opportunity {
  id: number;
  target_url: string;
  source_domain: string;
  domain_authority: number;
  opportunity_type: string;
  relevance_score: number;
  status: string;
  notes: string;
}

interface UseBacklinkDetectReturn {
  opportunities: Opportunity[];
  contentPillars: typeof backlinkContentPillars;
  stats: typeof backlinkStats;
  quickWins: typeof quickWins;
  loading: boolean;
  error: string | null;
  dataSource: 'supabase' | 'mock';
  runDetection: () => Promise<void>;
}

export function useBacklinkDetect(): UseBacklinkDetectReturn {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(seedOpportunities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');

  // Seeding function — populates Supabase with real seed data if table is empty
  const seedIfEmpty = useCallback(async () => {
    try {
      const { count, error: countErr } = await supabase
        .from('backlink_opportunities')
        .select('*', { count: 'exact', head: true });

      if (countErr) throw countErr;

      if ((count || 0) === 0) {
        const rows = seedOpportunities.map((o) => ({
          target_url: o.target_url,
          source_domain: o.source_domain,
          domain_authority: o.domain_authority,
          opportunity_type: o.opportunity_type,
          relevance_score: o.relevance_score,
          status: o.status,
          notes: o.notes,
        }));

        const { error: insertErr } = await supabase
          .from('backlink_opportunities')
          .insert(rows);

        if (insertErr) throw insertErr;
      }
    } catch (err: any) {
      console.warn('[Backlink Seed] Skipped:', err.message);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      await seedIfEmpty();

      const { data: dbOpps, error: dbError } = await supabase
        .from('backlink_opportunities')
        .select('*')
        .order('domain_authority', { ascending: false });

      if (dbError) throw dbError;

      if (dbOpps && dbOpps.length > 0) {
        const mapped: Opportunity[] = dbOpps.slice(0, 24).map((o: any) => ({
          id: o.id,
          target_url: o.target_url,
          source_domain: o.source_domain,
          domain_authority: o.domain_authority,
          opportunity_type: o.opportunity_type,
          relevance_score: o.relevance_score,
          status: o.status,
          notes: o.notes,
        }));
        setOpportunities(mapped);
        setDataSource('supabase');
      } else {
        setOpportunities(seedOpportunities);
        setDataSource('mock');
      }
    } catch (err: any) {
      console.error('Backlink load error:', err);
      setError(err.message || 'Erreur chargement opportunités backlinks');
      setOpportunities(seedOpportunities);
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }

  async function runDetection() {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke('kos-backlink-detect', {
        body: {},
      });
      if (fnError) throw fnError;
      if (result?.data?.opportunities) {
        const mapped: Opportunity[] = result.data.opportunities.slice(0, 24).map((o: any, i: number) => ({
          id: i + 1,
          target_url: o.target_url,
          source_domain: o.source_domain,
          domain_authority: o.domain_authority,
          opportunity_type: o.opportunity_type,
          relevance_score: o.relevance_score,
          status: o.status || 'detected',
          notes: o.notes || '',
        }));
        setOpportunities(mapped);
        setDataSource('supabase');
      }
    } catch (err: any) {
      console.error('Detection error:', err);
      setError(err.message || 'Échec du scan backlink — données mock conservées');
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }

  return { opportunities, contentPillars: backlinkContentPillars, stats: backlinkStats, quickWins, loading, error, dataSource, runDetection };
}



