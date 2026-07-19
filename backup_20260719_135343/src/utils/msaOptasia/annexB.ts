import { Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow } from 'docx';
import { heading1, heading2, item, cell, multiCell } from '';

export const annexBParagraphs: Paragraph[] = [
  new Paragraph({
    children: [new TextRun({ text: '', size: 1, font: 'Calibri' })],
    spacing: { before: 800, after: 0 },
    pageBreakBefore: true,
  }),
  new Paragraph({
    children: [new TextRun({ text: 'ANNEXE B — BUDGET PRÉVISIONNEL PAR PHASE', bold: true, size: 26, font: 'Calibri', color: '1F4E3D' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.LEFT,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Cette annexe détaille le budget prévisionnel global du mandat, ventilé par phase, par poste de dépense, et par zone géographique. Les montants sont exprimés en Francs CFA (FCFA), hors taxes (HT), et sont basés sur les estimations du Prestataire au jour de la signature du contrat. Toute modification budgétaire supérieure à dix pour cent (10 %) fera l'objet d'un avenant écrit. Le budget intègre le tarif de duplication de 20 800 000 FCFA HT par filiale unitaire activée, conformément à l'Article 2.4 du présent contrat.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
  heading2('B.1 — Budget global récapitulatif par phase'),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Phase', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Période', { bold: true, width: 20, shading: '1F4E3D', fontSize: 18 }),
          cell('Poste de dépense', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Montant HT (FCFA)', { bold: true, width: 20, shading: '1F4E3D', fontSize: 18 }),
          cell('% du total', { bold: true, width: 10, shading: '1F4E3D', fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          multiCell(['Phase 1 — Pré-licensing & Cadrage'], { width: 25, fontSize: 18 }),
          multiCell(['Mois 1 à 2'], { width: 20, fontSize: 18 }),
          multiCell(['Honoraires conseil (diagnostic, cartographie, note de cadrage, feuille de route)', 'Déplacements (missions terrain 7 pays)', 'Frais administratifs (diligence, traductions, notaire)'], { width: 25, fontSize: 18 }),
          multiCell(['95 000 000', '28 000 000', '7 000 000'], { width: 20, fontSize: 18 }),
          multiCell(['16,4 %'], { width: 10, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          multiCell(['Phase 2 — Ingénierie Réglementaire'], { width: 25, fontSize: 18 }),
          multiCell(['Mois 3 à 7'], { width: 20, fontSize: 18 }),
          multiCell(['Honoraires ingénierie (7 BP, statuts, manuels, SIG, LBC/FT, PCA)', 'Déplacements (missions terrain, enquêtes moralité)', 'Frais administratifs (CAC, notaire, traductions, légalisation)', 'Frais IT (audit SIG, pentest, certifications)'], { width: 25, fontSize: 18 }),
          multiCell(['380 000 000', '65 000 000', '22 000 000', '18 000 000'], { width: 20, fontSize: 18 }),
          multiCell(['54,3 %'], { width: 10, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          multiCell(['Phase 3 — Dépôt & Instruction'], { width: 25, fontSize: 18 }),
          multiCell(['Mois 8 à 12/14'], { width: 20, fontSize: 18 }),
          multiCell(['Honoraires suivi (réponses réquisitions, auditions, négociation)', 'Déplacements (suivi régulateurs, auditions)', "Frais administratifs (dépôt officiel, frais de dossier, frais d'agrément)", "Frais divers (corrections, avenants, pièces complémentaires)"], { width: 25, fontSize: 18 }),
          multiCell(['95 000 000', '42 000 000', '15 000 000', '8 000 000'], { width: 20, fontSize: 18 }),
          multiCell(['29,3 %'], { width: 10, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('TOTAL GLOBAL', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('12 à 14 mois', { bold: true, width: 20, fontSize: 18, shading: 'F5F5F5' }),
          cell('Tous postes confondus', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('775 000 000 FCFA', { bold: true, width: 20, fontSize: 18, shading: 'F5F5F5' }),
          cell('100 %', { bold: true, width: 10, fontSize: 18, shading: 'F5F5F5' }),
        ],
      }),
    ],
  }),
  heading2('B.2 — Budget détaillé par zone et par poste'),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Poste de dépense', { bold: true, width: 30, shading: '1F4E3D', fontSize: 18 }),
          cell('Zone UEMOA (4 pays)', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Zone CEMAC (3 pays)', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Total', { bold: true, width: 20, shading: '1F4E3D', fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Honoraires fixes (Phase 1+2+3)', { width: 30, fontSize: 18 }),
          cell('137 400 000 FCFA', { width: 25, fontSize: 18 }),
          cell('111 600 000 FCFA', { width: 25, fontSize: 18 }),
          cell('249 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Success Fees (agrément obtenu)', { width: 30, fontSize: 18 }),
          cell('100 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('90 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('190 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Déplacements & missions terrain', { width: 30, fontSize: 18 }),
          cell('80 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('55 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('135 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Frais administratifs (CAC, notaire, légalisation)', { width: 30, fontSize: 18 }),
          cell('25 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('22 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('47 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Frais IT/SIG (audit, pentest, certification)', { width: 30, fontSize: 18 }),
          cell('10 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('8 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('18 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Frais divers (corrections, pièces complémentaires)', { width: 30, fontSize: 18 }),
          cell('6 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('7 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('13 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Frais de dépôt & agrément (accusés, timbres)', { width: 30, fontSize: 18 }),
          cell('8 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('7 000 000 FCFA', { width: 25, fontSize: 18 }),
          cell('15 000 000 FCFA', { width: 20, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('TOTAL', { bold: true, width: 30, fontSize: 18, shading: 'F5F5F5' }),
          cell('366 400 000 FCFA', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('300 600 000 FCFA', { bold: true, width: 25, fontSize: 18, shading: 'F5F5F5' }),
          cell('667 000 000 FCFA', { bold: true, width: 20, fontSize: 18, shading: 'F5F5F5' }),
        ],
      }),
    ],
  }),
  heading2('B.3 — Notes méthodologiques du budget'),
  item('B.3.1', "Les honoraires fixes correspondent aux tâches de conseil, d'ingénierie, et de suivi effectuées par le Prestataire. Ils sont indépendants du résultat final (obligation de moyens). Les honoraires des pays pilotes sont calculés sur la base d'une mission intégrale ; les honoraires des pays de duplication sont calculés sur la base du tarif unitaire de 20 800 000 FCFA HT par filiale activée, conformément à l'Article 2.4 ;", { after: 60, indent: 720 }),
  item('B.3.2', "Les success fees sont conditionnés à l'obtention effective de l'agrément pour chaque pays. Ils ne sont exigibles qu'après notification officielle de l'agrément par le régulateur compétent ;", { after: 60, indent: 720 }),
  item('B.3.3', "Les frais de déplacement incluent les vols internationaux, les hébergements (hôtels 4 étoiles ou équivalent), les transports locaux, et les indemnités de subsistance (per diem selon les barèmes internationaux). Chaque mission fait l'objet d'un ordre de mission préalablement validé par le Client ;", { after: 60, indent: 720 }),
  item('B.3.4', "Les frais administratifs incluent les honoraires des Commissaires aux Comptes (CAC) agréés, les frais de notaire, les frais de légalisation/consularisation, les traductions assermentées, et les frais de dépôt officiels (accusés de réception, timbres, frais de dossier) ;", { after: 60, indent: 720 }),
  item('B.3.5', "Les frais IT/SIG incluent l'audit technique du système d'information, les tests de pénétration (pentest), les certifications de conformité, et les frais d'hébergement cloud pour les preuves de concept (POC) ;", { after: 60, indent: 720 }),
  item('B.3.6', "Tout dépassement de budget supérieur à dix pour cent (10 %) sur un poste donné fera l'objet d'une justification écrite et d'un accord préalable du Client, matérialisé par un avenant au présent contrat.", { after: 300, indent: 720 }),
];



