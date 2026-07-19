/**
 * ═══════════════════════════════════════════════
 * KHEPRA EXPERTS — IndexedDB Search Cache
 * ═══════════════════════════════════════════════
 * Persiste l'index TF-IDF et les documents entre les sessions pour
 * éviter tout recalcul lors des visites ultérieures.
 *
 * Cache strategy:
 *   - Store: Store serialized document + index data
 *   - TTL: 6 hours (index is stale after that — docs may have changed)
 *   - Invalidation: auto on version bump or TTL expiry
 *
 * Zéro nouvelle table SQL — tout en IndexedDB locale.
 */

const DB_NAME = 'khepra-search-cache';
const DB_VERSION = 2;
const STORE_DOCS = 'docs';
const STORE_INDEX = 'index';
const STORE_META = 'meta';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface CacheMeta {
  key: string;
  value: string;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_DOCS)) {
        db.createObjectStore(STORE_DOCS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_INDEX)) {
        db.createObjectStore(STORE_INDEX, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('IndexedDB blocked'));
  });
}

function executeTransaction<T>(
  db: IDBDatabase,
  storeName: string,
  mode: 'readonly' | 'readwrite',
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const req = fn(store);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getCachedDocs(): Promise<Record<string, unknown>[] | null> {
  try {
    const db = await openDB();
    const meta = await executeTransaction<CacheMeta | undefined>(db, STORE_META, 'readonly', (s) => s.get('docsUpdatedAt'));
    db.close();

    if (!meta || Date.now() - meta.updatedAt > CACHE_TTL_MS) {
      return null;
    }

    const db2 = await openDB();
    const docs = await executeTransaction<Record<string, unknown>[]>(db2, STORE_DOCS, 'readonly', (s) => s.getAll());
    db2.close();

    return docs.length > 0 ? docs : null;
  } catch {
    return null;
  }
}

export async function setCachedDocs(docs: Record<string, unknown>[]): Promise<void> {
  try {
    const db = await openDB();

    // Clear old docs
    await executeTransaction(db, STORE_DOCS, 'readwrite', (s) => s.clear());

    // Write new docs in a single transaction
    const tx = db.transaction(STORE_DOCS, 'readwrite');
    const store = tx.objectStore(STORE_DOCS);
    for (const doc of docs) {
      store.put(doc);
    }
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    // Update metadata
    await executeTransaction(db, STORE_META, 'readwrite', (s) =>
      s.put({ key: 'docsUpdatedAt', value: String(Date.now()), updatedAt: Date.now() }),
    );

    db.close();
  } catch {
    // Cache write failure is non-critical
  }
}

export async function clearSearchCache(): Promise<void> {
  try {
    const db = await openDB();
    await executeTransaction(db, STORE_DOCS, 'readwrite', (s) => s.clear());
    await executeTransaction(db, STORE_META, 'readwrite', (s) => s.clear());
    db.close();
  } catch {
    // ignore
  }
}

export async function getCachedStats(): Promise<{ totalDocs: number; cachedAt: number } | null> {
  try {
    const db = await openDB();
    const meta = await executeTransaction<CacheMeta | undefined>(db, STORE_META, 'readonly', (s) => s.get('docsUpdatedAt'));
    db.close();
    if (!meta) return null;
    const totalDocs = meta.value ? (() => {
      try { return JSON.parse(meta.value) as number; } catch { return 0; }
    })() : 0;
    return {
      totalDocs,
      cachedAt: meta.updatedAt,
    };
  } catch {
    return null;
  }
}



