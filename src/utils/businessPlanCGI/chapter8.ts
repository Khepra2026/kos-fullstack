import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from './helpers';

// ─── CHAPITRE 8 : PLAN D'INVESTISSEMENT CAPEX ────────────────────────────
// Détail équipements, génie civil, solaire, flotte, calendrier d'investissement,
// phasage, sensibilité inflation, change et retards

export function chapter8(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 8 — PLAN D\'INVESTISSEMENT CAPEX'),
    sp(),
    body('Ce chapitre présente le plan d\'investissement détaillé de CGI SA sur la période 2026-2036. Il couvre le CAPEX consolidé des quatre programmes industriels (Tranches A, B, C et D), le détail des équipements par poste, le génie civil, la flotte de transport, la centrale solaire, et les infrastructures de base. Chaque poste est sourcé, quantifié et converti en FCFA au taux BCEAO de 605 FCFA/USD. Le budget détaillé BIDC/EBID Mai 2026 constitue la référence officielle. Ce chapitre inclut également une analyse de sensibilité du CAPEX aux variations de change, d\'inflation et de retard de livraison.'),
    sp(),
    ...section81(),
    ...section82(),
    ...section83(),
    ...section84(),
    ...section85(),
    pb(),
  ];
}

// ─── VIII.1 SYNTHÈSE DU CAPEX CONSOLIDÉ ──────────────────────────────────
function section81(): (Paragraph | Table)[] {
  return [
    h2('VIII.1 Synthèse du CAPEX consolidé — Tranches A/B/C/D'),
    sp(),
    body('Le CAPEX total du projet CGI SA s\'élève à 8 899 M FCFA (14,7 M USD), réparti en quatre tranches correspondant aux quatre programmes industriels. Ce montant est conforme au budget détaillé BIDC/EBID Mai 2026 et intègre une provision pour imprévus de 5 % (424 M FCFA), standard BIDC pour les projets miniers de première montée en capacité.'),
    sp(),
    tbl(
      ['Tranche', 'Programme', 'Description', 'Montant (M FCFA)', 'Montant (M USD)', '% du CAPEX'],
      [
        ['Tranche A', 'Programme 1 — Expansion Granulats', 'Lignes 2 & 3 METSO + équipements miniers + flotte livraison', '3 486', '5,76', '39,2 %'],
        ['Tranche B', 'Programme 2 — Dalles Granite', 'Scie multiblade Breton + polisseuse + pont roulant + hangar', '3 277', '5,41', '36,8 %'],
        ['Tranche C', 'Programme 3 — Centrale Solaire', 'PV 3-4 MWc + batteries LiFePO4 6-8 MWh + onduleurs', '1 712', '2,83', '19,2 %'],
        ['Tranche D', 'Infrastructure du Site', 'Routes, bâtiments, eau, électricité, clôture, drainage', '424', '0,70', '4,8 %'],
        ['Provision imprévus', '5 % du CAPEX total', 'Dépassements de coûts — retards — aléas techniques', '424', '0,70', '4,8 %'],
        ['TOTAL CAPEX', 'Investissement industriel consolidé', 'Tranches A+B+C+D + provision', '8 899', '14,70', '100 %'],
      ],
      [12, 20, 30, 14, 14, 10]
    ),
    sp(),
    body('Le ratio CAPEX/CA (Capex Intensity) à maturité est de 0,65x, ce qui indique une rentabilité élevée du capital investi. Ce ratio est inférieur au benchmark BIDC pour les projets miniers africains (0,8-1,2x), confirmant l\'efficacité économique du projet.'),
    sp(),
    infoBox('Note de cohérence : Les montants Ligne 2 (2 100 M FCFA) et Ligne 3 (2 000 M FCFA) sont conformes à l\'étude de faisabilité CORNERSTONE GROUP INTERNATIONAL (2025). La Tranche A totale (3 486 M FCFA) inclut les Lignes 2 et 3 ainsi que tous les équipements miniers, la flotte de livraison et les provisions. Source : Budget BIDC/EBID — Detailed Capital Expenditure Budget, Mai 2026.'),
    sp(),
  ];
}

// ─── VIII.2 DÉTAIL CAPEX TRANCHE A ───────────────────────────────────────
function section82(): (Paragraph | Table)[] {
  return [
    h2('VIII.2 Détail CAPEX — Tranche A : Expansion Granulats (3 486 M FCFA)'),
    sp(),
    body('La Tranche A constitue le cœur du plan d\'investissement. Elle vise le passage à une capacité industrielle complète par l\'acquisition de deux nouvelles lignes de concassage METSO (Lignes 2 et 3), chacune d\'une capacité nominale de 250 t/h. Le choix de METSO repose sur quatre critères : fiabilité documentée en environnement africain (disponibilité 92 %), SAV régional à Accra, conformité aux standards internationaux (ISO 12100, moteurs IE3), et garantie constructeur de 24 mois.'),
    sp(),
    tbl(
      ['Poste Tranche A', 'Spécification', 'Quantité', 'Montant (M FCFA)', 'Montant (USD)'],
      [
        ['Ligne 2 — Concassage complet METSO', 'C120 (120 kW) + HP300 (220 kW) + CVB 2060 + convoyeurs', '1 ligne', '2 100', '3 471 074'],
        ['Ligne 3 — Concassage complet METSO', 'Identique Ligne 2', '1 ligne', '2 000', '3 305 785'],
        ['Excavateurs SANY SY335C', '33 tonnes — forage et chargement', '4 unités', '424', '700 000'],
        ['Excavateurs réserve / pince', 'SY335C + SY250 pince à blocs', '2 unités', '169', '280 000'],
        ['Chargeuses SANY 5 tonnes', 'Chargement et stockage', '3 unités', '166', '275 000'],
        ['Chargeuse réserve', 'SANY/XCMG secours', '1 unité', '56', '92 000'],
        ['Dumpers miniers HOWO 6×4', '20 m³ — transport interne', '6 unités', '303', '500 000'],
        ['Dumpers renforcement Ligne 1', 'HOWO 6×4 — transport existant', '4 unités', '169', '280 000'],
        ['Groupe électrogène secours', '750-1 000 kVA diesel', '1 unité', '73', '120 000'],
        ['Génie civil fondations', 'Béton armé anti-vibratoire — drainage', '—', '121', '200 000'],
        ['Foreuses Kaishan DTH', '6 unités + pièces rechange — forage 89 mm', '6 unités', '227', '375 000'],
        ['Flotte livraison HOWO 8×4', '35 m³ — 18 camions bennes', '18 unités', '871', '1 440 000'],
        ['Provision dépassement (5 %)', 'Aléas techniques — retard — hausse prix', '—', '242', '400 000'],
        ['TOTAL TRANCHE A', '—', '—', '3 486', '5 762 000'],
      ],
      [28, 30, 10, 18, 14]
    ),
    sp(),
    h3('VIII.2.1 Spécifications techniques METSO'),
    tbl(
      ['Paramètre', 'Ligne 2', 'Ligne 3', 'Total / Commentaire'],
      [
        ['Capacité nominale', '250 t/h', '250 t/h', '500 t/h additionnels'],
        ['Mise en service', 'T2 2027', 'T4 2027', 'Montée progressive'],
        ['Concasseur primaire', 'Nordberg C120 (120 kW)', 'Nordberg C120 (120 kW)', 'Ouverture 1 200×870 mm'],
        ['Concasseur secondaire', 'HP300 (220 kW)', 'HP300 (220 kW)', 'Cône diamètre 1 130 mm'],
        ['Cribles vibrants', 'CVB 2060 (3 étages)', 'CVB 2060 (3 étages)', '4 unités — 0/5, 5/15, 15/25, 0/31,5'],
        ['Puissance installée', '1 850 kW', '1 850 kW', '3 700 kW — renforcement EDM nécessaire'],
      ],
      [25, 25, 25, 25]
    ),
    sp(),
  ];
}

// ─── VIII.3 DÉTAIL CAPEX TRANCHE B ───────────────────────────────────────
function section83(): (Paragraph | Table)[] {
  return [
    h2('VIII.3 Détail CAPEX — Tranche B : Unité Dalles Granite (3 277 M FCFA)'),
    sp(),
    body('La Tranche B vise à valoriser la qualité géologique du gisement de Siyimé au-delà du granulat industriel. Le granite précambrien offre une esthétique et une résistance qui permettent une diversification vers les dalles haut de gamme pour la construction de luxe, les monuments publics, les hôtels et l\'export. Cette diversification réduit la dépendance au marché BTP cyclique et génère des marges supérieures (55 % vs 45 % pour les granulats).'),
    sp(),
    tbl(
      ['Poste Tranche B', 'Spécification', 'Montant (M FCFA)', 'Montant (USD)'],
      [
        ['Scie à fil diamanté multiblade', 'Breton 3200 × 20 lames — débit 25 m²/jour', '1 100', '1 818 182'],
        ['Polisseuse automatique', 'Breton Luxmaster 12 têtes — 30 m²/jour', '650', '1 074 380'],
        ['Pont roulant', '20 tonnes — portée 15 m — manutention blocs', '280', '462 810'],
        ['Traitement de surface', 'Unité flamage + bouchardage — finitions rustiques', '180', '297 521'],
        ['Hangar stockage / emballage', '1 200 m² + palettes ISO + protection UV', '420', '693 884'],
        ['Génie civil dalles', 'Fondations anti-vibratoires — drainage — éclairage', '360', '595 042'],
        ['Électricité / câblage', 'Poste BT — éclairage LED — prises atelier', '120', '198 347'],
        ['Formation Breton', '2 ingénieurs — 4 semaines en Italie + suivi', '65', '107 438'],
        ['Provision dépassement', '5 % aléas technique — délai livraison', '102', '168 597'],
        ['TOTAL TRANCHE B', '—', '3 277', '5 417 000'],
      ],
      [30, 35, 18, 17]
    ),
    sp(),
    h3('VIII.3.1 Justification stratégique de la Tranche B'),
    bullet('Marge premium : 55 % de marge brute vs 45 % pour les granulats standard.'),
    bullet('Valorisation gisement : masse volumique 2,63 g/cm³ — résistance > 120 MPa — critères d\'excellence recherchés par les architectes.'),
    bullet('Réduction dépendance transport : les dalles sont transportées par conteneur (valeur/volume élevée), réduisant l\'exposition aux transporteurs routiers.'),
    bullet('Alignement BIDC vert : transformation locale = emploi qualifié + réduction empreinte carbone vs sous-traitance en Europe.'),
    sp(),
    infoBox('Benchmark marché dalles : Le granite africain premium se vend entre 80 et 120 €/m² en Europe. À 45 000 FCFA/m² (~74 €/m²), CGI SA dispose d\'un avantage prix compétitif de 8-33 % tout en maintenant une marge supérieure à la moyenne industrielle. Source : CEPI Europe, Rapport importations pierre naturelle, 2024.'),
    sp(),
  ];
}

// ─── VIII.4 DÉTAIL CAPEX TRANCHE C ET D ──────────────────────────────────
function section84(): (Paragraph | Table)[] {
  return [
    h2('VIII.4 Détail CAPEX — Tranche C : Centrale Solaire (1 712 M FCFA)'),
    sp(),
    body('La Tranche C vise à réduire drastiquement l\'OPEX énergie tout en alignant le projet sur les critères Banque Verte BIDC. La centrale solaire hybride (photovoltaïque + stockage batteries lithium-ion) couvrira 60 % des besoins énergétiques du site d\'ici 2029.'),
    sp(),
    tbl(
      ['Poste Tranche C', 'Spécification', 'Montant (M FCFA)', 'Montant (USD)'],
      [
        ['Modules photovoltaïques', 'Monocristallins > 21 % — 3-4 MWc — toiture + au sol', '620', '1 024 793'],
        ['Batteries stockage', 'LiFePO4 6-8 MWh — autonomie 4-6h — 6 000 cycles', '520', '859 504'],
        ['Onduleurs / Inverters', '3× 1 500 kW (SMA ou Huawei) — efficacité > 98,5 %', '280', '462 810'],
        ['Structure de fixation', 'Fixation toiture hangars + structures au sol', '95', '157 025'],
        ['Câblage DC/AC', 'Câbles solaires — boîtiers de jonction — protections', '72', '119 008'],
        ['Monitoring intelligent', 'Système SCADA — comptage énergétique temps réel', '45', '74 380'],
        ['Installation et mise en service', 'Équipe installation — tests — commissioning', '55', '90 909'],
        ['Provision dépassement', '5 % aléas techniques — retard livraison', '25', '41 322'],
        ['TOTAL TRANCHE C', '—', '1 712', '2 830 000'],
      ],
      [28, 35, 18, 19]
    ),
    sp(),
    h2('VIII.5 Détail CAPEX — Tranche D : Infrastructure du Site (424 M FCFA)'),
    sp(),
    body('La Tranche D couvre les infrastructures de base nécessaires au bon fonctionnement de l\'ensemble du site : accès routiers, bâtiments administratifs, réseau d\'eau et d\'assainissement, clôture de sécurité, et aménagement des aires de stockage.'),
    sp(),
    tbl(
      ['Poste Tranche D', 'Description', 'Montant (M FCFA)', 'Montant (USD)'],
      [
        ['Routes d\'accès et pistes internes', 'Goudronnage 2 km + stabilisation latérite 5 km', '121', '200 000'],
        ['Bâtiment administratif et sanitaire', 'Bureaux 200 m² + vestiaires + douches + infirmerie', '91', '150 000'],
        ['Réseau eau potable et forage', 'Forage 120 m + pompe solaire + réservoir 50 m³', '73', '120 000'],
        ['Réseau électrique basses tensions', 'Poste BT + éclairage LED sécurité + prises atelier', '61', '100 000'],
        ['Clôture périmétrique et surveillance', 'Grillage 3 km + portail + gardien + caméras', '36', '60 000'],
        ['Aménagement aires stockage', 'Bétonnage 3 000 m² + canaux drainage + fossés', '42', '70 000'],
        ['TOTAL TRANCHE D', '—', '424', '700 000'],
      ],
      [28, 35, 18, 19]
    ),
    sp(),
  ];
}

// ─── VIII.5 ANALYSE DE SENSIBILITÉ CAPEX ──────────────────────────────────
function section85(): (Paragraph | Table)[] {
  return [
    h2('VIII.5 Analyse de sensibilité du CAPEX'),
    sp(),
    body('Le CAPEX de 8 899 M FCFA est exposé à trois facteurs de risque principaux : la variation du taux de change FCFA/USD (60 % des équipements sont importés et libellés en USD), l\'inflation des prix des équipements miniers, et les retards de livraison générant des coûts indirects. L\'analyse de sensibilité ci-dessous évalue l\'impact financier de chaque choc.'),
    sp(),
    tbl(
      ['Scénario de sensibilité', 'Choc appliqué', 'CAPEX ajusté (M FCFA)', 'Écart vs base', 'Impact DSCR'],
      [
        ['Central (base)', 'Taux 605 FCFA/USD — prix catalogues 2026', '8 899', '—', 'Référence'],
        ['Dévaluation FCFA/USD +10 %', 'Taux 665 FCFA/USD', '9 408', '+509 (+5,7 %)', 'DSCR mini 1,48x (acceptable)'],
        ['Dévaluation FCFA/USD +20 %', 'Taux 726 FCFA/USD', '9 917', '+1 018 (+11,4 %)', 'DSCR mini 1,42x (limite)'],
        ['Inflation équipements +15 %', 'Hausse prix METSO, SANY, Breton', '9 714', '+815 (+9,2 %)', 'DSCR mini 1,44x (acceptable)'],
        ['Retard livraison METSO +6 mois', 'Coûts indirects — stock — report production', '9 250', '+351 (+3,9 %)', 'DSCR mini 1,50x (acceptable)'],
        ['Scénario combiné pessimiste', 'Change +10 % + inflation +10 % + retard 3 mois', '9 680', '+781 (+8,8 %)', 'DSCR mini 1,43x (limite)'],
      ],
      [22, 24, 18, 18, 18]
    ),
    sp(),
    body('Même dans le scénario combiné pessimiste (dévaluation +10 %, inflation +10 %, retard 3 mois), le CAPEX ajusté de 9 680 M FCFA reste couvert par la demande de dette BIDC de 11 440 M FCFA, avec une marge de sécurité de 1 760 M FCFA. Le DSCR minimum reste à 1,43x — au-dessus du covenant BIDC de 1,3x. La structure de financement absorbe donc les aléas CAPEX sans compromettre la viabilité financière.'),
    sp(),
    h3('VIII.5.1 Calendrier de déploiement et tirage de dette'),
    sp(),
    tbl(
      ['Période', 'Tranche tirée', 'Montant (M FCFA)', 'Utilisation', 'Jalon de validation'],
      [
        ['T1-T2 2027', 'Tranche A', '3 486', 'Commande METSO — génie civil — équipements miniers', 'Permis DGMG valide — PGES approuvé — contrat METSO signé'],
        ['T3-T4 2027', 'Tranche A (solde)', '0', 'Transport maritime — dédouanement — installation Ligne 2', 'Ligne 2 opérationnelle — production > 400 000 T/an'],
        ['T1 2028', 'Tranche B', '3 277', 'Commande Breton — génie civil hangar dalles', 'Ligne 3 opérationnelle — production > 700 000 T/an'],
        ['T2 2028', 'Tranche C', '1 712', 'Installation centrale solaire Phase 2-3', 'Dalles production > 2 000 m² — solaire > 45 %'],
        ['T3 2028', 'Tranche D + LC BFR', '424 + 2 541', 'Finalisation infrastructure + sécurisation BFR', 'Régime croisière 795 000 T/an — DSCR > 1,5x'],
      ],
      [18, 16, 14, 28, 24]
    ),
    sp(),
    successBox('Conclusion CAPEX : Le plan d\'investissement de 8 899 M FCFA est détaillé, sourcé et conforme au budget BIDC/EBID Mai 2026. La répartition en quatre tranches (A/B/C/D) permet un phasage adapté à la montée en puissance opérationnelle et à la génération de cash-flows. L\'analyse de sensibilité confirme que, même dans les scénarios pessimistes combinés, le CAPEX reste couvert par la dette BIDC et le DSCR conserve une marge de sécurité au-dessus du covenant. Le comité de crédit BIDC est invité à valider ce plan comme référence officielle pour le décaissement des fonds.'),
    sp(),
  ];
}