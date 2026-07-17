import { Paragraph, TextRun, AlignmentType, Table, TableRow } from 'docx';
import { heading1, heading2, item, cell, multiCell } from './helpers';

export const title7Paragraphs: Paragraph[] = [
  heading1("TITRE VII — STRUCTURATION FINANCIÈRE ET JALONS DE PAIEMENT SÉCURISÉS"),
  heading2('Article 7.1 — Honoraires fixes et tarif de duplication par pays'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Les honoraires du Prestataire sont structurés en trois composantes : (i) les honoraires fixes des pays pilotes, (ii) le tarif de duplication unitaire par filiale activée, et (iii) les success fees conditionnés à l'obtention des agréments. Les montants ci-dessous sont exprimés en Francs CFA (FCFA) et sont hors taxes (HT).",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
  }),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Pays', { bold: true, width: 18, shading: '1F4E3D', fontSize: 18 }),
          cell('Zone', { bold: true, width: 12, shading: '1F4E3D', fontSize: 18 }),
          cell('Statut', { bold: true, width: 15, shading: '1F4E3D', fontSize: 18 }),
          cell('Honoraires fixes HT', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Success Fee (agrément)', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Total HT', { bold: true, width: 15, shading: '1F4E3D', fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Togo', { width: 18, fontSize: 18 }),
          cell('UEMOA', { width: 12, fontSize: 18 }),
          cell('Pilote', { width: 15, fontSize: 18 }),
          cell('75 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('25 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('100 000 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Cameroun', { width: 18, fontSize: 18 }),
          cell('CEMAC', { width: 12, fontSize: 18 }),
          cell('Pilote', { width: 15, fontSize: 18 }),
          cell('90 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('30 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('120 000 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Bénin', { width: 18, fontSize: 18 }),
          cell('UEMOA', { width: 12, fontSize: 18 }),
          cell('Duplication', { width: 15, fontSize: 18 }),
          cell('20 800 000 FCFA', { width: 25, fontSize: 18 }),
          cell('25 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('45 800 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Burkina Faso', { width: 18, fontSize: 18 }),
          cell('UEMOA', { width: 12, fontSize: 18 }),
          cell('Duplication', { width: 15, fontSize: 18 }),
          cell('20 800 000 FCFA', { width: 25, fontSize: 18 }),
          cell('25 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('45 800 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Mali', { width: 18, fontSize: 18 }),
          cell('UEMOA', { width: 12, fontSize: 18 }),
          cell('Duplication', { width: 15, fontSize: 18 }),
          cell('20 800 000 FCFA', { width: 25, fontSize: 18 }),
          cell('25 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('45 800 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Gabon', { width: 18, fontSize: 18 }),
          cell('CEMAC', { width: 12, fontSize: 18 }),
          cell('Duplication', { width: 15, fontSize: 18 }),
          cell('20 800 000 FCFA', { width: 25, fontSize: 18 }),
          cell('30 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('50 800 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Congo-Brazzaville', { width: 18, fontSize: 18 }),
          cell('CEMAC', { width: 12, fontSize: 18 }),
          cell('Duplication', { width: 15, fontSize: 18 }),
          cell('20 800 000 FCFA', { width: 25, fontSize: 18 }),
          cell('30 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('50 800 000 FCFA', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('TOTAL 7 PAYS', { bold: true, width: 18, fontSize: 18, shading: 'F5F5F5' }),
          cell('—', { bold: true, width: 12, fontSize: 18, shading: 'F5F5F5' }),
          cell('—', { bold: true, width: 15, fontSize: 18, shading: 'F5F5F5' }),
          cell('249 000 000 FCFA', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('190 000 000 FCFA', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('439 000 000 FCFA', { bold: true, width: 15, fontSize: 18, shading: 'F5F5F5' }),
        ],
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Note méthodologique : Le tarif de duplication de 20 800 000 FCFA HT résulte d'un tarif de référence de 26 000 000 FCFA HT auquel est appliquée une réduction commerciale de 20%. Ce tarif unitaire s'applique par filiale type unitaire activée, conformément à l'Article 2.4 du présent contrat.",
        size: 18,
        font: 'Calibri',
        italics: true,
        color: '555555',
      }),
    ],
    spacing: { before: 100, after: 200 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
  heading2('Article 7.2 — Modalités de paiement par jalons sécurisés'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Pour chaque pays, les paiements sont échelonnés selon quatre (04) jalons, chacun déclenché par la réalisation d'un événement objectif, vérifiable et documenté. Les jalons sont structurés de manière à protéger les intérêts légitimes du Prestataire, notamment en cas de faute du Client.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.BOTH,
  }),
  item('Jalon 1 — Cadrage (20 %) :', " paiement à la signature de la note de cadrage stratégique et de la feuille de route validée par le Client, dans les dix (10) jours suivant la validation. Ce jalon est exigible dès réception de l'ordre d'activation écrit pour les pays du mécanisme de duplication ;", { after: 60, indent: 720 }),
  item('Jalon 2 — Validation interne (40 %) :', " paiement à la validation formelle par le Client de l'ensemble des livrables de la Phase 2 (ingénierie réglementaire), après révision et intégration des observations, dans les dix (10) jours suivant la validation. La validation est matérialisée par un PV de validation signé par le Point Focal du Client ;", { after: 60, indent: 720 }),
  item('Jalon 3 — Dépôt officiel (20 %) :', " paiement à la remise de la preuve du dépôt effectif. La preuve du dépôt effectif est constituée par la remise d'un récépissé officiel de dépôt avec numéro d'enregistrement délivré par le Ministère des Finances ou la Banque Centrale compétente (BCEAO, BEAC, COBAC), ou par tout autre document probant émanant de l'autorité réglementaire, tel qu'un accusé de réception électronique ou une attestation de dépôt certifiée. Le paiement est exigible dans les dix (10) jours suivant la remise de la preuve ;", { after: 60, indent: 720 }),
  item('Jalon 4 — Octroi de l\'agrément (20 %) :', " paiement à la notification officielle de l'agrément par la Commission Bancaire, dans les dix (10) jours suivant la notification. Ce jalon inclut également le success fee contractuel (25 ou 30 M FCFA selon la zone). Si le retard ou le rejet de l'agrément est imputable à une faute du Client, notamment en cas de fausse déclaration lors des enquêtes de moralité, de non-libération effective du capital social minimum, ou de manquement à l'obligation de transparence sur la chaîne de contrôle (UBO), le jalon des 20% lié à l'avis favorable ou à l'octroi de l'agrément est néanmoins dû et exigible au Prestataire, sans préjudice du droit du Prestataire à suspendre les travaux jusqu'à régularisation complète par le Client. Dans ce cas, le success fee reste conditionné à l'obtention effective de l'agrément, mais les honoraires fixes correspondant au jalon 4 sont dus de plein droit.", { after: 200, indent: 720 }),
  heading2('Article 7.3 — Taxes, frais de déplacement et pénalités de retard'),
  item('7.3.1', "Les honoraires sont exprimés hors taxes (HT). La TVA locale applicable sera facturée en sus, selon la législation fiscale en vigueur dans le pays de facturation (Togo : 18 % ; autres pays UEMOA : selon le taux local ; CEMAC : selon le taux local) ;", { after: 60, indent: 720 }),
  item('7.3.2', "Les frais de déplacement, d'hébergement et de subsistance du Prestataire sont remboursés sur justificatifs, sous réserve d'un accord préalable écrit du Client. Les déplacements sont planifiés et budgétés dans la note de cadrage de chaque pays. Les barèmes de remboursement sont ceux en vigueur dans le pays de destination, avec un plafond de mille deux cents (1 200) euros par mission et par expert pour les déplacements internationaux ;", { after: 60, indent: 720 }),
  item('7.3.3', "Le Prestataire fournira des factures détaillées, avec références aux jalons atteints, et le Client s'engage à les régler dans les délais fixés. Tout retard de paiement supérieur à quinze (15) jours entraîne des pénalités de retard de 1,5 % par mois de retard, sans préjudice de la suspension des travaux après un préavis de dix (10) jours ouvrables. Les pénalités sont d'exécution de plein droit, sans mise en demeure préalable.", { after: 300, indent: 720 }),
];