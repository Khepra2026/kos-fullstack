import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider, numberedItem } from '';

export const section2Paragraphs: Paragraph[] = [
  h1('PARTIE II — HARDENING RÉGLEMENTAIRE ET PRUDENTIEL'),
  divider(),
  body('Mémorandum condensé des risques de non-conformité déclenchant des avis défavorables. Références GAFI, BCEAO, COBAC, AUSCGIE OHADA.'),
  h2('II.1 — Conformité UBO & Moralité (GAFI n°24/2020, n°25/2020)'),
  alertBox('L\'absence de traçabilité totale des actionnaires jusqu\'aux bénéficiaires effectifs est le premier motif de rejet d\'agrément dans les zones UEMOA et CEMAC. Les Commissions Bancaires consultent systématiquement les listes GAFI et les rapports CENTIF/TRACFIN.', 'critical'),
  buildTable(
    ['Catégorie actionnaire', 'Documents obligatoires', 'Validateur', 'Délai'],
    [
      ['PP résident zone', 'Pièce d\'identité, casier judiciaire < 3 mois, attestation domicile, déclaration revenus', 'Notaire / Big Four', 'J+7'],
      ['PP hors zone', 'Passeport, casier judiciaire apostillé, attestation origine fonds, déclaration change', 'Notaire pays d\'origine + Big Four', 'J+30'],
      ['Entité morale zone', 'RCCM, statuts, K-bis, CAC, non-faillite, répartition actionnariat', 'Notaire OHADA', 'J+15'],
      ['FZCO / Zone franche', 'Licence FZCO, registre commerce Dubaï, audit substance économique, chaîne de détention', 'Big Four Dubaï + KHEPRA', 'J+45'],
      ['Fonds / SPV', 'Prospectus, LPA, rapports annuels, traçabilité LPs, déclaration change', 'Fiscaliste internationaux', 'J+60'],
    ],
    { colWidths: [18, 32, 24, 26], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h3('II.1.1 — Critères cumulatifs de substance économique (anti-écran)'),
  numberedItem(1, 'Personnel : au moins 3 salariés à temps plein sur le territoire africain.'),
  numberedItem(2, 'Bureaux : bail commercial enregistré, surface ≥ 100 m², factures d\'électricité/téléphone.'),
  numberedItem(3, 'Activité : comptes certifiés par un CAC agréé OHADA, activité réelle > 70% du chiffre d\'affaires.'),
  numberedItem(4, 'Comptes : comptes bancaires ouverts dans la zone, mouvements significatifs.'),
  numberedItem(5, 'Chaîne de détention : pas de société intermédiaire opaque dans une juridiction non coopérative.'),
  numberedItem(6, 'Juridiction fiscale : la holding effective doit être résidente fiscale dans la zone CEMAC/UEMOA.'),
  h2('II.2 — Souveraineté Technique & Architecture IT'),
  buildTable(
    ['Exigence', 'Référence normative', 'État actuel OPTASIA', 'Action requise'],
    [
      ['Serveurs de production en zone', 'COBAC R-2021/01 Art. 8 ; BCEAO Inst. 028/2024', 'Cloud global (AWS/GCP) — non conforme', 'Déploiement serveurs locaux ou Edge certifiés'],
      ['Bases de données clients en zone', 'COBAC R-2021/01 Art. 9 ; BCEAO Inst. 028/2024', 'Données répliquées globalement — non conforme', 'Localisation obligatoire des bases KYC, crédit, transactions'],
      ['Logs d\'exploitation en zone', 'COBAC R-2021/01 Art. 10 ; BCEAO Inst. 028/2024', 'Logs centralisés Dubaï — non conforme', 'Logs locaux conservés 5 ans, accessibles au régulateur'],
      ['Droit d\'audit du régulateur sur contrats MNO', 'COBAC R-2021/01 Art. 12 ; BCEAO Inst. 026/2024', 'Conventions MNO sans clause d\'audit', 'Réécriture des clauses MNO'],
      ['PCA couvrant les systèmes numériques', 'Circ. BCEAO 001-2020 ; COBAC R-2021/01', 'PCA non déployé', 'Déploiement PCA par pays'],
    ],
    { colWidths: [22, 26, 26, 26], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  h2('II.3 — Gouvernance Hard Core'),
  buildTable(
    ['Fonction', 'UEMOA (Circ. BCEAO 02/2017)', 'CEMAC (COBAC R-2023/01)', 'Hard Stop'],
    [
      ['DG', 'Expérience 5 ans + résidence + casier vierge + indépendance', 'Expérience 7 ans + résidence + casier vierge + indépendance', 'Cumul PCA/DG = rejet immédiat'],
      ['PCA', 'Indépendant + non exécutif + non actionnaire majoritaire', 'Indépendant + non exécutif + résidence recommandée', 'Actionnaire majoritaire = avis défavorable'],
      ['DGA', 'Expérience 3 ans + casier vierge + non-cumul', 'Expérience 5 ans + casier vierge + non-cumul', 'Cumul > 2 mandats = rejet'],
      ['RCI', 'Indépendance lignes métier + reporting direct CA', 'Indépendance totale + budget autonome', 'Ligne opérationnelle = réquisition'],
      ['RLBC', 'Accès direct CA + protection lanceurs d\'alerte', 'Accès direct CA + déclaration CENTIF', 'Dépendance commerciale = sanction pénale'],
    ],
    { colWidths: [10, 28, 28, 34], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('II.4 — Rémunérations Prudentielles'),
  buildTable(
    ['Poste', 'Plafond', 'Référence', 'Sanction dépassement'],
    [
      ['Administrateurs', '3% du résultat net global', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18', 'Réquisition + avis défavorable au renouvellement'],
      ['DG', '5% du résultat net global', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18', 'Réquisition + remboursement obligatoire'],
      ['DGA', '3% du résultat net global', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18', 'Réquisition + remboursement obligatoire'],
      ['Total dirigeants', '8% du résultat net global (hard ceiling)', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18', 'Avis défavorable + réquisition'],
      ['Bonus variable', '30% au moins différé sur 3 exercices', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18', 'Réquisition + réécriture politique'],
    ],
    { colWidths: [18, 24, 32, 26], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h3('II.4.1 — Déclencheurs Malus / Clawback'),
  buildTable(
    ['Déclencheur', 'Seuil', 'Conséquence', 'Référence'],
    [
      ['PAR 30 dégradation', 'PAR 30 > 8% (UEMOA) / > 10% (CEMAC)', 'Malus 50% bonus variable', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18'],
      ['PAR 90 dégradation', 'PAR 90 > 5%', 'Clawback 100% bonus des 3 exercices antérieurs', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18'],
      ['Faille LBC/FT majeure', 'Déclaration CENTIF non effectuée', 'Malus 100% + revue de conformité', 'COBAC R-2018/01 ; BCEAO Inst. 027/2024'],
      ['Défaut contrôle interne', 'Avis défavorable CAC', 'Malus 50% + plan d\'action', 'COBAC R-2019/01 ; Circ. BCEAO 03/2017'],
      ['Solvabilité < 10%', 'Ratio solvabilité sous le minimum', 'Clawback 100% + renforcement capital', 'BCEAO Inst. 007-03-2018 ; COBAC R-2017/06'],
    ],
    { colWidths: [22, 24, 28, 26], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  h2('II.5 — Matrice des risques de rejet (scoring P×I)'),
  buildTable(
    ['Risque', 'Probabilité (1-5)', 'Impact (1-5)', 'Score P×I', 'Niveau', 'Mitigation'],
    [
      ['R1. UBO / Société écran', '4', '5', '20', 'CRITIQUE', 'Holding de substance + audit Ownership Chain'],
      ['R2. Cloud global sans local', '5', '5', '25', 'CRITIQUE', 'Architecture hybride Edge+Cloud local'],
      ['R3. Cumul PCA/DG', '4', '4', '16', 'CRITIQUE', 'Séparation stricte + Charte'],
      ['R4. Rémunérations non conformes', '3', '4', '12', 'MAJEUR', 'Politique conforme + simulation stress'],
      ['R5. LBC/FT — défaut système', '4', '5', '20', 'CRITIQUE', 'Déploiement TMS + formation RLBC'],
      ['R6. Réquisition non régularisée', '3', '5', '15', 'MAJEUR', 'Veille KHEPRA + réponse sous 15 jours'],
      ['R7. Changement texte en cours instruction', '3', '3', '9', 'MODÉRÉ', 'Architecture modulaire + clauses de révision'],
      ['R8. Substance FZCO insuffisante', '4', '5', '20', 'CRITIQUE', 'Constitution holding + personnel + baux'],
      ['R9. Externalisation sans audit', '3', '5', '15', 'MAJEUR', 'Réécriture contrats + clause audit régulateur'],
      ['R10. Capital non adéquat', '4', '4', '16', 'CRITIQUE', 'Libération 100 M FCFA + garantie BEAC 50 M'],
    ],
    { colWidths: [22, 8, 8, 10, 12, 40], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  alertBox('Risques critiques (P×I ≥ 16) : 6 sur 10. Risques majeurs (P×I 10-15) : 3 sur 10. Risque modéré : 1 sur 10. Priorité absolue : R2 (Cloud), R1 (UBO), R5 (LBC/FT), R8 (Substance), R3 (PCA/DG), R10 (Capital).', 'critical'),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



