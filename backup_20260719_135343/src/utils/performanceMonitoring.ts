/**
 * Système de monitoring de performance avancé
 * Suivi des métriques Core Web Vitals et performance runtime
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

/**
 * Seuils Core Web Vitals (Google 2024)
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

/**
 * Calcule le rating d'une métrique
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Envoie les métriques vers un endpoint analytics
 */
async function sendToAnalytics(metric: PerformanceMetric): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[Performance]', metric);
    return;
  }

  try {
    // Envoyer vers Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.rating,
        non_interaction: true,
      });
    }

    // Envoyer vers endpoint custom (optionnel)
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
      await fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
        keepalive: true,
      });
    }
  } catch (error) {
    console.error('[Performance] Failed to send metric:', error);
  }
}

/**
 * Monitore les ressources chargées
 */
export function monitorResourceLoading(): ResourceTiming[] {
  if (!window.performance || !window.performance.getEntriesByType) {
    return [];
  }

  const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return resources.map((resource) => ({
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize || 0,
    type: resource.initiatorType,
  }));
}

/**
 * Analyse les ressources lentes
 */
export function analyzeSlowResources(threshold = 1000): ResourceTiming[] {
  const resources = monitorResourceLoading();
  return resources.filter((r) => r.duration > threshold);
}

/**
 * Monitore la mémoire utilisée (Chrome uniquement)
 */
export function monitorMemoryUsage(): { used: number; limit: number } | null {
  if ('memory' in performance && (performance as any).memory) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    };
  }
  return null;
}

/**
 * Monitore les long tasks (> 50ms)
 */
export function monitorLongTasks(callback: (duration: number) => void): void {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback(entry.duration);
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long tasks non supportés
    }
  }
}

/**
 * Monitore les layout shifts (CLS)
 */
export function monitorLayoutShifts(callback: (shift: number) => void): void {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            callback((entry as any).value);
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Layout shift non supporté
    }
  }
}

/**
 * Mesure le temps de chargement d'une route
 */
export function measureRouteChange(routeName: string): void {
  if (!window.performance || !window.performance.mark) return;

  const markName = `route-${routeName}`;
  performance.mark(markName);

  // Mesurer depuis la navigation
  if (performance.getEntriesByType('navigation').length > 0) {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const duration = performance.now() - navEntry.fetchStart;
    
    sendToAnalytics({
      name: 'RouteChange',
      value: duration,
      rating: getRating('FCP', duration),
      timestamp: Date.now(),
    });
  }
}

/**
 * Mesure la performance d'une action utilisateur
 */
export function measureUserAction(actionName: string, startTime: number): void {
  const duration = performance.now() - startTime;
  
  sendToAnalytics({
    name: `Action_${actionName}`,
    value: duration,
    rating: getRating('FID', duration),
    timestamp: Date.now(),
  });
}

/**
 * Détecte les problèmes de performance
 */
export interface PerformanceIssue {
  type: 'slow-resource' | 'long-task' | 'high-memory' | 'poor-vitals';
  severity: 'low' | 'medium' | 'high';
  message: string;
  value?: number;
}

export function detectPerformanceIssues(): PerformanceIssue[] {
  const issues: PerformanceIssue[] = [];

  // Vérifier les ressources lentes
  const slowResources = analyzeSlowResources(2000);
  if (slowResources.length > 0) {
    issues.push({
      type: 'slow-resource',
      severity: 'medium',
      message: `${slowResources.length} ressource(s) lente(s) détectée(s)`,
      value: slowResources.length,
    });
  }

  // Vérifier la mémoire
  const memory = monitorMemoryUsage();
  if (memory && memory.used / memory.limit > 0.9) {
    issues.push({
      type: 'high-memory',
      severity: 'high',
      message: `Utilisation mémoire élevée: ${memory.used}MB / ${memory.limit}MB`,
      value: memory.used,
    });
  }

  return issues;
}

/**
 * Génère un rapport de performance complet
 */
export function generatePerformanceReport(): {
  vitals: PerformanceMetric[];
  resources: ResourceTiming[];
  memory: { used: number; limit: number } | null;
  issues: PerformanceIssue[];
} {
  return {
    vitals: [], // Sera rempli par les observers
    resources: monitorResourceLoading(),
    memory: monitorMemoryUsage(),
    issues: detectPerformanceIssues(),
  };
}

/**
 * Active le monitoring continu
 */
export function enableContinuousMonitoring(): void {
  // Monitorer les long tasks
  monitorLongTasks((duration) => {
    if (duration > 100) {
      console.warn(`[Performance] Long task détectée: ${Math.round(duration)}ms`);
    }
  });

  // Monitorer les layout shifts
  let clsScore = 0;
  monitorLayoutShifts((shift) => {
    clsScore += shift;
    if (clsScore > 0.1) {
      console.warn(`[Performance] CLS élevé: ${clsScore.toFixed(3)}`);
    }
  });

  // Rapport périodique (toutes les 30s en dev)
  if (import.meta.env.DEV) {
    setInterval(() => {
      const report = generatePerformanceReport();
      if (report.issues.length > 0) {
        console.warn('[Performance] Problèmes détectés:', report.issues);
      }
    }, 30000);
  }
}

export { sendToAnalytics, getRating };
export type { PerformanceMetric, ResourceTiming };



