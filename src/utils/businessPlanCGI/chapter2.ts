import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GREEN, GREEN_LT, AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from './helpers';

// ─── CHAPITRE 2 : CADRE OPÉRATIONNEL & TECHNIQUE ───────────────────────────
export function chapter2(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 2 — CADRE OPÉRATIONNEL & TECHNIQUE'),
    sp(),
    body('Ce chapitre détaille le cadre opérationnel et technique de CGI SA. Il couvre la localisation stratégique du site de Siyimé, la description complète du gisement (site global réservé de 201 hectares pour un volume de plus de 50 millions de tonnes, dont une première phase de viabilisation de 24 hectares réalisée dans le cadre de la première licence d\'exploitation), le processus de production, les spécifications techniques des trois programmes industriels (Programmes 1, 2 et 3), et l\'architecture de production cible de 795 000 tonnes par an. Chaque programme est dimensionné avec des données techniques sourcées, des CAPEX par tranche (A/B/C/D) et des calendriers de mise en service. Tous les montants sont exprimés en FCFA.'),
    sp(),
    ...section21(),
    ...section22(),
    ...section23(),
    ...section24(),
    ...section25(),
    pb(),
  ];
}

// ─── II.1 LOCALISATION STRATÉGIQUE — SIYIMÉ ──────────────────────────────
function section21(): (Paragraph | Table)[] {
  return [
    h2('II.1 Site de Siyimé — Localisation, Gisement et Processus de Production'),
    sp(),
    h3('II.1.1 Géographie et géologie du gisement'),
    body('Le site d\'exploitation est situé à Siyimé, dans le district du Haho, Région des Plateaux, Togo. Le gisement de type Gneiss/Granite, formation géologique précambrienne, présente une masse volumique de 2,63 g/cm³ — parmi les plus élevées d\'Afrique de l\'Ouest. Le site global réservé par CGI SA couvre une superficie de 201 hectares pour un volume estimé à plus de 50 millions de tonnes (source : étude géologique CORNERSTONE GP 2025 + DGMG Togo). Dans le cadre de la première licence d\'exploitation délivrée par la DGMG, une première phase de viabilisation de 24 hectares a été réalisée, constituant la base industrielle opérationnelle de CGI SA. Sur ce périmètre de 24 ha, le volume exploitable confirmé est de 11,9 millions de mètres cubes sur une profondeur atteignant 60 mètres, soit une durée de vie supérieure à 100 ans au régime de croisière de 795 000 T/an — éliminant tout risque d\'épuisement sur l\'horizon de la dette BIDC. Cette densité confère aux granulats une résistance mécanique exceptionnelle (résistance à la compression > 120 MPa), adaptée aux infrastructures lourdes (routes bitumées, ouvrages d\'art, fondations industrielles). Les 177 hectares résiduels du site global constituent une réserve stratégique considérable pour les décennies à venir, positionnant CGI SA comme le premier acteur minier de long terme au Togo.'),
    sp(),
    tbl(
      ['Paramètre géologique', 'Valeur', 'Signification industrielle'],
      [
        ['Type de roche', 'Gneiss / Granite (Précambrien)', 'Durabilité supérieure — cycle de vie ouvrages allongé'],
        ['Masse volumique', '2,63 g/cm³', 'Premium vs standard africain (2,40-2,50) — certification LNBTP'],
        ['Site global réservé', '201 hectares', 'Source : DGMG Togo — réserve stratégique totale CGI SA'],
        ['Réserves totales estimées (201 ha)', '> 50 millions de tonnes', 'Estimation CORNERSTONE GP 2025 + DGMG — site global 201 ha'],
        ['Phase 1 — Surface viabilisée (licence actuelle)', '24 hectares', 'Première phase de viabilisation réalisée — base industrielle opérationnelle'],
        ['Volume exploitable (Phase 1 — 24 ha)', '11,9 millions de m³', 'Source : Étude géologique CORNERSTONE GP 2025 — gisement certifié'],
        ['Profondeur d\'exploitation', '60 mètres', 'Exploitation à ciel ouvert en gradins — coût minage optimisé'],
        ['Durée de vie Phase 1 (24 ha)', '> 100 ans (au régime 795 000 T/an)', 'Sécurité de long terme — aucun risque d\'épuisement sur la durée de la dette BIDC'],
        ['Réserve stratégique complémentaire', '177 ha supplémentaires disponibles', 'Extensions futures — phases 2 et 3 — négociations DGMG en cours'],
        ['Résistance compression', '> 120 MPa', 'Conforme NF EN 1097-6 — ouvrages lourds et aéroports'],
        ['Indice Los Angeles (LA)', '< 22 %', 'Excellent — Classe A — NF EN 1097-2 — résistance aux chocs'],
        ['Micro-Deval Humide (MDE)', '< 15 %', 'Très faible usure — NF EN 1097-1 — routes et ouvrages d\'art'],
        ['Coefficient Absorption', '< 1,5 %', 'Faible porosité — NF EN 1097-6 — béton haute performance'],
        ['Indice de friabilité', '< 15%', 'Faible production de fines — rendement concassage optimisé'],
      ],
      [30, 25, 45]
    ),
    sp(),
    infoBox('Avantage stratégique majeur — Réserves de 50M+ tonnes : Le site global de 201 hectares confère à CGI SA un avantage concurrentiel unique en Afrique de l\'Ouest. Avec plus de 50 millions de tonnes de réserves estimées, CGI SA dispose d\'une visibilité de plus de 60 ans au régime de croisière de 795 000 T/an. Aucun concurrent n\'est en mesure de présenter un tel niveau de réserves certifiées dans un rayon de 150 km autour de Lomé. Cette position constitue une barrière à l\'entrée naturelle et permanente. Source : CORNERSTONE GROUP INTERNATIONAL — Plan d\'Affaires 2026-2036 + DGMG Togo.'),
    sp(),
    h3('II.1.2 Capacité de production actuelle — Ligne 1 (base de départ)'),
    body('La Ligne 1 METSO, installée lors de la phase pilote 2024-2026, constitue la base opérationnelle de CGI SA avant l\'expansion financée par la BIDC. Sa capacité nominale est de 200 à 250 tonnes par heure (TPH), selon la dureté de la roche et le calibre de sortie. Lors de la phase pilote, un taux de disponibilité de ~60 % a été atteint, portant la production annuelle réelle à ~160 000 T/an. La montée en puissance vers 80 % de disponibilité, objectif du plan d\'optimisation 2026, permettra d\'atteindre 265 000 T/an sur la Ligne 1 avant le démarrage des Lignes 2 et 3.'),
    sp(),
    tbl(
      ['Paramètre Ligne 1 actuelle', 'Valeur', 'Commentaire'],
      [
        ['Capacité nominale', '200-250 TPH', 'Selon dureté roche et calibre sortie — source : CORNERSTONE GP 2025'],
        ['Production pilote réelle 2024-2026', '~160 000 T/an', 'Taux disponibilité 60 % × 8h/jour × 300 jours'],
        ['Production cible 2026 (optimisée)', '265 000 T/an', 'Taux disponibilité 80 % — objectif plan optimisation'],
        ['Équipements installés', 'METSO Nordberg C120 + HP300 + CVB 2060', 'Phase pilote — opérationnels depuis 2024'],
        ['KPI disponibilité actuel', '~60 %', 'Phase démarrage — objectif 80 % en 2026'],
        ['Taux de disponibilité cible', '80 %', 'Standard METSO industrie africaine — benchmark ICMM 2023'],
        ['Consommation énergétique', '~1 200 FCFA/T', 'Source : CORNERSTONE GP 2025 — groupe électrogène + EDM'],
        ['Consommation cible 2028 (avec solaire)', '~720 FCFA/T', 'Réduction 40 % via centrale solaire Programme 3'],
      ],
      [30, 25, 45]
    ),
    sp(),
    body('Le passage du taux de disponibilité de 60 % à 80 % est le premier levier de performance avant tout nouvel investissement. CGI SA a identifié trois axes d\'amélioration issus du plan d\'affaires CORNERSTONE GP : (i) optimisation du plan de minage (espacement 3×3 m, fragmentation contrôlée), (ii) maintenance préventive IoT (capteurs METSO sur vibrations, température et pression d\'huile), et (iii) recrutement d\'un Responsable Maintenance dédié avant T1 2027.'),
    sp(),
    h3('II.1.3 Distances logistiques actualisées'),
    body('La distance logistique de référence pour l\'acheminement vers les marchés cibles est de 150 km via la route nationale bitumée reliant Siyimé à Lomé (RN1). Cette distance, supérieure à l\'estimation initiale de 120 km, intègre le trajet réel via la traversée de la Région Maritime et les contraintes de la zone périurbaine de Lomé. La proximité avec la frontière béninoise (176 km de Cotonou) confère à CGI SA un avantage concurrentiel décisif sur le marché régional CEDEAO.'),
    sp(),
    tbl(
      ['Axe logistique', 'Distance', 'Condition routière', 'Temps estimé', 'Coût transport (FCFA/T)', 'Avantage stratégique'],
      [
        ['Siyimé → Lomé (capitale)', '150 km', 'Route nationale bitumée — traversée Région Maritime', '2h30-3h', '1 500 (flotte propre) / 2 500 (sous-traitance)', 'Approvisionnement capitale — marché public + grands comptes'],
        ['Siyimé → Cotonou (Bénin)', '176 km', 'Route internationale bitumée — poste frontière Hilia-Klouékanmè', '3h-3h30', '1 800 (flotte propre) / 2 800 (sous-traitance)', 'Accès marché béninois — économie 30-50 km vs concurrents nigérians'],
        ['Siyimé → Kpalimé', '< 80 km', 'Route régionale goudronnée', '1h15', '800 (flotte propre)', 'Marché local Plateaux — coût transport minimal'],
        ['Siyimé → Atakpamé', '< 60 km', 'Route régionale goudronnée', '1h', '600 (flotte propre)', 'Marché local Plateaux — livraison express'],
        ['Siyimé → Port autonome Lomé', '155 km', 'Route nationale + zone portuaire', '3h', '1 600 (flotte propre)', 'Export régional CEDEAO — containerisation possible'],
      ],
      [20, 10, 25, 10, 15, 20]
    ),
    sp(),
    infoBox('Source distances : Direction Générale des Mines et de la Géologie (DGMG), Ministère des Mines et des Ressources Énergétiques du Togo — Carte géologique du Togo, 2020. Distance Siyimé-Lomé : 150 km (mesure INSEED Togo, Atlas des transports 2023 — itinéraire réel via Tsévié et Zafi). Poste frontière Bénin : Hilia-Klouékanmè (ouverture 24h pour fret commercial).'),
    sp(),
    alertBox('Point de vigilance logistique : La distance de 150 km Siyimé-Lomé génère un coût de transport significatif (1 500 FCFA/T en flotte propre, 2 500 FCFA/T en sous-traitance). La stratégie de CGI SA combine : (i) flotte propre de 18 camions bennes pour contrôler 70% du volume ; (ii) partenariats logistiques avec transporteurs régionaux pour les pointes de demande ; (iii) développement du marché local Plateaux (Kpalimé, Atakpamé) où le coût transport est marginal.'),
    sp(),
  ];
}

// ─── II.2 PROGRAMME 1 — EXPANSION GRANULATS (TRANCHE A) ────────────────────
function section22(): (Paragraph | Table)[] {
  return [
    h2('II.2 Programme 1 — Expansion Granulats (Tranche A : 3 486 M FCFA)'),
    sp(),
    body('Le Programme 1 constitue le cœur du plan d\'investissement 2026–2036 et représente la Tranche A du financement BIDC (3 486 M FCFA — 5 762 000 USD). Il vise le passage à une capacité industrielle complète par l\'acquisition de deux nouvelles lignes de concassage (Lignes 2 et 3), chacune d\'une capacité nominale de 250 t/h. Conformément à l\'étude de faisabilité CORNERSTONE GROUP INTERNATIONAL, l\'investissement alloué à la Ligne 2 s\'élève à 2 100 M FCFA et celui de la Ligne 3 à 2 000 M FCFA, incluant équipements de concassage METSO, cribles, convoyeurs, génie civil, électricité et mise en service.'),
    sp(),
    body('Le choix de METSO repose sur quatre critères techniques et économiques : (i) la fiabilité documentée des équipements en environnement africain (ICMM benchmark 2023 — disponibilité moyenne 92%) ; (ii) la disponibilité du service après-vente et des pièces de rechange en Afrique de l\'Ouest (bureau METSO Accra, Ghana — délai livraison pièces 7-14 jours) ; (iii) la conformité aux standards internationaux de sécurité (ISO 12100) et d\'efficacité énergétique (IE3 motors) ; (iv) la garantie constructeur de 24 mois avec extension possible à 36 mois via contrat de maintenance. Ce choix garantit la continuité de la production et la sécurité des opérateurs sur le long terme.'),
    sp(),
    h3('II.2.1 Spécifications techniques des Lignes 2 et 3'),
    sp(),
    tbl(
      ['Paramètre Programme 1', 'Ligne 2', 'Ligne 3', 'Total / Commentaire'],
      [
        ['CAPEX total ligne', '2 100 M FCFA', '2 000 M FCFA', '4 100 M FCFA — conforme étude faisabilité Cornerstone'],
        ['Capacité nominale', '250 t/h', '250 t/h', '500 t/h additionnels'],
        ['Mise en service prévue', 'T2 2027', 'T4 2027', 'Montée en puissance progressive'],
        ['Marque équipements', 'METSO exclusivement', 'METSO exclusivement', 'Standard unique = maintenance simplifiée'],
        ['Concasseur primaire', 'METSO Nordberg C120 (120 kW)', 'METSO Nordberg C120 (120 kW)', '2 unités — Ouverture 1 200×870 mm'],
        ['Concasseur secondaire', 'METSO HP300 (220 kW)', 'METSO HP300 (220 kW)', '2 unités — Cône diamètre 1 130 mm'],
        ['Cribles vibrants', 'METSO CVB 2060 (3 étages)', 'METSO CVB 2060 (3 étages)', '4 unités — Séparation 0/5, 5/15, 15/25, 0/31,5'],
        ['Alimentateur vibrant', 'METSO VF 561-2V (2×5,5 kW)', 'METSO VF 561-2V (2×5,5 kW)', '2 unités — Débit régulé 250-400 t/h'],
        ['Convoyeurs à bande', 'METSO CV 1000×30 m (4 unités/ligne)', 'METSO CV 1000×30 m (4 unités/ligne)', '8 convoyeurs — Vitesse 2,5 m/s'],
        ['Puissance totale installée', '1 850 kW', '1 850 kW', '3 700 kW — Nécessite renforcement EDM'],
      ],
      [25, 25, 25, 25]
    ),
    sp(),
    h3('II.2.2 CAPEX détaillé — Tranche A (3 486 M FCFA)'),
    sp(),
    body('Le budget détaillé de la Tranche A est conforme au devis BIDC/EBID « Detailed Capital Expenditure Budget » (Mai 2026). Chaque poste est sourcé, quantifié et converti en FCFA au taux BCEAO de 605 FCFA/USD.'),
    sp(),
    tbl(
      ['Poste d\'investissement', 'Montant (M FCFA)', 'Montant (USD)', 'Commentaire'],
      [
        ['Ligne 2 — Concassage complet (METSO)', '2 100', '3 471 074', 'Concasseur C120, HP300, cribles, convoyeurs, génie civil, électricité — conforme étude faisabilité Cornerstone'],
        ['Ligne 3 — Concassage complet (METSO)', '2 000', '3 305 785', 'Idem Ligne 2 — conforme étude faisabilité Cornerstone'],
        ['SANY excavators ×4 (SY335C, 33-ton)', '424', '700 000', 'Nouvelles lignes — forage et chargement'],
        ['SANY excavators ×2 (SY335C réserve + SY250 pince)', '169', '280 000', 'Réserve opérationnelle + manutention blocs'],
        ['SANY loaders ×3 (5-ton wheel loader)', '166', '275 000', 'Nouvelles lignes — chargement et stockage'],
        ['SANY/XCMG loader ×1 (réserve suppl.)', '56', '92 000', 'Chargeuse de secours'],
        ['Mining dump trucks ×6 (HOWO 6×4, 20m³)', '303', '500 000', 'Nouvelle ligne — transport minier'],
        ['Mining dump trucks ×4 (HOWO 6×4, transport existant)', '169', '280 000', 'Transport ligne existante — renforcement'],
        ['Generator ×1 (750-1000 kVA diesel)', '73', '120 000', 'Groupe électrogène de secours'],
        ['Civil construction works (fondations, plateformes)', '121', '200 000', 'Fondations anti-vibratoires — béton armé — drainage'],
        ['Kaishan DTH drilling rigs ×6 + pièces rechange', '227', '375 000', 'Forage minier — 6 unités complètes'],
        ['Delivery fleet : 18× HOWO 8×4 35m³ bennes', '871', '1 440 000', 'Flotte livraison — ~80K USD rendu par unité'],
        ['Cost overrun buffer (provision)', '242', '400 000', 'Provision pour dépassement de coûts — 5% du CAPEX'],
        ['TRANCHE A TOTAL', '3 486', '5 762 000', 'Conforme budget BIDC/EBID Mai 2026'],
      ],
      [32, 18, 16, 34]
    ),
    sp(),
    successBox('Production cible Programme 1 : 795 000 T/an dès 2028 (3 lignes actives — Ligne 1 optimisée + Lignes 2 et 3). La capacité théorique totale est de 750 t/h × 8h/jour × 300 jours = 1 800 000 T/an. Le régime de croisière retenu (795 000 T/an) intègre un taux de disponibilité réaliste de 80% et un taux de réglage de 65%, conformes aux benchmarks ICMM 2023 pour les carrières africaines.'),
    sp(),
  ];
}

// ─── II.3 PROGRAMME 2 — UNITÉ DE DALLES DE GRANITE (TRANCHE B) ────────────
function section23(): (Paragraph | Table)[] {
  return [
    h2('II.3 Programme 2 — Unité de Dalles de Granite Haut de Gamme (Tranche B : 3 277 M FCFA)'),
    sp(),
    body('Le Programme 2 vise à valoriser la qualité géologique du gisement de Siyimé au-delà du granulat industriel. Le gisement de granite précambrien offre une esthétique et une résistance qui permettent une diversification vers les dalles haut de gamme pour la construction de luxe, les monuments publics, les hôtels et l\'export vers l\'Europe et le Moyen-Orient. Ce programme génère des marges supérieures à celles des granulats standard, tout en réduisant la dépendance au transport routier.'),
    sp(),
    body('Le CAPEX de la Tranche B est de 3 277 M FCFA (5 417 000 USD), conforme au budget détaillé BIDC/EBID. Il inclut : une scie à fil diamanté multiblade, une polisseuse automatique à 12 têtes, un pont roulant de 20 tonnes, une infrastructure de stockage et d\'emballage sous palette, et une unité de traitement de surface (flamage, bouchardage). La production prévisionnelle est de 15 000 m² de dalles par an à partir de 2028, avec un prix moyen de vente de 45 000 FCFA/m² (départ site).'),
    sp(),
    h3('II.3.1 Spécifications techniques de l\'unité dalles'),
    sp(),
    tbl(
      ['Paramètre Programme 2', 'Valeur', 'Commentaire technique'],
      [
        ['CAPEX total Tranche B', '3 277 M FCFA', '5 417 000 USD — conforme budget BIDC/EBID Mai 2026'],
        ['Scie à fil diamanté multiblade', 'Breton 3200 × 20 lames', 'Débit 25 m²/jour — épaisseur 2-3 cm — précision ±1 mm'],
        ['Polisseuse automatique', 'Breton Luxmaster 12 têtes', 'Finition mirror/polie/satinée — capacité 30 m²/jour'],
        ['Pont roulant', '20 tonnes — portée 15 m', 'Manutention blocs 8-15 tonnes — sécurité ISO 12100'],
        ['Traitement de surface', 'Unité flamage + bouchardage', 'Finitions rustiques pour extérieur et piscine'],
        ['Stockage / emballage', 'Hangar 1 200 m² + palettes ISO', 'Conditionnement export — protection UV et humidité'],
        ['Production annuelle cible', '15 000 m²/an', 'À partir de T2 2028 — montée progressive T1-T2 2028'],
        ['Prix moyen de vente', '45 000 FCFA/m²', 'Départ site — granite premium — benchmark Europe : 80-120 €/m²'],
        ['Chiffre d\'affaires annuel', '675 M FCFA', 'À maturité (2029+) — prix stable — contrats cadre monuments'],
        ['Marge brute estimée', '55%', 'Premium vs granulats (marge ~45%) — valeur ajoutée transformation'],
        ['Marchés cibles', 'Togo, Bénin, CEDEAO, Europe, Moyen-Orient', 'Construction luxe, monuments publics, hôtels 5*, export'],
      ],
      [30, 25, 45]
    ),
    sp(),
    h3('II.3.2 Justification stratégique de la Tranche B'),
    bullet('Différenciation premium : Les dalles granite à 45 000 FCFA/m² génèrent une marge brute de 55% vs 45% pour les granulats standard. Cette diversification réduit la dépendance au marché BTP cyclique.'),
    bullet('Valorisation du gisement : La masse volumique 2,63 g/cm³ et la résistance > 120 MPa sont des critères d\'excellence recherchés par les architectes et les marchés export. Aucun autre gisement togolais ne combine ces deux paramètres.'),
    bullet('Réduction dépendance transport : Les dalles sont transportées par conteneur (valeur/volume élevée), réduisant l\'exposition au pouvoir de négociation des transporteurs routiers identifié dans l\'analyse Porter.'),
    bullet('Alignement BIDC vert : La transformation locale (sous-traitance du polissage en Europe évitée) réduit l\'empreinte carbone et crée de l\'emploi qualifié local — critère Banque Verte BIDC.'),
    sp(),
    infoBox('Benchmark marché dalles : Le granite africain premium (Togo, Cameroun, Madagascar) se vend entre 80 et 120 €/m² en Europe (départ port). À 45 000 FCFA/m² (soit ~74 €/m² au taux de change actuel), CGI SA dispose d\'un avantage prix compétitif de 8-33% tout en maintenant une marge supérieure à la moyenne industrielle. Source : CEPI (European Ceramic Industry Association), Rapport sur les importations de pierre naturelle, 2024.'),
    sp(),
  ];
}

// ─── II.4 PROGRAMME 3 — CENTRALE SOLAIRE 3-4 MWc (TRANCHE C) ───────────────
function section24(): (Paragraph | Table)[] {
  return [
    h2('II.4 Programme 3 — Centrale Solaire Hybride 3-4 MWc (Tranche C : 1 712 M FCFA)'),
    sp(),
    body('Le Programme 3 vise à réduire drastiquement l\'OPEX énergie tout en alignant le projet sur les critères Banque Verte BIDC. En installant une centrale solaire hybride (photovoltaïque + stockage batteries lithium-ion) sur le site de Siyimé, CGI SA couvrira 60% des besoins énergétiques du site d\'ici 2029, réduisant la dépendance aux groupes électrogènes diesel et aux achats d\'électricité EDM (CEET au Togo).'),
    sp(),
    body('Le CAPEX de la Tranche C est de 1 712 M FCFA (2 830 000 USD), conforme au budget détaillé BIDC/EBID. L\'installation de 3-4 MWc photovoltaïque avec stockage lithium-ion de 6-8 MWh générera une économie annuelle prévisionnelle sur les coûts énergétiques de 280 millions FCFA, soit un retour sur investissement de 3,2 ans. Ce programme renforce fortement le profil ESG du projet, aligné avec les engagements climatiques de la BIDC (Critères Banque Verte) et les Performance Standards IFC (PS 3 — Efficacité des ressources et pollution prevention).'),
    sp(),
    h3('II.4.1 Spécifications techniques de la centrale solaire'),
    sp(),
    tbl(
      ['Paramètre Programme 3', 'Valeur', 'Commentaire technique'],
      [
        ['CAPEX total Tranche C', '1 712 M FCFA', '2 830 000 USD — conforme budget BIDC/EBID Mai 2026'],
        ['Puissance photovoltaïque', '3-4 MWc', 'Modules monocristallins haute efficacité (> 21%) — toiture + au sol'],
        ['Stockage batteries', '6-8 MWh (LiFePO4)', 'Autonomie 4-6h à pleine charge — durée de vie 15 ans (6 000 cycles)'],
        ['Onduleurs / Inverters', '3× 1 500 kW (SMA ou Huawei)', 'Efficacité conversion > 98,5% — monitoring intelligent'],
        ['Couverture besoins site', '60% d\'ici 2029', 'Progressive : 25% 2027 → 45% 2028 → 60% 2029'],
        ['Puissance totale site', '5 500 kW (Lignes 1+2+3 + dalles + auxiliaires)', 'Pic consommation 4 200 kW — solaire couvre 60% en moyenne'],
        ['Économie annuelle OPEX', '280 M FCFA', 'Réduction carburant groupe électrogène + achat EDM'],
        ['Retour sur investissement', '3,2 ans', 'Calculé sur économie annuelle actualisée — sans subside'],
        ['Réduction émissions GES', '-35% d\'ici 2029', 'Équivalent CO2 évité : ~1 200 T/an — Alignement IFC PS 3'],
        ['Alignement BIDC Banque Verte', 'Conforme — Priorité', 'BIDC : 30% du portefeuille nouveaux projets = vert d\'ici 2027'],
      ],
      [30, 25, 45]
    ),
    sp(),
    h3('II.4.2 Justification stratégique de la Tranche C'),
    bullet('Réduction OPEX structurelle : L\'énergie représente 15% des coûts opérationnels (1 200 FCFA/T). La centrale solaire réduit ce poste à 720 FCFA/T, soit une économie de 480 FCFA/T × 795 000 T = 382 M FCFA/an à maturité.'),
    bullet('Autonomie énergétique : Le Togo dépend à 65% de l\'importation d\'électricité (CEET/Benin Electricity Community). L\'autoconsommation solaire immunise CGI SA contre les hausses tarifaires et les coupures EDM.'),
    bullet('Critères Banque Verte BIDC : La BIDC a annoncé que 30% de son portefeuille de nouveaux projets d\'ici 2027 doit répondre aux critères « Banque Verte » (énergies renouvelables, efficacité énergétique, réduction GES). Le Programme 3 positionne CGI SA dans cette catégorie prioritaire, en faisant de nous un partenaire naturel pour la Banque.'),
    bullet('Valorisation patrimoniale : L\'installation PV reste un actif productif après remboursement de la dette (durée de vie 25 ans), générant des cash-flows positifs sur 15 années supplémentaires.'),
    sp(),
  ];
}

// ─── II.5 TRANCHE D — INFRASTRUCTURE DU SITE & RÉCAPITULATIF ─────────────
function section25(): (Paragraph | Table)[] {
  return [
    h2('II.5 Tranche D — Infrastructure du Site (424 M FCFA) et Synthèse du CAPEX'),
    sp(),
    body('La Tranche D, issue du budget détaillé BIDC/EBID, couvre les infrastructures de base nécessaires au bon fonctionnement de l\'ensemble du site de Siyimé : accès routiers, bâtiments administratifs, réseau d\'eau et d\'assainissement, clôture de sécurité, et aménagement des aires de stockage. Cette tranche, bien que parfois sous-estimée dans les études de faisabilité, est essentielle à la sécurité, à la productivité et à la conformité réglementaire.'),
    sp(),
    tbl(
      ['Poste Tranche D', 'Montant (M FCFA)', 'Montant (USD)', 'Commentaire'],
      [
        ['Routes d\'accès et pistes internes', '121', '200 000', 'Goudronnage 2 km + stabilisation latérite 5 km'],
        ['Bâtiment administratif et sanitaire', '91', '150 000', 'Bureaux, vestiaires, douches, infirmerie — 400 m²'],
        ['Réseau eau potable et forage', '73', '120 000', 'Forage 120 m + pompe solaire + réservoir 50 m³'],
        ['Réseau électrique basses tensions', '61', '100 000', 'Poste BT, éclairage LED sécurité, prises atelier'],
        ['Clôture périmétrique et surveillance', '36', '60 000', 'Clôture grillage 3 km + portail + gardien + caméras'],
        ['Aménagement aires stockage et drainage', '42', '70 000', 'Bétonnage 3 000 m² + canaux de drainage + fossés'],
        ['TRANCHE D TOTAL', '424', '700 000', 'Conforme budget BIDC/EBID Mai 2026'],
      ],
      [32, 18, 16, 34]
    ),
    sp(),
    h3('II.5.1 Synthèse du CAPEX consolidé — Toutes tranches en FCFA'),
    sp(),
    body('Le tableau ci-dessous présente le CAPEX total du projet CGI SA, converti intégralement en FCFA au taux BCEAO de 605 FCFA/USD. Le budget détaillé BIDC/EBID constitue la référence officielle pour chaque poste.'),
    sp(),
    tbl(
      ['Tranche', 'Description', 'Montant (M FCFA)', 'Montant (USD)', '% du CAPEX'],
      [
        ['Tranche A', 'Expansion Granulats — Lignes 2 & 3 + équipements miniers + flotte livraison', '3 486', '5 762 000', '39,2%'],
        ['Tranche B', 'Unité Dalles Granite — Scie, polisseuse, pont roulant, hangar', '3 277', '5 417 000', '36,8%'],
        ['Tranche C', 'Centrale Solaire PV 3-4 MWc + batteries LiFePO4 6-8 MWh', '1 712', '2 830 000', '19,2%'],
        ['Tranche D', 'Infrastructure du Site — Routes, bâtiments, eau, électricité, clôture', '424', '700 000', '4,8%'],
        ['TOTAL CAPEX (Tranches A+B+C+D)', 'Investissement industriel consolidé', '8 899', '14 709 000', '100%'],
        ['Phase 2 Options', 'Ligne Dalles 2 + BESS (batteries stockage)', '2 118 — 3 025', '3 500 000 — 5 000 000', '—'],
        ['GRAND TOTAL (incl. Phase 2)', 'Budget global du projet CGI SA 2026-2036', '11 017 — 11 924', '18 209 000 — 19 709 000', '—'],
      ],
      [12, 38, 16, 16, 18]
    ),
    sp(),
    h3('II.5.2 Calendrier de déploiement des quatre programmes'),
    sp(),
    tbl(
      ['Période', 'Programme 1 (Tranche A)', 'Programme 2 (Tranche B)', 'Programme 3 (Tranche C)', 'Tranche D (Infrastructure)', 'Production cumulée'],
      [
        ['T1-T2 2026', 'Commande METSO + génie civil', 'Études techniques dalles', 'Études solaires + appel d\'offres', 'Routes d\'accès + forage', '265 000 T (Ligne 1 optimisée)'],
        ['T3-T4 2026', 'Transport maritime + dédouanement', 'Commande équipements dalles', 'Installation poste PV phase 1 (1,5 MWc)', 'Bâtiments + clôture', '300 000 T'],
        ['T1-T2 2027', 'Installation Ligne 2 — mise en service', 'Génie civil hangar dalles', 'Extension PV phase 2 (+1,5 MWc)', 'Réseaux eau/électricité', '530 000 T (Lignes 1+2)'],
        ['T3-T4 2027', 'Installation Ligne 3 — mise en service', 'Installation scie + polisseuse', 'Batteries 4 MWh + intégration hybride', 'Aires stockage + drainage', '795 000 T (3 lignes)'],
        ['T1-T2 2028', 'Optimisation régime croisière', 'Mise en service dalles — 5 000 m²', 'Extension PV phase 3 (+1 MWc) + batteries 8 MWh', 'Aménagement final', '795 000 T + 5 000 m² dalles'],
        ['2029+', 'Régime croisière 795 000 T/an', 'Maturité 15 000 m²/an', 'Couverture 60% — maintenance préventive', 'Maintenance infrastructure', '795 000 T + 15 000 m² dalles'],
      ],
      [15, 22, 22, 22, 22, 17]
    ),
    sp(),
    h3('II.5.3 Phase 2 — Options de développement futur'),
    body('Le budget BIDC/EBID prévoit des options Phase 2 pour permettre à CGI SA d\'adapter son expansion aux conditions de marché post-2028. Ces options ne sont pas incluses dans la demande de financement initiale mais sont documentées pour démontrer la scalabilité du projet.'),
    sp(),
    bullet('Ligne Dalles 2 : Extension de l\'unité de dalles avec une seconde scie multiblade et polisseuse pour porter la capacité à 30 000 m²/an. CAPEX estimé : 1 210 M FCFA (2 000 000 USD).'),
    bullet('BESS (Battery Energy Storage System) : Extension du stockage batteries à 12-16 MWh pour couvrir 80% des besoins énergétiques du site et permettre l\'injection sur le réseau EDM en heures creuses. CAPEX estimé : 908-1 815 M FCFA (1 500 000 — 3 000 000 USD).'),
    bullet('Concassage tertiaire : Ajout d\'une unité de concassage tertiaire VSI pour produire du sable manufacturé 0/4 mm destiné au béton de très haute performance et au marché de la céramique. CAPEX estimé : 605 M FCFA (1 000 000 USD).'),
    sp(),
    h2('II.6 Vision de développement stratégique — Horizon 2036'),
    sp(),
    body('\u00c0 l\'horizon 2036, CGI SA envisage de consolider et d\'\u00e9tendre son positionnement de producteur industriel de r\u00e9f\u00e9rence en Afrique de l\'Ouest. Cette vision s\'appuie sur la valorisation maximale du gisement de Siyim\u00e9 (201 hectares r\u00e9serv\u00e9s, plus de 50 millions de tonnes de r\u00e9serves) et sur la diversification des gammes de produits et des march\u00e9s. Elle est conditionn\u00e9e au succ\u00e8s du financement BIDC et \u00e0 la g\u00e9n\u00e9ration de cash-flows op\u00e9rationnels suffisants pour financer la Phase 2 sur fonds propres. Trois axes de d\u00e9veloppement sont identifi\u00e9s :'),
    sp(),
    tbl(
      ['Axe de d\u00e9veloppement', 'Description', 'Investissement estim\u00e9 (M FCFA)', 'Horizon', 'Impact strat\u00e9gique'],
      [
        ['Logistique int\u00e9gr\u00e9e et expansion flotte', 'Extension de la flotte \u00e0 35 camions bennes + plateforme logistique r\u00e9gionale Siyim\u00e9 \u2014 entrep\u00f4t 5 000 m2 \u2014 services livraison programm\u00e9e et transport multimodal Port de Lom\u00e9 \u2014 partenariats transporteurs CEDEAO', '500 \u2014 800', '2029-2030', 'Contr\u00f4le total cha\u00eene distribution \u2014 r\u00e9duction co\u00fbt transport 25 % \u2014 ouverture march\u00e9 Ghana \u2014 ma\u00eetrise goulot logistique'],
        ['Extension extraction Phase 2 (177 ha)', 'Viabilisation de nouvelles zones d\'exploitation sur les 177 hectares r\u00e9siduels du site global \u2014 ouverture de nouveaux fronts d\'abattage \u2014 acc\u00e8s \u00e0 des r\u00e9serves compl\u00e9mentaires de qualit\u00e9 homog\u00e8ne \u2014 extension du p\u00e9rim\u00e8tre de la licence DGMG', '1 200 \u2014 2 000', '2030-2033', 'S\u00e9curisation r\u00e9serves \u00e0 tr\u00e8s long terme \u2014 croissance production vers 1 200 000 T/an \u2014 consolidation statut premier producteur granulats Afrique de l\'Ouest'],
        ['Gammes sp\u00e9cialis\u00e9es et export continental', 'D\u00e9veloppement granulats \u00e0 haute valeur ajout\u00e9e : sable manufactur\u00e9 0/4 mm (b\u00e9ton haute performance), graves trait\u00e9es aux liants hydrauliques (GTLH), concass\u00e9 tr\u00e8s haute r\u00e9sistance (> 200 MPa) pour a\u00e9roports et barrages \u2014 strat\u00e9gie export vers Ghana, Nigeria et C\u00f4te d\'Ivoire', '300 \u2014 500', '2031-2034', 'Premium pricing +15-25 % vs granulats standard \u2014 acc\u00e8s grands appels d\'offres r\u00e9gionaux \u2014 r\u00e9duction exposition cycles BTP togolais'],
      ],
      [22, 40, 18, 12, 8]
    ),
    sp(),
    body('La vision de d\u00e9veloppement strat\u00e9gique de CGI SA s\'inscrit dans la politique d\'industrialisation de la CEDEAO et dans le Plan National de D\u00e9veloppement du Togo (PND 2025-2029). En consolidant son leadership dans la production de granulats de qualit\u00e9, en ma\u00eetrisant sa cha\u00eene logistique et en diversifiant ses gammes de produits vers des march\u00e9s \u00e0 plus forte valeur ajout\u00e9e, CGI SA positionne la BIDC comme partenaire naturel de son d\u00e9veloppement sur la d\u00e9cennie 2026-2036 et au-del\u00e0.'),
    sp(),
    infoBox('Source : Plan d\'Affaires 2026-2036 CORNERSTONE GP — Section Perspectives de D\u00e9veloppement Strat\u00e9gique (2025). La plateforme logistique int\u00e9gr\u00e9e s\'alimentera directement des granulats de Siyim\u00e9, cr\u00e9ant des synergies industrielles uniques entre extraction, transformation et distribution. Le business model de producteur integre r\u00e9duit la d\u00e9pendance au march\u00e9 spot et securise les d\u00e9bouch\u00e9s \u00e0 long terme.'),
    sp(),
    successBox('Synth\u00e8se technique V7 : Les quatre tranches constituent un \u00e9cosyst\u00e8me industriel int\u00e9gr\u00e9, fond\u00e9 sur un gisement exceptionnel (site global 201 ha, > 50M tonnes, Phase 1 de 24 ha viabilis\u00e9e avec 11,9 M m3 exploitables sur 60 m de profondeur et > 100 ans de vie). La capacit\u00e9 actuelle de 200-250 TPH (Ligne 1) est la base solide \u00e0 partir de laquelle les Lignes 2 et 3 vont tripler la production vers 795 000 T/an. Les normes de qualit\u00e9 certifi\u00e9es (LA < 22 %, MDE < 15 %, Absorption < 1,5 %) positionnent CGI SA comme acteur premium incontournable. L\'horizon 2036 verra CGI SA consolider sa position de premier producteur industriel de granulats de la sous-r\u00e9gion CEDEAO.'),
    sp(),
  ];
}