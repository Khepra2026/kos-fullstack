import { useState, useEffect, useCallback } from 'react';
import {
  UPG2_OVERVIEW,
  UPG2_TASKS,
  UPG2_TIMELINE,
  UPG2_AGENTS,
  UPG2_RISKS,
  UPG2_STATS,
} from '@/mocks/kos120Upg2Execution';

export interface UPG2Task {
  id: string;
  axe: string;
  name: string;
  description: string;
  priority: string;
  effort: string;
  progress: number;
  status: string;
  subTasks: { id: string; name: string; progress: number; status: string }[];
  metrics: { name: string; current: string; target: string; unit: string; pct: number }[];
  agent: string;
  logs: { date: string; event: string; type: string }[];
}

export interface UPG2Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  load: number;
  status: string;
  tasks: string[];
  performance: number;
  description: string;
}

export interface UPG2Risk {
  id: string;
  name: string;
  severity: string;
  probability: number;
  impact: number;
  mitigation: string;
  status: string;
  owner: string;
}

interface UseKOS120Upg2ExecutionReturn {
  overview: typeof UPG2_OVERVIEW;
  tasks: UPG2Task[];
  timeline: typeof UPG2_TIMELINE;
  agents: UPG2Agent[];
  risks: UPG2Risk[];
  stats: typeof UPG2_STATS;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useKOS120Upg2Execution(): UseKOS120Upg2ExecutionReturn {
  const [tasks] = useState<UPG2Task[]>(UPG2_TASKS);
  const [agents] = useState<UPG2Agent[]>(UPG2_AGENTS);
  const [risks] = useState<UPG2Risk[]>(UPG2_RISKS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Mode MOCK — données déjà chargées
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    overview: UPG2_OVERVIEW,
    tasks,
    timeline: UPG2_TIMELINE,
    agents,
    risks,
    stats: UPG2_STATS,
    loading,
    error,
    refetch: fetchData,
  };
}



