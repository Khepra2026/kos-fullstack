export interface ArchitecturePrinciple {
  num: number;
  title: string;
  subtitle: string;
  icon: string;
}

export const architecturePrinciples: ArchitecturePrinciple[] = [
  {
    num: 1,
    title: 'Knowledge First™',
    subtitle: 'Toute décision repose sur une base de connaissances vérifiée.',
    icon: 'ri-database-2-line',
  },
  {
    num: 2,
    title: 'AI-Augmented Advisory™',
    subtitle: 'L\'IA assiste les experts mais ne remplace pas la gouvernance humaine.',
    icon: 'ri-robot-2-line',
  },
  {
    num: 3,
    title: 'Evidence-Based™',
    subtitle: 'Chaque recommandation doit être traçable jusqu\'à sa source.',
    icon: 'ri-scales-3-line',
  },
  {
    num: 4,
    title: 'Security by Design™',
    subtitle: 'La sécurité est intégrée dès la conception, pas ajoutée a posteriori.',
    icon: 'ri-shield-keyhole-line',
  },
  {
    num: 5,
    title: 'Modularité',
    subtitle: 'Chaque moteur KOS est indépendant mais interconnecté au système.',
    icon: 'ri-git-branch-line',
  },
];

export interface ArchitectureLayer {
  num: number;
  title: string;
  icon: string;
  gradient: string;
  border: string;
  lightBg: string;
  components: { name: string; description: string; icon: string; items: string[] }[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    num: 3,
    title: 'Couche Expérience — Interfaces',
    icon: 'ri-window-line',
    gradient: 'from-deloitte-500/15 to-deloitte-500/5',
    border: 'border-deloitte-300/60',
    lightBg: 'bg-deloitte-50',
    components: [
      {
        name: 'Site web Khepra Experts',
        description: 'Acquisition, diagnostic, prise de rendez-vous',
        icon: 'ri-global-line',
        items: ['Acquisition de prospects', 'Diagnostics interactifs', 'Prise de rendez-vous automatisée'],
      },
      {
        name: 'Portail Client',
        description: 'Espace documentaire, rapports, KPI, suivi missions',
        icon: 'ri-user-line',
        items: ['Espace documentaire sécurisé', 'Rapports et tableaux de bord', 'KPI en temps réel', 'Suivi des missions en cours'],
      },
      {
        name: 'Portail Experts',
        description: 'Supervision, validation, gouvernance',
        icon: 'ri-user-star-line',
        items: ['Supervision des agents IA', 'Validation des livrables', 'Gouvernance opérationnelle'],
      },
      {
        name: 'Portail Conseil d\'Administration',
        description: 'PV, décisions, risques, tableaux de bord',
        icon: 'ri-building-2-line',
        items: ['Procès-verbaux', 'Suivi des décisions', 'Cartographie des risques', 'Tableaux de bord board-ready'],
      },
    ],
  },
  {
    num: 4,
    title: 'Couche Conversationnelle',
    icon: 'ri-chat-3-line',
    gradient: 'from-accent-500/15 to-accent-500/5',
    border: 'border-accent-300/60',
    lightBg: 'bg-accent-50',
    components: [
      {
        name: 'Agents Experts KOS',
        description: 'Stratégie, Finance, Audit, Fiscalité, Juridique, RH, ESG, IA, Cybersécurité',
        icon: 'ri-robot-2-line',
        items: ['9 domaines d\'expertise', 'Réponse structurée Big Four', 'Personnalisation sectorielle', 'Détection de contexte'],
      },
      {
        name: 'Orchestrateur Conversationnel',
        description: 'Routage, priorisation, collaboration multi-agents, synthèse',
        icon: 'ri-cpu-line',
        items: ['Routage intelligent des requêtes', 'Priorisation dynamique', 'Collaboration multi-agents', 'Synthèse consolidée'],
      },
    ],
  },
  {
    num: 5,
    title: 'Couche d\'Orchestration',
    icon: 'ri-settings-4-line',
    gradient: 'from-amber-500/15 to-amber-500/5',
    border: 'border-amber-300/60',
    lightBg: 'bg-amber-50',
    components: [
      {
        name: 'KOS Global Orchestrator Supreme™',
        description: 'Coordination, supervision, arbitrage, optimisation',
        icon: 'ri-shield-star-line',
        items: ['Coordination des 100 moteurs', 'Supervision en temps réel', 'Arbitrage des conflits', 'Optimisation continue'],
      },
      {
        name: 'Workflow Engine',
        description: 'LangGraph, LangChain, CrewAI, Temporal, n8n',
        icon: 'ri-git-merge-line',
        items: ['Orchestration de workflows complexes', 'Chaînage d\'agents IA', 'Planification et exécution', 'Multi-technologies compatibles'],
      },
    ],
  },
  {
    num: 6,
    title: 'Couche Knowledge',
    icon: 'ri-book-open-line',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
    border: 'border-emerald-300/60',
    lightBg: 'bg-emerald-50',
    components: [
      {
        name: 'Knowledge Hub™',
        description: 'Études, normes, méthodologies, procédures, modèles',
        icon: 'ri-folder-open-line',
        items: ['Base documentaire structurée', 'Méthodologies internationales', 'Procédures opérationnelles', 'Modèles réutilisables'],
      },
      {
        name: 'Knowledge Graph™',
        description: 'Relations Client↔Secteur↔Risques↔Contrôles↔Normes↔Recommandations',
        icon: 'ri-node-tree',
        items: ['Graphe de connaissances interconnecté', 'Relations sémantiques riches', 'Inférence contextuelle', 'Navigation intelligente'],
      },
      {
        name: 'Vector Database™',
        description: 'RAG, recherche sémantique, FAQ — Pinecone, Weaviate, Qdrant, pgvector',
        icon: 'ri-search-eye-line',
        items: ['Recherche vectorielle sémantique', 'RAG (Retrieval-Augmented Generation)', 'FAQ intelligente', 'Multi-backend compatible'],
      },
    ],
  },
  {
    num: 7,
    title: 'Couche Données',
    icon: 'ri-database-2-line',
    gradient: 'from-teal-500/15 to-teal-500/5',
    border: 'border-teal-300/60',
    lightBg: 'bg-teal-50',
    components: [
      {
        name: 'Data Lake',
        description: 'Stockage brut — documents, sites web, réglementations, bases externes',
        icon: 'ri-archive-line',
        items: ['Stockage multi-sources', 'Formats hétérogènes', 'Scalabilité horizontale', 'Données brutes préservées'],
      },
      {
        name: 'Data Warehouse',
        description: 'Données structurées pour reporting, KPI, tableaux de bord',
        icon: 'ri-bar-chart-2-line',
        items: ['Données nettoyées et structurées', 'Reporting multidimensionnel', 'KPI consolidés', 'Tableaux de bord exécutifs'],
      },
      {
        name: 'Master Data Management',
        description: 'Référentiels — clients, experts, secteurs, réglementations',
        icon: 'ri-key-line',
        items: ['Golden records unifiés', 'Référentiels maîtres', 'Gouvernance des données', 'Qualité et dédoublonnage'],
      },
    ],
  },
  {
    num: 8,
    title: 'Couche Intelligence',
    icon: 'ri-brain-line',
    gradient: 'from-purple-500/15 to-purple-500/5',
    border: 'border-purple-300/60',
    lightBg: 'bg-purple-50',
    components: [
      {
        name: 'Diagnostic Engine™',
        description: 'Scoring, benchmarking, maturité organisationnelle',
        icon: 'ri-stethoscope-line',
        items: ['Scoring automatique', 'Benchmarking sectoriel', 'Évaluation de maturité', 'Gap analysis'],
      },
      {
        name: 'Risk Engine™',
        description: 'Cartographie, évaluation, priorisation des risques',
        icon: 'ri-alert-line',
        items: ['Cartographie des risques', 'Évaluation quantitative', 'Priorisation automatisée', 'Heat maps dynamiques'],
      },
      {
        name: 'Recommendation Engine™',
        description: 'Recommandations, plans d\'action, quick wins',
        icon: 'ri-lightbulb-flash-line',
        items: ['Recommandations personnalisées', 'Plans d\'action séquencés', 'Quick wins identifiés', 'Fondement réglementaire'],
      },
      {
        name: 'Predictive Engine™',
        description: 'Prévisions, scénarios, simulations prospectives',
        icon: 'ri-line-chart-line',
        items: ['Prévisions financières', 'Scénarios prospectifs', 'Simulations Monte Carlo', 'Stress tests automatisés'],
      },
    ],
  },
  {
    num: 9,
    title: 'Couche Documentaire',
    icon: 'ri-file-text-line',
    gradient: 'from-rose-500/15 to-rose-500/5',
    border: 'border-rose-300/60',
    lightBg: 'bg-rose-50',
    components: [
      {
        name: 'Document Factory™',
        description: 'Rapports, diagnostics, audits, offres, PV',
        icon: 'ri-file-list-3-line',
        items: ['Génération automatisée', 'Mise en page professionnelle', 'Templates Big Four', 'Horodatage et certification'],
      },
      {
        name: 'Template Repository™',
        description: 'Bibliothèque de modèles, SOP, guides, checklists',
        icon: 'ri-folder-5-line',
        items: ['Modèles standardisés', 'SOP documentées', 'Guides méthodologiques', 'Checklists de conformité'],
      },
    ],
  },
  {
    num: 10,
    title: 'Couche CRM',
    icon: 'ri-user-heart-line',
    gradient: 'from-sky-500/15 to-sky-500/5',
    border: 'border-sky-300/60',
    lightBg: 'bg-sky-50',
    components: [
      {
        name: 'CRM Advisory™',
        description: 'Leads, prospects, clients, opportunités',
        icon: 'ri-organization-chart',
        items: ['Gestion des leads', 'Pipeline commercial', 'Suivi des opportunités', 'Historique client 360°'],
      },
      {
        name: 'Lead Scoring Engine™',
        description: 'Intérêt, urgence, budget, potentiel',
        icon: 'ri-user-search-line',
        items: ['Scoring automatique /100', 'Classification Cold/Warm/Hot', 'Priorisation commerciale', 'Transmission aux consultants'],
      },
    ],
  },
  {
    num: 11,
    title: 'Couche ERP',
    icon: 'ri-calculator-line',
    gradient: 'from-indigo-500/15 to-indigo-500/5',
    border: 'border-indigo-300/60',
    lightBg: 'bg-indigo-50',
    components: [
      {
        name: 'ERP Advisory',
        description: 'Missions, ressources, temps, facturation, rentabilité',
        icon: 'ri-pie-chart-2-line',
        items: ['Gestion des missions', 'Allocation des ressources', 'Suivi des temps', 'Facturation et rentabilité'],
      },
    ],
  },
  {
    num: 12,
    title: 'Couche Think Tank',
    icon: 'ri-lightbulb-flash-line',
    gradient: 'from-orange-500/15 to-orange-500/5',
    border: 'border-orange-300/60',
    lightBg: 'bg-orange-50',
    components: [
      {
        name: 'Research Lab™',
        description: 'Études, baromètres, observatoires sectoriels',
        icon: 'ri-flask-line',
        items: ['Études originales', 'Baromètres économiques', 'Observatoires sectoriels', 'Analyses prospectives'],
      },
      {
        name: 'Publication Engine™',
        description: 'Site web, réseaux sociaux, newsletter',
        icon: 'ri-megaphone-line',
        items: ['Publication web', 'Diffusion réseaux sociaux', 'Newsletter automatisée', 'SEO optimisé'],
      },
    ],
  },
  {
    num: 13,
    title: 'Couche Automatisation',
    icon: 'ri-settings-4-line',
    gradient: 'from-lime-500/15 to-lime-500/5',
    border: 'border-lime-300/60',
    lightBg: 'bg-lime-50',
    components: [
      {
        name: 'Automation Hub™',
        description: 'Publications, veille, rapports, notifications',
        icon: 'ri-loop-left-line',
        items: ['Automatisation des publications', 'Veille automatisée', 'Rapports auto-générés', 'Notifications programmées'],
      },
      {
        name: 'Event Bus™',
        description: 'Gestion des événements — Kafka, RabbitMQ, NATS',
        icon: 'ri-swap-line',
        items: ['File d\'événements distribuée', 'Découplage des services', 'Haute disponibilité', 'Scalabilité horizontale'],
      },
    ],
  },
  {
    num: 14,
    title: 'Couche Sécurité',
    icon: 'ri-shield-check-line',
    gradient: 'from-red-500/15 to-red-500/5',
    border: 'border-red-300/60',
    lightBg: 'bg-red-50',
    components: [
      {
        name: 'Identity & Access Management',
        description: 'Identités, rôles, accès, authentification',
        icon: 'ri-lock-line',
        items: ['Identités centralisées', 'Contrôle d\'accès granulaire', 'Multi-facteur authentification', 'SSO et fédération'],
      },
      {
        name: 'Security Operations Center',
        description: 'Surveillance, détection, réponse aux incidents',
        icon: 'ri-radar-line',
        items: ['Surveillance 24/7', 'Détection d\'intrusion', 'Réponse automatisée', 'Forensic et investigation'],
      },
      {
        name: 'Audit Logs',
        description: 'Journalisation complète de toutes les opérations',
        icon: 'ri-file-search-line',
        items: ['Journalisation exhaustive', 'Traçabilité complète', 'Horodatage certifié', 'Conservation à long terme'],
      },
    ],
  },
  {
    num: 15,
    title: 'Couche Observabilité',
    icon: 'ri-dashboard-line',
    gradient: 'from-cyan-500/15 to-cyan-500/5',
    border: 'border-cyan-300/60',
    lightBg: 'bg-cyan-50',
    components: [
      {
        name: 'Dashboards',
        description: 'Direction, Opérations, Qualité, Conformité',
        icon: 'ri-bar-chart-grouped-line',
        items: ['Disponibilité système', 'Performances temps réel', 'Taux d\'erreurs', 'Score de satisfaction'],
      },
    ],
  },
  {
    num: 16,
    title: 'Couche IA Responsable',
    icon: 'ri-shield-star-line',
    gradient: 'from-violet-500/15 to-violet-500/5',
    border: 'border-violet-300/60',
    lightBg: 'bg-violet-50',
    components: [
      {
        name: 'Contrôle IA Responsable',
        description: 'Hallucinations, biais, conformité, explicabilité',
        icon: 'ri-scales-3-line',
        items: ['Détection des hallucinations', 'Contrôle des biais algorithmiques', 'Conformité réglementaire', 'Explicabilité des décisions'],
      },
      {
        name: 'Validation Humaine',
        description: 'Obligatoire pour décisions critiques, rapports officiels, avis réglementaires',
        icon: 'ri-user-voice-line',
        items: ['Décisions critiques', 'Rapports officiels', 'Avis réglementaires', 'Boucle de validation humaine'],
      },
    ],
  },
  {
    num: 17,
    title: 'Couche Continuité',
    icon: 'ri-cloud-line',
    gradient: 'from-slate-500/15 to-slate-500/5',
    border: 'border-slate-300/60',
    lightBg: 'bg-slate-50',
    components: [
      {
        name: 'Sauvegarde',
        description: 'Backup quotidien automatisé',
        icon: 'ri-upload-cloud-2-line',
        items: ['Sauvegarde quotidienne', 'Rétention multi-périodes', 'Chiffrement des backups', 'Tests de restauration'],
      },
      {
        name: 'Disaster Recovery',
        description: 'RTO cible : 4 heures · RPO cible : 1 heure',
        icon: 'ri-refresh-line',
        items: ['RTO ≤ 4 heures', 'RPO ≤ 1 heure', 'Plan de continuité d\'activité', 'Tests DR semestriels'],
      },
    ],
  },
];

export interface ArchitectureFlow {
  step: number;
  label: string;
  icon: string;
}

export const architectureFlow: ArchitectureFlow[] = [
  { step: 1, label: 'Site Khepra Experts', icon: 'ri-global-line' },
  { step: 2, label: 'Agents Experts KOS', icon: 'ri-robot-2-line' },
  { step: 3, label: 'Orchestrateur KOS', icon: 'ri-cpu-line' },
  { step: 4, label: 'Knowledge Graph + Vector DB + RAG', icon: 'ri-node-tree' },
  { step: 5, label: 'Diagnostic Engine + Risk Engine', icon: 'ri-stethoscope-line' },
  { step: 6, label: 'Document Factory', icon: 'ri-file-list-3-line' },
  { step: 7, label: 'CRM + ERP', icon: 'ri-pie-chart-2-line' },
  { step: 8, label: 'Reporting + Monitoring', icon: 'ri-dashboard-line' },
  { step: 9, label: 'Gouvernance + Contrôle Qualité', icon: 'ri-shield-check-line' },
];

export interface StackItem {
  category: string;
  icon: string;
  technologies: string[];
}

export const recommendedStack: StackItem[] = [
  { category: 'Front-End', icon: 'ri-window-line', technologies: ['Next.js', 'React'] },
  { category: 'Back-End', icon: 'ri-server-line', technologies: ['FastAPI', 'Python'] },
  { category: 'Agents IA', icon: 'ri-robot-2-line', technologies: ['LangGraph', 'CrewAI'] },
  { category: 'Workflow', icon: 'ri-git-merge-line', technologies: ['n8n', 'Temporal'] },
  { category: 'Base relationnelle', icon: 'ri-database-2-line', technologies: ['PostgreSQL'] },
  { category: 'Vector Database', icon: 'ri-search-eye-line', technologies: ['Qdrant'] },
  { category: 'Recherche', icon: 'ri-file-search-line', technologies: ['Elasticsearch'] },
  { category: 'CRM', icon: 'ri-user-heart-line', technologies: ['HubSpot', 'Odoo'] },
  { category: 'ERP', icon: 'ri-calculator-line', technologies: ['Odoo Enterprise'] },
  { category: 'Monitoring', icon: 'ri-dashboard-line', technologies: ['Grafana', 'Prometheus'] },
  { category: 'Logs', icon: 'ri-file-text-line', technologies: ['OpenSearch'] },
  { category: 'Cloud', icon: 'ri-cloud-line', technologies: ['Azure', 'AWS'] },
];

export const blueprintIntro = {
  title: 'KOS Enterprise Architecture Blueprint™',
  subtitle: 'Architecture de Référence',
  version: 'VERSION BIG FOUR DIGITAL ADVISORY PLATFORM',
  objective: 'Définir l\'architecture cible permettant à KOS de fonctionner comme une plateforme intégrée de conseil, audit, gouvernance, conformité, recherche, intelligence stratégique, automatisation et gestion des connaissances. Cette architecture doit être scalable, sécurisée, auditée, modulaire, interopérable et gouvernable.',
  finalObjective: 'Faire fonctionner KOS comme un cabinet de conseil numérique, une plateforme d\'intelligence stratégique, un centre d\'expertise OHADA et un système de gouvernance augmenté par IA — capable de servir simultanément des milliers d\'organisations tout en maintenant des standards de qualité comparables aux meilleures pratiques internationales.',
};