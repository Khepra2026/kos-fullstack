import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  kosCapacitiesAssessment,
  prospectiveResearchModules,
  multilingualContentPlan,
  governanceAndDiffusion,
  francophoneAfricaStats,
} from "@/mocks/kosFrancophoneAfricaStrategicCenter";

export function useFrancophoneAfricaStrategicCenter() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await supabase.from('strategic_plans').select('id').limit(1);
        if (data && data.length > 0) setIsLive(true);
      } catch { /* mock fallback */ }
    };
    check();
  }, []);

  const assessment = useMemo(() => kosCapacitiesAssessment, []);
  const modules = useMemo(() => prospectiveResearchModules, []);
  const contentPlan = useMemo(() => multilingualContentPlan, []);
  const governance = useMemo(() => governanceAndDiffusion, []);
  const stats = useMemo(() => francophoneAfricaStats, []);

  return {
    isLive,
    assessment,
    modules,
    contentPlan,
    governance,
    stats,
  };
}