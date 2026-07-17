import { Paragraph, TextRun, AlignmentType } from 'docx';
import { heading1, heading2, item } from './helpers';

export const title4Paragraphs: Paragraph[] = [
  heading1("TITRE IV — DURÉE, SUSPENSION DES DÉLAIS ET GESTION DES RISQUES"),
  heading2('Article 4.1 — Durée maximale du contrat'),
  new Paragraph({
    children: [
      new TextRun({
        text: "4.1.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le présent contrat entre en vigueur à la date de sa signature par les deux Parties et demeure en vigueur jusqu'à l'obtention des agréments des sept (07) pays, ou jusqu'à sa résiliation conformément aux articles qui suivent. Il est conclu pour une durée maximale de vingt-quatre (24) mois à compter de la date de la première signature. Aucune prorogation au-delà de cette durée maximale de vingt-quatre (24) mois ne pourra intervenir sans avenant écrit et signé des deux Parties, soumis à la validation préalable du Comité de Direction.",
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
        text: "4.1.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "La durée de vingt-quatre (24) mois est calculée de manière continue, sous réserve des suspensions prévues à l'Article 4.2 ci-après. À l'expiration de la durée maximale, si l'ensemble des agréments n'a pas été obtenu, les Parties se réunissent en Comité de Direction dans les trente (30) jours pour décider, à l'unanimité, d'une éventuelle prolongation, d'une réduction du périmètre, ou de la résiliation du contrat.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 4.2 — Suspension des délais et gel des obligations'),
  new Paragraph({
    children: [
      new TextRun({
        text: "4.2.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Les délais contractuels et les obligations de livraison du Prestataire sont suspendus de plein droit, sans pénalité ni indemnité, en cas de survenance d'un événement de force majeure au sens de l'Article 8.4 du présent contrat, ou en cas de lenteur administrative excessive des régulateurs qui rendrait matériellement impossible la poursuite des travaux dans les délais initialement prévus. Sont notamment considérées comme des causes de suspension : les fermetures prolongées des Commissions Bancaires, les moratoires sur les agréments décrétés par les autorités monétaires (BCEAO, BEAC, COBAC), les grèves des administrations compétentes, et les modifications imprévisibles des procédures de dépôt qui nécessiteraient une restructuration complète des dossiers.",
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
        text: "4.2.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "La suspension prend effet à la date de notification écrite de la Partie affectée à l'autre Partie, accompagnée des justificatifs attestant de la cause de suspension (arrêté, note de service, communiqué officiel du régulateur, ou rapport de mission terrain). La durée de suspension est déduite de la durée maximale de vingt-quatre (24) mois. Le Prestataire ne saurait être tenu responsable des retards imputables à une suspension légitime, ni pénalisé sur le plan financier ou contractuel.",
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
        text: "4.2.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Si la suspension excède une durée cumulée de cent vingt (120) jours sur l'ensemble de la durée contractuelle, les Parties se réunissent en Comité de Direction dans les quinze (15) jours pour examiner l'opportunité de : (i) maintenir le contrat avec un ajustement du planning, (ii) réduire le périmètre géographique, ou (iii) résilier le contrat de plein droit sans indemnité, par lettre recommandée avec accusé de réception. En cas de résiliation sur ce fondement, le Prestataire conserve les honoraires dus pour les jalons atteints et les livrables déjà produits.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 4.3 — Gestion des risques et allocation des risques réglementaires'),
  new Paragraph({
    children: [
      new TextRun({
        text: "4.3.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le risque de refus de l'agrément par les autorités réglementaires est un risque inhérent à la nature de la mission et demeure à la charge du Client, sous réserve d'une faute professionnelle avérée du Prestataire dans la préparation des dossiers. Le Prestataire assume l'obligation de moyens renforcée de préparer des dossiers conformes, complets et irréprochables, mais ne garantit pas l'octroi de l'agrément, décision souveraine et discrétionnaire des autorités compétentes.",
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
        text: "4.3.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le risque de retard imputable à une faute du Client (fausse déclaration, non-libération du capital, opacité de la chaîne de contrôle, retard dans la fourniture des pièces, non-respect des conditions suspensives) est un risque Client. Dans ce cas, le Prestataire est dégagé de toute responsabilité quant aux conséquences du retard, et les délais contractuels sont suspendus jusqu'à régularisation complète par le Client. Les honoraires correspondant aux jalons atteints avant la faute restent exigibles, et le Prestataire peut exiger le paiement des jalons suivants à due concurrence des travaux effectivement réalisés.",
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
        text: "4.3.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le Prestataire met en place une matrice des risques actualisée mensuellement, soumise au Comité de Pilotage, et maintient une assurance responsabilité civile professionnelle (RCP) couvrant la présente mission pour un montant minimal de cent cinquante millions (150 000 000) Francs CFA par sinistre et par année d'assurance.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
];