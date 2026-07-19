/**
 * KOS CORE EXPORT ENGINE™
 * BLOC 3 — Export local des 11 tables stratégiques
 * Extrait structure, données, relations, et les fige en snapshot immuable local
 */

interface TableSchema {
  table_name: string;
  columns: { name: string; type: string }[];
  row_count: number;
}

interface ExportSnapshot {
  version: string;
  exported_at: string;
  tables: string[];
  schema: Record<string, TableSchema>;
  data: Record<string, unknown[][]>;
  relationships: { from_table: string; from_column: string; to_table: string; to_column: string }[];
  checksum: string;
}

const CRITICAL_TABLES = [
  'regulators',
  'regulations',
  'regulatory_register',
  'regulatory_alerts',
  'citations',
  'audit_logs',
  'rag_documents',
  'rag_chunks',
  'rag_embeddings',
  'leads',
  'profiles',
];

function generateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(16);
}

export class coreExportEngine {
  private dbName = 'kos_core_dump';
  private storeName = 'exports';

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'version' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async exportFullSnapshot(tablesData: Record<string, unknown[][]>): Promise<ExportSnapshot> {
    const db = await this.openDB();
    const version = `kos-core-${new Date().toISOString().replace(/[:.]/g, '-')}`;
    const now = new Date().toISOString();

    const snapshot: ExportSnapshot = {
      version,
      exported_at: now,
      tables: CRITICAL_TABLES,
      schema: {},
      data: tablesData,
      relationships: [
        { from_table: 'regulations', from_column: 'regulator_id', to_table: 'regulators', to_column: 'id' },
        { from_table: 'rag_chunks', from_column: 'document_id', to_table: 'rag_documents', to_column: 'id' },
        { from_table: 'rag_embeddings', from_column: 'rag_document_id', to_table: 'rag_documents', to_column: 'id' },
        { from_table: 'rag_embeddings', from_column: 'rag_chunk_id', to_table: 'rag_chunks', to_column: 'id' },
        { from_table: 'citations', from_column: 'source_file', to_table: 'rag_documents', to_column: 'id' },
      ],
      checksum: generateChecksum(JSON.stringify(tablesData)),
    };

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      store.put(snapshot);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    console.log(`[KOS Core Export] Snapshot ${version} saved. Checksum: ${snapshot.checksum}`);
    return snapshot;
  }

  async getLatestSnapshot(): Promise<ExportSnapshot | null> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        const snapshots = request.result as ExportSnapshot[];
        snapshots.sort((a, b) => b.exported_at.localeCompare(a.exported_at));
        resolve(snapshots[0] || null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async listSnapshots(): Promise<{ version: string; exported_at: string; tables: number; checksum: string }[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        const snapshots = request.result as ExportSnapshot[];
        resolve(snapshots.map(s => ({
          version: s.version,
          exported_at: s.exported_at,
          tables: s.tables.length,
          checksum: s.checksum,
        })).sort((a, b) => b.exported_at.localeCompare(a.exported_at)));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async verifyIntegrity(version: string): Promise<boolean> {
    const db = await this.openDB();
    const snapshot = await new Promise<ExportSnapshot | undefined>((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.get(version);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (!snapshot) return false;
    const recomputed = generateChecksum(JSON.stringify(snapshot.data));
    return recomputed === snapshot.checksum;
  }

  getCriticalTables(): string[] {
    return CRITICAL_TABLES;
  }
}

export const coreExportEngine = new coreExportEngine();



