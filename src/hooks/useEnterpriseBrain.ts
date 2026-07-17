import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  enterpriseBrain,
  digitalTwins,
  strategicMemory,
  intelligenceOSComponents,
  selfImprovementCycles,
  hallucinationDetections,
} from "@/mocks/kosEnterpriseBrainOS";

export interface BrainDomain {
  id: number;
  knowledge_domain: string;
  knowledge_count: number;
  last_enriched: string;
  access_frequency: string;
  connection_strength: number;
  created_at: string;
  updated_at: string;
}

export interface ScenarioItem {
  name: string;
  result: string;
  probability: string;
}

export interface DigitalTwin {
  id: string;
  twin_name: string;
  domain: string;
  represented_entities: string[];
  simulation_scenarios: { scenarios: ScenarioItem[] };
  last_simulation_date: string;
  prediction_accuracy: number;
  key_metrics: Record<string, string | number>;
  decision_impact: {
    pending_decisions: number;
    high_impact_decisions: number;
    last_decision: string;
    simulation_confidence: number;
  };
  metadata: {
    version: string;
    updated_by: string;
    next_simulation_scheduled: string;
  };
  created_at: string;
}

export interface MemoryItem {
  id: number;
  memory_type: string;
  title: string;
  content: string;
  tags: string;
  importance_level: string;
  retrieval_count: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

export interface IntelligenceOSComponent {
  id: number;
  component_type: string;
  component_name: string;
  integration_status: string;
  health_score: number;
  last_sync: string;
  dependencies: string;
  alerts_active: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SelfImprovementCycle {
  id: number;
  improvement_area: string;
  current_performance: number;
  target_performance: number;
  improvement_actions: string;
  progress_pct: number;
  last_cycle: string;
  status: string;
  created_at: string;
}

export interface HallucinationDetection {
  id: number;
  content_source: string;
  claim: string;
  verification_status: string;
  confidence_score: number;
  factual_basis: string;
  contradictory_source: string;
  resolution: string;
  detected_at: string;
  created_at: string;
}

export interface BrainStats {
  totalKnowledge: number;
  avgHealthScore: number;
  avgPredictionAccuracy: number;
  avgImprovementProgress: number;
  hallucinationRate: number;
}

interface UseEnterpriseBrainReturn {
  brainDomains: BrainDomain[];
  twins: DigitalTwin[];
  memories: MemoryItem[];
  osComponents: IntelligenceOSComponent[];
  improvementCycles: SelfImprovementCycle[];
  detections: HallucinationDetection[];
  stats: BrainStats;
  loading: boolean;
  error: string | null;
  dataSource: "supabase" | "mock";
  refresh: () => Promise<void>;
}

function computeStats(
  osComponents: IntelligenceOSComponent[],
  twins: DigitalTwin[],
  improvements: SelfImprovementCycle[],
  hallDetections: HallucinationDetection[],
  domains: BrainDomain[]
): BrainStats {
  const totalKnowledge = domains.reduce((s, d) => s + d.knowledge_count, 0);
  const avgHealthScore = osComponents.length > 0
    ? osComponents.reduce((s, c) => s + c.health_score, 0) / osComponents.length
    : 0;
  const avgPredictionAccuracy = twins.length > 0
    ? Math.round(twins.reduce((s, t) => s + t.prediction_accuracy, 0) / twins.length)
    : 0;
  const avgImprovementProgress = improvements.length > 0
    ? Math.round(improvements.reduce((s, c) => s + c.progress_pct, 0) / improvements.length)
    : 0;
  const hallucinationRate = hallDetections.length > 0
    ? Math.round((hallDetections.filter(h => h.verification_status.includes("Non Vérifié")).length / hallDetections.length) * 100)
    : 0;

  return { totalKnowledge, avgHealthScore, avgPredictionAccuracy, avgImprovementProgress, hallucinationRate };
}

export function useEnterpriseBrain(): UseEnterpriseBrainReturn {
  const [brainDomains, setBrainDomains] = useState<BrainDomain[]>(enterpriseBrain);
  const [twins, setTwins] = useState<DigitalTwin[]>(digitalTwins);
  const [memories, setMemories] = useState<MemoryItem[]>(strategicMemory);
  const [osComponents, setOsComponents] = useState<IntelligenceOSComponent[]>(intelligenceOSComponents);
  const [improvementCycles, setImprovementCycles] = useState<SelfImprovementCycle[]>(selfImprovementCycles);
  const [detections, setDetections] = useState<HallucinationDetection[]>(hallucinationDetections);
  const [stats, setStats] = useState<BrainStats>(
    computeStats(intelligenceOSComponents, digitalTwins, selfImprovementCycles, hallucinationDetections, enterpriseBrain)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"supabase" | "mock">("mock");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [brainRes, twinsRes, memoryRes, osRes, improveRes, detectRes] = await Promise.all([
        supabase.from("enterprise_brain").select("*").order("id"),
        supabase.from("kos_enterprise_digital_twins").select("*").order("prediction_accuracy", { ascending: false }),
        supabase.from("kos_enterprise_strategic_memory").select("*").order("id"),
        supabase.from("kos_enterprise_intelligence_os").select("*").order("id"),
        supabase.from("kos_enterprise_self_improvement").select("*").order("id"),
        supabase.from("kos_enterprise_hallucination_detection").select("*").order("id"),
      ]);

      const hasSupabaseData = brainRes.data && brainRes.data.length > 0;

      if (hasSupabaseData) {
        // Brain Domains
        const mappedDomains: BrainDomain[] = brainRes.data!.map((d: any) => ({
          id: d.id,
          knowledge_domain: d.knowledge_domain,
          knowledge_count: d.knowledge_count,
          last_enriched: d.last_enriched,
          access_frequency: d.access_frequency,
          connection_strength: Number(d.connection_strength),
          created_at: d.created_at,
          updated_at: d.updated_at,
        }));
        setBrainDomains(mappedDomains);

        // Digital Twins
        const mappedTwins: DigitalTwin[] = twinsRes.data && twinsRes.data.length > 0
          ? twinsRes.data.map((t: any) => ({
            id: t.id,
            twin_name: t.twin_name,
            domain: t.domain,
            represented_entities: Array.isArray(t.represented_entities) ? t.represented_entities : [],
            simulation_scenarios: typeof t.simulation_scenarios === "string"
              ? JSON.parse(t.simulation_scenarios)
              : (t.simulation_scenarios || { scenarios: [] }),
            last_simulation_date: t.last_simulation_date,
            prediction_accuracy: Number(t.prediction_accuracy),
            key_metrics: typeof t.key_metrics === "string" ? JSON.parse(t.key_metrics) : (t.key_metrics || {}),
            decision_impact: typeof t.decision_impact === "string" ? JSON.parse(t.decision_impact) : (t.decision_impact || {}),
            metadata: typeof t.metadata === "string" ? JSON.parse(t.metadata) : (t.metadata || {}),
            created_at: t.created_at,
          }))
          : [];
        setTwins(mappedTwins.length > 0 ? mappedTwins : digitalTwins);

        // Strategic Memory
        const mappedMemories: MemoryItem[] = memoryRes.data && memoryRes.data.length > 0
          ? memoryRes.data.map((m: any) => ({
            id: m.id,
            memory_type: m.memory_type,
            title: m.title,
            content: m.content,
            tags: m.tags,
            importance_level: m.importance_level,
            retrieval_count: m.retrieval_count,
            last_accessed: m.last_accessed,
            created_at: m.created_at,
            updated_at: m.updated_at,
          }))
          : [];
        setMemories(mappedMemories.length > 0 ? mappedMemories : strategicMemory);

        // Intelligence OS Components
        const mappedOS: IntelligenceOSComponent[] = osRes.data && osRes.data.length > 0
          ? osRes.data.map((c: any) => ({
            id: c.id,
            component_type: c.component_type,
            component_name: c.component_name,
            integration_status: c.integration_status,
            health_score: Number(c.health_score),
            last_sync: c.last_sync,
            dependencies: c.dependencies,
            alerts_active: c.alerts_active,
            status: c.status,
            created_at: c.created_at,
            updated_at: c.updated_at,
          }))
          : [];
        setOsComponents(mappedOS.length > 0 ? mappedOS : intelligenceOSComponents);

        // Self-Improvement
        const mappedImprove: SelfImprovementCycle[] = improveRes.data && improveRes.data.length > 0
          ? improveRes.data.map((c: any) => ({
            id: c.id,
            improvement_area: c.improvement_area,
            current_performance: Number(c.current_performance),
            target_performance: Number(c.target_performance),
            improvement_actions: c.improvement_actions,
            progress_pct: c.progress_pct,
            last_cycle: c.last_cycle,
            status: c.status,
            created_at: c.created_at,
          }))
          : [];
        setImprovementCycles(mappedImprove.length > 0 ? mappedImprove : selfImprovementCycles);

        // Hallucination Detection
        const mappedDetect: HallucinationDetection[] = detectRes.data && detectRes.data.length > 0
          ? detectRes.data.map((d: any) => ({
            id: d.id,
            content_source: d.content_source,
            claim: d.claim,
            verification_status: d.verification_status,
            confidence_score: Number(d.confidence_score),
            factual_basis: d.factual_basis,
            contradictory_source: d.contradictory_source,
            resolution: d.resolution,
            detected_at: d.detected_at,
            created_at: d.created_at,
          }))
          : [];
        setDetections(mappedDetect.length > 0 ? mappedDetect : hallucinationDetections);

        setStats(computeStats(
          mappedOS.length > 0 ? mappedOS : intelligenceOSComponents,
          mappedTwins.length > 0 ? mappedTwins : digitalTwins,
          mappedImprove.length > 0 ? mappedImprove : selfImprovementCycles,
          mappedDetect.length > 0 ? mappedDetect : hallucinationDetections,
          mappedDomains
        ));

        setDataSource("supabase");
      } else {
        // Fallback to mock
        setBrainDomains(enterpriseBrain);
        setTwins(digitalTwins);
        setMemories(strategicMemory);
        setOsComponents(intelligenceOSComponents);
        setImprovementCycles(selfImprovementCycles);
        setDetections(hallucinationDetections);
        setStats(computeStats(intelligenceOSComponents, digitalTwins, selfImprovementCycles, hallucinationDetections, enterpriseBrain));
        setDataSource("mock");
      }
    } catch (err: any) {
      console.error("Enterprise Brain load error:", err);
      setError(err.message);
      setBrainDomains(enterpriseBrain);
      setTwins(digitalTwins);
      setMemories(strategicMemory);
      setOsComponents(intelligenceOSComponents);
      setImprovementCycles(selfImprovementCycles);
      setDetections(hallucinationDetections);
      setStats(computeStats(intelligenceOSComponents, digitalTwins, selfImprovementCycles, hallucinationDetections, enterpriseBrain));
      setDataSource("mock");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await loadData();
  }, [loadData]);

  return {
    brainDomains,
    twins,
    memories,
    osComponents,
    improvementCycles,
    detections,
    stats,
    loading,
    error,
    dataSource,
    refresh,
  };
}