import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  KOS_GLOBAL_REPORT,
  KOS_AGENTS,
  SCAN_PHASES,
  REPORT_SECTIONS,
} from "@/mocks/qualitySystem";
import type {
  agent,
  globalReport,
} from "@/mocks/qualitySystem";

interface ScanPhase {
  phase: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  status: string;
}

interface ReportSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface UseQualitySystemReturn {
  globalReport: globalReport;
  agents: agent[];
  scanPhases: ScanPhase[];
  reportSections: ReportSection[];
  loading: boolean;
  error: string | null;
  dataSource: "supabase" | "mock";
  refresh: () => Promise<void>;
}

export function useQualitySystem(): UseQualitySystemReturn {
  const [globalReport, setGlobalReport] = useState<globalReport>(KOS_GLOBAL_REPORT);
  const [agents, setAgents] = useState<agent[]>(KOS_AGENTS);
  const [scanPhases, setScanPhases] = useState<ScanPhase[]>(SCAN_PHASES);
  const [reportSections, setReportSections] = useState<ReportSection[]>(REPORT_SECTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"supabase" | "mock">("mock");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [globalRes, agentsRes, phasesRes, sectionsRes] = await Promise.all([
        supabase.from("kos_quality_global_report").select("*").order("generated_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("kos_quality_agents").select("*").order("number"),
        supabase.from("kos_quality_scan_phases").select("*").order("phase"),
        supabase.from("kos_quality_report_sections").select("*"),
      ]);

      const hasSupabaseData = agentsRes.data && agentsRes.data.length > 0;

      if (hasSupabaseData) {
        // Global Report
        if (globalRes.data) {
          const gr = globalRes.data;
          setGlobalReport({
            generatedAt: gr.generated_at,
            globalScore: Number(gr.global_score),
            targetScore: Number(gr.target_score),
            totalErrors: gr.total_errors,
            criticalErrors: gr.critical_errors,
            majorErrors: gr.major_errors,
            minorErrors: gr.minor_errors,
            errorsFixed: gr.errors_fixed,
            linksScanned: gr.links_scanned,
            linksValid: gr.links_valid,
            linksBroken: gr.links_broken,
            pagesIndexed: gr.pages_indexed,
            pagesTarget: gr.pages_target,
            coreWebVitals: {
              lcp: { value: gr.cwv_lcp_value, target: gr.cwv_lcp_target, status: gr.cwv_lcp_status },
              cls: { value: gr.cwv_cls_value, target: gr.cwv_cls_target, status: gr.cwv_cls_status },
              inp: { value: gr.cwv_inp_value, target: gr.cwv_inp_target, status: gr.cwv_inp_status },
            },
            contentQualityScore: Number(gr.content_quality_score),
            legalRisksDetected: gr.legal_risks_detected,
            socialLinksValid: gr.social_links_valid,
            socialLinksTotal: gr.social_links_total,
          });
        }

        // Agents with JSONB kpis, errors, actions
        const mappedAgents: agent[] = agentsRes.data.map((a: any) => ({
          id: a.id,
          number: a.number,
          name: a.name,
          mission: a.mission,
          icon: a.icon,
          color: a.color,
          status: a.status,
          score: Number(a.score),
          lastScan: a.last_scan,
          kpis: Array.isArray(a.kpis) ? a.kpis : [],
          errors: Array.isArray(a.errors) ? a.errors : [],
          actions: Array.isArray(a.actions) ? a.actions : [],
        }));
        setAgents(mappedAgents);

        // Scan Phases
        if (phasesRes.data && phasesRes.data.length > 0) {
          setScanPhases(
            phasesRes.data.map((p: any) => ({
              phase: p.phase,
              name: p.name,
              description: p.description,
              icon: p.icon,
              color: p.color,
              duration: p.duration,
              status: p.status,
            }))
          );
        }

        // Report Sections
        if (sectionsRes.data && sectionsRes.data.length > 0) {
          setReportSections(
            sectionsRes.data.map((s: any) => ({
              id: s.id,
              title: s.title,
              icon: s.icon,
              description: s.description,
            }))
          );
        }

        setDataSource("supabase");
      } else {
        // Fallback to mock
        setGlobalReport(KOS_GLOBAL_REPORT);
        setAgents(KOS_AGENTS);
        setScanPhases(SCAN_PHASES);
        setReportSections(REPORT_SECTIONS);
        setDataSource("mock");
      }
    } catch (err: any) {
      console.error("Quality System load error:", err);
      setError(err.message);
      setGlobalReport(KOS_GLOBAL_REPORT);
      setAgents(KOS_AGENTS);
      setScanPhases(SCAN_PHASES);
      setReportSections(REPORT_SECTIONS);
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
    globalReport,
    agents,
    scanPhases,
    reportSections,
    loading,
    error,
    dataSource,
    refresh,
  };
}



