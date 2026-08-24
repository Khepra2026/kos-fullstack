import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PIPELINE_WORKFLOWS, STRATEGIC_TRENDS, SCRIPT_GENERATIONS,
  VOICE_GENERATIONS, VIDEO_PRODUCTIONS, YOUTUBE_SEO_ITEMS,
  YOUTUBE_PUBLICATIONS, VIDEO_ANALYTICS, OPTIMIZATION_ACTIONS,
  PRODUCTION_KPIS, PIPELINE_LINE, CHANNEL_STATS,
  EDITORIAL_CALENDAR, VIDEO_COMPARISON_DATA, COMPARISON_PERIODS, COMPARISON_METRICS,
  LIVE_ANALYTICS_FALLBACK,
  PLAYLIST_SERIES, PUBLICATION_EVENTS,
  type PipelineWorkflow, type StrategicTrend, type ScriptGeneration,
  type VoiceGeneration, type VideoProduction, type YoutubeSEO,
  type YoutubePublication, type VideoAnalytics, type OptimizationAction,
  type EditorialCalendarEntry, type VideoComparisonMetric, type YoutubeAnalyticsResponse,
  type PlaylistSeries, type PublicationEvent,
} from '@/mocks/youtubeProductionPipeline';
import { generateSSEYouTubeScripts } from '@/utils/sSEToYouTubeBridge';
import { supabase } from '@/lib/supabase';
import type { OrchestratorKPI, PipelineState, PipelineEvent, HealthCheck, FailedJob } from '@/hooks/useOrchestratorTypes';

const YOUTUBE_API_KEY = import.meta.env.VITE_PUBLIC_YOUTUBE_API_KEY as string || '';

export interface YoutubeProductionPipelineData {
  workflows: PipelineWorkflow[];
  trends: StrategicTrend[];
  scripts: ScriptGeneration[];
  voices: VoiceGeneration[];
  videos: VideoProduction[];
  seoItems: YoutubeSEO[];
  publications: YoutubePublication[];
  analytics: VideoAnalytics[];
  optimizations: OptimizationAction[];
  editorialCalendar: EditorialCalendarEntry[];
  videoComparison: VideoComparisonMetric[];
  comparisonPeriods: typeof COMPARISON_PERIODS;
  comparisonMetrics: typeof COMPARISON_METRICS;
  kpis: typeof PRODUCTION_KPIS;
  pipelineLine: typeof PIPELINE_LINE;
  channelStats: typeof CHANNEL_STATS;
  playlists: PlaylistSeries[];
  publicationEvents: PublicationEvent[];
  liveAnalytics: YoutubeAnalyticsResponse | null;
  liveAnalyticsLoading: boolean;
  // KOS State Engine & Recovery Engine — données réelles
  orchestratorKpis: OrchestratorKPI | null;
  orchestratorStates: PipelineState[];
  orchestratorEvents: PipelineEvent[];
  orchestratorHealth: HealthCheck[];
  orchestratorFailedJobs: FailedJob[];
  // NEW: Real data flags
  realAnalyticsConnected: boolean;
  realPlaylistsConnected: boolean;
  realThumbnailsConnected: boolean;
  thumbnailABTests: Record<string, unknown>[] | null;
  // SSE Bridge
  sseScriptCount: number;
  sseApprovedArticlesCount: number;
  loading: boolean;
  error: string | null;
}

export function useKOSYoutubeProductionPipeline(): YoutubeProductionPipelineData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveAnalytics, setLiveAnalytics] = useState<YoutubeAnalyticsResponse | null>(null);
  const [liveAnalyticsLoading, setLiveAnalyticsLoading] = useState(false);
  const [realAnalyticsConnected, setRealAnalyticsConnected] = useState(false);
  const [realPlaylistsConnected, setRealPlaylistsConnected] = useState(false);
  const [realThumbnailsConnected, setRealThumbnailsConnected] = useState(false);
  const [thumbnailABTests, setThumbnailABTests] = useState<Record<string, unknown>[] | null>(null);

  const [orchestratorKpis, setOrchestratorKpis] = useState<OrchestratorKPI | null>(null);
  const [orchestratorStates, setOrchestratorStates] = useState<PipelineState[]>([]);
  const [orchestratorEvents, setOrchestratorEvents] = useState<PipelineEvent[]>([]);
  const [orchestratorHealth, setOrchestratorHealth] = useState<HealthCheck[]>([]);
  const [orchestratorFailedJobs, setOrchestratorFailedJobs] = useState<FailedJob[]>([]);

  const loadLiveAnalytics = useCallback(async () => {
    setLiveAnalyticsLoading(true);
    try {
      // PRIMARY: Real YouTube Publisher Engine — uses API Key for channel info
      const { data: channelData, error: channelError } = await supabase.functions.invoke('kos-youtube-master', {
        body: { action: 'channel_info', api_key: YOUTUBE_API_KEY },
      });

      if (!channelError && channelData?.api_key_valid && channelData?.channel) {
        setRealAnalyticsConnected(true);
        const ch = channelData.channel;
        const stats = ch.statistics || {};

        // Build live analytics from real channel data
        setLiveAnalytics({
          success: true,
          real_data: true,
          channel: {
            channelId: ch.channel_id || '',
            name: ch.title || 'KHEPRA EXPERTS',
            handle: ch.handle || '@KHEPRAEXPERTS',
          },
          period: '30d',
          summary: {
            totalViews: parseInt(stats.viewCount || '0', 10),
            totalWatchTime: 0,
            avgCTR: 0,
            avgWatchTime: 0,
            subscribersGained: 0,
            subscribersLost: 0,
            estimatedRevenue: 0,
            totalLikes: 0,
            totalComments: 0,
            totalShares: 0,
            subscriberCount: parseInt(stats.subscriberCount || '0', 10),
            videoCount: parseInt(stats.videoCount || '0', 10),
          },
          videos: [],
          topPerformers: [],
        });

        // Also fetch recent videos via search
        try {
          const { data: searchData } = await supabase.functions.invoke('kos-youtube-master', {
            body: {
              action: 'search',
              api_key: YOUTUBE_API_KEY,
              query: 'KHEPRA EXPERTS conformité réglementaire',
              max_results: 20,
              order: 'date',
            },
          });
          if (searchData?.videos) {
            setLiveAnalytics((prev) => prev ? { ...prev, videos: searchData.videos } : prev);
          }
        } catch { /* search fallback ok */ }

        return;
      }

      // FALLBACK: try kos-youtube-analytics (legacy)
      const { data: analyticsData, error: analyticsError } = await supabase.functions.invoke('kos-youtube-analytics', {
        body: { action: 'dashboard' },
      });
      if (!analyticsError && analyticsData?.real_data) {
        setRealAnalyticsConnected(true);
        if (analyticsData.videos && analyticsData.videos.length > 0) {
          setLiveAnalytics({
            success: true,
            channel: {
              channelId: 'UCjkq4dMhKIW1LbMNXYHjjLg',
              name: 'KHEPRA EXPERTS',
              handle: '@KHEPRAEXPERTS',
            },
            period: '30d',
            summary: {
              totalViews: analyticsData.summary?.views30d || 0,
              totalWatchTime: (analyticsData.summary?.watchTimeHours30d || 0) * 3600,
              avgCTR: 0,
              avgWatchTime: 0,
              subscribersGained: analyticsData.summary?.subscribersGained30d || 0,
              subscribersLost: analyticsData.summary?.subscribersLost30d || 0,
              estimatedRevenue: 0,
              totalLikes: analyticsData.summary?.likes30d || 0,
              totalComments: analyticsData.summary?.comments30d || 0,
              totalShares: analyticsData.summary?.shares30d || 0,
            },
            videos: analyticsData.videos || [],
            topPerformers: [],
          });
          return;
        }
      }

      // LAST RESORT: mock fallback
      setRealAnalyticsConnected(false);
      setLiveAnalytics(LIVE_ANALYTICS_FALLBACK);
    } catch {
      setLiveAnalytics(LIVE_ANALYTICS_FALLBACK);
    } finally {
      setLiveAnalyticsLoading(false);
    }
  }, []);

  const loadOrchestratorData = useCallback(async () => {
    try {
      const { data: kpiData } = await supabase.functions.invoke('kos-orchestrator-engine', { body: { action: 'kpis' } });
      if (kpiData) setOrchestratorKpis(kpiData as OrchestratorKPI);

      const { data: stateData } = await supabase.functions.invoke('kos-orchestrator-engine', { body: { action: 'pipeline_state', limit: 50 } });
      if (stateData?.states) setOrchestratorStates(stateData.states as PipelineState[]);

      const { data: eventData } = await supabase.functions.invoke('kos-orchestrator-engine', { body: { action: 'pipeline_events', limit: 100 } });
      if (eventData?.events) setOrchestratorEvents(eventData.events as PipelineEvent[]);

      const { data: healthData } = await supabase.functions.invoke('kos-orchestrator-engine', { body: { action: 'run_health_checks' } });
      if (healthData?.checks) setOrchestratorHealth(healthData.checks as HealthCheck[]);
    } catch { /* cold start */ }
  }, []);

  // Load playlist data — check if API key works via channel_info
  const loadPlaylists = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke('kos-youtube-master', {
        body: { action: 'channel_info', api_key: YOUTUBE_API_KEY },
      });
      if (data?.api_key_valid) setRealPlaylistsConnected(true);
    } catch { /* fallback mock */ }
  }, []);

  // Load thumbnail capabilities
  const loadThumbnailStatus = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke('kos-youtube-thumbnail', { body: { action: 'templates' } });
      if (data?.templates) setRealThumbnailsConnected(true);
    } catch { /* fallback */ }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadLiveAnalytics(),
        loadOrchestratorData(),
        loadPlaylists(),
        loadThumbnailStatus(),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [loadLiveAnalytics, loadOrchestratorData, loadPlaylists, loadThumbnailStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ═══════════════ SSE Bridge — Merge approved articles as YouTube scripts ═══════════════
  const sseScripts = useMemo(() => {
    const merged = generateSSEYouTubeScripts(SCRIPT_GENERATIONS);
    return merged;
  }, []);

  const allScripts = useMemo(() => {
    return [...sseScripts, ...SCRIPT_GENERATIONS];
  }, [sseScripts]);

  const sseApprovedArticlesCount = useMemo(() => {
    const sseIds = new Set(sseScripts.map((s) => (s as Record<string, unknown>).sseArticleId as string));
    return sseIds.size;
  }, [sseScripts]);

  return {
    workflows: PIPELINE_WORKFLOWS,
    trends: STRATEGIC_TRENDS,
    scripts: allScripts,
    voices: VOICE_GENERATIONS,
    videos: VIDEO_PRODUCTIONS,
    seoItems: YOUTUBE_SEO_ITEMS,
    publications: YOUTUBE_PUBLICATIONS,
    analytics: VIDEO_ANALYTICS,
    optimizations: OPTIMIZATION_ACTIONS,
    editorialCalendar: EDITORIAL_CALENDAR,
    videoComparison: VIDEO_COMPARISON_DATA,
    comparisonPeriods: COMPARISON_PERIODS,
    comparisonMetrics: COMPARISON_METRICS,
    kpis: PRODUCTION_KPIS,
    pipelineLine: PIPELINE_LINE,
    channelStats: CHANNEL_STATS,
    playlists: PLAYLIST_SERIES,
    publicationEvents: PUBLICATION_EVENTS,
    liveAnalytics,
    liveAnalyticsLoading,
    orchestratorKpis,
    orchestratorStates,
    orchestratorEvents,
    orchestratorHealth,
    orchestratorFailedJobs,
    realAnalyticsConnected,
    realPlaylistsConnected,
    realThumbnailsConnected,
    thumbnailABTests,
    sseScriptCount: sseScripts.length,
    sseApprovedArticlesCount,
    loading,
    error,
  };
}



