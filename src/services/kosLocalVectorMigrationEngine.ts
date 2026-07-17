/**
 * KOS LOCAL VECTOR STORE MIGRATION ENGINE™
 * BLOC 4 — Migration rag_embeddings vers Vector Store local
 * Extrait les embeddings de Supabase et les indexe localement via IndexedDB + Cosine Similarity
 */

interface VectorEntry {
  id: string;
  documentId: string;
  chunkId: string;
  model: string;
  dimensions: number;
  vector: number[];
  textHash: string;
  metadata: Record<string, string>;
}

interface SearchResult {
  entryId: string;
  documentId: string;
  score: number;
  metadata: Record<string, string>;
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

export class KosLocalVectorStore {
  private dbName = 'kos_vector_store';
  private storeName = 'embeddings';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('documentId', 'documentId', { unique: false });
          store.createIndex('chunkId', 'chunkId', { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async importFromSupabaseEmbeddings(embeddings: VectorEntry[]): Promise<number> {
    if (!this.db) await this.init();
    const db = this.db!;
    let imported = 0;

    for (const entry of embeddings) {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        store.put(entry);
        tx.oncomplete = () => { imported++; resolve(); };
        tx.onerror = () => resolve();
      });
    }

    console.log(`[KOS Vector Store] Imported ${imported}/${embeddings.length} embeddings from Supabase`);
    return imported;
  }

  async search(queryVector: number[], topK: number = 10): Promise<SearchResult[]> {
    if (!this.db) await this.init();
    const db = this.db!;

    const allEntries = await new Promise<VectorEntry[]>((resolve) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve([]);
    });

    const scored = allEntries
      .filter(e => e.vector && e.vector.length > 0)
      .map(e => ({
        entryId: e.id,
        documentId: e.documentId,
        score: cosineSimilarity(queryVector, e.vector),
        metadata: e.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scored;
  }

  async getStats(): Promise<{ total: number; models: string[]; avgDimensions: number }> {
    if (!this.db) await this.init();
    const db = this.db!;

    const entries = await new Promise<VectorEntry[]>((resolve) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve([]);
    });

    const models = [...new Set(entries.map(e => e.model))];
    const avgDimensions = entries.length > 0
      ? Math.round(entries.reduce((sum, e) => sum + e.dimensions, 0) / entries.length)
      : 0;

    return { total: entries.length, models, avgDimensions };
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();
    const db = this.db!;
    return new Promise((resolve) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      store.clear();
      tx.oncomplete = () => resolve();
    });
  }
}

export const kosLocalVectorStore = new KosLocalVectorStore();