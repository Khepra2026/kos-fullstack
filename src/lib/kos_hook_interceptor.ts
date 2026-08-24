/**
 * KOS Hook Interceptor — Migration automatique mock → données réelles.
 *
 * Principe : quand un hook mock-only fait un appel fetch() vers l'API REST Supabase
 * (sans données réelles en base), l'intercepteur le redirige vers kos-routing-proxy
 * qui fournit les données réelles depuis les Edge Functions ou n8n.
 *
 * SÉCURITÉ CRITIQUE : Tout le code est dans un try/catch global.
 * Si l'intercepteur plante pour n'importe quelle raison, window.fetch
 * reste intact et React peut charger normalement.
 */

import { supabase } from '@/lib/supabase';

// Guard global : si window.fetch n'est pas disponible, on ne fait rien
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  try {
    // === Liste des hooks mock-only sans fallback Supabase ===
    const MOCK_HOOKS: string[] = [
      'usePhase1Consolidation',
      'usePhase1FoundationsCompliance',
      'usePhase2Securisation',
      'usePhase3Qualite',
      'usePhase4GoLive',
      'usePhase5Expansion',
      'usePhase6Innovation',
      'usePhase7Domination',
      'usePhase8Singularite',
      'usePhaseDataCore',
      'useProductionGoLive',
      'useKOS120TotalQualityAudit',
      'useKOS120Upg1Execution',
      'useKOS120Upg2Execution',
      'useKOS120Upg3Execution',
      'useKOSAgrementOSModule1',
      'useKOSApiIndependence',
      'useKOSAutonomousMediaCommandCenter',
      'useKOSAutonomousStack',
      'useKOSBig4KhepraArchitect',
      'useKOSBudgetUnleashedSprint',
      'useKOSFullSeedCockpit',
      'useKOSGenoraCapitalization',
      'useKOSKhepraArchitect',
      'useKOSRexTemplate',
      'useKOSTotalGovernanceRegulatoryExcellence',
      'useKOSVideoPodcastPublishingPack',
      'useKOSZeroBudgetSprint',
      'useKOSZeroBudgetSprint2',
      'useSeoPerformanceIntelligence',
      'useSystemIntegrityScanner',
      'useFeatureFlags',
    ];

    let cachedToken: string | null = null;
    let tokenExpiry = 0;

    async function refreshToken(): Promise<string | null> {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.access_token) {
          cachedToken = data.session.access_token;
          tokenExpiry = Date.now() + 50 * 60 * 1000;
          return cachedToken;
        }
      } catch {
        // Silencieux
      }
      return null;
    }

    // Rafraîchissement initial — fire-and-forget, ne bloque pas le boot
    refreshToken().catch(() => {/* silencieux */});

    function getToken(): string | null {
      if (Date.now() > tokenExpiry) {
        refreshToken().catch(() => {/* silencieux */});
      }
      return cachedToken;
    }

    function extractHookName(init?: RequestInit): string | null {
      if (!init?.headers) return null;
      const { headers } = init;
      if (headers instanceof Headers) return headers.get('x-hook');
      if (typeof headers === 'object' && !Array.isArray(headers)) {
        const record = headers as Record<string, string>;
        return record['x-hook'] || record['X-Hook'] || null;
      }
      if (Array.isArray(headers)) {
        const found = (headers as [string, string][]).find(
          (pair) => pair[0].toLowerCase() === 'x-hook'
        );
        return found ? found[1] : null;
      }
      return null;
    }

    const originalFetch = window.fetch.bind(window);
    const SUPABASE_URL = (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string) || '';
    const PROXY_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/kos-routing-proxy` : '';

    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> => {
      try {
        if (
          typeof input === 'string' &&
          input.includes('/rest/v1/') &&
          PROXY_URL
        ) {
          const hookName = extractHookName(init);
          if (hookName && MOCK_HOOKS.includes(hookName)) {
            const token = getToken();
            try {
              return await originalFetch(PROXY_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                  function_name: 'get_real_data',
                  payload: { hook: hookName },
                }),
              });
            } catch {
              return originalFetch(input, init);
            }
          }
        }
        return originalFetch(input, init);
      } catch {
        // En cas d'erreur inattendue, tenter le fetch original
        try {
          return await originalFetch(input as RequestInfo, init);
        } catch {
          // Si même ça plante, throw pour que l'appelant gère
          throw new Error(`[KOS Interceptor] fetch failed for: ${String(input).slice(0, 80)}`);
        }
      }
    };
  } catch {
    // L'intercepteur a planté au setup — window.fetch reste intact
    // React peut charger normalement
  }
}

export {};



