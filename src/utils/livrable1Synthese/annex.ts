import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, SLATE, h1, h2, body, bulletBold, alertBox, buildTable, divider } from './helpers';

export const annexParagraphs: Paragraph[] = [
  h1('ANNEXE — VEILLE RÉGLEMENTAIRE ET PRUDENTIELLE'),
  divider(),
  body('État de la veille réglementaire au 2 juin 2026. Textes en vigueur, textes en projet, et textes abrogés à ne plus citer.'),
  h2('A.1 — Textes UEMOA en vigueur (BCEAO)'),
  buildTable(
    ['Référence', 'Objet', 'Date d\'entrée en vigueur', 'Statut'],
    [
      ['Instruction BCEAO 004-01-2014', 'Agrément SFD', '2014', 'En vigueur'],
      ['Instruction BCEAO 007-03-2018', 'Capital et fonds propres', '2018', 'En vigueur'],
      ['Instruction BCEAO 008-05-2015', 'Rémunérations dirigeants', '2015', 'En vigueur'],
      ['Instructions BCEAO 2024 n°026', 'SFD numériques — Mobile Money', '2024', 'En vigueur — PRIORITAIRE'],
      ['Instructions BCEAO 2024 n°027', 'LBC/FT renforcé', '2024', 'En vigueur — PRIORITAIRE'],
      ['Instructions BCEAO 2024 n°028', 'Souveraineté numérique', '2024', 'En vigueur — PRIORITAIRE'],
      ['Instructions BCEAO 2024 n°029', 'Scoring alternatif', '2024', 'En vigueur — PRIORITAIRE'],
      ['Circulaire BCEAO 001-2020', 'Continuité d\'activité (PCA)', '2020', 'En vigueur'],
      ['Circulaires BCEAO 01/02/03-2017', 'Gouvernance (PCA, DG, comités)', '2017', 'En vigueur'],
      ['Loi uniforme UEMOA sur l\'usure', 'Plafonnement TEG', '1997', 'En vigueur — révisée 2023'],
    ],
    { colWidths: [28, 28, 24, 20], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('A.2 — Textes CEMAC en vigueur (COBAC / BEAC)'),
  buildTable(
    ['Référence', 'Objet', 'Date d\'entrée en vigueur', 'Statut'],
    [
      ['Règlement COBAC R-2017/05', 'Agrément EMF', '2017', 'En vigueur'],
      ['Règlement COBAC R-2017/06', 'Fonds propres et solvabilité', '2017', 'En vigueur'],
      ['Règlement COBAC R-2018/01', 'LBC/FT', '2018', 'En vigueur'],
      ['Règlement COBAC R-2019/01', 'Contrôle interne', '2019', 'En vigueur'],
      ['Règlement COBAC R-2021/01', 'Souveraineté numérique', '2021', 'En vigueur — PRIORITAIRE'],
      ['Règlement COBAC R-2023/01', 'Gouvernance et Fit and Proper', '2023', 'En vigueur — PRIORITAIRE'],
      ['Règlement COBAC 04/18', 'Rémunérations dirigeants', '2018', 'En vigueur'],
      ['Instruction BEAC paiements électroniques', 'Mobile Money et wallets', '2022', 'En vigueur'],
      ['Code CIMA', 'Micro-assurance', '1992', 'En vigueur — révisé 2019'],
      ['AUSCGIE OHADA', 'Gouvernance des sociétés', '2014', 'En vigueur'],
    ],
    { colWidths: [28, 28, 24, 20], headerBg: '1A5F6E', headerColor: 'FFFFFF' }
  ),
  h2('A.3 — Textes abrogés — NE PAS CITER'),
  alertBox('Les textes suivants ont été abrogés ou remplacés. Toute citation dans un dossier d\'agrément constitue une erreur réglementaire et un signal de non-conformité pour le régulateur.', 'critical'),
  buildTable(
    ['Texte abrogé', 'Texte remplaçant', 'Date abrogation', 'Impact si cité'],
    [
      ['Règlement CEMAC n°01/03 (réglementation bancaire)', 'Règlement COBAC R-2017/05 et R-2023/01', '2017', 'Avis défavorable — texte obsolète'],
      ['Instruction BCEAO n°005-01-2002 (SFD)', 'Instruction BCEAO 004-01-2014', '2014', 'Rejet de dossier — cadre obsolète'],
      ['Règlement COBAC R-2015/02 (gouvernance)', 'Règlement COBAC R-2023/01', '2023', 'Avis défavorable — référence caduque'],
      ['Loi anti-usure UEMOA 1997 (non révisée)', 'Loi uniforme UEMOA sur l\'usure révisée 2023', '2023', 'Amende — plafond TEG incorrect'],
    ],
    { colWidths: [28, 28, 18, 26], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  h2('A.4 — Textes en projet (à surveiller)'),
  body('Les textes suivants sont en cours de rédaction ou de consultation publique. Ils pourraient impacter le programme d\'agrément dans les 12 prochains mois.'),
  bulletBold('Instruction BCEAO 2025 (projet) — Cadre réglementaire des Fintechs non-bancaires', 'Ce projet pourrait créer un agrément spécifique pour les Fintechs distribuant des crédits sans collecte de dépôts. Impact : possible simplification pour certaines filiales si le modèle évolue vers un agrément Fintech.'),
  bulletBold('Règlement COBAC 2025 (projet) — Cyber-résilience des EMF', 'Ce projet imposera des exigences de cyber-résilience (tests de pénétration annuels, certification SOC 2, ISO 27001). Impact : nécessité de certifier les systèmes IT locaux avant le dépôt.'),
  bulletBold('Directive BEAC 2025 (projet) — Interopérabilité des systèmes de paiement', 'Ce projet pourrait imposer l\'interopérabilité obligatoire entre tous les opérateurs Mobile Money dans la zone CEMAC. Impact : opportunité pour OPTASIA (multi-opérateurs) mais contrainte de conformité accrue.'),
  h2('A.5 — Références internationales applicables'),
  buildTable(
    ['Référence', 'Application', 'Obligation'],
    [
      ['GAFI n°24/2020 + n°25/2020', 'Transparence UBO et anti-blanchiment', 'Recommandation 24/25 — mise en œuvre obligatoire'],
      ['OCDE BEPS', 'Prix de transfert', 'Principe de pleine concurrence — documentation obligatoire'],
      ['IFC Performance Standards', 'ESG et durabilité', 'Standards 1-8 applicables aux projets d\'investissement'],
      ['ISO 27001 / SOC 2', 'Sécurité IT', 'Certification recommandée, exigence probable 2025'],
      ['RGPD africain (modèle)', 'Protection des données', 'Modèle de cadre réglementaire — adoption progressive par pays'],
    ],
    { colWidths: [28, 32, 40], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  new Paragraph({
    children: [new TextRun({ text: '═══ FIN DE LA SYNTHÈSE EXÉCUTIVE ═══', bold: true, size: 22, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 600, after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Réf. KE-OPT-L1SYN-2026-001-V1.0 | 2 juin 2026 | CONFIDENTIEL', size: 18, font: 'Calibri', color: SLATE, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U · Lomé, Togo · khepraexperts.com', size: 18, font: 'Calibri', color: SLATE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
];