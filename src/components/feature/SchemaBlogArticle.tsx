import { useEffect } from 'react';

interface BlogArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  authorName: string;
  authorUrl: string;
  authorJobTitle?: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  inLanguage?: string;
  categories?: string[];
  wordCount?: number;
  timeRequired?: string;
}

export default function SchemaBlogArticle({
  title,
  description,
  url,
  authorName,
  authorUrl,
  authorJobTitle = 'Expert Réglementaire Certifié',
  datePublished,
  dateModified,
  imageUrl,
  publisherName = 'KHEPRA EXPERTS',
  publisherLogo = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/og-image-proxy?url=https%3A%2F%2Freaddy.ai%2Fapi%2Fsearch-image%3Fquery%3Dpremium%20dark%20black%20background%20with%20deloitte%20green%20geometric%20spiral%20pattern%20elegant%20minimalist%20corporate%20branding%20KHEPRA%20EXPERTS%20strategic%20consulting%20africa%20professional%20typography%20clean%20design%20high%20contrast%20dark%20green%20and%20white%20accents%20sophisticated%20modern%20aesthetic%20corporate%20identity%26width%3D1200%26height%3D630%26seq%3Dog-khepra-master-gold-v1%26orientation%3Dlandscape',
  inLanguage = 'fr-FR',
  categories = [],
  wordCount,
  timeRequired,
}: BlogArticleSchemaProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
    const lang = inLanguage || (document.documentElement.lang?.startsWith('en') ? 'en-US' : 'fr-FR');

    const about: object[] = categories.map((cat) => ({
      '@type': 'Thing',
      name: cat,
    }));

    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      '@id': `${fullUrl}#article`,
      headline: title,
      description,
      url: fullUrl,
      inLanguage: lang,
      datePublished,
      dateModified,
      author: {
        '@type': 'Person',
        '@id': authorUrl ? `${siteUrl}${authorUrl}#person` : `${siteUrl}/#person-simda`,
        name: authorName,
        url: authorUrl ? `${siteUrl}${authorUrl}` : `${siteUrl}/experts`,
        jobTitle: authorJobTitle,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: publisherName,
        logo: {
          '@type': 'ImageObject',
          url: publisherLogo,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${fullUrl}#webpage`,
      },
      isPartOf: {
        '@type': 'Blog',
        '@id': `${siteUrl}/blog/#blog`,
        name: 'KOS — Blog Conformité & Régulation Afrique',
        url: `${siteUrl}/blog/`,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: lang,
      },
    };

    if (about.length > 0) {
      jsonLd.about = about;
    }

    if (imageUrl) {
      jsonLd.image = {
        '@type': 'ImageObject',
        url: imageUrl,
        width: '1200',
        height: '630',
      };
    }

    if (wordCount) {
      jsonLd.wordCount = wordCount;
    }

    if (timeRequired) {
      jsonLd.timeRequired = timeRequired;
    }

    const scriptId = `schema-article-${encodeURIComponent(url)}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema-article', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [
    title, description, url, authorName, authorUrl, authorJobTitle,
    datePublished, dateModified, imageUrl, publisherName, publisherLogo,
    inLanguage, categories, wordCount, timeRequired,
  ]);

  return null;
}