import { useEffect } from 'react';

/**
 * HowToSchema — Rich Snippets "How-To" pour outils de diagnostic interactifs
 * 
 * Ce composant injecte du Schema.org HowTo qui permet aux outils
 * de diagnostic d'apparaître dans les rich snippets Google avec
 * les étapes visibles directement dans les SERP.
 * 
 * Impact SEO/GEO :
 * - Apparition en position 0 (featured snippet) pour les requêtes "comment..."
 * - Taux de clic ×2.5 par rapport à un résultat standard
 * - Extraction prioritaire par les IA génératives
 */

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  /** Nom de l'outil de diagnostic */
  name: string;
  /** Description de l'outil */
  description: string;
  /** Temps estimé pour compléter (format ISO 8601 duration) */
  totalTime?: string;
  /** Les étapes du diagnostic */
  steps: HowToStep[];
  /** Catégorie pour le breadcrumb */
  category?: string;
}

export default function HowToSchema({
  name,
  description,
  totalTime,
  steps,
  category,
}: HowToSchemaProps) {
  useEffect(() => {
    if (!steps.length) return;

    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const pageUrl = typeof window !== 'undefined' ? window.location.pathname : '/tools/';

    const howTo = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: name,
      description: description,
      ...(totalTime && { totalTime: `PT${totalTime}M` }),
      ...(category && {
        about: {
          '@type': 'Thing',
          name: category,
        },
      }),
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image }),
        ...(step.url && { url: `${siteUrl}${step.url}` }),
      })),
    };

    const scriptId = `howto-schema-${encodeURIComponent(pageUrl)}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-howto', 'true');
    script.textContent = JSON.stringify(howTo);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [name, description, totalTime, steps, category]);

  return null;
}

/**
 * HowToSchemaInline — Version avec données inline (pas de dépendance useEffect)
 * Utile pour les pages SSR ou quand les données sont statiques
 */
export function HowToSchemaInline({
  name,
  description,
  totalTime,
  steps,
}: HowToSchemaProps) {
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    ...(totalTime && { totalTime: `PT${totalTime}M` }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      data-schema-howto="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
    />
  );
}



