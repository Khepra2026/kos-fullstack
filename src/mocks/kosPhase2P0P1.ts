// ============================================================
// KOS PHASE 2 P0-P1 — Suite Logique Phase 1 P0 Immediate
// 13 Actions · 4 Sprints · 120 jours · 87.5M FCFA
// Version 2026.06.26 — EXÉCUTION IMMÉDIATE
// ============================================================

export interface P2Action {
  id: string;
  axeId: string;
  axeNom: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  standardVise: string;
  deadline: string;
  statut: 'a_faire' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiAction: string;
  dependances: string[];
  priorite: 'P0' | 'P1';
  sprint: number;
  etapes: P2Etape[];
  journal: P2JournalEntry[];
}

export interface P2Etape {
  nom: string;
  description: string;
  statut: 'pending' | 'active' | 'done';
  progression: number;
}

export interface P2JournalEntry {
  date: string;
  type: 'info' | 'success' | 'warning' | 'blocker';
  message: string;
}

export interface P2SprintInfo {
  numero: number;
  nom: string;
  periode: string;
  jours: number;
  actions: string[];
  objectif: string;
  couleur: string;
  progression: number;
  statut: 'a_venir' | 'en_cours' | 'termine';
}

export const P2_ACTIONS: P2Action[] = [
  // ===== SYS-A02 : Edge Functions streaming (P0) =====
  {
    id: 'SYS-A02',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'Edge Functions avec streaming — Timeout optimisé + Background Workers',
    description: 'Re-architecturer les Edge Functions pour le streaming de données. Configuration des timeouts à la limite maximale avec file d\'attente. Background workers pour les tâches longues (génération de rapports, RAG). Monitoring temps réel.',
    effort: '160h',
    budget: '9 000 000 FCFA',
    responsable: 'CTO + Backend Lead',
    kpi: '0 timeout, streaming < 200ms first byte, background jobs 100% complétés',
    standardVise: 'Deno Deploy / Cloudflare Workers',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Architecture streaming + Queue system + Dashboard workers + Monitoring',
    pourquoiAction: 'Les Edge Functions timeout actuellement sur les requêtes complexes. Le streaming + background workers résout le problème définitivement et débloque SYS-A03, SYS-A04 et SYS-A05.',
    dependances: ['SYS-A01'],
    priorite: 'P0',
    sprint: 1,
    etapes: [
      { nom: 'Audit Edge Functions existantes — identification goulots', description: 'Analyse 40+ fonctions, profiling temps exécution, identification timeouts fréquents', statut: 'pending', progression: 0 },
      { nom: 'Architecture streaming — Server-Sent Events', description: 'SSE implementation, chunked responses, partial rendering', statut: 'pending', progression: 0 },
      { nom: 'Queue system — pg-boss / BullMQ', description: 'Job queue, retry logic, dead letter queue, priority levels', statut: 'pending', progression: 0 },
      { nom: 'Background workers — tâches longues', description: 'Rapport generation workers, RAG workers, email workers', statut: 'pending', progression: 0 },
      { nom: 'Dashboard monitoring + alerting', description: 'Latence, timeouts, queue depth, worker health, alertes Slack/email', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== UX-A03 : Lead Magnet interactif (P0) =====
  {
    id: 'UX-A03',
    axeId: 'axe-uiux',
    axeNom: 'UI/UX & Conversion',
    action: 'Lead Magnet interactif — "Pré-audit flash ISO automatisé par KOS"',
    description: 'Outil interactif : le prospect entre son secteur et son CA, KOS génère instantanément un mini-rapport personnalisé de 3 pages en direct. Capture email avant livraison. 5 versions par secteur (banques, SFD, fintechs, États, PME).',
    effort: '200h',
    budget: '5 000 000 FCFA',
    responsable: 'Growth Director + CTO + Creative Director',
    kpi: 'Conversion 15%+ visiteurs → leads, 500+ leads/mois, NPS lead magnet > 75',
    standardVise: 'Interactive Content / CRO',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Outil interactif 5+ secteurs + Dashboard leads + Rapports auto-générés + Email automation',
    pourquoiAction: 'Les PDF statiques convertissent à 2-3%. Un outil interactif qui génère un rapport personnalisé en direct = 15-25% conversion. C\'est le lead magnet ultime qui transforme KOS en machine à leads.',
    dependances: ['UX-A01'],
    priorite: 'P0',
    sprint: 1,
    etapes: [
      { nom: 'Design UX interactif — flow utilisateur', description: 'Wireframes, user journey, étapes du diagnostic flash interactif', statut: 'pending', progression: 0 },
      { nom: 'Moteur de génération de rapport', description: 'Template engine, 5 secteurs calibrés, logique scoring MECE', statut: 'pending', progression: 0 },
      { nom: 'Intégration frontend interactive', description: 'Composant React, animations step-by-step, validation inputs', statut: 'pending', progression: 0 },
      { nom: 'Capture email + Email automation', description: 'Gate email, welcome sequence, delivery auto PDF', statut: 'pending', progression: 0 },
      { nom: 'Dashboard leads + A/B testing', description: 'Conversion tracking, heatmaps, variantes test, optimisation continue', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== MKT-A03 : Calibrer offres (P1) =====
  {
    id: 'MKT-A03',
    axeId: 'axe-marche',
    axeNom: 'Marché & Positionnement',
    action: 'Calibrer les offres commerciales par segment — 3 segments prioritaires',
    description: 'Pour chaque segment (Gouvernements, Grandes Entreprises, PME Championnes), définir une offre commerciale calibrée : produits phares, pricing, canaux de distribution, positionnement prix. Créer les fiches produits et les pitchs commerciaux.',
    effort: '100h',
    budget: '5 000 000 FCFA',
    responsable: 'Growth Director + Consulting Factory',
    kpi: '9 offres calibrées (3/segment), fiches produits, pricing validé COMEX',
    standardVise: 'Product-Market Fit / Pricing Strategy',
    deadline: '2026-12-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Catalogue d\'offres calibrées + Fiches produits + Matrice pricing',
    pourquoiAction: 'Les offres existantes sont génériques. La calibration par segment permet un ciblage précis, un pricing optimisé et une proposition de valeur claire par typologie de client.',
    dependances: ['MKT-A02'],
    priorite: 'P1',
    sprint: 2,
    etapes: [
      { nom: 'Analyse besoins par segment', description: 'Interview clients cibles, matrice besoins, willingness-to-pay', statut: 'pending', progression: 0 },
      { nom: 'Définition offres phares par segment', description: '3 offres par segment, scope, livrables, durée indicative', statut: 'pending', progression: 0 },
      { nom: 'Pricing stratégique', description: 'Value-based pricing, benchmarking concurrence, matrice prix', statut: 'pending', progression: 0 },
      { nom: 'Création fiches produits + pitchs', description: 'Design fiches, pitch deck commercial par segment', statut: 'pending', progression: 0 },
      { nom: 'Validation COMEX + intégration CRM', description: 'Validation formelle, intégration Hub CRM, formation équipe commerciale', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== MKT-A04 : Observatoire Réglementaire (P1) =====
  {
    id: 'MKT-A04',
    axeId: 'axe-marche',
    axeNom: 'Marché & Positionnement',
    action: 'Déployer Observatoire Réglementaire Afrique — Think Tank public',
    description: 'Lancement de l\'Observatoire Réglementaire Africain comme produit phare : données brutes exclusives, analyses macro, benchmarks. Publication régulière bi-mensuelle. Positionnement GEO via contenu data-driven exclusif.',
    effort: '160h',
    budget: '4 000 000 FCFA',
    responsable: 'Knowledge Manager + Content Director',
    kpi: '50+ publications/an, 10K+ citations/trimestre, couverture presse 5+ médias',
    standardVise: 'Think Tank Publishing / GEO',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Plateforme observatoire + Calendrier éditorial + 10 publications inaugurales',
    pourquoiAction: 'L\'observatoire est le produit différenciateur ultime. Il positionne KOS comme source primaire d\'intelligence réglementaire — contenu non réplicable par la concurrence, aimant à backlinks naturel.',
    dependances: ['MKT-A03'],
    priorite: 'P1',
    sprint: 2,
    etapes: [
      { nom: 'Architecture plateforme observatoire', description: 'Structure contenu, catégories, filtres pays/secteur/thème', statut: 'pending', progression: 0 },
      { nom: 'Pipeline data — veille automatisée', description: 'Agrégation BCEAO, COBAC, GAFI, OHADA, ISSB, ISO', statut: 'pending', progression: 0 },
      { nom: 'Calendrier éditorial 12 mois', description: '52 publications planifiées, thèmes, auteurs, deadlines', statut: 'pending', progression: 0 },
      { nom: '10 publications inaugurales', description: 'Analyses flagship, data visualisations, executive summaries', statut: 'pending', progression: 0 },
      { nom: 'Lancement médiatique + SEO/GEO', description: 'Communiqué presse, outreach médias, optimisation GEO contenu', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== MKT-A05 : Analyse concurrentielle (P1) =====
  {
    id: 'MKT-A05',
    axeId: 'axe-marche',
    axeNom: 'Marché & Positionnement',
    action: 'Analyse concurrentielle systématique — Big Four + cabinets locaux',
    description: 'Analyse détaillée de la concurrence : services, pricing, présence digitale, forces/faiblesses. Identification des angles morts des Big Four et des cabinets locaux que KOS peut exploiter. Veille concurrentielle continue.',
    effort: '80h',
    budget: '2 000 000 FCFA',
    responsable: 'Growth Director + Competitive Intelligence',
    kpi: 'Rapport 10+ cabinets analysés, matrice SWOT, 20+ opportunités identifiées',
    standardVise: 'Competitive Intelligence',
    deadline: '2026-11-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Rapport analyse concurrentielle + Matrice SWOT + Plan d\'attaque commercial',
    pourquoiAction: 'Connaître la concurrence = identifier les brèches. Les Big Four sont lents et chers ; les cabinets locaux manquent de data. KOS peut prendre les deux marchés avec une proposition unique.',
    dependances: ['MKT-A01'],
    priorite: 'P1',
    sprint: 2,
    etapes: [
      { nom: 'Cartographie concurrents — 10+ cabinets', description: 'Big Four, régionaux, boutiques spécialisées, nouveaux entrants', statut: 'pending', progression: 0 },
      { nom: 'Analyse forces/faiblesses', description: 'Services, pricing, présence digitale, talent, clientèle', statut: 'pending', progression: 0 },
      { nom: 'Identification angles morts', description: 'Lacunes concurrence, segments sous-servis, opportunités KOS', statut: 'pending', progression: 0 },
      { nom: 'Matrice SWOT + Plan d\'attaque', description: 'SWOT détaillé, recommandations offensives par segment', statut: 'pending', progression: 0 },
      { nom: 'Veille concurrentielle continue', description: 'Dashboard concurrence, alertes mouvements, mises à jour trimestrielles', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== SEO-A03 : FAQ Dynamique (P1) =====
  {
    id: 'SEO-A03',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'Déployer FAQ Dynamique Prédictive — Basée requêtes décideurs',
    description: 'FAQ intelligente qui prédit les questions des directeurs financiers/juridiques basée sur les tendances de recherche. Mise à jour automatique via veille réglementaire. JSON-LD FAQPage dynamique pour featured snippets.',
    effort: '160h',
    budget: '4 000 000 FCFA',
    responsable: 'CTO + SEO Director + Knowledge Manager',
    kpi: 'FAQ 200+ questions, +50 questions/mois automatiques, CTR FAQ +40%',
    standardVise: 'FAQPage Schema / NLP',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Moteur FAQ dynamique + Base questions 200+ + Dashboard performance FAQ',
    pourquoiAction: 'Les FAQ sont le format #1 pour les featured snippets Google. Une FAQ dynamique prédictive capture les requêtes émergentes avant la concurrence et domine la SERP sur les questions réglementaires.',
    dependances: ['SEO-A02'],
    priorite: 'P1',
    sprint: 2,
    etapes: [
      { nom: 'Analyse requêtes décideurs — seed questions', description: 'Google Search Console, AlsoAsked, People Also Ask, tendances recherche', statut: 'pending', progression: 0 },
      { nom: 'Base questions 200+ — contenu expert', description: 'Rédaction réponses niveau Big Four, citations réglementaires', statut: 'pending', progression: 0 },
      { nom: 'Moteur FAQ dynamique', description: 'NLP matching, recherche sémantique, suggestions automatiques', statut: 'pending', progression: 0 },
      { nom: 'JSON-LD FAQPage dynamique', description: 'Schema.org FAQPage auto-généré, mise à jour temps réel', statut: 'pending', progression: 0 },
      { nom: 'Dashboard performance FAQ + boucle amélioration', description: 'CTR, featured snippets, nouvelles questions, top performers', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== SEO-A06 : Stratégie backlinks (P1) =====
  {
    id: 'SEO-A06',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'Stratégie backlinks — Programme Think Tank + Partenariats médias',
    description: 'Programme de création de backlinks naturels via : données exclusives citables, partenariats médias africains, guest posts sur sites autorité, infographies partageables, interviews croisées.',
    effort: '120h',
    budget: '1 500 000 FCFA',
    responsable: 'SEO Director + Marketing Director',
    kpi: 'DR 60+ (actuel ~45), 100+ backlinks autorité/an, 20+ domaines référents médias',
    standardVise: 'Ahrefs DR / Moz DA',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Plan backlinks + Partenariats médias 20+ signés + Dashboard DR',
    pourquoiAction: 'Les backlinks restent le facteur de ranking #1. Un programme systématique via Think Tank + médias = croissance organique du DR sans achat de liens.',
    dependances: ['SEO-A01'],
    priorite: 'P1',
    sprint: 4,
    etapes: [
      { nom: 'Audit backlinks existants', description: 'DR actuel, domaines référents, anchor text, toxic links', statut: 'pending', progression: 0 },
      { nom: 'Identification opportunités — données citables', description: 'Statistiques exclusives, études originales, data visualisations partageables', statut: 'pending', progression: 0 },
      { nom: 'Programme partenariats médias', description: '20+ médias africains ciblés, protocole partenariat, contenu co-brandé', statut: 'pending', progression: 0 },
      { nom: 'Guest posting — sites autorité', description: 'Articles invités sur sites finance/droit/réglementaire africains', statut: 'pending', progression: 0 },
      { nom: 'Dashboard DR + suivi backlinks', description: 'Ahrefs/Moz monitoring, alertes nouveaux backlinks, rapports trimestriels', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== SYS-A03 : Mémoire sémantique (P1) =====
  {
    id: 'SYS-A03',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'Mémoire sémantique interne — Graph DB + Contexte persistant agents',
    description: 'Développement d\'une mémoire à long terme pour les agents IA : stockage contexte sessions, historique raisonnement, apprentissage incrémental. Graph database pour relations sémantiques entre concepts réglementaires. RAG contextuel.',
    effort: '240h',
    budget: '14 000 000 FCFA',
    responsable: 'CTO + AI Director + Knowledge Manager',
    kpi: 'Rappel contextuel > 90%, persistance 100% sessions, raisonnement incrémental actif',
    standardVise: 'MemGPT / Graph RAG',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Graph DB réglementaire + API mémoire agents + Dashboard sessions + Logs',
    pourquoiAction: 'Les agents KOS sont actuellement stateless. La mémoire persistante permet un conseil continu et cumulatif — comme un consultant humain qui apprend de chaque mission.',
    dependances: ['SYS-A02'],
    priorite: 'P1',
    sprint: 3,
    etapes: [
      { nom: 'Architecture Graph DB réglementaire', description: 'Schéma entités, relations, propriétés. Neo4j / Qdrant / pgvector.', statut: 'pending', progression: 0 },
      { nom: 'Ingestion base réglementaire', description: 'Migration textes BCEAO, COBAC, GAFI, OHADA, ISO en graphe sémantique', statut: 'pending', progression: 0 },
      { nom: 'API mémoire agents', description: 'Store context, retrieve context, update beliefs, forget obsolete', statut: 'pending', progression: 0 },
      { nom: 'Raisonnement incrémental', description: 'Chain-of-thought persistant, conclusion tracking, évolution croyances', statut: 'pending', progression: 0 },
      { nom: 'Dashboard sessions + logs', description: 'Sessions actives, mémoire utilisée, graphe explorateur, audit trail', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== SYS-A04 : LLM local (P1) =====
  {
    id: 'SYS-A04',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'Zéro API externe — Déploiement LLM Open-Source local + Routage intelligent',
    description: 'Intégration Llama 3/Mistral pour les tâches simples (coût zéro). Routage intelligent : tâches simples → modèle local, analyses complexes → API externe. Objectif : 70%+ des requêtes traitées localement.',
    effort: '280h',
    budget: '28 000 000 FCFA',
    responsable: 'CTO + AI Director + ML Engineer',
    kpi: '70%+ requêtes traitées localement, qualité ≥ 90% vs GPT-4, coût API -70%',
    standardVise: 'HELM / LMSYS / Open LLM',
    deadline: '2027-09-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'LLM local déployé + Routeur intelligent + Dashboard coûts + Benchmark qualité',
    pourquoiAction: 'La dépendance aux APIs externes = coûts variables imprévisibles + risque de souveraineté données. Le modèle local + routage = autonomie, prédictibilité budgétaire et souveraineté numérique.',
    dependances: ['SYS-A02'],
    priorite: 'P1',
    sprint: 1,
    etapes: [
      { nom: 'Benchmark modèles open-source', description: 'Évaluation Llama 3, Mistral, Qwen vs tâches KOS, sélection', statut: 'pending', progression: 0 },
      { nom: 'Déploiement infrastructure GPU', description: 'Instance GPU cloud, optimisation mémoire, quantisation modèle', statut: 'pending', progression: 0 },
      { nom: 'Fine-tuning réglementaire', description: 'Fine-tune sur corpus BCEAO/COBAC/GAFI/OHADA/ISO', statut: 'pending', progression: 0 },
      { nom: 'Routeur intelligent', description: 'Classification requêtes, routing local vs externe, fallback strategy', statut: 'pending', progression: 0 },
      { nom: 'Dashboard coûts + benchmark qualité', description: 'Coût par requête, taux routage, score qualité comparatif, ROI', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== SYS-A05 : CI/CD + Self-Healing (P1) =====
  {
    id: 'SYS-A05',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'CI/CD strict + Self-Healing — Zéro bug, zéro erreur en production',
    description: 'Pipeline CI/CD avec tests unitaires automatisés stricts. Système de self-healing : détection automatique des erreurs de code/livrable, auto-correction avant livraison client. Monitoring proactif 24/7.',
    effort: '200h',
    budget: '8 000 000 FCFA',
    responsable: 'CTO + Lead Dev + QA Manager',
    kpi: '0 bug critique en production, 95%+ couverture tests, MTTR < 5min auto',
    standardVise: 'CI/CD / DevOps / SRE',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Pipeline CI/CD + Suite tests + Self-healing engine + Dashboard qualité code',
    pourquoiAction: 'Les bugs en production = perte de crédibilité immédiate. Le self-healing + CI/CD strict = qualité Big Four systématique, zéro livrable erroné livré au client.',
    dependances: ['SYS-A02'],
    priorite: 'P1',
    sprint: 3,
    etapes: [
      { nom: 'Pipeline CI/CD — GitHub Actions', description: 'Build, lint, test, type-check, deploy preview, production', statut: 'pending', progression: 0 },
      { nom: 'Suite tests unitaires + intégration', description: 'Jest/Vitest, 95% couverture, tests Edge Functions, tests composants', statut: 'pending', progression: 0 },
      { nom: 'Self-healing engine', description: 'Error detection, root cause analysis, auto-fix attempt, rollback', statut: 'pending', progression: 0 },
      { nom: 'Monitoring proactif 24/7', description: 'Sentry, health checks, alerting, on-call rotation', statut: 'pending', progression: 0 },
      { nom: 'Dashboard qualité code', description: 'Coverage, bugs, MTTR, deploy frequency, change failure rate', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== UX-A02 : Storytelling scrolling (P1) =====
  {
    id: 'UX-A02',
    axeId: 'axe-uiux',
    axeNom: 'UI/UX & Conversion',
    action: 'Storytelling scrolling — Animation narrative "KOS pense en direct"',
    description: 'Implémentation de scroll-driven animations narratives : transition visuelle entre "Rigueur Traditionnelle" et "Intelligence Artificielle KOS". L\'internaute voit KOS cartographier et analyser les données au fil du scroll.',
    effort: '160h',
    budget: '3 000 000 FCFA',
    responsable: 'Lead Dev Frontend + Creative Director',
    kpi: 'Temps sur page +40%, scroll depth > 70%, engagement rate +50%',
    standardVise: 'Scroll-driven Animations / Lottie',
    deadline: '2027-01-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Animations scroll-driven + Storyboard + Dashboard engagement + Tests A/B',
    pourquoiAction: 'Le storytelling visuel différencie radicalement KOS des cabinets traditionnels. L\'internaute vit l\'expérience "IA + Expertise" plutôt que de la lire — mémorisation et confiance maximales.',
    dependances: ['UX-A01'],
    priorite: 'P1',
    sprint: 3,
    etapes: [
      { nom: 'Storyboard narratif — parcours visiteur', description: 'Script narratif, key frames, transitions, moments clés', statut: 'pending', progression: 0 },
      { nom: 'Design animations scroll-driven', description: 'Lottie/GSAP animations, parallax, reveal sequences, data flow visuel', statut: 'pending', progression: 0 },
      { nom: 'Intégration frontend pages clés', description: 'Homepage, Services, About — animations narratives', statut: 'pending', progression: 0 },
      { nom: 'Performance optimization', description: 'Lazy loading animations, will-change, reduced motion fallback', statut: 'pending', progression: 0 },
      { nom: 'Dashboard engagement + tests A/B', description: 'Scroll depth, temps page, heatmaps, variants testing', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== UX-A04 : Nurturing automatisé (P1) =====
  {
    id: 'UX-A04',
    axeId: 'axe-uiux',
    axeNom: 'UI/UX & Conversion',
    action: 'Nurturing automatisé — Alertes d\'impact réglementaire personnalisées',
    description: 'Système de nurturing basé sur la veille réglementaire. Si un décret tombe dans le secteur du prospect, KOS génère une alerte d\'impact personnalisée ("M. X, voici comment la nouvelle norme impacte votre filiale...") envoyée par email.',
    effort: '160h',
    budget: '2 500 000 FCFA',
    responsable: 'Growth Director + Knowledge Manager + CTO',
    kpi: 'Taux ouverture > 45%, taux clic > 15%, lead → MQL +35%',
    standardVise: 'Marketing Automation / GDPR',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Moteur nurturing réglementaire + Templates email + Dashboard campagnes + Analytics',
    pourquoiAction: 'Le nurturing générique a un taux d\'ouverture de 15-20%. L\'alerte personnalisée basée sur l\'actualité réglementaire du prospect = 45-60% taux d\'ouverture. Conversion MQL boostée.',
    dependances: ['UX-A03', 'MKT-A04'],
    priorite: 'P1',
    sprint: 4,
    etapes: [
      { nom: 'Moteur matching — profil prospect × texte réglementaire', description: 'NLP matching secteur/profil vs nouveaux textes, scoring pertinence', statut: 'pending', progression: 0 },
      { nom: 'Templates email personnalisés', description: 'Design email, variable injection, personnalisation secteur/CA/pays', statut: 'pending', progression: 0 },
      { nom: 'Workflow automation', description: 'Trigger → Match → Generate → Review → Send, boucle feedback', statut: 'pending', progression: 0 },
      { nom: 'Intégration CRM + lead scoring', description: 'HubSpot/Salesforce sync, score nurturing, transition MQL', statut: 'pending', progression: 0 },
      { nom: 'Dashboard campagnes + analytics', description: 'Open rate, CTR, MQL rate, revenue influence, optimisation', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== UX-A05 : Dashboard Client (P1) =====
  {
    id: 'UX-A05',
    axeId: 'axe-uiux',
    axeNom: 'UI/UX & Conversion',
    action: 'Espace client Dashboard KOS — Closing accéléré',
    description: 'Dashboard client personnalisé accessible dès le premier contact. Le client visualise la structure de son futur projet de conseil, les étapes, le calendrier, les livrables attendus. Réduction du cycle de vente de 6 semaines à 10 jours.',
    effort: '200h',
    budget: '1 500 000 FCFA',
    responsable: 'CTO + Lead Dev Frontend + Growth Director',
    kpi: 'Cycle vente -60% (6 semaines → 10 jours), satisfaction prospect > 85%',
    standardVise: 'Client Portal / SaaS UX',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Dashboard client + Onboarding interactif + Templates projet + Analytics conversion',
    pourquoiAction: 'La transparence radicale (voir son projet avant d\'avoir signé) réduit drastiquement le cycle de vente. Le client visualise la valeur avant de payer — confiance instantanée.',
    dependances: ['UX-A01'],
    priorite: 'P1',
    sprint: 4,
    etapes: [
      { nom: 'Design dashboard client', description: 'Wireframes, structure projet, étapes, calendrier, livrables', statut: 'pending', progression: 0 },
      { nom: 'Onboarding interactif', description: 'Flow création projet, wizard configuration, personalisation', statut: 'pending', progression: 0 },
      { nom: 'Templates projet — 5 secteurs', description: 'Banques, SFD, Fintechs, États, PME — templates pré-remplis', statut: 'pending', progression: 0 },
      { nom: 'Intégration frontend + backend', description: 'Composant dashboard, API projets, auth client, données mock→live', statut: 'pending', progression: 0 },
      { nom: 'Analytics conversion + optimisation', description: 'Cycle vente tracking, drop-off analysis, A/B testing, amélioration continue', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
];

// ===== SPRINTS PHASE 2 =====
export const P2_SPRINTS: P2SprintInfo[] = [
  {
    numero: 1,
    nom: 'Fondations Techniques & Lead Magnet',
    periode: '01 Octobre — 28 Octobre 2026',
    jours: 28,
    actions: ['SYS-A02', 'SYS-A04', 'UX-A03'],
    objectif: 'Poser les fondations techniques avancées (Edge Functions streaming, LLM local) et déployer le Lead Magnet interactif — le plus gros levier de conversion',
    couleur: 'primary',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 2,
    nom: 'Intelligence Marché & Contenu',
    periode: '29 Octobre — 25 Novembre 2026',
    jours: 28,
    actions: ['MKT-A03', 'MKT-A04', 'MKT-A05', 'SEO-A03'],
    objectif: 'Calibrer les offres, lancer l\'Observatoire, analyser la concurrence, déployer la FAQ dynamique — positionnement marché complet',
    couleur: 'accent',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 3,
    nom: 'Mémoire, Qualité & Storytelling',
    periode: '26 Novembre — 23 Décembre 2026',
    jours: 28,
    actions: ['SYS-A03', 'SYS-A05', 'UX-A02'],
    objectif: 'Mémoire sémantique agents, CI/CD self-healing, storytelling scrolling — infrastructure intelligence + expérience',
    couleur: 'secondary',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 4,
    nom: 'Conversion & Expansion',
    periode: '26 Décembre 2026 — 28 Janvier 2027',
    jours: 34,
    actions: ['SEO-A06', 'UX-A04', 'UX-A05'],
    objectif: 'Backlinks autorité, nurturing personnalisé, dashboard client — conversion et rétention maximales',
    couleur: 'emerald',
    progression: 0,
    statut: 'a_venir',
  },
];

// ===== MÉTADONNÉES PHASE 2 =====
export const P2_PHASE2_META = {
  titre: 'Phase 2 P0-P1 — Suite Logique Phase 1 P0 Immediate',
  version: 'v1.0 LANCEMENT — 2026.06.26',
  actionsTotal: 13,
  budgetTotal: '87 500 000 FCFA',
  horizon: '120 jours (Octobre 2026 — Janvier 2027)',
  gouvernance: 'COMEX Hebdomadaire — Managing Partner + CTO + AI Director + Growth Director + SEO Director + Creative Director + Knowledge Manager',
  messageCle: 'La Phase 2 P0-P1 prend le relais de la Phase 1 P0 Immediate. 13 actions — les 2 P0 restantes (Edge Functions streaming, Lead Magnet interactif) + les 11 P1 de l\'Audit Final. Budget 87.5M FCFA sur 120 jours. C\'est le passage de la correction urgente à la construction de l\'avantage compétitif durable.',
  risquePrincipal: 'Le Sprint 1 est le plus risqué — Edge Functions streaming + LLM local en parallèle = complexité technique maximale. SYS-A02 bloque 4 autres actions (SYS-A03, SYS-A04, SYS-A05, et indirectement UX-A04). Roadmap technique IRONCLAD requise.',
  jalonFinal: '28 Janvier 2027 — Démo COMEX : les 13 actions P0-P1 livrées. KOS autonome à 70%, machine à leads calibrée, expérience client premium.',
  dependanceCle: 'SYS-A02 (Edge Functions streaming) est le blocker critique — il débloque SYS-A03, SYS-A04, SYS-A05. Priorité absolue Sprint 1.',
};

// ===== FONCTIONS UTILITAIRES =====
export function computeP2KPIs() {
  const actions = P2_ACTIONS;
  const total = actions.length;

  const aFaire = actions.filter(a => a.statut === 'a_faire').length;
  const enCours = actions.filter(a => a.statut === 'en_cours').length;
  const termine = actions.filter(a => a.statut === 'termine').length;
  const bloque = actions.filter(a => a.statut === 'bloque').length;

  const progressionGlobale = Math.round(actions.reduce((s, a) => s + a.progression, 0) / total);

  const p0Restantes = actions.filter(a => a.priorite === 'P0' && a.statut !== 'termine').length;
  const p1Restantes = actions.filter(a => a.priorite === 'P1' && a.statut !== 'termine').length;

  const sprintActuel = P2_SPRINTS.find(s => s.statut === 'en_cours') || P2_SPRINTS[0];

  return {
    actions_total: total,
    a_faire: aFaire,
    en_cours: enCours,
    termine,
    bloque,
    progression_globale: progressionGlobale,
    p0_restantes: p0Restantes,
    p1_restantes: p1Restantes,
    budget_total_millions: 87.5,
    sprint_actuel: sprintActuel,
  };
}

export function getP2SprintActions(sprintNum: number): P2Action[] {
  const sprintActionIds = P2_SPRINTS.find(s => s.numero === sprintNum)?.actions || [];
  return P2_ACTIONS.filter(a => sprintActionIds.includes(a.id));
}





