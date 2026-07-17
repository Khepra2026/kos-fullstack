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
  ColumnBreak,
} from 'docx';

// ─── Palette CORNERSTONE ───────────────────────────────────────────────────────
const NAVY = '0A1628';          // Bleu profond
const NAVY_MID = '1B3A6B';     // Bleu marine moyen
const STEEL = '2E5FA3';        // Bleu acier
const STEEL_LIGHT = 'D6E4F7';  // Bleu très clair
const MINERAL = '4A5568';      // Gris minéral
const MINERAL_LIGHT = 'F0F2F5'; // Gris très clair
const SILVER = '8A9BB0';       // Argent
const WHITE = 'FFFFFF';
const GOLD_ACCENT = 'C8A84B';  // Or industriel
const DARK_TEXT = '1A2332';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sp(lines = 1): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 20 })],
    spacing: { before: 0, after: lines * 100 },
  });
}

function divider(color = STEEL): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 4 })],
    shading: { type: ShadingType.SOLID, color, fill: color },
    spacing: { before: 80, after: 80 },
  });
}

function sectionTitle(text: string, bgColor = NAVY_MID): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: `  ${text}  `,
        bold: true,
        size: 26,
        color: WHITE,
        font: 'Calibri',
        allCaps: true,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: bgColor, fill: bgColor },
    spacing: { before: 300, after: 200 },
    indent: { left: convertInchesToTwip(0.1) },
  });
}

function subTitle(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        color: STEEL,
        font: 'Calibri',
        characterSpacing: 40,
      }),
    ],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 3, color: STEEL },
    },
    spacing: { before: 240, after: 140 },
  });
}

function bodyText(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: opts?.size || 20,
        font: 'Calibri',
        bold: opts?.bold,
        italics: opts?.italic,
        color: opts?.color || DARK_TEXT,
      }),
    ],
    spacing: { before: 60, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bulletItem(text: string, icon = '▸'): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }),
      new TextRun({ text, size: 20, font: 'Calibri', color: DARK_TEXT }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: convertInchesToTwip(0.2) },
  });
}

function highlightBox(label: string, value: string, subtext?: string): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: value, bold: true, size: 36, color: WHITE, font: 'Calibri' }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 0 },
      indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: label, bold: true, size: 18, color: GOLD_ACCENT, font: 'Calibri', allCaps: true }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    }),
    ...(subtext ? [new Paragraph({
      children: [new TextRun({ text: subtext, size: 16, color: SILVER, font: 'Calibri', italics: true })],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 100 },
      indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    })] : [sp()]),
  ];
}

function makeTable(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const totalWidth = 100;
  const defaultWidth = Math.floor(totalWidth / headers.length);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        width: { size: colWidths ? colWidths[i] : defaultWidth, type: WidthType.PERCENTAGE },
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({
                text: cell,
                size: 18,
                font: 'Calibri',
                color: DARK_TEXT,
                bold: ci === 0 && ri < rows.length,
              })],
              alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
            }),
          ],
          shading: {
            type: ShadingType.SOLID,
            color: ri % 2 === 0 ? WHITE : MINERAL_LIGHT,
            fill: ri % 2 === 0 ? WHITE : MINERAL_LIGHT,
          },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          width: { size: colWidths ? colWidths[ci] : defaultWidth, type: WidthType.PERCENTAGE },
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
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

function stockBadge(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: '  ✔  STOCK DISPONIBLE IMMÉDIATEMENT — CAPACITÉ 700 000 TONNES/AN  ',
        bold: true,
        size: 17,
        color: WHITE,
        font: 'Calibri',
        allCaps: true,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: STEEL, fill: STEEL },
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 100 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 2, color: GOLD_ACCENT },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD_ACCENT },
    },
  });
}

// ─── PAGE 1 : COUVERTURE ──────────────────────────────────────────────────────
function page1Cover(): Paragraph[] {
  return [
    // Bande supérieure NAVY
    new Paragraph({
      children: [new TextRun({ text: '', size: 4 })],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      spacing: { before: 0, after: 0 },
    }),
    sp(1),
    // Logo / Nom société
    new Paragraph({
      children: [
        new TextRun({
          text: 'CORNERSTONE GROUP INTERNATIONAL S.A.',
          bold: true,
          size: 36,
          color: NAVY,
          font: 'Calibri',
          allCaps: true,
          characterSpacing: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Capital Social : 2 500 000 000 FCFA',
          size: 20,
          color: MINERAL,
          font: 'Calibri',
          bold: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    divider(GOLD_ACCENT),
    sp(1),
    // Titre principal
    new Paragraph({
      children: [
        new TextRun({
          text: 'Bâtir sur des bases inébranlables',
          bold: true,
          size: 52,
          color: NAVY,
          font: 'Calibri',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 160 },
    }),
    // Sous-titre
    new Paragraph({
      children: [
        new TextRun({
          text: 'Expertise en concassage et fourniture stratégique de granulats premium',
          size: 24,
          color: STEEL,
          font: 'Calibri',
          bold: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Gneiss / Granite — Gisement de Siyimé (Haho) — Afrique de l\'Ouest',
          size: 22,
          color: MINERAL,
          font: 'Calibri',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 300 },
    }),
    divider(NAVY_MID),
    sp(1),
    // Bloc 3 chiffres clés
    makeTable(
      ['Capacité Annuelle', 'Capital Social', 'Certification Qualité'],
      [['700 000 T/an', '2,5 Mds FCFA', 'LNBTP Certifié']],
      [33, 34, 33]
    ),
    sp(1),
    // Image industrielle — station de concassage
    new Paragraph({
      children: [
        new TextRun({
          text: '[Vue du site d\'extraction — Carrière de Siyimé, Haho, Togo]',
          size: 16,
          color: SILVER,
          font: 'Calibri',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'https://readdy.ai/api/search-image?query=industrial%20quarry%20crushing%20station%20gneiss%20granite%20extraction%20site%20heavy%20machinery%20professional%20aerial%20view%20blue%20grey%20tones%20West%20Africa%20mining%20operation%20high%20capacity%20stone%20crusher%20plant&width=800&height=300&seq=cornerstone-cover-1&orientation=landscape',
          size: 1,
          color: WHITE,
          font: 'Calibri',
        }),
      ],
      spacing: { before: 0, after: 0 },
    }),
    sp(1),
    stockBadge(),
    sp(1),
    // Pied de couverture
    new Paragraph({
      children: [
        new TextRun({
          text: 'Lomé, Nukafu — Boulevard Jean-Paul II  |  Togo, Afrique de l\'Ouest',
          size: 18,
          color: MINERAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

// ─── PAGE 2 : ÉQUATION RENTABILITÉ / QUALITÉ ─────────────────────────────────
function page2Quality(): Paragraph[] {
  return [
    sectionTitle('02 — L\'Équation Rentabilité / Qualité'),
    sp(),
    // Intro
    bodyText(
      'Dans le secteur du BTP, la qualité des granulats conditionne directement la durabilité des ouvrages et la maîtrise des coûts de construction. CORNERSTONE GROUP INTERNATIONAL S.A. vous offre la certitude d\'un matériau d\'excellence, extrait d\'un gisement géologiquement exceptionnel, à un coût optimisé grâce à notre proximité logistique unique.'
    ),
    sp(),
    // Certification LNBTP
    subTitle('Certification LNBTP — Résultats d\'Analyse'),
    bodyText(
      'Nos granulats Gneiss/Granite ont été soumis aux tests rigoureux du Laboratoire National du Bâtiment et des Travaux Publics (LNBTP). Les résultats confirment des performances mécaniques et physiques de premier ordre :'
    ),
    sp(),
    makeTable(
      ['Paramètre Testé', 'Résultat CORNERSTONE', 'Norme Requise', 'Évaluation'],
      [
        ['Masse volumique apparente', '2,63 g/cm³', '≥ 2,50 g/cm³', '✔ CONFORME — PREMIUM'],
        ['Coefficient d\'absorption d\'eau', '1,27 %', '≤ 2,50 %', '✔ CONFORME — EXCELLENT'],
        ['Résistance à la fragmentation (LA)', '< 25 %', '≤ 30 %', '✔ CONFORME — ROBUSTE'],
        ['Résistance à l\'usure (MDE)', '< 15 %', '≤ 20 %', '✔ CONFORME — DURABLE'],
        ['Propreté des granulats', '> 95 %', '≥ 90 %', '✔ CONFORME — PROPRE'],
      ],
      [35, 22, 22, 21]
    ),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '  ★  Masse volumique 2,63 g/cm³ : Parmi les plus élevées d\'Afrique de l\'Ouest — Garantie de béton haute résistance  ★  ',
          bold: true,
          size: 18,
          color: WHITE,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
    }),
    sp(),
    // Pourquoi nous ?
    subTitle('Pourquoi CORNERSTONE GROUP ? — 3 Avantages Décisifs'),
    sp(),
    makeTable(
      ['Avantage', 'Description', 'Impact ROI'],
      [
        [
          '🏔 Gisement Premium de Siyimé',
          'Roche mère Gneiss/Granite de haute densité, formation géologique stable, réserves estimées à plusieurs décennies d\'exploitation. Qualité constante et reproductible.',
          'Zéro risque de variabilité qualité — Béton conforme aux normes BCEAO/UEMOA'
        ],
        [
          '💰 Solidité Financière',
          'Capital social de 2,5 milliards FCFA. Capacité d\'investissement dans les équipements de pointe, garantie de continuité d\'approvisionnement, solvabilité pour les grands marchés.',
          'Partenaire fiable pour les marchés publics et privés de grande envergure'
        ],
        [
          '🌍 Expertise Locale & Réseau',
          'Implantation au cœur du Togo (Haho), maîtrise des circuits logistiques régionaux, relations établies avec les autorités et les donneurs d\'ordre BTP de la sous-région.',
          'Délais de livraison maîtrisés — Réactivité opérationnelle immédiate'
        ],
      ],
      [25, 45, 30]
    ),
    sp(),
    // Gamme de produits
    subTitle('Gamme de Granulats Disponibles'),
    sp(),
    makeTable(
      ['Calibre', 'Désignation', 'Applications Principales', 'Disponibilité'],
      [
        ['0/5', 'Sable de concassage', 'Mortiers, enduits, béton fin, remblais', '✔ Stock immédiat'],
        ['5/15', 'Gravillon fin', 'Béton armé standard, dallages, voiries légères', '✔ Stock immédiat'],
        ['5/25', 'Gravillon mixte', 'Béton armé polyvalent, fondations, dallages', '✔ Stock immédiat'],
        ['15/25', 'Gravillon gros', 'Béton de masse, ouvrages d\'art, fondations profondes', '✔ Stock immédiat'],
        ['0/31,5', 'Tout-venant concassé', 'Sous-couches routières, remblais techniques', '✔ Stock immédiat'],
        ['25/40', 'Enrochement', 'Protections de berges, ouvrages hydrauliques', '✔ Sur commande'],
      ],
      [12, 22, 42, 24]
    ),
    sp(),
    stockBadge(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── PAGE 3 : LOGISTIQUE STRATÉGIQUE ─────────────────────────────────────────
function page3Logistics(): Paragraph[] {
  return [
    sectionTitle('03 — Logistique Stratégique : Votre Levier de Closing'),
    sp(),
    bodyText(
      'Dans le BTP, le coût du transport représente en moyenne 25 à 40 % du prix final des granulats. Notre positionnement géographique au cœur du Togo fait de CORNERSTONE GROUP un partenaire logistique stratégique pour l\'ensemble de la sous-région Afrique de l\'Ouest.'
    ),
    sp(),
    // Triangle d'Or
    subTitle('Le Triangle d\'Or — Positionnement Géographique Unique'),
    sp(),
    // Schéma textuel du triangle logistique
    new Paragraph({
      children: [
        new TextRun({
          text: '  TRIANGLE LOGISTIQUE CORNERSTONE GROUP  ',
          bold: true,
          size: 22,
          color: WHITE,
          font: 'Calibri',
          allCaps: true,
        }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 0 },
    }),
    makeTable(
      ['Axe Logistique', 'Distance', 'Avantage Compétitif', 'Marchés Ciblés'],
      [
        [
          'Lomé → Siyimé (Haho)',
          '~120 km',
          'Approvisionnement fluide pour la capitale togolaise. Route nationale bitumée. Livraison J+1 garantie.',
          'Chantiers de Lomé, Région Maritime, Région des Plateaux'
        ],
        [
          'Siyimé → Frontière Bénin / Cotonou',
          '176 km',
          '⭐ AVANTAGE MAJEUR : Le chemin le plus court pour les chantiers transfrontaliers. Économie de 30 à 50 km vs concurrents.',
          'Cotonou, Porto-Novo, Abomey-Calavi, grands chantiers béninois'
        ],
        [
          'Siyimé → Lomé (Région Maritime)',
          '~120 km',
          'Desserte directe de la zone côtière la plus dense en projets BTP. Accès port de Lomé pour export.',
          'Région Maritime, Zone Franche, Port Autonome de Lomé'
        ],
        [
          'Siyimé → Région des Plateaux',
          '< 80 km',
          'Proximité immédiate des chantiers de la région des Plateaux. Coût transport minimal.',
          'Atakpamé, Kpalimé, Badou, projets ruraux et routiers'
        ],
      ],
      [28, 14, 35, 23]
    ),
    sp(),
    // Tableau comparatif gains transport
    subTitle('Tableau Comparatif — Gains sur les Coûts de Transport'),
    bodyText(
      'Simulation basée sur un approvisionnement de 1 000 tonnes de granulats 5/25 vers Cotonou (Bénin) :'
    ),
    sp(),
    makeTable(
      ['Fournisseur', 'Distance vers Cotonou', 'Coût Transport estimé/T', 'Coût total 1 000 T', 'Économie vs CORNERSTONE'],
      [
        ['CORNERSTONE GROUP (Siyimé)', '176 km', '3 500 FCFA/T', '3 500 000 FCFA', '— RÉFÉRENCE —'],
        ['Fournisseur concurrent A (Lomé)', '~230 km', '4 600 FCFA/T', '4 600 000 FCFA', '- 1 100 000 FCFA'],
        ['Fournisseur concurrent B (Ghana)', '~380 km', '7 200 FCFA/T', '7 200 000 FCFA', '- 3 700 000 FCFA'],
        ['Fournisseur concurrent C (Nigeria)', '> 500 km', '9 500 FCFA/T', '9 500 000 FCFA', '- 6 000 000 FCFA'],
      ],
      [28, 18, 18, 20, 16]
    ),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '  ⚡  176 km vers Cotonou : CORNERSTONE GROUP est le fournisseur le plus proche du marché béninois — Économie jusqu\'à 6 000 000 FCFA par commande de 1 000 T  ⚡  ',
          bold: true,
          size: 18,
          color: WHITE,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: STEEL, fill: STEEL },
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
    }),
    sp(),
    // Capacités logistiques
    subTitle('Capacités Logistiques & Opérationnelles'),
    sp(),
    makeTable(
      ['Indicateur', 'Performance CORNERSTONE'],
      [
        ['Capacité de production annuelle', '700 000 tonnes/an'],
        ['Capacité de chargement journalière', '~2 000 tonnes/jour'],
        ['Délai de livraison standard', '24 à 72 heures selon destination'],
        ['Taille minimale de commande', '50 tonnes (camion benne)'],
        ['Commandes express disponibles', 'Oui — sous 24h pour Lomé et région'],
        ['Stockage sur site', 'Stocks tampons permanents par calibre'],
        ['Pesage certifié', 'Pont-bascule homologué sur site'],
        ['Facturation', 'Bon de livraison + facture certifiée LNBTP'],
      ],
      [50, 50]
    ),
    sp(),
    stockBadge(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── PAGE 4 : OFFRE COMMERCIALE & CTA ────────────────────────────────────────
function page4Commercial(): Paragraph[] {
  return [
    sectionTitle('04 — Offre Commerciale & Passez à l\'Action'),
    sp(),
    bodyText(
      'CORNERSTONE GROUP INTERNATIONAL S.A. vous propose une offre commerciale structurée, transparente et orientée résultats. Notre objectif : vous permettre de démarrer votre approvisionnement en granulats premium dans les meilleurs délais, avec la certitude d\'un partenaire solide et réactif.'
    ),
    sp(),
    // Gamme tarifaire
    subTitle('Gamme Complète — Granulats Certifiés LNBTP'),
    sp(),
    makeTable(
      ['Calibre', 'Désignation', 'Usage BTP Principal', 'Conditionnement', 'Délai'],
      [
        ['0/5', 'Sable concassé', 'Mortiers, béton fin, enduits', 'Vrac / Big-bag', '24h'],
        ['5/15', 'Gravillon fin', 'Béton armé, dallages', 'Vrac camion', '24h'],
        ['5/25', 'Gravillon polyvalent', 'Béton armé, fondations, voiries', 'Vrac camion', '24h'],
        ['15/25', 'Gravillon gros', 'Béton de masse, ouvrages d\'art', 'Vrac camion', '24h'],
        ['0/31,5', 'Tout-venant', 'Sous-couches routières, remblais', 'Vrac camion', '24h'],
        ['25/40', 'Enrochement', 'Berges, hydraulique, gabions', 'Vrac camion', '48h'],
        ['Concassé sur spec.', 'Calibres spéciaux', 'Sur cahier des charges client', 'Sur devis', '72h'],
      ],
      [12, 20, 30, 18, 10, 10]
    ),
    sp(),
    // Offre de test
    subTitle('⭐ Offre de Test de Livraison — Prouvons Notre Réactivité'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '  OFFRE DÉCOUVERTE — 500 À 1 000 TONNES  ',
          bold: true,
          size: 24,
          color: WHITE,
          font: 'Calibri',
          allCaps: true,
        }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 0 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 3, color: GOLD_ACCENT },
        left: { style: BorderStyle.SINGLE, size: 3, color: GOLD_ACCENT },
        right: { style: BorderStyle.SINGLE, size: 3, color: GOLD_ACCENT },
      },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Commandez entre 500 et 1 000 tonnes pour tester notre qualité, nos délais et notre service.',
          size: 20,
          color: DARK_TEXT,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: STEEL_LIGHT, fill: STEEL_LIGHT },
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
      border: {
        left: { style: BorderStyle.SINGLE, size: 3, color: GOLD_ACCENT },
        right: { style: BorderStyle.SINGLE, size: 3, color: GOLD_ACCENT },
      },
    }),
    makeTable(
      ['Ce que vous obtenez', 'Notre engagement'],
      [
        ['Granulats certifiés LNBTP', 'Certificat d\'analyse fourni avec chaque livraison'],
        ['Livraison sur votre chantier', 'Délai garanti contractuellement'],
        ['Pesage certifié', 'Bon de pesée homologué — zéro litige'],
        ['Accompagnement technique', 'Conseiller dédié pour le choix des calibres'],
        ['Tarif préférentiel test', 'Conditions commerciales avantageuses pour 1ère commande'],
      ],
      [50, 50]
    ),
    sp(),
    // Processus de commande
    subTitle('Processus de Commande — Simple & Rapide'),
    sp(),
    makeTable(
      ['Étape', 'Action', 'Délai'],
      [
        ['1', 'Contactez-nous — Précisez calibre, volume, destination', 'Immédiat'],
        ['2', 'Réception de votre devis personnalisé', '< 4 heures'],
        ['3', 'Validation commande + bon de commande', 'Votre délai'],
        ['4', 'Chargement sur site Siyimé', 'J+1 à J+2'],
        ['5', 'Livraison sur chantier + bon de pesée + certificat', 'Selon distance'],
      ],
      [8, 60, 32]
    ),
    sp(),
    // Contact
    subTitle('Contactez-Nous — Votre Devis en 4 Heures'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '  CORNERSTONE GROUP INTERNATIONAL S.A.  ',
          bold: true,
          size: 22,
          color: WHITE,
          font: 'Calibri',
          allCaps: true,
        }),
      ],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 0 },
    }),
    makeTable(
      ['Siège Social', 'Site d\'Exploitation', 'Contact Commercial'],
      [
        [
          'Lomé, Nukafu\nBoulevard Jean-Paul II\nTogo, Afrique de l\'Ouest',
          'Carrière de Siyimé\nDistrict du Haho\nRégion des Plateaux — Togo',
          'Demande de devis :\ncontact@cornerstonegroup.tg\n+228 XX XX XX XX'
        ],
      ],
      [33, 34, 33]
    ),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '  ➤  Demandez votre devis personnalisé dès aujourd\'hui — Réponse garantie sous 4 heures ouvrées  ➤  ',
          bold: true,
          size: 20,
          color: WHITE,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: STEEL, fill: STEEL },
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 80 },
    }),
    sp(),
    stockBadge(),
  ];
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateCornerstoneProspectus(): Promise<Blob> {
  const doc = new Document({
    creator: 'CORNERSTONE GROUP INTERNATIONAL S.A.',
    title: 'Prospectus Commercial — Granulats Premium Gneiss/Granite — Afrique de l\'Ouest',
    description: 'Prospectus commercial B2B — Concassage et fourniture de granulats certifiés LNBTP — Gisement Siyimé, Haho, Togo',
    subject: 'Granulats BTP — Gneiss/Granite — Togo — Bénin — Afrique de l\'Ouest',
    keywords: 'granulats, concassage, gneiss, granite, LNBTP, BTP, Togo, Bénin, Cotonou, Lomé, Siyimé',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              right: convertInchesToTwip(0.9),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.9),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'CORNERSTONE GROUP INTERNATIONAL S.A.  |  Granulats Premium Gneiss/Granite  |  Gisement Siyimé, Haho — Togo',
                    size: 15,
                    color: SILVER,
                    font: 'Calibri',
                  }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: NAVY_MID } },
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
                  new TextRun({
                    text: 'STOCK DISPONIBLE IMMÉDIATEMENT — CAPACITÉ 700 000 T/AN  |  Lomé, Nukafu, Blvd Jean-Paul II  |  Page ',
                    size: 15,
                    color: SILVER,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 15,
                    color: STEEL,
                    font: 'Calibri',
                    bold: true,
                  }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 2, color: NAVY_MID } },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          ...page1Cover(),
          ...page2Quality(),
          ...page3Logistics(),
          ...page4Commercial(),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
