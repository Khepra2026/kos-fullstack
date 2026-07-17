import { describe, it, expect, beforeEach } from 'vitest';
import { KosAuditTrailEngine } from '@/services/kosAuditTrailEngine';

/**
 * KOS Audit Trail Engine — Unit Tests
 * Tests : chaînage hash, intégrité, recherche, evidence pack, conformité COBAC
 */

describe('KOS Audit Trail Engine — Event Logging', () => {
  let engine: KosAuditTrailEngine;

  beforeEach(() => {
    engine = new KosAuditTrailEngine();
  });

  it('should log a basic audit event', () => {
    const event = engine.logEvent({
      actor: { type: 'user', id: 'user@khepra.com', role: 'auditor' },
      action: 'content_publish',
      object: { type: 'article', id: 'ART-001', path: '/blog/article' },
    });

    expect(event.eventId).toBeTruthy();
    expect(event.eventId).toContain('AUDIT_');
    expect(event.actor.id).toBe('user@khepra.com');
    expect(event.action).toBe('content_publish');
    expect(event.integrity.eventHash).toBeTruthy();
    expect(event.integrity.chainPosition).toBe(1);
  });

  it('should chain events with hash references', () => {
    const event1 = engine.logEvent({
      actor: { type: 'user', id: 'user1', role: 'editor' },
      action: 'action_1',
      object: { type: 'doc', id: 'D1', path: '/docs/1' },
    });

    const event2 = engine.logEvent({
      actor: { type: 'user', id: 'user2', role: 'reviewer' },
      action: 'action_2',
      object: { type: 'doc', id: 'D2', path: '/docs/2' },
    });

    expect(event2.integrity.prevEventHash).toBe(event1.integrity.eventHash);
    expect(event2.integrity.chainPosition).toBe(2);
  });

  it('should include regulatory tags in events', () => {
    const event = engine.logEvent({
      actor: { type: 'system', id: 'kos_engine', role: 'system' },
      action: 'compliance_check',
      object: { type: 'regulation', id: 'COBAC_R3', path: '/compliance/cobac' },
      regulatoryTags: ['COBAC', 'CEMAC', 'IFRS9'],
    });

    expect(event.context.regulatoryTags).toContain('COBAC');
    expect(event.context.regulatoryTags).toContain('CEMAC');
    expect(event.context.regulatoryTags).toContain('IFRS9');
  });

  it('should log transaction events with amount-based tagging', () => {
    const event = engine.logTransactionEvent({
      transactionId: 'TXN_001',
      action: 'PROCESSED',
      actor: { type: 'service', id: 'core_banking', role: 'service' },
      amount: 75000000,
      currency: 'XAF',
    });

    expect(event.action).toBe('TRANSACTION_PROCESSED');
    expect(event.object.type).toBe('transaction');
    expect(event.context.regulatoryTags).toContain('LARGE_TRANSACTION');
    expect(event.context.regulatoryTags).toContain('REQUIRES_CEMAC_DECLARATION');
  });

  it('should log account events correctly', () => {
    const event = engine.logAccountEvent({
      accountId: 'ACC_001',
      action: 'CREATED',
      actor: { type: 'user', id: 'teller', role: 'teller' },
      beforeState: {},
      afterState: { balance: 1000000 },
    });

    expect(event.action).toBe('ACCOUNT_CREATED');
    expect(event.object.id).toBe('ACC_001');
    expect(event.afterState.balance).toBe(1000000);
  });

  it('should log credit events with IFRS9 tags', () => {
    const event = engine.logCreditEvent({
      facilityId: 'FAC_001',
      action: 'DISBURSED',
      actor: { type: 'user', id: 'credit_officer', role: 'officer' },
    });

    expect(event.context.regulatoryTags).toContain('IFRS9');
    expect(event.object.type).toBe('credit_facility');
  });

  it('should log compliance events with results', () => {
    const event = engine.logComplianceEvent({
      action: 'COBAC_R6_CHECK',
      actor: { type: 'system', id: 'compliance_engine', role: 'system' },
      regulation: 'COBAC_R6',
      evidence: 'AML screening passed',
      result: 'PASS',
    });

    expect(event.context.complianceCheck).toBe('PASS');
    expect(event.afterState.result).toBe('PASS');
  });

  it('should log security events with severity', () => {
    const event = engine.logSecurityEvent({
      action: 'DDOS_DETECTED',
      actor: { type: 'system', id: 'waf', role: 'system' },
      severity: 'CRITICAL',
      details: 'Layer 7 DDoS from 15 IPs',
    });

    expect(event.action).toBe('SECURITY_DDOS_DETECTED');
    expect(event.context.regulatoryTags).toContain('SEVERITY_CRITICAL');
  });
});

describe('KOS Audit Trail Engine — Integrity Verification', () => {
  let engine: KosAuditTrailEngine;

  beforeEach(() => {
    engine = new KosAuditTrailEngine();
  });

  it('should verify an intact hash chain', () => {
    for (let i = 0; i < 5; i += 1) {
      engine.logEvent({
        actor: { type: 'user', id: `user_${i}`, role: 'tester' },
        action: `test_action_${i}`,
        object: { type: 'test', id: `OBJ_${i}`, path: '/test' },
      });
    }

    const result = engine.verifyHashChain();
    expect(result.valid).toBe(true);
    expect(result.brokenAt).toBeNull();
    expect(result.totalEvents).toBe(5);
  });

  it('should return valid for empty chain', () => {
    const result = engine.verifyHashChain();
    expect(result.valid).toBe(true);
    expect(result.totalEvents).toBe(0);
  });

  it('should provide chain integrity report', () => {
    engine.logEvent({
      actor: { type: 'user', id: 'user1', role: 'auditor' },
      action: 'test',
      object: { type: 'test', id: 'T1', path: '/test' },
    });

    const report = engine.getChainIntegrityReport();
    expect(report.verificationStatus).toBe('VALID');
    expect(report.totalEvents).toBe(1);
    expect(report.chainLength).toBe(2); // genesis + 1 event
    expect(report.lastEventTimestamp).toBeTruthy();
  });
});

describe('KOS Audit Trail Engine — Search', () => {
  let engine: KosAuditTrailEngine;

  beforeEach(() => {
    engine = new KosAuditTrailEngine();
    engine.logEvent({
      actor: { type: 'user', id: 'alice@khepra.com', role: 'editor' },
      action: 'ARTICLE_CREATED',
      object: { type: 'article', id: 'A1', path: '/blog/a1' },
      regulatoryTags: ['COBAC', 'IFRS9'],
    });
    engine.logEvent({
      actor: { type: 'user', id: 'bob@khepra.com', role: 'reviewer' },
      action: 'ARTICLE_REVIEWED',
      object: { type: 'article', id: 'A1', path: '/blog/a1' },
      regulatoryTags: ['COBAC'],
    });
    engine.logEvent({
      actor: { type: 'system', id: 'kos_engine', role: 'system' },
      action: 'COMPLIANCE_CHECK',
      object: { type: 'compliance', id: 'C1', path: '/compliance' },
      regulatoryTags: ['CEMAC'],
      riskScore: 0.8,
    });
  });

  it('should search events by actor', () => {
    const results = engine.searchEvents({ actorId: 'alice@khepra.com' });
    expect(results).toHaveLength(1);
    expect(results[0].action).toBe('ARTICLE_CREATED');
  });

  it('should search events by action keyword', () => {
    const results = engine.searchEvents({ action: 'ARTICLE' });
    expect(results).toHaveLength(2);
  });

  it('should search events by regulatory tag', () => {
    const results = engine.searchEvents({ regulatoryTags: ['IFRS9'] });
    expect(results).toHaveLength(1);
    expect(results[0].context.regulatoryTags).toContain('IFRS9');
  });

  it('should search events by object type', () => {
    const results = engine.searchEvents({ objectType: 'compliance' });
    expect(results).toHaveLength(1);
  });

  it('should filter by minimum risk score', () => {
    const results = engine.searchEvents({ minRiskScore: 0.5 });
    expect(results).toHaveLength(1);
    expect(results[0].context.riskScore).toBeGreaterThanOrEqual(0.5);
  });

  it('should limit search results', () => {
    const results = engine.searchEvents({ limit: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('should get events by regulatory tag directly', () => {
    const cobacEvents = engine.getEventsByRegulatoryTag('COBAC');
    expect(cobacEvents).toHaveLength(2);
  });
});

describe('KOS Audit Trail Engine — Big Four Evidence Pack', () => {
  let engine: KosAuditTrailEngine;

  beforeEach(() => {
    engine = new KosAuditTrailEngine();
    engine.logEvent({
      actor: { type: 'user', id: 'auditor', role: 'auditor' },
      action: 'test_1',
      object: { type: 'audit', id: 'AU1', path: '/audit' },
      regulatoryTags: ['COBAC'],
    });
    engine.logEvent({
      actor: { type: 'user', id: 'auditor', role: 'auditor' },
      action: 'test_2',
      object: { type: 'audit', id: 'AU2', path: '/audit' },
      regulatoryTags: ['IFRS9'],
    });
  });

  it('should generate an evidence pack with regulatory coverage', () => {
    const pack = engine.generateEvidencePack(
      '2026-01-01T00:00:00Z',
      '2026-12-31T23:59:59Z',
    );

    expect(pack.packId).toContain('EVIDENCE_');
    expect(pack.totalEvents).toBe(2);
    expect(pack.regulatoryCoverage.cobac).toBe(1);
    expect(pack.regulatoryCoverage.ifrs).toBe(1);
    expect(pack.events).toHaveLength(2);
  });

  it('should filter evidence pack by time range', () => {
    const pack = engine.generateEvidencePack(
      '2025-01-01T00:00:00Z',
      '2025-01-01T00:00:01Z',
    );
    expect(pack.totalEvents).toBe(0);
  });
});

describe('KOS Audit Trail Engine — Export', () => {
  let engine: KosAuditTrailEngine;

  beforeEach(() => {
    engine = new KosAuditTrailEngine();
    engine.logEvent({
      actor: { type: 'user', id: 'exporter', role: 'auditor' },
      action: 'export_test',
      object: { type: 'test', id: 'EXP1', path: '/test' },
    });
  });

  it('should export events as JSONL', () => {
    const jsonl = engine.exportEvents('JSONL');
    expect(jsonl).toBeTruthy();
    expect(jsonl).toContain('eventId');
    expect(jsonl).toContain('export_test');
  });

  it('should export events as CSV', () => {
    const csv = engine.exportEvents('CSV');
    expect(csv).toBeTruthy();
    expect(csv).toContain('eventId');
    expect(csv).toContain('export_test');
  });
});

describe('KOS Audit Trail Engine — COBAC Compliance', () => {
  it('should pass COBAC compliance when events exist', () => {
    const engine = new KosAuditTrailEngine();
    engine.logEvent({
      actor: { type: 'user', id: 'compliance', role: 'auditor' },
      action: 'compliance_test',
      object: { type: 'test', id: 'T1', path: '/test' },
      regulatoryTags: ['COBAC'],
    });

    const result = engine.checkCobacCompliance();
    expect(result.compliant).toBe(true);
    expect(result.checks).toHaveLength(4);
    expect(result.checks.every((c) => c.passed)).toBe(true);
  });
});

describe('KOS Audit Trail Engine — Statistics', () => {
  it('should compute accurate statistics', () => {
    const engine = new KosAuditTrailEngine();
    engine.logEvent({
      actor: { type: 'user', id: 'user_a', role: 'editor' },
      action: 'action_a',
      object: { type: 'article', id: 'A1', path: '/a1' },
    });
    engine.logEvent({
      actor: { type: 'user', id: 'user_b', role: 'reviewer' },
      action: 'action_b',
      object: { type: 'article', id: 'A2', path: '/a2' },
    });

    const stats = engine.getStatistics();
    expect(stats.totalEvents).toBe(2);
    expect(stats.actorsCount).toBe(2);
    expect(stats.chainIntegrity.verificationStatus).toBe('VALID');
  });
});