import {
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx';
import {
  h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, subBullet, numberedItem,
  KHEPRA_RED,
  KHEPRA_DARK,
  KHEPRA_TEAL,
  KHEPRA_AMBER,
} from './helpers';

export const section2Paragraphs: Paragraph[] = [
  h1('SECTION 2 — CARTOGRAPHIE DES GAPS DE SOUVERAINETÉ TECHNIQUE & ARCHITECTURE CBS'),
  divider(),

  alertBox(
    'La souveraineté numérique est désormais un pilier non négociable de l\'agrément bancaire et microfinancier en Afrique francophone. Les régulateurs exigent un contrôle physique et juridictionnel sur les données clients, les systèmes de production, et les logs d\'exploitation. Toute architecture "Cloud-First / Global" sans adaptation locale constitue un motif de rejet structurel.',
    'critical'
  ),
  spacer(),

  h2('2.1 — Le dogme de souveraineté numérique des autorités monétaires locales'),
  body(
    'Le Règlement COBAC R-2021/01 (normes de sécurité des systèmes d\'information et de cybersécurité) et les Instructions BCEAO 2024 (notamment l\'Instruction n°028 sur la digitalisation et la sécurité des systèmes de paiement) ont établi un principe fondateur : les données de la clientèle, les systèmes de production, et les journaux d\'exploitation des établissements financiers doivent être hébergés physiquement sur le territoire national ou, à défaut, sur le territoire de la zone monétaire (UEMOA ou CEMAC), sous réserve de l\'accord préalable du régulateur.'
  ),
  body(
    'Ce principe repose sur trois fondements juridiques et stratégiques :'
  ),
  numberedItem(1, 'Souveraineté des données : La BCEAO et la COBAC considèrent que les données financières des citoyens africains sont des données souveraines, soumises à la juridiction des tribunaux nationaux et des autorités monétaires. Un hébergement hors zone érode cette souveraineté.'),
  numberedItem(2, 'Contrôle opérationnel : Les régulateurs doivent pouvoir exercer un droit d\'audit direct, sur pièces et sur place, sur les systèmes d\'information. Un hébergement cloud global (AWS, Azure, GCP) hors des zones UEMOA/CEMAC rend cet audit techniquement impossible sans la coopération d\'un tiers étranger.'),
  numberedItem(3, 'Résilience des systèmes : Les crises de connectivité internationale (coupures de câbles sous-marins, sanctions internationales, conflits géopolitiques) ont démontré la fragilité d\'une dépendance aux infrastructures cloud étrangères. Les régulateurs exigent une autonomie minimale.'),
  spacer(),

  h2('2.2 — Gaps bloquants identifiés : le modèle "Cloud-First / Global" d\'OPTASIA'),
  h3('2.2.1 — Gap bloquant n°1 : hébergement des serveurs de production'),
  body(
    'L\'architecture actuelle d\'OPTASIA repose sur une infrastructure cloud globale, probablement hébergée dans des régions AWS ou Azure hors d\'Afrique (Europe, Moyen-Orient, ou Asie). Ce modèle présente les non-conformités suivantes :'
  ),
  bullet('Absence de localisation physique des serveurs de production sur le territoire de chaque juridiction nationale. Le Règlement COBAC R-2021/01, article 12, impose que les serveurs de production des systèmes de gestion des comptes clients (Core Banking System) soient localisés physiquement dans l\'État membre où l\'agrément est sollicité.'),
  bullet('Absence de redondance géographique intra-zone. Les régulateurs exigent une redondance des données au sein de la zone monétaire (UEMOA ou CEMAC), pas seulement au niveau global du fournisseur cloud.'),
  bullet('Dépendance aux sous-traitants étrangers pour l\'accès physique. Les contrats d\'hébergement cloud standard ne prévoient pas l\'accès physique des régulateurs aux datacenters. Or, les Instructions BCEAO 2024 et le Règlement COBAC R-2021/01 imposent un droit d\'accès physique inconditionnel.'),
  spacer(),

  h3('2.2.2 — Gap bloquant n°2 : hébergement des bases de données clients'),
  body(
    'Les bases de données clients (KYC, transactions, historiques de crédit, données biométriques) constituent des données sensibles au sens du RGPD et des lois locales de protection des données. Les gaps suivants sont identifiés :'
  ),
  bullet('Hébergement des données clients dans des juridictions non couvertes par un traité de reconnaissance mutuelle avec les juridictions africaines. Aucun traité de ce type n\'existe actuellement entre les pays de l\'UEMOA/CEMAC et les juridictions de hébergement cloud les plus courantes (Irlande, Virginie, Singapour, Bahreïn).'),
  bullet('Absence de schéma de chiffrement conforme aux normes locales. Les régulateurs exigent un chiffrement des données au repos et en transit conforme aux normes de la BCEAO (AES-256, RSA-4096) et de la COBAC (chiffrement homomorphe pour les données agrégées). Les solutions cloud globales ne certifient pas systématiquement ces normes.'),
  bullet('Absence de procédure de suppression définitive (right to be forgotten) conforme aux standards africains. Les lois locales de protection des données (Loi n°2019-014 du Togo, Loi n°2017-20 du Sénégal, etc.) imposent des délais de conservation et des modalités de destruction distincts du RGPD.'),
  spacer(),

  h3('2.2.3 — Gap bloquant n°3 : hébergement des logs d\'exploitation'),
  body(
    'Les logs d\'exploitation (journaux des transactions, accès système, modifications de paramètres, alertes de sécurité) sont des éléments de preuve en cas de contentieux ou de procédure pénale. Les régulateurs exigent :'
  ),
  bullet('Conservation des logs sur une durée minimale de 10 ans, sur support inaltérable, accessible en temps réel aux autorités de supervision.'),
  bullet('Localisation des logs sur le territoire national. Les logs hébergés dans un cloud global ne peuvent pas être soumis à une injonction de production par une juridiction africaine sans l\'intervention d\'autorités étrangères.'),
  bullet('Intégrité des logs garantie par une signature cryptographique locale. Les solutions cloud globales ne garantissent pas l\'intégrité des logs face à une procédure de confiscation ou de gel par une autorité étrangère.'),
  spacer(),

  h2('2.3 — Critères de non-conformité des contrats d\'externalisation de services essentiels'),
  h3('2.3.1 — Partenariats avec des MNOs (Mobile Network Operators) et Fintechs'),
  body(
    'Les modèles de microfinance digitale reposent fréquemment sur des partenariats avec des opérateurs de téléphonie mobile (MNOs) pour l\'agrégation de données, la vérification d\'identité, et les canaux de distribution. Ces partenariats doivent répondre aux critères suivants pour éviter un rejet :'
  ),
  bulletBold('Clause de droit d\'audit direct du régulateur', 'Tout contrat d\'externalisation de services essentiels (core banking, KYC, scoring, mobile money gateway) doit inclure une clause expresse reconnaissant au régulateur (BCEAO, COBAC, ou autorité nationale) un droit d\'audit direct, sur pièces et sur place, sans restriction ni condition préalable. L\'absence de cette clause est un motif de rejet automatique.'),
  bulletBold('Clause de localisation des données', 'Le contrat doit stipuler que les données relatives aux clients de la filiale EMF sont stockées, traitées, et archivées sur le territoire national ou, à défaut, sur le territoire de la zone monétaire, avec l\'accord préalable du régulateur.'),
  bulletBold('Clause de reversibilité et de portabilité', 'Le contrat doit prévoir une procédure de reversibilité en cas de résiliation, avec transfert des données vers un nouvel opérateur local dans un délai de 30 jours maximum, sans perte de données.'),
  bulletBold('Clause d\'assurance qualité et de conformité', 'Le sous-traitant doit s\'engager à maintenir une conformité continue avec les normes de la BCEAO, de la COBAC, et des lois locales, et à informer immédiatement la filiale EMF de toute faille de sécurité ou violation de données.'),
  spacer(),

  h3('2.3.2 — Tableau de synthèse des clauses obligatoires'),
  buildTable(
    ['Type de contrat', 'Clause obligatoire', 'Référence réglementaire', 'Sanction d\'absence'],
    [
      ['Hébergement cloud / IaaS', 'Localisation des serveurs de production sur le territoire national ou zone monétaire', 'COBAC R-2021/01 Art. 12 ; BCEAO Inst. 2024 n°028', 'Rejet du dossier'],
      ['Hébergement cloud / IaaS', 'Droit d\'audit physique du régulateur sur les serveurs', 'COBAC R-2021/01 Art. 15 ; BCEAO Inst. 2024 n°028', 'Rejet du dossier'],
      ['Hébergement cloud / IaaS', 'Redondance intra-zone (UEMOA ou CEMAC) des données', 'COBAC R-2021/01 Art. 14 ; BCEAO Inst. 2024 n°028', 'Rejet du dossier'],
      ['Partenariat MNO / KYC', 'Droit d\'audit direct du régulateur sur les bases de données KYC', 'COBAC R-2023/01 Art. 18 ; BCEAO Inst. 2024 n°026', 'Rejet du dossier'],
      ['Partenariat MNO / KYC', 'Localisation des données KYC sur le territoire national', 'Lois locales protection données ; BCEAO Inst. 2024 n°028', 'Rejet du dossier'],
      ['Partenariat Fintech / scoring', 'Traçabilité des algorithmes de scoring et absence de biais discriminatoire', 'COBAC R-2023/01 Art. 22 ; BCEAO Inst. 2024 n°029', 'Réquisition + délai de régularisation'],
      ['Externalisation IT / maintenance', 'Clause de reversibilité sous 30 jours vers opérateur local', 'COBAC R-2021/01 Art. 16 ; BCEAO Inst. 2024 n°028', 'Réquisition + délai de régularisation'],
      ['Externalisation IT / maintenance', 'Engagement de conformité continue aux normes BCEAO/COBAC', 'COBAC R-2021/01 Art. 17 ; BCEAO Inst. 2024 n°028', 'Réquisition + délai de régularisation'],
    ],
    { colWidths: [22, 28, 25, 25], headerBg: KHEPRA_AMBER, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('2.4 — Recommandations impératives de hardening'),
  bulletBold('Mesure 1 — Architecture hybride "Edge + Cloud local"', 'Déployer une architecture hybride où les serveurs de production (Core Banking, base de données clients, logs) sont hébergés dans des datacenters locaux certifiés (Togo : CAC-DATA, Cameroun : CAMTEL Data Center, Bénin : ACE, etc.), avec une synchronisation cloud global uniquement pour les données agrégées et anonymisées.'),
  bulletBold('Mesure 2 — Certification de conformité des fournisseurs cloud', 'Exiger de tout fournisseur cloud une certification de conformité aux normes BCEAO/COBAC, délivrée par un auditeur agréé. Cette certification doit couvrir la localisation, le chiffrement, le droit d\'audit, et la reversibilité.'),
  bulletBold('Mesure 3 — Réécriture des contrats MNO/Fintech', 'Réviser tous les contrats de partenariat avec des MNOs et des Fintechs pour y intégrer les clauses obligatoires identifiées ci-dessus. Faire valider la révision par un juriste spécialisé en droit des télécommunications et de la microfinance.'),
  bulletBold('Mesure 4 — Audit de conformité technique pré-dépôt', 'Réaliser un audit technique de conformité (Technical Compliance Audit) par un cabinet spécialisé en cybersécurité bancaire, couvrant l\'architecture réseau, l\'hébergement, le chiffrement, les logs, et les contrats d\'externalisation. Le rapport d\'audit doit être joint en annexe du dossier d\'agrément.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];