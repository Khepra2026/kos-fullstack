import { useState } from 'react';
import { logger } from '@/core/logger';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KOS Regtech AI — AI Guard v1.0
// EU AI Act + NIST RMF enforcer — bloque déploiements non conformes
// 0 API externe : évaluation locale basée sur règles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type RiskLevel = 'MINIMAL' | 'LIMITED' | 'HIGH' | 'UNACCEPTABLE';

export type AICategory =
  | 'COMPLIANCE_CHECK'
  | 'RISK_SCORING'
  | 'FRAUD_DETECTION'
  | 'REGULATORY_PARSING'
  | 'CLIENT_ADVISORY'
  | 'REPORTING'
  | 'HORIZON_SCANNING';

export interface AIModel {
  id: string;
  name: string;
  version: string;
  category: AICategory;
  description: string;
  trainingDataDescription: string;
  hasHumanOversight: boolean;
  hasExplainability: boolean;
  hasBiasAudit: boolean;
  dataLineage: string[];
  impactScore: number; // 0-100
  lastAuditDate?: string;
  deployed: boolean;
}

interface RiskAssessment {
  riskLevel: RiskLevel;
  mitigations: string[];
  requiresHumanSignOff: boolean;
  requiresConformityAssessment: boolean;
  euAiActArticles: string[];
  nistControls: string[];
  deployable: boolean;
  blockedReason?: string;
}

// ─── Moteur d'évaluation EU AI Act + NIST RMF ───

function assessRisk(model: AIModel): RiskAssessment {
  const mitigations: string[] = [];
  const euAiActArticles: string[] = [];
  const nistControls: string[] = [];
  let deployable = true;
  let blockedReason: string | undefined;

  // EU AI Act Title III — High-Risk AI Systems
  if (model.category === 'FRAUD_DETECTION' || model.category === 'RISK_SCORING') {
    euAiActArticles.push('Art.6 — Classification High-Risk');
    mitigations.push('Conformity assessment required before deployment');
    nistControls.push('NIST AI RMF — Govern 1.1: Risk categorization');
  }

  // EU AI Act Art.14 — Human Oversight
  if (!model.hasHumanOversight) {
    euAiActArticles.push('Art.14 — Human Oversight');
    mitigations.push('Human-in-the-loop mandatory for all automated decisions');
    nistControls.push('NIST AI RMF — Govern 2.3: Human-AI configuration');
    if (model.impactScore > 50) {
      deployable = false;
      blockedReason =
        'EU AI Act Art.14: Human oversight missing for high-impact system (>50/100)';
    }
  }

  // EU AI Act Art.13 — Transparency
  if (!model.hasExplainability) {
    euAiActArticles.push('Art.13 — Transparency & Explainability');
    mitigations.push('SHAP/LIME explainability reports required');
    nistControls.push('NIST AI RMF — Map 3.1: Explainability mapping');
  }

  // EU AI Act Art.10 — Data Governance
  if (!model.hasBiasAudit) {
    euAiActArticles.push('Art.10 — Data & Data Governance');
    mitigations.push('Bias audit on training data mandatory');
    nistControls.push('NIST AI RMF — Map 2.1: Data quality assessment');
  }

  // EU AI Act Art.5 — Prohibited Practices
  if (model.category === 'CLIENT_ADVISORY' && model.impactScore > 80 && !model.hasHumanOversight) {
    euAiActArticles.push('Art.5 — Prohibited AI Practices');
    deployable = false;
    blockedReason =
      'EU AI Act Art.5: Fully automated advisory without human oversight at impact >80 is prohibited';
  }

  // Détermination du niveau de risque
  let riskLevel: RiskLevel;
  if (!deployable) {
    riskLevel = 'UNACCEPTABLE';
  } else if (model.impactScore > 70 || euAiActArticles.length >= 3) {
    riskLevel = 'HIGH';
  } else if (model.impactScore > 30 || euAiActArticles.length >= 1) {
    riskLevel = 'LIMITED';
  } else {
    riskLevel = 'MINIMAL';
  }

  return {
    riskLevel,
    mitigations,
    requiresHumanSignOff: riskLevel !== 'MINIMAL',
    requiresConformityAssessment: riskLevel === 'HIGH',
    euAiActArticles: [...new Set(euAiActArticles)],
    nistControls: [...new Set(nistControls)],
    deployable,
    blockedReason,
  };
}

// ─── Hook d'évaluation d'impact AI ───

export function useAIImpactAssessment(model: AIModel) {
  const assessment = assessRisk(model);

  useState(() => {
    logger.child('ai-guard').info('AI Model assessment', {
      model: model.name,
      riskLevel: assessment.riskLevel,
      deployable: assessment.deployable,
    });
  });

  return assessment;
}

// ─── Badge de risque ───

const riskBadgeStyles: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  MINIMAL: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    label: 'Risque Minimal',
  },
  LIMITED: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    label: 'Risque Limité',
  },
  HIGH: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'Haut Risque',
  },
  UNACCEPTABLE: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Inacceptable',
  },
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const style = riskBadgeStyles[level];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style.bg} ${style.text}`}
    >
      <i
        className={`mr-1.5 ${
          level === 'MINIMAL'
            ? 'ri-shield-check-line'
            : level === 'UNACCEPTABLE'
              ? 'ri-close-circle-line'
              : 'ri-alert-line'
        }`}
      ></i>
      {style.label}
    </span>
  );
}

// ─── ModelCard — Composant fiche modèle AI ───

interface ModelCardProps {
  model: AIModel;
  onDeploy?: (modelId: string) => void;
  onAudit?: (modelId: string) => void;
}

export function ModelCard({ model, onDeploy, onAudit }: ModelCardProps) {
  const assessment = useAIImpactAssessment(model);

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-background-300/60 transition-colors">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground-950">{model.name}</h3>
          <p className="text-xs text-foreground-600 mt-0.5">
            v{model.version} &middot; {model.category.replace(/_/g, ' ')}
          </p>
        </div>
        <RiskBadge level={assessment.riskLevel} />
      </div>

      <p className="text-xs text-foreground-700 mb-4">{model.description}</p>

      {/* Indicateurs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-foreground-600">
          <i
            className={`${model.hasHumanOversight ? 'ri-user-follow-line text-emerald-600' : 'ri-user-unfollow-line text-red-500'}`}
          ></i>
          <span>Human Oversight</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-600">
          <i
            className={`${model.hasExplainability ? 'ri-brain-line text-emerald-600' : 'ri-question-line text-amber-500'}`}
          ></i>
          <span>Explainability</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-600">
          <i
            className={`${model.hasBiasAudit ? 'ri-scales-3-line text-emerald-600' : 'ri-scales-3-line text-amber-500'}`}
          ></i>
          <span>Bias Audit</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-foreground-600">
          <i className="ri-bar-chart-2-line text-foreground-500"></i>
          <span>Impact: {model.impactScore}/100</span>
        </div>
      </div>

      {/* Data Lineage */}
      {model.dataLineage.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-foreground-700 mb-1">Data Lineage</p>
          <div className="flex flex-wrap gap-1">
            {model.dataLineage.map((src) => (
              <span
                key={src}
                className="px-2 py-0.5 bg-secondary-100 text-secondary-800 rounded text-xs whitespace-nowrap"
              >
                {src}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Blocage déploiement */}
      {!assessment.deployable && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="flex items-start gap-2">
            <i className="ri-error-warning-line text-red-600 mt-0.5"></i>
            <div className="text-xs">
              <p className="font-semibold text-red-800">Déploiement Bloqué</p>
              <p className="text-red-700 mt-0.5">{assessment.blockedReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mitigations */}
      {assessment.mitigations.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-foreground-700 mb-1">Mitigations requises</p>
          <ul className="space-y-1">
            {assessment.mitigations.map((m) => (
              <li key={m} className="flex items-start gap-1.5 text-xs text-foreground-600">
                <i className="ri-checkbox-circle-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conformité réglementaire */}
      <div className="border-t border-background-200/70 pt-3 mb-4">
        <p className="text-xs font-medium text-foreground-700 mb-1">Conformité réglementaire</p>
        {assessment.euAiActArticles.length > 0 && (
          <div className="mb-1">
            <span className="text-xs text-foreground-500">EU AI Act: </span>
            {assessment.euAiActArticles.map((a) => (
              <span
                key={a}
                className="text-xs text-accent-700 whitespace-nowrap mr-2"
              >
                {a}
              </span>
            ))}
          </div>
        )}
        {assessment.nistControls.length > 0 && (
          <div>
            <span className="text-xs text-foreground-500">NIST RMF: </span>
            {assessment.nistControls.map((n) => (
              <span
                key={n}
                className="text-xs text-secondary-700 whitespace-nowrap mr-2"
              >
                {n}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Human Sign-off */}
      {assessment.requiresHumanSignOff && (
        <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md mb-3">
          <i className="ri-user-voice-line text-amber-600"></i>
          <span className="text-xs font-medium text-amber-800">Signature humaine requise</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {assessment.deployable && model.deployed ? (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
            <i className="ri-check-line"></i> Déployé
          </span>
        ) : assessment.deployable && !model.deployed ? (
          <button
            onClick={() => onDeploy?.(model.id)}
            className="px-3 py-1.5 bg-primary-500 text-background-50 text-xs rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-rocket-line mr-1"></i>Déployer
          </button>
        ) : null}
        <button
          onClick={() => onAudit?.(model.id)}
          className="px-3 py-1.5 bg-secondary-100 text-secondary-800 text-xs rounded-md hover:bg-secondary-200 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-file-search-line mr-1"></i>Auditer
        </button>
      </div>
    </div>
  );
}

// ─── AIGuard — Composant d'enforcement ───

interface AIGuardProps {
  model: AIModel;
}

export function AIGuard({ model }: AIGuardProps) {
  const assessment = useAIImpactAssessment(model);

  return <ModelCard model={model} />;
}

export { assessRisk };
export type { RiskAssessment };