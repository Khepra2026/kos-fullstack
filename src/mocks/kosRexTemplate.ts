export const kosRexTemplateData = {
  version: "1.0",
  titre: "Template REX KHEPRA — Retour d'Expérience Standard Big Four",
  baseline: "À remplir sous 5 jours après clôture mission. Stockage : KOS > Module REX Anonymisés",
  dateGeneration: "2026-07-03",

  rex: {
    id: "CM-EMF-024",
    methodeKhepra: "KHEPRA LICENSE™",
    secteurSASB: "FN-CB Commercial Banks",
    paysISO: "CM - Cameroun",
    dureeMission: "J0 à J240 = 8 mois calendaires",
    niveauConfidentialite: "Interne",
    validePar: "Partner OHADA + Comité Technique",

    contexteClient: {
      profil: "Promoteur privé souhaitant créer un Établissement de Microfinance (EMF) de catégorie 2 au Cameroun. Capital social prévu de 150 millions FCFA. Équipe fondatrice de 3 personnes : un promoteur (banquier senior, 15 ans d'expérience), un DAF (8 ans en PME, sans expérience AML/CFT), un responsable opérationnel (expérience terrain, sans connaissance réglementaire COBAC).",
      objectif: "Obtenir l'agrément COBAC en 1ère soumission, sans demande de clarification majeure, dans un délai inférieur au marché (12-18 mois). Éviter les 3 causes les plus fréquentes de rejet : statuts non conformes AUSCGIE, business plan irréaliste, équipe dirigeante non qualifiée.",
      complexiteInitiale: "4/5 — Complexité élevée. Trois facteurs critiques : (1) Statuts de SA classique non conformes à l'AUSCGIE pour un EMF — 3 clauses essentielles manquantes, (2) DAF sans certification AML/CFT ni expérience en conformité bancaire — risque de rejet COBAC sur le critère « honorabilité et compétence », (3) Core banking system non certifié COBAC — incapacité à générer les états prudentiels réglementaires (DEC, SURFI, LCB/FT).",
    },

    redFlags: [
      { categorie: "Gouvernance", description: "Statuts AUSCGIE non conformes — 3 clauses manquantes (transfert actions, préemption, exclusion garantie financière)", impact: "Rejet direct COBAC — Article 765 AUSCGIE. Délai de correction : 3-6 mois", coche: true },
      { categorie: "Financier", description: "BFR sous-estimé de 40% vs benchmark COBAC pour EMF Cat 2 — rotation créances modélisée à 45j au lieu de 90j réels", impact: "Risque liquidité J+90 post-ouverture. Insuffisance de fonds propres réglementaires", coche: true },
      { categorie: "RH", description: "RCCI (Responsable Conformité Contrôle Interne) sans certification AML/CFT agréée COBAC", impact: "Non-conformité Règlement COBAC R-2016/04 Art. 17. Blocage instruction dossier", coche: true },
      { categorie: "SI", description: "Core banking system ne génère pas les états prudentiels COBAC natifs (DEC, SURFI, LCB/FT)", impact: "Incapacité reporting BCEAO/COBAC. Non-conformité permanente post-agrément", coche: true },
    ],

    actionsKhepra: [
      {
        phase: "J0-J15 — Diagnostic",
        actions: "Gap analysis complet vs 127 exigences COBAC. Questionnaire 50 points. Scan IA des 10 documents clés DD™. Identification de 12 écarts dont 4 critiques (red flags).",
        livrables: "Rapport diagnostic 47 pages + Gap list priorisée + Plan d'action J+15 avec responsable et deadline par action.",
        delaiReel: "12 jours",
      },
      {
        phase: "J15-J75 — Structuration",
        actions: "Refonte complète du Business Plan 5 ans avec modélisation BFR obligatoire (rotation créances 90j, dettes 60j). Mandatement d'un avocat OHADA spécialisé pour refonte des statuts AUSCGIE avec les 3 clauses manquantes. Élaboration de la politique LBC/FT alignée GAFI 2024. Rédaction de l'organigramme cible avec séparation fonctions. Négociation avec un éditeur de core banking certifié COBAC.",
        livrables: "BP 5 ans validé avec stress test NPL 5% + Statuts AUSCGIE conformes v1.0 + Organigramme validé + Politique LBC/FT signée.",
        delaiReel: "58 jours",
      },
      {
        phase: "J75-J120 — Soumission",
        actions: "Constitution du dossier d'agrément complet (10 docs clés). Coaching intensif du promoteur et du DAF sur 5 séances de simulation d'entretien COBAC (20 questions types basées REX Khepra). Dépôt électronique + physique du dossier. Suivi hebdomadaire des demandes de clarification.",
        livrables: "Dossier agrément soumis + Q&A Pack (20 réponses pré-rédigées) + Attestation de dépôt COBAC.",
        delaiReel: "38 jours",
      },
      {
        phase: "J120-J240 — Post-agrément",
        actions: "Recrutement d'un RCCI certifié AML/CFT avec 5 ans d'expérience bancaire (process accéléré : 3 semaines). Paramétrage du core banking pour génération automatique des états prudentiels COBAC (4 semaines de paramétrage). Formation de l'équipe (3 modules e-learning : déontologie, LBC/FT, procédures internes). Vérification de la checklist ouverture 30 points.",
        livrables: "PV d'ouverture COBAC + Reporting J+30 conforme + Manuel de procédures complet + Attestations formation équipe.",
        delaiReel: "125 jours",
      },
    ],

    resultats: {
      agrement: "OUI — Obtenu en 8 mois (J0 à J240) vs 12-18 mois moyenne marché CEMAC",
      gainFinancier: "Évité 6 mois de délai supplémentaire = 45M FCFA de coûts fixes économisés (salaires, locaux, consultants). Coût total mission KHEPRA : 32M FCFA — ROI net de 13M FCFA pour le client.",
      redFlagsClotures: "4/4 red flags critiques levés avant soumission. Score maturité passé de 62% à 94% entre J0 et J75.",
      tauxSucces: "1ère soumission — 0 demande de clarification majeure. Alimente la statistique KHEPRA « Taux succès >90% en 1ère soumission ».",
      kpiSupplementaires: [
        { label: "Délai obtenu vs marché", valeur: "8 mois vs 14 mois médian", delta: "-43%" },
        { label: "Économie générée", valeur: "45M FCFA", delta: "+41% ROI" },
        { label: "Score maturité final", valeur: "94/100", delta: "+32 pts" },
        { label: "Demandes clarification", valeur: "3 mineures", delta: "0 majeures" },
      ],
    },

    leconsApprises: {
      ceQuiAMarche: [
        "Impliquer un avocat OHADA spécialisé dès J15 a permis de réduire le cycle de correction des statuts de 3 mois à 4 semaines. L'IA de diagnostic AUSCGIE a identifié les 3 clauses manquantes en 12 minutes vs 3 jours de revue manuelle.",
        "La modélisation du BFR avec des hypothèses réalistes (rotation créances 90j) a évité un rejet COBAC sur la viabilité financière. Le stress test NPL 5% a démontré la résilience du modèle même en scénario dégradé.",
        "Le coaching entretien COBAC avec simulateur IA (20 questions basées REX) a permis au promoteur d'anticiper 100% des questions posées lors de l'entretien réel.",
      ],
      pointsVigilance: [
        "Les core banking systems francophones (type Amplitude, Sopra Banking) ne génèrent PAS les états prudentiels COBAC en natif. Prévoir 4 semaines de paramétrage + 2 semaines de tests. Budget additionnel : 8-12M FCFA.",
        "Le recrutement d'un RCCI certifié AML/CFT en zone CEMAC prend 6-8 semaines en moyenne. Anticiper dès J+30 pour ne pas bloquer l'ouverture.",
        "La politique LBC/FT doit être alignée sur le GAFI 2024 (pas 2012). La version 2012 est systématiquement rejetée par la COBAC depuis Q1 2026.",
      ],
      recommandationsKOS: [
        "Ajouter une checklist « Core Banking COBAC » dans KHEPRA LICENSE™ Phase 2 (J15-J75) avec 5 critères : génération DEC, SURFI, LCB/FT, pistage audit, API régulateur.",
        "Créer un module « Certification AML/CFT Accelerator » — partenariat avec ACAMS/ICA pour former les RCCI en 4 semaines au lieu de 8.",
        "Mettre à jour le template de politique LBC/FT dans KHEPRA DD™ pour refléter les exigences GAFI 2024 (Recommendation 1, 10, 26 mises à jour).",
      ],
    },

    capitalisation: {
      majMethodo: "Ticket KOS-JIRA-0427 : Mettre à jour KHEPRA LICENSE™ v2.3 — Ajouter checklist CBS COBAC Phase 2 + Module Certification AML/CFT Accelerator Phase 3.",
      benchmark: "Ajout données anonymisées dans la base « Délai agrément EMF CEMAC » : CM-EMF-024 = 8 mois, capital 150M, Cat 2, 1ère soumission OK.",
      academy: "Créer module e-learning 5 minutes « Top 3 Erreurs Statuts AUSCGIE » — clauses transfert, préemption, exclusion garantie. Cible : promoteurs EMF + avocats OHADA.",
      assetReutilisable: [
        "Template Statuts AUSCGIE EMF v2026 (.docx) — avec les 8 clauses obligatoires COBAC pré-remplies.",
        "Template Business Plan EMF 5 ans avec BFR modélisé (.xlsx) — WACC prime pays 7%, stress test NPL intégré.",
        "Q&A Pack Entretien COBAC — 20 questions/réponses types basées REX 2024-2026 (.pdf).",
      ],
    },
  },

  reglesOrBigFour: [
    { regle: "Anonymisation", description: "Aucun nom, SIREN, montant exact. Utiliser des tranches : « Capital 100-200M FCFA », « Équipe de 3-5 personnes ».", icone: "ri-shield-user-line" },
    { regle: "Traçabilité", description: "Chaque affirmation réglementaire doit être sourcée : article COBAC, AUSCGIE, BCEAO, GAFI. Pas d'affirmation sans référence.", icone: "ri-link" },
    { regle: "Actionnable", description: "Un REX doit produire au minimum 1 amélioration concrète de la méthodologie OU 1 asset réutilisable créé.", icone: "ri-rocket-line" },
    { regle: "Revue Partner", description: "Validation Partner obligatoire avant toute publication Interne. Le REX « Public » nécessite validation Comité Technique + anonymisation double.", icone: "ri-check-double-line" },
  ],

  checklistBigFour: [
    { critere: "Anonymisation", statut: true, preuve: "Aucun nom, SIREN, ou montant exact divulgué. Tranches utilisées." },
    { critere: "Traçabilité L1", statut: true, preuve: "Articles COBAC, AUSCGIE, GAFI sourcés pour chaque red flag et action." },
    { critere: "Impact mesurable", statut: true, preuve: "KPI réglementaire, financier, risque — données chiffrées avec deltas." },
    { critere: "Leçons actionnables", statut: true, preuve: "3 recommandations concrètes avec tickets Jira/améliorations méthodo." },
    { critere: "Capitalisation", statut: true, preuve: "4 assets réutilisables créés + 1 module Academy + benchmark mis à jour." },
  ],

  navigationRetour: {
    label: "← Retour au cockpit Agrément OS",
    url: "/kos-agrement-os",
  },
};