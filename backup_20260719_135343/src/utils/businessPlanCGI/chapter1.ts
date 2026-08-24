import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT, AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '';

// ─── CHAPITRE 1 : DIAGNOSTIC STRATÉGIQUE ───────────────────────────────────
export function chapter1(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 1 — DIAGNOSTIC STRATÉGIQUE'),
    sp(),
    body('Ce diagnostic stratégique articule une analyse interne fondée sur le cadre VRIO et une gouvernance conforme à l\'OHADA, une analyse externe structurée par le modèle PESTEL et les Cinq Forces de Porter, une étude de marché approfondie (méthodologie Big Four), une matrice SWOT croisée (TOWS), et un cadre stratégique OKR/KPI opérationnel pour piloter la création de valeur sur la période 2026-2036.'),
    sp(),
    ...section11(),
    ...section12(),
    ...section13(),
    ...section14(),
    ...section15(),
    pb(),
  ];
}

// ─── I.1 ANALYSE INTERNE ───────────────────────────────────────────────────
function section11(): (Paragraph | Table)[] {
  return [
    h2('I.1 Analyse Interne — La « Preuve de Concept » 2024-2026'),
    sp(),
    h3('I.1.1 Historique : Phase pilote 2024-2026 financée sur fonds propres'),
    body('Entre 2024 et 2026, CGI SA a mené une phase pilote sur le site de Siyimé, district du Haho, entièrement financée sur fonds propres. Un montant de 2,1 milliards FCFA a été investi par les actionnaires pour installer et mettre en service la première ligne de concassage de 250 tonnes par heure. Cette phase a permis de valider les hypothèses techniques et commerciales du projet, de maîtriser le cycle minage-concassage-criblage et de constituer une base industrielle et humaine pour l\'expansion.'),
    sp(),
    body('Les acquis opérationnels de la phase pilote sont les suivants :'),
    bullet('Démontrer la maîtrise opérationnelle du cycle minage-concassage-criblage sur le terrain, avec des équipements METSO et des procédures documentées qui serviront de base à l\'expansion.'),
    bullet('L\'obtention du permis d\'exploitation minière auprès du Ministère des Mines du Togo (DGMG) — conforme au Code Minier Togolais (Loi n° 2014-010 du 14 mai 2014).'),
    bullet('La certification qualité LNBTP avec une masse volumique de 2,63 g/cm³ — parmi les plus élevées d\'Afrique de l\'Ouest, conférant un avantage compétitif différenciant.'),
    bullet('La constitution d\'un portefeuille client initial incluant le contrat cadre stratégique avec CIMCO (12 500 T/mois, soit 150 000 T/an — 19% du CA prévisionnel).'),
    bullet('Acquérir un apprentissage terrain incomparable : gestion des approvisionnements, relation avec les régulateurs, optimisation des équipements METSO, et surtout, une compréhension intime du gisement de Siyimé.'),
    sp(),
    tbl(
      ['Indicateur phase pilote', 'Valeur', 'Observation'],
      [
        ['Investissement fondateur', '2,1 Mds FCFA (3 470 M FCFA)', '100% fonds propres — engagement actionnaires irréversible'],
        ['Capacité installée (Ligne 1)', '250 t/h', 'Mise en service 2023–2025 — base industrielle'],
        ['Production annuelle atteinte', '~160 000 T/an', 'Taux de disponibilité ~60% — optimisable à 80%+'],
        ['Permis d\'exploitation', 'Délivré DGMG 2023', 'Valide — Code Minier Togolais — Phase 1 : 24 ha viabilisés'],
        ['Certification LNBTP', '2,63 g/cm³', 'Qualité premium — conforme NF EN 1097-6 — différenciant marché'],
        ['Contrat cadre CIMCO', '150 000 T/an (5 ans)', '12 500 T/mois — 2026–2030 — base de revenus sécurisée'],
        ['Apprentissage opérationnel', 'Acquis et documenté', 'SOPs rédigés — base solide pour mise à l\'échelle Programmes 1-2-3'],
      ],
      [35, 30, 35]
    ),
    sp(),
    body('La phase pilote a démontré la viabilité technique et commerciale du gisement de Siyimé. Les opérateurs ont acquis une maîtrise pratique du cycle de production, les actionnaires ont validé leur appétence pour le risque industriel, et le gisement a confirmé ses caractéristiques géotechniques (masse volumique 2,63 g/cm³). Ces acquis constituent le fondement factuel de la demande de financement BIDC.'),
    sp(),
    h3('I.1.2 Gouvernance : Un garde-fou éthique au service de l\'impact'),
    body('CGI SA a structuré sa gouvernance conformément à l\'Acte Uniforme OHADA portant droit des sociétés commerciales et du GIE (révision 2023). L\'architecture de décision repose sur la séparation des pouvoirs : un Conseil d\'Administration tranchant les orientations stratégiques, un Comité d\'Audit indépendant veillant sur l\'intégrité financière, et un Directeur Général mandataire social assurant l\'exécution opérationnelle. Les décisions supérieures à 500 millions FCFA sont soumises au Conseil. La conformité OHADA est un critère déterminant pour l\'accès au financement BIDC et constitue un gage de transparence dans la relation prêteur-emprunteur.'),
    sp(),
    tbl(
      ['Organe de gouvernance', 'Composition', 'Rôle', 'Conformité'],
      [
        ['Conseil d\'Administration', '5 membres — majorité indépendante', 'Stratégie, supervision exécutive, validation budgets > 500 M FCFA', 'OHADA — Art. 423-1 et s. Acte Uniforme 2023'],
        ['Comité d\'Audit', '3 membres — externes majoritaires', 'Contrôle interne, validation états financiers, risque fraude', 'OHADA — Art. 430-1 et s. — Norme NEP 501'],
        ['Directeur Général', 'Mandataire social unique', 'Exécution opérationnelle, reporting trimestriel au CA', 'OHADA — Art. 410-1 — Responsabilité illimitée'],
        ['Responsable HSE (à recruter)', 'Ingénieur qualifié — formation IFC', 'PGES, reporting ESG, interface régulateur environnemental', 'IFC PS 1-2-3 — Code Minier Togolais Art. 87'],
      ],
      [25, 30, 30, 15]
    ),
    sp(),
    infoBox('La conformité OHADA est un critère déterminant pour l\'accès au financement BIDC. CGI SA s\'engage à maintenir cette transparence comme condition non négociable de sa relation avec la Banque. La BIDC exige une gouvernance transparente avec séparation des fonctions de décision (CA), de contrôle (Comité d\'Audit) et d\'exécution (DG). CGI SA satisfait pleinement ces exigences.'),
    sp(),
    h3('I.1.3 Analyse VRIO des capacités stratégiques'),
    body('Le cadre VRIO (Valuable, Rare, Inimitable, Organizationally supported) permet d\'évaluer la soutenabilité des avantages concurrentiels de CGI SA. Deux ressources stratégiques sont analysées : le gisement de Siyimé et la technologie METSO.'),
    sp(),
    tbl(
      ['Critère VRIO', 'Gisement Siyimé (Gneiss/Granite)', 'Technologie METSO', 'Évaluation stratégique'],
      [
        ['Valuable (V) — Crée de la valeur ?', 'Masse volumique 2,63 g/cm³ = qualité premium pour BTP et export. Valeur ajoutée : +15% vs granulats standard.', 'Fiabilité 95%+ de disponibilité. Réduction downtime de 40% vs équipements génériques. ROI opérationnel supérieur.', '✔ Les deux ressources créent de la valeur mesurable'],
        ['Rare (R) — Peu commun ?', 'Gisement identifié dans un rayon de 150 km autour de Lomé. Aucun autre gisement certifié LNBTP à cette densité dans la région.', 'METSO = acteur de référence mondial. Présence bureau Accra (Ghana) = SAV rare en Afrique de l\'Ouest pour concasseurs industriels.', '✔ Rareté confirmée pour les deux'],
        ['Inimitable (I) — Difficile à imiter ?', 'Permis d\'exploitation DGMG = barrière légale. Géologie précambrienne unique = impossible à reproduire.', 'Contrat cadre METSO avec clauses exclusivité régionale. Savoir-faire technique acquis = barrière à l\'imitation.', '✔ Barrières à l\'imitation solides'],
        ['Organizationally supported (O) — Soutenu par l\'org. ?', 'Gouvernance OHADA + SOPs documentés + équipe technique formée = exploitation optimale du gisement.', 'Programme de formation METSO + maintenance préventive planifiée + stock pièces critiques = soutien organisationnel.', '✔ Soutien organisationnel confirmé'],
      ],
      [20, 27, 27, 26]
    ),
    sp(),
    successBox('Conclusion VRIO : Les deux ressources stratégiques (Gisement Siyimé + Technologie METSO) satisfont pleinement les quatre critères VRIO. CGI SA dispose d\'un avantage concurrentiel soutenu et durable, difficile à contester par les entrants potentiels sur le marché togolais et béninois.'),
    sp(),
  ];
}

// ─── I.2 ANALYSE EXTERNE ─────────────────────────────────────────────────────
function section12(): (Paragraph | Table)[] {
  return [
    h2('I.2 Analyse Externe — Environnement stratégique CGI SA'),
    sp(),
    h3('I.2.1 Analyse PESTEL complète'),
    body('L\'analyse PESTEL évalue les facteurs macro-environnementaux qui façonnent le destin de CGI SA. Le focus est porté sur le Code Minier Togolais et le Plan National de Développement (PND 2025-2029).'),
    sp(),
    tbl(
      ['Dimension PESTEL', 'Facteur clé', 'Impact sur CGI SA', 'Niveau de risque'],
      [
        ['Politique (P)', 'Stabilité politique Togo — Transition démocratique en cours. Priorité gouvernementale : industrialisation et BTP.', 'Favorable — Plan National de Développement 2025-2029 identifie les infrastructures comme pilier de croissance. Demande granulats en hausse structurale.', 'Faible'],
        ['Économique (E)', 'Croissance PIB Togo : +5,5% (2024). Inflation UEMOA : +3,2%. Taux BCEAO : 3,5%. Change stable : 605 FCFA/USD.', 'Favorable — Croissance soutenue du BTP (+7,5%/an). Pouvoir d\'achat des granulats lié à l\'investissement public. Risque inflation maîtrisé (+3%/an dans le modèle).', 'Faible'],
        ['Social (S)', 'Urbanisation rapide : Lomé +3,2%/an. Besoin logement massif. Emploi jeunes : priorité nationale (78% de la population < 35 ans).', 'Très favorable — La création de 85 emplois directs et 120 emplois indirects à Siyimé s\'inscrit dans la politique nationale de lutte contre le chômage des jeunes et constitue un ancrage communautaire fort pour CGI SA.', 'Faible'],
        ['Technologique (T)', 'Concassage intelligent (Industry 4.0) : capteurs IoT, maintenance prédictive. Centrale solaire hybride : baisse OPEX énergie 35%.', 'Favorable — METSO propose des solutions connectées. Programme 3 (solaire 3-4 MWc) réduit dépendance énergie. Avantage technologique vs concurrents locaux.', 'Faible'],
        ['Environnemental (E)', 'Code Minier Togolais : obligation réhabilitation. IFC PS 3 : réduction GES. BIDC Banque Verte : critères solaires obligatoires.', 'Favorable avec vigilance — Le Programme 3 solaire (3-4 MWc) réduit les émissions de GES de 35%, préserve les sols de Siyimé et aligne le projet sur les critères Banque Verte BIDC. Budget ESG 193 M FCFA/an couvre conformité réglementaire et engagements environnementaux.', 'Moyen'],
        ['Légal (L)', 'Code Minier Togolais (Loi 2014-010). OHADA : SYSCOHADA révisé. BCEAO : réglementation change. ARMP : marchés publics.', 'Favorable — Permis DGMG valide. Conformité OHADA confirmée. Fiscalité : IS 27%, avantages fiscaux BIDC pour projets verts. Cadre juridique stable et prévisible.', 'Faible'],
      ],
      [15, 30, 40, 15]
    ),
    sp(),
    infoBox('Focus stratégique PESTEL : Le Plan National de Développement du Togo (PND 2025-2029) prévoit 1 200 km de routes bitumées et 50 000 logements sociaux. Ces deux programmes publics génèrent une demande structurelle de granulats estimée à 2,5 millions de tonnes sur la période. CGI SA, avec 795 000 T/an, s\'engage à capter jusqu\'à 30% de ce marché public structurant.'),
    sp(),
    body('CGI SA ne se contente pas d\'observer le développement togolais : elle en est un acteur industriel. L\'analyse PESTEL révèle une convergence favorable entre la politique d\'industrialisation du Togo, la demande structurelle en granulats générée par le PND, et le positionnement de CGI SA comme fournisseur industriel local.'),
    sp(),
    h3('I.2.2 Analyse des Cinq Forces de Porter'),
    body('L\'analyse des Cinq Forces de Porter évalue la structure concurrentielle du marché des granulats au Togo et en Afrique de l\'Ouest. Elle confirme que CGI SA évolue dans un écosystème protecteur, où les barrières à l\'entrée sont élevées et où notre différenciation qualité-technologie-ESG crée un fossé difficile à combler. Le focus est porté sur les barrières à l\'entrée et le pouvoir de négociation des transporteurs, deux facteurs déterminants pour la rentabilité durable de CGI SA.'),
    sp(),
    tbl(
      ['Force de Porter', 'Intensité', 'Analyse détaillée', 'Implication stratégique'],
      [
        ['Menace des nouveaux entrants', 'FAIBLE à MOYENNE', 'Barrières à l\'entrée : (i) permis d\'exploitation DGMG difficile à obtenir (délai 18-24 mois) ; (ii) CAPEX industriel élevé (8 470 M FCFA) ; (iii) certification LNBTP obligatoire ; (iv) expertise technique METSO. Seuls des groupes miniers établis ou des fonds d\'investissement peuvent entrer.', 'Avantage CGI SA : position de first-mover avec permis validé et investissement fondateur réalisé.'],
        ['Pouvoir de négociation des fournisseurs', 'MOYEN', 'Fournisseurs clés : METSO (équipements), ORICA (explosifs), EDM (énergie). ORICA et METSO ont un pouvoir de prix modéré (oligopole). CGI SA sécurise les approvisionnements par contrats cadres à 3 ans.', 'Stratégie : diversification fournisseurs (2 sources par poste critique) + stock sécurité 45 jours.'],
        ['Pouvoir de négociation des acheteurs', 'MOYEN à FORT', 'Clients : grands groupes BTP (CIMCO, EBOMAF), marchés publics (ARMP), PME construction. Pouvoir modéré car granulats = input essentiel non substituable. Mais concentration des grands comptes = pression prix.', 'Stratégie : contrats long terme (CIMCO 5 ans) + diversification calibres et dalles granite à marge supérieure.'],
        ['Pouvoir de négociation des transporteurs', 'FORT', 'Transport = poste critique. 150 km Siyimé-Lomé = coût élevé (1 500 FCFA/T en flotte propre, 2 500 FCFA/T en sous-traitance). Pénurie de camions bennes industriels au Togo. Transporteurs = goulot d\'étranglement.', 'Stratégie CGI SA : acquisition flotte propre (10 camions) + partenariats logistiques + optimisation itinéraires. Programme 2 (dalles) réduit dépendance transport (valeur/volume supérieure).'],
        ['Rivalité entre concurrents', 'MOYENNE', 'Concurrents directs : 3 carrières opérationnelles au Togo (capacités < 200 000 T/an). Concurrents indirects : importations Bénin/Nigeria (coût transport prohibitif > 300 km). Aucun concurrent avec gisement certifié LNBTP + METSO + solaire.', 'CGI SA dispose d\'un avantage différenciant structurant : qualité + technologie + ESG. Positionnement premium justifié.'],
      ],
      [18, 14, 38, 30]
    ),
    sp(),
    alertBox('Point de vigilance stratégique — Transporteurs : Le pouvoir de négociation des transporteurs est évalué comme FORT. C\'est le principal levier de risque opérationnel identifié. CGI SA s\'engage à neutraliser cette menace par une stratégie de verticalisation partielle (flotte propre de 10 camions) et par la diversification vers les dalles de granite (marché à valeur ajoutée, moins dépendant au volume de transport). Le Programme 3 (solaire) réduit aussi l\'exposition à EDM, un autre fournisseur critique.'),
    sp(),
    body('Synthèse des Cinq Forces : La structure concurrentielle est globalement favorable à CGI SA. Les barrières à l\'entrée (permis, CAPEX, certification) protègent la position de first-mover. Le principal risque identifié — le pouvoir des transporteurs — est neutralisé par la stratégie de verticalisation partielle (flotte propre) et par la diversification vers les dalles de granite (marché à valeur ajoutée, moins dépendant au volume de transport). CGI SA anticipe les risques et les transforme en leviers de différenciation.'),
    sp(),
  ];
}

// ─── I.3 MATRICE SWOT CROISÉE (TOWS) ────────────────────────────────────────
function section13(): (Paragraph | Table)[] {
  return [
    h2('I.3 Matrice SWOT Croisée (TOWS) — Stratégies d\'action'),
    sp(),
    body('La matrice SWOT croisée (TOWS) tisse une logique de croissance où chaque stratégie découle de l\'intersection entre forces internes et opportunités externes. Elle décline quatre familles de stratégies : S-O (expansion offensive), S-T (protection défensive), W-O (renforcement) et W-T (contingence), classées par priorité, délai et impact financier prévisionnel.'),
    sp(),
    h3('I.3.1 Matrice des stratégies TOWS'),
    sp(),
    // Titre de la matrice
    new Paragraph({
      children: [new TextRun({ text: 'Stratégies S-O (Forces × Opportunités) — Expansion offensive', bold: true, size: 20, color: GREEN, font: 'Calibri' })],
      shading: { type: ShadingType.SOLID, color: GREEN_LT, fill: GREEN_LT },
      spacing: { before: 160, after: 80 },
    }),
    tbl(
      ['Stratégie S-O', 'Description', 'Force mobilisée', 'Opportunité ciblée', 'Délai', 'Impact'],
      [
        ['S-O1 : Levée fonds BIDC', 'Utiliser la validation de concept (fonds propres 2,1 Mds) + gouvernance OHADA pour décrocher 11 011 M FCFA dette senior BIDC à taux concessionnel.', 'Engagement actionnaires + Gouvernance OHADA', 'Appétit BIDC pour projets industriels CEDEAO verts', 'T1 2027', '8 470 M FCFA CAPEX + 2 541 M FCFA BFR'],
        ['S-O2 : Expansion METSO', 'Déployer Lignes 2 et 3 METSO pour atteindre 795 000 T/an et capter 30% du marché public PND 2025-2029.', 'Technologie METSO + Gisement premium Siyimé', 'PND Togo : 1 200 km routes + 50 000 logements', 'T2-T4 2027', 'CA 2028 : 6,7 Mds FCFA'],
        ['S-O3 : Diversification granite', 'Lancer l\'unité de dalles de granite (Programme 2) pour les marchés du luxe, monuments, export Europe/Moyen-Orient.', 'Qualité gisement 2,63 g/cm³ (VRIO confirmé)', 'Demande granite premium Afrique + Export', 'T1 2028', 'Marge 55% vs 45% granulats'],
        ['S-O4 : Export Bénin structuré', 'Signer contrats long terme avec grands groupes BTP béninois (CIMCO déjà acquis, EBOMAF, CECA).', 'Proximité 176 km Cotonou + Qualité LNBTP', 'Boom BTP béninois (+8,2%/an) — Cotonou port', 'T2 2026', '+50 000 T/an dès 2027'],
      ],
      [12, 28, 18, 20, 10, 12]
    ),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Stratégies S-T (Forces × Menaces) — Protection défensive', bold: true, size: 20, color: NAVY_MID, font: 'Calibri' })],
      shading: { type: ShadingType.SOLID, color: STEEL_LT, fill: STEEL_LT },
      spacing: { before: 160, after: 80 },
    }),
    tbl(
      ['Stratégie S-T', 'Description', 'Force mobilisée', 'Menace neutralisée', 'Délai', 'Impact'],
      [
        ['S-T1 : Barrière technologique', 'Le savoir-faire METSO et la certification LNBTP créent une barrière à l\'imitation difficilement surmontable pour les entrants.', 'Technologie METSO + Certification LNBTP', 'Menace nouveaux entrants (permis + CAPEX)', 'Permanent', 'Protection marché ≥ 10 ans'],
        ['S-T2 : Verticalisation transport', 'Acquérir 10 camions bennes + partenariats logistiques pour réduire la dépendance aux transporteurs tiers.', 'Trésorerie post-levée + Gouvernance OHADA', 'Pouvoir de négociation fort des transporteurs', 'T2 2027', 'Réduction coût transport 20%'],
        ['S-T3 : Autonomie énergétique', 'Centrale solaire 3-4 MWc (Programme 3) couvre 60% des besoins et annule le risque de hausse des prix EDM/carburant.', 'CAPEX structuré + Alignement BIDC vert', 'Hausse coûts énergie + Dépendance EDM', 'T2 2027-T1 2028', 'Économie 180 M FCFA/an'],
        ['S-T4 : Diversification produits', 'Les dalles granite et les calibres spéciaux réduisent l\'exposition aux cycles du BTP standard.', 'Qualité gisement + Savoir-faire technique', 'Rivalité concurrentielle locale', 'T2 2028', 'Mélange produits = stabilité CA'],
      ],
      [12, 28, 18, 20, 10, 12]
    ),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Stratégies W-O (Faiblesses × Opportunités) — Renforcement', bold: true, size: 20, color: STEEL, font: 'Calibri' })],
      shading: { type: ShadingType.SOLID, color: STEEL_LT, fill: STEEL_LT },
      spacing: { before: 160, after: 80 },
    }),
    tbl(
      ['Stratégie W-O', 'Description', 'Faiblesse corrigée', 'Opportunité ciblée', 'Délai', 'Impact'],
      [
        ['W-O1 : Recrutement cadres', 'Recruter un Directeur Commercial et un Responsable HSE qualifié pour structurer la croissance.', 'Équipe management sous-dimensionnée (38 pers. 2026)', 'Croissance 795 000 T/an + Conformité IFC', 'T1 2026', 'Capacité management × 2,5'],
        ['W-O2 : Digitalisation ventes', 'Mettre en place un CRM et un système de commande en ligne pour les grands comptes.', 'Processus commercial manuel — faible traçabilité', 'Digitalisation marché BTP Afrique', 'T2 2026', 'Réduction délai commande 50%'],
        ['W-O3 : Formation technique', 'Programme de formation METSO + partenariat CNAM Togo pour certifier les opérateurs.', 'Compétences techniques limitées à Ligne 1', 'Disponibilité bureau METSO Accra', 'T2 2026', 'Disponibilité 60% → 85%'],
      ],
      [12, 28, 18, 20, 10, 12]
    ),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Stratégies W-T (Faiblesses × Menaces) — Survie / Contingence', bold: true, size: 20, color: AMBER, font: 'Calibri' })],
      shading: { type: ShadingType.SOLID, color: AMBER_LT, fill: AMBER_LT },
      spacing: { before: 160, after: 80 },
    }),
    tbl(
      ['Stratégie W-T', 'Description', 'Faiblesse protégée', 'Menace contenue', 'Délai', 'Impact'],
      [
        ['W-T1 : Ligne de crédit BFR', 'Négocier une LC BIDC de 2 541 M FCFA couvrant 100% du BFR structurel pour anticiper les délais de paiement des marchés publics.', 'Trésorerie limitée post-phase pilote', 'Délais paiement ARMP (60-90 jours) + saisonnalité', 'T1 2027', 'Sécurisation trésorerie'],
        ['W-T2 : Assurance multi-risques', 'Souscrire une assurance crédit export + assurance AT/MP pour couvrir les risques clients et sociaux.', 'Faible couverture assurantielle actuelle', 'Défaut de paiement grands comptes + Risque social', 'T1 2026', 'Couverture 85% créances'],
        ['W-T3 : Plan de continuité', 'Établir un BCP (Business Continuity Plan) avec stock tampon 7 jours et fournisseurs alternatifs.', 'Absence de plan de continuité documenté', 'Panne équipement + Grève transporteurs', 'T2 2026', 'Disponibilité garantie 95%'],
      ],
      [12, 28, 18, 20, 10, 12]
    ),
    sp(),
    h3('I.3.2 Synthèse stratégique TOWS'),
    body('Les stratégies S-O constituent le moteur de la croissance de CGI SA. Elles mobilisent les ressources stratégiques (VRIO confirmé) pour capter les opportunités structurelles du marché : levée de fonds BIDC, expansion METSO, diversification granite, export Bénin. La phase pilote 2024-2026 trouve ici sa consécration industrielle.'),
    sp(),
    body('Les stratégies S-T (protection défensive) neutralisent les menaces identifiées : la technologie METSO et la certification LNBTP créent une barrière à l\'entrée de 10 ans minimum ; la verticalisation partielle du transport et l\'autonomie énergétique solaire réduisent la dépendance aux fournisseurs critiques. CGI SA anticipe les risques et les transforme en leviers de différenciation.'),
    sp(),
    body('Les stratégies W-O (renforcement) et W-T (contingence) traitent les faiblesses opérationnelles identifiées : sous-dimensionnement de l\'équipe de management, processus commercial manuel, compétences techniques limitées. Le plan de recrutement (85 directs d\'ici 2030), la digitalisation commerciale et le programme de formation METSO adressent ces points de manière structurée. CGI SA s\'engage à ne laisser aucune faille devenir une vulnérabilité.'),
    sp(),
    successBox('Conclusion diagnostic stratégique : CGI SA dispose d\'un positionnement stratégique fort, fondé sur des ressources VRIO (Gisement Siyimé + Technologie METSO), dans un environnement macroéconomique favorable (PESTEL) et une structure concurrentielle protectrice (Porter). Les stratégies TOWS identifiées constituent un plan d\'action opérationnel directement déclinable dans les Programmes 1-2-3 et la structuration financière BIDC. La phase pilote 2024-2026 a démontré la capacité de CGI SA à construire et à gérer une unité industrielle ; l\'étape actuelle vise à prouver sa capacité à durer et à se développer à l\'échelle régionale.'),
    sp(),
  ];
}

// ─── I.4 ÉTUDE DE MARCHÉ BIG FOUR ─────────────────────────────────────────
function section14(): (Paragraph | Table)[] {
  return [
    h2('I.4 Etude de Marche \u2014 Approche Big Four'),
    sp(),
    body('L\'\u00e9tude de march\u00e9 ci-apr\u00e8s est construite selon la m\u00e9thodologie Big Four appliqu\u00e9e aux projets d\'infrastructure et de mati\u00e8res premi\u00e8res en Afrique subsaharienne. Elle couvre la taille du march\u00e9 (TAM/SAM/SOM), la demande structurelle, les dynamiques concurrentielles, les tendances de prix, et le potentiel d\'exportation r\u00e9gional. Toutes les donn\u00e9es sont sourc\u00e9es aupr\u00e8s d\'institutions officielles et de cabinets d\'\u00e9tudes reconnus.'),
    sp(),
    h3('I.4.1 Taille du Marche \u2014 TAM / SAM / SOM'),
    body('La m\u00e9thodologie TAM/SAM/SOM permet de dimensionner le march\u00e9 adressable de CGI SA de mani\u00e8re rigoureuse, en partant du march\u00e9 global pour converger vers la part r\u00e9aliste capturable dans les premi\u00e8res ann\u00e9es d\'exploitation.'),
    sp(),
    tbl(
      ['Niveau', 'Marche', 'Volume (T/an)', 'Valeur (Mds FCFA)', 'Commentaire / Source'],
      [
        ['TAM \u2014 Marche Total Adressable', 'Afrique de l\'Ouest (CEDEAO) \u2014 granulats + pierre naturelle', '45 000 000', '360', 'BAD African Economic Outlook 2024 \u2014 croissance BTP +6,5%/an CEDEAO'],
        ['SAM \u2014 Marche Adressable Reachable', 'Togo + Benin + Ghana (rayon 500 km) \u2014 granulats industrie', '8 500 000', '68', 'INSEED Togo 2024 + INSAE Benin 2024 \u2014 consommation granulats BTP'],
        ['SOM \u2014 Marche Capturable Realisable', 'CGI SA \u2014 Togo central + Benin (rayon 250 km Siyime)', '1 200 000', '9,6', 'Estimation KHEPRA EXPERTS \u2014 part de marche realiste 14,1% du SAM'],
        ['Objectif CGI SA 2028', 'Production regime croisiere 3 lignes METSO', '795 000', '6,7', 'Part de marche = 9,4% du SAM / 1,8% du TAM \u2014 conservateur et credible'],
      ],
      [14, 28, 14, 14, 30]
    ),
    sp(),
    h3('I.4.2 Demande Structurelle \u2014 Togo et Region'),
    body('La demande de granulats au Togo est structurellement portee par trois moteurs : (i) le Plan National de Developpement 2025-2029 (PND), qui prevoit 1 200 km de routes bitumees, 50 000 logements sociaux et 12 nouveaux batiments publics ; (ii) l\'urbanisation rapide de Lome (+3,2%/an), qui genere une demande privee de beton et de fondations ; (iii) les grands chantiers d\'infrastructure regionaux (Port de Lome extension, corridor Abidjan-Lagos).'),
    sp(),
    tbl(
      ['Moteur de demande', 'Volume genere (T/an)', 'Valeur (Mds FCFA)', 'Horizon', 'Part adressable CGI SA'],
      [
        ['PND Togo \u2014 routes 1 200 km', '900 000', '7,2', '2025-2029', '30% \u2014 270 000 T/an'],
        ['PND Togo \u2014 logements sociaux 50 000', '750 000', '6,0', '2026-2030', '20% \u2014 150 000 T/an'],
        ['Chantiers prives Lome (beton + fondations)', '1 200 000', '9,6', 'Permanent', '15% \u2014 180 000 T/an'],
        ['Infrastructure portuaire Lome', '350 000', '2,8', '2026-2028', '25% \u2014 87 500 T/an'],
        ['Marche beninois (EBOMAF, CECA, secteur prive)', '600 000', '4,8', 'Permanent', '12% \u2014 72 000 T/an'],
        ['Marche local Plateaux (Kpalime, Atakpame)', '280 000', '2,2', 'Permanent', '45% \u2014 126 000 T/an'],
        ['TOTAL MARCHE ADRESSABLE CGI SA', '4 080 000', '32,6', '2026-2030', '~22% \u2014 885 500 T/an'],
      ],
      [30, 16, 14, 14, 26]
    ),
    sp(),
    infoBox('Source demande : Plan National de Developpement Togo 2025-2029 (gouvernement.tg) \u2014 Budget previsionnel travaux publics 2026-2030 (Ministere des Finances Togo) \u2014 INSEED Togo, Rapport BTP 2024 \u2014 BAD, Infrastructure Financing Africa 2024 \u2014 Banque Mondiale, Togo Infrastructure Assessment 2024.'),
    sp(),
    h3('I.4.3 Analyse de la demande par segment et calibre'),
    body('La demande togolaise de granulats se repartit en quatre segments principaux, chacun avec des specifications granulometriques et des exigences qualite distinctes. CGI SA, grace a la technologie METSO et au gisement de Siyime (masse volumique 2,63 g/cm3), peut adresser l\'integralite des segments du marche.'),
    sp(),
    tbl(
      ['Segment / Calibre', 'Volume marche Togo (T/an)', 'Prix moyen (FCFA/T)', 'Specification qualite', 'Part CGI SA visee'],
      [
        ['Grave non traitee 0/31,5 mm \u2014 sous-couche routiere', '1 400 000', '6 500', 'Indice de concassage > 50% \u2014 NF P 98-129', '20% \u2014 280 000 T/an'],
        ['Granulat 15/25 mm \u2014 beton structure', '1 200 000', '8 500', 'Masse volumique > 2,50 g/cm3 \u2014 NF EN 12620', '28% \u2014 336 000 T/an'],
        ['Gravillon 5/15 mm \u2014 beton courant + enduit', '900 000', '8 000', 'Proprete LA < 30 \u2014 conforme LNBTP', '22% \u2014 198 000 T/an'],
        ['Sable 0/5 mm \u2014 mortier + beton fin', '700 000', '9 000', 'Module de finesse 2,4-3,1 \u2014 NF P 18-304', '25% \u2014 175 000 T/an'],
        ['Granulat haute resistance > 120 MPa (specialise)', '300 000', '12 000', 'Ouvrages d\'art \u2014 aeroports \u2014 barrages', '30% \u2014 90 000 T/an'],
        ['Dalles granite finies (hors granulat)', '15 000 m2', '45 000 /m2', 'Surface polie/flammee \u2014 granite 2,63 g/cm3', '100% \u2014 production propre CGI'],
      ],
      [28, 16, 14, 28, 14]
    ),
    sp(),
    h3('I.4.4 Analyse concurrentielle approfondie'),
    body('Le marche des granulats au Togo est actuellement fragment\u00e9 et domin\u00e9 par trois acteurs de petite taille, aucun ne disposant de la capacit\u00e9 industrielle, de la certification et de l\'avantage technologique de CGI SA. L\'analyse concurrentielle confirme le positionnement de CGI SA comme acteur premium et acteur de référence du marché.'),
    sp(),
    tbl(
      ['Concurrent', 'Capacite (T/an)', 'Prix indicatif (FCFA/T)', 'Certification', 'Technologie', 'Avantage vs CGI SA'],
      [
        ['Carriere A (Togo Sud)', '< 100 000', '7 500-8 500', 'LNBTP partielle', 'Equipements locaux anciens', 'CGI : Capacite x8 \u2014 qualite superieure \u2014 livraison garantie'],
        ['Carriere B (Togo Centre)', '< 80 000', '7 000-8 000', 'Non certifie', 'Concasseurs chinois generiques', 'CGI : Certification LNBTP \u2014 METSO fiabilite 95%'],
        ['Importateurs Benin/Nigeria', '50 000-150 000', '9 000-12 000', 'Variable', 'Transport > 300 km = non competitif', 'CGI : Proximite Siyime 150 km \u2014 prix competitif'],
        ['Graviere informelle locale', '< 50 000', '5 000-6 500', 'Aucune', 'Manuel \u2014 qualite variable', 'CGI : Qualite garantie \u2014 volume \u2014 fiabilite d\'approvisionnement'],
        ['CGI SA (cible 2028)', '795 000', '8 000-12 000', 'LNBTP \u2014 DGMG', 'METSO Nordberg C120 + HP300', 'Leader sectoriel \u2014 first mover \u2014 VRIO confirme'],
      ],
      [20, 14, 16, 14, 20, 16]
    ),
    sp(),
    h3('I.4.5 Tendances de prix et projections'),
    tbl(
      ['Marche de reference', 'Prix 2022 (FCFA/T)', 'Prix 2024 (FCFA/T)', 'Evolution annuelle', 'Projection 2028 (FCFA/T)'],
      [
        ['Accra (Ghana) \u2014 granulats infrastructure', '6 200', '7 800', '+12,2%/an', '10 200'],
        ['Abidjan (Cote d\'Ivoire) \u2014 beton structure', '8 500', '10 200', '+9,5%/an', '13 500'],
        ['Douala (Cameroun) \u2014 granite industriel', '7 000', '8 900', '+12,8%/an', '12 000'],
        ['Lome (Togo) \u2014 marche actuel observe', '7 200', '8 000', '+5,4%/an', '9 500-10 000'],
        ['Lome (Togo) \u2014 hypothese CGI SA (conservative)', '8 000', '8 000', '+3,0%/an', '8 487-9 004'],
      ],
      [30, 18, 18, 16, 18]
    ),
    sp(),
    infoBox('Note methodologique : L\'hypothese CGI SA de +3%/an est volontairement conservative : elle represente 56% de la tendance regionale observee (+5,4%/an Lome), offrant une marge de prudence significative. Sources : ICMM Mining Contribution to Sustainable Development in Africa (2023) \u2014 Enquete terrain KHEPRA EXPERTS aupres de 23 entreprises BTP au Togo et au Benin (Q4 2024).'),
    sp(),
    h3('I.4.6 Potentiel d\'exportation regional'),
    tbl(
      ['Marche export', 'Distance', 'Volume adressable', 'Prix export (FCFA/T)', 'CA potentiel 2029 (M FCFA)', 'Barriere principale'],
      [
        ['Benin \u2014 Cotonou et marche national', '176 km', '50 000-80 000 T/an', '8 500-9 500', '425-760', 'Formalites douanieres CEDEAO + logistique'],
        ['Togo \u2014 marches regionaux Plateaux', '60-150 km', '100 000-150 000 T/an', '7 000-8 000', '700-1 200', 'Faible \u2014 marche domestique'],
        ['Ghana \u2014 corridor Accra (> 300 km)', '> 300 km', '20 000-30 000 T/an', '10 000-12 000', '200-360', 'Distance \u2014 competitivite marginale'],
        ['Total export CEDEAO', '\u2014', '170 000-260 000 T/an', '8 500-9 800', '1 325-2 320', 'Accord libre echange CEDEAO facilite'],
      ],
      [20, 12, 20, 16, 18, 14]
    ),
    sp(),
    successBox('Conclusion \u00e9tude de march\u00e9 : Le march\u00e9 togolais et r\u00e9gional pr\u00e9sente une demande structurelle solide, soutenue par le PND 2025-2029, l\'urbanisation de Lom\u00e9 et les grands chantiers d\'infrastructure. CGI SA, avec une cible de 795 000 T/an en 2028, adresse 9,4% du march\u00e9 SAM \u2014 une part conservative dans un march\u00e9 sous-approvisionn\u00e9. La tendance haussi\u00e8re des prix (+3%/an retenu vs +5,4%/an observ\u00e9) offre une marge de prudence significative. Le potentiel d\'exportation r\u00e9gional (CEDEAO, B\u00e9nin) constitue un relai de croissance au-del\u00e0 de 2028.'),
    sp(),
  ];
}

// ─── I.5 AXES STRATÉGIQUES, OKR ET KPI ────────────────────────────────────
function section15(): (Paragraph | Table)[] {
  return [
    h2('I.5 Axes Strategiques, Objectifs OKR et Indicateurs KPI 2026-2036'),
    sp(),
    body('Le cadre strategique de CGI SA est structure en quatre axes d\'excellence interdependants, chacun decline en objectifs OKR (Objectives and Key Results) et en indicateurs KPI (Key Performance Indicators). Ce cadre de pilotage est directement lie aux covenants BIDC et aux engagements IFC Performance Standards. Il sera mis a jour semestriellement et presente au Conseil d\'Administration et au comite de credit BIDC dans les rapports de gestion.'),
    sp(),
    h3('I.5.1 Axe 1 \u2014 Excellence Operationnelle'),
    tbl(
      ['Objectif OKR', 'Resultat cle (KR)', 'KPI de suivi', 'Cible 2028', 'Cible 2030', 'Cible 2036'],
      [
        ['Atteindre 795 000 T/an de production granulats', 'KR1 : Taux de disponibilite Lignes 1+2+3 >= 80%', 'TD % (mensuel)', '80%', '82%', '85%'],
        ['Atteindre 795 000 T/an de production granulats', 'KR2 : OEE (Overall Equipment Effectiveness) >= 65%', 'OEE % (mensuel)', '65%', '68%', '72%'],
        ['Maitriser les couts de production', 'KR3 : Cout de production <= 2 820 FCFA/T', 'Cout variable unitaire (mensuel)', '2 820', '2 700', '2 550'],
        ['Securiser la qualite LNBTP', 'KR4 : Taux de conformite qualite >= 98%', 'Non-conformites/1000 T', '< 2', '< 1,5', '< 1'],
        ['Securiser la qualite LNBTP', 'KR5 : Certification LNBTP annuelle renouvelee', 'Certificat valide (OUI/NON)', 'OUI', 'OUI', 'OUI'],
      ],
      [30, 26, 16, 8, 8, 12]
    ),
    sp(),
    h3('I.5.2 Axe 2 \u2014 Performance Financiere'),
    tbl(
      ['Objectif OKR', 'Resultat cle (KR)', 'KPI de suivi', 'Cible 2028', 'Cible 2030', 'Cible 2036'],
      [
        ['Generer un EBITDA > 4 500 M FCFA/an des 2028', 'KR1 : Marge EBITDA >= 65%', 'Marge EBITDA (trimestriel)', '67,8%', '71,2%', '75,0%'],
        ['Respecter les covenants BIDC', 'KR2 : DSCR >= 1,3x (covenant BIDC)', 'DSCR (trimestriel)', '1,54x', '1,67x', '2,71x'],
        ['Rembourser la dette BIDC d\'ici 2034', 'KR3 : Gearing <= 1,5x', 'Gearing (annuel)', '1,90x', '0,80x', '0,00x'],
        ['Optimiser le BFR', 'KR4 : BFR / CA <= 45%', 'BFR/CA (mensuel)', '40,4%', '37,9%', '35,2%'],
        ['Atteindre TRI >= 15%', 'KR5 : VAN (12%) >= 2 500 M FCFA', 'VAN recalculee (annuel)', '2 950 M', '3 500 M', '> 5 000 M'],
        ['Maximiser la rentabilite actionnaires', 'KR6 : Resultat net >= 1 800 M FCFA/an', 'Resultat net (annuel)', '1 905 M', '2 378 M', '5 000 M'],
      ],
      [28, 26, 16, 8, 8, 14]
    ),
    sp(),
    h3('I.5.3 Axe 3 \u2014 Leadership Commercial et Expansion'),
    tbl(
      ['Objectif OKR', 'Resultat cle (KR)', 'KPI de suivi', 'Cible 2028', 'Cible 2030', 'Cible 2036'],
      [
        ['Devenir acteur de référence togolais des granulats d\'infrastructure', 'KR1 : Part de marche Togo >= 20%', 'Part de marche (semestriel)', '15%', '22%', '35%'],
        ['Securiser la base clients', 'KR2 : Taux retention clients >= 90%', 'Taux fidelisation (annuel)', '85%', '90%', '95%'],
        ['Securiser 3 contrats cadres long terme', 'KR3 : Volume contracte >= 400 000 T/an', 'Volume sous contrat (semest.)', '300 000', '450 000', '600 000'],
        ['Penetrer le marche beninois et export CEDEAO', 'KR4 : CA export >= 8% du CA total', 'CA export / CA total (annuel)', '3%', '8%', '15%'],
        ['Lancer et rentabiliser Programme 2 dalles', 'KR5 : Production dalles >= 10 000 m2/an', 'Production dalles m2 (mensuel)', '5 000', '15 000', '15 000'],
        ['Lancer et rentabiliser Programme 2 dalles', 'KR6 : Marge brute dalles >= 50%', 'Marge brute dalles % (trimestriel)', '55%', '55%', '55%'],
      ],
      [28, 26, 16, 8, 8, 14]
    ),
    sp(),
    h3('I.5.4 Axe 4 \u2014 Impact Social, Gouvernance et ESG'),
    tbl(
      ['Objectif OKR', 'Resultat cle (KR)', 'KPI de suivi', 'Cible 2028', 'Cible 2030', 'Cible 2036'],
      [
        ['Creer 85 emplois directs a Siyime d\'ici 2030', 'KR1 : Emplois directs >= 80', 'Effectif total (trimestriel)', '87', '115', '134'],
        ['Priorite recrutement local', 'KR2 : Recrutement local >= 80%', 'Taux recrutement local (annuel)', '80%', '82%', '85%'],
        ['Atteindre 60% autoconsommation solaire d\'ici 2029', 'KR3 : Couverture solaire >= 45%', 'Couverture solaire % (mensuel)', '45%', '60%', '65%'],
        ['Reduire les emissions GES de 35%', 'KR4 : GES evites >= 900 T CO2/an', 'Tonnes CO2 evitees (annuel)', '900 T', '1 200 T', '1 400 T'],
        ['Conformite IFC PS 1-6 et BIDC Banque Verte', 'KR5 : Audit ESG externe sans reserve', 'Score audit ESG (annuel)', '> 75/100', '> 80/100', '> 85/100'],
        ['Zero accident grave sur site', 'KR6 : TRIR <= 2 (incidents enregistrables)', 'TRIR (mensuel)', '< 3', '< 2', '< 1'],
        ['Gouvernance OHADA exemplaire', 'KR7 : Comptes certifies dans les 6 mois', 'Delai publication comptes', '< 6 mois', '< 5 mois', '< 4 mois'],
      ],
      [28, 26, 16, 8, 8, 14]
    ),
    sp(),
    h3('I.5.5 Tableau de bord strategique consolide \u2014 Vision 2036'),
    tbl(
      ['Dimension', 'KPI cle', '2026 (baseline)', '2028 (cible)', '2030 (regime)', '2036 (vision)'],
      [
        ['Production & Qualite', 'Production granulats (T/an)', '265 000', '795 000', '827 000', '930 000'],
        ['Production & Qualite', 'Disponibilite equipements (%)', '60%', '80%', '82%', '85%'],
        ['Performance Financiere', 'CA total (M FCFA)', '2 120', '6 972', '8 121', '10 648'],
        ['Performance Financiere', 'EBITDA (M FCFA)', '1 245', '4 729', '5 780', '7 981'],
        ['Performance Financiere', 'DSCR', 'N/A', '1,54x', '1,67x', '2,71x'],
        ['Performance Financiere', 'Dette BIDC residuelle (M FCFA)', '0', '11 440', '6 850', '0'],
        ['Commercial', 'Part de marche Togo (%)', '3%', '15%', '22%', '35%'],
        ['Commercial', 'Volume contracte (T/an)', '150 000', '300 000', '450 000', '600 000'],
        ['ESG & Social', 'Emplois directs', '38', '87', '115', '134'],
        ['ESG & Social', 'Couverture solaire (%)', '0%', '45%', '60%', '65%'],
        ['ESG & Social', 'GES evites (T CO2/an)', '0', '900', '1 200', '1 400'],
      ],
      [20, 28, 12, 12, 12, 16]
    ),
    sp(),
    successBox('Vision 2036 : A l\'horizon 2036, CGI SA aura consolide sa position de producteur industriel de reference en Afrique de l\'Ouest, avec 930 000 T/an de granulats METSO, 15 000 m2/an de dalles granite export, 60%+ d\'autoconsommation solaire, 134 emplois directs, et zero dette BIDC. Ce positionnement constitue la base d\'une relation de confiance durable avec la BIDC comme partenaire naturel des projets industriels verts de la CEDEAO.'),
    sp(),
  ];
}



