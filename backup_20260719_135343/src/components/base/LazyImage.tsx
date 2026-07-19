import { useEffect, useState } from 'react';

// Optimise les URLs d'images Readdy avec WebP — QUALITÉ PRESERVÉE (pas de compression excessive)
function optimizeImageUrl(src: string): string {
  if (!src.includes('readdy.ai/api/search-image')) return src;
  const url = new URL(src);
  if (!url.searchParams.has('format')) url.searchParams.set('format', 'webp');
  return url.toString();
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  objectFit = 'cover' 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const optimizedSrc = optimizeImageUrl(src);

  useEffect(() => {
    const element = document.getElementById(`lazy-${src}`);
    if (!element) return;

    // Charge directement si déjà visible
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 400) {
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
      { rootMargin: '400px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div 
      id={`lazy-${src}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 shimmer" />
      )}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}




