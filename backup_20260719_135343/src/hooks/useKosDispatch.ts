import { supabase } from '@/lib/supabase';

type AgentName = 'veille' | 'recherche' | 'factcheck' | 'script' | 'video' | 'seo' | 'publish' | 'community' | 'analytics' | 'dispatch';

interface DispatchPayload {
  video_id?: string;
  query?: string;
  regulateur?: string;
  titre?: string;
  [key: string]: unknown;
}

interface AgentResult {
  ok: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

/**
 * Hook unifié pour appeler le routeur central kos-board-unified.
 * Fallback automatique vers les anciennes fonctions si kos-board-unified n'est pas déployé.
 */
export function useKosDispatch() {
  const runAgent = async (agent: AgentName, payload: DispatchPayload): Promise<AgentResult> => {
    // Essaie d'abord kos-board-unified (routeur central)
    try {
      const { data, error } = await supabase.functions.invoke('kos-board-unified', {
        body: { agent, payload },
      });

      if (!error && data) {
        return { ok: true, data: data as Record<string, unknown> };
      }
    } catch {
      // Fallback: kos-board-unified pas encore déployé
    }

    // Fallback vers les anciennes edge functions
    const fallbackFn = getFallbackFn(agent);
    if (!fallbackFn) {
      return { ok: false, error: `Agent ${agent} non disponible (kos-board-unified pas déployé, pas de fallback)` };
    }

    try {
      const { data, error } = await supabase.functions.invoke(fallbackFn, {
        body: buildFallbackPayload(agent, payload),
      });

      if (error) {
        return { ok: false, error: error.message, data: data as Record<string, unknown> };
      }
      return { ok: true, data: data as Record<string, unknown> };
    } catch (err) {
      return { ok: false, error: (err as Error)?.message || 'Erreur réseau' };
    }
  };

  const runFullPipeline = (payload: DispatchPayload) =>
    runAgent('dispatch', payload);

  const runVideoPipeline = (payload: DispatchPayload) =>
    runAgent('video', payload);

  const runSEO = (payload: DispatchPayload) =>
    runAgent('seo', payload);

  const runPublish = (payload: DispatchPayload) =>
    runAgent('publish', payload);

  const runCommunity = (payload: DispatchPayload) =>
    runAgent('community', payload);

  const runAnalytics = (payload: DispatchPayload) =>
    runAgent('analytics', payload);

  return {
    runAgent,
    runFullPipeline,
    runVideoPipeline,
    runSEO,
    runPublish,
    runCommunity,
    runAnalytics,
  };
}

function getFallbackFn(agent: AgentName): string | null {
  const mapping: Partial<Record<AgentName, string>> = {
    veille: 'kos-regulatory-intelligence-engine',
    recherche: 'rag-universal',
    script: 'kos-ai-router-v2',
    video: 'kos-video-master',
    seo: 'kos-seo-audit',
    publish: 'kos-social-master',
    community: 'kos-video-master',
    analytics: 'kos-kpi-recalculation-engine',
    dispatch: 'kos-video-master',
    factcheck: 'kos-ai-router-v2',
  };
  return mapping[agent] || null;
}

function buildFallbackPayload(agent: AgentName, payload: DispatchPayload): Record<string, unknown> {
  switch (agent) {
    case 'video':
    case 'dispatch':
      return {
        query: payload.query || 'Régulation',
        regulateur: payload.regulateur || 'BCEAO',
        titre: payload.titre || '',
        mode: 'full',
      };
    case 'veille':
      return {
        query: payload.query || 'KYC conformité',
        regulateur: payload.regulateur || 'BCEAO',
      };
    case 'recherche':
      return {
        query: payload.query || '',
        regulateur: payload.regulateur || 'BCEAO',
        max_sources: 5,
      };
    case 'seo':
      return { mode: 'quick', target: payload.titre || '' };
    case 'publish':
      return {
        slug: payload.slug || 'bceao-ohada-conformite',
        action: 'generate_batch',
        count: 4,
      };
    default:
      return payload;
  }
}



