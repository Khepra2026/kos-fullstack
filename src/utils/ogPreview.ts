/**
 * Utilitaire pour générer l'URL OG Preview (Edge Function Supabase)
 * qui sert les meta tags Open Graph corrects aux bots sociaux.
 *
 * Quand un bot (LinkedInBot, facebookexternalhit, Twitterbot) scrape cette URL,
 * il reçoit un HTML statique avec les bonnes balises OG.
 *
 * Quand un vrai utilisateur visite cette URL, il est redirigé automatiquement
 * vers la SPA React (khepraexperts.com).
 *
 * Usage : remplacer l'URL directe du site par l'URL OG Preview
 * dans tous les boutons de partage social.
 */

const OG_PREVIEW_BASE = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-social-preview';

/**
 * Génère l'URL OG Preview pour un path ou une URL complète donnée.
 * Accepte aussi bien '/blog/alm-microfinance-afrique' que
 * 'https://khepraexperts.com/blog/alm-microfinance-afrique'.
 * @param pathOrUrl - Le path ou l'URL complète de la page
 * @returns L'URL complète de l'edge function OG preview
 */
export function getOgPreviewUrl(pathOrUrl: string): string {
  let cleanPath: string;
  if (pathOrUrl.startsWith('http')) {
    try {
      cleanPath = new URL(pathOrUrl).pathname;
    } catch {
      cleanPath = pathOrUrl;
    }
  } else {
    cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  }
  return `${OG_PREVIEW_BASE}?path=${encodeURIComponent(cleanPath)}`;
}

/**
 * Génère l'URL OG Preview à partir d'une URL complète du site.
 * @param siteUrl - L'URL complète du site (ex: 'https://khepraexperts.com/blog/alm-microfinance-afrique')
 * @returns L'URL OG Preview correspondante
 */
export function getOgPreviewUrlFromSiteUrl(siteUrl: string): string {
  const siteBase = 'https://khepraexperts.com';
  const path = siteUrl.replace(siteBase, '');
  return getOgPreviewUrl(path);
}

export default getOgPreviewUrl;