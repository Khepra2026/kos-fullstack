import { useState, useMemo } from 'react';
import { useSocialQualityEngine } from '@/hooks/useSocialQualityEngine';
import { QUALITY_ENGINE_CONFIG, AUTHORIZED_HASHTAGS, PRIORITY_SOURCES, type PostQualityReport, type QualityDimension, type AuditLogEntry } from '@/mocks/socialQualityEngine';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

interface SocialQualityPanelProps {
  queue: SocialQueueItem[];
  isActive?: boolean;
}

// ─── Sous-composants ──────────────────────────────────────────────────

function ScoreGauge({ score, max, label, color }: { score: number; max: number; label: string; color: string }) {
  const pct = Math.round((score / max) * 100);
  const statusColor = pct >= 85 ? 'bg-emerald-500' : pct >= 65 ? 'bg-amber-500' : pct >= 40 ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-foreground-500 w-24 truncate">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-background-200 overflow-hidden">
        <div className={`h-full rounded-full ${statusColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold font-heading w-10 text-right" style={{ color }}>{score}/{max}</span>
    </div>
  );
}

function DimensionCard({ dim, color }: { dim: QualityDimension; color: string }) {
  const statusColors: Record<string, string> = {
    excellent: 'bg-emerald-50 border-emerald-200',
    good: 'bg-secondary-50 border-secondary-200',
    warning: 'bg-amber-50 border-amber-200',
    critical: 'bg-red-50 border-red-200',
  };

  const statusLabels: Record<string, string> = {
    excellent: 'Excellent',
    good: 'Bon',
    warning: 'Attention',
    critical: 'Critique',
  };

  const statusIcons: Record<string, string> = {
    excellent: 'ri-check-double-line text-emerald-600',
    good: 'ri-check-line text-secondary-600',
    warning: 'ri-alert-line text-amber-600',
    critical: 'ri-close-circle-line text-red-600',
  };

  return (
    <div className={`rounded-2xl border p-5 ${statusColors[dim.status]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <i className={`${QUALITY_ENGINE_CONFIG.dimensions.find(d => d.key === dim.name.toLowerCase())?.icon || 'ri-check-line'} text-base`} style={{ color }} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground-950">{dim.name}</h4>
            <span className="text-[10px] text-foreground-400">{dim.max} points max</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-heading" style={{ color }}>{dim.score}</span>
          <span className="text-xs text-foreground-400">/{dim.max}</span>
        </div>
      </div>

      <ScoreGauge score={dim.score} max={dim.max} label="" color={color} />

      <div className="flex items-center gap-1.5 mt-3">
        <i className={`${statusIcons[dim.status]} text-sm`} />
        <span className="text-xs font-bold" style={{ color }}>{statusLabels[dim.status]}</span>
      </div>

      {dim.details.length > 0 && (
        <div className="mt-2 space-y-1">
          {dim.details.map((d, i) => (
            <p key={i} className="text-[10px] text-foreground-500 flex items-start gap-1">
              <span className="w-1 h-1 rounded-full bg-foreground-300 mt-1 flex-shrink-0" />
              {d}
            </p>
          ))}
        </div>
      )}

      {dim.issues.length > 0 && (
        <div className="mt-3 pt-3 border-t border-foreground-200/30">
          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Problèmes</span>
          <div className="mt-1 space-y-1">
            {dim.issues.map((issue, i) => (
              <p key={i} className="text-[10px] text-foreground-600 flex items-start gap-1">
                <span className="w-1 h-1 rounded-full bg-red-400 mt-1 flex-shrink-0" />
                {issue}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PostQualityRow({ report, expanded, onToggle, isCorrected }: { report: PostQualityReport; expanded: boolean; onToggle: () => void; isCorrected?: boolean }) {
  const scoreColor = report.global_score >= 95 ? 'text-emerald-600' : report.global_score >= 80 ? 'text-amber-600' : report.global_score >= 60 ? 'text-orange-600' : 'text-red-600';
  const scoreBg = report.global_score >= 95 ? 'bg-emerald-50 border-emerald-200' : report.global_score >= 80 ? 'bg-amber-50 border-amber-200' : report.global_score >= 60 ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200';

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${scoreBg}`}>
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          report.authorized_for_publication ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          <i className={`text-white text-lg ${report.authorized_for_publication ? 'ri-check-line' : 'ri-close-line'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-foreground-950 truncate">#{report.post_id} — {report.post_title.substring(0, 50)}...</span>
            {report.authorized_for_publication ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 text-[9px] font-bold whitespace-nowrap">
                <i className="ri-check-line" />PUBLIABLE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-700 text-[9px] font-bold whitespace-nowrap">
                <i className="ri-close-line" />BLOQUÉ
              </span>
            )}
            {isCorrected && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-700 text-[9px] font-bold whitespace-nowrap">
                <i className="ri-tools-line" />CORRIGÉ
              </span>
            )}
            {report.hashtag_violations.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-[9px] font-bold whitespace-nowrap">
                <i className="ri-hashtag" />{report.hashtag_violations.length}
              </span>
            )}
            {report.unverified_claims.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-700 text-[9px] font-bold whitespace-nowrap">
                <i className="ri-error-warning-line" />{report.unverified_claims.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <ScoreGauge score={report.global_score} max={100} label="" color="#059669" />
            <span className={`text-sm font-bold font-heading ${scoreColor} flex-shrink-0`}>{report.global_score}/100</span>
          </div>
        </div>
        <i className={`ri-${expanded ? 'arrow-up' : 'arrow-down'}-s-line text-foreground-400 text-sm flex-shrink-0`} />
      </button>

      {expanded && (
        <div className="border-t border-foreground-200/30 p-4 space-y-3">
          {/* 5 dimensions detail */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {QUALITY_ENGINE_CONFIG.dimensions.map((dimConfig) => {
              const dim = report[dimConfig.key as keyof Pick<PostQualityReport, 'compliance' | 'credibility' | 'seo' | 'engagement' | 'linkedin'>] as QualityDimension;
              const pct = Math.round((dim.score / dim.max) * 100);
              return (
                <div key={dimConfig.key} className="rounded-xl bg-white border border-background-200 p-3 text-center">
                  <div className="w-8 h-8 rounded-lg mx-auto mb-1.5 flex items-center justify-center" style={{ backgroundColor: `${dimConfig.color}15` }}>
                    <i className={`${dimConfig.icon} text-sm`} style={{ color: dimConfig.color }} />
                  </div>
                  <span className="text-[10px] text-foreground-400 block">{dimConfig.name}</span>
                  <span className="text-lg font-bold font-heading" style={{ color: dimConfig.color }}>{dim.score}/{dim.max}</span>
                  <div className="w-full h-1 rounded-full bg-background-200 mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: dimConfig.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Issues & recommendations */}
          {report.recommendation && (
            <div className="rounded-xl bg-background-50 border border-background-200 p-3">
              <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Recommandation</span>
              <p className="text-xs text-foreground-700 mt-1">{report.recommendation}</p>
            </div>
          )}

          {report.structure_gaps.length > 0 && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Gaps de structure ({report.structure_gaps.length})</span>
              <ul className="mt-1 space-y-0.5">
                {report.structure_gaps.map((gap, i) => (
                  <li key={i} className="text-xs text-amber-800 flex items-start gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AuditLogTimeline({ logs }: { logs: AuditLogEntry[] }) {
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');

  const filtered = filter === 'all' ? logs : logs.filter(l => l.severity === filter);

  const actionBadges: Record<string, { bg: string; text: string; icon: string }> = {
    scan: { bg: 'bg-secondary-50', text: 'text-secondary-700', icon: 'ri-search-line' },
    correct: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'ri-tools-line' },
    block: { bg: 'bg-red-50', text: 'text-red-700', icon: 'ri-close-circle-line' },
    authorize: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'ri-check-double-line' },
    flag: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'ri-flag-line' },
  };

  const severityIcons: Record<string, string> = {
    info: 'ri-information-line text-secondary-500',
    warning: 'ri-alert-line text-amber-500',
    critical: 'ri-error-warning-line text-red-500',
  };

  function formatTime(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider whitespace-nowrap">Filtrer :</span>
        {(['all', 'info', 'warning', 'critical'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
              filter === f
                ? 'bg-foreground-950 text-white'
                : 'bg-white border border-background-200 text-foreground-600 hover:border-foreground-300'
            }`}
          >
            {f === 'all' ? 'Tous' : f === 'info' ? 'Info' : f === 'warning' ? 'Attention' : 'Critique'}
            <span className="text-[9px] opacity-60">
              ({f === 'all' ? logs.length : logs.filter(l => l.severity === f).length})
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 bg-background-50 rounded-2xl">
          <i className="ri-file-list-3-line text-2xl text-foreground-300 mb-2 block" />
          <p className="text-sm text-foreground-400">Aucune entrée d'audit</p>
        </div>
      ) : (
        <div className="space-y-1 max-h-[500px] overflow-y-auto">
          {filtered.map((entry) => {
            const badge = actionBadges[entry.action];
            return (
              <div key={entry.id} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-background-200 hover:bg-background-50 transition-colors">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${badge.bg}`}>
                  <i className={`${badge.icon} text-xs ${badge.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${badge.bg} ${badge.text}`}>
                      {entry.action.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-foreground-400 font-mono">{entry.id}</span>
                    <i className={`${severityIcons[entry.severity]} text-xs`} />
                    <span className="text-[10px] text-foreground-500">{formatTime(entry.timestamp)}</span>
                  </div>
                  <p className="text-xs text-foreground-700 mt-1">{entry.detail}</p>
                  {entry.score_before !== undefined && entry.score_after !== undefined && (
                    <p className="text-[10px] text-foreground-400 mt-0.5">
                      Score : {entry.score_before} → {entry.score_after}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────

export default function SocialQualityPanel({ queue }: SocialQualityPanelProps) {
  const {
    reports,
    correctedReports,
    executiveReport,
    auditLog,
    correctionResults,
    loading,
    correcting,
    error,
    overallHealthScore,
    authorizedPosts,
    blockedPosts,
    criticalPosts,
    hashtagViolations,
    unverifiedClaimsAll,
    runQualityScan,
    runAutoCorrection,
    lastScanDate,
    scanCount,
    correctedCount,
    supabaseError,
  } = useSocialQualityEngine(queue);

  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'posts' | 'audit' | 'report'>('overview');

  const displayReports = correctedReports.length > 0 ? correctedReports : reports;

  const sortedReports = useMemo(
    () => [...displayReports].sort((a, b) => a.global_score - b.global_score),
    [displayReports]
  );

  const postsInCorrectionRange = useMemo(
    () => reports.filter(r => r.global_score >= 80 && r.global_score < 95),
    [reports]
  );

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <i className="ri-shield-star-line text-white text-lg" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground-950">Qualité Big Four™ — Scoring & Conformité</h2>
              <p className="text-sm text-foreground-500">Publication autorisée uniquement si score global ≥ 95/100</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {lastScanDate && (
              <span className="text-[10px] text-foreground-400">
                Dernier scan : {new Date(lastScanDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                {scanCount > 0 && ` · #${scanCount}`}
                {correctedCount > 0 && ` · ${correctedCount} corrigé(s)`}
              </span>
            )}
            <button
              onClick={runQualityScan}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-950 text-white text-sm font-bold hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <i className={`${loading ? 'ri-loader-2-line animate-spin' : 'ri-refresh-line'} text-sm`} />
              {loading ? 'Scan en cours...' : 'Lancer le scan Big Four'}
            </button>
            {postsInCorrectionRange.length > 0 && (
              <button
                onClick={runAutoCorrection}
                disabled={correcting || loading}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <i className={`${correcting ? 'ri-loader-2-line animate-spin' : 'ri-tools-line'} text-sm`} />
                {correcting ? 'Correction...' : `Auto-corriger (${postsInCorrectionRange.length})`}
              </button>
            )}
          </div>
        </div>

        {/* Supabase error */}
        {supabaseError && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-alert-line text-amber-600 text-sm" />
            </div>
            <p className="text-sm text-amber-700">
              <strong>Journal Supabase :</strong> {supabaseError}
              <span className="block text-xs text-amber-600 mt-0.5">Les logs restent disponibles localement. Vérifiez la connexion Supabase.</span>
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-error-warning-line text-red-600 text-sm" />
            </div>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Sub-tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
            { id: 'posts', label: 'Posts', icon: 'ri-file-list-3-line', count: displayReports.length },
            { id: 'audit', label: 'Journal d\'Audit', icon: 'ri-book-open-line', count: auditLog.length },
            { id: 'report', label: 'Rapport Exécutif', icon: 'ri-file-chart-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-foreground-950 text-background-50'
                  : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
              }`}
            >
              <i className={`${tab.icon} text-base`} />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSubTab === tab.id ? 'bg-white/20' : 'bg-background-200'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm text-foreground-500">Scan qualité Big Four en cours...</p>
            <p className="text-xs text-foreground-400 mt-1">Analyse conformité, crédibilité, SEO, engagement, LinkedIn</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && reports.length === 0 && (
          <div className="text-center py-12 bg-background-50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-background-200 flex items-center justify-center mx-auto mb-3">
              <i className="ri-shield-star-line text-foreground-400 text-xl" />
            </div>
            <p className="text-sm text-foreground-500">Aucun post LinkedIn à analyser</p>
            <p className="text-xs text-foreground-400 mt-1">Ajoutez des posts LinkedIn dans la file d'attente pour lancer le scan qualité</p>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <>
            {/* SUB-TAB: Overview */}
            {activeSubTab === 'overview' && (
              <>
                {/* Big Four Score Card */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: 'radial-gradient(circle at 25% 50%, #059669 0%, transparent 50%), radial-gradient(circle at 75% 50%, #0A66C2 0%, transparent 50%)',
                    }} />
                  </div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30 backdrop-blur-sm mb-4">
                        <span className={`w-2.5 h-2.5 rounded-full ${overallHealthScore >= 95 ? 'bg-emerald-400 animate-pulse' : overallHealthScore >= 80 ? 'bg-amber-400' : 'bg-red-400'}`} />
                        <span className="text-sm font-bold text-primary-300 uppercase tracking-widest">
                          KOS Social Media Quality Engine™
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                        Score Qualité Global
                      </h2>
                      <p className="text-gray-400 max-w-xl">
                        Seuil de publication : <strong className="text-emerald-400">≥ 95/100</strong>.{'\n'}
                        {authorizedPosts.length} posts autorisés · {blockedPosts.length} bloqués · {criticalPosts.length} critiques
                        {correctedCount > 0 && ` · ${correctedCount} auto-corrigé(s)`}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center mb-2 ${
                        overallHealthScore >= 95 ? 'border-emerald-500/50' : overallHealthScore >= 80 ? 'border-amber-500/50' : 'border-red-500/50'
                      }`}>
                        <span className={`text-4xl sm:text-5xl font-bold font-heading ${
                          overallHealthScore >= 95 ? 'text-emerald-400' : overallHealthScore >= 80 ? 'text-amber-400' : 'text-red-400'
                        }`}>{overallHealthScore}</span>
                      </div>
                      <span className="text-xs text-gray-400">/ 100</span>
                    </div>
                  </div>
                </div>

                {/* Auto-correction results banner */}
                {correctionResults.length > 0 && (
                  <div className="mb-8 rounded-2xl bg-primary-50 border border-primary-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                        <i className="ri-tools-line text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-primary-900">Auto-Correction Big Four Terminée</h3>
                        <p className="text-sm text-primary-700">{correctionResults.length} post(s) corrigé(s) automatiquement</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 rounded-xl bg-white border border-primary-200">
                        <span className="text-2xl font-bold font-heading text-primary-600">
                          {correctionResults.reduce((s, r) => s + r.score_before, 0) / correctionResults.length}
                        </span>
                        <span className="text-xs text-primary-400 block">Score Avant</span>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white border border-primary-200">
                        <span className="text-2xl font-bold font-heading text-emerald-600">
                          {correctionResults.reduce((s, r) => s + r.score_after, 0) / correctionResults.length}
                        </span>
                        <span className="text-xs text-primary-400 block">Score Après</span>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white border border-primary-200">
                        <span className="text-2xl font-bold font-heading text-emerald-600">
                          +{Math.round((correctionResults.reduce((s, r) => s + (r.score_after - r.score_before), 0) / correctionResults.length))}
                        </span>
                        <span className="text-xs text-primary-400 block">Gain Moyen</span>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white border border-primary-200">
                        <span className="text-2xl font-bold font-heading text-emerald-600">
                          {correctionResults.filter(r => r.authorized_after).length}
                        </span>
                        <span className="text-xs text-primary-400 block">Maintenant Publiables</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {correctionResults.map((res) => (
                        <div key={res.post_id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-primary-200">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            res.authorized_after ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}>
                            <i className={`text-white text-sm ${res.authorized_after ? 'ri-check-line' : 'ri-alert-line'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground-950">Post #{res.post_id}</p>
                            <p className="text-xs text-foreground-500">
                              {res.corrections_applied.join(' · ')}
                            </p>
                            {res.hashtags_replaced.length > 0 && (
                              <p className="text-xs text-foreground-400 mt-0.5">
                                Hashtags : {res.hashtags_replaced.map(h => `${h.old}→${h.new}`).join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-sm font-bold text-foreground-700">{res.score_before}</span>
                            <i className="ri-arrow-right-line text-xs text-foreground-400 mx-1" />
                            <span className={`text-sm font-bold ${res.score_after >= 95 ? 'text-emerald-600' : 'text-amber-600'}`}>{res.score_after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {[
                    { label: 'Posts Analysés', value: displayReports.length, icon: 'ri-file-list-3-line', color: '#0A66C2' },
                    { label: 'Autorisés (≥95)', value: authorizedPosts.length, icon: 'ri-check-double-line', color: '#059669' },
                    { label: 'Bloqués (<95)', value: blockedPosts.length, icon: 'ri-close-circle-line', color: '#DC2626' },
                    { label: 'Hashtags Non Conformes', value: hashtagViolations.length, icon: 'ri-hashtag', color: '#D97706' },
                    { label: 'Affirmations Non Vérifiées', value: unverifiedClaimsAll.length, icon: 'ri-error-warning-line', color: '#7C3AED' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white border border-background-200 p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                          <i className={`${stat.icon} text-sm`} style={{ color: stat.color }} />
                        </div>
                      </div>
                      <span className="text-2xl font-bold font-heading text-foreground-950">{stat.value}</span>
                      <p className="text-[10px] text-foreground-400 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* 5 Dimensions */}
                {displayReports.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    {QUALITY_ENGINE_CONFIG.dimensions.map((dimConfig) => {
                      const dim = displayReports[0][dimConfig.key as keyof Pick<PostQualityReport, 'compliance' | 'credibility' | 'seo' | 'engagement' | 'linkedin'>] as QualityDimension;
                      return (
                        <DimensionCard key={dimConfig.key} dim={dim} color={dimConfig.color} />
                      );
                    })}
                  </div>
                )}

                {/* Configuration */}
                <div className="rounded-2xl bg-white border border-background-200 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                    <i className="ri-settings-3-line text-foreground-400 text-lg" />
                    Configuration Qualité Big Four
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hashtags autorisés */}
                    <div>
                      <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider block mb-2">
                        Hashtags Autorisés ({AUTHORIZED_HASHTAGS.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {AUTHORIZED_HASHTAGS.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sources prioritaires */}
                    <div>
                      <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider block mb-2">
                        Sources Prioritaires ({PRIORITY_SOURCES.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {PRIORITY_SOURCES.map(source => (
                          <span key={source} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-50 text-secondary-700 border border-secondary-200">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Règles */}
                    <div>
                      <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider block mb-2">
                        Règles de Publication
                      </span>
                      <ul className="space-y-1.5">
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0 mt-0.5" />
                          Score global ≥ 95/100 requis
                        </li>
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0 mt-0.5" />
                          6 éléments de structure obligatoires
                        </li>
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0 mt-0.5" />
                          Hashtags exclusivement de la liste autorisée
                        </li>
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0 mt-0.5" />
                          Sources prioritaires uniquement
                        </li>
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-check-line text-emerald-500 text-sm flex-shrink-0 mt-0.5" />
                          Aucune affirmation non vérifiée
                        </li>
                        <li className="text-xs text-foreground-600 flex items-start gap-1.5">
                          <i className="ri-tools-line text-primary-500 text-sm flex-shrink-0 mt-0.5" />
                          Auto-correction : 80-95/100 (hashtags + structure)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* SUB-TAB: Posts */}
            {activeSubTab === 'posts' && (
              <div className="space-y-3">
                {/* Top blocked posts */}
                {blockedPosts.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-close-circle-line text-red-600" />
                      <h3 className="text-sm font-bold text-red-700">Posts Bloqués ({blockedPosts.length})</h3>
                    </div>
                    <div className="space-y-3">
                      {sortedReports
                        .filter(r => !r.authorized_for_publication)
                        .map(report => (
                          <PostQualityRow
                            key={report.post_id}
                            report={report}
                            expanded={expandedPostId === report.post_id}
                            onToggle={() => setExpandedPostId(expandedPostId === report.post_id ? null : report.post_id)}
                            isCorrected={correctedReports.some(c => c.post_id === report.post_id)}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Authorized posts */}
                {authorizedPosts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-check-double-line text-emerald-600" />
                      <h3 className="text-sm font-bold text-emerald-700">Posts Autorisés ({authorizedPosts.length})</h3>
                    </div>
                    <div className="space-y-3">
                      {sortedReports
                        .filter(r => r.authorized_for_publication)
                        .map(report => (
                          <PostQualityRow
                            key={report.post_id}
                            report={report}
                            expanded={expandedPostId === report.post_id}
                            onToggle={() => setExpandedPostId(expandedPostId === report.post_id ? null : report.post_id)}
                            isCorrected={correctedReports.some(c => c.post_id === report.post_id)}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB: Audit */}
            {activeSubTab === 'audit' && (
              <AuditLogTimeline logs={auditLog} />
            )}

            {/* SUB-TAB: Report */}
            {activeSubTab === 'report' && executiveReport && (
              <div className="space-y-6">
                {/* Executive Summary */}
                <div className="rounded-3xl bg-foreground-950 p-6 sm:p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: 'radial-gradient(circle at 30% 50%, #059669 0%, transparent 50%), radial-gradient(circle at 70% 50%, #7C3AED 0%, transparent 50%)',
                    }} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <i className="ri-file-chart-line text-2xl text-emerald-400" />
                      <h3 className="font-heading text-2xl font-bold text-white">Rapport Exécutif Big Four</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Posts Analysés', value: executiveReport.total_posts_analyzed },
                        { label: 'Score Moyen', value: `${executiveReport.average_score}/100` },
                        { label: 'Taux Conformité', value: `${executiveReport.compliance_rate}%` },
                        { label: 'Posts Autorisés', value: executiveReport.posts_authorized },
                      ].map((s) => (
                        <div key={s.label} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                          <span className="block text-2xl font-bold font-heading text-white">{s.value}</span>
                          <span className="text-xs text-gray-400">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Issues */}
                {executiveReport.top_issues.length > 0 && (
                  <div className="rounded-2xl bg-white border border-background-200 p-6">
                    <h4 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-alert-line text-amber-500" />
                      Top Problèmes
                    </h4>
                    <div className="space-y-2">
                      {executiveReport.top_issues.map((issue, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background-50">
                          <span className="text-[10px] font-bold text-foreground-400 w-6">{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground-700">{issue.issue}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            issue.severity === 'critical' ? 'bg-red-50 text-red-700' : issue.severity === 'high' ? 'bg-amber-50 text-amber-700' : 'bg-secondary-50 text-secondary-700'
                          }`}>
                            {issue.count}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {executiveReport.recommendations.length > 0 && (
                  <div className="rounded-2xl bg-white border border-background-200 p-6">
                    <h4 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-amber-500" />
                      Recommandations
                    </h4>
                    <ul className="space-y-2">
                      {executiveReport.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground-700 p-3 rounded-xl bg-background-50">
                          <span className="w-6 h-6 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className="ri-arrow-right-line text-primary-600 text-xs" />
                          </span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cycle ID */}
                <div className="text-center text-[10px] text-foreground-400">
                  Cycle {executiveReport.cycle_id} · {new Date(executiveReport.cycle_date).toLocaleString('fr-FR')}
                </div>
              </div>
            )}

            {/* Hashtag violations banner */}
            {hashtagViolations.length > 0 && (
              <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <i className="ri-hashtag text-amber-600 text-sm" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-amber-700">{hashtagViolations.length} hashtag(s) non autorisé(s)</span>
                    <p className="text-xs text-amber-600">Remplacer par les hashtags de la liste officielle KHEPRA EXPERTS</p>
                  </div>
                </div>
                <div className="space-y-1">
                  {hashtagViolations.map((v, i) => (
                    <div key={i} className="text-xs text-amber-800 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                      Post #{v.postId} : <code className="bg-amber-100 px-1 rounded text-amber-700 font-mono">{v.violation}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unverified claims banner */}
            {unverifiedClaimsAll.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <i className="ri-error-warning-line text-red-600 text-sm" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-red-700">{unverifiedClaimsAll.length} affirmation(s) non vérifiée(s)</span>
                    <p className="text-xs text-red-600">Remplacer par "Information non vérifiée à ce stade."</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}





