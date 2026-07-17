import { useEffect } from 'react';
import KOSPublicSchema from '@/components/feature/KOSPublicSchema';

interface SchemaWebPageProps {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** Slug kos_public_pages pour injection JSON-LD enrichi depuis la DB */
  kosSlug?: string;
}

export default function SchemaWebPage({ name, description, url, inLanguage, breadcrumbs, kosSlug }: SchemaWebPageProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const lang = inLanguage || (document.documentElement.lang?.startsWith('en') ? 'en-US' : 'fr-FR');
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

    const schemas: object[] = [];

    schemas.push({
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
      name,
      description,
      url: fullUrl,
      inLanguage: lang,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
    });

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.url}`,
        })),
      });
    }

    const scriptId = `schema-webpage-${encodeURIComponent(url)}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema-webpage', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemas,
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [name, description, url, inLanguage, breadcrumbs]);

  // Injection JSON-LD KOS enrichi depuis kos_public_pages
  if (kosSlug) {
    return <KOSPublicSchema slug={kosSlug} />;
  }

  return null;
}