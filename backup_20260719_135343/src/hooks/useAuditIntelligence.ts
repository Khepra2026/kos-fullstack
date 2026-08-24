import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { auditIntelligenceResults } from "@/mocks/auditIntelligence";

export interface AuditIntelligenceResult {
  id: string;
  title: string;
  audit_type: string;
  score: number;
  compliance_score: number;
  status: string;
  frameworks: string;
  gaps: { gap: string; severity: string; reference: string }[];
  risks: { risk: string; probability: string; impact: string }[];
  recommendations: Record<string, unknown>;
  executive_summary?: string;
}

interface AuditRow {
  id: string;
  title: string;
  audit_type: string;
  score: number;
  compliance_score: number;
  status: string;
  frameworks: string;
  gaps: { gap: string; severity: string; reference: string }[];
  risks: { risk: string; probability: string; impact: string }[];
  recommendations: Record<string, unknown>;
  executive_summary?: string;
}

export function useAuditIntelligence() {
  const [data, setData] = useState<AuditIntelligenceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: live, error: err } = await supabase
        .from("audit_intelligence")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;

      if (live && live.length > 0) {
        setData(live as AuditIntelligenceResult[]);
        setIsLive(true);
      } else {
        setData(auditIntelligenceResults as AuditIntelligenceResult[]);
        setIsLive(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de connexion Supabase");
      setData(auditIntelligenceResults as AuditIntelligenceResult[]);
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



