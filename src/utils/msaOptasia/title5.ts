import { Paragraph, TextRun, AlignmentType, Table, TableRow } from 'docx';
import { heading1, heading2, item, cell, multiCell } from '';

export const title5Paragraphs: Paragraph[] = [
  heading1("TITRE V — OBLIGATIONS DES PARTIES ET CONFORMITÉ RÉGLEMENTAIRE"),
  heading2('Article 5.1 — Obligations du Prestataire'),
  item('5.1.1', "Obligation de moyens renforcée : le Prestataire s'engage à mettre en œuvre tous les moyens humains, techniques et intellectuels nécessaires pour atteindre l'objectif d'agrément, sans toutefois garantir le résultat final, celui-ci dépendant de la décision souveraine des autorités réglementaires. Cette obligation de moyens s'entend comme une obligation de diligence professionnelle élevée, conforme aux standards des Big Four en matière de conseil réglementaire et d'ingénierie financière ;", { after: 60, indent: 720 }),
  item('5.1.2', "Déployer des experts seniors certifiés, avec une expérience minimale de dix (10) ans en régulation bancaire africaine, pour chaque mission pays ;", { after: 60, indent: 720 }),
  item('5.1.3', "Gérer des check-lists pré-dépôt exhaustives pour chaque pays, visant à éliminer tout risque de rejet formel ou de réquisition majeure par les régulateurs. Les check-lists intègrent les exigences des Instructions BCEAO 2024, du Règlement COBAC R-2023/01 relatif aux normes de gouvernance et de contrôle interne, et des standards SYSCOHADA révisé ;", { after: 60, indent: 720 }),
  item('5.1.4', "Maintenir une confidentialité absolue sur les informations du Client, conformément à l'NDA du 26 mai 2026 et à l'Article 8.1 du présent contrat ;", { after: 60, indent: 720 }),
  item('5.1.5', "Rendre compte mensuellement au Client de l'avancement des travaux, par le biais de rapports d'activité détaillés et de réunions de pilotage ;", { after: 60, indent: 720 }),
  item('5.1.6', "Respecter les délais convenus par pays et par phase, sous réserve de la fourniture par le Client des informations et documents nécessaires dans les délais impartis, et sous réserve des suspensions prévues à l'Article 4.2.", { after: 200, indent: 720 }),
  heading2('Article 5.2 — Obligations du Client'),
  item('5.2.1', "Transparence totale : le Client s'engage à fournir au Prestataire, dans les meilleurs délais, toutes les informations, données, documents et accès nécessaires à l'exécution de la mission, sans restriction ni omission. Le Client garantit l'exactitude, la véracité et l'exhaustivité des informations transmises ;", { after: 60, indent: 720 }),
  item('5.2.2', "Fournir la diligence des KYC (Know Your Customer) et des casiers judiciaires pour tous les dirigeants et actionnaires, en vue des enquêtes de moralité menées par les régulateurs. Toute fausse déclaration, dissimulation, ou omission dans les dossiers de moralité engage la responsabilité exclusive du Client et ne saurait être imputée au Prestataire ;", { after: 60, indent: 720 }),
  item('5.2.3', "Libérer effectivement le capital social minimum requis pour chaque pays (ex : 500 000 000 FCFA au Togo pour une IMF de 2ème catégorie), et fournir les preuves de versement (attestations bancaires, PV de libération) dans les délais fixés par le Prestataire. Le non-respect de cette obligation constitue une faute contractuelle majeure du Client ;", { after: 60, indent: 720 }),
  item('5.2.4', "Garantir la transparence de la chaîne de contrôle (Ultimate Beneficial Owners — UBO) et fournir les déclarations de bénéficiaires effectifs conformes aux standards internationaux (FATF, GAFI). Toute opacité ou inexactitude dans la chaîne de contrôle engage la responsabilité exclusive du Client ;", { after: 60, indent: 720 }),
  item('5.2.5', "Désigner un interlocuteur unique (Point Focal) avec pouvoir de décision et d'arbitrage, disponible pour les réunions de pilotage, les validations, et les urgences réglementaires ;", { after: 60, indent: 720 }),
  item('5.2.6', "Respecter les échéances de paiement fixées à l'Article 7, sous peine de suspension des travaux après un préavis de dix (10) jours ouvrables, conformément à l'Article 7.3.3.", { after: 300, indent: 720 }),
  heading2('Article 5.3 — Conformité réglementaire contraignante des livrables'),
  new Paragraph({
    children: [
      new TextRun({
        text: "5.3.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Tous les livrables produits par le Prestataire dans le cadre du présent contrat sont soumis à une obligation de conformité réglementaire absolue. Les livrables doivent être rédigés et structurés en stricte conformité avec les textes en vigueur au jour de leur livraison, notamment :",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 60 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  item('•', "L'Instruction BCEAO n° 004-01-2014 et les Instructions BCEAO 2024 relatives aux conditions d'agrément, aux normes prudentielles et aux rapports réglementaires des Systèmes Financiers Décentralisés (SFD) ;", { after: 60, indent: 1080 }),
  item('•', "Le Règlement COBAC R-2023/01 relatif aux normes de gouvernance, de contrôle interne et de gestion des risques pour les Établissements de Microfinance (EMF), et le Règlement COBAC R-2017/05 et R-2017/06 relatifs aux conditions d'agrément et aux normes prudentielles ;", { after: 60, indent: 1080 }),
  item('•', "Le Règlement COBAC R-2019/01 sur le contrôle interne, le Règlement COBAC R-2018/01 sur la lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT), et le Règlement COBAC R-2021/01 sur le Plan de Continuité d'Activité (PCA) ;", { after: 60, indent: 1080 }),
  item('•', "Le SYSCOHADA révisé, pour l'ensemble des états financiers prévisionnels, des business plans et des manuels comptables ;", { after: 60, indent: 1080 }),
  item('•', "L'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE, pour la structuration juridique et les statuts ;", { after: 60, indent: 1080 }),
  item('•', "Le Règlement Général sur la Protection des Données (RGPD) et les lois locales équivalentes sur la protection des données personnelles et la souveraineté des données, applicables à la note technique SIG et au traitement des données clients ;", { after: 60, indent: 1080 }),
  item('•', "Les normes du Groupe Egmont et du GAFI en matière de LBC/FT, pour le dispositif de vigilance et de déclaration des opérations suspectes.", { after: 200, indent: 1080 }),
  new Paragraph({
    children: [
      new TextRun({
        text: "5.3.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le Prestataire s'engage à ce que chaque livrable fasse l'objet d'une attestation de conformité réglementaire interne, validée par le Comité de Revue Qualité, et certifiant la conformité aux textes cités ci-dessus. Cette attestation est annexée au livrable remis au Client. En cas de modification d'un texte réglementaire en cours de mission, le Prestataire actualise le livrable concerné dans un délai de quinze (15) jours ouvrables, à ses frais, pour autant que la modification n'ait pas été publiée avant la signature du présent contrat.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 60 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "5.3.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le Client dispose d'un délai de dix (10) jours ouvrables pour formuler des observations écrites sur la conformité réglementaire de chaque livrable. Passé ce délai, le livrable est réputé conforme et accepté. Les observations fondées sur une erreur matérielle de conformité réglementaire (ex : référence réglementaire erronée, ratio non conforme à la dernière instruction BCEAO) sont corrigées par le Prestataire dans un délai de cinq (5) jours ouvrables, sans frais supplémentaires.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
];



