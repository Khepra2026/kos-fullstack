import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { financialAnalyses } from "@/mocks/financialAnalyses";

export interface FinancialAnalysis {
  id: string;
  title: string;
  analysis_type: string;
  score: number;
  status: string;
  ratios: Record<string, unknown>;
  projections: Record<string, unknown>;
  scenarios: Record<string, unknown>;
  risk_assessment: Record<string, unknown>;
}

export function useFinancialAnalyses() {
  const [data, setData] = useState<FinancialAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: live, error: err } = await supabase
        .from("financial_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;

      if (live && live.length > 0) {
        setData(live as FinancialAnalysis[]);
        setIsLive(true);
      } else {
        setData(financialAnalyses as FinancialAnalysis[]);
        setIsLive(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de connexion Supabase");
      setData(financialAnalyses as FinancialAnalysis[]);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, isLive, error, refresh: fetchData };
}



