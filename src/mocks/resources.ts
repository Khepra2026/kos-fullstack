type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  downloads?: number;
  downloadUrl?: string;
  coverImage?: string;
  type?: string;
  chapters: string[];
}

export const resources: Resource[] = [
  {
    id: 'guide-gouvernance-pme',
    title: 'Gouvernance PME OHADA : Les 8 Points de Contrôle qui Bloquent 60% des Dossiers de Financement — le Guide pour Tous les Valider en 90 Jours',
    description: 'Guide institutionnel pour mettre en place une gouvernance conforme à l\'Acte Uniforme OHADA sur les Sociétés Commerciales (AUSC révisé 2014) : conseil d\'administration, commissariat aux comptes, contrôle interne et conformité SYSCOHADA. Applicable dans les 17 États membres de l\'OHADA (UEMOA + CEMAC).',
    category: 'Gouvernance',
    downloads: 1247,
    coverImage: 'https://readdy.ai/api/search-image?query=Professional%20business%20governance%20meeting%20with%20diverse%20African%20executives%20around%20modern%20conference%20table%2C%20clean%20minimalist%20office%20interior%20with%20natural%20light%2C%20documents%20and%20laptops%2C%20corporate%20professional%20atmosphere%2C%20deloitte%20green%20accents%20on%20dark%20charcoal%20background%2C%20high%20quality%20business%20photography&width=800&height=600&seq=res1-green&orientation=landscape',
    chapters: [
      'Cadre juridique OHADA — AUSC révisé 2014',
      'Structurer votre conseil d\'administration (obligations AUSC)',
      'Commissariat aux comptes — seuils et obligations OHADA',
      'Contrôle interne et séparation des tâches',
      'Conformité SYSCOHADA — états financiers et reporting',
      'Conventions réglementées et conflits d\'intérêts (AUSC)',
      'Plan d\'action en 90 jours — mise en conformité OHADA',
    ]
  },
  {
    id: 'checklist-conformite-sfd',
    title: 'Checklist Conformité SFD/EMF : 127 Exigences BCEAO/COBAC — Celle qui a Permis à 94% des Institutions de Réussir leur Audit du Premier Coup',
    description: 'Liste de contrôle exhaustive pour assurer la conformité réglementaire de votre SFD (UEMOA) ou EMF (CEMAC) : ratios prudentiels BCEAO/COBAC, dispositif LBC/FT, gouvernance et contrôle interne. Référence : Loi uniforme SFD UEMOA, Règlement COBAC EMF-2017.',
    category: 'Finance',
    downloads: 892,
    coverImage: 'https://readdy.ai/api/search-image?query=Financial%20compliance%20checklist%20document%20on%20modern%20desk%20with%20calculator%20and%20pen%2C%20African%20banking%20regulatory%20papers%2C%20organized%20workspace%2C%20professional%20financial%20setting%2C%20dark%20charcoal%20and%20green%20professional%20background%2C%20top%20view%20flat%20lay%20photography&width=800&height=600&seq=res2-green&orientation=landscape',
    chapters: [
      'Cadre réglementaire BCEAO / UEMOA — Loi uniforme SFD',
      'Cadre réglementaire COBAC / CEMAC — Règlement EMF-2017',
      'Ratios prudentiels obligatoires (solvabilité, liquidité, transformation)',
      'Dispositif LBC/FT — Directive UEMOA n°02/2015 et Règlement CEMAC n°01/03',
      'Gouvernance et contrôle interne SFD/EMF',
      'Checklist opérationnelle complète UEMOA / CEMAC',
      'Calendrier de mise en conformité et sanctions',
    ]
  },
  {
    id: 'guide-levee-fonds-afrique',
    title: 'Levée de Fonds Afrique : Le Guide qui a Aide à Lever 120M+ FCFA — 89 Critères pour Convaincre les Investisseurs Institutionnels en 1 Seul Rendez-Vous',
    description: 'Stratégies et meilleures pratiques pour réussir votre levée de fonds en Afrique francophone : cadre OHADA (AUSC, SAS), marchés financiers BRVM/AMF-UEMOA (UEMOA) et DSX/COSUMAF (CEMAC), modélisation financière SYSCOHADA, data room et due diligence.',
    category: 'Entrepreneuriat',
    downloads: 1534,
    coverImage: 'https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20business%20pitch%20to%20investors%20in%20professional%20setting%20with%20presentation%20screen%2C%20professional%20business%20meeting%2C%20diverse%20team%2C%20deloitte%20green%20and%20dark%20charcoal%20contemporary%20space%2C%20inspiring%20entrepreneurial%20atmosphere&width=800&height=600&seq=res3-green&orientation=landscape',
    chapters: [
      'Panorama des investisseurs en Afrique (I&P, Cauris, BOAD, BAD, SFI)',
      'Cadre juridique OHADA — SAS, augmentation de capital, pactes d\'actionnaires',
      'Marchés financiers UEMOA (BRVM/AMF-UEMOA) et CEMAC (DSX/COSUMAF)',
      'Préparer son dossier — data room et états financiers SYSCOHADA',
      'Modélisation financière — DSCR, BFR, scénarios',
      'Mécanismes de garantie — FAGACE, GARI (UEMOA) / FOGADAC (CEMAC)',
      'Clôturer et gérer la relation investisseur',
    ]
  },
  {
    id: 'transformation-digitale-pme',
    title: 'Transformation Digitale PME : Comment 5 Banques UEMOA Ont Réduit leurs Coûts Opérationnels de 23% — Feuille de Route Conforme BCEAO/COBAC',
    description: 'Feuille de route pratique pour digitaliser la finance de votre PME africaine : ERP conforme SYSCOHADA, module ALM pour IMF/SFD/EMF, conformité réglementaire BCEAO (UEMOA) et COBAC (CEMAC), ROI hiérarchisé et cas pratiques.',
    category: 'Transformation digitale',
    downloads: 1089,
    coverImage: 'https://readdy.ai/api/search-image?query=Modern%20digital%20transformation%20concept%20with%20African%20business%20professional%20using%20tablet%20and%20cloud%20technology%2C%20futuristic%20office%20environment%2C%20digital%20interface%20elements%2C%20dark%20green%20and%20black%20tech%20aesthetic%2C%20deloitte%20green%20accent%20highlights%2C%20bright%20innovative%20workspace&width=800&height=600&seq=res4-green&orientation=landscape',
    chapters: [
      'Diagnostic de maturité digitale financière',
      'Cadre réglementaire SI — BCEAO (UEMOA) et COBAC (CEMAC)',
      'ERP et plan comptable SYSCOHADA — configuration et déploiement',
      'Module ALM pour IMF/SFD/EMF — exigences BCEAO et COBAC',
      'Feuille de route en 3 phases — ROI hiérarchisé',
      'Gestion du changement et formation',
      'Mesurer le ROI de la transformation digitale financière',
    ]
  },
  {
    id: 'audit-financier-checklist',
    title: 'Audit Financier SYSCOHADA : Les 47 Points de Contrôle que Votre Commissaire aux Comptes Vérifiera — Anticipez-les Avant Lui',
    description: 'Guide méthodologique pour préparer et réussir votre audit financier conforme au SYSCOHADA Révisé 2017 (OHADA) et aux exigences des régulateurs BCEAO (UEMOA) et COBAC (CEMAC) : documents requis, points de contrôle, provisionnement et communication avec les auditeurs.',
    category: 'Finance',
    downloads: 756,
    coverImage: 'https://readdy.ai/api/search-image?query=Financial%20audit%20preparation%20with%20organized%20documents%20folders%20and%20financial%20statements%2C%20professional%20accounting%20workspace%2C%20calculator%20and%20reports%2C%20clean%20organized%20desk%2C%20dark%20green%20and%20charcoal%20professional%20background%2C%20business%20photography&width=800&height=600&seq=res5-green&orientation=landscape',
    chapters: [
      'Référentiel SYSCOHADA Révisé 2017 — états financiers obligatoires',
      'Documents comptables et financiers requis (bilan, CR, TFT, annexes)',
      'Points de contrôle prioritaires — provisionnement NPL, BFR, ratios',
      'Exigences BCEAO (UEMOA) et COBAC (CEMAC) pour les institutions financières',
      'Calendrier type d\'un audit SYSCOHADA',
      'Communication avec les auditeurs et commissaires aux comptes',
      'Traitement des recommandations et plan de mise en conformité',
    ]
  },
  {
    id: 'guide-business-plan-afrique',
    title: 'Business Plan Afrique : Le Modèle 17 Chapitres qui a Convaincu la BIDC, la BAD et l\'IFC — DSCR 2,41x, TRI 17,2%',
    description: 'Modèle complet de business plan adapté au marché africain : cadre OHADA, projections financières SYSCOHADA, analyse de marché sectorielle, modélisation du BFR et du DSCR, accès aux mécanismes de garantie UEMOA et CEMAC.',
    category: 'Entrepreneuriat',
    downloads: 1621,
    coverImage: 'https://readdy.ai/api/search-image?query=African%20entrepreneur%20working%20on%20business%20plan%20with%20laptop%20and%20documents%2C%20modern%20coworking%20space%2C%20strategic%20planning%20charts%20and%20graphs%2C%20professional%20startup%20environment%2C%20deloitte%20green%20and%20dark%20charcoal%20motivational%20setting%2C%20clean%20contemporary%20workspace&width=800&height=600&seq=res6-green&orientation=landscape',
    chapters: [
      'Structure complète d\'un business plan conforme OHADA',
      'Analyse de marché en contexte africain (UEMOA / CEMAC)',
      'Modèle économique et proposition de valeur',
      'Projections financières SYSCOHADA sur 3 ans (BFR, DSCR, TFT)',
      'Stratégie de mise sur le marché',
      'Mécanismes de garantie — FAGACE, GARI (UEMOA) / FOGADAC (CEMAC)',
      'Annexes et documents complémentaires (data room)',
    ]
  },
  {
    id: 'guide-analyse-risque-credit',
    title: 'Analyse Crédit : Les 8 Signaux d\'Alerte qui Annoncent un Impayé 6 Mois Avant — Guide de Scoring Conforme BCEAO/COBAC',
    description: 'Méthodologie complète pour évaluer le risque d\'un dossier de crédit conforme aux classifications BCEAO (Instruction n°94-05) et COBAC (Règlement R-93/13) : analyse financière SYSCOHADA, capacité de remboursement, DSCR, garanties, scoring et décision d\'octroi.',
    category: 'Finance',
    downloads: 438,
    coverImage: 'https://readdy.ai/api/search-image?query=Professional%20credit%20risk%20analysis%20with%20African%20bank%20officer%20reviewing%20loan%20application%20documents%2C%20financial%20statements%20spread%20on%20clean%20modern%20desk%2C%20calculator%20and%20risk%20assessment%20forms%2C%20organized%20professional%20banking%20environment%2C%20deloitte%20green%20accent%20lighting%2C%20focused%20analytical%20atmosphere%2C%20high%20quality%20business%20photography&width=800&height=600&seq=res7-green&orientation=landscape',
    chapters: [
      'Cadre réglementaire — Classification BCEAO (Instruction n°94-05) et COBAC (Règlement R-93/13)',
      'Collecte et vérification des pièces du dossier (SYSCOHADA)',
      'Analyse de la capacité financière de l\'emprunteur',
      'Évaluation de la capacité de remboursement (DSCR)',
      'Analyse des garanties et sûretés (Acte Uniforme OHADA sur les sûretés)',
      'Méthodes de scoring et notation interne',
      'Signaux d\'alerte et red flags',
      'Rédaction de la note de crédit et décision d\'octroi',
    ]
  },
  {
    id: 'guide-impayes-recouvrement',
    title: 'Impayés & Recouvrement : Comment Réduire vos NPL de 34% en 6 Mois — Le Guide Complet AUVE OHADA et BCEAO/COBAC',
    description: 'Stratégies et outils pratiques pour prévenir les impayés et optimiser le recouvrement dans le cadre de l\'Acte Uniforme OHADA sur les voies d\'exécution (AUVE) et des exigences de provisionnement BCEAO (UEMOA) et COBAC (CEMAC).',
    category: 'Finance',
    downloads: 312,
    coverImage: 'https://readdy.ai/api/search-image?query=African%20financial%20professional%20reviewing%20overdue%20accounts%20and%20debt%20recovery%20documents%20at%20modern%20office%20desk%2C%20organized%20folders%20with%20payment%20records%20and%20collection%20notices%2C%20professional%20banking%20environment%20with%20calculator%20and%20laptop%2C%20deloitte%20green%20accent%20lighting%2C%20dark%20charcoal%20background%2C%20serious%20analytical%20atmosphere&width=800&height=600&seq=res8-green&orientation=landscape',
    chapters: [
      'Cadre réglementaire — AUVE OHADA et exigences BCEAO/COBAC',
      'Comprendre et prévenir les impayés',
      'Détection précoce et signaux d\'alerte',
      'Procédures de recouvrement amiable',
      'Négociation et restructuration de créances',
      'Recouvrement judiciaire — voies d\'exécution OHADA (AUVE)',
      'Provisionnement et gestion comptable SYSCOHADA des créances douteuses',
      'Indicateurs de performance du recouvrement (KPIs)',
    ]
  },
  {
    id: 'guide-lcb-ft-uemoa',
    title: 'LBC/FT SFD/EMF : Le Guide qui Vous Évite une Sanction de 500M FCFA — Conformité Complète aux 40 Recommandations GAFI en 90 Jours',
    description: 'Cadre complet de conformité LBC/FT pour les SFD (UEMOA) et EMF (CEMAC) : Directive UEMOA n°02/2015, Règlement CEMAC n°01/03, GIABA/GABAC, KYC, CENTIF/ANIF, gel des avoirs et reporting réglementaire BCEAO/COBAC.',
    category: 'Finance',
    downloads: 284,
    coverImage: 'https://readdy.ai/api/search-image?query=African%20compliance%20officer%20reviewing%20anti-money%20laundering%20documents%20and%20regulatory%20files%20at%20a%20modern%20banking%20office%20desk%2C%20organized%20binders%20with%20AML%20CFT%20compliance%20reports%2C%20professional%20financial%20institution%20environment%2C%20serious%20focused%20atmosphere%2C%20dark%20green%20and%20black%20tones%2C%20high%20quality%20corporate%20photography%2C%20professional%20office%20lighting&width=800&height=600&seq=res9-green&orientation=landscape',
    chapters: [
      'Cadre réglementaire LBC/FT — Directive UEMOA n°02/2015 et Règlement CEMAC n°01/03',
      'Organismes régionaux — GIABA (UEMOA) et GABAC (CEMAC)',
      'Évaluation des risques de blanchiment (approche basée sur les risques)',
      'Dispositif KYC — Identification et vérification des clients',
      'Surveillance des transactions et détection des opérations suspectes',
      'Déclarations de soupçon — CENTIF (UEMOA) et ANIF (CEMAC)',
      'Gel des avoirs et listes de sanctions internationales',
      'Audit interne LBC/FT et reporting BCEAO/COBAC',
    ]
  },
  {
    id: 'guide-mobile-money-uemoa',
    title: 'Mobile Money & Paiements Numériques : Comment Naviguer les 5 Régimes Réglementaires UEMOA/CEMAC Sans Perdre Votre Agrément d\'Émetteur',
    description: 'Cadre réglementaire complet du mobile money et des paiements numériques : Instruction BCEAO n°008-05-2015 (UEMOA), Règlement BEAC (CEMAC), interopérabilité STAR-UEMOA / SYSTAC-SYGMA, protection des utilisateurs et LBC/FT.',
    category: 'Finance',
    downloads: 198,
    coverImage: 'https://readdy.ai/api/search-image?query=African%20mobile%20money%20payment%20transaction%20on%20smartphone%20with%20digital%20wallet%20interface%2C%20modern%20fintech%20environment%20in%20West%20Africa%2C%20person%20using%20mobile%20banking%20app%20with%20digital%20payment%20icons%20floating%20around%2C%20clean%20bright%20contemporary%20office%20background%2C%20professional%20financial%20technology%20atmosphere%2C%20deloitte%20green%20and%20dark%20black%20tones%2C%20high%20quality%20photography&width=800&height=600&seq=res10-green&orientation=landscape',
    chapters: [
      'Cadre réglementaire BCEAO — Instruction n°008-05-2015 (UEMOA)',
      'Cadre réglementaire BEAC — Règlement sur la monnaie électronique (CEMAC)',
      'Agrément EME (UEMOA) et conditions d\'exercice',
      'Interopérabilité — Système STAR-UEMOA (BCEAO) et SYSTAC/SYGMA (BEAC)',
      'Protection des utilisateurs et gestion des fonds de la clientèle',
      'Obligations LBC/FT spécifiques au mobile money',
      'Supervision et reporting réglementaire BCEAO/COBAC',
      'Perspectives — open banking et finance digitale en zones UEMOA/CEMAC',
    ]
  },
  {
    id: 'guide-okr-methode',
    title: 'OKR : Pourquoi 70% des Déploiements Échouent en Afrique — et Comment Faire Partie des 30% qui Multiplient leur Productivité par 2,4',
    description: 'Maîtrisez la méthode OKR (Objectives & Key Results) pour aligner vos équipes et piloter la performance stratégique avec agilité.',
    category: 'Gouvernance',
    type: 'guide',
    downloads: 0,
    coverImage: 'https://readdy.ai/api/search-image?query=modern%20business%20team%20collaborating%20around%20digital%20dashboard%20displaying%20objectives%20and%20key%20results%20metrics%20in%20bright%20contemporary%20office%20with%20glass%20walls%20and%20natural%20light%20professional%20corporate%20atmosphere%20clean%20minimalist%20design%20focus%20on%20goal%20alignment%20and%20performance%20tracking%20deloitte%20green%20and%20dark%20charcoal%20tones%20high%20tech%20environment&width=800&height=600&seq=okr001-green&orientation=landscape',
    chapters: [
      'Principes et histoire des OKR',
      'Différences OKR vs KPI vs MBO',
      'Structurer ses Objectives et Key Results',
      'Déploiement en cascade (entreprise → équipe → individu)',
      'Cycles OKR trimestriels',
      'Check-ins et revues hebdomadaires',
      'Scoring et évaluation des OKR',
      'Pièges à éviter et facteurs de succès'
    ]
  },
  {
    id: 'guide-kpi-indicateurs',
    title: 'KPI : Les 12 Indicateurs que Votre Conseil d\'Administration Devrait Exiger — Guide de Construction d\'un Tableau de Bord Décisionnel',
    description: 'Construisez un système de pilotage efficace avec les bons indicateurs de performance pour chaque dimension de votre organisation.',
    category: 'Gouvernance',
    type: 'guide',
    downloads: 0,
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20business%20analytics%20dashboard%20with%20deloitte%20green%20charts%20graphs%20and%20key%20performance%20indicators%20displayed%20on%20large%20screens%20in%20modern%20corporate%20office%20data%20visualization%20metrics%20tracking%20clean%20contemporary%20design%20dark%20charcoal%20and%20green%20lighting%20focus%20on%20financial%20operational%20and%20strategic%20KPIs%20professional%20atmosphere&width=800&height=600&seq=kpi001-green&orientation=landscape',
    chapters: [
      'Définition et typologies des KPIs',
      'KPIs financiers',
      'KPIs opérationnels',
      'KPIs RH et sociaux',
      'KPIs commerciaux et marketing',
      'Construction d\'un tableau de bord',
      'Suivi et analyse des écarts',
      'Culture de la mesure et amélioration continue'
    ]
  },
  {
    id: 'guide-gestion-performance',
    title: 'Gestion de la Performance : Le Système qui a Multiplié par 2,4 la Productivité des Équipes — Guide Complet du Cycle Annuel',
    description: 'Déployez un système complet de gestion de la performance individuelle et collective pour développer vos talents et atteindre vos objectifs.',
    category: 'Gouvernance',
    type: 'guide',
    downloads: 0,
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20performance%20review%20meeting%20between%20manager%20and%20employee%20in%20modern%20office%20discussing%20goals%20and%20development%20plans%20with%20laptop%20and%20documents%20on%20table%20deloitte%20green%20accent%20lighting%20collaborative%20atmosphere%20focus%20on%20talent%20development%20and%20objective%20setting%20contemporary%20corporate%20environment&width=800&height=600&seq=perf001-green&orientation=landscape',
    chapters: [
      'Fondements de la gestion de la performance',
      'Cycle de performance annuel',
      'Fixation des objectifs SMART',
      'Entretiens d\'évaluation',
      'Gestion des hauts potentiels',
      'Plans de développement individuel',
      'Lien performance-rémunération',
      'Tableau de bord RH et reporting'
    ]
  },
  {
    id: 'guide-audit-social',
    title: 'Audit Social : Les 8 Non-Conformités qui Coûtent 15% de la Masse Salariale en Redressements — le Guide pour Toutes les Éviter',
    description: 'Évaluez la conformité et l\'efficacité de votre fonction RH avec une méthodologie d\'audit social complète adaptée au contexte OHADA.',
    category: 'Gouvernance',
    type: 'guide',
    downloads: 0,
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20HR%20audit%20scene%20with%20auditor%20reviewing%20employee%20files%20and%20social%20compliance%20documents%20in%20modern%20office%20setting%20organized%20workspace%20with%20folders%20laptop%20and%20legal%20documentation%20deloitte%20green%20professional%20atmosphere%20focus%20on%20labor%20law%20compliance%20and%20social%20indicators%20contemporary%20corporate%20design&width=800&height=600&seq=audit-social001-green&orientation=landscape',
    chapters: [
      'Cadre légal et réglementaire RH',
      'Audit de la paie et des charges sociales',
      'Conformité contrats de travail',
      'Gestion des congés et absences',
      'Hygiène, sécurité et conditions de travail',
      'Relations sociales et dialogue social',
      'Indicateurs sociaux clés',
      'Rapport d\'audit social et plan d\'action'
    ]
  },
  {
    id: 'guide-audit-organisation',
    title: 'Audit Organisationnel : Comment Identifier les 12% de Surcharge qui Plombent votre Efficacité Opérationnelle — Méthodologie Complète',
    description: 'Diagnostiquez et optimisez votre structure organisationnelle avec une méthodologie d\'audit complète pour améliorer l\'efficacité opérationnelle.',
    category: 'Gouvernance',
    type: 'guide',
    downloads: 0,
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20organizational%20audit%20concept%20with%20business%20consultants%20analyzing%20company%20structure%20charts%20and%20process%20flows%20on%20whiteboard%20in%20modern%20meeting%20room%20strategic%20planning%20session%20deloitte%20green%20and%20dark%20charcoal%20contemporary%20office%20focus%20on%20organizational%20design%20and%20efficiency%20optimization%20collaborative%20atmosphere&width=800&height=600&seq=audit-org001-green&orientation=landscape',
    chapters: [
      'Diagnostic structurel',
      'Cartographie des processus',
      'Analyse des rôles et responsabilités',
      'Évaluation de la gouvernance',
      'Identification des dysfonctionnements',
      'Benchmarking organisationnel',
      'Recommandations et plan de réorganisation',
      'Suivi de la mise en œuvre'
    ]
  }
];
