import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from './helpers';

// ─── CHAPITRE 2 : PRÉSENTATION DE L'ENTREPRISE ────────────────────────────
// Historique, structure juridique, gouvernance, actionnariat, permis,
// vision, mission, valeurs ESG, équipe dirigeante, contrôle interne

export function chapterCompany(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 2 — PRÉSENTATION DE L\'ENTREPRISE'),
    sp(),
    body('Ce chapitre présente CORNERSTONE GROUP INTERNATIONAL (CGI) SA sous ses aspects historiques, juridiques, organisationnels et stratégiques. Il couvre la genèse du projet, la structure actionnariale, le cadre réglementaire et la gouvernance, la vision et la mission de la société, l\'équipe dirigeante, et les valeurs ESG fondatrices. Ces éléments constituent le socle institutionnel qui fonde la crédibilité du projet aux yeux des comités d\'investissement de la BIDC, de la BAD et de l\'IFC.'),
    sp(),
    ...comp1(),
    ...comp2(),
    ...comp3(),
    ...comp4(),
    ...comp5(),
    pb(),
  ];
}

// ─── II.1 HISTORIQUE ET GENÈSE ────────────────────────────────────────────
function comp1(): (Paragraph | Table)[] {
  return [
    h2('II.1 Historique et genèse du projet'),
    sp(),
    body('CGI SA est née d\'un constat simple : le Togo et ses voisins de la CEDEAO importent une part significative de leurs granulats de construction, alors que les ressources géologiques disponibles sur le territoire togolais sont d\'une qualité exceptionnelle mais sous-exploitées. Les fondateurs de CGI SA, issus du secteur BTP et de la finance de projet, ont identifié dès 2022 le gisement de Siyimé (District du Haho, Région des Plateaux) comme un actif stratégique inexploité.'),
    sp(),
    tbl(
      ['Période', 'Étape', 'Réalisation', 'Investissement (M FCFA)'],
      [
        ['2022', 'Identification du gisement', 'Prospection géologique Siyimé — analyse granulométrique — études préliminaires', '—'],
        ['2023', 'Création de CGI SA', 'Constitution juridique OHADA — dépôt de capital — ouverture du compte bancaire', '—'],
        ['2023-2024', 'Obtention des permis', 'Permis d\'exploitation DGMG délivré — certification LNBTP 2,63 g/cm³', '—'],
        ['2024', 'Phase pilote — Phase 1', 'Installation Ligne 1 METSO (250 t/h) — première production — 100 % fonds propres', '1 200'],
        ['2025', 'Développement commercial', 'Signature contrat cadre CIMCO (150 000 T/an) — portefeuille clients 5 entreprises', '900'],
        ['2026', 'Structuration financière', 'Préparation dossier BIDC — Business Plan V3.0 — recrutement cadres directeurs', '300'],
        ['2027-2036', 'Phase industrielle', 'Déploiement Programmes 1-2-3 — financés par dette senior BIDC 11 440 M FCFA', '8 899'],
        ['TOTAL INVESTI (fonds propres 2023-2026)', '—', 'Phase pilote + études + structuration', '3 470'],
      ],
      [14, 22, 42, 22]
    ),
    sp(),
    body('La phase pilote 2024-2026 est l\'élément fondateur de la crédibilité industrielle de CGI SA. En finançant intégralement la Ligne 1 sur fonds propres, les actionnaires ont démontré leur résolution, leur capacité d\'exécution et leur connaissance du terrain. Ils ont aussi produit un indicateur tangible de qualité (certification LNBTP 2,63 g/cm³) et de viabilité commerciale (contrat cadre CIMCO) qui constituent les arguments centraux de la demande de financement BIDC.'),
    sp(),
  ];
}

// ─── II.2 STRUCTURE JURIDIQUE ─────────────────────────────────────────────
function comp2(): (Paragraph | Table)[] {
  return [
    h2('II.2 Structure juridique, actionnariat et permis'),
    sp(),
    h3('II.2.1 Fiche d\'identité complète — CGI SA'),
    body('CGI SA est constituée en Société Anonyme conformément à l\'Acte Uniforme OHADA portant droit des sociétés commerciales et du GIE (révision 2023). La fiche d\'identité ci-dessous constitue la référence juridique officielle pour tout dossier de financement, appel d\'offres ou due diligence institutionnelle.'),
    sp(),
    tbl(
      ['Paramètre juridique', 'Valeur', 'Référence réglementaire'],
      [
        ['Dénomination sociale', 'CORNERSTONE GROUP INTERNATIONAL SA (CGI SA)', 'Statuts constitutifs — acte notarié 2023'],
        ['Forme juridique', 'Société Anonyme (SA)', 'OHADA — Acte Uniforme révisé 2023, Art. 385 et s.'],
        ['Capital social', '2 500 000 000 FCFA (2,5 Mds)', 'OHADA Art. 387 — capital libéré à 100 %'],
        ['RCCM Lomé', 'TG-LFW-03-2023-B12-00047', 'Tribunal de Commerce de Lomé — Registre du Commerce'],
        ['NIF (Numéro Identification Fiscale)', '1001909876', 'Direction Générale des Impôts (DGI) Togo'],
        ['Siège social', 'Lomé, Togo', 'Immatriculation RCCM — Tribunal de Commerce de Lomé'],
        ['Site d\'exploitation', 'Siyimé, District du Haho, Région des Plateaux, Togo', 'Permis DGMG — coordonnées GPS : 7°45\'N 1°12\'E'],
        ['Exercice fiscal', '1er janvier — 31 décembre', 'SYSCOHADA révisé — Art. 8'],
        ['Référentiel comptable', 'SYSCOHADA révisé 2023', 'Acte Uniforme OHADA portant organisation et harmonisation des comptabilités'],
        ['Auditeur légal', 'Cabinet d\'expertise comptable — membre de l\'ONECCA Togo', 'OHADA — Art. 430 — Commissaire aux Comptes obligatoire'],
        ['Téléphone', 'À compléter', 'Contact officiel'],
        ['Email / Web', 'À compléter', 'Contact officiel'],
      ],
      [25, 30, 45]
    ),
    sp(),
    h3('II.2.2 Permis miniers et autorisations'),
    sp(),
    tbl(
      ['Autorisation', 'Autorité', 'Date de délivrance', 'Validité', 'Surface / Portée'],
      [
        ['Permis d\'exploitation minière', 'DGMG — Ministère des Mines et des Ressources Énergétiques du Togo', '2023', '10 ans — renouvelable', 'Phase 1 : 24 ha viabilisés — Site Siyimé (Site global réservé : 201 ha)'],
        ['Certification qualité granulats', 'LNBTP — Laboratoire National BTP du Togo', '2023', 'Annuel — renouvelable', 'Masse volumique 2,63 g/cm³ — NF EN 1097-6'],
        ['Certification LA (Los Angeles)', 'LNBTP Togo', 'En cours', 'Annuel', 'Indice LA < 22 % — NF EN 1097-2 — Classe A'],
        ['Certification MDE', 'LNBTP Togo', 'En cours', 'Annuel', 'Micro-Deval < 15 % — NF EN 1097-1'],
        ['Certification Absorption', 'LNBTP Togo', 'En cours', 'Annuel', 'Absorption < 1,5 % — NF EN 1097-6'],
        ['Autorisation environnementale (PGES)', 'ANGE — Agence Nationale de Gestion de l\'Environnement', 'En cours (2026)', '5 ans — renouvelable', 'PGES conforme IFC PS 1-8'],
        ['Immatriculation fiscale', 'DGI Togo — NIF 1001909876', '2023', 'Permanente', 'IS 27 % — TVA 18 % — redevances minières'],
      ],
      [22, 25, 15, 15, 23]
    ),
    sp(),
    infoBox('Conformité réglementaire : Le permis d\'exploitation DGMG, valide jusqu\'en 2033 et renouvelable, constitue une barrière à l\'entrée réglementaire majeure. Le capital social de 2 500 000 000 FCFA, entièrement libéré, est supérieur au minimum légal OHADA (10 M FCFA) et démontre la solidité financière initiale de la société. Source : DGMG Togo — Registre des titres miniers, 2024 ; DGI Togo — Base des contribuables, 2024.'),
    sp(),
  ];
}

// ─── II.3 GOUVERNANCE ET CONTRÔLE INTERNE ─────────────────────────────────
function comp3(): (Paragraph | Table)[] {
  return [
    h2('II.3 Gouvernance et contrôle interne'),
    sp(),
    body('La gouvernance de CGI SA est structurée conformément à l\'Acte Uniforme OHADA et aux meilleures pratiques internationales de gouvernance d\'entreprise. Elle repose sur trois organes distincts aux rôles clairement définis : le Conseil d\'Administration (CA), le Comité d\'Audit, et la Direction Générale. Cette séparation des pouvoirs (stratégie / contrôle / exécution) est une condition préalable au financement BIDC et un gage de transparence irréversible.'),
    sp(),
    h3('II.3.1 Organigramme fonctionnel — Architecture décisionnelle'),
    body('L\'organigramme fonctionnel de CGI SA, tiré du plan d\'affaires CORNERSTONE GP, illustre la maturité organisationnelle de la société. Il distingue cinq niveaux hiérarchiques dont la séparation des fonctions satisfait pleinement aux exigences des comités de crédit BIDC et IFC :'),
    sp(),
    tbl(
      ['Niveau', 'Organe / Poste', 'Composition', 'Responsabilités clés'],
      [
        ['Niveau 1 — Propriété', 'Assemblée Générale des Actionnaires', 'Actionnaires fondateurs (capital 2 500 M FCFA)', 'Approbation des comptes annuels — distribution des dividendes — nominations CA'],
        ['Niveau 2 — Stratégie', 'Conseil d\'Administration', '5 membres dont 3 indépendants — 1 femme minimum', 'Orientations stratégiques — validation budgets > 500 M FCFA — supervision DG'],
        ['Niveau 2 — Contrôle', 'Comité d\'Audit', '3 membres externes — expert financier indépendant', 'Contrôle interne — validation états financiers — risque fraude — covenants BIDC'],
        ['Niveau 2 — ESG', 'Comité ESG', '4 membres — CA + HSE + DG + représentant communautaire', 'Stratégie ESG — PGES — reporting Banque Verte — covenants ESG'],
        ['Niveau 3 — Exécution', 'Direction Générale', '1 DG mandataire social unique', 'Exécution opérationnelle — reporting CA — représentation légale'],
        ['Niveau 4 — Fonctions', 'Direction Technique', 'Directeur Technique (ingénieur mines)', 'Supervision production — maintenance — qualité — sécurité'],
        ['Niveau 4 — Fonctions', 'Direction Commerciale', 'Directeur Commercial (bac+5 marketing industriel)', 'Clients — contrats — pricing — développement Bénin'],
        ['Niveau 4 — Fonctions', 'Direction Administrative et Financière', 'CFO (expert-comptable ONECCA)', 'Comptabilité SYSCOHADA — covenants — trésorerie — IS'],
        ['Niveau 4 — Fonctions', 'Responsable HSE', 'Ingénieur HSE certifié IFC', 'PGES — sécurité — environnement — reporting ESG'],
        ['Niveau 5 — Opérations', 'Chefs d\'équipe Production (× 3)', 'Techniciens METSO certifiés', 'Lignes 1, 2 et 3 — 250 t/h chacune'],
        ['Niveau 5 — Opérations', 'Responsable Maintenance', 'Technicien supérieur mécanique', 'Maintenance préventive — stock pièces — SAV METSO Accra'],
        ['Niveau 5 — Opérations', 'Responsable Qualité / Laboratoire', 'Technicien labo LNBTP', 'Contrôles granulométriques — certifications — non-conformités'],
        ['Niveau 5 — Opérations', 'Responsable Logistique', 'Gestionnaire flotte 18 camions', 'Planification livraisons — GPS — optimisation tournées'],
      ],
      [18, 22, 22, 38]
    ),
    sp(),
    body('La transparence institutionnelle est garantie par un processus de reporting en cascade : les chefs d\'équipe rapportent quotidiennement aux directeurs fonctionnels, les directeurs rapportent mensuellement au DG, et le DG rapporte trimestriellement au Conseil d\'Administration. Les rapports au comité de crédit BIDC (financiers, ESG, production) sont transmis dans les 45 jours suivant la clôture de chaque trimestre.'),
    sp(),
    tbl(
      ['Organe de gouvernance', 'Composition', 'Rôle', 'Fréquence réunion'],
      [
        ['Conseil d\'Administration', '5 membres — majoritairement indépendants — dont au moins 1 femme', 'Stratégie, supervision exécutive, validation budgets > 500 M FCFA, reporting ESG', 'Trimestriel'],
        ['Comité d\'Audit', '3 membres — externes majoritaires — expert financier indépendant', 'Contrôle interne, validation états financiers, risque fraude, reporting BIDC', 'Semestriel'],
        ['Comité ESG', '4 membres — CA + HSE + DG + représentant communautaire', 'Stratégie ESG, PGES, reporting Banque Verte, covenants ESG', 'Trimestriel'],
        ['Direction Générale', '1 DG — mandataire social unique', 'Exécution opérationnelle, reporting trimestriel au CA, représentation légale', 'En continu'],
      ],
      [22, 30, 30, 18]
    ),
    sp(),
    body('Le système de contrôle interne de CGI SA repose sur la méthode COSO (Committee of Sponsoring Organizations of the Treadway Commission) adaptée aux entreprises minières africaines. Ses composantes principales :'),
    sp(),
    bullet('Séparation des fonctions : aucun employé ne peut à la fois autoriser, enregistrer et exécuter une transaction. Le DG délègue les achats > 50 M FCFA au Conseil d\'Administration.'),
    bullet('Reporting financier mensuel : tableau de bord production / CA / trésorerie communiqué au CA dans les 10 jours suivant la fin de chaque mois.'),
    bullet('Audit interne annuel : réalisé par le Comité d\'Audit en partenariat avec un cabinet d\'expertise comptable indépendant.'),
    bullet('Certification des comptes : comptes annuels certifiés par le Commissaire aux Comptes dans les 6 mois suivant la clôture de l\'exercice, conformément à l\'OHADA.'),
    sp(),
  ];
}

// ─── II.4 VISION, MISSION ET VALEURS ESG ──────────────────────────────────
function comp4(): (Paragraph | Table)[] {
  return [
    h2('II.4 Vision, mission et valeurs ESG'),
    sp(),
    h3('II.4.1 Vision stratégique'),
    body('Devenir, d\'ici 2030, le producteur de référence de matériaux de construction premium en Afrique de l\'Ouest — certifié, responsable et compétitif — au service des grands projets d\'infrastructure de la CEDEAO.'),
    sp(),
    h3('II.4.2 Mission'),
    body('Extraire, transformer et livrer des granulats et des dalles de granite de haute qualité, produits localement, certifiés LNBTP, à des prix compétitifs, dans le respect des communautés et de l\'environnement de Siyimé, au bénéfice des entreprises BTP, des marchés publics et des investisseurs régionaux.'),
    sp(),
    h3('II.4.3 Valeurs fondatrices'),
    sp(),
    tbl(
      ['Valeur', 'Description', 'Traduction opérationnelle'],
      [
        ['Excellence technique', 'Qualité LNBTP non négociable — 0 % de non-conformité client', 'Certification annuelle — contrôle granulométrique chaque lot — laboratoire interne'],
        ['Intégrité financière', 'Transparence totale envers la BIDC, les actionnaires et les autorités', 'Comptes certifiés < 6 mois — reporting trimestriel — 0 % fraude'],
        ['Responsabilité environnementale', 'Réduire l\'empreinte carbone à chaque tonne produite', 'Centrale solaire 3-4 MWc — reboisement 5 ha/an — GES -35 % 2029'],
        ['Ancrage communautaire', '80 % de recrutement local — partage des bénéfices', 'FPIC — fonds développement communal — infrastructure locale'],
        ['Innovation industrielle', 'Meilleure technologie disponible (METSO, Breton, SMA)', 'Maintenance préventive IoT — formation continue — benchmark international'],
      ],
      [18, 40, 42]
    ),
    sp(),
  ];
}

// ─── II.5 ÉQUIPE DIRIGEANTE ────────────────────────────────────────────────
function comp5(): (Paragraph | Table)[] {
  return [
    h2('II.5 Équipe dirigeante et compétences clés'),
    sp(),
    body('L\'équipe dirigeante de CGI SA combine expertise technique minière, expérience BTP africaine et connaissance des environnements réglementaires OHADA/BIDC. Les postes clés sont pourvus par des profils expérimentés, formés dans des institutions reconnues, ayant déjà géré des projets similaires en Afrique de l\'Ouest. Les recrutements prévus (Directeur Technique, Directeur Commercial, Responsable HSE) seront finalisés au T1 2026, avant le tirage de la dette BIDC.'),
    sp(),
    tbl(
      ['Poste', 'Profil requis', 'Expérience', 'Recrutement', 'Rôle projet'],
      [
        ['Directeur Général', 'Ingénieur mines ou finance de projet — 15+ ans', 'Mines et carrières Afrique — structuration dette BIDC/BAD', 'En poste', 'Stratégie, financement, relations BIDC'],
        ['Directeur Technique', 'Ingénieur Mines ou Génie Civil — certifié METSO', 'Exploitation carrière — maintenance industrielle — 10+ ans', 'À recruter T1 2026', 'Production, maintenance, qualité, minage'],
        ['Directeur Commercial', 'Bac+5 Commerce / Marketing industriel', 'BTP Afrique — marchés publics ARMP — 8+ ans', 'À recruter T1 2026', 'Clients, contrats, développement Bénin'],
        ['Responsable HSE', 'Ingénieur HSE — formation IFC certifiée', 'Mines et carrières — PGES IFC — 8+ ans', 'À recruter T1 2026', 'PGES, sécurité, ESG, reporting BIDC'],
        ['Responsable Financier (CFO)', 'Expert-comptable ONECCA + SYSCOHADA', 'Comptabilité minière — reporting BIDC — 8+ ans', 'À recruter T2 2026', 'Comptes, covenants, trésorerie, IS'],
        ['Responsable Maintenance', 'Technicien supérieur mécanique industrielle', 'Maintenance METSO — 5+ ans', 'À recruter T1 2027', 'Maintenance préventive — stock pièces'],
      ],
      [18, 28, 25, 16, 23]
    ),
    sp(),
    body('La dépendance actuelle au DG pour les fonctions technique et commerciale constitue une faiblesse transitoire identifiée et adressée. Le plan de recrutement prévoit 5 cadres supérieurs au T1-T2 2026, aligné sur les conditions préalables au tirage de la dette BIDC. L\'équipe cible de 12 cadres et 75 opérateurs à régime de croisière (2028) représente un investissement en capital humain de 250 M FCFA par an en formation et développement.'),
    sp(),
    successBox('Conclusion présentation entreprise : CGI SA est une société en bonne et due forme, transparente, bien gouvernée, titulaire des permis requis, avec une histoire opérationnelle qui démontre la capacité d\'exécution de ses fondateurs. La phase pilote 2024-2026 a transformé une opportunité géologique en réalité industrielle. Le projet d\'expansion financé par la BIDC est la prochaine étape d\'une trajectoire rigoureusement planifiée.'),
    sp(),
  ];
}