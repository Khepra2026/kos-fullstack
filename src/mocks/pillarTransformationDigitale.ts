export const methodology = [
  { phase: 'Phase 1 — Diagnostic Digital', duration: '3-4 semaines', icon: 'ri-search-eye-line', items: ['Audit de la maturité digitale (processus, SI, compétences)', 'Analyse des coûts IT et du ROI actuel', 'Benchmark concurrentiel (banques, FinTechs)', 'Identification des quick wins et des irritants clients'] },
  { phase: 'Phase 2 — Stratégie Digitale', duration: '4-6 semaines', icon: 'ri-compass-3-line', items: ['Vision digitale à 3-5 ans et objectifs SMART', 'Roadmap priorisée (Core Banking, Mobile, Data, API)', 'Business case détaillé avec ROI par initiative', 'Stratégie Make vs Buy (développer, acheter, partenaire)'] },
  { phase: 'Phase 3 — Choix Technologiques', duration: '4-8 semaines', icon: 'ri-cpu-line', items: ['Sélection du core banking system (RFI, RFP, POC)', 'Architecture cible : cloud, API-first, microservices', 'Choix des partenaires technologiques (FinTechs, éditeurs)', 'Plan de migration et de reprise d\'activité'] },
  { phase: 'Phase 4 — Agrément & Conformité', duration: '6-12 mois', icon: 'ri-file-check-line', items: ['Dossier d\'agrément établissement de paiement', 'Mise en conformité SI (BCEAO, données personnelles)', 'Tests de sécurité et pentests', 'Audit de certification'] },
  { phase: 'Phase 5 — Déploiement', duration: '12-24 mois', icon: 'ri-rocket-line', items: ['Déploiement progressif par pays/métier', 'Formation des équipes et conduite du changement', 'Migration des données et bascule', 'Hypercare post-go-live et optimisation continue'] }
];

export const caseStudyResults = [
  { value: '-55%', label: 'Coût par transaction' },
  { value: '3 jours', label: 'Lancement produit (vs 3 semaines)' },
  { value: '99,99%', label: 'Disponibilité système' },
  { value: '+120k', label: 'Clients digitaux en 12 mois' }
];

export const kpis = [
  { kpi: 'Digital Adoption', target: '> 60% clients', desc: 'Clients actifs sur les canaux digitaux', icon: 'ri-smartphone-line' },
  { kpi: 'Time-to-Market', target: '< 1 semaine', desc: 'Délai de lancement nouveau produit', icon: 'ri-rocket-line' },
  { kpi: 'Coût/Transaction', target: '-50% vs legacy', desc: 'Réduction du coût opérationnel', icon: 'ri-money-dollar-circle-line' },
  { kpi: 'Disponibilité', target: '> 99,95%', desc: 'Taux de disponibilité du core banking', icon: 'ri-cloud-line' },
  { kpi: 'API Coverage', target: '> 80% fonctions', desc: 'Fonctions exposées via API', icon: 'ri-link-m' },
  { kpi: 'ROI Digital', target: '> 200% sur 5 ans', desc: 'Retour sur investissement des projets digitaux', icon: 'ri-line-chart-line' }
];

export const faqItems = [
  { q: 'Comment obtenir un agrément établissement de paiement UEMOA ?', a: 'Instruction BCEAO 08-2015 : (1) Société avec capital 250M FCFA, (2) Dossier agrément, (3) Enquête moralité BCEAO, (4) Audit SI et sécurité, (5) Agrément (6-12 mois), (6) Conformité continue.' },
  { q: 'Bénéfices du core banking moderne ?', a: 'Réduction 40-60% coût/transaction, time-to-market réduit, architecture API-first, conformité automatisée, disponibilité 99,99%, expérience omnicanale.' },
  { q: 'Comment intégrer le mobile money ?', a: '4 axes : partenariat opérateurs, interopérabilité GIM-UEMOA, produits hybrides, KYC digitale. Marché UEMOA : 40 Mds USD/an.' }
];

export const breadcrumbItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Transformation Digitale Afrique' }
];

export const relatedPillars = [
  { url: '/pillar/cybersecurite-afrique', icon: 'ri-lock-password-line', title: 'Cybersécurité', desc: 'PCA/PRA, résilience, protection des données' },
  { url: '/pillar/pme-afrique-croissance', icon: 'ri-store-2-line', title: 'PME Afrique', desc: 'Digitalisation, financement, croissance' },
  { url: '/pillar/finance-performance-afrique', icon: 'ri-funds-line', title: 'Finance & Performance', desc: 'Business plan, levée de fonds, due diligence' }
];

export const SITE_URL = 'https://khepraexperts.com';
export const OG_IMAGE = 'https://readdy.ai/api/search-image?query=Digital%20transformation%20in%20an%20African%20financial%20institution%2C%20modern%20open%20office%20with%20laptops%20and%20screens%20showing%20data%20dashboards%2C%20teal%20and%20charcoal%20color%20tones%2C%20clean%20tech%20aesthetic%2C%20editorial%20photography%20style%2C%20diverse%20African%20team&width=1200&height=630&seq=transfo-digitale-pillar-og&orientation=landscape';