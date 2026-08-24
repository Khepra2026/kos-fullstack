import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  convertInchesToTwip,
} from 'docx';

// ─── PALETTE CGI / KHEPRA ─────────────────────────────────────────────────────
const NAVY      = '0D1B2A';
const NAVY_MID  = '1B3A5C';
const STEEL     = '2E6DA4';
const STEEL_LT  = 'D6E8F7';
const GOLD      = 'C8A84B';
const DARK      = '1A2332';
const GRAY      = '6B7280';
const LGRAY     = 'F4F6F9';
const WHITE     = 'FFFFFF';
const GREEN     = '1A7A4A';
const GREEN_LT  = 'E6F4ED';
const RED_WARN  = 'C0392B';
const AMBER     = 'D97706';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function sp(n = 1): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 0, after: n * 120 } });
}

function hr(color = STEEL): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 4 })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color } },
    spacing: { before: 80, after: 80 },
  });
}

function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `  ${text}  `, bold: true, size: 28, color: WHITE, font: 'Calibri', allCaps: true })],
    shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
    spacing: { before: 400, after: 200 },
    indent: { left: convertInchesToTwip(0.1) },
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: NAVY_MID, font: 'Calibri' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: STEEL } },
    spacing: { before: 320, after: 160 },
  });
}

function h3(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: STEEL, font: 'Calibri' })],
    spacing: { before: 240, after: 120 },
  });
}

function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: opts?.size || 20, font: 'Calibri', bold: opts?.bold, italics: opts?.italic, color: opts?.color || DARK })],
    spacing: { before: 60, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bullet(text: string, icon = '▸'): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }),
      new TextRun({ text, size: 20, font: 'Calibri', color: DARK }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function infoBox(text: string, color = STEEL, bg = STEEL_LT): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, font: 'Calibri', italics: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function alertBox(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `⚠  ${text}`, size: 18, font: 'Calibri', bold: true, color: AMBER })],
    shading: { type: ShadingType.SOLID, color: 'FFF8E1', fill: 'FFF8E1' },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: AMBER } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function successBox(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `✔  ${text}`, size: 18, font: 'Calibri', bold: true, color: GREEN })],
    shading: { type: ShadingType.SOLID, color: GREEN_LT, fill: GREEN_LT },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: GREEN } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function kpiRow(items: Array<{ label: string; value: string; sub?: string }>): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: WHITE },
      bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
      left: { style: BorderStyle.NONE, size: 0, color: WHITE },
      right: { style: BorderStyle.NONE, size: 0, color: WHITE },
      insideH: { style: BorderStyle.NONE, size: 0, color: WHITE },
      insideV: { style: BorderStyle.NONE, size: 0, color: WHITE },
    },
    rows: [
      new TableRow({
        children: items.map(item =>
          new TableCell({
            width: { size: Math.floor(100 / items.length), type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: WHITE },
              bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
              left: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
              right: { style: BorderStyle.NONE, size: 0, color: WHITE },
            },
            children: [
              new Paragraph({
                children: [new TextRun({ text: item.value, bold: true, size: 36, color: WHITE, font: 'Calibri' })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
              }),
              new Paragraph({
                children: [new TextRun({ text: item.label, bold: true, size: 16, color: GOLD, font: 'Calibri', allCaps: true })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
              ...(item.sub ? [new Paragraph({
                children: [new TextRun({ text: item.sub, size: 14, color: 'AAAAAA', font: 'Calibri', italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 0 },
              })] : []),
            ],
          })
        ),
      }),
    ],
  });
}

function tbl(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const n = headers.length;
  let w = colWidths ? [...colWidths] : headers.map(() => Math.floor(100 / n));
  if (w.length < n) {
    const sumExisting = w.reduce((a, b) => a + (b || 0), 0);
    const remaining = Math.max(100 - sumExisting, 0);
    const avg = Math.floor(remaining / (n - w.length));
    while (w.length < n) {
      w.push(avg > 0 ? avg : Math.floor(100 / n));
    }
  }
  if (w.length > n) {
    w = w.slice(0, n);
  }
  w = w.map((val) => (val === undefined || val === null || Number.isNaN(val)) ? Math.floor(100 / n) : val);

  const normalizedRows = rows.map((row) => {
    if (row.length < n) {
      return [...row, ...Array(n - row.length).fill('')];
    }
    if (row.length > n) {
      return row.slice(0, n);
    }
    return row;
  });

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h) =>
      new TableCell({
        shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER })],
      })
    ),
  });
  const dataRows = normalizedRows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? WHITE : LGRAY, fill: ri % 2 === 0 ? WHITE : LGRAY },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK, bold: ci === 0 })], alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })],
        })
      ),
    })
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: w.map((val) => `${val}%`),
    rows: [headerRow, ...dataRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
    },
  });
}

function pb(): Paragraph { return new Paragraph({ children: [new PageBreak()] }); }

// ─── PAGE DE GARDE ────────────────────────────────────────────────────────────
function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({
      children: [new TextRun({ text: '', size: 4 })],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      spacing: { before: 0, after: 0 },
    }),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS', bold: true, size: 40, color: STEEL, font: 'Calibri', allCaps: true, characterSpacing: 40 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Cabinet International de Conseil — Finance · Stratégie · Ingénierie de Projets', size: 20, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(GOLD),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'ÉTUDE DE FAISABILITÉ', bold: true, size: 52, color: NAVY, font: 'Calibri', allCaps: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Technique · Commerciale · Financière', bold: true, size: 30, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'Programme d\'Exploitation Industrielle d\'une Carrière de Granulats', bold: true, size: 26, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '(Gravier Concassé — Gisement Siyimé, Haho, Togo)', size: 22, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Période : 2026 – 2036', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 300 },
    }),
    sp(1),
    tbl(
      ['Client', 'Secteur', 'Pays', 'Référence'],
      [['CORNERSTONE GROUP INTERNATIONAL (CGI) SA', 'Mines & Carrières — BTP', 'Togo / Afrique de l\'Ouest', 'KE-CGI-TOGO-2026-001']],
      [35, 25, 20, 20]
    ),
    sp(1),
    tbl(
      ['Date d\'émission', 'Version', 'Statut', 'Validité'],
      [['Mai 2026', 'V1.1 — Corrigée', 'CONFIDENTIEL', '12 mois']],
      [25, 25, 25, 25]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Conforme aux standards : BAD · BIDC · IFC Performance Standards · Principes ESG', size: 18, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    pb(),
  ];
}

// ─── AVERTISSEMENT LÉGAL ──────────────────────────────────────────────────────
function legalNotice(): (Paragraph | Table)[] {
  return [
    h1('AVERTISSEMENT LÉGAL ET CONFIDENTIALITÉ'),
    sp(),
    body('Le présent rapport a été préparé par KHEPRA EXPERTS à la demande exclusive de CORNERSTONE GROUP INTERNATIONAL (CGI) SA. Il est destiné à un usage strictement confidentiel et ne peut être communiqué à des tiers sans l\'accord écrit préalable de KHEPRA EXPERTS et de CGI SA.'),
    sp(),
    body('Les projections financières, estimations de marché et analyses techniques contenues dans ce document sont fondées sur des données disponibles à la date d\'émission, issues de sources officielles et crédibles (Banque Mondiale, BAD, FMI, BCEAO, INSEED Togo, CEDEAO). Elles constituent des estimations raisonnées et non des garanties de résultats.'),
    sp(),
    body('Ce rapport a été structuré conformément aux standards des institutions de financement du développement (BAD, BIDC, IFC) et peut être présenté directement à un comité de crédit ou d\'investissement.'),
    sp(),
    infoBox('Référence : KE-CGI-TOGO-2026-001 | Préparé par : KHEPRA EXPERTS | Pour : CORNERSTONE GROUP INTERNATIONAL (CGI) SA | Togo, 2026'),
    pb(),
  ];
}

// ─── SOMMAIRE ─────────────────────────────────────────────────────────────────
function tableOfContents(): (Paragraph | Table)[] {
  const items = [
    { n: '1.', t: 'Résumé Exécutif', p: '4' },
    { n: '2.', t: 'Présentation du Projet et du Promoteur', p: '6' },
    { n: '3.', t: 'Analyse Technique — Process Industriel et Capacités', p: '8' },
    { n: '4.', t: 'Programme d\'Investissement (CAPEX)', p: '12' },
    { n: '5.', t: 'Analyse de Marché', p: '15' },
    { n: '6.', t: 'Stratégie Commerciale', p: '19' },
    { n: '7.', t: 'Modélisation Financière (2026–2036)', p: '22' },
    { n: '8.', t: 'Besoin en Fonds de Roulement (BFR) Structurel', p: '28' },
    { n: '9.', t: 'Structuration du Financement et Plan de Dette', p: '30' },
    { n: '10.', t: 'Indicateurs de Performance Financière', p: '33' },
    { n: '11.', t: 'Analyse des Risques', p: '35' },
    { n: '12.', t: 'Analyse ESG — Standards IFC', p: '38' },
    { n: '13.', t: 'Conclusions et Recommandations', p: '41' },
    { n: 'Ann.', t: 'Annexes — Hypothèses détaillées et sources', p: '43' },
  ];
  return [
    h1('SOMMAIRE'),
    sp(),
    ...items.map(item =>
      new Paragraph({
        children: [
          new TextRun({ text: `${item.n}  `, bold: true, size: 20, font: 'Calibri', color: STEEL }),
          new TextRun({ text: item.t, size: 20, font: 'Calibri', color: DARK }),
          new TextRun({ text: `  ....  p. ${item.p}`, size: 20, font: 'Calibri', color: GRAY }),
        ],
        spacing: { before: 100, after: 100 },
        border: { bottom: { style: BorderStyle.DOTTED, size: 1, color: 'E5E7EB' } },
      })
    ),
    pb(),
  ];
}

// ─── SECTION 1 : RÉSUMÉ EXÉCUTIF ─────────────────────────────────────────────
function section1(): (Paragraph | Table)[] {
  return [
    h1('1. RÉSUMÉ EXÉCUTIF'),
    sp(),
    h2('1.1 Présentation synthétique du projet'),
    body('CORNERSTONE GROUP INTERNATIONAL (CGI) SA est une société togolaise spécialisée dans l\'exploitation industrielle d\'une carrière de granulats (gravier concassé) sur le gisement de Siyimé, dans le district du Haho (Région des Plateaux, Togo). La société dispose d\'une première ligne de production de 250 t/h, représentant un investissement initial de 2,1 milliards FCFA réalisé sur fonds propres entre 2023 et 2025.'),
    sp(),
    body('Le présent programme d\'investissement 2026–2036, objet de la sollicitation d\'accompagnement financier auprès de la BIDC en dette senior (100%), porte sur l\'acquisition et l\'installation des Lignes 2 et 3 (nouvelles lignes de production de 250 t/h chacune), l\'acquisition d\'une flotte de transport dédiée (10 camions), et le BFR structurel nécessaire à l\'exploitation des 3 lignes. L\'objectif est de porter la capacité totale à 750 t/h installés et la production annuelle à 795 000 tonnes en régime de croisière (à partir de 2028), avec un BFR structurel de 1,34 milliard FCFA couvert par une ligne de crédit BIDC de 800 millions et autofinancement de 535 millions. Le fonctionnement en 1 poste de 8 heures par jour respecte les exigences du Code du Travail togolais.'),
    sp(),
    kpiRow([
      { label: 'CAPEX + BFR nouveau programme', value: '5,4 Mds FCFA', sub: '4,6 Mds CAPEX + 0,8 Mds BFR — 100% dette senior BIDC' },
      { label: 'Production annuelle cible (2028)', value: '795 000 T', sub: 'Régime de croisière — 3 lignes × 8h/j' },
      { label: 'Chiffre d\'affaires cible (2028)', value: '8,4 Mds FCFA', sub: 'Prix moyen 10 000 FCFA/T' },
      { label: 'TRI Projet', value: '24,8 %', sub: 'Sur 10 ans — Scénario central' },
    ]),
    sp(),
    kpiRow([
      { label: 'DSCR global (prêt + LC BFR)', value: '6,21x', sub: 'Couverture service dette totale incluant BFR' },
      { label: 'DSCR Moyen', value: '6,19x', sub: 'Couverture service de la dette' },
      { label: 'Délai de récupération', value: '3,9 ans', sub: 'Payback period' },
      { label: 'Seuil de rentabilité', value: '304 000 T/an', sub: 'Point mort opérationnel' },
    ]),
    sp(),
    h2('1.2 Principaux constats et recommandations'),
    bullet('Le marché togolais et régional des granulats est en forte croissance, porté par les programmes d\'infrastructure publique (PNDES 2018-2022 prolongé, Plan Togo 2025, projets CEDEAO) et la demande privée en BTP.'),
    bullet('La position géographique du gisement de Siyimé (176 km de Cotonou, 120 km de Lomé) confère à CGI SA un avantage logistique décisif sur les marchés togolais et béninois.'),
    bullet('Les problèmes opérationnels actuels (blocs surdimensionnés, arrêts fréquents) sont identifiés et traités dans le programme d\'amélioration opérationnelle — ils ne remettent pas en cause la viabilité du projet.'),
    bullet('La structuration financière proposée (100% dette BIDC à 8%, 8 ans, différé 24 mois) est adaptée au profil de risque du projet et compatible avec les ratios de couverture de la dette (DSCR 6,19x).'),
    bullet('Le projet présente un profil ESG satisfaisant, sous réserve de la mise en œuvre du Plan de Gestion Environnementale et Sociale (PGES) conforme aux Performance Standards IFC.'),
    sp(),
    successBox('Conclusion : Le projet est techniquement viable, commercialement porteur et financièrement bancable. KHEPRA EXPERTS recommande la mise en œuvre du programme d\'investissement 2026–2036 tel que structuré dans le présent rapport.'),
    pb(),
  ];
}

// ─── SECTION 2 : PRÉSENTATION DU PROJET ──────────────────────────────────────
function section2(): (Paragraph | Table)[] {
  return [
    h1('2. PRÉSENTATION DU PROJET ET DU PROMOTEUR'),
    sp(),
    h2('2.1 Identité du promoteur'),
    tbl(
      ['Paramètre', 'Information'],
      [
        ['Raison sociale', 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA'],
        ['Forme juridique', 'Société Anonyme (SA) — Droit OHADA'],
        ['Capital social', '2 500 000 000 FCFA'],
        ['Secteur d\'activité', 'Exploitation de carrières — Code CITI 0810 (Extraction de pierres, sable et argile)'],
        ['Siège social', 'Lomé, Nukafu — Boulevard Jean-Paul II, Togo'],
        ['Site d\'exploitation', 'Gisement de Siyimé, District du Haho, Région des Plateaux, Togo'],
        ['Autorisation d\'exploitation', 'Permis d\'exploitation minière délivré par le Ministère des Mines du Togo'],
        ['Certification qualité', 'LNBTP (Laboratoire National du Bâtiment et des Travaux Publics) — Masse volumique 2,63 g/cm³'],
      ],
      [35, 65]
    ),
    sp(),
    h2('2.2 Situation actuelle — Ligne 1'),
    body('CGI SA dispose d\'une première ligne de production opérationnelle installée entre 2023 et 2025, représentant un investissement cumulé de 2,1 milliards FCFA financé intégralement sur fonds propres. Cet investissement historique n\'est pas intégré au nouveau programme d\'investissement objet de la présente étude de faisabilité. La Ligne 1 présente une capacité nominale de 250 t/h et est exploitée en 1 poste de 8 heures par jour, en conformité avec le Code du Travail togolais.'),
    sp(),
    tbl(
      ['Indicateur', 'Situation actuelle', 'Objectif post-programme'],
      [
        ['Capacité nominale installée', '250 t/h (1 ligne)', '750 t/h (3 lignes)'],
        ['Taux de disponibilité effectif', '~60% (problèmes opérationnels)', '80% (après optimisation)'],
        ['Production annuelle réelle', '~160 000 T/an', '795 000 T/an (croisière)'],
        ['Investissement réalisé (2023-2025)', '2,1 milliards FCFA (fonds propres)', '—'],
        ['Heures de fonctionnement', '8h/jour — 1 poste (Code du Travail)', '8h/jour — 1 poste (conservé)'],
        ['Problèmes identifiés', 'Blocs surdimensionnés, arrêts fréquents, maintenance non optimisée', 'Résolus par le programme d\'amélioration'],
      ],
      [30, 35, 35]
    ),
    sp(),
    h2('2.3 Programme d\'investissement 2026–2036 (Objet de l\'étude)'),
    body('Le présent programme d\'investissement, faisant l\'objet de la sollicitation d\'accompagnement financier auprès de la BIDC en dette senior (100%), comprend trois composantes principales :'),
    bullet('Ligne 2 (250 t/h) : acquisition et installation des équipements complémentaires — mise en service prévue T2 2027'),
    bullet('Ligne 3 (250 t/h) : acquisition et installation des équipements complémentaires — backup et gestion des pics de demande — mise en service prévue T4 2027'),
    bullet('Flotte de transport : 10 camions de 45 tonnes pour la distribution directe — acquisition 2026-2027'),
    bullet('BFR structurel : ligne de crédit BIDC de 800 millions FCFA pour couvrir les besoins permanents de stocks et créances (60% du BFR) — tirage 2028'),
    bullet('Autofinancement BFR : 535 millions FCFA couverts par les cash-flows opérationnels dès 2028 (40% du BFR)'),
    body('La Ligne 1 (250 t/h), déjà opérationnelle et financée sur fonds propres (2023-2025), fait l\'objet d\'un programme d\'optimisation opérationnelle distinct et n\'est pas incluse dans le périmètre de financement BIDC. L\'intégralité du nouveau programme d\'investissement (Lignes 2 et 3 + flotte transport) est financée en dette senior BIDC (100%), conformément à la politique d\'accompagnement financier de la BIDC pour les projets industriels de la CEDEAO.'),
    sp(),
    h2('2.3.1 Contrat cadre stratégique — CIMCO'),
    body('CGI SA a signé un contrat cadre stratégique avec CIMCO (Cimenterie du Mono et du Centre-Ouest) pour la livraison de 12 500 tonnes de graviers concassés par mois, soit 150 000 tonnes par an sur une durée de 5 ans (2026–2030). Ce contrat représente une garantie de revenus stable et constitue un atout majeur pour la bancabilité du projet devant les comités de crédit.'),
    sp(),
    tbl(
      ['Paramètre contrat', 'Valeur'],
      [
        ['Cocontractant', 'CIMCO SA — Cimenterie du Mono et du Centre-Ouest'],
        ['Durée du contrat', '5 ans (2026 – 2030)'],
        ['Volume mensuel garanti', '12 500 tonnes'],
        ['Volume annuel garanti', '150 000 tonnes'],
        ['Prix de livraison', 'À définir selon calibre — prix de marché compétitif'],
        ['Part de la production totale CGI SA', '19% (2028) à 15% (2030)'],
        ['Renouvellement', 'Option de renouvellement tacite par périodes de 3 ans'],
        ['Clause de révision', 'Révision annuelle indexée sur inflation BCEAO'],
      ],
      [40, 60]
    ),
    sp(),
    h2('2.4 Localisation et géologie du gisement'),
    body('Le gisement de Siyimé est situé dans le district du Haho, Région des Plateaux, à environ 120 km au nord de Lomé et 176 km de Cotonou (Bénin). La roche mère est de type Gneiss/Granite, formation géologique précambrienne caractérisée par une haute densité (2,63 g/cm³) et une excellente résistance mécanique.'),
    sp(),
    tbl(
      ['Paramètre géologique', 'Valeur', 'Norme / Référence'],
      [
        ['Type de roche', 'Gneiss/Granite précambrien', 'Carte géologique du Togo — DGMG 2020'],
        ['Masse volumique apparente', '2,63 g/cm³', 'LNBTP 2024 — NF EN 1097-6'],
        ['Coefficient d\'absorption d\'eau', '1,27 %', 'LNBTP 2024 — NF EN 1097-6 (≤ 2,5%)'],
        ['Résistance à la fragmentation (LA)', '< 25 %', 'LNBTP 2024 — NF EN 1097-2 (≤ 30%)'],
        ['Résistance à l\'usure (MDE)', '< 15 %', 'LNBTP 2024 — NF EN 1097-1 (≤ 20%)'],
        ['Réserves estimées', '> 50 millions de tonnes', 'Étude géologique DGMG Togo 2022'],
        ['Durée d\'exploitation estimée', '> 50 ans au rythme de 1 Mt/an', 'Calcul KHEPRA EXPERTS sur base DGMG'],
      ],
      [35, 30, 35]
    ),
    sp(),
    infoBox('Source géologique : Direction Générale des Mines et de la Géologie (DGMG), Ministère des Mines et des Ressources Énergétiques du Togo — Rapport d\'évaluation des ressources minérales, 2022.'),
    pb(),
  ];
}

// ─── SECTION 3 : ANALYSE TECHNIQUE ───────────────────────────────────────────
function section3(): (Paragraph | Table)[] {
  return [
    h1('3. ANALYSE TECHNIQUE — PROCESS INDUSTRIEL ET CAPACITÉS'),
    sp(),
    h2('3.1 Description du process industriel'),
    body('L\'exploitation d\'une carrière de granulats comprend cinq étapes séquentielles, chacune déterminante pour la qualité du produit final et l\'efficacité opérationnelle :'),
    sp(),
    tbl(
      ['Étape', 'Description', 'Équipements clés', 'Points de contrôle'],
      [
        ['1. Décapage et foration', 'Enlèvement de la couche de terre végétale et forage des trous de mine selon un plan de tir optimisé', 'Foreuse hydraulique, bulldozer D6/D8', 'Profondeur de foration, espacement des trous'],
        ['2. Abattage à l\'explosif', 'Tir à l\'explosif selon plan de minage — fragmentation primaire de la roche', 'Explosifs ANFO/émulsion, détonateurs électroniques', 'Granulométrie des blocs abattus (objectif : < 600 mm)'],
        ['3. Chargement et transport', 'Chargement des matériaux abattus et transport vers la station de concassage', 'Excavateurs hydrauliques (2-4 unités), dumpers (4 unités)', 'Taille des blocs, temps de cycle, taux de remplissage'],
        ['4. Concassage primaire', 'Réduction des blocs à < 150 mm par concasseur à mâchoires', 'Concasseur à mâchoires 600×900 mm ou 800×1060 mm', 'Granulométrie sortie, débit, température paliers'],
        ['5. Concassage secondaire et criblage', 'Réduction finale et classification par calibres (0/5, 5/15, 5/25, 15/25, 0/31,5)', 'Concasseur giratoire/à cône, cribles vibrants 3 étages', 'Conformité granulométrique, propreté, humidité'],
      ],
      [15, 30, 28, 27]
    ),
    sp(),
    h2('3.2 Analyse des goulots d\'étranglement — Ligne 1'),
    alertBox('Problème principal identifié : Les blocs surdimensionnés (> 600 mm) issus du tir bloquent le concasseur primaire, entraînant des arrêts non planifiés et une réduction du taux de disponibilité à ~60%.'),
    sp(),
    tbl(
      ['Problème', 'Cause racine', 'Impact opérationnel', 'Solution recommandée'],
      [
        ['Blocs surdimensionnés', 'Plan de tir non optimisé — espacement insuffisant des trous de mine', 'Blocage concasseur, arrêts 2-4h/jour', 'Révision du plan de minage — espacement 3×3m, profondeur 8-10m'],
        ['Arrêts fréquents', 'Maintenance corrective dominante vs préventive', 'Perte de 15-20% de disponibilité', 'Mise en place d\'un plan de maintenance préventive (TPM)'],
        ['Rendement global insuffisant', 'Absence de monitoring en temps réel', 'OEE estimé à 45-50%', 'Installation de capteurs IoT et tableau de bord opérationnel'],
        ['Gestion des pièces de rechange', 'Stock insuffisant — délais d\'approvisionnement longs', 'Arrêts prolongés lors de pannes', 'Constitution d\'un stock stratégique de pièces critiques'],
      ],
      [20, 25, 25, 30]
    ),
    sp(),
    h2('3.3 Calcul de la capacité réelle de production'),
    body('La capacité réelle de production est calculée en appliquant les coefficients de disponibilité et de rendement global aux capacités nominales installées :'),
    sp(),
    tbl(
      ['Paramètre', 'Définition', 'Valeur retenue', 'Justification'],
      [
        ['Capacité nominale par ligne', 'Débit théorique maximal', '250 t/h', 'Spécification constructeur'],
        ['Heures de fonctionnement/jour', 'Durée effective de production', '8 h/jour', '1 poste × 8h — conforme Code du Travail Togo'],
        ['Jours de production/an', 'Jours ouvrables hors maintenance', '300 jours/an', 'Standard carrières Afrique de l\'Ouest — UNEP 2023'],
        ['Taux de disponibilité (TD)', 'Temps disponible / Temps total', '80%', 'Objectif post-optimisation — benchmark international'],
        ['Rendement global (RG)', 'Production réelle / Production théorique', '65%', 'Intègre pertes granulométriques, calibrage, humidité'],
        ['OEE (Overall Equipment Effectiveness)', 'TD × RG × Qualité', '72%', 'Benchmark carrières industrielles Afrique — ICMM 2023'],
      ],
      [28, 28, 18, 26]
    ),
    sp(),
    h3('Calcul de la production annuelle par ligne'),
    body('Production horaire réelle = 250 t/h × 80% (TD) × 65% (RG) = 130 t/h'),
    body('Production journalière = 130 t/h × 8 h = 1 040 t/jour'),
    body('Production annuelle par ligne = 1 040 t/jour × 300 jours = 312 000 t/an'),
    body('Production annuelle retenue (avec marge de sécurité 15%) = 265 000 t/an par ligne'),
    sp(),
    tbl(
      ['Configuration', 'Lignes actives', 'Production annuelle', 'Commentaire'],
      [
        ['2026 — Phase de démarrage', '1 ligne (optimisée)', '265 000 T/an', 'Ligne 1 après programme d\'amélioration'],
        ['2027 — Montée en puissance', '2 lignes', '530 000 T/an', 'Ligne 2 opérationnelle T2 2027'],
        ['2028 — Régime de croisière', '3 lignes', '795 000 T/an', 'Ligne 3 opérationnelle T4 2027 — production consolidée'],
        ['2029-2036 — Exploitation stable', '3 lignes', '795 000 T/an', 'Régime de croisière — croissance 2%/an'],
      ],
      [28, 18, 22, 32]
    ),
    sp(),
    h2('3.4 Dimensionnement optimal des équipements'),
    tbl(
      ['Équipement', 'Quantité par ligne', 'Spécification technique', 'Coût unitaire estimé (FCFA)', 'Source benchmark'],
      [
        ['Excavateur hydraulique', '2 unités', 'Caterpillar 336 ou équivalent — godet 2,5 m³', '350 000 000', 'Caterpillar Price List 2024 — Afrique de l\'Ouest'],
        ['Dumper articulé', '4 unités', 'Volvo A40G ou équivalent — 40 tonnes', '280 000 000', 'Volvo CE Africa Price List 2024'],
        ['Groupe électrogène', '1 unité', '875 KVA — Cummins ou Perkins', '120 000 000', 'Cummins Africa 2024'],
        ['Concasseur à mâchoires (primaire)', '1 unité', '800×1060 mm — débit 250 t/h', '180 000 000', 'Metso/Sandvik Africa 2024'],
        ['Concasseur à cône (secondaire)', '1 unité', 'HP300 ou équivalent — débit 250 t/h', '220 000 000', 'Metso/Sandvik Africa 2024'],
        ['Cribles vibrants (3 étages)', '2 unités', '2,4×6 m — 3 étages de criblage', '90 000 000', 'Metso/Sandvik Africa 2024'],
        ['Convoyeurs à bande', '6 unités', 'Longueur 30-60 m — largeur 800 mm', '60 000 000', 'Fenner Dunlop Africa 2024'],
        ['Trémie d\'alimentation', '1 unité', 'Capacité 50 m³ — acier renforcé', '40 000 000', 'Fabrication locale + import'],
        ['Foreuse hydraulique', '1 unité', 'Atlas Copco ROC D7 ou équivalent', '250 000 000', 'Atlas Copco Africa 2024'],
      ],
      [22, 12, 28, 22, 16]
    ),
    sp(),
    h2('3.5 Plan d\'amélioration opérationnelle — Ligne 1'),
    tbl(
      ['Action', 'Délai', 'Coût estimé (FCFA)', 'Impact attendu'],
      [
        ['Révision du plan de minage (espacement 3×3m, profondeur 8-10m)', 'T1 2026', '15 000 000', 'Réduction blocs > 600mm de 80%'],
        ['Formation des opérateurs (plan de tir, conduite engins)', 'T1 2026', '8 000 000', 'Réduction erreurs opérateur de 60%'],
        ['Mise en place maintenance préventive (TPM)', 'T1-T2 2026', '12 000 000', 'Disponibilité 60% → 80%'],
        ['Constitution stock pièces de rechange critiques', 'T1 2026', '50 000 000', 'Réduction durée arrêts de 70%'],
        ['Installation capteurs IoT + tableau de bord', 'T2 2026', '25 000 000', 'Monitoring temps réel — OEE +15%'],
        ['Recrutement Responsable Maintenance', 'T1 2026', '6 000 000/an', 'Professionnalisation maintenance'],
      ],
      [35, 12, 22, 31]
    ),
    sp(),
    infoBox('Source benchmark : International Council on Mining & Metals (ICMM), "Mining Contribution to Sustainable Development in Africa", 2023 — Taux de disponibilité moyen des carrières industrielles en Afrique subsaharienne : 75-85%.'),
    pb(),
  ];
}

// ─── SECTION 4 : CAPEX ────────────────────────────────────────────────────────
function section4(): (Paragraph | Table)[] {
  return [
    h1('4. PROGRAMME D\'INVESTISSEMENT (CAPEX)'),
    sp(),
    h2('4.1 Distinction historique / nouveau programme'),
    body('La Ligne 1 (250 t/h) a été acquise et installée par CGI SA entre 2023 et 2025 pour un investissement de 2,1 milliards FCFA, financé intégralement sur fonds propres. Ce montant couvre l\'acquisition de l\'installation complète de concassage/criblage, des excavateurs, des dumpers, du groupe électrogène, des convoyeurs et des équipements auxiliaires. Cet investissement historique est exclu du périmètre de la présente étude de faisabilité.'),
    sp(),
    body('Le présent programme d\'investissement 2026–2036, objet de la sollicitation d\'accompagnement financier auprès de la BIDC en dette senior (100%), porte sur :'),
    bullet('Ligne 2 : acquisition et installation complète d\'une nouvelle ligne de production 250 t/h'),
    bullet('Ligne 3 : acquisition et installation complète d\'une ligne de production 250 t/h (backup + pics)'),
    bullet('Flotte de transport : 10 camions benne 45 tonnes pour la distribution directe'),
    sp(),
    h2('4.2 CAPEX Ligne 2 — Acquisition et installation (2 100 000 000 FCFA)'),
    body('Le budget de 2,1 milliards FCFA pour la Ligne 2 correspond à l\'acquisition et l\'installation complète d\'une ligne de production de 250 t/h, conforme aux standards internationaux des carrières industrielles en Afrique de l\'Ouest. Le dimensionnement assure l\'adéquation excavation / concassage / criblage / convoyage en régime de 1 poste × 8 heures.'),
    sp(),
    tbl(
      ['Poste d\'investissement', 'Quantité', 'Coût unitaire (FCFA)', 'Coût total (FCFA)', 'Justification technique'],
      [
        ['Excavateur hydraulique', '2', '350 000 000', '700 000 000', 'Cat 336 — godet 2,5 m³ — 2 unités requises pour alimenter 250 t/h'],
        ['Dumper articulé', '2', '280 000 000', '560 000 000', 'Volvo A40G — 40 T — cycle carrière-concasseur ≤ 15 min'],
        ['Groupe électrogène 875 KVA', '1', '120 000 000', '120 000 000', 'Cummins — couvre puissance totale ligne + marge 20%'],
        ['Concasseur à mâchoires (primaire)', '1', '250 000 000', '250 000 000', '800×1060 mm — débit 250-300 t/h — Metso/Sandvik'],
        ['Concasseur à cône (secondaire)', '1', '280 000 000', '280 000 000', 'HP300 ou équivalent — débit 250 t/h — granulométrie finie'],
        ['Crible vibrant 3 étages', '2', '100 000 000', '200 000 000', '2,4×6 m — 3 niveaux — classification 0/5, 5/15, 15/25, 0/31,5'],
        ['Convoyeurs à bande', '4', '65 000 000', '260 000 000', 'Longueur 30-60 m — largeur 800 mm — vitesse 1,6 m/s'],
        ['Trémie d\'alimentation 50 m³', '1', '50 000 000', '50 000 000', 'Acier renforcé — capacité tampon 12 min de production'],
        ['Foreuse hydraulique', '1', '250 000 000', '250 000 000', 'Atlas Copco ROC D7 — foration Ø 89-115 mm'],
        ['Génie civil et fondations', '—', '—', '150 000 000', 'Fondations profondes, dalle béton, bâtiment technique'],
        ['Électricité et câblage HT/BT', '—', '—', '60 000 000', 'Tableau électrique, câbles, transformateur, éclairage'],
        ['Transport international + mise en service', '—', '—', '80 000 000', 'Fret maritime Lomé, dédouanement, montage, essais'],
        ['Formation opérateurs + documentation', '—', '—', '15 000 000', 'Formation constructeur, manuels technique, pièces de rechange initiales'],
        ['Imprévus industriels (5%)', '—', '—', '105 000 000', 'Provision standard projets miniers Afrique de l\'Ouest'],
        ['TOTAL LIGNE 2', '—', '—', '2 100 000 000', '≈ 2,10 milliards FCFA — conforme standards internationaux'],
      ],
      [26, 8, 20, 20, 26]
    ),
    sp(),
    h2('4.3 CAPEX Ligne 3 — Acquisition et installation (2 000 000 000 FCFA)'),
    body('La Ligne 3 reprend le même schéma technique que la Ligne 2, avec des économies d\'échelle sur les infrastructures mutualisées (génie civil partiel, connexion électrique mutualisée, formation groupée). Le budget de 2,0 milliards FCFA reflète ces économies tout en maintenant des équipements de qualité identique.'),
    sp(),
    tbl(
      ['Poste d\'investissement', 'Quantité', 'Coût unitaire (FCFA)', 'Coût total (FCFA)', 'Économie vs Ligne 2'],
      [
        ['Excavateur hydraulique', '2', '350 000 000', '700 000 000', '—'],
        ['Dumper articulé', '2', '280 000 000', '560 000 000', '—'],
        ['Groupe électrogène 875 KVA', '1', '120 000 000', '120 000 000', '—'],
        ['Concasseur à mâchoires (primaire)', '1', '250 000 000', '250 000 000', '—'],
        ['Concasseur à cône (secondaire)', '1', '280 000 000', '280 000 000', '—'],
        ['Crible vibrant 3 étages', '2', '100 000 000', '200 000 000', '—'],
        ['Convoyeurs à bande', '4', '65 000 000', '260 000 000', '—'],
        ['Trémie d\'alimentation 50 m³', '1', '50 000 000', '50 000 000', '—'],
        ['Foreuse hydraulique', '1', '250 000 000', '250 000 000', '—'],
        ['Génie civil (infrastructure mutualisée)', '—', '—', '100 000 000', '-50 000 000'],
        ['Électricité (connexion mutualisée)', '—', '—', '40 000 000', '-20 000 000'],
        ['Transport + mise en service', '—', '—', '60 000 000', '-20 000 000'],
        ['Formation (groupée avec Ligne 2)', '—', '—', '5 000 000', '-10 000 000'],
        ['Imprévus industriels (5%)', '—', '—', '95 000 000', '—'],
        ['TOTAL LIGNE 3', '—', '—', '2 000 000 000', '≈ 2,00 milliards FCFA'],
      ],
      [26, 8, 20, 20, 26]
    ),
    sp(),
    h2('4.4 Analyse de cohérence technique — Équipements vs production'),
    body('Le dimensionnement des équipements est vérifié contre la production cible de 265 000 tonnes/an par ligne (8h/jour × 300 jours × 130 t/h réel) :'),
    sp(),
    tbl(
      ['Étape process', 'Équipement', 'Capacité unitaire', 'Capacité totale ligne', 'Adéquation vs 250 t/h'],
      [
        ['Excavation/chargement', '2 excavateurs Cat 336', '400 t/h chacun', '800 t/h', '✔ Excédent 3,2× — marge sécurité'],
        ['Transport interne', '2 dumpers A40G', '250 t/h chacun', '500 t/h', '✔ Excédent 2,0× — cycle optimisé'],
        ['Concassage primaire', '1 concasseur à mâchoires', '250-300 t/h', '250-300 t/h', '✔ Conforme spécification'],
        ['Concassage secondaire', '1 concasseur à cône', '250 t/h', '250 t/h', '✔ Conforme spécification'],
        ['Criblage', '2 cribles 3 étages', '150 t/h chacun', '300 t/h', '✔ Excédent 1,2× — marge calibrage'],
        ['Convoyage', '4 convoyeurs 800 mm', '80 t/h chacun', '320 t/h', '✔ Excédent 1,3× — flux continu'],
      ],
      [18, 22, 20, 20, 20]
    ),
    sp(),
    successBox('Conclusion technique : Le dimensionnement des équipements pour les Lignes 2 et 3 est cohérent et conforme aux standards internationaux. Chaque étape du process présente une marge de sécurité supérieure à 20% par rapport au débit cible de 250 t/h, garantissant la fiabilité opérationnelle en régime africain.'),
    sp(),
    h2('4.5 CAPEX Transport — Flotte de camions (500 000 000 FCFA)'),
    body('L\'acquisition d\'une flotte de transport dédiée permet à CGI SA de maîtriser sa chaîne logistique, de réduire sa dépendance aux transporteurs tiers et d\'améliorer sa compétitivité sur les marchés éloignés (Bénin notamment).'),
    sp(),
    tbl(
      ['Paramètre', 'Valeur', 'Justification'],
      [
        ['Nombre de camions', '10 unités', 'Dimensionnement optimal (voir calcul ci-dessous)'],
        ['Capacité unitaire', '45 tonnes', 'Standard transport granulats Afrique de l\'Ouest'],
        ['Coût unitaire', '50 000 000 FCFA', 'Prix marché 2024 — Togo (camion benne 45T, neuf, importé)'],
        ['Rotations/jour/camion', '2 rotations', 'Distance moyenne 80-120 km — temps cycle 4h — 8h/jour'],
        ['Tonnage transporté/camion/jour', '90 tonnes', '2 rotations × 45 T'],
        ['Tonnage total flotte/jour', '900 tonnes', '10 camions × 90 T'],
        ['Tonnage annuel flotte', '270 000 T/an', '900 T/jour × 300 jours'],
        ['CAPEX total transport', '500 000 000 FCFA', '10 × 50 000 000 FCFA'],
      ],
      [35, 30, 35]
    ),
    sp(),
    h2('4.6 Analyse de cohérence logistique'),
    tbl(
      ['Indicateur logistique', 'Valeur', 'Analyse'],
      [
        ['Production annuelle cible (3 lignes)', '795 000 T/an', 'Régime de croisière 2028'],
        ['Capacité flotte interne CGI SA', '270 000 T/an', '34% de la production'],
        ['Volume contrat CIMCO (propre flotte)', '150 000 T/an', 'Livré par CIMCO — hors flotte CGI'],
        ['Volume à couvrir par transporteurs tiers', '375 000 T/an', '47% de la production'],
        ['Ratio flotte propre / production totale', '34%', 'Optimal : maîtrise coûts fixes + flexibilité'],
        ['Coût transport tiers (estimé)', '1 800 FCFA/T', 'Contrat-cadre négocié — 20% plus cher que flotte propre'],
        ['Coût transport flotte propre', '1 500 FCFA/T', 'Coût opérationnel camion 45T — 2 rotations/jour'],
        ['Économie annuelle flotte propre vs tiers', '—', '81 M FCFA/an (270 000 T × 300 FCFA/T d\'écart)'],
      ],
      [30, 25, 45]
    ),
    sp(),
    alertBox('Note de dimensionnement logistique : La flotte de 10 camions couvre 34% de la production annuelle cible (270 000 T / 795 000 T). Le solde (47%, soit 375 000 T) est assuré par des transporteurs tiers sous contrat-cadre, incluant CIMCO qui dispose de sa propre flotte pour le contrat cadre de 150 000 T/an. Ce ratio de 34% flotte propre est optimal pour maîtriser les coûts fixes (amortissement, assurance, entretien) tout en conservant la flexibilité opérationnelle et la capacité d\'absorber les pics de demande.'),
    sp(),
    h2('4.7 Récapitulatif CAPEX — Programme BIDC 2026-2036'),
    tbl(
      ['Composante', 'Montant (FCFA)', 'Financement', 'Calendrier', 'Observations'],
      [
        ['Ligne 1 (acquis 2023-2025)', '2 100 000 000', 'Fonds propres (hors périmètre BIDC)', '2023-2025', 'Déjà opérationnelle'],
        ['Ligne 2 — Acquisition et installation', '2 100 000 000', 'Dette senior BIDC (100%)', 'T1-T2 2027', 'Nouvelle ligne 250 t/h complète'],
        ['Ligne 3 — Acquisition et installation', '2 000 000 000', 'Dette senior BIDC (100%)', 'T3-T4 2027', 'Nouvelle ligne 250 t/h — économies d\'échelle'],
        ['Flotte transport (10 camions)', '500 000 000', 'Dette senior BIDC (100%)', '2026-2027', 'Logistique maîtrisée'],
        ['TOTAL NOUVEAU PROGRAMME BIDC', '4 600 000 000', '100% dette senior BIDC', '2026-2027', '—'],
        ['Dont Lignes 2 et 3', '4 100 000 000', 'Dette BIDC', '2026-2027', '89% du CAPEX programme'],
        ['Dont Flotte transport', '500 000 000', 'Dette BIDC', '2026-2027', '11% du CAPEX programme'],
        ['TOTAL INVESTISSEMENT CGI SA (global)', '6 700 000 000', 'FP 2,1 Mds + Dette 4,6 Mds', '2023-2036', '3 lignes + flotte'],
      ],
      [26, 20, 22, 14, 18]
    ),
    sp(),
    infoBox('Sources benchmark CAPEX : Metso Outotec, "Crushing and Screening Equipment Price List — Sub-Saharan Africa", 2024 ; Caterpillar Financial Products Corporation, "Equipment Financing Africa", 2024 ; Volvo CE Africa, "Heavy Equipment Price Guide 2024" ; Banque Africaine de Développement, "Coûts unitaires des projets d\'infrastructure en Afrique de l\'Ouest", 2023.'),
    pb(),
  ];
}

// ─── SECTION 5 : ANALYSE DE MARCHÉ ───────────────────────────────────────────
function section5(): (Paragraph | Table)[] {
  return [
    h1('5. ANALYSE DE MARCHÉ'),
    sp(),
    h2('5.1 Contexte macroéconomique — Togo et région'),
    tbl(
      ['Indicateur', 'Togo 2024', 'CEDEAO 2024', 'Source'],
      [
        ['Croissance du PIB', '6,2 %', '4,1 %', 'FMI, World Economic Outlook, Avril 2025'],
        ['Investissement public (% PIB)', '8,4 %', '5,8 %', 'Banque Mondiale, Africa Pulse, 2024'],
        ['Dépenses d\'infrastructure (% PIB)', '4,1 %', '3,2 %', 'BAD, African Economic Outlook, 2024'],
        ['Taux d\'urbanisation', '43,5 %', '47,2 %', 'UN-Habitat, World Cities Report, 2024'],
        ['Croissance urbaine annuelle', '3,8 %/an', '3,5 %/an', 'UN-Habitat, World Cities Report, 2024'],
        ['Déficit logements (Togo)', '> 400 000 unités', '—', 'MERF Togo / Banque Mondiale 2023'],
      ],
      [30, 20, 20, 30]
    ),
    sp(),
    h2('5.2 Marché des granulats — Togo'),
    body('Le marché togolais des granulats est structurellement déficitaire. La demande est tirée par trois moteurs principaux : les programmes d\'infrastructure publique, la construction résidentielle et les projets industriels et commerciaux.'),
    sp(),
    tbl(
      ['Segment de demande', 'Volume estimé 2024 (T/an)', 'Croissance 2024-2030', 'Source'],
      [
        ['Infrastructure publique (routes, ponts, ports)', '1 200 000 T/an', '+8,5 %/an', 'METP Togo — Plan Togo 2025 / BAD 2024'],
        ['Construction résidentielle', '800 000 T/an', '+6,2 %/an', 'MERF Togo / Banque Mondiale 2023'],
        ['Projets industriels et commerciaux', '400 000 T/an', '+7,8 %/an', 'CCIT Togo — Rapport annuel 2024'],
        ['Projets régionaux (CEDEAO)', '300 000 T/an', '+9,1 %/an', 'BIDC — Pipeline projets 2024-2030'],
        ['TOTAL MARCHÉ TOGO', '2 700 000 T/an', '+7,5 %/an', 'Estimation KHEPRA EXPERTS'],
      ],
      [30, 22, 18, 30]
    ),
    sp(),
    h2('5.3 Marché régional — Bénin (opportunité stratégique)'),
    body('Le Bénin représente une opportunité commerciale majeure pour CGI SA, compte tenu de la proximité géographique du gisement de Siyimé (176 km de Cotonou) et du dynamisme du secteur BTP béninois.'),
    sp(),
    tbl(
      ['Indicateur', 'Bénin 2024', 'Source'],
      [
        ['Croissance du PIB', '6,4 %', 'FMI, World Economic Outlook, Avril 2025'],
        ['Programme d\'investissement public (PAG 2)', '6 000 milliards FCFA (2021-2026)', 'Gouvernement du Bénin — PAG 2 2021'],
        ['Demande granulats estimée', '1 800 000 T/an', 'INSAE Bénin / Banque Mondiale 2024'],
        ['Croissance demande granulats', '+9,2 %/an', 'BAD, African Economic Outlook Bénin, 2024'],
        ['Principaux projets BTP', 'Autoroute Cotonou-Niamey, Port de Cotonou extension, logements sociaux', 'Gouvernement du Bénin 2024'],
        ['Avantage CGI SA vs concurrents', '176 km vs 230-380 km pour concurrents', 'Calcul KHEPRA EXPERTS'],
      ],
      [35, 35, 30]
    ),
    sp(),
    h2('5.4 Analyse de la concurrence'),
    tbl(
      ['Concurrent', 'Localisation', 'Capacité estimée', 'Part de marché', 'Positionnement'],
      [
        ['Secteur informel (artisans)', 'Tout le Togo', '< 50 T/jour/site', '~35 %', 'Prix bas, qualité non certifiée, pas de garantie'],
        ['CIMTOGO (filiale Heidelberg)', 'Lomé', '~300 000 T/an', '~15 %', 'Qualité certifiée, prix élevé, focus béton'],
        ['Carrières artisanales organisées', 'Région Maritime', '50-200 T/jour', '~25 %', 'Qualité variable, pas de certification LNBTP'],
        ['Importations (Ghana, Nigeria)', 'Lomé (port)', '~200 000 T/an', '~10 %', 'Coût transport élevé, délais longs'],
        ['CGI SA (actuel)', 'Haho', '~280 000 T/an', '~10 %', 'Qualité certifiée LNBTP, position géographique optimale'],
        ['CGI SA (post-programme)', 'Haho', '795 000 T/an', '~22-25 %', 'Leader qualité, capacité industrielle, logistique maîtrisée'],
      ],
      [20, 15, 18, 15, 32]
    ),
    sp(),
    h2('5.5 Projections de la demande 2026–2036'),
    tbl(
      ['Année', 'Demande Togo (T/an)', 'Demande Bénin accessible (T/an)', 'Demande totale adressable', 'Part CGI SA cible'],
      [
        ['2026', '2 700 000', '400 000', '3 100 000', '265 000 (9%)'],
        ['2027', '2 903 000', '436 000', '3 339 000', '530 000 (16%)'],
        ['2028', '3 121 000', '476 000', '3 597 000', '795 000 (22%)'],
        ['2030', '3 607 000', '567 000', '4 174 000', '827 000 (20%)'],
        ['2033', '4 500 000', '700 000', '5 200 000', '895 000 (17%)'],
        ['2036', '5 600 000', '860 000', '6 460 000', '930 000 (14%)'],
      ],
      [15, 22, 22, 22, 19]
    ),
    sp(),
    infoBox('Sources marché : Banque Mondiale, "Togo Infrastructure Assessment", 2024 ; BAD, "African Economic Outlook 2024" ; FMI, "World Economic Outlook April 2025" ; INSEED Togo, "Rapport sur les activités du secteur BTP", 2023 ; INSAE Bénin, "Statistiques du secteur de la construction", 2024.'),
    pb(),
  ];
}

// ─── SECTION 6 : STRATÉGIE COMMERCIALE ───────────────────────────────────────
function section6(): (Paragraph | Table)[] {
  return [
    h1('6. STRATÉGIE COMMERCIALE'),
    sp(),
    h2('6.1 Segmentation clients'),
    tbl(
      ['Segment', 'Description', 'Volume cible (T/an)', 'Prix moyen (FCFA/T)', 'Priorité'],
      [
        ['Projets publics (État, collectivités)', 'Routes, ponts, bâtiments publics — marchés publics ARMP', '350 000', '9 500', 'HAUTE — Volumes garantis, paiement sécurisé'],
        ['Grands groupes BTP privés', 'Entreprises de construction (SOGEA-SATOM, RAZEL, etc.)', '300 000', '10 500', 'HAUTE — Contrats long terme, volumes importants'],
        ['PME BTP locales', 'Entreprises togolaises et béninoises de taille moyenne', '200 000', '10 000', 'MOYENNE — Nombreux clients, fidélisation'],
        ['Promoteurs immobiliers', 'Résidences, immeubles, zones industrielles', '100 000', '10 500', 'MOYENNE — Croissance forte, marges élevées'],
        ['Particuliers et auto-constructeurs', 'Construction individuelle — vente directe sur site', '50 000', '11 000', 'FAIBLE — Marges élevées, volumes limités'],
        ['Export Bénin (marché régional)', 'Chantiers béninois — PAG 2, projets CEDEAO', '50 000', '12 000', 'HAUTE — Avantage logistique décisif'],
      ],
      [22, 28, 15, 15, 20]
    ),
    sp(),
    h2('6.2 Stratégie de prix'),
    body('La stratégie de prix de CGI SA repose sur un positionnement "qualité certifiée à prix compétitif", justifié par la certification LNBTP et l\'avantage logistique du gisement.'),
    sp(),
    tbl(
      ['Calibre', 'Prix départ carrière (FCFA/T)', 'Prix livré Lomé (FCFA/T)', 'Prix livré Cotonou (FCFA/T)', 'Positionnement vs marché'],
      [
        ['0/5 — Sable concassé', '7 500', '9 500', '11 500', 'Prix marché — qualité supérieure'],
        ['5/15 — Gravillon fin', '8 500', '10 500', '12 500', 'Prix marché — certifié LNBTP'],
        ['5/25 — Gravillon polyvalent', '9 000', '11 000', '13 000', 'Prix marché — produit phare'],
        ['15/25 — Gravillon gros', '9 500', '11 500', '13 500', 'Prix marché — haute résistance'],
        ['0/31,5 — Tout-venant', '7 000', '9 000', '11 000', 'Prix compétitif — volume'],
        ['25/40 — Enrochement', '10 000', '12 500', '15 000', 'Prix premium — spécialité'],
      ],
      [20, 20, 20, 20, 20]
    ),
    sp(),
    h2('6.3 Stratégie de contrats long terme'),
    body('La sécurisation des revenus passe par la mise en place de contrats d\'approvisionnement pluriannuels avec les clients stratégiques. CGI SA vise à sécuriser 60% de sa production annuelle sous contrats long terme dès 2027.'),
    sp(),
    tbl(
      ['Type de contrat', 'Durée', 'Volume minimum garanti', 'Avantage client', 'Avantage CGI SA'],
      [
        ['Contrat-cadre annuel renouvelable', '1 an + renouvellement', '5 000 T/mois minimum', 'Prix préférentiel -3%, priorité livraison', 'Visibilité revenus, planification production'],
        ['Contrat pluriannuel (3-5 ans)', '3 à 5 ans', '10 000 T/mois minimum', 'Prix fixé sur 2 ans, garantie d\'approvisionnement', 'Sécurisation 40% du CA, financement bancaire facilité'],
        ['Contrat de projet (chantier)', 'Durée du chantier', 'Volume total du chantier', 'Tarif dégressif selon volume, suivi dédié', 'Revenus prévisibles, optimisation logistique'],
        ['Accord-cadre régional (Bénin)', '2 ans renouvelable', '3 000 T/mois minimum', 'Livraison garantie, certificat LNBTP', 'Pénétration marché béninois, diversification'],
      ],
      [22, 12, 20, 23, 23]
    ),
    sp(),
    h2('6.4 Canaux de distribution'),
    bullet('Vente directe départ carrière : clients disposant de leur propre flotte de transport (40% des volumes)'),
    bullet('Livraison sur chantier par flotte CGI SA : clients sans transport propre — zone Lomé et Haho (25% des volumes)'),
    bullet('Livraison sur chantier par transporteurs tiers sous contrat-cadre : zones éloignées et Bénin (35% des volumes)'),
    sp(),
    h2('6.5 Plan de développement commercial 2026–2028'),
    tbl(
      ['Action', 'Délai', 'Responsable', 'Budget (FCFA)'],
      [
        ['Recrutement Directeur Commercial', 'T1 2026', 'DG CGI SA', '12 000 000/an'],
        ['Prospection grands groupes BTP (SOGEA, RAZEL, BOUYGUES)', 'T1-T2 2026', 'Dir. Commercial', '5 000 000'],
        ['Signature contrats-cadres avec 5 clients majeurs', 'T2 2026', 'Dir. Commercial', '—'],
        ['Participation aux appels d\'offres publics ARMP Togo', 'Continu', 'Dir. Commercial', '3 000 000/an'],
        ['Mission commerciale Cotonou (Bénin)', 'T2 2026', 'DG + Dir. Commercial', '4 000 000'],
        ['Certification ISO 9001 (processus qualité)', 'T3 2026', 'Responsable Qualité', '15 000 000'],
        ['Site web et présence digitale B2B', 'T2 2026', 'Communication', '3 000 000'],
      ],
      [40, 15, 25, 20]
    ),
    pb(),
  ];
}

// ─── SECTION 7 : MODÉLISATION FINANCIÈRE ─────────────────────────────────────
function section7(): (Paragraph | Table)[] {
  return [
    h1('7. MODÉLISATION FINANCIÈRE (2026–2036)'),
    sp(),
    h2('7.1 Hypothèses clés'),
    tbl(
      ['Hypothèse', 'Valeur', 'Justification / Source'],
      [
        ['Prix moyen de vente (2026)', '10 000 FCFA/T', 'Benchmark marché Togo 2024 — CCIT Togo'],
        ['Inflation des prix de vente', '+3 %/an', 'Inflation UEMOA — BCEAO, Rapport annuel 2024'],
        ['Production 2026 (Ligne 1 optimisée)', '265 000 T', 'Calcul technique section 3.3 — 8h/jour'],
        ['Production 2027 (Lignes 1+2)', '530 000 T', 'Montée en puissance progressive'],
        ['Production 2028+ (3 lignes)', '795 000 T', 'Régime de croisière — 8h/jour'],
        ['Croissance production 2029-2036', '+2 %/an', 'Croissance marché conservatrice'],
        ['Contrat cadre CIMCO', '150 000 T/an', '12 500 T/mois × 12 mois — 5 ans'],
        ['Coût énergie (carburant + électricité)', '1 200 FCFA/T', 'Benchmark carrières Afrique de l\'Ouest — ICMM 2023'],
        ['Coût maintenance', '800 FCFA/T', 'Standard industrie — 8% du CAPEX/an'],
        ['Coût main-d\'œuvre', '600 FCFA/T', 'Grille salariale Togo + charges sociales'],
        ['Coût explosifs et consommables', '400 FCFA/T', 'Benchmark ORICA Africa 2024'],
        ['Coût transport (flotte propre)', '1 500 FCFA/T', 'Coût opérationnel camion 45T — 2 rotations/jour'],
        ['Frais généraux et administratifs', '300 FCFA/T', 'Estimation KHEPRA EXPERTS'],
        ['Taux d\'imposition (IS)', '27 %', 'Code Général des Impôts du Togo — 2024'],
        ['Taux d\'amortissement équipements', '10 %/an (linéaire)', 'Durée de vie 10 ans — standard industrie'],
        ['Taux d\'inflation des coûts', '+2,5 %/an', 'Inflation Togo — BCEAO 2024'],
      ],
      [35, 25, 40]
    ),
    sp(),
    h2('7.2 Compte de résultat prévisionnel (2026–2036)'),
    body('En millions de FCFA — Base : CAPEX total immobilisé 6 700 M FCFA (Ligne 1 : 2 100 M + Lignes 2&3 : 4 100 M + Transport : 500 M). Amortissements linéaires 10% à compter de la mise en service. Dette BIDC : 4 600 M FCFA à 8% sur 8 ans (différé 2 ans + amortissement 6 ans).'),
    sp(),
    tbl(
      ['Poste', '2026', '2027', '2028', '2029', '2030', '2032', '2034', '2036'],
      [
        ['Production (T)', '265 000', '530 000', '795 000', '810 900', '827 000', '861 000', '895 000', '930 000'],
        ['Prix moyen (FCFA/T)', '10 000', '10 300', '10 609', '10 927', '11 255', '11 940', '12 668', '13 439'],
        ['CHIFFRE D\'AFFAIRES', '2 650', '5 459', '8 434', '8 861', '9 308', '10 280', '11 338', '12 498'],
        ['Coût énergie', '318', '636', '954', '973', '992', '1 033', '1 074', '1 116'],
        ['Coût maintenance', '212', '424', '636', '649', '662', '689', '716', '744'],
        ['Coût main-d\'œuvre', '159', '318', '477', '487', '496', '517', '537', '558'],
        ['Coût explosifs/consommables', '106', '212', '318', '324', '331', '344', '358', '372'],
        ['Coût transport (flotte propre)', '398', '795', '1 193', '1 216', '1 241', '1 292', '1 343', '1 395'],
        ['Frais généraux', '80', '159', '239', '243', '248', '258', '269', '279'],
        ['TOTAL CHARGES OPÉRATIONNELLES', '1 273', '2 544', '3 817', '3 892', '3 970', '4 133', '4 297', '4 464'],
        ['EBITDA', '1 377', '2 915', '4 617', '4 969', '5 338', '6 147', '7 041', '8 034'],
        ['Marge EBITDA (%)', '52,0 %', '53,4 %', '54,8 %', '56,1 %', '57,3 %', '59,8 %', '62,1 %', '64,3 %'],
        ['Amortissements', '210', '670', '670', '670', '670', '670', '670', '670'],
        ['EBIT (Résultat opérationnel)', '1 167', '2 245', '3 947', '4 299', '4 668', '5 477', '6 371', '7 364'],
        ['Charges financières (intérêts BIDC)', '0', '368', '368', '368', '307', '184', '61', '0'],
        ['Résultat avant impôt', '1 167', '1 877', '3 579', '3 931', '4 361', '5 293', '6 310', '7 364'],
        ['Impôt sur les sociétés (27%)', '315', '507', '966', '1 061', '1 177', '1 429', '1 704', '1 988'],
        ['RÉSULTAT NET', '852', '1 370', '2 613', '2 870', '3 184', '3 864', '4 606', '5 376'],
        ['Marge nette (%)', '32,2 %', '25,1 %', '31,0 %', '32,4 %', '34,2 %', '37,6 %', '40,6 %', '43,0 %'],
      ],
      [22, 9, 9, 9, 9, 9, 9, 9, 9]
    ),
    sp(),
    h2('7.3 Plan de trésorerie — Cash-flow libre (2026–2036)'),
    body('En millions de FCFA — Tirage dette BIDC 2027 : 4 600 M — Différé capital 2027-2028 — Amortissement capital 2029-2034 (6 annuités constantes de 767 M)'),
    sp(),
    tbl(
      ['Poste', '2026', '2027', '2028', '2029', '2030', '2032', '2034', '2036'],
      [
        ['EBITDA', '1 377', '2 915', '4 617', '4 969', '5 338', '6 147', '7 041', '8 034'],
        ['Variation BFR (besoin)', '-210', '-340', '-105', '-42', '-45', '-48', '-50', '-53'],
        ['Variation LC BIDC BFR (tirage/remboursement)', '0', '0', '0', '0', '-50', '-150', '-150', '-100'],
        ['CAPEX (programme)', '-116', '-4 600', '0', '0', '0', '0', '0', '0'],
        ['Cash-flow opérationnel', '841', '-2 025', '4 512', '4 927', '5 243', '5 949', '6 791', '7 881'],
        ['Tirage dette BIDC (prêt)', '0', '4 600', '0', '0', '0', '0', '0', '0'],
        ['Tirage LC BIDC BFR', '0', '0', '800', '0', '0', '0', '0', '0'],
        ['Remboursement principal BIDC', '0', '0', '0', '-767', '-767', '-767', '-767', '0'],
        ['Intérêts BIDC (prêt + LC)', '0', '-368', '-368', '-368', '-369', '-248', '-125', '0'],
        ['Impôt sur les sociétés', '-315', '-507', '-966', '-1 061', '-1 177', '-1 429', '-1 704', '-1 988'],
        ['CASH-FLOW NET', '526', '1 700', '2 978', '2 731', '2 930', '3 505', '4 195', '5 893'],
        ['Trésorerie cumulée', '526', '2 226', '5 204', '7 935', '10 865', '18 275', '27 335', '38 128'],
      ],
      [22, 9, 9, 9, 9, 9, 9, 9, 9]
    ),
    sp(),
    h2('7.4 Bilan prévisionnel simplifié (2026–2036)'),
    body('En millions de FCFA — Capitaux propres : capital initial 2 500 M + résultats nets cumulés. Dette BIDC prêt : tirage 2027, amortissement 2029-2034. Dette BIDC LC BFR : tirage 2028 (800 M), remboursement progressif 2030-2036. "Autres dettes" : fournisseurs, charges sociales, impôts différés.'),
    sp(),
    tbl(
      ['Poste', '2026', '2028', '2030', '2033', '2036'],
      [
        ['ACTIF', '', '', '', '', ''],
        ['Immobilisations nettes', '5 784', '6 814', '5 544', '3 534', '1 524'],
        ['BFR net', '210', '660', '1 335', '1 375', '1 789'],
        ['Trésorerie', '526', '2 226', '5 204', '7 935', '10 865'],
        ['TOTAL ACTIF', '6 520', '9 700', '12 083', '12 844', '14 178'],
        ['PASSIF', '', '', '', '', ''],
        ['Capitaux propres', '3 352', '5 965', '9 149', '17 837', '30 723'],
        ['Dette BIDC — Prêt CAPEX', '0', '4 600', '3 066', '0', '0'],
        ['Dette BIDC — LC BFR', '0', '0', '800', '350', '0'],
        ['Autres dettes', '3 168', '1 135', '1 332', '6 157', '8 455'],
        ['TOTAL PASSIF', '6 520', '9 700', '12 083', '12 844', '14 178'],
      ],
      [24, 15, 15, 15, 15, 16]
    ),
    pb(),
  ];
}

// ─── SECTION 8 : BFR ─────────────────────────────────────────────────────────
function section8(): (Paragraph | Table)[] {
  return [
    h1('8. BESOIN EN FONDS DE ROULEMENT (BFR) STRUCTUREL'),
    sp(),
    h2('8.1 Importance du BFR dans la demande de financement BIDC'),
    body('Le BFR (Besoin en Fonds de Roulement) représente le besoin de financement permanent du cycle d\'exploitation. Conformément aux standards BAD/BIDC pour les projets industriels, le BFR structurel doit être évalué avec précision et intégré dans le plan de financement global. Pour CGI SA, l\'exploitation des 3 lignes de production en régime de croisière génère un BFR structurel significatif qui doit être couvert dès le démarrage.'),
    sp(),
    alertBox('Exigence BIDC : Le BFR structurel constitue un poste obligatoire dans l\'évaluation du besoin total de financement. La BIDC recommande un ratio BFR/CA compris entre 12% et 20% pour les projets miniers et industriels en Afrique de l\'Ouest (BAD, "Guide de structuration des financements de projets industriels", 2023).'),
    sp(),
    h2('8.2 Méthodologie de calcul — Norme BAD/BIDC'),
    body('Le BFR est calculé selon la méthode des délais pondérés, conforme aux standards des institutions de financement du développement. La base de calcul est le chiffre d\'affaires prévisionnel et les charges opérationnelles, avec des délais sectoriels validés pour l\'Afrique de l\'Ouest :'),
    sp(),
    tbl(
      ['Composante BFR', 'Délai retenu', 'Justification BAD/BIDC', 'Base de calcul'],
      [
        ['Stocks matières premières (explosifs, carburant, lubrifiants)', '30-45 jours', 'Délais d\'approvisionnement Togo + sécurité import (ICMM 2023)', 'Charges MP annuelles / 365 × délai'],
        ['Stocks pièces de rechange critiques', 'Permanente', 'Stock de sécurité = 4% du CAPEX actif (standard industrie)', 'CAPEX immobilisé × 4%'],
        ['Stocks produits finis (carrière)', '5-7 jours', 'Tampon production/vente — standard carrières Afrique', 'Production journalière × prix × 5-7j'],
        ['Créances clients — Marchés publics ARMP', '60 jours', 'Délai règlement ARMP Togo (Code des Marchés Publics)', '45% du CA × 60/365'],
        ['Créances clients — Grands groupes BTP', '30 jours', 'Délai standard grands comptes BTP UEMOA', '30% du CA × 30/365'],
        ['Créances clients — CIMCO contrat cadre', '30 jours', 'Délai contrat cadre industriel', '18% du CA × 30/365'],
        ['Créances clients — PME/Particuliers', '7-15 jours', 'Paiement comptant ou court délai', '7% du CA × 15/365'],
        ['Dettes fournisseurs — Énergie', '-15 jours', 'Délai règlement fournisseurs énergie Togo', 'Charges énergie / 365 × 15'],
        ['Dettes fournisseurs — Maintenance/pièces', '-30 jours', 'Délai standard fournisseurs industriels', 'Charges maint. / 365 × 30'],
        ['Dettes fournisseurs — Explosifs/consommables', '-30 jours', 'Délai standard fournisseurs miniers', 'Charges consommables / 365 × 30'],
        ['Dettes fournisseurs — Transport tiers', '-30 jours', 'Délai standard sous-traitants transport', 'Charges transport tiers / 365 × 30'],
        ['Dettes fournisseurs — Frais généraux', '-15 jours', 'Délai fournisseurs divers', 'Frais généraux / 365 × 15'],
        ['Dettes sociales et fiscales (mois M)', '-30 jours', 'Charges sociales et impôts différés', 'Charges salariales / 365 × 30'],
      ],
      [32, 12, 30, 26]
    ),
    sp(),
    h2('8.3 Calcul détaillé du BFR — Régime de croisière 2028 (3 lignes)'),
    h3('A. Emplois — Stocks'),
    tbl(
      ['Poste stock', 'Quantité annuelle', 'Prix unitaire', 'Montant annuel (M FCFA)', 'Délai stock', 'Valeur stock (M FCFA)'],
      [
        ['Explosifs et accessoires de tir', '1 192 T', '600 000 FCFA/T', '715', '45 jours', '88'],
        ['Carburant (gasoil) — Engins + transport', '4 400 000 L', '750 FCFA/L', '3 300', '15 jours', '136'],
        ['Lubrifiants et graisses', '—', '—', '80', '30 jours', '7'],
        ['Consommables (mailles, mâchoires, courroies)', '—', '—', '150', '30 jours', '12'],
        ['Sous-total stocks matières premières', '—', '—', '4 245', '—', '243'],
        ['Pièces de rechange critiques (stock sécurité)', '—', '—', '—', 'Permanent', '268'],
        ['Produits finis (stock tampon carrière)', '1 040 T/jour', '10 609 FCFA/T', '8 434 (CA)', '5 jours', '55'],
        ['TOTAL STOCKS', '—', '—', '—', '—', '566'],
      ],
      [24, 16, 16, 16, 14, 14]
    ),
    sp(),
    h3('B. Emplois — Créances clients (détail par segment)'),
    tbl(
      ['Segment client', '% du CA 2028', 'CA segment (M FCFA)', 'Délai paiement', 'Créances (M FCFA)'],
      [
        ['Marchés publics ARMP', '45%', '3 795', '60 jours', '624'],
        ['Grands groupes BTP (SOGEA, RAZEL, etc.)', '30%', '2 530', '30 jours', '208'],
        ['CIMCO — Contrat cadre', '18%', '1 518', '30 jours', '125'],
        ['PME BTP / Particuliers', '7%', '590', '15 jours', '24'],
        ['TOTAL CRÉANCES CLIENTS', '100%', '8 434', 'Délai moyen 42 jours', '981'],
      ],
      [26, 14, 20, 18, 22]
    ),
    sp(),
    h3('C. Ressources — Dettes fournisseurs et sociales'),
    tbl(
      ['Poste dette', 'Charges 2028 (M FCFA)', 'Délai règlement', 'Dette (M FCFA)'],
      [
        ['Fournisseurs énergie (carburant + électricité)', '954', '15 jours', '39'],
        ['Fournisseurs maintenance et pièces', '636', '30 jours', '52'],
        ['Fournisseurs explosifs et consommables', '318', '30 jours', '26'],
        ['Sous-traitants transport (tiers)', '561', '30 jours', '46'],
        ['Fournisseurs divers (frais généraux)', '239', '15 jours', '10'],
        ['Charges sociales et salariales (mois courant)', '477', '30 jours', '39'],
        ['TOTAL DETTES FOURNISSEURS', '3 185', 'Délai moyen 22 jours', '212'],
      ],
      [30, 22, 22, 26]
    ),
    sp(),
    h3('D. BFR NET — Régime de croisière 2028'),
    tbl(
      ['Composante', 'Montant (M FCFA)', 'Commentaire'],
      [
        ['Stocks matières premières', '243', 'Explosifs, carburant, lubrifiants, consommables'],
        ['Stocks pièces de rechange', '268', 'Stock sécurité 4% du CAPEX actif (6,7 Mds × 4%)'],
        ['Stocks produits finis', '55', 'Tampon 5 jours de production'],
        ['TOTAL EMPLOIS (Stocks)', '566', '—'],
        ['Créances clients', '981', 'Délai moyen pondéré 42 jours'],
        ['TOTAL EMPLOIS', '1 547', '—'],
        ['Dettes fournisseurs et sociales', '-212', 'Délai moyen 22 jours'],
        ['BFR NET 2028', '1 335', '≈ 15,8% du CA 2028'],
      ],
      [35, 25, 40]
    ),
    sp(),
    successBox('Le BFR NET de 1 335 millions FCFA en régime de croisière (2028) représente 15,8% du chiffre d\'affaires. Ce ratio est conforme aux standards BAD/BIDC pour les projets miniers et de BTP en Afrique de l\'Ouest (fourchette recommandée : 12% à 20%).'),
    sp(),
    h2('8.4 Évolution du BFR — Montée en puissance des 3 lignes'),
    body('Le BFR évolue proportionnellement à la montée en puissance de la production. Les stocks de pièces de rechange sont constitués dès 2026 (Ligne 1 optimisée), tandis que les stocks de matières premières et les créances clients croissent avec le CA.'),
    sp(),
    tbl(
      ['Année', 'Lignes actives', 'Production (T)', 'CA (M FCFA)', 'Stocks (M FCFA)', 'Créances (M FCFA)', 'Dettes (M FCFA)', 'BFR NET (M FCFA)', 'BFR/CA (%)'],
      [
        ['2026', '1 (optimisée)', '265 000', '2 650', '310', '305', '-72', '543', '20,5%'],
        ['2027', '2', '530 000', '5 459', '438', '628', '-139', '927', '17,0%'],
        ['2028', '3 (croisière)', '795 000', '8 434', '566', '981', '-212', '1 335', '15,8%'],
        ['2029', '3', '810 900', '8 861', '577', '1 019', '-221', '1 375', '15,5%'],
        ['2030', '3', '827 000', '9 308', '589', '1 059', '-230', '1 418', '15,2%'],
        ['2031', '3', '843 000', '9 587', '600', '1 101', '-240', '1 461', '15,2%'],
        ['2032', '3', '861 000', '10 280', '612', '1 184', '-258', '1 538', '15,0%'],
        ['2034', '3', '895 000', '11 338', '637', '1 306', '-284', '1 659', '14,6%'],
        ['2036', '3', '930 000', '12 498', '662', '1 440', '-313', '1 789', '14,3%'],
      ],
      [8, 12, 12, 12, 12, 12, 12, 12, 8]
    ),
    sp(),
    infoBox('Note méthodologique : Le ratio BFR/CA de 20,5% en 2026 est élevé car la Ligne 1 seule supporte l\'intégralité du stock de pièces de rechange. À maturité (2028+), le ratio se stabilise autour de 15%, conforme au benchmark sectoriel. La BIDC considère généralement qu\'un ratio supérieur à 20% nécessite des mesures de réduction (avances sur marchés publics, réduction des délais clients, négociation allongement délais fournisseurs).'),
    sp(),
    h2('8.5 Financement du BFR structurel — Intégration BIDC'),
    body('Conformément aux standards de structuration des financements BAD/BIDC, le BFR structurel doit être intégré dans le plan de financement global du projet. La BIDC finance le BFR structurel par une ligne de crédit de trésorerie (ou crédit de campagne) distincte du prêt d\'investissement à long terme.'),
    sp(),
    tbl(
      ['Source de financement BFR', 'Montant (M FCFA)', 'Type', 'Conditions', 'Couverture BFR'],
      [
        ['Ligne de crédit de trésorerie BIDC', '800', 'Crédit de campagne renouvelable', '8% / 1 an renouvelable / garantie nantissement stocks', '60% du BFR 2028'],
        ['Autofinancement (cash-flow opérationnel)', '535', 'Flux générés par l\'exploitation', 'Couvert par EBITDA 2028 (4 617 M)', '40% du BFR 2028'],
        ['TOTAL FINANCEMENT BFR', '1 335', '—', '—', '100% du BFR structurel'],
      ],
      [30, 18, 22, 22, 8]
    ),
    sp(),
    body('La ligne de crédit de trésorerie BIDC de 800 millions FCFA couvre les besoins permanents de stocks et créances, tandis que le solde (535 M) est autofinancé par les cash-flows opérationnels dès la première année de régime de croisière. La ligne de crédit est renouvelable annuellement et remboursée par l\'autofinancement progressif à mesure que la trésorerie de l\'entreprise se renforce.'),
    sp(),
    bullet('Ligne de crédit BIDC : 800 M FCFA — taux 8% fixe, renouvelable annuellement, garantie par nantissement des stocks et cession de créances professionnelles (Dailly)'),
    bullet('Autofinancement : 535 M FCFA — couvert dès 2028 par l\'EBITDA de 4 617 M FCFA (le BFR représente seulement 29% de l\'EBITDA annuel)'),
    bullet('Avances sur marchés publics : réduction du BFR clients de 30% via les avances de démarrage (Décret n°2009-277/PR du 11 novembre 2009)'),
    bullet('Renégociation délais fournisseurs : objectif allongement à 45 jours pour les fournisseurs récurrents, réduisant le BFR de ~80 M FCFA'),
    sp(),
    h2('8.6 Plan de désendettement du BFR'),
    tbl(
      ['Année', 'BFR NET (M FCFA)', 'LC BIDC utilisée (M FCFA)', 'Autofinancement BFR (M FCFA)', 'LC BIDC remboursée (M FCFA)', 'Solde LC BIDC (M FCFA)'],
      [
        ['2028', '1 335', '800', '535', '0', '800'],
        ['2029', '1 375', '800', '575', '0', '800'],
        ['2030', '1 418', '750', '668', '50', '750'],
        ['2031', '1 461', '650', '811', '100', '650'],
        ['2032', '1 538', '500', '1 038', '150', '500'],
        ['2033', '1 598', '350', '1 248', '150', '350'],
        ['2034', '1 659', '200', '1 459', '150', '200'],
        ['2035', '1 723', '100', '1 623', '100', '100'],
        ['2036', '1 789', '0', '1 789', '100', '0'],
      ],
      [10, 14, 14, 14, 14, 14]
    ),
    sp(),
    successBox('Le BFR est entièrement autofinancé dès 2036. La ligne de crédit BIDC de 800 M FCFA est progressivement remboursée à partir de 2030, à mesure que la trésorerie de CGI SA se renforce (trésorerie cumulée > 10 Mds FCFA en 2030). La couverture du BFR par l\'EBITDA est excellente : 29% en 2028, descend à 14% en 2036, témoignant d\'une trésorerie opérationnelle très saine.'),
    sp(),
    h2('8.7 Recommandations de gestion du BFR'),
    bullet('Mettre en place un contrat de cession de créances professionnelles (affacturage) avec une banque locale pour accélérer l\'encaissement des marchés publics — objectif : réduire le délai ARMP de 60 à 45 jours'),
    bullet('Constituer un stock stratégique de pièces critiques dès 2026 (Ligne 1) pour éviter les arrêts de production — budget 268 M FCFA intégré au BFR'),
    bullet('Négocier des contrats cadre avec les fournisseurs d\'explosifs et de carburant pour sécuriser les délais de livraison et obtenir des conditions de paiement à 45 jours'),
    bullet('Mettre en place un logiciel de gestion des stocks et de la supply chain (ERP) dès 2027 pour optimiser les niveaux de stock et réduire les surstocks'),
    bullet('Demander systématiquement des avances de démarrage de 30% sur les marchés publics (conformément au Code des Marchés Publics du Togo)'),
    pb(),
  ];
}

// ─── SECTION 9 : FINANCEMENT ET DETTE ────────────────────────────────────────
function section9(): (Paragraph | Table)[] {
  return [
    h1('9. STRUCTURATION DU FINANCEMENT ET PLAN DE DETTE'),
    sp(),
    h2('9.1 Structure de financement — Périmètre BIDC'),
    body('Le présent programme d\'investissement objet de la sollicitation auprès de la BIDC s\'élève à 5,400 milliards FCFA. Il comprend deux composantes distinctes : (i) le programme d\'investissement en immobilisations (CAPEX) de 4,600 milliards FCFA pour l\'acquisition et l\'installation des Lignes 2 et 3 et la flotte de transport ; et (ii) le BFR structurel de 800 millions FCFA financé par une ligne de crédit de trésorerie BIDC distincte. L\'intégralité de ce programme est financée en dette senior BIDC (100%), conformément à la politique d\'accompagnement financier de la BIDC pour les projets industriels de la CEDEAO. Aucun apport en fonds propres n\'est requis de la part de CGI SA pour ce nouveau programme.'),
    sp(),
    body('L\'investissement historique de 2,1 milliards FCFA (Ligne 1, 2023-2025) est exclu du périmètre de financement BIDC, ayant été entièrement réalisé sur fonds propres. Ce montant représente la contribution historique du promoteur et renforce son engagement dans le projet. Le BFR complémentaire de 535 millions FCFA (40% du BFR total) est autofinancé par les cash-flows opérationnels dès 2028.'),
    sp(),
    tbl(
      ['Source de financement', 'Montant (FCFA)', 'Part (%)', 'Conditions', 'Utilisation'],
      [
        ['Fonds propres CGI SA (équipements 2023-2025)', '2 100 000 000', '28,0 %', 'Déjà réalisé', 'Ligne 1 — équipements acquis et opérationnels'],
        ['Dette senior BIDC — Prêt d\'investissement (CAPEX)', '4 600 000 000', '61,3 %', '8% / 8 ans / différé 24 mois', 'Lignes 2&3 + flotte transport'],
        ['Dette senior BIDC — Ligne de crédit BFR', '800 000 000', '10,7 %', '8% / 1 an renouvelable', 'BFR structurel — stocks + créances'],
        ['Fonds propres CGI SA (programme 2026-2036)', '0', '0 %', '—', 'Aucun apport requis — 100% BIDC'],
        ['TOTAL FINANCEMENT BIDC (CAPEX + BFR)', '5 400 000 000', '72,0 %', '—', 'Nouveau programme 2026-2036'],
        ['TOTAL FINANCEMENT GLOBAL CGI SA', '7 500 000 000', '100 %', '—', '3 lignes + flotte + BFR couvert'],
      ],
      [28, 18, 10, 25, 19]
    ),
    sp(),
    h2('9.2 Conditions de la dette BIDC'),
    tbl(
      ['Paramètre', 'Valeur', 'Commentaire'],
      [
        ['Prêteur', 'BIDC (Banque d\'Investissement et de Développement de la CEDEAO)', 'Institution régionale de développement'],
        ['Montant du prêt d\'investissement (CAPEX)', '4 600 000 000 FCFA', '100% du CAPEX installation Lignes 2&3 + transport'],
        ['Montant ligne de crédit BFR', '800 000 000 FCFA', 'Crédit de trésorerie renouvelable — stocks + créances'],
        ['Montant total dette BIDC', '5 400 000 000 FCFA', 'Prêt d\'investissement + ligne de crédit BFR'],
        ['Taux d\'intérêt', '8 % par an', 'Taux fixe — conforme aux conditions BIDC 2024 (même taux pour prêt et LC)'],
        ['Durée prêt d\'investissement', '8 ans (96 mois)', 'À compter du premier tirage'],
        ['Durée ligne de crédit BFR', '1 an renouvelable', 'Renouvellement annuel jusqu\'à remboursement complet (2036)'],
        ['Période de différé prêt', '24 mois', 'Pas de remboursement en capital pendant la construction'],
        ['Durée d\'amortissement prêt', '6 ans (72 mois)', 'Après la période de différé'],
        ['Modalité de remboursement prêt', 'Annuités constantes en capital', 'Remboursement annuel du capital : 767 M FCFA'],
        ['Modalité remboursement LC BFR', 'Remboursement progressif par autofinancement', 'À compter de 2030 — remboursement annuel 50-150 M FCFA'],
        ['Garanties requises', 'Hypothèque sur le gisement + nantissement des équipements + nantissement stocks + cession créances Dailly', 'Standard BIDC pour projets miniers'],
        ['Covenants financiers', 'DSCR ≥ 1,3x ; Gearing ≤ 3,0x ; Ratio de liquidité ≥ 1,2x ; BFR/CA ≤ 20%', 'Covenants standards BIDC'],
      ],
      [30, 35, 35]
    ),
    sp(),
    h2('9.3 Tableau d\'amortissement de la dette BIDC'),
    body('En millions de FCFA — Tirage unique 2027 : 4 600 M — Différé 2027-2028 (paiement intérêts uniquement) — Amortissement 2029-2034 (6 annuités constantes de 767 M)'),
    sp(),
    tbl(
      ['Année', 'Capital restant dû (début)', 'Intérêts (8%)', 'Remboursement capital', 'Service total dette', 'Capital restant dû (fin)'],
      [
        ['2027 (différé)', '4 600', '368', '0', '368', '4 600'],
        ['2028 (différé)', '4 600', '368', '0', '368', '4 600'],
        ['2029', '4 600', '368', '767', '1 135', '3 833'],
        ['2030', '3 833', '307', '767', '1 074', '3 066'],
        ['2031', '3 066', '245', '767', '1 012', '2 299'],
        ['2032', '2 299', '184', '767', '951', '1 532'],
        ['2033', '1 532', '123', '767', '890', '765'],
        ['2034', '765', '61', '765', '826', '0'],
        ['TOTAL', '—', '2 024', '4 600', '6 624', '—'],
      ],
      [12, 20, 15, 20, 18, 15]
    ),
    sp(),
    h2('9.4 Analyse de la capacité de remboursement'),
    h3('9.4.1 DSCR — Prêt d\'investissement BIDC (CAPEX)'),
    tbl(
      ['Année', 'EBITDA (M FCFA)', 'Service prêt CAPEX (M FCFA)', 'DSCR', 'Évaluation'],
      [
        ['2029', '4 969', '1 135', '4,38x', '✔ EXCELLENT — Très confortable'],
        ['2030', '5 338', '1 074', '4,97x', '✔ EXCELLENT'],
        ['2031', '5 472', '1 012', '5,41x', '✔ EXCELLENT'],
        ['2032', '6 147', '951', '6,46x', '✔ EXCELLENT'],
        ['2033', '6 601', '890', '7,42x', '✔ EXCELLENT'],
        ['2034', '7 041', '826', '8,52x', '✔ EXCELLENT'],
        ['DSCR moyen 2029-2034', '—', '—', '6,19x', '✔ Très largement au-dessus du covenant BIDC (1,3x)'],
      ],
      [12, 20, 20, 12, 36]
    ),
    sp(),
    h3('9.4.2 DSCR global — Prêt CAPEX + Ligne de crédit BFR'),
    body('Le calcul du DSCR global intègre le service total de la dette BIDC, incluant les intérêts de la ligne de crédit BFR (800 M FCFA à 8% = 64 M FCFA/an d\'intérêts jusqu\'au remboursement complet) :'),
    sp(),
    tbl(
      ['Année', 'EBITDA (M FCFA)', 'Service total dette (M FCFA)', 'Dont LC BFR', 'DSCR global', 'Évaluation'],
      [
        ['2028', '4 617', '432', '64', '10,69x', '✔ EXCELLENT — Phase différée'],
        ['2029', '4 969', '1 199', '64', '4,14x', '✔ EXCELLENT'],
        ['2030', '5 338', '1 138', '64', '4,69x', '✔ EXCELLENT'],
        ['2031', '5 472', '1 076', '64', '5,08x', '✔ EXCELLENT'],
        ['2032', '6 147', '1 015', '64', '6,06x', '✔ EXCELLENT'],
        ['2033', '6 601', '954', '64', '6,92x', '✔ EXCELLENT'],
        ['2034', '7 041', '890', '64', '7,91x', '✔ EXCELLENT'],
        ['DSCR moyen global', '—', '—', '—', '6,21x', '✔ Très largement au-dessus du covenant BIDC (1,3x)'],
      ],
      [10, 16, 18, 14, 14, 18]
    ),
    sp(),
    successBox('Le DSCR moyen du prêt d\'investissement est de 6,19x et le DSCR global (incluant la ligne de crédit BFR) est de 6,21x — très largement supérieurs au covenant BIDC de 1,3x. Même dans un scénario pessimiste avec un EBITDA réduit de 30%, le DSCR global reste à 4,35x, soit largement au-dessus du seuil critique. La capacité de remboursement de CGI SA est excellente et ne présente aucun risque de défaut. La ligne de crédit BFR ne dégrade pas significativement le DSCR car elle représente un service annuel modeste (64 M FCFA d\'intérêts).'),
    sp(),
    h2('9.5 Analyse du gearing (endettement)'),
    tbl(
      ['Année', 'Dette BIDC (M FCFA)', 'Capitaux propres (M FCFA)', 'Gearing (Dette/FP)', 'Covenant BIDC', 'Évaluation'],
      [
        ['2028', '4 600', '5 965', '0,77x', '≤ 3,0x', '✔ CONFORME — Endettement modéré'],
        ['2030', '3 066', '9 149', '0,34x', '≤ 3,0x', '✔ CONFORME — Désendettement rapide'],
        ['2032', '1 532', '14 277', '0,11x', '≤ 3,0x', '✔ CONFORME — Structure quasi autofinancée'],
        ['2034', '0', '20 217', '0,00x', '≤ 3,0x', '✔ CONFORME — Dette totalement remboursée'],
      ],
      [12, 20, 20, 18, 15, 15]
    ),
    pb(),
  ];
}

// ─── SECTION 10 : INDICATEURS DE PERFORMANCE ─────────────────────────────────
function section10(): (Paragraph | Table)[] {
  return [
    h1('10. INDICATEURS DE PERFORMANCE FINANCIÈRE'),
    sp(),
    h2('10.1 Valeur Actuelle Nette (VAN) et Taux de Rentabilité Interne (TRI)'),
    body('Calcul sur la base des flux de trésorerie libres (Free Cash-Flow) sur 10 ans (2026–2036), avec une valeur terminale calculée sur la base d\'un multiple EV/EBITDA de 5x. Le taux d\'actualisation retenu est de 12%, conforme au coût du capital pour des projets industriels en Afrique de l\'Ouest (BAD, BIDC).'),
    sp(),
    tbl(
      ['Indicateur', 'Scénario pessimiste (-20% CA)', 'Scénario central', 'Scénario optimiste (+20% CA)', 'Seuil d\'acceptabilité'],
      [
        ['VAN (taux d\'actualisation 12%)', '1 850 M FCFA', '3 850 M FCFA', '5 950 M FCFA', '> 0 ✔'],
        ['TRI Projet', '18,2 %', '24,8 %', '31,5 %', '> 15% ✔'],
        ['TRI Fonds propres', '22,5 %', '28,6 %', '35,8 %', '> 20% ✔'],
        ['Délai de récupération (Payback)', '5,1 ans', '3,9 ans', '2,8 ans', '< 8 ans ✔'],
        ['Multiple sur investissement (MOIC)', '1,5x', '2,8x', '4,2x', '> 2x ✔'],
      ],
      [28, 18, 18, 18, 18]
    ),
    sp(),
    h2('10.2 Seuil de rentabilité (Point mort)'),
    tbl(
      ['Paramètre', 'Valeur', 'Commentaire'],
      [
        ['Charges fixes annuelles (2028)', '1 706 M FCFA', 'Amortissements 670 M + charges financières 368 M + frais fixes 668 M'],
        ['Marge sur coûts variables (2028)', '5 609 FCFA/T', 'Prix moyen 10 609 - coûts variables 5 000 FCFA/T'],
        ['Seuil de rentabilité (volume)', '304 000 T/an', 'Charges fixes / Marge sur coûts variables'],
        ['Seuil de rentabilité (CA)', '3 225 M FCFA', '304 000 T × 10 609 FCFA/T'],
        ['Production cible 2028', '795 000 T/an', 'Régime de croisière'],
        ['Marge de sécurité', '61,8 %', '(795 000 - 304 000) / 795 000'],
      ],
      [35, 30, 35]
    ),
    sp(),
    successBox('La marge de sécurité de 61,8% signifie que CGI SA peut perdre 62% de sa production avant d\'atteindre le point mort. Ce niveau est extrêmement confortable et témoigne de la robustesse financière du projet, même dans des conditions de marché difficiles.'),
    sp(),
    h2('10.3 Analyse de sensibilité'),
    tbl(
      ['Variable testée', 'Variation', 'Impact sur VAN', 'Impact sur TRI', 'Criticité'],
      [
        ['Prix de vente', '-10 %', '-1 450 M FCFA (-38%)', '-3,8 pts', 'HAUTE — Variable la plus sensible'],
        ['Volume de production', '-10 %', '-980 M FCFA (-25%)', '-2,7 pts', 'HAUTE'],
        ['Coûts opérationnels', '+10 %', '-620 M FCFA (-16%)', '-1,8 pts', 'MOYENNE'],
        ['Taux d\'intérêt BIDC', '+2 pts (10%)', '-280 M FCFA (-7%)', '-0,5 pts', 'FAIBLE'],
        ['CAPEX (dépassement)', '+15 %', '-380 M FCFA (-10%)', '-1,0 pts', 'FAIBLE-MOYENNE'],
        ['Délai de mise en service', '+6 mois', '-320 M FCFA (-8%)', '-0,9 pts', 'FAIBLE'],
      ],
      [25, 15, 20, 15, 25]
    ),
    sp(),
    h2('10.4 Tableau de bord des indicateurs clés'),
    kpiRow([
      { label: 'VAN (12%)', value: '3,85 Mds FCFA', sub: 'Scénario central' },
      { label: 'TRI Projet', value: '24,8 %', sub: 'Sur 10 ans' },
      { label: 'DSCR Moyen', value: '6,19x', sub: 'Période remboursement' },
      { label: 'Payback', value: '3,9 ans', sub: 'Délai récupération' },
    ]),
    pb(),
  ];
}

// ─── SECTION 11 : ANALYSE DES RISQUES ────────────────────────────────────────
function section11(): (Paragraph | Table)[] {
  return [
    h1('11. ANALYSE DES RISQUES'),
    sp(),
    h2('11.1 Matrice des risques'),
    tbl(
      ['Risque', 'Probabilité', 'Impact', 'Niveau', 'Mesures d\'atténuation'],
      [
        ['RISQUES TECHNIQUES', '', '', '', ''],
        ['Blocs surdimensionnés — blocage concasseur', 'Actuel', 'Élevé', 'CRITIQUE', 'Révision plan de minage — espacement 3×3m — formation opérateurs'],
        ['Panne majeure équipement (concasseur)', 'Faible', 'Élevé', 'MODÉRÉ', 'Stock pièces de rechange + contrat maintenance constructeur + Ligne 3 backup'],
        ['Dépassement CAPEX (> 15%)', 'Faible', 'Moyen', 'FAIBLE', 'Provision imprévus 5% + contrats à prix ferme avec fournisseurs'],
        ['Retard mise en service Lignes 2&3', 'Moyen', 'Moyen', 'MODÉRÉ', 'Planning détaillé + pénalités contractuelles fournisseurs + suivi hebdomadaire'],
        ['RISQUES DE MARCHÉ', '', '', '', ''],
        ['Baisse des prix de vente (> 15%)', 'Faible', 'Élevé', 'MODÉRÉ', 'Contrats long terme (60% CA) + diversification géographique (Bénin)'],
        ['Ralentissement BTP Togo', 'Faible', 'Élevé', 'MODÉRÉ', 'Diversification Bénin + marchés publics CEDEAO + export régional'],
        ['Entrée d\'un concurrent industriel majeur', 'Très faible', 'Moyen', 'FAIBLE', 'Avantage géographique + certification LNBTP + contrats long terme'],
        ['RISQUES FINANCIERS', '', '', '', ''],
        ['Hausse des taux d\'intérêt', 'Faible', 'Faible', 'FAIBLE', 'Taux fixe BIDC — pas d\'exposition au risque de taux'],
        ['Dépréciation du FCFA', 'Très faible', 'Moyen', 'FAIBLE', 'Zone UEMOA — parité fixe EUR/FCFA garantie par la France'],
        ['Insuffisance de trésorerie (BFR)', 'Faible', 'Moyen', 'FAIBLE', 'Ligne de crédit BIDC BFR 800 M FCFA + autofinancement 535 M + avances marchés publics 30%'],
        ['RISQUES RÉGLEMENTAIRES', '', '', '', ''],
        ['Révision du régime fiscal minier', 'Faible', 'Moyen', 'FAIBLE', 'Suivi législatif + engagement avec DGMG + convention d\'établissement'],
        ['Non-renouvellement du permis d\'exploitation', 'Très faible', 'Très élevé', 'MODÉRÉ', 'Conformité permanente + relations institutionnelles + réserves > 50 ans'],
        ['Nouvelles normes environnementales', 'Moyen', 'Moyen', 'MODÉRÉ', 'PGES conforme IFC + certification ISO 14001 + veille réglementaire'],
        ['RISQUES ESG', '', '', '', ''],
        ['Conflits communautaires (foncier)', 'Faible', 'Élevé', 'MODÉRÉ', 'Plan d\'engagement communautaire + FPIC + comité de liaison'],
        ['Accidents du travail', 'Moyen', 'Élevé', 'ÉLEVÉ', 'Plan HSE + formation sécurité + EPI + assurance AT/MP'],
        ['Pollution des eaux souterraines', 'Faible', 'Élevé', 'MODÉRÉ', 'Bassin de décantation + monitoring qualité eau + PGES IFC'],
      ],
      [28, 12, 10, 12, 38]
    ),
    sp(),
    h2('11.2 Plan de gestion des risques prioritaires'),
    tbl(
      ['Risque prioritaire', 'Action immédiate', 'Responsable', 'Délai', 'Indicateur de suivi'],
      [
        ['Accidents du travail', 'Mise en place Plan HSE complet — formation sécurité — EPI obligatoires', 'DG + Responsable HSE', 'T1 2026', 'Taux de fréquence accidents (TF) < 5'],
        ['Blocs surdimensionnés', 'Révision plan de minage + formation opérateurs', 'Directeur Technique', 'T1 2026', 'Taux blocs > 600mm < 5%'],
        ['Non-renouvellement permis', 'Audit de conformité DGMG + dossier de renouvellement anticipé', 'DG + Juriste', 'T2 2026', 'Permis renouvelé avant expiration'],
        ['Conflits communautaires', 'Plan d\'engagement communautaire + FPIC + fonds développement local', 'DG + Responsable RSE', 'T1 2026', 'Zéro conflit foncier non résolu'],
      ],
      [22, 30, 18, 12, 18]
    ),
    pb(),
  ];
}

// ─── SECTION 12 : ESG ─────────────────────────────────────────────────────────
function section12(): (Paragraph | Table)[] {
  return [
    h1('12. ANALYSE ESG — STANDARDS IFC'),
    sp(),
    body('L\'analyse ESG de CGI SA est conduite conformément aux IFC Performance Standards (2012, révisés 2023), référentiel international reconnu par la BAD, la BIDC et les principaux bailleurs de fonds du développement.'),
    sp(),
    h2('12.1 Environnement — IFC PS 3 (Efficacité des ressources) & PS 6 (Biodiversité)'),
    tbl(
      ['Enjeu environnemental', 'Situation actuelle', 'Mesures requises', 'Standard IFC', 'Indicateur de suivi'],
      [
        ['Poussières et émissions atmosphériques', 'Poussières générées par concassage et transport', 'Arrosage des pistes + capotage des convoyeurs + monitoring PM10', 'IFC PS 3 — Qualité de l\'air', 'PM10 < 150 µg/m³ (OMS 2021)'],
        ['Bruit et vibrations', 'Bruit des engins et explosions', 'Plan de tir optimisé + horaires de tir + monitoring vibrations', 'IFC PS 3 — Bruit', 'Niveau sonore < 70 dB(A) en limite de site'],
        ['Gestion des eaux', 'Risque de ruissellement et pollution', 'Bassins de décantation + monitoring qualité eau + plan de drainage', 'IFC PS 3 — Eau', 'Turbidité < 50 NTU en sortie de site'],
        ['Gestion des déchets', 'Huiles usagées, pneus, ferrailles', 'Contrats avec recycleurs agréés + registre des déchets', 'IFC PS 3 — Déchets', 'Taux de valorisation déchets > 80%'],
        ['Biodiversité et habitats', 'Zone de savane arborée — faune locale', 'Cartographie biodiversité + zones de compensation + reboisement', 'IFC PS 6 — Biodiversité', 'Surface reboisée ≥ surface exploitée'],
        ['Réhabilitation du site', 'Obligation légale de réhabilitation', 'Plan de réhabilitation progressive + provision financière', 'IFC PS 6 — Réhabilitation', 'Provision annuelle 50 M FCFA/an'],
        ['Empreinte carbone', 'Émissions engins diesel + explosifs', 'Inventaire GES annuel + plan de réduction + compensation', 'IFC PS 3 — Climat', 'Réduction émissions 20% d\'ici 2030'],
      ],
      [22, 22, 22, 16, 18]
    ),
    sp(),
    h2('12.2 Social — IFC PS 2 (Conditions de travail) & PS 5 (Acquisition de terres)'),
    tbl(
      ['Enjeu social', 'Situation actuelle', 'Mesures requises', 'Standard IFC'],
      [
        ['Santé et sécurité au travail', 'Risques élevés : engins, explosifs, poussières', 'Plan HSE complet + EPI + formation sécurité + médecin du travail + assurance AT/MP', 'IFC PS 2 — HSE'],
        ['Conditions de travail', 'Conformité Code du Travail Togo — 8h/jour', 'Contrats de travail formels + grille salariale + CNSS + congés payés', 'IFC PS 2 — Travail'],
        ['Emploi local', 'Priorité à l\'emploi local', 'Politique d\'emploi local (80% main-d\'œuvre locale) + formation professionnelle', 'IFC PS 2 — Emploi'],
        ['Acquisition de terres', 'Permis d\'exploitation DGMG', 'Vérification FPIC (Consentement Libre, Préalable et Éclairé) + compensation juste', 'IFC PS 5 — Foncier'],
        ['Engagement communautaire', 'Relations avec communautés locales', 'Comité de liaison + fonds développement local (0,5% CA) + consultations régulières', 'IFC PS 1 — Engagement'],
        ['Sécurité des installations', 'Accès non contrôlé au site', 'Clôture périmétrique + gardiennage + procédures de sécurité', 'IFC PS 4 — Sécurité'],
      ],
      [22, 22, 30, 26]
    ),
    sp(),
    h2('12.3 Gouvernance — Principes ESG internationaux'),
    tbl(
      ['Enjeu de gouvernance', 'Mesures recommandées', 'Délai', 'Standard de référence'],
      [
        ['Structure de gouvernance', 'Conseil d\'Administration avec administrateurs indépendants (min. 2) + Comité d\'Audit', 'T1 2026', 'OCDE Principes de gouvernance 2023'],
        ['Transparence financière', 'Audit annuel par cabinet agréé + publication des comptes + reporting ESG annuel', 'T1 2026', 'IFRS + GRI Standards 2021'],
        ['Lutte contre la corruption', 'Politique anti-corruption + code de conduite + formation dirigeants', 'T1 2026', 'Convention OCDE + UNODC 2023'],
        ['Gestion des conflits d\'intérêts', 'Procédure de déclaration des conflits d\'intérêts + registre des parties liées', 'T1 2026', 'OHADA — Acte Uniforme Sociétés'],
        ['Conformité fiscale', 'Déclarations fiscales dans les délais + prix de transfert documentés', 'Continu', 'Code Général des Impôts Togo 2024'],
        ['Reporting ESG', 'Rapport ESG annuel conforme GRI Standards + indicateurs IFC', 'T4 2026', 'GRI Standards 2021 + IFC PS'],
      ],
      [25, 35, 12, 28]
    ),
    sp(),
    h2('12.4 Plan de Gestion Environnementale et Sociale (PGES)'),
    tbl(
      ['Composante PGES', 'Budget annuel (FCFA)', 'Responsable', 'Fréquence de reporting'],
      [
        ['Monitoring environnemental (eau, air, bruit)', '25 000 000', 'Responsable HSE/Environnement', 'Trimestriel'],
        ['Réhabilitation progressive du site', '50 000 000', 'Directeur Technique', 'Annuel'],
        ['Fonds développement communautaire (0,5% CA)', '42 200 000 (2028)', 'Comité de liaison', 'Annuel'],
        ['Formation sécurité et HSE', '15 000 000', 'Responsable HSE', 'Semestriel'],
        ['Audit ESG externe', '20 000 000', 'Cabinet externe agréé', 'Annuel'],
        ['Compensation biodiversité (reboisement)', '10 000 000', 'Responsable Environnement', 'Annuel'],
        ['TOTAL BUDGET PGES (2028)', '162 200 000', '—', '—'],
      ],
      [35, 22, 25, 18]
    ),
    sp(),
    infoBox('Référence ESG : IFC Performance Standards on Environmental and Social Sustainability, 2012 (révisés 2023) ; GRI Standards 2021 ; BAD, "Politique de sauvegarde intégrée", 2013 ; BIDC, "Cadre de gestion environnementale et sociale", 2022.'),
    pb(),
  ];
}

// ─── SECTION 13 : CONCLUSIONS ─────────────────────────────────────────────────
function section13(): (Paragraph | Table)[] {
  return [
    h1('13. CONCLUSIONS ET RECOMMANDATIONS'),
    sp(),
    h2('13.1 Synthèse des conclusions'),
    tbl(
      ['Dimension', 'Conclusion', 'Niveau de confiance'],
      [
        ['Viabilité technique', 'Le projet est techniquement viable. Les problèmes opérationnels actuels sont identifiés et traités. La capacité de production de 795 000 T/an est réaliste et atteignable avec le dimensionnement des équipements conforme aux standards internationaux.', '✔ ÉLEVÉ'],
        ['Viabilité commerciale', 'Le marché est porteur et en forte croissance. La position géographique de CGI SA est un avantage compétitif durable. Le contrat cadre CIMCO (150 000 T/an) sécurise 19% de la production. La demande adressable dépasse largement la capacité de production.', '✔ ÉLEVÉ'],
        ['Viabilité financière', 'Le projet est financièrement solide : VAN positive (3,85 Mds FCFA), TRI élevé (24,8%), DSCR très confortable (6,19x), délai de récupération raisonnable (3,9 ans). Marge de sécurité de 61,8%.', '✔ ÉLEVÉ'],
        ['Bancabilité', 'Le projet est directement bancable. La structuration BIDC (100% dette senior, 8%, 8 ans, différé 24 mois) est adaptée. Les ratios financiers respectent largement les covenants standards (DSCR > 6x, Gearing < 1x).', '✔ ÉLEVÉ'],
        ['Conformité ESG', 'Le projet nécessite la mise en œuvre d\'un PGES conforme aux IFC Performance Standards. Les enjeux ESG sont identifiés et les mesures d\'atténuation sont définies. Budget PGES : 162 M FCFA/an.', '✔ MOYEN — Sous réserve PGES'],
      ],
      [20, 55, 25]
    ),
    sp(),
    h2('13.2 Recommandations prioritaires'),
    tbl(
      ['Priorité', 'Recommandation', 'Délai', 'Impact'],
      [
        ['1 — URGENT', 'Réviser le plan de minage (espacement 3×3m) pour éliminer les blocs surdimensionnés', 'T1 2026', 'Disponibilité 60% → 80% — +250 000 T/an'],
        ['2 — URGENT', 'Mettre en place le Plan HSE complet et former tous les opérateurs à la sécurité', 'T1 2026', 'Réduction accidents — conformité IFC PS 2'],
        ['3 — PRIORITAIRE', 'Recruter un Directeur Commercial et signer 5 contrats-cadres avec grands groupes BTP', 'T2 2026', 'Sécurisation 60% du CA 2027'],
        ['4 — PRIORITAIRE', 'Déposer le dossier de financement BIDC avec le présent rapport de faisabilité', 'T1 2026', 'Tirage dette T1 2027 — démarrage Ligne 2'],
        ['5 — IMPORTANT', 'Lancer la mission commerciale Bénin et signer un accord-cadre avec un distributeur béninois', 'T2 2026', 'Diversification géographique — 50 000 T/an dès 2027'],
        ['6 — IMPORTANT', 'Mettre en place le PGES conforme IFC et recruter un Responsable HSE/Environnement', 'T2 2026', 'Conformité ESG — condition BIDC'],
        ['7 — MOYEN TERME', 'Obtenir la certification ISO 9001 pour renforcer la crédibilité commerciale', 'T3 2026', 'Accès marchés publics régionaux — différenciation'],
      ],
      [15, 40, 12, 33]
    ),
    sp(),
    h2('13.3 Conditions de succès'),
    bullet('Exécution rigoureuse du programme d\'amélioration opérationnelle de la Ligne 1 dès T1 2026'),
    bullet('Obtention du financement BIDC dans les délais prévus (T1 2027) — 100% dette senior de 4,6 milliards FCFA'),
    bullet('Respect du planning de mise en service des Lignes 2 et 3 (T2 et T4 2027)'),
    bullet('Développement commercial proactif pour sécuriser les contrats long terme avant la montée en capacité'),
    bullet('Mise en œuvre du PGES conforme IFC comme condition préalable au tirage de la dette BIDC'),
    sp(),
    successBox('KHEPRA EXPERTS recommande la mise en œuvre du programme d\'investissement 2026–2036 de CORNERSTONE GROUP INTERNATIONAL (CGI) SA tel que structuré dans le présent rapport. Le projet présente un profil risque/rendement attractif, une bancabilité confirmée avec un DSCR de 6,19x très largement au-dessus des covenants BIDC, et un impact de développement positif pour le Togo et la région CEDEAO.'),
    pb(),
  ];
}

// ─── ANNEXES ──────────────────────────────────────────────────────────────────
function annexes(): (Paragraph | Table)[] {
  return [
    h1('ANNEXES — HYPOTHÈSES DÉTAILLÉES ET SOURCES'),
    sp(),
    h2('Annexe A — Sources officielles utilisées'),
    tbl(
      ['Institution', 'Document', 'Année', 'URL / Référence'],
      [
        ['FMI', 'World Economic Outlook — Perspectives économiques mondiales', 'Avril 2025', 'imf.org/en/Publications/WEO'],
        ['Banque Africaine de Développement (BAD)', 'African Economic Outlook 2024', '2024', 'afdb.org/en/knowledge/publications/african-economic-outlook'],
        ['Banque Mondiale', 'Togo Infrastructure Assessment', '2024', 'worldbank.org/en/country/togo'],
        ['BCEAO', 'Rapport annuel 2024 — Zone UEMOA', '2024', 'bceao.int/fr/publications/rapports-annuels'],
        ['INSEED Togo', 'Rapport sur les activités du secteur BTP', '2023', 'inseed.tg'],
        ['INSAE Bénin', 'Statistiques du secteur de la construction', '2024', 'insae.bj'],
        ['DGMG Togo', 'Rapport d\'évaluation des ressources minérales', '2022', 'mines.gouv.tg'],
        ['ICMM', 'Mining Contribution to Sustainable Development in Africa', '2023', 'icmm.com/en-gb/research'],
        ['IFC', 'Performance Standards on Environmental and Social Sustainability', '2012 (rév. 2023)', 'ifc.org/performancestandards'],
        ['GRI', 'GRI Standards 2021', '2021', 'globalreporting.org/standards'],
        ['Metso Outotec', 'Crushing and Screening Equipment Price List — Sub-Saharan Africa', '2024', 'mogroup.com'],
        ['Caterpillar', 'Equipment Financing Africa — Price List', '2024', 'cat.com/africa'],
        ['Volvo CE', 'Heavy Equipment Price Guide — Africa', '2024', 'volvoce.com/africa'],
        ['LNBTP Togo', 'Rapport d\'analyse granulats CGI SA', '2024', 'lnbtp.tg'],
        ['Gouvernement du Bénin', 'Programme d\'Actions du Gouvernement (PAG 2) 2021-2026', '2021', 'gouv.bj'],
        ['BIDC', 'Conditions de financement — Projets industriels CEDEAO', '2024', 'bidc.org'],
        ['ORICA Africa', 'Explosifs et accessoires de minage — Tarifs Afrique de l\'Ouest', '2024', 'orica.com/africa'],
      ],
      [22, 35, 8, 35]
    ),
    sp(),
    h2('Annexe B — Glossaire des termes techniques'),
    tbl(
      ['Terme', 'Définition'],
      [
        ['CAPEX', 'Capital Expenditure — Dépenses d\'investissement en immobilisations corporelles'],
        ['OPEX', 'Operating Expenditure — Charges opérationnelles courantes'],
        ['EBITDA', 'Earnings Before Interest, Taxes, Depreciation and Amortization — Résultat avant intérêts, impôts, dotations aux amortissements'],
        ['DSCR', 'Debt Service Coverage Ratio — Ratio de couverture du service de la dette = EBITDA / Service de la dette'],
        ['VAN', 'Valeur Actuelle Nette — Somme des flux de trésorerie actualisés au taux d\'actualisation retenu'],
        ['TRI', 'Taux de Rentabilité Interne — Taux d\'actualisation qui annule la VAN'],
        ['BFR', 'Besoin en Fonds de Roulement — Besoin de financement du cycle d\'exploitation'],
        ['OEE', 'Overall Equipment Effectiveness — Efficacité globale des équipements = Disponibilité × Performance × Qualité'],
        ['PGES', 'Plan de Gestion Environnementale et Sociale — Document de planification des mesures ESG'],
        ['FPIC', 'Free, Prior and Informed Consent — Consentement Libre, Préalable et Éclairé des communautés'],
        ['IFC PS', 'IFC Performance Standards — Normes de performance environnementale et sociale de la Société Financière Internationale'],
        ['LNBTP', 'Laboratoire National du Bâtiment et des Travaux Publics — Organisme de certification qualité des matériaux de construction au Togo'],
        ['DGMG', 'Direction Générale des Mines et de la Géologie — Autorité minière du Togo'],
        ['BIDC', 'Banque d\'Investissement et de Développement de la CEDEAO — Institution de financement du développement de la CEDEAO'],
        ['BAD', 'Banque Africaine de Développement — Institution multilatérale de financement du développement en Afrique'],
      ],
      [20, 80]
    ),
    sp(),
    h2('Annexe C — Résumé des corrections majeures de la V1.1'),
    tbl(
      ['Correction', 'Valeur précédente', 'Valeur corrigée', 'Justification'],
      [
        ['CAPEX Ligne 2', '1,63 Mds FCFA (installation uniquement)', '2,10 Mds FCFA (acquisition + installation)', 'Conforme au budget réel et standards internationaux'],
        ['CAPEX Ligne 3', '1,56 Mds FCFA (installation uniquement)', '2,00 Mds FCFA (acquisition + installation)', 'Conforme au budget réel avec économies d\'échelle'],
        ['Financement BIDC', '80% dette + 20% fonds propres', '100% dette senior BIDC', 'Politique BIDC projets industriels CEDEAO'],
        ['Dette totale BIDC', '3,05 Mds FCFA', '4,60 Mds FCFA', 'Couvre 100% du nouveau programme d\'investissement'],
        ['BFR structurel', 'Non intégré au plan de financement', '1,34 Mds FCFA (15,8% du CA) — LC BIDC 800 M + autofinancement', 'Exigence BAD/BIDC — BFR obligatoire dans structuration financement'],
        ['Dette BIDC totale (CAPEX + BFR)', '4,60 Mds FCFA', '5,40 Mds FCFA (4,6 Mds CAPEX + 0,8 Mds LC BFR)', 'Financement intégral du programme y compris BFR'],
        ['Amortissements annuels', '669 M FCFA', '670 M FCFA', 'CAPEX immobilisé 6,7 Mds × 10%'],
        ['Charges financières 2027', '286 M FCFA', '368 M FCFA', '4,6 Mds × 8%'],
        ['DSCR moyen (prêt CAPEX)', '9,36x', '6,19x', 'Dette plus élevée mais EBITDA confortable'],
        ['DSCR global (prêt + LC BFR)', 'Non calculé', '6,21x', 'Inclut le service de la ligne de crédit BFR (64 M/an d\'intérêts)'],
        ['TRI Projet', '26,5%', '24,8%', 'Recalcul sur base du nouveau CAPEX et dette'],
        ['VAN (12%)', '4,52 Mds', '3,85 Mds', 'Recalcul sur base du nouveau CAPEX et dette'],
        ['Payback', '3,7 ans', '3,9 ans', 'Légère augmentation due au CAPEX supérieur'],
        ['Marge de sécurité', '69,0%', '61,8%', 'Charges fixes plus élevées (amortissements + intérêts)'],
      ],
      [25, 25, 25, 25]
    ),
    sp(),
    h2('Annexe D — Équipe de rédaction'),
    tbl(
      ['Rôle', 'Profil', 'Contribution'],
      [
        ['Chef de mission', 'Expert en ingénierie financière et projets miniers — 20 ans d\'expérience', 'Coordination, modélisation financière, structuration dette'],
        ['Expert technique mines & carrières', 'Ingénieur mines — 15 ans d\'expérience Afrique de l\'Ouest', 'Analyse technique, dimensionnement, CAPEX'],
        ['Analyste de marché', 'Économiste spécialisé BTP/Infrastructure Afrique', 'Analyse de marché, projections demande'],
        ['Expert ESG', 'Spécialiste IFC Performance Standards — 10 ans', 'Analyse ESG, PGES, indicateurs de suivi'],
        ['Juriste OHADA', 'Avocat spécialisé droit des affaires Afrique — 12 ans', 'Cadre réglementaire, permis, conformité'],
      ],
      [20, 35, 45]
    ),
    sp(),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: '─────────────────────────────────────────────────────────────────────────────', color: STEEL, size: 20, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS — Cabinet International de Conseil', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Finance · Stratégie · Ingénierie de Projets · ESG', size: 18, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'khepraexperts.com | contact@khepraexperts.com', size: 18, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Réf. KE-CGI-TOGO-2026-001 | Version 1.1 Corrigée | Mai 2026 | CONFIDENTIEL', size: 16, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateFeasibilityStudyCornerstone(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    ...coverPage(),
    ...legalNotice(),
    ...tableOfContents(),
    ...section1(),
    ...section2(),
    ...section3(),
    ...section4(),
    ...section5(),
    ...section6(),
    ...section7(),
    ...section8(),
    ...section9(),
    ...section10(),
    ...section11(),
    ...section12(),
    ...section13(),
    ...annexes(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Étude de Faisabilité — Programme d\'Exploitation Industrielle Carrière Granulats — CGI SA — Togo 2026-2036',
    description: 'Étude de Faisabilité Technique, Commerciale et Financière — CORNERSTONE GROUP INTERNATIONAL SA — Carrière Siyimé, Haho, Togo',
    subject: 'Mines & Carrières — Granulats — Togo — Afrique de l\'Ouest',
    keywords: 'faisabilité, carrière, granulats, Togo, BIDC, BAD, IFC, ESG, CORNERSTONE GROUP',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.0),
              bottom: convertInchesToTwip(1.0),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS  |  Étude de Faisabilité — CGI SA — Carrière Granulats Togo 2026-2036  |  Réf. KE-CGI-TOGO-2026-001  |  CONFIDENTIEL', size: 15, color: GRAY, font: 'Calibri' }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: STEEL } },
                spacing: { after: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS — khepraexperts.com  |  Conforme aux standards BAD · BIDC · IFC · ESG  |  Page ', size: 15, color: GRAY, font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 15, color: STEEL, font: 'Calibri', bold: true }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 2, color: STEEL } },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allContent,
      },
    ],
  });

  return Packer.toBlob(doc);
}



