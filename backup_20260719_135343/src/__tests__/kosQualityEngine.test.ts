import { describe, it, expect, vi } from 'vitest';

/**
 * KOS Quality Engine — Unit Tests
 * Tests de validation pour les moteurs de scoring qualité Big Four
 */

// ─── Quality Scoring Engine ───

function computeQualityScore(checks: { passed: boolean; weight: number }[]): number {
  const total = checks.reduce((sum, c) => sum + c.weight, 0);
  const passed = checks.filter(c => c.passed).reduce((sum, c) => sum + c.weight, 0);
  return total > 0 ? Math.round((passed / total) * 100) : 0;
}

function gradeFromScore(score: number): 'AAAA+ SUPREME' | 'AAAA EXCELLENCE' | 'AAA TRÈS BON' | 'AA BON' | 'A ACCEPTABLE' | 'SURVEILLANCE' {
  if (score >= 95) return 'AAAA+ SUPREME';
  if (score >= 85) return 'AAAA EXCELLENCE';
  if (score >= 75) return 'AAA TRÈS BON';
  if (score >= 60) return 'AA BON';
  if (score >= 40) return 'A ACCEPTABLE';
  return 'SURVEILLANCE';
}

// ─── Publication Gate Checks ───

interface PublicationResult {
  allowed: boolean;
  score: number;
  failures: string[];
}

function publicationGate(content: {
  hasOfficialSource: boolean;
  hasCorrectNomenclature: boolean;
  hasNoInterpretation: boolean;
  hasRegulatoryBase: boolean;
  hasTextProjectMention: boolean;
  hasMandatoryMetadata: boolean;
  hasNoFictiveReference: boolean;
}): PublicationResult {
  const checks = [
    { name: 'CHECK-01: Source Officielle', passed: content.hasOfficialSource, weight: 20 },
    { name: 'CHECK-02: Nomenclature Obligatoire', passed: content.hasCorrectNomenclature, weight: 15 },
    { name: 'CHECK-03: Interdiction Interprétation', passed: content.hasNoInterpretation, weight: 15 },
    { name: 'CHECK-04: Vérification Base Réglementaire', passed: content.hasRegulatoryBase, weight: 25 },
    { name: 'CHECK-05: Gestion Textes en Projet', passed: content.hasTextProjectMention, weight: 10 },
    { name: 'CHECK-06: Métadonnées Obligatoires', passed: content.hasMandatoryMetadata, weight: 10 },
    { name: 'CHECK-07: Tolérance Zéro', passed: content.hasNoFictiveReference, weight: 5 },
  ];

  const score = computeQualityScore(checks);
  const failures = checks.filter(c => !c.passed).map(c => c.name);

  return {
    allowed: score === 100,
    score,
    failures,
  };
}

// ─── Hook Pattern Validator ───

function validateHookPattern(hook: {
  hasSupabaseImport: boolean;
  hasMockFallback: boolean;
  hasCancelledRef: boolean;
  hasLoadingState: boolean;
  hasErrorState: boolean;
  hasRetryFunction: boolean;
}): { valid: boolean; gaps: string[] } {
  const gaps: string[] = [];
  if (!hook.hasSupabaseImport) gaps.push('Missing Supabase import');
  if (!hook.hasMockFallback) gaps.push('Missing mock fallback');
  if (!hook.hasCancelledRef) gaps.push('Missing cancelledRef for cleanup');
  if (!hook.hasLoadingState) gaps.push('Missing loading state');
  if (!hook.hasErrorState) gaps.push('Missing error state');
  if (!hook.hasRetryFunction) gaps.push('Missing retry function');
  return { valid: gaps.length === 0, gaps };
}

// ─── ISO 27001 Control Checker ───

function checkISO27001Control(control: {
  documented: boolean;
  implemented: boolean;
  monitored: boolean;
  reviewed: boolean;
}): { compliant: boolean; score: number } {
  const weights = { documented: 30, implemented: 35, monitored: 20, reviewed: 15 };
  let score = 0;
  if (control.documented) score += weights.documented;
  if (control.implemented) score += weights.implemented;
  if (control.monitored) score += weights.monitored;
  if (control.reviewed) score += weights.reviewed;
  return { compliant: score >= 80, score };
}

// ─── TESTS ───

describe('KOS Quality Scoring Engine', () => {
  it('should return 100 when all checks pass', () => {
    const checks = [
      { passed: true, weight: 50 },
      { passed: true, weight: 30 },
      { passed: true, weight: 20 },
    ];
    expect(computeQualityScore(checks)).toBe(100);
  });

  it('should return weighted score correctly', () => {
    const checks = [
      { passed: true, weight: 50 },
      { passed: false, weight: 50 },
    ];
    expect(computeQualityScore(checks)).toBe(50);
  });

  it('should return 0 when no checks pass', () => {
    const checks = [
      { passed: false, weight: 30 },
      { passed: false, weight: 70 },
    ];
    expect(computeQualityScore(checks)).toBe(0);
  });

  it('should return 0 for empty checks array', () => {
    expect(computeQualityScore([])).toBe(0);
  });

  it('should assign AAAA+ SUPREME for score >= 95', () => {
    expect(gradeFromScore(95)).toBe('AAAA+ SUPREME');
    expect(gradeFromScore(100)).toBe('AAAA+ SUPREME');
  });

  it('should assign SURVEILLANCE for score < 40', () => {
    expect(gradeFromScore(32)).toBe('SURVEILLANCE');
    expect(gradeFromScore(0)).toBe('SURVEILLANCE');
  });
});

describe('KOS Publication Gate', () => {
  it('should allow publication when all 7 checks pass', () => {
    const result = publicationGate({
      hasOfficialSource: true,
      hasCorrectNomenclature: true,
      hasNoInterpretation: true,
      hasRegulatoryBase: true,
      hasTextProjectMention: true,
      hasMandatoryMetadata: true,
      hasNoFictiveReference: true,
    });
    expect(result.allowed).toBe(true);
    expect(result.score).toBe(100);
    expect(result.failures).toHaveLength(0);
  });

  it('should block publication when source is missing', () => {
    const result = publicationGate({
      hasOfficialSource: false,
      hasCorrectNomenclature: true,
      hasNoInterpretation: true,
      hasRegulatoryBase: true,
      hasTextProjectMention: true,
      hasMandatoryMetadata: true,
      hasNoFictiveReference: true,
    });
    expect(result.allowed).toBe(false);
    expect(result.score).toBe(80);
    expect(result.failures).toContain('CHECK-01: Source Officielle');
  });

  it('should block publication completely when all checks fail', () => {
    const result = publicationGate({
      hasOfficialSource: false,
      hasCorrectNomenclature: false,
      hasNoInterpretation: false,
      hasRegulatoryBase: false,
      hasTextProjectMention: false,
      hasMandatoryMetadata: false,
      hasNoFictiveReference: false,
    });
    expect(result.allowed).toBe(false);
    expect(result.score).toBe(0);
    expect(result.failures).toHaveLength(7);
  });
});

describe('KOS Hook Pattern Validator', () => {
  it('should validate a fully compliant hook', () => {
    const result = validateHookPattern({
      hasSupabaseImport: true,
      hasMockFallback: true,
      hasCancelledRef: true,
      hasLoadingState: true,
      hasErrorState: true,
      hasRetryFunction: true,
    });
    expect(result.valid).toBe(true);
    expect(result.gaps).toHaveLength(0);
  });

  it('should detect missing Supabase import and mock fallback', () => {
    const result = validateHookPattern({
      hasSupabaseImport: false,
      hasMockFallback: false,
      hasCancelledRef: true,
      hasLoadingState: true,
      hasErrorState: true,
      hasRetryFunction: true,
    });
    expect(result.valid).toBe(false);
    expect(result.gaps).toContain('Missing Supabase import');
    expect(result.gaps).toContain('Missing mock fallback');
  });
});

describe('KOS ISO 27001 Control Checker', () => {
  it('should mark fully implemented control as compliant', () => {
    const result = checkISO27001Control({
      documented: true,
      implemented: true,
      monitored: true,
      reviewed: true,
    });
    expect(result.compliant).toBe(true);
    expect(result.score).toBe(100);
  });

  it('should mark undocumented control as non-compliant', () => {
    const result = checkISO27001Control({
      documented: false,
      implemented: false,
      monitored: false,
      reviewed: false,
    });
    expect(result.compliant).toBe(false);
    expect(result.score).toBe(0);
  });

  it('should mark partially implemented control correctly', () => {
    const result = checkISO27001Control({
      documented: true,
      implemented: true,
      monitored: false,
      reviewed: false,
    });
    expect(result.compliant).toBe(false);
    expect(result.score).toBe(65);
  });

  it('should pass at 80 threshold with doc+impl+monitored', () => {
    const result = checkISO27001Control({
      documented: true,
      implemented: true,
      monitored: true,
      reviewed: false,
    });
    expect(result.compliant).toBe(true);
    expect(result.score).toBe(85);
  });
});



