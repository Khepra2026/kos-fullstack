import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_ENGINES as mockEngines,
  KOS_UNIFIED_AGENTS as mockAgents,
  SYSTEM_HEALTH as mockHealth,
  RESOURCE_OPTIMIZATIONS as mockOptimizations,
  DEPLOYMENT_ACTIONS as mockDeployments,
} from '@/mocks/kosResourceCommandCenter';
import type {
  KOSEngineResource,
  KOSUnifiedAgent,
  KOSSystemHealth,
  ResourceOptimization,
  DeploymentAction,
} from '@/mocks/kosResourceCommandCenter';

export type {
  KOSEngineResource,
  KOSUnifiedAgent,
  KOSSystemHealth,
  ResourceOptimization,
  DeploymentAction,
};

export interface ResourceCommandCenterData {
  engines: KOSEngineResource[];
  agents: KOSUnifiedAgent[];
  health: KOSSystemHealth | null;
  optimizations: ResourceOptimization[];
  deployments: DeploymentAction[];
  isLive: boolean;
}

function mapEngine(row: Record<string, unknown>): KOSEngineResource {
  return {
    id: row.id as string,
    name: row.name as string,
    path: row.path as string,
    icon: row.icon as string,
    color: row.color as string,
    agentsCount: Number(row.agents_count),
    activeAgents: Number(row.active_agents),
    partialAgents: Number(row.partial_agents),
    gapAgents: Number(row.gap_agents),
    cpuUsage: Number(row.cpu_usage),
    memoryUsage: Number(row.memory_usage),
    lastScan: row.last_scan as string,
    status: row.status as 'healthy' | 'degraded' | 'critical',
  };
}

function mapAgent(row: Record<string, unknown>): KOSUnifiedAgent {
  return {
    id: row.id as string,
    name: row.name as string,
    engine: row.engine as string,
    engineName: row.engine_name as string,
    layer: row.layer as string,
    number: row.number as string,
    mission: row.mission as string,
    icon: row.icon as string,
    color: row.color as string,
    status: row.status as 'active' | 'partial' | 'gap',
    score: Number(row.score),
    lastScan: row.last_scan as string,
    resourceUsage: (row.resource_usage as { cpu: number; memory: number; queries: number; uptime: number }) || { cpu: 0, memory: 0, queries: 0, uptime: 100 },
    kpis: (row.kpis as KOSUnifiedAgent['kpis']) || [],
    deploymentVersion: row.deployment_version as string,
    charter: row.charter as string | null,
    autoDeploy: Boolean(row.auto_deploy),
    alerts: (row.alerts as KOSUnifiedAgent['alerts']) || [],
  };
}

function mapHealth(row: Record<string, unknown>): KOSSystemHealth {
  return {
    generatedAt: row.generated_at as string,
    totalAgents: Number(row.total_agents),
    activeAgents: Number(row.active_agents),
    partialAgents: Number(row.partial_agents),
    gapAgents: Number(row.gap_agents),
    totalEngines: Number(row.total_engines),
    healthyEngines: Number(row.healthy_engines),
    degradedEngines: Number(row.degraded_engines),
    criticalEngines: Number(row.critical_engines),
    globalCpuUsage: Number(row.global_cpu_usage),
    globalMemoryUsage: Number(row.global_memory_usage),
    totalQueries24h: Number(row.total_queries_24h),
    avgResponseTime: Number(row.avg_response_time),
    globalScore: Number(row.global_score),
    targetScore: Number(row.target_score),
    autoDeployEnabled: Number(row.auto_deploy_enabled),
    autoDeployDisabled: Number(row.auto_deploy_disabled),
    alertsActive: Number(row.alerts_active),
    alertsCritical: Number(row.alerts_critical),
  };
}

function mapOptimization(row: Record<string, unknown>): ResourceOptimization {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    impact: row.impact as 'high' | 'medium' | 'low',
    agentsAffected: (row.agents_affected as string[]) || [],
    estimatedGain: row.estimated_gain as string,
    action: row.action as string,
    icon: row.icon as string,
    color: row.color as string,
  };
}

function mapDeployment(row: Record<string, unknown>): DeploymentAction {
  return {
    id: row.id as string,
    agentId: row.agent_id as string,
    agentName: row.agent_name as string,
    action: row.action as 'activate' | 'optimize' | 'update' | 'patch',
    priority: row.priority as 'critical' | 'major' | 'minor',
    description: row.description as string,
    estimatedTime: row.estimated_time as string,
    autoApplicable: Boolean(row.auto_applicable),
    applied: Boolean(row.applied),
  };
}

export function useResourceCommandCenter() {
  const [data, setData] = useState<ResourceCommandCenterData>({
    engines: [],
    agents: [],
    health: null,
    optimizations: [],
    deployments: [],
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [enginesRes, agentsRes, healthRes, optsRes, depsRes] = await Promise.all([
        supabase.from('kos_resource_engines').select('*').order('id'),
        supabase.from('kos_resource_agents').select('*').order('id'),
        supabase.from('kos_resource_health').select('*').order('generated_at', { ascending: false }).limit(1),
        supabase.from('kos_resource_optimizations').select('*').order('id'),
        supabase.from('kos_resource_deployments').select('*').order('id'),
      ]);

      if (enginesRes.error) throw enginesRes.error;
      if (agentsRes.error) throw agentsRes.error;
      if (healthRes.error) throw healthRes.error;
      if (optsRes.error) throw optsRes.error;
      if (depsRes.error) throw depsRes.error;

      const hasData = (enginesRes.data && enginesRes.data.length > 0) ||
        (agentsRes.data && agentsRes.data.length > 0);

      setData({
        engines: (enginesRes.data as Record<string, unknown>[])?.map(mapEngine) || [],
        agents: (agentsRes.data as Record<string, unknown>[])?.map(mapAgent) || [],
        health: (healthRes.data as Record<string, unknown>[])?.length
          ? mapHealth((healthRes.data as Record<string, unknown>[])[0])
          : null,
        optimizations: (optsRes.data as Record<string, unknown>[])?.map(mapOptimization) || [],
        deployments: (depsRes.data as Record<string, unknown>[])?.map(mapDeployment) || [],
        isLive: hasData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        engines: mockEngines,
        agents: mockAgents,
        health: mockHealth,
        optimizations: mockOptimizations,
        deployments: mockDeployments,
        isLive: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, refetch: fetchData };
}