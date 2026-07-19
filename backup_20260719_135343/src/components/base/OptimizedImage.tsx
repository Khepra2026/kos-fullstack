import { useState, useEffect, useRef, useCallback } from 'react';

// ── Types ──
interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;        // ex: "16/9", "4/3", "1/1"
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  placeholder?: 'shimmer' | 'pulse' | 'none';
  rootMargin?: string;         // marge pour l'Intersection Observer (défaut 400px)
  responsive?: boolean;        // génère srcset multi-résolutions (mobile/desktop)
  sizes?: string;              // attribut sizes pour responsive images
  onLoad?: () => void;
  onError?: () => void;
}

// ── Optimise les URLs Readdy avec WebP ──
function optimizeImageUrl(src: string): string {
  if (!src.includes('readdy.ai/api/search-image') && !src.includes('static.readdy.ai/image')) {
    return src;
  }
  try {
    const url = new URL(src);
    if (!url.searchParams.has('format')) url.searchParams.set('format', 'webp');
    if (!url.searchParams.has('quality') && !src.includes('static.readdy.ai')) {
      url.searchParams.set('quality', '85');
    }
    return url.toString();
  } catch {
    return src;
  }
}

// ── Génère srcset responsive à partir d'une URL Readdy ──
function generateSrcSet(src: string): string | undefined {
  if (!src.includes('readdy.ai/api/search-image')) return undefined;
  try {
    const widths = [640, 1024, 1440, 1920];
    return widths
      .map((w) => {
        const url = new URL(src);
        url.searchParams.set('width', String(w));
        url.searchParams.set('w', String(w));
        if (!url.searchParams.has('format')) url.searchParams.set('format', 'webp');
        return `${url.toString()} ${w}w`;
      })
      .join(', ');
  } catch {
    return undefined;
  }
}

// ── Génère un LQIP (Low Quality Image Placeholder) ──
function generateLqip(src: string): string | null {
  if (!src.includes('readdy.ai/api/search-image')) return null;
  try {
    const url = new URL(src);
    url.searchParams.set('w', '40');
    url.searchParams.set('blur', '8');
    url.searchParams.set('format', 'webp');
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * OptimizedImage — Composant image premium pour Khepra Experts
 *
 * Fonctionnalités :
 *   • Lazy-loading intelligent (IntersectionObserver + loading="lazy")
 *   • Placeholder skeleton shimmer pendant le chargement
 *   • LQIP blur-up pour les images Readdy
 *   • Aspect-ratio lock → ZERO Layout Shift (CLS)
 *   • WebP auto + qualité optimisée
 *   • fetchpriority/décoding adaptés au contexte
 *   • GPU compositing pour un rendu fluide
 */
export default function OptimizedImage({
  src,
  alt,
  title,
  className = '',
  width,
  height,
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  fetchpriority = 'auto',
  decoding = 'async',
  placeholder = 'shimmer',
  rootMargin = '400px',
  responsive = false,
  sizes,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Réinitialise l'état quand src change (fallback, etc.) ──
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const optimizedSrc = optimizeImageUrl(src);
  const lqipSrc = generateLqip(src);
  const srcSet = responsive ? generateSrcSet(src) : undefined;
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px';

  // ── Intersection Observer pour le lazy-loading intelligent ──
  useEffect(() => {
    if (loading === 'eager') return;

    const element = containerRef.current;
    if (!element) return;

    // Charge immédiatement si déjà visible + marge
    const rect = element.getBoundingClientRect();
    const marginPx = parseInt(rootMargin, 10) || 400;
    if (rect.top < window.innerHeight + marginPx) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loading, rootMargin]);

  // ── Préchargement via Image() pour les images eager ──
  useEffect(() => {
    if (loading !== 'eager') return;

    const img = new Image();
    img.src = optimizedSrc;
    img.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setHasError(true);
      onError?.();
    };
  }, [optimizedSrc, loading, onLoad, onError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // ── Styles du conteneur avec aspect-ratio lock ──
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : aspectRatio ? 'auto' : '100%',
    aspectRatio: aspectRatio || undefined,
    minHeight: aspectRatio ? undefined : height ? `${height}px` : '48px',
    contain: 'layout paint style',
  };

  // ── Placeholder shimmer ──
  const renderPlaceholder = () => {
    if (hasError) {
      return (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <i className="ri-image-line text-3xl text-gray-300" aria-hidden="true" />
        </div>
      );
    }

    if (lqipSrc && !isLoaded) {
      return (
        <div className="absolute inset-0">
          {/* LQIP flou */}
          <img
            src={lqipSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full transition-opacity duration-700"
            style={{ objectFit, filter: 'blur(8px)', opacity: isLoaded ? 0 : 1 }}
          />
          {/* Shimmer overlay */}
          {placeholder === 'shimmer' && (
            <div
              className="absolute inset-0 shimmer"
              style={{ opacity: isLoaded ? 0 : 0.5, transition: 'opacity 0.5s' }}
              aria-hidden="true"
            />
          )}
          {placeholder === 'pulse' && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              style={{ opacity: isLoaded ? 0 : 0.6, transition: 'opacity 0.5s' }}
              aria-hidden="true"
            />
          )}
        </div>
      );
    }

    return (
      <div className="absolute inset-0">
        {placeholder === 'shimmer' && (
          <div className="absolute inset-0 shimmer" aria-hidden="true" />
        )}
        {placeholder === 'pulse' && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`gpu-layer ${className}`}
      style={containerStyle}
      data-loaded={isLoaded}
      data-error={hasError}
    >
      {!isLoaded && renderPlaceholder()}

      {isInView && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={srcSet ? defaultSizes : undefined}
          alt={alt}
          title={title}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchpriority}
          decoding={decoding}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full h-full transition-opacity duration-500"
          style={{
            objectFit,
            opacity: isLoaded ? 1 : 0,
            imageRendering: 'auto',
            willChange: isLoaded ? 'auto' : 'opacity',
          }}
        />
      )}
    </div>
  );
}

// ── Hook utilitaire : précharge une liste d'images critiques ──
export function preloadImages(urls: string[]): void {
  if (typeof window === 'undefined') return;
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImageUrl(url);
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  });
}

// ── Hook utilitaire : déclenche le lazy-load global sur les img natives ──
export function setupNativeLazyLoad(): void {
  if (typeof window === 'undefined') return;
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      const src = img.getAttribute('data-src');
      if (src) (img as HTMLImageElement).src = src;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '200px', threshold: 0 }
  );

  document.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
}



