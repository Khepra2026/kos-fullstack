// KOS REGTECH AI — CCM Engine (Continuous Controls Monitoring)
// Anomaly Detection par Z-score sur durée d'exécution + échecs
// BCBS 239: Data lineage complet pour chaque contrôle
// Intégration Merkle Log pour traçabilité des alertes

import { db, ControlRun } from '@/shared/db/localDB';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { logger } from '@/core/logger';
import { sha256 } from '@/shared/db/localDB';

const log = logger.child('ccm-engine');

// ─── Types ───

interface ControlResult {
  controlId: string;
  result: 'PASS' | 'FAIL';
  duration: number;
  evidenceHash: string;
  dataLineage: string[];
  outputs?: Record<string, unknown>;
}

interface CCMSummary {
  totalRuns: number;
  passRate: number;
  anomalies: number;
  failures: number;
  avgDuration: number;
  lastRun: number | null;
}

// ─── CCM Engine ───

export class CCMEngine {
  // ─── Exécution d'un contrôle avec anomaly detection ───

  async runControl(controlId: string): Promise<ControlResult> {
    const start = performance.now();

    // Récupération du contrôle
    const control = await db.controls.get(controlId);
    if (!control) {
      throw new Error(`Contrôle ${controlId} introuvable`);
    }

    log.info('Exécution contrôle CCM', { controlId, article: control.article });

    // Exécution de la règle
    const ruleResult = await this.executeRule(control.rule || '');
    const duration = performance.now() - start;

    // Récupération historique pour Z-score
    const history = await db.controlRuns
      .where({ controlId })
      .reverse()
      .limit(100)
      .toArray();

    // Calcul Z-score sur durée
    const durations = history.map((r: ControlRun) => r.duration);
    const zscore = this.calculateZScore(duration, durations);

    // Détermination résultat
    const result: ControlResult = {
      controlId,
      result: ruleResult.pass ? 'PASS' : 'FAIL',
      duration: Math.round(duration),
      evidenceHash: await this.generateEvidenceHash(controlId, ruleResult),
      dataLineage: control.dataSources || ['NO_LINEAGE'],
      outputs: ruleResult.outputs,
    };

    // Stockage BCBS 239
    await db.controlRuns.add({
      controlId,
      result: result.result,
      duration: result.duration,
      ts: Date.now(),
      dataLineage: result.dataLineage,
      evidenceHash: result.evidenceHash,
      zscore,
    });

    // Alerte si anomalie ou échec
    if (zscore > 3 || result.result === 'FAIL') {
      const severity = zscore > 3 ? 'ANOMALY' : 'FAILURE';
      await merkleLog.append({
        action: 'CCM_ALERT',
        resource: controlId,
        details: {
          severity,
          zscore: Math.round(zscore * 100) / 100,
          duration: result.duration,
          result: result.result,
          controlArticle: control.article,
          regulation: control.regulation,
        },
      });

      log.warn('Alerte CCM déclenchée', {
        controlId,
        severity,
        zscore: zscore.toFixed(2),
        result: result.result,
      });
    }

    log.info('Contrôle CCM terminé', {
      controlId,
      result: result.result,
      duration: `${result.duration}ms`,
      zscore: zscore.toFixed(2),
    });

    return result;
  }

  // ─── Exécution de règle (moteur embarqué) ───

  private async executeRule(rule: string): Promise<{ pass: boolean; outputs: Record<string, unknown> }> {
    // Moteur de règle simplifié: parsing d'expressions
    // En production: OPA WASM ou DSL dédié
    if (!rule || rule.trim() === '') {
      return { pass: Math.random() > 0.05, outputs: { reason: 'DEFAULT_RULE' } };
    }

    try {
      // Format attendu: "field operator value"
      // Ex: "ratio_solvabilite >= 8"
      const parts = rule.trim().split(/\s+/);
      if (parts.length >= 3) {
        const [field, operator, threshold] = parts;
        // Simulation — en prod: évaluation réelle depuis les données
        const mockValue = this.getMockFieldValue(field || '');
        const numThreshold = parseFloat(threshold || '0');

        let pass = false;
        switch (operator) {
          case '>=':
            pass = mockValue >= numThreshold;
            break;
          case '<=':
            pass = mockValue <= numThreshold;
            break;
          case '>':
            pass = mockValue > numThreshold;
            break;
          case '<':
            pass = mockValue < numThreshold;
            break;
          case '==':
            pass = mockValue === numThreshold;
            break;
          default:
            pass = Math.random() > 0.1;
        }

        return {
          pass,
          outputs: { field, operator, threshold: numThreshold, value: mockValue },
        };
      }
    } catch {
      log.warn('Rule parsing failed, using fallback', { rule });
    }

    return { pass: Math.random() > 0.1, outputs: { reason: 'FALLBACK' } };
  }

  private getMockFieldValue(field: string): number {
    const mocks: Record<string, number> = {
      ratio_solvabilite: 10.2 + (Math.random() - 0.5) * 4,
      ratio_liquidite: 115 + (Math.random() - 0.5) * 20,
      ratio_fonds_propres: 12.5 + (Math.random() - 0.5) * 3,
      provisions_creances: 85 + (Math.random() - 0.5) * 15,
      lcr: 135 + (Math.random() - 0.5) * 25,
      nsrf: 110 + (Math.random() - 0.5) * 15,
      levier: 5.2 + (Math.random() - 0.5) * 1.5,
    };
    return mocks[field] || 50 + Math.random() * 50;
  }

  // ─── Calcul Z-score ───

  private calculateZScore(value: number, history: number[]): number {
    if (history.length < 5) return 0;

    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    const variance = history.reduce((a, b) => a + (b - avg) ** 2, 0) / history.length;
    const std = Math.sqrt(variance);

    if (std === 0) return 0;
    return (value - avg) / std;
  }

  // ─── Génération hash de preuve ───

  private async generateEvidenceHash(
    controlId: string,
    ruleResult: { pass: boolean; outputs: Record<string, unknown> },
  ): Promise<string> {
    const payload = JSON.stringify({
      controlId,
      pass: ruleResult.pass,
      outputs: ruleResult.outputs,
      ts: Date.now(),
      engine: 'KOS_CCM_v1',
    });
    return sha256(payload);
  }

  // ─── Exécution batch de tous les contrôles ───

  async runAllControls(): Promise<{
    total: number;
    passed: number;
    failed: number;
    anomalies: number;
    results: ControlResult[];
    merkleRoot: string;
  }> {
    log.info('Démarrage batch CCM');

    const controls = await db.controls.toArray();
    const results: ControlResult[] = [];

    for (const control of controls) {
      try {
        const result = await this.runControl(control.id);
        results.push(result);
      } catch (err) {
        log.error('Échec contrôle batch', { controlId: control.id, error: String(err) });
      }
    }

    const passed = results.filter((r) => r.result === 'PASS').length;
    const failed = results.filter((r) => r.result === 'FAIL').length;

    // Récupération anomalies via historique
    const recentRuns = await db.controlRuns
      .orderBy('ts')
      .reverse()
      .limit(results.length)
      .toArray();
    const anomalies = recentRuns.filter((r: ControlRun) => (r.zscore || 0) > 3).length;

    const merkleRoot = await merkleLog.append({
      action: 'CCM_BATCH_COMPLETE',
      details: {
        total: results.length,
        passed,
        failed,
        anomalies,
        timestamp: Date.now(),
      },
    });

    log.info('Batch CCM terminé', { total: results.length, passed, failed, anomalies });

    return { total: results.length, passed, failed, anomalies, results, merkleRoot };
  }

  // ─── Dashboard CCM ───

  async getSummary(): Promise<CCMSummary> {
    const allRuns = await db.controlRuns.orderBy('ts').reverse().toArray();
    const passed = allRuns.filter((r: ControlRun) => r.result === 'PASS').length;
    const failures = allRuns.filter((r: ControlRun) => r.result === 'FAIL').length;
    const anomalies = allRuns.filter((r: ControlRun) => (r.zscore || 0) > 3).length;
    const durations = allRuns.map((r: ControlRun) => r.duration);
    const avgDuration = durations.length > 0
      ? durations.reduce((a: number, b: number) => a + b, 0) / durations.length
      : 0;

    return {
      totalRuns: allRuns.length,
      passRate: allRuns.length > 0 ? Math.round((passed / allRuns.length) * 10000) / 100 : 100,
      anomalies,
      failures,
      avgDuration: Math.round(avgDuration),
      lastRun: allRuns.length > 0 ? allRuns[0]!.ts : null,
    };
  }

  // ─── Export BCBS 239 ───

  async exportBCBS239(controlId: string): Promise<{
    control: ControlRun | undefined;
    lineage: string[];
    history: ControlRun[];
    merkleProof: string[] | null;
  }> {
    const control = await db.controlRuns.where({ controlId }).last();
    const history = await db.controlRuns.where({ controlId }).toArray();
    const merkleProof = control?.evidenceHash
      ? merkleLog.getProof(control.evidenceHash)
      : null;

    return {
      control,
      lineage: control?.dataLineage || [],
      history,
      merkleProof,
    };
  }
}

// ─── Singleton ───

export const ccmEngine = new CCMEngine();