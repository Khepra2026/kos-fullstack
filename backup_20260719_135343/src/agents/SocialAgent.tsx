import { content, SEOData, Channel } from '@/types/kos';

export interface SocialPost {
  channel: Channel;
  text: string;
  hashtags: string[];
  imageUrl?: string;
  linkUrl: string;
  scheduledFor: string;
}

export function useSocialAgent() {
  const adaptAllChannels = async (
    content: Partial<content>,
    seo: SEOData,
  ): Promise<Record<string, SocialPost>> => {
    const baseLink = seo.canonical || `https://khepraexperts.com/${seo.slug}`;
    const hook = content.hook || content.title || '';
    const keywords = seo.keywords.slice(0, 3);
    const hashtags = keywords.map(k => `#${k.replace(/\s+/g, '')}`);

    const now = new Date();
    const schedule = (hoursOffset: number) =>
      new Date(now.getTime() + hoursOffset * 3600000).toISOString();

    return {
      linkedin: {
        channel: 'linkedin',
        text: `${hook}\n\n${(content.analyse || content.summary || '').slice(0, 400)}\n\n👉 ${baseLink}`,
        hashtags: [...hashtags, '#RegTech', '#Conformité', '#KhepraExperts'],
        linkUrl: baseLink,
        scheduledFor: schedule(1),
      },
      x: {
        channel: 'x',
        text: `${hook.slice(0, 200)}\n\n${baseLink}`,
        hashtags,
        linkUrl: baseLink,
        scheduledFor: schedule(1),
      },
      facebook: {
        channel: 'facebook',
        text: `${hook}\n\n${(content.analyse || '').slice(0, 600)}\n\nLire l'article complet 👇\n${baseLink}`,
        hashtags: [...hashtags, '#Afrique', '#Finance'],
        linkUrl: baseLink,
        scheduledFor: schedule(2),
      },
      instagram: {
        channel: 'instagram',
        text: `${hook.slice(0, 150)}\n\n${hashtags.join(' ')}\n\nLien en bio → ${baseLink}`,
        hashtags,
        linkUrl: baseLink,
        scheduledFor: schedule(2),
      },
      newsletter: {
        channel: 'newsletter',
        text: `${content.title}\n\n${content.contexte || ''}\n\n${content.analyse || ''}\n\n👉 ${baseLink}`,
        hashtags: [],
        linkUrl: baseLink,
        scheduledFor: schedule(4),
      },
      gbp: {
        channel: 'gbp',
        text: `${hook}\n\n${baseLink}`,
        hashtags: [],
        linkUrl: baseLink,
        scheduledFor: schedule(1),
      },
    };
  };

  return { adaptAllChannels };
}



