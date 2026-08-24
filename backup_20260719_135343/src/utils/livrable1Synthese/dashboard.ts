import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, SLATE, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider } from '';

export const dashboardParagraphs: Paragraph[] = [
  h1('TABLEAU DE BORD CEO — OPTASIA AGRÉMENTS EMF/SFD'),
  divider(),
  body('Ce tableau de bord synthétise en une page les décisions, risques et actions immédiates que le CEO doit piloter. Chaque indicateur est directement actionnable.'),
  alertBox('3 DECISIONS IRRÉVERSIBLES AVANT TOUT DÉPÔT : (1) Holding de substance en Afrique — la FZCO Dubaï ne peut pas être actionnaire direct ; (2) IT hybride Edge+Cloud local — les données client ne peuvent pas être hébergées dans un cloud global non certifié ; (3) DG locaux résidents recrutés 3 mois avant le dépôt.', 'critical'),
  h2('1.1 — Indicateurs de conformité par zone (état au 2 juin 2026)'),
  buildTable(
    ['Zone', 'Régulateur', 'Agrément requis', 'Délai moyen', 'Capital minimum', 'Statut risque'],
    [
      ['UEMOA — Togo', 'BCEAO + Ministère Finances', 'SFD 2ème cat.', '8-12 mois', '100 M FCFA', 'MODÉRÉ'],
      ['UEMOA — Bénin', 'BCEAO + Ministère Finances', 'SFD 2ème cat.', '8-12 mois', '100 M FCFA', 'MODÉRÉ'],
      ['UEMOA — Burkina Faso', 'BCEAO + Ministère Finances', 'SFD 2ème cat.', '10-14 mois', '100 M FCFA', 'ÉLEVÉ (contexte sécuritaire)'],
      ['UEMOA — Mali', 'BCEAO + Ministère Finances', 'SFD 2ème cat.', '12-16 mois', '100 M FCFA', 'ÉLEVÉ (contexte sécuritaire)'],
      ['CEMAC — Cameroun', 'COBAC + BEAC + Ministère Finances', 'EMF 2ème cat.', '10-14 mois', '100 M FCFA + Garantie BEAC 50 M', 'MODÉRÉ'],
      ['CEMAC — Gabon', 'COBAC + BEAC + Ministère Finances', 'EMF 2ème cat.', '10-14 mois', '100 M FCFA + Garantie BEAC 50 M', 'MODÉRÉ'],
      ['CEMAC — Congo', 'COBAC + BEAC + Ministère Finances', 'EMF 2ème cat.', '12-18 mois', '100 M FCFA + Garantie BEAC 50 M', 'ÉLEVÉ (infrastructure limitée)'],
    ],
    { colWidths: [18, 22, 14, 12, 18, 16], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('1.2 — Hard Stops réglementaires (risque de rejet immédiat)'),
  buildTable(
    ['Hard Stop', 'Référence normative', 'Conséquence', 'Mitigation', 'Délai'],
    [
      ['UBO non traçable / Société écran FZCO', 'GAFI n°24/2020, COBAC R-2023/01, BCEAO Inst. 2024', 'Avis défavorable + liste noire 5 ans', 'Constitution holding de substance Afrique + audit Ownership Chain', 'J+15'],
      ['Cloud global sans hébergement local', 'COBAC R-2021/01, BCEAO Inst. 028/2024, 029/2024', 'Rejet d\'agrément + suspension', 'Architecture hybride Edge+Cloud local par pays', 'J+20'],
      ['PCA = DG ou cumul de mandats', 'COBAC R-2023/01, Circ. BCEAO 01/2017, AUSCGIE OHADA', 'Avis défavorable + enquête de moralité', 'Séparation stricte PCA/DG + recrutement indépendants', 'J+45'],
      ['DG non résident / expérience < 5 ans (UEMOA) / < 7 ans (CEMAC)', 'Circ. BCEAO 02/2017, COBAC R-2023/01', 'Refus d\'agrément du dirigeant', 'Recrutement anticipé DG résidents avec expérience certifiée', 'J+15'],
      ['Taux effectif > plafond légal (27% UEMOA / 33% CEMAC)', 'Loi UEMOA anti-usure, COBAC R-2017/05', 'Nullité des contrats + sanction pénale', 'Analyse actuarielle préalable + monitoring mensuel TEG', 'J+60'],
    ],
    { colWidths: [22, 22, 20, 22, 14], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  h2('1.3 — Feuille de route 90 jours — Actions prioritaires CEO'),
  buildTable(
    ['#', 'Action', 'Délai', 'Statut', 'Responsable'],
    [
      ['1', 'Constitution Holding de substance Afrique', 'J+15', 'NON DÉMARRÉ', 'CEO'],
      ['2', 'Recrutement DG résidents Togo/Bénin/Cameroun', 'J+15', 'NON DÉMARRÉ', 'DRH'],
      ['3', 'Audit Ownership Chain UBO (Big Four)', 'J+30', 'NON DÉMARRÉ', 'CEO'],
      ['4', 'Architecture IT hybride (Edge+Cloud local)', 'J+20', 'NON DÉMARRÉ', 'DSI'],
      ['5', 'Libération capital 300 M FCFA (3 pays pilotes)', 'J+30', 'NON DÉMARRÉ', 'DAF'],
      ['6', 'Certification algorithme scoring (Fairness Audit)', 'J+30', 'NON DÉMARRÉ', 'CTO'],
      ['7', 'Conventions MNO pilotes (Orange, MTN)', 'J+45', 'NON DÉMARRÉ', 'Partnerships'],
      ['8', 'Politique Prix de Transfert OCDE', 'J+45', 'NON DÉMARRÉ', 'DAF + Big Four'],
      ['9', 'Dépot dossiers agrément Togo/Bénin/Cameroun', 'J+270', 'NON DÉMARRÉ', 'KHEPRA + DG locaux'],
      ['10', 'Déploiement PCA conforme BCEAO/COBAC', 'J+90', 'NON DÉMARRÉ', 'DSI'],
    ],
    { colWidths: [6, 44, 12, 14, 24], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('1.4 — Score de conformité global par partie (écart à combler)'),
  buildTable(
    ['Partie', 'Score actuel (0-100)', 'Seuil requis', 'Écart', 'Action prioritaire'],
    [
      ['I. Cartographie réglementaire', '85', '≥ 90', '5 pts', 'Veille textes BCEAO 2024 (n°026-029) + COBAC R-2023/01'],
      ['II. Hardening (UBO, IT, Gouvernance)', '45', '≥ 90', '45 pts', 'Holding + Substance + Séparation PCA/DG'],
      ['III. Architecture Gouvernance', '55', '≥ 90', '35 pts', 'Charte + Comités + Conventions + Fit and Proper'],
      ['IV. Produits & Services', '70', '≥ 90', '20 pts', 'Certification scoring + Conventions MNO + TEG'],
      ['V. Modèle Économique', '60', '≥ 80', '20 pts', 'Prix de transfert + Plafond rémunérations + Politique IT'],
    ],
    { colWidths: [24, 14, 14, 14, 34], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  alertBox('Score global conformité : 63/100 — Seuil investissement-ready : 85/100. Écart critique de 22 points. Les parties II et III constituent les leviers de progression les plus rapides et les plus impactants.', 'warning'),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



