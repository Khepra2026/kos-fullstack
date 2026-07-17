export interface GovernanceOrgan {
  name: string;
  role: string;
  icon: string;
  responsibilities: string[];
  composition?: string[];
}

export const governanceOrgans: GovernanceOrgan[] = [
  {
    name: 'KOS Governance Council™',
    role: 'Autorité suprême',
    icon: 'ri-building-2-line',
    responsibilities: [
      'Vision stratégique',
      'Approbation des évolutions majeures',
      'Arbitrage des conflits',
      'Validation des standards',
    ],
    composition: [
      'Managing Partner',
      'Chief Knowledge Officer',
      'Chief AI Officer',
      'Chief Risk Officer',
      'Chief Compliance Officer',
    ],
  },
  {
    name: 'KOS Executive Committee™',
    role: 'Responsable de l\'exécution',
    icon: 'ri-organization-chart',
    responsibilities: [
      'Pilotage opérationnel',
      'Allocation des ressources',
      'Suivi des KPI',
      'Gestion des priorités',
    ],
  },
  {
    name: 'KOS Quality Council™',
    role: 'Garant de la qualité',
    icon: 'ri-award-line',
    responsibilities: [
      'Qualité des livrables',
      'Méthodologies',
      'Conformité documentaire',
    ],
    composition: [
      'Droit de blocage : tout livrable non conforme',
    ],
  },
  {
    name: 'KOS Knowledge Council™',
    role: 'Gardien des connaissances',
    icon: 'ri-book-open-line',
    responsibilities: [
      'Validation des connaissances',
      'Référentiels',
      'Taxonomies',
      'Versionning',
    ],
  },
  {
    name: 'KOS Ethics & AI Board™',
    role: 'IA responsable',
    icon: 'ri-shield-star-line',
    responsibilities: [
      'IA responsable',
      'Détection des biais',
      'Transparence',
      'Explicabilité',
    ],
  },
];

export interface CharterArticle {
  num: number;
  title: string;
  icon: string;
  items: string[];
  note?: string;
  subsections?: { title: string; items: string[]; role?: string }[];
  levels?: { level: string; desc: string }[];
  categories?: { name: string; desc: string }[];
  kpis?: { label: string; value: string }[];
}

export const governanceCharterArticles: CharterArticle[] = [
  {
    num: 1,
    title: 'Objet',
    icon: 'ri-article-line',
    items: [
      'Les organes de gouvernance',
      'Les responsabilités',
      'Les pouvoirs de décision',
      'Les mécanismes de contrôle',
      'Les procédures d\'escalade',
      'Les règles de supervision des agents KOS',
    ],
    note: 'La présente Charte définit le cadre de gouvernance officiel du KOS Enterprise Advisory Operating System™.',
  },
  {
    num: 2,
    title: 'Principes Directeurs',
    icon: 'ri-compass-3-line',
    items: [
      'La Constitution KOS™',
      'Les exigences de conformité',
      'Les standards de qualité',
      'Les intérêts du client',
      'Les principes d\'IA responsable',
    ],
    note: 'Toute décision doit respecter ces cinq principes directeurs.',
  },
  {
    num: 3,
    title: 'Organes de Gouvernance',
    icon: 'ri-building-2-line',
    items: [
      'KOS Governance Council™ — Autorité suprême',
      'KOS Executive Committee™ — Exécution',
      'KOS Quality Council™ — Qualité',
      'KOS Knowledge Council™ — Connaissances',
      'KOS Ethics & AI Board™ — IA responsable',
    ],
    note: 'Cinq organes distincts aux responsabilités clairement définies.',
    subsections: [
      {
        title: 'KOS Governance Council™',
        role: 'Autorité suprême',
        items: [
          'Vision stratégique',
          'Approbation des évolutions majeures',
          'Arbitrage des conflits',
          'Validation des standards',
        ],
      },
      {
        title: 'KOS Executive Committee™',
        role: 'Responsable de l\'exécution',
        items: [
          'Pilotage opérationnel',
          'Allocation des ressources',
          'Suivi des KPI',
          'Gestion des priorités',
        ],
      },
      {
        title: 'KOS Quality Council™',
        role: 'Garant de la qualité',
        items: [
          'Contrôle qualité',
          'Méthodologies',
          'Conformité documentaire',
        ],
      },
      {
        title: 'KOS Knowledge Council™',
        role: 'Gardien des connaissances',
        items: [
          'Validation des connaissances',
          'Référentiels',
          'Taxonomies',
          'Versionning',
        ],
      },
      {
        title: 'KOS Ethics & AI Board™',
        role: 'IA responsable',
        items: [
          'Explicabilité',
          'Détection des biais',
          'Transparence',
          'Conformité IA',
        ],
      },
    ],
  },
  {
    num: 4,
    title: 'Matrice des Responsabilités (RACI)',
    icon: 'ri-table-line',
    items: [
      'R = Responsible (exécute)',
      'A = Accountable (approuve)',
      'C = Consulted (consulté)',
      'I = Informed (informé)',
    ],
    note: 'Une matrice RACI doit exister pour chaque moteur KOS.',
    categories: [
      { name: 'Stratégie', desc: 'Governance Council (A), Executive Committee (R)' },
      { name: 'Qualité', desc: 'Quality Council (A), Agents (R)' },
      { name: 'Conformité', desc: 'Compliance Officer (A), Tous les agents (R)' },
      { name: 'Sécurité', desc: 'CISO (A), IT Ops (R)' },
      { name: 'Données', desc: 'CDO (A), Knowledge Council (R)' },
      { name: 'Innovation', desc: 'Innovation Lab (A), R&D Agents (R)' },
      { name: 'Publications', desc: 'Executive Committee (A), Publishing Engine (R)' },
    ],
  },
  {
    num: 5,
    title: 'Pouvoirs de Décision',
    icon: 'ri-stack-line',
    items: [],
    levels: [
      { level: 'Niveau 1', desc: 'Décisions opérationnelles — Agents et workflows autonomes' },
      { level: 'Niveau 2', desc: 'Décisions méthodologiques — Quality Council et Knowledge Council' },
      { level: 'Niveau 3', desc: 'Décisions stratégiques — Executive Committee' },
      { level: 'Niveau 4', desc: 'Décisions constitutionnelles — Governance Council (autorité suprême)' },
    ],
    note: 'Chaque niveau de décision dispose de prérogatives exclusives. Aucun niveau inférieur ne peut contredire un niveau supérieur.',
  },
  {
    num: 6,
    title: 'Gestion des Risques',
    icon: 'ri-alert-line',
    items: [
      'Risques stratégiques',
      'Risques réglementaires',
      'Risques IA',
      'Risques cyber',
      'Risques réputationnels',
      'Risques opérationnels',
    ],
    note: 'Registre des risques obligatoire. Révision mensuelle minimum.',
  },
  {
    num: 7,
    title: 'Contrôle Qualité',
    icon: 'ri-check-double-line',
    items: [
      'Exactitude',
      'Cohérence',
      'Conformité',
      'Utilité',
      'Traçabilité',
    ],
    note: 'Score minimum : 95/100. Tout livrable inférieur est bloqué.',
  },
  {
    num: 8,
    title: 'Gouvernance des Données',
    icon: 'ri-database-2-line',
    items: [
      'Publiques',
      'Internes',
      'Confidentielles',
      'Restreintes',
      'Critiques',
    ],
    note: 'Chaque catégorie possède des règles d\'accès, de conservation et de diffusion spécifiques.',
  },
  {
    num: 9,
    title: 'Gouvernance des Agents IA',
    icon: 'ri-robot-2-line',
    items: [
      'Une fiche d\'identité',
      'Une mission claire',
      'Un périmètre défini',
      'Un niveau d\'autorité',
      'Des KPI mesurables',
      'Un journal d\'activité',
    ],
    note: 'Chaque agent doit posséder ces six éléments obligatoires.',
  },
  {
    num: 10,
    title: 'Auditabilité',
    icon: 'ri-file-search-line',
    items: [
      'Enregistrée',
      'Horodatée',
      'Documentée',
      'Justifiée',
    ],
    note: 'Toute décision importante doit être tracée et justifiable.',
  },
  {
    num: 11,
    title: 'Gestion des Changements',
    icon: 'ri-settings-4-line',
    items: [
      '1. Proposition',
      '2. Analyse d\'impact',
      '3. Validation',
      '4. Déploiement',
      '5. Contrôle post-déploiement',
    ],
    note: 'Processus en 5 étapes obligatoire pour toute modification du système.',
  },
  {
    num: 12,
    title: 'Revue Périodique',
    icon: 'ri-calendar-check-line',
    items: [
      'Hebdomadaire — Suivi opérationnel',
      'Mensuelle — Revue des risques',
      'Trimestrielle — Audit qualité complet',
      'Annuelle — Revue stratégique et constitutionnelle',
    ],
  },
  {
    num: 13,
    title: 'Indicateurs Stratégiques',
    icon: 'ri-line-chart-line',
    items: [],
    kpis: [
      { label: 'Précision', value: '≥ 98%' },
      { label: 'Conformité', value: '≥ 98%' },
      { label: 'Satisfaction', value: '≥ 95%' },
      { label: 'Adoption', value: '≥ 90%' },
      { label: 'Valeur créée', value: '≥ 85%' },
      { label: 'Productivité', value: '+40%' },
      { label: 'Rentabilité', value: '≥ 30%' },
    ],
  },
  {
    num: 14,
    title: 'Gestion de Crise',
    icon: 'ri-shield-flash-line',
    items: [
      'Incident majeur',
      'Faille de sécurité',
      'Non-conformité critique',
      'Défaillance systémique',
    ],
    note: 'Activation immédiate du KOS Crisis Management Engine™ en cas de crise.',
  },
  {
    num: 15,
    title: 'Dispositions Finales',
    icon: 'ri-scales-3-line',
    items: [
      'Tous les agents',
      'Tous les workflows',
      'Tous les moteurs',
      'Toutes les données',
      'Toutes les productions',
    ],
    note: 'Cette Charte est obligatoire pour l\'ensemble de l\'écosystème KOS et constitue le cadre de gouvernance officiel du KOS Enterprise Advisory Operating System™.',
  },
];

export const governanceCharterIntro = {
  title: 'KOS Governance Charter™',
  subtitle: 'Charte de Gouvernance de l\'Écosystème KOS',
  version: 'VERSION ENTREPRISE',
  preamble: `La présente Charte de Gouvernance définit les organes de gouvernance, les responsabilités, les pouvoirs de décision, les mécanismes de contrôle, les procédures d'escalade et les règles de supervision des agents KOS. Elle constitue le cadre de gouvernance officiel du KOS Enterprise Advisory Operating System™ et s'inscrit au Niveau 2 de la Hiérarchie des Autorités définie par la Constitution KOS™.`,
};