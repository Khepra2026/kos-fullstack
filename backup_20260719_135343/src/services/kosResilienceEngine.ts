// KOS RESILIENCE ENGINE™ — Export, Sauvegarde & Restauration Automatique
// RPO < 1 heure. RTO < 4 heures. Zéro perte de données critiques.

import { localExportAll, localImportAll, localGetSizeEstimate } from '@/services/localStorage';
import { syncAll, syncHealthCheck } from '@/services/syncEngine';

// === Types ===
interface BackupManifest {
  version: string;
  timestamp: string;
  totalStores: number;
  totalRecords: number;
  sizeBytes: number;
  checksum: string;
  categoryStats: {
    A: number;
    B: number;
    C: number;
    D: number;
  };
}

interface BackupResult {
  success: boolean;
  manifest: BackupManifest | null;
  blob: Blob | null;
  error?: string;
}

interface RestoreResult {
  success: boolean;
  storesRestored: number;
  recordsRestored: number;
  error?: string;
}

// === Simple Checksum (FNV-1a hash) ===
function simpleChecksum(str: string): string {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

// === EXPORT: Sauvegarde locale complète ===
export async function exportLocalBackup(): Promise<BackupResult> {
  try {
    const data = await localExportAll();
    const jsonStr = JSON.stringify(data);
    const blob = new Blob([jsonStr], { type: 'application/json' });

    const totalRecords = Object.values(data).reduce((sum, arr) => sum + arr.length, 0);
    const sizeBytes = blob.size;

    const catAStores = ['regulators', 'regulations', 'regulatory_sources', 'citations', 'audit_logs', 'verification_logs', 'compliance_actions', 'regulatory_alerts'];
    const catBStores = ['lessons_learned', 'best_practices', 'policies', 'case_studies', 'knowledge_capsules'];
    const catCStores = ['rag_embeddings', 'rag_audit_logs', 'pipeline_state', 'workflow_execution'];
    const catDStores = ['activity_logs', 'monitoring_logs', 'cron_job_logs', 'kos_execution_logs'];

    const countRecords = (stores: string[]) => stores.reduce((sum, s) => sum + (data[s]?.length || 0), 0);

    const manifest: BackupManifest = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      totalStores: Object.keys(data).length,
      totalRecords,
      sizeBytes,
      checksum: simpleChecksum(jsonStr),
      categoryStats: {
        A: countRecords(catAStores),
        B: countRecords(catBStores),
        C: countRecords(catCStores),
        D: countRecords(catDStores),
      },
    };

    // Store manifest in Cache Storage
    try {
      const cache = await caches.open('kos-backups');
      const manifestResponse = new Response(JSON.stringify(manifest));
      await cache.put('/backup-manifest.json', manifestResponse);
      const backupResponse = new Response(blob);
      await cache.put(`/backup-${manifest.timestamp}.json`, backupResponse);
    } catch {
      // Cache storage might not be available
    }

    return { success: true, manifest, blob };
  } catch (err) {
    return { success: false, manifest: null, blob: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// === Téléchargement automatique du backup ===
export async function downloadBackup(): Promise<void> {
  const result = await exportLocalBackup();
  if (!result.success || !result.blob) return;

  const url = URL.createObjectURL(result.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kos-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// === IMPORT: Restauration à partir d'un fichier ===
export async function importBackupFromFile(file: File): Promise<RestoreResult> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    await localImportAll(data);

    const storesRestored = Object.keys(data).length;
    const recordsRestored = Object.values(data as Record<string, unknown[]>).reduce((sum: number, arr: unknown[]) => sum + arr.length, 0);

    return { success: true, storesRestored, recordsRestored };
  } catch (err) {
    return { success: false, storesRestored: 0, recordsRestored: 0, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// === RESTORE: À partir du Cache Storage ===
export async function restoreFromLastBackup(): Promise<RestoreResult> {
  try {
    const cache = await caches.open('kos-backups');
    const manifestResponse = await cache.match('/backup-manifest.json');
    if (!manifestResponse) {
      return { success: false, storesRestored: 0, recordsRestored: 0, error: 'Aucun backup trouvé' };
    }

    const manifest: BackupManifest = await manifestResponse.json();
    const backupResponse = await cache.match(`/backup-${manifest.timestamp}.json`);
    if (!backupResponse) {
      return { success: false, storesRestored: 0, recordsRestored: 0, error: 'Fichier backup non trouvé' };
    }

    const data = await backupResponse.json();
    await localImportAll(data);

    const storesRestored = Object.keys(data).length;
    const recordsRestored = Object.values(data as Record<string, unknown[]>).reduce((sum: number, arr: unknown[]) => sum + arr.length, 0);

    return { success: true, storesRestored, recordsRestored };
  } catch (err) {
    return { success: false, storesRestored: 0, recordsRestored: 0, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// === RESILIENCE CHECK: Vérification complète de la résilience ===
export async function resilienceCheck(): Promise<{
  rpoStatus: 'OK' | 'WARNING' | 'CRITICAL';
  localBackupAge: number | null;
  supabaseAvailable: boolean;
  localAvailable: boolean;
  storageQuota: { usage: number; quota: number } | null;
  recommendations: string[];
}> {
  const recommendations: string[] = [];
  const health = await syncHealthCheck();
  const storageQuota = await localGetSizeEstimate();

  // Check last backup age
  let localBackupAge: number | null = null;
  try {
    const cache = await caches.open('kos-backups');
    const manifestResponse = await cache.match('/backup-manifest.json');
    if (manifestResponse) {
      const manifest: BackupManifest = await manifestResponse.json();
      localBackupAge = Date.now() - new Date(manifest.timestamp).getTime();
    }
  } catch {
    // Cache not available
  }

  // RPO determination
  let rpoStatus: 'OK' | 'WARNING' | 'CRITICAL' = 'OK';
  if (localBackupAge === null) {
    rpoStatus = 'CRITICAL';
    recommendations.push('Aucun backup local trouvé. Lancer exportLocalBackup() immédiatement.');
  } else if (localBackupAge > 24 * 60 * 60 * 1000) {
    rpoStatus = 'CRITICAL';
    recommendations.push(`Dernier backup date de ${Math.round(localBackupAge / 3600000)}h — RPO cible < 1h non atteint.`);
  } else if (localBackupAge > 60 * 60 * 1000) {
    rpoStatus = 'WARNING';
    recommendations.push(`Dernier backup date de ${Math.round(localBackupAge / 60000)}min — programmer export automatique.`);
  }

  if (!health.supabaseAvailable && !health.localAvailable) {
    recommendations.push('CRITIQUE: Supabase ET stockage local indisponibles. Données inaccessibles.');
  } else if (!health.supabaseAvailable) {
    recommendations.push('Supabase indisponible — basculer en mode local uniquement.');
  }

  if (storageQuota && storageQuota.usage / storageQuota.quota > 0.85) {
    recommendations.push(`Stockage local à ${Math.round((storageQuota.usage / storageQuota.quota) * 100)}% — nettoyer les logs (Catégorie D).`);
  }

  return {
    rpoStatus,
    localBackupAge,
    supabaseAvailable: health.supabaseAvailable,
    localAvailable: health.localAvailable,
    storageQuota,
    recommendations,
  };
}

// === Scheduled Backup (à appeler via cron ou interval) ===
export async function scheduledBackup(): Promise<void> {
  // 1. Sync Supabase → Local
  const syncReport = await syncAll();
  console.log(`[KOS Resilience Engine] Sync: ${syncReport.totalSynced} stores, ${syncReport.totalErrors} errors`);

  // 2. Export local backup
  const backupResult = await exportLocalBackup();
  if (backupResult.success && backupResult.manifest) {
    console.log(`[KOS Resilience Engine] Backup: ${backupResult.manifest.totalRecords} records, ${(backupResult.manifest.sizeBytes / 1024).toFixed(1)} KB`);
  }

  // 3. Resilience check
  const resilience = await resilienceCheck();
  if (resilience.rpoStatus !== 'OK') {
    console.warn(`[KOS Resilience Engine] RPO Status: ${resilience.rpoStatus}`, resilience.recommendations);
  }
}



