import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * LinkedIn OAuth Callback Handler
 * LinkedIn redirige ici après l'autorisation OAuth.
 * Cette page extrait le code d'autorisation et l'envoie à l'Edge Function kos-linkedin-oauth.
 * Flow : LinkedIn → /linkedin-callback?code=xxx&state=yyy → Edge Function → social_api_tokens → /linkedin-connect
 */
export default function LinkedInCallbackPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Échange du code d\'autorisation...');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      const errMsg = errorDescription || error;
      window.location.href = `/linkedin-connect?error=${encodeURIComponent(errMsg)}`;
      return;
    }

    if (!code) {
      window.location.href = '/linkedin-connect?error=Code+autorisation+manquant';
      return;
    }

    // Forward to the Edge Function callback endpoint
    const callbackUrl = `https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master?action=callback&code=${encodeURIComponent(code)}${state ? `&state=${encodeURIComponent(state)}` : ''}`;

    setMessage('Connexion à LinkedIn en cours...');
    window.location.href = callbackUrl;
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {status === 'processing' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0A66C2]/10 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#0A66C2]/30 border-t-[#0A66C2] rounded-full animate-spin" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground-950 mb-2">
              Connexion LinkedIn
            </h1>
            <p className="text-sm text-foreground-500">{message}</p>
            <p className="text-xs text-foreground-400 mt-4">
              Vous allez être redirigé automatiquement...
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <i className="ri-error-warning-fill text-red-500 text-3xl" />
            </div>
            <h1 className="font-heading text-xl font-bold text-foreground-950 mb-2">
              Erreur de connexion
            </h1>
            <p className="text-sm text-foreground-500">{message}</p>
            <a
              href="/linkedin-connect"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" />
              Retour à la connexion
            </a>
          </>
        )}
      </div>
    </div>
  );
}



