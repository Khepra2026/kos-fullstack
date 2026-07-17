import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { useKOSYoutubeProductionPipeline } from '@/hooks/useKOSYoutubeProductionPipeline';
import EditorialCalendarTab from './components/EditorialCalendarTab';
import VideoComparisonTab from './components/VideoComparisonTab';
import PlaylistIntelligenceTab from './components/PlaylistIntelligenceTab';
import PublicationLiveNotification from './components/PublicationLiveNotification';
import type { PipelineWorkflow, StrategicTrend, ScriptGeneration, VoiceGeneration, VideoProduction, YoutubeSEO, YoutubePublication, VideoAnalytics, OptimizationAction } from '@/mocks/kosYoutubeProductionPipeline';

const WF_COLORS: Record<string, string> = {
  intelligence: '#86BC25',
  creation: '#C2410C',
  production: '#FF0000',
  distribution: '#0A66C2',
  analysis: '#D97757',
  optimization: '#6B7280',
};

const TREND_COLORS: Record<string, string> = {
  rising: '#059669',
  stable: '#CA8A04',
  declining: '#DC2626',
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  high: '#C2410C',
  medium: '#CA8A04',
  low: '#6B7280',
};

const STAGE_COLORS: Record<string, string> = {
  draft: '#6B7280',
  reviewed: '#CA8A04',
  approved: '#059669',
  rejected: '#DC2626',
  generated: '#CA8A04',
  corrected: '#C2410C',
  normalized: '#0A66C2',
  exported: '#059669',
  rendering: '#CA8A04',
  exported_1080p: '#0A66C2',
  exported_1440p: '#0A66C2',
  exported_4k: '#C2410C',
  complete: '#059669',
  optimized: '#C2410C',
  applied: '#059669',
  uploaded: '#CA8A04',
  processing: '#0A66C2',
  published: '#059669',
  failed: '#DC2626',
  detected: '#CA8A04',
  scheduled: '#0A66C2',
  executed: '#C2410C',
  verified: '#059669',
};

const KPI_STATUS_COLORS: Record<string, string> = {
  on_track: '#059669',
  near_target: '#CA8A04',
  exceeding: '#86BC25',
};

function trendIcon(trend: string) {
  if (trend === 'rising') return 'ri-arrow-up-line';
  if (trend === 'declining') return 'ri-arrow-down-line';
  return 'ri-arrow-right-line';
}

function expandIcon(expanded: boolean) {
  return expanded ? 'ri-subtract-line' : 'ri-add-line';
}

export default function KOSYoutubeProductionPipelinePage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const initialFilterSSE = searchParams.get('filter') === 'sse';

  const data = useKOSYoutubeProductionPipeline();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [filterSSE, setFilterSSE] = useState<boolean>(initialFilterSSE);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const [expandedSeo, setExpandedSeo] = useState<string | null>(null);

  const filteredScripts = filterSSE
    ? data.scripts.filter((s) => (s as Record<string, unknown>).sseGenerated === true)
    : data.scripts;

  const tabs = [
    { id: 'overview', label: 'Vue d\'Ensemble', icon: 'ri-dashboard-line' },
    { id: 'calendrier', label: 'Calendrier Éditorial', icon: 'ri-calendar-schedule-line', count: `${data.editorialCalendar.length}` },
    { id: 'comparatif', label: 'Comparatif Vidéo', icon: 'ri-bar-chart-grouped-line', count: `${data.videoComparison.length}` },
    { id: 'playlists', label: 'Playlist Intelligence', icon: 'ri-play-list-2-line', count: `${data.playlists.length}` },
    { id: 'veille', label: '1. Veille Stratégique', icon: 'ri-radar-line', count: `${data.trends.length}` },
    { id: 'scripts', label: '2. Scripts', icon: 'ri-file-text-line', count: `${data.scripts.length}` },
    { id: 'voix', label: '3. Voix IA', icon: 'ri-mic-line', count: `${data.voices.length}` },
    { id: 'video', label: '4. Production Vidéo', icon: 'ri-movie-line', count: `${data.videos.length}` },
    { id: 'seo', label: '5. SEO YouTube', icon: 'ri-search-eye-line', count: `${data.seoItems.length}` },
    { id: 'publication', label: '6. Publication', icon: 'ri-upload-cloud-line', count: `${data.publications.length}` },
    { id: 'analytics', label: '7. Analytics', icon: 'ri-line-chart-line', count: `${data.analytics.length}` },
    { id: 'optimisation', label: '8. Optimisation', icon: 'ri-loop-left-line', count: `${data.optimizations.length}` },
  ];

  return (
    <KOSHubLayout hubId={77}>
      <SeoHead
        title="KOS YouTube Production Pipeline™ — Automatisation Intégrale Production Vidéo | KHEPRA EXPERTS"
        description="Chaîne de production YouTube 100% autonome : Idée → Script → Voix → Vidéo → Thumbnail → SEO → Publication → Analyse → Optimisation. 8 workflows, 4 vidéos/semaine, 94.2% automatisation."
        keywords="YouTube automation, production vidéo autonome, pipeline YouTube, KHEPRA EXPERTS, SEO YouTube, automatisation contenu"
        canonicalPath="/kos-youtube-production-pipeline"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #FF0000 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #86BC25 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #0A66C2 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-rocket-2-line" />KOS YouTube Production Pipeline™ — Master Prompt 2
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Automatisation Intégrale de la Production & Publication YouTube
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl">
              Chaîne de production continue : Idée → Script → Voix → Vidéo → Thumbnail → SEO → Publication → Analyse → Optimisation. 8 workflows · 94.2% automatisation · 3.4 vidéos/semaine.
            </p>
            {/* Pipeline Flow Visual */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {data.pipelineLine.map((stage, i) => (
                <div key={stage.stage} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}40` }}>
                    <i className={`${stage.icon} text-sm`} />
                    <span>{stage.stage}</span>
                    {stage.count > 0 && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: stage.color, color: '#fff' }}>{stage.count}</span>
                    )}
                  </div>
                  {i < data.pipelineLine.length - 1 && <i className="ri-arrow-right-line text-white/30 text-xs" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SSE Bridge Banner — Social Selling Engine → YouTube Production Pipeline */}
      {data.sseScriptCount > 0 && (
        <section className="py-3 bg-gradient-to-r from-red-500/5 via-accent-100/30 to-emerald-500/5 border-b border-red-200/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/kos-linkedin-social-selling-engine"
              className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-red-200/50 hover:border-red-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                <i className="ri-git-merge-line text-white text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    SSE BIG FOUR CONNECTÉ
                  </span>
                  <span className="text-sm font-bold text-foreground-950">
                    Social Selling Engine → YouTube Production Pipeline
                  </span>
                </div>
                <p className="text-xs text-foreground-500 mt-0.5">
                  {data.sseApprovedArticlesCount} article(s) approuvé(s) automatiquement converti(s) en {data.sseScriptCount} scripts vidéo YouTube. Filtrez avec le badge "SSE 90+" dans l'onglet Scripts.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <span className="block text-lg font-bold font-heading text-red-600">{data.sseScriptCount}</span>
                  <span className="text-[10px] text-foreground-400">Scripts SSE</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold whitespace-nowrap group-hover:bg-red-700 transition-colors">
                  <span>Social Selling Engine</span>
                  <i className="ri-arrow-right-line" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* KPI Bar — 8 Mandatory KPIs */}
      <section className="bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { key: 'productionTime', label: 'Temps Production', icon: 'ri-timer-line' },
              { key: 'automationRate', label: 'Automatisation', icon: 'ri-robot-line' },
              { key: 'publicationRate', label: 'Publication', icon: 'ri-upload-cloud-line' },
              { key: 'errorRate', label: 'Taux Erreurs', icon: 'ri-error-warning-line' },
              { key: 'avgCTR', label: 'CTR Moyen', icon: 'ri-cursor-line' },
              { key: 'avgWatchTime', label: 'Watch Time', icon: 'ri-eye-line' },
              { key: 'subscriberGrowth', label: 'Croissance Abonnés', icon: 'ri-user-add-line' },
              { key: 'brandAuthority', label: 'Autorité Marque', icon: 'ri-shield-star-line' },
            ].map((kpi) => {
              const d = (data.kpis as Record<string, { value: string; target: string; trend: string; status: string }>)[kpi.key];
              return (
                <div key={kpi.key} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                  <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${KPI_STATUS_COLORS[d.status]}15` }}>
                    <i className={`${kpi.icon} text-xs`} style={{ color: KPI_STATUS_COLORS[d.status] }} />
                  </div>
                  <span className="block text-base font-bold text-foreground-950">{d.value}</span>
                  <span className="text-[10px] text-foreground-400">{kpi.label}</span>
                  <span className="block text-[9px] mt-0.5" style={{ color: KPI_STATUS_COLORS[d.status] }}>{d.trend}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                }`}
              >
                <i className={`${tab.icon} text-sm`} />{tab.label}
                {tab.count && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-200 text-foreground-500">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CALENDRIER ÉDITORIAL ═══════════════ */}
      {activeTab === 'calendrier' && (
        <EditorialCalendarTab calendar={data.editorialCalendar} />
      )}

      {/* ═══════════════ COMPARATIF VIDÉO ═══════════════ */}
      {activeTab === 'comparatif' && (
        <VideoComparisonTab videos={data.videoComparison} />
      )}

      {/* ═══════════════ PLAYLIST INTELLIGENCE ═══════════════ */}
      {activeTab === 'playlists' && (
        <PlaylistIntelligenceTab playlists={data.playlists} />
      )}

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      {activeTab === 'overview' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Pipeline de Production Autonome — Vue d&apos;Ensemble</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                La chaîne de production KHEPRA EXPERTS transforme automatiquement une idée en vidéo publiée optimisée, sans intervention humaine. 8 workflows séquentiels couvrent l&apos;intégralité du cycle de vie d&apos;un contenu YouTube.
              </p>
            </div>

            {/* 8 Workflow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {data.workflows.map((wf: PipelineWorkflow) => {
                const isExpanded = expandedWorkflow === wf.workflowId;
                return (
                  <div key={wf.workflowId} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300 shadow-sm ring-1 ring-foreground-200' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedWorkflow(isExpanded ? null : wf.workflowId)}
                      className="w-full p-4 text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${WF_COLORS[wf.category]}15` }}>
                          <i className={`${wf.icon} text-lg`} style={{ color: WF_COLORS[wf.category] }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold text-foreground-400">#{wf.order}</span>
                            <h3 className="text-sm font-bold text-foreground-950">{wf.name}</h3>
                          </div>
                          <p className="text-[11px] text-foreground-500 line-clamp-2 mb-2">{wf.description}</p>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span style={{ color: WF_COLORS[wf.category] }}>{wf.successRate}% succès</span>
                            <span className="text-foreground-400">{wf.avgDuration}</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${wf.status === 'active' ? 'bg-emerald-500 animate-pulse' : wf.status === 'optimizing' ? 'bg-amber-500 animate-pulse' : 'bg-foreground-300'}`} />
                          </div>
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-background-200/70 pt-3 animate-fade-in">
                        <p className="text-xs text-foreground-600 mb-2">{wf.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div><span className="text-foreground-400">Exécutions</span><p className="font-bold text-foreground-700">{wf.executionCount}</p></div>
                          <div><span className="text-foreground-400">Taux succès</span><p className="font-bold" style={{ color: WF_COLORS[wf.category] }}>{wf.successRate}%</p></div>
                          <div><span className="text-foreground-400">Durée moyenne</span><p className="font-bold text-foreground-700">{wf.avgDuration}</p></div>
                          <div><span className="text-foreground-400">Dernière exécution</span><p className="font-bold text-foreground-700">{new Date(wf.lastRun).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Channel Stats Summary */}
            <div className="rounded-2xl bg-foreground-950 p-6 text-white">
              <h3 className="font-heading text-lg font-bold mb-4">Performance Chaîne YouTube — KHEPRA EXPERTS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { label: 'Vidéos', value: data.channelStats.totalVideos, icon: 'ri-movie-line' },
                  { label: 'Vues Totales', value: data.channelStats.totalViews.toLocaleString(), icon: 'ri-eye-line' },
                  { label: 'Watch Time', value: data.channelStats.totalWatchTime, icon: 'ri-timer-line' },
                  { label: 'Abonnés', value: data.channelStats.subscribers.toLocaleString(), icon: 'ri-user-line' },
                  { label: 'CTR Moyen', value: `${data.channelStats.avgCTR}%`, icon: 'ri-cursor-line' },
                  { label: 'RPM Moyen', value: `${data.channelStats.avgRPM}€`, icon: 'ri-money-euro-circle-line' },
                  { label: 'Pipeline', value: `${data.channelStats.pipelineQueue} en cours`, icon: 'ri-stack-line' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <i className={`${s.icon} text-white/40 text-xl mb-1 block`} />
                    <span className="block text-xl font-bold">{s.value}</span>
                    <span className="text-[10px] text-white/50">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 1 — VEILLE STRATÉGIQUE ═══════════════ */}
      {activeTab === 'veille' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 1 — Veille Stratégique Quotidienne</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Analyse quotidienne des tendances réglementaires BCEAO, FinTech, Gouvernance, Conformité. Chaque tendance reçoit 4 scores automatiques : SEO, GEO, Viralité, Expertise. Les sujets prioritaires alimentent le pipeline.
              </p>
            </div>

            {/* Score Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
              {[
                { label: 'Score SEO', color: '#86BC25', icon: 'ri-search-line' },
                { label: 'Score GEO', color: '#C2410C', icon: 'ri-map-pin-line' },
                { label: 'Score Viralité', color: '#FF0000', icon: 'ri-fire-line' },
                { label: 'Score Expertise', color: '#0A66C2', icon: 'ri-award-line' },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1.5 text-[10px] font-bold text-foreground-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />{s.label}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              {data.trends.map((trend: StrategicTrend) => (
                <div key={trend.trendId} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${PRIORITY_COLORS[trend.priority]}15`, color: PRIORITY_COLORS[trend.priority] }}>
                        {trend.priority.toUpperCase()}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background-100 text-foreground-500">{trend.category}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{trend.keyword}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-foreground-400">
                        <span><i className={trendIcon(trend.trend) + ' mr-0.5'} style={{ color: TREND_COLORS[trend.trend] }} />{trend.volume.toLocaleString()} recherches</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        {[
                          { val: trend.seoScore, color: '#86BC25' },
                          { val: trend.geoScore, color: '#C2410C' },
                          { val: trend.viralityScore, color: '#FF0000' },
                          { val: trend.expertiseScore, color: '#0A66C2' },
                        ].map((score, i) => (
                          <div key={i} className="text-center">
                            <span className="block text-sm font-bold text-foreground-950">{score.val}</span>
                            <div className="w-10 h-1 rounded-full mt-0.5 mx-auto" style={{ backgroundColor: `${score.color}30` }}>
                              <div className="h-full rounded-full" style={{ width: `${score.val}%`, backgroundColor: score.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 2 — SCRIPTS ═══════════════ */}
      {activeTab === 'scripts' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
                <h2 className="font-heading text-2xl font-bold text-foreground-950">Workflow 2 — Génération des Scripts</h2>
                {data.sseScriptCount > 0 && (
                  <button
                    onClick={() => setFilterSSE(!filterSSE)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                      filterSSE
                        ? 'bg-red-600 text-white'
                        : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
                    }`}
                  >
                    <i className="ri-youtube-fill" />
                    SSE Big Four 90+
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filterSSE ? 'bg-white/20' : 'bg-red-100'}`}>
                      {data.sseScriptCount}
                    </span>
                    {filterSSE && <i className="ri-close-line text-sm" />}
                  </button>
                )}
              </div>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Production automatique de scripts selon le framework KHEPRA Big Four. 5 formats : Podcasts, Capsules, Formations, Analyses, Interviews Simulées. Ton institutionnel, référencement SEO/GEO avancé, structure pédagogique.
                {filterSSE && <span className="block mt-1 text-red-600 font-bold">Filtre actif : Scripts générés depuis le Social Selling Engine (articles approuvés ≥ 90/100).</span>}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScripts.map((script: ScriptGeneration) => {
                const isSSE = (script as Record<string, unknown>).sseGenerated === true;
                const sseGlobalScore = (script as Record<string, unknown>).sseGlobalScore as number | undefined;

                return (
                <div key={script.scriptId} className={`rounded-xl border-2 p-5 hover:shadow-md transition-all ${isSSE ? 'bg-red-50/30 border-red-200 hover:border-red-300' : 'bg-background-50 border-background-200/70 hover:border-foreground-200'}`}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {isSSE && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold whitespace-nowrap">
                        <i className="ri-shield-check-line text-[10px]" />
                        BIG FOUR 90+
                        {sseGlobalScore && <span className="text-[9px] opacity-80">{sseGlobalScore}/100</span>}
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${WF_COLORS.creation}15`, color: WF_COLORS.creation }}>
                      {script.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[script.status]}15`, color: STAGE_COLORS[script.status] }}>
                      {script.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2 line-clamp-2">{script.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400 mb-2">
                    <span><i className="ri-time-line mr-1" />{script.duration}</span>
                    <span><i className="ri-quill-pen-line mr-1" />{script.tone}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {script.seoKeywords.slice(0, 4).map((kw) => (
                      <span key={kw} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500">{kw}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-foreground-400"><i className="ri-link mr-1" />{script.references} sources</span>
                    <span className="text-sm font-bold" style={{ color: script.qualityScore >= 9 ? '#059669' : script.qualityScore >= 8 ? '#CA8A04' : '#DC2626' }}>{script.qualityScore.toFixed(1)}/10</span>
                  </div>
                </div>
                );
              })}
            </div>

            {filterSSE && filteredScripts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
                  <i className="ri-youtube-line text-red-400 text-2xl" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Aucun script SSE pour le moment</h3>
                <p className="text-foreground-500 text-sm mb-6 max-w-lg mx-auto">
                  Les articles approuvés du Social Selling Engine (score ≥ 90/100) sont automatiquement convertis en scripts vidéo YouTube. Aucun article n'est actuellement approuvé.
                </p>
                <Link
                  to="/kos-linkedin-social-selling-engine"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 transition-all cursor-pointer whitespace-nowrap text-sm"
                >
                  <i className="ri-shield-check-line" />
                  Accéder au Social Selling Engine
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 3 — VOIX IA ═══════════════ */}
      {activeTab === 'voix' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 3 — Génération Voix IA</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Voice AI Studio KHEPRA EXPERTS. 6 profils vocaux calibrés. Pipeline : Génération → Correction → Normalisation → Export. 4 contrôles qualité automatiques.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.voices.map((voice: VoiceGeneration) => (
                <div key={voice.voiceId} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:border-foreground-200 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: voice.status === 'exported' ? '#D1FAE5' : '#FEF3C7' }}>
                      <i className="ri-mic-line text-xl" style={{ color: voice.status === 'exported' ? '#059669' : '#CA8A04' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[voice.status]}15`, color: STAGE_COLORS[voice.status] }}>
                          {voice.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-foreground-400">{voice.language}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground-950 mb-1">{voice.title}</h3>
                      <p className="text-xs text-foreground-500 mb-2">{voice.voiceProfile} · {voice.duration}</p>
                      {/* Quality Gauges */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: 'Fluidité', val: voice.qualityChecks.fluidity },
                          { label: 'Clarté', val: voice.qualityChecks.clarity },
                          { label: 'Débit', val: voice.qualityChecks.rate },
                          { label: 'Intellig.', val: voice.qualityChecks.intelligibility },
                        ].map((q, i) => (
                          <div key={i} className="text-center">
                            <div className="w-10 h-10 mx-auto rounded-full border-2 flex items-center justify-center mb-1" style={{ borderColor: q.val >= 95 ? '#059669' : q.val >= 90 ? '#CA8A04' : '#DC2626' }}>
                              <span className="text-[10px] font-bold text-foreground-700">{q.val}</span>
                            </div>
                            <span className="text-[9px] text-foreground-400">{q.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs font-bold text-foreground-950">Score Global : {voice.overallScore}/100</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 4 — PRODUCTION VIDÉO ═══════════════ */}
      {activeTab === 'video' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 4 — Production Vidéo</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Remotion + Chromium Headless + FFmpeg. Animations automatiques, génériques, transitions, infographies, sous-titres, habillage KHEPRA EXPERTS. Export multi-résolution.
              </p>
            </div>

            <div className="space-y-3">
              {data.videos.map((video: VideoProduction) => {
                const isExpanded = expandedVideo === video.videoId;
                return (
                  <div key={video.videoId} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedVideo(isExpanded ? null : video.videoId)}
                      className="w-full p-4 flex items-start gap-4 text-left cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${WF_COLORS.production}15` }}>
                        <i className="ri-movie-line text-xl" style={{ color: WF_COLORS.production }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[video.exportStatus]}15`, color: STAGE_COLORS[video.exportStatus] }}>
                            {video.exportStatus.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-[10px] text-foreground-400">{video.template}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground-950">{video.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                          <span>{video.duration}</span>
                          <span>{video.resolution}</span>
                          {video.thumbnailGenerated && <span className="text-emerald-500"><i className="ri-image-line mr-0.5" />Miniature</span>}
                          {video.subtitlesGenerated && <span className="text-emerald-500"><i className="ri-closed-captioning-line mr-0.5" />Sous-titres</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {video.qualityScore > 0 && (
                          <span className="text-sm font-bold" style={{ color: video.qualityScore >= 9 ? '#059669' : '#CA8A04' }}>{video.qualityScore}/10</span>
                        )}
                        <i className={expandIcon(isExpanded) + ' text-foreground-400'} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <h4 className="text-xs font-bold text-foreground-500 uppercase tracking-wider mb-2">Composants</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {video.components.map((comp, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-background-100 text-foreground-600">{comp}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-3 mt-3 text-xs">
                          <div><span className="text-foreground-400">Template</span><p className="font-bold text-foreground-700">{video.template}</p></div>
                          <div><span className="text-foreground-400">Résolution cible</span><p className="font-bold text-foreground-700">{video.resolution}</p></div>
                          <div><span className="text-foreground-400">Miniature</span><p className={`font-bold ${video.thumbnailGenerated ? 'text-emerald-600' : 'text-foreground-500'}`}>{video.thumbnailGenerated ? 'Générée' : 'En attente'}</p></div>
                          <div><span className="text-foreground-400">Sous-titres</span><p className={`font-bold ${video.subtitlesGenerated ? 'text-emerald-600' : 'text-foreground-500'}`}>{video.subtitlesGenerated ? 'Générés' : 'En attente'}</p></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 5 — SEO YOUTUBE ═══════════════ */}
      {activeTab === 'seo' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 5 — Génération SEO YouTube</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Création automatique des métadonnées YouTube : titre optimisé, description SEO, hashtags, mots-clés, chapitres horodatés. Optimisation CTR, watch time, engagement et référencement.
              </p>
            </div>

            <div className="space-y-4">
              {data.seoItems.map((seo: YoutubeSEO) => {
                const isExpanded = expandedSeo === seo.seoId;
                return (
                  <div key={seo.seoId} className={`rounded-xl border transition-all bg-background-50 ${isExpanded ? 'border-foreground-300' : 'border-background-200/70 hover:border-foreground-200'}`}>
                    <button
                      onClick={() => setExpandedSeo(isExpanded ? null : seo.seoId)}
                      className="w-full p-4 text-left cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${WF_COLORS.distribution}15` }}>
                          <i className="ri-search-eye-line text-lg" style={{ color: WF_COLORS.distribution }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[seo.status]}15`, color: STAGE_COLORS[seo.status] }}>
                              {seo.status.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-foreground-950 line-clamp-1">{seo.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-foreground-400">
                            <span>CTR prévu : <strong className="text-emerald-600">{seo.ctrPrediction}%</strong></span>
                            <span>Watch Time : <strong>{seo.watchTimePrediction}</strong></span>
                            <span>Engagement : <strong className="text-accent-700">{seo.engagementPrediction}/10</strong></span>
                          </div>
                        </div>
                        <i className={expandIcon(isExpanded) + ' text-foreground-400 flex-shrink-0'} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-background-200/70 pt-4 animate-fade-in">
                        <div className="mb-3">
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Description SEO</span>
                          <p className="text-xs text-foreground-600 mt-1 leading-relaxed">{seo.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Hashtags</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {seo.hashtags.map((h, i) => (
                                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent-100 text-accent-700">{h}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Chapitres</span>
                            <div className="space-y-0.5 mt-1">
                              {seo.chapters.map((ch, i) => (
                                <div key={i} className="text-[10px] text-foreground-600 flex gap-2">
                                  <span className="font-bold text-foreground-400 w-10 flex-shrink-0">{ch.time}</span>
                                  <span>{ch.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-[10px] font-bold text-foreground-500 uppercase tracking-wider">Mots-clés</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {seo.keywords.map((kw, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-600">{kw}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 6 — PUBLICATION ═══════════════ */}
      {activeTab === 'publication' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 6 — Publication YouTube</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                OAuth 2.0 + YouTube Data API v3. Upload automatique, programmation, classement playlists, écran de fin, fiches interactives, commentaires épinglés optimisés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.publications.map((pub: YoutubePublication) => (
                <div key={pub.publicationId} className="rounded-xl bg-background-50 border border-background-200/70 p-5 hover:border-foreground-200 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${pub.status === 'published' ? 'bg-emerald-500' : pub.status === 'processing' ? 'bg-blue-500 animate-pulse' : pub.status === 'failed' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[pub.status]}15`, color: STAGE_COLORS[pub.status] }}>
                      {pub.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-foreground-400">{pub.privacyStatus === 'public' ? '🌍 Public' : pub.privacyStatus === 'unlisted' ? '🔗 Non répertoriée' : '🔒 Privée'}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground-950 mb-2">{pub.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-400 mb-2">
                    <span><i className="ri-calendar-line mr-1" />{new Date(pub.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    <span><i className="ri-play-list-line mr-1" />{pub.playlistName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    {pub.endScreen && <span className="text-emerald-500"><i className="ri-check-line mr-0.5" />Écran de fin</span>}
                    <span className="text-accent-700"><i className="ri-file-copy-line mr-0.5" />{pub.cards} fiches</span>
                    <span className="text-emerald-500"><i className="ri-chat-quote-line mr-0.5" />Commentaire épinglé</span>
                  </div>
                  {pub.status === 'published' && (
                    <div className="mt-3 p-3 rounded-lg bg-background-100">
                      <p className="text-[10px] text-foreground-500 leading-relaxed whitespace-pre-wrap">{pub.pinnedComment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 7 — ANALYTICS ═══════════════ */}
      {activeTab === 'analytics' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl font-bold text-foreground-950">Workflow 7 — Analytics</h2>
                {data.liveAnalyticsLoading ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />Connexion live...
                  </span>
                ) : data.liveAnalytics?.success ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {data.liveAnalytics.channel?.name || 'KHEPRA EXPERTS'} — Connecté
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-background-100 text-foreground-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground-400" />Données mock
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Récupération automatique quotidienne : vues, CTR, watch time, abonnés, engagement, RPM. Calcul des 4 scores : Performance, SEO, GEO, Autorité.
              </p>
            </div>

            {/* Analytics Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
              {[
                { label: 'Vues Totales', value: data.channelStats.totalViews.toLocaleString(), color: '#86BC25' },
                { label: 'Watch Time', value: data.channelStats.totalWatchTime, color: '#C2410C' },
                { label: 'Abonnés', value: data.channelStats.subscribers.toLocaleString(), color: '#FF0000' },
                { label: '+30 jours', value: `+${data.channelStats.subscribersGrowth30d}`, color: '#059669' },
                { label: 'CTR Moyen', value: `${data.channelStats.avgCTR}%`, color: '#0A66C2' },
                { label: 'Engagement', value: `${data.channelStats.avgEngagement}/10`, color: '#D97757' },
                { label: 'RPM Moyen', value: `${data.channelStats.avgRPM}€`, color: '#CA8A04' },
                { label: 'Autorité', value: `${data.channelStats.brandAuthorityScore}/100`, color: '#6B7280' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                  <span className="block text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] text-foreground-400">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Per-Video Analytics Table */}
            <div className="overflow-x-auto rounded-xl border border-background-200/70">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-background-100 border-b border-background-200">
                    <th className="text-left py-3 px-4 text-foreground-500 font-semibold uppercase tracking-wider">Vidéo</th>
                    <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Vues</th>
                    <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">CTR</th>
                    <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Watch Time</th>
                    <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Abonnés</th>
                    <th className="text-right py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">RPM</th>
                    <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Perf.</th>
                    <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">SEO</th>
                    <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">GEO</th>
                    <th className="text-center py-3 px-3 text-foreground-500 font-semibold uppercase tracking-wider">Autorité</th>
                  </tr>
                </thead>
                <tbody>
                  {data.analytics.map((ana: VideoAnalytics) => (
                    <tr key={ana.analyticsId} className="border-b border-background-100 hover:bg-background-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-xs font-bold text-foreground-950 line-clamp-1">{ana.title}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-foreground-700">{ana.views.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold" style={{ color: ana.ctr >= 9 ? '#059669' : ana.ctr >= 7 ? '#CA8A04' : '#DC2626' }}>{ana.ctr}%</td>
                      <td className="py-3 px-3 text-right text-foreground-600">{ana.watchTime}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">+{ana.subscribersGained}</td>
                      <td className="py-3 px-3 text-right text-foreground-600">{ana.rpm}€</td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: ana.performanceScore >= 90 ? '#D1FAE5' : ana.performanceScore >= 75 ? '#FEF3C7' : '#FEE2E2', color: ana.performanceScore >= 90 ? '#059669' : ana.performanceScore >= 75 ? '#CA8A04' : '#DC2626' }}>{ana.performanceScore}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: ana.seoScore >= 90 ? '#D1FAE5' : ana.seoScore >= 75 ? '#FEF3C7' : '#FEE2E2', color: ana.seoScore >= 90 ? '#059669' : ana.seoScore >= 75 ? '#CA8A04' : '#DC2626' }}>{ana.seoScore}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: ana.geoScore >= 85 ? '#D1FAE5' : ana.geoScore >= 70 ? '#FEF3C7' : '#FEE2E2', color: ana.geoScore >= 85 ? '#059669' : ana.geoScore >= 70 ? '#CA8A04' : '#DC2626' }}>{ana.geoScore}</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: ana.authorityScore >= 85 ? '#D1FAE5' : ana.authorityScore >= 70 ? '#FEF3C7' : '#FEE2E2', color: ana.authorityScore >= 85 ? '#059669' : ana.authorityScore >= 70 ? '#CA8A04' : '#DC2626' }}>{ana.authorityScore}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ WORKFLOW 8 — OPTIMISATION CONTINUE ═══════════════ */}
      {activeTab === 'optimisation' && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Workflow 8 — Optimisation Continue</h2>
              <p className="text-sm text-foreground-500 max-w-3xl">
                Détection automatique des sujets performants/faibles, opportunités émergentes, nouveaux mots-clés. Déclenchement automatique de nouveaux scripts, vidéos et séries pour maximiser la croissance.
              </p>
            </div>

            <div className="space-y-3">
              {data.optimizations.map((opt: OptimizationAction) => (
                <div key={opt.actionId} className="rounded-xl bg-background-50 border border-background-200/70 p-4 hover:border-foreground-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${WF_COLORS.optimization}15` }}>
                      <i className={`${opt.automated ? 'ri-robot-line' : 'ri-user-line'} text-lg`} style={{ color: WF_COLORS.optimization }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STAGE_COLORS[opt.status]}15`, color: STAGE_COLORS[opt.status] }}>
                          {opt.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-bold text-foreground-400">{opt.trigger}</span>
                        {opt.automated && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">🤖 Auto</span>}
                      </div>
                      <div className="space-y-1.5 mt-2">
                        <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-foreground-500 w-20 flex-shrink-0">Détection :</span>
                          <span className="text-xs text-foreground-600">{opt.detection}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-foreground-500 w-20 flex-shrink-0">Action :</span>
                          <span className="text-xs text-foreground-700 font-bold">{opt.action}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-foreground-500 w-20 flex-shrink-0">Impact :</span>
                          <span className="text-xs text-emerald-600">{opt.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Écosystème YouTube KOS — Production Autonome</h2>
              <p className="text-gray-400 text-sm">
                Infrastructure (Master Prompt 1) + Production Pipeline (Master Prompt 2) = Chaîne YouTube 100% autonome. 8 workflows, 94.2% automatisation, 3.4 vidéos/semaine.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-youtube-autonomous-infrastructure" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-server-line" />Infrastructure (MP1)
              </Link>
              <Link to="/kos-linkedin-social-selling-engine" className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#DC2626' }}>
                <i className="ri-shield-check-line" />Social Selling Engine
              </Link>
              <Link to="/youtube-connect" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] cursor-pointer whitespace-nowrap">
                <i className="ri-youtube-fill" />YouTube Connect
              </Link>
              <Link to="/kos-youtube-analytics" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <i className="ri-line-chart-line" />YouTube Analytics
              </Link>
              <Link to="/kos-voice-ai-studio" className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}>
                <i className="ri-mic-line" />Voice AI Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Live Notification */}
      <PublicationLiveNotification events={data.publicationEvents} />
    </KOSHubLayout>
  );
}