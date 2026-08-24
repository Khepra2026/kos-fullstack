// KOS REGTECH AI — RWA Engine (Risk-Weighted Assets)
// Bâle III / CRR3 / BCEAO — Calculs réglementaires
// Credit Risk SA (Standardised Approach)
// LCR ≥ 100% (Liquidity Coverage Ratio)
// FRTB-SA: Market Risk Sensitivities-based
// 100% local, Merkle log pour audit trail

import { merkleLog } from '@/core/audit-trail/merkleLog';
import { logger } from '@/core/logger';

const log = logger.child('rwa-engine');

// ─── Types ───

export interface Exposure {
  id: string;
  type: 'SOVEREIGN' | 'BANK' | 'CORPORATE' | 'RETAIL' | 'SME' | 'MORTGAGE' | 'EQUITY';
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'UNRATED';
  ead: number; // Exposure at Default
  ccf: number; // Credit Conversion Factor (0-1)
  currency: string;
  maturity: number; // Years
}

export interface Position {
  id: string;
  instrument: 'BOND' | 'EQUITY' | 'FX' | 'COMMODITY' | 'DERIVATIVE';
  delta: number; // Delta sensitivity
  vega: number; // Vega sensitivity
  curvature: number;
  riskWeight: number;
  notional: number;
}

export interface RWAResult {
  creditRWA: number;
  marketRWA: number;
  operationalRWA: number;
  totalRWA: number;
  cet1Ratio: number | null;
  lcr: number;
  nsrf: number;
  leverageRatio: number;
  calculatedAt: number;
  merkleHash: string;
}

export interface LCRResult {
  hqla: number;
  netOutflows: number;
  lcr: number;
  compliant: boolean;
  breachDetails?: string;
}

// ─── Risk weights — CRR3 Article 122-134 ───

const RISK_WEIGHTS: Record<string, Record<string, number>> = {
  SOVEREIGN: { AAA: 0, AA: 0, A: 20, BBB: 50, BB: 100, B: 100, CCC: 150, UNRATED: 100 },
  BANK: { AAA: 20, AA: 20, A: 50, BBB: 50, BB: 100, B: 100, CCC: 150, UNRATED: 100 },
  CORPORATE: { AAA: 20, AA: 50, A: 50, BBB: 100, BB: 100, B: 150, CCC: 150, UNRATED: 100 },
  RETAIL: { AAA: 75, AA: 75, A: 75, BBB: 75, BB: 75, B: 75, CCC: 75, UNRATED: 75 },
  SME: { AAA: 75, AA: 75, A: 75, BBB: 85, BB: 100, B: 150, CCC: 150, UNRATED: 100 },
  MORTGAGE: { AAA: 35, AA: 35, A: 35, BBB: 50, BB: 75, B: 100, CCC: 100, UNRATED: 75 },
  EQUITY: { AAA: 100, AA: 100, A: 100, BBB: 150, BB: 250, B: 250, CCC: 250, UNRATED: 250 },
};

// ─── LCR parameters BCEAO ───

const LCR_THRESHOLD = 100;
const HAIRCUTS: Record<string, number> = {
  CASH: 0,
  CENTRAL_BANK_RESERVES: 0,
  SOVEREIGN_BONDS_AAA: 0,
  SOVEREIGN_BONDS_AA: 5,
  CORPORATE_BONDS_AA: 15,
  CORPORATE_BONDS_A: 50,
  COVERED_BONDS: 7,
};

// ─── Outflow rates ───

const OUTFLOW_RATES: Record<string, number> = {
  RETAIL_DEPOSITS_STABLE: 5,
  RETAIL_DEPOSITS_LESS_STABLE: 10,
  CORPORATE_DEPOSITS: 20,
  FINANCIAL_DEPOSITS: 100,
  UNSECURED_WHOLESALE: 50,
  SECURED_WHOLESALE: 25,
  CONTINGENT_CREDIT_LINES: 10,
  COMMITMENTS: 5,
};

// ─── RWA Engine ───

export class RWAEngine {
  // ═══════════════════════════════════════════════
  // CREDIT RISK — Standardised Approach (CRR3)
  // ═══════════════════════════════════════════════

  calculateCreditRWA(exposures: Exposure[]): number {
    let totalRWA = 0;

    for (const exp of exposures) {
      const riskWeight = this.getRiskWeight(exp.type, exp.rating);
      const rwa = exp.ead * (riskWeight / 100) * exp.ccf;
      totalRWA += rwa;

      log.debug('Credit RWA', {
        id: exp.id,
        type: exp.type,
        rating: exp.rating,
        ead: exp.ead,
        rw: `${riskWeight}%`,
        rwa: Math.round(rwa),
      });
    }

    return Math.round(totalRWA);
  }

  private getRiskWeight(type: string, rating: string): number {
    const weights = RISK_WEIGHTS[type];
    if (!weights) return 100;

    return weights[rating] || weights.UNRATED || 100;
  }

  // ═══════════════════════════════════════════════
  // MARKET RISK — FRTB-SA Sensitivities-based
  // ═══════════════════════════════════════════════

  calculateMarketRWA(positions: Position[]): number {
    // Delta risk
    const deltaRWA = positions.reduce((sum, p) => {
      return sum + Math.abs(p.delta) * p.riskWeight * p.notional;
    }, 0);

    // Vega risk
    const vegaRWA = positions.reduce((sum, p) => {
      return sum + Math.abs(p.vega) * p.riskWeight * 0.5 * p.notional;
    }, 0);

    // Curvature risk (CRR3 Art. 325g)
    const curvatureRWA = this.curvatureRisk(positions);

    const total = deltaRWA + vegaRWA + curvatureRWA;

    log.debug('Market RWA FRTB', {
      deltaRWA: Math.round(deltaRWA),
      vegaRWA: Math.round(vegaRWA),
      curvatureRWA: Math.round(curvatureRWA),
      total: Math.round(total),
    });

    return Math.round(total * 12.5); // ×12.5 pour convertir en RWA (inverse du ratio 8%)
  }

  curvatureRisk(positions: Position[]): number {
    return positions.reduce((sum, p) => {
      return sum + Math.abs(p.curvature) * p.riskWeight * 0.3 * p.notional;
    }, 0);
  }

  // ═══════════════════════════════════════════════
  // LCR — Liquidity Coverage Ratio ≥ 100%
  // ═══════════════════════════════════════════════

  calculateLCR(params: {
    hqla: { category: string; amount: number }[];
    outflows: { category: string; amount: number }[];
    inflows: { category: string; amount: number }[];
  }): LCRResult {
    // HQLA avec haircuts
    let hqlaTotal = 0;
    for (const asset of params.hqla) {
      const haircut = HAIRCUTS[asset.category] || 20;
      hqlaTotal += asset.amount * (1 - haircut / 100);
    }

    // Net cash outflows (capped at 75% of inflows)
    let grossOutflows = 0;
    for (const outflow of params.outflows) {
      const rate = OUTFLOW_RATES[outflow.category] || 50;
      grossOutflows += outflow.amount * (rate / 100);
    }

    let grossInflows = 0;
    for (const inflow of params.inflows) {
      grossInflows += inflow.amount * 0.5; // Cap inflow recognition at 50%
    }

    const maxInflows = grossOutflows * 0.75;
    const recognizedInflows = Math.min(grossInflows, maxInflows);
    const netOutflows = Math.max(0, grossOutflows - recognizedInflows);

    const lcr = netOutflows > 0
      ? Math.round((hqlaTotal / netOutflows) * 10000) / 100
      : 999;

    const compliant = lcr >= LCR_THRESHOLD;

    if (!compliant) {
      log.warn('LCR Breach BCEAO', {
        lcr: lcr.toFixed(1),
        hqlaTotal: Math.round(hqlaTotal),
        netOutflows: Math.round(netOutflows),
        required: LCR_THRESHOLD,
      });
    }

    return {
      hqla: Math.round(hqlaTotal),
      netOutflows: Math.round(netOutflows),
      lcr,
      compliant,
      breachDetails: compliant ? undefined : `LCR=${lcr.toFixed(1)}% < ${LCR_THRESHOLD}% — action corrective requise sous 5 jours BCEAO`,
    };
  }

  // ═══════════════════════════════════════════════
  // OPERATIONAL RISK — BIA (Basic Indicator Approach)
  // ═══════════════════════════════════════════════

  calculateOperationalRWA(grossIncome3Y: number[]): number {
    // 15% of average positive gross income over 3 years
    const positiveYears = grossIncome3Y.filter((gi) => gi > 0);
    if (positiveYears.length === 0) return 0;

    const avgPositiveGI = positiveYears.reduce((a, b) => a + b, 0) / positiveYears.length;
    const capitalCharge = avgPositiveGI * 0.15;
    return Math.round(capitalCharge * 12.5);
  }

  // ═══════════════════════════════════════════════
  // LEVERAGE RATIO — CRR3 Art. 429
  // ═══════════════════════════════════════════════

  calculateLeverageRatio(tier1Capital: number, totalExposure: number): number {
    if (totalExposure <= 0) return 0;
    return Math.round((tier1Capital / totalExposure) * 10000) / 100;
  }

  // ═══════════════════════════════════════════════
  // NSFR — Net Stable Funding Ratio ≥ 100%
  // ═══════════════════════════════════════════════

  calculateNSFR(availableStableFunding: number, requiredStableFunding: number): number {
    if (requiredStableFunding <= 0) return 999;
    return Math.round((availableStableFunding / requiredStableFunding) * 10000) / 100;
  }

  // ═══════════════════════════════════════════════
  // CALCUL COMPLET + AUDIT TRAIL
  // ═══════════════════════════════════════════════

  async calculateFullRWA(params: {
    exposures: Exposure[];
    positions: Position[];
    grossIncome3Y: number[];
    tier1Capital: number;
    lcrParams: {
      hqla: { category: string; amount: number }[];
      outflows: { category: string; amount: number }[];
      inflows: { category: string; amount: number }[];
    };
    asf: number;
    rsf: number;
  }): Promise<RWAResult> {
    log.info('Calcul RWA complet démarré');

    const creditRWA = this.calculateCreditRWA(params.exposures);
    const marketRWA = this.calculateMarketRWA(params.positions);
    const operationalRWA = this.calculateOperationalRWA(params.grossIncome3Y);
    const totalRWA = creditRWA + marketRWA + operationalRWA;

    const cet1Ratio = totalRWA > 0
      ? Math.round((params.tier1Capital / totalRWA) * 10000) / 100
      : null;

    const lcrResult = this.calculateLCR(params.lcrParams);
    const nsrf = this.calculateNSFR(params.asf, params.rsf);

    const totalExposure = params.exposures.reduce((sum, e) => sum + e.ead, 0);
    const leverageRatio = this.calculateLeverageRatio(params.tier1Capital, totalExposure);

    // Alertes
    const alerts: string[] = [];
    if (!lcrResult.compliant) {
      alerts.push(`LCR_BREACH: ${lcrResult.breachDetails}`);
    }
    if (nsrf < 100) {
      alerts.push(`NSRF_BREACH: NSFR=${nsrf.toFixed(1)}% < 100%`);
    }
    if (cet1Ratio !== null && cet1Ratio < 8) {
      alerts.push(`CET1_BREACH: CET1=${cet1Ratio.toFixed(1)}% < 8% — BCEAO Instruction 006-2024`);
    }
    if (leverageRatio < 3) {
      alerts.push(`LEVERAGE_BREACH: ${leverageRatio.toFixed(1)}% < 3%`);
    }

    if (alerts.length > 0) {
      await merkleLog.append({
        action: 'RWA_ALERT',
        details: {
          alerts,
          creditRWA,
          marketRWA,
          operationalRWA,
          totalRWA,
          cet1Ratio,
          lcr: lcrResult.lcr,
          nsrf,
          leverageRatio,
        },
      });
    }

    const merkleHash = await merkleLog.append({
      action: 'RWA_CALCULATED',
      details: {
        creditRWA,
        marketRWA,
        operationalRWA,
        totalRWA,
        cet1Ratio,
        lcr: lcrResult.lcr,
        nsrf,
        leverageRatio,
        alerts,
        exposures: params.exposures.length,
        positions: params.positions.length,
      },
    });

    log.info('RWA complet calculé', {
      totalRWA: `${(totalRWA / 1_000_000).toFixed(1)}M`,
      cet1Ratio: cet1Ratio !== null ? `${cet1Ratio}%` : 'N/A',
      lcr: `${lcrResult.lcr}%`,
      nsrf: `${nsrf}%`,
      leverageRatio: `${leverageRatio}%`,
      alerts: alerts.length,
    });

    return {
      creditRWA,
      marketRWA,
      operationalRWA,
      totalRWA,
      cet1Ratio,
      lcr: lcrResult.lcr,
      nsrf,
      leverageRatio,
      calculatedAt: Date.now(),
      merkleHash,
    };
  }
}

// ─── Singleton ───

export const rwaEngine = new RWAEngine();



