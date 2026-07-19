import { logger } from '@/core/logger';

// KOS Regtech AI — Local AI Guard
// Évaluation de risque AI 100% locale (EU AI Act + NIST RMF)
// En production: utilise @xenova/transformers pour NLP WASM
// Fallback: moteur de règles déterministe sans dépendance externe

const log = logger.child('local-llm');

// ─── Types ───

export type AIRiskLevel = 'MINIMAL' | 'LIMITED' | 'HIGH' | 'UNACCEPTABLE';

export interface AIRiskAssessment {
  riskLevel: AIRiskLevel;
  humanOversightRequired: boolean;
  confidence: number;
  modelCard: {
    name: string;
    riskLevel: AIRiskLevel;
    regulatoryArticles: string[];
    mitigations: string[];
    dataLineage: string[];
  };
  blocage: boolean;
  blockedReason?: string;
}

interface ModelDescriptor {
  name: string;
  purpose: string;
  category: string;
  trainingData: string;
  hasHumanOversight: boolean;
  hasExplainability: boolean;
}

// ─── Analyseur de risque local (règles déterministes) ───

// Catégories à haut risque selon EU AI Act Annex III
const HIGH_RISK_CATEGORIES = [
  'credit_scoring',
  'risk_assessment',
  'fraud_detection',
  'aml',
  'compliance_screening',
  'regulatory_evaluation',
  'financial_audit',
];

const PROHIBITED_PATTERNS = [
  'manipulation',
  'social_scoring',
  'biometric_categorization',
  'emotion_recognition',
  'predictive_policing',
];

export function analyzeAIRiskLocal(descriptor: ModelDescriptor): AIRiskAssessment {
  const mitigations: string[] = [];
  const regulatoryArticles: string[] = [];
  let riskScore = 0;

  // 1. Catégorisation EU AI Act Annex III
  const categoryLower = descriptor.category.toLowerCase();
  if (HIGH_RISK_CATEGORIES.some((c) => categoryLower.includes(c))) {
    riskScore += 40;
    regulatoryArticles.push('EU AI Act Art.6 — High-Risk Classification (Annex III)');
    mitigations.push('Conformity assessment required before deployment');
  }

  // 2. Prohibited practices (Art.5)
  const purposeLower = descriptor.purpose.toLowerCase();
  const prohibited = PROHIBITED_PATTERNS.filter((p) => purposeLower.includes(p));
  if (prohibited.length > 0) {
    riskScore += 60;
    regulatoryArticles.push('EU AI Act Art.5 — Prohibited AI Practices');
    mitigations.push(`Prohibited: ${prohibited.join(', ')} — Deployment blocked`);
  }

  // 3. Human oversight (Art.14)
  if (!descriptor.hasHumanOversight) {
    riskScore += 25;
    regulatoryArticles.push('EU AI Act Art.14 — Human Oversight Required');
    mitigations.push('Human-in-the-loop mandatory for all automated decisions');
  }

  // 4. Transparency (Art.13)
  if (!descriptor.hasExplainability) {
    riskScore += 15;
    regulatoryArticles.push('EU AI Act Art.13 — Transparency & Explainability');
    mitigations.push('SHAP/LIME explainability reports required');
  }

  // 5. Data governance (Art.10)
  if (descriptor.trainingData.length < 50) {
    riskScore += 10;
    regulatoryArticles.push('EU AI Act Art.10 — Data Governance');
    mitigations.push('Training data documentation insufficient — expand dataset');
  }

  // Détermination niveau de risque
  let riskLevel: AIRiskLevel;
  if (riskScore >= 80) {
    riskLevel = 'UNACCEPTABLE';
  } else if (riskScore >= 50) {
    riskLevel = 'HIGH';
  } else if (riskScore >= 20) {
    riskLevel = 'LIMITED';
  } else {
    riskLevel = 'MINIMAL';
  }

  const blocage = riskLevel === 'UNACCEPTABLE';
  const blockedReason = blocage
    ? `Deployment blocked: ${regulatoryArticles.join('; ')}`
    : undefined;

  const assessment: AIRiskAssessment = {
    riskLevel,
    humanOversightRequired: riskLevel !== 'MINIMAL',
    confidence: Math.round((1 - riskScore / 100) * 100),
    modelCard: {
      name: descriptor.name,
      riskLevel,
      regulatoryArticles,
      mitigations,
      dataLineage: [descriptor.trainingData],
    },
    blocage,
    blockedReason,
  };

  log.info('AI Risk Assessment', {
    model: descriptor.name,
    riskLevel,
    riskScore,
    blocage,
  });

  return assessment;
}

// ─── En production: utiliser @xenova/transformers pour NLP avancé ───

// Cette fonction est chargée dynamiquement pour ne pas bloquer le build
// si @xenova/transformers n'est pas disponible
let wasmPipeline: unknown = null;

async function loadWasmPipeline(): Promise<unknown> {
  if (wasmPipeline) return wasmPipeline;

  try {
    // Chargement dynamique — échoue silencieusement si le package n'est pas installé
    const { pipeline } = await import('@xenova/transformers');
    wasmPipeline = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
    log.info('WASM NLP pipeline loaded');
    return wasmPipeline;
  } catch {
    log.warn('WASM pipeline unavailable — using deterministic rules');
    return null;
  }
}

export async function analyzeAIRiskAdvanced(modelDesc: string): Promise<AIRiskAssessment> {
  // Essaie le pipeline WASM, fallback vers les règles déterministes
  const pipe = await loadWasmPipeline();

  if (pipe) {
    try {
      const classifyFn = pipe as (text: string) => Promise<Array<{ label: string; score: number }>>;
      const result = await classifyFn(modelDesc);
      const topLabel = result[0]?.label || 'NEUTRAL';
      const score = result[0]?.score || 0.5;

      // Mapping WASM → Risk Level
      let riskLevel: AIRiskLevel;
      if (topLabel === 'NEGATIVE' && score > 0.8) riskLevel = 'UNACCEPTABLE';
      else if (topLabel === 'NEGATIVE' && score > 0.6) riskLevel = 'HIGH';
      else if (topLabel === 'NEGATIVE') riskLevel = 'LIMITED';
      else riskLevel = 'MINIMAL';

      return {
        riskLevel,
        humanOversightRequired: riskLevel !== 'MINIMAL',
        confidence: Math.round(score * 100),
        modelCard: {
          name: modelDesc.slice(0, 50),
          riskLevel,
          regulatoryArticles: riskLevel !== 'MINIMAL'
            ? ['EU AI Act — Assessed via WASM NLP']
            : [],
          mitigations: riskLevel !== 'MINIMAL'
            ? ['Review NLP classification results']
            : [],
          dataLineage: ['WASM local model — no data leak'],
        },
        blocage: riskLevel === 'UNACCEPTABLE',
      };
    } catch (err) {
      log.error('WASM analysis failed', { error: String(err) });
    }
  }

  // Fallback: règles déterministes
  return analyzeAIRiskLocal({
    name: modelDesc.slice(0, 50),
    purpose: modelDesc,
    category: 'general',
    trainingData: 'unknown',
    hasHumanOversight: false,
    hasExplainability: false,
  });
}

// ─── Générer Model Card ───

export function generateLocalModelCard(
  name: string,
  assessment: AIRiskAssessment
): string {
  const lines = [
    '='.repeat(60),
    `KOS AI MODEL CARD — ${name}`,
    '='.repeat(60),
    '',
    `Risk Level: ${assessment.riskLevel}`,
    `Confidence: ${assessment.confidence}%`,
    `Human Oversight Required: ${assessment.humanOversightRequired ? 'YES' : 'NO'}`,
    `Deployable: ${assessment.blocage ? 'NO — BLOCKED' : 'YES'}`,
    '',
    'Regulatory Articles:',
    ...assessment.modelCard.regulatoryArticles.map((a) => `  - ${a}`),
    '',
    'Mitigations:',
    ...assessment.modelCard.mitigations.map((m) => `  - ${m}`),
    '',
    'Data Lineage:',
    ...assessment.modelCard.dataLineage.map((d) => `  - ${d}`),
    '',
    '='.repeat(60),
    `Generated: ${new Date().toISOString()}`,
    'Engine: KOS Local AI Guard — Deterministic Rules + WASM NLP',
    '='.repeat(60),
  ];

  return lines.join('\n');
}



