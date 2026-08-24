import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  KOS120_OVERVIEW,
  KOS120_AXES,
  KOS120_ROADMAP,
  KOS120_STATS,
  KOS120_EXECUTION_MODE,
} from '@/mocks/kos120BigFourUpgrade';

export function useKOS120BigFourUpgrade() {
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const { data } = await supabase.from('kos_automates').select('id').limit(1);
        if (!cancelled && data && data.length > 0) setIsLive(true);
      } catch { /* fallback mock */ }
      if (!cancelled) setLoading(false);
    }
    const timer = setTimeout(() => { init(); }, 600);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  const overview = useMemo(() => KOS120_OVERVIEW, []);
  const axes = useMemo(() => KOS120_AXES, []);
  const roadmap = useMemo(() => KOS120_ROADMAP, []);
  const stats = useMemo(() => KOS120_STATS, []);
  const executionMode = useMemo(() => KOS120_EXECUTION_MODE, []);

  const totalTasks = useMemo(() => axes.reduce((sum, a) => sum + a.tasks.length, 0), [axes]);
  const criticalTasks = useMemo(
    () => axes.reduce((sum, a) => sum + a.tasks.filter((t) => t.priority === 'CRITIQUE').length, 0),
    [axes],
  );

  return { loading, isLive, overview, axes, roadmap, stats, executionMode, totalTasks, criticalTasks };
}



