export interface AgentPool {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  mission: string;
  agentCount: number;
  agents: string[];
  domaines: string[];
  responsables: string[];
  kpis: { label: string; value: string; target: string; icon: string }[];
  statut: 'optimal' | 'stable' | 'degraded' | 'critical';
  scoreBigFour: number;
}

export interface RACIEntry {
  activiteId: string;
  activite: string;
  domaine: string;
  pools: {
    poolId: string;
    role: 'R' | 'A' | 'C' | 'I';
    description: string;
  }[];
}

export interface WorkflowStep {
  id: string;
  numero: number;
  nom: string;
  description: string;
  poolAssignee: string;
  poolIcon: string;
  poolColor: string;
  duree: string;
  livrable: string;
  controles: string[];
  dependances: string[];
  statut: 'completed' | 'in_progress' | 'pending';
}

export interface Workflow {
  id: string;
  nom: string;
  description: string;
  trigger: string;
  frequence: string;
  dureeTotale: string;
  etapes: WorkflowStep[];
}

export interface Escalade {
  id: string;
  niveau: number;
  nom: string;
  description: string;
  seuilDeclenchement: string;
  delaiMax: string;
  acteurs: string[];
  actions: string[];
  couleur: string;
}

export interface RegleValidation {
  id: string;
  numero: number;
  domaine: string;
  regle: string;
  description: string;
  seuil: string;
  consequence: string;
  severite: 'critique' | 'majeur' | 'mineur';
}

export interface OrKPI {
  id: string;
  categorie: 'temps' | 'qualite' | 'productivite';
  nom: string;
  description: string;
  valeurActuelle: string;
  cible: string;
  tendance: string;
  unite: string;
  poolId: string;
  icon: string;
}

// ============ 7 POOLS D'AGENTS ============
export const agentPools: AgentPool[] = [
  {
    id: 'pool-veille',
    name: 'Agents Veille',
    shortName: 'Veille',
    icon: 'ri-radar-line',
    color: '#0891B2',
    description: 'Piscine de veille stratégique : intelligence économique, réglementaire, concurrentielle et sectorielle.',
    mission: 'Scanner 24/7 l\'environnement réglementaire, concurrentiel et sectoriel pour anticiper les signaux faibles et les opportunités.',
    agentCount: 8,
    agents: ['KOS Regulatory Intelligence Engine™', 'KOS Competitive Intelligence Center™', 'KOS Market Intelligence Center™', 'KOS GEO Visibility Engine™', 'KOS AI Visibility Command™', 'KOS GSC Command Center™', 'KOS Institutional Visibility Engine™', 'KOS Strategic Intelligence Engine™'],
    domaines: ['Réglementaire BCEAO/COBAC', 'Concurrentiel Big Four', 'Marché UEMOA/CEMAC', 'Visibilité AI/GEO', 'Appels d\'offres', 'Tendances sectorielles'],
    responsables: ['Chief Intelligence Officer (KOS)', 'SVP Regulatory Watch', 'Director Market Intelligence'],
    kpis: [
      { label: 'Alertes/jour', value: '127', target: '150', icon: 'ri-notification-line' },
      { label: 'Temps détection', value: '4.2 min', target: '< 3 min', icon: 'ri-timer-line' },
      { label: 'Couverture sources', value: '94%', target: '98%', icon: 'ri-radar-line' },
      { label: 'Signaux faibles', value: '18/mois', target: '25/mois', icon: 'ri-pulse-line' },
    ],
    statut: 'optimal',
    scoreBigFour: 93,
  },
  {
    id: 'pool-recherche',
    name: 'Agents Recherche',
    shortName: 'Recherche',
    icon: 'ri-flask-line',
    color: '#7C3AED',
    description: 'Piscine de recherche et production intellectuelle : études, baromètres, livres blancs, publications académiques.',
    mission: 'Produire des études, baromètres, indices, livres blancs et rapports de recherche de niveau Big Four sur les domaines réglementaires et sectoriels africains.',
    agentCount: 6,
    agents: ['KOS Research Institute™', 'KOS Think Tank Agent™', 'KOS Knowledge Manager™', 'KOS Scientific Intelligence Enhancement™', 'KOS Thought Leadership Center™', 'KOS Africa Observatories™'],
    domaines: ['Gouvernance', 'SFD & Inclusion Financière', 'FinTech', 'ESG & Durabilité', 'Investissement', 'Baromètres sectoriels'],
    responsables: ['Chief Research Officer (KOS)', 'Director Think Tank', 'Head of Publications'],
    kpis: [
      { label: 'Publications/mois', value: '12', target: '15', icon: 'ri-article-line' },
      { label: 'Citations académiques', value: '487', target: '600', icon: 'ri-quote-text' },
      { label: 'Téléchargements', value: '105K', target: '150K', icon: 'ri-download-line' },
      { label: 'Score autorité', value: '94/100', target: '97/100', icon: 'ri-medal-line' },
    ],
    statut: 'optimal',
    scoreBigFour: 94,
  },
  {
    id: 'pool-seo-geo',
    name: 'Agents SEO/GEO',
    shortName: 'SEO/GEO',
    icon: 'ri-search-eye-line',
    color: '#0D7B5F',
    description: 'Piscine de visibilité numérique : SEO technique, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), backlinks.',
    mission: 'Maximiser la visibilité organique et AI de KHEPRA EXPERTS sur les moteurs de recherche traditionnels et génératifs (Google, ChatGPT, Claude, Perplexity, Gemini).',
    agentCount: 9,
    agents: ['KOS SEO + AEO Command Center™', 'KOS SEO Autopilot™', 'KOS Backlink Intelligence™', 'KOS Performance SEO Command™', 'KOS Schema Markup Agent™', 'KOS LLMs Generator™', 'KOS GEO Visibility Engine™', 'KOS AI Visibility Command™', 'KOS SEO Big Four™'],
    domaines: ['SEO On-Page', 'SEO Technique', 'AEO (Answer Engine)', 'GEO (ChatGPT/Claude)', 'Backlinks', 'Core Web Vitals', 'Schema.org', 'llms.txt'],
    responsables: ['Chief Digital Officer (KOS)', 'Director SEO & GEO', 'Head of Technical SEO'],
    kpis: [
      { label: 'Score SEO', value: '9.6/10', target: '9.8/10', icon: 'ri-search-line' },
      { label: 'Score GEO', value: '92/100', target: '95/100', icon: 'ri-robot-line' },
      { label: 'Featured Snippets', value: '52', target: '75', icon: 'ri-star-line' },
      { label: 'Domain Authority', value: '45', target: '55', icon: 'ri-link-m' },
    ],
    statut: 'optimal',
    scoreBigFour: 91,
  },
  {
    id: 'pool-formation',
    name: 'Agents Formation',
    shortName: 'Formation',
    icon: 'ri-graduation-cap-line',
    color: '#E8943A',
    description: 'Piscine de formation et développement des compétences : formations réglementaires, certifications, programmes sur mesure.',
    mission: 'Développer et délivrer des formations réglementaires et professionnelles de niveau Big Four pour les clients, partenaires et équipes internes KHEPRA.',
    agentCount: 5,
    agents: ['KOS Training Academy™', 'KOS Learning Engine™', 'KOS Service Innovation Factory™', 'KOS Knowledge Manager™', 'KOS Methodology Factory™'],
    domaines: ['Formations BCEAO', 'Certifications COBAC', 'Programmes ESG', 'Due Diligence', 'Gouvernance', 'Conformité LBC/FT'],
    responsables: ['Chief Learning Officer (KOS)', 'Director Training Academy', 'Head of Certification'],
    kpis: [
      { label: 'Apprenants actifs', value: '1 240', target: '2 000', icon: 'ri-user-line' },
      { label: 'Taux complétion', value: '87%', target: '92%', icon: 'ri-check-double-line' },
      { label: 'Satisfaction', value: '9.2/10', target: '9.5/10', icon: 'ri-emotion-happy-line' },
      { label: 'Certifications', value: '8', target: '12', icon: 'ri-award-line' },
    ],
    statut: 'stable',
    scoreBigFour: 87,
  },
  {
    id: 'pool-ao',
    name: 'Agents Appels d\'Offres',
    shortName: 'AO/AMI',
    icon: 'ri-file-search-line',
    color: '#9B7B2C',
    description: 'Piscine dédiée aux appels d\'offres et appels à manifestation d\'intérêt : détection, analyse, réponse, soumission.',
    mission: 'Détecter automatiquement les AO/AMI pertinents, analyser la faisabilité, produire des offres commerciales conformes aux standards Big Four.',
    agentCount: 6,
    agents: ['KOS Tender Intelligence Engine™', 'KOS AO/AMI Intelligence™', 'KOS Proposal Generator™', 'KOS Consulting Factory™', 'KOS Business Development Engine™', 'KOS Closing Intelligence Engine™'],
    domaines: ['AO BCEAO', 'AO Banque Mondiale', 'AO AFDB/BOAD', 'AO Gouvernements', 'AMI Secteur Privé', 'AO Multilatéraux'],
    responsables: ['Chief Commercial Officer (KOS)', 'Director Tender Intelligence', 'Head of Proposals'],
    kpis: [
      { label: 'AO détectés', value: '51', target: '80', icon: 'ri-file-search-line' },
      { label: 'Valeur pipeline', value: '18.2 Md', target: '30 Md', icon: 'ri-money-dollar-circle-line' },
      { label: 'Taux conversion', value: '40%', target: '50%', icon: 'ri-line-chart-line' },
      { label: 'Délai soumission', value: '3.2 j', target: '< 2 j', icon: 'ri-timer-line' },
    ],
    statut: 'optimal',
    scoreBigFour: 92,
  },
  {
    id: 'pool-conformite',
    name: 'Agents Conformité',
    shortName: 'Conformité',
    icon: 'ri-shield-check-line',
    color: '#8B3040',
    description: 'Piscine de conformité réglementaire : veille normative, audits, remédiation, due diligence, LBC/FT.',
    mission: 'Garantir la conformité réglementaire continue des clients KHEPRA vis-à-vis des exigences BCEAO, COBAC, OHADA, GAFI, BEAC et CIMA.',
    agentCount: 10,
    agents: ['KOS Regulatory Compliance Automate™', 'KOS Regulatory Intelligence Engine™', 'KOS Regulatory Compliance Audit™', 'KOS Regulatory Remediation Engine™', 'KOS Legal Compliance Agent™', 'KOS Due Diligence Engine™', 'KOS Enterprise Risk Engine™', 'KOS Internal Control Engine™', 'KOS ESG Sustainability Engine™', 'KOS Cyber Security Automate™'],
    domaines: ['BCEAO (SFD/ Banques)', 'COBAC (CEMAC)', 'OHADA', 'GAFI (LBC/FT)', 'BEAC', 'CIMA', 'ISSB/ESG', 'RGPD'],
    responsables: ['Chief Compliance Officer (KOS)', 'Director Regulatory Affairs', 'Head of AML/CFT'],
    kpis: [
      { label: 'Textes couverts', value: '52', target: '65', icon: 'ri-file-text-line' },
      { label: 'Alertes conformité', value: '34/mois', target: '40/mois', icon: 'ri-alert-line' },
      { label: 'Score conformité', value: '94%', target: '98%', icon: 'ri-shield-check-line' },
      { label: 'Taux remédiation', value: '92%', target: '96%', icon: 'ri-tools-line' },
    ],
    statut: 'optimal',
    scoreBigFour: 93,
  },
  {
    id: 'pool-qualite',
    name: 'Agents Contrôle Qualité',
    shortName: 'Qualité',
    icon: 'ri-verified-badge-line',
    color: '#5B21B6',
    description: 'Piscine de contrôle qualité et assurance : scoring Big Four, revue experte, humanisation, correction, certification.',
    mission: 'Garantir que chaque livrable KHEPRA atteint le score minimum de 95/100 avant diffusion, conformément aux standards qualité Big Four.',
    agentCount: 7,
    agents: ['KOS Quality Assurance Authority™', 'KOS Expert Reviewer™', 'KOS Humanization Engine™', 'KOS Correction Engine™', 'KOS Self-Improvement Engine™', 'KOS AI Governance Council™', 'KOS Quality System™'],
    domaines: ['Scoring qualité', 'Revue experte', 'Humanisation', 'Correction auto', 'Amélioration continue', 'Gouvernance IA'],
    responsables: ['Chief Quality Officer (KOS)', 'Director Quality Assurance', 'Head of Expert Review'],
    kpis: [
      { label: 'Score qualité moyen', value: '96.2/100', target: '97/100', icon: 'ri-verified-badge-line' },
      { label: 'Documents rejetés', value: '2.4%', target: '< 1%', icon: 'ri-close-circle-line' },
      { label: 'Délai contrôle', value: '12 min', target: '< 8 min', icon: 'ri-timer-line' },
      { label: 'Couverture revue', value: '100%', target: '100%', icon: 'ri-check-double-line' },
    ],
    statut: 'optimal',
    scoreBigFour: 96,
  },
];

// ============ MATRICE RACI ============
export const raciMatrix: RACIEntry[] = [
  {
    activiteId: 'RACI-01',
    activite: 'Veille réglementaire continue',
    domaine: 'Intelligence',
    pools: [
      { poolId: 'pool-veille', role: 'R', description: 'Scanne les sources réglementaires 24/7' },
      { poolId: 'pool-conformite', role: 'A', description: 'Valide la pertinence réglementaire des alertes' },
      { poolId: 'pool-recherche', role: 'C', description: 'Consulté pour contextualisation académique' },
      { poolId: 'pool-qualite', role: 'I', description: 'Informé des alertes critiques pour traçabilité' },
    ],
  },
  {
    activiteId: 'RACI-02',
    activite: 'Détection et réponse aux appels d\'offres',
    domaine: 'Commercial',
    pools: [
      { poolId: 'pool-ao', role: 'R', description: 'Détecte, analyse et prépare les AO/AMI' },
      { poolId: 'pool-veille', role: 'A', description: 'Valide le contexte concurrentiel de l\'AO' },
      { poolId: 'pool-conformite', role: 'C', description: 'Consulté pour conformité des propositions' },
      { poolId: 'pool-recherche', role: 'I', description: 'Informé pour alimenter le capital intellectuel' },
    ],
  },
  {
    activiteId: 'RACI-03',
    activite: 'Production de publications intellectuelles',
    domaine: 'Thought Leadership',
    pools: [
      { poolId: 'pool-recherche', role: 'R', description: 'Produit études, baromètres, livres blancs' },
      { poolId: 'pool-qualite', role: 'A', description: 'Valide score qualité ≥ 95/100 avant publication' },
      { poolId: 'pool-conformite', role: 'C', description: 'Consulté pour conformité réglementaire du contenu' },
      { poolId: 'pool-seo-geo', role: 'I', description: 'Informé pour optimisation SEO/GEO des publications' },
    ],
  },
  {
    activiteId: 'RACI-04',
    activite: 'Optimisation SEO/GEO du site KHEPRA',
    domaine: 'Visibilité',
    pools: [
      { poolId: 'pool-seo-geo', role: 'R', description: 'Exécute l\'optimisation SEO technique et AEO' },
      { poolId: 'pool-qualite', role: 'A', description: 'Valide les corrections avant déploiement' },
      { poolId: 'pool-recherche', role: 'C', description: 'Consulté pour contenu E-E-A-T authority' },
      { poolId: 'pool-veille', role: 'I', description: 'Informé des changements d\'algo Google/ChatGPT' },
    ],
  },
  {
    activiteId: 'RACI-05',
    activite: 'Conception et délivrance de formations',
    domaine: 'Formation',
    pools: [
      { poolId: 'pool-formation', role: 'R', description: 'Conçoit et délivre les formations' },
      { poolId: 'pool-conformite', role: 'A', description: 'Valide le contenu réglementaire des formations' },
      { poolId: 'pool-recherche', role: 'C', description: 'Consulté pour contenu académique à jour' },
      { poolId: 'pool-qualite', role: 'I', description: 'Informé pour suivi qualité des modules' },
    ],
  },
  {
    activiteId: 'RACI-06',
    activite: 'Audit de conformité réglementaire',
    domaine: 'Conformité',
    pools: [
      { poolId: 'pool-conformite', role: 'R', description: 'Réalise l\'audit de conformité complet' },
      { poolId: 'pool-veille', role: 'A', description: 'Valide l\'exhaustivité des textes applicables' },
      { poolId: 'pool-ao', role: 'C', description: 'Consulté si l\'audit est lié à un AO' },
      { poolId: 'pool-qualite', role: 'I', description: 'Informé pour scoring qualité de l\'audit' },
    ],
  },
  {
    activiteId: 'RACI-07',
    activite: 'Contrôle qualité des livrables',
    domaine: 'Qualité',
    pools: [
      { poolId: 'pool-qualite', role: 'R', description: 'Exécute le contrôle qualité 5 dimensions' },
      { poolId: 'pool-qualite', role: 'A', description: 'Veto qualité contraignant sur tout livrable' },
      { poolId: 'pool-recherche', role: 'C', description: 'Consulté pour fact-checking académique' },
      { poolId: 'pool-conformite', role: 'I', description: 'Informé des non-conformités détectées' },
    ],
  },
  {
    activiteId: 'RACI-08',
    activite: 'Gestion des risques et due diligence',
    domaine: 'Risque',
    pools: [
      { poolId: 'pool-conformite', role: 'R', description: 'Réalise la due diligence et l\'évaluation des risques' },
      { poolId: 'pool-veille', role: 'A', description: 'Valide le contexte macro-économique et sectoriel' },
      { poolId: 'pool-ao', role: 'C', description: 'Consulté si lié à une offre commerciale' },
      { poolId: 'pool-qualite', role: 'I', description: 'Informé des risques pour le registre qualité' },
    ],
  },
  {
    activiteId: 'RACI-09',
    activite: 'Auto-amélioration continue du système KOS',
    domaine: 'Système',
    pools: [
      { poolId: 'pool-qualite', role: 'R', description: 'Identifie les axes d\'amélioration via les KPIs' },
      { poolId: 'pool-qualite', role: 'A', description: 'Valide le plan d\'amélioration continue' },
      { poolId: 'pool-veille', role: 'C', description: 'Consulté pour benchmark externe' },
      { poolId: 'pool-recherche', role: 'I', description: 'Informé des évolutions méthodologiques' },
    ],
  },
  {
    activiteId: 'RACI-10',
    activite: 'Pilotage de la performance globale KOS',
    domaine: 'Pilotage',
    pools: [
      { poolId: 'pool-qualite', role: 'R', description: 'Consolide les KPIs des 7 pools' },
      { poolId: 'pool-veille', role: 'A', description: 'Valide la cohérence stratégique globale' },
      { poolId: 'pool-ao', role: 'C', description: 'Consulté pour projection commerciale' },
      { poolId: 'pool-formation', role: 'I', description: 'Informé pour ajustement des plans de formation' },
    ],
  },
];

// ============ 5 WORKFLOWS D'ORCHESTRATION ============
export const workflows: Workflow[] = [
  {
    id: 'WF-001',
    nom: 'Détection AO → Soumission',
    description: 'Workflow complet de la détection d\'un appel d\'offres jusqu\'à la soumission de la proposition. Implique les pools AO, Veille, Conformité et Qualité.',
    trigger: 'Nouvel AO détecté par le Tender Intelligence Engine',
    frequence: 'Temps réel',
    dureeTotale: '72h',
    etapes: [
      { id: 'WF001-01', numero: 1, nom: 'Détection et filtrage', description: 'Scraping automatique des AO/AMI. Filtrage par pertinence, budget, secteur.', poolAssignee: 'pool-ao', poolIcon: 'ri-file-search-line', poolColor: '#9B7B2C', duree: '< 1 min', livrable: 'AO filtré avec score de pertinence', controles: ['Budget > 50M FCFA', 'Secteur conforme KHEPRA', 'Pays éligible'], dependances: [], statut: 'completed' },
      { id: 'WF001-02', numero: 2, nom: 'Analyse concurrentielle', description: 'Analyse du paysage concurrentiel, historique des attributions, positionnement KHEPRA.', poolAssignee: 'pool-veille', poolIcon: 'ri-radar-line', poolColor: '#0891B2', duree: '4h', livrable: 'Rapport d\'intelligence concurrentielle', controles: ['Top 3 concurrents identifiés', 'Historique 24 mois analysé'], dependances: ['WF001-01'], statut: 'in_progress' },
      { id: 'WF001-03', numero: 3, nom: 'Analyse de conformité', description: 'Vérification conformité réglementaire. Adéquation expertise KHEPRA vs exigences AO.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '8h', livrable: 'Checklist conformité réglementaire', controles: ['100% exigences réglementaires couvertes', 'Références BCEAO/COBAC vérifiées'], dependances: ['WF001-01'], statut: 'in_progress' },
      { id: 'WF001-04', numero: 4, nom: 'Rédaction proposition', description: 'Rédaction de l\'offre technique et financière selon le standard Big Four 10 points.', poolAssignee: 'pool-ao', poolIcon: 'ri-file-search-line', poolColor: '#9B7B2C', duree: '48h', livrable: 'Proposition technique + financière', controles: ['Structure 10 points Big Four', 'TJM actualisé 2026', 'Case studies pertinentes'], dependances: ['WF001-02', 'WF001-03'], statut: 'pending' },
      { id: 'WF001-05', numero: 5, nom: 'Revue qualité', description: 'Contrôle qualité 5 dimensions. Score minimum 9.5/10 requis.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '4h', livrable: 'Certificat qualité avec score', controles: ['Score ≥ 9.5/10', 'Zéro erreur factuelle', 'Ton exécutif calibré'], dependances: ['WF001-04'], statut: 'pending' },
      { id: 'WF001-06', numero: 6, nom: 'Validation DG & soumission', description: 'Signature Managing Partner. Soumission électronique ou physique.', poolAssignee: 'pool-ao', poolIcon: 'ri-file-search-line', poolColor: '#9B7B2C', duree: '8h', livrable: 'Proposition soumise + AR', controles: ['Signature DG apposée', 'Accusé réception obtenu'], dependances: ['WF001-05'], statut: 'pending' },
    ],
  },
  {
    id: 'WF-002',
    nom: 'Publication Thought Leadership',
    description: 'Workflow de production d\'une publication intellectuelle (baromètre, étude, livre blanc) de la conception à la diffusion.',
    trigger: 'Brief de recherche approuvé par le COMEX',
    frequence: 'Mensuelle',
    dureeTotale: '15 jours',
    etapes: [
      { id: 'WF002-01', numero: 1, nom: 'Cadrage recherche', description: 'Définition du périmètre, méthodologie, sources et calendrier.', poolAssignee: 'pool-recherche', poolIcon: 'ri-flask-line', poolColor: '#7C3AED', duree: '2 jours', livrable: 'Note de cadrage validée', controles: ['Méthodologie documentée', 'Sources primaires identifiées'], dependances: [], statut: 'completed' },
      { id: 'WF002-02', numero: 2, nom: 'Collecte données & veille', description: 'Collecte des données primaires et secondaires. Veille réglementaire contextuelle.', poolAssignee: 'pool-veille', poolIcon: 'ri-radar-line', poolColor: '#0891B2', duree: '3 jours', livrable: 'Base de données documentée', controles: ['Sources vérifiées', 'Données < 6 mois'], dependances: ['WF002-01'], statut: 'in_progress' },
      { id: 'WF002-03', numero: 3, nom: 'Analyse & rédaction', description: 'Analyse des données, rédaction du corps de la publication, création des visualisations.', poolAssignee: 'pool-recherche', poolIcon: 'ri-flask-line', poolColor: '#7C3AED', duree: '5 jours', livrable: 'Manuscrit complet', controles: ['Citations sourcées', 'KPIs chiffrés', 'Graphiques inclus'], dependances: ['WF002-02'], statut: 'pending' },
      { id: 'WF002-04', numero: 4, nom: 'Revue conformité', description: 'Vérification conformité réglementaire des assertions. Validation LBC/FT si applicable.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '2 jours', livrable: 'Rapport de conformité', controles: ['0 assertion non vérifiée', 'Références réglementaires exactes'], dependances: ['WF002-03'], statut: 'pending' },
      { id: 'WF002-05', numero: 5, nom: 'Contrôle qualité', description: 'Scoring qualité 5 dimensions. Score minimum 96/100.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '1 jour', livrable: 'Certificat qualité 96+/100', controles: ['96/100 minimum', 'Hallucination 0%', 'Ton institutionnel calibré'], dependances: ['WF002-03'], statut: 'pending' },
      { id: 'WF002-06', numero: 6, nom: 'Optimisation SEO/GEO', description: 'Optimisation du titre, résumé, mots-clés pour SEO et GEO (ChatGPT, Claude, Perplexity).', poolAssignee: 'pool-seo-geo', poolIcon: 'ri-search-eye-line', poolColor: '#0D7B5F', duree: '1 jour', livrable: 'Publication optimisée SEO/GEO', controles: ['Title tag optimisé', 'Meta description AEO', 'FAQ Schema ajouté'], dependances: ['WF002-05'], statut: 'pending' },
      { id: 'WF002-07', numero: 7, nom: 'Publication & diffusion', description: 'Mise en ligne, diffusion LinkedIn, newsletter, communiqué de presse.', poolAssignee: 'pool-recherche', poolIcon: 'ri-flask-line', poolColor: '#7C3AED', duree: '1 jour', livrable: 'Publication diffusée + KPIs', controles: ['Multi-canal', 'CTA lead magnet inclus'], dependances: ['WF002-06'], statut: 'pending' },
    ],
  },
  {
    id: 'WF-003',
    nom: 'Audit conformité réglementaire',
    description: 'Workflow complet d\'un audit de conformité réglementaire pour un client (banque, SFD, fintech).',
    trigger: 'Contrat signé ou mission d\'audit déclenchée',
    frequence: 'Par mission',
    dureeTotale: '20 jours',
    etapes: [
      { id: 'WF003-01', numero: 1, nom: 'Cadrage & périmètre', description: 'Définition du périmètre d\'audit, textes applicables, parties prenantes, planning.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '2 jours', livrable: 'Lettre de mission + planning', controles: ['Périmètre BCEAO/COBAC défini', 'Parties prenantes identifiées'], dependances: [], statut: 'completed' },
      { id: 'WF003-02', numero: 2, nom: 'Collecte documentaire', description: 'Collecte des documents client, textes réglementaires applicables, précédents audits.', poolAssignee: 'pool-veille', poolIcon: 'ri-radar-line', poolColor: '#0891B2', duree: '3 jours', livrable: 'Dossier documentaire complet', controles: ['52 textes BCEAO vérifiés', 'Documents client reçus'], dependances: ['WF003-01'], statut: 'completed' },
      { id: 'WF003-03', numero: 3, nom: 'Analyse des écarts', description: 'Analyse des écarts de conformité, scoring par domaine, matrice de risques.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '8 jours', livrable: 'Matrice d\'écarts + scoring', controles: ['100% exigences analysées', 'Risques cotés 1-5'], dependances: ['WF003-02'], statut: 'in_progress' },
      { id: 'WF003-04', numero: 4, nom: 'Plan de remédiation', description: 'Élaboration du plan de remédiation avec priorisation, responsabilité, calendrier.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '3 jours', livrable: 'Plan de remédiation priorisé', controles: ['Actions SMART', 'Priorités P0-P3', 'Budget estimé'], dependances: ['WF003-03'], statut: 'pending' },
      { id: 'WF003-05', numero: 5, nom: 'Revue qualité', description: 'Contrôle qualité 5 dimensions. Score minimum 95/100.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '2 jours', livrable: 'Rapport d\'audit certifié 95+/100', controles: ['95/100 minimum', 'Recommandations sourcées'], dependances: ['WF003-04'], statut: 'pending' },
      { id: 'WF003-06', numero: 6, nom: 'Présentation client', description: 'Préparation et livraison de la présentation au COMEX/Conseil du client.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '2 jours', livrable: 'Présentation COMEX + rapport final', controles: ['Synthèse exécutive', 'KPIs visuels'], dependances: ['WF003-05'], statut: 'pending' },
    ],
  },
  {
    id: 'WF-004',
    nom: 'Déploiement formation certifiante',
    description: 'Workflow de conception et déploiement d\'une formation certifiante réglementaire.',
    trigger: 'Demande client ou lancement catalogue',
    frequence: 'Trimestrielle',
    dureeTotale: '30 jours',
    etapes: [
      { id: 'WF004-01', numero: 1, nom: 'Analyse des besoins', description: 'Analyse des besoins de formation, public cible, prérequis, objectifs pédagogiques.', poolAssignee: 'pool-formation', poolIcon: 'ri-graduation-cap-line', poolColor: '#E8943A', duree: '3 jours', livrable: 'Cahier des charges formation', controles: ['Besoins validés client', 'Niveau défini'], dependances: [], statut: 'completed' },
      { id: 'WF004-02', numero: 2, nom: 'Conception contenu', description: 'Création du contenu pédagogique, modules, exercices, cas pratiques, évaluations.', poolAssignee: 'pool-formation', poolIcon: 'ri-graduation-cap-line', poolColor: '#E8943A', duree: '10 jours', livrable: 'Kit pédagogique complet', controles: ['Modules structurés', 'Cas pratiques inclus'], dependances: ['WF004-01'], statut: 'in_progress' },
      { id: 'WF004-03', numero: 3, nom: 'Validation réglementaire', description: 'Vérification de l\'exactitude réglementaire du contenu par les experts conformité.', poolAssignee: 'pool-conformite', poolIcon: 'ri-shield-check-line', poolColor: '#8B3040', duree: '5 jours', livrable: 'Contenu certifié conforme', controles: ['100% références vérifiées', 'Textes à jour'], dependances: ['WF004-02'], statut: 'pending' },
      { id: 'WF004-04', numero: 4, nom: 'Revue qualité pédagogique', description: 'Évaluation de la qualité pédagogique : clarté, progression, engagement, évaluation.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '3 jours', livrable: 'Rapport qualité pédagogique', controles: ['Score ≥ 9/10', 'Progression logique'], dependances: ['WF004-03'], statut: 'pending' },
      { id: 'WF004-05', numero: 5, nom: 'Formation des formateurs', description: 'Session de formation des formateurs KHEPRA sur le nouveau module.', poolAssignee: 'pool-formation', poolIcon: 'ri-graduation-cap-line', poolColor: '#E8943A', duree: '5 jours', livrable: 'Formateurs certifiés', controles: ['100% formateurs certifiés', 'Test final réussi'], dependances: ['WF004-04'], statut: 'pending' },
      { id: 'WF004-06', numero: 6, nom: 'Lancement & delivery', description: 'Lancement de la formation, délivrance aux apprenants, suivi, certification finale.', poolAssignee: 'pool-formation', poolIcon: 'ri-graduation-cap-line', poolColor: '#E8943A', duree: '4 jours', livrable: 'Formation livrée + KPIs', controles: ['Satisfaction mesurée', 'Certificats émis'], dependances: ['WF004-05'], statut: 'pending' },
    ],
  },
  {
    id: 'WF-005',
    nom: 'Auto-correction continue KOS',
    description: 'Workflow d\'amélioration continue du système KOS : détection anomalies → correction → validation.',
    trigger: 'Scan quotidien 06:00 UTC',
    frequence: 'Quotidienne',
    dureeTotale: '4h',
    etapes: [
      { id: 'WF005-01', numero: 1, nom: 'Scan global', description: 'Scan automatique de tous les agents, pages, performances, sécurité.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '15 min', livrable: 'Rapport de scan', controles: ['75 agents scannés', '7 domaines couverts'], dependances: [], statut: 'completed' },
      { id: 'WF005-02', numero: 2, nom: 'Détection anomalies', description: 'Identification des anomalies : SEO, sécurité, performance, contenu, accessibilité.', poolAssignee: 'pool-veille', poolIcon: 'ri-radar-line', poolColor: '#0891B2', duree: '20 min', livrable: 'Liste des anomalies priorisées', controles: ['Criticité évaluée', 'Impact estimé'], dependances: ['WF005-01'], statut: 'in_progress' },
      { id: 'WF005-03', numero: 3, nom: 'Correction automatique', description: 'Application des correctifs automatiques (SEO, performance, assets, liens).', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '2h', livrable: 'Correctifs appliqués', controles: ['Régression testée', 'Safe mode respecté'], dependances: ['WF005-02'], statut: 'pending' },
      { id: 'WF005-04', numero: 4, nom: 'Validation post-correction', description: 'Vérification que les correctifs n\'ont pas introduit de régressions.', poolAssignee: 'pool-seo-geo', poolIcon: 'ri-search-eye-line', poolColor: '#0D7B5F', duree: '45 min', livrable: 'Rapport de validation', controles: ['CWV maintenus', 'SEO non dégradé'], dependances: ['WF005-03'], statut: 'pending' },
      { id: 'WF005-05', numero: 5, nom: 'Rapport exécutif', description: 'Génération du rapport exécutif quotidien pour le COMEX KOS.', poolAssignee: 'pool-qualite', poolIcon: 'ri-verified-badge-line', poolColor: '#5B21B6', duree: '10 min', livrable: 'Rapport exécutif COMEX', controles: ['KPIs consolidés', 'Tendances annotées'], dependances: ['WF005-04'], statut: 'pending' },
    ],
  },
];

// ============ 5 NIVEAUX D'ESCALADE ============
export const escalades: Escalade[] = [
  {
    id: 'ESC-01',
    niveau: 1,
    nom: 'Escalade Automatique — Correction Immédiate',
    description: 'Anomalies mineures détectées automatiquement. Correction sans intervention humaine. Notification informative uniquement.',
    seuilDeclenchement: 'Score qualité < 95/100, erreur SEO mineure, lien cassé',
    delaiMax: '< 15 min',
    acteurs: ['KOS Correction Engine™', 'KOS Self-Improvement Engine™'],
    actions: ['Correction automatique appliquée', 'Log d\'audit généré', 'Notification Slack #kos-auto-correction'],
    couleur: '#0D7B5F',
  },
  {
    id: 'ESC-02',
    niveau: 2,
    nom: 'Escalade Pool Lead — Révision Humaine Légère',
    description: 'Anomalies modérées nécessitant une revue humaine. Escalade au Pool Lead pour validation avant correction.',
    seuilDeclenchement: 'Score qualité < 90/100, contenu non conforme, biais détecté',
    delaiMax: '< 2h',
    acteurs: ['Pool Lead concerné', 'KOS Expert Reviewer™', 'KOS Quality Assurance Authority™'],
    actions: ['Revue humaine déclenchée', 'Correction validée par le Pool Lead', 'Rapport de non-conformité généré'],
    couleur: '#E8943A',
  },
  {
    id: 'ESC-03',
    niveau: 3,
    nom: 'Escalade Director — Investigation Approfondie',
    description: 'Anomalies majeures nécessitant une investigation approfondie. Escalade au Director du domaine pour plan d\'action.',
    seuilDeclenchement: 'Score qualité < 85/100, faille de sécurité, non-conformité réglementaire, hallucination avérée',
    delaiMax: '< 24h',
    acteurs: ['Director du domaine', 'Chief Quality Officer', 'Chief Compliance Officer'],
    actions: ['Investigation formelle ouverte', 'Plan d\'action correctif documenté', 'Notification COMEX', 'Blocage temporaire si critique'],
    couleur: '#C2410C',
  },
  {
    id: 'ESC-04',
    niveau: 4,
    nom: 'Escalade COMEX — Crise & Décision Stratégique',
    description: 'Incidents critiques avec impact business, réputationnel ou réglementaire. Convocation du COMEX KOS.',
    seuilDeclenchement: 'Incident de sécurité majeur, plainte régulateur, perte de données, faille systémique',
    delaiMax: '< 4h',
    acteurs: ['Managing Partner', 'COMEX KOS', 'Chief Risk Officer', 'KOS Crisis Management Engine™'],
    actions: ['COMEX convoqué en urgence', 'Communication de crise préparée', 'Plan de remédiation prioritaire', 'Notification régulateur si requis'],
    couleur: '#8B3040',
  },
  {
    id: 'ESC-05',
    niveau: 5,
    nom: 'Escalade Suprême — Activation Crisis Management Engine',
    description: 'Crise majeure menaçant la continuité d\'activité ou la licence d\'exploitation. Activation du protocole de crise suprême.',
    seuilDeclenchement: 'Menace existentielle : cyberattaque massive, retrait d\'agrément, crise réputationnelle systémique',
    delaiMax: '< 1h',
    acteurs: ['KOS Crisis Management Engine™', 'Managing Partner', 'Conseil d\'Administration KHEPRA', 'Cabinet d\'avocats externe'],
    actions: ['Protocole crise activé', 'Cellule de crise 24/7', 'Communication régulateur', 'Plan de continuité d\'activité', 'Revue post-crise obligatoire'],
    couleur: '#000000',
  },
];

// ============ 12 RÈGLES DE VALIDATION ============
export const reglesValidation: RegleValidation[] = [
  {
    id: 'RVL-01',
    numero: 1,
    domaine: 'Qualité',
    regle: 'Score qualité minimal 95/100',
    description: 'Aucun livrable KHEPRA ne peut être diffusé sans un score qualité minimum de 95/100 sur les 5 dimensions (exactitude, exhaustivité, clarté, conformité, impact).',
    seuil: '≥ 95/100 sur 5 dimensions',
    consequence: 'Blocage automatique de la diffusion. Renvoi au pool production pour correction.',
    severite: 'critique',
  },
  {
    id: 'RVL-02',
    numero: 2,
    domaine: 'Exactitude',
    regle: 'Zéro hallucination tolérée',
    description: 'Toute assertion factuelle doit être sourcée. L\'Anti-Hallucination System bloque automatiquement les affirmations non vérifiables.',
    seuil: '0% hallucination',
    consequence: 'Rejet automatique du livrable. Alerte Director Qualité. Investigation immédiate.',
    severite: 'critique',
  },
  {
    id: 'RVL-03',
    numero: 3,
    domaine: 'Conformité',
    regle: 'Références réglementaires exactes et à jour',
    description: 'Toute citation réglementaire doit inclure le texte exact, le numéro d\'article, la date de publication et le statut (en vigueur/abrogé).',
    seuil: '100% des références vérifiées',
    consequence: 'Correction obligatoire. Blocage si > 2 références non conformes.',
    severite: 'majeur',
  },
  {
    id: 'RVL-04',
    numero: 4,
    domaine: 'Sécurité',
    regle: 'Safe Mode obligatoire avant tout déploiement',
    description: 'Toute modification du système KOS doit passer par le Safe Mode : backup → sandbox test → validation → déploiement → monitoring.',
    seuil: '5 étapes Safe Mode complétées',
    consequence: 'Rollback automatique si une étape échoue. Notification Director Infrastructure.',
    severite: 'critique',
  },
  {
    id: 'RVL-05',
    numero: 5,
    domaine: 'Performance',
    regle: 'Core Web Vitals 100% GREEN',
    description: 'Les Core Web Vitals (LCP, CLS, TBT) doivent rester dans la zone verte Google pour toutes les pages stratégiques.',
    seuil: 'LCP < 2.5s, CLS < 0.1, TBT < 200ms',
    consequence: 'Alerte automatique. Blocage déploiement si CWV en rouge.',
    severite: 'majeur',
  },
  {
    id: 'RVL-06',
    numero: 6,
    domaine: 'Traçabilité',
    regle: 'Audit trail complet obligatoire',
    description: 'Chaque action, décision, modification et validation doit être journalisée avec horodatage, auteur, motif et résultat.',
    seuil: '100% des actions journalisées',
    consequence: 'Non-conformité remontée au Chief Compliance Officer. Correction rétroactive obligatoire.',
    severite: 'majeur',
  },
  {
    id: 'RVL-07',
    numero: 7,
    domaine: 'Éthique',
    regle: 'Pas d\'invention de faits, clients, certifications ou partenariats',
    description: 'Conformément à la KHEPRA Constitution, le système ne doit jamais inventer des faits, références, clients, certifications ou partenariats.',
    seuil: 'Zéro invention',
    consequence: 'Rejet immédiat. Escalade Niveau 4. Audit complet du pool concerné.',
    severite: 'critique',
  },
  {
    id: 'RVL-08',
    numero: 8,
    domaine: 'Délai',
    regle: 'Respect des SLA par pool',
    description: 'Chaque pool doit respecter ses SLA de traitement. Le non-respect déclenche une escalade automatique.',
    seuil: '95% des tâches dans les SLA',
    consequence: 'Escalade Niveau 2 si SLA dépassé > 10%. Niveau 3 si > 25%.',
    severite: 'majeur',
  },
  {
    id: 'RVL-09',
    numero: 9,
    domaine: 'Cross-Pool',
    regle: 'Validation cross-pool pour les livrables multi-domaines',
    description: 'Tout livrable touchant plusieurs domaines doit être validé par chaque pool concerné avant diffusion.',
    seuil: '100% des pools concernés validés',
    consequence: 'Blocage diffusion. Notification à tous les Pool Leads concernés.',
    severite: 'majeur',
  },
  {
    id: 'RVL-10',
    numero: 10,
    domaine: 'SEO/GEO',
    regle: 'Optimisation SEO/GEO pré-diffusion',
    description: 'Toute publication publique doit être optimisée SEO (title, meta, Hn, Schema.org) et GEO (llms.txt, format Q&A) avant diffusion.',
    seuil: 'Score SEO ≥ 9/10, Score GEO ≥ 85/100',
    consequence: 'Retour au pool SEO/GEO pour optimisation. Blocage diffusion si non conforme.',
    severite: 'mineur',
  },
  {
    id: 'RVL-11',
    numero: 11,
    domaine: 'Formation',
    regle: 'Certification des formateurs obligatoire',
    description: 'Tout formateur KHEPRA doit être certifié sur le module qu\'il délivre. La certification est valide 12 mois.',
    seuil: '100% des formateurs certifiés',
    consequence: 'Retrait temporaire du formateur non certifié. Session reprogrammée.',
    severite: 'mineur',
  },
  {
    id: 'RVL-12',
    numero: 12,
    domaine: 'RGPD',
    regle: 'Conformité RGPD 100%',
    description: 'Tout traitement de données personnelles doit respecter le RGPD : consentement, minimisation, droit d\'accès, droit à l\'oubli.',
    seuil: '100% conforme RGPD',
    consequence: 'Blocage immédiat du traitement. Notification DPO. Escalade Niveau 3.',
    severite: 'critique',
  },
];

// ============ KPIS CONSOLIDÉS ============
export const orchestrationKPIs: OrKPI[] = [
  // KPIs TEMPS
  { id: 'KPI-T-01', categorie: 'temps', nom: 'Temps moyen de traitement par tâche', description: 'Temps moyen entre la détection d\'une tâche et sa complétion, tous pools confondus.', valeurActuelle: '4.2 min', cible: '< 3 min', tendance: '-0.8 min', unite: 'min', poolId: 'all', icon: 'ri-timer-line' },
  { id: 'KPI-T-02', categorie: 'temps', nom: 'Délai détection → alerte (Pool Veille)', description: 'Temps entre la publication d\'une information réglementaire et son alerte KOS.', valeurActuelle: '4.2 min', cible: '< 3 min', tendance: '-1.1 min', unite: 'min', poolId: 'pool-veille', icon: 'ri-notification-line' },
  { id: 'KPI-T-03', categorie: 'temps', nom: 'Délai soumission AO', description: 'Temps entre la détection d\'un AO et la soumission de la proposition.', valeurActuelle: '3.2 j', cible: '< 2 j', tendance: '-0.5 j', unite: 'jours', poolId: 'pool-ao', icon: 'ri-file-search-line' },
  { id: 'KPI-T-04', categorie: 'temps', nom: 'Cycle publication Thought Leadership', description: 'Temps entre le brief recherche et la publication finale.', valeurActuelle: '15 j', cible: '< 12 j', tendance: '-2 j', unite: 'jours', poolId: 'pool-recherche', icon: 'ri-article-line' },
  { id: 'KPI-T-05', categorie: 'temps', nom: 'Délai contrôle qualité', description: 'Temps moyen de revue qualité d\'un livrable par le pool Qualité.', valeurActuelle: '12 min', cible: '< 8 min', tendance: '-3 min', unite: 'min', poolId: 'pool-qualite', icon: 'ri-verified-badge-line' },
  { id: 'KPI-T-06', categorie: 'temps', nom: 'SLA respectés', description: 'Pourcentage des tâches traitées dans les SLA définis par pool.', valeurActuelle: '94%', cible: '98%', tendance: '+2%', unite: '%', poolId: 'all', icon: 'ri-check-double-line' },

  // KPIs QUALITÉ
  { id: 'KPI-Q-01', categorie: 'qualite', nom: 'Score qualité global KOS', description: 'Score qualité moyen de tous les livrables KOS sur les 5 dimensions.', valeurActuelle: '96.2/100', cible: '97/100', tendance: '+0.4', unite: '/100', poolId: 'all', icon: 'ri-verified-badge-line' },
  { id: 'KPI-Q-02', categorie: 'qualite', nom: 'Taux de rejet qualité', description: 'Pourcentage des livrables rejetés pour score qualité insuffisant.', valeurActuelle: '2.4%', cible: '< 1%', tendance: '-0.6%', unite: '%', poolId: 'pool-qualite', icon: 'ri-close-circle-line' },
  { id: 'KPI-Q-03', categorie: 'qualite', nom: 'Score conformité réglementaire', description: 'Taux de conformité des livrables aux exigences réglementaires.', valeurActuelle: '94%', cible: '98%', tendance: '+1%', unite: '%', poolId: 'pool-conformite', icon: 'ri-shield-check-line' },
  { id: 'KPI-Q-04', categorie: 'qualite', nom: 'Taux d\'hallucination', description: 'Pourcentage d\'assertions non vérifiables détectées par l\'Anti-Hallucination System.', valeurActuelle: '0.12%', cible: '< 0.05%', tendance: '-0.03%', unite: '%', poolId: 'pool-qualite', icon: 'ri-brain-line' },
  { id: 'KPI-Q-05', categorie: 'qualite', nom: 'Score SEO', description: 'Score SEO technique global du site KHEPRA.', valeurActuelle: '9.6/10', cible: '9.8/10', tendance: '+0.1', unite: '/10', poolId: 'pool-seo-geo', icon: 'ri-search-line' },
  { id: 'KPI-Q-06', categorie: 'qualite', nom: 'Score GEO (AI Visibility)', description: 'Score de visibilité sur les moteurs génératifs (ChatGPT, Claude, Perplexity).', valeurActuelle: '92/100', cible: '95/100', tendance: '+2', unite: '/100', poolId: 'pool-seo-geo', icon: 'ri-robot-line' },

  // KPIs PRODUCTIVITÉ
  { id: 'KPI-P-01', categorie: 'productivite', nom: 'Livrables produits / mois', description: 'Nombre total de livrables produits par l\'ensemble des pools KOS.', valeurActuelle: '847', cible: '1 000', tendance: '+48', unite: 'livrables', poolId: 'all', icon: 'ri-stack-line' },
  { id: 'KPI-P-02', categorie: 'productivite', nom: 'Taux d\'automatisation', description: 'Pourcentage des tâches exécutées sans intervention humaine.', valeurActuelle: '87%', cible: '95%', tendance: '+3%', unite: '%', poolId: 'all', icon: 'ri-cpu-line' },
  { id: 'KPI-P-03', categorie: 'productivite', nom: 'Publications/mois (Recherche)', description: 'Nombre de publications intellectuelles produites par mois.', valeurActuelle: '12', cible: '15', tendance: '+1', unite: 'pubs', poolId: 'pool-recherche', icon: 'ri-article-line' },
  { id: 'KPI-P-04', categorie: 'productivite', nom: 'AO traités / mois', description: 'Nombre d\'appels d\'offres analysés et traités par mois.', valeurActuelle: '51', cible: '80', tendance: '+5', unite: 'AO', poolId: 'pool-ao', icon: 'ri-file-search-line' },
  { id: 'KPI-P-05', categorie: 'productivite', nom: 'Apprenants formés / mois', description: 'Nombre d\'apprenants ayant complété une formation KHEPRA.', valeurActuelle: '1 240', cible: '2 000', tendance: '+120', unite: 'apprenants', poolId: 'pool-formation', icon: 'ri-graduation-cap-line' },
  { id: 'KPI-P-06', categorie: 'productivite', nom: 'Score Big Four global', description: 'Score d\'alignement global KOS sur les standards Big Four (moyenne des 7 pools).', valeurActuelle: '92.3', cible: '95', tendance: '+1.2', unite: '/100', poolId: 'all', icon: 'ri-medal-line' },
];

// ============ STATISTIQUES GLOBALES ============
export const orchestrationStats = {
  totalPools: 7,
  totalAgents: 51,
  workflowsActifs: 5,
  reglesValidation: 12,
  niveauxEscalade: 5,
  scoreBigFourMoyen: 92.3,
  scoreQualiteMoyen: 96.2,
  tauxAutomatisation: 87,
  livrablesMensuels: 847,
  tempsReponseMoyen: '4.2 min',
  slaRespectes: '94%',
};





