import { Paragraph, Table } from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '@/utils/businessPlanCGI/helpers';

export function riskAnalysis(): (Paragraph | Table)[] {
  return [
    h1('SECTION IX — ANALYSE DES RISQUES'),
    sp(),

    h2('IX.1 Introduction — Methodologie d\'evaluation des risques'),
    body('L\'analyse des risques du projet CGI SA repose sur une methodologie conforme aux standards des institutions de financement du developpement (IFC, BAD, BIDC) et aux bonnes pratiques des cabinets Big Four (PwC, Deloitte, EY, KPMG). Chaque risque est evalue selon trois dimensions : probabilite d\'occurrence (faible < 20 %, moyenne 20-40 %, elevee > 40 %), impact financier potentiel (faible < 2 % du CA, moyen 2-5 %, eleve > 5 %), et mesures de mitigation. Les risques sont classes en 7 familles : reglementaires, ESG, macroeconomiques, logistiques, energetiques, climatiques, et politiques.'),
    sp(),

    h2('IX.2 Risques reglementaires'),
    sp(),
    body('Les risques reglementaires portent sur les modifications de la legislation miniere, fiscale, et environnementale, ainsi que sur les retards d\'obtention ou de renouvellement des permis.'),
    sp(),

    h3('IX.2.1 Risque de reforme fiscale miniere'),
    body('Une augmentation de la redevance miniere (actuellement 3 %) ou l\'instauration de nouvelles taxes environnementales pourrait impacter la rentabilite.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible a Moyenne (15-20%)'],
        ['Impact', 'Eleve — Baisse marge nette 3-5 pts'],
        ['Indicateur d\'alerte', 'Projet de loi de finances augmentant redevance miniere'],
        ['Mitigation', 'Adhesion Chambre des Mines Togo + lobbying + diversification export'],
        ['Cout mitigation', '15 M FCFA/an (cotisation + representation)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.2.2 Risque de retard ou refus de renouvellement du permis'),
    body('Le permis d\'exploitation est valable 5 ans renouvelable une fois. Un retard ou un refus de renouvellement interromprait l\'exploitation.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (10%)'],
        ['Impact', 'Critique — Arret exploitation, perte CA 100%'],
        ['Indicateur d\'alerte', 'Retard reponse DGMG > 6 mois avant expiration'],
        ['Mitigation', 'Dossier de renouvellement prepare 18 mois avant expiration + relations DGMG + conformite PER'],
        ['Cout mitigation', '25 M FCFA (dossier + etudes + representation)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.2.3 Risque de non-conformite reglementaire (ARMP, LNBTP, DGE)'),
    body('Une perte de certification LNBTP ou un rejet de candidature ARMP pourrait exclure CGI SA des marches publics (35 % du volume cible).'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (12%)'],
        ['Impact', 'Eleve — Perte 35% du volume cible'],
        ['Indicateur d\'alerte', 'Non-conformite lors d\'audit LNBTP ou ARMP'],
        ['Mitigation', 'Audits internes trimestriels + consultant qualite + suivi reglementaire continu'],
        ['Cout mitigation', '18 M FCFA/an (audits + consultant)'],
      ],
      [30, 70]
    ),
    sp(),
    infoBox('Source : Code Minier Loi 2014-010 | LNBTP — « Cahier des charges granulats 2023 » | ARMP Togo — « Guide des marches publics 2024 » | DGE — « Guide de l\'evaluateur environmental, 2023 ».'),

    h2('IX.3 Risques ESG'),
    sp(),
    body('Les risques ESG portent sur les incidents environnementaux, les conflits communautaires, les violations des droits du travail, et la non-conformite aux standards des bailleurs.'),
    sp(),

    h3('IX.3.1 Risque d\'incident environnemental majeur'),
    body('Un deversement accidentel, une pollution de la nappe phreatique, ou un incendie pourrait declencher des sanctions, un arret de production, et des dommages reputationsnels.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (8%)'],
        ['Impact', 'Critique — Suspension financement, arret 3-6 mois, perte 15-25% clients'],
        ['Indicateur d\'alerte', 'Depassement seuils DGE, plainte communautaire, audit negatif IFC'],
        ['Mitigation', 'Systeme HSE robuste + plan d\'urgence + assurance RC environnementale + monitoring continu'],
        ['Cout mitigation', '45 M FCFA/an (HSE + assurance + monitoring)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.3.2 Risque de conflit communautaire'),
    body('Les communautes riveraines pourraient exprimer des griefs (emploi, compensation, nuisances) conduisant a des blocages de site ou des contentieux.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (25%)'],
        ['Impact', 'Moyen a Eleve — Arret production 15-30 jours, mediation couteuse'],
        ['Indicateur d\'alerte', 'Plaintes repetees, reunions communautaires tendues, mediatisation'],
        ['Mitigation', 'PDC + fonds developpement communautaire + mecanisme plaintes + recrutement local 80%'],
        ['Cout mitigation', '64 M FCFA/an (1% CA + actions communautaires)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.3.3 Risque de non-conformite ESG bailleurs'),
    body('Un audit ESG negatif des bailleurs (IFC, BAD, BIDC) pourrait declencher des clauses de suspension ou des conditions de drawdown.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (10%)'],
        ['Impact', 'Eleve — Suspension prets, renegociation covenants'],
        ['Indicateur d\'alerte', 'Observations audit ESG non resolues dans les delais'],
        ['Mitigation', 'Audits ESG internes semestriels + consultant ESG externe + reporting annuel aux bailleurs'],
        ['Cout mitigation', '35 M FCFA/an (audits + consultant + reporting)'],
      ],
      [30, 70]
    ),
    sp(),

    h2('IX.4 Risques macroeconomiques'),
    sp(),
    body('Les risques macroeconomiques incluent l\'inflation, la volatilite du change, les taux d\'interet, et la croissance economique nationale et regionale.'),
    sp(),

    h3('IX.4.1 Risque d\'inflation et de hausse des couts de production'),
    body('L\'inflation au Togo a atteint 4,8 % en 2024 (BCEAO) et pourrait persister, affectant les couts de carburant, d\'electricite, et de main-d\'oeuvre.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Elevee (45%)'],
        ['Impact', 'Moyen — Baisse marge 2-4 pts'],
        ['Indicateur d\'alerte', 'Inflation > 6% sur 2 trimestres consecutifs'],
        ['Mitigation', 'Contrats cadres avec clauses d\'indexation + centrale solaire + optimisation energetique'],
        ['Cout mitigation', '120 M FCFA (centrale solaire) + indexation incluse dans contrats'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.4.2 Risque de volatilite du change'),
    body('Le FCFA est indexe sur l\'euro (taux fixe via la France), mais la volatilite du Cedi ghanéen et du Naira nigerian affecte les couts d\'importation des equipements et les exportations.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (30%)'],
        ['Impact', 'Faible a Moyen — Impact export Benin 3-5%'],
        ['Indicateur d\'alerte', 'Variation Cedi/FCFA > 15% sur 12 mois'],
        ['Mitigation', 'Contrats export en FCFA + couverture change si necessaire + diversification clients'],
        ['Cout mitigation', '8 M FCFA/an (couverture + arbitrage)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.4.3 Risque de ralentissement economique national'),
    body('Un ralentissement de la croissance togolaise (hypothese < 3 %/an) pourrait reduire les investissements publics et la demande privee en granulats.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (25%)'],
        ['Impact', 'Moyen — Baisse volume 10-15%'],
        ['Indicateur d\'alerte', 'Croissance PIB Togo < 3% sur 2 trimestres'],
        ['Mitigation', 'Diversification client (promoteurs, export, PME) + contrats cadres long terme'],
        ['Cout mitigation', 'Inclus dans strategie commerciale'],
      ],
      [30, 70]
    ),
    sp(),
    infoBox('Source : BCEAO — « Note de conjoncture UEMOA, T4 2024 » | FMI — « Article IV Consultation Togo 2024 » | Banque Mondiale — « West Africa Economic Update 2024 ».'),

    h2('IX.5 Risques logistiques'),
    sp(),
    body('Les risques logistiques portent sur les infrastructures routieres, la disponibilite des transporteurs, la congestion, et les accidents de livraison.'),
    sp(),

    h3('IX.5.1 Risque de degradation des routes nationales'),
    body('La route N1 (Lome-Sokode) et la RNIE3 (Siyime-Cotonou) sont soumises a une degradation rapide en saison des pluies, allongeant les temps de transport et augmentant les couts.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (30%)'],
        ['Impact', 'Moyen — Hausse cout transport 10-15%'],
        ['Indicateur d\'alerte', 'Temps trajet Siyime-Lome > 4h (vs 2,5h normal)'],
        ['Mitigation', 'Contrats logistiques long terme + entretien proactif camions + itineraires alternatifs'],
        ['Cout mitigation', '35 M FCFA/an (maintenance camions + routes alternatives)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.5.2 Risque de penurie de transporteurs'),
    body('La demande croissante de transport de granulats pourrait depasser la capacite des transporteurs disponibles, surtout en saison seche (pic de demande BTP).'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (25%)'],
        ['Impact', 'Moyen — Delais livraison > 5 jours, perte clients'],
        ['Indicateur d\'alerte', 'Taux d\'occupation transporteurs > 85%'],
        ['Mitigation', 'Flotte proprietaire (8 camions) + contrats exclusifs transporteurs + partenariat ENTRACO'],
        ['Cout mitigation', '280 M FCFA (flotte camions) + 45 M FCFA/an (contrats)'],
      ],
      [30, 70]
    ),
    sp(),

    h2('IX.6 Risques energetiques'),
    sp(),
    body('Les risques energetiques portent sur la disponibilite et le cout de l\'electricite et du carburant.'),
    sp(),

    h3('IX.6.1 Risque de hausse du cout de l\'electricite'),
    body('La CEET a augmente ses tarifs de 12 % en 2024 et pourrait continuer a les indexer sur le cout du fuel. L\'electricite represente 18 % des couts de production.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Elevee (40%)'],
        ['Impact', 'Moyen — Baisse marge 3-5 pts'],
        ['Indicateur d\'alerte', 'Hausse tarif CEET > 10% sur 12 mois'],
        ['Mitigation', 'Centrale solaire 3-4 MWc (reduction 35% facture) + groupes electrogenes secours'],
        ['Cout mitigation', '280 M FCFA (centrale solaire)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.6.2 Risque de penurie de carburant'),
    body('Le Togo depend des importations de produits petroliers. Une penurie temporaire (greve des transporteurs, rupture de stock) pourrait interrompre la production et la livraison.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (15%)'],
        ['Impact', 'Eleve — Arret production 3-7 jours'],
        ['Indicateur d\'alerte', 'Rupture stock carburant > 48h dans la region'],
        ['Mitigation', 'Stock strategique 15 jours (25 000 litres) + 2 fournisseurs + citernes mobiles'],
        ['Cout mitigation', '45 M FCFA (stock + citernes)'],
      ],
      [30, 70]
    ),
    sp(),

    h2('IX.7 Risques climatiques'),
    sp(),
    body('Les risques climatiques incluent les inondations, les secheresses, et les phénomenes meteorologiques extremes qui peuvent affecter la production et la logistique.'),
    sp(),

    h3('IX.7.1 Risque d\'inondations en saison des pluies'),
    body('La saison des pluies (avril-juillet) peut provoquer des inondations sur le site et les routes d\'acces, entrainant un arret de production temporaire.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (25%)'],
        ['Impact', 'Moyen — Arret production 15-30 jours/an'],
        ['Indicateur d\'alerte', 'Pluies > 150 mm/24h ou alerte inondation DGE'],
        ['Mitigation', 'Bassin retention + drainage site + calendrier maintenance saison seche + stock tampon'],
        ['Cout mitigation', '60 M FCFA (drainage + bassin + stock)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.7.2 Risque de secheresse et penurie d\'eau'),
    body('La secheresse prolongee peut reduire la disponibilite en eau pour la suppression des poussieres et le fonctionnement du laboratoire.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (15%)'],
        ['Impact', 'Faible a Moyen — Reduction production 5-10%'],
        ['Indicateur d\'alerte', 'Niveau nappe < 10m ou restriction d\'eau locale'],
        ['Mitigation', 'Forage profond (120m) + reservoir 500 m³ + recyclage eaux usees traitees'],
        ['Cout mitigation', '35 M FCFA (forage + reservoir)'],
      ],
      [30, 70]
    ),
    sp(),

    h2('IX.8 Risques politiques'),
    sp(),
    body('Les risques politiques portent sur la stabilite politique nationale, les changements de gouvernement, les tensions sociales, et les relations internationales.'),
    sp(),

    h3('IX.8.1 Risque d\'instabilite politique ou sociale'),
    body('Le Togo a connu une stabilite politique relative depuis 2005, mais les tensions sociales (greves, manifestations) peuvent perturber les chantiers publics et la logistique.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Faible (12%)'],
        ['Impact', 'Moyen — Retard projets publics 1-3 mois'],
        ['Indicateur d\'alerte', 'Greve generale > 3 jours ou manifestations > 5 000 personnes'],
        ['Mitigation', 'Diversification client (export, prive) + stock tampon + relations multipartisanes'],
        ['Cout mitigation', '10 M FCFA/an (representation + monitoring)'],
      ],
      [30, 70]
    ),
    sp(),

    h3('IX.8.2 Risque de changement de priorites gouvernementales'),
    body('Un changement de gouvernement pourrait modifier les priorites d\'investissement public, retardant ou annulant des projets prevus dans le PND.'),
    sp(),
    tbl(
      ['Parametre', 'Evaluation'],
      [
        ['Probabilite', 'Moyenne (20%)'],
        ['Impact', 'Moyen — Baisse volume 10-15%'],
        ['Indicateur d\'alerte', 'Modification PND ou gel projets > 100 Mds FCFA'],
        ['Mitigation', 'Diversification geographique (Benin, Ghana) + clients prives + contrats cadres prives'],
        ['Cout mitigation', 'Inclus dans strategie commerciale'],
      ],
      [30, 70]
    ),
    sp(),

    h2('IX.9 Matrice de risques consolidatee'),
    sp(),
    body('Le tableau suivant synthetise l\'ensemble des risques identifies, leur evaluation, et le budget total de mitigation :'),
    sp(),

    tbl(
      ['Famille de risque', 'Risque principal', 'Probabilite', 'Impact', 'Score risque', 'Cout mitigation (M FCFA)'],
      [
        ['Reglementaire', 'Reforme fiscale miniere', '15-20%', 'Eleve', 'Moyen', '15'],
        ['Reglementaire', 'Retard renouvellement permis', '10%', 'Critique', 'Moyen', '25'],
        ['Reglementaire', 'Non-conformite ARMP/LNBTP', '12%', 'Eleve', 'Moyen', '18'],
        ['ESG', 'Incident environnemental majeur', '8%', 'Critique', 'Moyen', '45'],
        ['ESG', 'Conflit communautaire', '25%', 'Moyen/Eleve', 'Moyen', '64'],
        ['ESG', 'Non-conformite bailleurs', '10%', 'Eleve', 'Faible/Moyen', '35'],
        ['Macroeconomique', 'Inflation/couts production', '45%', 'Moyen', 'Eleve', '120'],
        ['Macroeconomique', 'Volatilite change', '30%', 'Faible/Moyen', 'Moyen', '8'],
        ['Macroeconomique', 'Ralentissement economique', '25%', 'Moyen', 'Moyen', '0'],
        ['Logistique', 'Degradation routes', '30%', 'Moyen', 'Moyen', '35'],
        ['Logistique', 'Penurie transporteurs', '25%', 'Moyen', 'Moyen', '325'],
        ['Energetique', 'Hausse electricite', '40%', 'Moyen', 'Eleve', '280'],
        ['Energetique', 'Penurie carburant', '15%', 'Eleve', 'Moyen', '45'],
        ['Climatique', 'Inondations', '25%', 'Moyen', 'Moyen', '60'],
        ['Climatique', 'Secheresse/penurie eau', '15%', 'Faible/Moyen', 'Faible', '35'],
        ['Politique', 'Instabilite politique', '12%', 'Moyen', 'Faible', '10'],
        ['Politique', 'Changement priorites gouvernement', '20%', 'Moyen', 'Moyen', '0'],
        ['TOTAL', '—', '—', '—', '—', '1 120'],
      ],
      [18, 28, 12, 12, 12, 18]
    ),
    sp(),
    body('Le budget total de mitigation des risques est estime a 1 120 M FCFA sur 3 ans, reparti entre investissements (centrale solaire 280 M, flotte camions 280 M, bassin/drainage 60 M) et charges recurrentes (HSE, audits, assurance, actions communautaires 500 M FCFA). Ce budget represente 12,6 % du CAPEX total et est integre dans le plan de financement. Le risque residuel (apres mitigation) est evalue comme modere, avec un impact financier maximal estime a 8 % du chiffre d\'affaires en scenario de crise combinee.'),
    sp(),

    successBox('Conclusion Section IX : L\'analyse des risques identifie 17 risques repartis en 7 familles. Les risques les plus probables sont l\'inflation/couts de production (45 %) et la hausse du cout de l\'electricite (40 %). Les risques les plus impactants sont un incident environnemental majeur (8 % mais impact critique) et un retard de renouvellement du permis (10 % mais impact critique). Le budget de mitigation (1 120 M FCFA) est proportionne et integre dans le plan de financement. Apres mitigation, le risque residuel global est evalue a MODERE, compatible avec les standards de bancabilite des institutions de financement du developpement.'),
    pb(),
  ];
}