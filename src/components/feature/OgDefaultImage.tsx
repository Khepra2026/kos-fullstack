const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
const OG_IMAGE_PROXY = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-social-preview?action=proxy&url=';

/**
 * Image OG maître KHEPRA doré/noir institutionnel (readdy.ai générée dynamiquement).
 * Le proxy Supabase la récupère avec un User-Agent standard
 * et la re-serve avec les bons headers pour Facebook, LinkedIn, etc.
 */
const MASTER_IMAGE_SOURCE =
  'https://readdy.ai/api/search-image?query=Luxurious%20dark%20black%20background%20with%20elegant%20gold%20geometric%20spiral%20pattern%20and%20warm%20champagne%20accents%2C%20premium%20corporate%20branding%20for%20KHEPRA%20EXPERTS%20investment%20advisory%20boutique%20Africa%2C%20sophisticated%20minimalist%20typography%2C%20high%20contrast%20gold%20and%20ivory%20white%20accents%2C%20professional%20dark%20aesthetic%2C%20institutional%20consulting%20identity&width=1200&height=630&seq=og-khepra-master-gold-v1&orientation=landscape';

export const OG_DEFAULT_IMAGE = `${OG_IMAGE_PROXY}${encodeURIComponent(MASTER_IMAGE_SOURCE)}`;

export const OG_DEFAULT_IMAGE_ALT =
  "KHEPRA EXPERTS – Investment & ESG Advisory Boutique | Due Diligence, Investment Readiness & Gouvernance en Afrique francophone";

export const OG_DEFAULT_IMAGE_WIDTH = '1200';
export const OG_DEFAULT_IMAGE_HEIGHT = '630';

/**
 * Retourne une URL OG absolue garantie pour les crawlers sociaux.
 * Les URL relatives sont prefixées par le SITE_URL.
 * Les URL readdy.ai directes sont proxyfiées via l'Edge Function
 * pour garantir l'accessibilité par Facebook, LinkedIn, WhatsApp, X/Twitter.
 */
export function resolveOgImageUrl(imageUrl?: string): string {
  if (!imageUrl) return OG_DEFAULT_IMAGE;

  // Déjà une URL absolue
  if (imageUrl.startsWith('http')) {
    // Si c'est déjà une URL du proxy, la retourner telle quelle
    if (imageUrl.includes('/functions/v1/og-social-preview')) {
      return imageUrl;
    }
    // Si c'est une URL readdy.ai directe, la proxyfier
    if (imageUrl.includes('readdy.ai')) {
      return `${OG_IMAGE_PROXY}${encodeURIComponent(imageUrl)}`;
    }
    // Autre URL externe (ex: CDN, S3) — la retourner telle quelle
    return imageUrl;
  }

  // URL relative — préfixer par le site
  return `${SITE_URL}${imageUrl}`;
}

export default OG_DEFAULT_IMAGE;