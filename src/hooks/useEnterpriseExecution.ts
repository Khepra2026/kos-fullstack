import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export interface BatchExecutionResult {
  batchId: string;
  batchName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  functionName: string;
  response?: Record<string, unknown>;
  error?: string;
  durationMs?: number;
}

export interface ExecutionReport {
  executedAt: string;
  totalBatches: number;
  completedBatches: number;
  failedBatches: number;
  estimatedScoreGain: number;
  results: BatchExecutionResult[];
  executionLog: string[];
}

// Map each batch to real Supabase Edge Functions
const BATCH_FUNCTIONS: Record<string, { fn: string; body: Record<string, unknown> }[]> = {
  'batch-1': [
    { fn: 'kos-security-scan', body: { scan_type: 'headers' } },
    { fn: 'kos-site-health-check', body: { check_type: 'quick' } },
  ],
  'batch-2': [
    { fn: 'kos-seo-audit', body: { mode: 'priority' } },
    { fn: 'kos-knowledge-manager', body: { action: 'index_refresh' } },
  ],
  'batch-3': [
    { fn: 'kos-lead-scoring', body: { mode: 'full_rescore' } },
  ],
  'batch-4': [
    { fn: 'kos-seo-audit', body: { mode: 'full' } },
    { fn: 'kos-geo-visibility-engine', body: { mode: 'scan' } },
  ],
  'batch-5': [
    { fn: 'kos-security-scan', body: { scan_type: 'full' } },
  ],
};

export function useEnterpriseExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executedBatches, setExecutedBatches] = useState<string[]>([]);
  const [batchResults, setBatchResults] = useState<BatchExecutionResult[]>([]);
  const [executionReport, setExecutionReport] = useState<ExecutionReport | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString('fr-FR')}] ${msg}`]);
  }, []);

  const executeBatch = useCallback(async (
    batchId: string,
    batchName: string,
    batchPhase: number
  ): Promise<BatchExecutionResult> => {
    const start = Date.now();
    const functions = BATCH_FUNCTIONS[batchId] || [];
    const result: BatchExecutionResult = {
      batchId,
      batchName,
      status: 'running',
      functionName: functions.map(f => f.fn).join(', '),
    };

    addLog(`Démarrage Batch ${batchPhase} — ${batchName}`);

    try {
      // Execute all functions for this batch in parallel
      const invocations = await Promise.allSettled(
        functions.map(({ fn, body }) =>
          supabase.functions.invoke(fn, { body })
        )
      );

      const responses: Record<string, unknown>[] = [];
      let hasError = false;

      for (let i = 0; i < invocations.length; i++) {
        const inv = invocations[i];
        const fnName = functions[i]?.fn || 'unknown';
        if (inv.status === 'fulfilled') {
          const { data, error } = inv.value;
          if (error) {
            addLog(`⚠️ ${fnName}: ${error.message}`);
            hasError = true;
          } else {
            addLog(`✅ ${fnName}: Exécuté avec succès`);
            responses.push({ fn: fnName, data });
          }
        } else {
          addLog(`❌ ${fnName}: Erreur réseau`);
          hasError = true;
        }
      }

      // Log result to Supabase kos_execution_logs
      await supabase.from('kos_execution_logs').insert({
        module_name: `enterprise-engine-${batchId}`,
        execution_type: 'batch_execution',
        status: hasError ? 'warning' : 'success',
        input_data: { batchId, batchName, functions: functions.map(f => f.fn) },
        output_data: { responses },
        duration_ms: Date.now() - start,
        executed_at: new Date().toISOString(),
      }).then(() => {}).catch(() => {});

      result.status = hasError ? 'failed' : 'completed';
      result.response = { responses, count: responses.length };
      result.durationMs = Date.now() - start;

      addLog(`Batch ${batchPhase} terminé en ${result.durationMs}ms — ${hasError ? 'AVERTISSEMENTS' : 'SUCCÈS'}`);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      addLog(`❌ Batch ${batchPhase} échoué: ${msg}`);
      result.status = 'failed';
      result.error = msg;
      result.durationMs = Date.now() - start;
      return result;
    }
  }, [addLog]);

  const handleExecuteAll = useCallback(async (
    batches: Array<{ id: string; name: string; phase: number }>
  ) => {
    setIsExecuting(true);
    setExecutedBatches([]);
    setExecutionProgress(0);
    setBatchResults([]);
    setExecutionLog([]);

    addLog('🚀 Lancement KOS Enterprise Engine — Exécution en Bloc');
    addLog(`${batches.length} batches à exécuter`);

    const results: BatchExecutionResult[] = [];
    const executedIds: string[] = [];

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];

      setBatchResults(prev => [
        ...prev,
        { batchId: batch.id, batchName: batch.name, status: 'running', functionName: '' },
      ]);

      const result = await executeBatch(batch.id, batch.name, batch.phase);
      results.push(result);
      executedIds.push(batch.id);

      setExecutedBatches([...executedIds]);
      setExecutionProgress(Math.round(((i + 1) / batches.length) * 100));

      setBatchResults(prev =>
        prev.map(r => r.batchId === batch.id ? result : r)
      );

      // Small delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise(res => setTimeout(res, 1000));
      }
    }

    const completed = results.filter(r => r.status === 'completed').length;
    const failed = results.filter(r => r.status === 'failed').length;

    const report: ExecutionReport = {
      executedAt: new Date().toISOString(),
      totalBatches: batches.length,
      completedBatches: completed,
      failedBatches: failed,
      estimatedScoreGain: completed >= 4 ? 2.2 : completed >= 3 ? 1.5 : 0.8,
      results,
      executionLog,
    };

    setExecutionReport(report);
    setIsExecuting(false);

    addLog(`🏁 Exécution terminée — ${completed}/${batches.length} batches réussis`);
    addLog(`Score estimé post-exécution : ${(7.0 + report.estimatedScoreGain).toFixed(1)}/10`);

    // Store final report
    await supabase.from('kos_execution_logs').insert({
      module_name: 'enterprise-engine-full-run',
      execution_type: 'full_batch_report',
      status: failed === 0 ? 'success' : 'warning',
      input_data: { batches: batches.length },
      output_data: {
        completed,
        failed,
        score_gain: report.estimatedScoreGain,
      },
      executed_at: new Date().toISOString(),
    }).then(() => {}).catch(() => {});

    return report;
  }, [executeBatch, addLog, executionLog]);

  const resetExecution = useCallback(() => {
    setExecutedBatches([]);
    setExecutionProgress(0);
    setBatchResults([]);
    setExecutionReport(null);
    setExecutionLog([]);
  }, []);

  return {
    isExecuting,
    executionProgress,
    executedBatches,
    batchResults,
    executionReport,
    executionLog,
    handleExecuteAll,
    resetExecution,
  };
}