import OptimizedImage from '';
import { useHeroImage } from '@/hooks/useHeroImage';
import { HERO_IMAGES } from '@/utils/heroImages';

interface OptimizedHeroImageProps {
  imageKey: keyof typeof HERO_IMAGES;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  aspectRatio?: string;
  placeholder?: 'shimmer' | 'pulse' | 'none';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedHeroImage — Wrapper qui combine useHeroImage (fallback local/readdy)
 * avec OptimizedImage (lazy-loading, LQIP, aspect-ratio lock, WebP).
 *
 * Utilisez loading="eager" + fetchpriority="high" pour les images hero (above-the-fold).
 * Utilisez loading="lazy" (défaut) pour les images below-the-fold.
 */
export default function OptimizedHeroImage({
  imageKey,
  className = '',
  objectFit = 'cover',
  loading = 'lazy',
  fetchpriority = 'auto',
  aspectRatio,
  placeholder = 'shimmer',
  onLoad,
  onError,
}: OptimizedHeroImageProps) {
  const { src, onError: heroOnError, config } = useHeroImage(imageKey);

  const handleError = () => {
    heroOnError();
    onError?.();
  };

  return (
    <OptimizedImage
      src={src}
      alt={config.altFr || config.altEn || ''}
      className={className}
      width={config.width}
      height={config.height}
      aspectRatio={aspectRatio || `${config.width}/${config.height}`}
      objectFit={objectFit}
      loading={loading}
      fetchpriority={fetchpriority}
      placeholder={placeholder}
      onLoad={onLoad}
      onError={handleError}
    />
  );
}



