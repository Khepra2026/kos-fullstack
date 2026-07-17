import { Link, LinkProps } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

interface PrefetchLinkProps extends LinkProps {
  prefetch?: 'hover' | 'visible' | 'intent' | 'none';
  prefetchDelay?: number;
}

/**
 * Composant Link optimisé avec prefetching intelligent
 * - hover: Précharge au survol
 * - visible: Précharge quand visible dans le viewport
 * - intent: Précharge sur hover avec délai (meilleure UX)
 * - none: Pas de préchargement
 */
export function PrefetchLink({
  prefetch = 'intent',
  prefetchDelay = 100,
  children,
  to,
  ...props
}: PrefetchLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isPrefetched, setIsPrefetched] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handlePrefetch = () => {
    if (isPrefetched || prefetch === 'none') return;

    const href = typeof to === 'string' ? to : to.pathname || '';
    
    // Créer un link prefetch
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    
    // Vérifier si déjà préchargé
    const existing = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
    if (!existing) {
      document.head.appendChild(link);
      setIsPrefetched(true);
    }
  };

  useEffect(() => {
    if (!linkRef.current || prefetch === 'none') return;

    // Prefetch sur visibilité
    if (prefetch === 'visible') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handlePrefetch();
            observer.disconnect();
          }
        },
        { rootMargin: '100px' }
      );

      observer.observe(linkRef.current);
      return () => observer.disconnect();
    }

    // Prefetch sur hover immédiat
    if (prefetch === 'hover') {
      const handleMouseEnter = () => handlePrefetch();
      linkRef.current.addEventListener('mouseenter', handleMouseEnter);
      return () => linkRef.current?.removeEventListener('mouseenter', handleMouseEnter);
    }

    // Prefetch sur intent (hover avec délai)
    if (prefetch === 'intent') {
      const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(handlePrefetch, prefetchDelay);
      };
      const handleMouseLeave = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };

      linkRef.current.addEventListener('mouseenter', handleMouseEnter);
      linkRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        linkRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        linkRef.current?.removeEventListener('mouseleave', handleMouseLeave);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [prefetch, prefetchDelay, isPrefetched]);

  return (
    <Link ref={linkRef} to={to} {...props}>
      {children}
    </Link>
  );
}