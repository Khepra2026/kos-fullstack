// KOS SYNC ENGINE™ — Moteur de Synchronisation Bidirectionnelle Supabase↔Local
// Architecture: Supabase (System of Record) ↔ IndexedDB (Local Sovereign Store)
// Fallback automatique: Si Supabase down → lecture locale. Si Supabase up → sync.

import { supabase } from '@/lib/supabase';
import {
  localBulkPut,
  localGetAll,
  localGetStats,
  localClearStore,
  STORES,
} from '@/services/localStorage';

// === Types ===
interface SyncResult {
  storeName: string;
  category: 'A' | 'B' | 'C' | 'D';
  direction: 'supabase_to_local' | 'local_to_supabase';
  itemsCount: number;
  status: 'success' | 'error' | 'skipped';
  error?: string;
}

interface SyncReport {
  timestamp: string;
  results: SyncResult[];
  totalSynced: number;
  totalErrors: number;
  durationMs: number;
}

// === Supabase Table → IndexedDB Store Mapping ===
const TABLE_MAP: Record<string, { store: string; category: 'A' | 'B' | 'C' | 'D' }> = {
  regulators: { store: 'regulators', category: 'A' },
  regulations: { store: 'regulations', category: 'A' },
  regulatory_sources: { store: 'regulatory_sources', category: 'A' },
  citations: { store: 'citations', category: 'A' },
  audit_logs: { store: 'audit_logs', category: 'A' },
  verification_logs: { store: 'verification_logs', category: 'A' },
  compliance_actions: { store: 'compliance_actions', category: 'A' },
  regulatory_alerts: { store: 'regulatory_alerts', category: 'A' },
  regulatory_projects: { store: 'regulatory_projects', category: 'A' },
  regulatory_versions: { store: 'regulatory_versions', category: 'A' },
  instructions: { store: 'instructions', category: 'A' },
  circulars: { store: 'circulars', category: 'A' },
  directives: { store: 'directives', category: 'A' },
  rag_documents: { store: 'rag_documents', category: 'A' },
  rag_chunks: { store: 'rag_chunks', category: 'A' },
  rag_metadata: { store: 'rag_metadata', category: 'A' },
  rag_citations: { store: 'rag_citations', category: 'A' },
  lessons_learned: { store: 'lessons_learned', category: 'B' },
  best_practices: { store: 'best_practices', category: 'B' },
  policies: { store: 'policies', category: 'B' },
  case_studies: { store: 'case_studies', category: 'B' },
  knowledge_capsules: { store: 'knowledge_capsules', category: 'B' },
  strategies_memory: { store: 'strategic_memory', category: 'B' },
  rag_embeddings: { store: 'rag_embeddings', category: 'C' },
  pipeline_state: { store: 'pipeline_state', category: 'C' },
  workflow_execution: { store: 'workflow_execution', category: 'C' },
  kos_execution_logs: { store: 'kos_execution_logs', category: 'D' },
};

// === Supabase → Local Sync (Pull) ===
async function syncSupabaseToLocal(
  supabaseTable: string,
  localStore: string,
  category: 'A' | 'B' | 'C' | 'D'
): Promise<SyncResult> {
  const result: SyncResult = {
    storeName: localStore,
    category,
    direction: 'supabase_to_local',
    itemsCount: 0,
    status: 'success',
  };

  try {
    const { data, error } = await supabase.from(supabaseTable).select('*');
    if (error) throw error;
    if (data && data.length > 0) {
      await localClearStore(localStore);
      await localBulkPut(localStore, data);
      result.itemsCount = data.length;
    }
  } catch (err) {
    result.status = 'error';
    result.error = err instanceof Error ? err.message : 'Unknown error';
  }

  return result;
}

// === Sync Categories ===

// Cat A: Critical — sync obligatoire, erreur = alert
export async function syncCategoryA(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  const catATables = Object.entries(TABLE_MAP).filter(([, v]) => v.category === 'A');
  for (const [table, { store }] of catATables) {
    results.push(await syncSupabaseToLocal(table, store, 'A'));
  }
  return results;
}

// Cat B: Knowledge — sync recommandée
export async function syncCategoryB(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  const catBTables = Object.entries(TABLE_MAP).filter(([, v]) => v.category === 'B');
  for (const [table, { store }] of catBTables) {
    results.push(await syncSupabaseToLocal(table, store, 'B'));
  }
  return results;
}

// Cat C: RAG — local-first, Supabase fallback
export async function syncCategoryC(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  const catCTables = Object.entries(TABLE_MAP).filter(([, v]) => v.category === 'C');
  for (const [table, { store }] of catCTables) {
    results.push(await syncSupabaseToLocal(table, store, 'C'));
  }
  return results;
}

// === Full Sync ===
export async function syncAll(): Promise<SyncReport> {
  const startTime = performance.now();
  const results: SyncResult[] = [];

  const allResults = await Promise.all([
    syncCategoryA(),
    syncCategoryB(),
    syncCategoryC(),
  ]);

  for (const batch of allResults) {
    results.push(...batch);
  }

  const totalErrors = results.filter((r) => r.status === 'error').length;
  const totalSynced = results.filter((r) => r.status === 'success').length;

  return {
    timestamp: new Date().toISOString(),
    results,
    totalSynced,
    totalErrors,
    durationMs: Math.round(performance.now() - startTime),
  };
}

// === Health Check ===
export async function syncHealthCheck(): Promise<{
  supabaseAvailable: boolean;
  localAvailable: boolean;
  localStats: Record<string, number> | null;
}> {
  let supabaseAvailable = false;
  try {
    const { error } = await supabase.from('regulators').select('count');
    supabaseAvailable = !error;
  } catch {
    supabaseAvailable = false;
  }

  let localAvailable = false;
  let localStats: Record<string, number> | null = null;
  try {
    localStats = await localGetStats();
    localAvailable = Object.keys(localStats).length > 0;
  } catch {
    localAvailable = false;
  }

  return { supabaseAvailable, localAvailable, localStats };
}

// === Data access: Local-first with Supabase fallback ===
export async function getDataLocalFirst<T>(
  supabaseTable: string,
  localStore: string
): Promise<{ data: T[]; source: 'local' | 'supabase' | 'none' }> {
  // Try local first
  try {
    const localData = await localGetAll<T>(localStore);
    if (localData.length > 0) {
      return { data: localData, source: 'local' };
    }
  } catch {
    // Local failed, try Supabase
  }

  // Fallback to Supabase
  try {
    const { data, error } = await supabase.from(supabaseTable).select('*');
    if (error) throw error;
    if (data && data.length > 0) {
      // Cache locally for next time
      await localBulkPut(localStore, data as Record<string, unknown>[]);
      return { data: data as T[], source: 'supabase' };
    }
  } catch {
    // Both failed
  }

  return { data: [], source: 'none' };
}

export { TABLE_MAP };



