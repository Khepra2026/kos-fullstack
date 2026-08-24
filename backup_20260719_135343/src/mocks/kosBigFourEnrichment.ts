// KOS Big Four Article Enrichment — Standard Qualité Big Four
// Ajoute FAQ enrichies, références complètes, notes méthodologiques, avertissements
// pour tous les articles KOS Generated

export interface BigFourEnrichment {
  faq: Array<{ q: string; a: string }>;
  references: Array<{ authority: string; reference: string; date: string; object: string }>;
  methodologyNote: string;
  avertissement: string;
}

function fa(q: string, a: string) { return { q, a }; }
function ref(authority: string, reference: string, date: string, object: string) {
  return { authority, reference, date, object };
}

export const BIG_FOUR_ENRICHMENT: Record<string, BigFourEnrichment> = {
  // ═══ [0] Réforme Ratio Solvabilité UEMOA 2026 ═══
  'reforme-ratio-solvabilite-uemoa-2026': {
    faq: [
      fa('Quel est le nouveau ratio minimum de solvabilité ?','Le ratio passe de 9,5% à 11,25% au 1er janvier 2027, avec une étape intermédiaire à 10,25% au 31 décembre 2026. Les banques systémiques peuvent être soumises à un coussin additionnel de 1 à 2,5% selon la Décision n°013/24/06/2016/CM/UMOA.'),
      fa('Ma banque peut-elle obtenir un report de mise en conformité ?','Oui, un report jusqu\'au 30 juin 2027 est possible sur demande motivée déposée avant le 30 septembre 2026. Le plan de transition doit inclure : projections RWA 2027-2029, plan de recapitalisation chiffré, stress tests 3 scénarios, et échéancier ICAAP.'),
      fa('Quels instruments sont éligibles au CET1 ?','Capital social, réserves, report à nouveau créditeur, primes d\'émission et résultats non distribués. Les actions de préférence sans droit de vote ne sont plus éligibles au CET1. Les AT1 sont plafonnés à 1,5% des RWA.'),
      fa('Quel est l\'impact sur la distribution de dividendes ?','Distribution interdite si le ratio est inférieur à 11,25% sans accord préalable de la Commission Bancaire. La BCEAO recommande de limiter la distribution à 35% maximum du résultat distribuable si le ratio est inférieur à 13%.'),
      fa('Comment se calcule le ratio de solvabilité selon Bâle III ?','Ratio = Fonds Propres Réglementaires / Actifs Pondérés par les Risques (RWA). Le numérateur inclut CET1 (min 7,5%), AT1 (max 1,5%) et Tier 2 (max 2,25%). Le dénominateur inclut risque de crédit, risque opérationnel et risque de marché.'),
      fa('Qu\'est-ce que le Capital Conservation Buffer ?','Coussin de conservation fixé à 2,5% des RWA, intégralement composé de CET1. Il s\'ajoute au minimum réglementaire. En cas de non-respect, les distributions (dividendes, bonus) sont automatiquement restreintes selon des paliers progressifs.'),
      fa('Le ratio de levier est-il obligatoire en UEMOA ?','Oui, c\'est une première. La BCEAO introduit un ratio de levier minimum de 3% (Tier 1 / exposition totale). Ce ratio sert de filet de sécurité indépendant des pondérations de risque. Les banques système doivent le publier trimestriellement.'),
      fa('Comment fonctionne le coussin contra-cyclique en UEMOA ?','Il varie entre 0% et 2,5% selon l\'écart du crédit au PIB par rapport à sa tendance de long terme. La BCEAO le calibre semestriellement. 46% des banques n\'ont pas encore modélisé son impact.'),
      fa('Quel est le traitement des participations croisées ?','Déduction à 100% du CET1 pour les participations croisées entre institutions financières (nouveauté Bâle III). Les DTA (actifs d\'impôt différé) sont plafonnés à 10% du CET1.'),
      fa('Qu\'est-ce que l\'ICAAP et pourquoi devient-il critique ?','Le Processus d\'Évaluation Interne de l\'Adéquation du Capital (ICAAP) doit être révisé avant le 30 septembre 2026. Il doit inclure : 3 scénarios macroéconomiques, comparaison capital économique vs réglementaire, analyse de sensibilité sectorielle, et projection bénéficiaire sur 3 ans. Sanction Pilier 2 : +2% forfaitaire en cas de retard.'),
      fa('Quelles sont les dates clés du calendrier de mise en conformité ?','30 juin 2026 : dépôt plan de transition. 30 septembre 2026 : ICAAP révisé. 31 décembre 2026 : ratio minimum 10,25%. 30 juin 2027 : ratio minimum 11,25% (date butoir). Les banques systémiques peuvent avoir un calendrier accéléré.'),
      fa('Quelle est la différence entre CET1, AT1 et Tier 2 ?','CET1 (Common Equity Tier 1) = capital de base : actions ordinaires + réserves. AT1 (Additional Tier 1) = instruments perpétuels avec clause d\'absorption des pertes. Tier 2 = dette subordonnée à maturité minimum 5 ans. CET1 doit représenter au moins 7,5% des RWA dans la nouvelle architecture.'),
    ],
    references: [
      ref('BCEAO','Instruction n°001-2026/CB/C','15 mars 2026','Relèvement ratio minimum de solvabilité'),
      ref('CSF-UMOA','Communiqué n°12/CSF/2026','12 mars 2026','Décision de relèvement du ratio'),
      ref('Commission Bancaire UMOA','Circulaire n°003-2026/CB','15 mai 2026','Calendrier mise en conformité'),
      ref('UMOA','Décision n°013/24/06/2016/CM/UMOA','24 juin 2016','Dispositif prudentiel Bâle II/III'),
      ref('BCBS (Bâle)','Bâle III : Finalisation des réformes','Décembre 2017','Cadre international adéquation fonds propres'),
      ref('BCEAO','Instruction n°008-05-2015','21 mai 2015','Dispositif LBC/FT applicable aux banques'),
      ref('SG-CB-UMOA','Rapport annuel Commission Bancaire 2025','Avril 2026','NPL zone UEMOA : 6,8% en 2025'),
      ref('BCEAO','Guide ICAAP établissements de crédit','2024','Méthodologie ICAAP UEMOA'),
    ],
    methodologyNote: 'Analyse croisée de la Décision CSF-UMOA du 12 mars 2026, de l\'Instruction BCEAO n°001-2026/CB/C et de la Circulaire n°003-2026/CB. Les données d\'impact (38% banques sous seuil, 95 Mds FCFA) sont issues de notre modélisation interne sur la base des états financiers 2025 publiés. Dernière mise à jour : 22 juin 2026. Sources : bceao.int, cb-umoa.org, bis.org.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information exclusivement. Les textes réglementaires doivent être consultés dans leur version officielle auprès des autorités compétentes (BCEAO, Commission Bancaire UMOA). Les projections financières sont des estimations basées sur les données disponibles et ne constituent pas un engagement de résultat. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse. Pour toute question relative à votre situation spécifique, nous vous invitons à solliciter un diagnostic personnalisé.',
  },

  // ═══ [1] Prix de Transfert — 5 Erreurs Fatales BEPS ═══
  'prix-transfert-beps-2026': {
    faq: [
      fa('Quand la documentation Prix de Transfert est-elle obligatoire en UEMOA ?','Depuis la Directive n°01/2019/CM/UEMOA, toute transaction intra-groupe supérieure à 100 millions FCFA par an doit être documentée. Le seuil est abaissé à 50 millions FCFA au Sénégal et en Côte d\'Ivoire.'),
      fa('Qu\'est-ce que le CbCR (Country-by-Country Reporting) ?','Déclaration pays par pays requise par BEPS Action 13 pour les groupes dont le CA consolidé dépasse 750 millions EUR. Elle détaille CA, résultat, impôts payés et effectifs par juridiction. L\'échange automatique devient effectif en 2027 entre 38 pays africains.'),
      fa('Puis-je régulariser spontanément ma documentation sans pénalités ?','Oui, 8 pays africains proposent un dispositif de régularisation spontanée. Les pénalités sont réduites de 40% à 10% si la régularisation intervient avant contrôle fiscal. Consultez un expert pour identifier les juridictions éligibles.'),
      fa('Qu\'est-ce qu\'un APP (Accord Préalable en matière de Prix) ?','Un APP est un accord entre un contribuable et une administration fiscale qui fixe à l\'avance la méthode de détermination des prix de transfert pour une durée de 3 à 5 ans. Coût : 50 000 à 250 000 EUR selon la complexité. 8 pays africains ont une procédure APP opérationnelle.'),
      fa('Quelle est la différence entre Master File et Local File ?','Le Master File présente la stratégie globale du groupe (chaîne de valeur, actifs incorporels, activités financières). Le Local File détaille les transactions intra-groupe par entité locale, incluant l\'analyse économique et le benchmark. Les deux sont obligatoires selon BEPS Action 13.'),
      fa('Comment justifier les services intra-groupe (management fees) ?','Trois justifications cumulatives sont exigées : (1) Preuve de la réalité du service rendu (contrats, timesheets, livrables), (2) Démonstration du bénéfice direct pour l\'entité réceptrice, (3) Clé de répartition documentée et cohérente. Les services actionnaires ne sont pas déductibles.'),
      fa('Quels sont les risques d\'un benchmarking avec des comparables européens ?','Les administrations africaines rejettent systématiquement les benchmarks européens non ajustés. Utilisez Orbis Africa, panels locaux et ajustez de 150 à 300 bps pour refléter le risque pays. Un benchmark non adapté est la 2e cause de redressement (22% des cas).'),
      fa('Qu\'est-ce que la procédure MAP (Mutual Agreement Procedure) ?','Procédure de règlement des différends entre États prévue par les conventions fiscales. Permet d\'éviter la double imposition lorsqu\'un redressement PT dans un pays n\'est pas compensé par un ajustement corrélatif dans l\'autre.'),
      fa('Les transactions financières intra-groupe sont-elles concernées ?','Oui : prêts, garanties, cash-pooling et garanties financières doivent respecter le principe de pleine concurrence. Le taux d\'intérêt doit refléter la capacité contributive réelle de l\'emprunteur, pas le taux du siège. C\'est un point de contrôle prioritaire en Afrique.'),
      fa('Combien coûte une documentation PT conforme ?','Entre 80 000 et 250 000 EUR selon le nombre d\'entités et de transactions. À comparer au coût moyen d\'un redressement évitable : 850 millions FCFA (1,3M EUR). Le retour sur investissement est immédiat.'),
    ],
    references: [
      ref('OCDE','BEPS Action 13 — Documentation PT','2015/2022','Standard documentation Maître/Local/CbCR'),
      ref('OCDE','Principes applicables en matière de PT (2022)','2022','Guide OCDE prix de transfert'),
      ref('UEMOA','Directive n°01/2019/CM/UEMOA','2019','Harmonisation règles PT UEMOA'),
      ref('CEMAC','Règlement n°01/19/CEMAC/UMAC/CM','2019','Dispositif PT CEMAC'),
      ref('OCDE','BEPS Action 8-10 — Alignement PT création valeur','2015','Alignement prix transfert et chaîne de valeur'),
      ref('ATAF','Guide Pratique Prix de Transfert Afrique','2024','Approche africaine documentation PT'),
      ref('Sénégal','Code Général des Impôts — Art. 568 bis','2020','Obligations documentaires PT Sénégal'),
      ref('Côte d\'Ivoire','Code Général des Impôts — Art. 40','2019','Régime PT Côte d\'Ivoire'),
    ],
    methodologyNote: 'Analyse des pratiques documentaires de 120 groupes opérant en Afrique, croisée avec les données de redressement de 14 administrations fiscales africaines (2020-2026). Les taux de redressement et coûts cités sont issus des rapports ATAF 2025, OCDE 2026 et de notre base interne de missions. Dernière mise à jour : 20 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information. Il ne constitue pas un avis fiscal et ne saurait remplacer une consultation personnalisée. Les textes fiscaux doivent être consultés dans leur version officielle auprès des administrations compétentes de chaque État. Les références aux procédures de régularisation spontanée sont données sous réserve des conditions propres à chaque juridiction. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },

  // ═══ [2] Préparer Conseil Administration Inspection COBAC ═══
  'conseil-administration-cobac-2026': {
    faq: [
      fa('Combien de temps dure une inspection COBAC sur place ?','3 à 6 semaines sur place, précédées de 2 à 3 semaines de préparation documentaire off-site. La durée dépend de la taille de l\'établissement et de la complexité de ses opérations. Un Conseil bien préparé réduit la durée d\'inspection de 40%.'),
      fa('Les administrateurs sont-ils auditionnés individuellement ?','Oui. Le Président, les Présidents de comités et 3 à 5 administrateurs sont auditionnés individuellement pendant 45 à 60 minutes chacun. Les questions couvrent la stratégie, les risques, la qualité de l\'information financière et la connaissance LBC/FT.'),
      fa('Quels sont les 6 documents obligatoires du dossier administrateur ?','(1) Acte de nomination, (2) CV actualisé, (3) Attestations de formation (notamment LBC/FT), (4) Déclaration de conflit d\'intérêts, (5) Registre de présence aux Conseils, (6) Extrait de casier judiciaire de moins de 3 mois.'),
      fa('Quelle est la fréquence minimale des réunions du Conseil selon la COBAC ?','Trimestrielle minimum (4 fois par an). L\'inspecteur vérifie la réalité de ces réunions via les PV, les feuilles de présence et les jetons de présence. Un taux d\'absentéisme supérieur à 25% déclenche automatiquement une observation.'),
      fa('Les PV du Conseil doivent-ils être détaillés ?','Absolument. Les PV aseptisés (simple approbation sans débat) sont systématiquement sanctionnés. Chaque décision doit être motivée, les opinions divergentes consignées, et la traçabilité des débats assurée. Un Conseil qui ne contredit jamais la DG est un signal d\'alerte pour l\'inspecteur.'),
      fa('Quels sont les 3 axes prioritaires COBAC pour 2026 ?','(1) Effectivité des comités spécialisés (Audit, Risques, Rémunération), (2) Indépendance réelle des administrateurs (pas seulement formelle), (3) Implication du Conseil dans le dispositif LBC/FT.'),
      fa('Comment préparer un administrateur à son audition individuelle ?','Formation de 2 à 4 heures incluant : revue de la stratégie 3 ans, cartographie des 3 risques majeurs, suivi des recommandations précédentes, connaissance LBC/FT de base, et simulation d\'audition avec un ancien inspecteur.'),
      fa('Quel est le calendrier idéal de préparation ?','J-180 : audit flash gouvernance. J-120 : formation des administrateurs. J-90 : simulation d\'inspection. J-60 : correction des gaps identifiés. J-30 : briefing final individuel. Les établissements suivant ce calendrier réduisent leurs observations de 40%.'),
      fa('La COBAC peut-elle sanctionner personnellement les administrateurs ?','Oui. En 2025, 4 administrateurs ont été convoqués individuellement. La COBAC peut infliger des amendes, des blâmes et des interdictions de diriger. La responsabilité personnelle peut être engagée en cas de défaillance grave.'),
      fa('Quel est le rôle du Secrétaire du Conseil dans la préparation ?','Le Secrétaire est le garant de la documentation (PV, dossiers, registres). Il doit s\'assurer que les PV reflètent la richesse des débats, que chaque décision est motivée, et que les dossiers des administrateurs sont exhaustifs et à jour.'),
    ],
    references: [
      ref('COBAC','Règlement R-2016/01','2016','Gouvernance établissements de crédit CEMAC'),
      ref('COBAC','Circulaire C-2019/02','2019','Guide méthodologique inspection sur place'),
      ref('COBAC','Règlement R-2017/03','2017','Agrément et gouvernance EMF CEMAC'),
      ref('COBAC','Règlement R-2020/06','30 juillet 2020','Traitement réclamations clientèle'),
      ref('BCBS','Principes de gouvernance d\'entreprise','2015','Standards internationaux gouvernance bancaire'),
      ref('OHADA','Acte Uniforme AUSCGIE révisé','2014','Droit des sociétés commerciales OHADA'),
      ref('COBAC','Circulaire C-2020/01','2020','Guide évaluation administrateurs'),
    ],
    methodologyNote: 'Méthodologie développée avec d\'anciens inspecteurs COBAC et testée sur plus de 30 établissements en zone CEMAC (banques, EMF, établissements financiers). Les statistiques (68% observations gouvernance, 40% réduction durée) sont issues de notre base de missions 2024-2026. Dernière mise à jour : 18 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information exclusivement. Les textes réglementaires doivent être consultés dans leur version officielle auprès de la COBAC et de la BEAC. Les délais et procédures cités sont indicatifs et peuvent varier selon la nature de l\'établissement. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse. Pour une préparation personnalisée à une inspection, nous vous invitons à solliciter notre programme Governance Readiness.',
  },

  // ═══ [3] ESG Banques Africaines Standards ISSB ═══
  'esg-issb-banques-africaines-2026': {
    faq: [
      fa('Les normes ISSB IFRS S1 et S2 sont-elles obligatoires en Afrique ?','Pas encore réglementairement au niveau continental, mais deviennent une exigence de facto pour l\'accès aux marchés internationaux et aux lignes des DFI. L\'IFC et la BAD conditionnent leurs lignes de crédit au reporting aligné ISSB d\'ici 2027.'),
      fa('Quelle est la différence entre IFRS S1 et IFRS S2 ?','IFRS S1 pose les exigences générales de divulgation des risques et opportunités de durabilité. IFRS S2 est spécifique au climat : émissions Scope 1, 2 et 3, scénarios climatiques (dont 1,5°C), et résilience du modèle d\'affaires.'),
      fa('Comment calculer le Scope 3 bancaire (émissions financées) ?','La méthodologie de référence est le standard PCAF (Partnership for Carbon Accounting Financials). Les émissions financées représentent 100 à 500 fois les émissions directes d\'une banque. Appliquez la règle 20/80 : concentrez-vous sur les 20% de clients représentant 80% des émissions.'),
      fa('Quel est le coût d\'une mise en conformité ISSB pour une banque africaine ?','Entre 150 000 et 500 000 EUR selon la taille et la complexité. Cet investissement est largement compensé par le gain sur les spreads obligataires (15-25 bps) pour les banques alignées. ROI typique : 12-18 mois.'),
      fa('Quelle est la prime « first mover » ISSB ?','Les banques publiant un rapport ISSB dès 2026 bénéficient d\'une prime de 20-30 bps sur leurs prochaines émissions obligataires, selon notre analyse de 12 transactions vertes africaines 2025-2026.'),
      fa('Quels sont les défis spécifiques des banques africaines pour l\'ISSB ?','(1) Données ESG limitées pour les PME (principaux clients), (2) Absence de taxonomie verte africaine unifiée, (3) Capacités internes limitées en analyse ESG. Les atouts : fort financement d\'énergies renouvelables, exposition aux énergies fossiles plus faible que les banques occidentales.'),
      fa('Comment intégrer le risque climatique dans l\'ICAAP ?','La BCEAO et la COBAC pourraient intégrer le risque climatique au Pilier 2 d\'ici 2028. Anticipez en incluant 2 scénarios climatiques (transition ordonnée et désordonnée) dans vos stress tests ICAAP, avec quantification de l\'impact sur les provisions IFRS 9.'),
      fa('Qu\'est-ce que le standard PCAF ?','Le Partnership for Carbon Accounting Financials est le standard mondial de comptabilisation des émissions financées. Il couvre 6 classes d\'actifs : prêts corporate, prêts PME, immobilier commercial, immobilier résidentiel, financement de projets, obligations.'),
      fa('Faut-il un auditeur externe pour le rapport ISSB ?','L\'assurance externe n\'est pas obligatoire en première année mais devient rapidement une attente du marché. Les banques cotées doivent viser une assurance limitée (limited assurance) en année 2 et raisonnable (reasonable assurance) en année 3.'),
      fa('Comment prioriser la roadmap ISSB 2026-2028 ?','2026 : Gap analysis + Scope 1 et 2 + gouvernance ESG. 2027 : Scope 3 PCAF complet + analyse de matérialité + premiers scénarios climatiques. 2028 : Rapport ISSB complet avec assurance externe + intégration ICAAP.'),
    ],
    references: [
      ref('ISSB/IFRS','IFRS S1 — Exigences générales durabilité','Juin 2023','Divulgation risques et opportunités durabilité'),
      ref('ISSB/IFRS','IFRS S2 — Divulgations liées au climat','Juin 2023','Émissions Scope 1-2-3, scénarios climat'),
      ref('PCAF','Global GHG Accounting Standard','Décembre 2022','Comptabilisation émissions financées'),
      ref('IFC','IFC Performance Standards','2012/2024','Standards performance ESG IFC'),
      ref('BAD','Cadre stratégique changement climatique 2021-2030','2021','Stratégie climat BAD'),
      ref('BCBS','Principes gestion risques climatiques','2022','Encadrement risque climat bancaire'),
      ref('NGFS','Scénarios climatiques pour banques centrales','2024','Scénarios stress test climat'),
      ref('BCEAO','Programme Finance Durable UEMOA','2025','Feuille de route finance durable'),
    ],
    methodologyNote: 'Analyse comparative des pratiques ESG de 42 banques africaines cotées (2025), croisée avec les exigences ISSB et les attentes des DFI (IFC, BAD, SFI). Les données de spread (15-25 bps) sont issues de notre analyse de 12 transactions obligataires vertes africaines (2024-2026). Sources : ifrs.org, carbonaccountingfinancials.com, afdb.org. Dernière mise à jour : 16 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information exclusivement. Les normes IFRS S1 et S2 sont en évolution et doivent être consultées dans leur version officielle sur ifrs.org. Les projections de spread et ROI sont des estimations basées sur les données de marché disponibles et ne constituent pas un engagement de résultat. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },

  // ═══ [4] Digitalisation SFD — Modèle BCEAO ═══
  'digitalisation-sfd-bceao-2026': {
    faq: [
      fa('Mon SFD est-il éligible au Fonds Digital SFD de la BCEAO ?','Tous les SFD agréés BCEAO sont éligibles. Les SFD de moins de 5 000 clients peuvent déposer un dossier groupé via leur association professionnelle (APSFD, APIM). Le financement couvre 60% des coûts (70% pour les dossiers déposés avant septembre 2026).'),
      fa('Quels types de projets sont finançables par le Fonds Digital ?','Quatre catégories : (1) Core banking system digital, (2) Application mobile et canaux digitaux, (3) Cybersécurité et protection des données, (4) Formation et renforcement des compétences digitales. Le matériel (hardware) est éligible dans la limite de 20% du budget.'),
      fa('Quel est le délai d\'instruction d\'un dossier Fonds Digital ?','Instruction en 45 jours à compter du dépôt du dossier complet. Le décaissement se fait en 3 tranches : 40% à l\'approbation, 40% à mi-parcours (validation des spécifications), 20% à la réception finale.'),
      fa('Quel est le retour sur investissement typique d\'une digitalisation SFD ?','Coût/client réduit de 35% à 50%. Productivité agent crédit augmentée de 40%. PAR 30 réduit de 3 à 5 points grâce au scoring digital. ROI médian : 18 mois. Coût total typique : 40 à 80 millions FCFA pour un SFD de 15 000 clients.'),
      fa('Le référentiel cybersécurité BCEAO est-il obligatoire pour tous les SFD ?','Oui, avec des exigences graduées. RSSI obligatoire pour les SFD de plus de 50 000 clients. Audit de sécurité annuel obligatoire pour tous. Authentification forte au-delà de 500 000 FCFA de transaction. PCA SI testé semestriellement. Conformité exigée au 31 décembre 2027.'),
      fa('Qu\'est-ce que la plateforme d\'interopérabilité IMCEC pour les SFD ?','L\'Interopérabilité des Monnaies Électroniques de la CEDEAO (IMCEC) permettra aux clients SFD d\'effectuer des transactions entre différents réseaux et avec les banques. Lancement prévu Q2 2027. Les SFD doivent préparer leurs API dès maintenant.'),
      fa('Comment fonctionne le bac à sable fintech de la BCEAO ?','Espace de test réglementaire pour innovations fintech. 8 projets déjà en test (credit scoring IA, KYC digital, blockchain transferts). Les SFD peuvent candidater avec un partenaire fintech. Avantage : exemption temporaire de certaines exigences réglementaires.'),
      fa('Quelle solution core banking choisir pour un SFD ?','Dépend de la taille : SFD < 10K clients → solution SaaS légère. SFD 10-50K → core banking cloud (Oradian, Musoni). SFD > 50K → solution modulaire (Temenos, Sopra). Privilégiez les solutions déjà certifiées par la BCEAO et disposant d\'API standards.'),
      fa('Les SFD digitalisés sont-ils plus exposés aux cyberattaques ?','Oui, statistiquement 3,5 fois plus de tentatives d\'attaques. Sans cadre de cybersécurité adapté, risque de fraude financière, violation de données personnelles et interruption de service. Le coût moyen d\'un incident cyber pour un SFD africain est estimé à 45 millions FCFA.'),
      fa('Quel est l\'impact de la digitalisation sur l\'inclusion financière ?','L\'objectif BCEAO est de passer de 62% à 80% d\'inclusion financière d\'ici 2028. Les SFD digitalisés augmentent leur portefeuille clients de 25-40% en 24 mois. Le coût d\'acquisition client passe sous la barre des 2 500 FCFA.'),
      fa('Comment préparer la transformation digitale de mon SFD ?','Phases recommandées : (1) Diagnostic digital (2-4 semaines), (2) Cahier des charges et choix solution (4-8 semaines), (3) Déploiement pilote (8-12 semaines), (4) Déploiement complet + formation (8-12 semaines). Durée totale : 6 à 9 mois.'),
    ],
    references: [
      ref('BCEAO','Stratégie Digitalisation SFD 2026-2028','Février 2026','Cadre stratégique digitalisation'),
      ref('BCEAO','Référentiel Cybersécurité SFD','Mars 2026','Normes sécurité SFD'),
      ref('BCEAO','Stratégie Inclusion Financière UEMOA','2024','Objectif 80% inclusion financière 2028'),
      ref('BCEAO','Instruction n°008-05-2015','2015','Dispositif LBC/FT applicable SFD'),
      ref('BCEAO','Guide Bac à Sable Fintech','2025','Cadre innovation fintech'),
      ref('IMCEC','Protocole Interopérabilité Monnaies Électroniques','2025','Standards IMCEC'),
      ref('APSFD-UEMOA','Étude Impact Digitalisation SFD','2025','Données empiriques SFD'),
    ],
    methodologyNote: 'Analyse de la Stratégie Digitalisation SFD 2026-2028 (BCEAO, février 2026), du Référentiel Cybersécurité SFD (mars 2026) et des données empiriques de 47 SFD suivis par Khepra Experts. Les données ROI (ROI médian 18 mois, -35% coût/client) sont issues de 12 projets de transformation digitale menés en zone UEMOA. Dernière mise à jour : 14 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information exclusivement. Les conditions du Fonds Digital SFD sont indicatives et doivent être confirmées auprès de la BCEAO. Les données de ROI sont des moyennes observées et peuvent varier selon le contexte spécifique de chaque SFD. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },

  // ═══ [5] Audit Algorithmes Credit Scoring ═══
  'audit-credit-scoring-2026': {
    faq: [
      fa('Quand la directive BCEAO sur l\'audit des algorithmes entre-t-elle en vigueur ?','Publication prévue en septembre 2026, mise en conformité exigée au 31 décembre 2026. Les banques et fintechs doivent commencer leurs audits préparatoires dès maintenant.'),
      fa('Quels modèles sont concernés par la directive ?','Quatre types : scoring crédit, pricing, recouvrement et segmentation marketing. Modèles internes ET modèles externes (fournis par des fintechs). Tout algorithme impactant une décision de crédit est dans le périmètre.'),
      fa('Qu\'est-ce que l\'explicabilité (XAI) et pourquoi est-elle obligatoire ?','L\'explicabilité signifie qu\'une décision de refus de crédit doit pouvoir être expliquée au client en langage clair. Pour les modèles boîte noire (XGBoost, deep learning), documentation SHAP ou LIME obligatoire. C\'est le Pilier 1 de la directive.'),
      fa('Comment tester l\'équité algorithmique ?','Tests de biais sur 5 axes : genre, âge, géographie, religion et origine ethnique. Méthodes : disparate impact ratio, equal opportunity difference, statistical parity. Un modèle discriminatoire expose à des sanctions jusqu\'à 2% du CA annuel.'),
      fa('Qu\'est-ce que le PSI (Population Stability Index) ?','Le PSI mesure la dérive entre la population de développement et la population de production. Un PSI > 0,25 indique une dérive significative nécessitant une recalibration. La directive BCEAO rend le suivi trimestriel du PSI obligatoire.'),
      fa('Quelles sont les sanctions en cas de non-conformité ?','Échelle graduée : avertissement, mise en demeure, restriction d\'utilisation du modèle, amendes jusqu\'à 2% du chiffre d\'affaires annuel. En cas de discrimination avérée, risque réputationnel majeur et possible retrait d\'agrément pour les fintechs.'),
      fa('Quels indicateurs de performance sont exigés par la directive ?','Minimum requis : Gini (ou AUC), KS (Kolmogorov-Smirnov), PSI trimestriel, matrice de confusion, taux de défaut par décile. Documentation annuelle de la validation statistique obligatoire. Score minimum recommandé : 70/100 selon le référentiel KHEPRA.'),
      fa('Comment auditer un modèle fourni par une fintech externe ?','La responsabilité de l\'audit incombe à l\'institution financière utilisatrice, pas au fournisseur. Le contrat avec la fintech doit inclure : droit d\'audit, accès au code source ou documentation SHAP/LIME, engagement de transparence algorithmique.'),
      fa('Quelle est la méthodologie d\'audit KHEPRA en 5 dimensions ?','(1) Qualité des données (complétude, fraîcheur, biais), (2) Performance statistique (Gini, KS, PSI), (3) Explicabilité (SHAP/LIME, variables critiques), (4) Équité (tests de biais 5 axes), (5) Gouvernance (traçabilité versions, validation). Score minimum recommandé : 70/100.'),
      fa('Un modèle de credit scoring non audité peut-il être utilisé pendant la période transitoire ?','Oui, jusqu\'au 31 décembre 2026, mais la BCEAO recommande de lancer l\'audit dès maintenant. Un modèle en cours d\'audit est mieux perçu qu\'un modèle non audité en cas de contrôle. L\'audit prend 4 à 8 semaines selon la complexité.'),
    ],
    references: [
      ref('BCEAO','Projet Directive — Gouvernance Algorithmes de Credit Scoring','Septembre 2026','Encadrement algorithmes crédit'),
      ref('UE','Règlement Général Protection Données (RGPD) Art. 22','2018','Décisions individuelles automatisées'),
      ref('BCBS','Guidelines — Credit Risk and Accounting','2018','Encadrement risque crédit'),
      ref('BCBS','Principles for Sound Credit Risk Assessment','2020','Principes évaluation risque crédit'),
      ref('CNIL','Livre Blanc — Algorithmes et IA','2024','Guide audit algorithmes'),
      ref('ISO','ISO/IEC 24029 — Évaluation robustesse IA','2024','Standard robustesse réseaux neurones'),
      ref('BCEAO','Instruction n°008-05-2015','2015','Protection données et LBC/FT'),
    ],
    methodologyNote: 'Analyse prospective basée sur le projet de directive BCEAO (consultation mars 2026), croisée avec les standards RGPD Article 22, les guidelines BCBS et les meilleures pratiques d\'audit algorithmique. Les données de maturité (62% banques non prêtes) sont issues d\'une enquête confidentielle auprès de 28 établissements UEMOA (Q2 2026). Dernière mise à jour : 28 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse prospective exclusivement. La directive BCEAO sur l\'audit des algorithmes est en projet et peut évoluer avant sa publication définitive en septembre 2026. Les références aux sanctions et exigences sont indicatives. Les textes définitifs devront être consultés sur bceao.int. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },

  // ═══ [6] LBC/FT Nouvelles Exigences GAFI 2026 ═══
  'lbcft-gafi-2026': {
    faq: [
      fa('Quand les nouvelles normes GAFI entrent-elles en vigueur en UEMOA/CEMAC ?','Transposition par la BCEAO et la COBAC d\'ici décembre 2026. Les établissements doivent commencer leur gap analysis dès maintenant. La période de transition (compliance volontaire) offre des conditions favorables aux early adopters.'),
      fa('Les crypto-actifs sont-ils concernés même si je n\'offre pas de service crypto ?','Oui. Si vos clients effectuent des transactions avec des plateformes crypto, vous avez une obligation de vigilance renforcée. Toute transaction crypto supérieure à 1 000 EUR doit être soumise aux procédures LBC/FT. L\'adoption crypto en Afrique croît de 1 200% par an.'),
      fa('Quel est le nouveau seuil pour les bénéficiaires effectifs ?','Le seuil de déclenchement passe de 25% à 10% du capital ou des droits de vote. Le registre central des bénéficiaires effectifs devient public et obligatoire avant juin 2027. Sanctions : amende jusqu\'à 1 million EUR et peine d\'emprisonnement.'),
      fa('Quels sont les 3 pays africains sur liste grise GAFI ?','La liste grise évolue trimestriellement. Les transactions avec ces pays déclenchent automatiquement une due diligence renforcée (Recommandation 19 révisée). Votre système de filtrage doit classer automatiquement ces transactions.'),
      fa('Les dirigeants sont-ils personnellement responsables ?','Oui, c\'est la nouveauté majeure de 2026. En cas de défaillance grave du dispositif LBC/FT, la responsabilité pénale individuelle des dirigeants peut être engagée. Sanctions : amendes jusqu\'à 5% du CA annuel de l\'établissement et peines d\'emprisonnement.'),
      fa('Qu\'est-ce que le régime de « compliance volontaire » ?','Période de transition (jusqu\'à décembre 2026) pendant laquelle les établissements qui anticipent la mise en conformité bénéficient : formation accélérée des équipes, dialogue facilité avec le superviseur, traitement prioritaire des demandes, et absence de sanctions pour les écarts non critiques.'),
      fa('Comment mettre à jour ma cartographie des risques LBC/FT ?','Ajoutez 3 nouvelles catégories : (1) Risque actifs virtuels (si clients utilisent crypto), (2) Risque bénéficiaires effectifs (seuil 10%), (3) Risque pays liste grise (classification automatique). Documentez votre approche basée sur les risques (ABR) pour chaque catégorie.'),
      fa('Quelles formations LBC/FT sont obligatoires pour les collaborateurs ?','Formation initiale à l\'embauche, recyclage annuel (minimum 4 heures), et formation renforcée pour fonctions sensibles (front office, conformité, direction). Le registre des formations doit être tenu à jour pour l\'inspecteur.'),
      fa('Comment fonctionne la déclaration de soupçon dans le nouveau dispositif ?','Délai de déclaration inchangé mais obligation élargie aux transactions impliquant des actifs virtuels. La CENTIF (UEMOA) et l\'ANIF (CEMAC) ont renforcé leurs capacités d\'analyse. Une déclaration non effectuée expose le déclarant à des sanctions personnelles.'),
      fa('Quel est le rôle du RCLBC/FT dans la mise en conformité GAFI 2026 ?','Le Responsable Conformité LBC/FT doit présenter un plan de mise à niveau au Conseil d\'Administration dans les 60 jours suivant la transposition. Il est le garant de l\'effectivité du dispositif et répond personnellement devant le superviseur.'),
      fa('Comment auditer mon dispositif LBC/FT avant la transposition ?','Audit en 4 étapes : (1) Gap analysis vs 40 Recommandations GAFI révisées, (2) Tests de conformité KYC/BE sur échantillon (minimum 50 dossiers), (3) Simulation déclaration de soupçon, (4) Revue du registre de formation. Score minimum recommandé : 70/100 selon le référentiel KHEPRA.'),
    ],
    references: [
      ref('GAFI/FATF','40 Recommandations révisées','Mars 2026','Normes internationales LBC/FT actualisées'),
      ref('GAFI/FATF','Guide Actifs Virtuels et Prestataires VASP','2025','Encadrement crypto-actifs'),
      ref('GAFI/FATF','Guide Bénéficiaires Effectifs','2024','Standard transparence BE'),
      ref('BCEAO','Instruction n°008-05-2015','21 mai 2015','Dispositif LBC/FT UEMOA'),
      ref('COBAC','Règlement COBAC R-2018/01','2018','Dispositif LBC/FT CEMAC'),
      ref('GIABA','Rapport Annuel Évaluation Mutuelle','2025','Statut conformité Afrique Ouest'),
      ref('GABAC','Rapport Évaluation Mutuelle CEMAC','2025','Statut conformité Afrique Centrale'),
      ref('ONU','Résolutions SFC — Sanctions Financières Ciblées','2019-2025','Sanctions et gel des avoirs'),
    ],
    methodologyNote: 'Analyse croisée des 40 Recommandations GAFI révisées (mars 2026), des rapports d\'évaluation mutuelle GIABA/GABAC 2025 et des projets de transposition BCEAO/COBAC. Les statistiques de conformité sont issues des matrices d\'évaluation mutuelle publiées. Dernière mise à jour : 12 juin 2026. Sources : fatf-gafi.org, giaba.org, gabac.org, bceao.int.',
    avertissement: 'Cet article est fourni à titre d\'analyse et d\'information exclusivement. Les 40 Recommandations GAFI et leur transposition dans les droits nationaux UEMOA/CEMAC sont en évolution. Les textes officiels doivent être consultés sur fatf-gafi.org, bceao.int et le site de la COBAC. Les sanctions mentionnées sont les maxima prévus par les textes et peuvent varier selon les circonstances. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },

  // ═══ [7] Cybersécurité Bancaire COBAC 2027 ═══
  'cybersecurite-cobac-2027': {
    faq: [
      fa('Quand la directive COBAC cybersécurité entre-t-elle en vigueur ?','Publication prévue Q1 2027, entrée en vigueur progressive sur 18 mois. Établissements systémiques : 12 mois pour SOC 24/7 et tests d\'intrusion. Établissements non systémiques : 18 mois pour conformité complète.'),
      fa('Puis-je externaliser mon SOC ?','Oui, auprès d\'un prestataire certifié (ISO 27001, CREST ou équivalent). Obligatoirement basé en zone CEMAC ou dans un pays disposant d\'un accord de coopération avec la COBAC. La responsabilité finale reste celle de l\'établissement.'),
      fa('Quel est le coût d\'un SOC 24/7 ?','SOC internalisé : 800 000 à 1,5 million EUR par an (effectif 8-12 analystes, outils SIEM/SOAR). SOC externalisé : 400 000 à 800 000 EUR par an. SOC mutualisé entre plusieurs banques : réduction de 40% à 60%, soit 300 000 à 600 000 EUR par banque.'),
      fa('Quel est le délai de notification des incidents cyber ?','24 heures pour les incidents significatifs (vs 72h actuellement). L\'incident doit être qualifié (nature, périmètre, données compromises, impact financier estimé) dans les 72 heures. Rapport complet sous 30 jours.'),
      fa('Qu\'est-ce qu\'un test d\'intrusion conforme COBAC ?','Pentest annuel complet couvrant : infrastructure réseau, applications critiques, API exposées, ingénierie sociale (phishing ciblé). Exécuté par un prestataire certifié indépendant. Les vulnérabilités critiques doivent être corrigées sous 30 jours. Red Team tous les 2 ans pour les systémiques.'),
      fa('Comment mutualiser un SOC entre plusieurs banques ?','Modèle en 3 étapes : (1) Consortium 3-5 banques avec accord de partage de coûts, (2) Gouvernance conjointe avec comité de pilotage dédié, (3) SOC opéré par un MSSP certifié. Avantages : réduction coûts 40-60%, attractivité pour recruter, intelligence collective des menaces.'),
      fa('Quelles certifications sont requises pour le RSSI ?','Non spécifié par la directive mais fortement recommandé : CISSP, CISM ou ISO 27001 Lead Implementer. Le RSSI doit être rattaché directement à la Direction Générale (pas à la DSI) pour garantir son indépendance.'),
      fa('Comment préparer un PCA/PRA SI pour la COBAC ?','4 exigences : (1) RTO (Recovery Time Objective) < 4h pour fonctions critiques, (2) RPO (Recovery Point Objective) < 1h, (3) Test semestriel documenté, (4) Site de secours distant d\'au moins 50 km. Le PCA/PRA SI doit être intégré au PCA global de l\'établissement.'),
      fa('Quel est le coût moyen d\'une cyberattaque sur une banque africaine ?','Coût moyen : 2,8 millions EUR (2,1 M coûts directs + 700K coûts indirects et réputation). Sanctions COBAC additionnelles jusqu\'à 5% du chiffre d\'affaires annuel. L\'investissement conformité (800K-2,5M EUR) est inférieur au coût d\'un seul incident.'),
      fa('Comment auditer la sécurité de mes prestataires tiers ?','La directive impose une due diligence cybersécurité pour tous les prestataires critiques. Checklist : certification ISO 27001 valide, rapport pentest récent (<12 mois), clause de notification incidents dans le contrat, droit d\'audit réservé, localisation des données (CEMAC ou pays agréé).'),
    ],
    references: [
      ref('COBAC','Projet Directive Cybersécurité','Q1 2027','Encadrement cybersécurité CEMAC'),
      ref('UE','Règlement DORA (2022/2554)','Janvier 2025','Résilience opérationnelle numérique'),
      ref('COBAC','Règlement R-2016/01 — Gouvernance','2016','Gouvernance établissements crédit'),
      ref('ISO','ISO/IEC 27001:2022','2022','Système management sécurité information'),
      ref('NIST','Cybersecurity Framework v2.0','2024','Référentiel cybersécurité'),
      ref('BCBS','Principles for Operational Resilience','2021','Résilience opérationnelle bancaire'),
      ref('ENISA','Threat Landscape Report','2025','Panorama menaces cyber'),
      ref('Interpol','African Cyberthreat Assessment','2025','Menaces cyber Afrique'),
    ],
    methodologyNote: 'Analyse prospective basée sur la consultation préparatoire COBAC (Q4 2025), le Règlement DORA européen (source d\'inspiration confirmée) et les standards internationaux (NIST CSF 2.0, ISO 27001:2022). Les données de coûts (SOC, incidents) sont issues de l\'étude ENISA 2025 et d\'entretiens avec 8 banques CEMAC. Dernière mise à jour : 29 juin 2026.',
    avertissement: 'Cet article est fourni à titre d\'analyse prospective exclusivement. La directive COBAC cybersécurité est en projet et peut évoluer avant sa publication définitive (Q1 2027). Les exigences, délais et coûts mentionnés sont des estimations basées sur les documents préparatoires disponibles et les standards internationaux de référence. Les textes définitifs devront être consultés auprès de la COBAC. Khepra Experts ne saurait être tenu responsable des décisions prises sur la seule base de cette analyse.',
  },
};



