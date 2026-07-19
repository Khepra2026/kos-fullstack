import { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { h1, h2, h3, h4, body, bullet, tbl, sp, pb, infoBox, successBox, alertBox, dangerBox, goldBox, NAVY_MID, STEEL, GOLD, DARK, GRAY, WHITE, LGRAY, GREEN, RED } from '';

// ═══════════════════════════════════════════════════════════════
// SECTION 9 — GOUVERNANCE DE LA RÉMUNÉRATION
// ═══════════════════════════════════════════════════════════════
export function section9(): (Paragraph | Table)[] {
  return [
    h1('9. GOUVERNANCE DE LA R\u00C9MUN\u00C9RATION'),
    sp(),
    body('La gouvernance de la r\u00E9mun\u00E9ration est structur\u00E9e selon un mod\u00E8le en trois niveaux, conforme aux standards COBAC (Directive 01/20), BCEAO (Instruction 008-05-2015), et IFC/BAD. Chaque niveau dispose de comp\u00E9tences pr\u00E9cises, de r\u00E8gles de quorum, et de proc\u00E9dures de d\u00E9cision document\u00E9es.', { bold: true }),
    sp(),

    h2('9.1 R\u00F4le du Conseil d\u2019Administration'),
    sp(),
    body('Le Conseil d\u2019Administration (CA) est l\u2019organe souverain en mati\u00E8re de r\u00E9mun\u00E9ration des mandataires sociaux. Ses comp\u00E9tences sont d\u00E9finies par les statuts et par la pr\u00E9sente politique :'),
    bullet('Comp\u00E9tence 1 \u2014 Approbation de la politique : Le CA approuve la politique de r\u00E9mun\u00E9ration, ses modifications substantielles, et son alignement avec la strat\u00E9gie de l\u2019institution. Le vote requiert une majorit\u00E9 qualifi\u00E9e des deux tiers des membres pr\u00E9sents.'),
    bullet('Comp\u00E9tence 2 \u2014 D\u00E9termination des r\u00E9mun\u00E9rations annuelles : Sur proposition du comit\u00E9 de r\u00E9mun\u00E9ration, le CA d\u00E9termine les montants des fixe, variable, et avantages en nature du DG et du DGA pour l\u2019exercice \u00E0 venir.'),
    bullet('Comp\u00E9tence 3 \u2014 Validation des jetons de pr\u00E9sence : Le CA fixe le montant unitaire des jetons de pr\u00E9sence et des indemnit\u00E9s de fonction des administrateurs, dans la limite des plafonds d\u00E9finis par la pr\u00E9sente politique.'),
    bullet('Comp\u00E9tence 4 \u2014 D\u00E9cision sur les d\u00E9rogations : Toute d\u00E9rogation aux plafonds ou aux principes de la politique doit \u00EAtre motiv\u00E9e, soumise au comit\u00E9 de r\u00E9mun\u00E9ration, et approuv\u00E9e par le CA \u00E0 l\u2019unanim\u00E9t\u00E9 des membres pr\u00E9sents.'),
    sp(),
    infoBox('Article 52 de l\u2019Instruction BCEAO n\u00B0008-05-2015 : \u00AB Le Conseil d\u2019Administration met en place un comit\u00E9 de r\u00E9mun\u00E9ration \u2014 ou \u00E0 d\u00E9faut d\u00E9l\u00E8gue cette fonction \u00E0 un sous-comit\u00E9 ind\u00E9pendant \u2014 charg\u00E9 d\u2019\u00E9valuer la pertinence et l\u2019\u00E9quilibre des r\u00E9mun\u00E9rations. \u00BB'),
    sp(),

    h2('9.2 Comit\u00E9 de r\u00E9mun\u00E9ration ind\u00E9pendant'),
    sp(),
    body('Le comit\u00E9 de r\u00E9mun\u00E9ration est l\u2019organe technique charg\u00E9 de pr\u00E9parer les d\u00E9cisions du CA et de superviser la mise en \u0153uvre de la politique. Il est obligatoire en CEMAC (Directive COBAC 01/20) et recommand\u00E9 en UEMOA (Circulaire BCEAO 009-05-2016).'),
    sp(),
    h3('9.2.1 Composition'),
    sp(),
    tbl(
      ['Membre', 'Nombre', 'Profil requis', 'Ind\u00E9pendance'],
      [
        ['Pr\u00E9sident', '1', 'Administrateur ind\u00E9pendant, non ex\u00E9cutif, exp\u00E9rience en gouvernance d\u2019entreprise', 'Obligatoire'],
        ['Membre administrateur', '1', 'Administrateur ind\u00E9pendant, comp\u00E9tences comptables/financi\u00E8res', 'Obligatoire'],
        ['Expert externe', '1', 'Consultant RH ou cabinet de conseil, sp\u00E9cialiste r\u00E9mun\u00E9ration bancaire', 'Obligatoire'],
        ['Secr\u00E9taire', '1', 'Responsable RH ou DAF de l\u2019institution', 'Non ind\u00E9pendant (secr\u00E9tariat)'],
      ],
      [20, 15, 45, 20]
    ),
    sp(),
    alertBox('Aucun dirigeant ex\u00E9cutif (DG, DGA, Directeur Financier) ne peut si\u00E9ger au comit\u00E9 de r\u00E9mun\u00E9ration, m\u00EAme \u00E0 titre consultatif. Cette r\u00E8gle est imp\u00E9rative pour pr\u00E9server l\u2019ind\u00E9pendance du comit\u00E9 (COBAC Directive 01/20, Article 14).'),
    sp(),

    h3('9.2.2 Comp\u00E9tences et attributions'),
    sp(),
    body('Le comit\u00E9 de r\u00E9mun\u00E9ration dispose des attributions suivantes :'),
    bullet('Pr\u00E9paration des propositions : \u00C9laboration des propositions de r\u00E9mun\u00E9ration pour le CA, incluant le fixe, le taux cible variable, les seuils de KPI, et les avantages en nature.'),
    bullet('Benchmark annuel : Mandat d\u00E9di\u00E9 \u00E0 un cabinet externe pour r\u00E9aliser le benchmark sectoriel UEMOA/CEMAC et positionner la r\u00E9mun\u00E9ration de l\u2019institution.'),
    bullet('\u00C9valuation des KPIs : \u00C0 la cl\u00F4ture de l\u2019exercice, calcul du score composite KPI pour le DG et le DGA, d\u00E9termination du bonus effectif, et proposition de diff\u00E9ral / clawback.'),
    bullet('Veille r\u00E9glementaire : Suivi des \u00E9volutions r\u00E9glementaires BCEAO, COBAC, OHADA, et standards internationaux (IFC, BAD) en mati\u00E8re de r\u00E9mun\u00E9ration.'),
    bullet('Rapport annuel : R\u00E9daction du Remuneration Report pour le CA et les actionnaires, incluant la conformit\u00E9 aux standards.'),
    sp(),

    h3('9.2.3 Fr\u00E9quence et proc\u00E9dure de r\u00E9union'),
    sp(),
    tbl(
      ['Type de r\u00E9union', 'Fr\u00E9quence', 'Ordre du jour', 'D\u00E9cision'],
      [
        ['R\u00E9union ordinaire N\u00B01', 'Janvier', 'Validation des r\u00E9mun\u00E9rations de l\u2019exercice N (fixe, variable, avantages)', 'Proposition au CA'],
        ['R\u00E9union ordinaire N\u00B02', 'Juin', 'Bilan de mi-parcours des KPIs, ajustements si n\u00E9cessaire', 'Information au CA'],
        ['R\u00E9union ordinaire N\u00B03', 'Octobre', 'Pr\u00E9paration du budget r\u00E9mun\u00E9ration N+1, benchmark', 'Proposition au CA'],
        ['R\u00E9union extraordinaire', 'Au besoin', 'D\u00E9rogation, clawback, recrutement nouveau DG/DGA', 'Proposition au CA'],
      ],
      [25, 18, 35, 22]
    ),
    sp(),
    infoBox('Quorum des r\u00E9unions : 3 membres sur 3 doivent \u00EAtre pr\u00E9sents pour toute d\u00E9cision relative aux r\u00E9mun\u00E9rations des dirigeants. Les d\u00E9cisions sont prises \u00E0 la majorit\u00E9 simple. En cas d\u2019\u00E9galit\u00E9, le pr\u00E9sident a voix pr\u00E9pond\u00E9rante. Le secr\u00E9taire ne vote pas.'),
    sp(),

    h2('9.3 Validation annuelle'),
    sp(),
    body('La validation annuelle de la politique de r\u00E9mun\u00E9ration suit un processus structur\u00E9 en cinq \u00E9tapes :'),
    sp(),
    h3('\u00c9tape 1 \u2014 Pr\u00E9paration (Octobre\u2013Novembre)'),
    body('Le comit\u00E9 de r\u00E9mun\u00E9ration \u00E9labore les propositions pour l\u2019exercice N+1 : fixe, taux cible variable, seuils KPI, avantages, et ajustements de la politique. Le benchmark externe est r\u00E9alis\u00E9.'),
    sp(),
    h3('\u00c9tape 2 \u2014 Revue par le Comit\u00E9 d\u2019Audit (Novembre)'),
    body('Le Comit\u00E9 d\u2019Audit v\u00E9rifie la coh\u00E9rence des propositions avec les \u00E9tats financiers pr\u00E9visionnels, le respect des plafonds prudentiels, et l\u2019absence de conflits d\u2019int\u00E9r\u00EAts. Il \u00E9met un avis \u00E9crit.'),
    sp(),
    h3('\u00c9tape 3 \u2014 D\u00E9cision du CA (D\u00E9cembre)'),
    body('Le CA examine les propositions du comit\u00E9 de r\u00E9mun\u00E9ration et l\u2019avis du Comit\u00E9 d\u2019Audit. Il vote les r\u00E9mun\u00E9rations de l\u2019exercice N+1. Le quorum est de 50% des membres ; la majorit\u00E9 qualifi\u00E9e de deux tiers est requise pour toute d\u00E9rogation.'),
    sp(),
    h3('\u00c9tape 4 \u2014 Approbation de l\u2019Assembl\u00E9e G\u00E9n\u00E9rale (Mars N+1)'),
    body('La politique de r\u00E9mun\u00E9ration et les r\u00E9mun\u00E9rations des mandataires sociaux sont soumises \u00E0 un vote sp\u00E9cifique de l\u2019AG, distinct du vote sur les \u00E9tats financiers. Le quorum est de 50% des actionnaires pr\u00E9sents ou repr\u00E9sent\u00E9s.'),
    sp(),
    h3('\u00c9tape 5 \u2014 Transmission au r\u00E9gulateur (Avril N+1)'),
    body('La politique approuv\u00E9e et le Remuneration Report sont transmis au superviseur (BCEAO ou COBAC) dans le cadre du rapport de supervision annuel, conform\u00E9ment aux d\u00E9lais r\u00E9glementaires.'),
    sp(),
    successBox('Le cycle annuel de validation garantit une redevabilit\u00E9 \u00e0 quatre niveaux : comit\u00E9 de r\u00E9mun\u00E9ration (technique), Comit\u00E9 d\u2019Audit (contr\u00F4le), CA (d\u00E9cision), AG (approbation souveraine). Cette structure quadruple est conforme aux standards les plus exigeants (COBAC Directive 01/20, IFC Governance Framework).'),
    sp(),

    h2('9.4 Audit interne / externe'),
    sp(),
    body('La politique de r\u00E9mun\u00E9ration fait l\u2019objet d\u2019audits r\u00E9guliers pour garantir sa conformit\u00E9 et son efficacit\u00E9 :'),
    sp(),
    tbl(
      ['Type d\u2019audit', 'Fr\u00E9quence', 'Port\u00E9e', 'Responsable'],
      [
        ['Audit interne r\u00E9mun\u00E9ration', 'Annuel', 'Conformit\u00E9 aux plafonds, exactitude des calculs de bonus, respect des proc\u00E9dures', 'Direction de l\u2019Audit Interne'],
        ['Audit externe r\u00E9mun\u00E9ration', 'Triennal', 'Conformit\u00E9 r\u00E9glementaire, coh\u00E9rence du benchmark, absence de fraude', 'Commissaire aux Comptes agr\u00E9\u00E9'],
        ['Audit sp\u00E9cialis\u00E9 (bailleur)', 'Au besoin', 'Conformit\u00E9 IFC/BAD, ESG, clauses de financement', 'Cabinet externe mandat\u00E9 par le bailleur'],
      ],
      [25, 15, 40, 20]
    ),
    sp(),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION 10 — DISPOSITIFS DE CONTRÔLE ET CONFORMITÉ
// ═══════════════════════════════════════════════════════════════
export function section10(): (Paragraph | Table)[] {
  return [
    h1('10. DISPOSITIFS DE CONTR\u00D4LE ET CONFORMIT\u00C9'),
    sp(),
    body('Cette section d\u00E9taille les m\u00E9canismes de contr\u00F4le, de sanction, et de reporting qui garantissent le respect de la politique de r\u00E9mun\u00E9ration. Ces dispositifs sont calibr\u00E9s pour \u00Eatre dissuasifs, \u00E9quitables, et conformes aux attentes des r\u00E9gulateurs et des bailleurs.', { bold: true }),
    sp(),

    h2('10.1 Clawback (r\u00E9cup\u00E9ration des bonus)'),
    sp(),
    body('Le dispositif de clawback permet de r\u00E9cup\u00E9rer une partie ou la totalit\u00E9 des bonus vers\u00E9s aux dirigeants en cas de r\u00E9vision n\u00E9gative des r\u00E9sultats ou de d\u00E9faillance de conformit\u00E9. Il est op\u00E9rationnalis\u00E9 comme suit :'),
    sp(),
    tbl(
      ['Condition de d\u00E9clenchement', 'P\u00E9riode de clawback', 'Taux de r\u00E9cup\u00E9ration', 'Proc\u00E9dure'],
      [
        ['R\u00E9vision n\u00E9gative des \u00E9tats financiers (erreur comptable)', 'N, N\u22121, N\u22122', '100% du bonus vers\u00E9 sur l\u2019exercice r\u00E9vis\u00E9', 'D\u00E9cision CA sur proposition du comit\u00E9 de r\u00E9mun\u00E9ration + avis CAC'],
        ['Fraude ou d\u00E9tournement av\u00E9r\u00E9 du dirigeant', 'N, N\u22121, N\u22122, N\u22123', '100% du bonus + int\u00E9r\u00EAts l\u00E9gaux', 'Proc\u00E9dure disciplinaire + saisine juridictionnelle'],
        ['Sanction r\u00E9glementaire majeure (retrait d\u2019agr\u00E9ment, mise en tutelle)', 'N, N\u22121', '100% du bonus vers\u00E9', 'D\u00E9cision CA + notification au r\u00E9gulateur'],
        ['D\u00E9gradation du ratio de solvabilit\u00E9 sous le seuil r\u00E9glementaire', 'N\u22121', '50% du bonus vers\u00E9', 'D\u00E9cision comit\u00E9 de r\u00E9mun\u00E9ration, ratifi\u00E9e par le CA'],
        ['D\u00E9passement du PAR > 30 jours au-del\u00E0 de 10%', 'N\u22121', '50% du bonus vers\u00E9', 'D\u00E9cision comit\u00E9 de r\u00E9mun\u00E9ration, ratifi\u00E9e par le CA'],
        ['Non-respect des crit\u00E8res ESG (certification requise non obtenue)', 'N\u22121', '30% du bonus vers\u00E9', 'D\u00E9cision comit\u00E9 de r\u00E9mun\u00E9ration'],
      ],
      [28, 18, 18, 36]
    ),
    sp(),
    alertBox('Le clawback est opposable au dirigeant d\u00E8s lors que la condition de d\u00E9clenchement est av\u00E9r\u00E9e. La r\u00E9cup\u00E9ration s\u2019effectue par compensation sur les r\u00E9mun\u00E9rations futures (fixe et variable) ou, en cas d\u2019insuffisance, par voie de recouvrement contentieux. La clause de clawback est int\u00E9gr\u00E9e dans le contrat de travail du DG et du DGA.'),
    sp(),

    h2('10.2 Plafonnement des r\u00E9mun\u00E9rations'),
    sp(),
    body('Le plafonnement constitue un m\u00E9canisme de pr\u00E9vention des exc\u00E8s. Il s\u2019applique \u00E0 trois niveaux :'),
    sp(),
    h3('10.2.1 Plafond global'),
    sp(),
    body('La somme des r\u00E9mun\u00E9rations totales de l\u2019ensemble des mandataires sociaux (Administrateurs + DG + DGA) ne peut d\u00E9passer 8% du r\u00E9sultat net de l\u2019exercice. Ce plafond est un hard cap. En cas de d\u00E9passement, les bonus sont r\u00E9duits proportionnellement pour respecter le plafond.'),
    sp(),
    h3('10.2.2 Plafond individuel'),
    sp(),
    body('Le DG : total compensation max = 5% du r\u00E9sultat net. Le DGA : total compensation max = 3% du r\u00E9sultat net. Ces plafonds sont contr\u00F4l\u00E9s par le DAF lors de la cl\u00F4ture annuelle et valid\u00E9s par le comit\u00E9 de r\u00E9mun\u00E9ration.'),
    sp(),
    h3('10.2.3 Plafond de la part variable'),
    sp(),
    body('DG : bonus max = 150% du fixe (taux cible 40% \u00D7 score max 1,5 = 60% du fixe ; mais plafond absolu de 150% du fixe). DGA : bonus max = 100% du fixe. Ces plafonds sont inscrits dans les contrats de travail et dans la politique de r\u00E9mun\u00E9ration.'),
    sp(),
    tbl(
      ['Niveau de plafond', 'DG', 'DGA', 'M\u00E9canisme de contr\u00F4le'],
      [
        ['Global (8% r\u00E9sultat net)', 'Inclus dans le total', 'Inclus dans le total', 'DAF + comit\u00E9 r\u00E9mun\u00E9ration + CA'],
        ['Individuel (5% / 3%)', '5%', '3%', 'DAF + comit\u00E9 r\u00E9mun\u00E9ration'],
        ['Variable (150% / 100% du fixe)', '150%', '100%', 'Comit\u00E9 r\u00E9mun\u00E9ration + CA'],
      ],
      [30, 22, 22, 26]
    ),
    sp(),

    h2('10.3 Conditions suspensives'),
    sp(),
    body('Les conditions suspensives sont des pr\u00E9alables au versement du bonus ou du diff\u00E9ral. Elles garantissent que la r\u00E9mun\u00E9ration variable n\u2019est vers\u00E9e que si des conditions de fond sont remplies :'),
    sp(),
    tbl(
      ['Condition suspensive', 'Applicable au', 'D\u00E9lai de v\u00E9rification', 'Cons\u00E9quence si non remplie'],
      [
        ['Ratio de solvabilit\u00E9 \u2265 seuil r\u00E9glementaire (8% BCEAO, 10% COBAC)', 'DG + DGA', 'Cl\u00F4ture annuelle', 'Bonus annul\u00E9'],
        ['PAR > 30 jours \u2264 10%', 'DG + DGA', 'Cl\u00F4ture annuelle', 'Bonus r\u00E9duit de 50%'],
        ['Aucune sanction r\u00E9glementaire en cours', 'DG + DGA', 'Continu', 'Bonus gel\u00E9 jusqu\u2019\u00E0 lev\u00E9e de la sanction'],
        ['Certification ESG obtenue (si requise par le bailleur)', 'DG', 'Cl\u00F4ture annuelle', 'Diff\u00E9ral bloqu\u00E9, malus 30%'],
        ['Approbation des \u00E9tats financiers par le CAC sans r\u00E9serve', 'DG + DGA', 'Cl\u00F4ture annuelle', 'Diff\u00E9ral report\u00E9 d\u2019un exercice'],
        ['Validation du comit\u00E9 de r\u00E9mun\u00E9ration', 'DG + DGA', 'Post-cl\u00F4ture', 'Bonus non vers\u00E9 si refus\u00E9'],
      ],
      [30, 15, 25, 30]
    ),
    sp(),

    h2('10.4 Audit r\u00E9glementaire'),
    sp(),
    body('La politique de r\u00E9mun\u00E9ration est soumise aux audits r\u00E9glementaires des superviseurs. Les attentes des r\u00E9gulateurs en la mati\u00E8re sont les suivantes :'),
    sp(),
    h3('10.4.1 BCEAO / UEMOA'),
    sp(),
    body('L\u2019audit de la BCEAO porte sur :'),
    bullet('La conformit\u00E9 de la politique de r\u00E9mun\u00E9ration aux dispositions de l\u2019Instruction 008-05-2015 et de la Circulaire 009-05-2016.'),
    bullet('L\u2019exactitude des d\u00E9clarations de r\u00E9mun\u00E9ration dans le rapport de supervision annuel.'),
    bullet('L\u2019absence d\u2019incitation au risque excessif dans la structure de variable.'),
    bullet('La pr\u00E9sence et le fonctionnement effectif du comit\u00E9 de r\u00E9mun\u00E9ration (ou de son \u00E9quivalent).'),
    sp(),
    h3('10.4.2 COBAC / CEMAC'),
    sp(),
    body('L\u2019audit de la COBAC porte sur :'),
    bullet('La conformit\u00E9 de la politique aux dispositions du R\u00E8glement 04/18 et de la Directive 01/20.'),
    bullet('Le respect des plafonds de variable (40% DG, 30% DGA) et la justification des d\u00E9rogations.'),
    bullet('La qualit\u00E9 du Remuneration Report et sa publication dans les d\u00E9lais.'),
    bullet('L\u2019ind\u00E9pendance du comit\u00E9 de r\u00E9mun\u00E9ration et la composition de ses membres.'),
    bullet('Le traitement des observations du comit\u00E9 de r\u00E9mun\u00E9ration par le CA.'),
    sp(),
    infoBox('Fr\u00E9quence des audits r\u00E9glementaires : BCEAO = contr\u00F4le permanent (surveillance \u00e0 distance) + inspection in situ triennale. COBAC = contr\u00F4les in situ annuels + inspection bisannuelle. Les r\u00E9sultats des audits sont communiqu\u00E9s au CA et int\u00E9gr\u00E9s dans le plan d\u2019action de conformit\u00E9.'),
    sp(),

    h2('10.5 Reporting BCEAO / COBAC'),
    sp(),
    body('La d\u00E9claration des r\u00E9mun\u00E9rations des mandataires sociaux aux superviseurs est un imp\u00E9ratif r\u00E9glementaire. Les modalit\u00E9s de reporting sont les suivantes :'),
    sp(),
    tbl(
      ['Document', 'Contenu', 'D\u00E9lai', 'Destinataire'],
      [
        ['Rapport de supervision annuel (RS)', 'D\u00E9claration des r\u00E9mun\u00E9rations par cat\u00E9gorie (fixe, variable, avantages)', '4 mois post-cl\u00F4ture', 'BCEAO / COBAC'],
        ['Remuneration Report', 'Politique, montants, KPIs, \u00E9quit\u00E9, conformit\u00E9 IFC/BAD', '4 mois post-cl\u00F4ture', 'CA + AG + BCEAO/COBAC (sur demande)'],
        ['Rapport mensuel prudentiel', 'Mention des provisions pour bonus diff\u00E9r\u00E9s (SYSCOHADA compte 15)', 'Mensuel, 15 du mois suivant', 'BCEAO / COBAC'],
        ['Rapport d\u2019audit interne', 'Conformit\u00E9 de la politique, exactitude des calculs', 'Annuel, post-cl\u00F4ture', 'CA + Comit\u00E9 d\u2019Audit'],
      ],
      [25, 35, 20, 20]
    ),
    sp(),

    h2('10.6 Sanctions en cas de non-conformit\u00E9'),
    sp(),
    body('La non-conformit\u00E9 de la politique de r\u00E9mun\u00E9ration aux exigences r\u00E9glementaires ou aux principes de la pr\u00E9sente politique expose l\u2019institution et ses dirigeants aux sanctions suivantes :'),
    sp(),
    tbl(
      ['Type de non-conformit\u00E9', 'Sanction institutionnelle', 'Sanction individuelle'],
      [
        ['D\u00E9passement du plafond global (8%) sans d\u00E9rogation', 'Mise en demeure du r\u00E9gulateur, retrait d\u2019agr\u00E9ment possible', 'Clawback des bonus exc\u00E9dentaires, amende disciplinaire'],
        ['D\u00E9passement du plafond variable (40% DG, 30% DGA)', 'Observation r\u00E9glementaire, renforcement de la supervision', 'R\u00E9duction du bonus, avertissement \u00E9crit'],
        ['Absence de comit\u00E9 de r\u00E9mun\u00E9ration ind\u00E9pendant', 'Observation majeure COBAC, note de gouvernance d\u00E9grad\u00E9e', 'Responsabilit\u00E9 du Pr\u00E9sident du CA'],
        ['Fraude ou manipulation des KPIs', 'Sanction r\u00E9glementaire majeure, retrait d\u2019agr\u00E9ment', 'Renvoi, clawback 100%, poursuites judiciaires'],
        ['Non-d\u00E9claration au r\u00E9gulateur', 'Amende r\u00E9glementaire, mise en demeure', 'Responsabilit\u00E9 du DAF et du Secr\u00E9taire du CA'],
      ],
      [25, 35, 40]
    ),
    sp(),
    dangerBox('La fraude dans la d\u00E9termination de la r\u00E9mun\u00E9ration (manipulation des KPIs, dissimulation d\u2019avantages en nature, falsification du benchmark) est consid\u00E9r\u00E9e comme une faute grave justifiant le renvoi imm\u00E9diat, le clawback int\u00E9gral, et la saisine des autorit\u00E9s judiciaires et r\u00E9glementaires.'),
    sp(),

    h2('10.7 Mise en \u0153uvre et r\u00E9vision de la politique'),
    sp(),
    body('La pr\u00E9sente politique de r\u00E9mun\u00E9ration entre en vigueur \u00e0 compter de son approbation par le Conseil d\u2019Administration et l\u2019Assembl\u00E9e G\u00E9n\u00E9rale. Elle est r\u00E9visable annuellement ou en cas de changement majeur du cadre r\u00E9glementaire ou de la strat\u00E9gie de l\u2019institution.'),
    sp(),
    h3('Proc\u00E9dure de r\u00E9vision'),
    body('Toute proposition de r\u00E9vision de la politique est pr\u00E9par\u00E9e par le comit\u00E9 de r\u00E9mun\u00E9ration, examin\u00E9e par le Comit\u00E9 d\u2019Audit, soumise au CA, et approuv\u00E9e par l\u2019AG. Les r\u00E9visions doivent pr\u00E9server les principes fondamentaux (prudence, alignement long terme, transparence) et respecter les plafonds r\u00E9glementaires.'),
    sp(),
    h3('Dur\u00E9e de validit\u00E9'),
    body('La politique est valable pour une p\u00E9riode de trois exercices, sous r\u00E9serve de sa conformit\u00E9 aux textes r\u00E9glementaires en vigueur. En cas de changement majeur de la r\u00E9glementation BCEAO, COBAC, ou OHADA, une r\u00E9vision extraordinaire est convoqu\u00E9e dans les 60 jours suivant la publication du nouveau texte.'),
    sp(),

    h2('10.8 Certification de conformit\u00E9'),
    sp(),
    body('La pr\u00E9sente politique de r\u00E9mun\u00E9ration a \u00E9t\u00E9 \u00E9labor\u00E9e en conformit\u00E9 avec les textes suivants, dont l\u2019exactitude a \u00E9t\u00E9 v\u00E9rifi\u00E9e par le cabinet KHEPRA EXPERTS :'),
    bullet('BCEAO : Instruction n\u00B0008-05-2015 relative aux SFD ; Circulaire n\u00B0009-05-2016 sur la gouvernance des SFD.'),
    bullet('COBAC : R\u00E8glement n\u00B004/18-CEMAC-COBAC relatif aux EMF ; Directive n\u00B001/20/CEMAC-COBAC sur la gouvernance des EMF.'),
    bullet('OHADA : Acte Uniforme relatif au Droit des Soci\u00E9t\u00E9s Commerciales et du GIE (AUSCGIE, r\u00E9vision 2014) ; Acte Uniforme relatif au Droit Comptable et \u00e0 la SYSCOHADA (AUSCIF, r\u00E9vision 2017).'),
    bullet('OIT : Convention n\u00B095 sur la protection des salaires (1949) ; Conventions collectives sectorielles bancaires des pays membres.'),
    bullet('IFC : Governance Framework for Financial Institutions (2019) ; Performance Standard 1.'),
    bullet('BAD : Guidelines on Corporate Governance for Projects Financed by the African Development Bank (2021).'),
    sp(),
    successBox('KHEPRA EXPERTS certifie que la pr\u00E9sente politique de r\u00E9mun\u00E9ration respecte int\u00E9gralement les exigences des superviseurs africains (BCEAO, COBAC), des textes soci\u00E9taires (OHADA), des normes sociales (OIT), et des standards internationaux (IFC, BAD). Elle est pr\u00EAte pour validation par le Conseil d\u2019Administration, les autorit\u00E9s de supervision, et les bailleurs de fonds institutionnels.'),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Pour acceptation de la pr\u00E9sente Politique de R\u00E9mun\u00E9ration V1.0', bold: true, size: 22, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 400 },
    }),
    tbl(
      ['Pour le Conseil d\u2019Administration', 'Pour le Comit\u00E9 de R\u00E9mun\u00E9ration', 'Pour KHEPRA EXPERTS'],
      [
        ['\n\n\nNom et qualit\u00E9 : ___________________________', '\n\n\nNom et qualit\u00E9 : ___________________________', '\n\n\nNom et qualit\u00E9 : ___________________________'],
        ['Date : ___________________________', 'Date : ___________________________', 'Date : ___________________________'],
        ['Signature et cachet :', 'Signature et cachet :', 'Signature et cachet :'],
        ['\n\n\n', '\n\n\n', '\n\n\n'],
      ]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS \u2014 Cabinet International de Conseil', size: 16, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'khepraexperts.com | contact@khepraexperts.com | Lom\u00E9 \u2014 Togo', size: 16, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'R\u00E9f. KE-REM-IMF-2026-001-V1.0 | Mai 2026 | CONFIDENTIEL \u2014 STRICTEMENT PRIV\u00C9', size: 14, color: GRAY, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}



