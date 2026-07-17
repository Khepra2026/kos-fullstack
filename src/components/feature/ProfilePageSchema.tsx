import { useEffect } from 'react';

interface ProfilePageSchemaProps {
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
  knowsAbout?: string[];
}

export default function ProfilePageSchema({
  name,
  url,
  image,
  jobTitle,
  description,
  sameAs,
  worksFor,
  knowsAbout,
}: ProfilePageSchemaProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

    const person: Record<string, unknown> = {
      '@type': 'Person',
      name,
      url: fullUrl,
    };

    if (image) person.image = image.startsWith('http') ? image : `${siteUrl}${image}`;
    if (jobTitle) person.jobTitle = jobTitle;
    if (description) person.description = description;
    if (sameAs && sameAs.length > 0) person.sameAs = sameAs;
    if (knowsAbout && knowsAbout.length > 0) person.knowsAbout = knowsAbout;
    if (worksFor) {
      person.worksFor = {
        '@type': 'Organization',
        name: worksFor.name,
        url: worksFor.url.startsWith('http') ? worksFor.url : `${siteUrl}${worksFor.url}`,
      };
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: person,
      url: fullUrl,
    };

    const scriptId = `schema-profile-${encodeURIComponent(url)}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema-profile', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [name, url, image, jobTitle, description, sameAs, worksFor, knowsAbout]);

  return null;
}