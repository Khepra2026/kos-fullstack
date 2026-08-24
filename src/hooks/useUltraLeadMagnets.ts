import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  instrumentsPreQualification,
  statistiquesPortail,
  parcoursQualification,
} from '@/mocks/ultraLeadMagnets';
import type { InstrumentPreQualification } from '@/mocks/ultraLeadMagnets';

export type { InstrumentPreQualification };

export function useUltraLeadMagnets() {
  const [instruments, setInstruments] = useState<InstrumentPreQualification[]>([]);
  const [stats, setStats] = useState<typeof statistiquesPortail | null>(null);
  const [parcours, setParcours] = useState<typeof parcoursQualification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data: liveData, error: supabaseErr } = await supabase
          .from('leads')
          .select('*')
          .limit(1);
        if (!cancelled && !supabaseErr && liveData && liveData.length > 0) {
          setIsLive(true);
        }
      } catch {
        // fallback mock
      }
      if (!cancelled) {
        setInstruments(instrumentsPreQualification);
        setStats(statistiquesPortail);
        setParcours(parcoursQualification);
        setError(null);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return {
    instruments,
    stats,
    parcours,
    loading,
    error,
    isLive,
  };
}



