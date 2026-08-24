import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { policyDocuments } from "@/mocks/policyDocuments";

export interface PolicyDocument {
  id: string;
  title: string;
  policy_type: string;
  domain: string;
  version: string;
  status: string;
  sections: { section: string; content: string }[];
  regulatory_refs: string[];
}

export function usePolicyDocuments() {
  const [data, setData] = useState<PolicyDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data: live } = await supabase.from("policy_documents").select("*").order("created_at", { ascending: false });
      if (live && live.length > 0) setData(live as PolicyDocument[]);
      else setData(policyDocuments as PolicyDocument[]);
    } catch {
      setData(policyDocuments as PolicyDocument[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}



