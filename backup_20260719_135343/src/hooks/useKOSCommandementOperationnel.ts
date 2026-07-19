import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS_UNIFIED_FAMILIES as mockFamilies,
  KOS_UNIFIED_GLOBAL_KPIS as mockKPIs,
  KOS_OPERATIONAL_CHAIN as mockChain,
  KOS_BIGFOUR_KPI_BENCHMARKS as mockBenchmarks,
} from '@/mocks/commandementOperationnelUnifie';
import type {
  automateFamily,
  unifiedGlobalKPIs,
  operationalChain,
} from '@/mocks/commandementOperationnelUnifie';

export type { automateFamily, unifiedGlobalKPIs, operationalChain };

export interface commandementData {
  families: automateFamily[];
  globalKPIs: unifiedGlobalKPIs;
  operationalChain: operationalChain[];
  benchmarks: typeof mockBenchmarks;
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
];

export function useKOSCommandementOperationnel() {
  const [data, setData] = useState<commandementData>({
    families: [],
    globalKPIs: {
      total_families: 0, total_agents: 0, deployed: 0, partial: 0, critical: 0,
      auto_enabled: 0, total_tasks: 0, avg_success_rate: 0, total_revenue_influenced: 0,
      total_leads_generated: 0, total_deals_closed: 0, total_campaigns: 0,
      total_audits: 0, total_quality_score: 0, total_certifications: 0,
      active_families: 0, fully_deployed_families: 0, languages: 0, avg_uptime: 0,
    },
    operationalChain: [],
    benchmarks: mockBenchmarks,
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

      const liveFamilies: automateFamily[] = mockFamilies.map(mock => {
        const live = familyDataMap.get(mock.id) || { count: 0, deployed: 0, partial: 0, critical: 0, auto: 0, tasks: 0, successSum: 0 };

        totalAgents += live.count;
        totalDeployed += live.deployed;
        totalPartial += live.partial;
        totalCritical += live.critical;
        totalAuto += live.auto;
        totalTasks += live.tasks;
        totalSuccessWeighted += live.successSum;

        return {
          ...mock,
          agents_total: live.count,
          deployed: live.deployed,
          partial: live.partial,
          critical: live.critical,
          auto_enabled: live.auto,
          tasks_completed: live.tasks,
          success_rate: live.count > 0 ? Math.round((live.successSum / live.count) * 10) / 10 : mock.success_rate,
        };
      });

      const liveKPIs: unifiedGlobalKPIs = {
        total_families: liveFamilies.length,
        total_agents: totalAgents,
        deployed: totalDeployed,
        partial: totalPartial,
        critical: totalCritical,
        auto_enabled: totalAuto,
        total_tasks: totalTasks,
        avg_success_rate: totalAgents > 0 ? Math.round((totalSuccessWeighted / totalAgents) * 10) / 10 : 0,
        total_revenue_influenced: liveFamilies.reduce((s, f) => s + f.revenue_influenced, 0),
        total_leads_generated: mockKPIs.total_leads_generated,
        total_deals_closed: mockKPIs.total_deals_closed,
        total_campaigns: mockKPIs.total_campaigns,
        total_audits: mockKPIs.total_audits,
        total_quality_score: mockKPIs.total_quality_score,
        total_certifications: mockKPIs.total_certifications,
        active_families: liveFamilies.filter(f => f.agents_total > 0).length,
        fully_deployed_families: liveFamilies.filter(f => f.deployed === f.agents_total && f.agents_total > 0).length,
        languages: mockKPIs.languages,
        avg_uptime: mockKPIs.avg_uptime,
      };

      const anyLive = results.some(r => !r.error && r.data && (r.data as unknown[]).length > 0);

      setData({
        families: liveFamilies,
        globalKPIs: liveKPIs,
        operationalChain: mockChain,
        benchmarks: mockBenchmarks,
        isLive: anyLive,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        families: mockFamilies,
        globalKPIs: mockKPIs,
        operationalChain: mockChain,
        benchmarks: mockBenchmarks,
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



