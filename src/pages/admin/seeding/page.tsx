import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SeedingStep {
  id: string;
  name: string;
  description: string;
  functionName: string;
  payload: Record<string, unknown>;
  icon: string;
  status: 'pending' | 'running' | 'success' | 'error';
  result?: string;
  duration?: number;
  proxied?: boolean;
  supabaseError?: string;
}

const GATEWAY_URL = import.meta.env.VITE_PUBLIC_API_GATEWAY_URL as string | undefined;

const STEPS: SeedingStep[] = [
  {
    id: 'crawler',
    name: 'Compliance Daily Crawler v4.0',
    description: 'Crawl 285 sources réglementaires — BCEAO, COBAC, OHADA, UEMOA, GAFI, IFRS, ISO, ISA',
    functionName: 'kos-compliance-daily-crawler',
    payload: { action: 'full_scan' },
    icon: 'ri-search-eye-line',
    status: 'pending',
  },
  {
    id: 'quality',
    name: 'Big Four Quality Review v5',
    description: 'Full scan qualité documentaire — 9 principes Big Four, scoring, auto-détection',
    functionName: 'kos-bigfour-quality-review',
    payload: { action: 'full_scan', scan_limit: 100 },
    icon: 'ri-shield-check-line',
    status: 'pending',
  },
  {
    id: 'auto-dev',
    name: 'Auto-Development Seed',
    description: 'Seed 4 modules compétence — Cross-pillar evolution, knowledge capitalization',
    functionName: 'kos-auto-development-seed',
    payload: { action: 'full_seed' },
    icon: 'ri-seedling-line',
    status: 'pending',
  },
  {
    id: 'batch-ingest',
    name: 'Batch Ingest — BCEAO / COBAC / BEAC',
    description: 'Ingest textes réglementaires — Prix de transfert, dispositif prudentiel, gouvernance',
    functionName: 'kos-batch-ingest',
    payload: {
      action: 'batch_ingest',
      sources: ['BCEAO', 'COBAC', 'BEAC', 'OHADA'],
      types: ['instruction', 'circulaire', 'reglement', 'directive', 'acte_uniforme'],
    },
    icon: 'ri-database-2-line',
    status: 'pending',
  },
];

function getProxyPath(functionName: string): string {
  const map: Record<string, string> = {
    'kos-compliance-daily-crawler': 'compliance-crawler',
    'kos-bigfour-quality-review': 'bigfour-quality-review',
    'kos-auto-development-seed': 'auto-development-seed',
    'kos-batch-ingest': 'batch-ingest',
  };
  return map[functionName] || functionName.replace('kos-', '');
}

async function invokeWithFallback(step: SeedingStep): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
  proxied: boolean;
  supabaseError?: string;
}> {
  let supabaseErr = '';

  try {
    const { data, error } = await supabase.functions.invoke(step.functionName, {
      body: step.payload,
    });
    if (!error) {
      return { success: true, data, proxied: false };
    }
    supabaseErr = error.message || 'Unknown Supabase error';
  } catch (err) {
    supabaseErr = (err as Error).message || 'Network/timeout exception';
  }

  if (!GATEWAY_URL) {
    return {
      success: false,
      error: `Supabase: ${supabaseErr} | Gateway URL non configurée (VITE_PUBLIC_API_GATEWAY_URL)`,
      proxied: false,
      supabaseError: supabaseErr,
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(`${GATEWAY_URL}/api/kos/${getProxyPath(step.functionName)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(step.payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      return {
        success: false,
        error: `Supabase: ${supabaseErr} | Gateway HTTP ${res.status}: ${text.substring(0, 200)}`,
        proxied: true,
        supabaseError: supabaseErr,
      };
    }

    const data = await res.json();
    return { success: true, data, proxied: true };
  } catch (err) {
    return {
      success: false,
      error: `Supabase: ${supabaseErr} | Gateway: ${(err as Error).message}`,
      proxied: true,
      supabaseError: supabaseErr,
    };
  }
}

export default function AdminSeedingPage() {
  const [steps, setSteps] = useState<SeedingStep[]>(STEPS);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [globalLog, setGlobalLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setGlobalLog(prev => [...prev, `[${new Date().toLocaleTimeString('fr-FR')}] ${msg}`]);
  };

  const runSeeding = async () => {
    setIsRunning(true);
    setGlobalLog([]);
    const updatedSteps = [...steps];

    for (let i = 0; i < updatedSteps.length; i++) {
      const step = updatedSteps[i];
      setCurrentStep(i);
      updatedSteps[i] = { ...step, status: 'running', proxied: false };
      setSteps([...updatedSteps]);

      addLog(`🚀 Lancement de ${step.name}...`);

      const startTime = Date.now();
      try {
        const result = await invokeWithFallback(step);
        const duration = Math.round((Date.now() - startTime) / 1000);

        if (result.success) {
          updatedSteps[i] = {
            ...step,
            status: 'success',
            result: JSON.stringify(result.data, null, 2).substring(0, 300),
            duration,
            proxied: result.proxied,
          };
          addLog(`✅ ${step.name} — OK (${duration}s)${result.proxied ? ' [via Gateway]' : ''}`);
        } else {
          updatedSteps[i] = {
            ...step,
            status: 'error',
            result: result.error || 'Unknown error',
            duration,
            proxied: result.proxied,
            supabaseError: result.supabaseError,
          };
          addLog(`❌ ${step.name} — ERREUR (${duration}s)${result.proxied ? ' [Gateway]' : ''}: ${result.error}`);
          if (result.supabaseError) {
            addLog(`   ↳ Supabase: ${result.supabaseError}`);
          }
        }
      } catch (err) {
        const duration = Math.round((Date.now() - startTime) / 1000);
        updatedSteps[i] = {
          ...step,
          status: 'error',
          result: (err as Error).message,
          duration,
        };
        addLog(`❌ ${step.name} — EXCEPTION (${duration}s): ${(err as Error).message}`);
      }

      setSteps([...updatedSteps]);

      if (i < updatedSteps.length - 1) {
        addLog('⏳ Pause 2s avant prochaine étape...');
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    setCurrentStep(-1);
    setIsRunning(false);
    const okCount = updatedSteps.filter(s => s.status === 'success').length;
    const failCount = updatedSteps.filter(s => s.status === 'error').length;
    addLog(`🏁 SEEDING TERMINÉ — ${okCount}/4 succès, ${failCount}/4 échecs`);
  };

  const resetSteps = () => {
    setSteps(STEPS.map(s => ({ ...s, status: 'pending' as const, result: undefined, duration: undefined, proxied: false, supabaseError: undefined })));
    setGlobalLog([]);
    setCurrentStep(-1);
  };

  const completed = steps.filter(s => s.status === 'success').length;
  const failed = steps.filter(s => s.status === 'error').length;

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <div className="bg-white border-b border-background-200 px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground-950 flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <i className="ri-rocket-2-line text-xl text-emerald-600"></i>
              </span>
              KOS Seeding Massif
            </h1>
            <p className="text-sm text-foreground-400 mt-1 ml-13">
              Pipeline 4 étapes — Crawl 285 sources → Quality Review → Auto-Dev Seed → Batch Ingest
            </p>
            {!GATEWAY_URL && (
              <div className="mt-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                <i className="ri-alert-line text-amber-600"></i>
                <p className="text-xs text-amber-700 font-medium">
                  Gateway URL non configurée (VITE_PUBLIC_API_GATEWAY_URL) — le fallback Cloudflare ne sera pas disponible
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isRunning ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium">
                <i className="ri-loader-4-line animate-spin"></i>
                En cours...
              </div>
            ) : (
              <>
                <button
                  onClick={resetSteps}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-background-200 text-foreground-700 rounded-xl text-sm font-medium hover:bg-background-50 transition-colors cursor-pointer whitespace-nowrap"
                  disabled={isRunning}
                >
                  <i className="ri-refresh-line"></i>
                  Reset
                </button>
                <button
                  onClick={runSeeding}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                  disabled={isRunning}
                >
                  <i className="ri-play-circle-line text-lg"></i>
                  Démarrer le Seeding
                </button>
              </>
            )}
          </div>
        </div>

        {(completed > 0 || isRunning) && (
          <div className="mt-4 bg-background-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 to-emerald-600"
              style={{ width: `${((completed + (isRunning ? 1 : 0)) / 4) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Steps Grid */}
      <div className="px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-white rounded-2xl border p-6 transition-all duration-300 ${
                step.status === 'running'
                  ? 'border-amber-300 ring-2 ring-amber-200 shadow-lg shadow-amber-50'
                  : step.status === 'success'
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : step.status === 'error'
                  ? 'border-red-200 bg-red-50/30'
                  : 'border-background-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    step.status === 'success'
                      ? 'bg-emerald-100'
                      : step.status === 'error'
                      ? 'bg-red-100'
                      : step.status === 'running'
                      ? 'bg-amber-100'
                      : 'bg-background-100'
                  }`}
                >
                  {step.status === 'running' ? (
                    <i className="ri-loader-4-line animate-spin text-xl text-amber-600"></i>
                  ) : step.status === 'success' ? (
                    <i className="ri-check-line text-xl text-emerald-600"></i>
                  ) : step.status === 'error' ? (
                    <i className="ri-close-line text-xl text-red-600"></i>
                  ) : (
                    <i className={`${step.icon} text-xl text-foreground-400`}></i>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">
                      Étape {index + 1}/4
                    </span>
                    {step.duration !== undefined && (
                      <span className="text-xs text-foreground-400">
                        {step.duration}s
                      </span>
                    )}
                    {step.proxied && (
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        via Gateway
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-foreground-950 mb-1">{step.name}</h3>
                  <p className="text-sm text-foreground-500">{step.description}</p>

                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono bg-foreground-950/5 text-foreground-500 px-2 py-0.5 rounded">
                      supabase.functions.invoke('{step.functionName}')
                    </span>
                  </div>

                  {step.result && (
                    <div className={`mt-3 p-3 rounded-lg text-xs font-mono whitespace-pre-wrap break-all ${
                      step.status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {step.result}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Log panel */}
        {globalLog.length > 0 && (
          <div className="mt-6 max-w-6xl">
            <div className="bg-foreground-950 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-terminal-box-line text-foreground-400"></i>
                <span className="text-xs font-bold text-foreground-400 uppercase tracking-wider">Console Log</span>
                <span className="text-xs text-foreground-600">({globalLog.length} lignes)</span>
              </div>
              <div className="bg-black/50 rounded-xl p-4 max-h-80 overflow-y-auto font-mono text-xs leading-relaxed space-y-0.5">
                {globalLog.map((log, i) => (
                  <div key={i} className={`${
                    log.includes('ERREUR') || log.includes('EXCEPTION') || log.includes('❌')
                      ? 'text-red-400'
                      : log.includes('✅') || log.includes('OK')
                      ? 'text-emerald-400'
                      : log.includes('🏁')
                      ? 'text-amber-400 font-bold'
                      : 'text-foreground-400'
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {globalLog.length === 0 && !isRunning && (
          <div className="mt-6 max-w-6xl text-center py-12 bg-white rounded-2xl border border-background-200">
            <div className="w-16 h-16 bg-background-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="ri-terminal-box-line text-3xl text-foreground-300"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground-700 mb-2">Prêt pour le seeding</h3>
            <p className="text-sm text-foreground-400 max-w-md mx-auto">
              Cliquez sur "Démarrer le Seeding" pour lancer le pipeline complet. Les 4 fonctions seront exécutées séquentiellement avec fallback automatique sur le Gateway Cloudflare si Supabase échoue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}