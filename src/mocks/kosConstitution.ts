export interface KOSConstitutionPolicy {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
  standards: string[];
  status: 'active' | 'draft' | 'review';
  score: number;
  last_updated: string;
  owner: string;
}

export interface KOSConstitutionBloc1 {
  bloc_id: string;
  bloc_name: string;
  version: string;
  target_maturity: number;
  current_maturity: number;
  certification_target: string;
  policies: KOSConstitutionPolicy[];
  executive_summary: string;
  governance_body: string;
  review_cycle: string;
  total_policies: number;
  active_policies: number;
  avg_score: number;
}

export const KOS_CONSTITUTION_DATA: KOSConstitutionBloc1 = {
  bloc_id: 'BLOC-001',
  bloc_name: 'KOS Constitution™',
  version: 'v1.0',
  target_maturity: 95,
  current_maturity: 88,
  certification_target: 'ISO 9001 + ISO 27001 + COSO + COBIT + ITIL',
  executive_summary: 'Cadre fondateur du KOS Enterprise Intelligence OS™ définissant la Vision, la Mission, les Principes, la Charte IA, et les 6 politiques de gouvernance. Aligné sur les standards Big Four et les référentiels internationaux ISO, COSO, COBIT et ITIL.',
  governance_body: 'Virtual Board — KHEPRA EXPERTS',
  review_cycle: 'Trimestriel (Mars, Juin, Septembre, Décembre)',
  total_policies: 10,
  active_policies: 9,
  avg_score: 92,
  policies: [
    {
      id: 'POL-001',
      title: 'Vision & Mission',
      icon: 'ri-eye-line',
      description: 'Vision stratégique et mission fondamentale du KOS Enterprise Intelligence OS™',
      content: 'Faire de KHEPRA EXPERTS la référence africaine en intelligence réglementaire augmentée par l\'IA. Devenir la première plateforme Enterprise Intelligence OS™ auditée, industrialisée et scalable à l\'échelle panafricaine avec une maturité > 95/100. La mission est d\'accompagner institutions financières, régulateurs, investisseurs et entreprises dans la maîtrise des risques réglementaires et stratégiques via une plateforme de conseil augmentée par 75 agents IA.',
      standards: ['ISO 9001:2015 §4.1', 'COSO ERM 2017'],
      status: 'active',
      score: 95,
      last_updated: '2026-06-15',
      owner: 'Managing Partner'
    },
    {
      id: 'POL-002',
      title: 'Principes Fondamentaux',
      icon: 'ri-scales-3-line',
      description: '8 principes non négociables applicables à toute production KOS',
      content: '1. Exactitude — Zéro approximation, chaque affirmation vérifiable. 2. Indépendance — Aucun conflit d\'intérêts, aucune complaisance. 3. Excellence — Standards Big Four comme seuil minimum. 4. Discrétion — Confidentialité absolue des missions. 5. Impact — Chaque mission produit un résultat mesurable. 6. Responsabilité — Engagement sur les livrables, transparence sur les limites. 7. Innovation — IA au service de l\'excellence, pas en remplacement du jugement. 8. Intégrité — Vérité professionnelle, même inconfortable.',
      standards: ['ISO 9001:2015 §5.1', 'COSO Internal Control', 'COBIT 2019 EDM01'],
      status: 'active',
      score: 94,
      last_updated: '2026-06-15',
      owner: 'Virtual Board'
    },
    {
      id: 'POL-003',
      title: 'Charte IA & Éthique',
      icon: 'ri-robot-2-line',
      description: 'Gouvernance des agents IA, validation multi-agents, éthique algorithmique',
      content: 'Chaque agent IA du KOS opère sous charte individuelle validée par le Virtual Board. Validation multi-agents obligatoire : minimum 2 agents pour un livrable standard, 3 pour un livrable critique, 4 + Master Orchestrator pour un livrable stratégique. Aucun livrable IA ne peut être publié sans validation. Les agents sont programmés pour l\'objectivité — pas pour la complaisance. Le Quality Controller bloque automatiquement tout livrable avec score < 95/100.',
      standards: ['ISO 42001:2023', 'EU AI Act', 'NIST AI RMF 1.0', 'OECD AI Principles'],
      status: 'active',
      score: 90,
      last_updated: '2026-06-15',
      owner: 'AI Governance Council'
    },
    {
      id: 'POL-004',
      title: 'Politique de Gouvernance',
      icon: 'ri-government-line',
      description: 'Structure de gouvernance, rôles, responsabilités, hiérarchie décisionnelle',
      content: 'Hiérarchie des normes : Constitution > Master Orchestrator > AI Governance Framework > Chartes d\'Agents > KOS (6 règles) > Procédures opérationnelles > Décisions individuelles. Le Virtual Board est l\'organe suprême. Le Master Orchestrator coordonne et valide. Chaque agent a un Partner humain responsable. Les décisions stratégiques requièrent 4 agents + Master Orchestrator + Virtual Board.',
      standards: ['COSO ERM 2017', 'COBIT 2019 EDM05', 'ISO 37000:2021'],
      status: 'active',
      score: 93,
      last_updated: '2026-06-15',
      owner: 'Managing Partner'
    },
    {
      id: 'POL-005',
      title: 'Politique de Sécurité',
      icon: 'ri-shield-check-line',
      description: 'IAM, MFA, RBAC, journalisation, sauvegardes, PRA/PCA, gestion des incidents',
      content: 'Sécurité niveau Big Four. IAM avec MFA obligatoire. RBAC : 5 niveaux (Admin, Partner, Manager, Consultant, Read-Only). Journalisation intégrale de toutes les actions. Sauvegardes quotidiennes avec rétention 90 jours. PRA/PCA documenté et testé semestriellement. Gestion des incidents : détection < 5 min, réponse < 30 min, résolution < 4h pour les incidents critiques. Classification documentaire : Public, Interne, Confidentiel, Secret.',
      standards: ['ISO 27001:2022', 'NIST CSF 2.0', 'SOC 2 Type II', 'RGPD'],
      status: 'active',
      score: 91,
      last_updated: '2026-06-15',
      owner: 'Enterprise Security Engine'
    },
    {
      id: 'POL-006',
      title: 'Politique Qualité',
      icon: 'ri-medal-line',
      description: 'Standards qualité Big Four, scoring 5 axes, seuil de publication 95/100',
      content: 'Matrice qualité 5 axes : Exactitude Réglementaire (25%), Conformité Institutionnelle (25%), Valeur Client (20%), Réutilisabilité (15%), Innovation (15%). Score global /100. Seuil de publication : ≥ 95/100 — bloqué en dessous. Quality Controller automatisé via edge function kos-quality-scorer. Revues trimestrielles des scores par type de livrable. Amélioration continue documentée.',
      standards: ['ISO 9001:2015 §9.1', 'Six Sigma DMAIC', 'ITIL 4 Continual Improvement'],
      status: 'active',
      score: 92,
      last_updated: '2026-06-15',
      owner: 'Quality Assurance Authority'
    },
    {
      id: 'POL-007',
      title: 'Politique Documentaire',
      icon: 'ri-file-text-line',
      description: 'Gestion du cycle de vie documentaire, templates, classification, archivage',
      content: 'Cycle de vie documentaire : Création → Review → Validation → Publication → Mise à jour → Archivage. Templates standardisés par type (Proposition, Rapport, Diagnostic, Formation, Article). Nomenclature : [TYPE]_[CLIENT]_[DATE]_v[VERSION]. Classification : Public / Interne / Confidentiel / Secret. Archivage : 10 ans pour les documents réglementaires, 5 ans pour les livrables clients, 3 ans pour les contenus marketing. Gestion des versions avec traçabilité complète.',
      standards: ['ISO 9001:2015 §7.5', 'ISO 15489-1:2016', 'COBIT 2019 BAI08'],
      status: 'active',
      score: 94,
      last_updated: '2026-06-15',
      owner: 'Knowledge & RAG Partner'
    },
    {
      id: 'POL-008',
      title: 'Politique de Gestion des Risques',
      icon: 'ri-alert-line',
      description: 'ERM, matrice de criticité, appétit au risque, contrôles, mitigation',
      content: 'Enterprise Risk Management aligné COSO ERM 2017. 5 catégories de risques : Réglementaire, Opérationnel, Financier, Réputationnel, Stratégique. Matrice de criticité 5×5 (Probabilité × Impact). Appétit au risque défini par le Virtual Board. Registre des risques mis à jour mensuellement. 8 risques majeurs suivis avec plans de mitigation. Tests de résilience semestriels. Score résiduel cible < 3/5 pour tous les risques.',
      standards: ['COSO ERM 2017', 'ISO 31000:2018', 'ISO 27005:2022', 'Bâle II/III'],
      status: 'active',
      score: 91,
      last_updated: '2026-06-15',
      owner: 'Enterprise Risk Engine'
    },
    {
      id: 'POL-009',
      title: 'Politique d\'Amélioration Continue',
      icon: 'ri-loop-left-line',
      description: 'Cycle PDCA, boucles d\'amélioration KOS, Self-Improvement Engine',
      content: 'Cycle PDCA continu : Plan (identification des gaps) → Do (déploiement des corrections) → Check (vérification des résultats) → Act (capitalisation et standardisation). 6 boucles d\'amélioration KOS : Qualité Propositions, Vitesse Due Diligence, Précision Jumeaux Numériques, Conversion Leads, Utilisation Consultants, Détection Hallucinations. Self-Improvement Engine v2 actif avec progression 45-85%. Revue mensuelle des indicateurs par le Virtual Board.',
      standards: ['ISO 9001:2015 §10', 'ITIL 4 CSI', 'Six Sigma DMAIC', 'Kaizen'],
      status: 'draft',
      score: 88,
      last_updated: '2026-06-16',
      owner: 'Self-Improvement Engine'
    },
    {
      id: 'POL-010',
      title: 'Politique de Conformité Réglementaire',
      icon: 'ri-book-2-line',
      description: 'Veille réglementaire, référentiels, conformité BCEAO/COBAC/OHADA/GAFI',
      content: 'Veille réglementaire continue sur 15 bibliothèques RAG (BCEAO, COBAC, BEAC, OHADA, GAFI, GIABA, GABAC, OCDE BEPS, RGPD, ISO, Bâle, CIMA, IFRS, ISSB, EU AI Act). 52 documents réglementaires indexés avec recherche sémantique TF-IDF. Alertes automatiques sur les nouveaux textes publiés. Conformité vérifiée pour chaque livrable via le Quality Controller. Mise à jour du RAG déclenchée à chaque nouveau texte réglementaire publié.',
      standards: ['BCEAO Circulaires', 'COBAC Règlements', 'OHADA Actes Uniformes', 'GAFI 40 Recommandations', 'OCDE BEPS Action 13'],
      status: 'active',
      score: 93,
      last_updated: '2026-06-15',
      owner: 'Regulatory Intelligence Engine'
    }
  ]
};