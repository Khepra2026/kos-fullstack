import { useState, useEffect, useCallback } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const TIKTOK_OAUTH_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-tiktok-oauth';

interface OAuthStatus {
  connected: boolean;
  expired: boolean;
  has_refresh: boolean;
  needs_reauth: boolean;
  credentials_configured?: boolean;
  user_name: string | null;
  display_name: string | null;
  open_id: string | null;
  scopes: string | null;
  expires_at: string | null;
  provider: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' a ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function getScopeLabel(scope: string): string {
  const labels: Record<string, string> = {
    'user.info.basic': 'Profil utilisateur',
    'video.publish': 'Publication video',
    'video.upload': 'Upload video',
    'user.info.profile': 'Profil complet',
    'user.info.stats': 'Statistiques',
  };
  return labels[scope] || scope;
}

function getScopeIcon(scope: string): string {
  const icons: Record<string, string> = {
    'user.info.basic': 'ri-user-line',
    'video.publish': 'ri-share-forward-line',
    'video.upload': 'ri-upload-cloud-line',
    'user.info.profile': 'ri-profile-line',
    'user.info.stats': 'ri-bar-chart-line',
  };
  return icons[scope] || 'ri-check-line';
}

export default function TikTokConnectPage() {
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorizing, setAuthorizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const errorParam = params.get('error');
    const user = params.get('user');
    const scopes = params.get('scopes');

    if (success === 'true') {
      setSuccessMessage(
        `TikTok connecte avec succes ! Utilisateur : ${user || 'N/A'}` +
        (scopes ? ` · Scopes : ${scopes}` : '')
      );
      window.history.replaceState({}, '', '/tiktok-connect');
      setTimeout(() => setSuccessMessage(null), 10000);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, '', '/tiktok-connect');
      setTimeout(() => setError(null), 15000);
    }
  }, []);

  const checkStatus = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${TIKTOK_OAUTH_URL}?action=status`);
      const data = await resp.json();
      setOauthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleAuthorize = async () => {
    setAuthorizing(true);
    setError(null);
    try {
      const resp = await fetch(`${TIKTOK_OAUTH_URL}?action=authorize`, { method: 'POST' });
      const data = await resp.json();

      if (data.success && data.auth_url) {
        window.location.href = data.auth_url;
      } else if (data.setup_required) {
        setError(
          'TikTok Client Key non configuree. Allez dans KOS External API Config Command pour saisir vos credentials TikTok.'
        );
      } else {
        setError(data.error || 'Erreur lors de la generation du lien OAuth');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setAuthorizing(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirm('Revoquer la connexion TikTok ? Cette action deconnectera KOS de TikTok.')) return;
    try {
      await fetch(`${TIKTOK_OAUTH_URL}?action=revoke`, { method: 'POST' });
      await checkStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la revocation');
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <SeoHead
        title="KOS TikTok Connect — Publication Automatique OAuth | KHEPRA EXPERTS"
        description="Connectez votre compte TikTok via OAuth 2.0 pour la publication automatique des videos generees par KHEPRA-KOS. TikTok API v2."
        keywords="KOS TikTok, TikTok OAuth, publication TikTok automatique, KHEPRA EXPERTS, automatisation TikTok, video TikTok"
        canonicalPath="/tiktok-connect"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF0050]/10 text-[#FF0050] text-xs font-semibold mb-4">
                <i className="ri-tiktok-fill" />
                KOS TikTok Connect
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Publication TikTok 100% Automatique — OAuth 2.0
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Connectez votre compte TikTok via OAuth 2.0. Les videos generees par le Studio Media KHEPRA-KOS sont publiees automatiquement — scripts, descriptions, hashtags. Zero copier-coller, zero intervention manuelle.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to="/kos-social-media-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF0050]/10 text-[#FF0050] text-sm font-bold hover:bg-[#FF0050]/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-radar-line" />
                Social Command
              </Link>
              <Link
                to="/kos-multichannel-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-smartphone-line" />
                Multichannel
              </Link>
              <Link
                to="/linkedin-connect"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-sm font-bold hover:bg-[#0A66C2]/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-linkedin-fill" />
                LinkedIn
              </Link>
              <Link
                to="/youtube-connect"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF0000]/10 text-[#FF0000] text-sm font-bold hover:bg-[#FF0000]/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-youtube-fill" />
                YouTube
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

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <i className="ri-error-warning-fill text-red-500 text-xl flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">{error}</p>
              {error.includes('Client Key non configuree') && (
                <div className="mt-3 p-4 rounded-lg bg-white border border-red-100">
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">Solution :</h4>
                  <ol className="text-xs text-foreground-600 space-y-1 list-decimal list-inside">
                    <li>Allez sur <Link to="/kos-external-api-config-command" className="text-[#FF0050] underline font-bold">KOS External API Config Command</Link></li>
                    <li>Saisissez le <strong>Client Key</strong> et <strong>Client Secret</strong> TikTok</li>
                    <li>Revenez ici et cliquez sur <strong>"Connecter avec TikTok"</strong></li>
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
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                    <i className="ri-tiktok-fill text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground-950">KHEPRA EXPERTS</h2>
                    <p className="text-xs text-foreground-500">Compte TikTok</p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-foreground-400">
                    <div className="w-4 h-4 border-2 border-[#FF0050]/30 border-t-[#FF0050] rounded-full animate-spin" />
                    Verification de la connexion...
                  </div>
                ) : oauthStatus?.connected ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-600">Connecte via OAuth 2.0</span>
                    </div>

                    {oauthStatus.display_name && (
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ri-user-smile-line text-[#FF0050] text-sm" />
                        <span className="text-xs font-semibold text-foreground-600">
                          @{oauthStatus.display_name}
                        </span>
                      </div>
                    )}

                    {oauthStatus.scopes && (
                      <div className="mb-4 space-y-1.5">
                        <p className="text-xs font-semibold text-foreground-500 mb-1">Permissions :</p>
                        {oauthStatus.scopes.split(',').map((scope) => (
                          <div key={scope} className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className={`${getScopeIcon(scope.trim())} text-emerald-500 text-xs`} />
                            </div>
                            <span className="text-foreground-600">{getScopeLabel(scope.trim())}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 mb-6">
                      {oauthStatus.open_id && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-500">Open ID</span>
                          <span className="text-foreground-700 font-mono text-xs truncate ml-2 max-w-[150px]">{oauthStatus.open_id}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Token</span>
                        <span className="text-emerald-600 text-xs font-bold">Valide</span>
                      </div>
                      {oauthStatus.expires_at && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-500">Expire le</span>
                          <span className="text-foreground-700 text-xs">{formatDate(oauthStatus.expires_at)}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleRevoke}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-link-unlink-m" />
                      Deconnecter TikTok
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-sm font-bold text-amber-600">Non connecte</span>
                    </div>

                    {oauthStatus?.credentials_configured === false && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-key-2-line text-red-500" />
                          <span className="text-xs font-bold text-red-700">Credentials TikTok manquants</span>
                        </div>
                        <CredentialsSetupForm onSaved={() => { checkStatus(); }} />
                      </div>
                    )}

                    {oauthStatus?.credentials_configured === true && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <i className="ri-check-line text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-700">Credentials configures — pret a connecter</span>
                        </div>
                      </div>
                    )}

                    {oauthStatus?.credentials_configured === undefined && (
                      <p className="text-xs text-foreground-500 mb-4">
                        Connectez votre compte TikTok pour permettre a KOS de publier automatiquement les videos generees par le Studio Media.
                      </p>
                    )}

                    <button
                      onClick={handleAuthorize}
                      disabled={authorizing || oauthStatus?.credentials_configured === false}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FF0050] text-white font-bold text-sm hover:bg-[#CC0040] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      title={oauthStatus?.credentials_configured === false ? 'Configurez d\'abord les credentials TikTok' : 'Se connecter avec TikTok'}
                    >
                      {authorizing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Redirection vers TikTok...
                        </>
                      ) : (
                        <>
                          <i className="ri-tiktok-fill text-lg" />
                          {oauthStatus?.credentials_configured === false ? 'Credentials requis' : 'Connecter avec TikTok'}
                        </>
                      )}
                    </button>

                    {/* TikTok Developer Info */}
                    <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-information-line text-gray-600 text-lg" />
                        <span className="text-sm font-bold text-gray-800">TikTok for Developers</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        Pour obtenir vos credentials, creez une application sur le portail <strong>TikTok for Developers</strong>. Les scopes requis : <code className="font-mono bg-gray-200 px-1 rounded text-[11px]">user.info.basic</code>, <code className="font-mono bg-gray-200 px-1 rounded text-[11px]">video.publish</code>, <code className="font-mono bg-gray-200 px-1 rounded text-[11px]">video.upload</code>.
                      </p>
                      <a
                        href="https://developers.tiktok.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-bold text-[#FF0050] hover:underline"
                      >
                        <i className="ri-external-link-line" />
                        Acceder au portail TikTok for Developers
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-background-200 px-6 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Statut connexion</span>
                  <span className="text-xs font-bold text-foreground-700">
                    {loading ? '...' : oauthStatus?.connected ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Mode publication</span>
                  <span className="text-xs font-bold text-foreground-700">
                    {oauthStatus?.connected ? 'Automatique' : 'Manuel'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Provider</span>
                  <span className="text-xs font-bold text-[#FF0050]">TikTok v2</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coming Soon Card */}
            <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF0050]/10 to-[#00F2EA]/10 flex items-center justify-center mx-auto mb-5">
                  <i className="ri-tiktok-fill text-4xl" style={{ background: 'linear-gradient(135deg, #FF0050, #00F2EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-3">
                  Publication automatique — arrive bientot
                </h3>
                <p className="text-sm text-foreground-500 max-w-lg mx-auto mb-6">
                  Une fois votre compte TikTok connecte via OAuth, le module de publication automatique sera active. Les videos generees par le Studio Media KHEPRA-KOS pourront etre publiees directement sur TikTok en 1 clic.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Link
                    to="/studio-media"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0050] text-white text-sm font-bold hover:bg-[#CC0040] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-magic-line" />
                    Studio Media
                  </Link>
                  <Link
                    to="/kos-video-factory"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background-100 border border-background-200 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-movie-line" />
                    Video Factory
                  </Link>
                  <Link
                    to="/kos-multichannel-command"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background-100 border border-background-200 text-foreground-700 text-sm font-bold hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-smartphone-line" />
                    Multichannel
                  </Link>
                </div>
              </div>
            </div>

            {/* Guide Setup — always visible when not connected */}
            {!oauthStatus?.connected && !loading && (
              <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                  Guide de configuration OAuth 2.0 TikTok — Etape par etape
                </h3>

                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-lightbulb-flash-line text-amber-600 text-lg" />
                    <span className="text-sm font-bold text-amber-800">Prerequis — TikTok for Developers</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    Vous devez avoir une application creee sur <strong>TikTok for Developers</strong>. L'app doit etre approuvee pour les produits <strong>Video Publishing</strong> et <strong>User Info</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-alert-fill text-red-500 text-lg" />
                    <span className="text-sm font-bold text-red-700">VERIFICATION CRITIQUE — TikTok Developer Portal</span>
                  </div>
                  <p className="text-xs text-red-700 mb-2">
                    L'URI de redirection ci-dessous doit etre EXACTEMENT identique dans le portail TikTok Developers. Un seul caractere different = echec.
                  </p>
                  <code className="block text-xs font-mono text-red-600 bg-white rounded-lg px-3 py-2 border border-red-200 break-all select-all">
                    https://khepraexperts.com/tiktok-callback
                  </code>
                  <p className="text-[11px] text-red-600 mt-2">
                    Dans TikTok for Developers → votre app → <strong>Redirect URI</strong> → Ajoutez cette URL exacte.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">TikTok for Developers — Creer l'app</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Allez sur <a href="https://developers.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF0050] underline">developers.tiktok.com</a>, connectez-vous, creez une application.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Configurer les produits — Video Publishing</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Activez les produits <strong>Video Publishing</strong> et <strong>User Info</strong>. Les scopes requis : user.info.basic, video.publish, video.upload.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Configurer le Redirect URI</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Dans les parametres de l'app, ajoutez l'URI de redirection :<br />
                        <code className="text-[11px] font-mono text-[#FF0050] bg-white rounded px-2 py-1 border border-background-200">https://khepraexperts.com/tiktok-callback</code>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Saisir les credentials dans KOS</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Copiez le <strong>Client Key</strong> et <strong>Client Secret</strong> TikTok. Allez sur <Link to="/kos-external-api-config-command" className="text-[#FF0050] underline">KOS External API Config Command</Link>, section TikTok, et collez-les.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Revenez ici et connectez-vous</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Rafraichissez cette page, puis cliquez sur <strong>"Connecter avec TikTok"</strong>. Acceptez les permissions. C'est fait !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legal & Support */}
      <section className="py-10 bg-background-100 border-y border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">Support</h4>
              <p className="text-xs text-foreground-600 mb-2">
                Question sur l'authentification TikTok OAuth ou la publication automatique ?
              </p>
              <a href="mailto:essochamanu@gmail.com" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF0050] hover:underline">
                <i className="ri-mail-line" />
                essochamanu@gmail.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">Legal</h4>
              <div className="flex flex-col gap-1.5">
                <Link to="/privacy" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-lock-line mr-1.5" />
                  Politique de Confidentialite
                </Link>
                <Link to="/terms" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-file-text-line mr-1.5" />
                  Conditions d'Utilisation
                </Link>
                <Link to="/cookies" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-information-line mr-1.5" />
                  Politique des Cookies
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">KOS TikTok Connect</h4>
              <p className="text-xs text-foreground-600 mb-2">
                Publication automatique sur TikTok via l'API TikTok v2. OAuth 2.0 avec scopes video.publish et video.upload.
              </p>
              <p className="text-xs text-foreground-500">
                Edite par <strong>KHEPRA EXPERTS SARL U</strong> — RCCM TG-LFW-01-2026-B13-01347
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
                Pret a conquerir TikTok ?
              </h2>
              <p className="text-gray-400 text-sm">
                Connectez votre compte et publiez automatiquement vos videos KHEPRA-KOS sur TikTok
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/studio-media"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0050] text-white font-bold text-sm hover:bg-[#CC0040] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-magic-line" />
                Studio Media
              </Link>
              <Link
                to="/kos-video-factory"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-movie-line" />
                Video Factory
              </Link>
              <Link
                to="/kos-multichannel-command"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#00F2EA' }}
              >
                <i className="ri-smartphone-line" />
                Multichannel
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Formulaire de saisie des credentials TikTok */
function CredentialsSetupForm({ onSaved }: { onSaved: () => void }) {
  const [clientKey, setClientKey] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSave = async () => {
    if (!clientKey.trim() || !clientSecret.trim()) {
      setFeedback({ ok: false, msg: 'Les deux champs sont requis' });
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const resp = await fetch(`${TIKTOK_OAUTH_URL}?action=save_credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_key: clientKey.trim(),
          client_secret: clientSecret.trim(),
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setFeedback({ ok: true, msg: 'Credentials enregistres ! Rafraichissement...' });
        setClientKey('');
        setClientSecret('');
        setTimeout(() => {
          onSaved();
          setFeedback(null);
        }, 1500);
      } else {
        setFeedback({ ok: false, msg: data.error || 'Erreur lors de l\'enregistrement' });
      }
    } catch (err) {
      setFeedback({ ok: false, msg: err instanceof Error ? err.message : 'Erreur de connexion' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={clientKey}
        onChange={(e) => setClientKey(e.target.value)}
        placeholder="Client Key TikTok"
        className="w-full px-3 py-2 rounded-lg border border-red-200 text-xs text-foreground-700 placeholder:text-foreground-400 focus:outline-none focus:border-[#FF0050]/50 focus:ring-2 focus:ring-[#FF0050]/10"
      />
      <input
        type="password"
        value={clientSecret}
        onChange={(e) => setClientSecret(e.target.value)}
        placeholder="Client Secret TikTok"
        className="w-full px-3 py-2 rounded-lg border border-red-200 text-xs text-foreground-700 placeholder:text-foreground-400 focus:outline-none focus:border-[#FF0050]/50 focus:ring-2 focus:ring-[#FF0050]/10"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FF0050] text-white text-xs font-bold hover:bg-[#CC0040] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enregistrement...
          </>
        ) : (
          <>
            <i className="ri-save-line" />
            Enregistrer les credentials
          </>
        )}
      </button>
      {feedback && (
        <p className={`text-[11px] font-semibold ${feedback.ok ? 'text-emerald-600' : 'text-red-600'}`}>
          {feedback.msg}
        </p>
      )}
      <p className="text-[10px] text-foreground-400 mt-1">
        Trouvez vos credentials sur <a href="https://developers.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF0050] underline">developers.tiktok.com</a> → Mon app → Configuration
      </p>
    </div>
  );
}