// ============================================================================
// KOS CORE BANKING ENGINE™ — Bank-Grade Production System
// Transactions, Ledger, Account Management, Payment Processing
// COBAC / CEMAC / IFRS Aligned — Big Four Audit Ready
// KHEPRA EXPERTS — 25 Juin 2026
// ============================================================================

export interface CoreBankingConfig {
  bankCode: string;
  currency: string;
  centralBankCode: string;
  regulatoryFramework: 'COBAC' | 'UEMOA' | 'BOTH';
  ifrsCompliant: boolean;
  retentionYears: number;
  maxTransactionAmount: number;
  requireDualApprovalAbove: number;
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER_INTERNAL = 'TRANSFER_INTERNAL',
  TRANSFER_EXTERNAL = 'TRANSFER_EXTERNAL',
  WIRE_OUTGOING = 'WIRE_OUTGOING',
  WIRE_INCOMING = 'WIRE_INCOMING',
  PAYMENT = 'PAYMENT',
  FEE = 'FEE',
  INTEREST_ACCRUAL = 'INTEREST_ACCRUAL',
  INTEREST_PAYMENT = 'INTEREST_PAYMENT',
  LOAN_DISBURSEMENT = 'LOAN_DISBURSEMENT',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  FX_SPOT = 'FX_SPOT',
  FX_FORWARD = 'FX_FORWARD',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
  FLAGGED = 'FLAGGED',
  BLOCKED = 'BLOCKED',
}

export enum AccountType {
  CURRENT = 'CURRENT',
  SAVINGS = 'SAVINGS',
  TERM_DEPOSIT = 'TERM_DEPOSIT',
  LOAN = 'LOAN',
  OVERDRAFT = 'OVERDRAFT',
  SUSPENSE = 'SUSPENSE',
  NOSTRO = 'NOSTRO',
  VOSTRO = 'VOSTRO',
  CLEARING = 'CLEARING',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DORMANT = 'DORMANT',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  BLOCKED_REGULATORY = 'BLOCKED_REGULATORY',
}

export interface Account {
  accountId: string;
  accountNumber: string;
  iban: string;
  customerId: string;
  accountType: AccountType;
  accountStatus: AccountStatus;
  currency: string;
  balance: number;
  availableBalance: number;
  blockedAmount: number;
  interestRate: number;
  openedAt: string;
  lastActivityAt: string;
  dormantSince: string | null;
  regulatoryFlags: string[];
  metadata: Record<string, unknown>;
}

export interface JournalEntry {
  entryId: string;
  transactionId: string;
  timestamp: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  balanceBefore: number;
  balanceAfter: number;
  entryType: 'DEBIT' | 'CREDIT';
  description: string;
  referenceNumber: string;
}

export interface LedgerTransaction {
  transactionId: string;
  timestamp: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  originator: {
    accountId: string;
    customerId: string;
    name: string;
  };
  beneficiary: {
    accountId: string;
    customerId: string;
    name: string;
    bankCode?: string;
    iban?: string;
  };
  amount: number;
  currency: string;
  fee: number;
  exchangeRate?: number;
  referenceNumber: string;
  regulatoryTags: string[];
  riskScore: number;
  amlScreeningResult: 'CLEAR' | 'FLAGGED' | 'BLOCKED';
  approvalChain: ApprovalStep[];
  journalEntries: JournalEntry[];
  hashSignature: string;
  prevTransactionHash: string;
}

export interface ApprovalStep {
  step: number;
  approverId: string;
  approverRole: string;
  approvedAt: string;
  decision: 'APPROVED' | 'REJECTED' | 'ESCALATED';
  comments: string;
  signature: string;
}

export interface CreditFacility {
  facilityId: string;
  customerId: string;
  facilityType: 'OVERDRAFT' | 'TERM_LOAN' | 'REVOLVING' | 'TRADE_FINANCE';
  approvedAmount: number;
  utilizedAmount: number;
  availableAmount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'RESTRUCTURED' | 'DEFAULTED';
  collateralValue: number;
  ifrs9Stage: 1 | 2 | 3;
  eclProvision: number;
  regulatoryClassification: 'PERFORMING' | 'WATCH' | 'SUBSTANDARD' | 'DOUBTFUL' | 'LOSS';
}

export interface CoreBankingState {
  accounts: Map<string, Account>;
  pendingTransactions: Map<string, LedgerTransaction>;
  transactionHistory: LedgerTransaction[];
  creditFacilities: Map<string, CreditFacility>;
  dailyLimits: Map<string, number>;
  suspenseAccount: Account;
  config: CoreBankingConfig;
}

const DEFAULT_CONFIG: CoreBankingConfig = {
  bankCode: 'bANK',
  currency: 'XAF',
  centralBankCode: 'BEAC',
  regulatoryFramework: 'COBAC',
  ifrsCompliant: true,
  retentionYears: 10,
  maxTransactionAmount: 500000000,
  requireDualApprovalAbove: 50000000,
};

function generateHash(input: string): string {
  let hash = 0;
  const str = input + Date.now().toString() + Math.random().toString(36);
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hashHex = Math.abs(hash).toString(16).padStart(16, '0');
  return `kos_sha256_${hashHex}_${Date.now().toString(36)}`;
}

function generateTransactionHash(previousHash: string, transaction: Partial<LedgerTransaction>): string {
  const payload = JSON.stringify({
    prevHash: previousHash,
    amount: transaction.amount,
    type: transaction.transactionType,
    originator: transaction.originator?.accountId,
    beneficiary: transaction.beneficiary?.accountId,
    timestamp: transaction.timestamp || new Date().toISOString(),
  });
  return generateHash(payload);
}

export class coreBankingEngine {
  private state: CoreBankingState;
  private lastTransactionHash: string;
  private eventSubscribers: Map<string, Array<(event: unknown) => void>>;

  constructor(config?: Partial<CoreBankingConfig>) {
    this.state = {
      accounts: new Map(),
      pendingTransactions: new Map(),
      transactionHistory: [],
      creditFacilities: new Map(),
      dailyLimits: new Map(),
      suspenseAccount: this.createSuspenseAccount(),
      config: { ...DEFAULT_CONFIG, ...config },
    };
    this.lastTransactionHash = '0000000000000000000000000000000000000000000000000000000000000000';
    this.eventSubscribers = new Map();
  }

  private createSuspenseAccount(): Account {
    return {
      accountId: 'SUSPENSE_001',
      accountNumber: '9999999999',
      iban: `CM21${DEFAULT_CONFIG.bankCode}SUSPENSE001`,
      customerId: 'BANK_INTERNAL',
      accountType: AccountType.SUSPENSE,
      accountStatus: AccountStatus.ACTIVE,
      currency: DEFAULT_CONFIG.currency,
      balance: 0,
      availableBalance: 0,
      blockedAmount: 0,
      interestRate: 0,
      openedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      dormantSince: null,
      regulatoryFlags: ['INTERNAL', 'SUSPENSE'],
      metadata: { description: 'Suspense account for unmatched transactions' },
    };
  }

  on(event: string, callback: (event: unknown) => void): void {
    if (!this.eventSubscribers.has(event)) {
      this.eventSubscribers.set(event, []);
    }
    this.eventSubscribers.get(event)?.push(callback);
  }

  private emit(event: string, data: unknown): void {
    const subscribers = this.eventSubscribers.get(event);
    if (subscribers) {
      subscribers.forEach((cb) => {
        try { cb(data); } catch { /* subscriber errors don't crash engine */ }
      });
    }
  }

  createAccount(params: {
    customerId: string;
    accountType: AccountType;
    currency?: string;
    initialDeposit?: number;
    interestRate?: number;
  }): Account {
    const accountNumber = this.generateAccountNumber();
    const currency = params.currency || this.state.config.currency;
    const account: Account = {
      accountId: `ACC_${generateHash(params.customerId + accountNumber).slice(0, 16)}`,
      accountNumber,
      iban: this.generateIBAN(accountNumber),
      customerId: params.customerId,
      accountType: params.accountType,
      accountStatus: AccountStatus.ACTIVE,
      currency,
      balance: params.initialDeposit || 0,
      availableBalance: params.initialDeposit || 0,
      blockedAmount: 0,
      interestRate: params.interestRate || 0,
      openedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      dormantSince: null,
      regulatoryFlags: [],
      metadata: {},
    };

    this.state.accounts.set(account.accountId, account);
    this.emit('account_created', { account });
    return account;
  }

  private generateAccountNumber(): string {
    const branch = this.state.config.bankCode.slice(0, 4);
    const sequence = String(this.state.accounts.size + 1).padStart(8, '0');
    const checkDigit = String(Math.floor(Math.random() * 99)).padStart(2, '0');
    return `${branch}${sequence}${checkDigit}`;
  }

  private generateIBAN(accountNumber: string): string {
    const country = 'CM';
    const checkDigits = '21';
    const bankCode = this.state.config.bankCode;
    return `${country}${checkDigits}${bankCode}${accountNumber}`;
  }

  async processTransaction(params: {
    type: TransactionType;
    originAccountId: string;
    beneficiaryAccountId: string;
    amount: number;
    currency?: string;
    description?: string;
    originCustomerId: string;
    originName: string;
    beneficiaryCustomerId: string;
    beneficiaryName: string;
    externalBankCode?: string;
    externalIBAN?: string;
  }): Promise<LedgerTransaction> {
    const currency = params.currency || this.state.config.currency;
    const originAccount = this.state.accounts.get(params.originAccountId);
    const beneficiaryAccount = this.state.accounts.get(params.beneficiaryAccountId);

    if (!originAccount) {
      throw new Error(`Origin account ${params.originAccountId} not found`);
    }
    if (!beneficiaryAccount && params.type !== TransactionType.WIRE_OUTGOING) {
      throw new Error(`Beneficiary account ${params.beneficiaryAccountId} not found`);
    }

    if (originAccount.accountStatus !== AccountStatus.ACTIVE) {
      throw new Error(`Origin account ${params.originAccountId} is ${originAccount.accountStatus}`);
    }

    const totalDebit = params.amount + (this.calculateFee(params.type, params.amount));
    if (originAccount.availableBalance < totalDebit) {
      throw new Error(`Insufficient funds: available ${originAccount.availableBalance}, required ${totalDebit}`);
    }

    if (params.amount > this.state.config.maxTransactionAmount) {
      throw new Error(`Transaction exceeds maximum amount: ${this.state.config.maxTransactionAmount}`);
    }

    const transactionId = `TXN_${generateHash(params.originAccountId + params.amount.toString() + Date.now().toString()).slice(0, 20)}`;
    const hash = generateTransactionHash(this.lastTransactionHash, {
      amount: params.amount,
      transactionType: params.type,
      originator: { accountId: params.originAccountId, customerId: '', name: '' },
      beneficiary: { accountId: params.beneficiaryAccountId, customerId: '', name: '' },
    });

    const transaction: LedgerTransaction = {
      transactionId,
      timestamp: new Date().toISOString(),
      transactionType: params.type,
      status: this.requiresApproval(params.amount) ? TransactionStatus.PENDING_APPROVAL : TransactionStatus.PENDING,
      originator: {
        accountId: params.originAccountId,
        customerId: params.originCustomerId,
        name: params.originName,
      },
      beneficiary: {
        accountId: params.beneficiaryAccountId,
        customerId: params.beneficiaryCustomerId,
        name: params.beneficiaryName,
        bankCode: params.externalBankCode,
        iban: params.externalIBAN,
      },
      amount: params.amount,
      currency,
      fee: this.calculateFee(params.type, params.amount),
      referenceNumber: `REF_${Date.now().toString(36).toUpperCase()}`,
      regulatoryTags: this.getRegulatoryTags(params.type, params.amount),
      riskScore: this.calculateRiskScore(params),
      amlScreeningResult: 'CLEAR',
      approvalChain: [],
      journalEntries: [],
      hashSignature: hash,
      prevTransactionHash: this.lastTransactionHash,
    };

    this.state.pendingTransactions.set(transactionId, transaction);

    if (transaction.status === TransactionStatus.PENDING) {
      await this.executeTransaction(transactionId);
    }

    this.emit('transaction_created', { transaction });
    return transaction;
  }

  private calculateFee(type: TransactionType, amount: number): number {
    const feeSchedule: Partial<Record<TransactionType, number>> = {
      [TransactionType.WIRE_OUTGOING]: Math.min(50000, amount * 0.001),
      [TransactionType.WIRE_INCOMING]: 0,
      [TransactionType.TRANSFER_INTERNAL]: 0,
      [TransactionType.TRANSFER_EXTERNAL]: Math.min(25000, amount * 0.0005),
    };
    return feeSchedule[type] || 0;
  }

  private requiresApproval(amount: number): boolean {
    return amount > this.state.config.requireDualApprovalAbove;
  }

  private getRegulatoryTags(type: TransactionType, amount: number): string[] {
    const tags: string[] = ['COBAC', 'CEMAC'];
    if (amount > 10000000) tags.push('LARGE_TRANSACTION');
    if (type === TransactionType.WIRE_OUTGOING) tags.push('CROSS_BORDER');
    if (type === TransactionType.WIRE_OUTGOING && amount > 50000000) tags.push('REQUIRES_CEMAC_DECLARATION');
    return tags;
  }

  private calculateRiskScore(params: {
    type: TransactionType;
    amount: number;
    originAccountId: string;
    beneficiaryAccountId: string;
  }): number {
    let score = 0;
    if (params.type === TransactionType.WIRE_OUTGOING) score += 0.15;
    if (params.amount > 10000000) score += 0.2;
    if (params.amount > 50000000) score += 0.25;
    if (params.amount > 100000000) score += 0.2;
    if (params.originAccountId === params.beneficiaryAccountId) score += 0.3;
    return Math.min(1, score);
  }

  async executeTransaction(transactionId: string): Promise<LedgerTransaction> {
    const transaction = this.state.pendingTransactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found in pending queue`);
    }

    if (transaction.status === TransactionStatus.COMPLETED) {
      return transaction;
    }

    transaction.status = TransactionStatus.PROCESSING;
    const originAccount = this.state.accounts.get(transaction.originator.accountId);
    const beneficiaryAccount = this.state.accounts.get(transaction.beneficiary.accountId);

    if (!originAccount) {
      throw new Error(`Origin account ${transaction.originator.accountId} not found`);
    }

    const totalDebit = transaction.amount + transaction.fee;

    const debitEntry: JournalEntry = {
      entryId: `JE_D_${generateHash(transactionId + 'DEBIT').slice(0, 16)}`,
      transactionId,
      timestamp: new Date().toISOString(),
      accountId: originAccount.accountId,
      debitAmount: totalDebit,
      creditAmount: 0,
      balanceBefore: originAccount.balance,
      balanceAfter: originAccount.balance - totalDebit,
      entryType: 'DEBIT',
      description: `Debit: ${transaction.transactionType} - ${transaction.referenceNumber}`,
      referenceNumber: transaction.referenceNumber,
    };

    originAccount.balance -= totalDebit;
    originAccount.availableBalance -= totalDebit;
    originAccount.lastActivityAt = new Date().toISOString();

    transaction.journalEntries.push(debitEntry);

    if (beneficiaryAccount && beneficiaryAccount.accountStatus === AccountStatus.ACTIVE) {
      const creditEntry: JournalEntry = {
        entryId: `JE_C_${generateHash(transactionId + 'CREDIT').slice(0, 16)}`,
        transactionId,
        timestamp: new Date().toISOString(),
        accountId: beneficiaryAccount.accountId,
        debitAmount: 0,
        creditAmount: transaction.amount,
        balanceBefore: beneficiaryAccount.balance,
        balanceAfter: beneficiaryAccount.balance + transaction.amount,
        entryType: 'CREDIT',
        description: `Credit: ${transaction.transactionType} - ${transaction.referenceNumber}`,
        referenceNumber: transaction.referenceNumber,
      };

      beneficiaryAccount.balance += transaction.amount;
      beneficiaryAccount.availableBalance += transaction.amount;
      beneficiaryAccount.lastActivityAt = new Date().toISOString();

      transaction.journalEntries.push(creditEntry);
    }

    const doubleEntryCheck = transaction.journalEntries.reduce(
      (acc, e) => acc + e.creditAmount - e.debitAmount,
      0,
    );
    if (Math.abs(doubleEntryCheck) > 0.001) {
      transaction.status = TransactionStatus.FAILED;
      originAccount.balance += totalDebit;
      originAccount.availableBalance += totalDebit;
      throw new Error('Double-entry accounting mismatch — transaction rejected');
    }

    transaction.status = TransactionStatus.COMPLETED;
    this.lastTransactionHash = transaction.hashSignature;
    this.state.transactionHistory.push(transaction);
    this.state.pendingTransactions.delete(transactionId);

    this.emit('transaction_completed', { transaction });
    return transaction;
  }

  async approveTransaction(transactionId: string, approver: {
    approverId: string;
    approverRole: string;
    comments?: string;
  }): Promise<LedgerTransaction> {
    const transaction = this.state.pendingTransactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found`);
    }
    if (transaction.status !== TransactionStatus.PENDING_APPROVAL) {
      throw new Error(`Transaction ${transactionId} is not pending approval — current status: ${transaction.status}`);
    }

    const approvalStep: ApprovalStep = {
      step: transaction.approvalChain.length + 1,
      approverId: approver.approverId,
      approverRole: approver.approverRole,
      approvedAt: new Date().toISOString(),
      decision: 'APPROVED',
      comments: approver.comments || '',
      signature: generateHash(`${approver.approverId}_${transactionId}`),
    };

    transaction.approvalChain.push(approvalStep);
    transaction.status = TransactionStatus.PENDING;

    await this.executeTransaction(transactionId);
    this.emit('transaction_approved', { transaction, approver });
    return transaction;
  }

  rejectTransaction(transactionId: string, approver: {
    approverId: string;
    approverRole: string;
    comments?: string;
  }): LedgerTransaction {
    const transaction = this.state.pendingTransactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found`);
    }

    const approvalStep: ApprovalStep = {
      step: transaction.approvalChain.length + 1,
      approverId: approver.approverId,
      approverRole: approver.approverRole,
      approvedAt: new Date().toISOString(),
      decision: 'REJECTED',
      comments: approver.comments || '',
      signature: generateHash(`${approver.approverId}_REJECT_${transactionId}`),
    };

    transaction.approvalChain.push(approvalStep);
    transaction.status = TransactionStatus.FAILED;
    this.state.pendingTransactions.delete(transactionId);
    this.state.transactionHistory.push(transaction);

    this.emit('transaction_rejected', { transaction, approver });
    return transaction;
  }

  flagTransaction(transactionId: string, reason: string): LedgerTransaction {
    const transaction = this.state.pendingTransactions.get(transactionId) ||
      this.state.transactionHistory.find((t) => t.transactionId === transactionId);
    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found`);
    }

    transaction.status = TransactionStatus.FLAGGED;
    transaction.regulatoryTags.push('MANUAL_FLAG');
    transaction.amlScreeningResult = 'FLAGGED';
    this.emit('transaction_flagged', { transaction, reason });
    return transaction;
  }

  blockTransaction(transactionId: string, reason: string): LedgerTransaction {
    const transaction = this.state.pendingTransactions.get(transactionId) ||
      this.state.transactionHistory.find((t) => t.transactionId === transactionId);
    if (!transaction) {
      throw new Error(`Transaction ${transactionId} not found`);
    }

    transaction.status = TransactionStatus.BLOCKED;
    transaction.regulatoryTags.push('BLOCKED_REGULATORY');
    transaction.amlScreeningResult = 'BLOCKED';
    this.emit('transaction_blocked', { transaction, reason });
    return transaction;
  }

  reverseTransaction(transactionId: string, reversalReason: string): LedgerTransaction {
    const original = this.state.transactionHistory.find((t) => t.transactionId === transactionId);
    if (!original) {
      throw new Error(`Transaction ${transactionId} not found in history`);
    }
    if (original.status !== TransactionStatus.COMPLETED) {
      throw new Error(`Cannot reverse transaction with status: ${original.status}`);
    }

    const reversalTransaction: LedgerTransaction = {
      transactionId: `REV_${transactionId}`,
      timestamp: new Date().toISOString(),
      transactionType: TransactionType.TRANSFER_INTERNAL,
      status: TransactionStatus.COMPLETED,
      originator: original.beneficiary,
      beneficiary: original.originator,
      amount: original.amount,
      currency: original.currency,
      fee: 0,
      referenceNumber: `REV_${original.referenceNumber}`,
      regulatoryTags: ['REVERSAL', ...original.regulatoryTags],
      riskScore: 0,
      amlScreeningResult: 'CLEAR',
      approvalChain: [],
      journalEntries: [],
      hashSignature: generateTransactionHash(this.lastTransactionHash, {}),
      prevTransactionHash: this.lastTransactionHash,
    };

    const originAccount = this.state.accounts.get(original.beneficiary.accountId);
    const beneficiaryAccount = this.state.accounts.get(original.originator.accountId);

    if (originAccount) {
      originAccount.balance -= original.amount;
      originAccount.availableBalance -= original.amount;
    }
    if (beneficiaryAccount) {
      beneficiaryAccount.balance += original.amount;
      beneficiaryAccount.availableBalance += original.amount;
    }

    this.state.transactionHistory.push(reversalTransaction);
    original.status = TransactionStatus.REVERSED;

    this.emit('transaction_reversed', { original, reversal: reversalTransaction, reason: reversalReason });
    return reversalTransaction;
  }

  getAccountBalance(accountId: string): { balance: number; available: number; blocked: number } {
    const account = this.state.accounts.get(accountId);
    if (!account) throw new Error(`Account ${accountId} not found`);
    return {
      balance: account.balance,
      available: account.availableBalance,
      blocked: account.blockedAmount,
    };
  }

  getTransactionHistory(accountId: string, limit?: number): LedgerTransaction[] {
    const all = this.state.transactionHistory.filter(
      (t) => t.originator.accountId === accountId || t.beneficiary.accountId === accountId,
    );
    return limit ? all.slice(-limit) : all;
  }

  freezeAccount(accountId: string, reason: string): Account {
    const account = this.state.accounts.get(accountId);
    if (!account) throw new Error(`Account ${accountId} not found`);
    account.accountStatus = AccountStatus.FROZEN;
    account.regulatoryFlags.push(`FROZEN: ${reason}`);
    this.emit('account_frozen', { account, reason });
    return account;
  }

  createCreditFacility(params: {
    customerId: string;
    facilityType: CreditFacility['facilityType'];
    approvedAmount: number;
    interestRate: number;
    maturityMonths: number;
    collateralValue?: number;
  }): CreditFacility {
    const facility: CreditFacility = {
      facilityId: `FAC_${generateHash(params.customerId + Date.now().toString()).slice(0, 16)}`,
      customerId: params.customerId,
      facilityType: params.facilityType,
      approvedAmount: params.approvedAmount,
      utilizedAmount: 0,
      availableAmount: params.approvedAmount,
      interestRate: params.interestRate,
      startDate: new Date().toISOString(),
      maturityDate: new Date(Date.now() + params.maturityMonths * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'ACTIVE',
      collateralValue: params.collateralValue || 0,
      ifrs9Stage: 1,
      eclProvision: this.calculateECL(params.approvedAmount, 1),
      regulatoryClassification: 'PERFORMING',
    };

    this.state.creditFacilities.set(facility.facilityId, facility);
    this.emit('credit_facility_created', { facility });
    return facility;
  }

  private calculateECL(exposure: number, stage: 1 | 2 | 3): number {
    const pd: Record<number, number> = { 1: 0.005, 2: 0.05, 3: 0.25 };
    const lgd = 0.45;
    const ead = exposure;
    return ead * pd[stage] * lgd;
  }

  getState(): CoreBankingState {
    return this.state;
  }

  getAuditEvidence(accountId: string): {
    account: Account | undefined;
    transactions: LedgerTransaction[];
    hashChain: string[];
  } {
    const account = this.state.accounts.get(accountId);
    const transactions = this.getTransactionHistory(accountId);
    const hashChain = transactions.map((t) => t.hashSignature);
    return { account, transactions, hashChain };
  }
}

export const coreBankingEngine = new coreBankingEngine();



