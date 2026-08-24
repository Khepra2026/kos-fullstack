import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '';

// ─── CHAPITRE 7 : PLAN OPÉRATIONNEL ──────────────────────────────────────
// Organisation de l'exploitation, maintenance, qualité, montée en puissance,
// gestion des risques opérationnels, réglementaires et logistiques

export function chapter7(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 7 — PLAN OPÉRATIONNEL'),
    sp(),
    body('Ce chapitre détaille l\'organisation opérationnelle de CGI SA sur la période 2026-2036. Il couvre la structure organisationnelle de l\'exploitation, les procédures de maintenance préventive et corrective, le système de management de la qualité, le plan de montée en puissance des trois lignes de production, et la gestion intégrée des risques opérationnels, réglementaires et logistiques. Chaque élément est dimensionné pour atteindre la capacité cible de 795 000 tonnes par an en 2028, avec une disponibilité équipement de 80 % et un taux de conformité qualité LNBTP supérieur à 98 %.'),
    sp(),
    ...section71(),
    ...section72(),
    ...section73(),
    ...section74(),
    ...section75(),
    pb(),
  ];
}

// ─── VII.1 ORGANISATION DE L'EXPLOITATION ────────────────────────────────
function section71(): (Paragraph | Table)[] {
  return [
    h2('VII.1 Organisation de l\'exploitation — Structure et effectifs'),
    sp(),
    body('L\'organisation de CGI SA repose sur un modèle matriciel : des lignes fonctionnelles (Production, Maintenance, Qualité, Logistique, HSE) coupent des lignes de production (Ligne 1, Ligne 2, Ligne 3, Unité Dalles). Ce modèle garantit à la fois la spécialisation technique et la cohérence des procédures à travers l\'ensemble du site.'),
    sp(),
    tbl(
      ['Direction / Service', 'Responsable', 'Effectif 2026', 'Effectif 2028', 'Effectif 2030', 'Rôle principal'],
      [
        ['Direction Générale', 'DG / Mandataire social', '1', '1', '1', 'Stratégie, reporting BIDC, relations institutionnelles'],
        ['Direction Technique', 'Directeur Technique (à recruter)', '1', '1', '1', 'Supervision production, maintenance, qualité'],
        ['Direction Commerciale', 'Directeur Commercial (à recruter)', '1', '1', '1', 'Développement clients, contrats, pricing'],
        ['Responsable HSE', 'Ingénieur HSE certifié IFC', '1', '1', '1', 'PGES, sécurité, environnement, reporting ESG'],
        ['Production — Ligne 1', 'Chef d\'équipe', '12', '12', '12', 'Concassage-criblage Ligne 1 — 250 t/h'],
        ['Production — Ligne 2', 'Chef d\'équipe', '0', '12', '12', 'Concassage-criblage Ligne 2 — 250 t/h'],
        ['Production — Ligne 3', 'Chef d\'équipe', '0', '12', '12', 'Concassage-criblage Ligne 3 — 250 t/h'],
        ['Production — Dalles', 'Chef d\'équipe dalles', '0', '0', '8', 'Scie, polissage, finition granite'],
        ['Maintenance', 'Responsable Maintenance', '5', '12', '15', 'Maintenance préventive/corrective — stock pièces'],
        ['Qualité / Laboratoire', 'Responsable Qualité', '2', '4', '5', 'Contrôles LNBTP — analyse granulométrie — certification'],
        ['Logistique / Transport', 'Responsable Logistique', '4', '10', '12', 'Flotte propre — planning livraisons — optimisation'],
        ['Administration / Comptabilité', 'Responsable Admin', '4', '6', '7', 'Comptabilité SYSCOHADA — paie — reporting BIDC'],
        ['Commercial / SAV', 'Commercial + 2 agents', '3', '8', '10', 'Prospection — suivi clients — réclamations'],
        ['Sécurité / Gardiennage', 'Chef de sécurité', '4', '8', '8', 'Surveillance site — contrôle accès — protocole'],
        ['TOTAL EMPLOIS DIRECTS', '—', '38', '87', '115', 'Objectif 85 en 2030 — dépassé en 2028'],
      ],
      [22, 22, 10, 10, 10, 26]
    ),
    sp(),
    body('Le plan de recrutement est calibré sur le déploiement des Programmes 1, 2 et 3. Les postes critiques (Directeur Technique, Directeur Commercial, Responsable HSE) doivent être pourvus dès T1 2026, car ils constituent des conditions préalables au tirage de la dette BIDC. Les opérateurs de Ligne 2 et Ligne 3 sont recrutés 6 mois avant la mise en service, pour permettre une formation complète sur la Ligne 1 existante.'),
    sp(),
    infoBox('Référence : Plan de recrutement détaillé — Annexe C du Modèle Financier Excel. Partenariat formation : CNAM Togo (opérateurs), METSO Accra (maintenance), Breton SpA (unité dalles). Budget formation intégré dans l\'OPEX (45 M FCFA/an).'),
    sp(),
  ];
}

// ─── VII.2 MAINTENANCE ET GESTION DE LA QUALITÉ ───────────────────────────
function section72(): (Paragraph | Table)[] {
  return [
    h2('VII.2 Maintenance préventive et gestion de la qualité'),
    sp(),
    h3('VII.2.1 Programme de maintenance préventive METSO'),
    body('La maintenance des équipements METSO suit un calendrier préventif structuré, établi en partenariat avec le bureau régional de METSO Accra. Le programme comprend : inspections visuelles quotidiennes, contrôles hebdomadaires (vibrations, température, pression d\'huile), révisions trimestrielles (remplacement des pièces d\'usure), et arrêts annuels pour révision générale (5 jours). Le taux de disponibilité cible de 80 % est conditionné par la rigueur de ce programme.'),
    sp(),
    tbl(
      ['Fréquence', 'Actions', 'Responsable', 'Durée estimée', 'Coût indicatif'],
      [
        ['Quotidien', 'Inspection visuelle — graissage — nettoyage — relevés compteurs', 'Opérateur Ligne', '30 min/ligne', 'Intégré masse salariale'],
        ['Hebdomadaire', 'Contrôle vibrations — température roulements — pression hydraulique — filtres', 'Technicien Maintenance', '2h/ligne', 'Intégré masse salariale'],
        ['Mensuel', 'Analyse huile — ajustement alignement — contrôle courroies — calibration capteurs', 'Responsable Maintenance', '4h/ligne', 'Intégré + consommables'],
        ['Trimestriel', 'Remplacement pièces d\'usure (mâchoires, liners, cribles) — révision électrique', 'METSO Accra + équipe interne', '1-2 jours/ligne', '120 M FCFA/an'],
        ['Annuel', 'Arrêt complet — révision générale — remplacement composants majeurs — peinture', 'METSO + sous-traitants', '5 jours', '180 M FCFA/an'],
      ],
      [14, 32, 20, 14, 20]
    ),
    sp(),
    h3('VII.2.2 Système de management de la qualité LNBTP'),
    body('La certification LNBTP (Laboratoire National du Bâtiment et des Travaux Publics du Togo) avec une masse volumique de 2,63 g/cm³ constitue l\'atout qualité différenciant de CGI SA. Le système de management de la qualité assure le renouvellement annuel de cette certification et le respect des normes NF EN 1097-6, NF EN 12620 et NF P 18-304.'),
    sp(),
    tbl(
      ['Étape qualité', 'Fréquence', 'Méthode', 'Responsable', 'Coût (M FCFA/an)'],
      [
        ['Contrôle granulométrie entrée', 'Chaque lot', 'Tamisage analytique — conformité NF EN 933-2', 'Laboratoire interne', '5'],
        ['Test masse volumique', 'Chaque production journalière', 'Méthode hydrostatique — NF EN 1097-6', 'Laboratoire interne', '3'],
        ['Test résistance compression', 'Hebdomadaire', 'Presse 2 000 kN — conformité NF EN 1097-6', 'Laboratoire interne', '4'],
        ['Analyse propreté (LA)', 'Mensuel', 'Micro-Deval — conformité NF EN 1097-1', 'Laboratoire externe', '6'],
        ['Audit LNBTP', 'Annuel', 'Audit complet — renouvellement certificat', 'LNBTP Togo', '15'],
        ['Formation qualité opérateurs', 'Trimestriel', 'Sensibilisation NF — contrôle visuel — traçabilité', 'Responsable Qualité', '8'],
      ],
      [22, 14, 26, 20, 18]
    ),
    sp(),
    successBox('Objectif qualité : Taux de conformité LNBTP > 98 % dès 2028 — zéro rejet client lié à la qualité. Chaque non-conformité est enregistrée, analysée (méthode 5M) et traitée dans un délai de 48 heures. Les lots non conformes sont isolés, retraités ou vendus à prix réduit pour des applications non structurales.'),
    sp(),
  ];
}

// ─── VII.3 MONTÉE EN PUISSANCE ────────────────────────────────────────────
function section73(): (Paragraph | Table)[] {
  return [
    h2('VII.3 Plan de montée en puissance — 2026-2029'),
    sp(),
    body('La montée en puissance de CGI SA s\'étale sur 4 ans, de 2026 à 2029. Chaque phase est calibrée sur l\'installation d\'une nouvelle ligne METSO, l\'optimisation de la Ligne 1 existante, et le développement commercial nécessaire pour écouler la production. Le plan ci-dessous intègre les délais de livraison METSO (6-8 mois), les délais de mise en service (2-3 mois) et la période d\'optimisation (3-6 mois).'),
    sp(),
    tbl(
      ['Phase', 'Période', 'Capacité active', 'Production cible', 'Actions clés', 'Investissement (M FCFA)'],
      [
        ['Phase 0 — Optimisation Ligne 1', 'T1-T2 2026', 'Ligne 1 (250 t/h)', '265 000 T', 'Plan minage 3×3 m — maintenance préventive — SOPs — recrutement cadres', '80'],
        ['Phase 1 — Ligne 2', 'T3 2026-T2 2027', 'Lignes 1+2 (500 t/h)', '530 000 T', 'Commande METSO — génie civil — installation — mise en service — formation', '3 486'],
        ['Phase 2 — Ligne 3', 'T3-T4 2027', 'Lignes 1+2+3 (750 t/h)', '795 000 T', 'Installation Ligne 3 — intégration logistique — développement Bénin', '0 (inclus Tranche A)'],
        ['Phase 3 — Unité dalles', 'T1-T2 2028', '3 lignes + dalles', '795 000 T + 5 000 m²', 'Installation scie Breton — polisseuse — pont roulant — formation', '3 277'],
        ['Phase 4 — Solaire + stabilisation', 'T2-T3 2028', '3 lignes + dalles + solaire', '795 000 T + 15 000 m²', 'Extension PV 4 MWc — batteries 8 MWh — optimisation régime croisière', '1 712'],
        ['Phase 5 — Régime croisière', 'T4 2028-2036', 'Ecosystème complet', '795 000 T/an + 15 000 m²/an', 'Maintenance planifiée — amélioration continue — expansion Phase 2', 'CAPEX maintenance'],
      ],
      [18, 16, 16, 14, 24, 12]
    ),
    sp(),
    body('La courbe de montée en puissance suit une logique de « Vague d\'investissement » : chaque nouvelle ligne est financée par les cash-flows générés par les lignes précédentes, complétés par le tirage de la dette BIDC. Cette structure réduit le risque d\'endettement précoce et permet d\'ajuster les investissements aux conditions de marché réelles.'),
    sp(),
    alertBox('Point de vigilance opérationnelle : La montée en puissance de la Ligne 2 (T2 2027) est le jalon critique du projet. Tout retard de livraison METSO (> 3 mois) ou de mise en service (> 2 mois) affecterait la production 2027 et le remboursement de la dette dès 2029. CGI SA a sécurisé ce risque par : (i) clauses de pénalités contractuelles METSO, (ii) stock pièces critiques 420 M FCFA, (iii) plan de formation anticipé des opérateurs sur Ligne 1.'),
    sp(),
  ];
}

// ─── VII.4 GESTION DES RISQUES OPÉRATIONNELS ─────────────────────────────
function section74(): (Paragraph | Table)[] {
  return [
    h2('VII.4 Gestion des risques opérationnels et logistiques'),
    sp(),
    body('La gestion des risques opérationnels de CGI SA repose sur la méthodologie ISO 31000 (2018), adaptée aux carrières de granulats en Afrique de l\'Ouest. Les risques sont identifiés, quantifiés, mitigés et monitorés selon un cycle continu Plan-Do-Check-Act. Le budget total de mitigation opérationnelle s\'élève à 340 M FCFA par an.'),
    sp(),
    h3('VII.4.1 Risques opérationnels et mitigation'),
    sp(),
    tbl(
      ['Risque opérationnel', 'Probabilité', 'Impact', 'Mitigation', 'Budget (M FCFA/an)', 'Responsable'],
      [
        ['Panne équipement critique > 7 jours', 'Moyenne', 'Élevé', 'Stock pièces 420 M + SAV METSO Accra + maintenance préventive IoT', '120', 'Responsable Maintenance'],
        ['Pénurie transporteurs / hausse carburant', 'Élevée', 'Élevé', 'Flotte propre 18 camions + partenariats multi-transporteurs + optimisation GPS', '180', 'Responsable Logistique'],
        ['Délais paiement ARMP > 90 j', 'Élevée', 'Critique', 'LC BFR 2 541 M + relances structurées + avocat recouvrement', '45', 'DG + Directeur Commercial'],
        ['Saisonnalité BTP / baisse demande', 'Moyenne', 'Moyen', 'Diversification dalles + contrats cadre + stock tampon saisonnier', '35', 'Directeur Commercial'],
        ['Retard livraison METSO > 6 mois', 'Moyenne', 'Élevé', 'Clauses pénalités + sourcing Sandvik + planning buffer', '25', 'Directeur Technique'],
        ['Aléa climatique (inondation site)', 'Faible', 'Moyen', 'Drainage + assurance multi-risques + stock tampon 7 jours', '20', 'Responsable HSE'],
      ],
      [22, 12, 10, 30, 14, 12]
    ),
    sp(),
    h3('VII.4.2 Optimisation logistique et gestion de la flotte'),
    body('La logistique constitue le deuxième poste de coût après l\'énergie (1 500 FCFA/T en flotte propre). CGI SA a structuré une stratégie logistique en trois volets :'),
    sp(),
    bullet('Flotte propre : 18 camions bennes HOWO 8×4 (35 m³) acquis dans la Tranche A, couvrant 60 % du volume transporté. Cette verticalisation partielle réduit la dépendance aux transporteurs tiers et maîtrise les délais de livraison.'),
    bullet('Optimisation itinéraires : système GPS + planification des tournées en fonction des commandes clients, réduisant les kilomètres à vide de 15 % et la consommation carburant de 12 %.'),
    bullet('Partenariats logistiques : contrats cadre avec 2 transporteurs régionaux pour les pointes de demande (saison des chantiers, marchés publics), avec tarifs négociés à l\'année et clauses de disponibilité.'),
    sp(),
    infoBox('Benchmark logistique : Le coût de transport granulats en Afrique de l\'Ouest varie de 1 200 à 3 500 FCFA/T selon la distance et le mode. À 1 500 FCFA/T (flotte propre) pour 150 km, CGI SA se situe dans la fourchette basse du benchmark, confirmant l\'efficacité de sa stratégie de verticalisation partielle. Source : Enquête KHEPRA EXPERTS auprès de 12 transporteurs miniers au Togo et au Bénin (Q4 2024).'),
    sp(),
  ];
}

// ─── VII.5 GESTION DES RISQUES RÉGLEMENTAIRES ────────────────────────────
function section75(): (Paragraph | Table)[] {
  return [
    h2('VII.5 Gestion des risques réglementaires et conformité'),
    sp(),
    body('La conformité réglementaire est un axe critique de la gestion des risques de CGI SA. Le non-respect du Code Minier Togolais, des normes OHADA ou des exigences BIDC peut entraîner la suspension de la production, le blocage du financement ou des sanctions pénales. CGI SA a mis en place une veille juridique permanente, assurée par un cabinet OHADA spécialisé et un correspondant local auprès de la DGMG.'),
    sp(),
    tbl(
      ['Réglementation', 'Exigence', 'Statut CGI SA', 'Action requise', 'Budget (M FCFA/an)', 'Échéance'],
      [
        ['Code Minier Togolais', 'Permis valide — réhabilitation — redevances', 'Permis DGMG valide 2023-2033', 'Renouvellement 2033 — veille législative', '35', '2033'],
        ['Acte Uniforme OHADA', 'Gouvernance CA/Comité Audit/DG — SYSCOHADA', 'Conforme — CA 5 membres — Comité Audit 3 membres', 'Maintien conformité — publication comptes < 6 mois', '15', 'Permanent'],
        ['Certification LNBTP', 'Masse volumique > 2,50 g/cm³ — NF EN 1097-6', 'Certifié 2,63 g/cm³ — renouvellement annuel', 'Audit interne — laboratoire interne — renouvellement', '15', 'Annuel'],
        ['IFC Performance Standards', 'PGES — audit externe — reporting', 'PGES en cours de finalisation', 'Audit pré-investissement — reporting semestriel', '45', 'T2 2026'],
        ['BIDC Covenants', 'DSCR > 1,3x — Gearing < 3x — Liquidité > 1,2x', 'DSCR 1,85x moyen — Gearing 1,90x (2028)', 'Monitoring trimestriel — reporting au comité de crédit', '10', 'Trimestriel'],
        ['Fiscalité Togo', 'IS 27 % — TVA 18 % — redevances minières', 'Conforme — comptes certifiés', 'Déclarations mensuelles — optimisation fiscale légale', '8', 'Mensuel'],
      ],
      [20, 28, 22, 22, 8, 10]
    ),
    sp(),
    body('La veille juridique permanente couvre les évolutions du Code Minier (révision prévue 2027), les amendements à l\'Acte Uniforme OHADA, et les nouvelles directives de la BCEAO en matière de change et de crédit. Le budget veille juridique est de 25 M FCFA par an, incluant les honoraires du cabinet conseil et les frais de déplacement des représentants auprès des administrations.'),
    sp(),
    successBox('Conclusion plan opérationnel : CGI SA dispose d\'un plan opérationnel complet, calibré sur les standards industriels internationaux (METSO, ISO 31000, ISO 9001, ISO 14001) et adapté aux réalités du terrain togolais. La montée en puissance progressive (265 000 → 530 000 → 795 000 T/an), la maintenance préventive structurée, la gestion de la qualité LNBTP et la maîtrise des risques opérationnels garantissent la capacité de CGI SA à tenir ses engagements de production et de livraison, pierre angulaire de la bancabilité du projet.'),
    sp(),
  ];
}



