// ============================================================
// KOS PRODUCTION SOVEREIGNTY — Mise en Production Souveraine
// Infrastructure Réelle 100% Big Four + ISO
// 7 Workstreams · Score actuel → Cible 100% Production
// Version 2026.06.26 — ULTIME CAPSTONE
// ============================================================

export interface SovereigntyAction {
  id: string;
  wsId: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  standardVise: string;
  deadline: string;
  statut: 'non_demarre' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiAction: string;
  dependances: string[];
}

export interface SovereigntyMilestone {
  id: string;
  nom: string;
  date: string;
  wsId: string;
  actionsLiees: string[];
  statut: 'a_venir' | 'atteint' | 'retard';
}

export interface ProductionWorkstream {
  id: string;
  numero: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  scoreActuel: number;
  scoreCible: number;
  budgetTotal: string;
  responsable: string;
  progressionGlobale: number;
  statutGlobal: 'critique' | 'en_cours' | 'progresse' | 'maitrise';
  description: string;
  actions: SovereigntyAction[];
  jalons: SovereigntyMilestone[];
  jalonFinal: string;
}

export const PRODUCTION_WORKSTREAMS: ProductionWorkstream[] = [
  // ===== WS-1 : INFRASTRUCTURE RÉELLE 100% BIG FOUR + ISO =====
  {
    id: 'ws-infra',
    numero: 'WS-1',
    nom: 'Infrastructure Réelle 100% Big Four + ISO',
    acronyme: 'INFRA-PROD',
    icon: 'ri-server-line',
    couleur: 'primary',
    scoreActuel: 72,
    scoreCible: 100,
    budgetTotal: '185 000 000 FCFA',
    responsable: 'CTO + RSSI + COO',
    progressionGlobale: 5,
    statutGlobal: 'critique',
    description: 'Déploiement d\'une infrastructure de production réelle multi-cloud, certifiée ISO 27001/22301/27701, avec SLA 99.99%, Zero-Trust, et observabilité complète — niveau « Bank-Grade » des Big Four.',
    actions: [
      {
        id: 'INFRA-A01', wsId: 'ws-infra',
        action: 'Déployer cluster Kubernetes multi-cloud (AWS + GCP + On-Prem)',
        description: 'Orchestration conteneurisée complète avec K8s sur 3 clouds. Service mesh Istio pour mTLS entre tous les services. Auto-scaling horizontal et vertical. Node pools dédiées par workload (compute, memory, GPU).',
        effort: '240h', budget: '42 000 000 FCFA', responsable: 'CTO + DevOps Lead',
        kpi: 'Cluster multi-cloud opérationnel, 0 downtime, mTLS 100% services', standardVise: 'CNCF / Kubernetes Best Practices', deadline: '2026-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Architecture K8s documentée + Service mesh + Dashboard cluster',
        pourquoiAction: 'Actuellement sur Netlify + Supabase = PaaS managé. Le passage à K8s multi-cloud donne le contrôle total : sécurité, scalabilité, coûts, conformité. Standard Big Four (Deloitte Cloud, PwC Digital).',
        dependances: [],
      },
      {
        id: 'INFRA-A02', wsId: 'ws-infra',
        action: 'Certifier ISO 27001:2022 en production',
        description: 'Audit de certification formel par un organisme accrédité (Bureau Veritas ou SGS). Phase 1 (documentation) + Phase 2 (implémentation). SMSI complet en production, policies appliquées, contrôles vérifiés.',
        effort: '160h', budget: '28 000 000 FCFA', responsable: 'RSSI + CCO',
        kpi: 'Certificat ISO 27001:2022 obtenu, 0 non-conformité majeure', standardVise: 'ISO 27001:2022', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Certificat ISO 27001 + SMSI documenté + Rapport d\'audit externe',
        pourquoiAction: '114/114 contrôles internes ≠ certification. La certification tierce-partie est le ticket d\'entrée pour les appels d\'offres institutionnels (banques, régulateurs, bailleurs).',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'INFRA-A03', wsId: 'ws-infra',
        action: 'Déployer Zero-Trust Architecture (NIST SP 800-207)',
        description: 'Micro-segmentation réseau, authentification continue par session, principe moindre privilège, chiffrement de bout en bout. Policy engine centralisé, PEP (Policy Enforcement Points) sur chaque service.',
        effort: '180h', budget: '35 000 000 FCFA', responsable: 'CTO + Security Architect',
        kpi: 'Architecture Zero-Trust vérifiée, segmentation 100% workloads', standardVise: 'NIST SP 800-207', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Architecture Zero-Trust + Policy engine + Audit NIST 800-207',
        pourquoiAction: 'Le modèle périmétrique est obsolète. Zero-Trust = chaque requête est authentifiée et autorisée. Standard 2026 pour toute infrastructure sensible.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'INFRA-A04', wsId: 'ws-infra',
        action: 'SLA 99.99% — Observabilité & SRE complet',
        description: 'Stack observabilité : metrics (Prometheus + Grafana), logs (Loki), traces (Tempo). SLO/SLI par service. Alerting prédictif. On-call rotation. Runbooks automatisés. Post-mortems.',
        effort: '160h', budget: '30 000 000 FCFA', responsable: 'CTO + SRE Lead',
        kpi: 'SLA 99.99% (4.38min downtime/mois), MTTR < 5min', standardVise: 'Google SRE / ISO 22301', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Stack observabilité + Dashboard SLO + Runbooks + On-call process',
        pourquoiAction: '99.9% (P0) = 43min/mois acceptable. 99.99% = 4.38min/mois = niveau banque d\'investissement. Obligatoire pour SLA clients institutionnels.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'INFRA-A05', wsId: 'ws-infra',
        action: 'PCA/PRA certifié ISO 22301 + Exercice COMEX',
        description: 'Business Impact Analysis formel, stratégies de continuité par service critique, plan de crise, cellule de crise. Exercice annuel avec le COMEX. Certification ISO 22301.',
        effort: '120h', budget: '22 000 000 FCFA', responsable: 'RSSI + COO + Managing Partner',
        kpi: 'Certification ISO 22301, RTO < 4h, RPO < 15min, exercice COMEX réussi', standardVise: 'ISO 22301:2019', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Certificat ISO 22301 + BIA + PCA/PRA documenté + Rapport exercice COMEX',
        pourquoiAction: 'Le PCA testé (P0) = technique. ISO 22301 = organisationnel complet. Obligatoire pour les institutions financières régulées.',
        dependances: ['INFRA-A01', 'INFRA-A04'],
      },
      {
        id: 'INFRA-A06', wsId: 'ws-infra',
        action: 'Certifier ISO 27701 — Privacy Information Management',
        description: 'Extension ISO 27001 vers gestion vie privée. Conformité RGPD + lois africaines. Registre traitements complet, PIA, DPO externe nommé.',
        effort: '100h', budget: '28 000 000 FCFA', responsable: 'DPO + CCO',
        kpi: 'Certification ISO 27701:2019, 0 violation données, registre 100%', standardVise: 'ISO 27701:2019', deadline: '2027-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Certificat ISO 27701 + Registre traitements + PIA + Nomination DPO',
        pourquoiAction: 'Triple certification (27001+22301+27701) = trust ultime. Obligatoire pour contrats avec données personnelles (banques, assurances).',
        dependances: ['INFRA-A02'],
      },
    ],
    jalons: [
      { id: 'J-INFRA-1', nom: 'Cluster K8s multi-cloud déployé', date: '2026-09-30', wsId: 'ws-infra', actionsLiees: ['INFRA-A01'], statut: 'a_venir' },
      { id: 'J-INFRA-2', nom: 'ISO 27001 certifié', date: '2026-12-31', wsId: 'ws-infra', actionsLiees: ['INFRA-A02'], statut: 'a_venir' },
      { id: 'J-INFRA-3', nom: 'SLA 99.99% atteint', date: '2027-01-31', wsId: 'ws-infra', actionsLiees: ['INFRA-A04'], statut: 'a_venir' },
      { id: 'J-INFRA-4', nom: 'Zero-Trust vérifié', date: '2027-03-31', wsId: 'ws-infra', actionsLiees: ['INFRA-A03'], statut: 'a_venir' },
      { id: 'J-INFRA-5', nom: 'ISO 22301 certifié + Exercice COMEX', date: '2027-06-30', wsId: 'ws-infra', actionsLiees: ['INFRA-A05'], statut: 'a_venir' },
      { id: 'J-INFRA-6', nom: 'ISO 27701 certifié', date: '2027-09-30', wsId: 'ws-infra', actionsLiees: ['INFRA-A06'], statut: 'a_venir' },
    ],
    jalonFinal: 'Triple ISO (27001 + 22301 + 27701) + Zero-Trust + SLA 99.99% — Infrastructure Bank-Grade certifiée',
  },

  // ===== WS-2 : RÉDUCTION 50%+ SUPABASE =====
  {
    id: 'ws-supabase',
    numero: 'WS-2',
    nom: 'Désintermédiation Supabase — Réduction 50%+',
    acronyme: 'DESUPABASE',
    icon: 'ri-database-2-line',
    couleur: 'accent',
    scoreActuel: 25,
    scoreCible: 100,
    budgetTotal: '62 000 000 FCFA',
    responsable: 'CTO + Data Architect + DevOps',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    description: 'Réduction drastique de la dépendance Supabase par migration progressive vers un data lake propriétaire (PostgreSQL auto-géré, Qdrant, Redis) et edge functions autonomes.',
    actions: [
      {
        id: 'SPB-A01', wsId: 'ws-supabase',
        action: 'Déployer cluster PostgreSQL auto-géré multi-AZ',
        description: 'PostgreSQL 16 en HA sur 3 zones avec Patroni pour le failover automatique. Streaming replication synchrone. PgBouncer pour le connection pooling. Backup continu avec WAL archiving + PITR.',
        effort: '200h', budget: '18 000 000 FCFA', responsable: 'CTO + DBA',
        kpi: 'Cluster PG HA opérationnel, RPO < 1min, failover < 30s, 0 perte données', standardVise: 'PostgreSQL Best Practices', deadline: '2026-10-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Cluster PostgreSQL HA + Dashboard monitoring + Procédure failover',
        pourquoiAction: 'Supabase = lock-in PostgreSQL managé. Avoir son propre cluster = contrôle complet, coûts prévisibles, conformité souveraine. Réduction 40% de la dépendance Supabase dès cette action.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'SPB-A02', wsId: 'ws-supabase',
        action: 'Migrer Auth vers solution interne (Clerk-like)',
        description: 'Remplacer Supabase Auth par une solution propriétaire : OAuth2/OIDC provider, MFA, RBAC, audit trail. Compatible avec les standards ISO 27001. SDK client unifié.',
        effort: '160h', budget: '14 000 000 FCFA', responsable: 'CTO + Security Architect',
        kpi: 'Auth interne opérationnelle, 0 downtime migration, MFA activé 100%', standardVise: 'OAuth 2.0 / OIDC / FAPI', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Auth provider interne + SDK client + Dashboard admin + Audit trail',
        pourquoiAction: 'Supabase Auth = dépendance critique. Solution interne = souveraineté totale sur les identités, conformité RGPD simplifiée, pas de limite de MAU.',
        dependances: ['SPB-A01'],
      },
      {
        id: 'SPB-A03', wsId: 'ws-supabase',
        action: 'Migrer Storage vers solution S3-compatible auto-gérée',
        description: 'MinIO ou Ceph en mode S3-compatible. Chiffrement at-rest, versioning, lifecycle policies. CDN intégré pour la distribution.',
        effort: '100h', budget: '10 000 000 FCFA', responsable: 'CTO + DevOps',
        kpi: 'Storage S3 opérationnel, 0 perte fichier, latence < 50ms P95', standardVise: 'S3 API / SOC 2', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Cluster MinIO/Ceph + CDN front + Dashboard utilisation',
        pourquoiAction: 'Supabase Storage = limite de bandwidth et coûts imprévisibles. Solution S3 auto-gérée = scalabilité infinie, coûts fixes, données sur infrastructure propre.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'SPB-A04', wsId: 'ws-supabase',
        action: 'Remplacer Supabase Realtime par WebSocket propriétaire',
        description: 'Serveur WebSocket (Elixir/Go) pour les subscriptions realtime. Protocol buffer pour l\'efficacité. Intégration avec le cluster PostgreSQL pour les LISTEN/NOTIFY.',
        effort: '120h', budget: '12 000 000 FCFA', responsable: 'CTO + Backend Lead',
        kpi: 'WebSocket serveur opérationnel, < 10ms latence broadcast, 10K connexions', standardVise: 'WebSocket RFC 6455', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Serveur WebSocket + Client SDK + Dashboard connexions',
        pourquoiAction: 'Supabase Realtime = black box, difficile à debug. Solution propriétaire = contrôle total du protocole, scalabilité maîtrisée.',
        dependances: ['SPB-A01'],
      },
      {
        id: 'SPB-A05', wsId: 'ws-supabase',
        action: 'Edge Functions → Workers auto-gérés (Deno Deploy-like)',
        description: 'Remplacer Supabase Edge Functions par des workers Deno déployés sur l\'infra K8s. Isolation V8, cold start < 50ms, auto-scaling.',
        effort: '140h', budget: '8 000 000 FCFA', responsable: 'CTO + Platform Engineer',
        kpi: 'Workers plateforme opérationnelle, < 50ms cold start, migration 100% functions', standardVise: 'WinterCG / Deno Deploy', deadline: '2027-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Workers plateforme + CLI déploiement + Dashboard functions',
        pourquoiAction: 'Edge Functions Supabase = limitées en runtime et région. Workers Deno auto-gérés = flexibilité totale, edge global, pas de limite d\'exécution.',
        dependances: ['INFRA-A01'],
      },
    ],
    jalons: [
      { id: 'J-SPB-1', nom: 'PostgreSQL HA auto-géré', date: '2026-10-31', wsId: 'ws-supabase', actionsLiees: ['SPB-A01'], statut: 'a_venir' },
      { id: 'J-SPB-2', nom: 'Auth interne migrée', date: '2027-01-31', wsId: 'ws-supabase', actionsLiees: ['SPB-A02'], statut: 'a_venir' },
      { id: 'J-SPB-3', nom: 'Storage S3 auto-géré', date: '2027-03-31', wsId: 'ws-supabase', actionsLiees: ['SPB-A03'], statut: 'a_venir' },
      { id: 'J-SPB-4', nom: 'Realtime WebSocket propriétaire', date: '2027-06-30', wsId: 'ws-supabase', actionsLiees: ['SPB-A04'], statut: 'a_venir' },
      { id: 'J-SPB-5', nom: 'Workers Deno auto-gérés', date: '2027-09-30', wsId: 'ws-supabase', actionsLiees: ['SPB-A05'], statut: 'a_venir' },
    ],
    jalonFinal: 'Réduction 50%+ dépendance Supabase — Infrastructure souveraine auto-gérée',
  },

  // ===== WS-3 : MÉMOIRE INTERNE 100% BIG FOUR =====
  {
    id: 'ws-memoire',
    numero: 'WS-3',
    nom: 'Mémoire Interne 100% Big Four',
    acronyme: 'MEM-BF',
    icon: 'ri-brain-line',
    couleur: 'secondary',
    scoreActuel: 55,
    scoreCible: 100,
    budgetTotal: '48 000 000 FCFA',
    responsable: 'Knowledge Manager + CTO + AI Director',
    progressionGlobale: 15,
    statutGlobal: 'en_cours',
    description: 'Développement d\'une mémoire interne propriétaire au niveau Big Four : Knowledge Graph sémantique, RAG vectoriel, mémoire persistante multi-session, et moteur de raisonnement réglementaire.',
    actions: [
      {
        id: 'MEM-A01', wsId: 'ws-memoire',
        action: 'Déployer Knowledge Graph sémantique RDF/OWL 100% Big Four',
        description: 'Modélisation ontologique complète du corpus réglementaire africain. Classes, propriétés, relations d\'inférence. Raisonnement logique (subsomption, transitivité). SPARQL endpoint.',
        effort: '200h', budget: '16 000 000 FCFA', responsable: 'Knowledge Manager + Ontologist',
        kpi: 'Knowledge Graph 500K+ triplets, raisonnement < 100ms, 0 incohérence', standardVise: 'W3C RDF/OWL / SKOS', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Ontologie complète + SPARQL endpoint + Dashboard inférences + Documentation',
        pourquoiAction: 'Le KG actuel est documentaire, pas sémantique. Le raisonnement ontologique permet des inférences automatiques (ex: « si texte A s\'applique à X et X est une sous-classe de Y → A s\'applique à Y »).',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'MEM-A02', wsId: 'ws-memoire',
        action: 'RAG Vectoriel Haute Performance — Index 1M+ documents',
        description: 'Vectorisation de l\'intégralité du corpus réglementaire, jurisprudence, doctrine. Index Qdrant optimisé avec HNSW. Retrieval multi-étage : sparse (BM25) + dense (embeddings) + reranking.',
        effort: '180h', budget: '11 000 000 FCFA', responsable: 'CTO + ML Engineer',
        kpi: 'Index 1M+ documents, recall@10 ≥ 95%, latence < 200ms', standardVise: 'BEIR / MIRACL', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Pipeline vectorisation + Index Qdrant 1M+ + Dashboard qualité retrieval',
        pourquoiAction: 'Le RAG actuel couvre ~200K documents avec un recall@10 de ~80%. Passer à 1M+ documents avec 95% = niveau Big Four pour la recherche réglementaire.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'MEM-A03', wsId: 'ws-memoire',
        action: 'Mémoire persistante multi-session — Context Continuity Engine',
        description: 'Système de mémoire persistante pour les agents IA : contexte conservé entre sessions, historique de raisonnement, apprentissage incrémental. Vector store personnel par utilisateur/agent.',
        effort: '160h', budget: '10 000 000 FCFA', responsable: 'AI Director + CTO',
        kpi: 'Contexte persistant 100% sessions, rappel contextuel > 90%, 0 perte mémoire', standardVise: 'MemGPT / Mem0', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Context Continuity Engine + API mémoire + Dashboard sessions',
        pourquoiAction: 'Les agents KOS sont actuellement stateless (pas de mémoire entre sessions). La mémoire persistante = qualité de conseil drastiquement améliorée, continuité du raisonnement.',
        dependances: ['MEM-A01', 'MEM-A02'],
      },
      {
        id: 'MEM-A04', wsId: 'ws-memoire',
        action: 'Moteur de raisonnement réglementaire — Rule Engine Expert',
        description: 'Moteur d\'inférence réglementaire basé sur les règles extraites du corpus. Forward/backward chaining. Explication des conclusions (trace de raisonnement). Validation croisée.',
        effort: '200h', budget: '11 000 000 FCFA', responsable: 'AI Director + Compliance Expert',
        kpi: '95% précision raisonnement, traçabilité 100%, < 1s par inférence complexe', standardVise: 'Drools / CLIPS', deadline: '2027-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Rule Engine + Base de règles réglementaires + Dashboard inférences + Traces',
        pourquoiAction: 'Le KG + RAG excellent pour la recherche, mais le raisonnement réglementaire (si A et B alors C doit être fait) nécessite un moteur de règles dédié. Standard des cabinets Big Four.',
        dependances: ['MEM-A01'],
      },
    ],
    jalons: [
      { id: 'J-MEM-1', nom: 'Knowledge Graph sémantique 500K+ triplets', date: '2026-12-31', wsId: 'ws-memoire', actionsLiees: ['MEM-A01'], statut: 'a_venir' },
      { id: 'J-MEM-2', nom: 'RAG 1M+ documents, recall 95%', date: '2027-03-31', wsId: 'ws-memoire', actionsLiees: ['MEM-A02'], statut: 'a_venir' },
      { id: 'J-MEM-3', nom: 'Mémoire persistante multi-session', date: '2027-06-30', wsId: 'ws-memoire', actionsLiees: ['MEM-A03'], statut: 'a_venir' },
      { id: 'J-MEM-4', nom: 'Rule Engine réglementaire expert', date: '2027-09-30', wsId: 'ws-memoire', actionsLiees: ['MEM-A04'], statut: 'a_venir' },
    ],
    jalonFinal: 'KG sémantique + RAG 1M+ + Mémoire persistante + Rule Engine — Cerveau 100% Big Four propriétaire',
  },

  // ===== WS-4 : AUTONOMIE TOTALE API EXTERNES =====
  {
    id: 'ws-autonomie',
    numero: 'WS-4',
    nom: 'Autonomie Totale vis-à-vis des API Externes',
    acronyme: 'AUTO-API',
    icon: 'ri-plug-line',
    couleur: 'accent',
    scoreActuel: 35,
    scoreCible: 100,
    budgetTotal: '55 000 000 FCFA',
    responsable: 'CTO + AI Director + CDO',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    description: 'Élimination de la dépendance aux API tierces (OpenAI, Google, LinkedIn, etc.) par développement de modèles et services propriétaires auto-hébergés.',
    actions: [
      {
        id: 'API-A01', wsId: 'ws-autonomie',
        action: 'Déployer LLM open-source fine-tuné — Claude/GPT Alternative',
        description: 'Fine-tuning de Llama 3.1 70B ou Mistral Large sur le corpus réglementaire africain. Déploiement sur GPU cluster (A100/H100). API compatible OpenAI pour drop-in replacement.',
        effort: '240h', budget: '28 000 000 FCFA', responsable: 'CTO + ML Engineer',
        kpi: 'LLM propriétaire ≥ 90% performance GPT-4 sur tâches réglementaires, < 2s latency', standardVise: 'HELM / LMSYS', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'LLM fine-tuné + API endpoint + Dashboard performance + Benchmark vs GPT-4',
        pourquoiAction: 'Dépendance à OpenAI = risque de pricing, censure, disponibilité, souveraineté données. LLM propriétaire = contrôle total, données en local, coûts fixes.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'API-A02', wsId: 'ws-autonomie',
        action: 'Moteur de recherche interne — Alternative Google Search API',
        description: 'Stack de crawling propriétaire + index Elasticsearch pour la veille réglementaire. Crawling ciblé des sources réglementaires africaines. Indexation temps réel.',
        effort: '160h', budget: '10 000 000 FCFA', responsable: 'CTO + Data Engineer',
        kpi: 'Crawler 100% sources réglementaires, index < 5min fraîcheur, recall 98%', standardVise: 'Elasticsearch / Common Crawl', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Crawler réglementaire + Index ES + Dashboard fraîcheur + API recherche',
        pourquoiAction: 'Google Search API = coûteuse, résultats non déterministes. Crawler propriétaire = fraîcheur garantie, pas de coûts variables.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'API-A03', wsId: 'ws-autonomie',
        action: 'LinkedIn Alternative — Social Graph propriétaire',
        description: 'Agrégation de données professionnelles depuis sources publiques africaines. Graphe social des décideurs réglementaires. API de matching et recommandation.',
        effort: '140h', budget: '8 000 000 FCFA', responsable: 'CDO + Data Engineer',
        kpi: 'Graphe 50K+ décideurs africains, fraîcheur < 7j, matching > 85% précision', standardVise: 'GDPR / Data Privacy', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Graphe social décideurs + API matching + Dashboard KPIs',
        pourquoiAction: 'LinkedIn API = restrictions croissantes, coûts, dépendance. Graphe propriétaire = données souveraines, ciblage précis, pas de limites.',
        dependances: ['API-A02'],
      },
      {
        id: 'API-A04', wsId: 'ws-autonomie',
        action: 'Email autonome — SMTP propriétaire + Deliverability',
        description: 'Serveur SMTP propriétaire avec configuration SPF/DKIM/DMARC. IP warming, reputation monitoring, bounce handling. Alternative à Resend/SendGrid.',
        effort: '100h', budget: '5 000 000 FCFA', responsable: 'CTO + DevOps',
        kpi: 'Deliverability ≥ 98%, 0 blacklist, < 500ms send latency', standardVise: 'RFC 5321 / M³AAWG', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Serveur SMTP + Dashboard deliverability + Configuration DNS',
        pourquoiAction: 'Resend/SendGrid = dépendance email critique. SMTP propriétaire = contrôle total, pas de coûts par email, données en local.',
        dependances: ['INFRA-A01'],
      },
      {
        id: 'API-A05', wsId: 'ws-autonomie',
        action: 'Text-to-Speech propriétaire — Alternative ElevenLabs',
        description: 'Déploiement de modèles TTS open-source (XTTS v2, StyleTTS 2) fine-tunés. Clonage vocal professionnel. Streaming audio temps réel.',
        effort: '120h', budget: '4 000 000 FCFA', responsable: 'CTO + Audio Engineer',
        kpi: 'TTS ≥ 4.0 MOS naturel, < 500ms first byte, clonage vocal < 30s audio', standardVise: 'MOS / PESQ', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Serveur TTS + API streaming + Dashboard qualité + Voix KHEPRA',
        pourquoiAction: 'ElevenLabs = excellent mais dépendance externe. TTS propriétaire = voix KOS unique, pas de coûts par caractère.',
        dependances: ['INFRA-A01'],
      },
    ],
    jalons: [
      { id: 'J-API-1', nom: 'SMTP propriétaire opérationnel', date: '2027-01-31', wsId: 'ws-autonomie', actionsLiees: ['API-A04'], statut: 'a_venir' },
      { id: 'J-API-2', nom: 'Crawler réglementaire actif', date: '2027-01-31', wsId: 'ws-autonomie', actionsLiees: ['API-A02'], statut: 'a_venir' },
      { id: 'J-API-3', nom: 'LLM propriétaire ≥ 90% GPT-4', date: '2027-03-31', wsId: 'ws-autonomie', actionsLiees: ['API-A01'], statut: 'a_venir' },
      { id: 'J-API-4', nom: 'TTS propriétaire + Social Graph', date: '2027-06-30', wsId: 'ws-autonomie', actionsLiees: ['API-A03', 'API-A05'], statut: 'a_venir' },
    ],
    jalonFinal: '5 services externes remplacés — Autonomie totale, coûts fixes, souveraineté données',
  },

  // ===== WS-5 : UPGRADE SITE WEB CALIBRÉ MARCHÉ =====
  {
    id: 'ws-siteweb',
    numero: 'WS-5',
    nom: 'Upgrade Site Web Calibré aux Besoins du Marché',
    acronyme: 'SITE-MKT',
    icon: 'ri-globe-line',
    couleur: 'primary',
    scoreActuel: 66,
    scoreCible: 100,
    budgetTotal: '42 000 000 FCFA',
    responsable: 'Lead Dev Frontend + Marketing Director + UX Designer',
    progressionGlobale: 10,
    statutGlobal: 'critique',
    description: 'Refonte complète du site web : design premium, performance 100% CWV Excellent, personnalisation IA, SEO/GEO optimisé, funnel de conversion calibré données marché.',
    actions: [
      {
        id: 'SITE-A01', wsId: 'ws-siteweb',
        action: 'Refonte design premium — Style Big Four Consulting',
        description: 'Design system complet inspiré McKinsey/BCG : typographie premium, palette sophistiquée, animations fluides, micro-interactions. Composants réutilisables. Dark mode natif.',
        effort: '200h', budget: '12 000 000 FCFA', responsable: 'Lead Dev Frontend + UI Designer',
        kpi: 'Design system 100+ composants, score design ≥ 95/100 audit UX', standardVise: 'Material Design 3 / Human Interface', deadline: '2026-11-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Design system complet + Storybook + Guide de style + Composants Premium',
        pourquoiAction: 'Le design actuel est fonctionnel mais pas premium. Un site de niveau Big Four = première impression décisive pour les DG/DF/Compliance Officers.',
        dependances: [],
      },
      {
        id: 'SITE-A02', wsId: 'ws-siteweb',
        action: 'Performance 100% CWV Excellent — Toutes pages',
        description: 'Optimisation systématique : LCP < 1.5s, INP < 50ms, CLS < 0.05 sur 100% des pages. Edge computing, lazy loading intelligent, assets optimisés, code splitting.',
        effort: '160h', budget: '8 000 000 FCFA', responsable: 'CTO + Lead Dev Frontend',
        kpi: '100% pages CWV Excellent, LCP < 1.5s, INP < 50ms, CLS < 0.05', standardVise: 'Google CWV / Lighthouse', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Dashboard CWV 100% + Rapport optimisation + Audit performance',
        pourquoiAction: 'La performance impacte directement le SEO (Google ranking) et le taux de conversion (+7% par 100ms gagné). 100% Excellent = top 1% mondial.',
        dependances: ['SITE-A01'],
      },
      {
        id: 'SITE-A03', wsId: 'ws-siteweb',
        action: 'Personnalisation IA — Adaptive Content Engine',
        description: 'Personnalisation temps réel du contenu selon : secteur visiteur, pays, source d\'acquisition, comportement de navigation. Recommandations IA de contenu. A/B testing natif.',
        effort: '180h', budget: '9 000 000 FCFA', responsable: 'CTO + Growth Director',
        kpi: '+25% conversion vs non personnalisé, personnalisation < 20ms overhead', standardVise: 'Personalization Maturity', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Adaptive Content Engine + Dashboard personnalisation + A/B testing platform',
        pourquoiAction: 'Un visiteur banquier voit des case studies bancaires, un visiteur SFD voit du microfinance. Pertinence = conversion. McKinsey rapporte +20-30% conversion.',
        dependances: ['SITE-A01'],
      },
      {
        id: 'SITE-A04', wsId: 'ws-siteweb',
        action: 'SEO/GEO Optimisation Totale — 600+ pages optimisées',
        description: 'Optimisation SEO/GEO systématique des 600+ pages : balisage sémantique, Schema.org exhaustif, entités Knowledge Graph, FAQ structurées, featured snippets optimisés.',
        effort: '240h', budget: '7 000 000 FCFA', responsable: 'SEO Director + Content Team',
        kpi: '95% pages indexées, 200+ featured snippets, 300+ entités KG', standardVise: 'Google SEO / GEO', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Audit SEO complet + Optimisations 600 pages + Dashboard GEO',
        pourquoiAction: 'Le SEO actuel est bon (75/100) mais pas excellent. L\'optimisation systématique des 600+ pages = domination GEO sur toutes les requêtes réglementaires.',
        dependances: ['SITE-A02'],
      },
      {
        id: 'SITE-A05', wsId: 'ws-siteweb',
        action: 'Funnel de conversion data-driven — Analytics + CRO',
        description: 'Analyse funnel complète : heatmaps, session recordings, attribution modeling. Identification des points de friction. Optimisation continue basée données. Lead scoring intégré.',
        effort: '140h', budget: '6 000 000 FCFA', responsable: 'Growth Director + CDO',
        kpi: 'Taux conversion 3%→7%, bounce rate -30%, lead scoring > 80% précision', standardVise: 'CRO Best Practices', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Dashboard funnel + Heatmaps + Plan CRO + Lead scoring engine',
        pourquoiAction: 'Trafic sans conversion = gaspillage. L\'optimisation data-driven du funnel transforme le site en machine à leads qualifiés calibrée aux données réelles.',
        dependances: ['SITE-A03'],
      },
    ],
    jalons: [
      { id: 'J-SITE-1', nom: 'Design system premium livré', date: '2026-11-30', wsId: 'ws-siteweb', actionsLiees: ['SITE-A01'], statut: 'a_venir' },
      { id: 'J-SITE-2', nom: 'CWV 100% Excellent', date: '2026-12-31', wsId: 'ws-siteweb', actionsLiees: ['SITE-A02'], statut: 'a_venir' },
      { id: 'J-SITE-3', nom: 'SEO/GEO 600 pages optimisées', date: '2027-01-31', wsId: 'ws-siteweb', actionsLiees: ['SITE-A04'], statut: 'a_venir' },
      { id: 'J-SITE-4', nom: 'Personnalisation IA live', date: '2027-03-31', wsId: 'ws-siteweb', actionsLiees: ['SITE-A03'], statut: 'a_venir' },
      { id: 'J-SITE-5', nom: 'Funnel CRO data-driven', date: '2027-06-30', wsId: 'ws-siteweb', actionsLiees: ['SITE-A05'], statut: 'a_venir' },
    ],
    jalonFinal: 'Design premium + CWV 100% + SEO/GEO complet + Personnalisation IA + CRO — Site Web World-Class calibré marché',
  },

  // ===== WS-6 : INNOVATION DESIGN ULTRA LEAD MAGNETS =====
  {
    id: 'ws-leadmagnets',
    numero: 'WS-6',
    nom: 'Innovation Design Graphique Ultra Lead Magnets',
    acronyme: 'ULM-DESIGN',
    icon: 'ri-magic-line',
    couleur: 'secondary',
    scoreActuel: 40,
    scoreCible: 100,
    budgetTotal: '38 000 000 FCFA',
    responsable: 'Creative Director + Marketing Director + Growth Director',
    progressionGlobale: 5,
    statutGlobal: 'critique',
    description: 'Création d\'aimants à leads ultra-performants avec design graphique innovant : rapports premium, outils interactifs, calculateurs, templates, certifications — calibrés aux personas du marché.',
    actions: [
      {
        id: 'ULM-A01', wsId: 'ws-leadmagnets',
        action: 'Refonte graphique 100% des lead magnets existants — Niveau Big Four',
        description: 'Redesign complet des 50+ lead magnets avec charte graphique premium : mise en page éditoriale, data visualisations, infographies, illustrations personnalisées. Templates InDesign/Figma.',
        effort: '200h', budget: '10 000 000 FCFA', responsable: 'Creative Director + Design Team',
        kpi: '50 lead magnets redesignés, score design > 90/100, NPS lead magnet > 70', standardVise: 'Editorial Design', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: '50 lead magnets redesignés + Templates + Guide design + Asset library',
        pourquoiAction: 'Les lead magnets actuels sont fonctionnels mais pas premium. Un design Big Four = crédibilité immédiate, taux de conversion multiplié par 2-3.',
        dependances: ['SITE-A01'],
      },
      {
        id: 'ULM-A02', wsId: 'ws-leadmagnets',
        action: 'Créer 20 nouveaux ultra lead magnets interactifs',
        description: 'Outils interactifs : simulateur conformité, calculateur ROI réglementaire, diagnostic flash interactif, scoring maturité, quiz réglementaire. Visualisations dynamiques, export PDF, personnalisation.',
        effort: '240h', budget: '14 000 000 FCFA', responsable: 'Creative Director + Dev Team + Marketing',
        kpi: '20 ULMs interactifs live, 500+ leads/mois générés, taux complétion > 60%', standardVise: 'Interactive Content', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: '20 outils interactifs + Dashboard performance + Système capture email',
        pourquoiAction: 'Les PDF statiques convertissent à 2-3%. Les outils interactifs convertissent à 15-25%. Shift de paradigme : lead magnet → expérience.',
        dependances: ['ULM-A01'],
      },
      {
        id: 'ULM-A03', wsId: 'ws-leadmagnets',
        action: 'Programme de certification KOS — Lead Magnet Premium',
        description: 'Mini-certifications gratuites : « Certified UEMOA Compliance Awareness », « Certified CEMAC Regulatory Basics ». Badge numérique, certificat PDF designé, partage LinkedIn.',
        effort: '160h', budget: '8 000 000 FCFA', responsable: 'Marketing Director + Knowledge Manager',
        kpi: '3 certifications live, 1000+ certifiés/an, viralité LinkedIn x5', standardVise: 'Credentialing', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Plateforme certification + 3 parcours + Badge numérique + Dashboard certifiés',
        pourquoiAction: 'Les certifications gratuites sont le lead magnet ultime : viralité LinkedIn, crédibilité, données qualifiées. Modèle HubSpot Academy appliqué à la régulation.',
        dependances: ['ULM-A01'],
      },
      {
        id: 'ULM-A04', wsId: 'ws-leadmagnets',
        action: 'Studio de data visualisation — Infographies réglementaires',
        description: 'Création d\'infographies réglementaires animées : cartes UEMOA/CEMAC interactives, timelines réglementaires, comparatifs, heatmaps de risques. Exportables, partageables.',
        effort: '180h', budget: '6 000 000 FCFA', responsable: 'Creative Director + Data Viz Specialist',
        kpi: '50 infographies animées, 10K+ partages sociaux, backlinks 50+', standardVise: 'Data Journalism', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: '50 infographies + Dashboard engagement + Bibliothèque réutilisable',
        pourquoiAction: 'Les infographies sont le format le plus partagé sur LinkedIn (+65% vs texte). Générateur de backlinks naturels et d\'autorité.',
        dependances: ['ULM-A01'],
      },
    ],
    jalons: [
      { id: 'J-ULM-1', nom: '50 lead magnets redesignés', date: '2026-12-31', wsId: 'ws-leadmagnets', actionsLiees: ['ULM-A01'], statut: 'a_venir' },
      { id: 'J-ULM-2', nom: '20 ULMs interactifs live', date: '2027-03-31', wsId: 'ws-leadmagnets', actionsLiees: ['ULM-A02'], statut: 'a_venir' },
      { id: 'J-ULM-3', nom: '50 infographies réglementaires', date: '2027-03-31', wsId: 'ws-leadmagnets', actionsLiees: ['ULM-A04'], statut: 'a_venir' },
      { id: 'J-ULM-4', nom: '3 certifications KOS live', date: '2027-06-30', wsId: 'ws-leadmagnets', actionsLiees: ['ULM-A03'], statut: 'a_venir' },
    ],
    jalonFinal: '100+ ULMs premium + 20 interactifs + 3 certifications + 50 infographies — Machine à leads calibrée Big Four',
  },

  // ===== WS-7 : RESSOURCES DOCUMENTAIRES 100% BIG FOUR =====
  {
    id: 'ws-documentaire',
    numero: 'WS-7',
    nom: 'Richesse & Complétude Documentaire 100% Big Four',
    acronyme: 'DOC-BF',
    icon: 'ri-book-open-line',
    couleur: 'accent',
    scoreActuel: 52,
    scoreCible: 100,
    budgetTotal: '35 000 000 FCFA',
    responsable: 'Knowledge Manager + Content Director + Compliance Team',
    progressionGlobale: 20,
    statutGlobal: 'en_cours',
    description: 'Complétude du corpus documentaire au niveau Big Four : textes réglementaires exhaustifs, jurisprudence, doctrine, guides pratiques, modèles, templates, SOPs.',
    actions: [
      {
        id: 'DOC-A01', wsId: 'ws-documentaire',
        action: 'Corpus réglementaire exhaustif — 5 000+ textes',
        description: 'Collecte, vérification et indexation de l\'intégralité des textes réglementaires UEMOA (BCEAO, AMF-UEMOA, etc.) + CEMAC (COBAC, BEAC, etc.) + OHADA + GAFI. Versionnement, historique des modifications.',
        effort: '240h', budget: '12 000 000 FCFA', responsable: 'Knowledge Manager + Compliance Team',
        kpi: '5 000+ textes indexés, exhaustivité 99%, mise à jour < 24h', standardVise: 'ISO 30401 / Légifrance', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Base textes 5000+ + Moteur recherche + Dashboard exhaustivité + Alerting',
        pourquoiAction: 'L\'exhaustivité réglementaire est le socle de la crédibilité. Actuellement ~2000 textes, il faut 5000+ pour couvrir l\'intégralité du périmètre réglementaire africain.',
        dependances: ['MEM-A02'],
      },
      {
        id: 'DOC-A02', wsId: 'ws-documentaire',
        action: 'Jurisprudence & Décisions — 1 000+ cas',
        description: 'Base de jurisprudence : décisions AMF-UEMOA, sanctions COBAC, arbitrages OHADA, décisions de justice. Analyse juridique, précédents, implications pratiques.',
        effort: '200h', budget: '8 000 000 FCFA', responsable: 'Content Director + Legal Team',
        kpi: '1 000+ décisions indexées, analyse juridique, recherche plein texte', standardVise: 'Dalloz / LexisNexis', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Base jurisprudence 1000+ + Moteur précédents + Dashboard analyses',
        pourquoiAction: 'La jurisprudence est ce qui distingue un cabinet d\'excellence d\'un bon cabinet. Les Big Four ont des bases de jurisprudence propriétaires massives.',
        dependances: ['DOC-A01'],
      },
      {
        id: 'DOC-A03', wsId: 'ws-documentaire',
        action: 'Guides Pratiques & Manuels — 200+ publications',
        description: 'Rédaction de 200+ guides pratiques par domaine : conformité, LCB/FT, gouvernance, ESG, risk management, audit interne. Format éditorial premium, cas pratiques, checklists.',
        effort: '320h', budget: '6 000 000 FCFA', responsable: 'Content Director + Expert Team',
        kpi: '200+ guides publiés, 4.5+ étoiles qualité, 50K+ téléchargements/an', standardVise: 'Technical Writing', deadline: '2027-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: '200+ guides + Dashboard téléchargements + Système notation qualité',
        pourquoiAction: 'Les guides pratiques sont le contenu le plus consulté par les professionnels. 200 guides = couverture exhaustive de tous les sujets réglementaires.',
        dependances: ['DOC-A01'],
      },
      {
        id: 'DOC-A04', wsId: 'ws-documentaire',
        action: 'Templates & Modèles — 150+ documents prêts à l\'emploi',
        description: 'Templates professionnels : politiques conformité, chartes, procédures, rapports, plans d\'action, matrices de risques. Format Word/Excel/PDF, personnalisables, annotés.',
        effort: '180h', budget: '5 000 000 FCFA', responsable: 'Content Director + Template Designer',
        kpi: '150+ templates, 4.5+ étoiles, 30K+ téléchargements/an', standardVise: 'Template Excellence', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: '150+ templates + Dashboard utilisation + Feedback loop',
        pourquoiAction: 'Les templates prêts à l\'emploi = lead magnet à très haute valeur perçue. Les compliance officers les utilisent quotidiennement.',
        dependances: ['ULM-A01'],
      },
      {
        id: 'DOC-A05', wsId: 'ws-documentaire',
        action: 'SOPs & Procédures Opérationnelles Standardisées',
        description: 'Rédaction de 100+ SOPs couvrant tous les processus : due diligence, KYC, LCB/FT reporting, audit interne, risk assessment, ESG reporting. Format Big Four, contrôles intégrés.',
        effort: '160h', budget: '4 000 000 FCFA', responsable: 'COO + Quality Manager',
        kpi: '100+ SOPs documentées, 100% processus couverts, audit interne validé', standardVise: 'ISO 9001 / COSO', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: '100+ SOPs + Cartographie processus + Dashboard conformité procédures',
        pourquoiAction: 'Les SOPs sont la colonne vertébrale opérationnelle. Sans SOPs documentées, pas de certification ISO 9001 ni de passage à l\'échelle.',
        dependances: ['INFRA-A02'],
      },
    ],
    jalons: [
      { id: 'J-DOC-1', nom: '5000+ textes réglementaires', date: '2027-03-31', wsId: 'ws-documentaire', actionsLiees: ['DOC-A01'], statut: 'a_venir' },
      { id: 'J-DOC-2', nom: '1000+ décisions jurisprudence', date: '2027-06-30', wsId: 'ws-documentaire', actionsLiees: ['DOC-A02'], statut: 'a_venir' },
      { id: 'J-DOC-3', nom: '150+ templates + 100+ SOPs', date: '2027-06-30', wsId: 'ws-documentaire', actionsLiees: ['DOC-A04', 'DOC-A05'], statut: 'a_venir' },
      { id: 'J-DOC-4', nom: '200+ guides pratiques', date: '2027-09-30', wsId: 'ws-documentaire', actionsLiees: ['DOC-A03'], statut: 'a_venir' },
    ],
    jalonFinal: '5000+ textes + 1000+ jurisprudence + 200+ guides + 150+ templates + 100+ SOPs — Bibliothèque documentaire 100% Big Four',
  },
];

// ===== MÉTADONNÉES GLOBALES =====
export const PRODUCTION_SOVEREIGNTY_META = {
  titre: 'KOS Production Sovereignty — Mise en Production Souveraine 100% Big Four + ISO',
  version: 'v1.0 ULTIME CAPSTONE',
  dateInit: '2026-07-01',
  workstreamsTotal: 7,
  actionsTotal: 35,
  jalonsTotal: 29,
  budgetTotal: '465 000 000 FCFA',
  budget12m: '280 000 000 FCFA',
  budget24m: '465 000 000 FCFA',
  horizon: '12-18 mois (Juillet 2026 — Décembre 2027)',
  scoreGlobalActuel: 49.3,
  scoreGlobalCible: 100,
  dependancesCritiques: 'INFRA-A01 (Cluster K8s) est le prérequis à 60% des actions',
  gouvernance: 'Comité de Pilotage Production Sovereignty — Hebdomadaire — Managing Partner + CTO + RSSI + CCO + COO + Creative Director + Knowledge Manager',
  messageCle: 'KOS passe de « cockpit de simulation » à « infrastructure de production souveraine ». 35 actions sur 7 workstreams. Budget 465M FCFA. À l\'issue : KOS est une plateforme autonome, certifiée, calibrée marché, avec un site world-class et des ressources documentaires exhaustives. Aucun cabinet de conseil en Afrique n\'a ce niveau.',
};

// ===== COMPUTEUR KPIs =====
export function computeProductionSovereigntyKPIs() {
  const wss = PRODUCTION_WORKSTREAMS;
  const allActions = wss.flatMap(w => w.actions);
  const allJalons = wss.flatMap(w => w.jalons);

  const actionsNonDemarre = allActions.filter(a => a.statut === 'non_demarre').length;
  const actionsEnCours = allActions.filter(a => a.statut === 'en_cours').length;
  const actionsTerminees = allActions.filter(a => a.statut === 'termine').length;
  const actionsBloquees = allActions.filter(a => a.statut === 'bloque').length;

  const wssCritiques = wss.filter(w => w.statutGlobal === 'critique').length;
  const wssEnCours = wss.filter(w => w.statutGlobal === 'en_cours').length;

  const progressionGlobale = Math.round(allActions.reduce((s, a) => s + a.progression, 0) / allActions.length);
  const scoreMoyenActuel = Math.round(wss.reduce((s, w) => s + w.scoreActuel, 0) / wss.length * 10) / 10;

  const jalonAtteints = allJalons.filter(j => j.statut === 'atteint').length;
  const jalonRetard = allJalons.filter(j => j.statut === 'retard').length;
  const jalonAVenir = allJalons.filter(j => j.statut === 'a_venir').length;

  const dependanceCentrale = 'INFRA-A01 (Cluster K8s) — Bloque 12 actions sur 35';

  return {
    workstreams_total: wss.length,
    actions_total: allActions.length,
    actions_non_demarre: actionsNonDemarre,
    actions_en_cours: actionsEnCours,
    actions_terminees: actionsTerminees,
    actions_bloquees: actionsBloquees,
    wss_critiques: wssCritiques,
    wss_en_cours: wssEnCours,
    progression_globale: progressionGlobale,
    score_moyen_actuel: scoreMoyenActuel,
    jalons_total: allJalons.length,
    jalons_atteints: jalonAtteints,
    jalons_retard: jalonRetard,
    jalons_a_venir: jalonAVenir,
    budget_total: '465 000 000 FCFA',
    dependance_centrale: dependanceCentrale,
  };
}

// ===== TIMELINE EXECUTION =====
export interface TimelinePhase {
  nom: string;
  periode: string;
  workstreams: string[];
  budget: string;
  jalon: string;
}

export const PRODUCTION_TIMELINE: TimelinePhase[] = [
  {
    nom: 'Phase 1 — Fondations Infrastructure (CRITIQUE)',
    periode: 'Juillet — Octobre 2026',
    workstreams: ['ws-infra', 'ws-supabase'],
    budget: '120 000 000 FCFA',
    jalon: 'Cluster K8s multi-cloud + PostgreSQL HA auto-géré — Socle de la souveraineté',
  },
  {
    nom: 'Phase 2 — Certification & Autonomie API',
    periode: 'Novembre 2026 — Mars 2027',
    workstreams: ['ws-infra', 'ws-autonomie', 'ws-memoire'],
    budget: '145 000 000 FCFA',
    jalon: 'ISO 27001 certifié + LLM propriétaire + Crawler réglementaire + KG sémantique',
  },
  {
    nom: 'Phase 3 — Site Web & Ultra Lead Magnets',
    periode: 'Juillet 2026 — Mars 2027',
    workstreams: ['ws-siteweb', 'ws-leadmagnets'],
    budget: '80 000 000 FCFA',
    jalon: 'Design premium + CWV 100% + 20 ULMs interactifs + 50 infographies',
  },
  {
    nom: 'Phase 4 — Complétude Documentaire & Production',
    periode: 'Avril — Décembre 2027',
    workstreams: ['ws-documentaire', 'ws-infra', 'ws-supabase'],
    budget: '120 000 000 FCFA',
    jalon: '5000+ textes + Triple ISO + Workers Deno + Réduction Supabase 50%+',
  },
];

// ===== EXECUTIVE SUMMARY =====
export const PRODUCTION_EXECUTIVE_SUMMARY = {
  titre: 'KOS Production Sovereignty — Résumé Exécutif',
  contexte: 'KOS a complété le diagnostic (Corrective Action Blocks), l\'exécution P0, l\'exécution P1, et l\'identification des tâches restantes 100%. Il est temps de passer de la simulation à la production réelle.',
  objectif: 'Transformer KOS en infrastructure de production souveraine 100% Big Four + ISO, avec autonomie technologique, site web world-class, et ressources documentaires exhaustives.',
  workstreams: 7,
  actions: 35,
  jalons: 29,
  budget: '465 000 000 FCFA',
  horizon: '12-18 mois',
  prerequisCritique: 'Le cluster K8s multi-cloud (INFRA-A01) doit être livré en premier — 12 actions (60% du programme) en dépendent.',
  resultatFinal: 'KOS devient la première plateforme de conseil réglementaire africaine avec une infrastructure certifiée ISO, autonome des API externes, et une bibliothèque documentaire exhaustive.',
};



