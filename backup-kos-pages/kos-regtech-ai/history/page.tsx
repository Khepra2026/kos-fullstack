import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PipelineRun } from '@/hooks/usePipelineRealtime';
import {
  ArrowLeft, CheckCircle2, XCircle, Clock, Loader2,
  Search, Filter, Download, RefreshCw, TrendingUp,
  BarChart3, Activity, Calendar, Zap, ChevronDown,
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

function StatusBadge({ status }: { status: string }) {
  const config = {
    running: { bg: 'oklch(var(--accent-100) / 0.8)', text: 'oklch(var(--accent-900))', icon: Loader2, label: 'En cours' },
    completed: { bg: 'oklch(var(--accent-50) / 0.8)', text: 'oklch(var(--accent-700))', icon: CheckCircle2, label: 'Succès' },
    failed: { bg: 'oklch(var(--primary-50) / 0.8)', text: 'oklch(var(--primary-700))', icon: XCircle, label: 'Échec' },
    pending: { bg: 'oklch(var(--secondary-100) / 0.7)', text: 'oklch(var(--secondary-900))', icon: Clock, label: 'En attente' },
  }[status] || { bg: 'oklch(var(--background-100))', text: 'oklch(var(--foreground-500))', icon: Clock, label: status };

  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <Icon className={`w-3 h-3 ${status === 'running' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  );
}

function StepTimeline({ currentStep, status }: { currentStep: string | null; status: string }) {
  if (!currentStep) return null;
  const currentIdx = PIPELINE_STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center gap-0.5">
      {PIPELINE_STEPS.map((step, idx) => {
        const isCurrent = step === currentStep && status === 'running';
        const isDone = status === 'completed' || (status === 'running' && idx < currentIdx) || (status === 'failed' && idx < currentIdx);
        const isFailed = status === 'failed' && idx === currentIdx;

        return (
          <div key={step} className="flex items-center gap-0.5">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors"
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
              <div
                className="w-4 h-px"
                style={{
                  backgroundColor: isDone ? 'oklch(var(--accent-300))' : 'oklch(var(--background-200))',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function regTechHistoryPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [regulatorFilter, setRegulatorFilter] = useState<string>('all');
  const [selectedRun, setSelectedRun] = useState<PipelineRun | null>(null);

  const { data: runs, isLoading, refetch } = useQuery<PipelineRun[]>({
    queryKey: ['kos-pipeline-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kos_pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) throw new Error(error.message);
      return (data || []) as PipelineRun[];
    },
  });

  const regulators = useMemo(() => {
    const set = new Set((runs || []).map(r => r.regulator_source).filter(Boolean));
    return Array.from(set);
  }, [runs]);

  const filteredRuns = useMemo(() => {
    let result = runs || [];

    if (statusFilter !== 'all') {
      result = result.filter(r => r.status === statusFilter);
    }
    if (regulatorFilter !== 'all') {
      result = result.filter(r => r.regulator_source === regulatorFilter);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(r =>
        r.doc_id?.toLowerCase().includes(s) ||
        r.regulator_source?.toLowerCase().includes(s) ||
        r.audit_id?.toLowerCase().includes(s) ||
        r.id?.toLowerCase().includes(s)
      );
    }

    return result;
  }, [runs, statusFilter, regulatorFilter, search]);

  const stats = useMemo(() => {
    const all = runs || [];
    const completed = all.filter(r => r.status === 'completed');
    return {
      total: all.length,
      success: completed.length,
      failed: all.filter(r => r.status === 'failed').length,
      avgScore: completed.length > 0
        ? Math.round(completed.reduce((s, r) => s + (r.quality_score || 0), 0) / completed.length)
        : 0,
      avgDuration: completed.length > 0
        ? Math.round(
            completed.reduce((s, r) => {
              if (!r.completed_at) return s;
              const dur = (new Date(r.completed_at).getTime() - new Date(r.started_at).getTime()) / 1000;
              return s + dur;
            }, 0) / completed.length
          )
        : 0,
    };
  }, [runs]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(var(--background-50))' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="/kos-regtech-ai/"
            className="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-colors"
            style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>
              Historique des Pipelines
            </h1>
            <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>
              {filteredRuns.length} exécution{filteredRuns.length !== 1 ? 's' : ''} — Depuis le début
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="ml-auto w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-colors"
            style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Total</p>
            <p className="text-2xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>{stats.total}</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Succès</p>
            <p className="text-2xl font-bold" style={{ color: 'oklch(var(--accent-500))' }}>{stats.success}</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Échecs</p>
            <p className="text-2xl font-bold" style={{ color: 'oklch(var(--primary-500))' }}>{stats.failed}</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Score moyen</p>
            <p className="text-2xl font-bold" style={{ color: 'oklch(var(--accent-500))' }}>{stats.avgScore}%</p>
          </div>
          <div className="p-4 rounded-xl border" style={{ backgroundColor: 'oklch(var(--background-50))', borderColor: 'oklch(var(--background-200) / 0.7)' }}>
            <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'oklch(var(--foreground-500))' }}>Durée moy.</p>
            <p className="text-2xl font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>{stats.avgDuration}s</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(var(--foreground-400))' }} />
            <input
              type="text"
              placeholder="Rechercher par ID, doc, régulateur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none"
              style={{
                backgroundColor: 'oklch(var(--background-50))',
                borderColor: 'oklch(var(--background-200) / 0.7)',
                color: 'oklch(var(--foreground-900))',
              }}
            />
          </div>

          <div className="flex items-center gap-2">
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
          </div>

          {regulators.length > 0 && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: 'oklch(var(--foreground-500))' }} />
              <button
                onClick={() => setRegulatorFilter('all')}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
                style={
                  regulatorFilter === 'all'
                    ? { backgroundColor: 'oklch(var(--secondary-500))', color: 'oklch(var(--background-50))' }
                    : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }
                }
              >
                Tous
              </button>
              {regulators.map(r => (
                <button
                  key={r}
                  onClick={() => setRegulatorFilter(regulatorFilter === r ? 'all' : r)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap"
                  style={
                    regulatorFilter === r
                      ? { backgroundColor: 'oklch(var(--secondary-500))', color: 'oklch(var(--background-50))' }
                      : { backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-600))' }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: 'oklch(var(--background-50))',
            borderColor: 'oklch(var(--background-200) / 0.7)',
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottomColor: 'oklch(var(--background-200) / 0.7)' }} className="border-b">
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Statut</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Régulateur</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Progression</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Qualité</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Durée</th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(var(--foreground-500))' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRuns.map(run => {
                  const duration = run.completed_at
                    ? Math.round((new Date(run.completed_at).getTime() - new Date(run.started_at).getTime()) / 1000)
                    : null;

                  return (
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
                        <StepTimeline currentStep={run.current_step} status={run.status} />
                        {run.error_message && (
                          <p className="text-xs mt-1 truncate max-w-[200px]" style={{ color: 'oklch(var(--primary-500))' }}>
                            {run.error_message}
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
                        {duration != null ? `${duration}s` : '—'}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(run.started_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredRuns.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(var(--foreground-300))' }} />
                      <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>
                        Aucune exécution trouvée
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-400))' }}>
                        Lancez un pipeline depuis l'orchestrateur pour commencer
                      </p>
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <Loader2 className="w-6 h-6 mx-auto animate-spin" style={{ color: 'oklch(var(--accent-500))' }} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRun(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-lg rounded-2xl border p-6 max-h-[85vh] overflow-y-auto"
            style={{
              backgroundColor: 'oklch(var(--background-50))',
              borderColor: 'oklch(var(--background-200) / 0.7)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'oklch(var(--foreground-950))' }}>
                  {selectedRun.regulator_source} — {selectedRun.doc_id}
                </h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'oklch(var(--foreground-400))' }}>{selectedRun.id}</p>
              </div>
              <button onClick={() => setSelectedRun(null)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer"
                style={{ backgroundColor: 'oklch(var(--background-100))', color: 'oklch(var(--foreground-500))' }}
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 mb-3">
                <StatusBadge status={selectedRun.status} />
                {selectedRun.quality_score != null && (
                  <span className="text-xs font-semibold" style={{ color: 'oklch(var(--accent-500))' }}>
                    Score: {selectedRun.quality_score}%
                  </span>
                )}
              </div>

              <StepTimeline currentStep={selectedRun.current_step} status={selectedRun.status} />
              {selectedRun.current_step && (
                <p className="text-xs mt-1" style={{ color: 'oklch(var(--foreground-500))' }}>
                  Dernière étape : {selectedRun.current_step}
                </p>
              )}

              <hr style={{ borderColor: 'oklch(var(--background-200) / 0.5)' }} />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span style={{ color: 'oklch(var(--foreground-500))' }}>Démarré</span>
                  <p style={{ color: 'oklch(var(--foreground-900))' }}>{new Date(selectedRun.started_at).toLocaleString('fr-FR')}</p>
                </div>
                <div>
                  <span style={{ color: 'oklch(var(--foreground-500))' }}>Terminé</span>
                  <p style={{ color: 'oklch(var(--foreground-900))' }}>
                    {selectedRun.completed_at ? new Date(selectedRun.completed_at).toLocaleString('fr-FR') : '—'}
                  </p>
                </div>
                {selectedRun.audit_id && (
                  <div className="col-span-2">
                    <span style={{ color: 'oklch(var(--foreground-500))' }}>Audit ID</span>
                    <p className="font-mono" style={{ color: 'oklch(var(--foreground-900))' }}>{selectedRun.audit_id}</p>
                  </div>
                )}
              </div>

              {selectedRun.error_message && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'oklch(var(--primary-50) / 0.5)', color: 'oklch(var(--primary-700))' }}>
                  <p className="text-xs font-semibold mb-1">Erreur</p>
                  <p className="text-xs">{selectedRun.error_message}</p>
                </div>
              )}

              {selectedRun.results && Array.isArray(selectedRun.results) && selectedRun.results.length > 0 && (
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>Résultats ({selectedRun.results.length} canaux)</p>
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
    </div>
  );
}





