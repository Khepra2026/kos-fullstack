const YOUTUBE_ENGINE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-youtube-master';

// Détecte dynamiquement le redirect_uri selon le domaine courant (preview Readdy ou production)
export function getYouTubeRedirectUri(): string {
  if (typeof window === 'undefined') return 'https://khepraexperts.com/youtube-callback';
  return `${window.location.origin}/youtube-callback`;
}

function base64URLEncode(str: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest('SHA-256', data);
}

const YT_STATE_KEY = 'yt_oauth_state';
const YT_CODE_VERIFIER_KEY = 'yt_oauth_code_verifier';
const OAUTH_TTL_MS = 10 * 60 * 1000; // 10 minutes

function setOAuthSession(key: string, value: string): void {
  const payload = {
    value,
    exp: Date.now() + OAUTH_TTL_MS,
  };
  sessionStorage.setItem(key, JSON.stringify(payload));
}

function getOAuthSession(key: string): string | null {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  try {
    const { value, exp } = JSON.parse(raw);
    if (Date.now() > exp) {
      sessionStorage.removeItem(key);
      return null;
    }
    return value;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
}

export function getStoredOAuthState(): string | null {
  return getOAuthSession(YT_STATE_KEY);
}

export function getStoredCodeVerifier(): string | null {
  return getOAuthSession(YT_CODE_VERIFIER_KEY);
}

export function clearOAuthSession(): void {
  sessionStorage.removeItem(YT_STATE_KEY);
  sessionStorage.removeItem(YT_CODE_VERIFIER_KEY);
}

export async function initiateYouTubeAuth(
  credentials?: { clientId: string; clientSecret: string } | null,
): Promise<{ authUrl?: string; setupRequired?: boolean; error?: string }> {
  // 1. Génère CSRF State
  const state = crypto.randomUUID();
  
  // 2. Génère PKCE code_verifier + code_challenge (SHA256)
  const rawVerifier = crypto.getRandomValues(new Uint8Array(32));
  const codeVerifier = base64URLEncode(rawVerifier.buffer);
  const codeChallenge = base64URLEncode(await sha256(codeVerifier));
  
  // 3. Stocke temporairement dans sessionStorage avec TTL 10 min pour le callback
  setOAuthSession(YT_STATE_KEY, state);
  setOAuthSession(YT_CODE_VERIFIER_KEY, codeVerifier);

  // 4. Appelle l'edge function pour construire l'URL OAuth — redirect_uri dynamique
  const payload: Record<string, unknown> = {
    action: 'authorize',
    state,
    code_challenge: codeChallenge,
    redirect_uri: getYouTubeRedirectUri(),
  };

  if (credentials?.clientId) payload.client_id = credentials.clientId;
  if (credentials?.clientSecret) payload.client_secret = credentials.clientSecret;

  const res = await fetch(YOUTUBE_ENGINE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.auth_url) {
    return { authUrl: data.auth_url };
  } else if (data.setup_required) {
    clearOAuthSession();
    return {
      setupRequired: true,
      error: 'YouTube Client ID non configuré. Allez dans KOS External API Config Command pour saisir vos credentials YouTube.',
    };
  } else {
    clearOAuthSession();
    return { error: data.error || 'Erreur lors de la génération du lien OAuth' };
  }
}

export async function handleYouTubeCallback(
  code: string,
  state: string,
): Promise<{
  success: boolean;
  channel_title?: string;
  channel_verified?: boolean;
  error?: string;
}> {
  // 1. Vérifie CSRF State
  const storedState = getOAuthSession(YT_STATE_KEY);
  if (!state || state !== storedState) {
    return { success: false, error: 'Invalid state — possible attaque CSRF. Reconnectez-vous.' };
  }

  // 2. Récupère le code_verifier PKCE
  const codeVerifier = getOAuthSession(YT_CODE_VERIFIER_KEY);
  if (!codeVerifier) {
    return { success: false, error: 'PKCE code_verifier manquant — session expirée. Reconnectez-vous.' };
  }

  // 3. Échange le code contre les tokens via l'edge function — redirect_uri dynamique
  let res: Response;
  try {
    res = await fetch(YOUTUBE_ENGINE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'exchange_code',
        code,
        state,
        code_verifier: codeVerifier,
        redirect_uri: getYouTubeRedirectUri(),
      }),
    });
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erreur réseau lors de l\'échange OAuth',
    };
  }

  const data = await res.json();

  // 4. Nettoie sessionStorage
  clearOAuthSession();

  return data;
}

// ══════════════════════════════════════════════════════════════
// Token Refresh — Obtient un access token valide côté client
// ══════════════════════════════════════════════════════════════

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getValidAccessToken(): Promise<string | null> {
  // Mémoire cache 60s pour éviter les appels répétés
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }

  const resp = await fetch(YOUTUBE_ENGINE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'status' }),
  });

  const data = await resp.json();
  if (!data.token_valid || !data.connected) return null;

  // On doit récupérer le token via l'edge function
  const tokenResp = await fetch(YOUTUBE_ENGINE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'get_valid_token' }),
  });

  const tokenData = await tokenResp.json();
  if (tokenData.access_token) {
    cachedToken = {
      token: tokenData.access_token,
      expiresAt: Date.now() + (tokenData.expires_in || 3600) * 1000,
    };
    return tokenData.access_token;
  }

  return null;
}



