// ============================================================================
// KOS CANVA FACTORY™ — Hub 95
// Big Four Institutional Graphic Design Industrialization
// Templates × Infographies × Réseaux Sociaux × Miniatures × Rapports Visuels × KPIs
// ============================================================================

export interface TemplateCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
  color: string;
  description: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  { id: 'governance', name: 'Gouvernance', count: 100, icon: 'ri-building-4-line', color: 'primary', description: 'Templates pour présentations CA, chartes de gouvernance, matrices RACI, organigrammes, évaluations administrateurs' },
  { id: 'audit', name: 'Audit', count: 100, icon: 'ri-search-eye-line', color: 'accent', description: 'Templates pour rapports d\'audit, cartographies de risques, plans d\'audit, matrices de contrôle, questionnaires' },
  { id: 'compliance', name: 'Conformité', count: 100, icon: 'ri-shield-check-line', color: 'secondary', description: 'Templates pour politiques LCB/FT, registres KYC, rapports conformité, procédures, formations' },
  { id: 'risks', name: 'Risques', count: 100, icon: 'ri-alert-line', color: 'primary', description: 'Templates pour matrices de risques, heat maps, dashboards risques, plans de continuité, stress tests' },
];

// --- INFOGRAPHIES LIBRARY ---
export interface InfographicTemplate {
  id: string;
  title: string;
  category: string;
  useCase: string;
  icon: string;
  color: string;
  specs: string;
  elements: string[];
}

export const INFOGRAPHICS: InfographicTemplate[] = [
  { id: 'INF-001', title: 'Chaîne de Valeur Conformité LCB/FT', category: 'Conformité', useCase: 'Visualiser le processus complet de conformité LCB/FT de l\'onboarding au reporting', icon: 'ri-flow-chart', color: 'secondary', specs: 'A3 paysage, vecteurs SVG, palette KHEPRA, 6 couches', elements: ['Entrée onboarding', 'KYC screening', 'Classification risque', 'Surveillance continue', 'Déclaration soupçon', 'Reporting'] },
  { id: 'INF-002', title: 'Pyramide des Ratios Prudentiels UEMOA', category: 'Risques', useCase: 'Hiérarchiser les ratios prudentiels BCEAO par criticité', icon: 'ri-triangle-line', color: 'primary', specs: 'A4 portrait, dégradés, icônes par ratio, 12 ratios', elements: ['Solvabilité', 'Liquidité LCR', 'Levier', 'Concentration', 'Transformation', 'Couverture'] },
  { id: 'INF-003', title: 'Timeline Mise en Conformité COBAC 2027', category: 'Conformité', useCase: 'Calendrier visuel des étapes de mise en conformité cybersécurité COBAC', icon: 'ri-timeline-view', color: 'accent', specs: 'A3 paysage, timeline horizontale, jalons colorés, phases', elements: ['Gouvernance ICT', 'Cartographie risques', 'Gestion incidents', 'Tests résilience', 'Prestataires tiers', 'Rapport conformité'] },
  { id: 'INF-004', title: 'Matrice des Risques ESG — Banque UEMOA', category: 'Risques', useCase: 'Cartographier les risques ESG par probabilité et impact', icon: 'ri-grid-line', color: 'secondary', specs: 'A4 paysage, heat map 5×5, bulles proportionnelles, 20 risques', elements: ['Risques physiques', 'Risques transition', 'Risques réputation', 'Risques réglementaires', 'Opportunités', 'Mitigation'] },
  { id: 'INF-005', title: 'Organigramme Gouvernance Idéal BCEAO', category: 'Gouvernance', useCase: 'Structurer l\'organigramme de gouvernance conforme aux circulaires BCEAO', icon: 'ri-organization-chart', color: 'primary', specs: 'A3 portrait, arborescence, rôles et responsabilités, 15 nœuds', elements: ['AG', 'CA', 'Comité Audit', 'Comité Risques', 'Comité Rémunération', 'DG'] },
  { id: 'INF-006', title: 'Processus d\'Audit Basé sur les Risques', category: 'Audit', useCase: 'Illustrer la méthodologie d\'audit basée sur les risques COSO', icon: 'ri-route-line', color: 'accent', specs: 'A3 paysage, diagramme circulaire, 5 phases', elements: ['Univers audit', 'Évaluation risques', 'Plan annuel', 'Exécution missions', 'Reporting', 'Suivi'] },
  { id: 'INF-007', title: 'Cycle ISSB — IFRS S1/S2 pour Banques', category: 'Gouvernance', useCase: 'Visualiser le processus de reporting ISSB', icon: 'ri-recycle-line', color: 'primary', specs: 'A3 paysage, infographie circulaire, 4 piliers', elements: ['Gouvernance', 'Stratégie', 'Gestion risques', 'Métriques & Cibles'] },
  { id: 'INF-008', title: '7 Piliers Gouvernance SFD — BCEAO', category: 'Gouvernance', useCase: 'Checklist visuelle des 7 piliers de gouvernance SFD', icon: 'ri-building-line', color: 'secondary', specs: 'A4 portrait, colonnes, indicateurs, codes couleur', elements: ['CA', 'Transparence', 'Conflits', 'Comités', 'Clients', 'Évaluation', 'Stratégie'] },
  { id: 'INF-009', title: 'Processus Gestion Incident Cybersécurité', category: 'Audit', useCase: 'Diagramme de flux pour gestion des incidents ICT', icon: 'ri-bug-line', color: 'accent', specs: 'A3 paysage, swimlane, 4 acteurs', elements: ['Détection', 'Analyse', 'Confinement', 'Éradication', 'Récupération', 'Post-mortem'] },
  { id: 'INF-010', title: 'Carte d\'Expansion UEMOA-CEMAC', category: 'Gouvernance', useCase: 'Visualiser l\'empreinte géographique KHEPRA EXPERTS', icon: 'ri-earth-line', color: 'primary', specs: 'A3 paysage, carte Afrique, points chauds, données', elements: ['Pays UEMOA', 'Pays CEMAC', 'Bureaux', 'Missions', 'Partenaires', 'Agréments'] },
  { id: 'INF-011', title: 'Écosystème Fintech UEMOA 2026', category: 'Risques', useCase: 'Cartographier l\'écosystème fintech et les voies d\'agrément', icon: 'ri-smartphone-line', color: 'accent', specs: 'A3 paysage, diagramme, 3 voies, acteurs clés', elements: ['Voie 1 — Paiement', 'Voie 2 — Monnaie Électronique', 'Voie 3 — Sandbox', 'Acteurs', 'Segments'] },
  { id: 'INF-012', title: 'Calendrier Fiscalité & Reporting UEMOA 2026', category: 'Conformité', useCase: 'Échéancier visuel des obligations fiscales et reporting', icon: 'ri-calendar-check-line', color: 'secondary', specs: 'A4 paysage, timeline mensuelle, icônes, 12 jalons', elements: ['SURFI', 'DECLARATION', 'CERTIFICATION', 'CONSOLIDATION', 'EReporting', 'États financiers'] },
];

// --- SOCIAL MEDIA VISUALS ---
export interface SocialVisual {
  id: string;
  title: string;
  type: 'carrousel' | 'linkedin_post' | 'banniere';
  category: string;
  icon: string;
  color: string;
  specs: string;
  slides?: number;
  useCase: string;
}

export const SOCIAL_VISUALS: SocialVisual[] = [
  { id: 'SOC-001', title: 'Carrousel — 5 Changements GAFI 2026', type: 'carrousel', category: 'Conformité', icon: 'ri-gallery-line', color: 'secondary', specs: '1080×1080, 5 slides, typographie KHEPRA', slides: 5, useCase: 'LinkedIn Carrousel éducatif sur les 5 changements GAFI' },
  { id: 'SOC-002', title: 'Carrousel — Les 7 Piliers Gouvernance SFD', type: 'carrousel', category: 'Gouvernance', icon: 'ri-gallery-line', color: 'primary', specs: '1080×1080, 8 slides (intro + 7 piliers)', slides: 8, useCase: 'Formation gouvernance pour DG SFD, publication LinkedIn premium' },
  { id: 'SOC-003', title: 'Carrousel — Ratio Solvabilité UEMOA 2026', type: 'carrousel', category: 'Risques', icon: 'ri-gallery-line', color: 'accent', specs: '1080×1080, 4 slides, data visualization', slides: 4, useCase: 'Annonce décision BCEAO + guide pratique' },
  { id: 'SOC-004', title: 'Post Statique — Citation Expert ESG', type: 'linkedin_post', category: 'Gouvernance', icon: 'ri-image-line', color: 'primary', specs: '1200×627, portrait expert, citation encadrée', useCase: 'Citation visuelle d\'expert pour engagement LinkedIn' },
  { id: 'SOC-005', title: 'Post Statique — Chiffre Clé Conformité', type: 'linkedin_post', category: 'Conformité', icon: 'ri-image-line', color: 'secondary', specs: '1200×627, gros chiffre, icône, source', useCase: 'Post d\'autorité LinkedIn avec statistique impactante' },
  { id: 'SOC-006', title: 'Bannière — Événement Webinar KHEPRA', type: 'banniere', category: 'Gouvernance', icon: 'ri-layout-masonry-line', color: 'primary', specs: '1600×900, typo, logo, date, CTA', useCase: 'Bannière LinkedIn/Facebook/Twitter pour webinaires et événements' },
  { id: 'SOC-007', title: 'Carrousel — Cybersécurité COBAC 2027', type: 'carrousel', category: 'Audit', icon: 'ri-gallery-line', color: 'accent', specs: '1080×1080, 5 slides, infographie technique', slides: 5, useCase: 'Sensibilisation cybersécurité pour DSI/RSSI' },
  { id: 'SOC-008', title: 'Post Statique — Infographie Macro Key Figures', type: 'linkedin_post', category: 'Risques', icon: 'ri-image-line', color: 'primary', specs: '1200×627, data viz, indicateurs', useCase: 'Post d\'autorité économique UEMOA/CEMAC' },
  { id: 'SOC-009', title: 'Carrousel — Préparer Évaluation Mutuelle GIABA', type: 'carrousel', category: 'Conformité', icon: 'ri-gallery-line', color: 'secondary', specs: '1080×1080, 6 slides, roadmap', slides: 6, useCase: 'Guide pratique pour les CCO' },
  { id: 'SOC-010', title: 'Bannière — KOS Interview Factory', type: 'banniere', category: 'Gouvernance', icon: 'ri-layout-masonry-line', color: 'primary', specs: '1600×900, visuel interview, experts silhouettes', useCase: 'Promotion des interviews d\'experts KHEPRA' },
];

// --- YOUTUBE THUMBNAILS ---
export interface YoutubeThumbnail {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  specs: string;
  style: string;
  elements: string[];
}

export const YOUTUBE_THUMBNAILS: YoutubeThumbnail[] = [
  { id: 'THB-001', title: 'Miniature — Réforme Ratio Solvabilité', category: 'Risques', icon: 'ri-youtube-line', color: 'primary', specs: '1280×720, JPG, < 2MB', style: 'Style institutionnel KHEPRA — fond sombre, texte blanc, icône rouge', elements: ['Titre accrocheur', 'Visage expert', 'Logo KHEPRA', 'Chiffre clé'] },
  { id: 'THB-002', title: 'Miniature — GAFI 2026 Décryptage', category: 'Conformité', icon: 'ri-youtube-line', color: 'secondary', specs: '1280×720, JPG, < 2MB', style: 'Style alerte — fond rouge/bleu marine, texte jaune', elements: ['ALERTE GAFI', '5 changements', 'Logo KHEPRA', 'Photo expert'] },
  { id: 'THB-003', title: 'Miniature — Cybersécurité COBAC', category: 'Audit', icon: 'ri-youtube-line', color: 'accent', specs: '1280×720, JPG, < 2MB', style: 'Style tech — fond code binaire, vert matrice, texte blanc', elements: ['CYBERSÉCURITÉ', 'COBAC 2027', 'Checklist', 'Logo KHEPRA'] },
  { id: 'THB-004', title: 'Miniature — ESG & Finance Durable', category: 'Gouvernance', icon: 'ri-youtube-line', color: 'primary', specs: '1280×720, JPG, < 2MB', style: 'Style nature — fond vert forêt, feuilles, texte blanc', elements: ['ESG ISSB', 'Guide Pratique', 'Bilan Carbone', 'Logo KHEPRA'] },
  { id: 'THB-005', title: 'Miniature — Interview Président du Conseil', category: 'Gouvernance', icon: 'ri-youtube-line', color: 'accent', specs: '1280×720, JPG, < 2MB', style: 'Style interview — fond studio, 2 fauteuils, éclairage pro', elements: ['INTERVIEW', 'PCA', 'Gouvernance', 'Logo KHEPRA'] },
  { id: 'THB-006', title: 'Miniature — Levée de Fonds Banque', category: 'Risques', icon: 'ri-youtube-line', color: 'primary', specs: '1280×720, JPG, < 2MB', style: 'Style finance — fond bleu, graphiques montants, flèche verte', elements: ['LEVÉE FONDS', '10Mds FCFA', 'Guide', 'Logo KHEPRA'] },
  { id: 'THB-007', title: 'Miniature — Table Ronde Gouvernance', category: 'Gouvernance', icon: 'ri-youtube-line', color: 'secondary', specs: '1280×720, JPG, < 2MB', style: 'Style table ronde — fond bureau, 3 silhouettes, lumière chaude', elements: ['TABLE RONDE', 'PCA + DG + CAE', 'Gouvernance', 'Logo KHEPRA'] },
  { id: 'THB-008', title: 'Miniature — Fintech UEMOA 2026', category: 'Risques', icon: 'ri-youtube-line', color: 'accent', specs: '1280×720, JPG, < 2MB', style: 'Style innovation — fond gradient, icône smartphone, texte blanc', elements: ['FINTECH', 'UEMOA 2026', '3 Voies', 'Logo KHEPRA'] },
];

// --- VISUAL REPORTS ---
export interface VisualReport {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  pages: number;
  description: string;
  sections: string[];
}

export const VISUAL_REPORTS: VisualReport[] = [
  { id: 'REP-001', title: 'Rapport Annuel Gouvernance — Modèle Conseil d\'Administration', category: 'Gouvernance', icon: 'ri-file-chart-line', color: 'primary', pages: 45, description: 'Template complet pour le rapport annuel de gouvernance présenté au CA. Inclut évaluation du CA, comités, conflits d\'intérêts, rémunérations, plan de succession.', sections: ['Introduction DG', 'Composition CA', 'Activités CA', 'Comités spécialisés', 'Évaluation CA', 'Conflits intérêts', 'Rémunération', 'Plan succession', 'Perspectives'] },
  { id: 'REP-002', title: 'Rapport d\'Audit Interne — Trimestriel Comité d\'Audit', category: 'Audit', icon: 'ri-file-chart-line', color: 'accent', pages: 35, description: 'Template de rapport trimestriel d\'audit interne pour le Comité d\'Audit. Synthèse des missions, constats, recommandations, suivi.', sections: ['Synthèse exécutive', 'Missions réalisées', 'Constats par processus', 'Recommandations', 'Suivi plans action', 'Indicateurs clés', 'Planification trimestre suivant'] },
  { id: 'REP-003', title: 'Rapport Conformité LCB/FT — Annuel CENTIF', category: 'Conformité', icon: 'ri-file-chart-line', color: 'secondary', pages: 40, description: 'Template de rapport annuel LCB/FT destiné à la CENTIF et au régulateur. Inclut statistiques, cartographie des risques, formations.', sections: ['Périmètre', 'Gouvernance LCB/FT', 'KYC/Customer Due Diligence', 'Surveillance transactions', 'Déclarations soupçon', 'Formation', 'Audit externe', 'Plan amélioration'] },
  { id: 'REP-004', title: 'Dashboard Risques — COMEX Mensuel', category: 'Risques', icon: 'ri-file-chart-line', color: 'primary', pages: 15, description: 'Template de dashboard mensuel des risques pour le COMEX. Vue synthétique des principaux risques, seuils, tendances.', sections: ['Vue d\'ensemble', 'Risque crédit', 'Risque marché', 'Risque liquidité', 'Risque opérationnel', 'Indicateurs avancés', 'Plan d\'action'] },
  { id: 'REP-005', title: 'Rapport ESG Annuel — ISSB Compliant', category: 'Gouvernance', icon: 'ri-file-chart-line', color: 'accent', pages: 55, description: 'Template de rapport ESG conforme aux standards ISSB IFRS S1/S2. Pour banques et institutions financières.', sections: ['Gouvernance ESG', 'Stratégie climat', 'Gestion risques ESG', 'Métriques scope 1-2-3', 'Cibles et trajectoire', 'Assurance externe', 'Annexes PCAF'] },
  { id: 'REP-006', title: 'Rapport Stress Test — Pilier 2 BCEAO', category: 'Risques', icon: 'ri-file-chart-line', color: 'secondary', pages: 30, description: 'Template de rapport de stress test pour soumission à la BCEAO. Scénarios, hypothèses, résultats, plan de contingence.', sections: ['Scénarios', 'Hypothèses', 'Méthodologie', 'Impact solvabilité', 'Impact liquidité', 'Sensibilités', 'Plan contingence'] },
  { id: 'REP-007', title: 'Rapport Cartographie des Risques — Annuel CA', category: 'Audit', icon: 'ri-file-chart-line', color: 'primary', pages: 50, description: 'Template complet de cartographie des risques pour présentation annuelle au CA. Inclut risk appetite, heat maps, plans de mitigation.', sections: ['Risk Appetite', 'Top Risks', 'Heat Maps', 'Risk Assessment', 'Mitigation Plans', 'Emerging Risks', 'Risk Culture'] },
  { id: 'REP-008', title: 'Dossier d\'Agrément — Établissement de Paiement', category: 'Conformité', icon: 'ri-file-chart-line', color: 'accent', pages: 120, description: 'Template complet de dossier d\'agrément pour établissement de paiement UEMOA. Structuré selon les exigences BCEAO.', sections: ['Lettre demande', 'Statuts', 'Business Plan', 'Actionnariat', 'Gouvernance', 'Programme activité', 'Moyens techniques', 'Plan continuité', 'Conformité'] },
];

// --- KPIs ---
export interface CanvaFactoryKPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  history: { month: string; value: number }[];
}

export const CANVA_FACTORY_KPIS: CanvaFactoryKPI[] = [
  { id: 'templates_total', name: 'Templates Totaux', current: 400, target: 400, unit: '', icon: 'ri-stack-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 100 }, { month: 'Mai', value: 250 }, { month: 'Juin', value: 400 }],
  },
  { id: 'infographics', name: 'Infographies', current: 12, target: 50, unit: '', icon: 'ri-bar-chart-2-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 5 }, { month: 'Juin', value: 12 }],
  },
  { id: 'social', name: 'Visuels Réseaux Sociaux', current: 10, target: 100, unit: '', icon: 'ri-share-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 10 }],
  },
  { id: 'thumbnails', name: 'Miniatures YouTube', current: 8, target: 100, unit: '', icon: 'ri-youtube-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 8 }],
  },
  { id: 'reports', name: 'Rapports Visuels', current: 8, target: 50, unit: '', icon: 'ri-file-chart-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 8 }],
  },
  { id: 'brand_consistency', name: 'Cohérence Visuelle', current: 95, target: 100, unit: '%', icon: 'ri-palette-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 95 }],
  },
];

export const CANVA_FACTORY_STATS = {
  totalTemplates: 400,
  totalInfographics: 12,
  totalSocialVisuals: 10,
  totalThumbnails: 8,
  totalReports: 8,
  brandConsistency: 95,
  maturityScore: 65,
  targetMaturity: 95,
  standardLevel: 'Cabinet de Conseil International — Standard Big Four',
  engineVersion: 'v1.0 — Graphic Design Industrialization',
};





