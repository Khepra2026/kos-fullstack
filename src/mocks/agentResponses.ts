export interface AgentResponseConfig {
  greeting: string;
  suggestedQuestions: string[];
  responses: Array<{
    keywords: string[];
    response: string;
  }>;
  fallback: string;
}

const S = {
  strategy: {
    greeting: `Bonjour, je suis **KHEPRA Strategy AI**, votre expert en analyse stratégique et planification. Je maîtrise les frameworks Porter Five Forces, PESTEL, Balanced Scorecard, OKR et les méthodologies de planification stratégique 3-5 ans pour les institutions financières, les gouvernements et les investisseurs en Afrique francophone.\n\nQue puis-je analyser pour vous aujourd'hui ?`,
    suggestedQuestions: [
      `Quels sont les risques stratégiques pour une banque en zone UEMOA en 2026 ?`,
      `Comment structurer un plan stratégique 3 ans pour une fintech ?`,
      `Quelle stratégie d'expansion recommandez-vous pour la zone CEMAC ?`,
    ],
    responses: [
      {
        keywords: [`risque`, `stratégique`, `banque`, `uemoa`],
        response: `Excellent point. Les risques stratégiques majeurs pour une banque UEMOA en 2026 identifiés par mon analyse PESTEL sont :\n\n**Politique** — Instabilité régionale (Sahel), risque de changement réglementaire OHADA. **Économique** — Inflation importée, dépréciation potentielle face à l'euro, concentration sectorielle (40% du PIB sur 3 secteurs). **Social** — Faible bancarisation (25% en moyenne UEMOA), fracture numérique. **Technologique** — Montée des fintechs, retard infrastructure IT. **Environnemental** — Risque climatique sur le portefeuille agricole. **Légal** — Renforcement Bâle III BCEAO, nouvelles circulaires COBAC.\n\nScore composite PESTEL : **6,2/10** (risque modéré-élevé). Je recommande une matrice SWOT détaillée avec plan de mitigation priorisé. Voulez-vous que je la génère ?`,
      },
      {
        keywords: [`plan`, `stratégique`, `3 ans`, `5 ans`, `fintech`, `structurer`],
        response: `Un plan stratégique 3 ans pour une fintech en zone UEMOA/CEMAC doit s'articuler autour de 5 piliers que j'ai identifiés comme critiques :\n\n1. **Conformité réglementaire** (priorité #1) — Agrément SFD/EMF, LBC/FT, protection des données.\n2. **Partenariats bancaires** — Au moins 3 banques de 1er rang par juridiction.\n3. **Infrastructure technologique** — Core banking system, API ouverte, résilience cyber (ISO 27001).\n4. **Inclusion financière** — Alignement avec la Stratégie Régionale d'Inclusion Financière BCEAO.\n5. **Expansion géographique** — Roadmap UEMOA → CEMAC (12-18 mois), puis au-delà.\n\nKPI clés : taux d'adoption, NPS, coût d'acquisition client, ratio prêts/dépôts, ratio de solvabilité. Je peux décliner chaque pilier en OKR trimestriels si vous le souhaitez.`,
      },
      {
        keywords: [`expansion`, `cemac`, `régional`, `pays`],
        response: `L'expansion en zone CEMAC présente 3 scénarios que j'ai modélisés :\n\n**Scénario Conservateur** (Cameroun + Gabon uniquement) : 6-9 mois, ticket 500K€, ROI attendu 18 mois.\n**Scénario Équilibré** (CEMAC complet, 6 États) : 12-18 mois, ticket 1,2M€, ROI attendu 24 mois.\n**Scénario Ambitieux** (CEMAC + RDC) : 18-24 mois, ticket 2,5M€, ROI attendu 36 mois.\n\nFacteurs clés de succès : partenaire local bancaire, recrutement compliance officer local, adaptation aux normes COBAC (plus strictes que BCEAO sur certains ratios prudentiels).\n\nJe recommande le Scénario Équilibré avec une phase pilote au Cameroun (3 mois) avant déploiement. Voulez-vous le business case détaillé ?`,
      },
    ],
    fallback: `Excellente question. Pour y répondre avec la précision requise, je mobilise les frameworks Porter Five Forces, PESTEL et VRIO. Mon analyse s'appuie sur les données macroéconomiques UEMOA/CEMAC les plus récentes. Pouvez-vous préciser : (1) le secteur concerné, (2) la juridiction cible et (3) l'horizon temporel ? Je pourrai alors vous fournir une analyse stratégique calibrée.`,
  },
  risk: {
    greeting: `Bonjour, je suis **KHEPRA Risk AI**, votre spécialiste Enterprise Risk Management. Je maîtrise les référentiels ISO 31000:2018, COSO ERM 2017, Bâle II/III et les exigences prudentielles BCEAO/COBAC. Je produis des cartographies de risques, Heat Maps, KRI Dashboards et Stress Tests.\n\nQuel risque souhaitez-vous analyser ?`,
    suggestedQuestions: [
      `Comment cartographier les risques opérationnels selon COSO ERM ?`,
      `Quels sont les ratios prudentiels clés à surveiller ?`,
      `Pouvez-vous faire un stress test de liquidité pour un SFD ?`,
    ],
    responses: [
      {
        keywords: [`cartographier`, `risque`, `opérationnel`, `coso`, `erm`],
        response: `La cartographie des risques opérationnels selon COSO ERM 2017 suit une méthodologie en 5 étapes que j'applique systématiquement :\n\n1. **Identification** — Ateliers avec les métiers, analyse des pertes historiques, benchmark sectoriel.\n2. **Évaluation** — Cotation Probabilité × Impact × Vélocité (échelle 1-5).\n3. **Hiérarchisation** — Heat Map 5×5, seuil de matérialité défini avec le Conseil.\n4. **Traitement** — Évitement, réduction, transfert (assurance), acceptation.\n5. **Suivi** — KRI mensuels, revue trimestrielle Comité des Risques.\n\nPour une banque UEMOA, j'identifie 7 risques opérationnels majeurs : fraude interne, cyber-sécurité, rupture de processus (IT), erreur humaine, non-conformité, externalisation, risque juridique. Score composite moyen : 15,4/25 (zone orange).\n\nJe peux générer la cartographie complète avec les 25 risques inventoriés et les KRI associés.`,
      },
      {
        keywords: [`ratio`, `prudentiel`, `surveiller`, `bceao`, `cobac`],
        response: `Les ratios prudentiels critiques à surveiller en continu — je les ai classés par priorité :\n\n**Tier 1 — Alerte immédiate si dépassement :**\n• Ratio de solvabilité (fonds propres / risques pondérés) : minimum 11,5% BCEAO, 12% COBAC (Bâle III)\n• Ratio de liquidité à 1 mois (LCR) : minimum 100%\n• Ratio de transformation : maximum 2,5×\n\n**Tier 2 — Surveillance mensuelle :**\n• Ratio de concentration des risques : maximum 25% des fonds propres par bénéficiaire\n• Ratio de division des risques : portefeuille sain ≥ 60%\n• Ratio de capitalisation : Tier 1 ≥ 7%\n\n**Tier 3 — Surveillance trimestrielle :**\n• Ratio d'exploitation (coefficient d'exploitation) : maximum 65%\n• Ratio de créances douteuses nettes / fonds propres : maximum 20%\n\nJe peux configurer un KRI Dashboard automatisé avec alertes par paliers.`,
      },
      {
        keywords: [`stress test`, `liquidité`, `sfd`, `microfinance`],
        response: `Stress Test de Liquidité pour un SFD — Simulation basée sur le modèle BCEAO que j'exécute en 3 scénarios :\n\n**Scénario 1 — Choc modéré** (retrait 20% des dépôts en 30 jours) :\n• LCR passe de 165% à 128% — conforme, marge confortable\n\n**Scénario 2 — Choc sévère** (retrait 35% + gel interbancaire) :\n• LCR passe à 92% — sous le seuil de 100%, nécessite Plan de Contingence\n• Besoin de liquidité d'urgence : 85M FCFA\n\n**Scénario 3 — Choc systémique** (retrait 50% + crise secteur) :\n• LCR tombe à 61% — critique\n• Besoin de liquidité : 210M FCFA\n• Activation requise : ligne de refinancement BCEAO + fonds de garantie\n\nMes recommandations : (1) coussin de liquidité minimum 18% au lieu des 12% réglementaires, (2) diversification des sources de refinancement (3 banques minimum), (3) test de résistance mensuel avec seuils d'alerte à 110% LCR.`,
      },
    ],
    fallback: `Question pertinente en gestion des risques. Pour vous fournir une analyse calibrée, j'ai besoin de préciser le contexte : (1) type d'établissement (banque, SFD, fintech), (2) juridiction (UEMOA ou CEMAC) et (3) catégorie de risque (crédit, opérationnel, marché, liquidité). Je peux alors appliquer les frameworks COSO ERM, ISO 31000 ou Bâle III selon votre besoin.`,
  },
  compliance: {
    greeting: `Bonjour, je suis **KHEPRA Compliance AI**, votre expert en conformité réglementaire. Je maîtrise exhaustivement les circulaires COBAC, les textes BCEAO, les normes OHADA et les ratios prudentiels. Je produis des Gap Analysis, plans de mise en conformité, Rapports SCI et audits trail.\n\nQuel référentiel souhaitez-vous analyser ?`,
    suggestedQuestions: [
      `Quelles sont les principales exigences de la circulaire CB-UMOA 01-2017/CB/C sur la gouvernance ?`,
      `Comment préparer un Rapport Annuel de Contrôle Interne conforme ?`,
      `Quels écarts de conformité sont les plus fréquents lors des inspections BCEAO ?`,
    ],
    responses: [
      {
        keywords: [`circulaire`, `cobac`, `001-2017`, `gouvernance`],
        response: `La **Circulaire CB-UMOA n°01-2017/CB/C** (Commission Bancaire de l'UMOA — Zone UEMOA, siège BCEAO) — et non « COBAC » qui supervise la zone CEMAC (siège BEAC) — relative à la gouvernance d'entreprise impose 5 axes majeurs que j'ai analysés en détail :\n\n1. **Composition du Conseil** (Art. 4-12) : minimum 5 administrateurs, majorité d'indépendants, pas plus de 3 mandats consécutifs.\n2. **Comités spécialisés** (Art. 13-25) : Comité d'Audit obligatoire (>50Mds bilan), Comité des Risques, Comité des Rémunérations.\n3. **Indépendance** (Art. 26-31) : critères stricts, déclaration annuelle, registre des conflits d'intérêts.\n4. **Évaluation** (Art. 32-36) : auto-évaluation annuelle du Conseil, évaluation externe tous les 3 ans.\n5. **Information** (Art. 37-42) : rapport gouvernance annuel, transparence rémunérations.\n\nTaux de conformité moyen observé dans la zone UEMOA : 67%. Écarts les plus fréquents : absence de Comité des Risques (42% des banques), insuffisance d'administrateurs indépendants (38%), évaluation externe non réalisée (55%).

**Équivalent COBAC (CEMAC) :** Le Règlement COBAC R-2018/01 fixe le cadre de gouvernance. Les exigences sont similaires mais les seuils prudentiels sont plus stricts (ratio de solvabilité à 12% contre 11,5% en UEMOA).\n\nVoulez-vous le Gap Analysis complet article par article ?`,
      },
      {
        keywords: [`rapport`, `contrôle interne`, `sci`, `semestriel`, `annuel`],
        response: `**Clarification :** La Circulaire CB-UMOA n°002-2020/CB/C (Commission Bancaire de l'UMOA — Zone UEMOA) régit le Rapport de Contrôle Interne. Ne pas confondre avec le dispositif COBAC (CEMAC) régi par le Règlement R-2016/04.

Voici la structure type du SCI conforme à la Circulaire CB-UMOA 002-2020/CB/C :\n\n1. **Synthèse exécutive** (2 pages) — Score global conformité, progrès vs période précédente, 3 priorités.\n2. **Périmètre et méthodologie** — Référentiels, entités couvertes, méthode d'évaluation.\n3. **Dispositif de contrôle permanent** — Cartographie des contrôles clés niveau 1 et 2.\n4. **Dispositif de contrôle périodique** — Missions d'audit interne réalisées, constats.\n5. **Gestion des risques** — Cartographie actualisée, incidents, pertes.\n6. **Conformité réglementaire** — Gap Analysis par texte, suivi des recommandations.\n7. **Plan d'actions** — Actions correctives, responsables, échéances.\n8. **Annexes** — Matrice détaillée, indicateurs, glossaire.\n\nScore qualité cible : ≥ 8,5/10 (standard Big Four). Je peux pré-remplir le rapport avec vos données.`,
      },
      {
        keywords: [`écart`, `conformité`, `inspection`, `bceao`, `fréquent`],
        response: `Sur la base de l'analyse de 25+ rapports d'inspection BCEAO, voici le Top 5 des écarts — avec leur fréquence :\n\n1. **Insuffisance du dispositif LBC/FT** (82%) — Classification des risques clients incomplète, procédures KYC non documentées, absence de screening sanctions automatisé.\n2. **Gouvernance non conforme** (73%) — Comités spécialisés absents ou dysfonctionnels, cumul de mandats non déclaré.\n3. **Faiblesse du contrôle interne** (68%) — Absence de cartographie des risques, contrôle permanent insuffisant, fonction conformité sous-dimensionnée.\n4. **Système d'information** (55%) — Plan de continuité d'activité absent ou non testé, absence de PCA/PRA.\n5. **Reporting prudentiel** (48%) — Erreurs SURFI, retards déclaratifs, incohérences.\n\nScore moyen de conformité pré-inspection : 5,8/10. Mon plan de remédiation type couvre ces 5 écarts en 90 jours. Voulez-vous que je génère le plan d'action priorisé ?`,
      },
    ],
    fallback: `Bonne question. Pour vous fournir une réponse précise et sourcée, j'ai besoin de préciser le référentiel (COBAC, BCEAO, GAFI ou OHADA), le type d'établissement et le texte réglementaire concerné. Je peux alors réaliser le Gap Analysis article par article avec score de conformité et recommandations.`,
  },
  aml: {
    greeting: `Bonjour, je suis **KHEPRA AML AI**, votre expert LBC/FT. Je maîtrise les 40 Recommandations GAFI (révisées 2023), le règlement COBAC R-2018/01, la directive BCEAO 02/2015 et les standards GIABA/GABAC. Je produis des diagnostics LBC/FT, plans d'action 90 jours et cartographies des risques.\n\nQuel aspect de la LBC/FT souhaitez-vous approfondir ?`,
    suggestedQuestions: [
      `Comment mettre en place un dispositif LBC/FT conforme aux 40 Recommandations GAFI ?`,
      `Quelles sont les obligations KYC pour les SFD en zone UEMOA ?`,
      `Comment préparer une déclaration de soupçon CENTIF ?`,
    ],
    responses: [
      {
        keywords: [`dispositif`, `lbc/ft`, `gafi`, `40 recommandations`, `piliers`],
        response: `Le dispositif LBC/FT conforme aux 40 Recommandations GAFI s'articule autour de 8 piliers que j'audite systématiquement :\n\n1. **Gouvernance LBC/FT** (R.1) — Responsable LBC/FT rattaché à la Direction Générale, Comité LBC/FT trimestriel.\n2. **Classification des risques** (R.1) — Score risque pays × risque client × risque produit-service × risque canal (matrice 4 dimensions).\n3. **KYC/CDD** (R.10-11) — Identification, vérification, PPE screening, bénéficiaires effectifs (seuil 25%).\n4. **Surveillance des transactions** (R.20) — Scénarios de détection automatisés, seuils par profil de risque.\n5. **Déclarations de soupçon** (R.20-21) — Procédure confidentielle, délai 48h max après détection.\n6. **Sanctions internationales** (R.6-7) — Screening ONU, OFAC, UE, liste nationale CENTIF/ANIF en temps réel.\n7. **Formation** (R.18) — Formation initiale + continue annuelle, test de connaissances.\n8. **Contrôle interne LBC/FT** (R.18) — Audit annuel indépendant, test d'efficacité.\n\nScore diagnostic /32 : la moyenne UEMOA est à 18/32 (jaune). L'objectif est ≥ 26/32 (vert). Je peux lancer le diagnostic complet.`,
      },
      {
        keywords: [`kyc`, `sfd`, `uemoa`, `obligation`, `microfinance`],
        response: `Les obligations KYC pour les SFD en zone UEMOA sont régies par la Directive BCEAO 02/2015 et la Loi Uniforme LBC/FT. Voici le référentiel complet :\n\n**Identification (obligatoire) :**\n• Personnes physiques : CNI/Passeport + justificatif de domicile < 3 mois + photo\n• Personnes morales : RCCM + statuts + liste des dirigeants + bénéficiaires effectifs\n\n**Vérification :**\n• Consultation liste PPE nationale et internationale\n• Vérification documentaire + entretien physique obligatoire pour les PPE\n\n**Classification des risques :**\n• Risque Faible : épargnant < 2M FCFA, zone urbaine, secteur formel\n• Risque Moyen : 2-10M FCFA, transferts occasionnels\n• Risque Élevé : >10M FCFA, PPE, zone transfrontalière, ONG\n\n**Due Diligence Renforcée (EDD) :**\n• Obligatoire pour : PPE, pays à haut risque GAFI, transactions complexes inhabituelles\n• Mesures : entretien obligatoire, approbation hiérarchique N+2, surveillance renforcée\n\n**Conservation :** 10 ans après la fin de la relation.\n\nTaux de conformité KYC moyen des SFD UEMOA : 61%. Je peux auditer votre dispositif actuel.`,
      },
      {
        keywords: [`déclaration`, `soupçon`, `centif`, `anif`, `procédure`],
        response: `La Déclaration de Soupçon (DS) est l'obligation la plus sensible du dispositif LBC/FT. Voici la procédure conforme que j'ai structurée :\n\n1. **Détection** — Signalement par le système de monitoring ou alerte employé.\n2. **Analyse préliminaire** (max 24h) — Vérification par le Responsable LBC/FT : profil client, historique transactions, cohérence économique.\n3. **Décision** (max 24h supplémentaires) — Si soupçon confirmé → Déclaration. Si doute → Documentation de la non-déclaration.\n4. **Rédaction** — Formulaire CENTIF/ANIF :\n   • Identité complète du client\n   • Description détaillée des faits (chronologie, montants, contreparties)\n   • Motifs du soupçon (incohérence économique, complexité inhabituelle, pays à risque)\n   • Pièces jointes : relevés, documents KYC\n5. **Transmission** — Voie sécurisée CENTIF/ANIF, accusé de réception.\n6. **Confidentialité absolue** — Interdiction d'informer le client (art. 23 Loi Uniforme).\n\n**Délai maximum : 48h** à compter de la détection. Sanction pour défaut de déclaration : jusqu'à 50M FCFA + retrait d'agrément.\n\nJe peux vous fournir un modèle de DS conforme aux exigences CENTIF/ANIF.`,
      },
    ],
    fallback: `Question cruciale en matière de LBC/FT. Pour vous répondre avec précision, précisez : (1) le pays/juridiction (UEMOA/CEMAC), (2) le type d'établissement (banque, SFD, fintech, assurance) et (3) le volet concerné (KYC, déclaration de soupçon, sanctions, formation). Je mobiliserai les textes applicables : GAFI, COBAC R-2018/01, Directive BCEAO 02/2015, ou Règlement CEMAC.`,
  },
  'transfer-pricing': {
    greeting: `Bonjour, je suis **KHEPRA Transfer Pricing AI**, expert en prix de transfert. Je maîtrise les standards OCDE BEPS Action 13, les directives UEMOA 01/2011, le règlement CEMAC 01/18. Je produis des Master File, Local File, analyses FAR et études de comparables.\n\nQuel aspect des prix de transfert souhaitez-vous documenter ?`,
    suggestedQuestions: [
      `Comment structurer un Master File conforme BEPS Action 13 ?`,
      `Quelles sont les spécificités des prix de transfert en zone UEMOA ?`,
      `Comment réaliser une analyse fonctionnelle (FAR Analysis) ?`,
    ],
    responses: [
      {
        keywords: [`master file`, `beps`, `action 13`, `structurer`, `conforme`],
        response: `Le Master File conforme BEPS Action 13 (Annexe I, chapitre V des Principes OCDE) comprend 5 parties que je structure ainsi :\n\n**Partie 1 — Structure organisationnelle** : Organigramme juridique, pays d'implantation, entités opérationnelles vs holdings.\n**Partie 2 — Description des activités** : Chiffre d'affaires par ligne de business, chaîne de valeur, principaux moteurs de profit.\n**Partie 3 — Actifs incorporels** : Stratégie globale PI, localisation des brevets/marques, accords de répartition des coûts.\n**Partie 4 — Activités financières** : Financements intra-groupe, garanties, politique de prix de transfert financier.\n**Partie 5 — Positions fiscales** : Déclarations pays par pays (CbCR), rulings, APA en cours.\n\nDélai de production : 4-6 semaines. Langue : français + anglais si groupe international. Seuil de déclenchement groupe : CA consolidé ≥ 750M€.\n\nSpécificité UEMOA : la Directive 01/2011 exige en plus une annexe sur les transactions avec les pays UEMOA (exonération des droits de douane intra-communautaires). Je peux générer la trame complète.`,
      },
      {
        keywords: [`uemoa`, `spécificité`, `prix transfert`, `directive`],
        response: `La Directive UEMOA 01/2011/CM/UEMOA introduit 3 spécificités majeures par rapport au cadre OCDE standard :\n\n1. **Obligation documentaire dès le 1er franc** — Pas de seuil de matérialité comme en Europe. Toute transaction intra-groupe > 0 FCFA doit être documentée si l'entreprise réalise > 100M FCFA de CA.\n2. **Méthode CUP prioritaire** — La méthode du Comparable Uncontrolled Price est explicitement privilégiée par l'administration fiscale UEMOA. Les méthodes transactionnelles (TNMM, Profit Split) ne sont acceptées que si le CUP est impossible.\n3. **Délai de conservation : 10 ans** (contre 6-7 ans en Europe).\n\nZones de risque identifiées : absence de base de données africaine de comparables (oblige à utiliser des bases européennes avec ajustements), administrations fiscales encore peu outillées (risque d'interprétation divergente), absence de procédure APA (Accord Préalable) formalisée dans la plupart des États.\n\nJe recommande une documentation renforcée (Local File détaillé par juridiction) et une veille active des jurisprudences fiscales émergentes.`,
      },
      {
        keywords: [`far`, `analyse fonctionnelle`, `réaliser`, `méthode`],
        response: `L'analyse fonctionnelle (FAR Analysis) est la colonne vertébrale de toute documentation prix de transfert. Voici ma méthodologie en 7 étapes :\n\n1. **Cartographie des fonctions** — R&D, production, marketing, distribution, finance, management (qui fait quoi).\n2. **Analyse des actifs utilisés** — Actifs corporels (usines, équipements), incorporels (brevets, marques, savoir-faire).\n3. **Analyse des risques assumés** — Risque de marché, risque de crédit, risque opérationnel, risque de change.\n4. **Caractérisation des entités** — Fabricant, distributeur à risques limités, commissionnaire, agent, prestataire de services.\n5. **Sélection de la méthode** — CUP, Prix de Revient Majoré, Prix de Revente, TNMM, Profit Split.\n6. **Recherche de comparables** — Base de données (Orbis, TP Catalyst), critères de screening, ajustements.\n7. **Détermination du prix de pleine concurrence** — Intervalle interquartile, médiane, documentation.\n\nPour un groupe UEMOA/CEMAC, je recommande de segmenter l'analyse par fonction clé : production locale, distribution régionale, services de siège (management fees). Je peux exécuter la FAR Analysis complète.`,
      },
    ],
    fallback: `Question pertinente en prix de transfert. Pour calibrer ma réponse, précisez : (1) la nature de la transaction intra-groupe concernée, (2) les juridictions impliquées et (3) si vous avez déjà une documentation existante. Je pourrai alors appliquer le cadre BEPS Action 13 et les directives UEMOA/CEMAC appropriées.`,
  },
  tax: {
    greeting: `Bonjour, je suis **KHEPRA Tax AI**, votre expert en fiscalité UEMOA, CEMAC et internationale. Je maîtrise les Codes Généraux des Impôts, les conventions fiscales bilatérales et les régimes incitatifs. Je produis des analyses fiscales, due diligences et structurations conformes.\n\nQuel aspect fiscal souhaitez-vous explorer ?`,
    suggestedQuestions: [
      `Quels sont les taux d'IS en vigueur dans les pays UEMOA ?`,
      `Comment optimiser la fiscalité d'un groupe présent dans plusieurs pays africains ?`,
      `Quels sont les risques fiscaux lors d'une acquisition en zone CEMAC ?`,
    ],
    responses: [
      {
        keywords: [`taux`, `is`, `impôt`, `société`, `uemoa`, `vigueur`],
        response: `Taux d'Impôt sur les Sociétés en zone UEMOA (2026) — Tableau comparatif que je maintiens à jour :\n\n| Pays | Taux normal IS | Taux réduit PME | Contribution additionnelle |\n|------|---------------|-----------------|---------------------------|\n| Côte d'Ivoire | 25% | 20% (< 150M CA) | 7,5% contribution nationale |\n| Sénégal | 30% | 25% | - |\n| Burkina Faso | 27,5% | 25% | 7,5% contribution patente |\n| Mali | 30% | 25% | - |\n| Bénin | 30% | 25% (zones franches : 15%) | - |\n| Togo | 27% | - | 5% taxe additionnelle |\n| Niger | 30% | - | - |\n| Guinée-Bissau | 25% | - | - |\n\nRégimes particuliers : Code des Investissements (exonération 5-10 ans selon zone), Zones Franches (15%), Conventions d'Établissement.\n\nAttention : la Directive UEMOA sur l'harmonisation fiscale prévoit une convergence autour de 25% d'ici 2028. Je peux simuler l'impact pour votre structure.`,
      },
      {
        keywords: [`optimiser`, `fiscalité`, `groupe`, `plusieurs`, `pays`],
        response: `L'optimisation fiscale d'un groupe multi-pays africain doit être **strictement légale** et documentée. Voici les 4 leviers d'optimisation que je recommande :\n\n1. **Choix de la holding** — Localisation dans la juridiction la plus favorable (ex: Côte d'Ivoire pour le régime mère-fille intégral, Maurice pour les holdings panafricaines).\n2. **Conventions fiscales** — Utiliser les conventions bilatérales pour réduire les retenues à la source sur dividendes (0-5% vs 10-15% sans convention).\n3. **Prix de transfert documentés** — Documentation BEPS complète justifiant la répartition des bénéfices. C'est votre meilleure protection.\n4. **Régimes incitatifs** — Codes des Investissements (exonération IS 5 ans minimum), zones économiques spéciales, conventions d'établissement.\n\n**Ce qu'il ne faut JAMAIS faire :** montages artificiels sans substance, sociétés écrans, sous-capitalisation abusive.\n\nJe peux réaliser une analyse de l'empreinte fiscale actuelle et proposer une structuration conforme optimisée.`,
      },
    ],
    fallback: `Question fiscale pertinente. Pour une analyse précise, précisez : (1) le(s) pays concerné(s), (2) le type d'opération (acquisition, restructuration, investissement) et (3) le secteur d'activité. Je mobiliserai les CGI applicables et les conventions fiscales bilatérales pertinentes.`,
  },
  audit: {
    greeting: `Bonjour, je suis **KHEPRA Audit AI**, expert en audit interne selon les normes IIA (IPPF), COSO Internal Control et les standards ISA. Je maîtrise les audits prudentiels CAMELS, les pré-inspections BCEAO/COBAC et les due diligences.\n\nQuelle mission d'audit puis-je préparer pour vous ?`,
    suggestedQuestions: [
      `Comment préparer une mission d'audit interne selon les normes IIA ?`,
      `Qu'est-ce que l'audit prudentiel CAMELS ?`,
      `Comment se préparer à une inspection COBAC ?`,
    ],
    responses: [
      {
        keywords: [`audit interne`, `iia`, `norme`, `mission`, `préparer`],
        response: `La préparation d'une mission d'audit interne selon les normes IIA (IPPF) suit un cycle en 5 phases que j'applique rigoureusement :\n\n**Phase 1 — Planification** (10j) : lettre de mission, univers d'audit, matrice des risques, programme de travail.\n**Phase 2 — Prise de connaissance** (5j) : entretiens, procédures, documentation existante.\n**Phase 3 — Tests** (15j) : tests de conception, tests d'efficacité opérationnelle, échantillonnage.\n**Phase 4 — Constats** (5j) : fiche de constat, cotation (critique/majeur/modéré/mineur), réunion de clôture.\n**Phase 5 — Rapport** (5j) : rapport provisoire, contradictoire, rapport final, plan d'actions.\n\nNormes IIA clés : 1200 (Compétence), 2200 (Planification), 2300 (Exécution), 2400 (Communication), 2500 (Suivi).\n\nScore qualité cible : 8,5/10 minimum pour une mission conforme IPPF. Je peux générer la Charte d'Audit Interne (§4.9 KHEPRA AI Governance) et le programme de travail.`,
      },
      {
        keywords: [`camels`, `prudentiel`, `audit`, `composant`],
        response: `L'audit prudentiel CAMELS est le standard d'évaluation des établissements financiers. Chaque composante est notée de 1 (fort) à 5 (critique) :\n\n**C — Capital Adequacy** : Ratio de solvabilité (≥ 11,5% BCEAO/12% COBAC), qualité du Tier 1, politique de distribution des dividendes.\n**A — Asset Quality** : Taux de créances douteuses (< 8%), couverture par provisions (> 60%), concentration sectorielle.\n**M — Management** : Compétence, expérience, gouvernance, comités spécialisés.\n**E — Earnings** : ROA (> 1,5%), ROE (> 15%), coefficient d'exploitation (< 65%).\n**L — Liquidity** : LCR (> 100%), ratio de transformation, gap ALM.\n**S — Sensitivity to Market Risk** : Exposition au risque de taux, risque de change, stress tests.\n\nScore composite : moyenne pondérée des 6 composantes. Un score > 3 déclenche généralement une inspection approfondie.\n\nJe peux simuler une notation CAMELS pour votre établissement avec les ratios clés.`,
      },
      {
        keywords: [`inspection`, `cobac`, `préparer`, `pré-inspection`],
        response: `La préparation à une inspection COBAC est un processus en 4 phases que j'ai standardisé :\n\n**J-90 — Diagnostic** : Gap Analysis complet sur les 6 piliers COBAC, scoring /100, identification des écarts critiques.\n**J-60 — Remédiation** : Correction des écarts critiques, mise à jour procédures, régularisations administratives.\n**J-30 — Simulation** : Inspection blanche avec un consultant externe, revue des points de contrôle.\n**J-15 — Documentation** : Préparation du data room, classement des pièces par circulaire, fiche de synthèse.\n\nCheck-list des 15 documents les plus demandés :\n1. Registre des procès-verbaux CA/AG (3 ans)\n2. Dossiers KYC des 20 plus gros clients\n3. Rapports SCI (2 dernières années)\n4. Cartographie des risques actualisée\n5. Manuel de procédures LBC/FT\n6. États financiers certifiés (3 ans)\n7. Rapports SURFI et déclarations prudentielles\n8. Contrats d'externalisation\n9. Plan de continuité d'activité testé\n10. Rapports d'audit interne (2 ans)\n... (suite complète sur demande)\n\nTaux de succès post-préparation KHEPRA : 92% d'inspection sans sanction majeure.`,
      },
    ],
    fallback: `Question pertinente en matière d'audit. Pour une réponse calibrée, précisez : (1) le type d'audit (interne, prudentiel, pré-inspection), (2) le cadre réglementaire (COBAC, BCEAO) et (3) l'établissement concerné. J'appliquerai les normes IIA, COSO ou ISA selon le contexte.`,
  },
  knowledge: {
    greeting: `Bonjour, je suis **KHEPRA Knowledge AI**, gestionnaire de la base documentaire KHEPRA OS 2. J'orchestre le Knowledge Capture, produis les Case Studies et maintiens la bibliothèque réglementaire RAG (52+ documents).\n\nQuelle connaissance souhaitez-vous mobiliser ?`,
    suggestedQuestions: [
      `Quels documents réglementaires couvrent la gouvernance bancaire ?`,
      `Quelles sont les dernières mises à jour réglementaires au Togo ?`,
      `Pouvez-vous retrouver un Case Study sur l'agrément SFD ?`,
    ],
    responses: [
      {
        keywords: [`document`, `réglementaire`, `gouvernance`, `bancaire`, `couverture`],
        response: `Notre base documentaire couvre la gouvernance bancaire à travers 10 documents clés que j'ai indexés :\n\n**CB-UMOA (UEMOA — siège BCEAO) :**\n• Circulaire CB-UMOA 01-2017/CB/C — Gouvernance d'entreprise (42 articles)\n• Circulaire CB-UMOA 02-2017/CB/C — Compétences des dirigeants (verrou de nationalité)\n• Circulaire CB-UMOA 03-2017/CB/C — Indépendance des administrateurs\n\n**COBAC (CEMAC — siège BEAC) :**\n• Règlement COBAC R-2018/01 — Gouvernance des établissements de crédit\n• Règlement COBAC R-2016/04 — Contrôle interne et gestion des risques\n\n**BCEAO :**\n• Instruction 008-05-2015 — Gouvernance des établissements de crédit\n• Directive 01/2017 — Convergence prudentielle UEMOA\n\n**OHADA :**\n• Acte Uniforme AUSCGIE — Droit des sociétés commerciales (articles 414-560 sur l'administration)\n\n**International :**\n• GAFI Recommandation 1 — Évaluation des risques\n• Principes OCDE G20 — Gouvernance d'entreprise\n\nJe peux extraire le contenu spécifique de n'importe lequel de ces documents. Lequel souhaitez-vous consulter ?`,
      },
      {
        keywords: [`mise à jour`, `dernière`, `togo`, `réglementaire`],
        response: `Dernières mises à jour réglementaires — Togo (derniers 12 mois, base KHEPRA actualisée au 27 juin 2026) :\n\n1. **BCEAO** — Instruction n°001/01/2024 relative aux services de paiement dans l'UMOA (23 janvier 2024) — protection des utilisateurs et interopérabilité PI-SPI.\n2. **GAFI/GIABA** — Publication du rapport d'évaluation mutuelle du Togo (mars 2026) : conformité sur 31/40 recommandations, plan d'action 18 mois.\n3. **OHADA** — Révision Acte Uniforme Portant Organisation des Sûretés (AUS), adoptée décembre 2023, publiée 2024.\n4. **UEMOA** — Directive 04/2018/CM/UEMOA sur la cybersécurité des systèmes financiers.\n\nScore de couverture togolaise : 11/14 autorités suivies (79%). Je peux générer un bulletin de veille complet pour le Togo.`,
      },
    ],
    fallback: `Bonne question. Je peux interroger la base documentaire KHEPRA (52+ documents). Précisez : (1) quel pays/juridiction, (2) quel domaine (bancaire, microfinance, gouvernance, LBC/FT, ESG) et (3) quel type de document (circulaire, instruction, directive, étude, case study). J'extrairai les références pertinentes.`,
  },
  content: {
    greeting: `Bonjour, je suis **KHEPRA Content AI**, votre stratège en découvrabilité digitale. J'optimise votre contenu pour Google (SEO), ChatGPT/Gemini (GEO), les Answer Engines (AEO) et les LLMs (LLMO).\n\nQuel contenu voulez-vous optimiser aujourd'hui ?`,
    suggestedQuestions: [
      `Comment optimiser un article pour apparaître dans ChatGPT et Gemini ?`,
      `Quelle stratégie SEO pour un cabinet de conseil en Afrique ?`,
      `Comment structurer un contenu EEAT sur la conformité bancaire ?`,
    ],
    responses: [
      {
        keywords: [`chatgpt`, `gemini`, `geo`, `optimiser`, `apparaître`],
        response: `L'optimisation GEO (Generative Engine Optimization) est ma spécialité. Voici ma méthodologie en 7 points pour être cité par ChatGPT, Gemini, Claude et Perplexity :\n\n1. **Structure sémantique** — Utiliser le Schema.org FAQ, HowTo, Article de manière exhaustive.\n2. **Autorité de source** — Citations explicites (BCEAO, COBAC, GAFI), statistiques sourcées, date de mise à jour visible.\n3. **Exhaustivité** — Minimum 1 500 mots par article, couverture complète du sujet, pas de contenu superficiel.\n4. **Fraîcheur** — Mise à jour datée, contenu récent (moins de 6 mois pour sujets réglementaires).\n5. **Citations inversées** — Être cité par des sources autoritaires crée un « citation graph ».\n6. **Corpus training** — Publier régulièrement pour être inclus dans les corpus d'entraînement des LLMs.\n7. **Technical markup** — JSON-LD structuré, balises hreflang, canonical propres.\n\nScore GEO actuel de KHEPRA EXPERTS : 78/100. Objectif : 90/100 d'ici décembre 2026. Voulez-vous optimiser un contenu spécifique ?`,
      },
      {
        keywords: [`seo`, `stratégie`, `cabinet`, `conseil`, `afrique`],
        response: `La stratégie SEO pour un cabinet de conseil en Afrique francophone doit reposer sur 5 piliers distinctifs :\n\n1. **Silos thématiques** — 3 piliers : Régulation financière (BCEAO/COBAC), Prix de transfert (BEPS), Gouvernance & Risques (COSO). Chaque pilier = 10-15 articles.\n2. **SEO géolocalisé** — Pages par pays/capitale économique : Abidjan, Dakar, Douala, Lomé, Cotonou…\n3. **Longue traîne réglementaire** — Cibler les requêtes spécifiques : « circulaire 001-2017 COBAC gouvernance », « ratio solvabilité BCEAO 2026 ».\n4. **Contenu EEAT** — Auteur identifié, biographie experte, sources réglementaires citées.\n5. **Netlinking africain** — Partenariats médias, associations professionnelles (APBEF, ASAF), annuaires juridiques.\n\nVolume cible : 200+ pages indexées, 50+ articles pilier, 15+ pages géolocalisées. Je peux générer le calendrier éditorial 2026.`,
      },
    ],
    fallback: `Question pertinente en stratégie de contenu. Précisez : (1) le canal (SEO, GEO, LinkedIn), (2) le type de contenu (article, page service, lead magnet) et (3) vos objectifs (trafic, leads, autorité). Je calibrerai la stratégie en conséquence.`,
  },
  'thought-leadership': {
    greeting: `Bonjour, je suis **KHEPRA Thought Leadership AI**. Je produis des livres blancs, études sectorielles, notes de conjoncture et position papers de niveau think tank pour les régulateurs, gouvernements et investisseurs institutionnels.\n\nQuelle publication puis-je préparer pour vous ?`,
    suggestedQuestions: [
      `Comment rédiger un livre blanc sur la régulation financière en Afrique ?`,
      `Quels sujets de Position Paper sont pertinents en 2026 ?`,
      `Quelle est la structure d'un Policy Brief pour la BCEAO ?`,
    ],
    responses: [
      {
        keywords: [`livre blanc`, `régulation`, `financière`, `afrique`, `rédiger`],
        response: `Un livre blanc de niveau Big Four sur la régulation financière en Afrique suit cette structure que j'ai standardisée :\n\n1. **Executive Summary** (2 pages) — 5 messages clés, 3 recommandations, 1 chiffre choc.\n2. **Contexte & Problématique** (5 pages) — État des lieux, données chiffrées, benchmark international.\n3. **Analyse Approfondie** (15 pages) — 3-4 angles d'analyse, interviews d'experts, cas concrets.\n4. **Étude Comparative** (5 pages) — Benchmark UEMOA vs CEMAC vs Afrique de l'Est vs standards internationaux.\n5. **Recommandations** (5 pages) — 5-10 recommandations concrètes, priorisées, chiffrées.\n6. **Roadmap** (3 pages) — Étapes de mise en œuvre, KPI de succès.\n7. **Annexes** — Méthodologie, sources, glossaire.\n\nProchain livre blanc recommandé : « Conformité LBC/FT en Afrique francophone — État des lieux et feuille de route 2026-2028 ». Timing idéal : septembre 2026. Je peux démarrer la rédaction.`,
      },
    ],
    fallback: `Excellente initiative de thought leadership. Pour calibrer la publication, précisez : (1) le sujet principal, (2) le public cible (régulateurs, dirigeants, investisseurs) et (3) le format souhaité (livre blanc, policy brief, note de conjoncture, rapport sectoriel).`,
  },
  'business-development': {
    greeting: `Bonjour, je suis **KHEPRA Business Development AI**, votre moteur de croissance. Je gère le Lead Scoring, le pipeline commercial, la détection d'opportunités et le social selling LinkedIn.\n\nQuel levier de croissance voulez-vous activer ?`,
    suggestedQuestions: [
      `Quels sont les secteurs les plus porteurs pour le conseil réglementaire en 2026 ?`,
      `Comment scorer un lead pour prioriser les actions commerciales ?`,
      `Quelle stratégie de social selling LinkedIn pour un cabinet de conseil ?`,
    ],
    responses: [
      {
        keywords: [`secteur`, `porteur`, `croissance`, `conseil`, `2026`],
        response: `Les secteurs les plus porteurs pour le conseil réglementaire en Afrique francophone (analyse KHEPRA Q1 2026) :\n\n1. **Microfinance** — Croissance 18%/an, 500+ SFD en mutation réglementaire (agrément, LBC/FT, ratios BCEAO/COBAC). Pipeline : 45 leads qualifiés.\n2. **Fintechs** — 200+ fintechs en Afrique francophone, 80% en phase d'agrément. Besoin critique : conformité, prix de transfert, levée de fonds. Pipeline : 32 leads.\n3. **Banques universelles** — Consolidation post-Bâle III, besoins en gouvernance et audit interne. Pipeline : 18 leads.\n4. **Assurances** — Directive CIMA, ESG, digitalisation. Pipeline : 12 leads.\n5. **Holdings familiales** — Transmission, gouvernance, due diligence. Pipeline : 25 leads.\n\nScore marché global : 8,2/10 (très porteur). Je recommande de concentrer 50% de l'effort commercial sur Microfinance + Fintechs.`,
      },
      {
        keywords: [`scorer`, `lead`, `prioriser`, `lead scoring`],
        response: `Mon modèle de Lead Scoring KHEPRA repose sur 4 dimensions pondérées (/100) :\n\n1. **Potentiel budgétaire** (30 pts) : Budget estimé, historique de missions similaires, secteur.\n2. **Urgence** (25 pts) : Deadline réglementaire, inspection imminente, deadline investisseur.\n3. **Alignement stratégique** (25 pts) : BU cible, zone géographique prioritaire, rentabilité cible.\n4. **Accessibilité** (20 pts) : Contact existant, réseau commun, recommandation.\n\nScore final :\n• 80-100 : Hot Lead — Action immédiate (appel Direction)\n• 60-79 : Warm Lead — Nurturing 2 semaines (email + LinkedIn + contenu)\n• 40-59 : Cold Lead — Nurturing 3 mois (newsletter, invitation événements)\n• < 40 : À qualifier ultérieurement\n\nJe peux scorer votre pipeline actuel si vous me fournissez la liste des leads.`,
      },
    ],
    fallback: `Pour activer le bon levier de croissance, j'ai besoin de préciser : (1) quelle BU (Régulation, Prix de Transfert, GRC), (2) quelle zone géographique prioritaire et (3) votre objectif commercial (nombre de missions, CA cible).`,
  },
  proposal: {
    greeting: `Bonjour, je suis **KHEPRA Proposal AI**, spécialisé dans la rédaction d'offres techniques et propositions commerciales. Je m'appuie sur les 60+ modèles de la KHEPRA Deliverable Factory et les standards de qualité Big Four.\n\nQuelle proposition puis-je préparer pour vous ?`,
    suggestedQuestions: [
      `Comment structurer une offre technique pour un appel d'offres BAD ?`,
      `Quelle stratégie de pricing pour une mission de conseil ?`,
      `Comment évaluer un appel d'offres (Go/No Go) ?`,
    ],
    responses: [
      {
        keywords: [`offre technique`, `appel d'offres`, `bad`, `structure`],
        response: `Une offre technique pour un appel d'offres BAD/Banque Mondiale suit cette structure en 9 sections :\n\n1. **Lettre de soumission** — Engagement, références.\n2. **Compréhension de la mission** — Reformulation, enjeux.\n3. **Méthodologie** — Approche, phases, livrables.\n4. **Plan de travail** — Chronogramme, jalons, ressources.\n5. **Équipe projet** — CV, rôles, disponibilité.\n6. **Références** — 5-10 missions similaires.\n7. **Proposition financière** — Budget détaillé, honoraires, frais.\n8. **Transfert de compétences** — Formation, documentation.\n9. **Annexes** — Statuts, certifications, attestations.\n\nScore de succès KHEPRA : 68% de taux de transformation. Je peux générer une trame adaptée à votre AO.`,
      },
    ],
    fallback: `Pour préparer une proposition gagnante, précisez : (1) le client cible et le contexte, (2) le type d'appel d'offres (bailleur, privé) et (3) le budget estimatif. J'utiliserai les templates Deliverable Factory adaptés.`,
  },
  'client-success': {
    greeting: `Bonjour, je suis **KHEPRA Client Success AI**, dédié à la satisfaction et la fidélisation. Je gère le NPS, les enquêtes post-mission et les plans de fidélisation.\n\nComment puis-je améliorer votre relation client ?`,
    suggestedQuestions: [
      `Comment mesurer le NPS de nos missions de conseil ?`,
      `Quelle stratégie de fidélisation pour des clients institutionnels ?`,
      `Comment gérer une insatisfaction client sur une mission ?`,
    ],
    responses: [
      {
        keywords: [`nps`, `mesurer`, `satisfaction`],
        response: `Le NPS (Net Promoter Score) KHEPRA se mesure en 4 étapes :\n\n1. **Question unique** — « Sur une échelle de 0 à 10, recommanderiez-vous KHEPRA EXPERTS ? »\n2. **Classification** — Promoteurs (9-10), Passifs (7-8), Détracteurs (0-6).\n3. **Calcul** — NPS = % Promoteurs - % Détracteurs.\n4. **Question ouverte** — « Pourquoi cette note ? »\n\nBenchmark : NPS moyen cabinet de conseil = 45. KHEPRA cible = 75+.\n\nFréquence de mesure : fin de mission + 6 mois après (suivi). Je peux automatiser l'enquête et le dashboard NPS.`,
      },
    ],
    fallback: `Pour améliorer votre relation client, précisez : (1) le client concerné (anonymisé), (2) la nature de la mission et (3) le problème ou l'objectif spécifique. Je concevrai le plan d'action adapté.`,
  },
  learning: {
    greeting: `Bonjour, je suis **KHEPRA Learning AI**, responsable de l'Académie KHEPRA. Je conçois des formations certifiantes en régulation financière, conformité, gestion des risques et gouvernance.\n\nQuelle formation puis-je vous proposer ?`,
    suggestedQuestions: [
      `Quelles certifications propose l'Académie KHEPRA ?`,
      `Comment former une équipe conformité en 3 mois ?`,
      `Quels sont les prérequis pour la certification KCCO ?`,
    ],
    responses: [
      {
        keywords: [`certification`, `académie`, `kcco`, `kcas`, `programme`],
        response: `L'Académie KHEPRA propose 5 certifications professionnelles :\n\n1. **KCCO** (KHEPRA Certified Compliance Officer) — 60h, 8 modules, examen final. Prérequis : Bac+3.\n2. **KCAS** (KHEPRA Certified Audit Specialist) — 45h, 6 modules. Prérequis : 2 ans d'expérience.\n3. **KCIA** (KHEPRA Certified Internal Auditor) — 50h, normes IIA + COSO. Prérequis : Bac+4.\n4. **KCRM** (KHEPRA Certified Risk Manager) — 55h, COSO ERM + ISO 31000. Prérequis : 3 ans d'expérience.\n5. **KCBM** (KHEPRA Certified Banking Manager) — 70h, réglementation bancaire complète. Prérequis : 5 ans d'expérience.\n\nFormat : e-learning + 2 sessions live par mois. Taux de réussite : 89%. Je peux vous inscrire à la prochaine cohorte.`,
      },
    ],
    fallback: `Pour vous orienter vers la bonne formation, précisez : (1) votre profil et expérience, (2) vos objectifs de carrière et (3) votre disponibilité. Je vous recommanderai le parcours certifiant le plus adapté.`,
  },
  'ceo-copilot': {
    greeting: `Bonjour, je suis **KHEPRA CEO Copilot**, votre assistant exécutif. Je produis des synthèses quotidiennes, des alertes critiques et le Dashboard CEO consolidé.\n\nQuelle synthèse puis-je préparer pour vous ?`,
    suggestedQuestions: [
      `Quelle est la situation du pipeline commercial ce mois-ci ?`,
      `Quelles sont les alertes critiques du jour ?`,
      `Quel est le score de performance des agents IA ce trimestre ?`,
    ],
    responses: [
      {
        keywords: [`pipeline`, `commercial`, `mois`, `situation`],
        response: `Synthèse Pipeline KHEPRA — Juin 2026 :\n\n**Vue d'ensemble :**\n• Opportunités actives : 34 (+12% vs mai)\n• Valeur pondérée : 2,1M€ (+18% vs mai)\n• Taux de conversion : 32%\n\n**Par Business Unit :**\n• BU1 Régulation : 14 opportunités, 980K€ pondérés\n• BU2 Prix de Transfert : 8 opportunités, 520K€ pondérés\n• BU3 GRC : 12 opportunités, 600K€ pondérés\n\n**Top 3 opportunités ce mois :**\n1. Banque Abidjan — Due Diligence acquisition (350K€, closing 30/06)\n2. Groupe Fintech Douala — Agrément + conformité (280K€, closing 15/07)\n3. Holding Dakar — Gouvernance familiale (180K€, closing 30/06)\n\n**Alertes :** 2 opportunités en risque (retard décisionnel), 1 opportunité concurrente identifiée.\n\nScore pipeline santé : 7,8/10. Recommandation : accélérer closing Top 3.`,
      },
      {
        keywords: [`alerte`, `critique`, `jour`, `24/7`],
        response: `Alertes Critiques — 8 juin 2026, 10h00 GMT :\n\n🔴 **Rouge (action immédiate) :**\n• Deadline soumission AO BAD — J-3 (offre Audit SFD Cameroun, 450K€). En attente validation finale DG.\n• Retard livrable Client A — J+2 sur le planning. Impact NPS potentiel.\n\n🟠 **Orange (action sous 1h) :**\n• Nouvelle circulaire COBAC publiée hier — R-2026/01. Impact potentiel sur 3 missions actives.\n• Lead scoring : 2 Hot Leads non contactés depuis 72h. Risque de perte.\n\n🟡 **Jaune (information) :**\n• Taux d'utilisation agents IA : 67% ce mois. Rappel : objectif 85%.\n• 3 formations arrivent à échéance de certification.\n\nDashboard complet disponible sur /executive-dashboard. Voulez-vous détailler un point ?`,
      },
      {
        keywords: [`performance`, `agent`, `ia`, `score`, `trimestre`],
        response: `Performance Agents IA KHEPRA OS 2 — Q2 2026 :\n\n**Score moyen : 9,2/10** (objectif ≥ 9,0 — ATTEINT)\n\n**Top 5 Agents (qualité livrables) :**\n1. AML AI — 9,7/10 (diagnostics LBC/FT, 18 livrables)\n2. Compliance AI — 9,5/10 (Gap Analysis, 22 livrables)\n3. Audit AI — 9,4/10 (missions d'audit, 15 livrables)\n4. Transfer Pricing AI — 9,4/10 (documentation BEPS, 12 livrables)\n5. Strategy AI — 9,3/10 (plans stratégiques, 10 livrables)\n\n**Axes d'amélioration :**\n• Business Development AI : 8,7/10 — Lead scoring à recalibrer\n• Content AI : 8,9/10 — Volume de publication à augmenter\n\nTaux de respect des délais : 94%. Score qualité global : 9,2/10. Je recommande une revue trimestrielle avec le Quality Review AI.`,
      },
    ],
    fallback: `Pour votre briefing exécutif, précisez le périmètre : (1) pipeline commercial, (2) alertes réglementaires, (3) performance des agents, (4) indicateurs financiers, ou (5) synthèse complète. Je consolide les données des 20 autres agents.`,
  },
  'growth-influence': {
    greeting: `Bonjour, je suis **KHEPRA Growth & Influence AI**, votre stratège en marque, RP et influence réglementaire. Je gère la présence LinkedIn, les relations presse et les événements propriétaires.\n\nQuel levier d'influence voulez-vous activer ?`,
    suggestedQuestions: [
      `Comment développer notre influence sur LinkedIn ?`,
      `Quels événements organiser pour renforcer notre positionnement ?`,
      `Comment mesurer notre e-réputation ?`,
    ],
    responses: [
      {
        keywords: [`linkedin`, `influence`, `développer`, `marque`],
        response: `Stratégie LinkedIn KHEPRA — Objectif 15 000 abonnés d'ici décembre 2026 :\n\n1. **Contenu pilier** (3x/semaine) — Analyses réglementaires, extraits de livres blancs, interviews experts.\n2. **Engagement** — Commentaires qualifiés sur les posts des régulateurs (BCEAO, COBAC, GAFI) et des dirigeants.\n3. **Collaborations** — Posts invités avec APBEF, ASAF, FELABAN.\n4. **Format vidéo** — Capsules « 60 secondes conformité » (hebdomadaire).\n5. **Newsletter LinkedIn** — « KHEPRA Regulatory Brief » (bi-mensuelle).\n\nBenchmark actuel : 8 200 abonnés. Croissance cible : +65% en 6 mois. Je peux générer le calendrier éditorial LinkedIn.`,
      },
    ],
    fallback: `Pour développer votre influence, précisez : (1) le canal prioritaire (LinkedIn, presse, événements), (2) le message clé à véhiculer et (3) la cible (régulateurs, dirigeants, investisseurs).`,
  },
  'regulatory-intelligence': {
    greeting: `Bonjour, je suis **KHEPRA Regulatory Intelligence AI**, votre vigie réglementaire 24/7. Je surveille 14 sources officielles en temps réel et génère des alertes de criticité.\n\nQuelle veille voulez-vous activer ?`,
    suggestedQuestions: [
      `Quelles sont les dernières alertes réglementaires en zone UEMOA ?`,
      `Y a-t-il de nouvelles circulaires COBAC cette semaine ?`,
      `Quel est le score de criticité des changements réglementaires récents ?`,
    ],
    responses: [
      {
        keywords: [`alerte`, `réglementaire`, `uemoa`, `dernière`],
        response: `Dernières alertes UEMOA — Période 1-8 juin 2026 (14 sources surveillées) :\n\n🔴 **Critique** — BCEAO : Projet d'instruction sur le renforcement du ratio de solvabilité (passage de 11,5% à 13% envisagé). Impact : toutes les banques UEMOA. Consultation publique jusqu'au 30/06.\n\n🟠 **Élevée** — GIABA : Publication rapport annuel 2025 — 7 pays UEMOA évalués, 3 en « suivi renforcé ». Score LBC/FT moyen : 22/32.\n\n🟡 **Modérée** — OHADA : Proposition de révision Acte Uniforme Comptable. Consultation jusqu'au 31/08.\n\nTaux de couverture : 11/14 autorités. Je peux configurer des alertes personnalisées par pays/domaine/autorité.`,
      },
      {
        keywords: [`cobac`, `circulaire`, `nouvelle`, `semaine`],
        response: `Activité COBAC — Semaine du 1er au 8 juin 2026 :\n\n**Nouvelle publication :** R-2026/01 relative au renforcement des exigences de fonds propres pour les établissements de crédit. 3 points clés :\n• Relèvement du ratio CET1 minimum de 5,5% à 6,5% (entrée en vigueur 01/01/2027)\n• Introduction d'un coussin de conservation de 2,5%\n• Exigence pilier 2 individualisée par établissement\n\n**En consultation :** Projet de circulaire sur l'externalisation des services IT (deadline commentaires 15/07/2026).\n\nJe recommande une analyse d'impact immédiate pour tous les clients bancaires CEMAC. Voulez-vous que je la génère ?`,
      },
    ],
    fallback: `Pour activer une veille ciblée, précisez : (1) la juridiction (UEMOA, CEMAC, OHADA), (2) le domaine (bancaire, microfinance, LBC/FT, fiscalité) et (3) la fréquence souhaitée (temps réel, hebdomadaire, mensuelle).`,
  },
  'knowledge-graph': {
    greeting: `Bonjour, je suis **KHEPRA Knowledge Graph AI**, architecte du graphe sémantique KHEPRA. Je relie les textes réglementaires, la jurisprudence et la doctrine pour révéler les connexions cachées.\n\nQuelle connexion voulez-vous explorer ?`,
    suggestedQuestions: [
      `Comment la circulaire COBAC 001-2017 impacte-t-elle la fiscalité ?`,
      `Quelles relations existent entre les textes BCEAO et OHADA ?`,
      `Pouvez-vous cartographier les dépendances réglementaires pour une fintech ?`,
    ],
    responses: [
      {
        keywords: [`cobac`, `001-2017`, `impact`, `fiscalité`, `lien`],
        response: `Connexions détectées — Circulaire CB-UMOA 01-2017/CB/C ↔ Fiscalité :\n\n**Chemin 1 — Comités spécialisés → Prix de transfert :**\nLa circulaire exige un Comité des Risques (Art. 13). Ce comité doit analyser les risques fiscaux liés aux transactions intra-groupe, créant une obligation implicite de documentation prix de transfert.\n\n**Chemin 2 — Gouvernance → Due Diligence fiscale :**\nL'obligation d'administrateurs indépendants (Art. 26) renforce l'exigence de due diligence fiscale préalable à toute acquisition.\n\n**Chemin 3 — Transparence → Déclarations pays par pays :**\nL'obligation de transparence (Art. 37) converge avec BEPS Action 13 sur le CbCR.\n\n**Nœuds connectés :** 8 textes CB-UMOA et COBAC, 3 conventions fiscales bilatérales, 2 directives UEMOA. Score de connexité : 82/100. Je peux visualiser le graphe complet.`,
      },
      {
        keywords: [`fintech`, `dépendance`, `réglementaire`, `cartographie`],
        response: `Cartographie des dépendances réglementaires — Fintech UEMOA :\n\n**Niveau 1 — Agrément (obligatoire) :**\n• BCEAO Instruction 008-05-2015 → Agrément SFD/EMF\n• Loi Uniforme LBC/FT → Obligations KYC/CENTIF\n\n**Niveau 2 — Opérations :**\n• BCEAO Directive sur les services de paiement → Interopérabilité\n• UEMOA Directive protection données → RGPD africain\n\n**Niveau 3 — Risques :**\n• BCEAO Instruction 011-07-2016 → Sécurité des systèmes d'information\n• ISO 27001 → Certification cybersécurité (recommandé)\n\n**Niveau 4 — Reporting :**\n• SURFI → Déclarations prudentielles mensuelles\n• CENTIF → Déclarations de soupçon (si applicables)\n\nTotal : 12 textes interconnectés, 4 niveaux de dépendance. Je peux générer la matrice de conformité multi-textes.`,
      },
    ],
    fallback: `Pour explorer le graphe de connaissances, précisez : (1) le texte ou concept de départ, (2) le type de relations recherchées (impacts, dépendances, contradictions) et (3) le domaine connexe. Je cartographierai les connexions.`,
  },
  'data-analytics': {
    greeting: `Bonjour, je suis **KHEPRA Data Analytics AI**, votre expert en analyse quantitative, modélisation prédictive et scoring. Je produis des dashboards dynamiques, des ratios prudentiels automatisés et des modèles prédictifs.\n\nQuelle analyse quantitative puis-je exécuter ?`,
    suggestedQuestions: [
      `Quels sont les ratios prudentiels moyens des banques en zone UEMOA ?`,
      `Pouvez-vous faire un credit scoring pour un portefeuille SFD ?`,
      `Quelle est la tendance du risque de crédit en zone CEMAC ?`,
    ],
    responses: [
      {
        keywords: [`ratio`, `prudentiel`, `moyen`, `banque`, `uemoa`],
        response: `Ratios prudentiels moyens — Banques UEMOA (données Q1 2026, 105 banques) :\n\n| Ratio | Moyenne UEMOA | Minimum | Maximum | Seuil BCEAO |\n|-------|--------------|---------|---------|-------------|\n| Solvabilité CET1 | 9,8% | 6,2% | 15,1% | ≥ 7% |\n| Solvabilité totale | 12,4% | 8,9% | 18,3% | ≥ 11,5% |\n| LCR | 158% | 94% | 310% | ≥ 100% |\n| Créances douteuses | 7,2% | 2,1% | 14,8% | < 8% |\n| ROA | 1,8% | 0,3% | 3,5% | > 1,5% |\n| ROE | 16,2% | 5,1% | 28,4% | > 15% |\n| Coefficient exploitation | 58% | 42% | 72% | < 65% |\n\nAlertes : 8 banques sous le seuil CET1, 12 banques avec créances douteuses > 10%. Je peux générer un benchmarking personnalisé.`,
      },
    ],
    fallback: `Pour une analyse quantitative précise, indiquez : (1) le type d'analyse (ratios, prédictif, benchmarking), (2) le secteur/géographie et (3) la période. Je produirai le dashboard correspondant.`,
  },
  'quality-review': {
    greeting: `Bonjour, je suis **KHEPRA Quality Review AI**, contrôleur qualité indépendant. J'applique les 12 contrôles Big Four avec un seuil d'acceptation à 95/100 et je peux émettre un veto qualité contraignant.\n\nQuel livrable voulez-vous soumettre à ma revue ?`,
    suggestedQuestions: [
      `Quels sont les 12 contrôles qualité appliqués à chaque livrable ?`,
      `Comment améliorer un livrable pour atteindre le score 95/100 ?`,
      `Qu'est-ce que le veto qualité et quand s'applique-t-il ?`,
    ],
    responses: [
      {
        keywords: [`12 contrôle`, `qualité`, `livrable`, `checklist`],
        response: `Les 12 Contrôles Qualité Big Four KHEPRA — appliqués à chaque livrable avant émission :\n\n1. **Exactitude réglementaire** — Chaque référence est vérifiée (texte, article, date, autorité).\n2. **Cohérence inter-agents** — Aucune contradiction non résolue entre agents.\n3. **Traçabilité des sources** — 100% des affirmations sourcées.\n4. **Style institutionnel** — Ton, vocabulaire, formatting conformes.\n5. **Exhaustivité** — Couverture complète du périmètre défini.\n6. **Clarté** — Compréhensible par le client sans jargon excessif.\n7. **Actionnabilité** — Recommandations concrètes, priorisées, datées.\n8. **Précision quantitative** — Chiffres vérifiés, calculs audités.\n9. **Confidentialité** — Aucune donnée client croisée, anonymisation.\n10. **Horodatage** — Date, version, auteur tracés.\n11. **Conformité éditoriale** — Normes KHEPRA, charte graphique.\n12. **Validation indépendante** — Revue par un agent non-producteur.\n\nScore minimum d'acceptation : 95/100. En dessous → retour à l'agent producteur. Je peux auditer votre livrable maintenant.`,
      },
    ],
    fallback: `Pour auditer un livrable, soumettez-moi le document (ou sa description). J'appliquerai les 12 contrôles Big Four et vous remettrai mon scoring KOS /100 avec les recommandations de correction.`,
  },
  'innovation-lab': {
    greeting: `Bonjour, je suis **KHEPRA Innovation Lab AI**, votre vigie prospective. Je surveille les avancées en IA, RegTech et technologies émergentes, et je prototypage de nouveaux services.\n\nQuelle innovation voulez-vous explorer ?`,
    suggestedQuestions: [
      `Quelles sont les dernières innovations en RegTech pour l'Afrique ?`,
      `Comment l'IA générative transforme-t-elle le conseil réglementaire ?`,
      `Quels nouveaux services KHEPRA devrait-elle développer ?`,
    ],
    responses: [
      {
        keywords: [`regtech`, `innovation`, `afrique`, `dernière`],
        response: `Innovations RegTech pertinentes pour l'Afrique francophone — Veille Q1 2026 :\n\n1. **SupTech BCEAO** — La BCEAO déploie un système de supervision automatisée (SupTech) pour le reporting prudentiel. Les banques doivent adapter leurs systèmes d'ici 2027.\n2. **KYC biométrique** — Solutions de vérification d'identité basées sur la reconnaissance faciale, compatibles avec les CNI biométriques UEMOA/CEMAC.\n3. **Blockchain notariale** — OHADA explore la blockchain pour la traçabilité des actes juridiques (projet pilote CCJA 2026).\n4. **LLMs juridiques africains** — Émergence de modèles de langage entraînés sur les corpus juridiques OHADA.\n\nScore de maturité RegTech Afrique : 3,2/5 (émergent). Recommandation KHEPRA : investir dans le SupTech readiness et le KYC biométrique.`,
      },
    ],
    fallback: `Pour explorer une innovation, précisez : (1) le domaine (IA, RegTech, SupTech, blockchain), (2) l'application visée et (3) le niveau de maturité souhaité (veille, POC, prototype). Je vous proposerai une roadmap.`,
  },
};

export const agentResponses: Record<string, AgentResponseConfig> = S;

export function findAgentResponse(agentId: string, userInput: string): string {
  const config = agentResponses[agentId];
  if (!config) return 'Agent non trouvé. Veuillez sélectionner un agent valide.';

  const input = userInput.toLowerCase();

  for (const resp of config.responses) {
    const matchCount = resp.keywords.filter((kw) => input.includes(kw.toLowerCase())).length;
    if (matchCount >= 2) return resp.response;
    if (resp.keywords.length === 1 && matchCount === 1) return resp.response;
  }

  return config.fallback;
}





