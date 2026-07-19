import { useState, useEffect } from 'react';

// Optimise les URLs d'images Readdy avec WebP — QUALITÉ PRESERVÉE (pas de compression excessive)
function optimizeImageUrl(src: string): string {
  if (!src.includes('readdy.ai/api/search-image')) return src;
  const url = new URL(src);
  if (!url.searchParams.has('format')) url.searchParams.set('format', 'webp');
  return url.toString();
}

interface ProgressiveImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  placeholderColor?: string;
}

export function ProgressiveImage({
  src,
  alt,
  title,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority = 'auto',
  placeholderColor = 'bg-gray-200'
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const optimizedSrc = optimizeImageUrl(src);

  useEffect(() => {
    const img = new Image();
    img.src = optimizedSrc;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [optimizedSrc]);

  if (hasError) {
    return (
      <div 
        className={`${className} ${placeholderColor} flex items-center justify-center`}
        style={{ width, height }}
      >
        <i className="ri-image-line text-4xl text-gray-400" aria-hidden="true"></i>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      {!isLoaded && (
        <div 
          className={`absolute inset-0 ${placeholderColor} animate-pulse`}
          aria-hidden="true"
        />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        title={title}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        width={width}
        height={height}
        loading={loading}
        fetchpriority={fetchpriority}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}




