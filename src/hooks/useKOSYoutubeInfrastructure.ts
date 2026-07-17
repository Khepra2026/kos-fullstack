import { useState, useEffect, useCallback } from 'react';
import {
  WORKFLOWS, CONTENT_PIPELINE, YOUTUBE_AGENTS, SECURITY_EVENTS,
  INFRA_METRICS, INFRA_GLOBAL_STATS, DB_SCHEMAS,
  AUTOMATION_LAYER, VIDEO_PRODUCTION_LAYER, AI_AUDIO_LAYER,
  STORAGE_LAYER, SECURITY_LAYER, ARCHITECTURE_DIAGRAM,
  type YoutubeWorkflow, type ContentPipelineItem, type YoutubeAgent,
  type SecurityEvent, type InfrastructureMetric, type DbTableSchema,
} from '@/mocks/kosYoutubeAutonomousInfrastructure';
import { supabase } from '@/lib/supabase';
import type { HealthCheck } from '@/hooks/useOrchestratorTypes';

export interface YoutubeInfrastructureData {
  workflows: YoutubeWorkflow[];
  contentPipeline: ContentPipelineItem[];
  agents: YoutubeAgent[];
  securityEvents: SecurityEvent[];
  infraMetrics: InfrastructureMetric[];
  globalStats: typeof INFRA_GLOBAL_STATS;
  dbSchemas: DbTableSchema[];
  automationLayer: typeof AUTOMATION_LAYER;
  videoProductionLayer: typeof VIDEO_PRODUCTION_LAYER;
  aiAudioLayer: typeof AI_AUDIO_LAYER;
  storageLayer: typeof STORAGE_LAYER;
  securityLayer: typeof SECURITY_LAYER;
  architectureDiagram: typeof ARCHITECTURE_DIAGRAM;
  // Real-time health from orchestrator
  realHealthChecks: HealthCheck[];
  healthCheckStatus: 'connected' | 'cold_start' | 'loading';
  oauthConnected: boolean;
  loading: boolean;
  error: string | null;
}

export function useKOSYoutubeInfrastructure(): YoutubeInfrastructureData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realHealthChecks, setRealHealthChecks] = useState<HealthCheck[]>([]);
  const [healthCheckStatus, setHealthCheckStatus] = useState<'connected' | 'cold_start' | 'loading'>('loading');
  const [oauthConnected, setOauthConnected] = useState(false);

  const loadRealData = useCallback(async () => {
    try {
      // Check OAuth status
      const { data: statusData } = await supabase.functions.invoke('kos-youtube-master', {
        body: { action: 'status' },
      });
      setOauthConnected(!!statusData?.connected);

      // Fetch orchestrator health checks
      const { data: healthData } = await supabase.functions.invoke('kos-orchestrator-engine', {
        body: { action: 'run_health_checks' },
      });
      if (healthData?.checks) {
        setRealHealthChecks(healthData.checks as HealthCheck[]);
        setHealthCheckStatus('connected');
      } else {
        setHealthCheckStatus('cold_start');
      }
    } catch {
      setHealthCheckStatus('cold_start');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRealData();
  }, [loadRealData]);

  return {
    workflows: WORKFLOWS,
    contentPipeline: CONTENT_PIPELINE,
    agents: YOUTUBE_AGENTS,
    securityEvents: SECURITY_EVENTS,
    infraMetrics: INFRA_METRICS,
    globalStats: INFRA_GLOBAL_STATS,
    dbSchemas: DB_SCHEMAS,
    automationLayer: AUTOMATION_LAYER,
    videoProductionLayer: VIDEO_PRODUCTION_LAYER,
    aiAudioLayer: AI_AUDIO_LAYER,
    storageLayer: STORAGE_LAYER,
    securityLayer: SECURITY_LAYER,
    architectureDiagram: ARCHITECTURE_DIAGRAM,
    realHealthChecks,
    healthCheckStatus,
    oauthConnected,
    loading,
    error,
  };
}