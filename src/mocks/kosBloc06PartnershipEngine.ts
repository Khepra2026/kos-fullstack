// KOS Bloc 06 — Partnership Engine™
// Master Plan Big Four 2026-2028 — Phase 2 Acquisition

export interface Partenaire {
  id: string;
  nom: string;
  type: 'Banque' | 'Fonds' | 'ONG' | 'Cabinet international' | 'Université' | 'Think Tank';
  pays: string;
  score_compatibilite: number;
  statut: 'Actif' | 'En discussion' | 'Prioritaire' | 'Identifié';
  missions_conjointes: number;
  valeur_pipeline_fcfa: number;
  contact_etabli: boolean;
}

export interface PartnershipAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  partenaires_gerees: number;
  score_activation: number;
  icon: string;
  cibles_prioritaires: string[];
}

export interface PartnershipData {
  partenaires: Partenaire[];
  agents: PartnershipAgent[];
  globalMetrics: {
    total_partenaires_prioritaires: number;
    partenaires_actifs: number;
    en_discussion: number;
    score_compatibilite_moyen: number;
    missions_conjointes_total: number;
    pipeline_conjoint_fcfa: number;
    nouveaux_partenaires_trimestre: number;
    score_global: number;
    certification: string;
  };
}

export const PARTENAIRES: Partenaire[] = [
  { id: 'part-001', nom: 'Ecobank Transnational', type: 'Banque', pays: 'Togo', score_compatibilite: 92, statut: 'Actif', missions_conjointes: 5, valeur_pipeline_fcfa: 850000000, contact_etabli: true },
  { id: 'part-002', nom: 'BOAD — Banque Ouest-Africaine de Développement', type: 'Fonds', pays: 'Togo', score_compatibilite: 89, statut: 'Actif', missions_conjointes: 3, valeur_pipeline_fcfa: 1250000000, contact_etabli: true },
  { id: 'part-003', nom: 'Deloitte Afrique', type: 'Cabinet international', pays: 'Côte d\'Ivoire', score_compatibilite: 87, statut: 'En discussion', missions_conjointes: 0, valeur_pipeline_fcfa: 500000000, contact_etabli: true },
  { id: 'part-004', nom: 'Fondation Gates', type: 'ONG', pays: 'Sénégal', score_compatibilite: 84, statut: 'Prioritaire', missions_conjointes: 1, valeur_pipeline_fcfa: 320000000, contact_etabli: true },
  { id: 'part-005', nom: 'HEC Paris — Centre Afrique', type: 'Université', pays: 'France', score_compatibilite: 82, statut: 'Actif', missions_conjointes: 2, valeur_pipeline_fcfa: 150000000, contact_etabli: true },
  { id: 'part-006', nom: 'Banque Atlantique', type: 'Banque', pays: 'Côte d\'Ivoire', score_compatibilite: 85, statut: 'En discussion', missions_conjointes: 1, valeur_pipeline_fcfa: 480000000, contact_etabli: true },
  { id: 'part-007', nom: 'IFC — Société Financière Internationale', type: 'Fonds', pays: 'Sénégal', score_compatibilite: 78, statut: 'Prioritaire', missions_conjointes: 0, valeur_pipeline_fcfa: 750000000, contact_etabli: false },
  { id: 'part-008', nom: 'Africa CEO Forum', type: 'Think Tank', pays: 'Côte d\'Ivoire', score_compatibilite: 76, statut: 'Identifié', missions_conjointes: 0, valeur_pipeline_fcfa: 0, contact_etabli: false },
];

export const PARTNERSHIP_AGENTS: PartnershipAgent[] = [
  {
    id: 'agent-part-01',
    nom: 'Partnership Engine™',
    mission: 'Cartographie et activation des partenaires stratégiques : banques, fonds, ONG, cabinets internationaux, universités, think tanks. Stratégie d\'approche séquencée, scoring de compatibilité, pipeline automatisé.',
    statut: 'Actif',
    partenaires_gerees: 58,
    score_activation: 92,
    icon: 'ri-hand-heart-line',
    cibles_prioritaires: ['Banques', 'Fonds', 'Cabinets internationaux'],
  },
  {
    id: 'agent-part-02',
    nom: 'Strategic Relationship Engine™',
    mission: 'Gestion des relations stratégiques : nurturing partenarial, suivi des contacts, propositions de collaboration, événements conjoints, communication institutionnelle.',
    statut: 'Actif',
    partenaires_gerees: 42,
    score_activation: 88,
    icon: 'ri-user-heart-line',
    cibles_prioritaires: ['ONG', 'Universités', 'Think Tanks'],
  },
];

export const PARTNERSHIP_GLOBAL_METRICS = {
  total_partenaires_prioritaires: 100,
  partenaires_actifs: 20,
  en_discussion: 24,
  score_compatibilite_moyen: 90,
  missions_conjointes_total: 18,
  pipeline_conjoint_fcfa: 6200000000,
  nouveaux_partenaires_trimestre: 12,
  score_global: 92,
  certification: 'AAAA — Big Four Supreme 100% — Partnership Engine Enterprise — 20 ACTIFS ATTEINT',
};