import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { useDeploymentPipeline } from '@/hooks/useDeploymentPipeline';
import {
  STAGE_STATUS_COLORS,
  BUILD_STATUS_COLORS,
  DEPLOY_STATUS_COLORS,
  GATE_CATEGORY_COLORS,
} from '@/mocks/deploymentPipeline';
import type { BuildRecord, PipelineStage, QualityGate, DeploymentRecord, PostDeployReport } from '@/mocks/deploymentPipeline';

function formatDuration(s: number): string {
  if (s < 60) return `${s.toFixed(1)}s`;
  return `${Math.floor(s / 60)}min ${Math.round(s % 60)}s`;
}

function formatKB(kb: number): string {
  if (kb >= 1000) return `${(kb / 1000).toFixed(2)} MB`;
  return `${kb} KB`;
}

function formatDelta(kb: number): string {
  if (kb === 0) return '0';
  const sign = kb > 0 ? '+' : '';
  return `${sign}${kb} KB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function deploymentPipelinePage() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'fr';
  const { overview, builds, stages, gates, deployments, reports, loading, error, refresh } = useDeploymentPipeline();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedBuild, setSelectedBuild] = useState<BuildRecord | null>(null);
  const [selectedDeploy, setSelectedDeploy] = useState<DeploymentRecord | null>(null);

  const tabs = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', count: null },
    { id: 'pipeline', label: 'Pipeline CI/CD', icon: 'ri-git-branch-line', count: stages.length },
    { id: 'builds', label: 'Builds', icon: 'ri-hammer-line', count: builds.length },
    { id: 'gates', label: 'Quality Gates', icon: 'ri-shield-check-line', count: gates.length },
    { id: 'deployments', label: 'Déploiements', icon: 'ri-rocket-line', count: deployments.length },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: reports.length },
  ];

  const successBuilds = builds.filter(b => b.status === 'success');
  const failedBuilds = builds.filter(b => b.status === 'failed');
  const successDeploys = deployments.filter(d => d.status === 'success');
  const passedGates = gates.filter(g => g.status === 'pass');
  const warnGates = gates.filter(g => g.status === 'warn');

  // ═══ VUE D'ENSEMBLE ═══
  const renderOverview = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-emerald-600">{overview.success_rate}%</div>
            <div className="text-xs text-foreground-500">Build Success</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-foreground-950">{formatDuration(overview.avg_build_time_seconds)}</div>
            <div className="text-xs text-foreground-500">Build Time Moyen</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-accent-500">{overview.total_builds}</div>
            <div className="text-xs text-foreground-500">Builds Totaux</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-foreground-950">{overview.deploy_frequency}</div>
            <div className="text-xs text-foreground-500">Fréquence Deploy</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold" style={{ color: overview.cvw_score >= 85 ? '#059669' : '#D97706' }}>{overview.cvw_score}</div>
            <div className="text-xs text-foreground-500">CWV Score</div>
          </div>
          <div className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
            <div className="text-2xl font-bold text-foreground-950">{overview.uptime_30d}%</div>
            <div className="text-xs text-foreground-500">Uptime 30j</div>
          </div>
        </div>

        {/* Pipeline Status */}
        <div className="rounded-2xl bg-white border border-background-200 p-5 mb-8">
          <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4">Pipeline — Dernier Build ({overview.last_deploy_version})</h2>
          <div className="flex flex-wrap items-center gap-2">
            {stages.map((stage, i) => {
              const sc = STAGE_STATUS_COLORS[stage.status] || STAGE_STATUS_COLORS.pending;
              return (
                <div key={stage.id} className="flex items-center gap-2">
                  {i > 0 && (
                    <div className={`w-6 h-0.5 ${stages[i - 1].status === 'success' ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                  )}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-default whitespace-nowrap ${sc.bg} ${sc.border} border ${sc.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    <i className={`${stage.icon} text-xs`} />
                    {stage.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Last Builds + Last Deploys side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <div className="rounded-2xl bg-white border border-background-200 p-5">
            <h3 className="font-heading text-sm font-bold text-foreground-950 mb-3">Derniers Builds</h3>
            <div className="space-y-2">
              {builds.slice(0, 5).map(b => {
                const bc = BUILD_STATUS_COLORS[b.status] || BUILD_STATUS_COLORS.cancelled;
                return (
                  <div key={b.id} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-background-50 cursor-pointer transition-colors" onClick={() => setSelectedBuild(b)}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${bc.text.split(' ')[0] === 'text-emerald-700' ? 'bg-emerald-500' : bc.text.split(' ')[0] === 'text-red-700' ? 'bg-red-500' : bc.text.split(' ')[0] === 'text-amber-700' ? 'bg-amber-500' : 'bg-gray-400'}`} />
                      <span className="font-bold text-foreground-800">{b.version}</span>
                      <span className="text-foreground-500">{b.commit_hash}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground-400">{formatDuration(b.duration_seconds)}</span>
                      <span className="text-foreground-400">{formatDate(b.triggered_at)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200 p-5">
            <h3 className="font-heading text-sm font-bold text-foreground-950 mb-3">Derniers Déploiements</h3>
            <div className="space-y-2">
              {deployments.slice(0, 5).map(d => {
                const dc = DEPLOY_STATUS_COLORS[d.status] || DEPLOY_STATUS_COLORS.failed;
                return (
                  <div key={d.id} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-background-50 cursor-pointer transition-colors" onClick={() => setSelectedDeploy(d)}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${d.status === 'success' ? 'bg-emerald-500' : d.status === 'failed' ? 'bg-red-500' : d.status === 'rolled_back' ? 'bg-orange-500' : 'bg-amber-500 animate-pulse'}`} />
                      <span className="font-bold text-foreground-800">{d.version}</span>
                      <span className="text-foreground-500 line-clamp-1 max-w-[200px]">{d.release_notes}</span>
                    </div>
                    <span className="text-foreground-400 whitespace-nowrap">{formatDate(d.deployed_at)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quality Gates Summary */}
        <div className="rounded-2xl bg-white border border-background-200 p-5">
          <h3 className="font-heading text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
            <i className="ri-shield-check-line text-emerald-500" />
            Quality Gates — {passedGates}/{gates.length} passés
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 rounded-full bg-background-100 overflow-hidden">
              <div className="flex h-full">
                <div className="bg-emerald-500 h-full" style={{ width: `${(passedGates.length / Math.max(gates.length, 1)) * 100}%` }} />
                <div className="bg-amber-400 h-full" style={{ width: `${(warnGates.length / Math.max(gates.length, 1)) * 100}%` }} />
              </div>
            </div>
            <span className="text-xs font-bold text-foreground-600 whitespace-nowrap">{overview.quality_gate_pass_rate}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ PIPELINE CI/CD ═══
  const renderPipeline = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {stages.map((stage, i) => {
            const sc = STAGE_STATUS_COLORS[stage.status] || STAGE_STATUS_COLORS.pending;
            return (
              <div key={stage.id} className="rounded-2xl bg-white border border-background-200 p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-64 shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sc.bg} ${sc.border} border`}>
                    <i className={`${stage.icon} text-lg ${sc.text}`} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-foreground-950">{stage.name}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {stage.status === 'success' ? 'OK' : stage.status === 'failed' ? 'ÉCHEC' : stage.status === 'running' ? 'En cours' : stage.status === 'skipped' ? 'Ignoré' : 'En attente'}
                    </span>
                  </div>
                </div>

                {/* Stage detail */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-2 rounded-lg bg-background-50">
                    <span className="block text-sm font-bold text-foreground-950">{formatDuration(stage.avg_duration_seconds)}</span>
                    <span className="text-[10px] text-foreground-500">Durée moyenne</span>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background-50">
                    <span className="block text-sm font-bold" style={{ color: stage.success_rate >= 95 ? '#059669' : stage.success_rate >= 85 ? '#D97706' : '#DC2626' }}>{stage.success_rate}%</span>
                    <span className="text-[10px] text-foreground-500">Taux succès 30j</span>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background-50">
                    <span className="block text-sm font-bold text-foreground-950">{formatDuration(stage.last_run_duration_seconds)}</span>
                    <span className="text-[10px] text-foreground-500">Dernier run</span>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-background-50">
                    {stage.auto_fix_enabled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <i className="ri-tools-line" /> Auto-fix
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground-500">
                        <i className="ri-user-line" /> Manuel
                      </span>
                    )}
                    <span className="block text-[10px] text-foreground-500">Mode correction</span>
                  </div>
                </div>

                {stage.critical && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[10px] font-bold text-red-600 whitespace-nowrap">
                    <i className="ri-error-warning-line text-[10px]" />CRITIQUE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ═══ BUILDS ═══
  const renderBuilds = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Build stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-background-50 border border-background-200/70 text-center">
            <span className="block text-lg font-bold text-emerald-600">{successBuilds.length}</span>
            <span className="text-[10px] text-foreground-500">Succès</span>
          </div>
          <div className="p-3 rounded-lg bg-background-50 border border-background-200/70 text-center">
            <span className="block text-lg font-bold text-red-600">{failedBuilds.length}</span>
            <span className="text-[10px] text-foreground-500">Échecs</span>
          </div>
          <div className="p-3 rounded-lg bg-background-50 border border-background-200/70 text-center">
            <span className="block text-lg font-bold text-foreground-950">{formatKB(overview.cvw_score >= 85 ? 2847 : 2850)}</span>
            <span className="text-[10px] text-foreground-500">Bundle</span>
          </div>
          <div className="p-3 rounded-lg bg-background-50 border border-background-200/70 text-center">
            <span className="block text-lg font-bold text-foreground-950">0</span>
            <span className="text-[10px] text-foreground-500">Erreurs actives</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-background-50 border-b border-background-200">
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider">Version</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider">Statut</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden sm:table-cell">Durée</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden md:table-cell">Commit</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden md:table-cell">Bundle</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider hidden lg:table-cell">TS Errors</th>
                  <th className="text-left p-3 font-bold text-foreground-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {builds.map(b => {
                  const bc = BUILD_STATUS_COLORS[b.status] || BUILD_STATUS_COLORS.cancelled;
                  return (
                    <tr key={b.id} className="border-b border-background-100 hover:bg-background-50 cursor-pointer transition-colors" onClick={() => setSelectedBuild(b)}>
                      <td className="p-3 font-bold text-foreground-950">{b.version}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${bc.bg} ${bc.text}`}>
                          <i className={`${bc.icon} text-[10px]`} />
                          {b.status === 'success' ? 'OK' : b.status === 'failed' ? 'FAIL' : b.status === 'running' ? 'BUILD' : 'CANCEL'}
                        </span>
                      </td>
                      <td className="p-3 text-foreground-600 hidden sm:table-cell">{formatDuration(b.duration_seconds)}</td>
                      <td className="p-3 text-foreground-500 font-mono hidden md:table-cell">{b.commit_hash}</td>
                      <td className="p-3 hidden md:table-cell">
                        {b.bundle_size_kb > 0 ? (
                          <span>
                            <span className="text-foreground-700">{formatKB(b.bundle_size_kb)}</span>
                            <span className={`ml-1 text-[10px] ${b.bundle_size_delta_kb > 50 ? 'text-red-500' : b.bundle_size_delta_kb < 0 ? 'text-emerald-500' : 'text-foreground-400'}`}>
                              ({formatDelta(b.bundle_size_delta_kb)})
                            </span>
                          </span>
                        ) : (
                          <span className="text-foreground-400">—</span>
                        )}
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <span className={b.typecheck_errors > 0 ? 'text-red-600 font-bold' : 'text-emerald-600'}>{b.typecheck_errors}</span>
                      </td>
                      <td className="p-3 text-foreground-500 whitespace-nowrap">{formatDate(b.triggered_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Build detail modal */}
        {selectedBuild && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBuild(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl border border-background-200 p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-foreground-950">Build {selectedBuild.version}</h3>
                <button onClick={() => setSelectedBuild(null)} className="w-8 h-8 rounded-full bg-background-50 border border-background-200 flex items-center justify-center cursor-pointer hover:bg-background-100">
                  <i className="ri-close-line" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-foreground-500">Statut</span><span className="block font-bold text-foreground-950">{selectedBuild.status}</span></div>
                <div><span className="text-foreground-500">Durée</span><span className="block font-bold text-foreground-950">{formatDuration(selectedBuild.duration_seconds)}</span></div>
                <div><span className="text-foreground-500">Commit</span><span className="block font-bold text-foreground-950 font-mono">{selectedBuild.commit_hash}</span></div>
                <div><span className="text-foreground-500">Branch</span><span className="block font-bold text-foreground-950">{selectedBuild.branch}</span></div>
                <div><span className="text-foreground-500">Bundle</span><span className="block font-bold text-foreground-950">{selectedBuild.bundle_size_kb > 0 ? formatKB(selectedBuild.bundle_size_kb) : 'N/A'}</span></div>
                <div><span className="text-foreground-500">Delta</span><span className="block font-bold text-foreground-950">{formatDelta(selectedBuild.bundle_size_delta_kb)}</span></div>
                <div><span className="text-foreground-500">TS Errors</span><span className="block font-bold" style={{ color: selectedBuild.typecheck_errors > 0 ? '#DC2626' : '#059669' }}>{selectedBuild.typecheck_errors}</span></div>
                <div><span className="text-foreground-500">ESLint Errors</span><span className="block font-bold" style={{ color: selectedBuild.eslint_errors > 0 ? '#DC2626' : '#059669' }}>{selectedBuild.eslint_errors}</span></div>
                <div className="col-span-2"><span className="text-foreground-500">Déclenché par</span><span className="block font-bold text-foreground-950">{selectedBuild.triggered_by}</span></div>
                <div className="col-span-2"><span className="text-foreground-500">Date</span><span className="block font-bold text-foreground-950">{formatDate(selectedBuild.triggered_at)}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ QUALITY GATES ═══
  const renderGates = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gates.map(gate => (
            <div key={gate.id} className="rounded-2xl bg-white border border-background-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${GATE_CATEGORY_COLORS[gate.category]}15` }}>
                  <i className={`${gate.icon} text-lg`} style={{ color: GATE_CATEGORY_COLORS[gate.category] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground-950 leading-tight">{gate.name}</h4>
                  <span className="text-[10px] text-foreground-400 uppercase tracking-wider">{gate.category}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs text-foreground-500">Seuil</span>
                  <span className="block text-sm font-bold text-foreground-800">{gate.threshold}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-foreground-500">Actuel</span>
                  <span className={`block text-sm font-bold ${
                    gate.status === 'pass' ? 'text-emerald-600' : gate.status === 'warn' ? 'text-amber-600' : 'text-red-600'
                  }`}>{gate.current_value}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  gate.status === 'pass' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    : gate.status === 'warn' ? 'bg-amber-50 border border-amber-200 text-amber-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  <i className={`${gate.status === 'pass' ? 'ri-check-line' : gate.status === 'warn' ? 'ri-alert-line' : 'ri-close-line'} text-[10px]`} />
                  {gate.status === 'pass' ? 'PASS' : gate.status === 'warn' ? 'WARN' : 'FAIL'}
                </span>
                {gate.auto_fix && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <i className="ri-tools-line text-[10px]" /> Auto-fix
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══ DEPLOYMENTS ═══
  const renderDeployments = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {deployments.map(d => {
            const dc = DEPLOY_STATUS_COLORS[d.status] || DEPLOY_STATUS_COLORS.failed;
            return (
              <div key={d.id} className="rounded-2xl bg-white border border-background-200 p-5 flex flex-col lg:flex-row lg:items-center gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedDeploy(d)}>
                <div className="flex items-center gap-3 lg:w-56 shrink-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dc.bg} border`}>
                    <i className={`${dc.icon} text-lg ${dc.text}`} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-foreground-950">{d.version}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${dc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'success' ? 'bg-emerald-500' : d.status === 'failed' ? 'bg-red-500' : d.status === 'rolled_back' ? 'bg-orange-500' : 'bg-amber-500 animate-pulse'}`} />
                      {d.status === 'success' ? 'Déployé' : d.status === 'failed' ? 'Échec' : d.status === 'rolled_back' ? 'Rollback' : 'En cours'}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground-700 line-clamp-2">{d.release_notes}</p>
                </div>
                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div className="text-center">
                    <span className="block text-foreground-500">Environnement</span>
                    <span className={`font-bold ${d.environment === 'production' ? 'text-red-600' : 'text-foreground-800'}`}>{d.environment}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-foreground-500">Impact</span>
                    <span className={`font-bold ${d.impact_score >= 90 ? 'text-emerald-600' : d.impact_score >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{d.impact_score}/100</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-foreground-500">Date</span>
                    <span className="text-foreground-700">{formatDate(d.deployed_at)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedDeploy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDeploy(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl border border-background-200 p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-foreground-950">Déploiement {selectedDeploy.version}</h3>
                <button onClick={() => setSelectedDeploy(null)} className="w-8 h-8 rounded-full bg-background-50 border border-background-200 flex items-center justify-center cursor-pointer hover:bg-background-100">
                  <i className="ri-close-line" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div><span className="text-foreground-500">Statut</span><span className="block font-bold text-foreground-950">{selectedDeploy.status}</span></div>
                <div><span className="text-foreground-500">Environnement</span><span className="block font-bold text-foreground-950">{selectedDeploy.environment}</span></div>
                <div><span className="text-foreground-500">Durée</span><span className="block font-bold text-foreground-950">{formatDuration(selectedDeploy.duration_seconds)}</span></div>
                <div><span className="text-foreground-500">Impact</span><span className="block font-bold text-foreground-950">{selectedDeploy.impact_score}/100</span></div>
                <div><span className="text-foreground-500">Build ID</span><span className="block font-bold text-foreground-950 font-mono">{selectedDeploy.build_id}</span></div>
                <div><span className="text-foreground-500">Déployé par</span><span className="block font-bold text-foreground-950">{selectedDeploy.deployed_by}</span></div>
                {selectedDeploy.rollback_version && (
                  <div className="col-span-2"><span className="text-foreground-500">Rollback vers</span><span className="block font-bold text-orange-600">{selectedDeploy.rollback_version}</span></div>
                )}
                <div className="col-span-2"><span className="text-foreground-500">Date</span><span className="block font-bold text-foreground-950">{formatDate(selectedDeploy.deployed_at)}</span></div>
              </div>
              <div className="p-3 rounded-lg bg-background-50 border border-background-200">
                <span className="text-xs text-foreground-500">Release Notes</span>
                <p className="text-sm text-foreground-800 mt-1">{selectedDeploy.release_notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ RAPPORTS ═══
  const renderReports = () => (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {reports.map(report => (
            <div key={report.id} className="rounded-2xl bg-white border border-background-200 p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="lg:w-48 shrink-0">
                  <span className="block text-sm font-bold text-foreground-950">{report.version}</span>
                  <span className="text-xs text-foreground-500">{formatDate(report.generated_at)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground-700 mb-3">{report.summary}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold" style={{ color: report.cvw_score >= 85 ? '#059669' : '#D97706' }}>{report.cvw_score}</span>
                      <span className="text-[10px] text-foreground-500">CWV</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold text-foreground-950">{report.seo_score}</span>
                      <span className="text-[10px] text-foreground-500">SEO</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold" style={{ color: report.broken_links > 0 ? '#DC2626' : '#059669' }}>{report.broken_links}</span>
                      <span className="text-[10px] text-foreground-500">Liens cassés</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold text-foreground-950">{report.page_count}</span>
                      <span className="text-[10px] text-foreground-500">Pages</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold text-foreground-950">{formatKB(report.bundle_size_kb)}</span>
                      <span className="text-[10px] text-foreground-500">Bundle</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold" style={{ color: report.errors_24h > 0 ? '#DC2626' : '#059669' }}>{report.errors_24h}</span>
                      <span className="text-[10px] text-foreground-500">Erreurs 24h</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold text-foreground-950">{report.uptime_pct}%</span>
                      <span className="text-[10px] text-foreground-500">Uptime</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-sm font-bold" style={{ color: report.cvw_delta >= 0 ? '#059669' : '#DC2626' }}>
                        {report.cvw_delta >= 0 ? '+' : ''}{report.cvw_delta}
                      </span>
                      <span className="text-[10px] text-foreground-500">Delta CWV</span>
                    </div>
                  </div>
                  {report.recommendations.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {report.recommendations.map((rec, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700">
                          <i className="ri-lightbulb-line text-[10px]" />{rec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <hubLayout hubId={65} activeTab={activeTab} tabLabel={activeTabData?.label}>
      <SeoHead
        title="KOS Deployment Pipeline Command™ — CI/CD Auto-Build & Quality Gates | KHEPRA EXPERTS"
        description="Hub de pilotage du pipeline de déploiement automatisé. 7 étapes CI/CD, 12 quality gates Big Four, rapports post-déploiement. Build history, bundle audit, rollback management."
        keywords="KOS Deployment Pipeline, CI/CD, auto-build, quality gates, DevOps, KHEPRA EXPERTS"
        canonicalPath="/kos-deployment-pipeline"
        ogType="website"
        ogLocale={lang === 'fr' ? 'fr_FR' : 'en_US'}
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Dark%20sophisticated%20DevOps%20command%20center%20visualization%20with%20glowing%20circuit%20board%20patterns%20in%20warm%20amber%20and%20emerald%20tones%2C%20deployment%20pipeline%20nodes%20connected%20by%20flowing%20data%20streams%2C%20abstract%20server%20infrastructure%20with%20geometric%20network%20topology%2C%20cinematic%20tech%20aesthetic%20with%20rich%20charcoal%20black%20background&width=1920&height=550&seq=kos-deploy-hero&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-12"
            width="1920"
            height="550"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/70 via-foreground-950/85 to-foreground-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto pt-12 pb-10">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm">
                <i className="ri-rocket-line text-accent-400 text-sm" />
                <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">
                  KOS Deployment Pipeline™
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                  CI/CD AUTO-BUILD
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-green-400 text-sm" />
                <span className="text-sm font-semibold text-green-300 uppercase tracking-wider">
                  12 Quality Gates
                </span>
              </div>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Le pipeline qui ne dort jamais.
              <span className="block text-accent-400 mt-2">{overview.success_rate}% de builds verts. {overview.deploy_frequency} déploiements par jour.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong className="text-white">7 étapes CI/CD</strong> automatisées — du lint au post-deploy verify.{' '}
              <strong className="text-white">12 quality gates</strong> Big Four.{' '}
              Build moyen : <strong className="text-white">{formatDuration(overview.avg_build_time_seconds)}</strong>.{' '}
              Uptime 30j : <strong className="text-white">{overview.uptime_30d}%</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-emerald-300 font-semibold">{overview.total_builds} Builds</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 backdrop-blur-sm">
                <i className="ri-rocket-line text-accent-400" />
                <span className="text-sm text-accent-300 font-semibold">{overview.total_deployments} Deploys</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                <i className="ri-shield-check-line text-green-400" />
                <span className="text-sm text-green-300 font-semibold">{passedGates}/{gates.length} Gates OK</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{
                backgroundColor: overview.cvw_score >= 85 ? 'rgba(5,150,105,0.2)' : 'rgba(217,119,6,0.2)',
                borderColor: overview.cvw_score >= 85 ? 'rgba(5,150,105,0.3)' : 'rgba(217,119,6,0.3)',
              }}>
                <i className="ri-speed-line" style={{ color: overview.cvw_score >= 85 ? '#6EE7B7' : '#FCD34D' }} />
                <span className="text-sm font-semibold" style={{ color: overview.cvw_score >= 85 ? '#6EE7B7' : '#FCD34D' }}>CWV {overview.cvw_score}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedBuild(null); setSelectedDeploy(null); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === tab.id ? 'bg-foreground-950 text-white' : 'bg-background-50 border border-background-200 text-foreground-600 hover:border-foreground-300'
              }`}
            >
              <i className={tab.icon} />
              {tab.label}
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-background-100 text-foreground-400'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="py-20 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-background-200 border-t-accent-500 animate-spin" />
          <p className="text-foreground-500">Chargement du pipeline...</p>
        </div>
      )}

      {error && (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
            <i className="ri-error-warning-line text-3xl text-red-500 mb-3 block" />
            <h3 className="font-heading text-lg font-bold text-red-700 mb-2">Erreur de chargement</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button onClick={refresh} className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold cursor-pointer hover:bg-red-700 transition-all">
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {!loading && !error && (
        <>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'pipeline' && renderPipeline()}
          {activeTab === 'builds' && renderBuilds()}
          {activeTab === 'gates' && renderGates()}
          {activeTab === 'deployments' && renderDeployments()}
          {activeTab === 'reports' && renderReports()}
        </>
      )}
    </hubLayout>
  );
}





