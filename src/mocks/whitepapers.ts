export interface Whitepaper {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  year: string;
  image: string;
}

export const whitepapers: Whitepaper[] = [
  {
    id: 'wp-inclusion-financiere-afrique',
    title: "Inclusion Financière UEMOA/CEMAC : Les 684 SFD qui Captent 78% des 120 Millions d'Exclus — et Comment Rejoindre le Top 20% des Institutions",
    description: "Analyse institutionnelle des dynamiques d'inclusion financière en zones UEMOA (BCEAO) et CEMAC (BEAC/COBAC). Taux de bancarisation comparés, rôle du mobile money, cadres réglementaires SFD/EMF, obstacles structurels et recommandations stratégiques pour les décideurs et régulateurs. Sources : BCEAO (bceao.int), BEAC (beac.int), COBAC (cobac.org).",
    category: 'Finance & Inclusion',
    pages: 48,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20financial%20inclusion%20in%20West%20Africa%20elegant%20dark%20navy%20and%20deloitte%20green%20design%20with%20abstract%20map%20of%20UEMOA%20region%20charts%20showing%20banking%20penetration%20rates%20premium%20consulting%20firm%20publication%20aesthetic%20clean%20minimalist%20layout%20with%20sophisticated%20typography&width=600&height=800&seq=wp001-green-v2&orientation=portrait'
  },
  {
    id: 'wp-gouvernance-institutions-microfinance',
    title: "Gouvernance SFD : Les 7 Piliers qui Séparent les 15% d'Institutions Notées Excellentes des 85% sous Surveillance Renforcée BCEAO/COBAC",
    description: "Cadre de référence institutionnel pour renforcer la gouvernance des SFD (UEMOA) et EMF (CEMAC) : obligations BCEAO (Circulaire 2021), Règlement COBAC EMF-2017, contrôle interne, gestion des risques ALM, ratios prudentiels comparés et conformité réglementaire. Sources : BCEAO (bceao.int), COBAC (cobac.org).",
    category: 'Gouvernance',
    pages: 56,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20microfinance%20governance%20best%20practices%20sophisticated%20dark%20and%20deloitte%20green%20design%20with%20abstract%20governance%20framework%20diagram%20premium%20African%20consulting%20publication%20clean%20corporate%20layout%20with%20elegant%20typography%20and%20subtle%20geometric%20patterns&width=600&height=800&seq=wp002-green-v2&orientation=portrait'
  },
  {
    id: 'wp-transformation-digitale-banques',
    title: "Transformation Digitale Bancaire : Comment 12% des Banques Africaines Ont Réduit leur Cost/Income de 18 Points — le Playbook Conforme BCEAO/COBAC",
    description: "Guide stratégique pour les dirigeants bancaires africains : architecture SI conforme aux exigences BCEAO (UEMOA) et COBAC (CEMAC), module ALM, open banking, cybersécurité et gestion du changement. Sources : BCEAO (bceao.int), COBAC (cobac.org), BEAC (beac.int).",
    category: 'Transformation Digitale',
    pages: 62,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20digital%20transformation%20of%20African%20banks%20modern%20dark%20background%20with%20digital%20network%20patterns%20and%20deloitte%20green%20accents%20fintech%20and%20banking%20technology%20theme%20premium%20consulting%20firm%20publication%20design%20sophisticated%20minimalist%20layout&width=600&height=800&seq=wp003-green-v2&orientation=portrait'
  },
  {
    id: 'wp-financement-pme-uemoa',
    title: "Financement PME UEMOA/CEMAC : Le Gap de 27 Milliards USD que Vos Concurrents Captent Déjà — 5 Mécanismes pour Y Accéder en 90 Jours",
    description: "Étude institutionnelle sur l'accès au financement des PME dans les espaces UEMOA et CEMAC : analyse des gaps, mécanismes de garantie (FAGACE, GARI, FOGADAC), rôle des fintechs, cadre OHADA et recommandations pour les institutions financières et décideurs publics. Sources : BCEAO, BEAC, OHADA, BOAD, BDEAC.",
    category: 'Finance & PME',
    pages: 44,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20SME%20financing%20in%20UEMOA%20zone%20West%20Africa%20elegant%20deloitte%20green%20and%20dark%20design%20with%20abstract%20economic%20growth%20charts%20premium%20African%20business%20publication%20clean%20sophisticated%20layout%20with%20subtle%20map%20elements%20and%20financial%20data%20visualization&width=600&height=800&seq=wp004-green-v2&orientation=portrait'
  },
  {
    id: 'wp-cybersecurite-institutions-financieres',
    title: "Cybersécurité Bancaire Afrique : 73% des Banques UEMOA Échouent au Test de Résilience COBAC 2027 — le Plan d'Action pour Être dans les 27%",
    description: "Panorama des cybermenaces pesant sur les institutions financières africaines et cadre stratégique conforme aux exigences BCEAO (UEMOA) et COBAC (CEMAC) : gouvernance de la sécurité, gestion des incidents, conformité réglementaire et plan de continuité d'activité. Sources : BCEAO (bceao.int), COBAC (cobac.org).",
    category: 'Cybersécurité',
    pages: 52,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20cybersecurity%20for%20African%20financial%20institutions%20dark%20dramatic%20background%20with%20digital%20security%20shield%20and%20network%20protection%20elements%20deloitte%20green%20and%20dark%20color%20scheme%20premium%20consulting%20publication%20design%20sophisticated%20tech%20security%20aesthetic&width=600&height=800&seq=wp005-green-v2&orientation=portrait'
  },
  {
    id: 'wp-mobile-money-afrique-subsaharienne',
    title: "Mobile Money 2026 : Comment les 3 Modèles Gagnants Captent 82% des 650 Millions d'Utilisateurs Subsahariens — Analyse UEMOA vs CEMAC",
    description: "Analyse comparative des modèles de mobile money : Instruction BCEAO n°008-05-2015 (UEMOA) vs Règlement BEAC (CEMAC), interopérabilité STAR-UEMOA / SYSTAC-SYGMA, protection des utilisateurs, LBC/FT et perspectives réglementaires. Sources : BCEAO (bceao.int), BEAC (beac.int), COBAC (cobac.org).",
    category: 'Fintech & Innovation',
    pages: 38,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20mobile%20money%20in%20sub-Saharan%20Africa%20vibrant%20yet%20sophisticated%20design%20with%20smartphone%20and%20digital%20payment%20icons%20on%20dark%20background%20deloitte%20green%20accents%20with%20African%20continent%20silhouette%20premium%20fintech%20consulting%20publication%20clean%20modern%20layout&width=600&height=800&seq=wp006-green-v2&orientation=portrait'
  },
  {
    id: 'wp-preparer-inspection-bceao-2026',
    title: "Inspection BCEAO 2026 : Les 25 Constats qui Font Chuter 70% des Banques au Premier Contrôle — et le Plan de Remédiation pour Tous les Éviter en 90 Jours",
    description: "Guide opérationnel complet pour préparer une institution financière à une inspection de la BCEAO. Méthodologie éprouvée en 7 phases, checklist de 215 points de contrôle couvrant : gouvernance, contrôle interne, LBC/FT, ratios prudentiels, gestion des risques, ICAAP, protection de la clientèle et reporting réglementaire. Modèles de documents préparatoires, calendrier type et pièges à éviter. Sources : Circulaires BCEAO 01/2017 à 03/2017/CB, 001-2020/CB, Dispositif prudentiel UEMOA 2024.",
    category: 'BU1 — Régulation Financière',
    pages: 84,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20BCEAO%20inspection%20preparation%20guide%202026%20elegant%20dark%20background%20with%20deloitte%20green%20and%20subtle%20financial%20regulatory%20symbols%20checklists%20and%20banking%20compliance%20icons%20premium%20consulting%20publication%20design%20sophisticated%20clean%20layout&width=600&height=800&seq=wp007-pillar&orientation=portrait'
  },
  {
    id: 'wp-conformite-lbcft-127-points',
    title: "LBC/FT : 127 Points de Contrôle, 8 Piliers GAFI — Le Seul Référentiel qui Vous Garantit 0 Sanction GIABA/GABAC à Votre Prochaine Inspection",
    description: "Référentiel exhaustif de conformité LBC/FT pour les institutions financières en zones UEMOA et CEMAC. 127 points de contrôle organisés en 8 piliers : gouvernance LBC/FT, identification et vérification des clients (KYC/CDD), surveillance des opérations, déclarations de soupçon (CENTIF/ANIF), gel des avoirs, conservation des documents, formation du personnel et audit externe. Matrice de conformité croisée GAFI (40 recommandations), GIABA, GABAC, Directive BCEAO 02/2015 et Règlement COBAC R-2018/01.",
    category: 'BU1 — Régulation Financière',
    pages: 72,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20AML%20CFT%20compliance%20framework%20in%20Francophone%20Africa%20dark%20sophisticated%20design%20with%20deloitte%20green%20accents%20compliance%20checklist%20and%20regulatory%20shield%20symbols%20premium%20consulting%20publication%20clean%20authoritative%20layout%20with%20abstract%20security%20patterns&width=600&height=800&seq=wp008-pillar&orientation=portrait'
  },
  {
    id: 'wp-ratios-prudentiels-uemoa',
    title: "Ratios Prudentiels UEMOA : Chaque Point de Ratio en Moins Vous Coûte Votre Marge de Manœuvre — Guide de Calcul, Simulation et Optimisation",
    description: "Guide technique complet sur le calcul, l'interprétation et l'optimisation des ratios prudentiels applicables aux banques et SFD de l'UEMOA. Couverture détaillée : ratio de solvabilité (fonds propres / risques pondérés ≥ 8%), ratio de liquidité (≥ 100%), coefficient de division des risques (≤ 25% FP), normes de grands risques, ratio de transformation, levier, LCR et NSFR. Méthodologie de simulation, plans de remédiation et études de cas sectorielles. Conforme au Dispositif Prudentiel UEMOA applicable au 1er janvier 2024 et aux normes Bâle II/III.",
    category: 'BU1 — Régulation Financière',
    pages: 68,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20UEMOA%20prudential%20ratios%20calculation%20guide%20dark%20elegant%20design%20with%20deloitte%20green%20financial%20charts%20and%20banking%20ratio%20visualization%20diagrams%20premium%20consulting%20publication%20clean%20mathematical%20layout%20with%20institutional%20aesthetic&width=600&height=800&seq=wp009-pillar&orientation=portrait'
  },
  {
    id: 'wp-agrement-sfd-bceao',
    title: "Agrément SFD BCEAO : Pourquoi 80% des Dossiers Sont Rejetés au Premier Dépôt — et la Méthode pour Réussir le Vôtre en 6 Mois",
    description: "Guide complet de la procédure d'agrément des Systèmes Financiers Décentralisés (SFD) auprès de la BCEAO et de la Commission Bancaire de l'UMOA. Architecture du dossier d'agrément : étude de faisabilité, business plan à 5 ans, manuel de procédures, dispositif de contrôle interne, politique LBC/FT, profils des dirigeants et actionnaires. Stratégie de dialogue avec le régulateur, calendrier type de 6 à 12 mois, pièges à éviter et facteurs clés de succès. Ce guide intègre une grille d'auto-évaluation de 85 critères alignée sur l'Instruction BCEAO n°008-05-2015.",
    category: 'BU1 — Régulation Financière',
    pages: 76,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20BCEAO%20SFD%20licensing%20procedure%20guide%20dark%20sophisticated%20design%20with%20deloitte%20green%20accents%20abstract%20regulatory%20approval%20symbols%20and%20microfinance%20institution%20icons%20premium%20consulting%20publication%20clean%20institutional%20layout&width=600&height=800&seq=wp010-pillar&orientation=portrait'
  },
  {
    id: 'wp-prix-transfert-afrique-beps',
    title: "Prix de Transfert Afrique : 48% des Groupes Contrôlés Subissent un Redressement — Comment Documenter vos Transactions et Réduire le Risque Fiscal de 85%",
    description: "Guide de référence sur l'application des règles de prix de transfert en Afrique francophone. Analyse approfondie du cadre BEPS Action 13 (OCDE 2023), de la Directive UEMOA n°01/2011/CM/UEMOA et du Règlement CEMAC n°01/18-CEMAC-UMAC-DFLC. Méthodologie complète : analyse fonctionnelle, sélection de la méthode la plus appropriée (CUP, TNMM, CPM), benchmarking sur bases africaines, documentation Master File / Local File, accords préalables de prix (APA) et stratégies de défense en contrôle fiscal. L'ouvrage présente 12 études de cas sectorielles (banque, télécoms, agroalimentaire, mines, logistique).",
    category: 'BU2 — Prix de Transfert',
    pages: 92,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20on%20transfer%20pricing%20in%20Africa%20BEPS%20Action%2013%20applied%20dark%20elegant%20design%20with%20deloitte%20green%20and%20subtle%20international%20taxation%20diagrams%20world%20map%20with%20Africa%20highlighted%20premium%20consulting%20publication%20sophisticated%20global%20finance%20aesthetic&width=600&height=800&seq=wp011-pillar&orientation=portrait'
  },
  {
    id: 'wp-masterfile-local-file-afrique',
    title: "Master File & Local File Afrique : Le Guide de Rédaction qui Vous Évite 2 Milliards FCFA de Redressement — 8 Templates Excel Inclus",
    description: "Guide pratique de rédaction de la documentation prix de transfert (Master File et Local File) conforme aux exigences BEPS Action 13 et aux législations UEMOA/CEMAC. Structure détaillée chapitre par chapitre, modèles de tableaux, listes de données à collecter, calendrier de production. Couvre : description de l'activité mondiale du groupe, chaîne de valeur, actifs incorporels, activités financières, positions fiscales, analyse fonctionnelle locale, benchmarking et sélection des comparables. Inclut 8 templates Excel prêts à l'emploi.",
    category: 'BU2 — Prix de Transfert',
    pages: 64,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20transfer%20pricing%20documentation%20Master%20File%20and%20Local%20File%20guide%20dark%20elegant%20design%20with%20deloitte%20green%20accents%20structured%20document%20templates%20and%20compliance%20frameworks%20premium%20consulting%20publication%20clean%20organized%20layout%20with%20institutional%20precision&width=600&height=800&seq=wp012-pillar&orientation=portrait'
  },
  {
    id: 'wp-defense-fiscale-strategies',
    title: "Contrôle Fiscal Prix de Transfert : 4,8 Milliards de Redressement Réduits à 620M — Les 4 Stratégies de Défense qui Gagnent Face à l'Administration",
    description: "Guide stratégique de défense des entreprises lors d'un contrôle fiscal des prix de transfert dans l'espace UEMOA/CEMAC. Phases du contrôle : avis de vérification, demande documentaire, entretiens, notifications de redressement, recours hiérarchiques et contentieux. Analyse des arguments fiscaux gagnants, stratégie de négociation avec l'administration, gestion de la charge de la preuve, rôle des experts indépendants. Procédure complète de demande d'APA (Accord Préalable de Prix) et 8 études de cas réels de contentieux résolus favorablement.",
    category: 'BU2 — Prix de Transfert',
    pages: 58,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20tax%20audit%20defense%20strategies%20in%20transfer%20pricing%20dark%20sophisticated%20design%20with%20deloitte%20green%20and%20subtle%20legal%20scales%20and%20negotiation%20symbols%20premium%20consulting%20publication%20authoritative%20and%20strategic%20layout%20with%20confident%20aesthetic&width=600&height=800&seq=wp013-pillar&orientation=portrait'
  },
  {
    id: 'wp-cartographie-risques-coso-erm',
    title: "Cartographie des Risques 2026 : Comment les 15% d'Entreprises 'ERM Matures' Réduisent leurs Pertes Opérationnelles de 62% — Méthodologie COSO ERM",
    description: "Guide méthodologique complet de cartographie des risques d'entreprise. Application du référentiel COSO ERM 2017 et de la norme ISO 31000:2018 au contexte africain. Processus en 6 étapes : identification des risques (approches top-down et bottom-up), évaluation (probabilité × impact), hiérarchisation (heat map), définition de l'appétit au risque, plans de traitement et dispositif de pilotage (KRI). Ce guide inclut un catalogue de 180 risques sectoriels types (banque, SFD, industrie, services) ainsi que 15 matrices de risques prêtes à l'emploi.",
    category: 'BU3 — Gouvernance, Risques & Conformité',
    pages: 70,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20enterprise%20risk%20mapping%20methodology%20COSO%20ERM%20framework%20dark%20elegant%20design%20with%20deloitte%20green%20heat%20map%20visualization%20and%20risk%20matrix%20diagrams%20premium%20consulting%20publication%20structured%20and%20analytical%20layout%20with%20institutional%20gravitas&width=600&height=800&seq=wp014-pillar&orientation=portrait'
  },
  {
    id: 'wp-gouvernance-groupes-familiaux-succession',
    title: "Groupes Familiaux Africains : 70% ne Passent Pas la 2e Génération — Les 4 Piliers de Gouvernance qui Protègent les 30% Restants",
    description: "Guide de structuration de la gouvernance des entreprises familiales africaines. Architecture de gouvernance : conseil de famille, charte familiale, holding de contrôle, pacte d'actionnaires. Mécanismes de succession : plan de relève générationnelle, formation des héritiers, évaluation des compétences, transition progressive. Professionnalisation : séparation patrimoine privé/professionnel, recrutement de dirigeants externes, mise en place de comités spécialisés (audit, rémunération). Conforme à l'Acte Uniforme OHADA AUSCGIE et aux meilleures pratiques internationales (Family Business Network).",
    category: 'BU3 — Gouvernance, Risques & Conformité',
    pages: 66,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20African%20family%20business%20governance%20and%20succession%20planning%20dark%20elegant%20design%20with%20deloitte%20green%20family%20tree%20abstract%20symbols%20and%20institutional%20structure%20diagrams%20premium%20consulting%20publication%20warm%20yet%20authoritative%20aesthetic&width=600&height=800&seq=wp015-pillar&orientation=portrait'
  },
  {
    id: 'wp-audit-interne-coso-2023',
    title: "Audit Interne COSO 2023 : Pourquoi 82% des Conseils n'Ont Jamais Fait Évaluer Leur Fonction Audit — et le Référentiel pour Atteindre l'Excellence IIA",
    description: "Guide complet de la fonction d'audit interne appliquant le référentiel COSO Internal Control — Integrated Framework (2013, révisé 2023) et les Normes Internationales pour la Pratique Professionnelle de l'Audit Interne (IIA, 2024). Cycle d'audit complet : cartographie des risques audités, plan d'audit annuel, programme de travail, techniques d'investigation, rédaction des constats, rapport d'audit et suivi des recommandations. Reporting au Conseil d'Administration et au Comité d'Audit. L'ouvrage propose une charte d'audit interne modèle, un code de déontologie et 25 programmes de travail types par processus.",
    category: 'BU3 — Gouvernance, Risques & Conformité',
    pages: 78,
    year: '2026',
    image: 'https://readdy.ai/api/search-image?query=professional%20whitepaper%20cover%20for%20internal%20audit%20COSO%202023%20framework%20and%20IIA%20standards%20dark%20elegant%20design%20with%20deloitte%20green%20audit%20trail%20symbols%20and%20control%20framework%20diagrams%20premium%20consulting%20publication%20systematic%20and%20rigorous%20layout%20with%20institutional%20authority&width=600&height=800&seq=wp016-pillar&orientation=portrait'
  }
];






