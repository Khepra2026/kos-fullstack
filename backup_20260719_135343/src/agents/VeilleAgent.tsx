import { supabase } from '@/lib/supabase';
import { RegulationSource } from '@/types/kos';

export interface VeilleAnalysis {
  id: string;
  source: RegulationSource;
  docId: string;
  title: string;
  summary: string;
  impactLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  keyPoints: string[];
  affectedSectors: string[];
  deadline: string;
  sources: string[];
  rawText: string;
}

export function useVeilleAgent() {
  const analyze = async (payload: { source: RegulationSource; docId: string; rawText?: string }): Promise<VeilleAnalysis> => {
    const { data, error } = await supabase.functions.invoke('kos-regulatory-intelligence-engine', {
      body: payload,
    });

    if (error) throw new Error(error.message || 'Veille analysis failed');
    if (!data) throw new Error('Veille analysis returned empty data');

    return data as VeilleAnalysis;
  };

  return { analyze };
}



