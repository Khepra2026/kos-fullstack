import { Paragraph, Table } from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, kpiRow, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function strategicImplications(): (Paragraph | Table)[] {
  return [
    h1('SECTION X — IMPLICATIONS STRATEGIQUES POUR LE PROJET CGI SA'),
    sp(),

    h2('X.1 Introduction — Du diagnostic a l\'action strategique'),
    body('Les neuf sections precedentes de cette etude de marche ont etabli un diagnostic factuel et chiffre du marche des granulats en Afrique de l\'Ouest, de la position concurrentielle de CGI SA, et des risques et opportunites du projet. Cette section deduit les implications strategiques directes pour CGI SA, en formalisant le positionnement optimal, la strategie de differenciation, les avantages competitifs durables, la strategie ESG, la soutenabilite a long terme, et la bancabilite du projet aux yeux des institutions de financement du developpement (IFC, BAD, BIDC, BOAD, FMO, Proparco).'),
    sp(),

    h2('X.2 Positionnement optimal de CGI SA'),
    sp(),
    body('Le positionnement de CGI SA doit etre defini selon trois dimensions simultanees : geographique, produit, et clientele.'),
    sp(),

    h3('X.2.1 Positionnement geographique — "Le producteur industriel du nord"'),
    body('CGI SA se positionne comme le premier producteur industriel certifie de granulats dans le nord et le centre du Togo, avec un rayonnement naturel vers le Benin oriental et le Ghana occidental. Ce positionnement exploite l\'avantage logistique structurel de Siyime (150 km de Lome, 176 km de Cotonou) et comble le vide industriel de cette zone, actuellement desservie par des importations couteuses depuis le sud du Togo ou le Ghana.'),
    sp(),
    bullet('Marche primaire (60 % du volume) : Grand Lome et regions centrales du Togo. Avantage logistique de 20-40 % par rapport aux carrieres du sud. Delai de livraison : 24-48h.'),
    sp(),
    bullet('Marche secondaire (25 % du volume) : Benin (Cotonou, Porto-Novo, Parakou). Export prioritaire en raison du deficit structurel beninois et de la reconnaissance mutuelle LNBTP-LCBC. Delai de livraison : 48-72h.'),
    sp(),
    bullet('Marche tertiaire (10 % du volume) : Ghana (Volta Region, peripherie Accra). Acces conditionnel a l\'amelioration de la logistique intermodale (route + ferroviaire eventuel). Delai de livraison : 72-96h.'),
    sp(),
    bullet('Marche quaternaire (5 % du volume) : Burkina Faso, Mali, Niger. Acces a long terme via les corridors regionaux et les partenariats logistiques.'),
    sp(),

    h3('X.2.2 Positionnement produit — "Certification et specialite"'),
    body('CGI SA se positionne sur deux segments produit complementaires :'),
    sp(),
    bullet('Segment "Standards certifies" (70 % du volume, 55 % de la marge) : L\'ensemble des classes granulométriques (0/31,5, 0/20, 5/15, 15/25, 0/5, 0/2) certifiees LNBTP et conformes NF EN 12620. Ce segment adresse les marches publics, les grands comptes BTP, et les promoteurs immobiliers. Le positionnement est axe sur la qualite constante, la traçabilite (QR code par lot), et la fiabilite des livraisons.'),
    sp(),
    bullet('Segment "Specialite haute resistance" (20 % du volume, 35 % de la marge) : Granulats > 120 MPa pour betons haute performance, ouvrages d\'art, betons marins, et betons precontraints. Ce segment est positionne comme premium, avec des prix 40-60 % superieurs aux standards. Les barriers techniques (rarete des gisements qualifies, expertise METSO) protegent ce segment de la concurrence.'),
    sp(),
    bullet('Segment "Rebut / tout-venant" (10 % du volume, 10 % de la marge) : Remblaiement bas de gamme, terrassement, et fondations non structurelles. Ce segment est traite comme residuel, sans investissement commercial specifique, mais permet d\'ecouler les sous-produits de concassage a marge positive.'),
    sp(),

    h3('X.2.3 Positionnement clientele — "Partenariat B2B et marches publics"'),
    body('La strategie commerciale de CGI SA cible quatre categories de clients avec des approches differenciees :'),
    sp(),

    tbl(
      ['Segment client', '% du volume', 'Approche commerciale', 'Prix cible (FCFA/T)', 'Marge brute'],
      [
        ['Grands comptes BTP (CIMCO, EBOMAF, etc.)', '35%', 'Contrats cadres 12-24 mois, volume garanti, prix fixe + indexation', '7 800-8 500', '32-38%'],
        ['Marches publics (ARMP Togo / Benin)', '25%', 'Appels d\'offres, certification obligatoire, delais stricts', '8 000-8 800', '30-35%'],
        ['Promoteurs immobiliers et PME BTP', '20%', 'Commandes ponctuelles, paiement comptant ou 30 jours, service personnalise', '7 500-8 200', '28-34%'],
        ['Export Benin (B2B + promoteurs)', '15%', 'Contrats cadres, livraison Cotonou, certification LCBC', '8 800-9 500', '35-40%'],
        ['Specialite (ouvrages d\'art, marins)', '5%', 'Contrats projets specifiques, expertise technique, certification speciale', '11 000-15 000', '48-55%'],
      ],
      [25, 12, 35, 15, 13]
    ),
    sp(),

    h2('X.3 Strategie de differenciation'),
    sp(),
    body('La differenciation de CGI SA repose sur cinq piliers cumulatifs, chacun difficilement replicable par les concurrents actuels :'),
    sp(),

    h3('X.3.1 Pilier 1 — Qualite certifiee et traçabilite'),
    body('CGI SA est le seul producteur au Togo (hors importations) a detenir une certification LNBTP complete pour 7 classes granulométriques, incluant les granulats haute resistance. Le systeme de traçabilite par QR code (unique dans la sous-region) permet aux clients de verifier la conformite de chaque lot en temps reel. Cette differenciation repond a la tendance croissante des maitres d\'ouvrage publics et privés a exiger la traçabilite complete des materiaux.'),
    sp(),

    h3('X.3.2 Pilier 2 — Technologie et fiabilite industrielle'),
    body('Les equipements METSO Nordberg C120 + HP300 garantissent un taux de disponibilite de 95 %, contre 75-80 % pour les equipements chinois utilises par Granutogo. Cette fiabilite se traduit par : (i) des livraisons ponctuelles 24/7 en saison seche, (ii) une qualite granulometrique constante (coefficient de variation < 3 %), et (iii) une duree de vie des equipements de 20-25 ans (vs 10-12 ans pour la technologie chinoise). Le retour sur investissement technologique se materialise dans la fidelisation des grands comptes et l\'acces aux marches internationaux.'),
    sp(),

    h3('X.3.3 Pilier 3 — Avantage logistique et couverture geographique'),
    body('La position de Siyime permet a CGI SA de desservir a la fois le nord du Togo (marche captive actuellement non approvisionne par les carrieres du sud) et le Benin oriental, avec des couts de transport inferieurs de 20-40 %. L\'absence de congestion portuaire sur l\'axe Siyime-Lome (vs l\'axe Tabligbo-Lome pour les carrieres du sud) reduit les temps de livraison de 30 %. Cet avantage logistique est structurel et permanent — aucun concurrent ne peut le repliquer sans investissement foncier massif dans le nord.'),
    sp(),

    h3('X.3.4 Pilier 4 — Gisement et securite d\'approvisionnement'),
    body('Le gisement de Siyime (201 ha global, 50M+ tonnes, Phase 1 = 24 ha) offre une securite d\'approvisionnement de plus de 100 ans au rythme de production cible. Cette duree de vie exceptionnelle rassure les grands comptes BTP et les bailleurs de fonds sur la perennite du projet. De plus, la masse volumique constante (2,63 g/cm³) et les caracteristiques geologiques homogenes garantissent une qualite previsible sur le long terme, reduisant les risques de non-conformite pour les clients.'),
    sp(),

    h3('X.3.5 Pilier 5 — Conformite ESG et certification internationale'),
    body('CGI SA est le premier producteur de granulats au Togo a structurer une demarche ESG conforme aux Performance Standards IFC, avec un PGES soumis, une centrale solaire 3-4 MWc, et un Plan de Developpement Communautaire. Cette differenciation ESG ouvre l\'acces aux financements concessionnels (taux reduits de 0,5-1,0 point), aux contrats internationaux (prime ESG de 5-8 %), et aux marches des bailleurs (BIDC, BAD, BOAD) qui exigent la conformite ESG comme condition sine qua non.'),
    sp(),

    h2('X.4 Avantages competitifs durables'),
    sp(),
    body('Les cinq piliers de differenciation se traduisent en cinq avantages competitifs durables, evalues selon leur perennite et leur replicabilite par les concurrents :'),
    sp(),

    tbl(
      ['Avantage competitif', 'Duree de protection', 'Barriere a la replication', 'Valeur strategique'],
      [
        ['Permis DGMG + Gisement 201 ha', '> 20 ans', 'Investissement foncier + delai 18-24 mois + etudes geologiques', 'Critique — irremplacable'],
        ['Technologie METSO + certification LNBTP', '8-12 ans', 'CAPEX 3 200 M FCFA + expertise technique + delai certification 12-18 mois', 'Elevee — difficilement replicable'],
        ['Avantage logistique nord', 'Permanent', 'Position geographique unique + infrastructure routiere', 'Elevee — structurel'],
        ['Traçabilite QR + systeme qualite', '3-5 ans', 'Investissement IT + formation + processus certifies', 'Moyenne — replicable a moyen terme'],
        ['Certification ESG + PGES IFC', '3-5 ans', 'Cout 1 082 M FCFA/3 ans + audits + engagement communautaire', 'Moyenne a Elevee — replicable mais couteux'],
      ],
      [25, 18, 30, 27]
    ),
    sp(),
    body('Les deux avantages les plus durables et les moins replicables sont le permis DGMG/gisement (protection > 20 ans) et la technologie METSO/certification LNBTP (protection 8-12 ans). Ces deux avantages, cumules a l\'avantage logistique structurel, creent une "trinite de protection" qui garantit a CGI SA une position dominante dans le nord du Togo et une position competitive au Benin pendant au moins une decennie.'),
    sp(),

    h2('X.5 Strategie ESG et durabilite'),
    sp(),
    body('La strategie ESG de CGI SA n\'est pas seulement une contrainte reglementaire mais un levier de creation de valeur a long terme :'),
    sp(),
    bullet('Objectif ESG 1 — Neutralite carbone d\'ici 2032 : Reduction des emissions de CO2 de 2 850 T/an a zero net via la centrale solaire, le reboisement (5 ha), et l\'achat de credits carbone. Cout : 8,5 M FCFA/an. Benefice : acces aux green bonds, prime ESG, reduction du risque reputational.'),
    sp(),
    bullet('Objectif ESG 2 — Zero incident environnemental majeur : Maintien d\'un taux d\'incident zero sur la duree de vie du projet via le systeme HSE, les audits trimestriels, et la culture de securite. Indicateur : nombre d\'incidents classe 1 (IFC) = 0.'),
    sp(),
    bullet('Objectif ESG 3 — Contribution communautaire structurelle : 1 % du chiffre d\'affaires annuel au fonds de developpement communautaire (64 M FCFA en 2028, croissance mecanique avec le CA). Gouvernance partagee : comite local (CGI SA + 5 representants communautaires). Projets prioritaires : education, sante, agriculture.'),
    sp(),
    bullet('Objectif ESG 4 — Gouvernance "investment grade" : Maintien d\'un CA avec 40 % d\'administrateurs non-executifs independants, un comite d\'audit actif, et un commissaire aux comptes externe de reputation internationale. Publication annuelle d\'un rapport ESG conforme aux standards GRI (Global Reporting Initiative).'),
    sp(),
    bullet('Objectif ESG 5 — Inclusion et diversite : Objectif de 30 % de femmes dans l\'effectif total et 20 % dans les postes de encadrement d\'ici 2030. Programme de formation professionnelle pour 50 jeunes de la communaute par an.'),
    sp(),

    h2('X.6 Soutenabilite a long terme (2026-2036 et au-dela)'),
    sp(),
    body('La soutenabilite du projet CGI SA est evaluee selon quatre dimensions : economique, environnementale, sociale, et institutionnelle.'),
    sp(),

    h3('X.6.1 Soutenabilite economique'),
    body('Le modele economique de CGI SA est soutenable a long terme car il repose sur : (i) un gisement de plus de 100 ans, (ii) une demande structurelle croissante (+4,2 %/an), (iii) un positionnement sur des segments a marge positive (standards 30-38 %, specialite 48-55 %), et (iv) une diversification geographique et clientele reduisant les risques de concentration. Le DSCR de 1,85x (scenario central) et le TRI de 16,8 % confirment la viabilite financiere sur 10 ans. Au-dela de 2036, la Phase 2 du gisement (extension a 48 ha) et les nouveaux marches (Burkina Faso, Mali) offrent des leviers de croissance additionnels.'),
    sp(),

    h3('X.6.2 Soutenabilite environnementale'),
    body('Le projet integre des leviers de durabilite environnementale : centrale solaire (reduction 35 % de l\'empreinte carbone), rehabilitation systematique des zones exploitées, reboisement, gestion des eaux et des dechets. Le Plan de Rehabilitation Post-Exploitation (PRPE), integre au PER, garantit que le site sera restaure a l\'etat initial (ou meilleur) apres l\'arret de l\'exploitation. La caution environnementale de 178 M FCFA, versee a la DGMG, assure le financement de cette rehabilitation.'),
    sp(),

    h3('X.6.3 Soutenabilite sociale'),
    body('La creation de 85 emplois directs et 200 emplois indirects, le recrutement local a 80 %, la formation continue, et le fonds de developpement communautaire structurent une relation gagnant-gagnant avec les populations locales. Le Plan de Developpement Communautaire (PDC), negocie avec les representants locaux et approuve par les bailleurs, formalise ces engagements et en assure le suivi.'),
    sp(),

    h3('X.6.4 Soutenabilite institutionnelle'),
    body('La conformite au droit OHADA (AUSCGIE, AUDCIF), au Code Minier togolais, aux normes LNBTP, et aux Performance Standards IFC garantit la perennite juridique et reglementaire du projet. La structure de gouvernance (CA, comite d\'audit, CAC) est conçue pour resister aux changements de management et assurer la continuite strategique.'),
    sp(),

    h2('X.7 Bancabilite du projet — Evaluation aux standards des institutions de financement'),
    sp(),
    body('La bancabilite (bankability) d\'un projet, c\'est-a-dire sa capacite a attirer des financements institutionnels, est evaluee selon les criteres standard des comites d\'investissement IFC, BAD, et BIDC. Le tableau suivant evalue CGI SA sur chaque critere :'),
    sp(),

    tbl(
      ['Critere de bancabilite', 'Exigence IFC/BAD/BIDC', 'Performance CGI SA', 'Ecart / Commentaire'],
      [
        ['Marche verifie et structurellement porteur', 'TAM > 10 M T, croissance > 3%, deficit structurel', 'TAM 45 M T, CAGR +4,8%, deficit 700K T/an', '✔ Conforme — Exceptionnel'],
        ['Positionnement competitif defensible', 'Parts de marche realistes, barrieres a l\'entree', 'SOM 9,4%, barrieres 5 piliers, fenetre 2-3 ans', '✔ Conforme — Solide'],
        ['Contrat/Client de reference', 'Contrat cadre > 15% du SOM ou lettre d\'intention', 'Contrat CIMCO 150K T/an (19% SOM)', '✔ Conforme — Base installee'],
        ['Technologie eprouvee', 'Technologie industrielle, fiabilite > 85%', 'METSO 95%, reference mondiale', '✔ Conforme — Classe mondiale'],
        ['Equipe de management experimente', '15+ ans experience secteur, equipe complete', 'PDG 15 ans BTP/mines, DG expertise METSO', '✔ Conforme — Experiences'],
        ['Gouvernance robuste', 'CA independant, audit externe, transparence', 'CA 40% NE, CAC externe, conformite OHADA', '✔ Conforme — Investment grade'],
        ['Conformite ESG', 'PGES IFC, PS 1-8, audit ESG positif', 'PGES soumis, centrale solaire, PDC', '✔ Conforme — En cours'],
        ['Rentabilite financiere', 'TRI > 12%, VAN > 0, DSCR > 1,30x', 'TRI 16,8%, VAN 3 150 M, DSCR 1,85x', '✔ Conforme — Tres superieur'],
        ['Structure de financement equilibree', 'Endettement maitrise, covenants realistes', 'Dette/Capital 4,6x, covenants BIDC standards', '✔ Conforme — Acceptable'],
        ['Plan de sortie / Perennite', 'Gisement > 30 ans, strategie apres 10 ans', 'Gisement > 100 ans, Phase 2, diversification', '✔ Conforme — Exceptionnel'],
      ],
      [28, 25, 25, 22]
    ),
    sp(),
    body('CGI SA satisfait l\'ensemble des 10 criteres de bancabilite des institutions de financement du developpement. Sur trois criteres (marche, technologie, perennite), la performance de CGI SA est evaluee comme "exceptionnelle", depassant largement les seuils minimaux. Sur les criteres ESG et gouvernance, CGI SA est "conforme" avec des elements "en cours de finalisation" (PGES, certification ESG tierce) qui seront acheves avant le premier drawdown.'),
    sp(),

    h2('X.8 Feuille de route strategique 2026-2030'),
    sp(),
    body('La mise en oeuvre des implications strategiques s\'articule autour d\'une feuille de route operationnelle de 5 ans :'),
    sp(),

    tbl(
      ['Phase', 'Periode', 'Objectifs cles', 'Investissements (M FCFA)', 'KPI'],
      [
        ['Phase 1 — Lancement', '2026', 'Mise en service Ligne 1, certification LNBTP, contrat CIMCO, 450K T/an', '3 200', 'Volume 450K T, 12 clients, marge 32%'],
        ['Phase 2 — Expansion', '2027-2028', 'Lignes 2+3, export Benin, specialite haute resistance, 795K T/an', '4 100', 'Volume 795K T, 36 clients, marge 37%'],
        ['Phase 3 — Consolidation', '2029-2030', 'Optimisation, Ghana, certification ESG tierce, 920K T/an', '850', 'Volume 920K T, 48 clients, marge 38%'],
        ['Phase 4 — Diversification', '2031-2035', 'Phase 2 gisement, Burkina/Mali, dalles granite, 1 200K T/an', '2 500', 'Volume 1,2M T, 60 clients, marge 39%'],
        ['TOTAL', '2026-2035', '—', '10 650', '—'],
      ],
      [18, 18, 35, 17, 12]
    ),
    sp(),

    successBox('Conclusion Section X : Les implications strategiques pour CGI SA convergent vers un positionnement unique de "producteur industriel certifie du nord", avec une differenciation sur la qualite, la technologie, la logistique, le gisement, et l\'ESG. Les cinq avantages competitifs durables protegent CGI SA contre la concurrence pendant 8-12 ans minimum. La strategie ESG structuree transforme la conformite reglementaire en levier de creation de valeur. La bancabilite du projet est confirmee par l\'evaluation positive sur les 10 criteres des institutions de financement. La feuille de route 2026-2030 transforme ces implications en actions concretes, chiffrees, et pilotables par des KPI.'),
    pb(),
  ];
}



