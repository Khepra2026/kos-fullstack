import { useEffect, useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';

const TIKTOK_OAUTH_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-tiktok-oauth';
const REDIRECT_PATH = '/tiktok-connect';

export default function TikTokCallbackPage() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Echange du code d\'autorisation avec TikTok...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDesc = params.get('error_description');
    const state = params.get('state');

    if (error) {
      setStatus('error');
      setMessage(`Erreur TikTok OAuth : ${errorDesc || error}`);
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent(errorDesc || error)}`;
      }, 3000);
      return;
    }

    if (!code) {
      setStatus('error');
      setMessage('Aucun code d\'autorisation recu de TikTok.');
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent('Code OAuth manquant')}`;
      }, 3000);
      return;
    }

    if (!state) {
      setStatus('error');
      setMessage('Parametre state manquant — requete OAuth non securisee.');
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent('State OAuth manquant')}`;
      }, 3000);
      return;
    }

    setMessage('Echange du code d\'autorisation avec les serveurs TikTok...');

    window.location.href = `${TIKTOK_OAUTH_URL}?action=callback&code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
  }, []);

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center">
      <SeoHead
        title="TikTok OAuth Callback — KHEPRA-KOS"
        description="Callback OAuth TikTok pour KHEPRA-KOS. Traitement de l'autorisation TikTok."
        canonicalPath="/tiktok-callback"
      />

      <div className="max-w-md w-full mx-4">
        <div className="rounded-2xl bg-white border border-background-200 p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF0050]/10 flex items-center justify-center mx-auto mb-5">
            {status === 'processing' ? (
              <div className="w-8 h-8 border-3 border-[#FF0050]/20 border-t-[#FF0050] rounded-full animate-spin" />
            ) : status === 'success' ? (
              <i className="ri-checkbox-circle-fill text-[#FF0050] text-3xl" />
            ) : (
              <i className="ri-error-warning-fill text-red-500 text-3xl" />
            )}
          </div>

          <h1 className="font-heading text-xl font-bold text-foreground-950 mb-2">
            {status === 'processing'
              ? 'Connexion TikTok en cours...'
              : status === 'success'
                ? 'Connexion reussie !'
                : 'Erreur de connexion'}
          </h1>

          <p className="text-sm text-foreground-600 mb-6">{message}</p>

          {status === 'processing' && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#FF0050] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#FF0050] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#FF0050] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-xs text-foreground-400">
                Echange securise du code avec les serveurs TikTok... Ne fermez pas cette page.
              </p>
            </div>
          )}

          {status === 'error' && (
            <a
              href={REDIRECT_PATH}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0050] text-white text-sm font-bold hover:bg-[#CC0040] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" />
              Retour a TikTok Connect
            </a>
          )}
        </div>
      </div>
    </div>
  );
}