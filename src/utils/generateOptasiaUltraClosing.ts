import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageBreak, Header, Footer, PageNumber, convertInchesToTwip,
} from 'docx';

const NAVY = '0A2540', NAVY_MID = '123B5C', STEEL = '2E6DA4', STEEL_LT = 'D6E8F7',
  GOLD = 'B8860B', GOLD_LT = 'FDF6E3', DARK = '1A2332', GRAY = '5A6573', LGRAY = 'F4F6F9',
  WHITE = 'FFFFFF', GREEN = '1A7A4A', GREEN_LT = 'E6F4ED', AMBER = 'D97706', AMBER_LT = 'FEF3C7',
  RED = 'C0392B', RED_LT = 'FDECEC';

function sp(n = 1): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 0, after: n * 120 } });
}
function hr(color = NAVY_MID): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 4 })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color } }, spacing: { before: 80, after: 80 } });
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
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, color: NAVY_MID, font: 'Calibri' })], border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: STEEL } }, spacing: { before: 360, after: 160 } });
}
function h3(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 22, color: STEEL, font: 'Calibri' })], spacing: { before: 280, after: 120 } });
}
function h4(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: DARK, font: 'Calibri' })], spacing: { before: 160, after: 80 } });
}
function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, size: opts?.size || 20, font: 'Calibri', bold: opts?.bold, italics: opts?.italic, color: opts?.color || DARK })], spacing: { before: 60, after: 80 }, alignment: AlignmentType.JUSTIFIED });
}
function bullet(text: string, icon = '\u25B8'): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }), new TextRun({ text, size: 20, font: 'Calibri', color: DARK })],
    spacing: { before: 60, after: 60 }, indent: { left: convertInchesToTwip(0.25) },
  });
}
function box(text: string, color: string, bg: string, icon: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  ${text}`, size: 18, font: 'Calibri', bold: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color } },
    indent: { left: convertInchesToTwip(0.2) }, spacing: { before: 160, after: 160 },
  });
}
const infoBox = (t: string) => box(t, STEEL, STEEL_LT, '\u2139');
const successBox = (t: string) => box(t, GREEN, GREEN_LT, '\u2714');
const alertBox = (t: string) => box(t, AMBER, AMBER_LT, '\u26A0');
const dangerBox = (t: string) => box(t, RED, RED_LT, '\u2717');
const goldBox = (t: string) => box(t, GOLD, GOLD_LT, '\u2605');

function tbl(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const n = headers.length;
  let w = colWidths ? [...colWidths] : headers.map(() => Math.floor(100 / n));
  if (w.length < n) { const sum = w.reduce((a, b) => a + (b || 0), 0); const rem = Math.max(100 - sum, 0); const avg = Math.floor(rem / (n - w.length)); while (w.length < n) w.push(avg > 0 ? avg : Math.floor(100 / n)); }
  if (w.length > n) w = w.slice(0, n);
  w = w.map(v => (v === undefined || v === null || Number.isNaN(v)) ? Math.floor(100 / n) : v);
  const normalized = rows.map(r => { if (r.length < n) return [...r, ...Array(n - r.length).fill('')]; if (r.length > n) return r.slice(0, n); return r; });
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER })],
    })),
  });
  const dataRows = normalized.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? WHITE : LGRAY, fill: ri % 2 === 0 ? WHITE : LGRAY },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK, bold: ci === 0 })], alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.LEFT })],
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: w.map(v => `${v}%`),
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

function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({ children: [new TextRun({ text: '', size: 4 })], shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY }, spacing: { before: 0, after: 0 } }),
    sp(2),
    new Paragraph({ children: [new TextRun({ text: 'KHEPRA EXPERTS', bold: true, size: 40, color: STEEL, font: 'Calibri', allCaps: true, characterSpacing: 40 })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Cabinet International de Conseil \u2014 Gouvernance \u00B7 Strat\u00E9gie \u00B7 Finance \u00B7 Gestion des Risques', size: 20, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 } }),
    hr(GOLD),
    sp(1),
    new Paragraph({ children: [new TextRun({ text: 'NOTE CONCEPTUELLE EX\u00C9CUTIVE', bold: true, size: 42, color: WHITE, font: 'Calibri', allCaps: true })], alignment: AlignmentType.CENTER, spacing: { before: 300, after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'ULTRA-CLOSING', bold: true, size: 52, color: GOLD, font: 'Calibri', allCaps: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 } }),
    new Paragraph({ children: [new TextRun({ text: 'Programme Panafricain d\u2019Inclusion Financi\u00E8re R\u00E9gul\u00E9e', bold: true, size: 24, color: STEEL, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'D\u00E9ploiement simultan\u00E9 dans 7 pays \u2014 UEMOA \u00B7 CEMAC', bold: true, size: 22, color: GRAY, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 300 } }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({ children: [new TextRun({ text: 'Destinataire : M. le Pr\u00E9sident-Directeur G\u00E9n\u00E9ral du Groupe OPTASIA', bold: true, size: 22, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Objet : Proposition d\u2019orchestration strat\u00E9gique et r\u00E9glementaire', size: 20, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 400 } }),
    tbl(['Client', 'Pays cibles', 'R\u00E9f\u00E9rence', 'Classification'], [['Groupe OPTASIA', 'Togo \u00B7 B\u00E9nin \u00B7 Burkina Faso \u00B7 Mali \u00B7 Cameroun \u00B7 Congo \u00B7 Gabon', 'KE-OPT-2026-002-UC', 'CONFIDENTIEL \u2014 STRICTEMENT PRIV\u00C9']], [25, 40, 20, 15]),
    sp(1),
    tbl(['Date d\u2019\u00E9mission', 'Version', 'Statut', 'Langue'], [['Mai 2026', 'V2.0', 'CONFIDENTIEL', 'Fran\u00E7ais']], [25, 25, 25, 25]),
    sp(2),
    new Paragraph({ children: [new TextRun({ text: 'Produit par KHEPRA EXPERTS \u2014 Niveau McKinsey / BCG / IFC / Banque Mondiale', size: 18, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Ce document est soumis \u00E0 un accord de confidentialit\u00E9. Toute reproduction ou divulgation est interdite.', size: 16, color: 'AAAAAA', font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
    pb(),
  ];
}

function tableOfContents(): (Paragraph | Table)[] {
  const items = [
    { n: '1.', t: 'Executive Ultra-Closing Dashboard', p: '3' },
    { n: '2.', t: 'Note Conceptuelle Strat\u00E9gique', p: '6' },
    { n: '3.', t: 'Feuille de Route Op\u00E9rationnelle', p: '16' },
    { n: '4.', t: 'Gouvernance de Mission', p: '24' },
    { n: '5.', t: 'Matrice de Diff\u00E9renciation Strat\u00E9gique', p: '28' },
    { n: 'A.', t: 'Annexe A \u2014 Investissement et Valeur Cr\u00E9\u00E9e', p: '32' },
    { n: 'B.', t: 'Annexe B \u2014 Engagement KHEPRA : Notre Parole d\u2019Expert', p: '36' },
  ];
  return [
    h1('SOMMAIRE'),
    sp(),
    ...items.map(item => new Paragraph({
      children: [
        new TextRun({ text: `${item.n}  `, bold: true, size: 20, font: 'Calibri', color: STEEL }),
        new TextRun({ text: item.t, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: `  ....  p. ${item.p}`, size: 20, font: 'Calibri', color: GRAY }),
      ],
      spacing: { before: 100, after: 100 },
      border: { bottom: { style: BorderStyle.DOTTED, size: 1, color: 'E5E7EB' } },
    })),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — EXECUTIVE ULTRA-CLOSING DASHBOARD
// ═══════════════════════════════════════════════════════════════
function section1(): (Paragraph | Table)[] {
  return [
    h1('1. EXECUTIVE ULTRA-CLOSING DASHBOARD'),
    sp(),
    body('Cette section synth\u00E9tise l\u2019essentiel de notre diagnostic pour le CEO du Groupe OPTASIA. Chaque risque implicite identifi\u00E9 par les r\u00E9gulateurs est confront\u00E9 \u00E0 la r\u00E9ponse strat\u00E9gique de KHEPRA EXPERTS, avec l\u2019impact imm\u00E9diat pour votre groupe.', { bold: true }),
    sp(),
    h2('1.1 Tableau strat\u00E9gique des risques r\u00E9gulateurs'),
    sp(),
    tbl(
      ['Risque implicite du r\u00E9gulateur', 'R\u00E9ponse strat\u00E9gique KHEPRA', 'Impact imm\u00E9diat pour OPTASIA'],
      [
        [
          'Risque de rejet implicite \u2014 Le dossier semble pr\u00E9par\u00E9 par des acteurs \u00E9trangers au syst\u00E8me prudentiel africain, sans compr\u00E9hension des attentes implicites de la BCEAO/COBAC.',
          'Structuration pr\u00E9alable avec des administrateurs locaux cr\u00E9dibles et un cabinet reconnu par les r\u00E9gulateurs. D\u00E9p\u00F4t pr\u00E9c\u00E9d\u00E9 d\u2019un pr\u00E9-diagnostic r\u00E9glementaire confidentiel.',
          'Augmentation de la probabilit\u00E9 de succ\u00E8s au premier d\u00E9p\u00F4t de 40% (moyenne sectorielle) \u00E0 85%+ (niveau KHEPRA).',
        ],
        [
          'Perception de sous-capitalisation \u2014 Le capital projet\u00E9 ou la structure de holding cr\u00E9e un doute sur la capacit\u00E9 financi\u00E8re de soutenir la croissance prudentielle.',
          'Recommandation d\u2019un capital minimum de 1 milliard FCFA par filiale, structuration de la preuve de capacit\u00E9 de recapitalisation, et gouvernance des fonds propres conforme aux ratios COBAC/BCEAO.',
          'Elimination du risque de refus pour insuffisance de fonds propres. Cr\u00E9dibilit\u00E9 institutionnelle renforc\u00E9e d\u00E8s le premier contact avec le r\u00E9gulateur.',
        ],
        [
          'Risque de structure \u00E9cran \u2014 Une holding interm\u00E9diaire africaine non prudentielle ou un v\u00E9hicule offshore peuvent \u00EAtre per\u00E7us comme un dispositif op\u00E9ratif dissimulant les b\u00E9n\u00E9ficiaires effectifs.',
          'Architecture actionnariale transparente : OPTASIA actionnaire majoritaire direct des filiales, cha\u00EEne de contr\u00F4le document\u00E9e, conformit\u00E9 LBC/FT int\u00E9gr\u00E9e d\u00E8s la conception.',
          'Confiance institutionnelle imm\u00E9diate. Aucune demande compl\u00E9mentaire sur la cha\u00EEne de contr\u00F4le (UBO).',
        ],
        [
          'Gouvernance insuffisante \u2014 Un Conseil d\u2019Administration d\u00E9pourvu de comp\u00E9tences locales ou de capital r\u00E9putationnel r\u00E9gional cr\u00E9e un doute sur la capacit\u00E9 de supervision prudentielle.',
          'Constitution d\u2019un CA avec administrateurs locaux cr\u00E9dibles, int\u00E9gration d\u2019actionnaires minoritaires \u00E0 forte r\u00E9putation r\u00E9gionale, s\u00E9paration des fonctions DG/Pr\u00E9sident du CA, et lobbying institutionnel discret.',
          'Cr\u00E9dibilit\u00E9 du dirigeant aux yeux du r\u00E9gulateur. R\u00E9duction du temps d\u2019enqu\u00EAte de moralit\u00E9 de 3-6 mois.',
        ],
        [
          'Risque r\u00E9putationnel \u2014 La perception d\u2019un acteur \u00E9tranger peu engag\u00E9 dans l\u2019\u00E9cosyst\u00E8me financier local cr\u00E9e une r\u00E9ticence institutionnelle \u00E0 l\u2019agrément.',
          'Int\u00E9gration d\u2019actionnaires minoritaires \u00E0 forte r\u00E9putation r\u00E9gionale, partenariats locaux institutionnalis\u00E9s, et pr\u00E9sence dans les conf\u00E9rences et groupes de travail BCEAO/COBAC.',
          'Capital r\u00E9putationnel instantan\u00E9. Le r\u00E9gulateur per\u00E7oit OPTASIA comme un partenaire structurel, pas un opportuniste financier.',
        ],
        [
          'Risque de surendettement digital \u2014 Le r\u00E9gulateur craint un mod\u00E8le de pr\u00EAt provoquant surendettement, avec absence de scoring responsable et de protection des consommateurs.',
          'Architecture de scoring responsable int\u00E9gr\u00E9e, conformit\u00E9 AML/CFT renforc\u00E9e, cybers\u00E9curit\u00E9 bancaire, gouvernance des donn\u00E9es conforme RGPD-Afrique, et politique de protection des consommateurs document\u00E9e.',
          'Perception positive du r\u00E9gulateur sur la dimension sociale. Alignement avec les strat\u00E9gies nationales d\u2019inclusion financi\u00E8re responsable.',
        ],
        [
          'Mod\u00E8le \u00E9conomique irr\u00E9aliste \u2014 Le business plan semble import\u00E9 d\u2019un autre continent ou d\u2019un autre secteur, sans adaptation aux r\u00E9alit\u00E9s de march\u00E9 africain.',
          'Business plans pays-sp\u00E9cifiques avec hypoth\u00E8ses prudentielles r\u00E9alistes, sc\u00E9narios de stress r\u00E9glementaire, masse critique d\u2019activit\u00E9 d\u00E8s la premi\u00E8re ann\u00E9e, composante inclusion financi\u00E8re forte.',
          'Validation du mod\u00E8le par le r\u00E9gulateur sans aller-retour. Timeline d\u2019agrément raccourcie de 6 \u00E0 9 mois.',
        ],
      ],
      [28, 36, 36]
    ),
    sp(),
    goldBox('Ce tableau est le c\u0153ur de la Note Ultra-Closing : chaque ligne repr\u00E9sente un \u00E9cart fatal si non trait\u00E9, et un avantage comp\u00E9titif structurant si ma\u00EEtris\u00E9 par KHEPRA EXPERTS.'),
    sp(),
    h2('1.2 Les 3 verrous strat\u00E9giques \u00E0 lever'),
    sp(),
    body('Sur la base de notre analyse de 28 missions d\u2019agrément similaires en UEMOA et CEMAC, trois verrous conditionnent le succ\u00E8s ou l\u2019\u00E9chec du programme OPTASIA :', { bold: true }),
    sp(),
    h3('Verrou n\u00B01 : La cr\u00E9dibilit\u00E9 actionnariale'),
    body('La BCEAO et la COBAC scrutent d\u2019abord QUI d\u00E9pose, avant de regarder CE QU\u2019IL d\u00E9pose. Un actionnariat \u00E9tranger, m\u00EAme solide financi\u00E8rement, doit prouver sa compr\u00E9hension du syst\u00E8me africain. La solution n\u2019est pas de masquer la structure, mais de la structurer avec une clart\u00E9 irr\u00E9prochable.'),
    sp(),
    h3('Verrou n\u00B02 : La plausibilit\u00E9 prudentielle du mod\u00E8le'),
    body('Un r\u00E9gulateur africain ne refuse pas un projet prometteur. Il refuse un projet qui semble IRR\u00C9EL pour le contexte local. La cr\u00E9dibilit\u00E9 ne vient pas de l\u2019ambition, mais de la D\u00C9MONSTRATION que l\u2019ambition est soutenable dans le cadre prudentiel local.'),
    sp(),
    h3('Verrou n\u00B03 : L\u2019orchestration multi-pays sans fracture'),
    body('7 pays simultan\u00E9s = 7 r\u00E9gulateurs = 7 timelines = 7 cultures institutionnelles. Sans un orchestre unique, le programme devient une somme de projets nationaux chaotiques. Avec KHEPRA, il devient un programme int\u00E9gr\u00E9 avec des synergies transversales et une coordination centralis\u00E9e.'),
    sp(),
    successBox('Verdict ex\u00E9cutif : Sans KHEPRA EXPERTS, le programme OPTASIA a 65% de probabilit\u00E9 de subir des retards critiques, des rejets implicites ou des demandes compl\u00E9mentaires infinies. Avec KHEPRA, cette probabilit\u00E9 tombe \u00E0 moins de 10%.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — NOTE CONCEPTUELLE STRATÉGIQUE (10 axes)
// ═══════════════════════════════════════════════════════════════
function section2(): (Paragraph | Table)[] {
  return [
    h1('2. NOTE CONCEPTUELLE STRAT\u00C9GIQUE'),
    sp(),
    body('Cette section d\u00E9veloppe les dix axes strat\u00E9giques majeurs qui fondent notre positionnement et notre m\u00E9thodologie. Chaque axe est trait\u00E9 avec la rigueur d\u2019un cabinet de conseil de niveau McKinsey / BCG, et la connaissance terrain de la BCEAO et de la COBAC.'),
    sp(),

    // Axe 1
    h2('2.1 Axe 1 \u2014 Executive Strategic Statement'),
    sp(),
    body('Le Groupe OPTASIA ambitionne de d\u00E9ployer un programme panafricain d\u2019inclusion financi\u00E8re responsable dans sept pays de l\u2019Afrique francophone. Cette vision s\u2019inscrit dans une dynamique globale de transformation syst\u00E9mique des services financiers, de finance r\u00E9siliente, et de souverainet\u00E9 financi\u00E8re digitale.'),
    sp(),
    body('Les objectifs d\u00E9clar\u00E9s du programme incluent :'),
    bullet('L\u2019inclusion financi\u00E8re responsable des populations non bancaris\u00E9es, avec une approche de protection des consommateurs int\u00E9gr\u00E9e d\u00E8s la conception'),
    bullet('La finance r\u00E9siliente, capable de r\u00E9sister aux chocs macro\u00E9conomiques et aux crises sanitaires'),
    bullet('La digitalisation des services financiers via une infrastructure publique digitale s\u00E9curis\u00E9e'),
    bullet('L\u2019autonomisation des PME par l\u2019acc\u00E8s au cr\u00E9dit structur\u00E9 et responsable'),
    bullet('Le renforcement des partenariats public-priv\u00E9 (PPP) dans le secteur financier'),
    bullet('L\u2019alignement avec les strat\u00E9gies nationales et r\u00E9gionales d\u2019inclusion financi\u00E8re'),
    sp(),

    // Axe 2
    h2('2.2 Axe 2 \u2014 Vision panafricaine & souverainet\u00E9 financi\u00E8re'),
    sp(),
    body('Le programme OPTASIA ne se contente pas de r\u00E9pliquer un mod\u00E8le existant. Il vise \u00E0 construire une infrastructure financi\u00E8re digitale responsable, ancr\u00E9e dans la souverainet\u00E9 financi\u00E8re des pays africains. Cette vision implique :'),
    bullet('Une architecture technologique h\u00E9berg\u00E9e sur le continent, avec des data centers certifi\u00E9s et une gouvernance des donn\u00E9es conforme aux standards africains'),
    bullet('Un mod\u00E8le de scoring responsable qui valorise la r\u00E9silience sociale autant que la capacit\u00E9 de remboursement financi\u00E8re'),
    bullet('Une gouvernance prudentielle qui int\u00E8gre les attentes des banques centrales africaines, pas seulement les standards internationaux g\u00E9n\u00E9riques'),
    bullet('Un engagement de long terme : le programme n\u2019est pas une opportunit\u00E9 de court terme, mais une infrastructure de d\u00E9cennies'),
    sp(),
    goldBox('La souverainet\u00E9 financi\u00E8re digitale est le crit\u00E8re de diff\u00E9renciation le plus fort aupr\u00E8s des r\u00E9gulateurs africains. Un acteur qui d\u00E9montre comprendre et respecter cette priorit\u00E9 nationale obtient un traitement diff\u00E9renci\u00E9.'),
    sp(),

    // Axe 3
    h2('2.3 Axe 3 \u2014 Positionnement : Institutional Infrastructure Player'),
    sp(),
    body('OPTASIA doit \u00EAtre per\u00E7u non comme une \u00AB fintech \u00BB, mais comme un \u00AB acteur d\u2019infrastructure financi\u00E8re digitale r\u00E9gul\u00E9e \u00BB. Cette distinction linguistique et conceptuelle est fondamentale pour les r\u00E9gulateurs africains.'),
    sp(),
    body('Le positionnement \u00AB Institutional Infrastructure Player \u00BB implique :'),
    bullet('Une structuration actionnariale transparente et directe, sans v\u00E9hicules opaques ou holdings \u00E9crans'),
    bullet('Un Conseil d\u2019Administration compos\u00E9 de personnalit\u00E9s locales cr\u00E9dibles avec exp\u00E9rience bancaire av\u00E9r\u00E9e'),
    bullet('Un capital social significatif (1 milliard FCFA minimum par filiale) d\u00E9montrant la capacit\u00E9 de soutien \u00E0 long terme'),
    bullet('Une gouvernance des donn\u00E9es conforme aux standards r\u00E9gionaux de protection des consommateurs'),
    bullet('Un engagement explicite dans la stabilit\u00E9 financi\u00E8re et la protection des populations vuln\u00E9rables'),
    sp(),

    // Axe 4
    h2('2.4 Axe 4 \u2014 Complexit\u00E9 r\u00E9glementaire UEMOA/CEMAC'),
    sp(),
    body('Les r\u00E9gulateurs africains (BCEAO, COBAC, Minist\u00E8res des Finances nationaux) sont confront\u00E9s \u00E0 un d\u00E9fi sans pr\u00E9c\u00E9dent : l\u2019arriv\u00E9e massive d\u2019acteurs digitaux proposant des services financiers \u00E0 fort potentiel d\u2019inclusion, mais aussi \u00E0 fort risque de surendettement, de blanchiment, et d\u2019instabilit\u00E9 financi\u00E8re.'),
    sp(),
    body('Cette tension explique pourquoi les agr\u00E9ments dans le secteur de la finance digitale r\u00E9gul\u00E9e sont devenus l\u2019un des processus les plus scrut\u00E9s et les plus longs de l\u2019Afrique francophone. Un dossier mal pr\u00E9par\u00E9 ne re\u00E7oit pas un refus explicite : il re\u00E7oit un silence prolong\u00E9, des demandes compl\u00E9mentaires infinies, ou un rejet implicite masqu\u00E9 derri\u00E8re des questions de forme.'),
    sp(),
    alertBox('La BCEAO et la COBAC ne disposent pas d\u2019un manuel public des \u00AB non-dits \u00BB de l\u2019agr\u00E9ment. Ces attentes implicites se transmettent par la pratique, par les allers-retours, et par les r\u00E9ussites ou \u00E9checs observ\u00E9s. KHEPRA EXPERTS a construit sa m\u00E9thodologie sur l\u2019analyse syst\u00E9matique de ces \u00AB non-dits \u00BB.'),
    sp(),

    // Axe 5
    h2('2.5 Axe 5 \u2014 Architecture institutionnelle optimale'),
    sp(),
    body('Sur la base de notre analyse des attentes implicites des r\u00E9gulateurs, KHEPRA recommande l\u2019architecture actionnariale suivante :'),
    sp(),
    tbl(
      ['Niveau', 'Entit\u00E9', 'R\u00F4le', 'Actionnariat', 'Prudentiel'],
      [
        ['Holding', 'OPTASIA (si\u00E8ge groupe)', 'Strat\u00E9gie globale, capital, technologie', 'Fondateurs / investisseurs', 'Non assujetti'],
        ['Interm\u00E9diaire technique', 'OPTASIA AFRICA HOLDING', 'Coordination IT, propri\u00E9t\u00E9 intellectuelle, support technique', 'OPTASIA 100%', 'Non prudentiel \u2014 holding technique uniquement'],
        ['Filiales nationales', 'OPTASIA [Pays] SA / SARL', 'Op\u00E9rations locales, collecte d\u00E9p\u00F4ts, cr\u00E9dit', 'OPTASIA 51%+, partenaires locaux 49%', 'Assujetties BCEAO/COBAC'],
      ],
      [15, 25, 30, 18, 12]
    ),
    sp(),
    infoBox('Cette architecture garantit la transparence de la cha\u00EEne de contr\u00F4le, la pr\u00E9sence majoritaire directe d\u2019OPTASIA dans chaque filiale, et la distinction claire entre la holding technique (non prudentielle) et les filiales op\u00E9rationnelles (prudentielles).'),
    sp(),

    // Axe 6
    h2('2.6 Axe 6 \u2014 Gouvernance prudentielle & diplomatie institutionnelle'),
    sp(),
    body('Le Conseil d\u2019Administration est le premier organe examin\u00E9 par le r\u00E9gulateur apr\u00E8s l\u2019actionnariat. Sa composition doit r\u00E9pondre aux crit\u00E8res suivants :'),
    bullet('Pr\u00E9sident du CA : personnalit\u00E9 locale de premier plan, avec exp\u00E9rience bancaire ou financi\u00E8re av\u00E9r\u00E9e dans la zone UEMOA ou CEMAC, r\u00E9putation irr\u00E9prochable'),
    bullet('Directeur G\u00E9n\u00E9ral : profil op\u00E9rationnel, connaissance du march\u00E9 local, exp\u00E9rience en microfinance ou banque de d\u00E9tail'),
    bullet('Directeur Financier : CAC ou expert comptable agr\u00E9\u00E9, exp\u00E9rience des ratios COBAC/BCEAO, ma\u00EEtrise du SYSCOHADA'),
    bullet('Administrateurs ind\u00E9pendants : 2 membres minimum avec comp\u00E9tences compl\u00E9mentaires (juriste, expert risques, repr\u00E9sentant institution de d\u00E9veloppement)'),
    bullet('Repr\u00E9sentant OPTASIA : membre du CA avec voix d\u00E9lib\u00E9rative ou consultative selon la r\u00E9glementation locale'),
    sp(),
    body('KHEPRA EXPERTS a construit au fil des ann\u00E9es un r\u00E9seau institutionnel structur\u00E9, que nous mobilisons pour le compte de nos clients : relations professionnelles avec la BCEAO (Dakar), la COBAC (Yaound\u00E9), les Minist\u00E8res des Finances nationaux, et un r\u00E9seau de Commissaires aux Comptes agr\u00E9\u00E9s dans chaque pays.'),
    sp(),

    // Axe 7
    h2('2.7 Axe 7 \u2014 Architecture technologique & IA r\u00E9glement\u00E9e'),
    sp(),
    body('Le r\u00E9gulateur africain ne sanctionne pas l\u2019innovation. Il sanctionne l\u2019innovation IRRESPONSABLE. La diff\u00E9rence entre un agr\u00E9ment obtenu et un agr\u00E9ment refus\u00E9 r\u00E9side souvent dans la d\u00E9monstration que l\u2019acteur a int\u00E9gr\u00E9 la dimension sociale et \u00E9thique d\u00E8s la conception.'),
    sp(),
    body('Notre architecture technologique comprend :'),
    bullet('Conception d\u2019un \u00AB Scoring \u00C9thique \u00BB avec 3 dimensions : capacit\u00E9 de remboursement, historique de cr\u00E9dit, et vuln\u00E9rabilit\u00E9 sociale'),
    bullet('R\u00E9daction d\u2019une Politique de Protection des Consommateurs conforme aux directives BCEAO/COBAC et aux standards internationaux (Smart Campaign, PFIP)'),
    bullet('Dispositif AML/CFT end-to-end : KYC digital, surveillance transactionnelle automatis\u00E9e, formation du personnel, audit annuel'),
    bullet('Int\u00E9gration d\u2019un architecte de la s\u00E9curit\u00E9 informatique d\u00E8s la phase de cadrage pour documenter l\u2019architecture IT aux standards r\u00E9gulateurs'),
    sp(),

    // Axe 8
    h2('2.8 Axe 8 \u2014 Mod\u00E8le \u00E9conomique & r\u00E9silience financi\u00E8re'),
    sp(),
    body('Un r\u00E9gulateur africain ne refuse pas un projet prometteur. Il refuse un projet qui semble irr\u00E9el pour le contexte local. La cr\u00E9dibilit\u00E9 ne vient pas de l\u2019ambition, mais de la d\u00E9monstration que l\u2019ambition est soutenable dans le cadre prudentiel local.'),
    sp(),
    body('KHEPRA EXPERTS produit :'),
    bullet('Business plans individuels pour chacun des 7 pays, avec des \u00E9tudes de march\u00E9 terrain et des benchmarks sectoriels locaux'),
    bullet('Mod\u00E9lisation financi\u00E8re 5 ans avec 3 sc\u00E9narios (optimiste, central, pessimiste) et calcul des ratios COBAC/BCEAO pour chaque ann\u00E9e'),
    bullet('Stress-test r\u00E9glementaire : simulation de l\u2019impact d\u2019un renforcement des ratios de solvabilit\u00E9, d\u2019une baisse de la qualité du portefeuille, ou d\u2019une crise de liquidit\u00E9'),
    bullet('D\u00E9monstration de la masse critique : nombre de clients, encours de cr\u00E9dit, \u00E9pargne collect\u00E9e, rentabilit\u00E9 d\u00E8s l\u2019ann\u00E9e 1'),
    sp(),

    // Axe 9
    h2('2.9 Axe 9 \u2014 Matrice de risques r\u00E9glementaires'),
    sp(),
    body('Nous g\u00E9rons les risques r\u00E9glementaires en mode proactif, pas r\u00E9actif. Notre matrice repose sur :'),
    bullet('Cartographie des risques r\u00E9glementaires par pays : matrice de probabilit\u00E9/impact avec 20 risques identifi\u00E9s et mitigations pr\u00E9d\u00E9finies'),
    bullet('Veille r\u00E9glementaire continue : suivi des r\u00E9visions des r\u00E8glements COBAC/BCEAO, des circulaires, et des jurisprudences des cours r\u00E9gionales (OHADA)'),
    bullet('Sc\u00E9narios de crise : plans de contingence pour chaque pays (changement de gouvernement, r\u00E9vision r\u00E9glementaire majeure, crise sanitaire)'),
    bullet('Assurance r\u00E9glementaire : identification des clauses contractuelles permettant de prot\u00E9ger OPTASIA en cas de blocage r\u00E9glementaire impr\u00E9visible'),
    sp(),

    // Axe 10
    h2('2.10 Axe 10 \u2014 M\u00E9thodologie exclusive Khepra Experts'),
    sp(),
    body('KHEPRA EXPERTS ne se positionne pas comme un prestataire de services parmi d\u2019autres. Nous sommes l\u2019ORCHESTRATEUR UNIQUE du programme OPTASIA, capable de coordonner simultan\u00E9ment la structuration r\u00E9glementaire, l\u2019ing\u00E9nierie institutionnelle, les d\u00E9p\u00F4ts d\u2019agréments, la gouvernance prudentielle, la coordination multi-pays, la gestion des risques r\u00E9glementaires, la diplomatie institutionnelle, et le lancement op\u00E9rationnel des filiales.'),
    sp(),
    body('Notre m\u00E9thodologie repose sur 5 piliers d\u2019orchestration :'),
    sp(),
    h3('Pilier 1 \u2014 Intelligence R\u00E9glementaire Pr\u00E9dictive'),
    body('Avant m\u00EAme de r\u00E9diger un statut ou un business plan, nous r\u00E9alisons un diagnostic pr\u00E9dictif des attentes implicites du r\u00E9gulateur cible. Ce diagnostic repose sur l\u2019analyse des 28 dossiers d\u2019agr\u00E9ment que nous avons accompagn\u00E9s en UEMOA et CEMAC.'),
    sp(),
    h3('Pilier 2 \u2014 Ing\u00E9nierie Institutionnelle Int\u00E9gr\u00E9e'),
    body('Nous ne d\u00E9l\u00E9guons pas : nous orchestrons. Chaque expert intervenant (juriste OHADA, notaire, CAC, architecte IT, consultant pays) travaille sous notre coordination unique. Un seul interlocuteur pour OPTASIA : KHEPRA EXPERTS.'),
    sp(),
    h3('Pilier 3 \u2014 Structuration Prudentielle Multi-Pays'),
    body('7 pays ne signifient pas 7 projets ind\u00E9pendants. Templates transversaux, adaptation pays par pays, coordination centralis\u00E9e via comit\u00E9 de pilotage bi-mensuel, et d\u00E9ploiement s\u00E9quentiel optimis\u00E9.'),
    sp(),
    h3('Pilier 4 \u2014 Diplomatie Institutionnelle et Gestion des Risques R\u00E9glementaires'),
    body('Pr\u00E9sence aux conf\u00E9rences r\u00E9glementaires, lobbying institutionnel discret avant d\u00E9p\u00F4t, gestion proactive des demandes compl\u00E9mentaires, et accompagnement des dirigeants lors des auditions.'),
    sp(),
    h3('Pilier 5 \u2014 Lancement Op\u00E9rationnel et Transition Manag\u00E9riale'),
    body('L\u2019agr\u00E9ment n\u2019est pas la fin de la mission : c\u2019est le d\u00E9but de l\u2019op\u00E9ration. Recrutement, formation, mise en place SI, lancement des op\u00E9rations, premier reporting r\u00E9glementaire, et audit de conformit\u00E9 post-lancement.'),
    sp(),
    successBox('La dur\u00E9e totale d\u2019un cycle S0 \u00E0 S5 est de 29 semaines (7 mois) pour les dossiers complets. Avec le suivi S5 et le lancement S6, le programme pilote est op\u00E9rationnel en 10 mois. Ce rythme est 40% plus rapide que la moyenne sectorielle.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — FEUILLE DE ROUTE OPÉRATIONNELLE (4 phases Gantt)
// ═══════════════════════════════════════════════════════════════
function section3(): (Paragraph | Table)[] {
  return [
    h1('3. FEUILLE DE ROUTE OP\u00C9RATIONNELLE'),
    sp(),
    body('La feuille de route suivante pr\u00E9sente un d\u00E9ploiement optimis\u00E9, avec une s\u00E9quence pilote-apprentissage-duplication pour minimiser les risques et maximiser les synergies. Le chronogramme type Gantt couvre 4 phases majeures sur 180 jours.'),
    sp(),

    // PHASE 1
    h2('3.1 PHASE 1 \u2014 PRE-LICENSING (T0 \u2013 T30)'),
    sp(),
    body('Cette phase fondatrice \u00E9tablit les bases de toute la mission. Elle est critique car toute erreur ici se propage en cascade.'),
    sp(),
    tbl(
      ['Activit\u00E9 cl\u00E9', 'D\u00E9lai', 'Livrable', 'Responsable'],
      [
        ['Audit readiness \u2014 \u00C9valuation de la conformit\u00E9 du Groupe OPTASIA aux exigences BCEAO/COBAC', 'S1-S2', 'Rapport d\u2019\u00E9cart de conformit\u00E9', 'KHEPRA + OPTASIA'],
        ['Cartographie r\u00E9glementaire \u2014 Analyse pays par pays des textes, circulaires, et attentes implicites', 'S2-S4', 'Cartographie r\u00E9glementaire 7 pays', 'KHEPRA'],
        ['Documentation groupe \u2014 Traduction, conversion mon\u00E9taire, certification OHADA des \u00E9tats financiers', 'S3-S5', 'Dossier documentaire groupe certifi\u00E9', 'KHEPRA + CAC'],
        ['Structuration juridique \u2014 Statuts, pactes d\u2019actionnaires, RCCM, immatriculation', 'S4-S6', 'Entit\u00E9s juridiques constitu\u00E9es', 'KHEPRA + Notaire'],
        ['Pr\u00E9-validation prudentielle \u2014 Revue interne du dossier par un ancien r\u00E9gulateur', 'S6-S8', 'Avis de pr\u00E9-validation', 'KHEPRA (expert r\u00E9gulateur)'],
      ],
      [32, 14, 32, 22]
    ),
    sp(),

    // PHASE 2
    h2('3.2 PHASE 2 \u2014 REGULATORY ENGINEERING (T30 \u2013 T60)'),
    sp(),
    body('Cette phase transforme la vision strat\u00E9gique en documents r\u00E9glementaires pr\u00Eats au d\u00E9p\u00F4t. C\u2019est la phase la plus dense en ing\u00E9nierie.'),
    sp(),
    tbl(
      ['Activit\u00E9 cl\u00E9', 'D\u00E9lai', 'Livrable', 'Responsable'],
      [
        ['Business plans pays \u2014 Mod\u00E9lisation financi\u00E8re 5 ans, sc\u00E9narios, ratios, stress-tests', 'S9-S16', '7 business plans valid\u00E9s', 'KHEPRA + CAC'],
        ['Structuration gouvernance \u2014 Constitution des CA, recrutement dirigeants, s\u00E9paration des fonctions', 'S10-S14', 'Conseils d\u2019Administration constitu\u00E9s', 'KHEPRA'],
        ['Finalisation partenariats \u2014 N\u00E9gociation actionnaires minoritaires, MOU institutionnels', 'S12-S16', 'Pactes d\u2019actionnaires sign\u00E9s', 'KHEPRA + OPTASIA'],
        ['Core banking agreements \u2014 S\u00E9lection et contractualisation du syst\u00E8me d\u2019information', 'S14-S18', 'Contrats SI sign\u00E9s', 'KHEPRA + DSI OPTASIA'],
        ['Diplomatie institutionnelle discr\u00E8te \u2014 Pr\u00E9sentations pr\u00E9alables aux directions BCEAO/COBAC', 'S16-S20', 'Compte-rendu des rencontres', 'KHEPRA (relations institutionnelles)'],
      ],
      [32, 14, 32, 22]
    ),
    sp(),

    // PHASE 3
    h2('3.3 PHASE 3 \u2014 REGULATORY SUBMISSION (T60 \u2013 T90)'),
    sp(),
    body('Cette phase est le moment de v\u00E9rit\u00E9 : les dossiers sont d\u00E9pos\u00E9s et l\u2019orchestration r\u00E9glementaire entre en action.'),
    sp(),
    tbl(
      ['Activit\u00E9 cl\u00E9', 'D\u00E9lai', 'Livrable', 'Responsable'],
      [
        ['D\u00E9p\u00F4ts simultan\u00E9s \u2014 Constitution et d\u00E9p\u00F4t des 7 dossiers complets d\u2019agr\u00E9ment', 'S21-S24', 'Accus\u00E9s de r\u00E9ception des d\u00E9p\u00F4ts', 'KHEPRA + Notaires locaux'],
        ['Coordination multi-r\u00E9gulateurs \u2014 Suivi des instructions en parall\u00E8le BCEAO et COBAC', 'S22-S30', 'Tableau de bord des instructions', 'KHEPRA'],
        ['Gestion des requ\u00EAtes BCEAO/COBAC \u2014 R\u00E9ponses structur\u00E9es dans les 48h aux demandes compl\u00E9mentaires', 'Continu', 'R\u00E9ponses valid\u00E9es et transmises', 'KHEPRA'],
        ['D\u00E9fense institutionnelle des dossiers \u2014 Auditions des dirigeants, pr\u00E9sentations au comit\u00E9 d\u2019agr\u00E9ment', 'S26-S32', 'Avis favorable des comit\u00E9s', 'KHEPRA + Dirigeants OPTASIA'],
      ],
      [32, 14, 32, 22]
    ),
    sp(),

    // PHASE 4
    h2('3.4 PHASE 4 \u2014 OPERATIONAL ACTIVATION (T90 \u2013 T180)'),
    sp(),
    body('L\u2019agr\u00E9ment n\u2019est pas la fin. Cette phase transforme le papier en op\u00E9rations r\u00E9elles.'),
    sp(),
    tbl(
      ['Activit\u00E9 cl\u00E9', 'D\u00E9lai', 'Livrable', 'Responsable'],
      [
        ['Mise en exploitation \u2014 Recrutement, formation, installation, lancement des op\u00E9rations de cr\u00E9dit', 'S33-S40', 'Op\u00E9rations lanc\u00E9es (2-3 pays pilotes)', 'KHEPRA + OPTASIA'],
        ['Contr\u00F4le conformit\u00E9 \u2014 V\u00E9rification que l\u2019op\u00E9ration respecte le dossier agr\u00E9\u00E9', 'S38-S42', 'Rapport de conformit\u00E9 post-lancement', 'KHEPRA'],
        ['Renforcement prudentiel \u2014 Premiers reporting r\u00E9glementaires, ajustement des politiques', 'S40-S48', 'Reporting mensuel/trimestriel op\u00E9rationnel', 'KHEPRA + OPTASIA'],
        ['Monitoring des indicateurs critiques \u2014 Ratios, qualité du portefeuille, liquidit\u00E9, solvabilit\u00E9', 'Continu', 'Tableau de bord prudentiel mensuel', 'KHEPRA'],
      ],
      [32, 14, 32, 22]
    ),
    sp(),

    // Séquençage stratégique
    h2('3.5 S\u00E9quen\u00E7age strat\u00E9gique : pilotes, apprentissage, duplication'),
    sp(),
    tbl(
      ['Vague', 'Pays', 'R\u00F4le', 'D\u00E9marrage S0', 'D\u00E9p\u00F4t agr\u00E9ment', 'Lancement op\u00E9rationnel'],
      [
        ['Vague 1 \u2014 Pilotes', 'Togo, Cameroun', 'Tester le mod\u00E8le, valider la m\u00E9thodologie, cr\u00E9er les templates', 'M1', 'M8', 'M11'],
        ['Vague 2 \u2014 Apprentissage', 'B\u00E9nin, Gabon', 'Appliquer les templates valid\u00E9s, adapter aux sp\u00E9cificit\u00E9s locales', 'M4', 'M11', 'M14'],
        ['Vague 3 \u2014 Duplication rapide', 'Burkina Faso, Congo, Mali', 'Dupliquer avec les templates optimis\u00E9s, b\u00E9n\u00E9ficier des retours d\u2019exp\u00E9rience', 'M7', 'M14', 'M17'],
      ],
      [20, 22, 24, 12, 12, 10]
    ),
    sp(),

    // Gouvernance de projet
    h2('3.6 Gouvernance de projet KHEPRA \u00D7 OPTASIA'),
    sp(),
    tbl(
      ['Organe', 'Composition', 'Fr\u00E9quence', 'R\u00F4le'],
      [
        ['Comit\u00E9 de pilotage strat\u00E9gique', 'CEO OPTASIA + Fondateur KHEPRA + DG filiales pilotes', 'Mensuel', 'Arbitrages strat\u00E9giques, budget, timeline'],
        ['Comit\u00E9 op\u00E9rationnel', 'Chef de mission KHEPRA + Point focal OPTASIA + Consultants pays', 'Bi-mensuel', 'Suivi avancement, gestion des blocages, reporting'],
        ['Cellule r\u00E9glementaire', 'Expert conformit\u00E9 KHEPRA + Juriste OHADA + CAC', 'Hebdomadaire', 'Veille r\u00E9glementaire, qualité des dossiers, r\u00E9ponses aux observations'],
        ['Cellule IT et s\u00E9curit\u00E9', 'Architecte IT KHEPRA + DSI OPTASIA + Consultant cybers\u00E9curit\u00E9', 'Bi-mensuel', 'Architecture SI, conformit\u00E9, PCA, tests de s\u00E9curit\u00E9'],
      ],
      [22, 38, 18, 22]
    ),
    sp(),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — GOUVERNANCE DE MISSION
// ═══════════════════════════════════════════════════════════════
function section4(): (Paragraph | Table)[] {
  return [
    h1('4. GOUVERNANCE DE MISSION'),
    sp(),
    body('Cette section d\u00E9finit avec pr\u00E9cision la structure de gouvernance qui encadrera la mission d\u2019orchestration KHEPRA \u00D7 OPTASIA. Trois entit\u00E9s principales interviennent : le Groupe OPTASIA, le Comit\u00E9 de Pilotage, et KHEPRA EXPERTS.'),
    sp(),

    h2('4.1 OPTASIA GROUP \u2014 Engagements strat\u00E9giques'),
    sp(),
    body('Le Groupe OPTASIA, en sa qualité de maître d’ouvrage du programme panafricain, s’engage sur les éléments suivants :'),
    sp(),
    h3('Capitalisation'),
    bullet('Versement effectif du capital social minimum de 1 milliard FCFA par filiale, dans les délais fixés par la feuille de route'),
    bullet('Démonstration de la capacité de recapitalisation via lettres d’engagement des actionnaires et preuves de fonds'),
    bullet('Mise à disposition des états financiers consolidés des 3 dernières années, certifiés et traduits en français'),
    bullet('Ouverture des comptes bancaires de libération du capital dans les pays cibles, avec attestation bancaire'),
    sp(),
    h3('Documentation'),
    bullet('Fourniture des documents constitutifs du groupe : statuts, PV d’assemblées, registre des actionnaires, casiers judiciaires des dirigeants'),
    bullet('Transmission des rapports d’activités, business plans existants, et documentation technique (IT, scoring, cybersécurité)'),
    bullet('Attestation de conformité AML/CFT au niveau groupe, incluant la cartographie des risques et les politiques en vigueur'),
    sp(),
    h3('Engagements stratégiques'),
    bullet('Désignation d’un point focal unique au sein d’OPTASIA, avec pouvoir de décision et disponibilité temps plein pendant la phase critique (T0-T90)'),
    bullet('Participation active du CEO aux comités de pilotage mensuels et aux auditions réglementaires dans les pays pilotes'),
    bullet('Respect des délais de validation et de retour des documents soumis par KHEPRA (48h maximum pour les validations, 7 jours pour les commentaires structurés)'),
    bullet('Engagement de confidentialité sur l’ensemble des informations échangées dans le cadre de la mission'),
    sp(),

    h2('4.2 COMIT\u00C9 DE PILOTAGE \u2014 Supervision, arbitrage, gouvernance'),
    sp(),
    body('Le Comité de Pilotage est l’organe de direction de la mission. Il réunit les décideurs des deux parties et assure la supervision stratégique.'),
    sp(),
    tbl(
      ['Fonction', 'Membres', 'Fréquence', 'Pouvoirs'],
      [
        ['Présidence', 'CEO Groupe OPTASIA', 'Mensuelle', 'Arbitrage final, validation budget, décisions stratégiques'],
        ['Direction de mission', 'Fondateur KHEPRA EXPERTS', 'Mensuelle', 'Rapport d’avancement, recommandations, alertes'],
        ['Direction opérationnelle', 'Chef de mission KHEPRA + Point focal OPTASIA', 'Bi-mensuelle', 'Suivi des livrables, gestion des blocages, reporting détaillé'],
        ['Expertise réglementaire', 'Expert conformité KHEPRA + Juriste OHADA', 'Hebdomadaire', 'Qualité des dossiers, veille réglementaire, réponses aux observations'],
        ['Expertise technique', 'Architecte IT KHEPRA + DSI OPTASIA', 'Bi-mensuelle', 'Architecture SI, cybersécurité, conformité technique'],
      ],
      [20, 32, 16, 32]
    ),
    sp(),
    body('Le Comité de Pilotage dispose des pouvoirs suivants :'),
    bullet('Validation des livrables majeurs (business plans, statuts, dossiers d’agrément) avant dépôt'),
    bullet('Arbitrage sur les choix stratégiques (pays prioritaires, partenaires locaux, montants de capital)'),
    bullet('Décision sur les ajustements de feuille de route en cas de blocage réglementaire ou opérationnel'),
    bullet('Approbation des budgets supplémentaires en cas de demandes complémentaires inattendues des régulateurs'),
    sp(),

    h2('4.3 KHEPRA EXPERTS \u2014 Orchestration et ingénierie'),
    sp(),
    body('KHEPRA EXPERTS assume la responsabilité globale de l’orchestration du programme. Nos missions couvrent 8 domaines d’expertise :'),
    sp(),
    tbl(
      ['Domaine d’expertise', 'Description', 'Livrables', 'Délai'],
      [
        ['Orchestration réglementaire', 'Coordination centralisée des 7 dossiers d’agrément, templates transversaux, adaptation pays par pays', 'Feuille de route unifiée, templates, dossiers complets', 'S0 — S5'],
        ['Ingénierie prudentielle', 'Structuration des fonds propres, ratios BCEAO/COBAC, stress-tests, modélisation financière', 'Business plans 5 ans, ratios annuels, scénarios de stress', 'S3'],
        ['Coordination multi-pays', 'Gestion des 7 timelines, mutualisation des ressources, partage des apprentissages', 'Tableau de bord multi-pays, reporting mensuel', 'S0 — S6'],
        ['Pilotage des agréments', 'Dépôt, suivi des instructions, réponses aux observations, auditions', 'Accusés de dépôt, avis des comités, agréments obtenus', 'S5'],
        ['Gestion des risques réglementaires', 'Cartographie des risques, veille réglementaire, scénarios de crise, plans de contingence', 'Matrice des risques, rapports de veille, plans de contingence', 'Continu'],
        ['Diplomatie institutionnelle', 'Relations BCEAO/COBAC, lobbying discret, présence aux conférences, groupes de travail', 'Comptes-rendus des rencontres, lettres de soutien institutionnel', 'S0 — S6'],
        ['Structuration juridique', 'Statuts OHADA, pactes d’actionnaires, RCCM, immatriculation, documentation légalisée', 'Entités juridiques constituées, actes authentifiés', 'S2'],
        ['Lancement opérationnel', 'Recrutement, formation, mise en place SI, premiers crédits, reporting réglementaire', 'Opérations lancées, premiers rapports mensuels', 'S6'],
      ],
      [22, 30, 28, 20]
    ),
    sp(),
    successBox('KHEPRA EXPERTS est le seul interlocuteur d’OPTASIA pour l’ensemble de la mission. Un seul contrat, un seul reporting, une seule responsabilité. Cette simplicité de gouvernance est un avantage compétitif majeur dans un programme multi-pays.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — MATRICE DE DIFFÉRENCIATION STRATÉGIQUE
// ═══════════════════════════════════════════════════════════════
function section5(): (Paragraph | Table)[] {
  return [
    h1('5. MATRICE DE DIFF\u00C9RENCIATION STRAT\u00C9GIQUE'),
    sp(),
    body('Cette section démontre, point par point, pourquoi KHEPRA EXPERTS est l’unique partenaire crédible pour orchestrer le programme OPTASIA. La comparaison porte sur 8 dimensions critiques de succès.'),
    sp(),

    h2('5.1 Comparaison stratégique : Cabinet Juridique vs Cabinet Fintech vs KHEPRA'),
    sp(),
    tbl(
      ['Critère de succès', 'Cabinet Juridique Classique', 'Cabinet Fintech', 'KHEPRA EXPERTS'],
      [
        ['Maîtrise prudentielle', 'Maîtrise du droit OHADA, mais aveugle aux « non-dits » régulateurs', 'Expertise technologique, mais ignorance des 47 références réglementaires BCEAO/COBAC', 'Maîtrise complète des attentes explicites ET implicites des régulateurs africains'],
        ['Intelligence réglementaire', 'Connaissance des textes, mais pas des pratiques d’instruction', 'Focus sur le produit, pas sur le processus d’agrément', 'Intelligence prédictive basée sur 28 missions d’agrément réelles en UEMOA/CEMAC'],
        ['Lobbying institutionnel', 'Aucun réseau institutionnel actif avec BCEAO/COBAC', 'Pas de présence dans les conférences et groupes de travail réglementaires', 'Réseau structuré avec BCEAO (Dakar), COBAC (Yaoundé), Ministères des Finances'],
        ['Coordination multi-juridictionnelle', 'Gestion pays par pays, sans coordination centralisée', 'Approche produit unique, sans adaptation pays par pays', 'Orchestration centralisée : un seul interlocuteur, un seul reporting, 7 pays synchronisés'],
        ['Mitigation des risques', 'Réactif aux demandes complémentaires', 'Pas de veille réglementaire ni de plans de contingence', 'Proactif : cartographie des 20 risques par pays, scénarios de crise, plans de contingence'],
        ['Exécution simultanée', 'Séquentiel, pays par pays, sans mutualisation', 'Parallèle sur le développement produit, mais séquentiel sur le déploiement réglementaire', 'Parallèle sur les 7 pays : templates transversaux, adaptation locale, feuille de route unifiée'],
        ['Préparation pré-agrément', 'Limitée à la structuration juridique', 'Limitée au pitch deck et au prototype', 'End-to-end : actionnariat, gouvernance, business plans, SI, LBC/FT, scoring, CA, diplomatie'],
        ['Orchestration continentale', 'Absente : chaque pays géré par un cabinet local différent', 'Absente : chaque pays géré par une équipe produit séparée', 'Présente et structurée : comité de pilotage bi-mensuel, reporting unifié, partage des apprentissages'],
      ],
      [20, 26, 26, 28]
    ),
    sp(),

    h2('5.2 Pourquoi l’approche classique échoue : calcul du risque financier'),
    sp(),
    body('L’échec ou le retard d’un programme d’agrément n’est pas un coût indirect. C’est un coût DIRECT, mesurable, et souvent supérieur au coût d’une mission d’accompagnement structurée.'),
    sp(),
    tbl(
      ['Poste de coût', 'Montant estimé (7 pays)', 'Commentaire'],
      [
        ['Retard de 6 mois : coûts opérationnels fixes', '350M FCFA', 'Salaires, loyers, frais de structure sans revenus'],
        ['Retard de 6 mois : perte de parts de marché', '500M FCFA', 'Concurrence qui s’installe pendant le retard'],
        ['Retard de 12 mois : recapitalisation nécessaire', '700M FCFA', 'Inflation, dévaluation, hausse des seuils réglementaires'],
        ['Rejet implicite + redépôt', '200M FCFA', 'Refonte du dossier, nouvelles études, frais administratifs doublés'],
        ['Érosion réputationnelle auprès des partenaires', 'Incotables', 'Perte de crédibilité auprès des investisseurs, bailleurs, et autorités'],
        ['TOTAL', '1,75 Mds FCFA minimum', 'Sur un horizon de 12 mois de retard'],
      ],
      [30, 30, 40]
    ),
    sp(),
    dangerBox('Résultat typique d’un cabinet juridique seul : dossier juridiquement parfait, rejet ou retard de 12 à 18 mois pour des raisons « non juridiques » que le cabinet n’a pas anticipées.'),
    sp(),
    dangerBox('Résultat typique d’un consultant fintech seul : produit technologiquement abouti, impossible à lancer légalement dans les 24 mois suivant le début du projet.'),
    sp(),
    dangerBox('Résultat typique d’une approche interne seule : sous-capitalisation perçue, gouvernance jugée faible, dossiers incomplets, et retards en cascade qui érodent financièrement et réputationnellement le programme.'),
    sp(),
    successBox('Le coût d’une mission KHEPRA complète (7 pays) représente moins de 15% du coût estimé d’un retard de 12 mois. Ce n’est pas une dépense : c’est une assurance stratégique avec un rendement multiplicateur.'),
    sp(),

    h2('5.3 La différence KHEPRA : les non-dits que nous maîtrisons'),
    sp(),
    body('Ce qui distingue KHEPRA EXPERTS de tout autre cabinet, juriste, ou consultant est notre maîtrise des « non-dits » réglementaires. Ces attentes implicites ne figurent dans aucun texte, mais elles déterminent le succès ou l’échec :'),
    bullet('Nous savons quelles questions le régulateur posera aux dirigeants — et nous les préparons AVANT qu’il ne les pose'),
    bullet('Nous savons quels éléments du dossier seront scrutés en premier — et nous les renforçons'),
    bullet('Nous savons comment formuler une réponse aux observations pour éviter un second aller-retour — et nous l’écrivons'),
    bullet('Nous savons quand relancer discrètement une instruction bloquée — et nous le faisons'),
    bullet('Nous savons quels partenaires locaux rassurent le régulateur — et nous les intégrons'),
    sp(),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// ANNEXE A — INVESTISSEMENT ET VALEUR CRÉÉE
// ═══════════════════════════════════════════════════════════════
function annexeA(): (Paragraph | Table)[] {
  return [
    h1('ANNEXE A \u2014 INVESTISSEMENT ET VALEUR CR\u00C9\u00C9E'),
    sp(),
    h2('A.1 Proposition de valeur financière'),
    sp(),
    body('KHEPRA EXPERTS propose une structuration en deux phases, permettant à OPTASIA de valider notre méthodologie avant d’investir dans la mission complète.'),
    sp(),
    h3('Phase A — Cadrage stratégique (5 semaines)'),
    body('Cette phase démontre concrètement notre valeur avant tout engagement sur le long terme. Elle produit :'),
    bullet('Rapport de pré-diagnostic réglementaire confidentiel pour les 7 pays'),
    bullet('Analyse des risques implicites et recommandations de structuration actionnariale et gouvernance'),
    bullet('Feuille de route opérationnelle détaillée avec chronogramme Gantt'),
    bullet('Estimation précise des budgets par pays et par phase'),
    bullet('Premiers contacts institutionnels discrets (si mandaté par OPTASIA)'),
    sp(),
    tbl(
      ['Composante', 'Prix HT (FCFA)', 'Détail'],
      [
        ['Cadrage stratégique (7 pays)', '35 000 000', '5 semaines, 2 consultants seniors à temps plein'],
        ['Déplacements terrain (2 pays pilotes)', '5 000 000', 'Missions Togo + Cameroun'],
        ['Rapport et présentation board', 'Inclus', 'Livrable confidentiel, présentation PowerPoint'],
        ['TOTAL PHASE A', '40 000 000', 'Déductible de la Phase B'],
      ],
      [30, 25, 45]
    ),
    sp(),
    h3('Phase B — Mission complète d’orchestration (S0 à S6)'),
    body('Cette phase couvre l’ensemble de l’orchestration réglementaire et institutionnelle jusqu’au lancement opérationnel des filiales pilotes.'),
    sp(),
    tbl(
      ['Composante', 'Prix HT (FCFA)', 'Détail'],
      [
        ['Structuration juridique et institutionnelle (7 pays)', '45 000 000', 'Statuts, PV, RCCM, gouvernance, actionnariat'],
        ['Business plans et ingénierie financière (7 pays)', '55 000 000', 'Études de marché, projections 5 ans, ratios, stress-tests'],
        ['Dispositifs techniques et réglementaires (7 pays)', '65 000 000', 'Manuels, LBC/FT, PCA, SIG, scoring éthique'],
        ['Dépôt et suivi des agréments (7 pays)', '35 000 000', 'Constitution, dépôt, interface régulateur, réponses'],
        ['Diplomatie institutionnelle et lobbying', '15 000 000', 'Relations BCEAO/COBAC, présentations, auditions'],
        ['Lancement opérationnel (3 pays pilotes)', '25 000 000', 'Recrutement, formation, SI, premiers crédits'],
        ['Coordination et management de projet', '20 000 000', 'Comités de pilotage, reporting, outils collaboratifs'],
        ['TOTAL PHASE B', '260 000 000', 'Soit ~371M FCFA par pays sur l’ensemble du cycle'],
      ],
      [35, 20, 45]
    ),
    sp(),
    h2('A.2 Modalités de paiement et garanties'),
    sp(),
    tbl(
      ['Tranche', 'Montant', 'Déclencheur', 'Garantie'],
      [
        ['Acompte Phase A', '40 000 000', 'Signature de la convention de mission', 'Aucune'],
        ['Phase B — Tranche 1 (30%)', '78 000 000', 'Validation du cadrage et feuille de route', 'Déductible de l’acompte Phase A'],
        ['Phase B — Tranche 2 (40%)', '104 000 000', 'Dépôt des dossiers d’agrément (7 pays)', 'Clause de succès : report possible si retard réglementaire imputable au régulateur'],
        ['Phase B — Tranche 3 (30%)', '78 000 000', 'Obtention des agréments (7 pays) + lancement opérationnel', 'Clause de résultat : 15% de remise si taux de succès < 70%'],
      ],
      [28, 18, 34, 20]
    ),
    sp(),
    h2('A.3 Valeur créée vs investissement'),
    sp(),
    body('L’investissement total de 300 millions FCFA (Phases A + B) doit être comparé à la valeur stratégique créée :'),
    sp(),
    tbl(
      ['Valeur créée', 'Estimation', 'Méthode de calcul'],
      [
        ['Coût d’opportunité d’un retard de 6 mois (évité)', '850M FCFA', 'Salaires, loyers, perte de marché (secteur concurrent)'],
        ['Coût d’opportunité d’un retard de 12 mois (évité)', '1,75 Mds FCFA', 'Recapitalisation, refonte, érosion réputationnelle'],
        ['Valeur de l’agrément rapide (premier sur le marché)', '2 Mds FCFA', 'Prime de premier entrant, parts de marché, crédibilité investisseurs'],
        ['Valeur du réseau institutionnel construit', 'Incotables', 'Relations BCEAO/COBAC, partenariats, réputation régionale'],
        ['ROI de la mission KHEPRA', '> 900%', 'Valeur créée / Coût mission (conservateur)'],
      ],
      [30, 25, 45]
    ),
    sp(),
    goldBox('Investissement KHEPRA : 300M FCFA. Valeur stratégique protégée : 2,6+ Mds FCFA. ROI : > 900%. Ce n’est pas un coût de conseil : c’est une assurance stratégique avec un rendement multiplicateur.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// ANNEXE B — ENGAGEMENT KHEPRA
// ═══════════════════════════════════════════════════════════════
function annexeB(): (Paragraph | Table)[] {
  return [
    h1('ANNEXE B \u2014 ENGAGEMENT KHEPRA : NOTRE PAROLE D\u2019EXPERT'),
    sp(),
    body('Cette Annexe n’est pas une proposition commerciale standard. C’est un document de conviction, rédigé avec la rigueur d’un cabinet de conseil de niveau McKinsey, l’expertise institutionnelle de la Banque Mondiale, et la connaissance terrain de la BCEAO et de la COBAC.'),
    sp(),

    h2('B.1 Notre engagement de résultat'),
    sp(),
    body('KHEPRA EXPERTS s’engage formellement sur les résultats suivants, sous réserve de la collaboration active d’OPTASIA dans la fourniture des documents et informations requises :'),
    bullet('Taux de succès au premier dépôt : 85%+ pour les dossiers complets préparés par KHEPRA (vs 40% moyenne sectorielle)'),
    bullet('Timeline d’agrément : 6 à 9 mois pour les dossiers UEMOA, 6 à 9 mois pour les dossiers CEMAC (vs 12 à 18 mois moyenne sectorielle)'),
    bullet('Aucun rejet implicite pour insuffisance de gouvernance, de capital, ou de structure actionnariale sur les dossiers que nous validons avant dépôt'),
    bullet('Coordination multi-pays sans fracture : un seul interlocuteur, un seul reporting, une seule méthodologie pour les 7 pays'),
    sp(),

    h2('B.2 Notre proposition immédiate'),
    sp(),
    body('Pour avancer sans délai, KHEPRA EXPERTS propose à M. le CEO du Groupe OPTASIA les prochaines étapes suivantes :'),
    sp(),
    tbl(
      ['Étape', 'Délai', 'Action', 'Responsable'],
      [
        ['1. Signature du NDA bilatéral', 'J+2', 'Protection des informations sensibles échangées', 'Juridique OPTASIA + KHEPRA'],
        ['2. Réunion de cadrage (2h)', 'J+7', 'Validation des hypothèses, précision des attentes, définition du mandat', 'CEO OPTASIA + Fondateur KHEPRA'],
        ['3. Lancement Phase A (Cadrage)', 'J+14', 'Début du pré-diagnostic réglementaire confidentiel', 'Équipe KHEPRA'],
        ['4. Présentation des résultats S0', 'J+35', 'Rapport confidentiel, présentation board, recommandations', 'Chef de mission KHEPRA'],
        ['5. Décision Phase B', 'J+42', 'Validation de la mission complète et signature de la convention', 'Board OPTASIA'],
      ],
      [20, 12, 44, 24]
    ),
    sp(),
    successBox('En 42 jours, OPTASIA disposera d’une vision claire, confidentielle et actionnable de son programme. Pas un engagement de 12 mois en aveugle : une validation éclairée en 5 semaines.'),
    sp(),

    h2('B.3 Notre parole finale'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '\u00AB Le programme OPTASIA est ambitieux, nécessaire, et stratégiquement important pour l’inclusion financière en Afrique. Mais l’ambition sans orchestration réglementaire devient fragilité. KHEPRA EXPERTS est le seul partenaire capable de transformer cette ambition en résultat structuré, conforme, et durable. Nous ne vendons pas un service : nous construisons une infrastructure financière digitale responsable, filiale par filiale, pays par pays, avec la rigueur que les régulateurs attendent et que les populations méritent. \u00BB',
          size: 20,
          font: 'Calibri',
          italics: true,
          color: NAVY_MID,
          bold: true,
        }),
      ],
      spacing: { before: 200, after: 200 },
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
      border: {
        left: { style: BorderStyle.SINGLE, size: 6, color: GOLD },
        top: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
        right: { style: BorderStyle.SINGLE, size: 6, color: GOLD },
      },
      shading: { type: ShadingType.SOLID, color: GOLD_LT, fill: GOLD_LT },
    }),
    sp(),
    hr(GOLD),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Pour acceptation de la présente Note Ultra-Closing V2.0', bold: true, size: 22, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    }),
    tbl(
      ['Pour KHEPRA EXPERTS', 'Pour le Groupe OPTASIA'],
      [
        ['\n\n\nNom et qualité : ___________________________', '\n\n\nNom et qualité : ___________________________'],
        ['Date : ___________________________', 'Date : ___________________________'],
        ['Signature et cachet :', 'Signature et cachet :'],
        ['\n\n\n', '\n\n\n'],
      ]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS — Cabinet International de Conseil', size: 16, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'khepraexperts.com | contact@khepraexperts.com | Lomé — Togo', size: 16, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Réf. KE-OPT-2026-002-UC | Version 2.0 | Mai 2026 | CONFIDENTIEL — STRICTEMENT PRIVÉ', size: 14, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}

// ═══════════════════════════════════════════════════════════════
// EXPORT PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export async function generateOptasiaUltraClosing(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    ...coverPage(),
    ...tableOfContents(),
    ...section1(),
    ...section2(),
    ...section3(),
    ...section4(),
    ...section5(),
    ...annexeA(),
    ...annexeB(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Note Conceptuelle Ultra-Closing V2.0 — Programme OPTASIA — 7 pays UEMOA/CEMAC',
    description: 'Note exécutive de niveau McKinsey/BCG/IFC pour le CEO du Groupe OPTASIA sur l’orchestration stratégique et réglementaire d’un programme d’inclusion financière dans 7 pays d’Afrique francophone',
    subject: 'Inclusion financière responsable, finance digitale régulée, agrément BCEAO/COBAC, UEMOA, CEMAC',
    keywords: 'OPTASIA, KHEPRA, inclusion financière, BCEAO, COBAC, UEMOA, CEMAC, agrément, microfinance, gouvernance prudentielle, orchestration réglementaire',
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
                  new TextRun({ text: 'KHEPRA EXPERTS  |  Note Ultra-Closing V2.0  |  OPTASIA  |  Réf. KE-OPT-2026-002-UC  |  CONFIDENTIEL', size: 15, color: GRAY, font: 'Calibri' }),
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
                  new TextRun({ text: 'KHEPRA EXPERTS — khepraexperts.com  |  Niveau McKinsey / BCG / IFC / Banque Mondiale  |  Page ', size: 15, color: GRAY, font: 'Calibri' }),
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