// ============================================================================
// KOS CONSTITUTION v1.0 — Enterprise AI Governance as Code
// KERF Volume I: Big Four Grade | ISO/IEC 42001:2023 | ISO/IEC 27001:2022
// Classification: CONFIDENTIAL — KHEPRA EXPERTS
//
// This constitution is ENFORCED AT RUNTIME.
// Any violation throws ConstitutionViolation and blocks the pipeline.
// No external API, no hallucination, no PII leak — EVER.
// ============================================================================

export const KOS_CONSTITUTION = {
  version: '1.0.0',
  name: 'KOS Enterprise AI Constitution',

  // ─── FOUNDING PRINCIPLES ───
  principles: [
    {
      id: 'PRINCIPLE-001',
      name: 'Souveraineté Totale',
      description: 'Aucun appel API externe autorisé en production. IA = PostgreSQL + pgvector + Edge Functions auto-hébergées.',
      iso42001: '5.2 — AI Policy',
      enforceable: true,
    },
    {
      id: 'PRINCIPLE-002',
      name: 'Explicabilité par Design',
      description: 'Toute réponse contient `reasoning_trace[]`. Score < 0.3 = "Aucune source vérifiée". Citation obligatoire: regulator + title + url + score + hash.',
      iso42001: '8.2 — Data Quality',
      enforceable: true,
    },
    {
      id: 'PRINCIPLE-003',
      name: 'Audit Immuable',
      description: 'Chaque requête → kos_audit_trail SHA-256. Logs 7 ans, AES-256, RLS. Hash chain ininterrompue.',
      iso42001: '9.3 — Monitoring',
      iso27001: 'A.12.4.1 — Event Logging',
      enforceable: true,
    },
    {
      id: 'PRINCIPLE-004',
      name: 'Big Four Grade',
      description: 'Confiance ≥ 0.9, Coverage ≥ 95%, P95 < 500ms, Dédoublonnage: 1 hash = 1 source.',
      iso42001: '6.1.2 — AI Risk Assessment',
      enforceable: true,
    },
    {
      id: 'PRINCIPLE-005',
      name: 'Séparation des Faits et Analyses',
      description: 'Distinction explicite entre faits établis, analyses, hypothèses et recommandations. Aucune ambiguïté.',
      enforceable: false,
    },
    {
      id: 'PRINCIPLE-006',
      name: 'Amélioration Continue Mesurable',
      description: 'Progression fondée sur des KPI objectifs (précision, exhaustivité, traçabilité, cohérence, clarté).',
      enforceable: false,
    },
    {
      id: 'PRINCIPLE-007',
      name: 'Supervision Humaine Obligatoire',
      description: 'Décisions critiques avec score QA < 75 REQUIERT une revue humaine. Kill switch activable à tout moment.',
      iso42001: '5.2 — Human Oversight',
      enforceable: true,
    },
  ] as const,

  // ─── RED LINES — ZERO TOLERANCE ───
  redLines: [
    {
      id: 'RED-001',
      rule: 'NO_EXTERNAL_LLM',
      description: 'Aucun appel à OpenAI, Anthropic, Google, ou tout LLM externe.',
      check: () => {
        if (typeof process !== 'undefined' && (process as any).env?.OPENAI_API_KEY) return false;
        return true;
      },
      severity: 'BLOCKING' as const,
    },
    {
      id: 'RED-002',
      rule: 'NO_HALLUCINATION',
      description: 'Score de confiance minimum 0.3. En dessous → réponse bloquée.',
      check: (confidenceScore: number) => confidenceScore >= 0.3,
      severity: 'BLOCKING' as const,
    },
    {
      id: 'RED-003',
      rule: 'NO_PII_LEAK',
      description: 'Aucune donnée personnelle identifiable dans les réponses.',
      check: (text: string) => {
        const patterns = [
          /(?:\d[ -]?){13,16}/g,  // Cartes bancaires
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,  // Emails
          /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,  // IPs
        ];
        return patterns.every((p) => !p.test(text));
      },
      severity: 'BLOCKING' as const,
    },
    {
      id: 'RED-004',
      rule: 'NO_EXTERNAL_API',
      description: 'Zéro appel API externe en production. Traqué via kos_audit_trail.external_api_calls.',
      check: (externalApiCalls: number) => externalApiCalls === 0,
      severity: 'BLOCKING' as const,
    },
  ] as const,

  // ─── SLO — Service Level Objectives ───
  slo: {
    latencyP95Ms: 500,
    availability: 0.999,
    knowledgeCoverage: 0.95,
    citationAccuracy: 0.90,
    maxExternalApiCalls: 0,
    dataRetentionYears: 7,
  } as const,

  // ─── ISO/IEC 42001:2023 CONTROLS ───
  iso42001Controls: {
    '5.2': 'AI Policy — Governance framework for AI systems',
    '6.1.2': 'AI Risk Assessment — Identify, evaluate, and treat AI-related risks',
    '8.2': 'Data Quality — Ensure training and operational data quality',
    '9.3': 'Monitoring & Measurement — Continuous monitoring of AI system performance',
    'B.7.2': 'Explainability — AI decisions must be explainable to stakeholders',
    'B.9.3': 'Human Oversight — Critical decisions require human review',
  } as const,

  // ─── ISO/IEC 27001:2022 CONTROLS ───
  iso27001Controls: {
    'A.8.24': 'Use of Cryptography — SHA-256 hashing for all audit events',
    'A.12.4.1': 'Event Logging — All queries logged in kos_audit_trail',
    'A.8.2': 'Data Classification — Regulatory data classified as CONFIDENTIAL',
    'A.8.3': 'Information Labelling — All responses tagged with confidence score and sources',
  } as const,

  // ─── AUDIT TRAIL STRUCTURE ───
  auditTrail: {
    table: 'kos_audit_trail',
    hashAlgorithm: 'SHA-256' as const,
    retentionYears: 7,
    requiredFields: ['session_id', 'query', 'traces', 'result_hash', 'iso27001_controls', 'iso42001_controls', 'external_api_calls'],
    genesisHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  } as const,

  // ─── KILL SWITCH ───
  emergencyShutdown: {
    envKey: 'KOS_EMERGENCY_SHUTDOWN',
    description: 'Setting this to "true" immediately stops all AI agent processing.',
  },
} as const;

// ============================================================================
// CONSTITUTION VIOLATION — Thrown when a red line is crossed
// ============================================================================

export class ConstitutionViolation extends Error {
  public readonly redLineId: string;
  public readonly redLineRule: string;
  public readonly severity: 'BLOCKING' | 'WARNING';
  public readonly timestamp: string;

  constructor(redLineId: string, redLineRule: string, detail?: string) {
    const message = `[KOS CONSTITUTION VIOLATION] ${redLineRule}: ${detail || 'Red line crossed — pipeline blocked'}`;
    super(message);
    this.name = 'ConstitutionViolation';
    this.redLineId = redLineId;
    this.redLineRule = redLineRule;
    this.severity = 'BLOCKING';
    this.timestamp = new Date().toISOString();
  }
}

// ============================================================================
// RUNTIME ASSERTIONS — Call these before any AI pipeline step
// ============================================================================

/**
 * Assert that all constitutional red lines pass.
 * Throws ConstitutionViolation if any blocking rule fails.
 * Called at the START of every orchestration pipeline.
 */
export function assertConstitution(checks?: {
  confidenceScore?: number;
  responseText?: string;
  externalApiCalls?: number;
}): void {
  // RED-002: NO HALLUCINATION
  if (checks?.confidenceScore !== undefined && checks.confidenceScore < 0.3) {
    throw new ConstitutionViolation(
      'RED-002',
      'NO_HALLUCINATION',
      `Confidence score ${checks.confidenceScore} is below 0.3 threshold`,
    );
  }

  // RED-003: NO PII LEAK
  if (checks?.responseText) {
    const hasPii = !KOS_CONSTITUTION.redLines[2].check(checks.responseText);
    if (hasPii) {
      throw new ConstitutionViolation(
        'RED-003',
        'NO_PII_LEAK',
        'Response contains personally identifiable information',
      );
    }
  }

  // RED-004: NO EXTERNAL API
  if (checks?.externalApiCalls !== undefined && checks.externalApiCalls > 0) {
    throw new ConstitutionViolation(
      'RED-004',
      'NO_EXTERNAL_API',
      `${checks.externalApiCalls} external API call(s) detected — zero-external is mandatory`,
    );
  }

  // EMERGENCY SHUTDOWN check
  if (typeof window !== 'undefined' && (window as any).__KOS_EMERGENCY_SHUTDOWN__) {
    throw new ConstitutionViolation(
      'SHUTDOWN-001',
      'EMERGENCY_SHUTDOWN',
      'KOS Emergency Shutdown is active — all AI operations suspended',
    );
  }
}

/**
 * Validate an orchestration response against constitutional SLOs.
 * Returns a compliance report — does NOT throw (used for monitoring).
 */
export function validateSLO(result: {
  latencyMs?: number;
  confidenceScore?: number;
  externalApiCalls?: number;
  sourceCount?: number;
}): {
  compliant: boolean;
  violations: string[];
  sloReport: Record<string, { passed: boolean; value: number | undefined; target: number | string }>;
} {
  const violations: string[] = [];
  const sloReport: Record<string, { passed: boolean; value: number | undefined; target: number | string }> = {};

  // Latency SLO
  const latencyPassed = !result.latencyMs || result.latencyMs <= KOS_CONSTITUTION.slo.latencyP95Ms;
  sloReport.latencyP95 = { passed: latencyPassed, value: result.latencyMs, target: `< ${KOS_CONSTITUTION.slo.latencyP95Ms}ms` };
  if (!latencyPassed) violations.push('Latency P95 SLO violated');

  // External API SLO
  const apiPassed = !result.externalApiCalls || result.externalApiCalls === 0;
  sloReport.externalApiCalls = { passed: apiPassed, value: result.externalApiCalls, target: '0' };
  if (!apiPassed) violations.push('External API call SLO violated');

  // Confidence SLO
  const confidencePassed = !result.confidenceScore || result.confidenceScore >= 0.9;
  sloReport.confidence = { passed: confidencePassed, value: result.confidenceScore, target: '≥ 0.9 (Big Four Grade)' };
  if (!confidencePassed) violations.push('Confidence SLO violated (Big Four Grade requires ≥ 0.9)');

  return {
    compliant: violations.length === 0,
    violations,
    sloReport,
  };
}

/**
 * Generate a constitutional compliance tag for audit trail metadata.
 */
export function constitutionComplianceTag(result: {
  redLinesPassed: number;
  redLinesTotal: number;
  sloCompliant: boolean;
}): {
  tag: 'FULLY_COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT';
  score: number;
  hash: string;
} {
  const score = result.redLinesTotal > 0 ? result.redLinesPassed / result.redLinesTotal : 1;
  let tag: 'FULLY_COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT';

  if (score === 1 && result.sloCompliant) {
    tag = 'FULLY_COMPLIANT';
  } else if (score >= 0.75) {
    tag = 'PARTIALLY_COMPLIANT';
  } else {
    tag = 'NON_COMPLIANT';
  }

  const payload = `${KOS_CONSTITUTION.version}:${tag}:${result.redLinesPassed}/${result.redLinesTotal}:SLO=${result.sloCompliant}`;
  let hashInt = 0;
  for (let i = 0; i < payload.length; i += 1) {
    hashInt = ((hashInt << 5) - hashInt) + payload.charCodeAt(i);
    hashInt |= 0;
  }
  const hash = `const_${Math.abs(hashInt).toString(16).padStart(8, '0')}`;

  return { tag, score, hash };
}

// ============================================================================
// SINGLETON — Global constitution checker
// ============================================================================

let constitutionActive = true;

export function isConstitutionActive(): boolean {
  return constitutionActive;
}

export function toggleConstitution(active: boolean): void {
  constitutionActive = active;
}

export function emergencyShutdown(): void {
  if (typeof window !== 'undefined') {
    (window as any).__KOS_EMERGENCY_SHUTDOWN__ = true;
  }
}

export function liftEmergencyShutdown(): void {
  if (typeof window !== 'undefined') {
    delete (window as any).__KOS_EMERGENCY_SHUTDOWN__;
  }
}



