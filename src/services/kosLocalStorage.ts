// KOS LOCAL STORAGE SERVICE™ — Infrastructure de Stockage Local Souverain
// IndexedDB-based. Zéro dépendance externe.
// Data Classification: A (critical) → full sync, B (knowledge) → selective sync, C (RAG) → local-first, D (logs) → local-only

const DB_NAME = 'kosSovereignDB';
const DB_VERSION = 1;

// === STORE NAMES BY CATEGORY ===
const STORES = {
  // Catégorie A — Données Critiques (Supabase + Local)
  A: [
    'regulators',
    'regulations',
    'regulatory_sources',
    'citations',
    'audit_logs',
    'verification_logs',
    'compliance_actions',
    'regulatory_alerts',
    'regulatory_projects',
    'regulatory_versions',
    'instructions',
    'circulars',
    'directives',
    'decisions',
    'sanctions',
    'consultations',
    'impact_assessments',
    'sector_observatories',
    'watchlists',
    'rag_documents',
    'rag_chunks',
    'rag_metadata',
    'rag_citations',
    'kos_critical_events',
    'ai_audit_trail',
  ],
  // Catégorie B — Connaissances (Supabase + Local)
  B: [
    'lessons_learned',
    'best_practices',
    'policies',
    'case_studies',
    'knowledge_capsules',
    'templates',
    'procedures',
    'methodologies',
    'expert_reviews',
    'strategic_memory',
  ],
  // Catégorie C — RAG & Vectoriel (Local-First)
  C: [
    'rag_embeddings',
    'rag_audit_logs',
    'pipeline_state',
    'workflow_execution',
  ],
  // Catégorie D — Logs & Non Critiques (Local-Only)
  D: [
    'activity_logs',
    'monitoring_logs',
    'cron_job_logs',
    'performance_snapshots',
    'health_checks',
    'kos_execution_logs',
  ],
};

// === Database Singleton ===
let dbInstance: IDBDatabase | null = null;
let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const allStores = [...STORES.A, ...STORES.B, ...STORES.C, ...STORES.D];
      for (const storeName of allStores) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      dbInstance.onclose = () => { dbInstance = null; };
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      dbPromise = null;
      reject((event.target as IDBOpenDBRequest).error);
    };
  });

  return dbPromise;
}

// === Generic CRUD Operations ===
async function getStore(storeName: string, mode: 'readonly' | 'readwrite' = 'readonly'): Promise<IDBObjectStore> {
  const db = await openDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

function promisify<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// === Public API ===

// Bulk put items into a local store
export async function localBulkPut(storeName: string, items: Record<string, unknown>[]): Promise<void> {
  const store = await getStore(storeName, 'readwrite');
  for (const item of items) {
    store.put({ ...item, _local_updated_at: new Date().toISOString() });
  }
  return new Promise((resolve, reject) => {
    store.transaction.oncomplete = () => resolve();
    store.transaction.onerror = () => reject(store.transaction.error);
  });
}

// Get all items from a local store
export async function localGetAll<T>(storeName: string): Promise<T[]> {
  const store = await getStore(storeName);
  return promisify(store.getAll());
}

// Get item by id
export async function localGetById<T>(storeName: string, id: string): Promise<T | undefined> {
  const store = await getStore(storeName);
  return promisify(store.get(id));
}

// Delete all items from a store
export async function localClearStore(storeName: string): Promise<void> {
  const store = await getStore(storeName, 'readwrite');
  store.clear();
  return new Promise((resolve, reject) => {
    store.transaction.oncomplete = () => resolve();
    store.transaction.onerror = () => reject(store.transaction.error);
  });
}

// Count items in a store
export async function localCount(storeName: string): Promise<number> {
  const store = await getStore(storeName);
  return promisify(store.count());
}

// Get all store names and their counts
export async function localGetStats(): Promise<Record<string, number>> {
  const db = await openDB();
  const stats: Record<string, number> = {};
  const allStores = [...STORES.A, ...STORES.B, ...STORES.C, ...STORES.D];
  for (const storeName of allStores) {
    if (db.objectStoreNames.contains(storeName)) {
      stats[storeName] = await localCount(storeName);
    }
  }
  return stats;
}

// Export all data as JSON (for backup)
export async function localExportAll(): Promise<Record<string, unknown[]>> {
  const exportData: Record<string, unknown[]> = {};
  const allStores = [...STORES.A, ...STORES.B, ...STORES.C, ...STORES.D];
  for (const storeName of allStores) {
    try {
      exportData[storeName] = await localGetAll(storeName);
    } catch {
      exportData[storeName] = [];
    }
  }
  return exportData;
}

// Import data from JSON (for restore)
export async function localImportAll(data: Record<string, unknown[]>): Promise<void> {
  for (const [storeName, items] of Object.entries(data)) {
    if (items.length > 0) {
      await localBulkPut(storeName, items);
    }
  }
}

// Delete the entire database (for full reset)
export async function localDestroyDB(): Promise<void> {
  dbInstance?.close();
  dbInstance = null;
  dbPromise = null;
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Check if local storage is available
export function isLocalStorageAvailable(): boolean {
  return typeof indexedDB !== 'undefined';
}

// Get database size estimate
export async function localGetSizeEstimate(): Promise<{ usage: number; quota: number } | null> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage ?? 0,
      quota: estimate.quota ?? 0,
    };
  }
  return null;
}

export { STORES, openDB };