import { useState, useCallback } from 'react';
import {
  initiateYouTubeAuth,
  handleYouTubeCallback,
  clearOAuthSession,
} from '@/lib/youtube-oauth';

interface YouTubeCredentials {
  clientId: string;
  clientSecret: string;
}

interface CallbackResult {
  success: boolean;
  channel_title?: string;
  channel_verified?: boolean;
  error?: string;
}

interface AuthActionResult {
  authUrl?: string;
  setupRequired?: boolean;
  error?: string;
}

export function useYouTubeOAuth() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const connectYouTube = useCallback(
    async (credentials?: YouTubeCredentials | null): Promise<AuthActionResult> => {
      setIsConnecting(true);
      setAuthError(null);

      try {
        const result = await initiateYouTubeAuth(credentials);

        if (result.authUrl) {
          window.location.href = result.authUrl;
          return { authUrl: result.authUrl };
        }

        if (result.setupRequired) {
          setAuthError(result.error || 'YouTube Client ID non configuré.');
          return { setupRequired: true, error: result.error };
        }

        setAuthError(result.error || 'Erreur lors de la génération du lien OAuth');
        return { error: result.error };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur lors de la connexion à Google';
        setAuthError(message);
        return { error: message };
      } finally {
        setIsConnecting(false);
      }
    },
    [],
  );

  const handleCallback = useCallback(
    async (code: string, state: string): Promise<CallbackResult> => {
      const result = await handleYouTubeCallback(code, state);
      clearOAuthSession();
      return result;
    },
    [],
  );

  return {
    connectYouTube,
    handleCallback,
    isConnecting,
    authError,
    clearError: () => setAuthError(null),
  };
}