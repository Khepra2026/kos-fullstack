import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { knowledgeCaptures } from "@/mocks/knowledgeCaptures";

export interface KnowledgeCapture {
  id: string;
  title: string;
  client_sector: string;
  regulatory_domain: string;
  score: number;
  status: string;
  problematique: string;
  methodology: string;
  key_learnings: { learning: string; impact: string }[];
  tags: string[];
}

export function useKnowledgeCaptures() {
  const [data, setData] = useState<KnowledgeCapture[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data: live } = await supabase.from("knowledge_captures").select("*").order("created_at", { ascending: false });
      if (live && live.length > 0) setData(live as KnowledgeCapture[]);
      else setData(knowledgeCaptures as KnowledgeCapture[]);
    } catch {
      setData(knowledgeCaptures as KnowledgeCapture[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}