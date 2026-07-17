import { useEffect, useMemo, useRef } from 'react';
import { getOrganizationSchema, getFounderSchema, getProfessionalServiceSchema, BRAND_INFO } from '@/config/socialProfiles';
import KOSPublicSchema from '@/components/feature/KOSPublicSchema';

interface SeoHeadProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterLabel1?: string;
  twitterData1?: string;
  twitterLabel2?: string;
  twitterData2?: string;
  canonical?: string;
  canonicalUrl?: string;
  canonicalPath?: string;
  structuredData?: object | object[];
  schemaJson?: object | object[];
  noindex?: boolean;
  noIndex?: boolean;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  datePublished?: string;
  dateModified?: string;
  ogLocale?: string;
  ogUrl?: string;
  children?: React.ReactNode;
  /** Slug kos_public_pages pour injection JSON-LD enrichi depuis la DB */
  kosSlug?: string;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

/**
 * SeoHead — JSON-LD Structured Data Injection ONLY
 *
 * This component injects page-level Schema.org JSON-LD (WebPage, Article,
 * BreadcrumbList, WebSite) into <head>. It does NOT mutate <title>, meta
 * description, keywords, canonical, Open Graph, or Twitter Card tags.
 * Those are managed by the static index.html head tags and platform build
 * settings, which serve as the single source of truth for all pages.
 */
export const SeoHead = ({
  title = 'Khepra Experts | Conseil strategique & transformation digitale Afrique',
  titleTemplate,
  description = "Khepra Experts accompagne les entreprises africaines en strategie, finance & digital. +20 ans d'expertise, 15+ pays. Transformez l'incertitude en avantage.",
  canonical,
  canonicalUrl,
  canonicalPath,
  structuredData,
  schemaJson,
  articlePublishedTime,
  articleModifiedTime,
  datePublished,
  dateModified,
  ogLocale,
  ogType = 'website',
  children,
  kosSlug,
}: SeoHeadProps) => {
  const resolvedTitle = titleTemplate
    ? titleTemplate.replace('%s', title)
    : title;

  const resolvedCanonical = canonicalPath
    ? `${SITE_URL}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`
    : (canonical || canonicalUrl || `${SITE_URL}/`);

  const resolvedSchema = schemaJson || structuredData;
  const resolvedLocale = ogLocale || 'fr_FR';
  const resolvedDateModified = dateModified || articleModifiedTime || new Date().toISOString().split('T')[0];
  const resolvedDatePublished = datePublished || articlePublishedTime || '2024-01-01';

  // ── Build page-level Schema.org JSON-LD ──
  const finalSchema = useMemo(() => {
    if (resolvedSchema) return resolvedSchema;

    const baseWebPage: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${resolvedCanonical}#webpage`,
      url: resolvedCanonical,
      name: resolvedTitle,
      description,
      inLanguage: resolvedLocale,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      datePublished: resolvedDatePublished,
      dateModified: resolvedDateModified,
    };

    if (ogType === 'article') {
      baseWebPage['@type'] = 'Article';
    }

    return baseWebPage;
  }, [resolvedSchema, resolvedCanonical, resolvedTitle, description, resolvedLocale, resolvedDatePublished, resolvedDateModified, ogType]);

  // ── Attach Organization + Person if not already present ──
  const schemaWithOrg = useMemo(() => {
    if (!finalSchema) return undefined;

    const hasOrgType = (obj: Record<string, unknown> | unknown[]): boolean => {
      if (!obj || typeof obj !== 'object') return false;
      if (Array.isArray(obj)) return obj.some(hasOrgType);
      const t = (obj as Record<string, unknown>)['@type'];
      if (t === 'Organization' || t === 'LocalBusiness') return true;
      const graph = (obj as Record<string, unknown>)['@graph'];
      if (graph && Array.isArray(graph)) {
        return graph.some((g: Record<string, unknown>) => g['@type'] === 'Organization' || g['@type'] === 'LocalBusiness');
      }
      return false;
    };

    if (hasOrgType(finalSchema)) return finalSchema;

    const orgSchema = getOrganizationSchema();
    const personSchema = getFounderSchema();

    const graph = (finalSchema as Record<string, unknown>)['@graph'];
    if (graph && Array.isArray(graph)) {
      return {
        ...finalSchema,
        '@graph': [...graph, orgSchema, personSchema],
      };
    }
    const type = (finalSchema as Record<string, unknown>)['@type'];
    if (!['Organization', 'LocalBusiness', 'Person'].includes(type as string)) {
      return {
        '@context': 'https://schema.org',
        '@graph': [finalSchema, orgSchema, personSchema],
      };
    }
    return finalSchema;
  }, [finalSchema]);

  const schemaCacheKey = useMemo(() => {
    return schemaWithOrg ? JSON.stringify(schemaWithOrg) : '';
  }, [schemaWithOrg]);

  const injectedRef = useRef(false);

  // ── JSON-LD Structured Data injection ONLY ─────────────────────────
  // No title, meta description, keywords, canonical, OG, or Twitter mutations.
  // Those are managed by the static index.html tags and the platform build settings.
  useEffect(() => {
    // ── Page-level structured data ──────────────────────────────────
    document.querySelectorAll(
      'script[type="application/ld+json"][data-seo-structured="true"]'
    ).forEach((el) => el.remove());

    if (schemaWithOrg) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-structured', 'true');
      script.textContent = JSON.stringify(schemaWithOrg);
      document.head.appendChild(script);
    }

    // ── ProfessionalService schema (LocalBusiness + Reviews) — persistent, inject once ──
    const psSchemaId = 'schema-professional-service-khepra';
    let psScript = document.getElementById(psSchemaId) as HTMLScriptElement | null;
    if (!psScript) {
      psScript = document.createElement('script');
      psScript.id = psSchemaId;
      psScript.type = 'application/ld+json';
      psScript.setAttribute('data-schema-professional-service', 'true');
      document.head.appendChild(psScript);
    }
    psScript.textContent = JSON.stringify(getProfessionalServiceSchema());

    // ── WebSite schema (SearchAction) — persistent, inject once ─────
    const websiteSchemaId = 'schema-website-khepra';
    let websiteScript = document.getElementById(websiteSchemaId) as HTMLScriptElement | null;
    if (!websiteScript) {
      websiteScript = document.createElement('script');
      websiteScript.id = websiteSchemaId;
      websiteScript.type = 'application/ld+json';
      websiteScript.setAttribute('data-schema-website', 'true');
      document.head.appendChild(websiteScript);
    }
    websiteScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_INFO.name,
      description: BRAND_INFO.description,
      inLanguage: ['fr-FR', 'en-US'],
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    });

    // ── BreadcrumbList Schema auto-generated ────────────────────────
    try {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length === 0) return;

      const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      ];

      let accumulatedPath = '';
      pathSegments.forEach((seg, i) => {
        accumulatedPath += `/${seg}`;
        const name = seg
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: i + 2,
          name,
          item: `${SITE_URL}${accumulatedPath}/`,
        });
      });

      const breadcrumbId = 'schema-breadcrumb-auto';
      const existing = document.getElementById(breadcrumbId);
      if (existing) existing.remove();

      const bcScript = document.createElement('script');
      bcScript.id = breadcrumbId;
      bcScript.type = 'application/ld+json';
      bcScript.setAttribute('data-schema-breadcrumb-auto', 'true');
      bcScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      });
      document.head.appendChild(bcScript);
    } catch {
      // Ignore — breadcrumb schema is non-critical
    }

    injectedRef.current = true;
  }, [schemaCacheKey, schemaWithOrg]);

  return <>{kosSlug && <KOSPublicSchema slug={kosSlug} />}{children}</>;
};

export default SeoHead;