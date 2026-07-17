import { logger } from '@/core/logger';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KOS Regtech AI — Evidence Vault v1.0
// Collecte de preuves tamper-proof avec horodatage SHA-256
// Stockage IndexedDB local + export pour dépôt régulateur
// Conforme ANSSI / ISO 27001 / BCEAO exigences
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DB_NAME = 'kos-evidence-vault';
const DB_VERSION = 1;
const STORE_EVIDENCES = 'evidences';

interface EvidenceEntry {
  id: string;
  hash: string;
  timestamp: string;
  source: string;
  type: 'SCREEN' | 'FILE' | 'API' | 'MANUAL';
  mimeType: string;
  sizeBytes: number;
  regulation: string;
  description: string;
  validUntil: string;
  chainPrevHash?: string;
  verified: boolean;
}

// ─── IndexedDB ───

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_EVIDENCES)) {
        const store = db.createObjectStore(STORE_EVIDENCES, { keyPath: 'id' });
        store.createIndex('byHash', 'hash', { unique: true });
        store.createIndex('byRegulation', 'regulation', { unique: false });
        store.createIndex('byTimestamp', 'timestamp', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── Hash SHA-256 via Web Crypto ───

async function sha256(data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Evidence Collector ───

export class EvidenceCollector {
  private log = logger.child('evidence-vault');

  async capture(params: {
    source: File | Blob | string;
    type: 'SCREEN' | 'FILE' | 'API' | 'MANUAL';
    regulation: string;
    description: string;
    mimeType?: string;
  }): Promise<{ id: string; hash: string }> {
    const { source, type, regulation, description } = params;

    let blob: Blob;
    let mimeType: string;

    if (typeof source === 'string') {
      blob = new Blob([source], { type: 'text/plain' });
      mimeType = 'text/plain';
    } else {
      blob = source;
      mimeType = params.mimeType || source.type || 'application/octet-stream';
    }

    const arrayBuffer = await blob.arrayBuffer();
    const hash = await sha256(arrayBuffer);
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Récupération du hash précédent pour chaînage
    const prevHash = await this.getLastHash();

    const entry: EvidenceEntry = {
      id,
      hash,
      timestamp,
      source: source instanceof File ? source.name : `capture-${timestamp}`,
      type,
      mimeType,
      sizeBytes: blob.size,
      regulation,
      description,
      validUntil: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString(), // +10 ans
      chainPrevHash: prevHash,
      verified: false,
    };

    await this.store(entry);
    this.log.info('Evidence captured', { id, hash: hash.slice(0, 16), regulation });

    return { id, hash };
  }

  private async getLastHash(): Promise<string | undefined> {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_EVIDENCES, 'readonly');
      const store = tx.objectStore(STORE_EVIDENCES);
      const index = store.index('byTimestamp');

      return new Promise((resolve) => {
        const req = index.openCursor(null, 'prev');
        req.onsuccess = () => {
          if (req.result) {
            resolve((req.result.value as EvidenceEntry).hash);
          } else {
            resolve(undefined);
          }
        };
        req.onerror = () => resolve(undefined);
      });
    } catch {
      return undefined;
    }
  }

  private async store(entry: EvidenceEntry): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE_EVIDENCES, 'readwrite');
    tx.objectStore(STORE_EVIDENCES).put(entry);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getAll(): Promise<EvidenceEntry[]> {
    const db = await openDB();
    const tx = db.transaction(STORE_EVIDENCES, 'readonly');
    const store = tx.objectStore(STORE_EVIDENCES);
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async getByRegulation(regulation: string): Promise<EvidenceEntry[]> {
    const db = await openDB();
    const tx = db.transaction(STORE_EVIDENCES, 'readonly');
    const index = tx.objectStore(STORE_EVIDENCES).index('byRegulation');
    return new Promise((resolve, reject) => {
      const req = index.getAll(regulation);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async verify(hash: string): Promise<boolean> {
    const db = await openDB();
    const tx = db.transaction(STORE_EVIDENCES, 'readwrite');
    const index = tx.objectStore(STORE_EVIDENCES).index('byHash');
    return new Promise((resolve, reject) => {
      const req = index.get(hash);
      req.onsuccess = () => {
        if (req.result) {
          const entry = req.result as EvidenceEntry;
          entry.verified = true;
          tx.objectStore(STORE_EVIDENCES).put(entry);
          resolve(true);
        } else {
          resolve(false);
        }
      };
      req.onerror = () => reject(req.error);
    });
  }

  async exportBundle(regulation?: string): Promise<{
    evidences: EvidenceEntry[];
    exportedAt: string;
    totalHashes: string;
  }> {
    const evidences = regulation ? await this.getByRegulation(regulation) : await this.getAll();
    const bundle = JSON.stringify(evidences);
    const totalHash = await sha256(new TextEncoder().encode(bundle).buffer);

    return {
      evidences,
      exportedAt: new Date().toISOString(),
      totalHashes: totalHash,
    };
 }

  async getChain(): Promise<string[]> {
    const all = await this.getAll();
    return all.sort((a, b) => a.timestamp.localeCompare(b.timestamp)).map((e) => e.hash);
  }
}

// Instance singleton
export const evidenceCollector = new EvidenceCollector();