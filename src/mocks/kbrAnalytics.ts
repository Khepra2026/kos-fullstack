// =============================================================================
// KBR ANALYTICS — Pipeline Lead→MQL→SQL→Mission Dashboard
// Modèle KBR (Knowledge-Based Revenue) — KHEPRA EXPERTS
// =============================================================================

export const KBR_PIPELINE_STAGES = [
  { key: 'lead', label: 'Lead', color: '#6b7280', icon: 'ri-user-line' },
  { key: 'mql', label: 'MQL', color: '#f59e0b', icon: 'ri-filter-line' },
  { key: 'sql', label: 'SQL', color: '#3b82f6', icon: 'ri-check-double-line' },
  { key: 'opportunity', label: 'Opportunité', color: '#8b5cf6', icon: 'ri-briefcase-line' },
  { key: 'proposal', label: 'Proposition', color: '#ec4899', icon: 'ri-file-text-line' },
  { key: 'negotiation', label: 'Négociation', color: '#ef4444', icon: 'ri-scales-line' },
  { key: 'won', label: 'Mission Gagnée', color: '#22c55e', icon: 'ri-trophy-line' },
  { key: 'lost', label: 'Perdue', color: '#9ca3af', icon: 'ri-close-circle-line' },
];

export const KBR_CONVERSION_TARGETS = {
  lead_to_mql: { rate: 0.40, label: 'Lead → MQL', actual: 0.38, trend: 'up' as const },
  mql_to_sql: { rate: 0.25, label: 'MQL → SQL', actual: 0.27, trend: 'up' as const },
  sql_to_opportunity: { rate: 0.60, label: 'SQL → Opportunité', actual: 0.55, trend: 'down' as const },
  opportunity_to_proposal: { rate: 0.70, label: 'Opportunité → Proposition', actual: 0.72, trend: 'up' as const },
  proposal_to_negotiation: { rate: 0.50, label: 'Proposition → Négociation', actual: 0.48, trend: 'stable' as const },
  negotiation_to_won: { rate: 0.60, label: 'Négociation → Gagnée', actual: 0.62, trend: 'up' as const },
  overall_lead_to_mission: { rate: 0.15, label: 'Lead → Mission (global)', actual: 0.14, trend: 'up' as const },
};

export const KBR_BU_PERFORMANCE = [
  {
    bu: 'BU1 — Régulation Financière',
    leads: 145,
    mql: 58,
    sql: 16,
    opportunities: 9,
    proposals: 6,
    negotiations: 3,
    won: 2,
    pipelineValue: '1 250 M FCFA',
    wonValue: '385 M FCFA',
    avgDealSize: '192 M FCFA',
    color: '#c9a227',
  },
  {
    bu: 'BU2 — Gouvernance & Due Diligence',
    leads: 98,
    mql: 39,
    sql: 11,
    opportunities: 6,
    proposals: 5,
    negotiations: 2,
    won: 1,
    pipelineValue: '780 M FCFA',
    wonValue: '210 M FCFA',
    avgDealSize: '156 M FCFA',
    color: '#22a05a',
  },
  {
    bu: 'BU3 — Climat, Transition & ESG',
    leads: 72,
    mql: 25,
    sql: 7,
    opportunities: 4,
    proposals: 2,
    negotiations: 1,
    won: 1,
    pipelineValue: '520 M FCFA',
    wonValue: '95 M FCFA',
    avgDealSize: '130 M FCFA',
    color: '#3b82f6',
  },
  {
    bu: 'BU4 — KBR & Intelligence d\'Affaires',
    leads: 110,
    mql: 48,
    sql: 14,
    opportunities: 8,
    proposals: 6,
    negotiations: 3,
    won: 2,
    pipelineValue: '740 M FCFA',
    wonValue: '270 M FCFA',
    avgDealSize: '135 M FCFA',
    color: '#d946ef',
  },
];

export const KBR_RECENT_ACTIVITY = [
  { date: '2026-06-28', type: 'lead', bu: 'BU1', event: 'Nouveau lead — Diagnostic Scoring BCEAO', source: 'diagnostic-scoring-kbr' },
  { date: '2026-06-28', type: 'mql', bu: 'BU4', event: 'Lead qualifié MQL — Étude Sectorielle Premium téléchargée', source: 'premium-upsell' },
  { date: '2026-06-27', type: 'won', bu: 'BU1', event: 'Mission gagnée — Audit Pré-Inspection BCEAO Banque Atlantique', source: 'consultation' },
  { date: '2026-06-27', type: 'proposal', bu: 'BU2', event: 'Proposition envoyée — Due Diligence Acquisition Africa Growth Capital', source: 'lead-magnet' },
  { date: '2026-06-26', type: 'sql', bu: 'BU3', event: 'SQL qualifié — ESG Roadmap GRI/ISSB Ciments d\'Afrique', source: 'diagnostic' },
  { date: '2026-06-26', type: 'lead', bu: 'BU4', event: 'Nouveau lead — KBR Article Premium Lecture', source: 'blog' },
  { date: '2026-06-25', type: 'negotiation', bu: 'BU1', event: 'Entrée en négociation — Conformité LBC/FT Groupe Bancaire Panafricain', source: 'referral' },
  { date: '2026-06-25', type: 'lead', bu: 'BU2', event: 'Nouveau lead — Checklist Gouvernance Board CEMAC', source: 'lead-magnet' },
];

export const KBR_FUNNEL_DATA = {
  total: { leads: 425, mql: 170, sql: 48, opportunities: 27, proposals: 19, negotiations: 9, won: 6, lost: 3 },
  pipelineValueTotal: '3 290 M FCFA',
  wonValueTotal: '960 M FCFA',
  avgCycleDays: { lead_to_mql: 5, mql_to_sql: 12, sql_to_opportunity: 8, opportunity_to_proposal: 14, proposal_to_negotiation: 21, negotiation_to_won: 18 },
  monthlyTarget: { leads: 150, mql: 60, sql: 15, won: 3, revenue: '450 M FCFA' },
};

export const KBR_MONTHLY_TREND = [
  { month: 'Jan 2026', leads: 95, mql: 32, sql: 8, won: 1, revenue: 125 },
  { month: 'Fév 2026', leads: 110, mql: 38, sql: 10, won: 1, revenue: 185 },
  { month: 'Mar 2026', leads: 125, mql: 45, sql: 12, won: 2, revenue: 210 },
  { month: 'Avr 2026', leads: 140, mql: 52, sql: 14, won: 2, revenue: 280 },
  { month: 'Mai 2026', leads: 155, mql: 58, sql: 16, won: 3, revenue: 350 },
  { month: 'Jun 2026', leads: 170, mql: 65, sql: 18, won: 3, revenue: 410 },
];

export const KBR_SCORING_DISTRIBUTION = {
  cold: { count: 125, label: 'Cold (<30)', color: '#6b7280', action: 'Lead Magnet générique' },
  warm: { count: 180, label: 'Warm (30-55)', color: '#f59e0b', action: 'Rapport personnalisé' },
  hot: { count: 120, label: 'Hot (>55)', color: '#ef4444', action: 'Consultation offerte' },
};

export const KBR_ACCESS_LEVEL_STATS = {
  level1: { downloads: 847, label: 'Level 1 — Lead Magnets', color: '#22c55e' },
  level2: { purchases: 34, revenue: '12 450 000 FCFA', label: 'Level 2 — Premium', color: '#f59e0b' },
  level3: { missions: 6, revenue: '960 M FCFA', label: 'Level 3 — High-Ticket', color: '#ef4444' },
};





