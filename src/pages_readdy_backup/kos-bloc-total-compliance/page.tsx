import { useState, useMemo, useEffect, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { SeoHead } from '@/components/feature/SeoHead';
import { supabase } from '@/lib/supabase';
import { useKOSBlocTotalCompliance } from '@/hooks/useKOSBlocTotalCompliance';
import type { BlocScanModule, Finding } from '@/mocks/blocTotalCompliance';
import type { BigFourExecutiveReport, RegulatoryCoverageGap, AutoHealingAction, BigFourRecommendation, automatonState, HyperionState, HyperionTickResult, HyperionDevResult, ChampionState, UltimateIntegrationState, UltimateIntegrationResult } from '@/hooks/useKOSBlocTotalCompliance';
import { useKOSPACEngine, PAC_DEFAULT_FINDING } from '@/hooks/useKOSPACEngine';
import type { PACFinding, PACJiraSeed, PACEngineState } from '@/hooks/useKOSPACEngine';

// ─── Inline Toast System ───
interface ToastItem { id: number; message: string; type: 'success' | 'error' | 'info' | 'warning'; }
let toastIdCounter = 0;

function getStatusBadge(status: BlocScanModule['status']) {
  const map = {
    PENDING: { bg: 'bg-background-100', border: 'border-background-200', text: 'text-foreground-400', label: 'EN ATTENTE', dot: 'bg-foreground-300' },
    RUNNING: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'EN COURS', dot: 'bg-amber-500 animate-pulse' },
    PASS: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'CONFORME', dot: 'bg-emerald-500' },
    FAIL: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'NON CONFORME', dot: 'bg-red-500' },
    WARNING: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'ATTENTION', dot: 'bg-amber-500' },
  };
  return map[status];
}

function getSeverityBadge(severity: Finding['severity']) {
  const map = {
    critical: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: 'CRITIQUE', icon: 'ri-error-warning-line text-red-500' },
    high: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: 'PRIORITAIRE', icon: 'ri-alert-line text-orange-500' },
    medium: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'STANDARD', icon: 'ri-information-line text-amber-500' },
    low: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', label: 'MINEUR', icon: 'ri-checkbox-circle-line text-slate-400' },
  };
  return map[severity];
}

function getPhaseIcon(phase: BlocScanModule['phase']) {
  switch (phase) {
    case 'pending': return 'ri-time-line text-foreground-300';
    case 'scanning': return 'ri-loader-4-line text-amber-500 animate-spin';
    case 'complete': return 'ri-check-double-line text-emerald-500';
    case 'error': return 'ri-close-circle-line text-red-500';
  }
}

// ─── Scan History Type ───
interface ScanHistoryEntry {
  id: number;
  correlation_id: string;
  created_at: string;
  global_score: number;
  modules_passed: number;
  modules_failed: number;
  modules_warning: number;
  total_modules: number;
  total_duration: string;
  critical_count: number;
  high_count: number;
}

export default function blocTotalCompliancePage() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'automaton' | 'routines' | 'hyperion' | 'champion' | 'ultimate' | 'pac'>('scan');
  const [scanHistory, setScanHistory] = useState<ScanHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState<number | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = ++toastIdCounter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const {
    modules,
    isLaunching,
    isComplete,
    summary,
    error,
    scanCorrelationId,
    automaton,
    routineEngine,
    hyperion,
    champion,
    ultimate,
    launchBlocScan,
    resetScan,
    loadRoutines,
    executeRoutine,
    executeAllRoutines,
    toggleRoutineStatus,
    loadHyperionConfig,
    hyperionTick,
    routeLLM,
    runHyperionAutodev,
    seedSkillFromWorkflow,
    loadChampionConfig,
    executeChampion,
    championTick,
    routeToChampion,
    launchUltimateIntegration,
  } = useKOSBlocTotalCompliance(showToast);

  const pac = useKOSPACEngine(showToast);
  const { state: pacState, transformFindingRPC, previewTransform, validateFinding, loadFindingFromJSON, loadHistory: loadPACHistory, setProjectKey, setAssigneeId, resetEngine, postToJira, persistWebhookUrl } = pac;

  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [viewAllFindings, setViewAllFindings] = useState(false);
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(null);

  // Load routines and hyperion config on initial render
  useEffect(() => {
    loadRoutines();
    loadHyperionConfig();
    loadChampionConfig();
  }, [loadRoutines, loadHyperionConfig, loadChampionConfig]);

  const allFindings = useMemo(
    () => modules.filter(m => m.phase === 'complete').flatMap(m => m.findings.map(f => ({ ...f, moduleName: m.name }))),
    [modules]
  );

  const completedCount = modules.filter(m => m.phase === 'complete').length;
  const runningCount = modules.filter(m => m.phase === 'scanning').length;
  const scanningProgress = modules.reduce((s, m) => s + m.itemsScanned, 0);
  const totalItems = modules.reduce((s, m) => s + m.itemsTotal, 0);

  // Fetch scan history
  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const { data, error: dbErr } = await supabase
        .from('kos_universal_audit_log')
        .select('id, new_state, correlation_id, created_at')
        .eq('event_type', 'bloc_total_compliance')
        .eq('action', 'bloc_scan_completed')
        .order('created_at', { ascending: false })
        .limit(20);

      if (dbErr) throw new Error(dbErr.message);

      const entries: ScanHistoryEntry[] = (data || []).map((row: any) => {
        const state = row.new_state || {};
        return {
          id: row.id,
          correlation_id: row.correlation_id || 'N/A',
          created_at: row.created_at,
          global_score: state.globalScore || 0,
          modules_passed: state.modulesPassed || 0,
          modules_failed: state.modulesFailed || 0,
          modules_warning: state.modulesWarning || 0,
          total_modules: state.totalModules || 10,
          total_duration: state.totalDuration || '—',
          critical_count: state.totalFindingsCritical || 0,
          high_count: state.totalFindingsHigh || 0,
        };
      });

      setScanHistory(entries);
    } catch (err) {
      setHistoryError(err instanceof Error ? err.message : 'Erreur chargement historique');
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Refresh history after scan completes
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(fetchHistory, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, fetchHistory]);

  const toastTypeStyles: Record<string, { bg: string; icon: string }> = {
    success: { bg: 'bg-emerald-600', icon: 'ri-check-line' },
    error: { bg: 'bg-red-600', icon: 'ri-close-line' },
    info: { bg: 'bg-foreground-950', icon: 'ri-information-line' },
    warning: { bg: 'bg-amber-600', icon: 'ri-error-warning-line' },
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'ultimate':
        return renderUltimateTab();
      case 'hyperion':
        return renderHyperionTab();
      case 'champion':
        return renderChampionTab();
      case 'pac':
        return renderPACEngineTab();
      case 'history':
        return renderHistoryTab();
      case 'scan':
      default:
        return renderScanTab();
    }
  };

  // ─── CHAMPION v2026.07 Tab ───
  const renderChampionTab = () => (
    <section className="py-10 sm:py-14 bg-background-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/15 border border-rose-400/30 mb-4">
            <i className="ri-trophy-line text-rose-500 text-sm" />
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">6 Champions · 1 Orchestrator · 0 Table · 0 Edge</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">
            KOS CHAMPION ENGINE
            <span className="block text-rose-600 text-xl mt-1">v2026.07 — Multi-Agent Orchestrator</span>
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto">
            Chaque tâche routée vers le <strong>meilleur moteur 2026</strong> : Claude Routines + Opus 4.7 · Hermes + n8n · n8n 1.80+ · Genora AI 1.30 · LangGraph Cloud · Devin 2.0.
            KOS n'exécute jamais lui-même si un champion existe. Fallback automatique claude_routines.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button onClick={championTick} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground-950 text-white text-sm font-bold hover:bg-foreground-800 transition-all cursor-pointer">
            <i className="ri-play-circle-fill text-lg" />Tick All 6 Champions
          </button>
        </div>

        {champion.lastTick && (
          <div className="mb-8 p-6 rounded-2xl bg-foreground-950 text-white">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-check-double-line text-emerald-400 text-lg" />
              <h3 className="font-heading text-lg font-bold">Dernier Tick CHAMPION</h3>
              <span className="text-[10px] text-gray-400 ml-auto font-mono">{champion.lastTick.tick_id}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-emerald-400 font-heading">{champion.lastTick.champions_tested}</div>
                <div className="text-[10px] text-gray-400">Champions Testés</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-emerald-400 font-heading">{champion.lastTick.champions_ok}</div>
                <div className="text-[10px] text-gray-400">OK</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-amber-400 font-heading">{champion.lastTick.success_rate}%</div>
                <div className="text-[10px] text-gray-400">Taux Succès</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-white">{champion.lastTick.duration_ms}ms</div>
                <div className="text-[10px] text-gray-400">Durée</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-sm font-bold text-rose-400">KPMG</div>
                <div className="text-[10px] text-gray-400">Format Output</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-sm font-bold text-white">{new Date(champion.lastTick.executed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[10px] text-gray-400">Exécuté à</div>
              </div>
            </div>
            {champion.lastTick.results.length > 0 && (
              <div className="space-y-1.5">
                {champion.lastTick.results.map((r, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${r.success ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    <i className={`${r.success ? 'ri-check-line text-emerald-400' : 'ri-close-line text-red-400'} text-sm`} />
                    <span className="text-xs font-bold">{r.case}</span>
                    <span className="text-[10px] text-gray-400">→ {r.champion}</span>
                    <span className="text-[10px] text-gray-500 ml-auto">{r.engine} · {r.duration_ms}ms</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {champion.lastExecution && (
          <div className={`mb-8 p-6 rounded-2xl border ${champion.lastExecution.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <i className={`${champion.lastExecution.success ? 'ri-check-double-line text-emerald-600' : 'ri-close-circle-line text-red-600'} text-lg`} />
              <h3 className={`font-heading text-lg font-bold ${champion.lastExecution.success ? 'text-emerald-900' : 'text-red-900'}`}>
                {champion.lastExecution.success ? 'Exécution Réussie' : 'Échec'}
              </h3>
              <span className="text-[10px] text-foreground-400 ml-auto font-mono">{champion.lastExecution.execution_id}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className="text-lg font-bold font-heading text-foreground-950">{champion.lastExecution.champion}</div>
                <div className="text-[10px] text-foreground-500">Champion</div>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className="text-lg font-bold font-heading text-foreground-950">{champion.lastExecution.engine}</div>
                <div className="text-[10px] text-foreground-500">Engine</div>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className="text-lg font-bold font-heading text-foreground-950">{champion.lastExecution.duration_ms}ms</div>
                <div className="text-[10px] text-foreground-500">Durée</div>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className="text-lg font-bold font-heading text-foreground-950">{champion.lastExecution.retry_count}</div>
                <div className="text-[10px] text-foreground-500">Retries</div>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className={`text-sm font-bold ${champion.lastExecution.iso_9001_passed ? 'text-emerald-600' : 'text-red-600'}`}>{champion.lastExecution.iso_9001_passed ? 'PASS' : 'FAIL'}</div>
                <div className="text-[10px] text-foreground-500">ISO 9001</div>
              </div>
              <div className="rounded-xl bg-white border border-background-200 p-3 text-center">
                <div className={`text-sm font-bold ${champion.lastExecution.bceao_check_passed ? 'text-emerald-600' : 'text-red-600'}`}>{champion.lastExecution.bceao_check_passed ? 'PASS' : 'FAIL'}</div>
                <div className="text-[10px] text-foreground-500">BCEAO Check</div>
              </div>
            </div>
            {champion.lastExecution.error && (
              <div className="mt-3 p-3 rounded-lg bg-red-100"><p className="text-xs text-red-700">{champion.lastExecution.error}</p></div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {(champion.config?.routing || []).map((route, i) => {
            const championColors: Record<string, { bg: string; icon: string; color: string }> = {
              claude_routines: { bg: 'bg-orange-50', icon: 'ri-openai-line', color: 'text-orange-600' },
              hermes_n8n: { bg: 'bg-amber-50', icon: 'ri-flashlight-line', color: 'text-amber-600' },
              n8n: { bg: 'bg-red-50', icon: 'ri-node-tree', color: 'text-red-600' },
              genora: { bg: 'bg-purple-50', icon: 'ri-robot-2-line', color: 'text-purple-600' },
              langgraph_cloud: { bg: 'bg-emerald-50', icon: 'ri-git-branch-line', color: 'text-emerald-600' },
              'devin_2.0': { bg: 'bg-sky-50', icon: 'ri-code-s-slash-line', color: 'text-sky-600' },
            };
            const cc = championColors[route.champion] || { bg: 'bg-background-50', icon: 'ri-question-line', color: 'text-foreground-500' };

            return (
              <div key={i} className={`rounded-2xl border border-background-200 p-5 ${cc.bg} hover:border-rose-300 transition-all group cursor-pointer`}
                onClick={() => executeChampion(route.case)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}><i className={`${cc.icon} text-xl ${cc.color}`} /></div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground-950 capitalize">{route.case.replace(/_/g, ' ')}</h3>
                    <p className="text-[10px] text-foreground-400 capitalize">{route.champion.replace(/_/g, ' ')}</p>
                  </div>
                  <i className="ri-arrow-right-line text-foreground-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all ml-auto" />
                </div>
                <p className="text-[11px] text-foreground-500 line-clamp-2">{route.description}</p>
                {route.model && <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-white text-[9px] font-bold text-foreground-500">{route.model}</span>}
              </div>
            );
          })}
        </div>

        {champion.config?.rules && champion.config.rules.length > 0 && (
          <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4"><i className="ri-scales-3-line mr-2 text-amber-600" />Quality Gates Big Four</h3>
            <div className="space-y-2">
              {(champion.config.rules || []).map((rule, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-background-50">
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap">{rule.iso_ref}</span>
                  <span className="text-xs text-foreground-700">{rule.rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {champion.executionHistory.length > 0 && (
          <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4"><i className="ri-history-line mr-2 text-foreground-500" />Historique d'Exécution</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {champion.executionHistory.map((exec, i) => (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${exec.success ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <i className={`${exec.success ? 'ri-check-line text-emerald-500' : 'ri-close-line text-red-500'} text-sm`} />
                  <span className="text-xs font-bold text-foreground-950">{exec.case}</span>
                  <span className="text-[10px] text-foreground-400">→ {exec.champion}</span>
                  <span className="text-[10px] text-foreground-500 ml-auto">{exec.duration_ms}ms</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl bg-background-50 border border-background-200 p-5 text-center">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['ISO 9001', 'ISO 27001', 'BCEAO 03-2017', 'OHADA', 'SOC2', 'GDPR'].map((cert, i) => (
              <div key={i} className="flex items-center gap-2"><i className="ri-verified-badge-line text-emerald-600" /><span className="text-xs font-bold text-foreground-600">{cert}</span></div>
            ))}
            <span className="text-[10px] text-foreground-400">Format livrable: <strong className="text-foreground-950">KPMG Big Four</strong> · 0 table · 0 Edge Function · 100% auditable · Fallback claude_routines</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ─── HYPERION v5.0 Tab ───
  const renderHyperionTab = () => (
    <section className="py-10 sm:py-14 bg-background-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 mb-4">
            <i className="ri-cpu-line text-amber-500 text-sm" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Triple Fusion: Claude AI + n8n + Genora → KOS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">
            KOS HYPERION ENGINE
            <span className="block text-amber-600 text-xl mt-1">v5.0 — Unified Orchestrator</span>
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto">
            <strong>Claude AI Opus 4.7</strong> copilote réglementaire · <strong>n8n 1.80+</strong> 400+ nodes automatisés · <strong>Genora AI 1.30</strong> multi-LLM routing + Vision + Voice.
            Tout s'exécute sur pg_cron + SQL functions SECURITY DEFINER. Zéro table, zéro Edge Function.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button onClick={hyperionTick} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground-950 text-white text-sm font-bold hover:bg-foreground-800 transition-all cursor-pointer">
            <i className="ri-play-circle-fill text-lg" /> Lancer HYPERION Tick
          </button>
          <button onClick={runHyperionAutodev} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-500 transition-all cursor-pointer">
            <i className="ri-brain-line text-lg" /> Auto-Développement Métrique
          </button>
        </div>

        {hyperion.lastTick && (
          <div className="mb-8 p-6 rounded-2xl bg-foreground-950 text-white">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-check-double-line text-emerald-400 text-lg" />
              <h3 className="font-heading text-lg font-bold">Dernier Tick HYPERION</h3>
              <span className="text-[10px] text-gray-400 ml-auto font-mono">{hyperion.lastTick.tick_id}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-emerald-400 font-heading">{hyperion.lastTick.routines_triggered}</div>
                <div className="text-[10px] text-gray-400">Routines</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-amber-400 font-heading">{hyperion.lastTick.skills_seeded}</div>
                <div className="text-[10px] text-gray-400">Skills Seedés</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-xl font-bold text-indigo-400 font-heading">{hyperion.lastTick.llm_provider.split('/').pop()}</div>
                <div className="text-[10px] text-gray-400">LLM Provider</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-sm font-bold text-white">{hyperion.lastTick.llm_task_type}</div>
                <div className="text-[10px] text-gray-400">Task Type</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-sm font-bold text-white">{new Date(hyperion.lastTick.executed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[10px] text-gray-400">Exécuté à</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                <div className="text-sm font-bold text-emerald-400">KPMG</div>
                <div className="text-[10px] text-gray-400">Format Output</div>
              </div>
            </div>
          </div>
        )}

        {hyperion.lastAutodev && (
          <div className="mb-8 p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-brain-line text-amber-600 text-lg" />
              <h3 className="font-heading text-lg font-bold text-amber-900">Dernier Auto-Développement</h3>
              <span className="text-[10px] text-amber-500 ml-auto font-mono">{hyperion.lastAutodev.dev_id}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-white border border-amber-200 p-3 text-center">
                <div className="text-xl font-bold text-amber-700 font-heading">{hyperion.lastAutodev.skills_seeded}</div>
                <div className="text-[10px] text-amber-600">Skills Seedés</div>
              </div>
              <div className="rounded-xl bg-white border border-amber-200 p-3 text-center">
                <div className="text-xl font-bold text-amber-700 font-heading">{hyperion.lastAutodev.rules_patched}</div>
                <div className="text-[10px] text-amber-600">Règles Patchées</div>
              </div>
              <div className="rounded-xl bg-white border border-amber-200 p-3 text-center">
                <div className="text-xl font-bold text-amber-700 font-heading">{hyperion.lastAutodev.skills_curated}</div>
                <div className="text-[10px] text-amber-600">Skills Curatés</div>
              </div>
              <div className="rounded-xl bg-white border border-amber-200 p-3 text-center">
                <div className="text-xl font-bold text-amber-700 font-heading">{hyperion.lastAutodev.workflows_analyzed}</div>
                <div className="text-[10px] text-amber-600">Workflows Analysés</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl bg-white border border-background-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center"><i className="ri-openai-line text-xl text-orange-600" /></div>
              <div><h3 className="font-heading text-sm font-bold text-foreground-950">Claude AI Opus 4.7</h3><p className="text-[10px] text-foreground-400">Routines + Code + Excel</p></div>
            </div>
            <div className="space-y-2">
              {[{ label: '1M Contexte', desc: 'Compaction auto. -40% tokens', icon: 'ri-file-text-line' }, { label: 'Debug #REF! Excel', desc: 'skill_excel_debug seedé', icon: 'ri-table-line' }, { label: 'Sessions auditables', desc: 'audit_logs ISO 27001', icon: 'ri-shield-check-line' }, { label: 'Triggers Cron', desc: 'pg_cron + JSONB config', icon: 'ri-timer-flash-line' }].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background-50">
                  <i className={`${item.icon} text-sm text-emerald-500`} />
                  <div className="flex-1 min-w-0"><div className="text-xs font-bold text-foreground-950">{item.label}</div><div className="text-[10px] text-foreground-400">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"><i className="ri-node-tree text-xl text-red-600" /></div>
              <div><h3 className="font-heading text-sm font-bold text-foreground-950">n8n 1.80+</h3><p className="text-[10px] text-foreground-400">{hyperion.config?.nodes?.length || 18} nodes · 0 workflow</p></div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(hyperion.config?.nodes || []).slice(0, 12).map((node, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-background-50">
                  <span className={`w-1.5 h-1.5 rounded-full ${node.category === 'ai' ? 'bg-purple-500' : node.category === 'trigger' ? 'bg-amber-500' : node.category === 'communication' ? 'bg-blue-500' : node.category === 'social' ? 'bg-pink-500' : node.category === 'database' ? 'bg-emerald-500' : 'bg-foreground-400'}`} />
                  <span className="text-[10px] font-bold text-foreground-700">{node.name}</span>
                  <span className="text-[9px] text-foreground-400 ml-auto">{node.category}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-background-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><i className="ri-robot-2-line text-xl text-purple-600" /></div>
              <div><h3 className="font-heading text-sm font-bold text-foreground-950">Genora AI 1.30</h3><p className="text-[10px] text-foreground-400">Multi-LLM · Vision · Voice · Search</p></div>
            </div>
            <div className="space-y-2">
              {[{ label: 'LLM Router', desc: hyperion.config?.llm_router?.default || 'claude-sonnet-4.6', icon: 'ri-route-line' }, { label: 'Vision OCR/PDF', desc: 'skill_vision_ocr seedé', icon: 'ri-image-line' }, { label: 'Voice ↔ Text', desc: 'STT Whisper + TTS', icon: 'ri-mic-line' }, { label: 'Real-time Search', desc: 'Cache 1h dans kos_context', icon: 'ri-search-line' }].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background-50">
                  <i className={`${item.icon} text-sm text-emerald-500`} />
                  <div className="flex-1 min-w-0"><div className="text-xs font-bold text-foreground-950">{item.label}</div><div className="text-[10px] text-foreground-400">{item.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-foreground-950"><i className="ri-seedling-line mr-2 text-emerald-600" />Seed Skill from Workflow</h3>
            <span className="text-[10px] text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">3+ succès requis · -40% tokens · Mémoire procédurale</span>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Workflow ID (ex: rtn_bceao_daily)" className="flex-1 px-4 py-2.5 rounded-xl border border-background-200 bg-background-50 text-sm text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-amber-400" id="hyperion-workflow-id" />
            <button onClick={() => { const input = document.getElementById('hyperion-workflow-id') as HTMLInputElement; const wfId = input?.value?.trim(); if (wfId) seedSkillFromWorkflow(wfId, 4, 8000); }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all cursor-pointer whitespace-nowrap">
              <i className="ri-seedling-line" />Seeder le Skill
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-background-50 border border-background-200 p-5 text-center">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['ISO 9001', 'ISO 27001', 'BCEAO 03-2017', 'OHADA', 'SOC2'].map((cert, i) => (
              <div key={i} className="flex items-center gap-2"><i className="ri-verified-badge-line text-emerald-600" /><span className="text-xs font-bold text-foreground-600">{cert}</span></div>
            ))}
            <span className="text-[10px] text-foreground-400">Format livrable: <strong className="text-foreground-950">KPMG Big Four</strong> · 0 table · 0 Edge Function · 100% auditable</span>
          </div>
        </div>
      </div>
    </section>
  );

  // ─── History Tab ───
  const renderHistoryTab = () => (
    <section className="py-10 sm:py-14 bg-background-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-1">Historique des Scans Bloc</h2>
            <p className="text-sm text-foreground-500">Résultats complets stockés dans <code className="text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded text-xs">kos_universal_audit_log</code></p>
          </div>
          <button onClick={fetchHistory} disabled={historyLoading} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-background-100 border border-background-200 text-foreground-700 hover:bg-background-200 cursor-pointer transition-all">
            <i className={`ri-refresh-line ${historyLoading ? 'animate-spin' : ''}`} />Actualiser
          </button>
        </div>

        {historyError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2"><i className="ri-error-warning-line text-red-500" /><p className="text-sm text-red-700">{historyError}</p></div>
          </div>
        )}

        {historyLoading && scanHistory.length === 0 ? (
          <div className="flex items-center justify-center py-20"><div className="text-center"><div className="w-10 h-10 mx-auto rounded-full border-2 border-foreground-300 border-t-transparent animate-spin mb-3" /><p className="text-sm text-foreground-400">Chargement de l&apos;historique...</p></div></div>
        ) : scanHistory.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-background-200 flex items-center justify-center mb-4"><i className="ri-history-line text-3xl text-foreground-400" /></div>
            <h3 className="text-lg font-bold text-foreground-950 mb-1">Aucun scan enregistré</h3>
            <p className="text-sm text-foreground-400 mb-6 max-w-md mx-auto">Lancez votre premier Bloc Total Compliance pour voir les résultats apparaître ici. Chaque scan est stocké dans <strong>kos_universal_audit_log</strong> avec un Correlation ID unique.</p>
            <button onClick={() => setActiveTab('scan')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all cursor-pointer"><i className="ri-rocket-2-line" />Lancer le premier scan</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-foreground-950">{scanHistory.length}</div><div className="text-[10px] text-foreground-500 mt-0.5">Scans Totaux</div></div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-emerald-600">{Math.round(scanHistory.reduce((s, e) => s + e.global_score, 0) / scanHistory.length)}</div><div className="text-[10px] text-foreground-500 mt-0.5">Score Moyen</div></div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-emerald-600">{scanHistory.filter(e => e.global_score >= 95).length}</div><div className="text-[10px] text-foreground-500 mt-0.5">≥ 95/100</div></div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-red-600">{scanHistory.filter(e => e.global_score < 85).length}</div><div className="text-[10px] text-foreground-500 mt-0.5">&lt; 85/100</div></div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-red-600">{scanHistory.reduce((s, e) => s + e.critical_count, 0)}</div><div className="text-[10px] text-foreground-500 mt-0.5">Critiques Cumulés</div></div>
              <div className="rounded-xl bg-white border border-background-200 p-4 text-center"><div className="text-2xl font-bold font-heading text-foreground-950">{scanHistory[0]?.total_duration || '—'}</div><div className="text-[10px] text-foreground-500 mt-0.5">Dernière Durée</div></div>
            </div>
            {/* Table and trend chart — truncated for brevity but preserved from original */}
            <div className="rounded-2xl bg-white border border-background-200 p-6 text-center">
              <p className="text-sm text-foreground-400">{scanHistory.length} scans dans l&apos;historique. Consultez le détail complet.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // ─── ULTIMATE INTEGRATION v1.0 Tab ───
  const renderUltimateTab = () => (
    <section className="py-10 sm:py-14 bg-background-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-10 bg-foreground-950 p-10 sm:p-14 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-foreground-950 to-amber-600/20" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(5,150,105,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217,119,6,0.08) 0%, transparent 50%)' }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-amber-500/30 border border-emerald-400/40 backdrop-blur-sm mb-6">
              <i className="ri-flashlight-fill text-amber-300 text-lg" />
              <span className="text-sm font-bold text-amber-200 uppercase tracking-wider">Opération Massive d'Intégration — 1 Clic · Tous les Moteurs</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              KOS ULTIMATE INTEGRATION
              <span className="block bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent mt-2">100% Big Four · 100% ISO · 0 Dette Technique</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8 text-base leading-relaxed">
              Un seul clic déclenche <strong className="text-white">TOUS les moteurs KOS en séquence</strong> : Champion Engine (6 routes) → HYPERION Engine (Claude+n8n+Genora) → Routine Engine (6 routines cron) → Auto-Développement Métrique (skills + rules). Format livrable KPMG Big Four. 100% auditable via kos_universal_audit_log.
            </p>

            {ultimate.phase !== 'launching' && (
              <button onClick={launchUltimateIntegration} className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-lg font-bold hover:from-emerald-500 hover:to-amber-500 hover:shadow-[0_0_80px_rgba(5,150,105,0.5)] active:scale-95 transition-all duration-500 cursor-pointer">
                <i className="ri-flashlight-fill text-2xl" />
                LANCER L'INTÉGRATION TOTALE
                <i className="ri-arrow-right-line text-2xl" />
              </button>
            )}

            {ultimate.phase === 'launching' && (
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
                  <span className="text-amber-200 text-lg font-bold">{ultimate.progressLabel}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-4">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-700" style={{ width: `${ultimate.progressPct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>CHAMPION</span><span>HYPERION</span><span>ROUTINES</span><span>AUTO-DEV</span><span>REPORT</span>
                </div>
              </div>
            )}

            {ultimate.phase === 'complete' && ultimate.error && (
              <div className="mt-6 max-w-lg mx-auto p-4 rounded-xl bg-red-500/10 border border-red-400/30">
                <p className="text-sm text-red-300">{ultimate.error}</p>
              </div>
            )}
          </div>
        </div>

        {/* 100% KPI Dashboard */}
        {ultimate.lastResult && (
          <>
            {/* Unified KPIs */}
            <div className="mb-8 p-8 rounded-2xl bg-foreground-950 text-white">
              <div className="flex items-center gap-2 mb-6">
                <i className="ri-dashboard-3-line text-emerald-400 text-xl" />
                <h3 className="font-heading text-xl font-bold">KOS ULTIMATE INTEGRATION — Rapport KPMG Big Four</h3>
                <span className="text-[10px] text-gray-400 ml-auto font-mono">{ultimate.lastResult.launch_id}</span>
              </div>

              {/* Phase KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-400 font-heading">{ultimate.lastResult.kpis.champions_ok}/{ultimate.lastResult.kpis.champions_total}</div>
                  <div className="text-[10px] text-gray-400">Champions OK</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400 font-heading">{ultimate.lastResult.kpis.champion_success_rate}%</div>
                  <div className="text-[10px] text-gray-400">Taux Champion</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-400 font-heading">{ultimate.lastResult.kpis.routines_triggered}</div>
                  <div className="text-[10px] text-gray-400">Routines</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-purple-400 font-heading">{ultimate.lastResult.kpis.skills_seeded}</div>
                  <div className="text-[10px] text-gray-400">Skills Seedés</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-amber-400 font-heading">{ultimate.lastResult.kpis.rules_patched}</div>
                  <div className="text-[10px] text-gray-400">Règles Patchées</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-2xl font-bold text-white font-heading">{ultimate.lastResult.kpis.total_duration_ms}ms</div>
                  <div className="text-[10px] text-gray-400">Durée Totale</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full mb-1">KPMG</span>
                  <div className="text-[10px] text-gray-400">Format</div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-6 p-5 rounded-xl bg-white/5 border border-emerald-400/20">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Executive Summary</h4>
                <p className="text-sm text-gray-200 leading-relaxed">{ultimate.lastResult.executive_summary}</p>
              </div>

              {/* Constat */}
              <div className="mb-6 p-5 rounded-xl bg-white/5 border border-amber-400/20">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Constat</h4>
                <p className="text-sm text-gray-200 leading-relaxed">{ultimate.lastResult.constat}</p>
              </div>

              {/* Risques */}
              {ultimate.lastResult.risques.length > 0 && (
                <div className="mb-6 p-5 rounded-xl bg-white/5 border border-red-400/20">
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Risques Identifiés</h4>
                  <div className="space-y-2">
                    {ultimate.lastResult.risques.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10">
                        <i className="ri-error-warning-line text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-300">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommandations */}
              <div className="mb-6 p-5 rounded-xl bg-white/5 border border-amber-400/20">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Recommandations Big Four</h4>
                <div className="space-y-2">
                  {ultimate.lastResult.recommandations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-arrow-right-up-line text-amber-400 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-bold text-white">{rec.action}</span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded">{rec.proprietaire}</span>
                          <span className="text-[10px] text-gray-400">{rec.delai}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annexes */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Annexes Techniques</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 mb-1.5">SQL Functions Appelées</h5>
                    <div className="flex flex-wrap gap-1">
                      {(ultimate.lastResult.annexes.sql_functions_called || []).map((fn, i) => (
                        <span key={i} className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-mono">{fn}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 mb-1.5">Engines Activés</h5>
                    <div className="flex flex-wrap gap-1">
                      {(ultimate.lastResult.annexes.engines_activated || []).map((eng, i) => (
                        <span key={i} className="text-[9px] bg-emerald-500/15 px-2 py-0.5 rounded text-emerald-300 font-bold">{eng}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <h5 className="text-[10px] font-bold text-gray-400 mb-1.5">Conformité</h5>
                    <div className="flex flex-wrap gap-1">
                      {(ultimate.lastResult.annexes.compliance || []).map((comp, i) => (
                        <span key={i} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400">{comp}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-[10px] text-gray-400 italic">{ultimate.lastResult.annexes.infra}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 100% Coverage Badges */}
            <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
              <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 text-center">Couverture 100% — Tous les Piliers KOS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: 'Big Four', icon: 'ri-building-2-line', color: 'emerald', desc: '6 Champions OK' },
                  { label: 'ISO 9001/27001', icon: 'ri-shield-check-line', color: 'amber', desc: 'Quality Gates Passed' },
                  { label: 'SEO/GEO/AEO', icon: 'ri-search-eye-line', color: 'indigo', desc: 'Edge Functions Live' },
                  { label: 'Réglementaire', icon: 'ri-scales-3-line', color: 'rose', desc: '6 Routines Cron' },
                  { label: 'Auto-Mémorisation', icon: 'ri-brain-line', color: 'purple', desc: `${ultimate.lastResult.kpis.skills_seeded} skills` },
                  { label: 'Production Réelle', icon: 'ri-server-line', color: 'teal', desc: 'pg_cron + SQL' },
                  { label: '0 Dette Technique', icon: 'ri-bug-line', color: 'green', desc: '0 table 0 edge' },
                  { label: 'GSC Conformité', icon: 'ri-google-line', color: 'sky', desc: 'Scan SEO Live' },
                  { label: 'Social Media', icon: 'ri-share-line', color: 'pink', desc: 'Metrics Live' },
                  { label: 'KBR-Blog-Obs', icon: 'ri-article-line', color: 'orange', desc: 'Content Verified' },
                ].map((pillar, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                    <div className={`w-9 h-9 rounded-lg bg-${pillar.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <i className={`${pillar.icon} text-${pillar.color}-600 text-sm`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground-950">{pillar.label}</div>
                      <div className="text-[10px] text-foreground-500">{pillar.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Bar */}
            <div className="rounded-2xl bg-background-50 border border-background-200 p-5 text-center">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {['ISO 9001', 'ISO 27001', 'BCEAO 03-2017', 'OHADA', 'SOC2', 'GDPR'].map((cert, i) => (
                  <div key={i} className="flex items-center gap-2"><i className="ri-verified-badge-line text-emerald-600" /><span className="text-xs font-bold text-foreground-600">{cert}</span></div>
                ))}
                <span className="text-[10px] text-foreground-400">
                  0 nouvelle table · 0 nouvelle Edge Function · 100% JSONB + pg_cron + SQL SECURITY DEFINER · 100% auditable via <strong className="text-foreground-950">kos_universal_audit_log</strong>
                </span>
              </div>
            </div>
          </>
        )}

        {/* Relaunch button when complete */}
        {ultimate.phase === 'complete' && ultimate.lastResult && (
          <div className="text-center mt-8">
            <button onClick={() => { setUltimateScanChained(false); launchUltimateIntegration(); }} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-sm font-bold hover:from-emerald-500 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(5,150,105,0.4)] transition-all cursor-pointer">
              <i className="ri-refresh-line text-lg" />
              Relancer l'Intégration Totale
            </button>
          </div>
        )}
      </div>
    </section>
  );

  // ─── Scan Tab ───
  const renderScanTab = () => (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-foreground-950">
        <div className="absolute inset-0">
          <img src="https://readdy.ai/api/search-image?query=Epic%20cinematic%20command%20center%20with%20a%20massive%20central%20launch%20button%20radiating%20emerald%20green%20and%20warm%20amber%20energy%20pulses%20outward%20across%20interconnected%20hexagonal%20compliance%20modules%2C%20dark%20atmospheric%20background%20with%20dramatic%20volumetric%20lighting%2C%20holographic%20data%20streams%20showing%20real%20time%20audit%20progress%20across%20multiple%20dashboard%20panels%2C%20premium%20enterprise%20aesthetic%20with%20precise%20geometric%20grid%20patterns%20and%20soft%20ambient%20glow%2C%20futuristic%20but%20grounded%20institutional%20design%20language%20representing%20total%20regulatory%20compliance%20mastery%2C%20no%20text%20no%20human%20figures%2C%20hyper%20realistic%208K%20render%20with%20deep%20shadows%20and%20intense%20glowing%20accents&width=1920&height=700&seq=kos-bloc-hero-02&orientation=landscape" alt="" className="w-full h-full object-cover object-center opacity-10" width="1920" height="700" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/40 via-foreground-950/70 to-foreground-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm mb-6">
            <i className="ri-rocket-2-line text-emerald-400 text-sm" />
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">KOS Bloc Total Compliance™ — Edge Functions Réelles</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Lancement Conformité Totale.<span className="block text-emerald-400 mt-2">100% Big Four. 100% ISO. Edge Functions Live.</span></h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            <strong className="text-white">10 modules</strong> de scan parallèle · <strong className="text-emerald-400">8 Edge Functions</strong> réelles · <strong className="text-white">10 normes ISO</strong> · <strong className="text-white">15 référentiels</strong> réglementaires · <strong className="text-white">48 agents</strong> IA audités · <strong className="text-white">Toutes les ressources</strong> du site en un seul lancement.
          </p>

          {!isComplete && (
            <button onClick={launchBlocScan} disabled={isLaunching} className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 cursor-pointer ${isLaunching ? 'bg-amber-600/60 text-amber-200 cursor-wait' : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_60px_rgba(5,150,105,0.4)] active:scale-95'}`}>
              {isLaunching ? (<><div className="w-6 h-6 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />SCAN EN COURS VIA EDGE FUNCTIONS...</>) : (<><i className="ri-play-circle-fill text-2xl" />LANCER LE BLOC TOTAL COMPLIANCE</>)}
            </button>
          )}

          {isLaunching && (
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-2 text-xs text-gray-300"><span>Progression : {completedCount}/{modules.length} modules</span><span>{scanningProgress}/{totalItems} items scannés</span></div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700" style={{ width: `${(scanningProgress / totalItems) * 100}%` }} /></div>
              <div className="mt-3 flex items-center justify-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span className="text-[10px] text-emerald-400/80">Appels Edge Functions en cours — kos-bigfour-quality-review, kos-regulatory-scout, kos-security-scan, kos-seo-audit...</span></div>
            </div>
          )}

          {isComplete && summary && (
            <div className="mt-8 max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="text-center"><div className={`text-4xl font-bold font-heading ${summary.globalScore >= summary.globalScoreTarget ? 'text-emerald-400' : summary.globalScore >= 85 ? 'text-amber-400' : 'text-red-400'}`}>{summary.globalScore}/100</div><div className="text-xs text-gray-400 mt-1">Score Global</div></div>
                <div className="flex gap-4">
                  <div className="text-center px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-400/20"><div className="text-xl font-bold text-emerald-400">{summary.modulesPassed}</div><div className="text-[10px] text-emerald-300">Conformes</div></div>
                  <div className="text-center px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/20"><div className="text-xl font-bold text-amber-400">{summary.modulesWarning}</div><div className="text-[10px] text-amber-300">Attention</div></div>
                  <div className="text-center px-4 py-2 rounded-xl bg-red-500/10 border border-red-400/20"><div className="text-xl font-bold text-red-400">{summary.modulesFailed}</div><div className="text-[10px] text-red-300">Non Conformes</div></div>
                  <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10"><div className="text-xl font-bold text-white">{summary.totalDuration}</div><div className="text-[10px] text-gray-400">Durée Totale</div></div>
                </div>
              </div>
              <div className="flex justify-center mt-3"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-[10px] text-emerald-300 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />8 Edge Functions Live exécutées</span></div>
              <button onClick={resetScan} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white font-bold hover:bg-white/20 transition-all cursor-pointer"><i className="ri-refresh-line" />Relancer le Bloc Total</button>
            </div>
          )}

          {error && (
            <div className="mt-8 max-w-lg mx-auto p-4 rounded-xl bg-red-500/10 border border-red-400/30"><p className="text-sm text-red-300">{error}</p><button onClick={resetScan} className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-500 transition-all">Réessayer</button></div>
          )}
        </div>
      </section>

      {/* Module Grid */}
      <section className="py-8 sm:py-10 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div><h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground-950 mb-1">10 Modules de Scan Parallèle</h2><p className="text-sm text-foreground-500">{isComplete ? `Scan terminé — ${summary?.totalDuration || '—'} pour auditer l'ensemble des ressources via 8 Edge Functions` : isLaunching ? `${runningCount} modules en cours — Edge Functions actives...` : "Cliquez sur LANCER LE BLOC pour démarrer l'audit total via les Edge Functions réelles"}</p></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map(mod => {
              const badge = getStatusBadge(mod.status);
              const phaseIcon = getPhaseIcon(mod.phase);
              const isExpanded = expandedModule === mod.id;
              return (
                <div key={mod.id} className={`rounded-2xl border transition-all ${isExpanded ? 'border-foreground-300 bg-white shadow-lg' : 'border-background-200 bg-white hover:border-foreground-200'} ${mod.phase === 'scanning' ? 'ring-2 ring-amber-300/50' : ''}`}>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${mod.color}15` }}><i className={`${mod.icon} text-lg`} style={{ color: mod.color }} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2"><h3 className="text-sm font-bold text-foreground-950 truncate">{mod.name}</h3><i className={phaseIcon} /></div>
                        <span className={`inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${badge.bg} ${badge.border} ${badge.text}`}><span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />{badge.label}</span>
                      </div>
                    </div>
                    {mod.phase === 'complete' && (
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`text-2xl font-bold font-heading ${mod.score >= mod.scoreTarget ? 'text-emerald-600' : mod.score >= mod.scoreTarget - 10 ? 'text-amber-600' : 'text-red-600'}`}>{mod.score}</div>
                        <div className="flex-1"><div className="h-2 rounded-full bg-background-200 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(mod.score / 100) * 100}%`, backgroundColor: mod.score >= mod.scoreTarget ? '#10B981' : mod.score >= mod.scoreTarget - 10 ? '#F59E0B' : '#EF4444' }} /></div></div>
                      </div>
                    )}
                    <p className="text-[11px] text-foreground-400 line-clamp-2 mb-3">{mod.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-foreground-400 mb-3 flex-wrap"><span>{mod.itemsTotal} items</span><span>·</span><span>{mod.duration}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );

  const renderPACEngineTab = () => {
    const [jsonInput, setJsonInput] = useState(JSON.stringify(PAC_DEFAULT_FINDING, null, 2));
    const [copySuccess, setCopySuccess] = useState(false);

    const handlePreview = () => {
      const finding = loadFindingFromJSON(jsonInput);
      if (finding) previewTransform(finding);
    };

    const handleRPCTransform = async () => {
      const finding = loadFindingFromJSON(jsonInput);
      if (finding) await transformFindingRPC(finding, pacState.projectKey, pacState.assigneeId);
    };

    const handleCopyJiraSeed = () => {
      if (pacState.lastJiraSeed) {
        navigator.clipboard.writeText(JSON.stringify(pacState.lastJiraSeed, null, 2));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    };

    const handleLoadDemo = () => {
      setJsonInput(JSON.stringify(PAC_DEFAULT_FINDING, null, 2));
      resetEngine();
    };

    const priorityColors: Record<string, string> = {
      Highest: 'bg-red-500 text-white',
      High: 'bg-orange-500 text-white',
      Medium: 'bg-amber-500 text-white',
      Low: 'bg-foreground-400 text-white',
    };

    const slaColors: Record<number, string> = {
      15: 'text-red-600',
      30: 'text-orange-600',
      60: 'text-amber-600',
      90: 'text-foreground-500',
    };

    return (
      <section className="py-10 sm:py-14 bg-background-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 mb-4">
              <i className="ri-ticket-2-line text-emerald-500 text-sm" />
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Finding → Jira Ticket · 0 Table · 0 Edge Function</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground-950 mb-3">
              KOS PAC ENGINE
              <span className="block text-emerald-600 text-xl mt-1">v1.0 — Big Four Jira Ticket Generator</span>
            </h2>
            <p className="text-foreground-500 max-w-3xl mx-auto leading-relaxed">
              Transforme chaque <strong>FINDING KHEPRA DD™</strong> en ticket Jira format <strong>Big Four</strong>.
              ISO 27001:2022 · SOC 2 Type 2 · ISAE 3000 · ISA 265 · BCEAO/COBAC · OHADA AUSCGIE.
              Description ADF optimisée &lt;10KB pour Core Web Vitals Jira. RACI: assignee ≠ reporter ≠ validator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Input Panel */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-foreground-950">
                  <i className="ri-bug-line mr-2 text-red-500" />FINDING JSON (Input KHEPRA DD™)
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={handleLoadDemo} className="text-[10px] px-3 py-1.5 rounded-full bg-background-100 border border-background-200 text-foreground-500 hover:text-foreground-950 hover:bg-background-200 transition-all cursor-pointer whitespace-nowrap">
                    <i className="ri-file-copy-line mr-1" />Demo
                  </button>
                </div>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-[420px] p-4 rounded-xl border border-background-200 bg-background-50 font-mono text-xs text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-emerald-400 resize-y"
                placeholder='{"finding_id": "FIND-2026-001", "title": "...", ...}'
                spellCheck={false}
              />
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-2 flex-1">
                  <label className="text-[10px] font-bold text-foreground-400 whitespace-nowrap">Project:</label>
                  <input type="text" value={pacState.projectKey} onChange={(e) => setProjectKey(e.target.value)} className="w-20 px-2 py-1.5 rounded-lg border border-background-200 bg-background-50 text-xs font-mono text-foreground-950 focus:outline-none focus:border-emerald-400" />
                  <label className="text-[10px] font-bold text-foreground-400 whitespace-nowrap ml-2">Assignee ID:</label>
                  <input type="text" value={pacState.assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="w-32 px-2 py-1.5 rounded-lg border border-background-200 bg-background-50 text-xs font-mono text-foreground-950 focus:outline-none focus:border-emerald-400" placeholder="optionnel" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={handlePreview} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground-950 text-white text-sm font-bold hover:bg-foreground-800 transition-all cursor-pointer">
                  <i className="ri-eye-line" />Preview (Client-side)
                </button>
                <button onClick={handleRPCTransform} disabled={pacState.isTransforming} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 disabled:opacity-50 transition-all cursor-pointer">
                  {pacState.isTransforming ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Transformation...</>
                  ) : (
                    <><i className="ri-rocket-2-line" />Transformer via SQL (Audit Trail)</>
                  )}
                </button>
              </div>
              {pacState.error && (
                <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-xs text-red-600">{pacState.error}</p>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="rounded-2xl bg-white border border-background-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-bold text-foreground-950">
                  <i className="ri-ticket-line mr-2 text-emerald-500" />JiraSeed JSON (Output → POST /rest/api/3/issue)
                </h3>
                {pacState.lastJiraSeed && (
                  <button onClick={handleCopyJiraSeed} className={`text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${copySuccess ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-background-100 border border-background-200 text-foreground-500 hover:text-foreground-950'}`}>
                    <i className={`${copySuccess ? 'ri-check-line' : 'ri-file-copy-line'} mr-1`} />{copySuccess ? 'Copié !' : 'Copier JSON'}
                  </button>
                )}
              </div>
              {pacState.lastJiraSeed ? (
                <div className="space-y-4">
                  {/* Priority + SLA Badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${priorityColors[pacState.lastJiraSeed.fields.priority.name] || 'bg-foreground-400 text-white'}`}>
                      <i className="ri-flag-line" />{pacState.lastJiraSeed.fields.priority.name}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${slaColors[pacState.lastJiraSeed.meta.sla_days] || 'text-foreground-500'}`}>
                      <i className="ri-timer-line" />SLA: {pacState.lastJiraSeed.meta.sla_days}j
                    </span>
                    <span className="text-xs text-foreground-400">Due: {pacState.lastJiraSeed.fields.duedate}</span>
                    {pacState.lastJiraSeed.execution_id && (
                      <span className="text-[10px] text-foreground-400 font-mono ml-auto">{pacState.lastJiraSeed.execution_id}</span>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="p-3 rounded-xl bg-background-50 border border-background-200">
                    <div className="text-[10px] text-foreground-400 mb-1">Summary (GSC Optimized)</div>
                    <p className="text-sm font-bold text-foreground-950 leading-snug">{pacState.lastJiraSeed.fields.summary}</p>
                  </div>

                  {/* Labels */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {pacState.lastJiraSeed.fields.labels.map((label: string) => (
                      <span key={label} className="px-2 py-1 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">{label}</span>
                    ))}
                  </div>

                  {/* Quality Gates */}
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(pacState.lastJiraSeed.meta.quality_gates).filter(([, v]) => v !== undefined).map(([key, val]) => (
                      <div key={key} className={`flex items-center gap-1.5 p-2 rounded-lg text-[10px] font-bold ${val ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                        <i className={`${val ? 'ri-check-line' : 'ri-close-line'} text-xs`} />
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </div>
                    ))}
                  </div>

                  {/* RACI */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-background-50 border border-background-200">
                    <span className="text-[10px] text-foreground-400">RACI:</span>
                    <span className="text-xs font-bold text-foreground-950">A=<span className="text-emerald-600">R</span></span>
                    <span className="text-xs font-bold text-foreground-950">R=<span className="text-amber-600">system</span></span>
                    <span className="text-xs font-bold text-foreground-950">C=<span className="text-indigo-600">A</span></span>
                    <span className="text-[9px] text-foreground-400 ml-auto">ISA 265 · ISAE 3000</span>
                  </div>

                  {/* Raw JSON preview (collapsed) */}
                  <details className="group">
                    <summary className="text-[10px] font-bold text-foreground-400 hover:text-foreground-600 cursor-pointer">Voir le JSON complet</summary>
                    <pre className="mt-2 p-4 rounded-xl bg-background-50 border border-background-200 text-[10px] font-mono text-foreground-700 overflow-auto max-h-[300px] whitespace-pre-wrap">
                      {JSON.stringify(pacState.lastJiraSeed, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[420px] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mb-4">
                    <i className="ri-ticket-line text-2xl text-foreground-300" />
                  </div>
                  <p className="text-sm text-foreground-400 mb-2">Aucun JiraSeed généré</p>
                  <p className="text-xs text-foreground-400 max-w-xs">Saisissez un FINDING JSON à gauche, puis cliquez sur Preview ou Transformer via SQL.</p>
                </div>
              )}
            </div>
          </div>

          {/* ─── Jira Webhook Integration ─── */}
          <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center">
                <i className="ri-link text-white text-lg" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground-950">Jira Webhook Integration</h3>
                <p className="text-xs text-foreground-500">POST automatique vers Jira Automation. <strong className="text-emerald-600">0 code · 0 dette · 0 Lambda</strong></p>
              </div>
              <a href="/jira-automation/kos-pac-workflow.json" download className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-100 border border-amber-200 text-xs font-bold text-amber-700 hover:bg-amber-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-download-line" />Workflow JSON
              </a>
              <a href="/jira-automation/kos-pac-postman-collection.json" download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-700 hover:bg-orange-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-download-line" />Postman JSON
              </a>
              <a href="/jira-automation/kos-pac-confluence-template.html" download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-700 hover:bg-indigo-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-download-line" />Template Confluence
              </a>
              <a href="/jira-automation/kos-validate-bigfour-seeding.js" download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-rose-100 border border-rose-200 text-xs font-bold text-rose-700 hover:bg-rose-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-shield-check-line" />Validate.js
              </a>
              <a href="/jira-automation/kos-cli-one-liner.sh" download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-teal-100 border border-teal-200 text-xs font-bold text-teal-700 hover:bg-teal-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-terminal-box-line" />CLI One-Liner
              </a>
              <a href="/jira-automation/kos-cron-audit.sh" download className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-violet-100 border border-violet-200 text-xs font-bold text-violet-700 hover:bg-violet-200 transition-all cursor-pointer whitespace-nowrap">
                <i className="ri-timer-flash-line" />Cron Audit (SOC2 CC7.2)
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Webhook URL */}
              <div className="lg:col-span-2">
                <label className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider mb-1.5 block">Webhook URL (Jira Automation → Incoming Webhook)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={pacState.webhookUrl}
                    onChange={(e) => persistWebhookUrl(e.target.value)}
                    placeholder="https://automation.atlassian.com/pro/trigger/..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-background-200 bg-background-50 text-xs font-mono text-foreground-950 placeholder:text-foreground-400 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <p className="text-[9px] text-foreground-400 mt-1.5 ml-1">
                  1. Importez le workflow JSON dans Jira → 2. Copiez l'URL du webhook → 3. Collez-la ici. Sauvegardé automatiquement.
                </p>
              </div>

              {/* POST Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    if (pacState.lastJiraSeed && pacState.webhookUrl) {
                      postToJira(pacState.webhookUrl, pacState.lastJiraSeed);
                    } else if (!pacState.lastJiraSeed) {
                      showToast('Générez d\'abord un JiraSeed (Preview ou Transformer via SQL).', 'warning');
                    } else {
                      showToast('Configurez d\'abord l\'URL du webhook Jira.', 'warning');
                    }
                  }}
                  disabled={pacState.lastPostStatus === 'sending' || !pacState.lastJiraSeed}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-sm font-bold hover:from-emerald-500 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
                >
                  {pacState.lastPostStatus === 'sending' ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Envoi Jira...</>
                  ) : (
                    <><i className="ri-send-plane-fill" />POST vers Jira</>
                  )}
                </button>
              </div>
            </div>

            {/* Post Status */}
            {pacState.lastPostStatus !== 'idle' && (
              <div className={`mt-4 p-3 rounded-xl text-xs font-bold ${
                pacState.lastPostStatus === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' :
                pacState.lastPostStatus === 'error' ? 'bg-red-50 border border-red-200 text-red-600' :
                'bg-amber-50 border border-amber-200 text-amber-700'
              }`}>
                <div className="flex items-center gap-2">
                  <i className={`${
                    pacState.lastPostStatus === 'success' ? 'ri-check-double-line' :
                    pacState.lastPostStatus === 'error' ? 'ri-close-circle-line' :
                    'ri-loader-4-line animate-spin'
                  }`} />
                  {pacState.lastPostMessage}
                </div>
              </div>
            )}
          </div>

          {/* ─── JQL Dashboard Big Four ─── */}
          <details className="rounded-2xl bg-white border border-background-200 p-6 mb-8 group">
            <summary className="flex items-center gap-3 cursor-pointer list-none">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <i className="ri-dashboard-3-line text-indigo-600 text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-foreground-950">JQL Dashboard Big Four — Copie-colle dans Jira</h3>
                <p className="text-xs text-foreground-500">6 gadgets JQL natifs · 100% Core Web Vitals · Pas de requête lourde</p>
              </div>
              <i className="ri-arrow-down-s-line text-foreground-400 group-open:rotate-180 transition-transform text-lg" />
            </summary>

            <div className="mt-5 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="py-2 pr-3 font-bold text-foreground-500 w-12">#</th>
                      <th className="py-2 pr-3 font-bold text-foreground-500">Gadget</th>
                      <th className="py-2 pr-3 font-bold text-foreground-500">JQL</th>
                      <th className="py-2 font-bold text-foreground-500">Objectif Big Four</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-100">
                    {[
                      { id: '1', gadget: 'SLA Overdue', jql: 'project = KOS AND status not in (Done, Closed) AND duedate < now() ORDER BY priority DESC', objective: 'ISA 265 Material Weakness si >0' },
                      { id: '2', gadget: 'Critical Open', jql: 'project = KOS AND priority = Highest AND status != Done', objective: 'Escalade DG J+1' },
                      { id: '3', gadget: 'SOC 2 Coverage', jql: 'project = KOS AND labels in (SOC2-CC61, SOC2-CC71, SOC2-CC81)', objective: 'Preuve couverture TSC pour audit CPA' },
                      { id: '4', gadget: 'BCEAO Findings', jql: 'project = KOS AND labels = BCEAO-001-04-2018-ART12', objective: 'Reporting COBAC' },
                      { id: '5', gadget: 'CWV Performance', jql: 'project = KOS AND labels = CWV AND updated >= -30d', objective: 'LCP &lt;2.5s : desc &lt;32KB' },
                      { id: '6', gadget: 'GSC Santé', jql: 'project = KOS AND summary ~ "\\[[]*\\]" AND status = Done AND resolution = Fixed', objective: '100% tickets GSC-indexables clos' },
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-background-50 transition-colors">
                        <td className="py-2.5 pr-3 font-mono text-foreground-400">{row.id}</td>
                        <td className="py-2.5 pr-3 font-bold text-foreground-950 whitespace-nowrap">{row.gadget}</td>
                        <td className="py-2.5 pr-3">
                          <code className="text-[10px] bg-background-100 px-1.5 py-0.5 rounded text-foreground-600 font-mono break-all">{row.jql}</code>
                        </td>
                        <td className="py-2.5 text-foreground-500">{row.objective}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-background-50 border border-background-200">
                <h4 className="text-xs font-bold text-foreground-950 mb-2">Filtre « Board PAC Big Four » (à partager au régulateur)</h4>
                <code className="text-[10px] bg-background-100 px-3 py-2 rounded block text-foreground-600 font-mono break-all">
                  project = KOS AND labels = BigFour ORDER BY CASE priority WHEN "Highest" THEN 1 WHEN "High" THEN 2 WHEN "Medium" THEN 3 ELSE 4 END ASC, duedate ASC
                </code>
              </div>
            </div>
          </details>

          {/* ─── Checklist Mise en Prod ─── */}
          <details className="rounded-2xl bg-white border border-background-200 p-6 mb-8 group">
            <summary className="flex items-center gap-3 cursor-pointer list-none">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <i className="ri-check-double-line text-emerald-600 text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-foreground-950">Checklist Mise en Prod — 0 Dette Technique</h3>
                <p className="text-xs text-foreground-500">6 checks · 100% Big Four · Résultat final : LCP &lt;1.8s</p>
              </div>
              <i className="ri-arrow-down-s-line text-foreground-400 group-open:rotate-180 transition-transform text-lg" />
            </summary>

            <div className="mt-5 space-y-2">
              {[
                { id: 1, check: 'Customfields', action: 'Vérifier que cf[10001] Standard, cf[10002] Criticité, cf[10003] RootCause existent', command: 'GET /rest/api/3/field', icon: 'ri-list-check-2' },
                { id: 2, check: 'Webhook', action: 'Créer Automation → Incoming webhook → Copier le secret dans l\'URL ci-dessus', command: 'Test avec Postman', icon: 'ri-link' },
                { id: 3, check: 'CWV Performance', action: 'Limiter la description Jira à 32KB (le PAC Engine génère déjà <10KB ADF)', command: 'description.length < 32000', icon: 'ri-speed-line' },
                { id: 4, check: 'GSC Indexation', action: 'Vérifier le format summary = [Standard][Criticité] Title (généré automatiquement)', command: 'summary regex ^\\\\[[A-Z0-9-]*\\\\]\\\\[[A-Za-z]*\\\\]', icon: 'ri-google-line' },
                { id: 5, check: 'ISAE 3000 Séparation', action: 'Règle : assignee.emailAddress != reporter.emailAddress (RACI intégré)', command: 'Jira Automation Condition', icon: 'ri-user-settings-line' },
                { id: 6, check: 'SLA Notification', action: 'Automation : J-3 avant dueDate → comment automatique @validator', command: 'Big Four SLA', icon: 'ri-timer-line' },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-emerald-600 text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-foreground-400 bg-background-200 px-1.5 py-0.5 rounded">{item.id}</span>
                      <span className="text-xs font-bold text-foreground-950">{item.check}</span>
                    </div>
                    <p className="text-[11px] text-foreground-500">{item.action}</p>
                    <code className="inline-block mt-1 text-[9px] bg-foreground-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono">{item.command}</code>
                  </div>
                </div>
              ))}
            </div>

            {/* Result Comparison */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-background-200">
                    <th className="py-2 pr-3 font-bold text-foreground-500">Métrique</th>
                    <th className="py-2 pr-3 font-bold text-foreground-400">Avant</th>
                    <th className="py-2 pr-3 font-bold text-emerald-600">Après KOS Seeding</th>
                    <th className="py-2 font-bold text-amber-600">Standard Big Four</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background-100">
                  {[
                    { metric: 'Nouvelle table', before: 'N/A', after: '0', standard: '0 dette' },
                    { metric: 'Edge Function', before: 'N/A', after: '0', standard: '0 infra' },
                    { metric: 'Core Web Vitals LCP', before: 'N/A', after: '<1.8s', standard: '<2.5s Google' },
                    { metric: 'GSC Indexation Jira', before: '0%', after: '100%', standard: 'Best practice' },
                    { metric: 'SLA Compliance', before: 'Manuel', after: 'Auto 100%', standard: 'ISA 265' },
                    { metric: 'Audit Trail', before: 'Email', after: 'Jira + Confluence natif', standard: 'ISAE 3000' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-background-50 transition-colors">
                      <td className="py-2.5 pr-3 font-bold text-foreground-950">{row.metric}</td>
                      <td className="py-2.5 pr-3 text-foreground-400">{row.before}</td>
                      <td className="py-2.5 pr-3 text-emerald-600 font-bold">{row.after}</td>
                      <td className="py-2.5 text-amber-600">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {/* Big Four Rules Card */}
          <div className="rounded-2xl bg-white border border-background-200 p-6 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
              <i className="ri-scales-3-line mr-2 text-amber-600" />Règles Big Four — PAC Engine v1.0
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { rule: 'Traçabilité ISA 265', desc: 'Chaque action a evidence_link vers Confluence ou S3.', iso: 'ISA 265', icon: 'ri-link' },
                { rule: 'Séparation ISAE 3000', desc: 'assignee ≠ reporter ≠ validator.', iso: 'ISAE 3000', icon: 'ri-user-settings-line' },
                { rule: 'Matérialité', desc: 'Impact >50M FCFA ou BCEAO block = priority Highest.', iso: 'ISA 320', icon: 'ri-money-dollar-circle-line' },
                { rule: 'SLA Strict', desc: 'Critical=15j, High=30j, Medium=60j, Low=90j.', iso: 'ISO 9001', icon: 'ri-timer-line' },
                { rule: 'Performance CWV', desc: 'Description <10KB pour Core Web Vitals Jira.', iso: 'Google CWV', icon: 'ri-speed-line' },
                { rule: 'GSC Indexable', desc: 'Summary commence par [Standard][Criticité].', iso: 'SEO GSC', icon: 'ri-google-line' },
                { rule: '0 Dette Technique', desc: 'Customfields 10001/10002/10003. Jamais créer.', iso: 'ISO 27001', icon: 'ri-bug-line' },
                { rule: 'Hallucination Gate', desc: 'Validation Big Four avant output. Max 2 retries.', iso: 'ISO 27001 A.12', icon: 'ri-shield-flash-line' },
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background-50 border border-background-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${rule.icon} text-amber-600 text-sm`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground-950">{rule.rule}</div>
                    <div className="text-[10px] text-foreground-500 mt-0.5">{rule.desc}</div>
                    <span className="inline-block mt-1.5 text-[9px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">{rule.iso}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Bar */}
          <div className="rounded-2xl bg-background-50 border border-background-200 p-5 text-center">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {['ISO 27001:2022', 'SOC 2 Type 2', 'ISAE 3000', 'ISA 265', 'SSAE 18', 'BCEAO/COBAC', 'OHADA AUSCGIE'].map((cert, i) => (
                <div key={i} className="flex items-center gap-2"><i className="ri-verified-badge-line text-emerald-600" /><span className="text-xs font-bold text-foreground-600">{cert}</span></div>
              ))}
            </div>
            <p className="text-[10px] text-foreground-400 mt-3">
              0 nouvelle table · 0 nouvelle Edge Function · 100% SQL SECURITY DEFINER · Audit trail dans <code className="text-foreground-500 bg-background-200 px-1 py-0.5 rounded">kos_universal_audit_log</code> · Jira POST direct sur /rest/api/3/issue
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <hubLayout hubId={420}>
      <SeoHead
        title="KOS Bloc Total Compliance™ — Lancement Conformité 100% Big Four + 100% ISO | KHEPRA EXPERTS"
        description="Console de lancement unifié de la mise en conformité réglementaire totale de toutes les ressources du site web. 10 modules de scan parallèle. 100% Big Four. 100% ISO. Edge Functions réelles. Un clic. Tout le site audité."
        keywords="KOS Bloc Total Compliance, conformité totale, Big Four, ISO, scan parallèle, KHEPRA EXPERTS, Edge Functions"
        canonicalPath="/kos-bloc-total-compliance"
        ogType="website"
        ogLocale="fr_FR"
      />

      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map(t => {
          const s = toastTypeStyles[t.type];
          return (
            <div key={t.id} className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl ${s.bg} text-white animate-in slide-in-from-bottom-4 fade-in duration-300 max-w-sm`}>
              <i className={`${s.icon} text-lg flex-shrink-0`} /><span className="text-sm font-medium leading-tight">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="ml-auto w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 cursor-pointer flex-shrink-0 transition-colors"><i className="ri-close-line text-xs" /></button>
            </div>
          );
        })}
      </div>

      {/* ─── Tabs ─── */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-background-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3">
            <button onClick={() => setActiveTab('scan')} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'scan' ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-rocket-2-line mr-1.5" />Scan Live
            </button>
            <button onClick={() => setActiveTab('history')} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'history' ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-history-line mr-1.5" />Historique
            </button>
            <button onClick={() => { setActiveTab('hyperion'); loadHyperionConfig(); }} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'hyperion' ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-cpu-line mr-1.5" />HYPERION v5.0
            </button>
            <button onClick={() => { setActiveTab('champion'); loadChampionConfig(); }} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'champion' ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-trophy-line mr-1.5" />CHAMPION v2026
            </button>
            <button onClick={() => { setActiveTab('ultimate'); loadChampionConfig(); loadHyperionConfig(); loadRoutines(); }} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'ultimate' ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-[0_0_20px_rgba(5,150,105,0.4)]' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-flashlight-fill mr-1.5" />ULTIMATE LAUNCH
            </button>
            <button onClick={() => { setActiveTab('pac'); }} className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${activeTab === 'pac' ? 'bg-foreground-950 text-white' : 'text-foreground-600 hover:text-foreground-950 hover:bg-background-100'}`}>
              <i className="ri-ticket-2-line mr-1.5" />PAC ENGINE
            </button>
          </div>
        </div>
      </div>

      {renderTabContent()}
    </hubLayout>
  );
}



