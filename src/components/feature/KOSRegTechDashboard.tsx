import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PipelineRun } from '@/hooks/usePipelineRealtime';
import {
  FileCheck, TrendingUp, Users, BarChart3, Activity, Clock, Globe, Zap,
  Play, CheckCircle2, XCircle, AlertTriangle, Loader2, Filter, ChevronDown,
  ArrowRight, RefreshCw, History, Film, Eye,
} from 'lucide-react';

const PIPELINE_STEPS = [
  'Veille réglementaire',
  'Rédaction + SEO',
  'Fact-checking',
  'Contrôle Qualité Big Four',
  'Contrôle Marque',
  'Déclinaison omnicanale',
  'Publication',
  'Tracking KPI',
];

const STEP_LABELS: Record<string, string> = {
  'Veille réglementaire': 'Veille',
  'Rédaction + SEO': 'SEO+Rédac',
  'Fact-checking': 'FactCheck',
  'Contrôle Qualité Big Four': 'Qualité',
  'Contrôle Marque': 'Marque',
  'Déclinaison omnicanale': 'Omnicanal',
  'Publication': 'Publication',
  'Tracking KPI': 'KPI',
  'Terminé': 'Terminé',
};

function StatusBadge({ status }: { status: string }) {
  const config = {
    running: { bg: 'oklch(var(--accent-100) / 0.8)', text: 'oklch(var(--accent-900))', icon: Loader2, animate: true },
    completed: { bg: 'oklch(var(--accent-50) / 0.8)', text: 'oklch(var(--accent-700))', icon: CheckCircle2 },
    failed: { bg: 'oklch(var(--primary-50) / 0.8)', text: 'oklch(var(--primary-700))', icon: XCircle },
    pending: { bg: 'oklch(var(--secondary-100) / 0.7)', text: 'oklch(var(--secondary-900))', icon: Clock },
  }[status] || { bg: 'oklch(var(--background-100))', text: 'oklch(var(--foreground-500))', icon: Clock };

  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <Icon className={`w-3 h-3 ${config.animate ? 'animate-spin' : ''}`} />
      {status === 'running' ? 'En cours' : status === 'completed' ? 'Succès' : status === 'failed' ? 'Échec' : 'En attente'}
    </span>
  );
}

function StepIndicator({ currentStep, status }: { currentStep: string | null; status: string }) {
  if (!currentStep || status === 'pending') return null;

  const currentIdx = PIPELINE_STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {PIPELINE_STEPS.map((step, idx) => {
        const isCurrent = step === currentStep && status === 'running';
        const isDone = status === 'completed' || (status === 'running' && idx < currentIdx) || (status === 'failed' && idx < currentIdx);
        const isFailed = status === 'failed' && idx === currentIdx;

        return (
          <div key={step} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: isFailed
                  ? 'oklch(var(--primary-500))'
                  : isCurrent
                  ? 'oklch(var(--accent-500))'
                  : isDone
                  ? 'oklch(var(--accent-300))'
                  : 'oklch(var(--background-200))',
              }}
              title={step}
            />
            {idx < PIPELINE_STEPS.length - 1 && (
              <div className="w-3 h-px" style={{ backgroundColor: 'oklch(var(--background-200))' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function regTechDashboard() {
  const [selectedRun, setSelectedRun] = useState<PipelineRun | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: kpis } = useQuery({
    queryKey: ['kos-kpi'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('kos-kpi-recalculation-engine', {
        body: { action: 'realtime' },
      });
      if (error) throw new Error(error.message);
      return data as any;
    },
    refetchInterval: 30000,
  });

  const { data: pipelineRuns, isLoading: runsLoading } = useQuery<PipelineRun[]>({
    queryKey: ['kos-pipeline-runs', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('kos_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data || []) as PipelineRun[];
    },
    refetchInterval: 5000,
  });

  const { data: videoStats } = useQuery({
    queryKey: ['kos-video-pipeline-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('video_pipeline_runs')
        .select('id, status, video_url, regulateur, titre')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) return { runs: [], total: 0, rendered: 0 };
      const runs = (data || []) as any[];
      return {
        runs,
        total: runs.length,
        rendered: runs.filter((r: any) => r.video_url != null).length,
      };
    },
    refetchInterval: 15000,
  });

  const stats = useMemo(() => {
    const all = pipelineRuns || [];
    return {
      total: all.length,
      completed: all.filter(r => r.status === 'completed').length,
      failed: all.filter(r => r.status === 'failed').length,
      running: all.filter(r => r.status === 'running').length,
      avgQuality: all
        .filter(r => r.quality_score != null)
        .reduce((sum, r) => sum + (r.quality_score || 0), 0) / (all.filter(r => r.quality_score != null).length || 1),
    };
  }, [pipelineRuns]);

  const runningRuns = (pipelineRuns || []).filter(r => r.status === 'running');

  return (
    <div className="space-y-6">
      {/* Live running pipelines */}
      {runningRuns.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'oklch(var(--accent-500))' }} />
            Pipeline{ runningRuns.length > 1 ? 's' : '' } en cours ({runningRuns.length})
          </h3>
          {runningRuns.map(run => (
            <div
              key={run.id}
              className="p-4 rounded-xl border animate-pulse"
              style={{
                backgroundColor: 'oklch(var(--accent-50) / 0.5)',
                borderColor: 'oklch(var(--accent-300))',
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'oklch(var(--foreground-950))' }}>
                      {run.regulator_source} — {run.doc_id}
                    </p>
                    <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                      Étape : {STEP_LABELS[run.current_step || ''] || run.current_step}
                    </p>
                  </div>
                </div>
                <StepIndicator currentStep={run.current_step} status={run.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Total</p>
          <p className="text-2xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>{stats.total}</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Succès</p>
          <p className="text-2xl font-bold" style={{ color: 'oklch(var(--accent-500))' }}>{stats.completed}</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Échecs</p>
          <p className="text-2xl font-bold" style={{ color: 'oklch(var(--primary-500))' }}>{stats.failed}</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>En cours</p>
          <p className="text-2xl font-bold" style={{ color: 'oklch(var(--accent-500))' }}>{stats.running}</p>
        </div>
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
          <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Qualité moy.</p>
          <p className="text-2xl font-bold" style={{ color: 'oklch(var(--accent-500))' }}>{Math.round(stats.avgQuality)}%</p>
        </div>
      </div>

      {/* Video Pipeline Section */}
      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: 'oklch(var(--background-50))',
          borderColor: 'oklch(var(--background-200) / 0.7)',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'oklch(var(--accent-100) / 0.8)' }}>
              <Film className="w-5 h-5" style={{ color: 'oklch(var(--accent-500))' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'oklch(var(--foreground-950))' }}>
                Pipeline Vidéo Remotion
                {videoStats && (videoStats.rendered > 0) && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: 'oklch(var(--accent-100))', color: 'oklch(var(--accent-700))' }}>
                    {videoStats.rendered} MP4
                  </span>
                )}
              </h3>
              <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                Rendu vidéo réglementaire · Canvas + MediaRecorder · 0 API externe
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/kos-regtech-ai/video-preview/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap transition-all"
              style={{ backgroundColor: 'oklch(var(--accent-500))', color: 'oklch(var(--background-50))' }}
            >
              <Eye className="w-4 h-4" />
              Video Preview
            </a>
            <a
              href="/kos-regtech-ai/video-pipeline/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap transition-all"
              style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
            >
              <Play className="w-3.5 h-3.5" />
              Pipeline
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Video runs mini-list */}
        {videoStats && videoStats.runs.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {videoStats.runs.slice(0, 6).map((run: any) => (
              <a
                key={run.id}
                href="/kos-regtech-ai/video-preview/"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap transition-all border"
                style={{
                  backgroundColor: run.video_url ? 'oklch(var(--accent-50) / 0.6)' : 'oklch(var(--background-50))',
                  borderColor: run.video_url ? 'oklch(var(--accent-200))' : 'oklch(var(--background-200) / 0.5)',
                  color: 'oklch(var(--foreground-700))',
                }}
              >
                {run.status === 'completed' && run.video_url ? (
                  <CheckCircle2 className="w-3 h-3" style={{ color: '#86BC25' }} />
                ) : run.status === 'running' || run.status === 'rendering' ? (
                  <Loader2 className="w-3 h-3 animate-spin" style={{ color: '#f59e0b' }} />
                ) : (
                  <Film className="w-3 h-3" style={{ color: 'oklch(var(--foreground-400))' }} />
                )}
                <span className="font-semibold" style={{ color: 'oklch(var(--foreground-900))' }}>{run.regulateur}</span>
                <span className="truncate max-w-[120px]" style={{ color: 'oklch(var(--foreground-600))' }}>{run.titre || 'Sans titre'}</span>
                {run.video_url && <Film className="w-3 h-3" style={{ color: 'oklch(var(--accent-500))' }} />}
              </a>
            ))}
            {videoStats.runs.length > 6 && (
              <span className="inline-flex items-center px-2 py-1 text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                +{videoStats.runs.length - 6} autres
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs py-2" style={{ color: 'oklch(var(--foreground-400))' }}>
            Aucun pipeline vidéo pour le moment.{' '}
            <a href="/kos-regtech-ai/video-pipeline/" className="font-semibold underline" style={{ color: 'oklch(var(--accent-500))' }}>
              Lancer le premier →
            </a>
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4" style={{ color: 'oklch(var(--foreground-500))' }} />
        {['all', 'running', 'completed', 'failed'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
            style={
              statusFilter === s
                ? { backgroundColor: 'oklch(var(--secondary-500))', color: 'oklch(var(--background-50))' }
                : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }
            }
          >
            {s === 'all' ? 'Tous' : s === 'running' ? 'En cours' : s === 'completed' ? 'Succès' : 'Échecs'}
          </button>
        ))}
        <div className="flex-1" />
        <a
          href="/kos-regtech-ai/history/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
        >
          <History className="w-3.5 h-3.5" />
          Historique complet
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Pipeline runs table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          backgroundColor: 'oklch(var(--background-50))',
          borderColor: 'oklch(var(--background-200) / 0.7)',
        }}
      >
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{ borderColor: 'oklch(var(--background-200) / 0.7)' }}
        >
          <Activity className="w-4 h-4" style={{ color: 'oklch(var(--secondary-500))' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'oklch(var(--foreground-950))' }}>
            Exécutions récentes
          </h3>
          <span className="text-xs ml-auto" style={{ color: 'oklch(var(--foreground-500))' }}>
            Auto-refresh 5s
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottomColor: 'oklch(var(--background-200) / 0.7)' }} className="border-b">
                <th className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Statut</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Régulateur</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Progression</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Qualité</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {(pipelineRuns || []).map(run => (
                <tr
                  key={run.id}
                  className="border-b transition-colors cursor-pointer hover:bg-background-100/50"
                  style={{ borderBottomColor: 'oklch(var(--background-200) / 0.4)' }}
                  onClick={() => setSelectedRun(run)}
                >
                  <td className="px-4 py-3">
                    <StatusBadge status={run.status} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-xs" style={{ color: 'oklch(var(--foreground-900))' }}>
                      {run.regulator_source || '—'}
                    </span>
                    <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>{run.doc_id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StepIndicator currentStep={run.current_step} status={run.status} />
                    {run.current_step && (
                      <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
                        {run.current_step}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {run.quality_score != null ? (
                      <span className="font-semibold text-xs"
                        style={{ color: run.quality_score >= 95 ? 'oklch(var(--accent-500))' : 'oklch(var(--primary-500))' }}
                      >
                        {run.quality_score}%
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: 'oklch(var(--foreground-400))' }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                    {new Date(run.started_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
              {(!pipelineRuns || pipelineRuns.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-xs" style={{ color: 'oklch(var(--foreground-400))' }}>
                    Aucune exécution de pipeline pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run detail modal */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRun(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-lg rounded-2xl border p-6 max-h-[80vh] overflow-y-auto"
            style={{
              backgroundColor: 'oklch(var(--background-50))',
              borderColor: 'oklch(var(--background-200) / 0.7)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>
                Détails du pipeline
              </h3>
              <button onClick={() => setSelectedRun(null)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
                style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-500))' }}
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'oklch(var(--foreground-500))' }}>ID</span>
                <span className="font-mono text-xs" style={{ color: 'oklch(var(--foreground-700))' }}>{selectedRun.id}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'oklch(var(--foreground-500))' }}>Régulateur</span>
                <span style={{ color: 'oklch(var(--foreground-900))' }}>{selectedRun.regulator_source}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'oklch(var(--foreground-500))' }}>Document</span>
                <span style={{ color: 'oklch(var(--foreground-900))' }}>{selectedRun.doc_id}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'oklch(var(--foreground-500))' }}>Statut</span>
                <StatusBadge status={selectedRun.status} />
              </div>
              {selectedRun.quality_score != null && (
                <div className="flex justify-between">
                  <span style={{ color: 'oklch(var(--foreground-500))' }}>Score Qualité</span>
                  <span className="font-semibold" style={{ color: 'oklch(var(--accent-500))' }}>{selectedRun.quality_score}%</span>
                </div>
              )}
              {selectedRun.audit_id && (
                <div className="flex justify-between">
                  <span style={{ color: 'oklch(var(--foreground-500))' }}>Audit ID</span>
                  <span className="font-mono text-xs" style={{ color: 'oklch(var(--foreground-700))' }}>{selectedRun.audit_id}</span>
                </div>
              )}
              {selectedRun.error_message && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'oklch(var(--primary-50) / 0.5)', color: 'oklch(var(--primary-700))' }}>
                  <p className="text-xs font-semibold mb-1">Erreur</p>
                  <p className="text-xs">{selectedRun.error_message}</p>
                </div>
              )}
              <div className="flex justify-between">
                <span style={{ color: 'oklch(var(--foreground-500))' }}>Démarré</span>
                <span className="text-xs" style={{ color: 'oklch(var(--foreground-700))' }}>
                  {new Date(selectedRun.started_at).toLocaleString('fr-FR')}
                </span>
              </div>
              {selectedRun.completed_at && (
                <div className="flex justify-between">
                  <span style={{ color: 'oklch(var(--foreground-500))' }}>Terminé</span>
                  <span className="text-xs" style={{ color: 'oklch(var(--foreground-700))' }}>
                    {new Date(selectedRun.completed_at).toLocaleString('fr-FR')}
                  </span>
                </div>
              )}
              {selectedRun.results && Array.isArray(selectedRun.results) && selectedRun.results.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>Résultats par canal</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedRun.results as any[]).map((r: any, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={
                          r.status === 'OK'
                            ? { backgroundColor: 'oklch(var(--accent-100) / 0.7)', color: 'oklch(var(--accent-900))' }
                            : { backgroundColor: 'oklch(var(--primary-100) / 0.5)', color: 'oklch(var(--primary-700))' }
                        }
                      >
                        {r.channel} {r.status === 'OK' ? '✓' : '✗'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5" style={{ color: 'oklch(var(--accent-500))' }} />
          <span>Temps réel — Rafraîchi toutes les 5s</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" style={{ color: 'oklch(var(--secondary-500))' }} />
          <span>9 agents autonomes en production</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" style={{ color: 'oklch(var(--primary-500))' }} />
          <span>7 canaux de diffusion simultanés</span>
        </div>
      </div>
    </div>
  );
}



