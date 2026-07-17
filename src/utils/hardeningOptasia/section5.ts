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

export const section5Paragraphs: Paragraph[] = [
  h1('SECTION 5 — MATRICE DE MITIGATION DES RISQUES DE REJET (CONFORMITÉ PURE)'),
  divider(),

  alertBox(
    'Cette matrice mesure exclusivement la probabilité (P) et l\'impact (I) de chaque risque sur l\'obtention de l\'agrément. Aucune variable financière n\'est prise en compte. Le risque net (P × I) détermine le niveau de criticité et la priorité des mesures de remédiation.',
    'info'
  ),
  spacer(),

  h2('5.1 — Méthodologie de scoring'),
  body(
    'La probabilité (P) et l\'impact (I) sont notés sur une échelle de 1 à 5 :'
  ),
  buildTable(
    ['Échelle', 'Probabilité (P)', 'Impact (I)'],
    [
      ['1', 'Très faible (< 10 %)', 'Mineur (retard de 1-3 mois sans réquisition)'],
      ['2', 'Faible (10-30 %)', 'Modéré (réquisition avec délai de régularisation de 30-60 jours)'],
      ['3', 'Moyenne (30-50 %)', 'Majeur (réquisition avec délai de régularisation de 60-90 jours, risque de rejet si non régularisé)'],
      ['4', 'Élevée (50-70 %)', 'Critique (avis défavorable probable, possibilité de recours limitée)'],
      ['5', 'Très élevée (> 70 %)', 'Catastrophique (rejet définitif, inscription sur liste noire, transmission aux autorités LBC/FT)'],
    ],
    { colWidths: [15, 42, 43], headerBg: KHEPRA_TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),
  body(
    'Le risque net (R) est calculé par la formule R = P × I. Le risque net est classé comme suit :'
  ),
  buildTable(
    ['Risque net (R)', 'Classification', 'Couleur', 'Action requise'],
    [
      ['1-4', 'Faible', 'Vert', 'Surveillance régulière, pas d\'action immédiate'],
      ['5-9', 'Modéré', 'Jaune', 'Plan d\'action préventif, suivi mensuel'],
      ['10-16', 'Majeur', 'Orange', 'Plan d\'action correctif immédiat, suivi hebdomadaire'],
      ['17-25', 'Critique', 'Rouge', 'Plan d\'action d\'urgence, escarade au Comité de Direction, risque de suspension du dossier'],
    ],
    { colWidths: [20, 20, 15, 45], headerBg: KHEPRA_DARK, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('5.2 — Matrice des risques réglementaires'),
  body(
    'La matrice suivante identifie les 10 risques majeurs de rejet, leur probabilité, leur impact, et leur risque net :'
  ),
  buildTable(
    ['Risque', 'Description', 'P', 'I', 'R', 'Classification'],
    [
      ['R1', 'Non-conformité UBO : opacité de la chaîne de propriété, qualification de société écran', '4', '5', '20', 'Critique'],
      ['R2', 'Non-conformité de l\'hébergement cloud : absence de localisation des serveurs et des données', '5', '5', '25', 'Critique'],
      ['R3', 'Cumul de fonctions PCA/DG ou pilotage à distance des dirigeants', '4', '4', '16', 'Majeur'],
      ['R4', 'Non-conformité de la politique de rémunération : dépassement des plafonds, absence de malus/clawback', '3', '4', '12', 'Majeur'],
      ['R5', 'Défaut de conformité LBC/FT : absence de système de surveillance des transactions, non-déclaration au CENTIF/TRACFIN', '4', '5', '20', 'Critique'],
      ['R6', 'Réquisition réglementaire non régularisée : délai de régularisation dépassé, réponse insuffisante', '3', '5', '15', 'Majeur'],
      ['R7', 'Changement imprévu des textes en cours d\'instruction : nouvelle instruction BCEAO ou nouveau règlement COBAC', '3', '3', '9', 'Modéré'],
      ['R8', 'Absence de substance économique de la maison-mère : FZCO sans personnel, sans bureaux, sans activité opérationnelle', '4', '5', '20', 'Critique'],
      ['R9', 'Non-conformité des contrats d\'externalisation : absence de clause de droit d\'audit du régulateur', '3', '5', '15', 'Majeur'],
      ['R10', 'Inadéquation du capital social : dotation inférieure au minimum réglementaire, traçabilité des fonds non démontrée', '4', '4', '16', 'Majeur'],
    ],
    { colWidths: [8, 42, 6, 6, 6, 16], headerBg: KHEPRA_RED, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('5.3 — Mesures de remédiation "Hardening" par risque'),
  h3('5.3.1 — Risques critiques (R = 20 à 25)'),
  body(
    'Les risques critiques nécessitent un plan d\'action d\'urgence et une escarade immédiate au Comité de Direction :'
  ),
  bulletBold('R1 / R8 — Non-conformité UBO et substance économique', 'Mandater un cabinet Big Four pour réaliser un Ownership Chain Audit et un Substance Audit de la maison-mère. Produire un rapport certifié. Créer une holding opérationnelle dans la zone avec personnel, bureaux, et activité commerciale.'),
  bulletBold('R2 — Non-conformité de l\'hébergement cloud', 'Déployer immédiatement une architecture hybride Edge + Cloud local. Signer des contrats d\'hébergement avec des datacenters locaux certifiés. Réaliser un Technical Compliance Audit.'),
  bulletBold('R5 — Défaut de conformité LBC/FT', 'Implémenter un système de surveillance des transactions (Transaction Monitoring System) conforme aux normes BCEAO/COBAC. Désigner un responsable de la conformité LBC/FT résident dans le pays. Souscrire un engagement de déclaration au CENTIF/TRACFIN.'),
  spacer(),

  h3('5.3.2 — Risques majeurs (R = 12 à 16)'),
  body(
    'Les risques majeurs nécessitent un plan d\'action correctif immédiat et un suivi hebdomadaire :'
  ),
  bulletBold('R3 — Cumul de fonctions et pilotage à distance', 'Recruter un DG local et un PCA indépendant. Établir une charte de séparation des fonctions. Présenter les dirigeants au régulateur lors de la phase pré-dépôt.'),
  bulletBold('R4 — Non-conformité de la politique de rémunération', 'Rédiger une politique de rémunération conforme aux plafonds BCEAO/COBAC. Intégrer les clauses de malus et clawback. Faire valider par un cabinet externe.'),
  bulletBold('R6 — Réquisition réglementaire non régularisée', 'Établir une procédure de gestion des réquisitions (workflow, responsables, délais, escalade). Simuler des réquisitions lors d\'exercices de conformité.'),
  bulletBold('R9 — Non-conformité des contrats d\'externalisation', 'Réviser tous les contrats d\'externalisation pour intégrer les clauses obligatoires. Faire valider par un juriste spécialisé.'),
  bulletBold('R10 — Inadéquation du capital social', 'Vérifier l\'adéquation du capital social par rapport aux minima réglementaires (Instruction BCEAO 004-01-2014, Règlement COBAC R-2017/05). Établir la chaîne documentaire de traçabilité des fonds.'),
  spacer(),

  h3('5.3.3 — Risques modérés (R = 5 à 9)'),
  body(
    'Les risques modérés nécessitent un plan d\'action préventif et un suivi mensuel :'
  ),
  bulletBold('R7 — Changement imprévu des textes en cours d\'instruction', 'Mettre en place une veille réglementaire active (abonnement aux bulletins officiels de la BCEAO, de la COBAC, et des Ministères des Finances). Prévoir une clause de révision dans le planning de la mission.'),
  spacer(),

  h2('5.4 — Feuille de route de mitigation des risques critiques'),
  body(
    'La feuille de route suivante présente les actions prioritaires à mener dans les 90 jours suivant la réception du présent mémorandum :'
  ),
  buildTable(
    ['Action', 'Responsable', 'Délai', 'Livrable', 'Validation'],
    [
      ['Ownership Chain Audit + Substance Audit', 'Cabinet Big Four / Khepra', 'J+30', 'Rapport certifié', 'CEO + Comité de Direction'],
      ['Constitution holding opérationnelle zone', 'Juriste OHADA / Khepra', 'J+60', 'RCCM, statuts, baux, contrats de travail', 'Régulateur pays pilote'],
      ['Architecture hybride Edge + Cloud local', 'DSI / Architecte IT', 'J+45', 'Architecture technique, contrats hébergement', 'Auditeur technique agréé'],
      ['Implémentation TMS LBC/FT', 'Responsable Conformité', 'J+60', 'Système opérationnel, procédures, PV tests', 'Régulateur + CENTIF'],
      ['Recrutement DG + PCA pays pilotes', 'RH / Khepra', 'J+45', 'CV, entretiens, attestations, casiers judiciaires', 'Régulateur (phase pré-dépôt)'],
      ['Rédaction politique rémunération conforme', 'Khepra / Juriste', 'J+30', 'Politique signée par le CA', 'Cabinet externe'],
      ['Révision contrats externalisation', 'Juriste IT / Khepra', 'J+30', 'Contrats révisés', 'Juriste spécialisé'],
      ['Vérification adéquation capital + traçabilité', 'Contrôleur de gestion / Khepra', 'J+20', 'Attestation de conformité', 'CAC agréé'],
    ],
    { colWidths: [25, 20, 10, 25, 20], headerBg: KHEPRA_TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('5.5 — Dispositions finales et engagement de confidentialité'),
  body(
    'Le présent mémorandum constitue un document de travail confidentiel, strictement réservé à l\'attention du CEO du Groupe OPTASIA. Il ne doit pas être communiqué, reproduit, ou diffusé, en tout ou en partie, sans l\'accord écrit préalable de KHEPRA EXPERTS SARL U.'
  ),
  body(
    'Les analyses et recommandations contenues dans ce mémorandum sont fondées sur les textes réglementaires en vigueur au jour de sa rédaction (2 juin 2026). Toute modification des textes réglementaires, des instructions, ou des pratiques des régulateurs pourrait affecter la pertinence des recommandations. KHEPRA EXPERTS SARL U se réserve le droit de réviser ce mémorandum à la demande du Client, sous réserve d\'un mandat complémentaire.'
  ),
  body(
    'Pour toute question relative au contenu de ce mémorandum, le CEO du Groupe OPTASIA est invité à contacter directement le Directeur de Mission désigné par KHEPRA EXPERTS SARL U.'
  ),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: '— FIN DU MÉMORANDUM —', bold: true, size: 20, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Référence : KE-OPT-HARD-2026-001-V1.0', size: 18, font: 'Calibri', color: KHEPRA_TEAL, italic: true })],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Classification : CONFIDENTIEL — STRICTEMENT PRIVÉ', bold: true, size: 18, font: 'Calibri', color: KHEPRA_RED })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
];