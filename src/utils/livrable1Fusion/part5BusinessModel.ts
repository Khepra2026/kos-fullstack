import { Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import {
  TEAL, DARK, SLATE, RED, AMBER,
  h1, h2, h3, body, bullet, bulletBold, alertBox, spacer, divider,
  numberedItem, buildTable, partTitle,
} from './helpers';

export const part5Paragraphs: Paragraph[] = [
  partTitle('V', 'MODÈLE ÉCONOMIQUE CONFORME POUR UNE FINTECH DE CLASSE MONDIALE'),

  h1('PARTIE V — MODÈLE ÉCONOMIQUE CONFORME POUR UNE FINTECH MONDIALE EN MICROFINANCE AFRICAINE'),
  divider(),

  body(
    'Cette partie constitue le Blueprint du modèle économique conforme qu\'OPTASIA doit adopter pour opérer en Afrique francophone dans le respect intégral des normes BCEAO et COBAC. Elle répond à la question fondamentale : comment une Fintech mondiale, structurée à Dubaï et disposant d\'une technologie de scoring avancée, peut-elle générer de la valeur économique tout en respectant les contraintes réglementaires africaines sans compromettre sa rentabilité ?'
  ),

  alertBox(
    'Le modèle économique conforme n\'est pas une contrainte qui réduit la rentabilité. C\'est un avantage concurrentiel durable. Les Fintechs qui ont ignoré la conformité africaine ont toutes été fermées administrativement ou ont dû restructurer à grands frais. La conformité proactive est la clé de la pérennité.',
    'info'
  ),

  h2('V.1 — Principes fondateurs du modèle économique conforme'),

  h3('V.1.1 — Le paradigme "Think African, Build Global"'),
  body('Le modèle économique d\'OPTASIA doit être construit sur le paradigme "Think African, Build Global" : concevoir pour les contraintes africaines (réglementation, connectivité, comportements clients) en utilisant la technologie mondiale (IA, cloud hybride, scoring alternatif).'),
  bulletBold('Principe 1 — Primauté de la souveraineté réglementaire', 'La réglementation locale prime sur les standards globaux d\'OPTASIA. Toute adaptation technologique ou organisationnelle nécessaire pour respecter la réglementation locale est non-négociable.'),
  bulletBold('Principe 2 — Localisation des revenus', 'Les revenus générés dans chaque pays (intérêts, commissions, frais de gestion) doivent être comptabilisés localement dans la filiale, et non dans la holding de Dubaï. Cette localisation est obligatoire pour la conformité fiscale et réglementaire.'),
  bulletBold('Principe 3 — Substance opérationnelle locale', 'Chaque filiale doit avoir une activité opérationnelle réelle, des salariés locaux, et des décisions stratégiques prises sur place. Les filiales coquilles vides sont qualifiées de sociétés écrans par les régulateurs.'),
  bulletBold('Principe 4 — Transparence des prix de transfert', 'Les flux financiers entre la maison-mère (Dubaï), la holding (Cameroun) et les filiales (7 pays) doivent respecter le principe de pleine concurrence OCDE et être documentés dans une politique de prix de transfert certifiée par un Big Four.'),

  spacer(),
  h2('V.2 — Structure du modèle économique cible à 3 niveaux'),
  body('Le modèle économique cible d\'OPTASIA doit s\'articuler sur 3 niveaux financiers interdépendants :'),

  buildTable(
    ['Niveau', 'Entité', 'Sources de revenus', 'Charges principales', 'Flux inter-niveaux autorisés'],
    [
      ['Niveau 1 — Tech Globale', 'OPTASIA SOLUTIONS FZCO (Dubaï)', 'Redevances de licence de l\'algorithme de scoring IA, frais de maintenance plateforme CBS, dividendes de la Holding', 'R&D IA/machine learning, salaires équipe tech, coûts cloud global', 'Redevances Licence → Holding (plafond 5% PNB local des filiales agrégé) + Dividendes de la Holding'],
      ['Niveau 2 — Holding Régionale', 'OPTASIA HOLDING AFRICA (Cameroun)', 'Frais de management (MSA) des filiales, remontée de dividendes des filiales, revenu des services partagés', 'Salaires équipe dirigeante (DG, DAF, DRC, RCC), frais d\'exploitation du siège régional, frais juridiques et de conformité', 'MSA → Filiales (plafond 3% PNB local) + Dividendes des Filiales vers la Holding'],
      ['Niveau 3 — Filiales Locales', 'EMF/SFD de 2ème catégorie (7 pays)', 'Intérêts sur crédits numériques (TEG max 27% UEMOA / 33% CEMAC), commissions sur transactions Mobile Money, frais de dossier, revenus de placement des dépôts collectés, primes d\'assurance (distribution)', 'Coûts opérationnels locaux, salaires, frais IT/SIG local, pertes sur créances (provisions), redevances Holding, frais LBC/FT', 'Intérêts clients → Filiale (comptabilisation locale obligatoire) + Dividendes vers Holding (après approbation CA + respect des ratios prudentiels)'],
    ],
    { colWidths: [14, 16, 28, 24, 18], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('V.3 — Modèle de revenus par filiale : simulation de rentabilité conforme'),

  h3('V.3.1 — Hypothèses de base du modèle'),
  body('Les hypothèses suivantes sont utilisées pour simuler la rentabilité d\'une filiale type OPTASIA (exemple : Togo, 12 mois d\'activité) :'),
  buildTable(
    ['Paramètre', 'Valeur', 'Fondement réglementaire/commercial'],
    [
      ['Capital social minimum', '100 000 000 FCFA libérés', 'Instruction BCEAO n°007-03-2018'],
      ['TEG moyen pratiqué', '22% annuel (UEMOA) / 28% annuel (CEMAC)', 'En dessous des plafonds légaux de 27%/33% — marge de sécurité de 5 points'],
      ['Durée moyenne des crédits', '30 jours (micro-crédit numérique)', 'Modèle Mobile Money — court terme'],
      ['Taux de défaut cible (PAR 30)', '4% du portefeuille actif', 'Benchmark secteur microfinance UEMOA 2024 : 5-7%'],
      ['Commission MNO', '1,5% du montant décaissé', 'Tarification standard Orange Money / MTN Mobile Money'],
      ['Portefeuille actif cible (an 1)', '500 000 000 FCFA', 'Basé sur un capital de 100M × levier 5x (ratio endettement ≤ 300%)'],
      ['Nombre de clients actifs (an 1)', '10 000 clients', 'Segment cible : micro-entrepreneurs urbains et périurbains'],
    ],
    { colWidths: [28, 28, 44], headerBg: '1E3A5F', headerColor: 'FFFFFF' }
  ),
  spacer(),

  h3('V.3.2 — Compte de résultat prévisionnel simplifié — Filiale type (An 1)'),
  buildTable(
    ['Ligne de résultat', 'Montant (M FCFA)', 'Commentaire'],
    [
      ['(+) Produits d\'intérêts nets (TEG 22% × 500M × 30j/365j × 12 rotations)', '180,0', 'Revenu principal — base du PNB'],
      ['(+) Commissions sur transactions Mobile Money', '18,0', 'Commission émission/réception 1,5% × volume traité'],
      ['(+) Frais de dossier', '7,5', 'Frais fixes 750 FCFA × 10 000 clients'],
      ['(+) Produits sur dépôts collectés et placés', '12,0', 'Placement des dépôts clients au taux marché interbancaire (2,5%)'],
      ['(+) Revenus de distribution assurance', '5,0', 'Commission de distribution 10% des primes collectées'],
      ['= PRODUIT NET BANCAIRE (PNB)', '222,5', '100% de référence pour les ratios réglementaires'],
      ['(-) Frais généraux (salaires, loyer, IT, frais juridiques)', '(80,0)', '36% du PNB — ratio norme secteur : < 50%'],
      ['(-) Redevances licence technologique (Dubaï)', '(11,1)', '5% du PNB — plafond réglementaire'],
      ['(-) Frais de management (Holding Cameroun)', '(6,7)', '3% du PNB — plafond réglementaire'],
      ['(-) Dotations aux provisions (PAR 30 4%)', '(20,0)', '4% × 500M portefeuille actif'],
      ['(-) Impôts et taxes locaux (~30%)', '(31,4)', 'IS moyen zone UEMOA/CEMAC'],
      ['= RÉSULTAT NET APRÈS IMPÔTS', '73,3', 'Rentabilité an 1 : 73% du capital social investi'],
      ['(-) Plafond rémunérations dirigeants (8% RN)', '(5,9)', 'Max légal BCEAO/COBAC'],
      ['(-) Dividendes remontés à la Holding (50% RN)', '(33,7)', 'Sous réserve respect ratios prudentiels'],
      ['= RÉSULTAT MIS EN RÉSERVES', '33,7', 'Renforcement des fonds propres — améliore ratio de solvabilité'],
    ],
    { colWidths: [42, 20, 38], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),
  alertBox('Ce compte de résultat est fourni à titre illustratif et pédagogique. Il ne constitue pas une projection financière officielle. Les hypothèses devront être affinées lors de la phase de Business Plan (Livrable 2) en fonction des données de marché spécifiques à chaque pays.', 'info'),

  spacer(),
  h2('V.4 — Stratégie de tarification conforme par segment de clientèle'),
  body('La tarification des produits financiers d\'OPTASIA doit être conçue pour maximiser les revenus dans la limite des plafonds réglementaires (TEG), tout en restant compétitive face aux banques commerciales et aux autres EMF/SFD. La stratégie de tarification doit être différenciée par segment de clientèle et par pays.'),

  buildTable(
    ['Segment client', 'Profil type', 'Montant moyen crédit', 'TEG pratiqué', 'Durée', 'Marge nette estimée'],
    [
      ['Micro-entrepreneur urbain', 'Vendeur de marché, artisan, prestataire de services — revenus irréguliers — 25-45 ans', '50 000 — 200 000 FCFA', '22-24% UEMOA / 28-30% CEMAC', '15-30 jours', '8-12% (net frais MNO et provisions)'],
      ['Employé du secteur informel', 'Agent de sécurité, livreur, domestic worker — revenus réguliers mensuels', '100 000 — 500 000 FCFA', '18-20% UEMOA / 24-26% CEMAC', '30-90 jours', '6-9% (profil moins risqué)'],
      ['Petite entreprise (TPE)', 'Commerce de détail, restauration, transport — chiffre d\'affaires 1-10M FCFA/mois', '500 000 — 2 000 000 FCFA', '15-18% UEMOA / 20-25% CEMAC', '90-180 jours', '4-7% (compétition bancaire plus forte)'],
      ['Agriculteur / éleveur', 'Producteur agricole saisonnier — accès limité aux services bancaires', '50 000 — 300 000 FCFA', '20-22% UEMOA', '60-180 jours (cycle de culture)', '5-8% (risque climatique à provisionner)'],
      ['Client Mobile Money (BNPL)', 'Acheteur en ligne ou en magasin partenaire — paiement différé 7-30 jours', '10 000 — 100 000 FCFA', '18-20% (intégré dans le prix marchand)', '7-30 jours', '10-15% (volumes élevés, risque moindre)'],
    ],
    { colWidths: [18, 20, 16, 16, 14, 16], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('V.5 — Modèle de croissance et déploiement progressif'),
  h3('V.5.1 — Stratégie de déploiement en vagues'),
  body('La stratégie de déploiement d\'OPTASIA doit suivre une logique de vagues progressives, permettant d\'apprendre des succès et des erreurs des pays pilotes avant de répliquer dans les pays de duplication :'),

  buildTable(
    ['Vague', 'Pays', 'Période', 'Objectif', 'KPI de succès', 'Condition de passage à la vague suivante'],
    [
      ['Vague 1 — Pilotes', 'Togo, Bénin (UEMOA) + Cameroun (CEMAC)', 'Mois 1-14', 'Valider le modèle réglementaire, commercial et technologique dans 2 zones différentes', 'Agrément obtenu dans les 12 mois, PAR 30 < 5%, PNB > 150M FCFA dès le 12ème mois, 5 000 clients actifs', 'Agrément obtenu + rentabilité positive + absence de réquisition réglementaire'],
      ['Vague 2 — Duplication', 'Burkina Faso, Mali (UEMOA) + Gabon (CEMAC)', 'Mois 10-22', 'Répliquer le modèle validé avec adaptation aux spécificités locales', 'Délai d\'agrément réduit à 10 mois, démarrage commercial plus rapide (3 mois vs 6 mois pilotes), PAR 30 < 4%', 'Performance des pilotes stable + équipes locales formées'],
      ['Vague 3 — Expansion', 'Congo (CEMAC) + Côte d\'Ivoire, Sénégal (UEMOA extension)', 'Mois 18-30', 'Maximiser la couverture géographique et les économies d\'échelle', '10 pays couverts, 50 000 clients actifs, portefeuille consolidé > 5 Mds FCFA', 'Cash-flow consolidé positif + notation positive COBAC/BCEAO'],
    ],
    { colWidths: [14, 16, 10, 22, 22, 16], headerBg: '1A4731', headerColor: 'FFFFFF' }
  ),
  spacer(),

  h3('V.5.2 — Indicateurs de performance financière cibles (KPI Holding)'),
  buildTable(
    ['KPI', 'Définition', 'Cible An 1', 'Cible An 3', 'Cible An 5', 'Référence'],
    [
      ['Ratio de solvabilité', 'Fonds propres / Actifs pondérés des risques', '≥ 12%', '≥ 14%', '≥ 16%', 'BCEAO/COBAC : minimum 10%'],
      ['Ratio de liquidité', 'Actifs liquides < 30j / Engagements < 30j', '≥ 120%', '≥ 130%', '≥ 140%', 'BCEAO/COBAC : minimum 100%'],
      ['PAR 30 (retards > 30j)', 'Créances impayées > 30j / Portefeuille brut', '≤ 5%', '≤ 3%', '≤ 2%', 'Benchmark secteur UEMOA 2024 : 6-8%'],
      ['Taux de couverture', 'Provisions / Créances douteuses', '≥ 100%', '≥ 120%', '≥ 130%', 'BCEAO/COBAC : minimum 100%'],
      ['Return on Equity (ROE)', 'Résultat net / Fonds propres moyens', '≥ 40%', '≥ 50%', '≥ 60%', 'Benchmark Fintechs microfinance Afrique'],
      ['Cost-to-Income ratio', 'Charges de fonctionnement / PNB', '≤ 45%', '≤ 38%', '≤ 32%', 'Benchmark secteur : 50-60%'],
      ['Croissance du portefeuille', 'Variation annuelle du portefeuille actif', '—', '≥ 80%', '≥ 50%', 'Objectif croissance organique'],
    ],
    { colWidths: [20, 26, 10, 10, 10, 24], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('V.6 — Les 5 avantages concurrentiels durables d\'OPTASIA en Afrique'),
  alertBox(
    'Ces avantages concurrentiels ne sont durables que s\'ils sont ancrés dans un cadre de conformité robuste. Un avantage technologique non conforme est une bombe à retardement réglementaire.',
    'warning'
  ),
  bulletBold('Avantage 1 — Scoring alternatif propriétaire', 'L\'algorithme de scoring alternatif d\'OPTASIA, développé sur des millions de profils de clients téléphoniques en Afrique, est un actif unique. Il permet de prêter à des clients non-bancarisés avec un taux de défaut inférieur au marché. Cet avantage est durable si l\'algorithme est certifié conforme et régulièrement audité.'),
  bulletBold('Avantage 2 — Intégration MNO multilatérale', 'OPTASIA dispose d\'une technologie d\'intégration avec les opérateurs Mobile Money (API Banking) permettant une distribution et un remboursement de crédits en temps réel, sans agence physique. Cet avantage est durable si les conventions MNO sont conformes aux exigences réglementaires locales.'),
  bulletBold('Avantage 3 — Vitesse d\'octroi et d\'activation client', 'Le modèle entièrement digital permet un octroi de crédit en moins de 5 minutes, vs 2-5 jours pour les EMF/SFD traditionnels. Cet avantage est durable si l\'architecture IT locale (hébergement hybride) garantit la disponibilité du service (SLA > 99,5%).'),
  bulletBold('Avantage 4 — Capacité de déploiement multi-pays simultané', 'OPTASIA peut déployer le même CBS dans plusieurs pays simultanément, réduisant les coûts de développement et accélérant le time-to-market. Cet avantage est durable si la stratégie de localisation des données est implémentée par pays.'),
  bulletBold('Avantage 5 — Données comportementales propriétaires en croissance', 'Chaque crédit octroyé enrichit la base de données comportementales d\'OPTASIA, améliorant la précision du scoring et réduisant les taux de défaut. Cet avantage est durable si la politique de protection des données est conforme aux réglementations locales et aux standards GAFI.'),

  spacer(),
  h2('V.7 — Risques du modèle économique et mesures de mitigation'),
  buildTable(
    ['Risque économique', 'Probabilité', 'Impact', 'Mesure de mitigation', 'Référence réglementaire'],
    [
      ['Dépassement des plafonds de TEG', 'Moyenne (30%)', 'Critique (nullité des contrats, sanction pénale)', 'Analyse actuarielle systématique + revue juridique des tarifs avant lancement + monitoring mensuel du TEG effectif', 'Loi anti-usure UEMOA ; Règlement COBAC R-2017/05'],
      ['Détérioration rapide du portefeuille (PAR 30 > 8%)', 'Moyenne (25%)', 'Majeur (capital insuffisant, réquisition prudentielle)', 'Scoring conservateur en phase de lancement + provisionnement dynamique + plafonnement des encours par segment', 'BCEAO Inst. 004-01-2014 ; COBAC R-2017/06'],
      ['Rupture d\'un partenariat MNO stratégique', 'Faible (15%)', 'Majeur (interruption des opérations dans le pays)', 'Multi-opérateurs dans chaque pays + clauses de continuité dans les conventions MNO + solution de backup CBS', 'COBAC R-2021/01 (PCA)'],
      ['Crise de liquidité (dépôts > crédits ou retrait massif)', 'Faible (10%)', 'Critique (intervention du régulateur, gel des activités)', 'Matelas de liquidité (ratio > 130%) + accès à une ligne de refinancement BEAC/BCEAO + diversification des ressources', 'BCEAO Inst. 004-01-2014 ; Règlement COBAC R-2017/05'],
      ['Non-conformité fiscale transfrontalière', 'Moyenne (35%)', 'Majeur (redressement fiscal, impact sur les dividendes)', 'Politique de prix de transfert documentée (Big Four) + audit fiscal annuel dans chaque pays + conseil fiscal local', 'OCDE BEPS ; Code fiscal de chaque pays'],
      ['Évolution réglementaire défavorable', 'Moyenne (30%)', 'Modéré (adaptation nécessaire, délai et coût)', 'Veille réglementaire KHEPRA + architecture modulaire des processus + clauses de révision dans les conventions', 'Tous textes BCEAO/COBAC en cours de révision'],
    ],
    { colWidths: [20, 10, 10, 36, 24], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('V.8 — Plan d\'action stratégique immédiat — Les 30 actions prioritaires'),
  body('Les 30 actions suivantes constituent le plan d\'action immédiat que le CEO d\'OPTASIA doit piloter personnellement dans les 90 premiers jours :'),

  buildTable(
    ['#', 'Action', 'Priorité', 'Délai', 'Responsable'],
    [
      ['1', 'Mandater KHEPRA pour l\'audit complet de la chaîne de propriété (Ownership Chain Audit) de la FZCO jusqu\'aux actionnaires ultimes', 'CRITIQUE', 'J+7', 'CEO OPTASIA'],
      ['2', 'Décider de la constitution de la Holding opérationnelle en Afrique (Cameroun recommandé) et lancer les démarches de création', 'CRITIQUE', 'J+15', 'CEO OPTASIA + KHEPRA Juridique'],
      ['3', 'Lancer le recrutement des DG résidents pour Togo, Bénin (UEMOA) et Cameroun (CEMAC)', 'CRITIQUE', 'J+15', 'DRH OPTASIA + KHEPRA RH'],
      ['4', 'Mandater l\'équipe IT pour concevoir l\'architecture hybride Edge+Cloud local par pays', 'CRITIQUE', 'J+20', 'DSI OPTASIA + Architecte IT KHEPRA'],
      ['5', 'Libérer le capital social de 100M FCFA pour les 3 pays pilotes (300M FCFA total)', 'CRITIQUE', 'J+30', 'DAF OPTASIA + Banques locales agréées'],
      ['6', 'Mandater un Big Four pour la certification de l\'algorithme de scoring (Fairness Audit + conformité BCEAO/COBAC)', 'CRITIQUE', 'J+30', 'CEO OPTASIA + CTO'],
      ['7', 'Signer les conventions de partenariat MNO pilotes (Orange Togo, MTN Cameroun) avec clauses réglementaires conformes', 'HAUTE', 'J+45', 'KHEPRA Juridique + OPTASIA Partnerships'],
      ['8', 'Rédiger la Politique de Prix de Transfert groupe (Big Four) couvrant FZCO, Holding et filiales', 'HAUTE', 'J+45', 'Big Four + DAF OPTASIA'],
      ['9', 'Recruter les PCA indépendants pour les 3 filiales pilotes', 'HAUTE', 'J+45', 'CNR OPTASIA + KHEPRA'],
      ['10', 'Élaborer le dispositif LBC/FT complet (TMS, procédures, formation) pour les 3 pays pilotes', 'HAUTE', 'J+60', 'RLBC OPTASIA + KHEPRA Conformité'],
      ['11', 'Rédiger les statuts des 3 filiales pilotes (conformes OHADA + exigences locales)', 'HAUTE', 'J+60', 'KHEPRA Juridique'],
      ['12', 'Démarrer les réunions de pré-présentation avec les régulateurs pilotes (BCEAO Togo, BCEAO Bénin, COBAC)', 'HAUTE', 'J+60', 'KHEPRA + DG locaux désignés'],
      ['13', 'Rédiger les Business Plans des 3 filiales pilotes (SYSCOHADA, 5 ans)', 'HAUTE', 'J+75', 'KHEPRA Finance'],
      ['14', 'Rédiger les 6 manuels de procédures des filiales pilotes (administratif, RH, opérations, crédit, comptabilité, IT)', 'HAUTE', 'J+75', 'KHEPRA + Experts locaux'],
      ['15', 'Déployer l\'architecture IT hybride dans les 3 pays pilotes (serveurs locaux + CBS)', 'HAUTE', 'J+75', 'DSI OPTASIA + Datacenter locaux'],
      ['16', 'Constituer les Comités de Direction des 3 filiales pilotes (CA, CAC, CRC, CNR)', 'HAUTE', 'J+75', 'KHEPRA Gouvernance'],
      ['17', 'Rédiger les Plans de Continuité d\'Activité (PCA) conformes COBAC R-2021/01 et BCEAO 001-2020', 'HAUTE', 'J+90', 'KHEPRA + DSI OPTASIA'],
      ['18', 'Déposer les dossiers d\'agrément pilotes (Togo, Bénin, Cameroun)', 'HAUTE', 'J+270', 'KHEPRA + Équipes locales'],
      ['19', 'Rédiger la politique de rémunération des dirigeants conforme BCEAO Inst. 008-05-2015 et COBAC Règ. 04/18', 'NORMALE', 'J+60', 'KHEPRA + CNR'],
      ['20', 'Établir un budget opérationnel par filiale pour les 24 premiers mois', 'NORMALE', 'J+60', 'DAF OPTASIA + KHEPRA Finance'],
      ['21', 'Mettre en place le système de reporting mensuel (prudentiel, LBC/FT, IT) à destination des régulateurs', 'NORMALE', 'J+90', 'RLBC + RCI + DAF'],
      ['22', 'Rédiger la Charte de Gouvernance de Groupe', 'NORMALE', 'J+90', 'KHEPRA Gouvernance'],
      ['23', 'Rédiger les conventions inter-compagnies (MSA, Licence, SSA) et les faire approuver par les CA', 'NORMALE', 'J+90', 'KHEPRA Juridique + Avocats OHADA'],
      ['24', 'Former les équipes locales (dirigeants, agents de crédit, responsables de conformité) aux normes BCEAO/COBAC', 'NORMALE', 'J+90', 'KHEPRA Formation'],
      ['25', 'Souscrire une assurance Responsabilité Civile Professionnelle pour chaque filiale', 'NORMALE', 'J+90', 'DAF + Courtier assurance agréé CIMA'],
      ['26', 'Mettre en place le Plan de Succession pour les fonctions clés de chaque filiale', 'NORMALE', 'J+90', 'CNR + KHEPRA'],
      ['27', 'Libérer les capitaux des pays de duplication (Burkina, Mali, Gabon)', 'NORMALE', 'J+120', 'DAF OPTASIA'],
      ['28', 'Déposer les dossiers de duplication Vague 2', 'NORMALE', 'J+360', 'KHEPRA + Équipes locales'],
      ['29', 'Réaliser l\'audit de conformité annuel de chaque filiale pilote (an 1)', 'NORMALE', 'J+365', 'CAC agréés OHADA + KHEPRA Audit'],
      ['30', 'Planifier la Vague 3 d\'expansion (Côte d\'Ivoire, Sénégal, Congo)', 'PLANIFIÉE', 'J+540', 'CEO OPTASIA + KHEPRA'],
    ],
    { colWidths: [6, 42, 10, 10, 32], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(2),

  new Paragraph({
    children: [
      new TextRun({ text: '═══ FIN DU LIVRABLE 1 — ÉDITION INTÉGRÉE COMPLÈTE ═══', bold: true, size: 22, font: 'Calibri', color: TEAL }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 600, after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Référence : KE-OPT-L1INT-2026-001-V1.0  |  Date : 2 juin 2026  |  Classification : CONFIDENTIEL', size: 18, font: 'Calibri', color: SLATE, italic: true }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'KHEPRA EXPERTS SARL U · Lomé, Togo · khepraexperts.com', size: 18, font: 'Calibri', color: SLATE }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
];