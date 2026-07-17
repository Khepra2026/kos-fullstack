// KOS REGTECH AI — MRM Engine (Model Risk Management)
// SR 11-7 / SS1/23 / BCBS 230 — Model validation framework
// Champion-Challenger, PSI drift detection, SoD enforcement
// Tier 1/2/3 classification + validation indépendante
// 100% local, Merkle log pour audit trail complet

import { db, ModelInventoryRow, sha256 } from '@/shared/db/localDB';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { logger } from '@/core/logger';

const log = logger.child('mrm-engine');

// ─── Types ───

export interface ModelCard {
  modelId: string;
  tier: 1 | 2 | 3;
  version: string;
  owner: string;
  validator: string;
  lastValidation: number;
  performanceMetrics: { auc: number; ks: number; psi: number };
  driftStatus: 'GREEN' | 'AMBER' | 'RED';
  limitations: string[];
  dataset?: string;
}

export interface ValidationResult {
  modelId: string;
  passed: boolean;
  issues: string[];
  psi: number;
  challengerLift: number;
  challengerAuc: number;
  sodViolation: boolean;
  validatedAt: number;
  merkleHash: string;
}

export interface MRMStats {
  totalModels: number;
  tierDistribution: { 1: number; 2: number; 3: number };
  driftStatusDistribution: { GREEN: number; AMBER: number; RED: number };
  avgPsi: number;
  modelsNeedingValidation: number;
}

// ─── MRM Engine ───

export class MRMEngine {
  // ─── Validation complète d'un modèle ───

  async validateModel(modelId: string): Promise<ValidationResult> {
    const model = await db.modelInventory.get(modelId);
    if (!model) {
      throw new Error(`Modèle ${modelId} introuvable dans l'inventaire MRM`);
    }

    log.info('Validation MRM démarrée', { modelId, tier: model.tier });

    const issues: string[] = [];

    // 1. Séparation des fonctions (SoD) — SS1/23 §4.12
    const sodViolation = model.owner === model.validator;
    if (sodViolation) {
      issues.push('MRM_SOD_VIOLATION: Owner et Validator identiques — SS1/23 §4.12');
      log.warn('Violation SoD MRM détectée', { modelId, owner: model.owner });
    }

    // 2. Champion-Challenger — SR 11-7
    const challengerResult = await this.trainChallenger(model.modelId, model.dataset || '');
    const challengerLift = challengerResult.auc - model.performanceMetrics.auc;

    if (challengerLift > 0.05) {
      issues.push(`CHALLENGER_OUTPERFORMS: Lift AUC +${(challengerLift * 100).toFixed(1)}% — revue requise`);
    }

    // 3. PSI Drift — BCBS 230
    const psi = await this.calculatePSI(modelId);
    let newDriftStatus: ModelInventoryRow['driftStatus'] = 'GREEN';

    if (psi > 0.2) {
      newDriftStatus = 'RED';
      issues.push(`PSI_CRITICAL: PSI=${psi.toFixed(3)} > 0.20 — dérive critique`);
    } else if (psi > 0.1) {
      newDriftStatus = 'AMBER';
      issues.push(`PSI_WARNING: PSI=${psi.toFixed(3)} > 0.10 — dérive modérée`);
    }

    // 4. Vérification Tier 1 — fréquence validation trimestrielle
    if (model.tier === 1) {
      const daysSinceLastValidation = (Date.now() - model.lastValidation) / (1000 * 60 * 60 * 24);
      if (daysSinceLastValidation > 90) {
        issues.push(`TIER1_OVERDUE: ${Math.round(daysSinceLastValidation)}j depuis dernière validation (max 90j)`);
      }
    }

    // Mise à jour du modèle
    const updatedModel: ModelInventoryRow = {
      ...model,
      performanceMetrics: {
        ...model.performanceMetrics,
        psi,
      },
      driftStatus: newDriftStatus,
      lastValidation: Date.now(),
    };

    await db.modelInventory.put(updatedModel);

    // Log Merkle
    const validatedAt = Date.now();
    const merkleHash = await merkleLog.append({
      action: 'MODEL_VALIDATED',
      resource: modelId,
      details: {
        passed: issues.length === 0 || !sodViolation,
        issues,
        psi: Math.round(psi * 1000) / 1000,
        challengerLift: Math.round(challengerLift * 10000) / 10000,
        challengerAuc: Math.round(challengerResult.auc * 10000) / 10000,
        sodViolation,
        tier: model.tier,
        driftStatus: newDriftStatus,
      },
    });

    log.info('Validation MRM terminée', {
      modelId,
      passed: issues.length === 0 || !sodViolation,
      issues: issues.length,
      psi: psi.toFixed(3),
      drift: newDriftStatus,
    });

    return {
      modelId,
      passed: issues.filter((i) => i.includes('CRITICAL') || i.includes('SOD_VIOLATION')).length === 0,
      issues,
      psi: Math.round(psi * 1000) / 1000,
      challengerLift: Math.round(challengerLift * 10000) / 10000,
      challengerAuc: Math.round(challengerResult.auc * 10000) / 10000,
      sodViolation,
      validatedAt,
      merkleHash,
    };
  }

  // ─── Champion-Challenger (simulation SR 11-7) ───

  private async trainChallenger(
    modelId: string,
    _dataset: string,
  ): Promise<{ auc: number; ks: number }> {
    // Simulation: en production, entraînement réel d'un modèle challenger
    // sur un dataset out-of-time
    const baseModel = await db.modelInventory.get(modelId);

    // Bruit simulé — le challenger est généralement légèrement meilleur ou pire
    const baseAuc = baseModel?.performanceMetrics?.auc || 0.78;
    const noise = (Math.random() - 0.3) * 0.08; // -0.024 à +0.056
    const challengerAuc = Math.min(0.99, Math.max(0.5, baseAuc + noise));
    const challengerKs = Math.min(0.7, Math.max(0.2, (baseModel?.performanceMetrics?.ks || 0.35) + (Math.random() - 0.5) * 0.1));

    return { auc: challengerAuc, ks: challengerKs };
  }

  // ─── Calcul PSI (Population Stability Index) ───

  async calculatePSI(modelId: string): Promise<number> {
    // PSI = Σ (actual_i - expected_i) * ln(actual_i / expected_i)
    // Simulation basée sur historique + bruit
    const model = await db.modelInventory.get(modelId);
    const basePsi = model?.performanceMetrics?.psi || 0.05;

    // Drift aléatoire avec tendance
    const drift = (Math.random() - 0.4) * 0.05;
    const currentPsi = Math.max(0, basePsi + drift);

    return Math.round(currentPsi * 1000) / 1000;
  }

  // ─── Enregistrement d'un modèle dans l'inventaire ───

  async registerModel(card: ModelCard): Promise<ModelInventoryRow> {
    const row: ModelInventoryRow = {
      modelId: card.modelId,
      tier: card.tier,
      version: card.version,
      owner: card.owner,
      validator: card.validator,
      lastValidation: card.lastValidation || Date.now(),
      performanceMetrics: card.performanceMetrics,
      driftStatus: card.driftStatus || 'GREEN',
      limitations: card.limitations || [],
      dataset: card.dataset,
    };

    await db.modelInventory.put(row);

    await merkleLog.append({
      action: 'MODEL_REGISTERED',
      resource: card.modelId,
      details: {
        tier: card.tier,
        version: card.version,
        owner: card.owner,
        validator: card.validator,
        auc: card.performanceMetrics.auc,
        ks: card.performanceMetrics.ks,
      },
    });

    log.info('Modèle enregistré MRM', {
      modelId: card.modelId,
      tier: card.tier,
      version: card.version,
    });

    return row;
  }

  // ─── Escalade MRM ───

  async escalate(reason: string, modelId?: string, details?: Record<string, unknown>): Promise<string> {
    const hash = await merkleLog.append({
      action: 'MRM_ESCALATION',
      resource: modelId || 'MRM_SYSTEM',
      details: {
        reason,
        ...(details || {}),
        escalatedAt: Date.now(),
      },
    });

    log.warn('Escalade MRM', { reason, modelId });

    return hash;
  }

  // ─── Statistiques MRM ───

  async getStats(): Promise<MRMStats> {
    const models = await db.modelInventory.toArray();

    const tierDistribution = { 1: 0, 2: 0, 3: 0 };
    const driftStatusDistribution = { GREEN: 0, AMBER: 0, RED: 0 };
    let totalPsi = 0;
    let modelsNeedingValidation = 0;

    for (const m of models) {
      tierDistribution[m.tier]++;
      driftStatusDistribution[m.driftStatus]++;
      totalPsi += m.performanceMetrics.psi;

      const daysSinceValidation = (Date.now() - m.lastValidation) / (1000 * 60 * 60 * 24);
      const maxDays = m.tier === 1 ? 90 : m.tier === 2 ? 180 : 365;
      if (daysSinceValidation > maxDays) {
        modelsNeedingValidation++;
      }
    }

    return {
      totalModels: models.length,
      tierDistribution,
      driftStatusDistribution,
      avgPsi: models.length > 0 ? Math.round((totalPsi / models.length) * 1000) / 1000 : 0,
      modelsNeedingValidation,
    };
  }

  // ─── Récupérer tous les modèles ───

  async getAllModels(): Promise<ModelInventoryRow[]> {
    return db.modelInventory.toArray();
  }

  // ─── Récupérer un modèle ───

  async getModel(modelId: string): Promise<ModelInventoryRow | undefined> {
    return db.modelInventory.get(modelId);
  }

  // ─── Générer Model Card (documentation EU AI Act) ───

  async generateModelCard(modelId: string): Promise<{
    model: ModelInventoryRow;
    validationHistory: { ts: number; psi: number; driftStatus: string }[];
    merkleProof: string[] | null;
    generatedAt: number;
  }> {
    const model = await db.modelInventory.get(modelId);
    if (!model) {
      throw new Error(`Modèle ${modelId} introuvable`);
    }

    // Validation history via logs Merkle
    const bundle = await merkleLog.exportAuditBundle();
    const validationHistory = bundle.entries
      .filter((e) => e.action === 'MODEL_VALIDATED' && e.resource === modelId)
      .map((e) => ({
        ts: e.timestamp,
        psi: (e.details as Record<string, unknown>)?.psi as number || 0,
        driftStatus: (e.details as Record<string, unknown>)?.driftStatus as string || 'GREEN',
      }));

    const merkleProof = merkleLog.getProof(model.modelId);

    return {
      model,
      validationHistory,
      merkleProof,
      generatedAt: Date.now(),
    };
  }
}

// ─── Singleton ───

export const mrmEngine = new MRMEngine();