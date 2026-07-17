/**
 * Utilitaires pour optimiser les Core Web Vitals (LCP, INP, CLS)
 * Basé sur les standards 2025 de Google
 * Optimisations avancées pour performance maximale
 */

// ── Analytics endpoint for Web Vitals RUM (sendBeacon fallback) ──
const VITALS_ENDPOINT = import.meta.env.VITE_VITALS_ENDPOINT || '/api/vitals';

/**
 * Envoie une métrique Web Vitals via navigator.sendBeacon (persiste au unload)
 * Fallback sur fetch keepalive si sendBeacon indisponible ou échoue.
 */
function sendToBeacon(metric: { name: string; value: number; rating: string }): void {
  if (typeof navigator === 'undefined') return;

  const payload = JSON.stringify({
    ...metric,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    ua: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    t: Date.now(),
  });

  try {
    const sent = navigator.sendBeacon(VITALS_ENDPOINT, new Blob([payload], { type: 'application/json' }));
    if (!sent) throw new Error('sendBeacon returned false');
  } catch {
    // Fallback fetch keepalive pour navigateurs sans sendBeacon ou endpoint indisponible
    try {
      fetch(VITALS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => { /* silently ignore network errors */ });
    } catch {
      // Last resort — metrics lost, but GA4 still has them
    }
  }
}

/**
 * Optimisation LCP (Largest Contentful Paint)
 * Target: ≤ 2.5s (Good), ≤ 4.0s (Needs Improvement)
 */

/**
 * Précharge l'image LCP avec fetchpriority="high"
 */
export function preloadLCPImage(imageUrl: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

/**
 * Précharge les polices critiques avec font-display: swap
 */
export function preloadCriticalFonts(fontUrls: string[]) {
  if (typeof window === 'undefined') return;

  fontUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Précharge les ressources critiques (CSS, JS)
 */
export function preloadCriticalResources(resources: Array<{ url: string; as: string; type?: string }>) {
  if (typeof window === 'undefined') return;

  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.as;
    link.href = resource.url;
    if (resource.type) link.type = resource.type;
    if (resource.as === 'font') link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Optimisation INP (Interaction to Next Paint)
 * Target: ≤ 200ms (Good), ≤ 500ms (Needs Improvement)
 */

/**
 * Yield to main thread pour éviter les Long Tasks
 */
export async function yieldToMain() {
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    return (window as any).scheduler.yield();
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Découpe une tâche longue en chunks pour éviter de bloquer le main thread
 */
export async function processInChunks<T>(
  items: T[],
  callback: (item: T) => void | Promise<void>,
  chunkSize: number = 50
) {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    for (const item of chunk) {
      await callback(item);
    }
    
    // Yield to main thread after each chunk
    await yieldToMain();
  }
}

/**
 * Debounce pour optimiser les événements fréquents
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle pour limiter la fréquence d'exécution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Optimisation CLS (Cumulative Layout Shift)
 * Target: ≤ 0.1 (Good), ≤ 0.25 (Needs Improvement)
 */

/**
 * Réserve l'espace pour une image avant son chargement
 */
export function reserveImageSpace(
  img: HTMLImageElement,
  width: number,
  height: number
) {
  img.width = width;
  img.height = height;
  img.style.aspectRatio = `${width} / ${height}`;
}

/**
 * Applique font-display: swap pour éviter FOUT/FOIT
 */
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Mesure et rapporte les Core Web Vitals
 */
export function measureWebVitals(callback: (metric: any) => void) {
  if (typeof window === 'undefined') return;

  // ── sendBeacon RUM (production) ─────────────────────────────────
  const beaconCallback = (metric: any) => {
    callback(metric);
    if (import.meta.env.PROD) {
      sendToBeacon(metric);
    }
  };

  // Utilise web-vitals library si disponible
  if ('PerformanceObserver' in window) {
    // LCP
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        beaconCallback({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs-improvement' : 'poor',
        });
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP not supported
    }

    // INP (remplace FID)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inp = (entry as any).processingStart - entry.startTime;
          beaconCallback({
            name: 'INP',
            value: inp,
            rating: inp <= 200 ? 'good' : inp <= 500 ? 'needs-improvement' : 'poor',
          });
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });
    } catch (e) {
      // INP not supported
    }

    // CLS
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            beaconCallback({
              name: 'CLS',
              value: clsValue,
              rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // CLS not supported
    }

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        beaconCallback({
          name: 'FCP',
          value: firstEntry.startTime,
          rating: firstEntry.startTime <= 1800 ? 'good' : firstEntry.startTime <= 3000 ? 'needs-improvement' : 'poor',
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      // FCP not supported
    }

    // TTFB (Time to First Byte)
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        beaconCallback({
          name: 'TTFB',
          value: ttfb,
          rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor',
        });
      }
    } catch (e) {
      // TTFB not supported
    }
  }
}

/**
 * Lazy load images avec Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Charger 50px avant d'entrer dans le viewport
      threshold: 0.01,
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback pour navigateurs anciens
    images.forEach((img) => {
      const src = img.getAttribute('data-src');
      if (src) {
        (img as HTMLImageElement).src = src;
        img.removeAttribute('data-src');
      }
    });
  }
}

/**
 * Préconnexion aux domaines externes critiques
 */
export function preconnectToDomains(domains: string[]) {
  if (typeof window === 'undefined') return;

  domains.forEach((domain) => {
    // Preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);

    // DNS-prefetch (fallback)
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);
  });
}

/**
 * Optimise le chargement des ressources critiques
 */
export function optimizeCriticalResources() {
  if (typeof window === 'undefined') return;

  // Préconnexion aux domaines critiques
  preconnectToDomains([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
  ]);

  // Lazy load des images
  lazyLoadImages();

  // Optimise les polices
  optimizeFontLoading();
}

/**
 * Détecte et optimise les Long Tasks (> 50ms)
 */
export function detectLongTasks(callback?: (task: any) => void) {
  if (typeof window === 'undefined') return;

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            if (callback) {
              callback({
                name: 'Long Task',
                duration: entry.duration,
                startTime: entry.startTime,
              });
            }
            if (import.meta.env.DEV) {
              console.warn(`⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms at ${entry.startTime.toFixed(2)}ms`);
            }
          }
        }
      });
      observer.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      // Long Tasks API not supported
    }
  }
}

/**
 * Optimise les animations pour éviter le layout thrashing
 */
export function optimizeAnimations() {
  if (typeof window === 'undefined') return;

  // Utilise requestAnimationFrame pour les animations
  const style = document.createElement('style');
  style.textContent = `
    * {
      /* Force GPU acceleration pour les animations */
      will-change: auto;
    }
    
    /* Optimise les transitions */
    .transition-transform,
    .transition-opacity {
      will-change: transform, opacity;
    }
    
    /* Évite le layout thrashing */
    img, video, iframe {
      content-visibility: auto;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Implémente le Content Visibility pour améliorer le rendering
 * NOTE : Les règles content-visibility sont maintenant dans src/css/performance.css
 * (CSS statique, appliquées avant le premier paint, bien plus efficace que l'injection JS).
 * Cette fonction est conservée comme no-op pour compatibilité.
 */
export function enableContentVisibility() {
  // Content-visibility rules are now in src/css/performance.css — applied at parse time.
  // JS injection was too late (post-paint) to help FCP/LCP.
}

/**
 * Hook React pour mesurer les Web Vitals
 */
export function useWebVitals(onMetric?: (metric: any) => void) {
  if (typeof window === 'undefined') return;

  // Mesure les métriques au montage
  if (onMetric) {
    measureWebVitals(onMetric);
  }

  // Optimise les ressources critiques
  optimizeCriticalResources();
}

/**
 * Initialise toutes les optimisations Core Web Vitals
 */
export function initCoreWebVitals() {
  if (typeof window === 'undefined') return;

  // Optimise les ressources critiques au démarrage
  optimizeCriticalResources();

  // Active Content Visibility
  enableContentVisibility();

  // Optimise les animations
  optimizeAnimations();

  // Détecte les Long Tasks en dev
  if (import.meta.env.DEV) {
    detectLongTasks();
  }

  // Mesure et log les métriques
  measureWebVitals((metric) => {
    // Log en développement
    if (import.meta.env.DEV) {
      const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} [Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
    }

    // Envoie à Google Analytics en production
    if (import.meta.env.PROD && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.rating,
        non_interaction: true,
      });
    }
  });
}

/**
 * Optimise les images pour réduire LCP
 */
export function optimizeImagesForLCP() {
  if (typeof window === 'undefined') return;

  // Trouve l'image LCP probable (première grande image visible)
  const heroImages = document.querySelectorAll('img[src*="hero"], img[src*="banner"], section:first-of-type img');
  
  heroImages.forEach((img) => {
    const htmlImg = img as HTMLImageElement;
    
    // Ajoute fetchpriority="high"
    htmlImg.setAttribute('fetchpriority', 'high');
    
    // Désactive lazy loading pour l'image hero
    htmlImg.removeAttribute('loading');
    
    // Précharge l'image
    if (htmlImg.src) {
      preloadLCPImage(htmlImg.src);
    }
  });
}

/**
 * Réduit le JavaScript non utilisé
 */
export function reduceUnusedJavaScript() {
  if (typeof window === 'undefined') return;

  // Charge les scripts non critiques de manière asynchrone
  const scripts = document.querySelectorAll('script[data-defer]');
  
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('src') || '';
    newScript.async = true;
    newScript.defer = true;
    document.body.appendChild(newScript);
    script.remove();
  });
}

export default {
  preloadLCPImage,
  preloadCriticalFonts,
  preloadCriticalResources,
  yieldToMain,
  processInChunks,
  debounce,
  throttle,
  reserveImageSpace,
  optimizeFontLoading,
  measureWebVitals,
  lazyLoadImages,
  preconnectToDomains,
  optimizeCriticalResources,
  detectLongTasks,
  optimizeAnimations,
  enableContentVisibility,
  useWebVitals,
  initCoreWebVitals,
  optimizeImagesForLCP,
  reduceUnusedJavaScript,
};