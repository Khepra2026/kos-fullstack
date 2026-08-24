import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  minHeight?: string | number;
  rootMargin?: string;
  threshold?: number;
  skeleton?: ReactNode;
  id?: string;
}

const DEFAULT_SKELETON = (
  <div className="w-full h-full animate-pulse bg-gray-100/50" />
);

/**
 * LazySection — Charge son contenu uniquement quand il approche du viewport.
 *
 * Usage : entourez les sections sous le fold avec <LazySection> pour réduire
 * le travail du navigateur au premier paint et améliorer le LCP / TTI.
 *
 * - minHeight : hauteur approximative pour éviter le CLS (Cumulative Layout Shift)
 * - rootMargin : marge d'anticipation (défaut 400px = charge 400px avant d'être visible)
 * - skeleton : élément affiché tant que la section n'est pas chargée
 */
export default function LazySection({
  children,
  className = '',
  minHeight = '400px',
  rootMargin = '400px',
  threshold = 0,
  skeleton = DEFAULT_SKELETON,
  id,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Si la section est déjà dans le viewport au mount (ex: refresh au milieu de page)
    const rect = el.getBoundingClientRect();
    // On charge si dans le viewport + marge (parse rootMargin en px)
    const marginPx = parseInt(rootMargin, 10) || 400;
    if (rect.top < window.innerHeight + marginPx) {
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      data-cv={!hasBeenVisible ? 'auto' : 'visible'}
      style={
        !hasBeenVisible
          ? { minHeight, contain: 'layout paint style', contentVisibility: 'auto', containIntrinsicSize: `auto ${typeof minHeight === 'number' ? `${minHeight}px` : minHeight}` }
          : undefined
      }
    >
      {isVisible ? children : skeleton}
    </div>
  );
}



