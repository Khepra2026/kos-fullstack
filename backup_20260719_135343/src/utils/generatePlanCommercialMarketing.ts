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

// ─── PALETTE KHEPRA ─────────────────────────────────────────────────────────
const NAVY     = '0D1B2A';
const NAVY_MID = '1B3A5C';
const STEEL    = '2E6DA4';
const STEEL_LT = 'D6E8F7';
const GOLD     = 'C8A84B';
const DARK     = '1A2332';
const GRAY     = '6B7280';
const LGRAY    = 'F4F6F9';
const WHITE    = 'FFFFFF';
const GREEN    = '1A7A4A';
const GREEN_LT = 'E6F4ED';
const RED      = 'C0392B';
const RED_LT   = 'FDECEC';
const AMBER    = 'D97706';
const AMBER_LT = 'FEF3C7';

// ─── HELPERS ───────────────────────────────────────────────────────────────
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

function h4(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 20, color: DARK, font: 'Calibri' })],
    spacing: { before: 160, after: 80 },
  });
}

function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: opts?.size || 20, font: 'Calibri', bold: opts?.bold, italics: opts?.italic, color: opts?.color || DARK })],
    spacing: { before: 60, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bullet(text: string, icon = '\u25B8'): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }),
      new TextRun({ text, size: 20, font: 'Calibri', color: DARK }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function box(text: string, color: string, bg: string, icon: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  ${text}`, size: 18, font: 'Calibri', bold: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function infoBox(text: string): Paragraph { return box(text, STEEL, STEEL_LT, '\u2139'); }
function successBox(text: string): Paragraph { return box(text, GREEN, GREEN_LT, '\u2714'); }
function alertBox(text: string): Paragraph { return box(text, AMBER, AMBER_LT, '\u26A0'); }
function dangerBox(text: string): Paragraph { return box(text, RED, RED_LT, '\u2717'); }

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
                children: [new TextRun({ text: item.value, bold: true, size: 34, color: WHITE, font: 'Calibri' })],
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
    while (w.length < n) w.push(avg > 0 ? avg : Math.floor(100 / n));
  }
  if (w.length > n) w = w.slice(0, n);
  w = w.map(v => (v === undefined || v === null || Number.isNaN(v)) ? Math.floor(100 / n) : v);

  const normalizedRows = rows.map(row => {
    if (row.length < n) return [...row, ...Array(n - row.length).fill('')];
    if (row.length > n) return row.slice(0, n);
    return row;
  });

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h =>
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

// ─── PAGE DE GARDE ──────────────────────────────────────────────────────────
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
      children: [new TextRun({ text: 'Cabinet International de Conseil — Gouvernance \u00B7 Strat\u00E9gie \u00B7 Finance \u00B7 Gestion des Risques', size: 20, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(GOLD),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'PLAN D\'ACTION COMMERCIAL ET MARKETING', bold: true, size: 48, color: NAVY, font: 'Calibri', allCaps: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Mai \u2013 D\u00E9cembre 2026', bold: true, size: 28, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'Go-to-Market Digital \u2014 G\u00E9n\u00E9ration de Chiffre d\u2019Affaires \u2014 P\u00E9n\u00E9tration Togo \u0026 UEMOA', bold: true, size: 24, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 300 },
    }),
    tbl(
      ['Client', 'P\u00E9riode', 'Zone', 'R\u00E9f\u00E9rence'],
      [['KHEPRA EXPERTS', 'Mai \u2013 D\u00E9cembre 2026', 'Togo \u00B7 UEMOA \u00B7 Afrique francophone', 'KE-PLAN-COM-TOGO-2026-001']],
      [30, 25, 30, 15]
    ),
    sp(1),
    tbl(
      ['Date d\u2019\u00E9mission', 'Version', 'Statut', 'Confidentialit\u00E9'],
      [['Mai 2026', 'V1.0', 'CONFIDENTIEL', 'Usage interne KHEPRA EXPERTS']],
      [25, 25, 25, 25]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Produit par KHEPRA EXPERTS \u2014 Niveau Big Four \u2014 Directement ex\u00E9cutable', size: 18, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    pb(),
  ];
}

// ─── SOMMAIRE ───────────────────────────────────────────────────────────────
function tableOfContents(): (Paragraph | Table)[] {
  const items = [
    { n: 'A.', t: 'Positionnement Strat\u00E9gique', p: '3' },
    { n: 'B.', t: 'Strat\u00E9gie de P\u00E9n\u00E9tration Digital', p: '6' },
    { n: 'C.', t: 'Offres Commerciales Packag\u00E9es', p: '15' },
    { n: 'D.', t: 'Plan d\u2019Action Mensuel (Mai \u2013 D\u00E9c. 2026)', p: '20' },
    { n: 'E.', t: 'Strat\u00E9gie de Closing', p: '28' },
    { n: 'F.', t: 'KPI \u0026 Pilotage', p: '32' },
    { n: 'Ann.', t: 'Annexes \u2014 Scripts, Budgets, Outils', p: '36' },
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

// ─── BLOC A : POSITIONNEMENT STRATÉGIQUE ────────────────────────────────────
function blockA(): (Paragraph | Table)[] {
  return [
    h1('A. POSITIONNEMENT STRAT\u00C9GIQUE'),
    sp(),
    h2('A.1 Contexte et diagnostic de d\u00E9part'),
    body('KHEPRA EXPERTS est un cabinet de conseil strat\u00E9gique fond\u00E9 et dirig\u00E9 par SIMDA Essoyom\u00E8w\u00E8, expert en gouvernance, strat\u00E9gie, finance et gestion des risques. Le cabinet op\u00E8re depuis le Togo avec une ambition r\u00E9gionale (UEMOA, CEDEAO). Sa pr\u00E9sence digitale est embryonnaire mais structurante : site web op\u00E9rationnel, pages LinkedIn cr\u00E9\u00E9es, contenu TikTok existant, Facebook \u00E0 exploiter.'),
    sp(),
    body('Diagnostic SWOT synth\u00E9tique :'),
    sp(),
    tbl(
      ['Dimension', 'Forces', 'Faiblesses', 'Opportunit\u00E9s', 'Menaces'],
      [
        ['Expertise', 'MBA Universit\u00E9 Laval, expertise sectorielle (IMF, BTP, ONG)', 'Absence de track record public visible', 'Demande croissante de conseil structur\u00E9 en Afrique', 'Concurrents \u00E9tablis (Deloitte, Okan Partners)'],
        ['Notori\u00E9t\u00E9', 'Fondateur moteur de personal branding', 'Faible notori\u00E9t\u00E9 actuelle', 'Digital comme levier de notori\u00E9t\u00E9 rapide', 'Surcharge informationnelle sur les r\u00E9seaux'],
        ['R\u00E9seau', 'R\u00E9seau fondateur qualifi\u00E9', 'Base client\u00e8le restreinte', 'Partenariats strat\u00E9giques (bailleurs, banques)', 'R\u00E9seaux concurrents plus \u00e9tablis'],
        ['Digital', 'Site web existant, contenu TikTok', 'Conversion faible, tunnel inexistant', 'Funnel digital peu co\u00FBteux vs terrain', 'Algorithmes instables, reach payant'],
      ],
      [14, 24, 24, 24, 14]
    ),
    sp(),
    h2('A.2 Proposition de valeur diff\u00E9renciante'),
    body('KHEPRA EXPERTS ne se positionne PAS comme un cabinet g\u00E9n\u00E9raliste. La diff\u00E9renciation repose sur trois piliers inimitables :'),
    sp(),
    bullet('Proximit\u00E9 op\u00E9rationnelle africaine : Contrairement aux Big Four qui d\u00E9ploient des \u00E9quipes juniors depuis Paris ou Casablanca, KHEPRA EXPERTS embarque les dirigeants directement sur le terrain. R\u00E9sultat : diagnostics en 48h, recommandations ex\u00E9cutables en 72h, pas de rapports de 200 pages inactionnables.'),
    bullet('Expertise transversale Gouvernance-Finance-Risques : La combinaison unique de ces trois disciplines permet de r\u00E9soudre des probl\u00E8mes complexes que les cabinets sp\u00E9cialis\u00E9s traitent par silos. Exemple : un cabinet RH ne r\u00E9soudra pas un probl\u00e8me de conformit\u00E9 r\u00E9glementaire. KHEPRA le fait.'),
    bullet('Personal branding du fondateur : SIMDA Essoyom\u00E8w\u00E8 est un levier de cr\u00E9dibilit\u00E9 unique. Son parcours (MBA Laval, exp\u00E9rience terrain, expertise UEMOA/CEMAC) est une preuve sociale en construction que le plan digital va amplifier.'),
    sp(),
    infoBox('Promesse commerciale forte : \u00AB En 90 jours, KHEPRA EXPERTS identifie vos fuites de tr\u00E9sorerie, structure votre gouvernance et s\u00E9curise votre conformit\u00E9 r\u00E9glementaire \u2014 avec un ROI mesurable d\u00E8s le premier semestre. \u00BB'),
    sp(),
    h2('A.3 Choix de la niche prioritaire'),
    body('Apr\u00E8s analyse des opportunit\u00E9s de march\u00E9, des marges, des cycles de vente et des barri\u00E8res \u00e0 l\u0027entr\u00E9e, trois niches sont identifi\u00E9es. La priorit\u00E9 strat\u00E9gique est accord\u00E9e \u00e0 la Niche 1 (IMF/SFD) pour les 6 premiers mois, puis extension progressive.'),
    sp(),
    tbl(
      ['Niche', 'Priorit\u00E9', 'CA cible 2026', 'Cycle de vente', 'Marge', 'Justification'],
      [
        ['1 \u2014 Institutions financi\u00E8res (IMF/SFD)', 'PRIORITAIRE (Mai\u2013Oct)', '70\u201380 M FCFA', '4\u20136 semaines', '35\u201340%', 'Budgets d\u00E9di\u00E9s, conformit\u00E9 obligatoire, d\u00E9cideurs accessibles, projets r\u00E9currents'],
        ['2 \u2014 PME en lev\u00E9e de fonds', 'SECONDAIRE (Juil\u2013Nov)', '30\u201340 M FCFA', '6\u20138 semaines', '30\u201335%', 'Besoin urgent, moins de concurrence cibl\u00E9e, storytelling fort'],
        ['3 \u2014 ONG et projets bailleurs', 'TERTIAIRE (Sep\u2013D\u00E9c)', '20\u201330 M FCFA', '8\u201312 semaines', '25\u201330%', 'Volumes importants, processus longs mais r\u00E9currents, cr\u00E9dibilit\u00E9 \u00e0 construire'],
      ],
      [22, 16, 16, 14, 12, 20]
    ),
    sp(),
    h2('A.4 Benchmark concurrentiel synth\u00E9tique'),
    tbl(
      ['Concurrent', 'Positionnement', 'Forces', 'Faiblesses', 'Position KHEPRA'],
      [
        ['Deloitte Togo', 'Audit \u0026 conseil g\u00E9n\u00E9raliste', 'Marque, ressources, r\u00E9seau', 'Co\u00FBt \u00E9lev\u00E9, \u00E9quipes juniors, lenteur', 'Contre-positionnement agilit\u00E9 + prix comp\u00E9titif'],
        ['Okan Partners', 'Conseil strat\u00E9gique PME', 'Proximit\u00E9, r\u00E9seau local', 'Offre g\u00E9n\u00E9raliste, pas de diff\u00E9renciation sectorielle', 'Sp\u00E9cialisation IMF/Finance + personal branding'],
        ['Grant Thornton', 'Audit et fiscalit\u00E9', 'Expertise comptable', 'Pas de conseil strat\u00E9gique int\u00E9gr\u00E9', 'Diff\u00E9renciation Gouvernance-Strat\u00E9gie-Risques'],
        ['Cabinet local X', 'Droit des affaires', 'Prix bas', 'Pas de cr\u00E9dibilit\u00E9 internationale', 'Qualit\u00E9 Big Four, prix accessible'],
      ],
      [18, 22, 22, 22, 16]
    ),
    sp(),
    successBox('KHEPRA EXPERTS se positionne comme \u00AB le cabinet de conseil sp\u00E9cialis\u00E9 Gouvernance-Finance-Risques pour les institutions financi\u00E8res et PME d\u00E9termin\u00E9es de l\u2019Afrique francophone \u2014 plus agile que les Big Four, plus structur\u00E9 que les cabinets locaux. \u00BB'),
    pb(),
  ];
}

// ─── BLOC B : STRATÉGIE DE PÉNÉTRATION DIGITAL ───────────────────────────────
function blockB(): (Paragraph | Table)[] {
  return [
    h1('B. STRAT\u00C9GIE DE P\u00C9N\u00C9TRATION DIGITAL'),
    sp(),
    h2('B.1 Funnel de conversion complet'),
    body('Le funnel de conversion digital est structur\u00E9 en 4 \u00E9tapes, chacune avec des contenus et des actions sp\u00E9cifiques :'),
    sp(),
    tbl(
      ['\u00C9tape', 'Objectif', 'Contenus produits', 'Canaux', 'KPI mensuel'],
      [
        ['1 \u2014 AWARENESS', 'Faire conna\u00eetre KHEPRA et SIMDA', 'Posts LinkedIn quotidiens, TikTok \u00E9ducatifs, articles blog SEO', 'LinkedIn, TikTok, SEO, referrals', '50 000 impressions/mois'],
        ['2 \u2014 LEAD', 'Capturer coordonn\u00E9es prospects', 'Lead magnets (ebooks, guides), webinars gratuits, landing pages', 'Site web, LinkedIn DM, formulaires', '80 leads qualifi\u00E9s/mois'],
        ['3 \u2014 RDV', 'Convertir lead en rendez-vous', 'S\u00E9quences email (5 emails), appels de prospection cibl\u00E9s', 'Email, t\u00E9l\u00E9phone, Calendly', '25 RDV qualifi\u00E9s/mois'],
        ['4 \u2014 CLOSING', 'Signer le contrat', 'Propositions personnalis\u00E9es, d\u00E9mo gratuite, t\u00E9moignages clients', 'R\u00E9unions, email, appel closing', '8 signatures/mois (taux 32%)'],
      ],
      [18, 22, 28, 16, 16]
    ),
    sp(),
    body('Le tunnel de conversion global vise un taux de conversion lead-to-client de 10% et un taux de conversion RDV-to-closing de 32%. Ces ratios sont conservateurs pour le march\u00E9 africain B2B, o\u00F9 la relation humaine reste d\u00E9terminante.'),
    sp(),
    h2('B.2 Strat\u00E9gie LinkedIn \u2014 Canal principal B2B'),
    body('LinkedIn est le canal prioritaire pour KHEPRA EXPERTS. Il permet de cibler pr\u00E9cis\u00E9ment les DAF, DG, Directeurs de conformit\u00E9, Responsables IMF, Chefs de projets ONG au Togo et en zone UEMOA.'),
    sp(),
    h3('B.2.1 Calendrier \u00E9ditorial (1 post/jour)'),
    tbl(
      ['Jour', 'Type de contenu', 'Exemple de th\u00e8me', 'Format', 'Objectif'],
      [
        ['Lundi', 'Storytelling fondateur', '\u00AB Comment j\u0027ai accompagn\u00E9 une IMF de 5M \u00e0 50M d\u00E9p\u00f4ts en 18 mois \u00BB', 'Texte + photo', 'Humaniser la marque, cr\u00E9dibilit\u00E9'],
        ['Mardi', 'Post p\u00E9dagogique', '\u00AB Les 3 indicateurs que tout DAF doit surveiller chaque lundi \u00BB', 'Carrousel 5 slides', '\u00C9ducation, preuve d\u0027expertise'],
        ['Mercredi', '\u00C9tude de cas / T\u00E9moignage', '\u00AB R\u00E9sultat client : -40% de fuites de tr\u00E9sorerie en 90 jours \u00BB', 'Texte + graphique', 'Preuve sociale, r\u00E9sultats'],
        ['Jeudi', 'Post clivant / Opinion', '\u00AB Pourquoi les cabinets de conseil traditionnels \u00E9chouent en Afrique \u00BB', 'Texte structur\u00E9', 'Engagement, viralit\u00E9'],
        ['Vendredi', 'Offre / Appel \u00e0 l\u0027action', '\u00AB Diagnostic flash gratuit pour les IMF \u2014 5 places cette semaine \u00BB', 'Texte + lien', 'Conversion directe'],
        ['Samedi', 'Post l\u00E9ger / Culture', 'R\u00E9flexion sur l\u0027entrepreneuriat africain, leadership', 'Texte + image', 'Engagement communautaire'],
        ['Dimanche', 'Repost / Engagement', 'Commenter les posts des prospects, r\u00E9pondre aux questions', 'Commentaires', 'R\u00E9seautage actif'],
      ],
      [12, 18, 32, 14, 24]
    ),
    sp(),
    h3('B.2.2 Strat\u00E9gie de prospection LinkedIn (20\u201350 messages/jour)'),
    body('La prospection LinkedIn est structur\u00E9e en 4 s\u00E9quences, avec des templates pr\u00Eats \u00e0 l\u0027emploi :'),
    sp(),
    h4('S\u00E9quence 1 : Demande de connexion (Jour 0)'),
    body('Template : \u00AB Bonjour [Pr\u00E9nom], je suis SIMDA Essoyom\u00E8w\u00E8, fondateur de KHEPRA EXPERTS. J\u0027accompagne les institutions financi\u00E8res et PME de l\u0027Afrique francophone sur la gouvernance, la finance et la gestion des risques. J\u0027ai remarqu\u00E9 votre parcours chez [Entreprise] et je pense que nous pourrions \u00E9changer sur des sujets d\u0027int\u00E9r\u00eat commun. \u00BB'),
    sp(),
    h4('S\u00E9quence 2 : Premi\u00e8re relance (Jour 3)'),
    body('Template : \u00AB [Pr\u00E9nom], merci d\u0027avoir accept\u00E9 ma connexion. Je partage r\u00E9guli\u00E8rement du contenu sur la conformit\u00E9 IMF, le contr\u00f4le interne et la strat\u00E9gie de croissance des PME. N\u0027h\u00E9sitez pas \u00e0 me solliciter si un sujet vous int\u00E9resse particuli\u00e8rement. Je publie un guide gratuit sur le contr\u00f4le interne IMF ce vendredi \u2014 souhaitez-vous que je vous l\u0027envoie ? \u00BB'),
    sp(),
    h4('S\u00E9quence 3 : Offre de valeur (Jour 7)'),
    body('Template : \u00AB [Pr\u00E9nom], je viens de publier un ebook \u00AB 10 points de contr\u00f4le pour passer l\u0027inspection COBAC sans stress \u00BB. C\u0027est le fruit de 15 ans d\u0027exp\u00E9rience aupr\u00e8s des IMF de la CEDEAO. Souhaitez-vous que je vous l\u0027envoie gratuitement en MP ? \u00BB'),
    sp(),
    h4('S\u00E9quence 4 : Appel \u00e0 l\u0027action (Jour 12)'),
    body('Template : \u00AB [Pr\u00E9nom], j\u0027ai accompagn\u00E9 12 IMF \u00e0 l\u0027obtention de leur agr\u00E9ment COBAC en moins de 6 mois. Si votre institution envisage un renouvellement ou une mont\u00E9e en cat\u00E9gorie, je propose un diagnostic flash de 30 minutes gratuit pour identifier les points de vigilance. Voulez-vous qu\u0027on bloque un cr\u00E9neau cette semaine ? \u00BB'),
    sp(),
    tbl(
      ['Indicateur LinkedIn', 'Cible mensuelle', 'Cible cumul\u00E9e D\u00E9c 2026'],
      [
        ['Connexions actives envoy\u00E9es', '600', '4 800'],
        ['Taux d\u0027acceptation', '35%', '35%'],
        ['Messages de prospection', '900', '7 200'],
        ['Taux de r\u00E9ponse', '15%', '15%'],
        ['Leads g\u00E9n\u00E9r\u00E9s via LinkedIn', '40', '320'],
        ['RDV qualifi\u00E9s via LinkedIn', '12', '96'],
      ],
      [40, 30, 30]
    ),
    sp(),
    h2('B.3 Strat\u00E9gie TikTok \u2014 Canal d\u2019attention'),
    body('TikTok est un canal de viralit\u00E9 et d\u0027autorit\u00E9 p\u00E9dagogique. L\u0027objectif n\u0027est pas la conversion directe mais la construction d\u0027une autorit\u00E9 de marque diffus\u00E9e et accessible. Le fondateur SIMDA Essoyom\u00E8w\u00E8 est le visage du contenu.'),
    sp(),
    h3('B.3.1 Types de vid\u00E9os (3 par semaine minimum)'),
    tbl(
      ['Type de vid\u00E9o', 'Fr\u00E9quence', 'Exemple', 'Objectif', 'Dur\u00E9e'],
      [
        ['Erreurs PME / IMF', '1/semaine', '\u00AB Les 3 erreurs qui tuent la tr\u00E9sorerie des PME africaines \u00BB', 'Accroche + autorit\u00E9', '60\u201390 sec'],
        ['Conseils financement', '1/semaine', '\u00AB Comment pr\u00E9parer son dossier BIDC en 5 \u00e9tapes \u00BB', 'Preuve d\u0027expertise', '90\u2013120 sec'],
        ['D\u00E9cryptage risques', '1/semaine', '\u00AB Ce que le COBAC regarde vraiment dans votre contr\u00f4le interne \u00BB', 'Niche + cr\u00E9dibilit\u00E9', '60\u201390 sec'],
        ['Storytime fondateur', '2/mois', '\u00AB Mon pire client (et ce qu\u0027il m\u0027a appris) \u00BB', 'Humaniser, storytelling', '120\u2013180 sec'],
        ['R\u00E9ponse aux commentaires', '2/semaine', 'Vid\u00E9o r\u00E9ponse \u00e0 une question fr\u00E9quente', 'Engagement communautaire', '30\u201360 sec'],
      ],
      [22, 12, 28, 24, 14]
    ),
    sp(),
    h3('B.3.2 Strat\u00E9gie de croissance TikTok'),
    bullet('Publication : 3 vid\u00E9os/semaine minimum, horaire 18h\u201320h (heure de pointe Afrique de l\u0027Ouest)'),
    bullet('Hashtags syst\u00E9matiques : #FinanceAfrique #ConseilPME #IMF #Gouvernance #Togo #UEMOA #Entrepreneuriat'),
    bullet('Collaborations : 1 collaboration/mois avec un influenceur business africain (10k\u201350k abonn\u00E9s)'),
    bullet('Recyclage : Transformer chaque TikTok en Reel Instagram + Short YouTube + extrait LinkedIn'),
    bullet('CTA : Chaque vid\u00E9o se termine par \u00AB Suivez-moi pour + de conseils \u00b7 Lien en bio pour le guide gratuit \u00BB'),
    sp(),
    tbl(
      ['Indicateur TikTok', 'Cible Juin', 'Cible Sep', 'Cible D\u00E9c'],
      [
        ['Abonn\u00E9s', '500', '2 500', '5 000'],
        ['Vues moyennes/vid\u00E9o', '1 000', '3 000', '5 000'],
        ['Taux d\u0027engagement', '5%', '6%', '7%'],
        ['Leads g\u00E9n\u00E9r\u00E9s (lien bio)', '10/mois', '25/mois', '40/mois'],
      ],
      [35, 20, 20, 25]
    ),
    sp(),
    h2('B.4 Strat\u00E9gie Facebook \u2014 Reach local'),
    body('Facebook reste dominant au Togo et en zone UEMOA pour la p\u00E9n\u00E9tration locale. La strat\u00E9gie repose sur le recyclage de contenu et le ciblage publicitaire PME.'),
    sp(),
    bullet('Recyclage contenu : 5 posts/semaine (recyclage LinkedIn + articles blog)'),
    bullet('Groupes professionnels : Participation active dans 5 groupes Facebook togolais (Entrepreneurs Togo, PME UEMOA, etc.) \u2014 3 commentaires valorisants/jour'),
    bullet('Publicit\u00E9 cibl\u00E9e PME : Campagne Facebook Ads ciblant les dirigeants de PME togolaises (DG, G\u00E9rant, Propri\u00E9taire) \u2014 Budget 75 000 FCFA/mois'),
    bullet('Messenger automatisation : Chatbot Facebook Messenger pour qualifier les leads et proposer un RDV automatiquement'),
    sp(),
    h2('B.5 Transformation du site web en machine \u00e0 leads'),
    body('Le site khepraexperts.com doit \u00eatre transform\u00E9 en un funnel de conversion optimis\u00E9. Chaque page doit avoir un objectif de conversion clair.'),
    sp(),
    h3('B.5.1 Architecture du site optimis\u00E9e'),
    tbl(
      ['Page / Section', 'Objectif', 'CTA principal', 'Lead magnet associ\u00E9'],
      [
        ['Homepage', 'Pr\u00E9senter l\u0027expertise + capturer email', '\u00AB T\u00E9l\u00E9chargez le guide IMF gratuit \u00BB', 'Guide \u00AB 10 points de contr\u00f4le IMF \u00BB'],
        ['Page IMF/SFD', 'Convertir les institutions financi\u00e8res', '\u00AB Demandez votre diagnostic flash (30 min) \u00BB', 'Checklist conformit\u00E9 COBAC'],
        ['Page PME', 'Convertir les PME', '\u00AB Calculez votre ROI en 2 minutes \u00BB', 'Simulateur ROI financement'],
        ['Page ONG', 'Convertir les ONG/bailleurs', '\u00AB T\u00E9l\u00E9chargez notre m\u00E9thodologie \u00BB', 'M\u00E9thodologie \u00E9valuation projet'],
        ['Blog / Insights', 'SEO + nurturer les leads', '\u00AB Abonnez-vous \u00e0 la newsletter mensuelle \u00BB', 'Newsletter + ebook mensuel'],
        ['Page fondateur', 'Personal branding + confiance', '\u00AB Connectez-vous avec SIMDA sur LinkedIn \u00BB', 'CV + parcours + t\u00E9moignages'],
      ],
      [22, 28, 28, 22]
    ),
    sp(),
    h3('B.5.2 Lead magnets prioritaires'),
    tbl(
      ['Lead magnet', 'Public cible', 'Format', 'Valeur per\u00e7ue', 'Co\u00fbt prod.'],
      [
        ['Guide : 10 points de contr\u00f4le IMF avant inspection', 'DAF, DG IMF', 'PDF 12 pages', '\u00C9vite l\u0027amende, rassure le COBAC', '150 000 FCFA'],
        ['Simulateur : ROI d\u0027un diagnostic flash', 'DG PME', 'Excel interactif', 'Chiffre l\u0027investissement', '100 000 FCFA'],
        ['Checklist : Pr\u00E9paration dossier BIDC', 'DAF, DG', 'PDF 8 pages', 'Acc\u00e8l\u00e8re le financement', '150 000 FCFA'],
        ['Webinaire mensuel gratuit', 'Tous segments', 'Live 45 min', 'Expertise en direct, Q\u0026R', '50 000 FCFA/mois'],
        ['Benchmark : Salaires DG/DAF IMF UEMOA', 'DG IMF', 'PDF 6 pages', 'Positionnement comp\u00E9titif', '200 000 FCFA'],
      ],
      [30, 18, 18, 22, 12]
    ),
    sp(),
    h3('B.5.3 Tunnel de conversion web'),
    body('Parcours type d\u0027un prospect sur khepraexperts.com :'),
    sp(),
    bullet('\u00C9tape 1 : Arriv\u00E9e via SEO (\u00AB consultant conformit\u00E9 IMF Togo \u00BB) ou LinkedIn'),
    bullet('\u00C9tape 2 : Lecture article blog ou page d\u0027atterrissage (Landing Page)'),
    bullet('\u00C9tape 3 : Clic sur CTA \u00AB T\u00E9l\u00E9chargez le guide gratuit \u00BB'),
    bullet('\u00C9tape 4 : Formulaire (Nom, Email, Entreprise, T\u00E9l\u00E9phone, Segment)'),
    bullet('\u00C9tape 5 : Email de confirmation + livraison du lead magnet'),
    bullet('\u00C9tape 6 : S\u00E9quence nurturing (5 emails sur 14 jours)'),
    bullet('\u00C9tape 7 : Email d\u0027appel \u00e0 l\u0027action : \u00AB Diagnostic flash gratuit \u2014 30 minutes \u00BB'),
    bullet('\u00C9tape 8 : RDV Calendly \u2192 Appel de qualification \u2192 Proposition commerciale'),
    sp(),
    h2('B.6 Budget digital mensuel (Mai\u2013D\u00E9cembre 2026)'),
    tbl(
      ['Poste', 'Mai\u2013Juin', 'Juil\u2013Sep', 'Oct\u2013D\u00E9c', 'Total 2026'],
      [
        ['Cr\u00E9ation contenu (r\u00E9daction, design, vid\u00E9o)', '150 000', '200 000', '250 000', '1 650 000'],
        ['Publicit\u00E9 payante (LinkedIn + Facebook)', '75 000', '100 000', '125 000', '850 000'],
        ['Outils SaaS (CRM, email, scheduling)', '50 000', '50 000', '75 000', '550 000'],
        ['Community manager / VA', '100 000', '150 000', '200 000', '1 200 000'],
        ['Production lead magnets', '200 000', '100 000', '100 000', '700 000'],
        ['Webinaires / \u00E9v\u00E9nements digitaux', '50 000', '75 000', '75 000', '500 000'],
        ['SEO / r\u00E9f\u00E9rencement', '50 000', '50 000', '50 000', '400 000'],
        ['TOTAL MARKETING DIGITAL', '675 000', '725 000', '875 000', '4 850 000'],
      ],
      [32, 16, 16, 16, 20]
    ),
    sp(),
    infoBox('Le budget marketing digital total de 4,85 M FCFA repr\u00E9sente 3,2% du CA cible (150 M FCFA). Ce ratio est conforme aux standards B2B services professionnels (2\u20135%).'),
    pb(),
  ];
}

// ─── BLOC C : OFFRES COMMERCIALES PACKAGÉES ────────────────────────────────────
function blockC(): (Paragraph | Table)[] {
  return [
    h1('C. OFFRES COMMERCIALES PACKAG\u00C9ES'),
    sp(),
    h2('C.1 Offre 1 \u2014 Financement PME (\u00AB Lev\u00E9e de Fonds Express \u00BB)'),
    sp(),
    h3('Promesse'),
    body('\u00AB En 60 jours, KHEPRA EXPERTS structure votre dossier de financement bancaire ou BIDC, s\u00E9curise votre business plan et maximise vos chances d\u0027obtention \u2014 ou vous ne payez que la moiti\u00E9. \u00BB'),
    sp(),
    h3('Livrables'),
    bullet('Diagnostic financier complet (analyse des 3 derniers exercices)'),
    bullet('Business plan structur\u00E9 (5 ans) avec \u00E9tats financiers pr\u00E9visionnels'),
    bullet('Dossier de pr\u00E9sentation banque/BIDC (20 slides)'),
    bullet('Accompagnement \u00e0 l\u0027audience avec 2 banques partenaires'),
    bullet('Suivi post-approbation (3 mois)'),
    sp(),
    h3('Pricing'),
    tbl(
      ['Formule', 'Prix HT', 'D\u00E9lai', 'Conditions'],
      [
        ['Pack Essentiel', '1 500 000 FCFA', '30 jours', 'Business plan + dossier pr\u00E9sentation'],
        ['Pack Avanc\u00E9', '3 000 000 FCFA', '45 jours', 'Diagnostic + business plan + accompagnement 2 banques'],
        ['Pack Premium', '5 000 000 FCFA', '60 jours', 'Tout le Pack Avanc\u00E9 + suivi 3 mois + session board'],
      ],
      [25, 25, 20, 30]
    ),
    sp(),
    h3('Argumentaire de vente et r\u00E9ponses aux objections'),
    tbl(
      ['Objection', 'R\u00E9ponse cl\u00e9'],
      [
        ['\u00AB C\u0027est trop cher pour une PME \u00BB', 'Le co\u00fbt repr\u00E9sente 0,5\u20131% du montant lev\u00E9. Nos clients l\u00E8vent en moyenne 50\u2013200 M FCFA. ROI imm\u00E9diat.'],
        ['\u00AB On peut faire \u00e7a en interne \u00BB', 'Les banques re\u00e7oivent 200 dossiers par mois. Seuls 15% sont financ\u00E9s. Un dossier structur\u00E9 par un expert multiplie par 3 vos chances.'],
        ['\u00AB Et si la banque refuse ? \u00BB', 'Notre clause de succ\u00e8s : si le financement n\u0027est pas obtenu apr\u00e8s 2 banques, vous ne payez que 50%. On partage le risque.'],
        ['\u00AB On n\u0027a pas le temps \u00BB', 'Nous prenons en charge 90% du travail. Vous consacrez 4h/semaine \u00e0 nos \u00E9changes. Le reste, c\u0027est notre m\u00E9tier.'],
      ],
      [35, 65]
    ),
    sp(),
    h2('C.2 Offre 2 \u2014 Conformit\u00E9 IMF/SFD (\u00AB Agr\u00E9ment S\u00E9r\u00E9nit\u00E9 \u00BB)'),
    sp(),
    h3('Promesse'),
    body('\u00AB En 90 jours, KHEPRA EXPERTS audite votre conformit\u00E9 r\u00E9glementaire, met en place un plan de rem\u00E9diation et vous pr\u00E9pare \u00e0 l\u0027inspection COBAC/Minist\u00e8re de tutelle \u2014 avec un taux de r\u00E9ussite de 100% sur nos accompagnements. \u00BB'),
    sp(),
    h3('Livrables'),
    bullet('Audit conformit\u00E9 complet (r\u00E9glementation COBAC/Minist\u00e8re, normes internes)'),
    bullet('Plan de rem\u00E9diation prioris\u00E9 (30\u201360\u201390 jours)'),
    bullet('Mise en place / r\u00E9vision du manuel de proc\u00E9dures'),
    bullet('Formation des \u00E9quipes cl\u00E9s (DAF, Contr\u00f4leur interne, RH)'),
    bullet('Accompagnement jour J inspection (pr\u00E9sence physique)'),
    sp(),
    h3('Pricing'),
    tbl(
      ['Formule', 'Prix HT', 'D\u00E9lai', 'Conditions'],
      [
        ['Diagnostic Flash', '500 000 FCFA', '5 jours', 'Audit rapide + rapport 10 pages + plan d\u0027action'],
        ['Pack Conformit\u00E9', '3 500 000 FCFA', '60 jours', 'Audit + plan rem\u00E9diation + manuel + formation 1j'],
        ['Pack Premium', '6 000 000 FCFA', '90 jours', 'Tout le Pack Conformit\u00E9 + accompagnement inspection + suivi 6 mois'],
      ],
      [25, 25, 20, 30]
    ),
    sp(),
    h3('Argumentaire de vente et r\u00E9ponses aux objections'),
    tbl(
      ['Objection', 'R\u00E9ponse cl\u00e9'],
      [
        ['\u00AB On a d\u00E9j\u00e0 un contr\u00f4leur interne \u00BB', 'Parfait. Nous travaillons AVEC lui. Notre r\u00f4le est de structurer, formaliser et s\u00E9curiser \u2014 pas de le remplacer.'],
        ['\u00AB Le COBAC nous a d\u00E9j\u00e0 donn\u00E9 un d\u00E9lai \u00BB', 'C\u0027est pr\u00E9cis\u00E9ment pourquoi vous avez besoin de nous. Un d\u00E9lai COBAC est une opportunit\u00E9 limit\u00E9e. Chaque jour de retard co\u00fbte en amendes et en restriction d\u0027activit\u00E9.'],
        ['\u00AB Les cabinets g\u00E9n\u00E9ralistes font \u00e7a moins cher \u00BB', 'Un cabinet g\u00E9n\u00E9raliste conna\u00eet la r\u00E9glementation. Nous, on conna\u00eet les EXAMINATEURS du COBAC. On anticipe leurs questions avant qu\u0027ils ne les posent.'],
      ],
      [35, 65]
    ),
    sp(),
    h2('C.3 Offre 3 \u2014 CFO Externalis\u00E9 (\u00AB Directeur Financier \u00e0 la Carte \u00BB)'),
    sp(),
    h3('Promesse'),
    body('\u00AB Pour le co\u00fbt d\u0027un employ\u00E9 junior, KHEPRA EXPERTS vous fournit un Directeur Financier senior \u00e0 temps partag\u00E9 : tableaux de bord, pilotage de tr\u00E9sorerie, pr\u00E9paration des comit\u00E9s, relation banques \u2014 sans les charges sociales ni les risques de recrutement. \u00BB'),
    sp(),
    h3('Livrables'),
    bullet('Tableau de bord mensuel (cash-flow, rentabilit\u00E9, BFR, KPI)'),
    bullet('R\u00E9union mensuelle de pilotage (2h) avec le DG/Pr\u00E9sident'),
    bullet('Pr\u00E9paration des comit\u00E9s de cr\u00E9dit et des boards trimestriels'),
    bullet('Relation banques et n\u00E9gociation conditions de tr\u00E9sorerie'),
    bullet('Accompagnement budg\u00E9taire annuel et suivi mensuel'),
    bullet('Veille r\u00E9glementaire fiscale et sociale'),
    sp(),
    h3('Pricing'),
    tbl(
      ['Formule', 'Prix mensuel HT', 'Engagement', 'D\u00E9lai de r\u00E9siliation'],
      [
        ['Essentiel (2j/mois)', '750 000 FCFA', '3 mois', '1 mois'],
        ['Avanc\u00E9 (4j/mois)', '1 200 000 FCFA', '6 mois', '2 mois'],
        ['Premium (8j/mois)', '2 000 000 FCFA', '6 mois', '2 mois'],
      ],
      [25, 25, 25, 25]
    ),
    sp(),
    h3('Argumentaire de vente et r\u00E9ponses aux objections'),
    tbl(
      ['Objection', 'R\u00E9ponse cl\u00e9'],
      [
        ['\u00AB On pr\u00E9f\u00e8re recruter en interne \u00BB', 'Un DAF senior co\u00fbte 3\u20135 M FCFA/mois charges comprises. Chez nous, c\u0027est 750k\u20132M \u2014 et vous avez acc\u00e8s \u00e0 une expertise multisectorielle.'],
        ['\u00AB On n\u0027a pas besoin de CFO tous les mois \u00BB', 'C\u0027est pr\u00E9cis\u00E9ment l\u0027int\u00E9r\u00eat : vous payez quand vous avez besoin. Pas de salaire fixe pendant les mois calmes.'],
        ['\u00AB Comment vous connaissez notre secteur ? \u00BB', 'Nous avons accompagn\u00E9 12 IMF, 8 PME et 4 ONG. Notre m\u00E9thodologie s\u0027adapte \u00e0 tout secteur \u2014 c\u0027est notre coeur de m\u00E9tier.'],
      ],
      [35, 65]
    ),
    sp(),
    h2('C.4 Matrice de s\u00E9lection des offres par segment'),
    tbl(
      ['Segment client', 'Offre recommand\u00E9e', 'Formule', 'CA moyen/contrat'],
      [
        ['IMF 2\u00e8me cat\u00E9gorie (conformit\u00E9)', 'Offre 2 \u2014 Conformit\u00E9 IMF', 'Pack Premium', '6 000 000 FCFA'],
        ['IMF en agr\u00E9mentation', 'Offre 2 + Offre 1', 'Pack Conformit\u00E9 + Pack Avanc\u00E9', '8 500 000 FCFA'],
        ['PME en lev\u00E9e de fonds', 'Offre 1 \u2014 Financement', 'Pack Avanc\u00E9 ou Premium', '3\u20135 000 000 FCFA'],
        ['PME en croissance', 'Offre 3 \u2014 CFO', 'Avanc\u00E9 ou Premium', '14\u201324 M FCFA/an'],
        ['ONG (bailleur de fonds)', 'Offre 3 + Offre 2', 'Pack Premium + CFO Avanc\u00E9', '10\u201315 M FCFA'],
        ['Projet structur\u00E9 par bailleur', 'Offre 1 + Offre 2', 'Pack Premium + Conformit\u00E9 Premium', '8\u201312 M FCFA'],
      ],
      [22, 22, 22, 34]
    ),
    pb(),
  ];
}

// ─── BLOC D : PLAN D'ACTION MENSUEL ─────────────────────────────────────────
function blockD(): (Paragraph | Table)[] {
  return [
    h1('D. PLAN D\u2019ACTION MENSUEL (MAI \u2013 D\u00C9CEMBRE 2026)'),
    sp(),
    h2('D.1 Mai 2026 \u2014 Lancement et fondations'),
    body('Objectif : Mettre en place les fondations digitales, lancer la prospection LinkedIn, et signer les premiers contrats via le r\u00E9seau existant.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Lancer calendrier \u00E9ditorial LinkedIn (1 post/jour)', 'Marketing', 'Fondateur + CM', 'Inclus', '30 posts / 5k impressions'],
        ['Cr\u00E9er page LinkedIn entreprise optimis\u00E9e', 'Marketing', 'CM', '50 000', 'Page compl\u00e8te, 100 abonn\u00E9s'],
        ['Lancer prospection LinkedIn (20 connexions/jour)', 'Commercial', 'Fondateur', 'Inclus', '600 connexions, 15 RDV'],
        ['Publier 3 vid\u00E9os TikTok p\u00E9dagogiques', 'Marketing', 'Fondateur', 'Inclus', '3 vid\u00E9os, 500 vues'],
        ['Cr\u00E9er landing page IMF + lead magnet', 'Marketing', 'CM + dev', '150 000', 'Page live, 20 t\u00E9l\u00E9chargements'],
        ['Signer 2 contrats via r\u00E9seau existant', 'Commercial', 'Fondateur', 'Inclus', '2 contrats sign\u00E9s'],
        ['Objectif CA Mai', '—', '—', '—', '8\u201312 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.2 Juin 2026 \u2014 Acc\u00E9l\u00E9ration digitale'),
    body('Objectif : Multiplier la prospection, lancer les premi\u00e8res campagnes payantes, et structurer le tunnel de conversion.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Atteindre 50 connexions/jour LinkedIn', 'Commercial', 'Fondateur', 'Inclus', '1 500 connexions, 30 RDV'],
        ['Lancer campagne Facebook Ads PME togolaises', 'Marketing', 'CM', '75 000', '500 clics, 20 leads'],
        ['Publier 12 vid\u00E9os TikTok (3/semaine)', 'Marketing', 'Fondateur', 'Inclus', '12 vid\u00E9os, 2k vues/vid\u00E9o'],
        ['Cr\u00E9er lead magnet PME (Simulateur ROI)', 'Marketing', 'CM + expert', '100 000', 'Outil live, 30 t\u00E9l\u00E9chargements'],
        ['Organiser 1 webinar gratuit \u00AB Conformit\u00E9 IMF \u00BB', 'Marketing', 'Fondateur', '50 000', '50 inscrits, 10 leads qualifi\u00E9s'],
        ['Signer 3 contrats IMF + 1 PME', 'Commercial', 'Fondateur', 'Inclus', '4 contrats sign\u00E9s'],
        ['Objectif CA Juin', '—', '—', '—', '12\u201318 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.3 Juillet 2026 \u2014 Expansion UEMOA'),
    body('Objectif : Ouvrir le march\u00E9 b\u00E9ninois (Cotonou) via LinkedIn et premiers partenariats. Lancer l\u0027offre CFO Externalis\u00E9.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Prospection LinkedIn B\u00E9nin (Cotonou) \u2014 20/jour', 'Commercial', 'Fondateur', 'Inclus', '600 connexions B\u00E9nin, 8 RDV'],
        ['Mission commerciale Cotonou (2 jours)', 'Commercial', 'Fondateur', '400 000', '8 RDV physique, 2 contrats'],
        ['Lancer offre CFO Externalis\u00E9 (landing page + s\u00E9quence)', 'Marketing', 'CM + fondateur', '150 000', 'Page live, 10 demandes'],
        ['Publier 3 vid\u00E9os TikTok sur lev\u00E9e de fonds', 'Marketing', 'Fondateur', 'Inclus', '3 vid\u00E9os, 3k vues'],
        ['Signer premier contrat CFO Externalis\u00E9', 'Commercial', 'Fondateur', 'Inclus', '1 contrat sign\u00E9'],
        ['Signer 2 contrats IMF + 2 PME', 'Commercial', 'Fondateur', 'Inclus', '4 contrats sign\u00E9s'],
        ['Objectif CA Juillet', '—', '—', '—', '15\u201320 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.4 Ao\u00fbt 2026 \u2014 Consolidation et automatisation'),
    body('Objectif : Automatiser les s\u00E9quences de nurturing, structurer le CRM, et maximiser les conversions.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Configurer CRM + s\u00E9quences email automatis\u00E9es', 'Marketing', 'CM + dev', '100 000', '5 s\u00E9quences live, 100 contacts'],
        ['Lancer newsletter mensuelle (1er num\u00E9ro)', 'Marketing', 'CM + expert', '50 000', '200 abonn\u00E9s, 25% taux ouverture'],
        ['Publier 3 vid\u00E9os TikTok + 1 collaboration', 'Marketing', 'Fondateur', 'Inclus', '3 vid\u00E9os, 5k vues'],
        ['Campagne LinkedIn Ads cibl\u00E9e DG IMF UEMOA', 'Marketing', 'CM', '100 000', '300 clics, 15 leads'],
        ['Signer 3 contrats IMF + 1 PME + 1 CFO', 'Commercial', 'Fondateur', 'Inclus', '5 contrats sign\u00E9s'],
        ['Objectif CA Ao\u00fbt', '—', '—', '—', '15\u201320 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.5 Septembre 2026 \u2014 Viralit\u00E9 et notori\u00E9t\u00E9'),
    body('Objectif : Cr\u00E9er un contenu viral sur TikTok/LinkedIn, augmenter le reach organique, et lancer la cible ONG.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Cr\u00E9er vid\u00E9o virale \u00AB Erreurs COBAC \u00BB (TikTok + Reels)', 'Marketing', 'Fondateur', 'Inclus', '50k vues, 500 partages'],
        ['Lancer prospection ONG (LinkedIn + email)', 'Commercial', 'Fondateur', 'Inclus', '50 contacts, 5 RDV'],
        ['Participer \u00e0 1 salon / conf\u00E9rence UEMOA (digitale ou physique)', 'Marketing', 'Fondateur', '300 000', '30 contacts, 3 leads qualifi\u00E9s'],
        ['Publier guide PDF \u00AB Benchmark IMF UEMOA 2026 \u00BB', 'Marketing', 'CM + expert', '200 000', '100 t\u00E9l\u00E9chargements, 20 leads'],
        ['Signer 2 contrats IMF + 2 PME + 1 ONG', 'Commercial', 'Fondateur', 'Inclus', '5 contrats sign\u00E9s'],
        ['Objectif CA Septembre', '—', '—', '—', '18\u201325 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.6 Octobre 2026 \u2014 Scaling commercial'),
    body('Objectif : Passer \u00e0 l\u0027\u00E9chelle avec un commercial d\u00E9di\u00E9 et un syst\u00e8me de parrainage client.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Recruter 1 commercial / charg\u00E9 d\u0027affaires', 'RH', 'Fondateur', '200 000/an', '1 recrutement effectif'],
        ['Lancer programme de parrainage client (10% du CA)', 'Commercial', 'Fondateur', 'Inclus', '3 parrainages actifs'],
        ['Organiser petit-d\u00E9jeuner clients / prospects (Lom\u00E9)', 'Marketing', 'Fondateur', '150 000', '15 participants, 3 RDV'],
        ['Publier 3 vid\u00E9os TikTok + 1 s\u00E9rie LinkedIn (5 jours)', 'Marketing', 'Fondateur + CM', 'Inclus', 'S\u00E9rie virale, 10k impressions'],
        ['Signer 4 contrats IMF + 2 PME + 1 CFO', 'Commercial', 'Fondateur + commercial', 'Inclus', '7 contrats sign\u00E9s'],
        ['Objectif CA Octobre', '—', '—', '—', '20\u201328 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.7 Novembre 2026 \u2014 Fid\u00E9lisation et upsell'),
    body('Objectif : Maximiser le revenu r\u00E9current via les contrats CFO et les renouvellements IMF.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['Campagne upsell clients existants (CFO, suivi)', 'Commercial', 'Fondateur', 'Inclus', '3 upsells sign\u00E9s'],
        ['Publier t\u00E9moignage client vid\u00E9o (LinkedIn + site)', 'Marketing', 'CM + fondateur', '100 000', '1 vid\u00E9o, 5k vues'],
        ['Envoyer cartes de voeux num\u00E9riques personnalis\u00E9es', 'Marketing', 'CM', '50 000', '100 envois, 10 r\u00E9ponses'],
        ['Signer 3 contrats IMF + 2 PME + 2 CFO (renouvellement)', 'Commercial', 'Fondateur + commercial', 'Inclus', '7 contrats sign\u00E9s'],
        ['Objectif CA Novembre', '—', '—', '—', '18\u201325 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.8 D\u00E9cembre 2026 \u2014 Bilan et pr\u00E9paration 2027'),
    body('Objectif : Bilan annuel, consolidation des gains, et lancement de la strat\u00E9gie 2027.'),
    sp(),
    tbl(
      ['Action', 'Cat\u00E9gorie', 'Responsable', 'Budget', 'KPI'],
      [
        ['R\u00E9union bilan CA / KPI annuels', 'Management', 'Fondateur', 'Inclus', 'Rapport bilan complet'],
        ['Pr\u00E9paration plan 2027 (budget, objectifs, recrutement)', 'Management', 'Fondateur', 'Inclus', 'Plan 2027 valid\u00E9'],
        ['Publier bilan annuel KHEPRA (LinkedIn + site)', 'Marketing', 'CM + fondateur', '50 000', '1 post, 10k impressions'],
        ['Signer 3 contrats IMF + 2 PME + 1 CFO', 'Commercial', 'Fondateur + commercial', 'Inclus', '6 contrats sign\u00E9s'],
        ['Objectif CA D\u00E9cembre', '—', '—', '—', '15\u201322 M FCFA'],
      ],
      [35, 12, 18, 15, 20]
    ),
    sp(),
    h2('D.9 Synth\u00e8se des objectifs CA mensuels'),
    tbl(
      ['Mois', 'Objectif CA (M FCFA)', 'Cumul\u00E9 (M FCFA)', 'Contrats sign\u00E9s', 'Leads g\u00E9n\u00E9r\u00E9s'],
      [
        ['Mai', '8\u201312', '8\u201312', '2', '40'],
        ['Juin', '12\u201318', '20\u201330', '4', '80'],
        ['Juillet', '15\u201320', '35\u201350', '4', '80'],
        ['Ao\u00fbt', '15\u201320', '50\u201370', '5', '80'],
        ['Septembre', '18\u201325', '68\u201395', '5', '100'],
        ['Octobre', '20\u201328', '88\u2013123', '7', '120'],
        ['Novembre', '18\u201325', '106\u2013148', '7', '100'],
        ['D\u00E9cembre', '15\u201322', '121\u2013170', '6', '80'],
        ['TOTAL 2026', '121\u2013170', '—', '40', '680'],
      ],
      [14, 18, 18, 16, 34]
    ),
    sp(),
    successBox('Objectif CA 2026 : 121\u2013170 M FCFA. Le sc\u00E9nario conservateur (121 M) est atteignable avec une ex\u00E9cution rigoureuse des actions digitales et commerciales. Le sc\u00E9nario optimiste (170 M) n\u00E9cessite une viralit\u00E9 exceptionnelle sur TikTok/LinkedIn et 2\u20133 gros contrats ONG/bailleurs.'),
    pb(),
  ];
}

// ─── BLOC E : STRATÉGIE DE CLOSING ───────────────────────────────────────────
function blockE(): (Paragraph | Table)[] {
  return [
    h1('E. STRAT\u00C9GIE DE CLOSING'),
    sp(),
    h2('E.1 Philosophie du closing KHEPRA'),
    body('Le closing chez KHEPRA EXPERTS n\u0027est pas une technique de manipulation. C\u0027est une \u00E9tape de structuration o\u00F9 le prospect confirme qu\u0027il a bien compris la valeur, qu\u0027il a identifi\u00E9 le co\u00fbt de l\u0027inaction, et qu\u0027il dispose des \u00E9l\u00E9ments pour d\u00E9cider. Le taux de conversion cible est de 32% (RDV qualifi\u00E9 \u2192 contrat sign\u00E9).'),
    sp(),
    h2('E.2 Structure d\u0027un appel de closing (60 minutes)'),
    sp(),
    h4('Phase 1 \u2014 Rapport et rappel du contexte (5 min)'),
    body('\u00AB [Pr\u00E9nom], merci de prendre ce temps. Avant de commencer, je voulais reprendre o\u00F9 nous en \u00E9tions rest\u00E9s lors de notre dernier \u00E9change. Vous m\u0027aviez dit que [probl\u00e8me principal] vous co\u00fbtait [montant estim\u00E9] par mois. Est-ce toujours le cas ? \u00BB'),
    sp(),
    h4('Phase 2 \u2014 Diagnostic partag\u00E9 (15 min)'),
    body('Re-pr\u00E9senter les 3 points de douleur identifi\u00E9s lors du premier RDV. Utiliser des chiffres du prospect. Demander \u00e0 chaque fois : \u00AB Est-ce que je r\u00E9sume bien ? \u00BB'),
    sp(),
    h4('Phase 3 \u2014 Pr\u00E9sentation de la solution (15 min)'),
    body('Pr\u00E9senter l\u0027offre packag\u00E9e adapt\u00E9e. Ne PAS pr\u00E9senter toutes les offres. Une seule offre = un seul choix : accepter ou non. Structurer :'),
    bullet('Probl\u00e8me (rappel)'),
    bullet('Solution (offre packag\u00E9e)'),
    bullet('R\u00E9sultat attendu (chiffr\u00E9)'),
    bullet('Investissement (prix)'),
    bullet('Garantie (clause de succ\u00e8s)'),
    sp(),
    h4('Phase 4 \u2014 Gestion des objections (15 min)'),
    body('Objections classiques et r\u00E9ponses structur\u00E9es :'),
    sp(),
    tbl(
      ['Objection', 'Technique', 'R\u00E9ponse KHEPRA'],
      [
        ['\u00AB C\u0027est trop cher \u00BB', 'Reframing ROI', '\u00AB Si je vous garantissais que cet investissement vous rapporte 10 fois son co\u00fbt en 6 mois, est-ce que vous le feriez ? C\u0027est exactement ce que nous avons fait chez [Client X]. \u00BB'],
        ['\u00AB On n\u0027est pas pr\u00eats / pas le budget \u00BB', 'Co\u00fbt de l\u0027inaction', '\u00AB Je comprends. Prenons 2 minutes pour calculer ensemble ce que ce probl\u00e8me vous co\u00fbte chaque mois o\u00F9 vous ne faites rien. [Calcul live]. Ce retard de 3 mois co\u00fbte d\u00E9j\u00e0 [montant]. \u00BB'],
        ['\u00AB On va r\u00E9fl\u00E9chir / comparer \u00BB', 'Urgence + raret\u00E9', '\u00AB Bien s\u00fbr. Je voulais juste vous pr\u00E9ciser que je ne prends que 2 nouveaux clients par mois pour garantir la qualit\u00E9. Le prochain cr\u00E9neau disponible est dans 6 semaines. Voulez-vous s\u00E9curiser votre place maintenant ? \u00BB'],
        ['\u00AB On a d\u00E9j\u00e0 un prestataire \u00BB', 'Diff\u00E9renciation', '\u00AB Excellent. Un prestataire existant est un atout. Notre r\u00f4le n\u0027est pas de le remplacer mais de le compl\u00E9menter sur [point sp\u00E9cifique]. Beaucoup de nos clients gardent leur prestataire actuel ET nous font appel pour la strat\u00E9gie. \u00BB'],
        ['\u00AB Le DG / le board doit valider \u00BB', 'Facilitation d\u00E9cision', '\u00AB Parfait. Je peux pr\u00E9parer une note de synth\u00E8se de 2 pages avec les chiffres cl\u00E9s pour faciliter la pr\u00E9sentation au board. Souhaitez-vous que je vous l\u0027envoie ce soir ? \u00BB'],
      ],
      [22, 18, 60]
    ),
    sp(),
    h4('Phase 5 \u2014 Closing et prochaines \u00E9tapes (10 min)'),
    body('Utiliser la technique du choix altern\u00E9 : \u00AB Souhaitez-vous d\u00E9marrer avec le Pack Avanc\u00E9 en d\u00E9but de mois, ou pr\u00E9f\u00E9rez-vous le Pack Essentiel pour commencer ? \u00BB'),
    sp(),
    body('Ou la technique de l\u0027engagement progressif : \u00AB Commen\u00e7ons par le Diagnostic Flash \u00e0 500k. Si les r\u00E9sultats vous convainquent, nous passerons au Pack Premium. Cela vous convient ? \u00BB'),
    sp(),
    h2('E.3 Techniques d\u0027urgence et de raret\u00E9 (\u00e0 utiliser avec int\u00E9grit\u00E9)'),
    sp(),
    bullet('Raret\u00E9 capacitaire : \u00AB Je ne prends que 2 nouveaux clients par mois \u00BB (vrai \u2014 ne pas inventer)'),
    bullet('Urgence calendaire : \u00AB Pour d\u00E9marrer en juin et livrer avant la fin du semestre, il faut signer cette semaine \u00BB (vrai si planning charg\u00E9)'),
    bullet('Urgence r\u00E9glementaire : \u00AB L\u0027inspection COBAC est pr\u00E9vue en octobre. Chaque mois de retard augmente le risque de non-conformit\u00E9 \u00BB (vrai)'),
    bullet('Preuve sociale : \u00AB Nous avons accompagn\u00E9 12 IMF \u00e0 ce jour. 100% ont obtenu leur agr\u00E9ment dans les d\u00E9lais. \u00BB (vrai si chiffres exacts)'),
    bullet('Garantie de succ\u00e8s : \u00AB Si vous n\u0027obtenez pas le financement apr\u00e8s notre accompagnement, vous ne payez que 50%. \u00BB (offre financi\u00e8re de KHEPRA)'),
    sp(),
    alertBox('R\u00e8gle d\u0027or : Toute technique d\u0027urgence doit \u00eatre VRAIE. L\u0027int\u00E9grit\u00E9 est la fondation de la marque KHEPRA. Jamais de fausses menaces de prix, jamais de fausses limitations de places.'),
    sp(),
    h2('E.4 Scripts de vente t\u00E9l\u00E9phonique'),
    sp(),
    h4('Script d\u0027ouverture (appel froid LinkedIn)'),
    body('\u00AB Bonjour [Pr\u00E9nom], c\u0027est SIMDA Essoyom\u00E8w\u00E8 de KHEPRA EXPERTS. Merci d\u0027avoir accept\u00E9 ma connexion LinkedIn. J\u0027ai remarqu\u00E9 votre parcours chez [Entreprise] et je pense qu\u0027un sujet pourrait vous int\u00E9resser : [probl\u00e8me sp\u00E9cifique]. Je ne prends que 2 minutes \u2014 est-ce que vous avez un court instant ? \u00BB'),
    sp(),
    h4('Script de relance (email J+3 apr\u00e8s RDV)'),
    body('\u00AB Objet : Votre diagnostic flash \u2014 r\u00E9sultats et prochaines \u00E9tapes. \u00BB'),
    body('\u00AB Bonjour [Pr\u00E9nom], merci pour notre \u00E9change de [date]. Comme convenu, je vous envoie le r\u00E9sum\u00E9 de nos 3 axes de travail prioritaires : [liste]. Le budget pour traiter ces 3 points est de [montant] sur [dur\u00E9e]. Je reste disponible pour en discuter cette semaine. Meilleures salutations, SIMDA. \u00BB'),
    sp(),
    h4('Script de closing (email final J+7)'),
    body('\u00AB Objet : Derni\u00e8re chance \u2014 cr\u00E9neau juin. \u00BB'),
    body('\u00AB Bonjour [Pr\u00E9nom], je voulais revenir vers vous sur notre proposition. Pour pouvoir d\u00E9marrer en juin et livrer les premiers r\u00E9sultats avant la fin du semestre, j\u0027ai besoin de votre validation d\u0027ici vendredi. Apr\u00e8s ce d\u00E9lai, mon planning est complet jusqu\u0027\u00e0 mi-juillet. Souhaitez-vous que je vous r\u00E9serve le cr\u00E9neau ? \u00BB'),
    sp(),
    h2('E.5 M\u00E9thodes pour atteindre 32%+ de conversion'),
    sp(),
    bullet('Qualification rigoureuse : Ne pas passer de RDV avec un prospect non BANT (Budget, Autorit\u00E9, Besoin, Timing). Un mauvais RDV est pire qu\u0027aucun RDV.'),
    bullet('Pr\u00E9paration du RDV : 15 minutes de pr\u00E9paration avant chaque appel. Lire le profil LinkedIn, identifier 2 points de douleur probables, pr\u00E9parer 1 chiffre de preuve sociale.'),
    bullet('D\u00E9mo gratuite strat\u00E9gique : Proposer un Diagnostic Flash de 30 min gratuit OU un exercice de valorisation rapide. La d\u00E9mo gratuite convertit \u00e0 45% quand elle est bien cadr\u00E9e.'),
    bullet('Suivi syst\u00E9matique : 5 touchpoints minimum entre le premier contact et la signature (email, appel, email, appel, email). 80% des ventes se font apr\u00e8s le 5\u00e8me contact.'),
    bullet('Proposition en 48h : Envoyer la proposition commerciale dans les 48h suivant le RDV. Chaque jour de retard r\u00E9duit le taux de conversion de 8%.'),
    bullet('T\u00E9moignage vid\u00E9o : D\u00E8s le 3\u00e8me client satisfait, produire une vid\u00E9o t\u00E9moignage de 60 secondes. Les t\u00E9moignages vid\u00E9o augmentent le taux de conversion de 25%.'),
    sp(),
    tbl(
      ['Variable', 'Impact sur taux de conversion', 'Action KHEPRA'],
      [
        ['Diagnostic Flash gratuit', '+45%', 'Syst\u00E9matiser en ouverture'],
        ['Proposition en < 48h', '+18%', 'Template pr\u00E9-rempli'],
        ['T\u00E9moignage vid\u00E9o client', '+25%', 'Filmer d\u00E8s le 3\u00e8me contrat'],
        ['5 touchpoints de suivi', '+30%', 'CRM + s\u00E9quences automatis\u00E9es'],
        ['Garantie succ\u00e8s (50% si \u00E9chec)', '+20%', 'Int\u00E9grer dans les 3 offres'],
        ['Preuve sociale chiffr\u00E9e (12 IMF)', '+15%', 'Int\u00E9grer dans chaque proposition'],
        ['Personnalisation de la proposition', '+12%', 'Template adaptable en 30 min'],
      ],
      [30, 20, 50]
    ),
    pb(),
  ];
}

// ─── BLOC F : KPI & PILOTAGE ─────────────────────────────────────────────────
function blockF(): (Paragraph | Table)[] {
  return [
    h1('F. KPI \u0026 PILOTAGE'),
    sp(),
    h2('F.1 Tableau de bord mensuel'),
    body('Le tableau de bord doit \u00eatre mis \u00e0 jour le premier lundi de chaque mois par le fondateur. Il comporte 4 familles d\u0027indicateurs :'),
    sp(),
    h3('F.1.1 Indicateurs marketing (leviers)'),
    tbl(
      ['KPI', 'Cible Mai', 'Cible Juin', 'Cible Sep', 'Cible D\u00E9c', 'Outil de mesure'],
      [
        ['Impressions LinkedIn', '5 000', '15 000', '30 000', '50 000', 'LinkedIn Analytics'],
        ['Abonn\u00E9s LinkedIn (perso)', '1 200', '1 800', '3 000', '5 000', 'LinkedIn Analytics'],
        ['Vues TikTok moy/vid\u00E9o', '500', '2 000', '5 000', '8 000', 'TikTok Analytics'],
        ['Trafic web mensuel', '300', '800', '1 500', '3 000', 'Google Analytics'],
        ['Taux de conversion web', '5%', '8%', '10%', '12%', 'GA + CRM'],
        ['Co\u00fbt d\u0027acquisition lead (CPA)', '8 500', '6 000', '4 500', '3 500', 'Budget / Leads'],
      ],
      [25, 12, 12, 12, 12, 27]
    ),
    sp(),
    h3('F.1.2 Indicateurs commerciaux (r\u00E9sultats)'),
    tbl(
      ['KPI', 'Cible Mai', 'Cible Juin', 'Cible Sep', 'Cible D\u00E9c', 'Outil de mesure'],
      [
        ['Leads qualifi\u00E9s', '40', '80', '100', '80', 'CRM'],
        ['RDV qualifi\u00E9s', '15', '30', '35', '30', 'Calendly + CRM'],
        ['Propositions envoy\u00E9es', '8', '16', '20', '18', 'CRM'],
        ['Contrats sign\u00E9s', '2', '4', '5', '6', 'CRM'],
        ['Taux conversion lead \u2192 RDV', '37%', '37%', '35%', '37%', 'CRM'],
        ['Taux conversion RDV \u2192 closing', '32%', '32%', '32%', '32%', 'CRM'],
        ['CA mensuel (M FCFA)', '8\u201312', '12\u201318', '18\u201325', '15\u201322', 'Comptabilit\u00E9'],
        ['Panier moyen (M FCFA)', '4', '4,5', '5', '5', 'Comptabilit\u00E9'],
        ['Clients r\u00E9currents (%)', '0%', '10%', '20%', '30%', 'CRM'],
      ],
      [28, 10, 10, 10, 10, 32]
    ),
    sp(),
    h3('F.1.3 Indicateurs financiers (sant\u00E9)'),
    tbl(
      ['KPI', 'Cible trimestrielle', 'Seuil d\u0027alerte', 'Seuil critique'],
      [
        ['CA cumul\u00E9 (M FCFA)', 'Q1 : 30 / Q2 : 65 / Q3 : 95 / Q4 : 150', '< 80% de l\u0027objectif', '< 60% de l\u0027objectif'],
        ['Marge brute (%)', '> 35%', '< 30%', '< 25%'],
        ['D\u00E9lai moyen paiement clients', '< 30 jours', '> 45 jours', '> 60 jours'],
        ['Tr\u00E9sorerie nette (M FCFA)', '> 5 M', '< 3 M', '< 1 M'],
        ['D\u00E9penses marketing / CA', '< 5%', '> 7%', '> 10%'],
      ],
      [30, 30, 20, 20]
    ),
    sp(),
    h2('F.2 Rituel de pilotage hebdomadaire'),
    body('Chaque lundi matin, 30 minutes de revue :'),
    sp(),
    bullet('Semaine pr\u00E9c\u00E9dente : Leads g\u00E9n\u00E9r\u00E9s ? RDV r\u00E9alis\u00E9s ? Propositions envoy\u00E9es ? Signatures ?'),
    bullet('Semaine en cours : RDV planifi\u00E9s ? Actions marketing ? Contenu \u00e0 produire ?'),
    bullet('Blocs identifi\u00E9s : Quel prospect bloque ? Quelle objection r\u00E9currente ? Quel ajustement n\u00E9cessaire ?'),
    bullet('Priorit\u00E9s : Les 3 actions les plus impactantes de la semaine'),
    sp(),
    h2('F.3 Rituel de pilotage mensuel'),
    body('Le premier lundi de chaque mois, 2 heures de revue strat\u00E9gique :'),
    sp(),
    bullet('Bilan KPI vs objectifs mensuels'),
    bullet('Analyse des \u00E9carts et causes racines'),
    bullet('Ajustement des actions du mois suivant'),
    bullet('Mise \u00e0 jour du pipeline commercial (prospects, propositions, signatures)'),
    bullet('R\u00E9vision du budget marketing si n\u00E9cessaire'),
    sp(),
    h2('F.4 Outils recommand\u00E9s'),
    tbl(
      ['Fonction', 'Outil recommand\u00E9', 'Co\u00fbt mensuel', 'Justification'],
      [
        ['CRM', 'HubSpot CRM (gratuit) ou Pipedrive', '0\u2013500k FCFA', 'Pipeline, s\u00E9quences, reporting'],
        ['Email marketing', 'Mailchimp ou Brevo (Sendinblue)', '0\u2013150k FCFA', 'S\u00E9quences, newsletters, automation'],
        ['Scheduling', 'Calendly', '0\u2013100k FCFA', 'RDV automatis\u00E9s, synchronisation'],
        ['Analytics', 'Google Analytics 4 + LinkedIn Analytics natif', 'Gratuit', 'Trafic, conversions, comportements'],
        ['Design', 'Canva Pro', '50k FCFA', 'Visuels posts, carrousels, PDF'],
        ['Vid\u00E9o', 'CapCut + smartphone', 'Gratuit', 'Montage vid\u00E9o TikTok/Reels'],
        ['SEO', 'Ubersuggest ou SEMrush', '200k FCFA', 'Mots-cl\u00E9s, positionnement'],
      ],
      [20, 25, 20, 35]
    ),
    sp(),
    h2('F.5 Plan de contingence'),
    body('Si les r\u00E9sultats sont inf\u00E9rieurs aux objectifs :'),
    sp(),
    tbl(
      ['Sc\u00E9nario', 'Seuil', 'Action d\u00E9clench\u00E9e', 'Responsable'],
      [
        ['Leads < 50% objectif', '2 semaines cons\u00E9cutives', 'Intensifier LinkedIn (100 connexions/jour) + lancer campagne payante', 'Fondateur + CM'],
        ['RDV < 50% objectif', '2 semaines cons\u00E9cutives', 'Revoir les scripts, augmenter les d\u00E9mos gratuites, relancer les leads dormants', 'Fondateur'],
        ['CA < 50% objectif trimestriel', 'Fin du trimestre', 'R\u00E9union strat\u00E9gique, ajustement pricing, relance clients existants, mission terrain', 'Fondateur'],
        ['Taux conversion < 20%', '1 mois', 'Audit du script de closing, formation fondateur, mentorat ext\u00E9rieur', 'Fondateur'],
        ['Burn rate critique', 'Tr\u00E9sorerie < 1 M', 'R\u00E9duction imm\u00E9diate des d\u00E9penses, focus sur les offres \u00e0 haute marge, relance clients', 'Fondateur'],
      ],
      [22, 22, 38, 18]
    ),
    sp(),
    successBox('Le tableau de bord KHEPRA est con\u00e7u pour \u00eatre op\u00E9rationnel d\u00E8s le premier jour. Aucune complexit\u00E9 inutile : le fondateur peut le tenir seul avec 2h/semaine. D\u00E8s l\u0027arriv\u00E9e d\u0027un commercial (Octobre 2026), le tableau de bord sera partag\u00E9 et int\u00E9gr\u00E9 au CRM.'),
    pb(),
  ];
}

// ─── ANNEXES ────────────────────────────────────────────────────────────────
function annexes(): (Paragraph | Table)[] {
  return [
    h1('ANNEXES \u2014 OUTILS ET TEMPLATES EX\u00C9CUTABLES'),
    sp(),
    h2('Annexe 1 \u2014 Template de proposition commerciale'),
    body('Structure standard de toute proposition KHEPRA EXPERTS (format PPT 10\u201315 slides ou PDF 8 pages) :'),
    sp(),
    tbl(
      ['Slide / Section', 'Contenu', 'Ton'],
      [
        ['1. Page de garde', 'Logo KHEPRA + titre + r\u00E9f\u00E9rence + date', 'Professionnel, sobre'],
        ['2. Contexte client', 'R\u00E9sum\u00E9 du probl\u00e8me identifi\u00E9 lors du RDV', 'Empathique, pr\u00E9cis'],
        ['3. Enjeux et risques', 'Co\u00fbt de l\u0027inaction, risques r\u00E9glementaires, opportunit\u00E9s manqu\u00E9es', 'Chiffr\u00E9, alarmant mais constructif'],
        ['4. Solution KHEPRA', 'Offre packag\u00E9e adapt\u00E9e + m\u00E9thodologie en 3 \u00e9tapes', 'Clair, structur\u00E9'],
        ['5. Livrables d\u00E9taill\u00E9s', 'Liste pr\u00E9cise des livrables avec d\u00E9lais', 'Concret, mesurable'],
        ['6. \u00C9quipe et expertise', 'Profil du consultant + t\u00E9moignage client', 'Cr\u00E9dible, humain'],
        ['7. Investissement', 'Prix + d\u00E9tail + conditions de paiement', 'Transparent, sans surprise'],
        ['8. Garantie', 'Clause de succ\u00e8s ou remboursement partiel', 'Rassurant, diff\u00E9renciant'],
        ['9. Prochaines \u00E9tapes', 'Calendrier des 30 premiers jours', 'Actionnable, urgent'],
        ['10. Contact', 'Coordonn\u00E9es + Calendly + signature', 'Accessible, professionnel'],
      ],
      [20, 50, 30]
    ),
    sp(),
    h2('Annexe 2 \u2014 Budget op\u00E9rationnel complet 2026'),
    tbl(
      ['Poste', 'Mai\u2013Juin', 'Juil\u2013Sep', 'Oct\u2013D\u00E9c', 'Total 2026'],
      [
        ['Marketing digital (contenu + pub + outils)', '675 000', '725 000', '875 000', '4 850 000'],
        ['D\u00E9placements terrain (Cotonou, etc.)', '200 000', '600 000', '400 000', '1 200 000'],
        ['\u00c9v\u00E9nements (webinaires, petit-d\u00E9jeuner)', '100 000', '175 000', '225 000', '500 000'],
        ['Community manager / VA', '200 000', '450 000', '600 000', '1 250 000'],
        ['Commercial (sal. 1/2 temps d\u00E8s Oct)', '0', '0', '400 000', '400 000'],
        ['Frais g\u00E9n\u00E9raux (t\u00E9l\u00E9phone, internet, bureau)', '100 000', '150 000', '200 000', '450 000'],
        ['TOTAL OPEX COMMERCIAL', '1 275 000', '2 100 000', '2 700 000', '8 650 000'],
      ],
      [28, 16, 16, 16, 24]
    ),
    sp(),
    h2('Annexe 3 \u2014 S\u00E9quence email nurturing (14 jours)'),
    tbl(
      ['Jour', 'Objet', 'Contenu', 'CTA'],
      [
        ['J0', 'Bienvenue \u2014 Voici votre guide IMF', 'Livraison lead magnet + pr\u00E9sentation KHEPRA', 'Lire le guide'],
        ['J2', '3 erreurs que 80% des IMF commettent', 'Contenu p\u00E9dagogique + pr\u00E9uve sociale', 'T\u00E9l\u00E9charger la checklist'],
        ['J4', 'T\u00E9moignage : Comment [Client] a pass\u00E9 l\u0027inspection', 'Storytelling client + r\u00E9sultats chiffr\u00E9s', 'Voir la vid\u00E9o'],
        ['J7', 'Votre diagnostic flash est pr\u00eat', 'Offre de Diagnostic Flash 30 min gratuit', 'R\u00E9server mon cr\u00E9neau'],
        ['J10', 'Derni\u00e8re chance : 2 places cette semaine', 'Urgence calendaire + raret\u00E9', 'R\u00E9server maintenant'],
        ['J14', 'Derni\u00e8re relance + contenu gratuit', 'Article blog ou vid\u00E9o + invitation \u00e0 se reconnecter', 'Me contacter'],
      ],
      [8, 28, 36, 28]
    ),
    sp(),
    h2('Annexe 4 \u2014 Checklist de lancement (Jour 1)'),
    body('Les 10 actions \u00e0 r\u00E9aliser d\u00E8s le 1er mai 2026 :'),
    sp(),
    bullet('\u2611 Optimiser le profil LinkedIn de SIMDA (banni\u00e8re, titre, \u00e0 propos, exp\u00E9riences)'),
    bullet('\u2611 Cr\u00E9er la page LinkedIn entreprise KHEPRA EXPERTS'),
    bullet('\u2611 Publier le premier post LinkedIn (storytelling fondateur)'),
    bullet('\u2611 Lancer la prospection LinkedIn (20 connexions cibl\u00E9es)'),
    bullet('\u2611 Publier la premi\u00e8re vid\u00E9o TikTok (erreur PME/IMF)'),
    bullet('\u2611 Cr\u00E9er la landing page IMF avec formulaire et lead magnet'),
    bullet('\u2611 Configurer Calendly pour les RDV de diagnostic'),
    bullet('\u2611 Envoyer 5 emails de prospection aux contacts chauds du r\u00E9seau'),
    bullet('\u2611 Mettre \u00e0 jour le site web (homepage + CTA principal)'),
    bullet('\u2611 Cr\u00E9er le tableau de bord KPI Excel (mod\u00e8le vierge)'),
    sp(),
    successBox('Ce plan d\u0027action commercial et marketing est con\u00e7u pour \u00eatre ex\u00E9cut\u00E9 imm\u00E9diatement. Chaque action est chiffr\u00E9e, dat\u00E9e et responsabilis\u00E9e. Le fondateur peut d\u00E9marrer seul en mai, puis recruter un CM en juin et un commercial en octobre. Avec discipline et ex\u00E9cution rigoureuse, l\u0027objectif de 121\u2013170 M FCFA de CA en 2026 est atteignable.'),
    sp(),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', color: STEEL, size: 20, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS \u2014 Cabinet International de Conseil', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Gouvernance \u00B7 Strat\u00E9gie \u00B7 Finance \u00B7 Gestion des Risques', size: 18, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'khepraexperts.com | contact@khepraexperts.com | Lom\u00E9 \u2014 Togo', size: 18, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'R\u00E9f. KE-PLAN-COM-TOGO-2026-001 | Version 1.0 | Mai 2026 | CONFIDENTIEL', size: 16, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generatePlanCommercialMarketing(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    ...coverPage(),
    ...tableOfContents(),
    ...blockA(),
    ...blockB(),
    ...blockC(),
    ...blockD(),
    ...blockE(),
    ...blockF(),
    ...annexes(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Plan d\u2019Action Commercial et Marketing \u2014 KHEPRA EXPERTS \u2014 Mai-D\u00E9cembre 2026',
    description: 'Plan d\u2019ex\u00E9cution commercial et marketing niveau Big Four pour KHEPRA EXPERTS \u2014 Go-to-market digital, p\u00E9n\u00E9tration Togo et UEMOA, g\u00E9n\u00E9ration de chiffre d\u2019affaires',
    subject: 'Strat\u00E9gie commerciale, Marketing digital, B2B, Afrique francophone',
    keywords: 'KHEPRA, plan commercial, marketing digital, Togo, UEMOA, IMF, PME, ONG, LinkedIn, TikTok, closing, go-to-market',
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
                  new TextRun({ text: 'KHEPRA EXPERTS  |  Plan d\u2019Action Commercial \u0026 Marketing  |  Mai\u2013D\u00E9c. 2026  |  R\u00E9f. KE-PLAN-COM-TOGO-2026-001  |  CONFIDENTIEL', size: 15, color: GRAY, font: 'Calibri' }),
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
                  new TextRun({ text: 'KHEPRA EXPERTS \u2014 khepraexperts.com  |  Plan d\u2019ex\u00E9cution niveau Big Four  |  Page ', size: 15, color: GRAY, font: 'Calibri' }),
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



