import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { KOS_COMMERCIAL_MARKETING_AUTOMATES as mockAutomates, COMMERCIAL_MARKETING_CATEGORIES as mockCategories, COMMERCIAL_MARKETING_KPIS as mockKPIs } from '@/mocks/kosCommercialMarketingAutomates';
import type { KOSCommercialMarketingAutomate, CommercialMarketingCategory } from '@/mocks/kosCommercialMarketingAutomates';

export type { KOSCommercialMarketingAutomate, CommercialMarketingCategory };

export interface CommercialMarketingKPIs {
  total_agents: number;
  deployed: number;
  partial: number;
  mock: number;
  auto_enabled: number;
  total_leads_generated: number;
  total_campaigns_run: number;
  overall_conversion_rate: number;
  total_revenue_influenced: number;
  avg_roi: number;
  total_tasks: number;
  avg_success_rate: number;
  critical_agents: number;
  high_priority: number;
  medium_priority: number;
  categories: number;
  channels: number;
}

export interface CommercialMarketingData {
  automates: KOSCommercialMarketingAutomate[];
  categories: CommercialMarketingCategory[];
  kpis: CommercialMarketingKPIs;
  isLive: boolean;
}

function mapAutomate(row: Record<string, unknown>): KOSCommercialMarketingAutomate {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    tech_stack: typeof row.tech_stack === 'string' ? (row.tech_stack ? row.tech_stack.split(',').map((s: string) => s.trim()) : []) : Array.isArray(row.tech_stack) ? row.tech_stack as string[] : [],
    status: row.status as KOSCommercialMarketingAutomate['status'],
    version: row.version as string,
    description: row.description as string,
    capabilities: typeof row.capabilities === 'string' ? (row.capabilities ? row.capabilities.split(',').map((s: string) => s.trim()) : []) : Array.isArray(row.capabilities) ? row.capabilities as string[] : [],
    success_rate: Number(row.success_rate),
    tasks_completed: Number(row.tasks_completed),
    auto_enabled: Boolean(row.auto_enabled),
    icon: row.icon as string,
    color: row.color as string,
    last_execution: row.last_execution as string,
    priority: row.priority as KOSCommercialMarketingAutomate['priority'],
    kpis: Array.isArray(row.kpis) ? row.kpis as KOSCommercialMarketingAutomate['kpis'] : [],
    leads_generated: Number(row.leads_generated),
    campaigns_run: Number(row.campaigns_run),
    conversion_rate: Number(row.conversion_rate),
    revenue_influenced: Number(row.revenue_influenced),
    roi_avg: Number(row.roi_avg),
    channels: typeof row.channels === 'string' ? (row.channels ? row.channels.split(',').map((s: string) => s.trim()) : []) : Array.isArray(row.channels) ? row.channels as string[] : [],
  };
}

export function useCommercialMarketingAutomates() {
  const [data, setData] = useState<CommercialMarketingData>({
    automates: [],
    categories: [],
    kpis: { total_agents: 0, deployed: 0, partial: 0, mock: 0, auto_enabled: 0, total_leads_generated: 0, total_campaigns_run: 0, overall_conversion_rate: 0, total_revenue_influenced: 0, avg_roi: 0, total_tasks: 0, avg_success_rate: 0, critical_agents: 0, high_priority: 0, medium_priority: 0, categories: 0, channels: 0 },
    isLive: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: automates, error: err } = await supabase
        .from('kos_commercial_marketing_automates')
        .select('*')
        .order('success_rate', { ascending: false });

      if (err) throw err;

      const rows = (automates as Record<string, unknown>[]) || [];
      const mapped = rows.map(mapAutomate);
      const hasData = mapped.length > 0;

      const deployedCount = mapped.filter(a => a.status === 'deployed').length;

      const computedKPIs: CommercialMarketingKPIs = {
        total_agents: mapped.length,
        deployed: deployedCount,
        partial: mapped.filter(a => a.status === 'partial').length,
        mock: mapped.filter(a => a.status === 'mock').length,
        auto_enabled: mapped.filter(a => a.auto_enabled).length,
        total_leads_generated: mapped.reduce((s, a) => s + (a.leads_generated || 0), 0),
        total_campaigns_run: mapped.reduce((s, a) => s + (a.campaigns_run || 0), 0),
        overall_conversion_rate: mapped.filter(a => a.conversion_rate > 0).length > 0 ? Math.round(mapped.reduce((s, a) => s + (a.conversion_rate || 0), 0) / mapped.filter(a => a.conversion_rate > 0).length * 10) / 10 : 0,
        total_revenue_influenced: mapped.reduce((s, a) => s + (a.revenue_influenced || 0), 0),
        avg_roi: mapped.filter(a => a.roi_avg > 0).length > 0 ? Math.round(mapped.reduce((s, a) => s + (a.roi_avg || 0), 0) / mapped.filter(a => a.roi_avg > 0).length * 10) / 10 : 0,
        total_tasks: mapped.reduce((s, a) => s + (a.tasks_completed || 0), 0),
        avg_success_rate: mapped.length > 0 ? Math.round(mapped.reduce((s, a) => s + a.success_rate, 0) / mapped.length * 10) / 10 : 0,
        critical_agents: mapped.filter(a => a.priority === 'critical').length,
        high_priority: mapped.filter(a => a.priority === 'high').length,
        medium_priority: mapped.filter(a => a.priority === 'medium').length,
        categories: [...new Set(mapped.map(a => a.category))].length,
        channels: 14,
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
        kpis: mockKPIs as CommercialMarketingKPIs,
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