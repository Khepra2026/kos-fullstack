import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from './helpers';

// ─── CHAPITRE 12 : IMPACT ÉCONOMIQUE ET SOCIAL ────────────────────────────
// Emplois, fiscalité, PIB local, industrialisation régionale et inclusion

export function chapter12(): (Paragraph | Table)[] {
  return [
    h1('CHAPITRE 12 — IMPACT ÉCONOMIQUE ET SOCIAL'),
    sp(),
    body('Ce chapitre quantifie l\'impact économique et social du projet CGI SA sur le Togo et la région CEDEAO. Au-delà de la rentabilité financière, le projet génère des externalités positives mesurables : création d\'emplois, contribution fiscale, dynamisation du PIB local, industrialisation de la chaîne de valeur granulats, et inclusion économique des communautés de Siyimé. Ces impacts sont calculés selon la méthodologie de la Banque Mondiale (Enquête auprès des entreprises — Enterprise Survey) et du FMI (modèle INPUT-OUTPUT simplifié).'),
    sp(),
    ...section121(),
    ...section122(),
    ...section123(),
    ...section124(),
    ...section125(),
    pb(),
  ];
}

// ─── XII.1 EMPLOIS DIRECTS ET INDIRECTS ────────────────────────────────────
function section121(): (Paragraph | Table)[] {
  return [
    h2('XII.1 Création d\'emplois — Directs, indirects et induits'),
    sp(),
    body('Le projet CGI SA crée des emplois à trois niveaux : directs (salariés CGI SA), indirects (fournisseurs, transporteurs, sous-traitants) et induits (revenus dépensés dans l\'économie locale par les employés et leurs familles). À maturité (2030), le projet génère 85 emplois directs, 120 emplois indirects et environ 200 emplois induits, soit plus de 400 emplois au total.'),
    sp(),
    tbl(
      ['Catégorie d\'emploi', '2026', '2028', '2030', '2036', 'Commentaire'],
      [
        ['Emplois directs CGI SA', '38', '87', '115', '134', 'Opérateurs, cadres, administration, maintenance, HSE'],
        ['Emplois indirects (fournisseurs, transporteurs)', '45', '85', '120', '145', 'Mines, transport, sous-traitance, services'],
        ['Emplois induits (dépenses salariés)', '75', '150', '200', '250', 'Commerce, santé, éducation, logement — multiplicateur 1,8'],
        ['TOTAL EMPLOIS GÉNÉRÉS', '158', '322', '435', '529', 'Effet multiplicateur total = 3,9 emplois/direct'],
      ],
      [22, 12, 12, 12, 12, 30]
    ),
    sp(),
    h3('XII.1.1 Profil des emplois directs'),
    body('Les emplois directs de CGI SA sont répartis en cinq catégories, avec une politique de recrutement local prioritaire (80 % d\'ici 2028) et une attention particulière à l\'inclusion des jeunes (78 % de la population togolaise a moins de 35 ans).'),
    sp(),
    tbl(
      ['Catégorie', 'Effectif 2030', '% femmes cible', 'Salaire moyen mensuel (FCFA)', 'Formation requise'],
      [
        ['Opérateurs concassage-criblage', '60', '15 %', '185 000', 'CNAM Togo + METSO (120h)'],
        ['Opérateurs dalles granite', '15', '25 %', '220 000', 'Breton SpA (4 semaines)'],
        ['Techniciens maintenance', '15', '10 %', '250 000', 'METSO Accra + certificat'],
        ['Administration / Commercial', '15', '40 %', '280 000', 'Bac+3 gestion / commerce'],
        ['Encadrement / Direction', '10', '20 %', '450 000', 'Bac+5 ingénierie / management'],
      ],
      [22, 12, 12, 24, 30]
    ),
    sp(),
    infoBox('Source : INSEED Togo — Enquête Emploi et Secteur Informel 2023. Salaire moyen secteur BTP Togo : 150 000 FCFA/mois. CGI SA propose des salaires supérieurs de 20-50 % à la moyenne sectorielle, renforçant l\'attractivité de l\'emploi et la rétention des compétences. Multiplicateur d\'emploi : selon la méthodologie Banque Mondiale, chaque emploi minier direct génère 1,8 emploi indirect et 2,1 emplois induits en Afrique subsaharienne.'),
    sp(),
  ];
}

// ─── XII.2 CONTRIBUTION FISCALE ───────────────────────────────────────────
function section122(): (Paragraph | Table)[] {
  return [
    h2('XII.2 Contribution fiscale et redevances minières'),
    sp(),
    body('CGI SA contribue significativement aux finances publiques togolaises par l\'impôt sur les sociétés (IS), la TVA, les redevances minières, les charges sociales (CNSS) et les taxes locales. Sur la période 2026-2036, la contribution fiscale totale estimée s\'élève à 8 500 M FCFA.'),
    sp(),
    tbl(
      ['Poste fiscal', '2028 (M FCFA)', '2030 (M FCFA)', '2036 (M FCFA)', 'Cumul 2026-2036 (M FCFA)'],
      [
        ['Impôt sur les sociétés (IS 27 %)', '704', '880', '1 849', '6 200'],
        ['TVA collectée (18 %)', '1 215', '1 462', '1 917', '12 800'],
        ['Redevances minières (0,5 % CA)', '35', '41', '53', '380'],
        ['Charges sociales CNSS (35 % masse salariale)', '65', '82', '108', '720'],
        ['Taxes locales (patente, foncier)', '12', '15', '20', '130'],
        ['Taxe d\'apprentissage (1 % masse salariale)', '2', '2,5', '3,5', '25'],
        ['TOTAL CONTRIBUTION CGI SA', '2 033', '2 482', '3 950', '20 255'],
      ],
      [28, 14, 14, 14, 30]
    ),
    sp(),
    body('La TVA collectée (12 800 M FCFA cumulé) est un indicateur de l\'activité économique générée : chaque franc de TVA collecté par CGI SA correspond à des achats de biens et services auprès de fournisseurs togolais et régionaux, créant de la valeur ajoutée en amont. Les redevances minières (380 M FCFA cumulé) sont versées à la DGMG et au budget de l\'État togolais, contribuant au financement des politiques publiques en matière de mines et de développement régional.'),
    sp(),
  ];
}

// ─── XII.3 IMPACT SUR LE PIB LOCAL ────────────────────────────────────────
function section123(): (Paragraph | Table)[] {
  return [
    h2('XII.3 Impact sur le PIB local et l\'industrialisation régionale'),
    sp(),
    body('L\'impact du projet CGI SA sur le PIB du Togo et de la région des Plateaux peut être estimé par la méthode du multiplicateur de production. Chaque franc de production de CGI SA génère un effet indirect et induit supplémentaire dans l\'économie locale. Le multiplicateur retenu pour le secteur minier en Afrique de l\'Ouest est de 2,3 (source : BAD, African Economic Outlook 2024).'),
    sp(),
    tbl(
      ['Indicateur économique', '2028', '2030', '2036', 'Méthode de calcul'],
      [
        ['Chiffre d\'affaires CGI SA (M FCFA)', '6 972', '8 121', '10 648', 'Production × prix de vente'],
        ['Valeur ajoutée brute (M FCFA)', '4 729', '5 780', '7 981', 'EBITDA = VA brute approximative'],
        ['Effet indirect + induit (M FCFA)', '3 200', '3 900', '5 400', 'VA × multiplicateur 2,3 — VA directe'],
        ['Impact total sur PIB local (M FCFA)', '7 929', '9 680', '13 381', 'VA directe + effets indirects/induits'],
        ['Contribution au PIB régional Plateaux (%)', '2,8 %', '3,2 %', '4,1 %', 'Impact CGI / PIB Plateaux estimé'],
        ['Contribution au PIB Togo (%)', '0,35 %', '0,40 %', '0,52 %', 'Impact CGI / PIB Togo 2028 (2 280 Mds FCFA)'],
      ],
      [28, 14, 14, 14, 30]
    ),
    sp(),
    h3('XII.3.1 Chaîne de valeur granulats et effet de contagion industrielle'),
    body('Le projet CGI SA stimule l\'industrialisation de la chaîne de valeur granulats au Togo :'),
    sp(),
    bullet('Fournisseurs locaux : bétonnières, entreprises de BTP, fabricants de matériaux de construction — augmentation de la demande de granulats certifiés LNBTP.'),
    bullet('Sous-traitance : entreprises de génie civil, de transport, de maintenance industrielle — développement d\'un écosystème de compétences locales.'),
    bullet('Formation et recherche : partenariat avec l\'Université de Lomé et le CNAM Togo pour la formation des opérateurs et la recherche appliquée en génie minier.'),
    bullet('Export régional : approvisionnement du Bénin, du Ghana et potentiellement de la Côte d\'Ivoire en granulats premium — contribution à la balance commerciale régionale.'),
    sp(),
    infoBox('Source : Banque Mondiale — Togo Economic Update 2024. PIB Togo 2024 : 2 280 Mds FCFA. Croissance PIB : +5,5 %/an. PIB Région des Plateaux : ~280 Mds FCFA. Multiplicateur secteur minier Afrique de l\'Ouest : 2,3 (BAD African Economic Outlook 2024).'),
    sp(),
  ];
}

// ─── XII.4 INCLUSION ÉCONOMIQUE ───────────────────────────────────────────
function section124(): (Paragraph | Table)[] {
  return [
    h2('XII.4 Inclusion économique et développement local'),
    sp(),
    body('L\'ancrage local du projet CGI SA constitue un facteur de stabilité sociale et de licence d\'opération. Les mécanismes d\'inclusion économique sont structurés en quatre volets : emploi local, développement des fournisseurs locaux, partage des bénéfices communautaires, et accès aux infrastructures.'),
    sp(),
    tbl(
      ['Volet inclusion', 'Mesure concrète', 'Bénéficiaires', 'Budget (M FCFA/an)', 'Impact mesurable'],
      [
        ['Emploi local prioritaire', 'Recrutement Siyimé / Plateaux — 80 % local', 'Jeunes du village et communes voisines', 'Intégré masse salariale', '85 emplois directs d\'ici 2030'],
        ['Fournisseurs locaux', 'Achats prioritaires auprès de PME locales (transport, catering, sécurité)', 'PME Togo — Plateaux — Lomé', '120', '8 PME sous contrat cadre 2028'],
        ['Partage bénéfices communautaires', '1 % CA au fonds développement communal + infrastructure', 'Village Siyimé — commune Atakpamé', '70', 'Forage eau + 3 km route + infirmerie'],
        ['Accès infrastructures', 'Route Siyimé-Lomé goudronnée — forage communautaire — électricité', 'Communautés sur l\'axe logistique', 'Intégré CAPEX', '2 000 personnes bénéficiaires'],
        ['Formation professionnelle', 'Bourses CNAM — stages — mentorat technique', 'Élèves et jeunes diplômés locaux', '45', '120 jeunes formés 2026-2030'],
        ['Santé et sécurité communautaire', 'Infirmerie ouverte aux villageois — campagnes santé', 'Population Siyimé (3 500 hab.)', '15', '2 000 consultations/an'],
      ],
      [20, 32, 20, 14, 14]
    ),
    sp(),
    successBox('Impact social global : Le projet CGI SA transforme le village de Siyimé en pôle économique local. Avec 85 emplois directs, 120 indirects, une contribution fiscale de 2 000 M FCFA/an et un investissement en infrastructure de 424 M FCFA (Tranche D), CGI SA démontre qu\'une entreprise minière industrielle peut être un moteur de développement inclusif, conforme aux Objectifs de Développement Durable (ODD 8 : Travail décent et croissance économique ; ODD 9 : Industrie, innovation et infrastructure ; ODD 13 : Lutte contre les changements climatiques).'),
    sp(),
  ];
}

// ─── XII.5 SYNTHÈSE IMPACT ────────────────────────────────────────────────
function section125(): (Paragraph | Table)[] {
  return [
    h2('XII.5 Synthèse de l\'impact économique et social'),
    sp(),
    body('L\'impact économique et social de CGI SA peut être synthétisé en six indicateurs clés, mesurables et vérifiables :'),
    sp(),
    tbl(
      ['Indicateur d\'impact', 'Valeur 2028', 'Valeur 2030', 'Valeur 2036', 'Source / Méthode'],
      [
        ['Emplois directs créés', '87', '115', '134', 'Effectif CGI SA — masse salariale'],
        ['Emplois indirects + induits', '235', '320', '395', 'Méthode multiplicateur BAD 2,3'],
        ['Contribution fiscale annuelle (M FCFA)', '2 033', '2 482', '3 950', 'IS + TVA + redevances + charges'],
        ['Impact PIB local (M FCFA)', '7 929', '9 680', '13 381', 'VA brute + effets indirects/induits'],
        ['Contribution PIB Togo (%)', '0,35 %', '0,40 %', '0,52 %', 'Impact CGI / PIB national'],
        ['Investissement infrastructure locale (M FCFA)', '424', '480', '550', 'Routes, eau, électricité, santé'],
        ['Personnes bénéficiaires programmes sociaux', '2 500', '3 200', '4 000', 'Emplois + familles + communautés'],
        ['Tonnes CO2 évitées/an', '900', '1 200', '1 400', 'Centrale solaire + efficacité énergétique'],
      ],
      [28, 12, 12, 12, 36]
    ),
    sp(),
    body('Ces indicateurs seront intégrés dans le reporting annuel ESG de CGI SA et transmis au comité de crédit BIDC, à la DGMG et aux communautés de Siyimé. Ils constituent la base factuelle de la licence sociale d\'exploitation et du positionnement Banque Verte du projet.'),
    sp(),
    successBox('Conclusion impact : CGI SA n\'est pas seulement une carrière de granulats. C\'est un projet de développement industriel intégré qui crée de l\'emploi, génère des revenus fiscaux, industrialise une chaîne de valeur locale, et améliore les conditions de vie des communautés. Ce profil d\'impact aligne le projet sur les missions de la BIDC (développement industriel de la CEDEAO), de la BAD (infrastructure et industrialisation) et des ODD des Nations Unies. Le comité de crédit est invité à considérer ce dimensionnement d\'impact comme un facteur de réduction du risque de contrepartie et de renforcement de la relation de long terme avec CGI SA.'),
    sp(),
  ];
}