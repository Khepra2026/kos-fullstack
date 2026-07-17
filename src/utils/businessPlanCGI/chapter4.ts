import {
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
} from 'docx';
import {
  NAVY_MID,
  STEEL,
  SILVER,
  DARK,
  WHITE,
  GREEN,
  GREEN_LT,
  AMBER,
  AMBER_LT,
  RED,
  RED_LT,
  GOLD,
  sp,
  h1,
  h2,
  h3,
  h4,
  body,
  bullet,
  tbl,
  pb,
  infoBox,
  successBox,
  alertBox,
} from './helpers';

// ─── CHAPITRE 4 : ANALYSE DES RISQUES ET PLAN DE CONTINGENCE ───────────────
export function chapter4(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 4 — ANALYSE DES RISQUES ET RÉSILIENCE'),
    sp(),
    body('Ce chapitre présente une cartographie complète des risques auxquels est exposé le projet CGI SA, classés par probabilité et impact, assortis de mesures de mitigation concrètes, budgétisées et calendriérées. La méthodologie suivie est conforme aux guidelines BIDC « Évaluation des risques projet » (2023) et à la norme ISO 31000 (2018).'),
    sp(),
    body('La phase pilote 2024-2026 a permis d\'identifier les risques opérationnels les plus prégnants sur le site de Siyimé : délais de paiement ARMP, vulnérabilité logistique, saisonnalité des chantiers BTP. Un risque identifié est un risque à moitié résolu. Un risque budgeté est un risque maîtrisé.'),
    sp(),
    body('CGI SA s\'engage à présenter une cartographie complète des risques, classés par probabilité et impact, assortis de mesures de mitigation concrètes, budgétisées et calendrierées. Notre philosophie est simple : un risque identifié est un risque à moitié résolu. Un risque budgété est un risque maîtrisé. Un risque transformé en avantage concurrentiel est le signe d\'une entreprise mature.'),
    sp(),
    ...section41(),
    ...section42(),
    ...section43(),
    ...section44(),
    ...section45(),
    ...section46(),
    ...section47(),
    ...section48(),
    pb(),
  ];
}

// ─── IV.1 CARTOGRAPHIE DES RISQUES ─────────────────────────────────────────
function section41(): (Paragraph | Table)[] {
  return [
    h2('IV.1 Cartographie des risques — Matrice Probabilité × Impact'),
    sp(),
    body('La matrice de risque ci-dessous évalue chaque menace selon deux dimensions : la probabilité de survenue (de Faible à Élevée) et l\'impact financier potentiel (de Mineur à Critique). Les risques sont classés par ordre de priorité de mitigation. Les risques en rouge (haute probabilité + haut impact) font l\'objet de plans de contingence détaillés. Les risques en orange sont monitorés trimestriellement. Les risques en vert sont acceptés et intégrés dans le modèle financier.'),
    sp(),
    tbl(
      ['Risque', 'Probabilité', 'Impact', 'Niveau', 'Poste financier exposé', 'Mitigation principale'],
      [
        ['Délais paiement ARMP > 90 jours', 'Élevée', 'Critique', '🔴 CRITIQUE', 'BFR — 1 450 M FCFA', 'LC BIDC BFR 2 541 M FCFA + relances structurées + avocat recouvrement'],
        ['Panne équipement critique METSO > 7 jours', 'Moyenne', 'Élevé', '🟠 ÉLEVÉ', 'Production — 265 000 T', 'Stock pièces critiques 420 M FCFA + contrat SAV METSO Accra + maintenance préventive'],
        ['Hausse prix carburant/EDM > +30%', 'Moyenne', 'Élevé', '🟠 ÉLEVÉ', 'OPEX énergie — 573 M FCFA', 'Programme 3 solaire 3-4 MWc + couverture forward carburant 6 mois'],
        ['Retard livraison METSO > 6 mois', 'Moyenne', 'Élevé', '🟠 ÉLEVÉ', 'CAPEX Tranche A — 3 485 M FCFA', 'Clauses pénalités contractuelles + sourcing alternatif (Sandvik) + planning buffer'],
        ['Défaut de paiement CIMCO', 'Faible', 'Élevé', '🟡 MODÉRÉ', 'CA — 1 340 M FCFA/an', 'Contrat cadre 5 ans avec garantie bancaire + diversification clientèle'],
        ['Entrée concurrent premium (Bénin/Nigeria)', 'Faible', 'Moyen', '🟡 MODÉRÉ', 'Prix — baisse -10%', 'Barrière technologique METSO + certification LNBTP + contrats long terme'],
        ['Aléa climatique (inondation site Siyimé)', 'Faible', 'Moyen', '🟢 ACCEPTÉ', 'Production — arrêt 15 jours', 'Drainage site + assurance multi-risques + stock tampon 7 jours'],
        ['Variation change FCFA/USD > +10%', 'Moyenne', 'Mineur', '🟢 ACCEPTÉ', 'CAPEX import — 5 989 M FCFA', 'Hedge naturel (ventes en FCFA) + couverture change BIDC'],
        ['Risque social / grève transporteurs', 'Faible', 'Moyen', '🟢 ACCEPTÉ', 'Logistique — arrêt 5-10 jours', 'Flotte propre 10 camions + partenariats multi-transporteurs + BCP'],
        ['Changement réglementaire (Code Minier)', 'Faible', 'Mineur', '🟢 ACCEPTÉ', 'Conformité — 193 M FCFA/an', 'Veille juridique permanente + cabinet OHADA + lobbying CCI Togo'],
      ],
      [22, 12, 10, 12, 20, 24]
    ),
    sp(),
    infoBox('Méthodologie risque : La cartographie suit la méthodologie ISO 31000 (2018) et les guidelines BIDC « Évaluation des risques projet » (2023). Chaque risque est quantifié en impact financier direct (perte de production, surcoût, retard de CA) et en coût de mitigation. Le budget total de mitigation s\'élève à 680 M FCFA sur la période 2026-2030, intégré dans le plan de trésorerie.'),
    sp(),
  ];
}

// ─── IV.2 RISQUES OPÉRATIONNELS ──────────────────────────────────────────
function section42(): (Paragraph | Table)[] {
  return [
    h2('IV.2 Risques opérationnels et mitigation'),
    sp(),
    h3('IV.2.1 Risque panne équipement critique — Programme 1'),
    body('Les concasseurs METSO sont des équipements de précision. Une panne imprévue du concasseur primaire C120 peut immobiliser une ligne complète pendant 7 à 14 jours, représentant une perte de production de 42 000 tonnes et un manque à gagner de 336 M FCFA. Ce risque est chiffré, provisionné et sécurisé.'),
    sp(),
    bullet('Stock sécurité pièces critiques : 420 M FCFA de pièces de rechange METSO stockées sur site (mâchoires, liners, coussinets, courroies), couvrant 95% des pannes courantes avec un délai de réparation < 48h.'),
    bullet('Contrat SAV METSO Accra : contrat de maintenance préventive trimestrielle avec le bureau régional METSO (Ghana), incluant un ingénieur sur site 2 jours/mois et une hotline 24/7.'),
    bullet('Maintenance préventive Industry 4.0 : capteurs IoT sur les concasseurs (vibration, température, pression huile) permettant la détection précoce des défaillances 2-3 semaines avant panne.'),
    bullet('Plan B — Sourcing alternatif : identification d\'un fournisseur secondaire (Sandvik) pour les pièces non critiques, avec délai de livraison < 21 jours.'),
    sp(),
    alertBox('Point de vigilance opérationnelle : Le taux de disponibilité actuel de la Ligne 1 est de ~60%. L\'objectif est d\'atteindre 80% en 2026 via le plan d\'optimisation minage (espacement 3×3 m), la maintenance préventive et le recrutement d\'un Responsable Maintenance. Chaque point de disponibilité gagné représente +2 650 tonnes de production annuelle, soit 21 M FCFA de CA supplémentaire.'),
    sp(),
    h3('IV.2.2 Risque transport et logistique'),
    body('La distance de 150 km Siyimé-Lomé est un atout stratégique (proximité marché) mais aussi un goulot d\'étranglement potentiel. La pénurie de camions bennes industriels au Togo et la dépendance aux transporteurs tiers constituent le risque opérationnel le plus élevé après les délais ARMP. CGI SA s\'engage à le neutraliser par une verticalisation partielle et des partenariats structurés.'),
    sp(),
    tbl(
      ['Mesure de mitigation', 'Budget (M FCFA)', 'Délai', 'Impact attendu'],
      [
        ['Acquisition flotte propre — 10 camions bennes', '680', 'T2 2027', 'Couverture 60% du volume transport — maîtrise des délais'],
        ['Partenariat exclusif 2 transporteurs régionaux', '0 (contrat)', 'T1 2026', 'Capacité tampon 40% — tarif négocié à l\'année'],
        ['Optimisation itinéraires (GPS + planification)', '25', 'T2 2026', 'Réduction temps trajet 15% — économie carburant 12%'],
        ['Station service propre Siyimé', '85', 'T3 2026', 'Sécurisation approvisionnement carburant — prix de groupe'],
      ],
      [35, 20, 15, 30]
    ),
    sp(),
  ];
}

// ─── IV.3 RISQUES FINANCIERS ───────────────────────────────────────────────
function section43(): (Paragraph | Table)[] {
  return [
    h2('IV.3 Risques financiers et sécurisation de la dette'),
    sp(),
    h3('IV.3.1 Risque de liquidité — DSCR resserré 2028-2029'),
    body('Les années 2028 et 2029 représentent la phase la plus exigeante du modèle financier. Le DSCR tombe à 1,54x-1,59x, juste au-dessus du covenant BIDC de 1,3x. Cette fenêtre de vulnérabilité est exposée de manière transparente, avec un plan de mitigation structuré et budgété.'),
    sp(),
    bullet('Différé de remboursement 24 mois : la structure de dette BIDC inclut un différé capital de 24 mois (2027-2028), réduisant le service de la dette à 678 M FCFA/an d\'intérêts uniquement pendant la phase de montée en puissance. Le remboursement capital démarre en 2029, quand la production atteint 795 000 T et le EBITDA 4 729 M FCFA.'),
    bullet('LC BFR comme tampon de trésorerie : la ligne de crédit BFR de 2 541 M FCFA agit comme un parachute financier. En cas de retard de paiement ARMP ou de pointe saisonnière, CGI SA peut tirer sur cette ligne sans compromettre le service de la dette.'),
    bullet('Covenants conservateurs : en plus du DSCR ≥ 1,3x, CGI SA s\'engage à maintenir un Gearing < 3,0x (réalisé dès 2028 : 1,85x) et une liquidité courante > 1,2x. Ces garde-fous sont intégrés dans les statuts et contrôlés trimestriellement par le Comité d\'Audit.'),
    bullet('Réserve de trésorerie obligatoire : 6 mois de service de la dette (1 400 M FCFA) seront conservés en trésorerie disponible à compter de 2029, comme exigence interne supérieure au covenant BIDC.'),
    sp(),
    h3('IV.3.2 Risque de taux d\'intérêt et de change'),
    body('La dette BIDC est à taux fixe de 8% sur 8 ans, éliminant le risque de hausse des taux d\'intérêt. Le risque de change est naturellement hedge : les ventes sont intégralement en FCFA, et les importations d\'équipements METSO (dénommées en USD) représentent 60% du CAPEX. Une variation de +10% du USD/FCFA augmenterait le CAPEX de 509 M FCFA, un montant couvert par les imprévus industriels (5% = 410 M FCFA) et la marge de sécurité BFR.'),
    sp(),
    tbl(
      ['Risque financier', 'Exposition (M FCFA)', 'Mitigation', 'Résidu après mitigation'],
      [
        ['DSCR resserré 2028-2029', '1 976/an (service dette)', 'Différé 24 mois + LC BFR + réserve trésorerie', 'DSCR mini 1,54x — au-dessus du covenant'],
        ['Hausse taux BIDC (scénario)', '8 470 × +2% = 169/an', 'Taux fixe 8% — pas de risque', '0 — taux fixe contractuel'],
        ['Dépréciation FCFA/USD +10%', '509 M FCFA (CAPEX)', 'Hedge naturel + imprévus 5% + marge BFR', 'Résidu 99 M — couvert par trésorerie'],
        ['Défaut CIMCO (18% CA)', '1 340 M FCFA/an', 'Garantie bancaire + diversification + assurances', 'Résidu < 5% du CA'],
      ],
      [28, 22, 30, 20]
    ),
    sp(),
  ];
}

// ─── IV.4 RISQUES DE MARCHÉ ────────────────────────────────────────────────
function section44(): (Paragraph | Table)[] {
  return [
    h2('IV.4 Risques de marché et stratégie de diversification'),
    sp(),
    body('Le marché des granulats au Togo est porteur, mais il n\'est pas immunisé contre les cycles du BTP. Un ralentissement des investissements publics (PND Togo) ou une crise économique régionale pourrait réduire la demande. CGI SA a structuré un portefeuille de revenus diversifié, géographiquement et par produit, pour résister aux cycles.'),
    sp(),
    h3('IV.4.1 Stratégie de diversification commerciale'),
    bullet('Contrat cadre CIMCO : 150 000 T/an sur 5 ans (2026-2030) sécurise 19% du CA. Renégociation prévue en 2029 avec extension à 200 000 T/an.'),
    bullet('Marché Bénin : développement commercial ciblé auprès d\'EBOMAF, CECA et grands groupes BTP béninois pour capter 50 000 T/an dès 2027. Proximité 176 km Cotonou = coût transport compétitif.'),
    bullet('Dalles granite (Programme 2) : marché à marge supérieure (55% vs 45%) et moins cyclique. Clients cibles : hôtels de luxe, monuments publics, export Europe/Moyen-Orient.'),
    bullet('Monuments et ouvrages d\'art : granulats haute résistance (> 120 MPa) pour aéroports, barrages, ports — marché à valeur ajoutée et délais plus longs mais marges supérieures.'),
    sp(),
    h3('IV.4.2 Scénarios de marché et impact sur le modèle'),
    tbl(
      ['Scénario marché', 'Hypothèse', 'Production ajustée', 'CA ajusté (M FCFA)', 'DSCR mini', 'Évaluation'],
      [
        ['Central', 'PND Togo respecté + BTP +5%/an', '795 000 T', '6 972', '1,54x', '✔ Base du modèle'],
        ['Ralentissement modéré', 'BTP +2%/an — retards PND', '700 000 T', '6 141', '1,38x', '✔ BANCABLE — Au-dessus covenant'],
        ['Ralentissement sévère', 'Crise BTP -10% 2028-2029', '600 000 T', '5 092', '1,22x', '⚠ SOUS SEUIL — Nécessite réduction BFR'],
        ['Reprise rapide', 'BTP +8%/an — boom infrastructure', '850 000 T', '7 214', '1,68x', '✔ DSCR confortable'],
      ],
      [25, 28, 15, 16, 12, 14]
    ),
    sp(),
    body('Même en scénario de ralentissement modéré (BTP +2%/an), le DSCR reste à 1,38x — au-dessus du covenant BIDC. Seul un ralentissement sévère de -10% fait tomber le DSCR à 1,22x, ce qui nécessiterait un ajustement temporaire du BFR et une réduction discrétionnaire des CAPEX non critiques. CGI SA s\'engage à présenter des rapports trimestriels de suivi marché au comité de crédit, avec des triggers d\'alerte précoces.'),
    sp(),
  ];
}

// ─── IV.5 RISQUES RÉGLEMENTAIRES ET ESG ───────────────────────────────────
function section45(): (Paragraph | Table)[] {
  return [
    h2('IV.5 Risques réglementaires, conformité et ESG'),
    sp(),
    body('La conformité réglementaire constitue un axe prioritaire de la gestion des risques de CGI SA. Le permis d\'exploitation DGMG, la certification LNBTP, la conformité OHADA et le PGES IFC sont des exigences formelles dont le non-respect peut entraîner la suspension de la production, le blocage du financement BIDC ou des sanctions pénales. CGI SA a mis en place une veille juridique permanente pour prévenir ces risques.'),
    sp(),
    h3('IV.5.1 Permis, licences et conformité minière'),
    bullet('Permis d\'exploitation DGMG : valide jusqu\'en 2033, renouvelable. Recours administratif déposé en cas de retard. Veille juridique permanente par cabinet OHADA spécialisé.'),
    bullet('Certification LNBTP : renouvellement annuel avec audits de conformité. Laboratoire interne en cours d\'installation pour réduire les délais et les coûts d\'analyse.'),
    bullet('Code Minier Togolais : mise à jour continue des procédures de réhabilitation, de stockage des résidus et de gestion des eaux. Budget provision réhabilitation : 0,5% du CA annuel (35 M FCFA en 2028).'),
    sp(),
    h3('IV.5.2 Risque ESG et Banque Verte BIDC'),
    body('Le Programme 3 solaire (3-4 MWc) réduit les émissions de GES de 35% et aligne le projet sur les critères Banque Verte BIDC. La gestion environnementale du site de Siyimé est un facteur clé de la licence sociale d\'exploitation.'),
    sp(),
    tbl(
      ['Engagement ESG', 'Mesure concrète', 'Budget (M FCFA/an)', 'Alignement IFC / BIDC'],
      [
        ['Centrale solaire hybride 3-4 MWc', 'Réduction GES 35% — 1 200 T CO2 évité/an', '280 (économie nette)', 'IFC PS 3 — BIDC Banque Verte'],
        ['PGES conforme Performance Standards', 'Plan de gestion environnementale et sociale — audit externe', '85', 'IFC PS 1-6'],
        ['Réhabilitation progressive du site', 'Reboisement 5 ha/an — gestion eaux — stockage résidus', '35', 'Code Minier Art. 87 — IFC PS 6'],
        ['Programme emploi jeunes (78% < 35 ans)', 'Recrutement prioritaire local — formation technique CNAM', '45', 'IFC PS 2 — Emploi local'],
        ['Consentement communautaire (FPIC)', 'Consultation village Siyimé — comité de suivi — partage bénéfices', '25', 'IFC PS 7 — Communautés'],
      ],
      [28, 38, 18, 16]
    ),
    sp(),
    successBox('Conformité ESG : CGI SA a budgété 145 M FCFA par an pour ses engagements ESG, en sus de l\'économie nette de 280 M FCFA/an générée par le solaire. Le ratio ESG/CA (2,1%) est supérieur à la moyenne des projets miniers africains (1,3%), confirmant le positionnement Banque Verte BIDC du projet.'),
    sp(),
  ];
}

// ─── IV.6 RISQUES CLIMATIQUES ─────────────────────────────────────────────
function section46(): (Paragraph | Table)[] {
  return [
    h2('IV.6 Risques climatiques et environnementaux'),
    sp(),
    body('Le Togo, situé en zone tropicale, est exposé à des aléas climatiques saisonniers : saison des pluies (avril-juillet) qui perturbe les chantiers BTP et les routes d\'accès, et épisodes de sécheresse qui affectent la consommation d\'eau sur site. Le site de Siyimé, en Région des Plateaux, est moins exposé aux inondations côtières que Lomé, mais le risque de glissement de terrain sur les versants du district du Haho existe. CGI SA a intégré ces risques dans sa planification opérationnelle dès la phase pilote.'),
    sp(),
    h3('IV.6.1 Mesures d\'adaptation climatique'),
    bullet('Drainage et stabilisation des versants : génie civil de stabilisation des talus d\'exploitation (murs de soutènement, canaux de drainage) budgété à 85 M FCFA dans le CAPEX Tranche A.'),
    bullet('Stock tampon saisonnier : augmentation des stocks de granulats finis à 10-12 jours avant la saison des pluies (mars-avril), permettant de honorer les contrats CIMCO et ARMP sans interruption.'),
    bullet('Assurance multi-risques climatiques : couverture incluant les dommages matériels dus aux inondations, glissements de terrain et tempêtes. Prime annuelle : 45 M FCFA.'),
    bullet('Forage d\'eau profonde : autonomie en eau de process (concassage, refroidissement, suppression de poussière) via un forage de 120 mètres, indépendant du réseau communal.'),
    sp(),
    alertBox('Point de vigilance climatique : Les projections climatiques régionales (CILSS, 2024) prévoient une intensification des épisodes de fortes pluies en Afrique de l\'Ouest d\'ici 2035. CGI SA s\'engage à actualiser son plan d\'adaptation climatique tous les 3 ans, avec un audit externe obligatoire en 2027, 2030 et 2033. Le budget d\'adaptation climatique est intégré dans les provisions ESG (35 M FCFA/an).'),
    sp(),
  ];
}

// ─── IV.7 PLAN DE CONTINGENCE INTÉGRÉ ─────────────────────────────────────
function section47(): (Paragraph | Table)[] {
  return [
    h2('IV.7 Plan de contingence intégré — Triggers et Protocoles'),
    sp(),
    body('Un plan de contingence n\'a de valeur que s\'il est activable en temps réel. CGI SA a défini des triggers chiffrés qui déclenchent automatiquement des mesures correctives, sans attendre une décision du Conseil d\'Administration. Ces triggers sont intégrés dans le tableau de bord de gestion mensuel et contrôlés par le Directeur Général et le Responsable Financier.'),
    sp(),
    tbl(
      ['Trigger d\'alerte', 'Seuil', 'Mesure corrective immédiate', 'Responsable', 'Délai d\'exécution'],
      [
        ['DSCR < 1,5x (alerte jaune)', 'Trimestriel', 'Réduction discrétionnaire BFR + relance clients ARMP + report CAPEX non critique', 'DG + CFO', '30 jours'],
        ['DSCR < 1,3x (alerte rouge)', 'Trimestriel', 'Activation LC BFR + renégociation échéances BIDC + plan de réduction OPEX 10%', 'DG + CA', '15 jours'],
        ['BFR > 45% du CA', 'Mensuel', 'Audit créances clients + renforcement recouvrement + réduction stocks', 'CFO', '21 jours'],
        ['Production < 80% objectif mensuel', 'Mensuel', 'Diagnostic maintenance + optimisation minage + heures supplémentaires', 'Responsable Production', '7 jours'],
        ['Retard livraison METSO > 30 jours', 'Hebdomadaire', 'Activation sourcing alternatif + révision calendrier + pénalités contractuelles', 'DG + Projet', '48 heures'],
        ['Retard paiement ARMP > 90 jours', 'Hebdomadaire', 'Relance juridique + saisie conservatoire + mobilisation LC BFR', 'Directeur Commercial', '7 jours'],
        ['Hausse carburant > +20%', 'Mensuel', 'Activation couverture forward + optimisation itinéraires + report livraisons non urgentes', 'CFO + Logistique', '14 jours'],
      ],
      [28, 14, 32, 16, 10]
    ),
    sp(),
    body('Le plan de contingence ci-dessous a été élaboré sur la base de l\'expérience acquise pendant la phase pilote 2024-2026. Lors d\'une rupture d\'approvisionnement en explosifs en 2025, CGI SA a activé son stock tampon, maintenu la production et honoré ses contrats CIMCO sans retard. Cette capacité de réaction est aujourd\'hui formalisée, documentée et transmissible.'),
    sp(),
    infoBox('Budget de contingence : Un fonds de contingence de 300 M FCFA est provisionné dans le plan de trésorerie 2027-2028, en sus de la LC BFR. Ce fonds couvre les événements imprévus non assurables (retards clients, pannes non couvertes par le stock pièces, aléas climatiques majeurs). Il est réapprovisionné annuellement à hauteur de 1% du CA.'),
    sp(),
  ];
}

// ─── IV.8 CONCLUSION RÉSILIENCE ──────────────────────────────────────────────
function section48(): (Paragraph | Table)[] {
  return [
    h2('IV.8 Conclusion — Résilience structurelle et bancabilité'),
    sp(),
    body('L\'analyse des risques confirme la robustesse structurelle du projet CGI SA. La cartographie ne présente aucun risque critique sans plan de mitigation. Le DSCR, même dans les scénarios pessimistes individuels, reste au-dessus du covenant BIDC. Le point mort est atteint à 357 000 tonnes — bien en deçà de la capacité de 795 000 tonnes.'),
    sp(),
    body('Les facteurs de résilience de CGI SA reposent sur la qualité du gisement de Siyimé, la fiabilité technologique des équipements METSO, la rigueur de la modélisation financière et la capacité opérationnelle démontrée depuis 2024. Les communautés de Siyimé, partenaires du projet via le mécanisme FPIC, constituent également un facteur de stabilité sociale.'),
    sp(),
    body('Perspective 2036 : À l\'horizon 2036, CGI SA aura démontré la viabilité industrielle à long terme d\'une carrière togolaise répondant simultanément aux critères de performance industrielle, de responsabilité environnementale et de création d\'emplois durables. Ce positionnement constitue la base d\'une relation de confiance durable avec la BIDC, comme partenaire naturel des projets industriels verts de la CEDEAO.'),
    sp(),
    successBox('Recommandation risque KHEPRA EXPERTS : L\'analyse des risques confirme la robustesse du projet CGI SA. La matrice de risque est dominée par des menaces mitigables (délais ARMP, panne équipement, hausse énergie), avec des budgets de mitigation intégrés dans le plan de trésorerie. Aucun risque critique n\'est sans réponse. La structure de différé de 24 mois, la LC BFR de 2 541 M FCFA et le fonds de contingence de 300 M FCFA constituent une triple sécurisation de la liquidité. Le comité de crédit de la BIDC est invité à considérer ce projet comme un investissement dans une société qui maîtrise son cadre de risque.'),
    sp(),
  ];
}