/**
 * ═══════════════════════════════════════════════════════════════
 * KOS DOMAIN VALIDATOR™ — Source unique de vérité du domaine
 * ═══════════════════════════════════════════════════════════════
 *
 * Ce module est importé par TOUS les générateurs de contenu public
 * (sitemap, robots.txt, RSS, LLMs.txt, OG images, schema.org, etc.)
 * pour garantir que le domaine canonique est TOUJOURS respecté.
 *
 * ⛔ FORBIDDEN DOMAINS: example.com, localhost, vercel.app, netlify.app,
 *    workers.dev, herokuapp.com, pages.dev, web.app, firebaseapp.com
 *
 * Si un domaine interdit est détecté, le build ÉCHOUE immédiatement.
 */

/** Domaine canonique unique — NE JAMAIS MODIFIER sans validation Big Four */
export const CANONICAL_DOMAIN = 'khepraexperts.com';

/** URL canonique complète avec protocole */
export const CANONICAL_URL = `https://${CANONICAL_DOMAIN}`;

/** Domaines interdits — leur présence dans tout output public = build FAIL */
export const FORBIDDEN_DOMAINS: readonly string[] = [
  'example.com',
  'example.org',
  'localhost',
  '127.0.0.1',
  'vercel.app',
  'netlify.app',
  'workers.dev',
  'herokuapp.com',
  'pages.dev',
  'web.app',
  'firebaseapp.com',
];

export interface DomainStatus {
  /** Le domaine actuellement configuré */
  currentDomain: string;
  /** L'URL canonique complète (https://) */
  canonicalUrl: string;
  /** true si le domaine courant est le domaine canonique */
  isCanonical: boolean;
  /** Liste des domaines interdits détectés */
  violations: string[];
}

/**
 * Valide le domaine courant contre le domaine canonique et la liste noire.
 * À appeler au démarrage de tout générateur de contenu public.
 *
 * @returns DomainStatus — si isCanonical=false, le build doit échouer
 */
export function getDomainStatus(): DomainStatus {
  const currentDomain = CANONICAL_DOMAIN;
  const violations: string[] = [];

  // Vérifie que le domaine courant n'est PAS dans la liste noire
  for (const forbidden of FORBIDDEN_DOMAINS) {
    if (currentDomain.includes(forbidden) || forbidden.includes(currentDomain)) {
      violations.push(forbidden);
    }
  }

  return {
    currentDomain,
    canonicalUrl: CANONICAL_URL,
    isCanonical: currentDomain === CANONICAL_DOMAIN && violations.length === 0,
    violations,
  };
}

/**
 * Construit une URL absolue sécurisée — garantit que le domaine est canonique.
 * À utiliser pour TOUTE génération d'URL publique.
 *
 * @param path - Chemin relatif (doit commencer par /)
 * @returns URL absolue complète sur le domaine canonique
 */
export function buildCanonicalUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_URL}${normalized}`;
}

/**
 * Valide qu'une URL donnée est sur le domaine canonique.
 * Lance une erreur si ce n'est pas le cas (en développement/strict mode).
 *
 * @param url - URL à valider
 * @returns true si l'URL est valide
 */
export function assertCanonicalUrl(url: string): boolean {
  if (!url.startsWith(CANONICAL_URL)) {
    console.error(
      `⛔ KOS DOMAIN VIOLATION: URL "${url}" does not start with "${CANONICAL_URL}". ` +
      'All public URLs must use the canonical domain.'
    );
    return false;
  }
  return true;
}

/**
 * Vérifie si une URL contient un domaine interdit.
 * Utilisé par les outils de détection et d'audit.
 *
 * @param url - URL à scanner
 * @returns Le domaine interdit détecté, ou null si clean
 */
export function detectForbiddenDomain(url: string): string | null {
  for (const forbidden of FORBIDDEN_DOMAINS) {
    if (url.includes(forbidden)) {
      return forbidden;
    }
  }
  return null;
}