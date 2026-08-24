import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured && import.meta.env.DEV) {
  console.error(
    '⚠️ Variables Supabase manquantes : VITE_PUBLIC_SUPABASE_URL ou VITE_PUBLIC_SUPABASE_ANON_KEY non définies.'
  );
}

/**
 * Custom fetch wrapper that catches network failures gracefully.
 * Prevents Supabase auto-refresh failures from causing unhandled rejections
 * when the Supabase project is paused or unreachable.
 */
function safeFetch(
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1]
): ReturnType<typeof fetch> {
  // AbortController avec timeout pour éviter les attentes infinies
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const augmentedInit: Parameters<typeof fetch>[1] = {
    ...init,
    signal: controller.signal,
  };

  return fetch(input, augmentedInit)
    .then((response) => {
      clearTimeout(timeout);
      return response;
    })
    .catch((err) => {
      clearTimeout(timeout);
      // Silencieux en production — pas de crash pour un projet Supabase paused
      if (import.meta.env.DEV) {
        console.warn(
          '[Supabase] Network request failed (project may be paused or unreachable):',
          (err as Error)?.message
        );
      }
      // Renvoyer une erreur propre au lieu d'un rejet non géré
      throw new Error(
        `Supabase unreachable: ${(err as Error)?.message || 'Network error'}`
      );
    });
}

/**
 * Utilise un fetch standard si pas configuré pour éviter les appels inutiles.
 */
const effectiveFetch = isConfigured ? safeFetch : undefined;

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      // Désactive le refresh automatique si Supabase n'est pas configuré
      autoRefreshToken: isConfigured,
      persistSession: isConfigured,
    },
    global: {
      fetch: effectiveFetch as typeof fetch | undefined,
    },
  }
);



