// ============================================================================
// KOS AUTO-MEMORIZATION — Correction Pattern Library
// Extraction automatique des patterns de correction depuis l'historique
// des tickets, fix history, et lessons_learned
// ============================================================================

export interface CorrectionFixPattern {
  id: string;
  patternName: string;
  errorCategory: 'broken_link' | 'content_quality' | 'security_header' | 'conversion_gap' | 'seo_gap' | 'infra_gap' | 'compliance_gap' | 'data_gap' | 'process_gap';
  errorSignature: string[];
  detectedFrom: string[]; // source engines
  totalOccurrences: number;
  autoFixStrategy: string;
  autoFixSuccessRate: number;
  manualFixRequired: boolean;
  fixSteps: string[];
  estimatedTimeToFixMin: number;
  affectedUrlsCount: number;
  status: 'active' | 'testing' | 'deprecated' | 'learning';
  lastAutoFixed: string;
  confidence: number;
  crossEngineImpact: string[];
  savingsMinutesCumulated: number;
}

export interface MemorizationScan {
  id: string;
  startedAt: string;
  completedAt: string;
  sourcesScanned: string[];
  totalTicketsAnalyzed: number;
  totalFixHistoryAnalyzed: number;
  patternsDiscovered: number;
  patternsPromoted: number;
  autoFixStrategiesDeployed: number;
  newAutoFixableDetected: number;
  status: 'running' | 'completed' | 'failed';
  summary: string;
}

export interface AutoFixEvent {
  id: string;
  timestamp: string;
  ticketId: string;
  patternApplied: string;
  engine: string;
  targetUrl: string;
  fixStrategy: string;
  success: boolean;
  timeSavedMin: number;
  humanInterventionNeeded: boolean;
}

export interface MemorizationStats {
  totalCorrectionsScanned: number;
  patternsExtracted: number;
  activePatterns: number;
  autoFixSuccessRate: number;
  totalAutoFixesApplied: number;
  totalTimeSavedHours: number;
  humanInterventionsAvoided: number;
  learningVelocity: number;
  lastScanTimestamp: string;
  enginesCovered: number;
}

// --- CORRECTION FIX PATTERNS (extraits de l'historique) ---

export const correctionFixPatterns: CorrectionFixPattern[] = [
  {
    id: 'cfp-001',
    patternName: 'Broken Link → Auto-Redirect 301',
    errorCategory: 'broken_link',
    errorSignature: ['404', 'Not Found', 'broken', 'lien cassé', 'status_code: 404', 'page non trouvée'],
    detectedFrom: ['url_auto_pointage', 'corrective_execution'],
    totalOccurrences: 47,
    autoFixStrategy: 'Détection 404 → recherche page similaire par similarité sémantique → 301 automatique si match > 85%',
    autoFixSuccessRate: 92,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner la base pour les URLs cassées (status 404/410)',
      '2. Extraire le slug et les mots-clés de l\'URL cassée',
      '3. Rechercher la page la plus similaire via cosine similarity sur les titres',
      '4. Si score > 85% → créer redirect 301 automatique',
      '5. Si score 60-85% → proposer la redirection pour validation humaine',
      '6. Logger la correction dans fix_history',
    ],
    estimatedTimeToFixMin: 2,
    affectedUrlsCount: 47,
    status: 'active',
    lastAutoFixed: '2026-06-28',
    confidence: 94,
    crossEngineImpact: ['corrective_execution', 'content_correction', 'digital_growth'],
    savingsMinutesCumulated: 94,
  },
  {
    id: 'cfp-002',
    patternName: 'Content Score < 7/10 → Auto-Restructuration Big Four',
    errorCategory: 'content_quality',
    errorSignature: ['score', 'contenu', 'descriptif', 'pas d\'insight', 'ton', 'structure', 'CTA manquant', '5.8/10', '5.2/10'],
    detectedFrom: ['content_correction'],
    totalOccurrences: 23,
    autoFixStrategy: 'Détection score < 7/10 → application template 7 Étapes KHEPRA → régénération section par section → Quality Gate',
    autoFixSuccessRate: 78,
    manualFixRequired: true,
    fixSteps: [
      '1. Analyser le contenu via Big Four Content Scorer',
      '2. Si score < 7/10 : identifier les sections défaillantes',
      '3. Appliquer le template 7 Étapes KHEPRA™',
      '4. Régénérer les sections faibles avec le prompt "article-big-four-v5"',
      '5. Insérer CTA contextuel automatique',
      '6. Passer le Quality Gate (6 dimensions)',
      '7. Si score final > 9/10 → publier. Sinon → flag pour review humaine.',
    ],
    estimatedTimeToFixMin: 15,
    affectedUrlsCount: 23,
    status: 'active',
    lastAutoFixed: '2026-06-27',
    confidence: 82,
    crossEngineImpact: ['content_correction', 'digital_growth'],
    savingsMinutesCumulated: 345,
  },
  {
    id: 'cfp-003',
    patternName: 'Security Header Manquant → Auto-Configuration',
    errorCategory: 'security_header',
    errorSignature: ['HSTS', 'CSP', 'X-Frame-Options', 'SecurityHeaders', 'Score F', 'header manquant', 'ISO 27001'],
    detectedFrom: ['cyber_tech'],
    totalOccurrences: 18,
    autoFixStrategy: 'Scan headers → génération configuration manquante → déploiement automatique via Netlify config',
    autoFixSuccessRate: 95,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner les headers de sécurité (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)',
      '2. Identifier les headers manquants ou mal configurés',
      '3. Générer la configuration optimale basée sur les best practices OWASP',
      '4. Déployer via _headers ou netlify.toml',
      '5. Re-scanner pour confirmer le fix',
      '6. Logger dans security_logs',
    ],
    estimatedTimeToFixMin: 5,
    affectedUrlsCount: 18,
    status: 'active',
    lastAutoFixed: '2026-06-26',
    confidence: 96,
    crossEngineImpact: ['cyber_tech', 'corrective_execution'],
    savingsMinutesCumulated: 90,
  },
  {
    id: 'cfp-004',
    patternName: 'CTA Manquant ou Générique → Auto-Insertion Contextuelle',
    errorCategory: 'conversion_gap',
    errorSignature: ['CTA', 'call-to-action', 'conversion', 'taux capture', 'formulaire', 'lead', 'sans CTA', 'CTA générique'],
    detectedFrom: ['content_correction', 'digital_growth'],
    totalOccurrences: 31,
    autoFixStrategy: 'Détection absence CTA → matching CTA contextuel par sujet → insertion automatique avec A/B test',
    autoFixSuccessRate: 85,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner la page pour détecter la présence de CTA',
      '2. Si absent ou générique : analyser le sujet de la page',
      '3. Matcher avec le CTA le plus pertinent (diagnostic, lead magnet, consultation)',
      '4. Insérer le CTA au point de friction optimal (après section 3)',
      '5. Configurer l\'A/B test (variante avec/sans CTA)',
      '6. Suivre le taux de clic pendant 7 jours',
    ],
    estimatedTimeToFixMin: 3,
    affectedUrlsCount: 31,
    status: 'active',
    lastAutoFixed: '2026-06-28',
    confidence: 88,
    crossEngineImpact: ['digital_growth', 'content_correction'],
    savingsMinutesCumulated: 93,
  },
  {
    id: 'cfp-005',
    patternName: 'Méta-Title > 60 Caractères → Auto-Troncature SEO',
    errorCategory: 'seo_gap',
    errorSignature: ['title', 'meta', 'SEO', '> 60', 'caractères', 'trop long', 'balise title'],
    detectedFrom: ['corrective_execution', 'content_correction'],
    totalOccurrences: 89,
    autoFixStrategy: 'Scan titles → détection longueur > 60 → génération variante optimisée → remplacement automatique',
    autoFixSuccessRate: 91,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner toutes les pages pour la longueur du title',
      '2. Si > 60 caractères : extraire les mots-clés principaux',
      '3. Générer 3 variantes ≤ 60 caractères avec LLM économique',
      '4. Sélectionner la meilleure (conservation sémantique + mots-clés)',
      '5. Appliquer le nouveau title',
      '6. Logger dans fix_history avec avant/après',
    ],
    estimatedTimeToFixMin: 2,
    affectedUrlsCount: 89,
    status: 'active',
    lastAutoFixed: '2026-06-29',
    confidence: 93,
    crossEngineImpact: ['content_correction', 'digital_growth', 'corrective_execution'],
    savingsMinutesCumulated: 178,
  },
  {
    id: 'cfp-006',
    patternName: 'Formulaire > 3 Champs → Auto-Réduction',
    errorCategory: 'conversion_gap',
    errorSignature: ['formulaire', 'champs', '> 5', 'abandon', 'complétion', 'optimisé'],
    detectedFrom: ['digital_growth'],
    totalOccurrences: 15,
    autoFixStrategy: 'Scan formulaires → si > 3 champs → réduire aux 3 essentiels (email + prénom + entreprise)',
    autoFixSuccessRate: 88,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner tous les formulaires du site',
      '2. Compter le nombre de champs par formulaire',
      '3. Si > 3 : conserver email + nom/prénom + entreprise',
      '4. Déplacer les champs supprimés vers le profil post-inscription',
      '5. Mettre à jour le form HTML',
      '6. Suivre le taux de complétion pendant 14 jours',
    ],
    estimatedTimeToFixMin: 4,
    affectedUrlsCount: 15,
    status: 'active',
    lastAutoFixed: '2026-06-25',
    confidence: 90,
    crossEngineImpact: ['digital_growth'],
    savingsMinutesCumulated: 60,
  },
  {
    id: 'cfp-007',
    patternName: 'Framework KHEPRA™ Manquant → Auto-Référencement',
    errorCategory: 'content_quality',
    errorSignature: ['framework', 'KHEPRA', 'propriétaire', 'non nommé', 'intellectual property', 'méthodologie'],
    detectedFrom: ['content_correction'],
    totalOccurrences: 12,
    autoFixStrategy: 'Détection article sans framework KHEPRA → matching framework pertinent → insertion automatique',
    autoFixSuccessRate: 75,
    manualFixRequired: true,
    fixSteps: [
      '1. Scanner le contenu pour les mentions de frameworks KHEPRA™',
      '2. Si absent : analyser le domaine de l\'article',
      '3. Matcher avec le framework KHEPRA le plus pertinent (Compliance Navigator™, Due Diligence 360™, etc.)',
      '4. Insérer une mention contextuelle du framework dans la section Méthodologie',
      '5. Flag pour validation humaine (contenu sensible)',
    ],
    estimatedTimeToFixMin: 8,
    affectedUrlsCount: 12,
    status: 'active',
    lastAutoFixed: '2026-06-24',
    confidence: 80,
    crossEngineImpact: ['content_correction'],
    savingsMinutesCumulated: 96,
  },
  {
    id: 'cfp-008',
    patternName: 'Méta-Description > 160 Caractères → Auto-Résumé',
    errorCategory: 'seo_gap',
    errorSignature: ['description', 'meta', 'SEO', '> 160', 'caractères', 'trop longue'],
    detectedFrom: ['corrective_execution', 'content_correction'],
    totalOccurrences: 67,
    autoFixStrategy: 'Scan descriptions → détection > 160 → extraction phrases clés → génération résumé optimisé',
    autoFixSuccessRate: 89,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner toutes les pages pour la longueur de la meta description',
      '2. Si > 160 caractères : extraire les phrases les plus informatives',
      '3. Générer un résumé de 150-160 caractères via Automaton TF-IDF',
      '4. Vérifier la présence des mots-clés principaux',
      '5. Appliquer la nouvelle description',
    ],
    estimatedTimeToFixMin: 2,
    affectedUrlsCount: 67,
    status: 'active',
    lastAutoFixed: '2026-06-29',
    confidence: 91,
    crossEngineImpact: ['content_correction', 'digital_growth'],
    savingsMinutesCumulated: 134,
  },
  {
    id: 'cfp-009',
    patternName: 'Logging/Vide → Auto-Activation Audit Trail',
    errorCategory: 'compliance_gap',
    errorSignature: ['logging', 'SIEM', 'audit trail', 'monitoring_logs', 'vide', 'ISO 27001', 'A.12.4'],
    detectedFrom: ['cyber_tech'],
    totalOccurrences: 8,
    autoFixStrategy: 'Détection tables de log vides → activation automatique des edge functions de logging → vérification flux',
    autoFixSuccessRate: 98,
    manualFixRequired: false,
    fixSteps: [
      '1. Vérifier le statut des tables monitoring_logs et security_logs',
      '2. Si vides : activer les edge functions kos-security-logger et kos-site-health-check',
      '3. Configurer les triggers sur les événements critiques',
      '4. Vérifier que les logs commencent à être écrits',
      '5. Configurer des alertes si le flux de logs s\'arrête',
    ],
    estimatedTimeToFixMin: 10,
    affectedUrlsCount: 8,
    status: 'active',
    lastAutoFixed: '2026-06-23',
    confidence: 97,
    crossEngineImpact: ['cyber_tech', 'corrective_execution'],
    savingsMinutesCumulated: 80,
  },
  {
    id: 'cfp-010',
    patternName: 'FAQPage Schema Manquant → Auto-Génération',
    errorCategory: 'seo_gap',
    errorSignature: ['FAQPage', 'schema', 'rich snippet', 'données structurées', 'FAQ', 'JSON-LD'],
    detectedFrom: ['content_correction', 'corrective_execution'],
    totalOccurrences: 14,
    autoFixStrategy: 'Détection page service sans FAQPage → extraction questions depuis contenu → génération JSON-LD',
    autoFixSuccessRate: 86,
    manualFixRequired: true,
    fixSteps: [
      '1. Scanner les pages service pour la présence de FAQPage Schema',
      '2. Si absent : analyser le contenu pour extraire les questions/réponses implicites',
      '3. Générer 3-5 paires Q&A pertinentes avec le LLM',
      '4. Construire le JSON-LD FAQPage',
      '5. Insérer dans le structuredData de la page',
      '6. Flag pour validation humaine (contenu réglementaire)',
    ],
    estimatedTimeToFixMin: 6,
    affectedUrlsCount: 14,
    status: 'active',
    lastAutoFixed: '2026-06-28',
    confidence: 84,
    crossEngineImpact: ['content_correction', 'digital_growth'],
    savingsMinutesCumulated: 84,
  },
  {
    id: 'cfp-011',
    patternName: 'Modal Overflow Mismatch → Split-Scroll Architecture',
    errorCategory: 'process_gap',
    errorSignature: ['overflow', 'scroll', 'modal', 'fenêtre lecture', 'fixed inset-0 overflow-y-auto', 'max-h', 'flex-col', 'overscroll-contain', 'KBR', 'overlay défile'],
    detectedFrom: ['corrective_execution', 'content_correction'],
    totalOccurrences: 4,
    autoFixStrategy: 'Détection modale avec overflow sur overlay → restructuration Split-Scroll : overlay centré + image header fixe + content scrollable indépendant',
    autoFixSuccessRate: 96,
    manualFixRequired: false,
    fixSteps: [
      '1. Scanner les composants modaux du projet (pattern: fixed inset-0 + overflow-y-auto sur overlay)',
      '2. Si overflow sur l\'overlay parent plutôt que sur le content : flag pour restructuration',
      '3. Restructurer en Split-Scroll Architecture : overlay=flex items-center justify-center p-4',
      '4. Modal box = max-h-[92vh] flex flex-col overflow-hidden',
      '5. Header image = flex-shrink-0 (reste fixe en haut)',
      '6. Content section = flex-1 overflow-y-auto overscroll-contain (défile indépendamment)',
      '7. Vérifier que le bouton close reste accessible (z-20)',
      '8. Ajuster image header hauteur : h-40 md:h-56 pour gagner de l\'espace de lecture',
      '9. Logger la correction dans fix_history avec avant/après UX',
    ],
    estimatedTimeToFixMin: 4,
    affectedUrlsCount: 4,
    status: 'active',
    lastAutoFixed: '2026-06-29',
    confidence: 96,
    crossEngineImpact: ['corrective_execution', 'content_correction'],
    savingsMinutesCumulated: 16,
  },
];

// --- MEMORIZATION SCANS ---

export const memorizationScans: MemorizationScan[] = [
  {
    id: 'memscan-001',
    startedAt: '2026-06-29T02:00:00Z',
    completedAt: '2026-06-29T02:12:45Z',
    sourcesScanned: ['kos_auto_correction_tickets', 'kos_correction_fix_history', 'lessons_learned', 'kos_execution_logs', 'orchestration_logs', 'kos_correction_loop_log'],
    totalTicketsAnalyzed: 24,
    totalFixHistoryAnalyzed: 156,
    patternsDiscovered: 10,
    patternsPromoted: 7,
    autoFixStrategiesDeployed: 7,
    newAutoFixableDetected: 42,
    status: 'completed',
    summary: 'Scan nocturne : 24 tickets + 156 fix history analysés. 10 patterns extraits, 7 déployés en auto-fix. 42 nouvelles corrections identifiées comme auto-fixables. Économie estimée : 21 heures de travail humain.',
  },
  {
    id: 'memscan-002',
    startedAt: '2026-06-28T08:00:00Z',
    completedAt: '2026-06-28T08:08:22Z',
    sourcesScanned: ['kos_auto_correction_tickets', 'lessons_learned', 'best_practices'],
    totalTicketsAnalyzed: 18,
    totalFixHistoryAnalyzed: 89,
    patternsDiscovered: 5,
    patternsPromoted: 3,
    autoFixStrategiesDeployed: 3,
    newAutoFixableDetected: 24,
    status: 'completed',
    summary: 'Scan matinal : 3 nouveaux patterns détectés (méta-title, méta-description, FAQPage). 24 corrections rétro-activement marquées auto-fixables.',
  },
  {
    id: 'memscan-003',
    startedAt: '2026-06-29T10:00:00Z',
    completedAt: '',
    sourcesScanned: ['kos_auto_correction_tickets', 'kos_correction_fix_history', 'lessons_learned', 'best_practices', 'knowledge_capsules', 'kos_corrective_blocks', 'kos_correction_loop_log'],
    totalTicketsAnalyzed: 0,
    totalFixHistoryAnalyzed: 0,
    patternsDiscovered: 0,
    patternsPromoted: 0,
    autoFixStrategiesDeployed: 0,
    newAutoFixableDetected: 0,
    status: 'running',
    summary: 'Scan en cours — analyse cross-engine des dernières corrections...',
  },
];

// --- AUTO-FIX EVENTS ---

export const autoFixEvents: AutoFixEvent[] = [
  { id: 'afe-001', timestamp: '2026-06-29T02:12:00Z', ticketId: 'TKT-CONT-20260613-0006', patternApplied: 'cfp-005', engine: 'content_correction', targetUrl: '/blog/regulation-fintech-uemoa-2026-2027/', fixStrategy: 'meta-title-auto-truncate', success: true, timeSavedMin: 2, humanInterventionNeeded: false },
  { id: 'afe-002', timestamp: '2026-06-29T02:10:00Z', ticketId: 'TKT-URL-20260628-0042', patternApplied: 'cfp-001', engine: 'url_auto_pointage', targetUrl: '/ancien-blog/gouvernance-sfd/', fixStrategy: 'auto-redirect-301', success: true, timeSavedMin: 2, humanInterventionNeeded: false },
  { id: 'afe-003', timestamp: '2026-06-29T02:08:00Z', ticketId: 'TKT-URL-20260628-0037', patternApplied: 'cfp-001', engine: 'url_auto_pointage', targetUrl: '/services/audit-interne/', fixStrategy: 'auto-redirect-301', success: true, timeSavedMin: 2, humanInterventionNeeded: false },
  { id: 'afe-004', timestamp: '2026-06-28T08:05:00Z', ticketId: 'TKT-CONT-20260628-0003', patternApplied: 'cfp-008', engine: 'content_correction', targetUrl: '/services/conseil-strategique/', fixStrategy: 'meta-description-auto-summarize', success: true, timeSavedMin: 2, humanInterventionNeeded: false },
  { id: 'afe-005', timestamp: '2026-06-28T08:04:00Z', ticketId: 'TKT-CONT-20260628-0002', patternApplied: 'cfp-005', engine: 'content_correction', targetUrl: '/pillar/gouvernance-entreprise-afrique/', fixStrategy: 'meta-title-auto-truncate', success: true, timeSavedMin: 2, humanInterventionNeeded: false },
  { id: 'afe-006', timestamp: '2026-06-28T08:03:00Z', ticketId: 'TKT-GROW-20260628-0007', patternApplied: 'cfp-004', engine: 'digital_growth', targetUrl: '/blog/esg-banques-africaines-standards-issb/', fixStrategy: 'cta-auto-insert', success: true, timeSavedMin: 3, humanInterventionNeeded: false },
  { id: 'afe-007', timestamp: '2026-06-27T15:30:00Z', ticketId: 'TKT-CONT-20260627-0005', patternApplied: 'cfp-002', engine: 'content_correction', targetUrl: '/services/defense-fiscale-prix-transfert/', fixStrategy: 'content-restructuration', success: false, timeSavedMin: 0, humanInterventionNeeded: true },
  { id: 'afe-008', timestamp: '2026-06-27T15:28:00Z', ticketId: 'TKT-CONT-20260627-0004', patternApplied: 'cfp-007', engine: 'content_correction', targetUrl: '/blog/controle-interne-tresorerie/', fixStrategy: 'framework-auto-reference', success: true, timeSavedMin: 8, humanInterventionNeeded: true },
  { id: 'afe-009', timestamp: '2026-06-27T02:05:00Z', ticketId: 'TKT-CYBER-20260627-0002', patternApplied: 'cfp-003', engine: 'cyber_tech', targetUrl: '/', fixStrategy: 'security-headers-auto-config', success: true, timeSavedMin: 5, humanInterventionNeeded: false },
  { id: 'afe-010', timestamp: '2026-06-26T22:15:00Z', ticketId: 'TKT-GROW-20260626-0012', patternApplied: 'cfp-006', engine: 'digital_growth', targetUrl: '/contact/', fixStrategy: 'form-auto-reduce', success: true, timeSavedMin: 4, humanInterventionNeeded: false },
  { id: 'afe-011', timestamp: '2026-06-26T22:10:00Z', ticketId: 'TKT-CYBER-20260626-0008', patternApplied: 'cfp-009', engine: 'cyber_tech', targetUrl: '/', fixStrategy: 'logging-auto-activation', success: true, timeSavedMin: 10, humanInterventionNeeded: false },
  { id: 'afe-012', timestamp: '2026-06-26T14:00:00Z', ticketId: 'TKT-CONT-20260626-0007', patternApplied: 'cfp-010', engine: 'content_correction', targetUrl: '/services/controle-interne-bancaire/', fixStrategy: 'faqpage-auto-generate', success: true, timeSavedMin: 6, humanInterventionNeeded: true },
  { id: 'afe-013', timestamp: '2026-06-29T11:15:00Z', ticketId: 'TKT-UX-20260629-0003', patternApplied: 'cfp-011', engine: 'corrective_execution', targetUrl: '/khepra-business-review/', fixStrategy: 'modal-split-scroll-architecture', success: true, timeSavedMin: 4, humanInterventionNeeded: false },
];

// --- MEMORIZATION STATS ---

export const memorizationStats: MemorizationStats = {
  totalCorrectionsScanned: 371,
  patternsExtracted: 11,
  activePatterns: 8,
  autoFixSuccessRate: 88,
  totalAutoFixesApplied: 93,
  totalTimeSavedHours: 21.8,
  humanInterventionsAvoided: 78,
  learningVelocity: 4.5,
  lastScanTimestamp: '2026-06-29T11:15:00Z',
  enginesCovered: 4,
};





