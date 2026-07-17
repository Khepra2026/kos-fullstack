import { useEffect } from 'react';

interface SpeakableSchemaProps {
  cssSelector: string;
  xpath?: string;
  url: string;
}

export default function SpeakableSchema({ cssSelector, xpath, url }: SpeakableSchemaProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [cssSelector],
      },
    };

    if (xpath) {
      (schema.speakable as Record<string, unknown>).xpath = [xpath];
    }

    const scriptId = `schema-speakable-${encodeURIComponent(url)}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema-speakable', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [cssSelector, xpath, url]);

  return null;
}