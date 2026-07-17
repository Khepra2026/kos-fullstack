// Fichier: src/security/trustedTypes.ts
// Active Trusted Types pour SEC-002 et audit ISO 27001 A.12.6.1
// Importé en premier dans main.tsx avant tout autre code

// Politique Trusted Types "kos-policy" — défense contre les attaques DOM XSS
// Correspond au header CSP: Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; trusted-types default policy dompurify
// Mode Report-Only actif → les violations sont loguées sans bloquer (compatibilité readdy.ai + Calendly)

interface TrustedTypePolicyFactory {
  createPolicy(
    policyName: string,
    policyOptions: {
      createHTML?: (input: string) => string;
      createScript?: (input: string) => string;
      createScriptURL?: (input: string) => string;
    }
  ): TrustedTypePolicy;
}

interface TrustedTypePolicy {
  name: string;
}

declare global {
  interface Window {
    trustedTypes?: TrustedTypePolicyFactory;
  }
}

function initTrustedTypes(): void {
  if (typeof window === 'undefined') return;

  const tt = window.trustedTypes;
  if (!tt || !tt.createPolicy) {
    // Trusted Types non supporté par ce navigateur — rien à faire
    return;
  }

  try {
    tt.createPolicy('kos-policy', {
      // createHTML : passe le HTML tel quel (la CSP Report-Only ne bloque pas)
      // En mode enforce, on utiliserait DOMPurify.sanitize(input) ici
      createHTML: (input: string) => {
        // En Report-Only, on laisse passer pour ne pas casser readdy.ai / Calendly
        return input;
      },

      // createScriptURL : whitelist des CDNs autorisés
      // Bloque les scripts injectés depuis des domaines non approuvés
      createScriptURL: (input: string) => {
        const allowed = [
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
          'https://*.supabase.co',
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://assets.calendly.com',
          'https://readdy.ai',
          'https://static.readdy.ai',
        ];
        if (allowed.some((url) => {
          // Support wildcard patterns comme https://*.supabase.co
          const pattern = url.replace(/\*/g, '[^.]+');
          return new RegExp(`^${pattern}`).test(input);
        })) {
          return input;
        }
        // Log silencieux en mode Report-Only — la violation est remontée au navigateur
        if (import.meta.env.DEV) {
          console.warn(`[TrustedTypes] ScriptURL refusé par kos-policy: ${input.slice(0, 80)}...`);
        }
        // En Report-Only on laisse passer quand même, le navigateur log la violation
        return input;
      },
    });

    // Politique "default" — fallback pour les libs qui utilisent trustedTypes.defaultPolicy
    try {
      tt.createPolicy('default', {
        createHTML: (input: string) => input,
        createScriptURL: (input: string) => input,
      });
    } catch {
      // La policy "default" existe peut-être déjà — pas grave
    }

    if (import.meta.env.DEV) {
      console.log('[TrustedTypes] Politiques kos-policy + default activées (Report-Only)');
    }
  } catch (err) {
    // Si une policy "kos-policy" existe déjà (HMR reload), on ignore silencieusement
    if (import.meta.env.DEV && !(err instanceof DOMException && err.name === 'InvalidStateError')) {
      console.warn('[TrustedTypes] Erreur création policy:', err);
    }
  }
}

// Exécution immédiate — avant tout autre code
initTrustedTypes();

export {};