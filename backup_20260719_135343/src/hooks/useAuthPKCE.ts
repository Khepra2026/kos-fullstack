import { useState, useCallback, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '@/utils/pkce';
import { isWebView } from '@/utils/webview';

const TOKEN_KEY = 'oauth_access_token';
const REFRESH_KEY = 'oauth_refresh_token';
const EXPIRY_KEY = 'oauth_token_expiry';
const VERIFIER_KEY = 'pkce_verifier';
const STATE_KEY = 'oauth_state';

interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  authEndpoint: string;
  tokenEndpoint: string;
  revokeEndpoint?: string;
  scopes?: string[];
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

interface UserInfo {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
}

export function useAuthPKCE() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWebViewBrowser, setIsWebViewBrowser] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    setIsWebViewBrowser(isWebView());
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (token && expiry && Date.now() < Number(expiry)) {
      setIsAuthenticated(true);
    }
  }, []);

  const saveTokens = useCallback((data: TokenResponse) => {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(EXPIRY_KEY, String(Date.now() + data.expires_in * 1000));
    if (data.refresh_token) {
      localStorage.setItem(REFRESH_KEY, data.refresh_token);
    }
  }, []);

  const clearTokens = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    sessionStorage.removeItem(VERIFIER_KEY);
    sessionStorage.removeItem(STATE_KEY);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  }, []);

  const fetchUser = useCallback(async (token: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Échec récupération profil utilisateur');
      const userData: UserInfo = await response.json();
      setUser(userData);
      return userData;
    } catch {
      clearTokens();
      return null;
    }
  }, [clearTokens]);

  const login = useCallback(async (config: OAuthConfig) => {
    setIsLoading(true);
    setError(null);

    if (isWebView()) {
      setError(
        'OAuth interdit dans WebView. Utilisez Chrome Custom Tabs (Android) ou ASWebAuthenticationSession (iOS). Ouvrez l\'application dans votre navigateur système.',
      );
      setIsLoading(false);
      return;
    }

    try {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      const state = crypto.randomUUID();

      sessionStorage.setItem(VERIFIER_KEY, verifier);
      sessionStorage.setItem(STATE_KEY, state);

      const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        scope: (config.scopes || ['openid', 'email', 'profile']).join(' '),
        code_challenge: challenge,
        code_challenge_method: 'S256',
        access_type: 'offline',
        prompt: 'consent',
        state,
      });

      window.location.href = `${config.authEndpoint}?${params}`;
    } catch {
      setError("Échec de l'initialisation PKCE");
      setIsLoading(false);
    }
  }, []);

  const handleCallback = useCallback(
    async (code: string, state: string, config: OAuthConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const storedState = sessionStorage.getItem(STATE_KEY);
        if (state !== storedState) {
          throw new Error('CSRF détecté — paramètre state invalide. Authentification annulée.');
        }

        const verifier = sessionStorage.getItem(VERIFIER_KEY);
        if (!verifier) throw new Error('PKCE verifier manquant — session expirée');

        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: config.redirectUri,
          client_id: config.clientId,
          code_verifier: verifier,
        });

        const response = await fetch(config.tokenEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Échange token échoué (${response.status}): ${errorText}`);
        }

        const data: TokenResponse = await response.json();
        saveTokens(data);
        sessionStorage.removeItem(VERIFIER_KEY);
        sessionStorage.removeItem(STATE_KEY);

        setIsAuthenticated(true);
        setError(null);

        await fetchUser(data.access_token);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Callback OAuth échoué');
      } finally {
        setIsLoading(false);
      }
    },
    [saveTokens, fetchUser],
  );

  const refreshAccessToken = useCallback(async (config: OAuthConfig) => {
    const refresh = localStorage.getItem(REFRESH_KEY);
    if (!refresh) throw new Error('Pas de refresh token disponible');

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
      client_id: config.clientId,
    });

    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) throw new Error(`Refresh token échoué (${response.status})`);

    const data: TokenResponse = await response.json();
    saveTokens(data);

    if (data.access_token) {
      await fetchUser(data.access_token);
    }
  }, [saveTokens, fetchUser]);

  const getAccessToken = useCallback(
    async (config: OAuthConfig): Promise<string | null> => {
      const token = localStorage.getItem(TOKEN_KEY);
      const expiresAt = localStorage.getItem(EXPIRY_KEY);

      if (!token || !expiresAt) return null;

      if (Date.now() >= Number(expiresAt) - 5 * 60 * 1000) {
        try {
          await refreshAccessToken(config);
          return localStorage.getItem(TOKEN_KEY);
        } catch {
          clearTokens();
          return null;
        }
      }

      return token;
    },
    [refreshAccessToken, clearTokens],
  );

  const logout = useCallback(() => {
    clearTokens();
  }, [clearTokens]);

  const logoutAll = useCallback(async (config: OAuthConfig) => {
    const accessToken = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    const revokeUrl = config.revokeEndpoint || 'https://oauth2.googleapis.com/revoke';

    try {
      if (refreshToken) {
        await fetch(revokeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ token: refreshToken }),
        });
      } else if (accessToken) {
        await fetch(revokeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ token: accessToken }),
        });
      }
    } catch (e) {
      console.error('Erreur révocation token:', e);
    } finally {
      clearTokens();
    }
  }, [clearTokens]);

  return {
    isAuthenticated,
    isLoading,
    error,
    isWebViewBrowser,
    user,
    login,
    handleCallback,
    getAccessToken,
    refreshAccessToken,
    logout,
    logoutAll,
    fetchUser,
  };
}



