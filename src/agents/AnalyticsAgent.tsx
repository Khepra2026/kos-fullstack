import { supabase } from '@/lib/supabase';
import { PipelineResult } from '@/types/kos';

export interface PipelineKPIs {
  production: { contenus: number; delaiMoyen: string };
  seo: { trafic: number; motsCles: number };
  commercial: { prospects: number; rdv: number };
  quality: { avgScore: number };
  audit: {
    id: string;
    channel: string;
    score: number;
    timestamp: string;
  }[];
}

export function useAnalyticsAgent() {
  const track = async (_results: PipelineResult['results']): Promise<void> => {
    try {
      await supabase.functions.invoke('kos-kpi-recalculation-engine', {
        body: {
          event: 'pipeline_complete',
          timestamp: new Date().toISOString(),
        },
      });
    } catch {
      // Non-bloquant
    }
  };

  return { track };
}