import { useState } from 'react';
import { HERO_IMAGES, type HeroImageConfig } from '@/utils/heroImages';

interface UseHeroImageResult {
  src: string;
  onError: () => void;
  config: HeroImageConfig;
}

/**
 * Hook pour charger une image hero avec fallback automatique.
 * Tente d'abord le chemin local WebP, puis bascule sur readdy.ai si 404.
 *
 * @example
 * const { src, onError, config } = useHeroImage('home-hero-bg');
 * <img src={src} onError={onError} alt={config.altFr} width={config.width} height={config.height} />
 */
export function useHeroImage(key: keyof typeof HERO_IMAGES): UseHeroImageResult {
  const config = HERO_IMAGES[key];
  const [src, setSrc] = useState<string>(config.local);

  const onError = () => {
    if (src !== config.fallback) {
      setSrc(config.fallback);
    }
  };

  return { src, onError, config };
}




