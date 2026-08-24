// ============================================================
// KOS ENTERPRISE TRANSFORMATION ASSESSMENT 360°
// Audit Integral KHEPRA EXPERTS & KOS
// Referentiels: ISO 9001, ISO 27001, ISO 31000, COSO ERM, COBIT,
//   ITIL, NIST CSF, TOGAF, PMBOK, BABOK, OWASP ASVS,
//   OHADA, BCEAO, COBAC, CIMA, IFC PS, ISSB, GRI
// Version 2026.06.26 — EXECUTION LIVE
// ============================================================

export interface AuditCriterion {
  id: string;
  critere: string;
  score: number;
  maturite: number;
  observation: string;
  action: string;
}

export interface AuditAction {
  id: string;
  action: string;
  description: string;
  priorite: 'P0' | 'P1' | 'P2';
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  deadline: string;
}

export interface AuditAxe {
  id: string;
  numero: number;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  description: string;
  score_actuel: number;
  score_cible: number;
  ecart: number;
  maturite: number;
  standard_reference: string;
  gap_analysis: string;
  criteres: AuditCriterion[];
  actions: AuditAction[];
  kpis: { nom: string; valeur: number; cible: number; unite: string }[];
}

export interface SWOTItem {
  id: string;
  contenu: string;
  impact: number;
}

export interface PESTELItem {
  id: string;
  facteur: string;
  contenu: string;
  impact: number;
  horizon: string;
}

export interface AuditRiskItem {
  id: string;
  axe: string;
  risque: string;
  probabilite: number;
  impact: number;
  score: number;
  mitigation: string;
  statut: 'actif' | 'mitige' | 'resolu';
  criticite: 'critique' | 'eleve' | 'modere' | 'faible';
}

export interface AuditRoadmapPhase {
  phase: string;
  periode: string;
  description: string;
  actions: { action: string; axe: string; kpi: string }[];
  score_projete: number;
}

export interface ExecutiveReport {
  score_global: number;
  score_cible: number;
  ecart_global: number;
  axes_en_excellence: number;
  axes_surveillance: number;
  axes_action: number;
  axes_critique: number;
  certification: string;
  recommandations: string[];
  trajectoire: string;
  budget_total: string;
  roi_projete: string;
  duree_transformation: string;
}

// ===== SWOT =====
export const SWOT_FORCES: SWOTItem[] = [
  { id: 'S1', contenu: 'Positionnement unique : seul cabinet africain francophone couvrant simultanément UEMOA + CEMAC + OHADA + GAFI avec profondeur Big Four', impact: 95 },
  { id: 'S2', contenu: 'KOS : Knowledge Operating System propriétaire avec 260+ agents IA, 2 847 fichiers, 412K lignes de code — barrière à l\'entrée massive', impact: 98 },
  { id: 'S3', contenu: 'Capital intellectuel : 7 baromètres propriétaires, 100K+ documents réglementaires, 417 textes suivis, 8 autorités surveillées', impact: 90 },
  { id: 'S4', contenu: 'Équipe multidisciplinaire couvrant régulation, due diligence, prix de transfert, ESG, gouvernance — offre intégrée rare', impact: 85 },
  { id: 'S5', contenu: 'Production intellectuelle : 100+ articles, 50+ études sectorielles, thought leadership reconnu par les régulateurs', impact: 88 },
  { id: 'S6', contenu: 'Agilité vs Big Four : cycles décisionnels courts, adaptation rapide aux évolutions réglementaires, innovation continue', impact: 82 },
];
export const SWOT_FAIBLESSES: SWOTItem[] = [
  { id: 'W1', contenu: 'Pipeline commercial concentré (12 deals) — dépendance excessive à 3-4 gros clients, risque de concentration', impact: 88 },
  { id: 'W2', contenu: 'Absence de certifications internationales formelles (ISO 27001, ISO 9001, SOC 2) — frein à la crédibilité institutionnelle', impact: 92 },
  { id: 'W3', contenu: 'Taille d\'équipe limitée (vs Big Four) — scalabilité contrainte sur les grands appels d\'offres multi-pays', impact: 78 },
  { id: 'W4', contenu: 'Core Web Vitals mobile à 82% — performance web en-dessous du standard Google « Good », impact SEO', impact: 72 },
  { id: 'W5', contenu: 'Couverture CEMAC/COBAC à 94% vs 98% UEMOA/BCEAO — asymétrie réglementaire', impact: 80 },
  { id: 'W6', contenu: 'Absence de publications peer-reviewed — crédibilité académique limitée, H-Index institutionnel de 18', impact: 85 },
];
export const SWOT_OPPORTUNITES: SWOTItem[] = [
  { id: 'O1', contenu: 'Adoption massive de l\'IA dans le secteur financier africain — opportunité de positionnement « AI Governance for African Finance »', impact: 95 },
  { id: 'O2', contenu: 'Renforcement réglementaire post-crise : nouvelles exigences BCEAO/COBAC 2026-2027 — demande ×3 pour services conformité', impact: 90 },
  { id: 'O3', contenu: 'Marché ESG africain en émergence : ISSB, taxonomie verte, reporting durabilité — nouveau segment à forte croissance', impact: 88 },
  { id: 'O4', contenu: 'Digitalisation des SFD : 450+ SFD UEMOA en transition numérique obligatoire — besoin massif de conseil', impact: 85 },
  { id: 'O5', contenu: 'Expansion géographique : CEMAC, Ghana, Nigeria, Kenya — marchés anglophones sous-servis en régulation francophone', impact: 92 },
  { id: 'O6', contenu: 'Partenariats Big Four : position de sous-traitant spécialisé pour les cabinets n\'ayant pas l\'expertise UEMOA/CEMAC', impact: 80 },
];
export const SWOT_MENACES: SWOTItem[] = [
  { id: 'T1', contenu: 'Entrée des Big Four sur le segment PME/SFD — pricing agressif, effet de marque, menace directe sur le cœur de marché', impact: 90 },
  { id: 'T2', contenu: 'Plateformes IA génératives (ChatGPT, Claude, Gemini) proposant du conseil réglementaire automatisé gratuit — disruption du modèle', impact: 85 },
  { id: 'T3', contenu: 'Instabilité politique dans certains pays CEMAC — risque d\'interruption de missions, non-paiement, insécurité', impact: 75 },
  { id: 'T4', contenu: 'Fuite des talents vers Big Four et institutions internationales — guerre des talents, pression salariale', impact: 82 },
  { id: 'T5', contenu: 'Évolution rapide des standards techniques (IA, cybersécurité) — risque d\'obsolescence si sous-investissement', impact: 78 },
  { id: 'T6', contenu: 'Concurrence des cabinets locaux à bas coût sur les missions simples — pression sur les marges', impact: 65 },
];

// ===== PESTEL =====
export const PESTEL_ITEMS: PESTELItem[] = [
  { id: 'P1', facteur: 'Politique', contenu: 'Stabilité relative UEMOA vs instabilité CEMAC — opportunité de positionnement « conseil en résilience institutionnelle »', impact: 78, horizon: '12-24 mois' },
  { id: 'P2', facteur: 'Politique', contenu: 'Volonté politique d\'harmonisation réglementaire africaine (ZLECAF, PAS) — catalyseur pour services multi-juridictionnels', impact: 85, horizon: '24-36 mois' },
  { id: 'E1', facteur: 'Économique', contenu: 'Croissance PIB UEMOA 5.8% (2026) — environnement favorable à l\'investissement en conformité et due diligence', impact: 82, horizon: '12 mois' },
  { id: 'E2', facteur: 'Économique', contenu: 'Pression sur les marges des SFD — besoin accru d\'optimisation réglementaire et de conseil stratégique', impact: 75, horizon: '6-12 mois' },
  { id: 'E3', facteur: 'Économique', contenu: 'Taux de change FCFA/EUR stable — prévisibilité pour les contrats long terme, avantage vs pays à devise volatile', impact: 70, horizon: '24 mois' },
  { id: 'S1', facteur: 'Social', contenu: 'Émergence d\'une classe moyenne africaine exigeante en transparence — pression positive sur la gouvernance d\'entreprise', impact: 72, horizon: '24-36 mois' },
  { id: 'S2', facteur: 'Social', contenu: 'Brain drain des talents africains — défi de rétention mais opportunité de positionnement « employeur de choix »', impact: 80, horizon: '12 mois' },
  { id: 'T1', facteur: 'Technologique', contenu: 'Démocratisation de l\'IA générative — opportunité KOS comme plateforme, menace des solutions gratuites', impact: 95, horizon: '6-12 mois' },
  { id: 'T2', facteur: 'Technologique', contenu: 'Adoption rapide du cloud en Afrique — infrastructure scalable, coûts réduits, meilleure résilience', impact: 85, horizon: '12 mois' },
  { id: 'T3', facteur: 'Technologique', contenu: 'Cybersécurité : multiplication des APT ciblant les institutions financières africaines — besoin de services spécialisés', impact: 88, horizon: '6-18 mois' },
  { id: 'E4', facteur: 'Environnemental', contenu: 'Pression ISSB/IFRS S1-S2 sur le reporting ESG — opportunité de services ESG pour banques et SFD', impact: 78, horizon: '12-24 mois' },
  { id: 'E5', facteur: 'Environnemental', contenu: 'Risques climatiques en Afrique de l\'Ouest (inondations, sécheresses) — impact sur l\'évaluation des risques portefeuille', impact: 68, horizon: '24-36 mois' },
  { id: 'L1', facteur: 'Légal', contenu: 'Nouvelles circulaires BCEAO/COBAC 2026-2027 — augmentation de la charge réglementaire, opportunité de conseil', impact: 92, horizon: '6-12 mois' },
  { id: 'L2', facteur: 'Légal', contenu: 'Renforcement LCB/FT : GAFI évaluation mutuelle UEMOA 2027 — préparation nécessaire pour tous les SFD', impact: 90, horizon: '12-18 mois' },
];

// ===== 20 AXES D'AUDIT =====
export const AXES_AUDIT: AuditAxe[] = [
  // === AXE 1 ===
  {
    id: 'axe-01-vision',
    numero: 1,
    nom: 'Vision, Stratégie & Gouvernance',
    acronyme: 'VSG',
    icon: 'ri-eye-line',
    couleur: 'primary',
    description: 'Évaluation de la vision stratégique, proposition de valeur, gouvernance, comités, gestion des décisions, portefeuille stratégique et alignement mission-offres-marchés.',
    score_actuel: 88,
    score_cible: 97,
    ecart: 9,
    maturite: 4,
    standard_reference: 'ISO 37000:2021 · COSO 2013 · Circulaire BCEAO 01-2017/CB · Code OHADA AUSCGIE · UK Corporate Governance Code',
    gap_analysis: 'Vision claire et bien articulée mais documentation stratégique insuffisamment formalisée. Le Strategic Plan n\'est pas décliné en OKRs mesurables par BU. Le Comité Stratégique se réunit mensuellement mais sans procès-verbaux structurés exploitables par KOS. La proposition de valeur « One-Stop Shop Réglementaire Africain » est pertinente mais insuffisamment déclinée en messages segmentés par persona.',
    criteres: [
      { id: 'VSG-C01', critere: 'Vision stratégique documentée et communiquée', score: 85, maturite: 4, observation: 'Vision articulée dans KHEPRA Constitution mais pas de Strategy Map visuelle', action: 'Créer Strategy Map + Balanced Scorecard' },
      { id: 'VSG-C02', critere: 'Proposition de valeur différenciée', score: 90, maturite: 4, observation: 'Positionnement clair mais messages non segmentés', action: 'Décliner en 5 personas + value props' },
      { id: 'VSG-C03', critere: 'Structure de gouvernance formalisée', score: 82, maturite: 3, observation: 'Comités existent mais mandats non documentés', action: 'Formaliser chartes de comités' },
      { id: 'VSG-C04', critere: 'Processus de décision documenté', score: 78, maturite: 3, observation: 'Décisions prises en réunion sans traçabilité systématique', action: 'Implémenter decision log dans KOS' },
      { id: 'VSG-C05', critere: 'Gestion du portefeuille stratégique', score: 85, maturite: 4, observation: '4 BUs bien définies mais pas de revue trimestrielle de portefeuille', action: 'Instaurer Portfolio Review Q' },
      { id: 'VSG-C06', critere: 'Alignement mission-offres-marchés', score: 92, maturite: 4, observation: 'Forte cohérence mais expansion CEMAC non encore reflétée', action: 'Mettre à jour mission avec volet panafricain' },
    ],
    actions: [
      { id: 'VSG-A01', action: 'Déployer OKRs par BU avec dashboard KOS', description: 'Créer un système d\'OKRs (Objectives & Key Results) pour chaque BU, lié au Strategic Plan, avec dashboard de suivi dans KOS Enterprise Control Tower.', priorite: 'P1', effort: '24h', budget: '3 500 000 FCFA', responsable: 'Managing Partner + COO', kpi: '100% BUs avec OKRs trimestriels', deadline: '2026-08-31' },
      { id: 'VSG-A02', action: 'Formaliser chartes des 5 comités', description: 'Rédiger et faire adopter les chartes des Comités : Stratégique, Audit, Risques, Innovation, Rémunération.', priorite: 'P1', effort: '16h', budget: '1 200 000 FCFA', responsable: 'Managing Partner', kpi: '5 chartes adoptées par le COMEX', deadline: '2026-09-30' },
      { id: 'VSG-A03', action: 'Créer Strategy Map visuelle + Balanced Scorecard', description: 'Développer une Strategy Map visuelle (4 perspectives BSC) intégrée dans KOS avec KPIs liés automatiquement.', priorite: 'P2', effort: '32h', budget: '4 800 000 FCFA', responsable: 'CTO + COO', kpi: 'Strategy Map live dans KOS', deadline: '2026-10-31' },
    ],
    kpis: [
      { nom: 'Clarté stratégique (score enquête interne)', valeur: 82, cible: 95, unite: '%' },
      { nom: 'OKRs déployés par BU', valeur: 0, cible: 4, unite: 'BUs' },
      { nom: 'Comités avec charte', valeur: 1, cible: 5, unite: 'comités' },
      { nom: 'Décisions tracées', valeur: 35, cible: 100, unite: '%' },
    ],
  },

  // === AXE 2 ===
  {
    id: 'axe-02-business-model',
    numero: 2,
    nom: 'Business Model',
    acronyme: 'BMD',
    icon: 'ri-funds-box-line',
    couleur: 'accent',
    description: 'Analyse du Business Model Canvas, revenus, marges, récurrence, diversification, rentabilité, valeur client. Évaluation CAC, LTV, ARR, MRR, taux de conversion et marge par offre.',
    score_actuel: 76,
    score_cible: 94,
    ecart: 18,
    maturite: 3,
    standard_reference: 'Business Model Canvas (Osterwalder) · SaaS Metrics Standards · Big Four Partnership Model · McKinsey Revenue Excellence',
    gap_analysis: 'Le business model repose sur un mix consulting + SaaS mais la part récurrente (KOS platform, abonnements) ne représente que 15% du CA vs 40% cible. Le CAC est maîtrisé (12M FCFA) mais le LTV (185M) pourrait être amélioré par du cross-sell systématique. Seulement 2 offres sur 8 ont une marge > 65%. La diversification géographique est insuffisante : 78% du CA provient de l\'UEMOA.',
    criteres: [
      { id: 'BMD-C01', critere: 'Business Model Canvas formalisé', score: 75, maturite: 3, observation: 'Existe implicitement mais pas documenté formellement', action: 'Formaliser et réviser BMC trimestriellement' },
      { id: 'BMD-C02', critere: 'Récurrence des revenus', score: 45, maturite: 2, observation: '15% de revenus récurrents — insuffisant, objectif 40%', action: 'Développer offres abonnement KOS' },
      { id: 'BMD-C03', critere: 'Diversification géographique', score: 58, maturite: 2, observation: '78% CA UEMOA — trop concentré', action: 'Plan expansion CEMAC + anglophone' },
      { id: 'BMD-C04', critere: 'Rentabilité par offre', score: 68, maturite: 3, observation: '2/8 offres > 65% marge — benchmark Big Four : 6/8', action: 'Optimiser pricing + automatisation' },
      { id: 'BMD-C05', critere: 'Métriques SaaS (ARR/MRR/CAC/LTV)', score: 55, maturite: 2, observation: 'Métriques suivies manuellement, pas de dashboard live', action: 'Dashboard SaaS metrics dans KOS' },
      { id: 'BMD-C06', critere: 'Valeur client mesurée (NPS, CSAT)', score: 62, maturite: 3, observation: 'NPS mesuré 1×/an — insuffisant pour pilotage', action: 'NPS trimestriel + CSAT post-mission' },
    ],
    actions: [
      { id: 'BMD-A01', action: 'Lancer offre SaaS KOS Platform (abonnement)', description: 'Créer une offre d\'abonnement KOS Platform pour les SFD et banques : accès base réglementaire, alertes, dashboards. Pricing : 2.5M-8M FCFA/mois selon taille.', priorite: 'P0', effort: '120h', budget: '18 000 000 FCFA', responsable: 'CTO + Growth Director', kpi: '10 clients abonnement d\'ici 12 mois, +25% CA récurrent', deadline: '2026-12-31' },
      { id: 'BMD-A02', action: 'Ouvrir bureau CEMAC (Douala)', description: 'Établir une présence physique à Douala avec 1 Director + 2 Consultants. Cible : 15% du CA depuis la zone CEMAC en 18 mois.', priorite: 'P0', effort: '160h', budget: '35 000 000 FCFA', responsable: 'Managing Partner', kpi: 'Bureau opérationnel, 5 clients CEMAC actifs', deadline: '2027-03-31' },
      { id: 'BMD-A03', action: 'Dashboard SaaS metrics live dans KOS', description: 'Intégrer un dashboard ARR/MRR/CAC/LTV/NPS temps réel dans KOS Enterprise Control Tower.', priorite: 'P1', effort: '40h', budget: '6 000 000 FCFA', responsable: 'CTO', kpi: 'Dashboard live avec mise à jour quotidienne', deadline: '2026-09-30' },
    ],
    kpis: [
      { nom: 'Part revenus récurrents', valeur: 15, cible: 40, unite: '%' },
      { nom: 'Diversification géographique', valeur: 78, cible: 55, unite: '% UEMOA' },
      { nom: 'Offres marge > 65%', valeur: 2, cible: 6, unite: 'offres' },
      { nom: 'NPS moyen', valeur: 42, cible: 65, unite: 'pts' },
    ],
  },

  // === AXE 3 ===
  {
    id: 'axe-03-portefeuille',
    numero: 3,
    nom: 'Portefeuille d\'Offres',
    acronyme: 'POF',
    icon: 'ri-stack-line',
    couleur: 'secondary',
    description: 'Audit complet de chaque offre : attractivité, rentabilité, automatisation, scalabilité, différenciation, valeur perçue, niveau Big Four, potentiel IA.',
    score_actuel: 72,
    score_cible: 93,
    ecart: 21,
    maturite: 3,
    standard_reference: 'McKinsey Product Portfolio Matrix · BCG Growth-Share · Big Four Service Line Standards · KPMG Service Portfolio Framework',
    gap_analysis: 'Le portefeuille de 8 offres est pertinent mais très déséquilibré. 3 offres (Due Diligence, Conformité BCEAO, Prix de Transfert) génèrent 72% du CA. 2 offres sont déficitaires (Formation, Diagnostic Flash). Aucune offre n\'a un score d\'automatisation > 60%, ce qui limite la scalabilité. Le potentiel IA est sous-exploité : 0 offre avec module IA intégré versus 5 offres avec potentiel identifié.',
    criteres: [
      { id: 'POF-C01', critere: 'Couverture complète de la chaîne de valeur', score: 85, maturite: 4, observation: 'Couverture régulation→due diligence→ESG→gouvernance quasi complète', action: 'Ajouter offre IA Governance' },
      { id: 'POF-C02', critere: 'Attractivité marché de chaque offre', score: 78, maturite: 3, observation: '3/8 offres en forte croissance, 2/8 en déclin', action: 'Revitaliser ou abandonner offres faibles' },
      { id: 'POF-C03', critere: 'Niveau d\'automatisation', score: 42, maturite: 2, observation: 'Score moyen 38% — très en dessous du seuil Big Four 70%', action: 'Programme d\'automatisation des livrables' },
      { id: 'POF-C04', critere: 'Scalabilité', score: 55, maturite: 2, observation: 'Offres consulting peu scalables — dépendance aux experts', action: 'Produitiser les offres à fort potentiel' },
      { id: 'POF-C05', critere: 'Potentiel IA intégré', score: 25, maturite: 1, observation: 'Aucune offre avec IA intégrée — énorme gap vs Big Four', action: 'Roadmap IA par offre sur 12 mois' },
      { id: 'POF-C06', critere: 'Valeur perçue / pricing power', score: 72, maturite: 3, observation: 'TJM compétitifs mais pas premium — marge d\'amélioration', action: 'Refonte pricing basée valeur' },
    ],
    actions: [
      { id: 'POF-A01', action: 'Lancer offre IA Governance for Finance', description: 'Créer une 9ème offre : audit et conseil en gouvernance IA pour banques/SFD (ISO 42001, EU AI Act, BCEAO guidelines).', priorite: 'P0', effort: '80h', budget: '12 000 000 FCFA', responsable: 'CTO + BU1 Director', kpi: 'Offre lancée, 3 mandats en 6 mois', deadline: '2026-10-31' },
      { id: 'POF-A02', action: 'Automatiser production de 4 offres via KOS', description: 'Industrialiser Due Diligence, Conformité BCEAO, Diagnostic ESG, Prix de Transfert avec KOS Automaton pour automatiser 60% de la production.', priorite: 'P0', effort: '200h', budget: '28 000 000 FCFA', responsable: 'CTO + CQO', kpi: 'Score automatisation 38%→65%, délai livraison -40%', deadline: '2027-03-31' },
      { id: 'POF-A03', action: 'Revitaliser ou externaliser offres faibles', description: 'Décision Go/No-Go sur Formation et Diagnostic Flash : revitaliser avec nouveau pricing ou externaliser vers partenaires.', priorite: 'P1', effort: '24h', budget: '2 000 000 FCFA', responsable: 'Managing Partner', kpi: '0 offre déficitaire d\'ici 6 mois', deadline: '2026-09-30' },
    ],
    kpis: [
      { nom: 'Score automatisation moyen', valeur: 38, cible: 70, unite: '%' },
      { nom: 'Offres avec IA intégrée', valeur: 0, cible: 5, unite: 'offres' },
      { nom: 'Concentration CA top 3', valeur: 72, cible: 50, unite: '%' },
      { nom: 'Offres déficitaires', valeur: 2, cible: 0, unite: 'offres' },
    ],
  },

  // === AXE 4 ===
  {
    id: 'axe-04-marche',
    numero: 4,
    nom: 'Marché & Concurrence',
    acronyme: 'MCO',
    icon: 'ri-bar-chart-2-line',
    couleur: 'accent',
    description: 'Benchmark contre Big Four, cabinets régionaux, cabinets spécialisés, plateformes IA. Comparaison image, innovation, Thought Leadership, pricing, SEO, GEO, publications, lead magnets, influence.',
    score_actuel: 68,
    score_cible: 90,
    ecart: 22,
    maturite: 3,
    standard_reference: 'Porter\'s Five Forces · Competitive Benchmarking Framework · Gartner Magic Quadrant Methodology · Forrester Wave',
    gap_analysis: 'Le positionnement concurrentiel est le plus faible des 20 axes. Face aux Big Four, KHEPRA perd sur 4 des 7 dimensions : taille d\'équipe (1/10 vs 1/1), pricing power (TJM 60% inférieur), couverture géographique (2 pays vs 40+), et reconnaissance de marque. Les atouts sont réels : expertise UEMOA/CEMAC imbattable, rapidité, innovation KOS. Le benchmark révèle que les plateformes IA (ChatGPT, Claude) commencent à mordre sur le segment « conformité de base » — menace sous-estimée.',
    criteres: [
      { id: 'MCO-C01', critere: 'Benchmark Big Four documenté', score: 65, maturite: 3, observation: 'Analyse faite mais pas de dashboard compétitif live', action: 'Competitive Intelligence Dashboard' },
      { id: 'MCO-C02', critere: 'Avantage compétitif documenté', score: 78, maturite: 3, observation: 'Expertise UEMOA/CEMAC reconnue mais insuffisamment marketée', action: 'Campagne thought leadership ciblée' },
      { id: 'MCO-C03', critere: 'Positionnement prix', score: 55, maturite: 2, observation: 'TJM 40% sous Big Four — sous-valorisation manifeste', action: 'Stratégie de montée en gamme progressive' },
      { id: 'MCO-C04', critere: 'Menace plateformes IA', score: 48, maturite: 2, observation: 'Aucune stratégie de réponse à la disruption IA', action: 'Stratégie « IA-augmented consulting »' },
      { id: 'MCO-C05', critere: 'Part de marché estimée', score: 52, maturite: 2, observation: 'Pas de calcul formalisé de part de marché', action: 'Étude de marché annuelle + TAM/SAM/SOM' },
      { id: 'MCO-C06', critere: 'Barrières à l\'entrée', score: 72, maturite: 3, observation: 'KOS + base réglementaire = barrière réelle mais pas communiquée', action: 'Communiquer la barrière KOS dans le marketing' },
    ],
    actions: [
      { id: 'MCO-A01', action: 'Créer Competitive Intelligence Dashboard', description: 'Dashboard live surveillant les Big Four + cabinets régionaux + plateformes IA : pricing, publications, recrutements, nouveaux bureaux, appels d\'offres gagnés.', priorite: 'P1', effort: '56h', budget: '8 000 000 FCFA', responsable: 'Market Intelligence Director', kpi: 'Dashboard live, 50+ signaux suivis', deadline: '2026-10-31' },
      { id: 'MCO-A02', action: 'Stratégie de montée en gamme — TJM +30% en 18 mois', description: 'Plan progressif d\'augmentation des TJM : +10% en 6 mois, +15% supplémentaires en 12 mois, justifié par certifications et notoriété accrue.', priorite: 'P1', effort: '40h', budget: '2 500 000 FCFA', responsable: 'Managing Partner', kpi: 'TJM moyen +30%, 0 perte client due au pricing', deadline: '2027-06-30' },
      { id: 'MCO-A03', action: 'Campagne « IA-Augmented Consulting »', description: 'Positionner KHEPRA comme le leader du conseil augmenté par l\'IA en Afrique : articles, webinars, démonstrations KOS, comparatifs vs IA seule.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'Marketing Director', kpi: '5 publications, 3 webinars, 1 000 leads', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'TJM moyen vs Big Four', valeur: 60, cible: 85, unite: '%' },
      { nom: 'Part de marché estimée UEMOA', valeur: 3.5, cible: 8, unite: '%' },
      { nom: 'Signaux concurrentiels suivis', valeur: 12, cible: 50, unite: 'signaux' },
      { nom: 'Notoriété assistée', valeur: 28, cible: 55, unite: '%' },
    ],
  },

  // === AXE 5 ===
  {
    id: 'axe-05-branding',
    numero: 5,
    nom: 'Branding Institutionnel',
    acronyme: 'BRD',
    icon: 'ri-palette-line',
    couleur: 'secondary',
    description: 'Audit de l\'identité visuelle, cohérence, crédibilité, storytelling, réputation, confiance et perception.',
    score_actuel: 74,
    score_cible: 92,
    ecart: 18,
    maturite: 3,
    standard_reference: 'Brand Equity Model (Aaker) · Interbrand Valuation · ISO 20671 — Brand Evaluation · Keller\'s Brand Resonance',
    gap_analysis: 'L\'identité visuelle est cohérente mais le brand book n\'est pas digitalisé ni accessible à toute l\'équipe. Le storytelling est fort (KHEPRA = mythologie égyptienne + régulation) mais insuffisamment déployé : pas de brand video, pas de manifeste de marque public. La réputation est bonne dans le cercle UEMOA mais quasi inexistante au-delà. Le Trust Center est une excellente initiative mais date de Q1 2026 — contenu à rafraîchir.',
    criteres: [
      { id: 'BRD-C01', critere: 'Identité visuelle cohérente', score: 82, maturite: 4, observation: 'Bonne cohérence mais brand book non digitalisé', action: 'Brand book digital interactif' },
      { id: 'BRD-C02', critere: 'Storytelling de marque', score: 78, maturite: 3, observation: 'Narratif puissant mais supports limités', action: 'Brand video + manifeste public' },
      { id: 'BRD-C03', critere: 'Crédibilité institutionnelle', score: 68, maturite: 3, observation: 'Bonne dans le cercle régulateurs, faible au-delà', action: 'Certifications + témoignages régulateurs' },
      { id: 'BRD-C04', critere: 'Réputation en ligne', score: 65, maturite: 3, observation: 'Peu de reviews Google/LinkedIn — vide réputationnel', action: 'Programme de gestion de la réputation' },
      { id: 'BRD-C05', critere: 'Confiance (signaux de confiance)', score: 72, maturite: 3, observation: 'Trust Center solide mais non promu', action: 'Promouvoir Trust Center + labels' },
      { id: 'BRD-C06', critere: 'Perception externe mesurée', score: 55, maturite: 2, observation: 'Pas d\'étude de perception externe réalisée', action: 'Étude de perception annuelle' },
    ],
    actions: [
      { id: 'BRD-A01', action: 'Créer Brand Video institutionnelle', description: 'Produire une vidéo de marque 3-5 min : storytelling KHEPRA, vision, impact, clients. Diffusion LinkedIn, YouTube, site web.', priorite: 'P1', effort: '80h', budget: '8 500 000 FCFA', responsable: 'Marketing Director', kpi: 'Video produite, 50K vues en 3 mois', deadline: '2026-09-30' },
      { id: 'BRD-A02', action: 'Digital Brand Book interactif', description: 'Créer un brand book digital interactif (composants UI, guidelines, templates) accessible via KOS pour toute l\'équipe.', priorite: 'P1', effort: '40h', budget: '3 000 000 FCFA', responsable: 'Design Lead + CTO', kpi: 'Brand book live, 100% équipe onboarded', deadline: '2026-10-31' },
      { id: 'BRD-A03', action: 'Programme gestion réputation + reviews', description: 'Mettre en place un programme systématique de collecte d\'avis clients (Google, LinkedIn) et de réponse aux commentaires.', priorite: 'P1', effort: '24h', budget: '2 000 000 FCFA', responsable: 'Client Success Manager', kpi: '4.5+ étoiles Google, 25+ reviews', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'Cohérence marque (audit interne)', valeur: 82, cible: 95, unite: '%' },
      { nom: 'Notoriété spontanée UEMOA', valeur: 18, cible: 35, unite: '%' },
      { nom: 'Reviews Google/LinkedIn', valeur: 8, cible: 25, unite: 'reviews' },
      { nom: 'Perception positive (étude)', valeur: 0, cible: 85, unite: '%' },
    ],
  },

  // === AXE 6 ===
  {
    id: 'axe-06-site-web',
    numero: 6,
    nom: 'Site Web khepraexperts.com',
    acronyme: 'WEB',
    icon: 'ri-globe-line',
    couleur: 'primary',
    description: 'Audit complet : architecture, navigation, UX, accessibilité, responsive, design, performance Core Web Vitals, conversion, CTA, formulaires, landing pages, tunnel de vente, prise de rendez-vous.',
    score_actuel: 78,
    score_cible: 95,
    ecart: 17,
    maturite: 3,
    standard_reference: 'Google Core Web Vitals · WCAG 2.1 AA · ISO 9241-210 (UX) · Nielsen Norman UX Heuristics · Baymard Institute',
    gap_analysis: 'Le site a progressé de 15 pts depuis Juin mais reste en-dessous du seuil Big Four. Problèmes majeurs : LCP mobile à 2.4s pour 18% des pages, accessibilité WCAG partiellement conforme (contraste, labels ARIA), tunnel de conversion non mesuré de bout en bout, landing pages régionales sous-optimisées pour le SEO local, pas de A/B testing, formulaires sans progressive profiling.',
    criteres: [
      { id: 'WEB-C01', critere: 'Architecture & navigation', score: 85, maturite: 4, observation: 'Arborescence OK mais méga-menu surchargé', action: 'Simplifier navigation principale' },
      { id: 'WEB-C02', critere: 'UX & parcours utilisateur', score: 78, maturite: 3, observation: 'Parcours fluides mais non testés formellement', action: 'Tests utilisateurs + heatmaps' },
      { id: 'WEB-C03', critere: 'Accessibilité WCAG 2.1 AA', score: 62, maturite: 3, observation: 'Gaps contraste, labels ARIA manquants', action: 'Audit accessibilité complet + correction' },
      { id: 'WEB-C04', critere: 'Core Web Vitals', score: 82, maturite: 4, observation: 'LCP OK sur desktop, 18% pages mobile Poor', action: 'Optimisation images + critical CSS' },
      { id: 'WEB-C05', critere: 'Design & storytelling visuel', score: 88, maturite: 4, observation: 'Design premium mais micro-interactions limitées', action: 'Ajouter animations + transitions' },
      { id: 'WEB-C06', critere: 'Conversion & CTA', score: 68, maturite: 3, observation: 'CTAs présents mais pas de tunnel mesuré', action: 'Tracking conversion complet + A/B testing' },
      { id: 'WEB-C07', critere: 'Landing pages optimisées', score: 72, maturite: 3, observation: '10 landing pages régionales mais SEO local faible', action: 'Optimiser SEO local + contenu localisé' },
    ],
    actions: [
      { id: 'WEB-A01', action: 'Audit WCAG 2.1 AA + corrections', description: 'Audit complet d\'accessibilité avec outil automatisé + tests manuels. Corriger contrastes, labels ARIA, navigation clavier, landmarks.', priorite: 'P1', effort: '60h', budget: '7 500 000 FCFA', responsable: 'Lead Dev Frontend', kpi: 'Score WCAG ≥ 95%, 0 erreur critique', deadline: '2026-09-30' },
      { id: 'WEB-A02', action: 'Tunnel de conversion analytics complet', description: 'Mettre en place le tracking complet du tunnel : landing page → formulaire → lead → MQL → SQL → contrat. Dashboard conversion dans KOS.', priorite: 'P0', effort: '30h', budget: '3 000 000 FCFA', responsable: 'CTO + Growth Director', kpi: 'Tunnel mesuré, taux conversion par étape', deadline: '2026-08-31' },
      { id: 'WEB-A03', action: 'Programme CRO — A/B testing continu', description: 'Déployer outil A/B testing sur les pages critiques (home, landing pages, formulaires). 2 tests/mois minimum.', priorite: 'P1', effort: '40h', budget: '5 000 000 FCFA', responsable: 'Growth Director', kpi: '2 A/B tests/mois, +15% taux conversion', deadline: '2026-11-30' },
    ],
    kpis: [
      { nom: 'Score Core Web Vitals', valeur: 82, cible: 100, unite: '% Good' },
      { nom: 'Score WCAG 2.1 AA', valeur: 62, cible: 95, unite: '%' },
      { nom: 'Taux conversion landing pages', valeur: 2.8, cible: 6, unite: '%' },
      { nom: 'Bounce rate', valeur: 48, cible: 32, unite: '%' },
    ],
  },

  // === AXE 7 ===
  {
    id: 'axe-07-seo-geo',
    numero: 7,
    nom: 'SEO, GEO & LLMO',
    acronyme: 'SGO',
    icon: 'ri-search-line',
    couleur: 'accent',
    description: 'Audit SEO technique, SEO sémantique, E-E-A-T, Schema.org, JSON-LD, Entity SEO, Knowledge Graph, Topical Authority, AI Visibility, GEO, LLM Optimization, citations par IA génératives.',
    score_actuel: 80,
    score_cible: 96,
    ecart: 16,
    maturite: 3,
    standard_reference: 'Google Search Essentials · EEAT Guidelines · Schema.org · GEO Best Practices 2026 · OpenAI GPTBot · Google-Extended',
    gap_analysis: 'Le SEO a progressé (+15 pts) mais le GEO est le maillon faible. Share of Voice IA générative à 38% (cible 50%). 52 featured snippets (cible 150). Copilot à 78% de présence vs 96% ChatGPT. Les citations par Claude et Perplexity sont en croissance mais non optimisées. Le Knowledge Graph est sous-alimenté : seulement 24 entités vs 150+ pour les Big Four. Le Schema.org est à 85% de conformité — les 15% restants sont sur des pages à fort trafic.',
    criteres: [
      { id: 'SGO-C01', critere: 'SEO technique', score: 88, maturite: 4, observation: 'Bon score technique, 14 erreurs Schema.org résiduelles', action: 'Corriger 14 erreurs Schema.org' },
      { id: 'SGO-C02', critere: 'SEO sémantique & EEAT', score: 82, maturite: 4, observation: 'Contenu EEAT aligné mais bios auteurs inégales', action: 'Standardiser pages auteurs + credentials' },
      { id: 'SGO-C03', critere: 'Featured snippets', score: 55, maturite: 2, observation: '52 snippets — très en dessous des 150 cible', action: 'Programme massif d\'optimisation snippets' },
      { id: 'SGO-C04', critere: 'GEO — Share of Voice IA', score: 38, maturite: 2, observation: 'SOV 38% — perte de visibilité sur moteurs IA', action: 'Programme GEO intensif' },
      { id: 'SGO-C05', critere: 'Knowledge Graph & Entity SEO', score: 58, maturite: 2, observation: '24 entités — insuffisant pour Topical Authority', action: 'Construire Knowledge Graph 150+ entités' },
      { id: 'SGO-C06', critere: 'LLM Optimization', score: 62, maturite: 3, observation: 'llms.txt déployé mais contenu OHADA manquant', action: 'Enrichir llms.txt + contenu structuré' },
    ],
    actions: [
      { id: 'SGO-A01', action: 'Programme GEO — SOV 38%→50%', description: '25 000 FAQs additionnelles, 6 pillar pages optimisées multi-moteur, partenariat crawlers IA, contenu structuré FAQ+HowTo+Speakable.', priorite: 'P0', effort: '120h', budget: '6 500 000 FCFA', responsable: 'SEO/GEO Director', kpi: 'SOV 50%, présence 5/5 moteurs ≥ 90%', deadline: '2027-03-31' },
      { id: 'SGO-A02', action: 'Featured snippets 52→150', description: 'Reformuler 100 H2 en questions, générer réponses concises 40-60 mots, déployer FAQ Schema sur 30 pages additionnelles.', priorite: 'P0', effort: '60h', budget: '4 200 000 FCFA', responsable: 'SEO Director + Content Team', kpi: '150 featured snippets, +250% CTR', deadline: '2026-11-30' },
      { id: 'SGO-A03', action: 'Knowledge Graph 150+ entités', description: 'Construire un Knowledge Graph complet couvrant régulation, SFD, banques, conformité — entités liées, propriétés, citations.', priorite: 'P1', effort: '80h', budget: '5 800 000 FCFA', responsable: 'CTO + SEO Director', kpi: '150+ entités, 500+ relations', deadline: '2027-03-31' },
    ],
    kpis: [
      { nom: 'Score SEO Global', valeur: 85, cible: 97, unite: '/100' },
      { nom: 'Share of Voice IA', valeur: 38, cible: 50, unite: '%' },
      { nom: 'Featured Snippets', valeur: 52, cible: 150, unite: 'snippets' },
      { nom: 'Entités Knowledge Graph', valeur: 24, cible: 150, unite: 'entités' },
    ],
  },

  // === AXE 8 ===
  {
    id: 'axe-08-marketing',
    numero: 8,
    nom: 'Marketing Digital',
    acronyme: 'MKT',
    icon: 'ri-megaphone-line',
    couleur: 'primary',
    description: 'Évaluation LinkedIn, YouTube, newsletter, email marketing, social selling, webinars, podcasts, livres blancs, études sectorielles, relations presse.',
    score_actuel: 72,
    score_cible: 91,
    ecart: 19,
    maturite: 3,
    standard_reference: 'HubSpot Marketing Benchmarks · LinkedIn B2B Best Practices · Content Marketing Institute · Forrester B2B Marketing',
    gap_analysis: 'LinkedIn est le canal principal mais le MDP (Marketing Developer Platform) est bloqué depuis 60 jours. La newsletter a 3 800 abonnés (cible 15 000). YouTube : 0 vidéo publiée en 2026. Le podcast et les webinars sont sous-exploités. L\'email marketing n\'a pas de segmentation avancée ni de lead scoring intégré. Les relations presse sont quasi inexistantes. Le social selling n\'est pas outillé (pas de Sales Navigator corporate).',
    criteres: [
      { id: 'MKT-C01', critere: 'LinkedIn — reach & engagement', score: 55, maturite: 2, observation: 'MDP bloqué, 0 posts programmables, reach en chute', action: 'Débloquer MDP + campagne DG' },
      { id: 'MKT-C02', critere: 'Newsletter & email marketing', score: 62, maturite: 3, observation: '3 800 abonnés, pas de segmentation avancée', action: 'Segmentation + lead nurturing automatisé' },
      { id: 'MKT-C03', critere: 'YouTube & contenu vidéo', score: 25, maturite: 1, observation: '0 vidéo en 2026 — chaîne inactive', action: 'Calendrier éditorial vidéo 2/mois' },
      { id: 'MKT-C04', critere: 'Webinars & podcasts', score: 35, maturite: 1, observation: 'Aucun webinar ni podcast en 2026', action: 'Lancer série webinar + podcast' },
      { id: 'MKT-C05', critere: 'Livres blancs & études', score: 78, maturite: 4, observation: 'Production forte mais promotion insuffisante', action: 'Plan promotion multicanal par publication' },
      { id: 'MKT-C06', critere: 'Relations presse', score: 28, maturite: 1, observation: '0 communiqué de presse en 2026', action: 'Plan RP trimestriel + media list' },
    ],
    actions: [
      { id: 'MKT-A01', action: 'Relancer chaîne YouTube — 2 vidéos/mois', description: 'Calendrier éditorial YouTube : interviews régulateurs, explications circulaires, démos KOS. Production 2 vidéos/mois.', priorite: 'P0', effort: '80h/mois', budget: '12 000 000 FCFA/an', responsable: 'Content Director', kpi: '24 vidéos/an, 5 000 abonnés', deadline: '2027-06-30' },
      { id: 'MKT-A02', action: 'Lancer série webinar mensuelle', description: '1 webinar/mois avec invité (régulateur, DG banque, expert Big Four). Plateforme : LinkedIn Live + Zoom. Replay sur YouTube.', priorite: 'P1', effort: '40h/mois', budget: '6 000 000 FCFA/an', responsable: 'Marketing Director', kpi: '12 webinars/an, 200 participants/session', deadline: '2026-12-31' },
      { id: 'MKT-A03', action: 'Email nurturing avancé + segmentation', description: 'Mettre en place 5 séquences de nurturing par persona. Segmenter la base par secteur, pays, maturité. Lead scoring intégré.', priorite: 'P1', effort: '80h', budget: '8 000 000 FCFA', responsable: 'Growth Director', kpi: '15 000 abonnés, taux ouverture > 25%', deadline: '2027-03-31' },
    ],
    kpis: [
      { nom: 'Abonnés LinkedIn (page)', valeur: 4200, cible: 15000, unite: 'abonnés' },
      { nom: 'Abonnés newsletter', valeur: 3800, cible: 15000, unite: 'abonnés' },
      { nom: 'Vidéos YouTube/an', valeur: 0, cible: 24, unite: 'vidéos' },
      { nom: 'Mentions presse/an', valeur: 0, cible: 12, unite: 'mentions' },
    ],
  },

  // === AXE 9 ===
  {
    id: 'axe-09-production',
    numero: 9,
    nom: 'Production Intellectuelle',
    acronyme: 'PIN',
    icon: 'ri-book-open-line',
    couleur: 'secondary',
    description: 'Audit des études, benchmarks, observatoires, rapports, notes stratégiques, diagnostics, matrices, guides, modèles. Notation profondeur, originalité, qualité méthodologique, citations, réutilisabilité.',
    score_actuel: 82,
    score_cible: 95,
    ecart: 13,
    maturite: 4,
    standard_reference: 'Deloitte Research Standards · PwC Strategy& Publications · EY Knowledge · McKinsey Global Institute · Academic Peer Review',
    gap_analysis: 'La production intellectuelle est un point fort (82/100) avec 7 baromètres et 100K+ documents. Cependant : (1) la qualité méthodologique n\'est pas systématiquement documentée (pas de fiche méthodologique standard), (2) la réutilisabilité est faible — les données de recherche ne sont pas structurées en base interrogable, (3) la profondeur des analyses est bonne mais l\'originalité pourrait être renforcée (plus de données primaires, enquêtes terrain).',
    criteres: [
      { id: 'PIN-C01', critere: 'Qualité méthodologique', score: 78, maturite: 3, observation: 'Bon niveau mais méthodologie non standardisée', action: 'Template méthodologique standard' },
      { id: 'PIN-C02', critere: 'Profondeur & originalité', score: 82, maturite: 4, observation: 'Analyses solides, manque données primaires', action: 'Enquêtes terrain + collecte données primaires' },
      { id: 'PIN-C03', critere: 'Citations & référencement', score: 88, maturite: 4, observation: 'Bon taux de citation, manque peer-reviewed', action: 'Programme publication peer-reviewed' },
      { id: 'PIN-C04', critere: 'Réutilisabilité des données', score: 58, maturite: 2, observation: 'Données non structurées en base interrogable', action: 'Research Data Warehouse' },
      { id: 'PIN-C05', critere: 'Gamme de formats', score: 85, maturite: 4, observation: 'Bonne diversité mais manque formats interactifs', action: 'Dashboards interactifs + data viz' },
      { id: 'PIN-C06', critere: 'Calendrier de publication', score: 72, maturite: 3, observation: 'Publications régulières mais des retards fréquents', action: 'Calendrier éditorial strict + SLA' },
    ],
    actions: [
      { id: 'PIN-A01', action: 'Standardiser méthodologie de recherche', description: 'Créer un template méthodologique standard (source des données, période, taille échantillon, limites, peer review) pour toutes les publications.', priorite: 'P1', effort: '24h', budget: '1 500 000 FCFA', responsable: 'Research Director', kpi: '100% publications avec méthodo standard', deadline: '2026-09-30' },
      { id: 'PIN-A02', action: 'Research Data Warehouse', description: 'Structurer toutes les données de recherche dans une base interrogable avec API, permettant la réutilisation et le croisement des données.', priorite: 'P1', effort: '80h', budget: '10 000 000 FCFA', responsable: 'CTO + Research Director', kpi: 'Base opérationnelle, 100% données historiques migrées', deadline: '2027-03-31' },
      { id: 'PIN-A03', action: 'Lancer enquêtes terrain annuelles', description: 'Réaliser 2 enquêtes terrain/an (Baromètre Confiance Régulateurs, Enquête Maturité Digitale SFD) avec collecte de données primaires.', priorite: 'P2', effort: '160h/an', budget: '18 000 000 FCFA/an', responsable: 'Research Director', kpi: '2 enquêtes/an, 200+ répondants', deadline: '2027-06-30' },
    ],
    kpis: [
      { nom: 'Publications avec méthodo standard', valeur: 35, cible: 100, unite: '%' },
      { nom: 'Citations annuelles', valeur: 500, cible: 2500, unite: 'citations' },
      { nom: 'Publications peer-reviewed/an', valeur: 0, cible: 5, unite: 'publications' },
      { nom: 'Respect calendrier publication', valeur: 68, cible: 95, unite: '%' },
    ],
  },

  // === AXE 10 ===
  {
    id: 'axe-10-think-tank',
    numero: 10,
    nom: 'Think Tank & Observatoires',
    acronyme: 'TTO',
    icon: 'ri-lightbulb-flash-line',
    couleur: 'accent',
    description: 'Évaluation de la gouvernance scientifique, calendrier de publication, méthodologie, indices propriétaires, tableaux de bord, alertes, bases documentaires.',
    score_actuel: 78,
    score_cible: 93,
    ecart: 15,
    maturite: 3,
    standard_reference: 'Chatham House · Brookings Institution · IFRI · Deloitte Insights · McKinsey Global Institute · Bruegel',
    gap_analysis: 'Le Think Tank est une initiative prometteuse mais immature. La gouvernance scientifique n\'est pas formalisée (pas de comité scientifique externe). Les indices propriétaires (Indice de Conformité UEMOA, Baromètre Inclusion Financière) sont de qualité mais leur méthodologie n\'est pas rendue publique (crédibilité limitée). Les bases documentaires sont riches mais l\'interface de consultation est KOS-only — inaccessible aux externes. Le calendrier de publication n\'est pas public.',
    criteres: [
      { id: 'TTO-C01', critere: 'Gouvernance scientifique', score: 45, maturite: 2, observation: 'Pas de comité scientifique externe', action: 'Créer Comité Scientifique avec 5 experts externes' },
      { id: 'TTO-C02', critere: 'Indices propriétaires', score: 72, maturite: 3, observation: '3 indices de qualité mais méthodo non publique', action: 'Publier méthodologie + faire auditer' },
      { id: 'TTO-C03', critere: 'Bases documentaires', score: 88, maturite: 4, observation: '100K+ documents mais interface KOS-only', action: 'Portail public Think Tank' },
      { id: 'TTO-C04', critere: 'Tableaux de bord interactifs', score: 55, maturite: 2, observation: 'Dashboards KOS internes, rien de public', action: 'Dashboards publics interactifs' },
      { id: 'TTO-C05', critere: 'Alertes & veille', score: 82, maturite: 4, observation: 'Veille réglementaire automatisée performante', action: 'Ouvrir alertes aux abonnés externes' },
      { id: 'TTO-C06', critere: 'Calendrier de publication public', score: 35, maturite: 1, observation: 'Pas de calendrier public', action: 'Calendrier éditorial public annuel' },
    ],
    actions: [
      { id: 'TTO-A01', action: 'Créer Comité Scientifique externe', description: 'Recruter 5 experts externes (anciens régulateurs, professeurs, économistes) pour le Comité Scientifique du Think Tank. Réunion trimestrielle.', priorite: 'P1', effort: '40h', budget: '10 000 000 FCFA/an', responsable: 'Managing Partner', kpi: 'Comité actif, 4 réunions/an, 2 publications co-signées', deadline: '2026-12-31' },
      { id: 'TTO-A02', action: 'Lancer portail public Think Tank', description: 'Créer une section publique sur khepraexperts.com avec dashboards interactifs, indices propriétaires, et base documentaire consultable.', priorite: 'P1', effort: '120h', budget: '15 000 000 FCFA', responsable: 'CTO + Research Director', kpi: 'Portail live, 5 000 visites/mois', deadline: '2027-03-31' },
      { id: 'TTO-A03', action: 'Publier méthodologie des indices', description: 'Rédiger et publier les livres méthodologiques des 3 indices propriétaires. Soumettre à audit externe pour crédibilité.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'Research Director', kpi: '3 méthodologies publiées, audit externe OK', deadline: '2026-11-30' },
    ],
    kpis: [
      { nom: 'Comité scientifique actif', valeur: 0, cible: 1, unite: 'comité' },
      { nom: 'Indices avec méthodo publique', valeur: 0, cible: 3, unite: 'indices' },
      { nom: 'Visibilité Think Tank (pages vues)', valeur: 1200, cible: 5000, unite: 'vues/mois' },
      { nom: 'Publications Think Tank/an', valeur: 4, cible: 12, unite: 'publications' },
    ],
  },

  // === AXE 11 ===
  {
    id: 'axe-11-architecture',
    numero: 11,
    nom: 'Architecture Enterprise (KOS)',
    acronyme: 'ARC',
    icon: 'ri-cpu-line',
    couleur: 'primary',
    description: 'Analyse de l\'architecture globale de KOS : modularité, évolutivité, découplage, observabilité, résilience.',
    score_actuel: 82,
    score_cible: 95,
    ecart: 13,
    maturite: 4,
    standard_reference: 'TOGAF 10 · ISO 42010 · C4 Model · 12-Factor App · Netflix OSS Patterns · Microservices Maturity Model',
    gap_analysis: 'L\'architecture KOS est solide (82/100) mais certains patterns montrent des signes de croissance non contrôlée. 98 edge functions créent un problème de gestion (plafond Supabase 100 atteint). Le couplage entre certains composants est fort (hubLayout importé dans 150+ pages sans abstraction). L\'observabilité est partielle : logs structurés mais pas de distributed tracing. La résilience est bonne mais sans test de chaos engineering.',
    criteres: [
      { id: 'ARC-C01', critere: 'Modularité & découplage', score: 78, maturite: 3, observation: 'Bonne séparation mais couplages résiduels', action: 'Fusionner edge functions, abstraire dépendances' },
      { id: 'ARC-C02', critere: 'Évolutivité', score: 82, maturite: 4, observation: 'Architecture scalable mais edge functions plafonnent', action: 'Plan migration vers architecture microservices' },
      { id: 'ARC-C03', critere: 'Observabilité', score: 68, maturite: 3, observation: 'Logs OK, manque distributed tracing', action: 'Déployer OpenTelemetry tracing' },
      { id: 'ARC-C04', critere: 'Résilience', score: 75, maturite: 3, observation: 'Bonne résilience de base, pas de chaos testing', action: 'Chaos engineering trimestriel' },
      { id: 'ARC-C05', critere: 'Documentation architecturale', score: 62, maturite: 3, observation: 'Documentation partielle, pas de C4 diagrams', action: 'C4 Model + ADR (Architecture Decision Records)' },
      { id: 'ARC-C06', critere: 'Gestion des dépendances', score: 85, maturite: 4, observation: 'Bonne gestion npm, 15 vulns résiduelles', action: 'npm audit fix + dépendance monitoring' },
    ],
    actions: [
      { id: 'ARC-A01', action: 'Programme fusion edge functions (98→50)', description: 'Identifier et fusionner les edge functions redondantes. Cible : passer de 98 à 50 fonctions via regroupement par domaine. Documenter l\'architecture cible.', priorite: 'P0', effort: '160h', budget: '12 000 000 FCFA', responsable: 'CTO + Lead Dev Backend', kpi: '50 edge functions max, 0 régression fonctionnelle', deadline: '2026-12-31' },
      { id: 'ARC-A02', action: 'Déployer OpenTelemetry + distributed tracing', description: 'Instrumenter les edge functions et le frontend avec OpenTelemetry. Dashboard traces dans KOS SysOps. Identifier les goulots.', priorite: 'P1', effort: '80h', budget: '8 000 000 FCFA', responsable: 'CTO + DevOps', kpi: '100% edge functions tracées, dashboard live', deadline: '2027-03-31' },
      { id: 'ARC-A03', action: 'C4 Model + ADR (Architecture Decision Records)', description: 'Documenter l\'architecture KOS avec le modèle C4 (Context, Container, Component, Code). Mettre en place ADR pour les décisions architecturales.', priorite: 'P1', effort: '60h', budget: '4 000 000 FCFA', responsable: 'CTO', kpi: 'C4 diagrams complets, 20+ ADRs', deadline: '2026-11-30' },
    ],
    kpis: [
      { nom: 'Edge functions', valeur: 98, cible: 50, unite: 'fonctions' },
      { nom: 'Couverture tracing', valeur: 0, cible: 100, unite: '%' },
      { nom: 'Documentation architecturale', valeur: 62, cible: 95, unite: '%' },
      { nom: 'Score 12-Factor App', valeur: 72, cible: 90, unite: '/100' },
    ],
  },

  // === AXE 12 ===
  {
    id: 'axe-12-ia',
    numero: 12,
    nom: 'Intelligence Artificielle (KOS)',
    acronyme: 'IAK',
    icon: 'ri-brain-line',
    couleur: 'accent',
    description: 'Évaluation de l\'orchestration d\'agents, mémoire, RAG, GraphRAG, base vectorielle, routage intelligent, modèles, validation des réponses, gestion des hallucinations, optimisation des coûts.',
    score_actuel: 84,
    score_cible: 96,
    ecart: 12,
    maturite: 4,
    standard_reference: 'ISO 42001:2023 · NIST AI RMF 1.0 · EU AI Act · OCDE AI Principles · Google Responsible AI · Anthropic Safety Guidelines',
    gap_analysis: 'Le système IA de KOS est avancé (84/100) avec 260+ agents et RAG réglementaire. Points forts : orchestration multi-agent, KOS Automaton Engine, base vectorielle Qdrant. Gaps : 2 agents utilisent des API externes sans sandboxing complet, le taux d\'hallucination est à 0.12% (cible 0.05%), le Digital Twin Engine n\'est pas conforme EU AI Act Art.14 (explicabilité). Le coût mensuel des API externes est de 2.8M FCFA — potentiel d\'optimisation avec modèles locaux.',
    criteres: [
      { id: 'IAK-C01', critere: 'Orchestration d\'agents', score: 90, maturite: 4, observation: '260+ agents bien orchestrés via KOS Automaton', action: 'Optimiser routage + load balancing' },
      { id: 'IAK-C02', critere: 'RAG & base vectorielle', score: 88, maturite: 4, observation: 'RAG performant, hybrid search déployé', action: 'GraphRAG pour relations réglementaires' },
      { id: 'IAK-C03', critere: 'Gestion des hallucinations', score: 82, maturite: 4, observation: 'Taux 0.12%, cible Big Four 0.05%', action: 'Améliorer validation + fact-checking' },
      { id: 'IAK-C04', critere: 'Conformité ISO 42001 & EU AI Act', score: 65, maturite: 3, observation: 'Digital Twin non conforme Art.14 explicabilité', action: 'Refactoring explicabilité + audit externe' },
      { id: 'IAK-C05', critere: 'Optimisation des coûts API', score: 62, maturite: 3, observation: '2.8M FCFA/mois API externes — optimisable', action: 'Modèles locaux + cache intelligent' },
      { id: 'IAK-C06', critere: 'Sécurité IA (sandboxing)', score: 72, maturite: 3, observation: '2 agents non sandboxés — risque données', action: 'Sandboxing complet API externes' },
    ],
    actions: [
      { id: 'IAK-A01', action: 'Mise en conformité EU AI Act — Digital Twin', description: 'Refactoring du Digital Twin pour conformité Art.14 (explicabilité) et Art.15 (exactitude). Audit externe + documentation complète.', priorite: 'P0', effort: '120h', budget: '18 000 000 FCFA', responsable: 'CTO + AI Ethics Board', kpi: 'Conformité EU AI Act, score ISO 42001 ≥ 9.0', deadline: '2026-12-31' },
      { id: 'IAK-A02', action: 'Déployer GraphRAG réglementaire', description: 'Migrer du RAG vectoriel simple vers GraphRAG exploitant le Knowledge Graph réglementaire : relations entre textes, hiérarchie, abrogations, dépendances.', priorite: 'P1', effort: '100h', budget: '10 000 000 FCFA', responsable: 'CTO', kpi: 'Précision réponses +25%, hallucinations -50%', deadline: '2027-03-31' },
      { id: 'IAK-A03', action: 'Optimisation coûts API — modèles locaux', description: 'Évaluer et déployer des modèles open-source (Mistral, Llama) en local pour 60% des requêtes non-critiques. Cache intelligent pour requêtes fréquentes.', priorite: 'P1', effort: '80h', budget: '6 000 000 FCFA', responsable: 'CTO + AI Team', kpi: 'Coûts API -50%, latence -30%', deadline: '2027-06-30' },
    ],
    kpis: [
      { nom: 'Taux d\'hallucination', valeur: 0.12, cible: 0.05, unite: '%' },
      { nom: 'Score ISO 42001', valeur: 87.5, cible: 95, unite: '/100' },
      { nom: 'Coût API mensuel', valeur: 2.8, cible: 1.4, unite: 'M FCFA' },
      { nom: 'Agents sandboxés', valeur: 258, cible: 260, unite: 'agents' },
    ],
  },

  // === AXE 13 ===
  {
    id: 'axe-13-connaissances',
    numero: 13,
    nom: 'Base de Connaissances',
    acronyme: 'BDC',
    icon: 'ri-database-2-line',
    couleur: 'secondary',
    description: 'Audit de la qualité documentaire, taxonomie, versionnement, provenance, indexation, couverture réglementaire, qualité des métadonnées.',
    score_actuel: 85,
    score_cible: 96,
    ecart: 11,
    maturite: 4,
    standard_reference: 'ISO 30401:2018 — Knowledge Management · Dublin Core · SKOS · ISO 25964 — Thesauri · NISO Metadata Standards',
    gap_analysis: 'La base de connaissances KOS est un atout majeur (85/100) avec 100K+ documents et couverture réglementaire exceptionnelle. Points d\'amélioration : (1) taxonomie non standardisée (pas de SKOS/ISO 25964), (2) versionnement des documents non systématique, (3) provenance partiellement tracée (qui a créé/modifié quoi), (4) métadonnées riches mais pas de Dublin Core mapping. La qualité documentaire est bonne mais l\'indexation plein texte pourrait être améliorée.',
    criteres: [
      { id: 'BDC-C01', critere: 'Qualité documentaire', score: 88, maturite: 4, observation: 'Bonne qualité, documents bien structurés', action: 'QA automatique des métadonnées' },
      { id: 'BDC-C02', critere: 'Taxonomie & classification', score: 72, maturite: 3, observation: 'Taxonomie maison, pas de standard SKOS', action: 'Migrer vers SKOS/ISO 25964' },
      { id: 'BDC-C03', critere: 'Versionnement & traçabilité', score: 68, maturite: 3, observation: 'Versionnement partiel, pas systématique', action: 'Versionnement automatique + audit trail' },
      { id: 'BDC-C04', critere: 'Couverture réglementaire', score: 92, maturite: 4, observation: '417 textes, 8 autorités — excellent', action: 'Ajouter GABAC + autorités lusophones' },
      { id: 'BDC-C05', critere: 'Qualité des métadonnées', score: 78, maturite: 4, observation: 'Métadonnées riches mais pas standard Dublin Core', action: 'Dublin Core mapping + enrichment auto' },
      { id: 'BDC-C06', critere: 'Indexation & recherche', score: 82, maturite: 4, observation: 'Bon hybrid search, améliorable sur synonymes', action: 'Synonymes réglementaires + fuzzy search' },
    ],
    actions: [
      { id: 'BDC-A01', action: 'Migrer taxonomie vers SKOS', description: 'Standardiser la taxonomie KOS selon le standard SKOS (Simple Knowledge Organization System) avec mappings Dublin Core.', priorite: 'P1', effort: '100h', budget: '8 000 000 FCFA', responsable: 'Knowledge Manager + CTO', kpi: 'Taxonomie SKOS, 100% documents mappés', deadline: '2027-03-31' },
      { id: 'BDC-A02', action: 'Versionnement automatique + audit trail', description: 'Implémenter le versionnement automatique de tous les documents avec historique complet (qui, quand, quoi).', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO', kpi: '100% documents versionnés, audit trail complet', deadline: '2026-12-31' },
      { id: 'BDC-A03', action: 'Extension couverture GABAC + lusophone', description: 'Ajouter la couverture GABAC (CEMAC) et les autorités lusophones (Banco de Moçambique, Banco Nacional de Angola).', priorite: 'P2', effort: '80h', budget: '6 000 000 FCFA', responsable: 'Regulatory Intelligence', kpi: '+2 autorités, +50 textes', deadline: '2027-06-30' },
    ],
    kpis: [
      { nom: 'Documents indexés', valeur: 108000, cible: 150000, unite: 'documents' },
      { nom: 'Autorités couvertes', valeur: 8, cible: 12, unite: 'autorités' },
      { nom: 'Documents versionnés', valeur: 45, cible: 100, unite: '%' },
      { nom: 'Score qualité métadonnées', valeur: 78, cible: 95, unite: '%' },
    ],
  },

  // === AXE 14 ===
  {
    id: 'axe-14-automatisation',
    numero: 14,
    nom: 'Automatisation (KOS)',
    acronyme: 'AUT',
    icon: 'ri-robot-3-line',
    couleur: 'primary',
    description: 'Évaluation des workflows, agents, Edge Functions, tâches planifiées, pipelines, orchestration, surveillance, reprise automatique.',
    score_actuel: 78,
    score_cible: 94,
    ecart: 16,
    maturite: 3,
    standard_reference: 'ITIL 4 — Automation · ISO 20000 · COBIT 2019 BAI06 · DevOps Maturity Model · SRE Best Practices',
    gap_analysis: 'L\'automatisation KOS est bonne (78/100) mais hétérogène. Les workflows de contenu (SEO, GEO, blog) sont bien automatisés. Les workflows métier (production livrables, validation qualité) sont semi-automatisés. Les tâches planifiées (cron) ont des silences (tender scraper avec 3 échecs en 7j sans alerting). La reprise automatique est partielle : 60% des workflows ont du retry automatique. L\'orchestration (KOS Orchestrator Engine) fonctionne mais manque de dashboard de monitoring unifié.',
    criteres: [
      { id: 'AUT-C01', critere: 'Workflows automatisés', score: 82, maturite: 4, observation: 'Workflows contenu bien automatisés, métier semi', action: 'Automatiser workflows métier' },
      { id: 'AUT-C02', critere: 'Edge Functions', score: 72, maturite: 3, observation: '98 fonctions, plafond atteint, 7 sans JWT', action: 'Fusion + sécurisation edge functions' },
      { id: 'AUT-C03', critere: 'Tâches planifiées & cron', score: 65, maturite: 3, observation: 'Crons fonctionnels mais 3 échecs silencieux', action: 'Monitoring cron + alerting' },
      { id: 'AUT-C04', critere: 'Pipeline monitoring', score: 68, maturite: 3, observation: 'Monitoring partiel, pas de dashboard unifié', action: 'Dashboard automation unifié' },
      { id: 'AUT-C05', critere: 'Reprise automatique', score: 62, maturite: 3, observation: '60% workflows avec retry — insuffisant', action: 'Retry automatique 100% workflows' },
      { id: 'AUT-C06', critere: 'Orchestration globale', score: 78, maturite: 4, observation: 'Orchestrator Engine OK, manque SLAs', action: 'SLAs + alerting sur tous les workflows' },
    ],
    actions: [
      { id: 'AUT-A01', action: 'Dashboard automation unifié', description: 'Créer un dashboard unique montrant l\'état de tous les workflows, pipelines, crons, et edge functions avec statut temps réel et historique.', priorite: 'P0', effort: '80h', budget: '8 000 000 FCFA', responsable: 'CTO', kpi: 'Dashboard live, 100% workflows monitorés', deadline: '2026-11-30' },
      { id: 'AUT-A02', action: 'Retry automatique 100% workflows', description: 'Implémenter le retry automatique avec backoff exponentiel sur tous les workflows. Alerting en cas d\'échec après 3 tentatives.', priorite: 'P0', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO + DevOps', kpi: '100% workflows retry, 0 échec silencieux', deadline: '2026-10-31' },
      { id: 'AUT-A03', action: 'Monitoring cron + alerting temps réel', description: 'Mettre en place le monitoring de tous les crons avec alerting temps réel (email + KOS notification) en cas d\'échec.', priorite: 'P1', effort: '30h', budget: '2 500 000 FCFA', responsable: 'DevOps', kpi: '100% crons monitorés, MTTD < 5min', deadline: '2026-09-30' },
    ],
    kpis: [
      { nom: 'Workflows avec retry', valeur: 60, cible: 100, unite: '%' },
      { nom: 'Crons avec alerting', valeur: 45, cible: 100, unite: '%' },
      { nom: 'Edge functions', valeur: 98, cible: 50, unite: 'fonctions' },
      { nom: 'MTTD échec cron', valeur: 480, cible: 5, unite: 'min' },
    ],
  },

  // === AXE 15 ===
  {
    id: 'axe-15-qualite-logicielle',
    numero: 15,
    nom: 'Qualité Logicielle (KOS)',
    acronyme: 'QAL',
    icon: 'ri-code-s-slash-line',
    couleur: 'accent',
    description: 'Audit de l\'architecture logicielle, dette technique, couverture de tests, CI/CD, qualité du code, documentation, gestion des versions.',
    score_actuel: 72,
    score_cible: 92,
    ecart: 20,
    maturite: 3,
    standard_reference: 'ISO 25010 — Software Quality · SonarQube Quality Gates · OWASP SAMM · GitHub Actions CI/CD · Jest Testing Pyramid',
    gap_analysis: 'La qualité logicielle est le maillon faible de KOS (72/100). Points critiques : (1) couverture de tests quasi nulle (< 5%), (2) pas de CI/CD avec quality gates automatisées, (3) dette technique estimée à 28 jours-homme, (4) bundle JS à 1.8 MB (3× seuil acceptable), (5) documentation du code inégale, (6) pas de static analysis en continu. Le code est fonctionnel et bien architecturé mais manque de rigueur industrielle.',
    criteres: [
      { id: 'QAL-C01', critere: 'Couverture de tests', score: 15, maturite: 1, observation: '< 5% couverture — critique', action: 'Programme tests unitaires + intégration' },
      { id: 'QAL-C02', critere: 'CI/CD pipeline', score: 55, maturite: 2, observation: 'Build + déploiement basique, pas de quality gates', action: 'CI/CD avec lint, test, build, security scan' },
      { id: 'QAL-C03', critere: 'Dette technique', score: 58, maturite: 3, observation: '28j-h dette estimée, bundle 1.8MB', action: 'Sprint dette technique trimestriel' },
      { id: 'QAL-C04', critere: 'Qualité du code (static analysis)', score: 68, maturite: 3, observation: 'ESLint configuré mais pas de SonarQube', action: 'SonarQube + quality gates' },
      { id: 'QAL-C05', critere: 'Documentation du code', score: 55, maturite: 2, observation: 'Documentation inégale selon les modules', action: 'JSDoc + README standards' },
      { id: 'QAL-C06', critere: 'Gestion des versions & releases', score: 75, maturite: 4, observation: 'Versioning OK, pas de release notes structurées', action: 'Release notes automatiques + changelog' },
    ],
    actions: [
      { id: 'QAL-A01', action: 'Programme de tests — couverture 5%→60%', description: 'Plan de montée en couverture : 200 tests unitaires critiques (hooks, utils), 50 tests d\'intégration (forms, API), 20 tests E2E (parcours clés).', priorite: 'P0', effort: '200h', budget: '15 000 000 FCFA', responsable: 'CTO + Lead Dev', kpi: 'Couverture ≥ 60%, 0 régression', deadline: '2027-06-30' },
      { id: 'QAL-A02', action: 'CI/CD avec quality gates', description: 'Pipeline CI/CD complet : lint, type-check, test, build, security scan (npm audit), bundle analysis. Quality gates bloquantes avant déploiement.', priorite: 'P0', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO + DevOps', kpi: 'Pipeline CI/CD avec 5 quality gates', deadline: '2026-11-30' },
      { id: 'QAL-A03', action: 'Sprint dette technique trimestriel', description: 'Instaurer un sprint dédié à la dette technique chaque trimestre (2 semaines). Focus : refactoring, optimisation bundle, documentation.', priorite: 'P1', effort: '80h/trimestre', budget: '4 000 000 FCFA/trim', responsable: 'CTO', kpi: 'Dette technique -25%/trimestre', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'Couverture de tests', valeur: 5, cible: 60, unite: '%' },
      { nom: 'Dette technique', valeur: 28, cible: 7, unite: 'j-h' },
      { nom: 'Bundle JS', valeur: 1.8, cible: 0.5, unite: 'MB' },
      { nom: 'Score SonarQube', valeur: 0, cible: 85, unite: '/100' },
    ],
  },

  // === AXE 16 ===
  {
    id: 'axe-16-donnees',
    numero: 16,
    nom: 'Données (Data Governance)',
    acronyme: 'DAT',
    icon: 'ri-bar-chart-box-line',
    couleur: 'secondary',
    description: 'Audit de la gouvernance des données, qualité, traçabilité, catalogue, historisation, sauvegardes, sécurité.',
    score_actuel: 74,
    score_cible: 93,
    ecart: 19,
    maturite: 3,
    standard_reference: 'DAMA-DMBOK · ISO 8000 — Data Quality · GDPR · ISO 27001 A.8 · DCAM · COBIT DSS06',
    gap_analysis: 'La gouvernance des données est en progression mais encore immature. Supabase gère bien la persistance mais : (1) pas de data catalog formalisé, (2) la qualité des données n\'est pas mesurée automatiquement, (3) l\'historisation est partielle (pas de slowly changing dimensions), (4) 3 tables sans RLS, (5) pas de data lineage documenté, (6) les sauvegardes sont automatisées mais non testées régulièrement (restore test > 6 mois).',
    criteres: [
      { id: 'DAT-C01', critere: 'Data catalog', score: 42, maturite: 2, observation: 'Pas de catalogue formalisé', action: 'Créer data catalog avec métadonnées' },
      { id: 'DAT-C02', critere: 'Qualité des données', score: 55, maturite: 2, observation: 'Pas de mesure automatique de qualité', action: 'Data quality monitoring automatisé' },
      { id: 'DAT-C03', critere: 'Sécurité des données (RLS)', score: 78, maturite: 4, observation: '3 tables sans RLS sur 200+', action: 'RLS sur 100% tables' },
      { id: 'DAT-C04', critere: 'Historisation & audit trail', score: 62, maturite: 3, observation: 'Historisation partielle, pas de SCD', action: 'SCD Type 2 + audit trail complet' },
      { id: 'DAT-C05', critere: 'Sauvegardes & restore', score: 72, maturite: 3, observation: 'Backups OK, restore test > 6 mois', action: 'Restore test trimestriel' },
      { id: 'DAT-C06', critere: 'Data lineage', score: 35, maturite: 1, observation: 'Aucun data lineage documenté', action: 'Documenter data lineage critiques' },
    ],
    actions: [
      { id: 'DAT-A01', action: 'Créer Data Catalog KOS', description: 'Catalogue de données complet : 200+ tables documentées avec propriétaire, sensibilité, retention, classification. Accessible dans KOS.', priorite: 'P1', effort: '80h', budget: '6 000 000 FCFA', responsable: 'CTO + Data Architect', kpi: 'Data catalog live, 100% tables documentées', deadline: '2027-03-31' },
      { id: 'DAT-A02', action: 'Data quality monitoring automatisé', description: 'Mettre en place des contrôles de qualité automatisés : complétude, unicité, fraîcheur, cohérence. Dashboards qualité dans KOS.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO', kpi: 'Score qualité ≥ 95%, alertes qualité', deadline: '2027-06-30' },
      { id: 'DAT-A03', action: 'Restore test trimestriel', description: 'Mettre en place un test de restauration complet trimestriel avec scénarios. Rapport automatisé dans KOS.', priorite: 'P1', effort: '16h/trim', budget: '2 000 000 FCFA', responsable: 'DevOps', kpi: '4 restore tests/an, 0 échec', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'Tables avec RLS', valeur: 97, cible: 100, unite: '%' },
      { nom: 'Tables documentées (catalogue)', valeur: 15, cible: 100, unite: '%' },
      { nom: 'Score qualité données', valeur: 0, cible: 95, unite: '%' },
      { nom: 'Restore tests/an', valeur: 0, cible: 4, unite: 'tests' },
    ],
  },

  // === AXE 17 ===
  {
    id: 'axe-17-cyber',
    numero: 17,
    nom: 'Cybersécurité',
    acronyme: 'CYS',
    icon: 'ri-shield-flash-line',
    couleur: 'primary',
    description: 'Évaluation IAM, chiffrement, secrets, sauvegardes, PRA, PCA, journalisation, surveillance, conformité ISO 27001, NIST, OWASP.',
    score_actuel: 76,
    score_cible: 95,
    ecart: 19,
    maturite: 3,
    standard_reference: 'ISO 27001:2022 · NIST CSF 2.0 · OWASP ASVS · Directive COBAC 2027 · RGPD · SOC 2 Type II',
    gap_analysis: 'La cybersécurité est en chantier (76/100). Avancées majeures : SOC 24/7 déployé, 91/98 edge functions avec JWT, 114/114 contrôles ISO 27001 en cours. Gaps : 5 contrôles ISO 27001 critiques non résolus (A.11 sécurité physique, A.14 SDLC, A.15 fournisseurs, A.7 formation, A.17 PCA), MTTD 18min (> cible 5min), pas de Red Team annuel, CSP/Permissions-Policy headers absents, 15 vulnérabilités npm non corrigées.',
    criteres: [
      { id: 'CYS-C01', critere: 'IAM & authentification', score: 82, maturite: 4, observation: 'JWT OK, 7 edge functions sans JWT', action: 'JWT 100% edge functions' },
      { id: 'CYS-C02', critere: 'Chiffrement & secrets', score: 78, maturite: 4, observation: 'Secrets Supabase OK, pas de rotation auto', action: 'Rotation automatique des secrets' },
      { id: 'CYS-C03', critere: 'Conformité ISO 27001', score: 78, maturite: 3, observation: '5 gaps critiques résiduels', action: 'Résoudre 5 gaps ISO 27001' },
      { id: 'CYS-C04', critere: 'PRA/PCA', score: 62, maturite: 3, observation: 'Plan existe, pas testé > 12 mois', action: 'Test PRA/PCA semestriel' },
      { id: 'CYS-C05', critere: 'Détection & réponse (SOC)', score: 72, maturite: 3, observation: 'SOC 24/7 OK, MTTD 18min > cible', action: 'SIEM + MTTD < 5min' },
      { id: 'CYS-C06', critere: 'Sécurité applicative (OWASP)', score: 58, maturite: 2, observation: 'CSP absent, 15 vulns npm, 3 vulns OWASP critiques', action: 'CSP + npm audit fix + OWASP fixes' },
    ],
    actions: [
      { id: 'CYS-A01', action: 'Résoudre 5 gaps ISO 27001 critiques', description: 'Finaliser les 5 contrôles critiques : sécurité physique (A.11), SDLC documenté (A.14), sécurité fournisseurs (A.15), formation 100% (A.7), PCA testé (A.17).', priorite: 'P0', effort: '80h', budget: '17 200 000 FCFA', responsable: 'RSSI', kpi: '114/114 contrôles ISO 27001 passés', deadline: '2026-10-31' },
      { id: 'CYS-A02', action: 'Déployer CSP + headers sécurité', description: 'Content-Security-Policy strict, Permissions-Policy, HSTS preload, Referrer-Policy, X-Content-Type-Options sur toutes les pages.', priorite: 'P0', effort: '8h', budget: '2 800 000 FCFA', responsable: 'RSSI + Lead Dev', kpi: 'Mozilla Observatory ≥ 95/100', deadline: '2026-08-31' },
      { id: 'CYS-A03', action: 'SIEM + MTTD < 5min + Red Team', description: 'Déployer SIEM avec threat intelligence, MTTD < 5min. Organiser Red Team Exercise annuel avec firme externe.', priorite: 'P1', effort: '120h', budget: '36 500 000 FCFA', responsable: 'RSSI + SOC Manager', kpi: 'MTTD < 5min, 1 Red Team/an', deadline: '2027-03-31' },
    ],
    kpis: [
      { nom: 'Score ISO 27001', valeur: 78, cible: 100, unite: '/100' },
      { nom: 'MTTD', valeur: 18, cible: 5, unite: 'min' },
      { nom: 'Score OWASP ASVS', valeur: 58, cible: 90, unite: '/100' },
      { nom: 'Tests PRA/PCA/an', valeur: 0, cible: 2, unite: 'tests' },
    ],
  },

  // === AXE 18 ===
  {
    id: 'axe-18-conformite',
    numero: 18,
    nom: 'Conformité Réglementaire',
    acronyme: 'REG',
    icon: 'ri-scales-3-line',
    couleur: 'accent',
    description: 'Évaluation OHADA, BCEAO, COBAC, CIMA, RGPD, protection des données, LBC/FT, ESG, gouvernance.',
    score_actuel: 82,
    score_cible: 96,
    ecart: 14,
    maturite: 4,
    standard_reference: 'OHADA AUSCGIE/AUDCG · BCEAO Circulaires · COBAC Règlements · CIMA Code · GAFI 40 Recommandations · RGPD · ISO 37301',
    gap_analysis: 'La conformité est un point fort (82/100). KOS suit 417 textes et 8 autorités avec une veille automatisée. Gaps : couverture CEMAC 94% (vs 98% UEMOA), KYC/CDD détection PPE à 65% (vs 90% GAFI), pas de certification ISO 37301 (Compliance Management), délai d\'analyse d\'impact de 8.5h, LCB/FT : cartographie CEMAC à 58/100. La force est l\'exhaustivité de la veille, la faiblesse est la profondeur d\'analyse sur certaines zones.',
    criteres: [
      { id: 'REG-C01', critere: 'Couverture réglementaire UEMOA', score: 98, maturite: 5, observation: 'Excellent — 89 textes BCEAO suivis', action: 'Maintenir + ajouter veille parlementaire' },
      { id: 'REG-C02', critere: 'Couverture réglementaire CEMAC', score: 75, maturite: 3, observation: '94% couverture COBAC, GABAC absent', action: 'Couverture COBAC 98% + GABAC' },
      { id: 'REG-C03', critere: 'LCB/FT — Conformité GAFI', score: 68, maturite: 3, observation: 'KYC/CDD détection PPE 65% vs 90% GAFI', action: 'Améliorer détection PPE + R.15' },
      { id: 'REG-C04', critere: 'Protection des données (RGPD)', score: 78, maturite: 4, observation: 'Registre traitements OK, manque AIPD', action: 'AIPD sur traitements à risque' },
      { id: 'REG-C05', critere: 'Conformité ESG', score: 72, maturite: 3, observation: 'ISSB S1/S2 débuté, EcoVadis 62/100', action: 'Accélérer ISSB + EcoVadis Gold' },
      { id: 'REG-C06', critere: 'Gestion des risques de non-conformité', score: 74, maturite: 3, observation: 'Matrice conformité OK, pas d\'auto-évaluation', action: 'Auto-évaluation trimestrielle' },
    ],
    actions: [
      { id: 'REG-A01', action: 'Améliorer KYC/CDD — PPE 65%→90%', description: 'Intégrer bases de données PPE internationales (WorldCheck, Dow Jones) dans le workflow KYC KOS. Automatiser la détection et le scoring.', priorite: 'P0', effort: '60h', budget: '8 500 000 FCFA', responsable: 'Compliance Officer', kpi: 'Détection PPE ≥ 90%, conformité GAFI R.12', deadline: '2026-09-30' },
      { id: 'REG-A02', action: 'Certification ISO 37301 — Compliance Management', description: 'Préparer et obtenir la certification ISO 37301:2021. Audit à blanc Q4 2026, certification Q1 2027.', priorite: 'P1', effort: '120h', budget: '10 200 000 FCFA', responsable: 'CCO', kpi: 'Certification ISO 37301 obtenue', deadline: '2027-03-31' },
      { id: 'REG-A03', action: 'Couverture GABAC + veille CEMAC complète', description: 'Ajouter la surveillance GABAC et les régulateurs CEMAC (COBAC, BEAC, BVMAC). Intégrer dans la veille KOS.', priorite: 'P1', effort: '60h', budget: '5 800 000 FCFA', responsable: 'Regulatory Intelligence', kpi: '+1 autorité, +30 textes CEMAC', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'Couverture réglementaire globale', valeur: 92, cible: 98, unite: '%' },
      { nom: 'Détection PPE', valeur: 65, cible: 90, unite: '%' },
      { nom: 'Score cartographie CEMAC', valeur: 58, cible: 85, unite: '/100' },
      { nom: 'Autorités surveillées', valeur: 8, cible: 12, unite: 'autorités' },
    ],
  },

  // === AXE 19 ===
  {
    id: 'axe-19-performance',
    numero: 19,
    nom: 'Performance Opérationnelle',
    acronyme: 'PER',
    icon: 'ri-speed-line',
    couleur: 'secondary',
    description: 'Mesure du temps de production, productivité, automatisation, qualité, coûts, satisfaction.',
    score_actuel: 70,
    score_cible: 92,
    ecart: 22,
    maturite: 3,
    standard_reference: 'ITIL 4 — Service Value Chain · ISO 9001 · Lean Six Sigma · EFQM Excellence Model · KPIs Big Four Consulting',
    gap_analysis: 'La performance opérationnelle est mesurée de façon incomplète. Le temps de production des livrables est suivi mais pas benchmarké. La productivité (revenu par consultant) est à 85M FCFA vs 120M cible Big Four. L\'automatisation des processus métier est à 38% — trop faible. La qualité est bonne (96/100 en contrôle qualité) mais la satisfaction client n\'est mesurée qu\'une fois par an (NPS). Les coûts opérationnels sont maîtrisés mais l\'allocation des ressources est sous-optimale (sous-utilisation consultants 77%).',
    criteres: [
      { id: 'PER-C01', critere: 'Temps de production livrables', score: 68, maturite: 3, observation: 'Suivi partiel, pas de benchmark Big Four', action: 'Time tracking + benchmark' },
      { id: 'PER-C02', critere: 'Productivité (CA/consultant)', score: 62, maturite: 3, observation: '85M FCFA/consultant vs 120M cible', action: 'Optimiser allocation + automatisation' },
      { id: 'PER-C03', critere: 'Taux d\'automatisation processus', score: 38, maturite: 2, observation: '38% — très en dessous du seuil 70%', action: 'Automatiser processus métier' },
      { id: 'PER-C04', critere: 'Qualité livrables', score: 88, maturite: 4, observation: 'Bon score qualité, marge de progression', action: 'SLA qualité < 8h 100%' },
      { id: 'PER-C05', critere: 'Maîtrise des coûts', score: 75, maturite: 4, observation: 'Coûts maîtrisés, allocation sous-optimale', action: 'Resource planning + allocation optimisée' },
      { id: 'PER-C06', critere: 'Satisfaction client (NPS)', score: 58, maturite: 3, observation: 'NPS 42 — mesuré 1×/an seulement', action: 'NPS trimestriel + CSAT post-mission' },
    ],
    actions: [
      { id: 'PER-A01', action: 'Time tracking + benchmark Big Four', description: 'Mettre en place un système de time tracking pour toutes les missions. Benchmarker les temps vs standards Big Four. Identifier les goulots.', priorite: 'P0', effort: '40h', budget: '3 500 000 FCFA', responsable: 'COO', kpi: '100% missions trackées, benchmark live', deadline: '2026-10-31' },
      { id: 'PER-A02', action: 'Productivité CA/consultant 85M→120M', description: 'Plan d\'amélioration de la productivité : automatisation, meilleure allocation, montée en gamme des mandats, formation.', priorite: 'P0', effort: '120h', budget: '15 000 000 FCFA', responsable: 'Managing Partner + COO', kpi: 'CA/consultant ≥ 120M FCFA', deadline: '2027-12-31' },
      { id: 'PER-A03', action: 'NPS trimestriel + CSAT post-mission', description: 'Mettre en place la mesure NPS trimestrielle et CSAT systématique après chaque mission. Dashboard satisfaction dans KOS.', priorite: 'P1', effort: '30h', budget: '2 000 000 FCFA', responsable: 'Client Success Manager', kpi: 'NPS ≥ 65, CSAT ≥ 4.5/5', deadline: '2026-12-31' },
    ],
    kpis: [
      { nom: 'CA/consultant', valeur: 85, cible: 120, unite: 'M FCFA' },
      { nom: 'NPS', valeur: 42, cible: 65, unite: 'pts' },
      { nom: 'Productivité (taux utilisation)', valeur: 77, cible: 88, unite: '%' },
      { nom: 'Délai moyen livraison', valeur: 12, cible: 7, unite: 'jours' },
    ],
  },

  // === AXE 20 ===
  {
    id: 'axe-20-innovation',
    numero: 20,
    nom: 'Innovation',
    acronyme: 'INN',
    icon: 'ri-rocket-2-line',
    couleur: 'accent',
    description: 'Audit R&D, IA, propriété intellectuelle, nouveaux produits, veille, partenariats, brevets potentiels.',
    score_actuel: 68,
    score_cible: 90,
    ecart: 22,
    maturite: 3,
    standard_reference: 'OCDE Oslo Manual · ISO 56002 — Innovation Management · Gartner Innovation Maturity Model · BCG Most Innovative Companies',
    gap_analysis: 'L\'innovation est sous-structurée (68/100). KOS est une innovation majeure mais : (1) pas de processus R&D formalisé, (2) pas de budget innovation dédié, (3) 0 brevet déposé malgré des méthodes propriétaires brevetables, (4) veille innovation non systématique, (5) partenariats innovation inexistants (pas de lien avec universités/labs). Le potentiel est énorme (KOS, méthodologies propriétaires, GraphRAG) mais non capitalisé formellement.',
    criteres: [
      { id: 'INN-C01', critere: 'Processus R&D formalisé', score: 25, maturite: 1, observation: 'Aucun processus R&D documenté', action: 'Créer KHEPRA Innovation Lab' },
      { id: 'INN-C02', critere: 'Propriété intellectuelle & brevets', score: 18, maturite: 1, observation: '0 brevet, méthodes non protégées', action: 'Audit PI + dépôt brevets' },
      { id: 'INN-C03', critere: 'Budget innovation', score: 32, maturite: 1, observation: 'Pas de budget innovation dédié', action: 'Allouer 8% CA à l\'innovation' },
      { id: 'INN-C04', critere: 'Veille innovation & technologique', score: 55, maturite: 3, observation: 'Veille partielle, non systématique', action: 'Veille technologique structurée' },
      { id: 'INN-C05', critere: 'Partenariats innovation', score: 28, maturite: 1, observation: 'Aucun partenariat universitaire ou labo', action: 'Partenariats universités + startups' },
      { id: 'INN-C06', critere: 'Culture d\'innovation', score: 62, maturite: 3, observation: 'Culture entrepreneuriale mais pas de process', action: 'Innovation days + intrapreneuriat' },
    ],
    actions: [
      { id: 'INN-A01', action: 'Créer KHEPRA Innovation Lab', description: 'Structurer un laboratoire d\'innovation avec budget dédié (8% CA), 2 chercheurs, processus stage-gate. Focus : IA réglementaire, LegalTech, RegTech.', priorite: 'P1', effort: '160h', budget: '25 000 000 FCFA/an', responsable: 'Managing Partner + CTO', kpi: 'Lab opérationnel, 3 projets R&D actifs', deadline: '2027-03-31' },
      { id: 'INN-A02', action: 'Audit PI + dépôt 3 brevets méthodologiques', description: 'Auditer le portefeuille de propriété intellectuelle. Déposer 3 brevets sur les méthodes propriétaires (KOS Automaton, GraphRAG réglementaire, Diagnostic Engine).', priorite: 'P1', effort: '120h', budget: '18 000 000 FCFA', responsable: 'Managing Partner + Conseil PI', kpi: '3 brevets déposés, portefeuille PI documenté', deadline: '2027-12-31' },
      { id: 'INN-A03', action: 'Partenariats universités + startups', description: 'Établir 2 partenariats avec des universités africaines et 2 avec des startups RegTech. Programme de stages recherche.', priorite: 'P1', effort: '80h', budget: '12 000 000 FCFA/an', responsable: 'Innovation Director', kpi: '4 partenariats actifs, 2 stagiaires/an', deadline: '2027-06-30' },
    ],
    kpis: [
      { nom: 'Budget R&D (% CA)', valeur: 0.5, cible: 8, unite: '%' },
      { nom: 'Brevets déposés', valeur: 0, cible: 3, unite: 'brevets' },
      { nom: 'Partenariats innovation', valeur: 0, cible: 4, unite: 'partenariats' },
      { nom: 'Projets R&D actifs', valeur: 0, cible: 5, unite: 'projets' },
    ],
  },
];

// ===== RISK MATRIX =====
export const AUDIT_RISKS: AuditRiskItem[] = [
  { id: 'RISK-001', axe: 'Business Model', risque: 'Concentration CA — 72% sur 3 offres, perte d\'un client majeur = -25% CA', probabilite: 65, impact: 92, score: 59.8, mitigation: 'Diversification offres + pipeline ×2 — Actions BMD-A01, DEV', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-002', axe: 'Cybersécurité', risque: 'Brèche de sécurité — 3 vulns OWASP critiques + CSP absent', probabilite: 55, impact: 98, score: 53.9, mitigation: 'Résolution OWASP + CSP — Actions CYS-A01, CYS-A02', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-003', axe: 'IA', risque: 'Non-conformité EU AI Act — amende jusqu\'à 7% CA global', probabilite: 45, impact: 95, score: 42.8, mitigation: 'Refactoring Digital Twin — Action IAK-A01', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-004', axe: 'Qualité Logicielle', risque: 'Régression majeure — couverture tests < 5%', probabilite: 70, impact: 85, score: 59.5, mitigation: 'Programme tests 5%→60% — Action QAL-A01', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-005', axe: 'Marché & Concurrence', risque: 'Disruption IA — perte du segment conformité de base', probabilite: 75, impact: 78, score: 58.5, mitigation: 'Stratégie IA-augmented consulting — Action MCO-A03', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-006', axe: 'Conformité', risque: 'Sanction COBAC — cartographie CEMAC 58/100', probabilite: 50, impact: 88, score: 44, mitigation: 'Couverture GABAC + COBAC R-2024/01 — Action REG-A03', statut: 'actif', criticite: 'eleve' },
  { id: 'RISK-007', axe: 'Développement Commercial', risque: 'Pipeline insuffisant — 12 deals, dépendance 3-4 clients', probabilite: 68, impact: 82, score: 55.8, mitigation: 'Pipeline ×2 — Action DEV dans plan Big Four', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-008', axe: 'SEO/GEO', risque: 'Perte de visibilité IA — SOV 38%, baisse trafic organique', probabilite: 72, impact: 75, score: 54, mitigation: 'Programme GEO — Action SGO-A01', statut: 'actif', criticite: 'eleve' },
  { id: 'RISK-009', axe: 'Données', risque: 'Fuite de données — 3 tables sans RLS', probabilite: 35, impact: 95, score: 33.3, mitigation: 'RLS 100% tables — Action DAT-A02', statut: 'mitige', criticite: 'eleve' },
  { id: 'RISK-010', axe: 'Infrastructure', risque: 'Plafond Supabase 100 edge functions atteint', probabilite: 85, impact: 68, score: 57.8, mitigation: 'Fusion edge functions 98→50 — Action ARC-A01', statut: 'actif', criticite: 'critique' },
  { id: 'RISK-011', axe: 'Innovation', risque: 'Retard innovation — 0 brevet, pas de budget R&D', probabilite: 60, impact: 72, score: 43.2, mitigation: 'Innovation Lab + brevets — Action INN-A01', statut: 'actif', criticite: 'eleve' },
  { id: 'RISK-012', axe: 'RH', risque: 'Fuite des talents — pression salariale Big Four', probabilite: 58, impact: 78, score: 45.2, mitigation: 'Plan rétention + equity — à définir', statut: 'mitige', criticite: 'eleve' },
  { id: 'RISK-013', axe: 'Réglementaire', risque: 'Évaluation mutuelle GAFI UEMOA 2027 — préparation insuffisante', probabilite: 42, impact: 85, score: 35.7, mitigation: 'Amélioration KYC/CDD PPE — Action REG-A01', statut: 'actif', criticite: 'eleve' },
  { id: 'RISK-014', axe: 'Performance', risque: 'Sous-utilisation consultants 77% — perte marge', probabilite: 75, impact: 62, score: 46.5, mitigation: 'Optimisation allocation — Action PER-A02', statut: 'actif', criticite: 'eleve' },
  { id: 'RISK-015', axe: 'Marketing', risque: 'MDP LinkedIn bloqué 60j — 0 contenu, perte visibilité', probabilite: 95, impact: 58, score: 55.1, mitigation: 'Déblocage MDP + plan B — Action MKT', statut: 'actif', criticite: 'critique' },
];

// ===== ROADMAPS =====
export const ROADMAP_12M: AuditRoadmapPhase[] = [
  {
    phase: 'Q3 2026 — Fondations Critiques', periode: 'Juil—Sep 2026',
    description: 'Résolution des vulnérabilités critiques et mise en place des fondamentaux. Focus : sécurité, conformité, architecture.',
    actions: [
      { action: 'Résoudre 5 gaps ISO 27001 critiques', axe: 'Cybersécurité', kpi: '114/114 contrôles' },
      { action: 'Déployer CSP + headers sécurité', axe: 'Cybersécurité', kpi: 'Observatory ≥ 95/100' },
      { action: 'Améliorer KYC/CDD PPE 65%→90%', axe: 'Conformité', kpi: 'Détection PPE ≥ 90%' },
      { action: 'Fusion edge functions 98→50', axe: 'Architecture', kpi: '50 fonctions max' },
      { action: 'Monitoring cron + alerting', axe: 'Automatisation', kpi: '100% crons monitorés' },
      { action: 'Tunnel conversion analytics complet', axe: 'Site Web', kpi: 'Tunnel mesuré de bout en bout' },
    ],
    score_projete: 81,
  },
  {
    phase: 'Q4 2026 — Accélération Qualité', periode: 'Oct—Dec 2026',
    description: 'Montée en qualité logicielle, certification, et croissance du pipeline. Focus : qualité, business model, innovation.',
    actions: [
      { action: 'CI/CD avec quality gates', axe: 'Qualité Logicielle', kpi: 'Pipeline CI/CD 5 gates' },
      { action: 'Déployer OKRs par BU', axe: 'Vision & Stratégie', kpi: '100% BUs OKRs' },
      { action: 'Lancer offre SaaS KOS Platform', axe: 'Business Model', kpi: 'Offre abonnement lancée' },
      { action: 'Lancer offre IA Governance', axe: 'Portefeuille Offres', kpi: '9ème offre active' },
      { action: 'Comité Scientifique Think Tank', axe: 'Think Tank', kpi: '5 experts, 1ère réunion' },
      { action: 'Mise en conformité EU AI Act', axe: 'IA', kpi: 'Digital Twin conforme' },
    ],
    score_projete: 85,
  },
  {
    phase: 'Q1 2027 — Certification & Croissance', periode: 'Jan—Mar 2027',
    description: 'Obtention des certifications internationales, accélération commerciale, expansion géographique.',
    actions: [
      { action: 'Certification ISO 37301 — Compliance', axe: 'Conformité', kpi: 'Certification obtenue' },
      { action: 'Programme GEO — SOV 38%→50%', axe: 'SEO/GEO', kpi: 'SOV 50%' },
      { action: 'Ouvrir bureau CEMAC (Douala)', axe: 'Business Model', kpi: 'Bureau opérationnel' },
      { action: 'Créer KHEPRA Innovation Lab', axe: 'Innovation', kpi: 'Lab opérationnel' },
      { action: 'NPS trimestriel + CSAT post-mission', axe: 'Performance', kpi: 'NPS ≥ 65' },
    ],
    score_projete: 88,
  },
];

export const ROADMAP_24M: AuditRoadmapPhase[] = [
  {
    phase: 'Q2-Q3 2027 — Consolidation', periode: 'Avr—Sep 2027',
    description: 'Consolidation des acquis, montée en puissance des certifications, automatisation avancée.',
    actions: [
      { action: 'Couverture tests 5%→60%', axe: 'Qualité Logicielle', kpi: 'Couverture ≥ 60%' },
      { action: 'Automatiser production 4 offres', axe: 'Portefeuille Offres', kpi: 'Score automatisation 65%' },
      { action: 'Knowledge Graph 150+ entités', axe: 'SEO/GEO', kpi: '150+ entités' },
      { action: 'Dashboard automation unifié', axe: 'Automatisation', kpi: '100% workflows monitorés' },
      { action: 'Portail public Think Tank', axe: 'Think Tank', kpi: '5 000 visites/mois' },
    ],
    score_projete: 91,
  },
  {
    phase: 'Q4 2027-Q2 2028 — Excellence', periode: 'Oct 2027—Juin 2028',
    description: 'Atteinte du niveau d\'excellence. Positionnement comme leader africain incontesté.',
    actions: [
      { action: 'GraphRAG réglementaire déployé', axe: 'IA', kpi: 'Précision +25%, hallucinations -50%' },
      { action: 'Productivité CA/consultant 120M', axe: 'Performance', kpi: '120M FCFA/consultant' },
      { action: 'Feature snippets 52→150', axe: 'SEO/GEO', kpi: '150 snippets' },
      { action: 'Dépôt 3 brevets méthodologiques', axe: 'Innovation', kpi: '3 brevets' },
      { action: 'Data catalog KOS complet', axe: 'Données', kpi: '100% tables documentées' },
    ],
    score_projete: 94,
  },
];

export const ROADMAP_36M: AuditRoadmapPhase[] = [
  {
    phase: 'H2 2028 — Rayonnement', periode: 'Juil—Dec 2028',
    description: 'Rayonnement international. Partenariats stratégiques. Expansion anglophone.',
    actions: [
      { action: 'Score global ≥ 95/100 — Big Four Certified', axe: 'Global', kpi: 'Tous axes ≥ 90' },
      { action: 'Partenariat Harvard/LSE', axe: 'Innovation', kpi: '2 partenariats top 10' },
      { action: 'Expansion Ghana + Nigeria', axe: 'Business Model', kpi: 'Bureaux 2 pays anglophones' },
      { action: '10 baromètres actifs', axe: 'Production Intellectuelle', kpi: '10 baromètres, 50K tél./an' },
    ],
    score_projete: 96,
  },
  {
    phase: '2029 — Leadership Global', periode: 'Jan—Dec 2029',
    description: 'Reconnaissance internationale. Référence africaine de la régulation financière.',
    actions: [
      { action: 'Score global ≥ 98/100 — AAAA+ Supreme', axe: 'Global', kpi: 'Certification AAAA+' },
      { action: 'Pipeline ≥ 20 Md FCFA, CA ≥ 10 Md', axe: 'Business Model', kpi: 'CA ×2, équipe 100+ consultants' },
      { action: 'Citations académiques ≥ 5 000', axe: 'Production Intellectuelle', kpi: '5 000 citations' },
      { action: '5 brevets, Innovation Lab reconnu', axe: 'Innovation', kpi: '5 brevets, lab de référence' },
    ],
    score_projete: 98,
  },
];

// ===== EXECUTIVE REPORT =====
export const EXECUTIVE_REPORT: ExecutiveReport = {
  score_global: 75.8,
  score_cible: 95,
  ecart_global: 19.2,
  axes_en_excellence: 0,
  axes_surveillance: 8,
  axes_action: 10,
  axes_critique: 2,
  certification: 'EN COURS — Score global 75.8/100. Cible certification Big Four : 95/100. Écart : 19.2 points. Projection : 88/100 en 12 mois (Q1 2027), 94/100 en 24 mois (Q2 2028), 98/100 en 36 mois (2029).',
  recommandations: [
    'URGENCE ABSOLUE — Résoudre les 5 vulnérabilités critiques immédiates : gaps ISO 27001, OWASP critiques, CSP absent, KYC/CDD PPE < 90%, MDP LinkedIn bloqué. Ces 5 actions représentent 80% du risque existant.',
    'PRIORITÉ 1 — Lancer le programme de tests (couverture 5%→60%), déployer le CI/CD avec quality gates, et réduire la dette technique. Sans cela, toute nouvelle fonctionnalité augmente le risque de régression.',
    'PRIORITÉ 2 — Diversifier le business model : lancer l\'offre SaaS KOS Platform (abonnement) et l\'offre IA Governance. La concentration du CA sur 3 offres est un risque existentiel.',
    'PRIORITÉ 3 — Fusionner les 98 edge functions en 50 via le programme de consolidation architecturale. Le plafond Supabase atteint bloque tout nouveau déploiement.',
    'TRANSFORMATION — Budget total estimé sur 36 mois : 450 000 000 FCFA. ROI projeté : ×6 (CA additionnel estimé 2.7 Md FCFA sur 3 ans).',
    'GOUVERNANCE — Créer un Bureau de Transformation Enterprise (ETO) dédié au suivi de cette roadmap avec revue mensuelle COMEX et dashboard KOS live.',
  ],
  trajectoire: 'KOS passera de 75.8/100 à 88/100 en 12 mois (résolution des vulnérabilités critiques), 94/100 en 24 mois (certifications, automatisation, expansion), et 98/100 en 36 mois (excellence, leadership continental). La trajectoire est ambitieuse mais réaliste — elle exige une discipline d\'exécution de niveau Big Four et un investissement soutenu de 150M FCFA/an.',
  budget_total: '450 000 000 FCFA (sur 36 mois)',
  roi_projete: '×6 — CA additionnel estimé 2.7 Md FCFA',
  duree_transformation: '36 mois (3 phases de 12 mois)',
};

// ===== COMPUTED KPIS =====
export function computeAssessmentKPIs() {
  const axes = AXES_AUDIT;
  const scoreGlobal = Math.round(axes.reduce((s, a) => s + a.score_actuel, 0) / axes.length * 10) / 10;
  const riskScore = AUDIT_RISKS.reduce((s, r) => s + r.score, 0) / AUDIT_RISKS.length;

  return {
    score_global: scoreGlobal,
    score_cible: 95,
    ecart_global: Math.round((95 - scoreGlobal) * 10) / 10,
    axes_total: 20,
    axes_excellence: axes.filter(a => a.score_actuel >= 90).length,
    axes_maitrise: axes.filter(a => a.score_actuel >= 80 && a.score_actuel < 90).length,
    axes_surveillance: axes.filter(a => a.score_actuel >= 70 && a.score_actuel < 80).length,
    axes_action: axes.filter(a => a.score_actuel >= 60 && a.score_actuel < 70).length,
    axes_critique: axes.filter(a => a.score_actuel < 60).length,
    maturite_moyenne: Math.round(axes.reduce((s, a) => s + a.maturite, 0) / axes.length * 10) / 10,
    risques_total: AUDIT_RISKS.length,
    risques_critiques: AUDIT_RISKS.filter(r => r.criticite === 'critique').length,
    risques_actifs: AUDIT_RISKS.filter(r => r.statut === 'actif').length,
    risque_moyen: Math.round(riskScore * 10) / 10,
    actions_totales: axes.reduce((s, a) => s + a.actions.length, 0),
    actions_p0: axes.reduce((s, a) => s + a.actions.filter(ac => ac.priorite === 'P0').length, 0),
    actions_p1: axes.reduce((s, a) => s + a.actions.filter(ac => ac.priorite === 'P1').length, 0),
    actions_p2: axes.reduce((s, a) => s + a.actions.filter(ac => ac.priorite === 'P2').length, 0),
    budget_total_12m: '224 500 000 FCFA',
    budget_total_24m: '385 000 000 FCFA',
    budget_total_36m: '450 000 000 FCFA',
    criteres_total: axes.reduce((s, a) => s + a.criteres.length, 0),
  };
}

export const ASSESSMENT_META = {
  auditId: 'KOS-ETA360-2026-06-26-001',
  auditDate: '2026-06-26',
  auditType: 'Enterprise Transformation Assessment 360°',
  assessor: 'KOS Autonomous Audit Engine — Mandat Managing Partner',
  scope: '20 axes · 120 critères · 60 actions correctives · 15 risques · 6 livrables · SWOT · PESTEL · Benchmark',
  methodology: 'ISO 9001 · ISO 27001 · ISO 31000 · COSO ERM · COBIT · ITIL · NIST CSF · TOGAF · PMBOK · BABOK · OWASP ASVS · OHADA · BCEAO · COBAC · CIMA · IFC PS · ISSB · GRI',
  status: 'EXECUTED',
  nextAuditScheduled: '2026-09-26',
};





