// KOS AUTO-KNOWLEDGE DEVELOPMENT — 3 SYSTEMS
// Objectif : 2 847 → 10 000 nœuds en 90j, 100% qualité Big Four, 0 humain

export interface RegtrooperFlowStep {
  step: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
}

export interface RegtrooperRegulator {
  name: string;
  code: string;
  docsPerMonth: number;
  category: string;
}

export interface RegtrooperSystem {
  id: 'regtrooper';
  name: string;
  subtitle: string;
  principle: string;
  badge: string;
  flowSteps: RegtrooperFlowStep[];
  regulators: RegtrooperRegulator[];
  kpis: { label: string; value: string; icon: string }[];
  comparison: { dimension: string; bigFour: string; kos: string; icon: string }[];
  totalAssetsPerMonth: number;
  totalRegulators: number;
}

export interface ClientBrainAtom {
  type: string;
  description: string;
  route: string;
  icon: string;
  color: string;
}

export interface ClientBrainFlowStep {
  step: number;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface ClientBrainSystem {
  id: 'client-brain';
  name: string;
  subtitle: string;
  principle: string;
  badge: string;
  flowSteps: ClientBrainFlowStep[];
  atoms: ClientBrainAtom[];
  kpis: { label: string; value: string; icon: string }[];
  comparison: { dimension: string; bigFour: string; kos: string; icon: string }[];
  missionsPerMonth: number;
  assetsPerMission: number;
}

export interface PredictiveGapStep {
  step: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
}

export interface PredictiveGapEntity {
  name: string;
  domain: string;
  priority: 'P0' | 'P1' | 'P2';
  gapDescription: string;
  trigger: string;
  status: 'detected' | 'briefed' | 'drafting' | 'validated' | 'published';
}

export interface PredictiveGapSystem {
  id: 'predictive-gap';
  name: string;
  subtitle: string;
  principle: string;
  badge: string;
  flowSteps: PredictiveGapStep[];
  orphanEntities: PredictiveGapEntity[];
  kpis: { label: string; value: string; icon: string }[];
  coverageStart: number;
  coverageTarget: number;
  daysToTarget: number;
}

export interface AutoKnowledgeStats {
  currentNodes: number;
  targetNodes: number;
  daysRemaining: number;
  systems: number;
  regulatorsTotal: number;
  assetsPerMonth: number;
}

export const autoKnowledgeStats: AutoKnowledgeStats = {
  currentNodes: 2847,
  targetNodes: 10000,
  daysRemaining: 90,
  systems: 3,
  regulatorsTotal: 20,
  assetsPerMonth: 300,
};

// ═══════════════════════════════════════════
// SYSTÈME A — KOS AUTO-INGESTION "REGTROOPER"
// ═══════════════════════════════════════════

export const regtrooperFlowSteps: RegtrooperFlowStep[] = [
  {
    step: 1,
    name: 'SCAN RÉGLEMENTAIRE',
    description: 'Cron N°17 kos-regulatory-monitor scanne 20 autorités — BCEAO, COBAC, OHADA, CIMA, GAFI, GIABA, AMF-UEMOA, BEAC, COSUMAF, etc. Détection de tout nouveau PDF publié.',
    icon: 'ri-radar-line',
    color: '#0D7B5F',
    duration: 'Toutes les heures',
  },
  {
    step: 2,
    name: 'INGESTION & OCR',
    description: 'Si nouveau PDF détecté → kos-data-ingestion BS-L1 → OCR → chunk automatique → embedding vectoriel Qdrant. Le document est immédiatement disponible dans le Knowledge Graph.',
    icon: 'ri-database-2-line',
    color: '#C2410C',
    duration: '< 3 minutes',
  },
  {
    step: 3,
    name: 'GÉNÉRATION 3 ASSETS',
    description: 'Trigger kos-blog-writing-automate : 1) Note KBR 1-page → kos-knowledge-center, 2) Article SEO/GEO → kos-digital-media-factory, 3) Flash Alert LinkedIn → kos-social-media-automaton.',
    icon: 'ri-file-copy-2-line',
    color: '#4F46E5',
    duration: '< 4 minutes',
  },
  {
    step: 4,
    name: '7 GATES QUALITÉ',
    description: 'kos-content-publication-gate bloque si score < 100/100. Les 7 checks : source officielle, nomenclature, interprétation, base réglementaire, textes en projet, métadonnées, tolérance zéro.',
    icon: 'ri-shield-check-line',
    color: '#9B7B2C',
    duration: '< 500 ms',
  },
  {
    step: 5,
    name: 'AUTO-LINK GRAPH',
    description: 'Nouvelles entités réglementaires automatiquement liées dans kos-knowledge-graph. Relations inter-textes, citations croisées, entités nommées extraites et connectées.',
    icon: 'ri-node-tree',
    color: '#059669',
    duration: '< 30 secondes',
  },
];

export const regtrooperRegulators: RegtrooperRegulator[] = [
  { name: 'BCEAO', code: 'BCEAO', docsPerMonth: 8, category: 'Banque Centrale' },
  { name: 'COBAC', code: 'COBAC', docsPerMonth: 7, category: 'Commission Bancaire' },
  { name: 'OHADA', code: 'OHADA', docsPerMonth: 5, category: 'Droit des Affaires' },
  { name: 'GAFI', code: 'GAFI', docsPerMonth: 4, category: 'LCB/FT' },
  { name: 'GIABA', code: 'GIABA', docsPerMonth: 3, category: 'LCB/FT' },
  { name: 'CIMA', code: 'CIMA', docsPerMonth: 4, category: 'Assurance' },
  { name: 'AMF-UEMOA', code: 'AMF-UEMOA', docsPerMonth: 5, category: 'Marchés Financiers' },
  { name: 'BEAC', code: 'BEAC', docsPerMonth: 6, category: 'Banque Centrale' },
  { name: 'COSUMAF', code: 'COSUMAF', docsPerMonth: 4, category: 'Marchés Financiers' },
  { name: 'GABAC', code: 'GABAC', docsPerMonth: 3, category: 'LCB/FT' },
  { name: 'OCDE', code: 'OCDE', docsPerMonth: 5, category: 'Fiscalité' },
  { name: 'BRI', code: 'BRI', docsPerMonth: 6, category: 'Banque' },
  { name: 'IFRS Foundation', code: 'IFRS', docsPerMonth: 4, category: 'Comptabilité' },
  { name: 'ISO', code: 'ISO', docsPerMonth: 5, category: 'Normes' },
  { name: 'FMI', code: 'FMI', docsPerMonth: 6, category: 'Économie' },
  { name: 'Banque Mondiale', code: 'BM', docsPerMonth: 5, category: 'Développement' },
  { name: 'CEDEAO', code: 'CEDEAO', docsPerMonth: 4, category: 'Intégration' },
  { name: 'CEMAC', code: 'CEMAC', docsPerMonth: 4, category: 'Intégration' },
  { name: 'UEMOA', code: 'UEMOA', docsPerMonth: 6, category: 'Intégration' },
  { name: 'NIST', code: 'NIST', docsPerMonth: 6, category: 'Cybersécurité' },
];

export const regtrooperSystem: RegtrooperSystem = {
  id: 'regtrooper',
  name: 'KOS AUTO-INGESTION "REGTROOPER"',
  subtitle: 'Transformer chaque veille réglementaire en asset KOS sans humain',
  principle: 'Chaque nouveau PDF réglementaire détecté devient automatiquement 3 assets KOS — une note KBR, un article SEO/GEO, et une Flash Alert LinkedIn. 7 Gates qualité. 0 intervention humaine.',
  badge: '20 Régulateurs · 100 Assets/Mois · 7 Gates · Zéro Humain',
  flowSteps: regtrooperFlowSteps,
  regulators: regtrooperRegulators,
  kpis: [
    { label: 'Régulateurs scannés', value: '20', icon: 'ri-building-2-line' },
    { label: 'Assets/mois auto', value: '100', icon: 'ri-file-copy-2-line' },
    { label: 'Temps total par doc', value: '7 min', icon: 'ri-timer-line' },
    { label: 'vs Big Four (72h)', value: '617× plus rapide', icon: 'ri-speed-up-line' },
    { label: 'Heures humaines', value: '0h', icon: 'ri-user-unfollow-line' },
    { label: 'Gates qualité', value: '7/7', icon: 'ri-shield-check-line' },
  ],
  comparison: [
    { dimension: 'Délai publication', bigFour: '72 heures', kos: '7 minutes', icon: 'ri-timer-line' },
    { dimension: 'Analystes mobilisés', bigFour: '2 analystes', kos: '0 analyste', icon: 'ri-team-line' },
    { dimension: 'Formats produits', bigFour: '1 note interne', kos: '3 assets (KBR+Article+LinkedIn)', icon: 'ri-stack-line' },
    { dimension: 'Couverture régulateurs', bigFour: '3-5 régulateurs', kos: '20 régulateurs', icon: 'ri-global-line' },
    { dimension: 'Traçabilité', bigFour: 'Manuelle', kos: 'Hash chain SHA-256 auto', icon: 'ri-fingerprint-line' },
  ],
  totalAssetsPerMonth: 100,
  totalRegulators: 20,
};

// ═══════════════════════════════════════════
// SYSTÈME B — KOS "CLIENT BRAIN MINING"
// ═══════════════════════════════════════════

export const clientBrainFlowSteps: ClientBrainFlowStep[] = [
  {
    step: 1,
    name: 'FIN DE MISSION',
    description: 'kos-consulting-mission-factory tag mission_status=closed. Le trigger est automatique — aucune action humaine requise. Toute mission terminée entre dans le pipeline de capitalisation.',
    icon: 'ri-flag-line',
    color: '#0D7B5F',
  },
  {
    step: 2,
    name: 'EXTRACTION LIVRABLES',
    description: 'kos-enterprise-brain-os lit les livrables PPT/Word depuis Supabase Storage. Parsing intelligent de tous les documents attachés à la mission.',
    icon: 'ri-folder-open-line',
    color: '#C2410C',
  },
  {
    step: 3,
    name: 'AGENT 42 "KOS EXTRACTOR"',
    description: 'Découpe chaque livrable en 10 "Knowledge Atoms" — méthodologie, slide ROI, analyse de risque, verbatim client anonymisé. Extraction contextuelle intelligente.',
    icon: 'ri-brain-line',
    color: '#4F46E5',
  },
  {
    step: 4,
    name: 'ANONYMISATION',
    description: 'Remplacement automatique du nom client par "Institution UEMOA Tier1" ou "Groupe Bancaire CEMAC". Zéro donnée confidentielle conservée. Conformité RGPD + secret professionnel.',
    icon: 'ri-shield-user-line',
    color: '#9B7B2C',
  },
  {
    step: 5,
    name: 'ROUTAGE DES ATOMS',
    description: 'Atom 1 → KBR (Note synthèse), Atom 2 → Méthodologie, Atom 3 → Cas client blog, Atom 4 → FAQ réglementaire, Atom 5 → Template réutilisable, Atoms 6-10 → Knowledge Graph.',
    icon: 'ri-git-branch-line',
    color: '#7C3AED',
  },
  {
    step: 6,
    name: 'ROYALTY CONSULTANT',
    description: 'creator_royalty_score +1 pour le consultant auteur. ISO 30401 §8.2 — reconnaissance de la contribution au capital intellectuel. Incentive à la capitalisation.',
    icon: 'ri-medal-line',
    color: '#F59E0B',
  },
];

export const clientBrainAtoms: ClientBrainAtom[] = [
  { type: 'Méthodologie', description: 'Approche, framework, étapes clés de la mission', route: 'KBR → Knowledge Center', icon: 'ri-tools-line', color: '#4F46E5' },
  { type: 'Slide ROI', description: 'Analyse coût-bénéfice, impact chiffré pour le client', route: 'Méthodologie → Knowledge Graph', icon: 'ri-bar-chart-line', color: '#0D7B5F' },
  { type: 'Analyse de Risque', description: 'Matrice de risques, plan de mitigation', route: 'Risques → Knowledge Graph', icon: 'ri-alert-line', color: '#C2410C' },
  { type: 'Verbatim Client', description: 'Citation anonymisée, retour d\'expérience', route: 'Cas client → Blog SEO/GEO', icon: 'ri-chat-quote-line', color: '#9B7B2C' },
  { type: 'Template Réutilisable', description: 'Framework, modèle, checklist de la mission', route: 'Templates → Best Practices', icon: 'ri-file-copy-line', color: '#059669' },
  { type: 'Données Sectorielles', description: 'Statistiques, benchmarks, KPIs anonymisés', route: 'Intelligence Économique → KG', icon: 'ri-pie-chart-line', color: '#7C3AED' },
  { type: 'Leçon Apprise', description: 'Ce qui a marché, ce qui n\'a pas marché', route: 'Lessons Learned → Auto-Learning', icon: 'ri-lightbulb-line', color: '#F59E0B' },
  { type: 'Question Fréquente', description: 'Question posée par le client + réponse experte', route: 'FAQ → Réglementaire', icon: 'ri-question-answer-line', color: '#0891B2' },
  { type: 'Cadre Réglementaire', description: 'Textes applicables, interprétation métier', route: 'RAG → Base Réglementaire', icon: 'ri-scales-line', color: '#DC2626' },
  { type: 'Recommandation', description: 'Plan d\'action, roadmap, prochaines étapes', route: 'Recommandations → Knowledge Capsule', icon: 'ri-map-pin-line', color: '#6366F1' },
];

export const clientBrainSystem: ClientBrainSystem = {
  id: 'client-brain',
  name: 'KOS "CLIENT BRAIN MINING"',
  subtitle: 'Chaque mission Khepra = 10 assets KOS capitalisés automatiquement',
  principle: 'Dès qu\'une mission est clôturée, l\'Agent 42 "KOS Extractor" découpe les livrables en 10 Knowledge Atoms anonymisés, les route vers le Knowledge Graph, et crédite le consultant en royalty score. ISO 30401 §8.2.',
  badge: '10 Missions/Mois · 100 Assets/Mois · ISO 30401 · Agent 42',
  flowSteps: clientBrainFlowSteps,
  atoms: clientBrainAtoms,
  kpis: [
    { label: 'Missions capitalisées/mois', value: '10', icon: 'ri-briefcase-line' },
    { label: 'Atoms par mission', value: '10', icon: 'ri-cpu-line' },
    { label: 'Assets totaux/mois', value: '100', icon: 'ri-stack-line' },
    { label: 'Time-to-capitalisation', value: '< 1h', icon: 'ri-timer-line' },
    { label: 'vs Big Four', value: '144× plus rapide', icon: 'ri-speed-up-line' },
    { label: 'Conformité ISO', value: '30401 §8.2', icon: 'ri-verified-badge-line' },
  ],
  comparison: [
    { dimension: 'Délai capitalisation', bigFour: '6 semaines', kos: '< 1 heure', icon: 'ri-timer-line' },
    { dimension: 'Personnes mobilisées', bigFour: '4-6 consultants', kos: '0 humain', icon: 'ri-team-line' },
    { dimension: 'Assets par mission', bigFour: '1-2 diapos', kos: '10 Knowledge Atoms', icon: 'ri-stack-line' },
    { dimension: 'Anonymisation', bigFour: 'Manuelle, 2-3 jours', kos: 'Automatique, < 5 secondes', icon: 'ri-shield-user-line' },
    { dimension: 'Royalty consultant', bigFour: 'Aucune', kos: 'creator_royalty_score +1', icon: 'ri-medal-line' },
  ],
  missionsPerMonth: 10,
  assetsPerMission: 10,
};

// ═══════════════════════════════════════════
// SYSTÈME C — KOS "PREDICTIVE GAP FILLER"
// ═══════════════════════════════════════════

export const predictiveGapFlowSteps: PredictiveGapStep[] = [
  {
    step: 1,
    name: 'SCAN HEBDOMADAIRE',
    description: 'kos-enterprise-brain-os lance une query sur kos-knowledge-graph. Détection des entités réglementaires orphelines — citées 0 fois dans la base. Détection des questions FAQ sans réponse dans rag_chunks.',
    icon: 'ri-search-line',
    color: '#0D7B5F',
    duration: 'Chaque lundi 04:00',
  },
  {
    step: 2,
    name: 'PRIORISATION CROISÉE',
    description: 'Croisement avec kos-tender-intelligence : si un AO en cours parle de l\'entité orpheline → priorité P0. Si cité dans un texte récent → P1. Sinon → P2. Score d\'urgence calculé automatiquement.',
    icon: 'ri-crosshair-line',
    color: '#C2410C',
    duration: '< 30 secondes',
  },
  {
    step: 3,
    name: 'AUTO-BRIEF',
    description: 'Création automatique d\'une tâche pour kos-research-institute : "Rédiger KBR [Entité] + Date". Brief complet avec sources officielles, contexte réglementaire, et template de rédaction.',
    icon: 'ri-file-add-line',
    color: '#4F46E5',
    duration: '< 1 minute',
  },
  {
    step: 4,
    name: 'AUTO-DRAFT V0',
    description: 'L\'agent KOS rédige une V0 depuis les sources officielles + RAG. Structure KBR standard : synthèse, contexte, implications, recommandations. Score qualité cible ≥ 85/100.',
    icon: 'ri-draft-line',
    color: '#9B7B2C',
    duration: '< 5 minutes',
  },
  {
    step: 5,
    name: 'HUMAN-IN-LOOP',
    description: 'SME (Subject Matter Expert) valide en 5 minutes dans kos-quality-excellence. Relecture rapide, ajustements mineurs, validation finale. Publication automatique après validation.',
    icon: 'ri-user-received-line',
    color: '#059669',
    duration: '5 minutes max',
  },
];

export const predictiveGapEntities: PredictiveGapEntity[] = [
  {
    name: 'LBC-FT OHADA 2026',
    domain: 'LCB/FT',
    priority: 'P0',
    gapDescription: 'Entité réglementaire citée 0 fois dans la base. Pourtant l\'OHADA a publié un Acte Uniforme actualisé en 2026.',
    trigger: 'AO COBAC en cours mentionne LBC-FT OHADA',
    status: 'published',
  },
  {
    name: 'Finance Islamique CEMAC',
    domain: 'Finance Islamique',
    priority: 'P1',
    gapDescription: 'Aucune couverture des instructions COBAC sur la finance islamique. 3 banques islamiques agréées en zone CEMAC.',
    trigger: 'Croissance sectorielle + demande clients',
    status: 'drafting',
  },
  {
    name: 'CBDC BEAC — e-CFA',
    domain: 'Monnaie Numérique',
    priority: 'P0',
    gapDescription: 'Projet pilote BEAC de Monnaie Numérique de Banque Centrale non documenté. Opportunity AO de 850M FCFA identifié.',
    trigger: 'AO BEAC "Consulting MNBC" 850M FCFA',
    status: 'validated',
  },
  {
    name: 'Climate Stress Testing COBAC',
    domain: 'ESG / Climat',
    priority: 'P1',
    gapDescription: 'Directive COBAC sur les stress tests climatiques non couverte. 5 banques cherchant des conseils.',
    trigger: 'Demandes clients répétées',
    status: 'drafting',
  },
  {
    name: 'PSAN — Prestataires Services Actifs Numériques',
    domain: 'FinTech',
    priority: 'P2',
    gapDescription: 'Régulation AMF-UEMOA sur les PSAN émergente. Pas encore de demande AO mais croissance rapide.',
    trigger: 'Veille réglementaire prospective',
    status: 'detected',
  },
  {
    name: 'Directive COBAC 2027 — Résilience Opérationnelle',
    domain: 'Cybersécurité',
    priority: 'P1',
    gapDescription: 'Directive COBAC 2027 sur la résilience opérationnelle. 28 banques concernées, 76% sans SOC 24/7.',
    trigger: 'Deadline réglementaire Q4 2027',
    status: 'published',
  },
  {
    name: 'OHADA Acte Uniforme Transactions Électroniques',
    domain: 'Droit Numérique',
    priority: 'P2',
    gapDescription: 'Projet d\'Acte Uniforme sur les transactions électroniques. Texte en cours d\'élaboration.',
    trigger: 'Veille législative OHADA',
    status: 'briefed',
  },
  {
    name: 'IFRS S1/S2 — Sustainability Disclosure',
    domain: 'ESG',
    priority: 'P0',
    gapDescription: 'Standards ISSB applicables aux banques UEMOA dès 2027. 0 contenu dédié sur le site.',
    trigger: 'AO Banque Mondiale "ESG Reporting UEMOA" 720M FCFA',
    status: 'published',
  },
];

export const predictiveGapSystem: PredictiveGapSystem = {
  id: 'predictive-gap',
  name: 'KOS "PREDICTIVE GAP FILLER"',
  subtitle: 'L\'IA trouve elle-même les trous de la base de connaissances et les comble',
  principle: 'Chaque semaine, le système scanne le Knowledge Graph, détecte les entités orphelines, les priorise via le Tender Intelligence, auto-génère un brief et un draft V0. Le SME valide en 5 minutes. Couverture cible : 98%.',
  badge: '78% → 98% en 60j · Zéro Angle Mort · ISO 30401 §6.2',
  flowSteps: predictiveGapFlowSteps,
  orphanEntities: predictiveGapEntities,
  kpis: [
    { label: 'Couverture actuelle', value: '78%', icon: 'ri-pie-chart-line' },
    { label: 'Couverture cible J+60', value: '98%', icon: 'ri-trophy-line' },
    { label: 'Entités orphelines détectées', value: '8', icon: 'ri-search-line' },
    { label: 'Gaps comblés', value: '3', icon: 'ri-check-double-line' },
    { label: 'En cours', value: '4', icon: 'ri-loader-4-line' },
    { label: 'Temps SME / gap', value: '5 min', icon: 'ri-user-received-line' },
  ],
  coverageStart: 78,
  coverageTarget: 98,
  daysToTarget: 60,
};

export const autoKnowledgeDevelopment = {
  stats: autoKnowledgeStats,
  regtrooper: regtrooperSystem,
  clientBrain: clientBrainSystem,
  predictiveGap: predictiveGapSystem,
};





