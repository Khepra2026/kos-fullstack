/**
 * Système de suivi et gestion des erreurs
 * Error tracking, logging et reporting
 */

interface ErrorReport {
  message: string;
  stack?: string;
  type: 'error' | 'warning' | 'info';
  timestamp: number;
  url: string;
  userAgent: string;
  context?: Record<string, any>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

/**
 * Classe de gestion centralisée des erreurs
 */
export class ErrorTracker {
  private errors: ErrorReport[] = [];
  private maxErrors: number = 50;
  private endpoint?: string;

  constructor(endpoint?: string) {
    this.endpoint = endpoint;
    this.setupGlobalHandlers();
  }

  /**
   * Configure les gestionnaires d'erreurs globaux
   */
  private setupGlobalHandlers(): void {
    // Erreurs JavaScript non capturées
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        type: 'error',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Promesses rejetées non gérées
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        type: 'error',
        context: {
          promise: event.promise,
        },
      });
    });

    // Erreurs de ressources (images, scripts, etc.)
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        this.captureError({
          message: `Resource failed to load: ${target.tagName}`,
          type: 'warning',
          context: {
            src: (target as any).src || (target as any).href,
            tagName: target.tagName,
          },
        });
      }
    }, true);
  }

  /**
   * Capture une erreur
   */
  captureError(error: Partial<ErrorReport>): void {
    const report: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      type: error.type || 'error',
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: error.context,
    };

    this.errors.push(report);

    // Limiter le nombre d'erreurs stockées
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Logger en développement
    if (import.meta.env.DEV) {
      console.error('[ErrorTracker]', report);
    }

    // Envoyer au serveur en production
    if (import.meta.env.PROD && this.endpoint) {
      this.sendToServer(report);
    }
  }

  /**
   * Envoie l'erreur au serveur
   */
  private async sendToServer(report: ErrorReport): Promise<void> {
    if (!this.endpoint) return;

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      });
    } catch (error) {
      console.error('[ErrorTracker] Failed to send error:', error);
    }
  }

  /**
   * Récupère toutes les erreurs
   */
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  /**
   * Vide le journal des erreurs
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Capture une erreur avec contexte personnalisé
   */
  logError(message: string, context?: Record<string, any>): void {
    this.captureError({
      message,
      type: 'error',
      context,
    });
  }

  /**
   * Capture un avertissement
   */
  logWarning(message: string, context?: Record<string, any>): void {
    this.captureError({
      message,
      type: 'warning',
      context,
    });
  }

  /**
   * Capture une info
   */
  logInfo(message: string, context?: Record<string, any>): void {
    this.captureError({
      message,
      type: 'info',
      context,
    });
  }
}

/**
 * Wrapper pour try-catch avec logging automatique
 */
export async function tryCatch<T>(
  fn: () => Promise<T> | T,
  errorMessage?: string,
  context?: Record<string, any>
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    errorTracker.captureError({
      message: errorMessage || (error as Error).message,
      stack: (error as Error).stack,
      type: 'error',
      context: {
        ...context,
        originalError: error,
      },
    });
    return null;
  }
}

/**
 * Décorateur pour capturer les erreurs de méthodes
 */
export function catchErrors(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      errorTracker.captureError({
        message: `Error in ${propertyKey}: ${(error as Error).message}`,
        stack: (error as Error).stack,
        type: 'error',
        context: {
          method: propertyKey,
          args,
        },
      });
      throw error;
    }
  };

  return descriptor;
}

/**
 * Composant Error Boundary pour React
 */
export class ErrorBoundary {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  static componentDidCatch(error: Error, errorInfo: any): void {
    errorTracker.captureError({
      message: error.message,
      stack: error.stack,
      type: 'error',
      context: {
        componentStack: errorInfo.componentStack,
        errorInfo,
      },
    });
  }
}

/**
 * Monitore les erreurs de performance
 */
export function monitorPerformanceErrors(): void {
  if (!window.performance) return;

  // Surveiller les ressources qui échouent
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resourceEntry = entry as PerformanceResourceTiming;
      
      // Détecter les ressources lentes (> 3s)
      if (resourceEntry.duration > 3000) {
        errorTracker.logWarning('Slow resource detected', {
          name: resourceEntry.name,
          duration: resourceEntry.duration,
          type: resourceEntry.initiatorType,
        });
      }

      // Détecter les ressources volumineuses (> 1MB)
      if (resourceEntry.transferSize > 1048576) {
        errorTracker.logWarning('Large resource detected', {
          name: resourceEntry.name,
          size: resourceEntry.transferSize,
          type: resourceEntry.initiatorType,
        });
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    // Observer non supporté
  }
}

/**
 * Monitore les erreurs réseau
 */
export function monitorNetworkErrors(): void {
  const originalFetch = window.fetch;

  window.fetch = async function (...args: Parameters<typeof fetch>): Promise<Response> {
    try {
      const response = await originalFetch(...args);

      // Logger les erreurs HTTP
      if (!response.ok) {
        errorTracker.logWarning('HTTP Error', {
          url: args[0],
          status: response.status,
          statusText: response.statusText,
        });
      }

      return response;
    } catch (error) {
      errorTracker.captureError({
        message: `Network error: ${(error as Error).message}`,
        stack: (error as Error).stack,
        type: 'error',
        context: {
          url: args[0],
          options: args[1],
        },
      });
      throw error;
    }
  };
}

/**
 * Génère un rapport d'erreurs
 */
export function generateErrorReport(): {
  totalErrors: number;
  errorsByType: Record<string, number>;
  recentErrors: ErrorReport[];
  topErrors: Array<{ message: string; count: number }>;
} {
  const errors = errorTracker.getErrors();

  // Compter par type
  const errorsByType = errors.reduce((acc, error) => {
    acc[error.type] = (acc[error.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Erreurs récentes (dernières 10)
  const recentErrors = errors.slice(-10);

  // Top erreurs par fréquence
  const errorCounts = errors.reduce((acc, error) => {
    acc[error.message] = (acc[error.message] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topErrors = Object.entries(errorCounts)
    .map(([message, count]) => ({ message, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalErrors: errors.length,
    errorsByType,
    recentErrors,
    topErrors,
  };
}

/**
 * Initialise le système de tracking d'erreurs
 */
export function initErrorTracking(endpoint?: string): void {
  // Créer l'instance globale
  if (!(window as any).__errorTracker) {
    (window as any).__errorTracker = new ErrorTracker(endpoint);
  }

  // Monitorer les erreurs de performance
  monitorPerformanceErrors();

  // Monitorer les erreurs réseau
  monitorNetworkErrors();

  // Logger l'initialisation
  if (import.meta.env.DEV) {
    console.log('[ErrorTracking] Initialized');
  }
}

// Instance singleton
export const errorTracker = new ErrorTracker(
  import.meta.env.VITE_ERROR_TRACKING_ENDPOINT
);

export default errorTracker;



