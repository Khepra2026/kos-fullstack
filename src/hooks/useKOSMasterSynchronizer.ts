import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_MASTER_FAMILIES as mockFamilies,
  KOS_MASTER_GLOBAL_KPIS as mockKPIs,
  KOS_KPO_DIMENSIONS as mockKPODims,
  KOS_GAP_ANALYSIS as mockGaps,
  KOS_MASTER_SYNC_LOGS as mockLogs,
  KOS_DEPLOYMENT_PLAN as mockPlan,
} from '@/mocks/kosMasterSynchronizer';
import type {
  KOSFamilySync,
  KOSMasterGlobalKPIs,
  KOSKPODimension,
  KOSGapAnalysis,
  KOSMasterSyncLog,
  KOSDeploymentPlan,
} from '@/mocks/kosMasterSynchronizer';

export type {
  KOSFamilySync,
  KOSMasterGlobalKPIs,
  KOSKPODimension,
  KOSGapAnalysis,
  KOSMasterSyncLog,
  KOSDeploymentPlan,
};

export interface KOSMasterSyncData {
  families: KOSFamilySync[];
  globalKPIs: KOSMasterGlobalKPIs;
  kpoDimensions: KOSKPODimension[];
  gapAnalysis: KOSGapAnalysis[];
  syncLogs: KOSMasterSyncLog[];
  deploymentPlan: KOSDeploymentPlan[];
  isLive: boolean;
}

const FAMILY_TABLES: { id: string; table: string }[] = [
  { id: 'referents-metiers', table: 'kos_referents_metiers_automates' },
  { id: 'commercial-marketing', table: 'kos_commercial_marketing_automates' },
  { id: 'organisation-qualite', table: 'kos_organisation_qualite_automates' },
  { id: 'blog-writing', table: 'kos_blog_writing_automates' },
  { id: 'fullstack-dev', table: 'kos_dev_automates' },
  { id: 'web-ops', table: 'kos_web_ops_automates' },
  { id: 'cyber-security', table: 'kos_cyber_security_automates' },
  { id: 'think-tank', table: 'kos_think_tank_automates' },
  { id: 'regulatory-compliance', table: 'kos_regulatory_compliance_automates' },
  { id: 'community-manager', table: 'kos_community_manager_automates' },
  { id: 'designer-infographe', table: 'kos_designer_infographe_automates' },
  { id: 'llm-experts', table: 'kos_llm_experts_automates' },
  { id: 'business-intelligence', table: 'kos_business_intelligence_automates' },
];

export function useKOSMasterSynchronizer() {
  const [data, setData] = useState<KOSMasterSyncData>({
    families: [],
    globalKPIs: mockKPIs,
    kpoDimensions: [],
    gapAnalysis: [],
    syncLogs: [],
    deploymentPlan: [],
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queries = FAMILY_TABLES.map(({ table }) =>
        supabase.from(table).select('*').then(r => ({ table, data: r.data, error: r.error })),
      );

      const results = await Promise.all(queries);
      const allFailed = results.every(r => r.error);

      if (allFailed) throw new Error('Toutes les requêtes Supabase ont échoué');

      const familyDataMap = new Map<string, { count: number; deployed: number; partial: number; critical: number; auto: number; tasks: number; successSum: number }>();

      FAMILY_TABLES.forEach(({ id }) => {
        familyDataMap.set(id, { count: 0, deployed: 0, partial: 0, critical: 0, auto: 0, tasks: 0, successSum: 0 });
      });

      results.forEach((result, idx) => {
        const familyId = FAMILY_TABLES[idx].id;
        if (result.error || !result.data) {
          const mock = mockFamilies.find(f => f.id === familyId);
          if (mock) {
            familyDataMap.set(familyId, {
              count: mock.agents_total,
              deployed: mock.deployed,
              partial: mock.partial,
              critical: mock.critical,
              auto: mock.auto_enabled,
              tasks: mock.tasks_completed,
              successSum: mock.success_rate * mock.agents_total,
            });
          }
          return;
        }

        const rows = result.data as Record<string, unknown>[];
        const mapped = rows.map(r => ({
          status: (r.status as string) || 'mock',
          priority: (r.priority as string) || 'low',
          auto: Boolean(r.auto_enabled),
          tasks: Number(r.tasks_completed) || 0,
          success: Number(r.success_rate) || 0,
        }));

        familyDataMap.set(familyId, {
          count: mapped.length,
          deployed: mapped.filter(r => r.status === 'deployed').length,
          partial: mapped.filter(r => r.status === 'partial').length,
          critical: mapped.filter(r => r.priority === 'critical').length,
          auto: mapped.filter(r => r.auto).length,
          tasks: mapped.reduce((s, r) => s + r.tasks, 0),
          successSum: mapped.reduce((s, r) => s + r.success, 0),
        });
      });

      let totalAgents = 0;
      let totalDeployed = 0;
      let totalPartial = 0;
      let totalCritical = 0;
      let totalAuto = 0;
      let totalTasks = 0;
      let totalSuccessWeighted = 0;

      const liveFamilies: KOSFamilySync[] = mockFamilies.map(mock => {
        const live = familyDataMap.get(mock.id) || { count: 0, deployed: 0, partial: 0, critical: 0, auto: 0, tasks: 0, successSum: 0 };

        totalAgents += live.count;
        totalDeployed += live.deployed;
        totalPartial += live.partial;
        totalCritical += live.critical;
        totalAuto += live.auto;
        totalTasks += live.tasks;
        totalSuccessWeighted += live.successSum;

        const successRate = live.count > 0 ? Math.round((live.successSum / live.count) * 10) / 10 : mock.success_rate;
        const deployPct = live.count > 0 ? Math.round((live.deployed / live.count) * 100) : 0;

        let syncStatus: KOSFamilySync['sync_status'] = 'synced';
        if (deployPct >= 100) syncStatus = 'synced';
        else if (deployPct >= 85) syncStatus = 'partial';
        else if (deployPct >= 50) syncStatus = 'syncing';
        else syncStatus = 'stale';

        return {
          ...mock,
          agents_total: live.count,
          deployed: live.deployed,
          partial: live.partial,
          critical: live.critical,
          auto_enabled: live.auto,
          tasks_completed: live.tasks,
          success_rate: successRate,
          sync_status: syncStatus,
        };
      });

      const anyLive = results.some(r => !r.error && r.data && (r.data as unknown[]).length > 0);

      const liveKPIs: KOSMasterGlobalKPIs = {
        ...mockKPIs,
        total_agents: totalAgents,
        deployed: totalDeployed,
        partial: totalPartial,
        critical: totalCritical,
        auto_enabled: totalAuto,
        total_tasks: totalTasks,
        avg_success_rate: totalAgents > 0 ? Math.round((totalSuccessWeighted / totalAgents) * 10) / 10 : 0,
        avg_kpo_score: liveFamilies.length > 0 ? Math.round(liveFamilies.reduce((s, f) => s + f.kpo_score, 0) / liveFamilies.length * 10) / 10 : mockKPIs.avg_kpo_score,
        fully_synced_families: liveFamilies.filter(f => f.sync_status === 'synced').length,
        families_at_risk: liveFamilies.filter(f => f.sync_status === 'stale' || f.sync_status === 'error').length,
      };

      setData({
        families: liveFamilies,
        globalKPIs: anyLive ? liveKPIs : mockKPIs,
        kpoDimensions: mockKPODims,
        gapAnalysis: mockGaps,
        syncLogs: mockLogs,
        deploymentPlan: mockPlan,
        isLive: anyLive,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        families: mockFamilies,
        globalKPIs: mockKPIs,
        kpoDimensions: mockKPODims,
        gapAnalysis: mockGaps,
        syncLogs: mockLogs,
        deploymentPlan: mockPlan,
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