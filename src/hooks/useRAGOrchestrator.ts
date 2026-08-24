import { useState, useCallback } from 'react';

interface RAGStatus {
  total_documents: number;
  enriched_from_sources: number;
  manually_entered: number;
  sources: Record<string, number>;
  domaines: Record<string, number>;
}

interface RAGEnrichResult {
  success: boolean;
  mode: string;
  duration_seconds: number;
  stats: {
    documents_collected: number;
    documents_skipped: number;
    documents_failed: number;
    total_in_base: number;
  };
  log: string[];
}

interface UseRAGOrchestratorReturn {
  status: RAGStatus | null;
  result: RAGEnrichResult | null;
  loading: boolean;
  error: string | null;
  fetchStatus: () => Promise<void>;
  runDryRun: (source?: string | null) => Promise<void>;
  runCollect: (source?: string | null) => Promise<void>;
}

export function useRAGOrchestrator(): UseRAGOrchestratorReturn {
  const [status, setStatus] = useState<RAGStatus | null>(null);
  const [result, setResult] = useState<RAGEnrichResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

  const callKnowledgeManager = useCallback(
    async (operation: string, mode?: string, source?: string | null) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      try {
        const resp = await fetch(`${supabaseUrl}/functions/v1/kos-knowledge-manager`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
          },
          body: JSON.stringify({ operation, mode, source }),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`HTTP ${resp.status}: ${text}`);
        }
        return resp.json();
      } catch (err) {
        clearTimeout(timeout);
        if (err instanceof Error && err.name === 'AbortError') {
          throw new Error('Timeout — la réponse du serveur a dépassé 60s. Le moteur RAG est peut-être surchargé. Réessayez ou sélectionnez une source unique.');
        }
        throw err;
      }
    },
    [supabaseUrl, anonKey]
  );

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callKnowledgeManager('rag_status');
      if (data.success && data.stats) {
        setStatus(data.stats);
      } else {
        throw new Error(data.error || 'Réponse invalide');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [callKnowledgeManager]);

  const runDryRun = useCallback(
    async (source?: string | null) => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const data = await callKnowledgeManager('enrich_rag_sources', 'dry-run', source);
        if (data.success && data.resultats) {
          setResult({
            success: true,
            mode: 'dry-run',
            duration_seconds: data.resultats.duration_seconds || 0,
            stats: data.resultats.stats || data.resultats,
            log: data.resultats.log || data.log || [],
          });
        } else {
          throw new Error(data.error || 'Dry-run a échoué');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    },
    [callKnowledgeManager]
  );

  const runCollect = useCallback(
    async (source?: string | null) => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const data = await callKnowledgeManager('enrich_rag_sources', 'incremental', source);
        if (data.success && data.resultats) {
          setResult({
            success: true,
            mode: 'incremental',
            duration_seconds: data.resultats.duration_seconds || 0,
            stats: data.resultats.stats || data.resultats,
            log: data.resultats.log || data.log || [],
          });
        } else {
          throw new Error(data.error || 'Collecte a échoué');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    },
    [callKnowledgeManager]
  );

  return {
    status,
    result,
    loading,
    error,
    fetchStatus,
    runDryRun,
    runCollect,
  };
}



