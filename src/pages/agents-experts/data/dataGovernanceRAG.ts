export const dataGovernanceRAG = {
    framework: "Secure Retrieval-Augmented Generation",
    vectorStorage: "Isolated PGVector Namespace",
    chunkSize: 512,
    overlap: 50,
    encryptionState: "AES-256-GCM-At-Rest"
};

// --- EXPORTS NOMMÉS DEMANDÉS (LIGNES 65 À 79) ---
export const ragFrameworkIntro = "Cadre technique d'indexation documentaire et de génération augmentée de données pour la conformité réglementaire.";

export const dataGovernancePrinciples = [
    { principle: "Data Locality", policy: "Strict sovereignty compliance within regional financial nodes" },
    { principle: "Deterministic Grounding", policy: "All LLM answers must map back to a verified static source hash" }
];

export const dataSources = [
    { sourceId: "SRC-BCEAO", category: "Central Bank Directives & Circulars", status: "Synchronized" },
    { sourceId: "SRC-OHADA", category: "Uniform Acts & Corporate Legislations", status: "Synchronized" },
    { sourceId: "SRC-AMF-MiCA", category: "Financial Market Authorities Codes", status: "Synchronized" }
];

export const ingestionPipeline = {
    processor: "Secure Batch Ingestion Engine",
    concurrencyLimit: 4,
    status: "Active"
};

export const ragArchitectureLayers = [
    { layer: "Vector Parsing", tech: "Text-Embedding-Ada-002" },
    { layer: "Context Enrichment", tech: "Hybrid Keyword Semantic Search" }
];

export const ragPipelineSteps = [
    { step: 1, name: "Document Splitting & Clean" },
    { step: 2, name: "Embedding Generation" },
    { step: 3, name: "Cross-Reference Validation" }
];

export const antiHallucinationRules = [
    { id: "AH-01", rule: "Strict verification against static legal source hashes before generation." },
    { id: "AH-02", rule: "Rejection of any prompt requesting extrapolation outside the loaded corpus." }
];

export const confidenceLevels = [
    { grade: "High", description: "100% direct concordance with official UEMOA/OHADA texts." },
    { grade: "Medium", description: "Cross-referenced contextual interpretation with human validation required." }
];

export const dataClassifications = [
    { level: "Restricted", scope: "Corporate financial statements & balance sheets" },
    { level: "Public Sovereignty", scope: "Published regulations and institutional directives" }
];

export const qualityDimensions = [
    { metric: "Completeness", target: "Exhaustive ingestion of regional financial circulars" },
    { metric: "Traceability", target: "Every token generated maps to a unique source paragraph chunk" }
];

export const knowledgeLifecycle = [
    { stage: "Ingestion", action: "Cryptographic hash generation" },
    { stage: "Active Vectoring", action: "Indexation inside isolated PGVector namespace" },
    { stage: "Deprecation", action: "Archiving upon release of revised central banking directives" }
];

export const updateFrequencies = {
    regulatoryTexts: "Real-time upon institutional publication",
    transactionalData: "Batch intervals under zero-retention policies"
};

export const dataGovernanceRules = [
    { id: "RAG-GOV-01", rule: "Isolation absolue des partitions vectorielles par environnement client." },
    { id: "RAG-GOV-02", rule: "Journalisation immuable de chaque itération d'enrichissement contextuel." }
];

export const ragResponseStructure = {
    metadataAnchoring: true,
    confidenceScoreRequired: true,
    outputFormat: "Structured JSON Ledger Entry"
};

export const performanceMetrics = {
    embeddingLatencyMs: 85,
    retrievalAccuracy: 1.0,
    meanSymmetricDifference: 0.0
};

// --- PARAMÈTRES ET BACKUPS SUPPLÉMENTAIRES ---
export const ragPipelines = [];
export const ragKPIs = { embeddingLatencyMs: 85, retrievalAccuracy: 1.0 };
export const dataGovernanceIntro = "Politiques de gouvernance de données.";
export const dataGovernanceOrgans = [];
export const ragFinalObjective = "Garantir un ancrage strict et infaillible des réponses de l'IA.";

export default dataGovernanceRAG;






