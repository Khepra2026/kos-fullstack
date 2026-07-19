import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '';

// ─── CHAPITRE 6 : ESG ET DÉVELOPPEMENT DURABLE ────────────────────────────
// Consolidation des éléments ESG dispersés dans les chapitres précédents
// Conformité IFC Performance Standards, Principes de l'Équateur, Banque Verte BIDC

export function chapter6(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 6 — ESG ET DÉVELOPPEMENT DURABLE'),
    sp(),
    body('Ce chapitre présente la stratégie ESG (Environmental, Social and Governance) de CORNERSTONE GROUP INTERNATIONAL (CGI) SA. Il détaille la conformité aux IFC Performance Standards, aux Principes de l\'Équateur IV, aux critères Banque Verte de la BIDC, et au Code Minier Togolais. La démarche ESG de CGI SA n\'est pas un exercice de conformité formelle : elle constitue un levier de différenciation concurrentielle, de réduction des coûts opérationnels et d\'accès aux financements verts. Le budget ESG annuel de 193 M FCFA (2,1 % du chiffre d\'affaires) est supérieur à la moyenne des projets miniers africains (1,3 %), confirmant le positionnement Banque Verte du projet.'),
    sp(),
    ...section61(),
    ...section62(),
    ...section63(),
    ...section64(),
    ...section65(),
    ...section66(),
    pb(),
  ];
}

// ─── VI.1 GOUVERNANCE ESG ────────────────────────────────────────────────
function section61(): (Paragraph | Table)[] {
  return [
    h2('VI.1 Gouvernance ESG — Architecture et responsabilités'),
    sp(),
    body('CGI SA a structuré sa gouvernance ESG en conformité avec l\'IFC Performance Standard 1 (Assessment and Management of Environmental and Social Risks). Un Comité ESG, rattaché directement au Conseil d\'Administration, pilote la stratégie environnementale et sociale. Ce comité est présidé par un membre indépendant du CA et comprend le Responsable HSE, le Directeur Général et un représentant des communautés locales de Siyimé.'),
    sp(),
    tbl(
      ['Organe ESG', 'Composition', 'Rôle', 'Référence réglementaire'],
      [
        ['Comité ESG', '4 membres — CA + HSE + DG + représentant communauté', 'Stratégie ESG, validation PGES, suivi des indicateurs, reporting annuel', 'IFC PS 1 — Art. 8 et s.'],
        ['Responsable HSE', 'Ingénieur qualifié — formation IFC certifiée', 'Implémentation PGES, reporting environnemental, interface régulateur', 'IFC PS 1-2-3 — Code Minier Art. 87'],
        ['Auditeur externe ESG', 'Cabinet indépendant — accrédité IFC/GRI', 'Audit annuel — score ESG — recommandations d\'amélioration', 'IFC PS 1 — Norme ISO 14001'],
        ['Comité de suivi communautaire', '7 membres — village Siyimé + CGI SA + administration', 'Consultation FPIC, partage bénéfices, résolution des conflits', 'IFC PS 7 — Principes Équateur IV'],
      ],
      [22, 28, 30, 20]
    ),
    sp(),
    body('La séparation des pouvoirs entre le Comité ESG (stratégie), le Responsable HSE (exécution) et l\'auditeur externe (contrôle) garantit l\'indépendance et la crédibilité du reporting ESG. Les rapports annuels sont transmis au comité de crédit BIDC dans les 6 mois suivant la clôture de l\'exercice.'),
    sp(),
    infoBox('Référence : IFC Performance Standard 1 — « Assessment and Management of Environmental and Social Risks and Impacts », révision 2023. La gouvernance ESG de CGI SA suit le modèle « Three Lines of Defense » (COSO ERM Framework) adapté aux projets miniers africains.'),
    sp(),
  ];
}

// ─── VI.2 CONFORMITÉ IFC / BIDC BANQUE VERTE ──────────────────────────────
function section62(): (Paragraph | Table)[] {
  return [
    h2('VI.2 Conformité IFC Performance Standards et Banque Verte BIDC'),
    sp(),
    body('La conformité aux IFC Performance Standards constitue une condition préalable au financement BIDC et une exigence du label Banque Verte. CGI SA s\'engage à respecter l\'intégralité des 8 Performance Standards, avec un focus sur les standards 1 à 6, directement applicables au secteur minier. Le projet est classé en Catégorie B selon les Principes Équateur IV : projets avec des impacts environnementaux et sociaux limités, largement réversibles et pour lesquels des mesures de mitigation sont facilement disponibles.'),
    sp(),
    h3('VI.2.1 Matrice de conformité IFC Performance Standards'),
    sp(),
    tbl(
      ['IFC PS', 'Titre', 'Applicabilité CGI SA', 'Mesure concrète', 'Budget (M FCFA/an)', 'Échéance'],
      [
        ['PS 1', 'Évaluation et gestion des risques ESG', 'Applicable — évaluation complète', 'PGES documenté — audit externe annuel — comité de suivi ESG', '85', 'T2 2026'],
        ['PS 2', 'Conditions de travail', 'Applicable — 85 emplois directs', 'Recrutement local 80 % — formation CNAM — conformité OIT 87, 98, 138, 182', '45', 'Permanent'],
        ['PS 3', 'Efficacité des ressources et prévention de la pollution', 'Applicable — consommation énergétique', 'Centrale solaire 3-4 MWc — réduction GES 35 % — monitoring énergétique temps réel', 'Économie nette 280', 'T2 2028'],
        ['PS 4', 'Santé, sécurité et sécurité des communautés', 'Applicable — site proche village Siyimé', 'Clôture périmétrique 3 km — signalisation — protocole sécurité — infirmerie site', '35', 'T1 2027'],
        ['PS 5', 'Acquisition foncière et réinstallation involontaire', 'Non applicable', 'Site sur permis DGMG existant — aucun déplacement de population — confirmation juridique', '0', 'N/A'],
        ['PS 6', 'Conservation de la biodiversité', 'Applicable — gestion des eaux et reboisement', 'Reboisement 5 ha/an — gestion eaux process — bassin décantation 2 000 m³ — réhabilitation progressive', '35', 'Permanent'],
        ['PS 7', 'Peuples autochtones / communautés locales', 'Applicable — village Siyimé', 'Consultation FPIC — comité de suivi — partage bénéfices (emploi, infrastructure, santé)', '25', 'T1 2026'],
        ['PS 8', 'Patrimoine culturel', 'Faiblement applicable', 'Étude archéologique de surface — protocole chance find — aucun site identifié', '5', 'T1 2026'],
      ],
      [8, 24, 22, 28, 12, 6]
    ),
    sp(),
    h3('VI.2.2 Alignement critères Banque Verte BIDC'),
    sp(),
    body('La BIDC a annoncé que 30 % de son portefeuille de nouveaux projets d\'ici 2027 doit répondre aux critères « Banque Verte » : énergies renouvelables, efficacité énergétique, réduction des émissions de GES. Le Programme 3 (centrale solaire hybride 3-4 MWc) positionne CGI SA dans cette catégorie prioritaire. Les critères suivants sont satisfaits :'),
    sp(),
    bullet('Énergie renouvelable : la centrale solaire couvrira 60 % des besoins énergétiques du site d\'ici 2029, réduisant la dépendance aux groupes électrogènes diesel et aux achats EDM.'),
    bullet('Efficacité énergétique : les concasseurs METSO sont équipés de moteurs IE3 (haute efficacité énergétique) et de systèmes de récupération d\'énergie. Le rendement granulats de 65 % minimise les pertes et les rebroyages.'),
    bullet('Réduction GES : les émissions de CO2 sont réduites de 35 % par rapport à un scénario sans solaire, soit environ 1 200 tonnes de CO2 évitées par an à maturité.'),
    bullet('Gestion environnementale : le PGES conforme IFC PS 1-6 couvre l\'intégralité du cycle de vie du projet, de la construction à la réhabilitation post-exploitation.'),
    sp(),
    successBox('Conformité Banque Verte : CGI SA satisfait l\'intégralité des critères BIDC Banque Verte pour les projets industriels verts de la CEDEAO. Le label « Banque Verte » renforce la crédibilité du projet auprès des comités de crédit et ouvre l\'accès à des lignes de financement préférentielles (taux concessionnel, différé allongé, garanties partielles).'),
    sp(),
  ];
}

// ─── VI.3 GESTION ENVIRONNEMENTALE ────────────────────────────────────────
function section63(): (Paragraph | Table)[] {
  return [
    h2('VI.3 Gestion environnementale — Eau, air, sols et biodiversité'),
    sp(),
    h3('VI.3.1 Gestion de l\'eau'),
    body('Le site de Siyimé dispose d\'un forage profond de 120 mètres, indépendant du réseau communal d\'eau. Cette autonomie garantit la continuité de l\'approvisionnement en eau de process (concassage, refroidissement, suppression de poussière) même en saison sèche. La consommation d\'eau est de 3 m³ par tonne de granulat produite, avec un taux de recyclage de 80 % via un bassin de décantation de 2 000 m³. Les eaux usées industrielles sont traitées par cyclonage avant rejet, conformément aux normes Ouest-Africaines de rejet (OMVN, 2022).'),
    sp(),
    tbl(
      ['Paramètre eau', 'Valeur', 'Norme / Référence', 'Statut'],
      [
        ['Forage profondeur', '120 m', 'Hydrogéologie DGMG — District du Haho', 'Opérationnel'],
        ['Capacité pompage', '15 m³/h', 'Pompe solaire + électrique de secours', 'Installée'],
        ['Consommation process', '3 m³/T', 'Benchmark ICMM 2023 (2-5 m³/T)', 'Conforme'],
        ['Taux de recyclage', '80 %', 'Objectif IFC PS 3 (> 70 %)', 'Supérieur'],
        ['Bassin décantation', '2 000 m³', 'Standard industrie minier Afrique', 'Dimensionné'],
        ['Qualité rejet', '< 30 mg/L MES', 'OMVN Normes rejet 2022', 'Conforme'],
      ],
      [25, 25, 30, 20]
    ),
    sp(),
    h3('VI.3.2 Gestion de la poussière et des émissions atmosphériques'),
    body('La production de granulats génère de la poussière aux étapes de concassage, criblage et transport. CGI SA a mis en place un système intégré de suppression de poussière : pulvérisation d\'eau sur les tas de matière première (arrosage automatique 4 fois/jour), enceintes de confinement autour des concasseurs, et aspirateurs industriels sur les points de transfert. La concentration de particules en suspension (PM10) à la limite du site est maintenue en dessous de 150 µg/m³, conforme aux normes OMS/UEMOA pour les zones rurales.'),
    sp(),
    tbl(
      ['Source émission', 'Mesure de mitigation', 'Budget (M FCFA/an)', 'Efficacité'],
      [
        ['Concassage primaire', 'Enceinte de confinement + aspirateur', '18', 'Réduction PM10 75 %'],
        ['Criblage', 'Pulvérisation d\'eau + housse de cribles', '12', 'Réduction PM10 60 %'],
        ['Transport interne', 'Arrosage pistes + limites de vitesse', '8', 'Réduction poussière 50 %'],
        ['Stockage granulats', 'Bâchage des tas + aires bétonnées', '10', 'Réduction lessivage 80 %'],
        ['Groupe électrogène', 'Remplacement progressif par solaire', '—', 'Réduction GES 35 %'],
      ],
      [25, 35, 20, 20]
    ),
    sp(),
    h3('VI.3.3 Gestion des sols et réhabilitation'),
    body('La réhabilitation progressive du site de Siyimé est intégrée dans le plan de production annuel. Chaque hectare exploité fait l\'objet d\'un plan de réhabilitation avant ouverture du suivant. Les mesures comprennent : reboisement avec des essences locales (teck, acacia, gmelina), stabilisation des talus par géotextiles et plantations vivantes, et réaménagement des zones exploitées en terrains agricoles ou en zones de conservation. Le budget réhabilitation est provisionné à 0,5 % du chiffre d\'affaires annuel (35 M FCFA en 2028), conforme au Code Minier Togolais Art. 87.'),
    sp(),
    infoBox('Source : Code Minier Togolais, Loi 2014-010 du 14 mai 2014, Art. 87 — « Tout exploitant minier est tenu de réhabiliter les sites exploités selon un plan approuvé par la DGMG ». IFC Performance Standard 6 — « Biodiversity Conservation and Sustainable Management of Living Natural Resources », révision 2023.'),
    sp(),
  ];
}

// ─── VI.4 EMPLOI LOCAL ET INCLUSION SOCIALE ───────────────────────────────
function section64(): (Paragraph | Table)[] {
  return [
    h2('VI.4 Emploi local, santé-sécurité et relations communautaires'),
    sp(),
    h3('VI.4.1 Politique de recrutement et formation'),
    body('CGI SA s\'engage à recruter prioritairement les habitants du village de Siyimé et des communes environnantes (Atakpamé, Kpalimé, Tsévié). L\'objectif est d\'atteindre 80 % de recrutement local d\'ici 2028, puis 85 % à l\'horizon 2036. Les formations sont assurées en partenariat avec le CNAM Togo (Conservatoire National des Arts et Métiers) pour les opérateurs de concassage, et avec METSO Accra pour la maintenance des équipements. Un programme de bourses d\'études pour les enfants des employés est prévu à compter de 2027.'),
    sp(),
    tbl(
      ['Axe social', 'Mesure concrète', 'Budget (M FCFA/an)', 'Cible'],
      [
        ['Recrutement local', 'Priorité Siyimé / Plateaux — 80 % des effectifs', 'Intégré dans masse salariale', '80 % (2028) — 85 % (2036)'],
        ['Formation technique', 'Partenariat CNAM Togo + METSO Accra — 120 heures/an/opérateur', '45', '100 % opérateurs certifiés 2028'],
        ['Formation HSE', 'Programme interne — 40 heures/an — premiers secours, risques miniers', '15', '100 % du personnel formé'],
        ['Bourses d\'études', '50 bourses/an pour les enfants des employés (primaire à secondaire)', '12', '50 enfants/an'],
        ['Conditions de travail', 'Salaires conformes convention collective BTP Togo + charges sociales 35 %', 'Intégré', 'Zero plainte sociale'],
        ['Hébergement et restauration', 'Cantine site — transport navette Siyimé — logement de fonction cadres', '28', '100 % couverture'],
      ],
      [22, 38, 18, 22]
    ),
    sp(),
    h3('VI.4.2 Santé et sécurité au travail (SST)'),
    body('La politique SST de CGI SA vise un objectif « Zero accident grave ». Les indicateurs de suivi incluent le TRIR (Total Recordable Incident Rate), le taux de fréquence des accidents et le nombre de jours d\'arrêt de travail. Des équipements de protection individuelle (EPI) sont fournis à l\'ensemble du personnel : casques, lunettes, gants anti-coupure, chaussures de sécurité, gilets haute visibilité. Une infirmerie de site, dotée d\'un infirmier qualifié et d\'un kit de premiers secours complet, est opérationnelle dès T1 2027.'),
    sp(),
    tbl(
      ['Indicateur SST', 'Baseline 2026', 'Cible 2028', 'Cible 2030', 'Cible 2036'],
      [
        ['TRIR (incidents enregistrables)', '< 5', '< 3', '< 2', '< 1'],
        ['Taux de fréquence des accidents', '< 8', '< 5', '< 3', '< 2'],
        ['Jours d\'arrêt / accident', '< 15', '< 10', '< 7', '< 5'],
        ['Taux d\'équipement EPI', '85 %', '100 %', '100 %', '100 %'],
        ['Audits SST internes/an', '2', '4', '4', '4'],
      ],
      [30, 16, 16, 16, 22]
    ),
    sp(),
    h3('VI.4.3 Relations communautaires et partage des bénéfices'),
    body('Le mécanisme de Consentement Libre, Préalable et Éclairé (FPIC — Free, Prior and Informed Consent) a été initié dès la phase pilote 2024-2026. Un comité de suivi communautaire, composé de 7 membres (3 représentants du village Siyimé, 2 de CGI SA, 1 de la mairie d\'Atakpamé, 1 de la DGMG), se réunit trimestriellement pour examiner les impacts du projet et proposer des mesures correctives. Le partage des bénéfices se matérialise par : emplois directs (85 d\'ici 2030), contribution au fonds de développement communal (1 % du CA annuel), amélioration des infrastructures (forage d\'eau communautaire, réhabilitation de 3 km de route locale), et accès aux soins de santé (infirmerie ouverte aux villageois en cas d\'urgence).'),
    sp(),
    successBox('Engagement communautaire : CGI SA consacre 25 M FCFA par an au partage des bénéfices avec les communautés locales, en sus des emplois directs et des infrastructures. Ce montant est intégré dans le budget ESG annuel de 193 M FCFA. La relation de confiance établie avec le village Siyimé constitue une garantie de stabilité sociale et de licence d\'opération pour les 10 ans du permis DGMG.'),
    sp(),
  ];
}

// ─── VI.5 TRANSITION ÉNERGÉTIQUE ET DÉCARBONATION ────────────────────────
function section65(): (Paragraph | Table)[] {
  return [
    h2('VI.5 Transition énergétique — Centrale solaire hybride et décarbonation'),
    sp(),
    body('Le Programme 3 (centrale solaire hybride 3-4 MWc) est le pilier de la stratégie de décarbonation de CGI SA. En couvrant 60 % des besoins énergétiques du site d\'ici 2029, ce programme réduit drastiquement la dépendance aux groupes électrogènes diesel et aux achats d\'électricité EDM (CEET), tout en alignant le projet sur les critères Banque Verte BIDC.'),
    sp(),
    h3('VI.5.1 Architecture technique de la centrale solaire'),
    tbl(
      ['Paramètre solaire', 'Valeur', 'Commentaire technique'],
      [
        ['Puissance photovoltaïque', '3-4 MWc', 'Modules monocristallins haute efficacité (> 21 %) — toiture hangars + au sol'],
        ['Stockage batteries', '6-8 MWh (LiFePO4)', 'Autonomie 4-6h à pleine charge — durée de vie 15 ans (6 000 cycles)'],
        ['Onduleurs / Inverters', '3× 1 500 kW (SMA ou Huawei)', 'Efficacité conversion > 98,5 % — monitoring intelligent temps réel'],
        ['Couverture besoins site', '60 % d\'ici 2029', 'Progressive : 25 % 2027 → 45 % 2028 → 60 % 2029'],
        ['Pic consommation site', '4 200 kW', 'Lignes 1+2+3 + dalles + auxiliaires'],
        ['Économie OPEX annuelle', '280 M FCFA', 'Réduction carburant groupe électrogène + achat EDM'],
        ['Retour sur investissement', '3,2 ans', 'Calculé sur économie annuelle actualisée — sans subside'],
        ['Réduction GES', '-35 % d\'ici 2029', 'Équivalent CO2 évité : ~1 200 T/an'],
        ['Durée de vie installation', '25 ans (PV) / 15 ans (batteries)', 'Génération de cash-flows post-remboursement dette'],
      ],
      [30, 25, 45]
    ),
    sp(),
    h3('VI.5.2 Phasage du déploiement solaire'),
    body('Le déploiement de la centrale solaire se fait en trois phases, synchronisé avec la montée en puissance des lignes de concassage :'),
    sp(),
    bullet('Phase 1 (T3-T4 2026) : Installation de 1,5 MWc photovoltaïque avec 2 MWh de stockage batteries. Couverture immédiate de 25 % des besoins de la Ligne 1 et des bâtiments administratifs.'),
    bullet('Phase 2 (T1-T2 2027) : Extension à 3 MWc avec 4 MWh de stockage. Couverture de 45 % des besoins totaux du site (Lignes 1+2).'),
    bullet('Phase 3 (T2-T3 2028) : Extension finale à 4 MWc avec 8 MWh de stockage. Atteinte de l\'objectif 60 % de couverture solaire à maturité.'),
    sp(),
    h3('VI.5.3 Monitoring et reporting carbone'),
    body('CGI SA s\'engage à publier un bilan carbone annuel conforme aux standards GHG Protocol (Scope 1, 2 et 3). Le monitoring est assuré par un système de comptage énergétique intelligent, connecté au tableau de bord ESG du Comité de suivi. Les données sont auditées par un cabinet externe et transmises à la BIDC dans le cadre du reporting Banque Verte.'),
    sp(),
    tbl(
      ['Scope GES', 'Source', 'Tonnes CO2/an (sans solaire)', 'Tonnes CO2/an (avec solaire)', 'Réduction'],
      [
        ['Scope 1 — Direct', 'Groupes électrogènes diesel, véhicules', '1 850', '1 200', '-35 %'],
        ['Scope 2 — Indirect énergie', 'Achat électricité EDM', '420', '180', '-57 %'],
        ['Scope 3 — Autres indirects', 'Transport fournisseurs, déplacements', '380', '320', '-16 %'],
        ['TOTAL', '—', '2 650', '1 700', '-36 %'],
      ],
      [22, 28, 22, 22, 6]
    ),
    sp(),
    successBox('Impact décarbonation : La centrale solaire de CGI SA évitera l\'émission d\'environ 1 200 tonnes de CO2 par an à maturité. Sur la durée de vie du projet (25 ans), cela représente une économie carbone cumulée de 30 000 tonnes de CO2 — un contribution significative aux engagements climatiques du Togo (NDC révisée 2025 : réduction de 20 % des émissions d\'ici 2030).'),
    sp(),
  ];
}

// ─── VI.6 BUDGET ESG ET FEUILLE DE ROUTE ──────────────────────────────────
function section66(): (Paragraph | Table)[] {
  return [
    h2('VI.6 Budget ESG et feuille de route 2026-2036'),
    sp(),
    body('Le budget ESG de CGI SA est structuré en 6 postes, couvrant l\'intégralité des engagements IFC Performance Standards et des critères Banque Verte BIDC. Le ratio ESG/CA (2,1 %) est supérieur à la moyenne des projets miniers africains (1,3 %), confirmant le positionnement premium du projet sur le plan environnemental et social.'),
    sp(),
    tbl(
      ['Poste ESG', '2026', '2028', '2030', '2036', 'Cumul 2026-2036'],
      [
        ['PGES + audit externe annuel', '85', '85', '90', '100', '935'],
        ['Reboisement + gestion eaux + réhabilitation', '20', '35', '40', '50', '385'],
        ['Formation emploi jeunes + conditions travail', '30', '45', '50', '60', '510'],
        ['Infrastructure communautaire (routes, forage, santé)', '15', '25', '30', '40', '285'],
        ['Monitoring GES + solaire + reporting carbone', '10', '25', '30', '35', '275'],
        ['Assurance multi-risques ESG + fonds de contingence', '25', '45', '50', '55', '485'],
        ['TOTAL ESG annuel (M FCFA)', '185', '260', '290', '340', '2 875'],
        ['% du CA total', '8,7 %', '3,7 %', '3,6 %', '3,2 %', '—'],
      ],
      [28, 12, 12, 12, 12, 24]
    ),
    sp(),
    body('La feuille de route ESG de CGI SA s\'articule autour de 5 jalons critiques, chacun associé à un livrable vérifiable et à un audit externe :'),
    sp(),
    tbl(
      ['Jalon ESG', 'Date', 'Livrable', 'Auditeur', 'Budget (M FCFA)'],
      [
        ['Jalon 1 — PGES initial', 'T2 2026', 'Plan de Gestion Environnementale et Sociale conforme IFC PS 1-8', 'Cabinet ESG accrédité', '45'],
        ['Jalon 2 — Audit ESG pré-investissement', 'T3 2026', 'Rapport d\'audit ESG — score > 75/100 — conditions préalables tirage BIDC', 'Cabinet ESG accrédité', '25'],
        ['Jalon 3 — Mise en service solaire Phase 1', 'T4 2026', 'Centrale 1,5 MWc opérationnelle — monitoring carbone actif', 'Bureau contrôle technique', '35'],
        ['Jalon 4 — Certification ISO 14001 (environnement)', 'T2 2027', 'Certificat ISO 14001 délivré par organisme accrédité', 'Bureau de certification', '30'],
        ['Jalon 5 — Audit ESG annuel (récurrence)', 'T2 de chaque année', 'Rapport annuel ESG — score évolutif — recommandations', 'Cabinet ESG accrédité', '20/an'],
      ],
      [22, 12, 38, 20, 8]
    ),
    sp(),
    infoBox('Références ESG : IFC Performance Standards on Environmental and Social Sustainability (révision 2023) — Principes Équateur IV (2020) — BIDC Banque Verte Framework 2024-2027 — Code Minier Togolais Art. 87 (réhabilitation) — OIT Conventions 87, 98, 138, 182 — GHG Protocol Corporate Standard (2024) — NDC Togo révisée 2025.'),
    sp(),
    successBox('Conclusion ESG : CGI SA intègre les standards ESG IFC et les critères Banque Verte BIDC non pas comme une contrainte réglementaire, mais comme un levier stratégique de différenciation. La centrale solaire 3-4 MWc, le programme de reboisement, la formation des jeunes et le mécanisme FPIC avec les communautés de Siyimé créent un écosystème de confiance qui protège la licence sociale d\'exploitation et renforce l\'attractivité du projet pour les investisseurs institutionnels. Le budget ESG de 2 875 M FCFA sur 10 ans (2,1 % du CA) est un investissement rentable : il sécurise le financement BIDC, réduit les coûts énergétiques de 280 M FCFA/an et crée un avantage concurrentiel durable.'),
    sp(),
  ];
}



