export interface TransferPricingCase {
  id: string;
  titre: string;
  type: 'Master File' | 'Local File' | 'Benchmarking' | 'Analyse FAR' | 'APA' | 'CbCR' | 'Documentation';
  zone: 'UEMOA' | 'CEMAC' | 'International';
  secteur: 'Banque' | 'Microfinance' | 'Télécoms' | 'Mines' | 'Agro-industrie' | 'Services' | 'Industrie';
  niveau: 'ROUGE' | 'ORANGE' | 'JAUNE';
  date: string;
  description: string;
  exigences_cles: string[];
  risques: string;
  action_recommandee: string;
  statut: 'À faire' | 'En cours' | 'Conforme';
}

export const TransferPricingCases: TransferPricingCase[] = [
  {
    id: 'tp-1',
    titre: 'Documentation Prix de Transfert — Master File Groupe Bancaire Panafricain',
    type: 'Master File',
    zone: 'UEMOA',
    secteur: 'Banque',
    niveau: 'ROUGE',
    date: '2026-06-01',
    description: 'Le Master File est le document de synthèse décrivant la politique de prix de transfert du groupe multinational (BEPS Action 13 — Annexe I). Contient : structure organisationnelle, description des activités, intangibles, activités financières, positions financières et fiscales. Obligatoire pour les groupes > 750M€ de CA.',
    exigences_cles: ['Structure organisationnelle du groupe', 'Description des activités (MCA)', 'Intangibles du groupe', 'Politique de financement interne', 'Situation fiscale consolidée'],
    risques: 'Absence de Master File = amende jusqu\'à 5% du CA ajusté. Redressement fiscal sur 3 ans. Risque réputationnel.',
    action_recommandee: 'Rédiger le Master File BEPS Action 13. Valider par un expert TP indépendant. Déposer avant le 31/12/2026.',
    statut: 'À faire',
  },
  {
    id: 'tp-2',
    titre: 'Local File — Filiale Microfinance (SFD) en zone UEMOA',
    type: 'Local File',
    zone: 'UEMOA',
    secteur: 'Microfinance',
    niveau: 'ROUGE',
    date: '2026-06-15',
    description: 'Le Local File documente les transactions intra-groupe de l\'entité locale (BEPS Action 13 — Annexe II). Doit inclure : description de l\'entité, transactions intra-groupe détaillées (nature, montants, contreparties), analyse fonctionnelle, méthode de prix de transfert appliquée, comparables.',
    exigences_cles: ['Description de l\'entité locale', 'Transactions intra-groupe détaillées', 'Analyse fonctionnelle (FAR)', 'Méthode TP justifiée', 'Benchmarking comparables'],
    risques: 'Transactions intra-groupe non documentées = redressement sur la base de l\'article 17 du CGI. Risque de double imposition. Sanctions BCEAO.',
    action_recommandee: 'Identifier toutes les transactions intra-groupe. Réaliser l\'analyse FAR. Sélectionner la méthode TP. Rédiger le Local File.',
    statut: 'En cours',
  },
  {
    id: 'tp-3',
    titre: 'Benchmarking — Taux d\'intérêt intra-groupe pour prêt actionnaire',
    type: 'Benchmarking',
    zone: 'CEMAC',
    secteur: 'Télécoms',
    niveau: 'ORANGE',
    date: '2026-05-20',
    description: 'Étude de benchmarking pour justifier le taux d\'intérêt d\'un prêt de 15Mds FCFA accordé par la maison mère (France) à sa filiale camerounaise. Doit démontrer que le taux appliqué (6,5%) est de pleine concurrence. Utilisation de bases de données (Orbis, TP Catalyst, LoanConnector).',
    exigences_cles: ['Définition de la transaction testée', 'Sélection des comparables (≥ 8)', 'Ajustements de comparabilité', 'Intervalle de pleine concurrence', 'Documentation de la recherche'],
    risques: 'Taux insuffisamment justifié = redressement sur l\'écart de taux. Ajustement secondaire (distribution de dividendes déguisée).',
    action_recommandee: 'Lancer l\'étude de benchmarking (Orbis). Documenter la recherche de comparables. Justifier le taux appliqué.',
    statut: 'À faire',
  },
  {
    id: 'tp-4',
    titre: 'Analyse fonctionnelle (FAR) — Centrale d\'achat régionale CEMAC',
    type: 'Analyse FAR',
    zone: 'CEMAC',
    secteur: 'Agro-industrie',
    niveau: 'ORANGE',
    date: '2026-04-10',
    description: 'Analyse fonctionnelle complète (Fonctions, Actifs, Risques) de la centrale d\'achat basée au Gabon servant 6 filiales dans la zone CEMAC. Détermination du profil fonctionnel (distributeur à risques limités, intermédiaire qualifié, agent commissionné) pour justifier la marge appliquée.',
    exigences_cles: ['Fonctions exercées (approvisionnement, logistique, QA)', 'Actifs utilisés (entrepôts, SI, marques)', 'Risques assumés (change, crédit, stock)', 'Profil fonctionnel déterminé', 'Méthode TP cohérente'],
    risques: 'Profil fonctionnel incorrect = méthode TP inadaptée = redressement. Débat avec l\'administration fiscale.',
    action_recommandee: 'Réaliser les entretiens FAR. Documenter les fonctions, actifs, risques. Déterminer le profil fonctionnel.',
    statut: 'En cours',
  },
  {
    id: 'tp-5',
    titre: 'Déclaration Pays par Pays (CbCR) — Groupe Minier UEMOA',
    type: 'CbCR',
    zone: 'UEMOA',
    secteur: 'Mines',
    niveau: 'ROUGE',
    date: '2026-03-01',
    description: 'Obligation de déclaration pays par pays (Country-by-Country Reporting — BEPS Action 13) pour les groupes miniers dont le CA consolidé excède 500M€. Détail par juridiction : CA, bénéfice, impôt payé, effectifs, actifs. Notification à l\'administration fiscale du pays de la mère.',
    exigences_cles: ['CA par juridiction', 'Bénéfice/Pertes par juridiction', 'Impôt sur les bénéfices payé', 'Effectifs par juridiction', 'Actifs corporels par juridiction'],
    risques: 'Non-déclaration CbCR = amende forfaitaire + redressement. Atteinte à la réputation. Risque médiatique élevé pour le secteur minier.',
    action_recommandee: 'Compiler les données CbCR par juridiction. Déposer la déclaration. Notification à l\'administration fiscale.',
    statut: 'À faire',
  },
  {
    id: 'tp-6',
    titre: 'Documentation prix de transfert — Management fees Groupe de Services UEMOA/CEMAC',
    type: 'Documentation',
    zone: 'UEMOA',
    secteur: 'Services',
    niveau: 'JAUNE',
    date: '2026-02-15',
    description: 'Documentation des frais de management (management fees) facturés par la holding (Abidjan) aux 8 filiales UEMOA et CEMAC. Doit démontrer : réalité des services rendus, méthode de refacturation (méthode directe ou clé de répartition), bénéfice pour les filiales, marge appliquée.',
    exigences_cles: ['Contrat de management services', 'Détail des services rendus', 'Clé de répartition documentée', 'Justification de la marge', 'Bénéfice pour les filiales'],
    risques: 'Management fees non documentés = réintégration fiscale + retenue à la source. Double imposition possible.',
    action_recommandee: 'Formaliser le contrat de management services. Documenter la clé de répartition. Justifier la marge appliquée.',
    statut: 'En cours',
  },
  {
    id: 'tp-7',
    titre: 'Accord Préalable de Prix (APA) — Transfert de technologie Industrie Pharmaceutique',
    type: 'APA',
    zone: 'International',
    secteur: 'Industrie',
    niveau: 'JAUNE',
    date: '2026-01-20',
    description: 'Demande d\'Accord Préalable de Prix (APA) pour sécuriser la rémunération du transfert de technologie (savoir-faire, brevets, assistance technique) entre la maison mère indienne et la filiale sénégalaise. Redevance proposée : 5% du CA net. Procédure APA bilatérale Inde-Sénégal souhaitée.',
    exigences_cles: ['Description du transfert de technologie', 'Justification du taux de redevance', 'Analyse de comparabilité', 'Business plan 5 ans', 'Procédure APA bilatérale'],
    risques: 'Redevance contestée = redressement sur 3 ans. Risque de double imposition sans APA bilatéral.',
    action_recommandee: 'Préparer le dossier APA. Benchmarking redevances secteur pharmaceutique. Business plan 5 ans. Demander ouverture APA.',
    statut: 'À faire',
  },
  {
    id: 'tp-8',
    titre: 'Politique de prix de transfert — Groupe Microfinance Panafricain',
    type: 'Master File',
    zone: 'UEMOA',
    secteur: 'Microfinance',
    niveau: 'ORANGE',
    date: '2026-05-01',
    description: 'Élaboration de la politique de prix de transfert pour un groupe de microfinance opérant dans 8 pays UEMOA/CEMAC. Transactions à documenter : refinancement intra-groupe, assistance technique, frais de siège, licence de logiciel de gestion SFD, refacturation des coûts de conformité.',
    exigences_cles: ['Politique TP écrite et approuvée', 'Identification des transactions intra-groupe', 'Méthodes TP par type de transaction', 'Documentation annuelle obligatoire', 'Revue périodique de la politique'],
    risques: 'Absence de politique TP = risque systématique sur toutes les transactions intra-groupe. Redressements en cascade.',
    action_recommandee: 'Rédiger la politique TP du groupe. Cartographier les transactions intra-groupe. Déployer la documentation dans chaque filiale.',
    statut: 'En cours',
  },
];





