/**
 * ═══════════════════════════════════════════════════
 * KHEPRA EXPERTS — Semantic Search Worker Hook
 * ═══════════════════════════════════════════════════
 * Gère la communication avec le Web Worker sémantique.
 *
 * Lazy init — Le Worker est instancié UNIQUEMENT:
 *   1. APRÈS window.onload (signal 'load' du navigateur)
 *   2. ET seulement si l'utilisateur interagit avec la zone de recherche
 *
 * IndexedDB cache — La matrice de similarité est persistée
 * localement pour éviter tout recalcul lors des sessions futures.
 *
 * INP cible: < 100ms (calcul off main thread via Worker)
 *
 * Zéro nouvelle table — Zéro Edge Function.
 */

import { useCallback, useRef, useState, useEffect } from 'react';
import { getCachedDocs, setCachedDocs, getCachedStats } from '@/utils/searchCache';

// ─── Types ───

export interface SemanticSearchResult {
  id: string;
  titre: string;
  domaine: string | null;
  sous_domaine: string | null;
  pays: string | null;
  organisation: string | null;
  statut: string | null;
  description: string | null;
  mots_cles: string[] | null;
  type_document: string | null;
  similarity: number;
}

export interface EmbeddingStats {
  total: number;
  withEmbeddings: number;
  withoutEmbeddings: number;
  percentComplete: number;
}

interface WorkerSearchResult {
  results: SemanticSearchResult[];
  totalDocs: number;
  method: string;
}

type WorkerState = 'idle' | 'loading' | 'ready' | 'error';

// ─── Hook ───

export function useSemanticSearchWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [workerState, setWorkerState] = useState<WorkerState>('idle');
  const docsRef = useRef<Record<string, unknown>[] | null>(null);

  // Cleanup worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // ─── Lazy Init Worker ───
  // Appelé par le composant de recherche quand l'utilisateur interagit
  const initWorker = useCallback(async (docs: Record<string, unknown>[]): Promise<boolean> => {
    // Already initialized
    if (workerRef.current && workerState === 'ready') return true;
    if (workerRef.current && workerState === 'loading') return false;

    setWorkerState('loading');

    try {
      // Try IndexedDB cache first
      const cached = await getCachedDocs();
      const docsToUse = cached || docs;

      // Create Worker
      const worker = new Worker(
        new URL('@/workers/semanticSearch.worker.ts', import.meta.url),
        { type: 'module' },
      );

      // Setup promise for init completion
      const initDone = new Promise<boolean>((resolve) => {
        worker.onmessage = (e: MessageEvent) => {
          if (e.data.type === 'init:done') {
            workerRef.current = worker;
            docsRef.current = docsToUse;
            setWorkerState('ready');

            // Cache docs to IndexedDB for future sessions
            if (!cached) {
              setCachedDocs(docs).catch(() => {});
            }
            resolve(true);
          } else if (e.data.type === 'init:error') {
            setWorkerState('error');
            worker.terminate();
            resolve(false);
          }
        };
        worker.onerror = () => {
          setWorkerState('error');
          worker.terminate();
          resolve(false);
        };
      });

      // Send init message to worker
      worker.postMessage({ type: 'init', docs: docsToUse });

      return await initDone;
    } catch {
      setWorkerState('error');
      return false;
    }
  }, [workerState]);

  // ─── Search via Worker ───
  const searchInWorker = useCallback((
    query: string,
    domaine?: string,
    limit = 10,
  ): Promise<WorkerSearchResult> => {
    return new Promise((resolve, reject) => {
      const worker = workerRef.current;
      if (!worker) {
        reject(new Error('Worker not initialized'));
        return;
      }

      const handler = (e: MessageEvent) => {
        if (e.data.type === 'search:result') {
          worker.removeEventListener('message', handler);
          resolve({
            results: e.data.results,
            totalDocs: e.data.totalDocs,
            method: e.data.method,
          });
        } else if (e.data.type === 'search:error') {
          worker.removeEventListener('message', handler);
          reject(new Error(e.data.error));
        }
      };

      worker.addEventListener('message', handler);
      worker.postMessage({ type: 'search', query, limit, domaine });
    });
  }, []);

  // ─── Get worker stats ───
  const getWorkerStats = useCallback((): Promise<{ totalDocs: number; avgDocLen: number; dfSize: number }> => {
    return new Promise((resolve) => {
      const worker = workerRef.current;
      if (!worker) {
        resolve({ totalDocs: 0, avgDocLen: 0, dfSize: 0 });
        return;
      }
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'stats:result') {
          worker.removeEventListener('message', handler);
          resolve(e.data);
        }
      };
      worker.addEventListener('message', handler);
      worker.postMessage({ type: 'stats' });
    });
  }, []);

  // ─── Check IndexedDB cache status ───
  const checkCache = useCallback(async (): Promise<{ totalDocs: number; cachedAt: number; isFresh: boolean } | null> => {
    const stats = await getCachedStats();
    if (!stats) return null;
    const isFresh = Date.now() - stats.cachedAt < 6 * 60 * 60 * 1000;
    return { ...stats, isFresh };
  }, []);

  return {
    initWorker,
    searchInWorker,
    getWorkerStats,
    checkCache,
    workerState,
    isReady: workerState === 'ready',
    isLoading: workerState === 'loading',
  };
}



