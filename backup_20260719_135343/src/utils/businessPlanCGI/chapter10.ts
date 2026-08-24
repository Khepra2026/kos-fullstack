import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '';

// ─── CHAPITRE 10 : STRUCTURE DE FINANCEMENT ──────────────────────────────
// Dette senior, fonds propres, quasi-fonds propres, levier financier,
// covenants, stratégie BAD/BIDC/IFC/fonds impact

export function chapter10(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 10 — STRUCTURE DE FINANCEMENT'),
    sp(),
    body('Ce chapitre détaille la structure de financement de CGI SA pour la période 2026-2036. Il couvre la demande de dette senior BIDC, l\'apport en fonds propres historique des actionnaires, les covenants contractuels, le cash waterfall, le plan d\'amortissement détaillé, et la stratégie de désendettement. La structure proposée est 100 % dette senior, alignée sur la politique BIDC pour les projets industriels de la CEDEAO à fort impact de développement. Aucun apport en fonds propres complémentaire n\'est requis : les 3 470 M FCFA déjà engagés par les actionnaires lors de la phase pilote constituent la preuve tangible de leur engagement.'),
    sp(),
    ...section101(),
    ...section102(),
    ...section103(),
    ...section104(),
    ...section105(),
    pb(),
  ];
}

// ─── X.1 STRUCTURE DU FINANCEMENT ────────────────────────────────────────
function section101(): (Paragraph | Table)[] {
  return [
    h2('X.1 Structure du financement — Sources et conditions'),
    sp(),
    body('CGI SA structure son financement de manière à ce que chaque franc emprunté serve un objectif industriel mesurable. La demande de 11 440 M FCFA auprès de la BIDC se décompose en un prêt d\'investissement de 8 899 M FCFA pour les quatre programmes industriels (Tranches A, B, C et D), et une ligne de crédit BFR de 2 541 M FCFA pour sécuriser le cycle d\'exploitation. L\'apport des promoteurs est validé par : (i) 3 470 M FCFA de fonds propres historiques investis entre 2023 et 2025, dont (ii) 2 156 M FCFA en actifs corporels existants (inventaire certifié par expert-comptable indépendant) représentant la base industrielle opérationnelle : équipements METSO Ligne 1, excavateurs SANY SY335C, chargeuses, dumpers HOWO, foreuses Kaishan et génie civil du site. Cette valorisation renforcée de l\'apport promoteurs démontre une capacité de mise de fonds supérieure aux exigences standard des comités d\'investissement BIDC.'),
    sp(),
    tbl(
      ['Source de financement', 'Montant (M FCFA)', 'Part (%)', 'Nature', 'Utilisation'],
      [
        ['Fonds propres CGI SA — Cash investi (2023-2025)', '1 314', '8,8 %', 'Déjà réalisé — non remboursable', 'Frais de constitution — études — R&D géologique — BFR phase pilote'],
        ['Actifs corporels existants — Matériel certifié', '2 156', '14,5 %', 'Déjà acquis — inventaire certifié', 'Ligne 1 METSO — excavateurs — chargeuses — dumpers — foreuses — génie civil'],
        ['TOTAL APPORT PROMOTEURS (fonds propres)', '3 470', '23,3 %', '100 % apporté — preuve d\'engagement', 'Phase pilote complète'],
        ['Dette senior BIDC — Prêt d\'investissement', '8 899', '59,6 %', '8 % / 8 ans / différé capital 24 mois', 'Tranches A+B+C+D — Programmes 1-2-3 + Infrastructure'],
        ['Dette senior BIDC — Ligne de crédit BFR', '2 541', '17,1 %', '8 % / renouvelable / remb. 2030-2034', 'BFR structurel 2027-2036 — stocks + créances'],
        ['TOTAL FINANCEMENT BIDC (nouveau)', '11 440', '76,7 %', '100 % dette senior — taux fixe', '2026-2036'],
        ['TOTAL INVESTISSEMENT CGI SA (global)', '14 910', '100 %', '—', 'Fonds propres + dette senior'],
      ],
      [28, 14, 10, 22, 26]
    ),
    sp(),
    h3('X.1.1 Inventaire des actifs existants — Apport des promoteurs'),
    body('Conformément à la directive BIDC pour les projets industriels, CGI SA a procédé à l\'évaluation indépendante de ses actifs corporels existants. Cette évaluation, réalisée par un cabinet d\'expertise comptable indépendant accrédité par l\'ONECCA Togo, confirme une valeur nette comptable de 2 156 M FCFA. Ce montant est inscrit au bilan de la société et renforce significativement la solvabilité apparente du dossier de financement.'),
    sp(),
    tbl(
      ['Catégorie d\'actif', 'Désignation', 'Valeur brute (M FCFA)', 'Amort. cumulé (M FCFA)', 'Valeur nette (M FCFA)', 'État'],
      [
        ['Équipements METSO', 'Concasseur C120 + HP300 + CVB 2060 + alimentateurs + convoyeurs', '850', '120', '730', 'Opérationnel — Ligne 1'],
        ['Engins miniers', 'Excavateurs SANY SY335C (×2) + chargeuses SANY (×2)', '490', '70', '420', 'Opérationnel'],
        ['Flotte minière', 'Dumpers HOWO 6×4 (×4) + camions bennes (×6)', '420', '65', '355', 'Opérationnel'],
        ['Foreuses', 'Kaishan DTH (×3) + accessoires + pièces', '220', '35', '185', 'Opérationnel'],
        ['Génie civil', 'Fondations — plateformes — pistes — drainage — génie électrique', '380', '55', '325', 'Permanent'],
        ['Groupe électrogène', '500 kVA diesel + tableaux électriques', '120', '15', '105', 'Opérationnel'],
        ['Autres', 'Mobilier, matériel informatique, outillage, stock pièces initiales', '75', '39', '36', 'Inventorié'],
        ['TOTAL ACTIFS CORPORELS EXISTANTS', '—', '2 555', '399', '2 156', 'Certifié ONECCA Togo'],
      ],
      [18, 32, 16, 14, 12, 8]
    ),
    sp(),
    infoBox('Référence apport promoteurs : La valeur nette des actifs existants (2 156 M FCFA) représente 24,2 % du CAPEX total demandé (8 899 M FCFA). Ce ratio de contribution en nature/fonds propres est supérieur au seuil standard BIDC de 20 % pour les projets industriels verts de la CEDEAO. L\'inventaire certifié est disponible en Annexe du dossier de financement. Source : Cabinet expertise comptable indépendant — ONECCA Togo — Rapport d\'évaluation des actifs CGI SA, 2025.'),
    sp(),
    body('Le ratio dette/fonds propres (Gearing initial) de 3,3x est conforme aux pratiques BIDC pour les projets industriels de première montée en capacité. Ce ratio décroît rapidement : 1,90x en 2028, 0,80x en 2030, et 0,00x en 2034. La structure de financement est donc conservatrice à moyen terme.'),
    sp(),
    infoBox('Référence BIDC : Conditions de financement 2024 — projets industriels CEDEAO. Taux fixe 8 % sur 8 ans, différé capital 24 mois, amortissement linéaire 6 ans. Gearing maximum 3,0x. DSCR minimum 1,3x. Source : bidc.org — Conditions de financement publiées 2024.'),
    sp(),
  ];
}

// ─── X.2 COVENANTS ET GARDE-FOUS ─────────────────────────────────────────
function section102(): (Paragraph | Table)[] {
  return [
    h2('X.2 Covenants contractuels et garde-fous financiers'),
    sp(),
    body('Les covenants BIDC sont des garde-fous contractuels qui protègent à la fois le prêteur et l\'emprunteur. CGI SA s\'engage à respecter l\'intégralité des covenants suivants, contrôlés trimestriellement par le Comité d\'Audit et transmis au comité de crédit BIDC dans les 45 jours suivant la clôture de chaque trimestre.'),
    sp(),
    tbl(
      ['Covenant', 'Seuil contractuel', 'Valeur 2028', 'Valeur 2030', 'Valeur 2034', 'Fréquence monitoring'],
      [
        ['DSCR (EBITDA / Service dette)', '≥ 1,3x', '1,54x', '1,67x', '2,71x', 'Trimestriel'],
        ['Gearing (Dette / Capitaux propres)', '≤ 3,0x', '1,90x', '0,80x', '0,08x', 'Annuel'],
        ['Liquidité courante (Actif circulant / Passif circulant)', '≥ 1,2x', '1,32x', '1,38x', '2,12x', 'Trimestriel'],
        ['BFR / CA', '≤ 45 % (indicatif)', '41,7 %', '37,9 %', '35,2 %', 'Mensuel'],
        ['Capex Intensity (CAPEX / CA moyen)', '—', '1,27x (2027)', '0,00x', '0,00x', 'Annuel'],
        ['Délai publication comptes certifiés', '≤ 6 mois', '< 6 mois', '< 5 mois', '< 4 mois', 'Annuel'],
      ],
      [28, 16, 12, 12, 12, 20]
    ),
    sp(),
    body('En sus des covenants BIDC, CGI SA s\'est dotée de garde-fous internes supérieurs aux exigences contractuelles :'),
    sp(),
    bullet('Réserve de trésorerie obligatoire : 6 mois de service de la dette (1 400 M FCFA) conservés en trésorerie disponible à compter de 2029.'),
    bullet('Seuil d\'alerte DSCR interne : 1,5x (au lieu de 1,3x contractuel), déclenchant un plan de réduction discrétionnaire des dépenses non critiques.'),
    bullet('Seuil d\'alerte BFR : 45 % du CA, déclenchant un audit des créances clients et un renforcement du recouvrement.'),
    bullet('Comité de crédit interne : réunion mensuelle (DG + CFO + Responsable Commercial) pour examiner le respect des covenants et anticiper les écarts.'),
    sp(),
    alertBox('Point de vigilance covenant : Les années 2028-2029 présentent un DSCR resserré (1,50-1,54x), juste au-dessus du covenant BIDC de 1,3x. Cette fenêtre de vulnérabilité est structurelle à la phase de montée en capacité. Elle est mitigée par (i) le différé de remboursement capital de 24 mois, (ii) la LC BFR de 2 541 M FCFA, et (iii) le fonds de contingence de 300 M FCFA. Les simulations de stress test confirment que le DSCR reste supérieur au covenant dans tous les scénarios pessimistes individuels.'),
    sp(),
  ];
}

// ─── X.3 PLAN D'AMORTISSEMENT ──────────────────────────────────────────────
function section103(): (Paragraph | Table)[] {
  return [
    h2('X.3 Plan d\'amortissement détaillé — Prêt CAPEX + LC BFR'),
    sp(),
    body('Le plan d\'amortissement de la dette BIDC est présenté ci-dessous. Chaque annuité de 1 483,17 M FCFA a été calibrée sur la capacité de génération de cash de CGI SA. Le différé de 24 mois (2027-2028) permet le déploiement complet des quatre programmes industriels avant le démarrage du remboursement en capital. Le remboursement de la LC BFR démarre en 2030 et s\'étale sur 5 ans.'),
    sp(),
    tbl(
      ['Année', 'Capital CAPEX début', 'Capital BFR début', 'Intérêts totaux', 'Remb. CAPEX', 'Remb. BFR', 'Service total', 'Capital fin', 'DSCR'],
      [
        ['2027 (différé)', '8 899', '0', '712', '0', '0', '712', '8 899', 'N/A'],
        ['2028 (différé)', '8 899', '2 541', '916', '0', '0', '916', '8 899', '5,16x'],
        ['2029', '8 899', '2 541', '916', '1 483', '0', '2 399', '7 416', '1,97x'],
        ['2030', '7 416', '2 541', '787', '1 483', '508', '2 778', '5 933', '1,90x'],
        ['2031', '5 933', '2 033', '636', '1 483', '508', '2 627', '4 450', '2,00x'],
        ['2032', '4 450', '1 525', '477', '1 483', '508', '2 468', '2 967', '2,14x'],
        ['2033', '2 967', '1 017', '318', '1 483', '508', '2 309', '1 484', '2,29x'],
        ['2034', '1 484', '509', '159', '1 484', '509', '2 152', '0', '2,46x'],
        ['TOTAL', '—', '—', '4 921', '8 899', '2 541', '16 361', '—', '—'],
      ],
      [10, 14, 14, 12, 12, 10, 12, 12, 14]
    ),
    sp(),
    h3('X.3.1 Cash waterfall — Priorité des flux'),
    body('Le cash waterfall définit la priorité d\'allocation des cash-flows opérationnels. Cette structure protège le service de la dette et crée une réserve de trésorerie avant toute distribution aux actionnaires.'),
    sp(),
    tbl(
      ['Rang', 'Priorité', 'Description', 'Montant indicatif 2028 (M FCFA)'],
      [
        ['1', 'OPEX et charges courantes', 'Énergie, maintenance, main-d\'œuvre, explosifs', '2 243'],
        ['2', 'Variation BFR (besoin)', 'Stocks, créances clients, dettes fournisseurs', '-1 635'],
        ['3', 'CAPEX maintenance', 'Remplacement pièces, petits équipements', '-120'],
        ['4', 'Service dette BIDC', 'Intérêts + remboursement capital (2029+)', '-1 192'],
        ['5', 'Impôt sur les sociétés', 'IS 27 % — Code Général des Impôts Togo', '-704'],
        ['6', 'Réserve trésorerie obligatoire', '6 mois de service dette — garde-fou interne', '-700'],
        ['7', 'Fonds de contingence', '1 % du CA — événements imprévus', '-70'],
        ['8', 'Distribution actionnaires', 'Dividendes — après tous les postes ci-dessus', 'Variable'],
      ],
      [8, 20, 40, 32]
    ),
    sp(),
  ];
}

// ─── X.4 STRATÉGIE DE DÉSENDETTEMENT ───────────────────────────────────────
function section104(): (Paragraph | Table)[] {
  return [
    h2('X.4 Stratégie de désendettement et exit strategy'),
    sp(),
    body('La stratégie de sortie repose sur un désendettement méthodique et un autofinancement progressif. Aucun refinancement externe n\'est prévu avant 2034. Les capitaux propres passent de 5 960 M FCFA en 2028 à 25 300 M FCFA en 2036, soit une multiplication par 4,2. À l\'horizon 2036, CGI SA dispose d\'une trésorerie cumulée de 21 500 M FCFA, permettant de :'),
    sp(),
    bullet('Rembourser intégralement la dette BIDC dès 2034, deux ans avant l\'échéance contractuelle.'),
    bullet('Financer en fonds propres toute expansion future (Phase 2 : ligne dalles 2, BESS, concassage tertiaire) sans recours à de nouveaux emprunts.'),
    bullet('Constituer une réserve stratégique de 5 000 M FCFA pour les cycles défavorables du BTP.'),
    bullet('Distribuer des dividendes aux actionnaires à partir de 2032, après constitution des réserves obligatoires.'),
    sp(),
    body('Le gearing simulé évolue de 1,90x en 2028 à 0,08x en 2034, puis 0,00x en 2036. Cette trajectoire de désendettement rapide confirme la capacité de CGI SA à générer des cash-flows excédentaires et à honorer ses engagements envers la BIDC sans tension.'),
    sp(),
    tbl(
      ['Année', 'Capitaux propres (M FCFA)', 'Dette BIDC (M FCFA)', 'Gearing', 'Trésorerie cumulée (M FCFA)', 'Dividendes potentiels (M FCFA)'],
      [
        ['2028', '5 960', '11 440', '1,90x', '3 836', '0'],
        ['2029', '7 921', '9 957', '1,18x', '4 395', '0'],
        ['2030', '10 299', '6 850', '0,80x', '4 948', '0'],
        ['2032', '15 449', '2 492', '0,31x', '7 794', '0'],
        ['2034', '21 409', '0', '0,00x', '12 823', '500'],
        ['2036', '25 300', '0', '0,00x', '21 500', '1 200'],
      ],
      [10, 18, 18, 12, 22, 20]
    ),
    sp(),
  ];
}

// ─── X.5 STRATÉGIE INSTITUTIONNELLE ───────────────────────────────────────
function section105(): (Paragraph | Table)[] {
  return [
    h2('X.5 Stratégie de financement institutionnel — BIDC, BAD, IFC, fonds impact'),
    sp(),
    body('Au-delà du financement BIDC, CGI SA a structuré une stratégie de diversification des sources de financement institutionnel pour les phases d\'expansion futures (2029-2036) et pour le renforcement du bilan. Cette stratégie repose sur quatre piliers :'),
    sp(),
    h3('X.5.1 BIDC — Partenariat stratégique principal'),
    body('La BIDC constitue le partenaire financier naturel de CGI SA en raison de sa mission de financement du développement industriel dans la CEDEAO. Au-delà du prêt initial de 11 440 M FCFA, CGI SA envisage d\'accéder aux lignes de financement complémentaires de la BIDC :'),
    sp(),
    bullet('Ligne de financement des PME industrielles vertes : taux concessionnel 6,5 % pour les projets certifiés Banque Verte ( Phase 2 solaire 2029+).'),
    bullet('Garantie partielle de risque : couverture à 50 % des risques politique et de change pour les investisseurs étrangers potentiels.'),
    bullet('Assistance technique : cofinancement des études de faisabilité et des audits ESG (programme BIDC-UE).'),
    sp(),
    h3('X.5.2 BAD — Financement infrastructure et industrialisation'),
    body('La Banque Africaine de Développement (BAD) intervient sur les grands projets d\'infrastructure régionale. CGI SA pourrait solliciter le BAD pour :'),
    sp(),
    bullet('Financement de la route d\'accès Siyimé-Lomé (upgrade en 2×2 voies) : projet d\'infrastructure régionale bénéficiant à d\'autres utilisateurs.'),
    bullet('Programme régional de développement des carrières : cofinancement avec la DGMG pour l\'aménagement de zones industrielles minières.'),
    bullet('Fonds africain de développement (FAD) : subventions pour les composantes ESG et communautaires du projet.'),
    sp(),
    h3('X.5.3 IFC — Financement direct et advisory'),
    body('L\'International Finance Corporation (IFC), bras privé du Groupe Banque Mondiale, pourrait intervenir sous deux formes :'),
    sp(),
    bullet('Prêt direct : participation au financement de la Phase 2 (ligne dalles 2, BESS, concassage tertiaire) avec des conditions alignées sur les IFC Performance Standards.'),
    bullet('Advisory services : assistance à la structuration du PGES, au renforcement de la gouvernance ESG, et à la préparation aux audits de conformité.'),
    bullet('Mobilisation d\'investisseurs : mise en relation avec des fonds d\'infrastructure africains (African Infrastructure Investment Fund, Africa50).'),
    sp(),
    h3('X.5.4 Fonds d\'impact et financement vert'),
    body('La montée en puissance du financement vert en Afrique offre à CGI SA des opportunités de diversification de son tableau de financement :'),
    sp(),
    tbl(
      ['Source de financement vert', 'Type', 'Montant potentiel', 'Conditions', 'Échéance'],
      [
        ['Green Climate Fund (GCF)', 'Subvention + prêt concessionnel', '500 M FCFA', 'Alignement NDC Togo — réduction GES 35 %', '2028-2029'],
        ['Fonds UEMOA pour l\'énergie durable', 'Prêt à taux bonifié', '300 M FCFA', 'Projet solaire > 2 MWc — étude d\'impact', '2027-2028'],
        ['Investisseurs impact africains', 'Fonds propres ou quasi-fonds propres', '1 000 M FCFA', 'Minoritaire — gouvernance — reporting ESG', '2029-2030'],
        ['Carbon credits (Verra/VCS)', 'Vente crédits carbone', '50 M FCFA/an', 'Certification VCS — monitoring 3 ans', 'Dès 2029'],
      ],
      [25, 20, 18, 22, 15]
    ),
    sp(),
    successBox('Conclusion financement : La structure de financement de CGI SA est conservatrice à moyen terme (Gearing 1,90x → 0,00x en 6 ans) et créative à long terme (diversification BIDC/BAD/IFC/fonds impact). Le désendettement complet dès 2034, deux ans avant l\'échéance contractuelle, témoigne de la capacité de génération de cash-flows du projet. Le comité de crédit BIDC est invité à considérer cette structure comme adaptée au profil de risque/rendement d\'un projet minier industriel vert en Afrique de l\'Ouest.'),
    sp(),
  ];
}



