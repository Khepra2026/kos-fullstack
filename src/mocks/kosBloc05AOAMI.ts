// KOS Bloc 05 — AO / AMI Intelligence™
// Master Plan Big Four 2026-2028 — Phase 2 Acquisition

export interface AOOpportunite {
  id: string;
  titre: string;
  source: string;
  pays: string;
  secteur: string;
  budget_fcfa: number;
  date_limite: string;
  score_qualification: number;
  statut: 'Qualifié' | 'En cours' | 'Soumis' | 'En veille';
  priorite: 'Haute' | 'Moyenne' | 'Basse';
}

export interface AOAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  opportunites_detectees: number;
  score_qualification: number;
  icon: string;
  sources_surveillees: string[];
}

export interface AOData {
  opportunites: AOOpportunite[];
  agents: AOAgent[];
  globalMetrics: {
    total_opportunites_an: number;
    opportunites_qualifiees: number;
    pipeline_total_fcfa: number;
    taux_reponse: number;
    delai_alerte_heures: number;
    taux_conversion: number;
    sources_actives: number;
    soumissions_en_cours: number;
    score_global: number;
    certification: string;
  };
}

export const AO_OPPORTUNITES: AOOpportunite[] = [
  { id: 'ao-001', titre: 'Audit institutionnel BCEAO — Programme de renforcement SFD', source: 'Banque Mondiale', pays: 'Sénégal', secteur: 'Microfinance', budget_fcfa: 2450000000, date_limite: '2026-07-15', score_qualification: 94, statut: 'Qualifié', priorite: 'Haute' },
  { id: 'ao-002', titre: 'AMU — Conseil en gouvernance bancaire UEMOA', source: 'BAD', pays: 'Côte d\'Ivoire', secteur: 'Banque', budget_fcfa: 1800000000, date_limite: '2026-07-20', score_qualification: 91, statut: 'En cours', priorite: 'Haute' },
  { id: 'ao-003', titre: 'Due diligence ESG — Portefeuille PME Afrique de l\'Ouest', source: 'UE TED', pays: 'Burkina Faso', secteur: 'ESG', budget_fcfa: 950000000, date_limite: '2026-08-05', score_qualification: 88, statut: 'Qualifié', priorite: 'Haute' },
  { id: 'ao-004', titre: 'Étude de faisabilité — Fonds d\'investissement Fintech', source: 'FMI', pays: 'Régional UEMOA', secteur: 'Fintech', budget_fcfa: 3200000000, date_limite: '2026-08-15', score_qualification: 86, statut: 'Soumis', priorite: 'Moyenne' },
  { id: 'ao-005', titre: 'Assistance technique LCB-FT pour institutions financières', source: 'ONU — UNODC', pays: 'Mali', secteur: 'Conformité', budget_fcfa: 560000000, date_limite: '2026-08-30', score_qualification: 82, statut: 'En veille', priorite: 'Moyenne' },
  { id: 'ao-006', titre: 'Formation réglementaire — Actualisation normes OHADA', source: 'BAD', pays: 'Togo', secteur: 'Juridique', budget_fcfa: 420000000, date_limite: '2026-09-10', score_qualification: 90, statut: 'En cours', priorite: 'Haute' },
  { id: 'ao-007', titre: 'Stratégie nationale inclusion financière digitale', source: 'PNUD', pays: 'Niger', secteur: 'Fintech', budget_fcfa: 1500000000, date_limite: '2026-09-25', score_qualification: 78, statut: 'Qualifié', priorite: 'Moyenne' },
];

export const AO_AGENTS: AOAgent[] = [
  {
    id: 'agent-ao-01',
    nom: 'AO/AMI Intelligence™',
    mission: 'Veille permanente sur les appels d\'offres et manifestations d\'intérêt : ONU, BAD, Banque Mondiale, UE, États, Agences de développement. Détection et qualification automatique.',
    statut: 'Actif',
    opportunites_detectees: 380,
    score_qualification: 95,
    icon: 'ri-file-search-line',
    sources_surveillees: ['UNGM', 'Banque Mondiale', 'BAD', 'UE TED'],
  },
  {
    id: 'agent-ao-02',
    nom: 'Bid Alert Engine™',
    mission: 'Système d\'alertes intelligentes : scoring automatique, matching secteur/pays/expertise, notifications en temps réel, calendrier des deadlines.',
    statut: 'Actif',
    opportunites_detectees: 290,
    score_qualification: 91,
    icon: 'ri-notification-3-line',
    sources_surveillees: ['DevelopmentAid', 'Marchés publics', 'Partenaires'],
  },
  {
    id: 'agent-ao-03',
    nom: 'Auto Response Preparation™',
    mission: 'Préparation automatique des dossiers de réponse : préqualification, proposition technique, budget, calendrier, références. Templates Big Four personnalisables.',
    statut: 'Actif',
    opportunites_detectees: 210,
    score_qualification: 88,
    icon: 'ri-file-copy-2-line',
    sources_surveillees: ['Tous'],
  },
];

export const AO_GLOBAL_METRICS = {
  total_opportunites_an: 580,
  opportunites_qualifiees: 520,
  pipeline_total_fcfa: 22450000000,
  taux_reponse: 85,
  delai_alerte_heures: 1,
  taux_conversion: 28,
  sources_actives: 12,
  soumissions_en_cours: 22,
  score_global: 94,
  certification: 'AAAA — Big Four Supreme 100% — AO/AMI Intelligence Enterprise — 85% REPONSE ATTEINT',
};





