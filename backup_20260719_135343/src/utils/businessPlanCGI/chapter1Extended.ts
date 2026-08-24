import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from '';

// ─────────────────────────────────────────────────────────────────────────────
// CHAPITRE 1 — EXTENSIONS : ASPECTS RÉGLEMENTAIRES + AXES STRATÉGIQUES
// Sections supplémentaires pour enrichissement V7 Big Four
// ─────────────────────────────────────────────────────────────────────────────

export function chapter1Extended(): (Paragraph | Table)[] {
  return [
    ...sectionReglementaire(),
    ...sectionAxesStrategiques(),
    ...sectionProgrammes123(),
  ];
}

// ─── ASPECTS RÉGLEMENTAIRES DÉTAILLÉS ──────────────────────────────────────
function sectionReglementaire(): (Paragraph | Table)[] {
  return [
    h2('I.6 Cadre reglementaire, juridique et conformite sectorielle'),
    sp(),
    body('CGI SA opere dans un cadre reglementaire multi-niveaux : droit minier national (Code Minier Togolais), droit des affaires regional (OHADA), reglementation financiere sous-regionale (BCEAO/UEMOA), et standards internationaux (IFC Performance Standards, Principes de l\'Equateur). Ce chapitre detaille chaque niveau reglementaire, les obligations de CGI SA et les mecanismes de conformite mis en place. La conformite reglementaire n\'est pas une contrainte pour CGI SA : elle est un avantage concurrentiel qui renforce la credibilite institutionnelle et l\'acces au financement BIDC.'),
    sp(),
    h3('I.6.1 Droit minier togolais — Code Minier Loi 2014-010'),
    sp(),
    body('Le Code Minier du Togo (Loi n° 2014-010 du 14 mai 2014) constitue le cadre legal fondateur de l\'activite de CGI SA. Il est administre par la Direction Generale des Mines et de la Geologie (DGMG), sous la tutelle du Ministere des Mines et des Ressources Energetiques. Ses principales dispositions applicables a CGI SA sont les suivantes :'),
    sp(),
    tbl(
      ['Disposition du Code Minier', 'Article(s)', 'Obligation CGI SA', 'Statut de conformite', 'Risque residuel'],
      [
        ['Permis d\'exploitation (carriere)', 'Art. 40-55', 'Obtention et maintien du permis DGMG — Renouvellement tous les 10 ans — Surface autorisee Phase 1 : 24 ha', 'CONFORME — Permis delivre 2023 — valide jusqu\'en 2033', 'Faible — procedure de renouvellement engagee 24 mois avant echeance'],
        ['Plan de rehabilitation miniere', 'Art. 87', 'Soumettre un Plan de Rehabilitation a la DGMG — Provision 0,5 % du CA annuel — Rehabilitation progressive 5 ha/an', 'EN COURS — Plan soumis DGMG 2024 — Provision integree au modele financier (35 M FCFA/an)', 'Faible — engage, documente, provisionne'],
        ['Etude d\'impact environnemental (EIE)', 'Art. 83-86', 'EIE approuvee par l\'Agence Nationale de Gestion de l\'Environnement (ANGE) avant tout demarrage', 'CONFORME — EIE approuvee ANGE 2023 — Surveillance annuelle', 'Faible — renouvellement surveillance prevu T2 2026'],
        ['Rapport d\'activite annuel a la DGMG', 'Art. 76', 'Rapport annuel production, reserves, emplois, fiscalite avant le 31 mars', 'CONFORME — Rapport 2024 depose dans les delais — Rapport 2025 en preparation', 'Faible — procedure interne etablie'],
        ['Paiement redevances minieres', 'Art. 100-112', 'Redevance extractive : 3 % du CA granulats — Declaration et paiement trimestriel a la DGI', 'CONFORME — Declarations a jour — 3 % integre au modele financier (OPEX)', 'Faible — processus automatise'],
        ['Reglements securite et hygiene', 'Art. 120-135', 'Plan de securite miniere valide — Formation HSE operators — EPI obligatoires — Registre accidents', 'EN COURS DE RENFORCEMENT — Plan securite V2 en cours — recrutement Responsable HSE T1 2026', 'Moyen — priorite recrutement HSE'],
        ['Obligations environnementales eau', 'Art. 89', 'Declaration mensuelle consommation eau — Analyse qualite eau de rejet trimestrielle — Bassin de decantation operationnel', 'CONFORME — Forage 120 m operationnel — Bassin decantation 2 000 m3 — Analyses LNBTP trimestrielles', 'Faible'],
        ['Autorisation d\'ouverture de carriere', 'Art. 42', 'Autorisation DGMG avant tout decapage — Notification 30 jours avant nouveau front d\'abattage', 'CONFORME — Phase 1 (24 ha) autorisee — Notification protocolaire pour extensions', 'Faible'],
      ],
      [24, 10, 28, 24, 14]
    ),
    sp(),
    infoBox('Fiscalite miniere Togo : En sus de l\'IS (27 %), CGI SA est soumise aux impots et taxes specifiques suivants : (i) Redevance extractive : 3 % du CA granulats (Code Minier Art. 100) ; (ii) Taxe d\'exploitation minieres (TEM) : 0,5 % des investissements / an (Art. 102) ; (iii) Contribution des patentes (taxe professionnelle) : forfait annuel selon chiffre d\'affaires ; (iv) TVA sur ventes : 18 % (recouvreable) - FCFA collecte reverse a la DGI. Total charge fiscale effective (hors IS) : ~3,8 % du CA. Source : Code General des Impots Togo 2024 — Ministere des Finances.'),
    sp(),
    h3('I.6.2 Droit des affaires OHADA — Conformite societaire'),
    sp(),
    body('CGI SA est constituee en Societe Anonyme (SA) de droit togolais, sous le regime de l\'Acte Uniforme OHADA portant droit des societes commerciales et du GIE (AUSC), revise le 30 janvier 2014 et amende en 2023. La conformite OHADA est une exigence formelle de la BIDC pour tout financement institutionnel. Voici les principales obligations applicables :'),
    sp(),
    tbl(
      ['Obligation OHADA', 'Acte Uniforme / Article', 'Exigence', 'Conformite CGI SA'],
      [
        ['Denomination sociale et siege', 'AUSC Art. 100-113', 'Denomination officielle — Siege social togolais — RCCM valide', 'CONFORME — RCCM TG-LFW-03-2023-B12-00047 — NIF 1001909876'],
        ['Capital social minimum SA', 'AUSC Art. 387', 'Capital minimum : 10 M FCFA pour SA — Libere au moins 1/4 a la constitution', 'CONFORME — Capital social : 2 500 000 000 FCFA (2,5 Mds) — Entierement libere'],
        ['Organes de gouvernance', 'AUSC Art. 410-450', 'Conseil d\'Administration (CA) — Directeur General — Commissaires aux Comptes', 'CONFORME — CA 5 membres — DG mandate — CAC nomme (Cabinet ONECCA)'],
        ['Etats financiers SYSCOHADA', 'AUSC Art. 137', 'Comptes annuels certifies (CdeR, Bilan, Tableau de flux) — Depot au RCCM sous 6 mois', 'CONFORME — Comptes 2024 certifies ONECCA — Depot RCCM fait'],
        ['Rapport de gestion annuel', 'AUSC Art. 140', 'Rapport du CA sur activite, situation financiere, perspectives — Presente a l\'AG', 'CONFORME — Rapport 2024 presente AG extraordinaire — inclut section ESG'],
        ['Controle interne et audit', 'AUSC Art. 430', 'Comite d\'Audit independant — Rapport sur controle interne annuel', 'CONFORME — Comite Audit 3 membres — Rapport 2024 etabli'],
        ['Registre des actionnaires', 'AUSC Art. 745', 'Registre des mouvements de titres — Mis a jour a chaque transaction', 'CONFORME — Registre tenu par le Directeur General'],
        ['Pacte d\'actionnaires (recommande)', 'AUSC Art. 2-1 et s.', 'Pacte fixant regles decisions strategiques, tag along, drag along, ROFR', 'EN COURS — Mise a jour prevue T2 2026 pour integrer clause de sortie investisseur BIDC'],
      ],
      [24, 18, 26, 32]
    ),
    sp(),
    h3('I.6.3 Reglementation BCEAO / UEMOA — Obligations financieres'),
    sp(),
    body('En tant qu\'entreprise togolaise realisant des operations financieres transfrontalieres (import equipements, export granulats Benin), CGI SA est soumise aux reglements de la BCEAO en matiere de change et de mouvements de capitaux. Les principales obligations applicables sont :'),
    sp(),
    tbl(
      ['Reglementation BCEAO/UEMOA', 'Reference', 'Obligation', 'Conformite CGI SA'],
      [
        ['Declaration d\'operations de change', 'Regl. BCEAO n° 09/2010/CM/UEMOA', 'Toute operation > 5 M FCFA avec l\'etranger doit etre declaree a la BCEAO via la banque commerciale', 'CONFORME — Operations declares via BICICI Togo — procedures etablies'],
        ['Domiciliation bancaire import/export', 'Circulaire BCEAO 2019-012', 'Domiciliation obligatoire des importations > 5 M FCFA aupres d\'une banque agreeee UEMOA', 'CONFORME — Domiciliation etablie BICICI Togo pour importations equipements METSO, SANY, Breton'],
        ['Rapatriement des recettes export', 'Art. 18 Regl. BCEAO 09/2010', 'Rapatriement des recettes export dans les 180 jours suivant la livraison', 'CONFORME — Procedures encaissements export Benin etablies — delai respecte'],
        ['Ouverture de compte bancaire entreprise', 'Instruction BCEAO 01/2018', 'Compte bancaire professionnel obliagtoirement tenu dans une banque agree UEMOA', 'CONFORME — Compte principal BICICI Togo + compte secondaire UTB pour reglements locaux'],
        ['Financement dette etrangere (BIDC)', 'Regl. BCEAO 09/2010 Art. 35', 'Declaration et autorisation BCEAO pour emprunts aupres de BIDC/BAD (etablissements non-residents)', 'A REALISER — Dossier declaration emprunt BIDC en preparation — delai : avant tirage T1 2027'],
      ],
      [25, 18, 30, 27]
    ),
    sp(),
    h3('I.6.4 Aspects reglementaires sectoriels specifiques au BTP et aux granulats au Togo'),
    sp(),
    body('Le marche des granulats au Togo est encadre par plusieurs regulations sectorielles specifiques qui conditionnent l\'acces aux marches publics et la certification des produits :'),
    sp(),
    tbl(
      ['Regulation sectorielle', 'Institution', 'Obligation', 'Impact sur CGI SA'],
      [
        ['Certification qualite granulats LNBTP', 'Laboratoire National du Batiment et des Travaux Publics (LNBTP) du Togo', 'Certification obligatoire pour tout granulat destine aux marches publics — Tests : masse volumique, LA, MDE, absorption, granulometrie', 'AVANTAGE CONCURRENTIEL — CGI SA certifiee LNBTP depuis 2023 — renouvellement annuel programme — note de qualite : masse 2,63 g/cm3, LA < 22 %, MDE < 15 %'],
        ['Marches publics ARMP', 'Autorite de Regulation des Marches Publics (ARMP Togo)', 'Enregistrement au fichier des fournisseurs agreees — Caution de soumission 2 % — Garantie de bonne execution 5 % — Delai de paiement : 60-90 jours apres reception definitive', 'CLES DU MARCHE PUBLIC — CGI SA enregistree ARMP 2024 — cautions et garanties geres via BICICI Togo'],
        ['Normes granulats construction', 'LNBTP + Direction du Batiment et des Travaux Publics (DBTP)', 'Conformite aux normes NF EN 12620 (granulats pour beton), NF EN 13242 (granulats pour travaux routiers), normes togolaises LNBTP-2022', 'CONFORME — Production CGI SA repond a l\'ensemble des normes applicables — Certificat de conformite LNBTP delivre'],
        ['Reglementation transport marchandises', 'Ministere des Transports Togo + DGTR', 'Licences de transport marchandises obligatoires — Charge a l\'essieu : maximum 13 tonnes par essieu — Tonnage autorise par type de vehicule', 'EN COURS — Licences transport en cours d\'obtention pour la flotte propre 18 camions — Camions HOWO conformes reglementation charge essieu'],
        ['Declaration statistique INSEED', 'Institut National de la Statistique et des Etudes Economiques et Demographiques (INSEED)', 'Declaration mensuelle de production industrielle pour le repertoire INSEED — Contributeur au PIB industriel du Togo', 'A FORMALISER — Convention INSEED en cours — declaration reguliere contributive au Compte National du Togo'],
        ['Concession fonciere et usage des terres', 'Ministere des Domaines, de l\'Urbanisme et de l\'Habitat', 'Titre foncier ou bail emphyteotique couvrant la totalite du site de Siyime (201 ha) — Acte de concession de l\'Etat togolais ou du proprietaire prive', 'CONFORME — Titre foncier Phase 1 (24 ha) etabli — Negociations en cours pour extension vers les 177 ha residuels avec la communaute fonciere locale et l\'Etat'],
      ],
      [22, 20, 30, 28]
    ),
    sp(),
    infoBox('Note conformite reglementaire : La conformite de CGI SA au cadre reglementaire sectoriel est un prerequis non negociable pour l\'acces aux marches publics (35 % du CA cible) et au financement BIDC. La certification LNBTP, l\'enregistrement ARMP et le permis DGMG constituent les trois piliers de la legitimite operationnelle de CGI SA. Leur maintien est integre dans le plan de gestion HSE/ESG et dans le budget annuel de conformite (inclus dans les 260 M FCFA ESG/an de 2028). Sources : Ministere des Mines et des Ressources Energetiques du Togo (mines.gouv.tg) — LNBTP Togo (lnbtp.tg) — ARMP Togo (armp.tg) — BCEAO (bceao.int) — OHADA (ohada.com).'),
    sp(),
  ];
}

// ─── AXES STRATÉGIQUES PROGRAMMES 1-2-3 ───────────────────────────────────
function sectionAxesStrategiques(): (Paragraph | Table)[] {
  return [
    h2('I.7 Axes strategiques transversaux — Cadre de mise en oeuvre 2026-2036'),
    sp(),
    body('Le plan strategique de CGI SA s\'articule autour de quatre axes transversaux qui encadrent la mise en oeuvre des trois programmes prioritaires d\'investissement (Programmes 1, 2 et 3). Ces axes constituent la colonne vertebrale de la creation de valeur sur la periode 2026-2036. Ils sont alignes sur les engagements formels de la BIDC (DSCR, Gearing, reporting ESG) et sur les OKR de la direction generale.'),
    sp(),
    tbl(
      ['Axe strategique', 'Description synthetique', 'Lien Programme', 'KPI principal', 'Horizon'],
      [
        ['Axe 1 — Excellence industrielle', 'Atteindre et maintenir 795 000 T/an de granulats certifies LNBTP — Taux de disponibilite >= 80 % — Cout de production <= 2 820 FCFA/T', 'Programme 1 (Tranche A)', 'Production effective / Production cible (%)', '2026-2028'],
        ['Axe 2 — Diversification et valeur ajoutee', 'Lancer l\'unite dalles granite haut de gamme (15 000 m2/an) — Marge brute >= 55 % — Export Benin > 5 % CA', 'Programme 2 (Tranche B)', 'CA dalles / CA total (%)', '2027-2029'],
        ['Axe 3 — Autonomie energetique et ESG', 'Atteindre 60 % autoconsommation solaire — Economie 280 M FCFA/an OPEX — Score ESG > 80/100', 'Programme 3 (Tranche C)', 'Taux couverture solaire (%) / GES evites (T CO2/an)', '2027-2029'],
        ['Axe 4 — Leadership commercial regional', 'Consolider part marche Togo >= 20 % — Structurer export CEDEAO >= 10 % CA — Fideliser grands comptes (>= 90 % retention)', 'Transversal Programmes 1+2', 'Part marche Togo (%) / CA export / CA total (%)', '2026-2036'],
      ],
      [18, 32, 18, 20, 12]
    ),
    sp(),
    body('Ces quatre axes strategiques sont en interdependance directe : l\'excellence industrielle (Axe 1) produit le volume, la diversification (Axe 2) produit la marge, l\'autonomie energetique (Axe 3) protege la competitivite, et le leadership commercial (Axe 4) transforme la capacite en chiffre d\'affaires. L\'absence de l\'un quelconque de ces axes compromettrait la rentabilite et la bancabilite du projet.'),
    sp(),
    successBox('Architecture strategique : L\'architecture en quatre axes transversaux et trois programmes d\'investissement crees une structure de creation de valeur robuste et resistante aux chocs exterieurs. Les Axes 1 a 3 couvrent la creation de valeur operationnelle (volume, marge, cout), l\'Axe 4 couvre la monetisation (marche, clients, prix). Les Programmes 1, 2 et 3 constituent les vecteurs d\'investissement qui activent chacun de ces axes. La BIDC finance 100 % de ces programmes par dette senior.'),
    sp(),
  ];
}

// ─── AXES STRATÉGIQUES ET OBJECTIFS PROGRAMMES 1-2-3 ─────────────────────
function sectionProgrammes123(): (Paragraph | Table)[] {
  return [
    h2('I.8 Axes strategiques et objectifs detailles — Programmes 1, 2 et 3'),
    sp(),
    body('Cette section developpe, pour chaque programme prioritaire, les axes strategiques specifiques, les objectifs chiffres, les jalons cles et les indicateurs de suivi. Les trois programmes sont finances a 100 % sur dette senior BIDC, sans apport en fonds propres complementaires. Chaque programme a un business case propre qui justifie son inclusion dans la demande de financement.'),
    sp(),
    h3('I.8.1 Programme 1 — Expansion Granulats (Tranche A : 3 486 M FCFA)'),
    sp(),
    body('Le Programme 1 est le programme structurant du plan d\'investissement. Son objectif est de tripler la capacite de production de CGI SA, de 265 000 T/an (Ligne 1 optimisee) a 795 000 T/an (3 lignes METSO), pour repondre a la demande structurelle generee par le Plan National de Developpement du Togo (PND 2025-2029). Il constitue le moteur financier du projet, generant la grande majorite du CA, de l\'EBITDA et du cash-flow qui assureront le service de la dette BIDC.'),
    sp(),
    tbl(
      ['Axe strategique Programme 1', 'Objectif quantitatif', 'Jalon cle', 'KPI de mesure', 'Date cible'],
      [
        ['Tripler la capacite de production', 'Ligne 2 : 250 TPH — Ligne 3 : 250 TPH — Total : 795 000 T/an a maturite', 'Mise en service Ligne 2', 'Production effective / Production cible (%)', 'T2 2027'],
        ['Atteindre et maintenir TD >= 80 %', 'TD 80 % des T4 2027 — 82 % en 2029 — 85 % en 2036', 'Debut exploitation regime croisiere 3 lignes', 'Taux de disponibilite hebdomadaire (%)', 'T4 2027'],
        ['Maitriser le cout de production', 'Cout variable net 2 820 FCFA/T (2028) — 2 580 FCFA/T (2030)', 'Premiere annee pleine 3 lignes operationnelles', 'Cout variable unitaire (FCFA/T)', '2028'],
        ['Securiser la qualite premium LNBTP', 'Renouvellement certification LNBTP annuel — LA < 22 % MDE < 15 % Absorption < 1,5 %', 'Audit LNBTP T2 de chaque annee', 'Rapport LNBTP — conformite (OUI/NON)', 'Annuel'],
        ['Capter marche public PND 2025-2029', 'Part marche Togo 20 % en 2030 — 270 000 T/an sur marches routiers PND', 'Signature contrat ARMP > 100 000 T/an', 'Volume contracte marches publics (T/an)', 'T2 2028'],
        ['Optimiser la logistique Siyime-Lome', 'Reduction cout transport de 2 500 a 1 500 FCFA/T via flotte propre 18 camions', 'Reception flotte HOWO (18 camions)', 'Cout transport moyen (FCFA/T)', 'T3 2027'],
        ['Developper marche beninois', 'Export Benin : 50 000 T/an des 2027 — 80 000 T/an en 2030', 'Signature contrat EBOMAF Benin', 'Volume export Benin (T/an)', 'T2 2027'],
      ],
      [28, 22, 18, 18, 14]
    ),
    sp(),
    tbl(
      ['Indicateur financier Programme 1', '2027', '2028', '2029', '2030', '2036'],
      [
        ['CA granulats (M FCFA)', '4 367', '6 747', '7 089', '7 446', '9 973'],
        ['EBITDA programme 1 (M FCFA)', '2 618', '4 729', '5 270', '5 780', '7 981'],
        ['Marge EBITDA granulats (%)', '60,0 %', '70,1 %', '74,3 %', '77,6 %', '80,0 %'],
        ['Cash-flow operationnel genere (M FCFA)', '1 958', '3 621', '4 545', '5 100', '7 215'],
        ['Contribution au service dette BIDC (%)', '100 %', '100 %', '100 %', '100 %', '100 %'],
      ],
      [28, 12, 12, 12, 12, 12]
    ),
    sp(),
    infoBox('Business case Programme 1 : La VAN specifique du Programme 1 (Tranche A seule) a 12 % est estimee a 5 240 M FCFA — bien superieure au CAPEX de 3 486 M FCFA investi. Le ratio benefice/investissement est de 2,5x. Ce programme est rentable sur lui-meme, independamment des Programmes 2 et 3. Il constitue le pilier financier du dossier BIDC.'),
    sp(),
    h3('I.8.2 Programme 2 — Unité de Dalles de Granite (Tranche B : 3 277 M FCFA)'),
    sp(),
    body('Le Programme 2 vise a valoriser la qualite exceptionnelle du gisement de Siyime (masse volumique 2,63 g/cm3, resistance > 120 MPa) a travers la production de dalles et elements de granite haut de gamme. Ce programme diversifie le portefeuille de produits de CGI SA, reduit la dependance au marche BTP standard et ouvre l\'acces a des segments a marge superieure : construction de luxe, monuments publics, hotels 5 etoiles et export Europe/Moyen-Orient.'),
    sp(),
    tbl(
      ['Axe strategique Programme 2', 'Objectif quantitatif', 'Jalon cle', 'KPI de mesure', 'Date cible'],
      [
        ['Lancer la production de dalles granite haut de gamme', 'Production 5 000 m2/an en 2028 — 15 000 m2/an en 2029+', 'Mise en service scie Breton + polisseuse Breton Luxmaster', 'Production mensuelle dalles (m2)', 'T1 2028'],
        ['Atteindre marge brute dalles >= 55 %', 'Marge brute 55 % des la premiere annee de production (2028)', 'Premiere livraison facturation dalles', 'Marge brute dalles (% mensuel)', 'T2 2028'],
        ['Qualifier 5 grands comptes hotels / monuments', 'Signature 5 contrats cadres dalles entre 2028 et 2029 — 3 000 m2/client/an minimum', 'Signature premier contrat cadre dalles client final', 'Nombre de clients actifs dalles (nb)', 'T3 2028'],
        ['Lancer la commercialisation export CEDEAO', 'Export dalles Benin + Ghana = 3 000 m2/an en 2029 — 6 000 m2/an en 2031', 'Premier envoi conteneur dalles vers Cotonou', 'Volume dalles export (m2/an)', 'T4 2028'],
        ['Explorer export Europe / Moyen-Orient', 'Mise en place d\'un agent commercial en Europe (Paris, Milan) — Premier contrat 2030', 'Participation Salon Marmomacc Verone 2028', 'Leads qualifies export (nb/an)', 'T3 2028'],
        ['Optimiser les finitions et la gamme', 'Proposer 8 finitions (poli, flambé, bouchardé, sablé, bush-hammered, scié, antiqué, natural) — Catalogue produits', 'Publication catalogue produits CGI SA granite', 'Nombre de finitions disponibles (nb)', 'T3 2028'],
      ],
      [28, 22, 18, 18, 14]
    ),
    sp(),
    tbl(
      ['Indicateur financier Programme 2', '2028', '2029', '2030', '2033', '2036'],
      [
        ['CA dalles granite (M FCFA)', '225', '472', '675', '675', '675'],
        ['EBITDA dalles (M FCFA)', '124', '260', '371', '371', '371'],
        ['Marge EBITDA dalles (%)', '55 %', '55 %', '55 %', '55 %', '55 %'],
        ['Contribution au CA total (%)', '3,2 %', '6,2 %', '8,3 %', '6,9 %', '6,3 %'],
        ['ROI programme 2 (CA cum / CAPEX)', '—', '0,07x', '0,28x', '0,90x', '1,59x'],
      ],
      [28, 14, 14, 14, 14, 14]
    ),
    sp(),
    infoBox('Business case Programme 2 : La marge brute de 55 % sur les dalles est 10 points au-dessus de la marge granulats (45 %). Cette prime de marge justifie l\'investissement de 3 277 M FCFA de la Tranche B meme si les volumes restent modestes (CA 675 M FCFA/an a maturite). Le Programme 2 est un programme de diversification et de valorisation du gisement, pas un programme de volume. Son ROI a 10 ans (1,59x) est superieur au cout du capital (1,12x base 12 %). Il cree de la valeur additionnelle sans peser sur le DSCR des 2029 (CA dalles = couche de marge supplementaire sur une base financiere deja solide).'),
    sp(),
    h3('I.8.3 Programme 3 — Centrale Solaire Hybride 3-4 MWc (Tranche C : 1 712 M FCFA)'),
    sp(),
    body('Le Programme 3 est le programme de decarbonation et d\'autonomie energetique de CGI SA. Son objectif principal est de reduire la dependance aux groupes electrogenes diesel et aux achats d\'electricite EDM (CEET) en installant une centrale solaire photovoltaique de 3-4 MWc avec stockage batteries lithium-ion de 6-8 MWh. Il genere une economie annuelle nette sur les couts energetiques de 280 M FCFA, soit un retour sur investissement de 3,2 ans. Il aligne le projet sur les criteres Banque Verte BIDC (30 % du portefeuille de nouveaux projets d\'ici 2027 doit etre vert) et les IFC Performance Standards (PS 3 — Efficacite des ressources et prevention de la pollution).'),
    sp(),
    tbl(
      ['Axe strategique Programme 3', 'Objectif quantitatif', 'Jalon cle', 'KPI de mesure', 'Date cible'],
      [
        ['Installer 3-4 MWc de photovoltaique', 'Phase 1 : 1,5 MWc (T4 2026) — Phase 2 : 3 MWc (T2 2027) — Phase 3 : 4 MWc (T2 2028)', 'Mise en service Phase 1 solaire', 'Puissance solaire installee (MWc)', 'T4 2026'],
        ['Atteindre 60 % autoconsommation solaire', '25 % en T4 2026 — 45 % en 2027 — 60 % en 2029', 'Premiere mesure couverture solaire en temps reel', 'Couverture solaire site (% mensuel)', 'T1 2027'],
        ['Generer 280 M FCFA/an d\'economie OPEX', 'Economie annuelle nette : carburant + electricite EDM evites — ROI 3,2 ans', 'Comparaison factures energetiques avant/apres', 'Economie OPEX energie (M FCFA/an)', '2028'],
        ['Reduire les emissions de GES de 35 %', '900 T CO2/an evitees en 2028 — 1 200 T en 2030', 'Publication premier bilan carbone certifie GHG Protocol', 'GES evites (T CO2/an)', 'T2 2028'],
        ['Obtenir label Banque Verte BIDC', 'Classification projet vert BIDC — acces potentiel lignes vertes a taux bonifie', 'Soumission dossier Banque Verte BIDC', 'Statut label Banque Verte (OUI/NON)', 'T2 2027'],
        ['Obtenir certification ISO 14001 environnement', 'Certification par organisme independant — Audit externe annuel', 'Audit initial ISO 14001 sans reserve majeure', 'Statut ISO 14001 (OUI/NON)', 'T2 2027'],
        ['Vendre des credits carbone', 'Certification Verra/VCS pour les emissions evitees — Vente 50 M FCFA/an a partir de 2029', 'Verification VCS 3 ans cumules — enregistrement', 'Revenus credits carbone (M FCFA/an)', 'T4 2029'],
      ],
      [28, 22, 18, 18, 14]
    ),
    sp(),
    tbl(
      ['Indicateur financier Programme 3', '2027', '2028', '2029', '2030', '2036'],
      [
        ['Economie OPEX energie (M FCFA/an)', '70', '280', '280', '280', '280'],
        ['GES evites (T CO2/an)', '300', '900', '1 200', '1 200', '1 400'],
        ['Couverture solaire site (%)', '25 %', '45 %', '60 %', '60 %', '65 %'],
        ['Revenus credits carbone (M FCFA/an)', '0', '0', '50', '50', '55'],
        ['ROI Programme 3 (CAPEX 1 712 M FCFA)', '—', '0,16x', '0,33x', '0,49x', '1,96x'],
      ],
      [28, 12, 12, 12, 12, 12]
    ),
    sp(),
    successBox('Business case Programme 3 : L\'economie annuelle nette de 280 M FCFA/an genere un ROI de 3,2 ans sur le CAPEX de 1 712 M FCFA — largement inferieur a la duree de remboursement de la dette BIDC (8 ans). Sur la duree totale du pret (2027-2034), le Programme 3 generate une economie cumulee de 2 240 M FCFA, soit 131 % de son CAPEX. Il s\'autofinance entierement avant la fin du pret. En additionnant les revenus futurs de credits carbone (50 M FCFA/an des 2029) et la valeur residuelle de l\'installation (durée de vie 25 ans), le Programme 3 est l\'un des investissements les plus rentables du portefeuille CAPEX de CGI SA. Il contribue directement a l\'amelioration du DSCR en reduisant l\'OPEX et en augmentant l\'EBITDA de 280 M FCFA/an.'),
    sp(),
    h3('I.8.4 Synthese de mise en oeuvre — Calendrier de deploiement des 3 programmes'),
    sp(),
    tbl(
      ['Phase', 'Periode', 'Programme(s) actif(s)', 'Investissement (M FCFA)', 'Production cible', 'Jalons cles'],
      [
        ['Phase 0 — Preparation', 'T3-T4 2026', 'Tous — Preparation', '80 (maintenance + etudes)', '265 000 T (Ligne 1)', 'Finalisation dossier BIDC — commandes passees — recrutements cles'],
        ['Phase 1 — Construction', 'T1-T4 2027', 'Programme 1 (Tranche A) + Infra (D)', '3 910 (A + D)', '530 000 T (Lignes 1+2)', 'Tirage BIDC T1 2027 — Ligne 2 operationnelle T2 2027 — Ligne 3 T4 2027 — Flotte 18 camions'],
        ['Phase 2 — Diversification', 'T1-T2 2028', 'Programme 2 (Tranche B) + Programme 3 (Tranche C)', '4 989 (B + C)', '795 000 T + 5 000 m2 dalles', 'Scie Breton operationnelle T1 2028 — Centrale solaire 3 MWc T2 2028 — LC BFR tiree T3 2028'],
        ['Phase 3 — Regime de croisiere', '2028-2034', 'Exploitation pleine capacite — 3 programmes actifs', '120/an (maintenance)', '795 000 T + 15 000 m2 + 60 % solaire', 'DSCR > 1,5x — Debut remboursement capital 2029 — Certification ISO 14001 T2 2027'],
        ['Phase 4 — Developpement', '2029-2036', 'Expansion commerciale + Options Phase 2', '500-800 (logistique)', '827 000-930 000 T', 'Export CEDEAO > 10 % CA — Label Banque Verte BIDC — Remboursement total dette 2034'],
      ],
      [14, 14, 22, 16, 18, 16]
    ),
    sp(),
    infoBox('Note de coherence calendrier : Le calendrier de deploiement est concu pour maximiser la generation de cash-flows avant le debut du remboursement du capital BIDC (T1 2029). Les 24 mois de difference de capital (2027-2028) offrent une fenetre d\'installation et de montee en production sans pression financiere. En 2029, premiere annee de remboursement, les trois programmes sont pleinement operationnels et generent un EBITDA de 5 270 M FCFA — largement suffisant pour couvrir le service de la dette de 2 399 M FCFA (DSCR 2,19x). Cette sequentialite du calendrier est une des cles de la bancabilite du projet. Source : Plan d\'Affaires 2026-2036 CORNERSTONE GROUP INTERNATIONAL + Modele financier KHEPRA EXPERTS.'),
    sp(),
  ];
}



