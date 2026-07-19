import { Paragraph } from 'docx';
import { h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, numberedItem } from '';

export const section4Paragraphs: Paragraph[] = [
  h1('SECTION 4 — PROTOCOLE DES CONVENTIONS RÉGLEMENTÉES ET CONTRATS INTER-COMPAGNIES'),
  divider(),
  spacer(),

  h2('4.1 Cadre juridique des flux de prestations de services internes'),
  body('Les relations entre l\'entité FZCO de Dubaï, la Holding Régionale du Cameroun et les filiales locales opérationnelles sont régies par des conventions réglementées au sens de l\'AUSCGIE OHADA (Art. 10 et 11) et soumises à des obligations spécifiques de déclaration et d\'approbation. Toute convention non déclarée ou non approuvée constitue un motif de rejet d\'agrément.'),
  spacer(),

  h3('4.1.1 Typologie des conventions inter-compagnies d\'OPTASIA'),
  buildTable(
    ['Type de convention', 'Parties', 'Objet', 'Régime de déclaration', 'Référence normative'],
    [
      ['Management Services Agreement (MSA)', 'FZCO Dubaï → Holding Cameroun', 'Prestations de conseil stratégique, support juridique, veille réglementaire, formation des dirigeants', 'Convention réglementée — Approbation préalable du CA de la Holding + rapport du CAC', 'AUSCGIE OHADA Art. 10 ; COBAC R-2023/01 Art. 14'],
      ['Licence d\'utilisation technologique', 'FZCO Dubaï → Holding Cameroun → Filiales', 'Licence d\'utilisation du moteur d\'IA de scoring, de la plateforme CBS, des applications mobiles', 'Convention réglementée — Approbation du CA de chaque entité + rapport du CAC + évaluation de la valeur par un expert indépendant', 'AUSCGIE OHADA Art. 11 ; COBAC R-2021/01 Art. 7 ; BCEAO Instructions 2024 n°026-029'],
      ['Maintenance informatique et support technique', 'FZCO Dubaï → Holding Cameroun → Filiales', 'Maintenance du CBS, mises à jour logicielles, support technique, hébergement des données (sous réserve de souveraineté locale)', 'Convention réglementée — Approbation du CA de chaque entité + clause de localisation des données', 'COBAC R-2021/01 Art. 7 ; BCEAO Instructions 2024'],
      ['Shared Services Agreement (SSA)', 'Holding Cameroun → Filiales locales', 'Services partagés : comptabilité consolidée, gestion des ressources humaines, formation, conformité, audit interne', 'Convention réglementée — Approbation du CA de chaque filiale + rapport du CAC + déclaration au régulateur', 'AUSCGIE OHADA Art. 10 ; BCEAO Circulaire 01/2017'],
      ['Contrat de distribution de liquidité', 'Holding Cameroun → Filiales locales', 'Mise à disposition de liquidités inter-filiales, ligne de trésorerie, refinancement', 'Convention réglementée — Approbation du CA de chaque entité + déclaration BEAC/BCEAO + respect des ratios de concentration', 'COBAC R-2017/05 Art. 15 ; BCEAO Instruction 004-01-2014 Art. 11'],
    ],
    { colWidths: [18, 20, 28, 18, 16], boldFirstCol: true }
  ),
  spacer(),

  h2('4.2 Critères de validité des conventions réglementées'),
  alertBox('Toute convention entre entités liées du Groupe OPTASIA doit satisfaire aux 5 critères de validité cumulatifs suivants. Le défaut de l\'un d\'entre eux entraîne la nullité de la convention et un motif de rejet d\'agrément.', 'critical'),
  spacer(),

  h3('4.2.1 Les 5 critères de validité cumulatifs'),
  numberedItem(1, 'Approbation préalable du Conseil d\'Administration : La convention doit être soumise au CA de chaque entité partie avant sa signature. Le CA doit délibérer et voter la convention. Les administrateurs intéressés doivent s\'abstenir de voter.'),
  numberedItem(2, 'Rapport spécial du Commissaire aux Comptes : Le CAC doit établir un rapport spécial sur chaque convention réglementée, indiquant la nature de la prestation, sa valeur, sa méthode de détermination, et son impact sur la situation financière de l\'entité. Ce rapport est présenté à l\'AG.'),
  numberedItem(3, 'Prix de transfert conforme au principe de pleine concurrence (Arm\'s Length Principle) : Les tarifs des prestations doivent être déterminés comme si les parties étaient des tiers indépendants. Le Groupe doit disposer d\'une politique de prix de transfert documentée, validée par un cabinet Big Four ou équivalent.'),
  numberedItem(4, 'Interdiction des conventions léonines : Aucune convention ne peut désavantager l\'une des parties au profit de l\'autre. Les conventions ne peuvent siphonner le PNB (Produit Net Bancaire) local, réduire artificiellement la rentabilité des filiales, ou transférer des bénéfices de manière opaque.'),
  numberedItem(5, 'Déclaration au régulateur : Les conventions réglementées doivent être déclarées au régulateur local (BCEAO ou COBAC) dans le délai de 30 jours suivant leur approbation. Le régulateur peut exiger des modifications ou des informations complémentaires.'),
  spacer(),

  h3('4.2.2 Tableau de conformité des conventions réglementées'),
  buildTable(
    ['Convention', 'CA approbation', 'CAC rapport', 'Prix de transfert', 'Déclaration régulateur', 'Statut'],
    [
      ['MSA (FZCO → Holding)', 'Obligatoire — CA Holding + CA FZCO', 'Obligatoire — CAC Holding + CAC FZCO', 'Obligatoire — Politique OCDE validée', 'Obligatoire — 30 jours', 'À établir'],
      ['Licence technologique', 'Obligatoire — CA de chaque entité', 'Obligatoire — CAC de chaque entité', 'Obligatoire — Évaluation par expert indépendant', 'Obligatoire — 30 jours', 'À établir'],
      ['Maintenance informatique', 'Obligatoire — CA de chaque entité', 'Obligatoire — CAC de chaque entité', 'Obligatoire — Benchmarking prestations similaires', 'Obligatoire — 30 jours', 'À établir'],
      ['Shared Services (Holding → Filiales)', 'Obligatoire — CA de chaque entité', 'Obligatoire — CAC de chaque entité', 'Obligatoire — Politique OCDE validée', 'Obligatoire — 30 jours', 'À établir'],
      ['Distribution de liquidité', 'Obligatoire — CA de chaque entité', 'Obligatoire — CAC de chaque entité', 'Obligatoire — Taux conforme au marché interbancaire', 'Obligatoire — 30 jours + déclaration BEAC/BCEAO', 'À établir'],
    ],
    { colWidths: [18, 16, 14, 18, 18, 16], boldFirstCol: true }
  ),
  spacer(),

  h2('4.3 Principe de pleine concurrence de l\'OCDE'),
  body('Le principe de pleine concurrence (Arm\'s Length Principle) exige que les conditions commerciales et financières des transactions entre entités liées soient identiques à celles qui seraient consenties entre entreprises indépendantes. Ce principe est applicable en droit OHADA et en droit fiscal des États membres.'),
  spacer(),

  h3('4.3.1 Méthodes de détermination du prix de transfert'),
  bullet('Méthode du prix comparable sur le marché libre (CUP) : Comparaison des tarifs de la prestation avec ceux pratiqués sur le marché local par des prestataires indépendants. Applicable aux MSA et aux SSA.'),
  bullet('Méthode du prix de revente minoré (RPM) : Détermination du prix de transfert en minorant le prix de revente par une marge de distribution. Applicable aux licences technologiques.'),
  bullet('Méthode du prix de revient majoré (Cost-Plus) : Détermination du prix en majorant le prix de revient par une marge de profit. Applicable à la maintenance informatique et aux services partagés.'),
  bullet('Méthode de la répartition des bénéfices : Répartition des bénéfices globaux entre les entités selon leur contribution respective. Applicable aux projets communs de développement technologique.'),
  spacer(),

  h3('4.3.2 Politique de prix de transfert — Document cadre obligatoire'),
  body('Le Groupe OPTASIA doit élaborer une Politique de Prix de Transfert conforme aux directives OCDE et validée par un cabinet d\'audit international. Cette politique doit inclure :'),
  bullet('Une description de la structure organisationnelle du Groupe et de la chaîne de valeur.'),
  bullet('Une analyse des fonctions, des actifs et des risques de chaque entité.'),
  bullet('Une justification de la méthode de prix de transfert retenue pour chaque type de transaction.'),
  bullet('Une documentation des comparables (études de marché, benchmarks, données sectorielles).'),
  bullet('Une procédure de mise à jour annuelle et de déclaration aux autorités fiscales.'),
  bullet('Un Master File (document groupe) et des Local Files (documents par juridiction) conformes aux standards OCDE.'),
  spacer(),

  h3('4.3.3 Risques de redressement fiscal local'),
  alertBox('L\'absence de politique de prix de transfert documentée expose le Groupe à des redressements fiscaux dans chaque juridiction, avec des pénalités pouvant atteindre 100% du montant redressé, et à un risque de requalification de la convention en transfert indirect de bénéfices.', 'warning'),
  buildTable(
    ['Risque', 'Juridiction', 'Conséquence', 'Plafond de pénalité'],
    [
      ['Redressement fiscal sur MSA', 'Tous les pays', 'Réintégration du montant dans le résultat imposable + pénalité', '100% du montant redressé + intérêts de retard'],
      ['Requalification en transfert de bénéfices', 'Cameroun, Gabon, Congo', 'Imposition forfaitaire sur les bénéfices transférés + interdiction de déduction des charges', 'Pénalité de 50% du montant requalifié'],
      ['Sanction réglementaire', 'BCEAO / COBAC', 'Rejet de l\'agrément ou révocation de l\'agrément existant', 'Fermeture administrative de la filiale'],
    ],
    { colWidths: [30, 25, 25, 20], boldFirstCol: true }
  ),
  spacer(),

  h2('4.4 Interdiction des conventions léonines et siphonnage du PNB local'),
  body('L\'AUSCGIE OHADA (Art. 10, alinéa 3) interdit strictement les conventions par lesquelles un associé ou un dirigeant se fait accorder, directement ou indirectement, un avantage excessif au détriment de la société.'),
  spacer(),

  h3('4.4.1 Indications de siphonnage du PNB local'),
  bullet('Les redevances de licence technologique excèdent 5% du PNB local de la filiale.'),
  bullet('Les frais de management (MSA) excèdent 3% du PNB local de la filiale.'),
  bullet('Les services partagés (SSA) sont facturés à un tarif supérieur de plus de 20% au tarif de marché local.'),
  bullet('Les distributions de liquidité inter-filiales sont rémunérées à un taux supérieur au taux interbancaire local majoré de 2 points.'),
  bullet('Les actifs de la filiale (fonds de roulement, immobilisations) sont transférés à la Holding ou au FZCO sans contrepartie équitable.'),
  spacer(),

  h3('4.4.2 Mesures de prévention du siphonnage'),
  numberedItem(1, 'Plafonnement des redevances : Les redevances de licence et les frais de management sont plafonnés par la Politique de Prix de Transfert et validés par le CAC de chaque entité.'),
  numberedItem(2, 'Rapport annuel du CAC : Le CAC de chaque filiale doit établir un rapport annuel sur la conformité des conventions inter-compagnies avec le principe de pleine concurrence.'),
  numberedItem(3, 'Audit externe : Un audit externe annuel sur les prix de transfert est obligatoire, réalisé par un cabinet Big Four ou équivalent.'),
  numberedItem(4, 'Déclaration au régulateur : Les montants totaux des flux inter-compagnies sont déclarés annuellement au régulateur (BCEAO, COBAC) dans le rapport de conformité.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



