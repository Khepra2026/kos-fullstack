import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { KOS_REGULATORY_COMPLIANCE_AUTOMATES as mockAutomates, REGULATORY_COMPLIANCE_CATEGORIES as mockCategories, REGULATORY_COMPLIANCE_AUTOMATES_KPIS as mockKPIs } from '@/mocks/regulatoryComplianceAutomates';
import type { regulatoryComplianceAutomate, RegulatoryComplianceAutomateCategory } from '@/mocks/regulatoryComplianceAutomates';

export type { regulatoryComplianceAutomate, RegulatoryComplianceAutomateCategory };

export interface RegulatoryComplianceAutomatesKPIs {
  total_agents: number;
  deployed: number;
  partial: number;
  mock: number;
  auto_enabled: number;
  total_tasks: number;
  avg_success_rate: number;
  critical_agents: number;
  high_priority: number;
  medium_priority: number;
  categories: number;
  jurisdictions_covered: number;
  obligations_tracked: number;
  reports_generated: number;
}

export interface RegulatoryComplianceAutomatesData {
  automates: regulatoryComplianceAutomate[];
  categories: RegulatoryComplianceAutomateCategory[];
  kpis: RegulatoryComplianceAutomatesKPIs;
  isLive: boolean;
}

function mapAutomate(row: Record<string, unknown>): regulatoryComplianceAutomate {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    tech_stack: Array.isArray(row.tech_stack) ? row.tech_stack as string[] : [],
    status: row.status as regulatoryComplianceAutomate['status'],
    version: row.version as string,
    description: row.description as string,
    capabilities: Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
    success_rate: Number(row.success_rate),
    tasks_completed: Number(row.tasks_completed),
    auto_enabled: Boolean(row.auto_enabled),
    icon: row.icon as string,
    color: row.color as string,
    last_execution: row.last_execution as string,
    priority: row.priority as regulatoryComplianceAutomate['priority'],
    kpis: Array.isArray(row.kpis) ? row.kpis as regulatoryComplianceAutomate['kpis'] : [],
  };
}

export function useRegulatoryComplianceAutomates() {
  const [data, setData] = useState<RegulatoryComplianceAutomatesData>({
    automates: [],
    categories: [],
    kpis: { total_agents: 0, deployed: 0, partial: 0, mock: 0, auto_enabled: 0, total_tasks: 0, avg_success_rate: 0, critical_agents: 0, high_priority: 0, medium_priority: 0, categories: 0, jurisdictions_covered: 0, obligations_tracked: 0, reports_generated: 0 },
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: automates, error: err } = await supabase
        .from('kos_regulatory_compliance_automates')
        .select('*')
        .order('success_rate', { ascending: false });

      if (err) throw err;

      const rows = (automates as Record<string, unknown>[]) || [];
      const mapped = rows.map(mapAutomate);
      const hasData = mapped.length > 0;

      const deployedCount = mapped.filter(a => a.status === 'deployed').length;
      const partialCount = mapped.filter(a => a.status === 'partial').length;
      const autoCount = mapped.filter(a => a.auto_enabled).length;

      const computedKPIs: RegulatoryComplianceAutomatesKPIs = {
        total_agents: mapped.length,
        deployed: deployedCount,
        partial: partialCount,
        mock: mapped.filter(a => a.status === 'mock').length,
        auto_enabled: autoCount,
        total_tasks: mapped.reduce((s, a) => s + a.tasks_completed, 0),
        avg_success_rate: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.success_rate, 0) / mapped.length * 10) / 10 : 0,
        critical_agents: mapped.filter(a => a.priority === 'critical').length,
        high_priority: mapped.filter(a => a.priority === 'high').length,
        medium_priority: mapped.filter(a => a.priority === 'medium').length,
        categories: [...new Set(mapped.map(a => a.category))].length,
        jurisdictions_covered: 14,
        obligations_tracked: mapped.filter(a => a.category === 'compliance-documentaire').reduce((s, a) => s + a.tasks_completed, 0),
        reports_generated: mapped.filter(a => a.category === 'reporting-reglementaire').reduce((s, a) => s + a.tasks_completed, 0) + mapped.filter(a => a.category === 'audit-inspection').reduce((s, a) => s + a.tasks_completed, 0),
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
        kpis: mockKPIs as RegulatoryComplianceAutomatesKPIs,
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



