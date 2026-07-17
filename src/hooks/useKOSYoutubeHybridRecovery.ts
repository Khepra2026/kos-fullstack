import { useState, useEffect, useCallback } from 'react';
import {
  BLOCK_DIAGNOSTICS, RECOVERY_ACTIONS, RECOVERY_ERROR_LOGS, RECOVERY_KPIS,
  RECOVERY_MANUAL_GUIDES, RECOVERY_SYSTEM_STATUS, RECOVERY_CASE_LABELS,
  type BlockPointDiagnostic, type BlockPointDetail, type RecoveryAction,
  type RecoveryErrorLog, type RecoveryKPIs, type RecoveryManualGuide,
  type RecoveryCase, type RecoveryStatus, type AssetType, type LogLevel,
} from '@/mocks/kosYoutubeHybridRecovery';
import { supabase } from '@/lib/supabase';

export interface KOSYoutubeHybridRecoveryData {
  // System
  systemStatus: typeof RECOVERY_SYSTEM_STATUS;
  caseLabels: typeof RECOVERY_CASE_LABELS;

  // Diagnostics
  diagnostics: BlockPointDiagnostic[];
  selectedDiagnostic: BlockPointDiagnostic | null;
  selectDiagnostic: (id: string | null) => void;

  // Actions
  recoveryActions: RecoveryAction[];
  executeRecovery: (diagnosticId: string, assetType?: AssetType) => Promise<void>;
  executeAllRecoveries: () => Promise<void>;
  retryAction: (actionId: string) => Promise<void>;

  // Error Logs
  errorLogs: RecoveryErrorLog[];
  filterLogs: (level?: LogLevel, result?: string) => RecoveryErrorLog[];

  // KPIs
  kpis: RecoveryKPIs;

  // Manual Guides
  manualGuides: RecoveryManualGuide[];
  getGuideForContent: (contentId: string) => RecoveryManualGuide | undefined;

  // Scan
  runFullScan: () => Promise<void>;
  isScanning: boolean;
  scanProgress: { step: string; percent: number };

  // Bulk
  resolveAllBlocks: () => Promise<void>;
  clearErrorLogs: () => void;

  // State
  loading: boolean;
  error: string | null;
  lastScanTimestamp: string | null;
}

export function useKOSYoutubeHybridRecovery(): KOSYoutubeHybridRecoveryData {
  const [diagnostics, setDiagnostics] = useState<BlockPointDiagnostic[]>(BLOCK_DIAGNOSTICS);
  const [recoveryActions, setRecoveryActions] = useState<RecoveryAction[]>(RECOVERY_ACTIONS);
  const [errorLogs, setErrorLogs] = useState<RecoveryErrorLog[]>(RECOVERY_ERROR_LOGS);
  const [kpis, setKpis] = useState<RecoveryKPIs>(RECOVERY_KPIS);
  const [manualGuides] = useState<RecoveryManualGuide[]>(RECOVERY_MANUAL_GUIDES);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<BlockPointDiagnostic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({ step: '', percent: 0 });
  const [lastScanTimestamp, setLastScanTimestamp] = useState<string | null>(null);

  const selectDiagnostic = useCallback((id: string | null) => {
    if (!id) { setSelectedDiagnostic(null); return; }
    const found = diagnostics.find((d) => d.diagnosticId === id);
    setSelectedDiagnostic(found || null);
  }, [diagnostics]);

  const updateDiagnostic = useCallback((diagnosticId: string, updates: Partial<BlockPointDiagnostic>) => {
    setDiagnostics((prev) => prev.map((d) => (d.diagnosticId === diagnosticId ? { ...d, ...updates } : d)));
  }, []);

  const updateAction = useCallback((actionId: string, updates: Partial<RecoveryAction>) => {
    setRecoveryActions((prev) => prev.map((a) => (a.actionId === actionId ? { ...a, ...updates } : a)));
  }, []);

  const addErrorLog = useCallback((log: RecoveryErrorLog) => {
    setErrorLogs((prev) => [log, ...prev]);
  }, []);

  const executeRecovery = useCallback(async (diagnosticId: string, assetType?: AssetType) => {
    const diag = diagnostics.find((d) => d.diagnosticId === diagnosticId);
    if (!diag) return;

    const targetBlocks = assetType
      ? diag.blocks.filter((b) => b.assetType === assetType && !b.present)
      : diag.blocks.filter((b) => !b.present);

    if (targetBlocks.length === 0) return;

    for (const block of targetBlocks) {
      const actionId = `ACT-${Date.now()}-${block.assetType}`;
      const newAction: RecoveryAction = {
        actionId,
        diagnosticId,
        caseType: diag.recoveryCase,
        assetType: block.assetType,
        actionName: getActionName(block.assetType),
        description: getActionDescription(block.assetType, diag.contentTitle),
        status: 'IN_PROGRESS',
        startedAt: new Date().toISOString(),
        completedAt: null,
        durationSeconds: 0,
        success: false,
        retryCount: 0,
        maxRetries: 3,
        outputMessage: 'Correction en cours...',
      };

      setRecoveryActions((prev) => [newAction, ...prev]);

      // Simuler la correction
      const delay = block.assetType === 'VIDEO' ? 3000 : block.assetType === 'AUDIO' ? 2000 : 1500;
      await new Promise((r) => setTimeout(r, delay));

      const success = Math.random() > 0.15;
      const now = new Date().toISOString();

      updateAction(actionId, {
        status: success ? 'RESOLVED' : 'FAILED',
        completedAt: now,
        durationSeconds: Math.round(delay / 1000),
        success,
        outputMessage: success
          ? `Correction ${block.assetType} terminée avec succès.`
          : `Échec de la correction ${block.assetType} — nouvelle tentative automatique planifiée.`,
      });

      if (success) {
        updateDiagnostic(diagnosticId, {
          blocks: diag.blocks.map((b) =>
            b.assetType === block.assetType ? { ...b, present: true, status: 'OK' as const, detail: `${block.assetType} reconstitué automatiquement` } : b
          ),
          criticalBlocks: Math.max(0, diag.criticalBlocks - 1),
          recoveryCase: diag.blocks.filter((b) => b.assetType !== block.assetType && !b.present).length === 0 ? 'CASE_0' : diag.recoveryCase,
        });
      } else {
        addErrorLog({
          logId: `LOG-${Date.now()}`,
          timestamp: now,
          level: 'ERROR',
          contentId: diag.contentId,
          contentTitle: diag.contentTitle,
          errorType: `${block.assetType}_RECOVERY_FAILED`,
          errorMessage: `Échec de la correction automatique pour ${block.assetType}`,
          correctiveAction: 'Retry automatique planifié',
          result: 'FAILED',
          resolvedAt: null,
          retryCount: 1,
        });
      }
    }
  }, [diagnostics, updateDiagnostic, updateAction, addErrorLog]);

  const executeAllRecoveries = useCallback(async () => {
    const blockedDiags = diagnostics.filter((d) => d.criticalBlocks > 0);
    for (const diag of blockedDiags) {
      await executeRecovery(diag.diagnosticId);
    }
  }, [diagnostics, executeRecovery]);

  const retryAction = useCallback(async (actionId: string) => {
    const action = recoveryActions.find((a) => a.actionId === actionId);
    if (!action || action.retryCount >= action.maxRetries) return;

    updateAction(actionId, {
      status: 'RETRYING',
      retryCount: action.retryCount + 1,
      outputMessage: `Nouvelle tentative ${action.retryCount + 1}/${action.maxRetries}...`,
    });

    await new Promise((r) => setTimeout(r, 2000));

    const success = Math.random() > 0.1;
    const now = new Date().toISOString();
    updateAction(actionId, {
      status: success ? 'RESOLVED' : 'FAILED',
      completedAt: now,
      success,
      outputMessage: success ? 'Correction réussie après retry.' : `Échec après ${action.retryCount + 1} tentatives.`,
    });
  }, [recoveryActions, updateAction]);

  const filterLogs = useCallback((level?: LogLevel, result?: string): RecoveryErrorLog[] => {
    let filtered = errorLogs;
    if (level) filtered = filtered.filter((l) => l.level === level);
    if (result) filtered = filtered.filter((l) => l.result === result);
    return filtered;
  }, [errorLogs]);

  const getGuideForContent = useCallback((contentId: string): RecoveryManualGuide | undefined => {
    return manualGuides.find((g) => g.contentId === contentId);
  }, [manualGuides]);

  const runFullScan = useCallback(async () => {
    setIsScanning(true);
    setScanProgress({ step: 'Initialisation du scan...', percent: 0 });

    const steps = [
      'Scan des scripts...',
      'Scan des fichiers audio...',
      'Scan des miniatures...',
      'Scan des vidéos...',
      'Scan des métadonnées...',
      'Vérification checksums...',
      'Analyse des blocages...',
      'Génération rapport...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanProgress({ step: steps[i], percent: Math.round(((i + 1) / steps.length) * 100) });
      await new Promise((r) => setTimeout(r, 600));
    }

    const now = new Date().toISOString();
    setLastScanTimestamp(now);
    setKpis((prev) => ({ ...prev, lastFullScan: now }));
    setScanProgress({ step: 'Scan terminé', percent: 100 });
    setIsScanning(false);
  }, []);

  const resolveAllBlocks = useCallback(async () => {
    await runFullScan();
    await executeAllRecoveries();
  }, [runFullScan, executeAllRecoveries]);

  const clearErrorLogs = useCallback(() => {
    setErrorLogs([]);
  }, []);

  // Init
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return {
    systemStatus: RECOVERY_SYSTEM_STATUS,
    caseLabels: RECOVERY_CASE_LABELS,
    diagnostics,
    selectedDiagnostic,
    selectDiagnostic,
    recoveryActions,
    executeRecovery,
    executeAllRecoveries,
    retryAction,
    errorLogs,
    filterLogs,
    kpis,
    manualGuides,
    getGuideForContent,
    runFullScan,
    isScanning,
    scanProgress,
    resolveAllBlocks,
    clearErrorLogs,
    loading,
    error,
    lastScanTimestamp,
  };
}

// ─── Helpers ───
function getActionName(assetType: AssetType): string {
  switch (assetType) {
    case 'SCRIPT': return 'Génération Script IA';
    case 'AUDIO': return 'Génération Voix TTS ElevenLabs';
    case 'THUMBNAIL': return 'Génération Miniature';
    case 'VIDEO': return 'Assemblage Vidéo FFmpeg';
    case 'METADATA': return 'Génération Métadonnées YouTube';
    case 'ALL': return 'Pipeline Complet';
  }
}

function getActionDescription(assetType: AssetType, title: string): string {
  switch (assetType) {
    case 'SCRIPT': return `Générer le script complet pour : ${title}`;
    case 'AUDIO': return `Relancer ElevenLabs TTS avec profil expert pour : ${title}`;
    case 'THUMBNAIL': return `Appliquer template KHEPRA et générer miniature 1280x720 PNG`;
    case 'VIDEO': return `Lancer FFmpeg — fusion Audio + Miniature → MP4 1080p`;
    case 'METADATA': return `Générer titre SEO, description, tags, hashtags, chapitres, CTA`;
    case 'ALL': return `Pipeline complet de production pour : ${title}`;
  }
}