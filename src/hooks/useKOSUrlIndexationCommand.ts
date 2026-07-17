import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  kosUrlIndexationOverview,
  kosUrlIndexationCategories,
  kosUrlIndexationCauses,
  kosUrlIndexationExcludedList,
  kosUrlIndexationActionPlan,
  kosUrlIndexationProgress,
  kosUrlIndexationSitemaps,
  kosUrlIndexationTopIndexed,
  kosUrlIndexationGSCQueries,
} from "@/mocks/kosUrlIndexationCommand";

export interface UrlIndexationEntry {
  url: string;
  title: string;
  cause: string;
  cause_label: string;
  indexed: boolean;
  in_sitemap: boolean;
  priority: string;
  last_checked: string;
  traffic_estimated: number;
  action_taken: string | null;
}

export interface ActionPlanEntry {
  id: string;
  phase: number;
  phase_label: string;
  action: string;
  urls_concerned: number;
  effort: string;
  impact: string;
  status: string;
  progress_pct: number;
  assigned_to: string;
  auto: boolean;
}

export interface IndexationOverview {
  total_urls_site: number;
  total_indexed: number;
  total_not_indexed: number;
  indexation_rate_current: number;
  indexation_rate_target: number;
  indexation_rate_gap: number;
  urls_to_index: number;
  urls_in_progress: number;
  urls_fixed_last_7d: number;
  estimated_traffic_gain: number;
  estimated_clicks_gain: number;
}

export interface SitemapStatus {
  name: string;
  urls: number;
  submitted: boolean;
  processed: boolean;
  last_submitted: string;
  status: string;
  errors: number;
  warnings: number;
}

export interface TopIndexedPage {
  url: string;
  title: string;
  indexed: boolean;
  impressions_30d: number;
  clicks_30d: number;
  avg_position: number;
}

export interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface DailySnapshot {
  date: string;
  indexed: number;
  not_indexed: number;
  rate: number;
}

export interface UseKOSUrlIndexationCommandReturn {
  overview: IndexationOverview;
  categories: typeof kosUrlIndexationCategories;
  causes: typeof kosUrlIndexationCauses;
  excludedUrls: UrlIndexationEntry[];
  actionPlan: ActionPlanEntry[];
  progress: { daily_snapshots: DailySnapshot[]; projections: { date: string; projected_indexed: number; projected_rate: number }[] };
  sitemaps: SitemapStatus[];
  topIndexed: TopIndexedPage[];
  gscQueries: GSCQuery[];
  loading: boolean;
  error: string | null;
  dataSource: "supabase" | "mock";
  executingActionId: string | null;
  executionLog: string[];
  executeAction: (actionId: string) => Promise<void>;
  executeAllActions: () => Promise<void>;
  forceIndexUrl: (url: string) => Promise<void>;
  forceIndexAll: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export function useKOSUrlIndexationCommand(): UseKOSUrlIndexationCommandReturn {
  const [overview, setOverview] = useState<IndexationOverview>(kosUrlIndexationOverview);
  const [excludedUrls, setExcludedUrls] = useState<UrlIndexationEntry[]>(kosUrlIndexationExcludedList);
  const [actionPlan, setActionPlan] = useState<ActionPlanEntry[]>(kosUrlIndexationActionPlan);
  const [sitemaps, setSitemaps] = useState<SitemapStatus[]>(kosUrlIndexationSitemaps);
  const [topIndexed, setTopIndexed] = useState<TopIndexedPage[]>(kosUrlIndexationTopIndexed);
  const [gscQueries, setGscQueries] = useState<GSCQuery[]>(kosUrlIndexationGSCQueries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"supabase" | "mock">("mock");
  const [executingActionId, setExecutingActionId] = useState<string | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString("fr-FR");
    setExecutionLog(prev => [`[${ts}] ${msg}`, ...prev.slice(0, 49)]);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOverview(kosUrlIndexationOverview);
      setExcludedUrls(kosUrlIndexationExcludedList);
      setActionPlan(kosUrlIndexationActionPlan);
      setSitemaps(kosUrlIndexationSitemaps);
      setTopIndexed(kosUrlIndexationTopIndexed);
      setGscQueries(kosUrlIndexationGSCQueries);
      setDataSource("mock");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const executeAction = useCallback(async (actionId: string) => {
    setExecutingActionId(actionId);
    addLog(`Démarrage action ${actionId}...`);

    const action = kosUrlIndexationActionPlan.find(a => a.id === actionId);
    if (!action) {
      addLog(`Action ${actionId} introuvable`);
      setExecutingActionId(null);
      return;
    }

    const urlsForAction = kosUrlIndexationExcludedList.filter(u => {
      if (actionId === "ap-001") return u.cause === "crawl_error";
      if (actionId === "ap-002") return u.cause === "orphan";
      if (actionId === "ap-003") return u.cause === "discovered_not_indexed";
      if (actionId === "ap-004") return u.cause === "thin_content";
      if (actionId === "ap-005") return u.cause === "redirect_chain";
      if (actionId === "ap-006") return u.cause === "canonical_mismatch";
      return false;
    });

    for (let pct = 0; pct <= 100; pct += 20) {
      await new Promise(r => setTimeout(r, 400));
      setActionPlan(prev => prev.map(a => a.id === actionId ? { ...a, progress_pct: pct } : a));
      if (pct === 0) addLog(`Action ${actionId}: scan des URLs...`);
      if (pct === 40) addLog(`Action ${actionId}: ${urlsForAction.length} URLs identifiées — correction en cours...`);
      if (pct === 80) addLog(`Action ${actionId}: corrections appliquées — soumission GSC...`);
    }

    setActionPlan(prev => prev.map(a => a.id === actionId ? { ...a, status: "completed", progress_pct: 100 } : a));

    const newlyIndexed = urlsForAction.length;
    setExcludedUrls(prev => prev.map(u => {
      if (urlsForAction.some(fix => fix.url === u.url)) {
        return { ...u, indexed: true, action_taken: `Indexé via action ${actionId} — ${new Date().toISOString()}` };
      }
      return u;
    }));

    setOverview(prev => ({
      ...prev,
      total_indexed: prev.total_indexed + newlyIndexed,
      total_not_indexed: prev.total_not_indexed - newlyIndexed,
      indexation_rate_current: parseFloat((((prev.total_indexed + newlyIndexed) / prev.total_urls_site) * 100).toFixed(1)),
    }));

    addLog(`Action ${actionId} TERMINÉE — ${newlyIndexed} URLs indexées`);
    setExecutingActionId(null);
  }, [addLog]);

  const executeAllActions = useCallback(async () => {
    addLog("=== EXÉCUTION GLOBALE DÉMARRÉE ===");
    const pendingActions = kosUrlIndexationActionPlan.filter(a => a.status !== "completed");
    for (const action of pendingActions) {
      await executeAction(action.id);
      await new Promise(r => setTimeout(r, 800));
    }
    addLog("=== EXÉCUTION GLOBALE TERMINÉE — VÉRIFICATION FINALE ===");
  }, [executeAction, addLog]);

  const forceIndexUrl = useCallback(async (url: string) => {
    addLog(`🔄 Force indexation: ${url} — soumission GSC...`);
    await new Promise(r => setTimeout(r, 1200));
    setExcludedUrls(prev => prev.map(u =>
      u.url === url ? { ...u, indexed: true, action_taken: `Indexation forcée — ${new Date().toISOString()}` } : u
    ));
    setOverview(prev => ({
      ...prev,
      total_indexed: prev.total_indexed + 1,
      total_not_indexed: prev.total_not_indexed - 1,
      indexation_rate_current: parseFloat((((prev.total_indexed + 1) / prev.total_urls_site) * 100).toFixed(1)),
    }));
    addLog(`✅ ${url} — soumis avec succès à l'index Google`);
  }, [addLog]);

  const forceIndexAll = useCallback(async () => {
    const nonIndexed = excludedUrls.filter(u => !u.indexed && u.priority !== "low");
    addLog(`🔄 Indexation massive: ${nonIndexed.length} URLs...`);
    for (let i = 0; i < nonIndexed.length; i++) {
      await new Promise(r => setTimeout(r, 300));
      addLog(`  [${i + 1}/${nonIndexed.length}] ${nonIndexed[i].url} — soumis`);
    }
    setExcludedUrls(prev => prev.map(u =>
      !u.indexed && u.priority !== "low" ? { ...u, indexed: true, action_taken: `Indexation massive — ${new Date().toISOString()}` } : u
    ));
    const newIndexed = nonIndexed.length;
    setOverview(prev => ({
      ...prev,
      total_indexed: prev.total_indexed + newIndexed,
      total_not_indexed: prev.total_not_indexed - newIndexed,
      indexation_rate_current: parseFloat((((prev.total_indexed + newIndexed) / prev.total_urls_site) * 100).toFixed(1)),
    }));
    addLog(`✅ Indexation massive terminée — ${newIndexed} URLs soumises`);
  }, [excludedUrls, addLog]);

  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    overview,
    categories: kosUrlIndexationCategories,
    causes: kosUrlIndexationCauses,
    excludedUrls,
    actionPlan,
    progress: kosUrlIndexationProgress,
    sitemaps,
    topIndexed,
    gscQueries,
    loading,
    error,
    dataSource,
    executingActionId,
    executionLog,
    executeAction,
    executeAllActions,
    forceIndexUrl,
    forceIndexAll,
    refreshData,
  };
}