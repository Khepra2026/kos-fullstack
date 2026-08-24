/**
 * Utilitaire d'optimisation des images en WebP
 * Ajoute automatiquement format=webp et quality=75 aux URLs Readdy
 * Réduction estimée : 30 à 50% du poids des images
 */

export function optimizeImageUrl(src: string, quality = 75): string {
  if (!src || !src.includes('readdy.ai/api/search-image')) return src;
  try {
    const url = new URL(src);
    if (!url.searchParams.has('format')) url.searchParams.set('format', 'webp');
    if (!url.searchParams.has('quality')) url.searchParams.set('quality', String(quality));
    return url.toString();
  } catch {
    return src;
  }
}

/**
 * Optimisation spécifique pour les images hero / LCP
 * Quality=85 pour préserver la netteté sur l'élément le plus visible
 */
export function optimizeHeroImageUrl(src: string): string {
  return optimizeImageUrl(src, 85);
}

/**
 * Génère un LQIP (Low Quality Image Placeholder) pour les images Readdy
 * Utilisé pour éviter le CLS et améliorer le perceived LCP
 */
export function generateLqipUrl(src: string): string | null {
  if (!src || !src.includes('readdy.ai/api/search-image')) return null;
  try {
    const url = new URL(src);
    url.searchParams.set('w', '40');
    url.searchParams.set('blur', '8');
    url.searchParams.set('format', 'webp');
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * Optimise un tableau d'URLs d'images
 */
export function optimizeImageUrls(srcs: string[], quality = 75): string[] {
  return srcs.map(src => optimizeImageUrl(src, quality));
}




