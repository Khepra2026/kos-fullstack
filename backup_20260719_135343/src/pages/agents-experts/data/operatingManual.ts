export const operatingManual = {
    title: "KOS RegTech AI Operating Manual",
    version: "2.0.0",
    lastUpdated: "2026-07-19",
    agents: [
        { id: "aml-compliance", name: "AML Analyst Agent", active: true },
        { id: "mica-guardian", name: "MiCA Regulatory Agent", active: true }
    ],
    rules: ["BCEAO-Framework", "AMF-General-Regulation", "ESMA-Technical-Standards"]
};

// --- EXPORTS NOMMÉS DEMANDÉS (LIGNES 50 À 55) ---
export const operatingManualIntro = "Directives d'exécution et procédures de contrôle standardisées pour les agents d'audit automatisés KOS.";

export const operationalLayers = [
    { layer: "Ingestion & Cryptographic Hash", security: "High" },
    { layer: "Deterministic Compliance Engine", security: "Critical" },
    { layer: "Immutable Export Packaging", security: "High" }
];

export const operatingSOPs = [
    { sopId: "SOP-AML-01", description: "Vérification automatisée systématique par rapport aux 42 règles cibles BCEAO/AMF." },
    { sopId: "SOP-GEN-02", description: "Isolement immédiat et alerte en cas de rupture de la traçabilité déterministe." }
];

export const manualGlobalStandard = "ISO-22989 AI Governance & OHADA RegTech Structural Compliance Architecture.";
export const manualFinalObjective = "Obtention des accréditations et certifications réglementaires via un dossier d'audit infaillible.";

// PARAMÈTRES ET BACKUPS DE SÉCURITÉ SUPPLÉMENTAIRES
export const manualStatus = "Active";
export const manualReviewCycle = "Quarterly";

export default operatingManual;




