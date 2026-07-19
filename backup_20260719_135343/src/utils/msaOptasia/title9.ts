import { Paragraph, TextRun, AlignmentType } from 'docx';
import { heading1, heading2, item } from '';

export const title9Paragraphs: Paragraph[] = [
  heading1("TITRE IX — DISPOSITIONS FINALES"),
  heading2('Article 9.1 — Résiliation'),
  item('9.1.1', "Chaque Partie peut résilier le contrat en cas de faute grave de l'autre Partie, après mise en demeure restée sans effet pendant trente (30) jours. Sont notamment considérées comme fautes graves : la violation des obligations de confidentialité, le non-paiement récurrent des honoraires, la fourniture de fausses informations, et l'abandon manifeste de la mission ;", { after: 60, indent: 720 }),
  item('9.1.2', "En cas de résiliation pour faute du Client, les honoraires dus pour les jalons atteints restent exigibles, et le Prestataire conserve l'intégralité des droits de propriété intellectuelle sur les méthodologies et outils génériques. Le Prestataire est en outre fondé à exiger le paiement des jalons en cours de réalisation, à due concurrence de l'avancement des travaux constaté par le Comité de Pilotage ;", { after: 60, indent: 720 }),
  item('9.1.3', "En cas de résiliation pour faute du Prestataire, le Client est remboursé des honoraires payés d'avance pour les jalons non atteints, et les livrables déjà produits sont remis au Client sans restriction. Les success fees non échus sont annulés de plein droit.", { after: 200, indent: 720 }),
  heading2('Article 9.2 — Cession du contrat'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Aucune Partie ne peut céder le présent contrat, ni les droits et obligations qui en découlent, à un tiers sans l'accord écrit préalable de l'autre Partie. Toute cession non autorisée est nulle et de nul effet.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
  }),
  heading2('Article 9.3 — Notification'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Toute notification au titre du présent contrat doit être faite par lettre recommandée avec accusé de réception, ou par courrier électronique avec accusé de lecture, aux adresses suivantes :",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.BOTH,
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Prestataire :", bold: true, size: 20, font: 'Calibri' }),
      new TextRun({ text: " KHEPRA EXPERTS SARL U, Logogomé, Rue Carrefour Aised, Lomé, Togo — Email : contact@khepraexperts.com", size: 20, font: 'Calibri' }),
    ],
    spacing: { after: 60 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Client :", bold: true, size: 20, font: 'Calibri' }),
      new TextRun({ text: " OPTASIA SOLUTIONS FZCO, Unit 806B, Jumeirah Business Center 4, JLT, Dubaï, Émirats Arabes Unis — Email : james.rutherfoord@optasia.com", size: 20, font: 'Calibri' }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 9.4 — Intégralité du contrat'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le présent contrat, incluant ses annexes, constitue l'intégralité de l'accord entre les Parties. Il annule et remplace tous les accords, propositions, ou négociations antérieures, écrits ou verbaux, relatifs au même objet. Toute modification du présent contrat ne sera valable que si elle est faite par avenant écrit et signé par les deux Parties.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
];



