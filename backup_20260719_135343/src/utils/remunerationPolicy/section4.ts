import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { h1, h2, h3, h4, body, bullet, tbl, sp, pb, infoBox, successBox, alertBox, goldBox, NAVY_MID, STEEL, GOLD, DARK, GRAY, WHITE, LGRAY, GREEN, RED } from '';

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — BENCHMARK DÉTAILLÉ UEMOA vs CEMAC
// ═══════════════════════════════════════════════════════════════
export function section7(): (Paragraph | Table)[] {
  return [
    h1('7. BENCHMARK D\u00C9TAILL\u00C9 UEMOA vs CEMAC'),
    sp(),
    body('Cette section pr\u00E9sente une analyse comparative d\u00E9taill\u00E9e des pratiques de r\u00E9mun\u00E9ration des dirigeants d\u2019IMF dans les zones UEMOA et CEMAC. Le benchmark repose sur une m\u00E9thodologie rigoureuse, combinant donn\u00E9es r\u00E9glementaires, rapports annuels, et entretiens confidentiels.', { bold: true }),
    sp(),

    h2('7.1 M\u00E9thodologie du benchmark'),
    sp(),
    body('L\u2019enqu\u00EAte KHEPRA EXPERTS 2024 a couvert 70 institutions (47 en UEMOA, 23 en CEMAC) selon une m\u00E9thodologie en trois volets :'),
    bullet('Volet 1 \u2014 Donn\u00E9es r\u00E9glementaires : Analyse des rapports de supervision transmis \u00E0 la BCEAO et \u00E0 la COBAC, incluant les d\u00E9clarations de r\u00E9mun\u00E9ration des mandataires sociaux.'),
    bullet('Volet 2 \u2014 Rapports annuels : Analyse des \u00E9tats financiers et des rapports de gestion publi\u00E9s par les IMF de 2\u00E8me cat\u00E9gorie (SFD en UEMOA, EMF en CEMAC).'),
    bullet('Volet 3 \u2014 Entretiens confidentiels : 20 entretiens semi-directifs avec des DG, des pr\u00E9sidents de CA, et des responsables RH d\u2019IMF de taille moyenne et grande.'),
    sp(),
    infoBox('P\u00E9riode de r\u00E9f\u00E9rence : exercices 2022\u20132024. Devise de consolidation : FCFA. Ajustement inflation : indice harmonis\u00E9 des prix \u00E0 la consommation de la BCEAO et de la BEAC. Ajustement taille : m\u00E9thode des percentiles par classe d\u2019actifs.'),
    sp(),

    h2('7.2 Niveau de r\u00E9mun\u00E9ration du DG'),
    sp(),
    tbl(
      ['Zone / Indicateur', 'P25', 'P50 (m\u00E9diane)', 'P75', '\u00C9cart P75/P25'],
      [
        ['UEMOA \u2014 Fixe DG (M FCFA)', '18,0', '24,0', '36,0', '2,0x'],
        ['UEMOA \u2014 Variable DG (% fixe)', '20%', '28%', '38%', '1,9x'],
        ['UEMOA \u2014 Total comp. DG (M FCFA)', '24,0', '34,0', '52,0', '2,2x'],
        ['CEMAC \u2014 Fixe DG (M FCFA)', '20,0', '28,0', '42,0', '2,1x'],
        ['CEMAC \u2014 Variable DG (% fixe)', '22%', '30%', '40%', '1,8x'],
        ['CEMAC \u2014 Total comp. DG (M FCFA)', '27,0', '40,0', '60,0', '2,2x'],
      ],
      [25, 15, 15, 15, 30]
    ),
    sp(),
    body('Analyse : La zone CEMAC pr\u00E9sente des niveaux de r\u00E9mun\u00E9ration syst\u00E9matiquement sup\u00E9rieurs \u00E0 ceux de l\u2019UEMOA (+17% en m\u00E9diane pour le fixe, +18% pour le total compensation). Cette diff\u00E9rence s\u2019explique par trois facteurs structurants :'),
    bullet('Facteur 1 \u2014 Co\u00FBt de la vie : Les capitales CEMAC (Yaound\u00E9, Libreville) affichent un indice de co\u00FBt de la vie sup\u00E9rieur de 25\u201330% aux capitales UEMOA (Lom\u00E9, Ouagadougou), selon les donn\u00E9es de l\u2019AfDB et de Numbeo 2024.'),
    bullet('Facteur 2 \u2014 Raret\u00E9 des comp\u00E9tences : Le pool de dirigeants exp\u00E9riment\u00E9s en microfinance est plus restreint en CEMAC (6 pays, population totale 55 M) qu\u2019en UEMOA (8 pays, population totale 130 M), cr\u00E9ant une tension sur l\u2019offre de talents.'),
    bullet('Facteur 3 \u2014 Rigueur r\u00E9gulatoire COBAC : La supervision plus stricte de la COBAC (contr\u00F4les in situ annuels, exigences de capital plus \u00E9lev\u00E9es) se traduit par une prime de risque et de responsabilit\u00E9 dans la r\u00E9mun\u00E9ration des DG.'),
    sp(),

    h2('7.3 Structure fixe / variable'),
    sp(),
    tbl(
      ['Zone', 'Fixe / Total', 'Variable / Total', 'Avantages / Total', 'Commentaire'],
      [
        ['UEMOA \u2014 m\u00E9diane', '68%', '22%', '10%', 'Structure prudentielle, variable mod\u00E9r\u00E9e'],
        ['UEMOA \u2014 P75', '58%', '32%', '10%', 'Part variable \u00E9lev\u00E9e = profil de croissance agressif'],
        ['CEMAC \u2014 m\u00E9diane', '65%', '25%', '10%', 'Variable l\u00E9g\u00E8rement sup\u00E9rieure \u00E0 UEMOA'],
        ['CEMAC \u2014 P75', '55%', '35%', '10%', 'Profil de performance comparable \u00E0 UEMOA P75'],
        ['Standard IFC/BAD', '60\u201365%', '25\u201330%', '10\u201315%', 'Recommandation internationale'],
      ],
      [20, 18, 18, 18, 26]
    ),
    sp(),
    successBox('Les structures observ\u00E9es en UEMOA et CEMAC sont globalement align\u00E9es sur les recommandations IFC/BAD (fixe 60\u201365%, variable 25\u201330%). Les d\u00E9viations au-dessus du P75 (variable > 35%) correspondent \u00E0 des profils de croissance agressifs, souvent suivis d\u2019un renforcement de la supervision par les r\u00E9gulateurs.'),
    sp(),

    h2('7.4 R\u00E9mun\u00E9ration des administrateurs'),
    sp(),
    tbl(
      ['Zone / Indicateur', 'P25', 'P50', 'P75', 'Commentaire'],
      [
        ['UEMOA \u2014 Jetons/s\u00E9ance (FCFA)', '100 000', '150 000', '220 000', 'Plafond moyen CA : 4,5 M FCFA/an'],
        ['UEMOA \u2014 Indemnit\u00E9 Pr\u00E9sident CA (FCFA)', '1 500 000', '2 200 000', '3 200 000', 'Corr\u00E9l\u00E9 \u00E0 la taille institutionnelle'],
        ['CEMAC \u2014 Jetons/s\u00E9ance (FCFA)', '120 000', '170 000', '250 000', 'Plafond moyen CA : 5,5 M FCFA/an'],
        ['CEMAC \u2014 Indemnit\u00E9 Pr\u00E9sident CA (FCFA)', '1 800 000', '2 600 000', '3 800 000', 'Corr\u00E9l\u00E9 au co\u00FBt de la vie local'],
      ],
      [25, 15, 15, 15, 30]
    ),
    sp(),
    body('Diff\u00E9rence cl\u00E9 : Les jetons de pr\u00E9sence en CEMAC sont syst\u00E9matiquement sup\u00E9rieurs de 12\u201315% \u00E0 ceux de l\u2019UEMOA. Cette diff\u00E9rence refl\u00E8te \u00E0 la fois le co\u00FBt de la vie et la plus grande formalisation des r\u00E9mun\u00E9rations administratives dans les EMF de la CEMAC, o\u00F9 la COBAC exige une d\u00E9claration d\u00E9taill\u00E9e dans le rapport de supervision.'),
    sp(),

    h2('7.5 Rigueur r\u00E9gulatoire et impact sur la r\u00E9mun\u00E9ration'),
    sp(),
    tbl(
      ['Dimension', 'BCEAO / UEMOA', 'COBAC / CEMAC', 'Impact sur r\u00E9mun\u00E9ration'],
      [
        ['Fr\u00E9quence des contr\u00F4les', 'Contr\u00F4le permanent + inspections triennales', 'Contr\u00F4les in situ annuels + inspections bisannuelles', 'Prime de risque +5\u201310% en CEMAC'],
        ['Exigences de capital', 'Capital minimum SFD 2\u00E8me cat\u00E9gorie : 100 M FCFA', 'Capital minimum EMF : 200 M FCFA', 'DG CEMAC g\u00E8re un capital 2x sup\u00E9rieur'],
        ['Reporting r\u00E9glementaire', 'Rapport mensuel simplifi\u00E9 + annuel d\u00E9taill\u00E9', 'Rapport mensuel d\u00E9taill\u00E9 + trimestriel prudentiel', 'Charge de conformit\u00E9 sup\u00E9rieure en CEMAC'],
        ['Gouvernance', 'Instruction 008-05-2015 (principes g\u00E9n\u00E9raux)', 'Directive 01/20 (standards d\u00E9taill\u00E9s, comit\u00E9s obligatoires)', 'Complexit\u00E9 de gouvernance CEMAC > UEMOA'],
        ['Sanctions', 'Mise en demeure, retrait d\u2019agr\u00E9ment', 'Amendes, mise en tutelle, retrait d\u2019agr\u00E9ment', 'Risque r\u00E9glementaire per\u00E7u plus \u00E9lev\u00E9 en CEMAC'],
      ],
      [20, 30, 30, 20]
    ),
    sp(),
    alertBox('La diff\u00E9rence de rigueur r\u00E9gulatoire entre BCEAO et COBAC ne doit pas \u00EAtre interpr\u00E9t\u00E9e comme un d\u00E9faut de l\u2019une des zones. La BCEAO privil\u00E9gie une approche par principes (principle-based), tandis que la COBAC applique une approche par r\u00E8gles d\u00E9taill\u00E9es (rule-based). Les deux approches sont conformes aux standards internationaux de B\u00E2le.'),
    sp(),

    h2('7.6 Comparaison microfinance vs banques commerciales'),
    sp(),
    body('Le positionnement de la r\u00E9mun\u00E9ration des DG d\u2019IMF par rapport aux banques commerciales est un indicateur cl\u00E9 de la comp\u00E9titivit\u00E9 du secteur sur le march\u00E9 des talents bancaires.'),
    sp(),
    tbl(
      ['Cat\u00E9gorie', 'Fixe DG banque', 'Fixe DG IMF', 'Ratio IMF/Banque', 'Commentaire'],
      [
        ['Petite taille', '24 000 000', '14 000 000', '58%', 'DG IMF souvent moins exp\u00E9riment\u00E9'],
        ['Taille moyenne', '42 000 000', '26 000 000', '62%', '\u00C9cart se r\u00E9duit avec la taille'],
        ['Grande taille', '72 000 000', '42 000 000', '58%', 'DG IMF g\u00E8rent des structures complexes'],
        ['R\u00E9seau r\u00E9gional', '120 000 000', '66 000 000', '55%', 'DG r\u00E9seau IMF = profil quasi-bancaire'],
      ],
      [20, 20, 20, 20, 20]
    ),
    sp(),
    body('L\u2019\u00E9cart moyen de 42% entre la r\u00E9mun\u00E9ration des DG d\u2019IMF et celle des DG de banques commerciales refl\u00E8te la diff\u00E9rence de taille, de complexit\u00E9, et de pression concurrentielle. Cependant, les DG d\u2019IMF de grande taille ou de r\u00E9seau r\u00E9gional tendent \u00E0 se rapprocher des profils bancaires, notamment en CEMAC o\u00F9 la fronti\u00E8re entre EMF et banques de d\u00E9tail est de plus en plus floue.'),
    sp(),
    goldBox('Recommandation strat\u00E9gique : Pour les IMF de grande taille et les r\u00E9seaux r\u00E9gionaux, la politique de r\u00E9mun\u00E9ration doit int\u00E9grer un m\u00E9canisme de convergence progressive vers les standards bancaires (benchmark banques P40\u2013P50), afin de r\u00E9duire le turnover des DG et d\u2019attirer des profils de niveau bancaire.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8 — ALIGNEMENT IFC / BAD (OBLIGATOIRE)
// ═══════════════════════════════════════════════════════════════
export function section8(): (Paragraph | Table)[] {
  return [
    h1('8. ALIGNEMENT IFC / BANQUE MONDIALE / BAD'),
    sp(),
    body('Cette section d\u00E9montre l\u2019alignement complet de la pr\u00E9sente politique de r\u00E9mun\u00E9ration avec les standards internationaux de gouvernance et de performance des institutions financi\u00E8res. Cet alignement est un pr\u00E9requis pour l\u2019obtention de financements institutionnels et de garanties de portefeuille.', { bold: true }),
    sp(),

    h2('8.1 IFC Performance Standards \u2014 Governance Framework'),
    sp(),
    body('L\u2019IFC exige que ses partenaires financiers (banques, IMF, fintechs) respectent un ensemble de standards de gouvernance, dont la r\u00E9mun\u00E9ration des dirigeants est un composant essentiel. La pr\u00E9sente politique respecte les 5 exigences IFC suivantes :'),
    sp(),
    h3('8.1.1 Standard 1 \u2014 S\u00E9paration des r\u00E9mun\u00E9rations administratives et ex\u00E9cutives'),
    sp(),
    body('IFC exige que les administrateurs non ex\u00E9cutifs ne per\u00E7oivent aucune forme de r\u00E9mun\u00E9ration variable. La pr\u00E9sente politique respecte cette exigence (Section 4.1.3) et la renforce par un plafond strict des jetons de pr\u00E9sence en proportion du r\u00E9sultat net.'),
    sp(),
    successBox('Conformit\u00E9 IFC Standard 1 : \u2714 Administrateurs = fixe uniquement (jetons + indemnit\u00E9s). Variable interdite. Plafond 2% du r\u00E9sultat net.'),
    sp(),

    h3('8.1.2 Standard 2 \u2014 Pay-for-performance \u00E9quilibr\u00E9'),
    sp(),
    body('IFC recommande que la part variable ne d\u00E9passe pas 35\u201340% de la r\u00E9mun\u00E9ration totale des dirigeants ex\u00E9cutifs, avec un minimum de 60% de fixe. La pr\u00E9sente politique pr\u00E9voit un fixe de 60\u201370% pour le DG et 65\u201380% pour le DGA, respectant ainsi le standard IFC.'),
    sp(),
    successBox('Conformit\u00E9 IFC Standard 2 : \u2714 DG : fixe 60\u201370%, variable max 40% (plafond COBAC). DGA : fixe 65\u201380%, variable max 30% (plafond COBAC).'),
    sp(),

    h3('8.1.3 Standard 3 \u2014 Malus clause et clawback'),
    sp(),
    body('IFC exige l\u2019int\u00E9gration d\u2019une « malus clause » dans les contrats de dirigeants, permettant de r\u00E9duire ou d\u2019annuler le bonus en cas de non-respect des crit\u00E8res ESG ou de d\u00E9faillance de conformit\u00E9. La pr\u00E9sente politique int\u00E8gre :'),
    bullet('Malus clause : R\u00E9duction du bonus diff\u00E9r\u00E9 de 50% \u00E0 100% en cas de d\u00E9gradation du ratio de solvabilit\u00E9, de d\u00E9passement du PAR > 30 jours au-del\u00E0 de 10%, ou de sanction r\u00E9glementaire.'),
    bullet('Clawback : R\u00E9cup\u00E9ration des bonus vers\u00E9s sur les exercices N, N\u22121, N\u22122 en cas de r\u00E9vision n\u00E9gative des \u00E9tats financiers, de fraude, ou de sanction r\u00E9glementaire r\u00E9trospective.'),
    sp(),
    successBox('Conformit\u00E9 IFC Standard 3 : \u2714 Malus clause int\u00E9gr\u00E9e (Section 3.2). Clawback sur 3 ans (Section 3.3). Seuils de d\u00E9clenchement pr\u00E9cis.'),
    sp(),

    h3('8.1.4 Standard 4 \u2014 ESG integration'),
    sp(),
    body('IFC Performance Standard 1 impose l\u2019int\u00E9gration des crit\u00E8res ESG dans l\u2019\u00E9valuation de la performance des dirigeants. La pr\u00E9sente politique alloue une pond\u00E9ration de 20% aux crit\u00E8res ESG dans le score composite KPI (Section 6.1.1), incluant :'),
    bullet('Crit\u00E8re Environnement : Empreinte carbone de l\u2019institution, utilisation des ressources, politique de pr\u00EAt vert.'),
    bullet('Crit\u00E8re Social : Inclusion financi\u00E8re (taux de bancarisation des femmes, jeunes, zones rurales), protection des consommateurs, formation du personnel.'),
    bullet('Crit\u00E8re Gouvernance : Conformit\u00E9 r\u00E9glementaire, qualit\u00E9 du reporting, ind\u00E9pendance du CA, lutte contre la corruption.'),
    sp(),
    successBox('Conformit\u00E9 IFC Standard 4 : \u2714 ESG = 20% du score composite KPI. Seuils de mesure d\u00E9finis. Certification ESG = bonus major\u00E9 (score > 1).'),
    sp(),

    h3('8.1.5 Standard 5 \u2014 Whistleblowing et transparence'),
    sp(),
    body('IFC exige la mise en place d\u2019un dispositif de signalement interne (whistleblowing) permettant aux employ\u00E9s de d\u00E9noncer les dysfonctionnements en mati\u00E8re de r\u00E9mun\u00E9ration. La pr\u00E9sente politique pr\u00E9voit :'),
    bullet('Canal de signalement d\u00E9di\u00E9 : Email s\u00E9curis\u00E9, ligne t\u00E9l\u00E9phonique anonyme, et bo\u00EEte aux lettres physique contr\u00F4l\u00E9e par le Comit\u00E9 d\u2019Audit.'),
    bullet('Protection du lanceur d\u2019alerte : Garantie de non-r\u00E9torsion, confidentialit\u00E9 de l\u2019identit\u00E9, et possibilit\u00E9 de signalement externe au Commissaire aux Comptes ou au r\u00E9gulateur.'),
    bullet('Traitement des alertes : D\u00E9lai de traitement de 30 jours ouvr\u00E9s, avec compte-rendu au Comit\u00E9 d\u2019Audit et, le cas \u00E9ch\u00E9ant, au comit\u00E9 de r\u00E9mun\u00E9ration.'),
    sp(),
    successBox('Conformit\u00E9 IFC Standard 5 : \u2714 Dispositif whistleblowing d\u00E9di\u00E9. Protection du lanceur d\u2019alerte. D\u00E9lai de traitement 30 jours.'),
    sp(),

    h2('8.2 BAD Guidelines on Corporate Governance'),
    sp(),
    body('La Banque Africaine de D\u00E9veloppement (BAD) a publi\u00E9 des lignes directrices en mati\u00E8re de gouvernance d\u2019entreprise pour les projets qu\u2019elle finance. Ces lignes directrices sont particuli\u00E8rement pertinentes pour les IMF b\u00E9n\u00E9ficiant de lignes de cr\u00E9dit ou de garanties de portefeuille BAD.'),
    sp(),
    h3('8.2.1 Plafonnement de la r\u00E9mun\u00E9ration totale'),
    sp(),
    body('La BAD recommande un plafond de 8% du r\u00E9sultat net pour l\u2019ensemble des r\u00E9mun\u00E9rations des mandataires sociaux, avec un sous-plafond de 5% pour la part variable. La pr\u00E9sente politique respecte strictement ces plafonds (Section 3.1) :'),
    bullet('Plafond global mandataires sociaux : 8% du r\u00E9sultat net (Administrateurs 3% + DG 5%).'),
    bullet('Plafond variable DG : 40% du fixe (soit \u2248 28% du total compensation max), bien en dessous du sous-plafond BAD de 5% du r\u00E9sultat net.'),
    sp(),
    h3('8.2.2 Remuneration Report annuel'),
    sp(),
    body('La BAD exige la publication annuelle d\u2019un « Remuneration Report » d\u00E9taillant la politique, les montants vers\u00E9s, et l\u2019alignement avec les objectifs strat\u00E9giques et de d\u00E9veloppement durable. La pr\u00E9sente politique pr\u00E9voit la production d\u2019un tel rapport, incluant :'),
    bullet('D\u00E9tail des r\u00E9mun\u00E9rations par mandataire (fixe, variable, avantages, diff\u00E9ral, clawback).'),
    bullet('Analyse de l\u2019\u00E9quit\u00E9 interne (ratio DG/salaire m\u00E9dian) et externe (positionnement vs benchmark).'),
    bullet('Synth\u00E8se des KPIs et du score composite pour chaque dirigeant ex\u00E9cutif.'),
    bullet('D\u00E9claration de conformit\u00E9 aux standards BCEAO, COBAC, OHADA, IFC, et BAD.'),
    sp(),
    h3('8.2.3 ESG dans la d\u00E9termination du bonus'),
    sp(),
    body('La BAD recommande une pond\u00E9ration minimale de 20% des crit\u00E8res ESG dans le score composite de d\u00E9termination du bonus. La pr\u00E9sente politique int\u00E8gre cette recommandation (Section 6.1.1) avec trois crit\u00E8res mesurables :'),
    bullet('Environnement : Taux de pr\u00EAts verts / pr\u00EAts totaux ; consommation \u00E9nerg\u00E9tique par employ\u00E9 ; empreinte carbone.'),
    bullet('Social : Taux de bancarisation des femmes ; taux de bancarisation des jeunes (< 35 ans) ; taux de couverture des zones rurales ; indice de satisfaction client.'),
    bullet('Gouvernance : Nombre d\u2019observations r\u00E9glementaires ; qualit\u00E9 du reporting ; indice de gouvernance interne (audit interne, conformit\u00E9, \u00E9thique).'),
    sp(),

    h2('8.3 Matrice de conformit\u00E9 IFC / BAD'),
    sp(),
    tbl(
      ['Standard IFC/BAD', 'Exigence', 'Statut dans la politique', 'R\u00E9f\u00E9rence section'],
      [
        ['IFC Gov. Std 1', 'S\u00E9paration admin / ex\u00E9cutif', 'Conforme', '4.1.3'],
        ['IFC Gov. Std 2', 'Fixe 60\u201365%, variable max 40%', 'Conforme', '4.2, 4.3'],
        ['IFC Gov. Std 3', 'Malus + clawback', 'Conforme', '3.2, 3.3'],
        ['IFC Gov. Std 4', 'ESG 20% dans KPI', 'Conforme', '6.1.1'],
        ['IFC Gov. Std 5', 'Whistleblowing d\u00E9di\u00E9', 'Conforme', '8.1.5'],
        ['BAD Plafond', '8% r\u00E9sultat net total', 'Conforme', '3.1, 5.2, 5.3'],
        ['BAD Rem. Report', 'Publication annuelle d\u00E9taill\u00E9e', 'Conforme', '8.2.2'],
        ['BAD ESG Bonus', 'ESG 20% dans score composite', 'Conforme', '8.2.3'],
      ],
      [20, 35, 25, 20]
    ),
    sp(),
    goldBox('La pr\u00E9sente politique de r\u00E9mun\u00E9ration satisfait int\u00E9gralement les 8 standards IFC/BAD retenus. Elle constitue un gage de cr\u00E9dibilit\u00E9 pour l\u2019obtention de financements institutionnels, de garanties de portefeuille, et de validations de gouvernance par les bailleurs internationaux.'),
    pb(),
  ];
}



