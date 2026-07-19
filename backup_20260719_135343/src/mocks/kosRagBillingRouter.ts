// P1 — KOS RAG Billing Router™ — Orchestrateur Bi-Niveau Standard/Premium
// Ferme Gap P3 (Monétisation) + Gap P6 (RAG)

export const RAG_TIERS = {
  standard: {
    label: 'Standard',
    color: 'secondary',
    price_fcfa: 0,
    price_label: 'Gratuit',
    max_chunks: 5,
    max_words: 300,
    max_sources: 3,
    latency_target: '<2s',
    features: ['RAG Top 5 sources', 'Synthèse 300 mots', '3 citations vérifiées', 'Domaines: BCEAO/COBAC/OHADA'],
    cta_upgrade: 'Pour rapport complet 5 pages avec analyse comparative OHADA vs CEMAC + matrice risques, passez en Premium.',
  },
  premium: {
    label: 'Premium',
    color: 'primary',
    price_fcfa: 75000,
    price_label: '75 000 FCFA/mois',
    max_chunks: 20,
    max_words: 2500,
    max_sources: 20,
    latency_target: '<8s',
    features: [
      'RAG Top 20 sources',
      'Chaîne de pensée complète',
      'Rapport 5 pages HBR-level',
      'Analyse comparative OHADA vs CEMAC',
      'Matrice risques 3×3',
      'Watermark Khepra Premium',
      '15+ sources académiques',
    ],
    cta_upgrade: null,
  },
  anonymous: {
    label: 'Anonyme',
    color: 'secondary',
    price_fcfa: 0,
    price_label: 'Non connecté',
    max_chunks: 2,
    max_words: 100,
    max_sources: 1,
    latency_target: '<1s',
    features: ['Aperçu 100 mots', '1 citation', 'Inscription gratuite pour débloquer Standard'],
    cta_upgrade: 'Créez un compte gratuit pour accéder au RAG Standard et obtenir une analyse complète.',
  },
};

export const RAG_USAGE_QUOTA = {
  standard: { queries_limit: 50, queries_per_day: 10, reset_period: 'monthly' },
  premium: { queries_limit: 500, queries_per_day: 100, reset_period: 'monthly' },
  anonymous: { queries_limit: 3, queries_per_day: 3, reset_period: 'daily' },
};

export const RAG_SAMPLE_QUERIES = [
  {
    id: 'q1',
    query: "Quelles sont les exigences de fonds propres pour les banques UEMOA selon le dispositif prudentiel BCEAO 2016 ?",
    tier: 'premium' as const,
    domaine: 'Banque / Prudentiel',
  },
  {
    id: 'q2',
    query: "Comment mettre en place un dispositif LBC/FT conforme aux recommandations GAFI pour une fintech CEMAC ?",
    tier: 'standard' as const,
    domaine: 'LBC/FT / FinTech',
  },
  {
    id: 'q3',
    query: "Quelles sont les obligations de gouvernance pour les SFD sous la réglementation BCEAO Instruction 001-04-2018 ?",
    tier: 'standard' as const,
    domaine: 'Microfinance / Gouvernance',
  },
  {
    id: 'q4',
    query: "Analyse comparative des exigences de fonds propres Bâle III vs UEMOA : quelles adaptations pour les banques panafricaines ?",
    tier: 'premium' as const,
    domaine: 'Banque / Réglementation Internationale',
  },
];

export const RAG_MOCK_RESPONSE_STANDARD = {
  tier_used: 'standard' as const,
  confidence_global: 0.92,
  indice_fiabilite_kos: 96,
  answer_markdown: `## Fonds Propres Banques UEMOA — Analyse Standard

Le dispositif prudentiel BCEAO (Instruction N°026-11-2016) fixe le ratio minimum de solvabilité à **8,625%** des actifs pondérés par les risques (APR) pour les banques UEMOA, avec une montée progressive vers **11,5%** à l'horizon 2022.

### Points clés
- **Capital minimum** : 10 Mds FCFA pour les banques universelles
- **Ratio Tier 1** : minimum 6,375% des APR
- **Coussin de conservation** : 2,5% des APR (phase-in 2017-2022)
- **Coussin contra-cyclique** : 0-2,5% selon décision BCEAO

### Obligations déclaratives
Rapport prudentiel mensuel transmis à la BCEAO avant le 28 du mois suivant, sous format XML défini par l'Instruction N°030-12-2017.`,
  sources: [
    {
      authority: 'BCEAO',
      reference: 'Instruction N°026-11-2016',
      article: 'Articles 3, 7, 12',
      url_officielle: 'https://www.bceao.int/fr/content/dispositif-prudentiel-applicable-aux-banques-et-etablissements-financiers',
      confidence: 0.98,
    },
    {
      authority: 'BCEAO',
      reference: 'Instruction N°030-12-2017',
      article: 'Articles 2, 15',
      url_officielle: 'https://www.bceao.int/fr/content/reporting-prudentiel',
      confidence: 0.95,
    },
    {
      authority: 'BRI / Bâle III',
      reference: 'BCBS 189, Juillet 2011',
      article: 'Section II — Capital Requirements',
      url_officielle: 'https://www.bis.org/publ/bcbs189.pdf',
      confidence: 0.90,
    },
  ],
  upgrade_cta: 'Pour un rapport complet 5 pages avec analyse comparative OHADA vs CEMAC, matrice risques réglementaires et recommandations C-Level, passez en Premium (75 000 FCFA/mois).',
  audit_trail_id: 'KOS-RAG-STD-2026-07-001',
};

export const RAG_MOCK_RESPONSE_PREMIUM = {
  tier_used: 'premium' as const,
  confidence_global: 0.97,
  indice_fiabilite_kos: 98,
  answer_markdown: `# Fonds Propres Banques UEMOA — Rapport Premium Khepra

*Confidentiel — Premium KOS Intelligence · khepraexperts.com*

---

## Executive Summary
Le dispositif prudentiel BCEAO 2016, transposé du cadre Bâle III, impose aux 130 banques UEMOA un ratio de solvabilité minimum de **11,5%** d'ici 2022. Notre analyse de 48 rapports prudentiels révèle que **32% des banques** n'atteignent pas encore cet objectif, exposant le secteur à un **besoin de recapitalisation estimé à 840 Mds FCFA**.

## Contexte Réglementaire Africain
L'UEMOA a adopté Bâle III avec 5 ans de retard vs l'UE mais avec une rigueur comparable...

## Analyse Comparative OHADA vs CEMAC
| Paramètre | UEMOA (BCEAO) | CEMAC (COBAC) |
|---|---|---|
| Ratio Solvabilité min. | 11,5% | 8,0% |
| Capital min. | 10 Mds FCFA | 10 Mds FCFA |
| Calendrier Bâle III | 2017–2022 | En cours |

## Matrice Risques Réglementaires

### Risques Élevés
- Non-conformité ratio Tier 1 : 15 banques identifiées
- Reporting XML incomplet : 23% des établissements
- Coussin contra-cyclique non provisionné : 8 banques

## Recommandations C-Level

1. **Immédiat (J+30)** : Audit interne ratio fonds propres vs cible 11,5% — Owner: DAF
2. **Court terme (J+90)** : Plan de recapitalisation si écart > 1,5% — Owner: DG + Actionnaires
3. **Moyen terme (6 mois)** : Déploiement reporting XML automatisé — Owner: DSI

## Annexes Sources
20 sources primaires citées, dont BCEAO (8), BRI (4), COBAC (3), IMF (3), BM (2).`,
  sources: [
    {
      authority: 'BCEAO',
      reference: 'Instruction N°026-11-2016',
      article: 'Articles 3-18',
      url_officielle: 'https://www.bceao.int/fr/content/dispositif-prudentiel-applicable-aux-banques-et-etablissements-financiers',
      confidence: 0.99,
    },
    {
      authority: 'COBAC',
      reference: 'Règlement COBAC R-2009/01',
      article: 'Articles 2-8',
      url_officielle: 'https://www.beac.int/cobac',
      confidence: 0.97,
    },
    {
      authority: 'BRI',
      reference: 'BCBS 189, Juillet 2011',
      article: 'Section II, Annex',
      url_officielle: 'https://www.bis.org/publ/bcbs189.pdf',
      confidence: 0.96,
    },
    {
      authority: 'IMF',
      reference: 'IMF Country Report No. 22/187',
      article: 'Stress Testing — UEMOA Banking Sector',
      url_officielle: 'https://www.imf.org/en/Publications/CR/Issues/2022/07',
      confidence: 0.93,
    },
    {
      authority: 'BCEAO',
      reference: 'Instruction N°030-12-2017',
      article: 'Reporting Prudentiel UEMOA',
      url_officielle: 'https://www.bceao.int/fr/content/reporting-prudentiel',
      confidence: 0.95,
    },
  ],
  upgrade_cta: null,
  rapport_pdf_url: '/api/generate-report/KOS-RAG-PREM-2026-07-001.pdf',
  audit_trail_id: 'KOS-RAG-PREM-2026-07-001',
};

export const STRIPE_CHECKOUT_CONFIG = {
  mode: 'subscription' as const,
  tiers: {
    standard: {
      price_id: 'price_standard_khepra_rag',
      name: 'KOS RAG Standard',
      amount: 0,
      currency: 'xof',
      interval: 'month' as const,
    },
    premium: {
      price_id: 'price_premium_khepra_rag',
      name: 'KOS RAG Premium Intelligence',
      amount: 75000,
      currency: 'xof',
      interval: 'month' as const,
    },
  },
  success_url: 'https://khepraexperts.com/kos-rag-orchestrator?upgrade=success',
  cancel_url: 'https://khepraexperts.com/kos-rag-orchestrator',
};

export const RAG_BILLING_KPI = {
  total_users: 847,
  standard_users: 724,
  premium_users: 123,
  conversion_rate_pct: 14.5,
  mrr_fcfa: 9225000,
  target_conversion_j60: 15,
  queries_today: 342,
  cache_hit_rate_pct: 68,
  avg_confidence: 0.94,
  hallucination_rate_pct: 0.3,
};

export type RagTier = 'standard' | 'premium' | 'anonymous';
export type RagQueryStatus = 'idle' | 'loading' | 'success' | 'error' | 'quota_exceeded' | 'upgrade_required';



