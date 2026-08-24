// ============================================================
// KOS CORRECTIVE ACTION BLOCKS
// Blocs d'Actions Correctives Optimisés — Mise en Œuvre Immédiate
// Issu de l'Enterprise Transformation Assessment 360°
// Niveau : Big Four + ISO + Think Tank + Observatoires Internationaux
// Version 2026.06.26
// ============================================================

export interface BlockAction {
  id: string;
  axe_origine: string;
  action: string;
  description: string;
  priorite: 'P0' | 'P1' | 'P2';
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  deadline: string;
  statut: 'en_attente' | 'en_cours' | 'termine';
}

export interface BlockKPI {
  nom: string;
  valeur_actuelle: string;
  cible: string;
  standard: 'Big Four' | 'ISO' | 'Think Tank' | 'Observatoire' | 'NIST' | 'GAFI' | 'OWASP' | 'COSO';
  progression: number;
}

export interface BlockReference {
  standard: string;
  niveau_cible: string;
  benchmark: string;
  ecart: string;
}

export interface CorrectiveActionBlock {
  id: string;
  numero: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  description: string;
  priorite_globale: 'P0' | 'P1' | 'P2';
  horizon: string;
  score_bloc_actuel: number;
  score_bloc_cible: number;
  budget_total: string;
  responsable_principal: string;
  statut_global: 'critique' | 'en_cours' | 'progresse' | 'maitrise';
  actions: BlockAction[];
  kpis: BlockKPI[];
  references: BlockReference[];
  dependances: string[];
  impacts_axes: string[];
  impact_risques: string[];
  jalon_cle: string;
}

export const CORRECTIVE_ACTION_BLOCKS: CorrectiveActionBlock[] = [
  // ===== BLOC ALPHA — SÉCURITÉ & CONFORMITÉ IMMÉDIATE =====
  {
    id: 'bloc-alpha',
    numero: 'α',
    nom: 'Sécurité & Conformité Immédiate',
    acronyme: 'SEC-COM',
    icon: 'ri-shield-flash-line',
    couleur: 'primary',
    description: 'Résolution des 8 vulnérabilités critiques identifiées sur les axes Cybersécurité, Conformité et Données. Bloc P0 absolu — conditionne tous les autres blocs. Sans ces corrections, KOS reste exposé à des risques de brèche, de non-conformité réglementaire et de sanctions.',
    priorite_globale: 'P0',
    horizon: '0—90 jours',
    score_bloc_actuel: 68,
    score_bloc_cible: 95,
    budget_total: '62 300 000 FCFA',
    responsable_principal: 'RSSI + CCO',
    statut_global: 'critique',
    actions: [
      { id: 'CYS-A01', axe_origine: 'Cybersécurité', action: 'Résoudre 5 gaps ISO 27001 critiques', description: 'Finaliser les 5 contrôles critiques : sécurité physique (A.11), SDLC documenté (A.14), sécurité fournisseurs (A.15), formation 100% (A.7), PCA testé (A.17).', priorite: 'P0', effort: '80h', budget: '17 200 000 FCFA', responsable: 'RSSI', kpi: '114/114 contrôles ISO 27001 passés', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'CYS-A02', axe_origine: 'Cybersécurité', action: 'Déployer CSP + headers sécurité', description: 'Content-Security-Policy strict, Permissions-Policy, HSTS preload, Referrer-Policy, X-Content-Type-Options sur toutes les pages.', priorite: 'P0', effort: '8h', budget: '2 800 000 FCFA', responsable: 'RSSI + Lead Dev', kpi: 'Mozilla Observatory ≥ 95/100', deadline: '2026-08-31', statut: 'en_attente' },
      { id: 'CYS-A03', axe_origine: 'Cybersécurité', action: 'SIEM + MTTD < 5min + Red Team', description: 'Déployer SIEM avec threat intelligence, MTTD < 5min. Organiser Red Team Exercise annuel avec firme externe.', priorite: 'P1', effort: '120h', budget: '36 500 000 FCFA', responsable: 'RSSI + SOC Manager', kpi: 'MTTD < 5min, 1 Red Team/an', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'REG-A01', axe_origine: 'Conformité', action: 'Améliorer KYC/CDD — PPE 65%→90%', description: 'Intégrer bases de données PPE internationales (WorldCheck, Dow Jones) dans le workflow KYC KOS. Automatiser la détection et le scoring.', priorite: 'P0', effort: '60h', budget: '8 500 000 FCFA', responsable: 'Compliance Officer', kpi: 'Détection PPE ≥ 90%, conformité GAFI R.12', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'REG-A03', axe_origine: 'Conformité', action: 'Couverture GABAC + veille CEMAC complète', description: 'Ajouter la surveillance GABAC et les régulateurs CEMAC (COBAC, BEAC, BVMAC). Intégrer dans la veille KOS.', priorite: 'P1', effort: '60h', budget: '5 800 000 FCFA', responsable: 'Regulatory Intelligence', kpi: '+1 autorité, +30 textes CEMAC', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'DAT-A02', axe_origine: 'Données', action: 'Data quality monitoring automatisé', description: 'Mettre en place des contrôles de qualité automatisés : complétude, unicité, fraîcheur, cohérence. Dashboards qualité dans KOS.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO', kpi: 'Score qualité ≥ 95%, alertes qualité', deadline: '2027-06-30', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Contrôles ISO 27001 passés', valeur_actuelle: '109/114', cible: '114/114', standard: 'ISO', progression: 96 },
      { nom: 'Score Mozilla Observatory', valeur_actuelle: '62/100', cible: '95/100', standard: 'OWASP', progression: 65 },
      { nom: 'MTTD (Mean Time To Detect)', valeur_actuelle: '18 min', cible: '&lt; 5 min', standard: 'NIST', progression: 28 },
      { nom: 'Détection PPE (Personnes Politiquement Exposées)', valeur_actuelle: '65%', cible: '90%', standard: 'GAFI', progression: 72 },
      { nom: 'Autorités réglementaires surveillées', valeur_actuelle: '8', cible: '12', standard: 'Observatoire', progression: 67 },
      { nom: 'Tables avec RLS actif', valeur_actuelle: '97%', cible: '100%', standard: 'ISO', progression: 97 },
    ],
    references: [
      { standard: 'ISO 27001:2022', niveau_cible: 'Certifié', benchmark: 'Deloitte: 114/114 contrôles', ecart: '5 contrôles critiques' },
      { standard: 'NIST CSF 2.0', niveau_cible: 'Tier 4 — Adaptive', benchmark: 'PwC: MTTD 3min', ecart: 'MTTD 18min vs 3min' },
      { standard: 'OWASP ASVS 4.0', niveau_cible: 'Level 2', benchmark: 'EY: Observatory 98/100', ecart: '36 pts Observatory' },
      { standard: 'GAFI Recommandation 12', niveau_cible: 'Conforme', benchmark: 'KPMG: PPE 95%', ecart: '30 pts détection PPE' },
    ],
    dependances: [],
    impacts_axes: ['Cybersécurité', 'Conformité Réglementaire', 'Données'],
    impact_risques: ['RISK-002', 'RISK-003', 'RISK-006', 'RISK-009', 'RISK-013'],
    jalon_cle: 'ISO 27001 : 114/114 contrôles passés — Certification prête pour audit externe',
  },

  // ===== BLOC BETA — ARCHITECTURE & FONDATIONS TECHNIQUES =====
  {
    id: 'bloc-beta',
    numero: 'β',
    nom: 'Architecture & Fondations Techniques',
    acronyme: 'ARC-TECH',
    icon: 'ri-cpu-line',
    couleur: 'accent',
    description: 'Consolidation de l\'architecture KOS : fusion des edge functions (98→50), déploiement CI/CD avec quality gates, monitoring unifié de tous les workflows, retry automatique 100%. Ce bloc est le prérequis technique à toute nouvelle fonctionnalité.',
    priorite_globale: 'P0',
    horizon: '0—180 jours',
    score_bloc_actuel: 60,
    score_bloc_cible: 93,
    budget_total: '44 500 000 FCFA',
    responsable_principal: 'CTO + Lead Dev Backend',
    statut_global: 'critique',
    actions: [
      { id: 'ARC-A01', axe_origine: 'Architecture', action: 'Programme fusion edge functions (98→50)', description: 'Identifier et fusionner les edge functions redondantes. Cible : passer de 98 à 50 fonctions via regroupement par domaine.', priorite: 'P0', effort: '160h', budget: '12 000 000 FCFA', responsable: 'CTO + Lead Dev Backend', kpi: '50 edge functions max, 0 régression', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'ARC-A02', axe_origine: 'Architecture', action: 'Déployer OpenTelemetry + distributed tracing', description: 'Instrumenter les edge functions et le frontend avec OpenTelemetry. Dashboard traces dans KOS SysOps.', priorite: 'P1', effort: '80h', budget: '8 000 000 FCFA', responsable: 'CTO + DevOps', kpi: '100% edge functions tracées', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'ARC-A03', axe_origine: 'Architecture', action: 'C4 Model + ADR (Architecture Decision Records)', description: 'Documenter l\'architecture KOS avec le modèle C4. Mettre en place ADR pour les décisions architecturales.', priorite: 'P1', effort: '60h', budget: '4 000 000 FCFA', responsable: 'CTO', kpi: 'C4 diagrams complets, 20+ ADRs', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'QAL-A02', axe_origine: 'Qualité Logicielle', action: 'CI/CD avec quality gates', description: 'Pipeline CI/CD complet : lint, type-check, test, build, security scan, bundle analysis. Quality gates bloquantes.', priorite: 'P0', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO + DevOps', kpi: 'Pipeline CI/CD avec 5 quality gates', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'AUT-A01', axe_origine: 'Automatisation', action: 'Dashboard automation unifié', description: 'Dashboard unique montrant l\'état de tous les workflows, pipelines, crons, et edge functions.', priorite: 'P0', effort: '80h', budget: '8 000 000 FCFA', responsable: 'CTO', kpi: '100% workflows monitorés', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'AUT-A02', axe_origine: 'Automatisation', action: 'Retry automatique 100% workflows', description: 'Implémenter le retry automatique avec backoff exponentiel sur tous les workflows.', priorite: 'P0', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO + DevOps', kpi: '100% workflows retry, 0 échec silencieux', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'AUT-A03', axe_origine: 'Automatisation', action: 'Monitoring cron + alerting temps réel', description: 'Monitoring de tous les crons avec alerting temps réel en cas d\'échec.', priorite: 'P1', effort: '30h', budget: '2 500 000 FCFA', responsable: 'DevOps', kpi: '100% crons monitorés, MTTD < 5min', deadline: '2026-09-30', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Edge Functions', valeur_actuelle: '98', cible: '50', standard: 'Big Four', progression: 51 },
      { nom: 'Workflows avec CI/CD gates', valeur_actuelle: '0%', cible: '100%', standard: 'Big Four', progression: 0 },
      { nom: 'Workflows avec retry automatique', valeur_actuelle: '60%', cible: '100%', standard: 'ISO', progression: 60 },
      { nom: 'Crons avec alerting', valeur_actuelle: '45%', cible: '100%', standard: 'NIST', progression: 45 },
      { nom: 'Score 12-Factor App', valeur_actuelle: '72/100', cible: '90/100', standard: 'Big Four', progression: 80 },
      { nom: 'Documentation architecturale (C4)', valeur_actuelle: '0%', cible: '100%', standard: 'ISO', progression: 0 },
    ],
    references: [
      { standard: 'TOGAF 10', niveau_cible: 'Architecture certifiée', benchmark: 'Accenture: < 40 microservices par domaine', ecart: '98→50 fonctions' },
      { standard: 'ISO 42010', niveau_cible: 'Documentation complète', benchmark: 'Deloitte: C4 + ADR sur tous les systèmes', ecart: '0 documentation formelle' },
      { standard: '12-Factor App', niveau_cible: 'Score ≥ 90/100', benchmark: 'McKinsey Digital: CI/CD 100%', ecart: 'Pas de CI/CD' },
    ],
    dependances: [],
    impacts_axes: ['Architecture Enterprise', 'Qualité Logicielle', 'Automatisation'],
    impact_risques: ['RISK-004', 'RISK-010'],
    jalon_cle: 'Edge functions ≤ 50 + CI/CD 5 gates opérationnel — KOS prêt pour la scalabilité Big Four',
  },

  // ===== BLOC GAMMA — IA & CONFORMITÉ EU AI ACT =====
  {
    id: 'bloc-gamma',
    numero: 'γ',
    nom: 'IA & Conformité Réglementaire IA',
    acronyme: 'IA-REG',
    icon: 'ri-brain-line',
    couleur: 'secondary',
    description: 'Mise en conformité du système IA KOS avec l\'EU AI Act, ISO 42001, et déploiement du GraphRAG réglementaire. Optimisation des coûts API via modèles locaux. Sandboxing complet des agents. Ce bloc sécurise l\'avance technologique de KOS.',
    priorite_globale: 'P0',
    horizon: '0—365 jours',
    score_bloc_actuel: 62,
    score_bloc_cible: 94,
    budget_total: '34 000 000 FCFA',
    responsable_principal: 'CTO + AI Ethics Board',
    statut_global: 'critique',
    actions: [
      { id: 'IAK-A01', axe_origine: 'IA', action: 'Mise en conformité EU AI Act — Digital Twin', description: 'Refactoring du Digital Twin pour conformité Art.14 (explicabilité) et Art.15 (exactitude). Audit externe.', priorite: 'P0', effort: '120h', budget: '18 000 000 FCFA', responsable: 'CTO + AI Ethics Board', kpi: 'Conformité EU AI Act, score ISO 42001 ≥ 9.0', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'IAK-A02', axe_origine: 'IA', action: 'Déployer GraphRAG réglementaire', description: 'Migrer du RAG vectoriel simple vers GraphRAG exploitant le Knowledge Graph réglementaire.', priorite: 'P1', effort: '100h', budget: '10 000 000 FCFA', responsable: 'CTO', kpi: 'Précision réponses +25%, hallucinations -50%', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'IAK-A03', axe_origine: 'IA', action: 'Optimisation coûts API — modèles locaux', description: 'Déployer des modèles open-source (Mistral, Llama) en local pour 60% des requêtes non-critiques.', priorite: 'P1', effort: '80h', budget: '6 000 000 FCFA', responsable: 'CTO + AI Team', kpi: 'Coûts API -50%, latence -30%', deadline: '2027-06-30', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Conformité EU AI Act', valeur_actuelle: 'Partielle', cible: 'Conforme Art. 5-15', standard: 'ISO', progression: 35 },
      { nom: 'Score ISO 42001:2023', valeur_actuelle: '87.5/100', cible: '95/100', standard: 'ISO', progression: 92 },
      { nom: 'Taux d\'hallucination', valeur_actuelle: '0.12%', cible: '0.05%', standard: 'Big Four', progression: 42 },
      { nom: 'Coût API mensuel', valeur_actuelle: '2.8M FCFA', cible: '1.4M FCFA', standard: 'Big Four', progression: 50 },
      { nom: 'Agents IA sandboxés', valeur_actuelle: '258/260', cible: '260/260', standard: 'NIST', progression: 99 },
      { nom: 'Précision RAG réglementaire', valeur_actuelle: '82%', cible: '95%', standard: 'Think Tank', progression: 86 },
    ],
    references: [
      { standard: 'EU AI Act 2024', niveau_cible: 'Conforme — High Risk', benchmark: 'Deloitte AI: Sandboxing 100%, Explicabilité certifiée ISO 42001', ecart: 'Art.14 explicabilité non conforme' },
      { standard: 'ISO 42001:2023', niveau_cible: 'Certifié', benchmark: 'EY: AI Management System certifié', ecart: '7.5 pts' },
      { standard: 'NIST AI RMF 1.0', niveau_cible: 'Niveau 4 — Managed', benchmark: 'PwC: Hallucination < 0.03%', ecart: '0.07 pts hallucination' },
    ],
    dependances: ['bloc-beta'],
    impacts_axes: ['IA', 'Conformité Réglementaire'],
    impact_risques: ['RISK-003'],
    jalon_cle: 'EU AI Act conforme + ISO 42001 ≥ 95 — KOS IA certifié niveau Big Four',
  },

  // ===== BLOC DELTA — BUSINESS MODEL & CROISSANCE =====
  {
    id: 'bloc-delta',
    numero: 'δ',
    nom: 'Business Model & Croissance',
    acronyme: 'BIZ-GRO',
    icon: 'ri-funds-box-line',
    couleur: 'accent',
    description: 'Transformation du business model : lancement de l\'offre SaaS KOS Platform (abonnement), ouverture du bureau CEMAC à Douala, création de l\'offre IA Governance, montée en gamme des TJM. Objectif : CA récurrent 15%→40%, diversification géographique, pricing premium.',
    priorite_globale: 'P0',
    horizon: '0—365 jours',
    score_bloc_actuel: 58,
    score_bloc_cible: 92,
    budget_total: '83 000 000 FCFA',
    responsable_principal: 'Managing Partner + Growth Director',
    statut_global: 'critique',
    actions: [
      { id: 'BMD-A01', axe_origine: 'Business Model', action: 'Lancer offre SaaS KOS Platform (abonnement)', description: 'Offre d\'abonnement KOS Platform pour SFD et banques. Pricing : 2.5M-8M FCFA/mois selon taille.', priorite: 'P0', effort: '120h', budget: '18 000 000 FCFA', responsable: 'CTO + Growth Director', kpi: '10 clients abonnement d\'ici 12 mois, +25% CA récurrent', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'BMD-A02', axe_origine: 'Business Model', action: 'Ouvrir bureau CEMAC (Douala)', description: 'Présence physique à Douala avec 1 Director + 2 Consultants. Cible : 15% du CA de la zone CEMAC en 18 mois.', priorite: 'P0', effort: '160h', budget: '35 000 000 FCFA', responsable: 'Managing Partner', kpi: 'Bureau opérationnel, 5 clients CEMAC actifs', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'POF-A01', axe_origine: 'Portefeuille Offres', action: 'Lancer offre IA Governance for Finance', description: '9ème offre : audit et conseil en gouvernance IA pour banques/SFD (ISO 42001, EU AI Act, BCEAO guidelines).', priorite: 'P0', effort: '80h', budget: '12 000 000 FCFA', responsable: 'CTO + BU1 Director', kpi: 'Offre lancée, 3 mandats en 6 mois', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'POF-A02', axe_origine: 'Portefeuille Offres', action: 'Automatiser production de 4 offres via KOS', description: 'Industrialiser Due Diligence, Conformité BCEAO, Diagnostic ESG, Prix de Transfert avec KOS Automaton.', priorite: 'P0', effort: '200h', budget: '28 000 000 FCFA', responsable: 'CTO + CQO', kpi: 'Score automatisation 38%→65%, délai livraison -40%', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'MCO-A02', axe_origine: 'Marché & Concurrence', action: 'Stratégie de montée en gamme — TJM +30%', description: 'Plan progressif d\'augmentation des TJM : +10% en 6 mois, +15% supplémentaires en 12 mois.', priorite: 'P1', effort: '40h', budget: '2 500 000 FCFA', responsable: 'Managing Partner', kpi: 'TJM moyen +30%, 0 perte client', deadline: '2027-06-30', statut: 'en_attente' },
      { id: 'POF-A03', axe_origine: 'Portefeuille Offres', action: 'Revitaliser ou externaliser offres faibles', description: 'Décision Go/No-Go sur Formation et Diagnostic Flash. Revitaliser ou externaliser.', priorite: 'P1', effort: '24h', budget: '2 000 000 FCFA', responsable: 'Managing Partner', kpi: '0 offre déficitaire d\'ici 6 mois', deadline: '2026-09-30', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Part CA récurrent', valeur_actuelle: '15%', cible: '40%', standard: 'Big Four', progression: 38 },
      { nom: 'Diversification géographique', valeur_actuelle: '78% UEMOA', cible: '55% UEMOA', standard: 'Big Four', progression: 51 },
      { nom: 'Offres marge > 65%', valeur_actuelle: '2/8', cible: '6/8', standard: 'Big Four', progression: 33 },
      { nom: 'TJM vs Big Four', valeur_actuelle: '60%', cible: '85%', standard: 'Big Four', progression: 71 },
      { nom: 'Score automatisation offres', valeur_actuelle: '38%', cible: '70%', standard: 'Big Four', progression: 54 },
      { nom: 'Bureaux géographiques', valeur_actuelle: '1', cible: '3', standard: 'Observatoire', progression: 33 },
    ],
    references: [
      { standard: 'McKinsey Revenue Excellence', niveau_cible: 'Recurring Revenue ≥ 40%', benchmark: 'Accenture: 45% CA récurrent', ecart: '25 pts' },
      { standard: 'BCG Growth-Share Matrix', niveau_cible: 'Portfolio équilibré', benchmark: 'Deloitte: 85% offres marge > 65%', ecart: '4 offres' },
      { standard: 'Big Four Partnership Model', niveau_cible: 'TJM ≥ 85% Big Four', benchmark: 'KPMG Afrique: TJM 850K FCFA', ecart: '30% pricing gap' },
    ],
    dependances: ['bloc-beta', 'bloc-gamma'],
    impacts_axes: ['Business Model', 'Portefeuille Offres', 'Marché & Concurrence', 'Performance'],
    impact_risques: ['RISK-001', 'RISK-005'],
    jalon_cle: '10 clients SaaS + bureau Douala opérationnel — KOS Business Model certifié Big Four',
  },

  // ===== BLOC EPSILON — MARKETING & VISIBILITÉ =====
  {
    id: 'bloc-epsilon',
    numero: 'ε',
    nom: 'Marketing & Visibilité Digitale',
    acronyme: 'MKT-VIS',
    icon: 'ri-megaphone-line',
    couleur: 'primary',
    description: 'Programme de visibilité digitale complet : GEO (Share of Voice 38%→50%), featured snippets 52→150, YouTube 2 vidéos/mois, webinar mensuel, brand video institutionnelle, Knowledge Graph 150+ entités, email nurturing avancé.',
    priorite_globale: 'P0',
    horizon: '0—365 jours',
    score_bloc_actuel: 52,
    score_bloc_cible: 91,
    budget_total: '52 000 000 FCFA',
    responsable_principal: 'Marketing Director + SEO/GEO Director',
    statut_global: 'critique',
    actions: [
      { id: 'SGO-A01', axe_origine: 'SEO/GEO', action: 'Programme GEO — SOV 38%→50%', description: '25 000 FAQs additionnelles, 6 pillar pages optimisées multi-moteur, partenariat crawlers IA.', priorite: 'P0', effort: '120h', budget: '6 500 000 FCFA', responsable: 'SEO/GEO Director', kpi: 'SOV 50%, présence 5/5 moteurs ≥ 90%', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'SGO-A02', axe_origine: 'SEO/GEO', action: 'Featured snippets 52→150', description: 'Reformuler 100 H2 en questions, générer réponses concises, déployer FAQ Schema sur 30 pages.', priorite: 'P0', effort: '60h', budget: '4 200 000 FCFA', responsable: 'SEO Director + Content Team', kpi: '150 featured snippets, +250% CTR', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'SGO-A03', axe_origine: 'SEO/GEO', action: 'Knowledge Graph 150+ entités', description: 'Construire un Knowledge Graph complet couvrant régulation, SFD, banques, conformité.', priorite: 'P1', effort: '80h', budget: '5 800 000 FCFA', responsable: 'CTO + SEO Director', kpi: '150+ entités, 500+ relations', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'MKT-A01', axe_origine: 'Marketing Digital', action: 'Relancer chaîne YouTube — 2 vidéos/mois', description: 'Calendrier éditorial YouTube : interviews régulateurs, explications circulaires, démos KOS.', priorite: 'P0', effort: '80h/mois', budget: '12 000 000 FCFA/an', responsable: 'Content Director', kpi: '24 vidéos/an, 5 000 abonnés', deadline: '2027-06-30', statut: 'en_attente' },
      { id: 'MKT-A02', axe_origine: 'Marketing Digital', action: 'Lancer série webinar mensuelle', description: '1 webinar/mois avec invité (régulateur, DG banque, expert Big Four). Replay sur YouTube.', priorite: 'P1', effort: '40h/mois', budget: '6 000 000 FCFA/an', responsable: 'Marketing Director', kpi: '12 webinars/an, 200 participants/session', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'MKT-A03', axe_origine: 'Marketing Digital', action: 'Email nurturing avancé + segmentation', description: '5 séquences de nurturing par persona. Segmenter par secteur, pays, maturité. Lead scoring intégré.', priorite: 'P1', effort: '80h', budget: '8 000 000 FCFA', responsable: 'Growth Director', kpi: '15 000 abonnés, taux ouverture > 25%', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'BRD-A01', axe_origine: 'Branding', action: 'Créer Brand Video institutionnelle', description: 'Vidéo de marque 3-5 min : storytelling KHEPRA, vision, impact, clients. Diffusion multi-canal.', priorite: 'P1', effort: '80h', budget: '8 500 000 FCFA', responsable: 'Marketing Director', kpi: 'Video produite, 50K vues en 3 mois', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'MCO-A03', axe_origine: 'Marché & Concurrence', action: 'Campagne « IA-Augmented Consulting »', description: 'Positionner KHEPRA comme le leader du conseil augmenté par l\'IA en Afrique.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'Marketing Director', kpi: '5 publications, 3 webinars, 1 000 leads', deadline: '2026-12-31', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Share of Voice IA (GEO)', valeur_actuelle: '38%', cible: '50%', standard: 'Big Four', progression: 76 },
      { nom: 'Featured Snippets', valeur_actuelle: '52', cible: '150', standard: 'Big Four', progression: 35 },
      { nom: 'Entités Knowledge Graph', valeur_actuelle: '24', cible: '150', standard: 'Think Tank', progression: 16 },
      { nom: 'Abonnés newsletter', valeur_actuelle: '3 800', cible: '15 000', standard: 'Big Four', progression: 25 },
      { nom: 'Abonnés YouTube', valeur_actuelle: '0', cible: '5 000', standard: 'Observatoire', progression: 0 },
      { nom: 'Notoriété assistée', valeur_actuelle: '28%', cible: '55%', standard: 'Big Four', progression: 51 },
    ],
    references: [
      { standard: 'Google GEO Best Practices 2026', niveau_cible: 'SOV ≥ 50%', benchmark: 'Deloitte: SOV 52%, 200+ snippets', ecart: '12 pts SOV' },
      { standard: 'Content Marketing Institute', niveau_cible: 'Newsletter ≥ 15K', benchmark: 'BCG: 50K abonnés newsletter', ecart: '11.2K abonnés' },
      { standard: 'LinkedIn B2B Best Practices', niveau_cible: '15K followers', benchmark: 'McKinsey: 5M+ followers', ecart: '10.8K followers' },
    ],
    dependances: ['bloc-delta'],
    impacts_axes: ['SEO/GEO', 'Marketing Digital', 'Branding', 'Marché & Concurrence'],
    impact_risques: ['RISK-005', 'RISK-008', 'RISK-015'],
    jalon_cle: 'SOV 50% + 150 snippets + 150 entités KG — Visibilité digitale niveau Big Four',
  },

  // ===== BLOC ZETA — INNOVATION & THINK TANK =====
  {
    id: 'bloc-zeta',
    numero: 'ζ',
    nom: 'Innovation & Think Tank',
    acronyme: 'INN-TTK',
    icon: 'ri-lightbulb-flash-line',
    couleur: 'secondary',
    description: 'Structuration de l\'innovation : création du KHEPRA Innovation Lab (budget 8% CA), dépôt de 3 brevets méthodologiques, Comité Scientifique externe pour le Think Tank, portail public Think Tank, partenariats universités et startups.',
    priorite_globale: 'P1',
    horizon: '0—365 jours',
    score_bloc_actuel: 48,
    score_bloc_cible: 90,
    budget_total: '90 000 000 FCFA',
    responsable_principal: 'Managing Partner + Innovation Director',
    statut_global: 'critique',
    actions: [
      { id: 'INN-A01', axe_origine: 'Innovation', action: 'Créer KHEPRA Innovation Lab', description: 'Laboratoire d\'innovation avec budget dédié (8% CA), 2 chercheurs, processus stage-gate. Focus IA réglementaire.', priorite: 'P1', effort: '160h', budget: '25 000 000 FCFA/an', responsable: 'Managing Partner + CTO', kpi: 'Lab opérationnel, 3 projets R&D actifs', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'INN-A02', axe_origine: 'Innovation', action: 'Audit PI + dépôt 3 brevets méthodologiques', description: 'Auditer le portefeuille PI. Déposer 3 brevets : KOS Automaton, GraphRAG réglementaire, Diagnostic Engine.', priorite: 'P1', effort: '120h', budget: '18 000 000 FCFA', responsable: 'Managing Partner + Conseil PI', kpi: '3 brevets déposés', deadline: '2027-12-31', statut: 'en_attente' },
      { id: 'INN-A03', axe_origine: 'Innovation', action: 'Partenariats universités + startups', description: '2 partenariats universités africaines, 2 startups RegTech. Programme de stages recherche.', priorite: 'P1', effort: '80h', budget: '12 000 000 FCFA/an', responsable: 'Innovation Director', kpi: '4 partenariats actifs, 2 stagiaires/an', deadline: '2027-06-30', statut: 'en_attente' },
      { id: 'TTO-A01', axe_origine: 'Think Tank', action: 'Créer Comité Scientifique externe', description: '5 experts externes (anciens régulateurs, professeurs, économistes). Réunion trimestrielle.', priorite: 'P1', effort: '40h', budget: '10 000 000 FCFA/an', responsable: 'Managing Partner', kpi: 'Comité actif, 4 réunions/an', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'TTO-A02', axe_origine: 'Think Tank', action: 'Lancer portail public Think Tank', description: 'Section publique avec dashboards interactifs, indices propriétaires, base documentaire consultable.', priorite: 'P1', effort: '120h', budget: '15 000 000 FCFA', responsable: 'CTO + Research Director', kpi: 'Portail live, 5 000 visites/mois', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'TTO-A03', axe_origine: 'Think Tank', action: 'Publier méthodologie des indices', description: 'Livres méthodologiques des 3 indices propriétaires. Audit externe pour crédibilité.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'Research Director', kpi: '3 méthodologies publiées, audit OK', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'PIN-A03', axe_origine: 'Production Intellectuelle', action: 'Lancer enquêtes terrain annuelles', description: '2 enquêtes/an (Baromètre Confiance Régulateurs, Enquête Maturité Digitale SFD).', priorite: 'P2', effort: '160h/an', budget: '18 000 000 FCFA/an', responsable: 'Research Director', kpi: '2 enquêtes/an, 200+ répondants', deadline: '2027-06-30', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Budget R&D (% CA)', valeur_actuelle: '0.5%', cible: '8%', standard: 'Big Four', progression: 6 },
      { nom: 'Brevets déposés', valeur_actuelle: '0', cible: '3', standard: 'Think Tank', progression: 0 },
      { nom: 'Partenariats innovation', valeur_actuelle: '0', cible: '4', standard: 'Observatoire', progression: 0 },
      { nom: 'Comité Scientifique', valeur_actuelle: '0', cible: '1', standard: 'Think Tank', progression: 0 },
      { nom: 'Visibilité Think Tank', valeur_actuelle: '1 200/mois', cible: '5 000/mois', standard: 'Observatoire', progression: 24 },
      { nom: 'Publications Think Tank/an', valeur_actuelle: '4', cible: '12', standard: 'Think Tank', progression: 33 },
    ],
    references: [
      { standard: 'OCDE Oslo Manual', niveau_cible: 'Innovation System Mature', benchmark: 'Deloitte: 8% CA R&D, 50+ brevets', ecart: '7.5% CA R&D' },
      { standard: 'ISO 56002 — Innovation Management', niveau_cible: 'Certifié', benchmark: 'McKinsey Global Institute: 15 publications/an', ecart: '11 publications' },
      { standard: 'Chatham House Rule', niveau_cible: 'Think Tank reconnu', benchmark: 'IFRI: 500K visites/mois, Comité Nobel', ecart: '498.8K visites' },
    ],
    dependances: ['bloc-delta'],
    impacts_axes: ['Innovation', 'Think Tank', 'Production Intellectuelle'],
    impact_risques: ['RISK-011'],
    jalon_cle: 'Innovation Lab + 3 brevets + Comité Scientifique — KOS Think Tank niveau international',
  },

  // ===== BLOC ETA — QUALITÉ LOGICIELLE & PERFORMANCE =====
  {
    id: 'bloc-eta',
    numero: 'η',
    nom: 'Qualité Logicielle & Performance Opérationnelle',
    acronyme: 'QLP-PER',
    icon: 'ri-code-s-slash-line',
    couleur: 'accent',
    description: 'Montée en qualité logicielle (tests 5%→60%, dette technique ÷4, bundle 1.8MB→0.5MB, SonarQube) et performance opérationnelle (time tracking, productivité CA/consultant 85M→120M, NPS trimestriel, CSAT post-mission).',
    priorite_globale: 'P1',
    horizon: '0—365 jours',
    score_bloc_actuel: 44,
    score_bloc_cible: 90,
    budget_total: '39 500 000 FCFA',
    responsable_principal: 'CTO + COO',
    statut_global: 'critique',
    actions: [
      { id: 'QAL-A01', axe_origine: 'Qualité Logicielle', action: 'Programme de tests — couverture 5%→60%', description: '200 tests unitaires critiques, 50 tests d\'intégration, 20 tests E2E (parcours clés).', priorite: 'P0', effort: '200h', budget: '15 000 000 FCFA', responsable: 'CTO + Lead Dev', kpi: 'Couverture ≥ 60%, 0 régression', deadline: '2027-06-30', statut: 'en_attente' },
      { id: 'QAL-A03', axe_origine: 'Qualité Logicielle', action: 'Sprint dette technique trimestriel', description: 'Sprint dédié chaque trimestre (2 semaines). Focus : refactoring, optimisation bundle, documentation.', priorite: 'P1', effort: '80h/trim', budget: '4 000 000 FCFA/trim', responsable: 'CTO', kpi: 'Dette technique -25%/trimestre', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'PER-A01', axe_origine: 'Performance', action: 'Time tracking + benchmark Big Four', description: 'Système de time tracking pour toutes les missions. Benchmarker les temps vs standards Big Four.', priorite: 'P0', effort: '40h', budget: '3 500 000 FCFA', responsable: 'COO', kpi: '100% missions trackées, benchmark live', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'PER-A02', axe_origine: 'Performance', action: 'Productivité CA/consultant 85M→120M', description: 'Amélioration productivité : automatisation, meilleure allocation, montée en gamme des mandats.', priorite: 'P0', effort: '120h', budget: '15 000 000 FCFA', responsable: 'Managing Partner + COO', kpi: 'CA/consultant ≥ 120M FCFA', deadline: '2027-12-31', statut: 'en_attente' },
      { id: 'PER-A03', axe_origine: 'Performance', action: 'NPS trimestriel + CSAT post-mission', description: 'Mesure NPS trimestrielle et CSAT systématique après chaque mission. Dashboard satisfaction KOS.', priorite: 'P1', effort: '30h', budget: '2 000 000 FCFA', responsable: 'Client Success Manager', kpi: 'NPS ≥ 65, CSAT ≥ 4.5/5', deadline: '2026-12-31', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Couverture de tests', valeur_actuelle: '5%', cible: '60%', standard: 'Big Four', progression: 8 },
      { nom: 'Dette technique', valeur_actuelle: '28 j-h', cible: '7 j-h', standard: 'ISO', progression: 25 },
      { nom: 'Bundle JS', valeur_actuelle: '1.8 MB', cible: '0.5 MB', standard: 'Big Four', progression: 28 },
      { nom: 'CA/consultant', valeur_actuelle: '85M FCFA', cible: '120M FCFA', standard: 'Big Four', progression: 71 },
      { nom: 'NPS', valeur_actuelle: '42', cible: '65', standard: 'Big Four', progression: 65 },
      { nom: 'Score SonarQube', valeur_actuelle: 'Non mesuré', cible: '85/100', standard: 'ISO', progression: 0 },
    ],
    references: [
      { standard: 'ISO 25010 — Software Quality', niveau_cible: 'Couverture ≥ 60%', benchmark: 'Deloitte Digital: Couverture 85%', ecart: '55 pts couverture' },
      { standard: 'Jest Testing Pyramid', niveau_cible: 'Pyramid équilibrée', benchmark: 'PwC: 70% unitaire, 20% intégration, 10% E2E', ecart: 'Pas de tests' },
      { standard: 'ITIL 4 — Service Value Chain', niveau_cible: 'Productivité ≥ 120M/consultant', benchmark: 'McKinsey: 180M/consultant', ecart: '35M/consultant' },
    ],
    dependances: ['bloc-beta', 'bloc-delta'],
    impacts_axes: ['Qualité Logicielle', 'Performance Opérationnelle'],
    impact_risques: ['RISK-004', 'RISK-014'],
    jalon_cle: 'Couverture tests 60% + CA/consultant 120M — Qualité et Productivité niveau Big Four',
  },

  // ===== BLOC THETA — DATA & KNOWLEDGE EXCELLENCE =====
  {
    id: 'bloc-theta',
    numero: 'θ',
    nom: 'Data & Knowledge Excellence',
    acronyme: 'DAT-KNW',
    icon: 'ri-database-2-line',
    couleur: 'secondary',
    description: 'Excellence des données et des connaissances : Data Catalog complet (200+ tables), migration taxonomie vers SKOS, versionnement automatique des documents, data quality monitoring, Research Data Warehouse, restore tests trimestriels.',
    priorite_globale: 'P1',
    horizon: '0—365 jours',
    score_bloc_actuel: 52,
    score_bloc_cible: 92,
    budget_total: '44 000 000 FCFA',
    responsable_principal: 'CTO + Knowledge Manager',
    statut_global: 'critique',
    actions: [
      { id: 'DAT-A01', axe_origine: 'Données', action: 'Créer Data Catalog KOS', description: 'Catalogue de données complet : 200+ tables documentées avec propriétaire, sensibilité, retention.', priorite: 'P1', effort: '80h', budget: '6 000 000 FCFA', responsable: 'CTO + Data Architect', kpi: 'Data catalog live, 100% tables documentées', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'DAT-A03', axe_origine: 'Données', action: 'Restore test trimestriel', description: 'Test de restauration complet trimestriel avec scénarios. Rapport automatisé dans KOS.', priorite: 'P1', effort: '16h/trim', budget: '2 000 000 FCFA', responsable: 'DevOps', kpi: '4 restore tests/an, 0 échec', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'BDC-A01', axe_origine: 'Base Connaissances', action: 'Migrer taxonomie vers SKOS', description: 'Standardiser la taxonomie KOS selon SKOS avec mappings Dublin Core.', priorite: 'P1', effort: '100h', budget: '8 000 000 FCFA', responsable: 'Knowledge Manager + CTO', kpi: 'Taxonomie SKOS, 100% documents mappés', deadline: '2027-03-31', statut: 'en_attente' },
      { id: 'BDC-A02', axe_origine: 'Base Connaissances', action: 'Versionnement automatique + audit trail', description: 'Versionnement automatique de tous les documents avec historique complet.', priorite: 'P1', effort: '60h', budget: '5 000 000 FCFA', responsable: 'CTO', kpi: '100% documents versionnés', deadline: '2026-12-31', statut: 'en_attente' },
      { id: 'BDC-A03', axe_origine: 'Base Connaissances', action: 'Extension couverture GABAC + lusophone', description: 'Ajouter couverture GABAC et autorités lusophones (Banco de Moçambique, Angola).', priorite: 'P2', effort: '80h', budget: '6 000 000 FCFA', responsable: 'Regulatory Intelligence', kpi: '+2 autorités, +50 textes', deadline: '2027-06-30', statut: 'en_attente' },
      { id: 'PIN-A01', axe_origine: 'Production Intellectuelle', action: 'Standardiser méthodologie de recherche', description: 'Template méthodologique standard pour toutes les publications.', priorite: 'P1', effort: '24h', budget: '1 500 000 FCFA', responsable: 'Research Director', kpi: '100% publications avec méthodo', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'PIN-A02', axe_origine: 'Production Intellectuelle', action: 'Research Data Warehouse', description: 'Structurer toutes les données de recherche dans une base interrogable avec API.', priorite: 'P1', effort: '80h', budget: '10 000 000 FCFA', responsable: 'CTO + Research Director', kpi: 'Base opérationnelle', deadline: '2027-03-31', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Tables documentées (catalogue)', valeur_actuelle: '15%', cible: '100%', standard: 'ISO', progression: 15 },
      { nom: 'Taxonomie standardisée (SKOS)', valeur_actuelle: '0%', cible: '100%', standard: 'ISO', progression: 0 },
      { nom: 'Documents versionnés', valeur_actuelle: '45%', cible: '100%', standard: 'ISO', progression: 45 },
      { nom: 'Score qualité métadonnées', valeur_actuelle: '78%', cible: '95%', standard: 'Think Tank', progression: 82 },
      { nom: 'Publications méthodo standard', valeur_actuelle: '35%', cible: '100%', standard: 'Observatoire', progression: 35 },
      { nom: 'Restore tests/an', valeur_actuelle: '0', cible: '4', standard: 'ISO', progression: 0 },
    ],
    references: [
      { standard: 'DAMA-DMBOK', niveau_cible: 'Data Catalog complet', benchmark: 'Deloitte: 100% tables cataloguées, data lineage', ecart: '85% tables non cataloguées' },
      { standard: 'ISO 25964 — Thesauri', niveau_cible: 'Taxonomie SKOS', benchmark: 'Bibliothèque du Congrès: SKOS 100%', ecart: '0% SKOS' },
      { standard: 'ISO 30401:2018 — Knowledge Management', niveau_cible: 'KM System certifié', benchmark: 'NASA: Knowledge Map complet, 100% versionné', ecart: '55% non versionné' },
    ],
    dependances: ['bloc-beta'],
    impacts_axes: ['Données', 'Base de Connaissances', 'Production Intellectuelle'],
    impact_risques: ['RISK-009'],
    jalon_cle: 'Data Catalog 100% + Taxonomie SKOS — KOS Data & Knowledge certifié ISO',
  },

  // ===== BLOC IOTA — SITE WEB & EXPÉRIENCE =====
  {
    id: 'bloc-iota',
    numero: 'ι',
    nom: 'Site Web & Expérience Digitale',
    acronyme: 'WEB-UX',
    icon: 'ri-globe-line',
    couleur: 'primary',
    description: 'Optimisation du site khepraexperts.com : accessibilité WCAG 2.1 AA, Core Web Vitals 100% Good, tunnel de conversion analytics complet, A/B testing continu, design micro-interactions, SEO local landing pages.',
    priorite_globale: 'P1',
    horizon: '0—180 jours',
    score_bloc_actuel: 66,
    score_bloc_cible: 93,
    budget_total: '18 500 000 FCFA',
    responsable_principal: 'Lead Dev Frontend + Growth Director',
    statut_global: 'en_cours',
    actions: [
      { id: 'WEB-A01', axe_origine: 'Site Web', action: 'Audit WCAG 2.1 AA + corrections', description: 'Audit complet d\'accessibilité : contrastes, labels ARIA, navigation clavier, landmarks.', priorite: 'P1', effort: '60h', budget: '7 500 000 FCFA', responsable: 'Lead Dev Frontend', kpi: 'Score WCAG ≥ 95%, 0 erreur critique', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'WEB-A02', axe_origine: 'Site Web', action: 'Tunnel de conversion analytics complet', description: 'Tracking complet : landing page → formulaire → lead → MQL → SQL → contrat.', priorite: 'P0', effort: '30h', budget: '3 000 000 FCFA', responsable: 'CTO + Growth Director', kpi: 'Tunnel mesuré, taux conversion par étape', deadline: '2026-08-31', statut: 'en_attente' },
      { id: 'WEB-A03', axe_origine: 'Site Web', action: 'Programme CRO — A/B testing continu', description: 'A/B testing sur pages critiques. 2 tests/mois minimum.', priorite: 'P1', effort: '40h', budget: '5 000 000 FCFA', responsable: 'Growth Director', kpi: '2 A/B tests/mois, +15% conversion', deadline: '2026-11-30', statut: 'en_attente' },
      { id: 'BRD-A02', axe_origine: 'Branding', action: 'Digital Brand Book interactif', description: 'Brand book digital interactif accessible via KOS pour toute l\'équipe.', priorite: 'P1', effort: '40h', budget: '3 000 000 FCFA', responsable: 'Design Lead + CTO', kpi: 'Brand book live, 100% équipe onboarded', deadline: '2026-10-31', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'Score Core Web Vitals', valeur_actuelle: '82% Good', cible: '100% Good', standard: 'Big Four', progression: 82 },
      { nom: 'Score WCAG 2.1 AA', valeur_actuelle: '62%', cible: '95%', standard: 'ISO', progression: 65 },
      { nom: 'Taux conversion landing pages', valeur_actuelle: '2.8%', cible: '6%', standard: 'Big Four', progression: 47 },
      { nom: 'Bounce rate', valeur_actuelle: '48%', cible: '32%', standard: 'Big Four', progression: 67 },
    ],
    references: [
      { standard: 'Google Core Web Vitals', niveau_cible: '100% Good', benchmark: 'Deloitte.com: 98% Good, LCP 1.2s', ecart: '18 pts' },
      { standard: 'WCAG 2.1 AA', niveau_cible: 'Conforme 95%+', benchmark: 'EY: WCAG AAA sur pages clés', ecart: '33 pts WCAG' },
      { standard: 'Baymard Institute', niveau_cible: 'Conversion ≥ 6%', benchmark: 'McKinsey: Taux conversion 8%', ecart: '3.2 pts conversion' },
    ],
    dependances: ['bloc-alpha'],
    impacts_axes: ['Site Web', 'Branding'],
    impact_risques: ['RISK-008'],
    jalon_cle: 'WCAG 95% + Tunnel conversion live + CRO actif — Site Web niveau Big Four',
  },

  // ===== BLOC KAPPA — GOUVERNANCE & STRATÉGIE =====
  {
    id: 'bloc-kappa',
    numero: 'κ',
    nom: 'Gouvernance & Alignement Stratégique',
    acronyme: 'GOV-STR',
    icon: 'ri-eye-line',
    couleur: 'accent',
    description: 'Formalisation de la gouvernance : OKRs par BU, chartes des 5 comités, Strategy Map visuelle + Balanced Scorecard, certification ISO 37301, formalisation BMC, Competitive Intelligence Dashboard.',
    priorite_globale: 'P1',
    horizon: '0—365 jours',
    score_bloc_actuel: 62,
    score_bloc_cible: 94,
    budget_total: '32 500 000 FCFA',
    responsable_principal: 'Managing Partner + COO',
    statut_global: 'en_cours',
    actions: [
      { id: 'VSG-A01', axe_origine: 'Vision & Stratégie', action: 'Déployer OKRs par BU avec dashboard KOS', description: 'Système d\'OKRs pour chaque BU, lié au Strategic Plan, dashboard KOS Enterprise Control Tower.', priorite: 'P1', effort: '24h', budget: '3 500 000 FCFA', responsable: 'Managing Partner + COO', kpi: '100% BUs avec OKRs trimestriels', deadline: '2026-08-31', statut: 'en_attente' },
      { id: 'VSG-A02', axe_origine: 'Vision & Stratégie', action: 'Formaliser chartes des 5 comités', description: 'Chartes des Comités : Stratégique, Audit, Risques, Innovation, Rémunération.', priorite: 'P1', effort: '16h', budget: '1 200 000 FCFA', responsable: 'Managing Partner', kpi: '5 chartes adoptées par le COMEX', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'VSG-A03', axe_origine: 'Vision & Stratégie', action: 'Créer Strategy Map visuelle + Balanced Scorecard', description: 'Strategy Map 4 perspectives BSC intégrée dans KOS avec KPIs liés automatiquement.', priorite: 'P2', effort: '32h', budget: '4 800 000 FCFA', responsable: 'CTO + COO', kpi: 'Strategy Map live dans KOS', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'BMD-A03', axe_origine: 'Business Model', action: 'Dashboard SaaS metrics live dans KOS', description: 'Dashboard ARR/MRR/CAC/LTV/NPS temps réel dans KOS Enterprise Control Tower.', priorite: 'P1', effort: '40h', budget: '6 000 000 FCFA', responsable: 'CTO', kpi: 'Dashboard live avec mise à jour quotidienne', deadline: '2026-09-30', statut: 'en_attente' },
      { id: 'MCO-A01', axe_origine: 'Marché & Concurrence', action: 'Créer Competitive Intelligence Dashboard', description: 'Dashboard surveillant Big Four + cabinets régionaux + plateformes IA : pricing, publications, recrutements.', priorite: 'P1', effort: '56h', budget: '8 000 000 FCFA', responsable: 'Market Intelligence Director', kpi: 'Dashboard live, 50+ signaux suivis', deadline: '2026-10-31', statut: 'en_attente' },
      { id: 'REG-A02', axe_origine: 'Conformité', action: 'Certification ISO 37301 — Compliance Management', description: 'Préparer et obtenir la certification ISO 37301:2021. Audit à blanc Q4 2026, certification Q1 2027.', priorite: 'P1', effort: '120h', budget: '10 200 000 FCFA', responsable: 'CCO', kpi: 'Certification ISO 37301 obtenue', deadline: '2027-03-31', statut: 'en_attente' },
    ],
    kpis: [
      { nom: 'OKRs déployés par BU', valeur_actuelle: '0/4', cible: '4/4', standard: 'Big Four', progression: 0 },
      { nom: 'Comités avec charte', valeur_actuelle: '1/5', cible: '5/5', standard: 'COSO', progression: 20 },
      { nom: 'Décisions tracées', valeur_actuelle: '35%', cible: '100%', standard: 'ISO', progression: 35 },
      { nom: 'Certifications ISO obtenues', valeur_actuelle: '0', cible: '3', standard: 'ISO', progression: 0 },
      { nom: 'Signaux concurrentiels suivis', valeur_actuelle: '12', cible: '50', standard: 'Big Four', progression: 24 },
    ],
    references: [
      { standard: 'ISO 37000:2021 — Governance', niveau_cible: 'Gouvernance certifiée', benchmark: 'Deloitte: OKRs 100% BUs, 6 comités', ecart: '4 BUs sans OKRs' },
      { standard: 'COSO 2013', niveau_cible: '5 composantes déployées', benchmark: 'PwC: COSO 100%', ecart: '4 chartes manquantes' },
      { standard: 'ISO 37301:2021', niveau_cible: 'Certifié', benchmark: 'EY: ISO 37301 + ISO 37001', ecart: 'Non certifié' },
    ],
    dependances: ['bloc-alpha'],
    impacts_axes: ['Vision & Stratégie', 'Business Model', 'Marché & Concurrence', 'Conformité'],
    impact_risques: ['RISK-001', 'RISK-005'],
    jalon_cle: 'OKRs 100% + ISO 37301 certifié — Gouvernance niveau Big Four certifié ISO',
  },
];

export const BLOCS_META = {
  generatedFrom: 'KOS Enterprise Transformation Assessment 360°',
  auditId: 'KOS-ETA360-2026-06-26-001',
  totalBlocks: 10,
  totalActions: 57,
  budgetTotal: '500 300 000 FCFA',
  budget12m: '224 500 000 FCFA',
  budget24m: '385 000 000 FCFA',
  budget36m: '500 300 000 FCFA',
  scoreGlobalActuel: 75.8,
  scoreGlobalCible: 97.5,
  horizonGlobal: '36 mois',
  referenceStandards: 'ISO 9001 · ISO 27001 · ISO 31000 · ISO 37000 · ISO 37301 · ISO 42001 · ISO 56002 · COSO ERM · COBIT · ITIL · NIST CSF · NIST AI RMF · TOGAF · PMBOK · BABOK · OWASP ASVS · OHADA · BCEAO · COBAC · CIMA · IFC PS · ISSB · GRI · GAFI · EU AI Act',
};

export function computeBlockKPIs() {
  const blocs = CORRECTIVE_ACTION_BLOCKS;
  const actionsTotal = blocs.reduce((s, b) => s + b.actions.length, 0);
  const actionsP0 = blocs.reduce((s, b) => s + b.actions.filter(a => a.priorite === 'P0').length, 0);
  const actionsP1 = blocs.reduce((s, b) => s + b.actions.filter(a => a.priorite === 'P1').length, 0);
  const actionsP2 = blocs.reduce((s, b) => s + b.actions.filter(a => a.priorite === 'P2').length, 0);
  const scoreMoyen = Math.round(blocs.reduce((s, b) => s + b.score_bloc_actuel, 0) / blocs.length * 10) / 10;
  const blocsCritiques = blocs.filter(b => b.statut_global === 'critique').length;
  const blocsEnCours = blocs.filter(b => b.statut_global === 'en_cours').length;
  const blocsProgresse = blocs.filter(b => b.statut_global === 'progresse').length;
  const blocsMaitrise = blocs.filter(b => b.statut_global === 'maitrise').length;

  return {
    blocs_total: blocs.length,
    actions_total: actionsTotal,
    actions_p0: actionsP0,
    actions_p1: actionsP1,
    actions_p2: actionsP2,
    score_moyen_blocs: scoreMoyen,
    blocs_critiques: blocsCritiques,
    blocs_en_cours: blocsEnCours,
    blocs_progresse: blocsProgresse,
    blocs_maitrise: blocsMaitrise,
    budget_total: '500 300 000 FCFA',
    budget_12m: '224 500 000 FCFA',
    budget_24m: '385 000 000 FCFA',
    budget_36m: '500 300 000 FCFA',
  };
}



