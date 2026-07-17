import { useEffect, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaFAQPageProps {
  faqs: FAQItem[];
}

export default function SchemaFAQPage({ faqs }: SchemaFAQPageProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    // Remove any existing FAQPage schema (cleanup stale duplicates from SPA navigation)
    document.querySelectorAll(
      'script[type="application/ld+json"][data-faq-schema]'
    ).forEach((el) => el.remove());

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.setAttribute('data-seo-structured', 'true');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      // Cleanup on unmount or faqs change
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      // Belt-and-suspenders: also remove any remaining FAQPage scripts by attribute
      document.querySelectorAll(
        'script[type="application/ld+json"][data-faq-schema]'
      ).forEach((el) => el.remove());
    };
  }, [faqs]);

  return null;
}