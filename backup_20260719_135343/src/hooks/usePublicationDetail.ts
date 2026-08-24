import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface PublicationAuteur {
  name: string;
  role?: string;
  affiliation?: string;
}

export interface PublicationDetail {
  id: string;
  pub_type: string;
  slug: string;
  title: string;
  subtitle: string | null;
  abstract: string | null;
  content_md: string | null;
  content_html: string | null;
  authors: PublicationAuteur[];
  doi: string | null;
  keywords: string[];
  language: string;
  region: string | null;
  publication_date: string | null;
  status: string;
  peer_reviewed: boolean;
  citations_count: number;
  downloads_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export function usePublicationDetail(slug: string | undefined) {
  const [publication, setPublication] = useState<PublicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('Aucun slug fourni');
      return;
    }

    async function fetchPublication() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: sqErr } = await supabase
          .from('kos_publications')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (sqErr) throw sqErr;

        if (data) {
          setPublication({
            id: data.id,
            pub_type: data.pub_type,
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle,
            abstract: data.abstract,
            content_md: data.content_md,
            content_html: data.content_html,
            authors: (data.authors as PublicationAuteur[]) || [],
            doi: data.doi,
            keywords: data.keywords || [],
            language: data.language,
            region: data.region,
            publication_date: data.publication_date,
            status: data.status,
            peer_reviewed: data.peer_reviewed || false,
            citations_count: data.citations_count || 0,
            downloads_count: data.downloads_count || 0,
            views_count: data.views_count || 0,
            created_at: data.created_at,
            updated_at: data.updated_at,
          });
        } else {
          setPublication(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    fetchPublication();
  }, [slug]);

  return { publication, loading, error };
}



