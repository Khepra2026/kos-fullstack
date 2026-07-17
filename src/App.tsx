// ═══════════════════════════════════════════════════════════════
// KOS REGTECH AI™ — App Root (Blindé Anti-Bug)
// GlobalErrorBoundary → QueryClientProvider → BrowserRouter → AppRoutes
// ═══════════════════════════════════════════════════════════════

import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { LegacyRedirects, ServiceLegacyRedirects } from './components/feature/LegacyRedirects';
import ToastProvider from './components/base/Toast';
import GlobalErrorBoundary from '@/core/GlobalErrorBoundary';
import { logger } from '@/core/logger';
import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { initAllAnalytics, trackPageView } from './utils/analytics';
import { useI18nDetector } from '@/hooks/useI18nDetector';

// Features non-critiques — chargées en lazy après le rendu initial
const FloatingExpertButton = lazy(() => import('./components/feature/FloatingExpertButton'));
const CookieConsent = lazy(() => import('./components/feature/CookieConsent'));

// ── Query Client — config anti-bug ──

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (anciennement cacheTime)
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
    mutations: {
      retry: 1,
    },
  },
});

// ── Log init au démarrage ──

logger.info('KOS Regtech AI boot', {
  env: import.meta.env.MODE,
  version: typeof __READDY_VERSION_ID__ !== 'undefined' ? String(__READDY_VERSION_ID__) : 'dev',
  url: typeof window !== 'undefined' ? window.location.href : 'SSR',
});

// ── Analytics Router Wrapper ──

function AnalyticsRouter() {
  const location = useLocation();

  // ── i18n Language Detector — browser + geo-IP ──
  useI18nDetector();

  useEffect(() => {
    initAllAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
    logger.debug('Page view tracked', { path: location.pathname });
  }, [location.pathname, location.search]);

  return (
    <>
      <LegacyRedirects />
      <ServiceLegacyRedirects />
      <AppRoutes />
      <Suspense fallback={null}>
        <FloatingExpertButton />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </>
  );
}

// ── Layout Error Boundary — isole la navigation sans casser toute l'app ──

function ContentErrorFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#fef3c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <i className="ri-error-warning-line" style={{ fontSize: '2rem', color: '#d97706' }} />
      </div>
      <h2
        style={{
          fontFamily: 'Space Grotesk, system-ui, sans-serif',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '0.5rem',
        }}
      >
        Cette section a rencontré une erreur
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: '400px', lineHeight: '1.6' }}>
        Le reste de l&apos;application fonctionne normalement. Vous pouvez réessayer ou naviguer vers une autre page.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            background: 'linear-gradient(135deg, #86BC25, #a5d936)',
            color: '#111',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          <i className="ri-refresh-line" style={{ marginRight: '0.5rem' }} />
          Réessayer
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.REACT_APP_NAVIGATE) {
              window.REACT_APP_NAVIGATE('/');
            } else {
              window.location.reload();
            }
          }}
          style={{
            background: 'transparent',
            color: '#374151',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            fontWeight: 600,
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          <i className="ri-home-line" style={{ marginRight: '0.5rem' }} />
          Retour à l&apos;accueil
        </button>
      </div>
    </div>
  );
}

// ── App ──

function App() {
  return (
    <GlobalErrorBoundary boundaryName="app-root">
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          <BrowserRouter basename={__BASE_PATH__}>
            <QueryClientProvider client={queryClient}>
              <GlobalErrorBoundary boundaryName="content-routes">
                <AnalyticsRouter />
              </GlobalErrorBoundary>
            </QueryClientProvider>
          </BrowserRouter>
        </ToastProvider>
      </I18nextProvider>
    </GlobalErrorBoundary>
  );
}

export default App;