import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export type RenderResolution = '720p' | '1080p';

interface ResolutionConfig {
  width: number;
  height: number;
  bitrate: number;
  label: string;
}

export const RESOLUTION_PRESETS: Record<RenderResolution, ResolutionConfig> = {
  '720p': { width: 1280, height: 720, bitrate: 4000000, label: '720p — Rapide (~25s)' },
  '1080p': { width: 1920, height: 1080, bitrate: 6000000, label: '1080p — Full HD (~40s)' },
};

interface RenderProgress {
  status: 'idle' | 'starting' | 'rendering' | 'uploading' | 'thumbnail' | 'completed' | 'failed' | 'queued';
  currentFrame: number;
  totalFrames: number;
  message: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  error: string | null;
  jobId: string | null;
}

interface RenderConfig {
  compositionWidth: number;
  compositionHeight: number;
  fps: number;
  totalFrames: number;
  resolution: RenderResolution;
}

/**
 * Moteur de rendu Remotion 100% KOS — 0 API externe, 0 Edge Function.
 *
 * Pipeline de rendu dans le navigateur :
 *   1. Capture frame par frame du Player DOM via html-to-image
 *   2. Dessine sur un Canvas d'enregistrement (720p ou 1080p selon le preset)
 *   3. Génère automatiquement le thumbnail depuis le premier frame
 *   4. Encode avec MediaRecorder (WebM VP8/VP9 natif du navigateur)
 *   5. Upload direct vers Supabase Storage (vidéo + thumbnail)
 *   6. Met à jour video_pipeline_runs + render_jobs en base
 */
export function useRemotionRender() {
  const [progress, setProgress] = useState<RenderProgress>({
    status: 'idle',
    currentFrame: 0,
    totalFrames: 0,
    message: '',
    videoUrl: null,
    thumbnailUrl: null,
    error: null,
    jobId: null,
  });

  const abortRef = useRef(false);

  /**
   * Capture le contenu visible du Player Remotion sous forme de canvas.
   */
  const captureFrame = useCallback(
    async (
      playerElement: HTMLElement,
      width: number,
      height: number,
    ): Promise<HTMLCanvasElement | null> => {
      try {
        const { toCanvas } = await import('html-to-image');
        const canvas = await toCanvas(playerElement, {
          quality: 0.92,
          pixelRatio: Math.max(width / playerElement.offsetWidth, height / playerElement.offsetHeight),
          width,
          height,
        });
        return canvas;
      } catch {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#0A192F';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return canvas;
      }
    },
    [],
  );

  /**
   * Génère et upload un thumbnail depuis un canvas (premier frame).
   */
  const generateThumbnail = useCallback(
    async (
      canvas: HTMLCanvasElement,
      runId: string,
    ): Promise<string | null> => {
      try {
        // Redimensionner pour le thumbnail (480p max)
        const thumbCanvas = document.createElement('canvas');
        const maxThumbW = 640;
        const scale = Math.min(1, maxThumbW / canvas.width);
        thumbCanvas.width = Math.round(canvas.width * scale);
        thumbCanvas.height = Math.round(canvas.height * scale);
        const thumbCtx = thumbCanvas.getContext('2d');
        if (!thumbCtx) return null;

        thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);

        const blob = await new Promise<Blob>((resolve) =>
          thumbCanvas.toBlob((b) => resolve(b!), 'image/webp', 0.85),
        );

        const thumbPath = `video-renders/${runId}/thumb-${Date.now()}.webp`;
        const { error: uploadErr } = await supabase.storage
          .from('public')
          .upload(thumbPath, blob, {
            contentType: 'image/webp',
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadErr) throw uploadErr;

        const { data: urlData } = supabase.storage.from('public').getPublicUrl(thumbPath);
        return urlData?.publicUrl || null;
      } catch {
        return null;
      }
    },
    [],
  );

  /**
   * Crée un job dans la file d'attente render_jobs.
   */
  const createJob = useCallback(
    async (runId: string, resolution: RenderResolution, totalFrames: number): Promise<string | null> => {
      try {
        const { data, error } = await supabase
          .from('render_jobs')
          .insert({
            run_id: runId,
            resolution,
            status: 'queued',
            total_frames: totalFrames,
          })
          .select('id')
          .single();

        if (error) throw error;
        return data?.id || null;
      } catch {
        return null;
      }
    },
    [],
  );

  /**
   * Met à jour le statut d'un job.
   */
  const updateJob = useCallback(
    async (
      jobId: string,
      updates: {
        status?: string;
        progress?: number;
        video_url?: string;
        thumbnail_url?: string;
        error_message?: string;
        started_at?: string;
        completed_at?: string;
      },
    ) => {
      try {
        const payload: Record<string, any> = { ...updates };
        if (updates.started_at) payload.started_at = updates.started_at;
        if (updates.completed_at) payload.completed_at = updates.completed_at;

        await supabase.from('render_jobs').update(payload).eq('id', jobId);
      } catch {
        // Non-bloquant
      }
    },
    [],
  );

  const startRender = useCallback(
    async (
      runId: string,
      playerContainerRef: { current: HTMLElement | null },
      config: RenderConfig,
    ): Promise<void> => {
      abortRef.current = false;
      const { compositionWidth, compositionHeight, fps, totalFrames, resolution } = config;
      const preset = RESOLUTION_PRESETS[resolution];

      // Créer le job dans la file d'attente
      const jobId = await createJob(runId, resolution, totalFrames);

      setProgress({
        status: 'queued',
        currentFrame: 0,
        totalFrames,
        message: `Job créé — Résolution ${preset.label}`,
        videoUrl: null,
        thumbnailUrl: null,
        error: null,
        jobId,
      });

      // Petit délai pour montrer le statut "queued"
      await new Promise((r) => setTimeout(r, 600));

      const startedAt = new Date().toISOString();
      if (jobId) {
        await updateJob(jobId, { status: 'rendering', started_at: startedAt });
      }

      setProgress({
        status: 'starting',
        currentFrame: 0,
        totalFrames,
        message: `Initialisation rendu ${resolution}...`,
        videoUrl: null,
        thumbnailUrl: null,
        error: null,
        jobId,
      });

      try {
        await supabase
          .from('video_pipeline_runs')
          .update({
            status: 'rendering',
            current_step: 'rendu_remotion',
            resolution,
          })
          .eq('id', runId);

        const container = playerContainerRef.current;
        if (!container) throw new Error('Conteneur Player introuvable');

        const recordCanvas = document.createElement('canvas');
        recordCanvas.width = preset.width;
        recordCanvas.height = preset.height;
        const ctx = recordCanvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D non supporté');

        const stream = recordCanvas.captureStream(fps);
        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
            ? 'video/webm;codecs=vp8'
            : 'video/webm';

        const chunks: Blob[] = [];
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: preset.bitrate,
        });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        let recordingResolve: (() => void) | null = null;
        const recordingDone = new Promise<void>((resolve) => {
          recordingResolve = resolve;
        });
        mediaRecorder.onstop = () => recordingResolve?.();

        mediaRecorder.start();

        setProgress({
          status: 'rendering',
          currentFrame: 0,
          totalFrames,
          message: `Capture ${totalFrames} frames @ ${fps}fps — ${resolution}`,
          videoUrl: null,
          thumbnailUrl: null,
          error: null,
          jobId,
        });

        const startTime = performance.now();
        let firstFrameCaptured: HTMLCanvasElement | null = null;

        // Boucle de capture frame par frame
        for (let frame = 0; frame < totalFrames; frame++) {
          if (abortRef.current) {
            mediaRecorder.stop();
            throw new Error('Rendu annulé par l\'utilisateur');
          }

          const captured = await captureFrame(container, preset.width, preset.height);

          // Sauvegarder le premier frame pour le thumbnail
          if (frame === 0 && captured) {
            firstFrameCaptured = captured;
          }

          ctx.clearRect(0, 0, preset.width, preset.height);
          ctx.drawImage(captured, 0, 0, preset.width, preset.height);

          // Mise à jour UI toutes les 10 frames
          if (frame % 10 === 0 || frame === totalFrames - 1) {
            const elapsed = (performance.now() - startTime) / 1000;
            const fpsActual = frame > 0 ? Math.round(frame / elapsed) : 0;
            const eta = frame > 0 ? Math.round((totalFrames - frame) / fpsActual) : 0;

            setProgress({
              status: 'rendering',
              currentFrame: frame + 1,
              totalFrames,
              message: `Frame ${frame + 1}/${totalFrames} · ~${fpsActual} fps · reste ~${eta}s · ${resolution}`,
              videoUrl: null,
              thumbnailUrl: null,
              error: null,
              jobId,
            });

            if (jobId) {
              void updateJob(jobId, { progress: Math.round(((frame + 1) / totalFrames) * 100) });
            }

            // Yield au navigateur
            await new Promise((r) => setTimeout(r, 1));
          }
        }

        // Arrêter le recorder
        mediaRecorder.stop();
        await recordingDone;

        if (abortRef.current) throw new Error('Rendu annulé');

        // --- THUMBNAIL AUTO ---
        const thumbUrl = firstFrameCaptured
          ? await generateThumbnail(firstFrameCaptured, runId)
          : null;

        if (thumbUrl) {
          setProgress({
            status: 'thumbnail',
            currentFrame: totalFrames,
            totalFrames,
            message: 'Thumbnail généré — upload vidéo en cours...',
            videoUrl: null,
            thumbnailUrl: thumbUrl,
            error: null,
            jobId,
          });
        }

        // --- UPLOAD VIDEO ---
        setProgress({
          status: 'uploading',
          currentFrame: totalFrames,
          totalFrames,
          message: 'Upload vers KOS Storage...',
          videoUrl: null,
          thumbnailUrl: thumbUrl,
          error: null,
          jobId,
        });

        const videoBlob = new Blob(chunks, { type: mimeType });
        const videoPath = `video-renders/${runId}/render-${Date.now()}.webm`;

        const { error: uploadErr } = await supabase.storage
          .from('public')
          .upload(videoPath, videoBlob, {
            contentType: 'video/webm',
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadErr) throw new Error(`Upload Storage: ${uploadErr.message}`);

        const { data: urlData } = supabase.storage.from('public').getPublicUrl(videoPath);
        const publicUrl = urlData?.publicUrl || '';

        const durationSec = Math.round(totalFrames / fps);

        // Mise à jour base — succès
        const updatePayload: Record<string, any> = {
          status: 'completed',
          current_step: 'rendu_remotion',
          video_url: publicUrl,
          duree_sec: durationSec,
          resolution,
          completed_at: new Date().toISOString(),
        };
        if (thumbUrl) updatePayload.thumbnail_url = thumbUrl;

        await supabase
          .from('video_pipeline_runs')
          .update(updatePayload)
          .eq('id', runId);

        if (jobId) {
          await updateJob(jobId, {
            status: 'completed',
            progress: 100,
            video_url: publicUrl,
            thumbnail_url: thumbUrl || undefined,
            completed_at: new Date().toISOString(),
          });
        }

        setProgress({
          status: 'completed',
          currentFrame: totalFrames,
          totalFrames,
          message: `Rendu ${resolution} terminé — ${durationSec}s`,
          videoUrl: publicUrl,
          thumbnailUrl: thumbUrl,
          error: null,
          jobId,
        });
      } catch (err: any) {
        const errorMsg = err?.message || 'Erreur inconnue';

        try {
          await supabase
            .from('video_pipeline_runs')
            .update({
              status: 'failed',
              current_step: 'rendu_remotion',
              error_message: errorMsg,
              resolution,
              completed_at: new Date().toISOString(),
            })
            .eq('id', runId);
        } catch { /* ignore */ }

        if (jobId) {
          void updateJob(jobId, {
            status: 'failed',
            error_message: errorMsg,
            completed_at: new Date().toISOString(),
          });
        }

        setProgress({
          status: 'failed',
          currentFrame: progress.currentFrame,
          totalFrames,
          message: 'Échec du rendu',
          videoUrl: null,
          thumbnailUrl: progress.thumbnailUrl,
          error: errorMsg,
          jobId,
        });
      }
    },
    [captureFrame, generateThumbnail, createJob, updateJob, progress.currentFrame, progress.thumbnailUrl],
  );

  const cancelRender = useCallback(() => {
    abortRef.current = true;
    setProgress((prev) => ({
      ...prev,
      status: 'idle',
      message: 'Rendu annulé',
      error: null,
    }));
  }, []);

  return { progress, startRender, cancelRender };
}



