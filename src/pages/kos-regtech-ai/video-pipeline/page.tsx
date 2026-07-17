import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useKosDispatch } from '@/hooks/useKosDispatch';
import {
  Video, Play, Zap, CheckCircle2, XCircle, Clock,
  Loader2, RefreshCw, ArrowLeft, Film, Radio,
  FileText, Search, Globe, Share2, BarChart3, ChevronRight,
  Sparkles, Youtube, Camera, Hash, Eye,
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
  points_cles: Array<{ name: string; status: string; startedAt: string; completedAt?: string; result?: any }> | null;
  sources: any[] | null;
  result: any;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

const PIPELINE_STEPS = [
  { key: 'veille', label: 'Veille', icon: Radio },
  { key: 'recherche', label: 'Recherche RAG', icon: Search },
  { key: 'factcheck', label: 'Fact-Check', icon: CheckCircle2 },
  { key: 'brief_generation', label: 'Brief Vidéo', icon: FileText },
  { key: 'script', label: 'Script', icon: Sparkles },
  { key: 'video_render', label: 'Rendu Vidéo', icon: Film },
  { key: 'seo_youtube', label: 'SEO YouTube', icon: Youtube },
  { key: 'publication', label: 'Publication', icon: Globe },
  { key: 'diffusion', label: 'Diffusion', icon: Share2 },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const REGULATORS = ['BCEAO', 'OHADA', 'COBAC', 'BEAC', 'GAFI', 'IFRS', 'UEMOA'];

const REGULATOR_COLORS: Record<string, string> = {
  BCEAO: '#D4AF37',
  OHADA: '#c9a227',
  COBAC: '#86BC25',
  BEAC: '#2E8B57',
  GAFI: '#e67e22',
  IFRS: '#3498db',
  UEMOA: '#e74c3c',
};

function useVideoPipelineRuns() {
  const [runs, setRuns] = useState<VideoPipelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('video_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (dbError) throw dbError;
      setRuns((data || []) as VideoPipelineRun[]);
    } catch (err: any) {
      setError(err?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRuns(); }, [fetchRuns]);

  return { runs, loading, error, refetch: fetchRuns };
}

export default function KOSVideoPipelinePage() {
  const { runs, loading, error, refetch } = useVideoPipelineRuns();
  const { runVideoPipeline: dispatchVideo } = useKosDispatch();
  const [query, setQuery] = useState('');
  const [selectedRegulator, setSelectedRegulator] = useState('BCEAO');
  const [titre, setTitre] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [expandedRun, setExpandedRun] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const result = await dispatchVideo({
        query: query.trim(),
        regulateur: selectedRegulator,
        titre: titre.trim() || undefined,
      });

      if (!result.ok) throw new Error(result.error || 'Erreur pipeline');

      setSubmitStatus('success');
      const briefTitle = (result.data as Record<string, unknown>)?.brief as Record<string, unknown> | undefined;
      setSubmitMessage(`Pipeline "${briefTitle?.titre || query}" lancé avec succès !`);
      setQuery('');
      setTitre('');
      refetch();
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitMessage(err?.message || 'Erreur lors du lancement du pipeline');
    } finally {
      setSubmitting(false);
    }
  };

  const runningCount = runs.filter(r => r.status === 'running').length;
  const completedCount = runs.filter(r => r.status === 'completed').length;
  const failedCount = runs.filter(r => r.status === 'failed').length;

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
                <Video className="w-6 h-6" style={{ color: 'oklch(var(--accent-500))' }} />
                KOS Video Pipeline
              </h1>
              <p className="text-sm mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
                Pipeline automatisé Veille → RAG → FactCheck → Brief → Script → Vidéo → Publication
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/kos-regtech-ai/video-control/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: '#FF0000', color: '#fff' }}>
              <i className="ri-dashboard-line" /> Control Center
            </a>
            <a href="/kos-scan-complet-execution/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: '#C2410C', color: '#fff' }}>
              <i className="ri-scan-line" /> Scan + Exécuter
            </a>
            <a href="/kos-regtech-ai/video-preview/" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}>
              <Eye className="w-4 h-4" /> Preview
            </a>
            <button onClick={refetch} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-all" style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-700))' }}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Stats Mini */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl p-4 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>Total</p>
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
        </div>

        {/* Trigger Pipeline Form */}
        <div className="rounded-2xl p-6 border mb-8" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <h2 className="text-sm font-semibold mb-5 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <Play className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
            Lancer un pipeline vidéo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'oklch(var(--foreground-600))' }}>
                  Sujet / Requête réglementaire
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Ex: "Instruction BCEAO N°007-2026 sur le KYC"'
                  className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
                  style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-950))' }}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'oklch(var(--foreground-600))' }}>
                  Régulateur
                </label>
                <select
                  value={selectedRegulator}
                  onChange={(e) => setSelectedRegulator(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none cursor-pointer transition-all appearance-none"
                  style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-950))' }}
                >
                  {REGULATORS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'oklch(var(--foreground-600))' }}>
                Titre de la vidéo (optionnel)
              </label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder='Laissez vide pour auto-génération...'
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
                style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200))', color: 'oklch(var(--foreground-950))' }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting || !query.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                {submitting ? 'Lancement...' : 'Lancer le Pipeline'}
              </button>

              {submitStatus === 'success' && (
                <span className="text-sm flex items-center gap-1" style={{ color: '#86BC25' }}>
                  <CheckCircle2 className="w-4 h-4" /> {submitMessage}
                </span>
              )}
              {submitStatus === 'error' && (
                <span className="text-sm flex items-center gap-1" style={{ color: '#ef4444' }}>
                  <XCircle className="w-4 h-4" /> {submitMessage}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Pipeline Runs */}
        <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <h2 className="text-sm font-semibold mb-5 flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <Film className="w-4 h-4" style={{ color: 'oklch(var(--accent-500))' }} />
            Pipelines exécutés
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <XCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#ef4444' }} />
              <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>{error}</p>
            </div>
          ) : runs.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-10 h-10 mx-auto mb-3" style={{ color: 'oklch(var(--foreground-300))' }} />
              <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>Aucun pipeline exécuté</p>
              <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-400))' }}>Lancez votre premier pipeline vidéo ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-3">
              {runs.map(run => (
                <div key={run.id} className="rounded-xl border overflow-hidden" style={{ borderColor: 'oklch(var(--background-200) / 0.7)' }}>
                  {/* Run Header */}
                  <button
                    onClick={() => setExpandedRun(expandedRun === run.id ? null : run.id)}
                    className="w-full flex items-center gap-4 p-4 cursor-pointer transition-all text-left"
                    style={{ backgroundColor: 'oklch(var(--background-100) / 0.4)' }}
                  >
                    {/* Status Dot */}
                    <div className="flex-shrink-0">
                      {run.status === 'running' || run.status === 'pending' ? (
                        <span className="w-3 h-3 rounded-full animate-pulse block" style={{ backgroundColor: '#f59e0b' }} />
                      ) : run.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#86BC25' }} />
                      ) : (
                        <XCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate" style={{ color: 'oklch(var(--foreground-950))' }}>
                          {run.titre || 'Pipeline sans titre'}
                        </p>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex-shrink-0" style={{ backgroundColor: REGULATOR_COLORS[run.regulateur] || '#9ca3af' }}>
                          {run.regulateur}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                          {run.created_at ? new Date(run.created_at).toLocaleString('fr-FR') : '—'}
                        </span>
                        {run.status === 'running' && (
                          <span className="text-xs font-medium" style={{ color: '#f59e0b' }}>
                            Étape: {run.current_step}
                          </span>
                        )}
                        {run.duree_sec && (
                          <span className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                            {Math.round(run.duree_sec / 60)} min
                          </span>
                        )}
                      </div>
                      {run.hook && (
                        <p className="text-xs mt-1 truncate italic" style={{ color: 'oklch(var(--foreground-500))' }}>
                          {run.hook}
                        </p>
                      )}
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${expandedRun === run.id ? 'rotate-90' : ''}`} style={{ color: 'oklch(var(--foreground-400))' }} />
                  </button>

                  {/* Expanded Detail */}
                  {expandedRun === run.id && (
                    <div className="p-4 border-t" style={{ borderColor: 'oklch(var(--background-200) / 0.5)', backgroundColor: 'oklch(var(--background-50))' }}>
                      {/* Pipeline Steps Timeline */}
                      {run.points_cles && Array.isArray(run.points_cles) && run.points_cles.length > 0 ? (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-3" style={{ color: 'oklch(var(--foreground-700))' }}>
                            Étapes du pipeline
                          </p>
                          <div className="grid grid-cols-5 gap-2">
                            {PIPELINE_STEPS.map((step, i) => {
                              const stepData = run.points_cles?.find((s: any) => s.name === step.key);
                              const status = stepData?.status || 'pending';
                              const isActive = status === 'running';
                              const isDone = status === 'completed';
                              const isFailed = status === 'failed';

                              return (
                                <div key={step.key} className="flex flex-col items-center gap-1.5">
                                  <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                                    isActive ? 'animate-pulse' : ''
                                  }`} style={{
                                    backgroundColor: isDone ? '#86BC25' : isFailed ? '#ef4444' : isActive ? '#f59e0b' : 'oklch(var(--background-100))',
                                  }}>
                                    <step.icon className="w-3.5 h-3.5" style={{ color: isDone || isFailed || isActive ? '#fff' : 'oklch(var(--foreground-400))' }} />
                                  </div>
                                  <span className="text-[9px] text-center leading-tight" style={{ color: isDone ? '#86BC25' : isFailed ? '#ef4444' : 'oklch(var(--foreground-500))' }}>
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs mb-4" style={{ color: 'oklch(var(--foreground-500))' }}>
                          Aucune donnée d'étape disponible
                        </p>
                      )}

                      {/* Sources */}
                      {run.sources && Array.isArray(run.sources) && run.sources.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-2" style={{ color: 'oklch(var(--foreground-700))' }}>
                            Sources réglementaires ({run.sources.length})
                          </p>
                          <div className="space-y-1.5">
                            {(run.sources as any[]).map((src: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-xs p-2 rounded-lg" style={{ backgroundColor: 'oklch(var(--background-100) / 0.5)' }}>
                                <Hash className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(var(--accent-500))' }} />
                                <span className="font-medium" style={{ color: 'oklch(var(--foreground-900))' }}>
                                  {src.regulateur} {src.ref}
                                </span>
                                {src.article && (
                                  <span style={{ color: 'oklch(var(--foreground-500))' }}>{src.article}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Video URL */}
                      {run.video_url && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold mb-1" style={{ color: 'oklch(var(--foreground-700))' }}>
                            Vidéo générée
                          </p>
                          <a href={run.video_url} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color: 'oklch(var(--accent-500))' }}>
                            {run.video_url}
                          </a>
                        </div>
                      )}

                      {/* Error */}
                      {run.error_message && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#fef2f2' }}>
                          <p className="text-xs font-medium mb-1" style={{ color: '#dc2626' }}>Erreur</p>
                          <p className="text-xs" style={{ color: '#991b1b' }}>{run.error_message}</p>
                        </div>
                      )}

                      {/* IDs */}
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: 'oklch(var(--background-200) / 0.5)' }}>
                        <p className="text-[10px] font-mono" style={{ color: 'oklch(var(--foreground-400))' }}>
                          ID: {run.brief_id} | {run.started_at && `Démarré: ${new Date(run.started_at).toLocaleString('fr-FR')}`}
                          {run.completed_at && ` | Terminé: ${new Date(run.completed_at).toLocaleString('fr-FR')}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}