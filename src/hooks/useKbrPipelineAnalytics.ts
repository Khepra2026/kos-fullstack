import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface KbrBuData {
  id: string;
  bu: string;
  bu_label: string;
  leads: number;
  mql: number;
  sql: number;
  opportunities: number;
  proposals: number;
  negotiations: number;
  won: number;
  lost: number;
  pipeline_value: string;
  won_value: string;
  avg_deal_size: string;
  color: string;
  download_count: number;
  purchase_count: number;
  purchase_revenue: string;
}

interface KbrPipelineState {
  buData: KbrBuData[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

export function useKbrPipelineAnalytics() {
  const [state, setState] = useState<KbrPipelineState>({
    buData: [],
    isLoading: true,
    isLive: false,
    error: null,
  });

  const fetchPipeline = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data, error } = await supabase
        .from('kbr_pipeline_analytics')
        .select('*')
        .order('bu');

      if (error) throw error;

      setState({
        buData: (data || []) as KbrBuData[],
        isLoading: false,
        isLive: true,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({ ...prev, isLoading: false, isLive: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  return { ...state, fetchPipeline };
}