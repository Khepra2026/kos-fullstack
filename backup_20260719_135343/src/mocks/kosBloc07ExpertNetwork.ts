// KOS Bloc 07 — Expert Network™
// Master Plan Big Four 2026-2028 — Phase 2 Acquisition

export interface Expert {
  id: string;
  nom: string;
  specialite: string;
  pays: string;
  experience_annees: number;
  langues: string[];
  score_qualification: number;
  statut: 'Mobilisable' | 'Disponible' | 'En mission' | 'En évaluation';
  delai_mobilisation_jours: number;
  missions_realisees: number;
}

export interface ExpertAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  experts_recrutes: number;
  score_matching: number;
  icon: string;
  specialites_couvertes: string[];
}

export interface ExpertData {
  experts: Expert[];
  agents: ExpertAgent[];
  globalMetrics: {
    total_experts_qualifies: number;
    experts_mobilisables: number;
    delai_mobilisation_heures: number;
    couverture_pays: number;
    couverture_specialites: number;
    missions_actives: number;
    nouveaux_experts_mois: number;
    score_qualification_moyen: number;
    score_global: number;
    certification: string;
  };
}

export const EXPERTS: Expert[] = [
  { id: 'exp-001', nom: 'Dr. Aminata KONÉ', specialite: 'Droit Bancaire UEMOA', pays: 'Côte d\'Ivoire', experience_annees: 18, langues: ['Français', 'Anglais'], score_qualification: 96, statut: 'Mobilisable', delai_mobilisation_jours: 1, missions_realisees: 14 },
  { id: 'exp-002', nom: 'Pr. Jean-Baptiste EHOUMAN', specialite: 'Économie Monétaire', pays: 'Côte d\'Ivoire', experience_annees: 22, langues: ['Français'], score_qualification: 94, statut: 'En mission', delai_mobilisation_jours: 5, missions_realisees: 9 },
  { id: 'exp-003', nom: 'Mariama SOW', specialite: 'LCB-FT & Conformité', pays: 'Sénégal', experience_annees: 15, langues: ['Français', 'Anglais'], score_qualification: 92, statut: 'Mobilisable', delai_mobilisation_jours: 2, missions_realisees: 11 },
  { id: 'exp-004', nom: 'Dr. Komlan ADJALÉ', specialite: 'Fiscalité Internationale', pays: 'Togo', experience_annees: 20, langues: ['Français', 'Anglais'], score_qualification: 90, statut: 'Disponible', delai_mobilisation_jours: 3, missions_realisees: 8 },
  { id: 'exp-005', nom: 'Fatoumata DIALLO', specialite: 'ESG & Finance Durable', pays: 'Mali', experience_annees: 12, langues: ['Français', 'Anglais'], score_qualification: 88, statut: 'Mobilisable', delai_mobilisation_jours: 1, missions_realisees: 7 },
  { id: 'exp-006', nom: 'Pr. Aboubacar TRAORÉ', specialite: 'Gouvernance OHADA', pays: 'Burkina Faso', experience_annees: 25, langues: ['Français'], score_qualification: 87, statut: 'En évaluation', delai_mobilisation_jours: 7, missions_realisees: 5 },
  { id: 'exp-007', nom: 'Nadège ZINSOU', specialite: 'Actuariat & Risques', pays: 'Bénin', experience_annees: 14, langues: ['Français'], score_qualification: 85, statut: 'Disponible', delai_mobilisation_jours: 4, missions_realisees: 6 },
  { id: 'exp-008', nom: 'Cheikh NDIAYE', specialite: 'Banque & Microfinance', pays: 'Sénégal', experience_annees: 16, langues: ['Français', 'Anglais'], score_qualification: 83, statut: 'Mobilisable', delai_mobilisation_jours: 2, missions_realisees: 12 },
];

export const EXPERT_AGENTS: ExpertAgent[] = [
  {
    id: 'agent-exp-01',
    nom: 'Expert Network™',
    mission: 'Sourcing automatisé d\'experts panafricains : LinkedIn, publications académiques, conférences, bases de données. Notation multicritère, vérification des références, matching mission/expert.',
    statut: 'Actif',
    experts_recrutes: 420,
    score_matching: 94,
    icon: 'ri-user-search-line',
    specialites_couvertes: ['Droit', 'Économie', 'Finance', 'ESG'],
  },
  {
    id: 'agent-exp-02',
    nom: 'Expert Profile Engine™',
    mission: 'Gestion des profils experts : scoring automatique, mise à jour continue, tracking des missions, recommandations de mobilisation, pipeline de recrutement.',
    statut: 'Actif',
    experts_recrutes: 180,
    score_matching: 86,
    icon: 'ri-user-star-line',
    specialites_couvertes: ['Fiscalité', 'Actuariat', 'Gouvernance'],
  },
];

export const EXPERT_GLOBAL_METRICS = {
  total_experts_qualifies: 500,
  experts_mobilisables: 50,
  delai_mobilisation_heures: 24,
  couverture_pays: 22,
  couverture_specialites: 15,
  missions_actives: 22,
  nouveaux_experts_mois: 35,
  score_qualification_moyen: 90,
  score_global: 91,
  certification: 'AAAA — Big Four Supreme 100% — Expert Network Enterprise — 500 EXPERTS ATTEINT',
};



