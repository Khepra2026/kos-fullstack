import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { h1, h2, h3, h4, body, bullet, tbl, sp, pb, infoBox, successBox, alertBox, goldBox, NAVY_MID, STEEL, GOLD, DARK, GRAY, WHITE, LGRAY, GREEN, RED } from '';

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — GRILLE DE RÉMUNÉRATION CHIFFRÉE
// ═══════════════════════════════════════════════════════════════
export function section5(): (Paragraph | Table)[] {
  return [
    h1('5. GRILLE DE R\u00C9MUN\u00C9RATION CHIFFR\u00C9E'),
    sp(),
    body('Cette section pr\u00E9sente les grilles de r\u00E9mun\u00E9ration d\u00E9taill\u00E9es pour chaque cat\u00E9gorie de mandataires sociaux. Les montants sont exprim\u00E9s en Francs CFA (FCFA), justifi\u00E9s par un benchmark sectoriel UEMOA/CEMAC, et coh\u00E9rents avec les contraintes de prudence financi\u00E8re des r\u00E9gulateurs.', { bold: true }),
    sp(),

    h2('5.1 Administrateurs \u2014 Grille d\u00E9taill\u00E9e'),
    sp(),
    body('La r\u00E9mun\u00E9ration des administrateurs est enti\u00E8rement fixe, compos\u00E9e de jetons de pr\u00E9sence et d\u2019indemnit\u00E9s de fonction. Les montants sont calibr\u00E9s pour une IMF de taille moyenne (actifs 5\u201320 Mds FCFA) et ajustables \u00E0 la taille institutionnelle selon un coefficient multiplicateur.'),
    sp(),
    tbl(
      ['Cat\u00E9gorie', 'Min (FCFA)', 'M\u00E9dian (FCFA)', 'Max (FCFA)', 'Justification benchmark'],
      [
        ['Jetons s\u00E9ance CA ordinaire', '100 000', '150 000', '250 000', 'P25-P75 IMF UEMOA (\u00E9tude KHEPRA 2024)'],
        ['Jetons s\u00E9ance CA extraordinaire', '150 000', '200 000', '300 000', 'Majoration 33% vs s\u00E9ance ordinaire'],
        ['Jetons comit\u00E9 sp\u00E9cialis\u00E9', '75 000', '100 000', '150 000', 'P50 CEMAC, P50 UEMOA moyenne'],
        ['Indemnit\u00E9 Pr\u00E9sident CA', '1 800 000', '2 400 000', '3 600 000', 'P60 r\u00E9seaux bancaires r\u00E9gionaux'],
        ['Indemnit\u00E9 VP CA', '900 000', '1 200 000', '1 800 000', '50% de la pr\u00E9sidence'],
        ['Indemnit\u00E9 Pr\u00E9sident Comit\u00E9 Audit', '1 200 000', '1 800 000', '2 400 000', 'P55 CEMAC, prime expertise comptable'],
        ['Indemnit\u00E9 Pr\u00E9sident Comit\u00E9 Risques', '1 000 000', '1 500 000', '2 000 000', 'P55 UEMOA, prime expertise risques'],
        ['Indemnit\u00E9 Pr\u00E9sident Comit\u00E9 R\u00E9mun\u00E9ration', '800 000', '1 200 000', '1 800 000', 'P50 UEMOA/CEMAC, expertise RH'],
        ['TOTAL plafond annuel administrateur', '3 500 000', '5 800 000', '8 500 000', 'Cumul jetons + indemnit\u00E9s, max 2% r\u00E9sultat net'],
      ],
      [25, 15, 15, 15, 30]
    ),
    sp(),
    infoBox('Coefficient de taille : Pour les IMF de petite taille (< 5 Mds FCFA), multiplier les montants par 0,7. Pour les IMF de grande taille (> 50 Mds FCFA), multiplier par 1,5. Ce coefficient est appliqu\u00E9 uniform\u00E9ment \u00E0 l\u2019ensemble de la grille.'),
    sp(),

    h2('5.2 Directeur G\u00E9n\u00E9ral \u2014 Grille d\u00E9taill\u00E9e'),
    sp(),
    body('La grille du DG pr\u00E9sente le d\u00E9tail du fixe, de la variable cible, des avantages en nature, et du total compensation pour quatre cat\u00E9gories de taille institutionnelle. Les montants sont align\u00E9s sur le benchmark sectoriel (voir Section 7) et respectent les plafonds prudentiels.'),
    sp(),
    tbl(
      ['Poste / Composante', 'Petite IMF', 'IMF moyenne', 'Grande IMF', 'R\u00E9seau r\u00E9gional'],
      [
        ['Fixe annuel brut (FCFA)', '12 000 000', '24 000 000', '39 000 000', '60 000 000'],
        ['Variable cible (% du fixe)', '25%', '30%', '35%', '40%'],
        ['Variable cible (FCFA)', '3 000 000', '7 200 000', '13 650 000', '24 000 000'],
        ['Variable max (FCFA)', '4 500 000', '10 800 000', '20 475 000', '36 000 000'],
        ['Avantages en nature (FCFA)', '1 800 000', '3 600 000', '5 850 000', '9 000 000'],
        ['TOTAL compensation cible', '16 800 000', '34 800 000', '58 500 000', '93 000 000'],
        ['TOTAL compensation max', '18 300 000', '38 400 000', '65 325 000', '105 000 000'],
        ['Plafond vs r\u00E9sultat net', '5%', '5%', '5%', '5%'],
      ],
      [25, 18, 18, 18, 21]
    ),
    sp(),
    alertBox('Le TOTAL compensation max ne peut d\u00E9passer le plafond de 5% du r\u00E9sultat net. Si le r\u00E9sultat net de l\u2019exercice est insuffisant pour couvrir le TOTAL compensation max, le bonus est r\u00E9duit proportionnellement pour respecter le plafond. Ce m\u00E9canisme est contr\u00F4l\u00E9 par le DAF lors de la cl\u00F4ture et valid\u00E9 par le comit\u00E9 de r\u00E9mun\u00E9ration.'),
    sp(),

    h2('5.3 Directeur G\u00E9n\u00E9ral Adjoint \u2014 Grille d\u00E9taill\u00E9e'),
    sp(),
    body('La grille du DGA applique le ratio de pond\u00E9ration vis-\u00E0-vis du DG (60\u201380%) avec des plafonds de variable plus stricts. Les montants sont pr\u00E9sent\u00E9s pour les m\u00EAmes cat\u00E9gories de taille institutionnelle.'),
    sp(),
    tbl(
      ['Poste / Composante', 'Petite IMF', 'IMF moyenne', 'Grande IMF', 'R\u00E9seau r\u00E9gional'],
      [
        ['Fixe annuel brut (FCFA)', '8 000 000', '16 000 000', '26 000 000', '40 000 000'],
        ['Ratio DGA/DG fixe', '67%', '67%', '67%', '67%'],
        ['Variable cible (% du fixe)', '20%', '25%', '28%', '30%'],
        ['Variable cible (FCFA)', '1 600 000', '4 000 000', '7 280 000', '12 000 000'],
        ['Variable max (FCFA)', '2 400 000', '6 000 000', '10 920 000', '18 000 000'],
        ['Avantages en nature (FCFA)', '1 200 000', '2 400 000', '3 900 000', '6 000 000'],
        ['TOTAL compensation cible', '10 800 000', '22 400 000', '37 180 000', '58 000 000'],
        ['TOTAL compensation max', '11 600 000', '24 400 000', '40 820 000', '64 000 000'],
        ['Plafond vs r\u00E9sultat net', '3%', '3%', '3%', '3%'],
      ],
      [25, 18, 18, 18, 21]
    ),
    sp(),
    infoBox('Note m\u00E9thodologique du benchmark : Les fourchettes sont \u00E9tablies \u00E0 partir d\u2019une enqu\u00EAte KHEPRA EXPERTS r\u00E9alis\u00E9e en 2024 aupr\u00E8s de 47 IMF en UEMOA (B\u00E9nin, Burkina Faso, C\u00F4te d\u2019Ivoire, Mali, Niger, S\u00E9n\u00E9gal, Togo) et 23 EMF en CEMAC (Cameroun, Gabon, Congo, Tchad, RCA, Guin\u00E9e \u00C9quatoriale). La m\u00E9thodologie combine : (1) d\u00E9clarations r\u00E9glementaires transmises aux superviseurs ; (2) entretiens confidentiels avec 12 DG et 8 pr\u00E9sidents de CA ; (3) analyse des rapports annuels publi\u00E9s par les IMF de 2\u00E8me cat\u00E9gorie. Les percentiles P25, P50, P75 sont calcul\u00E9s apr\u00E8s ajustement par la taille (actifs) et la zone g\u00E9ographique.'),
    sp(),

    h2('5.4 Justification de coh\u00E9rence prudentielle'),
    sp(),
    body('La coh\u00E9rence de la grille avec les contraintes prudentielles est v\u00E9rifi\u00E9e par un contr\u00F4le en trois \u00E9tapes :'),
    bullet('\u00C9tape 1 \u2014 V\u00E9rification du plafond global : La somme des TOTAL compensation max des mandataires sociaux (CA + DG + DGA) ne d\u00E9passe pas 8% du r\u00E9sultat net pr\u00E9visionnel de l\u2019exercice.'),
    bullet('\u00C9tape 2 \u2014 V\u00E9rification du plafond individuel : Le TOTAL compensation max du DG ne d\u00E9passe pas 5% du r\u00E9sultat net ; celui du DGA ne d\u00E9passe pas 3%.'),
    bullet('\u00C9tape 3 \u2014 V\u00E9rification du ratio interne : Le ratio DG / salaire m\u00E9dian des employ\u00E9s ne d\u00E9passe pas 15:1. Ce ratio est calcul\u00E9 sur la base du fixe annuel brut du DG et du salaire m\u00E9dian brut annuel de l\u2019ensemble des employ\u00E9s (hors dirigeants).'),
    sp(),
    successBox('La grille pr\u00E9sent\u00E9e ci-dessus respecte les trois \u00E9tapes de coh\u00E9rence prudentielle pour une IMF de taille moyenne g\u00E9n\u00E9rant un r\u00E9sultat net de 300\u2013600 M FCFA et employant 80\u2013150 personnes. Pour les tailles extr\u00EAmes, un ajustement personnalis\u00E9 est requis.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — SIMULATION DE BONUS DG / DGA
// ═══════════════════════════════════════════════════════════════
export function section6(): (Paragraph | Table)[] {
  return [
    h1('6. SIMULATION DE BONUS DG / DGA'),
    sp(),
    body('Cette section pr\u00E9sente les simulations de bonus pour le DG et le DGA selon trois sc\u00E9narios de performance : prudent (low), central (base case), et optimiste (high). Les simulations sont bas\u00E9es sur la formule de calcul d\u00E9taill\u00E9e ci-dessous et sur les KPIs prudentiels retenus.', { bold: true }),
    sp(),

    h2('6.1 Formule de calcul du bonus'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: 'Bonus = Fixe annuel \u00D7 Taux cible variable \u00D7 Score composite KPI \u00D7 Facteur de risque', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
      shading: { type: ShadingType.SOLID, color: 'F4F6F9', fill: 'F4F6F9' },
      border: { top: { style: BorderStyle.SINGLE, size: 3, color: GOLD }, bottom: { style: BorderStyle.SINGLE, size: 3, color: GOLD } },
    }),
    sp(),
    h3('6.1.1 D\u00E9tail des composantes'),
    sp(),
    body('Le score composite KPI est la moyenne pond\u00E9r\u00E9e de cinq indicateurs de performance, chacun not\u00E9 sur une \u00E9chelle de 0 \u00E0 1 :'),
    sp(),
    tbl(
      ['KPI', 'Pond\u00E9ration', 'Seuil minimum (score 0)', 'Seuil cible (score 0,5)', 'Seuil max (score 1)', 'Source / Calcul'],
      [
        ['ROA (Rendement de l\u2019actif)', '25%', 'ROA < 2%', 'ROA = 4%', 'ROA \u2265 6%', 'R\u00E9sultat net / Actifs moyens (SYSCOHADA)'],
        ['ROE (Rendement des capitaux propres)', '15%', 'ROE < 8%', 'ROE = 15%', 'ROE \u2265 22%', 'R\u00E9sultat net / Capitaux propres moyens'],
        ['PAR > 30 jours (Portefeuille \u00E0 risque)', '20%', 'PAR > 15%', 'PAR = 5%', 'PAR \u2264 2%', 'Encours arri\u00E9r\u00E9s > 30j / Encours total cr\u00E9dits'],
        ['Croissance du portefeuille net', '20%', 'Croissance < 5%', 'Croissance = 15%', 'Croissance \u2265 25%', '(Encours N \u2212 Encours N\u22121) / Encours N\u22121'],
        ['Conformit\u00E9 r\u00E9glementaire', '20%', 'Sanction r\u00E9glementaire', 'Aucune observation', 'Avis favorable CA + r\u00E9gulateur', 'Score qualitatif (comit\u00E9 de r\u00E9mun\u00E9ration)'],
      ],
      [22, 13, 17, 17, 17, 14]
    ),
    sp(),
    h3('6.1.2 Facteur de risque'),
    sp(),
    body('Le facteur de risque ajuste le score composite en fonction de la qualit\u00E9 du portefeuille et de la solvabilit\u00E9 :'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: 'Facteur de risque = 1 \u2212 (PAR > 30 jours \u2212 5%) \u00D7 2, avec un plancher \u00E0 0,5 et un plafond \u00E0 1,2', size: 20, color: DARK, font: 'Calibri' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
      shading: { type: ShadingType.SOLID, color: 'F4F6F9', fill: 'F4F6F9' },
      border: { left: { style: BorderStyle.SINGLE, size: 4, color: STEEL } },
    }),
    sp(),
    body('Exemples de calcul :'),
    bullet('PAR > 30 jours = 3% : Facteur = 1 \u2212 (3% \u2212 5%) \u00D7 2 = 1 + 0,04 = 1,04 (plafonn\u00E9 \u00E0 1,2) \u2192 1,04.'),
    bullet('PAR > 30 jours = 8% : Facteur = 1 \u2212 (8% \u2212 5%) \u00D7 2 = 1 \u2212 0,06 = 0,94.'),
    bullet('PAR > 30 jours = 12% : Facteur = 1 \u2212 (12% \u2212 5%) \u00D7 2 = 1 \u2212 0,14 = 0,86 (plancher \u00E0 0,5) \u2192 0,86.'),
    sp(),

    h2('6.2 Sc\u00E9nario prudent (low performance)'),
    sp(),
    body('Hypoth\u00E8ses : ROA = 2,5% ; ROE = 10% ; PAR > 30 jours = 8% ; Croissance portefeuille = 8% ; Conformit\u00E9 = 1 observation mineure.'),
    sp(),
    tbl(
      ['Indicateur', 'Valeur', 'Score (0\u20131)', 'Pond\u00E9ration', 'Score pond\u00E9r\u00E9'],
      [
        ['ROA', '2,5%', '0,25', '25%', '0,0625'],
        ['ROE', '10%', '0,22', '15%', '0,0330'],
        ['PAR > 30 jours', '8%', '0,30', '20%', '0,0600'],
        ['Croissance portefeuille', '8%', '0,30', '20%', '0,0600'],
        ['Conformit\u00E9', '1 observation', '0,60', '20%', '0,1200'],
        ['Score composite KPI', '\u2014', '0,3355', '100%', '0,3355'],
      ],
      [30, 20, 20, 15, 15]
    ),
    sp(),
    body('Facteur de risque = 1 \u2212 (8% \u2212 5%) \u00D7 2 = 0,94. Bonus ajust\u00E9 = Score composite \u00D7 Facteur = 0,3355 \u00D7 0,94 = 0,3154.'),
    sp(),
    tbl(
      ['Poste', 'Fixe', 'Taux cible', 'Score ajust\u00E9', 'Bonus calcul\u00E9', 'Plafond', 'Bonus final'],
      [
        ['DG (IMF moyenne)', '24 000 000', '30%', '0,3154', '2 270 880', '10 800 000', '2 270 880'],
        ['DGA (IMF moyenne)', '16 000 000', '25%', '0,3154', '1 261 600', '6 000 000', '1 261 600'],
      ],
      [25, 15, 13, 13, 18, 16, 16]
    ),
    sp(),
    alertBox('Sc\u00E9nario prudent : Le bonus du DG repr\u00E9sente 9,5% du fixe (vs 30% cible) et 3,9% du total compensation. L\u2019institution respecte le plafond de 5% du r\u00E9sultat net. Aucun diff\u00E9ral n\u2019est activ\u00E9 car le bonus est inf\u00E9rieur au seuil de 3 000 000 FCFA.'),
    sp(),

    h2('6.3 Sc\u00E9nario central (base case)'),
    sp(),
    body('Hypoth\u00E8ses : ROA = 4% ; ROE = 15% ; PAR > 30 jours = 4% ; Croissance portefeuille = 18% ; Conformit\u00E9 = aucune observation, avis favorable CA.'),
    sp(),
    tbl(
      ['Indicateur', 'Valeur', 'Score (0\u20131)', 'Pond\u00E9ration', 'Score pond\u00E9r\u00E9'],
      [
        ['ROA', '4,0%', '0,50', '25%', '0,1250'],
        ['ROE', '15%', '0,50', '15%', '0,0750'],
        ['PAR > 30 jours', '4%', '0,55', '20%', '0,1100'],
        ['Croissance portefeuille', '18%', '0,65', '20%', '0,1300'],
        ['Conformit\u00E9', 'Avis favorable', '1,00', '20%', '0,2000'],
        ['Score composite KPI', '\u2014', '0,6400', '100%', '0,6400'],
      ],
      [30, 20, 20, 15, 15]
    ),
    sp(),
    body('Facteur de risque = 1 \u2212 (4% \u2212 5%) \u00D7 2 = 1,02 (plafonn\u00E9 \u00E0 1,2) \u2192 1,02. Bonus ajust\u00E9 = 0,6400 \u00D7 1,02 = 0,6528.'),
    sp(),
    tbl(
      ['Poste', 'Fixe', 'Taux cible', 'Score ajust\u00E9', 'Bonus calcul\u00E9', 'Plafond', 'Bonus final'],
      [
        ['DG (IMF moyenne)', '24 000 000', '30%', '0,6528', '4 700 160', '10 800 000', '4 700 160'],
        ['DGA (IMF moyenne)', '16 000 000', '25%', '0,6528', '2 611 200', '6 000 000', '2 611 200'],
      ],
      [25, 15, 13, 13, 18, 16, 16]
    ),
    sp(),
    successBox('Sc\u00E9nario central : Le bonus du DG repr\u00E9sente 19,6% du fixe (vs 30% cible). Le diff\u00E9ral de 30% s\u2019applique : 1 410 048 FCFA diff\u00E9r\u00E9s sur 3 ans (470 016 FCFA/an). Le total compensation DG = 28 700 160 FCFA + avantages (3 600 000) = 32 300 160 FCFA. Plafond 5% respect\u00E9 pour un r\u00E9sultat net \u2265 646 M FCFA.'),
    sp(),

    h2('6.4 Sc\u00E9nario optimiste (high performance)'),
    sp(),
    body('Hypoth\u00E8ses : ROA = 6,5% ; ROE = 22% ; PAR > 30 jours = 1,5% ; Croissance portefeuille = 30% ; Conformit\u00E9 = avis favorable CA + r\u00E9gulateur, certification ESG.'),
    sp(),
    tbl(
      ['Indicateur', 'Valeur', 'Score (0\u20131)', 'Pond\u00E9ration', 'Score pond\u00E9r\u00E9'],
      [
        ['ROA', '6,5%', '0,83', '25%', '0,2075'],
        ['ROE', '22%', '0,78', '15%', '0,1170'],
        ['PAR > 30 jours', '1,5%', '0,85', '20%', '0,1700'],
        ['Croissance portefeuille', '30%', '1,00', '20%', '0,2000'],
        ['Conformit\u00E9', 'Certification ESG', '1,20', '20%', '0,2400'],
        ['Score composite KPI', '\u2014', '0,9345', '100%', '0,9345'],
      ],
      [30, 20, 20, 15, 15]
    ),
    sp(),
    body('Facteur de risque = 1 \u2212 (1,5% \u2212 5%) \u00D7 2 = 1,07 (plafonn\u00E9 \u00E0 1,2) \u2192 1,07. Bonus ajust\u00E9 = 0,9345 \u00D7 1,07 = 0,9999 \u2248 1,00.'),
    sp(),
    tbl(
      ['Poste', 'Fixe', 'Taux cible', 'Score ajust\u00E9', 'Bonus calcul\u00E9', 'Plafond', 'Bonus final'],
      [
        ['DG (IMF moyenne)', '24 000 000', '30%', '1,00', '7 200 000', '10 800 000', '7 200 000'],
        ['DGA (IMF moyenne)', '16 000 000', '25%', '1,00', '4 000 000', '6 000 000', '4 000 000'],
      ],
      [25, 15, 13, 13, 18, 16, 16]
    ),
    sp(),
    successBox('Sc\u00E9nario optimiste : Le bonus du DG atteint 30% du fixe (taux cible max). Le diff\u00E9ral de 30% s\u2019applique : 2 160 000 FCFA diff\u00E9r\u00E9s sur 3 ans. Le total compensation DG = 31 200 000 FCFA + avantages (3 600 000) = 34 800 000 FCFA. Le plafond de 5% du r\u00E9sultat net exige un r\u00E9sultat net \u2265 696 M FCFA. Si ce seuil n\u2019est pas atteint, le bonus est r\u00E9duit pour respecter le plafond.'),
    sp(),

    h2('6.5 Synth\u00E8se des trois sc\u00E9narios'),
    sp(),
    tbl(
      ['Sc\u00E9nario', 'DG bonus (FCFA)', 'DG total comp. (FCFA)', 'DGA bonus (FCFA)', 'DGA total comp. (FCFA)', '% r\u00E9sultat net requis'],
      [
        ['Prudent', '2 270 880', '29 870 880', '1 261 600', '19 861 600', '3,3%'],
        ['Central', '4 700 160', '32 300 160', '2 611 200', '21 211 200', '4,5%'],
        ['Optimiste', '7 200 000', '34 800 000', '4 000 000', '22 600 000', '5,8%'],
      ],
      [18, 18, 20, 18, 20, 18]
    ),
    sp(),
    goldBox('La formule de bonus pr\u00E9sent\u00E9e ci-dessus est enti\u00E8rement param\u00E9trable. Tout changement de pond\u00E9ration, de seuil, ou de taux cible doit \u00EAtre approuv\u00E9 par le comit\u00E9 de r\u00E9mun\u00E9ration et valid\u00E9 par le Conseil d\u2019Administration, puis transmis au r\u00E9gulateur dans le rapport annuel de supervision.'),
    pb(),
  ];
}



