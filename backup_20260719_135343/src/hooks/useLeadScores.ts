import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { logHookAudit, createAuditEntry } from "@/utils/hookAuditLogger";

interface LeadScoreRecord {
  id: number;
  lead_name: string;
  company: string;
  sector: string;
  country: string;
  predictive_score: number;
  engagement_score: number;
  firmographic_score: number;
  behavioral_score: number;
  conversion_probability: number;
  estimated_value_fcfa: number;
  source_url: string;
  next_best_action: string;
  risk_of_churn: string;
  signals: string[];
}

interface PipelineStats {
  total_leads: number;
  hot: number;
  warm: number;
  cold: number;
  hot_percentage: number;
  total_pipeline_value_fcfa: number;
  average_score: number;
  average_conversion_probability: number;
  deals_won_30d: number;
  deals_won_value_30d: number;
  average_deal_size_fcfa: number;
  average_cycle_days: number;
}

interface UseLeadScoresReturn {
  leads: LeadScoreRecord[];
  pipeline: PipelineStats;
  loading: boolean;
  error: string | null;
  runScoring: () => Promise<void>;
  isLive: boolean;
}

const EMPTY_PIPELINE: PipelineStats = {
  total_leads: 0,
  hot: 0,
  warm: 0,
  cold: 0,
  hot_percentage: 0,
  total_pipeline_value_fcfa: 0,
  average_score: 0,
  average_conversion_probability: 0,
  deals_won_30d: 0,
  deals_won_value_30d: 0,
  average_deal_size_fcfa: 0,
  average_cycle_days: 0,
};

function mapScoreRow(l: any): LeadScoreRecord {
  return {
    id: l.id,
    lead_name: l.lead_name,
    company: l.company,
    sector: l.sector,
    country: l.country,
    predictive_score: l.predictive_score,
    engagement_score: l.engagement_score,
    firmographic_score: l.firmographic_score,
    behavioral_score: l.behavioral_score,
    conversion_probability: l.conversion_probability,
    estimated_value_fcfa: l.estimated_value_fcfa,
    source_url: l.source_url || '',
    next_best_action: l.next_best_action,
    risk_of_churn: l.risk_of_churn,
    signals: l.signals || [],
  };
}

function computePipelineStats(mapped: LeadScoreRecord[]): PipelineStats {
  if (mapped.length === 0) return EMPTY_PIPELINE;
  const hot = mapped.filter((l) => l.predictive_score >= 70).length;
  const warm = mapped.filter((l) => l.predictive_score >= 40 && l.predictive_score < 70).length;
  const cold = mapped.filter((l) => l.predictive_score < 40).length;
  const totalValue = mapped.reduce((sum, l) => sum + l.estimated_value_fcfa, 0);
  const avgScore = Math.round(mapped.reduce((s, l) => s + l.predictive_score, 0) / mapped.length);
  const avgProb = Math.round(mapped.reduce((s, l) => s + l.conversion_probability, 0) / mapped.length);

  return {
    total_leads: mapped.length,
    hot,
    warm,
    cold,
    hot_percentage: Math.round((hot / mapped.length) * 100),
    total_pipeline_value_fcfa: totalValue,
    average_score: avgScore,
    average_conversion_probability: avgProb,
    deals_won_30d: 0,
    deals_won_value_30d: 0,
    average_deal_size_fcfa: Math.round(totalValue / mapped.length),
    average_cycle_days: 45,
  };
}

export function useLeadScores(): UseLeadScoresReturn {
  const [leads, setLeads] = useState<LeadScoreRecord[]>([]);
  const [pipeline, setPipeline] = useState<PipelineStats>(EMPTY_PIPELINE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const loadData = useCallback(async () => {
    const startTime = performance.now();
    try {
      const { data: dbScores, error: dbError } = await supabase
        .from("lead_scores")
        .select("*")
        .order("predictive_score", { ascending: false })
        .limit(20);

      const durationMs = Math.round(performance.now() - startTime);

      if (dbError) throw dbError;

      if (dbScores && dbScores.length > 0) {
        const mapped = dbScores.map(mapScoreRow);
        setLeads(mapped);
        setPipeline(computePipelineStats(mapped));
        setIsLive(true);
        const entry = createAuditEntry('useLeadScores', 'supabase', dbScores.length, 'lead_scores', undefined, durationMs);
        logHookAudit(entry);
      } else {
        setIsLive(false);
        const entry = createAuditEntry('useLeadScores', 'empty', 0, 'lead_scores', 'Table vide — pas de leads', durationMs);
        logHookAudit(entry);
      }
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - startTime);
      console.error("Lead scores load error:", err);
      setError(err.message);
      setIsLive(false);
      const entry = createAuditEntry('useLeadScores', 'error', 0, 'lead_scores', err.message, durationMs);
      logHookAudit(entry);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("lead_scores_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lead_scores" },
        () => {
          loadData();
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[LeadScoring] Realtime subscription active");
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData]);

  async function runScoring() {
    setLoading(true);
    setError(null);
    const startTime = performance.now();
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("kos-lead-scoring", {
        body: {},
      });
      const durationMs = Math.round(performance.now() - startTime);

      if (fnError) throw fnError;
      let mappedLeads: LeadScoreRecord[] = [];
      if (result?.data?.leads) {
        mappedLeads = result.data.leads.slice(0, 20).map((l: any) => ({
          id: l.lead_id || l.id,
          lead_name: l.lead_name,
          company: l.company,
          sector: l.sector,
          country: l.country,
          predictive_score: l.predictive_score,
          engagement_score: l.engagement_score,
          firmographic_score: l.firmographic_score,
          behavioral_score: l.behavioral_score,
          conversion_probability: l.conversion_probability,
          estimated_value_fcfa: l.estimated_value_fcfa,
          next_best_action: l.next_best_action,
          risk_of_churn: l.risk_of_churn,
          signals: l.signals || [],
        }));
        setLeads(mappedLeads);
        setPipeline(computePipelineStats(mappedLeads));
      }
      if (result?.data?.pipeline_stats) {
        setPipeline((prev) => ({ ...prev, ...result.data.pipeline_stats }));
      }
      setIsLive(true);
      const entry = createAuditEntry('useLeadScores', 'supabase_edge_function', mappedLeads.length, 'kos-lead-scoring', undefined, durationMs);
      logHookAudit(entry);
    } catch (err: any) {
      console.error("Scoring error:", err);
      setError(err.message);
      const entry = createAuditEntry('useLeadScores', 'error', 0, 'kos-lead-scoring', err.message, performance.now() - startTime);
      logHookAudit(entry);
    } finally {
      setLoading(false);
    }
  }

  return { leads, pipeline, loading, error, runScoring, isLive };
}



