// ============================================================================
// KOS SELF-EVOLUTION PROGRAM — Big Four Autonomous Capability Absorption
// ============================================================================

// --- DECISION ENGINE ---

export interface PreExecutionRule {
  id: string;
  priority: number;
  question: string;
  description: string;
  icon: string;
  examples: string[];
  successMetric: string;
}

export const PRE_EXECUTION_RULES: PreExecutionRule[] = [
  {
    id: 'rule-1',
    priority: 1,
    question: 'Peut-on résoudre le besoin avec n8n natif ?',
    description: 'Avant d\'appeler un LLM ou un agent externe, vérifier si n8n peut gérer le workflow de bout en bout via ses nodes natifs (HTTP Request, Webhook, Code, Function, Switch, Merge, Split, etc.).',
    icon: 'ri-git-branch-line',
    examples: [
      'Transformation JSON → n8n Function Node',
      'Routage conditionnel → n8n Switch Node',
      'Planification → n8n Cron / Schedule Trigger',
      'Appels API → n8n HTTP Request Node',
      'Fusion de données → n8n Merge Node',
      'Enrichissement → n8n Code Node',
    ],
    successMetric: 'Latence < 50ms, coût = 0 FCFA, 100% déterministe',
  },
  {
    id: 'rule-2',
    priority: 2,
    question: 'Peut-on résoudre le besoin avec un workflow existant ?',
    description: 'Rechercher dans la bibliothèque de workflows KOS si un workflow similaire existe déjà. Mutualiser plutôt que dupliquer.',
    icon: 'ri-folder-open-line',
    examples: [
      'Workflow "Enrichissement Lead" → réutiliser pour "Enrichissement Client"',
      'Workflow "Rapport BCEAO" → adapter pour "Rapport COBAC"',
      'Workflow "SEO Audit Page" → réutiliser pour toutes les pages',
      'Workflow "Notification Email" → template réutilisable',
    ],
    successMetric: 'Taux de réutilisation > 60%, 0 duplication',
  },
  {
    id: 'rule-3',
    priority: 3,
    question: 'Peut-on résoudre le besoin avec un sous-workflow réutilisable ?',
    description: 'Décomposer la tâche en composants atomiques. Vérifier si des sous-workflows existants peuvent être chaînés pour couvrir le besoin.',
    icon: 'ri-puzzle-line',
    examples: [
      'Validation BCEAO → sous-workflow réutilisable',
      'Extraction keywords SEO → sous-workflow réutilisable',
      'Scoring qualité contenu → sous-workflow réutilisable',
      'Formatage livrable PDF → sous-workflow réutilisable',
      'Notification Slack/Email → sous-workflow réutilisable',
    ],
    successMetric: '> 15 sous-workflows actifs, temps assemblage < 5 min',
  },
  {
    id: 'rule-4',
    priority: 4,
    question: 'Peut-on résoudre le besoin avec un modèle LLM déjà disponible ?',
    description: 'Utiliser le modèle le plus économique (Claude Haiku, GPT-4o-mini) avec un prompt validé du KOS Prompt Library. Ne pas créer un nouveau prompt si un existe déjà.',
    icon: 'ri-brain-line',
    examples: [
      'Résumé article → Prompt "resume-article-v3" validé',
      'Génération tags SEO → Prompt "seo-tags-v2" validé',
      'Analyse conformité → Prompt "compliance-check-v4" validé',
      'Traduction FR/EN → Prompt "traduction-institutionnelle-v2" validé',
      'FAQ generation → Prompt "faq-generator-v3" validé',
    ],
    successMetric: 'Coût < 50 FCFA/requête, taux hallucination < 0.5%',
  },
  {
    id: 'rule-5',
    priority: 5,
    question: 'Peut-on mutualiser la fonction dans une bibliothèque interne ?',
    description: 'Si aucune des options précédentes ne fonctionne, créer un nouveau composant MAIS le concevoir comme réutilisable dès le départ. Documentation obligatoire.',
    icon: 'ri-book-shelf-line',
    examples: [
      'Nouveau validateur réglementaire → packagé comme sous-workflow',
      'Nouveau template livrable → ajouté à la bibliothèque',
      'Nouvel extracteur données → exposé via API interne',
      'Nouveau prompt → documenté dans le Prompt Library',
    ],
    successMetric: 'Documentation complète, tests unitaires, versionné',
  },
];

export interface DecisionLog {
  id: string;
  timestamp: string;
  mission: string;
  domain: string;
  ruleApplied: string;
  decision: 'n8n_native' | 'existing_workflow' | 'sub_workflow' | 'llm_existing' | 'library_internal' | 'new_external';
  costSaved: number;
  latencyMs: number;
  wasOptimal: boolean;
}

export const DECISION_LOG: DecisionLog[] = [
  {
    id: 'DEC-001', timestamp: '2026-06-23T08:00:00Z', mission: 'Enrichissement leads CRM', domain: 'CRM',
    ruleApplied: 'rule-1 (n8n natif)', decision: 'n8n_native', costSaved: 12000, latencyMs: 32, wasOptimal: true,
  },
  {
    id: 'DEC-002', timestamp: '2026-06-23T08:15:00Z', mission: 'Rapport conformité BCEAO trimestriel', domain: 'Compliance',
    ruleApplied: 'rule-2 (workflow existant)', decision: 'existing_workflow', costSaved: 45000, latencyMs: 180, wasOptimal: true,
  },
  {
    id: 'DEC-003', timestamp: '2026-06-23T09:00:00Z', mission: 'Résumé article blog 2500 mots', domain: 'Content',
    ruleApplied: 'rule-4 (LLM existant)', decision: 'llm_existing', costSaved: 800, latencyMs: 1200, wasOptimal: true,
  },
  {
    id: 'DEC-004', timestamp: '2026-06-23T09:30:00Z', mission: 'Notification multi-canal leads chauds', domain: 'CRM',
    ruleApplied: 'rule-3 (sous-workflows)', decision: 'sub_workflow', costSaved: 28000, latencyMs: 95, wasOptimal: true,
  },
  {
    id: 'DEC-005', timestamp: '2026-06-23T10:00:00Z', mission: 'Analyse ESG nouveau cadre ISSB 2026', domain: 'ESG',
    ruleApplied: 'rule-5 (bibliothèque interne)', decision: 'library_internal', costSaved: 65000, latencyMs: 450, wasOptimal: true,
  },
  {
    id: 'DEC-006', timestamp: '2026-06-22T16:00:00Z', mission: 'Génération thumbnail YouTube', domain: 'Média',
    ruleApplied: 'rule-4 (LLM + bibliothèque)', decision: 'library_internal', costSaved: 34000, latencyMs: 2200, wasOptimal: true,
  },
  {
    id: 'DEC-007', timestamp: '2026-06-22T14:00:00Z', mission: 'Audit SEO 500 pages', domain: 'SEO',
    ruleApplied: 'rule-1 (n8n natif)', decision: 'n8n_native', costSaved: 98000, latencyMs: 45, wasOptimal: true,
  },
];

// --- KNOWLEDGE REPOSITORY ---

export interface KnowledgeDomain {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  documentCount: number;
  lastUpdated: string;
  maturity: number;
  subCategories: string[];
  keyTexts: { title: string; reference: string; year: string }[];
}

export const KNOWLEDGE_DOMAINS: KnowledgeDomain[] = [
  {
    id: 'bceao', name: 'BCEAO', icon: 'ri-bank-line', color: 'primary',
    description: 'Banque Centrale des États de l\'Afrique de l\'Ouest — Réglementation bancaire, instructions aux SFD, circulaires, décisions de politique monétaire UEMOA.',
    documentCount: 847, lastUpdated: '2026-06-22', maturity: 95,
    subCategories: ['Instructions aux SFD', 'Circulaires bancaires', 'Décisions monétaires', 'Ratio de solvabilité', 'Dispositif prudentiel', 'Reporting périodique', 'Agréments', 'LBC/FT'],
    keyTexts: [
      { title: 'Instruction 003-2018 — Finance Islamique SFD', reference: 'BCEAO/INST/003/2018', year: '2018' },
      { title: 'Circulaire 01-2017 — Gouvernance bancaire', reference: 'BCEAO/CIRC/01/2017', year: '2017' },
      { title: 'Réforme Ratio Solvabilité UEMOA 2026', reference: 'BCEAO/DEC/2026-004', year: '2026' },
      { title: 'Instruction 004-2010 — Retrait Agrément SFD', reference: 'BCEAO/INST/004/2010', year: '2010' },
    ],
  },
  {
    id: 'cobac', name: 'COBAC', icon: 'ri-shield-line', color: 'accent',
    description: 'Commission Bancaire de l\'Afrique Centrale — Réglementation prudentielle CEMAC, directives cybersécurité, LBC/FT, résilience opérationnelle.',
    documentCount: 523, lastUpdated: '2026-06-21', maturity: 91,
    subCategories: ['Directives prudentielles', 'Cybersécurité 2027', 'Résilience opérationnelle', 'Gouvernance CEMAC', 'Inspection bancaire', 'Reporting COBAC', 'Ratio de solvabilité CEMAC'],
    keyTexts: [
      { title: 'Directive Cybersécurité Bancaire COBAC 2027', reference: 'COBAC/DIR/2027-001', year: '2027' },
      { title: 'Règlement COBAC R-2016/01 — Contrôle Interne', reference: 'COBAC/R-2016/01', year: '2016' },
      { title: 'Directive Résilience Opérationnelle CEMAC', reference: 'COBAC/DIR/2026-003', year: '2026' },
    ],
  },
  {
    id: 'ohada', name: 'OHADA', icon: 'ri-scales-line', color: 'secondary',
    description: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires — Actes uniformes, droit des sociétés, sûretés, procédures collectives.',
    documentCount: 412, lastUpdated: '2026-06-20', maturity: 88,
    subCategories: ['Acte Uniforme Sociétés Commerciales', 'Acte Uniforme Sûretés', 'Procédures Collectives', 'Droit Comptable', 'Arbitrage', 'Médiation'],
    keyTexts: [
      { title: 'AUSC-GIE Révisé 2014', reference: 'OHADA/AUSC-GIE/2014', year: '2014' },
      { title: 'Acte Uniforme Sûretés 2010', reference: 'OHADA/AUS/2010', year: '2010' },
      { title: 'Acte Uniforme Procédures Collectives 2015', reference: 'OHADA/AUPC/2015', year: '2015' },
    ],
  },
  {
    id: 'uemoa', name: 'UEMOA', icon: 'ri-global-line', color: 'primary',
    description: 'Union Économique et Monétaire Ouest Africaine — Directives, règlements, politiques sectorielles communes.',
    documentCount: 289, lastUpdated: '2026-06-19', maturity: 84,
    subCategories: ['Politique monétaire', 'Intégration économique', 'Marché financier régional', 'BRVM', 'AMF-UEMOA', 'Libre circulation'],
    keyTexts: [
      { title: 'Traité UEMOA Révisé', reference: 'UEMOA/TRAITE/2003', year: '2003' },
      { title: 'Règlement BRVM — Admission Cotation', reference: 'BRVM/REG/2022-03', year: '2022' },
    ],
  },
  {
    id: 'cemac', name: 'CEMAC', icon: 'ri-earth-line', color: 'accent',
    description: 'Communauté Économique et Monétaire de l\'Afrique Centrale — Réglementation BEAC, politiques communes, convergence.',
    documentCount: 198, lastUpdated: '2026-06-18', maturity: 79,
    subCategories: ['Politique monétaire BEAC', 'Convergence macroéconomique', 'Marché financier unifié', 'COSUMAF', 'Libre circulation CEMAC'],
    keyTexts: [
      { title: 'Convention CEMAC Révisée 2008', reference: 'CEMAC/CONV/2008', year: '2008' },
      { title: 'Règlement COSUMAF — Gestion OPCVM', reference: 'COSUMAF/REG/2023-01', year: '2023' },
    ],
  },
  {
    id: 'audit', name: 'Audit & Contrôle Interne', icon: 'ri-find-replace-line', color: 'secondary',
    description: 'Méthodologies d\'audit Big Four, normes ISA, contrôle interne COSO, cartographie des risques, programmes d\'audit.',
    documentCount: 634, lastUpdated: '2026-06-22', maturity: 92,
    subCategories: ['Normes ISA', 'COSO 2013/2024', 'Audit bancaire', 'Audit SFD', 'Cartographie risques', 'Programmes d\'audit', 'Revue qualité'],
    keyTexts: [
      { title: 'COSO Internal Control — Integrated Framework', reference: 'COSO/IC/2013', year: '2013' },
      { title: 'ISA 315 — Identification et évaluation des risques', reference: 'IAASB/ISA315/2019', year: '2019' },
    ],
  },
  {
    id: 'gouvernance', name: 'Gouvernance', icon: 'ri-government-line', color: 'primary',
    description: 'Gouvernance d\'entreprise, rôle du Conseil, comités spécialisés, indépendance administrateurs, dispositif gouvernance BCEAO/COBAC.',
    documentCount: 456, lastUpdated: '2026-06-21', maturity: 90,
    subCategories: ['Rôle CA', 'Comités spécialisés', 'Administrateurs indépendants', 'Gouvernance SFD', 'Reporting Conseil', 'Évaluation CA'],
    keyTexts: [
      { title: 'Circulaire 01-2017 — Comités Spécialisés', reference: 'BCEAO/CIRC/01/2017/ANN1', year: '2017' },
      { title: 'Gouvernance SFD — 7 Piliers BCEAO', reference: 'BCEAO/GOV-SFD/2025', year: '2025' },
    ],
  },
  {
    id: 'esg', name: 'ESG & Finance Durable', icon: 'ri-seedling-line', color: 'accent',
    description: 'Critères Environnementaux, Sociaux et de Gouvernance, standards ISSB, taxonomie verte, finance climat, stress tests ESG.',
    documentCount: 312, lastUpdated: '2026-06-20', maturity: 76,
    subCategories: ['ISSB S1/S2', 'Taxonomie verte', 'Bilan carbone', 'Stress tests climatiques', 'Reporting ESG', 'GRI Standards'],
    keyTexts: [
      { title: 'ISSB IFRS S1 — General Sustainability', reference: 'ISSB/IFRS-S1/2023', year: '2023' },
      { title: 'ISSB IFRS S2 — Climate-related Disclosures', reference: 'ISSB/IFRS-S2/2023', year: '2023' },
    ],
  },
  {
    id: 'banque', name: 'Banque & Finance', icon: 'ri-funds-line', color: 'secondary',
    description: 'Secteur bancaire africain, ALM, ratios prudentiels, refinancement, gestion actif-passif, fintech, inclusion financière.',
    documentCount: 523, lastUpdated: '2026-06-22', maturity: 88,
    subCategories: ['ALM bancaire', 'Ratios prudentiels', 'Refinancement BCEAO', 'Inclusion financière', 'Fintech UEMOA', 'Banque digitale'],
    keyTexts: [
      { title: 'Gestion Actif-Passif Bancaire UEMOA', reference: 'KHEPRA/ALM/2026', year: '2026' },
      { title: 'Régulation Fintech UEMOA 2026-2027', reference: 'BCEAO/FINTECH/2026', year: '2026' },
    ],
  },
  {
    id: 'microfinance', name: 'Microfinance', icon: 'ri-hand-coin-line', color: 'primary',
    description: 'Secteur microfinance UEMOA/CEMAC, SFD, agréments, instructions BCEAO, gouvernance SFD, indicateurs de performance.',
    documentCount: 387, lastUpdated: '2026-06-19', maturity: 86,
    subCategories: ['Agrément SFD', 'Instructions BCEAO SFD', 'Gouvernance SFD', 'Indicateurs SIG', 'Reporting SFD', 'Transformation SFD'],
    keyTexts: [
      { title: 'Catalogue 22 Instructions BCEAO SFD', reference: 'BCEAO/SFD/CATALOG/2025', year: '2025' },
      { title: 'Modifications Statutaires SFD — Instructions 001-002/2017', reference: 'BCEAO/INST/001-002/2017', year: '2017' },
    ],
  },
];

// --- QUALITY ENGINE ---

export interface QualityDimension {
  id: string;
  name: string;
  weight: number;
  description: string;
  icon: string;
  color: string;
  checks: string[];
  autoBlockBelow: number;
}

export const QUALITY_DIMENSIONS: QualityDimension[] = [
  {
    id: 'conformite', name: 'Conformité Réglementaire', weight: 25, icon: 'ri-scales-3-line', color: 'primary',
    description: 'Respect des exigences BCEAO, COBAC, OHADA, UEMOA, CEMAC. Aucune affirmation non vérifiée sur la réglementation.',
    checks: ['Références réglementaires exactes et sourcées', 'Dates des textes vérifiées', 'Numéros d\'instruction/circulaire corrects', 'Pas d\'interprétation sans source officielle', 'Disclaimer réglementaire présent si applicable'],
    autoBlockBelow: 70,
  },
  {
    id: 'coherence', name: 'Cohérence Éditoriale', weight: 20, icon: 'ri-file-text-line', color: 'accent',
    description: 'Structure Big Four respectée (Intro/Contexte/Analyse/Recommandations/Conclusion), ton institutionnel uniforme sur tous les canaux.',
    checks: ['Structure éditoriale Big Four', 'Ton institutionnel KHEPRA uniforme', 'Cohérence cross-canal', 'Transitions fluides entre sections', 'Pas de jargon non expliqué'],
    autoBlockBelow: 65,
  },
  {
    id: 'seo', name: 'SEO YouTube/LinkedIn', weight: 20, icon: 'ri-search-line', color: 'secondary',
    description: 'Titre SEO optimisé (<100 car.), description avec chapitres et hashtags, tags 20-40 mots-clés, miniature conforme.',
    checks: ['Titre < 100 caractères', 'Description avec chapitres + hashtags', '20-40 tags pertinents', 'Miniature 1280x720 avec logo KHEPRA', 'CTA présent'],
    autoBlockBelow: 75,
  },
  {
    id: 'branding', name: 'Branding KHEPRA', weight: 15, icon: 'ri-palette-line', color: 'primary',
    description: 'Logo KHEPRA EXPERTS visible, charte éditoriale respectée, signature institutionnelle cohérente.',
    checks: ['Logo KHEPRA EXPERTS présent', 'Charte éditoriale respectée', 'Signature institutionnelle', 'Génériques si vidéo', 'Typographie conforme'],
    autoBlockBelow: 80,
  },
  {
    id: 'exactitude', name: 'Exactitude Factuelle', weight: 15, icon: 'ri-check-double-line', color: 'accent',
    description: 'Zéro hallucination, données chiffrées sourcées, citations vérifiables, pas d\'affirmation non étayée.',
    checks: ['Données chiffrées sourcées', 'Citations vérifiables', 'Pas d\'hallucination LLM', 'Méthodologie explicite', 'Sources primaires accessibles'],
    autoBlockBelow: 75,
  },
  {
    id: 'structure', name: 'Structure Documentaire', weight: 5, icon: 'ri-layout-line', color: 'secondary',
    description: 'Document bien structuré, titres hiérarchisés, tableaux lisibles, métadonnées complètes.',
    checks: ['Titres hiérarchisés (H1→H4)', 'Tableaux correctement formatés', 'Métadonnées (auteur, date, version)', 'Table des matières si > 5 pages', 'Annexes correctement référencées'],
    autoBlockBelow: 60,
  },
];

export interface QualityGateResult {
  contentId: string;
  contentTitle: string;
  date: string;
  dimensions: { dimId: string; score: number; passed: boolean; issues: string[] }[];
  globalScore: number;
  decision: 'approved' | 'to_correct' | 'blocked';
  blockingDimension: string | null;
}

export const QUALITY_GATE_RESULTS: QualityGateResult[] = [
  {
    contentId: 'CONT-001', contentTitle: 'Réforme Ratio Solvabilité UEMOA 2026 — Analyse Complète', date: '2026-06-22',
    dimensions: [
      { dimId: 'conformite', score: 96, passed: true, issues: [] },
      { dimId: 'coherence', score: 94, passed: true, issues: [] },
      { dimId: 'seo', score: 98, passed: true, issues: [] },
      { dimId: 'branding', score: 95, passed: true, issues: [] },
      { dimId: 'exactitude', score: 97, passed: true, issues: [] },
      { dimId: 'structure', score: 92, passed: true, issues: [] },
    ],
    globalScore: 95.7, decision: 'approved', blockingDimension: null,
  },
  {
    contentId: 'CONT-004', contentTitle: 'ESG & Finance Durable — Cadre ISSB pour l\'Afrique', date: '2026-06-21',
    dimensions: [
      { dimId: 'conformite', score: 68, passed: false, issues: ['Référence ISSB S1 non sourcée section 3.2', 'Date entrée en vigueur non vérifiée'] },
      { dimId: 'coherence', score: 72, passed: false, issues: ['Section 4.1 : rupture de ton institutionnel'] },
      { dimId: 'seo', score: 85, passed: true, issues: [] },
      { dimId: 'branding', score: 78, passed: false, issues: ['Logo manquant dans l\'en-tête document'] },
      { dimId: 'exactitude', score: 65, passed: false, issues: ['Données carbone non sourcées', 'Affirmation non vérifiée sur taxonomie verte'] },
      { dimId: 'structure', score: 82, passed: true, issues: [] },
    ],
    globalScore: 72.5, decision: 'blocked', blockingDimension: 'exactitude',
  },
];

// --- CREDIT SOBRIETY ENGINE ---

export interface CostEstimation {
  operation: string;
  method: string;
  estimatedCostFCFA: number;
  estimatedLatencyMs: number;
  isOptimal: boolean;
  alternativeMethod: string;
  alternativeCostFCFA: number;
  savingsFCFA: number;
}

export const COST_ESTIMATIONS: CostEstimation[] = [
  {
    operation: 'Résumé article 2500 mots', method: 'KOS Automaton (TF-IDF extractif)', estimatedCostFCFA: 0,
    estimatedLatencyMs: 48, isOptimal: true, alternativeMethod: 'GPT-4o-mini (API externe)',
    alternativeCostFCFA: 45, savingsFCFA: 45,
  },
  {
    operation: 'Analyse conformité BCEAO', method: 'n8n workflow + bibliothèque interne', estimatedCostFCFA: 0,
    estimatedLatencyMs: 180, isOptimal: true, alternativeMethod: 'Claude 3.5 Sonnet',
    alternativeCostFCFA: 320, savingsFCFA: 320,
  },
  {
    operation: 'Génération tags SEO (30 tags)', method: 'Prompt validé + GPT-4o-mini', estimatedCostFCFA: 25,
    estimatedLatencyMs: 850, isOptimal: true, alternativeMethod: 'GPT-4o (modèle lourd)',
    alternativeCostFCFA: 180, savingsFCFA: 155,
  },
  {
    operation: 'Enrichissement leads CRM (100 leads)', method: 'n8n natif (HTTP + Code nodes)', estimatedCostFCFA: 0,
    estimatedLatencyMs: 32, isOptimal: true, alternativeMethod: 'Make/Zapier (plateforme externe)',
    alternativeCostFCFA: 45000, savingsFCFA: 45000,
  },
  {
    operation: 'Traduction FR→EN (5000 mots)', method: 'Prompt validé + Claude Haiku', estimatedCostFCFA: 85,
    estimatedLatencyMs: 2400, isOptimal: true, alternativeMethod: 'DeepL API Professional',
    alternativeCostFCFA: 350, savingsFCFA: 265,
  },
  {
    operation: 'Génération thumbnail YouTube', method: 'KOS Thumbnail Factory (local)', estimatedCostFCFA: 0,
    estimatedLatencyMs: 2200, isOptimal: true, alternativeMethod: 'Canva API / DALL-E 3 externe',
    alternativeCostFCFA: 1200, savingsFCFA: 1200,
  },
  {
    operation: 'Audit SEO 500 pages', method: 'n8n natif + KOS SEO Engine', estimatedCostFCFA: 0,
    estimatedLatencyMs: 45000, isOptimal: true, alternativeMethod: 'Semrush / Ahrefs API',
    alternativeCostFCFA: 98000, savingsFCFA: 98000,
  },
];

export interface CreditUsageStats {
  period: string;
  totalLLMCalls: number;
  totalCostFCFA: number;
  avgCostPerCall: number;
  callsAvoided: number;
  savingsFCFA: number;
  reuseRate: number;
  optimalDecisionRate: number;
}

export const CREDIT_USAGE_STATS: CreditUsageStats = {
  period: 'Juin 2026',
  totalLLMCalls: 1847,
  totalCostFCFA: 92450,
  avgCostPerCall: 50,
  callsAvoided: 8234,
  savingsFCFA: 1876000,
  reuseRate: 74.6,
  optimalDecisionRate: 96.2,
};

// --- RETEX (RETOUR D\'EXPÉRIENCE) ---

export interface RETEXEntry {
  id: string;
  date: string;
  mission: string;
  domain: string;
  whatWorked: string[];
  whatFailed: string[];
  improvements: string[];
  reusableWorkflows: string[];
  reusableComponents: string[];
  costImpact: number;
  qualityImpact: number;
  lessonLearned: string;
}

export const RETEX_LIBRARY: RETEXEntry[] = [
  {
    id: 'RETEX-001', date: '2026-06-22', mission: 'Production vidéo YouTube Big Four — LBC/FT GAFI', domain: 'Média',
    whatWorked: [
      'Pipeline 8 étapes automatisé : script → voix → thumbnail → montage → métadonnées → review → publish',
      'Voix KHEPRA (Fatoumata Diallo) excellente pour contenu compliance',
      'Sous-workflow "validation BCEAO" réutilisé avec succès',
      'Automaton TF-IDF pour résumé extractif — zéro coût, zéro hallucination',
    ],
    whatFailed: [
      'Première tentative d\'utiliser DALL-E pour thumbnail → coût 1200 FCFA, qualité insuffisante',
      'Tentative de traduire automatiquement les tags SEO → 3 erreurs de contexte réglementaire détectées par le Quality Gate',
    ],
    improvements: [
      'Créer sous-workflow "thumbnail-factory" interne (plus besoin DALL-E)',
      'Ajouter validation humaine optionnelle pour les traductions techniques',
      'Optimiser le prompt "tags-seo-v2" pour réduire les erreurs de contexte',
    ],
    reusableWorkflows: ['Pipeline vidéo 8 étapes', 'Validation BCEAO'],
    reusableComponents: ['Prompt "tags-seo-v2" amélioré', 'Sous-workflow "thumbnail-factory"'],
    costImpact: -1200, qualityImpact: 4, lessonLearned: 'Toujours utiliser les ressources internes avant les API externes. Le Quality Gate a sauvé la publication d\'erreurs de traduction réglementaire.',
  },
  {
    id: 'RETEX-002', date: '2026-06-21', mission: 'Dashboard Audience Management — 10 segments', domain: 'Analytics',
    whatWorked: [
      'n8n natif pour l\'agrégation des données Supabase → 0 FCFA, latence < 50ms',
      'Réutilisation du workflow "lead-scoring" pour pondérer les segments',
      'Bibliothèque de composants React réutilisés (charts, gauges, stat cards)',
    ],
    whatFailed: [
      'Première approche : appel LLM pour chaque segment → 10 appels, coût 500 FCFA, latence 12s',
      'Cache insuffisant → mêmes données recalculées 3 fois en 1 heure',
    ],
    improvements: [
      'Cache Supabase avec TTL 15 minutes → réduction appels de 67%',
      'Pré-agrégation des métriques en background (cron hourly)',
      'Standardiser le pattern "dashboard-segment" comme sous-workflow',
    ],
    reusableWorkflows: ['Agrégation métriques dashboard', 'Lead scoring pondération'],
    reusableComponents: ['Composant "AudienceSegmentCard"', 'Pattern "dashboard-segment"'],
    costImpact: -500, qualityImpact: 3, lessonLearned: 'Les dashboards temps réel doivent utiliser l\'agrégation pré-calculée. Ne jamais faire 10 appels LLM pour 10 segments quand un seul workflow n8n peut tout agréger.',
  },
  {
    id: 'RETEX-003', date: '2026-06-20', mission: 'Article SEO 3000 mots — Gouvernance SFD 7 Piliers', domain: 'Content',
    whatWorked: [
      'Prompt "article-big-four-v5" validé → structure parfaite, ton institutionnel, transitions fluides',
      'Automaton pour le résumé extractif → inséré en haut d\'article, CTR +18%',
      'Knowledge Repository BCEAO → toutes les références réglementaires déjà validées',
      'Sous-workflow "cross-linking" → liens internes générés automatiquement',
    ],
    whatFailed: [
      'Tentative de générer l\'article complet en un seul appel LLM → qualité insuffisante, hallu détectées',
      'Oubli du disclaimer réglementaire → bloqué par Quality Gate, corrigé en 3 minutes',
    ],
    improvements: [
      'Forcer le pattern "section par section" pour les articles > 2000 mots (qualité +40%)',
      'Ajouter checklist "disclaimer automatique" dans le workflow de publication',
      'Enrichir le Knowledge Repository avec les nouveaux textes SFD 2026',
    ],
    reusableWorkflows: ['Cross-linking automatique', 'Publication article big-four'],
    reusableComponents: ['Prompt "article-big-four-v5"', 'Checklist "disclaimer réglementaire"'],
    costImpact: -180, qualityImpact: 5, lessonLearned: 'Les articles longs doivent être générés section par section avec validation intermédiaire. Un seul appel LLM pour 3000 mots = risque élevé d\'hallucination.',
  },
  {
    id: 'RETEX-004', date: '2026-06-19', mission: 'Rapport conformité trimestriel BCEAO', domain: 'Compliance',
    whatWorked: [
      'Workflow existant "rapport-bceao-v3" → adapté en 2 minutes au lieu de 2 heures',
      'Sous-workflows chaînés : extraction données → validation → formatage → PDF',
      'Bibliothèque interne de templates PDF → format parfait, zéro retouche',
      'Knowledge Repository BCEAO → matrices de conformité pré-remplies',
    ],
    whatFailed: [
      'Tentative de migrer vers un nouveau template → perte de 3 heures, retour à l\'existant',
      'Edge function "kos-compliance-report" en cold start → +4s de latence',
    ],
    improvements: [
      'Chauffer les edge functions critiques avant les fenêtres de production',
      'Versionner les templates et les mettre en A/B test avant migration complète',
      'Automatiser la mise à jour des matrices de conformité (cron hebdomadaire)',
    ],
    reusableWorkflows: ['Pipeline rapport BCEAO v3', 'Formatage PDF institutionnel'],
    reusableComponents: ['Template "rapport-bceao-v3"', 'Matrice conformité BCEAO'],
    costImpact: -45000, qualityImpact: 2, lessonLearned: 'Ne jamais remplacer un workflow qui fonctionne sans A/B test préalable. La réutilisation du workflow existant a économisé 45 000 FCFA et 2 heures.',
  },
];

// --- MATURITY KPIs ---

export interface MaturityKPI {
  id: string;
  name: string;
  icon: string;
  color: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { month: string; value: number }[];
}

export const MATURITY_KPIS: MaturityKPI[] = [
  {
    id: 'reuse', name: 'Taux de Réutilisation', icon: 'ri-repeat-line', color: 'primary',
    current: 74.6, previous: 68.2, target: 85, unit: '%', trend: 'up',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 52 }, { month: 'Mar', value: 58 },
      { month: 'Avr', value: 63 }, { month: 'Mai', value: 68 }, { month: 'Juin', value: 74.6 },
    ],
  },
  {
    id: 'cost', name: 'Réduction Coûts LLM', icon: 'ri-money-dollar-circle-line', color: 'accent',
    current: 62.3, previous: 48.7, target: 75, unit: '%', trend: 'up',
    history: [
      { month: 'Jan', value: 20 }, { month: 'Fév', value: 28 }, { month: 'Mar', value: 35 },
      { month: 'Avr', value: 42 }, { month: 'Mai', value: 49 }, { month: 'Juin', value: 62.3 },
    ],
  },
  {
    id: 'automation', name: 'Taux d\'Automatisation', icon: 'ri-robot-2-line', color: 'secondary',
    current: 89.4, previous: 84.1, target: 95, unit: '%', trend: 'up',
    history: [
      { month: 'Jan', value: 70 }, { month: 'Fév', value: 74 }, { month: 'Mar', value: 78 },
      { month: 'Avr', value: 82 }, { month: 'Mai', value: 84 }, { month: 'Juin', value: 89.4 },
    ],
  },
  {
    id: 'errors', name: 'Taux d\'Erreurs', icon: 'ri-error-warning-line', color: 'primary',
    current: 1.8, previous: 3.4, target: 0.5, unit: '%', trend: 'down',
    history: [
      { month: 'Jan', value: 8.2 }, { month: 'Fév', value: 6.5 }, { month: 'Mar', value: 5.1 },
      { month: 'Avr', value: 4.0 }, { month: 'Mai', value: 3.4 }, { month: 'Juin', value: 1.8 },
    ],
  },
  {
    id: 'latency', name: 'Temps de Traitement Moyen', icon: 'ri-timer-line', color: 'accent',
    current: 4.2, previous: 6.8, target: 3.0, unit: 'min', trend: 'down',
    history: [
      { month: 'Jan', value: 12.5 }, { month: 'Fév', value: 10.2 }, { month: 'Mar', value: 8.7 },
      { month: 'Avr', value: 7.1 }, { month: 'Mai', value: 6.8 }, { month: 'Juin', value: 4.2 },
    ],
  },
  {
    id: 'quality', name: 'Score Qualité Global', icon: 'ri-medal-line', color: 'secondary',
    current: 91.2, previous: 86.5, target: 95, unit: '/100', trend: 'up',
    history: [
      { month: 'Jan', value: 72 }, { month: 'Fév', value: 76 }, { month: 'Mar', value: 80 },
      { month: 'Avr', value: 84 }, { month: 'Mai', value: 86.5 }, { month: 'Juin', value: 91.2 },
    ],
  },
  {
    id: 'savings', name: 'Économies Cumulées', icon: 'ri-bank-line', color: 'primary',
    current: 18.7, previous: 12.4, target: 25, unit: 'M FCFA', trend: 'up',
    history: [
      { month: 'Jan', value: 2.1 }, { month: 'Fév', value: 4.8 }, { month: 'Mar', value: 7.2 },
      { month: 'Avr', value: 10.1 }, { month: 'Mai', value: 12.4 }, { month: 'Juin', value: 18.7 },
    ],
  },
];

// --- CAPABILITIES LIBRARY ---

export interface CapabilityLibraryItem {
  id: string;
  name: string;
  type: 'workflow' | 'prompt' | 'template' | 'checklist' | 'sub_workflow' | 'document';
  icon: string;
  color: string;
  description: string;
  version: string;
  usageCount: number;
  lastUsed: string;
  costPerUse: number;
  validationStatus: 'validated' | 'beta' | 'draft';
  domain: string;
  dependencies: string[];
}

export const CAPABILITIES_LIBRARY: CapabilityLibraryItem[] = [
  {
    id: 'CAP-001', name: 'Pipeline Vidéo YouTube Big Four 8 Étapes', type: 'workflow', icon: 'ri-film-line', color: 'primary',
    description: 'Workflow complet : script → voix KHEPRA → thumbnail → montage → métadonnées → review → publish → analytics. 8 étapes, 3 voix KHEPRA disponibles.',
    version: 'v3.2', usageCount: 47, lastUsed: '2026-06-23', costPerUse: 0, validationStatus: 'validated',
    domain: 'Média', dependencies: ['kos-youtube-voice', 'kos-youtube-thumbnail', 'kos-youtube-publisher'],
  },
  {
    id: 'CAP-002', name: 'Prompt "article-big-four-v5"', type: 'prompt', icon: 'ri-quill-pen-line', color: 'accent',
    description: 'Prompt validé pour génération d\'articles institutionnels Big Four : structure 5 sections, ton KHEPRA, références réglementaires, SEO intégré.',
    version: 'v5.1', usageCount: 234, lastUsed: '2026-06-23', costPerUse: 35, validationStatus: 'validated',
    domain: 'Content', dependencies: ['kos-content-generate'],
  },
  {
    id: 'CAP-003', name: 'Sous-workflow "validation-bceao"', type: 'sub_workflow', icon: 'ri-shield-check-line', color: 'secondary',
    description: 'Validation automatisée conformité BCEAO : vérification références, dates, numéros d\'instruction, disclaimer. 6 points de contrôle.',
    version: 'v2.0', usageCount: 189, lastUsed: '2026-06-23', costPerUse: 0, validationStatus: 'validated',
    domain: 'Compliance', dependencies: ['Knowledge Repository BCEAO'],
  },
  {
    id: 'CAP-004', name: 'Template "rapport-bceao-v3"', type: 'template', icon: 'ri-file-chart-line', color: 'primary',
    description: 'Template LaTeX/PDF pour rapports de conformité BCEAO : en-tête institutionnel, table des matières auto, annexes structurées.',
    version: 'v3.0', usageCount: 56, lastUsed: '2026-06-22', costPerUse: 0, validationStatus: 'validated',
    domain: 'Compliance', dependencies: ['kos-proposal-generator'],
  },
  {
    id: 'CAP-005', name: 'Checklist "disclaimer-réglementaire"', type: 'checklist', icon: 'ri-list-check-2', color: 'accent',
    description: 'Checklist obligatoire avant toute publication : disclaimer BCEAO/COBAC présent, date dernière mise à jour, source vérifiée, pas d\'interprétation sans référence.',
    version: 'v1.3', usageCount: 412, lastUsed: '2026-06-23', costPerUse: 0, validationStatus: 'validated',
    domain: 'Compliance', dependencies: [],
  },
  {
    id: 'CAP-006', name: 'Sous-workflow "cross-linking-automatique"', type: 'sub_workflow', icon: 'ri-link-m', color: 'secondary',
    description: 'Génération automatique de liens internes entre articles : détection entités, matching sémantique, ancres optimisées SEO.',
    version: 'v2.1', usageCount: 156, lastUsed: '2026-06-22', costPerUse: 0, validationStatus: 'validated',
    domain: 'SEO', dependencies: ['kos-knowledge-graph', 'kos-seo-audit'],
  },
  {
    id: 'CAP-007', name: 'Prompt "seo-tags-v2"', type: 'prompt', icon: 'ri-hashtag', color: 'primary',
    description: 'Génération de 20-40 tags SEO optimisés YouTube/LinkedIn à partir du contenu. Pondération par pertinence réglementaire.',
    version: 'v2.3', usageCount: 378, lastUsed: '2026-06-23', costPerUse: 18, validationStatus: 'validated',
    domain: 'SEO', dependencies: ['kos-content-generate'],
  },
  {
    id: 'CAP-008', name: 'Workflow "enrichissement-leads-n8n"', type: 'workflow', icon: 'ri-user-search-line', color: 'accent',
    description: 'Workflow n8n natif pour enrichissement CRM : scoring, qualification, segmentation, notification. Zéro dépendance externe, 100% déterministe.',
    version: 'v4.0', usageCount: 892, lastUsed: '2026-06-23', costPerUse: 0, validationStatus: 'validated',
    domain: 'CRM', dependencies: ['kos-lead-scoring'],
  },
  {
    id: 'CAP-009', name: 'Sous-workflow "thumbnail-factory"', type: 'sub_workflow', icon: 'ri-image-line', color: 'secondary',
    description: 'Génération interne de miniatures YouTube : template KHEPRA, 3-7 mots, logo, visuel institutionnel. Format 1280x720 PNG < 2MB.',
    version: 'v1.1', usageCount: 42, lastUsed: '2026-06-23', costPerUse: 0, validationStatus: 'beta',
    domain: 'Média', dependencies: ['kos-youtube-thumbnail'],
  },
  {
    id: 'CAP-010', name: 'Prompt "traduction-institutionnelle-v2"', type: 'prompt', icon: 'ri-translate', color: 'primary',
    description: 'Traduction FR↔EN pour contenu institutionnel KHEPRA : maintien ton, précision réglementaire, glossaire BCEAO/COBAC intégré.',
    version: 'v2.0', usageCount: 145, lastUsed: '2026-06-21', costPerUse: 42, validationStatus: 'validated',
    domain: 'Content', dependencies: ['kos-content-generate', 'Glossary BCEAO/COBAC'],
  },
];

// --- CONTINUOUS IMPROVEMENT ACTIONS ---

export interface ImprovementAction {
  id: string;
  sourceRetex: string;
  action: string;
  type: 'optimization' | 'simplification' | 'standardization';
  priority: 'P0-critical' | 'P1-high' | 'P2-medium' | 'P3-low';
  status: 'pending' | 'in_progress' | 'completed' | 'validated';
  impact: string;
  estimatedEffort: string;
  assignedTo: string;
  created: string;
}

export const IMPROVEMENT_ACTIONS: ImprovementAction[] = [
  {
    id: 'IMP-001', sourceRetex: 'RETEX-001', action: 'Standardiser le sous-workflow "thumbnail-factory" en v1.1 stable',
    type: 'standardization', priority: 'P1-high', status: 'completed', impact: 'Économie 1200 FCFA/vidéo',
    estimatedEffort: '4h', assignedTo: 'KOS Media Engine', created: '2026-06-22',
  },
  {
    id: 'IMP-002', sourceRetex: 'RETEX-001', action: 'Optimiser le prompt "tags-seo-v2" avec validation croisée réglementaire',
    type: 'optimization', priority: 'P1-high', status: 'completed', impact: 'Réduction erreurs contexte -85%',
    estimatedEffort: '2h', assignedTo: 'KOS SEO Engine', created: '2026-06-22',
  },
  {
    id: 'IMP-003', sourceRetex: 'RETEX-002', action: 'Mettre en cache Supabase avec TTL 15min pour les dashboards',
    type: 'optimization', priority: 'P0-critical', status: 'completed', impact: 'Réduction appels DB 67%',
    estimatedEffort: '3h', assignedTo: 'KOS Data Engine', created: '2026-06-21',
  },
  {
    id: 'IMP-004', sourceRetex: 'RETEX-003', action: 'Forcer génération section par section pour articles > 2000 mots',
    type: 'optimization', priority: 'P1-high', status: 'completed', impact: 'Qualité articles +40%, hallucinations -90%',
    estimatedEffort: '6h', assignedTo: 'KOS Content Engine', created: '2026-06-20',
  },
  {
    id: 'IMP-005', sourceRetex: 'RETEX-003', action: 'Ajouter checklist disclaimer automatique dans workflow publication',
    type: 'standardization', priority: 'P0-critical', status: 'completed', impact: '0 blocage Quality Gate pour disclaimer',
    estimatedEffort: '1h', assignedTo: 'KOS Quality Engine', created: '2026-06-20',
  },
  {
    id: 'IMP-006', sourceRetex: 'RETEX-004', action: 'Préchauffer edge functions critiques avant fenêtres de production',
    type: 'optimization', priority: 'P2-medium', status: 'in_progress', impact: 'Latence cold start éliminée',
    estimatedEffort: '3h', assignedTo: 'KOS Runtime Engine', created: '2026-06-19',
  },
  {
    id: 'IMP-007', sourceRetex: 'RETEX-004', action: 'A/B testing obligatoire avant migration de tout template validé',
    type: 'standardization', priority: 'P1-high', status: 'pending', impact: '0 régression template',
    estimatedEffort: '8h', assignedTo: 'KOS PMO Engine', created: '2026-06-19',
  },
];

// --- GLOBAL SELF-EVOLUTION STATS ---

export const SELF_EVOLUTION_STATS = {
  programVersion: 'v1.0 — Big Four Self-Evolution Program',
  launched: '2026-06-23',
  totalRules: 5,
  totalDomains: 10,
  totalQualityDimensions: 6,
  totalRetexEntries: 4,
  totalCapabilities: 10,
  totalImprovements: 7,
  totalSavingsCumulated: 1876000,
  optimalDecisionRate: 96.2,
  reuseRate: 74.6,
  qualityBlockCount: 2,
  automationRate: 89.4,
  averageLatencyReduction: 62,
  monthlyCostReduction: 58,
  maturityScore: 87,
  targetMaturity: 95,
};



