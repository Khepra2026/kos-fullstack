import { useEffect } from 'react';

interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: {
    name: string;
    url: string;
  };
  educationalLevel?: string;
  teaches?: string[];
  image?: string;
}

export default function CourseSchema({
  name,
  description,
  url,
  provider,
  educationalLevel,
  teaches,
  image,
}: CourseSchemaProps) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

    const course: Record<string, unknown> = {
      '@type': 'Course',
      name,
      description,
      url: fullUrl,
    };

    if (provider) {
      course.provider = {
        '@type': 'Organization',
        name: provider.name,
        url: provider.url.startsWith('http') ? provider.url : `${siteUrl}${provider.url}`,
      };
    } else {
      course.provider = {
        '@type': 'Organization',
        name: 'KHEPRA EXPERTS',
        url: siteUrl,
      };
    }

    if (educationalLevel) course.educationalLevel = educationalLevel;
    if (teaches && teaches.length > 0) course.teaches = teaches;
    if (image) course.image = image.startsWith('http') ? image : `${siteUrl}${image}`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      ...course,
    };

    const scriptId = `schema-course-${encodeURIComponent(url)}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema-course', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [name, description, url, provider, educationalLevel, teaches, image]);

  return null;
}