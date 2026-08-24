import { lazy, Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';

// --- IMPORTS ---
import { AppRoutes } from './routes/AppRoutes'; 
import i18n from './i18n'; 
import { LegacyRedirects, ServiceLegacyRedirects } from './components/layout/LegacyRedirects';
import ToastProvider from '@/components/ui/ToastProvider';
import { initAllAnalytics, trackPageView } from './utils/analytics';
import GlobalErrorBoundary from './core/GlobalErrorBoundary';
import { logger } from './core/logger';
import { useI18nDetector } from './hooks/useI18nDetector';

// --- COMPOSANTS LAZY ---
const FloatingExpertButton = lazy(() => import('./components/feature/FloatingExpertButton'));
const CookieConsent = lazy(() => import('./components/feature/CookieConsent'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000, refetchOnWindowFocus: false, retry: 2 },
    mutations: { retry: 1 },
  },
});

function AnalyticsRouter() {
  const location = useLocation();
  useI18nDetector();

  useEffect(() => { initAllAnalytics(); }, []);
  useEffect(() => { trackPageView(location.pathname + location.search); }, [location.pathname, location.search]);

  return (
    <>
      <LegacyRedirects />
      <ServiceLegacyRedirects />
      <AppRoutes />
      <Suspense fallback={null}><FloatingExpertButton /></Suspense>
      <Suspense fallback={null}><CookieConsent /></Suspense>
    </>
  );
}

// --- COMPOSANT PRINCIPAL ---
export default function App() {
  return (
    <GlobalErrorBoundary boundaryName="app-root">
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          <BrowserRouter>
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
