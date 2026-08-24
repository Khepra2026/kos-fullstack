import { Paragraph, TextRun, AlignmentType } from 'docx';
import { heading1, heading2, item } from '';

export const title1Paragraphs: Paragraph[] = [
  heading1('TITRE I — PRÉAMBULE STRATÉGIQUE'),
  heading2('Article 1.1 — Vision du Client'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le Client, OPTASIA SOLUTIONS FZCO, développe une vision stratégique d'infrastructure financière scalable à l'échelle du continent africain. Son modèle économique repose sur un réseau de microfinance 100 % digitale, intégrant un scoring de crédit alternatif, une distribution via partenariats Telco / Mobile Money, et une architecture technologique conçue pour le déploiement multi-pays. Cette vision exige une solidité réglementaire irréprochable dès la phase de lancement.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
  }),
  heading2('Article 1.2 — Expertise du Prestataire'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le Prestataire, KHEPRA EXPERTS SARL U, est un cabinet d'expertise spécialisé dans le conseil stratégique, l'audit et la gouvernance des institutions financières en Afrique subsaharienne. Son équipe combine une expertise terrain approfondie en régulation bancaire (BCEAO, COBAC, BEAC, OHADA), une maîtrise de l'ingénierie financière prudentielle, et une capacité d'orchestration institutionnelle (notaires, CAC, juristes OHADA) pour lever les trois verrous structurants de tout agrément bancaire ou microfinancier : ",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.BOTH,
  }),
  item('a)', "La crédibilité actionnariale : constitution d'un actionnariat qualifié, certifié et conforme aux exigences de moralité des régulateurs ;", { after: 100, indent: 720 }),
  item('b)', "La plausibilité prudentielle : élaboration de business plans sur 5 ans, de ratios de solvabilité (≥ 10 %) et de liquidité (≥ 100 %), de manuels de contrôle interne et de plans de continuité d'activité conformes aux standards BCEAO, COBAC et IFC ;", { after: 100, indent: 720 }),
  item('c)', "La diplomatie institutionnelle : gestion des relations avec les Commissions Bancaires, les Ministères des Finances, les Banques Centrales, et les partenaires techniques pour sécuriser le parcours d'agrément de bout en bout.", { after: 200, indent: 720 }),
  heading2('Article 1.3 — NDA Mutuel'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Les Parties ont signé un Accord de Confidentialité Mutuel (Non-Disclosure Agreement) en date du ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: '26 mai 2026',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", qui reste pleinement en vigueur et complète le présent contrat. Toute information confidentielle échangée dans le cadre du présent MSA est soumise aux obligations de l'NDA, renforcées par les clauses de confidentialité du présent contrat.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
];



