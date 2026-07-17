// KOS Regulatory Brain™ — Regulatory Text to Structured Rules Engine
// Big Four Compliance Intelligence System
// Converts: COBAC, BEAC, GABAC, LBC/FT texts → structured, executable compliance rules

export interface RegulatoryTextInput {
  id: string;
  source: string;
  autorite: string;
  titre: string;
  texte_brut: string;
  date_publication: string;
  reference_officielle: string;
  zone: 'CEMAC' | 'UEMOA' | 'International';
  type: 'reglement' | 'instruction' | 'circulaire' | 'directive' | 'loi';
}

export interface RegulationSummary {
  synthese: string;
  mots_cles: string[];
  articles_cles: string[];
  champ_application: string;
  entites_concernees: string[];
  date_entree_vigueur: string;
  delai_mise_conformite: string;
}

export interface Obligation {
  id: string;
  description: string;
  article_ref: string;
  criticite: 'critique' | 'eleve' | 'moyen';
  delai: string;
  preuve_requise: string;
  sanction_encourue: string;
}

export interface ControlMapping {
  id: string;
  obligation_ref: string;
  controle_type: 'preventif' | 'detectif' | 'correctif';
  description: string;
  frequence: string;
  responsable: string;
  outil: string;
  indicateur: string;
  seuil_alerte: string;
}

export interface NonComplianceRisk {
  risque: string;
  probabilite: 'elevee' | 'moyenne' | 'faible';
  impact_financier: string;
  impact_operationnel: string;
  impact_reputationnel: string;
  mitigation: string;
}

export interface N8nTrigger {
  id: string;
  workflow_name: string;
  trigger_type: 'cron' | 'webhook' | 'event';
  trigger_config: string;
  nodes: string[];
  frequency: string;
  output: string;
  failure_fallback: string;
}

export interface JsonSchema {
  schema_name: string;
  version: string;
  autorite: string;
  schema: Record<string, unknown>;
}

export interface ProcessedRegulation {
  input: RegulatoryTextInput;
  summary: RegulationSummary;
  obligations: Obligation[];
  control_mapping: ControlMapping[];
  risques: NonComplianceRisk[];
  n8n_triggers: N8nTrigger[];
  json_schema: JsonSchema;
  processing_metadata: {
    agent: string;
    processing_time_ms: number;
    confidence_score: number;
    verified_sources: string[];
    uncertain_elements: string[];
    last_updated: string;
  };
}

// ═══════════════════════════════════════════════════════
// PREDEFINED REGULATORY TEXT INPUTS
// ═══════════════════════════════════════════════════════

export const REGULATORY_TEXTS: RegulatoryTextInput[] = [
  {
    id: 'RT-001',
    source: 'COBAC — Journal Officiel CEMAC',
    autorite: 'COBAC',
    titre: 'Règlement COBAC R-2026/03 — Renforcement LBC/FT aligné GAFI 2026',
    texte_brut: `RÈGLEMENT N°R-2026/03 RELATIF AU RENFORCEMENT DU DISPOSITIF DE LUTTE CONTRE LE BLANCHIMENT DES CAPITAUX ET LE FINANCEMENT DU TERRORISME DANS LES ÉTABLISSEMENTS DE CRÉDIT DE LA CEMAC.

Article 1er : Le présent règlement intègre les 40 Recommandations révisées du GAFI de Février 2026 dans le corpus réglementaire CEMAC.

Article 4 : Tout établissement de crédit doit mettre en place un registre des bénéficiaires effectifs de ses clients dans un délai de six (6) mois à compter de la publication du présent règlement.

Article 7 : Les établissements assujettis doivent appliquer des mesures de vigilance renforcées pour les relations d'affaires impliquant des pays à haut risque identifiés par le GAFI, ainsi que pour les transactions impliquant des Actifs Virtuels (VASP).

Article 12 : Le responsable LBC/FT doit être un cadre dirigeant disposant d'un accès direct au Conseil d'Administration. Ses pouvoirs incluent le blocage immédiat de toute transaction suspecte sans autorisation préalable.

Article 15 : Les déclarations de soupçons doivent être transmises à la GABAC dans un délai maximal de quarante-huit (48) heures à compter de la détection de l'opération suspecte.

Article 19 : Toute infraction aux dispositions du présent règlement expose l'établissement à des sanctions pécuniaires pouvant atteindre 5% du chiffre d'affaires annuel, prononcées directement par la COBAC.

Article 22 : Les établissements doivent mettre en place un dispositif de classification des risques clients en trois (3) niveaux minimum. Cette classification doit être revue trimestriellement.

Article 25 : Un audit externe indépendant du dispositif LBC/FT doit être réalisé annuellement par un cabinet certifié GAFI.`,
    date_publication: '2026-06-08',
    reference_officielle: 'COBAC R-2026/03',
    zone: 'CEMAC',
    type: 'reglement',
  },
  {
    id: 'RT-002',
    source: 'BEAC — Instructions aux Établissements de Crédit',
    autorite: 'BEAC',
    titre: 'Instruction BEAC n°008-2026 — Gestion du Risque de Liquidité',
    texte_brut: `INSTRUCTION N°008-2026 RELATIVE À LA GESTION DU RISQUE DE LIQUIDITÉ DANS LES ÉTABLISSEMENTS DE CRÉDIT DE LA CEMAC.

Article 2 : Le coefficient de liquidité (LCR) minimum est fixé à 100%. Les établissements doivent maintenir un volant d'actifs liquides de haute qualité (HQLA) au moins égal aux sorties nettes de trésorerie projetées sur 30 jours.

Article 5 : Le ratio structurel de liquidité à long terme (NSFR) minimum est fixé à 100%. Il doit être calculé trimestriellement et transmis à la BEAC dans les 15 jours suivant la fin du trimestre.

Article 8 : Chaque établissement doit élaborer un Plan de Financement d'Urgence (PFU) documentant les sources de liquidité mobilisables en situation de crise. Le PFU doit être testé au moins annuellement via un exercice de simulation de crise.

Article 10 : Les établissements doivent mettre en place un système de suivi quotidien des indicateurs de liquidité incluant : concentration des dépôts, gap de maturité, ratio prêts/dépôts, coût de refinancement.

Article 14 : Le Conseil d'Administration doit fixer annuellement l'appétit au risque de liquidité de l'établissement, décliné en limites opérationnelles.

Article 18 : En cas de franchissement des seuils d'alerte, l'établissement doit notifier immédiatement la BEAC et activer le PFU sous 24 heures.

Article 21 : Les manquements aux dispositions de la présente instruction exposent l'établissement à des sanctions allant de l'avertissement à la mise sous administration provisoire.`,
    date_publication: '2026-04-22',
    reference_officielle: 'BEAC Instruction n°008-2026',
    zone: 'CEMAC',
    type: 'instruction',
  },
  {
    id: 'RT-003',
    source: 'GABAC — Règlement communautaire',
    autorite: 'GABAC',
    titre: 'Règlement GABAC n°01/2026 — Évaluation Nationale des Risques LBC/FT',
    texte_brut: `RÈGLEMENT N°01/2026 PORTANT OBLIGATION D'ÉVALUATION NATIONALE DES RISQUES DE BLANCHIMENT DE CAPITAUX ET DE FINANCEMENT DU TERRORISME.

Article 1er : Chaque État membre de la CEMAC doit réaliser une Évaluation Nationale des Risques (ENR) selon la méthodologie GAFI, au minimum tous les quatre (4) ans.

Article 3 : L'ENR doit couvrir au minimum : les menaces LBC/FT, les vulnérabilités sectorielles, l'efficacité du dispositif national, et les risques émergents incluant les actifs virtuels et les prestataires de services liés aux crypto-actifs.

Article 5 : Les résultats de l'ENR doivent être rendus publics dans un rapport accessible, à l'exception des informations classifiées.

Article 8 : Chaque autorité de supervision sectorielle doit adapter son plan de contrôle quinquennal en fonction des risques identifiés dans l'ENR.

Article 11 : Les assujettis doivent utiliser les conclusions de l'ENR pour calibrer leur propre classification des risques et ajuster leurs mesures de vigilance.

Article 14 : La GABAC assure le suivi de la mise en œuvre des recommandations issues de l'ENR via un tableau de bord trimestriel transmis au Conseil des Ministres.

Article 16 : Les États ne s'étant pas conformés à l'obligation d'ENR dans les délais impartis feront l'objet de mesures de suivi renforcé par la GABAC, pouvant inclure une déclaration publique de non-conformité.`,
    date_publication: '2026-03-15',
    reference_officielle: 'GABAC Règlement n°01/2026',
    zone: 'CEMAC',
    type: 'reglement',
  },
  {
    id: 'RT-004',
    source: 'COBAC — Règlement sur la Gouvernance',
    autorite: 'COBAC',
    titre: 'Règlement COBAC R-2025/07 — Gouvernance des Établissements de Crédit',
    texte_brut: `RÈGLEMENT N°R-2025/07 RELATIF À LA GOUVERNANCE DES ÉTABLISSEMENTS DE CRÉDIT DE LA CEMAC.

Article 3 : Le Conseil d'Administration doit être composé d'au moins un tiers (1/3) de membres indépendants. Les critères d'indépendance incluent : absence de relation d'affaires significative, absence de lien familial avec les dirigeants, mandat n'excédant pas 9 ans.

Article 5 : Quatre comités spécialisés sont obligatoires : Comité d'Audit, Comité des Risques, Comité de Rémunération, Comité de Conformité. Chaque comité doit être présidé par un administrateur indépendant.

Article 8 : Le dispositif de contrôle interne doit couvrir les risques opérationnels, financiers, de conformité et de réputation. Il doit être documenté dans un manuel revu annuellement.

Article 12 : La fonction de gestion des risques doit être indépendante des fonctions opérationnelles et disposer d'un accès direct au Conseil d'Administration.

Article 15 : Un rapport annuel sur le contrôle interne et la gestion des risques doit être présenté au Conseil d'Administration avant la publication des états financiers.

Article 19 : Les dirigeants responsables sont personnellement responsables des manquements graves à la gouvernance, pouvant entraîner des sanctions individuelles incluant l'interdiction d'exercer.`,
    date_publication: '2025-11-28',
    reference_officielle: 'COBAC R-2025/07',
    zone: 'CEMAC',
    type: 'reglement',
  },
];

// ═══════════════════════════════════════════════════════
// PROCESSED REGULATIONS — Full 6-output format
// ═══════════════════════════════════════════════════════

export const PROCESSED_REGULATIONS: ProcessedRegulation[] = [
  // ─── RT-001 : COBAC LBC/FT ───
  {
    input: REGULATORY_TEXTS[0],
    summary: {
      synthese: 'Le Règlement COBAC R-2026/03 transpose les 40 Recommandations GAFI 2026 dans le droit bancaire CEMAC. Il introduit des obligations structurantes : registre des bénéficiaires effectifs (Art.4), vigilance renforcée VASP (Art.7), déclaration soupçons 48h (Art.15), sanctions directes COBAC jusqu\'à 5% CA (Art.19), classification risques 3 niveaux (Art.22), audit externe annuel (Art.25). Le texte renforce significativement l\'arsenal répressif en autorisant la COBAC à sanctionner directement sans passer par l\'État.',
      mots_cles: ['LBC/FT', 'GAFI 2026', 'Bénéficiaires Effectifs', 'VASP', 'GABAC', 'Déclaration de Soupçons', 'Classification Risques', 'Sanctions COBAC'],
      articles_cles: ['Art.1 — Intégration GAFI', 'Art.4 — Registre BE (6 mois)', 'Art.7 — Vigilance VASP', 'Art.15 — Déclaration 48h', 'Art.19 — Sanctions 5% CA', 'Art.22 — Classification 3 niveaux', 'Art.25 — Audit externe annuel'],
      champ_application: 'Tous les établissements de crédit agréés dans la zone CEMAC (28 banques en 2026)',
      entites_concernees: ['Établissements de crédit', 'Responsables LBC/FT', 'Conseils d\'Administration', 'Cabinets d\'audit certifiés GAFI', 'GABAC (autorité de tutelle)'],
      date_entree_vigueur: '08 Juin 2026 (publication immédiate)',
      delai_mise_conformite: '12 mois (Art.4 : registre BE sous 6 mois, Art.22 : classification sous 3 mois, Art.25 : premier audit sous 12 mois)',
    },
    obligations: [
      { id: 'OBL-001-A', description: 'Mettre en place un registre des bénéficiaires effectifs de tous les clients', article_ref: 'Art.4', criticite: 'critique', delai: '6 mois (08/12/2026)', preuve_requise: 'Registre BE opérationnel, procédure de collecte documentée', sanction_encourue: 'Sanction pécuniaire COBAC jusqu\'à 5% CA + mise sous administration' },
      { id: 'OBL-001-B', description: 'Appliquer des mesures de vigilance renforcées aux pays à haut risque GAFI et aux transactions VASP', article_ref: 'Art.7', criticite: 'critique', delai: '3 mois (08/09/2026)', preuve_requise: 'Procédure VASP documentée, liste pays GAFI intégrée au KYC', sanction_encourue: 'Sanction pécuniaire + restriction d\'activité' },
      { id: 'OBL-001-C', description: 'Désigner un responsable LBC/FT cadre dirigeant avec accès direct au Conseil d\'Administration', article_ref: 'Art.12', criticite: 'critique', delai: '3 mois (08/09/2026)', preuve_requise: 'Lettre de nomination, fiche de poste, rattachement hiérarchique direct CA', sanction_encourue: 'Injonction COBAC avec astreinte journalière' },
      { id: 'OBL-001-D', description: 'Transmettre les déclarations de soupçons à la GABAC sous 48h maximum', article_ref: 'Art.15', criticite: 'critique', delai: 'Immédiat', preuve_requise: 'Procédure DS documentée, système de détection automatisé, log des transmissions', sanction_encourue: 'Sanction pécuniaire + poursuites individuelles dirigeants' },
      { id: 'OBL-001-E', description: 'Mettre en place une classification des risques clients à 3 niveaux minimum, revue trimestriellement', article_ref: 'Art.22', criticite: 'eleve', delai: '3 mois (08/09/2026)', preuve_requise: 'Matrice de classification documentée, rapport trimestriel de revue', sanction_encourue: 'Avertissement + obligation de mise en conformité sous astreinte' },
      { id: 'OBL-001-F', description: 'Réaliser un audit externe indépendant annuel du dispositif LBC/FT par un cabinet certifié GAFI', article_ref: 'Art.25', criticite: 'eleve', delai: '12 mois (08/06/2027)', preuve_requise: 'Rapport d\'audit externe annuel, certification GAFI du cabinet auditeur', sanction_encourue: 'Injonction + publication du nom de l\'établissement non conforme' },
    ],
    control_mapping: [
      { id: 'CTL-001-A', obligation_ref: 'OBL-001-A', controle_type: 'detectif', description: 'Rapprochement trimestriel registre BE vs base clients : vérifier que 100% des clients actifs ont un BE documenté', frequence: 'Trimestrielle', responsable: 'Responsable LBC/FT', outil: 'Outil de gestion BE + extraction CRM', indicateur: 'Taux de couverture BE = Clients avec BE / Total clients actifs', seuil_alerte: '< 95% → alerte niveau 2 ; < 80% → alerte niveau 1 critique' },
      { id: 'CTL-001-B', obligation_ref: 'OBL-001-B', controle_type: 'preventif', description: 'Blocage automatique des virements vers pays GAFI haut risque sans validation LBC/FT préalable', frequence: 'Temps réel (chaque transaction)', responsable: 'DSI / Resp. LBC/FT', outil: 'Moteur de filtrage transactions (Sanction Screening)', indicateur: 'Nb transactions bloquées / Nb transactions totales vers pays HR', seuil_alerte: '> 0 transaction non filtrée → alerte critique immédiate' },
      { id: 'CTL-001-C', obligation_ref: 'OBL-001-C', controle_type: 'preventif', description: 'Vérification annuelle de l\'indépendance hiérarchique du responsable LBC/FT : reporting direct CA documenté', frequence: 'Annuelle', responsable: 'Comité de Nomination / CA', outil: 'Revue documentaire (organigramme, CR CA)', indicateur: 'Respect critères Art.12 (oui/non)', seuil_alerte: 'Non → non-conformité immédiate' },
      { id: 'CTL-001-D', obligation_ref: 'OBL-001-D', controle_type: 'detectif', description: 'Monitoring quotidien du délai entre détection alerte et transmission DS à GABAC', frequence: 'Quotidienne', responsable: 'Responsable LBC/FT', outil: 'Système de case management LBC/FT', indicateur: 'Délai moyen détection → transmission (heures)', seuil_alerte: '> 24h → alerte niveau 1 ; > 48h → non-conformité critique' },
      { id: 'CTL-001-E', obligation_ref: 'OBL-001-E', controle_type: 'detectif', description: 'Contrôle trimestriel de cohérence : vérifier que tous les clients ont un niveau de risque attribué et que la distribution est cohérente', frequence: 'Trimestrielle', responsable: 'Responsable LBC/FT', outil: 'Module scoring LBC/FT + rapport distribution', indicateur: '% clients classifiés ; distribution Risque Élevé/Moyen/Faible', seuil_alerte: '< 100% clients classifiés → non-conformité' },
      { id: 'CTL-001-F', obligation_ref: 'OBL-001-F', controle_type: 'correctif', description: 'Suivi post-audit : chaque recommandation de l\'auditeur externe doit avoir un plan d\'action avec responsable et échéance', frequence: 'Semestrielle (à mi-parcours entre 2 audits)', responsable: 'Comité d\'Audit', outil: 'Outil de suivi des recommandations d\'audit', indicateur: '% recommandations implémentées dans les délais', seuil_alerte: '< 75% → alerte CA ; < 50% → escalade COBAC' },
    ],
    risques: [
      { risque: 'Non-conformité au registre BE (Art.4)', probabilite: 'moyenne', impact_financier: 'Amende 500M - 2.5 Md FCFA (5% CA)', impact_operationnel: 'Mise sous administration provisoire', impact_reputationnel: 'Inscription liste noire GAFI → perte correspondants bancaires internationaux', mitigation: 'Déploiement solution digitale BE + campagne collecte accélérée 6 mois' },
      { risque: 'Absence de filtrage VASP (Art.7)', probabilite: 'elevee', impact_financier: 'Amende 200M - 1 Md FCFA', impact_operationnel: 'Restriction des opérations internationales', impact_reputationnel: 'Risque d\'être identifié comme \"facilitateur\" de blanchiment crypto', mitigation: 'Intégration solution blockchain analytics (Chainalysis/Elliptic) dans le moteur de filtrage' },
      { risque: 'Dépassement délai DS 48h (Art.15)', probabilite: 'faible', impact_financier: 'Sanction individuelle dirigeant (interdiction d\'exercer)', impact_operationnel: 'Blocage décisionnel si responsable LBC/FT pas accessible', impact_reputationnel: 'Signalement GABAC public → perte de confiance régulateur', mitigation: 'Système d\'escalade automatique + back-up responsable LBC/FT désigné' },
    ],
    n8n_triggers: [
      { id: 'N8N-001-A', workflow_name: 'LBC-FT-Beneficial-Owner-Verification', trigger_type: 'cron', trigger_config: '0 2 * * * (quotidien 02:00 UTC)', nodes: ['PostgreSQL → Extract New Clients', 'HTTP Request → Sanctions List API', 'IF → BE Missing?', 'Email → Send BE Collection Request', 'PostgreSQL → Update BE Status'], frequency: 'Quotidien', output: 'Liste clients sans BE → email automatique chargé de conformité', failure_fallback: 'Si API sanctions down → retry 3x exponential backoff → escalate to Slack' },
      { id: 'N8N-001-B', workflow_name: 'LBC-FT-Transaction-Screening', trigger_type: 'event', trigger_config: 'Webhook POST /api/lbcft/screen-transaction', nodes: ['Webhook → Receive Transaction', 'Switch → Check Amount Threshold', 'HTTP Request → Sanctions Screening API', 'IF → Match Found?', 'PostgreSQL → Log & Block Transaction', 'Email → Alert Compliance Officer'], frequency: 'Temps réel (chaque transaction)', output: 'Transaction bloquée si match sanctions → alerte immédiate compliance', failure_fallback: 'Si screening API down → block transaction by default (conservative) + alert ops' },
      { id: 'N8N-001-C', workflow_name: 'LBC-FT-Quarterly-Risk-Review', trigger_type: 'cron', trigger_config: '0 3 1 */3 * (1er jour de chaque trimestre 03:00 UTC)', nodes: ['PostgreSQL → Extract All Clients', 'Function → Recalculate Risk Score', 'PostgreSQL → Update Risk Levels', 'Function → Generate Distribution Report', 'Email → Send Report to CA'], frequency: 'Trimestriel', output: 'Rapport classification risques → Conseil d\'Administration', failure_fallback: 'Retry manuel avec bouton "Regenerate Report" dans le dashboard' },
      { id: 'N8N-001-D', workflow_name: 'LBC-FT-Audit-Recommendation-Tracker', trigger_type: 'cron', trigger_config: '0 8 * * 1 (chaque lundi 08:00 UTC)', nodes: ['PostgreSQL → Extract Open Audit Recommendations', 'Function → Calculate Overdue', 'IF → Any Overdue?', 'Email → Alert Audit Committee', 'Slack → Send Summary'], frequency: 'Hebdomadaire', output: 'Rapport hebdo : recommandations en retard → Comité d\'Audit', failure_fallback: 'Stale data OK (last successful run displayed with warning banner)' },
    ],
    json_schema: {
      schema_name: 'cobac_lbcft_compliance',
      version: '1.0.0',
      autorite: 'COBAC',
      schema: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'COBAC LBC/FT Compliance Record',
        type: 'object',
        required: ['establishment_id', 'beneficial_owners', 'risk_classification', 'audit_trail'],
        properties: {
          establishment_id: { type: 'string', description: 'Identifiant COBAC de l\'établissement', pattern: '^[A-Z]{2}[0-9]{6}$' },
          beneficial_owners: {
            type: 'array',
            items: {
              type: 'object',
              required: ['client_id', 'full_name', 'nationality', 'ownership_pct', 'verified_at'],
              properties: {
                client_id: { type: 'string' },
                full_name: { type: 'string' },
                nationality: { type: 'string', pattern: '^[A-Z]{2}$' },
                ownership_pct: { type: 'number', minimum: 0, maximum: 100 },
                pep_status: { type: 'boolean' },
                sanctions_match: { type: 'boolean' },
                verified_at: { type: 'string', format: 'date-time' },
                verification_method: { type: 'string', enum: ['documentary', 'electronic', 'third_party', 'declarative'] },
              },
            },
          },
          risk_classification: {
            type: 'object',
            required: ['level', 'review_date', 'factors'],
            properties: {
              level: { type: 'string', enum: ['faible', 'moyen', 'eleve'] },
              review_date: { type: 'string', format: 'date' },
              factors: { type: 'array', items: { type: 'string' } },
              next_review_date: { type: 'string', format: 'date' },
            },
          },
          suspicious_transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                transaction_id: { type: 'string' },
                detection_date: { type: 'string', format: 'date-time' },
                reporting_date: { type: 'string', format: 'date-time' },
                amount_fcfa: { type: 'number' },
                reason_code: { type: 'string' },
                reported_to_gabac: { type: 'boolean' },
              },
            },
          },
          audit_trail: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                audit_date: { type: 'string', format: 'date' },
                auditor_name: { type: 'string' },
                auditor_gafi_certification: { type: 'string' },
                findings_count: { type: 'integer' },
                critical_findings: { type: 'integer' },
                report_reference: { type: 'string' },
              },
            },
          },
        },
      },
    },
    processing_metadata: {
      agent: 'KOS Regulatory Brain™ — COBAC LBC/FT Parser v2.1',
      processing_time_ms: 847,
      confidence_score: 97.5,
      verified_sources: ['Journal Officiel CEMAC', 'Site Officiel COBAC — sgcobac.com', 'GAFI 40 Recommandations Révisées Février 2026'],
      uncertain_elements: ['UNKNOWN / NEED SOURCE — Date exacte d\'entrée en vigueur des dispositions Art.19 (sanctions directes) : à confirmer auprès du Secrétariat COBAC'],
      last_updated: '2026-06-24T10:00:00Z',
    },
  },

  // ─── RT-002 : BEAC Liquidité ───
  {
    input: REGULATORY_TEXTS[1],
    summary: {
      synthese: 'L\'Instruction BEAC n°008-2026 fixe les exigences de gestion du risque de liquidité pour les banques CEMAC. Elle impose le LCR ≥ 100% (Art.2), le NSFR ≥ 100% (Art.5), un Plan de Financement d\'Urgence testé annuellement (Art.8), un suivi quotidien des indicateurs (Art.10), et une notification immédiate à la BEAC en cas de franchissement des seuils (Art.18). Le Conseil d\'Administration est explicitement responsable de la fixation de l\'appétit au risque (Art.14).',
      mots_cles: ['LCR', 'NSFR', 'HQLA', 'Plan de Financement d\'Urgence', 'Risque de Liquidité', 'BEAC', 'Bâle III CEMAC'],
      articles_cles: ['Art.2 — LCR ≥ 100%', 'Art.5 — NSFR ≥ 100%', 'Art.8 — PFU testé annuellement', 'Art.10 — Suivi quotidien indicateurs', 'Art.14 — Appétit au risque CA', 'Art.18 — Notification immédiate BEAC'],
      champ_application: 'Tous les établissements de crédit agréés CEMAC',
      entites_concernees: ['Établissements de crédit', 'Trésoriers', 'ALM Managers', 'Conseils d\'Administration', 'BEAC (superviseur)'],
      date_entree_vigueur: '22 Avril 2026',
      delai_mise_conformite: '6 mois pour conformité complète (22/10/2026), PFU sous 3 mois (22/07/2026)',
    },
    obligations: [
      { id: 'OBL-002-A', description: 'Maintenir un ratio LCR ≥ 100% en permanence, avec volant HQLA couvrant les sorties nettes 30 jours', article_ref: 'Art.2', criticite: 'critique', delai: 'Immédiat et permanent', preuve_requise: 'Reporting LCR mensuel BEAC, calcul quotidien interne', sanction_encourue: 'Mise sous administration provisoire (Art.21)' },
      { id: 'OBL-002-B', description: 'Maintenir un ratio NSFR ≥ 100% et le transmettre trimestriellement à la BEAC sous 15 jours', article_ref: 'Art.5', criticite: 'critique', delai: 'Trimestriel (premier reporting 15/07/2026)', preuve_requise: 'Déclaration NSFR trimestrielle format BEAC', sanction_encourue: 'Avertissement → Astreinte → Administration provisoire' },
      { id: 'OBL-002-C', description: 'Élaborer et tester annuellement un Plan de Financement d\'Urgence documentant les sources de liquidité mobilisables', article_ref: 'Art.8', criticite: 'eleve', delai: '3 mois pour PFU initial (22/07/2026)', preuve_requise: 'Document PFU, rapport de test annuel, CR de restitution CA', sanction_encourue: 'Injonction BEAC avec plan de remédiation obligatoire' },
      { id: 'OBL-002-D', description: 'Mettre en place un suivi quotidien des indicateurs de liquidité : concentration dépôts, gap maturité, ratio prêts/dépôts, coût refinancement', article_ref: 'Art.10', criticite: 'eleve', delai: '2 mois (22/06/2026)', preuve_requise: 'Tableau de bord liquidité quotidien automatisé', sanction_encourue: 'Demande d\'explication + audit ciblé BEAC' },
      { id: 'OBL-002-E', description: 'Le Conseil d\'Administration doit fixer annuellement l\'appétit au risque de liquidité avec limites opérationnelles', article_ref: 'Art.14', criticite: 'eleve', delai: 'Avant fin exercice 2026', preuve_requise: 'PV CA avec résolution appétit au risque, document cadre de limites', sanction_encourue: 'Responsabilité personnelle des administrateurs' },
      { id: 'OBL-002-F', description: 'Notifier immédiatement la BEAC et activer le PFU sous 24h en cas de franchissement des seuils d\'alerte', article_ref: 'Art.18', criticite: 'critique', delai: 'Immédiat (< 1h pour notification, < 24h pour activation PFU)', preuve_requise: 'Procédure d\'escalade documentée, log des notifications BEAC', sanction_encourue: 'Mise sous administration provisoire immédiate' },
    ],
    control_mapping: [
      { id: 'CTL-002-A', obligation_ref: 'OBL-002-A', controle_type: 'detectif', description: 'Suivi LCR quotidien automatisé avec projection 30 jours glissants. Comparaison HQLA disponibles vs sorties nettes projetées.', frequence: 'Quotidienne', responsable: 'ALM / Trésorerie', outil: 'Module ALM (Moody\'s/Kyriba/Excel avancé)', indicateur: 'LCR actuel + LCR projeté J+30', seuil_alerte: 'LCR < 110% → alerte Trésorier ; LCR < 105% → alerte DG ; LCR < 100% → notification BEAC' },
      { id: 'CTL-002-B', obligation_ref: 'OBL-002-B', controle_type: 'detectif', description: 'Calcul NSFR trimestriel avec extraction des données de bilan réglementaire et vérification cohérence avant transmission BEAC', frequence: 'Trimestrielle', responsable: 'Direction Financière / ALM', outil: 'Module NSFR + rapprochement bilan', indicateur: 'NSFR actuel', seuil_alerte: 'NSFR < 105% → plan d\'action ; NSFR < 100% → notification BEAC' },
      { id: 'CTL-002-C', obligation_ref: 'OBL-002-C', controle_type: 'preventif', description: 'Test annuel PFU : simulation de 3 scénarios (spécifique, systémique, combiné), vérification que les sources de liquidité sont effectivement mobilisables', frequence: 'Annuelle', responsable: 'ALM / Risk Manager', outil: 'Simulateur de crise de liquidité', indicateur: 'Délai de mobilisation effectif vs délai théorique PFU', seuil_alerte: 'Écart > 50% → révision PFU obligatoire' },
      { id: 'CTL-002-D', obligation_ref: 'OBL-002-D', controle_type: 'detectif', description: 'Dashboard liquidité quotidien : 5 indicateurs clés avec seuils et code couleur (vert/orange/rouge)', frequence: 'Quotidienne', responsable: 'Trésorerie', outil: 'Dashboard BI liquidité (PowerBI/Tableau interne)', indicateur: 'Concentration Top 10 déposants, Gap 1-30j, Loan-to-Deposit ratio', seuil_alerte: 'Variable par indicateur — défini dans le cadre d\'appétit au risque' },
      { id: 'CTL-002-E', obligation_ref: 'OBL-002-E', controle_type: 'preventif', description: 'Revue annuelle CA : présentation du cadre ALM, validation des limites, documentation de l\'appétit au risque', frequence: 'Annuelle', responsable: 'Conseil d\'Administration / DG', outil: 'Rapport ALM annuel + PV CA', indicateur: 'Existence PV CA avec résolution (oui/non)', seuil_alerte: 'Non → non-conformité immédiate' },
      { id: 'CTL-002-F', obligation_ref: 'OBL-002-F', controle_type: 'correctif', description: 'Système d\'alerte automatique : si LCR < 100% → notification BEAC automatique + convocation cellule de crise sous 2h + activation PFU sous 24h', frequence: 'Temps réel (trigger)', responsable: 'DG / ALM / Trésorier', outil: 'Système d\'alerting temps réel + procédure d\'escalade', indicateur: 'Délai notification BEAC (cible < 1h)', seuil_alerte: '> 1h sans notification → escalade COBAC' },
    ],
    risques: [
      { risque: 'LCR < 100% non détecté à temps', probabilite: 'faible', impact_financier: 'Crise de liquidité → pertes 5-20 Md FCFA', impact_operationnel: 'Mise sous administration provisoire BEAC', impact_reputationnel: 'Run bancaire → perte de confiance déposants', mitigation: 'Monitoring LCR quotidien automatisé + alertes multi-niveaux' },
      { risque: 'PFU non testé ou sources de liquidité surestimées', probabilite: 'moyenne', impact_financier: 'Défaut de paiement en situation de crise → coût refinancement d\'urgence +500bps', impact_operationnel: 'Impossibilité d\'honorer les retraits', impact_reputationnel: 'Intervention forcée BEAC → perte de crédibilité définitive', mitigation: 'Test PFU avec scénarios adverses réalistes + validation externe' },
      { risque: 'NSFR structurellement < 100%', probabilite: 'moyenne', impact_financier: 'Coût de restructuration du bilan 2-10 Md FCFA', impact_operationnel: 'Restriction des activités de transformation', impact_reputationnel: 'Dégradation notation → hausse coût refinancement permanent', mitigation: 'Plan de convergence NSFR sur 12 mois avec jalons trimestriels' },
    ],
    n8n_triggers: [
      { id: 'N8N-002-A', workflow_name: 'BEAC-Liquidity-Daily-Monitor', trigger_type: 'cron', trigger_config: '0 7 * * * (quotidien 07:00 UTC)', nodes: ['PostgreSQL → Extract Daily Positions', 'Function → Calculate LCR/NSFR/Gaps', 'IF → Any Threshold Breached?', 'Email → Alert Treasury (Level 1)', 'IF → Critical Breach?', 'HTTP Request → POST to BEAC API'], frequency: 'Quotidien', output: 'Dashboard liquidité quotidien + alertes si seuils franchis', failure_fallback: 'Retry 3x → escalate to SMS alert Treasury Director' },
      { id: 'N8N-002-B', workflow_name: 'BEAC-NSFR-Quarterly-Report', trigger_type: 'cron', trigger_config: '0 2 10 */3 * (10ème jour de chaque trimestre 02:00 UTC)', nodes: ['PostgreSQL → Extract Balance Sheet', 'Function → Compute NSFR Components', 'Function → Generate BEAC XML Report', 'HTTP Request → Submit to BEAC Portal', 'Email → Confirm Submission'], frequency: 'Trimestriel', output: 'Rapport NSFR format BEAC transmis automatiquement', failure_fallback: 'Retry 3x → manual submission alert to CFO' },
      { id: 'N8N-002-C', workflow_name: 'BEAC-PFU-Annual-Test', trigger_type: 'cron', trigger_config: '0 6 1 6 * (1er Juin 06:00 UTC)', nodes: ['Function → Load 3 Crisis Scenarios', 'Function → Simulate Liquidity Drain', 'PostgreSQL → Store Test Results', 'Function → Compare Actual vs Theoretical', 'Email → Send Test Report to CA'], frequency: 'Annuel', output: 'Rapport de test PFU → Conseil d\'Administration', failure_fallback: 'Manual test trigger button in dashboard + historical results available' },
    ],
    json_schema: {
      schema_name: 'beac_liquidity_risk',
      version: '1.0.0',
      autorite: 'BEAC',
      schema: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'BEAC Liquidity Risk Reporting',
        type: 'object',
        required: ['establishment_id', 'reporting_date', 'lcr', 'nsfr'],
        properties: {
          establishment_id: { type: 'string' },
          reporting_date: { type: 'string', format: 'date' },
          lcr: {
            type: 'object',
            properties: {
              total_hqla: { type: 'number', description: 'Total HQLA en millions FCFA' },
              net_outflows_30d: { type: 'number', description: 'Sorties nettes projetées 30 jours en millions FCFA' },
              ratio_pct: { type: 'number', minimum: 0, description: 'Ratio LCR en %' },
              hqla_breakdown: {
                type: 'object',
                properties: {
                  level_1: { type: 'number' },
                  level_2a: { type: 'number' },
                  level_2b: { type: 'number' },
                },
              },
            },
          },
          nsfr: {
            type: 'object',
            properties: {
              available_stable_funding: { type: 'number' },
              required_stable_funding: { type: 'number' },
              ratio_pct: { type: 'number' },
            },
          },
          daily_indicators: {
            type: 'object',
            properties: {
              deposit_concentration_top10_pct: { type: 'number' },
              maturity_gap_1_30d_millions: { type: 'number' },
              loan_to_deposit_ratio_pct: { type: 'number' },
              refinancing_cost_bps: { type: 'number' },
            },
          },
          pfu_status: {
            type: 'object',
            properties: {
              last_test_date: { type: 'string', format: 'date' },
              test_scenarios_completed: { type: 'integer' },
              liquidity_sources_verified: { type: 'integer' },
              mobilization_time_max_minutes: { type: 'integer' },
            },
          },
        },
      },
    },
    processing_metadata: {
      agent: 'KOS Regulatory Brain™ — BEAC Liquidity Parser v1.8',
      processing_time_ms: 612,
      confidence_score: 99.2,
      verified_sources: ['BEAC — Site Officiel beac.int', 'Instruction BEAC n°008-2026 — Journal Officiel CEMAC'],
      uncertain_elements: [],
      last_updated: '2026-06-24T10:02:00Z',
    },
  },

  // ─── RT-003 : GABAC ENR ───
  {
    input: REGULATORY_TEXTS[2],
    summary: {
      synthese: 'Le Règlement GABAC n°01/2026 impose à chaque État CEMAC de réaliser une Évaluation Nationale des Risques (ENR) LBC/FT selon la méthodologie GAFI tous les 4 ans (Art.1). L\'ENR couvre menaces, vulnérabilités sectorielles, dispositif national, et risques émergents incluant crypto-actifs (Art.3). Les résultats sont publics (Art.5). Les superviseurs sectoriels adaptent leur plan de contrôle (Art.8). Les assujettis calibrent leur classification risques sur l\'ENR (Art.11).',
      mots_cles: ['Évaluation Nationale des Risques', 'ENR', 'GABAC', 'GAFI', 'Crypto-actifs', 'Plan de Contrôle', 'Classification Risques'],
      articles_cles: ['Art.1 — ENR tous les 4 ans', 'Art.3 — Périmètre minimum ENR', 'Art.5 — Publication publique', 'Art.8 — Adaptation plan de contrôle', 'Art.11 — Calibration classification assujettis'],
      champ_application: 'Les 6 États membres de la CEMAC et leurs autorités de supervision sectorielles',
      entites_concernees: ['États CEMAC', 'Cellules Nationales de Traitement des Informations Financières', 'Superviseurs sectoriels (COBAC, etc.)', 'GABAC', 'Assujettis LBC/FT'],
      date_entree_vigueur: '15 Mars 2026',
      delai_mise_conformite: 'Prochaine ENR dans les 4 ans de la dernière ENR de chaque État',
    },
    obligations: [
      { id: 'OBL-003-A', description: 'Réaliser une Évaluation Nationale des Risques (ENR) LBC/FT selon la méthodologie GAFI', article_ref: 'Art.1', criticite: 'critique', delai: 'Tous les 4 ans (prochaine ENR selon calendrier État)', preuve_requise: 'Rapport ENR complet + matrice des risques + plan d\'action', sanction_encourue: 'Déclaration publique de non-conformité GABAC (Art.16)' },
      { id: 'OBL-003-B', description: 'Couvrir au minimum dans l\'ENR : menaces, vulnérabilités sectorielles, efficacité dispositif, risques émergents (crypto-actifs)', article_ref: 'Art.3', criticite: 'critique', delai: 'Lors de chaque cycle ENR', preuve_requise: 'Rapport couvrant les 4 domaines minimum, avec section crypto-actifs', sanction_encourue: 'ENR jugée incomplète = non conforme' },
      { id: 'OBL-003-C', description: 'Publier les résultats de l\'ENR dans un rapport public accessible', article_ref: 'Art.5', criticite: 'eleve', delai: 'Dans les 6 mois suivant la finalisation ENR', preuve_requise: 'Rapport public publié sur site officiel + communiqué', sanction_encourue: 'Déclaration de non-transparence GABAC' },
      { id: 'OBL-003-D', description: 'Adapter le plan de contrôle quinquennal en fonction des risques identifiés dans l\'ENR', article_ref: 'Art.8', criticite: 'eleve', delai: 'Dans les 6 mois suivant la publication ENR', preuve_requise: 'Plan de contrôle révisé avec traçabilité ENR → priorités de contrôle', sanction_encourue: 'Revue par les pairs GAFI/GABAC négative' },
    ],
    control_mapping: [
      { id: 'CTL-003-A', obligation_ref: 'OBL-003-A', controle_type: 'preventif', description: 'Calendrier ENR : vérifier que chaque État a planifié son ENR dans le délai de 4 ans et que les ressources sont allouées', frequence: 'Annuelle (suivi GABAC)', responsable: 'Cellule Nationale LBC/FT', outil: 'Outil de suivi GABAC — Tableau de bord ENR', indicateur: 'Jours restants avant échéance ENR', seuil_alerte: '< 12 mois sans lancement → alerte GABAC niveau 1' },
      { id: 'CTL-003-B', obligation_ref: 'OBL-003-B', controle_type: 'detectif', description: 'Revue qualité ENR : vérifier que les 4 domaines minimum sont couverts avec profondeur suffisante', frequence: 'À chaque cycle ENR', responsable: 'GABAC — Comité de Revue', outil: 'Checklist qualité ENR GABAC', indicateur: 'Score qualité ENR (/100)', seuil_alerte: '< 70/100 → demande de compléments' },
      { id: 'CTL-003-C', obligation_ref: 'OBL-003-C', controle_type: 'detectif', description: 'Vérification publication : l\'ENR est-elle publiquement accessible sur le site de la Cellule Nationale ?', frequence: 'Semestrielle', responsable: 'GABAC — Monitoring', outil: 'Web scraper + vérification manuelle', indicateur: 'ENR publiée (oui/non)', seuil_alerte: 'Non → alerte transparence' },
      { id: 'CTL-003-D', obligation_ref: 'OBL-003-D', controle_type: 'correctif', description: 'Mapping ENR → Plan de contrôle : chaque risque élevé identifié dans l\'ENR doit avoir au moins 2 actions de contrôle programmées', frequence: 'Annuelle', responsable: 'Superviseur sectoriel', outil: 'Matrice de correspondance ENR / Plan de contrôle', indicateur: 'Taux de couverture = Risques ENR avec actions / Total risques ENR', seuil_alerte: '< 80% → plan de contrôle non aligné' },
    ],
    risques: [
      { risque: 'ENR non réalisée dans le délai de 4 ans', probabilite: 'moyenne', impact_financier: 'Gel des programmes d\'assistance technique internationaux', impact_operationnel: 'Suivi renforcé GABAC avec missions trimestrielles', impact_reputationnel: 'Déclaration publique de non-conformité → liste grise GAFI', mitigation: 'Planification ENR avec 12 mois d\'avance, allocation budgétaire dédiée' },
      { risque: 'ENR incomplète (absence volet crypto-actifs)', probabilite: 'elevee', impact_financier: 'Non-prise en compte des risques VASP → exposition non maîtrisée', impact_operationnel: 'Plan de contrôle sectoriel lacunaire', impact_reputationnel: 'Mauvaise évaluation GAFI → risque de downgrade pays', mitigation: 'Inclure systématiquement le volet crypto-actifs dans les TDR ENR' },
    ],
    n8n_triggers: [
      { id: 'N8N-003-A', workflow_name: 'GABAC-ENR-Deadline-Tracker', trigger_type: 'cron', trigger_config: '0 8 1 */6 * (1er jour de chaque semestre 08:00 UTC)', nodes: ['PostgreSQL → Extract ENR Deadlines per Country', 'Function → Calculate Days Remaining', 'IF → < 365 days?', 'Email → Alert National Cell + GABAC', 'IF → < 180 days?', 'Slack → Critical Alert'], frequency: 'Semestriel', output: 'Alerte précoce États approchant l\'échéance ENR', failure_fallback: 'Manual tracking fallback with GABAC dashboard' },
      { id: 'N8N-003-B', workflow_name: 'GABAC-ENR-Publication-Check', trigger_type: 'cron', trigger_config: '0 4 * * 1 (chaque lundi 04:00 UTC)', nodes: ['HTTP Request → Scrape National Cell Websites', 'Function → Check for ENR Publication', 'IF → New Publication?', 'PostgreSQL → Log Publication', 'Email → Notify GABAC Secretariat'], frequency: 'Hebdomadaire', output: 'Notification automatique quand une ENR est publiée', failure_fallback: 'Manual check queue in GABAC dashboard' },
    ],
    json_schema: {
      schema_name: 'gabac_enr_tracker',
      version: '1.0.0',
      autorite: 'GABAC',
      schema: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'GABAC National Risk Assessment Tracker',
        type: 'object',
        required: ['country_code', 'last_enr_date', 'next_enr_deadline'],
        properties: {
          country_code: { type: 'string', pattern: '^[A-Z]{2}$' },
          last_enr_date: { type: 'string', format: 'date' },
          next_enr_deadline: { type: 'string', format: 'date' },
          enr_status: { type: 'string', enum: ['completed', 'in_progress', 'planned', 'overdue'] },
          enr_public_url: { type: 'string', format: 'uri' },
          coverage_areas: {
            type: 'array',
            items: { type: 'string', enum: ['threats', 'vulnerabilities', 'effectiveness', 'emerging_risks', 'virtual_assets'] },
          },
          identified_high_risks: { type: 'integer' },
          supervisory_plan_aligned: { type: 'boolean' },
        },
      },
    },
    processing_metadata: {
      agent: 'KOS Regulatory Brain™ — GABAC ENR Parser v1.2',
      processing_time_ms: 523,
      confidence_score: 98.8,
      verified_sources: ['GABAC — Site Officiel', 'Règlement GABAC n°01/2026', 'Guide Méthodologique ENR GAFI 2023'],
      uncertain_elements: ['UNKNOWN / NEED SOURCE — Calendrier exact des ENR par État membre (dernière ENR de chaque pays non disponible publiquement)'],
      last_updated: '2026-06-24T10:04:00Z',
    },
  },

  // ─── RT-004 : COBAC Gouvernance ───
  {
    input: REGULATORY_TEXTS[3],
    summary: {
      synthese: 'Le Règlement COBAC R-2025/07 impose un cadre de gouvernance renforcé pour les banques CEMAC : 1/3 d\'administrateurs indépendants minimum (Art.3), 4 comités spécialisés obligatoires présidés par des indépendants (Art.5), dispositif de contrôle interne couvrant tous les risques et revu annuellement (Art.8), fonction risques indépendante avec accès direct CA (Art.12), rapport annuel contrôle interne avant états financiers (Art.15), responsabilité personnelle des dirigeants (Art.19).',
      mots_cles: ['Gouvernance', 'Administrateurs Indépendants', 'Comités Spécialisés', 'Contrôle Interne', 'COBAC', 'Responsabilité Personnelle'],
      articles_cles: ['Art.3 — 1/3 administrateurs indépendants', 'Art.5 — 4 comités obligatoires', 'Art.8 — Contrôle interne documenté', 'Art.12 — Indépendance fonction risques', 'Art.15 — Rapport annuel CI', 'Art.19 — Sanctions individuelles dirigeants'],
      champ_application: 'Tous les établissements de crédit CEMAC (28 banques)',
      entites_concernees: ['Conseils d\'Administration', 'Comités (Audit, Risques, Rémunération, Conformité)', 'Direction Générale', 'Fonction Risques', 'Audit Interne'],
      date_entree_vigueur: '28 Novembre 2025',
      delai_mise_conformite: '18 mois pour composition CA (28/05/2027), 6 mois pour comités (28/05/2026), 3 mois pour manuel CI (28/02/2026)',
    },
    obligations: [
      { id: 'OBL-004-A', description: 'Composer le Conseil d\'Administration d\'au moins 1/3 de membres indépendants selon les critères COBAC', article_ref: 'Art.3', criticite: 'critique', delai: '18 mois (28/05/2027)', preuve_requise: 'Déclaration d\'indépendance signée par chaque administrateur, analyse des critères', sanction_encourue: 'Injonction + astreinte + interdiction d\'exercer pour les administrateurs non conformes' },
      { id: 'OBL-004-B', description: 'Créer 4 comités obligatoires (Audit, Risques, Rémunération, Conformité) présidés par des administrateurs indépendants', article_ref: 'Art.5', criticite: 'critique', delai: '6 mois (28/05/2026)', preuve_requise: 'Chartes de comités signées, PV de constitution, désignation des présidents indépendants', sanction_encourue: 'Injonction COBAC avec deadline sous astreinte' },
      { id: 'OBL-004-C', description: 'Documenter le dispositif de contrôle interne dans un manuel revu annuellement couvrant risques opérationnels, financiers, conformité, réputation', article_ref: 'Art.8', criticite: 'critique', delai: '3 mois (28/02/2026)', preuve_requise: 'Manuel CI documenté, rapport de revue annuelle signé CA', sanction_encourue: 'Mise en demeure + audit ciblé COBAC' },
      { id: 'OBL-004-D', description: 'Garantir l\'indépendance de la fonction risques vis-à-vis des fonctions opérationnelles avec accès direct au CA', article_ref: 'Art.12', criticite: 'eleve', delai: '6 mois', preuve_requise: 'Organigramme, fiche de poste CRO, CR de présentations au CA', sanction_encourue: 'Demande de renforcement + suivi rapproché COBAC' },
      { id: 'OBL-004-E', description: 'Présenter un rapport annuel sur le contrôle interne et la gestion des risques au CA avant publication des états financiers', article_ref: 'Art.15', criticite: 'eleve', delai: 'Annuel (avant clôture)', preuve_requise: 'Rapport annuel CI + PV CA avec approbation', sanction_encourue: 'Blocage publication états financiers' },
    ],
    control_mapping: [
      { id: 'CTL-004-A', obligation_ref: 'OBL-004-A', controle_type: 'preventif', description: 'Revue annuelle d\'indépendance : chaque administrateur remplit une déclaration, le Comité de Nomination vérifie les critères COBAC', frequence: 'Annuelle (avant AG)', responsable: 'Comité de Nomination', outil: 'Grille d\'évaluation indépendance COBAC', indicateur: '% administrateurs indépendants', seuil_alerte: '< 33% → non-conformité immédiate' },
      { id: 'CTL-004-B', obligation_ref: 'OBL-004-B', controle_type: 'preventif', description: 'Suivi des réunions de comités : chaque comité doit se réunir au moins 4 fois par an, avec PV documentés', frequence: 'Trimestrielle', responsable: 'Secrétaire du Conseil', outil: 'Calendrier des comités + outil de gestion de CA (Diligent/BoardVantage)', indicateur: 'Nb réunions tenues / Nb réunions requises par comité', seuil_alerte: '< 4 réunions/an par comité → non-conformité' },
      { id: 'CTL-004-C', obligation_ref: 'OBL-004-C', controle_type: 'detectif', description: 'Test d\'effectivité du CI : vérifier par sondage que les contrôles documentés dans le manuel sont effectivement exécutés', frequence: 'Semestrielle', responsable: 'Audit Interne', outil: 'Programme de test CI + outil de gestion des audits', indicateur: 'Taux d\'effectivité = Contrôles testés conformes / Total contrôles testés', seuil_alerte: '< 80% → faiblesse significative → escalade CA' },
      { id: 'CTL-004-D', obligation_ref: 'OBL-004-D', controle_type: 'detectif', description: 'Vérification indépendance hiérarchique CRO : le CRO ne doit pas reporter à un directeur opérationnel', frequence: 'Annuelle', responsable: 'Comité des Risques / CA', outil: 'Revue organigramme + entretien CRO', indicateur: 'Indépendance confirmée (oui/non)', seuil_alerte: 'Non → non-conformité immédiate' },
      { id: 'CTL-004-E', obligation_ref: 'OBL-004-E', controle_type: 'preventif', description: 'Calendrier de production du rapport CI : jalonnement avec le calendrier de clôture comptable pour garantir présentation CA avant publication', frequence: 'Annuelle', responsable: 'Directeur Audit Interne / DG', outil: 'Calendrier de clôture intégré', indicateur: 'Date présentation CA vs Date publication états financiers', seuil_alerte: 'Présentation CA postérieure à publication → non-conformité' },
    ],
    risques: [
      { risque: 'CA sans 1/3 d\'indépendants à l\'échéance', probabilite: 'moyenne', impact_financier: 'Astreinte COBAC + coûts de recrutement d\'urgence', impact_operationnel: 'Blocage des décisions CA nécessitant quorum d\'indépendants', impact_reputationnel: 'Image de \"gouvernance faible\" → défiance investisseurs', mitigation: 'Plan de recrutement administrateurs indépendants lancé 18 mois avant échéance' },
      { risque: 'Fonction risques non indépendante', probabilite: 'faible', impact_financier: 'Amende COBAC', impact_operationnel: 'Conflits d\'intérêts dans la gestion des risques', impact_reputationnel: 'Signal négatif pour les agences de notation', mitigation: 'Rattachement direct CRO au CA + budget risques indépendant' },
      { risque: 'Responsabilité personnelle des dirigeants engagée (Art.19)', probabilite: 'faible', impact_financier: 'Amendes personnelles + interdiction d\'exercer', impact_operationnel: 'Vacance de direction → paralysie décisionnelle', impact_reputationnel: 'Carrière terminée dans le secteur financier CEMAC', mitigation: 'D&O Insurance + conformité stricte au dispositif de gouvernance' },
    ],
    n8n_triggers: [
      { id: 'N8N-004-A', workflow_name: 'COBAC-Board-Independence-Check', trigger_type: 'cron', trigger_config: '0 9 1 1 * (1er Janvier 09:00 UTC)', nodes: ['PostgreSQL → Extract Board Members', 'Function → Calculate Independence Ratio', 'Function → Check Tenure < 9 years', 'IF → Ratio < 33%?', 'Email → Alert Nomination Committee', 'PostgreSQL → Log Annual Board Review'], frequency: 'Annuel', output: 'Rapport annuel indépendance CA → Comité de Nomination', failure_fallback: 'Manual board assessment form available in dashboard' },
      { id: 'N8N-004-B', workflow_name: 'COBAC-Committee-Meeting-Tracker', trigger_type: 'cron', trigger_config: '0 8 1 */3 * (1er jour de chaque trimestre 08:00 UTC)', nodes: ['PostgreSQL → Count Meetings per Committee', 'IF → < 4 meetings this year?', 'Email → Alert Committee Chair', 'PostgreSQL → Update Compliance Dashboard'], frequency: 'Trimestriel', output: 'Alerte si un comité n\'a pas tenu ses 4 réunions annuelles', failure_fallback: 'Manual meeting count available in dashboard override' },
      { id: 'N8N-004-C', workflow_name: 'COBAC-Internal-Control-Review', trigger_type: 'cron', trigger_config: '0 6 1 9 * (1er Septembre 06:00 UTC)', nodes: ['PostgreSQL → Load Internal Control Manual', 'Function → Flag outdated sections', 'Email → Notify Audit Department', 'Function → Generate CI Annual Report Draft'], frequency: 'Annuel', output: 'Draft du rapport annuel CI + sections à mettre à jour', failure_fallback: 'Manual report generation with last year template' },
    ],
    json_schema: {
      schema_name: 'cobac_governance_compliance',
      version: '1.0.0',
      autorite: 'COBAC',
      schema: {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: 'COBAC Governance Compliance Record',
        type: 'object',
        required: ['establishment_id', 'board_composition', 'committees', 'internal_control'],
        properties: {
          establishment_id: { type: 'string' },
          board_composition: {
            type: 'object',
            properties: {
              total_members: { type: 'integer' },
              independent_members: { type: 'integer' },
              independence_ratio_pct: { type: 'number' },
              members: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    independent: { type: 'boolean' },
                    tenure_years: { type: 'number' },
                    independence_criteria_met: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          committees: {
            type: 'object',
            properties: {
              audit: { type: 'object', properties: { chair_independent: { type: 'boolean' }, meetings_per_year: { type: 'integer' } } },
              risk: { type: 'object', properties: { chair_independent: { type: 'boolean' }, meetings_per_year: { type: 'integer' } } },
              remuneration: { type: 'object', properties: { chair_independent: { type: 'boolean' }, meetings_per_year: { type: 'integer' } } },
              compliance: { type: 'object', properties: { chair_independent: { type: 'boolean' }, meetings_per_year: { type: 'integer' } } },
            },
          },
          internal_control: {
            type: 'object',
            properties: {
              manual_version: { type: 'string' },
              last_review_date: { type: 'string', format: 'date' },
              risks_covered: { type: 'array', items: { type: 'string' } },
              annual_report_presented_to_board: { type: 'boolean' },
            },
          },
          cro_independence: {
            type: 'object',
            properties: {
              reports_to_board_directly: { type: 'boolean' },
              no_operational_reporting_line: { type: 'boolean' },
            },
          },
        },
      },
    },
    processing_metadata: {
      agent: 'KOS Regulatory Brain™ — COBAC Governance Parser v1.5',
      processing_time_ms: 689,
      confidence_score: 98.1,
      verified_sources: ['Site Officiel COBAC — beac.int', 'Règlement COBAC R-2025/07 — Journal Officiel CEMAC', 'Base regulations KHEPRA (seedé 27/06/2026)'],
      uncertain_elements: [],
      last_updated: '2026-06-24T10:06:00Z',
    },
  },
];

// ═══════════════════════════════════════════════════════
// SYSTEM AGENT STATUS
// ═══════════════════════════════════════════════════════

export const REGULATORY_BRAIN_AGENTS = [
  { id: 'rb-01', nom: 'Regulatory Text Parser™', mission: 'Parsing NLP des textes réglementaires bruts (COBAC, BEAC, GABAC) — extraction articles, obligations, délais', statut: 'active', textes_traites: 4, precision: 98.5, icon: 'ri-file-code-line' },
  { id: 'rb-02', nom: 'Obligation Extractor™', mission: 'Identification et catégorisation automatique des obligations réglementaires avec criticité et délais', statut: 'active', obligations_extraites: 23, precision: 97.2, icon: 'ri-list-check-2' },
  { id: 'rb-03', nom: 'Control Mapper™', mission: 'Génération de la cartographie des contrôles (préventif/détectif/correctif) pour chaque obligation', statut: 'active', controles_generes: 22, precision: 96.8, icon: 'ri-git-branch-line' },
  { id: 'rb-04', nom: 'Risk Analyzer™', mission: 'Évaluation automatique des risques de non-conformité avec probabilité, impacts et plans de mitigation', statut: 'active', risques_analyses: 12, precision: 95.5, icon: 'ri-alert-line' },
  { id: 'rb-05', nom: 'n8n Workflow Generator™', mission: 'Création des triggers et workflows n8n pour automatisation de la conformité', statut: 'active', workflows_generes: 12, precision: 94.0, icon: 'ri-flow-chart' },
  { id: 'rb-06', nom: 'JSON Schema Compiler™', mission: 'Compilation des règles en schémas JSON standardisés pour ingestion dans les systèmes', statut: 'active', schemas_compiles: 4, precision: 99.1, icon: 'ri-braces-line' },
];

export const REGULATORY_BRAIN_KPIS = {
  textes_traites: 4,
  autorites_couvertes: ['COBAC', 'BEAC', 'GABAC'],
  obligations_extraites: 23,
  controles_generes: 22,
  workflows_n8n_generes: 12,
  schemas_json_compiles: 4,
  temps_traitement_moyen_ms: 668,
  score_confiance_moyen: 98.4,
  agents_actifs: 6,
  mode: 'MOCK — Démo Interactive',
};