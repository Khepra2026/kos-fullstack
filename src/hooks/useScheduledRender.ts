import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type OutputFormat = 'webm' | 'mp4';

interface ScheduledJob {
  id: string;
  run_id: string;
  scheduled_render_at: string;
  resolution: string;
  output_format: OutputFormat;
}

interface ScheduledState {
  scheduledJobs: ScheduledJob[];
  loading: boolean;
  pendingCount: number;
}

/**
 * Hook de planification de rendus — Supabase cron-backed.
 *
 * Fonctionne avec le pg_cron job 'kos-render-scheduler' qui vérifie
 * toutes les 30 secondes si un render doit être activé.
 *
 * Le workflow:
 *  1. L'utilisateur choisit une date/heure + résolution + format
 *  2. Le job est inséré dans render_jobs avec status='scheduled'
 *  3. Le pg_cron job passe le status à 'queued' quand l'heure arrive
 *  4. Le frontend (useRenderJobQueue) détecte le job 'queued'
 *  5. Le render est déclenché automatiquement ou manuellement
 */
export function useScheduledRender(runId: string | null) {
  const [state, setState] = useState<ScheduledState>({
    scheduledJobs: [],
    loading: false,
    pendingCount: 0,
  });

  /**
   * Programme un render pour une date/heure future.
   */
  const scheduleRender = useCallback(
    async (
      scheduledAt: Date,
      resolution: string,
      outputFormat: OutputFormat,
      totalFrames: number,
      runTitle?: string,
    ): Promise<{ success: boolean; jobId?: string; error?: string }> => {
      if (!runId) return { success: false, error: 'Aucun run sélectionné' };

      try {
        const { data, error } = await supabase
          .from('render_jobs')
          .insert({
            run_id: runId,
            resolution,
            output_format: outputFormat,
            status: 'scheduled',
            total_frames: totalFrames,
            scheduled_render_at: scheduledAt.toISOString(),
          })
          .select('id')
          .single();

        if (error) throw error;

        setState((s) => ({ ...s, pendingCount: s.pendingCount + 1 }));

        return { success: true, jobId: data?.id };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Erreur planification' };
      }
    },
    [runId],
  );

  /**
   * Récupère les jobs planifiés pour un run donné.
   */
  const fetchScheduled = useCallback(async () => {
    if (!runId) return;

    setState((s) => ({ ...s, loading: true }));
    try {
      const { data, error } = await supabase
        .from('render_jobs')
        .select('id, run_id, scheduled_render_at, resolution, output_format')
        .eq('run_id', runId)
        .eq('status', 'scheduled')
        .order('scheduled_render_at', { ascending: true });

      if (error) throw error;

      const jobs = (data || []) as ScheduledJob[];

      setState({
        scheduledJobs: jobs,
        loading: false,
        pendingCount: jobs.length,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [runId]);

  /**
   * Annule un render planifié.
   */
  const cancelScheduled = useCallback(async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('render_jobs')
        .update({ status: 'cancelled' })
        .eq('id', jobId);

      if (error) throw error;

      setState((s) => ({
        ...s,
        scheduledJobs: s.scheduledJobs.filter((j) => j.id !== jobId),
        pendingCount: Math.max(0, s.pendingCount - 1),
      }));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message };
    }
  }, []);

  /**
   * Récupère tous les jobs planifiés (tous runs confondus).
   */
  const fetchAllScheduled = useCallback(async (): Promise<ScheduledJob[]> => {
    try {
      const { data } = await supabase
        .from('render_jobs')
        .select('id, run_id, scheduled_render_at, resolution, output_format')
        .eq('status', 'scheduled')
        .order('scheduled_render_at', { ascending: true })
        .limit(50);

      return (data || []) as ScheduledJob[];
    } catch {
      return [];
    }
  }, []);

  return {
    ...state,
    scheduleRender,
    fetchScheduled,
    cancelScheduled,
    fetchAllScheduled,
  };
}