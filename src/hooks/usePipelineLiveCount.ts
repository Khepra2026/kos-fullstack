import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export function usePipelineLiveCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(async () => {
    try {
      const { data, error, count: dbCount } = await supabase
        .from('kos_pipeline_runs')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'running');

      if (error) throw error;
      setCount(dbCount || 0);
    } catch (err) {
      console.warn('[PipelineLiveCount] Failed to fetch running count:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();

    const channel = supabase
      .channel('pipeline-live-count')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kos_pipeline_runs' },
        () => { fetchCount(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchCount]);

  return { count, loading };
}