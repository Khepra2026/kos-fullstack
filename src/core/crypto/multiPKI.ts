import { ed25519 } from '@noble/curves/ed25519';
import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
import { logger } from '@/core/logger';
import { merkleLog } from '@/core/audit-trail/merkleLog';

const log = logger.child('multi-pki');

const TRUSTED_ROOTS: Record<string, string> = {
  BCEAO: '3f2a9d4e8b1c5a7f6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f',
  COBAC: '7b1c5a7f3f2a9d4e6e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f',
  ACPR: '9d4e3f2a1b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f',
  FCA: '1a5f9d4e3f2a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e',
  MAS: '6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c',
  FED: '2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b',
  GAFI: '4f9a2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f',
  OHADA: '8e3b4f9a2b7e6c8d1a5f9d4e3f2a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6',
};

interface SignedPayload {
  data: string;
  signature: string;
  regulator: string;
  version: string;
  issuedAt: string;
}

interface VerificationResult {
  valid: boolean;
  regulator: string;
  verifiedAt: string;
  merkleEntryHash?: string;
  details: string;
}

export async function verifyRegulatorSignature(
  payload: string,
  sig: string,
  regulator: string
): Promise<boolean> {
  const pk = TRUSTED_ROOTS[regulator];
  if (!pk) {
    log.warn('Régulateur inconnu — PKI non trouvée', { regulator });
    return false;
  }

  try {
    const hash = nobleSha256(new TextEncoder().encode(payload));
    const valid = ed25519.verify(sig, hash, pk);
    log.info('Vérification signature', { regulator, valid, hashPrefix: bytesToHex(hash).slice(0, 16) });
    return valid;
  } catch (err) {
    log.error('Erreur vérification signature', { regulator, error: String(err) });
    return false;
  }
}

export async function verifySignedPayload(
  signedPayload: SignedPayload
): Promise<VerificationResult> {
  const { data, signature, regulator, version, issuedAt } = signedPayload;

  const valid = await verifyRegulatorSignature(data, signature, regulator);

  const result: VerificationResult = {
    valid,
    regulator,
    verifiedAt: new Date().toISOString(),
    details: valid
      ? `Signature ${regulator} vérifiée — Version ${version}, émise ${issuedAt}`
      : `SIGNATURE INVALIDE — ${regulator} v${version} non vérifiée`,
  };

  // Log dans le Merkle Audit Trail
  const merkleRoot = await merkleLog.append({
    action: valid ? 'PKI_VERIFY_SUCCESS' : 'PKI_VERIFY_FAIL',
    resource: regulator,
    details: {
      version,
      issuedAt,
      valid,
      hashPrefix: bytesToHex(nobleSha256(new TextEncoder().encode(data))).slice(0, 16),
    },
  });

  result.merkleEntryHash = merkleRoot.slice(0, 16);

  if (!valid) {
    log.warn('ÉCHEC VÉRIFICATION SIGNATURE RÉGULATEUR', {
      regulator,
      version,
      issuedAt,
    });
  }

  return result;
}

export function getRegulatorPublicKey(regulator: string): string | null {
  return TRUSTED_ROOTS[regulator] || null;
}

export function isTrustedRegulator(regulator: string): boolean {
  return regulator in TRUSTED_ROOTS;
}

export function getTrustedRegulatorsList(): string[] {
  return Object.keys(TRUSTED_ROOTS);
}

export function getMultiSigThreshold(regulators: string[]): number {
  const total = regulators.filter((r) => r in TRUSTED_ROOTS).length;
  if (total === 0) return 0;
  if (total <= 2) return total;
  return Math.ceil(total * 2 / 3);
}

export async function verifyMultiSignature(
  payload: string,
  signatures: Record<string, string>
): Promise<{ valid: boolean; passed: string[]; failed: string[]; threshold: number }> {
  const regulators = Object.keys(signatures);
  const threshold = getMultiSigThreshold(regulators);
  const passed: string[] = [];
  const failed: string[] = [];

  for (const regulator of regulators) {
    const sig = signatures[regulator]!;
    const valid = await verifyRegulatorSignature(payload, sig, regulator);
    if (valid) {
      passed.push(regulator);
    } else {
      failed.push(regulator);
    }
  }

  const valid = passed.length >= threshold;

  await merkleLog.append({
    action: valid ? 'MULTI_SIG_VERIFY_SUCCESS' : 'MULTI_SIG_VERIFY_FAIL',
    resource: regulators.join(','),
    details: { passed, failed, threshold, totalValid: passed.length },
  });

  log.info('Vérification multi-signature', {
    valid,
    passed: passed.join(','),
    failed: failed.join(','),
    threshold,
    met: passed.length >= threshold,
  });

  return { valid, passed, failed, threshold };
}

export function sha256Hash(data: string): string {
  return bytesToHex(nobleSha256(new TextEncoder().encode(data)));
}

export function createSignatureChallenge(regulator: string, nonce?: string): string {
  const challengeNonce = nonce || crypto.randomUUID();
  const ts = Date.now();
  return `${regulator}|${challengeNonce}|${ts}`;
}



