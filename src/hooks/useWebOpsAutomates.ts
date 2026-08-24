import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { KOS_WEB_OPS_AUTOMATES as mockAutomates, WEB_OPS_AUTOMATE_CATEGORIES as mockCategories, WEB_OPS_AUTOMATES_KPIS as mockKPIs } from '@/mocks/webOpsAutomates';
import type { webOpsAutomate, WebOpsAutomateCategory } from '@/mocks/webOpsAutomates';

export type { webOpsAutomate, WebOpsAutomateCategory };

export interface WebOpsAutomatesKPIs {
  total_agents: number;
  deployed: number;
  partial: number;
  auto_enabled: number;
  total_tasks: number;
  avg_success_rate: number;
  critical_agents: number;
  high_priority: number;
  categories: number;
  resources_optimized: number;
  updates_applied: number;
  upgrades_executed: number;
}

export interface WebOpsAutomatesData {
  automates: webOpsAutomate[];
  categories: WebOpsAutomateCategory[];
  kpis: WebOpsAutomatesKPIs;
  isLive: boolean;
}

function mapAutomate(row: Record<string, unknown>): webOpsAutomate {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    tech_stack: (row.tech_stack as string[]) || [],
    status: row.status as webOpsAutomate['status'],
    version: row.version as string,
    description: row.description as string,
    capabilities: (row.capabilities as string[]) || [],
    success_rate: Number(row.success_rate),
    tasks_completed: Number(row.tasks_completed),
    auto_enabled: Boolean(row.auto_enabled),
    icon: row.icon as string,
    color: row.color as string,
    last_execution: row.last_execution as string,
    priority: row.priority as webOpsAutomate['priority'],
    kpis: (row.kpis as webOpsAutomate['kpis']) || [],
  };
}

export function useWebOpsAutomates() {
  const [data, setData] = useState<WebOpsAutomatesData>({
    automates: [],
    categories: [],
    kpis: { total_agents: 0, deployed: 0, partial: 0, auto_enabled: 0, total_tasks: 0, avg_success_rate: 0, critical_agents: 0, high_priority: 0, categories: 0, resources_optimized: 0, updates_applied: 0, upgrades_executed: 0 },
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: automates, error: err } = await supabase
        .from('kos_web_ops_automates')
        .select('*')
        .order('success_rate', { ascending: false });

      if (err) throw err;

      const rows = (automates as Record<string, unknown>[]) || [];
      const mapped = rows.map(mapAutomate);
      const hasData = mapped.length > 0;

      const computedKPIs: WebOpsAutomatesKPIs = {
        total_agents: mapped.length,
        deployed: mapped.filter(a => a.status === 'deployed').length,
        partial: mapped.filter(a => a.status === 'partial').length,
        auto_enabled: mapped.filter(a => a.auto_enabled).length,
        total_tasks: mapped.reduce((s, a) => s + a.tasks_completed, 0),
        avg_success_rate: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.success_rate, 0) / mapped.length * 10) / 10 : 0,
        critical_agents: mapped.filter(a => a.priority === 'critical').length,
        high_priority: mapped.filter(a => a.priority === 'high').length,
        categories: [...new Set(mapped.map(a => a.category))].length,
        resources_optimized: mapped.filter(a => a.category === 'resource-admin').reduce((s, a) => s + a.tasks_completed, 0),
        updates_applied: mapped.filter(a => a.category === 'site-updates').reduce((s, a) => s + a.tasks_completed, 0),
        upgrades_executed: mapped.filter(a => a.category === 'site-upgrades').reduce((s, a) => s + a.tasks_completed, 0),
      };

      setData({
        automates: mapped,
        categories: mockCategories,
        kpis: computedKPIs,
        isLive: hasData,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      setData({
        automates: mockAutomates,
        categories: mockCategories,
        kpis: mockKPIs as WebOpsAutomatesKPIs,
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



