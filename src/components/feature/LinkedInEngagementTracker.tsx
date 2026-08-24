import { useEffect } from 'react';

interface LinkedInEngagementTrackerProps {
  articleId: string;
  articleTitle: string;
  articleUrl: string;
}

/**
 * Tracker d'engagement LinkedIn — DÉPRÉCIÉ
 *
 * ⚠️ Ce composant ne tente plus d'appeler un endpoint inexistant (/api/track-linkedin-share).
 * Le tracking des partages sociaux est désormais géré côté client via Google Analytics
 * (gtag event 'share') et potentiellement via Supabase client directement.
 *
 * Il peut être supprimé une fois toutes les références retirées.
 */
export const LinkedInEngagementTracker = ({
  articleId,
  articleTitle,
  articleUrl,
}: LinkedInEngagementTrackerProps) => {
  useEffect(() => {
    // Tracking GA4 uniquement — pas d'appel réseau vers endpoint inexistant
    const trackLinkedInShare = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: 'LinkedIn',
          content_type: 'article',
          content_id: articleId,
          item_id: articleId,
          article_title: articleTitle,
          article_url: articleUrl,
        });
      }
    };

    const linkedInButtons = document.querySelectorAll('[aria-label*="LinkedIn"], [title*="LinkedIn"]');
    linkedInButtons.forEach((button) => {
      button.addEventListener('click', trackLinkedInShare);
    });

    return () => {
      linkedInButtons.forEach((button) => {
        button.removeEventListener('click', trackLinkedInShare);
      });
    };
  }, [articleId, articleTitle, articleUrl]);

  return null;
};

export default LinkedInEngagementTracker;



