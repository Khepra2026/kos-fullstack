// KOS Bloc 02 — KHEPRA Intelligence Center™
// Master Plan Big Four 2026-2028 — Phase 1 Fondations

export interface ICPublication {
  id: string;
  titre: string;
  type: 'Article Expert' | 'Note Réglementaire' | 'Étude Sectorielle' | 'Livre Blanc' | 'Rapport Annuel';
  theme: string;
  statut: 'Publié' | 'En relecture' | 'En rédaction' | 'Planifié';
  date: string;
  auteur: string;
  pages: number;
  score_qualite: number;
  citations: number;
  canaux: string[];
}

export interface ICAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  publications_mois: number;
  score_qualite_moyen: number;
  specialites: string[];
  icon: string;
}

export interface ICData {
  publications: ICPublication[];
  agents: ICAgent[];
  globalMetrics: {
    articles_an: number;
    notes_reglementaires_an: number;
    etudes_sectorielles_an: number;
    livres_blancs_an: number;
    rapports_annuels_an: number;
    publication_jour: number;
    geo_semaine: number;
    score_qualite_moyen: number;
    penseurs_affilies: number;
    citations_medias: number;
    backlinks_generes: number;
    certification: string;
  };
}

export const IC_PUBLICATIONS: ICPublication[] = [
  { id: 'pub-001', titre: 'Analyse d\'impact — Nouvelle Directive BCEAO sur la LCB-FT dans les SFD', type: 'Note Réglementaire', theme: 'LCB-FT', statut: 'Publié', date: '2026-06-17', auteur: 'KOS Regulatory Intelligence™', pages: 28, score_qualite: 9.4, citations: 15, canaux: ['Site Web', 'LinkedIn', 'Newsletter'] },
  { id: 'pub-002', titre: 'Le futur de la microfinance en zone UEMOA : digitalisation et inclusion financière 2026-2030', type: 'Étude Sectorielle', theme: 'Microfinance', statut: 'Publié', date: '2026-06-15', auteur: 'KOS Research Institute™', pages: 72, score_qualite: 9.7, citations: 38, canaux: ['Site Web', 'LinkedIn', 'ResearchGate', 'Newsletter'] },
  { id: 'pub-003', titre: 'Guide pratique — Préparer son Conseil d\'Administration face à une inspection COBAC', type: 'Article Expert', theme: 'Gouvernance', statut: 'Publié', date: '2026-06-14', auteur: 'KOS Governance Engine™', pages: 12, score_qualite: 9.1, citations: 22, canaux: ['Site Web', 'LinkedIn'] },
  { id: 'pub-004', titre: 'Benchmark — Normes IFRS S1/S2 : état des lieux de l\'adoption en Afrique francophone', type: 'Livre Blanc', theme: 'ESG', statut: 'En relecture', date: '2026-06-20', auteur: 'KOS ESG Engine™', pages: 56, score_qualite: 9.5, citations: 0, canaux: ['Site Web', 'LinkedIn', 'Newsletter', 'ResearchGate'] },
  { id: 'pub-005', titre: 'Rapport Annuel Khepra Experts 2025 — Intelligence Réglementaire et Conseil en Afrique', type: 'Rapport Annuel', theme: 'Institutionnel', statut: 'En rédaction', date: '2026-07-01', auteur: 'KOS Executive Studio™', pages: 94, score_qualite: 9.3, citations: 0, canaux: ['Site Web', 'LinkedIn', 'Presse', 'Partenaires'] },
  { id: 'pub-006', titre: '5 erreurs fatales dans la documentation prix de transfert en zone OHADA', type: 'Article Expert', theme: 'Fiscalité', statut: 'Publié', date: '2026-06-12', auteur: 'KOS Tax AI™', pages: 10, score_qualite: 9.0, citations: 31, canaux: ['Site Web', 'LinkedIn', 'Twitter/X'] },
  { id: 'pub-007', titre: 'Stratégie de conformité ESG pour les banques africaines — Roadmap 2026-2028', type: 'Livre Blanc', theme: 'ESG', statut: 'Publié', date: '2026-06-10', auteur: 'KOS ESG & Sustainability™', pages: 68, score_qualite: 9.6, citations: 45, canaux: ['Site Web', 'LinkedIn', 'Newsletter', 'ResearchGate', 'Presse'] },
  { id: 'pub-008', titre: 'Veille réglementaire — Juin 2026 : les 10 textes BCEAO/UEMOA/OHADA à surveiller', type: 'Note Réglementaire', theme: 'Veille', statut: 'Publié', date: '2026-06-08', auteur: 'KOS Regulatory Watch™', pages: 18, score_qualite: 9.2, citations: 52, canaux: ['Site Web', 'LinkedIn', 'Newsletter', 'Twitter/X'] },
];

export const IC_AGENTS: ICAgent[] = [
  {
    id: 'agent-ic-01',
    nom: 'Recherche Scientifique™',
    mission: 'Revue de littérature, analyse de données, synthèse de sources académiques et institutionnelles.',
    statut: 'Actif',
    publications_mois: 34,
    score_qualite_moyen: 9.1,
    specialites: ['Économétrie', 'Analyse sectorielle', 'Revue littérature', 'Sources académiques'],
    icon: 'ri-flask-line',
  },
  {
    id: 'agent-ic-02',
    nom: 'Veille Réglementaire™',
    mission: 'Surveillance quotidienne des textes BCEAO, UEMOA, OHADA, COBAC. Alertes et synthèses.',
    statut: 'Actif',
    publications_mois: 22,
    score_qualite_moyen: 9.3,
    specialites: ['BCEAO', 'UEMOA', 'OHADA', 'COBAC', 'Alertes'],
    icon: 'ri-radar-line',
  },
  {
    id: 'agent-ic-03',
    nom: 'Rédaction Big Four™',
    mission: 'Rédaction de publications de niveau cabinet international : structure, style, références.',
    statut: 'Actif',
    publications_mois: 28,
    score_qualite_moyen: 9.5,
    specialites: ['Livres blancs', 'Études sectorielles', 'Rapports', 'Style McKinsey/Deloitte'],
    icon: 'ri-quill-pen-line',
  },
  {
    id: 'agent-ic-04',
    nom: 'Fact-Checking™',
    mission: 'Vérification systématique de toutes les sources, données et affirmations. Zéro hallucination.',
    statut: 'Actif',
    publications_mois: 84,
    score_qualite_moyen: 9.8,
    specialites: ['Vérification sources', 'Croisement données', 'Traçabilité', 'Anti-hallucination'],
    icon: 'ri-check-double-line',
  },
];

export const IC_GLOBAL_METRICS = {
  articles_an: 750,
  notes_reglementaires_an: 180,
  etudes_sectorielles_an: 85,
  livres_blancs_an: 40,
  rapports_annuels_an: 18,
  publication_jour: 3,
  geo_semaine: 12,
  score_qualite_moyen: 9.9,
  penseurs_affilies: 35,
  citations_medias: 620,
  backlinks_generes: 2100,
  certification: 'AAAA — Big Four Supreme 100% — Intelligence Center Enterprise — 100% MATURITE — LEADER EDITORIAL AFRIQUE FRANCOPHONE',
};