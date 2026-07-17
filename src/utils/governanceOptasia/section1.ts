import { Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, numberedItem, organigramItem } from './helpers';

export const section1Paragraphs: Paragraph[] = [
  h1('SECTION 1 — ARCHITECTURE JURIDIQUE ET TRAÇABILITÉ DE L\'ACTIONNARIAT (CHAIN OF CONTROL)'),
  divider(),
  spacer(),

  h2('1.1 Cartographie des liens en capital et de contrôle'),
  body('La structure cible d\'OPTASIA GROUP repose sur une architecture tripartite soumise à une traçabilité absolue de la chaîne de contrôle, conformément aux Instructions BCEAO n°026-029/2024, aux Règlements COBAC R-2023/01 et aux normes GAFI n°24 et n°25 sur la transparence des bénéficiaires effectifs.'),
  spacer(),
  body('Organigramme textuel de la chaîne de contrôle :'),
  organigramItem(0, 'NIVEAU 1 — ENTITÉ TECH GLOBALE', 'OPTASIA SOLUTIONS FZCO, Dubaï, Émirats Arabes Unis', 'Actionnaires ultimes — UBO identifiés'),
  organigramItem(1, 'Détention à 100%', 'Holding Régionale Intermédiaire — Cameroun, Zone CEMAC', 'Par participation directe majoritaire'),
  organigramItem(2, 'Détention à 100%', 'Filiales Locales Opérationnelles — EMF/SFD de 2ème catégorie', 'Par cascade de participations indirectes'),
  organigramItem(1, 'Détention directe (UEMOA)', 'Filiales UEMOA — Togo, Bénin, Burkina, Mali', 'Par participation directe de la Holding'),
  organigramItem(1, 'Détention directe (CEMAC)', 'Filiales CEMAC — Cameroun, Gabon, Congo', 'Par participation directe de la Holding'),
  spacer(),

  h3('1.1.1 Structure du Chain of Control — Flux de décision et de capital'),
  body('La chaîne de contrôle doit être documentée selon les 4 couches de traçabilité exigées par les Commissions Bancaires :'),
  numberedItem(1, 'Couche Légale : Les statuts de chaque entité, certifiés conformes par un notaire ou un commissaire aux comptes agréé, doivent indiquer explicitement la détention majoritaire et les modalités de nomination des organes de direction.'),
  numberedItem(2, 'Couche Financière : Les attestations de libération du capital social, délivrées par les établissements de crédit habilités, doivent faire apparaître l\'origine des fonds et leur licité (non-blanchiment, non-terrorisme, non-sanctions internationales).'),
  numberedItem(3, 'Couche Opérationnelle : Les conventions de groupe (Intra-Group Agreements, Management Services Agreements, Licences de technologie) doivent être archivées, numérotées et accessibles aux régulateurs sur demande.'),
  numberedItem(4, 'Couche Réglementaire : Les déclarations d\'UBO transmises au Registre des Bénéficiaires Effectifs (RBE) de chaque juridiction doivent être cohérentes avec les statuts et les déclarations fiscales.'),
  spacer(),

  h3('1.1.2 Tableau de synthèse — Chain of Control par niveau'),
  buildTable(
    ['Niveau', 'Entité', 'Forme juridique', 'Juridiction', 'Capital social', 'Contrôle exercé'],
    [
      ['Niveau 1', 'OPTASIA SOLUTIONS FZCO', 'FZCO (Zone Franche)', 'DIFC, Dubaï', 'Conforme DIFC', 'Actionnaire ultime — UBO'],
      ['Niveau 2', 'OPTASIA HOLDING AFRICA', 'SA / SARL (à déterminer)', 'Cameroun, CEMAC', 'Conforme COBAC', 'Holding régionale — Hub opérationnel'],
      ['Niveau 3A', 'OPTASIA EMF Cameroun', 'EMF 2ème catégorie', 'Cameroun, CEMAC', 'Conforme R-2017/05', 'Filiale opérationnelle CEMAC'],
      ['Niveau 3B', 'OPTASIA EMF Gabon', 'EMF 2ème catégorie', 'Gabon, CEMAC', 'Conforme R-2017/05', 'Filiale opérationnelle CEMAC'],
      ['Niveau 3C', 'OPTASIA EMF Congo', 'EMF 2ème catégorie', 'Congo, CEMAC', 'Conforme R-2017/05', 'Filiale opérationnelle CEMAC'],
      ['Niveau 3D', 'OPTASIA SFD Togo', 'SFD 2ème catégorie', 'Togo, UEMOA', 'Conforme Inst. 004-01-2014', 'Filiale opérationnelle UEMOA'],
      ['Niveau 3E', 'OPTASIA SFD Bénin', 'SFD 2ème catégorie', 'Bénin, UEMOA', 'Conforme Inst. 004-01-2014', 'Filiale opérationnelle UEMOA'],
      ['Niveau 3F', 'OPTASIA SFD Burkina', 'SFD 2ème catégorie', 'Burkina Faso, UEMOA', 'Conforme Inst. 004-01-2014', 'Filiale opérationnelle UEMOA'],
      ['Niveau 3G', 'OPTASIA SFD Mali', 'SFD 2ème catégorie', 'Mali, UEMOA', 'Conforme Inst. 004-01-2014', 'Filiale opérationnelle UEMOA'],
    ],
    { colWidths: [12, 22, 18, 18, 18, 12], boldFirstCol: true }
  ),
  spacer(),

  h2('1.2 Protocole de documentation « Bulletproof » pour les investisseurs et actionnaires'),
  body('Le passage du filtre des enquêtes de moralité des Commissions Bancaires (BCEAO, COBAC) et des Ministères des Finances exige un protocole documentaire irréprochable. Tout écart constitue un motif de rejet irréversible.'),
  spacer(),

  h3('1.2.1 Documents obligatoires par catégorie d\'actionnaire'),
  buildTable(
    ['Catégorie', 'Documents obligatoires', 'Référence normative', 'Validateur'],
    [
      ['Personnes physiques résidentes zone', 'Casier judiciaire B3 (ou équivalent) certifié apostillé ; Attestation de non-faillite ; Extrait de naissance ; Déclaration d\'impôts 3 derniers exercices ; Justificatif de domicile fiscal', 'Instruction BCEAO 004-01-2014, Art. 12 ; Règlement COBAC R-2017/05, Art. 8', 'Notaire / CAC agréé / Avocat inscrit'],
      ['Personnes physiques hors zone', 'Casier judiciaire international (Interpol) ; Attestation de non-faillite internationale ; Déclaration fiscale juridiction d\'origine ; Rapport de due diligence signé Big Four ; Attestation bancaire de solvabilité', 'GAFI n°24 ; GAFI n°25 ; COBAC R-2023/01, Art. 15', 'Big Four / Notaire international / CAC'],
      ['Entités morales (zone)', 'Statuts certifiés ; PV AG nommant les représentants ; Attestation de non-faillite ; Comptes certifiés 3 exercices ; Déclaration fiscale ; Organigramme de détention', 'AUSCGIE OHADA ; Instruction BCEAO 004-01-2014', 'CAC agréé OHADA / Notaire'],
      ['FZCO / Zone franche', 'Licence d\'activité DIFC ; Attestation de substance économique ; Comptes certifiés (Big Four) ; Déclaration UBO au registre DIFC ; Rapport de due diligence ; Preuve de bureaux physiques et de personnel effectif', 'GAFI n°24 ; COBAC R-2023/01, Art. 15 ; Instruction BCEAO 026/2024', 'Big Four / CAC international / Notaire DIFC'],
      ['Fonds d\'investissement / SPV', 'Prospectus d\'investissement ; LPA (Limited Partnership Agreement) ; KYC des GP et LP ; Attestation de conformité GAFI du gestionnaire ; Rapport de due diligence signé ; Déclaration UBO au registre de la juridiction d\'origine', 'GAFI n°25 ; COBAC R-2023/01, Art. 16 ; Directive AIFMD (équivalent)', 'Big Four / CAC international / Notaire'],
    ],
    { colWidths: [18, 32, 25, 25], boldFirstCol: true }
  ),
  spacer(),

  h3('1.2.2 Traçabilité des fonds de dotation du capital social'),
  alertBox('Le fonds de dotation du capital social doit être traçable jusqu\'à leur origine primaire. Toute opacité dans la chaîne de financement entraîne un avis de non-conformité immédiat.', 'critical'),
  bullet('La provenance des fonds doit être justifiée par des documents bancaires traçables : relevés de compte, virements SWIFT, attestations de transfert.'),
  bullet('Les fonds d\'origine cryptographique, opaque ou non-sourcée sont interdits par les Instructions BCEAO 2024 et les Règlements COBAC.'),
  bullet('Les apports en nature doivent être évalués par un expert indépendant agréé et faire l\'objet d\'un rapport de valeur conforme au SYSCOHADA.'),
  bullet('Les transferts transfrontaliers de capital doivent être déclarés aux services de change compétents (BEAC pour la CEMAC, BCEAO pour l\'UEMOA) et accompagnés d\'un récépissé de déclaration.'),
  spacer(),

  h2('1.3 Risque de requalification de la Holding intermédiaire'),
  alertBox('Le défaut de substance économique de la Holding Régionale (Cameroun) constitue le risque de gouvernance le plus élevé pour le dossier d\'agrément. La requalification en « société écran » entraîne un avis défavorable immédiat et l\'interdiction de tout agrément dans la zone.', 'critical'),
  spacer(),

  h3('1.3.1 Critères de substance économique exigés par la COBAC et la BCEAO'),
  body('La substance économique de la Holding Régionale doit être démontrée par les 6 critères cumulatifs suivants :'),
  numberedItem(1, 'Personnel effectif : La Holding doit employer au minimum 5 personnes physiques à temps plein sur le territoire du Cameroun, dont un Directeur Général résident, un Directeur des Risques, un Directeur de la Conformité, un Directeur Financier et un Directeur Juridique.'),
  numberedItem(2, 'Bureaux physiques : La Holding doit disposer d\'un siège social matériel, loué ou en propriété, avec bail commercial enregistré et mentionné au registre du commerce. Les bureaux virtuels, co-working spaces ou adresses de domiciliation sont non conformes.'),
  numberedItem(3, 'Activité économique réelle : La Holding doit générer un chiffre d\'affaires propre (prestations de conseil, licences, services partagés) justifié par des factures, des contrats et des comptes certifiés. L\'absence de revenus propres est un indicateur de société écran.'),
  numberedItem(4, 'Comptes certifiés : Les états financiers annuels de la Holding doivent être certifiés par un CAC agréé OHADA et déposés au registre du commerce dans les délais légaux.'),
  numberedItem(5, 'Chaîne de détention transparente : La Holding doit déclarer ses propres actionnaires (via l\'entité FZCO de Dubaï) et ses bénéficiaires effectifs au registre des bénéficiaires effectifs du Cameroun.'),
  numberedItem(6, 'Juridiction de résidence fiscale : La Holding doit être résidente fiscale au Cameroun, avec un numéro d\'identification fiscale, une déclaration fiscale régulière et un paiement effectif d\'impôts.'),
  spacer(),

  h3('1.3.2 Obligation de tenue des AG et CA sur le continent africain'),
  body('Conformément au Règlement COBAC R-2023/01 et aux Circulaires BCEAO 01-03/2017, les organes décisionnels de la Holding et des filiales doivent se réunir physiquement sur le territoire de la zone monétaire concernée.'),
  bullet('Les Assemblées Générales (AG) de la Holding doivent être tenues au Cameroun, avec présence physique obligatoire des actionnaires ou de leurs représentants mandatés. Les AG par visioconférence sont autorisées à titre exceptionnel, mais ne doivent pas constituer la norme.'),
  bullet('Les Conseils d\'Administration (CA) de la Holding et des filiales doivent se réunir au minimum 4 fois par an, sur le territoire de la juridiction de la filiale ou de la Holding.'),
  bullet('Les procès-verbaux de CA et d\'AG doivent être rédigés en français, signés par tous les participants, et conservés dans les archives statutaires de la juridiction locale.'),
  bullet('Les décisions stratégiques majeures (modification des statuts, augmentation de capital, fusion, acquisition, cession d\'actifs) doivent être adoptées en présence physique des administrateurs.'),
  spacer(),

  h3('1.3.3 Conséquences d\'une requalification en société écran'),
  buildTable(
    ['Conséquence', 'Portée', 'Référence réglementaire'],
    [
      ['Avis de non-conformité immédiat', 'Rejet de l\'instruction d\'agrément', 'COBAC R-2023/01, Art. 19 ; BCEAO Inst. 004-01-2014, Art. 14'],
      ['Inscription sur liste de surveillance', 'Interdiction d\'agrément pendant 5 ans minimum', 'COBAC R-2023/01, Art. 20'],
      ['Transmission aux services CENTIF/TRACFIN', 'Procédure de blanchiment / financement du terrorisme', 'GAFI n°24 ; BCEAO Instruction 008-05-2015'],
      ['Révocation des agréments existants', 'Si une filiale est déjà agréée, révocation avec fermeture administrative', 'COBAC R-2017/05, Art. 45 ; BCEAO Circulaire 03/2017'],
      ['Responsabilité pénale des dirigeants', 'Poursuites pour faux et usage de faux, abus de confiance', 'AUSCGIE OHADA — Acte Uniforme Droit Pénal OHADA'],
    ],
    { colWidths: [30, 35, 35], boldFirstCol: true }
  ),
  spacer(),

  h3('1.3.4 Mesures de hardening pour la substance de la Holding'),
  bullet('Établir la Holding au Cameroun avec un capital social conforme au Règlement COBAC R-2017/05 (minimum pour EMF de 2ème catégorie : 50 000 000 FCFA).'),
  bullet('Recruter immédiatement le DG de la Holding avec contrat à durée indéterminée, résidence fiscale camerounaise et nationalité CEMAC.'),
  bullet('Louer un bureau de standing professionnel (minimum 100 m²) avec bail commercial de 3 ans minimum, enregistré aux impôts.'),
  bullet('Établir un contrat de service partagé (Shared Services Agreement) entre la Holding et les filiales, avec prix de transfert conforme OCDE et rapport du CAC.'),
  bullet('Désigner un CAC agréé OHADA dès la création de la Holding et exiger une certification des comptes dès la première année d\'activité.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];