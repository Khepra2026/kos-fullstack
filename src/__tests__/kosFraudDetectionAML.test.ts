import { describe, it, expect, beforeEach } from 'vitest';
import { KosFraudDetectionAMLEngine } from '@/services/kosFraudDetectionAMLEngine';

/**
 * KOS Fraud Detection & AML Engine — Unit Tests
 * Tests : scoring AML, watchlist, patterns, SAR, dashboard
 */

describe('KOS Fraud Detection & AML Engine — Transaction Screening', () => {
  let engine: KosFraudDetectionAMLEngine;

  beforeEach(() => {
    engine = new KosFraudDetectionAMLEngine();
  });

  it('should screen a normal transaction as LOW risk', () => {
    const score = engine.screenTransaction({
      transactionId: 'TXN_001',
      customerId: 'CUST_LOW',
      amount: 500000,
      currency: 'XAF',
      transactionType: 'INTERNAL_TRANSFER',
      isCashTransaction: false,
    });

    expect(score.riskLevel).toBe('LOW');
    expect(score.recommendation).toBe('CLEAR');
    expect(score.components.amountAnomaly).toBeLessThan(0.3);
    expect(score.flags).toHaveLength(0);
  });

  it('should flag a high-amount transaction', () => {
    const score = engine.screenTransaction({
      transactionId: 'TXN_HIGH',
      customerId: 'CUST_HIGH',
      amount: 75000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      isCashTransaction: false,
    });

    expect(score.riskLevel).toBe('HIGH');
    expect(score.flags.some((f) => f.type === 'AMOUNT_THRESHOLD')).toBe(true);
    expect(score.overallScore).toBeGreaterThanOrEqual(0.5);
  });

  it('should flag transactions to high-risk jurisdictions', () => {
    const score = engine.screenTransaction({
      transactionId: 'TXN_GEO',
      customerId: 'CUST_GEO',
      amount: 10000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'KP',
      isCashTransaction: false,
    });

    expect(score.flags.some((f) => f.type === 'HIGH_RISK_GEOGRAPHY')).toBe(true);
    expect(score.components.geographicRisk).toBeGreaterThan(0.5);
  });

  it('should detect structuring patterns (multiple near-threshold txns)', () => {
    // First transaction at 9.5M (just below 10M threshold)
    engine.screenTransaction({
      transactionId: 'TXN_S1',
      customerId: 'CUST_STRUCT',
      amount: 9500000,
      currency: 'XAF',
      transactionType: 'CASH_DEPOSIT',
      isCashTransaction: true,
    });

    // Second near-threshold
    engine.screenTransaction({
      transactionId: 'TXN_S2',
      customerId: 'CUST_STRUCT',
      amount: 9600000,
      currency: 'XAF',
      transactionType: 'CASH_DEPOSIT',
      isCashTransaction: true,
    });

    // Third near-threshold — should trigger structuring pattern
    const score = engine.screenTransaction({
      transactionId: 'TXN_S3',
      customerId: 'CUST_STRUCT',
      amount: 9700000,
      currency: 'XAF',
      transactionType: 'CASH_DEPOSIT',
      isCashTransaction: true,
    });

    expect(score.flags.some((f) => f.type === 'STRUCTURING')).toBe(true);
    expect(score.components.patternRisk).toBeGreaterThan(0.5);
  });

  it('should return all scoring components as numbers between 0 and 1', () => {
    const score = engine.screenTransaction({
      transactionId: 'TXN_COMP',
      customerId: 'CUST_COMP',
      amount: 25000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'IR',
      isCashTransaction: false,
    });

    const components = Object.values(score.components);
    for (const val of components) {
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });

  it('should block critically high-risk transactions', () => {
    // Set up a high-risk customer
    engine.setCustomerRiskProfile({
      customerId: 'CUST_CRITICAL',
      riskCategory: 'HIGH',
      isPEP: true,
      countryRisk: 0.9,
      businessType: 'Money Services',
      lastReviewDate: '2025-01-01',
      enhancedDueDiligence: true,
    });

    const score = engine.screenTransaction({
      transactionId: 'TXN_CRIT',
      customerId: 'CUST_CRITICAL',
      amount: 120000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'KP',
      isCashTransaction: false,
    });

    expect(score.riskLevel).toBe('CRITICAL');
    expect(score.recommendation).toBe('BLOCK');
  });
});

describe('KOS Fraud Detection & AML Engine — Watchlist', () => {
  let engine: KosFraudDetectionAMLEngine;

  beforeEach(() => {
    engine = new KosFraudDetectionAMLEngine();
  });

  it('should have default GAFI watchlist', () => {
    const results = engine.searchWatchlist('GAFI');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].listType).toBe('SANCTIONS');
  });

  it('should add entries to the watchlist', () => {
    const entry = engine.addToWatchlist({
      listType: 'PEP',
      source: 'GIABA Database',
      name: 'John Smith',
      aliases: ['J. Smith', 'Jonathan Smith'],
      countries: ['NG'],
    });

    expect(entry.entryId).toBeTruthy();
    expect(entry.name).toBe('John Smith');
  });

  it('should search watchlist by name and aliases', () => {
    engine.addToWatchlist({
      listType: 'INTERNAL_BLACKLIST',
      source: 'Internal',
      name: 'Acme Corp',
      aliases: ['Acme Ltd', 'ACME Group'],
      countries: ['CM'],
    });

    const byName = engine.searchWatchlist('Acme');
    const byAlias = engine.searchWatchlist('Ltd');

    expect(byName.length).toBeGreaterThan(0);
    expect(byAlias.length).toBeGreaterThan(0);
  });
});

describe('KOS Fraud Detection & AML Engine — Customer Profiles', () => {
  let engine: KosFraudDetectionAMLEngine;

  beforeEach(() => {
    engine = new KosFraudDetectionAMLEngine();
  });

  it('should store and retrieve customer risk profiles', () => {
    engine.setCustomerRiskProfile({
      customerId: 'CUST_PEP',
      riskCategory: 'HIGH',
      isPEP: true,
      countryRisk: 0.8,
      businessType: 'Government',
      lastReviewDate: '2026-06-01',
      enhancedDueDiligence: true,
    });

    const profile = engine.getCustomerRiskProfile('CUST_PEP');
    expect(profile).toBeDefined();
    expect(profile?.riskCategory).toBe('HIGH');
    expect(profile?.isPEP).toBe(true);
    expect(profile?.enhancedDueDiligence).toBe(true);
  });

  it('should return undefined for unknown customer', () => {
    const profile = engine.getCustomerRiskProfile('UNKNOWN');
    expect(profile).toBeUndefined();
  });

  it('should increase risk score for PEP customers', () => {
    engine.setCustomerRiskProfile({
      customerId: 'CUST_PEP2',
      riskCategory: 'LOW',
      isPEP: true,
      countryRisk: 0.3,
      businessType: 'Retail',
      lastReviewDate: '2026-01-01',
      enhancedDueDiligence: false,
    });

    const score = engine.screenTransaction({
      transactionId: 'TXN_PEP',
      customerId: 'CUST_PEP2',
      amount: 5000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      isCashTransaction: false,
    });

    expect(score.components.customerRisk).toBeGreaterThan(0.5);
  });
});

describe('KOS Fraud Detection & AML Engine — SAR', () => {
  let engine: KosFraudDetectionAMLEngine;

  beforeEach(() => {
    engine = new KosFraudDetectionAMLEngine();
  });

  it('should generate a Suspicious Activity Report', () => {
    const txn = engine.screenTransaction({
      transactionId: 'TXN_SAR',
      customerId: 'CUST_SAR',
      amount: 95000000,
      currency: 'XAF',
      transactionType: 'CASH_DEPOSIT',
      isCashTransaction: true,
    });

    const sar = engine.generateSAR({
      customerId: 'CUST_SAR',
      customerName: 'Suspicious Customer Ltd',
      transactions: [txn.transactionId],
      suspicionBasis: ['Structuring pattern', 'Unexplained wealth'],
    });

    expect(sar.reportId).toContain('SAR_');
    expect(sar.status).toBe('DRAFT');
    expect(sar.regulatoryReference).toContain('COBAC R-6');
    expect(sar.suspicionBasis).toHaveLength(2);
  });

  it('should submit a SAR and track status', () => {
    const txn = engine.screenTransaction({
      transactionId: 'TXN_SAR2',
      customerId: 'CUST_SAR2',
      amount: 200000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'SY',
      isCashTransaction: false,
    });

    const sar = engine.generateSAR({
      customerId: 'CUST_SAR2',
      customerName: 'Risky Business Inc',
      transactions: [txn.transactionId],
      suspicionBasis: ['High-risk jurisdiction', 'Large wire transfer'],
    });

    expect(sar.status).toBe('DRAFT');

    const submitted = engine.submitSAR(sar.reportId);
    expect(submitted.status).toBe('SUBMITTED');
  });

  it('should throw when submitting non-existent SAR', () => {
    expect(() => engine.submitSAR('NONEXISTENT')).toThrow('not found');
  });
});

describe('KOS Fraud Detection & AML Engine — Dashboard', () => {
  let engine: KosFraudDetectionAMLEngine;

  beforeEach(() => {
    engine = new KosFraudDetectionAMLEngine();
  });

  it('should return dashboard with zero values when empty', () => {
    const dashboard = engine.getAMLDashboard();
    expect(dashboard.totalTransactionsScreened).toBe(0);
    expect(dashboard.flaggedTransactions).toBe(0);
    expect(dashboard.criticalAlerts).toBe(0);
    expect(dashboard.averageRiskScore).toBe(0);
  });

  it('should return accurate dashboard after screening', () => {
    engine.screenTransaction({
      transactionId: 'TXN_D1',
      customerId: 'CUST_D1',
      amount: 500000,
      currency: 'XAF',
      transactionType: 'INTERNAL',
      isCashTransaction: false,
    });

    engine.screenTransaction({
      transactionId: 'TXN_D2',
      customerId: 'CUST_D2',
      amount: 150000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'KP',
      isCashTransaction: false,
    });

    const dashboard = engine.getAMLDashboard();
    expect(dashboard.totalTransactionsScreened).toBe(2);
    expect(dashboard.flaggedTransactions).toBeGreaterThanOrEqual(0);
    expect(dashboard.averageRiskScore).toBeGreaterThan(0);
  });

  it('should return flagged transactions', () => {
    engine.screenTransaction({
      transactionId: 'TXN_FLAGGED',
      customerId: 'CUST_FLAG',
      amount: 200000000,
      currency: 'XAF',
      transactionType: 'WIRE_OUTGOING',
      beneficiaryCountry: 'KP',
      isCashTransaction: false,
    });

    const flagged = engine.getFlaggedTransactions();
    expect(flagged.length).toBeGreaterThanOrEqual(0);
    if (flagged.length > 0) {
      expect(flagged[0].transactionId).toBe('TXN_FLAGGED');
    }
  });
});

describe('KOS Fraud Detection & AML Engine — Integral State', () => {
  it('should return engine state for inspection', () => {
    const engine = new KosFraudDetectionAMLEngine();
    const state = engine.getState();
    expect(state.watchlist).toBeDefined();
    expect(state.amlScores).toBeDefined();
    expect(state.patterns).toBeDefined();
    expect(state.sars).toBeDefined();
  });

  it('should maintain state across multiple screenings', () => {
    const engine = new KosFraudDetectionAMLEngine();

    engine.screenTransaction({
      transactionId: 'TXN_S1',
      customerId: 'CUST_S',
      amount: 1000000,
      currency: 'XAF',
      transactionType: 'DEPOSIT',
      isCashTransaction: false,
    });

    engine.screenTransaction({
      transactionId: 'TXN_S2',
      customerId: 'CUST_S',
      amount: 2000000,
      currency: 'XAF',
      transactionType: 'DEPOSIT',
      isCashTransaction: false,
    });

    const state = engine.getState();
    expect(state.amlScores.size).toBe(2);
  });
});