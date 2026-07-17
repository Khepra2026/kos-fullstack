import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  UNIFIED_DOMAINS,
  UNIFIED_GLOBAL_KPIS,
  PERFORMANCE_METRICS,
  DIGITAL_MARKETING_CHANNELS,
  LEAD_MAGNET_PERFORMANCE,
  LEAD_MAGNET_AGGREGATED,
  ACTIVE_TENDERS,
  TENDER_DETECTION_SYSTEM,
  UPGRADE_120_ACTIONS,
  UNIFIED_MILESTONES,
  UNIFIED_STATS,
  type UnifiedDomainScore,
  type PerfMetric,
  type DigitalMarketingChannel,
  type LeadMagnetPerf,
  type TenderAlert,
  type Upgrade120Action,
  type UnifiedMilestone,
} from '@/mocks/kosCompletePerformanceVisibility120Upgrade';

export type CockpitTab = 'overview' | 'performance' | 'marketing' | 'lead-magnets' | 'ami-ao' | 'upgrade' | 'timeline';

interface CockpitData {
  meta: typeof UNIFIED_STATS;
  kpis: typeof UNIFIED_GLOBAL_KPIS;
  domains: UnifiedDomainScore[];
  perfMetrics: PerfMetric[];
  marketingChannels: DigitalMarketingChannel[];
  leadMagnets: LeadMagnetPerf[];
  leadMagnetAggregated: typeof LEAD_MAGNET_AGGREGATED;
  tenders: TenderAlert[];
  tenderSystem: typeof TENDER_DETECTION_SYSTEM;
  upgradeActions: Upgrade120Action[];
  milestones: UnifiedMilestone[];
}

interface UseCompletePerformanceVisibilityReturn extends CockpitData {
  loading: boolean;
  error: string | null;
  dataSource: 'live' | 'mock';
  activeTab: CockpitTab;
  setActiveTab: (tab: CockpitTab) => void;
  perfFilter: string;
  setPerfFilter: (f: string) => void;
  filteredPerfMetrics: PerfMetric[];
  upgradeFilter: string;
  setUpgradeFilter: (f: string) => void;
  filteredUpgradeActions: Upgrade120Action[];
  refresh: () => void;
}

const MOCK_DATA: CockpitData = {
  meta: UNIFIED_STATS,
  kpis: UNIFIED_GLOBAL_KPIS,
  domains: UNIFIED_DOMAINS,
  perfMetrics: PERFORMANCE_METRICS,
  marketingChannels: DIGITAL_MARKETING_CHANNELS,
  leadMagnets: LEAD_MAGNET_PERFORMANCE,
  leadMagnetAggregated: LEAD_MAGNET_AGGREGATED,
  tenders: ACTIVE_TENDERS,
  tenderSystem: TENDER_DETECTION_SYSTEM,
  upgradeActions: UPGRADE_120_ACTIONS,
  milestones: UNIFIED_MILESTONES,
};

function mergeWithMock(live: Partial<CockpitData>): CockpitData {
  return {
    meta: live.meta ?? MOCK_DATA.meta,
    kpis: live.kpis ?? MOCK_DATA.kpis,
    domains: live.domains ?? MOCK_DATA.domains,
    perfMetrics: live.perfMetrics ?? MOCK_DATA.perfMetrics,
    marketingChannels: live.marketingChannels ?? MOCK_DATA.marketingChannels,
    leadMagnets: live.leadMagnets ?? MOCK_DATA.leadMagnets,
    leadMagnetAggregated: live.leadMagnetAggregated ?? MOCK_DATA.leadMagnetAggregated,
    tenders: live.tenders ?? MOCK_DATA.tenders,
    tenderSystem: live.tenderSystem ?? MOCK_DATA.tenderSystem,
    upgradeActions: live.upgradeActions ?? MOCK_DATA.upgradeActions,
    milestones: live.milestones ?? MOCK_DATA.milestones,
  };
}

export function useKOSCompletePerformanceVisibility120Upgrade(): UseCompletePerformanceVisibilityReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CockpitData>(MOCK_DATA);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [activeTab, setActiveTab] = useState<CockpitTab>('overview');
  const [perfFilter, setPerfFilter] = useState('all');
  const [upgradeFilter, setUpgradeFilter] = useState('all');

  const fetchLiveData = useCallback(async () => {
    try {
      setError(null);
      const { data: liveData, error: fnError } = await supabase.functions.invoke<CockpitData>(
        'kos-cockpit-complete-scan'
      );

      if (fnError) {
        console.warn('Edge Function error, falling back to mock data:', fnError);
        setDataSource('mock');
        setError('Données mock utilisées — Edge Function indisponible');
        return;
      }

      if (liveData) {
        const merged = mergeWithMock(liveData as Partial<CockpitData>);
        setData(merged);
        setDataSource('live');
      } else {
        setDataSource('mock');
        setError('Données mock utilisées — aucune donnée live reçue');
      }
    } catch (err: any) {
      console.warn('Failed to fetch live cockpit data:', err);
      setDataSource('mock');
      setError('Données mock utilisées — erreur réseau');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      await fetchLiveData();
      if (!cancelled) {
        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchLiveData]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchLiveData().finally(() => setLoading(false));
  }, [fetchLiveData]);

  const filteredPerfMetrics = useMemo(() => {
    if (perfFilter === 'all') return data.perfMetrics;
    return data.perfMetrics.filter(m => m.severity === perfFilter);
  }, [data.perfMetrics, perfFilter]);

  const filteredUpgradeActions = useMemo(() => {
    if (upgradeFilter === 'all') return data.upgradeActions;
    if (upgradeFilter === 'P0') return data.upgradeActions.filter(a => a.priority === 'P0');
    if (upgradeFilter === 'P1') return data.upgradeActions.filter(a => a.priority === 'P1');
    if (upgradeFilter === 'P2') return data.upgradeActions.filter(a => a.priority === 'P2');
    if (upgradeFilter === 'in_progress') return data.upgradeActions.filter(a => a.status === 'in_progress');
    return data.upgradeActions.filter(a => a.status === upgradeFilter);
  }, [data.upgradeActions, upgradeFilter]);

  return {
    ...data,
    loading,
    error,
    dataSource,
    activeTab,
    setActiveTab,
    perfFilter,
    setPerfFilter,
    filteredPerfMetrics,
    upgradeFilter,
    setUpgradeFilter,
    filteredUpgradeActions,
    refresh,
  };
}