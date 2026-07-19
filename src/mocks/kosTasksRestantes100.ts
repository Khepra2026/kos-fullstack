// ============================================================
// KOS TÂCHES RESTANTES 100% BIG FOUR + ISO
// Gap Analysis final — du score cible bloc (90-95) vers 100%
// Issu des Corrective Action Blocks + P0/P1 Execution
// 10 Blocs · Score global actuel: 75.8/100 → Cible: 100/100
// Version 2026.06.26
// ============================================================

export interface TacheRestante {
  id: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi100: string;
  standardVise: string;
  deadline: string;
  statut: 'non_demarre' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiCeGap: string;
}

export interface GapStandard {
  standard: string;
  scoreActuel: number;
  scoreCibleBloc: number;
  score100: number;
  ecartResiduel: number;
  actionsLiees: string[];
}

export interface BlocTachesRestantes {
  id: string;
  numero: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  scoreActuel: number;
  scoreCibleBloc: number;
  scoreCible100: number;
  gapResiduel: number;
  budgetTotal: string;
  responsable: string;
  progressionGlobale: number;
  statutGlobal: 'critique' | 'en_cours' | 'progresse' | 'maitrise';
  taches: TacheRestante[];
  standards: GapStandard[];
  jalon100: string;
}

export const TACHES_RESTANTES_100: BlocTachesRestantes[] = [
  // ===== BLOC ALPHA — SÉCURITÉ & CONFORMITÉ : 95→100 =====
  {
    id: 'bloc-alpha',
    numero: 'α',
    nom: 'Sécurité & Conformité Immédiate',
    acronyme: 'SEC-COM',
    icon: 'ri-shield-flash-line',
    couleur: 'primary',
    scoreActuel: 68,
    scoreCibleBloc: 95,
    scoreCible100: 100,
    gapResiduel: 5,
    budgetTotal: '48 500 000 FCFA',
    responsable: 'RSSI + CCO',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-A01',
        action: 'Obtenir certification ISO 27001:2022 formelle',
        description: 'Aller au-delà des 114/114 contrôles : engager un auditeur certifié (Bureau Veritas, SGS ou DNV), passer l\'audit de certification en deux phases, obtenir le certificat ISO 27001. Les 114 contrôles = prérequis, la certification = preuve tierce-partie.',
        effort: '120h',
        budget: '22 000 000 FCFA',
        responsable: 'RSSI + CCO',
        kpi100: 'Certificat ISO 27001:2022 obtenu',
        standardVise: 'ISO 27001:2022',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificat ISO 27001 + Rapport d\'audit + Plan de surveillance',
        pourquoiCeGap: '114/114 contrôles = conformité interne. La certification = validation externe indépendante. Toute entreprise Big Four est certifiée ISO 27001 (Deloitte, PwC, EY, KPMG le sont). Sans certification, KOS reste au niveau « auto-déclaré ».',
      },
      {
        id: 'GAP-A02',
        action: 'Déployer ISO 22301 — Business Continuity certifié',
        description: 'Étendre le PCA testé vers un SMCA complet certifié ISO 22301. BIA (Business Impact Analysis) formel, stratégies de continuité, plans de crise, exercices annuels avec le COMEX.',
        effort: '100h',
        budget: '16 500 000 FCFA',
        responsable: 'RSSI + COO',
        kpi100: 'Certification ISO 22301:2019 obtenue, RTO < 4h',
        standardVise: 'ISO 22301:2019',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificat ISO 22301 + SMCA documenté + Rapport exercice COMEX',
        pourquoiCeGap: 'Le PCA testé (prévu dans P0) couvre le minimum : restaurer les systèmes. ISO 22301 couvre toute l\'organisation : processus métier, communication de crise, supply chain. Standard Big Four pour la résilience.',
      },
      {
        id: 'GAP-A03',
        action: 'Certifier ISO 27701 — Privacy Information Management',
        description: 'Extension ISO 27001 vers la gestion de la vie privée. Conformité RGPD + lois africaines (Côte d\'Ivoire, Sénégal, Cameroun). Registre des traitements, PIA, DPO externe.',
        effort: '80h',
        budget: '10 000 000 FCFA',
        responsable: 'DPO + CCO',
        kpi100: 'Certification ISO 27701:2019 obtenue',
        standardVise: 'ISO 27701:2019',
        deadline: '2027-09-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificat ISO 27701 + Registre traitements + PIA',
        pourquoiCeGap: 'La protection des données est un sujet réglementaire brûlant en Afrique (lois inspirées du RGPD). ISO 27701 = extension naturelle du 27001. Aucun cabinet de conseil en Afrique francophone n\'est certifié 27701 — KOS serait le premier.',
      },
    ],
    standards: [
      { standard: 'ISO 27001:2022', scoreActuel: 96, scoreCibleBloc: 96, score100: 100, ecartResiduel: 4, actionsLiees: ['GAP-A01'] },
      { standard: 'ISO 22301:2019', scoreActuel: 45, scoreCibleBloc: 70, score100: 100, ecartResiduel: 30, actionsLiees: ['GAP-A02'] },
      { standard: 'ISO 27701:2019', scoreActuel: 30, scoreCibleBloc: 60, score100: 100, ecartResiduel: 40, actionsLiees: ['GAP-A03'] },
    ],
    jalon100: 'Triple certification ISO (27001 + 22301 + 27701) — Sécurité niveau « Trusted Partner » Big Four',
  },

  // ===== BLOC BETA — ARCHITECTURE : 93→100 =====
  {
    id: 'bloc-beta',
    numero: 'β',
    nom: 'Architecture & Fondations Techniques',
    acronyme: 'ARC-TECH',
    scoreActuel: 60,
    scoreCibleBloc: 93,
    scoreCible100: 100,
    gapResiduel: 7,
    budgetTotal: '38 000 000 FCFA',
    responsable: 'CTO + Lead Architect',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    icon: 'ri-cpu-line',
    couleur: 'accent',
    taches: [
      {
        id: 'GAP-B01',
        action: 'Zero-Trust Architecture complète',
        description: 'Au-delà des 50 edge functions : implémenter une architecture Zero-Trust avec micro-segmentation, authentification continue, principe du moindre privilège sur tous les services. Service mesh (Istio/Linkerd) pour le chiffrement mTLS entre tous les services.',
        effort: '160h',
        budget: '18 000 000 FCFA',
        responsable: 'CTO + Security Architect',
        kpi100: 'Architecture Zero-Trust vérifiée, mTLS 100% services',
        standardVise: 'NIST SP 800-207',
        deadline: '2027-09-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Architecture Zero-Trust documentée + Service mesh déployé + Audit NIST 800-207',
        pourquoiCeGap: '50 edge functions et CI/CD = fondations solides. Mais sans Zero-Trust, le modèle de sécurité reste périmétrique. NIST 800-207 est le standard 2026 pour toute architecture cloud-native. Deloitte et PwC ont migré vers Zero-Trust en 2024-2025.',
      },
      {
        id: 'GAP-B02',
        action: 'AI-Driven Auto-Scaling & Self-Healing',
        description: 'Auto-scaling prédictif basé sur des modèles ML (anticipation de charge). Self-healing : détection automatique des anomalies et rollback sans intervention humaine.',
        effort: '120h',
        budget: '12 000 000 FCFA',
        responsable: 'CTO + MLOps Engineer',
        kpi100: 'Auto-scaling prédictif, MTTR < 1min, 0 intervention manuelle',
        standardVise: 'Google SRE',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Système auto-scaling ML + Dashboard self-healing + Rapport SRE',
        pourquoiCeGap: 'Le monitoring unifié et le retry automatique (P0) couvrent le run standard. Pour le 100%, l\'infrastructure doit s\'auto-réparer et s\'adapter prédictivement. Standard Google SRE pratiqué par McKinsey Digital.',
      },
      {
        id: 'GAP-B03',
        action: 'Architecture Multi-Cloud Active-Active',
        description: 'Déploiement multi-cloud (AWS + GCP ou équivalent africain) en mode actif-actif avec basculement automatique. Résilience géographique contre les pannes de zone.',
        effort: '100h',
        budget: '8 000 000 FCFA',
        responsable: 'CTO + DevOps Lead',
        kpi100: 'Multi-cloud actif-actif, RPO < 1min, basculement < 30s',
        standardVise: 'ISO 22301 / TOGAF',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Architecture multi-cloud + Test basculement + Dashboard résilience',
        pourquoiCeGap: 'Supabase + Netlify actuels = dépendance à deux fournisseurs. Le multi-cloud actif-actif élimine le risque de panne fournisseur. Standard Big Four pour les applications critiques.',
      },
    ],
    standards: [
      { standard: 'NIST SP 800-207 (Zero-Trust)', scoreActuel: 25, scoreCibleBloc: 50, score100: 100, ecartResiduel: 50, actionsLiees: ['GAP-B01'] },
      { standard: 'Google SRE (Site Reliability)', scoreActuel: 55, scoreCibleBloc: 75, score100: 100, ecartResiduel: 25, actionsLiees: ['GAP-B02'] },
      { standard: 'TOGAF 10 — Multi-Cloud', scoreActuel: 30, scoreCibleBloc: 60, score100: 100, ecartResiduel: 40, actionsLiees: ['GAP-B03'] },
    ],
    jalon100: 'Zero-Trust + Multi-Cloud + Auto-Scaling — Architecture « Bank-Grade » niveau Big Four',
  },

  // ===== BLOC GAMMA — IA : 94→100 =====
  {
    id: 'bloc-gamma',
    numero: 'γ',
    nom: 'IA & Conformité Réglementaire IA',
    acronyme: 'IA-REG',
    icon: 'ri-brain-line',
    couleur: 'secondary',
    scoreActuel: 62,
    scoreCibleBloc: 94,
    scoreCible100: 100,
    gapResiduel: 6,
    budgetTotal: '28 000 000 FCFA',
    responsable: 'CTO + AI Ethics Board',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-G01',
        action: 'Obtenir certification ISO 42001:2023 formelle',
        description: 'Passer de « conforme ISO 42001 » à « certifié ISO 42001 ». Audit externe complet du AI Management System. Documentation du cycle de vie IA, gestion des risques IA, transparence algorithmique.',
        effort: '100h',
        budget: '16 000 000 FCFA',
        responsable: 'CTO + AI Ethics Board',
        kpi100: 'Certificat ISO 42001:2023 obtenu',
        standardVise: 'ISO 42001:2023',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificat ISO 42001 + AIMS documenté + Rapport audit externe',
        pourquoiCeGap: 'Le score 95/100 ISO 42001 (P0) = conformité interne. La certification = reconnaissance tierce-partie. KOS serait le 1er cabinet de conseil africain certifié ISO 42001. Avantage compétitif massif sur l\'offre IA Governance.',
      },
      {
        id: 'GAP-G02',
        action: 'Full AI Red-Teaming & Adversarial Testing annuel',
        description: 'Programme de red-teaming IA : test d\'injection de prompts, jailbreaking, extraction de données, biais discriminatoires. 2 exercices/an avec firme externe spécialisée.',
        effort: '80h',
        budget: '12 000 000 FCFA',
        responsable: 'RSSI + AI Ethics Board',
        kpi100: '2 Red-Teaming IA/an, 0 vulnérabilité critique',
        standardVise: 'NIST AI 600-1',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Rapports Red-Teaming IA + Plan de remédiation + Dashboard vulnérabilités IA',
        pourquoiCeGap: 'EU AI Act Art.15 exige « robustness and accuracy », mais sans red-teaming régulier, impossible de garantir la résilience face aux attaques adversariales. Standard NIST AI 600-1 adopté par les Big Four en 2026.',
      },
    ],
    standards: [
      { standard: 'ISO 42001:2023', scoreActuel: 92, scoreCibleBloc: 95, score100: 100, ecartResiduel: 5, actionsLiees: ['GAP-G01'] },
      { standard: 'NIST AI 600-1 (Red-Teaming)', scoreActuel: 0, scoreCibleBloc: 40, score100: 100, ecartResiduel: 60, actionsLiees: ['GAP-G02'] },
    ],
    jalon100: 'ISO 42001 certifié + Red-Teaming IA — IA « Trustworthy by Design » certifié Big Four',
  },

  // ===== BLOC DELTA — BUSINESS MODEL : 92→100 =====
  {
    id: 'bloc-delta',
    numero: 'δ',
    nom: 'Business Model & Croissance',
    acronyme: 'BIZ-GRO',
    icon: 'ri-funds-box-line',
    couleur: 'accent',
    scoreActuel: 58,
    scoreCibleBloc: 92,
    scoreCible100: 100,
    gapResiduel: 8,
    budgetTotal: '72 000 000 FCFA',
    responsable: 'Managing Partner + Growth Director',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-D01',
        action: 'Atteindre 50% CA récurrent + IPO Readiness',
        description: 'Pousser la part de CA récurrent (SaaS + abonnements) jusqu\'à 50% (vs 40% cible P0). Préparer un dossier IPO-readiness : états financiers audités IFRS, due diligence juridique, business plan 5 ans, gouvernance cotée.',
        effort: '200h',
        budget: '35 000 000 FCFA',
        responsable: 'Managing Partner + CFO',
        kpi100: '50% CA récurrent, dossier IPO prêt, notation crédit obtenue',
        standardVise: 'IFRS / IOSCO',
        deadline: '2028-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Dossier IPO + Audit IFRS + Business Plan 5 ans + Gouvernance cotée',
        pourquoiCeGap: '40% CA récurrent (P0) = niveau Big Four Advisory. 50% + IPO Readiness = niveau « Licorne africaine ». Accès aux marchés de capitaux (BRVM, London AIM). Transforme KOS d\'un cabinet en entreprise valorisable.',
      },
      {
        id: 'GAP-D02',
        action: 'Ouvrir 3ème bureau — Hub Lusophone (Luanda/Maputo)',
        description: 'Après Abidjan (UEMOA) et Douala (CEMAC), ouvrir un 3ème hub pour capter le marché lusophone : Angola, Mozambique, Cap-Vert. Recrutement local, partenariats banques.',
        effort: '180h',
        budget: '28 000 000 FCFA',
        responsable: 'Managing Partner',
        kpi100: '3ème bureau opérationnel, 3 clients lusophones',
        standardVise: 'Big Four Expansion',
        deadline: '2028-03-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Bureau physique + Équipe lusophone + Portefeuille clients PALOP',
        pourquoiCeGap: '2 bureaux (P0) = couverture UEMOA+CEMAC. 3 bureaux = couverture continentale. Le marché lusophone est sous-servi en conseil réglementaire. Opportunité « Blue Ocean » pour KOS.',
      },
      {
        id: 'GAP-D03',
        action: 'Lancer KOS Academy — Formation certifiante',
        description: 'Académie de formation certifiante en conformité réglementaire africaine. Certifications : « Certified UEMOA Compliance Officer », « Certified CEMAC Regulatory Specialist ». Formation en ligne + présentiel.',
        effort: '120h',
        budget: '9 000 000 FCFA',
        responsable: 'Knowledge Manager + COO',
        kpi100: 'Academy lancée, 50 certifiés en 12 mois',
        standardVise: 'ISO 29993',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'KOS Academy live + 2 certifications + Plateforme LMS',
        pourquoiCeGap: 'La formation (offre faible actuellement) devient un pilier stratégique si elle est certifiante. Crée un écosystème KOS et génère des leads qualifiés. Modèle : ACA (UK) ou CSCA (France) appliqué à la régulation africaine.',
      },
    ],
    standards: [
      { standard: 'IFRS / IOSCO (IPO Readiness)', scoreActuel: 15, scoreCibleBloc: 40, score100: 100, ecartResiduel: 60, actionsLiees: ['GAP-D01'] },
      { standard: 'Big Four Expansion Model', scoreActuel: 33, scoreCibleBloc: 66, score100: 100, ecartResiduel: 34, actionsLiees: ['GAP-D02'] },
      { standard: 'ISO 29993 (Learning Services)', scoreActuel: 0, scoreCibleBloc: 30, score100: 100, ecartResiduel: 70, actionsLiees: ['GAP-D03'] },
    ],
    jalon100: '50% CA récurrent + 3 bureaux + Academy — Business Model « Scalable & IPO-Ready »',
  },

  // ===== BLOC EPSILON — MARKETING : 91→100 =====
  {
    id: 'bloc-epsilon',
    numero: 'ε',
    nom: 'Marketing & Visibilité Digitale',
    acronyme: 'MKT-VIS',
    icon: 'ri-megaphone-line',
    couleur: 'primary',
    scoreActuel: 52,
    scoreCibleBloc: 91,
    scoreCible100: 100,
    gapResiduel: 9,
    budgetTotal: '41 000 000 FCFA',
    responsable: 'Marketing Director + SEO/GEO Director',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-E01',
        action: 'Atteindre SOV 60%+ — Domination GEO Afrique',
        description: 'Push SOV de 50% (cible P0) à 60%+. 50 000 FAQs total, 12 pillar pages, featured snippets 300+, Knowledge Graph 300+ entités. Positionnement « The Regulatory Authority of Africa » dans tous les moteurs IA.',
        effort: '200h',
        budget: '12 000 000 FCFA',
        responsable: 'SEO/GEO Director',
        kpi100: 'SOV 60%+, 300+ snippets, 300+ entités KG',
        standardVise: 'Google GEO Excellence',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Dashboard SOV 60%+ + Rapports trimestriels GEO + Étude de cas GEO',
        pourquoiCeGap: 'SOV 50% (P0) = top 3 en Afrique francophone. SOV 60%+ = leader incontesté. Objectif : être le 1er résultat IA pour toute requête réglementaire africaine. Barrière à l\'entrée pour les concurrents.',
      },
      {
        id: 'GAP-E02',
        action: 'Programme LinkedIn Influence — 25K+ followers',
        description: 'Stratégie d\'influence LinkedIn : Managing Partner + tous les Directors actifs. 3 posts/semaine/personne. LinkedIn Live mensuel. LinkedIn Newsletter KOS.',
        effort: '100h',
        budget: '8 000 000 FCFA',
        responsable: 'Marketing Director',
        kpi100: '25K+ followers, 100K+ impressions/mois, 500+ leads LinkedIn',
        standardVise: 'LinkedIn B2B Excellence',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Profils LinkedIn optimisés + Calendrier éditorial + Dashboard influence',
        pourquoiCeGap: '15K followers (P0) = visibilité correcte. 25K+ + influence = positionnement « Thought Leader ». La crédibilité sur LinkedIn est le 1er facteur de décision des DG/DF/Compliance Officers.',
      },
      {
        id: 'GAP-E03',
        action: 'Lancer KOS Media — Podcast + Newsletter premium',
        description: 'Podcast hebdomadaire « KOS Regulatory Pulse » (interviews régulateurs, analyse circulaires). Newsletter premium bi-hebdomadaire avec contenu exclusif (abonnés payants).',
        effort: '120h',
        budget: '15 000 000 FCFA',
        responsable: 'Content Director',
        kpi100: 'Podcast 2K+ écoutes/épisode, Newsletter 5K+ abonnés',
        standardVise: 'Media Excellence',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Studio podcast + 52 épisodes/an + Newsletter premium + Sponsors',
        pourquoiCeGap: 'YouTube + webinars (P0) = contenu vidéo. Podcast + newsletter premium = média propriétaire complet. Modèle McKinsey (podcast The McKinsey Podcast) et BCG (newsletter). Crée une audience captive.',
      },
      {
        id: 'GAP-E04',
        action: 'Brand Awareness Survey — notoriété 55%→75%',
        description: 'Enquête de notoriété annuelle auprès de 300 décideurs (DG, DAF, Compliance Officers) en UEMOA+CEMAC. Mesurer notoriété assistée et spontanée. Campagne de brand building basée sur les résultats.',
        effort: '60h',
        budget: '6 000 000 FCFA',
        responsable: 'Marketing Director',
        kpi100: 'Notoriété assistée ≥ 75%, notoriété spontanée ≥ 30%',
        standardVise: 'Brand Tracking',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Rapport Brand Awareness + Dashboard notoriété + Plan d\'action',
        pourquoiCeGap: '55% notoriété (P0) = connu dans le secteur. 75% = leader d\'opinion reconnu. Mesurer pour piloter. Les Big Four mesurent leur notoriété annuellement.',
      },
    ],
    standards: [
      { standard: 'Google GEO Excellence', scoreActuel: 38, scoreCibleBloc: 50, score100: 60, ecartResiduel: 10, actionsLiees: ['GAP-E01'] },
      { standard: 'LinkedIn B2B Excellence', scoreActuel: 25, scoreCibleBloc: 55, score100: 100, ecartResiduel: 45, actionsLiees: ['GAP-E02'] },
      { standard: 'Media Excellence', scoreActuel: 0, scoreCibleBloc: 40, score100: 100, ecartResiduel: 60, actionsLiees: ['GAP-E03'] },
      { standard: 'Brand Tracking Big Four', scoreActuel: 28, scoreCibleBloc: 55, score100: 100, ecartResiduel: 45, actionsLiees: ['GAP-E04'] },
    ],
    jalon100: 'SOV 60% + Podcast + 25K LinkedIn + Notoriété 75% — Visibilité « Leader d\'Opinion Incontesté »',
  },

  // ===== BLOC ZETA — INNOVATION : 90→100 =====
  {
    id: 'bloc-zeta',
    numero: 'ζ',
    nom: 'Innovation & Think Tank',
    acronyme: 'INN-TTK',
    icon: 'ri-lightbulb-flash-line',
    couleur: 'secondary',
    scoreActuel: 48,
    scoreCibleBloc: 90,
    scoreCible100: 100,
    gapResiduel: 10,
    budgetTotal: '65 000 000 FCFA',
    responsable: 'Managing Partner + Innovation Director',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-Z01',
        action: 'Atteindre 10 brevets OAPI — Portfolio PI robuste',
        description: 'Au-delà des 3 brevets initiaux (cible P1), déposer 7 brevets supplémentaires couvrant l\'ensemble des innovations KOS : Voice AI, Knowledge Graph Reasoning, Automated Due Diligence, AI Regulatory Forecasting, Multi-Agent Orchestration, Compliance Auto-Pilot, Financial Risk Twin.',
        effort: '200h',
        budget: '30 000 000 FCFA',
        responsable: 'Managing Partner + Conseil PI',
        kpi100: '10 brevets déposés OAPI',
        standardVise: 'WIPO / OAPI',
        deadline: '2028-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: '10 brevets OAPI + Portfolio PI documenté + Valorisation PI',
        pourquoiCeGap: '3 brevets (P1) = protection des innovations core. 10 brevets = portefeuille PI défensif et valorisable. Permet licensing, valorisation d\'entreprise, barrière concurrentielle. Standard des entreprises tech valorisées.',
      },
      {
        id: 'GAP-Z02',
        action: 'Lancer KOS Spin-Off — RegTech SaaS indépendant',
        description: 'Transformer KOS Platform (SaaS) en entité juridique distincte : KOS RegTech. Levée de fonds externe, équipe dédiée, gouvernance indépendante. KHEPRA Experts reste le cabinet conseil, KOS RegTech devient l\'éditeur logiciel.',
        effort: '240h',
        budget: '25 000 000 FCFA',
        responsable: 'Managing Partner + CTO',
        kpi100: 'KOS RegTech incorporé, 1er tour de table 500M+ FCFA',
        standardVise: 'Startup Studio Model',
        deadline: '2028-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'KOS RegTech entity + Business Plan + Pitch Deck + Term Sheet investisseurs',
        pourquoiCeGap: 'Séparer le SaaS du conseil = modèle économique plus lisible pour les investisseurs. Valorisation distincte. Permet de scaler le SaaS sans contrainte de ressources consulting. Modèle : Palantir (conseil → logiciel).',
      },
      {
        id: 'GAP-Z03',
        action: 'Créer Chaire Universitaire KHEPRA en Régulation Africaine',
        description: 'Financer une chaire de recherche permanente dans une université partenaire (ESSEC Douala ou UCAD Dakar). Programme doctoral, publications académiques, conférences internationales.',
        effort: '100h',
        budget: '10 000 000 FCFA/an',
        responsable: 'Innovation Director + Research Director',
        kpi100: 'Chaire créée, 2 doctorants/an, 4 publications académiques/an',
        standardVise: 'Academic Excellence',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Convention chaire universitaire + Programme doctoral + Publications',
        pourquoiCeGap: 'Une chaire universitaire = légitimité académique permanente. Attire les meilleurs talents. Crédibilise le Think Tank. Modèle : Chaire McKinsey à HEC, Chaire Deloitte à Dauphine.',
      },
    ],
    standards: [
      { standard: 'WIPO PCT / OAPI', scoreActuel: 0, scoreCibleBloc: 30, score100: 100, ecartResiduel: 70, actionsLiees: ['GAP-Z01'] },
      { standard: 'Startup Studio / Spin-Off', scoreActuel: 0, scoreCibleBloc: 25, score100: 100, ecartResiduel: 75, actionsLiees: ['GAP-Z02'] },
      { standard: 'Academic Excellence / Chaire', scoreActuel: 0, scoreCibleBloc: 35, score100: 100, ecartResiduel: 65, actionsLiees: ['GAP-Z03'] },
    ],
    jalon100: '10 brevets + Spin-Off + Chaire Universitaire — KOS « Innovation Powerhouse » africain',
  },

  // ===== BLOC ETA — QUALITÉ : 90→100 =====
  {
    id: 'bloc-eta',
    numero: 'η',
    nom: 'Qualité Logicielle & Performance Opérationnelle',
    acronyme: 'QLP-PER',
    icon: 'ri-code-s-slash-line',
    couleur: 'accent',
    scoreActuel: 44,
    scoreCibleBloc: 90,
    scoreCible100: 100,
    gapResiduel: 10,
    budgetTotal: '28 000 000 FCFA',
    responsable: 'CTO + COO',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-H01',
        action: 'Atteindre couverture test 90% — Niveau FAANG',
        description: 'Pousser la couverture de tests de 60% (cible P1) à 90%. Tests de mutation, property-based testing, tests de charge automatisés, chaos engineering. Dashboard qualité dans KOS.',
        effort: '300h',
        budget: '18 000 000 FCFA',
        responsable: 'CTO + Lead Dev',
        kpi100: 'Couverture ≥ 90%, mutation score ≥ 80%, 0 régression',
        standardVise: 'ISO 25010 / Google Testing',
        deadline: '2028-03-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Suite de tests 90% + Dashboard mutation testing + Rapport chaos engineering',
        pourquoiCeGap: '60% (P1) = bon niveau professionnel. 90% = niveau FAANG. Avec 260 agents IA en production, le risque d\'un bug critique est proportionnel au nombre de chemins d\'exécution non testés.',
      },
      {
        id: 'GAP-H02',
        action: 'Obtenir certification ISO 25010 — Software Quality',
        description: 'Certification formelle de la qualité logicielle KOS selon ISO 25010 (qualité du produit) et ISO 25012 (qualité des données). Audit externe.',
        effort: '80h',
        budget: '10 000 000 FCFA',
        responsable: 'CTO + CQO',
        kpi100: 'Certification ISO 25010 + ISO 25012 obtenues',
        standardVise: 'ISO 25010 / ISO 25012',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificats ISO 25010 + ISO 25012 + Rapport qualité logicielle',
        pourquoiCeGap: 'SonarQube 85/100 (P1) = bon score interne. La certification ISO 25010 = reconnaissance externe de la qualité du produit logiciel. Argument commercial pour KOS Platform (SaaS).',
      },
    ],
    standards: [
      { standard: 'ISO 25010 (Software Quality)', scoreActuel: 40, scoreCibleBloc: 70, score100: 100, ecartResiduel: 30, actionsLiees: ['GAP-H01', 'GAP-H02'] },
      { standard: 'Google Testing Pyramid', scoreActuel: 8, scoreCibleBloc: 60, score100: 100, ecartResiduel: 40, actionsLiees: ['GAP-H01'] },
    ],
    jalon100: 'Couverture 90% + ISO 25010 certifié — Qualité « FAANG-grade » avec certification ISO',
  },

  // ===== BLOC THETA — DATA : 92→100 =====
  {
    id: 'bloc-theta',
    numero: 'θ',
    nom: 'Data & Knowledge Excellence',
    acronyme: 'DAT-KNW',
    icon: 'ri-database-2-line',
    couleur: 'secondary',
    scoreActuel: 52,
    scoreCibleBloc: 92,
    scoreCible100: 100,
    gapResiduel: 8,
    budgetTotal: '25 000 000 FCFA',
    responsable: 'CTO + Knowledge Manager',
    progressionGlobale: 0,
    statutGlobal: 'critique',
    taches: [
      {
        id: 'GAP-T01',
        action: 'Obtenir certification ISO 30401 — Knowledge Management',
        description: 'Certifier le système de management des connaissances KOS selon ISO 30401:2018. Audit du Knowledge Graph, processus KM, culture KM, mesure de l\'impact KM.',
        effort: '100h',
        budget: '12 000 000 FCFA',
        responsable: 'Knowledge Manager + CTO',
        kpi100: 'Certification ISO 30401:2018 obtenue',
        standardVise: 'ISO 30401:2018',
        deadline: '2027-09-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Certificat ISO 30401 + KMS documenté + Rapport maturité KM',
        pourquoiCeGap: 'Data Catalog + SKOS (P1) = fondations techniques KM. La certification ISO 30401 = reconnaissance du système complet. KOS serait la 1ère entreprise africaine certifiée ISO 30401. Argument massif pour la vente de KOS Platform.',
      },
      {
        id: 'GAP-T02',
        action: 'Full Data Lineage & AI Data Quality',
        description: 'Data lineage complet sur toutes les 200+ tables. AI-driven data quality : détection automatique d\'anomalies, correction proactive, alertes prédictives de dégradation.',
        effort: '120h',
        budget: '13 000 000 FCFA',
        responsable: 'CTO + Data Architect',
        kpi100: 'Data lineage 100%, score qualité ≥ 99%, 0 anomalie non détectée',
        standardVise: 'DAMA-DMBOK / ISO 8000',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Dashboard data lineage + AI quality engine + Rapport qualité 99%',
        pourquoiCeGap: 'Data Catalog (P1) = documentation. Data lineage = traçabilité complète (qui produit quoi, qui consomme quoi). AI quality = proactif (vs réactif). Standard banques d\'investissement et Big Four.',
      },
    ],
    standards: [
      { standard: 'ISO 30401:2018 (KM)', scoreActuel: 55, scoreCibleBloc: 80, score100: 100, ecartResiduel: 20, actionsLiees: ['GAP-T01'] },
      { standard: 'DAMA-DMBOK / ISO 8000', scoreActuel: 35, scoreCibleBloc: 70, score100: 100, ecartResiduel: 30, actionsLiees: ['GAP-T02'] },
    ],
    jalon100: 'ISO 30401 + Data Lineage 100% — Data & Knowledge « Bank-Grade » certifié ISO',
  },

  // ===== BLOC IOTA — SITE WEB : 93→100 =====
  {
    id: 'bloc-iota',
    numero: 'ι',
    nom: 'Site Web & Expérience Digitale',
    acronyme: 'WEB-UX',
    icon: 'ri-globe-line',
    couleur: 'primary',
    scoreActuel: 66,
    scoreCibleBloc: 93,
    scoreCible100: 100,
    gapResiduel: 7,
    budgetTotal: '16 000 000 FCFA',
    responsable: 'Lead Dev Frontend + Growth Director',
    progressionGlobale: 0,
    statutGlobal: 'en_cours',
    taches: [
      {
        id: 'GAP-I01',
        action: 'Atteindre WCAG 2.2 AAA sur pages critiques',
        description: 'Au-delà du WCAG 2.1 AA (cible P1), viser le AAA sur les 20 pages les plus visitées. Contraste 7:1 minimum, langue des signes pour vidéos, navigation 100% clavier avancée.',
        effort: '80h',
        budget: '8 000 000 FCFA',
        responsable: 'Lead Dev Frontend',
        kpi100: 'WCAG 2.2 AAA sur 20 pages critiques',
        standardVise: 'WCAG 2.2 AAA',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Rapport WCAG 2.2 AAA + Pages certifiées + Badge accessibilité',
        pourquoiCeGap: 'AA (P1) = bon niveau d\'accessibilité. AAA = excellence inclusive. Conformité aux exigences les plus strictes (administrations, ONG, bailleurs internationaux). Aucun cabinet concurrent n\'est AAA.',
      },
      {
        id: 'GAP-I02',
        action: 'Core Web Vitals 100% Excellent + Edge Computing',
        description: 'Toutes les pages à 100% « Excellent » sur tous les CWV (LCP < 1.5s, INP < 50ms, CLS < 0.05). Déploiement edge computing (Netlify Edge Functions) pour personalisation temps réel.',
        effort: '60h',
        budget: '5 000 000 FCFA',
        responsable: 'CTO + Lead Dev Frontend',
        kpi100: 'CWV 100% Excellent, LCP < 1.5s, INP < 50ms, CLS < 0.05',
        standardVise: 'Google CWV Excellence',
        deadline: '2027-09-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Dashboard CWV 100% + Rapport edge computing + Benchmark vs Big Four',
        pourquoiCeGap: '100% Good (P1) = minimum Google. 100% Excellent = top 1% des sites web mondiaux. Impact direct SEO et taux de conversion.',
      },
      {
        id: 'GAP-I03',
        action: 'Personnalisation IA du parcours visiteur',
        description: 'Personnalisation du site en temps réel basée sur le profil visiteur : secteur (banque, SFD, fintech), pays, source (LinkedIn, Google, direct), historique de navigation. Contenu adapté dynamiquement.',
        effort: '80h',
        budget: '3 000 000 FCFA',
        responsable: 'CTO + Growth Director',
        kpi100: 'Personnalisation live, +25% conversion vs non personnalisé',
        standardVise: 'Personalization Maturity',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Moteur personnalisation + Dashboard A/B personnalisé + Rapport conversion',
        pourquoiCeGap: 'Le site statique (même rapide et accessible) est générique. La personnalisation IA = « le bon message au bon visiteur au bon moment ». McKinsey rapporte +20-30% conversion via personnalisation.',
      },
    ],
    standards: [
      { standard: 'WCAG 2.2 AAA', scoreActuel: 35, scoreCibleBloc: 70, score100: 100, ecartResiduel: 30, actionsLiees: ['GAP-I01'] },
      { standard: 'Google CWV Excellence', scoreActuel: 82, scoreCibleBloc: 95, score100: 100, ecartResiduel: 5, actionsLiees: ['GAP-I02'] },
      { standard: 'Personalization Maturity', scoreActuel: 0, scoreCibleBloc: 30, score100: 100, ecartResiduel: 70, actionsLiees: ['GAP-I03'] },
    ],
    jalon100: 'WCAG AAA + CWV 100% Excellent + Personnalisation IA — Site Web « World-Class » certifié',
  },

  // ===== BLOC KAPPA — GOUVERNANCE : 94→100 =====
  {
    id: 'bloc-kappa',
    numero: 'κ',
    nom: 'Gouvernance & Alignement Stratégique',
    acronyme: 'GOV-STR',
    icon: 'ri-eye-line',
    couleur: 'accent',
    scoreActuel: 62,
    scoreCibleBloc: 94,
    scoreCible100: 100,
    gapResiduel: 6,
    budgetTotal: '28 000 000 FCFA',
    responsable: 'Managing Partner + COO',
    progressionGlobale: 0,
    statutGlobal: 'en_cours',
    taches: [
      {
        id: 'GAP-K01',
        action: 'Triple certification ISO Gouvernance (37000 + 37301 + 31000)',
        description: 'Au-delà de l\'ISO 37301 (cible P1), obtenir ISO 37000:2021 (Gouvernance des organismes) et ISO 31000:2018 (Management du risque). Triple certification = gouvernance de niveau « Listed Company ».',
        effort: '160h',
        budget: '18 000 000 FCFA',
        responsable: 'Managing Partner + CCO + Risk Manager',
        kpi100: '3 certifications ISO obtenues : 37000 + 37301 + 31000',
        standardVise: 'ISO 37000 + ISO 37301 + ISO 31000',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: '3 certificats ISO + Rapport gouvernance intégrée + Plan d\'amélioration continue',
        pourquoiCeGap: 'ISO 37301 seul (P1) = conformité. Triple certification = gouvernance d\'entreprise complète. Niveau exigé pour les sociétés cotées et les institutions financières régulées.',
      },
      {
        id: 'GAP-K02',
        action: 'Notation ESG externe — Sustainalytics / MSCI',
        description: 'Obtenir une notation ESG par un organisme tiers (Sustainalytics ou MSCI ESG Ratings). Score cible : « Low Risk » ou « AA ». Rapport ESG annuel audité.',
        effort: '100h',
        budget: '6 000 000 FCFA',
        responsable: 'ESG Officer + CCO',
        kpi100: 'Notation ESG « Low Risk » (Sustainalytics) ou « AA » (MSCI)',
        standardVise: 'MSCI / Sustainalytics',
        deadline: '2027-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Rapport notation ESG + Dashboard ESG + Plan d\'amélioration',
        pourquoiCeGap: 'La notation ESG est devenue un prérequis pour travailler avec les bailleurs (IFC, BAD, SFI) et les grands groupes. 0 cabinet de conseil africain n\'a de notation ESG publique. Avantage compétitif massif.',
      },
      {
        id: 'GAP-K03',
        action: 'COSO ERM 2017 — Full Enterprise Risk Management',
        description: 'Déployer le cadre COSO ERM 2017 complet : 5 composantes × 4 catégories d\'objectifs. Risk appetite statement, risk culture assessment, KRI dashboard automatisé.',
        effort: '80h',
        budget: '4 000 000 FCFA',
        responsable: 'Risk Manager + COO',
        kpi100: 'COSO ERM 2017 déployé, Risk Appetite signé COMEX',
        standardVise: 'COSO ERM 2017',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Manuel ERM + Risk Appetite Statement + Dashboard KRI + Rapport maturité ERM',
        pourquoiCeGap: 'Le Risk Management actuel est fragmenté. COSO ERM est le standard des Big Four pour le management des risques. Prérequis pour tout audit de due diligence.',
      },
    ],
    standards: [
      { standard: 'ISO 37000:2021 (Gouvernance)', scoreActuel: 40, scoreCibleBloc: 75, score100: 100, ecartResiduel: 25, actionsLiees: ['GAP-K01'] },
      { standard: 'ISO 31000:2018 (Risque)', scoreActuel: 45, scoreCibleBloc: 80, score100: 100, ecartResiduel: 20, actionsLiees: ['GAP-K01'] },
      { standard: 'MSCI / Sustainalytics ESG', scoreActuel: 0, scoreCibleBloc: 40, score100: 100, ecartResiduel: 60, actionsLiees: ['GAP-K02'] },
      { standard: 'COSO ERM 2017', scoreActuel: 35, scoreCibleBloc: 70, score100: 100, ecartResiduel: 30, actionsLiees: ['GAP-K03'] },
    ],
    jalon100: 'Triple ISO + ESG noté + COSO ERM — Gouvernance « Listed Company Grade » certifiée',
  },
];

// ===== MÉTADONNÉES GLOBALES =====
export const TACHES_100_META = {
  titre: 'KOS — Tâches Restantes 100% Big Four + ISO',
  auditSource: 'Enterprise Transformation Assessment 360° — Gap Analysis vers 100%',
  auditId: 'KOS-GAP100-2026-06-26',
  blocsTotal: 10,
  tachesTotal: 28,
  budgetTotal: '389 500 000 FCFA',
  budget12m: '182 000 000 FCFA',
  budget24m: '312 000 000 FCFA',
  budget36m: '389 500 000 FCFA',
  horizon: '24-36 mois',
  scoreGlobalActuel: 75.8,
  scoreCibleP0P1: 93.1,
  scoreCible100: 100,
  gapResiduelMoyen: 6.8,
  referentiels: 'ISO 27001 · ISO 22301 · ISO 27701 · ISO 42001 · ISO 25010 · ISO 30401 · ISO 37000 · ISO 37301 · ISO 31000 · ISO 29993 · ISO 8000 · NIST SP 800-207 · NIST AI 600-1 · COSO ERM 2017 · WCAG 2.2 AAA · MSCI ESG · DAMA-DMBOK · TOGAF 10 · Google SRE · WIPO/OAPI',
  certificationsVisees: '10 certifications ISO + 1 notation ESG',
  messageCle: 'Le gap P0+P1 amène KOS à 93.1/100. Les 28 tâches restantes comblent le delta final vers 100/100 : certifications tierces-parties, expansion continentale, excellence technique FAANG-grade, innovation PI, gouvernance "Listed Company".',
};

// ===== COMPUTEUR =====
export function computeTasksRestantes100KPIs() {
  const blocs = TACHES_RESTANTES_100;
  const allTaches = blocs.flatMap(b => b.taches);
  const allStandards = blocs.flatMap(b => b.standards);

  const tachesNonDemarre = allTaches.filter(t => t.statut === 'non_demarre').length;
  const tachesEnCours = allTaches.filter(t => t.statut === 'en_cours').length;
  const tachesTerminees = allTaches.filter(t => t.statut === 'termine').length;

  const blocsCritiques = blocs.filter(b => b.statutGlobal === 'critique').length;
  const blocsEnCours = blocs.filter(b => b.statutGlobal === 'en_cours').length;

  const gapResiduelMoyen = Math.round(blocs.reduce((s, b) => s + b.gapResiduel, 0) / blocs.length * 10) / 10;

  const scoreMoyenActuel = Math.round(blocs.reduce((s, b) => s + b.scoreActuel, 0) / blocs.length * 10) / 10;
  const scoreMoyenCibleBloc = Math.round(blocs.reduce((s, b) => s + b.scoreCibleBloc, 0) / blocs.length * 10) / 10;

  const ecoEcartMax = Math.max(...allStandards.map(s => s.ecartResiduel));
  const ecoStandardMax = allStandards.find(s => s.ecartResiduel === ecoEcartMax);

  return {
    blocs_total: blocs.length,
    taches_total: allTaches.length,
    taches_non_demarre: tachesNonDemarre,
    taches_en_cours: tachesEnCours,
    taches_terminees: tachesTerminees,
    blocs_critiques: blocsCritiques,
    blocs_en_cours: blocsEnCours,
    gap_residuel_moyen: gapResiduelMoyen,
    score_moyen_actuel: scoreMoyenActuel,
    score_moyen_cible_bloc: scoreMoyenCibleBloc,
    certifications_visees: 10,
    budget_total: '389 500 000 FCFA',
    ecart_max_standard: { standard: ecoStandardMax?.standard || '-', ecart: ecoEcartMax },
  };
}

// ===== TIMELINE EXECUTION =====
export interface TimelinePhase100 {
  nom: string;
  periode: string;
  blocs: string[];
  budget: string;
  jalon: string;
}

export const TIMELINE_100: TimelinePhase100[] = [
  { nom: 'Phase 1 — Certifications Core', periode: 'Q3 2026 — Q2 2027', blocs: ['bloc-alpha', 'bloc-kappa', 'bloc-iota'], budget: '92 500 000 FCFA', jalon: 'ISO 27001 + ISO 37301 + WCAG AAA — premier triplé certification' },
  { nom: 'Phase 2 — Excellence Data & IA', periode: 'Q3 2027 — Q4 2027', blocs: ['bloc-gamma', 'bloc-theta', 'bloc-eta'], budget: '81 000 000 FCFA', jalon: 'ISO 42001 + ISO 30401 + ISO 25010 — triplé tech & IA' },
  { nom: 'Phase 3 — Scale & Expansion', periode: 'Q1 2028 — Q2 2028', blocs: ['bloc-delta', 'bloc-zeta', 'bloc-epsilon'], budget: '178 000 000 FCFA', jalon: 'IPO Ready + Spin-Off + 10 brevets + SOV 60% — KOS "Unicorn-Ready"' },
  { nom: 'Phase 4 — Consolidation 100%', periode: 'Q3 2028 — Q4 2028', blocs: ['bloc-beta', 'bloc-alpha', 'bloc-kappa'], budget: '38 000 000 FCFA', jalon: 'Zero-Trust + Multi-Cloud + ISO 22301 + ISO 27701 + Triple ISO Gouvernance' },
];

// ===== EXECUTIVE SUMMARY =====
export const TACHES_100_EXECUTIVE_SUMMARY = {
  titre: 'KOS 100% Big Four + ISO — Plan de Convergence Final',
  contexte: 'Les blocs P0 et P1 amènent KOS de 75.8/100 à 93.1/100. Les 28 tâches restantes identifiées ci-dessous comblent le delta final de 6.9 points vers 100/100.',
  blocsTotal: 10,
  tachesTotal: 28,
  budgetTotal: '389 500 000 FCFA',
  horizon: '24-36 mois (Juillet 2026 — Décembre 2028)',
  certifications: '10 certifications ISO + 1 notation ESG + 7 brevets additionnels',
  differentiateurCle: 'Aucun cabinet de conseil en Afrique francophone n\'a ce niveau de certification et d\'excellence. KOS deviendrait la référence absolue.',
  gouvernance: 'Comité Stratégique 100% — Trimestriel — Managing Partner + CTO + CCO + COO + Innovation Director + Conseil d\'Administration',
};





