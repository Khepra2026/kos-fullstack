import { useEffect } from 'react';

interface OgVideoProps {
  videoUrl: string;
  videoWidth?: number;
  videoHeight?: number;
  videoType?: string;
  videoSecureUrl?: string;
  duration?: number;
  description?: string;
}

export default function OgVideo({
  videoUrl,
  videoWidth = 1280,
  videoHeight = 720,
  videoType = 'video/mp4',
  videoSecureUrl,
  duration,
  description,
}: OgVideoProps) {
  useEffect(() => {
    const tags: Array<{ property: string; content: string }> = [
      { property: 'og:video', content: videoUrl },
      { property: 'og:video:width', content: String(videoWidth) },
      { property: 'og:video:height', content: String(videoHeight) },
      { property: 'og:video:type', content: videoType },
    ];

    if (videoSecureUrl) {
      tags.push({ property: 'og:video:secure_url', content: videoSecureUrl });
    }
    if (duration) {
      tags.push({ property: 'og:video:duration', content: String(duration) });
    }
    if (description) {
      tags.push({ property: 'og:video:description', content: description });
    }

    const createdMeta: HTMLMetaElement[] = [];

    tags.forEach(({ property, content }) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      meta.setAttribute('data-og-video', 'true');
      document.head.appendChild(meta);
      createdMeta.push(meta);
    });

    return () => {
      createdMeta.forEach(meta => {
        if (meta.parentNode) meta.parentNode.removeChild(meta);
      });
      // Cleanup any stale og:video meta tags
      document.querySelectorAll('meta[data-og-video]').forEach(el => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [videoUrl, videoWidth, videoHeight, videoType, videoSecureUrl, duration, description]);

  return null;
}



