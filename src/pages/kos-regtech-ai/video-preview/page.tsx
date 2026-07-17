import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Player } from '@remotion/player';
import { AnalyseReglementaire } from '@/remotion/compositions/AnalyseReglementaire';
import type { BriefVideo } from '@/remotion/types';
import { useRemotionRender, RESOLUTION_PRESETS } from '@/hooks/useRemotionRender';
import type { RenderResolution } from '@/hooks/useRemotionRender';
import { useRenderJobQueue } from '@/hooks/useRenderJobQueue';
import { useScheduledRender } from '@/hooks/useScheduledRender';
import type { OutputFormat } from '@/hooks/useScheduledRender';
import { useFFmpegConvert } from '@/hooks/useFFmpegConvert';
import ThumbnailGallery from '@/pages/kos-regtech-ai/video-preview/components/ThumbnailGallery';
import {
  ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2,
  VolumeX, Maximize2, Download, RefreshCw, Loader2,
  Eye, Camera, Clock, FileText, Share2, Sparkles,
  Zap, CheckCircle2, XCircle, AlertTriangle, Film, Square,
  SlidersHorizontal, Image, ListOrdered, Monitor,
  CalendarClock, Calendar, FileVideo, ChevronDown,
} from 'lucide-react';

interface VideoPipelineRun {
  id: string;
  brief_id: string;
  titre: string;
  regulateur: string;
  hook: string;
  status: string;
  current_step: string;
  video_url: string | null;
  thumbnail_url: string | null;
  voice_url: string | null;
  duree_sec: number | null;
  cta_url: string | null;
  points_cles: any | null;
  sources: any[] | null;
  result: any;
  error_message: string | null;
  resolution: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

const REGULATOR_COLORS: Record<string, string> = {
  BCEAO: '#D4AF37', OHADA: '#C9A227', COBAC: '#86BC25',
  BEAC: '#2E8B57', GAFI: '#E67E22', UEMOA: '#E74C3C', IFRS: '#3498DB',
};

function buildBriefFromRun(run: VideoPipelineRun): BriefVideo | null {
  if (!run.points_cles) return null;

  let points: any[] = [];

  if (Array.isArray(run.points_cles)) {
    const firstItem = run.points_cles[0];
    if (firstItem && typeof firstItem === 'object' && 'texte_extrait' in firstItem) {
      points = (run.points_cles as any[]).map((p: any) => ({
        texte: p.texte_extrait || '',
        citation: p.source || { regulateur: run.regulateur, reference: '', article: '', url: '' },
        duree_sec: p.duree_estimee || 8,
      }));
    } else if (firstItem && typeof firstItem === 'object' && 'name' in firstItem) {
      const stepPoints = (run.points_cles as any[])
        .filter((s: any) => s.name === 'brief_generation' || s.status === 'completed')
        .map((_: any, i: number) => ({
          texte: `Étape ${i + 1} du pipeline réglementaire ${run.regulateur}`,
          citation: {
            regulateur: run.regulateur,
            reference: run.brief_id || '',
            article: `Section ${i + 1}`,
            url: run.cta_url || '#',
          },
          duree_sec: 8,
        }));
      points = stepPoints.length > 0 ? stepPoints : [
        { texte: 'Analyse réglementaire en cours', citation: { regulateur: run.regulateur, reference: '', article: '', url: '' }, duree_sec: 8 },
      ];
    }
  }

  if (run.sources && Array.isArray(run.sources) && points.length === 0) {
    points = run.sources.slice(0, 4).map((s: any, i: number) => ({
      texte: `Source ${i + 1}: ${s.regulateur || run.regulateur} — ${s.ref || s.reference || ''}`,
      citation: {
        regulateur: s.regulateur || run.regulateur,
        reference: s.ref || s.reference || '',
        article: s.article || '',
        url: s.url || '#',
      },
      duree_sec: 8,
    }));
  }

  if (points.length === 0) {
    points = [
      { texte: 'Analyse de la réglementation', citation: { regulateur: run.regulateur, reference: run.brief_id, article: '', url: '#' }, duree_sec: 8 },
    ];
  }

  return {
    id: run.brief_id || run.id,
    titre: run.titre || 'Analyse Réglementaire',
    hook: run.hook || '',
    points_cles: points,
    cta_url: run.cta_url || 'khepraexperts.com/notes',
    cta_texte: 'Téléchargez la note d\'analyse complète',
    regulateur: run.regulateur,
    regulateur_logo: `${run.regulateur.toLowerCase()}.png`,
    voice_url: run.voice_url || undefined,
  };
}

const TOTAL_DURATION_FRAMES = 1200;
const FPS = 30;

function useVideoRuns() {
  const [runs, setRuns] = useState<VideoPipelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('video_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (dbError) throw dbError;
      setRuns((data || []) as VideoPipelineRun[]);
    } catch (err: any) {
      setError(err?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { runs, loading, error, refetch: fetch };
}

export default function KOSVideoPreviewPage() {
  const { runs, loading, error, refetch } = useVideoRuns();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'player' | 'remotion' | 'details' | 'gallery'>('remotion');
  const [resolution, setResolution] = useState<RenderResolution>('720p');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('webm');
  const [showQueue, setShowQueue] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleResolution, setScheduleResolution] = useState<RenderResolution>('720p');
  const [scheduleFormat, setScheduleFormat] = useState<OutputFormat>('webm');
  const [scheduleMsg, setScheduleMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const { progress: renderProgress, startRender, cancelRender } = useRemotionRender();
  const jobQueue = useRenderJobQueue(selectedRunId);
  const scheduledRender = useScheduledRender(selectedRunId);
  const { conversion, convertToMP4, cancelConversion } = useFFmpegConvert();

  const selectedRun = useMemo(
    () => runs.find(r => r.id === selectedRunId) || null,
    [runs, selectedRunId],
  );

  const brief = useMemo(
    () => selectedRun ? buildBriefFromRun(selectedRun) : null,
    [selectedRun],
  );

  useEffect(() => {
    if (runs.length > 0 && !selectedRunId) {
      const completed = runs.find(r => r.status === 'completed');
      setSelectedRunId(completed?.id || runs[0]?.id || null);
    }
  }, [runs, selectedRunId]);

  const handleRenderMP4 = async () => {
    if (!selectedRun || !brief || !playerContainerRef.current) return;
    await startRender(selectedRun.id, playerContainerRef, {
      compositionWidth: RESOLUTION_PRESETS[resolution].width,
      compositionHeight: RESOLUTION_PRESETS[resolution].height,
      fps: FPS,
      totalFrames: TOTAL_DURATION_FRAMES,
      resolution,
    });
  };

  const isRendering = renderProgress.status === 'rendering' || renderProgress.status === 'starting' || renderProgress.status === 'uploading' || renderProgress.status === 'thumbnail';

  // Auto-conversion MP4 après un render WebM réussi
  useEffect(() => {
    if (renderProgress.status === 'completed' && renderProgress.videoUrl && outputFormat === 'mp4' && conversion.status === 'idle') {
      // Récupérer le blob WebM depuis l'URL et le convertir
      const runConversion = async () => {
        try {
          const response = await fetch(renderProgress.videoUrl!);
          const webmBlob = await response.blob();
          const mp4Blob = await convertToMP4(webmBlob, `render-${selectedRunId}`);

          if (mp4Blob && selectedRunId) {
            // Upload le MP4 vers Storage
            const mp4Path = `video-renders/${selectedRunId}/render-mp4-${Date.now()}.mp4`;
            const { error: uploadErr } = await supabase.storage
              .from('public')
              .upload(mp4Path, mp4Blob, {
                contentType: 'video/mp4',
                cacheControl: '3600',
                upsert: true,
              });

            if (!uploadErr) {
              const { data: urlData } = supabase.storage.from('public').getPublicUrl(mp4Path);
              const mp4Url = urlData?.publicUrl;
              if (mp4Url) {
                // Mettre à jour le run avec l'URL MP4
                await supabase
                  .from('video_pipeline_runs')
                  .update({ video_url: mp4Url })
                  .eq('id', selectedRunId);
                // Rafraîchir les données
                refetch();
              }
            }
          }
        } catch {
          // La conversion a échoué, le WebM reste disponible
        }
      };

      runConversion();
    }
  }, [renderProgress.status, renderProgress.videoUrl, outputFormat, conversion.status, convertToMP4, selectedRunId, refetch]);

  const completedCount = runs.filter(r => r.status === 'completed').length;
  const runningCount = runs.filter(r => r.status === 'running' || r.status === 'rendering').length;
  const renderedCount = runs.filter(r => r.video_url != null).length;

  const currentThumb = renderProgress.thumbnailUrl || selectedRun?.thumbnail_url || null;

  // Données pour la galerie de thumbnails
  const galleryEntries = useMemo(
    () => runs.map(r => ({
      runId: r.id,
      runTitle: r.titre || 'Sans titre',
      regulateur: r.regulateur,
      status: r.status,
      resolution: r.resolution || null,
      thumbnailUrl: r.thumbnail_url || null,
      videoUrl: r.video_url || null,
      completedAt: r.completed_at || null,
      dureeSec: r.duree_sec || null,
    })),
    [runs],
  );

  // Handler de planification
  const handleScheduleRender = async () => {
    if (!selectedRun || !scheduleDate || !scheduleTime) {
      setScheduleMsg({ type: 'error', text: 'Date et heure requises' });
      return;
    }

    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}:00`);
    if (scheduledAt <= new Date()) {
      setScheduleMsg({ type: 'error', text: 'La date doit être dans le futur' });
      return;
    }

    const result = await scheduledRender.scheduleRender(
      scheduledAt,
      scheduleResolution,
      scheduleFormat,
      TOTAL_DURATION_FRAMES,
    );

    if (result.success) {
      setScheduleMsg({ type: 'success', text: `Render planifié pour le ${scheduledAt.toLocaleString('fr-FR')}` });
      setTimeout(() => { setScheduleMsg(null); setShowScheduler(false); }, 2500);
    } else {
      setScheduleMsg({ type: 'error', text: result.error || 'Erreur de planification' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a href="/kos-regtech-ai/" className="w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}>
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <Eye className="w-6 h-6" style={{ color: 'oklch(var(--accent-500))' }} />
                KOS Video Preview
              </h1>
              <p className="text-sm mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
                Prévisualisation Remotion + Rendu MP4 · 0 API externe · 100% KOS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/kos-regtech-ai/video-pipeline/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}>
              <Play className="w-4 h-4" /> Pipeline
            </a>
            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all relative ${
                showQueue ? 'ring-1' : ''
              }`}
              style={{
                backgroundColor: showQueue ? 'oklch(var(--accent-100) / 0.6)' : 'oklch(var(--background-100))',
                color: showQueue ? 'oklch(var(--accent-700))' : 'oklch(var(--foreground-700))',
              }}
            >
              <ListOrdered className="w-4 h-4" />
              <span className="hidden sm:inline">File d'attente</span>
              {jobQueue.pendingCount + jobQueue.runningCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white animate-pulse" style={{ backgroundColor: '#f59e0b' }}>
                  {jobQueue.pendingCount + jobQueue.runningCount}
                </span>
              )}
            </button>
            <button onClick={refetch} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>Rendus</p>
            <p className="text-xl font-bold mt-1" style={{ color: 'oklch(var(--foreground-950))' }}>{runs.length}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>En cours</p>
            <div className="flex items-center gap-2 mt-1">
              {runningCount > 0 && <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#f59e0b' }} />}
              <p className="text-xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>{runningCount}</p>
            </div>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>Complétés</p>
            <p className="text-xl font-bold mt-1" style={{ color: '#86BC25' }}>{completedCount}</p>
          </div>
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>MP4 Rendus</p>
            <p className="text-xl font-bold mt-1 flex items-center gap-1.5" style={{ color: 'oklch(var(--accent-500))' }}>
              <Film className="w-4 h-4" />{renderedCount}
            </p>
          </div>
        </div>

        {/* SCHEDULER PANEL */}
        {showScheduler && (
          <div className="mb-6 rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <CalendarClock className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                Planifier un Render
              </h2>
              <button
                onClick={() => setShowScheduler(false)}
                className="w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer"
                style={{ color: 'oklch(var(--foreground-400))' }}
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs mb-4" style={{ color: 'oklch(var(--foreground-500))' }}>
              Le render sera automatiquement déclenché à l'heure programmée via le cron Supabase (vérification toutes les 30s).
              Le statut passera de "scheduled" à "queued" quand l'heure arrivera.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {/* Date */}
              <div>
                <label className="text-[10px] font-semibold block mb-1" style={{ color: 'oklch(var(--foreground-600))' }}>Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 rounded-xl text-xs border"
                  style={{
                    backgroundColor: 'oklch(var(--background-50))',
                    borderColor: 'oklch(var(--background-200))',
                    color: 'oklch(var(--foreground-900))',
                  }}
                />
              </div>

              {/* Heure */}
              <div>
                <label className="text-[10px] font-semibold block mb-1" style={{ color: 'oklch(var(--foreground-600))' }}>Heure</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border"
                  style={{
                    backgroundColor: 'oklch(var(--background-50))',
                    borderColor: 'oklch(var(--background-200))',
                    color: 'oklch(var(--foreground-900))',
                  }}
                />
              </div>

              {/* Résolution */}
              <div>
                <label className="text-[10px] font-semibold block mb-1" style={{ color: 'oklch(var(--foreground-600))' }}>Résolution</label>
                <div className="flex items-center gap-1 p-0.5 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                  {(['720p', '1080p'] as RenderResolution[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setScheduleResolution(r)}
                      className="flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer whitespace-nowrap transition-all"
                      style={scheduleResolution === r
                        ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' }
                        : { color: 'oklch(var(--foreground-600))' }
                      }
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="text-[10px] font-semibold block mb-1" style={{ color: 'oklch(var(--foreground-600))' }}>Format</label>
                <div className="flex items-center gap-1 p-0.5 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                  {(['webm', 'mp4'] as OutputFormat[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setScheduleFormat(f)}
                      className="flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer whitespace-nowrap transition-all"
                      style={scheduleFormat === f
                        ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' }
                        : { color: 'oklch(var(--foreground-600))' }
                      }
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            {scheduleMsg && (
              <div className={`mb-3 p-2 rounded-lg text-xs font-medium ${
                scheduleMsg.type === 'success' ? '' : ''
              }`} style={{
                backgroundColor: scheduleMsg.type === 'success' ? '#86BC2520' : '#ef444420',
                color: scheduleMsg.type === 'success' ? '#86BC25' : '#ef4444',
              }}>
                {scheduleMsg.text}
              </div>
            )}

            <button
              onClick={handleScheduleRender}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all"
              style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
            >
              <CalendarClock className="w-4 h-4" />
              Programmer le Render
            </button>

            {/* Liste des jobs planifiés */}
            {scheduledRender.scheduledJobs.length > 0 && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'oklch(var(--background-200) / 0.5)' }}>
                <h3 className="text-xs font-semibold mb-2" style={{ color: 'oklch(var(--foreground-700))' }}>
                  Renders planifiés ({scheduledRender.scheduledJobs.length})
                </h3>
                <div className="space-y-1.5">
                  {scheduledRender.scheduledJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between gap-2 p-2 rounded-lg text-xs" style={{ backgroundColor: 'oklch(var(--background-100) / 0.5)' }}>
                      <div className="flex items-center gap-2 min-w-0">
                        <Calendar className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(var(--accent-500))' }} />
                        <span className="truncate" style={{ color: 'oklch(var(--foreground-800))' }}>
                          {new Date(job.scheduled_render_at).toLocaleString('fr-FR')}
                        </span>
                        <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'oklch(var(--foreground-500))' }}>
                          {job.resolution} · {job.output_format.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => scheduledRender.cancelScheduled(job.id)}
                        className="text-[10px] font-semibold cursor-pointer flex-shrink-0"
                        style={{ color: '#ef4444' }}
                      >
                        Annuler
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FILE D'ATTENTE — expandable */}
        {showQueue && (
          <div className="mb-6 rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <ListOrdered className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                File d'attente — Render Jobs
              </h2>
              <div className="flex items-center gap-3 text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
                  {jobQueue.pendingCount} en attente
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#3b82f6' }} />
                  {jobQueue.runningCount} en cours
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#86BC25' }} />
                  {jobQueue.completedCount} terminés
                </span>
              </div>
            </div>

            {jobQueue.jobs.length === 0 ? (
              <div className="text-center py-8">
                <ListOrdered className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(var(--foreground-300))' }} />
                <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>Aucun job dans la file. Lance un Render MP4 pour commencer.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {jobQueue.jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-4 p-3 rounded-xl border"
                    style={{
                      backgroundColor: 'oklch(var(--background-50))',
                      borderColor: 'oklch(var(--background-200) / 0.5)',
                    }}
                  >
                    {/* Status dot */}
                    {job.status === 'queued' && (
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#f59e0b' }} />
                    )}
                    {job.status === 'rendering' && (
                      <span className="w-3 h-3 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#3b82f6' }} />
                    )}
                    {job.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#86BC25' }} />
                    )}
                    {job.status === 'failed' && (
                      <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#ef4444' }} />
                    )}

                    {/* Job info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate" style={{ color: 'oklch(var(--foreground-900))' }}>
                          {job.resolution}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{
                          backgroundColor: job.status === 'completed' ? '#86BC2520' :
                            job.status === 'failed' ? '#ef444420' :
                            job.status === 'rendering' ? '#3b82f620' : '#f59e0b20',
                          color: job.status === 'completed' ? '#86BC25' :
                            job.status === 'failed' ? '#ef4444' :
                            job.status === 'rendering' ? '#3b82f6' : '#f59e0b',
                        }}>
                          {job.status}
                        </span>
                      </div>
                      {job.status === 'rendering' && (
                        <div className="mt-1.5 w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'oklch(var(--background-200))' }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${job.progress}%`, backgroundColor: '#3b82f6' }}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                        {job.started_at && <span>Démarré: {new Date(job.started_at).toLocaleTimeString('fr-FR')}</span>}
                        {job.completed_at && <span>Terminé: {new Date(job.completed_at).toLocaleTimeString('fr-FR')}</span>}
                        {job.video_url && <span className="flex items-center gap-0.5"><Film className="w-2.5 h-2.5" style={{ color: 'oklch(var(--accent-500))' }} /> MP4 prêt</span>}
                        {job.thumbnail_url && <span className="flex items-center gap-0.5"><Image className="w-2.5 h-2.5" style={{ color: 'oklch(var(--accent-500))' }} /> Thumb</span>}
                      </div>
                      {job.error_message && (
                        <p className="text-[10px] mt-1" style={{ color: '#ef4444' }}>{job.error_message}</p>
                      )}
                    </div>

                    {/* Actions */}
                    {job.status === 'completed' && job.video_url && (
                      <a
                        href={job.video_url}
                        download
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold cursor-pointer whitespace-nowrap"
                        style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                      >
                        <Download className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Render progress bar */}
        {isRendering && (
          <div className="mb-6 rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--accent-50) / 0.6)', borderColor: 'oklch(var(--accent-300))' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {renderProgress.status === 'uploading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
                ) : renderProgress.status === 'thumbnail' ? (
                  <Image className="w-5 h-5 animate-pulse" style={{ color: 'oklch(var(--accent-500))' }} />
                ) : (
                  <Film className="w-5 h-5 animate-pulse" style={{ color: 'oklch(var(--accent-500))' }} />
                )}
                <span className="text-sm font-semibold" style={{ color: 'oklch(var(--accent-900))' }}>
                  {renderProgress.status === 'starting' ? 'Initialisation...' :
                   renderProgress.status === 'thumbnail' ? 'Génération thumbnail...' :
                   renderProgress.status === 'uploading' ? 'Upload vers Storage...' :
                   `Rendu Remotion — ${resolution}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: 'oklch(var(--accent-700))' }}>
                  {renderProgress.currentFrame}/{renderProgress.totalFrames}
                </span>
                <button
                  onClick={cancelRender}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-all"
                  style={{ backgroundColor: 'oklch(var(--primary-100) / 0.8)', color: 'oklch(var(--primary-700))' }}
                >
                  <Square className="w-3 h-3" /> Annuler
                </button>
              </div>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'oklch(var(--background-200))' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round((renderProgress.currentFrame / renderProgress.totalFrames) * 100)}%`,
                  backgroundColor: 'oklch(var(--accent-500))',
                }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'oklch(var(--accent-700))' }}>{renderProgress.message}</p>
          </div>
        )}

        {/* Render completed success banner */}
        {renderProgress.status === 'completed' && renderProgress.videoUrl && (
          <div className="mb-6 rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--accent-50) / 0.6)', borderColor: 'oklch(var(--accent-300))' }}>
            <div className="flex items-start gap-4 flex-wrap">
              {/* Thumbnail preview */}
              {currentThumb && (
                <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border" style={{ borderColor: 'oklch(var(--accent-200))' }}>
                  <img src={currentThumb} alt="Thumbnail" className="w-full h-full" style={{ objectFit: 'cover' }} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#86BC25' }}>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'oklch(var(--accent-900))' }}>Rendu MP4 terminé !</p>
                    <p className="text-xs" style={{ color: 'oklch(var(--accent-700))' }}>
                      {renderProgress.message}
                      {currentThumb && ' · Thumbnail auto-généré'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={renderProgress.videoUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                >
                  <Download className="w-4 h-4" /> Télécharger MP4
                </a>
                <button
                  onClick={refetch}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Rafraîchir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render error banner */}
        {renderProgress.status === 'failed' && renderProgress.error && (
          <div className="mb-6 rounded-2xl border p-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: 'oklch(var(--primary-50) / 0.5)', borderColor: 'oklch(var(--primary-200))' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ef4444' }}>
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'oklch(var(--primary-700))' }}>Échec du rendu</p>
                <p className="text-xs" style={{ color: 'oklch(var(--primary-600))' }}>{renderProgress.error}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Réessayer
            </button>
          </div>
        )}

        {/* ffmpeg Conversion Progress */}
        {(conversion.status === 'loading' || conversion.status === 'converting') && (
          <div className="mb-6 rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--secondary-50) / 0.6)', borderColor: 'oklch(var(--secondary-200))' }}>
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'oklch(var(--secondary-500))' }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'oklch(var(--secondary-900))' }}>
                  {conversion.status === 'loading' ? 'Chargement ffmpeg.wasm...' : 'Conversion MP4 h264 en cours...'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'oklch(var(--secondary-700))' }}>{conversion.message}</p>
                {conversion.status === 'converting' && (
                  <div className="mt-2 w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'oklch(var(--background-200))' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${conversion.progress}%`, backgroundColor: 'oklch(var(--secondary-500))' }} />
                  </div>
                )}
              </div>
              <button
                onClick={cancelConversion}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: 'oklch(var(--primary-100) / 0.8)', color: 'oklch(var(--primary-700))' }}
              >
                <Square className="w-3 h-3" /> Annuler
              </button>
            </div>
          </div>
        )}

        {/* ffmpeg Conversion Completed */}
        {conversion.status === 'completed' && conversion.outputUrl && (
          <div className="mb-6 rounded-2xl border p-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: '#86BC2520', borderColor: '#86BC2540' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#86BC25' }}>
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#86BC25' }}>Conversion MP4 h264 terminée !</p>
                <p className="text-xs" style={{ color: 'oklch(var(--foreground-600))' }}>Le fichier MP4 est disponible au téléchargement ci-dessous.</p>
              </div>
            </div>
            <a
              href={conversion.outputUrl}
              download="render.mp4"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
            >
              <Download className="w-4 h-4" /> Télécharger MP4
            </a>
          </div>
        )}

        {/* ffmpeg Conversion Failed */}
        {conversion.status === 'failed' && conversion.error && (
          <div className="mb-6 rounded-2xl border p-5 flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: '#ef444420', borderColor: '#ef444440' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ef4444' }}>
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>Échec de la conversion MP4</p>
                <p className="text-xs mt-0.5" style={{ color: '#dc2626' }}>{conversion.error}</p>
                <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>Le WebM original reste disponible. La conversion MP4 via ffmpeg.wasm peut échouer sur les vidéos longues.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Run List */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border p-4 h-full" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                <Camera className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                Pipelines vidéo
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" style={{ color: '#ef4444' }} />
                  <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>{error}</p>
                </div>
              ) : runs.length === 0 ? (
                <div className="text-center py-12">
                  <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(var(--foreground-300))' }} />
                  <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>Aucune vidéo</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {runs.map(run => (
                    <button
                      key={run.id}
                      onClick={() => setSelectedRunId(run.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                        selectedRunId === run.id
                          ? 'ring-1'
                          : 'hover:border-foreground-200'
                      }`}
                      style={{
                        backgroundColor: selectedRunId === run.id ? 'oklch(var(--background-100))' : 'oklch(var(--background-50))',
                        borderColor: selectedRunId === run.id ? 'oklch(var(--foreground-300))' : 'oklch(var(--background-200) / 0.5)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {run.status === 'running' || run.status === 'rendering' ? (
                          <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#f59e0b' }} />
                        ) : run.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#86BC25' }} />
                        ) : (
                          <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#ef4444' }} />
                        )}
                        <span className="text-xs font-semibold truncate flex-1" style={{ color: 'oklch(var(--foreground-900))' }}>
                          {run.titre || 'Sans titre'}
                        </span>
                        {run.video_url && <Film className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(var(--accent-500))' }} />}
                        {run.thumbnail_url && <Image className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(var(--accent-500))' }} />}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] flex-wrap" style={{ color: 'oklch(var(--foreground-500))' }}>
                        <span className="px-1.5 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: REGULATOR_COLORS[run.regulateur] || '#9ca3af' }}>
                          {run.regulateur}
                        </span>
                        {run.resolution && (
                          <span className="px-1.5 py-0.5 rounded-full font-mono" style={{ backgroundColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-700))' }}>
                            {run.resolution}
                          </span>
                        )}
                        {run.duree_sec && <span><Clock className="w-3 h-3 inline mr-0.5" />{Math.round(run.duree_sec / 60)}min</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Player / Preview Area */}
          <div className="lg:col-span-2">
            {!selectedRun ? (
              <div className="rounded-2xl border p-12 text-center" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                <Eye className="w-12 h-12 mx-auto mb-3" style={{ color: 'oklch(var(--foreground-300))' }} />
                <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>Sélectionnez un pipeline pour prévisualiser</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* View mode tabs + QUALITY SELECTOR + Render MP4 button */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 p-1 rounded-xl flex-1" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                    {([
                      { id: 'remotion' as const, label: 'Remotion Player', icon: Sparkles },
                      { id: 'player' as const, label: 'Lecteur Vidéo', icon: Play },
                      { id: 'details' as const, label: 'Détails Brief', icon: FileText },
                      { id: 'gallery' as const, label: 'Galerie', icon: Image },
                    ]).map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setViewMode(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-all`}
                        style={viewMode === tab.id ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' } : { color: 'oklch(var(--foreground-600))' }}
                      >
                        <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* RESOLUTION SELECTOR */}
                  {brief && viewMode === 'remotion' && !isRendering && renderProgress.status !== 'completed' && (
                    <div className="flex items-center gap-1.5 p-1 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                      <SlidersHorizontal className="w-3.5 h-3.5 ml-2" style={{ color: 'oklch(var(--foreground-500))' }} />
                      {(['720p', '1080p'] as RenderResolution[]).map((res) => {
                        const preset = RESOLUTION_PRESETS[res];
                        return (
                          <button
                            key={res}
                            onClick={() => setResolution(res)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all`}
                            style={resolution === res
                              ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' }
                              : { color: 'oklch(var(--foreground-600))' }
                            }
                          >
                            <Monitor className="w-3 h-3" />
                            {res}
                            <span className="text-[10px] opacity-60 font-normal hidden sm:inline">
                              {preset.width}×{preset.height}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* FORMAT SELECTOR */}
                  {brief && viewMode === 'remotion' && !isRendering && renderProgress.status !== 'completed' && (
                    <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                      <FileVideo className="w-3.5 h-3.5 ml-1.5" style={{ color: 'oklch(var(--foreground-500))' }} />
                      {(['webm', 'mp4'] as OutputFormat[]).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setOutputFormat(fmt)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all`}
                          style={outputFormat === fmt
                            ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' }
                            : { color: 'oklch(var(--foreground-600))' }
                          }
                        >
                          {fmt === 'mp4' ? 'MP4 h264' : 'WebM VP9'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* SCHEDULE BUTTON */}
                  {brief && !isRendering && renderProgress.status !== 'completed' && (
                    <button
                      onClick={() => setShowScheduler(!showScheduler)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap transition-all ${
                        showScheduler ? 'ring-1' : ''
                      }`}
                      style={showScheduler
                        ? { backgroundColor: 'oklch(var(--accent-100) / 0.5)', color: 'oklch(var(--accent-700))' }
                        : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }
                      }
                    >
                      <CalendarClock className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Planifier</span>
                    </button>
                  )}

                  {/* RENDER MP4 BUTTON */}
                  {brief && viewMode === 'remotion' && (
                    <button
                      onClick={handleRenderMP4}
                      disabled={isRendering}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all disabled:opacity-50 animate-pulse"
                      style={{
                        backgroundColor: 'oklch(var(--accent-500))',
                        color: 'oklch(var(--background-50))',
                      }}
                    >
                      {isRendering ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Rendu {resolution}...
                        </>
                      ) : (
                        <>
                          <Film className="w-4 h-4" />
                          Render {resolution}
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* THUMBNAIL PREVIEW (quand dispo mais pas en mode player) */}
                {currentThumb && viewMode !== 'player' && renderProgress.status !== 'completed' && (
                  <div className="rounded-xl border overflow-hidden flex items-center gap-3 p-3" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
                    <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border" style={{ borderColor: 'oklch(var(--background-200))' }}>
                      <img src={currentThumb} alt="Thumbnail" className="w-full h-full" style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'oklch(var(--foreground-900))' }}>
                        <Image className="w-3.5 h-3.5" style={{ color: 'oklch(var(--accent-500))' }} />
                        Thumbnail auto-généré
                      </p>
                      <p className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>Premier frame du rendu — 640px WebP</p>
                    </div>
                  </div>
                )}

                {/* REMOTION PLAYER */}
                {viewMode === 'remotion' && brief && (
                  <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                    <div ref={playerContainerRef} className="bg-black" style={{ aspectRatio: '16/9' }}>
                      <Player
                        component={AnalyseReglementaire}
                        inputProps={{ brief }}
                        durationInFrames={TOTAL_DURATION_FRAMES}
                        compositionWidth={RESOLUTION_PRESETS[resolution].width}
                        compositionHeight={RESOLUTION_PRESETS[resolution].height}
                        fps={FPS}
                        style={{ width: '100%', height: '100%' }}
                        controls
                        autoPlay
                        loop
                      />
                    </div>
                    <div className="p-4 border-t" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>{brief.titre}</h3>
                          <p className="text-xs mt-0.5 italic" style={{ color: 'oklch(var(--foreground-500))' }}>{brief.hook}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-1 rounded-full font-bold" style={{ backgroundColor: `${REGULATOR_COLORS[brief.regulateur]}20`, color: REGULATOR_COLORS[brief.regulateur] }}>
                            {brief.regulateur}
                          </span>
                          <span className="text-[10px] px-2 py-1 rounded-full font-mono" style={{ backgroundColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-700))' }}>
                            {resolution} · {RESOLUTION_PRESETS[resolution].width}×{RESOLUTION_PRESETS[resolution].height}
                          </span>
                          <span className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                            {brief.points_cles.length} points · {TOTAL_DURATION_FRAMES / FPS}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* HTML5 VIDEO PLAYER */}
                {viewMode === 'player' && (
                  <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                    {selectedRun.video_url ? (
                      <div className="bg-black" style={{ aspectRatio: '16/9' }}>
                        <video
                          src={selectedRun.video_url}
                          controls
                          className="w-full h-full"
                          style={{ objectFit: 'contain' }}
                          poster={selectedRun.thumbnail_url || undefined}
                        >
                          Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 px-4" style={{ backgroundColor: 'oklch(var(--background-100))' }}>
                        <Camera className="w-16 h-16 mb-4" style={{ color: 'oklch(var(--foreground-300))' }} />
                        <p className="text-sm font-semibold" style={{ color: 'oklch(var(--foreground-700))' }}>Vidéo non disponible</p>
                        <p className="text-xs mt-1 text-center" style={{ color: 'oklch(var(--foreground-500))' }}>
                          Lancez le Render MP4 depuis l'onglet Remotion Player pour générer la vidéo.
                        </p>
                        <button
                          onClick={() => setViewMode('remotion')}
                          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
                          style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Ouvrir Remotion Player
                        </button>
                      </div>
                    )}

                    {selectedRun.video_url && (
                      <div className="p-4 border-t" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold truncate" style={{ color: 'oklch(var(--foreground-950))' }}>{selectedRun.titre}</h3>
                            <div className="flex items-center gap-2 mt-1 text-xs flex-wrap" style={{ color: 'oklch(var(--foreground-500))' }}>
                              {selectedRun.duree_sec && <span>{Math.round(selectedRun.duree_sec / 60)} min</span>}
                              {selectedRun.resolution && <span className="font-mono">{selectedRun.resolution}</span>}
                              {selectedRun.completed_at && <span>· {new Date(selectedRun.completed_at).toLocaleDateString('fr-FR')}</span>}
                              {selectedRun.thumbnail_url && <span className="flex items-center gap-0.5"><Image className="w-3 h-3" style={{ color: 'oklch(var(--accent-500))' }} /> Thumbnail</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {currentThumb && (
                              <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0 border" style={{ borderColor: 'oklch(var(--background-200))' }}>
                                <img src={currentThumb} alt="Thumb" className="w-full h-full" style={{ objectFit: 'cover' }} />
                              </div>
                            )}
                            <a
                              href={selectedRun.video_url}
                              download
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
                              style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                            >
                              <Download className="w-3.5 h-3.5" /> Télécharger
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* GALERIE THUMBNAILS */}
                {viewMode === 'gallery' && (
                  <ThumbnailGallery entries={galleryEntries} />
                )}

                {/* DETAILS BRIEF */}
                {viewMode === 'details' && brief && (
                  <div className="space-y-3">
                    {/* Brief Header + Thumbnail */}
                    <div className="rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                      <div className="flex items-start gap-4">
                        {currentThumb && (
                          <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border" style={{ borderColor: 'oklch(var(--background-200))' }}>
                            <img src={currentThumb} alt="Thumbnail" className="w-full h-full" style={{ objectFit: 'cover' }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: REGULATOR_COLORS[brief.regulateur] }}>
                              {brief.regulateur}
                            </span>
                            <span className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>ID: {brief.id}</span>
                          </div>
                          <h2 className="text-lg font-bold mb-1" style={{ color: 'oklch(var(--foreground-950))' }}>{brief.titre}</h2>
                          <p className="text-sm italic" style={{ color: 'oklch(var(--foreground-600))' }}>"{brief.hook}"</p>
                        </div>
                      </div>
                    </div>

                    {/* Points clés */}
                    <div className="rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                        <FileText className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                        Points clés ({brief.points_cles.length})
                      </h3>
                      <div className="space-y-2">
                        {brief.points_cles.map((point, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100) / 0.5)' }}>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ backgroundColor: REGULATOR_COLORS[brief.regulateur], color: '#fff' }}>
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium" style={{ color: 'oklch(var(--foreground-900))' }}>{point.texte}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold" style={{ color: REGULATOR_COLORS[brief.regulateur] }}>
                                  {point.citation.regulateur} {point.citation.reference}
                                </span>
                                {point.citation.article && (
                                  <span className="text-[10px]" style={{ color: 'oklch(var(--foreground-500))' }}>{point.citation.article}</span>
                                )}
                              </div>
                            </div>
                            <span className="text-[10px] flex-shrink-0" style={{ color: 'oklch(var(--foreground-400))' }}>{point.duree_sec}s</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="rounded-2xl border p-5 flex items-center justify-between" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                      <div>
                        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                          <Share2 className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                          Call to Action
                        </h3>
                        <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-600))' }}>{brief.cta_texte}</p>
                      </div>
                      <span className="text-xs px-3 py-1.5 rounded-lg font-mono" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}>
                        {brief.cta_url}
                      </span>
                    </div>

                    {/* Render Section */}
                    <div className="rounded-2xl border p-5" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                        <Film className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
                        Rendu MP4 — 100% KOS
                      </h3>
                      <p className="text-xs mb-4" style={{ color: 'oklch(var(--foreground-500))' }}>
                        Rendu natif navigateur via Canvas + MediaRecorder Web API. Aucune API externe.
                        La vidéo est encodée en WebM VP9, thumbnail WebP auto-généré, et uploadée sur KOS Storage.
                      </p>

                      {/* Rendu quality preview info */}
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ backgroundColor: 'oklch(var(--background-100) / 0.5)' }}>
                        <Monitor className="w-5 h-5 flex-shrink-0" style={{ color: 'oklch(var(--accent-500))' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold" style={{ color: 'oklch(var(--foreground-900))' }}>
                            Résolution de rendu : {resolution} ({RESOLUTION_PRESETS[resolution].width}×{RESOLUTION_PRESETS[resolution].height})
                          </p>
                          <p className="text-[10px] mt-0.5" style={{ color: 'oklch(var(--foreground-500))' }}>
                            Bitrate: {Math.round(RESOLUTION_PRESETS[resolution].bitrate / 1000000)} Mbps · ~{resolution === '720p' ? '25' : '40'}s d'encodage
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 p-1 rounded-lg" style={{ backgroundColor: 'oklch(var(--background-200))' }}>
                          {(['720p', '1080p'] as RenderResolution[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => setResolution(r)}
                              className="px-2.5 py-1 rounded-md text-[10px] font-semibold cursor-pointer whitespace-nowrap transition-all"
                              style={resolution === r
                                ? { backgroundColor: 'oklch(var(--foreground-950))', color: '#fff' }
                                : { color: 'oklch(var(--foreground-600))' }
                              }
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      {!isRendering ? (
                        <button
                          onClick={handleRenderMP4}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap transition-all"
                          style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
                        >
                          <Film className="w-4 h-4" />
                          Lancer le Render {resolution}
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'oklch(var(--background-200))' }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${Math.round((renderProgress.currentFrame / renderProgress.totalFrames) * 100)}%`,
                                backgroundColor: 'oklch(var(--accent-500))',
                              }}
                            />
                          </div>
                          <p className="text-xs" style={{ color: 'oklch(var(--accent-700))' }}>{renderProgress.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}