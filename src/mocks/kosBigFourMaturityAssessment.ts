// KOS Big Four Maturity Assessment — Master Prompt 10
// Consortium PwC · Deloitte · EY · KPMG
// Évaluation de maturité sur 10 domaines — Standards internationaux

export interface CorrectiveAction {
  id: string;
  action: string;
  description: string;
  budget: string;
  planning: string;
  responsable: string;
  kpi: string;
  priorite: 'critique' | 'haute' | 'moyenne';
  statut: 'a_faire' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
}

export interface DomainAssessment {
  id: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  description: string;
  score_actuel: number;
  score_cible: number;
  ecart: number;
  standard_reference: string;
  gap_analysis: string;
  actions_correctives: CorrectiveAction[];
  kpis: { nom: string; valeur: number; cible: number }[];
}

export interface RiskMatrixItem {
  id: string;
  domaine: string;
  risque: string;
  probabilite: number;
  impact: number;
  score: number;
  mitigation: string;
  statut: 'actif' | 'mitige' | 'resolu';
}

export interface RoadmapPhase {
  phase: string;
  periode: string;
  description: string;
  actions: { action: string; domaine: string; kpi: string }[];
  score_projete: number;
}

export interface ReadinessReport {
  score_global: number;
  score_cible: number;
  domaines_scores: { domaine: string; score: number }[];
  certification: string;
  recommandations: string[];
  trajectoire: string;
}

export const domainAssessments: DomainAssessment[] = [
  {
    id: 'gouvernance',
    nom: 'Gouvernance d\'Entreprise',
    acronyme: 'GOUV',
    icon: 'ri-government-line',
    couleur: 'primary',
    description: 'Évaluation de la gouvernance KOS selon les standards ISO 37000:2021, COSO 2013, et les circulaires BCEAO/COBAC. Couvre la structure de pilotage, les comités spécialisés, l\'indépendance des organes, et les mécanismes de contrôle interne.',
    score_actuel: 92,
    score_cible: 98,
    ecart: 6,
    standard_reference: 'ISO 37000:2021 — Gouvernance des organismes · COSO 2013 — Internal Control Framework · Circulaire BCEAO 01-2017/CB · Code OHADA AUSCGIE',
    gap_analysis: 'La gouvernance KOS est solide (92/100) mais trois lacunes persistent : (1) absence d\'un comité d\'audit externe formalisé selon les standards COSO, (2) documentation insuffisante des conflits d\'intérêts pour les missions multi-pays, (3) rotation des mandats non systématisée pour les missions > 24 mois.',
    actions_correctives: [
      { id: 'GOV-001', action: 'Création Comité Audit Externe', description: 'Formaliser un comité d\'audit indépendant avec 3 membres externes (anciens régulateurs, professeurs de droit) selon COSO 2013 Principle 2.', budget: '0 FCFA (honoraires symboliques)', planning: 'Juil—Août 2026 (6 semaines)', responsable: 'Managing Partner', kpi: 'Comité opérationnel avec 3 réunions/an', priorite: 'haute' },
      { id: 'GOV-002', action: 'Registre Conflits d\'Intérêts Digital', description: 'Déployer un registre digital des conflits d\'intérêts pour toutes les missions multi-juridictionnelles UEMOA/CEMAC, avec validation automatique par le Compliance Officer.', budget: '3 500 000 FCFA (développement + intégration KOS)', planning: 'Juil—Sep 2026 (10 semaines)', responsable: 'Compliance Officer + CTO', kpi: '100% des missions multi-pays avec registre validé', priorite: 'critique' },
      { id: 'GOV-003', action: 'Politique Rotation des Mandats', description: 'Systématiser la rotation des équipes pour les missions > 24 mois : changement du Senior Manager tous les 24 mois, revue indépendante à 18 mois.', budget: '0 FCFA (réorganisation interne)', planning: 'Août 2026 (4 semaines)', responsable: 'Director BU1 + BU2', kpi: '100% des missions >24 mois avec rotation documentée', priorite: 'moyenne' },
    ],
    kpis: [
      { nom: 'Indépendance du Board', valeur: 90, cible: 98 },
      { nom: 'Transparence décisionnelle', valeur: 94, cible: 98 },
      { nom: 'Conformité COSO 2013', valeur: 88, cible: 95 },
      { nom: 'Gestion conflits d\'intérêts', valeur: 82, cible: 98 },
    ],
  },
  {
    id: 'qualite',
    nom: 'Qualité & Excellence Opérationnelle',
    acronyme: 'QUAL',
    icon: 'ri-shield-check-line',
    couleur: 'accent',
    description: 'Évaluation du système qualité KOS selon les normes ISO 9001:2015, le Big Four Quality Framework (12 contrôles), et les standards de revue par les pairs. Couvre le contrôle qualité des livrables, la standardisation des méthodologies, et l\'amélioration continue.',
    score_actuel: 96,
    score_cible: 99,
    ecart: 3,
    standard_reference: 'ISO 9001:2015 — Quality Management · Big Four Quality Framework — 12 contrôles obligatoires · KOS Quality Assurance Authority™ · Peer Review Standards',
    gap_analysis: 'Le système qualité est le meilleur de KOS (96/100) avec 12/12 contrôles automatisés. Les écarts résiduels sont marginaux : (1) délai de revue qualité > 12h pour 2% des livrables complexes, (2) absence d\'un programme de certification qualité externe (type ISO 9001 formel), (3) benchmark qualité non automatisé vs livrables Big Four.',
    actions_correctives: [
      { id: 'QUAL-001', action: 'Certification ISO 9001:2015 Formelle', description: 'Engager un organisme certificateur accrédité (AFNOR ou équivalent) pour la certification ISO 9001 du système qualité KOS. Audit à blanc Q3 2026, certification Q4 2026.', budget: '12 500 000 FCFA (audit + certification + mise en conformité)', planning: 'Juil—Dec 2026 (6 mois)', responsable: 'CQO (Chief Quality Officer)', kpi: 'Certification ISO 9001 obtenue avant 31 Dec 2026', priorite: 'haute' },
      { id: 'QUAL-002', action: 'SLA Qualité < 8h pour 100% des livrables', description: 'Optimiser le pipeline de revue qualité pour garantir un délai < 8h sur tous les livrables, y compris les plus complexes (rapports > 100 pages). Ajout d\'un reviewer dédié + parallélisation.', budget: '8 000 000 FCFA/an (reviewer dédié)', planning: 'Août—Sep 2026 (8 semaines)', responsable: 'CQO + KOS Quality Assurance Authority™', kpi: 'SLA qualité < 8h sur 100% des livrables', priorite: 'moyenne' },
      { id: 'QUAL-003', action: 'Benchmark Automatisé Big Four', description: 'Développer un module de comparaison automatique des livrables KOS vs livrables Big Four (Deloitte, PwC, EY, KPMG) sur 5 dimensions : structure, profondeur, références, visuels, executive summary.', budget: '6 000 000 FCFA (développement module)', planning: 'Sep—Nov 2026 (10 semaines)', responsable: 'CTO + KOS Automaton Engine™', kpi: 'Score benchmark ≥ 95/100 vs Big Four', priorite: 'moyenne' },
    ],
    kpis: [
      { nom: 'Score qualité global', valeur: 96.2, cible: 99 },
      { nom: 'Taux rejet qualité', valeur: 2.4, cible: 0.5 },
      { nom: 'SLA revue qualité', valeur: 92, cible: 100 },
      { nom: '12/12 contrôles automatisés', valeur: 100, cible: 100 },
    ],
  },
  {
    id: 'ia',
    nom: 'Intelligence Artificielle & Gouvernance IA',
    acronyme: 'IA',
    icon: 'ri-brain-line',
    couleur: 'primary',
    description: 'Évaluation de la maturité IA de KOS selon l\'ISO 42001:2023, le NIST AI RMF 1.0, les principes OCDE sur l\'IA, et le EU AI Act. Couvre le registre des agents, la gestion des biais, la transparence algorithmique, et la robustesse des modèles.',
    score_actuel: 88,
    score_cible: 97,
    ecart: 9,
    standard_reference: 'ISO 42001:2023 — AI Management System · NIST AI RMF 1.0 — AI Risk Management Framework · OCDE AI Principles 2019 · EU AI Act 2024 (Article 14 — Transparence)',
    gap_analysis: 'Le framework IA est avancé (88/100) mais trois écarts majeurs : (1) le Digital Twin Engine (score 6.4/10 ISO 42001) n\'est pas conforme EU AI Act Art.14 sur l\'explicabilité, (2) 2 agents utilisent des API externes (Claude/GPT) sans sandboxing complet, (3) le programme de formation IA éthique n\'est déployé qu\'à 40% du personnel.',
    actions_correctives: [
      { id: 'IA-001', action: 'Conformité EU AI Act — Digital Twin', description: 'Mise en conformité complète du Digital Twin Engine avec l\'Article 14 (transparence) et l\'Article 15 (exactitude) du EU AI Act. Documentation de l\'explicabilité, audit externe, certification.', budget: '18 000 000 FCFA (refactoring + audit externe + documentation)', planning: 'Juil—Oct 2026 (14 semaines)', responsable: 'CTO + AI Ethics Board', kpi: 'Digital Twin conforme EU AI Act — Score ISO 42001 ≥ 9.0/10', priorite: 'critique' },
      { id: 'IA-002', action: 'Sandboxing Complet API Externes', description: 'Déployer un environnement sandbox isolé pour les 2 agents utilisant des API externes (Claude 3.5 Sonnet, GPT-4o). Zéro accès aux données réglementaires, financières ou clients depuis ces agents.', budget: '5 200 000 FCFA (architecture sandbox + déploiement)', planning: 'Juil—Août 2026 (6 semaines)', responsable: 'CTO + RSSI', kpi: '100% des appels API externes sandboxés, audit trimestriel', priorite: 'critique' },
      { id: 'IA-003', action: 'Formation IA Éthique 100% Personnel', description: 'Déployer le programme de formation IA éthique à 100% du personnel (actuellement 40%). Modules : biais algorithmiques, transparence, droits des utilisateurs, régulation IA.', budget: '4 800 000 FCFA (contenu + plateforme LMS + certification)', planning: 'Août—Nov 2026 (14 semaines)', responsable: 'DRH + AI Ethics Board', kpi: '100% du personnel certifié IA Éthique avant 30 Nov 2026', priorite: 'haute' },
    ],
    kpis: [
      { nom: 'Alignement ISO 42001', valeur: 87.5, cible: 97 },
      { nom: 'Alignement NIST AI RMF', valeur: 85, cible: 95 },
      { nom: 'Taux d\'hallucination', valeur: 0.12, cible: 0.05 },
      { nom: 'Score biais global (inversé)', valeur: 3.0, cible: 1.5 },
    ],
  },
  {
    id: 'conformite',
    nom: 'Conformité Réglementaire',
    acronyme: 'CONF',
    icon: 'ri-file-search-line',
    couleur: 'accent',
    description: 'Évaluation de la conformité réglementaire KOS selon les exigences BCEAO, COBAC, OHADA, GAFI, RGPD, et les normes internationales de due diligence réglementaire. Couvre la veille, l\'analyse d\'impact, et les matrices de conformité.',
    score_actuel: 90,
    score_cible: 98,
    ecart: 8,
    standard_reference: 'BCEAO — 89 textes suivis · COBAC — 61 textes suivis · OHADA — AUSCGIE, AUDCG · GAFI — 40 Recommandations · RGPD — 99 articles · ISO 37301:2021 — Compliance Management',
    gap_analysis: 'La conformité est bien couverte (90/100) avec 417 textes suivis et 8 autorités surveillées. Les écarts : (1) couverture CEMAC (COBAC) à 94% vs 98% UEMOA (BCEAO), (2) délai d\'analyse d\'impact de 8.5h contre 6h cible, (3) absence de certification ISO 37301 (Compliance Management Systems).',
    actions_correctives: [
      { id: 'CONF-001', action: 'Couverture COBAC → 98%', description: 'Renforcer la couverture réglementaire CEMAC : ajouter 8 textes COBAC manquants, recruter un analyste réglementaire basé à Douala, activer la veille GABAC en temps réel.', budget: '15 000 000 FCFA/an (analyste Douala + abonnements)', planning: 'Juil—Sep 2026 (10 semaines)', responsable: 'Regulatory Intelligence Center', kpi: 'Couverture COBAC ≥ 98%, délai détection < 3h', priorite: 'critique' },
      { id: 'CONF-002', action: 'Automatisation Analyse d\'Impact', description: 'Développer un module d\'analyse d\'impact semi-automatique utilisant le RAG Réglementaire pour réduire le délai de 8.5h à < 4h. Template Big Four, scoring automatique, recommandations générées.', budget: '9 500 000 FCFA (développement RAG + templates)', planning: 'Août—Oct 2026 (10 semaines)', responsable: 'CTO + Regulatory Intelligence Center', kpi: 'Délai analyse d\'impact < 4h (cible initiale 6h dépassée)', priorite: 'haute' },
      { id: 'CONF-003', action: 'Certification ISO 37301:2021', description: 'Préparer et obtenir la certification ISO 37301 (Compliance Management Systems). Audit à blanc Q3 2026, certification Q1 2027.', budget: '10 200 000 FCFA (audit + certification + gap closing)', planning: 'Sep 2026—Mar 2027 (6 mois)', responsable: 'CCO (Chief Compliance Officer)', kpi: 'Certification ISO 37301 obtenue avant 31 Mar 2027', priorite: 'moyenne' },
    ],
    kpis: [
      { nom: 'Couverture réglementaire globale', valeur: 92, cible: 98 },
      { nom: 'Délai détection alerte', valeur: 3.8, cible: 2.0 },
      { nom: 'Délai analyse impact', valeur: 8.5, cible: 4.0 },
      { nom: 'Matrices conformité à jour', valeur: 94, cible: 100 },
    ],
  },
  {
    id: 'risques',
    nom: 'Gestion des Risques',
    acronyme: 'RISK',
    icon: 'ri-alert-line',
    couleur: 'secondary',
    description: 'Évaluation de la maturité de gestion des risques selon ISO 31000:2018, COSO ERM 2017, et les exigences prudentielles BCEAO/COBAC. Couvre l\'identification, l\'évaluation, la mitigation et le monitoring des risques.',
    score_actuel: 84,
    score_cible: 95,
    ecart: 11,
    standard_reference: 'ISO 31000:2018 — Risk Management · COSO ERM 2017 — Enterprise Risk Management · BCEAO — Dispositif prudentiel · COBAC — R-2024/01 Risques opérationnels',
    gap_analysis: 'La gestion des risques est le deuxième plus faible score (84/100). Écarts majeurs : (1) la cartographie des risques couvre 8 risques mais manque les risques émergents (cyber APT, crise climatique, risque de réputation viral), (2) le PCA/PRA n\'a pas été testé depuis >12 mois, (3) absence d\'un comité risques formalisé avec réunions trimestrielles documentées.',
    actions_correctives: [
      { id: 'RISK-001', action: 'Cartographie Risques Étendue (8 → 15)', description: 'Étendre la cartographie des risques de 8 à 15 risques : ajouter Cyber APT, Crise Climatique, Réputation Viral, Dépendance Tech, Attrition Talents, Risque de Change, Risque Souverain.', budget: '7 500 000 FCFA (workshops + documentation + intégration KOS)', planning: 'Juil—Août 2026 (6 semaines)', responsable: 'CRO (Chief Risk Officer)', kpi: '15 risques cartographiés, matrice 5×5 complète', priorite: 'critique' },
      { id: 'RISK-002', action: 'Test PCA/PRA Semestriel', description: 'Mettre en place un programme de test PCA/PRA semestriel avec scénarios réalistes (ransomware, perte datacenter, crise réputationnelle). Premier test : 15 Juillet 2026.', budget: '6 800 000 FCFA/an (exercices + facilitateur externe + rapport)', planning: 'Juil 2026 — Permanent (semestriel)', responsable: 'CRO + RSSI + DSI', kpi: '2 tests PCA/PRA par an, rapport d\'amélioration continue', priorite: 'critique' },
      { id: 'RISK-003', action: 'Comité Risques Trimestriel', description: 'Formaliser un comité risques trimestriel avec le Managing Partner, CRO, CCO, RSSI, et DAF. Ordre du jour standardisé, compte-rendu archivé dans KOS.', budget: '0 FCFA (réunions internes)', planning: 'Juil 2026 — Permanent (trimestriel)', responsable: 'Managing Partner + CRO', kpi: '4 réunions/an documentées, 100% des risques revus', priorite: 'haute' },
    ],
    kpis: [
      { nom: 'Risques cartographiés', valeur: 8, cible: 15 },
      { nom: 'Score mitigation', valeur: 65, cible: 90 },
      { nom: 'Couverture KRIs', valeur: 78, cible: 95 },
      { nom: 'Tests PCA/PRA à jour', valeur: 0, cible: 2 },
    ],
  },
  {
    id: 'cybersecurite',
    nom: 'Cybersécurité & Résilience',
    acronyme: 'CYBER',
    icon: 'ri-shield-flash-line',
    couleur: 'primary',
    description: 'Évaluation de la cybersécurité KOS selon ISO 27001:2022, NIST CSF 2.0, OWASP Top 10, et la directive COBAC 2027 sur la résilience opérationnelle. Couvre la gouvernance sécurité, la protection, la détection et la réponse aux incidents.',
    score_actuel: 86,
    score_cible: 97,
    ecart: 11,
    standard_reference: 'ISO 27001:2022 — Information Security · NIST CSF 2.0 — Cybersecurity Framework · OWASP Top 10 2021 · Directive COBAC 2027 — Résilience Opérationnelle · RGPD',
    gap_analysis: 'La cybersécurité est solide (86/100) mais la directive COBAC 2027 change la donne. Écarts : (1) 5 gaps ISO 27001 critiques non résolus (dont sécurité physique A.11, SDLC A.14), (2) SOC 24/7 déployé mais MTTD 18min > cible 5min, (3) pas de Red Team Exercise annuel, (4) notification incidents < 4h non testée.',
    actions_correctives: [
      { id: 'CYB-001', action: 'Résolution 5 Gaps ISO 27001', description: 'Résoudre les 5 gaps critiques ISO 27001 : contrôle d\'accès biométrique (A.11), SDLC documenté (A.14), clauses sécurité fournisseurs (A.15), formation sécurité 100% (A.7), PCA/PRA testé (A.17).', budget: '17 200 000 FCFA (total 5 gaps — détaillé dans Enterprise Security)', planning: 'Juil—Sep 2026 (10 semaines)', responsable: 'RSSI + DAF + DRH', kpi: 'ISO 27001 — 114/114 contrôles passés (100%)', priorite: 'critique' },
      { id: 'CYB-002', action: 'SIEM + MTTD < 5min', description: 'Déployer un SIEM nouvelle génération avec threat intelligence feed temps réel pour réduire le MTTD de 18min à < 5min. Automatisation des playbooks de réponse (SOAR).', budget: '22 000 000 FCFA (licence SIEM + intégration + formation)', planning: 'Juil—Oct 2026 (14 semaines)', responsable: 'RSSI + SOC Manager', kpi: 'MTTD < 5min, MTTR < 15min, SLA 100%', priorite: 'critique' },
      { id: 'CYB-003', action: 'Red Team Exercise Annuel', description: 'Mettre en place un Red Team Exercise annuel avec une firme externe spécialisée. Premier exercice : Octobre 2026. Scénarios : APT, ransomware, social engineering, exfiltration.', budget: '14 500 000 FCFA/an (firme externe + remediation)', planning: 'Oct 2026 — Permanent (annuel)', responsable: 'RSSI + COMEX', kpi: '1 Red Team/an, rapport d\'amélioration, 0 critique non résolu', priorite: 'haute' },
    ],
    kpis: [
      { nom: 'Score ISO 27001', valeur: 78, cible: 100 },
      { nom: 'Score NIST CSF', valeur: 82, cible: 95 },
      { nom: 'MTTD (détection)', valeur: 18, cible: 5 },
      { nom: 'Red Team à jour', valeur: 0, cible: 1 },
    ],
  },
  {
    id: 'seo',
    nom: 'SEO & Visibilité Organique',
    acronyme: 'SEO',
    icon: 'ri-search-line',
    couleur: 'accent',
    description: 'Évaluation de la maturité SEO selon les Google Search Essentials, les Core Web Vitals, et les meilleures pratiques EEAT. Couvre le SEO on-page, technique, le contenu, les backlinks et le schema.org.',
    score_actuel: 85,
    score_cible: 97,
    ecart: 12,
    standard_reference: 'Google Search Essentials 2024 · Core Web Vitals (LCP/INP/CLS) · EEAT Guidelines · Schema.org · WCAG 2.1 AA',
    gap_analysis: 'Le SEO est en forte progression (85/100, +15 pts depuis Juin) mais reste en-dessous du seuil Big Four. Écarts : (1) seulement 52 featured snippets actifs (cible 150), (2) 14 erreurs Schema.org résiduelles, (3) Core Web Vitals mobile LCP à 2.4s (> seuil 2.5s pour 18% des pages), (4) Domain Rating 75 vs cible 85.',
    actions_correctives: [
      { id: 'SEO-001', action: 'Featured Snippets → 150', description: 'Programme d\'optimisation massive des featured snippets : reformuler 100 H2 en questions, générer 100 réponses concises 40-60 mots, déployer FAQ Schema sur 30 pages additionnelles.', budget: '4 200 000 FCFA (content team + validation)', planning: 'Juil—Sep 2026 (10 semaines)', responsable: 'SEO Director + Content Team', kpi: '150 featured snippets actifs, +250% CTR', priorite: 'critique' },
      { id: 'SEO-002', action: 'Core Web Vitals Mobile 100% Pass', description: 'Optimiser les 18% de pages avec LCP > 2.5s : compression images WebP avancée, lazy loading natif, critical CSS inline, defer JS non-critique.', budget: '3 800 000 FCFA (optimisation technique)', planning: 'Juil—Août 2026 (6 semaines)', responsable: 'CTO + Performance Team', kpi: 'Core Web Vitals Mobile — 100% pages "Good" (vert GSC)', priorite: 'haute' },
      { id: 'SEO-003', action: 'Domain Rating 75 → 85', description: 'Campagne backlinks ciblée : 50 nouveaux backlinks depuis sites .gov, .edu, et régulateurs africains. Guest posting, partnerships académiques, citations dans rapports officiels.', budget: '8 000 000 FCFA (outreach + contenu + relations presse)', planning: 'Août—Dec 2026 (5 mois)', responsable: 'SEO Director + PR', kpi: 'DR 85, +50 backlinks haute autorité, DA > 60', priorite: 'haute' },
    ],
    kpis: [
      { nom: 'Score SEO Global', valeur: 85, cible: 97 },
      { nom: 'Domain Rating', valeur: 75, cible: 85 },
      { nom: 'Featured Snippets', valeur: 52, cible: 150 },
      { nom: 'CWV Mobile Pass Rate', valeur: 82, cible: 100 },
    ],
  },
  {
    id: 'geo',
    nom: 'GEO — Generative Engine Optimization',
    acronyme: 'GEO',
    icon: 'ri-robot-2-line',
    couleur: 'secondary',
    description: 'Évaluation de la visibilité sur les moteurs IA générative (ChatGPT, Gemini, Claude, Perplexity, Copilot). Couvre l\'optimisation des contenus, les FAQs structurées, le Knowledge Graph, et le Share of Voice.',
    score_actuel: 82,
    score_cible: 96,
    ecart: 14,
    standard_reference: 'GEO Best Practices 2026 · OpenAI GPTBot Guidelines · Google-Extended · ClaudeBot · PerplexityBot · Schema.org Speakable',
    gap_analysis: 'Le GEO est le plus faible des 10 domaines (82/100). Écarts majeurs : (1) Share of Voice de seulement 38% (cible 50%), (2) Copilot à 78% de présence (vs 96% ChatGPT), (3) seulement 24 glossaires optimisés pour les Knowledge Panels, (4) pas de stratégie de contenu multimodale (audio, vidéo) pour les moteurs IA.',
    actions_correctives: [
      { id: 'GEO-001', action: 'Share of Voice 38% → 50%', description: 'Programme intensif d\'optimisation GEO : 25 000 FAQs additionnelles, 6 nouveaux pillar pages optimisés multi-moteur, partenariat avec les crawlers IA pour indexation prioritaire.', budget: '6 500 000 FCFA (content + outils + outreach IA)', planning: 'Juil—Nov 2026 (18 semaines)', responsable: 'GEO Director + Content Factory', kpi: 'SOV 50%, présence 5/5 moteurs ≥ 90%, citations IA ×2', priorite: 'critique' },
      { id: 'GEO-002', action: 'Glossaires → 50 termes optimisés', description: 'Étendre le glossaire de 24 à 50 termes optimisés pour les Knowledge Panels Google et les réponses IA. Chaque terme : définition, contexte, synonymes, références officielles.', budget: '3 200 000 FCFA (rédaction + structuration)', planning: 'Août—Oct 2026 (10 semaines)', responsable: 'Knowledge Graph Team', kpi: '50 glossaires indexés, 15 Knowledge Panels actifs', priorite: 'haute' },
      { id: 'GEO-003', action: 'Contenu Multimodal pour Moteurs IA', description: 'Développer une stratégie de contenu multimodal : résumés audio des articles (podcast), infographies vectorielles indexables, transcriptions vidéo optimisées pour la recherche IA.', budget: '9 000 000 FCFA (production audio/vidéo + infrastructure)', planning: 'Sep 2026—Mar 2027 (6 mois)', responsable: 'Content Factory + Studio', kpi: '50 podcasts, 100 infographies, présence multimodale 5 moteurs', priorite: 'moyenne' },
    ],
    kpis: [
      { nom: 'Score GEO Global', valeur: 82, cible: 96 },
      { nom: 'Share of Voice', valeur: 38, cible: 50 },
      { nom: 'Citations IA/mois', valeur: 24800, cible: 50000 },
      { nom: 'Présence Copilot', valeur: 78, cible: 92 },
    ],
  },
  {
    id: 'recherche',
    nom: 'Recherche & Production Intellectuelle',
    acronyme: 'RECH',
    icon: 'ri-book-open-line',
    couleur: 'primary',
    description: 'Évaluation de la capacité de recherche et de production intellectuelle selon les standards des Research Institutes Big Four. Couvre les publications, les citations académiques, les baromètres, et le thought leadership.',
    score_actuel: 89,
    score_cible: 97,
    ecart: 8,
    standard_reference: 'Deloitte Research Center · PwC Strategy& · EY Knowledge · KPMG International · Standards académiques (peer-reviewed, H-Index, citations)',
    gap_analysis: 'La recherche est bien positionnée (89/100) avec 7 baromètres et 100K documents. Écarts : (1) seulement 500 citations académiques (cible 2 500 pour un Research Institute Big Four), (2) absence de publication dans des revues académiques peer-reviewed, (3) pas de chaire de recherche universitaire partenaire, (4) H-Index de 18 vs 35 cible.',
    actions_correctives: [
      { id: 'RECH-001', action: 'Publications Peer-Reviewed — 5/an', description: 'Initier un programme de publication dans des revues académiques peer-reviewed : soumettre 5 articles/an à des revues de rang A (African Development Review, Journal of African Business, Revue Économique et Monétaire BCEAO).', budget: '12 000 000 FCFA/an (recherche + soumissions + APC)', planning: 'Sep 2026 — Permanent (annuel)', responsable: 'Research Director + Think Tank', kpi: '5 publications peer-reviewed/an, 250 citations additionnelles', priorite: 'critique' },
      { id: 'RECH-002', action: 'Chaire de Recherche Universitaire', description: 'Établir une chaire de recherche KHEPRA "Régulation Financière Africaine" en partenariat avec l\'UCAD (Dakar) ou l\'UFHB (Abidjan). Financement de 2 doctorants/an, séminaire annuel.', budget: '25 000 000 FCFA/an (chaire + bourses + événement)', planning: 'Oct 2026 — Permanent (3 ans renouvelable)', responsable: 'Managing Partner + Research Director', kpi: 'Chaire active, 2 doctorants/an, 1 séminaire/an, H-Index +5', priorite: 'haute' },
      { id: 'RECH-003', action: 'Baromètres → 10 (Benchmark Big Four)', description: 'Porter le nombre de baromètres de 7 à 10 pour égaler le benchmark Big Four. Ajouter : Baromètre Gouvernance Bancaire Africaine, Indice de Transformation Digitale UEMOA, Baromètre Inclusion Financière CEMAC.', budget: '18 000 000 FCFA/an (équipe recherche + data + publication)', planning: 'Oct 2026—Juin 2027 (9 mois)', responsable: 'Research Institute Director', kpi: '10 baromètres, 50 000 téléchargements/an, +300 citations', priorite: 'moyenne' },
    ],
    kpis: [
      { nom: 'Citations académiques', valeur: 500, cible: 2500 },
      { nom: 'H-Index institutionnel', valeur: 18, cible: 35 },
      { nom: 'Baromètres actifs', valeur: 7, cible: 10 },
      { nom: 'Publications peer-reviewed/an', valeur: 0, cible: 5 },
    ],
  },
  {
    id: 'dev_commercial',
    nom: 'Développement Commercial',
    acronyme: 'DEV',
    icon: 'ri-funds-line',
    couleur: 'accent',
    description: 'Évaluation de la maturité du développement commercial selon les standards des fonctions Business Development des Big Four. Couvre le pipeline, le lead scoring, le nurturing, le win rate, et la performance commerciale.',
    score_actuel: 81,
    score_cible: 95,
    ecart: 14,
    standard_reference: 'Big Four BD Standards · Pipeline Management Best Practices · MEDDIC/MEDDPICC Qualification · Challenger Sale Methodology · SPIN Selling',
    gap_analysis: 'Le développement commercial est le deuxième plus faible score (81/100). Écarts : (1) win rate de 42% vs 60% cible Big Four, (2) pipeline concentré sur 12 deals (cible 25+), (3) cycle de vente moyen de 4.2 mois vs 2.5 mois cible, (4) absence de programme de cross-sell systématique entre BUs.',
    actions_correctives: [
      { id: 'DEV-001', action: 'Win Rate 42% → 60%', description: 'Programme d\'amélioration du win rate : déploiement de la méthodologie MEDDPICC sur tous les deals > 200M FCFA, formation de l\'équipe commerciale, revue hebdomadaire des deals en cours avec le Managing Partner.', budget: '8 500 000 FCFA (formation + coaching + outils)', planning: 'Juil—Nov 2026 (18 semaines)', responsable: 'Managing Partner + Growth Director', kpi: 'Win rate ≥ 60%, valeur moyenne des deals ×1.5', priorite: 'critique' },
      { id: 'DEV-002', action: 'Pipeline 12 → 25 Deals', description: 'Doubler le pipeline commercial via : activation du réseau alumni Big Four, campagne LinkedIn ciblée (100 DG/DAF/mois), participation à 6 salons professionnels, programme de référencement client.', budget: '22 000 000 FCFA (marketing + événements + outreach)', planning: 'Août 2026—Fév 2027 (6 mois)', responsable: 'Growth Director + Marketing', kpi: '25 deals actifs, pipeline ≥ 5 Md FCFA', priorite: 'critique' },
      { id: 'DEV-003', action: 'Programme Cross-Sell Inter-BU', description: 'Mettre en place un programme systématique de cross-sell entre les 4 BUs : chaque client BU1 (Régulation) reçoit une proposition BU2 (Prix de Transfert) et BU3 (GRC) dans les 90 jours.', budget: '5 000 000 FCFA (CRM configuration + incentives)', planning: 'Sep—Nov 2026 (10 semaines)', responsable: 'Growth Director + BU Directors', kpi: '+30% CA par client existant, 5 cross-sells réussis/trimestre', priorite: 'haute' },
    ],
    kpis: [
      { nom: 'Pipeline total (FCFA)', valeur: 3770, cible: 7500 },
      { nom: 'Win rate', valeur: 42, cible: 60 },
      { nom: 'Deals actifs', valeur: 12, cible: 25 },
      { nom: 'Cycle de vente (mois)', valeur: 4.2, cible: 2.5 },
    ],
  },
];

export const riskMatrix: RiskMatrixItem[] = [
  { id: 'RM-001', domaine: 'IA', risque: 'Non-conformité EU AI Act — Digital Twin non explicable', probabilite: 75, impact: 95, score: 71.3, mitigation: 'Refactoring explicabilité — Action IA-001 en cours', statut: 'actif' },
  { id: 'RM-002', domaine: 'Risques', risque: 'PCA/PRA non testé depuis > 12 mois — Perte continuité', probabilite: 40, impact: 98, score: 39.2, mitigation: 'Test PCA/PRA semestriel — Action RISK-002 planifiée Juil 2026', statut: 'actif' },
  { id: 'RM-003', domaine: 'Cybersécurité', risque: '5 gaps ISO 27001 critiques — Non-conformité auditable', probabilite: 60, impact: 85, score: 51, mitigation: 'Résolution 5 gaps — Action CYB-001 en cours, budget 17.2M', statut: 'actif' },
  { id: 'RM-004', domaine: 'GEO', risque: 'Share of Voice < 40% — Invisibilité progressive sur moteurs IA', probabilite: 80, impact: 78, score: 62.4, mitigation: 'Programme SOV — Action GEO-001 planifiée, budget 6.5M', statut: 'actif' },
  { id: 'RM-005', domaine: 'Développement Commercial', risque: 'Pipeline < 15 deals — Dépendance à 3-4 gros clients', probabilite: 65, impact: 82, score: 53.3, mitigation: 'Pipeline ×2 — Action DEV-002 planifiée, budget 22M', statut: 'actif' },
  { id: 'RM-006', domaine: 'SEO', risque: 'Core Web Vitals mobile < 100% — Pénalité ranking Google', probabilite: 55, impact: 70, score: 38.5, mitigation: 'Optimisation CWV — Action SEO-002 planifiée, budget 3.8M', statut: 'mitige' },
  { id: 'RM-007', domaine: 'Recherche', risque: 'Absence publications peer-reviewed — Crédibilité académique limitée', probabilite: 70, impact: 65, score: 45.5, mitigation: 'Programme 5 publications/an — Action RECH-001 planifiée', statut: 'actif' },
  { id: 'RM-008', domaine: 'Gouvernance', risque: 'Conflits d\'intérêts non tracés — Risque réputationnel', probabilite: 35, impact: 88, score: 30.8, mitigation: 'Registre digital — Action GOV-002 en cours, budget 3.5M', statut: 'mitige' },
  { id: 'RM-009', domaine: 'Conformité', risque: 'Couverture COBAC < 95% — Risque réglementaire CEMAC', probabilite: 50, impact: 75, score: 37.5, mitigation: 'Renforcement COBAC — Action CONF-001 planifiée, budget 15M', statut: 'actif' },
  { id: 'RM-010', domaine: 'Qualité', risque: 'Non-certification ISO 9001 — Perte avantage concurrentiel', probabilite: 30, impact: 60, score: 18, mitigation: 'Certification ISO 9001 — Action QUAL-001 planifiée, budget 12.5M', statut: 'actif' },
];

export const roadmap12Mois: RoadmapPhase[] = [
  { phase: 'Q3 2026 — Fondations', periode: 'Juil—Sep 2026', description: 'Résolution des gaps critiques sur les 10 domaines. Focus : conformité réglementaire, cybersécurité, risques, et SEO.', actions: [
    { action: 'Résolution 5 gaps ISO 27001', domaine: 'Cybersécurité', kpi: '114/114 contrôles passés' },
    { action: 'Conformité EU AI Act — Digital Twin', domaine: 'IA', kpi: 'Score ISO 42001 ≥ 9.0' },
    { action: 'Cartographie risques 8→15', domaine: 'Risques', kpi: '15 risques couverts' },
    { action: 'Test PCA/PRA semestriel', domaine: 'Risques', kpi: '2 tests/an' },
    { action: 'Couverture COBAC 94→98%', domaine: 'Conformité', kpi: 'Couverture ≥ 98%' },
    { action: 'Registre conflits d\'intérêts', domaine: 'Gouvernance', kpi: '100% missions couvertes' },
  ], score_projete: 91 },
  { phase: 'Q4 2026 — Accélération', periode: 'Oct—Dec 2026', description: 'Accélération des initiatives de croissance et de visibilité. Certification ISO 9001. Red Team Exercise.', actions: [
    { action: 'Certification ISO 9001:2015', domaine: 'Qualité', kpi: 'Certification obtenue' },
    { action: 'Win rate 42→60% (MEDDPICC)', domaine: 'Développement Commercial', kpi: 'Win rate ≥ 60%' },
    { action: 'Featured Snippets 52→150', domaine: 'SEO', kpi: '150 snippets actifs' },
    { action: 'Red Team Exercise annuel', domaine: 'Cybersécurité', kpi: '1 Red Team/an' },
    { action: 'Chaire de Recherche UCAD/UFHB', domaine: 'Recherche', kpi: 'Chaire active, 2 doctorants' },
    { action: 'Comité Risques Trimestriel', domaine: 'Risques', kpi: '4 réunions/an documentées' },
  ], score_projete: 93 },
  { phase: 'Q1 2027 — Certification', periode: 'Jan—Mar 2027', description: 'Obtention des certifications internationales. Pipeline ×2. Contenu multimodal GEO.', actions: [
    { action: 'Certification ISO 37301:2021', domaine: 'Conformité', kpi: 'Certification obtenue' },
    { action: 'Pipeline 12→25 deals', domaine: 'Développement Commercial', kpi: 'Pipeline ≥ 5 Md FCFA' },
    { action: 'Programme Cross-Sell Inter-BU', domaine: 'Développement Commercial', kpi: '+30% CA/client, 5 cross-sells/trimestre' },
    { action: 'Contenu Multimodal GEO', domaine: 'GEO', kpi: '50 podcasts, 100 infographies' },
    { action: 'SLA Qualité < 8h 100%', domaine: 'Qualité', kpi: 'SLA 100% livrables' },
  ], score_projete: 95 },
];

export const roadmap24Mois: RoadmapPhase[] = [
  { phase: 'Q2-Q3 2027 — Consolidation', periode: 'Avr—Sep 2027', description: 'Consolidation des acquis. Maintien des certifications. Expansion internationale de la visibilité.', actions: [
    { action: 'Certification ISO 42001 formelle', domaine: 'IA', kpi: 'Certification ISO 42001 obtenue' },
    { action: '10 baromètres actifs', domaine: 'Recherche', kpi: '3 nouveaux baromètres, 50K tél./an' },
    { action: 'Share of Voice 50%', domaine: 'GEO', kpi: 'SOV 50%, présence 5/5 ≥ 90%' },
    { action: 'Domain Rating 85', domaine: 'SEO', kpi: 'DR 85, +50 backlinks' },
    { action: 'H-Index institutionnel 35', domaine: 'Recherche', kpi: '500 citations additionnelles' },
  ], score_projete: 96 },
  { phase: 'Q4 2027-Q2 2028 — Leadership', periode: 'Oct 2027—Juin 2028', description: 'Positionnement comme leader africain francophone incontesté. Tous les KPIs au niveau Big Four.', actions: [
    { action: 'Score global ≥ 97/100 — Big Four Certified', domaine: 'Global', kpi: 'Tous les domaines ≥ 95' },
    { action: 'Win rate ≥ 65%', domaine: 'Développement Commercial', kpi: 'Win rate ≥ 65%, 25+ deals' },
    { action: 'Citations académiques ≥ 2 500', domaine: 'Recherche', kpi: '2 500 citations, 15 peer-reviewed' },
    { action: 'Benchmark Big Four ≥ 95/100', domaine: 'Qualité', kpi: 'Score benchmark ≥ 95' },
    { action: 'Pipeline ≥ 10 Md FCFA', domaine: 'Développement Commercial', kpi: 'Pipeline 10 Md, CA 5 Md' },
  ], score_projete: 98 },
];

export const roadmap36Mois: RoadmapPhase[] = [
  { phase: 'H2 2028 — Excellence Soutenue', periode: 'Juil—Dec 2028', description: 'Maintien du score ≥ 97. Innovation continue. Expansion géographique.', actions: [
    { action: 'Score global ≥ 98/100', domaine: 'Global', kpi: 'Score maintenu ≥ 98' },
    { action: 'Présence 10 pays africains', domaine: 'Global', kpi: 'Bureaux/partenariats 10 pays' },
    { action: 'Publication annuelle phare — Africa Financial Stability Report', domaine: 'Recherche', kpi: 'Rapport de référence, 500 citations' },
    { action: 'Innovation Lab — 3 brevets méthodologiques', domaine: 'IA', kpi: '3 brevets déposés' },
  ], score_projete: 98 },
  { phase: '2029 — Rayonnement International', periode: 'Jan—Dec 2029', description: 'Reconnaissance internationale. Partenariats avec les meilleures institutions mondiales.', actions: [
    { action: 'Score global ≥ 99/100 — AAAA+ Supreme', domaine: 'Global', kpi: 'Certification AAAA+ obtenue' },
    { action: 'Partenariat Harvard Kennedy School / LSE', domaine: 'Recherche', kpi: '2 partenariats académiques top 10 mondiaux' },
    { action: 'Citations académiques ≥ 5 000', domaine: 'Recherche', kpi: '5 000 citations, 25 peer-reviewed' },
    { action: 'Pipeline ≥ 20 Md FCFA, CA ≥ 10 Md', domaine: 'Développement Commercial', kpi: 'CA ×2, équipe 100 consultants' },
  ], score_projete: 99 },
];

export const readinessReport: ReadinessReport = {
  score_global: 87.3,
  score_cible: 97,
  domaines_scores: [
    { domaine: 'Gouvernance', score: 92 },
    { domaine: 'Qualité', score: 96 },
    { domaine: 'IA', score: 88 },
    { domaine: 'Conformité', score: 90 },
    { domaine: 'Risques', score: 84 },
    { domaine: 'Cybersécurité', score: 86 },
    { domaine: 'SEO', score: 85 },
    { domaine: 'GEO', score: 82 },
    { domaine: 'Recherche', score: 89 },
    { domaine: 'Développement Commercial', score: 81 },
  ],
  certification: 'En cours — Score global 87.3/100. Cible certification Big Four : 95/100. Écart : 7.7 points. Projection : 95/100 atteignable Q4 2026 — Q1 2027.',
  recommandations: [
    'Priorité absolue aux 5 actions critiques : Conformité EU AI Act, Résolution gaps ISO 27001, Cartographie risques étendue, Win rate 60%, Share of Voice 50%',
    'Investissement total requis sur 12 mois : 240 700 000 FCFA — ROI projeté ×8 (CA additionnel estimé 1.9 Md FCFA)',
    'Séquençage en 2 vagues : Vague 1 (Juil-Sep 2026) — Cybersécurité, IA, Risques, Conformité. Vague 2 (Oct 2026-Mar 2027) — Croissance, GEO, Recherche, Certification.',
    'Création d\'un Bureau de Transformation Big Four dédié au suivi de la roadmap avec revue mensuelle COMEX.',
    'Benchmarking continu vs Deloitte, PwC, EY, KPMG sur les 10 domaines — rapport trimestriel.',
  ],
  trajectoire: 'KOS passera de 87.3/100 à 95/100 en 12 mois (Q1 2027), 97/100 en 24 mois (Q2 2028), et ≥ 98/100 en 36 mois (2029). La trajectoire est réaliste et financée. Les 30 actions correctives documentées couvrent 100% des écarts identifiés.',
};

export const maturityKPIs = {
  score_global: 87.3,
  score_cible_global: 97,
  ecart_global: 9.7,
  domaines_total: 10,
  domaines_excellence: 2,
  domaines_surveillance: 6,
  domaines_action: 2,
  actions_correctives_total: 30,
  actions_critiques: 10,
  actions_hautes: 12,
  actions_moyennes: 8,
  budget_total_12m: '240 700 000 FCFA',
  budget_total_24m: '385 000 000 FCFA',
  budget_total_36m: '520 000 000 FCFA',
  roi_projete_12m: '×8 (CA additionnel 1.9 Md FCFA)',
  certification_cible: 'Big Four Certified — Score ≥ 95/100',
  certification_date_projetee: 'Q1 2027',
};