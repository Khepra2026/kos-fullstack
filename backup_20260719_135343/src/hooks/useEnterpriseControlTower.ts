import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  AUTOMATION_FACTORY_DOMAINS,
  CONTROL_TOWER_SUMMARY,
  CONTROL_TOWER_ALERTS,
  type AutomationFactoryDomain,
  type ControlTowerSummary,
  type ControlTowerAlert,
} from '@/mocks/controlTowerAutomationFactory';

export interface ControlTowerKPI {
  id: string;
  category: string;
  name: string;
  value: number;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
  warningThreshold: number;
  criticalThreshold: number;
  direction: 'higher_better' | 'lower_better';
  alerts: number;
  lastScan: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

interface DashboardRow {
  id: number;
  dashboard_name: string;
  category: string;
  kpi_count: number;
  refresh_frequency: string;
  last_refreshed: string | null;
  metrics: Record<string, unknown>;
  trends: Record<string, string>;
  alerts: string[];
  status: string;
  created_at: string;
}

function parseDashboardToKpis(rows: DashboardRow[]): ControlTowerKPI[] {
  return rows.map((row) => {
    const metrics = row.metrics as Record<string, number>;
    const trends = row.trends as Record<string, string>;
    const trendVal = Object.values(trends)[0] || 'stable';
    const trendMap: Record<string, 'up' | 'down' | 'stable'> = { up: 'up', down: 'down', stable: 'stable' };
    
    return {
      id: String(row.id),
      category: row.category || 'Opérations',
      name: row.dashboard_name,
      value: metrics.score_global || metrics.ca_mensuel_fcfa || metrics.score_securite || metrics.dr || metrics.effectif || metrics.agents_actifs || metrics.missions_actives || metrics.textes_suivis || metrics.solde_bancaire_fcfa || metrics.score_global || 0,
      unit: row.category === 'finance' ? 'FCFA' : row.category === 'digital' ? 'visites/mois' : '',
      status: (['ok', 'warning', 'critical'].includes(row.status) ? row.status : 'ok') as 'ok' | 'warning' | 'critical',
      warningThreshold: 80,
      criticalThreshold: 60,
      direction: 'higher_better',
      alerts: row.alerts ? row.alerts.length : 0,
      lastScan: row.last_refreshed || new Date().toISOString(),
      trend: trendMap[trendVal] || 'stable',
      trendPercent: 5,
    };
  });
}

interface UseEnterpriseControlTowerReturn {
  kpis: ControlTowerKPI[];
  domains: AutomationFactoryDomain[];
  summary: ControlTowerSummary;
  alerts: ControlTowerAlert[];
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
  lastUpdated: Date | null;
}

export function useEnterpriseControlTower(): UseEnterpriseControlTowerReturn {
  const [kpis, setKpis] = useState<ControlTowerKPI[]>([]);
  const [domains, setDomains] = useState<AutomationFactoryDomain[]>([]);
  const [summary, setSummary] = useState<ControlTowerSummary>(CONTROL_TOWER_SUMMARY);
  const [alerts, setAlerts] = useState<ControlTowerAlert[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('executive_dashboards')
        .select('*')
        .order('id', { ascending: true });

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        const liveKpis = parseDashboardToKpis(data as DashboardRow[]);
        setKpis(liveKpis);
        setDomains(AUTOMATION_FACTORY_DOMAINS);
        setSummary(CONTROL_TOWER_SUMMARY);
        setAlerts(CONTROL_TOWER_ALERTS);
        setIsLive(true);
        setLastUpdated(new Date());
      } else {
        throw new Error('No live data');
      }
    } catch {
      // Fallback loaded from mock via the consuming page
      setDomains(AUTOMATION_FACTORY_DOMAINS);
      setSummary(CONTROL_TOWER_SUMMARY);
      setAlerts(CONTROL_TOWER_ALERTS);
      setIsLive(false);
      setLastUpdated(new Date('2026-06-13T08:00:00Z'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    kpis,
    domains,
    summary,
    alerts,
    isLive,
    isLoading,
    error,
    retry,
    lastUpdated,
  };
}



