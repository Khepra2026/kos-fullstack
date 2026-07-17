export interface KpiCard {
  id: string;
  label: string;
  value: string;
  variation: string;
  variationPos: boolean;
  icon: string;
  color: string;
}

export interface PipelineData {
  mois: string;
  suspects: number;
  leads: number;
  opportunites: number;
  missions: number;
}

export interface MissionActive {
  id: string;
  client: string;
  secteur: string;
  mission: string;
  statut: 'Dans les délais' | 'En retard' | 'Terminé';
  progression: number;
  deadline: string;
  agent_lead: string;
}

export interface AlertItem {
  id: string;
  niveau: 'ROUGE' | 'ORANGE' | 'JAUNE';
  message: string;
  date: string;
  agent_source: string;
}

export interface AgentPerformance {
  agent: string;
  score: number;
  livrables: number;
  delais: number;
}

export const executiveKpiCards: KpiCard[] = [
  { id: 'ca', label: 'CA Mensuel (Juin)', value: '187 500 €', variation: '+12.4%', variationPos: true, icon: 'ri-money-euro-circle-line', color: '#0D7B5F' },
  { id: 'pipeline', label: 'Pipeline Pondéré', value: '645 000 €', variation: '+18.7%', variationPos: true, icon: 'ri-filter-3-line', color: '#4A7A1E' },
  { id: 'nps', label: 'NPS Global', value: '74', variation: '+5 pts', variationPos: true, icon: 'ri-star-line', color: '#C2410C' },
  { id: 'qualite', label: 'Score Qualité Moyen', value: '94.2/100', variation: '+1.3', variationPos: true, icon: 'ri-shield-check-line', color: '#4A5568' },
  { id: 'missions', label: 'Missions Actives', value: '12', variation: '2 en alerte', variationPos: false, icon: 'ri-briefcase-line', color: '#9B7B2C' },
  { id: 'retard', label: 'Taux de Retard', value: '8.3%', variation: '-2.1%', variationPos: true, icon: 'ri-timer-line', color: '#8B3A4A' },
];

export const pipelineData: PipelineData[] = [
  { mois: 'Jan', suspects: 180, leads: 72, opportunites: 18, missions: 5 },
  { mois: 'Fév', suspects: 195, leads: 78, opportunites: 22, missions: 6 },
  { mois: 'Mar', suspects: 210, leads: 85, opportunites: 25, missions: 7 },
  { mois: 'Avr', suspects: 225, leads: 90, opportunites: 28, missions: 8 },
  { mois: 'Mai', suspects: 240, leads: 95, opportunites: 30, missions: 9 },
  { mois: 'Juin', suspects: 260, leads: 105, opportunites: 35, missions: 12 },
];

export const missionsActives: MissionActive[] = [
  { id: 'm1', client: 'Banque Atlantique', secteur: 'Banque', mission: 'Audit Pré-Inspection COBAC', statut: 'Dans les délais', progression: 75, deadline: '2026-07-15', agent_lead: 'AG7 (Audit AI)' },
  { id: 'm2', client: 'MicroFin Afrique', secteur: 'Microfinance', mission: 'Diagnostic LBC/FT /32', statut: 'En retard', progression: 45, deadline: '2026-06-01', agent_lead: 'AG4 (AML AI)' },
  { id: 'm3', client: 'Groupe Industriel Sahélien', secteur: 'Industrie', mission: 'Documentation Prix de Transfert BEPS', statut: 'Dans les délais', progression: 60, deadline: '2026-07-30', agent_lead: 'AG5 (TP AI)' },
  { id: 'm4', client: 'FinTech PayAfrik', secteur: 'FinTech', mission: 'Agrément Établissement de Paiement', statut: 'Dans les délais', progression: 30, deadline: '2026-09-15', agent_lead: 'AG3 (Compliance AI)' },
  { id: 'm5', client: 'Assurances CIMA Plus', secteur: 'Assurance', mission: 'Due Diligence Réglementaire', statut: 'En retard', progression: 20, deadline: '2026-05-20', agent_lead: 'AG7 (Audit AI)' },
  { id: 'm6', client: 'Holding Familiale Koumassi', secteur: 'Holding', mission: 'Structuration Fiscale UEMOA', statut: 'Dans les délais', progression: 85, deadline: '2026-06-20', agent_lead: 'AG6 (Tax AI)' },
  { id: 'm7', client: 'BCEAO — Projet SFD', secteur: 'Public', mission: 'Révision Ratios Prudentiels SFD', statut: 'Dans les délais', progression: 50, deadline: '2026-08-01', agent_lead: 'AG2 (Risk AI)' },
  { id: 'm8', client: 'Banque Centrale Populaire', secteur: 'Banque', mission: 'Gouvernance Board Advisory', statut: 'Terminé', progression: 100, deadline: '2026-05-30', agent_lead: 'AG1 (Strategy AI)' },
];

export const alertItems: AlertItem[] = [
  { id: 'a1', niveau: 'ROUGE', message: 'COBAC — Nouvelle Circulaire Contrôle Interne publiée le 05/06/2026. Impact : tous les établissements CEMAC. Délai : 6 mois.', date: '2026-06-05', agent_source: 'AG3 (Compliance AI)' },
  { id: 'a2', niveau: 'ROUGE', message: 'BCEAO — Ratios prudentiels SFD révisés. Ratio de solvabilité porté à 18%. 250+ SFD concernés.', date: '2026-06-03', agent_source: 'AG3 (Compliance AI)' },
  { id: 'a3', niveau: 'ORANGE', message: 'Mission MicroFin Afrique — En retard de 7 jours. Progression : 45%. Lead : AG4 (AML AI).', date: '2026-06-08', agent_source: 'AG13 (Client Success AI)' },
  { id: 'a4', niveau: 'ORANGE', message: 'GAFI — Recommandation 15 révisée (crypto-actifs). Transposition UEMOA/CEMAC attendue sous 12 mois.', date: '2026-05-28', agent_source: 'AG4 (AML AI)' },
  { id: 'a5', niveau: 'JAUNE', message: 'Pipeline Q2 à 85% de l\'objectif. 3 opportunités majeures en attente de proposition.', date: '2026-06-07', agent_source: 'AG11 (BD AI)' },
  { id: 'a6', niveau: 'JAUNE', message: 'Proposition Banque Régionale — > 50k EUR en attente de validation CEO depuis 48h.', date: '2026-06-06', agent_source: 'AG12 (Proposal AI)' },
];

export const agentPerformance: AgentPerformance[] = [
  { agent: 'AG7 (Audit AI)', score: 96, livrables: 8, delais: 100 },
  { agent: 'AG3 (Compliance AI)', score: 95, livrables: 12, delais: 95 },
  { agent: 'AG4 (AML AI)', score: 93, livrables: 5, delais: 85 },
  { agent: 'AG5 (TP AI)', score: 94, livrables: 4, delais: 100 },
  { agent: 'AG6 (Tax AI)', score: 92, livrables: 6, delais: 90 },
  { agent: 'AG1 (Strategy AI)', score: 95, livrables: 7, delais: 95 },
  { agent: 'AG2 (Risk AI)', score: 91, livrables: 9, delais: 88 },
  { agent: 'AG11 (BD AI)', score: 90, livrables: 15, delais: 92 },
  { agent: 'AG12 (Proposal AI)', score: 89, livrables: 10, delais: 85 },
  { agent: 'AG13 (Client Success AI)', score: 93, livrables: 6, delais: 98 },
];