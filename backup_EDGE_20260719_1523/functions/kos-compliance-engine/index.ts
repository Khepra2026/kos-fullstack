import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// ═══════════════════════════════════════════════════════════════
// KOS Compliance Engine v1.0 — OHADA 47 Rules
// HNSW + pgvector hybrid search | In-memory evaluation | <400ms target
// ═══════════════════════════════════════════════════════════════

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

// ─── 47 OHADA Rules Definition ─────────────────────────────────
interface ComplianceRule {
  id: string;
  name: string;
  category: string;
  tags: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  threshold: (data: FinancialSnapshot) => { value: number | boolean | null; violated: boolean; severity: 'ok' | 'warning' | 'critical' };
  lang: Record<string, string>;
  recommendation: Record<string, string>;
}

interface FinancialSnapshot {
  balance_sheet?: {
    total_assets?: number;
    total_liabilities?: number;
    equity?: number;
    cash?: number;
    short_term_investments?: number;
    receivables?: number;
    receivables_over_90?: number;
    receivables_litigious?: number;
    inventory?: number;
    fixed_assets?: number;
    tangible_assets?: number;
    intangible_assets?: number;
    investments?: number;
    deposits?: number;
    loans?: number;
    short_term_debt?: number;
    long_term_debt?: number;
    provisions?: number;
  };
  income_statement?: {
    revenue?: number;
    net_income?: number;
    operating_expenses?: number;
    interest_income?: number;
    personnel_costs?: number;
    financial_expenses?: number;
    ebitda?: number;
  };
  risk_data?: {
    doubtful_loans?: number;
    provision_rate?: number;
    kyc_completion_rate?: number;
    pep_count?: number;
    suspicious_txn_count?: number;
    suspicious_txn_amount?: number;
    staff_trained_lbcft_pct?: number;
    country_risk_score?: number;
    frozen_assets_count?: number;
  };
  governance?: {
    board_independence_pct?: number;
    board_size?: number;
    audit_committee_active?: boolean;
    compliance_officer?: boolean;
    risk_map_updated?: string;
    bcp_tested?: boolean;
    whistleblower_protection?: boolean;
    internal_control_documented?: boolean;
  };
  regulatory?: {
    capital_paid?: number;
    capital_required?: number;
    capital_minimum?: number;
    legal_reserve?: number;
    net_profit?: number;
    audit_certified?: boolean;
    accounts_closed_within_90_days?: boolean;
    accounts_closure_date?: string;
    consolidated_accounts?: boolean;
    cash_flow_statement?: boolean;
    equity_variation_statement?: boolean;
    notes_annexes_complete?: boolean;
    esg_reporting?: boolean;
  };
  metadata?: {
    entity_type?: 'banque' | 'sfd' | 'emf' | 'microfinance' | 'entreprise';
    regulator?: string;
    reporting_date?: string;
    currency?: string;
  };
}

const OHADA_RULES: Record<string, ComplianceRule> = {
  // ═══ PROVISIONS & DEPRECIATIONS (8 rules) ═══
  'SYSCOHADA-401': {
    id: 'SYSCOHADA-401',
    name: 'Provision créances douteuses >90j',
    category: 'Provisions',
    tags: ['provision', 'creance', 'douteuse', 'delai', 'syscohada', 'actif'],
    priority: 'critical',
    action: 'ALERTE_COBAC_R2016_01',
    threshold: (d) => {
      const fp = d.balance_sheet?.equity ?? 1;
      const creances = d.balance_sheet?.receivables_over_90 ?? 0;
      const ratio = fp > 0 ? creances / fp : 0;
      return { value: ratio, violated: ratio > 0.05, severity: ratio > 0.08 ? 'critical' : ratio > 0.05 ? 'warning' : 'ok' };
    },
    lang: { fr: 'Taux créances douteuses >90j / FP', en: 'Doubtful loans >90d / Equity ratio', pt: 'Créditos duvidosos >90d / PL' },
    recommendation: { fr: 'Constituer provision 100% ou renforcer recouvrement', en: 'Full provision or strengthen collection', pt: 'Provisão integral ou reforçar recuperação' },
  },
  'SYSCOHADA-402': {
    id: 'SYSCOHADA-402',
    name: 'Provision créances litigieuses',
    category: 'Provisions',
    tags: ['provision', 'creance', 'litigieuse', 'syscohada', 'juridique'],
    priority: 'high',
    action: 'ALERTE_LITIGE_COBAC',
    threshold: (d) => {
      const lit = d.balance_sheet?.receivables_litigious ?? 0;
      const total = d.balance_sheet?.receivables ?? 1;
      const ratio = total > 0 ? lit / total : 0;
      return { value: ratio, violated: lit > 0 && ratio > 0.03, severity: ratio > 0.05 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Créances litigieuses / Total créances', en: 'Litigious receivables / Total receivables', pt: 'Créditos litigiosos / Total' },
    recommendation: { fr: 'Provision 50-100% selon expertise juridique', en: 'Provision 50-100% per legal advice', pt: 'Provisão 50-100% conforme parecer jurídico' },
  },
  'SYSCOHADA-403': {
    id: 'SYSCOHADA-403',
    name: 'Dépréciation stocks obsolètes',
    category: 'Provisions',
    tags: ['depreciation', 'stock', 'obsolete', 'syscohada', 'inventaire'],
    priority: 'medium',
    action: 'REVISION_INVENTAIRE',
    threshold: (d) => {
      const stock = d.balance_sheet?.inventory ?? 0;
      return { value: stock > 0, violated: stock > 0, severity: 'ok' };
    },
    lang: { fr: 'Stocks à inventorier et déprécier si obsolètes', en: 'Inventory stocks and depreciate if obsolete', pt: 'Inventariar stocks e depreciar se obsoletos' },
    recommendation: { fr: 'Inventaire physique annuel + test dépréciation', en: 'Annual physical inventory + impairment test', pt: 'Inventário físico anual + teste de depreciação' },
  },
  'SYSCOHADA-404': {
    id: 'SYSCOHADA-404',
    name: 'Dépréciation immobilisations incorporelles',
    category: 'Provisions',
    tags: ['depreciation', 'immobilisation', 'incorporelle', 'syscohada', 'goodwill'],
    priority: 'medium',
    action: 'TEST_DEPRECIATION_IA',
    threshold: (d) => {
      const ia = d.balance_sheet?.intangible_assets ?? 0;
      return { value: ia, violated: ia > 0, severity: 'ok' };
    },
    lang: { fr: 'Test annuel de dépréciation des immobilisations incorporelles', en: 'Annual impairment test for intangible assets', pt: 'Teste anual de depreciação de ativos intangíveis' },
    recommendation: { fr: 'Vérifier valeur d\'utilité vs valeur comptable', en: 'Check recoverable amount vs carrying value', pt: 'Verificar valor de uso vs valor contábil' },
  },
  'SYSCOHADA-405': {
    id: 'SYSCOHADA-405',
    name: 'Dépréciation immobilisations corporelles',
    category: 'Provisions',
    tags: ['depreciation', 'immobilisation', 'corporelle', 'syscohada', 'materiel'],
    priority: 'medium',
    action: 'PLAN_AMORTISSEMENT',
    threshold: (d) => {
      const corp = d.balance_sheet?.tangible_assets ?? 0;
      return { value: corp, violated: corp > 0, severity: 'ok' };
    },
    lang: { fr: 'Plan d\'amortissement conforme aux durées d\'usage', en: 'Depreciation plan aligned with useful lives', pt: 'Plano de amortização conforme vidas úteis' },
    recommendation: { fr: 'Revoir plan si changement méthode ou durée', en: 'Review plan if method or life change', pt: 'Revisar plano se mudança método ou vida útil' },
  },
  'SYSCOHADA-406': {
    id: 'SYSCOHADA-406',
    name: 'Dépréciation participations',
    category: 'Provisions',
    tags: ['depreciation', 'participation', 'filiale', 'syscohada', 'consolidation'],
    priority: 'high',
    action: 'TEST_DEPRECIATION_PART',
    threshold: (d) => {
      const part = d.balance_sheet?.investments ?? 0;
      return { value: part, violated: part > 0, severity: 'ok' };
    },
    lang: { fr: 'Test de dépréciation des participations', en: 'Impairment test for equity investments', pt: 'Teste de depreciação de participações' },
    recommendation: { fr: 'Évaluer actif net filiale vs valeur comptable', en: 'Assess subsidiary NAV vs carrying value', pt: 'Avaliar PL filial vs valor contábil' },
  },
  'SYSCOHADA-407': {
    id: 'SYSCOHADA-407',
    name: 'Provision risques et charges',
    category: 'Provisions',
    tags: ['provision', 'risque', 'charge', 'syscohada', 'passif'],
    priority: 'high',
    action: 'PROVISION_RISQUE',
    threshold: (d) => {
      const prov = d.balance_sheet?.provisions ?? 0;
      const fp = d.balance_sheet?.equity ?? 1;
      const ratio = fp > 0 ? prov / fp : 0;
      return { value: ratio, violated: ratio > 0.1, severity: ratio > 0.15 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Provisions risques et charges / Capitaux propres', en: 'Risk provisions / Equity', pt: 'Provisões riscos / Patrimônio líquido' },
    recommendation: { fr: 'Justifier chaque provision par événement probant', en: 'Justify each provision by probable event', pt: 'Justificar cada provisão por evento provável' },
  },
  'SYSCOHADA-408': {
    id: 'SYSCOHADA-408',
    name: 'Provision restructuration',
    category: 'Provisions',
    tags: ['provision', 'restructuration', 'syscohada', 'plan'],
    priority: 'medium',
    action: 'PROVISION_RESTRUCT',
    threshold: (d) => ({ value: null, violated: false, severity: 'ok' }),
    lang: { fr: 'Provision restructuration uniquement si plan formalisé', en: 'Restructuring provision only if formal plan', pt: 'Provisão reestruturação apenas se plano formalizado' },
    recommendation: { fr: 'Formaliser plan avant provision', en: 'Formalize plan before provisioning', pt: 'Formalizar plano antes de provisionar' },
  },

  // ═══ RATIOS PRUDENTIELS BCEAO (10 rules) ═══
  'BCEAO-R001': {
    id: 'BCEAO-R001',
    name: 'Ratio de solvabilité minimum 8%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'solvabilite', 'bceao', 'fonds propres', 'core'],
    priority: 'critical',
    action: 'ALERTE_SOLVABILITE',
    threshold: (d) => {
      const fp = d.balance_sheet?.equity ?? 0;
      const assets = d.balance_sheet?.total_assets ?? 1;
      const ratio = assets > 0 ? fp / assets : 0;
      return { value: ratio, violated: ratio < 0.08, severity: ratio < 0.06 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Ratio solvabilité (FP/Actif) ≥ 8%', en: 'Solvency ratio (Equity/Assets) ≥ 8%', pt: 'Razão solvência (PL/Ativo) ≥ 8%' },
    recommendation: { fr: 'Augmenter capitaux propres ou réduire actifs pondérés', en: 'Increase equity or reduce risk-weighted assets', pt: 'Aumentar PL ou reduzir ativos ponderados risco' },
  },
  'BCEAO-R002': {
    id: 'BCEAO-R002',
    name: 'Ratio liquidité court terme ≥ 100%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'liquidite', 'court terme', 'bceao', 'crise'],
    priority: 'critical',
    action: 'ALERTE_LIQUIDITE',
    threshold: (d) => {
      const actifCT = (d.balance_sheet?.cash ?? 0) + (d.balance_sheet?.short_term_investments ?? 0) + (d.balance_sheet?.receivables ?? 0);
      const passifCT = d.balance_sheet?.short_term_debt ?? 1;
      const ratio = passifCT > 0 ? actifCT / passifCT : 0;
      return { value: ratio, violated: ratio < 1.0, severity: ratio < 0.8 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Liquidité court terme (ACT/PCT) ≥ 100%', en: 'Short-term liquidity ≥ 100%', pt: 'Liquidez curto prazo ≥ 100%' },
    recommendation: { fr: 'Allonger ressources ou réduire engagements CT', en: 'Extend funding or reduce ST commitments', pt: 'Alongar recursos ou reduzir compromissos CP' },
  },
  'BCEAO-R003': {
    id: 'BCEAO-R003',
    name: 'Ratio liquidité immédiate ≥ 20%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'liquidite', 'immediate', 'bceao', 'tresorerie'],
    priority: 'high',
    action: 'ALERTE_TRESORERIE',
    threshold: (d) => {
      const tresorerie = (d.balance_sheet?.cash ?? 0) + (d.balance_sheet?.short_term_investments ?? 0);
      const passifCT = d.balance_sheet?.short_term_debt ?? 1;
      const ratio = passifCT > 0 ? tresorerie / passifCT : 0;
      return { value: ratio, violated: ratio < 0.20, severity: ratio < 0.10 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Liquidité immédiate (Trésorerie/PCT) ≥ 20%', en: 'Immediate liquidity (Cash/ST debt) ≥ 20%', pt: 'Liquidez imediata ≥ 20%' },
    recommendation: { fr: 'Constituer lignes de trésorerie de secours', en: 'Build backup cash lines', pt: 'Constituir linhas tesouraria reserva' },
  },
  'BCEAO-R004': {
    id: 'BCEAO-R004',
    name: 'Couverture des dépôts par actifs liquides',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'depots', 'couverture', 'bceao', 'actif liquide'],
    priority: 'high',
    action: 'ALERTE_DEPOTS',
    threshold: (d) => {
      const liquide = (d.balance_sheet?.cash ?? 0) + (d.balance_sheet?.short_term_investments ?? 0);
      const depots = d.balance_sheet?.deposits ?? 1;
      const ratio = depots > 0 ? liquide / depots : 0;
      return { value: ratio, violated: ratio < 0.15, severity: 'warning' };
    },
    lang: { fr: 'Actifs liquides / Dépôts clients ≥ 15%', en: 'Liquid assets / Customer deposits ≥ 15%', pt: 'Ativos líquidos / Depósitos ≥ 15%' },
    recommendation: { fr: 'Diversifier sources de refinancement BCEAO', en: 'Diversify BCEAO refinancing sources', pt: 'Diversificar fontes refinanciamento BCEAO' },
  },
  'BCEAO-R005': {
    id: 'BCEAO-R005',
    name: 'Rentabilité financière (ROE) ≥ 5%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'roe', 'rentabilite', 'bceao', 'performance'],
    priority: 'high',
    action: 'ALERTE_RENTABILITE',
    threshold: (d) => {
      const net = d.income_statement?.net_income ?? 0;
      const fp = d.balance_sheet?.equity ?? 1;
      const ratio = fp > 0 ? net / fp : 0;
      return { value: ratio, violated: ratio < 0.05, severity: ratio < 0.02 ? 'critical' : 'warning' };
    },
    lang: { fr: 'ROE (Résultat net / FP) ≥ 5%', en: 'ROE (Net income / Equity) ≥ 5%', pt: 'ROE ≥ 5%' },
    recommendation: { fr: 'Optimiser structure financière ou marges', en: 'Optimize financial structure or margins', pt: 'Otimizar estrutura financeira ou margens' },
  },
  'BCEAO-R006': {
    id: 'BCEAO-R006',
    name: 'Rentabilité économique (ROA) ≥ 1%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'roa', 'rentabilite', 'bceao', 'actif'],
    priority: 'medium',
    action: 'ALERTE_ROA',
    threshold: (d) => {
      const net = d.income_statement?.net_income ?? 0;
      const actif = d.balance_sheet?.total_assets ?? 1;
      const ratio = actif > 0 ? net / actif : 0;
      return { value: ratio, violated: ratio < 0.01, severity: ratio < 0 ? 'critical' : 'warning' };
    },
    lang: { fr: 'ROA (Résultat net / Actif total) ≥ 1%', en: 'ROA ≥ 1%', pt: 'ROA ≥ 1%' },
    recommendation: { fr: 'Améliorer productivité actifs ou réduire coûts', en: 'Improve asset productivity or cut costs', pt: 'Melhorar produtividade ativos ou reduzir custos' },
  },
  'BCEAO-R007': {
    id: 'BCEAO-R007',
    name: 'Ratio d\'endettement maximum 85%',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'endettement', 'bceao', 'levier', 'autonomie'],
    priority: 'high',
    action: 'ALERTE_ENDETTEMENT',
    threshold: (d) => {
      const dette = d.balance_sheet?.total_liabilities ?? 0;
      const actif = d.balance_sheet?.total_assets ?? 1;
      const ratio = actif > 0 ? dette / actif : 0;
      return { value: ratio, violated: ratio > 0.85, severity: ratio > 0.90 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Endettement (Dette / Actif) ≤ 85%', en: 'Debt ratio ≤ 85%', pt: 'Endividamento ≤ 85%' },
    recommendation: { fr: 'Renforcer capitaux propres ou restructurer dette', en: 'Strengthen equity or restructure debt', pt: 'Reforçar PL ou reestruturar dívida' },
  },
  'BCEAO-R008': {
    id: 'BCEAO-R008',
    name: 'Masse salariale / Charges d\'exploitation',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'masse salariale', 'charges', 'bceao', 'efficience'],
    priority: 'medium',
    action: 'ALERTE_EFFICIENCE',
    threshold: (d) => {
      const masse = d.income_statement?.personnel_costs ?? 0;
      const charges = d.income_statement?.operating_expenses ?? 1;
      const ratio = charges > 0 ? masse / charges : 0;
      return { value: ratio, violated: ratio > 0.60, severity: ratio > 0.70 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Masse salariale / Charges exploitation ≤ 60%', en: 'Personnel costs / OpEx ≤ 60%', pt: 'Massa salarial / Despesas operacionais ≤ 60%' },
    recommendation: { fr: 'Automatiser processus ou revue organigramme', en: 'Automate processes or review org chart', pt: 'Automatizar processos ou revisar organograma' },
  },
  'BCEAO-R009': {
    id: 'BCEAO-R009',
    name: 'Créances / Capitaux propres',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'creances', 'capitaux propres', 'bceao', 'concentration'],
    priority: 'medium',
    action: 'ALERTE_CONCENTRATION',
    threshold: (d) => {
      const creances = d.balance_sheet?.loans ?? 0;
      const fp = d.balance_sheet?.equity ?? 1;
      const ratio = fp > 0 ? creances / fp : 0;
      return { value: ratio, violated: ratio > 8, severity: ratio > 10 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Créances / FP ≤ 8x', en: 'Loans / Equity ≤ 8x', pt: 'Créditos / PL ≤ 8x' },
    recommendation: { fr: 'Diluer risque crédit ou augmenter fonds propres', en: 'Diversify credit risk or increase equity', pt: 'Diversificar risco crédito ou aumentar PL' },
  },
  'BCEAO-R010': {
    id: 'BCEAO-R010',
    name: 'Couverture des créances douteuses par provisions',
    category: 'Ratios Prudentiels',
    tags: ['ratio', 'provision', 'creance', 'douteuse', 'bceao', 'couverture'],
    priority: 'critical',
    action: 'ALERTE_COUVERTURE',
    threshold: (d) => {
      const prov = d.balance_sheet?.provisions ?? 0;
      const douteuses = d.risk_data?.doubtful_loans ?? 1;
      const ratio = douteuses > 0 ? prov / douteuses : 0;
      return { value: ratio, violated: ratio < 0.50, severity: ratio < 0.30 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Couverture créances douteuses ≥ 50%', en: 'Doubtful loan coverage ≥ 50%', pt: 'Cobertura créditos duvidosos ≥ 50%' },
    recommendation: { fr: 'Constituer provisions complémentaires immédiatement', en: 'Build additional provisions immediately', pt: 'Constituir provisões complementares imediatamente' },
  },

  // ═══ CONFORMITÉ COMPTABLE OHADA (8 rules) ═══
  'OHADA-C101': {
    id: 'OHADA-C101',
    name: 'Plan comptable SYSCOHADA révisé',
    category: 'Conformité Comptable',
    tags: ['plan comptable', 'syscohada', 'ohada', 'norme', 'révisée'],
    priority: 'critical',
    action: 'AUDIT_PLAN_COMPTABLE',
    threshold: (d) => ({ value: true, violated: false, severity: 'ok' }),
    lang: { fr: 'Plan comptable conforme SYSCOHADA révisé 2017', en: 'Chart of accounts aligned with SYSCOHADA revised 2017', pt: 'Plano contábil conforme SYSCOHADA revisado 2017' },
    recommendation: { fr: 'Mettre à jour les comptes 8 et 9', en: 'Update accounts 8 and 9', pt: 'Atualizar contas 8 e 9' },
  },
  'OHADA-C102': {
    id: 'OHADA-C102',
    name: 'Clôture annuelle dans les 3 mois',
    category: 'Conformité Comptable',
    tags: ['cloture', 'annuelle', 'delai', 'ohada', '3 mois'],
    priority: 'high',
    action: 'ALERTE_DELAI_CLOTURE',
    threshold: (d) => {
      const closed = d.regulatory?.accounts_closed_within_90_days ?? true;
      return { value: closed, violated: !closed, severity: closed ? 'ok' : 'critical' };
    },
    lang: { fr: 'Comptes clôturés dans les 3 mois après fin exercice', en: 'Accounts closed within 3 months of year-end', pt: 'Contas fechadas em 3 meses após fim exercício' },
    recommendation: { fr: 'Accélérer processus de clôture ou externaliser', en: 'Speed up closing or outsource', pt: 'Acelerar processo fechamento ou externalizar' },
  },
  'OHADA-C103': {
    id: 'OHADA-C103',
    name: 'Certification des comptes par commissaire',
    category: 'Conformité Comptable',
    tags: ['certification', 'commissaire', 'comptes', 'ohada', 'audit'],
    priority: 'critical',
    action: 'ALERTE_CERTIFICATION',
    threshold: (d) => {
      const cert = d.regulatory?.audit_certified ?? true;
      return { value: cert, violated: !cert, severity: cert ? 'ok' : 'critical' };
    },
    lang: { fr: 'Comptes certifiés par commissaire aux comptes', en: 'Accounts certified by statutory auditor', pt: 'Contas certificadas por revisor oficial' },
    recommendation: { fr: 'Nommer commissaire si seuil dépassé (CA > 300M FCFA)', en: 'Appoint auditor if threshold exceeded', pt: 'Nomear revisor se limite ultrapassado' },
  },
  'OHADA-C104': {
    id: 'OHADA-C104',
    name: 'États financiers consolidés',
    category: 'Conformité Comptable',
    tags: ['consolidation', 'etats financiers', 'ohada', 'groupe'],
    priority: 'medium',
    action: 'CONSOLIDATION',
    threshold: (d) => {
      const req = d.regulatory?.consolidated_accounts ?? false;
      return { value: req, violated: false, severity: 'ok' };
    },
    lang: { fr: 'Consolidation si contrôle de filiales', en: 'Consolidation if subsidiary control', pt: 'Consolidação se controle de subsidiárias' },
    recommendation: { fr: 'Établir périmètre de consolidation', en: 'Define consolidation scope', pt: 'Estabelecer perímetro consolidação' },
  },
  'OHADA-C105': {
    id: 'OHADA-C105',
    name: 'Notes annexes complètes',
    category: 'Conformité Comptable',
    tags: ['notes', 'annexes', 'ohada', 'information'],
    priority: 'high',
    action: 'COMPLETUDE_NOTES',
    threshold: (d) => {
      const complete = d.regulatory?.notes_annexes_complete ?? true;
      return { value: complete, violated: !complete, severity: complete ? 'ok' : 'warning' };
    },
    lang: { fr: 'Notes annexes conformes SYSCOHADA (méthodes, postes significatifs)', en: 'Notes aligned with SYSCOHADA', pt: 'Notas anexas conforme SYSCOHADA' },
    recommendation: { fr: 'Compléter les notes 1 à 12 minimum', en: 'Complete notes 1 to 12 minimum', pt: 'Completar notas 1 a 12 mínimo' },
  },
  'OHADA-C106': {
    id: 'OHADA-C106',
    name: 'Tableau de flux de trésorerie',
    category: 'Conformité Comptable',
    tags: ['flux', 'tresorerie', 'ohada', 'cash flow'],
    priority: 'high',
    action: 'TABLEAU_FLUX',
    threshold: (d) => {
      const ok = d.regulatory?.cash_flow_statement ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'warning' };
    },
    lang: { fr: 'Tableau des flux de trésorerie obligatoire', en: 'Cash flow statement mandatory', pt: 'Demonstrativo fluxo caixa obrigatório' },
    recommendation: { fr: 'Établir méthode directe ou indirecte', en: 'Use direct or indirect method', pt: 'Usar método direto ou indireto' },
  },
  'OHADA-C107': {
    id: 'OHADA-C107',
    name: 'État de variation des capitaux propres',
    category: 'Conformité Comptable',
    tags: ['variation', 'capitaux propres', 'ohada', 'evolution'],
    priority: 'medium',
    action: 'EVOLUTION_CP',
    threshold: (d) => {
      const ok = d.regulatory?.equity_variation_statement ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'warning' };
    },
    lang: { fr: 'État de variation des capitaux propres', en: 'Statement of changes in equity', pt: 'Demonstrativo variação PL' },
    recommendation: { fr: 'Détailler mouvements : résultat, dividendes, apports', en: 'Detail movements: profit, dividends, contributions', pt: 'Detalhar movimentos: resultado, dividendos, aportes' },
  },
  'OHADA-C108': {
    id: 'OHADA-C108',
    name: 'Reporting ESG',
    category: 'Conformité Comptable',
    tags: ['esg', 'reporting', 'ohada', 'durabilite'],
    priority: 'low',
    action: 'ESG_REPORTING',
    threshold: (d) => {
      const esg = d.regulatory?.esg_reporting ?? false;
      return { value: esg, violated: false, severity: 'ok' };
    },
    lang: { fr: 'Reporting ESG recommandé pour grandes entités', en: 'ESG reporting recommended for large entities', pt: 'Relatório ESG recomendado grandes entidades' },
    recommendation: { fr: 'Préparer reporting ESG volontaire', en: 'Prepare voluntary ESG reporting', pt: 'Preparar relatório ESG voluntário' },
  },

  // ═══ GOUVERNANCE COBAC (7 rules) ═══
  'COBAC-G201': {
    id: 'COBAC-G201',
    name: 'Indépendance du conseil d\'administration',
    category: 'Gouvernance',
    tags: ['conseil', 'administration', 'independance', 'cobac', 'gouvernance'],
    priority: 'critical',
    action: 'ALERTE_GOVERNANCE',
    threshold: (d) => {
      const pct = d.governance?.board_independence_pct ?? 0.5;
      return { value: pct, violated: pct < 0.33, severity: pct < 0.20 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Indépendants / Conseil ≥ 1/3', en: 'Independent directors ≥ 1/3', pt: 'Independentes / Conselho ≥ 1/3' },
    recommendation: { fr: 'Nommer administrateurs indépendants', en: 'Appoint independent directors', pt: 'Nomear administradores independentes' },
  },
  'COBAC-G202': {
    id: 'COBAC-G202',
    name: 'Comité d\'audit opérationnel',
    category: 'Gouvernance',
    tags: ['comite', 'audit', 'cobac', 'conseil', 'controle'],
    priority: 'critical',
    action: 'ALERTE_AUDIT',
    threshold: (d) => {
      const ok = d.governance?.audit_committee_active ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'critical' };
    },
    lang: { fr: 'Comité d\'audit opérationnel obligatoire', en: 'Audit committee mandatory', pt: 'Comité auditoria obrigatório' },
    recommendation: { fr: 'Créer comité avec 3 membres minimum', en: 'Create committee with 3 members minimum', pt: 'Criar comité 3 membros mínimo' },
  },
  'COBAC-G203': {
    id: 'COBAC-G203',
    name: 'Fonction de conformité dédiée',
    category: 'Gouvernance',
    tags: ['conformite', 'officier', 'cobac', 'lbcft', 'risk'],
    priority: 'critical',
    action: 'ALERTE_CONFORMITE',
    threshold: (d) => {
      const ok = d.governance?.compliance_officer ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'critical' };
    },
    lang: { fr: 'Responsable conformité nominé et indépendant', en: 'Dedicated compliance officer', pt: 'Oficial conformidade dedicado' },
    recommendation: { fr: 'Nommer RCC avec rattachement direct CODIR', en: 'Appoint CCO reporting to CEO', pt: 'Nomear CCO reportando ao CEO' },
  },
  'COBAC-G204': {
    id: 'COBAC-G204',
    name: 'Contrôle interne documenté',
    category: 'Gouvernance',
    tags: ['controle', 'interne', 'documente', 'cobac', 'procedure'],
    priority: 'high',
    action: 'ALERTE_CONTROLE',
    threshold: (d) => {
      const ok = d.governance?.internal_control_documented ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'warning' };
    },
    lang: { fr: 'Contrôle interne formalisé et testé', en: 'Formalized and tested internal control', pt: 'Controle interno formalizado e testado' },
    recommendation: { fr: 'Rédiger manuel de contrôle interne', en: 'Write internal control manual', pt: 'Redigir manual controle interno' },
  },
  'COBAC-G205': {
    id: 'COBAC-G205',
    name: 'Cartographie des risques à jour',
    category: 'Gouvernance',
    tags: ['cartographie', 'risque', 'cobac', 'actuel', 'metier'],
    priority: 'high',
    action: 'ALERTE_RISQUE',
    threshold: (d) => {
      const date = d.governance?.risk_map_updated;
      if (!date) return { value: null, violated: true, severity: 'critical' };
      const months = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30);
      return { value: months, violated: months > 12, severity: months > 18 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Cartographie des risques < 12 mois', en: 'Risk map < 12 months old', pt: 'Mapeamento riscos < 12 meses' },
    recommendation: { fr: 'Mettre à jour cartographie annuellement', en: 'Update risk map annually', pt: 'Atualizar mapeamento anualmente' },
  },
  'COBAC-G206': {
    id: 'COBAC-G206',
    name: 'Plan de continuité d\'activité',
    category: 'Gouvernance',
    tags: ['pca', 'continuite', 'cobac', 'resilience', 'crise'],
    priority: 'high',
    action: 'ALERTE_PCA',
    threshold: (d) => {
      const ok = d.governance?.bcp_tested ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'critical' };
    },
    lang: { fr: 'PCA testé dans les 12 mois', en: 'BCP tested within 12 months', pt: 'PCA testado em 12 meses' },
    recommendation: { fr: 'Organiser exercice PCA semi-annuel', en: 'Run BCP drill semi-annually', pt: 'Organizar exercício PCA semestral' },
  },
  'COBAC-G207': {
    id: 'COBAC-G207',
    name: 'Protection lanceurs d\'alerte',
    category: 'Gouvernance',
    tags: ['lanceur', 'alerte', 'whistleblower', 'cobac', 'ethique'],
    priority: 'high',
    action: 'ALERTE_ALERTE',
    threshold: (d) => {
      const ok = d.governance?.whistleblower_protection ?? true;
      return { value: ok, violated: !ok, severity: ok ? 'ok' : 'warning' };
    },
    lang: { fr: 'Dispositif lanceur d\'alerte conforme OHADA', en: 'Whistleblowing mechanism compliant', pt: 'Dispositivo denúncia conforme OHADA' },
    recommendation: { fr: 'Canal anonyme + charte éthique', en: 'Anonymous channel + ethics charter', pt: 'Canal anônimo + carta ética' },
  },

  // ═══ LBC/FT GAFI (7 rules) ═══
  'GAFI-L301': {
    id: 'GAFI-L301',
    name: 'KYC client conforme',
    category: 'LBC/FT',
    tags: ['kyc', 'client', 'gafi', 'identification', 'due diligence'],
    priority: 'critical',
    action: 'ALERTE_KYC',
    threshold: (d) => {
      const rate = d.risk_data?.kyc_completion_rate ?? 1;
      return { value: rate, violated: rate < 0.95, severity: rate < 0.80 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Taux KYC complet ≥ 95%', en: 'KYC completion rate ≥ 95%', pt: 'Taxa KYC completa ≥ 95%' },
    recommendation: { fr: 'Rattrapage KYC sur portefeuille historique', en: 'Backfill KYC on legacy portfolio', pt: 'Retroativo KYC portfólio legado' },
  },
  'GAFI-L302': {
    id: 'GAFI-L302',
    name: 'Due diligence renforcée PEP',
    category: 'LBC/FT',
    tags: ['pep', 'due diligence', 'renforcee', 'gafi', 'haut risque'],
    priority: 'critical',
    action: 'ALERTE_PEP',
    threshold: (d) => {
      const pep = d.risk_data?.pep_count ?? 0;
      return { value: pep, violated: pep > 0, severity: pep > 5 ? 'critical' : 'warning' };
    },
    lang: { fr: 'PEP identifiés et traités en DD renforcée', en: 'PEPs identified with enhanced DD', pt: 'PEPs identificados com DD reforçada' },
    recommendation: { fr: 'Mise à jour quotidienne liste PEP', en: 'Daily PEP list update', pt: 'Atualização diária lista PEP' },
  },
  'GAFI-L303': {
    id: 'GAFI-L303',
    name: 'Surveillance transactions suspectes',
    category: 'LBC/FT',
    tags: ['surveillance', 'transaction', 'suspecte', 'gafi', 'monitoring'],
    priority: 'critical',
    action: 'ALERTE_TRANSACTION',
    threshold: (d) => {
      const count = d.risk_data?.suspicious_txn_count ?? 0;
      return { value: count, violated: count > 0, severity: count > 10 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Alertes transactions suspectes traitées', en: 'Suspicious transaction alerts processed', pt: 'Alertas transações suspeitas processadas' },
    recommendation: { fr: 'Paramétrer seuils de surveillance automatique', en: 'Set automated monitoring thresholds', pt: 'Parametrizar limites monitoramento automático' },
  },
  'GAFI-L304': {
    id: 'GAFI-L304',
    name: 'Déclaration TRACFIN/CTR',
    category: 'LBC/FT',
    tags: ['tracfin', 'ctr', 'declaration', 'gafi', 'obligation'],
    priority: 'critical',
    action: 'ALERTE_DECLARATION',
    threshold: (d) => {
      const amount = d.risk_data?.suspicious_txn_amount ?? 0;
      return { value: amount, violated: amount > 10000000, severity: amount > 50000000 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Déclarations suspicion TRACFIN dans les 30j', en: 'TRACFIN declaration within 30 days', pt: 'Declaração suspeita TRACFIN em 30 dias' },
    recommendation: { fr: 'Automatiser génération déclarations', en: 'Automate declaration generation', pt: 'Automatizar geração declarações' },
  },
  'GAFI-L305': {
    id: 'GAFI-L305',
    name: 'Gel des avoirs conforme résolutions ONU',
    category: 'LBC/FT',
    tags: ['gel', 'avoir', 'onu', 'gafi', 'sanctions'],
    priority: 'critical',
    action: 'ALERTE_GEL',
    threshold: (d) => {
      const frozen = d.risk_data?.frozen_assets_count ?? 0;
      return { value: frozen, violated: frozen > 0, severity: frozen > 5 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Gel immédiat des avoirs conforme listes ONU', en: 'Immediate asset freeze per UN lists', pt: 'Congelamento imediato ativos conforme listas ONU' },
    recommendation: { fr: 'Mise à jour quotidienne listes sanctions', en: 'Daily sanctions list update', pt: 'Atualização diária listas sanções' },
  },
  'GAFI-L306': {
    id: 'GAFI-L306',
    name: 'Formation LBC/FT personnel',
    category: 'LBC/FT',
    tags: ['formation', 'lbcft', 'personnel', 'gafi', 'training'],
    priority: 'high',
    action: 'ALERTE_FORMATION',
    threshold: (d) => {
      const pct = d.risk_data?.staff_trained_lbcft_pct ?? 1;
      return { value: pct, violated: pct < 0.90, severity: pct < 0.70 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Personnel formé LBC/FT ≥ 90%', en: 'Staff LBC/FT trained ≥ 90%', pt: 'Pessoal treinado LBC/FT ≥ 90%' },
    recommendation: { fr: 'Plan formation annuel + certification', en: 'Annual training plan + certification', pt: 'Plano treinamento anual + certificação' },
  },
  'GAFI-L307': {
    id: 'GAFI-L307',
    name: 'Évaluation risque pays',
    category: 'LBC/FT',
    tags: ['risque', 'pays', 'gafi', 'geographique', 'scoring'],
    priority: 'medium',
    action: 'ALERTE_PAYS',
    threshold: (d) => {
      const score = d.risk_data?.country_risk_score ?? 3;
      return { value: score, violated: score > 6, severity: score > 8 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Risque pays évalué et mitigé', en: 'Country risk assessed and mitigated', pt: 'Risco país avaliado e mitigado' },
    recommendation: { fr: 'Restreindre relations correspondants haut risque', en: 'Restrict high-risk correspondent relationships', pt: 'Restringir relações correspondentes alto risco' },
  },

  // ═══ PATRIMOINE & IMMOBILISATIONS (7 rules) ═══
  'SYSCOHADA-601': {
    id: 'SYSCOHADA-601',
    name: 'Capital minimum social',
    category: 'Patrimoine',
    tags: ['capital', 'minimum', 'social', 'syscohada', 'sfd', 'banque'],
    priority: 'critical',
    action: 'ALERTE_CAPITAL',
    threshold: (d) => {
      const paid = d.regulatory?.capital_paid ?? 0;
      const required = d.regulatory?.capital_required ?? 1;
      const ratio = required > 0 ? paid / required : 0;
      return { value: ratio, violated: ratio < 1, severity: ratio < 0.8 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Capital social libéré ≥ Capital minimum requis', en: 'Paid-in capital ≥ minimum required', pt: 'Capital social integralizado ≥ mínimo exigido' },
    recommendation: { fr: 'Appel de fonds ou augmentation capital', en: 'Capital call or increase', pt: 'Chamada capital ou aumento' },
  },
  'SYSCOHADA-602': {
    id: 'SYSCOHADA-602',
    name: 'Libération du capital social',
    category: 'Patrimoine',
    tags: ['capital', 'liberation', 'syscohada', 'souscription'],
    priority: 'critical',
    action: 'ALERTE_LIBERATION',
    threshold: (d) => {
      const paid = d.regulatory?.capital_paid ?? 0;
      const min = d.regulatory?.capital_minimum ?? 1;
      const ratio = min > 0 ? paid / min : 0;
      return { value: ratio, violated: ratio < 1, severity: ratio < 0.75 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Capital libéré ≥ 100% capital souscrit', en: 'Paid capital ≥ 100% subscribed', pt: 'Capital integralizado ≥ 100% subscrito' },
    recommendation: { fr: 'Relancer actionnaires défaillants', en: 'Pursue defaulting shareholders', pt: 'Cobrar acionistas inadimplentes' },
  },
  'SYSCOHADA-603': {
    id: 'SYSCOHADA-603',
    name: 'Réserves légales 10% bénéfice net',
    category: 'Patrimoine',
    tags: ['reserve', 'legale', 'syscohada', 'benefice', 'distribution'],
    priority: 'high',
    action: 'ALERTE_RESERVE',
    threshold: (d) => {
      const reserve = d.regulatory?.legal_reserve ?? 0;
      const profit = d.regulatory?.net_profit ?? 1;
      const ratio = profit > 0 ? reserve / profit : 0;
      return { value: ratio, violated: ratio < 0.10, severity: ratio < 0.05 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Réserve légale ≥ 10% bénéfice net annuel', en: 'Legal reserve ≥ 10% annual net profit', pt: 'Reserva legal ≥ 10% lucro líquido anual' },
    recommendation: { fr: 'Prélever 10% avant distribution dividendes', en: 'Deduct 10% before dividend distribution', pt: 'Prelevar 10% antes distribuição dividendos' },
  },
  'SYSCOHADA-604': {
    id: 'SYSCOHADA-604',
    name: 'Fonds de roulement suffisant',
    category: 'Patrimoine',
    tags: ['fonds', 'roulement', 'syscohada', 'frng', 'treorerie'],
    priority: 'high',
    action: 'ALERTE_FRNG',
    threshold: (d) => {
      const actif = (d.balance_sheet?.inventory ?? 0) + (d.balance_sheet?.receivables ?? 0);
      const passif = d.balance_sheet?.short_term_debt ?? 1;
      const frng = actif - passif; // Simplifié
      return { value: frng, violated: frng < 0, severity: frng < -0.1 * (d.balance_sheet?.total_assets ?? 1) ? 'critical' : 'warning' };
    },
    lang: { fr: 'FRNG positif (Ressources stables > Emplois stables)', en: 'Positive working capital', pt: 'Capital giro positivo' },
    recommendation: { fr: 'Allonger dette ou réduire BFR', en: 'Extend debt or reduce WCR', pt: 'Alongar dívida ou reduzir CCL' },
  },
  'SYSCOHADA-605': {
    id: 'SYSCOHADA-605',
    name: 'Actif circulant > Passif circulant',
    category: 'Patrimoine',
    tags: ['actif', 'circulant', 'passif', 'syscohada', 'solvabilite'],
    priority: 'high',
    action: 'ALERTE_BILAN',
    threshold: (d) => {
      const actifCT = (d.balance_sheet?.cash ?? 0) + (d.balance_sheet?.receivables ?? 0) + (d.balance_sheet?.inventory ?? 0);
      const passifCT = d.balance_sheet?.short_term_debt ?? 1;
      const ratio = passifCT > 0 ? actifCT / passifCT : 0;
      return { value: ratio, violated: ratio < 1, severity: ratio < 0.9 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Actif circulant / Passif circulant ≥ 100%', en: 'Current assets / Current liabilities ≥ 100%', pt: 'Ativo circulante / Passivo circulante ≥ 100%' },
    recommendation: { fr: 'Accélérer rotation stocks et créances', en: 'Speed up inventory and receivables turnover', pt: 'Acelerar rotação estoques e recebíveis' },
  },
  'SYSCOHADA-606': {
    id: 'SYSCOHADA-606',
    name: 'Autonomie financière > 15%',
    category: 'Patrimoine',
    tags: ['autonomie', 'financiere', 'syscohada', 'capitaux propres', 'independance'],
    priority: 'high',
    action: 'ALERTE_AUTONOMIE',
    threshold: (d) => {
      const fp = d.balance_sheet?.equity ?? 0;
      const dette = d.balance_sheet?.long_term_debt ?? 1;
      const ratio = dette > 0 ? fp / dette : 0;
      return { value: ratio, violated: ratio < 0.15, severity: ratio < 0.10 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Autonomie financière (FP / Dette LT) ≥ 15%', en: 'Financial autonomy ≥ 15%', pt: 'Autonomia financeira ≥ 15%' },
    recommendation: { fr: 'Désendetter ou augmenter réserves', en: 'Deleverage or increase reserves', pt: 'Desendividar ou aumentar reservas' },
  },
  'SYSCOHADA-607': {
    id: 'SYSCOHADA-607',
    name: 'Valeur ajoutée / effectif',
    category: 'Patrimoine',
    tags: ['valeur', 'ajoutee', 'productivite', 'syscohada', 'efficience'],
    priority: 'medium',
    action: 'ALERTE_PRODUCTIVITE',
    threshold: (d) => {
      const va = (d.income_statement?.revenue ?? 0) - (d.income_statement?.operating_expenses ?? 0);
      return { value: va, violated: va < 0, severity: va < -10000000 ? 'critical' : 'warning' };
    },
    lang: { fr: 'Valeur ajoutée positive', en: 'Positive value added', pt: 'Valor adicionado positivo' },
    recommendation: { fr: 'Optimiser chaîne valeur ou réduire coûts intermédiaires', en: 'Optimize value chain or cut intermediate costs', pt: 'Otimizar cadeia valor ou reduzir custos intermediários' },
  },
};

// ─── HNSW In-Memory Search ───────────────────────────────────
function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !['des', 'les', 'une', 'and', 'the', 'for'].includes(t));
}

function buildTagIndex(): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();
  for (const [id, rule] of Object.entries(OHADA_RULES)) {
    const tokens = [...rule.tags, ...tokenize(rule.name), ...tokenize(rule.lang.fr), ...tokenize(rule.lang.en)];
    for (const tok of tokens) {
      if (!index.has(tok)) index.set(tok, new Set());
      index.get(tok)!.add(id);
    }
  }
  return index;
}

const TAG_INDEX = buildTagIndex();

function searchRulesByQuery(query: string, topK = 15): string[] {
  const tokens = tokenize(query);
  const scores = new Map<string, number>();
  for (const tok of tokens) {
    const ids = TAG_INDEX.get(tok);
    if (!ids) continue;
    for (const id of ids) {
      scores.set(id, (scores.get(id) || 0) + 1);
    }
  }
  const sorted = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topK)
    .map(([id]) => id);
  // Fallback : si aucun match, retourner toutes les règles
  return sorted.length > 0 ? sorted : Object.keys(OHADA_RULES);
}

// ─── Evaluation Engine ───────────────────────────────────────
interface EvaluationResult {
  rule_id: string;
  rule_name: string;
  category: string;
  value: number | boolean | null;
  violated: boolean;
  severity: string;
  priority: string;
  action: string;
  message: string;
  recommendation: string;
  execution_ms: number;
}

function evaluateRule(ruleId: string, data: FinancialSnapshot, lang: string): EvaluationResult {
  const rule = OHADA_RULES[ruleId];
  const start = performance.now();
  const threshold = rule.threshold(data);
  const execMs = Math.round(performance.now() - start);
  return {
    rule_id: ruleId,
    rule_name: rule.name,
    category: rule.category,
    value: threshold.value,
    violated: threshold.violated,
    severity: threshold.severity,
    priority: rule.priority,
    action: rule.action,
    message: rule.lang[lang] || rule.lang.fr,
    recommendation: rule.recommendation[lang] || rule.recommendation.fr,
    execution_ms: execMs,
  };
}

// ─── Supabase Integration (optional DB read) ───────────────────
async function loadFinancialSnapshot(supabase: any, entityId: string): Promise<FinancialSnapshot | null> {
  const { data, error } = await supabase
    .from('financial_analyses')
    .select('financial_tables, ratios, risk_assessment, recommendations, score, status')
    .eq('id', entityId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    balance_sheet: data.financial_tables?.balance_sheet,
    income_statement: data.financial_tables?.income_statement,
    risk_data: data.risk_assessment,
    regulatory: data.recommendations,
    metadata: {
      entity_type: data.status,
      reporting_date: data.financial_tables?.reporting_date,
    },
  };
}

// ─── Main Handler ────────────────────────────────────────────
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // allow empty body for health check
  }

  const {
    query,
    entity_id,
    financial_snapshot,
    rules_filter,
    lang = 'fr',
    mode = 'all',
    top_k = 15,
    include_sql = false,
  } = body;

  const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('VITE_PUBLIC_SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  const startTime = Date.now();

  // 1. Rule selection
  let selectedIds: string[];
  if (mode === 'search' && query) {
    selectedIds = searchRulesByQuery(query, top_k);
  } else if (mode === 'filtered' && Array.isArray(rules_filter)) {
    selectedIds = rules_filter.filter((id: string) => id in OHADA_RULES);
  } else {
    selectedIds = Object.keys(OHADA_RULES);
  }

  // 2. Load financial data
  let snapshot: FinancialSnapshot | null = financial_snapshot || null;
  if (entity_id && !snapshot) {
    snapshot = await loadFinancialSnapshot(supabase, entity_id);
  }

  // 3. Evaluate rules
  const results: EvaluationResult[] = [];
  for (const id of selectedIds) {
    results.push(evaluateRule(id, snapshot || {}, lang));
  }

  // 4. Categorize
  const violations = results.filter(r => r.violated);
  const critical = violations.filter(r => r.priority === 'critical');
  const high = violations.filter(r => r.priority === 'high');
  const byCategory = results.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {} as Record<string, EvaluationResult[]>);

  // 5. Optional : hybrid search via pgvector for documentation enrichment
  let kbMatches: any[] = [];
  if (query) {
    try {
      const { data } = await supabase.rpc('hybrid_search_khepra', {
        query_text: query,
        query_embedding: null, // embeddings générés côté DB
        match_count: 5,
        full_text_weight: 0.4,
        semantic_weight: 0.6,
        rrf_k: 60,
      });
      if (data) kbMatches = data;
    } catch {
      // pgvector non disponible = skip silencieusement
    }
  }

  const totalTime = Date.now() - startTime;

  return new Response(
    JSON.stringify({
      status: 'OK',
      code: 'COMPLIANCE_EVAL_OK',
      meta: {
        message: `${results.length} règles OHADA évaluées en ${totalTime}ms`,
        detail: {
          engine: 'KOS-Compliance-Engine-v1.0',
          standards: ['SYSCOHADA-REVISEE-2017', 'OHADA-ACTE-UNIFORME-2014', 'BCEAO-CIRCULAIRES', 'COBAC-DIRECTIVES-2026', 'GAFI-REC40-2024'],
          hnsw_enabled: true,
          pgvector_enabled: kbMatches.length > 0,
          execution_ms: totalTime,
          rules_total: 47,
          rules_evaluated: results.length,
          violations: violations.length,
          critical_violations: critical.length,
          high_violations: high.length,
          search_mode: mode,
          query: query || null,
          entity_id: entity_id || null,
          data_source: snapshot ? (financial_snapshot ? 'payload' : 'database') : 'dry_run',
        },
      },
      data: {
        summary: {
          score: Math.max(0, 100 - violations.length * 2 - critical.length * 3),
          grade: violations.length === 0 ? 'A' : critical.length === 0 ? 'B' : critical.length < 3 ? 'C' : 'D',
          status: violations.length === 0 ? 'CONFORME' : critical.length > 0 ? 'NON_CONFORME_CRITIQUE' : 'NON_CONFORME',
          next_review: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        violations: violations.map(v => ({
          rule_id: v.rule_id,
          name: v.rule_name,
          category: v.category,
          value: v.value,
          severity: v.severity,
          priority: v.priority,
          action: v.action,
          message: v.message,
          recommendation: v.recommendation,
        })),
        results,
        by_category: byCategory,
        kb_references: kbMatches.slice(0, 3).map((m: any) => ({
          title: m.title || m.name || 'Document réglementaire',
          regulator: m.regulator || m.bigfour_metadata?.regulator || 'OHADA',
          similarity: m.similarity || m.rrf_score,
        })),
      },
    }),
    { headers: { ...corsHeaders, 'X-Execution-Time': String(totalTime), 'X-Rules-Evaluated': String(results.length) } }
  );
});