import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface PipelineRun {
  id: string;
  trigger_type: string;
  regulator_source: string;
  doc_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  current_step: string | null;
  quality_score: number | null;
  audit_id: string | null;
  results: { channel: string; status: string; url?: string; error?: string }[] | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export function usePipelineRealtime(options?: { limit?: number }) {
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [liveRuns, setLiveRuns] = useState<PipelineRun[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      const limit = options?.limit || 50;
      const { data, error } = await supabase
        .from('kos_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setRuns((data || []) as PipelineRun[]);
    } catch (err) {
      console.warn('[PipelineRealtime] Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  }, [options?.limit]);

  useEffect(() => {
    fetchHistory();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('pipeline-runs-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'kos_pipeline_runs',
        },
        (payload) => {
          const updatedRun = payload.new as PipelineRun;

          setRuns(prev => {
            const index = prev.findIndex(r => r.id === updatedRun.id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = updatedRun;
              return updated;
            }
            return [updatedRun, ...prev];
          });

          setLiveRuns(prev => {
            const index = prev.findIndex(r => r.id === updatedRun.id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = updatedRun;
              if (updatedRun.status === 'completed' || updatedRun.status === 'failed') {
                return updated.filter(r => r.id !== updatedRun.id);
              }
              return updated;
            }
            if (updatedRun.status === 'running') {
              return [updatedRun, ...prev];
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchHistory]);

  return { runs, liveRuns, loading, refetch: fetchHistory };
}