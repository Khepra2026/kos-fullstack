/**
 * KOS Hook Audit Logger — Big Four Compliant Traceability
 * Every hook data fetch logs: source_used, timestamp, record_count
 * Used by all P0 migrated hooks for ISO 27001 audit trail compliance.
 */

import { supabase } from '@/lib/supabase';

export interface HookAuditEntry {
  hook_name: string;
  source_used: 'supabase' | 'mock_fallback' | 'error_fallback';
  timestamp: string;
  record_count: number;
  table_queried?: string;
  error_message?: string;
  duration_ms?: number;
}

const auditBuffer: HookAuditEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_INTERVAL_MS = 5000;
const MAX_BUFFER_SIZE = 20;

async function flushAuditBuffer(): Promise<void> {
  if (auditBuffer.length === 0) return;

  const batch = auditBuffer.splice(0, auditBuffer.length);

  try {
    const rows = batch.map((entry) => ({
      action: `hook:${entry.hook_name}`,
      agent: entry.source_used,
      result: entry.table_queried
        ? `${entry.source_used} | ${entry.table_queried} | ${entry.record_count} rows | ${entry.duration_ms ?? '?'}ms`
        : `${entry.source_used} | ${entry.record_count} rows | ${entry.duration_ms ?? '?'}ms`,
      score: entry.record_count,
      citations_audited: entry.error_message ? 0 : entry.record_count,
    }));

    const { error } = await supabase.from('audit_logs').insert(rows);
    if (error && import.meta.env.DEV) {
      console.warn('[HookAudit] Failed to persist audit entries to Supabase:', error.message);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[HookAudit] Failed to flush audit buffer:', (err as Error).message);
    }
  }
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushAuditBuffer();
  }, FLUSH_INTERVAL_MS);
}

export function logHookAudit(entry: HookAuditEntry): void {
  auditBuffer.push(entry);

  if (import.meta.env.DEV) {
    const icon = entry.source_used === 'supabase' ? '🔵' : entry.source_used === 'mock_fallback' ? '🟡' : '🔴';
    const tableInfo = entry.table_queried ? ` [${entry.table_queried}]` : '';
    const durationInfo = entry.duration_ms ? ` (${entry.duration_ms}ms)` : '';
    console.log(
      `${icon} [HookAudit] ${entry.hook_name} | source=${entry.source_used}${tableInfo} | rows=${entry.record_count}${durationInfo} | ts=${entry.timestamp}`
    );
  }

  if (auditBuffer.length >= MAX_BUFFER_SIZE) {
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    flushAuditBuffer();
  } else {
    scheduleFlush();
  }
}

export async function flushAllAudits(): Promise<void> {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  await flushAuditBuffer();
}

export function createAuditEntry(
  hookName: string,
  source: HookAuditEntry['source_used'],
  recordCount: number,
  tableQueried?: string,
  errorMessage?: string,
  durationMs?: number,
): HookAuditEntry {
  return {
    hook_name: hookName,
    source_used: source,
    timestamp: new Date().toISOString(),
    record_count: recordCount,
    table_queried: tableQueried,
    error_message: errorMessage,
    duration_ms: durationMs,
  };
}