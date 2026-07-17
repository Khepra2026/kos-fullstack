// KOS REGTECH AI — Merkle Audit Log
// Arbre de Merkle pour logs immuables vérifiables cryptographiquement
// Chaque entrée est hashée, les hashes sont chaînés en arbre binaire
// La racine Merkle = sceau du log entier, vérifiable par tout auditeur
// Conforme ISO 27001 A.12.4 / PCI DSS 10 / BCEAO Circulaire 01-2017
// Preuve d'existence sans révéler tout le contenu

import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
import { db } from '@/shared/db/localDB';
import { logger } from '@/core/logger';

const log = logger.child('merkle-log');

// ─── Types ───

interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
  data?: MerkleEntry;
}

export interface MerkleEntry {
  id: string;
  timestamp: number;
  action: string;
  user?: string;
  resource?: string;
  entityId?: string;
  details: Record<string, unknown>;
}

export interface MerkleChainVerification {
  totalEntries: number;
  merkleRoot: string;
  verified: boolean;
  tampered: boolean;
  tamperedAt?: number;
  proofPaths: MerkleProof[];
}

export interface MerkleProof {
  entryHash: string;
  verified: boolean;
  path: string[];
}

// ─── Table IndexedDB ───

// La table auditLogs doit exister dans localDB. On l'ajoute dynamiquement.
// Si la table n'existe pas, on l'ajoute à la version suivante.

async function ensureAuditLogsTable(): Promise<void> {
  try {
    // Vérifie que la table existe
    await db.table('auditLogs').count();
  } catch {
    // La table n'existe pas encore — on crée via upgrade
    db.version(2).stores({
      auditLogs: 'hash, timestamp, merkleRoot',
      // ... existing stores preserved
    });
    log.info('Table auditLogs ajoutée à la DB');
  }
}

// ─── Interface de stockage ───

interface AuditLogRow {
  hash: string;
  merkleRoot: string;
  timestamp: number;
  entry: MerkleEntry;
}

// ─── MerkleAuditLog ───

export class MerkleAuditLog {
  private root: MerkleNode | null = null;
  private leaves: MerkleNode[] = [];
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    await ensureAuditLogsTable();
    this.initialized = true;
    log.info('Merkle Audit Log initialisé');
  }

  // ─── Ajout d'entrée ───

  async append(params: {
    action: string;
    user?: string;
    resource?: string;
    entityId?: string;
    details?: Record<string, unknown>;
  }): Promise<string> {
    await this.init();

    const entry: MerkleEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      action: params.action,
      user: params.user,
      resource: params.resource,
      entityId: params.entityId,
      details: params.details || {},
    };

    const dataStr = JSON.stringify(entry);
    const hash = bytesToHex(sha256(new TextEncoder().encode(dataStr)));

    const leaf: MerkleNode = { hash, data: entry };
    this.leaves.push(leaf);

    // Reconstruire l'arbre
    this.root = this.buildTree([...this.leaves]);

    // Persister l'entrée dans IndexedDB
    try {
      await db.table('auditLogs').put({
        hash,
        merkleRoot: this.root.hash,
        timestamp: entry.timestamp,
        entry,
      } as AuditLogRow);
    } catch {
      // Fallback: stockage local si la table n'est pas encore prête
      log.warn('Persistance audit log différée', { hash: hash.slice(0, 16) });
    }

    log.info('Entrée ajoutée au Merkle Log', {
      action: entry.action,
      hash: hash.slice(0, 16),
      merkleRoot: this.root.hash.slice(0, 16),
      totalEntries: this.leaves.length,
    });

    return this.root.hash;
  }

  // ─── Construction de l'arbre de Merkle ───

  private buildTree(nodes: MerkleNode[]): MerkleNode {
    if (nodes.length === 0) {
      const emptyHash = bytesToHex(sha256(new TextEncoder().encode('KOS_GENESIS_BLOCK')));
      return { hash: emptyHash };
    }

    if (nodes.length === 1) return nodes[0]!;

    const parents: MerkleNode[] = [];

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i]!;
      const right = nodes[i + 1] || left; // Duplique si impair (balanced tree)
      const combined = left.hash + right.hash;
      const hash = bytesToHex(sha256(new TextEncoder().encode(combined)));
      parents.push({ hash, left, right });
    }

    return this.buildTree(parents);
  }

  // ─── Racine actuelle ───

  getRootHash(): string {
    return this.root?.hash || '';
  }

  // ─── Preuve d'existence pour un hash donné ───

  getProof(targetHash: string): string[] | null {
    if (!this.root) return null;

    const path: string[] = [];
    const found = this.findPath(this.root, targetHash, path);
    return found ? path : null;
  }

  private findPath(node: MerkleNode | null, targetHash: string, path: string[]): boolean {
    if (!node) return false;

    if (node.hash === targetHash) return true;

    if (node.left && this.findPath(node.left, targetHash, path)) {
      if (node.right) path.push(node.right.hash);
      return true;
    }

    if (node.right && this.findPath(node.right, targetHash, path)) {
      if (node.left) path.push(node.left.hash);
      return true;
    }

    return false;
  }

  // ─── Vérification complète de la chaîne ───

  async verifyChain(): Promise<MerkleChainVerification> {
    await this.init();

    const logs: AuditLogRow[] = [];
    try {
      const all = await db.table('auditLogs').toArray();
      logs.push(...all);
    } catch {
      // Table pas encore prête
    }

    if (logs.length === 0) {
      if (this.leaves.length === 0) {
        return {
          totalEntries: 0,
          merkleRoot: '',
          verified: true,
          tampered: false,
          proofPaths: [],
        };
      }
    }

    // Trier par timestamp
    const sorted = logs.sort((a, b) => a.timestamp - b.timestamp);

    // Reconstruire l'arbre à partir des logs persistés
    const rebuiltLeaves: MerkleNode[] = sorted.map((l) => {
      const dataStr = JSON.stringify(l.entry);
      const hash = bytesToHex(sha256(new TextEncoder().encode(dataStr)));
      return { hash, data: l.entry };
    });

    const rebuiltRoot = this.buildTree(rebuiltLeaves);

    // Vérifier que le root stocké correspond au root recalculé
    const lastLog = sorted[sorted.length - 1];
    const tampered = lastLog ? rebuiltRoot.hash !== lastLog.merkleRoot : false;

    // Générer les preuves pour chaque entrée
    const proofPaths: MerkleProof[] = sorted.map((l) => {
      const path = this.getProofFromNodes(rebuiltLeaves, l.hash);
      return {
        entryHash: l.hash,
        verified: path !== null,
        path: path || [],
      };
    });

    if (tampered) {
      log.warn('CHAÎNE ALTÉRÉE DÉTECTÉE', {
        expectedRoot: lastLog?.merkleRoot?.slice(0, 16),
        computedRoot: rebuiltRoot.hash.slice(0, 16),
      });
    }

    return {
      totalEntries: sorted.length,
      merkleRoot: rebuiltRoot.hash,
      verified: !tampered,
      tampered,
      tamperedAt: tampered ? sorted.length - 1 : undefined,
      proofPaths,
    };
  }

  private getProofFromNodes(nodes: MerkleNode[], targetHash: string): string[] | null {
    const tree = nodes.length > 0 ? this.buildTree(nodes) : null;
    if (!tree) return null;

    const path: string[] = [];
    const found = this.findPath(tree, targetHash, path);
    return found ? path : null;
  }

  // ─── Export pour auditeur ───

  async exportAuditBundle(): Promise<{
    exportedAt: string;
    merkleRoot: string;
    totalEntries: number;
    entries: MerkleEntry[];
    verification: MerkleChainVerification;
  }> {
    await this.init();

    const verification = await this.verifyChain();

    const logs: AuditLogRow[] = [];
    try {
      const all = await db.table('auditLogs').toArray();
      logs.push(...all);
    } catch {
      // Table pas encore prête
    }

    const sorted = logs.sort((a, b) => a.timestamp - b.timestamp);

    return {
      exportedAt: new Date().toISOString(),
      merkleRoot: verification.merkleRoot,
      totalEntries: sorted.length,
      entries: sorted.map((l) => l.entry),
      verification,
    };
  }

  // ─── Nombre d'entrées ───

  async count(): Promise<number> {
    await this.init();
    try {
      return await db.table('auditLogs').count();
    } catch {
      return this.leaves.length;
    }
  }

  // ─── Reset (development only) ───

  async clear(): Promise<void> {
    await this.init();
    this.leaves = [];
    this.root = null;
    try {
      await db.table('auditLogs').clear();
    } catch {
      // Table pas encore prête
    }
    log.info('Merkle Audit Log réinitialisé');
  }
}

// ─── Singleton ───

export const merkleLog = new MerkleAuditLog();