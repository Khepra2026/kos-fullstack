import { useEffect } from 'react';

interface CollectionItem {
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}

interface SchemaCollectionPageProps {
  name: string;
  description: string;
  url: string;
  items: CollectionItem[];
}

export default function SchemaCollectionPage({ name, description, url, items }: SchemaCollectionPageProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    
    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name,
      description,
      url: `${siteUrl}${url}`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: item.name,
            description: item.description,
            url: `${siteUrl}${item.url}`,
            ...(item.image && { image: item.image }),
            ...(item.datePublished && { datePublished: item.datePublished })
          }
        }))
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(collectionSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, items]);

  return null;
}




