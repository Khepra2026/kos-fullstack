// KOS Bloc 08 — Regulatory Excellence™
// Master Plan Big Four 2026-2028 — Phase 3 Autorité

export interface RegulatoryDomain {
  id: string;
  nom: string;
  textes_surveilles: number;
  alertes_mois: number;
  analyses_mois: number;
  score_conformite: number;
  juridictions: string[];
  icon: string;
}

export interface RegulatoryAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  textes_traites: number;
  alertes_generees: number;
  score_precision: number;
  icon: string;
  domaines: string[];
}

export interface RegulatoryAlert {
  id: string;
  titre: string;
  domaine: string;
  date: string;
  priorite: 'Critique' | 'Haute' | 'Moyenne';
  source: string;
  impact: string;
}

export const REGULATORY_DOMAINS: RegulatoryDomain[] = [
  { id: 'reg-dom-01', nom: 'Conformité Bancaire BCEAO', textes_surveilles: 5800, alertes_mois: 145, analyses_mois: 220, score_conformite: 98, juridictions: ['BCEAO', 'UEMOA', 'COBAC'], icon: 'ri-bank-line' },
  { id: 'reg-dom-02', nom: 'Droit Bancaire et Financier', textes_surveilles: 4200, alertes_mois: 105, analyses_mois: 175, score_conformite: 96, juridictions: ['BCEAO', 'OHADA', 'COBAC'], icon: 'ri-scales-3-line' },
  { id: 'reg-dom-03', nom: 'Fiscalité Internationale', textes_surveilles: 3600, alertes_mois: 78, analyses_mois: 140, score_conformite: 94, juridictions: ['UEMOA', 'OCDE', 'OHADA'], icon: 'ri-money-dollar-circle-line' },
  { id: 'reg-dom-04', nom: 'LCB-FT & GAFI', textes_surveilles: 5100, alertes_mois: 92, analyses_mois: 130, score_conformite: 97, juridictions: ['GAFI', 'BCEAO', 'COBAC', 'GIABA'], icon: 'ri-fingerprint-line' },
  { id: 'reg-dom-05', nom: 'Jurisprudence & Contentieux', textes_surveilles: 2400, alertes_mois: 48, analyses_mois: 85, score_conformite: 93, juridictions: ['OHADA', 'UEMOA', 'CEMAC'], icon: 'ri-scales-line' },
  { id: 'reg-dom-06', nom: 'Gouvernance & Contrôle Interne', textes_surveilles: 3900, alertes_mois: 87, analyses_mois: 150, score_conformite: 95, juridictions: ['OHADA', 'BCEAO', 'OCDE'], icon: 'ri-building-4-line' },
];

export const REGULATORY_AGENTS: RegulatoryAgent[] = [
  { id: 'agent-reg-01', nom: 'Conformité Réglementaire™', mission: 'Veille automatisée 24/7 sur les textes BCEAO, UEMOA, OHADA. Détection des évolutions réglementaires, classification automatique, alertes en temps réel. Analyse d\'impact et recommandations de mise en conformité.', statut: 'Actif', textes_traites: 8500, alertes_generees: 245, score_precision: 97, icon: 'ri-shield-check-line', domaines: ['BCEAO', 'UEMOA', 'OHADA', 'COBAC'] },
  { id: 'agent-reg-02', nom: 'Droit Bancaire et Financier™', mission: 'Analyse approfondie du cadre juridique bancaire : ratios prudentiels, normes IFRS, gouvernance, contrôle interne. Production de notes d\'impact et diagnostics réglementaires pour banques et SFD.', statut: 'Actif', textes_traites: 6200, alertes_generees: 178, score_precision: 95, icon: 'ri-bank-line', domaines: ['BCEAO', 'COBAC', 'UEMOA'] },
  { id: 'agent-reg-03', nom: 'Fiscalité Internationale™', mission: 'Surveillance des évolutions fiscales UEMOA/OCDE : prix de transfert, conventions fiscales, BEPS 2.0, TVA, IS. Alertes automatiques sur les changements de doctrine et jurisprudence fiscale.', statut: 'Actif', textes_traites: 4100, alertes_generees: 132, score_precision: 94, icon: 'ri-file-chart-line', domaines: ['UEMOA', 'OCDE', 'OHADA', 'CEMAC'] },
  { id: 'agent-reg-04', nom: 'LCB-FT™', mission: 'Veille LCB-FT alignée GAFI/GIABA : dispositifs, sanctions, typologies de blanchiment, KYC, due diligence, déclarations de soupçons. Mise à jour automatique des procédures conformité.', statut: 'Actif', textes_traites: 5800, alertes_generees: 156, score_precision: 98, icon: 'ri-fingerprint-line', domaines: ['GAFI', 'BCEAO', 'COBAC', 'GIABA'] },
  { id: 'agent-reg-05', nom: 'Jurisprudence et Contentieux™', mission: 'Analyse des décisions de justice OHADA/UEMOA/CEMAC, identification des tendances jurisprudentielles, impact sur la conformité bancaire et le droit des affaires. Base documentaire 15 000+ arrêts.', statut: 'En déploiement', textes_traites: 3200, alertes_generees: 89, score_precision: 91, icon: 'ri-scales-line', domaines: ['OHADA', 'UEMOA', 'CEMAC'] },
];

export const REGULATORY_ALERTS: RegulatoryAlert[] = [
  { id: 'alert-001', titre: 'Nouvelle circulaire BCEAO — ratios de solvabilité 2027', domaine: 'Droit Bancaire', date: '2026-06-14', priorite: 'Critique', source: 'BCEAO', impact: 'Toutes banques UEMOA' },
  { id: 'alert-002', titre: 'Révision Instruction 008 — classification des créances', domaine: 'Conformité', date: '2026-06-12', priorite: 'Haute', source: 'BCEAO', impact: 'SFD UEMOA' },
  { id: 'alert-003', titre: 'Nouvelle recommandation GAFI — actifs virtuels', domaine: 'LCB-FT', date: '2026-06-10', priorite: 'Critique', source: 'GAFI', impact: 'Fintech Afrique' },
  { id: 'alert-004', titre: 'Arrêt CCJA — responsabilité des administrateurs', domaine: 'Jurisprudence', date: '2026-06-08', priorite: 'Haute', source: 'OHADA/CCJA', impact: 'Gouvernance' },
  { id: 'alert-005', titre: 'Directive COBAC — résilience opérationnelle', domaine: 'Conformité', date: '2026-06-05', priorite: 'Moyenne', source: 'COBAC', impact: 'Banques CEMAC' },
];

export const REGULATORY_GLOBAL_METRICS = {
  total_textes_surveilles: 25000,
  total_alertes_mois: 555,
  total_analyses_mois: 900,
  juridictions_couvertes: 8,
  agents_actifs: 5,
  score_conformite_global: 96,
  alertes_temps_reel: 98,
  precision_analyses: 94,
  delai_alerte_moyen: '2.5h',
  notes_impact_mois: 42,
  certification: 'AAAA — Big Four Supreme 100% — Regulatory Excellence Enterprise',
};