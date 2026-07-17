/**
 * ═══════════════════════════════════════════════════
 * KHEPRA EXPERTS — Compliance Score Preloader
 * ═══════════════════════════════════════════════════
 * Wrapper qui utilise IntersectionObserver pour
 * déclencher le preload du module Compliance Score
 * dès que l'élément entre dans le viewport.
 *
 * INP-friendly: tout est asynchrone, zéro blocage.
 * Singleton: un seul preload, même si plusieurs
 * instances sont montées sur la page.
 */

import { useEffect, useRef } from 'react';

let preloadPromise: Promise<void> | null = null;
let preloaded = false;

async function singletonPreload(): Promise<void> {
  if (preloaded || preloadPromise) return preloadPromise;
  preloadPromise = (async () => {
    try {
      await import('@/mocks/khepraComplianceScore');
      preloaded = true;
    } catch {
      preloaded = false;
      preloadPromise = null;
    }
  })();
  return preloadPromise;
}

interface ComplianceScorePreloaderProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export default function ComplianceScorePreloader({
  children,
  className,
  rootMargin = '300px 0px',
  threshold = 0.01,
}: ComplianceScorePreloaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || preloaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          singletonPreload();
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}