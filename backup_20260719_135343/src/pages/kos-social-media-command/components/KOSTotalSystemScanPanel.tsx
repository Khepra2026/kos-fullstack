import { useState, useMemo } from 'react';
import { useKOSTotalSystemScan } from '@/hooks/useKOSTotalSystemScan';
import type { ScanDimension, ScanSeverity, BlockStatus } from '@/mocks/totalSystemScan';

const SEVERITY_BADGES: Record<ScanSeverity, { bg: string; text: string; label: string; icon: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', label: 'CRITIQUE', icon: 'ri-alert-fill' },
  major: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Majeur', icon: 'ri-error-warning-line' },
  minor: { bg: 'bg-sky-50', text: 'text-sky-700', label: 'Mineur', icon: 'ri-information-line' },
  info: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Info', icon: 'ri-information-line' },
  excellence: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'EXCELLENCE', icon: 'ri-star-fill' },
};

const DIMENSION_COLORS: Record<ScanDimension, string> = {
  infrastructure: '#C2410C',
  agents: '#5B21B6',
  performance: '#9B7B2C',
  compliance: '#8B3040',
  data: '#0D7B5F',
  growth: '#4A7A1E',
  bigfour: '#4F46E5',
  codebase: '#0891B2',
};

const PRIORITY_COLORS: Record<string, string> = {
  P0_critical: 'bg-red-500',
  P1_high: 'bg-amber-500',
  P2_medium: 'bg-sky-500',
  P3_longterm: 'bg-gray-400',
};

const BLOCK_STATUS_BADGES: Record<BlockStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'En attente' },
  in_progress: { bg: 'bg-violet-50', text: 'text-violet-700', label: 'En cours' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Terminé' },
  awaiting_approval: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Approbation' },
};

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}min ${s}s`;
}

export default function totalSystemScanPanel() {
  const scan = useKOSTotalSystemScan();
  const {
    report, scanRunning, scanProgress, lastScanTime, executionMode,
    criticalCount, majorCount, minorCount, excellenceCount, autoFixableCount,
    healthGauge, bigFourGauge, severityDistribution,
    p0Blocks, p1Blocks, p2Blocks, pendingBlocks,
    runFullScan, executeBlock, executeAllBlocks, cancelExecuteAll,
    activeBlockExecution, blockExecutionProgress,
    executeAllActive, overallProgress, currentBlockInExecution,
    completedBlocks, failedBlocks, blockResults,
    executionStartedAt,
    supabaseConnected,
    totalActionsAllBlocks, completedActionsCount,
    dimensions, bigfourDomains, taskBlocks, findings,
    getFindingsByDimension, getFindingsBySeverity,
  } = scan;

  const [activeSection, setActiveSection] = useState<'overview' | 'dimensions' | 'bigfour' | 'findings' | 'blocks'>('overview');
  const [selectedDimension, setSelectedDimension] = useState<ScanDimension | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<ScanSeverity | 'all'>('all');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [showExecutionResult, setShowExecutionResult] = useState(false);

  const filteredFindings = useMemo(() => {
    let result = findings;
    if (selectedDimension !== 'all') result = getFindingsByDimension(selectedDimension);
    if (selectedSeverity !== 'all') result = result.filter((f) => f.severity === selectedSeverity);
    return result;
  }, [findings, selectedDimension, selectedSeverity, getFindingsByDimension]);

  const selectedBlock = useMemo(() => {
    if (!selectedBlockId) return null;
    return taskBlocks.find((b) => b.block_id === selectedBlockId) || null;
  }, [selectedBlockId, taskBlocks]);

  const blockFindings = useMemo(() => {
    if (!selectedBlockId) return [];
    return findings.filter((f) => f.programmed_in_block === selectedBlockId);
  }, [selectedBlockId, findings]);

  const isExecutingBlock = activeBlockExecution !== null;

  return (
    <div className="space-y-6">
      {/* Scan Header */}
      <div className="rounded-2xl bg-gradient-to-r from-foreground-950 via-foreground-900 to-foreground-950 p-5 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-emerald-500/10" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" fill="none" stroke="white" strokeWidth="4" className="opacity-15" />
                <circle cx="36" cy="36" r="30" fill="none" strokeWidth="4" strokeLinecap="round" stroke={healthGauge >= 90 ? '#10B981' : healthGauge >= 80 ? '#F59E0B' : '#EF4444'} strokeDasharray={`${(healthGauge / 100) * 188} 188`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold font-heading">{healthGauge}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  SCAN TOTAL ACTIF
                </span>
                {supabaseConnected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Supabase LIVE
                  </span>
                )}
              </div>
              <h2 className="font-heading text-2xl font-bold mt-1">KOS Total System Scan™</h2>
              <p className="text-sm text-gray-300 mt-0.5">
                Scan 360° · {report.total_systems_scanned} systèmes · {report.total_findings} findings · {formatDuration(report.total_duration_seconds)}
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Critiques', value: criticalCount, color: 'bg-red-500', icon: 'ri-alert-fill' },
              { label: 'Majeurs', value: majorCount, color: 'bg-amber-500', icon: 'ri-error-warning-line' },
              { label: 'Auto-fixables', value: autoFixableCount, color: 'bg-emerald-500', icon: 'ri-magic-line' },
              { label: 'EXCELLENCE', value: excellenceCount, color: 'bg-violet-500', icon: 'ri-star-fill' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-sm p-3 text-center">
                <i className={`${stat.icon} text-lg ${stat.color.replace('bg-', 'text-')}`} />
                <span className="block text-2xl font-bold font-heading mt-1">{stat.value}</span>
                <span className="text-[10px] text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={runFullScan}
            disabled={scanRunning}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-white/25 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {scanRunning ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg" />
                Scan {scanProgress}%...
              </>
            ) : (
              <>
                <i className="ri-radar-line text-lg" />
                Relancer Scan Complet
              </>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {scanRunning && (
          <div className="relative z-10 mt-4">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-500" style={{ width: `${scanProgress}%` }} />
            </div>
          </div>
        )}

        {/* Barre de progression exécution massive */}
        {executeAllActive && (
          <div className="relative z-10 mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300 font-bold flex items-center gap-2">
                <i className="ri-loader-4-line animate-spin" />
                EXÉCUTION MASSIVE — {overallProgress}% — Bloc {completedBlocks.length + 1}/{taskBlocks.length}
              </span>
              <button
                onClick={cancelExecuteAll}
                className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold hover:bg-red-500/30 cursor-pointer transition-all"
              >
                <i className="ri-stop-fill mr-1" />ANNULER
              </button>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-emerald-500 to-amber-500 transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {taskBlocks.map((block) => {
                const isCompleted = completedBlocks.includes(block.block_id);
                const isFailed = failedBlocks.includes(block.block_id);
                const isCurrent = currentBlockInExecution === block.block_id;
                return (
                  <div
                    key={block.block_id}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                      isCompleted ? 'bg-emerald-500 text-white' :
                      isFailed ? 'bg-red-500 text-white' :
                      isCurrent ? 'bg-violet-500 text-white animate-pulse' :
                      'bg-white/10 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <i className="ri-check-line" /> : isFailed ? <i className="ri-close-line" /> : isCurrent ? '••' : ''}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <span className="text-emerald-400"><i className="ri-check-line mr-1" />{completedBlocks.length} réussis</span>
              {failedBlocks.length > 0 && <span className="text-red-400"><i className="ri-close-line mr-1" />{failedBlocks.length} échoués</span>}
              <span>{completedActionsCount}/{totalActionsAllBlocks} actions</span>
            </div>
          </div>
        )}
      </div>

      {/* Section Navigation */}
      <div className="flex gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line', badge: String(report.total_findings) },
          { id: 'dimensions', label: '8 Dimensions', icon: 'ri-stack-line', badge: String(dimensions.length) },
          { id: 'bigfour', label: 'Big Four 10D', icon: 'ri-verified-badge-line', badge: String(Math.round(bigFourGauge)) },
          { id: 'findings', label: 'Findings', icon: 'ri-search-eye-line', badge: String(report.total_findings) },
          { id: 'blocks', label: 'Blocs Tâches', icon: 'ri-play-list-2-line', badge: String(taskBlocks.length) },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-foreground-950 text-background-50'
                : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
            }`}
          >
            <i className={`${tab.icon} text-base`} />
            {tab.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* SECTION: Vue d'Ensemble */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Jaumes Santé + Big Four */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Score de Santé Global</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-background-100" />
                    <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                      stroke={healthGauge >= 90 ? '#10B981' : healthGauge >= 80 ? '#F59E0B' : '#EF4444'}
                      strokeDasharray={`${(healthGauge / 100) * 264} 264`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-heading text-foreground-950">{healthGauge}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  {[
                    { label: 'Systèmes', value: report.total_systems_scanned, color: '#0A66C2' },
                    { label: 'Critiques', value: criticalCount, color: '#DC2626' },
                    { label: 'Majeurs', value: majorCount, color: '#D97706' },
                    { label: 'Mineurs', value: minorCount, color: '#0284C7' },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-2 rounded-lg bg-background-50">
                      <span className="block text-xs text-foreground-400">{s.label}</span>
                      <span className="text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-background-200 p-5">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Score Big Four</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-background-100" />
                    <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" strokeLinecap="round"
                      stroke="#4F46E5"
                      strokeDasharray={`${(bigFourGauge / 100) * 264} 264`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-heading text-foreground-950">{bigFourGauge}</span>
                </div>
                <div className="flex-1 space-y-2">
                  {bigfourDomains.slice(0, 5).map((d) => (
                    <div key={d.domain_id} className="flex items-center gap-2">
                      <i className={`${d.icon} text-sm`} style={{ color: d.color }} />
                      <span className="text-xs text-foreground-600 flex-1">{d.domain_name}</span>
                      <span className="text-xs font-bold text-foreground-950">{d.score_actuel}</span>
                      <div className="w-16 h-1.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.score_actuel}%`, backgroundColor: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blocs P0 urgents */}
          <div className="rounded-2xl bg-white border border-background-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-foreground-950">
                <i className="ri-alert-fill text-red-500 mr-1.5" />
                Blocs Prioritaires P0 — Action Immédiate Requise
              </h3>
              <span className="text-xs text-foreground-400">{p0Blocks.length} blocs</span>
            </div>
            <div className="space-y-3">
              {p0Blocks.map((block) => {
                const blockFinds = findings.filter((f) => f.programmed_in_block === block.block_id);
                const statusBadge = BLOCK_STATUS_BADGES[block.status];
                return (
                  <div key={block.block_id} className="rounded-xl border border-red-200 bg-red-50/50 p-4 hover:border-red-300 transition-colors cursor-pointer" onClick={() => { setSelectedBlockId(block.block_id); setActiveSection('blocks'); }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-alert-fill text-red-600 text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground-950">{block.block_name}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-1">{block.description}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-xs text-red-600 font-bold">{block.critical_actions} critiques · {block.total_actions} actions</span>
                          <span className="text-xs text-foreground-400">{block.estimated_effort}</span>
                          <span className="text-xs text-foreground-400">{block.deadline_recommendation}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-foreground-400">Assigné</span>
                        <span className="block text-xs font-semibold text-foreground-700 max-w-[180px] truncate">{block.assigned_to}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Résumé 8 dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dimensions.map((dim) => (
              <div key={dim.dimension} className="rounded-xl bg-white border border-background-200 p-4 hover:border-background-300 cursor-pointer transition-all" onClick={() => { setSelectedDimension(dim.dimension); setActiveSection('dimensions'); }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${dim.color}15` }}>
                    <i className={`${dim.icon} text-sm`} style={{ color: dim.color }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground-700">{dim.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold font-heading text-foreground-950">{dim.health_score}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    dim.status === 'optimal' ? 'bg-emerald-50 text-emerald-700' :
                    dim.status === 'stable' ? 'bg-sky-50 text-sky-700' :
                    dim.status === 'degraded' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      dim.status === 'optimal' ? 'bg-emerald-500' :
                      dim.status === 'stable' ? 'bg-sky-500' :
                      dim.status === 'degraded' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} />
                    {dim.status === 'optimal' ? 'Optimal' : dim.status === 'stable' ? 'Stable' : dim.status === 'degraded' ? 'Dégradé' : 'Critique'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-foreground-400">
                  <span>{dim.critical} critiques</span>
                  <span>·</span>
                  <span>{dim.major} majeurs</span>
                  <span>·</span>
                  <span>{dim.total_findings} total</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: 8 Dimensions */}
      {activeSection === 'dimensions' && (
        <div className="space-y-6">
          {/* Dimension Filter */}
          <div className="flex gap-1 overflow-x-auto">
            <button onClick={() => setSelectedDimension('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${selectedDimension === 'all' ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}>
              Toutes ({dimensions.length})
            </button>
            {dimensions.map((dim) => (
              <button key={dim.dimension} onClick={() => setSelectedDimension(dim.dimension)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedDimension === dim.dimension ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600 hover:bg-background-200'}`}>
                <i className={`${dim.icon} text-sm`} />
                {dim.label} ({dim.total_findings})
              </button>
            ))}
          </div>

          {dimensions.filter((d) => selectedDimension === 'all' || d.dimension === selectedDimension).map((dim) => (
            <div key={dim.dimension} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-background-100" style={{ backgroundColor: `${dim.color}08` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${dim.color}15` }}>
                      <i className={`${dim.icon} text-lg`} style={{ color: dim.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground-950">{dim.label}</h3>
                      <span className="text-xs text-foreground-400">{dim.systems_scanned} systèmes scannés · {dim.total_findings} findings</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-heading" style={{ color: dim.color }}>{dim.health_score}</span>
                    <span className="block text-xs text-foreground-400">/100</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-bold text-red-600">{dim.critical} critiques</span>
                  <span className="text-xs font-bold text-amber-600">{dim.major} majeurs</span>
                  <span className="text-xs font-bold text-sky-600">{dim.minor} mineurs</span>
                  <span className="text-xs text-foreground-400">{dim.auto_fixable} auto-fixables</span>
                </div>
              </div>
              <div className="divide-y divide-background-100 max-h-[400px] overflow-y-auto">
                {getFindingsByDimension(dim.dimension).map((f) => {
                  const sev = SEVERITY_BADGES[f.severity];
                  return (
                    <div key={f.finding_id} className={`px-5 py-3 hover:bg-background-50/50 transition-colors ${f.severity === 'critical' ? 'border-l-4 border-l-red-500' : f.severity === 'major' ? 'border-l-4 border-l-amber-500' : ''}`}>
                      <div className="flex items-start gap-3">
                        <i className={`${sev.icon} text-lg flex-shrink-0 mt-0.5 ${sev.text}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.text}`}>
                              {sev.label}
                            </span>
                            <span className="text-sm font-semibold text-foreground-900">{f.title}</span>
                          </div>
                          <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{f.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-[10px] text-foreground-400">{f.metric}: {f.current_value} → {f.target_value}</span>
                            {f.auto_fixable && <span className="text-[10px] text-emerald-600 font-bold"><i className="ri-magic-line mr-0.5" />Auto-fixable</span>}
                            <span className="text-[10px] text-foreground-300">{f.agent_assigned}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION: Big Four 10 Domaines */}
      {activeSection === 'bigfour' && (
        <div className="space-y-6">
          {/* Global Big Four Gauge */}
          <div className="rounded-2xl bg-white border border-background-200 p-5">
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 88 88">
                  <circle cx="44" cy="44" r="38" fill="none" stroke="currentColor" strokeWidth="6" className="text-background-100" />
                  <circle cx="44" cy="44" r="38" fill="none" strokeWidth="6" strokeLinecap="round" stroke="#4F46E5" strokeDasharray={`${(bigFourGauge / 100) * 238} 238`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold font-heading text-foreground-950">{bigFourGauge}</span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground-950">Maturité Big Four — Score Global</h3>
                <p className="text-sm text-foreground-500">Évaluation sur 10 domaines — Standards PwC · Deloitte · EY · KPMG</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-emerald-600 font-bold">8/10 domaines ≥ 90</span>
                  <span className="text-xs text-foreground-400">Cible: 95/100 Q4 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Domaines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bigfourDomains.map((domain) => (
              <div key={domain.domain_id} className="rounded-2xl bg-white border border-background-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-background-100 flex items-center gap-3" style={{ backgroundColor: `${domain.color}08` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${domain.color}15` }}>
                    <i className={`${domain.icon} text-sm`} style={{ color: domain.color }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-foreground-950">{domain.domain_name}</span>
                    <span className="text-xs text-foreground-400 ml-2">{domain.standard_reference.split(' · ')[0]}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-heading" style={{ color: domain.color }}>{domain.score_actuel}</span>
                    <span className="text-xs text-foreground-400">/{domain.score_cible}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-2 rounded-full bg-background-100 overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{ width: `${domain.score_actuel}%`, backgroundColor: domain.color }} />
                  </div>
                  <p className="text-xs text-foreground-500 mb-3">{domain.gap_analysis}</p>
                  <div className="space-y-1.5">
                    {domain.top_findings.map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: domain.color }} />
                        <span className="text-xs text-foreground-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {domain.kpi_keys.map((kpi) => (
                      <div key={kpi.label} className="text-center p-2 rounded-lg bg-background-50">
                        <span className="block text-[10px] text-foreground-400">{kpi.label}</span>
                        <span className="text-sm font-bold font-heading" style={{ color: kpi.value >= kpi.target ? '#059669' : '#D97706' }}>
                          {kpi.value}/{kpi.target}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: Findings */}
      {activeSection === 'findings' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-1 overflow-x-auto">
              <button onClick={() => setSelectedSeverity('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${selectedSeverity === 'all' ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600'}`}>
                Tous ({findings.length})
              </button>
              {(['critical', 'major', 'minor', 'info', 'excellence'] as ScanSeverity[]).map((sev) => {
                const badge = SEVERITY_BADGES[sev];
                return (
                  <button key={sev} onClick={() => setSelectedSeverity(sev)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${selectedSeverity === sev ? badge.bg + ' ' + badge.text : 'bg-background-100 text-foreground-600'}`}>
                    <i className={`${badge.icon} text-sm`} />
                    {badge.label}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-1 overflow-x-auto">
              <button onClick={() => setSelectedDimension('all')} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap ${selectedDimension === 'all' ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600'}`}>
                Toutes dimensions
              </button>
              {dimensions.map((dim) => (
                <button key={dim.dimension} onClick={() => setSelectedDimension(dim.dimension)} className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${selectedDimension === dim.dimension ? 'bg-foreground-950 text-background-50' : 'bg-background-100 text-foreground-600'}`}>
                  <i className={`${dim.icon} text-sm`} />
                  {dim.label}
                </button>
              ))}
            </div>
          </div>

          {/* Findings Table */}
          <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-background-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-foreground-950">
                {filteredFindings.length} Findings
                {selectedSeverity !== 'all' && ` — ${SEVERITY_BADGES[selectedSeverity].label}`}
                {selectedDimension !== 'all' && ` — ${dimensions.find((d) => d.dimension === selectedDimension)?.label}`}
              </h3>
            </div>
            <div className="divide-y divide-background-100 max-h-[600px] overflow-y-auto">
              {filteredFindings.map((f) => {
                const sev = SEVERITY_BADGES[f.severity];
                const dimColor = DIMENSION_COLORS[f.dimension];
                return (
                  <div key={f.finding_id} className={`px-5 py-3 hover:bg-background-50/50 transition-colors ${f.severity === 'critical' ? 'border-l-4 border-l-red-500' : f.severity === 'major' ? 'border-l-4 border-l-amber-500' : ''}`}>
                    <div className="flex items-start gap-3">
                      <i className={`${sev.icon} text-lg flex-shrink-0 mt-0.5 ${sev.text}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.text}`}>
                            {sev.label}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: dimColor }}>
                            {f.system_component}
                          </span>
                          <span className="text-sm font-semibold text-foreground-900">{f.title}</span>
                        </div>
                        <p className="text-xs text-foreground-500 mt-0.5">{f.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-foreground-400">
                            {f.metric}: <strong>{f.current_value}</strong> → <strong>{f.target_value}</strong>
                          </span>
                          {f.auto_fixable && (
                            <span className="text-[10px] text-emerald-600 font-bold">
                              <i className="ri-magic-line mr-0.5" />Auto-fixable ({f.effort_estimate})
                            </span>
                          )}
                          {!f.auto_fixable && (
                            <span className="text-[10px] text-amber-600 font-bold">
                              <i className="ri-user-line mr-0.5" />Manuel ({f.effort_estimate})
                            </span>
                          )}
                          <span className="text-[10px] text-foreground-300 truncate max-w-[200px]">{f.agent_assigned}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Blocs de Tâches */}
      {activeSection === 'blocks' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Blocs P0', value: p0Blocks.length, color: '#DC2626', icon: 'ri-alert-fill' },
              { label: 'Blocs P1', value: p1Blocks.length, color: '#D97706', icon: 'ri-error-warning-line' },
              { label: 'Blocs P2', value: p2Blocks.length, color: '#0284C7', icon: 'ri-information-line' },
              { label: 'Actions totales', value: totalActionsAllBlocks, color: '#7C3AED', icon: 'ri-play-list-2-line' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white border border-background-200 p-4 text-center">
                <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                <span className="block text-2xl font-bold font-heading text-foreground-950 mt-1">{s.value}</span>
                <span className="text-xs text-foreground-400">{s.label}</span>
              </div>
            ))}
          </div>

          {/* TOUT EXÉCUTER — Bouton Massif */}
          {!executeAllActive && (
            <div className="rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 p-0.5">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <i className="ri-play-circle-fill text-violet-600 text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-foreground-950">Exécution Massive — {taskBlocks.length} Blocs</h4>
                    <p className="text-xs text-foreground-500">Tous les blocs seront exécutés séquentiellement. {totalActionsAllBlocks} actions au total. Les logs seront persistés dans Supabase. Durée estimée ~2 minutes.</p>
                  </div>
                  <button
                    onClick={async () => { await executeAllBlocks(); setShowExecutionResult(true); }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-sm hover:from-violet-600 hover:to-fuchsia-600 cursor-pointer whitespace-nowrap transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                  >
                    <i className="ri-play-circle-fill text-lg" />
                    TOUT EXÉCUTER
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Résumé de l'exécution massive (quand terminée) */}
          {showExecutionResult && !executeAllActive && blockResults.length > 0 && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-check-double-fill text-emerald-600 text-2xl" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-emerald-800">Exécution Massive Terminée !</h4>
                  <p className="text-xs text-emerald-700">
                    <strong>{completedBlocks.length}/{taskBlocks.length}</strong> blocs exécutés avec succès
                    {failedBlocks.length > 0 && <span className="text-red-600"> · {failedBlocks.length} échecs</span>}
                    {executionStartedAt && <span> · Terminé le {new Date().toLocaleTimeString('fr-FR')}</span>}
                  </p>
                </div>
                <button
                  onClick={() => setShowExecutionResult(false)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold hover:bg-emerald-200 cursor-pointer transition-colors"
                >
                  <i className="ri-close-line mr-1" />Fermer
                </button>
              </div>
            </div>
          )}

          {/* All Blocks */}
          <div className="space-y-4">
            {taskBlocks.map((block) => {
              const statusBadge = BLOCK_STATUS_BADGES[block.status];
              const isExpanded = expandedBlockId === block.block_id;
              const isExecuting = activeBlockExecution === block.block_id;
              const blockFinds = findings.filter((f) => f.programmed_in_block === block.block_id);

              return (
                <div key={block.block_id} className={`rounded-2xl bg-white border overflow-hidden transition-all ${
                  completedBlocks.includes(block.block_id) ? 'border-emerald-400 ring-1 ring-emerald-200' :
                  failedBlocks.includes(block.block_id) ? 'border-red-400 ring-1 ring-red-200' :
                  currentBlockInExecution === block.block_id ? 'border-violet-400 ring-1 ring-violet-200 animate-pulse' :
                  block.priority === 'P0_critical' ? 'border-red-200' :
                  block.priority === 'P1_high' ? 'border-amber-200' :
                  'border-background-200'
                }`}>
                  <div className={`px-5 py-4 border-b ${
                    completedBlocks.includes(block.block_id) ? 'bg-emerald-50/50 border-emerald-100' :
                    failedBlocks.includes(block.block_id) ? 'bg-red-50/50 border-red-100' :
                    currentBlockInExecution === block.block_id ? 'bg-violet-50/50 border-violet-100' :
                    block.priority === 'P0_critical' ? 'bg-red-50/50 border-red-100' :
                    block.priority === 'P1_high' ? 'bg-amber-50/30 border-amber-100' :
                    'bg-background-50 border-background-100'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${PRIORITY_COLORS[block.priority]} bg-opacity-15`}>
                        <i className={`text-lg text-white ${block.priority === 'P0_critical' ? 'ri-alert-fill' : block.priority === 'P1_high' ? 'ri-error-warning-line' : 'ri-information-line'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            block.priority === 'P0_critical' ? 'bg-red-100 text-red-700' :
                            block.priority === 'P1_high' ? 'bg-amber-100 text-amber-700' :
                            'bg-sky-100 text-sky-700'
                          }`}>
                            {block.priority === 'P0_critical' ? 'P0 CRITIQUE' : block.priority === 'P1_high' ? 'P1 HAUTE' : 'P2 MOYENNE'}
                          </span>
                          <span className="text-sm font-bold text-foreground-950">{block.block_name}</span>
                          {completedBlocks.includes(block.block_id) && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              <i className="ri-check-line" />Exécuté
                            </span>
                          )}
                          {failedBlocks.includes(block.block_id) && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                              <i className="ri-close-line" />Échec
                            </span>
                          )}
                          {currentBlockInExecution === block.block_id && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700">
                              <i className="ri-loader-4-line animate-spin" />En cours
                            </span>
                          )}
                          {!completedBlocks.includes(block.block_id) && !failedBlocks.includes(block.block_id) && currentBlockInExecution !== block.block_id && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                              {statusBadge.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-foreground-500 mt-1">{block.description}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-xs text-red-600 font-bold">{block.critical_actions} critiques</span>
                          <span className="text-xs text-foreground-500">{block.total_actions} actions · {block.auto_fixable} auto-fixables</span>
                          <span className="text-xs text-foreground-400">{block.estimated_effort}</span>
                          <span className="text-xs text-foreground-400">{block.deadline_recommendation}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedBlockId(isExpanded ? null : block.block_id); }}
                          className="p-2 rounded-lg hover:bg-background-100 text-foreground-400 cursor-pointer transition-colors"
                        >
                          <i className={`ri-${isExpanded ? 'arrow-up-s' : 'arrow-down-s'}-line`} />
                        </button>
                        {block.status !== 'completed' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); executeBlock(block.block_id); }}
                            disabled={isExecuting}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                              isExecuting
                                ? 'bg-violet-100 text-violet-600'
                                : 'bg-foreground-950 text-white hover:bg-foreground-800'
                            }`}
                          >
                            {isExecuting ? (
                              <>
                                <i className="ri-loader-4-line animate-spin" />
                                {blockExecutionProgress}%
                              </>
                            ) : (
                              <>
                                <i className="ri-play-fill" />
                                Exécuter
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {isExecuting && (
                      <div className="mt-3 h-1.5 rounded-full bg-background-100 overflow-hidden">
                        <div className="h-full rounded-full bg-violet-500 transition-all duration-300" style={{ width: `${blockExecutionProgress}%` }} />
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-5 space-y-4 bg-background-50/50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center p-2 rounded-lg bg-white">
                          <span className="block text-[10px] text-foreground-400">Actions</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{block.total_actions}</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white">
                          <span className="block text-[10px] text-foreground-400">Effort Estimé</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{block.estimated_effort}</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white">
                          <span className="block text-[10px] text-foreground-400">Budget</span>
                          <span className="text-lg font-bold font-heading text-foreground-950">{block.estimated_budget_fcfa}</span>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-white">
                          <span className="block text-[10px] text-foreground-400">Assigné à</span>
                          <span className="text-xs font-bold text-foreground-700 line-clamp-2">{block.assigned_to}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Impact Global</h4>
                        <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl p-3">{block.global_impact}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Findings ({blockFinds.length})</h4>
                        <div className="space-y-2">
                          {blockFinds.map((f) => {
                            const sev = SEVERITY_BADGES[f.severity];
                            return (
                              <div key={f.finding_id} className="flex items-start gap-2 p-2 rounded-lg bg-white">
                                <i className={`${sev.icon} text-sm mt-0.5 ${sev.text}`} />
                                <div>
                                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${sev.bg} ${sev.text}`}>{sev.label}</span>
                                  <span className="text-xs text-foreground-700 ml-1">{f.title}</span>
                                  <span className="text-[10px] text-foreground-400 block mt-0.5">{f.metric}: {f.current_value} → {f.target_value} {f.auto_fixable ? '(Auto-fixable)' : '(Manuel)'}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="rounded-2xl bg-background-100 border border-background-200 p-4 text-center">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="text-xs text-foreground-400">
            <i className="ri-time-line mr-1" />
            Dernier scan : {lastScanTime ? new Date(lastScanTime).toLocaleString('fr-FR') : 'N/A'}
          </span>
          <span className="text-xs text-foreground-400">
            <i className="ri-database-2-line mr-1" />
            {supabaseConnected ? 'Supabase LIVE — logs persistés' : 'Supabase déconnecté — fallback local'}
          </span>
          <span className="text-xs text-foreground-400">
            <i className="ri-file-list-3-line mr-1" />
            {report.total_findings} findings · {taskBlocks.length} blocs · {formatDuration(report.total_duration_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}



