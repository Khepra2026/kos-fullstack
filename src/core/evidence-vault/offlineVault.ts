import { db, sha256, encryptLocal, decryptLocal, type Evidence } from '@/shared/db/localDB';
import { logger } from '@/core/logger';

// KOS Regtech AI — Evidence Vault Hors Ligne
// Collecte de preuves tamper-proof, chiffrées localement
// Horodatage machine + compteur monotone + hash chaîné
// Export bundle pour dépôt régulateur

const log = logger.child('offline-vault');

// ─── Capturer une preuve ───

interface CaptureResult {
  hash: string;
  certificat: {
    hash: string;
    timestamp: string;
    monotonic: number;
    timezone: string;
    fileName: string;
    size: number;
    regulation: string;
  };
}

export async function captureEvidence(
  file: File | Blob,
  regulation: string
): Promise<CaptureResult> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const fileName = file instanceof File ? file.name : `capture-${Date.now()}`;

  // Horodatage local = hash + heure machine + compteur monotone
  const ts = {
    iso: new Date().toISOString(),
    monotonic: performance.now(),
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Chaînage avec le hash précédent
  const prevEvidence = await db.evidences.orderBy('capturedAt').last();
  const chainPrevHash = prevEvidence?.hash;

  // Chiffrement local
  const encryptedBuffer = await encryptLocal({
    hash,
    ts,
    fileName,
    regulation,
    version: '1.0',
  });

  const entry: Evidence = {
    id: crypto.randomUUID(),
    hash,
    fileName,
    size: file.size,
    mimeType: file instanceof File ? file.type : 'application/octet-stream',
    capturedAt: ts.iso,
    regulation,
    encrypted: encryptedBuffer,
    chainPrevHash,
  };

  await db.evidences.put(entry);

  log.info('Preuve capturée', {
    hash: hash.slice(0, 16),
    regulation,
    size: file.size,
    chained: Boolean(chainPrevHash),
  });

  return {
    hash,
    certificat: {
      hash,
      timestamp: ts.iso,
      monotonic: ts.monotonic,
      timezone: ts.tz,
      fileName,
      size: file.size,
      regulation,
    },
  };
}

// ─── Vérifier intégrité de la chaîne ───

interface ChainVerification {
  valid: boolean;
  totalEntries: number;
  brokenLinks: number;
  firstHash: string;
  lastHash: string;
  details: string[];
}

export async function verifyChain(): Promise<ChainVerification> {
  const all = await db.evidences.orderBy('capturedAt').toArray();
  const details: string[] = [];
  let brokenLinks = 0;

  for (let i = 0; i < all.length; i++) {
    const entry = all[i]!;
    if (i > 0) {
      const prev = all[i - 1]!;
      if (entry.chainPrevHash !== prev.hash) {
        brokenLinks++;
        details.push(
          `Lien brisé à l'entrée ${i} : attendu ${prev.hash.slice(0, 16)}, reçu ${(entry.chainPrevHash || 'aucun').slice(0, 16)}`
        );
      }
    }
  }

  const valid = brokenLinks === 0 && all.length > 0;

  log.info('Vérification chaîne', { valid, total: all.length, brokenLinks });

  return {
    valid,
    totalEntries: all.length,
    brokenLinks,
    firstHash: all[0]?.hash?.slice(0, 16) || '',
    lastHash: all[all.length - 1]?.hash?.slice(0, 16) || '',
    details,
  };
}

// ─── Exporter bundle pour dépôt régulateur ───

interface EvidenceBundle {
  evidences: Array<{
    hash: string;
    fileName: string;
    size: number;
    capturedAt: string;
    regulation: string;
    chainPrevHash?: string;
  }>;
  exportedAt: string;
  totalHashes: string;
  chainIntegrity: ChainVerification;
}

export async function exportBundle(regulation?: string): Promise<EvidenceBundle> {
  let evidences = await db.evidences.orderBy('capturedAt').toArray();

  if (regulation) {
    evidences = evidences.filter((e) => e.regulation === regulation);
  }

  const stripped = evidences.map((e) => ({
    hash: e.hash,
    fileName: e.fileName,
    size: e.size,
    capturedAt: e.capturedAt,
    regulation: e.regulation,
    chainPrevHash: e.chainPrevHash,
  }));

  const bundleJson = JSON.stringify(stripped);
  const totalHashes = await sha256(bundleJson);
  const chainIntegrity = await verifyChain();

  log.info('Bundle exporté', {
    count: evidences.length,
    regulation: regulation || 'all',
  });

  return {
    evidences: stripped,
    exportedAt: new Date().toISOString(),
    totalHashes,
    chainIntegrity,
  };
}

// ─── Récupérer une preuve et déchiffrer ───

export async function retrieveEvidence(hash: string): Promise<{
  metadata: Omit<Evidence, 'encrypted'>;
  decrypted: Record<string, unknown>;
} | null> {
  const entry = await db.evidences.where('hash').equals(hash).first();
  if (!entry) {
    log.warn('Preuve non trouvée', { hash: hash.slice(0, 16) });
    return null;
  }

  const decrypted = await decryptLocal(entry.encrypted);
  const { encrypted: _, ...metadata } = entry;

  return { metadata, decrypted };
}

// ─── Télécharger preuve comme fichier ───

export function downloadEvidence(entry: Evidence): void {
  const blob = new Blob([entry.encrypted], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `evidence-${entry.hash.slice(0, 8)}.kos`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Générer certificat local ───

export function generateLocalCert(
  hash: string,
  ts: { iso: string; monotonic: number }
): string {
  return [
    '-----BEGIN KOS EVIDENCE CERTIFICATE-----',
    `Hash: ${hash}`,
    `Timestamp: ${ts.iso}`,
    `Monotonic: ${ts.monotonic}`,
    `Issuer: KOS Regtech AI — Offline Vault`,
    `Algorithm: SHA-256 + AES-256-GCM`,
    '-----END KOS EVIDENCE CERTIFICATE-----',
  ].join('\n');
}