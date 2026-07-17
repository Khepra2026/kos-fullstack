import { Paragraph, TextRun, AlignmentType, Table, TableRow } from 'docx';
import { heading1, heading2, item, cell, multiCell } from './helpers';

export const title2Paragraphs: Paragraph[] = [
  heading1("TITRE II — CHAMP D'APPLICATION ET MÉCANISME DE DUPLICATION"),
  heading2('Article 2.1 — Objet du Mandat'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le présent contrat a pour objet la maîtrise d'œuvre complète de l'accompagnement du Client à l'obtention des agréments d'Établissements de Microfinance (EMF) et de Systèmes Financiers Décentralisés (SFD) de 2ème catégorie, dans le cadre d'un réseau de microfinance 100 % digitale, sur un périmètre multi-juridictionnel de sept (07) pays, selon les réglementations sectorielles en vigueur en zones UEMOA et CEMAC.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
  }),
  heading2('Article 2.2 — Périmètre géographique et réglementaire'),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le mandat couvre le déploiement en trois (03) vagues successives sur un cycle de douze (12) à quatorze (14) mois, sous réserve des clauses de suspension et de prolongation prévues à l'Article 4.1 du présent contrat :",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.BOTH,
  }),
  item('Vague 1 — Zone UEMOA (Pilotes) :', '', { after: 100, indent: 720 }),
  item('•', 'Togo : agrément EMF/SFD de 2ème catégorie, réglementation BCEAO, Instruction BCEAO n° 004-01-2014 relative aux SFD, et cadre de la Commission Bancaire de l\'UEMOA ;', { after: 60, indent: 1080 }),
  item('•', 'Bénin : duplication du modèle togolais, adaptation au cadre réglementaire de la BCEAO et du Ministère des Finances béninois ;', { after: 60, indent: 1080 }),
  item('Vague 2 — Zone UEMOA (Duplication) :', '', { after: 100, indent: 720 }),
  item('•', 'Burkina Faso : adaptation du modèle validé, conformité à la réglementation BCEAO et aux instructions locales de la Commission Bancaire ;', { after: 60, indent: 1080 }),
  item('•', 'Mali : duplication structurée, conformité à la réglementation BCEAO et aux exigences spécifiques de la Commission Bancaire malienne ;', { after: 60, indent: 1080 }),
  item('Vague 3 — Zone CEMAC :', '', { after: 100, indent: 720 }),
  item('•', 'Cameroun (Pilote) : agrément SFD de 2ème catégorie, conformité au Règlement COBAC R-2017/05 et R-2017/06, réglementation BEAC, et cadre OHADA ;', { after: 60, indent: 1080 }),
  item('•', 'Gabon (Apprentissage) : application du modèle camerounais, conformité COBAC/BEAC, avec suivi spécifique des exigences du Ministère des Finances gabonais ;', { after: 60, indent: 1080 }),
  item('•', 'Congo-Brazzaville (Duplication) : duplication structurée du modèle CEMAC, conformité COBAC/BEAC, adaptation au cadre juridique congolais.', { after: 200, indent: 1080 }),
  heading2("Article 2.3 — Maîtrise d'œuvre complète"),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le Prestataire assume une mission de maîtrise d'œuvre complète, incluant sans limitation :",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.BOTH,
  }),
  item('a)', "Structuration juridique : rédaction et validation des statuts conformes à l'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE, rédaction des pactes d'actionnaires, des procès-verbaux d'assemblées générales, et des résolutions de Conseil d'Administration ;", { after: 100, indent: 720 }),
  item('b)', "Ingénierie financière : élaboration des business plans prévisionnels sur 5 ans, des états financiers prévisionnels, des plans de trésorerie, des plans de dette, des analyses de sensibilité, et des tableaux de bord de ratios prudentiels ;", { after: 100, indent: 720 }),
  item('c)', "Constitution des dossiers de moralité : préparation des dossiers individuels des dirigeants et actionnaires (KYC, casiers judiciaires, attestations de non-condamnation, CV certifiés, références bancaires) conformes aux exigences des enquêtes de moralité des Commissions Bancaires ;", { after: 100, indent: 720 }),
  item('d)', "Dépôts physiques et électroniques : préparation, mise en forme, et dépôt des dossiers complets auprès des régulateurs concernés (BCEAO, COBAC, BEAC, Ministères des Finances) en version physique et/ou électronique selon les canaux officiels ;", { after: 100, indent: 720 }),
  item('e)', "Suivi de l'instruction : accompagnement continu jusqu'à la décision finale des Commissions Bancaires, réponse aux réquisitions, préparation aux auditions, et négociation des conditions suspensives.", { after: 300, indent: 720 }),
  heading2('Article 2.4 — Mécanisme de duplication tarifaire et activation par filiale'),
  new Paragraph({
    children: [
      new TextRun({
        text: "2.4.1 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le présent contrat distingue le modèle pilote du mécanisme de duplication. Le modèle pilote — applicable aux pays pilotes (Togo et Cameroun) — fait l'objet d'une tarification spécifique intégrale incluant la recherche, l'ingénierie réglementaire de première imposition et la validation du modèle type. Le mécanisme de duplication — applicable aux pays de duplication (Bénin, Burkina Faso, Mali, Gabon, Congo-Brazzaville) — fait l'objet d'un tarif unitaire de vingt-six millions (26 000 000) Francs CFA hors taxes (HT) par filiale, auquel est appliquée une réduction commerciale de vingt pour cent (20%), soit un tarif net de vingt millions huit cent mille (20 800 000) Francs CFA hors taxes (HT) par filiale type unitaire activée.",
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
        text: "2.4.2 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Chaque duplication doit faire l'objet, préalablement à l'engagement des travaux correspondants, d'un ordre d'activation écrit signé par les représentants dûment habilités des deux Parties, ou à défaut d'un avenant de cadrage géographique spécifique annexé au présent contrat. Aucun travail de duplication ne pourra être engagé sans la remise dudit ordre d'activation ou avenant. L'ordre d'activation précise le pays concerné, la date de démarrage, les livrables attendus, et le montant du jalon de cadrage applicable.",
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
        text: "2.4.3 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le tarif de duplication s'entend forfaitaire par filiale unitaire et couvre l'ensemble des livrables de la Phase 2 (ingénierie réglementaire) et de la Phase 3 (dépôt et instruction) pour le pays concerné, à l'exclusion des frais de déplacement, des frais administratifs externes (CAC, notaire, légalisation), et des frais de dépôt officiels qui demeurent à la charge du Client et sont facturés en sus sur justificatifs. Le tarif de duplication est révisable annuellement, sur la base de l'indice des prix à la consommation de la zone concernée, à la date anniversaire de la signature du présent contrat, dans la limite de cinq pour cent (5%) par an.",
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
        text: "2.4.4 ",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Le Client ne peut imposer de duplication supplémentaire au-delà du périmètre initial des sept (07) pays sans avenant écrit au présent contrat, comportant une mise à jour du budget prévisionnel et du plan de déploiement. Tout avenant est soumis à la validation préalable du Comité de Direction.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
    indent: { left: 720 },
  }),
];