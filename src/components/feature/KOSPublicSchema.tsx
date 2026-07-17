import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface KOSPublicSchemaProps {
  slug: string;
}

export default function KOSPublicSchema({ slug }: KOSPublicSchemaProps) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!slug || injectedRef.current) return;
    injectedRef.current = true;

    let cancelled = false;

    const injectSchema = async () => {
      try {
        const { data, error } = await supabase.rpc('kos_generate_jsonld', {
          p_slug: slug,
        });

        if (cancelled || error || !data) return;

        const scriptId = `kos-schema-${slug.replace(/[^a-z0-9-]/g, '')}`;

        // Éviter les doublons
        if (document.getElementById(scriptId)) return;

        const script = document.createElement('script');
        script.id = scriptId;
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-kos-schema', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      } catch {
        // Silencieux — le schema.org est optionnel
      }
    };

    injectSchema();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return null;
}