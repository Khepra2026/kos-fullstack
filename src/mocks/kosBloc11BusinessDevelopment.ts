// KOS Bloc 11 — Business Development Engine™
// Master Plan Big Four 2026-2028 — Phase 4 Industrialisation

export interface PipelineStage {
  id: string;
  nom: string;
  deals_count: number;
  valeur: number;
  conversion_rate: number;
  duree_moyenne: string;
  icon: string;
}

export interface LeadSource {
  id: string;
  nom: string;
  leads_mois: number;
  qualifiés: number;
  conversion: number;
  tendance: number;
  icon: string;
}

export interface BDAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  leads_generees: number;
  deals_convertis: number;
  revenu_genere: number;
  icon: string;
  sequence: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'stage-01', nom: 'Prospection', deals_count: 285, valeur: 12.4, conversion_rate: 100, duree_moyenne: '0-7j', icon: 'ri-search-line' },
  { id: 'stage-02', nom: 'Qualification', deals_count: 198, valeur: 8.9, conversion_rate: 69.5, duree_moyenne: '7-14j', icon: 'ri-filter-line' },
  { id: 'stage-03', nom: 'Proposition', deals_count: 112, valeur: 5.8, conversion_rate: 56.6, duree_moyenne: '14-21j', icon: 'ri-file-text-line' },
  { id: 'stage-04', nom: 'Négociation', deals_count: 68, valeur: 4.2, conversion_rate: 60.7, duree_moyenne: '21-30j', icon: 'ri-hand-heart-line' },
  { id: 'stage-05', nom: 'Closing', deals_count: 42, valeur: 3.1, conversion_rate: 61.8, duree_moyenne: '30-45j', icon: 'ri-check-double-line' },
  { id: 'stage-06', nom: 'Gagné', deals_count: 28, valeur: 1.52, conversion_rate: 66.7, duree_moyenne: '45+j', icon: 'ri-trophy-line' },
];

export const LEAD_SOURCES: LeadSource[] = [
  { id: 'src-01', nom: 'SEO Organique', leads_mois: 320, qualifiés: 185, conversion: 8.2, tendance: 15, icon: 'ri-search-line' },
  { id: 'src-02', nom: 'LinkedIn', leads_mois: 180, qualifiés: 95, conversion: 6.5, tendance: 12, icon: 'ri-linkedin-line' },
  { id: 'src-03', nom: 'AO/AMI Intelligence', leads_mois: 85, qualifiés: 62, conversion: 14.8, tendance: 22, icon: 'ri-file-search-line' },
  { id: 'src-04', nom: 'Partenariats', leads_mois: 55, qualifiés: 38, conversion: 11.2, tendance: 8, icon: 'ri-hand-heart-line' },
  { id: 'src-05', nom: 'Référencements', leads_mois: 48, qualifiés: 42, conversion: 18.5, tendance: 10, icon: 'ri-user-star-line' },
  { id: 'src-06', nom: 'Lead Magnets', leads_mois: 32, qualifiés: 22, conversion: 9.8, tendance: 25, icon: 'ri-download-line' },
];

export const BD_AGENTS: BDAgent[] = [
  { id: 'bd-agent-01', nom: 'Growth Engine™', mission: 'Moteur de croissance autonome : prospection multi-canal, scoring prédictif, nurturing automatisé, conversion tracking. Orchestration du pipeline complet avec recommandations d\'actions.', statut: 'Actif', leads_generees: 4800, deals_convertis: 142, revenu_genere: 2.8, icon: 'ri-rocket-2-line', sequence: 'Prospection → Scoring → Nurturing → Closing' },
  { id: 'bd-agent-02', nom: 'Lead Scoring™', mission: 'Scoring prédictif des leads : analyse comportementale, firmographie, intent data, scoring temps réel, priorisation automatique. Intégration CRM et déclenchement automatique des relances.', statut: 'Actif', leads_generees: 3200, deals_convertis: 98, revenu_genere: 1.6, icon: 'ri-user-heart-line', sequence: 'Capture → Score → Qualification → Assignation' },
  { id: 'bd-agent-03', nom: 'Nurturing Engine™', mission: 'Séquences nurturing automatisées : emails personnalisés, contenus ciblés, suivi d\'engagement, réactivation des leads dormants. 12 séquences préconfigurées par persona et secteur.', statut: 'Actif', leads_generees: 2100, deals_convertis: 67, revenu_genere: 0.9, icon: 'ri-mail-send-line', sequence: 'Awareness → Interest → Consideration → Intent' },
  { id: 'bd-agent-04', nom: 'Revenue Forecasting™', mission: 'Prévisions de revenus basées IA : projection pipeline, analyse des tendances, identification des risques, recommandations d\'allocation. Dashboard exécutif temps réel.', statut: 'En déploiement', leads_generees: 800, deals_convertis: 28, revenu_genere: 0.4, icon: 'ri-funds-line', sequence: 'Pipeline → Forecast → Simulate → Optimize' },
];

export const BD_GLOBAL_METRICS = {
  pipeline_total: 3.77,
  leads_mensuels: 720,
  taux_conversion_global: 8.4,
  deals_actifs: 198,
  revenu_mensuel: 0.38,
  duree_cycle_moyen: '28j',
  taux_qualification: 57.3,
  cout_acquisition: 0.02,
  sequences_nurturing_actives: 8,
  relances_automatisees: 4200,
  certification: 'AAAA — Big Four Supreme 100% — Business Development Enterprise',
};