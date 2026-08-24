/**
 * Utilitaire de smooth scroll optimisé avec gestion dynamique des offsets
 */

/**
 * Calcule la hauteur totale des banners au-dessus de la navigation
 */
export function calculateBannersHeight(): number {
  let total = 0;
  const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
  if (topBanner) total += topBanner.offsetHeight;
  const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
  if (regAlert) total += regAlert.offsetHeight;
  return total;
}

/**
 * Calcule l'offset total pour le scroll (banners + nav + padding)
 */
export function calculateScrollOffset(): number {
  const bannersHeight = calculateBannersHeight();
  const navHeight = 80; // Hauteur fixe de la navigation
  const padding = 24; // Padding supplémentaire pour l'espacement
  return bannersHeight + navHeight + padding;
}

/**
 * Scroll vers une section avec offset dynamique
 */
export function scrollToSection(sectionId: string, behavior: 'smooth' | 'instant' | 'auto' = 'smooth'): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const offset = calculateScrollOffset();
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = elementTop - offset;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior,
  });
}

/**
 * Met à jour le scroll-padding-top du document
 */
export function updateScrollPadding(): void {
  const offset = calculateScrollOffset();
  document.documentElement.style.scrollPaddingTop = `${offset}px`;
}

/**
 * Met à jour le scroll-margin-top de toutes les sections avec ID
 */
export function updateSectionScrollMargins(): void {
  const offset = calculateScrollOffset();
  document.querySelectorAll<HTMLElement>('section[id], div[id]').forEach((el) => {
    el.style.scrollMarginTop = `${offset}px`;
  });
}

/**
 * Initialise le système de smooth scroll
 */
export function initSmoothScroll(): void {
  // Mise à jour initiale
  updateScrollPadding();
  updateSectionScrollMargins();

  // Observer les changements de DOM pour les banners
  const domObserver = new MutationObserver(() => {
    updateScrollPadding();
    updateSectionScrollMargins();
  });

  domObserver.observe(document.body, {
    childList: true,
    subtree: false,
  });

  // Observer les changements de taille des banners
  const resizeObserver = new ResizeObserver(() => {
    updateScrollPadding();
    updateSectionScrollMargins();
  });

  const topBanner = document.querySelector<HTMLElement>('[data-banner="top"]');
  const regAlert = document.querySelector<HTMLElement>('[data-banner="regulatory"]');
  if (topBanner) resizeObserver.observe(topBanner);
  if (regAlert) resizeObserver.observe(regAlert);

  // Mise à jour au resize de la fenêtre
  const handleResize = () => {
    updateScrollPadding();
    updateSectionScrollMargins();
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // Cleanup function
  return () => {
    domObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('resize', handleResize);
  };
}

/**
 * Gère les liens d'ancrage avec smooth scroll
 */
export function handleAnchorClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href || href === '#') return;

  const sectionId = href.substring(1);
  const element = document.getElementById(sectionId);

  if (element) {
    event.preventDefault();
    scrollToSection(sectionId);

    // Mise à jour de l'URL sans déclencher de scroll
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', href);
    }
  }
}

/**
 * Initialise la gestion des liens d'ancrage
 */
export function initAnchorLinks(): void {
  document.addEventListener('click', handleAnchorClick);

  return () => {
    document.removeEventListener('click', handleAnchorClick);
  };
}



