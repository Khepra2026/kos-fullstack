export const competencyModules = [
  {
    id: 'comp-shadow-ai',
    module_key: 'shadow_ai_audit',
    titre: "Cartographie de l'Essaim Transversal (Shadow AI Audit)",
    objectif: "Rendre visible l'invisible sans installer d'agents invasifs.",
    livrable_attendu: "Un framework pour identifier où les décisions divergent (Ventes via Modèle A vs Ingénierie via Modèle B) et mesurer l'impact de cette fédération involontaire sur le comportement de l'entreprise.",
    pilier_bigfour: ['Gouvernance & Risques', 'Psychologie Comportementale'],
    approche_cible: "Gouvernance KOS/Décisionnelle : Cartographie comportementale non-invasive, détection de divergences décisionnelles par analyse des outputs, mesure de l'impact de la fédération involontaire sur la cohérence stratégique.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Blocage des outils, listes noires d'URLs, interdictions IT qui poussent les employés vers des solutions encore plus invisibles (Shadow IT aggravé).",
    protocoles_action: [
      { etape: 1, action: 'Analyse des métadonnées documentaires', description: 'Scanner les propriétés des documents produits (auteur, outil de création, modèle utilisé) pour identifier les signatures d\'IA', outil: 'Document Metadata Scanner', delai: '72h' },
      { etape: 2, action: 'Détection des patterns de langage IA', description: 'Analyser la structure linguistique des outputs pour identifier les modèles sous-jacents (GPT-4o vs Claude vs Gemini vs Copilot)', outil: 'Linguistic Fingerprint Analyzer', delai: '48h' },
      { etape: 3, action: 'Cartographie des divergences inter-départements', description: 'Comparer les décisions prises par différents départements sur des sujets similaires pour identifier les conflits de modèles', outil: 'Cross-Department Divergence Matrix', delai: '1 semaine' },
      { etape: 4, action: 'Quantification de l\'impact décisionnel', description: 'Mesurer l\'écart entre les décisions fédérées involontaires et la stratégie officielle de l\'entreprise', outil: 'Decision Impact Scoring Engine', delai: '72h' },
      { etape: 5, action: 'Rapport de visibilité Shadow AI', description: 'Produire un dashboard exécutif montrant où, quand et comment l\'IA non-gouvernée est utilisée, sans jamais nommer les individus', outil: 'Executive Shadow AI Dashboard', delai: '24h' },
    ],
    maturite_score: 65,
    statut: 'seeded',
    version: 1,
  },
  {
    id: 'comp-decision-layer',
    module_key: 'decision_layer',
    titre: 'Design de la Couche Décisionnelle (The Decision Layer Architecture)',
    objectif: 'Remplacer la roulette des LLM par des points de contrôle architecturaux.',
    livrable_attendu: "Schéma fonctionnel d'une passerelle KOS (Knowledge Gateway) qui harmonise les prompts, les bases de connaissances (RAG) et les règles d'affaires, quel que soit le modèle final cliqué par l'utilisateur.",
    pilier_bigfour: ['Architecture des Systèmes de Connaissances (KOS)', "Ingénierie de la Confiance & Auditabilité"],
    approche_cible: "Couche Décisionnelle Unifiée : Knowledge Gateway qui intercepte, harmonise, enrichit et audite chaque requête avant qu'elle n'atteigne un LLM. L'utilisateur choisit son outil, la Gateway impose la cohérence.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Pare-feu réseau, blocage de domaines, interdiction des LLM publics — inefficace car les employés utilisent leurs appareils personnels.",
    protocoles_action: [
      { etape: 1, action: 'Définition du schéma de la Knowledge Gateway', description: "Concevoir l'architecture en couches (Prompt Harmonization → RAG Enrichment → Business Rules → Model Routing → Audit Logging)", outil: 'KOS Gateway Blueprint', delai: '1 semaine' },
      { etape: 2, action: 'Implémentation du Prompt Harmonizer', description: 'Couche qui normalise, complète et sécurise les prompts avant envoi au LLM, en injectant le contexte réglementaire et les politiques internes', outil: 'Prompt Harmonization Engine', delai: '2 semaines' },
      { etape: 3, action: 'Déploiement du RAG Enrichment Layer', description: 'Base de connaissances unifiée qui enrichit chaque requête avec les documents officiels, les précédents validés et les règles d\'affaires applicables', outil: 'RAG Enrichment Layer', delai: '2 semaines' },
      { etape: 4, action: 'Configuration du Business Rules Engine', description: 'Moteur de règles qui valide les outputs contre les politiques internes, les contraintes réglementaires et les standards de qualité avant diffusion', outil: 'Business Rules Validator', delai: '1 semaine' },
      { etape: 5, action: 'Mise en place du Model Router', description: 'Routeur intelligent qui sélectionne le modèle le plus approprié en fonction de la sensibilité de la tâche, du besoin de précision et du coût', outil: 'Intelligent Model Router', delai: '1 semaine' },
    ],
    maturite_score: 70,
    statut: 'seeded',
    version: 1,
  },
  {
    id: 'comp-trust-provenance',
    module_key: 'trust_provenance',
    titre: "Protocoles d'Intégrité des Artéfacts (Trust & Provenance)",
    objectif: "Savoir jusqu'à quel point l'organisation peut faire confiance aux contrats redessinés, aux architectures API et aux messages marketing générés.",
    livrable_attendu: "Un système de marquage, de métadonnées et d'auditabilité pour valider l'alignement d'un artéfact avec les politiques réelles de l'entreprise.",
    pilier_bigfour: ["Ingénierie de la Confiance & Auditabilité", 'Gouvernance & Risques'],
    approche_cible: "Système de Provenance Intégré : Chaque artéfact porte un filigrane numérique (watermark) décrivant le modèle utilisé, les sources consultées, le niveau de confiance et si une revue humaine est requise.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Confiance binaire (approuvé ou non), absence de granularité sur la provenance, pas de traçabilité de la chaîne de génération.",
    protocoles_action: [
      { etape: 1, action: 'Définition du schéma de métadonnées de provenance', description: 'Standardiser les métadonnées obligatoires : modèle IA, date, sources, niveau de confiance (A à E), validateur humain', outil: 'Provenance Metadata Schema', delai: '72h' },
      { etape: 2, action: 'Implémentation du Watermark Engine', description: 'Moteur qui insère automatiquement les métadonnées de provenance dans chaque artéfact généré, de manière lisible par machine et par humain', outil: 'Digital Watermark Engine', delai: '1 semaine' },
      { etape: 3, action: 'Mise en place du Policy Alignment Checker', description: 'Système qui compare automatiquement le contenu de l\'artéfact avec les politiques internes et les exigences réglementaires', outil: 'Policy Alignment Checker', delai: '1 semaine' },
      { etape: 4, action: 'Déploiement du Confidence Classifier', description: 'Classification automatique du niveau de confiance (A: sources officielles multiples, B: source officielle unique, C: littérature pro, D: pratique observée, E: hypothèse)', outil: 'Confidence Classifier Engine', delai: '48h' },
      { etape: 5, action: 'Création du Audit Trail Ledger', description: 'Registre immuable de tous les artéfacts, leur provenance, les validations et les corrections — consultable par les auditeurs', outil: 'Trust Provenance Ledger', delai: '1 semaine' },
    ],
    maturite_score: 60,
    statut: 'seeded',
    version: 1,
  },
  {
    id: 'comp-curiosity-safe',
    module_key: 'curiosity_safe',
    titre: "Cadre d'Incitation à l'Alignement (Curiosity-Safe Governance)",
    objectif: 'Canaliser la curiosité des employés au lieu de la broyer sous des interdictions IT.',
    livrable_attendu: "Une stratégie de Nudge (incitation douce) et de bacs à sable internes rendant la solution gouvernée plus rapide, plus performante et plus attrayante que n'importe quel onglet grand public gratuit.",
    pilier_bigfour: ['Psychologie Comportementale', 'Architecture des Systèmes de Connaissances (KOS)'],
    approche_cible: "Curiosity-Safe Governance : Sandboxes internes plus rapides que ChatGPT, nudges qui montrent les bénéfices de la gouvernance (meilleure qualité, moins de corrections), reconnaissance des early adopters internes.",
    approche_obsolete: "Sécurité Périmétrique/DLP : Interdiction totale des IA grand public, sanctions, surveillance — génère du ressentiment et pousse à la clandestinité.",
    protocoles_action: [
      { etape: 1, action: 'Création du Sandbox Interne KOS', description: 'Environnement sécurisé où les employés peuvent utiliser l\'IA avec toutes les données internes, plus rapide que n\'importe quelle solution grand public', outil: 'KOS Internal Sandbox', delai: '2 semaines' },
      { etape: 2, action: 'Déploiement des Nudges Comportementaux', description: 'Messages contextuels qui montrent la valeur ajoutée de la solution gouvernée (temps gagné, qualité supérieure, conformité automatique)', outil: 'Behavioral Nudge Engine', delai: '1 semaine' },
      { etape: 3, action: 'Programme Early Adopter Champion', description: 'Identifier et récompenser les premiers utilisateurs de la solution gouvernée, qui deviennent des ambassadeurs internes', outil: 'Champion Recognition Program', delai: 'En continu' },
      { etape: 4, action: "Mise en place des Métriques d'Adoption", description: "Tableau de bord montrant le taux d'adoption de la solution gouvernée vs shadow AI, avec objectifs progressifs (50% à 3 mois, 80% à 6 mois)", outil: 'Adoption Analytics Dashboard', delai: '72h' },
      { etape: 5, action: 'Boucle de Feedback Continue', description: 'Système permettant aux employés de suggérer des améliorations de la solution gouvernée, créant un sentiment de co-construction', outil: 'Continuous Feedback Loop', delai: 'En continu' },
    ],
    maturite_score: 55,
    statut: 'seeded',
    version: 1,
  },
];

export const allPillars = [
  { name: 'Gouvernance & Risques (Niveau Conseil)', icon: 'ri-shield-check-line', description: "Passer de la simple prévention des pertes de données (DLP) à la gouvernance de la cohérence décisionnelle.", color: 'bg-red-500' },
  { name: 'Architecture des Systèmes de Connaissances (KOS)', icon: 'ri-stack-line', description: "Concevoir l'IA non pas comme une application, mais comme une couche d'infrastructure et de décision unifiée.", color: 'bg-sky-500' },
  { name: 'Psychologie Comportementale des Utilisateurs', icon: 'ri-user-heart-line', description: "Comprendre l'adoption de l'IA par le bas pour concevoir des contrôles invisibles ou incitatifs.", color: 'bg-amber-500' },
  { name: "Ingénierie de la Confiance & Auditabilité", icon: 'ri-verified-badge-line', description: "Créer des mécanismes pour valider l'intégrité des artéfacts produits par des IA hétérogènes.", color: 'bg-emerald-500' },
];

export const shadowAIDetections = [
  { detection_method: 'linguistic_fingerprinting', model_signature: 'GPT-4o', source_tool: 'Document Metadata Scanner', departement: 'Cross-functional', divergence_type: 'style_variation', impact_score: 75, remediation: 'Rediriger vers KOS Gateway pour harmonisation du ton institutionnel', statut: 'detected' },
  { detection_method: 'document_metadata_analysis', model_signature: 'Claude 3.5', source_tool: 'Metadata Extractor', departement: 'Juridique', divergence_type: 'decision_divergence', impact_score: 90, remediation: 'Appliquer Business Rules Engine avant validation finale', statut: 'detected' },
  { detection_method: 'behavior_pattern', model_signature: 'Gemini 1.5', source_tool: 'Usage Pattern Analyzer', departement: 'Marketing', divergence_type: 'output_conflict', impact_score: 60, remediation: 'Activer le Prompt Harmonizer pour aligner le ton et les claims', statut: 'detected' },
];

export const trustProvenanceEntries = [
  { artifact_type: 'contrat_commercial', generation_model: 'Claude 3.5 Sonnet', confidence_level: 'B', source_count: 3, official_sources: ['Code civil', 'Acte uniforme OHADA', 'Jurisprudence CCJA'], policy_alignment_score: 92, human_review_required: true, validation_status: 'validated' },
  { artifact_type: 'rapport_audit', generation_model: 'GPT-4o', confidence_level: 'A', source_count: 5, official_sources: ['Instruction BCEAO n°008-2015', 'Circulaire COBAC R-2016/01', 'Normes ISA'], policy_alignment_score: 98, human_review_required: false, validation_status: 'validated' },
  { artifact_type: 'post_linkedin', generation_model: 'Gemini 1.5 Pro', confidence_level: 'D', source_count: 1, professional_sources: ['Best practices réseaux sociaux'], policy_alignment_score: 65, human_review_required: true, validation_status: 'pending' },
];

export const curiositySafeNudges = [
  { nudge_name: 'Speed Advantage Nudge', nudge_type: 'performance_boost', trigger_condition: "L'utilisateur ouvre un onglet ChatGPT/Claude externe", target_behavior: 'Rediriger vers le KOS Internal Sandbox', alternative_offered: 'KOS Sandbox — 3x plus rapide avec toutes les données internes pré-chargées', success_metric: 'Taux de redirection > 70%', is_active: true },
  { nudge_name: 'Quality Comparison Badge', nudge_type: 'social_proof', trigger_condition: "L'utilisateur colle du contenu généré par une IA externe", target_behavior: 'Comparer avec la qualité du KOS Gateway', alternative_offered: 'Ce contenu a un score de confiance D. La Gateway KOS produit du contenu de score A avec vérification automatique.', success_metric: 'Taux de conversion > 50%', is_active: true },
  { nudge_name: 'Compliance Auto-Check Teaser', nudge_type: 'progressive_disclosure', trigger_condition: "L'utilisateur commence à rédiger un document sensible", target_behavior: 'Utiliser le Business Rules Engine', alternative_offered: 'Pssst... la Gateway vérifie automatiquement la conformité BCEAO/COBAC. Pas besoin de relire 200 pages de réglementation.', success_metric: "Taux d'activation > 80%", is_active: true },
  { nudge_name: 'Champion Spotlight', nudge_type: 'gamification', trigger_condition: 'Un utilisateur atteint 10 utilisations de la Gateway', target_behavior: 'Devenir un ambassadeur interne', alternative_offered: 'Badge KOS Champion débloqué ! Tu fais partie du top 5% des utilisateurs les plus productifs. Partage ton expérience ?', success_metric: 'Taux de partage > 30%', is_active: true },
  { nudge_name: 'Sandbox Premium Preview', nudge_type: 'sandbox_invite', trigger_condition: 'Nouvel employé détecté utilisant une IA externe', target_behavior: 'Découvrir le KOS Sandbox', alternative_offered: 'Bienvenue ! Ici tu as accès à tous les modèles d\'IA avec les données internes — zero risque conformité. Essaie en 1 clic.', success_metric: 'Activation J+7 > 90%', is_active: true },
];