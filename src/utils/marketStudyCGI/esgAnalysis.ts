import { Paragraph, Table } from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '@/utils/businessPlanCGI/helpers';

export function esgAnalysis(): (Paragraph | Table)[] {
  return [
    h1('SECTION VII — ANALYSE ESG SECTORIELLE'),
    sp(),

    h2('VII.1 Introduction — ESG comme facteur determinant de competitivite'),
    body('Les criteres Environnementaux, Sociaux et de Gouvernance (ESG) sont devenus des determinants incontournables de l\'acces au financement, de la competitivite commerciale, et de la perennite des projets industriels en Afrique subsaharienne. Les bailleurs internationaux (IFC, Banque Africaine de Developpement — BAD, Banque d\'Investissement et de Developpement de la CEDEAO — BIDC, FMO, Proparco, BOAD) conditionnent systematiquement leurs financements a la conformite ESG. Les grands comptes BTP et les maitres d\'ouvrage publics integrent de plus en plus des clauses ESG dans leurs cahiers des charges. Cette section analyse les exigences ESG applicables au secteur des granulats, evalue les couts de conformite, et identifie les opportunites de differenciation.'),
    sp(),

    h2('VII.2 Exigences ESG des principaux bailleurs de fonds'),
    sp(),
    body('Chaque institution de financement du developpement applique ses propres standards ESG, avec des convergences autour des Performance Standards IFC comme reference commune :'),
    sp(),

    tbl(
      ['Bailleur', 'Standard ESG applicable', 'Exigences cles', 'Impact financement'],
      [
        ['IFC (Banque Mondiale)', 'Performance Standards 1-8 (2012)', 'EIE, PGES, PS 2 (travail), PS 3 (ressources), PS 4 (communaute), PS 5 (reinstallation), PS 6 (biodiversite)', 'Financement conditionne a la conformite PS 1-8'],
        ['BAD (Banque Africaine de Developpement)', 'Integrated Safeguards System (ISS) — 2014', 'Evaluation environnementale et sociale, participation des parties prenantes, gestion des impacts, rehabilitation', 'Categorie 2 (impact limite) — EIE requise'],
        ['BIDC (Banque d\'Investissement CEDEAO)', 'Normes environnementales et sociales BIDC (2020)', 'Conformite legislations nationales, EIE, plan de gestion environnementale, audit social', 'Financement soumis a validation ESG'],
        ['BOAD (Banque Ouest Africaine de Developpement)', 'Politique environnementale et sociale BOAD (2019)', 'EIE, PGES, consultation communautaire, suivi environnemental', 'Categorie B (impact moderé)'],
        ['FMO (Pays-Bas)', 'Sustainability Policy + ESG Risk Framework', 'Alignement IFC PS, gouvernance, transparence, reporting ESG annuel', 'Exigence stricte sur gouvernance'],
        ['Proparco (France)', 'Exigences ESG Proparco + Principes Equateur', 'EIE, PS IFC, Principes Equateur pour projets > 10 M USD', 'Principes Equateur pour grande infrastructure'],
      ],
      [18, 28, 32, 22]
    ),
    sp(),
    infoBox('Source : IFC — « Performance Standards on Environmental and Social Sustainability, 2012 » | BAD — « Integrated Safeguards System, Policy Statement, 2014 » | BIDC — « Environmental and Social Safeguards, 2020 » | BOAD — « Politique environnementale et sociale, 2019 » | FMO — « Sustainability Policy, 2022 » | Proparco — « ESG Requirements & Equator Principles, 2023 ».'),

    h2('VII.3 Analyse environnementale du projet CGI SA'),
    sp(),
    body('L\'exploitation de la carriere de Siyime genere des impacts environnementaux potentiels qui doivent etre identifies, evalues, attenues et suivis conformement aux standards internationaux.'),
    sp(),

    h3('VII.3.1 Impacts air et poussieres'),
    body('Le concassage et le criblage generent des emissions de particules (PM10, PM2,5) qui peuvent affecter la sante des travailleurs et des communautes riveraines. Les exigences de la DGE togolaise et de la IFC PS 3 imposent :'),
    sp(),
    bullet('Systeme de suppression des poussieres : Installation de brumisateurs aux points de concassage et de transfert. Cout : 35 M FCFA. Efficacite : reduction de 80 % des emissions de poussieres.'),
    sp(),
    bullet('Epandage des routes internes : Arrosage regulier des pistes de circulation pour reduire la remise en suspension des poussieres. Cout operationnel : 4 M FCFA/an.'),
    sp(),
    bullet('Surveillance de la qualite de l\'air : Mesures trimestrielles des concentrations de PM10 et PM2,5 aux limites du site et dans les villages voisins. Cout : 6 M FCFA/an.'),
    sp(),
    bullet('EPI respiratoires : Fourniture de masques FFP2 a l\'ensemble du personnel expose. Cout : 3 M FCFA/an.'),
    sp(),

    h3('VII.3.2 Impacts eau et hydrologie'),
    body('L\'exploitation miniere peut affecter la nappe phreatique et la qualite des eaux de surface. Les mesures d\'attenuation prevues par CGI SA sont :'),
    sp(),
    bullet('Bassin de retention : Construction d\'un bassin de 5 000 m³ pour la collecte des eaux de ruissellement et leur decantation avant rejet. Cout : 55 M FCFA.'),
    sp(),
    bullet('Forage d\'eau potable : Un forage de 120 m profondeur alimentera le site en eau potable et industrielle, sans prelever sur les ressources communautaires. Cout : 25 M FCFA.'),
    sp(),
    bullet('Suivi piezometrique : Installation de 3 piezometres pour le suivi de la nappe phreatique. Cout : 8 M FCFA. Suivi trimestriel : 4 M FCFA/an.'),
    sp(),
    bullet('Traitement des eaux usees : Lagunage naturel des eaux usees domestiques avant rejet. Cout : 15 M FCFA.'),
    sp(),

    h3('VII.3.3 Impacts sols et rehabilitation'),
    body('L\'exploitation a ciel ouvert modifie le paysage et les sols. La rehabilitation post-exploitation est obligatoire conformement au Code Minier (Article 56) et au PER :'),
    sp(),
    bullet('Plan de rehabilitation : Reprofilage des talus, reconstitution de la couche arable, et revegetalisation. Cout estime : 120 M FCFA sur la duree de vie de la carriere (30 ans). Provision annuelle : 4 M FCFA/an.'),
    sp(),
    bullet('Reboisement : Plantation de 5 ha d\'arbres et d\'arbustes locaux (acacias, neem, baobabs) pour la restauration ecologique et la fixation des sols. Cout : 12 M FCFA.'),
    sp(),
    bullet('Gestion des dechets : Tri et recyclage des huiles usagees, pneus, et metaux. Convention avec un recycleur agree. Cout : 5 M FCFA/an.'),
    sp(),

    h3('VII.3.4 Impacts bruit et vibrations'),
    body('Le forage, le minage et le concassage generent du bruit et des vibrations. Les normes OMS/IFC fixent des seuils de 70 dB(A) de jour et 55 dB(A) de nuit aux limites du site. CGI SA met en oeuvre :'),
    sp(),
    bullet('Horaires de minage : Restrictions aux heures diurnes (7h-18h) pour limiter les nuisances sonores nocturnes.'),
    sp(),
    bullet('Ecrans antibruit : Installation de barrieres vegetales et de murets en terre crue le long des limites du site proches des habitations. Cout : 18 M FCFA.'),
    sp(),
    bullet('Controle des vibrations : Limitation des tirs de minage a une charge maximale de 50 kg de dynamite par tir, avec un monitoring des vibrations (vitesse particulaire < 5 mm/s). Cout : 8 M FCFA.'),
    sp(),

    tbl(
      ['Impact environnemental', 'Mesure d\'attenuation', 'Cout initial (M FCFA)', 'Cout recurrent (M FCFA/an)'],
      [
        ['Poussieres (PM10, PM2,5)', 'Brumisateurs, arrosage, EPI', '35', '13'],
        ['Eau (nappe, ruissellement)', 'Bassin retention, forage, piezometres, lagunage', '103', '8'],
        ['Sols (degradation, erosion)', 'Rehabilitation, reboisement, gestion dechets', '132', '9'],
        ['Bruit et vibrations', 'Horaires, ecrans, monitoring', '26', '2'],
        ['TOTAL ENVIRONNEMENT', '—', '296', '32'],
      ],
      [28, 32, 20, 20]
    ),
    sp(),

    h2('VII.4 Analyse sociale du projet CGI SA'),
    sp(),
    body('L\'impact social du projet CGI SA est structure autour de trois dimensions : emploi et conditions de travail, relations communautaires, et contribution au developpement local.'),
    sp(),

    h3('VII.4.1 Emploi et conditions de travail'),
    body('Le projet CGI SA creera un total de 85 emplois directs et 200 emplois indirects :'),
    sp(),
    bullet('Emplois directs : 85 employes repartis en production (45), maintenance (15), administration/commercial (15), HSE/qualite (5), logistique (5).'),
    sp(),
    bullet('Emplois indirects : 200 emplois generes dans la chaine de valeur (transporteurs, fournisseurs de carburant, restaurants, hebergement, services divers).'),
    sp(),
    bullet('Recrutement local : 80 % des emplois directs seront attribues aux populations locales (rayon 30 km). Cet engagement est formalise dans le Plan de Developpement Communautaire (PDC).'),
    sp(),
    bullet('Formation : Programme de formation initiale de 120 heures pour les operateurs de production (technique METSO, securite, qualite). Cout : 35 M FCFA. Formation continue annuelle : 18 M FCFA/an.'),
    sp(),
    bullet('Egalite des genres : Objectif de 30 % de femmes dans l\'effectif total, avec une politique de non-discrimination et de promotion interne. CGI SA s\'engage a respecter les conventions OIT n° 100 et 111.'),
    sp(),

    tbl(
      ['Categorie d\'emploi', 'Effectif', 'Salaire moyen (FCFA/mois)', 'Ratio femmes', 'Local (rayon 30 km)'],
      [
        ['Production (operateurs, conducteurs)', '45', '95 000', '15%', '90%'],
        ['Maintenance (mecaniciens, electriciens)', '15', '125 000', '5%', '70%'],
        ['Administration / Commercial', '15', '180 000', '40%', '60%'],
        ['HSE / Qualite / Laboratoire', '5', '150 000', '30%', '80%'],
        ['Logistique / Transport', '5', '110 000', '10%', '85%'],
        ['TOTAL', '85', '118 000 (moyenne)', '22%', '81%'],
      ],
      [28, 12, 22, 15, 23]
    ),
    sp(),

    h3('VII.4.2 Relations communautaires et developpement local'),
    body('Le site de Siyime est situe en zone rurale avec une economie principalement agricole (manioc, mais, coton). Les relations avec les communautes locales sont regies par le Plan de Developpement Communautaire (PDC), conforme a la IFC PS 4 :'),
    sp(),
    bullet('Consultation communautaire : Reunions trimestrielles avec les chefs de village, les conseils de village, et les representants des femmes et des jeunes. Rapport d\'activite publie annuellement.'),
    sp(),
    bullet('Infrastructures communautaires : Construction/rehabilitation de 5 km de pistes rurales, d\'un forage d\'eau potable communautaire, et d\'une salle des fetes. Cout : 85 M FCFA.'),
    sp(),
    bullet('Partenariat agricole : Mise a disposition de 10 ha de terre rehabilitee pour l\'agriculture communautaire (cultures maraicheres). Formation en agro-ecologie. Cout : 15 M FCFA.'),
    sp(),
    bullet('Fonds de developpement communautaire : Contribution annuelle de 1 % du chiffre d\'affaires (64 M FCFA/an en 2028) a un fonds gere par un comite local (CGI SA + representants communautaires).'),
    sp(),
    bullet('Gestion des plaintes : Mecanisme de plaintes accessible (boite a suggestions, numero vert, comite de mediation local). Delai de reponse : 15 jours.'),
    sp(),

    h2('VII.5 Gouvernance du projet CGI SA'),
    sp(),
    body('La gouvernance de CGI SA est structuree pour repondre aux exigences des bailleurs internationaux (IFC, BAD, BIDC) et aux standards de l\'OHADA (AUSCGIE) :'),
    sp(),

    h3('VII.5.1 Structure de gouvernance'),
    body('La structure de gouvernance de CGI SA comporte trois niveaux :'),
    sp(),
    bullet('Conseil d\'Administration (CA) : 5 membres (2 executifs — PDG et DG, 3 non-executifs independants). Le CA se reunit trimestriellement et valide la strategie, le budget, les comptes, et les conventions reglementees. Duree du mandat : 4 ans, renouvelable une fois.'),
    sp(),
    bullet('Comite d\'Audit : Compose de 2 administrateurs non-executifs et du Commissaire aux Comptes externe. Se reunit 2 fois par an. Examine les comptes, le controle interne, et la conformite reglementaire.'),
    sp(),
    bullet('Direction Generale : Assure la gestion operationnelle quotidienne. Le DG est secondé par un DGA (Directeur General Adjoint) responsable des operations et de la production.'),
    sp(),
    bullet('Commissaire aux Comptes externe (CAC) : Cabinet d\'audit externe designe par l\'AGO. Mission : certification des comptes, evaluation du controle interne, rapport sur les conventions reglementees. Cout : 25 M FCFA/an.'),
    sp(),

    tbl(
      ['Organe de gouvernance', 'Composition', 'Frequence', 'Cout annuel (M FCFA)', 'Role cle'],
      [
        ['Conseil d\'Administration', '5 membres (3 NE independants)', 'Trimestriel', '45', 'Strategie, budget, comptes'],
        ['Comite d\'Audit', '2 NE + CAC', '2 fois/an', '8', 'Controle interne, conformite'],
        ['Commissaire aux Comptes', 'Cabinet audit externe', 'Annuel', '25', 'Certification comptes'],
        ['Secretaire General', 'Employe CGI SA', 'Permanent', '12', 'Gouvernance, conseil, AG'],
        ['TOTAL GOUVERNANCE', '—', '—', '90', '2,8% du CA 2028'],
      ],
      [25, 28, 15, 17, 15]
    ),
    sp(),

    h3('VII.5.2 Politique anticorruption et ethique'),
    body('Conformement aux exigences IFC (PS 1) et aux principes de l\'OHADA, CGI SA a adopte une politique anticorruption et d\'ethique des affaires :'),
    sp(),
    bullet('Code d\'ethique : Interdiction des pots-de-vin, des commissions occultes, et des conflits d\'interets. Signature obligatoire par tous les employes et partenaires commerciaux.'),
    sp(),
    bullet('Ligne ethique (whistleblowing) : Mecanisme anonyme de signalement des comportements non ethiques. Gere par un cabinet externe.'),
    sp(),
    bullet('Due diligence partenaires : Verification de l\'integrite des fournisseurs, transporteurs, et agents commerciaux (checks OIT, listes de sanctions).'),
    sp(),
    bullet('Transparence fiscale : Publication des paiements aux autorites publiques (redevances miniere, taxes, TVA) conformement aux standards EITI (Extractive Industries Transparency Initiative). Le Togo est membre de l\'EITI depuis 2010.'),
    sp(),

    h2('VII.6 Cout de conformite ESG et impact sur la competitivite'),
    sp(),
    body('Le cout total de conformite ESG de CGI SA sur 2026-2028 est estime a 576 M FCFA, reparti entre investissements (capex ESG) et charges operationnelles recurrentes :'),
    sp(),

    tbl(
      ['Pilier ESG', 'Investissements 2026-2028 (M FCFA)', 'Charges recurrentes/an (M FCFA)', 'Total 3 ans (M FCFA)'],
      [
        ['Environnement (air, eau, sols, bruit)', '296', '32', '392'],
        ['Social (emploi, formation, communaute)', '120', '85', '375'],
        ['Gouvernance (CA, audit, ethique)', '45', '90', '315'],
        ['TOTAL ESG', '461', '207', '1 082'],
      ],
      [30, 25, 25, 20]
    ),
    sp(),
    body('Ce cout de 1 082 M FCFA sur 3 ans represente 12,2 % du CAPEX total et 16,9 % du chiffre d\'affaires 2028. Cependant, il est amplement compense par les benefices suivants :'),
    sp(),
    bullet('Acces aux financements concessionnels : Le taux d\'interet des prets verts (BIDC, BAD, BOAD) est inferieur de 0,5 a 1,0 point aux prets standards. Sur un encours de 11 440 M FCFA, cette reduction represente une economie de 57 a 114 M FCFA par an.'),
    sp(),
    bullet('Prime ESG sur les contrats : Les grands comptes internationaux (CIMCO, Colas, EGIS) et les maitres d\'ouvrage publics integrent des clauses ESG dans leurs cahiers des charges. Les fournisseurs certifies ESG beneficient d\'une prime de 5 a 8 % sur les prix contractuels.'),
    sp(),
    bullet('Reduction des risques : La conformite ESG reduit le risque de sanctions, d\'arrets de production, et de contentieux communautaires. Le cout moyen d\'un conflit communautaire non gere est estime a 150-300 M FCFA (arret de production, mediations, reparations).'),
    sp(),
    bullet('Reputation et attractivite : La certification ESG renforce la reputation de CGI SA aupres des bailleurs, des clients, et des talents. Une etude McKinsey (2023) montre que les entreprises a forte performance ESG en Afrique beneficient d\'un cout du capital inferieur de 1,2 point.'),
    sp(),

    h2('VII.7 Opportunites ESG et risques reputationsnels'),
    sp(),
    body('Au-dela de la conformite, les criteres ESG offrent des opportunites de differenciation strategique :'),
    sp(),
    bullet('Certification ESG tierce : Obtention d\'une certification ESG independante (ex : ISO 14001 pour l\'environnement, SA8000 pour le social) renforce la credibilite aupres des bailleurs et des clients internationaux. Cout : 25 M FCFA. Duree : 12-18 mois.'),
    sp(),
    bullet('Finance verte (green bond) : Emission d\'un green bond pour financer la centrale solaire et les equipements de suppression des poussieres. Le marche des green bonds en Afrique a atteint 12 Mds USD en 2023 (Climate Bonds Initiative, 2024).'),
    sp(),
    bullet('Carbone neutre : CGI SA s\'engage a compenser 100 % de ses emissions de CO2 via la reforestation locale (5 ha) et l\'achat de credits carbone. Emissions estimees : 2 850 T CO2/an. Cout des credits : 8,5 M FCFA/an (3 USD/T CO2).'),
    sp(),
    bullet('Partenariat avec ONG environnementales : Collaboration avec des ONG locales (ex : Association Togolaise pour la Prevention de la Pollution) pour le suivi environnemental et la sensibilisation communautaire. Renforce la legitimite sociale du projet.'),
    sp(),

    alertBox('Risque reputational majeur : Tout incident environnemental (deversement, pollution de la nappe, accident grave) ou social (conflit communautaire, violation des droits du travail) pourrait causer des dommages reputationsnels durables, entrainant la suspension des financements et la perte de contrats. La probabilite d\'un tel incident est estimee a 8 % d\'ici 2030, mais son impact serait critique (suspension financement, arret production 3-6 mois, perte 15-25 % du portefeuille client). La mitigation repose sur la prevention (systeme HSE robuste), la preparation aux urgences, et la communication transparente.'),
    sp(),

    successBox('Conclusion Section VII : L\'analyse ESG demontre que la conformite environnementale, sociale et de gouvernance est a la fois une contrainte reglementaire et une opportunite de differenciation strategique. Le cout de conformite ESG (1 082 M FCFA sur 3 ans) est integre dans le plan de financement et compense par l\'acces aux financements concessionnels, la prime ESG sur les contrats, et la reduction des risques. CGI SA dispose d\'un plan ESG operationnel, conforme aux Performance Standards IFC, et positionne pour beneficier de la tendance mondiale vers les investissements durables.'),
    pb(),
  ];
}



