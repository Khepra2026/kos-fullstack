import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  convertInchesToTwip,
  Packer,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
} from 'docx';

const HEADER_COLOR = "1B2A3A";
const ACCENT_COLOR = "7A1818";
const BODY_COLOR = "1F2937";

function createHeader(text: string, level: number = 1): Paragraph {
  return new Paragraph({
    text,
    heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
    spacing: { before: level === 1 ? 400 : 280, after: level === 1 ? 200 : 140 },
    alignment: level === 1 ? AlignmentType.CENTER : AlignmentType.LEFT,
    bold: true,
    color: level === 1 ? HEADER_COLOR : ACCENT_COLOR,
    font: "Times New Roman",
    size: level === 1 ? 28 : level === 2 ? 24 : 22,
  });
}

function createParagraph(text: string, options?: { bold?: boolean; italic?: boolean; indent?: boolean; spacing?: { before?: number; after?: number }; color?: string }): Paragraph {
  return new Paragraph({
    spacing: options?.spacing || { after: 160, before: 80 },
    indent: options?.indent ? { left: convertInchesToTwip(0.3) } : undefined,
    children: [
      new TextRun({
        text,
        font: "Times New Roman",
        size: 22,
        color: options?.color || BODY_COLOR,
        bold: options?.bold || false,
        italic: options?.italic || false,
      }),
    ],
    alignment: AlignmentType.JUSTIFIED,
  });
}

function createBullet(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100, before: 60 },
    indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
    children: [
      new TextRun({ text: "• ", font: "Times New Roman", size: 22, color: ACCENT_COLOR, bold: true }),
      new TextRun({ text, font: "Times New Roman", size: 22, color: BODY_COLOR }),
    ],
    alignment: AlignmentType.JUSTIFIED,
  });
}

function createNumberedItem(num: string, text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 100, before: 60 },
    indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.3) },
    children: [
      new TextRun({ text: `${num}. `, font: "Times New Roman", size: 22, color: ACCENT_COLOR, bold: true }),
      new TextRun({ text, font: "Times New Roman", size: 22, color: BODY_COLOR }),
    ],
    alignment: AlignmentType.JUSTIFIED,
  });
}

function createCell(text: string, options?: { bold?: boolean; width?: number; bgColor?: string; color?: string }): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: "Times New Roman",
            size: 18,
            bold: options?.bold || false,
            color: options?.color || BODY_COLOR,
          }),
        ],
        alignment: AlignmentType.LEFT,
      }),
    ],
    width: { size: options?.width || 20, type: WidthType.PERCENTAGE },
    shading: options?.bgColor ? { fill: options.bgColor, type: "clear" } : undefined,
    verticalAlign: "center",
  });
}

export async function generateRapportIngenierieOptasia(): Promise<Blob> {
  const thinBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  };

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1.0),
            right: convertInchesToTwip(1.0),
            bottom: convertInchesToTwip(1.0),
            left: convertInchesToTwip(1.0),
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: "KHEPRA EXPERTS — ", font: "Times New Roman", size: 16, color: "6B7280", bold: true }),
                new TextRun({ text: "Rapport d'Ingénierie Prudentielle, Structurelle et Conventionnelle de Gouvernance", font: "Times New Roman", size: 16, color: "6B7280", italic: true }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR } },
              spacing: { after: 0 },
              children: [],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR } },
              spacing: { before: 0 },
              children: [],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "CONFIDENTIEL — STRICTEMENT PRIVÉ — DESTINATAIRE : COMITÉ EXÉCUTIF OPTASIA ET RÉGULATEURS PRUDENTIELS", font: "Times New Roman", size: 14, color: "9CA3AF", italic: true }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Page ", font: "Times New Roman", size: 16, color: "6B7280" }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Times New Roman", size: 16, color: "6B7280" }),
                new TextRun({ text: " / ", font: "Times New Roman", size: 16, color: "6B7280" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Times New Roman", size: 16, color: "6B7280" }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }),
      },
      children: [
        // === PAGE DE GARDE ===
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          children: [
            new TextRun({
              text: "RAPPORT D'INGÉNIERIE PRUDENTIELLE, STRUCTURELLE ET CONVENTIONNELLE DE GOUVERNANCE",
              font: "Times New Roman",
              size: 28,
              bold: true,
              color: HEADER_COLOR,
              allCaps: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Groupe OPTASIA — Déploiement Panafricain de Filiales de Microfinance Digitale (SA)",
              font: "Times New Roman",
              size: 24,
              color: ACCENT_COLOR,
              bold: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Zones UEMOA (Togo, Bénin, Burkina Faso, Mali) et CEMAC (Cameroun, Congo, Gabon)",
              font: "Times New Roman",
              size: 22,
              color: BODY_COLOR,
              italic: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 12, color: ACCENT_COLOR } },
          spacing: { before: 200, after: 200 },
          children: [],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "OBJET : ", font: "Times New Roman", size: 22, bold: true, color: ACCENT_COLOR }),
            new TextRun({
              text: "Arbitrage des options de gouvernance, structuration du cadre juridique, conception des conventions d'assistance technique conformes aux règles de prix de transfert, et sécurisation des flux transfrontaliers sous le contrôle des changes BCEAO / BEAC.",
              font: "Times New Roman",
              size: 22,
              color: BODY_COLOR,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 300 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "DESTINATAIRES : ", font: "Times New Roman", size: 22, bold: true, color: ACCENT_COLOR }),
            new TextRun({
              text: "Comité Exécutif du Groupe OPTASIA ; Commission Bancaire de l'UMOA ; Banque Centrale des États de l'Afrique de l'Ouest (BCEAO) ; Commission Bancaire de l'Afrique Centrale (COBAC) ; Banque des États de l'Afrique Centrale (BEAC).",
              font: "Times New Roman",
              size: 22,
              color: BODY_COLOR,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "RÉFÉRENCE : ", font: "Times New Roman", size: 22, bold: true, color: ACCENT_COLOR }),
            new TextRun({
              text: "KE-OPT-ING-2026-003-V1.0",
              font: "Times New Roman",
              size: 22,
              color: BODY_COLOR,
              bold: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "DATE : ", font: "Times New Roman", size: 22, bold: true, color: ACCENT_COLOR }),
            new TextRun({
              text: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
              font: "Times New Roman",
              size: 22,
              color: BODY_COLOR,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "CLASSIFICATION : ", font: "Times New Roman", size: 22, bold: true, color: ACCENT_COLOR }),
            new TextRun({
              text: "CONFIDENTIEL — STRICTEMENT PRIVÉ — USAGE INTERNE ET RÉGULATEURS UNIQUEMENT",
              font: "Times New Roman",
              size: 22,
              color: "DC2626",
              bold: true,
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 400 },
        }),
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 12, color: ACCENT_COLOR } },
          spacing: { before: 200, after: 200 },
          children: [],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Rédigé par le collège d'Experts KHEPRA EXPERTS : Analyste Prudentiel BCEAO/COBAC, Fiscaliste OHADA, Spécialiste des Prix de Transfert appliqués aux groupes Fintech et Microfinance panafricains.",
              font: "Times New Roman",
              size: 18,
              color: "6B7280",
              italic: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),

        // === SECTION 1 ===
        new Paragraph({ pageBreakBefore: true }),
        createHeader("SECTION 1 — ARBITRAGE DES OPTIONS DE GOUVERNANCE", 1),
        createParagraph(
          "Le présent rapport procède à l'analyse comparative des deux options de gouvernance envisagées par le Groupe OPTASIA pour le déploiement de six à sept filiales de microfinance digitale (SA) en zone UEMOA et CEMAC. Cette analyse est menée sous l'angle prudentiel, fiscal et réglementaire, conformément aux exigences des autorités de supervision bancaire africaines.",
        ),
        createHeader("1.1 L'Option 1 : Centralisation financière et technologique à Dubaï", 2),
        createParagraph(
          "L'option de centralisation à Dubaï, assortie d'un hub camerounais passif dépourvu de substance économique réelle, présente un caractère d'inviabilité réglementaire avéré. Les arguments suivants fondent cette conclusion :",
          { bold: true, color: ACCENT_COLOR },
        ),
        createNumberedItem("a", "Absence de substance économique : un établissement stable de droit international ne peut être constitué sans effectifs locaux significatifs, sans décideurs opérationnels résidents et sans infrastructure matérielle démontrable. Les inspecteurs prudentiels BCEAO et COBAC considèrent systématiquement de telles structures comme des coquilles offshore (shell entities), inadmissibles dans le périmètre de consolidation d'un groupe financier agréé en zone SFD/EMF."),
        createNumberedItem("b", "Risque d'établissement stable (permanent establishment) : la Direction des Impôts des États membres UEMOA et CEMAC peut requalifier la structure camerounaise en établissement stable du groupe, imposant une taxation locale rétroactive sur les profits réalisés, avec pénalités et intérêts de retard."),
        createNumberedItem("c", "Non-conformité au contrôle des changes : les transferts de revenus vers Dubaï, en l'absence de conventions réglementées préalablement validées, sont assimilables à des mouvements de capitaux dissimulés. Les instructions BCEAO (Instruction 008/2020/CM/UEMOA) et BEAC (Règlement n°02/18/CEMAC/UMAC/CM) imposent une justification documentaire stricte de tout flux transfrontalier intra-groupe."),
        createNumberedItem("d", "Perception de « coquille offshore » : la réputation du groupe OPTASIA serait irréversiblement affectée si une inspection COBAC ou une enquête du Service Central des Risques Bancaires (SCRB) révélait une structure factice. Le rejet de l'agrément SFD ou EMF serait alors quasi-certain."),
        createNumberedItem("e", "Rejet probable des agréments SFD/EMF : la circulaire BCEAO aux SFD (n°SFD/2023/01) et les instructions COBAC aux EMF exigent la démonstration d'une gouvernance locale réelle, d'un organigramme effectif et d'une direction générale résidente. Une centralisation à Dubaï ne satisfait à aucune de ces conditions."),

        createHeader("1.2 L'Option 2 : Hub Cameroun opérationnel structuré", 2),
        createParagraph(
          "L'option consistant à ériger le Cameroun en hub régional opérationnel, doté de fonctions BPO (Business Process Outsourcing), IT, risques, conformité et supervision, constitue l'unique voie viable. Les avantages prudentiels sont déterminants :",
          { bold: true, color: "047857" },
        ),
        createBullet("Équipes locales démontrables : le hub héberge des effectifs permanents (minimum 15-20 collaborateurs) avec des contrats de travail locaux, un registre du personnel et des fiches de paie soumises aux inspections sociales et fiscales."),
        createBullet("Gouvernance régionale affirmée : un Conseil de Surveillance ou un Comité Stratégique régional siège au Cameroun, avec des procès-verbaux datés, signés et archivés conformément aux exigences OHADA."),
        createBullet("Fonctions risques, conformité et audit : le hub abrite un Responsable Conformité régional (RCC), un Responsable Risques (RRC) et un auditeur interne indépendant, tous trois avec des mandats distincts et des lignes de reporting au Comité d'Audit du groupe."),
        createBullet("Infrastructure BPO réelle : les centres de traitement opérationnel (back-office, scoring, recouvrement, service client) sont physiquement implantés au Cameroun, avec des baux commerciaux, des équipements immatriculés et des logs systèmes traçables."),

        createHeader("1.3 Recommandation formelle et approche progressive", 2),
        createParagraph(
          "Il est impératif de valider l'Option 2 et d'abandonner définitivement l'Option 1, dont le seul effet serait de placer le groupe OPTASIA en position de non-conformité structurelle avec un risque de retrait d'agrément à terme. Une approche progressive est recommandée :",
          { bold: true },
        ),
        createParagraph(
          "Phase 1 (0 à 12 mois) — Refacturation prudente des coûts essentiels",
          { bold: true, color: ACCENT_COLOR },
        ),
        createBullet("Taux de refacturation : environ 1 % du PNB consolidé des filiales."),
        createBullet("Base : coûts réels des fonctions IT essentielles (hébergement cloud, maintenance des API, licences logicielles) et des frais de conformité de base."),
        createBullet("Justificatifs : factures fournisseurs, contrats de licence, time-sheets minimales."),
        createBullet("Objectif : démontrer la réalité des prestations sans créer de distorsion fiscale ni de soupçon de transfert artificiel de bénéfices."),

        createParagraph(
          "Phase 2 (12 à 24 mois) — Modèle BPO régional structuré",
          { bold: true, color: ACCENT_COLOR },
        ),
        createBullet("Taux de refacturation : 3 % à 5 % du PNB consolidé, en fonction de la maturité des filiales et du volume des prestations effectivement rendues."),
        createBullet("Base élargie : IT/IA scoring, RH/Risk/Compliance, Finance/Comptabilité régionale, supervision digitale."),
        createBullet("Justificatifs : rapports de conformité, rapports d'audit interne, SLA (Service Level Agreements), PV techniques, logs systèmes, reporting risques mensuels."),
        createBullet("Objectif : atteindre une structuration conforme au principe de pleine concurrence OCDE, avec une documentation complète et auditée annuellement par un cabinet Big Four."),

        // === SECTION 2 ===
        new Paragraph({ pageBreakBefore: true }),
        createHeader("SECTION 2 — CADRE JURIDIQUE ET GOUVERNANCE", 1),
        createParagraph(
          "La structuration juridique des filiales SFD/EMF du groupe OPTASIA doit satisfaire simultanément aux exigences de l'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du groupement d'intérêt économique, aux instructions prudentielles BCEAO et COBAC, et aux standards internationaux de gouvernance d'entreprise (IFC, Banque Mondiale, OIT).",
        ),

        createHeader("2.1 Capital social et sous-capitalisation", 2),
        createParagraph(
          "Il est impératif de doter chaque filiale d'un capital social minimum de 1 000 000 000 FCFA (un milliard de francs CFA). Ce montant :",
        ),
        createBullet("prévient tout grief de sous-capitalisation, détectable lors des inspections COBAC/BCEAO et sanctionnable par mise en demeure ou retrait d'agrément ;"),
        createBullet("démontre la viabilité financière de la filiale aux yeux des bailleurs de fonds (IFC, BIDC, BOAD, FMO) ;"),
        createBullet("constitue un tampon prudentiel initial conforme aux ratios de solvabilité SFD/EMF (fonds propres / encours brut minimum 12 % selon la circulaire BCEAO n°SFD/2022/03 et l'instruction COBAC n°EMF/2021/02)."),

        createHeader("2.2 Gouvernance d'entreprise", 2),
        createParagraph("La gouvernance doit répondre aux standards suivants :", { bold: true }),
        createNumberedItem("a", "Conseil d'Administration actif : au minimum cinq membres, dont deux administrateurs indépendants locaux (ressortissants des pays d'implantation), nommés pour quatre ans renouvelables une fois. Les administrateurs doivent justifier d'une expertise en finance, microfinance ou réglementation bancaire."),
        createNumberedItem("b", "Comité des Risques et de la Conformité (CRC) : se réunit trimestriellement sous la présidence d'un administrateur indépendant. Il valide la politique de risque, examine les rapports de conformité LBC/FT et statue sur les déclarations de soupçons."),
        createNumberedItem("c", "Comité d'Audit (CA) : se réunit semestriellement avec le commissaire aux comptes et l'auditeur interne. Il examine les états financiers, les rapports de l'inspection interne et les recommandations des auditeurs externes."),
        createNumberedItem("d", "Séparation PCA / DG : conformément à l'Acte Uniforme OHADA (art. 411-1 et s.) et aux exigences prudentielles BCEAO/COBAC, le Président du Conseil d'Administration (PCA) ne peut cumuler la fonction de Directeur Général (DG). Cette séparation garantit l'équilibre des pouvoirs et prévient les conflits d'intérêts."),

        createHeader("2.3 Dispositifs obligatoires", 2),
        createParagraph("Chaque filiale doit disposer des dispositifs suivants, documentés et opérationnels dès l'obtention de l'agrément :", { bold: true }),
        createBullet("Dispositif de conformité : manuel de conformité approuvé par le CRC, cartographie des risques LBC/FT actualisée semestriellement, déclaration de soupçon automatisée vers la cellule TRACFIN/TRACEF / NGIB / NAFI (selon juridiction)."),
        createBullet("Audit interne : charte d'audit interne validée par le CA, plan annuel d'audit couvrant 100 % des agences et des processus critiques dans les 12 mois, reporting direct au CA sans contournement par la direction générale."),
        createBullet("Gestion des risques : politique de gestion des risques approuvée par le CA, limites de crédit par segment, stress tests trimestriels sur le portefeuille de crédit, provisionnement conforme à la norme SYSCOHADA révisée et aux instructions BCEAO/COBAC."),
        createBullet("Cybersécurité : politique de sécurité des systèmes d'information (PSSI) certifiée ISO 27001 ou équivalent, tests d'intrusion annuels par un prestataire externe, plan de continuité d'activité (PCA/PRA) testé semestriellement."),
        createBullet("Continuité d'activité : plan de reprise d'activité (PRA) couvrant les scénarios catastrophe (incendie, inondation, cyberattaque, panne réseau), avec un site de secours et des exercices annuels documentés."),

        // === SECTION 3 ===
        new Paragraph({ pageBreakBefore: true }),
        createHeader("SECTION 3 — CONVENTIONS D'ASSISTANCE TECHNIQUE ET PRIX DE TRANSFERT", 1),
        createParagraph(
          "Les conventions d'assistance technique intra-groupe constituent le nerf de la guerre prudentielle et fiscale. Les autorités BCEAO, COBAC et les directions des impôts des États membres rejettent unanimement les conventions indexées sur le PNB, le chiffre d'affaires ou les encours, qu'ils considèrent comme des dispositifs de transfert artificiel de bénéfices.",
        ),

        createHeader("3.1 Incompatibilité des conventions indexées sur le PNB ou les encours", 2),
        createParagraph(
          "Une redevance technique calculée comme un pourcentage fixe du PNB ou des encours d'une filiale SFD/EMF viole le principe de pleine concurrence OCDE pour les raisons suivantes :",
        ),
        createBullet("Absence de corrélation causale : le PNB d'une filiale ne dépend pas directement de la prestation rendue par le hub. Une filiale au portefeuille mature génère un PNB élevé malgré une faible utilisation des services du hub, créant une distorsion économique."),
        createBullet("Risque de requalification fiscale : l'administration fiscale peut requalifier la redevance en distribution de dividendes déguisée, imposant une retenue à la source de 15 % à 17 % (selon les conventions fiscales bilatérales) et des pénalités pouvant atteindre 100 % du montant réclamé."),
        createBullet("Rejet prudentiel : la Commission Bancaire de l'UMOA et le COBAC considèrent de telles conventions comme des dispositifs d'évitement prudentiel visant à réduire artificiellement les fonds propres des filiales locales."),

        createHeader("3.2 Modèle conforme fondé sur la méthode Cost-Plus", 2),
        createParagraph(
          "Le modèle recommandé repose sur la méthode Cost-Plus (coût majoré), conforme aux Principes de Prix de Transfert OCDE (2022) et applicable aux prestations de services intra-groupe à faible valeur ajoutée (BPO, IT, conformité). La tarification au réel repose sur les éléments suivants :",
          { bold: true },
        ),
        createBullet("Méthode Cost-Plus : les coûts directs et indirects supportés par le hub sont identifiés, répartis sur la base d'une unité d'œuvre pertinente, et majorés d'une marge bénéficiaire de 3 % à 7 % (benchmark sectoriel des prestations IT et BPO en Afrique subsaharienne, étude Big Four 2024)."),
        createBullet("Unités d'œuvre : chaque prestation est mesurée par une unité d'œuvre objective et vérifiable — nombre d'API appelées, nombre de requêtes de scoring IA, heures de temps passé (timesheets auditées), nombre de rapports de conformité produits, nombre d'audits internes réalisés."),
        createBullet("Coûts analytiques documentés : chaque coût supporté par le hub est documenté par une pièce comptable (facture, bulletin de paie, amortissement immobilisation) et réparti selon une clé de répartition objective (nombre d'utilisateurs, volume de transactions, encours géré)."),
        createBullet("Principe de pleine concurrence OCDE : la marge appliquée doit être comparable à celle qu'une entreprise indépendante accepterait pour des prestations similaires dans des conditions de marché. Une étude de comparables (comparable uncontrolled price / cost-plus) doit être réalisée annuellement et archivée."),

        createHeader("3.3 Tableau analytique des prestations et refacturations", 2),
        createParagraph("Le tableau ci-dessous structure l'ensemble des prestations, leurs bases de calcul, leurs clés de répartition et les justificatifs exigés :", { bold: true }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell("Prestation", { bold: true, width: 20, bgColor: "1B2A3A", color: "FFFFFF" }),
                createCell("Base de calcul", { bold: true, width: 20, bgColor: "1B2A3A", color: "FFFFFF" }),
                createCell("Clé de répartition", { bold: true, width: 20, bgColor: "1B2A3A", color: "FFFFFF" }),
                createCell("Justificatif exigé", { bold: true, width: 25, bgColor: "1B2A3A", color: "FFFFFF" }),
                createCell("Risque prudentiel couvert", { bold: true, width: 15, bgColor: "1B2A3A", color: "FFFFFF" }),
              ],
            }),
            new TableRow({
              children: [
                createCell("IT / IA Scoring"),
                createCell("Coût par API ou requête (FCFA/requête)"),
                createCell("Volume de requêtes mensuel par filiale"),
                createCell("Logs systèmes timestampés, contrats de licence, factures cloud (AWS/Azure), time-sheets équipe IT"),
                createCell("Risque modèle, risque algorithmique"),
              ],
            }),
            new TableRow({
              children: [
                createCell("RH / Risk / Compliance"),
                createCell("Temps passé (jours/homme × taux journalier benchmarké)"),
                createCell("Nombre de filiales supervisées + complexité réglementaire locale"),
                createCell("Timesheets signées et auditées, fiches de paie, missions d'audit interne"),
                createCell("Risque LBC/FT, risque conformité, risque réputationnel"),
              ],
            }),
            new TableRow({
              children: [
                createCell("Finance / Comptabilité"),
                createCell("Allocation analytique réelle (temps passé + système ERP)"),
                createCell("Nombre d'écritures comptables / volume de transactions"),
                createCell("Rapports comptables consolidés, PV de validation des états financiers, rapports commissaires aux comptes"),
                createCell("Risque comptable, risque reporting prudentiel"),
              ],
            }),
            new TableRow({
              children: [
                createCell("Supervision digitale / BPO"),
                createCell("Coût par compte actif ou par transaction traitée"),
                createCell("Nombre de comptes actifs par filiale"),
                createCell("Contrats BPO, SLA mensuels, rapports de performance (KPI : Taux de disponibilité > 99,5 %, Taux de résolution < 4h)"),
                createCell("Risque opérationnel, risque technologique"),
              ],
            }),
            new TableRow({
              children: [
                createCell("Formation / Renforcement capacités"),
                createCell("Coût par module de formation × nombre de participants"),
                createCell("Effectifs formés par filiale et par niveau hiérarchique"),
                createCell("Programmes de formation, attestations de présence, évaluations de satisfaction (score > 4/5)"),
                createCell("Risque compétences, risque gouvernance"),
              ],
            }),
          ],
          borders: thinBorder,
        }),

        createParagraph("", { spacing: { before: 200, after: 100 } }),
        createParagraph(
          "Livrables annexés obligatoires à chaque convention réglementée :",
          { bold: true, color: ACCENT_COLOR },
        ),
        createBullet("Rapports de conformité trimestriels (LBC/FT, protection des données, cybersécurité)."),
        createBullet("Rapports d'audit interne semestriels avec plan d'action et suivi."),
        createBullet("SLA (Service Level Agreements) mensuels avec indicateurs quantifiés et pénalités de non-performance."),
        createBullet("PV techniques des réunions de coordination intra-groupe (mensuelles minimum)."),
        createBullet("Logs systèmes complets (accès, modifications, transactions) conservés 10 ans."),
        createBullet("Reporting risques consolidé mensuel adressé au CRC du groupe et à chaque filiale."),

        // === SECTION 4 ===
        new Paragraph({ pageBreakBefore: true }),
        createHeader("SECTION 4 — CONTRÔLE DES CHANGES ET SÉCURISATION DES FLUX", 1),
        createParagraph(
          "La sécurisation des flux transfrontaliers intra-groupe constitue l'ultime verrou de la conformité. Tout transfert de fonds entre le hub Cameroun et les filiales UEMOA/CEMAC, ou entre le groupe et des entités tierces, est soumis à un contrôle strict des changes et à une procédure de validation hiérarchique.",
        ),

        createHeader("4.1 Procédure des conventions réglementées", 2),
        createParagraph("Toute convention intra-groupe donnant lieu à un flux financier transfrontalier doit suivre la procédure suivante :", { bold: true }),
        createNumberedItem("1", "Validation par le Conseil d'Administration : chaque convention est soumise au CA de la filiale bénéficiaire et du hub, avec un rapport du Responsable Conformité attestant de la cohérence économique et du respect du principe de pleine concurrence."),
        createNumberedItem("2", "Avis des commissaires aux comptes : les commissaires aux comptes des deux entités contractantes émettent un avis sur la régularité comptable et fiscale de la convention, avec une attestation de conformité au droit des prix de transfert OHADA / OCDE."),
        createNumberedItem("3", "Approbation prudentielle préalable : la convention est transmise à la Commission Bancaire de l'UMOA (pour les filiales UEMOA) ou au COBAC (pour les filiales CEMAC) pour approbation préalable. L'absence de réponse dans un délai de 60 jours ouvrés vaut tacite approbation, sous réserve de l'absence d'objection écrite."),
        createNumberedItem("4", "Enregistrement contractuel : le contrat est enregistré auprès des services des impôts des deux juridictions contractantes, conformément à l'Acte Uniforme OHADA relatif au droit commercial général et aux exigences locales de formalisation des contrats."),

        createHeader("4.2 Exigences BCEAO / BEAC relatives aux transferts internationaux", 2),
        createParagraph("Les banques centrales africaines imposent les exigences suivantes pour tout transfert transfrontalier intra-groupe :", { bold: true }),
        createBullet("Justificatifs bancaires : chaque virement doit être accompagné d'une facture détaillée (numérotation séquentielle, description des prestations, période couverte, unités d'œuvre), d'un bon de commande validé par la direction financière de la filiale et d'un certificat de réalisation des prestations signé par le responsable fonctionnel."),
        createBullet("Contrats enregistrés : les conventions doivent être déposées auprès de la banque centrale compétente (BCEAO pour l'UEMOA, BEAC pour la CEMAC) dans un délai de 30 jours suivant leur signature. Un récépissé d'enregistrement est conservé dans le dossier permanent de conformité."),
        createBullet("Déclaration périodique : les flux trimestriels sont consolidés et déclarés via le reporting prudentiel réglementaire (R1 pour BCEAO, R01/R02 pour COBAC), avec une annexe détaillant les montants, les bénéficiaires et les justificatifs."),
        createBullet("Plafonds et ratios : les redevances techniques ne peuvent excéder 5 % du PNB net de la filiale (plafond prudentiel recommandé par la BCEAO et le COBAC pour les prestations de services intra-groupe à faible valeur ajoutée)."),

        createHeader("4.3 Risques en cas de non-conformité", 2),
        createParagraph(
          "Le non-respect des obligations de contrôle des changes et de formalisation des conventions réglementées expose le Groupe OPTASIA aux risques suivants, cumulables et potentiellement mortels pour le projet :",
          { bold: true, color: ACCENT_COLOR },
        ),
        createBullet("Gel des paiements : la BCEAO ou la BEAC peut ordonner le blocage de tout transfert sortant d'une filiale vers le hub ou l'étranger, paralysant la trésorerie du groupe et créant un défaut de paiement en cascade."),
        createBullet("Requalification fiscale : les services fiscaux peuvent requalifier les redevances techniques en distributions de dividendes, imposant une retenue à la source (15 % à 17 %) majorée de pénalités (100 % du montant en cas de mauvaise foi démontrée)."),
        createBullet("Sanctions de change : l'inexécution des formalités de déclaration peut entraîner des sanctions administratives (amendes de 10 % à 50 % du montant des opérations irrégulières) et des sanctions pénales (emprisonnement de 1 à 5 ans et confiscation des sommes en cause pour les dirigeants responsables)."),
        createBullet("Refus d'agrément : la non-conformité structurelle au contrôle des changes et au prix de transfert constitue un motif de rejet explicite de la demande d'agrément SFD ou EMF. Une fois l'agrément refusé, la filiale ne peut légalement exercer et doit cesser toute activité."),

        // === CONCLUSION ===
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 12, color: ACCENT_COLOR } },
          spacing: { before: 200, after: 200 },
          children: [],
        }),
        createHeader("CONCLUSION ET RECOMMANDATIONS EXÉCUTIVES", 1),
        createParagraph(
          "Le déploiement panafricain du Groupe OPTASIA ne peut réussir que sous trois conditions cumulatives, non négociables :",
          { bold: true },
        ),
        createNumberedItem("1", "Abandon immédiat de l'Option 1 (centralisation à Dubaï avec hub passif) au profit de l'Option 2 (hub Cameroun opérationnel avec substance économique, équipes locales, gouvernance régionale et fonctions BPO/Risques/Conformité auditables)."),
        createNumberedItem("2", "Structuration juridique irréprochable : capital minimum de 1 milliard FCFA par filiale, séparation PCA/DG, administrateurs indépendants locaux, comités risques/conformité/audit opérationnels dès l'obtention de l'agrément."),
        createNumberedItem("3", "Conventions d'assistance technique conformes au principe de pleine concurrence OCDE : méthode Cost-Plus, unités d'œuvre objectives, coûts analytiques documentés, livrables traçables (SLA, PV, logs, rapports de conformité), marge bénéficiaire benchmarkée 3 %–7 %, plafonnement prudentiel à 5 % du PNB net."),
        createNumberedItem("4", "Sécurisation complète des flux transfrontaliers : validation CA, avis des commissaires aux comptes, approbation prudentielle préalable BCEAO/COBAC, enregistrement fiscal, déclaration périodique via reporting R1/R01-R02, respect des plafonds réglementaires."),
        createNumberedItem("5", "Audit annuel par un cabinet Big Four de la documentation des prix de transfert (Local File / Master File conformes aux lignes directrices OCDE et à la législation OHADA), avec dépôt auprès des autorités fiscales et prudentielles compétentes."),

        createParagraph("", { spacing: { before: 200 } }),
        createParagraph(
          "Toute dérogation à l'une de ces cinq conditions expose le Groupe OPTASIA à un risque systémique de retrait d'agrément, de sanctions pénales contre les dirigeants, de gel des flux transfrontaliers et d'annihilation de la stratégie panafricaine. La conformité n'est pas une contrainte : c'est la condition sine qua non de la viabilité du projet.",
          { bold: true, color: ACCENT_COLOR },
        ),

        new Paragraph({ spacing: { before: 300 } }),
        new Paragraph({
          children: [
            new TextRun({ text: "Fait à ", font: "Times New Roman", size: 22, color: BODY_COLOR }),
            new TextRun({ text: "Libreville", font: "Times New Roman", size: 22, color: BODY_COLOR, bold: true }),
            new TextRun({ text: ", le ", font: "Times New Roman", size: 22, color: BODY_COLOR }),
            new TextRun({ text: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }), font: "Times New Roman", size: 22, color: BODY_COLOR, bold: true }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Pour KHEPRA EXPERTS,", font: "Times New Roman", size: 22, color: BODY_COLOR, italic: true }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "SIMDA Essoyomèwè", font: "Times New Roman", size: 22, color: BODY_COLOR, bold: true }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Expert Émérite en Réglementation Bancaire Africaine", font: "Times New Roman", size: 20, color: "6B7280", italic: true }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Analyste Prudentiel BCEAO/COBAC — Fiscaliste OHADA — Spécialiste des Prix de Transfert", font: "Times New Roman", size: 20, color: "6B7280", italic: true }),
          ],
          alignment: AlignmentType.LEFT,
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
}



