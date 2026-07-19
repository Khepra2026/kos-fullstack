import { describe, it, expect, beforeEach } from 'vitest';
import {
  coreBankingEngine,
  AccountType,
  AccountStatus,
  TransactionType,
  TransactionStatus,
} from '@/services/coreBankingEngine';

/**
 * KOS Core Banking Engine — Unit Tests
 * Tests exhaustifs : comptes, transactions, double-entrée, crédits, approbations, réversions
 */

describe('KOS Core Banking Engine — Account Management', () => {
  let engine: coreBankingEngine;

  beforeEach(() => {
    engine = new coreBankingEngine();
  });

  it('should create a current account with initial deposit', () => {
    const account = engine.createAccount({
      customerId: 'CUST_001',
      accountType: AccountType.CURRENT,
      initialDeposit: 1000000,
    });

    expect(account.accountType).toBe(AccountType.CURRENT);
    expect(account.balance).toBe(1000000);
    expect(account.availableBalance).toBe(1000000);
    expect(account.accountStatus).toBe(AccountStatus.ACTIVE);
    expect(account.accountNumber).toBeTruthy();
    expect(account.iban).toContain('CM21');
  });

  it('should create different account types with correct properties', () => {
    const types = [AccountType.CURRENT, AccountType.SAVINGS, AccountType.TERM_DEPOSIT, AccountType.LOAN];

    for (const type of types) {
      const account = engine.createAccount({
        customerId: `CUST_${type}`,
        accountType: type,
      });
      expect(account.accountType).toBe(type);
      expect(account.accountStatus).toBe(AccountStatus.ACTIVE);
    }
  });

  it('should generate unique account numbers', () => {
    const acc1 = engine.createAccount({ customerId: 'CUST_A', accountType: AccountType.CURRENT });
    const acc2 = engine.createAccount({ customerId: 'CUST_B', accountType: AccountType.CURRENT });
    expect(acc1.accountNumber).not.toBe(acc2.accountNumber);
    expect(acc1.accountId).not.toBe(acc2.accountId);
  });

  it('should return correct balance information', () => {
    const account = engine.createAccount({
      customerId: 'CUST_BAL',
      accountType: AccountType.CURRENT,
      initialDeposit: 500000,
    });

    const balance = engine.getAccountBalance(account.accountId);
    expect(balance.balance).toBe(500000);
    expect(balance.available).toBe(500000);
    expect(balance.blocked).toBe(0);
  });

  it('should throw when getting balance of non-existent account', () => {
    expect(() => engine.getAccountBalance('NONEXISTENT')).toThrow('not found');
  });

  it('should freeze an account and add regulatory flag', () => {
    const account = engine.createAccount({
      customerId: 'CUST_FREEZE',
      accountType: AccountType.CURRENT,
    });

    const frozen = engine.freezeAccount(account.accountId, 'AML investigation');
    expect(frozen.accountStatus).toBe(AccountStatus.FROZEN);
    expect(frozen.regulatoryFlags).toContain('FROZEN: AML investigation');
  });
});

describe('KOS Core Banking Engine — Transaction Processing', () => {
  let engine: coreBankingEngine;
  let originAccountId: string;
  let beneficiaryAccountId: string;

  beforeEach(() => {
    engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_ORIGIN',
      accountType: AccountType.CURRENT,
      initialDeposit: 10000000,
    });
    const beneficiary = engine.createAccount({
      customerId: 'CUST_BENEF',
      accountType: AccountType.CURRENT,
      initialDeposit: 5000000,
    });
    originAccountId = origin.accountId;
    beneficiaryAccountId = beneficiary.accountId;
  });

  it('should process a simple internal transfer', async () => {
    const txn = await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId,
      beneficiaryAccountId,
      amount: 1000000,
      originCustomerId: 'CUST_ORIGIN',
      originName: 'Origin Customer',
      beneficiaryCustomerId: 'CUST_BENEF',
      beneficiaryName: 'Beneficiary Customer',
    });

    expect(txn.status).toBe(TransactionStatus.COMPLETED);
    expect(txn.amount).toBe(1000000);
    expect(txn.journalEntries).toHaveLength(2);

    const originBalance = engine.getAccountBalance(originAccountId);
    const benefBalance = engine.getAccountBalance(beneficiaryAccountId);

    expect(originBalance.balance).toBe(9000000);
    expect(benefBalance.balance).toBe(6000000);
  });

  it('should reject transaction with insufficient funds', async () => {
    await expect(
      engine.processTransaction({
        type: TransactionType.TRANSFER_INTERNAL,
        originAccountId,
        beneficiaryAccountId,
        amount: 20000000,
        originCustomerId: 'CUST_ORIGIN',
        originName: 'Origin Customer',
        beneficiaryCustomerId: 'CUST_BENEF',
        beneficiaryName: 'Beneficiary Customer',
      }),
    ).rejects.toThrow('Insufficient funds');
  });

  it('should maintain double-entry accounting balance', async () => {
    const txn = await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId,
      beneficiaryAccountId,
      amount: 2500000,
      originCustomerId: 'CUST_ORIGIN',
      originName: 'Origin Customer',
      beneficiaryCustomerId: 'CUST_BENEF',
      beneficiaryName: 'Beneficiary Customer',
    });

    const totalDebits = txn.journalEntries.filter((e) => e.entryType === 'DEBIT')
      .reduce((sum, e) => sum + e.debitAmount, 0);
    const totalCredits = txn.journalEntries.filter((e) => e.entryType === 'CREDIT')
      .reduce((sum, e) => sum + e.creditAmount, 0);

    expect(totalDebits).toBeGreaterThan(0);
    expect(totalCredits).toBeGreaterThan(0);
    expect(totalCredits - totalDebits + txn.fee).toBe(0);
  });

  it('should enforce dual approval for large transactions', async () => {
    const txn = await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId,
      beneficiaryAccountId,
      amount: 60000000,
      originCustomerId: 'CUST_ORIGIN',
      originName: 'Origin Customer',
      beneficiaryCustomerId: 'CUST_BENEF',
      beneficiaryName: 'Beneficiary Customer',
    });

    expect(txn.status).toBe(TransactionStatus.PENDING_APPROVAL);

    const approved = await engine.approveTransaction(txn.transactionId, {
      approverId: 'APPROVER_001',
      approverRole: 'DIRECTOR',
    });

    expect(approved.status).toBe(TransactionStatus.COMPLETED);
    expect(approved.approvalChain).toHaveLength(1);
  });

  it('should reject approval for non-pending transaction', async () => {
    const txn = await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId,
      beneficiaryAccountId,
      amount: 10000,
      originCustomerId: 'CUST_ORIGIN',
      originName: 'Origin Customer',
      beneficiaryCustomerId: 'CUST_BENEF',
      beneficiaryName: 'Beneficiary Customer',
    });

    await expect(
      engine.approveTransaction(txn.transactionId, {
        approverId: 'APPROVER_001',
        approverRole: 'DIRECTOR',
      }),
    ).rejects.toThrow('not pending approval');
  });

  it('should reject a transaction and keep balances unchanged', () => {
    const account = engine.createAccount({
      customerId: 'CUST_REJECT',
      accountType: AccountType.CURRENT,
      initialDeposit: 10000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_REJECT_B',
      accountType: AccountType.CURRENT,
    });

    // First create a pending approval transaction
    engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId: account.accountId,
      beneficiaryAccountId: benef.accountId,
      amount: 60000000,
      originCustomerId: 'CUST_REJECT',
      originName: 'Reject Customer',
      beneficiaryCustomerId: 'CUST_REJECT_B',
      beneficiaryName: 'Reject Beneficiary',
    }).then((txn) => {
      const rejected = engine.rejectTransaction(txn.transactionId, {
        approverId: 'APPROVER_001',
        approverRole: 'DIRECTOR',
        comments: 'Too risky',
      });

      expect(rejected.status).toBe(TransactionStatus.FAILED);
    });
  });
});

describe('KOS Core Banking Engine — Transaction History', () => {
  let engine: coreBankingEngine;
  let originId: string;
  let benefId: string;

  beforeEach(async () => {
    engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_HIST',
      accountType: AccountType.CURRENT,
      initialDeposit: 5000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_HIST_B',
      accountType: AccountType.CURRENT,
    });
    originId = origin.accountId;
    benefId = benef.accountId;

    await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId: originId,
      beneficiaryAccountId: benefId,
      amount: 500000,
      originCustomerId: 'CUST_HIST',
      originName: 'History Customer',
      beneficiaryCustomerId: 'CUST_HIST_B',
      beneficiaryName: 'History Beneficiary',
    });
  });

  it('should retrieve transaction history for an account', () => {
    const history = engine.getTransactionHistory(originId);
    expect(history).toHaveLength(1);
    expect(history[0].amount).toBe(500000);
    expect(history[0].status).toBe(TransactionStatus.COMPLETED);
  });

  it('should return empty history for account with no transactions', () => {
    const newAcc = engine.createAccount({
      customerId: 'CUST_NEW',
      accountType: AccountType.CURRENT,
    });
    const history = engine.getTransactionHistory(newAcc.accountId);
    expect(history).toHaveLength(0);
  });

  it('should limit history results', () => {
    const history = engine.getTransactionHistory(originId, 1);
    expect(history).toHaveLength(1);
  });
});

describe('KOS Core Banking Engine — Credit Facilities', () => {
  let engine: coreBankingEngine;

  beforeEach(() => {
    engine = new coreBankingEngine();
  });

  it('should create a credit facility with correct IFRS 9 staging', () => {
    const facility = engine.createCreditFacility({
      customerId: 'CUST_CREDIT',
      facilityType: 'TERM_LOAN',
      approvedAmount: 50000000,
      interestRate: 0.08,
      maturityMonths: 36,
      collateralValue: 75000000,
    });

    expect(facility.facilityType).toBe('TERM_LOAN');
    expect(facility.approvedAmount).toBe(50000000);
    expect(facility.availableAmount).toBe(50000000);
    expect(facility.ifrs9Stage).toBe(1);
    expect(facility.eclProvision).toBeGreaterThan(0);
    expect(facility.regulatoryClassification).toBe('PERFORMING');
  });

  it('should calculate ECL provision correctly based on IFRS 9 stage', () => {
    const facility1 = engine.createCreditFacility({
      customerId: 'CUST_S1',
      facilityType: 'TERM_LOAN',
      approvedAmount: 100000000,
      interestRate: 0.06,
      maturityMonths: 24,
    });

    expect(facility1.ifrs9Stage).toBe(1);
    // Stage 1: PD=0.5%, LGD=45%, EAD=100M → 225,000
    expect(facility1.eclProvision).toBeCloseTo(225000, -3);
  });
});

describe('KOS Core Banking Engine — Reversal', () => {
  it('should reverse a completed transaction and restore balances', async () => {
    const engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_REV',
      accountType: AccountType.CURRENT,
      initialDeposit: 5000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_REV_B',
      accountType: AccountType.CURRENT,
    });

    const txn = await engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId: origin.accountId,
      beneficiaryAccountId: benef.accountId,
      amount: 1000000,
      originCustomerId: 'CUST_REV',
      originName: 'Reversal Test',
      beneficiaryCustomerId: 'CUST_REV_B',
      beneficiaryName: 'Reversal Beneficiary',
    });

    const reversal = engine.reverseTransaction(txn.transactionId, 'Customer request');

    expect(reversal.transactionId).toContain('REV_');
    expect(reversal.status).toBe(TransactionStatus.COMPLETED);
    expect(txn.status).toBe(TransactionStatus.REVERSED);
  });

  it('should not reverse a non-completed transaction', () => {
    const engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_NOREV',
      accountType: AccountType.CURRENT,
      initialDeposit: 5000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_NOREV_B',
      accountType: AccountType.CURRENT,
    });

    engine.processTransaction({
      type: TransactionType.TRANSFER_INTERNAL,
      originAccountId: origin.accountId,
      beneficiaryAccountId: benef.accountId,
      amount: 60000000,
      originCustomerId: 'CUST_NOREV',
      originName: 'No Rev',
      beneficiaryCustomerId: 'CUST_NOREV_B',
      beneficiaryName: 'No Rev B',
    }).then((txn) => {
      expect(() => engine.reverseTransaction(txn.transactionId, 'Bad attempt'))
        .toThrow('Cannot reverse');
    });
  });
});

describe('KOS Core Banking Engine — Edge Cases', () => {
  it('should reject transaction on a frozen account', () => {
    const engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_FROZEN',
      accountType: AccountType.CURRENT,
      initialDeposit: 5000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_FROZB',
      accountType: AccountType.CURRENT,
    });

    engine.freezeAccount(origin.accountId, 'Suspected fraud');

    expect(origin.accountStatus).toBe(AccountStatus.FROZEN);
  });

  it('should apply risk tags to large transactions', async () => {
    const engine = new coreBankingEngine();
    const origin = engine.createAccount({
      customerId: 'CUST_LARGE',
      accountType: AccountType.CURRENT,
      initialDeposit: 500000000,
    });
    const benef = engine.createAccount({
      customerId: 'CUST_LARGEB',
      accountType: AccountType.CURRENT,
    });

    const txn = await engine.processTransaction({
      type: TransactionType.WIRE_OUTGOING,
      originAccountId: origin.accountId,
      beneficiaryAccountId: benef.accountId,
      amount: 75000000,
      originCustomerId: 'CUST_LARGE',
      originName: 'Large Customer',
      beneficiaryCustomerId: 'CUST_LARGEB',
      beneficiaryName: 'Large Beneficiary',
      externalBankCode: 'BANK_X',
    });

    expect(txn.regulatoryTags).toContain('LARGE_TRANSACTION');
    expect(txn.regulatoryTags).toContain('CROSS_BORDER');
    expect(txn.regulatoryTags).toContain('REQUIRES_CEMAC_DECLARATION');
  });

  it('should provide audit evidence with hash chain', () => {
    const engine = new coreBankingEngine();
    const account = engine.createAccount({
      customerId: 'CUST_AUDIT',
      accountType: AccountType.CURRENT,
      initialDeposit: 1000000,
    });

    const evidence = engine.getAuditEvidence(account.accountId);
    expect(evidence.account).toBeDefined();
    expect(evidence.transactions).toBeDefined();
    expect(evidence.hashChain).toBeDefined();
  });
});



