import { useState, useEffect, useCallback } from 'react';
import { useAuthPKCE } from '@/hooks/useAuthPKCE';
import { SeoHead } from '@/components/feature/SeoHead';

const GOOGLE_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || 'https://localhost:5173/callback',
  authEndpoint: import.meta.env.VITE_OAUTH_AUTH_URL || 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: import.meta.env.VITE_OAUTH_TOKEN_URL || 'https://oauth2.googleapis.com/token',
  revokeEndpoint: import.meta.env.VITE_OAUTH_REVOKE_URL || 'https://oauth2.googleapis.com/revoke',
  scopes: ['openid', 'email', 'profile'],
};

export default function OAuthDemoPage() {
  const {
    isAuthenticated,
    isLoading,
    error,
    isWebViewBrowser,
    user,
    login,
    handleCallback,
    logout,
    logoutAll,
    getAccessToken,
  } = useAuthPKCE();

  const [tokenPreview, setTokenPreview] = useState<string | null>(null);
  const [callbackCode, setCallbackCode] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code) {
      setCallbackCode(code);
      window.history.replaceState({}, document.title, window.location.pathname);
      handleCallback(code, state || '', GOOGLE_CONFIG);
    }
  }, [handleCallback]);

  const handleLogin = useCallback(() => {
    if (!GOOGLE_CONFIG.clientId) {
      alert('VITE_GOOGLE_CLIENT_ID non configuré dans .env');
      return;
    }
    login(GOOGLE_CONFIG);
  }, [login]);

  const showToken = useCallback(async () => {
    const token = await getAccessToken(GOOGLE_CONFIG);
    if (token) {
      setTokenPreview(`${token.slice(0, 20)}...${token.slice(-10)}`);
    } else {
      setTokenPreview('Aucun token (non authentifié ou expiré)');
    }
  }, [getAccessToken]);

  return (
    <>
      <SeoHead
        title="Démo OAuth PKCE — KOS"
        description="Démonstration du flow OAuth 2.0 Authorization Code avec PKCE pour sécuriser l'authentification Google."
      />
      <main className="min-h-screen bg-background-50">
        <section className="relative overflow-hidden bg-background-100 border-b border-background-200/70">
          <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Abstract%20digital%20security%20mesh%20network%20dark%20background%20glowing%20nodes%20and%20connections%2C%20cybersecurity%20visualization%2C%20minimal%20tech%20aesthetic%2C%20dark%20theme%20with%20subtle%20warm%20accents&width=1600&height=600&seq=oauth-demo-hero-01&orientation=landscape')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-900">
                <i className="ri-shield-keyhole-line" />
                OAuth PKCE v3
              </span>
              <h1 className="font-heading text-3xl font-bold text-foreground-950 md:text-5xl">
                Démo Authentification OAuth
              </h1>
              <p className="mt-4 text-base text-foreground-700 md:text-lg">
                Flow Authorization Code + PKCE S256 — sécurité maximale, zero token exposé
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          {isWebViewBrowser && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <i className="ri-forbid-line text-lg text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">WebView détectée</h3>
                  <p className="text-sm text-red-700">
                    L'authentification OAuth est bloquée. Utilisez un navigateur système (Chrome, Safari).
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <i className="ri-error-warning-line mt-0.5 text-lg text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900">Erreur OAuth</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {callbackCode && (
            <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <i className="ri-check-line text-lg text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Code d'autorisation reçu</h3>
                  <code className="mt-1 block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                    {callbackCode.slice(0, 30)}...
                  </code>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-background-200/70 bg-background-100 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <i className="ri-google-fill text-xl text-primary-600" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground-950">
                    Authentification Google
                  </h2>
                  <p className="text-sm text-foreground-600">PKCE S256 + Authorization Code</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">Client ID configuré</span>
                  <span className={`text-sm font-medium ${GOOGLE_CONFIG.clientId ? 'text-green-600' : 'text-red-600'}`}>
                    {GOOGLE_CONFIG.clientId ? 'Oui' : 'Non'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">Redirect URI</span>
                  <span className="text-sm font-mono text-foreground-600">{GOOGLE_CONFIG.redirectUri}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">Statut session</span>
                  <span className={`text-sm font-medium ${isAuthenticated ? 'text-green-600' : 'text-foreground-500'}`}>
                    {isAuthenticated ? 'Connecté' : 'Déconnecté'}
                  </span>
                </div>
                {user && (
                  <>
                    <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                      <span className="text-sm text-foreground-700">Utilisateur</span>
                      <span className="text-sm font-medium text-foreground-600">{user.email}</span>
                    </div>
                    {user.name && (
                      <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                        <span className="text-sm text-foreground-700">Nom</span>
                        <span className="text-sm font-medium text-foreground-600">{user.name}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                {!isAuthenticated ? (
                  <button
                    onClick={handleLogin}
                    disabled={isLoading || isWebViewBrowser || !GOOGLE_CONFIG.clientId}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      <>
                        <i className="ri-login-box-line" />
                        Se connecter avec Google
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex gap-3">
                      <button
                        onClick={logout}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 whitespace-nowrap"
                      >
                        <i className="ri-logout-box-line" />
                        Déconnexion locale
                      </button>
                      <button
                        onClick={() => logoutAll(GOOGLE_CONFIG)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 whitespace-nowrap"
                      >
                        <i className="ri-shield-user-line" />
                        Révocation Google
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-background-200/70 bg-background-100 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                  <i className="ri-key-2-line text-xl text-secondary-600" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground-950">
                    Token & Sécurité
                  </h2>
                  <p className="text-sm text-foreground-600">Auto-refresh + détection WebView</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">PKCE Verifier</span>
                  <span className="text-sm text-foreground-500">Généré dynamiquement (S256)</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">Stockage</span>
                  <span className="text-sm text-foreground-500">localStorage (persistant)</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">CSRF Protection</span>
                  <span className="text-sm text-green-600 font-medium">state param (crypto.randomUUID)</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">Auto-refresh</span>
                  <span className="text-sm text-green-600 font-medium">Actif (-5 min avant expiry)</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background-50 p-3">
                  <span className="text-sm text-foreground-700">WebView block</span>
                  <span className="text-sm text-green-600 font-medium">Intégré</span>
                </div>
              </div>

              <button
                onClick={showToken}
                disabled={!isAuthenticated}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-background-300/60 bg-background-50 px-5 py-2.5 text-sm font-medium text-foreground-700 transition hover:bg-background-200/70 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
              >
                <i className="ri-eye-line" />
                Afficher le token (masqué)
              </button>

              {tokenPreview && (
                <div className="mt-3 rounded-lg bg-foreground-950 p-3">
                  <code className="block text-xs text-green-400 font-mono break-all">
                    {tokenPreview}
                  </code>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-background-200/70 bg-background-100 p-6">
            <h3 className="mb-4 font-heading text-lg font-semibold text-foreground-950">
              Architecture PKCE v3
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { icon: 'ri-shuffle-line', label: '1. Code Verifier', desc: '32 bytes aléatoires, base64url' },
                { icon: 'ri-lock-line', label: '2. Challenge S256', desc: 'SHA-256 du verifier' },
                { icon: 'ri-fingerprint-line', label: '3. State CSRF', desc: 'crypto.randomUUID() anti-replay' },
                { icon: 'ri-exchange-line', label: '4. Échange Token', desc: 'POST /token avec verifier' },
                { icon: 'ri-refresh-line', label: '5. Auto-Refresh', desc: '5 min avant expiration' },
              ].map((step) => (
                <div key={step.label} className="rounded-lg bg-background-50 p-4 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <i className={`${step.icon} text-primary-600`} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-950">{step.label}</h4>
                  <p className="mt-1 text-xs text-foreground-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-xl border border-background-200/70 bg-background-100 p-4">
            <div className="flex items-center gap-3">
              <i className="ri-code-s-slash-line text-xl text-secondary-600" />
              <div>
                <h4 className="text-sm font-semibold text-foreground-950">Fichiers PKCE dans le projet</h4>
                <p className="text-xs text-foreground-600">
                  src/utils/pkce.ts · src/utils/webview.ts · src/hooks/useAuthPKCE.ts · src/api/oauthAxios.ts
                </p>
              </div>
            </div>
            <a
              href="/kos-oauth-security-corrections"
              className="inline-flex items-center gap-2 rounded-md bg-secondary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary-600 whitespace-nowrap"
            >
              <i className="ri-arrow-right-line" />
              Voir le plan complet
            </a>
          </div>
        </section>
      </main>
    </>
  );
}



