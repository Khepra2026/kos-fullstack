import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_HUB_REGISTRY,
  KOS_UNIFIED_GLOBAL_STATE,
  KOS_CROSS_SYSTEM_ALERTS,
  KOS_SYSTEM_LINKS,
  KOS_RESOURCE_ALLOCATIONS,
  KOS_COMMANDERS_FINAL_INTENT,
  KOS_SYSTEM_HEALTH_HISTORY,
} from '@/mocks/kosFinalOrchestration';
import type { KOSHubRegistryEntry, KOSUnifiedGlobalState, KOSCrossSystemAlert, KOSSystemLink, KOSResourceAllocation } from '@/mocks/kosFinalOrchestration';

export function useKOSFinalOrchestration() {
  const [hubs, setHubs] = useState<KOSHubRegistryEntry[]>([]);
  const [globalState, setGlobalState] = useState<KOSUnifiedGlobalState | null>(null);
  const [crossAlerts, setCrossAlerts] = useState<KOSCrossSystemAlert[]>([]);
  const [systemLinks, setSystemLinks] = useState<KOSSystemLink[]>([]);
  const [resources, setResources] = useState<KOSResourceAllocation[]>([]);
  const [commandersIntent, setCommandersIntent] = useState(KOS_COMMANDERS_FINAL_INTENT);
  const [healthHistory, setHealthHistory] = useState(KOS_SYSTEM_HEALTH_HISTORY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock'>('mock');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadMockData = useCallback(() => {
    setHubs(KOS_HUB_REGISTRY);
    setGlobalState(KOS_UNIFIED_GLOBAL_STATE);
    setCrossAlerts(KOS_CROSS_SYSTEM_ALERTS);
    setSystemLinks(KOS_SYSTEM_LINKS);
    setResources(KOS_RESOURCE_ALLOCATIONS);
    setCommandersIntent(KOS_COMMANDERS_FINAL_INTENT);
    setHealthHistory(KOS_SYSTEM_HEALTH_HISTORY);
    setDataSource('mock');
    setLastUpdated(new Date(KOS_UNIFIED_GLOBAL_STATE.generatedAt));
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: liveHubs, error: hubsErr } = await supabase
        .from('kos_automates')
        .select('*');
      if (!hubsErr && liveHubs && liveHubs.length > 0) {
        setDataSource('supabase');
      } else {
        loadMockData();
      }
    } catch {
      loadMockData();
    } finally {
      setLoading(false);
    }
  }, [loadMockData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  const globalStatus = globalState
    ? globalState.criticalHubs > 0 ? 'critical'
    : globalState.degradedHubs > 2 ? 'warning'
    : 'nominal'
    : 'nominal';

  const nominalCount = hubs.filter(h => h.status === 'nominal').length;
  const degradedCount = hubs.filter(h => h.status === 'degrade').length;
  const criticalCount = hubs.filter(h => h.status === 'critical').length;

  const totalCost = resources.reduce((sum, r) => sum + r.costMonthly, 0);
  const totalCPU = resources.reduce((sum, r) => sum + r.cpu, 0);
  const totalMemory = resources.reduce((sum, r) => sum + r.memory, 0);
  const totalAPICalls = resources.reduce((sum, r) => sum + r.apiCalls, 0);

  const openCriticalAlerts = crossAlerts.filter(a => a.severity === 'critical' && a.status === 'open').length;
  const openMajorAlerts = crossAlerts.filter(a => a.severity === 'major' && a.status === 'open').length;
  const brokenLinks = systemLinks.filter(l => l.status === 'broken').length;
  const degradedLinks = systemLinks.filter(l => l.status === 'degraded').length;

  return {
    hubs,
    globalState,
    crossAlerts,
    systemLinks,
    resources,
    commandersIntent,
    healthHistory,
    loading,
    error,
    dataSource,
    lastUpdated,
    refresh,
    globalStatus,
    nominalCount,
    degradedCount,
    criticalCount,
    totalCost,
    totalCPU,
    totalMemory,
    totalAPICalls,
    openCriticalAlerts,
    openMajorAlerts,
    brokenLinks,
    degradedLinks,
  };
}