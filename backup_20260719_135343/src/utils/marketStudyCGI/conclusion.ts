import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, body, bullet, tbl, kpiRow, pb, infoBox, successBox, alertBox,
} from '@/utils/businessPlanCGI/helpers';

export function conclusion(): (Paragraph | Table)[] {
  return [
    h1('CONCLUSION — VIABILITÉ COMMERCIALE DU PROJET CGI SA'),
    sp(),

    h2('1. Synthèse des conclusions par section'),
    sp(),
    body('L\'étude de marché menée par KHEPRA EXPERTS sur le marché des granulats au Togo et en Afrique de l\'Ouest confirme, de manière factuelle et chiffrée, la viabilité commerciale exceptionnelle du projet CGI SA. Les cinq sections de cette étude convergent vers une conclusion unanime : le marché est structurellement porteur, la concurrence est segmentée et vulnérable, et CGI SA dispose d\'un positionnement stratégique unique et défendable.'),
    sp(),

    tbl(
      ['Section', 'Conclusion principale', 'Niveau de confiance'],
      [
        ['I. TAM/SAM/SOM', 'Marché de 8,5 M T/an (SAM) — SOM cible 795K T/an (9,4%) réaliste et conservateur', 'Élevé'],
        ['II. Demande structurelle', 'Trois moteurs (PND, urbanisation, grands chantiers) génèrent 23,1 M T sur 2026-2030, soit 5,4x le SOM', 'Élevé'],
        ['III. Segmentation produits', '7 classes granulométriques + spécialité haute résistance — marge moyenne 37,1%', 'Élevé'],
        ['IV. Concurrence', 'Granutogo vulnérable (sud seulement, équipements vieillissants) — carrières artisanales non menaçantes', 'Élevé'],
        ['V. Prix et export', 'Hypothèse conservative +3%/an — export Bénin 50-80K T/an — diversification géographique', 'Élevé'],
      ],
      [15, 65, 20]
    ),
    sp(),

    h2('2. Validation des hypothèses critiques'),
    sp(),
    body('Les hypothèses sous-jacentes à l\'étude de marché ont été confrontées à des sources indépendantes et vérifiables. Le tableau suivant synthétise leur validation :'),
    sp(),

    tbl(
      ['Hypothèse critique', 'Valeur retenue', 'Source de validation', 'Niveau de confiance'],
      [
        ['TAM Afrique de l\'Ouest', '45 M T/an', 'Banque Mondiale 2023', 'Élevé'],
        ['SAM (rayon 500 km)', '8,5 M T/an', 'INSEED + INSAE + Ghana Stats', 'Élevé'],
        ['SOM cible 2028', '795K T/an (9,4% SAM)', 'Benchmark sectoriel + contrat CIMCO', 'Élevé'],
        ['Croissance prix', '+3%/an', 'Conservateur vs +5,4% observé Lomé', 'Élevé'],
        ['Volume export Bénin', '50-80K T/an', 'Entretiens SETSTO/EGIS + données douanes', 'Moyen à Élevé'],
        ['Marge brute moyenne', '37,1%', 'Benchmark industrie extractive UEMOA', 'Élevé'],
        ['Demande PND 2025-2029', '10,85 M T', 'Ministère Travaux Publics Togo', 'Élevé'],
        ['Urbanisation Lomé', '+3,2%/an', 'INSEED projections 2024-2050', 'Élevé'],
      ],
      [25, 20, 35, 20]
    ),
    sp(),

    h2('3. Matrice risque / opportunité commerciale'),
    sp(),
    body('La viabilité commerciale du projet CGI SA est évaluée selon une matrice risque / opportunité, intégrant les facteurs externes et internes au projet :'),
    sp(),

    h3('3.1 Opportunités commerciales'),
    body('Les opportunités pesant positivement sur la viabilité commerciale de CGI SA sont structurelles et durables :'),
    sp(),
    bullet('Marché sous-alimenté : La demande de granulats au Togo (3,2 M T/an) excède la production nationale (2,5 M T/an) de 700 000 T/an. Cette tension structurelle soutient les prix et garantit l\'écoulement de la production.'),
    bullet('Fenêtre de marché 2026-2028 : Aucun nouveau producteur industriel de grande envergure n\'est annoncé au Togo avant 2028. CGI SA dispose d\'une fenêtre de 2-3 ans pour consolider sa position avant toute réaction concurrentielle majeure.'),
    bullet('Export Bénin : Le déficit structurel béninois (700K T/an) offre un marché immédiat et peu concurrentiel, avec des prix supérieurs au marché togolais de 8-12%.'),
    bullet('Spécialité haute résistance : Ce segment premium, à forte marge (48-55%), est sous-alimenté dans toute la CEDEAO. CGI SA est l\'un des trois seuls producteurs capables de certifier des granulats > 120 MPa.'),
    bullet('Contrat cadre CIMCO : La base installée de 150 000 T/an (19% du SOM) réduit le risque de démarrage commercial et fournit un revenu prévisible dès la première année.'),
    sp(),

    h3('3.2 Risques commerciaux et atténuation'),
    body('Les risques commerciaux identifiés sont gérables et leur impact est limité grâce aux mécanismes d\'atténuation déployés :'),
    sp(),

    tbl(
      ['Risque commercial', 'Probabilité', 'Impact', 'Atténuation'],
      [
        ['Guerre des prix (Granutogo)', 'Moyenne (25%)', 'Compression marge 5-8 pts', 'Développement segments spécialité (marges 48-55%)'],
        ['Retard grands chantiers publics', 'Moyenne (20%)', 'Baisse volume 10-15%', 'Diversification client (promoteurs, export, PME)'],
        ['Hausse coûts énergétiques', 'Élevée (40%)', 'Baisse marge 3-5 pts', 'Centrale solaire 3-4 MWc (réduction 35% facture)'],
        ['Concurrence import (Ghana)', 'Faible (15%)', 'Perte volume 5-8%', 'Avantage logistique nord (-20 à -40% coût transport)'],
        ['Retard permis / réglementation', 'Faible (10%)', 'Retard mise en service 6-12 mois', 'Permis DGMG déjà acquis, avocats spécialisés'],
        ['Volatilité change Cedi/FCFA', 'Moyenne (30%)', 'Impact export Bénin 3-5%', 'Contrats en FCFA, couverture change si nécessaire'],
      ],
      [30, 15, 20, 35]
    ),
    sp(),

    h2('4. Indicateurs clés de performance commerciale (KPI)'),
    sp(),
    body('Les KPI commerciaux suivants seront suivis par le management de CGI SA pour piloter la stratégie de marché et mesurer la performance :'),
    sp(),

    tbl(
      ['KPI commercial', 'Cible 2028', 'Seuil alerte', 'Seuil critique', 'Fréquence suivi'],
      [
        ['Volume vendu (T/an)', '795 000', '< 650 000', '< 500 000', 'Mensuel'],
        ['Part de marché (SAM)', '9,4 %', '< 7,5 %', '< 5,0 %', 'Trimestriel'],
        ['Prix moyen pondéré (FCFA/T)', '8 000', '< 7 200', '< 6 500', 'Mensuel'],
        ['Marge brute (%)', '37,1 %', '< 32 %', '< 28 %', 'Trimestriel'],
        ['Taux de disponibilité production', '95 %', '< 88 %', '< 80 %', 'Hebdomadaire'],
        ['Délai moyen livraison (jours)', '2,5', '> 4,0', '> 5,5', 'Mensuel'],
        ['Taux de rétention clients', '85 %', '< 75 %', '< 65 %', 'Annuel'],
        ['Part export (%)', '10 %', '< 6 %', '< 3 %', 'Trimestriel'],
        ['Nouveaux clients / an', '24', '< 15', '< 10', 'Annuel'],
      ],
      [30, 15, 15, 15, 15]
    ),
    sp(),

    h2('5. Recommandation stratégique finale'),
    sp(),
    body('Au terme de cette étude de marché exhaustive, KHEPRA EXPERTS formule les recommandations stratégiques suivantes pour CGI SA :'),
    sp(),
    bullet('RECOMMANDATION 1 — Accélérer le Programme 1 : Le déploiement de la Ligne 2 (2 100 M FCFA) et de la Ligne 3 (2 000 M FCFA) doit être priorisé pour atteindre la capacité de 795 000 T/an en 2028 et saisir la fenêtre de marché 2026-2028 avant toute réaction concurrentielle.'),
    bullet('RECOMMANDATION 2 — Constituer un portefeuille export Bénin : Le recrutement d\'un commercial basé à Cotonou et la signature de 2-3 contrats cadres avec des grands entrepreneurs béninois doivent être réalisés dès 2027 pour sécuriser le volume export de 50-80K T/an.'),
    bullet('RECOMMANDATION 3 — Développer le segment spécialité : L\'investissement dans un équipement de polissage des dalles granite (CAPEX 180 M FCFA) doit être évalué en 2027 pour capter le marché premium à marge 55%.'),
    bullet('RECOMMANDATION 4 — Renforcer le marketing B2B : La création d\'un site web, d\'une brochure technique certifiée LNBTP, et d\'une présence LinkedIn permettront de générer des leads qualifiés auprès des bureaux d\'études, promoteurs et grands comptes.'),
    bullet('RECOMMANDATION 5 — Sécuriser les marchés publics : L\'obtention de l\'agrément ARMP (déjà en cours) et le dépôt de candidature systématique aux appels d\'offres > 100 M FCFA du Ministère des Travaux Publics garantiront 25-30% du volume via des contrats récurrents.'),
    sp(),

    h2('6. Conclusion sur la viabilité commerciale'),
    sp(),
    body('L\'étude de marché démontre, au travers de données sourcées, de tableaux comparatifs et d\'analyses structurelles, que le projet CGI SA remplit l\'ensemble des conditions de viabilité commerciale requises par les standards des institutions de financement du développement :'),
    sp(),
    bullet('Marché porteur : TAM 45 M T/an, SAM 8,5 M T/an, avec une croissance structurelle de +4,2%/an portée par le PND, l\'urbanisation et les grands chantiers.'),
    bullet('Positionnement défendable : Cinq avantages cumulatifs (logistique nord, technologie METSO, gisement 201 ha/50M+ T, certification LNBTP, flexibilité industrielle) créant des barrières à l\'entrée de 3 à 5 ans.'),
    bullet('Stratégie de prix robuste : Hypothèse conservative +3%/an, value-based pricing par segment, marge brute moyenne 37,1%, DSCR 1,85x au-dessus des covenants BIDC.'),
    bullet('Diversification géographique : Export Bénin 50-80K T/an réduisant la dépendance au marché togolais et capturant un premium de 8-12%.'),
    bullet('Base installée : Contrat cadre CIMCO 150K T/an, portefeuille initial de 12 clients, et relations institutionnelles (DGMG, ARMP, LNBTP) déjà établies.'),
    sp(),

    successBox('Jugement final KHEPRA EXPERTS : Le projet CGI SA présente un profil commercial exceptionnel. Le marché est structurellement sous-alimenté, la concurrence est segmentée et vulnérable, et CGI SA dispose d\'un positionnement stratégique unique. Les projections commerciales (795K T/an, 6,4 Mds FCFA de CA en 2028) sont réalistes, prudentes, et directement corrélées à des programmes d\'investissement publics vérifiables. Nous recommandons favorablement l\'investissement et le financement du projet.'),
    sp(),

    infoBox('Référence : KE-EM-CGI-2026-001 | Sections : I. Analyse TAM/SAM/SOM | II. Dynamiques de demande structurelle | III. Segmentation produits et qualité | IV. Analyse concurrentielle | V. Stratégie de prix et export | Conclusion : Viabilité commerciale | Préparé par : KHEPRA EXPERTS, Cabinet de Conseil de Réputation Internationale | Pour : CORNERSTONE GROUP INTERNATIONAL (CGI) SA | Mai 2026 | CONFIDENTIEL'),
    pb(),
  ];
}



