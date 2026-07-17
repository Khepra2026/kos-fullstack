import { useMemo, useCallback, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  SYSTEM_OVERVIEW,
  EXECUTIVE_KPIS,
  PIPELINE_DATA,
  ACTIVE_MISSIONS,
  CRITICAL_ALERTS,
  AGENT_PERFORMANCE,
  COMMAND_DIMENSIONS,
  MEDIA_FACTORIES,
  COMPLIANCE_SUMMARY,
  SYSTEM_HEALTH,
  COMMANDER_INTENT,
} from '@/mocks/kosUltimateCockpit';
import type {
  ExecutiveKPI,
  PipelineEntry,
  ActiveMission,
  CriticalAlert,
  AgentScore,
  CommandDimensionSummary,
  MediaFactorySummary,
} from '@/mocks/kosUltimateCockpit';

export function useKOSUltimateCockpit() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const { data } = await supabase.from('executive_dashboards').select('id').limit(1);
        if (!cancelled && data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
    }
    check();
    return () => { cancelled = true; };
  }, []);

  const system = SYSTEM_OVERVIEW;
  const kpis = EXECUTIVE_KPIS;
  const pipeline = PIPELINE_DATA;
  const missions = ACTIVE_MISSIONS;
  const alerts = CRITICAL_ALERTS;
  const agents = AGENT_PERFORMANCE;
  const dimensions = COMMAND_DIMENSIONS;
  const mediaFactories = MEDIA_FACTORIES;
  const compliance = COMPLIANCE_SUMMARY;
  const health = SYSTEM_HEALTH;
  const intent = COMMANDER_INTENT;

  const compliantDimensions = useMemo(() => dimensions.filter(d => d.status === 'conforme'), [dimensions]);
  const surveillanceDimensions = useMemo(() => dimensions.filter(d => d.status === 'surveillance'), [dimensions]);
  const actionDimensions = useMemo(() => dimensions.filter(d => d.status === 'action'), [dimensions]);

  const criticalAlertsList = useMemo(() => alerts.filter(a => a.niveau === 'ROUGE'), [alerts]);
  const highAlertsList = useMemo(() => alerts.filter(a => a.niveau === 'ORANGE'), [alerts]);

  const operationalFactories = useMemo(() => mediaFactories.filter(f => f.status === 'operational'), [mediaFactories]);

  const factoryAverageHealth = useMemo(() =>
    Math.round(mediaFactories.reduce((s, f) => s + f.healthScore, 0) / mediaFactories.length),
  [mediaFactories]);

  const factoryAverageAutomation = useMemo(() =>
    Math.round(mediaFactories.reduce((s, f) => s + f.automationRate, 0) / mediaFactories.length),
  [mediaFactories]);

  const missionsEnRetard = useMemo(() => missions.filter(m => m.statut === 'En retard'), [missions]);

  const avgAgentScore = useMemo(() =>
    Math.round(agents.reduce((s, a) => s + a.score, 0) / agents.length),
  [agents]);

  const getMissionById = useCallback((id: string): ActiveMission | undefined =>
    missions.find(m => m.id === id), [missions]);

  const getFactoryByHub = useCallback((hubNumber: number): MediaFactorySummary | undefined =>
    mediaFactories.find(f => f.hubNumber === hubNumber), [mediaFactories]);

  const getDimensionById = useCallback((id: string): CommandDimensionSummary | undefined =>
    dimensions.find(d => d.id === id), [dimensions]);

  const alertsByNiveau = useMemo(() => ({
    ROUGE: alerts.filter(a => a.niveau === 'ROUGE').length,
    ORANGE: alerts.filter(a => a.niveau === 'ORANGE').length,
    JAUNE: alerts.filter(a => a.niveau === 'JAUNE').length,
  }), [alerts]);

  return {
    system,
    kpis,
    pipeline,
    missions,
    alerts,
    agents,
    dimensions,
    mediaFactories,
    compliance,
    health,
    intent,
    isLive,
    compliantDimensions,
    surveillanceDimensions,
    actionDimensions,
    criticalAlertsList,
    highAlertsList,
    operationalFactories,
    factoryAverageHealth,
    factoryAverageAutomation,
    missionsEnRetard,
    avgAgentScore,
    getMissionById,
    getFactoryByHub,
    getDimensionById,
    alertsByNiveau,
  };
}