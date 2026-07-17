import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  UNIFIED_GLOBAL_STATE,
  UNIFIED_AGENTS,
  UNIFIED_WORKFLOW_PHASES,
  UNIFIED_KPIS,
  UNIFIED_REPORT_SECTIONS,
  UNIFIED_ROADMAP,
  LAYER_CONFIG,
} from "@/mocks/kosUnifiedAutopilot";
import type {
  UnifiedGlobalState,
  UnifiedAgent,
  UnifiedWorkflowPhase,
  UnifiedKPI,
  UnifiedReportSection,
  UnifiedRoadmapItem,
} from "@/mocks/kosUnifiedAutopilot";

interface LayerConfigItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  bgClass: string;
  borderClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  headerBg: string;
  headerBorder: string;
  description: string;
}

interface UnifiedStats {
  totalAgents: number;
  activeAgents: number;
  partialAgents: number;
  totalDetections: number;
  criticalDetections: number;
  majorDetections: number;
  minorDetections: number;
  fixedDetections: number;
  totalActions: number;
  doneActions: number;
  inProgressActions: number;
  pendingActions: number;
  autoApplied: number;
}

interface UseUnifiedAutopilotReturn {
  globalState: UnifiedGlobalState;
  agents: UnifiedAgent[];
  workflowPhases: UnifiedWorkflowPhase[];
  kpis: UnifiedKPI[];
  reports: UnifiedReportSection[];
  roadmap: UnifiedRoadmapItem[];
  layerConfig: Record<string, LayerConfigItem>;
  stats: UnifiedStats;
  loading: boolean;
  error: string | null;
  dataSource: "supabase" | "mock";
  refresh: () => Promise<void>;
}

function computeStats(agents: UnifiedAgent[]): UnifiedStats {
  const allDetections = agents.flatMap((a) => a.detections);
  const allActions = agents.flatMap((a) => a.actions);

  return {
    totalAgents: agents.length,
    activeAgents: agents.filter((a) => a.status === "active").length,
    partialAgents: agents.filter((a) => a.status === "partial").length,
    totalDetections: allDetections.length,
    criticalDetections: allDetections.filter((d) => d.severity === "critical").length,
    majorDetections: allDetections.filter((d) => d.severity === "major").length,
    minorDetections: allDetections.filter((d) => d.severity === "minor").length,
    fixedDetections: allDetections.filter((d) => d.status === "fixed").length,
    totalActions: allActions.length,
    doneActions: allActions.filter((a) => a.status === "done").length,
    inProgressActions: allActions.filter((a) => a.status === "in_progress").length,
    pendingActions: allActions.filter((a) => a.status === "pending").length,
    autoApplied: allActions.filter((a) => a.autoApplied).length,
  };
}

export function useUnifiedAutopilot(): UseUnifiedAutopilotReturn {
  const [globalState, setGlobalState] = useState<UnifiedGlobalState>(UNIFIED_GLOBAL_STATE);
  const [agents, setAgents] = useState<UnifiedAgent[]>(UNIFIED_AGENTS);
  const [workflowPhases, setWorkflowPhases] = useState<UnifiedWorkflowPhase[]>(UNIFIED_WORKFLOW_PHASES);
  const [kpis, setKpis] = useState<UnifiedKPI[]>(UNIFIED_KPIS);
  const [reports, setReports] = useState<UnifiedReportSection[]>(UNIFIED_REPORT_SECTIONS);
  const [roadmap, setRoadmap] = useState<UnifiedRoadmapItem[]>(UNIFIED_ROADMAP);
  const [stats, setStats] = useState<UnifiedStats>(computeStats(UNIFIED_AGENTS));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"supabase" | "mock">("mock");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let supabaseFailed = false;
      let agentsData: any[] = [];
      let globalData: any = null;
      let workflowData: any[] = [];
      let kpisData: any[] = [];
      let reportsData: any[] = [];
      let roadmapData: any[] = [];

      try {
        const [globalRes, agentsRes, workflowRes, kpisRes, reportsRes, roadmapRes] =
          await Promise.all([
            supabase.from("kos_unified_global_state").select("*").order("generated_at", { ascending: false }).limit(1).maybeSingle(),
            supabase.from("kos_unified_agents").select("*").order("number"),
            supabase.from("kos_unified_workflow_phases").select("*").order("phase"),
            supabase.from("kos_unified_kpis").select("*"),
            supabase.from("kos_unified_reports").select("*"),
            supabase.from("kos_unified_roadmap").select("*").order("id"),
          ]);

        if (agentsRes.error && agentsRes.error.code === 'PGRST205') supabaseFailed = true;
        if (globalRes.error && globalRes.error.code === 'PGRST205') supabaseFailed = true;

        agentsData = agentsRes.data || [];
        globalData = globalRes.data;
        workflowData = workflowRes.data || [];
        kpisData = kpisRes.data || [];
        reportsData = reportsRes.data || [];
        roadmapData = roadmapRes.data || [];
      } catch (supaErr: any) {
        console.warn("Supabase tables not available, using mock data:", supaErr.message);
        supabaseFailed = true;
      }

      const hasSupabaseData = !supabaseFailed && agentsData.length > 0;

      if (hasSupabaseData) {
        // Global State
        if (globalData) {
          const gs = globalData;
          const rawLayers = (gs.layers || {}) as Record<string, unknown>;
          const normalizedLayers = {
            soc: (rawLayers.soc || { score: 0, status: 'critical', agents: 0 }) as UnifiedGlobalState['layers']['soc'],
            'seo-geo-aeo': (rawLayers['seo-geo-aeo'] || rawLayers.seo || { score: 0, status: 'critical', agents: 0 }) as UnifiedGlobalState['layers']['seo-geo-aeo'],
            'content-ai': (rawLayers['content-ai'] || rawLayers.content || { score: 0, status: 'critical', agents: 0 }) as UnifiedGlobalState['layers']['content-ai'],
          };
          setGlobalState({
            generatedAt: gs.generated_at || new Date().toISOString(),
            globalScore: Number(gs.global_score) || 0,
            targetScore: Number(gs.target_score) || 9.5,
            layers: normalizedLayers,
            coreWebVitals: (gs.core_web_vitals as UnifiedGlobalState["coreWebVitals"]) || {
              lcp: { value: 'N/A', target: '2.5s', status: 'pass' },
              cls: { value: 'N/A', target: '0.1', status: 'pass' },
              inp: { value: 'N/A', target: '200ms', status: 'pass' },
            },
          });
        }

        // Agents with JSONB fields
        const mappedAgents: UnifiedAgent[] = agentsData.map((a: any) => ({
          id: a.id || '',
          layer: a.layer || 'soc',
          number: a.number || '',
          name: a.name || '',
          mission: a.mission || '',
          icon: a.icon || 'ri-robot-line',
          color: a.color || '#888',
          status: a.status || 'gap',
          score: Number(a.score) || 0,
          lastScan: a.last_scan || new Date().toISOString(),
          kpis: Array.isArray(a.kpis) ? a.kpis : [],
          detections: Array.isArray(a.detections) ? a.detections : [],
          actions: Array.isArray(a.actions) ? a.actions : [],
        }));
        setAgents(mappedAgents);
        setStats(computeStats(mappedAgents));

        // Workflow Phases
        if (workflowData.length > 0) {
          setWorkflowPhases(
            workflowData.map((p: any) => ({
              phase: p.phase || 0,
              name: p.name || '',
              description: p.description || '',
              icon: p.icon || 'ri-git-branch-line',
              color: p.color || '#888',
              duration: p.duration || '',
              status: p.status || 'pending',
            }))
          );
        }

        // KPIs
        if (kpisData.length > 0) {
          setKpis(
            kpisData.map((k: any) => ({
              id: k.id || '',
              category: k.category || 'soc',
              label: k.label || '',
              current: k.current || '0',
              target: k.target || '0',
              unit: k.unit || '',
              trend: k.trend || 'stable',
              icon: k.icon || 'ri-bar-chart-line',
            }))
          );
        }

        // Reports
        if (reportsData.length > 0) {
          setReports(
            reportsData.map((r: any) => ({
              id: r.id || '',
              title: r.title || '',
              icon: r.icon || 'ri-file-chart-line',
              description: r.description || '',
            }))
          );
        }

        // Roadmap
        if (roadmapData.length > 0) {
          setRoadmap(
            roadmapData.map((r: any) => ({
              id: r.id || '',
              timeline: r.timeline || '',
              title: r.title || '',
              description: r.description || '',
              progress: Number(r.progress) || 0,
              icon: r.icon || 'ri-road-map-line',
              color: r.color || '#888',
              deliverables: Array.isArray(r.deliverables) ? r.deliverables : [],
            }))
          );
        }

        setDataSource("supabase");
      } else {
        // Fallback to mock
        setGlobalState(UNIFIED_GLOBAL_STATE);
        setAgents(UNIFIED_AGENTS);
        setWorkflowPhases(UNIFIED_WORKFLOW_PHASES);
        setKpis(UNIFIED_KPIS);
        setReports(UNIFIED_REPORT_SECTIONS);
        setRoadmap(UNIFIED_ROADMAP);
        setStats(computeStats(UNIFIED_AGENTS));
        setDataSource("mock");
      }
    } catch (err: any) {
      console.error("Unified Autopilot load error:", err);
      setError(err.message || "Erreur inconnue");
      setGlobalState(UNIFIED_GLOBAL_STATE);
      setAgents(UNIFIED_AGENTS);
      setWorkflowPhases(UNIFIED_WORKFLOW_PHASES);
      setKpis(UNIFIED_KPIS);
      setReports(UNIFIED_REPORT_SECTIONS);
      setRoadmap(UNIFIED_ROADMAP);
      setStats(computeStats(UNIFIED_AGENTS));
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
    globalState,
    agents,
    workflowPhases,
    kpis,
    reports,
    roadmap,
    layerConfig: LAYER_CONFIG as unknown as Record<string, LayerConfigItem>,
    stats,
    loading,
    error,
    dataSource,
    refresh,
  };
}