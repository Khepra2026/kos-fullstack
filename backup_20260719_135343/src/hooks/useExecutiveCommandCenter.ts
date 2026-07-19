import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  commandDimensions,
  commanderIntent,
  quickStats,
  type CommandDimension,
  type CommanderIntent,
  type QuickStat,
} from '@/mocks/executiveCommandCenter';

interface DashboardRow {
  id: number;
  dashboard_name: string;
  category: string;
  metrics: Record<string, unknown>;
  status: string;
}

interface UseExecutiveCommandCenterReturn {
  dimensions: CommandDimension[];
  intent: CommanderIntent;
  stats: QuickStat[];
  selectedDimension: CommandDimension | null;
  setSelectedDimension: (dim: CommandDimension | null) => void;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
  lastUpdated: Date | null;
  globalStatus: 'conforme' | 'surveillance' | 'action';
  conformCount: number;
  surveillanceCount: number;
  actionCount: number;
}

export function useExecutiveCommandCenter(): UseExecutiveCommandCenterReturn {
  const [dimensions, setDimensions] = useState<CommandDimension[]>([]);
  const [intent, setIntent] = useState<CommanderIntent>(commanderIntent);
  const [stats, setStats] = useState<QuickStat[]>([]);
  const [selectedDimension, setSelectedDimension] = useState<CommandDimension | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: liveData, error: liveError } = await supabase
        .from('executive_dashboards')
        .select('id, dashboard_name, category, metrics, status')
        .order('id', { ascending: true });

      if (liveError) throw liveError;

      if (liveData && liveData.length > 0) {
        // Map Supabase dashboards to command dimensions
        const mappedDimensions: CommandDimension[] = (liveData as DashboardRow[]).map((row, i) => ({
          id: `dim-${row.id}`,
          name: row.dashboard_name,
          category: row.category,
          status: row.status === 'warning' ? 'surveillance' : row.status === 'ok' ? 'conforme' : 'action',
          score: typeof row.metrics?.score_global === 'number' ? row.metrics.score_global as number : 
                 typeof row.metrics?.score_securite === 'number' ? row.metrics.score_securite as number :
                 typeof row.metrics?.score_conformite === 'number' ? row.metrics.score_conformite as number : 90,
          lastChecked: new Date().toISOString(),
          description: `Dashboard ${row.dashboard_name} — ${row.category}`,
        }));

        setDimensions(mappedDimensions);
        setIsLive(true);
        setLastUpdated(new Date());
      } else {
        throw new Error('No live data');
      }
    } catch {
      setDimensions(commandDimensions);
      setIsLive(false);
      setLastUpdated(new Date('2026-06-19T06:45:00Z'));
    } finally {
      setIsLoading(false);
    }

    setIntent(commanderIntent);
    setStats(quickStats);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const conformCount = dimensions.filter(d => d.status === 'conforme').length;
  const surveillanceCount = dimensions.filter(d => d.status === 'surveillance').length;
  const actionCount = dimensions.filter(d => d.status === 'action').length;

  const globalStatus: 'conforme' | 'surveillance' | 'action' =
    actionCount > 1 ? 'action' : surveillanceCount > 2 ? 'surveillance' : 'conforme';

  return {
    dimensions,
    intent,
    stats,
    selectedDimension,
    setSelectedDimension,
    isLive,
    isLoading,
    error,
    retry,
    lastUpdated,
    globalStatus,
    conformCount,
    surveillanceCount,
    actionCount,
  };
}



