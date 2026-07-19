/**
 * ═══════════════════════════════════════════════════
 * KHEPRA EXPERTS — Compliance Score Lazy Loader
 * ═══════════════════════════════════════════════════
 * Charge dynamiquement le module de calcul du Compliance
 * Score UNIQUEMENT quand l'utilisateur clique sur
 * "Démarrer le Diagnostic" ou "Tester ma conformité".
 *
 * Avant chargement: squelette HTML/CSS statique (CLS 0.0)
 * Après clic: dynamic import() du module de scoring
 *
 * Singleton module-level: le preload est partagé entre
 * le ComplianceScorePreloader (IntersectionObserver) et
 * ce hook — une seule requête réseau, zéro duplication.
 *
 * Zéro nouvelle table — Zéro Edge Function.
 * Bundle JS principal allégé de ~15KB.
 */

import { useState, useCallback } from 'react';

// ─── Types ───

export interface ComplianceScoreModule {
  complianceDomains: any[];
  complianceQuestions: any[];
  calculateComplianceScore: (answers: Record<string, number>) => any;
  complianceScoreStats: Record<string, any>;
}

// ─── Module-level singleton (partagé avec ComplianceScorePreloader) ───

let preloadPromise: Promise<ComplianceScoreModule> | null = null;
let cachedModule: ComplianceScoreModule | null = null;

async function singletonLoad(): Promise<ComplianceScoreModule> {
  if (cachedModule) return cachedModule;
  if (preloadPromise) return preloadPromise;

  preloadPromise = (async () => {
    const mod = await import('@/mocks/khepraComplianceScore');
    cachedModule = {
      complianceDomains: mod.complianceDomains,
      complianceQuestions: mod.complianceQuestions,
      calculateComplianceScore: mod.calculateComplianceScore,
      complianceScoreStats: mod.complianceScoreStats,
    };
    return cachedModule;
  })();

  return preloadPromise;
}

// ─── Hook ───

export function useComplianceScoreLazy() {
  const [module, setModule] = useState<ComplianceScoreModule | null>(cachedModule);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preloaded, setPreloaded] = useState(!!cachedModule);

  // Preload: appelé via InteractionObserver quand le bloc entre dans l'écran
  const preload = useCallback(async () => {
    if (module || preloaded || loading) return;
    setPreloaded(true);
    try {
      const mod = await singletonLoad();
      setModule(mod);
    } catch {
      setPreloaded(false);
    }
  }, [module, preloaded, loading]);

  // Load: appelé au clic sur "Démarrer le Diagnostic"
  const load = useCallback(async (): Promise<ComplianceScoreModule | null> => {
    if (module) return module;
    setLoading(true);
    setError(null);
    try {
      const mod = await singletonLoad();
      setModule(mod);
      setLoading(false);
      return mod;
    } catch (err) {
      setError('Impossible de charger le module de scoring. Veuillez réessayer.');
      setLoading(false);
      return null;
    }
  }, [module]);

  return { module, loading, error, preload, load, isLoaded: module !== null };
}



