import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { SparklineKPI, SparklineMetric } from '@/components/feature/SparklineKPI';

interface RoutingKPIsData {
  latencyP99: number;
  successRate: number;
  failoverCount: number;
  costPer1M: number;
  totalCalls24h: number;
  primaryAvgLatency: number;
  failoverAvgLatency: number;
  totalCostEur: number;
  lastUpdated: string | null;
}

interface ViewKPIsRow {
  failover_count: number;
  primary_success_rate: number;
  total_calls_24h: number;
  primary_avg_latency_ms: number;
  failover_avg_latency_ms: number;
  primary_max_latency_ms: number;
  failover_max_latency_ms: number;
  total_cost_eur: number;
  last_updated: string;
}

interface RoutingRow {
  function_name: string;
  current_provider: string;
  status: string;
  error_count: number;
  max_errors_before_fallback: number;
  last_error_at?: string | null;
}

const CIRCUIT_BREAKER_THRESHOLD = 2;
const CIRCUIT_BREAKER_COOLDOWN_SECONDS = 60;

function isCircuitOpen(errorCount: number, lastErrorAt: string | null): boolean {
  if (errorCount < CIRCUIT_BREAKER_THRESHOLD) return false;
  if (!lastErrorAt) return false;
  const secondsSinceLastError = (Date.now() - new Date(lastErrorAt).getTime()) / 1000;
  return secondsSinceLastError < CIRCUIT_BREAKER_COOLDOWN_SECONDS;
}

function KpiCard({
  title,
  value,
  target,
  status,
  sparklineMetric,
}: {
  title: string;
  value: string;
  target: string;
  status: 'green' | 'orange' | 'red';
  sparklineMetric?: SparklineMetric;
}) {
  const statusClasses = {
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    orange: 'bg-amber-50 border-amber-200 text-amber-700',
    red: 'bg-red-50 border-red-200 text-red-700',
  };

  const dotColor = {
    green: 'bg-emerald-500',
    orange: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className={`rounded-xl border p-4 ${statusClasses[status]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${dotColor[status]}`} />
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{title}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs opacity-60 mb-2">Target: {target}</div>
      {sparklineMetric && (
        <div className="mt-1 pt-2 border-t border-current/10">
          <SparklineKPI metric={sparklineMetric} height={40} showTooltip />
        </div>
      )}
    </div>
  );
}

export default function RoutingKPIs() {
  const [kpis, setKpis] = useState<RoutingKPIsData | null>(null);
  const [routing, setRouting] = useState<RoutingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [testOpen, setTestOpen] = useState(false);
  const [testFunction, setTestFunction] = useState('rag-semantic-search');
  const [scenarioLoading, setScenarioLoading] = useState(false);
  const [scenarioResult, setScenarioResult] = useState<{
    success: boolean;
    headers: Record<string, string | null>;
    body: any;
    latencyMs: number;
    restored: boolean;
    error?: string;
    scenario?: 'edge-to-n8n' | 'manual';
  } | null>(null);
  const [testScenario, setTestScenario] = useState<'auto' | 'manual'>('auto');
  const [allFunctions, setAllFunctions] = useState<{ function_name: string; provider: string; status: string }[]>([]);

  const fetchData = useCallback(async () => {
    try {
      // ─── KPIs from materialized view kos_routing_kpis_24h ───
      const { data: kpiRow, error: kpiError } = await supabase
        .from('kos_routing_kpis_24h')
        .select('*')
        .maybeSingle();

      if (kpiError) throw kpiError;

      const row = (kpiRow || {}) as unknown as ViewKPIsRow;

      setKpis({
        latencyP99: Math.round(row.primary_max_latency_ms || 0),
        successRate: row.primary_success_rate ?? 1,
        failoverCount: row.failover_count || 0,
        costPer1M: Math.round((row.total_cost_eur || 0) * 1000000 / Math.max(row.total_calls_24h || 1, 1)),
        totalCalls24h: row.total_calls_24h || 0,
        primaryAvgLatency: Math.round(row.primary_avg_latency_ms || 0),
        failoverAvgLatency: Math.round(row.failover_avg_latency_ms || 0),
        totalCostEur: Math.round((row.total_cost_eur || 0) * 100) / 100,
        lastUpdated: row.last_updated || null,
      });

      // ─── Routing live state ───
      // Query kos_function_routing directly for live circuit breaker state
      const { data: routingRaw, error: routingError } = await supabase
        .from('kos_function_routing')
        .select('function_name, primary_provider, fallback_provider, status, error_count, max_errors_before_fallback, last_error_at')
        .order('function_name', { ascending: true });

      if (routingError) throw routingError;

      const rows: RoutingRow[] = (routingRaw || []).map((r: any) => ({
        function_name: r.function_name,
        current_provider: r.status === 'active' ? r.primary_provider : r.fallback_provider,
        status: r.status,
        error_count: r.error_count ?? 0,
        max_errors_before_fallback: r.max_errors_before_fallback ?? 3,
        last_error_at: r.last_error_at ?? null,
      }));

      setRouting(rows);

      // Load all functions for test selector
      const { data: allFnData, error: allFnError } = await supabase
        .from('kos_function_routing')
        .select('function_name, primary_provider, status')
        .order('function_name', { ascending: true });

      if (!allFnError && allFnData) {
        setAllFunctions((allFnData as any[]).map((fn: any) => ({
          function_name: fn.function_name,
          provider: fn.primary_provider,
          status: fn.status,
        })));
      }

      setLastRefresh(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur chargement KPIs routing');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleProvider = useCallback(async (fn: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const { error: updateError } = await supabase
        .from('kos_function_routing')
        .update({ status: newStatus, error_count: 0, updated_at: new Date().toISOString() })
        .eq('function_name', fn);

      if (updateError) throw updateError;

      // Refresh
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur toggle provider');
    }
  }, [fetchData]);

  const runScenarioEdgeToN8n = useCallback(async () => {
    if (!testFunction) return;
    setScenarioLoading(true);
    setScenarioResult(null);

    let originalStatus = '';

    try {
      // 1. Save original status of the edge_function provider for this function
      const { data: fnData, error: fnErr } = await supabase
        .from('kos_function_routing')
        .select('status, primary_provider')
        .eq('function_name', testFunction)
        .maybeSingle();

      if (fnErr || !fnData) throw new Error(`Function ${testFunction} not found`);

      originalStatus = fnData.status;

      // 2. Set inactive to force failover (Edge → n8n)
      const { error: updateErr } = await supabase
        .from('kos_function_routing')
        .update({ status: 'inactive', updated_at: new Date().toISOString() })
        .eq('function_name', testFunction);

      if (updateErr) throw updateErr;

      // 3. Wait for DB propagation
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Call routing proxy
      const url = `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/kos-routing-proxy`;
      const token = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const start = performance.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: testFunction,
          payload: { query: 'test', top_k: 1 },
        }),
      });
      const latencyMs = Math.round(performance.now() - start);

      const headers = {
        'X-Routing-Latency': res.headers.get('X-Routing-Latency'),
        'X-Routing-Provider': res.headers.get('X-Routing-Provider'),
        'X-Routing-Primary': res.headers.get('X-Routing-Primary'),
        'X-Routing-Failover': res.headers.get('X-Routing-Failover'),
      };

      let body: any;
      try { body = await res.json(); } catch { body = await res.text(); }

      const isFailover = headers['X-Routing-Failover'] === 'true';
      const isProviderN8n = headers['X-Routing-Provider'] === 'n8n';
      const isFast = latencyMs < 2000;

      setScenarioResult({
        success: res.ok && isFailover && isProviderN8n && isFast,
        headers,
        body,
        latencyMs,
        restored: false,
        scenario: 'edge-to-n8n',
        error: !res.ok ? `HTTP ${res.status}` : !isProviderN8n ? `Provider=${headers['X-Routing-Provider']}, attendu=n8n` : undefined,
      });
    } catch (err) {
      setScenarioResult({
        success: false,
        headers: {},
        body: null,
        latencyMs: 0,
        restored: false,
        scenario: 'edge-to-n8n',
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      // 5. Restore original status
      try {
        await supabase
          .from('kos_function_routing')
          .update({ status: originalStatus || 'active', updated_at: new Date().toISOString() })
          .eq('function_name', testFunction);
        setScenarioResult((prev) => (prev ? { ...prev, restored: true } : prev));
      } catch (restoreErr) {
        console.error('Failed to restore status after test:', restoreErr);
      }
      await fetchData();
      setScenarioLoading(false);
    }
  }, [testFunction, fetchData]);

  const runScenarioN8nToEdge = useCallback(async () => {
    if (!testFunction) return;
    setScenarioLoading(true);
    setScenarioResult(null);

    try {
      // For manual scenario, we only call the proxy and check headers
      // User must have stopped n8n container manually via docker
      const url = `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/functions/v1/kos-routing-proxy`;
      const token = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const start = performance.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function_name: testFunction,
          payload: { query: 'test', top_k: 1 },
        }),
      });
      const latencyMs = Math.round(performance.now() - start);

      const headers = {
        'X-Routing-Latency': res.headers.get('X-Routing-Latency'),
        'X-Routing-Provider': res.headers.get('X-Routing-Provider'),
        'X-Routing-Primary': res.headers.get('X-Routing-Primary'),
        'X-Routing-Failover': res.headers.get('X-Routing-Failover'),
      };

      let body: any;
      try { body = await res.json(); } catch { body = await res.text(); }

      const isFailover = headers['X-Routing-Failover'] === 'true';
      const isProviderEdge = headers['X-Routing-Provider'] === 'edge_function';
      const isFast = latencyMs < 2000;

      setScenarioResult({
        success: res.ok && isFailover && isProviderEdge && isFast,
        headers,
        body,
        latencyMs,
        restored: false,
        scenario: 'manual',
        error: !res.ok ? `HTTP ${res.status}` : !isProviderEdge ? `Provider=${headers['X-Routing-Provider']}, attendu=edge_function` : undefined,
      });
    } catch (err) {
      setScenarioResult({
        success: false,
        headers: {},
        body: null,
        latencyMs: 0,
        restored: false,
        scenario: 'manual',
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setScenarioLoading(false);
    }
  }, [testFunction]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const is150 = (val: number, threshold: number, inverse = false) =>
    inverse ? val <= threshold : val >= threshold;

  const refreshKPIsView = useCallback(async () => {
    try {
      await supabase.rpc('refresh_kos_routing_kpis_24h');
      await fetchData();
    } catch (err) {
      console.error('Refresh KPIs view failed:', err);
    }
  }, [fetchData]);

  if (loading && !kpis) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-foreground-500">Chargement KPIs Routing 150%...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground-950 flex items-center gap-2">
            <i className="ri-route-line text-primary-500" />
            KOS Routing Proxy — KPIs Temps Réel
          </h2>
          <p className="text-xs text-foreground-500 mt-0.5">
            Surveillance failover, latence, coût — 150% Big Four
            {lastRefresh && (
              <span className="ml-2 text-foreground-400">
                (dernier refresh: {lastRefresh.toLocaleTimeString()})
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setTestOpen(!testOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-50 text-accent-700 hover:bg-accent-100 border border-accent-200 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-test-tube-line" />
          {testOpen ? 'Fermer Test' : 'Test Failover'}
        </button>
        <button
          onClick={refreshKPIsView}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary-50 text-secondary-700 hover:bg-secondary-100 border border-secondary-200 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-database-2-line" />
          Refresh View
        </button>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-refresh-line" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <i className="ri-error-warning-line flex-shrink-0" />
          {error}
        </div>
      )}

      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            title="Latence P99"
            value={`${kpis.latencyP99}ms`}
            target="<5ms"
            status={is150(kpis.latencyP99, 5, true) ? 'green' : 'orange'}
            sparklineMetric="latency_avg"
          />
          <KpiCard
            title="Success Rate"
            value={`${(kpis.successRate * 100).toFixed(3)}%`}
            target=">99.99%"
            status={is150(kpis.successRate, 0.9999) ? 'green' : 'red'}
            sparklineMetric="success_rate"
          />
          <KpiCard
            title="Failover 24h"
            value={String(kpis.failoverCount)}
            target="<10"
            status={is150(kpis.failoverCount, 10, true) ? 'green' : 'orange'}
            sparklineMetric="failover_count"
          />
          <KpiCard
            title="Coût /1M req"
            value={`${kpis.costPer1M}€`}
            target="<20€"
            status={is150(kpis.costPer1M, 20, true) ? 'green' : 'orange'}
          />
          <KpiCard
            title="Latence Primary Avg"
            value={`${kpis.primaryAvgLatency}ms`}
            target="<5ms"
            status={is150(kpis.primaryAvgLatency, 5, true) ? 'green' : 'orange'}
            sparklineMetric="latency_avg"
          />
          <KpiCard
            title="Latence Failover Avg"
            value={`${kpis.failoverAvgLatency}ms`}
            target="<500ms"
            status={is150(kpis.failoverAvgLatency, 500, true) ? 'green' : kpis.failoverAvgLatency < 2000 ? 'orange' : 'red'}
            sparklineMetric="latency_avg"
          />
          <KpiCard
            title="Coût Total 24h"
            value={`${kpis.totalCostEur.toFixed(2)}€`}
            target="<5€"
            status={is150(kpis.totalCostEur, 5, true) ? 'green' : 'orange'}
          />
          <KpiCard
            title="Appels 24h"
            value={String(kpis.totalCalls24h)}
            target=">100"
            status={is150(kpis.totalCalls24h, 100) ? 'green' : 'orange'}
          />
        </div>
      )}

      {/* Total calls + View info badges */}
      {kpis && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-secondary-100 text-secondary-700 border border-secondary-200">
            {kpis.totalCalls24h} appels 24h
          </span>
          <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-primary-50 text-primary-700 border border-primary-200">
            Refresh auto 5s
          </span>
          {kpis.lastUpdated && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-accent-50 text-accent-700 border border-accent-200">
              View maj: {new Date(kpis.lastUpdated).toLocaleTimeString()}
            </span>
          )}
        </div>
      )}

      {/* Sparkline Global Overview */}
      {kpis && (
        <div className="bg-background-50 rounded-xl border border-background-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-background-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground-900 flex items-center gap-2">
              <i className="ri-bar-chart-grouped-line text-primary-500" />
              Historique Routing — 48h
            </h3>
            <span className="text-xs text-foreground-400">Tendance multi-métriques</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <div className="text-xs font-semibold text-foreground-600 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Latence moyenne (ms)
              </div>
              <SparklineKPI metric="latency_avg" height={72} showTooltip />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-600 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-600" />
                Taux de succès (%)
              </div>
              <SparklineKPI metric="success_rate" height={72} showTooltip />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-600 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Failover par heure
              </div>
              <SparklineKPI metric="failover_count" height={72} showTooltip />
            </div>
          </div>
        </div>
      )}

      {/* Test Failover Panel */}
      {testOpen && (
        <div className="bg-background-50 rounded-xl border border-background-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-background-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground-900 flex items-center gap-2">
              <i className="ri-test-tube-line text-accent-500" />
              Test Failover — Validation Routing Proxy
            </h3>
            <span className="text-xs text-foreground-400">Scénarios de bascule 150% Big Four</span>
          </div>

          <div className="p-5 space-y-5">
            {/* Scenario Tabs */}
            <div className="flex p-1 bg-background-100 rounded-lg gap-1">
              <button
                onClick={() => setTestScenario('auto')}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  testScenario === 'auto'
                    ? 'bg-background-50 text-foreground-900 shadow-sm border border-background-200'
                    : 'text-foreground-500 hover:text-foreground-700'
                }`}
              >
                <i className="ri-flashlight-line mr-1" />
                Auto : Edge → n8n
              </button>
              <button
                onClick={() => setTestScenario('manual')}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  testScenario === 'manual'
                    ? 'bg-background-50 text-foreground-900 shadow-sm border border-background-200'
                    : 'text-foreground-500 hover:text-foreground-700'
                }`}
              >
                <i className="ri-node-tree mr-1" />
                Manuel : n8n → Edge
              </button>
            </div>

            {/* ─── SCENARIO 1: Edge → n8n (Automated) ─── */}
            {testScenario === 'auto' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-accent-50/50 border border-accent-100 rounded-lg p-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-xs font-bold shrink-0">
                    1→2
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-900">Edge KO → Fallback n8n</div>
                    <div className="text-xs text-foreground-500 mt-0.5">
                      Passe le provider Edge à <code className="bg-background-50 px-1 rounded">inactive</code> en DB, appelle le proxy, vérifie que le routage bascule vers n8n.
                    </div>
                  </div>
                </div>

                <div className="text-xs text-foreground-500 bg-background-100 rounded-lg p-3 space-y-2">
                  <div className="font-semibold text-foreground-700 mb-1">Protocole de test :</div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-[10px] font-bold">1</span>
                    <span>UPDATE <code className="bg-background-50 px-1 rounded">kos_function_routing</code> SET status='inactive' WHERE provider='edge_function'</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-[10px] font-bold">2</span>
                    <span>Appelle <code className="bg-background-50 px-1 rounded">kos-routing-proxy</code> avec <code className="bg-background-50 px-1 rounded">{`{"function_name":"rag-semantic-search"}`}</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-[10px] font-bold">3</span>
                    <span>Vérifie <code className="bg-background-50 px-1 rounded">X-Routing-Provider: n8n</code> &amp; <code className="bg-background-50 px-1 rounded">X-Routing-Failover: true</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-background-50 text-[10px] font-bold">4</span>
                    <span>Restaure le statut <code className="bg-background-50 px-1 rounded">active</code> automatiquement</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-foreground-700 whitespace-nowrap">Fonction :</label>
                  <select
                    value={testFunction}
                    onChange={(e) => setTestFunction(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-background-300 text-sm bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-accent-400"
                  >
                    {allFunctions.length === 0 && (
                      <option value="rag-semantic-search">rag-semantic-search</option>
                    )}
                    {allFunctions.map((fn) => (
                      <option key={fn.function_name} value={fn.function_name}>
                        {fn.function_name} ({fn.provider} — {fn.status})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={runScenarioEdgeToN8n}
                    disabled={scenarioLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-accent-500 text-background-50 hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scenarioLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-background-50 border-t-transparent rounded-full animate-spin" />
                        Test en cours...
                      </>
                    ) : (
                      <>
                        <i className="ri-play-line" />
                        Lancer Edge → n8n
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ─── SCENARIO 2: n8n → Edge (Manual / Docker) ─── */}
            {testScenario === 'manual' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-primary-50/50 border border-primary-100 rounded-lg p-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-xs font-bold shrink-0">
                    2→1
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground-900">n8n KO → Fallback Edge (Circuit Breaker)</div>
                    <div className="text-xs text-foreground-500 mt-0.5">
                      Arrête n8n, puis appelle 2x le proxy. 1er appel = timeout 2s + failover. 2ème appel = circuit breaker OPEN, failover instantané.
                    </div>
                  </div>
                </div>

                <div className="text-xs text-foreground-500 bg-background-100 rounded-lg p-3 space-y-2">
                  <div className="font-semibold text-foreground-700 mb-1">Protocole manuel (requiert Docker) :</div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-bold">1</span>
                    <span>Shell : <code className="bg-background-50 px-1 rounded text-red-700">docker stop n8n</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-bold">2</span>
                    <span>Cliquez <strong>Valider</strong> 2x — 1er appel : failover ~2s. 2ème appel : circuit OPEN, failover &lt;500ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-bold">3</span>
                    <span>Vérifie circuit breaker : <code className="bg-background-50 px-1 rounded">error_count ≥ 2</code> → OPEN, skip n8n</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-[10px] font-bold">4</span>
                    <span>Shell : <code className="bg-background-50 px-1 rounded text-emerald-700">docker start n8n</code> puis attendez cooldown 60s → CLOSED</span>
                  </div>
                </div>

                <div className="text-xs text-foreground-500 bg-emerald-50 border border-emerald-100 rounded-lg p-3 space-y-1">
                  <div className="font-semibold text-emerald-800 mb-1">Circuit Breaker Config :</div>
                  <div>• Seuil : <strong>{CIRCUIT_BREAKER_THRESHOLD}</strong> erreurs consécutives</div>
                  <div>• Timeout n8n : <strong>2000ms</strong> (au lieu de 5000ms avant)</div>
                  <div>• Cooldown : <strong>{CIRCUIT_BREAKER_COOLDOWN_SECONDS}s</strong> avant de réessayer le primary</div>
                  <div>• Effet : après 2 échecs, le proxy saute n8n et va direct sur Edge — latence divisée par 10</div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-foreground-700 whitespace-nowrap">Fonction :</label>
                  <select
                    value={testFunction}
                    onChange={(e) => setTestFunction(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-background-300 text-sm bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    {allFunctions.filter(f => f.provider === 'n8n' || f.provider === 'edge_function').map((fn) => (
                      <option key={fn.function_name} value={fn.function_name}>
                        {fn.function_name} ({fn.provider} — {fn.status})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={runScenarioN8nToEdge}
                    disabled={scenarioLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-primary-500 text-background-50 hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scenarioLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-background-50 border-t-transparent rounded-full animate-spin" />
                        Validation...
                      </>
                    ) : (
                      <>
                        <i className="ri-shield-check-line" />
                        Valider n8n → Edge
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[10px] text-foreground-400 bg-amber-50 border border-amber-100 rounded-lg p-2 flex items-start gap-2">
                  <i className="ri-alert-line text-amber-500 mt-0.5" />
                  <span>Ce scénario requiert un accès Docker à l'hôte n8n. Le bouton "Valider" ne contrôle pas Docker — il appelle simplement le proxy et analyse les headers de réponse.</span>
                </div>
              </div>
            )}

            {/* Test result */}
            {scenarioResult && (
              <div
                className={`rounded-lg border p-4 space-y-3 ${
                  scenarioResult.success
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <i
                    className={`${scenarioResult.success ? 'ri-check-double-line text-emerald-600' : 'ri-close-circle-line text-red-600'} text-lg`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      scenarioResult.success ? 'text-emerald-800' : 'text-red-800'
                    }`}
                  >
                    {scenarioResult.success
                      ? `✅ FAILOVER ${scenarioResult.scenario?.toUpperCase()} VALIDÉ`
                      : '❌ FAILOVER ÉCHOUÉ'}
                  </span>
                </div>

                {scenarioResult.error && (
                  <div className="text-xs text-red-700 bg-red-100/50 rounded p-2">
                    <strong>Erreur :</strong> {scenarioResult.error}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200">
                    <div className="text-[10px] font-semibold text-foreground-500 uppercase">Latence</div>
                    <div className="text-sm font-bold text-foreground-900">{scenarioResult.latencyMs}ms</div>
                    <div className="text-[10px] text-foreground-400">Target &lt;500ms (circuit breaker)</div>
                  </div>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200">
                    <div className="text-[10px] font-semibold text-foreground-500 uppercase">Provider</div>
                    <div className="text-sm font-bold text-foreground-900 truncate">
                      {scenarioResult.headers['X-Routing-Provider'] || '—'}
                    </div>
                    <div className="text-[10px] text-foreground-400">
                      Attendu: {scenarioResult.scenario === 'edge-to-n8n' ? 'n8n' : 'edge_function'}
                    </div>
                  </div>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200">
                    <div className="text-[10px] font-semibold text-foreground-500 uppercase">Primary</div>
                    <div className="text-sm font-bold text-foreground-900 truncate">
                      {scenarioResult.headers['X-Routing-Primary'] || '—'}
                    </div>
                  </div>
                  <div className="bg-background-50 rounded-lg p-2 border border-background-200">
                    <div className="text-[10px] font-semibold text-foreground-500 uppercase">Failover</div>
                    <div className={`text-sm font-bold ${scenarioResult.headers['X-Routing-Failover'] === 'true' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {scenarioResult.headers['X-Routing-Failover'] || '—'}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-foreground-500 bg-background-100 rounded-lg p-2 font-mono overflow-x-auto">
                  <div className="font-semibold text-foreground-700 mb-1">Headers complets :</div>
                  <div>X-Routing-Latency: {scenarioResult.headers['X-Routing-Latency']}</div>
                  <div>X-Routing-Provider: {scenarioResult.headers['X-Routing-Provider']}</div>
                  <div>X-Routing-Primary: {scenarioResult.headers['X-Routing-Primary']}</div>
                  <div>X-Routing-Failover: {scenarioResult.headers['X-Routing-Failover']}</div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      scenarioResult.restored
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <i className={scenarioResult.restored ? 'ri-check-line' : 'ri-error-warning-line'} />
                    {scenarioResult.restored ? 'Statut restauré' : 'Restauration manuelle requise'}
                  </span>
                  {scenarioResult.scenario === 'manual' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-amber-50 border-amber-200 text-amber-700">
                      <i className="ri-server-line" />
                      Vérifiez : docker start n8n
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Routing Live Table */}
      <div className="bg-background-50 rounded-xl border border-background-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-background-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground-900 flex items-center gap-2">
            <i className="ri-server-line text-accent-500" />
            Fonctions Routées — État Live
          </h3>
          <span className="text-xs text-foreground-400">{routing.length} fonctions monitorées</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200 bg-background-100/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-600 uppercase tracking-wider">Fonction</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-600 uppercase tracking-wider">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-600 uppercase tracking-wider">Errors</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-600 uppercase tracking-wider">Circuit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-foreground-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200">
              {routing.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-foreground-400">
                    Aucune fonction routée active. Vérifiez la table <code className="text-xs bg-background-100 px-1 rounded">kos_function_routing</code>.
                  </td>
                </tr>
              )}
              {routing.map((r) => (
                <tr key={r.function_name} className="hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground-900">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded bg-background-100 text-foreground-500">
                        <i className="ri-function-line text-xs" />
                      </div>
                      <span className="truncate max-w-[200px]">{r.function_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        r.current_provider === 'n8n'
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-accent-50 border-accent-200 text-accent-700'
                      }`}
                    >
                      <i className={`${r.current_provider === 'n8n' ? 'ri-node-tree' : 'ri-flashlight-line'} text-[10px]`} />
                      {r.current_provider}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        r.status === 'active'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600">
                    <span className={r.error_count >= CIRCUIT_BREAKER_THRESHOLD ? 'text-red-600 font-bold' : ''}>
                      {r.error_count}
                    </span>
                    <span className="text-foreground-400">/{CIRCUIT_BREAKER_THRESHOLD}</span>
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const open = isCircuitOpen(r.error_count, r.last_error_at);
                      if (open) {
                        const secondsSince = r.last_error_at
                          ? Math.round((Date.now() - new Date(r.last_error_at).getTime()) / 1000)
                          : 0;
                        const remaining = CIRCUIT_BREAKER_COOLDOWN_SECONDS - secondsSince;
                        return (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-red-50 border-red-200 text-red-700" title={`Cooldown: ${remaining}s restantes`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            OPEN {remaining}s
                          </span>
                        );
                      }
                      if (r.error_count > 0) {
                        return (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-amber-50 border-amber-200 text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            HALF
                          </span>
                        );
                      }
                      return (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 border-emerald-200 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          CLOSED
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => toggleProvider(r.function_name, r.status)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        r.status === 'active'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      <i className={`${r.status === 'active' ? 'ri-toggle-fill' : 'ri-toggle-line'} text-xs`} />
                      {r.status === 'active' ? 'Désactiver' : 'Activer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}