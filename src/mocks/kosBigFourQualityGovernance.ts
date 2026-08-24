export const bigFourDomains = [
  { id: 'conformite', nom: 'Conformité Réglementaire', acronyme: 'CONF', icon: 'ri-scales-3-line', couleur: 'bg-emerald-500', score_actuel: 98, score_cible: 98, ecart: 0 },
  { id: 'bf-growth', nom: 'Croissance & Influence', acronyme: 'GROWTH', icon: 'ri-rocket-2-line', couleur: 'bg-amber-500', score_actuel: 90, score_cible: 95, ecart: 5 },
  { id: 'cybersecurite', nom: 'Cybersécurité & Résilience', acronyme: 'CYBER', icon: 'ri-shield-keyhole-line', couleur: 'bg-red-500', score_actuel: 97, score_cible: 97, ecart: 0 },
  { id: 'dev_commercial', nom: 'Développement Commercial', acronyme: 'DEV', icon: 'ri-hand-coin-line', couleur: 'bg-teal-500', score_actuel: 95, score_cible: 95, ecart: 0 },
  { id: 'geo', nom: 'GEO — Generative Engine Optimization', acronyme: 'GEO', icon: 'ri-radar-line', couleur: 'bg-violet-500', score_actuel: 96, score_cible: 96, ecart: 0 },
  { id: 'risques', nom: 'Gestion des Risques', acronyme: 'RISK', icon: 'ri-alert-line', couleur: 'bg-orange-500', score_actuel: 95, score_cible: 95, ecart: 0 },
  { id: 'bf-governance', nom: 'Gouvernance & Due Diligence', acronyme: 'GOV', icon: 'ri-government-line', couleur: 'bg-indigo-500', score_actuel: 90, score_cible: 95, ecart: 5 },
  { id: 'gouvernance', nom: "Gouvernance d'Entreprise", acronyme: 'GOUV', icon: 'ri-building-4-line', couleur: 'bg-sky-500', score_actuel: 98, score_cible: 98, ecart: 0 },
  { id: 'ia', nom: 'Intelligence Artificielle & Gouvernance IA', acronyme: 'IA', icon: 'ri-brain-2-line', couleur: 'bg-fuchsia-500', score_actuel: 97, score_cible: 97, ecart: 0 },
  { id: 'bf-regulatory', nom: 'Intelligence Réglementaire', acronyme: 'REG', icon: 'ri-file-search-line', couleur: 'bg-cyan-500', score_actuel: 98, score_cible: 98, ecart: 0 },
  { id: 'qualite', nom: 'Qualité & Excellence Opérationnelle', acronyme: 'QUAL', icon: 'ri-medal-line', couleur: 'bg-rose-500', score_actuel: 99, score_cible: 99, ecart: 0 },
  { id: 'recherche', nom: 'Recherche & Production Intellectuelle', acronyme: 'RECH', icon: 'ri-lightbulb-flash-line', couleur: 'bg-lime-500', score_actuel: 97, score_cible: 97, ecart: 0 },
  { id: 'bf-risk', nom: 'Risk & Résilience', acronyme: 'RISK', icon: 'ri-shield-check-line', couleur: 'bg-orange-600', score_actuel: 90, score_cible: 95, ecart: 5 },
  { id: 'seo', nom: 'SEO & Visibilité Organique', acronyme: 'SEO', icon: 'ri-search-eye-line', couleur: 'bg-blue-500', score_actuel: 97, score_cible: 97, ecart: 0 },
];

export const qualityKPIs = [
  { label: 'Taux de Conformité Réglementaire', value: '98.2%', icon: 'ri-check-double-line', color: 'bg-emerald-500', target: '>95%' },
  { label: 'Références Vérifiées', value: '11/50', icon: 'ri-link-m', color: 'bg-amber-500', target: '50' },
  { label: 'Affirmations Corrigées', value: '847', icon: 'ri-quill-pen-line', color: 'bg-primary-500', target: 'Croissant' },
  { label: 'Risques Détectés', value: '23', icon: 'ri-alert-line', color: 'bg-red-500', target: '<10' },
  { label: 'Temps Moyen de Revue', value: '2.3 min', icon: 'ri-time-line', color: 'bg-teal-500', target: '<5 min' },
  { label: 'Couverture Documentaire', value: '65%', icon: 'ri-folder-chart-line', color: 'bg-violet-500', target: '>90%' },
  { label: 'Taux de Réutilisation Connaissances', value: '34%', icon: 'ri-refresh-line', color: 'bg-indigo-500', target: '>60%' },
  { label: 'Maturité Contrôles Qualité', value: '8.4/10', icon: 'ri-shield-star-line', color: 'bg-rose-500', target: '10/10' },
];

export const auditTypes = [
  { key: 'audit_technique', label: 'Audit Technique', icon: 'ri-code-s-slash-line', description: 'Qualité du code, performance, accessibilité' },
  { key: 'audit_reglementaire', label: 'Audit Réglementaire', icon: 'ri-scales-3-line', description: 'Exactitude des références, cohérence des articles' },
  { key: 'audit_juridique', label: 'Audit Juridique', icon: 'ri-scales-3-line', description: 'Validité juridique, sanctions, obligations légales' },
  { key: 'audit_methodologique', label: 'Audit Méthodologique', icon: 'ri-flask-line', description: 'Rigueur méthodologique, cadre analytique' },
  { key: 'audit_redactionnel', label: 'Audit Rédactionnel', icon: 'ri-quill-pen-line', description: 'Clarté, concision, structure, grammaire' },
  { key: 'audit_coherence', label: 'Audit de Cohérence', icon: 'ri-mental-health-line', description: 'Cohérence interne, logique argumentative' },
  { key: 'audit_references', label: 'Audit des Références', icon: 'ri-link-m', description: 'Sources, citations, URLs, formats' },
  { key: 'audit_conformite_sectorielle', label: 'Audit Conformité Sectorielle', icon: 'ri-building-2-line', description: 'Adéquation au secteur concerné' },
  { key: 'audit_risques', label: 'Audit des Risques', icon: 'ri-shield-flash-line', description: 'Risques identifiés, mitigations proposées' },
  { key: 'audit_hypotheses', label: 'Audit des Hypothèses', icon: 'ri-question-mark', description: 'Validation et explicitation des hypothèses' },
];

export const detectionCategories = [
  { key: 'affirmation_absolue', label: 'Affirmations Absolues', severity: 'medium', examples: '"toujours", "jamais", "garanti"' },
  { key: 'generalisation', label: 'Généralisations', severity: 'medium', examples: '"tous les", "chaque", "systématiquement"' },
  { key: 'raccourci_reglementaire', label: 'Raccourcis Réglementaires', severity: 'high', examples: '"conformément à la réglementation" sans référence' },
  { key: 'interpretation', label: 'Interprétations', severity: 'medium', examples: 'Interprétation présentée comme un fait' },
  { key: 'ambiguite', label: 'Ambiguités', severity: 'low', examples: '"il semblerait", "probablement"' },
  { key: 'approximation', label: 'Approximations', severity: 'low', examples: '"environ", "à peu près", "de l\'ordre de"' },
  { key: 'reference_obsolete', label: 'Références Obsolètes', severity: 'medium', examples: 'Dates antérieures à 2015' },
  { key: 'citation_incomplete', label: 'Citations Incomplètes', severity: 'high', examples: 'Article sans numéro, loi sans date' },
  { key: 'bonne_pratique_as_obligation', label: 'Bonnes Pratiques → Obligations', severity: 'high', examples: '"il faut", "on doit" sans base légale' },
];

export const recentReviews = [
  { id: 'rev-001', document: 'Guide Conformité BCEAO 2026', type: 'Guide', score: 8.7, status: 'passed', date: '2026-06-30' },
  { id: 'rev-002', document: 'Rapport ESG — Secteur Bancaire UEMOA', type: 'Rapport', score: 7.2, status: 'conditional', date: '2026-06-29' },
  { id: 'rev-003', document: 'Analyse LCB-FT — Directive GAFI 2026', type: 'Analyse', score: 9.1, status: 'passed', date: '2026-06-28' },
  { id: 'rev-004', document: 'Article Blog — Gouvernance SFD', type: 'Article', score: 6.5, status: 'failed', date: '2026-06-27' },
  { id: 'rev-005', document: 'Proposition Commerciale — Audit COBAC', type: 'Proposition', score: 8.3, status: 'passed', date: '2026-06-26' },
];

export const confidenceLevels = [
  { level: 'A', label: 'Confirmé — Multiples sources officielles', color: 'bg-emerald-500', count: 127 },
  { level: 'B', label: 'Confirmé — Une source officielle', color: 'bg-teal-500', count: 341 },
  { level: 'C', label: 'Confirmé — Littérature professionnelle', color: 'bg-amber-500', count: 218 },
  { level: 'D', label: 'Pratique observée — Non confirmée', color: 'bg-orange-500', count: 89 },
  { level: 'E', label: 'Hypothèse — À vérifier', color: 'bg-red-500', count: 47 },
];

export const documentProductionComponents = [
  { key: 'resume_executif', label: 'Résumé Exécutif', icon: 'ri-file-text-line' },
  { key: 'analyse_detaillee', label: 'Analyse Détaillée', icon: 'ri-article-line' },
  { key: 'matrice_reglementaire', label: 'Matrice Réglementaire', icon: 'ri-grid-line' },
  { key: 'table_conformite', label: 'Table de Conformité', icon: 'ri-table-line' },
  { key: 'cartographie_risques', label: 'Cartographie des Risques', icon: 'ri-radar-line' },
  { key: 'liste_hypotheses', label: 'Liste des Hypothèses', icon: 'ri-question-answer-line' },
  { key: 'points_vigilance', label: 'Points de Vigilance', icon: 'ri-alert-line' },
  { key: 'sources_utilisees', label: 'Sources Utilisées', icon: 'ri-book-open-line' },
  { key: 'historique_versions', label: 'Historique des Versions', icon: 'ri-history-line' },
  { key: 'recommandations', label: 'Recommandations', icon: 'ri-lightbulb-line' },
  { key: 'plan_amelioration', label: "Plan d'Amélioration", icon: 'ri-road-map-line' },
];





