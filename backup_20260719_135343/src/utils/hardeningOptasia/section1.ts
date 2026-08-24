import {
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx';
import {
  h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, subBullet, numberedItem,
  KHEPRA_RED,
  KHEPRA_DARK,
  KHEPRA_TEAL,
} from '';

export const section1Paragraphs: Paragraph[] = [
  h1('SECTION 1 — CRITICAL ALERT : LA CONFORMITÉ DE L\'ACTIONNARIAT GLOBAL (UBO & MORALITÉ)'),
  divider(),

  alertBox(
    'Cette section constitue le point de rupture le plus fréquent des dossiers d\'agrément EMF/SFD 2ème catégorie. Les Commissions Bancaires des zones UEMOA et CEMAC ont formalisé un refus systématique lorsque la chaîne de propriété économique présente une opacité structurelle, une absence de substance locale, ou une interposition d\'entités domiciliées dans des juridictions à faible implication fiscale ou à régime de non-résident.',
    'critical'
  ),
  spacer(),

  h2('1.1 — Le blocage majeur : pourquoi les groupes tech mondiaux échouent aux enquêtes de moralité'),
  body(
    'L\'Instruction BCEAO n°004-01-2014 et ses déclinaisons nationales, ainsi que le Règlement COBAC R-2023/01, imposent une enquête de moralité systématique pour tout candidat à l\'agrément d\'établissement de microfinance. Cette enquête ne se limite pas au casier judiciaire des personnes physiques. Elle englobe la traçabilité complète des actionnaires ultimes, l\'origine des fonds de dotation, l\'absence de condamnations pénales ou disciplinaires dans les juridictions d\'origine, et la conformité des entités morales actionnaires avec les standards internationaux de transparence.'
  ),
  body(
    'Les dossiers de groupes technologiques internationaux — particulièrement ceux structurés via des sociétés à responsabilité limitée de zone franche (FZCO, FZ-LLC) — sont confrontés à trois obstacles réglementaires structurels :'
  ),
  bulletBold('Obstacle I — Absence de substance économique démontrable', 'Les entités domiciliées à Dubaï ou dans des juridictions de zone franche présentent fréquemment une absence de personnel permanent, de bureaux physiques autonomes, et d\'activité opérationnelle substantielle. Aux yeux des régulateurs bancaires africains, cette vacuité opérationnelle qualifie la maison-mère de "société écran" ou de "véhicule de détention passive", au sens des Recommandations GAFI n°24 et n°25 sur la transparence des personnes morales et des dispositifs juridiques.'),
  bulletBold('Obstacle II — Chaîne de propriété économique opaque', 'La présence de trusts, de fonds d\'investissement à structure cloisonnée (SPV), ou de holding interposées dans des juridictions à secret bancaire érodé mais non totalement transparentes (Delaware, BVI, Jersey, Cayman) constitue un motif de rejet automatique lorsque la traçabilité des fonds de dotation n\'est pas établie jusqu\'au niveau des personnes physiques disposant d\'un contrôle effectif supérieur à 25 % du capital ou des droits de vote.'),
  bulletBold('Obstacle III — Incompatibilité avec la politique de l\'État hôte', 'Les Commissions Bancaires de la BCEAO et de la COBAC intègrent désormais une dimension de "souveraineté financière" dans leur appréciation des dossiers. L\'ouverture du capital à des entités purement étrangères, sans contrepartie de transfert de compétences, de co-développement technologique local, ou d\'engagement de rétrocession de valeur, est perçue comme un risque de dépendance technologique et financière. Cette appréciation, bien que non formalisée dans un texte unique, est désormais systématique dans les comptes rendus de la Commission des Agréments.'),
  spacer(),

  h2('1.2 — Exigences "Bulletproof" sur la transparence de l\'UBO (Ultimate Beneficial Owner)'),
  h3('1.2.1 — Référentiel normatif applicable'),
  body(
    'La traçabilité de l\'UBO s\'appuie sur un empilement normatif de trois niveaux :'
  ),
  numberedItem(1, 'Recommandation GAFI n°24 (2019, révisée 2023) : Transparence et divulgation des informations sur la propriété effective des personnes morales. Exigence de tenue d\'un registre des bénéficiaires effectifs accessible aux autorités compétentes et aux obliged entities.'),
  numberedItem(2, 'Recommandation GAFI n°25 (2019, révisée 2023) : Transparence et divulgation des informations sur les dispositifs juridiques (trusts, fondations, autres). Exigence de tenue d\'un registre central des trusts et obligation de divulgation aux autorités en cas de suspicion de blanchiment.'),
  numberedItem(3, 'Instructions BCEAO 2024 (n°026 à n°029) : Harmonisation des procédures de contrôle des actionnaires et des personnes exerçant un contrôle effectif sur les établissements de microfinance. Obligation de déclaration des actionnaires détenant plus de 5 % du capital, avec remontée jusqu\'à l\'UBO.'),
  numberedItem(4, 'Règlement COBAC R-2023/01 : Normes de gouvernance et de gestion des risques applicables aux établissements de crédit et aux établissements de microfinance de la CEMAC. Article 14 : exigence de divulgation des actionnaires et de leurs liens de dépendance.'),
  numberedItem(5, 'Directives nationales complémentaires : Circulaires des Ministères des Finances (Togo, Bénin, Burkina, Mali, Cameroun, Gabon, Congo) fixant les modalités de transmission des informations sur les bénéficiaires effectifs et les documents justificatifs.'),
  spacer(),

  h3('1.2.2 — Niveau d\'exigence requis pour les actionnaires institutionnels et fonds d\'investissement'),
  body(
    'Lorsque l\'actionnariat comprend des entités institutionnelles (fonds de capital-investissement, fonds de pension, family offices, véhicules de private equity) domiciliés à Dubaï ou à l\'international, les exigences suivantes constituent des hard stops non négociables :'
  ),
  bulletBold('Traçabilité des fonds de dotation du capital social', 'Chaque apport au capital social de la filiale EMF doit être assorti d\'un document de traçabilité complet : origine des fonds (revenus, cession d\'actifs, dividendes, apport en capital d\'une société holding), documents bancaires certifiés (relevés de compte sur les 24 derniers mois), attestation de la banque domiciliataire confirmant la provenance et la légalité des fonds, et déclaration sur l\'honneur de l\'actionnaire quant à l\'absence de financement par des fonds d\'origine criminelle ou terroristes.'),
  bulletBold('Exigences de casiers judiciaires certifiés', 'Toute personne physique actionnaire ou détenant un contrôle effectif doit fournir un extrait de casier judiciaire (bulletin n°3 ou équivalent) dans la juridiction de résidence fiscale, daté de moins de 3 mois, apostillé ou légalisé conformément à la Convention de La Haye. Les personnes ayant résidé dans plusieurs juridictions doivent fournir les documents de chaque juridiction de résidence au cours des 5 dernières années.'),
  bulletBold('Attestations de non-faillite des entités morales', 'Toute entité morale actionnaire doit produire une attestation de solvabilité et de non-faillite, certifiée par un commissaire aux comptes ou un notaire agréé dans la juridiction de constitution. L\'attestation doit couvrir les 3 derniers exercices clos et attester de l\'absence de procédures collectives, de redressement judiciaire, ou de liquidation.'),
  bulletBold('Rapports de due diligence signés par des notaires ou cabinets agréés', 'Les actionnaires institutionnels doivent produire un rapport de due diligence juridique et financière (Legal & Financial DD) établi par un cabinet d\'audit ou un cabinet d\'avocats de renommée internationale (Big Four, Magic Circle, ou équivalent régional agréé), couvrant : (a) la légalité de la constitution de l\'entité, (b) la validité des statuts et des actes constitutifs, (c) l\'absence de contentieux majeurs, (d) la conformité fiscale, (e) la traçabilité des fonds de dotation.'),
  spacer(),

  h3('1.2.3 — Tableau de synthèse des documents obligatoires par catégorie d\'actionnaire'),
  buildTable(
    ['Catégorie d\'actionnaire', 'Documents obligatoires', 'Niveau de certification', 'Fréquence de mise à jour'],
    [
      ['Personne physique — Résident UEMOA/CEMAC', 'Carte d\'identité, casier judiciaire, attestation de résidence, justificatif de revenus', 'Notaire ou administrateur civil, apostille', 'À chaque renouvellement d\'agrément (3 ans)'],
      ['Personne physique — Résident hors zone', 'Passeport, casier judiciaire de chaque juridiction de résidence (5 ans), attestation fiscale, preuve de revenus', 'Apostille + traduction assermentée', 'À chaque renouvellement + alerte immédiate en cas de changement'],
      ['Entité morale — Résidente zone', 'RCCM, statuts, attestation non-faillite, Kbis, comptes certifiés (3 ans), liste des bénéficiaires effectifs', 'CAC agréé dans la zone, CGRAE', 'Annuelle'],
      ['Entité morale — FZCO / Zone franche', 'Licence de zone franche, statuts, preuve de substance économique (baux, salariés, factures), UBO registry, comptes certifiés, rapport DD Big Four', 'CAC international (Big Four), notaire local, apostille', 'Semestrielle + alerte immédiate'],
      ['Fonds d\'investissement / SPV', 'Prospectus, statuts, agreements LPA/GP, UBO registry, rapport DD, attestation non-faillite, traçabilité des fonds', 'CAC international + notaire juridiction d\'origine', 'Trimestrielle + alerte immédiate'],
    ],
    { colWidths: [25, 30, 25, 20], headerBg: KHEPRA_RED, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('1.3 — Le risque "société écran" et la qualification de non-conformité immédiate'),
  h3('1.3.1 — Définition opérationnelle de la société écran selon les standards réglementaires africains'),
  body(
    'Le concept de "société écran" (shell company) n\'est pas explicitement défini dans le droit OHADA. Toutefois, les pratiques des Commissions Bancaires s\'appuient sur les critères suivants pour qualifier une entité de "véhicule de détention dépourvu de substance économique" :'
  ),
  bullet('Absence de personnel salarié permanent à temps plein (minimum 3 employés pour une holding opérationnelle).'),
  bullet('Absence de bureaux physiques autonomes (non partagés avec d\'autres entités du groupe).'),
  bullet('Absence d\'activité opérationnelle démontrable (pas de contrats clients directs, pas de revenus opérationnels, pas de présence commerciale active).'),
  bullet('Absence de comptes certifiés par un CAC de renommée internationale ou régionale agréée.'),
  bullet('Présence d\'une chaîne de détention interposée de plus de 2 niveaux sans justification commerciale ou juridique.'),
  bullet('Domiciliation dans une juridiction classée comme "juridiction à haut risque" par la BCEAO, la COBAC, ou le GAFI (liste grise ou noire).'),
  spacer(),

  h3('1.3.2 — Conséquence réglementaire de la qualification'),
  body(
    'La qualification de société écran entraîne une chaîne de conséquences juridiques et réglementaires irréversibles :'
  ),
  numberedItem(1, 'Avis de non-conformité immédiat : La Commission Bancaire émet un avis de non-conformité motivé, sans délai de régularisation. Cet avis est définitif et non susceptible de recours administratif préalable.'),
  numberedItem(2, 'Inscription sur la liste des promoteurs non éligibles : Le promoteur et ses entités associées sont inscrits sur la liste des promoteurs non éligibles pour une durée de 5 ans, renouvelable.'),
  numberedItem(3, 'Transmission aux autorités de lutte contre le blanchiment : Le dossier est transmis au service national de renseignement financier (CENTIF, TRACFIN, UIF, ou équivalent national) pour investigation approfondie.'),
  numberedItem(4, 'Impact sur les agréments existants : Si le groupe détient déjà des agréments dans d\'autres juridictions de la zone, une procédure de révocation d\'agrément peut être engagée par le régulateur de la juridiction d\'origine, sur la base de la clause de coopération transfrontalière des traités de la BCEAO et de la COBAC.'),
  spacer(),

  alertBox(
    'Le Groupe OPTASIA, structuré via OPTASIA SOLUTIONS FZCO (Dubaï), doit impérativement démontrer une substance économique tangible au niveau de la maison-mère avant de déposer tout dossier d\'agrément. À défaut, le risque de qualification de société écran est élevé, et les conséquences seraient irréversibles pour l\'ensemble du programme panafricain.',
    'critical'
  ),
  spacer(),

  h2('1.4 — Recommandations impératives de hardening'),
  bulletBold('Mesure 1 — Constitution d\'une holding de substance dans la zone UEMOA ou CEMAC', 'Créer une holding opérationnelle dans la zone (Togo ou Cameroun, pays pilotes), avec un siège social autonome, un personnel permanent (minimum 5 employés), une activité commerciale préalable (prestations de conseil, services technologiques, ou partenariats MNO), et des comptes certifiés. Cette holding devient l\'actionnaire direct des filiales EMF.'),
  bulletBold('Mesure 2 — Traçabilité totale des fonds de dotation', 'Établir une chaîne documentaire complète pour chaque apport au capital des filiales : documents bancaires, attestations, rapports DD, et déclarations sur l\'honneur. L\'absence d\'un seul document de la chaîne constitue un hard stop.'),
  bulletBold('Mesure 3 — Audit préalable de la chaîne de propriété', 'Mandater un cabinet Big Four ou un cabinet d\'avocats de renommée internationale pour réaliser un audit complet de la chaîne de propriété (Ownership Chain Audit) et produire un rapport certifié destiné à être joint en annexe du dossier d\'agrément.'),
  bulletBold('Mesure 4 — Engagement de transparence continue', 'Souscrire un engagement écrit de transparence continue envers les régulateurs, prévoyant la communication trimestrielle de tout changement dans la structure actionnariale, la composition du capital, ou l\'identité des bénéficiaires effectifs.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



