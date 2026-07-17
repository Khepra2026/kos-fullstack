import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface ScheduledArticle {
  id: string;
  pub_type: string;
  slug: string;
  title: string;
  publication_date: string;
  keywords: string[];
  language: string;
  region: string | null;
  doi: string | null;
  authors: { name: string; role?: string; affiliation?: string }[];
  referentiel: string;
}

function detectReferentiel(keywords: string[], region: string | null): string {
  const kw = keywords.join(' ').toUpperCase();
  const reg = (region || '').toUpperCase();
  if (kw.includes('GABAC') || reg.includes('CEMAC')) return 'GABAC';
  if (kw.includes('GIABA') || reg.includes('UEMOA')) return 'GIABA';
  if (kw.includes('OHADA')) return 'OHADA';
  if (kw.includes('COBAC')) return 'COBAC';
  if (kw.includes('BCEAO')) return 'BCEAO';
  return 'AUTRE';
}

export function useEditorialCalendar(limit = 30) {
  const [articles, setArticles] = useState<ScheduledArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCalendar() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: sqErr } = await supabase
          .from('kos_publications')
          .select('*')
          .eq('status', 'scheduled')
          .order('publication_date', { ascending: true })
          .limit(limit);

        if (sqErr) throw sqErr;

        if (data) {
          setArticles(
            data.map((a) => ({
              id: a.id,
              pub_type: a.pub_type,
              slug: a.slug,
              title: a.title,
              publication_date: a.publication_date,
              keywords: a.keywords || [],
              language: a.language,
              region: a.region,
              doi: a.doi,
              authors: (a.authors as ScheduledArticle['authors']) || [],
              referentiel: detectReferentiel(a.keywords || [], a.region),
            }))
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, [limit]);

  return { articles, loading, error };
}