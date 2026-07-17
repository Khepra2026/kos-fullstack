// ============================================================
// KOS Full Block Execution Command Center — Mock Data
// 3 Piliers : Conformité Réglementaire, Qualité Rédactionnelle, SEO/GEO
// Exécution en bloc — Cible 100% Big Four
// ============================================================

export interface ExecutionBlock {
  blockId: string;
  pillarId: string;
  blockName: string;
  description: string;
  icon: string;
  color: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  totalActions: number;
  completedActions: number;
  criticalActions: number;
  estimatedEffort: string;
  impactEstimate: string;
  assignedAgent: string;
  deadline: string;
  actions: ExecutionAction[];
}

export interface ExecutionAction {
  actionId: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  severity: 'critical' | 'major' | 'minor';
  kpiBefore: string;
  kpiAfter: string;
  verificationMethod: string;
}

export interface PillarSummary {
  pillarId: string;
  pillarName: string;
  icon: string;
  color: string;
  description: string;
  targetScore: number;
  currentScore: number;
  blocksTotal: number;
  blocksCompleted: number;
  totalActions: number;
  completedActions: number;
  criticalRemaining: number;
  estimatedCompletion: string;
}

export interface SEOPublicationPipeline {
  pubId: string;
  title: string;
  category: string;
  targetKeywords: string[];
  estimatedTraffic: number;
  seoScore: number;
  geoScore: number;
  status: 'published' | 'in_review' | 'draft' | 'planned';
  author: string;
  deadline: string;
  articleType: string;
  pillarAlignment: string;
}

export interface ArticleComplianceAudit {
  articleId: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  regulatoryScore: number;
  editorialScore: number;
  seoScore: number;
  geoScore: number;
  citationsVerified: number;
  citationsTotal: number;
  issuesFound: number;
  issuesFixed: number;
  lastAuditDate: string;
  status: 'compliant' | 'needs_fix' | 'critical';
}

export const PILLARS: PillarSummary[] = [
  {
    pillarId: 'conformite',
    pillarName: 'Conformité Réglementaire Big Four',
    icon: 'ri-scales-3-line',
    color: '#C2410C',
    description: 'Corrections conformité réglementaire : audit citations BCEAO/COBAC/GAFI/OHADA, vérification sources officielles, alignement ISO 27001/42001, mise à jour références réglementaires, validation Zero-Defect Protocol.',
    targetScore: 100,
    currentScore: 92,
    blocksTotal: 4,
    blocksCompleted: 2,
    totalActions: 28,
    completedActions: 19,
    criticalRemaining: 3,
    estimatedCompletion: '15 Juillet 2026',
  },
  {
    pillarId: 'editorial',
    pillarName: 'Qualité Rédactionnelle & Thématique Big Four',
    icon: 'ri-quill-pen-line',
    color: '#BE123C',
    description: 'Révision éditoriale complète : standardisation ton institutionnel, enrichissement citations réglementaires, structuration 9 sections Big Four, optimisation lisibilité, vérification factuelle, alignement EEAT.',
    targetScore: 100,
    currentScore: 89,
    blocksTotal: 4,
    blocksCompleted: 1,
    totalActions: 34,
    completedActions: 18,
    criticalRemaining: 5,
    estimatedCompletion: '31 Juillet 2026',
  },
  {
    pillarId: 'seo-geo',
    pillarName: 'SEO & GEO — Publications Stratégiques',
    icon: 'ri-globe-line',
    color: '#0891B2',
    description: 'Création de nouvelles publications SEO/GEO : articles piliers, études sectorielles, FAQs structurées, contenus optimisés moteurs IA (ChatGPT, Perplexity, Google AI Overviews), featured snippets, Schema.org.',
    targetScore: 100,
    currentScore: 85,
    blocksTotal: 4,
    blocksCompleted: 1,
    totalActions: 42,
    completedActions: 21,
    criticalRemaining: 7,
    estimatedCompletion: '15 Août 2026',
  },
];

export const EXECUTION_BLOCKS: ExecutionBlock[] = [
  // ==================== PILIER 1 : CONFORMITÉ RÉGLEMENTAIRE ====================
  {
    blockId: 'conf-1',
    pillarId: 'conformite',
    blockName: 'Audit & Correction Citations Réglementaires',
    description: 'Audit exhaustif des 200+ citations réglementaires dans tous les articles : vérification source officielle, date de vigueur, nomenclature obligatoire. Correction automatique des citations obsolètes ou erronées.',
    icon: 'ri-search-eye-line',
    color: '#C2410C',
    priority: 'P0',
    status: 'in_progress',
    totalActions: 8,
    completedActions: 6,
    criticalActions: 2,
    estimatedEffort: '12h',
    impactEstimate: 'Crédibilité réglementaire 92% → 100%. Zéro citation erronée.',
    assignedAgent: 'KOS Fact-Check & Regulatory Verifier™',
    deadline: '2026-07-08',
    actions: [
      { actionId: 'conf-1-1', title: 'Scanner 200+ citations existantes', description: 'Extraction automatique de toutes les citations réglementaires dans les articles blog, pages services et contenu statique.', status: 'completed', severity: 'critical', kpiBefore: '0 citations auditées', kpiAfter: '211 citations scannées', verificationMethod: 'Rapport d\'audit automatique' },
      { actionId: 'conf-1-2', title: 'Vérifier sources officielles BCEAO', description: 'Cross-référencement des citations BCEAO avec bceao.int — vérification numéro, date, existence.', status: 'completed', severity: 'critical', kpiBefore: '40 citations BCEAO non vérifiées', kpiAfter: '40/40 vérifiées', verificationMethod: 'Vérification URL source + capture' },
      { actionId: 'conf-1-3', title: 'Vérifier sources officielles COBAC', description: 'Cross-référencement des citations COBAC avec sgcobac.org/beac.int.', status: 'completed', severity: 'critical', kpiBefore: '29 citations COBAC non vérifiées', kpiAfter: '29/29 vérifiées', verificationMethod: 'Vérification URL source' },
      { actionId: 'conf-1-4', title: 'Vérifier GAFI, OHADA, ISO, NIST', description: 'Audit des citations GAFI (19), OHADA (18), ISO (20), NIST (11), COSO (8).', status: 'completed', severity: 'major', kpiBefore: '76 citations non vérifiées', kpiAfter: '76/76 vérifiées', verificationMethod: 'Cross-ref bases officielles' },
      { actionId: 'conf-1-5', title: 'Corriger citations obsolètes', description: 'Remplacement des références aux versions antérieures par les versions en vigueur. Suppression des textes abrogés.', status: 'completed', severity: 'critical', kpiBefore: '8 écarts critiques détectés', kpiAfter: '0 écart critique', verificationMethod: 'Validation manuelle + Publication Gate' },
      { actionId: 'conf-1-6', title: 'Ajouter URLs sources manquantes', description: 'Toute citation sans lien direct vers le texte officiel reçoit l\'URL exacte du régulateur.', status: 'completed', severity: 'major', kpiBefore: '31 URLs manquantes', kpiAfter: '0 URL manquante', verificationMethod: 'Vérification des liens dans les articles' },
      { actionId: 'conf-1-7', title: 'Mettre à jour dates de révision GAFI', description: 'Les 40 Recommandations GAFI doivent mentionner leur dernière date de révision (2019, 2022, etc.).', status: 'in_progress', severity: 'critical', kpiBefore: 'Dates de révision absentes', kpiAfter: '100% des dates renseignées', verificationMethod: 'Validation KOS Publication Gate' },
      { actionId: 'conf-1-8', title: 'Activer cron hebdomadaire vérification', description: 'Cron job tous les lundis 04:00 UTC : scan automatique des citations vs bases officielles, alerte si écart.', status: 'pending', severity: 'major', kpiBefore: 'Vérification manuelle', kpiAfter: 'Auto-vérification hebdomadaire', verificationMethod: 'Cron job actif + logs' },
    ],
  },
  {
    blockId: 'conf-2',
    pillarId: 'conformite',
    blockName: 'Alignement ISO 27001 & 42001 — Articles',
    description: 'Vérification que tous les articles mentionnant sécurité, données personnelles, ou IA sont alignés avec les exigences ISO 27001:2022 et ISO 42001:2023.',
    icon: 'ri-shield-check-line',
    color: '#C2410C',
    priority: 'P1',
    status: 'in_progress',
    totalActions: 6,
    completedActions: 4,
    criticalActions: 1,
    estimatedEffort: '8h',
    impactEstimate: 'Conformité ISO dans 100% des contenus',
    assignedAgent: 'KOS Regulatory Quality Assurance Engine™',
    deadline: '2026-07-12',
    actions: [
      { actionId: 'conf-2-1', title: 'Auditer articles cybersécurité', description: 'Vérifier alignement avec ISO 27001 A.5-A.18 sur les 26 articles cybersécurité.', status: 'completed', severity: 'critical', kpiBefore: '0 article audité ISO 27001', kpiAfter: '26/26 audités', verificationMethod: 'Checklist ISO 27001 par article' },
      { actionId: 'conf-2-2', title: 'Auditer articles IA/RGPD', description: 'Vérifier conformité RGPD (consentement, données) et ISO 42001 (transparence IA).', status: 'completed', severity: 'major', kpiBefore: '12 articles non vérifiés', kpiAfter: '12/12 vérifiés', verificationMethod: 'Grille conformité IA' },
      { actionId: 'conf-2-3', title: 'Ajouter mentions légales requises', description: 'Ajout des avertissements réglementaires obligatoires dans les articles à caractère juridique.', status: 'completed', severity: 'major', kpiBefore: '0 avertissement', kpiAfter: '45 articles avec avertissement', verificationMethod: 'Présence dans le footer des articles' },
      { actionId: 'conf-2-4', title: 'Mettre à jour références COBAC 2027', description: 'Directive COBAC 2027 résilience opérationnelle : mettre à jour toutes les références anticipatives.', status: 'completed', severity: 'major', kpiBefore: '3 articles avec refs projet', kpiAfter: '3/3 mis à jour avec statut', verificationMethod: 'Mention "en projet" conservée' },
      { actionId: 'conf-2-5', title: 'Vérifier conformité ESG/ISSB', description: 'Articles ESG : alignement avec ISSB IFRS S1/S2 et taxonomie verte UEMOA.', status: 'in_progress', severity: 'minor', kpiBefore: '8 articles ESG', kpiAfter: '8/8 conformes ISSB', verificationMethod: 'Checklist ISSB' },
      { actionId: 'conf-2-6', title: 'Certifier conformité multi-standard', description: 'Validation finale : aucun article ne contient de référence réglementaire invalide.', status: 'pending', severity: 'major', kpiBefore: 'Score conformité 92%', kpiAfter: 'Score conformité 100%', verificationMethod: 'KOS Publication Gate 100%' },
    ],
  },
  {
    blockId: 'conf-3',
    pillarId: 'conformite',
    blockName: 'Zero-Defect Protocol — Déploiement Articles',
    description: 'Application du KOS Regulatory Zero-Defect Protocol™ v2.0 sur 100% des articles : 9 Principes, Triple Validation, Indice de Fiabilité ≥95.',
    icon: 'ri-verified-badge-line',
    color: '#C2410C',
    priority: 'P0',
    status: 'completed',
    totalActions: 7,
    completedActions: 7,
    criticalActions: 0,
    estimatedEffort: 'Terminé',
    impactEstimate: 'Zéro contenu non vérifié publié',
    assignedAgent: 'KOS Content Publication Gate™',
    deadline: '2026-07-01',
    actions: [
      { actionId: 'conf-3-1', title: 'Activer Publication Gate 7 checks', description: 'Tout article doit passer 7 checks avant publication.', status: 'completed', severity: 'critical', kpiBefore: 'Pas de gate', kpiAfter: 'Gate active 7 checks', verificationMethod: 'Edge Function active' },
      { actionId: 'conf-3-2', title: 'Déployer Triple Validation', description: 'N1 Source Identifiée → N2 Source Certifiée → N3 Source Publiable.', status: 'completed', severity: 'critical', kpiBefore: 'Validation simple', kpiAfter: 'Triple validation active', verificationMethod: 'Workflow vérifié' },
      { actionId: 'conf-3-3', title: 'Configurer Indice Fiabilité ≥95', description: 'Seuil automatique : article avec indice <95 = bloqué.', status: 'completed', severity: 'critical', kpiBefore: 'Pas de seuil', kpiAfter: 'Seuil 95 actif', verificationMethod: 'Test avec article <95' },
      { actionId: 'conf-3-4', title: 'Activer Tolérance Zéro', description: 'Référence fictive ou invérifiable = publication bloquée. Aucune exception.', status: 'completed', severity: 'critical', kpiBefore: 'Exceptions possibles', kpiAfter: 'Zéro exception', verificationMethod: 'Test avec ref invalide' },
      { actionId: 'conf-3-5', title: 'Métadonnées obligatoires 11 champs', description: 'Chaque citation doit avoir : régulateur, texte, numéro, date, article, URL, dernière vérification, statut vigueur, juridiction, domaine, fiabilité.', status: 'completed', severity: 'major', kpiBefore: 'Métadonnées incomplètes', kpiAfter: '11/11 champs obligatoires', verificationMethod: 'Schema validation' },
      { actionId: 'conf-3-6', title: 'Traçabilité totale activée', description: 'Chaque affirmation doit être traçable → URL exacte du texte officiel.', status: 'completed', severity: 'major', kpiBefore: 'Traçabilité partielle', kpiAfter: '100% traçable', verificationMethod: 'Audit trail' },
      { actionId: 'conf-3-7', title: 'Code de Conduite 150% Big Four gravé', description: 'Les 7 Règles Absolues intégrées dans le pipeline de publication.', status: 'completed', severity: 'major', kpiBefore: 'Règles implicites', kpiAfter: '7 Règles Absolues actives', verificationMethod: 'KOS_SYSTEM_INSTRUCTIONS.md' },
    ],
  },
  {
    blockId: 'conf-4',
    pillarId: 'conformite',
    blockName: 'Mise à Jour Réglementaire Continue',
    description: 'Intégration des dernières évolutions réglementaires : BCEAO instructions 2026, COBAC nouveaux règlements, GAFI révisions, OHADA actes uniformes révisés.',
    icon: 'ri-refresh-line',
    color: '#C2410C',
    priority: 'P2',
    status: 'pending',
    totalActions: 7,
    completedActions: 2,
    criticalActions: 0,
    estimatedEffort: '16h',
    impactEstimate: '100% des articles à jour avec la réglementation en vigueur',
    assignedAgent: 'KOS Regulatory Scout™ v2.0',
    deadline: '2026-07-25',
    actions: [
      { actionId: 'conf-4-1', title: 'Scanner nouvelles publications BCEAO', description: 'Détection des nouvelles circulaires, instructions, décisions BCEAO depuis le dernier audit.', status: 'completed', severity: 'major', kpiBefore: 'Veille manuelle', kpiAfter: 'Scan automatique actif', verificationMethod: 'Cron lundi 04:00 UTC' },
      { actionId: 'conf-4-2', title: 'Scanner COBAC/BEAC nouveaux textes', description: 'Détection des nouveaux règlements COBAC et textes BEAC.', status: 'completed', severity: 'major', kpiBefore: 'Veille manuelle', kpiAfter: 'Scan automatique', verificationMethod: 'Cron actif' },
      { actionId: 'conf-4-3', title: 'Mettre à jour articles impactés', description: 'Identifier les articles dont les références réglementaires sont impactées par les nouveaux textes.', status: 'pending', severity: 'major', kpiBefore: '0 article mis à jour', kpiAfter: 'Tous les articles impactés mis à jour', verificationMethod: 'Rapport d\'impact' },
      { actionId: 'conf-4-4', title: 'Intégrer GAFI révision 2026', description: 'Mettre à jour les articles LBC/FT avec les dernières révisions GAFI.', status: 'pending', severity: 'major', kpiBefore: 'Réfs GAFI 2012/2019', kpiAfter: 'Réfs GAFI 2026', verificationMethod: 'Vérification date' },
      { actionId: 'conf-4-5', title: 'Intégrer OHADA Actes Uniformes révisés', description: 'AUSCGIE 2024, AUDCG 2024 — mise à jour des articles gouvernance.', status: 'pending', severity: 'minor', kpiBefore: 'Réfs OHADA 2014', kpiAfter: 'Réfs OHADA 2024', verificationMethod: 'Vérification version' },
      { actionId: 'conf-4-6', title: 'Alimenter base regulations Supabase', description: 'Ajouter les nouveaux textes dans la table regulations avec métadonnées gouvernance.', status: 'pending', severity: 'minor', kpiBefore: '50 textes', kpiAfter: '75 textes', verificationMethod: 'SELECT count(*)' },
      { actionId: 'conf-4-7', title: 'Rapport conformité finale', description: 'Génération du rapport de conformité réglementaire 100% Big Four.', status: 'pending', severity: 'minor', kpiBefore: 'Score 92%', kpiAfter: 'Score 100%', verificationMethod: 'Audit externe simulé' },
    ],
  },

  // ==================== PILIER 2 : QUALITÉ RÉDACTIONNELLE ====================
  {
    blockId: 'edit-1',
    pillarId: 'editorial',
    blockName: 'Standardisation Ton Institutionnel Big Four',
    description: 'Révision du ton et du style sur 100% des articles : adoption du ton institutionnel KHEPRA calibré Deloitte/PwC, suppression du jargon excessif, uniformisation du niveau de lecture.',
    icon: 'ri-voiceprint-line',
    color: '#BE123C',
    priority: 'P0',
    status: 'in_progress',
    totalActions: 8,
    completedActions: 5,
    criticalActions: 2,
    estimatedEffort: '20h',
    impactEstimate: 'Ton 100% uniforme, score compréhension 9.5+/10',
    assignedAgent: 'KOS Tone & Consistency Auditor™',
    deadline: '2026-07-15',
    actions: [
      { actionId: 'edit-1-1', title: 'Auditer ton des 134 articles', description: 'Analyse automatique du ton, style, vocabulaire sur tous les articles publiés.', status: 'completed', severity: 'critical', kpiBefore: '0 article audité', kpiAfter: '134 articles audités', verificationMethod: 'Rapport d\'audit tonal' },
      { actionId: 'edit-1-2', title: 'Corriger ton trop familier', description: '12 articles avec un ton trop décontracté — réécriture en ton institutionnel.', status: 'completed', severity: 'critical', kpiBefore: '12 articles ton familier', kpiAfter: '0 article ton familier', verificationMethod: 'Tone Analyzer score' },
      { actionId: 'edit-1-3', title: 'Uniformiser niveau de lecture', description: 'Cible : Flesch 55-65 (niveau cadre dirigeant). Ajustement des phrases trop complexes ou trop simples.', status: 'completed', severity: 'major', kpiBefore: 'Score Flesch 48-72', kpiAfter: 'Score Flesch 55-65', verificationMethod: 'Readability score' },
      { actionId: 'edit-1-4', title: 'Standardiser terminologie réglementaire', description: 'Uniformisation des termes : "établissement de crédit" vs "banque", "SFD" vs "microfinance", etc.', status: 'completed', severity: 'major', kpiBefore: '12 variantes terminologiques', kpiAfter: 'Terminologie unifiée', verificationMethod: 'Glossaire de référence' },
      { actionId: 'edit-1-5', title: 'Appliquer guide de style KHEPRA', description: 'Majuscules, acronymes, ponctuation, formats de date, formats de chiffres (FCFA, Mds).', status: 'completed', severity: 'major', kpiBefore: 'Style incohérent', kpiAfter: 'Style 100% uniforme', verificationMethod: 'Style guide checklist' },
      { actionId: 'edit-1-6', title: 'Réviser introductions exécutives', description: 'Chaque article doit avoir un Executive Insight 150-200 mots niveau COMEX.', status: 'in_progress', severity: 'critical', kpiBefore: '45/134 avec Executive Insight', kpiAfter: '134/134 avec Executive Insight', verificationMethod: 'Présence section Executive Insight' },
      { actionId: 'edit-1-7', title: 'Structurer 9 sections Big Four', description: 'Appliquer le Master Prompt Template (9 sections) sur les articles longs (>2000 mots).', status: 'in_progress', severity: 'major', kpiBefore: '38/134 structurés 9 sections', kpiAfter: '90/134 structurés 9 sections', verificationMethod: 'Check structure 9 sections' },
      { actionId: 'edit-1-8', title: 'Validation éditoriale finale', description: 'Revue humaine (simulée) des 20 articles les plus traffiqués.', status: 'pending', severity: 'major', kpiBefore: 'Score qualité 8.9/10', kpiAfter: 'Score qualité 9.5+/10', verificationMethod: 'Quality score composite' },
    ],
  },
  {
    blockId: 'edit-2',
    pillarId: 'editorial',
    blockName: 'Enrichissement Citations & Références',
    description: 'Enrichissement de chaque article avec des citations réglementaires pertinentes, des données chiffrées vérifiées, et des références académiques.',
    icon: 'ri-double-quotes-l',
    color: '#BE123C',
    priority: 'P1',
    status: 'in_progress',
    totalActions: 9,
    completedActions: 5,
    criticalActions: 2,
    estimatedEffort: '24h',
    impactEstimate: '+8.4 citations/article en moyenne, crédibilité ×2',
    assignedAgent: 'KOS Long-Form Thought Leadership Writer™',
    deadline: '2026-07-20',
    actions: [
      { actionId: 'edit-2-1', title: 'Auditer densité citations/article', description: 'Mesure du nombre de citations réglementaires par article.', status: 'completed', severity: 'critical', kpiBefore: 'Moyenne 8.4 citations/article', kpiAfter: 'Baseline établie', verificationMethod: 'Comptage automatique' },
      { actionId: 'edit-2-2', title: 'Enrichir articles <5 citations', description: '24 articles avec moins de 5 citations — ajout de références réglementaires pertinentes.', status: 'completed', severity: 'critical', kpiBefore: '24 articles <5 citations', kpiAfter: '0 article <8 citations', verificationMethod: 'Comptage post-enrichissement' },
      { actionId: 'edit-2-3', title: 'Ajouter données chiffrées BCEAO/COBAC', description: 'Insérer des statistiques officielles : taux de bancarisation, ratio de solvabilité, sanctions LBC/FT, etc.', status: 'completed', severity: 'major', kpiBefore: 'Données chiffrées dans 40% articles', kpiAfter: 'Données dans 85% articles', verificationMethod: 'Présence data chiffrée' },
      { actionId: 'edit-2-4', title: 'Insérer frameworks propriétaires', description: 'Chaque article stratégique doit référencer un framework KOS exclusif (KOS Solvency Resilience Score™, etc.).', status: 'completed', severity: 'major', kpiBefore: '9 frameworks utilisés', kpiAfter: '15 frameworks déployés', verificationMethod: 'Comptage frameworks' },
      { actionId: 'edit-2-5', title: 'Ajouter références académiques', description: 'Enrichir les articles de fond avec des citations d\'études (FMI, Banque Mondiale, BAD, OCDE).', status: 'completed', severity: 'minor', kpiBefore: '12 articles avec refs académiques', kpiAfter: '45 articles avec refs académiques', verificationMethod: 'Comptage refs' },
      { actionId: 'edit-2-6', title: 'Vérifier données chiffrées', description: 'Toute donnée chiffrée doit être sourcée avec date et URL.', status: 'in_progress', severity: 'critical', kpiBefore: '35% données non sourcées', kpiAfter: '0% données non sourcées', verificationMethod: 'Vérification source' },
      { actionId: 'edit-2-7', title: 'Ajouter tableaux comparatifs', description: 'Création de tableaux comparatifs UEMOA vs CEMAC, BCEAO vs COBAC, etc.', status: 'in_progress', severity: 'minor', kpiBefore: '18 tableaux comparatifs', kpiAfter: '40 tableaux comparatifs', verificationMethod: 'Comptage tableaux' },
      { actionId: 'edit-2-8', title: 'Réviser bibliographies', description: 'Chaque article long doit avoir une section Références Officielles avec liens.', status: 'pending', severity: 'minor', kpiBefore: '28 articles avec biblio', kpiAfter: '90 articles avec biblio', verificationMethod: 'Présence section' },
      { actionId: 'edit-2-9', title: 'Audit EEAT final', description: 'Vérification Experience, Expertise, Authoritativeness, Trustworthiness sur tous les articles.', status: 'pending', severity: 'major', kpiBefore: 'Score EEAT 82/100', kpiAfter: 'Score EEAT 95/100', verificationMethod: 'EEAT score composite' },
    ],
  },
  {
    blockId: 'edit-3',
    pillarId: 'editorial',
    blockName: 'Correction Factuelle & Mise à Jour Contenu',
    description: 'Vérification factuelle systématique, mise à jour des données obsolètes, rafraîchissement des articles >12 mois.',
    icon: 'ri-check-double-line',
    color: '#BE123C',
    priority: 'P1',
    status: 'pending',
    totalActions: 9,
    completedActions: 2,
    criticalActions: 3,
    estimatedEffort: '18h',
    impactEstimate: '+25% trafic sur articles rafraîchis',
    assignedAgent: 'KOS Content Optimization Recommender™',
    deadline: '2026-07-25',
    actions: [
      { actionId: 'edit-3-1', title: 'Identifier articles >12 mois', description: 'Scan de la base articles pour identifier les contenus non mis à jour depuis >12 mois.', status: 'completed', severity: 'critical', kpiBefore: '0 article identifié', kpiAfter: '47 articles >12 mois identifiés', verificationMethod: 'Requête date dernière modif' },
      { actionId: 'edit-3-2', title: 'Mettre à jour données chiffrées', description: 'Remplacer les statistiques 2024 par 2025/2026 dans les 47 articles obsolètes.', status: 'completed', severity: 'critical', kpiBefore: 'Données 2024', kpiAfter: 'Données 2025/2026', verificationMethod: 'Vérification date données' },
      { actionId: 'edit-3-3', title: 'Rafraîchir contenu réglementaire', description: 'Mise à jour des références aux textes modifiés dans les articles obsolètes.', status: 'pending', severity: 'critical', kpiBefore: 'Réfs obsolètes', kpiAfter: 'Réfs à jour', verificationMethod: 'Date de vigueur' },
      { actionId: 'edit-3-4', title: 'Corriger erreurs factuelles', description: 'Vérification croisée des affirmations factuelles avec les sources officielles.', status: 'pending', severity: 'major', kpiBefore: '247 content decay alerts', kpiAfter: '<50 alerts', verificationMethod: 'Fact-check report' },
      { actionId: 'edit-3-5', title: 'Fusionner articles redondants', description: 'Détection et fusion des articles traitant du même sujet avec des angles complémentaires.', status: 'pending', severity: 'minor', kpiBefore: '12 doublons thématiques', kpiAfter: '0 doublon', verificationMethod: 'Analyse similarité' },
      { actionId: 'edit-3-6', title: 'Mettre à jour meta-données SEO', description: 'Actualisation des title tags, meta descriptions pour les articles rafraîchis.', status: 'pending', severity: 'major', kpiBefore: 'Meta données 2024', kpiAfter: 'Meta données 2026', verificationMethod: 'Crawl meta' },
      { actionId: 'edit-3-7', title: 'Ajouter date "Dernière mise à jour"', description: 'Ajout systématique de la date de dernière révision sur chaque article.', status: 'pending', severity: 'minor', kpiBefore: '0 article avec date', kpiAfter: '100% avec date', verificationMethod: 'Présence lastModified' },
      { actionId: 'edit-3-8', title: 'Archiver contenus obsolètes', description: 'Articles dont le sujet n\'est plus pertinent : archivage avec redirection 301.', status: 'pending', severity: 'minor', kpiBefore: '8 articles obsolètes', kpiAfter: '0 article obsolète', verificationMethod: 'Statut archivé' },
      { actionId: 'edit-3-9', title: 'Rapport qualité éditoriale finale', description: 'Score qualité rédactionnelle 89% → 100%.', status: 'pending', severity: 'major', kpiBefore: 'Score 89%', kpiAfter: 'Score 100%', verificationMethod: 'Audit qualité complet' },
    ],
  },
  {
    blockId: 'edit-4',
    pillarId: 'editorial',
    blockName: 'Enrichissement Visuel & Data Visualization',
    description: 'Ajout systématique d\'infographies, data visualisations, schémas d\'architecture et diagrammes de processus dans les articles.',
    icon: 'ri-image-edit-line',
    color: '#BE123C',
    priority: 'P2',
    status: 'pending',
    totalActions: 8,
    completedActions: 5,
    criticalActions: 0,
    estimatedEffort: '16h',
    impactEstimate: '+42% engagement visuel, +25% temps sur page',
    assignedAgent: 'KOS Infographic & Data Visualization Generator™',
    deadline: '2026-08-01',
    actions: [
      { actionId: 'edit-4-1', title: 'Identifier articles sans visuels', description: 'Scan des articles sans image, infographie ou diagramme.', status: 'completed', severity: 'major', kpiBefore: '0 article scanné', kpiAfter: '34 articles sans visuel identifiés', verificationMethod: 'Comptage images' },
      { actionId: 'edit-4-2', title: 'Générer infographies réglementaires', description: 'Création d\'infographies pour les articles sur la réglementation BCEAO/COBAC.', status: 'completed', severity: 'major', kpiBefore: '12 infographies', kpiAfter: '30 infographies', verificationMethod: 'Comptage infographies' },
      { actionId: 'edit-4-3', title: 'Créer diagrammes de processus', description: 'Transformation des descriptions textuelles en diagrammes Mermaid.js pour les processus de conformité.', status: 'completed', severity: 'minor', kpiBefore: '8 diagrammes', kpiAfter: '25 diagrammes', verificationMethod: 'Comptage Mermaid' },
      { actionId: 'edit-4-4', title: 'Ajouter data visualisations', description: 'Graphiques, jauges, barres pour les articles avec données chiffrées.', status: 'completed', severity: 'minor', kpiBefore: '15 data viz', kpiAfter: '40 data viz', verificationMethod: 'Comptage charts' },
      { actionId: 'edit-4-5', title: 'Optimiser alt-text accessibilité', description: 'Toutes les images doivent avoir un alt-text descriptif conforme WCAG AA.', status: 'completed', severity: 'major', kpiBefore: 'Score accessibilité 91/100', kpiAfter: 'Score accessibilité 98/100', verificationMethod: 'Audit accessibilité' },
      { actionId: 'edit-4-6', title: 'Uniformiser style visuel', description: 'Application de la charte graphique KHEPRA à tous les visuels.', status: 'pending', severity: 'minor', kpiBefore: 'Style incohérent', kpiAfter: 'Style 100% uniforme', verificationMethod: 'Brand compliance check' },
      { actionId: 'edit-4-7', title: 'Convertir images en WebP', description: 'Optimisation des images pour la performance (WebP, lazy loading).', status: 'pending', severity: 'minor', kpiBefore: '45% images WebP', kpiAfter: '100% images WebP', verificationMethod: 'Format check' },
      { actionId: 'edit-4-8', title: 'Générer schémas architecture', description: 'Schémas d\'architecture pour les articles techniques (core banking, sécurité, RAG).', status: 'pending', severity: 'minor', kpiBefore: '5 schémas', kpiAfter: '15 schémas', verificationMethod: 'Comptage schémas' },
    ],
  },

  // ==================== PILIER 3 : SEO & GEO PUBLICATIONS ====================
  {
    blockId: 'seo-1',
    pillarId: 'seo-geo',
    blockName: 'Création Articles Piliers SEO — 8 Piliers',
    description: 'Création des 8 pages piliers avec architecture silo : contenu exhaustif 3000-5000 mots, mots-clés principaux, maillage interne.',
    icon: 'ri-article-line',
    color: '#0891B2',
    priority: 'P0',
    status: 'in_progress',
    totalActions: 10,
    completedActions: 5,
    criticalActions: 3,
    estimatedEffort: '40h',
    impactEstimate: '+40% trafic organique, +8 pages piliers indexées',
    assignedAgent: 'KOS SEO Autopilot 2.0™',
    deadline: '2026-08-01',
    actions: [
      { actionId: 'seo-1-1', title: 'Finaliser pilier Audit & Risk', description: 'Page pilier /pillar/audit-risk-afrique — article exhaustif 4000 mots.', status: 'completed', severity: 'critical', kpiBefore: 'Page pilier partielle', kpiAfter: 'Pilier complet 4000 mots', verificationMethod: 'Word count + indexation' },
      { actionId: 'seo-1-2', title: 'Finaliser pilier Finance & Performance', description: 'Page pilier /pillar/finance-performance-afrique — 3800 mots.', status: 'completed', severity: 'critical', kpiBefore: 'Page pilier partielle', kpiAfter: 'Pilier complet', verificationMethod: 'Indexation GSC' },
      { actionId: 'seo-1-3', title: 'Finaliser pilier Gouvernance', description: 'Page pilier déjà avancée (42 articles) — enrichir à 5000 mots.', status: 'completed', severity: 'major', kpiBefore: '3200 mots', kpiAfter: '5000 mots', verificationMethod: 'Word count' },
      { actionId: 'seo-1-4', title: 'Créer pilier Conformité LBC/FT', description: 'Nouvelle page pilier exhaustive sur la conformité LBC/FT — 4500 mots.', status: 'completed', severity: 'critical', kpiBefore: 'Page inexistante', kpiAfter: 'Pilier 4500 mots', verificationMethod: 'Indexation + trafic' },
      { actionId: 'seo-1-5', title: 'Créer pilier Finance Islamique UEMOA', description: 'Nouveau pilier — Instructions BCEAO 003/004/005-2018, finance islamique SFD.', status: 'completed', severity: 'major', kpiBefore: '0 contenu finance islamique', kpiAfter: 'Pilier 3500 mots', verificationMethod: 'Indexation' },
      { actionId: 'seo-1-6', title: 'Créer pilier Agréments FinTech', description: 'Guide complet des agréments : établissement paiement, PSAN, SFD, EMF.', status: 'in_progress', severity: 'critical', kpiBefore: 'Contenu fragmenté', kpiAfter: 'Pilier unifié 5000 mots', verificationMethod: 'Indexation + featured snippet' },
      { actionId: 'seo-1-7', title: 'Créer pilier Résilience Opérationnelle', description: 'Directive COBAC 2027, DORA Afrique, PCA/PRA — 4000 mots.', status: 'in_progress', severity: 'critical', kpiBefore: '2 articles dispersés', kpiAfter: 'Pilier unifié', verificationMethod: 'Indexation' },
      { actionId: 'seo-1-8', title: 'Créer pilier ESG & Finance Durable', description: 'ISSB, GRI, taxonomie verte UEMOA, stress tests climatiques — 4500 mots.', status: 'in_progress', severity: 'major', kpiBefore: 'Pilier ESG partiel', kpiAfter: 'Pilier complet', verificationMethod: 'Rich results ESG' },
      { actionId: 'seo-1-9', title: 'Maillage interne 8 piliers', description: 'Création des liens croisés entre les 8 piliers et les articles cluster.', status: 'pending', severity: 'major', kpiBefore: 'Maillage 68%', kpiAfter: 'Maillage 95%', verificationMethod: 'Internal link audit' },
      { actionId: 'seo-1-10', title: 'Optimisation on-page SEO piliers', description: 'Title tags, meta descriptions, Hn structure, Schema.org Article/FAQ sur chaque pilier.', status: 'pending', severity: 'major', kpiBefore: 'Score SEO piliers 82/100', kpiAfter: 'Score SEO piliers 98/100', verificationMethod: 'SEO audit score' },
    ],
  },
  {
    blockId: 'seo-2',
    pillarId: 'seo-geo',
    blockName: 'Articles GEO — Optimisation Moteurs IA',
    description: 'Création et optimisation de contenu spécifiquement pour les moteurs IA : ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini.',
    icon: 'ri-robot-line',
    color: '#0891B2',
    priority: 'P0',
    status: 'in_progress',
    totalActions: 12,
    completedActions: 6,
    criticalActions: 4,
    estimatedEffort: '30h',
    impactEstimate: '+80% citations moteurs IA, score GEO 78→95',
    assignedAgent: 'KOS AEO — Answer Engine Optimizer™',
    deadline: '2026-08-15',
    actions: [
      { actionId: 'seo-2-1', title: 'Structurer FAQ Schema 100% articles', description: 'Ajout FAQ Schema sur tous les articles éligibles (68→134 pages).', status: 'completed', severity: 'critical', kpiBefore: '42/134 FAQ Schema', kpiAfter: '120/134 FAQ Schema', verificationMethod: 'Schema validation' },
      { actionId: 'seo-2-2', title: 'Reformuler H2 en questions AEO', description: 'Transformer tous les H2 en questions naturelles (comment, pourquoi, qu\'est-ce que).', status: 'completed', severity: 'critical', kpiBefore: '48 H2 questions', kpiAfter: '200+ H2 questions', verificationMethod: 'H2 audit' },
      { actionId: 'seo-2-3', title: 'Générer réponses concises 40-60 mots', description: 'Ajout de réponses courtes et structurées pour extraction featured snippets.', status: 'completed', severity: 'critical', kpiBefore: '48 réponses concises', kpiAfter: '180 réponses concises', verificationMethod: 'Featured snippet tracking' },
      { actionId: 'seo-2-4', title: 'Créer 15 articles Q&A ciblés PAA', description: 'Articles au format Question/Réponse ciblant les People Also Ask de Google.', status: 'completed', severity: 'major', kpiBefore: '0 article Q&A', kpiAfter: '15 articles Q&A', verificationMethod: 'PAA positions' },
      { actionId: 'seo-2-5', title: 'Optimiser pour ChatGPT/Perplexity', description: 'Structurer le contenu pour être cité par ChatGPT (GPT-4o) et Perplexity AI.', status: 'completed', severity: 'critical', kpiBefore: 'Score ChatGPT 72', kpiAfter: 'Score ChatGPT 90', verificationMethod: 'Citation tracking' },
      { actionId: 'seo-2-6', title: 'Optimiser pour Google AI Overviews', description: 'Contenu structuré pour les AI Overviews : listes, tableaux, définitions.', status: 'completed', severity: 'major', kpiBefore: 'Score AI Overviews 81', kpiAfter: 'Score AI Overviews 92', verificationMethod: 'AI Overview tracking' },
      { actionId: 'seo-2-7', title: 'Créer HowTo Schema 25 pages', description: 'Ajout HowTo Schema sur tous les guides et processus étape par étape.', status: 'in_progress', severity: 'major', kpiBefore: '18 HowTo Schema', kpiAfter: '40 HowTo Schema', verificationMethod: 'Rich results count' },
      { actionId: 'seo-2-8', title: 'Optimiser balises méta-description', description: 'Méta-descriptions optimisées pour CTR >3% avec bénéfice chiffré.', status: 'in_progress', severity: 'major', kpiBefore: 'CTR moyen 2.4%', kpiAfter: 'CTR moyen 3.5%', verificationMethod: 'GSC CTR data' },
      { actionId: 'seo-2-9', title: 'Déployer Speakable Schema', description: 'Schema Speakable pour Assistant Google sur 50 articles.', status: 'pending', severity: 'minor', kpiBefore: '0 Speakable', kpiAfter: '50 Speakable', verificationMethod: 'Schema validation' },
      { actionId: 'seo-2-10', title: 'Créer 10 articles ciblés featured snippets', description: 'Articles conçus spécifiquement pour capturer des featured snippets positions #0.', status: 'pending', severity: 'critical', kpiBefore: '31 featured snippets', kpiAfter: '50+ featured snippets', verificationMethod: 'GSC featured snippet report' },
      { actionId: 'seo-2-11', title: 'Mettre à jour llms.txt et llms-full.txt', description: 'Régénération des fichiers llms.txt avec les nouveaux contenus pour les AI crawlers.', status: 'pending', severity: 'major', kpiBefore: 'llms.txt 52 documents', kpiAfter: 'llms.txt 134 documents', verificationMethod: 'Crawler access logs' },
      { actionId: 'seo-2-12', title: 'Rapport GEO final', description: 'Score GEO 78 → 95, 18 000 citations IA/mois.', status: 'pending', severity: 'major', kpiBefore: 'Score GEO 78/100', kpiAfter: 'Score GEO 95/100', verificationMethod: 'GEO score composite' },
    ],
  },
  {
    blockId: 'seo-3',
    pillarId: 'seo-geo',
    blockName: 'Publications Stratégiques — 25 Nouveaux Articles',
    description: 'Création de 25 nouveaux articles à fort potentiel SEO/GEO : mots-clés à volume élevé, faible concurrence, forte intention.',
    icon: 'ri-file-add-line',
    color: '#0891B2',
    priority: 'P0',
    status: 'in_progress',
    totalActions: 12,
    completedActions: 7,
    criticalActions: 5,
    estimatedEffort: '35h',
    impactEstimate: '+28 000 trafic organique/mois, +45 nouveaux mots-clés Top 10',
    assignedAgent: 'KOS Long-Form Thought Leadership Writer™ + Master Prompt Template',
    deadline: '2026-08-20',
    actions: [
      { actionId: 'seo-3-1', title: 'Identifier 25 gaps de contenu SEO', description: 'Analyse des gaps concurrentiels : mots-clés à fort volume non couverts par KHEPRA.', status: 'completed', severity: 'critical', kpiBefore: 'Gaps non identifiés', kpiAfter: '25 gaps identifiés', verificationMethod: 'Keyword gap analysis' },
      { actionId: 'seo-3-2', title: 'Rédiger 5 articles Régulation', description: 'Nouveaux articles : ratios prudentiels SFD, contrôle interne COBAC, reporting périodique BCEAO, refinancement SFD, modifications statutaires.', status: 'completed', severity: 'critical', kpiBefore: '0 article', kpiAfter: '5 articles', verificationMethod: 'Publication + indexation' },
      { actionId: 'seo-3-3', title: 'Rédiger 5 articles Gouvernance', description: 'Comités spécialisés, administrateurs indépendants, protection lanceurs d\'alerte, verrou nationalité, plans préventifs redressement.', status: 'completed', severity: 'critical', kpiBefore: '0 article', kpiAfter: '5 articles', verificationMethod: 'Publication' },
      { actionId: 'seo-3-4', title: 'Rédiger 5 articles Conformité', description: 'LBC/FT GAFI R.15 actifs virtuels, R.24 BE, dispositif anti-blanchiment, KYC/CDD, sanctions internationales.', status: 'completed', severity: 'critical', kpiBefore: '0 article', kpiAfter: '5 articles', verificationMethod: 'Indexation' },
      { actionId: 'seo-3-5', title: 'Rédiger 5 articles Finance', description: 'ALM bancaire, provisionnement IFRS 9, stress tests climatiques, fonds propres Bâle III, ratio de liquidité LCR/NSFR.', status: 'completed', severity: 'major', kpiBefore: '0 article', kpiAfter: '5 articles', verificationMethod: 'Trafic estimé' },
      { actionId: 'seo-3-6', title: 'Rédiger 5 articles Transformation Digitale', description: 'Open banking UEMOA, core banking migration, mobile money régulation, cybersécurité COBAC 2027, cloud bancaire.', status: 'completed', severity: 'critical', kpiBefore: '0 article', kpiAfter: '5 articles', verificationMethod: 'Publication' },
      { actionId: 'seo-3-7', title: 'Optimiser SEO on-page 25 articles', description: 'Title, meta, Hn, Schema, internal linking, images alt.', status: 'completed', severity: 'major', kpiBefore: 'Score 0', kpiAfter: 'Score SEO 95+/100', verificationMethod: 'SEO audit score' },
      { actionId: 'seo-3-8', title: 'Publier et soumettre indexation', description: 'Publication + soumission Google Indexing API + sitemap.', status: 'in_progress', severity: 'critical', kpiBefore: '0 article publié', kpiAfter: '25 articles publiés', verificationMethod: 'GSC index coverage' },
      { actionId: 'seo-3-9', title: 'Distribuer LinkedIn 25 posts', description: 'Création post LinkedIn pour chaque nouvel article.', status: 'in_progress', severity: 'major', kpiBefore: '0 post', kpiAfter: '25 posts', verificationMethod: 'LinkedIn analytics' },
      { actionId: 'seo-3-10', title: 'Suivre positions GSC 30 jours', description: 'Tracking des positions Google pendant 30 jours après publication.', status: 'pending', severity: 'major', kpiBefore: '0 suivi', kpiAfter: 'Rapport positions', verificationMethod: 'GSC position tracking' },
      { actionId: 'seo-3-11', title: 'A/B test titres/articles', description: 'Test de variantes de titres sur les 25 nouveaux articles pour optimiser le CTR.', status: 'pending', severity: 'minor', kpiBefore: 'CTR initial', kpiAfter: 'CTR optimisé', verificationMethod: 'GSC CTR comparison' },
      { actionId: 'seo-3-12', title: 'Rapport performance SEO/GEO 25 articles', description: 'Trafic généré, positions, featured snippets, citations IA.', status: 'pending', severity: 'major', kpiBefore: 'Score SEO 85%', kpiAfter: 'Score SEO 100%', verificationMethod: 'Performance dashboard' },
    ],
  },
  {
    blockId: 'seo-4',
    pillarId: 'seo-geo',
    blockName: 'Rich Snippets & Schema.org — Couverture 100%',
    description: 'Déploiement complet Schema.org : 12 types existants → 16 types, couverture 88% → 100%, 0 erreur de validation.',
    icon: 'ri-code-s-slash-line',
    color: '#0891B2',
    priority: 'P1',
    status: 'in_progress',
    totalActions: 8,
    completedActions: 3,
    criticalActions: 2,
    estimatedEffort: '12h',
    impactEstimate: '+44 rich results, +25% CTR sur rich snippets',
    assignedAgent: 'KOS Schema Markup Agent™',
    deadline: '2026-08-10',
    actions: [
      { actionId: 'seo-4-1', title: 'Corriger 14 erreurs validation Schema', description: 'Résolution des erreurs de validation Schema.org sur les pages existantes.', status: 'completed', severity: 'critical', kpiBefore: '14 erreurs', kpiAfter: '0 erreur', verificationMethod: 'Schema validator' },
      { actionId: 'seo-4-2', title: 'Déployer Speakable Schema', description: 'Ajout Speakable sur 50 articles pour Assistant Google.', status: 'completed', severity: 'major', kpiBefore: '0 page Speakable', kpiAfter: '50 pages Speakable', verificationMethod: 'Rich results test' },
      { actionId: 'seo-4-3', title: 'Déployer ItemList Schema', description: 'Carrousels Google sur 30 pages de listing (blog, services, outils).', status: 'completed', severity: 'minor', kpiBefore: '0 ItemList', kpiAfter: '30 ItemList', verificationMethod: 'Schema validation' },
      { actionId: 'seo-4-4', title: 'Déployer ProfilePage Schema', description: 'Knowledge Panel pour 12 experts KHEPRA.', status: 'in_progress', severity: 'critical', kpiBefore: '0 ProfilePage', kpiAfter: '12 ProfilePage', verificationMethod: 'Knowledge Panel presence' },
      { actionId: 'seo-4-5', title: 'Déployer Course Schema', description: 'Rich results pour 8 modules de formation KHEPRA Academy.', status: 'in_progress', severity: 'minor', kpiBefore: '0 Course', kpiAfter: '8 Course', verificationMethod: 'Rich results test' },
      { actionId: 'seo-4-6', title: 'Étendre FAQPage à 100% articles', description: 'Couverture FAQPage : 42 → 120 pages.', status: 'in_progress', severity: 'major', kpiBefore: '42 FAQPage', kpiAfter: '120 FAQPage', verificationMethod: 'Schema count' },
      { actionId: 'seo-4-7', title: 'Valider Schema 186→220 pages', description: 'Extension de la couverture Schema.org à toutes les pages stratégiques.', status: 'pending', severity: 'major', kpiBefore: '186 pages avec Schema', kpiAfter: '220 pages avec Schema', verificationMethod: 'Crawl Schema' },
      { actionId: 'seo-4-8', title: 'Rapport couverture Schema 100%', description: 'Score couverture 88% → 100%, 16 types déployés.', status: 'pending', severity: 'major', kpiBefore: 'Score 88%', kpiAfter: 'Score 100%', verificationMethod: 'Schema audit report' },
    ],
  },
];

export const SEO_PUBLICATION_PIPELINE: SEOPublicationPipeline[] = [
  { pubId: 'new-1', title: 'Guide Complet : Agrément Établissement de Paiement UEMOA 2026', category: 'Régulation FinTech', targetKeywords: ['agrément établissement paiement UEMOA', 'IME BCEAO', 'agrément fintech'], estimatedTraffic: 4200, seoScore: 95, geoScore: 88, status: 'in_review', author: 'Dr. Jean-Marc Boka', deadline: '2026-07-10', articleType: 'Guide Pratique', pillarAlignment: 'Conformité' },
  { pubId: 'new-2', title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique Banques UEMOA/CEMAC', category: 'ESG & Risques', targetKeywords: ['stress tests climatiques bancaires', 'NGFS BCEAO', 'risques climatiques banques'], estimatedTraffic: 3800, seoScore: 93, geoScore: 90, status: 'in_review', author: 'Pr. Moussa Traoré', deadline: '2026-07-12', articleType: 'Guide Pratique', pillarAlignment: 'ESG' },
  { pubId: 'new-3', title: 'Ratio de Solvabilité UEMOA 2026 : Calcul, Exigences et Optimisation', category: 'Régulation Prudentielle', targetKeywords: ['ratio de solvabilité UEMOA', 'fonds propres BCEAO', 'Bâle III UEMOA'], estimatedTraffic: 3500, seoScore: 94, geoScore: 85, status: 'published', author: 'Dr. Célestine Koffi', deadline: '2026-07-01', articleType: 'Article Expert', pillarAlignment: 'Finance' },
  { pubId: 'new-4', title: 'LBC/FT : Nouvelles Exigences GAFI 2026 — Guide Conformité Banques & SFD', category: 'LBC/FT', targetKeywords: ['LBC FT GAFI 2026', 'conformité anti-blanchiment', 'GAFI recommandation 15'], estimatedTraffic: 4800, seoScore: 96, geoScore: 91, status: 'published', author: 'Dr. Amadou Sow', deadline: '2026-07-03', articleType: 'Article Expert', pillarAlignment: 'Conformité' },
  { pubId: 'new-5', title: 'Finance Islamique UEMOA : Guide Stratégique Banques & SFD Sharia-Compliant', category: 'Finance Islamique', targetKeywords: ['finance islamique UEMOA', 'instruction BCEAO 003-2018', 'SFD islamique'], estimatedTraffic: 2800, seoScore: 92, geoScore: 87, status: 'draft', author: 'Mamadou Bah', deadline: '2026-07-15', articleType: 'Guide Stratégique', pillarAlignment: 'Finance' },
  { pubId: 'new-6', title: 'Protection Données Personnelles — Conformité RGPD/BCEAO Secteur Financier', category: 'Conformité', targetKeywords: ['protection données personnelles UEMOA', 'RGPD banques Afrique', 'BCEAO données personnelles'], estimatedTraffic: 3100, seoScore: 91, geoScore: 86, status: 'draft', author: 'Fatoumata Diallo', deadline: '2026-07-18', articleType: 'Guide Conformité', pillarAlignment: 'Conformité' },
  { pubId: 'new-7', title: 'Audit Algorithmes Credit Scoring : Exigences BCEAO & Bonnes Pratiques', category: 'Innovation', targetKeywords: ['audit algorithmes credit scoring', 'BCEAO IA scoring', 'credit scoring régulation'], estimatedTraffic: 2200, seoScore: 90, geoScore: 89, status: 'planned', author: 'Ibrahim Kone', deadline: '2026-07-25', articleType: 'Article Expert', pillarAlignment: 'Transformation Digitale' },
  { pubId: 'new-8', title: 'Fonds de Sécurité & Solidarité SFD : Guide Instruction BCEAO 019-2010', category: 'Microfinance', targetKeywords: ['fonds sécurité solidarité SFD', 'IMCEC BCEAO', 'instruction 019-2010'], estimatedTraffic: 1800, seoScore: 89, geoScore: 84, status: 'planned', author: 'Aminata Bah', deadline: '2026-07-28', articleType: 'Guide Technique', pillarAlignment: 'Microfinance' },
  { pubId: 'new-9', title: 'Retrait Agrément SFD UEMOA : Procédure, Recours & Conséquences', category: 'Microfinance', targetKeywords: ['retrait agrément SFD', 'instruction BCEAO 004-2010', 'radiation SFD'], estimatedTraffic: 1500, seoScore: 88, geoScore: 83, status: 'planned', author: 'Dr. Abdoulaye Sangaré', deadline: '2026-08-01', articleType: 'Article Expert', pillarAlignment: 'Microfinance' },
  { pubId: 'new-10', title: 'Provisionnement IFRS 9 Créances Souffrance : Dispositif Prudentiel BCEAO 2026', category: 'Finance', targetKeywords: ['provisionnement IFRS 9', 'créances douteuses BCEAO', 'IFRS 9 UEMOA'], estimatedTraffic: 3200, seoScore: 93, geoScore: 88, status: 'draft', author: 'Dr. Célestine Koffi', deadline: '2026-08-05', articleType: 'Guide Technique', pillarAlignment: 'Finance' },
  { pubId: 'new-11', title: 'Gouvernance SFD : 7 Piliers BCEAO pour Attirer Investisseurs en 2026', category: 'Gouvernance', targetKeywords: ['gouvernance SFD BCEAO', 'investissement microfinance', 'SFD gouvernance'], estimatedTraffic: 2600, seoScore: 91, geoScore: 85, status: 'planned', author: 'Dr. Abdoulaye Sangaré', deadline: '2026-08-08', articleType: 'Article Expert', pillarAlignment: 'Gouvernance' },
  { pubId: 'new-12', title: 'Référentiel Comptable SFD (RCS) : 22 Instructions BCEAO Décryptées', category: 'Comptabilité', targetKeywords: ['référentiel comptable SFD', 'RCS BCEAO', 'instructions BCEAO comptabilité'], estimatedTraffic: 2100, seoScore: 90, geoScore: 84, status: 'planned', author: 'Ibrahim Kone', deadline: '2026-08-12', articleType: 'Guide Technique', pillarAlignment: 'Finance' },
  { pubId: 'new-13', title: 'Inspection COBAC Cameroun 2026 : Guide Pratique de Préparation', category: 'Supervision', targetKeywords: ['inspection COBAC Cameroun', 'préparation inspection COBAC', 'audit COBAC'], estimatedTraffic: 2400, seoScore: 92, geoScore: 87, status: 'draft', author: 'Fatoumata Diallo', deadline: '2026-08-01', articleType: 'Guide Pratique', pillarAlignment: 'Conformité' },
  { pubId: 'new-14', title: 'Régulation Crypto & PSAN UEMOA : Cadre Juridique & Perspectives 2026-2027', category: 'Innovation', targetKeywords: ['régulation crypto UEMOA', 'PSAN Afrique', 'crypto monnaie BCEAO'], estimatedTraffic: 3500, seoScore: 94, geoScore: 91, status: 'draft', author: 'Dr. Simda Padagnassou', deadline: '2026-08-10', articleType: 'Article Expert', pillarAlignment: 'Finance' },
  { pubId: 'new-15', title: 'Reporting Périodique SFD : Guide Complet Instructions BCEAO 018 & 020-2010', category: 'Microfinance', targetKeywords: ['reporting périodique SFD', 'instruction BCEAO 018-2010', 'reporting SFD UEMOA'], estimatedTraffic: 1700, seoScore: 88, geoScore: 82, status: 'planned', author: 'Aminata Bah', deadline: '2026-08-15', articleType: 'Guide Technique', pillarAlignment: 'Microfinance' },
];

export const ARTICLE_COMPLIANCE_AUDIT: ArticleComplianceAudit[] = [
  { articleId: 'art-1', articleTitle: 'Gouvernance bancaire UEMOA : 7 piliers circulaire 01-2017', articleSlug: '/blog/gouvernance-bancaire-uemoa', category: 'Gouvernance', regulatoryScore: 94, editorialScore: 92, seoScore: 96, geoScore: 91, citationsVerified: 12, citationsTotal: 12, issuesFound: 3, issuesFixed: 3, lastAuditDate: '2026-07-01', status: 'compliant' },
  { articleId: 'art-2', articleTitle: 'LBC/FT nouvelles exigences GAFI 2026', articleSlug: '/blog/lbcft-nouvelles-exigences-gafi-2026', category: 'LBC/FT', regulatoryScore: 96, editorialScore: 94, seoScore: 95, geoScore: 93, citationsVerified: 18, citationsTotal: 18, issuesFound: 1, issuesFixed: 1, lastAuditDate: '2026-07-01', status: 'compliant' },
  { articleId: 'art-3', articleTitle: 'Cybersécurité bancaire directive COBAC 2027', articleSlug: '/blog/cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle', category: 'Cybersécurité', regulatoryScore: 92, editorialScore: 93, seoScore: 94, geoScore: 90, citationsVerified: 14, citationsTotal: 15, issuesFound: 4, issuesFixed: 3, lastAuditDate: '2026-07-01', status: 'needs_fix' },
  { articleId: 'art-4', articleTitle: 'Régulation FinTech UEMOA 2026-2027', articleSlug: '/blog/regulation-fintech-uemoa-2026-2027', category: 'FinTech', regulatoryScore: 90, editorialScore: 91, seoScore: 92, geoScore: 89, citationsVerified: 10, citationsTotal: 12, issuesFound: 5, issuesFixed: 3, lastAuditDate: '2026-07-01', status: 'needs_fix' },
  { articleId: 'art-5', articleTitle: 'Prix de transfert : 5 erreurs fatales documentation BEPS', articleSlug: '/blog/prix-transfert-5-erreurs-fatales-documentation-beps', category: 'Fiscalité', regulatoryScore: 95, editorialScore: 90, seoScore: 93, geoScore: 88, citationsVerified: 9, citationsTotal: 9, issuesFound: 2, issuesFixed: 2, lastAuditDate: '2026-07-01', status: 'compliant' },
  { articleId: 'art-6', articleTitle: 'Réforme ratio solvabilité UEMOA 2026', articleSlug: '/blog/reforme-ratio-solvabilite-uemoa-2026', category: 'Finance', regulatoryScore: 93, editorialScore: 92, seoScore: 94, geoScore: 90, citationsVerified: 11, citationsTotal: 11, issuesFound: 2, issuesFixed: 2, lastAuditDate: '2026-07-01', status: 'compliant' },
  { articleId: 'art-7', articleTitle: 'ESG banques africaines standards ISSB', articleSlug: '/blog/esg-banques-africaines-standards-issb', category: 'ESG', regulatoryScore: 89, editorialScore: 88, seoScore: 91, geoScore: 87, citationsVerified: 7, citationsTotal: 10, issuesFound: 6, issuesFixed: 2, lastAuditDate: '2026-07-01', status: 'critical' },
  { articleId: 'art-8', articleTitle: 'Digitalisation SFD modèle BCEAO inclusion financière', articleSlug: '/blog/digitalisation-sfd-modele-bceao-inclusion-financiere', category: 'Microfinance', regulatoryScore: 88, editorialScore: 87, seoScore: 89, geoScore: 85, citationsVerified: 6, citationsTotal: 9, issuesFound: 5, issuesFixed: 1, lastAuditDate: '2026-07-01', status: 'critical' },
  { articleId: 'art-9', articleTitle: 'Préparer conseil administration inspection COBAC', articleSlug: '/blog/preparer-conseil-administration-inspection-cobac', category: 'Gouvernance', regulatoryScore: 91, editorialScore: 90, seoScore: 90, geoScore: 86, citationsVerified: 8, citationsTotal: 10, issuesFound: 4, issuesFixed: 3, lastAuditDate: '2026-07-01', status: 'needs_fix' },
  { articleId: 'art-10', articleTitle: 'Stress tests climatiques pilier 2 BCEAO/COBAC', articleSlug: '/blog/stress-tests-climatiques-pilier-2-bceao-cobac', category: 'ESG', regulatoryScore: 87, editorialScore: 89, seoScore: 92, geoScore: 88, citationsVerified: 8, citationsTotal: 12, issuesFound: 6, issuesFixed: 1, lastAuditDate: '2026-07-01', status: 'critical' },
];

export const FULL_BLOCK_EXECUTION_KPIS = {
  globalProgress: 54,
  totalActions: 104,
  completedActions: 56,
  criticalRemaining: 15,
  majorRemaining: 22,
  minorRemaining: 11,
  estimatedTotalEffort: '135 heures',
  estimatedCompletionDate: '15 Août 2026',
  bigFourComplianceTarget: 100,
  bigFourComplianceCurrent: 92,
  bigFourEditorialTarget: 100,
  bigFourEditorialCurrent: 89,
  bigFourSEOTarget: 100,
  bigFourSEOCurrent: 85,
  overallTarget: 100,
  overallCurrent: 88,
  articlesAuditedTotal: 134,
  articlesFullyCompliant: 78,
  articlesNeedingFix: 42,
  articlesCritical: 14,
  newPublicationsPlanned: 25,
  newPublicationsDrafted: 8,
  newPublicationsInReview: 2,
  newPublicationsPublished: 2,
  seoKeywordsTargeted: 85,
  geoCitationsMonthlyTarget: 18000,
  geoCitationsMonthlyCurrent: 12400,
  featuredSnippetsTarget: 50,
  featuredSnippetsCurrent: 31,
  schemaCoverageTarget: 100,
  schemaCoverageCurrent: 88,
  lastExecutionDate: '2026-07-02T08:00:00Z',
  nextScheduledScan: '2026-07-03T06:00:00Z',
};