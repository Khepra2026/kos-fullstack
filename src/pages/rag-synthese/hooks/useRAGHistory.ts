import { useState, useCallback } from 'react';
import type { PinnedSearch } from '@/pages/rag-synthese/types';

const STORAGE_KEY = 'khepra-rag-history';
const MAX_HISTORY = 20;

export function useRAGHistory() {
  const [history, setHistory] = useState<PinnedSearch[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PinnedSearch[];
        return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const saveToStorage = useCallback((items: PinnedSearch[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or unavailable
    }
  }, []);

  const pinSearch = useCallback((search: Omit<PinnedSearch, 'id' | 'timestamp'>) => {
    const entry: PinnedSearch = {
      ...search,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.query !== entry.query);
      const next = [entry, ...filtered].slice(0, MAX_HISTORY);
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const unpinSearch = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const isPinned = useCallback((query: string) => {
    return history.some((h) => h.query === query);
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveToStorage([]);
  }, [saveToStorage]);

  return { history, pinSearch, unpinSearch, isPinned, clearHistory };
}