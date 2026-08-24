// KOS Bloc 12 — Quality & Risk Management™
// Master Plan Big Four 2026-2028 — Phase 4 Industrialisation

export interface QualityControl {
  id: string;
  nom: string;
  controles_mois: number;
  anomalies_detectees: number;
  score_conformite: number;
  statut: string;
  icon: string;
}

export interface QualityAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  verifications_mois: number;
  sources_validees: number;
  hallucinations_bloquees: number;
  icon: string;
  methodologie: string;
}

export interface AuditLog {
  id: string;
  action: string;
  agent: string;
  date: string;
  resultat: 'Validé' | 'Corrigé' | 'Rejeté';
  details: string;
}

export const QUALITY_CONTROLS: QualityControl[] = [
  { id: 'qc-01', nom: 'Fact-Checking Systématique', controles_mois: 12500, anomalies_detectees: 32, score_conformite: 99.7, statut: 'Production', icon: 'ri-check-double-line' },
  { id: 'qc-02', nom: 'Validation Croisée Multi-IA', controles_mois: 9800, anomalies_detectees: 18, score_conformite: 99.8, statut: 'Production', icon: 'ri-git-branch-line' },
  { id: 'qc-03', nom: 'Contrôle Qualité Documentaire', controles_mois: 7200, anomalies_detectees: 45, score_conformite: 99.4, statut: 'Production', icon: 'ri-file-search-line' },
  { id: 'qc-04', nom: 'Vérification Réglementaire', controles_mois: 8500, anomalies_detectees: 28, score_conformite: 99.7, statut: 'Production', icon: 'ri-scales-3-line' },
  { id: 'qc-05', nom: 'Détection Hallucinations', controles_mois: 15600, anomalies_detectees: 85, score_conformite: 99.5, statut: 'Production', icon: 'ri-spy-line' },
  { id: 'qc-06', nom: 'Traçabilité des Sources', controles_mois: 10200, anomalies_detectees: 12, score_conformite: 99.9, statut: 'Production', icon: 'ri-links-line' },
];

export const QUALITY_AGENTS: QualityAgent[] = [
  { id: 'qa-01', nom: 'Quality Controller™', mission: 'Orchestrateur qualité central : supervision des 6 contrôles, coordination des agents de vérification, reporting exécutif quotidien. Score qualité temps réel avec alertes automatiques si baisse.', statut: 'Actif', verifications_mois: 8200, sources_validees: 45000, hallucinations_bloquees: 42, icon: 'ri-medal-line', methodologie: 'PDCA — Plan-Do-Check-Act' },
  { id: 'qa-02', nom: 'Fact-Checking Engine™', mission: 'Vérification automatique de chaque fait et statistique : croisement multi-sources, vérification dates et chiffres, détection des incohérences, traçabilité complète des références.', statut: 'Actif', verifications_mois: 12500, sources_validees: 68000, hallucinations_bloquees: 32, icon: 'ri-check-double-line', methodologie: 'Triangulation multi-sources' },
  { id: 'qa-03', nom: 'Cross-Validation Engine™', mission: 'Validation croisée via 4 IA indépendantes (ChatGPT, Claude, Gemini, Perplexity) : chaque affirmation vérifiée par au moins 3 modèles. Discordances escaladées à un expert humain.', statut: 'Actif', verifications_mois: 9800, sources_validees: 52000, hallucinations_bloquees: 18, icon: 'ri-git-branch-line', methodologie: 'Consensus IA multi-modèle' },
  { id: 'qa-04', nom: 'Anti-Hallucination Engine™', mission: 'Détection et blocage des hallucinations : analyse sémantique des affirmations, vérification contre le corpus documentaire, identification des citations inventées. Alertes immédiates.', statut: 'Actif', verifications_mois: 15600, sources_validees: 85000, hallucinations_bloquees: 85, icon: 'ri-spy-line', methodologie: 'Vector DB + RAG validation' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'log-001', action: 'Vérification ratio solvabilité 12.5%', agent: 'Fact-Checking Engine', date: '2026-06-18', resultat: 'Validé', details: 'Confirmé BCEAO Circulaire 01-2017 art. 7' },
  { id: 'log-002', action: 'Citation directive COBAC 2027', agent: 'Anti-Hallucination Engine', date: '2026-06-18', resultat: 'Corrigé', details: 'Date corrigée : 2026 → 2027' },
  { id: 'log-003', action: 'Données inclusion financière UEMOA', agent: 'Cross-Validation Engine', date: '2026-06-18', resultat: 'Validé', details: 'Confirmé BCEAO Rapport Annuel 2025 p.42' },
  { id: 'log-004', action: 'Recommandation GAFI #24 — bénéficiaires effectifs', agent: 'Quality Controller', date: '2026-06-17', resultat: 'Validé', details: 'Vérifié GAFI Guidance 2025 + GIABA' },
  { id: 'log-005', action: 'Taux LCB-FT SFD UEMOA 2025', agent: 'Fact-Checking Engine', date: '2026-06-17', resultat: 'Rejeté', details: 'Source non vérifiable — donnée supprimée' },
];

export const QUALITY_GLOBAL_METRICS = {
  sources_inventees: 0,
  references_tracables: 100,
  score_qualite_livrables: 9.5,
  controles_mensuels: 63800,
  hallucinations_bloquees_total: 177,
  agents_qualite_actifs: 4,
  modeles_ia_validation: 4,
  certifications: 'ISO 9001 / ISO 42001 / ISO 27001',
  delai_verification_moyen: '3.2s',
  precision_detection: 99.7,
  faux_positifs: 0.02,
  certification: 'AAAA — Big Four Supreme 100% — Quality & Risk Enterprise',
};



