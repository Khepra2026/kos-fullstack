// KOS Regulatory Data Architect™ — Hub 115
// Big Four-level regulatory intelligence, data governance & compliance architecture
// 9 sections: Entities, Knowledge Graph, pgVector, Scoring, Inspection, n8n, Agents, Reports, Principles

export interface ArchitectureScenario {
  id: string;
  nom_institution: string;
  type_institution: 'Banque' | 'EMF' | 'FinTech' | 'Multi-Juridictionnel';
  zone: string;
  autorites: string[];
  description: string;
  complexite: 'Haute' | 'Très Haute' | 'Maximale';
  nb_entites_reglementaires: number;
  nb_obligations_maitrisees: number;
  score_architecture: number;
}

export interface CoreEntitySchema {
  nom_table: string;
  colonnes: { nom: string; type: string; contrainte: string; description: string }[];
  index: { nom: string; colonnes: string; type: string }[];
  relations: { cible: string; type: string; via: string }[];
}

export interface KnowledgeGraphRelation {
  source: string;
  relation: string;
  cible: string;
  cardinalite: string;
  description: string;
  properties: string[];
}

export interface PgVectorSchema {
  nom_table: string;
  colonnes: { nom: string; type: string; description: string }[];
  index_vecteur: { type: string; metrique: string; liste: number };
  requetes_supportees: string[];
}

export interface ScoringFormula {
  id: string;
  nom: string;
  formule: string;
  variables: { nom: string; description: string }[];
  seuils: { min: number; max: number; label: string; couleur: string }[];
}

export interface InspectionModel {
  autorite: string;
  phases: { etape: number; nom: string; duree_j: number; actions: string[]; livrables: string[] }[];
  questions_inspection: { ref: string; question: string; domaine: string; evidence_attendue: string; criticite: 'Critique' | 'Élevé' | 'Modéré' }[];
}

export interface N8nWorkflowDef {
  id: string;
  nom: string;
  declencheur: string;
  noeuds: { id: string; type: string; action: string; input?: string; output?: string; config?: Record<string, string> }[];
  score_automatisation: number;
  temps_execution_estime_s: number;
}

export interface AIAgentDef {
  id: string;
  nom: string;
  mission: string;
  inputs: string[];
  outputs: string[];
  decision_logic: string[];
  regles_escalade: { condition: string; action: string }[];
  confidence_minimale: number;
  modele: string;
}

export interface ReportTemplate {
  id: string;
  nom: string;
  destinataire: string;
  sections: { numero: number; titre: string; contenu_type: string; sources_donnees: string[] }[];
  frequence: string;
  format: 'PDF' | 'Dashboard' | 'Excel';
}

export interface DesignPrinciple {
  id: string;
  principe: string;
  description: string;
  regle_implementation: string;
  violation_consequence: string;
}

// ═══════════════════════ Section Data Model ═══════════════════════

export interface Section1Data {
  schemas: CoreEntitySchema[];
  sql_ddl_preview: Record<string, string>;
  total_tables: number;
  total_colonnes: number;
  total_relations: number;
}

export interface Section2Data {
  relations: KnowledgeGraphRelation[];
  graph_stats: { noeuds: number; relations_count: number; types_relations: number };
  requetes_cypher_examples: string[];
}

export interface Section3Data {
  schema_vecteur: PgVectorSchema;
  parametres_indexation: Record<string, string>;
  fonctions_sql: string[];
  benchmark: { requetes_seconde: number; precision_top5: number; latence_ms: number };
}

export interface Section4Data {
  formules: ScoringFormula[];
  tables_scores: { institution: string; score_global: number; score_gouvernance: number; score_aml: number; score_risque: number; score_it: number; score_audit: number; classification: string }[];
}

export interface Section5Data {
  modeles_inspection: InspectionModel[];
  score_readiness: number;
}

export interface Section6Data {
  workflows: N8nWorkflowDef[];
  couverture_processus_pct: number;
}

export interface Section7Data {
  agents: AIAgentDef[];
  orchestration: string;
}

export interface Section8Data {
  rapports: ReportTemplate[];
  total_rapports: number;
}

export interface Section9Data {
  principes: DesignPrinciple[];
  taux_tracabilite: number;
}

// ═══════════════════════ Architecture Deliverable ═══════════════════════

export interface ArchitectureDeliverable {
  scenario: ArchitectureScenario;
  section1: Section1Data;
  section2: Section2Data;
  section3: Section3Data;
  section4: Section4Data;
  section5: Section5Data;
  section6: Section6Data;
  section7: Section7Data;
  section8: Section8Data;
  section9: Section9Data;
  metadata: { arch_id: string; date_modele: string; version_schema: string; couverture_reglementaire_pct: number };
}

// ═══════════════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════════════

export const ARCHITECTURE_SCENARIOS: ArchitectureScenario[] = [
  {
    id: 'RDA-001',
    nom_institution: 'Banque Commerciale CEMAC — Architecture Multi-Textes',
    type_institution: 'Banque',
    zone: 'CEMAC — Cameroun, Gabon, Congo, RCA, Tchad, Guinée Équatoriale',
    autorites: ['COBAC', 'BEAC', 'GABAC', 'GAFI', 'GIABA'],
    description: 'Modèle de données réglementaire complet pour une banque commerciale opérant dans toute la zone CEMAC. Intégration COBAC R-2026/03, BEAC n°008-2026, GABAC n°01/2026 et 40 Recommandations GAFI dans un schéma PostgreSQL normalisé avec Knowledge Graph et pgVector.',
    complexite: 'Maximale',
    nb_entites_reglementaires: 248,
    nb_obligations_maitrisees: 156,
    score_architecture: 94,
  },
  {
    id: 'RDA-002',
    nom_institution: 'EMF UEMOA — Modèle BCEAO/Commission Bancaire',
    type_institution: 'EMF',
    zone: 'UEMOA — Sénégal, Côte d\'Ivoire, Burkina Faso, Mali, Niger, Togo, Bénin, Guinée-Bissau',
    autorites: ['BCEAO', 'Commission Bancaire UMOA', 'GAFI', 'GIABA'],
    description: 'Architecture de données réglementaire pour un Établissement de Microfinance de 1ère catégorie en zone UEMOA. Mapping complet des Instructions BCEAO (008, 018, 019, 020, 025, 026, 030) et exigences Commission Bancaire dans un graphe de connaissances traçable.',
    complexite: 'Haute',
    nb_entites_reglementaires: 182,
    nb_obligations_maitrisees: 112,
    score_architecture: 88,
  },
  {
    id: 'RDA-003',
    nom_institution: 'FinTech Paiement CEMAC — Architecture Agile',
    type_institution: 'FinTech',
    zone: 'CEMAC — Congo, Gabon',
    autorites: ['COBAC', 'BEAC', 'GABAC', 'GAFI'],
    description: 'Modèle de données réglementaire optimisé pour une FinTech de paiement. Architecture allégée mais exhaustive, avec focus sur KYC digital, screening temps réel, sécurité SI et gouvernance agile. Intégration native pgVector pour le matching réglementaire automatisé.',
    complexite: 'Haute',
    nb_entites_reglementaires: 156,
    nb_obligations_maitrisees: 94,
    score_architecture: 91,
  },
  {
    id: 'RDA-004',
    nom_institution: 'Groupe Bancaire Panafricain — Architecture Fédérée Multi-Juridictionnelle',
    type_institution: 'Multi-Juridictionnel',
    zone: 'CEMAC + UEMOA — 12 filiales dans 10 pays',
    autorites: ['COBAC', 'BCEAO', 'BEAC', 'Commission Bancaire UMOA', 'GABAC', 'GAFI', 'GIABA', 'OHADA'],
    description: 'Architecture de données réglementaire fédérée pour un groupe bancaire panafricain. Modèle multi-juridictionnel avec harmonisation COBAC/BCEAO, Knowledge Graph inter-filiales, vector store partagé et scoring consolidé. Le graal de l\'architecture réglementaire africaine.',
    complexite: 'Maximale',
    nb_entites_reglementaires: 412,
    nb_obligations_maitrisees: 287,
    score_architecture: 97,
  },
];

// ═══════════════════════════════════════════════
// SECTION 1 — CORE REGULATORY ENTITIES (common)
// ═══════════════════════════════════════════════

const SECTION1_COMMON: Section1Data = {
  schemas: [
    {
      nom_table: 'regulations',
      colonnes: [
        { nom: 'regulation_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique de la réglementation' },
        { nom: 'authority', type: 'TEXT NOT NULL', contrainte: 'NOT NULL, CHECK(authority IN (...))', description: 'Autorité émettrice : COBAC, BEAC, BCEAO, GABAC, GAFI, GIABA, Commission Bancaire UMOA' },
        { nom: 'title', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Titre officiel complet' },
        { nom: 'reference', type: 'TEXT NOT NULL UNIQUE', contrainte: 'UNIQUE NOT NULL', description: 'Référence officielle : COBAC R-2026/03, BEAC n°008-2026' },
        { nom: 'publication_date', type: 'DATE NOT NULL', contrainte: 'NOT NULL', description: 'Date de publication au journal officiel' },
        { nom: 'effective_date', type: 'DATE NOT NULL', contrainte: 'NOT NULL', description: 'Date d\'entrée en vigueur' },
        { nom: 'status', type: 'TEXT NOT NULL DEFAULT \'active\'', contrainte: 'CHECK(status IN (\'active\',\'abrogated\',\'amended\',\'pending\'))', description: 'Statut actuel du texte' },
        { nom: 'domain', type: 'TEXT[] NOT NULL', contrainte: 'NOT NULL', description: 'Domaines : {LBC/FT, gouvernance, prudentiel, SI, risque, audit}' },
        { nom: 'summary', type: 'TEXT', contrainte: '', description: 'Résumé exécutif du texte' },
        { nom: 'source_url', type: 'TEXT', contrainte: '', description: 'URL source officielle' },
        { nom: 'version', type: 'INTEGER DEFAULT 1', contrainte: '', description: 'Version du texte (amendements)' },
        { nom: 'jurisdiction', type: 'TEXT NOT NULL', contrainte: 'CHECK(jurisdiction IN (\'CEMAC\',\'UEMOA\',\'OHADA\',\'International\'))', description: 'Juridiction' },
        { nom: 'created_at', type: 'TIMESTAMPTZ DEFAULT NOW()', contrainte: '', description: 'Date création enregistrement' },
        { nom: 'updated_at', type: 'TIMESTAMPTZ DEFAULT NOW()', contrainte: '', description: 'Date dernière modification' },
      ],
      index: [
        { nom: 'idx_regulations_authority', colonnes: 'authority', type: 'BTREE' },
        { nom: 'idx_regulations_domain', colonnes: 'domain', type: 'GIN' },
        { nom: 'idx_regulations_status', colonnes: 'status', type: 'BTREE' },
        { nom: 'idx_regulations_jurisdiction', colonnes: 'jurisdiction', type: 'BTREE' },
      ],
      relations: [
        { cible: 'articles', type: '1:N', via: 'regulation_id' },
        { cible: 'compliance_scores', type: '1:N', via: 'regulation_id' },
      ],
    },
    {
      nom_table: 'articles',
      colonnes: [
        { nom: 'article_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique de l\'article' },
        { nom: 'regulation_id', type: 'UUID NOT NULL REFERENCES regulations(regulation_id) ON DELETE CASCADE', contrainte: 'FOREIGN KEY', description: 'Référence à la réglementation parente' },
        { nom: 'article_number', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Numéro d\'article : Art. 7, Art. 12.3' },
        { nom: 'title', type: 'TEXT', contrainte: '', description: 'Titre de l\'article' },
        { nom: 'content', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Contenu intégral de l\'article' },
        { nom: 'keywords', type: 'TEXT[]', contrainte: '', description: 'Mots-clés extraits pour recherche' },
        { nom: 'vector_embedding', type: 'vector(1536)', contrainte: '', description: 'Embedding vectoriel OpenAI text-embedding-3-small' },
        { nom: 'token_count', type: 'INTEGER', contrainte: '', description: 'Nombre de tokens du contenu' },
        { nom: 'obligations_extracted', type: 'JSONB', contrainte: '', description: 'Obligations extraites automatiquement' },
      ],
      index: [
        { nom: 'idx_articles_regulation_id', colonnes: 'regulation_id', type: 'BTREE' },
        { nom: 'idx_articles_keywords', colonnes: 'keywords', type: 'GIN' },
        { nom: 'idx_articles_embedding', colonnes: 'vector_embedding', type: 'IVFFLAT vector_cosine_ops' },
      ],
      relations: [
        { cible: 'regulations', type: 'N:1', via: 'regulation_id' },
        { cible: 'obligations', type: '1:N', via: 'article_id' },
      ],
    },
    {
      nom_table: 'obligations',
      colonnes: [
        { nom: 'obligation_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique' },
        { nom: 'article_id', type: 'UUID NOT NULL REFERENCES articles(article_id)', contrainte: 'FOREIGN KEY', description: 'Article source' },
        { nom: 'obligation_text', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Texte de l\'obligation en langage clair' },
        { nom: 'obligation_type', type: 'TEXT NOT NULL', contrainte: 'CHECK(obligation_type IN (\'interdiction\',\'mandatory\',\'conditional\',\'reporting\',\'governance\'))', description: 'Type d\'obligation' },
        { nom: 'applicability', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Condition d\'applicabilité' },
        { nom: 'risk_level', type: 'TEXT NOT NULL', contrainte: 'CHECK(risk_level IN (\'critical\',\'high\',\'medium\',\'low\'))', description: 'Niveau de risque en cas de non-conformité' },
        { nom: 'control_required', type: 'BOOLEAN DEFAULT true', contrainte: '', description: 'Contrôle obligatoire ?' },
        { nom: 'evidence_required', type: 'TEXT[]', contrainte: '', description: 'Types de preuves attendues' },
        { nom: 'deadline', type: 'DATE', contrainte: '', description: 'Date butoir de mise en conformité' },
        { nom: 'sanction_potentielle', type: 'TEXT', contrainte: '', description: 'Sanction encourue' },
        { nom: 'freetext_search', type: 'tsvector GENERATED ALWAYS AS (to_tsvector(\'french\', obligation_text)) STORED', contrainte: '', description: 'Index full-text français' },
      ],
      index: [
        { nom: 'idx_obligations_article_id', colonnes: 'article_id', type: 'BTREE' },
        { nom: 'idx_obligations_type', colonnes: 'obligation_type', type: 'BTREE' },
        { nom: 'idx_obligations_risk', colonnes: 'risk_level', type: 'BTREE' },
        { nom: 'idx_obligations_fts', colonnes: 'freetext_search', type: 'GIN' },
      ],
      relations: [
        { cible: 'articles', type: 'N:1', via: 'article_id' },
        { cible: 'controls', type: '1:N', via: 'obligation_id' },
        { cible: 'audit_findings', type: '1:N', via: 'obligation_id' },
      ],
    },
    {
      nom_table: 'controls',
      colonnes: [
        { nom: 'control_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique' },
        { nom: 'obligation_id', type: 'UUID NOT NULL REFERENCES obligations(obligation_id)', contrainte: 'FOREIGN KEY', description: 'Obligation couverte' },
        { nom: 'control_name', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Nom du contrôle' },
        { nom: 'control_description', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Description détaillée' },
        { nom: 'control_type', type: 'TEXT NOT NULL', contrainte: 'CHECK(control_type IN (\'preventive\',\'detective\',\'corrective\'))', description: 'Type de contrôle ISO/COSO' },
        { nom: 'frequency', type: 'TEXT NOT NULL', contrainte: 'CHECK(frequency IN (\'daily\',\'weekly\',\'monthly\',\'quarterly\',\'annual\',\'continuous\'))', description: 'Fréquence d\'exécution' },
        { nom: 'owner', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Propriétaire du contrôle' },
        { nom: 'criticality', type: 'TEXT NOT NULL', contrainte: 'CHECK(criticality IN (\'P0\',\'P1\',\'P2\',\'P3\'))', description: 'Criticité' },
        { nom: 'automation_level', type: 'INTEGER DEFAULT 0', contrainte: 'CHECK(automation_level BETWEEN 0 AND 100)', description: 'Niveau d\'automatisation (%)' },
        { nom: 'kpi_threshold', type: 'JSONB', contrainte: '', description: 'Seuils KPI du contrôle' },
        { nom: 'last_executed', type: 'TIMESTAMPTZ', contrainte: '', description: 'Dernière exécution' },
        { nom: 'status', type: 'TEXT DEFAULT \'active\'', contrainte: 'CHECK(status IN (\'active\',\'inactive\',\'under_review\'))', description: 'Statut' },
      ],
      index: [
        { nom: 'idx_controls_obligation_id', colonnes: 'obligation_id', type: 'BTREE' },
        { nom: 'idx_controls_owner', colonnes: 'owner', type: 'BTREE' },
      ],
      relations: [
        { cible: 'obligations', type: 'N:1', via: 'obligation_id' },
        { cible: 'evidence', type: '1:N', via: 'control_id' },
        { cible: 'risks', type: 'N:M', via: 'control_risk_mitigation' },
      ],
    },
    {
      nom_table: 'risks',
      colonnes: [
        { nom: 'risk_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique' },
        { nom: 'category', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Catégorie : conformité, opérationnel, réputationnel, stratégique, financier' },
        { nom: 'subcategory', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Sous-catégorie' },
        { nom: 'description', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Description du risque' },
        { nom: 'impact_score', type: 'INTEGER NOT NULL', contrainte: 'CHECK(impact_score BETWEEN 1 AND 5)', description: 'Score d\'impact (1-5)' },
        { nom: 'likelihood_score', type: 'INTEGER NOT NULL', contrainte: 'CHECK(likelihood_score BETWEEN 1 AND 5)', description: 'Score de probabilité (1-5)' },
        { nom: 'inherent_risk', type: 'INTEGER GENERATED ALWAYS AS (impact_score * likelihood_score) STORED', contrainte: '', description: 'Risque inhérent = I × P' },
        { nom: 'residual_risk', type: 'INTEGER', contrainte: '', description: 'Risque résiduel après contrôles' },
        { nom: 'risk_owner', type: 'TEXT', contrainte: '', description: 'Propriétaire du risque' },
        { nom: 'mitigation_plan', type: 'TEXT', contrainte: '', description: 'Plan de mitigation' },
        { nom: 'trend', type: 'TEXT', contrainte: 'CHECK(trend IN (\'increasing\',\'decreasing\',\'stable\'))', description: 'Tendance' },
      ],
      index: [
        { nom: 'idx_risks_category', colonnes: 'category', type: 'BTREE' },
        { nom: 'idx_risks_inherent', colonnes: 'inherent_risk', type: 'BTREE' },
      ],
      relations: [
        { cible: 'controls', type: 'N:M', via: 'control_risk_mitigation' },
      ],
    },
    {
      nom_table: 'evidence',
      colonnes: [
        { nom: 'evidence_id', type: 'UUID PK DEFAULT gen_random_uuid()', contrainte: 'PRIMARY KEY', description: 'Identifiant unique' },
        { nom: 'control_id', type: 'UUID NOT NULL REFERENCES controls(control_id)', contrainte: 'FOREIGN KEY', description: 'Contrôle associé' },
        { nom: 'evidence_type', type: 'TEXT NOT NULL', contrainte: 'CHECK(evidence_type IN (\'document\',\'screenshot\',\'log\',\'email\',\'report\',\'attestation\'))', description: 'Type de preuve' },
        { nom: 'evidence_description', type: 'TEXT NOT NULL', contrainte: 'NOT NULL', description: 'Description de la preuve' },
        { nom: 'file_location', type: 'TEXT', contrainte: '', description: 'Chemin du fichier (Supabase Storage)' },
        { nom: 'validation_status', type: 'TEXT DEFAULT \'pending\'', contrainte: 'CHECK(validation_status IN (\'pending\',\'validated\',\'rejected\',\'expired\'))', description: 'Statut de validation' },
        { nom: 'validated_by', type: 'UUID', contrainte: '', description: 'Validateur' },
        { nom: 'validated_at', type: 'TIMESTAMPTZ', contrainte: '', description: 'Date validation' },
        { nom: 'expiry_date', type: 'DATE', contrainte: '', description: 'Date d\'expiration de la preuve' },
        { nom: 'hash_sha256', type: 'TEXT', contrainte: '', description: 'Empreinte SHA-256 pour intégrité' },
      ],
      index: [
        { nom: 'idx_evidence_control_id', colonnes: 'control_id', type: 'BTREE' },
        { nom: 'idx_evidence_status', colonnes: 'validation_status', type: 'BTREE' },
      ],
      relations: [
        { cible: 'controls', type: 'N:1', via: 'control_id' },
      ],
    },
  ],
  sql_ddl_preview: {
    'regulations': 'CREATE TABLE regulations (\n  regulation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  authority TEXT NOT NULL CHECK(authority IN (\'COBAC\',\'BEAC\',\'BCEAO\',\'GABAC\',\'GAFI\',\'GIABA\',\'Commission Bancaire UMOA\')),\n  title TEXT NOT NULL,\n  reference TEXT NOT NULL UNIQUE,\n  publication_date DATE NOT NULL,\n  effective_date DATE NOT NULL,\n  status TEXT NOT NULL DEFAULT \'active\',\n  domain TEXT[] NOT NULL,\n  summary TEXT,\n  source_url TEXT,\n  version INTEGER DEFAULT 1,\n  jurisdiction TEXT NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);',
    'articles': 'CREATE TABLE articles (\n  article_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  regulation_id UUID NOT NULL REFERENCES regulations(regulation_id) ON DELETE CASCADE,\n  article_number TEXT NOT NULL,\n  title TEXT,\n  content TEXT NOT NULL,\n  keywords TEXT[],\n  vector_embedding vector(1536),\n  token_count INTEGER,\n  obligations_extracted JSONB\n);',
    'obligations': 'CREATE TABLE obligations (\n  obligation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  article_id UUID NOT NULL REFERENCES articles(article_id),\n  obligation_text TEXT NOT NULL,\n  obligation_type TEXT NOT NULL,\n  applicability TEXT NOT NULL,\n  risk_level TEXT NOT NULL,\n  control_required BOOLEAN DEFAULT true,\n  evidence_required TEXT[],\n  deadline DATE,\n  sanction_potentielle TEXT,\n  freetext_search tsvector GENERATED ALWAYS AS (to_tsvector(\'french\', obligation_text)) STORED\n);',
  },
  total_tables: 6,
  total_colonnes: 62,
  total_relations: 9,
};

// ═══════════════════════════════════════════════
// SECTION 2 — KNOWLEDGE GRAPH MODEL (common)
// ═══════════════════════════════════════════════

const SECTION2_COMMON: Section2Data = {
  relations: [
    { source: 'REGULATION', relation: 'CONTAINS', cible: 'ARTICLE', cardinalite: '1:N', description: 'Une réglementation contient plusieurs articles', properties: ['regulation_id', 'article_count'] },
    { source: 'ARTICLE', relation: 'CREATES', cible: 'OBLIGATION', cardinalite: '1:N', description: 'Un article crée une ou plusieurs obligations', properties: ['article_id', 'obligation_type'] },
    { source: 'OBLIGATION', relation: 'REQUIRES', cible: 'CONTROL', cardinalite: '1:N', description: 'Une obligation nécessite un ou plusieurs contrôles', properties: ['obligation_id', 'control_type', 'criticality'] },
    { source: 'CONTROL', relation: 'REQUIRES', cible: 'EVIDENCE', cardinalite: '1:N', description: 'Un contrôle nécessite des preuves', properties: ['control_id', 'evidence_type'] },
    { source: 'CONTROL', relation: 'MITIGATES', cible: 'RISK', cardinalite: 'N:M', description: 'Un contrôle atténue un ou plusieurs risques', properties: ['control_id', 'risk_id', 'mitigation_factor'] },
    { source: 'RISK', relation: 'BELONGS_TO', cible: 'RISK_CATEGORY', cardinalite: 'N:1', description: 'Un risque appartient à une catégorie', properties: ['category', 'subcategory'] },
    { source: 'INSPECTION', relation: 'TESTS', cible: 'CONTROL', cardinalite: 'N:M', description: 'Une inspection teste des contrôles', properties: ['inspection_id', 'control_id', 'test_date', 'result'] },
    { source: 'AUDIT_FINDING', relation: 'REFERENCES', cible: 'OBLIGATION', cardinalite: 'N:1', description: 'Un constat d\'audit référence une obligation', properties: ['finding_id', 'obligation_id', 'severity'] },
    { source: 'AUDIT_FINDING', relation: 'GENERATES', cible: 'RECOMMENDATION', cardinalite: '1:N', description: 'Un constat génère des recommandations', properties: ['finding_id', 'recommendation_id', 'priority'] },
    { source: 'RECOMMENDATION', relation: 'FEEDS', cible: 'REMEDIATION_PLAN', cardinalite: 'N:1', description: 'Les recommandations alimentent le plan de remédiation', properties: ['recommendation_id', 'plan_id'] },
    { source: 'INSTITUTION', relation: 'SUBJECT_TO', cible: 'REGULATION', cardinalite: 'N:M', description: 'Une institution est soumise à des réglementations', properties: ['institution_id', 'regulation_id', 'applicability'] },
    { source: 'INSTITUTION', relation: 'HAS', cible: 'COMPLIANCE_SCORE', cardinalite: '1:N', description: 'Une institution a un historique de scores', properties: ['institution_id', 'score_date', 'score_global'] },
  ],
  graph_stats: { noeuds: 12, relations_count: 12, types_relations: 12 },
  requetes_cypher_examples: [
    'MATCH (r:REGULATION {authority: "COBAC"})-[:CONTAINS]->(a:ARTICLE)-[:CREATES]->(o:OBLIGATION {risk_level: "critical"}) RETURN r.reference, a.article_number, o.obligation_text',
    'MATCH (i:INSTITUTION {id: "banque-atlantique"})-[:SUBJECT_TO]->(r:REGULATION)-[:CONTAINS]->(a:ARTICLE)-[:CREATES]->(o:OBLIGATION) WHERE o.risk_level IN ["critical","high"] RETURN o, r',
    'MATCH (c:CONTROL)-[:MITIGATES]->(risk:RISK) WHERE risk.inherent_risk > 15 RETURN c.control_name, risk.description, risk.inherent_risk ORDER BY risk.inherent_risk DESC',
    'MATCH (f:AUDIT_FINDING)-[:REFERENCES]->(o:OBLIGATION)-[:REQUIRES]->(c:CONTROL) WHERE f.severity = "Critique" AND c.status = "inactive" RETURN f, o, c',
  ],
};

// ═══════════════════════════════════════════════
// SECTION 3 — PGVECTOR ARCHITECTURE (common)
// ═══════════════════════════════════════════════

const SECTION3_COMMON: Section3Data = {
  schema_vecteur: {
    nom_table: 'regulatory_document_chunks',
    colonnes: [
      { nom: 'chunk_id', type: 'UUID PK DEFAULT gen_random_uuid()', description: 'Identifiant unique du chunk' },
      { nom: 'document_id', type: 'TEXT NOT NULL', description: 'Identifiant du document source' },
      { nom: 'source', type: 'TEXT NOT NULL', description: 'Source : COBAC, BEAC, BCEAO, GABAC, GAFI, GIABA' },
      { nom: 'authority', type: 'TEXT NOT NULL', description: 'Autorité émettrice' },
      { nom: 'regulation', type: 'TEXT NOT NULL', description: 'Référence réglementation' },
      { nom: 'article', type: 'TEXT', description: 'Numéro article' },
      { nom: 'text_chunk', type: 'TEXT NOT NULL', description: 'Texte du chunk (500 tokens max)' },
      { nom: 'embedding', type: 'vector(1536)', description: 'Embedding OpenAI text-embedding-3-small' },
      { nom: 'keywords', type: 'TEXT[]', description: 'Mots-clés extraits' },
      { nom: 'jurisdiction', type: 'TEXT NOT NULL', description: 'Juridiction CEMAC/UEMOA' },
      { nom: 'date', type: 'DATE', description: 'Date du texte source' },
      { nom: 'chunk_index', type: 'INTEGER NOT NULL', description: 'Index du chunk dans le document' },
      { nom: 'token_count', type: 'INTEGER', description: 'Nombre de tokens' },
    ],
    index_vecteur: { type: 'IVFFlat', metrique: 'vector_cosine_ops', liste: 100 },
    requetes_supportees: [
      'Recherche sémantique : SELECT * FROM regulatory_document_chunks ORDER BY embedding <=> query_embedding LIMIT 10;',
      'Recherche hybride (sémantique + full-text) avec RRF (Reciprocal Rank Fusion)',
      'Question-réponse réglementaire avec RAG (Retrieval-Augmented Generation)',
      'Recherche par juridiction filtrée : WHERE jurisdiction = \'CEMAC\'',
      'Recherche par autorité + sémantique combinée',
    ],
    fonctions_sql: [
      'CREATE OR REPLACE FUNCTION search_regulations(query_text TEXT, jurisdiction_filter TEXT DEFAULT NULL, top_k INT DEFAULT 10)',
      'CREATE OR REPLACE FUNCTION hybrid_search_regulations(query_text TEXT, jurisdiction_filter TEXT DEFAULT NULL, top_k INT DEFAULT 10)',
      'CREATE OR REPLACE FUNCTION embed_and_store_regulation(regulation_id UUID) RETURNS void',
      'CREATE OR REPLACE FUNCTION rag_query_compliance(question TEXT, institution_id UUID) RETURNS JSONB',
      'CREATE OR REPLACE FUNCTION batch_reindex_regulations() RETURNS void',
    ],
    parametres_indexation: {
      'modèle_embedding': 'text-embedding-3-small (OpenAI)',
      'dimension_vecteur': '1536',
      'taille_max_chunk': '500 tokens',
      'chevauchement_chunks': '50 tokens',
      'méthode_découpage': 'RecursiveCharacterTextSplitter',
      'stratégie_indexation': 'IVFFlat avec 100 listes',
      'fréquence_reindexation': 'Après chaque nouveau texte ou amendement',
    },
    benchmark: { requetes_seconde: 45, precision_top5: 96.2, latence_ms: 85 },
  },
};

// ═══════════════════════════════════════════════
// SECTION 4 — COMPLIANCE SCORING (per scenario)
// ═══════════════════════════════════════════════

const SECTION4_BASE: ScoringFormula[] = [
  {
    id: 'SCORE-GLOBAL',
    nom: 'Score de Conformité Global',
    formule: 'Score_Global = Σ(W_axe × Score_axe) / Σ(W_axe) où W_axe = poids de l\'axe, Score_axe = Contrôles_Implémentés(axe) / Contrôles_Requis(axe) × 100',
    variables: [
      { nom: 'W_gouvernance', description: 'Poids gouvernance : 25%' },
      { nom: 'W_aml', description: 'Poids AML/CFT : 30%' },
      { nom: 'W_risque', description: 'Poids gestion des risques : 20%' },
      { nom: 'W_it', description: 'Poids sécurité IT : 15%' },
      { nom: 'W_audit', description: 'Poids audit interne : 10%' },
      { nom: 'Contrôles_Implémentés', description: 'Contrôles avec statut actif + preuve validée' },
      { nom: 'Contrôles_Requis', description: 'Total des contrôles requis pour l\'institution' },
    ],
    seuils: [
      { min: 90, max: 100, label: 'Excellent', couleur: 'emerald' },
      { min: 75, max: 89, label: 'Satisfaisant', couleur: 'sky' },
      { min: 60, max: 74, label: 'Insuffisant', couleur: 'amber' },
      { min: 0, max: 59, label: 'Critique', couleur: 'red' },
    ],
  },
  {
    id: 'SCORE-AML',
    nom: 'Score AML/CFT/CPF',
    formule: 'Score_AML = 0.35 × KYC + 0.25 × BE + 0.20 × DS + 0.15 × Formation + 0.05 × Screening',
    variables: [
      { nom: 'KYC', description: 'Complétude CDD/KYC' },
      { nom: 'BE', description: 'Registre Bénéficiaires Effectifs' },
      { nom: 'DS', description: 'Déclarations de soupçons' },
      { nom: 'Formation', description: 'Taux de formation LBC/FT' },
      { nom: 'Screening', description: 'Screening listes sanctions' },
    ],
    seuils: [
      { min: 90, max: 100, label: 'Robuste', couleur: 'emerald' },
      { min: 75, max: 89, label: 'Conforme', couleur: 'sky' },
      { min: 60, max: 74, label: 'Partiel', couleur: 'amber' },
      { min: 0, max: 59, label: 'Défaillant', couleur: 'red' },
    ],
  },
  {
    id: 'SCORE-RISK',
    nom: 'Score Gestion des Risques',
    formule: 'Score_Risque = 0.40 × Couverture_Contrôles + 0.30 × Réduction_Risque_Résiduel + 0.20 × Maturité_ERM + 0.10 × Reporting_Risque',
    variables: [
      { nom: 'Couverture_Contrôles', description: '% risques couverts par au moins 1 contrôle' },
      { nom: 'Réduction_Risque_Résiduel', description: 'Ratio risque inhérent → résiduel moyen' },
      { nom: 'Maturité_ERM', description: 'Niveau maturité Enterprise Risk Management (1-5)' },
      { nom: 'Reporting_Risque', description: 'Qualité reporting risque au CA' },
    ],
    seuils: [
      { min: 85, max: 100, label: 'Avancé', couleur: 'emerald' },
      { min: 70, max: 84, label: 'Mature', couleur: 'sky' },
      { min: 50, max: 69, label: 'Émergent', couleur: 'amber' },
      { min: 0, max: 49, label: 'Inexistant', couleur: 'red' },
    ],
  },
];

// ═══════════════════════════════════════════════
// SECTION 5 — INSPECTION SIMULATION (per scenario)
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
// SECTION 6 — N8N ORCHESTRATION (common)
// ═══════════════════════════════════════════════

const SECTION6_COMMON: Section6Data = {
  workflows: [
    {
      id: 'WF-REG-INGEST',
      nom: 'Régulation Ingestion Pipeline',
      declencheur: 'Webhook — Nouvelle régulation publiée (flux RSS COBAC, BEAC, BCEAO) ou Cron hebdomadaire',
      noeuds: [
        { id: 'n1', type: 'Webhook', action: 'Réception notification nouvelle régulation' },
        { id: 'n2', type: 'HTTP Request', action: 'Téléchargement PDF depuis source_url' },
        { id: 'n3', type: 'Function', action: 'Parsing PDF → extraction texte structuré (articles, références, dates)' },
        { id: 'n4', type: 'Function', action: 'Découpage en chunks 500 tokens avec chevauchement 50 tokens' },
        { id: 'n5', type: 'HTTP Request', action: 'Appel OpenAI Embeddings API → vector(1536)' },
        { id: 'n6', type: 'Supabase', action: 'INSERT chunks dans regulatory_document_chunks' },
        { id: 'n7', type: 'Supabase', action: 'INSERT regulation + articles + obligations extraites' },
        { id: 'n8', type: 'Function', action: 'Création index IVFFlat si nécessaire' },
        { id: 'n9', type: 'Supabase', action: 'UPDATE regulation status = active' },
        { id: 'n10', type: 'Email', action: 'Notification équipe compliance : nouvelle régulation indexée' },
      ],
      score_automatisation: 95,
      temps_execution_estime_s: 25,
    },
    {
      id: 'WF-COMPLIANCE-ASSESS',
      nom: 'Compliance Assessment Pipeline',
      declencheur: 'Cron mensuel ou trigger manuel — Évaluation conformité institution',
      noeuds: [
        { id: 'n1', type: 'Supabase', action: 'SELECT institution, applicable regulations' },
        { id: 'n2', type: 'Function', action: 'Mapping obligations → contrôles requis' },
        { id: 'n3', type: 'Function', action: 'Vérification statut chaque contrôle (active/inactive)' },
        { id: 'n4', type: 'Function', action: 'Vérification preuves valides pour chaque contrôle' },
        { id: 'n5', type: 'Function', action: 'Calcul Score_Global = Σ(W × Score_axe)' },
        { id: 'n6', type: 'Function', action: 'Calcul scores par axe (Gouvernance, AML, Risque, IT, Audit)' },
        { id: 'n7', type: 'Function', action: 'Détection gaps : obligations sans contrôle, contrôles sans preuve' },
        { id: 'n8', type: 'Supabase', action: 'INSERT compliance_scores' },
        { id: 'n9', type: 'HTTP Request', action: 'Génération rapport PDF (API KOS Report Generator)' },
        { id: 'n10', type: 'Email', action: 'Envoi rapport au CCO + DG avec résumé exécutif' },
        { id: 'n11', type: 'Supabase', action: 'UPDATE institution compliance status' },
      ],
      score_automatisation: 90,
      temps_execution_estime_s: 45,
    },
    {
      id: 'WF-INSPECTION-READY',
      nom: 'Inspection Readiness Pipeline',
      declencheur: 'Trigger manuel — Préparation inspection COBAC/BCEAO',
      noeuds: [
        { id: 'n1', type: 'Supabase', action: 'SELECT institution + autorité inspection' },
        { id: 'n2', type: 'Function', action: 'Chargement modèle inspection (checklist autorité)' },
        { id: 'n3', type: 'Function', action: 'Simulation : réponse automatique à chaque question inspection' },
        { id: 'n4', type: 'Function', action: 'Identification gaps par question → génération constats simulés' },
        { id: 'n5', type: 'Function', action: 'Calcul score inspection simulée' },
        { id: 'n6', type: 'Function', action: 'Génération plan de remédiation priorisé P0-P3' },
        { id: 'n7', type: 'HTTP Request', action: 'Génération rapport PDF + Dashboard interactif' },
        { id: 'n8', type: 'Supabase', action: 'INSERT inspection_simulation_results' },
        { id: 'n9', type: 'Email', action: 'Envoi rapport au COMEX avec alertes critiques' },
        { id: 'n10', type: 'Webhook', action: 'Notification Slack équipe conformité' },
      ],
      score_automatisation: 88,
      temps_execution_estime_s: 60,
    },
  ],
  couverture_processus_pct: 92,
};

// ═══════════════════════════════════════════════
// SECTION 7 — AI AGENTS (common)
// ═══════════════════════════════════════════════

const SECTION7_COMMON: Section7Data = {
  agents: [
    {
      id: 'AGENT-COBAC',
      nom: 'Agent COBAC — Interprète Prudentiel',
      mission: 'Interpréter les exigences prudentielles COBAC, extraire les obligations, classifier les risques et générer des contrôles automatiquement.',
      inputs: ['Texte intégral réglementation COBAC', 'Profil institution (type, taille, zone)', 'Historique conformité', 'Rapports inspection précédents'],
      outputs: ['Obligations structurées JSON', 'Contrôles générés automatiquement', 'Matrice applicabilité', 'Alertes non-conformité'],
      decision_logic: [
        'Si type_institution = Banque → Appliquer COBAC R-2025/07 Gouvernance complète',
        'Si type_institution = EMF → Appliquer COBAC R-2026/03 Art.30 spécifique EMF',
        'Si zone ∉ CEMAC → Désactiver agent (hors juridiction)',
        'Si dernière_inspection < 12 mois → Priorité HIGH',
      ],
      regles_escalade: [
        { condition: 'Obligation critique sans contrôle', action: 'Escalade → Agent Audit + Notification CCO' },
        { condition: 'Nouveau texte COBAC non indexé après 48h', action: 'Escalade → Agent Veille + Pipeline Ingestion' },
        { condition: 'Score conformité < 40/100', action: 'Escalade → Managing Partner + Plan Urgence' },
      ],
      confidence_minimale: 92,
      modele: 'GPT-4o + RAG pgVector COBAC',
    },
    {
      id: 'AGENT-AML',
      nom: 'Agent AML — LBC/FT/CPF',
      mission: 'Interpréter les obligations LBC/FT (GAFI 40 Recommandations, GABAC, GIABA), évaluer le dispositif KYC/CDD/BE/DS, scorer la conformité AML.',
      inputs: ['40 Recommandations GAFI', 'Directives GABAC', 'Rapports GIABA', 'Registre BE institution', 'Historique DS', 'Politique LBC/FT'],
      outputs: ['Score AML/CFT (0-100)', 'Gap analysis LBC/FT', 'Recommandations priorisées', 'Registre risques LBC/FT'],
      decision_logic: [
        'Si registre_BE = inexistant → Score KYC = 0, ALERTE CRITIQUE',
        'Si délai_moyen_DS > 5 jours → Score DS = 0, Recommandation Workflow Auto DS',
        'Si formation_LBCFT < 80% → Score Formation = 20, Plan rattrapage obligatoire',
        'Si screening_listes non quotidien → Score Screening = 30',
      ],
      regles_escalade: [
        { condition: 'Score AML < 30', action: 'Escalade immédiate → COMEX + Alerte GABAC potentielle' },
        { condition: 'Absence politique LBC/FT', action: 'Escalade → DG + Proposition génération automatique politique' },
      ],
      confidence_minimale: 95,
      modele: 'GPT-4o + RAG pgVector GAFI/GABAC/GIABA',
    },
    {
      id: 'AGENT-AUDIT',
      nom: 'Agent Audit — Contrôle & Testing',
      mission: 'Exécuter les tests de contrôle automatiquement, collecter les preuves, valider la conformité et générer les constats d\'audit.',
      inputs: ['Matrice contrôles', 'Preuves (documents, logs, captures)', 'Fréquence contrôle', 'Seuils KPI'],
      outputs: ['Résultats tests contrôle', 'Constat d\'audit (conforme / non conforme / partiel)', 'Score par contrôle', 'Recommandations correctives'],
      decision_logic: [
        'Si preuve_valide = false → Constat NON CONFORME',
        'Si preuve_valide = true AND dernière_exécution > fréquence → Constat PARTIEL',
        'Si preuve_valide = true AND dans_fréquence → Constat CONFORME',
        'Si contrôle P0 non conforme → ALERTE IMMÉDIATE + Plan remédiation 48h',
      ],
      regles_escalade: [
        { condition: '3 contrôles P0 non conformes', action: 'Escalade → COMEX + Convocation CA extraordinaire' },
        { condition: 'Preuve falsifiée (hash mismatch)', action: 'Escalade → Audit Forensique + Alerte conformité' },
      ],
      confidence_minimale: 90,
      modele: 'GPT-4o + Rule Engine + pgVector Evidence',
    },
    {
      id: 'AGENT-RISK',
      nom: 'Agent Risk — Évaluation & Heatmap',
      mission: 'Évaluer les risques (inhérents et résiduels), maintenir la heatmap 5×5, suivre les tendances et proposer des plans de mitigation.',
      inputs: ['Registre risques', 'Matrice contrôles', 'Historique incidents', 'Rapports audit interne'],
      outputs: ['Heatmap risques 5×5', 'Scores inhérent / résiduel par risque', 'Tendances (increasing/decreasing/stable)', 'Plans mitigation'],
      decision_logic: [
        'Si inherent_risk >= 20 (I×P) → Risque CRITIQUE — mitigation obligatoire',
        'Si inherent_risk entre 12 et 19 → Risque ÉLEVÉ — plan mitigation requis',
        'Si residual_risk > inherent_risk × 0.7 → Contrôles inefficaces — revoir',
        'Si trend = increasing sur 3 trimestres → Escalade CRO',
      ],
      regles_escalade: [
        { condition: 'Risque critique sans mitigation', action: 'Escalade → CRO + CA' },
        { condition: '3 risques en tendance increasing', action: 'Escalade → COMEX + Revue ERM' },
      ],
      confidence_minimale: 88,
      modele: 'GPT-4o + Modèle statistique Bayesien',
    },
    {
      id: 'AGENT-SI',
      nom: 'Agent SI — Gouvernance IT & Cybersécurité',
      mission: 'Évaluer la gouvernance SI, la cybersécurité (directive COBAC SI, ISO 27001), la résilience opérationnelle (PCA/PRA) et la protection des données.',
      inputs: ['Politique SSI', 'Rapports pentest', 'PCA/PRA', 'Registre incidents', 'Architecture SI'],
      outputs: ['Score sécurité SI (0-100)', 'Gap analysis cybersécurité', 'Plan remédiation SI', 'Matrice conformité ISO 27001'],
      decision_logic: [
        'Si dernier_pentest > 12 mois → Score pentest = 0, ALERTE',
        'Si PCA non testé > 12 mois → Score résilience = 0',
        'Si incidents critiques non résolus > 30j → Score incident = 10',
        'Si chiffrement données = AES-256 → Score crypto = 100',
      ],
      regles_escalade: [
        { condition: 'Vulnérabilité critique non patchée > 7j', action: 'Escalade → RSSI + DSI + COMEX' },
        { condition: 'Brèche de données confirmée', action: 'Escalade → COMEX + Notification COBAC 24h' },
      ],
      confidence_minimale: 90,
      modele: 'GPT-4o + RAG ISO 27001 + COBAC SI',
    },
    {
      id: 'AGENT-ADVISORY',
      nom: 'Agent Advisory — Recommandations & Board Report',
      mission: 'Synthétiser les outputs de tous les agents, générer des recommandations exécutives, produire les rapports board-ready et le dashboard consolidé.',
      inputs: ['Outputs Agent COBAC, AML, Audit, Risk, SI', 'Profil institution', 'Objectifs stratégiques', 'Budget conformité'],
      outputs: ['Rapport Board-Ready (PDF)', 'Dashboard exécutif', 'Recommandations priorisées P0-P3', 'Roadmap conformité 12-24 mois'],
      decision_logic: [
        'Si score_global < 40 → Priorité ABSOLUE — Plan de sauvetage',
        'Si score_global entre 40-65 → Plan remédiation 180 jours',
        'Si score_global entre 65-85 → Plan amélioration continue 12 mois',
        'Si score_global > 85 → Maintien + Anticipation nouveaux textes',
      ],
      regles_escalade: [
        { condition: 'Recommandation P0 non implémentée après 30j', action: 'Escalade → Managing Partner' },
        { condition: 'Rapport non distribué à J+5', action: 'Escalade → Agent Advisory (auto-escalade)' },
      ],
      confidence_minimale: 85,
      modele: 'GPT-4o + Synthèse Multi-Agent',
    },
  ],
  orchestration: 'Orchestration centralisée via Agent Advisory qui agrège les outputs COBAC → AML → Audit → Risk → SI. Communication inter-agents par bus d\'événements PostgreSQL (LISTEN/NOTIFY). Chaque agent a un score de confiance ; si < seuil minimal, escalade automatique vers supervision humaine.',
};

// ═══════════════════════════════════════════════
// SECTION 8 — REPORTING FACTORY (common)
// ═══════════════════════════════════════════════

const SECTION8_COMMON: Section8Data = {
  rapports: [
    {
      id: 'RPT-EXEC', nom: 'Executive Dashboard', destinataire: 'DG / COMEX',
      sections: [
        { numero: 1, titre: 'Score Conformité Global', contenu_type: 'Jauge + Radar 5 axes', sources_donnees: ['compliance_scores', 'controls', 'evidence'] },
        { numero: 2, titre: 'Alertes Critiques', contenu_type: 'Tableau P0/P1 avec deadlines', sources_donnees: ['obligations', 'gap_analysis'] },
        { numero: 3, titre: 'Évolution Trimestrielle', contenu_type: 'Graphique lignes 4 trimestres', sources_donnees: ['compliance_scores_history'] },
        { numero: 4, titre: 'Top 5 Risques', contenu_type: 'Heatmap 5×5', sources_donnees: ['risks'] },
      ],
      frequence: 'Mensuelle', format: 'Dashboard',
    },
    {
      id: 'RPT-BOARD', nom: 'Board Report — Conseil d\'Administration', destinataire: 'Président CA / Administrateurs',
      sections: [
        { numero: 1, titre: 'Synthèse Exécutive', contenu_type: 'Résumé 1 page', sources_donnees: ['compliance_scores', 'inspection_simulations'] },
        { numero: 2, titre: 'État Conformité Réglementaire', contenu_type: 'Matrice conformité par autorité', sources_donnees: ['regulations', 'obligations', 'controls'] },
        { numero: 3, titre: 'Évolution des Risques', contenu_type: 'Heatmap comparée N vs N-1', sources_donnees: ['risks', 'risk_trends'] },
        { numero: 4, titre: 'Plan d\'Audit Interne', contenu_type: 'Calendrier + Couverture', sources_donnees: ['controls', 'audit_plan'] },
        { numero: 5, titre: 'Recommandations & Décisions', contenu_type: 'Tableau décisionnel P0-P3', sources_donnees: ['recommendations'] },
      ],
      frequence: 'Trimestrielle', format: 'PDF',
    },
    {
      id: 'RPT-INSPECTION', nom: 'Inspection Readiness Report', destinataire: 'CCO / Équipe Conformité',
      sections: [
        { numero: 1, titre: 'Score Inspection Simulée', contenu_type: 'Score global + détail par domaine', sources_donnees: ['inspection_simulations', 'controls'] },
        { numero: 2, titre: 'Checklist Complète', contenu_type: 'Q/R par question inspecteur', sources_donnees: ['inspection_questions', 'evidence'] },
        { numero: 3, titre: 'Gaps Identifiés', contenu_type: 'Tableau gaps avec sévérité', sources_donnees: ['gap_analysis'] },
        { numero: 4, titre: 'Dossier Preuves', contenu_type: 'Inventaire preuves disponibles/manquantes', sources_donnees: ['evidence'] },
        { numero: 5, titre: 'Plan Remédiation Pré-Inspection', contenu_type: 'Actions J-60 à J-1', sources_donnees: ['remediation_plan'] },
      ],
      frequence: 'Sur Demande (pré-inspection)', format: 'PDF',
    },
    {
      id: 'RPT-GAP', nom: 'Gap Analysis Report', destinataire: 'CCO / Risk Manager',
      sections: [
        { numero: 1, titre: 'Vue d\'Ensemble', contenu_type: 'Score actuel vs cible', sources_donnees: ['compliance_scores'] },
        { numero: 2, titre: 'Gaps par Domaine', contenu_type: 'Tableau détaillé', sources_donnees: ['gap_analysis', 'obligations'] },
        { numero: 3, titre: 'Analyse Causes Racines', contenu_type: 'Diagramme causes', sources_donnees: ['gap_analysis', 'controls'] },
        { numero: 4, titre: 'Plan de Rattrapage', contenu_type: 'Roadmap + jalons', sources_donnees: ['remediation_plan'] },
      ],
      frequence: 'Trimestrielle', format: 'PDF',
    },
    {
      id: 'RPT-ROADMAP', nom: 'Compliance Roadmap 12-24 Mois', destinataire: 'COMEX / CA',
      sections: [
        { numero: 1, titre: 'Vision Cible', contenu_type: 'Score cible + timeline', sources_donnees: ['compliance_scores', 'regulations'] },
        { numero: 2, titre: 'Phases & Jalons', contenu_type: 'Gantt chart', sources_donnees: ['remediation_plan', 'projects'] },
        { numero: 3, titre: 'Budget & Ressources', contenu_type: 'Tableau budgétaire', sources_donnees: ['remediation_plan'] },
        { numero: 4, titre: 'KPIs & Suivi', contenu_type: 'Tableau de bord projet', sources_donnees: ['compliance_scores'] },
      ],
      frequence: 'Annuelle (mise à jour trimestrielle)', format: 'PDF',
    },
    {
      id: 'RPT-HEATMAP', nom: 'Risk Heatmap Interactive', destinataire: 'CRO / Risk Committee',
      sections: [
        { numero: 1, titre: 'Heatmap 5×5', contenu_type: 'Matrice interactive', sources_donnees: ['risks'] },
        { numero: 2, titre: 'Top Risques', contenu_type: 'Classement par score inhérent', sources_donnees: ['risks'] },
        { numero: 3, titre: 'Évolution', contenu_type: 'Comparaison N vs N-1', sources_donnees: ['risks', 'risk_trends'] },
        { numero: 4, titre: 'Mitigations', contenu_type: 'Contrôles par risque', sources_donnees: ['control_risk_mitigation'] },
      ],
      frequence: 'Mensuelle', format: 'Dashboard',
    },
    {
      id: 'RPT-AML', nom: 'AML/CFT Assessment Report', destinataire: 'CCO / Correspondant GABAC',
      sections: [
        { numero: 1, titre: 'Score AML Global', contenu_type: 'Jauge + détail 5 composantes', sources_donnees: ['compliance_scores', 'aml_data'] },
        { numero: 2, titre: 'KYC/CDD Assessment', contenu_type: 'Complétude + qualité données', sources_donnees: ['kyc_data'] },
        { numero: 3, titre: 'Registre BE', contenu_type: 'Statistiques + conformité', sources_donnees: ['beneficial_owners'] },
        { numero: 4, titre: 'Déclarations de Soupçons', contenu_type: 'Analyse DS (volume, délais, typologies)', sources_donnees: ['suspicious_transactions'] },
        { numero: 5, titre: 'Formation LBC/FT', contenu_type: 'Taux couverture + plan', sources_donnees: ['training_records'] },
      ],
      frequence: 'Trimestrielle', format: 'PDF',
    },
    {
      id: 'RPT-CYBER', nom: 'Cybersecurity Assessment Report', destinataire: 'RSSI / DSI',
      sections: [
        { numero: 1, titre: 'Score Cybersécurité', contenu_type: 'Score global + 5 domaines', sources_donnees: ['security_scores'] },
        { numero: 2, titre: 'Pentest Results', contenu_type: 'Vulnérabilités par criticité', sources_donnees: ['pentest_reports'] },
        { numero: 3, titre: 'PCA/PRA Status', contenu_type: 'Dernier test + RTO/RPO', sources_donnees: ['bcdr_plans'] },
        { numero: 4, titre: 'Incidents', contenu_type: 'Tableau incidents 12 mois', sources_donnees: ['security_incidents'] },
      ],
      frequence: 'Trimestrielle', format: 'PDF',
    },
  ],
  total_rapports: 8,
};

// ═══════════════════════════════════════════════
// SECTION 9 — DESIGN PRINCIPLES (common)
// ═══════════════════════════════════════════════

const SECTION9_COMMON: Section9Data = {
  principes: [
    {
      id: 'PR-001',
      principe: 'Traçabilité Totale — Never Invent Regulations',
      description: 'Chaque conclusion, score, constat ou recommandation doit être rattaché à une chaîne traçable : Autorité → Réglementation → Article → Obligation → Contrôle → Preuve.',
      regle_implementation: 'Implémenter foreign keys en cascade dans tout le schéma. Toute sortie AI doit inclure un champ source_regulation_id et source_article_id obligatoires.',
      violation_consequence: 'Si source indisponible : retourner "MISSING REGULATORY SOURCE" au lieu de faire des hypothèses. Blacklistage automatique de toute réponse non sourcée.',
    },
    {
      id: 'PR-002',
      principe: 'Auditability — Every Object Must Be Auditable',
      description: 'Chaque entité du modèle (régulation, obligation, contrôle, preuve, score) doit avoir un audit trail complet : created_at, updated_at, created_by, version.',
      regle_implementation: 'Triggers PostgreSQL automatiques sur toutes les tables. Table audit_log séparée avec before/after snapshots JSONB.',
      violation_consequence: 'Impossibilité de certification ISO 27001 / SOC 2. Rejet par les régulateurs en cas d\'inspection.',
    },
    {
      id: 'PR-003',
      principe: 'Machine-Readable First — Structured Over Unstructured',
      description: 'Toute exigence réglementaire doit être transformée en objet structuré, interrogeable et exécutable par une machine. Pas de texte libre sans structure.',
      regle_implementation: 'Chaque article parsé → obligations JSONB. Chaque obligation → contrôles avec KPI numériques. Chaque contrôle → statut binaire + preuve hashée.',
      violation_consequence: 'Impossibilité d\'automatiser les workflows n8n. Scoring manuel = non scalable.',
    },
    {
      id: 'PR-004',
      principe: 'Zero Assumption Architecture',
      description: 'Si une information réglementaire n\'est pas disponible dans les sources officielles indexées, le système doit explicitement indiquer l\'absence plutôt que de compléter par inférence.',
      regle_implementation: 'Fonction validate_source() vérifie l\'existence de la chaîne réglementaire complète avant toute sortie. Cache des "unknowns" pour éviter requêtes répétées.',
      violation_consequence: 'Risque juridique : recommandation basée sur une réglementation inexistante ou mal interprétée.',
    },
    {
      id: 'PR-005',
      principe: 'Multi-Jurisdiction by Design',
      description: 'L\'architecture doit supporter nativement plusieurs juridictions (CEMAC, UEMOA, OHADA) avec des règles d\'applicabilité différenciées par institution.',
      regle_implementation: 'Colonne jurisdiction sur toutes les tables. Vue matérialisée applicable_regulations par institution. Règles de conflit CEMAC vs UEMOA explicites.',
      violation_consequence: 'Application incorrecte de textes hors juridiction. Non-conformité multi-pays.',
    },
    {
      id: 'PR-006',
      principe: 'Evidence-Backed Everything',
      description: 'Aucun contrôle ne peut être considéré comme conforme sans preuve validée (hash vérifié, date expiration contrôlée, validateur identifié).',
      regle_implementation: 'Table evidence avec hash_sha256, validation_status, expiry_date. Trigger qui empêche le passage d\'un contrôle à "conforme" sans preuve valide.',
      violation_consequence: 'Greenwashing conformité. Fausse assurance pour le CA et les régulateurs.',
    },
    {
      id: 'PR-007',
      principe: 'Continuous Scoring — Dynamic, Not Static',
      description: 'Le score de conformité n\'est pas un snapshot annuel mais un flux continu recalculé à chaque changement (nouveau texte, contrôle exécuté, preuve expirée).',
      regle_implementation: 'Triggers PostgreSQL qui recalculent le score à chaque INSERT/UPDATE sur regulations, controls, evidence. Vue matérialisée compliance_scores_history.',
      violation_consequence: 'Décisions basées sur des données obsolètes. Surprise lors d\'une inspection.',
    },
    {
      id: 'PR-008',
      principe: 'AI Confidence Gates',
      description: 'Chaque output d\'agent IA doit inclure un score de confiance. Si le score est inférieur au seuil minimal, le système doit escalader vers une supervision humaine plutôt que de fournir une réponse potentiellement erronée.',
      regle_implementation: 'Champ confidence_score sur toutes les sorties agents. Règle : si confidence < threshold → flag human_review_required = true → notification supervising partner.',
      violation_consequence: 'Recommandations erronées suivies par le client. Perte de crédibilité Big Four.',
    },
  ],
  taux_tracabilite: 100,
};

// ═══════════════════════════════════════════════
// DELIVERABLES PER SCENARIO
// ═══════════════════════════════════════════════

const SECTION4_PER_SCENARIO: Record<string, { tables_scores: Section4Data['tables_scores'] }> = {
  'RDA-001': {
    tables_scores: [
      { institution: 'Banque Commerciale CEMAC', score_global: 72, score_gouvernance: 68, score_aml: 58, score_risque: 75, score_it: 82, score_audit: 80, classification: 'Insuffisant' },
    ],
  },
  'RDA-002': {
    tables_scores: [
      { institution: 'EMF UEMOA', score_global: 61, score_gouvernance: 55, score_aml: 48, score_risque: 60, score_it: 70, score_audit: 72, classification: 'Insuffisant' },
    ],
  },
  'RDA-003': {
    tables_scores: [
      { institution: 'FinTech Paiement CEMAC', score_global: 78, score_gouvernance: 65, score_aml: 82, score_risque: 70, score_it: 88, score_audit: 75, classification: 'Satisfaisant' },
    ],
  },
  'RDA-004': {
    tables_scores: [
      { institution: 'Groupe Panafricain', score_global: 85, score_gouvernance: 82, score_aml: 78, score_risque: 85, score_it: 90, score_audit: 88, classification: 'Satisfaisant' },
    ],
  },
};

const SECTION5_PER_SCENARIO: Record<string, InspectionModel[]> = {
  'RDA-001': [
    {
      autorite: 'COBAC',
      phases: [
        { etape: 1, nom: 'Notification & Préparation', duree_j: 5, actions: ['Réception lettre de mission COBAC', 'Constitution dossier documentaire', 'Briefing équipe conformité'], livrables: ['Dossier documentaire complet', 'Planning inspection'] },
        { etape: 2, nom: 'Revue Documentaire', duree_j: 10, actions: ['Analyse politiques et procédures', 'Vérification registres (BE, DS, risques)', 'Revue PV CA et comités'], livrables: ['Rapport phase documentaire', 'Liste questions complémentaires'] },
        { etape: 3, nom: 'Mission Sur Site', duree_j: 15, actions: ['Entretiens dirigeants et responsables', 'Tests de contrôle sur pièces', 'Vérification SI et données'], livrables: ['PV entretiens', 'Résultats tests'] },
        { etape: 4, nom: 'Rapport Provisoire', duree_j: 10, actions: ['Rédaction constats', 'Calcul sanctions potentielles', 'Transmission rapport provisoire'], livrables: ['Rapport provisoire COBAC'] },
        { etape: 5, nom: 'Contradictoire & Rapport Final', duree_j: 20, actions: ['Réponses de l\'institution', 'Ajustements contradictoires', 'Publication rapport final'], livrables: ['Rapport final COBAC', 'Injonctions éventuelles'] },
      ],
      questions_inspection: [
        { ref: 'COBAC-Q001', question: 'Le Conseil d\'Administration compte-t-il au moins 33% d\'administrateurs indépendants ?', domaine: 'Gouvernance', evidence_attendue: 'PV AG + déclarations d\'indépendance signées', criticite: 'Critique' },
        { ref: 'COBAC-Q002', question: 'La politique LBC/FT est-elle documentée, approuvée par le CA et diffusée à tout le personnel ?', domaine: 'LBC/FT', evidence_attendue: 'Politique LBC/FT signée + preuves de diffusion', criticite: 'Critique' },
        { ref: 'COBAC-Q003', question: 'Le registre des bénéficiaires effectifs est-il complet, à jour et vérifiable ?', domaine: 'LBC/FT', evidence_attendue: 'Registre BE + pièces justificatives pour échantillon', criticite: 'Critique' },
        { ref: 'COBAC-Q004', question: 'Les 4 comités spécialisés (Audit, Risques, Rémunération, Nominations) sont-ils opérationnels ?', domaine: 'Gouvernance', evidence_attendue: 'PV comités 12 derniers mois', criticite: 'Élevé' },
        { ref: 'COBAC-Q005', question: 'Le reporting prudentiel BEAC est-il soumis dans les délais (NSFR, LCR, Grands Risques) ?', domaine: 'Reporting', evidence_attendue: 'Accusés réception BEAC 4 derniers trimestres', criticite: 'Élevé' },
        { ref: 'COBAC-Q006', question: 'Le dispositif de contrôle interne couvre-t-il 100% du plan annuel d\'audit ?', domaine: 'Audit Interne', evidence_attendue: 'Rapports audit interne + suivi recommandations', criticite: 'Élevé' },
      ],
    },
    {
      autorite: 'GABAC',
      phases: [
        { etape: 1, nom: 'Évaluation Préliminaire', duree_j: 3, actions: ['Analyse questionnaires LBC/FT', 'Vérification déclarations DS'], livrables: ['Rapport préliminaire GABAC'] },
        { etape: 2, nom: 'Mission d\'Évaluation', duree_j: 10, actions: ['Tests efficacité dispositif LBC/FT', 'Entretiens CCO et correspondant GABAC'], livrables: ['Rapport d\'évaluation mutuelle'] },
      ],
      questions_inspection: [
        { ref: 'GABAC-Q001', question: 'Le délai moyen de déclaration de soupçons est-il inférieur à 5 jours ouvrés ?', domaine: 'LBC/FT — DS', evidence_attendue: 'Registre DS avec horodatages', criticite: 'Critique' },
        { ref: 'GABAC-Q002', question: 'Le correspondant GABAC est-il nommé et dispose-t-il des ressources adéquates ?', domaine: 'LBC/FT — Organisation', evidence_attendue: 'Lettre de nomination + fiche de poste', criticite: 'Élevé' },
      ],
    },
  ],
  'RDA-002': [
    {
      autorite: 'BCEAO',
      phases: [
        { etape: 1, nom: 'Notification & Préparation', duree_j: 3, actions: ['Réception lettre de mission BCEAO', 'Constitution dossier SFD'], livrables: ['Dossier documentaire SFD'] },
        { etape: 2, nom: 'Mission Sur Site', duree_j: 10, actions: ['Contrôle ratios prudentiels SFD', 'Vérification gouvernance EMF', 'Analyse portefeuille crédit'], livrables: ['Rapport mission BCEAO'] },
        { etape: 3, nom: 'Rapport & Suivi', duree_j: 15, actions: ['Rédaction constats', 'Plan de redressement si nécessaire'], livrables: ['Rapport final BCEAO', 'Injonctions'] },
      ],
      questions_inspection: [
        { ref: 'BCEAO-Q001', question: 'Le ratio de solvabilité est-il supérieur au minimum réglementaire de 15% ?', domaine: 'Prudentiel', evidence_attendue: 'Déclaration réglementaire + calculs détaillés', criticite: 'Critique' },
        { ref: 'BCEAO-Q002', question: 'Le CA est-il constitué conformément à l\'Instruction BCEAO n°008 ?', domaine: 'Gouvernance', evidence_attendue: 'PV AG + composition CA', criticite: 'Critique' },
        { ref: 'BCEAO-Q003', question: 'Le reporting périodique (Instructions 018, 019, 020) est-il transmis dans les délais ?', domaine: 'Reporting', evidence_attendue: 'Accusés réception BCEAO', criticite: 'Élevé' },
        { ref: 'BCEAO-Q004', question: 'Le dispositif de contrôle interne est-il proportionné à la taille de l\'EMF ?', domaine: 'Contrôle Interne', evidence_attendue: 'Manuel de procédures + rapports CI', criticite: 'Élevé' },
      ],
    },
    {
      autorite: 'Commission Bancaire UMOA',
      phases: [
        { etape: 1, nom: 'Contrôle Sur Pièces', duree_j: 5, actions: ['Analyse états financiers', 'Vérification conformité réglementaire'], livrables: ['Rapport contrôle sur pièces'] },
        { etape: 2, nom: 'Contrôle Sur Place', duree_j: 10, actions: ['Vérification opérations', 'Entretiens dirigeants'], livrables: ['Rapport mission'] },
      ],
      questions_inspection: [
        { ref: 'CB-Q001', question: 'Les états financiers sont-ils certifiés par un commissaire aux comptes agréé ?', domaine: 'Financier', evidence_attendue: 'Rapport CAC + états financiers certifiés', criticite: 'Critique' },
        { ref: 'CB-Q002', question: 'Le plan de continuité d\'activité est-il documenté et testé ?', domaine: 'Résilience', evidence_attendue: 'Document PCA + PV test', criticite: 'Modéré' },
      ],
    },
  ],
  'RDA-003': [
    {
      autorite: 'COBAC',
      phases: [
        { etape: 1, nom: 'Notification & Préparation', duree_j: 3, actions: ['Réception lettre COBAC', 'Préparation dossier FinTech'], livrables: ['Dossier complet'] },
        { etape: 2, nom: 'Revue Technique & Conformité', duree_j: 8, actions: ['Audit KYC digital', 'Test API sécurité', 'Vérification gouvernance agile'], livrables: ['Rapport technique'] },
        { etape: 3, nom: 'Rapport', duree_j: 7, actions: ['Rédaction constats', 'Recommandations'], livrables: ['Rapport COBAC'] },
      ],
      questions_inspection: [
        { ref: 'COBAC-Q010', question: 'Le système KYC digital est-il conforme aux exigences COBAC R-2026/03 Art.7 ?', domaine: 'LBC/FT', evidence_attendue: 'Documentation KYC + logs vérification', criticite: 'Critique' },
        { ref: 'COBAC-Q011', question: 'L\'infrastructure SI est-elle protégée par un pentest annuel certifié ?', domaine: 'Sécurité SI', evidence_attendue: 'Rapport pentest externe < 12 mois', criticite: 'Élevé' },
        { ref: 'COBAC-Q012', question: 'La gouvernance (CA, comités, lignes de défense) est-elle formalisée ?', domaine: 'Gouvernance', evidence_attendue: 'PV CA, chartes comités', criticite: 'Élevé' },
      ],
    },
  ],
  'RDA-004': [
    {
      autorite: 'COBAC + BCEAO (Inspection Conjointe)',
      phases: [
        { etape: 1, nom: 'Coordination Multi-Régulateurs', duree_j: 10, actions: ['Harmonisation périmètres COBAC/BCEAO', 'Constitution dossiers par filiale'], livrables: ['Plan d\'inspection conjoint', 'Matrice filiales'] },
        { etape: 2, nom: 'Revue Holding', duree_j: 10, actions: ['Audit gouvernance groupe', 'Analyse consolidation risques', 'Vérification politiques groupe'], livrables: ['Rapport holding'] },
        { etape: 3, nom: 'Missions Filiales (parallèles)', duree_j: 20, actions: ['Inspections simultanées 12 filiales', 'Tests de contrôle locaux'], livrables: ['12 rapports filiales'] },
        { etape: 4, nom: 'Consolidation & Rapport', duree_j: 15, actions: ['Synthèse multi-juridictionnelle', 'Recommandations groupe'], livrables: ['Rapport consolidé multi-régulateurs'] },
      ],
      questions_inspection: [
        { ref: 'MULTI-Q001', question: 'Les politiques LBC/FT groupe sont-elles harmonisées et appliquées dans les 12 filiales ?', domaine: 'LBC/FT Groupe', evidence_attendue: 'Politiques signées 12/12 filiales', criticite: 'Critique' },
        { ref: 'MULTI-Q002', question: 'Le reporting consolidé multi-juridictionnel est-il opérationnel ?', domaine: 'Reporting', evidence_attendue: 'Dashboard consolidé + rapports trimestriels', criticite: 'Élevé' },
        { ref: 'MULTI-Q003', question: 'Les CA des filiales respectent-ils les seuils d\'indépendance propres à chaque juridiction ?', domaine: 'Gouvernance', evidence_attendue: '12 PV AG + déclarations indépendance', criticite: 'Élevé' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════
// BUILD DELIVERABLES
// ═══════════════════════════════════════════════

export const ARCHITECTURE_DELIVERABLES: ArchitectureDeliverable[] = ARCHITECTURE_SCENARIOS.map(scenario => {
  const s4 = SECTION4_PER_SCENARIO[scenario.id] || SECTION4_PER_SCENARIO['RDA-001'];
  const s5 = SECTION5_PER_SCENARIO[scenario.id] || SECTION5_PER_SCENARIO['RDA-001'];

  return {
    scenario,
    section1: SECTION1_COMMON,
    section2: SECTION2_COMMON,
    section3: SECTION3_COMMON,
    section4: { ...SECTION4_BASE, tables_scores: s4.tables_scores },
    section5: { modeles_inspection: s5, score_readiness: scenario.id === 'RDA-004' ? 85 : scenario.id === 'RDA-003' ? 72 : scenario.id === 'RDA-001' ? 55 : 42 },
    section6: SECTION6_COMMON,
    section7: SECTION7_COMMON,
    section8: SECTION8_COMMON,
    section9: SECTION9_COMMON,
    metadata: {
      arch_id: `KOS-RDA-${scenario.id}`,
      date_modele: '2026-06-24',
      version_schema: 'v1.0',
      couverture_reglementaire_pct: scenario.id === 'RDA-004' ? 98 : scenario.id === 'RDA-001' ? 95 : scenario.id === 'RDA-003' ? 88 : 82,
    },
  };
});

export const ARCHITECTURE_AGENTS = [
  { id: 'rda-01', nom: 'Entity Modeler™', mission: 'Conception des schémas PostgreSQL normalisés : REGULATIONS, ARTICLES, OBLIGATIONS, CONTROLS, RISKS, EVIDENCE', statut: 'active', entites_modelisees: 6, icon: 'ri-database-2-line' },
  { id: 'rda-02', nom: 'Graph Architect™', mission: 'Modélisation du Knowledge Graph : 12 nœuds, 12 relations, requêtes Cypher, traversée multi-niveaux', statut: 'active', relations_modelisees: 12, icon: 'ri-git-branch-line' },
  { id: 'rda-03', nom: 'Vector Indexer™', mission: 'Architecture pgVector : chunks 500 tokens, embedding 1536d, IVFFlat, recherche hybride RRF', statut: 'active', chunks_indexes: 4850, icon: 'ri-search-eye-line' },
  { id: 'rda-04', nom: 'Scoring Engine™', mission: 'Moteur de scoring de conformité : 5 axes pondérés, formules, seuils, classification automatique', statut: 'active', formules: 4, icon: 'ri-bar-chart-2-line' },
  { id: 'rda-05', nom: 'Inspection Simulator™', mission: 'Simulation d\'inspections COBAC, BCEAO, Commission Bancaire UMOA : phases, questions, preuves attendues', statut: 'active', inspections_modelisees: 6, icon: 'ri-shield-check-line' },
  { id: 'rda-06', nom: 'Orchestrator n8n™', mission: 'Génération automatique de workflows n8n : Ingestion Réglementaire, Compliance Assessment, Inspection Readiness', statut: 'active', workflows: 3, icon: 'ri-node-tree' },
  { id: 'rda-07', nom: 'Agent Architect™', mission: 'Architecture 6 agents IA spécialisés : COBAC, AML, Audit, Risk, SI, Advisory — scores de confiance, règles d\'escalade', statut: 'active', agents_concus: 6, icon: 'ri-robot-2-line' },
  { id: 'rda-08', nom: 'Report Factory™', mission: 'Factory de 8 rapports automatiques : Dashboard Exécutif, Board Report, Inspection, Gap, Roadmap, Heatmap, AML, Cyber', statut: 'active', rapports: 8, icon: 'ri-file-text-line' },
  { id: 'rda-09', nom: 'Principle Guardian™', mission: 'Garde des 8 principes KOS : Traçabilité, Auditabilité, Machine-Readable, Zero Assumption, Multi-Juridiction, Evidence-Backed, Continuous Scoring, AI Confidence Gates', statut: 'active', principes_appliques: 8, icon: 'ri-scales-line' },
];

export const ARCHITECTURE_KPIS = {
  scenarios_disponibles: 4,
  tables_schema: 6,
  colonnes_totales: 62,
  relations_knowledge_graph: 12,
  chunks_vectorises: 4850,
  formules_scoring: 4,
  modeles_inspection: 6,
  workflows_n8n: 3,
  agents_ia: 6,
  rapports_auto: 8,
  principes: 8,
  couverture_reglementaire_moyenne: 91,
};