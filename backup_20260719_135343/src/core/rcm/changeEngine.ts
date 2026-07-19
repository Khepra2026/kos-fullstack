// KOS REGTECH AI — RCM Engine (Regulatory Change Management)
// ISO 37301 — Scan auto des changements réglementaires
// Intégration OCR local + Compliance Catalog FTS5
// Auto-génération contrôles draft + notification RCCI < 24h
// Boucle feedback: détection → impact → contrôle → validation
// 100% local, Merkle log complet

import { db } from '@/shared/db/localDB';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { scanJOFile } from '@/features/horizon-scanning/localOCR';
import { searchExigence, complianceCatalog } from '@/core/compliance-engine/sqliteCatalog';
import { logger } from '@/core/logger';

const log = logger.child('rcm-engine');

// ─── Types ───

export interface RegChange {
  id: string;
  source: string;
  article: string;
  text: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  detectedAt: number;
  deadline: number;
}

export interface ImpactAssessment {
  exigenceId: string;
  affectedControls: string[];
  affectedEntities: string[];
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  newControlsDraft: string[];
  humanReviewRequired: boolean;
}

export interface RCMSummary {
  totalChanges: number;
  pendingReview: number;
  highSeverity: number;
  controlsGenerated: number;
  lastScan: number | null;
}

// ─── RCM Engine ───

export class RCMEngine {
  // ═══════════════════════════════════════════════
  // SCAN & MAP — Détection automatique
  // ═══════════════════════════════════════════════

  async scanAndMap(file?: File): Promise<{
    changes: RegChange[];
    impacts: ImpactAssessment[];
    merkleHash: string;
  }> {
    log.info('Scan RCM démarré');

    let newExigences: Array<{
      id: string;
      article: string;
      text: string;
      severity: 'HIGH' | 'MEDIUM' | 'LOW';
      regulator: string;
      keywords: string[];
    }> = [];

    if (file) {
      // OCR du document uploadé
      const scanResult = await scanJOFile(file);
      newExigences = scanResult.newObligations.map((o) => ({
        id: `KOS-SCAN-${Date.now()}-${o.article.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 30)}`,
        article: o.article,
        text: o.text,
        severity: o.severity,
        regulator: o.regulator,
        keywords: o.keywords,
      }));
    } else {
      // Scan horizon automatique (mock)
      newExigences = await this.autonomousScan();
    }

    const changes: RegChange[] = [];
    const impacts: ImpactAssessment[] = [];

    for (const ex of newExigences) {
      // 1. Création du changement détecté
      const change: RegChange = {
        id: crypto.randomUUID(),
        source: ex.regulator,
        article: ex.article,
        text: ex.text,
        severity: ex.severity,
        detectedAt: Date.now(),
        deadline: Date.now() + 86400000, // 24h pour agir
      };
      changes.push(change);

      // 2. Impact analysis ISO 37301 — rechercher les exigences affectées
      const affectedExigences = await searchExigence(ex.keywords.join(' '));
      const affectedControls = affectedExigences
        .filter((ae) => ae.control_id)
        .map((ae) => ae.control_id!);

      // 3. Auto-génération contrôle draft
      const draftControls: string[] = [];
      if (ex.severity === 'HIGH' || ex.severity === 'MEDIUM') {
        const controlId = `KOS-AUTO-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        await db.controls.put({
          id: controlId,
          status: 'NON_CONFORME',
          owner: 'RCCI',
          tags: ['AUTO_GENERATED', ex.regulator],
          regulation: ex.article,
          article: ex.article,
          description: `[DRAFT AI] ${ex.text.slice(0, 200)}`,
          lastChecked: new Date().toISOString(),
          rule: this.inferRule(ex),
        });

        draftControls.push(controlId);
      }

      // 4. Impact assessment
      const impact: ImpactAssessment = {
        exigenceId: ex.id,
        affectedControls: [...new Set(affectedControls)],
        affectedEntities: affectedExigences.map((ae) => ae.source),
        riskLevel: ex.severity === 'HIGH' ? 'CRITICAL' : ex.severity === 'MEDIUM' ? 'HIGH' : 'MEDIUM',
        newControlsDraft: draftControls,
        humanReviewRequired: true, // DORA Art.15 — toujours revue humaine
      };
      impacts.push(impact);
    }

    // 5. Log Merkle
    const merkleHash = await merkleLog.append({
      action: 'RCM_SCAN_COMPLETED',
      details: {
        changesDetected: changes.length,
        highSeverity: changes.filter((c) => c.severity === 'HIGH').length,
        controlsGenerated: impacts.reduce((sum, i) => sum + i.newControlsDraft.length, 0),
        affectedExigences: impacts.reduce((sum, i) => sum + i.affectedControls.length, 0),
      },
    });

    // 6. Notification RCCI si changements critiques
    const criticalChanges = changes.filter((c) => c.severity === 'HIGH');
    if (criticalChanges.length > 0) {
      await this.notifyRCCI(criticalChanges);
    }

    log.info('Scan RCM terminé', {
      changes: changes.length,
      highSeverity: criticalChanges.length,
      controlsGenerated: impacts.reduce((sum, i) => sum + i.newControlsDraft.length, 0),
    });

    return { changes, impacts, merkleHash };
  }

  // ═══════════════════════════════════════════════
  // SCAN AUTONOME (sans fichier uploadé)
  // ═══════════════════════════════════════════════

  private async autonomousScan(): Promise<Array<{
    id: string;
    article: string;
    text: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    regulator: string;
    keywords: string[];
  }>> {
    log.info('Scan autonome RCM');

    // Recherche des mises à jour récentes dans le catalogue
    const exigences = await complianceCatalog.getAll();

    // Simulation: détection de changements basée sur contenu existant
    const recentUpdates = [
      {
        id: `KOS-AUTO-${Date.now()}-BCEAO`,
        article: 'Instruction BCEAO 008-2026',
        text: 'Instruction relative aux conditions et modalités d\'exercice des émetteurs de monnaie électronique dans l\'UEMOA — mise à jour 2026',
        severity: 'HIGH' as const,
        regulator: 'BCEAO',
        keywords: ['monnaie', 'électronique', 'émetteurs', 'UEMOA'],
      },
      {
        id: `KOS-AUTO-${Date.now()}-COBAC`,
        article: 'Règlement COBAC R-2026/03',
        text: 'Règlement relatif au renforcement du dispositif LBC/FT des établissements de microfinance en zone CEMAC',
        severity: 'HIGH' as const,
        regulator: 'COBAC',
        keywords: ['LBC', 'FT', 'microfinance', 'CEMAC', 'renforcement'],
      },
      {
        id: `KOS-AUTO-${Date.now()}-GAFI`,
        article: 'Note Interprétative GAFI R.15 révisée',
        text: 'Note interprétative révisée de la Recommandation 15 sur les nouvelles technologies — inclusion des crypto-actifs et PSAN',
        severity: 'MEDIUM' as const,
        regulator: 'GAFI',
        keywords: ['crypto-actifs', 'PSAN', 'nouvelles technologies'],
      },
    ];

    // Filtrer: ne garder que les mises à jour non déjà couvertes
    const existingRefs = exigences.map((e) => e.article);
    return recentUpdates.filter(
      (update) => !existingRefs.some((ref) => ref.includes(update.article.split(' ').slice(0, 2).join(' ')))
    );
  }

  // ═══════════════════════════════════════════════
  // INFÉRENCE DE RÈGLE
  // ═══════════════════════════════════════════════

  private inferRule(ex: {
    severity: string;
    text: string;
    regulator: string;
  }): string {
    // Inférence basique de règle à partir du texte
    const lower = ex.text.toLowerCase();

    if (lower.includes('ratio') || lower.includes('solvabilit')) {
      return 'ratio_solvabilite >= 8';
    }
    if (lower.includes('liquidit') || lower.includes('lcr')) {
      return 'ratio_liquidite >= 100';
    }
    if (lower.includes('provision') || lower.includes('créance')) {
      return 'provisions_creances >= 80';
    }
    if (lower.includes('levier')) {
      return 'levier <= 20';
    }

    return `compliance_${ex.regulator.toLowerCase()}_check >= 1`;
  }

  // ═══════════════════════════════════════════════
  // NOTIFICATION RCCI (24h)
  // ═══════════════════════════════════════════════

  private async notifyRCCI(changes: RegChange[]): Promise<void> {
    // Notification via Merkle log + incident
    for (const change of changes) {
      // Créer un incident pour suivi
      await db.incidents.put({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        severity: 'HIGH',
        title: `RCM Alerte — ${change.source} ${change.article}`,
        description: change.text,
        regulation: change.article,
        status: 'OPEN',
      });

      await merkleLog.append({
        action: 'RCCI_NOTIFIED',
        details: {
          changeId: change.id,
          source: change.source,
          article: change.article,
          severity: change.severity,
          deadline: change.deadline,
          deadlineHuman: new Date(change.deadline).toISOString(),
        },
      });
    }

    log.warn('RCCI notifié', {
      changes: changes.length,
      deadline: '24h',
      regulators: [...new Set(changes.map((c) => c.source))],
    });
  }

  // ═══════════════════════════════════════════════
  // IMPACT ASSESSMENT DÉTAILLÉ
  // ═══════════════════════════════════════════════

  async assessImpact(keywords: string[]): Promise<ImpactAssessment> {
    const query = keywords.join(' ');
    const affectedExigences = await searchExigence(query);
    const affectedControls = affectedExigences
      .filter((ae) => ae.control_id)
      .map((ae) => ae.control_id!);

    const riskLevel = affectedExigences.length > 5
      ? 'CRITICAL'
      : affectedExigences.length > 2
        ? 'HIGH'
        : affectedExigences.length > 0
          ? 'MEDIUM'
          : 'LOW';

    return {
      exigenceId: `IMPACT-${Date.now()}`,
      affectedControls: [...new Set(affectedControls)],
      affectedEntities: [...new Set(affectedExigences.map((ae) => ae.source))],
      riskLevel,
      newControlsDraft: [],
      humanReviewRequired: riskLevel !== 'LOW',
    };
  }

  // ═══════════════════════════════════════════════
  // STATISTIQUES RCM
  // ═══════════════════════════════════════════════

  async getSummary(): Promise<RCMSummary> {
    // Récupération des contrôles auto-générés
    const autoControls = await db.controls
      .where('tags')
      .equals('AUTO_GENERATED')
      .count();

    // Récupération des incidents RCM
    const rcmIncidents = await db.incidents
      .filter((i) => i.title.includes('RCM Alerte'))
      .toArray();

    const pendingReview = autoControls;
    const highSeverity = rcmIncidents.filter((i) => i.severity === 'HIGH').length;

    // Dernier scan via audit log
    const bundle = await merkleLog.exportAuditBundle();
    const lastScanEntry = bundle.entries
      .filter((e) => e.action === 'RCM_SCAN_COMPLETED')
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    return {
      totalChanges: rcmIncidents.length,
      pendingReview,
      highSeverity,
      controlsGenerated: autoControls,
      lastScan: lastScanEntry?.timestamp || null,
    };
  }

  // ═══════════════════════════════════════════════
  // APPROBATION CONTRÔLE DRAFT PAR RCCI
  // ═══════════════════════════════════════════════

  async approveDraftControl(controlId: string, reviewerId: string): Promise<void> {
    const control = await db.controls.get(controlId);
    if (!control) {
      throw new Error(`Contrôle draft ${controlId} introuvable`);
    }

    await db.controls.update(controlId, {
      status: 'ECART_MINEUR',
      description: control.description.replace('[DRAFT AI] ', '[APPROVED RCCI] '),
      tags: control.tags.filter((t) => t !== 'AUTO_GENERATED'),
    });

    await merkleLog.append({
      action: 'RCM_DRAFT_APPROVED',
      resource: controlId,
      user: reviewerId,
      details: {
        previousStatus: 'DRAFT_AI_GENERATED',
        newStatus: 'ECART_MINEUR',
        approvedBy: reviewerId,
      },
    });

    log.info('Contrôle draft approuvé par RCCI', { controlId, reviewerId });
  }

  // ═══════════════════════════════════════════════
  // REJET CONTRÔLE DRAFT
  // ═══════════════════════════════════════════════

  async rejectDraftControl(controlId: string, reviewerId: string, reason: string): Promise<void> {
    const control = await db.controls.get(controlId);
    if (!control) {
      throw new Error(`Contrôle draft ${controlId} introuvable`);
    }

    await db.controls.delete(controlId);

    await merkleLog.append({
      action: 'RCM_DRAFT_REJECTED',
      resource: controlId,
      user: reviewerId,
      details: {
        reason,
        rejectedBy: reviewerId,
        originalArticle: control.article,
      },
    });

    log.info('Contrôle draft rejeté', { controlId, reviewerId, reason });
  }
}

// ─── Singleton ───

export const rcmEngine = new RCMEngine();



