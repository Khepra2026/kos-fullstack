import { Paragraph, TextRun, AlignmentType } from 'docx';
import {
  TEAL, DARK, SLATE, RED, AMBER,
  h1, h2, h3, body, bullet, bulletBold, alertBox, spacer, divider,
  numberedItem, buildTable, partTitle,
} from '';

export const part4Paragraphs: Paragraph[] = [
  partTitle('IV', 'CADRE RÉGLEMENTAIRE DES PRODUITS, SERVICES ET MODÈLE ÉCONOMIQUE FINTECH'),

  h1('PARTIE IV — CADRE RÉGLEMENTAIRE DES PRODUITS ET SERVICES FINANCIERS NUMÉRIQUES'),
  divider(),

  body(
    'La conformité d\'OPTASIA ne se limite pas à l\'obtention des agréments EMF/SFD. Elle couvre également la réglementation applicable à chaque produit financier numérique proposé aux clients finaux. Cette partie cartographie le cadre réglementaire précis applicable aux produits et services d\'OPTASIA dans les zones UEMOA et CEMAC, en identifiant les obligations spécifiques par type de produit et par juridiction.'
  ),

  h2('IV.1 — Classification réglementaire des produits financiers numériques d\'OPTASIA'),
  body('Les produits et services d\'OPTASIA se répartissent en cinq catégories réglementaires, chacune soumise à des obligations spécifiques :'),

  buildTable(
    ['Catégorie', 'Produits/Services', 'Régime UEMOA', 'Régime CEMAC', 'Autorisation requise'],
    [
      ['Crédit numérique', 'Micro-crédits via Mobile Money, scoring alternatif, BNPL (Buy Now Pay Later)', 'Agréé dans le cadre SFD 2ème cat. (BCEAO Inst. 004-01-2014) + Instruction BCEAO 2024 n°026 sur SFD digital', 'Agréé dans le cadre EMF 2ème cat. (COBAC R-2017/05) + Circulaire COBAC sur services numériques', 'Agrément SFD/EMF de 2ème catégorie — Aucun agrément supplémentaire'],
      ['Collecte de dépôts', 'Comptes d\'épargne digitaux, dépôts Mobile Money, wallets clients', 'Exclusivité SFD 2ème cat. — Interdit aux SFD 1ère cat. — Capital minimum 100M FCFA', 'Exclusivité EMF 2ème cat. — Capital minimum 100M FCFA + garantie BEAC 50M FCFA', 'Agrément SFD/EMF de 2ème catégorie'],
      ['Transfert de fonds', 'Virements internes, remises, transferts inter-opérateurs Mobile Money', 'Réglementé par BCEAO Instruction sur les systèmes de paiement + partenariats MNO autorisés', 'Réglementé par BEAC + Instruction COBAC sur les systèmes de paiement électronique', 'Agrément SFD/EMF + convention MNO approuvée régulateur'],
      ['Assurance crédit', 'Assurance-vie crédit, assurance invalidité, micro-assurance liée au crédit', 'Régulation conjointe BCEAO + CRCA (Conférence Interafricaine Marché Assurances) — Code CIMA', 'Régulation conjointe COBAC + CIMA — Code des assurances CEMAC', 'Agrément SFD/EMF + agrément produits assurance CIMA (ou partenariat avec assureur agréé)'],
      ['Scoring & Data', 'Scoring de crédit alternatif (données téléphoniques, comportement paiement), profiling clients', 'Réglementé par Instruction BCEAO 2024 n°028 et n°029 — Conformité RGPD africain + lois locales protection données', 'Réglementé par COBAC R-2021/01 et R-2023/01 — Protection des données clients, traçabilité des algorithmes', 'Déclaration BCEAO/COBAC + certification algorithme de scoring'],
    ],
    { colWidths: [16, 20, 22, 22, 20], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('IV.2 — Le crédit numérique via Mobile Money : conditions et contraintes réglementaires'),
  alertBox(
    'Le crédit numérique distribué via des canaux Mobile Money est le cœur du modèle d\'OPTASIA. Sa conformité réglementaire est la condition sine qua non de la viabilité commerciale. Une non-conformité de ce canal entraînerait la suspension immédiate des opérations et une mise en cause pénale des dirigeants.',
    'critical'
  ),

  h3('IV.2.1 — Conditions de conformité du canal Mobile Money'),
  body('La distribution de crédits via Mobile Money est encadrée par les textes suivants :'),
  bulletBold('UEMOA — Instruction BCEAO 2024 n°026', 'Les SFD souhaitant distribuer des crédits via des canaux numériques (Mobile Money, applications) doivent obtenir une autorisation spécifique de la BCEAO, en sus de l\'agrément standard. Cette autorisation est soumise à la certification de l\'algorithme de scoring, à la conformité du SIG numérique, et à la signature d\'une convention avec l\'opérateur Mobile Money concerné.'),
  bulletBold('CEMAC — Règlement COBAC R-2023/01 + Instructions BEAC', 'Les EMF distribuant des crédits via des opérateurs de Mobile Money doivent conclure des conventions bilatérales avec chaque opérateur (Orange Money, MTN Mobile Money, Moov Money), déclarées et approuvées par la COBAC. Les conditions de partage de données clients entre l\'EMF et l\'opérateur MNO doivent être explicitement encadrées.'),
  bulletBold('Conformité des algorithmes de scoring', 'L\'utilisation d\'algorithmes de scoring basés sur des données non-financières (comportement téléphonique, historique de recharge, données de localisation) est admise sous conditions : (a) l\'algorithme doit être documenté et auditable par le régulateur, (b) les données ne peuvent pas inclure de critères discriminatoires (religion, ethnie, genre), (c) l\'emprunteur doit être informé des critères utilisés pour sa cotation (principe de transparence algorithmique).'),

  h3('IV.2.2 — Taux d\'intérêt et conditions de crédit'),
  body('Les taux d\'intérêt pratiqués par les EMF/SFD sont soumis aux plafonds réglementaires suivants :'),
  buildTable(
    ['Zone', 'Texte de référence', 'Taux maximum légal', 'Modalités de calcul', 'Sanction'],
    [
      ['UEMOA', 'Loi uniforme UEMOA sur l\'usure', '27% annuel effectif global (TEG)', 'TEG incluant tous les frais et commissions', 'Nullité du contrat de crédit + sanction pénale du dirigeant'],
      ['CEMAC', 'Règlement COBAC R-2017/05 + Lois nationales anti-usure', '33% annuel effectif global (TEG)', 'TEG incluant tous les frais et commissions', 'Nullité du contrat de crédit + sanction pénale + réquisition réglementaire'],
      ['Tous', 'Convention inter-états OHADA', 'Taux débiteurs affichés dans l\'établissement et communiqués à la BCEAO/COBAC', 'Affichage obligatoire des conditions tarifaires', 'Amende administrative + sanction pénale'],
    ],
    { colWidths: [12, 26, 20, 24, 18], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  spacer(),
  alertBox('Le modèle de crédit numérique d\'OPTASIA, caractérisé par des micros-crédits de très court terme (7-30 jours), présente un risque structurel de dépassement des plafonds légaux si les frais de traitement, commissions MNO et intérêts sont agrégés dans le TEG. Une analyse actuarielle préalable est obligatoire.', 'warning'),

  h3('IV.2.3 — Obligations de surendettement et crédit responsable'),
  body('Les Instructions BCEAO 2024 n°026 et les Règlements COBAC R-2023/01 imposent des obligations de crédit responsable spécifiques aux SFD numériques :'),
  numberedItem(1, 'Centrale de risques : L\'EMF/SFD doit consulter la centrale des risques de la BCEAO (pour l\'UEMOA) ou de la COBAC (pour la CEMAC) avant tout octroi de crédit supérieur à 500 000 FCFA. Pour les micro-crédits inférieurs à ce seuil, une consultation est recommandée mais non obligatoire.'),
  numberedItem(2, 'Capacité de remboursement : L\'octroi de crédit doit être précédé d\'une évaluation de la capacité de remboursement du client, même sommaire. L\'algorithme de scoring doit intégrer un indicateur de capacité de remboursement (ratio revenu estimé / charge de crédit).'),
  numberedItem(3, 'Protection des données de crédit : Les données de crédit des clients (historique, scores) ne peuvent pas être partagées avec des tiers (y compris la maison-mère Dubaï) sans consentement explicite. La revente de ces données est interdite.'),
  numberedItem(4, 'Limites de concentration des risques : Un seul client ne peut représenter plus de 25% des fonds propres de l\'EMF/SFD. Cette règle s\'applique à l\'ensemble du portefeuille, y compris les crédits numériques.'),

  spacer(),
  h2('IV.3 — Réglementation applicable à la collecte de dépôts digitaux'),
  body('La collecte de dépôts du public est l\'activité la plus réglementée des EMF/SFD de 2ème catégorie. Dans le contexte numérique d\'OPTASIA, elle recouvre les wallets digitaux, les comptes d\'épargne mobiles, et les dépôts à terme électroniques.'),

  h3('IV.3.1 — Conditions de collecte des dépôts'),
  bulletBold('Plafonds de dépôts par client', 'Les Instructions BCEAO 2024 fixent un plafond de dépôt de 2 000 000 FCFA par client pour les SFD digitaux non-bancaires. Ce plafond vise à prévenir la concurrence déloyale avec les banques et à limiter les risques de liquidité. Pour dépasser ce plafond, l\'EMF/SFD doit obtenir une dérogation spécifique de la BCEAO ou de la COBAC.'),
  bulletBold('Garantie des dépôts', 'Les dépôts des clients doivent être garantis par un fonds de garantie spécifique, distinct des fonds propres réglementaires. Dans la zone UEMOA, ce fonds est géré par la BCEAO. Dans la zone CEMAC, la COBAC impose un dépôt de garantie supplémentaire à la BEAC.'),
  bulletBold('Ségrégation des fonds', 'Les fonds déposés par les clients doivent être ségrégués des fonds propres de l\'EMF/SFD et des fonds de la maison-mère. Cette ségrégation est vérifiée lors des audits annuels du régulateur.'),

  h3('IV.3.2 — Réglementation du wallet numérique'),
  body('Le wallet numérique (portefeuille électronique) est le support principal des dépôts dans le modèle d\'OPTASIA. Sa conformité est encadrée par les textes suivants :'),
  buildTable(
    ['Caractéristique du wallet', 'Exigence UEMOA', 'Exigence CEMAC', 'Sanction de non-conformité'],
    [
      ['KYC du titulaire', 'Vérification d\'identité obligatoire (BCEAO Inst. 2024 n°026) : photo, pièce d\'identité, localisation, numéro de téléphone vérifié', 'Vérification d\'identité renforcée (COBAC R-2023/01) : idem UEMOA + vérification bases de données nationales', 'Suspension du wallet + amende administrative + signalement CENTIF'],
      ['Limite de transaction', 'Plafond mensuel 2M FCFA mouvements (Instruction BCEAO 2024 n°026)', 'Plafond mensuel 3M FCFA mouvements (Règlement BEAC sur paiements électroniques)', 'Gel du wallet + notification BEAC/COBAC'],
      ['Stockage des données', 'Données stockées en UEMOA ou avec certification BCEAO (Instruction n°028/2024)', 'Données stockées dans le pays d\'implantation (Règlement COBAC R-2021/01)', 'Rejet d\'agrément + suspension des activités'],
      ['Continuité de service', 'PCA obligatoire couvrant les wallets (Circulaire BCEAO 001-2020)', 'PCA obligatoire (Règlement COBAC R-2021/01)', 'Réquisition + suspension d\'agrément'],
      ['Protection contre la fraude', 'Système de détection de fraude temps réel obligatoire (Instruction BCEAO n°029/2024)', 'Système de monitoring des transactions obligatoire (COBAC R-2021/01)', 'Responsabilité civile de l\'EMF + signalement CENTIF'],
    ],
    { colWidths: [22, 26, 26, 26], headerBg: '1E3A5F', headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('IV.4 — Scoring alternatif et données téléphoniques : conformité GAFI et protection des données'),
  alertBox(
    'L\'algorithme de scoring alternatif d\'OPTASIA est sa propriété intellectuelle la plus stratégique. Sa conformité réglementaire dans chaque pays est une condition de l\'agrément. Une non-conformité de l\'algorithme (biais discriminatoire détecté, opacité des critères, violation de la protection des données) peut entraîner une suspension immédiate des activités.',
    'critical'
  ),

  h3('IV.4.1 — Exigences de transparence algorithmique'),
  numberedItem(1, 'Documentation exhaustive de l\'algorithme : L\'algorithme de scoring doit être documenté de manière exhaustive (variables d\'entrée, poids, seuils de décision, taux de faux positifs/négatifs). Cette documentation doit être accessible au régulateur sur demande.'),
  numberedItem(2, 'Absence de critères discriminatoires : L\'algorithme ne peut pas utiliser de variables proxy discriminatoires (genre, ethnie, religion, appartenance politique). Une analyse de biais (Fairness Audit) doit être réalisée et jointe au dossier d\'agrément.'),
  numberedItem(3, 'Droit à l\'explication : Tout client dont la demande de crédit est refusée par l\'algorithme a le droit d\'obtenir une explication motivée. Ce droit est garanti par les lois locales de protection des données et les Instructions BCEAO 2024.'),
  numberedItem(4, 'Certification par un tiers : L\'algorithme de scoring doit être certifié par un cabinet d\'audit indépendant ou un laboratoire agréé, attestant de sa conformité aux normes de protection des données et d\'absence de discrimination.'),

  h3('IV.4.2 — Protection des données personnelles des clients'),
  body('Les données personnelles des clients (données téléphoniques, comportement de paiement, localisation, biométrie) sont soumises aux régimes de protection suivants :'),
  buildTable(
    ['Type de données', 'Régime UEMOA', 'Régime CEMAC', 'Base légale du traitement'],
    [
      ['Données téléphoniques (MNO)', 'Loi n°2019-014 du Togo / Loi n°2017-20 du Sénégal + Instruction BCEAO n°028/2024', 'Loi n°2010/012 du Cameroun sur la protection des données', 'Consentement explicite du client + convention MNO-EMF approuvée régulateur'],
      ['Données comportementales', 'Instruction BCEAO n°029/2024 — Scoring alternatif', 'COBAC R-2023/01 Art. 22 — Traçabilité algorithmes', 'Consentement éclairé + finalité limitée au scoring de crédit'],
      ['Données biométriques (KYC)', 'Instruction BCEAO n°026/2024 — Authentification forte', 'COBAC R-2023/01 + lois nationales d\'état civil', 'Nécessité contractuelle + obligation légale KYC'],
      ['Données de transaction', 'Instruction BCEAO n°027/2024 — LBC/FT', 'COBAC R-2018/01 — LBC/FT', 'Obligation légale LBC/FT + consentement clientèle'],
    ],
    { colWidths: [22, 24, 24, 30], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('IV.5 — Interopérabilité et partenariats MNO : contraintes réglementaires'),
  body('Le modèle d\'OPTASIA repose sur des partenariats stratégiques avec les opérateurs de Mobile Money (Orange, MTN, Moov, Airtel). Ces partenariats sont soumis à des contraintes réglementaires spécifiques qui doivent être anticipées dès la phase de négociation des accords.'),

  h3('IV.5.1 — Conditions de validité des partenariats MNO'),
  bulletBold('Déclaration préalable au régulateur', 'Tout partenariat entre un EMF/SFD et un opérateur MNO doit être déclaré au régulateur (BCEAO ou COBAC) avant sa mise en œuvre. Le régulateur dispose d\'un délai de 30 jours pour s\'y opposer. L\'absence d\'opposition vaut autorisation implicite.'),
  bulletBold('Clause de droit d\'audit du régulateur', 'Le contrat de partenariat doit inclure une clause expresse reconnaissant au régulateur un droit d\'audit direct, sur pièces et sur place, sur les données KYC et les transactions traitées par l\'opérateur MNO pour le compte de l\'EMF/SFD.'),
  bulletBold('Ségrégation des données', 'Les données des clients de l\'EMF/SFD traitées par l\'opérateur MNO doivent être ségrégées des données des autres clients de l\'opérateur. L\'opérateur MNO ne peut pas utiliser ces données à ses propres fins commerciales.'),
  bulletBold('Responsabilité solidaire', 'En cas de violation des données clients ou de faille de sécurité sur le canal MNO, l\'EMF/SFD engage sa responsabilité vis-à-vis du régulateur, même si la faille est localisée chez l\'opérateur MNO. La convention de partenariat doit prévoir des clauses de récupération de dommages envers l\'opérateur MNO.'),

  h3('IV.5.2 — Matrice des partenaires MNO par pays et conformité'),
  buildTable(
    ['Pays', 'Opérateurs MNO principaux', 'Service Mobile Money', 'Agrément requis pour partenariat', 'Point de vigilance'],
    [
      ['Togo', 'Togocom (ex-Togocell) + Moov Africa', 'T-Money + Flooz', 'Convention déclarée BCEAO + accord Ministère Numérique', 'Concentration : Togocom détient ~60% du marché Mobile Money'],
      ['Bénin', 'MTN Bénin + Moov Africa', 'MTN Mobile Money + Moov Money', 'Convention déclarée BCEAO + accord ARCEP Bénin', 'Interopérabilité partielle entre MTN et Moov — vérifier compatibilité API'],
      ['Burkina Faso', 'Orange Burkina + Moov Africa', 'Orange Money + Moov Money', 'Convention déclarée BCEAO + accord ARCEP', 'Instabilité réseau dans les zones rurales — impact sur la disponibilité du service'],
      ['Mali', 'Orange Mali + Moov Africa', 'Orange Money + Moov Money', 'Convention déclarée BCEAO + accord AUTOREG', 'Contexte sécuritaire — vérifier la couverture réseau dans les zones cibles'],
      ['Cameroun', 'Orange Cameroun + MTN Cameroun', 'Orange Money + MTN Mobile Money', 'Convention déclarée COBAC + accord ART', 'Bilinguisme FR/EN — documents contractuels en deux langues'],
      ['Gabon', 'Airtel Gabon + Moov Africa', 'Airtel Money + Moov Money', 'Convention déclarée COBAC + accord ARCEP Gabon', 'Marché Mobile Money moins développé — base clients plus restreinte'],
      ['Congo', 'Airtel Congo + MTN Congo', 'Airtel Money + MTN Mobile Money', 'Convention déclarée COBAC + accord ART Congo', 'Infrastructure bancaire limitée — opportunité pour la microfinance digitale'],
    ],
    { colWidths: [10, 20, 16, 28, 26], headerBg: '1A4731', headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('IV.6 — Réglementation de l\'assurance crédit et micro-assurance'),
  body('L\'assurance crédit liée aux prêts numériques est un produit complémentaire stratégique pour OPTASIA. Elle permet de couvrir le risque de défaut et d\'améliorer la rentabilité du portefeuille. Sa commercialisation est soumise au Code CIMA (Conférence Interafricaine Marché Assurances).'),

  h3('IV.6.1 — Conditions de distribution de la micro-assurance'),
  bulletBold('Option 1 — Distribution en nom propre (déconseillée)', 'L\'EMF/SFD obtient un agrément de distributeur d\'assurances auprès de la CIMA dans chaque pays. Cette option est complexe, coûteuse et soumise à des conditions strictes d\'expertise interne en assurance.'),
  bulletBold('Option 2 — Distribution par partenariat (recommandée)', 'L\'EMF/SFD signe une convention de distribution avec un assureur agréé CIMA (NSIA, Allianz Africa, AXA Africa, etc.). L\'assureur conçoit le produit, l\'EMF/SFD le distribue en qualité de courtier ou mandataire d\'assurance. Cette option est plus simple et plus rapide.'),
  bulletBold('Obligations de transparence', 'L\'EMF/SFD distribué doit informer clairement le client de la nature optionnelle ou obligatoire de l\'assurance, du montant de la prime, des garanties couvertes, et des conditions d\'exclusion. Le défaut d\'information constitue une pratique commerciale déloyale.'),

  spacer(),
  h2('IV.7 — Obligations de reporting réglementaire numérique'),
  body('En tant qu\'EMF/SFD de 2ème catégorie opérant via des canaux numériques, OPTASIA est soumis à des obligations de reporting renforcées :'),

  buildTable(
    ['Rapport', 'Contenu', 'Fréquence', 'Destinataire', 'Sanction de défaut'],
    [
      ['Rapport prudentiel mensuel', 'Ratios de solvabilité, liquidité, concentration, PAR 30/PAR 90, réserves obligatoires', 'Mensuelle', 'BCEAO (UEMOA) / COBAC + BEAC (CEMAC)', 'Amende + réquisition + suspension opérations'],
      ['Rapport LBC/FT', 'Déclarations de soupçon, transactions inhabituelles, mise à jour des profils clients à haut risque', 'Mensuelle + ad hoc (déclarations de soupçon)', 'CENTIF / TRACFIN national + BCEAO/COBAC', 'Amende lourde + responsabilité pénale du RLBC'],
      ['Rapport IT/Cybersécurité', 'Incidents de sécurité, violations de données, disponibilité des systèmes, résultats tests PCA', 'Trimestrielle + ad hoc (incidents)', 'BCEAO (UEMOA) / COBAC (CEMAC)', 'Réquisition + audit spécial + suspension'],
      ['Rapport de scoring', 'Performance de l\'algorithme (taux de précision, faux positifs/négatifs, évolutions), Fairness Audit', 'Semestrielle', 'BCEAO (UEMOA) / COBAC (CEMAC)', 'Réquisition + obligation de révision algorithmique'],
      ['Rapport de gouvernance', 'Délibérations CA, composition des comités, évaluation des dirigeants, politique de rémunération', 'Annuelle', 'BCEAO/COBAC + Ministère des Finances', 'Réquisition + avis défavorable au renouvellement'],
    ],
    { colWidths: [18, 28, 12, 22, 20], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  new Paragraph({ children: [], pageBreakBefore: true }),
];



