import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { h1, h2, h3, h4, body, bullet, tbl, sp, pb, infoBox, successBox, alertBox, goldBox, NAVY_MID, STEEL, GOLD, DARK, GRAY, WHITE, LGRAY, GREEN, RED } from '';

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — PRINCIPES DE RÉMUNÉRATION
// ═══════════════════════════════════════════════════════════════
export function section3(): (Paragraph | Table)[] {
  return [
    h1('3. PRINCIPES DE R\u00C9MUN\u00C9RATION'),
    sp(),
    body('La politique de r\u00E9mun\u00E9ration des dirigeants repose sur six principes fondamentaux, coh\u00E9rents avec le cadre prudentiel africain et les standards internationaux de gouvernance. Chaque principe est op\u00E9rationnalis\u00E9 par des r\u00E8gles concr\u00E8tes applicables \u00E0 l\u2019ensemble du r\u00E9seau IMF.', { bold: true }),
    sp(),

    h2('3.1 Principe 1 : Prudence financi\u00E8re'),
    sp(),
    body('La r\u00E9mun\u00E9ration globale des mandataires sociaux (Administrateurs + DG + DGA) est strictement plafonn\u00E9e en proportion du r\u00E9sultat net consolid\u00E9 de l\u2019institution. Ce plafonnement constitue une r\u00E8gle de hard stop, non n\u00E9gociable.'),
    sp(),
    tbl(
      ['Cat\u00E9gorie de mandataires', 'Plafond \u00AB hard stop \u00BB', 'M\u00E9canisme de d\u00E9clenchement', 'Cons\u00E9quence du d\u00E9passement'],
      [
        ['Administrateurs (total CA)', '3% du r\u00E9sultat net', 'Calcul trimestriel par le DAF', 'Validation sp\u00E9ciale AG + d\u00E9claration BCEAO/COBAC'],
        ['DG (fixe + variable + avantages)', '5% du r\u00E9sultat net', 'Calcul annuel par le comit\u00E9 de r\u00E9mun\u00E9ration', 'Clawback automatique sur le bonus de l\u2019exercice N+1'],
        ['DGA (fixe + variable + avantages)', '3% du r\u00E9sultat net', 'Calcul annuel par le comit\u00E9 de r\u00E9mun\u00E9ration', 'R\u00E9duction proportionnelle du bonus de l\u2019exercice N+1'],
        ['TOTAL mandataires sociaux', '8% du r\u00E9sultat net', 'Audit interne annuel', 'D\u00E9claration au r\u00E9gulateur + plan de redressement'],
      ],
      [25, 20, 30, 25]
    ),
    sp(),
    alertBox('En cas de perte nette, aucune r\u00E9mun\u00E9ration variable ne peut \u00EAtre vers\u00E9e. Les jetons de pr\u00E9sence des administrateurs et le fixe du DG/DGA sont maintenus, sous r\u00E9serve de leur caract\u00E8re raisonnable au regard des r\u00E9serves de l\u2019institution et de la solvabilit\u00E9.'),
    sp(),

    h2('3.2 Principe 2 : Alignement risque / performance / long terme'),
    sp(),
    body('La structure de r\u00E9mun\u00E9ration doit inciter les dirigeants \u00E0 privil\u00E9gier la durabilit\u00E9 de la performance sur la maximisation du r\u00E9sultat de court terme. Trois m\u00E9canismes op\u00E9rationnels assurent cet alignement :'),
    bullet('Diff\u00E9ral minimum : 30% du bonus annuel du DG et 20% du bonus du DGA sont diff\u00E9r\u00E9s sur trois exercices (N+1, N+2, N+3), avec versement conditionn\u00E9 \u00E0 l\u2019absence de d\u00E9faut de conformit\u00E9 ou de retrait de l\u2019agr\u00E9ment dans l\u2019intervalle.'),
    bullet('Malus clause : En cas de d\u00E9gradation du ratio de solvabilit\u00E9 en dessous du seuil r\u00E9glementaire (8% pour BCEAO, 10% pour COBAC), de d\u00E9passement du PAR > 30 jours au-del\u00E0 de 10%, ou de sanction r\u00E9glementaire, le bonus diff\u00E9r\u00E9 est r\u00E9duit de 50% \u00E0 100%.'),
    bullet('Risk-adjusted KPIs : Le score composite de performance int\u00E8gre un facteur d\u2019ajustement au risque. Par exemple, un ROA de 5% avec un PAR > 30 jours de 8% est p\u00E9nalis\u00E9 comparativement \u00E0 un ROA de 4% avec un PAR > 30 jours de 3%.'),
    sp(),
    infoBox('M\u00E9canisme de calcul : Score composite ajust\u00E9 = (ROA pond\u00E9r\u00E9 \u00D7 40%) + (Croissance portefeuille pond\u00E9r\u00E9e \u00D7 25%) + (Conformit\u00E9 r\u00E9glementaire \u00D7 20%) + (Liquidit\u00E9 / ratio LCR \u00D7 15%). Le r\u00E9sultat est ensuite ajust\u00E9 par un facteur de risque : Multiplicateur = 1 \u2212 (PAR > 30 jours \u2212 5%) \u00D7 2, avec un plancher \u00E0 0,5.'),
    sp(),

    h2('3.3 Principe 3 : Limitation des incitations au risque excessif'),
    sp(),
    body('Aucune composante de la r\u00E9mun\u00E9ration ne doit cr\u00E9er une incitation \u00E0 prendre des risques inconsid\u00E9r\u00E9s. Les dispositifs suivants interdisent ou limitent les comportements de prise de risque excessif :'),
    bullet('Interdiction des stock options et des warrants pour les dirigeants d\u2019IMF, en application du principe de prudence financi\u00E8re BCEAO/COBAC. La r\u00E9mun\u00E9ration variable ne peut prendre la forme d\u2019instruments de capitaux propres.'),
    bullet('Plafonnement du bonus individuel : Le bonus du DG ne peut exc\u00E9der 150% du fixe annuel ; celui du DGA ne peut exc\u00E9der 100% du fixe annuel. Ce plafond constitue un hard cap incompressible.'),
    bullet('R\u00E9f\u00E9rence aux KPIs prudentiels : Le bonus est index\u00E9 sur des indicateurs prudentiels (ROA, ROE, PAR > 30 jours, ratio de couverture des pertes, liquidit\u00E9) et non sur des indicateurs de croissance pure (nombre de clients, volume de cr\u00E9dits octroy\u00E9s).'),
    bullet('Clawback (r\u00E9cup\u00E9ration) : En cas de r\u00E9vision n\u00E9gative des \u00E9tats financiers des exercices N, N\u22121 ou N\u22122 (erreur comptable, fraude, sanction r\u00E9glementaire), les bonus diff\u00E9r\u00E9s des exercices concern\u00E9s sont sujets \u00E0 clawback proportionnelle.'),
    sp(),
    alertBox('La COBAC et la BCEAO consid\u00E8rent les r\u00E9mun\u00E9rations li\u00E9es exclusivement \u00E0 la croissance du portefeuille de cr\u00E9dits comme un indicateur de risque de gouvernance de niveau 2 (\u00AB surveillance renforc\u00E9e \u00BB).'),
    sp(),

    h2('3.4 Principe 4 : Transparence et validation par le CA'),
    sp(),
    body('La transparence de la r\u00E9mun\u00E9ration est une exigence l\u00E9gale (OHADA, COBAC directive) et une condition de confiance des parties prenantes. La politique pr\u00E9voit :'),
    bullet('Publication annuelle d\u00E9taill\u00E9e : Le rapport annuel de l\u2019IMF inclut une section « R\u00E9mun\u00E9ration des mandataires sociaux » d\u00E9taillant le montant total des r\u00E9mun\u00E9rations par cat\u00E9gorie (fixe, variable, avantages), les crit\u00E8res de performance, et l\u2019\u00E9cart salarial DG/m\u00E9dian.'),
    bullet('Vote sp\u00E9cifique de l\u2019AG : La politique de r\u00E9mun\u00E9ration et les modifications substantielles sont soumises \u00E0 un vote sp\u00E9cifique de l\u2019Assembl\u00E9e G\u00E9n\u00E9rale, distinct du vote sur les \u00E9tats financiers. Le quorum est de 50% des actionnaires pr\u00E9sents ou repr\u00E9sent\u00E9s.'),
    bullet('Comit\u00E9 de r\u00E9mun\u00E9ration ind\u00E9pendant : Compos\u00E9 d\u2019au moins 3 membres, dont 2 administrateurs ind\u00E9pendants et 1 expert externe (consultant RH ou cabinet de conseil). Ce comit\u00E9 se r\u00E9unit au minimum 2 fois par an.'),
    sp(),
    infoBox('Composition recommand\u00E9e du comit\u00E9 de r\u00E9mun\u00E9ration : Pr\u00E9sident (administrateur ind\u00E9pendant, non ex\u00E9cutif) ; Membre 1 (administrateur ind\u00E9pendant, expert en comptabilit\u00E9/finance) ; Membre 2 (consultant externe, sp\u00E9cialiste r\u00E9mun\u00E9ration bancaire). Aucun dirigeant ex\u00E9cutif ne peut si\u00E9ger au comit\u00E9.'),
    sp(),

    h2('3.5 Principe 5 : \u00C9quit\u00E9 interne et externe'),
    sp(),
    body('L\u2019\u00E9quit\u00E9 de la r\u00E9mun\u00E9ration garantit la coh\u00E9rence interne (au sein de la gouvernance et par rapport aux employ\u00E9s) et la comp\u00E9titivit\u00E9 externe (par rapport au march\u00E9 des talents).'),
    sp(),
    h3('3.5.1 \u00C9quit\u00E9 interne'),
    body('Le rapport de r\u00E9mun\u00E9ration entre le DG et le salaire m\u00E9dian de l\u2019institution ne doit pas d\u00E9passer 15:1, conform\u00E9ment aux recommandations de la BAD et de l\u2019IFC pour les institutions financi\u00E8res partenaires en Afrique. Ce ratio est calcul\u00E9 annuellement et publi\u00E9 dans le rapport de r\u00E9mun\u00E9ration.'),
    sp(),
    h3('3.5.2 \u00C9quit\u00E9 externe'),
    body('Un benchmark annuel est r\u00E9alis\u00E9 par un cabinet externe (KHEPRA EXPERTS ou autre consultant sp\u00E9cialis\u00E9) pour positionner la r\u00E9mun\u00E9ration du DG et du DGA par rapport aux IMF de taille comparable (actifs 5 Mds \u2212 50 Mds FCFA) dans la m\u00EAme zone g\u00E9ographique. Le positionnement cible est le 50\u00E8me percentile (m\u00E9diane) pour le fixe et le 60\u00E8me percentile pour la r\u00E9mun\u00E9ration totale (fixe + variable).'),
    sp(),
    tbl(
      ['Indicateur d\u2019\u00E9quit\u00E9', 'Seuil interne', 'Seuil externe', 'Fr\u00E9quence de mesure'],
      [
        ['Ratio DG / salaire m\u00E9dian', '\u2264 15:1', '\u2014', 'Annuelle'],
        ['Ratio DGA / salaire m\u00E9dian', '\u2264 10:1', '\u2014', 'Annuelle'],
        ['Positionnement fixe DG vs march\u00E9', '\u2014', 'P50 (m\u00E9diane)', 'Annuelle'],
        ['Positionnement total DG vs march\u00E9', '\u2014', 'P60', 'Annuelle'],
        ['\u00C9cart de r\u00E9mun\u00E9ration hommes/femmes', '\u2264 5%', '\u2264 5%', 'Annuelle'],
      ],
      [30, 20, 20, 30]
    ),
    sp(),

    h2('3.6 Principe 6 : Conformit\u00E9 sociale et r\u00E9glementaire'),
    sp(),
    body('La r\u00E9mun\u00E9ration des dirigeants doit respecter l\u2019ensemble des obligations sociales et fiscales applicables dans chaque pays d\u2019op\u00E9ration :'),
    bullet('Cotisations sociales : Les r\u00E9mun\u00E9rations brutes des dirigeants sont soumises aux cotisations sociales (CNSS, CGRAE, Caisse de retraite) selon la l\u00E9gislation nationale, sans exemption. Les avantages en nature sont imput\u00E9s \u00E0 leur valeur r\u00E9elle.'),
    bullet('Imp\u00F4t sur le revenu : Les r\u00E9mun\u00E9rations sont soumises \u00E0 l\u2019imp\u00F4t sur le revenu des traitements et salaires (IRTS) selon le bar\u00E8me national. L\u2019institution effectue la retenue \u00E0 la source.'),
    bullet('Convention collective : Bien que les dirigeants ne soient pas n\u00E9cessairement couverts par la convention collective sectorielle, la politique de r\u00E9mun\u00E9ration en tient compte pour garantir l\u2019\u00E9quit\u00E9 externe.'),
    bullet('Droit du travail local : Les clauses de non-concurrence, de confidentialit\u00E9, et de pr\u00E9avis sont r\u00E9dig\u00E9es conform\u00E9ment au code du travail national, avec une dur\u00E9e de pr\u00E9avis de 3 \u00E0 6 mois pour le DG et le DGA.'),
    sp(),
    successBox('Les six principes pr\u00E9sent\u00E9s ci-dessus constituent la colonne vert\u00E9brale de la politique de r\u00E9mun\u00E9ration. Toute d\u00E9rogation doit \u00Eatre motiv\u00E9e, soumise au comit\u00E9 de r\u00E9mun\u00E9ration, et approuv\u00E9e par le Conseil d\u2019Administration.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — ARCHITECTURE DE RÉMUNÉRATION
// ═══════════════════════════════════════════════════════════════
export function section4(): (Paragraph | Table)[] {
  return [
    h1('4. ARCHITECTURE DE R\u00C9MUN\u00C9RATION'),
    sp(),
    body('Cette section d\u00E9taille la structure compl\u00E8te de la r\u00E9mun\u00E9ration pour chaque cat\u00E9gorie de mandataires sociaux : Administrateurs non ex\u00E9cutifs, Directeur G\u00E9n\u00E9ral (DG), et Directeur G\u00E9n\u00E9ral Adjoint (DGA). Chaque composante est d\u00E9finie avec ses modalit\u00E9s de calcul, ses conditions d\u2019attribution, et ses contraintes r\u00E9glementaires.', { bold: true }),
    sp(),

    h2('4.1 Administrateurs non ex\u00E9cutifs'),
    sp(),
    body('Les administrateurs non ex\u00E9cutifs assurent la fonction de supervision strat\u00E9gique et de contr\u00F4le de la direction g\u00E9n\u00E9rale. Leur r\u00E9mun\u00E9ration est strictement fixe, sans composante variable, afin de pr\u00E9server leur ind\u00E9pendance et leur objectivit\u00E9.'),
    sp(),
    h3('4.1.1 Jetons de pr\u00E9sence'),
    sp(),
    body('Les jetons de pr\u00E9sence sont allou\u00E9s par s\u00E9ance du Conseil d\u2019Administration et des comit\u00E9s permanents (Audit, Risques, R\u00E9mun\u00E9ration). Les montants sont fix\u00E9s par l\u2019Assembl\u00E9e G\u00E9n\u00E9rale sur proposition du comit\u00E9 de r\u00E9mun\u00E9ration.'),
    sp(),
    tbl(
      ['Type de s\u00E9ance', 'Montant unitaire (FCFA)', 'Plafond annuel (FCFA)', 'Conditions'],
      [
        ['S\u00E9ance ordinaire du CA', '150 000', '1 800 000', 'Pr\u00E9sence effective, quorum atteint'],
        ['S\u00E9ance extraordinaire du CA', '200 000', '800 000', 'Convocation sp\u00E9ciale, pr\u00E9sence effective'],
        ['Comit\u00E9 d\u2019Audit', '100 000', '1 200 000', 'Pr\u00E9sence effective, r\u00E9union valid\u00E9e'],
        ['Comit\u00E9 des Risques', '100 000', '1 200 000', 'Pr\u00E9sence effective, r\u00E9union valid\u00E9e'],
        ['Comit\u00E9 de R\u00E9mun\u00E9ration', '100 000', '800 000', 'Pr\u00E9sence effective, r\u00E9union valid\u00E9e'],
        ['TOTAL plafond annuel par administrateur', '\u2014', '5 800 000', 'Cumul de toutes les cat\u00E9gories'],
      ],
      [25, 20, 25, 30]
    ),
    sp(),
    infoBox('Source BCEAO : La Circulaire n\u00B0009-05-2016 pr\u00E9conise que les jetons de pr\u00E9sence des administrateurs non ex\u00E9cutifs ne d\u00E9passent pas 2% du r\u00E9sultat net de l\u2019exercice pour l\u2019ensemble du CA. Le plafond de 5 800 000 FCFA par administrateur respecte cette r\u00E8gle pour une IMF de taille moyenne (r\u00E9sultat net 150\u2013300 M FCFA).'),
    sp(),

    h3('4.1.2 Indemnit\u00E9s fixes'),
    sp(),
    body('Les indemnit\u00E9s fixes annuelles sont attribu\u00E9es aux administrateurs qui assument des responsabilit\u00E9s particuli\u00E8res (pr\u00E9sident du CA, pr\u00E9sidents de comit\u00E9s sp\u00E9cialis\u00E9s). Ces indemnit\u00E9s sont d\u00E9termin\u00E9es par l\u2019AG sur proposition du comit\u00E9 de r\u00E9mun\u00E9ration.'),
    sp(),
    tbl(
      ['Fonction', 'Indemnit\u00E9 fixe annuelle (FCFA)', 'Conditions'],
      [
        ['Pr\u00E9sident du Conseil d\u2019Administration', '2 400 000', 'Non ex\u00E9cutif, s\u00E9paration des fonctions DG/Pr\u00E9sident'],
        ['Vice-pr\u00E9sident du CA', '1 200 000', 'Non ex\u00E9cutif, pr\u00E9sence aux s\u00E9ances obligatoire'],
        ['Pr\u00E9sident du Comit\u00E9 d\u2019Audit', '1 800 000', 'Comp\u00E9tences comptables/financi\u00E8res av\u00E9r\u00E9es'],
        ['Pr\u00E9sident du Comit\u00E9 des Risques', '1 500 000', 'Exp\u00E9rience en gestion des risques bancaires'],
        ['Pr\u00E9sident du Comit\u00E9 de R\u00E9mun\u00E9ration', '1 200 000', 'Ind\u00E9pendance garantie, expertise RH/Finance'],
        ['Administrateur simple', '0', 'Jetons de pr\u00E9sence uniquement'],
      ],
      [35, 30, 35]
    ),
    sp(),
    h3('4.1.3 Absence de variable'),
    sp(),
    body('Conform\u00E9ment aux standards IFC/BAD et aux pr\u00E9conisations de la COBAC, les administrateurs non ex\u00E9cutifs ne peuvent percevoir aucune forme de r\u00E9mun\u00E9ration variable (bonus, commissions, stock options, warrants, participations aux b\u00E9n\u00E9fices). Cette r\u00E8gle vise \u00E0 :'),
    bullet('Pr\u00E9server l\u2019ind\u00E9pendance de jugement des administrateurs dans leur mission de supervision de la direction g\u00E9n\u00E9rale.'),
    bullet('\u00C9viter les conflits d\u2019int\u00E9r\u00EAts li\u00E9s \u00E0 une r\u00E9mun\u00E9ration conditionn\u00E9e aux m\u00EAmes indicateurs que ceux de la direction.'),
    bullet('Garantir la conformit\u00E9 avec le principe de s\u00E9paration des fonctions de gestion et de contr\u00F4le, inscrit dans l\u2019Instruction BCEAO n\u00B0008-05-2015.'),
    sp(),
    successBox('La structure fixe des r\u00E9mun\u00E9rations administratives constitue une garantie de gouvernance saine. Elle est exig\u00E9e par la COBAC (Directive 01/20) et recommand\u00E9e par l\u2019IFC pour l\u2019obtention de financements institutionnels.'),
    sp(),

    h2('4.2 Directeur G\u00E9n\u00E9ral (DG)'),
    sp(),
    body('Le Directeur G\u00E9n\u00E9ral est le premier dirigeant ex\u00E9cutif de l\u2019institution. Sa r\u00E9mun\u00E9ration est structur\u00E9e en trois composantes (fixe, variable, avantages en nature), avec une pond\u00E9ration qui privil\u00E9gie le fixe pour garantir la stabilit\u00E9 et le long terme.'),
    sp(),
    h3('4.2.1 Salaire fixe annuel'),
    sp(),
    body('Le salaire fixe annuel brut du DG est d\u00E9termin\u00E9 par r\u00E9f\u00E9rence au benchmark sectoriel (voir Section 5 et Section 7) et valid\u00E9 par le comit\u00E9 de r\u00E9mun\u00E9ration. Il est r\u00E9visable annuellement, avec une augmentation maximale de 5% par an en l\u2019absence de changement de structure de gouvernance ou de taille institutionnelle significative.'),
    sp(),
    tbl(
      ['Cat\u00E9gorie institutionnelle', 'Actifs consolid\u00E9s', 'Fourchette fixe DG annuel (FCFA)'],
      [
        ['IMF de petite taille', '< 5 Mds FCFA', '12 000 000 \u2013 18 000 000'],
        ['IMF de taille moyenne', '5 \u2013 20 Mds FCFA', '18 000 000 \u2013 30 000 000'],
        ['IMF de grande taille', '20 \u2013 50 Mds FCFA', '30 000 000 \u2013 48 000 000'],
        ['IMF r\u00E9gionale / r\u00E9seau', '> 50 Mds FCFA', '48 000 000 \u2013 72 000 000'],
      ],
      [25, 25, 50]
    ),
    sp(),
    infoBox('Le fixe du DG repr\u00E9sente 60\u201370% de sa r\u00E9mun\u00E9ration totale, conform\u00E9ment au plafond COBAC de 40% de variable dans la r\u00E9mun\u00E9ration totale. Cette structure garantit que le DG n\u2019est pas excessivement d\u00E9pendant des bonus de court terme.'),
    sp(),

    h3('4.2.2 Bonus annuel variable'),
    sp(),
    body('Le bonus annuel du DG est d\u00E9termin\u00E9 par la formule suivante :'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: 'Bonus DG = Fixe annuel \u00D7 Taux cible variable \u00D7 Score composite KPI', bold: true, size: 20, color: NAVY_MID, font: 'Calibri' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 160 },
      shading: { type: ShadingType.SOLID, color: 'F4F6F9', fill: 'F4F6F9' },
      border: { top: { style: BorderStyle.SINGLE, size: 2, color: STEEL }, bottom: { style: BorderStyle.SINGLE, size: 2, color: STEEL } },
    }),
    sp(),
    body('O\u00F9 :'),
    bullet('Taux cible variable = 40% maximum (plafond COBAC) ; taux de base = 25%.'),
    bullet('Score composite KPI = pond\u00E9ration de 5 indicateurs (voir Section 6 pour le d\u00E9tail).'),
    bullet('Score composite varie de 0 (aucun bonus) \u00E0 1,5 (bonus major\u00E9 de 50% en cas de performance exceptionnelle).'),
    sp(),
    h3('4.2.3 Avantages en nature'),
    sp(),
    body('Les avantages en nature accord\u00E9s au DG sont limit\u00E9s et d\u00E9clar\u00E9s en annexe des \u00E9tats financiers. Ils incluent :'),
    bullet('V\u00E9hicule de fonction avec chauffeur : valeur imput\u00E9e 2 400 000 FCFA/an (frais de location, entretien, carburant).'),
    bullet('T\u00E9l\u00E9phone et communication : valeur imput\u00E9e 600 000 FCFA/an.'),
    bullet('Assurance sant\u00E9 internationale : valeur imput\u00E9e 1 200 000 FCFA/an (couverture familiale incluse).'),
    bullet('Frais de repr\u00E9sentation : plafond annuel de 2 000 000 FCFA, justifi\u00E9s par des notes de frais d\u00E9taill\u00E9es.'),
    sp(),
    alertBox('Le montant total des avantages en nature du DG ne peut exc\u00E9der 15% du salaire fixe annuel brut. Cette r\u00E8gle s\u2019applique \u00E0 l\u2019ensemble des mandataires sociaux et est contr\u00F4l\u00E9e par le DAF lors de la cl\u00F4ture annuelle.'),
    sp(),

    h2('4.3 Directeur G\u00E9n\u00E9ral Adjoint (DGA)'),
    sp(),
    body('Le DGA assiste le DG dans la gestion quotidienne de l\u2019institution. Sa r\u00E9mun\u00E9ration est structur\u00E9e de mani\u00E8re similaire au DG, mais avec une pond\u00E9ration r\u00E9duite et un plafond de variable plus strict.'),
    sp(),
    h3('4.3.1 Fixe + variable plafonn\u00E9'),
    sp(),
    body('Le salaire fixe du DGA est positionn\u00E9 \u00E0 60\u201380% du fixe du DG, selon le profil d\u2019exp\u00E9rience, la complexit\u00E9 des responsabilit\u00E9s confi\u00E9es, et le benchmark sectoriel.'),
    sp(),
    tbl(
      ['Cat\u00E9gorie institutionnelle', 'Fourchette fixe DGA annuel (FCFA)', 'Ratio DGA/DG fixe'],
      [
        ['IMF de petite taille', '8 000 000 \u2013 12 000 000', '65\u201370%'],
        ['IMF de taille moyenne', '12 000 000 \u2013 20 000 000', '65\u201375%'],
        ['IMF de grande taille', '20 000 000 \u2013 32 000 000', '65\u201380%'],
        ['IMF r\u00E9gionale / r\u00E9seau', '32 000 000 \u2013 48 000 000', '65\u201380%'],
      ],
      [30, 40, 30]
    ),
    sp(),
    h3('4.3.2 Bonus limit\u00E9 et conditionn\u00E9'),
    sp(),
    body('Le bonus du DGA est calcul\u00E9 selon la m\u00EAme formule que le DG, avec les ajustements suivants :'),
    bullet('Taux cible variable = 30% maximum (vs 40% pour le DG), conform\u00E9ment \u00E0 la directive COBAC sur la hi\u00E9rarchie des risques de gouvernance.'),
    bullet('Score composite KPI : les pond\u00E9rations sont identiques mais le DGA est \u00E9valu\u00E9 sur les domaines de responsabilit\u00E9 qui lui sont sp\u00E9cifiquement confi\u00E9s (op\u00E9rations, risques, finance, ou commercial selon le profil).'),
    bullet('Plafond hard cap : le bonus du DGA ne peut exc\u00E9der 100% du fixe annuel (vs 150% pour le DG).'),
    sp(),
    infoBox('Exemple de calcul DGA (IMF taille moyenne) : Fixe = 18 000 000 FCFA ; Taux cible = 25% ; Score composite = 0,9. Bonus = 18 000 000 \u00D7 0,25 \u00D7 0,9 = 4 050 000 FCFA. Total compensation = 22 050 000 FCFA + avantages en nature (2 700 000 FCFA) = 24 750 000 FCFA.'),
    sp(),

    h2('4.4 Synth\u00E8se architecturale'),
    sp(),
    tbl(
      ['Composante', 'Administrateurs', 'DG', 'DGA'],
      [
        ['Fixe', 'Jetons + indemnit\u00E9s', '60\u201370% du total', '65\u201380% du fixe DG'],
        ['Variable', 'Interdit', '25\u201340% du fixe', '20\u201330% du fixe'],
        ['Avantages en nature', 'Non', 'Max 15% du fixe', 'Max 15% du fixe'],
        ['Diff\u00E9ral', 'N/A', '30% du bonus sur 3 ans', '20% du bonus sur 3 ans'],
        ['Clawback', 'N/A', 'Oui, 3 ans', 'Oui, 3 ans'],
        ['Malus clause', 'N/A', 'Oui', 'Oui'],
        ['Plafond total vs r\u00E9sultat net', '3% (total CA)', '5%', '3%'],
      ],
      [20, 25, 25, 30]
    ),
    sp(),
    successBox('L\u2019architecture de r\u00E9mun\u00E9ration pr\u00E9sent\u00E9e ci-dessus respecte int\u00E9gralement les plafonds COBAC (variable max 40% DG, 30% DGA), les recommandations BCEAO sur la gouvernance des SFD, et les standards IFC/BAD sur le pay-for-performance \u00E9quilibr\u00E9.'),
    pb(),
  ];
}



