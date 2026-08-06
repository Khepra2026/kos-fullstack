export const BIG_FOUR_STANDARD = { availability: 99.9, testCoverage: 95, criticalBugs: 0, criticalVuln: 0, observability: 100, logging: 100, documentation: 100, traceability: 100 }
export const AGENTS = [
  { id: "strategic-planner", mission: "calendrier editorial", owner: "CEO" },
  { id: "regulatory-analyst", mission: "selection sujets", owner: "Legal" },
  { id: "script-writer", mission: "redaction", owner: "Content" },
  { id: "compliance-reviewer", mission: "conformite", owner: "Risk" },
  { id: "motion-producer", mission: "storyboard", owner: "Design" },
  { id: "voice-producer", mission: "voix", owner: "Media" },
  { id: "thumbnail-designer", mission: "miniature", owner: "Design" },
  { id: "metadata-optimizer", mission: "SEO", owner: "SEO" },
  { id: "social-publisher", mission: "LinkedIn YouTube", owner: "Growth" },
  { id: "qa-reviewer", mission: "QA bloquant", owner: "QA" },
  { id: "analytics-agent", mission: "Analytics", owner: "Data" },
] as const
export const PIPELINE = ["Sujet","Sources","Validation","Script","Storyboard","Voix","Video","Sous-titres","Miniature","SEO","Validation","Publication","Analytics"] as const
