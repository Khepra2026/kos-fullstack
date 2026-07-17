// ============================================================================
// KOS AUTONOMOUS STACK TRANSFORMATION PROGRAM™ — Hub 91
// Désintermédiation API + Construction Infrastructure Propriétaire
// Big Four Self-Evolution Program — Stack Autonomy
// ============================================================================

// ─── EXTERNAL DEPENDENCY DIAGNOSTIC ──────────────────────────────────────

export interface ExternalDependency {
  id: string;
  name: string;
  category: 'llm_api' | 'database' | 'saas_automation' | 'media_api' | 'analytics' | 'auth' | 'email' | 'other';
  provider: string;
  currentCostMonthlyFCFA: number;
  costPerCallFCFA: number;
  callsPerMonth: number;
  criticality: 'P0-critical' | 'P1-high' | 'P2-medium' | 'P3-low';
  frequency: 'continuous' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  description: string;
  usedBy: string[];
  replaceable: boolean;
  replacementDifficulty: 'easy' | 'moderate' | 'hard' | 'very_hard';
  replacementOption: string;
  estimatedInternalCostFCFA: number;
  estimatedMigrationTime: string;
  icon: string;
  color: string;
}

export const EXTERNAL_DEPENDENCIES: ExternalDependency[] = [
  {
    id: 'DEP-001',
    name: 'OpenAI GPT-4o (API LLM)',
    category: 'llm_api',
    provider: 'OpenAI',
    currentCostMonthlyFCFA: 320000,
    costPerCallFCFA: 180,
    callsPerMonth: 1780,
    criticality: 'P0-critical',
    frequency: 'continuous',
    description: 'API LLM principale pour génération de contenu, analyse, synthèse, traduction. Utilisée dans 80% des workflows KOS.',
    usedBy: ['KOS Content Factory', 'KOS Compliance Engine', 'KOS Audit Intelligence', 'KOS Blog Writing'],
    replaceable: true,
    replacementDifficulty: 'very_hard',
    replacementOption: 'Ollama (Llama 3.1 70B / Mistral Large) + vLLM serveur inférence local',
    estimatedInternalCostFCFA: 85000,
    estimatedMigrationTime: '8 semaines',
    icon: 'ri-brain-line',
    color: '#10A37F',
  },
  {
    id: 'DEP-002',
    name: 'Anthropic Claude 3.5 Sonnet (API LLM)',
    category: 'llm_api',
    provider: 'Anthropic',
    currentCostMonthlyFCFA: 185000,
    costPerCallFCFA: 280,
    callsPerMonth: 660,
    criticality: 'P1-high',
    frequency: 'daily',
    description: 'API LLM secondaire pour analyses complexes, raisonnement multi-étapes, rapports stratégiques. Utilisée par Strategic Intelligence.',
    usedBy: ['KOS Strategic Intelligence', 'KOS Board Advisory', 'KOS Executive Command'],
    replaceable: true,
    replacementDifficulty: 'very_hard',
    replacementOption: 'Ollama (Qwen 2.5 72B) + fine-tuning KHEPRA corpus',
    estimatedInternalCostFCFA: 65000,
    estimatedMigrationTime: '10 semaines',
    icon: 'ri-brain-2-line',
    color: '#D97757',
  },
  {
    id: 'DEP-003',
    name: 'Supabase Cloud (Database + Auth + Storage)',
    category: 'database',
    provider: 'Supabase',
    currentCostMonthlyFCFA: 75000,
    costPerCallFCFA: 0,
    callsPerMonth: 2500000,
    criticality: 'P0-critical',
    frequency: 'continuous',
    description: 'Base de données principale, authentification, stockage fichiers. Infrastructure critique — toute l\'app KOS repose dessus.',
    usedBy: ['TOUS les workflows KOS', 'KOS Dashboard', 'KOS CRM', 'KOS Knowledge Graph'],
    replaceable: true,
    replacementDifficulty: 'very_hard',
    replacementOption: 'PostgreSQL auto-hébergé + MinIO (stockage) + Auth.js (auth locale)',
    estimatedInternalCostFCFA: 35000,
    estimatedMigrationTime: '16 semaines',
    icon: 'ri-database-2-line',
    color: '#3ECF8E',
  },
  {
    id: 'DEP-004',
    name: 'ElevenLabs TTS (API Voix)',
    category: 'media_api',
    provider: 'ElevenLabs',
    currentCostMonthlyFCFA: 45000,
    costPerCallFCFA: 75,
    callsPerMonth: 600,
    criticality: 'P1-high',
    frequency: 'daily',
    description: 'Synthèse vocale pour podcasts, vidéos YouTube. 3 voix KHEPRA en production. Déjà un plan de remplacement (Coqui TTS).',
    usedBy: ['KOS Voice AI Studio', 'KOS YouTube Pipeline', 'KOS Media Factory'],
    replaceable: true,
    replacementDifficulty: 'moderate',
    replacementOption: 'Coqui TTS XTTS-v2 fine-tuned KHEPRA + Piper TTS léger',
    estimatedInternalCostFCFA: 12000,
    estimatedMigrationTime: '4 semaines',
    icon: 'ri-mic-fill',
    color: '#86BC25',
  },
  {
    id: 'DEP-005',
    name: 'Google AI (Gemini 1.5 Pro — API LLM)',
    category: 'llm_api',
    provider: 'Google',
    currentCostMonthlyFCFA: 45000,
    costPerCallFCFA: 55,
    callsPerMonth: 820,
    criticality: 'P2-medium',
    frequency: 'daily',
    description: 'API LLM tertiaire pour analyses multimodales (images, vidéos). Utilisée par YouTube Analytics et Thumbnail Factory.',
    usedBy: ['KOS YouTube Analytics', 'KOS Thumbnail Factory'],
    replaceable: true,
    replacementDifficulty: 'hard',
    replacementOption: 'Ollama (Llama 3.2 Vision 11B) + traitement local images',
    estimatedInternalCostFCFA: 18000,
    estimatedMigrationTime: '6 semaines',
    icon: 'ri-google-line',
    color: '#4285F4',
  },
  {
    id: 'DEP-006',
    name: 'Make / Zapier (Automatisation SaaS)',
    category: 'saas_automation',
    provider: 'Make (Integromat)',
    currentCostMonthlyFCFA: 35000,
    costPerCallFCFA: 3.5,
    callsPerMonth: 10000,
    criticality: 'P1-high',
    frequency: 'continuous',
    description: 'Plateforme d\'automatisation SaaS pour workflows transverses (notifications, synchronisations). Remplaçable par n8n auto-hébergé.',
    usedBy: ['KOS Notification System', 'KOS CRM Integration', 'Email Automation'],
    replaceable: true,
    replacementDifficulty: 'easy',
    replacementOption: 'n8n auto-hébergé (déjà en place partiellement)',
    estimatedInternalCostFCFA: 0,
    estimatedMigrationTime: '2 semaines',
    icon: 'ri-git-branch-line',
    color: '#6D28D9',
  },
  {
    id: 'DEP-007',
    name: 'Resend (Email API)',
    category: 'email',
    provider: 'Resend',
    currentCostMonthlyFCFA: 15000,
    costPerCallFCFA: 0.8,
    callsPerMonth: 18750,
    criticality: 'P2-medium',
    frequency: 'daily',
    description: 'API d\'envoi d\'emails transactionnels et marketing. Intégré via edge functions.',
    usedBy: ['KOS Email Funnel', 'KOS Lead Nurturing', 'Admin Notifications'],
    replaceable: true,
    replacementDifficulty: 'easy',
    replacementOption: 'Postfix/Sendmail local + SMTP auto-hébergé',
    estimatedInternalCostFCFA: 3000,
    estimatedMigrationTime: '2 semaines',
    icon: 'ri-mail-send-line',
    color: '#F43F5E',
  },
  {
    id: 'DEP-008',
    name: 'YouTube Data API v3',
    category: 'media_api',
    provider: 'Google YouTube',
    currentCostMonthlyFCFA: 0,
    costPerCallFCFA: 0,
    callsPerMonth: 45000,
    criticality: 'P0-critical',
    frequency: 'continuous',
    description: 'API YouTube pour upload, analytics, gestion playlists. Quota journalier 10 000 unités. Gratuit mais indispensable pour le pipeline média.',
    usedBy: ['KOS YouTube Pipeline', 'KOS YouTube Analytics', 'KOS YouTube Publisher'],
    replaceable: false,
    replacementDifficulty: 'very_hard',
    replacementOption: 'Non remplaçable — seule API pour YouTube. Optimiser quota, réduire appels non essentiels.',
    estimatedInternalCostFCFA: 0,
    estimatedMigrationTime: 'N/A',
    icon: 'ri-youtube-line',
    color: '#FF0000',
  },
  {
    id: 'DEP-009',
    name: 'Google Analytics 4 (Analytics)',
    category: 'analytics',
    provider: 'Google',
    currentCostMonthlyFCFA: 0,
    costPerCallFCFA: 0,
    callsPerMonth: 300000,
    criticality: 'P2-medium',
    frequency: 'continuous',
    description: 'Analytics web frontend. Gratuit. Alternative: Plausible auto-hébergé (plus léger, plus respectueux vie privée).',
    usedBy: ['KOS Dashboard', 'KOS SEO Command', 'Marketing Analytics'],
    replaceable: true,
    replacementDifficulty: 'easy',
    replacementOption: 'Plausible Analytics auto-hébergé (open-source)',
    estimatedInternalCostFCFA: 5000,
    estimatedMigrationTime: '1 semaine',
    icon: 'ri-bar-chart-line',
    color: '#F6851F',
  },
  {
    id: 'DEP-010',
    name: 'GitHub (Code + CI/CD)',
    category: 'other',
    provider: 'GitHub (Microsoft)',
    currentCostMonthlyFCFA: 0,
    costPerCallFCFA: 0,
    callsPerMonth: 5000,
    criticality: 'P3-low',
    frequency: 'daily',
    description: 'Hébergement code, CI/CD Actions. Gratuit pour usage actuel. Alternative: GitLab auto-hébergé si besoin souveraineté.',
    usedBy: ['KOS DevOps', 'KOS Deployment Pipeline'],
    replaceable: true,
    replacementDifficulty: 'moderate',
    replacementOption: 'GitLab CE auto-hébergé + runners locaux',
    estimatedInternalCostFCFA: 15000,
    estimatedMigrationTime: '3 semaines',
    icon: 'ri-github-line',
    color: '#333333',
  },
  {
    id: 'DEP-011',
    name: 'LinkedIn API (Social Media)',
    category: 'media_api',
    provider: 'LinkedIn (Microsoft)',
    currentCostMonthlyFCFA: 0,
    costPerCallFCFA: 0,
    callsPerMonth: 3000,
    criticality: 'P1-high',
    frequency: 'daily',
    description: 'API LinkedIn pour publication, analytics, engagement. Gratuite mais quota limité. Non remplaçable pour la distribution sociale.',
    usedBy: ['KOS LinkedIn Bridge', 'KOS Social Media Command', 'KOS Community Manager'],
    replaceable: false,
    replacementDifficulty: 'very_hard',
    replacementOption: 'Non remplaçable — seule API LinkedIn disponible. Optimiser quota.',
    estimatedInternalCostFCFA: 0,
    estimatedMigrationTime: 'N/A',
    icon: 'ri-linkedin-line',
    color: '#0A66C2',
  },
  {
    id: 'DEP-012',
    name: 'Qdrant Cloud (Vector Database)',
    category: 'database',
    provider: 'Qdrant',
    currentCostMonthlyFCFA: 25000,
    costPerCallFCFA: 0.05,
    callsPerMonth: 500000,
    criticality: 'P2-medium',
    frequency: 'continuous',
    description: 'Base vectorielle pour RAG, embeddings, recherche sémantique. Utilisée par le Knowledge Graph et l\'Automaton.',
    usedBy: ['KOS Automaton', 'KOS Knowledge Graph', 'KOS RAG Engine'],
    replaceable: true,
    replacementDifficulty: 'moderate',
    replacementOption: 'Qdrant auto-hébergé (open-source) sur serveur dédié',
    estimatedInternalCostFCFA: 8000,
    estimatedMigrationTime: '3 semaines',
    icon: 'ri-stack-line',
    color: '#FF4D4D',
  },
];

// ─── LAYER 4 — FIVE FACTORY SYSTEMS ─────────────────────────────────────

export interface FactorySystem {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  currentStatus: 'operational' | 'partial' | 'planned';
  automationRate: number;
  externalDependencyRate: number;
  keyCapabilities: string[];
  targetAutonomy: string;
  linkedHub: string;
  linkedRoute: string;
}

export const FACTORY_SYSTEMS: FactorySystem[] = [
  {
    id: 'compliance',
    name: 'KOS Compliance Factory™',
    shortName: 'Compliance',
    icon: 'ri-shield-check-line',
    color: 'primary',
    description: 'Production automatisée de livrables conformité : matrices BCEAO/COBAC/OHADA, diagnostics réglementaires, plans de mise en conformité, rapports trimestriels.',
    currentStatus: 'operational',
    automationRate: 87,
    externalDependencyRate: 32,
    keyCapabilities: ['Matrices conformité BCEAO', 'Diagnostics COBAC', 'Rapports OHADA', 'Checklists UEMOA/CEMAC', 'Veille réglementaire auto'],
    targetAutonomy: '95% — Remplacer GPT-4o par Ollama local pour les analyses de conformité simples',
    linkedHub: 'Hub 68',
    linkedRoute: '/kos-regulatory-compliance-engine',
  },
  {
    id: 'audit',
    name: 'KOS Audit Factory™',
    shortName: 'Audit',
    icon: 'ri-find-replace-line',
    color: 'accent',
    description: 'Production automatisée de livrables d\'audit : programmes d\'audit, tests de contrôle, cartographie des risques, rapports d\'audit interne, due diligences.',
    currentStatus: 'operational',
    automationRate: 82,
    externalDependencyRate: 45,
    keyCapabilities: ['Programmes d\'audit auto', 'Tests de contrôle', 'Cartographie risques', 'Due diligence', 'Rapports ISA'],
    targetAutonomy: '90% — Remplacer Claude par Qwen 2.5 local pour le raisonnement analytique',
    linkedHub: 'Hub 23',
    linkedRoute: '/kos-quality-risk-management',
  },
  {
    id: 'media',
    name: 'KOS Media Factory™',
    shortName: 'Média',
    icon: 'ri-film-line',
    color: 'secondary',
    description: 'Production automatisée de contenu média : vidéos YouTube, podcasts, articles SEO, posts LinkedIn, newsletters. Pipeline 8 étapes.',
    currentStatus: 'operational',
    automationRate: 91,
    externalDependencyRate: 38,
    keyCapabilities: ['Pipeline vidéo 8 étapes', 'Voix KHEPRA™', 'Thumbnails', 'Articles SEO', 'LinkedIn auto-publish'],
    targetAutonomy: '85% — Coqui TTS + Ollama local pour scripts, thumbs via Stable Diffusion locale',
    linkedHub: 'Hub 80',
    linkedRoute: '/kos-youtube-download',
  },
  {
    id: 'knowledge',
    name: 'KOS Knowledge Factory™',
    shortName: 'Knowledge',
    icon: 'ri-book-open-line',
    color: 'primary',
    description: 'Capitalisation documentaire automatique : base réglementaire BCEAO/COBAC/OHADA, modèles réutilisables, prompts validés, bibliothèque de composants.',
    currentStatus: 'operational',
    automationRate: 94,
    externalDependencyRate: 18,
    keyCapabilities: ['Knowledge Repository', 'Prompt Library', 'Dictionaries métier', 'Modèles réutilisables', 'Embeddings auto'],
    targetAutonomy: '98% — Qdrant local + Ollama embeddings, 0 dépendance API externe',
    linkedHub: 'Hub 89',
    linkedRoute: '/kos-self-evolution',
  },
  {
    id: 'executive',
    name: 'KOS Executive Factory™',
    shortName: 'Executive',
    icon: 'ri-dashboard-line',
    color: 'accent',
    description: 'Production automatisée de reporting exécutif : dashboards, KPIs, synthèses stratégiques, rapports COMEX, projections.',
    currentStatus: 'operational',
    automationRate: 89,
    externalDependencyRate: 28,
    keyCapabilities: ['Dashboards exécutifs', 'KPIs automatiques', 'Synthèses COMEX', 'Projections', 'Alertes stratégiques'],
    targetAutonomy: '92% — PostgreSQL local + Metabase auto-hébergé pour les dashboards',
    linkedHub: 'Hub 55',
    linkedRoute: '/kos-executive-command',
  },
];

// ─── SUBSTITUTION MATRIX ────────────────────────────────────────────────

export interface SubstitutionProposal {
  id: string;
  dependencyId: string;
  openSourceAlternative: string;
  localStack: string;
  feasibilityScore: number; // /100
  timeToImplement: string;
  costReduction: number; // FCFA/month
  qualityImpact: number; // +/- points
  risks: string[];
  benefits: string[];
  prerequisites: string[];
  recommendedPhase: 1 | 2 | 3 | 4;
  status: 'proposed' | 'approved' | 'in_progress' | 'completed' | 'blocked';
}

export const SUBSTITUTION_PROPOSALS: SubstitutionProposal[] = [
  {
    id: 'SUB-001',
    dependencyId: 'DEP-001',
    openSourceAlternative: 'Ollama + Llama 3.1 70B Instruct',
    localStack: 'Ollama (serveur inférence) + vLLM (batch processing) + GPU NVIDIA A100 (40GB)',
    feasibilityScore: 72,
    timeToImplement: '8 semaines',
    costReduction: 235000,
    qualityImpact: -8,
    risks: ['Qualité inférieure sur le français institutionnel', 'Nécessite GPU A100 (investissement initial)', 'Maintenance infra requise', 'Latence possiblement plus élevée'],
    benefits: ['Zéro coût par token après setup', 'Données ne quittent jamais l\'infra KHEPRA', 'Fine-tuning possible sur corpus réglementaire', 'Pas de rate limiting externe'],
    prerequisites: ['Acquisition serveur GPU (A100 ou RTX 6000 Ada)', 'Installation Ollama + vLLM', 'Fine-tuning sur 10K articles BCEAO/COBAC/OHADA', 'Tests qualité A/B vs GPT-4o'],
    recommendedPhase: 2,
    status: 'proposed',
  },
  {
    id: 'SUB-002',
    dependencyId: 'DEP-002',
    openSourceAlternative: 'Ollama + Qwen 2.5 72B Instruct',
    localStack: 'Ollama + GPU dédié pour inférence',
    feasibilityScore: 65,
    timeToImplement: '10 semaines',
    costReduction: 120000,
    qualityImpact: -12,
    risks: ['Raisonnement multi-étapes moins performant que Claude', 'Nécessite fine-tuning intensif', 'Consommation mémoire élevée'],
    benefits: ['Indépendance totale Anthropic', 'Coût zéro après setup', 'Modèle fine-tunable sur données KHEPRA'],
    prerequisites: ['GPU additionnel ou temps partagé', 'Corpus d\'entraînement 5K analyses stratégiques', 'Validation qualité Big Four'],
    recommendedPhase: 3,
    status: 'proposed',
  },
  {
    id: 'SUB-003',
    dependencyId: 'DEP-003',
    openSourceAlternative: 'PostgreSQL 16 + MinIO + Auth.js',
    localStack: 'PostgreSQL (données structurées) + MinIO (stockage objets S3-compatible) + Auth.js (authentification)',
    feasibilityScore: 58,
    timeToImplement: '16 semaines',
    costReduction: 40000,
    qualityImpact: -5,
    risks: ['Projet de migration colossal — toute l\'app repose sur Supabase', 'Perte des Edge Functions Supabase', 'RLS à reconfigurer', 'Real-time websockets à remplacer', 'Risque de downtime'],
    benefits: ['Souveraineté totale des données', 'Pas de limites de stockage', 'Pas de coûts variables', 'Conformité données renforcée (données en Afrique)'],
    prerequisites: ['Serveur dédié 32GB RAM + SSD NVMe', 'Plan de migration détaillé', 'Double-run Supabase + PostgreSQL pendant transition', 'Tests exhaustifs'],
    recommendedPhase: 4,
    status: 'proposed',
  },
  {
    id: 'SUB-004',
    dependencyId: 'DEP-004',
    openSourceAlternative: 'Coqui TTS XTTS-v2 + Piper TTS',
    localStack: 'Coqui TTS (synthèse vocale qualité) + Piper TTS (léger, notifications)',
    feasibilityScore: 85,
    timeToImplement: '4 semaines',
    costReduction: 33000,
    qualityImpact: -6,
    risks: ['Qualité encore en dessous d\'ElevenLabs', 'Fine-tuning KHEPRA en cours (150h)', 'Latence sans GPU'],
    benefits: ['Zéro coût API vocal', 'Contrôle total des voix KHEPRA', 'Fine-tuning continu sur corpus maison', 'Déjà en évaluation active'],
    prerequisites: ['GPU pour Coqui fine-tuning', 'Compléter corpus 150h voix KHEPRA', 'Validation Audio QA Engine'],
    recommendedPhase: 1,
    status: 'in_progress',
  },
  {
    id: 'SUB-005',
    dependencyId: 'DEP-005',
    openSourceAlternative: 'Ollama + Llama 3.2 Vision 11B',
    localStack: 'Ollama vision model pour analyse images',
    feasibilityScore: 60,
    timeToImplement: '6 semaines',
    costReduction: 27000,
    qualityImpact: -15,
    risks: ['Vision multimodale encore émergente en open-source', 'Qualité analyse images inférieure', 'Nécessite GPU performant'],
    benefits: ['Suppression totale appel Gemini API', 'Analyse locale des thumbnails', 'Pas de quota Google'],
    prerequisites: ['GPU compatible vision models', 'Tests comparatifs vs Gemini'],
    recommendedPhase: 3,
    status: 'proposed',
  },
  {
    id: 'SUB-006',
    dependencyId: 'DEP-006',
    openSourceAlternative: 'n8n auto-hébergé',
    localStack: 'n8n (Docker) sur serveur KHEPRA',
    feasibilityScore: 95,
    timeToImplement: '2 semaines',
    costReduction: 35000,
    qualityImpact: 0,
    risks: ['Migration workflows Make → n8n', 'Quelques différences de nodes'],
    benefits: ['Déjà maîtrisé en interne', 'Zéro coût d\'abonnement', 'Workflows illimités', 'Intégration native avec le reste de KOS'],
    prerequisites: ['Audit workflows Make existants', 'Migration un par un'],
    recommendedPhase: 1,
    status: 'in_progress',
  },
  {
    id: 'SUB-007',
    dependencyId: 'DEP-007',
    openSourceAlternative: 'Postfix + SMTP local',
    localStack: 'Postfix (MTA) + Dovecot + SPF/DKIM/DMARC configurés',
    feasibilityScore: 88,
    timeToImplement: '2 semaines',
    costReduction: 12000,
    qualityImpact: -3,
    risks: ['Délivrabilité emails potentiellement réduite', 'Configuration SPF/DKIM/DMARC nécessaire', 'Monitoring bounce à mettre en place'],
    benefits: ['Zéro coût par email envoyé', 'Volume illimité', 'Données emails restent sur infra KHEPRA'],
    prerequisites: ['Configuration DNS (SPF, DKIM, DMARC)', 'IP dédiée recommandée pour réputation'],
    recommendedPhase: 1,
    status: 'proposed',
  },
  {
    id: 'SUB-009',
    dependencyId: 'DEP-009',
    openSourceAlternative: 'Plausible Analytics auto-hébergé',
    localStack: 'Plausible (Docker) + ClickHouse',
    feasibilityScore: 92,
    timeToImplement: '1 semaine',
    costReduction: 5000,
    qualityImpact: 0,
    risks: ['Migration données historiques GA4 → Plausible', 'Dashboards à reconnecter'],
    benefits: ['Plus léger que GA4 (moins de 1KB script)', 'Respectueux vie privée — pas de cookies', 'Données sur infra KHEPRA', 'API simple'],
    prerequisites: ['Serveur ou VM pour Plausible', 'Migration tracking code'],
    recommendedPhase: 1,
    status: 'proposed',
  },
  {
    id: 'SUB-010',
    dependencyId: 'DEP-010',
    openSourceAlternative: 'GitLab CE auto-hébergé',
    localStack: 'GitLab CE (Docker) + GitLab Runners locaux',
    feasibilityScore: 78,
    timeToImplement: '3 semaines',
    costReduction: 15000,
    qualityImpact: 0,
    risks: ['Moins intégré que GitHub (Marketplace Actions)', 'Runners à maintenir'],
    benefits: ['Souveraineté code source', 'CI/CD illimité sans limites de minutes', 'Registre container intégré'],
    prerequisites: ['Serveur 16GB RAM pour GitLab', 'Migration repositories + CI/CD'],
    recommendedPhase: 4,
    status: 'proposed',
  },
  {
    id: 'SUB-012',
    dependencyId: 'DEP-012',
    openSourceAlternative: 'Qdrant auto-hébergé (open-source)',
    localStack: 'Qdrant (Docker) sur serveur KHEPRA',
    feasibilityScore: 90,
    timeToImplement: '3 semaines',
    costReduction: 17000,
    qualityImpact: 0,
    risks: ['Migration des collections et embeddings existants', 'Performance selon hardware'],
    benefits: ['Zéro coût cloud vectoriel', 'Pas de limite de stockage vectoriel', 'Latence réduite (local network)'],
    prerequisites: ['Serveur avec SSD rapide', 'Migration collections Qdrant Cloud → local'],
    recommendedPhase: 1,
    status: 'proposed',
  },
];

// ─── MIGRATION PLAN — 4 PHASES ──────────────────────────────────────────

export interface MigrationPhase {
  id: string;
  phaseNumber: 1 | 2 | 3 | 4;
  name: string;
  icon: string;
  color: string;
  description: string;
  goal: string;
  dependencies: string[];
  tasks: MigrationTask[];
  estimatedDuration: string;
  progress: number; // %
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface MigrationTask {
  id: string;
  dependencyId: string;
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignedTo: string;
  effortHours: number;
  risks: string;
}

export const MIGRATION_PHASES: MigrationPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    name: 'Phase 1 — Quick Wins (Faible Risque, Fort Impact)',
    icon: 'ri-speed-up-line',
    color: 'primary',
    description: 'Migration des dépendances faciles et à fort ROI : Make → n8n, Resend → SMTP local, GA4 → Plausible, Qdrant Cloud → local, ElevenLabs → Coqui TTS.',
    goal: 'Réduire les coûts mensuels de 112 000 FCFA (-20% du total). Score autonomie : +15 points.',
    dependencies: ['DEP-004', 'DEP-006', 'DEP-007', 'DEP-009', 'DEP-012'],
    tasks: [
      { id: 'TASK-001', dependencyId: 'DEP-006', step: 'Auditer tous les workflows Make existants', status: 'completed', assignedTo: 'KOS DevOps', effortHours: 4, risks: 'Perte de certains nodes spécifiques Make' },
      { id: 'TASK-002', dependencyId: 'DEP-006', step: 'Migrer workflows Make vers n8n un par un', status: 'in_progress', assignedTo: 'KOS DevOps', effortHours: 16, risks: 'Incompatibilités nodes' },
      { id: 'TASK-003', dependencyId: 'DEP-006', step: 'Désactiver abonnement Make après validation', status: 'pending', assignedTo: 'KOS Finance', effortHours: 1, risks: 'Aucun — réversible' },
      { id: 'TASK-004', dependencyId: 'DEP-007', step: 'Installer Postfix + configurer SPF/DKIM/DMARC', status: 'pending', assignedTo: 'KOS Infrastructure', effortHours: 8, risks: 'Réputation IP — prévoir warm-up' },
      { id: 'TASK-005', dependencyId: 'DEP-007', step: 'Migrer templates email vers SMTP local', status: 'pending', assignedTo: 'KOS Email Engine', effortHours: 6, risks: 'Délivrabilité — monitoring nécessaire' },
      { id: 'TASK-006', dependencyId: 'DEP-009', step: 'Installer Plausible Analytics (Docker)', status: 'pending', assignedTo: 'KOS DevOps', effortHours: 3, risks: 'Aucun — simple déploiement Docker' },
      { id: 'TASK-007', dependencyId: 'DEP-009', step: 'Remplacer tracking code GA4 par Plausible', status: 'pending', assignedTo: 'KOS Frontend', effortHours: 2, risks: 'Perte historique GA4' },
      { id: 'TASK-008', dependencyId: 'DEP-012', step: 'Déployer Qdrant local (Docker)', status: 'pending', assignedTo: 'KOS DevOps', effortHours: 6, risks: 'Performance disque critique' },
      { id: 'TASK-009', dependencyId: 'DEP-012', step: 'Migrer collections embeddings Cloud → local', status: 'pending', assignedTo: 'KOS Knowledge Graph', effortHours: 12, risks: 'Perte de données si échec — faire backup' },
      { id: 'TASK-010', dependencyId: 'DEP-004', step: 'Finaliser fine-tuning Coqui TTS (150h)', status: 'in_progress', assignedTo: 'KOS Voice Factory', effortHours: 40, risks: 'Qualité insuffisante — fallback ElevenLabs' },
      { id: 'TASK-011', dependencyId: 'DEP-004', step: 'Activer routage hybride Coqui/ElevenLabs', status: 'pending', assignedTo: 'KOS Voice Engine', effortHours: 8, risks: 'Routage incorrect = perte qualité' },
    ],
    estimatedDuration: '4 semaines',
    progress: 28,
    status: 'in_progress',
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    name: 'Phase 2 — LLM Secondaires (Modèles Light)',
    icon: 'ri-brain-line',
    color: 'accent',
    description: 'Migration des modèles LLM secondaires vers Ollama local. GPT-4o-mini → Llama 3.1 8B local, analyses simples.',
    goal: 'Réduire coûts LLM de 35%. Score autonomie : +25 points.',
    dependencies: ['DEP-001 (partiel)', 'DEP-003', 'DEP-005'],
    tasks: [
      { id: 'TASK-012', dependencyId: 'DEP-001', step: 'Installer Ollama + Llama 3.1 8B pour tâches simples', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 12, risks: 'GPU requis ou inférence CPU lente' },
      { id: 'TASK-013', dependencyId: 'DEP-001', step: 'Classifier les appels GPT-4o : simples vs complexes', status: 'pending', assignedTo: 'KOS Analytics', effortHours: 8, risks: 'Mauvaise classification = perte qualité' },
      { id: 'TASK-014', dependencyId: 'DEP-001', step: 'Activer routage intelligent GPT-4o ↔ Llama local', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 16, risks: 'Complexité du routeur' },
      { id: 'TASK-015', dependencyId: 'DEP-005', step: 'Installer Llama 3.2 Vision 11B pour analyse images', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 8, risks: 'Performance vision models open-source' },
      { id: 'TASK-016', dependencyId: 'DEP-005', step: 'Comparer qualité vs Gemini — décision Go/No-Go', status: 'pending', assignedTo: 'KOS Quality Engine', effortHours: 12, risks: 'Qualité insuffisante — maintenir Gemini' },
      { id: 'TASK-017', dependencyId: 'DEP-001', step: 'Fine-tune Llama sur 10K articles BCEAO/COBAC', status: 'pending', assignedTo: 'KOS Knowledge Factory', effortHours: 80, risks: 'Overfitting si corpus trop étroit' },
    ],
    estimatedDuration: '8 semaines',
    progress: 0,
    status: 'not_started',
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    name: 'Phase 3 — LLM Lourds & Raisonnement (Modèles Larges)',
    icon: 'ri-cpu-line',
    color: 'secondary',
    description: 'Migration des modèles LLM lourds : GPT-4o → Llama 3.1 70B, Claude → Qwen 2.5 72B. Fine-tuning intensif sur corpus KHEPRA.',
    goal: 'Réduire coûts LLM de 80%. Score autonomie : +35 points.',
    dependencies: ['DEP-001 (complet)', 'DEP-002'],
    tasks: [
      { id: 'TASK-018', dependencyId: 'DEP-001', step: 'Installer GPU A100 (ou RTX 6000 Ada) pour inférence 70B', status: 'pending', assignedTo: 'KOS Infrastructure', effortHours: 24, risks: 'Investissement matériel significatif' },
      { id: 'TASK-019', dependencyId: 'DEP-001', step: 'Installer vLLM pour inférence batch haute performance', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 16, risks: 'Configuration complexe' },
      { id: 'TASK-020', dependencyId: 'DEP-001', step: 'Déployer Llama 3.1 70B fine-tuned KHEPRA', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 24, risks: 'Mémoire GPU insuffisante — nécessite quantisation' },
      { id: 'TASK-021', dependencyId: 'DEP-001', step: 'A/B test qualité vs GPT-4o sur 500 requêtes', status: 'pending', assignedTo: 'KOS Quality Engine', effortHours: 20, risks: 'Qualité inférieure → ajuster fine-tuning' },
      { id: 'TASK-022', dependencyId: 'DEP-002', step: 'Installer Qwen 2.5 72B pour raisonnement complexe', status: 'pending', assignedTo: 'KOS AI Engine', effortHours: 16, risks: 'Qwen moins performant en français que Claude' },
      { id: 'TASK-023', dependencyId: 'DEP-002', step: 'Fine-tune Qwen sur 5K analyses stratégiques KHEPRA', status: 'pending', assignedTo: 'KOS Knowledge Factory', effortHours: 60, risks: 'Qualité vs Claude — benchmark rigoureux' },
      { id: 'TASK-024', dependencyId: 'DEP-002', step: 'Décision Go/No-Go : couper Claude définitivement ?', status: 'pending', assignedTo: 'COMEX KHEPRA', effortHours: 4, risks: 'Décision stratégique irréversible' },
    ],
    estimatedDuration: '10 semaines',
    progress: 0,
    status: 'not_started',
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    name: 'Phase 4 — Infrastructure Core (Base de Données + Code)',
    icon: 'ri-server-line',
    color: 'primary',
    description: 'Migration de l\'infrastructure critique : Supabase → PostgreSQL local, GitHub → GitLab CE. La phase la plus complexe et risquée.',
    goal: 'Atteindre 92% d\'autonomie. Score autonomie : 92/100.',
    dependencies: ['DEP-003', 'DEP-010'],
    tasks: [
      { id: 'TASK-025', dependencyId: 'DEP-003', step: 'Déployer PostgreSQL 16 sur serveur dédié KHEPRA', status: 'pending', assignedTo: 'KOS Infrastructure', effortHours: 16, risks: 'Configuration sécurité, backups, monitoring' },
      { id: 'TASK-026', dependencyId: 'DEP-003', step: 'Migrer schéma + données Supabase → PostgreSQL local', status: 'pending', assignedTo: 'KOS Data Engineering', effortHours: 40, risks: 'Perte de données — backup + double-run' },
      { id: 'TASK-027', dependencyId: 'DEP-003', step: 'Réimplémenter RLS policies sur PostgreSQL local', status: 'pending', assignedTo: 'KOS Security', effortHours: 24, risks: 'Faille sécurité si policies incorrectes' },
      { id: 'TASK-028', dependencyId: 'DEP-003', step: 'Remplacer Supabase Auth par Auth.js local', status: 'pending', assignedTo: 'KOS Auth Engine', effortHours: 32, risks: 'Migration utilisateurs — tokens à réémettre' },
      { id: 'TASK-029', dependencyId: 'DEP-003', step: 'Déployer MinIO pour remplacer Supabase Storage', status: 'pending', assignedTo: 'KOS Infrastructure', effortHours: 12, risks: 'API S3 compatible — adapter le code frontend' },
      { id: 'TASK-030', dependencyId: 'DEP-003', step: 'Remplacer Edge Functions par des workers n8n locaux', status: 'pending', assignedTo: 'KOS Runtime Engine', effortHours: 80, risks: '60+ Edge Functions à migrer — chantier colossal' },
      { id: 'TASK-031', dependencyId: 'DEP-010', step: 'Déployer GitLab CE + runners CI/CD locaux', status: 'pending', assignedTo: 'KOS DevOps', effortHours: 16, risks: 'Moins intégré que GitHub Actions' },
      { id: 'TASK-032', dependencyId: 'DEP-003', step: 'Double-run Supabase + PostgreSQL — validation 2 semaines', status: 'pending', assignedTo: 'KOS Quality Assurance', effortHours: 80, risks: 'Période de validation intensive avant bascule' },
      { id: 'TASK-033', dependencyId: 'DEP-003', step: 'Bascule définitive — arrêt Supabase Cloud', status: 'pending', assignedTo: 'COMEX KHEPRA', effortHours: 4, risks: 'Point de non-retour — validation COMEX obligatoire' },
    ],
    estimatedDuration: '16 semaines',
    progress: 0,
    status: 'not_started',
  },
];

// ─── TARGET ARCHITECTURE — 4 LAYERS ─────────────────────────────────────

export interface ArchitectureLayer {
  id: string;
  name: string;
  objective: string;
  currentStack: string[];
  targetStack: string[];
  icon: string;
  color: string;
  autonomyNow: number; // %
  autonomyTarget: number; // %
  keyComponents: { name: string; status: 'active' | 'migrating' | 'planned'; description: string }[];
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'orchestration',
    name: 'COUCHE 1 — Orchestration',
    objective: 'Remplacer SaaS par infrastructure contrôlée.',
    currentStack: ['Make (automatisation SaaS)', 'Supabase Edge Functions (serverless)', 'GitHub Actions (CI/CD)'],
    targetStack: ['n8n auto-hébergé (orchestrateur central)', 'Workers internes (Docker)', 'File system local', 'Event-driven workflows', 'GitLab CI/CD local'],
    icon: 'ri-git-branch-line',
    color: 'primary',
    autonomyNow: 55,
    autonomyTarget: 95,
    keyComponents: [
      { name: 'n8n Auto-hébergé', status: 'active', description: 'Orchestrateur central — déjà en place pour 60% des workflows' },
      { name: 'Workers Docker', status: 'migrating', description: 'Remplacement progressif des Edge Functions Supabase' },
      { name: 'Event Bus local', status: 'planned', description: 'Redis/NATS pour communication inter-workflows' },
    ],
  },
  {
    id: 'data',
    name: 'COUCHE 2 — Données',
    objective: 'Remplacer Supabase et services cloud.',
    currentStack: ['Supabase (PostgreSQL cloud)', 'Supabase Storage (S3 cloud)', 'Qdrant Cloud (vector DB)'],
    targetStack: ['PostgreSQL 16 auto-hébergé', 'MinIO (stockage S3-compatible)', 'Qdrant local (vector DB)', 'PGVector (alternative vecteurs)'],
    icon: 'ri-database-2-line',
    color: 'accent',
    autonomyNow: 30,
    autonomyTarget: 92,
    keyComponents: [
      { name: 'PostgreSQL 16 Local', status: 'planned', description: 'Base principale — remplace Supabase PostgreSQL' },
      { name: 'MinIO', status: 'planned', description: 'Stockage objets — API compatible S3' },
      { name: 'Qdrant Local', status: 'planned', description: 'Base vectorielle pour RAG/embeddings' },
    ],
  },
  {
    id: 'ai',
    name: 'COUCHE 3 — Intelligence Artificielle Locale',
    objective: 'Réduire dépendance aux API LLM externes.',
    currentStack: ['OpenAI GPT-4o (API)', 'Anthropic Claude (API)', 'Google Gemini (API)', 'ElevenLabs (API)'],
    targetStack: ['Ollama (exécution locale)', 'vLLM (serveur inférence)', 'Llama 3.1 70B (général)', 'Qwen 2.5 72B (raisonnement)', 'Coqui TTS (voix)'],
    icon: 'ri-brain-line',
    color: 'secondary',
    autonomyNow: 15,
    autonomyTarget: 80,
    keyComponents: [
      { name: 'Ollama Server', status: 'migrating', description: 'Serveur inférence LLM local — modèles 8B déjà testés' },
      { name: 'vLLM Engine', status: 'planned', description: 'Inférence batch haute performance pour modèles 70B+' },
      { name: 'Coqui TTS', status: 'migrating', description: 'Synthèse vocale locale — remplace ElevenLabs' },
      { name: 'GPU A100', status: 'planned', description: 'Infrastructure GPU pour modèles larges' },
    ],
  },
  {
    id: 'business',
    name: 'COUCHE 4 — Automatisation Métier (5 Factories)',
    objective: 'Production automatisée Big Four sur infrastructure propriétaire.',
    currentStack: ['Workflows hybrides (API + local)', 'Templates LaTeX/PDF', 'Dashboards Supabase'],
    targetStack: ['Compliance Factory', 'Audit Factory', 'Media Factory', 'Knowledge Factory', 'Executive Factory'],
    icon: 'ri-building-2-line',
    color: 'primary',
    autonomyNow: 85,
    autonomyTarget: 98,
    keyComponents: [
      { name: 'Compliance Factory', status: 'active', description: 'Matrices BCEAO/COBAC/OHADA — 87% automatisé' },
      { name: 'Audit Factory', status: 'active', description: 'Programmes d\'audit, due diligences — 82% automatisé' },
      { name: 'Media Factory', status: 'active', description: 'YouTube, podcasts, SEO — 91% automatisé' },
      { name: 'Knowledge Factory', status: 'active', description: 'Base réglementaire, bibliothèque — 94% automatisé' },
      { name: 'Executive Factory', status: 'active', description: 'Dashboards, KPIs, COMEX — 89% automatisé' },
    ],
  },
];

// ─── AUTONOMY KPIs ───────────────────────────────────────────────────────

export interface AutonomyKPI {
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
  layer: string;
}

export const AUTONOMY_KPIS: AutonomyKPI[] = [
  {
    id: 'api-dependency',
    name: 'Dépendance API Externe',
    icon: 'ri-cloud-off-line',
    color: 'primary',
    current: 42,
    previous: 58,
    target: 10,
    unit: '%',
    trend: 'down',
    history: [
      { month: 'Jan', value: 75 }, { month: 'Fév', value: 72 }, { month: 'Mar', value: 68 },
      { month: 'Avr', value: 63 }, { month: 'Mai', value: 58 }, { month: 'Juin', value: 42 },
    ],
    layer: 'Global',
  },
  {
    id: 'cost-monthly',
    name: 'Coût Mensuel Total API',
    icon: 'ri-money-dollar-circle-line',
    color: 'accent',
    current: 745000,
    previous: 980000,
    target: 250000,
    unit: 'FCFA',
    trend: 'down',
    history: [
      { month: 'Jan', value: 1200000 }, { month: 'Fév', value: 1150000 }, { month: 'Mar', value: 1050000 },
      { month: 'Avr', value: 980000 }, { month: 'Mai', value: 980000 }, { month: 'Juin', value: 745000 },
    ],
    layer: 'Global',
  },
  {
    id: 'internal-automation',
    name: 'Taux Automatisation Interne',
    icon: 'ri-robot-2-line',
    color: 'secondary',
    current: 78,
    previous: 65,
    target: 95,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 52 }, { month: 'Mar', value: 58 },
      { month: 'Avr', value: 63 }, { month: 'Mai', value: 65 }, { month: 'Juin', value: 78 },
    ],
    layer: 'Orchestration',
  },
  {
    id: 'workflow-reuse',
    name: 'Taux Réutilisation Workflows',
    icon: 'ri-repeat-line',
    color: 'primary',
    current: 74.6,
    previous: 68.2,
    target: 90,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 52 }, { month: 'Mar', value: 58 },
      { month: 'Avr', value: 63 }, { month: 'Mai', value: 68 }, { month: 'Juin', value: 74.6 },
    ],
    layer: 'Orchestration',
  },
  {
    id: 'agents-removed',
    name: 'Agents Supprimés / Consolidés',
    icon: 'ri-user-unfollow-line',
    color: 'accent',
    current: 12,
    previous: 7,
    target: 25,
    unit: 'agents',
    trend: 'up',
    history: [
      { month: 'Jan', value: 0 }, { month: 'Fév', value: 2 }, { month: 'Mar', value: 4 },
      { month: 'Avr', value: 5 }, { month: 'Mai', value: 7 }, { month: 'Juin', value: 12 },
    ],
    layer: 'Global',
  },
  {
    id: 'llm-local',
    name: 'Appels LLM en Local',
    icon: 'ri-cpu-line',
    color: 'secondary',
    current: 23,
    previous: 8,
    target: 80,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 2 },
      { month: 'Avr', value: 5 }, { month: 'Mai', value: 8 }, { month: 'Juin', value: 23 },
    ],
    layer: 'IA',
  },
  {
    id: 'autonomy-score',
    name: 'Score d\'Autonomie Global',
    icon: 'ri-medal-line',
    color: 'primary',
    current: 58,
    previous: 42,
    target: 92,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 22 }, { month: 'Fév', value: 28 }, { month: 'Mar', value: 34 },
      { month: 'Avr', value: 40 }, { month: 'Mai', value: 42 }, { month: 'Juin', value: 58 },
    ],
    layer: 'Global',
  },
];

// ─── AUTONOMY MATURITY MODEL ───────────────────────────────────────────

export interface AutonomyAssessment {
  dimension: string;
  icon: string;
  score: number; // /100
  weight: number;
  assessment: string;
  recommendations: string[];
}

export const AUTONOMY_ASSESSMENT: AutonomyAssessment[] = [
  {
    dimension: 'Autonomie Technique',
    icon: 'ri-tools-line',
    score: 52,
    weight: 40,
    assessment: '52/100 — 42% des appels sont encore externes. La couche IA est la plus dépendante (85% externe). Les couches Orchestration et Métier sont les plus avancées.',
    recommendations: [
      'Accélérer le déploiement Ollama/vLLM pour la couche IA',
      'Finaliser migration Make → n8n (2 semaines restantes)',
      'Déployer Qdrant local pour réduire dépendance vectorielle',
    ],
  },
  {
    dimension: 'Autonomie Économique',
    icon: 'ri-bank-line',
    score: 38,
    weight: 35,
    assessment: '38/100 — 745 000 FCFA/mois de coûts API. Objectif 250 000 FCFA (-66%). Le ROI de l\'infrastructure locale est atteint en 8-14 mois selon les phases.',
    recommendations: [
      'Prioriser Phase 1 (Quick Wins) : ROI immédiat, -112K FCFA/mois',
      'Investir dans GPU A100 : ROI en 12 mois vs économies LLM',
      'Négocier arrêt progressif des API (réduction volume, pas coupure brutale)',
    ],
  },
  {
    dimension: 'Autonomie Opérationnelle',
    icon: 'ri-settings-3-line',
    score: 72,
    weight: 25,
    assessment: '72/100 — Les 5 Factories sont opérationnelles avec 82-94% d\'automatisation. La gouvernance, documentation et traçabilité sont solides. La dépendance résiduelle est surtout technique (APIs), pas organisationnelle.',
    recommendations: [
      'Maintenir le rythme de consolidation des agents (12 supprimés, cible 25)',
      'Documenter chaque migration pour capitalisation RETEX',
      'Former l\'équipe à l\'infra auto-hébergée (PostgreSQL, Docker, GPU)',
    ],
  },
];

// ─── GLOBAL STATS ────────────────────────────────────────────────────────

export const AUTONOMOUS_STACK_STATS = {
  programVersion: 'KOS Autonomous Stack v1.0 — Désintermédiation API',
  launched: '2026-06-23',
  totalDependencies: 12,
  replaceableDependencies: 10,
  nonReplaceableDependencies: 2,
  totalMonthlyCost: 745000,
  targetMonthlyCost: 250000,
  costReductionProgress: 38, // %
  totalMigrationPhases: 4,
  activeFactories: 5,
  totalArchitectureLayers: 4,
  globalAutonomyScore: 58,
  targetAutonomyScore: 92,
  agentsRemoved: 12,
  targetAgentsRemoved: 25,
  quickWinsIdentified: 5,
  quickWinsInProgress: 2,
  quickWinsCompleted: 1,
  hardMigrations: 3,
  governanceStatus: 'Actif — Toute dépendance externe est considérée comme temporaire et remplaçable. Toute capacité stable doit être internalisée dès que techniquement viable.',
  visionStatement: 'Transformer KOS en KOS Autonomous Operating System™ : 80-95% autonome, hautement mutualisé, économiquement stable, scalable sans dépendance SaaS critique.',
};