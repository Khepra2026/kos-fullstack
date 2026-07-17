import { useRef, useCallback } from 'react';

/**
 * Honeypot Anti-Bot — Hook de protection invisible
 * ──────────────────────────────────────────────────
 * Crée un champ input invisible (honeypot) que les bots remplissent
 * mais que les humains ne voient pas. Validation côté client + serveur.
 *
 * Usage :
 *   const { honeypotProps, validateHoneypot, checkRateLimit } = useHoneypot('contact');
 *   // Dans le JSX : <input {...honeypotProps} />
 *   // Avant soumission :
 *   if (validateHoneypot()) return; // bot détecté
 *   if (checkRateLimit()) return; // trop rapide
 */

interface HoneypotProps {
  type: string;
  name: string;
  className: string;
  tabIndex: number;
  autoComplete: string;
  'aria-hidden': boolean;
  defaultValue: string;
}

export function useHoneypot(formId: string = 'default') {
  const inputRef = useRef<HTMLInputElement>(null);

  const honeypotProps: HoneypotProps = {
    type: 'text',
    name: 'website',
    className: 'absolute opacity-0 pointer-events-none left-0 top-0 w-px h-px p-0 m-0 border-0 overflow-hidden',
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    defaultValue: '',
  };

  /**
   * Vérifie si le honeypot est rempli (bot détecté)
   * Retourne true si bot détecté
   */
  const validateHoneypot = useCallback((): boolean => {
    const value = inputRef.current?.value?.trim();
    return !!value && value.length > 0;
  }, []);

  /**
   * Rate limiting côté client — empêche les soumissions en rafale
   * Retourne true si bloqué (trop rapide)
   */
  const checkRateLimit = useCallback((): boolean => {
    const key = `form_rate_limit_${formId}`;
    const lastSubmit = localStorage.getItem(key);
    const now = Date.now();
    const minInterval = 5000; // 5 secondes minimum entre 2 soumissions

    if (lastSubmit) {
      const elapsed = now - parseInt(lastSubmit, 10);
      if (elapsed < minInterval) {
        return true;
      }
    }

    localStorage.setItem(key, now.toString());
    return false;
  }, [formId]);

  /**
   * Timestamp de la dernière soumission pour affichage message
   */
  const getRemainingCooldown = useCallback((): number => {
    const key = `form_rate_limit_${formId}`;
    const lastSubmit = localStorage.getItem(key);
    if (!lastSubmit) return 0;
    const elapsed = Date.now() - parseInt(lastSubmit, 10);
    const minInterval = 5000;
    return Math.max(0, minInterval - elapsed);
  }, [formId]);

  return {
    inputRef,
    honeypotProps,
    validateHoneypot,
    checkRateLimit,
    getRemainingCooldown,
  };
}

/**
 * Soumission sécurisée avec honeypot + rate limiting
 * Fallback vers soumission directe si l'Edge Function échoue
 */
export async function submitFormSecure(
  formData: Record<string, string>,
  targetUrl: string,
  options: {
    honeypotValue?: string;
    formId?: string;
  } = {}
): Promise<{ ok: boolean; error?: string; rateLimited?: boolean }> {
  // Vérification honeypot côté client
  if (options.honeypotValue && options.honeypotValue.trim().length > 0) {
    return { ok: false, error: 'Bot détecté' };
  }

  // Vérification rate limiting côté client
  const key = `form_rate_limit_${options.formId || 'default'}`;
  const lastSubmit = localStorage.getItem(key);
  const now = Date.now();
  const minInterval = 5000;

  if (lastSubmit) {
    const elapsed = now - parseInt(lastSubmit, 10);
    if (elapsed < minInterval) {
      return { ok: false, error: `Veuillez patienter ${Math.ceil((minInterval - elapsed) / 1000)} secondes`, rateLimited: true };
    }
  }

  localStorage.setItem(key, now.toString());

  try {
    const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined;
    const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

    // Si Supabase non configuré, fallback direct
    if (!supabaseUrl || !supabaseKey) {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      return { ok: res.ok };
    }

    // Tentative via Edge Function
    const edgeUrl = `${supabaseUrl}/functions/v1/submit-form`;
    const res = await fetch(edgeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        formData,
        targetUrl,
        honeypotValue: options.honeypotValue,
        formId: options.formId,
      }),
    });

    if (res.ok) {
      return { ok: true };
    }

    // Si Edge Function retourne une erreur, fallback direct
    const data = await res.json().catch(() => null);
    if (data?.error === 'rate_limited') {
      return { ok: false, error: 'Trop de requêtes. Veuillez patienter.', rateLimited: true };
    }
    if (data?.error === 'bot_detected') {
      return { ok: false, error: 'Soumission rejetée pour des raisons de sécurité.' };
    }

    // Fallback direct
    const body = new URLSearchParams();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    const directRes = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return { ok: directRes.ok };
  } catch {
    // Fallback direct en cas d'erreur réseau
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      const directRes = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      return { ok: directRes.ok };
    } catch {
      return { ok: false, error: 'Erreur réseau. Veuillez réessayer.' };
    }
  }
}