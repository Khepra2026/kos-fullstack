import { Paragraph, TextRun, AlignmentType } from 'docx';
import { heading1, heading2, item } from './helpers';

export const title6Paragraphs: Paragraph[] = [
  heading1("TITRE VI — LITIGES ET JURIDICTION COMPÉTENTE"),
  heading2('Article 6.1 — Conciliation amiable préalable'),
  new Paragraph({
    children: [
      new TextRun({
        text: "6.1.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Tout différend, contestation, ou litige né de l'interprétation, de l'exécution, de la modification, de la suspension ou de la résiliation du présent contrat, ainsi que de ses annexes et avenants, sera soumis préalablement à une phase de conciliation amiable. Les Parties s'engagent à déployer leur meilleur effort pour résoudre le différend de manière loyale et de bonne foi.",
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
        text: "6.1.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "La phase de conciliation amiable est déclenchée par l'envoi d'une lettre recommandée avec accusé de réception ou d'un courriel avec accusé de lecture, par l'une des Parties à l'autre, précisant la nature du litige, les prétentions, et les propositions de règlement. Dans les dix (10) jours suivant la réception de cette notification, les Parties se réunissent, en présentiel ou en visioconférence, pour examiner le différend.",
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
        text: "6.1.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "La durée de la phase de conciliation amiable est de trente (30) jours à compter de la première réunion de conciliation. Ce délai peut être prorogé d'un commun accord des Parties, par écrit, pour une durée maximale de quinze (15) jours supplémentaires. Les échanges, propositions, et documents produits dans le cadre de la conciliation amiable sont strictement confidentiels et ne peuvent être invoqués devant une juridiction compétente, sauf accord écrit des Parties.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 6.2 — Juridiction compétente et attribution de compétence'),
  new Paragraph({
    children: [
      new TextRun({
        text: "6.2.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "À défaut de règlement amiable dans les délais impartis, tout litige relatif au présent contrat sera soumis à la compétence exclusive du Tribunal de Commerce de Lomé, République Togolaise. Les Parties reconnaissent expressément la compétence territoriale de cette juridiction, nonobstant toute autre juridiction compétente en vertu des règles de droit commun, et renoncent à s'en prévaloir.",
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
        text: "6.2.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le choix de la juridiction du Tribunal de Commerce de Lomé est justifié par le fait que le siège social du Prestataire est situé au Togo, que le contrat a été négocié et conclu à Lomé, et que l'application du droit OHADA est harmonisée dans l'ensemble des États membres, rendant le Tribunal de Commerce de Lomé compétent pour interpréter et appliquer les Actes Uniformes OHADA pertinents. Les Parties conviennent que toute procédure contentieuse sera conduite en langue française.",
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
        text: "6.2.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Nonobstant la clause d'attribution de compétence ci-dessus, les Parties conservent le droit de saisir le juge des référés ou le juge de l'exécution pour les mesures conservatoires ou d'urgence, conformément à l'Acte Uniforme OHADA relatif au droit commercial général et au droit des procédures simplifiées de recouvrement et des voies d'exécution.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 6.3 — Droit applicable'),
  new Paragraph({
    children: [
      new TextRun({
        text: "6.3.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le présent contrat est soumis au droit de l'Organisation pour l'Harmonisation en Afrique du Droit des Affaires (OHADA), et en particulier à l'Acte Uniforme relatif au droit commercial général, à l'Acte Uniforme relatif aux sociétés commerciales et du GIE, à l'Acte Uniforme relatif au droit des sûretés, et à l'Acte Uniforme relatif au droit du commerce électronique. Les dispositions des Actes Uniformes OHADA prévalent sur toute disposition législative nationale contraire des États membres.",
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
        text: "6.3.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Pour les questions non régies par le droit OHADA, les Parties conviennent de l'application du droit togolais, en tant que droit du siège du Prestataire et lieu d'exécution principale de la mission. Les dispositions de l'Acte Uniforme OHADA sur le droit commercial général relatives aux obligations contractuelles, à la responsabilité civile, et aux délais de prescription sont applicables en subsidiarité.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
];