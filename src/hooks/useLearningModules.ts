import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { learningModules } from "@/mocks/learningModules";

export interface LearningModule {
  id: string;
  title: string;
  module_type: string;
  domain: string;
  duration_hours: number;
  level: string;
  status: string;
  sop_count: number;
  learning_path: { module: string; duree: string }[];
  assessments: { type: string; questions?: number }[];
  certifications: { cert: string; validite: string }[];
}

export function useLearningModules() {
  const [data, setData] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data: live } = await supabase.from("learning_modules").select("*").order("created_at", { ascending: false });
      if (live && live.length > 0) setData(live as LearningModule[]);
      else setData(learningModules as LearningModule[]);
    } catch {
      setData(learningModules as LearningModule[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, refresh };
}



