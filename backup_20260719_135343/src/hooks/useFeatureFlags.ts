import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface FeatureFlag {
  id: string;
  flag_name: string;
  description?: string;
  applies_to_hook?: string;
  applies_to_page?: string;
  category: string;
  is_live: boolean;
  is_mock_fallback: boolean;
  migration_batch?: string;
  criticality: string;
}

interface FeatureFlagsState {
  flags: FeatureFlag[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useFeatureFlags() {
  const [state, setState] = useState<FeatureFlagsState>({
    flags: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchFlags = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data, error } = await supabase.from('kos_feature_flags').select('*').order('criticality');
      if (error) throw error;
      setState({
        flags: (data || []) as FeatureFlag[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchFlags();
  }, [fetchFlags]);

  const isHookLive = useCallback((hookName: string): boolean => {
    const flag = state.flags.find(f => f.applies_to_hook === hookName);
    return flag ? flag.is_live : true;
  }, [state.flags]);

  const getFlagsByCriticality = useCallback((crit: string): FeatureFlag[] => {
    return state.flags.filter(f => f.criticality === crit);
  }, [state.flags]);

  const getMockOnlyCount = useCallback((): number => {
    return state.flags.filter(f => f.category === 'mock_migration' && !f.is_live).length;
  }, [state.flags]);

  const getLiveCount = useCallback((): number => {
    return state.flags.filter(f => f.is_live).length;
  }, [state.flags]);

  const getMigrationProgress = useCallback((): { total: number; live: number; pct: number } => {
    const migrationFlags = state.flags.filter(f => f.category === 'mock_migration');
    const live = migrationFlags.filter(f => f.is_live).length;
    return {
      total: migrationFlags.length || 1,
      live,
      pct: migrationFlags.length > 0 ? Math.round((live / migrationFlags.length) * 100) : 100,
    };
  }, [state.flags]);

  return {
    ...state,
    fetchFlags,
    isHookLive,
    getFlagsByCriticality,
    getMockOnlyCount,
    getLiveCount,
    getMigrationProgress,
  };
}



