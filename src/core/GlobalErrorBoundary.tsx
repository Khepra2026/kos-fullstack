// ═══════════════════════════════════════════════════════════════
// KOS REGTECH AI™ — Global Error Boundary (Pare-feu UI)
// Catch tous les crashs React + Recovery automatique
// ISO 27001 A.12.6.1 — Management of Technical Vulnerabilities
// ═══════════════════════════════════════════════════════════════

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '@/core/logger';

// ── Types ──

interface EBProps {
  children: ReactNode;
  /** Fallback personnalisé — si non fourni, utilise le fallback Big Four par défaut */
  fallback?: ReactNode;
  /** Callback appelé quand une erreur est catchée (ex: envoi vers Sentry) */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Nom du composant ou section pour les logs */
  boundaryName?: string;
}

interface EBState {
  hasError: boolean;
  errorMessage: string;
  errorName: string;
  errorCount: number;
}

// ── Fallback par défaut — design KOS Big Four ──

function DefaultErrorFallback({
  errorMessage,
  errorName,
  errorCount,
  boundaryName,
  onRetry,
  onReset,
}: {
  errorMessage: string;
  errorName: string;
  errorCount: number;
  boundaryName?: string;
  onRetry: () => void;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Bloc icône */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#fef3c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <i className="ri-shield-flash-line" style={{ fontSize: '2.5rem', color: '#d97706' }} />
      </div>

      {/* Titre */}
      <h1
        style={{
          fontFamily: 'Space Grotesk, system-ui, sans-serif',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '0.5rem',
        }}
      >
        Récupération automatique en cours
      </h1>

      {/* Sous-titre */}
      <p
        style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '0.75rem',
          maxWidth: '480px',
          lineHeight: '1.6',
        }}
      >
        Un module a rencontré une erreur et a été isolé. Le reste de l&apos;application continue de fonctionner
        normalement.
        {boundaryName ? ` [${boundaryName}]` : ''}
      </p>

      {/* Détails techniques (collapsed par défaut) */}
      {import.meta.env.DEV && (
        <details
          style={{
            marginBottom: '1.5rem',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'left',
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            border: '1px solid #e5e7eb',
          }}
        >
          <summary
            style={{
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#374151',
              marginBottom: '0.5rem',
            }}
          >
            Détails techniques (DEV uniquement)
          </summary>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#4b5563' }}>
            <p>
              <strong>Erreur :</strong> {errorName}
            </p>
            <p style={{ marginTop: '0.25rem', wordBreak: 'break-all' }}>{errorMessage}</p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Occurrences :</strong> {errorCount}
            </p>
          </div>
        </details>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onRetry}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <i className="ri-refresh-line" />
          Réessayer ce module
        </button>
        <button
          type="button"
          onClick={onReset}
          style={{
            background: 'transparent',
            color: '#374151',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <i className="ri-home-line" />
          Retour à l&apos;accueil
        </button>
      </div>

      {/* Message rassurant */}
      <p
        style={{
          color: '#9ca3af',
          fontSize: '0.8rem',
          marginTop: '2rem',
          maxWidth: '400px',
          lineHeight: '1.5',
        }}
      >
        L&apos;incident a été automatiquement enregistré. Notre équipe technique est notifiée
        {import.meta.env.PROD ? ' et interviendra rapidement.' : ' (simulation — environnement de développement).'}
      </p>
    </div>
  );
}

// ── Error Boundary ──

const log = logger.child({ module: 'error-boundary' });

class GlobalErrorBoundary extends Component<EBProps, EBState> {
  private resetTimeout: ReturnType<typeof setTimeout> | null = null;
  /** Nombre max de retries avant de suggérer un reload complet */
  private static MAX_RETRIES = 3;

  constructor(props: EBProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorName: '',
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EBState> {
    return {
      hasError: true,
      errorMessage: error?.message ?? 'Erreur inconnue',
      errorName: error?.name ?? 'Error',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { boundaryName, onError } = this.props;

    // Incrémenter le compteur d'erreurs
    this.setState((prev) => ({
      errorCount: prev.errorCount + 1,
    }));

    // Log structuré
    log.error(
      `Crash caught${boundaryName ? ` in [${boundaryName}]` : ''}: ${error.message}`,
      error,
      {
        boundaryName: boundaryName ?? 'root',
        componentStack: info.componentStack?.slice(0, 600) ?? 'N/A',
        errorCount: this.state.errorCount + 1,
      },
    );

    // Notifier le callback externe (Sentry, etc.)
    if (onError) {
      try {
        onError(error, info);
      } catch (cbErr) {
        log.warn('onError callback itself threw', { error: String(cbErr) });
      }
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }

  handleRetry = (): void => {
    const { errorCount } = this.state;

    if (errorCount >= GlobalErrorBoundary.MAX_RETRIES) {
      // Trop de crashs consécutifs → reload complet
      log.warn('Max retries exceeded, performing full reload', {
        errorCount,
        maxRetries: GlobalErrorBoundary.MAX_RETRIES,
      });
      window.location.reload();
      return;
    }

    log.info('Retrying component after error', { errorCount });
    this.setState({ hasError: false, errorMessage: '', errorName: '' });
  };

  handleReset = (): void => {
    log.info('User triggered full reset via ErrorBoundary');
    this.setState({ hasError: false, errorMessage: '', errorName: '', errorCount: 0 });
    // Navigation vers l'accueil
    if (typeof window !== 'undefined' && window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE('/');
    } else {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const { fallback, boundaryName } = this.props;

      if (fallback) return fallback;

      return (
        <DefaultErrorFallback
          errorMessage={this.state.errorMessage}
          errorName={this.state.errorName}
          errorCount={this.state.errorCount}
          boundaryName={boundaryName}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;