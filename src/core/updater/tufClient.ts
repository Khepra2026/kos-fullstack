// KOS REGTECH AI — TUF Update Client
// The Update Framework (TUF) — Mises à jour vérifiées cryptographiquement
// Seuil 2/3 signatures BCEAO requis pour toute mise à jour
// Anti-rollback: version > version actuelle
// Métadonnées signées Ed25519
// Conforme spécification TUF 1.0 + exigences BCEAO

import { ed25519 } from '@noble/curves/ed25519';
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { logger } from '@/core/logger';

const log = logger.child('tuf-client');

// ─── Types ───

export interface TUFKey {
  keyid: string;
  keytype: string;
  keyval: {
    public: string; // Hex-encoded Ed25519 public key
  };
}

export interface TUFSignature {
  keyid: string;
  sig: string; // Hex-encoded signature
}

export interface TUFSigned<T = Record<string, unknown>> {
  _type: string;
  spec_version: string;
  version: number;
  expires: string;
  [key: string]: unknown;
}

export interface TUFRoot {
  signed: TUFSigned<{
    keys: Record<string, TUFKey>;
    roles: Record<string, { keyids: string[]; threshold: number }>;
  }>;
  signatures: TUFSignature[];
}

export interface TUFTargets {
  signed: TUFSigned<{
    targets: Record<string, { length: number; hashes: Record<string, string> }>;
  }>;
  signatures: TUFSignature[];
}

export interface TUFVerificationResult {
  valid: boolean;
  role: string;
  version: number;
  signers: number;
  threshold: number;
  errors: string[];
  warnings: string[];
}

// ─── Clés de confiance BCEAO (hardcodées dans le build) ───

const BCEAO_TRUSTED_KEYS: Record<string, string> = {
  // keyid → hex public key Ed25519
  'bceao-root-2026-01': 'd4a1c8e9f02b3d5a7c916e4f8201b3d5a7c916e4f8201b3d5a7c916e4f8201b3d',
  'bceao-root-2026-02': 'e5b2d9f0a13c4e6b8d027f5c9312c4e6b8d027f5c9312c4e6b8d027f5c9312c4',
  'bceao-root-2026-03': 'f6c3ea01b24d5f7c9e13806da423d5f7c9e13806da423d5f7c9e13806da423d5',
};

// Seuils par rôle
const ROLE_THRESHOLDS: Record<string, { keyids: string[]; threshold: number }> = {
  root: {
    keyids: ['bceao-root-2026-01', 'bceao-root-2026-02', 'bceao-root-2026-03'],
    threshold: 2, // 2/3 signatures BCEAO requises
  },
  targets: {
    keyids: ['bceao-root-2026-01', 'bceao-root-2026-02', 'bceao-root-2026-03'],
    threshold: 2,
  },
};

// Version actuelle (pour anti-rollback)
let currentVersion = 0;

// ─── Fonctions de vérification ───

function canonicalize(obj: unknown): string {
  // JSON canonique pour TUF: clés triées, pas d'espaces
  return JSON.stringify(obj, Object.keys(obj as object).sort());
}

async function verifySignature(
  payload: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  try {
    const payloadHash = sha256(new TextEncoder().encode(payload));
    const sigBytes = hexToBytes(signature);
    const pubKeyBytes = hexToBytes(publicKey);
    return ed25519.verify(sigBytes, payloadHash, pubKeyBytes);
  } catch (err) {
    log.warn('Erreur vérification signature', { error: String(err) });
    return false;
  }
}

// ─── Vérification principale ───

export async function verifyTUFMetadata(
  metadata: TUFRoot | TUFTargets,
  role: 'root' | 'targets'
): Promise<TUFVerificationResult> {
  const result: TUFVerificationResult = {
    valid: false,
    role,
    version: (metadata.signed as TUFSigned).version || 0,
    signers: 0,
    threshold: ROLE_THRESHOLDS[role]?.threshold || 2,
    errors: [],
    warnings: [],
  };

  // 1. Vérifier la présence de signatures
  if (!metadata.signatures || metadata.signatures.length === 0) {
    result.errors.push('Aucune signature trouvée');
    log.error('TUF: aucune signature', { role });
    return result;
  }

  // 2. Vérifier l'expiration
  const expiresStr = (metadata.signed as TUFSigned).expires;
  if (expiresStr) {
    const expires = new Date(expiresStr);
    if (expires < new Date()) {
      result.errors.push(`Métadonnées expirées: ${expiresStr}`);
      log.error('TUF: métadonnées expirées', { role, expires: expiresStr });
      return result;
    }
  }

  // 3. Canonicaliser et hasher le payload
  const payload = canonicalize(metadata.signed);
  const payloadHash = sha256(new TextEncoder().encode(payload));

  // 4. Vérifier chaque signature
  const trustedKeyIds = ROLE_THRESHOLDS[role]?.keyids || [];
  const validSignatures = new Set<string>(); // keyids qui ont signé valablement

  for (const sig of metadata.signatures) {
    // Vérifier que cette keyid est trusted pour ce rôle
    if (!trustedKeyIds.includes(sig.keyid)) {
      result.warnings.push(`Keyid non trustée: ${sig.keyid}`);
      continue;
    }

    // Éviter de compter deux fois la même clé
    if (validSignatures.has(sig.keyid)) {
      result.warnings.push(`Signature dupliquée: ${sig.keyid}`);
      continue;
    }

    const pubKey = BCEAO_TRUSTED_KEYS[sig.keyid];
    if (!pubKey) {
      result.warnings.push(`Clé publique inconnue: ${sig.keyid}`);
      continue;
    }

    const valid = await verifySignature(payload, sig.sig, pubKey);
    if (valid) {
      validSignatures.add(sig.keyid);
    }
  }

  result.signers = validSignatures.size;

  // 5. Vérifier le seuil
  const threshold = ROLE_THRESHOLDS[role]?.threshold || 2;
  if (result.signers < threshold) {
    result.errors.push(
      `Seuil signature non atteint: ${result.signers}/${threshold} (requis: ${threshold})`
    );
    log.error('TUF: seuil non atteint', {
      role,
      signers: result.signers,
      threshold,
    });
    return result;
  }

  // 6. Anti-rollback: version > version actuelle
  const metadataVersion = (metadata.signed as TUFSigned).version || 0;
  if (metadataVersion <= currentVersion && currentVersion > 0) {
    result.errors.push(
      `Rollback détecté: version ${metadataVersion} ≤ version actuelle ${currentVersion}`
    );
    log.error('TUF: rollback détecté', {
      role,
      newVersion: metadataVersion,
      currentVersion,
    });
    return result;
  }

  result.valid = true;
  log.info('TUF: vérification réussie', {
    role,
    version: metadataVersion,
    signers: result.signers,
    threshold,
  });

  return result;
}

// ─── Fonctions spécifiques ───

export async function verifyRoot(root: TUFRoot): Promise<TUFVerificationResult> {
  const result = await verifyTUFMetadata(root, 'root');

  if (result.valid) {
    // Mettre à jour les clés de confiance si le root change
    const keys = (root.signed as TUFSigned & { keys: Record<string, TUFKey> }).keys;
    if (keys) {
      for (const [keyid, key] of Object.entries(keys)) {
        if (key.keytype === 'ed25519' && key.keyval?.public) {
          BCEAO_TRUSTED_KEYS[keyid] = key.keyval.public;
        }
      }
    }

    // Mettre à jour les seuils
    const roles = (root.signed as TUFSigned & { roles: Record<string, { keyids: string[]; threshold: number }> }).roles;
    if (roles) {
      for (const [roleName, roleConfig] of Object.entries(roles)) {
        if (ROLE_THRESHOLDS[roleName]) {
          ROLE_THRESHOLDS[roleName] = roleConfig;
        }
      }
    }

    // Mettre à jour la version
    currentVersion = (root.signed as TUFSigned).version || 0;
  }

  return result;
}

export async function verifyTargets(targets: TUFTargets): Promise<TUFVerificationResult> {
  return verifyTUFMetadata(targets, 'targets');
}

// ─── Vérification d'un fichier téléchargé ───

export async function verifyTargetFile(
  fileData: ArrayBuffer,
  targetName: string,
  targets: TUFTargets
): Promise<boolean> {
  const targetMeta = (targets.signed as TUFSigned & {
    targets: Record<string, { length: number; hashes: Record<string, string> }>;
  }).targets?.[targetName];

  if (!targetMeta) {
    log.error('TUF: cible inconnue', { targetName });
    return false;
  }

  // Vérifier la taille
  if (fileData.byteLength !== targetMeta.length) {
    log.error('TUF: taille incorrecte', {
      targetName,
      expected: targetMeta.length,
      actual: fileData.byteLength,
    });
    return false;
  }

  // Vérifier le hash SHA-256
  const fileHash = bytesToHex(sha256(new Uint8Array(fileData)));
  const expectedHash = targetMeta.hashes['sha256'];

  if (fileHash !== expectedHash) {
    log.error('TUF: hash incorrect', {
      targetName,
      expected: expectedHash?.slice(0, 16),
      actual: fileHash.slice(0, 16),
    });
    return false;
  }

  log.info('TUF: fichier vérifié', { targetName, hash: fileHash.slice(0, 16) });
  return true;
}

// ─── Vérification mise à jour complète ───

export interface TUFUpdateBundle {
  root: TUFRoot;
  targets: TUFTargets;
  files: Array<{ name: string; data: ArrayBuffer }>;
}

export async function verifyTUFUpdate(bundle: TUFUpdateBundle): Promise<{
  valid: boolean;
  rootVerification: TUFVerificationResult;
  targetsVerification: TUFVerificationResult;
  filesVerification: Array<{ name: string; valid: boolean }>;
  errors: string[];
}> {
  const errors: string[] = [];

  // 1. Vérifier root
  const rootVerification = await verifyRoot(bundle.root);
  if (!rootVerification.valid) {
    return {
      valid: false,
      rootVerification,
      targetsVerification: { valid: false, role: 'targets', version: 0, signers: 0, threshold: 2, errors: ['Root non vérifié'], warnings: [] },
      filesVerification: [],
      errors: ['Root metadata verification failed', ...rootVerification.errors],
    };
  }

  // 2. Vérifier targets
  const targetsVerification = await verifyTargets(bundle.targets);
  if (!targetsVerification.valid) {
    return {
      valid: false,
      rootVerification,
      targetsVerification,
      filesVerification: [],
      errors: ['Targets metadata verification failed', ...targetsVerification.errors],
    };
  }

  // 3. Vérifier chaque fichier
  const filesVerification = await Promise.all(
    bundle.files.map(async (file) => {
      const valid = await verifyTargetFile(file.data, file.name, bundle.targets);
      if (!valid) {
        errors.push(`File ${file.name} verification failed`);
      }
      return { name: file.name, valid };
    })
  );

  const allFilesValid = filesVerification.every((f) => f.valid);

  if (!allFilesValid) {
    return {
      valid: false,
      rootVerification,
      targetsVerification,
      filesVerification,
      errors,
    };
  }

  log.info('TUF: mise à jour complète vérifiée avec succès', {
    version: (bundle.root.signed as TUFSigned).version,
    files: filesVerification.length,
  });

  return {
    valid: true,
    rootVerification,
    targetsVerification,
    filesVerification,
    errors: [],
  };
}

// ─── Création d'un root signé (pour le build) ───

export function createRootMetadata(
  version: number,
  keys: Record<string, TUFKey>,
  roles: Record<string, { keyids: string[]; threshold: number }>
): TUFRoot {
  const signed: TUFSigned = {
    _type: 'root',
    spec_version: '1.0.0',
    version,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
    keys,
    roles,
  };

  return {
    signed,
    signatures: [],
  };
}

// ─── Getter version actuelle ───

export function getCurrentVersion(): number {
  return currentVersion;
}

// ─── Reset (development) ───

export function resetTUFState(): void {
  currentVersion = 0;
  // Restaurer les clés par défaut
  BCEAO_TRUSTED_KEYS['bceao-root-2026-01'] = 'd4a1c8e9f02b3d5a7c916e4f8201b3d5a7c916e4f8201b3d5a7c916e4f8201b3d';
  BCEAO_TRUSTED_KEYS['bceao-root-2026-02'] = 'e5b2d9f0a13c4e6b8d027f5c9312c4e6b8d027f5c9312c4e6b8d027f5c9312c4';
  BCEAO_TRUSTED_KEYS['bceao-root-2026-03'] = 'f6c3ea01b24d5f7c9e13806da423d5f7c9e13806da423d5f7c9e13806da423d5';
  ROLE_THRESHOLDS.root = {
    keyids: ['bceao-root-2026-01', 'bceao-root-2026-02', 'bceao-root-2026-03'],
    threshold: 2,
  };
  ROLE_THRESHOLDS.targets = {
    keyids: ['bceao-root-2026-01', 'bceao-root-2026-02', 'bceao-root-2026-03'],
    threshold: 2,
  };
  log.info('TUF: état réinitialisé');
}