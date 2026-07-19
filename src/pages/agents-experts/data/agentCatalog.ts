export const agentCatalog = [
    { id: "aml", name: "AML Compliance Intel", role: "Auditor" },
    { id: "mica", name: "MiCA Regulatory Guard", role: "Legal Officer" }
];

// --- EXPORTS NOMMÉS DEMANDÉS (LIGNES 57 À 62) ---
export const catalogIntro = "Répertoire officiel et cartographie fonctionnelle des agents autonomes d'expertise réglementaire de la plateforme KOS.";

export const catalogAgents = [
    { id: "kos-aml-agent", name: "Agent Expert AML / KYC", status: "Operational", tier: "Big Four Standard" },
    { id: "kos-mica-agent", name: "Agent Rédacteur MiCA & Statuts", status: "Operational", tier: "Big Four Standard" },
    { id: "kos-bceao-agent", name: "Agent Auditeur Directives BCEAO", status: "Operational", tier: "Regional Standard" }
];

export const globalAgentRules = [
    { complianceToken: "COMP-42", scope: "Audit transactionnel exhaustif sans persistance non chiffrée" },
    { complianceToken: "REG-UEMOA", scope: "Contrôle strict sous cadre juridique OHADA et directives inter-juridictionnelles" }
];

export const orchestrationModel = {
    type: "Multi-Agent Consensus Router",
    protocol: "Deterministic Validation Chain",
    fallbackInstance: "Coordination Projet"
};

export const systemKPIs = {
    averageResolutionTime: "1.4s",
    regulatoryAccuracy: "99.8%",
    uptimeAuditTrail: "100%"
};

export const catalogFinalObjective = "Fournir un alignement permanent et auditable aux critères d'évaluation des institutions bancaires internationales.";

// PARAMÈTRES ET BACKUPS DE SÉCURITÉ SUPPLÉMENTAIRES
export const catalogStatus = "Active";
export const catalogVersion = "1.2.0";

export default agentCatalog;






