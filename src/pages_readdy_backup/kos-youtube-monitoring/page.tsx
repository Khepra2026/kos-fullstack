import { useState, useEffect, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface HealthCheck {
  component: string;
  check_name: string;
  status: string;
  latency_ms: number;
  checked_at: string;
}

interface OrchestratorKPI {
  mttr_minutes: number;
  mttr_target_minutes: number;
  mttr_ok: boolean;
  auto_recovery_rate_pct: number;
  failure_rate_pct: number;
  mean_execution_seconds: number;
  availability_pct: number;
  availability_ok: boolean;
  pipeline_total: number;
  pipeline_active: number;
  pipeline_failed: number;
  dlq_size: number;
  status: string;
}

function statusBadge(status: string): { bg: string; fg: string; label: string } {
  if (status === 'healthy' || status === 'optimal') return { bg: '#D1FAE5', fg: '#059669', label: 'HEALTHY' };
  if (status === 'degraded' || status === 'warning') return { bg: '#FEF3C7', fg: '#CA8A04', label: 'WARNING' };
  return { bg: '#FEE2E2', fg: '#DC2626', label: 'UNHEALTHY' };
}

export default function youtubeMonitoringPage() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [kpis, setKpis] = useState<OrchestratorKPI | null>(null);
  const [orchestratorLogs, setOrchestratorLogs] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch health checks from orchestrator
      const { data: healthData } = await supabase.functions.invoke('kos-orchestrator-engine', {
        body: { action: 'run_health_checks' },
      });

      if (healthData?.checks) {
        setHealthChecks(healthData.checks as HealthCheck[]);
      }

      // Fetch KPIs
      const { data: kpiData } = await supabase.functions.invoke('kos-orchestrator-engine', {
        body: { action: 'kpis' },
      });

      if (kpiData) {
        setKpis(kpiData as OrchestratorKPI);
      }

      // Fetch recent pipeline events (audit trail)
      const { data: eventData } = await supabase.functions.invoke('kos-orchestrator-engine', {
        body: { action: 'pipeline_events', limit: 30 },
      });

      if (eventData?.events) {
        setOrchestratorLogs(eventData.events as Record<string, unknown>[]);
      }

      setLastRefresh(new Date().toLocaleTimeString('fr-FR'));
    } catch {
      // Silently fail — orchestrator cold-start
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchAll]);

  const handleRecovery = async () => {
    await supabase.functions.invoke('kos-orchestrator-engine', {
      body: { action: 'auto_recovery' },
    });
    fetchAll();
  };

  const healthyCount = healthChecks.filter((h) => h.status === 'healthy').length;
  const degradedCount = healthChecks.filter((h) => h.status === 'degraded').length;
  const unhealthyCount = healthChecks.filter((h) => h.status === 'unhealthy').length;

  return (
    <hubLayout hubId={79}>
      <SeoHead
        title="KOS YouTube Monitoring Center™ — Observabilité, Logs, Alerting, KPIs | KHEPRA EXPERTS"
        description="Centre de monitoring KOS YouTube. Observabilité temps réel : health checks, KPIs pipeline, logs orchestration, circuit breakers, dead letter queue. MTTR, disponibilité, auto-recovery rate."
        keywords="KOS Monitoring, YouTube monitoring, observabilité, logs, alerting, KHEPRA EXPERTS, pipeline health"
        canonicalPath="/kos-youtube-monitoring"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #0A66C2 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 backdrop-blur-sm">
              <i className="ri-radar-line" />KOS Monitoring Center™ — Hub 79
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white tracking-tight">
              Monitoring Center — Observabilité Temps Réel KOS YouTube
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
              Health checks 7 composants · KPIs pipeline · Logs orchestration · Circuit Breakers · Dead Letter Queue · Auto-recovery. MTTR, disponibilité, auto-recovery rate.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-refresh-line" />Rafraîchir
              </button>
              <button onClick={handleRecovery} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 cursor-pointer whitespace-nowrap">
                <i className="ri-heart-pulse-line" />Auto-Recovery Scan
              </button>
              <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                <input type="checkbox" checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} className="accent-emerald-500" />
                Auto-refresh 30s
              </label>
              {lastRefresh && <span className="text-white/40 text-xs">Dernier : {lastRefresh}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* KPI Dashboard */}
      {kpis && (
        <section className="bg-background-50 border-b border-background-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-3 h-3 rounded-full ${kpis.status === 'GO' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
              <h2 className="font-heading text-lg font-bold text-foreground-950">État Global : {kpis.status}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'Disponibilité', value: `${kpis.availability_pct}%`, target: '99.9%', ok: kpis.availability_ok, icon: 'ri-cloud-line' },
                { label: 'MTTR', value: `${kpis.mttr_minutes} min`, target: '< 5 min', ok: kpis.mttr_ok, icon: 'ri-timer-line' },
                { label: 'Auto-Recovery', value: `${kpis.auto_recovery_rate_pct}%`, target: '> 95%', ok: kpis.auto_recovery_rate_pct >= 95, icon: 'ri-heart-pulse-line' },
                { label: 'Taux Échec', value: `${kpis.failure_rate_pct}%`, target: '< 5%', ok: kpis.failure_rate_pct < 5, icon: 'ri-error-warning-line' },
                { label: 'Pipeline Actif', value: `${kpis.pipeline_active}/${kpis.pipeline_total}`, target: '', ok: true, icon: 'ri-git-branch-line' },
                { label: 'Pipeline Failed', value: String(kpis.pipeline_failed), target: '0', ok: kpis.pipeline_failed === 0, icon: 'ri-close-circle-line' },
                { label: 'DLQ Size', value: String(kpis.dlq_size), target: '< 10', ok: kpis.dlq_size < 10, icon: 'ri-inbox-line' },
                { label: 'Exec. Moy.', value: `${kpis.mean_execution_seconds}s`, target: '< 30s', ok: kpis.mean_execution_seconds < 30, icon: 'ri-dashboard-line' },
              ].map((k, i) => (
                <div key={i} className="rounded-xl bg-background-50 border border-background-200/70 p-3 text-center">
                  <div className="w-7 h-7 mx-auto mb-1.5 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.ok ? '#D1FAE5' : '#FEE2E2' }}>
                    <i className={`${k.icon} text-xs`} style={{ color: k.ok ? '#059669' : '#DC2626' }} />
                  </div>
                  <span className="block text-base font-bold text-foreground-950">{k.value}</span>
                  <span className="text-[10px] text-foreground-400">{k.label}</span>
                  {k.target && <span className="block text-[9px] text-foreground-400">Cible : {k.target}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Checks Panel */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-lg font-bold text-foreground-950">Health Checks — 7 Composants</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />{healthyCount} OK</span>
                  {degradedCount > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />{degradedCount} WARN</span>}
                  {unhealthyCount > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />{unhealthyCount} DOWN</span>}
                </div>
              </div>

              {loading && healthChecks.length === 0 ? (
                <div className="text-center py-8 text-foreground-400">
                  <span className="w-6 h-6 mx-auto mb-2 border-2 border-foreground-300 border-t-transparent rounded-full animate-spin block" />
                  Connexion à l'orchestrateur...
                </div>
              ) : healthChecks.length === 0 ? (
                <div className="text-center py-8 text-foreground-400">
                  <i className="ri-cloud-off-line text-3xl block mb-2" />
                  Orchestrateur inaccessible — démarrage à froid
                </div>
              ) : (
                <div className="space-y-2">
                  {healthChecks.map((check) => {
                    const badge = statusBadge(check.status);
                    return (
                      <div key={check.check_name} className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: badge.bg }}>
                          <i className={`${check.status === 'healthy' ? 'ri-check-line' : check.status === 'degraded' ? 'ri-error-warning-line' : 'ri-close-line'} text-sm`} style={{ color: badge.fg }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground-950">{check.component}</span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.fg }}>{badge.label}</span>
                          </div>
                          <span className="text-[10px] text-foreground-400">{check.check_name} · {check.latency_ms}ms</span>
                        </div>
                        <span className="text-[10px] text-foreground-400 whitespace-nowrap">
                          {check.checked_at ? new Date(check.checked_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'N/A'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Orchestrator Logs Panel */}
            <div className="rounded-2xl bg-background-50 border border-background-200/70 p-6">
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-4">Logs d'Orchestration — 30 Derniers Événements</h2>
              {orchestratorLogs.length === 0 ? (
                <div className="text-center py-8 text-foreground-400">
                  <i className="ri-file-list-3-line text-3xl block mb-2" />
                  Aucun événement — le pipeline démarre
                </div>
              ) : (
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {orchestratorLogs.map((log, i) => {
                    const eventType = String(log.event_type || '');
                    const isError = eventType.includes('error') || eventType.includes('failed') || eventType.includes('circuit_breaker_open');
                    const isSuccess = eventType.includes('recovery') || eventType.includes('published') || eventType.includes('completed');
                    const isWarn = eventType.includes('retry') || eventType.includes('dead_letter');
                    const color = isError ? '#DC2626' : isSuccess ? '#059669' : isWarn ? '#CA8A04' : '#6B7280';
                    return (
                      <div key={i} className="flex items-start gap-2 text-xs py-1.5 px-2 rounded-md" style={{ backgroundColor: `${color}08` }}>
                        <span className="text-foreground-400 font-mono flex-shrink-0 text-[10px] pt-0.5 w-16">
                          {log.created_at ? new Date(log.created_at as string).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
                        </span>
                        <span className="text-[10px] font-bold flex-shrink-0 w-24 truncate" style={{ color }}>
                          {eventType.replace(/_/g, ' ')}
                        </span>
                        <span className="text-foreground-600 truncate flex-1">
                          {(log.from_state || '?')} → {(log.to_state || '?')}
                          {log.event_data ? ` [${JSON.stringify(log.event_data).substring(0, 60)}]` : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">KOS YouTube — Écosystème de Production</h2>
              <p className="text-gray-400 text-sm">
                Monitoring (Hub 79) → Scanner (Hub 78) → Infrastructure (Hub 75) → Pipeline (Hub 76) → Analytics (Hub 31). Boucle d'observabilité complète.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/kos-youtube-system-scanner" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-qr-scan-line" />System Scanner
              </Link>
              <Link to="/kos-youtube-production-pipeline" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 cursor-pointer whitespace-nowrap">
                <i className="ri-rocket-2-line" />Production Pipeline
              </Link>
              <Link to="/kos-youtube-analytics" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                <i className="ri-line-chart-line" />YouTube Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}



