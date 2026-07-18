// src/lib/billing.ts - KOS PLATFORM MONÉTISATION BIG FOUR
// Conforme COBAC + CEMAC - 100% Souverain

export const PLANS = {
  STARTER: {
    price: 500000,
    agents: 3,
    quota: 10000,
    sla: 99,
    name: 'KOS Starter',
    target: 'PME/IMF',
    features: ['COBAC_Scout', 'Report_Generator', 'Compliance_Auditor']
  },
  BUSINESS: {
    price: 2500000,
    agents: 9,
    quota: 100000,
    sla: 99.5,
    name: 'KOS Business',
    target: 'Banques moyennes CEMAC',
    features: ['Starter + CFO_Agent', 'Risk_Analyzer', 'SOC_Agent', 'HR_Compliance', 'Legal_Expert', 'Access_Controller']
  },
  ENTERPRISE: {
    price: 15000000,
    agents: 17,
    quota: -1,
    sla: 99.9,
    name: 'KOS Enterprise',
    target: 'Big Four + Banques systémiques',
    features: ['Tous les 17 agents', 'SLA 99.9%', 'Support 24/7', 'Audit Trail 10 ans']
  }
} as const;

export const OVERAGE_PRICE = 50; // XAF per API call au-delà du quota
export const CURRENCY = 'XAF';

export type PlanType = keyof typeof PLANS;

export const calculateMonthlyBill = (plan: PlanType, overageCalls: number) => {
  const basePrice = PLANS[plan].price;
  const overage = overageCalls * OVERAGE_PRICE;
  return { basePrice, overage, total: basePrice + overage };
};
