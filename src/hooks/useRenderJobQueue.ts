import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface RenderJob {
  id: string;
  run_id: string;
  resolution: string;
  status: string;
  progress: number;
  total_frames: number;
  video_url: string | null;
  thumbnail_url: string | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

interface JobQueueState {
  jobs: RenderJob[];
  loading: boolean;
  pendingCount: number;
  runningCount: number;
  completedCount: number;
  failedCount: number;
}

const POLL_INTERVAL = 3000;

/**
 * Gestionnaire de file d'attente de rendus — Supabase-backed.
 * Rafraîchit périodiquement l'état des jobs de rendu.
 */
export function useRenderJobQueue(runId: string | null) {
  const [state, setState] = useState<JobQueueState>({
    jobs: [],
    loading: false,
    pendingCount: 0,
    runningCount: 0,
    completedCount: 0,
    failedCount: 0,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      let query = supabase
        .from('render_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (runId) {
        query = query.eq('run_id', runId);
      }

      const { data, error } = await query;
      if (error) throw error;

      const jobs = (data || []) as RenderJob[];

      setState({
        jobs,
        loading: false,
        pendingCount: jobs.filter((j) => j.status === 'queued').length,
        runningCount: jobs.filter((j) => j.status === 'rendering').length,
        completedCount: jobs.filter((j) => j.status === 'completed').length,
        failedCount: jobs.filter((j) => j.status === 'failed').length,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [runId]);

  useEffect(() => {
    fetchJobs();

    intervalRef.current = setInterval(fetchJobs, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchJobs]);

  const getJobForRun = useCallback(
    (rId: string) => state.jobs.find((j) => j.run_id === rId) || null,
    [state.jobs],
  );

  const getLatestCompletedJob = useCallback(
    () => state.jobs.find((j) => j.status === 'completed' && j.video_url) || null,
    [state.jobs],
  );

  return {
    ...state,
    refetch: fetchJobs,
    getJobForRun,
    getLatestCompletedJob,
  };
}