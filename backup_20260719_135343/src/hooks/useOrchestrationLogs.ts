import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { orchestrationLogs } from "@/mocks/orchestrationLogs";

export interface OrchestrationLog {
  id: string;
  mission_type: string;
  lead_agent: string;
  agents_activated: string[];
  quality_score: number;
  contradictions_detected: number;
  capitalization_done: boolean;
  status: string;
  cross_validation: Record<string, unknown>;
}

export function useOrchestrationLogs() {
  const [data, setData] = useState<OrchestrationLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: live, error } = await supabase
        .from("orchestration_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (live && live.length > 0) {
        const mapped = live.map((row: any) => ({
          id: row.id,
          mission_type: row.mission_type,
          lead_agent: row.lead_agent,
          agents_activated: Array.isArray(row.agents_activated)
            ? row.agents_activated
            : typeof row.agents_activated === "string"
            ? JSON.parse(row.agents_activated)
            : [],
          quality_score: row.quality_score,
          contradictions_detected: row.contradictions_detected,
          capitalization_done: row.capitalization_done,
          status: row.status,
          cross_validation:
            typeof row.cross_validation === "string"
              ? JSON.parse(row.cross_validation)
              : row.cross_validation || {},
        }));
        setData(mapped as OrchestrationLog[]);
      } else {
        setData(orchestrationLogs as OrchestrationLog[]);
      }
    } catch {
      setData(orchestrationLogs as OrchestrationLog[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return { data, loading, refresh };
}



