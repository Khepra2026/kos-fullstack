export const subscriptionPlan = {
  planName: 'Sur Devis',
  planLabel: 'Mission sur mesure — Devis confidentiel',
  monthlyPrice: null,
  currency: 'EUR',
  billingCycle: 'devis',
  renewalDate: '2026-07-15',
  daysUntilRenewal: 25,
  autoRenewalEnabled: false,
  status: 'active',
  since: '2025-09-01',
  features: [
    'Diagnostic gratuit de vos besoins',
    'Devis confidentiel sur mesure',
    'Accompagnement dédié par un expert KHEPRA',
    'Accès cockpit KOS sur contrat',
    'Observatoires sectoriels sur engagement',
  ],
};

export const creditUsage = {
  total: 6000,
  used: 3720,
  remaining: 2280,
  usagePercent: 62,
  resetDate: '2026-07-15',
  dailyAverage: 124,
  projectedUsage: 5580,
  projectedPercent: 93,
};

export const paymentMethod = {
  type: 'wire_transfer',
  brand: 'Virement',
  lastFour: 'BANK',
  expiryMonth: 'N/A',
  expiryYear: 'N/A',
  holderName: 'KHEPRA EXPERTS SARL U',
  isDefault: true,
};

export const monthlyUsageHistory = [
  { month: 'Janvier 2026', credits: 2890, projects: 12, edgeFunctions: 340 },
  { month: 'Février 2026', credits: 3120, projects: 14, edgeFunctions: 380 },
  { month: 'Mars 2026', credits: 4450, projects: 18, edgeFunctions: 520 },
  { month: 'Avril 2026', credits: 3980, projects: 16, edgeFunctions: 460 },
  { month: 'Mai 2026', credits: 5100, projects: 19, edgeFunctions: 590 },
  { month: 'Juin 2026', credits: 3720, projects: 15, edgeFunctions: 410 },
];

export const invoiceHistory = [
  { id: 'INV-2026-06', date: '2026-06-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
  { id: 'INV-2026-05', date: '2026-05-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
  { id: 'INV-2026-04', date: '2026-04-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
  { id: 'INV-2026-03', date: '2026-03-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
  { id: 'INV-2026-02', date: '2026-02-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
  { id: 'INV-2026-01', date: '2026-01-15', amount: 0, status: 'devis accepté', pdfUrl: '#' },
];

export const engagementTypes = [
  {
    id: 'diagnostic',
    name: 'Diagnostic Flash',
    desc: 'Évaluation gratuite de vos besoins réglementaires et de conformité — 30 minutes avec un expert KHEPRA',
    icon: 'ri-stethoscope-line',
    duration: '30 min',
    pricing: 'Gratuit',
  },
  {
    id: 'mission',
    name: 'Mission sur Devis',
    desc: 'Proposition commerciale sur mesure après diagnostic : audit, due diligence, conformité, gouvernance, transformation',
    icon: 'ri-file-text-line',
    duration: 'Sur mesure',
    pricing: 'Devis confidentiel',
  },
  {
    id: 'observatoire',
    name: 'Observatoire Sectoriel',
    desc: 'Accès aux publications trimestrielles, benchmarks, indices KOS™ et alertes réglementaires — Contrat institutionnel',
    icon: 'ri-radar-line',
    duration: 'Trimestriel / Annuel',
    pricing: 'Contrat institutionnel',
  },
  {
    id: 'cockpit',
    name: 'Cockpit KOS',
    desc: 'Plateforme SaaS de scoring conformité, due diligence ESG, détection de fraude et tableaux de bord — Licence entreprise',
    icon: 'ri-dashboard-line',
    duration: 'Annuel',
    pricing: 'Licence sur devis',
  },
];

export const availablePlans: Array<{
  id: string;
  name: string;
  credits: number;
  price: null;
  features: string[];
  isCurrent: boolean;
}> = [];



