/**
 * Système de monitoring avec circuit breaker.
 * Évite les cascades d'erreurs quand Supabase est injoignable.
 */

interface MonitoringLog {
  type: '404' | 'performance' | 'error' | 'navigation' | 'cdn';
  url: string;
  referrer?: string;
  user_agent?: string;
  duration_ms?: number;
  status_code?: number;
  error_message?: string;
}

// ── Circuit breaker — évite 50 appels en rafale vers Supabase injoignable ──
let consecutiveFailures = 0;
const MAX_FAILURES = 3;
const COOLDOWN_MS = 30_000; // 30 secondes avant de réessayer
let circuitOpenUntil = 0;

function isCircuitOpen(): boolean {
  if (consecutiveFailures < MAX_FAILURES) return false;
  if (Date.now() < circuitOpenUntil) return true;
  // Cooldown écoulé, on referme
  consecutiveFailures = 0;
  return false;
}

// ── Buffer local : accumule les logs et les envoie par lots ──
let logBuffer: MonitoringLog[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

async function flushLogs(): Promise<void> {
  if (logBuffer.length === 0) return;
  if (isCircuitOpen()) {
    logBuffer = []; // on vide pour éviter l'accumulation infinie
    return;
  }

  const batch = logBuffer.splice(0);
  try {
    // Import dynamique pour éviter dépendance circulaire au module init
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('monitoring_logs').insert(batch);
    consecutiveFailures = 0;
  } catch {
    consecutiveFailures++;
    if (consecutiveFailures >= MAX_FAILURES) {
      circuitOpenUntil = Date.now() + COOLDOWN_MS;
      if (import.meta.env.DEV) {
        console.warn('[Monitoring] Circuit breaker open — Supabase unreachable, pausing logs for 30s');
      }
    }
  }
}

function scheduleFlush(): void {
  if (flushTimeout) return;
  flushTimeout = setTimeout(() => {
    flushTimeout = null;
    flushLogs();
  }, 5000); // flush toutes les 5 secondes
}

async function sendMonitoringLog(data: MonitoringLog): Promise<void> {
  if (isCircuitOpen()) return; // silencieux quand le circuit est ouvert
  logBuffer.push(data);
  scheduleFlush();
}

// ── Log CDN ──
export async function logCDNInfo(): Promise<void> {
  const { detectCDNAndProtocol } = await import('./cdnDetection');
  const detection = await detectCDNAndProtocol();
  sendMonitoringLog({
    type: 'cdn',
    url: window.location.href,
    error_message: JSON.stringify({
      cdn: detection.isCloudflare ? 'cloudflare' : 'none',
      http3: detection.isHTTP3,
      pop: detection.cfPoP || null,
    }),
  });
}

// ── Log 404 (appelé depuis NotFound.tsx) ──
export function log404(): void {
  sendMonitoringLog({
    type: '404',
    url: window.location.href,
    referrer: document.referrer,
  });
}

// ── Log error ──
export function logError(error: Error, context?: string): void {
  sendMonitoringLog({
    type: 'error',
    url: window.location.href,
    error_message: context ? `${context}: ${error.message}` : error.message,
  });
}

// ── Log navigation ──
function logNavigation(): void {
  if (!window.performance || !performance.getEntriesByType) return;

  const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const nav = navEntries[0];
  if (!nav) return;

  const duration = Math.round(nav.loadEventEnd - nav.startTime);
  if (duration <= 0) return;

  sendMonitoringLog({
    type: 'navigation',
    url: window.location.href,
    duration_ms: duration,
  });
}

/**
 * Intercepte fetch pour mesurer les temps de réponse.
 * ⚠️ Ne log PAS les appels vers Supabase (évite les boucles).
 */
function interceptFetch(): void {
  const originalFetch = window.fetch;

  window.fetch = async function (...args: Parameters<typeof fetch>): Promise<Response> {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.toString() || '';

    // Ignorer les appels vers Supabase pour éviter la cascade
    if (url.includes('supabase.co') || url.includes('localhost:54321')) {
      return originalFetch(...args);
    }

    const startTime = performance.now();

    try {
      const response = await originalFetch(...args);
      const duration = Math.round(performance.now() - startTime);

      if (!response.ok) {
        sendMonitoringLog({
          type: 'error',
          url,
          duration_ms: duration,
          status_code: response.status,
          error_message: `HTTP ${response.status} ${response.statusText}`,
        });
      } else if (duration > 2000) {
        // Ne log que les requêtes lentes (>2s)
        sendMonitoringLog({
          type: 'performance',
          url,
          duration_ms: duration,
          status_code: response.status,
        });
      }

      return response;
    } catch (error) {
      // Ne pas logguer les erreurs réseau des appels normaux dans le monitoring
      // (ça créerait une cascade). L'error tracking global s'en charge.
      throw error;
    }
  };
}

/**
 * Écoute les erreurs globales, sans appeler Supabase
 */
function listenGlobalErrors(): void {
  window.addEventListener('error', (event) => {
    // Éviter de logguer les erreurs qui viennent de Supabase lui-même
    const msg = event.message || '';
    if (msg.includes('supabase') || msg.includes('Failed to fetch')) return;

    logError(event.error || new Error(event.message), 'Global error');
  });

  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason instanceof Error ? event.reason.message : String(event.reason);
    // Filtrer les erreurs Supabase (projet paused, réseau, etc.)
    if (
      msg.includes('supabase') ||
      msg.includes('Failed to fetch') ||
      msg.includes('Supabase unreachable') ||
      msg.includes('refresh_token')
    ) return;

    logError(
      event.reason instanceof Error ? event.reason : new Error(msg),
      'Unhandled promise rejection'
    );
  });
}

/**
 * Initialise le système de monitoring complet
 */
export function initMonitoring(): void {
  interceptFetch();
  listenGlobalErrors();

  window.addEventListener('load', () => {
    setTimeout(logNavigation, 0);
    setTimeout(() => {
      logCDNInfo().catch(() => {
        // Silencieux
      });
    }, 1000);
  });

  if (import.meta.env.DEV) {
    console.log('[Monitoring] Initialized with circuit breaker');
  }
}

export { sendMonitoringLog };
export type { MonitoringLog };



