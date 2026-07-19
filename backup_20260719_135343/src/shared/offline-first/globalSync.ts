import * as Y from 'yjs';
import { db, type Control, type Incident, type BCEAORule } from '@/shared/db/localDB';
import { logger } from '@/core/logger';

const log = logger.child('global-sync');

interface GlobalSyncConfig {
  roomName: string;
  signalingServer: string;
  password: string;
  enabled: boolean;
}

const DEFAULT_CONFIG: GlobalSyncConfig = {
  roomName: 'kos-regtech-global',
  signalingServer: 'wss://signaling.kos.local',
  password: 'BCEAO-SHARED-SECRET',
  enabled: false,
};

let yDoc: Y.Doc | null = null;
let webrtcProvider: any = null;
let syncConfig: GlobalSyncConfig = { ...DEFAULT_CONFIG };

// ─── Initialisation Yjs + Optionnel WebRTC ───

export function createGlobalDoc(config?: Partial<GlobalSyncConfig>): {
  ydoc: Y.Doc;
  provider: any;
} {
  if (yDoc) {
    return { ydoc: yDoc, provider: webrtcProvider };
  }

  syncConfig = { ...DEFAULT_CONFIG, ...config };
  yDoc = new Y.Doc();

  if (syncConfig.enabled) {
    try {
      // Option P2P: WebRTC si 2 postes sur même LAN/VPN
      import('y-webrtc').then(({ WebrtcProvider }) => {
        webrtcProvider = new WebrtcProvider(syncConfig.roomName, yDoc!, {
          signaling: [syncConfig.signalingServer],
          password: syncConfig.password,
          maxConns: 10,
          filterBcConns: true,
        });

        log.info('WebRTC Provider initialisé', {
          roomName: syncConfig.roomName,
          signaling: syncConfig.signalingServer,
        });

        webrtcProvider.on('status', (event: any) => {
          log.info('WebRTC Status', { status: event.status, connected: event.connected });
        });
      }).catch((err) => {
        log.warn('WebRTC non disponible — mode offline pur', { error: String(err) });
      });
    } catch {
      log.info('Mode 100% offline — export/import .db uniquement');
    }
  } else {
    log.info('Mode 100% offline — export/import .db uniquement');
  }

  // ─── Observe Yjs → Dexie Sync ───

  const yControls = yDoc.getArray<Record<string, unknown>>('controls');
  yControls.observe(() => {
    syncToDexieControls(yControls.toArray());
  });

  const yIncidents = yDoc.getArray<Record<string, unknown>>('incidents');
  yIncidents.observe(() => {
    syncToDexieIncidents(yIncidents.toArray());
  });

  const yRules = yDoc.getArray<Record<string, unknown>>('rules');
  yRules.observe(() => {
    syncToDexieRules(yRules.toArray());
  });

  log.info('Yjs Document créé', {
    enabled: syncConfig.enabled,
    roomName: syncConfig.roomName,
  });

  return { ydoc: yDoc, provider: webrtcProvider };
}

// ─── Export Dexie → Yjs ───

export async function exportDexieToYjs(): Promise<void> {
  if (!yDoc) {
    createGlobalDoc();
  }
  if (!yDoc) return;

  const controls = await db.controls.toArray();
  const incidents = await db.incidents.toArray();
  const rules = await db.rules.toArray();

  yDoc.transact(() => {
    const yControls = yDoc!.getArray<Record<string, unknown>>('controls');
    yControls.delete(0, yControls.length);
    yControls.insert(0, controls as unknown as Record<string, unknown>[]);

    const yIncidents = yDoc!.getArray<Record<string, unknown>>('incidents');
    yIncidents.delete(0, yIncidents.length);
    yIncidents.insert(0, incidents as unknown as Record<string, unknown>[]);

    const yRules = yDoc!.getArray<Record<string, unknown>>('rules');
    yRules.delete(0, yRules.length);
    yRules.insert(0, rules as unknown as Record<string, unknown>[]);
  });

  log.info('Dexie exporté vers Yjs', {
    controls: controls.length,
    incidents: incidents.length,
    rules: rules.length,
  });
}

// ─── Import Yjs → Dexie ───

async function syncToDexieControls(data: Record<string, unknown>[]): Promise<void> {
  if (data.length === 0) return;
  try {
    const controls = data as unknown as Control[];
    await db.controls.bulkPut(controls);
    log.info('Controls sync Yjs→Dexie', { count: controls.length });
  } catch (err) {
    log.error('Erreur sync controls', { error: String(err) });
  }
}

async function syncToDexieIncidents(data: Record<string, unknown>[]): Promise<void> {
  if (data.length === 0) return;
  try {
    const incidents = data as unknown as Incident[];
    await db.incidents.bulkPut(incidents);
    log.info('Incidents sync Yjs→Dexie', { count: incidents.length });
  } catch (err) {
    log.error('Erreur sync incidents', { error: String(err) });
  }
}

async function syncToDexieRules(data: Record<string, unknown>[]): Promise<void> {
  if (data.length === 0) return;
  try {
    const rules = data as unknown as BCEAORule[];
    await db.rules.bulkPut(rules);
    log.info('Rules sync Yjs→Dexie', { count: rules.length });
  } catch (err) {
    log.error('Erreur sync rules', { error: String(err) });
  }
}

// ─── Nettoyage ───

export function destroyGlobalDoc(): void {
  if (webrtcProvider) {
    try {
      webrtcProvider.destroy();
    } catch {
      // Ignorer
    }
    webrtcProvider = null;
  }

  if (yDoc) {
    try {
      yDoc.destroy();
    } catch {
      // Ignorer
    }
    yDoc = null;
  }

  log.info('Global Doc détruit');
}

// ─── Statut connexion ───

export function getSyncStatus(): {
  mode: 'offline' | 'p2p';
  connected: boolean;
  roomName: string;
  peersCount: number;
} {
  const connected = Boolean(webrtcProvider?.connected);
  const peersCount = webrtcProvider?.awareness?.getStates()?.size || 0;

  return {
    mode: syncConfig.enabled && connected ? 'p2p' : 'offline',
    connected,
    roomName: syncConfig.roomName,
    peersCount,
  };
}

// ─── Await connexion ───

export function getGlobalDoc(): Y.Doc | null {
  return yDoc;
}

export function isP2PEnabled(): boolean {
  return syncConfig.enabled && Boolean(webrtcProvider);
}



