// ============================================================================
// KOS FRAUD DETECTION & AML ENGINE™ — Real-Time Bank-Grade
// Transaction Monitoring, Suspicious Pattern Detection, Watchlist Screening
// COBAC R-6 LCB/FT / GAFI / FATF Aligned
// KHEPRA EXPERTS — 25 Juin 2026
// ============================================================================

export interface AMLScore {
  scoreId: string;
  transactionId: string;
  calculatedAt: string;
  overallScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  components: {
    amountAnomaly: number;
    geographicRisk: number;
    customerRisk: number;
    patternRisk: number;
    velocityRisk: number;
    watchlistMatch: number;
  };
  flags: AMLFlag[];
  recommendation: 'CLEAR' | 'REVIEW' | 'BLOCK' | 'REPORT';
}

export interface AMLFlag {
  flagId: string;
  type: 'AMOUNT_THRESHOLD' | 'STRUCTURING' | 'RAPID_MOVEMENT' | 'HIGH_RISK_GEOGRAPHY' | 'WATCHLIST_MATCH' | 'UNUSUAL_PATTERN' | 'PEP_INVOLVEMENT' | 'SANCTIONS_MATCH';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  triggeredAt: string;
}

export interface WatchlistEntry {
  entryId: string;
  listType: 'SANCTIONS' | 'PEP' | 'ADVERSE_MEDIA' | 'INTERNAL_BLACKLIST' | 'ENFORCEMENT';
  source: string;
  name: string;
  aliases: string[];
  countries: string[];
  dateOfBirth?: string;
  idNumber?: string;
  addedAt: string;
  expiresAt?: string;
}

export interface TransactionPattern {
  patternId: string;
  customerId: string;
  patternType: 'STRUCTURING' | 'SMURFING' | 'LAYERING' | 'ROUND_TRIPPING' | 'TRADE_BASED_ML' | 'SHELL_COMPANY' | 'RAPID_FLOW_THROUGH';
  detectedAt: string;
  transactions: string[];
  totalAmount: number;
  confidence: number;
  status: 'MONITORING' | 'ESCALATED' | 'REPORTED' | 'DISMISSED';
}

export interface SuspiciousActivityReport {
  reportId: string;
  generatedAt: string;
  reportingEntity: string;
  customerId: string;
  customerName: string;
  transactions: string[];
  totalSuspiciousAmount: number;
  suspicionBasis: string[];
  riskScore: number;
  patternType: string;
  status: 'DRAFT' | 'SUBMITTED' | 'ACKNOWLEDGED';
  regulatoryReference: string;
}

interface FraudDetectionState {
  watchlist: Map<string, WatchlistEntry>;
  amlScores: Map<string, AMLScore>;
  patterns: Map<string, TransactionPattern>;
  sars: SuspiciousActivityReport[];
  customerProfiles: Map<string, CustomerRiskProfile>;
  flaggedTransactions: Set<string>;
}

interface CustomerRiskProfile {
  customerId: string;
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH';
  isPEP: boolean;
  countryRisk: number;
  businessType: string;
  lastReviewDate: string;
  enhancedDueDiligence: boolean;
}

const HIGH_RISK_COUNTRIES = new Set([
  'KP', 'IR', 'SY', 'CU', 'VE', 'MM', 'AF',
]);

const AMOUNT_THRESHOLDS = {
  CASH_DEPOSIT_DAILY: 10000000,
  CASH_DEPOSIT_MONTHLY: 50000000,
  WIRE_OUTGOING_SINGLE: 50000000,
  WIRE_OUTGOING_DAILY: 100000000,
  STRUCTURING_NEAR_THRESHOLD: 9500000,
};

function generateAmlId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export class KosFraudDetectionAMLEngine {
  private state: FraudDetectionState;
  private recentTransactions: Array<{
    customerId: string;
    amount: number;
    timestamp: number;
    transactionId: string;
  }>;

  constructor() {
    this.state = {
      watchlist: new Map(),
      amlScores: new Map(),
      patterns: new Map(),
      sars: [],
      customerProfiles: new Map(),
      flaggedTransactions: new Set(),
    };
    this.recentTransactions = [];
    this.initializeDefaultWatchlist();
  }

  private initializeDefaultWatchlist(): void {
    const entries: WatchlistEntry[] = [
      {
        entryId: 'WL_GAFI_001',
        listType: 'SANCTIONS',
        source: 'GAFI High-Risk Jurisdictions',
        name: 'High-Risk Jurisdiction Entities',
        aliases: [],
        countries: Array.from(HIGH_RISK_COUNTRIES),
        addedAt: new Date().toISOString(),
      },
      {
        entryId: 'WL_INTERNAL_001',
        listType: 'INTERNAL_BLACKLIST',
        source: 'KOS Internal Risk Database',
        name: 'Previously Flagged Entities',
        aliases: [],
        countries: [],
        addedAt: new Date().toISOString(),
      },
    ];

    entries.forEach((entry) => this.state.watchlist.set(entry.entryId, entry));
  }

  // ============================================================================
  // AML SCREENING — Real-Time Transaction Scoring
  // ============================================================================

  screenTransaction(params: {
    transactionId: string;
    customerId: string;
    amount: number;
    currency: string;
    transactionType: string;
    beneficiaryCountry?: string;
    originCountry?: string;
    isCashTransaction: boolean;
  }): AMLScore {
    const components = {
      amountAnomaly: this.calculateAmountAnomaly(params.amount, params.customerId),
      geographicRisk: this.calculateGeographicRisk(params.beneficiaryCountry, params.originCountry),
      customerRisk: this.calculateCustomerRisk(params.customerId),
      patternRisk: this.detectPatterns(params.customerId, params.amount, params.transactionId),
      velocityRisk: this.calculateVelocity(params.customerId, params.amount),
      watchlistMatch: this.checkWatchlist(params.customerId, params.beneficiaryCountry),
    };

    const overallScore = (
      components.amountAnomaly * 0.25 +
      components.geographicRisk * 0.2 +
      components.customerRisk * 0.2 +
      components.patternRisk * 0.2 +
      components.velocityRisk * 0.1 +
      components.watchlistMatch * 0.05
    );

    let riskLevel: AMLScore['riskLevel'];
    if (overallScore >= 0.8) riskLevel = 'CRITICAL';
    else if (overallScore >= 0.6) riskLevel = 'HIGH';
    else if (overallScore >= 0.3) riskLevel = 'MEDIUM';
    else riskLevel = 'LOW';

    let recommendation: AMLScore['recommendation'];
    if (overallScore >= 0.8) recommendation = 'BLOCK';
    else if (overallScore >= 0.6) recommendation = 'REVIEW';
    else if (overallScore >= 0.3) recommendation = 'REVIEW';
    else recommendation = 'CLEAR';

    const flags = this.generateFlags(params, components);

    const score: AMLScore = {
      scoreId: generateAmlId('AML'),
      transactionId: params.transactionId,
      calculatedAt: new Date().toISOString(),
      overallScore,
      riskLevel,
      components,
      flags,
      recommendation,
    };

    if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
      this.state.flaggedTransactions.add(params.transactionId);
    }

    this.state.amlScores.set(params.transactionId, score);

    this.recentTransactions.push({
      customerId: params.customerId,
      amount: params.amount,
      timestamp: Date.now(),
      transactionId: params.transactionId,
    });

    if (this.recentTransactions.length > 10000) {
      this.recentTransactions = this.recentTransactions.slice(-5000);
    }

    return score;
  }

  // ============================================================================
  // SCORING COMPONENTS
  // ============================================================================

  private calculateAmountAnomaly(amount: number, customerId: string): number {
    if (amount >= AMOUNT_THRESHOLDS.WIRE_OUTGOING_SINGLE) return 1.0;
    if (amount >= AMOUNT_THRESHOLDS.STRUCTURING_NEAR_THRESHOLD) return 0.7;
    if (amount >= AMOUNT_THRESHOLDS.CASH_DEPOSIT_DAILY) return 0.5;
    return amount / AMOUNT_THRESHOLDS.WIRE_OUTGOING_SINGLE;
  }

  private calculateGeographicRisk(beneficiaryCountry?: string, originCountry?: string): number {
    let risk = 0;
    if (beneficiaryCountry && HIGH_RISK_COUNTRIES.has(beneficiaryCountry)) risk += 0.7;
    if (originCountry && HIGH_RISK_COUNTRIES.has(originCountry)) risk += 0.3;
    return Math.min(1, risk);
  }

  private calculateCustomerRisk(customerId: string): number {
    const profile = this.state.customerProfiles.get(customerId);
    if (!profile) return 0.3;
    const riskMap: Record<string, number> = { LOW: 0.1, MEDIUM: 0.4, HIGH: 0.8 };
    let risk = riskMap[profile.riskCategory] || 0.3;
    if (profile.isPEP) risk += 0.5;
    if (profile.enhancedDueDiligence) risk += 0.1;
    return Math.min(1, risk);
  }

  private detectPatterns(customerId: string, amount: number, transactionId: string): number {
    const now = Date.now();
    const window24h = now - 24 * 60 * 60 * 1000;

    const recentCustomerTxns = this.recentTransactions.filter(
      (t) => t.customerId === customerId && t.timestamp >= window24h,
    );

    if (recentCustomerTxns.length >= 10) return 0.6;
    if (recentCustomerTxns.length >= 5) return 0.3;

    const nearThresholdCount = recentCustomerTxns.filter(
      (t) => t.amount >= AMOUNT_THRESHOLDS.STRUCTURING_NEAR_THRESHOLD,
    ).length;

    if (nearThresholdCount >= 3) {
      const pattern: TransactionPattern = {
        patternId: generateAmlId('PAT'),
        customerId,
        patternType: 'STRUCTURING',
        detectedAt: new Date().toISOString(),
        transactions: [...recentCustomerTxns.map((t) => t.transactionId), transactionId],
        totalAmount: recentCustomerTxns.reduce((sum, t) => sum + t.amount, 0) + amount,
        confidence: 0.85,
        status: 'MONITORING',
      };
      this.state.patterns.set(pattern.patternId, pattern);
      return 0.9;
    }

    return nearThresholdCount * 0.2;
  }

  private calculateVelocity(customerId: string, amount: number): number {
    const now = Date.now();
    const window1h = now - 60 * 60 * 1000;

    const rapidTxns = this.recentTransactions.filter(
      (t) => t.customerId === customerId && t.timestamp >= window1h,
    );

    if (rapidTxns.length >= 5) return 0.8;
    if (rapidTxns.length >= 3) return 0.5;
    if (rapidTxns.length >= 2) return 0.2;

    return 0;
  }

  private checkWatchlist(customerId: string, country?: string): number {
    if (country && HIGH_RISK_COUNTRIES.has(country)) return 0.8;
    const profile = this.state.customerProfiles.get(customerId);
    if (profile?.isPEP) return 0.6;
    return 0;
  }

  // ============================================================================
  // FLAG GENERATION
  // ============================================================================

  private generateFlags(
    params: { amount: number; transactionType: string; beneficiaryCountry?: string; originCountry?: string },
    components: AMLScore['components'],
  ): AMLFlag[] {
    const flags: AMLFlag[] = [];

    if (params.amount >= AMOUNT_THRESHOLDS.WIRE_OUTGOING_SINGLE) {
      flags.push({
        flagId: generateAmlId('FLG'),
        type: 'AMOUNT_THRESHOLD',
        severity: 'HIGH',
        description: `Transaction exceeds single threshold: ${params.amount}`,
        triggeredAt: new Date().toISOString(),
      });
    }

    if (params.amount >= AMOUNT_THRESHOLDS.STRUCTURING_NEAR_THRESHOLD && params.amount < AMOUNT_THRESHOLDS.CASH_DEPOSIT_DAILY) {
      flags.push({
        flagId: generateAmlId('FLG'),
        type: 'STRUCTURING',
        severity: 'MEDIUM',
        description: `Amount near reporting threshold: ${params.amount}`,
        triggeredAt: new Date().toISOString(),
      });
    }

    if (params.beneficiaryCountry && HIGH_RISK_COUNTRIES.has(params.beneficiaryCountry)) {
      flags.push({
        flagId: generateAmlId('FLG'),
        type: 'HIGH_RISK_GEOGRAPHY',
        severity: 'HIGH',
        description: `Beneficiary in high-risk jurisdiction: ${params.beneficiaryCountry}`,
        triggeredAt: new Date().toISOString(),
      });
    }

    if (components.velocityRisk >= 0.5) {
      flags.push({
        flagId: generateAmlId('FLG'),
        type: 'RAPID_MOVEMENT',
        severity: 'HIGH',
        description: 'Unusual transaction velocity detected',
        triggeredAt: new Date().toISOString(),
      });
    }

    return flags;
  }

  // ============================================================================
  // WATCHLIST MANAGEMENT
  // ============================================================================

  addToWatchlist(entry: Omit<WatchlistEntry, 'entryId' | 'addedAt'>): WatchlistEntry {
    const fullEntry: WatchlistEntry = {
      ...entry,
      entryId: generateAmlId('WL'),
      addedAt: new Date().toISOString(),
    };
    this.state.watchlist.set(fullEntry.entryId, fullEntry);
    return fullEntry;
  }

  searchWatchlist(query: string): WatchlistEntry[] {
    const q = query.toLowerCase();
    return Array.from(this.state.watchlist.values()).filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.aliases.some((a) => a.toLowerCase().includes(q)),
    );
  }

  // ============================================================================
  // CUSTOMER RISK PROFILING
  // ============================================================================

  setCustomerRiskProfile(profile: CustomerRiskProfile): void {
    this.state.customerProfiles.set(profile.customerId, profile);
  }

  getCustomerRiskProfile(customerId: string): CustomerRiskProfile | undefined {
    return this.state.customerProfiles.get(customerId);
  }

  // ============================================================================
  // SUSPICIOUS ACTIVITY REPORT (SAR)
  // ============================================================================

  generateSAR(params: {
    customerId: string;
    customerName: string;
    transactions: string[];
    suspicionBasis: string[];
  }): SuspiciousActivityReport {
    const totalAmount = params.transactions.reduce((sum, txnId) => {
      const score = this.state.amlScores.get(txnId);
      return sum + (score ? score.overallScore * 1000000 : 0);
    }, 0);

    const sar: SuspiciousActivityReport = {
      reportId: generateAmlId('SAR'),
      generatedAt: new Date().toISOString(),
      reportingEntity: 'KOS Bank — Compliance Department',
      customerId: params.customerId,
      customerName: params.customerName,
      transactions: params.transactions,
      totalSuspiciousAmount: totalAmount,
      suspicionBasis: params.suspicionBasis,
      riskScore: this.calculateCustomerRisk(params.customerId),
      patternType: 'STRUCTURING',
      status: 'DRAFT',
      regulatoryReference: 'COBAC R-6 LCB/FT — Article 15',
    };

    this.state.sars.push(sar);
    return sar;
  }

  submitSAR(reportId: string): SuspiciousActivityReport {
    const sar = this.state.sars.find((s) => s.reportId === reportId);
    if (!sar) throw new Error(`SAR ${reportId} not found`);
    sar.status = 'SUBMITTED';
    return sar;
  }

  // ============================================================================
  // DASHBOARD & REPORTING
  // ============================================================================

  getAMLDashboard(): {
    totalTransactionsScreened: number;
    flaggedTransactions: number;
    criticalAlerts: number;
    highAlerts: number;
    activePatterns: number;
    pendingSARs: number;
    submittedSARs: number;
    averageRiskScore: number;
  } {
    const scores = Array.from(this.state.amlScores.values());
    const criticalAlerts = scores.filter((s) => s.riskLevel === 'CRITICAL').length;
    const highAlerts = scores.filter((s) => s.riskLevel === 'HIGH').length;

    return {
      totalTransactionsScreened: scores.length,
      flaggedTransactions: this.state.flaggedTransactions.size,
      criticalAlerts,
      highAlerts,
      activePatterns: Array.from(this.state.patterns.values()).filter((p) => p.status === 'MONITORING').length,
      pendingSARs: this.state.sars.filter((s) => s.status === 'DRAFT').length,
      submittedSARs: this.state.sars.filter((s) => s.status === 'SUBMITTED' || s.status === 'ACKNOWLEDGED').length,
      averageRiskScore: scores.length > 0
        ? scores.reduce((sum, s) => sum + s.overallScore, 0) / scores.length
        : 0,
    };
  }

  getFlaggedTransactions(): AMLScore[] {
    return Array.from(this.state.flaggedTransactions)
      .map((txnId) => this.state.amlScores.get(txnId))
      .filter((s): s is AMLScore => s !== undefined);
  }

  getState(): FraudDetectionState {
    return this.state;
  }
}

export const kosFraudDetectionAMLEngine = new KosFraudDetectionAMLEngine();