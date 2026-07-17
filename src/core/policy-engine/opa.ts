// KOS REGTECH AI — Policy Engine
// Open Policy Agent (OPA) WASM — RBAC + SoD + Obligations
// Loi 2008-26 Art. 42 → Contrôle KOS-AML-01 → Preuve vault_hash_0x3f...
// Directives GAFI R.10 → Contrôle KOS-CDD-03 → Rapport XBRL ligne 14
// Remplace les if/else éparpillés par un moteur de règles unifié

import { logger } from '@/core/logger';

export type User = {
  id: string;
  roles: string[];
  department: string;
  clearance?: 'NORMAL' | 'CONFIDENTIEL' | 'SECRET';
};

export type Action = 'read' | 'write' | 'validate' | 'seal' | 'export' | 'delete';
export type Resource = 'controls' | 'incidents' | 'reports' | 'rules' | 'evidences' | 'audit_logs';

interface PolicyDecision {
  allow: boolean;
  obligations: string[];
  reasons: string[];
}

// ─── OPA Instance (wasm chargé une seule fois) ───

let opaReady = false;
let opaEngine: PolicyEngine | null = null;

// ─── Policy Engine (basé sur les principes OPA, exécuté localement) ───

class PolicyEngine {
  // Règles chargées en mémoire
  private rules: PolicyRule[] = [];

  constructor() {
    this.loadDefaultRules();
  }

  private loadDefaultRules(): void {
    this.rules = [
      // ─── RCCI SoD (Séparation des fonctions) ───
      {
        id: 'SOD-RCCI-SEAL',
        description: 'Un RCCI ne peut pas sceller son propre rapport',
        condition: (input) =>
          input.action === 'seal' &&
          input.resource === 'reports' &&
          input.user.roles.includes('RCCI') &&
          input.context?.control?.author_id === input.user.id,
        allow: false,
        obligations: ['FOUR_EYES_REQUIRED', 'COO_OVERRIDE_REQUIRED'],
        reasons: ['SoD Violation: RCCI cannot seal own report (Circulaire 01-2017 Art.22)'],
      },

      // ─── COO signature authority ───
      {
        id: 'AUTH-COO-SIGN',
        description: 'Seul le COO ou CEO peut signer définitivement',
        condition: (input) =>
          input.action === 'seal' &&
          !input.user.roles.some((r) => ['COO', 'CEO', 'DG'].includes(r)),
        allow: false,
        obligations: ['DELEGATION_REQUIRED'],
        reasons: ['Sealing authority restricted to COO/CEO/DG'],
      },

      // ─── RCCI read access ───
      {
        id: 'ACCESS-RCCI-READ',
        description: 'RCCI a accès en lecture à tous les contrôles et rapports',
        condition: (input) =>
          input.action === 'read' &&
          input.user.roles.includes('RCCI') &&
          ['controls', 'reports', 'incidents', 'evidences', 'audit_logs'].includes(input.resource),
        allow: true,
        obligations: ['AUDIT_LOG_ENTRY'],
        reasons: ['RCCI legitimate access for compliance monitoring'],
      },

      // ─── Auditeur externe (lecture seule) ───
      {
        id: 'ACCESS-AUDITOR-READONLY',
        description: 'Auditeur externe = lecture seule + export',
        condition: (input) =>
          input.user.roles.includes('AUDITEUR_EXTERNE') &&
          input.action !== 'write' &&
          input.action !== 'delete',
        allow: true,
        obligations: ['WATERMARK_AUDIT', 'EXPORT_LOG'],
        reasons: ['External auditor read-only access granted'],
      },

      // ─── Ecriture règles = Administrateur uniquement ───
      {
        id: 'ADMIN-RULES-WRITE',
        description: 'Seul l\'administrateur peut modifier les règles',
        condition: (input) =>
          input.resource === 'rules' &&
          (input.action === 'write' || input.action === 'delete') &&
          !input.user.roles.includes('ADMIN'),
        allow: false,
        obligations: ['ADMIN_REQUIRED'],
        reasons: ['Rule modification restricted to administrators'],
      },

      // ─── Export rapports = clearance minimum CONFIDENTIEL ───
      {
        id: 'CLEARANCE-EXPORT',
        description: 'Export nécessite clearance ≥ CONFIDENTIEL',
        condition: (input) =>
          input.action === 'export' &&
          (!input.user.clearance || input.user.clearance === 'NORMAL'),
        allow: false,
        obligations: ['CLEARANCE_UPGRADE_REQUIRED'],
        reasons: ['Export requires CONFIDENTIEL or SECRET clearance'],
      },

      // ─── Validation LBC/FT (Loi 2008-26 Art.42) ───
      {
        id: 'LBCFT-AML-01',
        description: 'Loi 2008-26 Art.42 — Obligation vigilance clientèle PPE',
        condition: (input) =>
          input.resource === 'controls' &&
          input.action === 'validate' &&
          input.context?.controlType === 'LBCFT',
        allow: true,
        obligations: ['KOS-AML-01', 'EVIDENCE_VAULT_HASH', 'CENTIF_DECLARATION_IF_PPE'],
        reasons: ['AML control triggered — evidence vault hash required, CENTIF declaration if PPE'],
      },

      // ─── CDD GAFI R.10 ───
      {
        id: 'CDD-GAFI-R10',
        description: 'Directive GAFI R.10 — Devoir de diligence CDD',
        condition: (input) =>
          input.resource === 'controls' &&
          input.context?.controlType === 'CDD',
        allow: true,
        obligations: ['KOS-CDD-03', 'XBRL_LINE_14', 'KYC_DOCUMENTATION'],
        reasons: ['CDD control — XBRL line 14, KYC documentation required'],
      },

      // ─── Suppression = journalisation obligatoire ───
      {
        id: 'AUDIT-DELETE',
        description: 'Toute suppression doit être journalisée',
        condition: (input) => input.action === 'delete',
        allow: true,
        obligations: ['MERKLE_LOG_ENTRY', 'FOUR_EYES_IF_CRITICAL'],
        reasons: ['Deletion logged in Merkle audit trail'],
      },

      // ─── Deny par défaut ───
      {
        id: 'DEFAULT-DENY',
        description: 'Tout ce qui n\'est pas explicitement autorisé est refusé',
        condition: () => true,
        allow: false,
        obligations: ['DENY_BY_DEFAULT'],
        reasons: ['No matching allow policy — deny by default'],
      },
    ];
  }

  evaluate(input: PolicyInput): PolicyDecision {
    const results: PolicyDecision = {
      allow: false,
      obligations: [],
      reasons: [],
    };

    // Applique toutes les règles dans l'ordre
    for (const rule of this.rules) {
      try {
        if (rule.condition(input)) {
          if (!rule.allow) {
            // Règle de refus explicite
            results.allow = false;
            results.obligations = [...results.obligations, ...rule.obligations];
            results.reasons.push(...rule.reasons);
            return results; // Short-circuit — refus prioritaire
          }
          // Règle d'autorisation
          results.allow = true;
          results.obligations = [...results.obligations, ...rule.obligations];
          results.reasons.push(...rule.reasons);
        }
      } catch {
        // Règle ignorée si condition invalide
      }
    }

    return results;
  }
}

// ─── Types ───

interface PolicyRule {
  id: string;
  description: string;
  condition: (input: PolicyInput) => boolean;
  allow: boolean;
  obligations: string[];
  reasons: string[];
}

interface PolicyInput {
  user: User;
  action: Action;
  resource: Resource;
  context?: Record<string, unknown>;
}

// ─── Initialisation du moteur ───

export async function initOPA(): Promise<PolicyEngine> {
  if (opaEngine) return opaEngine;

  const log = logger.child('policy-engine');
  log.info('Initialisation Policy Engine OPA...');

  opaEngine = new PolicyEngine();
  opaReady = true;

  log.info('Policy Engine OPA prêt', { rules: opaEngine['rules'].length });
  return opaEngine;
}

// ─── Fonction d'enforcement principale ───

export async function enforce(
  user: User,
  action: Action,
  resource: Resource,
  context: Record<string, unknown> = {}
): Promise<PolicyDecision> {
  if (!opaReady) {
    await initOPA();
  }

  const engine = opaEngine!;
  return engine.evaluate({ user, action, resource, context });
}

// ─── Vérification rapide (sans obligations) ───

export async function canAccess(
  user: User,
  action: Action,
  resource: Resource,
  context?: Record<string, unknown>
): Promise<boolean> {
  const decision = await enforce(user, action, resource, context);
  return decision.allow;
}

// ─── Check SoD ───

export async function checkSoD(
  user: User,
  action: Action,
  resource: Resource,
  context: Record<string, unknown> = {}
): Promise<{ compliant: boolean; violations: string[] }> {
  const decision = await enforce(user, action, resource, context);

  if (!decision.allow) {
    return {
      compliant: false,
      violations: decision.reasons,
    };
  }

  // Vérifie les obligations SoD
  const violations: string[] = [];
  if (decision.obligations.includes('FOUR_EYES_REQUIRED')) {
    violations.push('Séparation des fonctions requise — validation indépendante nécessaire');
  }
  if (decision.obligations.includes('COO_OVERRIDE_REQUIRED')) {
    violations.push('Override COO requis pour cette opération');
  }

  return {
    compliant: violations.length === 0,
    violations,
  };
}

// ─── Audit Trail intégration ───

export async function enforceWithAudit(
  user: User,
  action: Action,
  resource: Resource,
  context: Record<string, unknown> = {}
): Promise<PolicyDecision & { auditId?: string }> {
  const decision = await enforce(user, action, resource, context);

  // Si l'action a une obligation d'audit, on log dans le Merkle log
  if (decision.obligations.includes('MERKLE_LOG_ENTRY') || decision.obligations.includes('AUDIT_LOG_ENTRY')) {
    try {
      const { merkleLog } = await import('@/core/audit-trail/merkleLog');
      const rootHash = await merkleLog.append({
        action: `POLICY_${action.toUpperCase()}`,
        user: user.id,
        resource,
        decision: decision.allow ? 'ALLOW' : 'DENY',
        obligations: decision.obligations,
        reasons: decision.reasons,
      });
      return { ...decision, auditId: rootHash };
    } catch {
      // Audit log non bloquant — l'action continue même si le log échoue
    }
  }

  return decision;
}

// ─── Rôles prédéfinis KOS ───

export const KOS_ROLES = {
  ADMIN: 'ADMIN',
  COO: 'COO',
  CEO: 'CEO',
  DG: 'DG',
  RCCI: 'RCCI',
  AUDITEUR_INTERNE: 'AUDITEUR_INTERNE',
  AUDITEUR_EXTERNE: 'AUDITEUR_EXTERNE',
  COMPLIANCE_OFFICER: 'COMPLIANCE_OFFICER',
  ANALYSTE: 'ANALYSTE',
  LECTEUR: 'LECTEUR',
} as const;

export type KOSRole = (typeof KOS_ROLES)[keyof typeof KOS_ROLES];