import { logger } from '@/core/logger';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KOS Regtech AI — Audit Trail v1.0
// Logs chaînés SHA-256, immutables, conformes ISO 27001 / PCI DSS
// Chaque entrée référence le hash de l'entrée précédente
// Exportable pour dépôt régulateur (BCEAO, COBAC, etc.)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DB_NAME = 'kos-audit-trail';
const DB_VERSION = 1;
const STORE = 'audit_entries';

export type AuditAction =
  | 'COMPLIANCE_CHECK_RUN'
  | 'EVIDENCE_CAPTURED'
  | 'EVIDENCE_VERIFIED'
  | 'RULE_ENGINE_PARSE'
  | 'AI_MODEL_DEPLOYED'
  | 'AI_MODEL_AUDITED'
  | 'REGULATOR_EXPORT'
  | 'HORIZON_SCAN_RUN'
  | 'RISK_MATRIX_UPDATED'
  | 'REPORT_GENERATED'
  | 'USER_ACTION'
  | 'SYSTEM_EVENT';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  actor: string; // 'system' | userId | 'regulator'
  entityType: string; // 'rule' | 'report' | 'evidence' | 'model' | 'scan'
  entityId: string;
  details: Record<string, unknown>;
  prevHash: string | null;
  hash: string;
  signature?: string;
}

interface AuditChain {
  entries: AuditEntry[];
  verified: boolean;
  tampered: boolean;
  tamperedAt?: number;
}

// ─── IndexedDB ───

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('byAction', 'action', { unique: false });
        store.createIndex('byTimestamp', 'timestamp', { unique: false });
        store.createIndex('byEntity', 'entityId', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── SHA-256 ───

async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Audit Trail Engine ───

class AuditTrailEngine {
  private log = logger.child('audit-trail');

  async getLastHash(): Promise<string | null> {
    const all = await this.getAll();
    if (all.length === 0) return null;
    return all[all.length - 1]!.hash;
  }

  async log(params: {
    action: AuditAction;
    actor?: string;
    entityType: string;
    entityId: string;
    details: Record<string, unknown>;
  }): Promise<AuditEntry> {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const prevHash = await this.getLastHash();

    const payload = JSON.stringify({
      id,
      timestamp,
      action: params.action,
      actor: params.actor || 'system',
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details,
      prevHash,
    });

    const hash = await sha256(payload);

    const entry: AuditEntry = {
      id,
      timestamp,
      action: params.action,
      actor: params.actor || 'system',
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details,
      prevHash,
      hash,
    };

    const db = await openDB();
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(entry);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    this.log.info('Audit entry logged', {
      action: params.action,
      hash: hash.slice(0, 16),
      chainLength: (await this.getAll()).length,
    });

    return entry;
  }

  async getAll(): Promise<AuditEntry[]> {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async getByAction(action: AuditAction): Promise<AuditEntry[]> {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readonly');
    const index = tx.objectStore(STORE).index('byAction');
    return new Promise((resolve, reject) => {
      const req = index.getAll(action);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async getByEntity(entityId: string): Promise<AuditEntry[]> {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readonly');
    const index = tx.objectStore(STORE).index('byEntity');
    return new Promise((resolve, reject) => {
      const req = index.getAll(entityId);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async verifyChain(): Promise<AuditChain> {
    const entries = await this.getAll();
    if (entries.length === 0) {
      return { entries: [], verified: true, tampered: false };
    }

    // Trier par timestamp
    const sorted = [...entries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    for (let i = 0; i < sorted.length; i++) {
      const entry = sorted[i]!;

      // Recalculer le hash
      const payload = JSON.stringify({
        id: entry.id,
        timestamp: entry.timestamp,
        action: entry.action,
        actor: entry.actor,
        entityType: entry.entityType,
        entityId: entry.entityId,
        details: entry.details,
        prevHash: entry.prevHash,
      });
      const computedHash = await sha256(payload);

      // Vérifier hash
      if (computedHash !== entry.hash) {
        this.log.warn('Chain tampered — hash mismatch', { index: i, entryId: entry.id });
        return {
          entries: sorted,
          verified: false,
          tampered: true,
          tamperedAt: i,
        };
      }

      // Vérifier chaînage
      if (i > 0) {
        const expectedPrevHash = sorted[i - 1]!.hash;
        if (entry.prevHash !== expectedPrevHash) {
          this.log.warn('Chain tampered — prevHash mismatch', {
            index: i,
            expected: expectedPrevHash.slice(0, 16),
            actual: (entry.prevHash || 'null').slice(0, 16),
          });
          return {
            entries: sorted,
            verified: false,
            tampered: true,
            tamperedAt: i,
          };
        }
      }
    }

    return {
      entries: sorted,
      verified: true,
      tampered: false,
    };
  }

  async exportChain(format: 'JSON' | 'CSV' = 'JSON'): Promise<string> {
    const entries = await this.getAll();
    const sorted = entries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    if (format === 'CSV') {
      const header = 'id,timestamp,action,actor,entityType,entityId,prevHash,hash\n';
      const rows = sorted
        .map(
          (e) =>
            `${e.id},${e.timestamp},${e.action},${e.actor},${e.entityType},${e.entityId},${e.prevHash || 'GENESIS'},${e.hash}`
        )
        .join('\n');
      return header + rows;
    }

    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        chainLength: sorted.length,
        verified: (await this.verifyChain()).verified,
        entries: sorted,
      },
      null,
      2
    );
  }

  async clear(): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).clear();
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    this.log.info('Audit trail cleared');
  }
}

// ─── Singleton ───

export const auditTrail = new AuditTrailEngine();
export { AuditTrailEngine };



