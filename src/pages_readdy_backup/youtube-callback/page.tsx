import { useEffect, useState } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { handleYouTubeCallback, clearOAuthSession } from '@/lib/youtube-oauth';

const REDIRECT_PATH = '/youtube-connect';

export default function YouTubeCallbackPage() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Échange du code d\'autorisation avec Google...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDesc = params.get('error_description');
    const state = params.get('state');

    if (error) {
      setStatus('error');
      setMessage(`Erreur Google OAuth : ${errorDesc || error}`);
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent(errorDesc || error)}`;
      }, 3000);
      return;
    }

    if (!code) {
      setStatus('error');
      setMessage('Aucun code d\'autorisation reçu de Google.');
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent('Code OAuth manquant')}`;
      }, 3000);
      return;
    }

    if (!state) {
      setStatus('error');
      setMessage('Paramètre state manquant — requête OAuth non sécurisée.');
      setTimeout(() => {
        window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent('State OAuth manquant')}`;
      }, 3000);
      return;
    }

    // Exchange code for tokens via Edge Function avec PKCE client-side
    const exchangeCode = async () => {
      try {
        const data = await handleYouTubeCallback(code, state);

        if (data.success) {
          setStatus('success');
          setMessage(`YouTube connecté avec succès ! Chaîne : ${data.channel_title || 'KHEPRA EXPERTS'}`);
          const channel = data.channel_title || 'KHEPRA EXPERTS';
          const verified = data.channel_verified ? 'true' : 'false';
          setTimeout(() => {
            window.location.href = `${REDIRECT_PATH}?success=true&channel=${encodeURIComponent(channel)}&verified=${verified}`;
          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Échec de l\'échange du code OAuth.');
          setTimeout(() => {
            window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent(data.error || 'Échec OAuth')}`;
          }, 3000);
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Erreur réseau lors de l\'échange OAuth');
        setTimeout(() => {
          window.location.href = `${REDIRECT_PATH}?error=${encodeURIComponent(err instanceof Error ? err.message : 'Erreur réseau')}`;
        }, 3000);
      }
    };

    exchangeCode();
  }, []);

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center">
      <SeoHead
        title="YouTube OAuth Callback — KHEPRA-KOS"
        description="Callback OAuth YouTube pour KHEPRA-KOS. Traitement de l\'autorisation Google."
        canonicalPath="/youtube-callback"
      />

      <div className="max-w-md w-full mx-4">
        <div className="rounded-2xl bg-white border border-background-200 p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF0000]/10 flex items-center justify-center mx-auto mb-5">
            {status === 'processing' ? (
              <div className="w-8 h-8 border-3 border-[#FF0000]/20 border-t-[#FF0000] rounded-full animate-spin" />
            ) : status === 'success' ? (
              <i className="ri-checkbox-circle-fill text-[#FF0000] text-3xl" />
            ) : (
              <i className="ri-error-warning-fill text-red-500 text-3xl" />
            )}
          </div>

          <h1 className="font-heading text-xl font-bold text-foreground-950 mb-2">
            {status === 'processing'
              ? 'Connexion YouTube en cours...'
              : status === 'success'
                ? 'Connexion réussie !'
                : 'Erreur de connexion'}
          </h1>

          <p className="text-sm text-foreground-600 mb-6">{message}</p>

          {status === 'processing' && (
            <p className="text-xs text-foreground-400">
              Échange sécurisé du code avec les serveurs Google... Ne fermez pas cette page.
            </p>
          )}

          {status === 'error' && (
            <a
              href={REDIRECT_PATH}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] text-white text-sm font-bold hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line" />
              Retour à YouTube Connect
            </a>
          )}
        </div>
      </div>
    </div>
  );
}



