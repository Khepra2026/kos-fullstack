// ============================================================
// KOS AUDIT FINAL ANALYSIS — Analyse Finale Tous Points d'Audit
// 4 Axes · Marché + Marketing Digital + Maturité KOS + UI/UX
// Version 2026.06.26 — SYNTHÈSE ULTIME
// ============================================================

export interface AuditAction {
  id: string;
  axeId: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  standardVise: string;
  deadline: string;
  statut: 'non_demarre' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiAction: string;
  dependances: string[];
  priorite: 'P0' | 'P1' | 'P2';
}

export interface AuditAxe {
  id: string;
  numero: string;
  nom: string;
  icon: string;
  couleur: string;
  scoreActuel: number;
  scoreCible: number;
  budgetTotal: string;
  responsable: string;
  progressionGlobale: number;
  statutGlobal: 'critique' | 'en_cours' | 'progresse' | 'maitrise';
  description: string;
  actions: AuditAction[];
  constatActuel: string;
  recommandationCle: string;
  impactAttendu: string;
}

export const AUDIT_AXES: AuditAxe[] = [
  // ===== AXE 1 : ANALYSE DU MARCHÉ & POSITIONNEMENT =====
  {
    id: 'axe-marche',
    numero: 'AXE 1',
    nom: 'Analyse du Marché & Positionnement Stratégique',
    icon: 'ri-pie-chart-line',
    couleur: 'primary',
    scoreActuel: 58,
    scoreCible: 95,
    budgetTotal: '22 000 000 FCFA',
    responsable: 'Managing Partner + Growth Director + Marketing Director',
    progressionGlobale: 8,
    statutGlobal: 'critique',
    description: 'Analyse des besoins du marché Afrique francophone, positionnement Khepra Experts comme Cabinet de Conseil Augmenté de Nouvelle Génération, segmentation clients et calibration des offres.',
    constatActuel: 'Le positionnement actuel est implicite et non documenté formellement. Les offres ne sont pas calibrées par segment de clientèle. Le marché africain est en pleine mutation (conformité, digitalisation) mais KOS n\'a pas de cartographie systématique des besoins.',
    recommandationCle: 'Formaliser un positionnement hybride Big Four augmenté + Think Tank automatisé avec une segmentation claire (Gouvernements, Grandes Entreprises, PME Championnes) et des offres calibrées par segment.',
    impactAttendu: '+40% taux de conversion commerciale, +30% valeur perçue des offres, différenciation radicale vs concurrence traditionnelle',
    actions: [
      {
        id: 'MKT-A01', axeId: 'axe-marche',
        action: 'Cartographier les besoins du marché Afrique francophone — Étude documentée',
        description: 'Étude de marché approfondie : analyse des besoins par pays (UEMOA, CEMAC, RDC, Maghreb), par secteur (banques, SFD, fintechs, États), et par taille d\'entreprise. Identification des lacunes des cabinets traditionnels. Publication d\'un rapport public de positionnement.',
        effort: '120h', budget: '6 000 000 FCFA', responsable: 'Growth Director + Intelligence Center',
        kpi: 'Rapport de marché 100+ pages publié, 5 segments documentés, 3 personas calibrés', standardVise: 'Market Research Best Practices', deadline: '2026-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Rapport d\'étude de marché + Personas + Matrice besoins/offres',
        pourquoiAction: 'Sans cartographie précise, KOS cible tout le monde = ne cible personne. Une étude documentée positionne KOS comme l\'autorité de référence sur son propre marché.',
        dependances: [], priorite: 'P0',
      },
      {
        id: 'MKT-A02', axeId: 'axe-marche',
        action: 'Formaliser le positionnement "Cabinet de Conseil Augmenté" + Think Tank',
        description: 'Rédaction du document de positionnement stratégique : Khepra Experts = hybride entre l\'excellence méthodologique Big Four et la puissance d\'un Think Tank automatisé. Différenciateurs clés : réactivité immédiate, données locales exclusives, coût optimisé.',
        effort: '80h', budget: '3 000 000 FCFA', responsable: 'Managing Partner + Marketing Director',
        kpi: 'Document de positionnement validé COMEX, message clé décliné sur tous les supports', standardVise: 'Strategic Positioning / Porter', deadline: '2026-10-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Document de positionnement + Pitch deck + Messages clés par segment',
        pourquoiAction: 'Le positionnement actuel est flou. Sans positionnement clair, le marketing est dilué et la proposition de valeur invisible.',
        dependances: ['MKT-A01'], priorite: 'P0',
      },
      {
        id: 'MKT-A03', axeId: 'axe-marche',
        action: 'Calibrer les offres commerciales par segment (3 segments prioritaires)',
        description: 'Pour chaque segment (Gouvernements, Grandes Entreprises, PME Championnes), définir une offre commerciale calibrée : produits phares, pricing, canaux de distribution, positionnement prix. Créer les fiches produits.',
        effort: '100h', budget: '5 000 000 FCFA', responsable: 'Growth Director + Consulting Factory',
        kpi: '9 offres calibrées (3/segment), fiches produits, pricing validé COMEX', standardVise: 'Product-Market Fit / Pricing Strategy', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Catalogue d\'offres calibrées + Fiches produits + Matrice pricing',
        pourquoiAction: 'Les offres existantes sont génériques. La calibration par segment permet un ciblage précis et un pricing optimisé.',
        dependances: ['MKT-A02'], priorite: 'P1',
      },
      {
        id: 'MKT-A04', axeId: 'axe-marche',
        action: 'Déployer Observatoire Réglementaire Afrique — Think Tank public',
        description: 'Lancement de l\'Observatoire Réglementaire Africain comme produit phare : données brutes exclusives, analyses macro, benchmarks. Publication régulière. Positionnement GEO via contenu data-driven.',
        effort: '160h', budget: '4 000 000 FCFA', responsable: 'Knowledge Manager + Content Director',
        kpi: '50+ publications/an, 10K+ citations/trimestre, couverture presse 5+ médias', standardVise: 'Think Tank Publishing / GEO', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Plateforme observatoire + Calendrier éditorial + 10 publications inaugurales',
        pourquoiAction: 'L\'observatoire est le produit différenciateur ultime. Il positionne KOS comme source primaire d\'intelligence réglementaire — contenu non réplicable par la concurrence.',
        dependances: ['MKT-A03'], priorite: 'P1',
      },
      {
        id: 'MKT-A05', axeId: 'axe-marche',
        action: 'Analyse concurrentielle systématique — Cartographie Big Four + cabinets locaux',
        description: 'Analyse détaillée de la concurrence : services, pricing, présence digitale, forces/faiblesses. Identification des angles morts des Big Four et des cabinets locaux que KOS peut exploiter.',
        effort: '80h', budget: '2 000 000 FCFA', responsable: 'Growth Director + Competitive Intelligence',
        kpi: 'Rapport concurrentiel 10+ cabinets analysés, matrice SWOT, opportunités identifiées', standardVise: 'Competitive Intelligence', deadline: '2026-11-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Rapport analyse concurrentielle + Matrice SWOT + Plan d\'attaque commercial',
        pourquoiAction: 'Connaître la concurrence = identifier les brèches. Les Big Four sont lents et chers ; les cabinets locaux manquent de data. KOS peut prendre les deux marchés.',
        dependances: ['MKT-A01'], priorite: 'P1',
      },
      {
        id: 'MKT-A06', axeId: 'axe-marche',
        action: 'Créer un baromètre de confiance trimestriel — Indice KOS du climat réglementaire',
        description: 'Produit média : baromètre trimestriel de la confiance des dirigeants dans le climat réglementaire africain. Enquête panel 200+ décideurs. Publication médiatique.',
        effort: '100h', budget: '2 000 000 FCFA', responsable: 'Marketing Director + Intelligence Center',
        kpi: '4 éditions/an, 200+ répondants, 5+ reprises presse/trimestre', standardVise: 'Barometer / Survey Methodology', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Plateforme baromètre + Panel décideurs + 1ère édition + Kit presse',
        pourquoiAction: 'Un baromètre propriétaire = outil de visibilité médiatique et de crédibilité. McKinsey a son Global Institute, KOS aura son Baromètre.',
        dependances: ['MKT-A04'], priorite: 'P2',
      },
    ],
  },

  // ===== AXE 2 : MARKETING DIGITAL, VISIBILITÉ IA & SEO/GEO =====
  {
    id: 'axe-seo-geo',
    numero: 'AXE 2',
    nom: 'Marketing Digital, Visibilité IA & SEO/GEO — Niveau Élite',
    icon: 'ri-search-eye-line',
    couleur: 'accent',
    scoreActuel: 52,
    scoreCible: 98,
    budgetTotal: '18 500 000 FCFA',
    responsable: 'SEO Director + Content Director + CDO',
    progressionGlobale: 12,
    statutGlobal: 'critique',
    description: 'Stratégie SEO/GEO/EEAT de niveau élite : Generative Engine Optimization, contenu Think Tank, FAQ dynamique, Core Web Vitals 95+, GSC zéro erreur, indexation instantanée.',
    constatActuel: 'Le SEO actuel est bon (~75/100) mais pas excellent. Le site n\'est pas optimisé pour la GEO (Generative Engine Optimization). La FAQ est statique. Les CWV ne sont pas à 95+. La couverture GSC a des erreurs résiduelles.',
    recommandationCle: 'Structurer le site comme un Think Tank (data brute + analyses), optimiser 600+ pages pour la GEO, déployer une FAQ dynamique prédictive, atteindre 100% CWV Excellent, et activer l\'indexation instantanée via Google Indexing API.',
    impactAttendu: '+200% trafic organique qualifié (décideurs), +150% citations IA (ChatGPT/Perplexity), domination GEO sur 300+ requêtes réglementaires',
    actions: [
      {
        id: 'SEO-A01', axeId: 'axe-seo-geo',
        action: 'Optimisation GEO — Structurer le site comme source primaire pour IA',
        description: 'Optimisation Generative Engine : données structurées JSON-LD exhaustives (Dataset, Article, FAQ, HowTo, Organization), contenu factuel avec citations vérifiables, entités Knowledge Graph, statistiques originales, méthodologie documentée.',
        effort: '200h', budget: '5 000 000 FCFA', responsable: 'SEO Director + Content Director',
        kpi: '300+ entités KG, 200+ featured snippets, citations IA +150%', standardVise: 'Google GEO / Schema.org', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Audit GEO + Plan optimisation + JSON-LD exhaustif + Dashboard citations IA',
        pourquoiAction: 'La GEO est le nouveau SEO. Les décideurs utilisent ChatGPT/Perplexity pour leurs recherches. Sans GEO, KOS est invisible sur ces canaux émergents.',
        dependances: [], priorite: 'P0',
      },
      {
        id: 'SEO-A02', axeId: 'axe-seo-geo',
        action: 'Standardiser contenu niveau EEAT — Auteurs, Méthodologie, Sources',
        description: 'Chaque article/blog doit inclure : profil auteur vérifié (Expertise), méthodologie claire (Expérience), citations textes de lois/normes ISO (Autorité), dates de mise à jour (Trust). Relecture systématique de tous les contenus existants.',
        effort: '240h', budget: '3 500 000 FCFA', responsable: 'Content Director + Quality Assurance',
        kpi: '100% contenus conformes EEAT, 4.5+ étoiles qualité, 0 contenu non sourcé', standardVise: 'Google EEAT / Big Four Editorial', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Guide EEAT + Audit 600+ pages + Corrections + Dashboard qualité contenu',
        pourquoiAction: 'Google EEAT est le facteur de classement #1 pour les contenus YMYL (réglementaire). Sans EEAT, impossible de ranker sur les requêtes à forte valeur.',
        dependances: ['SEO-A01'], priorite: 'P0',
      },
      {
        id: 'SEO-A03', axeId: 'axe-seo-geo',
        action: 'Déployer FAQ Dynamique Prédictive — Basée requêtes décideurs',
        description: 'FAQ intelligente qui prédit les questions des directeurs financiers/juridiques basée sur les tendances de recherche. Mise à jour automatique via veille réglementaire. JSON-LD FAQPage dynamique.',
        effort: '160h', budget: '4 000 000 FCFA', responsable: 'CTO + SEO Director + Knowledge Manager',
        kpi: 'FAQ 200+ questions, +50 questions/mois automatiques, CTR FAQ +40%', standardVise: 'FAQPage Schema / NLP', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Moteur FAQ dynamique + Base questions 200+ + Dashboard performance FAQ',
        pourquoiAction: 'Les FAQ sont le format #1 pour les featured snippets. Une FAQ dynamique prédictive capture les requêtes émergentes avant la concurrence.',
        dependances: ['SEO-A02'], priorite: 'P1',
      },
      {
        id: 'SEO-A04', axeId: 'axe-seo-geo',
        action: 'Core Web Vitals — 100% Excellent sur toutes les pages',
        description: 'Optimisation systématique pour atteindre LCP < 1.5s, INP < 50ms, CLS < 0.05 sur 100% des pages. Optimisation images WebP/AVIF, lazy loading, code splitting, edge caching, font optimization.',
        effort: '180h', budget: '3 000 000 FCFA', responsable: 'CTO + Lead Dev Frontend',
        kpi: '100% pages CWV Excellent, LCP < 1.5s, INP < 50ms, CLS < 0.05', standardVise: 'Google CWV / Lighthouse', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Dashboard CWV 100% + Rapport optimisation + Plan maintenance',
        pourquoiAction: 'En Afrique où la connectivité est hétérogène, la performance est encore plus critique. CWV Excellent = top 1% mondial, avantage compétitif massif.',
        dependances: [], priorite: 'P0',
      },
      {
        id: 'SEO-A05', axeId: 'axe-seo-geo',
        action: 'GSC Zéro Erreur — Tolérance Zéro 5xx/4xx + Indexation Instantanée',
        description: 'Nettoyage complet GSC : zéro erreur serveur, zéro redirection défectueuse. Intégration Google Indexing API pour indexation instantanée dès qu\'une étude est générée par KOS.',
        effort: '100h', budget: '1 500 000 FCFA', responsable: 'CTO + SEO Director',
        kpi: '0 erreur GSC, indexation < 5min après publication, couverture 100%', standardVise: 'Google Indexing API / GSC', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'GSC Dashboard clean + Intégration Indexing API + Monitoring alertes',
        pourquoiAction: 'Les erreurs GSC = perte de ranking immédiate. L\'indexation instantanée = avantage concurrentiel quand KOS publie des études exclusives.',
        dependances: ['SEO-A04'], priorite: 'P0',
      },
      {
        id: 'SEO-A06', axeId: 'axe-seo-geo',
        action: 'Stratégie backlinks — Programme Think Tank + Partenariats médias',
        description: 'Programme de création de backlinks naturels via : données exclusives citables, partenariats médias africains, guest posts sur sites autorité, infographies partageables.',
        effort: '120h', budget: '1 500 000 FCFA', responsable: 'SEO Director + Marketing Director',
        kpi: 'DR 60+ (actuel ~45), 100+ backlinks autorité/an, 20+ domaines référents médias', standardVise: 'Ahrefs DR / Moz DA', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Plan backlinks + Partenariats médias 20+ signés + Dashboard DR',
        pourquoiAction: 'Les backlinks restent le facteur de ranking #1. Un programme systématique via Think Tank + médias = croissance organique du DR.',
        dependances: ['SEO-A01'], priorite: 'P1',
      },
    ],
  },

  // ===== AXE 3 : MATURITÉ DU SYSTÈME KOS =====
  {
    id: 'axe-maturite',
    numero: 'AXE 3',
    nom: 'Maturité du Système KOS — Architecture & Qualité',
    icon: 'ri-cpu-line',
    couleur: 'secondary',
    scoreActuel: 48,
    scoreCible: 100,
    budgetTotal: '78 000 000 FCFA',
    responsable: 'CTO + AI Director + Knowledge Manager + Data Architect',
    progressionGlobale: 10,
    statutGlobal: 'critique',
    description: 'Optimisation de l\'architecture KOS : réduction dépendance Supabase, Edge Functions avec streaming, mémoire sémantique interne, autonomie API externes, zéro bug, qualité livrables 100% Big Four.',
    constatActuel: 'KOS dépend fortement de Supabase et d\'APIs externes. Pas de mémoire persistante entre sessions agents. Pas de CI/CD automatisé avec self-healing. Les livrables ne sont pas systématiquement calibrés MECE/ISO. Les timeouts sur requêtes complexes sont fréquents.',
    recommandationCle: 'Migrer vers une architecture souveraine avec cache Redis, PG vectoriel optimisé, Edge Functions avec streaming, LLM local pour tâches simples, moteur de règles réglementaires, CI/CD avec self-healing, et frameworks MECE/ISO dans le prompt-engineering.',
    impactAttendu: 'Réduction 70% coûts API, zéro timeout, qualité livrables certifiée ISO, autonomie quasi-totale, migration progressive vers infrastructure propriétaire',
    actions: [
      {
        id: 'SYS-A01', axeId: 'axe-maturite',
        action: 'Optimiser couche Supabase — Async, Cache Redis, PG Vectoriel local',
        description: 'Migration des requêtes lourdes vers processus asynchrones avec queue management. Implémentation cache Redis multi-niveaux pour éviter requêtes répétitives. Optimisation PG vectoriel pour recherche sémantique locale.',
        effort: '200h', budget: '12 000 000 FCFA', responsable: 'CTO + Data Architect',
        kpi: 'Latence P95 -60%, hit ratio cache > 80%, 0 timeout sur requêtes complexes', standardVise: 'PostgreSQL / Redis Best Practices', deadline: '2026-12-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Architecture async + Cluster Redis + Dashboard performance DB + Plan migration',
        pourquoiAction: 'Les timeouts et les requêtes répétitives dégradent l\'expérience utilisateur et gaspillent des ressources. L\'optimisation DB est le socle de toute l\'architecture.',
        dependances: [], priorite: 'P0',
      },
      {
        id: 'SYS-A02', axeId: 'axe-maturite',
        action: 'Edge Functions avec streaming — Timeout optimisé + Background Workers',
        description: 'Re-architecturer les Edge Functions pour le streaming de données. Configuration des timeouts à la limite maximale avec file d\'attente. Background workers pour les tâches longues (génération de rapports, RAG).',
        effort: '160h', budget: '9 000 000 FCFA', responsable: 'CTO + Backend Lead',
        kpi: '0 timeout, streaming < 200ms first byte, background jobs 100% complétés', standardVise: 'Deno Deploy / Cloudflare Workers', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Architecture streaming + Queue system + Dashboard workers + Monitoring',
        pourquoiAction: 'Les Edge Functions timeout actuellement sur les requêtes complexes. Le streaming + background workers résout le problème définitivement.',
        dependances: ['SYS-A01'], priorite: 'P0',
      },
      {
        id: 'SYS-A03', axeId: 'axe-maturite',
        action: 'Mémoire sémantique interne — Graph DB + Contexte persistant agents',
        description: 'Développement d\'une mémoire à long terme pour les agents IA : stockage contexte sessions, historique raisonnement, apprentissage incrémental. Graph database pour relations sémantiques entre concepts réglementaires.',
        effort: '240h', budget: '14 000 000 FCFA', responsable: 'CTO + AI Director + Knowledge Manager',
        kpi: 'Rappel contextuel > 90%, persistance 100% sessions, raisonnement incrémental actif', standardVise: 'MemGPT / Graph RAG', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Graph DB réglementaire + API mémoire agents + Dashboard sessions + Logs',
        pourquoiAction: 'Les agents KOS sont actuellement stateless. La mémoire persistante permet un conseil continu et cumulatif — comme un consultant humain qui apprend.',
        dependances: ['SYS-A02'], priorite: 'P1',
      },
      {
        id: 'SYS-A04', axeId: 'axe-maturite',
        action: 'Zéro API externe — Déploiement LLM Open-Source local + Routage intelligent',
        description: 'Intégration Llama 3/Mistral pour les tâches simples (coût zéro). Routage intelligent : tâches simples → modèle local, analyses complexes → API externe. Réduction 70%+ de la dépendance aux APIs tierces.',
        effort: '280h', budget: '28 000 000 FCFA', responsable: 'CTO + AI Director + ML Engineer',
        kpi: '70%+ requêtes traitées localement, qualité ≥ 90% vs GPT-4, coût API -70%', standardVise: 'HELM / LMSYS / Open LLM', deadline: '2027-09-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'LLM local déployé + Routeur intelligent + Dashboard coûts + Benchmark qualité',
        pourquoiAction: 'La dépendance aux APIs externes = coûts variables imprévisibles + risque de souveraineté données. Le modèle local + routage = autonomie et prédictibilité.',
        dependances: ['SYS-A02'], priorite: 'P1',
      },
      {
        id: 'SYS-A05', axeId: 'axe-maturite',
        action: 'CI/CD strict + Self-Healing — Zéro bug, zéro erreur en production',
        description: 'Pipeline CI/CD avec tests unitaires automatisés stricts. Système de self-healing : détection automatique des erreurs de code/livrable, auto-correction avant livraison client. Monitoring proactif.',
        effort: '200h', budget: '8 000 000 FCFA', responsable: 'CTO + Lead Dev + QA Manager',
        kpi: '0 bug critique en production, 95%+ couverture tests, MTTR < 5min auto', standardVise: 'CI/CD / DevOps / SRE', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Pipeline CI/CD + Suite tests + Self-healing engine + Dashboard qualité code',
        pourquoiAction: 'Les bugs en production = perte de crédibilité immédiate. Le self-healing + CI/CD strict = qualité Big Four systématique.',
        dependances: ['SYS-A02'], priorite: 'P1',
      },
      {
        id: 'SYS-A06', axeId: 'axe-maturite',
        action: 'Qualité livrables 100% Big Four — MECE, ISO, Taxonomie réglementaire',
        description: 'Intégration dans le prompt-engineering KOS : frameworks MECE, référentiels ISO (9001, 27001, 31000), taxonomie Observatoire économique. Relecture systématique des livrables par un agent Quality Controller.',
        effort: '160h', budget: '7 000 000 FCFA', responsable: 'AI Director + Quality Manager + Knowledge Manager',
        kpi: 'Score qualité livrables > 90/100, conformité MECE 100%, citations ISO vérifiées', standardVise: 'MECE / ISO 9001 / ISO 31000', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Quality Controller agent + Base frameworks MECE/ISO + Dashboard qualité livrables',
        pourquoiAction: 'Les livrables KOS doivent systématiquement égaler le standard Big Four. Sans cadre MECE + ISO + taxonomie, la qualité est inégale.',
        dependances: [], priorite: 'P0',
      },
    ],
  },

  // ===== AXE 4 : TUNNEL DE CONVERSION & EXPÉRIENCE CLIENT (UI/UX) =====
  {
    id: 'axe-uiux',
    numero: 'AXE 4',
    nom: 'Tunnel de Conversion & Expérience Client — UI/UX Premium',
    icon: 'ri-layout-5-line',
    couleur: 'primary',
    scoreActuel: 55,
    scoreCible: 98,
    budgetTotal: '16 000 000 FCFA',
    responsable: 'Lead Dev Frontend + Creative Director + UX Designer + Growth Director',
    progressionGlobale: 5,
    statutGlobal: 'critique',
    description: 'Refonte de l\'expérience visuelle : design Big Four premium, storytelling scrolling, lead magnets interactifs haute valeur, nurturing automatisé basé veille réglementaire, closing accéléré via dashboard client.',
    constatActuel: 'Le design actuel est fonctionnel mais pas premium. Pas de storytelling scrolling ni de micro-interactions. Les lead magnets sont statiques (PDF). Pas de nurturing automatisé basé sur la veille réglementaire. Pas de dashboard client.',
    recommandationCle: 'Refondre l\'identité graphique vers un minimalisme premium Big Four (sobriété, blancs généreux, typographie institutionnelle), intégrer un lead magnet interactif « Pré-audit flash ISO automatisé par KOS », déployer le nurturing réglementaire personnalisé, et créer un espace client dashboard.',
    impactAttendu: '+300% leads qualifiés, +50% taux conversion lead → client, cycle de vente réduit de 6 semaines à 10 jours, NPS client > 70',
    actions: [
      {
        id: 'UX-A01', axeId: 'axe-uiux',
        action: 'Refonte design premium — Minimalisme Big Four + Design System complet',
        description: 'Refonte complète de l\'identité visuelle : sobriété, espaces blancs généreux, typographie institutionnelle (Inter, DM Sans), palette premium. Design system 100+ composants réutilisables. Micro-interactions fluides.',
        effort: '200h', budget: '4 000 000 FCFA', responsable: 'Lead Dev Frontend + Creative Director',
        kpi: 'Score design > 90/100, composants 100% réutilisables, guide de style documenté', standardVise: 'Material Design 3 / Apple HIG', deadline: '2026-11-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Design system + Storybook + Guide de style + Composants Premium + Templates',
        pourquoiAction: 'La première impression visuelle = confiance institutionnelle. Un design Big Four inspire immédiatement crédibilité et professionnalisme.',
        dependances: [], priorite: 'P0',
      },
      {
        id: 'UX-A02', axeId: 'axe-uiux',
        action: 'Storytelling scrolling — Animation narrative "KOS pense en direct"',
        description: 'Implémentation de scroll-driven animations narratives : transition visuelle entre "Rigueur Traditionnelle" et "Intelligence Artificielle KOS". L\'internaute voit KOS cartographier et analyser les données au fil du scroll.',
        effort: '160h', budget: '3 000 000 FCFA', responsable: 'Lead Dev Frontend + Creative Director',
        kpi: 'Temps sur page +40%, scroll depth > 70%, engagement rate +50%', standardVise: 'Scroll-driven Animations / Lottie', deadline: '2027-01-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Animations scroll-driven + Storyboard + Dashboard engagement + Tests A/B',
        pourquoiAction: 'Le storytelling visuel différencie radicalement KOS des cabinets traditionnels. L\'internaute vit l\'expérience "IA + Expertise" plutôt que de la lire.',
        dependances: ['UX-A01'], priorite: 'P1',
      },
      {
        id: 'UX-A03', axeId: 'axe-uiux',
        action: 'Lead Magnet interactif — "Pré-audit flash ISO automatisé par KOS"',
        description: 'Outil interactif : le prospect entre son secteur et son CA, KOS génère instantanément un mini-rapport personnalisé de 3 pages en direct. Capture email avant livraison. Plusieurs versions par secteur.',
        effort: '200h', budget: '5 000 000 FCFA', responsable: 'Growth Director + CTO + Creative Director',
        kpi: 'Conversion 15%+ visiteurs → leads, 500+ leads/mois, NPS lead magnet > 75', standardVise: 'Interactive Content / CRO', deadline: '2027-03-31',
        statut: 'non_demarre', progression: 0,
        livrable: 'Outil interactif 5+ secteurs + Dashboard leads + Rapports auto-générés + Email automation',
        pourquoiAction: 'Les PDF statiques convertissent à 2-3%. Un outil interactif qui génère un rapport personnalisé en direct = 15-25% conversion. C\'est le lead magnet ultime.',
        dependances: ['UX-A01'], priorite: 'P0',
      },
      {
        id: 'UX-A04', axeId: 'axe-uiux',
        action: 'Nurturing automatisé — Alertes d\'impact réglementaire personnalisées',
        description: 'Système de nurturing basé sur la veille réglementaire. Si un décret tombe dans le secteur du prospect, KOS génère une alerte d\'impact personnalisée ("M. X, voici comment la nouvelle norme impacte votre filiale...") envoyée par email.',
        effort: '160h', budget: '2 500 000 FCFA', responsable: 'Growth Director + Knowledge Manager + CTO',
        kpi: 'Taux ouverture > 45%, taux clic > 15%, lead → MQL +35%', standardVise: 'Marketing Automation / GDPR', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Moteur nurturing réglementaire + Templates email + Dashboard campagnes + Analytics',
        pourquoiAction: 'Le nurturing générique a un taux d\'ouverture de 15-20%. L\'alerte personnalisée basée sur l\'actualité réglementaire du prospect = 45-60% taux d\'ouverture.',
        dependances: ['UX-A03', 'MKT-A04'], priorite: 'P1',
      },
      {
        id: 'UX-A05', axeId: 'axe-uiux',
        action: 'Espace client Dashboard KOS — Closing accéléré',
        description: 'Dashboard client personnalisé accessible dès le premier contact. Le client visualise la structure de son futur projet de conseil, les étapes, le calendrier, les livrables attendus. Réduction du cycle de vente.',
        effort: '200h', budget: '1 500 000 FCFA', responsable: 'CTO + Lead Dev Frontend + Growth Director',
        kpi: 'Cycle vente -60% (6 semaines → 10 jours), satisfaction prospect > 85%', standardVise: 'Client Portal / SaaS UX', deadline: '2027-06-30',
        statut: 'non_demarre', progression: 0,
        livrable: 'Dashboard client + Onboarding interactif + Templates projet + Analytics conversion',
        pourquoiAction: 'La transparence radicale (voir son projet avant d\'avoir signé) réduit drastiquement le cycle de vente. Le client visualise la valeur avant de payer.',
        dependances: ['UX-A01'], priorite: 'P1',
      },
    ],
  },
];

// ===== MÉTADONNÉES GLOBALES =====
export const AUDIT_FINAL_META = {
  titre: 'KOS Analyse Finale — Vérification Tous Points d\'Audit',
  version: 'v1.0 SYNTHÈSE ULTIME — 2026.06.26',
  axesTotal: 4,
  actionsTotal: 23,
  budgetTotal: '134 500 000 FCFA',
  scoreGlobalActuel: 53.3,
  scoreGlobalCible: 97.8,
  horizon: '12-18 mois (Juillet 2026 — Décembre 2027)',
  gouvernance: 'Comité de Pilotage Audit Final — Hebdomadaire — Managing Partner + CTO + Growth Director + Creative Director + SEO Director + Knowledge Manager',
  messageCle: 'L\'audit final couvre l\'intégralité des 4 dimensions critiques pour la dominance : Marché & Positionnement, SEO/GEO Élite, Maturité Système KOS, et UI/UX Premium. 23 actions. Budget 134.5M FCFA. À l\'issue : Khepra Experts est positionné comme le Cabinet de Conseil Augmenté de référence en Afrique francophone, avec un site world-class, un KOS autonome, et une machine à leads calibrée.',
};

// ===== SYNTHÈSE FEUILLE DE ROUTE PRIORITAIRE =====
export interface RoadmapPriorite {
  pilier: string;
  actions: string[];
  impact: string;
  horizon: string;
  budget: string;
}

export const ROADMAP_PRIORITAIRE: RoadmapPriorite[] = [
  {
    pilier: 'Technique (KOS)',
    actions: ['SYS-A04 — LLM local + Routage intelligent', 'SYS-A01 — Optimisation Supabase Async/Cache', 'SYS-A03 — Mémoire sémantique Graph DB', 'SYS-A05 — CI/CD + Self-Healing'],
    impact: 'Réduction 70% coûts API, zéro timeout, autonomie quasi-totale, 0 bug production',
    horizon: 'Juillet 2026 — Septembre 2027',
    budget: '71 000 000 FCFA',
  },
  {
    pilier: 'Contenu & SEO/GEO',
    actions: ['SEO-A01 — Optimisation GEO Think Tank', 'SEO-A02 — Standardisation EEAT', 'SEO-A04 — CWV 100% Excellent', 'SEO-A05 — GSC Zéro Erreur + Indexation Instantanée'],
    impact: '+200% trafic organique qualifié, domination GEO 300+ requêtes, +150% citations IA',
    horizon: 'Juillet 2026 — Mars 2027',
    budget: '13 000 000 FCFA',
  },
  {
    pilier: 'UI/UX & Conversion',
    actions: ['UX-A01 — Refonte Design Premium Big Four', 'UX-A03 — Lead Magnet Interactif Pré-audit ISO', 'MKT-A02 — Positionnement Cabinet Augmenté', 'UX-A04 — Nurturing Réglementaire Personnalisé'],
    impact: '+300% leads qualifiés, +50% conversion, cycle vente -60%, NPS > 70',
    horizon: 'Juillet 2026 — Juin 2027',
    budget: '18 500 000 FCFA',
  },
];

// ===== COMPUTEUR KPIs =====
export function computeAuditFinalKPIs() {
  const axes = AUDIT_AXES;
  const allActions = axes.flatMap(a => a.actions);

  const actionsNonDemarre = allActions.filter(a => a.statut === 'non_demarre').length;
  const actionsEnCours = allActions.filter(a => a.statut === 'en_cours').length;
  const actionsTerminees = allActions.filter(a => a.statut === 'termine').length;

  const progressionGlobale = Math.round(allActions.reduce((s, a) => s + a.progression, 0) / allActions.length);
  const scoreMoyenActuel = Math.round(axes.reduce((s, a) => s + a.scoreActuel, 0) / axes.length * 10) / 10;

  const actionsP0 = allActions.filter(a => a.priorite === 'P0').length;
  const actionsP1 = allActions.filter(a => a.priorite === 'P1').length;
  const actionsP2 = allActions.filter(a => a.priorite === 'P2').length;

  const axesCritiques = axes.filter(a => a.statutGlobal === 'critique').length;

  return {
    axes_total: axes.length,
    actions_total: allActions.length,
    actions_non_demarre: actionsNonDemarre,
    actions_en_cours: actionsEnCours,
    actions_terminees: actionsTerminees,
    actions_p0: actionsP0,
    actions_p1: actionsP1,
    actions_p2: actionsP2,
    progression_globale: progressionGlobale,
    score_moyen_actuel: scoreMoyenActuel,
    axes_critiques: axesCritiques,
    budget_total: '134 500 000 FCFA',
  };
}





