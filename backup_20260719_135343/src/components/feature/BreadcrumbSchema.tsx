interface BreadcrumbItem {
  name?: string;
  item?: string;
  label?: string;
  path?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter((item) => {
        if (!item) return false;
        const url = item.item || item.path || '';
        return typeof url === 'string' && url.trim().length > 0;
      })
      .map((item, index) => {
        const name = item.name || item.label || '';
        const rawUrl = item.item || item.path || '';
        const fullUrl = rawUrl.startsWith('http') ? rawUrl : `${SITE_URL}${rawUrl}`;
        return {
          '@type': 'ListItem' as const,
          position: index + 1,
          name,
          item: fullUrl,
        };
      }),
  };

  // Guard: don't inject empty BreadcrumbList — Google treats it as invalid
  if (schema.itemListElement.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      data-seo-structured="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default BreadcrumbSchema;



