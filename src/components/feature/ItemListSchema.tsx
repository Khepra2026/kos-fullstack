import { useEffect } from 'react';

interface ItemListSchemaProps {
  items: Array<{
    name: string;
    url: string;
    description?: string;
    position: number;
    image?: string;
  }>;
  listType?: string;
  url: string;
}

export default function ItemListSchema({ items, listType, url }: ItemListSchemaProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map(item => ({
        '@type': 'ListItem',
        position: item.position,
        item: {
          '@type': listType || 'Article',
          name: item.name,
          url: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
          ...(item.description ? { description: item.description } : {}),
          ...(item.image ? { image: item.image } : {}),
        },
      })),
    };

    const scriptId = `schema-itemlist-${encodeURIComponent(url)}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema-itemlist', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [items, listType, url]);

  return null;
}



