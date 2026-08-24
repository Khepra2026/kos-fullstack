import { useCallback } from 'react';
import { getOgPreviewUrl } from '@/utils/ogPreview';
import type { SocialQueueItem } from '@/mocks/socialAutomationQueue';

// ═══════════════════════════════════════════════════════════════
// KOS LinkedIn Share Hook — Générateur de partages LinkedIn
// Tous les partages sont rattachés à la page entreprise KHEPRA EXPERTS
// URL canonique : https://www.linkedin.com/company/khepra-experts/
// ═══════════════════════════════════════════════════════════════

export const LINKEDIN_COMPANY_HANDLE = 'khepra-experts';
export const LINKEDIN_COMPANY_ID = '111941349';
export const LINKEDIN_COMPANY_PAGE = `https://www.linkedin.com/company/${LINKEDIN_COMPANY_HANDLE}/`;
export const LINKEDIN_ADMIN_POSTS = `https://www.linkedin.com/company/${LINKEDIN_COMPANY_ID}/admin/page-posts/published/`;
export const LINKEDIN_COMPANY_NAME = 'KHEPRA EXPERTS';

export interface LinkedInShareResult {
  shareUrl: string;
  ogPreviewUrl: string;
  sourceUrl: string;
  hashtags: string[];
  companyPage: string;
  adminPosts: string;
}

/**
 * Construit l'URL de partage LinkedIn complète avec OG proxy, hashtags et rattachement page entreprise.
 * Le bot LinkedIn scrapera l'URL OG preview et affichera la preview riche.
 */
export function buildLinkedInShareUrl(post: SocialQueueItem): LinkedInShareResult {
  const sourceUrl = post.source_url || 'https://khepraexperts.com';
  const ogPreviewUrl = getOgPreviewUrl(sourceUrl);
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogPreviewUrl)}`;

  return {
    shareUrl,
    ogPreviewUrl,
    sourceUrl,
    hashtags: post.hashtags || [],
    companyPage: LINKEDIN_COMPANY_PAGE,
    adminPosts: LINKEDIN_ADMIN_POSTS,
  };
}

/**
 * Construit l'URL de partage LinkedIn avec les hashtags dans le texte
 * Format : URL de partage LinkedIn + texte pré-formaté avec hashtags
 */
export function buildLinkedInShareUrlWithText(post: SocialQueueItem, customText?: string): string {
  const { shareUrl } = buildLinkedInShareUrl(post);
  // LinkedIn share-offsite ne supporte pas le paramètre text nativement,
  // mais on peut le passer via l'URL pour les extensions/scripts
  const text = customText || post.content.substring(0, 500);
  const hashtagStr = post.hashtags.length > 0 ? ` ${post.hashtags.join(' ')}` : '';
  return shareUrl;
}

/**
 * Génère un texte de post LinkedIn formaté à partir du contenu du post
 * Avec lien de la page entreprise et hashtags
 */
export function formatLinkedInPostText(post: SocialQueueItem): string {
  const content = post.content;
  const sourceUrl = post.source_url || 'https://khepraexperts.com';
  const hashtags = post.hashtags.length > 0 ? post.hashtags.join(' ') : '#KHEPRAExperts #Conformité #Afrique';
  return `${content}\n\n🔗 ${sourceUrl}\n🌐 ${LINKEDIN_COMPANY_PAGE}\n\n${hashtags}`;
}

export function useLinkedInShare() {
  /**
   * Ouvre la popup de partage LinkedIn avec l'URL OG preview
   * Le bot LinkedIn scrapera les meta tags OG et affichera une preview riche
   */
  const shareToLinkedIn = useCallback((post: SocialQueueItem) => {
    const { shareUrl } = buildLinkedInShareUrl(post);
    window.open(shareUrl, '_blank', 'width=600,height=600,noopener,noreferrer');
  }, []);

  /**
   * Ouvre la page admin des posts LinkedIn (posts déjà publiés)
   */
  const openAdminPosts = useCallback(() => {
    window.open(LINKEDIN_ADMIN_POSTS, '_blank', 'noopener,noreferrer');
  }, []);

  /**
   * Ouvre la page entreprise LinkedIn
   */
  const openCompanyPage = useCallback(() => {
    window.open(LINKEDIN_COMPANY_PAGE, '_blank', 'noopener,noreferrer');
  }, []);

  /**
   * Copie le texte formaté du post LinkedIn (contenu + URL + hashtags + page entreprise)
   */
  const copyLinkedInPostText = useCallback(async (post: SocialQueueItem): Promise<boolean> => {
    const text = formatLinkedInPostText(post);
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }, []);

  return {
    shareToLinkedIn,
    openAdminPosts,
    openCompanyPage,
    copyLinkedInPostText,
    buildLinkedInShareUrl,
    formatLinkedInPostText,
    LINKEDIN_COMPANY_ID,
    LINKEDIN_COMPANY_PAGE,
    LINKEDIN_ADMIN_POSTS,
    LINKEDIN_COMPANY_NAME,
  };
}



