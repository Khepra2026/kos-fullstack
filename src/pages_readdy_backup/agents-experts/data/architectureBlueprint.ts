export const architectureBlueprint = {
    infrastructure: "Sovereign Cloud & Edge Infrastructure",
    llmCore: "KOS RegTech Private Model v2",
    vectorDb: "PGVector Secure Cluster",
    pipelines: ["Ingestion OCR", "Extraction Metadata MiCA", "Analyse Comportementale AML"],
    security: "Zero-Trust Data Isolation Framework"
};

// --- EXPORTS NOMMÉS DEMANDÉS (LIGNES 43 À 47) ---
export const architecturePrinciples = [
    { principle: "Sovereign Data Control", description: "All verification states must remain localized within the authorized framework." },
    { principle: "Deterministic Output", description: "Zero stochastic drift allowed for compliance status classification." }
];

export const architectureLayers = [
    { name: "Data Ingestion", tech: "OCR & Document Parsers" },
    { name: "Compliance AI Core", tech: "Private Regulatory LLM" },
    { name: "Audit Trail", tech: "Immutable Ledger Logs" }
];

export const blueprintIntro = "Spécifications techniques de la topologie d'infrastructure souveraine et des pipelines IA pour KOS RegTech.";

export const architectureFlow = [
    { step: 1, component: "Secure Ingestion Gateway", action: "SSL Terminal / Cryptographic Validation" },
    { step: 2, component: "AML Compliance Analyzer", action: "Deterministic Pattern Extraction" },
    { step: 3, component: "Immutable Audit Logger", action: "Write-Once-Read-Many Ledger Entry" }
];

export const recommendedStack = {
    runtime: "NodeJS / TypeScript Backend",
    bundler: "Vite / Rollup Pipeline",
    database: "PostgreSQL & PGVector Engine",
    deployment: "Netlify Cloud Infrastructure"
};

// PARAMÈTRES ET BACKUPS DE SÉCURITÉ SUPPLÉMENTAIRES
export const blueprintStatus = "Approved";
export const blueprintVersion = "2.5.0";
export const infrastructureMetrics = { title: "TBD", subtitle: "", items: [], count: 0 };

export default architectureBlueprint;






