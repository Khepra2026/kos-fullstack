import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { content, SEOData } from '@/types/kos';

function generateTitle(content: Partial<content>, maxLength: number): string {
  return (content.title || 'Article Khepra').slice(0, maxLength);
}

function generateMeta(content: Partial<content>, maxLength: number): string {
  return (content.body || content.summary || 'Analyse réglementaire par Khepra Experts').slice(0, maxLength);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function extractKeywords(content: Partial<content>): Promise<string[]> {
  const words = (content.body || '').split(/\s+/).filter(w => w.length > 4);
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
}

async function generateFAQ(content: Partial<content>): Promise<{ q: string; a: string }[]> {
  return [
    { q: 'Quelle est la portée de cette nouvelle réglementation ?', a: `Cette réglementation concerne ${content.affectedSectors?.join(', ') || 'les secteurs financiers'} et s'applique à compter de ${content.deadline || 'publication'}.` },
    { q: 'Quelles sont les sanctions en cas de non-conformité ?', a: 'Les sanctions peuvent inclure des amendes, des restrictions d\'activité et des obligations de mise en conformité sous astreinte.' },
  ];
}

function buildSchemaOrg(content: Partial<content>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title || '',
    description: content.summary || '',
    datePublished: new Date().toISOString(),
  };
}

function buildOpenGraph(content: Partial<content>): Record<string, unknown> {
  return {
    title: content.title || '',
    description: content.summary || '',
    type: 'article',
    siteName: 'Khepra Experts',
  };
}

export function useSEOAgent() {
  const { data: siteMap } = useQuery<{ url: string; title: string }[]>({
    queryKey: ['khepra-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('kos-sitemap-xml-dynamic-v3', {
        body: {},
      });
      if (error) throw new Error(error.message);
      return (data as { url: string; title: string }[]) || [];
    },
    staleTime: 1000 * 60 * 60,
  });

  const optimize = async (content: Partial<content>): Promise<SEOData> => {
    const seo: SEOData = {
      titleSEO: generateTitle(content, 60),
      metaDescription: generateMeta(content, 155),
      slug: slugify(content.title || 'article'),
      keywords: await extractKeywords(content),
      faq: await generateFAQ(content),
      schema: buildSchemaOrg(content),
      og: buildOpenGraph(content),
      twitterCard: 'summary_large_image',
      canonical: `https://khepraexperts.com/${slugify(content.title || 'article')}`,
      altImages: [],
      internalLinks: await findRelevantPages(content, siteMap || []),
    };
    return seo;
  };

  const findRelevantPages = async (content: Partial<content>, sitemap: { url: string; title: string }[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('rag-semantic-search', {
        body: { text: content.body || content.title || '', top_k: 5 },
      });

      if (error || !data) {
        return sitemap.slice(0, 3).map(p => ({
          url: p.url,
          anchor: p.title,
          score: 0.5,
        }));
      }

      const pages = (data as { pages?: { url: string; bestAnchor: string; relevance: number }[] }).pages || [];
      return pages.map((p: { url: string; bestAnchor: string; relevance: number }) => ({
        url: p.url,
        anchor: p.bestAnchor,
        score: p.relevance,
      }));
    } catch {
      return sitemap.slice(0, 3).map(p => ({
        url: p.url,
        anchor: p.title,
        score: 0.5,
      }));
    }
  };

  return { optimize };
}



