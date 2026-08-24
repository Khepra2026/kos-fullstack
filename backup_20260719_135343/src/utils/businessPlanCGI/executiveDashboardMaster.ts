import {
  Paragraph, TextRun, Table,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, hr, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox, kpiRow,
} from '';

// ═══════════════════════════════════════════════════════════════════════════════
// SOMMAIRE EXÉCUTIF — TABLEAU DE BORD UNIQUE ET COMPLET
// Business Plan V8.0 Définitif — CORNERSTONE GROUP INTERNATIONAL (CGI) SA
// Site de Siyimé, District du Haho, Togo — 2026-2036
// Données actualisées : CAPEX 13 056 M FCFA | BFR 2 541 M FCFA
// TRI Projet 17,2% | TRI Actionnaire 21,6% | DSCR Moyen 2,41x
// ═══════════════════════════════════════════════════════════════════════════════

export function executiveDashboardMaster(): (Paragraph | Table)[] {
  return [
    h1('SOMMAIRE EXÉCUTIF — TABLEAU DE BORD UNIQUE ET COMPLET'),
    sp(),
    ...sectionTableauA(),
    ...sectionTableauB(),
    ...sectionTableauC(),
    ...sectionNoteAnalyse(),
    pb(),
  ];
}

// ─── TABLEAU A : KPIs FONCIERS, INDUSTRIELS ET ÉLÉMENTS DE MARCHÉ ──────────
function sectionTableauA(): (Paragraph | Table)[] {
  return [
    h2('Section 1 — Matrice Synthétique du Tableau de Bord'),
    sp(),
    h3('Tableau A : KPIs Fonciers, Industriels et Éléments de Marché'),
    sp(),
    tbl(
      ['Indicateur', 'Valeur', 'Unité', 'Observation stratégique'],
      [
        ['Superficie totale du gisement (Siyimé)', '201', 'Hectares', 'Réserve stratégique à long terme — plusieurs générations d\'exploitation'],
        ['Périmètre sécurisé par permis d\'exploitation DGMG', '24', 'Hectares', 'Phase 1 immédiate — renouvelable selon Code Minier Togolais'],
        ['Emprise foncière réservée aux installations (lignes de concassage)', '6', 'Hectares', 'Dimensionnée pour 3 lignes METSO et zone de stockage — extensible à 8 ha'],
        ['Rapport emprise industrielle / permis exploitable', '25,0', '%', 'Densité industrielle optimale — marge de manœuvre foncière significative'],
        ['Production actuelle (Phase pilote — fonds propres)', '265 000', 'Tonnes / an', 'Capacité Ligne 1 validée — taux de disponibilité ~60% à optimiser'],
        ['Production cible régime de croisière (2028)', '795 000', 'Tonnes / an', 'Triplement de capacité via Lignes 2 et 3 METSO — ratio 3,0x'],
        ['Prix de vente moyen des granulats (départ site)', '8 000', 'FCFA / T', 'Prix compétitif vs importations Bénin/Nigeria (> 9 500 FCFA/T)'],
        ['Marge EBITDA cible à horizon 2028', '55,0', '%', 'Profil de marge premium — aligné sur standards industrie granulats internationale'],
        ['Intensité capitalistique (Capex Intensity)', '0,65', 'x', 'CAPEX / CA prévisionnel 2028 — efficience capitalistique supérieure à la moyenne sectorielle (0,85x)'],
        ['Emplois directs créés dès le démarrage', '85', 'Postes', 'Recrutement prioritairement local — 80% originaires du District du Haho'],
        ['Emplois indirects planifiés d\'ici 2030', '+120', 'Postes', 'Multiplicateur d\'emploi 2,41x — chaîne logistique, sous-traitance, services connexes'],
        ['Ratio emplois directs / 1 000 T produites', '0,107', 'Postes / 1 000 T', 'Productivité du travail alignée sur benchmarks carrières industrielles Afrique de l\'Ouest'],
      ],
      [30, 18, 14, 38]
    ),
    sp(),
    infoBox('Données foncières — Le permis d\'exploitation de 24 hectares constitue la base juridique immédiate, tandis que la réserve globale de 201 hectares offre une visibilité séculaire sur les ressources. L\'emprise de 6 hectares pour les lignes de concassage est dimensionnée pour absorber la production cible de 795 000 T/an avec une marge d\'expansion à 930 000 T/an (horizon 2036). La densité industrielle de 25% du permis exploitable laisse 75% disponibles pour extension, stockage tampon, et infrastructures logistiques futures.'),
    sp(),
  ];
}

// ─── TABLEAU B : PLAN DE FINANCEMENT ET STRUCTURE DU CAPITAL ───────────────
function sectionTableauB(): (Paragraph | Table)[] {
  return [
    h3('Tableau B : Plan de Financement et Structure du Capital'),
    sp(),
    tbl(
      ['Instrument de financement', 'Montant (M FCFA)', 'Montant (M USD)', 'Quote-part (%)', 'Statut / Conditions'],
      [
        ['CAPEX Total Consolidé (Tranches A + B + C + D)', '13 056', '21,58', '83,7', '4 programmes industriels — déploiement 2026-2028 — contrats METSO, Breton, SANY'],
        ['Besoin en Fonds de Roulement (BFR) initial', '2 541', '4,20', '16,3', 'Stocks granulats + créances clients ARMP + trésorerie de sécurité'],
        ['COÛT GLOBAL DU PROGRAMME (CAPEX + BFR)', '15 597', '25,78', '100,0', 'Enveloppe totale de l\'opération — intégralement structurée'],
        ['Demande de financement BIDC (Dette Senior)', '11 440', '18,91', '73,3', 'Taux fixe 8% / 8 ans / différé capital 24 mois — 100% dette senior'],
        ['Capital Social CGI SA (entièrement libéré)', '2 500', '4,13', '16,0', 'Certifié à Lomé — RCCM TG-LFW-03-2023-B12-00047 — NIF 1001909876'],
        ['Investissements historiques passés (2024-2026)', '2 156', '3,56', '13,8', 'Fonds propres actionnaires — matériel METSO, excavateurs, flotte HOWO, génie civil'],
        ['Fonds propres totaux engagés (Capital + Historique)', '4 656', '7,70', '29,9', 'Engagement actionnaire irréversible — preuve tangible de crédibilité'],
        ['Ratio dette / coût global du programme', '73,3', '%', '—', 'Structure de levier optimale pour projet industriel minier en Afrique de l\'Ouest'],
        ['Ratio fonds propres / coût global du programme', '29,9', '%', '—', 'Dépasse l\'exigence BIDC de participation actionnaire (25% minimum)'],
      ],
      [32, 16, 14, 14, 24]
    ),
    sp(),
    infoBox('Structure de financement — La demande de 11 440 M FCFA auprès de la BIDC couvre intégralement la quote-part CAPEX (8 899 M FCFA) et le BFR structurel (2 541 M FCFA), soit 73,3% du coût global du programme. Les fonds propres totaux engagés s\'élèvent à 4 656 M FCFA (Capital 2 500 M + Investissements historiques 2 156 M), représentant 29,9% du programme — supérieur au seuil minimum BIDC de 25%. Aucun apport en fonds propres complémentaire n\'est requis. L\'investissement historique de 2 156 M FCFA, entièrement réalisé sur fonds propres entre 2024 et 2026, constitue la preuve tangible de l\'engagement des actionnaires et fonde la crédibilité de la demande de financement.'),
    sp(),
  ];
}

// ─── TABLEAU C : INDICATEURS DE PERFORMANCE FINANCIÈRE ET BANCABILITÉ ──────
function sectionTableauC(): (Paragraph | Table)[] {
  return [
    h3('Tableau C : Indicateurs de Performance Financière et de Bancabilité'),
    sp(),
    tbl(
      ['Indicateur financier', 'Valeur', 'Seuil BIDC / Benchmark', 'Marge de sécurité', 'Niveau de confiance'],
      [
        ['Valeur Actuelle Nette (VAN à 12%)', '3 280 M FCFA', '> 0 (requis)', '+3 280 M FCFA', '✔ ÉLEVÉ — Création de valeur confirmée'],
        ['Taux de Rentabilité Interne — Projet (TRI Projet, 10 ans)', '17,2 %', 'WACC ~12%', '+5,2 pp', '✔ ÉLEVÉ — Rendement supérieur au coût du capital'],
        ['Taux de Rentabilité Interne — Actionnaire (TRI Actionnaire)', '21,6 %', 'WACC ~12%', '+9,6 pp', '✔ ÉLEVÉ — Rendement actionnaire très attractif'],
        ['Ratio Couverture Service Dette — Moyen (DSCR Moyen)', '2,41 x', 'Covenant ≥ 1,30x', '+1,11x (+85%)', '✔ ÉLEVÉ — Couverture largement supérieure au covenant'],
        ['DSCR Annuel minimum (Point bas de liquidité)', '1,68 x', 'Covenant ≥ 1,30x', '+0,38x (+29%)', '✔ ÉLEVÉ — Même au pire moment, le covenant est respecté'],
        ['Année du point bas de DSCR', '2029', 'Année 1ère annuité complète post-différé', '—', '✔ CONTRÔLÉ — Différé 24 mois atténue le choc de remboursement'],
        ['Période de récupération du CAPEX (Payback Period)', '6,0 ans', '< Durée dette (8 ans)', '-2,0 ans', '✔ ÉLEVÉ — Récupération avant échéance totale'],
        ['Ratio d\'endettement cible (Gearing) à horizon 2030', '0,80 x', 'Covenant BIDC ≤ 3,0x', '-2,20x', '✔ ÉLEVÉ — Désendettement rapide et structurel'],
        ['Horizon d\'amortissement total de la dette BIDC', '2034', 'Échéance contrat 2034', '0,0 an', '✔ CONTRÔLÉ — Extinction de dette conforme à l\'échéancier'],
        ['Intensité capitalistique (Capex Intensity)', '0,65 x', 'Sectoriel ~0,85x', '-0,20x', '✔ ÉLEVÉ — Efficience capitalistique supérieure au benchmark'],
      ],
      [30, 16, 20, 16, 18]
    ),
    sp(),
    kpiRow([
      { label: 'VAN (12%)', value: '3 280 M', sub: 'FCFA — Création de valeur nette' },
      { label: 'TRI Projet', value: '17,2%', sub: 'Sur 10 ans — supérieur au WACC 12%' },
      { label: 'TRI Actionnaire', value: '21,6%', sub: 'Rendement actionnaire premium' },
      { label: 'DSCR Moyen', value: '2,41x', sub: 'Covenant BIDC 1,30x — marge 85%' },
    ]),
    sp(),
    kpiRow([
      { label: 'DSCR Min (2029)', value: '1,68x', sub: 'Point bas liquide — covenant respecté +29%' },
      { label: 'Payback CAPEX', value: '6,0 ans', sub: 'Récupération avant fin dette 2034' },
      { label: 'Gearing 2030', value: '0,80x', sub: 'Désendettement rapide post-2030' },
      { label: 'CAPEX Intensity', value: '0,65x', sub: 'Efficience supérieure au benchmark 0,85x' },
    ]),
    sp(),
    successBox('Synthèse bancabilité — L\'ensemble des indicateurs de performance financière confirme la bancabilité structurelle du projet CGI SA. La VAN positive à 3 280 M FCFA et les TRI supérieurs au WACC (17,2% projet / 21,6% actionnaire) démontrent la création de valeur. Le DSCR moyen de 2,41x — avec un point bas à 1,68x en 2029 — offre une marge de sécurité de 85% au-dessus du covenant BIDC. Le désendettement rapide (Gearing 0,80x en 2030) et le remboursement complet en 2034 sécurisent le profil de risque pour la BIDC et les actionnaires. Le Payback de 6,0 ans garantit la récupération du CAPEX avant l\'échéance du prêt. Ces métriques constituent un profil directement présentable en Comité de Crédit.'),
    sp(),
  ];
}

// ─── SECTION 2 : NOTE D'ANALYSE ET ARGUMENTAIRE POUR LE COMITÉ DE CRÉDIT ──
function sectionNoteAnalyse(): (Paragraph | Table)[] {
  return [
    hr(GOLD),
    sp(),
    h2('Section 2 — Note d\'Analyse et Argumentaire pour le Comité de Crédit BIDC'),
    sp(),

    // ─── 1. JUSTIFICATION TECHNIQUE DE L'EXTENSION ET MAÎTRISE FONCIÈRE ───
    h3('1. Justification technique de l\'extension et maîtrise foncière'),
    sp(),
    body('La réserve foncière globale de 201 hectares à Siyimé constitue l\'actif stratégique premier de CGI SA et la fondation de sa viabilité séculaire. Sur cette emprise, le permis d\'exploitation délivré par la Direction Générale des Mines du Togo (DGMG) couvre 24 hectares en Phase 1, soit 11,9% de la réserve totale — une proportion conservatrice qui préserve la flexibilité stratégique tout en sécurisant juridiquement l\'exploitation immédiate. Le gisement de gneiss précambrien certifié par le Laboratoire National des Bâtiments et Travaux Publics (LNBTP) avec une masse volumique de 2,63 g/cm³ confère à CGI SA une qualité granulométrique premium, supérieure de 15% aux standards du marché togolais et éligible aux marchés d\'infrastructure exigeants (aéroports, barrages, ouvrages d\'art). À une profondeur d\'exploitation de 60 mètres et un volume certifié de 11,9 millions de mètres cubes exploitables, la durée de vie du site excède 100 ans au régime de croisière de 795 000 tonnes par an — une visibilité de ressources sans équivalent dans un rayon de 150 kilomètres autour de Lomé.'),
    sp(),
    body('L\'emprise foncière de 6 hectares réservée à l\'installation des lignes de concassage est rigoureusement dimensionnée pour absorber le triplement de la production, de 265 000 tonnes par an (Phase pilote, Ligne 1 unique) à 795 000 tonnes par an (Régime de croisière, Lignes 1+2+3). La Ligne 1 actuelle, d\'une capacité nominale de 250 tonnes par heure, a démontré sa fiabilité opérationnelle avec un taux de disponibilité de 60% en phase pilote — un ratio perfectible à 80% minimum grâce à la maintenance préventive structurée et au stock de pièces critiques. Les Lignes 2 et 3, respectivement de 300 et 350 tonnes par heure, porteront la capacité installée totale à 900 tonnes par heure, soit 2 070 000 tonnes par an en hypothèse de fonctionnement continu. Le ratio cible de 795 000 tonnes par an représente donc une utilisation modérée de 38% de la capacité installée — une marge de sécurité opérationnelle substantielle qui absorbe les arrêts techniques planifiés, la saisonnalité des chantiers publics, et les aléas climatiques propres à la région des Plateaux.'),
    sp(),
    body('La maîtrise foncière s\'appuie sur trois piliers indépendants mais convergents : (i) le cadastre minier sécurisé par le permis DGMG, renouvelable selon les termes du Code Minier Togolais (Loi n° 2014-010 du 14 mai 2014) et assorti d\'un Plan de Gestion Environnementale et Sociale (PGES) conforme aux IFC Performance Standards ; (ii) l\'emprise industrielle de 6 hectares, titrée et bornée, avec servitudes d\'accès et ligne électrique EDM sécurisées ; (iii) la réserve foncière complémentaire de 177 hectares (201 ha total − 24 ha permis), négociée avec les autorités coutumières du District du Haho et les services fonciers régionaux, qui garantit l\'extension future sans obstruction juridique. Cette architecture foncière en trois niveaux — exploitatif (24 ha), industriel (6 ha), stratégique (177 ha) — constitue un actif intangible rare et difficilement reproductible, renforçant la soutenabilité du projet sur l\'intégralité de la période de remboursement (2027-2034) et au-delà.'),
    sp(),
    infoBox('Le rapport de 25% entre l\'emprise industrielle (6 ha) et le permis exploitable (24 ha) laisse une marge d\'expansion de 75% pour le stockage tampon, les voies de circulation internes, les ateliers de maintenance, et les infrastructures ESG futures. Cette densité industrielle optimale est un facteur de compétitivité structurelle : elle minimise les coûts de transport interne, réduit l\'empreinte environnementale par tonne produite, et facilite la conformité aux normes IFC PS 3 (Prévention et gestion de la pollution).'),
    sp(),

    // ─── 2. SOUTENABILITÉ DU LEVIER FINANCIER ET GESTION DE L'ANNÉE CHARNIÈRE 2029 ─
    h3('2. Soutenabilité du levier financier et gestion de l\'année charnière 2029'),
    sp(),
    body('Le profil de remboursement de la dette senior BIDC de 11 440 M FCFA est structuré sur 8 ans avec un différé de capital de 24 mois, ce qui repousse la première annuité complète de principal à l\'exercice 2029. Cette année constitue le point bas de liquidité du projet, avec un DSCR annuel minimum de 1,68x — soit 29% au-dessus du covenant BIDC requis de 1,30x. Cette marge de sécurité, bien que resserrée par rapport au DSCR moyen de 2,41x, demeure robuste au regard des stress tests appliqués. En scénario pessimiste combiné (baisse des prix de vente de 15%, hausse des coûts énergétiques de 30%, retard de mise en service de 12 mois), le DSCR minimum projeté reste supérieur à 1,35x — conservant une marge de 4% au-dessus du covenant. Cette résilience s\'explique par trois facteurs structurels : le différé de 24 mois qui lisse la courbe de remboursement, la ligne de crédit BFR de 2 541 M FCFA qui absorbe les tensions de trésorerie cycliques, et la marge EBITDA cible de 55% qui préserve une capacité d\'autofinancement élevée même en environnement dégradé.'),
    sp(),
    body('Le DSCR moyen de 2,41x sur l\'intégralité de la période de remboursement traduit une couverture exceptionnelle du service de la dette. À titre de comparaison, le benchmark sectoriel des projets miniers en Afrique de l\'Ouest se situe entre 1,50x et 1,80x ; CGI SA affiche une prime de sécurité de 34% au-dessus de la borne supérieure de ce benchmark. Cette performance s\'appuie sur la prévisibilité des revenus — le contrat cadre CIMCO de 150 000 tonnes par an (19% du CA prévisionnel) constitue une base de revenus contractuelle sur 5 ans, tandis que la diversification commerciale (grands comptes BTP 45%, promoteurs immobiliers 30%, export Bénin 10%, marché local 15%) réduit la volatilité du chiffre d\'affaires. Le ratio d\'endettement (Gearing) cible de 0,80x à l\'horizon 2030 confirme la trajectoire de désendettement rapide : après un pic structurel à 1,90x en 2028-2029 lié au déploiement du CAPEX, le Gearing chute à 0,80x en 2030 puis tend vers 0,00x en 2034, année d\'extinction complète de la dette BIDC. Cette dynamique de désendettement anticipé renforce la capacité de CGI SA à réinvestir et à se prémunir contre les chocs de marché post-2030.'),
    sp(),
    body('L\'année charnière 2029 est rigoureusement instrumentée par un dispositif de surveillance financière trimestrielle. Le modèle de trésorerie SYSCOHADA intègre des seuils d\'alerte précoces : DSCR trimestriel < 1,80x déclenche une revue conjointe CGI SA-BIDC ; DSCR trimestriel < 1,50x active le mécanisme de réserve de remboursement (escrow account alimenté à hauteur de 6 mois d\'annuités) ; DSCR trimestriel < 1,35x (proche du covenant) déclenche un plan d\'action correctif incluant réduction temporaire des dividendes, report d\'investissements discrétionnaires, et réduction des stocks intermédiaires. Ces mécanismes de gouvernance financière, formalisés dans les termes de crédit, garantissent que le point bas de 1,68x en 2029 est non seulement respecté mais activement piloté. Le ratio dette / EBITDA à horizon 2028 s\'établit à 2,4x — un niveau conforme aux standards BIDC pour projets industriels (seuil 3,0x) et compatible avec le maintien d\'une notation de risque « Performant ».'),
    sp(),
    alertBox('Facteur de risque clé et mitigation — DSCR 2029 : Le point bas de 1,68x en 2029, bien que supérieur au covenant de 1,30x, représente la zone la plus sensible du profil de remboursement. La mitigation repose sur : (i) le différé capital 24 mois qui réduit la charge de principal en 2027-2028 ; (ii) la LC BFR de 2 541 M FCFA qui sécurise la trésorerie opérationnelle ; (iii) la clause de rééchelonnement conditionnelle en cas de force majeure (retard livraison METSO, catastrophe naturelle) ; et (iv) la réserve de remboursement de 6 mois constituee dès le début de l\'annuité complète. Ces quatre dispositifs réduisent la probabilité de défaillance à un niveau négligeable.'),
    sp(),

    // ─── 3. EXCELLENCE ESG ET LABELLISATION « BANQUE VERTE » BIDC ──────────
    h3('3. Excellence ESG et labellisation « Banque Verte » BIDC'),
    sp(),
    body('La Tranche C du programme d\'investissement, dédiée à la centrale solaire hybride de 3 à 4 MWc, représente un investissement de 1 712 M FCFA (13,1% du CAPEX total consolidé) et constitue le pilier environnemental du projet CGI SA. Cette installation photovoltaïque, couplée à une station de batteries lithium-ion de 2 MWh et à un groupe électrogène de secours, assure une autoconsommation énergétique de 45% dès 2028 et vise 60% à horizon 2030. L\'impact financier est double : une réduction structurelle des charges d\'exploitation énergétiques de 280 M FCFA par an (prix EDM évité + carburant groupe électrogène) et une décarbonation mesurable de l\'ordre de 1 300 tonnes de CO₂ équivalent évitées annuellement. Cette performance environnementale place CGI SA dans le peloton de tête des projets industriels togolais éligibles aux critères « Banque Verte » de la BIDC, qui exigent une réduction des émissions de GES d\'au moins 25% par rapport au scénario de référence (énergie 100% fossile). Avec une réduction de 35% en 2028 et 40% en 2030, CGI SA dépasse substantiellement ce seuil.'),
    sp(),
    body('L\'alignement ESG dépasse la dimension environnementale pour embrasser les trois piliers du développement durable. Sur le volet social, la création de 85 emplois directs dès le démarrage — avec un objectif de 115 emplois directs et 120 emplois indirects à horizon 2030 — s\'inscrit dans la politique nationale de lutte contre le chômage des jeunes (78% de la population togolaise a moins de 35 ans). Le taux de recrutement local cible de 80% minimum garantit que les bénéfices économiques du projet irriguent directement le District du Haho. Un Programme de Formation Professionnelle (PFP), structuré en partenariat avec le Centre National des Arts et Métiers (CNAM) de Lomé, formera 40 opérateurs techniques par an aux métiers du concassage, de la maintenance mécanique, et de la conduite d\'engins — des compétences transférables au-delà de CGI SA. Sur le volet de gouvernance, CGI SA s\'est structurée conformément à l\'Acte Uniforme OHADA révisé de 2023 : séparation des pouvoirs entre Conseil d\'Administration (5 membres, majorité indépendante), Comité d\'Audit (3 membres, externes majoritaires), et Directeur Général mandataire social. Les décisions supérieures à 500 M FCFA sont soumises au Conseil, et les états financiers annuels sont certifiés par un cabinet d\'expertise comptable indépendant dans les 6 mois de la clôture. Cette architecture de gouvernance satisfait pleinement les exigences BIDC en matière de transparence financière et de contrôle interne.'),
    sp(),
    body('La contribution communautaire contractuelle de 1% du chiffre d\'affaires annuel au Fonds de Développement Communautaire du District du Haho constitue un mécanisme d\'ancrage social structurant. À un chiffre d\'affaires prévisionnel de 6 360 M FCFA en 2028, cette contribution s\'élèvera à 63,6 M FCFA par an, dédiés aux infrastructures de base (accès à l\'eau potable, électrification rurale, santé maternelle, bourses scolaires). Ce mécanisme, formalisé dans une convention tripartite CGI SA — Collectivités territoriales — Représentants coutumiers, prévient les risques sociaux (conflits fonciers, contestations environnementales) et renforce la légitimité locale du projet. Il s\'aligne sur l\'IFC Performance Standard 7 (Populations autochtones) et l\'IFC Performance Standard 5 (Réinstallation involontaire), même si aucune réinstallation n\'est requise pour la Phase 1 de 24 hectares. Le budget ESG annuel total de 193 M FCFA couvre le PGES, le suivi environnemental tiers, la formation HSE, la contribution communautaire, et l\'audit ESG externe — une enveloppe de 2,8% du CA qui place CGI SA dans la catégorie « ESG Leader » des projets industriels togolais.'),
    sp(),
    tbl(
      ['Dimension ESG', 'Indicateur clé', 'Valeur 2028', 'Valeur 2030', 'Alignement BIDC Banque Verte'],
      [
        ['Environnemental', 'Réduction émissions GES vs référence fossile', '-35%', '-40%', 'Seuil requis ≥ -25% — dépassé de 10 à 15 pp'],
        ['Environnemental', 'Autoconsommation solaire (centrale 3-4 MWc)', '45%', '60%', 'ODD 7 — Énergie propre et abordable'],
        ['Environnemental', 'Tonnes CO₂ évitées annuellement', '1 300 T', '1 400 T', 'Alignement NDC Togo 2025 — contribution climatique mesurable'],
        ['Social', 'Emplois directs créés (cumulé)', '87', '115', 'IFC PS 2 — Conditions de travail et sécurité'],
        ['Social', 'Taux de recrutement local', '80%', '82%', 'IFC PS 7 — Populations autochtones / FPIC'],
        ['Social', 'Contribution communautaire (1% du CA)', '63,6 M FCFA', '81,2 M FCFA', 'Engagement contractuel — Fonds Développement District du Haho'],
        ['Social', 'Bourses scolaires et formation technique', '40 bénéficiaires / an', '60 bénéficiaires / an', 'IFC PS 1 — Évaluation et gestion des risques sociaux'],
        ['Gouvernance', 'Score audit ESG externe (sur 100)', '> 75/100', '> 80/100', 'IFC PS 1 — Système de gestion environnementale et sociale'],
        ['Gouvernance', 'Délai certification comptes (mois)', '< 6', '< 5', 'OHADA — Norme NEP 501 — Transparence financière'],
        ['Gouvernance', 'Gearing (ratio d\'endettement)', '1,90x', '0,80x', 'Covenant BIDC ≤ 3,0x — marge de 58%'],
      ],
      [18, 28, 14, 14, 26]
    ),
    sp(),
    successBox('Argumentaire Banque Verte — CGI SA satisfait cumulativement les cinq critères d\'éligibilité de la BIDC pour le label « Banque Verte » : (i) réduction GES > 25% (réalisé : 35-40%) ; (ii) utilisation d\'énergies renouvelables > 30% de la consommation totale (réalisé : 45-60%) ; (iii) budget ESG structuré et audité (réalisé : 193 M FCFA/an, score > 75/100) ; (iv) contribution communautaire contractuelle (réalisé : 1% du CA, convention tripartite) ; (v) conformité IFC Performance Standards (réalisé : PGES validé, audit externe programmé). Ces atouts majorent le dossier de demande de financement et positionnent CGI SA pour l\'accès aux lignes de crédit vertes de la BIDC, potentiellement à des conditions de taux préférentielles (spread réduit de 25 à 50 points de base par rapport au taux standard 8%).'),
    sp(),
    infoBox('Ces métriques et cet argumentaire constituent la base documentaire de la demande de financement de 11 440 M FCFA auprès de la BIDC. Ils démontrent que CGI SA réunit les conditions techniques, financières, environnementales et sociales pour accéder à un financement dette senior structuré, avec un profil de risque maîtrisé et un impact de développement positif pour le Togo et la région CEDEAO. La BIDC est invitée à examiner favorablement cette demande dans le cadre de sa mission de financement du développement industriel durable en Afrique de l\'Ouest.'),
    sp(),
  ];
}



