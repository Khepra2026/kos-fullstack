import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  gscOverview,
  topKeywords,
  pagePerformance,
  gscOpportunities,
  gscRecommendations,
  gscSetupChecklist,
} from "@/mocks/gscMonitor";

interface GSCOverview {
  total_impressions_30d: number;
  total_clicks_30d: number;
  average_ctr: number;
  average_position: number;
  keywords_tracked: number;
  keywords_top3: number;
  keywords_improving: number;
  keywords_declining: number;
  pages_indexed: number;
  total_pages_site: number;
  indexation_rate: number;
  clicks_vs_previous_30d: number;
  impressions_vs_previous_30d: number;
}

interface GSCKeyword {
  keyword: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
  trend: string;
}

interface GSCPage {
  url: string;
  title: string;
  impressions: number;
  clicks: number;
  ctr: number;
  indexed: boolean;
  sitemap: boolean;
}

interface GSCOpportunity {
  keyword: string;
  current_position: number;
  potential: string;
  estimated_clicks_gain: number;
  difficulty: string;
  action: string;
}

interface GSCRecommendation {
  priority: string;
  action: string;
  impact: string;
  effort: string;
}

interface GSCChecklistItem {
  step: string;
  status: string;
  note: string | null;
}

interface UseGSCMonitorReturn {
  overview: GSCOverview;
  keywords: GSCKeyword[];
  pages: GSCPage[];
  opportunities: GSCOpportunity[];
  recommendations: GSCRecommendation[];
  checklist: GSCChecklistItem[];
  loading: boolean;
  error: string | null;
  dataSource: "supabase" | "mock";
  runMonitor: () => Promise<void>;
}

export function useGSCMonitor(): UseGSCMonitorReturn {
  const [overview, setOverview] = useState<GSCOverview>(gscOverview);
  const [keywords, setKeywords] = useState<GSCKeyword[]>(topKeywords);
  const [pages, setPages] = useState<GSCPage[]>(pagePerformance);
  const [opportunities, setOpportunities] = useState<GSCOpportunity[]>(gscOpportunities);
  const [recommendations, setRecommendations] = useState<GSCRecommendation[]>(gscRecommendations);
  const [checklist, setChecklist] = useState<GSCChecklistItem[]>(gscSetupChecklist);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"supabase" | "mock">("mock");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        overviewRes,
        keywordsRes,
        pagesRes,
        opportunitiesRes,
        recommendationsRes,
        checklistRes,
      ] = await Promise.all([
        supabase.from("kos_gsc_overview").select("*").order("scan_date", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("kos_gsc_keywords").select("*").order("position", { ascending: true }),
        supabase.from("kos_gsc_pages").select("*").order("impressions", { ascending: false }),
        supabase.from("kos_gsc_opportunities").select("*").order("estimated_clicks_gain", { ascending: false }),
        supabase.from("kos_gsc_recommendations").select("*").order("priority", { ascending: true }),
        supabase.from("kos_gsc_checklist").select("*").order("created_at", { ascending: true }),
      ]);

      const hasSupabaseData =
        overviewRes.data &&
        keywordsRes.data &&
        keywordsRes.data.length > 0;

      if (hasSupabaseData && overviewRes.data) {
        const ov = overviewRes.data;
        setOverview({
          total_impressions_30d: ov.total_impressions_30d,
          total_clicks_30d: ov.total_clicks_30d,
          average_ctr: Number(ov.average_ctr),
          average_position: Number(ov.average_position),
          keywords_tracked: ov.keywords_tracked,
          keywords_top3: ov.keywords_top3,
          keywords_improving: ov.keywords_improving,
          keywords_declining: ov.keywords_declining,
          pages_indexed: ov.pages_indexed,
          total_pages_site: ov.total_pages_site,
          indexation_rate: Number(ov.indexation_rate),
          clicks_vs_previous_30d: Number(ov.clicks_vs_previous_30d),
          impressions_vs_previous_30d: Number(ov.impressions_vs_previous_30d),
        });

        if (keywordsRes.data && keywordsRes.data.length > 0) {
          setKeywords(keywordsRes.data.map((k: any) => ({
            keyword: k.keyword,
            position: k.position,
            impressions: k.impressions,
            clicks: k.clicks,
            ctr: Number(k.ctr),
            trend: k.trend,
          })));
        }

        if (pagesRes.data && pagesRes.data.length > 0) {
          setPages(pagesRes.data.map((p: any) => ({
            url: p.url,
            title: p.title,
            impressions: p.impressions,
            clicks: p.clicks,
            ctr: Number(p.ctr),
            indexed: p.indexed,
            sitemap: p.sitemap,
          })));
        }

        if (opportunitiesRes.data && opportunitiesRes.data.length > 0) {
          setOpportunities(opportunitiesRes.data.map((o: any) => ({
            keyword: o.keyword,
            current_position: o.current_position,
            potential: o.potential,
            estimated_clicks_gain: o.estimated_clicks_gain,
            difficulty: o.difficulty,
            action: o.action,
          })));
        }

        if (recommendationsRes.data && recommendationsRes.data.length > 0) {
          setRecommendations(recommendationsRes.data.map((r: any) => ({
            priority: r.priority,
            action: r.action,
            impact: r.impact,
            effort: r.effort,
          })));
        }

        if (checklistRes.data && checklistRes.data.length > 0) {
          setChecklist(checklistRes.data.map((c: any) => ({
            step: c.step,
            status: c.status,
            note: c.note,
          })));
        }

        setDataSource("supabase");
      } else {
        // Fallback to mock data
        setOverview(gscOverview);
        setKeywords(topKeywords);
        setPages(pagePerformance);
        setOpportunities(gscOpportunities);
        setRecommendations(gscRecommendations);
        setChecklist(gscSetupChecklist);
        setDataSource("mock");
      }
    } catch (err: any) {
      console.error("GSC load error:", err);
      setError(err.message);
      // Fallback to mock on error
      setOverview(gscOverview);
      setKeywords(topKeywords);
      setPages(pagePerformance);
      setOpportunities(gscOpportunities);
      setRecommendations(gscRecommendations);
      setChecklist(gscSetupChecklist);
      setDataSource("mock");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const runMonitor = useCallback(async () => {
    setLoading(true);
    await loadData();
  }, [loadData]);

  return {
    overview,
    keywords,
    pages,
    opportunities,
    recommendations,
    checklist,
    loading,
    error,
    dataSource,
    runMonitor,
  };
}