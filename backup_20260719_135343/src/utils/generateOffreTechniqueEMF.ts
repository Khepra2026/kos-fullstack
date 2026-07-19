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
          text: 'Cabinet de Conseil en Finance, Stratégie & Développement Institutionnel',
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
          text: 'Accompagnement à l\'obtention d\'agréments d\'Établissements de Microfinance (EMF)',
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
          text: 'Zone CEMAC — Cameroun | Gabon | Congo',
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
        new TextRun({ text: 'KE-EMF-CEMAC-2025-001', size: 20, font: 'Calibri', color: TEAL }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Date : ', bold: true, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: 'Avril 2025', size: 20, font: 'Calibri', color: GRAY }),
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
        new TextRun({ text: 'CONFIDENTIEL', bold: true, size: 20, font: 'Calibri', color: 'DC2626' }),
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
    { num: '1.', title: 'Contexte et compréhension de la mission', page: '3' },
    { num: '2.', title: 'Cadre réglementaire applicable — Zone CEMAC', page: '4' },
    { num: '3.', title: 'Objectifs de la mission', page: '6' },
    { num: '4.', title: 'Méthodologie d\'intervention', page: '7' },
    { num: '5.', title: 'Planification indicative', page: '12' },
    { num: '6.', title: 'Équipe projet', page: '13' },
    { num: '7.', title: 'Expérience et valeur ajoutée de KHEPRA EXPERTS', page: '14' },
    { num: '8.', title: 'Offre financière', page: '15' },
    { num: '9.', title: 'Conditions générales', page: '16' },
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

// ─── SECTION 1 : CONTEXTE ─────────────────────────────────────────────────────
function section1(): Paragraph[] {
  return [
    heading1('1. CONTEXTE ET COMPRÉHENSION DE LA MISSION'),
    spacer(),
    body(
      'Dans le cadre de sa stratégie de déploiement en Afrique Centrale, votre institution ambitionne la création d\'un réseau d\'Établissements de Microfinance (EMF) de 2ème catégorie, reposant sur un modèle innovant, digitalisé et scalable. Cette ambition s\'inscrit dans un contexte de forte demande d\'inclusion financière dans la zone CEMAC, où plus de 60% de la population adulte reste non bancarisée.'
    ),
    spacer(),
    body(
      'KHEPRA EXPERTS comprend que cette mission vise un accompagnement intégral, de bout en bout, incluant :'
    ),
    bullet('La structuration juridique des entités selon le droit OHADA et les législations nationales'),
    bullet('L\'ingénierie financière et stratégique adaptée aux marchés cibles'),
    bullet('La mise en conformité réglementaire COBAC selon le Règlement COBAC EMF-2002/01 et ses révisions'),
    bullet('La constitution, le dépôt et le suivi des dossiers d\'agrément auprès des autorités compétentes'),
    bullet('L\'obtention effective des agréments dans les trois pays cibles : Cameroun, Gabon et Congo'),
    spacer(),
    infoBox(
      'Notre approche s\'inscrit dans une logique de sécurisation réglementaire, d\'optimisation des délais et d\'excellence technique, avec une maîtrise avérée des exigences COBAC et des environnements institutionnels de la zone CEMAC.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 2 : CADRE RÉGLEMENTAIRE ─────────────────────────────────────────
function section2(): Paragraph[] {
  return [
    heading1('2. CADRE RÉGLEMENTAIRE APPLICABLE — ZONE CEMAC'),
    spacer(),
    heading2('2.1 Instruments réglementaires de la COBAC'),
    spacer(),
    body(
      'La Commission Bancaire de l\'Afrique Centrale (COBAC) constitue l\'autorité de supervision bancaire et financière de la zone CEMAC. L\'ensemble du dispositif réglementaire applicable aux EMF repose sur les textes fondamentaux suivants :'
    ),
    spacer(),
    heading3('A. Textes fondateurs et de référence'),
    bullet('Règlement COBAC EMF-2002/01 du 13 avril 2002 portant conditions d\'exercice et de contrôle de l\'activité de microfinance dans la CEMAC — texte fondateur définissant les trois catégories d\'EMF, les conditions d\'agrément, les normes prudentielles et les obligations de reporting'),
    bullet('Convention du 17 janvier 1992 portant harmonisation de la réglementation bancaire dans les États de l\'Afrique Centrale — cadre institutionnel de la COBAC'),
    bullet('Traité de la CEMAC du 16 mars 1994 et ses révisions — cadre institutionnel régional'),
    bullet('Acte Additionnel n°02/00-CEMAC-CCE-10 du 14 décembre 2000 relatif aux systèmes de paiement'),
    spacer(),
    heading3('B. Règlements prudentiels COBAC applicables aux EMF'),
    bullet('Règlement COBAC R-2009/01 relatif aux fonds propres des établissements de crédit et des EMF'),
    bullet('Règlement COBAC R-2010/01 portant sur la liquidité des établissements de crédit et des EMF'),
    bullet('Règlement COBAC R-2016/01 relatif à la gouvernance des établissements de crédit et des EMF'),
    bullet('Règlement COBAC R-2018/01 portant sur le dispositif de lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT) dans les établissements assujettis'),
    bullet('Règlement COBAC R-2019/01 relatif au contrôle interne dans les établissements de crédit et les EMF'),
    bullet('Règlement COBAC R-2021/01 portant sur la gestion des risques opérationnels et la continuité d\'activité'),
    spacer(),
    heading3('C. Textes relatifs à la microfinance digitale'),
    bullet('Règlement CEMAC n°01/17/CEMAC/UMAC/CM du 27 novembre 2017 relatif à la prévention et la répression du blanchiment des capitaux et du financement du terrorisme et de la prolifération en Afrique Centrale'),
    bullet('Règlement COBAC R-2020/01 relatif aux services financiers numériques et à la monnaie électronique'),
    bullet('Instruction COBAC I-2021/001 relative aux conditions d\'exercice des activités de monnaie électronique'),
    spacer(),
    heading3('D. Législations nationales complémentaires'),
    spacer(),
    makeTable(
      ['Pays', 'Texte national', 'Autorité de tutelle'],
      [
        ['Cameroun', 'Loi n°2003/004 du 21 avril 2003 relative aux EMF\nDécret n°2005/187 du 31 mai 2005 fixant les modalités d\'agrément', 'MINFI / COBAC'],
        ['Gabon', 'Loi n°001/2005 du 4 février 2005 relative aux établissements de crédit\nInstruction COBAC relative aux EMF au Gabon', 'DGBFIP / COBAC'],
        ['Congo', 'Loi n°6-96 du 6 mars 1996 portant réglementation des activités de microfinance\nArrêté n°2018-001 relatif aux conditions d\'agrément des EMF', 'MEFB / COBAC'],
      ]
    ),
    spacer(),
    heading2('2.2 Catégories d\'EMF et conditions d\'agrément'),
    spacer(),
    body(
      'Le Règlement COBAC EMF-2002/01 distingue trois catégories d\'EMF. La mission porte sur les EMF de 2ème catégorie, dont les caractéristiques sont les suivantes :'
    ),
    spacer(),
    makeTable(
      ['Critère', 'EMF 1ère catégorie', 'EMF 2ème catégorie (cible)', 'EMF 3ème catégorie'],
      [
        ['Collecte de dépôts', 'Non autorisée', 'Autorisée (membres uniquement)', 'Autorisée (public)'],
        ['Octroi de crédits', 'Oui', 'Oui', 'Oui'],
        ['Capital minimum', '25 millions FCFA', '50 millions FCFA', '300 millions FCFA'],
        ['Forme juridique', 'Association / GIE', 'SA / SARL / Coopérative', 'SA uniquement'],
        ['Agrément', 'Autorité nationale', 'COBAC', 'COBAC'],
        ['Supervision', 'Autorité nationale', 'COBAC', 'COBAC'],
      ]
    ),
    spacer(),
    noteBox(
      'Les EMF de 2ème catégorie sont soumis à l\'agrément direct de la COBAC et doivent respecter l\'ensemble des normes prudentielles définies dans le Règlement COBAC EMF-2002/01, notamment : ratio de solvabilité (≥ 10%), ratio de liquidité (≥ 100%), ratio de couverture des risques, et plafonds d\'engagement.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 3 : OBJECTIFS ────────────────────────────────────────────────────
function section3(): Paragraph[] {
  return [
    heading1('3. OBJECTIFS DE LA MISSION'),
    spacer(),
    body('La mission confiée à KHEPRA EXPERTS poursuit les objectifs stratégiques et opérationnels suivants :'),
    spacer(),
    heading2('3.1 Objectifs stratégiques'),
    bullet('Obtenir les agréments EMF de 2ème catégorie au Cameroun, au Gabon et au Congo dans les délais optimaux'),
    bullet('Structurer un modèle de microfinance digital performant, conforme aux meilleures pratiques internationales'),
    bullet('Garantir la conformité totale aux exigences COBAC et aux législations nationales des trois pays cibles'),
    bullet('Mettre en place une architecture organisationnelle robuste, scalable et adaptée aux marchés locaux'),
    spacer(),
    heading2('3.2 Objectifs opérationnels'),
    bullet('Élaborer un business plan solide sur 5 ans avec projections financières conformes aux ratios prudentiels COBAC'),
    bullet('Constituer des dossiers d\'agrément complets, conformes et sans lacunes susceptibles de retarder l\'instruction'),
    bullet('Rédiger l\'ensemble des manuels de procédures et dispositifs réglementaires requis par la COBAC'),
    bullet('Assurer l\'interface avec les autorités compétentes (COBAC, MINFI, DGBFIP, MEFB) tout au long du processus'),
    bullet('Accompagner les dirigeants lors des enquêtes de moralité et des auditions éventuelles'),
    spacer(),
    heading2('3.3 Livrables attendus'),
    spacer(),
    makeTable(
      ['Livrable', 'Description', 'Délai'],
      [
        ['Business Plan (x3)', 'Business plan complet sur 5 ans par pays, avec étude de marché, projections financières et ratios COBAC', 'Phase 2'],
        ['Dossiers juridiques (x3)', 'Statuts, PV AGC, PV CA, RCCM — par pays', 'Phase 3'],
        ['Manuel de procédures administratives', 'Procédures RH, administratives et opérationnelles', 'Phase 4'],
        ['Manuel de crédit et d\'épargne', 'Politique de crédit, scoring, recouvrement', 'Phase 4'],
        ['Manuel comptable et financier', 'Plan comptable COBAC, procédures comptables', 'Phase 4'],
        ['Manuel de contrôle interne', 'Dispositif de contrôle, audit interne, reporting COBAC', 'Phase 4'],
        ['Politique LBC/FT', 'Conformité Règlement COBAC R-2018/01', 'Phase 4'],
        ['Plan de Continuité d\'Activité', 'PCA conforme Règlement COBAC R-2021/01', 'Phase 4'],
        ['Note sur le SIG', 'Architecture technique, sécurité informatique', 'Phase 4'],
        ['Dossiers d\'agrément (x3)', 'Dossiers complets déposés auprès de la COBAC', 'Phase 5'],
        ['Rapport de suivi mensuel', 'État d\'avancement de l\'instruction par pays', 'Phase 6'],
      ]
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 4 : MÉTHODOLOGIE ─────────────────────────────────────────────────
function section4(): Paragraph[] {
  return [
    heading1('4. MÉTHODOLOGIE D\'INTERVENTION'),
    spacer(),
    body(
      'KHEPRA EXPERTS adopte une approche structurée en six phases séquentielles et interdépendantes, garantissant la complétude et la conformité de chaque livrable aux exigences de la COBAC.'
    ),
    spacer(),
    heading2('Phase 1 — Cadrage stratégique et collecte d\'informations'),
    infoBox('Durée estimée : 2 semaines | Livrable : Rapport de cadrage et feuille de route'),
    spacer(),
    body('Cette phase initiale vise à établir une compréhension partagée des objectifs et à collecter toutes les informations nécessaires à la conduite de la mission :'),
    bullet('Réunion de lancement avec les promoteurs et parties prenantes clés'),
    bullet('Analyse approfondie des objectifs stratégiques et du modèle d\'affaires envisagé'),
    bullet('Collecte des données actionnariales : identité des actionnaires, structure du capital, casiers judiciaires'),
    bullet('Collecte des données organisationnelles : organigramme cible, profils des dirigeants'),
    bullet('Définition du business model et des produits financiers (crédit, épargne, transfert, mobile money)'),
    bullet('Identification des exigences réglementaires spécifiques par pays (Cameroun, Gabon, Congo)'),
    bullet('Analyse des conditions de marché et de la concurrence dans chaque pays cible'),
    bullet('Identification des risques réglementaires et des points de vigilance COBAC'),
    spacer(),
    heading2('Phase 2 — Ingénierie de projet et Business Plan (5 ans)'),
    infoBox('Durée estimée : 4 semaines | Livrable : Business Plan complet x3 pays'),
    spacer(),
    body('Élaboration d\'un business plan détaillé et conforme aux exigences COBAC pour chacun des trois pays :'),
    spacer(),
    heading3('2.1 Étude de marché'),
    bullet('Analyse macroéconomique et financière du pays (PIB, inflation, taux de bancarisation)'),
    bullet('Cartographie du secteur de la microfinance (acteurs, parts de marché, produits)'),
    bullet('Analyse de la demande : segments cibles, besoins non couverts, potentiel de marché'),
    bullet('Analyse concurrentielle : EMF existants, banques, opérateurs mobile money'),
    bullet('Identification des zones géographiques prioritaires d\'implantation'),
    spacer(),
    heading3('2.2 Stratégie commerciale et de pénétration'),
    bullet('Définition du positionnement stratégique et de la proposition de valeur'),
    bullet('Stratégie de distribution (agences, agents, digital, mobile)'),
    bullet('Plan marketing et de communication'),
    bullet('Objectifs commerciaux sur 5 ans (nombre de clients, encours de crédit, dépôts)'),
    spacer(),
    heading3('2.3 Modèle opérationnel digital'),
    bullet('Architecture du système d\'information de gestion (SIG)'),
    bullet('Intégration mobile money et services financiers numériques'),
    bullet('Processus digitaux : onboarding client, scoring crédit, décaissement, remboursement'),
    bullet('Conformité au Règlement COBAC R-2020/01 sur les services financiers numériques'),
    spacer(),
    heading3('2.4 Projections financières'),
    bullet('Compte de résultat prévisionnel sur 5 ans'),
    bullet('Bilan prévisionnel sur 5 ans'),
    bullet('Plan de trésorerie (cash-flow) mensuel sur 2 ans, annuel sur 5 ans'),
    bullet('Calcul des ratios prudentiels COBAC : solvabilité (≥10%), liquidité (≥100%), couverture des risques'),
    bullet('Seuil de rentabilité et point mort'),
    bullet('Analyse de sensibilité et scénarios (optimiste, central, pessimiste)'),
    spacer(),
    heading2('Phase 3 — Structuration juridique et institutionnelle'),
    infoBox('Durée estimée : 3 semaines | Livrable : Dossiers juridiques complets x3 pays'),
    spacer(),
    body('Rédaction et constitution de l\'ensemble des documents juridiques requis pour la création des entités :'),
    bullet('Rédaction des statuts conformes au droit OHADA et aux législations nationales'),
    bullet('Procès-verbal de l\'Assemblée Générale Constitutive (AGC)'),
    bullet('Procès-verbal du Conseil d\'Administration (CA) — nomination des dirigeants'),
    bullet('Organisation de la gouvernance : Conseil d\'Administration, Direction Générale, Comités'),
    bullet('Constitution des dossiers RCCM (Registre du Commerce et du Crédit Mobilier)'),
    bullet('Préparation des dossiers de moralité des dirigeants et actionnaires'),
    bullet('Attestation de libération du capital minimum (50 millions FCFA par entité)'),
    spacer(),
    heading2('Phase 4 — Élaboration des dispositifs techniques'),
    infoBox('Durée estimée : 4 semaines | Livrable : 8 manuels et dispositifs réglementaires'),
    spacer(),
    heading3('4.1 Manuels de procédures'),
    bullet('Manuel de procédures administratives : RH, logistique, achats, gestion des agences'),
    bullet('Manuel de crédit et d\'épargne : politique de crédit, scoring, comités, recouvrement, produits d\'épargne'),
    bullet('Manuel comptable et financier : plan comptable COBAC, procédures comptables, reporting réglementaire'),
    bullet('Manuel de contrôle interne : dispositif de contrôle permanent et périodique, audit interne, reporting COBAC'),
    bullet('Code de déontologie et d\'éthique professionnelle'),
    spacer(),
    heading3('4.2 Dispositifs réglementaires'),
    bullet('Politique LBC/FT conforme au Règlement COBAC R-2018/01 et au Règlement CEMAC n°01/17 : identification des clients (KYC), surveillance des transactions, déclarations de soupçon, formation du personnel'),
    bullet('Plan de Continuité d\'Activité (PCA) conforme au Règlement COBAC R-2021/01 : analyse d\'impact, stratégies de continuité, procédures de reprise'),
    bullet('Dispositif de gestion des risques : cartographie des risques, indicateurs de risque (KRI), limites d\'exposition'),
    spacer(),
    heading3('4.3 Système d\'Information'),
    bullet('Note sur le Système d\'Information de Gestion (SIG) : spécifications fonctionnelles, critères de sélection'),
    bullet('Architecture technique : infrastructure, hébergement, sécurité des données'),
    bullet('Politique de sécurité informatique conforme aux exigences COBAC'),
    bullet('Plan de sauvegarde et de reprise après sinistre'),
    spacer(),
    heading2('Phase 5 — Montage et dépôt des dossiers d\'agrément'),
    infoBox('Durée estimée : 2 semaines | Livrable : Dossiers d\'agrément déposés x3 pays'),
    spacer(),
    body('Constitution et dépôt des dossiers d\'agrément complets auprès des autorités compétentes :'),
    bullet('Vérification de la complétude et de la conformité de chaque dossier selon la check-list COBAC'),
    bullet('Dépôt auprès du Ministère des Finances (MINFI au Cameroun, DGBFIP au Gabon, MEFB au Congo)'),
    bullet('Transmission à la COBAC pour instruction'),
    bullet('Interface avec les autorités : réponse aux demandes de compléments d\'information'),
    bullet('Gestion des observations formulées par la COBAC lors de l\'instruction'),
    spacer(),
    heading2('Phase 6 — Suivi jusqu\'à obtention des agréments'),
    infoBox('Durée estimée : 3 à 6 mois | Livrable : Agréments obtenus x3 pays'),
    spacer(),
    body('Accompagnement continu jusqu\'à l\'obtention des agréments définitifs :'),
    bullet('Suivi régulier de l\'état d\'instruction auprès de la COBAC et des ministères'),
    bullet('Assistance aux enquêtes de moralité des dirigeants et actionnaires'),
    bullet('Réponse aux demandes complémentaires des autorités dans les délais impartis'),
    bullet('Participation aux réunions et auditions éventuelles avec la COBAC'),
    bullet('Accompagnement jusqu\'à la notification des agréments définitifs'),
    bullet('Remise du rapport de clôture de mission'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 5 : PLANIFICATION ────────────────────────────────────────────────
function section5(): Paragraph[] {
  return [
    heading1('5. PLANIFICATION INDICATIVE'),
    spacer(),
    body(
      'Le calendrier ci-dessous est indicatif et sera affiné lors de la réunion de lancement. Les phases 1 à 5 sont menées en parallèle pour les trois pays, avec des adaptations spécifiques aux exigences nationales.'
    ),
    spacer(),
    makeTable(
      ['Phase', 'Activités principales', 'Durée', 'Mois'],
      [
        ['Phase 1 — Cadrage', 'Réunion de lancement, collecte d\'informations, analyse réglementaire', '2 semaines', 'M1'],
        ['Phase 2 — Business Plan', 'Étude de marché, projections financières, ratios COBAC', '4 semaines', 'M1-M2'],
        ['Phase 3 — Structuration juridique', 'Statuts, PV, RCCM, gouvernance', '3 semaines', 'M2-M3'],
        ['Phase 4 — Dispositifs techniques', 'Manuels, LBC/FT, PCA, SIG', '4 semaines', 'M3-M4'],
        ['Phase 5 — Dépôt dossiers', 'Constitution, vérification, dépôt COBAC', '2 semaines', 'M4-M5'],
        ['Phase 6 — Suivi agrément', 'Interface COBAC, réponses, enquêtes moralité', '3 à 6 mois', 'M5-M11'],
      ]
    ),
    spacer(),
    noteBox(
      'Les délais d\'instruction par la COBAC sont généralement de 3 à 6 mois à compter du dépôt d\'un dossier complet. KHEPRA EXPERTS s\'engage à maximiser la qualité des dossiers pour minimiser les demandes de compléments et accélérer l\'instruction.'
    ),
    spacer(),
    body('Points de contrôle et jalons clés :'),
    bullet('J+14 : Rapport de cadrage validé et feuille de route approuvée'),
    bullet('J+45 : Business plans des 3 pays livrés et validés'),
    bullet('J+66 : Dossiers juridiques constitués et entités créées'),
    bullet('J+94 : Ensemble des manuels et dispositifs réglementaires livrés'),
    bullet('J+108 : Dossiers d\'agrément déposés auprès de la COBAC'),
    bullet('J+108 à J+288 : Suivi de l\'instruction et obtention des agréments'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 6 : ÉQUIPE ───────────────────────────────────────────────────────
function section6(): Paragraph[] {
  return [
    heading1('6. ÉQUIPE PROJET'),
    spacer(),
    body(
      'KHEPRA EXPERTS mobilisera une équipe pluridisciplinaire de haut niveau, combinant expertise réglementaire COBAC, maîtrise du droit OHADA, ingénierie financière et connaissance approfondie des marchés d\'Afrique Centrale.'
    ),
    spacer(),
    makeTable(
      ['Profil', 'Rôle dans la mission', 'Expertise clé'],
      [
        ['Expert en ingénierie financière et microfinance', 'Chef de mission — Coordination globale, business plans, projections financières', 'Microfinance, finance inclusive, modélisation financière, ratios COBAC'],
        ['Juriste spécialisé OHADA', 'Structuration juridique, rédaction des statuts et actes constitutifs', 'Droit OHADA, droit des sociétés, droit bancaire CEMAC'],
        ['Expert conformité COBAC', 'Dispositifs réglementaires, LBC/FT, contrôle interne, dossiers d\'agrément', 'Réglementation COBAC, conformité bancaire, supervision financière'],
        ['Spécialiste systèmes d\'information bancaire', 'Note SIG, architecture technique, sécurité informatique', 'Core banking, mobile banking, fintech, cybersécurité'],
        ['Consultant en gestion des risques', 'Cartographie des risques, PCA, dispositif de gestion des risques', 'Risk management, Bâle II/III adapté, continuité d\'activité'],
        ['Consultant pays — Cameroun', 'Interface MINFI/COBAC Cameroun, connaissance du marché local', 'Réglementation camerounaise, réseau institutionnel'],
        ['Consultant pays — Gabon', 'Interface DGBFIP/COBAC Gabon, connaissance du marché local', 'Réglementation gabonaise, réseau institutionnel'],
        ['Consultant pays — Congo', 'Interface MEFB/COBAC Congo, connaissance du marché local', 'Réglementation congolaise, réseau institutionnel'],
      ]
    ),
    spacer(),
    infoBox(
      'L\'équipe est coordonnée par le Chef de mission qui assure la cohérence globale de la mission, la qualité des livrables et la communication avec le client. Des réunions de suivi hebdomadaires sont organisées avec le client tout au long de la mission.'
    ),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 7 : VALEUR AJOUTÉE ───────────────────────────────────────────────
function section7(): Paragraph[] {
  return [
    heading1('7. EXPÉRIENCE ET VALEUR AJOUTÉE DE KHEPRA EXPERTS'),
    spacer(),
    heading2('7.1 Positionnement et expertise'),
    body(
      'KHEPRA EXPERTS est un cabinet de conseil spécialisé dans la finance, la stratégie et le développement institutionnel en Afrique. Notre expertise couvre l\'ensemble de la chaîne de valeur du secteur financier africain, avec une spécialisation reconnue dans la microfinance et l\'inclusion financière.'
    ),
    spacer(),
    heading2('7.2 Avantages concurrentiels'),
    spacer(),
    makeTable(
      ['Avantage', 'Description'],
      [
        ['Maîtrise réglementaire COBAC', 'Connaissance approfondie du Règlement COBAC EMF-2002/01 et de l\'ensemble des textes prudentiels. Expérience directe avec les équipes de la COBAC.'],
        ['Expertise CEMAC/UEMOA', 'Présence et expérience dans les deux zones monétaires africaines. Compréhension des spécificités de chaque marché national.'],
        ['Approche orientée résultats', 'Notre engagement porte sur l\'obtention effective des agréments, pas seulement sur la production de documents. Taux de succès de 100% sur les dossiers d\'agrément accompagnés.'],
        ['Intégration digitale', 'Maîtrise des meilleures pratiques en microfinance digitale : mobile money, core banking, scoring algorithmique, onboarding digital.'],
        ['Méthodologie éprouvée', 'Processus structuré et accélérateur de délais, développé sur la base de nombreuses missions similaires. Check-lists COBAC propriétaires.'],
        ['Réseau institutionnel', 'Relations établies avec les autorités de régulation (COBAC, MINFI, BCEAO) et les acteurs clés du secteur financier africain.'],
        ['Approche multi-pays', 'Capacité à mener simultanément des missions dans plusieurs pays, avec des équipes locales dédiées dans chaque pays cible.'],
      ]
    ),
    spacer(),
    heading2('7.3 Références sectorielles'),
    body('KHEPRA EXPERTS a accompagné avec succès des institutions financières dans les domaines suivants :'),
    bullet('Structuration et agrément d\'établissements de microfinance en zone CEMAC et UEMOA'),
    bullet('Élaboration de business plans pour des EMF et des banques de développement'),
    bullet('Mise en conformité réglementaire COBAC et BCEAO'),
    bullet('Transformation digitale d\'institutions de microfinance'),
    bullet('Renforcement des capacités institutionnelles d\'EMF et d\'ONG financières'),
    bullet('Diagnostic organisationnel et stratégique d\'institutions financières'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 8 : OFFRE FINANCIÈRE ─────────────────────────────────────────────
function section8(): Paragraph[] {
  return [
    heading1('8. OFFRE FINANCIÈRE'),
    spacer(),
    heading2('8.1 Honoraires globaux'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Mission complète (3 pays) : 75 000 000 FCFA HT',
          bold: true,
          size: 28,
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
    heading2('8.2 Répartition par pays'),
    spacer(),
    makeTable(
      ['Pays', 'Montant (FCFA HT)', 'Observations'],
      [
        ['Cameroun', '20 000 000', 'Marché principal — dossier COBAC + MINFI'],
        ['Gabon', '15 000 000', 'Dossier COBAC + DGBFIP'],
        ['Congo', '15 000 000', 'Dossier COBAC + MEFB'],
        ['Coordination régionale & livrables transversaux', '25 000 000', 'Business plans, manuels, dispositifs réglementaires communs'],
        ['TOTAL HT', '75 000 000', '—'],
      ]
    ),
    spacer(),
    heading2('8.3 Répartition par composante'),
    spacer(),
    makeTable(
      ['Composante', 'Montant (FCFA HT)', '% du total'],
      [
        ['Phase 1 — Cadrage stratégique', '3 000 000', '4%'],
        ['Phase 2 — Business Plans (x3)', '18 000 000', '24%'],
        ['Phase 3 — Structuration juridique (x3)', '9 000 000', '12%'],
        ['Phase 4 — Dispositifs techniques et manuels', '15 000 000', '20%'],
        ['Phase 5 — Montage et dépôt des dossiers (x3)', '12 000 000', '16%'],
        ['Phase 6 — Suivi jusqu\'à obtention des agréments', '18 000 000', '24%'],
        ['TOTAL HT', '75 000 000', '100%'],
      ]
    ),
    spacer(),
    heading2('8.4 Modalités de paiement'),
    spacer(),
    makeTable(
      ['Tranche', 'Montant (FCFA HT)', 'Condition de déclenchement'],
      [
        ['1ère tranche — Avance de démarrage (40%)', '30 000 000', 'À la signature de la convention de mission'],
        ['2ème tranche (40%)', '30 000 000', 'Après dépôt des dossiers d\'agrément auprès de la COBAC pour les 3 pays'],
        ['3ème tranche — Solde (20%)', '15 000 000', 'Après obtention des avis favorables / agréments définitifs'],
      ]
    ),
    spacer(),
    noteBox(
      'Les honoraires n\'incluent pas : (i) les frais administratifs et réglementaires (frais de dossier COBAC, frais d\'enregistrement, droits de timbre) ; (ii) les frais de déplacement et missions terrain (transport, hébergement, per diem) ; (iii) les honoraires notariaux pour la constitution des sociétés. Ces frais seront facturés séparément sur présentation de justificatifs.'
    ),
    spacer(),
    heading2('8.5 Conditions de facturation'),
    bullet('Les honoraires sont libellés en Francs CFA (FCFA) et payables par virement bancaire'),
    bullet('Les factures sont émises en début de chaque tranche, avec un délai de règlement de 15 jours'),
    bullet('En cas de retard de paiement, des pénalités de 1,5% par mois seront appliquées'),
    bullet('La TVA applicable sera ajoutée conformément à la législation fiscale du pays de facturation'),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── SECTION 9 : CONDITIONS GÉNÉRALES ────────────────────────────────────────
function section9(): Paragraph[] {
  return [
    heading1('9. CONDITIONS GÉNÉRALES'),
    spacer(),
    heading2('9.1 Durée et validité de l\'offre'),
    bullet('La présente offre est valable 90 jours à compter de sa date d\'émission'),
    bullet('Passé ce délai, KHEPRA EXPERTS se réserve le droit de réviser les conditions financières'),
    spacer(),
    heading2('9.2 Obligations du client'),
    bullet('Fournir dans les délais convenus tous les documents et informations nécessaires à la mission'),
    bullet('Désigner un interlocuteur unique (point focal) pour la coordination de la mission'),
    bullet('Assurer la disponibilité des dirigeants et actionnaires pour les enquêtes de moralité'),
    bullet('Libérer le capital minimum requis (50 millions FCFA par entité) avant le dépôt des dossiers'),
    bullet('Régler les frais administratifs, réglementaires et notariaux directement auprès des autorités compétentes'),
    spacer(),
    heading2('9.3 Obligations de KHEPRA EXPERTS'),
    bullet('Respecter les délais convenus dans le planning de mission'),
    bullet('Garantir la confidentialité de toutes les informations communiquées par le client'),
    bullet('Livrer des documents de qualité professionnelle, conformes aux exigences COBAC'),
    bullet('Informer le client de tout risque ou obstacle identifié dans les meilleurs délais'),
    bullet('Assurer un reporting régulier sur l\'avancement de la mission'),
    spacer(),
    heading2('9.4 Confidentialité'),
    body(
      'KHEPRA EXPERTS s\'engage à maintenir la stricte confidentialité de toutes les informations communiquées dans le cadre de cette mission. Cet engagement de confidentialité est réciproque et s\'étend à l\'ensemble des membres de l\'équipe projet.'
    ),
    spacer(),
    heading2('9.5 Propriété intellectuelle'),
    body(
      'Les livrables produits dans le cadre de cette mission sont la propriété exclusive du client à compter du règlement intégral des honoraires. KHEPRA EXPERTS conserve le droit de mentionner cette mission dans ses références, sous réserve de l\'accord du client.'
    ),
    spacer(),
    heading2('9.6 Résolution des litiges'),
    body(
      'En cas de litige, les parties s\'engagent à rechercher une solution amiable dans un délai de 30 jours. À défaut, le litige sera soumis à la juridiction compétente du lieu du siège social de KHEPRA EXPERTS, conformément au droit OHADA.'
    ),
    spacer(),
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
      ['Pour KHEPRA EXPERTS', 'Pour le Client'],
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
          text: 'KHEPRA EXPERTS — Cabinet de Conseil en Finance, Stratégie & Développement Institutionnel',
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

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateOffreTechniqueEMF(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Offre Technique et Financière — Agrément EMF CEMAC',
    description: 'Accompagnement à l\'obtention d\'agréments d\'Établissements de Microfinance (EMF) — Zone CEMAC',
    subject: 'Microfinance — Agrément COBAC — Cameroun, Gabon, Congo',
    keywords: 'EMF, COBAC, CEMAC, microfinance, agrément, Cameroun, Gabon, Congo',
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
                  new TextRun({ text: 'KHEPRA EXPERTS — Offre Technique et Financière — Agrément EMF CEMAC', size: 16, color: GRAY, font: 'Calibri' }),
                  new TextRun({ text: '    |    Réf. KE-EMF-CEMAC-2025-001    |    CONFIDENTIEL', size: 16, color: GRAY, font: 'Calibri', italics: true }),
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
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}




