import { supabase } from '@/lib/supabase';
import { createAuditEntry, logHookAudit, type HookAuditEntry } from '@/utils/hookAuditLogger';

/**
 * KOS Hook Migration Utility — Standardized hybrid pattern
 * 
 * Pattern: Supabase first → mock fallback → audit logging
 * Migrated from pure mock to hybrid (RLS 100%, 458/458 tables)
 */

export interface MigrationConfig {
  hookName: string;
  tableName: string;
  mockData: unknown[];
  /** Normalize Supabase row to mock type */
  mapFn?: (row: Record<string, unknown>) => unknown;
  /** Custom Supabase query (defaults to .select('*').order('created_at', { ascending: false })) */
  queryFn?: () => Promise<{ data: unknown[] | null; error: Error | null }>;
}

export interface MigrationResult<T> {
  data: T[];
  isLive: boolean;
  auditEntry: HookAuditEntry | null;
}

export async function migrateHook<T>(config: MigrationConfig): Promise<MigrationResult<T>> {
  const startTime = performance.now();
  const { hookName, tableName, mockData, mapFn, queryFn } = config;

  try {
    const result = queryFn
      ? await queryFn()
      : await supabase.from(tableName).select('*').order('created_at', { ascending: false });

    const durationMs = Math.round(performance.now() - startTime);

    if (result.error) throw result.error;

    if (result.data && result.data.length > 0) {
      const mapped = mapFn
        ? (result.data as Record<string, unknown>[]).map(mapFn) as T[]
        : (result.data as T[]);

      const entry = createAuditEntry(hookName, 'supabase', result.data.length, tableName, undefined, durationMs);
      logHookAudit(entry);
      return { data: mapped, isLive: true, auditEntry: entry };
    }

    // Empty table → mock fallback
    const entry = createAuditEntry(hookName, 'mock_fallback', mockData.length, tableName, 'Table vide — fallback mock', durationMs);
    logHookAudit(entry);
    return { data: mockData as T[], isLive: false, auditEntry: entry };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    const durationMs = Math.round(performance.now() - startTime);
    const entry = createAuditEntry(hookName, 'error_fallback', mockData.length, tableName, message, durationMs);
    logHookAudit(entry);
    return { data: mockData as T[], isLive: false, auditEntry: entry };
  }
}

/**
 * Simple health check — pings a table to see if it has live data
 */
export async function checkTableHealth(tableName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.from(tableName).select('id').limit(1);
    return !error && data && data.length > 0;
  } catch {
    return false;
  }
}