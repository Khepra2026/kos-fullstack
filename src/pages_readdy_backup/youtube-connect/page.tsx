import { useState, useEffect, useCallback } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getYouTubeRedirectUri, initiateYouTubeAuth } from '@/lib/youtube-oauth';
import { StudioQueue } from '@/pages/youtube-connect/components/StudioQueue';

const YOUTUBE_ENGINE_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-youtube-master';
const YOUTUBE_API_KEY = import.meta.env.VITE_PUBLIC_YOUTUBE_API_KEY as string || '';

interface OAuthStatus {
  connected: boolean;
  verified: boolean;
  channel: {
    channel_id: string;
    handle: string;
    title: string;
  };
  token_valid: boolean;
  needs_reauth: boolean;
}

interface QueueItem {
  id: number;
  title: string;
  status: string;
  post_type: string;
  metadata: Record<string, unknown>;
  scheduled_for: string | null;
  created_at: string;
}

interface PublishResult {
  success: boolean;
  published_count: number;
  results: Array<{
    queue_id: number;
    title: string;
    youtube_video_id?: string;
    youtube_url?: string;
    privacy_status: string;
    status: string;
    error?: string;
  }>;
  note?: string;
  oauth_required?: boolean;
  oauth_url?: string;
}

interface YoutubeCredentials {
  clientId: string;
  clientSecret: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function YouTubeConnectPage() {
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorizing, setAuthorizing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [privacyStatus, setPrivacyStatus] = useState<'private' | 'unlisted' | 'public'>('private');
  const [credentials, setCredentials] = useState<YoutubeCredentials | null>(null);
  const [credentialsLoading, setCredentialsLoading] = useState(true);
  const [diagnosticResult, setDiagnosticResult] = useState<Record<string, unknown> | null>(null);
  const [testingConfig, setTestingConfig] = useState(false);
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);
  const [apiKeyChannelData, setApiKeyChannelData] = useState<Record<string, unknown> | null>(null);

  // Test OAuth config — passe les credentials du frontend en fallback
  const handleTestConfig = async () => {
    setTestingConfig(true);
    setDiagnosticResult(null);
    try {
      const payload: Record<string, unknown> = {
        action: 'test_oauth_config',
        redirect_uri: getYouTubeRedirectUri(),
      };
      // Fallback: envoie les credentials déjà chargés par le frontend
      if (credentials?.clientId) payload.client_id = credentials.clientId;
      if (credentials?.clientSecret) payload.client_secret = credentials.clientSecret;

      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        let parsed: Record<string, unknown> = {};
        try { parsed = JSON.parse(text); } catch { /* ignore */ }
        setDiagnosticResult({
          error: parsed.error || `HTTP ${resp.status}: Edge Function error`,
          raw: text,
        });
        return;
      }

      const data = await resp.json();
      setDiagnosticResult(data.diagnostic || data);
    } catch (err) {
      setDiagnosticResult({ error: err instanceof Error ? err.message : 'Edge Function unreachable' });
    } finally {
      setTestingConfig(false);
    }
  };

  // Load credentials from Supabase DB
  const loadCredentials = useCallback(async () => {
    setCredentialsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('platform_credentials')
        .select('credential_name, credential_value')
        .eq('platform', 'youtube')
        .eq('is_active', true);

      if (dbError || !data || data.length === 0) {
        setCredentials(null);
        return;
      }

      const clientId = data.find(r => r.credential_name === 'client_id')?.credential_value || '';
      const clientSecret = data.find(r => r.credential_name === 'client_secret')?.credential_value || '';

      if (clientId && clientSecret) {
        setCredentials({ clientId, clientSecret });
      } else {
        setCredentials(null);
      }
    } catch {
      setCredentials(null);
    } finally {
      setCredentialsLoading(false);
    }
  }, []);

  // Check URL params for OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const errorParam = params.get('error');
    const channel = params.get('channel');
    const verified = params.get('verified');

    if (success === 'true') {
      setSuccessMessage(
        `YouTube connecté avec succès ! Chaîne : ${channel || 'KHEPRA EXPERTS'}` +
        (verified === 'true' ? ' ✓ Vérifiée' : '')
      );
      // Clean URL
      window.history.replaceState({}, '', '/youtube-connect');
      setTimeout(() => setSuccessMessage(null), 8000);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, '', '/youtube-connect');
      setTimeout(() => setError(null), 10000);
    }
  }, []);

  const checkStatus = useCallback(async () => {
    setLoading(true);
    try {
      const payload: Record<string, unknown> = { action: 'status' };
      if (credentials?.clientId) payload.client_id = credentials.clientId;
      if (credentials?.clientSecret) payload.client_secret = credentials.clientSecret;

      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      setOauthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  const loadQueue = useCallback(async () => {
    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list' }),
      });
      const data = await resp.json();
      if (data.posts) {
        setQueueItems(data.posts);
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  useEffect(() => {
    if (!credentialsLoading) {
      checkStatus();
      loadQueue();
    }
  }, [checkStatus, loadQueue, credentialsLoading]);

  // Vérification de la clé API YouTube
  const checkApiKey = useCallback(async () => {
    if (!YOUTUBE_API_KEY) {
      setApiKeyValid(false);
      return;
    }
    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'channel_info', api_key: YOUTUBE_API_KEY }),
      });
      const data = await resp.json();
      setApiKeyValid(data.api_key_valid === true);
      if (data.channel) setApiKeyChannelData(data.channel);
    } catch {
      setApiKeyValid(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleAuthorize = async () => {
    setAuthorizing(true);
    setError(null);
    try {
      // Re-read credentials from Supabase to avoid stale closure
      let clientId = credentials?.clientId || '';
      let clientSecret = credentials?.clientSecret || '';

      if (!clientId || !clientSecret) {
        const { data, error: dbError } = await supabase
          .from('platform_credentials')
          .select('credential_name, credential_value')
          .eq('platform', 'youtube')
          .eq('is_active', true);

        if (!dbError && data && data.length > 0) {
          clientId = data.find((r: { credential_name: string }) => r.credential_name === 'client_id')?.credential_value || '';
          clientSecret = data.find((r: { credential_name: string }) => r.credential_name === 'client_secret')?.credential_value || '';
        }
      }

      // PKCE client-side : génération du code_verifier + code_challenge dans le navigateur
      // Le code_verifier est stocké dans sessionStorage, le code_challenge est envoyé à l'edge function
      const result = await initiateYouTubeAuth(
        clientId && clientSecret ? { clientId, clientSecret } : null
      );

      if (result.authUrl) {
        window.location.href = result.authUrl;
      } else if (result.setupRequired) {
        setError(result.error || 'YouTube Client ID non configuré.');
      } else {
        setError(result.error || 'Erreur lors de la génération du lien OAuth');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setAuthorizing(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirm('Révoquer la connexion YouTube ? Cette action déconnectera KOS de votre chaîne YouTube.')) return;
    try {
      const payload: Record<string, unknown> = { action: 'revoke' };
      if (credentials?.clientId) payload.client_id = credentials.clientId;
      if (credentials?.clientSecret) payload.client_secret = credentials.clientSecret;

      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await resp.json();
      await checkStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la révocation');
    }
  };

  const handlePublishAll = async () => {
    const drafts = queueItems.filter(i => i.status === 'draft' || i.status === 'scheduled');
    if (drafts.length === 0) {
      setError('Aucun post en brouillon à publier. Générez d\'abord du contenu depuis le Studio Média.');
      return;
    }

    setPublishing(true);
    setPublishResult(null);
    setError(null);

    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          count: drafts.length,
          privacy_status: privacyStatus,
        }),
      });
      const data = await resp.json();
      setPublishResult(data);

      if (data.success) {
        await loadQueue();
      } else if (data.oauth_required) {
        setError('YouTube OAuth non connecté. Connectez votre chaîne YouTube d\'abord.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de publication');
    } finally {
      setPublishing(false);
    }
  };

  const handlePublishSingle = async (queueId: number) => {
    setPublishing(true);
    setPublishResult(null);
    setError(null);

    try {
      const resp = await fetch(YOUTUBE_ENGINE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'publish',
          queue_id: queueId,
          count: 1,
          privacy_status: privacyStatus,
        }),
      });
      const data = await resp.json();
      setPublishResult(data);

      if (data.success) {
        await loadQueue();
      } else if (data.oauth_required) {
        setError('YouTube OAuth non connecté. Connectez votre chaîne YouTube d\'abord.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de publication');
    } finally {
      setPublishing(false);
    }
  };

  const drafts = queueItems.filter(i => i.status === 'draft' || i.status === 'scheduled');
  const published = queueItems.filter(i => i.status === 'published');

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="KHEPRA-KOS YouTube Connect™ — Publication Automatique OAuth | KHEPRA EXPERTS"
        description="Connectez votre chaîne YouTube @KHEPRAEXPERTS via OAuth 2.0 pour la publication 100% automatique des vidéos générées par KHEPRA-KOS. YouTube Data API v3. Support : essochamanu@gmail.com."
        keywords="KHEPRA-KOS, YouTube OAuth, KOS YouTube Publisher, publication automatique YouTube, KHEPRA EXPERTS, API YouTube"
        canonicalPath="/youtube-connect"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF0000]/10 text-[#FF0000] text-xs font-semibold mb-4">
                <i className="ri-youtube-fill"></i>KHEPRA-KOS YouTube Connect™
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Publication YouTube 100% Automatique — KHEPRA-KOS OAuth 2.0
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Connectez votre chaîne @KHEPRAEXPERTS à KHEPRA-KOS via OAuth 2.0. Les vidéos générées par le Studio Média sont publiées automatiquement sur YouTube — scripts, descriptions, tags, miniatures. Zéro copier-coller.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/kos-youtube-download"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF0000]/10 text-[#FF0000] text-sm font-bold hover:bg-[#FF0000]/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-cloud-2-line" />
                Download Studio
              </Link>
              <Link
                to="/kos-production-package-factory"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-folder-open-line" />
                Package Factory
              </Link>
              <Link
                to="/kos-multichannel-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#FF0000]/20 text-[#FF0000] text-sm font-bold hover:bg-[#FF0000]/5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-radar-line" />
                Multichannel
              </Link>
              <Link
                to="/kos-voice-ai-studio"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mic-line" />
                Voice AI
              </Link>
              <Link
                to="/kos-community-manager-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-message-2-line" />
                Community
              </Link>
              <Link
                to="/kos-youtube-analytics"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-line-chart-line" />
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success / Error Messages */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <i className="ri-checkbox-circle-fill text-emerald-500 text-xl" />
            <p className="text-sm font-semibold text-emerald-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* OAuth State Security Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-background-100 border border-background-200/70">
          <i className="ri-shield-check-fill text-emerald-500 text-xl" />
          <div>
            <p className="text-sm font-bold text-foreground-800">Sécurité OAuth renforcée — CSRF State + PKCE S256 activés</p>
            <p className="text-xs text-foreground-500">
              Double protection anti-interception : token state UUID anti-CSRF (RFC 6749 §10.12) + code_challenge SHA256 côté navigateur (PKCE). Le code_verifier ne quitte jamais votre session, stocké 10 minutes dans sessionStorage, vérifié au callback, puis détruit.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <i className="ri-error-warning-fill text-red-500 text-xl flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">{error}</p>
              {error.includes('Client ID non configuré') && (
                <div className="mt-3 p-4 rounded-lg bg-white border border-red-100">
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">Solution :</h4>
                  <ol className="text-xs text-foreground-600 space-y-1 list-decimal list-inside">
                    <li>Allez sur <Link to="/kos-external-api-config-command" className="text-[#FF0000] underline font-bold">KOS External API Config Command</Link></li>
                    <li>Ouvrez la section <strong>YouTube / Google OAuth 2.0</strong></li>
                    <li>Collez votre Client ID et Client Secret Google</li>
                    <li>Cliquez <strong>"Enregistrer la configuration"</strong> (le badge doit passer à "Production Ready")</li>
                    <li>Revenez ici et cliquez <strong>"Tester la configuration OAuth"</strong> pour vérifier</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Connection Status */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center">
                    <i className="ri-youtube-fill text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground-950">KHEPRA EXPERTS</h2>
                    <p className="text-xs text-foreground-500">@KHEPRAEXPERTS</p>
                  </div>
                </div>

                {loading || credentialsLoading ? (
                  <div className="flex items-center gap-2 text-sm text-foreground-400">
                    <div className="w-4 h-4 border-2 border-[#FF0000]/30 border-t-[#FF0000] rounded-full animate-spin" />
                    Vérification de la connexion...
                  </div>
                ) : oauthStatus?.connected ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-600">Connecté via OAuth 2.0</span>
                    </div>

                    {oauthStatus.verified && (
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ri-shield-check-fill text-[#FF0000] text-sm" />
                        <span className="text-xs font-semibold text-foreground-600">
                          Chaîne vérifiée : {oauthStatus.channel.title}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Channel ID</span>
                        <span className="text-foreground-700 font-mono text-xs">{oauthStatus.channel.channel_id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Handle</span>
                        <span className="text-foreground-700 font-mono">{oauthStatus.channel.handle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Token</span>
                        <span className="text-emerald-600 text-xs font-bold">Valide</span>
                      </div>
                    </div>

                    <button
                      onClick={handleRevoke}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-link-unlink-m" />
                      Déconnecter YouTube
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-sm font-bold text-amber-600">Non connecté</span>
                    </div>

                    <p className="text-xs text-foreground-500 mb-4">
                      Connectez votre chaîne YouTube pour permettre à KHEPRA-KOS de publier automatiquement les vidéos générées.
                      <br /><br />
                      <strong className="text-foreground-700">Solution hybride :</strong> le{' '}
                      <Link to="/kos-youtube-download" className="text-[#FF0000] underline font-bold">Download Studio</Link>
                      {' '}reste disponible pour télécharger vos vidéos et les publier manuellement en parallèle.
                    </p>

                    {/* Google OAuth Validation Alert — shown when credentials exist but Google blocks */}
                    {credentials && (
                      <div className="mb-5 p-4 rounded-xl bg-amber-50 border-2 border-amber-300">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-alert-fill text-amber-600 text-lg" />
                          <span className="text-sm font-bold text-amber-800">2 étapes requises pour débloquer YouTube</span>
                        </div>

                        {/* ÉTAPE 1 — External Mode */}
                        <div className="mb-3 p-3 rounded-lg bg-red-50 border-2 border-red-300">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">1</span>
                            <p className="text-xs font-bold text-red-800">Erreur 403 org_internal — Passer en mode External</p>
                          </div>
                          <p className="text-[11px] text-red-700 mb-2">
                            Votre app OAuth est configurée en <strong>Internal</strong> (réservée aux comptes Google Workspace). Votre email Gmail personnel <code className="font-mono bg-red-100 px-1 rounded">essochamanu@gmail.com</code> est bloqué. Solution :
                          </p>
                          <ol className="space-y-1 text-[11px] text-red-700">
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">①</span>
                              <span>Allez sur <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="font-bold underline text-red-800">console.cloud.google.com → OAuth consent screen</a></span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">②</span>
                              <span>Cliquez <strong>"EDIT APP"</strong> (bouton d'édition en haut)</span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">③</span>
                              <span>Dans <strong>User Type</strong>, changez <strong>Internal → External</strong></span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">④</span>
                              <span>Cliquez <strong>"SAVE AND CONTINUE"</strong></span>
                            </li>
                          </ol>
                        </div>

                        {/* ÉTAPE 2 — Test User */}
                        <div className="mb-3 p-3 rounded-lg bg-amber-50 border-2 border-amber-300">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">2</span>
                            <p className="text-xs font-bold text-amber-800">Ajouter votre email comme Test User</p>
                          </div>
                          <p className="text-[11px] text-amber-700 mb-2">
                            Une fois en mode External, l'app est en mode <strong>Testing</strong> par défaut — seuls les test users déclarés peuvent l'utiliser.
                          </p>
                          <ol className="space-y-1 text-[11px] text-amber-700">
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">①</span>
                              <span>Dans OAuth consent screen, faites défiler jusqu'à la section <strong>"Test users"</strong></span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">②</span>
                              <span>Cliquez <strong>"+ ADD USERS"</strong></span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">③</span>
                              <span>Entrez <code className="font-mono bg-amber-100 px-1 rounded font-bold">essochamanu@gmail.com</code> et validez</span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="font-bold flex-shrink-0">④</span>
                              <span>Cliquez <strong>"SAVE"</strong> — puis revenez ici et cliquez "Connecter avec Google"</span>
                            </li>
                          </ol>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-amber-200">
                          <p className="text-xs font-bold text-foreground-900 mb-1">Solution Définitive (Production)</p>
                          <p className="text-[11px] text-foreground-600">
                            Pour accéder sans restrictions (sans test user), cliquez <strong>"Submit for verification"</strong> dans l'écran de consentement. Fournissez une vidéo de démonstration et votre politique de confidentialité. Délai : 3-5 jours ouvrés.
                          </p>
                        </div>
                        <p className="text-[11px] text-amber-600 mt-3">
                          <strong>Scope demandé :</strong> <code className="font-mono">youtube.upload</code> uniquement (minimum requis). En mode Testing, 100 test users maximum.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleAuthorize}
                      disabled={authorizing}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {authorizing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Redirection vers Google...
                        </>
                      ) : (
                        <>
                          <i className="ri-google-fill text-lg" />
                          Connecter avec Google
                        </>
                      )}
                    </button>

                    {/* Show credentials status */}
                    {credentialsLoading ? (
                      <div className="mt-4 flex items-center gap-2 text-xs text-foreground-400">
                        <div className="w-3 h-3 border border-foreground-300 border-t-foreground-500 rounded-full animate-spin" />
                        Vérification des credentials...
                      </div>
                    ) : credentials ? (
                      <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-check-line text-emerald-500 text-sm" />
                          <span className="text-xs font-bold text-emerald-700">Credentials YouTube prêts</span>
                        </div>
                        <p className="text-[11px] text-emerald-600">
                          Client ID : {credentials.clientId.substring(0, 20)}... · Cliquez sur "Connecter avec Google" pour lier votre chaîne.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <p className="text-xs text-amber-700">
                          <strong>Prérequis :</strong> Les credentials YouTube ne sont pas configurés. Allez sur <Link to="/kos-external-api-config-command" className="text-[#FF0000] underline">API Config Command</Link> pour les saisir.
                        </p>
                      </div>
                    )}

                    {/* Diagnostic Button */}
                    <button
                      onClick={handleTestConfig}
                      disabled={testingConfig}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-background-100 border border-background-200 text-foreground-600 text-xs font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      {testingConfig ? (
                        <>
                          <div className="w-3 h-3 border border-foreground-300 border-t-foreground-600 rounded-full animate-spin" />
                          Test de la configuration...
                        </>
                      ) : (
                        <>
                          <i className="ri-stethoscope-line" />
                          Tester la configuration OAuth
                        </>
                      )}
                    </button>

                    {/* Diagnostic Results */}
                    {diagnosticResult && (
                      <div className={`mt-3 p-3 rounded-lg border text-xs ${
                        diagnosticResult.error
                          ? 'bg-red-50 border-red-200'
                          : diagnosticResult.client_id_configured
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-amber-50 border-amber-200'
                      }`}>
                        <p className="font-bold mb-2 text-foreground-900">Résultat du diagnostic :</p>
                        <div className="space-y-1 text-foreground-700">
                          <div className="flex justify-between">
                            <span>Client ID</span>
                            <span className={diagnosticResult.client_id_configured ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                              {diagnosticResult.client_id_configured ? '✓ Configuré' : '✗ Manquant'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Client Secret</span>
                            <span className={diagnosticResult.client_secret_configured ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                              {diagnosticResult.client_secret_configured ? '✓ Configuré' : '✗ Manquant'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Edge Function</span>
                            <span className={diagnosticResult.edge_function_reachable ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>
                              {diagnosticResult.edge_function_reachable ? '✓ Accessible' : '✗ Inaccessible'}
                            </span>
                          </div>
                        </div>
                        {diagnosticResult.redirect_uri && (
                          <div className="mt-2 pt-2 border-t border-background-200">
                            <p className="text-[11px] font-bold text-foreground-800 mb-1">
                              ⚠️ URI de redirection à configurer dans Google Cloud Console :
                            </p>
                            <code className="block text-[11px] font-mono text-[#FF0000] bg-white/60 rounded px-2 py-1 border border-background-200 break-all">
                              {diagnosticResult.redirect_uri as string}
                            </code>
                          </div>
                        )}
                        {diagnosticResult.advice && (
                          <p className="mt-2 text-[11px] text-foreground-600 leading-relaxed">
                            {diagnosticResult.advice as string}
                          </p>
                        )}
                        {diagnosticResult.error && (
                          <p className="text-red-600 font-bold mt-1">Erreur : {diagnosticResult.error as string}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-background-200 px-6 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Vidéos en attente</span>
                  <span className="text-sm font-bold text-foreground-950">{drafts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Vidéos publiées</span>
                  <span className="text-sm font-bold text-emerald-600">{published.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Mode publication</span>
                  <span className="text-xs font-bold text-foreground-700">
                    {oauthStatus?.connected ? 'Automatique' : 'Manuel'}
                  </span>
                </div>
                {/* API Key Status */}
                <div className="flex justify-between items-center pt-2 border-t border-background-200">
                  <span className="text-xs text-foreground-500">Clé API YouTube</span>
                  {apiKeyValid === null ? (
                    <span className="w-3 h-3 border-2 border-foreground-300 border-t-foreground-500 rounded-full animate-spin" />
                  ) : apiKeyValid ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-600">
                      <i className="ri-error-warning-line text-[10px] mr-0.5" />Non vérifiée
                    </span>
                  )}
                </div>
                {apiKeyValid && apiKeyChannelData && (
                  <div className="text-[10px] text-foreground-400 truncate">
                    {(apiKeyChannelData.statistics as Record<string, string>)?.subscriberCount || '0'} abonnés · {(apiKeyChannelData.statistics as Record<string, string>)?.videoCount || '0'} vidéos
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Queue & Publishing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Privacy Selector & Publish All */}
            {drafts.length > 0 && (
              <div className="rounded-2xl bg-white border border-background-200 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">
                      {drafts.length} vidéo{drafts.length > 1 ? 's' : ''} prête{drafts.length > 1 ? 's' : ''} à publier
                    </h3>
                    <p className="text-xs text-foreground-500 mt-1">
                      Choisissez le niveau de confidentialité puis publiez sur YouTube
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={privacyStatus}
                      onChange={(e) => setPrivacyStatus(e.target.value as typeof privacyStatus)}
                      className="px-3 py-2 rounded-xl border border-background-200 text-sm font-bold text-foreground-700 bg-white cursor-pointer"
                    >
                      <option value="private">Privée</option>
                      <option value="unlisted">Non répertoriée</option>
                      <option value="public">Publique</option>
                    </select>
                    <button
                      onClick={handlePublishAll}
                      disabled={publishing || !oauthStatus?.connected}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {publishing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Publication...
                        </>
                      ) : (
                        <>
                          <i className="ri-upload-cloud-line" />
                          Publier {drafts.length > 1 ? `les ${drafts.length}` : ''}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Publish Results */}
            {publishResult && (
              <div className={`rounded-2xl p-5 border ${
                publishResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <i className={`${publishResult.success ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-error-warning-fill text-red-500'} text-lg`} />
                  <h3 className="font-bold text-foreground-950">
                    {publishResult.success
                      ? `${publishResult.published_count} vidéo(s) publiée(s) sur YouTube`
                      : 'Erreur de publication'}
                  </h3>
                </div>

                {publishResult.note && (
                  <p className="text-xs text-foreground-600 mb-3">{publishResult.note}</p>
                )}

                {publishResult.results && publishResult.results.length > 0 && (
                  <div className="space-y-2">
                    {publishResult.results.map((r) => (
                      <div key={r.queue_id} className={`flex items-center gap-3 p-3 rounded-xl ${
                        r.status === 'published' ? 'bg-white border border-emerald-200' : 'bg-white border border-red-200'
                      }`}>
                        <i className={`${r.status === 'published' ? 'ri-check-line text-emerald-500' : 'ri-close-line text-red-500'} text-lg`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground-950 truncate">{r.title}</p>
                          {r.youtube_url ? (
                            <a
                              href={r.youtube_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#FF0000] hover:underline truncate block"
                            >
                              {r.youtube_url}
                            </a>
                          ) : (
                            <p className="text-xs text-red-500">{r.error}</p>
                          )}
                        </div>
                        {r.status === 'published' && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 uppercase">
                            {r.privacy_status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Queue Items */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-5 border-b border-background-200">
                <h3 className="font-heading text-lg font-bold text-foreground-950">
                  File d'attente YouTube
                </h3>
                <p className="text-xs text-foreground-500 mt-1">
                  Vidéos générées par KHEPRA-KOS, prêtes à être publiées
                </p>
              </div>

              {queueItems.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-movie-line text-3xl text-foreground-300" />
                  </div>
                  <p className="text-sm text-foreground-500 mb-2">Aucune vidéo dans la file d'attente</p>
                  <Link
                    to="/studio-media"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF0000] text-white text-sm font-bold hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-magic-line" />
                    Générer du contenu vidéo
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-background-200">
                  {queueItems.map((item) => {
                    const metadata = item.metadata || {};
                    const videoType = (metadata.video_type as string) || item.post_type;
                    const youtubeId = metadata.youtube_video_id as string;
                    const youtubeUrl = metadata.youtube_url as string;

                    return (
                      <div key={item.id} className="p-5 hover:bg-background-50/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#FF0000]/10 flex items-center justify-center flex-shrink-0">
                            <i className={`${youtubeId ? 'ri-check-line text-emerald-500' : 'ri-time-line text-amber-500'} text-lg`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="text-sm font-bold text-foreground-950">{item.title}</h4>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.status === 'published'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : item.status === 'scheduled'
                                  ? 'bg-secondary-50 text-secondary-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {item.status === 'published' ? 'Publié' : item.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
                              </span>
                              <span className="text-[10px] font-semibold text-foreground-400 uppercase">{videoType?.replace(/_/g, ' ')}</span>
                            </div>

                            {youtubeUrl ? (
                              <a
                                href={youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#FF0000] hover:underline"
                              >
                                {youtubeUrl}
                              </a>
                            ) : (
                              <p className="text-xs text-foreground-500">
                                Créé le {formatDate(item.created_at)}
                                {item.scheduled_for && ` · Programmé pour ${formatDate(item.scheduled_for)}`}
                              </p>
                            )}

                            {item.status !== 'published' && (
                              <button
                                onClick={() => handlePublishSingle(item.id)}
                                disabled={publishing || !oauthStatus?.connected}
                                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF0000]/10 text-[#FF0000] text-xs font-bold hover:bg-[#FF0000]/20 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <i className="ri-upload-cloud-line" />
                                Publier sur YouTube
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ═══════════════ KHEPRA-KOS Auto Publisher™ — Studio Queue ═══════════════ */}
            <StudioQueue />

            {/* Guide Setup — show when not connected and credentials loaded */}
            {!oauthStatus?.connected && !loading && !credentialsLoading && (
              <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                  Guide de configuration OAuth 2.0 — Étape par étape
                </h3>

                {/* Google OAuth Validation Warning */}
                {credentials && (
                  <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-alert-fill text-amber-600 text-lg" />
                      <span className="text-sm font-bold text-amber-800">Vous voyez "Google n'a pas validé cette application" ?</span>
                    </div>
                    <p className="text-xs text-amber-700 mb-2">
                      Cela signifie que Google a validé votre <strong>marque</strong> mais pas l'application pour les scopes sensibles. Vous avez deux options :
                    </p>
                    <ol className="text-xs text-amber-700 space-y-1 list-decimal list-inside">
                      <li><strong>Mode Test (immédiat) :</strong> Dans Google Cloud Console → OAuth consent screen → statut <strong>Testing</strong> → ajoutez votre email dans <strong>Test users</strong></li>
                      <li><strong>Soumission vérification (3-5 jours) :</strong> Cliquez <strong>Submit for verification</strong> avec une vidéo de démo et votre politique de confidentialité</li>
                    </ol>
                    <p className="text-[11px] text-amber-600 mt-2">
                      Scope actuel : <code className="font-mono">youtube.upload</code> uniquement (minimum requis). Les scopes sensibles ont été retirés.
                    </p>
                  </div>
                )}

                {/* ⚠️ CRITICAL: Redirect URI callout */}
                <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-alert-fill text-red-500 text-lg" />
                    <span className="text-sm font-bold text-red-700">VÉRIFICATION CRITIQUE — Google Cloud Console</span>
                  </div>
                  <p className="text-xs text-red-700 mb-2">
                    L'URI de redirection ci-dessous doit être EXACTEMENT identique dans Google Cloud Console. Un seul caractère différent = échec.
                  </p>
                  <code className="block text-xs font-mono text-red-600 bg-white rounded-lg px-3 py-2 border border-red-200 break-all select-all">
                    {getYouTubeRedirectUri()}
                  </code>
                  <p className="text-[11px] text-red-600 mt-2">
                    Dans Google Cloud Console → APIs & Services → Credentials → votre Client ID OAuth 2.0 → <strong>Authorized redirect URIs</strong> → Ajoutez cette URL exacte.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Google Cloud Console — Créer le projet</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Allez sur <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] underline">console.cloud.google.com/apis/credentials</a>, créez un projet, activez <strong>YouTube Data API v3</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Écran de consentement OAuth — External + Test User</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        <strong className="text-red-600">Erreur 403 org_internal ?</strong> Votre app est en mode <strong>Internal</strong>. Allez dans <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] underline font-bold">OAuth consent screen</a>, cliquez <strong>"EDIT APP"</strong>, changez <strong>User Type : Internal → External</strong>, puis <strong>"SAVE AND CONTINUE"</strong>.<br /><br />
                        Ensuite faites défiler jusqu'à <strong>"Test users"</strong>, cliquez <strong>"+ ADD USERS"</strong>, entrez <code className="font-mono text-[#FF0000] bg-red-50 px-1 rounded">essochamanu@gmail.com</code> et sauvegardez. Vous pourrez alors vous connecter immédiatement.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">ID client OAuth 2.0 + URI de redirection</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Créez un ID client OAuth 2.0 type <strong>Application Web</strong>. Ajoutez l'URI de redirection ci-dessus dans <strong>Authorized redirect URIs</strong>. Copiez le Client ID et Client Secret.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Saisir dans KOS</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Allez sur <Link to="/kos-external-api-config-command" className="text-[#FF0000] underline">KOS External API Config Command</Link>, ouvrez la section YouTube, collez le Client ID et Client Secret, puis cliquez <strong>"Enregistrer la configuration"</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Revenez ici et connectez-vous</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Rafraîchissez cette page, vérifiez que le badge "Credentials YouTube prêts" apparaît en vert, puis cliquez sur <strong>"Connecter avec Google"</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legal & Support Section */}
      <section className="py-10 bg-background-100 border-y border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">Support</h4>
              <p className="text-xs text-foreground-600 mb-2">
                Une question sur l'authentification YouTube OAuth ou la publication automatique ?
              </p>
              <a href="mailto:essochamanu@gmail.com" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF0000] hover:underline">
                <i className="ri-mail-line" />
                essochamanu@gmail.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">Légal</h4>
              <div className="flex flex-col gap-1.5">
                <Link to="/privacy/" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-lock-line mr-1.5" />
                  Politique de Confidentialité
                </Link>
                <Link to="/terms" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-file-text-line mr-1.5" />
                  Conditions d'Utilisation
                </Link>
                <Link to="/legal" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-scales-3-line mr-1.5" />
                  Mentions Légales
                </Link>
                <Link to="/cookies" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-information-line mr-1.5" />
                  Politique des Cookies
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">KHEPRA-KOS</h4>
              <p className="text-xs text-foreground-600 mb-2">
                Plateforme KHEPRA Operating System — Automatisation de la chaîne YouTube @KHEPRAEXPERTS via OAuth 2.0 Google.
              </p>
              <p className="text-xs text-foreground-500">
                Édité par <strong>KHEPRA EXPERTS SARL U</strong> — RCCM TG-LFW-01-2026-B13-01347 · NIF 1002124216 · Régime RÉEL · CNSS 217653 · Lomé, Togo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-foreground-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                Prêt à automatiser votre chaîne YouTube ?
              </h2>
              <p className="text-gray-400 text-sm">
                Générez du contenu depuis le Studio Média, puis publiez en 1 clic sur @KHEPRAEXPERTS
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/kos-youtube-download"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-cloud-2-line" />
                Download Studio
              </Link>
              <Link
                to="/studio-media"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-magic-line" />
                Studio Média
              </Link>
              <Link
                to="/kos-voice-ai-studio"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}
              >
                <i className="ri-mic-line" />
                Voice AI Studio
              </Link>
              <Link
                to="/kos-youtube-analytics"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-line-chart-line" />
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



