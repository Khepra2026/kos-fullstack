import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LinkedInArticleOptimizerProps {
  title: string;
  description: string;
  imageUrl?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  category?: string;
}

/**
 * Composant d'optimisation LinkedIn pour articles — DÉPRÉCIÉ
 *
 * ⚠️ Ce composant ne doit PLUS injecter de meta tags dans le <head>.
 * Toutes les balises Open Graph, Twitter Card et Schema.org sont gérées
 * par SeoHead.tsx qui est le seul responsable du <head> du document.
 *
 * En gardant ce composant comme export vide, on évite les erreurs de build
 * si une ancienne page l'importe encore. Il peut être supprimé une fois
 * toutes les références retirées.
 */
export const LinkedInArticleOptimizer = (_props: LinkedInArticleOptimizerProps) => {
  const { i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _isEn = i18n.language === 'en';

  // Aucune injection de meta tags — SeoHead est le maître unique
  return null;
};

export default LinkedInArticleOptimizer;



