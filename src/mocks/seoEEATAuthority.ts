export const eeatOverview = {
  eeatScore: 85,
  targetScore: 85,
  experienceScore: 82,
  expertiseScore: 88,
  authoritativenessScore: 85,
  trustworthinessScore: 82,
  totalBacklinks: 585,
  referringDomains: 78,
  brandMentionsMonthly: 215,
  externalCitations: 788,
  authorProfiles: 7,
  verifiedAuthors: 7,
  certificationsActive: 9,
  industryAwards: 4,
  trustBadges: 6,
  googleReviews: 4.8,
};

export const authorAuthority = [
  { id: 'AUT-01', name: 'Dr. Amadou KONE', role: 'Managing Partner', credentials: 'PhD Finance, Expert BCEAO/COBAC', publications: 28, citations: 156, linkedinFollowers: 4850, schemaMarkup: '✅ Person schema actif', googleKnowledgePanel: '✅ Actif', verified: true, score: 88 },
  { id: 'AUT-02', name: 'Fatoumata DIALLO', role: 'Director — Regulatory Compliance', credentials: 'Master Droit Bancaire, Certifiée GAFI', publications: 18, citations: 94, linkedinFollowers: 2180, schemaMarkup: '✅ Person schema actif', googleKnowledgePanel: '⚠️ En attente', verified: true, score: 82 },
  { id: 'AUT-03', name: 'Jean-Marc KOFFI', role: 'Director — Transfer Pricing', credentials: 'Expert BEPS OCDE, ACCA', publications: 15, citations: 72, linkedinFollowers: 1650, schemaMarkup: '✅ Person schema actif', googleKnowledgePanel: '❌ Non créé', verified: true, score: 75 },
  { id: 'AUT-04', name: 'Nafissatou SOW', role: 'Senior Manager — Risk Advisory', credentials: 'FRM, ISO 31000 Lead Auditor', publications: 12, citations: 48, linkedinFollowers: 980, schemaMarkup: '⚠️ Partiel (Article schema)', googleKnowledgePanel: '❌ Non créé', verified: false, score: 58 },
  { id: 'AUT-05', name: 'Ibrahim TOURE', role: 'Manager — ESG & Sustainability', credentials: 'Master Développement Durable, GRI Certified', publications: 8, citations: 22, linkedinFollowers: 620, schemaMarkup: '❌ Aucun', googleKnowledgePanel: '❌ Non créé', verified: false, score: 42 },
  { id: 'AUT-06', name: 'Pascal ZONGO', role: 'Senior Consultant — Data Analytics', credentials: 'MSc Data Science', publications: 5, citations: 12, linkedinFollowers: 340, schemaMarkup: '❌ Aucun', googleKnowledgePanel: '❌ Non créé', verified: false, score: 32 },
  { id: 'AUT-07', name: 'Dr. Simda Padagnassou', role: 'Directeur Recherche & Prospective — KHEPRA THINK TANK', credentials: 'PhD Finance Réglementaire, 3 Thèses Majeures (Coopétition Fintech, Risques Réglementaires, Big Tech & Souveraineté Numérique)', publications: 45, citations: 382, linkedinFollowers: 4200, schemaMarkup: '✅ Person + ScholarlyArticle + CiteAs', googleKnowledgePanel: '✅ Actif et vérifié — Wikidata Q123456789', verified: true, score: 95 },
];

export const brandMentions = [
  { id: 'MEN-01', source: 'Jeune Afrique', type: 'Article', title: '"Khepra Experts, le cabinet qui digitalise la conformité en Afrique"', date: '2026-05-15', sentiment: 'Très Positif', domainAuthority: 82, dofollow: false, anchorText: 'Khepra Experts', url: 'https://www.jeuneafrique.com/khepra-conformite' },
  { id: 'MEN-02', source: 'Ecofin', type: 'Citation', title: 'Rapport Conformité BCEAO 2026', date: '2026-04-28', sentiment: 'Positif', domainAuthority: 74, dofollow: true, anchorText: 'cabinet Khepra Experts', url: 'https://www.ecofinagency.com/khepra-bceao' },
  { id: 'MEN-03', source: 'Financial Afrik', type: 'Interview', title: '"Le futur du conseil réglementaire en zone UEMOA"', date: '2026-04-10', sentiment: 'Très Positif', domainAuthority: 68, dofollow: false, anchorText: 'Dr KONE, Managing Partner de Khepra', url: 'https://www.financialafrik.com/interview-kone' },
  { id: 'MEN-04', source: 'Forbes Afrique', type: 'Mention', title: 'Top 10 des cabinets conseil les plus innovants', date: '2026-03-22', sentiment: 'Très Positif', domainAuthority: 88, dofollow: true, anchorText: 'Khepra Experts', url: 'https://www.forbesafrique.com/top10-conseil-innovants' },
  { id: 'MEN-05', source: 'Banque Mondiale (Blog)', type: 'Citation', title: 'Rapport Doing Business — Volet Conformité UEMOA', date: '2026-03-05', sentiment: 'Positif', domainAuthority: 95, dofollow: true, anchorText: 'Khepra Experts', url: 'https://blogs.worldbank.org/khepra-bceao' },
  { id: 'MEN-06', source: 'LinkedIn (post viral)', type: 'Social', title: 'Post sur la nouvelle circulaire BCEAO — 48K vues', date: '2026-02-18', sentiment: 'Très Positif', domainAuthority: 98, dofollow: false, anchorText: '—', url: 'https://www.linkedin.com/feed/khepra-bceao' },
  { id: 'MEN-07', source: 'Africa CEO Forum', type: 'Événement', title: 'Keynote "Régulation et innovation en Afrique"', date: '2026-02-10', sentiment: 'Très Positif', domainAuthority: 76, dofollow: false, anchorText: 'Khepra Experts', url: 'https://www.africaceoforum.com/speakers/kone' },
  { id: 'MEN-08', source: 'OHADA.com', type: 'Article', title: 'Analyse de la réforme du droit des sociétés OHADA', date: '2026-01-20', sentiment: 'Positif', domainAuthority: 65, dofollow: true, anchorText: 'experts de Khepra', url: 'https://www.ohada.com/analyse-reforme-khepra' },
];

export const trustSignals = [
  { id: 'TRS-01', category: 'Certifications', name: 'ISO 20700 — Management Consultancy', status: 'Actif', expiry: '2028-06', verificationUrl: 'https://www.iso.org/certified/khepra-20700', impact: 'Élevé', description: 'Norme internationale pour les services de conseil en management' },
  { id: 'TRS-02', category: 'Certifications', name: 'ISO 31000 — Risk Management', status: 'En cours', expiry: '—', verificationUrl: '', impact: 'Élevé', description: 'Lead Auditor certifié — démarche certification en cours (cible Q1 2027)' },
  { id: 'TRS-03', category: 'Accréditations', name: 'Banque Mondiale — Vendor ID 428917', status: 'Actif', expiry: '2027-12', verificationUrl: 'https://www.worldbank.org/vendors/khepra', impact: 'Très Élevé', description: 'Accrédité comme fournisseur de services de conseil' },
  { id: 'TRS-04', category: 'Accréditations', name: 'BAD — Fournisseur Enregistré', status: 'Actif', expiry: '2027-06', verificationUrl: 'https://www.afdb.org/procurement/khepra', impact: 'Très Élevé', description: 'Enregistré pour services de conseil institutionnel' },
  { id: 'TRS-05', category: 'Partenariats', name: 'Grant Thornton — Alliance Stratégique Afrique', status: 'Actif', expiry: '2028-03', verificationUrl: '', impact: 'Élevé', description: 'Partenariat pour missions conjointes UEMOA/CEMAC' },
  { id: 'TRS-06', category: 'Prix', name: 'Africa Financial Industry Award 2025', status: 'Reçu', expiry: '—', verificationUrl: 'https://www.afiawards.com/winners/2025/khepra', impact: 'Élevé', description: 'Meilleur cabinet de conseil réglementaire — Afrique Francophone' },
  { id: 'TRS-07', category: 'Prix', name: 'Innovation Award — Africa Tech Summit 2025', status: 'Reçu', expiry: '—', verificationUrl: '', impact: 'Moyen', description: 'Solution RegTech la plus innovante — Diagnostic Conformité Auto' },
  { id: 'TRS-08', category: 'Publications', name: 'Baromètre Conformité BCEAO — 3ᵉ Édition Annuelle', status: 'Publié', expiry: '—', verificationUrl: '/barometre-bceao-2026', impact: 'Très Élevé', description: 'Publication annuelle de référence — citée par 12 institutions' },
  { id: 'TRS-09', category: 'Affiliations', name: 'Membre — Africa FinTech Network', status: 'Actif', expiry: '2027-01', verificationUrl: 'https://www.africafintechnetwork.com/members', impact: 'Moyen', description: 'Réseau panafricain des acteurs FinTech et régulation' },
  { id: 'TRS-10', category: 'Affiliations', name: 'Membre — Institut Africain de la Gouvernance (IAG)', status: 'Actif', expiry: '2027-09', verificationUrl: '', impact: 'Moyen', description: 'Think tank gouvernance d\'entreprise en Afrique' },
];

export const aboutOptimization = [
  { id: 'ABT-01', page: '/about', title: 'À Propos — Khepra Experts', currentScore: 72, targetScore: 92, gaps: 4, issues: ['Pas de Schema Organization sur la page', 'Photos équipe sans données structurées Person', 'Pas de mention des 22 ans d\'expérience dans le contenu visible', 'Pas de lien vers certifications/vérifications externes'], actions: 'Ajouter Organization schema + Person schemas pour équipe + section "Nos certifications" avec liens vérifiables' },
  { id: 'ABT-02', page: '/equipe', title: 'Notre Équipe', currentScore: 58, targetScore: 90, gaps: 5, issues: ['Pas de Person schema sur les profils individuels', 'Profils sans liens Linkedin/publications', 'Pas de photo professionnelle uniforme', 'Biographies sans dates/formations vérifiables', 'Aucun lien vers Google Knowledge Panel'], actions: 'Person schema sur chaque profil + liens Linkedin + uniformiser photos + ajouter formations certifiantes' },
  { id: 'ABT-03', page: '/expertises', title: 'Nos Expertises', currentScore: 65, targetScore: 88, gaps: 3, issues: ['Pas de données structurées Service/Product', 'Pas de citations études/cas clients vérifiables', 'Manque de liens vers publications externes des experts'], actions: 'Ajouter Service schemas + lier chaque expertise à des études de cas vérifiables' },
  { id: 'ABT-04', page: '/contact', title: 'Contact', currentScore: 82, targetScore: 92, gaps: 2, issues: ['Adresse physique manquante (NAP consistency)', 'Pas de LocalBusiness schema avec horaires'], actions: 'Ajouter LocalBusiness schema + adresse vérifiée + horaires + lien Google Maps' },
];

export const externalReviews = [
  { id: 'REV-01', platform: 'Google Business Profile', rating: 4.8, totalReviews: 42, latestReview: '"Excellente expertise réglementaire. Ont sauvé notre audit BCEAO. Je recommande vivement."', reviewer: 'CFO, Banque UEMOA', date: '2026-05-20', responseStatus: 'Répondu' },
  { id: 'REV-02', platform: 'Google Business Profile', rating: 5.0, totalReviews: 42, latestReview: '"Professionnalisme et rigueur remarquables. L\'équipe KONE est au niveau des Big Four."', reviewer: 'DG, FinTech Abidjan', date: '2026-05-08', responseStatus: 'Répondu' },
  { id: 'REV-03', platform: 'LinkedIn Recommendations', rating: 4.9, totalReviews: 28, latestReview: '"Dr KONE et son équipe ont transformé notre approche de la conformité. Un partenaire stratégique."', reviewer: 'Président CA, Groupe Bancaire', date: '2026-04-15', responseStatus: 'Répondu' },
  { id: 'REV-04', platform: 'LinkedIn Recommendations', rating: 4.7, totalReviews: 28, latestReview: '"J\'ai fait appel à Khepra pour notre due diligence ESG. Rapport impeccable, délais respectés."', reviewer: 'Directeur ESG, Multinationale Minière', date: '2026-04-02', responseStatus: 'Répondu' },
  { id: 'REV-05', platform: 'Clutch.co', rating: 4.6, totalReviews: 12, latestReview: '"Top regulatory consulting firm in Francophone Africa. Deep BCEAO expertise."', reviewer: 'CEO, International FinTech', date: '2026-03-18', responseStatus: 'Non répondu' },
  { id: 'REV-06', platform: 'Clutch.co', rating: 5.0, totalReviews: 12, latestReview: '"Outstanding transfer pricing documentation. Saved us millions in penalties."', reviewer: 'CFO, Groupe Agro-Industriel', date: '2026-02-28', responseStatus: 'Non répondu' },
];

export const quickWinsEEAT = [
  { id: 'QW-EEAT-01', action: 'Déployer Person schema + Organization schema sur TOUTES les pages auteur et À Propos', type: 'Schema', impact: 'Critique', effort: '4h', expectedImpact: '+15 pts score EEAT', detail: '4/6 auteurs sans Person schema, Organization schema manquant sur /about' },
  { id: 'QW-EEAT-02', action: 'Créer les Google Knowledge Panels pour les 4 auteurs manquants', type: 'Knowledge Graph', impact: 'Critique', effort: '8h', expectedImpact: '+12 pts score Author Authority', detail: 'Soumettre les profils à Google Knowledge Graph via Wikidata + Wikipedia' },
  { id: 'QW-EEAT-03', action: 'Répondre aux 2 avis Clutch non répondus + solliciter 6 nouveaux avis', type: 'Reviews', impact: 'Haute', effort: '3h', expectedImpact: '+8 pts score Trust', detail: '12 avis Clutch actuels → objectif 18, toutes les réponses doivent être personnalisées' },
  { id: 'QW-EEAT-04', action: 'Ajouter des liens vérifiables vers les certifications sur /about et footer', type: 'Trust Signals', impact: 'Haute', effort: '2h', expectedImpact: '+6 pts score Trustworthiness', detail: 'Liens ISO 20700, Banque Mondiale Vendor ID, BAD Enregistré sur les pages clés' },
  { id: 'QW-EEAT-05', action: 'Uniformiser les photos professionnelles de l\'équipe (même fond, même cadrage)', type: 'Branding', impact: 'Haute', effort: '5h', expectedImpact: '+4 pts score Experience', detail: 'Actuellement 4 styles de photos différents — besoin d\'uniformité visuelle' },
  { id: 'QW-EEAT-06', action: 'Créer page /certifications avec toutes les certifications, accréditations et prix vérifiables', type: 'Trust Page', impact: 'Moyenne', effort: '6h', expectedImpact: '+5 pts score Trust', detail: 'Page dédiée listant toutes les accréditations avec liens de vérification' },
  { id: 'QW-EEAT-07', action: 'Ajouter des citations d\'experts avec Schema ClaimReview sur les pages service clés', type: 'Schema', impact: 'Moyenne', effort: '3h', expectedImpact: '+3 pts score Expertise', detail: 'Schema ClaimReview sur les affirmations chiffrées (ex: "22 ans d\'expérience")' },
  { id: 'QW-EEAT-08', action: 'Publier 4 articles invités sur sites à haute autorité (DA>70)', type: 'Backlinks', impact: 'Moyenne', effort: '12h', expectedImpact: '+10 backlinks haute autorité', detail: 'Cibler Jeune Afrique, The Africa Report, Ecofin, Financial Afrik pour articles invités' },
  { id: 'QW-EEAT-09', action: 'Déployer ScholarlyArticle Schema sur les 3 papiers fondateurs du Dr. Simda avec DOI, citations, CiteAs', type: 'Schema', impact: 'Critique', effort: '3h', expectedImpact: '+8 pts score EEAT, Google Scholar indexing', detail: 'ScholarlyArticle + Person + CiteAs sur les 3 publications Think Tank Simda' },
  { id: 'QW-EEAT-10', action: 'Créer les 3 observatoires Simda comme aimants à backlinks institutionnels', type: 'Linkable Assets', impact: 'Critique', effort: '8h', expectedImpact: '+80 backlinks qualifiés, +10 Domain Authority', detail: 'Observatoire Coopétition Fintech, Baromètre Risques Réglementaires, Indice Souveraineté Numérique' },
  { id: 'QW-EEAT-11', action: 'Soumettre les 3 papiers Simda à Google Scholar, ResearchGate, HAL, SSRN', type: 'Academic SEO', impact: 'Haute', effort: '6h', expectedImpact: '+135 citations académiques, +12 pts Domain Authority', detail: 'Référencement académique multicanal pour maximiser les citations et l\'autorité scientifique' },
  { id: 'QW-EEAT-12', action: 'Créer Wikidata Q-item pour le Dr. Simda Padagnassou avec affiliations, publications, identifiants', type: 'Knowledge Graph', impact: 'Critique', effort: '4h', expectedImpact: 'Google Knowledge Panel 100% vérifié, +5 pts EEAT', detail: 'Wikidata item complet : VIAF, ORCID, Google Scholar ID, affiliations KHEPRA' },
];