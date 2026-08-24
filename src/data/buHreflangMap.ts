/**
 * ═══════════════════════════════════════════════════════════════
 * BU HREFLANG CENTRALIZED MAPPING — KHEPRA EXPERTS KOS
 * ═══════════════════════════════════════════════════════════════
 *
 * Source unique de vérité pour les relations bilingues FR↔EN
 * des 4 Business Units KOS (Refonte Big Four 2026).
 *
 * Utilisé par :
 *  - BULanguageSwitcher (rendu hreflang + badge langue)
 *  - src/utils/hreflang.ts (STATIC_HREFLANG_MAP)
 *  - sitemap-xml-dynamic Edge Function (génération sitemap)
 *  - SEO Head components (canonical + alternates)
 *
 * Maintenance : pour ajouter une nouvelle BU bilingue,
 * il suffit d'ajouter une entrée dans BU_HREFLANG_MAP.
 * Tous les consommateurs seront automatiquement mis à jour.
 */

export interface BUHreflangEntry {
  /** Identifiant court de la BU (ex: 'bu1', 'bu2', 'bu3', 'bu4') */
  buId: string;
  /** Chemin URL version française (sans trailing slash) */
  pathFr: string;
  /** Chemin URL version anglaise (sans trailing slash) */
  pathEn: string;
  /** Libellé affiché sur le badge langue côté FR → 'EN' */
  labelFr: string;
  /** Libellé affiché sur le badge langue côté EN → 'FR' */
  labelEn: string;
  /** Titre SEO FR pour les métadonnées */
  titleFr: string;
  /** Titre SEO EN pour les métadonnées */
  titleEn: string;
  /** Code numérique BU (1-4) pour priority sitemap */
  buNumber: number;
}

/**
 * Mapping centralisé des 4 Business Units — Refonte Big Four 2026.
 *
 * SCHÉMA HREFLANG CORRECT :
 * Sur chaque page BU (FR ou EN), on doit rendre :
 *   <link rel="alternate" hreflang="fr" href="https://khepraexperts.com/kos-buN-xxx/" />
 *   <link rel="alternate" hreflang="en" href="https://khepraexperts.com/kos-buN-xxx-en/" />
 *   <link rel="alternate" hreflang="x-default" href="https://khepraexperts.com/kos-buN-xxx/" />
 *
 * Google a besoin des DEUX versions sur chaque page pour établir
 * la relation bilingue. x-default pointe vers la version FR (langue primaire).
 */
export const BU_HREFLANG_MAP: BUHreflangEntry[] = [
  {
    buId: 'bu1',
    pathFr: '/kos-bu1-financial-regulation',
    pathEn: '/kos-bu1-financial-regulation-en',
    labelFr: 'EN',
    labelEn: 'FR',
    titleFr: 'BU1 — Régulation Financière & Conformité BCEAO/COBAC',
    titleEn: 'BU1 — Financial Regulation & Compliance — BCEAO/COBAC',
    buNumber: 1,
  },
  {
    buId: 'bu2',
    pathFr: '/kos-bu2-governance-due-diligence',
    pathEn: '/kos-bu2-governance-due-diligence-en',
    labelFr: 'EN',
    labelEn: 'FR',
    titleFr: 'BU2 — Gouvernance & Due Diligence — Conseil d\'Administration & Audits Pré-Acquisition',
    titleEn: 'BU2 — Governance & Due Diligence — Board Performance · Pre-Acquisition Audits',
    buNumber: 2,
  },
  {
    buId: 'bu3',
    pathFr: '/kos-bu3-climate-esg',
    pathEn: '/kos-bu3-climate-esg-en',
    labelFr: 'EN',
    labelEn: 'FR',
    titleFr: 'BU3 — Climate, Transition & ESG — Ingénierie Décarbonation · Valorisation Actifs',
    titleEn: 'BU3 — Climate, Transition & ESG — Decarbonization Engineering · Industrial Asset Valuation',
    buNumber: 3,
  },
  {
    buId: 'bu4',
    pathFr: '/kos-bu4-kbr-model',
    pathEn: '/kos-bu4-kbr-model-en',
    labelFr: 'EN',
    labelEn: 'FR',
    titleFr: 'BU4 — KBR-Model & Business Intelligence — Monétisation PI · Knowledge-Based Revenue',
    titleEn: 'BU4 — KBR-Model & Business Intelligence — IP Monetization · Knowledge-Based Revenue',
    buNumber: 4,
  },
];

/**
 * Lookup O(1) par buId.
 */
const BU_MAP_BY_ID: Record<string, BUHreflangEntry> = {};
for (const entry of BU_HREFLANG_MAP) {
  BU_MAP_BY_ID[entry.buId] = entry;
}

/**
 * Lookup O(1) par path FR.
 */
const BU_MAP_BY_PATH_FR: Record<string, BUHreflangEntry> = {};
for (const entry of BU_HREFLANG_MAP) {
  BU_MAP_BY_PATH_FR[entry.pathFr] = entry;
}

/**
 * Lookup O(1) par path EN.
 */
const BU_MAP_BY_PATH_EN: Record<string, BUHreflangEntry> = {};
for (const entry of BU_HREFLANG_MAP) {
  BU_MAP_BY_PATH_EN[entry.pathEn] = entry;
}

/**
 * Récupère une entrée BU par son identifiant court.
 */
export function getBUByID(buId: string): BUHreflangEntry | undefined {
  return BU_MAP_BY_ID[buId];
}

/**
 * Récupère une entrée BU par un chemin (FR ou EN).
 */
export function getBUByPath(path: string): BUHreflangEntry | undefined {
  const cleanPath = path.replace(/\/+$/, '');
  return BU_MAP_BY_PATH_FR[cleanPath] || BU_MAP_BY_PATH_EN[cleanPath];
}

/**
 * Détermine si un chemin est une page BU (FR ou EN).
 */
export function isBUPath(path: string): boolean {
  const cleanPath = path.replace(/\/+$/, '');
  return cleanPath in BU_MAP_BY_PATH_FR || cleanPath in BU_MAP_BY_PATH_EN;
}

/**
 * Retourne la langue d'un chemin BU ('fr' | 'en' | null).
 */
export function getBULanguage(path: string): 'fr' | 'en' | null {
  const cleanPath = path.replace(/\/+$/, '');
  if (BU_MAP_BY_PATH_FR[cleanPath]) return 'fr';
  if (BU_MAP_BY_PATH_EN[cleanPath]) return 'en';
  return null;
}

const SITE_URL = 'https://khepraexperts.com';

/**
 * Génère les 3 balises hreflang pour une page BU donnée.
 * Retourne toujours : fr, en, x-default (fr comme défaut).
 */
export function buildBUHreflangLinks(entry: BUHreflangEntry): Array<{ lang: string; href: string }> {
  return [
    { lang: 'fr', href: `${SITE_URL}${entry.pathFr}` },
    { lang: 'en', href: `${SITE_URL}${entry.pathEn}` },
    { lang: 'x-default', href: `${SITE_URL}${entry.pathFr}` },
  ];
}




