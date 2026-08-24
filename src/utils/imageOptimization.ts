/**
 * Utilitaires d'optimisation d'images
 * Lazy loading, formats modernes (WebP/AVIF), responsive images
 */

interface ImageOptimizationOptions {
  lazy?: boolean;
  format?: 'webp' | 'avif' | 'auto';
  quality?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Génère un srcset responsive pour différentes tailles
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Génère les attributs sizes pour responsive images
 */
export function generateSizes(breakpoints: { [key: string]: string }): string {
  return Object.entries(breakpoints)
    .map(([media, size]) => `${media} ${size}`)
    .join(', ');
}

/**
 * Détecte le support WebP/AVIF du navigateur
 */
export async function detectImageFormatSupport(): Promise<{
  webp: boolean;
  avif: boolean;
}> {
  const webpSupport = await checkImageSupport(
    'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
  );
  
  const avifSupport = await checkImageSupport(
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  );

  return { webp: webpSupport, avif: avifSupport };
}

/**
 * Vérifie le support d'un format d'image
 */
function checkImageSupport(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}

/**
 * Précharge les images critiques
 */
export function preloadCriticalImages(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  });
}

/**
 * Lazy load des images avec Intersection Observer
 */
export function setupLazyLoading(): void {
  if (!('IntersectionObserver' in window)) {
    // Fallback pour navigateurs anciens
    loadAllImages();
    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px', // Charger 50px avant d'entrer dans le viewport
      threshold: 0.01,
    }
  );

  // Observer toutes les images avec data-src
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Charge une image lazy
 */
function loadImage(img: HTMLImageElement): void {
  const src = img.getAttribute('data-src');
  const srcset = img.getAttribute('data-srcset');

  if (src) {
    img.src = src;
    img.removeAttribute('data-src');
  }

  if (srcset) {
    img.srcset = srcset;
    img.removeAttribute('data-srcset');
  }

  img.classList.add('loaded');
}

/**
 * Fallback : charge toutes les images immédiatement
 */
function loadAllImages(): void {
  document.querySelectorAll('img[data-src]').forEach((img) => {
    loadImage(img as HTMLImageElement);
  });
}

/**
 * Optimise les images de fond CSS
 */
export function optimizeBackgroundImages(): void {
  const elements = document.querySelectorAll('[data-bg]');
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => loadBackgroundImage(el as HTMLElement));
    return;
  }

  const bgObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadBackgroundImage(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50px 0px' }
  );

  elements.forEach((el) => bgObserver.observe(el));
}

/**
 * Charge une image de fond
 */
function loadBackgroundImage(element: HTMLElement): void {
  const bg = element.getAttribute('data-bg');
  if (bg) {
    element.style.backgroundImage = `url(${bg})`;
    element.removeAttribute('data-bg');
    element.classList.add('bg-loaded');
  }
}

/**
 * Compresse une image côté client (avant upload)
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Redimensionner si nécessaire
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Image load failed'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

/**
 * Calcule le ratio d'aspect optimal
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Génère un placeholder blur (LQIP - Low Quality Image Placeholder)
 */
export function generateBlurPlaceholder(imageUrl: string): string {
  // En production, ceci devrait être généré côté serveur
  // Pour l'instant, retourne une version très petite
  return `${imageUrl}?w=20&blur=10`;
}

/**
 * Précharge les images au survol (pour améliorer UX)
 */
export function setupHoverPreload(): void {
  document.querySelectorAll('[data-hover-preload]').forEach((element) => {
    element.addEventListener('mouseenter', function(this: HTMLElement) {
      const preloadUrl = this.getAttribute('data-hover-preload');
      if (preloadUrl) {
        const img = new Image();
        img.src = preloadUrl;
      }
    }, { once: true });
  });
}

/**
 * Initialise toutes les optimisations d'images
 */
export function initImageOptimizations(): void {
  // Lazy loading
  setupLazyLoading();
  
  // Background images lazy
  optimizeBackgroundImages();
  
  // Hover preload
  setupHoverPreload();
  
  // Réinitialiser après changement de route
  if (window.REACT_APP_NAVIGATE) {
    const originalNavigate = window.REACT_APP_NAVIGATE;
    window.REACT_APP_NAVIGATE = (...args: any[]) => {
      originalNavigate(...args);
      setTimeout(() => {
        setupLazyLoading();
        optimizeBackgroundImages();
        setupHoverPreload();
      }, 100);
    };
  }
}

export default {
  generateSrcSet,
  generateSizes,
  detectImageFormatSupport,
  preloadCriticalImages,
  setupLazyLoading,
  optimizeBackgroundImages,
  compressImage,
  calculateAspectRatio,
  generateBlurPlaceholder,
  setupHoverPreload,
  initImageOptimizations,
};



