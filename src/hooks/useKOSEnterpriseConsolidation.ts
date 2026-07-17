import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  consolidationOverview,
  systemStats,
  twelveLevels,
  bankingStackLayers,
  productionDeployment,
  consolidatedKPIs,
  systemInterconnections,
  productionGoLive,
} from '@/mocks/kosEnterpriseConsolidation';

export function useKOSEnterpriseConsolidation() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const { data } = await supabase.from('enterprise_os').select('id').limit(1);
        if (!cancelled && data && data.length > 0) setIsLive(true);
      } catch { /* fallback mock */ }
      if (!cancelled) setLoading(false);
    }
    init();
    return () => { cancelled = true; };
  }, []);

  return {
    loading,
    isLive,
    overview: consolidationOverview,
    stats: systemStats,
    levels: twelveLevels,
    bankingLayers: bankingStackLayers,
    deployment: productionDeployment,
    kpis: consolidatedKPIs,
    interconnections: systemInterconnections,
    goLive: productionGoLive,
  };
}