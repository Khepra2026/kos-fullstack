import { useState, useEffect } from "react";
import { performanceSnapshots, performanceAggregate, performanceHistory } from "@/mocks/performanceSnapshots";
import { supabase } from "@/lib/supabase";

interface UsePerformanceMonitorReturn {
  snapshots: typeof performanceSnapshots;
  aggregate: typeof performanceAggregate;
  history: typeof performanceHistory;
  loading: boolean;
  error: string | null;
  runMonitor: (mode?: string) => Promise<void>;
}

export function usePerformanceMonitor(): UsePerformanceMonitorReturn {
  const [snapshots, setSnapshots] = useState(performanceSnapshots);
  const [aggregate, setAggregate] = useState(performanceAggregate);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: dbSnaps, error: dbError } = await supabase
        .from("performance_snapshots")
        .select("*")
        .order("scanned_at", { ascending: false })
        .limit(12);

      if (dbError) throw dbError;

      if (dbSnaps && dbSnaps.length > 0) {
        const mapped = dbSnaps.map((s: any) => ({
          page_url: s.page_url,
          page_name: s.page_url === "/" ? "Homepage" : s.page_url.replace(/\//g, "").replace(/-/g, " "),
          pagespeed_score: s.pagespeed_score,
          lcp_value: s.lcp_value,
          lcp_score: s.lcp_score,
          cls_value: s.cls_value,
          cls_score: s.cls_score,
          tbt_value: s.tbt_value,
          tbt_score: s.tbt_score,
          fcp_value: s.fcp_value,
          fcp_score: s.fcp_score,
          total_size_kb: s.total_size_kb,
          request_count: s.request_count,
          device_type: s.device_type,
        }));
        setSnapshots(mapped);
      }
    } catch (err: any) {
      console.error("Performance load error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function runMonitor(mode: string = "quick") {
    setLoading(true);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("kos-performance-monitor", {
        body: { mode },
      });
      if (fnError) throw fnError;
      if (result?.data?.aggregate) {
        setAggregate(prev => ({ ...prev, ...result.data.aggregate, grade: result.data.grade, is_big_four_grade: result.data.is_big_four_grade, gap_to_target: result.data.gap_to_target }));
      }
      if (result?.data?.pages) {
        const mapped = result.data.pages.map((p: any) => ({
          page_url: p.page_url,
          page_name: p.page_url === "/" ? "Homepage" : p.page_url.replace(/\//g, "").replace(/-/g, " "),
          pagespeed_score: p.pagespeed_score,
          lcp_value: p.lcp_value,
          lcp_score: p.lcp_score,
          cls_value: p.cls_value,
          cls_score: p.cls_score,
          tbt_value: p.tbt_value,
          tbt_score: p.tbt_score,
          fcp_value: p.fcp_value,
          fcp_score: p.fcp_score,
          total_size_kb: p.total_size_kb,
          request_count: p.request_count,
          device_type: p.device_type,
        }));
        setSnapshots(mapped);
      }
    } catch (err: any) {
      console.error("Monitor error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { snapshots, aggregate, history: performanceHistory, loading, error, runMonitor };
}