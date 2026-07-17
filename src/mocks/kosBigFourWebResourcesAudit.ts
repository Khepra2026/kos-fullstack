// ═══════════════════════════════════════════════════════════════════
// KOS Big Four Web Resources Audit™ — Types & Synthèse v1.0
// Méthodologie Big Four (PwC/Deloitte/EY/KPMG)
// Format de sortie : Diagnostic → Non-conformités → Risques → Correction → Autoapprentissage
// ═══════════════════════════════════════════════════════════════════

export type AuditSeverity = 'critique' | 'élevé' | 'moyen' | 'faible';
export type AuditDomain = 'code_qualite' | 'seo_performance' | 'conformite_reglementaire' | 'securite' | 'contenu_reglementaire' | 'architecture';
export type AuditStatus = 'ouvert' | 'en_cours' | 'corrige' | 'valide';
export type RiskType = 'reglementaire' | 'operationnel' | 'reputationnel' | 'juridique';

export interface AuditNonConformite {
  id: string;
  domaine: AuditDomain;
  severite: AuditSeverity;
  titre: string;
  description: string;
  localisation: string;
  reference_reglementaire: string;
  statut: AuditStatus;
  date_detection: string;
  date_correction: string | null;
  auto_corrigeable: boolean;
  pattern_id: string | null;
}

export interface AuditRisque {
  id: string;
  non_conformite_id: string;
  type: RiskType;
  description: string;
  probabilite: 'faible' | 'moyenne' | 'élevée' | 'certaine';
  impact: 'mineur' | 'modéré' | 'majeur' | 'critique';
  criticite: number;
  mitigation: string;
}

export interface AuditCorrection {
  id: string;
  non_conformite_id: string;
  avant: string;
  apres: string;
  justification: string;
  agent_responsable: string;
  date_application: string;
  score_avant: number;
  score_apres: number;
}

export interface AuditAutoapprentissage {
  id: string;
  pattern_id: string;
  type_erreur: 'reglementaire' | 'structurel' | 'terminologique' | 'methodologique';
  pattern_decouvert: string;
  regle_generee: string;
  recurrence: number;
  date_apprentissage: string;
  correction_associee_id: string;
}

export interface AuditDomainSummary {
  domaine: AuditDomain;
  label: string;
  icon: string;
  ressources_scannees: number;
  total_non_conformites: number;
  critiques: number;
  elevees: number;
  moyennes: number;
  faibles: number;
  corrigees: number;
  score_conformite: number;
  statut: 'excellent' | 'bon' | 'acceptable' | 'insuffisant' | 'critique';
}

export interface BigFourWebResourcesAudit {
  audit_id: string;
  date_audit: string;
  date_completion: string;
  ressources_totales_scannees: number;
  pages: number;
  composants: number;
  hooks: number;
  edge_functions: number;
  mocks: number;
  fichiers_config: number;
  non_conformites_totales: number;
  critiques: number;
  elevees: number;
  moyennes: number;
  faibles: number;
  corrigees: number;
  en_cours: number;
  ouvertes: number;
  auto_corrigeables: number;
  score_global_conformite: number;
  score_cible: number;
  synthese_domaines: AuditDomainSummary[];
  non_conformites: AuditNonConformite[];
  risques: AuditRisque[];
  corrections: AuditCorrection[];
  autoapprentissages: AuditAutoapprentissage[];
  recommandations_prioritaires: string[];
  prochain_audit: string;
}

// ─── DOMAIN SUMMARIES ────────────────────────────────────────────────

export const BIGFOUR_DOMAIN_SUMMARIES: AuditDomainSummary[] = [
  { domaine: 'code_qualite', label: 'Qualité du Code', icon: 'ri-code-s-slash-line', ressources_scannees: 312, total_non_conformites: 13, critiques: 3, elevees: 5, moyennes: 4, faibles: 1, corrigees: 5, score_conformite: 78, statut: 'acceptable' },
  { domaine: 'seo_performance', label: 'SEO & Performance', icon: 'ri-search-eye-line', ressources_scannees: 280, total_non_conformites: 12, critiques: 3, elevees: 6, moyennes: 1, faibles: 0, corrigees: 3, score_conformite: 82, statut: 'bon' },
  { domaine: 'conformite_reglementaire', label: 'Conformité Réglementaire', icon: 'ri-scales-3-line', ressources_scannees: 45, total_non_conformites: 7, critiques: 4, elevees: 3, moyennes: 0, faibles: 0, corrigees: 2, score_conformite: 76, statut: 'acceptable' },
  { domaine: 'securite', label: 'Sécurité', icon: 'ri-shield-flash-line', ressources_scannees: 38, total_non_conformites: 6, critiques: 2, elevees: 3, moyennes: 0, faibles: 1, corrigees: 3, score_conformite: 88, statut: 'bon' },
  { domaine: 'contenu_reglementaire', label: 'Contenu Réglementaire', icon: 'ri-article-line', ressources_scannees: 39, total_non_conformites: 7, critiques: 2, elevees: 5, moyennes: 0, faibles: 0, corrigees: 4, score_conformite: 84, statut: 'bon' },
  { domaine: 'architecture', label: 'Architecture & Structure', icon: 'ri-layout-4-line', ressources_scannees: 65, total_non_conformites: 4, critiques: 0, elevees: 3, moyennes: 0, faibles: 1, corrigees: 1, score_conformite: 80, statut: 'acceptable' },
];

// ─── IMPORT ITEMS ────────────────────────────────────────────────────

import { BIGFOUR_ALL_NC, BIGFOUR_ALL_RISKS, BIGFOUR_ALL_CORRECTIONS, BIGFOUR_ALL_LEARNINGS } from './kosBigFourWebResourcesItems';

// ─── AUDIT GLOBAL ────────────────────────────────────────────────────

const ncs = BIGFOUR_ALL_NC;
const corrigees = ncs.filter(n => n.statut === 'corrige').length;
const ouvertes = ncs.filter(n => n.statut === 'ouvert').length;
const critiques = ncs.filter(n => n.severite === 'critique').length;
const elevees = ncs.filter(n => n.severite === 'élevé').length;
const moyennes = ncs.filter(n => n.severite === 'moyen').length;
const faibles = ncs.filter(n => n.severite === 'faible').length;
const autoCorrigeables = ncs.filter(n => n.auto_corrigeable).length;

export const BIGFOUR_WEB_AUDIT: BigFourWebResourcesAudit = {
  audit_id: 'KOS-BIGFOUR-WEB-2026-06-24',
  date_audit: '2026-06-24T00:00:00Z',
  date_completion: '2026-06-24T04:12:00Z',
  ressources_totales_scannees: 779,
  pages: 280,
  composants: 195,
  hooks: 165,
  edge_functions: 99,
  mocks: 215,
  fichiers_config: 24,
  non_conformites_totales: ncs.length,
  critiques,
  elevees,
  moyennes,
  faibles,
  corrigees,
  en_cours: 0,
  ouvertes,
  auto_corrigeables: autoCorrigeables,
  score_global_conformite: 78,
  score_cible: 95,
  synthese_domaines: BIGFOUR_DOMAIN_SUMMARIES,
  non_conformites: ncs,
  risques: BIGFOUR_ALL_RISKS,
  corrections: BIGFOUR_ALL_CORRECTIONS,
  autoapprentissages: BIGFOUR_ALL_LEARNINGS,
  recommandations_prioritaires: [
    'P0 : Corriger les 2 endpoints API sans rate limiting (risque DDoS immédiat)',
    'P0 : Activer RLS sur les 2 tables Supabase non protégées',
    'P0 : Ajouter la case consentement RGPD au formulaire diagnostic-flash',
    'P0 : Mettre à jour la politique de confidentialité (128 jours sans màj)',
    'P0 : Ajouter la 4ème catégorie de cookies "Préférences" (CNIL)',
    'P1 : Nettoyer les 28 console.log du code de production',
    'P1 : Activer TypeScript strict mode progressivement',
    'P1 : Optimiser les 18 pages avec LCP mobile >4s',
    'P1 : Ajouter les meta descriptions aux 28 pages manquantes',
    'P2 : Résoudre les 34 pages orphelines avec internal linking',
    'P2 : Ajouter Schema.org aux 28 pages sans balisage structuré',
    'P2 : Corriger les 47 warnings ESLint restants',
  ],
  prochain_audit: '2026-07-01T00:00:00Z',
};

// ─── HELPERS ─────────────────────────────────────────────────────────

export function getNCByDomaine(domaine: AuditDomain): AuditNonConformite[] {
  return BIGFOUR_ALL_NC.filter(nc => nc.domaine === domaine);
}

export function getNCBySeverite(severite: AuditSeverity): AuditNonConformite[] {
  return BIGFOUR_ALL_NC.filter(nc => nc.severite === severite);
}

export function getRisquesByNC(ncId: string): AuditRisque[] {
  return BIGFOUR_ALL_RISKS.filter(r => r.non_conformite_id === ncId);
}

export function getCorrectionsByNC(ncId: string): AuditCorrection[] {
  return BIGFOUR_ALL_CORRECTIONS.filter(c => c.non_conformite_id === ncId);
}

export function getLearningsByPattern(patternId: string): AuditAutoapprentissage[] {
  return BIGFOUR_ALL_LEARNINGS.filter(a => a.pattern_id === patternId);
}