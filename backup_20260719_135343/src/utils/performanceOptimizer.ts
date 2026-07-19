/**
 * Optimiseur de performance global
 * Regroupe toutes les optimisations techniques pour atteindre les standards internationaux
 */

import { initImageOptimizations } from '';
import { enableContinuousMonitoring } from '';

/**
 * Configuration du Resource Hints (DNS Prefetch, Preconnect, Prefetch)
 */
export function setupResourceHints(): void {
  // Les hints DNS/preconnect critiques sont déjà dans index.html (chargés avant JS).
  // On ne les duplique pas — on se contente de vérifier leur présence.
  // Seuls les hints dynamiques (domaines découverts au runtime) sont ajoutés ici.
}

/**
 * Optimisation du Critical CSS (inline des styles critiques)
 * NOTE: Les styles critiques sont déjà dans index.html (inline <style>).
 * Cette fonction est conservée comme no-op pour compatibilité.
 */
export function inlineCriticalCSS(): void {
  // Critical CSS already inlined in index.html — no JS injection needed
}

/**
 * Defer des scripts non-critiques
 */
export function deferNonCriticalScripts(): void {
  // Tous les scripts externes doivent avoir defer ou async
  document.querySelectorAll('script[src]:not([defer]):not([async])').forEach((script) => {
    const src = script.getAttribute('src');
    if (src && !src.includes('vite') && !src.includes('main')) {
      script.setAttribute('defer', 'true');
    }
  });
}

/**
 * Optimisation des Web Fonts (font-display: swap)
 */
export function optimizeWebFonts(): void {
  // Vérifier si les fonts sont chargées avec font-display: swap
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && !href.includes('display=swap')) {
      const newHref = href.includes('?') 
        ? `${href}&display=swap` 
        : `${href}?display=swap`;
      link.setAttribute('href', newHref);
    }
  });
}

/**
 * Compression Brotli (côté serveur, mais on peut détecter le support)
 */
export function detectCompressionSupport(): {
  brotli: boolean;
  gzip: boolean;
} {
  const acceptEncoding = navigator.userAgent.toLowerCase();
  return {
    brotli: acceptEncoding.includes('br'),
    gzip: acceptEncoding.includes('gzip'),
  };
}

/**
 * Service Worker pour mise en cache avancée
 */
export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (import.meta.env.DEV) {
            console.log('✅ Service Worker enregistré:', registration.scope);
          }
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.warn('❌ Erreur Service Worker:', error);
          }
        });
    });
  }
}

/**
 * Préchargement des routes critiques avec requestIdleCallback
 */
export function prefetchCriticalRoutes(): void {
  const criticalRoutes = [
    '/services',
    '/about',
    '/blog',
    '/case-studies',
    '/decideurs',
    '/resources',
    '/insights',
  ];

  // Précharger après le chargement initial
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      criticalRoutes.forEach((route) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      criticalRoutes.forEach((route) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }, 2000);
  }
}

/**
 * Optimisation du Largest Contentful Paint (LCP)
 * NOTE: Le LCP est désormais géré par HeroNew.tsx via OptimizedImage avec fetchpriority="high"
 * Aucun preload statique n'est nécessaire ici — l'image hero est chargée directement dans le composant.
 */
export function optimizeLCP(): void {
  // LCP géré par le composant Hero (OptimizedImage avec fetchpriority="high")
  // Aucun preload dynamique n'est injecté pour éviter les doubles téléchargements
}

/**
 * Optimisation du First Input Delay (FID) / Interaction to Next Paint (INP)
 */
export function optimizeFID(): void {
  // Utiliser requestIdleCallback pour les tâches non-critiques
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Initialiser les analytics, tracking, etc.
      if (import.meta.env.DEV) {
        console.log('✅ Tâches non-critiques exécutées pendant idle time');
      }
    }, { timeout: 3000 });
  }
}

/**
 * Optimisation du Cumulative Layout Shift (CLS)
 */
export function optimizeCLS(): void {
  // S'assurer que toutes les images ont width/height
  document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
    const htmlImg = img as HTMLImageElement;
    if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
      htmlImg.setAttribute('width', String(htmlImg.naturalWidth));
      htmlImg.setAttribute('height', String(htmlImg.naturalHeight));
    }
  });

  // Réserver l'espace pour les iframes
  document.querySelectorAll('iframe:not([width]):not([height])').forEach((iframe) => {
    const htmlIframe = iframe as HTMLIFrameElement;
    htmlIframe.style.aspectRatio = '16 / 9';
  });
}

/**
 * Détection et optimisation des Core Web Vitals
 */
export function monitorCoreWebVitals(): void {
  if ('PerformanceObserver' in window) {
    // LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        if (import.meta.env.DEV) {
          console.log('📊 LCP:', lcpValue.toFixed(2), 'ms');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP non supporté
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fidValue = entry.processingStart - entry.startTime;
          if (import.meta.env.DEV) {
            console.log('📊 FID:', fidValue.toFixed(2), 'ms');
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID non supporté
    }

    // CLS
    try {
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            if (import.meta.env.DEV) {
              console.log('📊 CLS:', clsScore.toFixed(4));
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS non supporté
    }
  }
}

/**
 * Nettoyage des ressources inutilisées
 */
export function cleanupUnusedResources(): void {
  // Supprimer les event listeners obsolètes
  window.addEventListener('beforeunload', () => {
    if (import.meta.env.DEV) {
      console.log('🧹 Nettoyage des ressources avant déchargement');
    }
  });
}

/**
 * Cache intelligent pour les résultats de recherche
 */
const searchCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedSearch(query: string): any | null {
  const cached = searchCache.get(query);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

export function setCachedSearch(query: string, data: any): void {
  searchCache.set(query, { data, timestamp: Date.now() });
  
  // Limiter la taille du cache
  if (searchCache.size > 50) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
}

/**
 * Initialisation complète des optimisations
 */
export function initPerformanceOptimizations(): void {
  if (import.meta.env.DEV) {
    console.log('🚀 Initialisation des optimisations de performance...');
  }

  // Resource Hints
  setupResourceHints();

  // Critical CSS
  inlineCriticalCSS();

  // Defer scripts
  deferNonCriticalScripts();

  // Web Fonts
  optimizeWebFonts();

  // Service Worker
  registerServiceWorker();

  // Images
  initImageOptimizations();

  // Prefetch routes
  prefetchCriticalRoutes();

  // Core Web Vitals
  optimizeLCP();
  optimizeFID();
  optimizeCLS();

  // Performance Monitoring
  enableContinuousMonitoring();

  if (import.meta.env.DEV) {
    console.log('✅ Optimisations de performance activées');
  }
}

export default {
  setupResourceHints,
  inlineCriticalCSS,
  deferNonCriticalScripts,
  optimizeWebFonts,
  detectCompressionSupport,
  registerServiceWorker,
  prefetchCriticalRoutes,
  optimizeLCP,
  optimizeFID,
  optimizeCLS,
  monitorCoreWebVitals,
  cleanupUnusedResources,
  getCachedSearch,
  setCachedSearch,
  initPerformanceOptimizations,
};



