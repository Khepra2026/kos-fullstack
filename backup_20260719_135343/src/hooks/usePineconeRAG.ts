import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { RegulatoryIntent } from '@/pages/kos-cognitive-os/types';

export interface PineconeRAGSource {
  id: string;
  score: number;
  regScore: number;
  fraicheur: number;
  metadata: {
    type: string;
    priority: number;
    juridiction: string;
    metier: string[];
    referentiel: string;
    date: string;
    citations: number;
    qualite_doc: number;
  };
}

export interface PineconeRAGResult {
  results: PineconeRAGSource[];
  evidenceValid: boolean;
  totalCandidates: number;
  rerankedCount: number;
}

export interface UsePineconeRAGState {
  data: PineconeRAGResult | null;
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
}

/**
 * Hook qui appelle l'Edge Function kos-pinecone-rag pour la recherche vectorielle
 * Pinecone + embeddings OpenAI + Dynamic Regulatory Ranking 8 facteurs.
 *
 * Si l'Edge Function n'est pas disponible (clés manquantes, erreur réseau), le hook
 * signale `usingFallback: true` pour que le composant puisse basculer sur le RAGEngine in-memory.
 */
export function usePineconeRAG(
  query: string,
  intent: RegulatoryIntent,
  ontologyRefs: string[],
): UsePineconeRAGState {
  const [data, setData] = useState<PineconeRAGResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query || !intent) {
      setLoading(false);
      return;
    }

    // Debounce pour éviter les appels trop rapides pendant la frappe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      try {
        const { data: fnData, error: fnError } = await supabase.functions.invoke(
          'kos-pinecone-rag',
          {
            body: { query, intent, ontologyRefs },
          },
        );

        if (fnError) {
          throw fnError;
        }

        if (fnData?.fallback) {
          // L'Edge Function signale qu'elle n'est pas prête (clés manquantes, etc.)
          setUsingFallback(true);
          setData(null);
        } else if (fnData?.results && Array.isArray(fnData.results)) {
          // Validate and sanitize each result to prevent NaN propagation
          const sanitizedResults = fnData.results.map((r: Record<string, unknown>) => {
            const meta = (r.metadata && typeof r.metadata === 'object' ? r.metadata : {}) as Record<string, unknown>;
            return {
              id: typeof r.id === 'string' ? r.id : `result-${Math.random().toString(36).slice(2, 10)}`,
              score: typeof r.score === 'number' && !isNaN(r.score) ? r.score : 0.3,
              regScore: typeof r.regScore === 'number' && !isNaN(r.regScore) ? r.regScore : 0.5,
              fraicheur: typeof r.fraicheur === 'number' && !isNaN(r.fraicheur) ? r.fraicheur : 0.5,
              metadata: {
                type: typeof meta.type === 'string' ? meta.type : 'BigFour',
                priority: typeof meta.priority === 'number' && meta.priority >= 1 && meta.priority <= 6 ? meta.priority : 5,
                juridiction: typeof meta.juridiction === 'string' ? meta.juridiction : 'BCEAO',
                metier: Array.isArray(meta.metier) ? meta.metier : [],
                referentiel: typeof meta.referentiel === 'string' ? meta.referentiel : '',
                date: typeof meta.date === 'string' ? meta.date : '',
                citations: typeof meta.citations === 'number' ? meta.citations : 0,
                qualite_doc: typeof meta.qualite_doc === 'number' ? meta.qualite_doc : 0.6,
              },
            };
          });
          setData({
            results: sanitizedResults,
            evidenceValid: typeof fnData.evidenceValid === 'boolean' ? fnData.evidenceValid : true,
            rerankedCount: typeof fnData.rerankedCount === 'number' ? fnData.rerankedCount : sanitizedResults.length,
            totalCandidates: typeof fnData.totalCandidates === 'number' ? fnData.totalCandidates : sanitizedResults.length,
          });
        } else {
          setData(fnData as PineconeRAGResult);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        console.warn('[usePineconeRAG] Edge Function unavailable, falling back to in-memory:', message);
        setError(message);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, intent, ontologyRefs]);

  return { data, loading, error, usingFallback };
}



