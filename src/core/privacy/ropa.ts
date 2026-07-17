// KOS REGTECH AI — ROPA Manager (Register of Processing Activities)
// Registre des traitements + DPIA automatisé
// Conforme RGPD Art.30 / Loi UEMOA protection données / EU AI Act Art.14
// Export XML standard, hash + Merkle log pour audit
// 100% local, 0 réseau, 0 API externe

import { db, ProcessingRecordRow, sha256 } from '@/shared/db/localDB';
import { merkleLog } from '@/core/audit-trail/merkleLog';
import { logger } from '@/core/logger';

const log = logger.child('ropa-manager');

// ─── Types ───

export interface ProcessingRecord {
  id: string;
  purpose: string;
  legalBasis: 'CONSENT' | 'CONTRACT' | 'LEGAL_OBLIGATION' | 'LEGITIMATE_INTEREST';
  dataCategories: string[];
  recipients: string[];
  retention: string;
  transfers: { country: string; safeguard: 'SCC' | 'BCR' }[];
  dpiaRequired: boolean;
}

export interface DPIAResult {
  recordId: string;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  risks: string[];
  mitigations: string[];
  humanReviewRequired: boolean;
  hash: string;
  generatedAt: number;
}

export interface ROPAStats {
  totalRecords: number;
  dpiaRequired: number;
  dpiaCompleted: number;
  highRisk: number;
  transfers: number;
  legalBasisDistribution: Record<string, number>;
}

// ─── Catégories de données sensibles ───

const SENSITIVE_CATEGORIES = ['BIOMETRIC', 'HEALTH', 'POLITICAL', 'RELIGIOUS', 'GENETIC', 'CRIMINAL'];
const HIGH_RISK_CATEGORIES = ['PPE', 'FINANCIAL', 'BIOMETRIC', 'HEALTH'];

// ─── ROPA Manager ───

export class ROPAManager {
  // ─── Génération DPIA ───

  async generateDPIA(record: ProcessingRecord): Promise<DPIAResult> {
    const risks: string[] = [];

    // Détection risques automatique
    if (record.dataCategories.some((c) => HIGH_RISK_CATEGORIES.includes(c))) {
      risks.push('HIGH_RISK_DATA_CATEGORY');
    }
    if (record.dataCategories.includes('BIOMETRIC')) {
      risks.push('HIGH_RISK_ART35'); // RGPD Art.35: DPIA obligatoire
    }
    if (record.transfers.some((t) => t.country !== 'FR' && t.country !== 'BE' && t.country !== 'LU')) {
      risks.push('TRANSFER_RISK'); // Transfert hors UE
    }
    if (record.recipients.length > 5) {
      risks.push('DATA_DISSEMINATION_RISK');
    }
    if (record.dataCategories.length > 3) {
      risks.push('DATA_MINIMIZATION_CONCERN');
    }

    const riskScore = risks.length * 22; // Score sur ~110
    const riskLevel = riskScore >= 80
      ? 'CRITICAL'
      : riskScore >= 50
        ? 'HIGH'
        : riskScore >= 25
          ? 'MEDIUM'
          : 'LOW';

    const mitigations = this.getMitigations(risks);

    const dpiaPayload = {
      recordId: record.id,
      riskScore,
      risks,
      mitigations,
      generatedAt: Date.now(),
    };

    const dpiaHash = await sha256(JSON.stringify(dpiaPayload));

    const dpia: DPIAResult = {
      recordId: record.id,
      riskScore,
      riskLevel,
      risks,
      mitigations,
      humanReviewRequired: risks.length > 0,
      hash: dpiaHash,
      generatedAt: Date.now(),
    };

    // Persist DPIA hash dans le processing record
    await db.processingRecords.update(record.id, {
      dpiaHash,
      riskScore,
    } as Partial<ProcessingRecordRow>);

    // Log Merkle pour audit
    await merkleLog.append({
      action: 'DPIA_GENERATED',
      resource: record.id,
      details: {
        riskScore,
        riskLevel,
        risks,
        humanReviewRequired: dpia.humanReviewRequired,
        hash: dpiaHash,
      },
    });

    log.info('DPIA générée', {
      recordId: record.id,
      riskLevel,
      risks: risks.length,
    });

    return dpia;
  }

  // ─── Création d'un record ROPA ───

  async createRecord(record: ProcessingRecord): Promise<ProcessingRecordRow> {
    const row: ProcessingRecordRow = {
      ...record,
      createdAt: Date.now(),
    };

    await db.processingRecords.put(row);

    // Vérifier si DPIA requise
    const needsDPIA = record.dpiaRequired
      || record.dataCategories.some((c) => SENSITIVE_CATEGORIES.includes(c))
      || record.transfers.length > 0;

    if (needsDPIA) {
      await this.generateDPIA(record);
    }

    await merkleLog.append({
      action: 'ROPA_RECORD_CREATED',
      resource: record.id,
      details: { purpose: record.purpose, legalBasis: record.legalBasis },
    });

    log.info('Record ROPA créé', { id: record.id, purpose: record.purpose });

    return row;
  }

  // ─── Mise à jour d'un record ───

  async updateRecord(id: string, updates: Partial<ProcessingRecord>): Promise<ProcessingRecordRow | undefined> {
    const existing = await db.processingRecords.get(id);
    if (!existing) {
      throw new Error(`Record ROPA ${id} introuvable`);
    }

    const updated = { ...existing, ...updates };
    await db.processingRecords.put(updated);

    // Re-générer DPIA si changements significatifs
    const needsRedPIA = updates.dataCategories
      || updates.transfers
      || updates.recipients;

    if (needsRedPIA) {
      await this.generateDPIA({
        id: updated.id,
        purpose: updated.purpose,
        legalBasis: updated.legalBasis,
        dataCategories: updated.dataCategories,
        recipients: updated.recipients,
        retention: updated.retention,
        transfers: updated.transfers,
        dpiaRequired: updated.dpiaRequired,
      });
    }

    await merkleLog.append({
      action: 'ROPA_RECORD_UPDATED',
      resource: id,
      details: { updatedFields: Object.keys(updates) },
    });

    return updated;
  }

  // ─── Suppression d'un record ───

  async deleteRecord(id: string): Promise<void> {
    await db.processingRecords.delete(id);

    await merkleLog.append({
      action: 'ROPA_RECORD_DELETED',
      resource: id,
      details: { deletedAt: Date.now() },
    });
  }

  // ─── Export ROPA XML ───

  async exportROPA(): Promise<Blob> {
    const records = await db.processingRecords.toArray();

    const xmlContent = records.map((r) => {
      const transfersXml = r.transfers.map((t) =>
        `<transfer><country>${this.escapeXml(t.country)}</country><safeguard>${t.safeguard}</safeguard></transfer>`
      ).join('');

      const categoriesXml = r.dataCategories.map((c) =>
        `<category>${this.escapeXml(c)}</category>`
      ).join('');

      const recipientsXml = r.recipients.map((rec) =>
        `<recipient>${this.escapeXml(rec)}</recipient>`
      ).join('');

      return `<record id="${this.escapeXml(r.id)}">
  <purpose>${this.escapeXml(r.purpose)}</purpose>
  <legalBasis>${r.legalBasis}</legalBasis>
  <dataCategories>${categoriesXml}</dataCategories>
  <recipients>${recipientsXml}</recipients>
  <retention>${this.escapeXml(r.retention)}</retention>
  <transfers>${transfersXml}</transfers>
  <dpiaRequired>${r.dpiaRequired}</dpiaRequired>
  ${r.riskScore !== undefined ? `<riskScore>${r.riskScore}</riskScore>` : ''}
</record>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<ropa xmlns="urn:kos:regtech:ropa:v1"
      generatedAt="${new Date().toISOString()}"
      totalRecords="${records.length}">
  <metadata>
    <controller>KHEPRA SAS</controller>
    <dpo>DPO@kosregtech.ai</dpo>
    <jurisdiction>UEMOA</jurisdiction>
  </metadata>
  <records>
${xmlContent}
  </records>
</ropa>`;

    log.info('ROPA exporté en XML', { records: records.length });

    await merkleLog.append({
      action: 'ROPA_EXPORTED',
      details: { format: 'XML', totalRecords: records.length },
    });

    return new Blob([xml], { type: 'application/xml' });
  }

  // ─── Export JSON ───

  async exportROPAJSON(): Promise<Blob> {
    const records = await db.processingRecords.toArray();
    const json = JSON.stringify(
      { generatedAt: new Date().toISOString(), totalRecords: records.length, records },
      null,
      2,
    );
    return new Blob([json], { type: 'application/json' });
  }

  // ─── Stats ───

  async getStats(): Promise<ROPAStats> {
    const records = await db.processingRecords.toArray();

    const legalBasisDistribution: Record<string, number> = {};
    let dpiaRequired = 0;
    let dpiaCompleted = 0;
    let highRisk = 0;
    let transfers = 0;

    for (const r of records) {
      legalBasisDistribution[r.legalBasis] = (legalBasisDistribution[r.legalBasis] || 0) + 1;
      if (r.dpiaRequired) dpiaRequired++;
      if (r.dpiaHash) dpiaCompleted++;
      if ((r.riskScore || 0) >= 50) highRisk++;
      if (r.transfers.length > 0) transfers++;
    }

    return {
      totalRecords: records.length,
      dpiaRequired,
      dpiaCompleted,
      highRisk,
      transfers,
      legalBasisDistribution,
    };
  }

  // ─── Récupérer tous les records ───

  async getAllRecords(): Promise<ProcessingRecordRow[]> {
    return db.processingRecords.toArray();
  }

  // ─── Récupérer un record ───

  async getRecord(id: string): Promise<ProcessingRecordRow | undefined> {
    return db.processingRecords.get(id);
  }

  // ─── Mitigations automatiques ───

  private getMitigations(risks: string[]): string[] {
    const mitigations: string[] = [];

    if (risks.includes('HIGH_RISK_DATA_CATEGORY') || risks.includes('HIGH_RISK_ART35')) {
      mitigations.push('PSEUDONYMIZATION', 'AES-256_ENCRYPTION', 'ACCESS_LOGS');
    }
    if (risks.includes('TRANSFER_RISK')) {
      mitigations.push('SCC_IMPLEMENTATION', 'TIA_ASSESSMENT');
    }
    if (risks.includes('DATA_DISSEMINATION_RISK')) {
      mitigations.push('ROLE_BASED_ACCESS', 'DATA_MINIMIZATION_REVIEW');
    }
    if (risks.includes('DATA_MINIMIZATION_CONCERN')) {
      mitigations.push('PURPOSE_LIMITATION_REVIEW', 'RETENTION_SCHEDULE');
    }

    // Baseline mitigations
    mitigations.push('ANNUAL_DPIA_REVIEW', 'BREACH_NOTIFICATION_PROCEDURE');

    return [...new Set(mitigations)];
  }

  // ─── Utilitaire XML ───

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

// ─── Singleton ───

export const ropaManager = new ROPAManager();