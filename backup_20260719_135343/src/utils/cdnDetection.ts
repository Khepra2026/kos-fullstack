/**
 * Détection CDN Cloudflare et protocole HTTP/3
 * Identifie si le trafic passe par Cloudflare et le protocole utilisé
 */

interface CDNDetection {
  isCloudflare: boolean;
  isHTTP3: boolean;
  cfRay?: string;
  cfCacheStatus?: string;
  cfPoP?: string;
  protocol: string;
  negotiatedProtocol: string;
  rtt: number;
  downlink: number;
  effectiveType: string;
  saveData: boolean;
}

/**
 * Détecte le CDN et le protocole en analysant les headers de réponse
 * et l'API Network Information
 */
export async function detectCDNAndProtocol(): Promise<CDNDetection> {
  const result: CDNDetection = {
    isCloudflare: false,
    isHTTP3: false,
    protocol: 'unknown',
    negotiatedProtocol: 'unknown',
    rtt: 0,
    downlink: 0,
    effectiveType: 'unknown',
    saveData: false,
  };

  if (typeof window === 'undefined') return result;

  try {
    // Faire une requête HEAD pour lire les headers de réponse
    const response = await fetch(window.location.href, {
      method: 'HEAD',
      cache: 'no-store',
      credentials: 'same-origin',
    });

    const headers = response.headers;

    // Détection Cloudflare
    const cfRay = headers.get('cf-ray');
    const cfCacheStatus = headers.get('cf-cache-status');
    const cfPoP = headers.get('cf-pop');
    const server = headers.get('server');

    if (cfRay || server?.toLowerCase().includes('cloudflare')) {
      result.isCloudflare = true;
      result.cfRay = cfRay || undefined;
      result.cfCacheStatus = cfCacheStatus || undefined;
      result.cfPoP = cfPoP || undefined;
    }

    // Détection du protocole via Performance API
    if (performance && 'getEntriesByType' in performance) {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (entries.length > 0) {
        const nav = entries[0];
        result.protocol = nav.nextHopProtocol || 'unknown';

        // HTTP/3 est souvent reporté comme 'h3' ou 'h3-29'
        if (result.protocol.toLowerCase().includes('h3') || result.protocol.toLowerCase().includes('quic')) {
          result.isHTTP3 = true;
        }
      }
    }

    // Alternative : negotiatedProtocol via Response (expérimental)
    if ('connection' in response && (response as any).connection) {
      const conn = (response as any).connection;
      if (conn?.effectiveType) result.effectiveType = conn.effectiveType;
    }

  } catch (error) {
    // Silencieux — ne pas bloquer le chargement
  }

  // Network Information API
  const nav = navigator as any;
  if (nav.connection) {
    result.rtt = nav.connection.rtt || 0;
    result.downlink = nav.connection.downlink || 0;
    result.effectiveType = nav.connection.effectiveType || result.effectiveType;
    result.saveData = nav.connection.saveData || false;
  }

  return result;
}

/**
 * Log les informations CDN dans la console (dev) et vers monitoring
 */
export async function logCDNDetection(): Promise<CDNDetection> {
  const detection = await detectCDNAndProtocol();

  if (import.meta.env.DEV) {
    console.log('[CDN] Détection:', detection);
  }

  // Envoie vers l'endpoint monitoring si dispo
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cdn_detection', {
      event_category: 'Infrastructure',
      event_label: detection.isCloudflare ? 'cloudflare' : 'none',
      cloudflare: detection.isCloudflare,
      http3: detection.isHTTP3,
      pop: detection.cfPoP || 'unknown',
      protocol: detection.protocol,
      rtt: detection.rtt,
      downlink: detection.downlink,
      effective_type: detection.effectiveType,
      non_interaction: true,
    });
  }

  return detection;
}

/**
 * Retourne une suggestion de configuration CDN basée sur la détection
 */
export function getCDNOptimizationHints(detection: CDNDetection): string[] {
  const hints: string[] = [];

  if (!detection.isCloudflare) {
    hints.push('Cloudflare CDN non détecté — activer le proxy orange cloud sur le DNS');
  } else {
    if (detection.cfCacheStatus === 'DYNAMIC') {
      hints.push('Cloudflare en mode DYNAMIC — vérifier les règles de cache pour les assets statiques');
    }
    if (detection.cfCacheStatus === 'MISS') {
      hints.push('Cloudflare cache MISS — première requête, le cache va se peupler automatiquement');
    }
    if (detection.cfCacheStatus === 'HIT') {
      hints.push('Cloudflare cache HIT — les ressources sont servies depuis le CDN');
    }
  }

  if (!detection.isHTTP3) {
    hints.push('HTTP/3 non détecté — activer dans le dashboard Cloudflare (Network > HTTP/3)');
  } else {
    hints.push('HTTP/3 actif — handshake rapide, latence réduite');
  }

  if (detection.rtt > 300) {
    hints.push(`RTT élevé (${detection.rtt}ms) — vérifier le PoP Cloudflare le plus proche (Lagos, Joburg, Nairobi)`);
  }

  if (detection.effectiveType === '2g' || detection.effectiveType === 'slow-2g') {
    hints.push('Connexion lente détectée — compresser les images, activer le save-data');
  }

  return hints;
}

export default {
  detectCDNAndProtocol,
  logCDNDetection,
  getCDNOptimizationHints,
};



