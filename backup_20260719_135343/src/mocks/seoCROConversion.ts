export const croOverview = {
  totalConversionRate: 2.8,
  targetConversionRate: 5.0,
  bounceRate: 58.4,
  avgSessionDuration: '3:24',
  pagesPerSession: 2.4,
  goalCompletionsMonthly: 94,
  revenuePerSession: '1 247 FCFA',
  totalSessionsMonthly: 12580,
  conversionGap: 2.2,
  topLandingPageConversion: 4.2,
  bottomLandingPageConversion: 0.7,
  ctaClickRate: 3.1,
  formCompletionRate: 62,
};

export const landingPagePerformance = [
  { id: 'LP-01', url: '/services/audit-pre-inspection-bceao', title: 'Audit Pré-Inspection BCEAO', sessions: 1840, bounceRate: 52, conversionRate: 4.2, avgTimeOnPage: '4:12', scrollDepth: 68, ctaClicks: 77, goalCompletions: 16 },
  { id: 'LP-02', url: '/services/prix-transfert', title: 'Prix de Transfert — BEPS Action 13', sessions: 1420, bounceRate: 55, conversionRate: 3.8, avgTimeOnPage: '3:45', scrollDepth: 62, ctaClicks: 54, goalCompletions: 12 },
  { id: 'LP-03', url: '/services/conformite-lbft', title: 'Conformité LBC/FT — GAFI & GIABA', sessions: 1280, bounceRate: 58, conversionRate: 3.1, avgTimeOnPage: '3:18', scrollDepth: 55, ctaClicks: 40, goalCompletions: 9 },
  { id: 'LP-04', url: '/blog/gouvernance-bancaire-uemoa', title: 'Gouvernance Bancaire UEMOA — Guide Complet', sessions: 2150, bounceRate: 62, conversionRate: 1.8, avgTimeOnPage: '4:28', scrollDepth: 72, ctaClicks: 39, goalCompletions: 8 },
  { id: 'LP-05', url: '/services/gouvernance-risques', title: 'Gouvernance & Gestion des Risques', sessions: 980, bounceRate: 54, conversionRate: 3.4, avgTimeOnPage: '3:52', scrollDepth: 60, ctaClicks: 33, goalCompletions: 7 },
  { id: 'LP-06', url: '/services/regtech', title: 'RegTech — Ingénierie Réglementaire', sessions: 870, bounceRate: 56, conversionRate: 2.9, avgTimeOnPage: '3:05', scrollDepth: 51, ctaClicks: 25, goalCompletions: 6 },
  { id: 'LP-07', url: '/diagnostic-flash', title: 'Diagnostic Flash Conformité', sessions: 760, bounceRate: 38, conversionRate: 6.8, avgTimeOnPage: '6:15', scrollDepth: 88, ctaClicks: 52, goalCompletions: 18 },
  { id: 'LP-08', url: '/blog/due-diligence-afrique', title: 'Due Diligence Afrique — Guide 2026', sessions: 1680, bounceRate: 64, conversionRate: 1.4, avgTimeOnPage: '3:35', scrollDepth: 58, ctaClicks: 24, goalCompletions: 5 },
  { id: 'LP-09', url: '/services/levee-de-fonds', title: 'Levée de Fonds — Conseil & Stratégie', sessions: 920, bounceRate: 51, conversionRate: 3.6, avgTimeOnPage: '3:50', scrollDepth: 64, ctaClicks: 33, goalCompletions: 8 },
  { id: 'LP-10', url: '/services/formation-controle-interne', title: 'Formation Contrôle Interne Bancaire', sessions: 680, bounceRate: 48, conversionRate: 4.8, avgTimeOnPage: '5:02', scrollDepth: 74, ctaClicks: 33, goalCompletions: 12 },
];

export const ctaAnalysis = [
  { id: 'CTA-01', label: 'Demander un Diagnostic Gratuit', type: 'Diagnostic', location: 'Above Fold + Bottom', impressions: 12580, clicks: 428, clickRate: 3.4, conversions: 48, conversionRate: 11.2, placement: 'Hero + Sticky' },
  { id: 'CTA-02', label: 'Télécharger le Guide Conformité', type: 'Lead Magnet', location: 'Inline Content', impressions: 8420, clicks: 312, clickRate: 3.7, conversions: 35, conversionRate: 11.2, placement: 'Mid-Page' },
  { id: 'CTA-03', label: 'Prendre Rendez-vous Expert', type: 'Calendly', location: 'Bottom Page', impressions: 7120, clicks: 198, clickRate: 2.8, conversions: 28, conversionRate: 14.1, placement: 'Footer CTA' },
  { id: 'CTA-04', label: 'S\'inscrire à la Newsletter', type: 'Newsletter', location: 'Sidebar + Footer', impressions: 10500, clicks: 262, clickRate: 2.5, conversions: 22, conversionRate: 8.4, placement: 'Sidebar Sticky' },
  { id: 'CTA-05', label: 'Télécharger le Baromètre BCEAO', type: 'Premium Content', location: 'Popup Exit Intent', impressions: 5680, clicks: 256, clickRate: 4.5, conversions: 18, conversionRate: 7.0, placement: 'Exit Intent Popup' },
  { id: 'CTA-06', label: 'Contacter un Expert', type: 'Contact', location: 'Header + Bottom', impressions: 9800, clicks: 275, clickRate: 2.8, conversions: 24, conversionRate: 8.7, placement: 'Header Nav + Footer' },
  { id: 'CTA-07', label: 'Essayer l\'Outil Diagnostic', type: 'Tool', location: 'Inline + Sidebar', impressions: 4250, clicks: 174, clickRate: 4.1, conversions: 15, conversionRate: 8.6, placement: 'Content Mid' },
  { id: 'CTA-08', label: 'Voir nos Études de Cas', type: 'Navigation', location: 'Bottom', impressions: 6300, clicks: 202, clickRate: 3.2, conversions: 8, conversionRate: 4.0, placement: 'Bottom Section' },
];

export const formOptimization = [
  { id: 'FORM-01', name: 'Formulaire Diagnostic Flash', fields: ['Nom', 'Email', 'Entreprise', 'Secteur', 'Taille', 'Besoins (textarea)'], completionRate: 72, avgTimeToComplete: '2:15', dropoffField: 'Besoins (textarea)', dropoffRate: 18, mobileCompletion: 58 },
  { id: 'FORM-02', name: 'Formulaire Contact Général', fields: ['Nom', 'Email', 'Téléphone', 'Sujet', 'Message (textarea)'], completionRate: 65, avgTimeToComplete: '1:52', dropoffField: 'Téléphone', dropoffRate: 22, mobileCompletion: 52 },
  { id: 'FORM-03', name: 'Téléchargement Guide Conformité', fields: ['Nom', 'Email', 'Entreprise', 'Fonction'], completionRate: 84, avgTimeToComplete: '0:48', dropoffField: 'Entreprise', dropoffRate: 8, mobileCompletion: 76 },
  { id: 'FORM-04', name: 'Inscription Newsletter', fields: ['Email'], completionRate: 92, avgTimeToComplete: '0:18', dropoffField: '—', dropoffRate: 0, mobileCompletion: 90 },
  { id: 'FORM-05', name: 'Demande Audit Personnalisé', fields: ['Nom', 'Email', 'Téléphone', 'Entreprise', 'Secteur', 'Type Audit', 'Budget', 'Message (textarea)'], completionRate: 38, avgTimeToComplete: '4:05', dropoffField: 'Budget', dropoffRate: 35, mobileCompletion: 24 },
  { id: 'FORM-06', name: 'Prise RDV Expert (Calendly)', fields: ['Nom', 'Email', 'Sujet', 'Date/Heure'], completionRate: 78, avgTimeToComplete: '1:28', dropoffField: 'Sujet', dropoffRate: 12, mobileCompletion: 68 },
];

export const userJourneys = [
  { id: 'JNY-01', path: 'SEO → Page Service → Formulaire Diagnostic → Consultation → Mission', entryPage: 'Google Search', sessions: 320, conversionRate: 18.5, avgSteps: 3.8, valuePerJourney: '2 850 000 FCFA', topExit: 'Formulaire Diagnostic (38% abandon)' },
  { id: 'JNY-02', path: 'Blog Article → Lead Magnet → Email Nurturing → RDV → Proposition', entryPage: 'Google Search', sessions: 480, conversionRate: 8.2, avgSteps: 4.5, valuePerJourney: '1 420 000 FCFA', topExit: 'Email Nurturing (54% abandon)' },
  { id: 'JNY-03', path: 'LinkedIn → Page Service → Contact → Audit → Mission', entryPage: 'LinkedIn', sessions: 185, conversionRate: 12.4, avgSteps: 3.2, valuePerJourney: '3 120 000 FCFA', topExit: 'Page Service (24% abandon)' },
  { id: 'JNY-04', path: 'Direct → Diagnostic Flash → Résultats → Consultation → Mission', entryPage: 'Direct', sessions: 140, conversionRate: 22.8, avgSteps: 2.5, valuePerJourney: '1 850 000 FCFA', topExit: 'Résultats Diagnostic (15% abandon)' },
  { id: 'JNY-05', path: 'SEO → Tool Page → Résultats → Contact → Proposition', entryPage: 'Google Search', sessions: 260, conversionRate: 6.5, avgSteps: 3.6, valuePerJourney: '980 000 FCFA', topExit: 'Contact (42% abandon)' },
  { id: 'JNY-06', path: 'Social Media → Landing Page → Formulaire → Email → Meeting', entryPage: 'Social Media', sessions: 210, conversionRate: 5.2, avgSteps: 4.8, valuePerJourney: '750 000 FCFA', topExit: 'Landing Page (48% abandon)' },
];

export const abTests = [
  { id: 'AB-01', name: 'Hero CTA — "Diagnostic Gratuit" vs "Audit Express"', page: '/services/audit-bceao', status: 'Terminé', winnerLabel: 'Diagnostic Gratuit', lift: '+24%', confidence: 97, insight: 'Le mot "Gratuit" performe mieux que "Express" sur audience BCEAO', recommendation: 'Déployer sur toutes les pages service' },
  { id: 'AB-02', name: 'Formulaire — 4 champs vs 7 champs', page: '/diagnostic-flash', status: 'Terminé', winnerLabel: '4 champs', lift: '+38%', confidence: 99, insight: 'Réduire les champs augmente massivement la complétion', recommendation: 'Réduire tous les formulaires à ≤5 champs' },
  { id: 'AB-03', name: 'Couleur CTA — Vert institutionnel vs Orange', page: '/services', status: 'Terminé', winnerLabel: 'Vert institutionnel', lift: '+12%', confidence: 91, insight: 'Le vert institutionnel inspire plus confiance sur audience régulation', recommendation: 'Standardiser CTA en vert institutionnel' },
  { id: 'AB-04', name: 'Social Proof — Témoignages avant CTA vs après CTA', page: '/blog/gouvernance', status: 'En cours', winnerLabel: '—', lift: '—', confidence: 0, insight: 'Collecte en cours — 840/1200 sessions', recommendation: 'Attendre fin collecte' },
  { id: 'AB-05', name: 'Lead Magnet — "Guide" vs "Checklist"', page: '/blog/lbft', status: 'Terminé', winnerLabel: 'Guide', lift: '+18%', confidence: 95, insight: '"Guide" perçu comme plus complet et premium', recommendation: 'Utiliser "Guide" pour tous les lead magnets' },
  { id: 'AB-06', name: 'Sticky CTA Mobile — Icône vs Texte', page: 'Global (Mobile)', status: 'Terminé', winnerLabel: 'Texte "Diagnostic"', lift: '+31%', confidence: 98, insight: 'Le texte clair performe mieux que l\'icône seule sur mobile', recommendation: 'Déployer sticky CTA texte sur mobile' },
];

export const quickWinsCRO = [
  { id: 'QW-CRO-01', action: 'Réduire formulaire Audit Personnalisé de 8 à 5 champs', type: 'Formulaire', impact: 'Critique', effort: '2h', expectedLift: '+35% conversions', expectedRevenue: '+4 200 000 FCFA/mois', detail: 'Supprimer champs Budget, Téléphone, et Type Audit (inférés automatiquement)' },
  { id: 'QW-CRO-02', action: 'Ajouter preuve sociale (logos clients + témoignages) au-dessus du CTA sur les 5 pages service top', type: 'Social Proof', impact: 'Critique', effort: '4h', expectedLift: '+15% conversions', expectedRevenue: '+2 850 000 FCFA/mois', detail: 'Ajouter section "Ils nous font confiance" avec logos + 1 témoignage au-dessus du CTA' },
  { id: 'QW-CRO-03', action: 'Ajouter sticky CTA mobile "Voir le Diagnostic" sur pages blog', type: 'Mobile UX', impact: 'Haute', effort: '3h', expectedLift: '+22% mobile conversions', expectedRevenue: '+1 680 000 FCFA/mois', detail: '62% du trafic est mobile mais le CTA est caché sous le fold' },
  { id: 'QW-CRO-04', action: 'Optimiser meta descriptions pour CTR (inclure "Gratuit", "2026", chiffres)', type: 'SERP', impact: 'Haute', effort: '6h', expectedLift: '+8% CTR Google', expectedRevenue: '+980 000 FCFA/mois', detail: 'Les pages service ont un CTR moyen de 3.2% (cible 5%). Ajouter bénéfice concret + urgence' },
  { id: 'QW-CRO-05', action: 'Réduire friction formulaire Contact : auto-détection secteur depuis page source', type: 'UX', impact: 'Haute', effort: '5h', expectedLift: '+12% complétion', expectedRevenue: '+720 000 FCFA/mois', detail: 'Pré-remplir le champ Secteur selon la page d\'origine pour réduire l\'effort utilisateur' },
  { id: 'QW-CRO-06', action: 'Ajouter indicateur de progression sur formulaire Diagnostic Flash (3 étapes)', type: 'UX', impact: 'Haute', effort: '2h', expectedLift: '+10% complétion', expectedRevenue: '+540 000 FCFA/mois', detail: 'Diviser le formulaire en 3 étapes avec barre de progression visuelle' },
  { id: 'QW-CRO-07', action: 'Unifier le wording CTA : remplacer "En savoir plus"/"Découvrir" par "Voir le Diagnostic"', type: 'Copy', impact: 'Moyenne', effort: '2h', expectedLift: '+5% clics CTA', expectedRevenue: '+350 000 FCFA/mois', detail: 'Harmoniser le vocabulaire CTA à travers le site — langage action + bénéfice' },
  { id: 'QW-CRO-08', action: 'Ajouter section FAQ micro-conversions avant CTA sur pages blog', type: 'Contenu', impact: 'Moyenne', effort: '4h', expectedLift: '+7% conversions blog', expectedRevenue: '+280 000 FCFA/mois', detail: 'Insérer 3 questions/réponses rapides qui lèvent les objections avant le CTA' },
];



