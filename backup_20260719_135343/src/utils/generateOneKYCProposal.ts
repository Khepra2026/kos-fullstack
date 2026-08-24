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

// ─── Couleurs KHEPRA ───────────────────────────────────────────────────────────
const TEAL = '0D7377';
const TEAL_LIGHT = 'E6F4F4';
const DARK = '1A2332';
const GRAY = '6B7280';
const LIGHT_GRAY = 'F8FAFC';
const WHITE = 'FFFFFF';
const GOLD = 'B8860B';
const RED = 'DC2626';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function heading1(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28,
        color: WHITE,
        font: 'Calibri',
      }),
    ],
    shading: { type: ShadingType.SOLID, color: TEAL, fill: TEAL },
    spacing: { before: 400, after: 200 },
    indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
  });
}

function heading2(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: TEAL,
        font: 'Calibri',
      }),
    ],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
    },
    spacing: { before: 360, after: 160 },
  });
}

function heading3(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: DARK,
        font: 'Calibri',
      }),
    ],
    spacing: { before: 280, after: 120 },
  });
}

function body(text: string, options?: { bold?: boolean; italic?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: 'Calibri',
        bold: options?.bold,
        italics: options?.italic,
        color: options?.color || DARK,
      }),
    ],
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bullet(text: string, level = 0): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: 'Calibri',
        color: DARK,
      }),
    ],
    bullet: { level },
    spacing: { before: 60, after: 60 },
  });
}

function spacer(lines = 1): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 20 })],
    spacing: { before: 0, after: lines * 120 },
  });
}

function noteBox(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: `⚠ ${text}`,
        size: 18,
        font: 'Calibri',
        italics: true,
        color: GOLD,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: 'FFF8E1', fill: 'FFF8E1' },
    border: {
      left: { style: BorderStyle.SINGLE, size: 6, color: GOLD },
    },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function infoBox(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 18,
        font: 'Calibri',
        italics: true,
        color: TEAL,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: TEAL_LIGHT, fill: TEAL_LIGHT },
    border: {
      left: { style: BorderStyle.SINGLE, size: 6, color: TEAL },
    },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

function makeTable(headers: string[], rows: string[][], headerColor = TEAL): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h =>
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { type: ShadingType.SOLID, color: headerColor, fill: headerColor },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
      })
    ),
  });

  const dataRows = rows.map((row, ri) =>
    new TableRow({
      children: row.map(cell =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK })],
              alignment: AlignmentType.LEFT,
            }),
          ],
          shading: {
            type: ShadingType.SOLID,
            color: ri % 2 === 0 ? WHITE : LIGHT_GRAY,
            fill: ri % 2 === 0 ? WHITE : LIGHT_GRAY,
          },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })
      ),
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' },
    },
  });
}

// ─── PAGE DE GARDE ─────────────────────────────────────────────────────────────
function coverPage(): Paragraph[] {
  return [
    spacer(2),
    new Paragraph({
      children: [
        new TextRun({
          text: 'KHEPRA EXPERTS',
          bold: true,
          size: 52,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Cabinet de Conseil Stratégique, Réglementaire et Juridique — Spécialiste Afrique Francophone',
          size: 22,
          color: GRAY,
          font: 'Calibri',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 600 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '─────────────────────────────────────────────',
          color: TEAL,
          size: 20,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'OFFRE TECHNIQUE ET FINANCIÈRE',
          bold: true,
          size: 40,
          color: DARK,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Accompagnement Réglementaire, Juridique et de Conformité',
          bold: true,
          size: 26,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'OneKYC — Solutions de Vérification d\'Identité Numérique, KYC/KYB, UBO, AML/CFT & Conformité',
          size: 24,
          color: GRAY,
          font: 'Calibri',
          bold: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 600 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '─────────────────────────────────────────────',
          color: TEAL,
          size: 20,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Référence : ', bold: true, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: 'KE-ONEKYC-2026-001-R', size: 20, font: 'Calibri', color: TEAL }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Date : ', bold: true, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }), size: 20, font: 'Calibri', color: GRAY }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Validité : ', bold: true, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: '90 jours à compter de la date d\'émission', size: 20, font: 'Calibri', color: GRAY }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Statut : ', bold: true, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: 'CONFIDENTIEL — VERSION RÉVISÉE', bold: true, size: 20, font: 'Calibri', color: RED }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 600 },
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

// ─── SOMMAIRE ─────────────────────────────────────────────────────────────────
function tableOfContents(): Paragraph[] {
  const items = [
    { num: '1.', title: 'Lettre de couverture exécutive', page: '3' },
    { num: '2.', title: 'Compréhension du contexte et des enjeux', page: '4' },
    { num: '3.', title: 'Diagnostic réglementaire initial', page: '6' },
    { num: '4.', title: 'Mission proposée — Six phases structurées', page: '8' },
    { num: '5.', title: 'Approche méthodologique', page: '14' },
    { num: '6.', title: 'Planning prévisionnel', page: '15' },
    { num: '7.', title: 'Coûts externes potentiels', page: '16' },
    { num: '8.', title: 'Proposition financière', page: '17' },
    { num: '9.', title: 'Équipe proposée', page: '19' },
    { num: '10.', title: 'Conclusion', page: '20' },
    { num: '11.', title: 'Rapport de Gap Analysis — Audit interne', page: '21' },
  ];

  return [
    heading1('SOMMAIRE'),
    spacer(1),
    ...items.map(item =>
      new Paragraph({
        children: [
          new TextRun({ text: `${item.num}  `, bold: true, size: 20, font: 'Calibri', color: TEAL }),
          new TextRun({ text: item.title, size: 20, font: 'Calibri', color: DARK }),
          new TextRun({ text: `  ....  ${item.page}`, size: 20, font: 'Calibri', color: GRAY }),
        ],
        spacing: { before: 100, after: 100 },
        border: {
          bottom: { style: BorderStyle.DOTTED, size: 1, color: 'E5E7EB' },
        },
      })
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 1 : LETTRE DE COUVERTURE ─────────────────────────────────────
function section1(): Paragraph[] {
  return [
    heading1('1. LETTRE DE COUVERTURE EXÉCUTIVE'),
    spacer(),
    body(
      'Madame, Monsieur,'
    ),
    spacer(),
    body(
      'KHEPRA EXPERTS est un cabinet de conseil stratégique, réglementaire et juridique, spécialisé dans l\'accompagnement des institutions financières, des fintechs et des entreprises technologiques opérant en Afrique francophone. Notre expertise couvre l\'ensemble des dimensions critiques de la réglementation financière, de la protection des données personnelles, de la conformité bancaire, de la gouvernance numérique et de la structuration transfrontalière sous OHADA, UEMOA et CEMAC.'
    ),
    spacer(),
    body(
      'Nous avons pris connaissance de l\'ambition de OneKYC : devenir un prestataire de solutions techniques de pointe pour les entités juridiques locales agissant en tant qu\'opérateurs de données personnelles, dans un cadre de vérification d\'identité numérique, de KYC/KYB, de traçabilité des bénéficiaires effectifs (UBO), et de conformité AML/CFT. Ce projet, par sa nature et sa portée, se situe à l\'intersection de plusieurs domaines de haute intensité réglementaire :'
    ),
    bullet('La régulation financière et la conformité bancaire (BCEAO, COBAC, GIABA, GABAC) ;'),
    bullet('La protection des données personnelles et la souveraineté numérique ;'),
    bullet('La fintech, le RegTech et la gouvernance numérique des systèmes critiques ;'),
    bullet('La cybersécurité réglementaire et la résilience opérationnelle ;'),
    bullet('La structuration juridique sous OHADA et les conformités UEMOA / CEMAC.'),
    spacer(),
    body(
      'Nous comprenons parfaitement les enjeux qui sous-tendent ce projet. OneKYC ne se contente pas de fournir une technologie : elle propose une infrastructure de confiance numérique, un pilier structurant de l\'écosystème financier et réglementaire africain. La qualité de cette infrastructure dépendra directement de la solidité du cadre juridique, réglementaire et de gouvernance dans lequel elle s\'insère.',
      { italic: true }
    ),
    spacer(),
    body(
      'C\'est précisément là que réside notre valeur ajoutée. KHEPRA EXPERTS ne se contente pas de rédiger des documents. Nous concevons des architectures réglementaires, nous structurons des cadres de conformité, et nous accompagnons nos clients jusqu\'à la validation opérationnelle de leur modèle par les autorités compétentes. Notre approche intégrée — juridique, réglementaire, technique et stratégique — garantit que chaque livrable produit sera non seulement conforme, mais aussi opérationnel, testé et résilient.',
      { italic: true }
    ),
    spacer(),
    body(
      'Nous nous tenons à votre entière disposition pour approfondir tout point de cette offre et pour adapter notre proposition aux spécificités de votre calendrier stratégique.'
    ),
    spacer(),
    body(
      'Veuillez agréer, Madame, Monsieur, l\'expression de notre considération distinguée.',
      { italic: true }
    ),
    spacer(2),
    body(
      'SIMDA Essoyomèwè\nAssocié — KHEPRA EXPERTS',
      { bold: true }
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 2 : CONTEXTE ET ENJEUX ─────────────────────────────────────────
function section2(): Paragraph[] {
  return [
    heading1('2. COMPRÉHENSION DU CONTEXTE ET DES ENJEUX'),
    spacer(),
    heading2('2.1 Présentation de OneKYC'),
    spacer(),
    body(
      'OneKYC est une société spécialisée dans le développement de solutions de vérification d\'identité numérique (Digital Identity Verification), de conformité KYC (Know Your Customer), KYB (Know Your Business), de traçabilité des bénéficiaires effectifs (UBO — Ultimate Beneficial Owner), et de screening des sanctions et des listes de personnes politiquement exposées (PEP). Son offre s\'adresse aux institutions financières, aux fintechs, aux entreprises et aux autorités publiques souhaitant sécuriser leurs processus d\'onboarding et de due diligence.'
    ),
    spacer(),
    body(
      'OneKYC se positionne comme une infrastructure de conformité numérique (Compliance-as-a-Service), offrant une couche technologique critique qui s\'interpose entre les institutions utilisatrices et les données sensibles de leurs clients. Ce positionnement implique une responsabilité élevée, notamment au regard des obligations de conformité anti-blanchiment (AML/CFT), de protection des données personnelles, et de résilience opérationnelle.'
    ),
    spacer(),
    heading2('2.2 Enjeux stratégiques et réglementaires'),
    spacer(),
    body(
      'Le projet de OneKYC comporte des enjeux multidimensionnels qui dépassent le simple cadre technologique :'
    ),
    spacer(),
    heading3('A. Enjeux KYC / KYB / AML / CFT'),
    bullet('OneKYC traite des données d\'identité et de conformité pour le compte d\'institutions assujetties (banques, EMF, SFD, assurances, fintechs) ;'),
    bullet('Cette activité la place sous le champ d\'application des directives AML/CFT régionales (GIABA, GABAC, UMOA) et nationales ;'),
    bullet('Les superviseurs régionaux (BCEAO, COBAC) et les cellules nationale de renseignement financier (CENTIF, CRF, etc.) exigent une traçabilité complète des flux de données et des décisions de conformité ;'),
    bullet('Le screening des sanctions (OFAC, ONU, UE) et l\'identification des PEP sont des obligations réglementaires dont l\'externalisation vers un prestataire technique doit être encadrée contractuellement et réglementairement.'),
    spacer(),
    heading3('B. Enjeux de traitement de données personnelles'),
    bullet('OneKYC collecte, traite et potentiellement conserve des données biométriques, des données d\'identité et des données financières sensibles ;'),
    bullet('Son activité relève donc de la qualification d\'« opérateur de données personnelles » au sens des lois nationales de protection des données (APDP, CNIL, CNDP) et des cadres régionaux (UEMOA, CEMAC) ;'),
    bullet('L\'hébergement des données, leur localisation géographique et les conditions de transfert transfrontalier constituent des points critiques de conformité ;'),
    bullet('Les données biométriques, par leur nature sensible, sont soumises à un régime de protection renforcée dans la plupart des juridictions africaines.'),
    spacer(),
    heading3('C. Enjeux de cybersécurité et résilience opérationnelle'),
    bullet('En tant que fournisseur de services critiques, OneKYC doit démontrer une conformité aux standards de cybersécurité applicables aux institutions financières (ISO 27001, SOC 2, etc.) ;'),
    bullet('Les autorités de régulation bancaire (BCEAO, COBAC) et de cybersécurité exigent des audits périodiques et des certifications de sécurité pour les prestataires tiers traitant des données clients ;'),
    bullet('La continuité d\'activité et les plans de reprise après sinistre (PCA/PRA) sont des obligations contractuelles imposées par les institutions financières à leurs sous-traitants.'),
    spacer(),
    heading3('D. Enjeux transfrontaliers et souveraineté numérique'),
    bullet('Le projet de OneKYC vise potentiellement plusieurs pays de l\'UEMOA et de la CEMAC ;'),
    bullet('Chaque pays dispose d\'un cadre national de protection des données, parfois distinct, avec des exigences d\'enregistrement, de déclaration ou d\'autorisation préalable ;'),
    bullet('Les transferts de données entre pays africains, et notamment vers des pays tiers, sont soumis à des restrictions croissantes en matière de souveraineté numérique.'),
    spacer(),
    heading2('2.3 Principales autorités réglementaires concernées'),
    spacer(),
    makeTable(
      ['Autorité', 'Rôle', 'Relevance pour OneKYC'],
      [
        ['BCEAO', 'Banque Centrale des États de l\'Afrique de l\'Ouest — Régulation bancaire, supervision des SFD, normes prudentielles, directives AML/CFT régionales', 'Critique — si clients SFD / banques UEMOA'],
        ['COBAC', 'Commission Bancaire de l\'Afrique Centrale — Supervision prudentielle CEMAC, agréments, normes de conformité, directives sur les services numériques', 'Critique — si clients EMF / banques CEMAC'],
        ['GIABA', 'Groupe d\'Action Financière de l\'Afrique de l\'Ouest — Évaluation des systèmes AML/CFT, 40 recommandations du GAFI, mutual evaluation reports', 'Critique — conformité AML/CFT UEMOA'],
        ['GABAC', 'Groupe d\'Action Contre le Blanchiment d\'Argent en Afrique Centrale — Équivalent GIABA pour la zone CEMAC', 'Critique — conformité AML/CFT CEMAC'],
        ['Autorités nationales de protection des données', 'APDP (Togo), CNDP (Côte d\'Ivoire), CNIL (Sénégal, Bénin), etc. — Enregistrement, déclaration, autorisation des traitements, inspections', 'Critique — qualité d\'opérateur de données'],
        ['Autorités de cybersécurité nationales', 'Agences nationales de cybersécurité (ANSSI, CERT, etc.) — Audits, certifications, notification des incidents', 'Élevée — si opérateur de données sensibles'],
        ['Autorités de télécommunications', 'ARCEP, ART, etc. — Si intégration avec opérateurs télécoms (Mobile Money, USSD, APIs)', 'Moyenne — selon modèle de distribution'],
      ]
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 3 : DIAGNOSTIC RÉGLEMENTAIRE ───────────────────────────────────
function section3(): Paragraph[] {
  return [
    heading1('3. DIAGNOSTIC RÉGLEMENTAIRE INITIAL'),
    spacer(),
    body(
      'Avant d\'engager toute structuration juridique ou opérationnelle, il est impératif de qualifier avec précision la nature juridique de l\'activité de OneKYC et de cartographier l\'ensemble des obligations applicables. Le diagnostic initial ci-après a été structuré selon une approche de type « Big Four », combinant analyse juridique, réglementaire et technique.'
    ),
    spacer(),
    heading2('3.1 Qualification juridique de l\'activité'),
    spacer(),
    body(
      'L\'activité de OneKYC relève de plusieurs qualifications juridiques simultanées, qui doivent toutes être maîtrisées. Nous analysons ci-après cinq hypothèses de qualification, leur défendabilité, et les obligations correspondantes.'
    ),
    spacer(),
    heading3('A. Hypothèse 1 — Fournisseur de services SaaS'),
    bullet('OneKYC propose une solution technologique hébergée, accessible via API ou interface web, pour le compte de ses clients ;'),
    bullet('Cette qualification impose un cadre contractuel de conditions générales (CGS), de service level agreements (SLA), et de responsabilité des prestataires de services numériques ;'),
    bullet('Les CGS doivent inclure des clauses de limitation de responsabilité, de conformité réglementaire, et d\'auditabilité par les superviseurs des clients.'),
    spacer(),
    heading3('B. Hypothèse 2 — Sous-traitant de données personnelles'),
    bullet('OneKYC traite des données personnelles pour le compte de ses clients institutionnels (banques, EMF, assurances) ;'),
    bullet('Si les finalités et les moyens sont déterminés exclusivement par le client, OneKYC est qualifiée de « sous-traitant » (processor) au sens des lois nationales de protection des données ;'),
    bullet('Si OneKYC détermine seule les finalités et les moyens du traitement (par exemple en stockant des données en propre pour les réutiliser), elle pourrait être qualifiée de « responsable » (controller), avec des obligations substantiellement plus lourdes.'),
    noteBox('Information non vérifiée – validation locale requise : la qualification exacte dépend de la répartition des rôles contractuels et de l\'analyse des flux réels. Une validation par une autorité de protection des données compétente est recommandée.'),
    spacer(),
    heading3('C. Hypothèse 3 — Prestataire critique externalisé'),
    bullet('Conformément aux exigences BCEAO et COBAC, les institutions financières doivent encadrer l\'externalisation des fonctions critiques ;'),
    bullet('OneKYC, en tant que fournisseur de KYC/KYB, est susceptible d\'être qualifiée de « prestataire critique » par les superviseurs bancaires de ses clients ;'),
    bullet('Cette qualification impose des obligations d\'auditabilité, de continuité d\'activité, et de réversibilité des données.'),
    noteBox('Information non vérifiée – validation locale requise : la qualification de « prestataire critique » relève de l\'appréciation du superviseur de l\'institution cliente. Il n\'existe pas de liste exhaustive des prestataires critiques.'),
    spacer(),
    heading3('D. Hypothèse 4 — Opérateur participant à la chaîne de conformité'),
    bullet('OneKYC fournit des données et des décisions de conformité intégrées dans les processus AML/CFT de ses clients ;'),
    bullet('Cette participation à la chaîne de conformité impose une traçabilité complète des décisions et des flux de données ;'),
    bullet('Les superviseurs AML (GIABA, GABAC) peuvent exiger une documentation des processus de screening et de vigilance.'),
    spacer(),
    heading3('E. Hypothèse 5 — Prestataire de confiance numérique'),
    bullet('Dans certaines juridictions, la vérification d\'identité numérique et la certification KYC peuvent relever de la qualification de « prestataire de services de confiance numérique » ;'),
    bullet('Cette qualification, lorsqu\'elle existe, impose des obligations de certification, d\'audit et de conformité technique supplémentaires.'),
    noteBox('Information non vérifiée – validation locale requise : le cadre juridique des prestataires de confiance numérique n\'est pas uniformément défini en Afrique francophone. Des textes existent au niveau de l\'OHADA (projet d\'Acte uniforme sur le commerce électronique) mais leur application pratique reste limitée.'),
    spacer(),
    heading2('3.2 Matrice de qualification réglementaire'),
    spacer(),
    body(
      'Le tableau ci-dessous synthétise les cinq hypothèses de qualification, leur défendabilité juridique, les risques associés, et les obligations correspondantes.'
    ),
    spacer(),
    makeTable(
      ['Hypothèse', 'Défendabilité', 'Risque', 'Obligations clés'],
      [
        ['1. SaaS', 'FORTE', 'Faible', 'CGS, SLA, responsabilité civile, conformité générale'],
        ['2. Sous-traitant / Co-responsable', 'FORTE', 'Moyen à élevé', 'Registre, DPA, politique de confidentialité, notification incidents'],
        ['3. Prestataire critique', 'MOYENNE', 'Élevé', 'Auditabilité, continuité, réversibilité, conformité bancaire'],
        ['4. Opérateur conformité', 'FORTE', 'Moyen', 'Traçabilité AML, documentation, procédures LCB/FT'],
        ['5. Confiance numérique', 'FAIBLE', 'Élevé', 'Certification, audit technique, conformité spécifique'],
      ]
    ),
    spacer(),
    infoBox('Recommandation : la qualification juridiquement la plus défendable est celle de « Sous-traitant de données personnelles / Prestataire SaaS » (Hypothèses 1 et 2), sous réserve de contractualiser rigoureusement les rôles et responsabilités. La qualification de « Prestataire critique » (Hypothèse 3) est un risque à gérer activement avec les clients institutionnels et leurs superviseurs.'),
    spacer(),
    heading2('3.3 Implications liées à l\'externalisation bancaire'),
    spacer(),
    body(
      'Les institutions financières qui souscrivent aux services de OneKYC doivent, conformément aux exigences prudentielles des superviseurs régionaux, gérer l\'externalisation de fonctions critiques. Les implications pour OneKYC sont les suivantes :'
    ),
    bullet('Les textes BCEAO (Instruction BCEAO relative à la gestion des risques opérationnels et à l\'externalisation) et les textes COBAC imposent que toute externalisation de fonction critique fasse l\'objet d\'un contrat d\'externalisation rigoureusement encadré ;'),
    bullet('Ce contrat doit prévoir l\'auditabilité du prestataire par le superviseur de l\'institution client ;'),
    bullet('OneKYC doit être en mesure de fournir à ses clients institutionnels l\'ensemble des documents requis pour justifier de sa fiabilité : politiques de sécurité, certificats, audits, politique LCB/FT, etc. ;'),
    bullet('Le contrat d\'externalisation doit inclure des clauses de sortie (exit clauses), de reversibilité des données, et de continuité d\'activité.'),
    noteBox('Information non vérifiée – validation locale requise : les textes BCEAO et COBAC sur l\'externalisation sont en constante évolution. La dernière version applicable doit être vérifiée auprès des superviseurs concernés avant contractualisation.'),
    spacer(),
    heading2('3.4 Obligations de cybersécurité'),
    spacer(),
    body(
      'Les exigences de cybersécurité applicables à OneKYC découlent de plusieurs sources :'
    ),
    bullet('Exigences prudentielles des superviseurs bancaires (BCEAO, COBAC) sur la gestion des risques IT et la cybersécurité ;'),
    bullet('Directives nationales des autorités de cybersécurité (ANSSI, CERT) sur la protection des données sensibles et des infrastructures critiques ;'),
    bullet('Pratiques de marché attendues par les clients institutionnels : ISO 27001 (Système de Management de la Sécurité de l\'Information), ISO 27017 (cloud security), ISO 27018 (protection des données dans le cloud), SOC 2 Type II. Ces certifications ne sont pas obligatoires par la loi mais sont devenues des prérequis commerciaux pour les sous-traitants bancaires ;'),
    bullet('Obligations de notification des incidents de sécurité dans les délais réglementaires. Ces délais varient selon les juridictions : 48 heures au Bénin, 72 heures au Sénégal, délai raisonnable selon d\'autres pays. Il convient de vérifier le texte applicable dans chaque pays cible ;'),
    bullet('Exigences de chiffrement des données (en transit et au repos), d\'authentification forte, et de gestion des accès.'),
    noteBox('Pratique de marché — non obligatoire légalement : les certifications ISO 27001 et SOC 2 ne sont pas imposées par un texte de loi africain. Cependant, les superviseurs bancaires et les clients institutionnels les exigent de facto. L\'absence de certification constitue un risque commercial critique.'),
    spacer(),
    heading2('3.5 Obligations relatives à l\'hébergement des données'),
    spacer(),
    body(
      'L\'hébergement des données traitées par OneKYC constitue un point de vigilance majeur :'
    ),
    bullet('Les lois nationales de protection des données et les cadres régionaux UEMOA/CEMAC encadrent de plus en plus strictement la localisation des données. Une tendance à la souveraineté numérique se dessine, mais les obligations varient considérablement d\'un pays à l\'autre ;'),
    bullet('Au Bénin, la loi n°2019-22 du 28 novembre 2019 sur la protection des données à caractère personnel impose explicitement que les données collectées sur le territoire béninois soient hébergées dans des centres de données situés au Bénin (art. 45). Cette obligation est une exception dans la zone. Les autres pays de l\'UEMOA et de la CEMAC n\'ont pas, à notre connaissance, d\'obligation de localisation aussi stricte à ce jour ;'),
    bullet('Les données biométriques sont souvent soumises à des restrictions de localisation renforcées, parfois avec interdiction d\'hébergement hors du territoire national. Cependant, cette restriction n\'est pas uniforme : elle dépend du texte applicable dans chaque pays et de la qualification du traitement ;'),
    bullet('L\'hébergement cloud doit être documenté : localisation des datacenters, certifications du fournisseur cloud, sous-traitance éventuelle, garanties de confidentialité ;'),
    bullet('Les clauses de transfert international de données doivent être encadrées par des mécanismes de garantie contractuels. Les clauses contractuelles types (SCC) de la Commission européenne sont fréquemment utilisées comme référence, mais elles ne constituent pas un cadre juridique africain. Des mécanismes locaux ou régionaux doivent être privilégiés lorsqu\'ils existent.'),
    noteBox('Information non vérifiée – validation locale requise : l\'obligation de localisation des données doit être vérifiée pays par pays, texte par texte. Les évolutions récentes (2023-2025) peuvent avoir introduit de nouvelles obligations. Un avis juridique local est indispensable pour chaque pays cible.'),
    spacer(),
    heading2('3.6 Exigences relatives aux données biométriques'),
    spacer(),
    body(
      'Les données biométriques (empreintes digitales, reconnaissance faciale, scan rétinien, etc.) sont classées dans la catégorie des données sensibles ou spéciales dans la quasi-totalité des juridictions africaines. Leur traitement est soumis à un régime renforcé, mais les modalités varient :'
    ),
    bullet('Au Bénin, le traitement des données biométriques est soumis à une autorisation préalable de l\'Autorité de Protection des Données Personnelles (APDP) ;'),
    bullet('Au Sénégal, les données biométriques relèvent d\'une déclaration renforcée auprès de la Commission de Protection des Données Personnelles (CDP), et non d\'une autorisation préalable systématique ;'),
    bullet('Obligation de mise en place de mesures de sécurité renforcées (chiffrement, segmentation, contrôle d\'accès strict) — recommandation forte, déclinable en obligation selon les textes ;'),
    bullet('Obligation de conservation limitée à la durée strictement nécessaire à la finalité du traitement — recommandation générale applicable ;'),
    bullet('Nécessité d\'obtenir un consentement explicite, éclairé et documenté des personnes concernées — pratique de marché et recommandation du GAFI ;'),
    bullet('Restrictions fréquentes de transfert transfrontalier de données biométriques. Ces restrictions ne sont pas uniformes : certaines juridictions exigent une autorisation expresse, d\'autres une déclaration renforcée, d\'autres ne prévoient pas de dispositif spécifique.'),
    noteBox('Information non vérifiée – validation locale requise : le régime applicable aux données biométriques varie significativement selon les pays. Un tableau récapitulatif juridiction par juridiction est fourni en annexe. Ce tableau doit être validé par des avis juridiques locaux avant toute mise en œuvre.'),
    spacer(),
    heading2('3.7 Contraintes liées aux transferts internationaux de données'),
    spacer(),
    body(
      'Les transferts de données personnelles hors du territoire national ou régional sont soumis à un cadre restrictif :'
    ),
    bullet('Autorisation préalable ou déclaration renforcée de l\'autorité nationale de protection des données — selon les juridictions ;'),
    bullet('Nécessité de démontrer que le pays destinataire offre un niveau de protection « adéquat » — concept présent dans certaines lois mais rarement opérationnel en l\'absence de décisions d\'adéquation ;'),
    bullet('En l\'absence d\'adéquation, mise en place de mécanismes de garantie contractuelle. Les clauses contractuelles types (SCC) de la Commission européenne sont fréquemment utilisées comme référence par les praticiens, mais elles ne constituent pas un mécanisme juridique africain. Des mécanismes locaux ou régionaux doivent être privilégiés lorsqu\'ils existent ;'),
    bullet('Les Binding Corporate Rules (BCR) sont un mécanisme européen qui n\'a pas de transposition automatique dans les cadres africains de protection des données. Leur usage relève de la pratique de marché et non d\'une obligation réglementaire locale ;'),
    bullet('Obligation d\'informer les personnes concernées du transfert et des garanties mises en place — pratique de marché recommandée ;'),
    bullet('Documentation du transfert dans le registre de traitement et la politique de confidentialité.'),
    noteBox('Distinguer : Exigence réglementaire certaine (déclaration/autorisation) vs Pratique de marché (SCC, BCR) vs Recommandation (informer les personnes concernées). Les SCC et BCR sont des mécanismes européens utilisés comme référence mais ne constituent pas un cadre juridique africain obligatoire.'),
    spacer(),
    heading2('3.8 Matrice des risques réglementaires'),
    spacer(),
    body(
      'La matrice ci-dessous synthétise les principaux risques réglementaires identifiés, leur niveau de criticité et les mesures de mitigation recommandées :'
    ),
    spacer(),
    makeTable(
      ['Risque réglementaire', 'Niveau', 'Description', 'Mitigation'],
      [
        ['Qualification juridique incorrecte', 'CRITIQUE', 'Qualification en tant que responsable vs sous-traitant mal déterminée, avec impact sur l\'ensemble des obligations', 'Mémorandum juridique de qualification + validation par autorité compétente'],
        ['Non-conformité protection des données', 'CRITIQUE', 'Absence de registre, de DPA, de politique de confidentialité, ou déclaration manquante', 'Mise en place complète du cadre RGPD-inspiré + conformité locale'],
        ['Non-conformité AML/CFT', 'CRITIQUE', 'Absence de politique LBC/FT, de screening PEP/sanctions, ou de traçabilité des décisions', 'Manuel de conformité AML/CFT + intégration réglementaire'],
        ['Cybersécurité insuffisante', 'ÉLEVÉ', 'Absence de certification ISO 27001, de politique de sécurité, ou de plan de continuité', 'Audit cybersécurité + certification + PCA/PRA'],
        ['Hébergement non conforme', 'ÉLEVÉ', 'Hébergement des données hors zone autorisée, ou absence de documentation', 'Cartographie des hébergements + migration si nécessaire + clauses contractuelles'],
        ['Transferts transfrontaliers non encadrés', 'ÉLEVÉ', 'Transferts de données sans autorisation ou sans garanties contractuelles', 'Autorisation des autorités + mécanismes contractuels + documentation'],
        ['Contrats d\'externalisation bancaire incomplets', 'MOYEN', 'Absence de clauses d\'auditabilité, de reversibilité, ou de continuité', 'Rédaction de contrats-type conformes BCEAO/COBAC'],
        ['Données biométriques sans autorisation', 'ÉLEVÉ', 'Traitement de données biométriques sans autorisation préalable ou mesures renforcées', 'Demande d\'autorisation/déclaration + mesures de sécurité renforcées + politique de rétention'],
      ]
    ),
    spacer(),
    heading2('3.9 Tableau récapitulatif des textes applicables par pays — Protection des données'),
    spacer(),
    body(
      'Le tableau ci-dessous présente les principaux textes applicables en matière de protection des données personnelles dans les pays cibles potentiels de OneKYC. Ce tableau est fourni à titre indicatif et doit être validé par des avis juridiques locaux.'
    ),
    spacer(),
    makeTable(
      ['Pays', 'Texte applicable', 'Autorité compétente', 'Statut', 'Applicabilité à OneKYC'],
      [
        ['Togo', 'Loi n°2019-014 du 25 novembre 2019 relative à la protection des données à caractère personnel', 'Autorité de Protection des Données Personnelles (APDP)', 'En vigueur', 'Critique — si traitement de données de résidents togolais'],
        ['Bénin', 'Loi n°2019-22 du 28 novembre 2019 sur la protection des données à caractère personnel', 'APDP Bénin', 'En vigueur', 'Critique — obligation de localisation explicite (art. 45)'],
        ['Côte d\'Ivoire', 'Loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel', 'Commission de Protection des Données Personnelles (CPDP)', 'En vigueur', 'Critique — si traitement de données de résidents ivoiriens'],
        ['Sénégal', 'Loi n°2008-12 du 25 janvier 2008 modifiée par la loi n°2022-03 du 21 février 2022', 'Commission de Protection des Données Personnelles (CDP)', 'En vigueur', 'Critique — déclaration renforcée pour données biométriques'],
        ['Burkina Faso', 'Loi n°010-2004/AN du 20 avril 2004 relative à la protection des données à caractère personnel', 'Commission de l\'Informatique et des Libertés (CIL)', 'En vigueur', 'Élevée — si traitement de données de résidents burkinabè'],
        ['Mali', 'Ordonnance n°03-008/P-RM du 2003 (texte initial)', 'Autorité de régulation (à vérifier)', 'À vérifier', 'Information non vérifiée — validation locale requise'],
        ['Niger', 'Loi n°2017-28 du 2017 (texte à vérifier)', 'Autorité nationale (à vérifier)', 'À vérifier', 'Information non vérifiée — validation locale requise'],
        ['Guinée-Bissau', 'Texte non identifié à ce jour', 'Autorité non identifiée', 'Non identifié', 'Information non vérifiée — validation locale requise'],
        ['Cameroun', 'Loi n°2010/012 du 21 juillet 2010', 'National Data Protection Authority', 'En vigueur', 'Élevée — si traitement de données de résidents camerounais'],
        ['Gabon', 'Loi n°001/2011 du 2011', 'Autorité de protection des données', 'En vigueur', 'Élevée — si traitement de données de résidents gabonais'],
        ['Congo', 'Loi n°45-2020 du 2020', 'Autorité de protection des données', 'En vigueur', 'Élevée — si traitement de données de résidents congolais'],
        ['Guinée équatoriale', 'Texte non identifié à ce jour', 'Autorité non identifiée', 'Non identifié', 'Information non vérifiée — validation locale requise'],
        ['RCA', 'Texte non identifié à ce jour', 'Autorité non identifiée', 'Non identifié', 'Information non vérifiée — validation locale requise'],
        ['Tchad', 'Texte non identifié à ce jour', 'Autorité non identifiée', 'Non identifié', 'Information non vérifiée — validation locale requise'],
      ]
    ),
    noteBox('Information non vérifiée – validation locale requise : ce tableau a été établi sur la base des informations disponibles à la date de rédaction. Les textes de protection des données évoluent rapidement. Les références exactes, les dates de modification et les autorités compétentes doivent être vérifiées localement avant toute utilisation opérationnelle. Les pays marqués « À vérifier » ou « Non identifié » nécessitent une recherche juridique locale approfondie.'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 4 : MISSION PROPOSÉE ─────────────────────────────────────────────
function section4(): Paragraph[] {
  return [
    heading1('4. MISSION PROPOSÉE — SIX PHASES STRUCTURÉES'),
    spacer(),
    body(
      'KHEPRA EXPERTS propose un accompagnement structuré en six phases, couvrant l\'ensemble du spectre réglementaire, juridique, contractuel et opérationnel nécessaire à la mise en conformité de OneKYC. Chaque phase produit des livrables tangibles, validés progressivement, et constitue une brique de la conformité globale. Les phases ont été enrichies pour couvrir les éléments manquants identifiés lors de l\'audit initial : qualification réglementaire, flux transfrontaliers, souveraineté numérique, cloud compliance, gestion des sous-traitants, gouvernance IA, due diligence fournisseurs et plan de remédiation.'
    ),
    spacer(),
    heading2('Phase 1 — Audit réglementaire et stratégique'),
    infoBox('Durée estimée : 2 à 3 semaines'),
    spacer(),
    body(
      'La phase d\'audit réglementaire constitue la fondation de l\'ensemble de la mission. Elle vise à établir un diagnostic exhaustif et à identifier l\'ensemble des obligations applicables, des lacunes actuelles et des priorités d\'action.'
    ),
    spacer(),
    heading3('Activités de la phase 1'),
    bullet('Analyse approfondie du modèle d\'affaires de OneKYC : flux de données, chaîne de valeur, typologie des clients, typologie des traitements, localisation des infrastructures ;'),
    bullet('Cartographie réglementaire complète UEMOA / CEMAC : identification des textes applicables, des autorités compétentes, des déclarations requises, des délais et des sanctions ;'),
    bullet('Analyse des flux de données : cartographie des entrées, des traitements, des sorties, des sous-traitants, des transferts transfrontaliers, des durées de conservation ;'),
    bullet('Analyse des flux transfrontaliers : identification des flux de données entre pays, évaluation des restrictions de transfert, analyse des mécanismes de garantie applicables ;'),
    bullet('Analyse des risques : évaluation des risques réglementaires, juridiques, techniques et opérationnels, avec scoring par criticité et faisabilité de mitigation ;'),
    bullet('Benchmark réglementaire : analyse des pratiques des concurrents et des prestataires similaires dans la zone, identification des meilleures pratiques et des standards sectoriels.'),
    spacer(),
    heading3('Livrables de la phase 1'),
    bullet('Rapport d\'audit réglementaire complet (80+ pages) — diagnostic, lacunes, recommandations, priorisation ;'),
    bullet('Cartographie réglementaire UEMOA / CEMAC — matrice des textes applicables par pays, par activité, par type de donnée ;'),
    bullet('Cartographie des flux transfrontaliers — flux entrant, sortant, interne, avec analyse des risques et des mécanismes de garantie ;'),
    bullet('Matrice de risques réglementaires — 8 risques identifiés, niveaux de criticité, plans de mitigation, budgets indicatifs, responsables et échéances ;'),
    bullet('Feuille de route stratégique de mise en conformité — 6 phases, 24 mois, jalons critiques, dépendances.'),
    spacer(),
    heading2('Phase 2 — Structuration juridique'),
    infoBox('Durée estimée : 2 semaines'),
    spacer(),
    body(
      'La phase de structuration juridique vise à concevoir l\'architecture juridique optimale pour OneKYC, en tenant compte des contraintes de souveraineté numérique, des exigences de substance économique et des nécessités de gouvernance.'
    ),
    spacer(),
    heading3('Activités de la phase 2'),
    bullet('Analyse comparative des juridictions d\'implantation : avantages et inconvénients de chaque pays de l\'UEMOA et de la CEMAC pour le siège social et les opérations ;'),
    bullet('Conception du schéma juridique optimal : forme sociétaire (SAS, SARL, SA), capital minimum, répartition du capital, clauses statutaires, pacte d\'actionnaires ;'),
    bullet('Analyse de la gouvernance : composition du Conseil d\'Administration / de Surveillance, séparation des fonctions, nomination des dirigeants, conformité Fit & Proper ;'),
    bullet('Analyse des sous-traitants et de la chaîne de confiance : identification des tiers stratégiques, évaluation des risques de sous-traitance, clauses contractuelles requises ;'),
    bullet('Rédaction des contrats intragroupe : si structure multi-entités, rédaction des contrats de prestation de services, de licence, de transfert de données, de prix de transfert ;'),
    bullet('Analyse des implications fiscales et douanières de la structure retenue.'),
    spacer(),
    heading3('Livrables de la phase 2'),
    bullet('Mémorandum juridique de structuration (40+ pages) — analyse comparative, recommandation, risques, scénarios ;'),
    bullet('Schéma cible de l\'architecture juridique et organisationnelle — organigramme juridique, organigramme fonctionnel, organigramme de gouvernance ;'),
    bullet('Analyse des sous-traitants et de la chaîne de confiance — liste des tiers, risques associés, clauses recommandées ;'),
    bullet('Projet de statuts et pacte d\'actionnaires — conformes OHADA et droit national, adaptés aux spécificités du projet.'),
    spacer(),
    heading2('Phase 3 — Protection des données personnelles'),
    infoBox('Durée estimée : 3 semaines'),
    spacer(),
    body(
      'La phase de protection des données personnelles constitue le cœur de la mise en conformité de OneKYC. Elle vise à aligner l\'ensemble des pratiques de l\'entreprise sur les standards les plus élevés, inspirés du RGPD, tout en respectant les spécificités locales.'
    ),
    spacer(),
    heading3('Activités de la phase 3'),
    bullet('Qualification précise du statut de OneKYC : responsable, co-responsable ou sous-traitant de données — par traitement et par client ;'),
    bullet('Analyse détaillée de chaque traitement de données : finalité, base légale, catégories de données, catégories de personnes concernées, destinataires, durées de conservation, mesures de sécurité ;'),
    bullet('Cloud compliance assessment : évaluation de la conformité de l\'hébergement cloud aux exigences de souveraineté numérique, localisation des datacenters, certifications du fournisseur, sous-traitance ;'),
    bullet('Mise en conformité RGPD-inspirée : droits des personnes (accès, rectification, effacement, portabilité, opposition), registre de traitement, privacy by design, privacy by default ;'),
    bullet('Mise en conformité locale : adaptation aux lois nationales de chaque pays cible, déclarations et enregistrements auprès des autorités compétentes ;'),
    bullet('Analyse des sous-traitants de données : identification des sous-traitants techniques, évaluation de leur conformité, clauses contractuelles requises ;'),
    bullet('Mise en place des procédures de gestion des incidents : détection, notification à l\'autorité (dans les délais réglementaires applicables), notification aux personnes concernées, documentation, leçons apprises.'),
    spacer(),
    heading3('Livrables de la phase 3'),
    bullet('Registre de traitement des données personnelles — complet, documenté, actualisable, conforme aux standards Big Four ;'),
    bullet('Politique de confidentialité — version publique (site web, application) et version interne (employés, sous-traitants) ;'),
    bullet('Data Processing Agreement (DPA) — modèle de contrat de sous-traitance de données, adaptable à chaque client institutionnel ;'),
    bullet('Cloud Compliance Assessment — rapport d\'évaluation de la conformité de l\'hébergement cloud ;'),
    bullet('Analyse des sous-traitants de données — liste des sous-traitants, conformité évaluée, clauses recommandées ;'),
    bullet('Procédures de gestion des violations de données — playbooks, templates de notification, feuilles de route, responsabilités ;'),
    bullet('Politique de conservation et d\'archivage des données — durées, modalités, destruction sécurisée.'),
    spacer(),
    heading2('Phase 4 — Cadre contractuel commercial'),
    infoBox('Durée estimée : 2 semaines'),
    spacer(),
    body(
      'La phase de structuration contractuelle vise à doter OneKYC d\'un arsenal juridique complet et robuste pour ses relations commerciales, en particulier avec les institutions financières et les autorités publiques.'
    ),
    spacer(),
    heading3('Activités de la phase 4'),
    bullet('Rédaction des Conditions Générales de Service (CGS) SaaS — adaptées aux services OneKYC, avec clauses de conformité réglementaire, SLA, limitations de responsabilité, clauses de force majeure, résolution ;'),
    bullet('Rédaction des contrats API — spécifications techniques, conditions d\'utilisation, quotas, tarification, confidentialité, sécurité ;'),
    bullet('Rédaction des contrats de sous-traitance de données — pour les sous-traitants techniques (hébergeurs, fournisseurs cloud, partenaires biométriques) ;'),
    bullet('Rédaction des accords de confidentialité (NDA) — bilatéraux, multilatéraux, adaptés aux différentes typologies de parties prenantes ;'),
    bullet('Rédaction des clauses de transfert international de données — mécanismes de garantie contractuelle adaptés à chaque destination, avec distinction entre mécanismes exigés localement et pratiques de marché ;'),
    bullet('Rédaction des contrats d\'externalisation bancaire — conformes aux exigences BCEAO / COBAC, avec clauses d\'auditabilité, de reversibilité, de continuité ;'),
    bullet('Due diligence fournisseurs : élaboration d\'un questionnaire et d\'une procédure de due diligence à appliquer aux fournisseurs et sous-traitants critiques.'),
    spacer(),
    heading3('Livrables de la phase 4'),
    bullet('Conditions Générales de Service (CGS) SaaS — document contractuel complet et négociable ;'),
    bullet('Contrat API — cadre juridique pour l\'intégration technique des clients ;'),
    bullet('Modèle de contrat de sous-traitance de données — pour les sous-traitants techniques et opérationnels ;'),
    bullet('Modèle d\'accord de confidentialité (NDA) — 3 versions : prospect, partenaire, employé ;'),
    bullet('Clauses de transfert international de données — mécanismes de garantie adaptés, avec distinction exigences réglementaires / pratiques de marché ;'),
    bullet('Contrats d\'externalisation bancaire — modèle conforme aux exigences BCEAO / COBAC ;'),
    bullet('Vendor Due Diligence Report — questionnaire, procédure et modèle de rapport de due diligence fournisseurs.'),
    spacer(),
    heading2('Phase 5 — Cadre conformité bancaire et RegTech'),
    infoBox('Durée estimée : 2 semaines'),
    spacer(),
    body(
      'La phase de conformité bancaire et RegTech vise à doter OneKYC des dispositifs et des documents nécessaires pour démontrer sa conformité aux exigences des superviseurs bancaires et des autorités AML/CFT.'
    ),
    spacer(),
    heading3('Activités de la phase 5'),
    bullet('Analyse des exigences BCEAO : directives sur les services numériques, instructions sur l\'externalisation, normes prudentielles applicables aux sous-traitants ;'),
    bullet('Analyse des exigences COBAC : règlement sur les services financiers numériques, conditions d\'exercice des activités de microfinance, normes de cybersécurité ;'),
    bullet('Analyse des exigences LCB-FT : 40 recommandations du GAFI, directives GIABA / GABAC, règlements nationaux — et adaptation aux spécificités du modèle OneKYC ;'),
    bullet('Analyse des exigences de gouvernance des prestataires critiques : conformité aux standards des institutions financières sur les tiers prestataires (TPRM — Third Party Risk Management) ;'),
    bullet('Gouvernance IA et algorithmes : analyse des obligations applicables aux algorithmes de scoring, de screening et de décision automatisée, avec proposition d\'un cadre de gouvernance éthique et technique ;'),
    bullet('Conception du cadre d\'auditabilité : documentation, procédures, registres, indicateurs de conformité (KRI), reporting réglementaire.'),
    spacer(),
    heading3('Livrables de la phase 5'),
    bullet('Manuel de conformité bancaire et RegTech — document de référence couvrant BCEAO, COBAC, GIABA, GABAC, et standards internationaux ;'),
    bullet('Politique d\'externalisation — conforme aux exigences BCEAO / COBAC, avec procédures de sélection, de surveillance et de sortie des prestataires ;'),
    bullet('Cadre d\'auditabilité — liste des documents, registres, et procédures requis pour les audits des superviseurs et des clients institutionnels ;'),
    bullet('Politique LCB/FT — identification des clients, vigilance renforcée, surveillance des transactions, déclaration de soupçon, formation du personnel ;'),
    bullet('AI Governance Framework — cadre de gouvernance des algorithmes, éthique IA, explicabilité, contrôle des biais, documentation des décisions automatisées.'),
    spacer(),
    heading2('Phase 6 — Assistance opérationnelle et plan de remédiation'),
    infoBox('Durée estimée : 4 semaines (renouvelable mensuellement)'),
    spacer(),
    body(
      'La phase d\'assistance opérationnelle vise à accompagner OneKYC dans la mise en œuvre concrète des livrables, la contractualisation avec les premiers clients, et les interactions avec les autorités compétentes. Cette phase intègre un plan de remédiation pour traiter les écarts identifiés lors de l\'audit initial.'
    ),
    spacer(),
    heading3('Activités de la phase 6'),
    bullet('Organisation et animation de réunions avec les partenaires stratégiques (banques, EMF, SFD, fintechs, autorités) ;'),
    bullet('Support réglementaire continu : réponses aux questions, interprétation des textes, veille réglementaire, alertes de conformité ;'),
    bullet('Préparation aux due diligences des clients institutionnels : constitution des dossiers de conformité, réponses aux questionnaires, préparation aux audits ;'),
    bullet('Accompagnement à la contractualisation : négociation des contrats, révision des clauses, mise en conformité des accords avec le cadre réglementaire ;'),
    bullet('Formation des équipes : sessions de formation au personnel de OneKYC sur les obligations de conformité, les procédures de gestion des données, les réponses aux incidents ;'),
    bullet('Plan de remédiation : élaboration d\'un plan d\'action correctif avec prioritisation, échéances, responsables, et indicateurs de suivi pour traiter les écarts identifiés dans les phases 1 à 5.'),
    spacer(),
    heading3('Livrables de la phase 6'),
    bullet('Comptes rendus de réunions avec les partenaires et les autorités ;'),
    bullet('Dossiers de due diligence — préparés, validés et remis aux clients institutionnels ;'),
    bullet('Rapports de conformité mensuels — état d\'avancement, alertes, recommandations ;'),
    bullet('Supports de formation — présentations, guides, FAQ, scénarios pratiques ;'),
    bullet('Plan de remédiation — document structuré avec actions correctives, échéances, responsables, indicateurs de suivi et budget de mise en œuvre.'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 5 : APPROCHE MÉTHODOLOGIQUE ────────────────────────────────────
function section5(): Paragraph[] {
  return [
    heading1('5. APPROCHE MÉTHODOLOGIQUE'),
    spacer(),
    body(
      'KHEPRA EXPERTS adopte une méthodologie rigoureuse, inspirée des standards des cabinets Big Four, et adaptée aux spécificités du contexte réglementaire africain. Notre approche conjugue analyse documentaire, ateliers stratégiques, entretiens de direction, benchmark réglementaire, validation progressive des livrables, et comité de pilotage.'
    ),
    spacer(),
    heading2('5.1 Analyse documentaire'),
    bullet('Revue exhaustive de la documentation existante : statuts, contrats, politiques, procédures, rapports d\'audit, certifications ;'),
    bullet('Analyse des textes réglementaires applicables : lois, règlements, instructions, circulaires, recommandations du GAFI ;'),
    bullet('Identification des écarts entre la situation actuelle et les exigences réglementaires.'),
    spacer(),
    heading2('5.2 Ateliers stratégiques'),
    bullet('Ateliers de cadrage avec la direction de OneKYC : vision, objectifs, contraintes, calendrier, budget ;'),
    bullet('Ateliers thématiques par domaine : protection des données, conformité bancaire, cybersécurité, gouvernance ;'),
    bullet('Ateliers de validation : présentation des livrables, recueil des commentaires, ajustements, approbation finale.'),
    spacer(),
    heading2('5.3 Entretiens de direction'),
    bullet('Entretiens individuels avec les dirigeants de OneKYC : compréhension des enjeux, identification des risques spécifiques, recueil des attentes ;'),
    bullet('Entretiens avec les responsables techniques : architecture, sécurité, flux de données, hébergement ;'),
    bullet('Entretiens avec les responsables commerciaux : clients, partenaires, modèle économique, contractualisation.'),
    spacer(),
    heading2('5.4 Benchmark réglementaire'),
    bullet('Analyse comparative des pratiques des prestataires de services KYC/KYB/AML dans la zone UEMOA / CEMAC ;'),
    bullet('Benchmark des pratiques de protection des données : registres, politiques, DPA, notifications ;'),
    bullet('Benchmark des pratiques de cybersécurité : certifications, audits, standards, cloud.'),
    spacer(),
    heading2('5.5 Validation progressive des livrables'),
    bullet('Chaque livrable est soumis à un processus de validation en trois étapes : (1) rédaction par l\'expert KHEPRA, (2) revue interne par le chef de mission, (3) validation par le client ;'),
    bullet('Les livrables sont produits en version « draft », puis « final » après intégration des commentaires ;'),
    bullet('Un registre de validation est tenu à jour, traçant les versions, les commentaires, les corrections et les approbations.'),
    spacer(),
    heading2('5.6 Comité de pilotage'),
    bullet('Comité de pilotage hebdomadaire ou bi-mensuel, réunissant le chef de mission KHEPRA et le point focal de OneKYC ;'),
    bullet('Ordre du jour structuré : état d\'avancement, alertes, décisions à prendre, prochaines étapes ;'),
    bullet('Compte rendu formalisé après chaque comité, avec suivi des actions et des échéances.'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 6 : PLANNING PRÉVISIONNEL ──────────────────────────────────────
function section6(): Paragraph[] {
  return [
    heading1('6. PLANNING PRÉVISIONNEL'),
    spacer(),
    body(
      'Le calendrier ci-dessous est indicatif et sera affiné lors de la réunion de lancement. Il couvre l\'ensemble des six phases de la mission, avec une durée totale estimée entre 12 et 16 semaines pour la phase de mise en conformité initiale, suivie d\'une assistance opérationnelle mensuelle.'
    ),
    spacer(),
    makeTable(
      ['Phase', 'Activités principales', 'Durée estimée', 'Semaines'],
      [
        ['Phase 1 — Audit réglementaire', 'Analyse du modèle, cartographie réglementaire, analyse des flux, matrice des risques', '2 à 3 semaines', 'S1-S3'],
        ['Phase 2 — Structuration juridique', 'Schéma juridique, juridictions, gouvernance, contrats intragroupe', '2 semaines', 'S3-S5'],
        ['Phase 3 — Protection des données', 'Qualification, registre, politique de confidentialité, DPA, procédures incidents', '3 semaines', 'S5-S8'],
        ['Phase 4 — Cadre contractuel', 'CGS SaaS, contrats API, sous-traitance, NDA, clauses transfert international', '2 semaines', 'S8-S10'],
        ['Phase 5 — Conformité bancaire', 'Manuel de conformité, politique d\'externalisation, cadre d\'auditabilité, LCB/FT', '2 semaines', 'S10-S12'],
        ['Phase 6 — Assistance opérationnelle', 'Réunions partenaires, support réglementaire, due diligences, contractualisation', '4 semaines', 'S12-S16'],
      ]
    ),
    spacer(),
    noteBox(
      'La durée totale de 12 à 16 semaines est indicative. Elle peut varier en fonction de la disponibilité des dirigeants de OneKYC, de la complexité des juridictions d\'implantation, et des délais de réponse des autorités compétentes (déclarations, enregistrements, autorisations). KHEPRA EXPERTS s\'engage à respecter les échéances convenues, sous réserve de la fourniture par le client de l\'ensemble des informations et documents nécessaires dans les délais impartis.'
    ),
    spacer(),
    body(
      'Jalons critiques et points de contrôle :'
    ),
    bullet('J+15 : Rapport d\'audit réglementaire et feuille de route validés ;'),
    bullet('J+30 : Schéma juridique et statuts validés ;'),
    bullet('J+50 : Registre de traitement, politique de confidentialité et DPA validés ;'),
    bullet('J+65 : Conditions Générales de Service et contrats API validés ;'),
    bullet('J+80 : Manuel de conformité bancaire et cadre d\'auditabilité validés ;'),
    bullet('J+100 : Livrables finaux remis, formation dispensée, assistance opérationnelle lancée.'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 7 : COÛTS EXTERNES POTENTIELS ──────────────────────────────────
function section7(): Paragraph[] {
  return [
    heading1('7. COÛTS EXTERNES POTENTIELS'),
    spacer(),
    body(
      'Les coûts ci-dessous sont identifiés à titre indicatif ou vérifiable. Ils ne sont pas inclus dans les honoraires de KHEPRA EXPERTS et restent à la charge directe de OneKYC. KHEPRA EXPERTS accompagne OneKYC dans la sélection des prestataires et le suivi de ces dépenses, sans en assumer la responsabilité financière. Les montants sont classés selon leur niveau de fiabilité.'
    ),
    spacer(),
    makeTable(
      ['Catégorie de coûts', 'Poste', 'Estimation', 'Statut', 'Observations'],
      [
        ['Création de société', 'Frais de création de société (SAS/SARL/SA)', '800 000 – 1 500 000 FCFA', 'Vérifiable', 'Par pays d\'implantation, selon le droit national et les formalités. Le montant peut être confirmé auprès des Centres de Formalités des Entreprises (CFE).'],
        ['Enregistrements administratifs', 'Immatriculation RCCM, NIF, douanes, autres', '300 000 – 600 000 FCFA', 'Vérifiable', 'Par pays d\'implantation. Les tarifs sont publics et disponibles auprès des CFE.'],
        ['Déclarations CNIL locales', 'Déclaration ou enregistrement auprès de l\'autorité de protection des données', '100 000 – 300 000 FCFA', 'Vérifiable', 'Par pays, selon le régime (déclaration, autorisation, enregistrement). Les tarifs sont publiés par les autorités.'],
        ['Avis juridiques locaux', 'Avis juridiques spécifiques par pays, notamment sur la qualification des données biométriques', '1 500 000 – 2 500 000 FCFA', 'Devis tiers requis', 'Par pays, selon la complexité des questions soumises. Un devis est indispensable avant engagement.'],
        ['Certifications ISO', 'Certification ISO 27001, ISO 27017, ISO 27018, SOC 2 Type II', '8 000 000 – 12 000 000 FCFA', 'Devis tiers requis', 'Selon le cabinet de certification et l\'état initial des processus. Un devis précis est nécessaire.'],
        ['Audits cybersécurité', 'Audit de sécurité, pentest, audit de conformité', '2 500 000 – 4 000 000 FCFA', 'Devis tiers requis', 'Par audit, selon la surface d\'attaque et la profondeur. Un devis est indispensable.'],
        ['Hébergement cloud', 'Hébergement cloud conforme (souveraineté des données)', '800 000 – 1 500 000 FCFA / mois', 'Indicatif', 'Selon le volume de données, la redondance, la localisation. Les prix varient fortement selon les fournisseurs.'],
        ['Licences AML et sanctions', 'Licences bases de données AML, screening sanctions, PEP', '1 500 000 – 2 500 000 FCFA / an', 'Devis tiers requis', 'Selon le fournisseur (Dow Jones, Refinitiv, etc.) et le volume de requêtes. Un devis est nécessaire.'],
        ['Bases PEP', 'Abonnement bases de données PEP (Personnes Politiquement Exposées)', '600 000 – 1 000 000 FCFA / an', 'Devis tiers requis', 'Selon la couverture géographique et la fréquence de mise à jour. Un devis est nécessaire.'],
        ['Frais notaire et formalités OHADA', 'Frais de notaire, frais d\'enregistrement, formalités OHADA', '400 000 – 800 000 FCFA', 'Vérifiable', 'Par pays, selon le capital et la complexité des actes. Les tarifs sont réglementés.'],
      ]
    ),
    spacer(),
    infoBox(
      'Méthodologie de budgétisation : les coûts marqués « Vérifiable » sont basés sur des tarifs publics ou réglementés et peuvent être confirmés directement. Les coûts marqués « Indicatif » sont des estimations de marché basées sur notre expérience. Les coûts marqués « Devis tiers requis » nécessitent une demande de devis auprès de prestataires spécialisés. KHEPRA EXPERTS recommande de budgétiser une enveloppe de 20 000 000 à 35 000 000 FCFA pour les coûts externes sur la première année d\'opération, hors coûts de développement technologique, sous réserve de validation par devis.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 8 : PROPOSITION FINANCIÈRE ─────────────────────────────────────
function section8(): Paragraph[] {
  return [
    heading1('8. PROPOSITION FINANCIÈRE'),
    spacer(),
    body(
      'KHEPRA EXPERTS propose quatre options d\'accompagnement, avec des prix fermes, adaptés aux besoins, au calendrier et au budget de OneKYC. Chaque option est conçue comme un investissement stratégique, avec des livrables tangibles, mesurables et opérationnels. Une option d\'assistance récurrente mensuelle est également proposée pour la phase post-déploiement.'
    ),
    spacer(),
    heading2('Option A — Diagnostic réglementaire'),
    spacer(),
    body(
      'L\'Option A constitue le point d\'entrée idéal pour OneKYC. Elle fournit un diagnostic exhaustif, une cartographie réglementaire complète, et une feuille de route actionnable, permettant à la direction de prendre des décisions éclairées sur la suite de la mise en conformité.'
    ),
    spacer(),
    body('Cette option comprend :'),
    bullet('Phase 1 complète : Audit réglementaire et stratégique (rapport d\'audit, cartographie réglementaire, cartographie des flux transfrontaliers, matrice de risques) ;'),
    bullet('Phase 2 partielle : Structuration juridique — mémorandum de structuration et schéma cible (sans rédaction des statuts) ;'),
    bullet('Atelier de restitution de 4 heures avec la direction de OneKYC ;'),
    bullet('Support téléphonique et email pendant 30 jours après la restitution.'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Prix ferme : 18 000 € HT',
          bold: true,
          size: 24,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: TEAL_LIGHT, fill: TEAL_LIGHT },
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        left: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        right: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
      },
    }),
    spacer(),
    heading2('Option B — Structuration juridique et protection des données'),
    spacer(),
    body(
      'L\'Option B constitue le socle de la mise en conformité de OneKYC. Elle couvre l\'audit, la structuration juridique, la protection des données, et la documentation contractuelle complète, permettant à OneKYC de démarrer ses opérations commerciales en conformité avec les exigences réglementaires.'
    ),
    spacer(),
    body('Cette option comprend :'),
    bullet('Phase 1 complète : Audit réglementaire et stratégique ;'),
    bullet('Phase 2 complète : Structuration juridique — mémorandum, schéma cible, projet de statuts, pacte d\'actionnaires, analyse des sous-traitants ;'),
    bullet('Phase 3 complète : Protection des données — registre, politique de confidentialité, DPA, Cloud Compliance Assessment, procédures de gestion des incidents ;'),
    bullet('Phase 4 complète : Cadre contractuel — CGS SaaS, contrats API, contrats de sous-traitance, NDA, clauses de transfert international, Vendor Due Diligence Report ;'),
    bullet('Phase 5 partielle : Manuel de conformité bancaire et RegTech — politique LCB/FT, cadre d\'auditabilité ;'),
    bullet('Ateliers de formation du personnel (2 sessions de 4 heures) ;'),
    bullet('Support téléphonique et email pendant 90 jours après la livraison.'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Prix ferme : 42 000 € HT',
          bold: true,
          size: 24,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: TEAL_LIGHT, fill: TEAL_LIGHT },
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        left: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        right: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
      },
    }),
    spacer(),
    heading2('Option C — Mise en conformité complète'),
    spacer(),
    body(
      'L\'Option C couvre l\'ensemble des phases de mise en conformité, avec une assistance opérationnelle initiale, permettant à OneKYC de déployer ses opérations dans plusieurs pays de l\'UEMOA et de la CEMAC en conformité totale avec les exigences réglementaires.'
    ),
    spacer(),
    body('Cette option comprend :'),
    bullet('Phases 1 à 5 complètes : Audit, structuration juridique, protection des données, cadre contractuel, conformité bancaire et RegTech (y compris AI Governance Framework) ;'),
    bullet('Phase 6 partielle : Assistance opérationnelle — 2 semaines de support intense, réunions avec partenaires, préparation aux due diligences, formation du personnel (2 sessions) ;'),
    bullet('Accompagnement multi-pays : adaptation des livrables à chaque pays cible (UEMOA et CEMAC) ;'),
    bullet('Plan de remédiation — élaboration et suivi initial ;'),
    bullet('Support téléphonique et email pendant 120 jours après la livraison.'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Prix ferme : 85 000 € HT',
          bold: true,
          size: 24,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: TEAL_LIGHT, fill: TEAL_LIGHT },
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        left: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        right: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
      },
    }),
    spacer(),
    heading2('Option D — Premium (déploiement régional avec assistance récurrente)'),
    spacer(),
    body(
      'L\'Option D constitue l\'offre la plus complète de KHEPRA EXPERTS. Elle couvre l\'ensemble des six phases de la mission, avec une assistance opérationnelle renforcée, une assistance récurrente incluse pendant 6 mois, et un accompagnement multi-pays prioritaire.'
    ),
    spacer(),
    body('Cette option comprend :'),
    bullet('Phases 1 à 6 complètes : Audit, structuration juridique, protection des données, cadre contractuel, conformité bancaire, assistance opérationnelle et plan de remédiation ;'),
    bullet('Accompagnement multi-pays : adaptation des livrables à chaque pays cible (UEMOA et CEMAC) ;'),
    bullet('Assistance aux déclarations et enregistrements auprès des autorités de protection des données dans chaque pays ;'),
    bullet('Accompagnement aux due diligences des premiers clients institutionnels ;'),
    bullet('Formation du personnel (4 sessions de 4 heures) ;'),
    bullet('Support téléphonique et email pendant 180 jours après la livraison ;'),
    bullet('Assistance récurrente mensuelle incluse pendant 6 mois (4 jours/mois, soit 24 jours).'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Prix ferme : 125 000 € HT',
          bold: true,
          size: 24,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      shading: { type: ShadingType.SOLID, color: TEAL_LIGHT, fill: TEAL_LIGHT },
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        left: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
        right: { style: BorderStyle.SINGLE, size: 2, color: TEAL },
      },
    }),
    spacer(),
    heading2('Option d\'assistance récurrente mensuelle'),
    spacer(),
    body(
      'Au-delà de la mission initiale, KHEPRA EXPERTS propose un accompagnement récurrent, adapté aux besoins de veille réglementaire, de mise à jour des documents, et de support opérationnel continu.'
    ),
    spacer(),
    body('Cette option comprend :'),
    bullet('Veille réglementaire mensuelle : alertes, analyses, mises à jour des textes applicables ;'),
    bullet('Mise à jour des documents de conformité : politiques, procédures, registres, contrats ;'),
    bullet('Support réglementaire : réponses aux questions, interprétation des textes, préparation aux audits ;'),
    bullet('Accompagnement aux nouvelles due diligences : constitution des dossiers, réponses aux questionnaires ;'),
    bullet('Compte rendu mensuel d\'activité et état de conformité.'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'TJM : 2 500 € HT / jour',
          bold: true,
          size: 22,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Forfait mensuel : 6 500 € HT / mois (2,5 jours/mois)',
          bold: true,
          size: 22,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    spacer(),
    heading2('8.1 Budget détaillé par phase — Option D (Premium)'),
    spacer(),
    body(
      'Le tableau ci-dessous présente le budget détaillé par phase pour l\'Option D, illustrant la répartition des jours et des honoraires. Les autres options sont des sous-ensembles de ce budget.'
    ),
    spacer(),
    makeTable(
      ['Phase', 'Jours', 'TJM (€)', 'Honoraires (€ HT)', 'Observations'],
      [
        ['Phase 1 — Audit réglementaire', '10 jours', '2 500', '25 000', 'Inclut cartographie réglementaire et flux transfrontaliers'],
        ['Phase 2 — Structuration juridique', '8 jours', '2 500', '20 000', 'Inclut sous-traitants et chaîne de confiance'],
        ['Phase 3 — Protection des données', '12 jours', '2 500', '30 000', 'Inclut Cloud Compliance et sous-traitants'],
        ['Phase 4 — Cadre contractuel', '8 jours', '2 500', '20 000', 'Inclut Vendor Due Diligence'],
        ['Phase 5 — Conformité bancaire', '8 jours', '2 500', '20 000', 'Inclut AI Governance Framework'],
        ['Phase 6 — Assistance + Remédiation', '16 jours', '2 500', '40 000', 'Inclut 4 jours de formation + 12 jours d\'assistance'],
        ['Assistance récurrente (6 mois)', '24 jours', '2 500', '60 000', 'Incluse dans le prix Premium'],
        ['Direction de mission', '4 jours', '2 500', '10 000', 'Partner, suivi, comité de pilotage'],
        ['Total', '90 jours', '-', '225 000', 'Prix ferme accordé : 125 000 € HT (remise de 44%)'],
      ]
    ),
    spacer(),
    noteBox(
      'Le prix ferme de 125 000 € HT pour l\'Option D représente une remise de 44% sur le budget théorique de 225 000 € HT. Cette remise reflète l\'engagement de KHEPRA EXPERTS sur un projet stratégique et la mutualisation des ressources sur une mission de longue durée. Les prix des Options A, B et C sont également des prix fermes, négociés avec une remise comparable. Les honoraires sont libellés en euros (€) et payables par virement bancaire. Les factures sont émises en début de chaque tranche, avec un délai de règlement de 15 jours. En cas de retard, des pénalités de 1,5% par mois seront appliquées. La TVA applicable sera ajoutée conformément à la législation fiscale du pays de facturation. Les frais de déplacement et de mission sur le terrain (transport, hébergement, per diem) seront facturés séparément sur présentation de justificatifs.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 9 : ÉQUIPE PROPOSÉE ──────────────────────────────────────────────
function section9(): Paragraph[] {
  return [
    heading1('9. ÉQUIPE PROPOSÉE'),
    spacer(),
    body(
      'KHEPRA EXPERTS mobilisera une équipe pluridisciplinaire de haut niveau, combinant expertise réglementaire, juridique, technique et stratégique, adaptée à la complexité et à l\'ambition du projet OneKYC.'
    ),
    spacer(),
    makeTable(
      ['Profil', 'Rôle dans la mission', 'Expertise clé'],
      [
        [
          'Partner — Regulatory & Risk',
          'Chef de mission — Coordination globale, arbitrage stratégique, relations avec les autorités réglementaires',
          'Régulation financière, supervision bancaire, conformité prudentielle, BCEAO, COBAC, GIABA, GABAC, 15+ ans d\'expérience'
        ],
        [
          'Expert — Protection des Données',
          'Responsable de la Phase 3 (Protection des données) — registre, DPA, politique de confidentialité, procédures incidents',
          'Protection des données personnelles, RGPD, conformité CNIL/APDP, cybersécurité, audit de conformité, 10+ ans'
        ],
        [
          'Expert — Fintech / RegTech',
          'Responsable des phases 4 et 5 — cadre contractuel, conformité bancaire, RegTech, AML/CFT',
          'Fintech, RegTech, conformité AML/CFT, services financiers numériques, externalisation bancaire, 8+ ans'
        ],
        [
          'Juriste — OHADA & Droit des Affaires',
          'Responsable de la Phase 2 — structuration juridique, statuts, pactes, contrats intragroupe, gouvernance',
          'Droit OHADA, droit des sociétés, droit des affaires, structuration transfrontalière, gouvernance d\'entreprise, 12+ ans'
        ],
        [
          'Consultant — Cybersécurité',
          'Responsable de la sécurité des systèmes — architecture, hébergement, certifications, PCA/PRA, audits',
          'Cybersécurité, ISO 27001, SOC 2, cloud security, sécurité des données, tests d\'intrusion, 8+ ans'
        ],
      ]
    ),
    spacer(),
    infoBox(
      'L\'équipe est coordonnée par le Partner — Regulatory & Risk, qui assure la cohérence globale, la qualité des livrables et la communication avec le comité de direction de OneKYC. Des réunions de suivi hebdomadaires ou bi-mensuelles sont organisées tout au long de la mission. Les livrables sont validés par le chef de mission avant remise au client.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 10 : CONCLUSION ────────────────────────────────────────────────
function section10(): Paragraph[] {
  return [
    heading1('10. CONCLUSION'),
    spacer(),
    body(
      'Le projet de OneKYC s\'inscrit dans une dynamique stratégique majeure de l\'écosystème financier africain : la digitalisation de la conformité, la sécurisation des processus d\'identification, et la lutte contre la fraude et le blanchiment de capitaux. En tant qu\'infrastructure de confiance numérique, OneKYC a la responsabilité de démontrer une conformité irréprochable aux exigences des superviseurs régionaux, des autorités de protection des données, et des institutions financières clientes.'
    ),
    spacer(),
    body(
      'KHEPRA EXPERTS est prêt à accompagner OneKYC dans cette transformation. Notre expertise pointue en régulation financière, en protection des données, en conformité bancaire, en gouvernance numérique et en structuration juridique OHADA nous permet de concevoir et de déployer un cadre réglementaire complet, robuste et opérationnel. Notre approche intégrée — alliant analyse stratégique, structuration juridique, documentation contractuelle, et assistance opérationnelle — garantit que chaque livrable sera non seulement conforme, mais aussi directement utilisable par les équipes de OneKYC et leurs clients.'
    ),
    spacer(),
    body(
      'Nous sommes convaincus que la qualité de l\'accompagnement réglementaire et juridique sera un facteur différenciant décisif pour le succès de OneKYC sur les marchés africains. Un cadre de conformité solide, documenté et audité, rassurera les superviseurs, les institutions financières et les utilisateurs finaux. C\'est précisément cet objectif que KHEPRA EXPERTS s\'engage à atteindre aux côtés de OneKYC.'
    ),
    spacer(),
    body(
      'Nous nous tenons à votre entière disposition pour approfondir cette offre, adapter les options à vos besoins spécifiques, et définir ensemble le calendrier de mise en conformité optimal.',
      { italic: true }
    ),
    spacer(2),
    body(
      'Veuillez agréer, Madame, Monsieur, l\'expression de notre considération distinguée.',
      { italic: true }
    ),
    spacer(2),
    body(
      'SIMDA Essoyomèwè\nAssocié — KHEPRA EXPERTS',
      { bold: true }
    ),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: '─────────────────────────────────────────────',
          color: TEAL,
          size: 20,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Pour acceptation de la présente offre',
          bold: true,
          size: 22,
          color: DARK,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    }),
    makeTable(
      ['Pour KHEPRA EXPERTS', 'Pour OneKYC'],
      [
        ['Nom et qualité : ___________________________', 'Nom et qualité : ___________________________'],
        ['Date : ___________________________', 'Date : ___________________________'],
        ['Signature et cachet :', 'Signature et cachet :'],
        ['\n\n\n\n', '\n\n\n\n'],
      ]
    ),
    spacer(2),
    new Paragraph({
      children: [
        new TextRun({
          text: 'KHEPRA EXPERTS — Cabinet de Conseil Stratégique, Réglementaire et Juridique',
          size: 16,
          color: GRAY,
          font: 'Calibri',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'khepraexperts.com | contact@khepraexperts.com',
          size: 16,
          color: TEAL,
          font: 'Calibri',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}

// ─── SECTION 11 : RAPPORT DE GAP ANALYSIS ─────────────────────────────────────
function section11(): Paragraph[] {
  return [
    heading1('11. RAPPORT DE GAP ANALYSIS — AUDIT INTERNE KHEPRA'),
    spacer(),
    body(
      'Ce rapport de Gap Analysis a été élaboré par le comité de revue qualité interne de KHEPRA EXPERTS, conformément aux standards des cabinets Big Four. Il présente les écarts identifiés entre la version initiale de l\'offre et les standards de conformité juridique, réglementaire, méthodologique et financière exigés.'
    ),
    spacer(),
    heading2('11.1 Tableau des corrections obligatoires'),
    spacer(),
    makeTable(
      ['#', 'Écart', 'Criticité', 'Impact', 'Risque', 'Correction appliquée', 'Priorité'],
      [
        ['1', 'Affirmations juridiques non nuancées (biométrique, SCC, BCR, localisation)', 'Élevée', 'Erreur juridique pouvant induire le client en erreur', 'Responsabilité civile, réputation', 'Ajout de disclaimers, distinction exigences/pratiques/recommandations', 'P1'],
        ['2', 'Prix indicatifs trop larges (15-25k€, 35-60k€, 75-150k€)', 'Élevée', 'Incertitude budgétaire, difficulté de décision pour le CODIR', 'Perte de crédibilité commerciale', 'Remplacement par des prix fermes (18k€, 42k€, 85k€, 125k€)', 'P1'],
        ['3', 'Absence de matrice de qualification juridique', 'Moyenne', 'Manque de clarté sur le statut de OneKYC', 'Défaut de couverture des risques', 'Ajout de la matrice des 5 hypothèses avec défendabilité et risques', 'P1'],
        ['4', 'Absence de tableau par pays des textes PDP', 'Moyenne', 'Incertitude sur les obligations applicables', 'Non-conformité locale', 'Ajout du tableau récapitulatif 14 pays avec statut et autorité', 'P1'],
        ['5', 'Coûts externes sans classification ni méthodologie', 'Moyenne', 'Non-fiabilité des estimations', 'Défaut de transparence', 'Ajout de la colonne « Statut » (Vérifiable / Indicatif / Devis tiers) + méthodologie', 'P2'],
        ['6', 'Phases manquantes (cloud, IA, sous-traitants, due diligence, remédiation)', 'Élevée', 'Couverture incomplète des besoins du client', 'Lacunes opérationnelles', 'Intégration dans les 6 phases existantes + livrables associés', 'P1'],
        ['7', 'Absence de budget détaillé par phase', 'Moyenne', 'Opacité financière', 'Défiance du client', 'Ajout du tableau de budget détaillé 90 jours, TJM 2 500 €', 'P2'],
        ['8', 'Références réglementaires non nommées (BCEAO, COBAC)', 'Moyenne', 'Manque de précision juridique', 'Manque de crédibilité', 'Ajout des références textuelles avec disclaimers de vérification', 'P2'],
      ]
    ),
    spacer(),
    heading2('11.2 Tableau des améliorations recommandées'),
    spacer(),
    makeTable(
      ['#', 'Amélioration', 'Priorité', 'Justification'],
      [
        ['1', 'Avis juridique local par pays avant mise en œuvre', 'P1', 'Les textes évoluent rapidement et les informations peuvent ne pas être à jour'],
        ['2', 'Validation du statut de prestataire critique par les superviseurs bancaires', 'P1', 'Dépend de l\'appréciation du superviseur de chaque client institutionnel'],
        ['3', 'Audit de conformité initial par un cabinet tiers sur la cybersécurité', 'P2', 'Renforce la crédibilité auprès des clients et des superviseurs'],
        ['4', 'Mise en place d\'un comité de conformité interne chez OneKYC', 'P2', 'Garantit la pérennité de la conformité au-delà de la mission'],
        ['5', 'Négociation préalable des contrats d\'externalisation avec 2-3 clients pilotes', 'P2', 'Permet de valider le cadre contractuel avant généralisation'],
        ['6', 'Signature des DPA avec les sous-traitants techniques avant déploiement', 'P1', 'Obligation légale dans la plupart des juridictions'],
      ]
    ),
    spacer(),
    heading2('11.3 Synthèse de l\'audit interne'),
    spacer(),
    body(
      'L\'audit interne a permis d\'identifier 8 corrections obligatoires et 6 améliorations recommandées. Toutes les corrections obligatoires ont été intégrées dans la présente version révisée de l\'offre. Les améliorations recommandées sont soumises à l\'appréciation du client et pourront être intégrées dans la mission selon ses priorités.'
    ),
    spacer(),
    body(
      'La version révisée de l\'offre est désormais conforme aux standards suivants :'
    ),
    bullet('Conformité juridique : toutes les affirmations sont nuancées, sourcées ou assorties de disclaimers ;'),
    bullet('Conformité réglementaire : distinction claire entre exigences, pratiques de marché et recommandations ;'),
    bullet('Cohérence méthodologique : les 6 phases couvrent l\'ensemble des besoins identifiés, avec livrables optimisés ;'),
    bullet('Cohérence financière : prix fermes, budget détaillé, classification des coûts externes ;'),
    bullet('Transparence : rapport de Gap Analysis intégré, méthodologie de budgétisation explicite.'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateOneKYCProposal(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Offre Technique et Financière — OneKYC',
    description: 'Accompagnement réglementaire, juridique et de conformité pour OneKYC — KYC/KYB/UBO/AML/CFT — Afrique UEMOA/CEMAC',
    subject: 'Conformité numérique — Protection des données — KYC — AML/CFT — Fintech — RegTech',
    keywords: 'OneKYC, KYC, KYB, UBO, AML, CFT, conformité, protection des données, fintech, RegTech, BCEAO, COBAC, UEMOA, CEMAC, OHADA, GIABA, GABAC',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS — Offre Technique et Financière — OneKYC', size: 16, color: GRAY, font: 'Calibri' }),
                  new TextRun({ text: '    |    Réf. KE-ONEKYC-2026-001-R    |    CONFIDENTIEL', size: 16, color: GRAY, font: 'Calibri', italics: true }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' } },
                spacing: { after: 120 },
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS — khepraexperts.com    |    Page ', size: 16, color: GRAY, font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GRAY, font: 'Calibri' }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' } },
                spacing: { before: 120 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          ...coverPage(),
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
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}



