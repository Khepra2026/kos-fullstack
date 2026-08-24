import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, defaultBorders } from '';

export const roadmapParagraphs: Paragraph[] = [
  createHeading('7. FEUILLE DE ROUTE OPÉRATIONNELLE', 1),
  createParagraph(
    'La feuille de route opérationnelle détaille le calendrier de déploiement des activités de préparation des dossiers d\'agrément, de constitution des livrables, et de suivi de l\'instruction réglementaire. Elle est structurée en 4 phases alignées sur le contrat MSA KHEPRA × OPTASIA.'
  ),
  createHeading('7.1 Phase 1 — Pré-licensing & Cadrage (Mois 1-3)', 2),
  createParagraph('Objectif : établir les bases du projet, valider les hypothèses, et lancer les travaux préparatoires.'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Jalon', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Activité', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Livrable', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J1', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Kick-off du projet, constitution du Comité de Direction et du Comité de Pilotage Opérationnel. Nomination du Directeur de Mission Khepra.', { width: 40 }),
          createTableCell('PV de kick-off, organigramme de mission', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+7', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J2', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Diagnostic prudentiel initial par pays, cartographie des risques, identification des gaps critiques.', { width: 40 }),
          createTableCell('Livrable 1 (Présent document)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+30', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J3', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Validation du Business Model Canvas par pays, définition des produits/services, scoring alternatif, intégration Telco/Mobile Money.', { width: 40 }),
          createTableCell('Business Model Canvas (7 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+45', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J4', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Constitution des équipes projet Khepra, recrutement des experts locaux (juristes, comptables, IT), mobilisation des cabinets partenaires.', { width: 40 }),
          createTableCell('Plan de mobilisation des ressources', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+60', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J5', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Libération du capital social pilote (Togo, Bénin, Cameroun) et ouverture des comptes bancaires dédiés.', { width: 40 }),
          createTableCell('Certificats de dépôt de capital', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+90', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('7.2 Phase 2 — Ingénierie Réglementaire (Mois 4-8)', 2),
  createParagraph('Objectif : élaborer l\'ensemble des livrables réglementaires et préparer les dossiers de demande d\'agrément.'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Jalon', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Activité', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Livrable', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J6', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Élaboration des Business Plans sur 5 ans (SYSCOHADA) pour les 7 pays, avec projections financières, ratios de solvabilité et liquidité, et scénarios de stress.', { width: 40 }),
          createTableCell('Business Plans (7 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+120', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J7', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Rédaction des statuts juridiques (OHADA), des manuels de procédures (administratives, RH, opérationnelles, crédit/épargne, comptables), et du manuel de contrôle interne.', { width: 40 }),
          createTableCell('Statuts + Manuels (7 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+150', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J8', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Élaboration du Plan de Continuité d\'Activité (PCA), du dispositif LBC/FT, et de la note technique SIG (architecture, hébergement, sécurité).', { width: 40 }),
          createTableCell('PCA + LBC/FT + SIG (7 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+180', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J9', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Revue qualité interne Khepra (3 niveaux), validation par le Comité de Revue Qualité, et corrections éventuelles.', { width: 40 }),
          createTableCell('Attestations de conformité', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+210', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J10', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Préparation des dossiers de moralité (KYC, UBO, casiers judiciaires, attestations bancaires) pour les actionnaires et dirigeants.', { width: 40 }),
          createTableCell('Dossiers de moralité', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+240', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('7.3 Phase 3 — Dépôt & Instruction (Mois 9-14)', 2),
  createParagraph('Objectif : déposer les dossiers de demande d\'agrément et suivre l\'instruction jusqu\'à la décision finale.'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Jalon', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Activité', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Livrable', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J11', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Dépôt des dossiers pilotes (Togo, Bénin, Cameroun) auprès des Ministères des Finances et des Banques Centrales compétentes.', { width: 40 }),
          createTableCell('Accusés de réception officiels', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+270', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J12', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Suivi de l\'instruction, relances formelles, réponses aux réquisitions, préparation des auditions des dirigeants.', { width: 40 }),
          createTableCell('PV de suivi mensuels', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+300', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J13', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Avis des Commissions Bancaires et décisions des Ministères des Finances. Obtention des agréments pilotes.', { width: 40 }),
          createTableCell('Agréments officiels (Togo, Bénin, Cameroun)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+360', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J14', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Dépôt des dossiers de duplication (Burkina, Mali, Gabon, Congo) avec capital libéré et adaptation des livrables aux retours d\'expérience des pilotes.', { width: 40 }),
          createTableCell('Accusés de réception (4 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+390', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('7.4 Phase 4 — Duplication & Finalisation (Mois 15-24)', 2),
  createParagraph('Objectif : finaliser les agréments des pays de duplication, et assurer la conformité continue.'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Jalon', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Activité', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Livrable', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J15', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Suivi de l\'instruction des pays de duplication, relances, réponses aux réquisitions, auditions.', { width: 40 }),
          createTableCell('PV de suivi mensuels', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+450', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J16', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Obtention des agréments de duplication (Burkina, Mali, Gabon, Congo).', { width: 40 }),
          createTableCell('Agréments officiels (4 pays)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+540', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('J17', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Mise en place du dispositif de conformité continue (reporting prudentiel, audits internes, veille réglementaire), et transfert des livrables à OPTASIA.', { width: 40 }),
          createTableCell('Rapport de clôture, livrables finaux', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('J+720', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('7.5 Gouvernance de la mission', 2),
  createParagraph('La gouvernance du projet suit la structure définie dans le contrat MSA (Annexe C) :'),
  createBullet('Comité de Direction (4 membres : 2 Khepra, 2 Optasia) — réunion mensuelle, décisions à l\'unanimité, arbitrage des contentieux.', 'Niveau stratégique :'),
  createBullet('Comité de Pilotage Opérationnel (3 membres : Directeur de Mission Khepra, Point Focal Client, Responsable IT) — réunion bimensuelle, suivi des jalons, gestion des écarts.', 'Niveau opérationnel :'),
  createBullet('Cellule Projet Khepra (5-7 experts : juristes OHADA, ingénieurs financiers, experts réglementaires BCEAO/COBAC, IT/SIG, LBC/FT) — réunion hebdomadaire, exécution des livrables.', 'Niveau exécution :'),
  createBullet('Comité de Revue Qualité (3 experts seniors indépendants) — réunion trimestrielle, validation de la conformité des livrables, attestation de qualité.', 'Niveau qualité :'),
  new Paragraph({ text: '', pageBreakBefore: true }),
];



