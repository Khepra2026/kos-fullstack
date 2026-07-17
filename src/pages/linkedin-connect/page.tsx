import { useState, useEffect, useCallback } from 'react';
import { SeoHead } from '@/components/feature/SeoHead';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import DiagnosticPanel from '@/pages/linkedin-connect/components/DiagnosticPanel';
import PublishPlan14Drafts from '@/pages/linkedin-connect/components/PublishPlan14Drafts';

const LINKEDIN_OAUTH_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master';
const LINKEDIN_PUBLISHER_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master';

interface OAuthStatus {
  connected: boolean;
  expired: boolean;
  has_refresh: boolean;
  needs_reauth: boolean;
  credentials_configured?: boolean;
  organization_id: string | null;
  user_name: string | null;
  user_email: string | null;
  member_urn: string | null;
  scopes: string | null;
  expires_at: string | null;
  provider: string;
}

interface QueueItem {
  id: number;
  title: string;
  status: string;
  post_type: string;
  content?: string;
  metadata: Record<string, unknown>;
  hashtags?: string[];
  scheduled_for: string | null;
  created_at: string;
}

interface PublishResult {
  success: boolean;
  published_count: number;
  results: Array<{
    queue_id: number;
    title: string;
    post_urn?: string;
    linkedin_activity?: string;
    status: string;
    error?: string;
  }>;
  note?: string;
  oauth_required?: boolean;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function getScopeLabel(scope: string): string {
  const labels: Record<string, string> = {
    openid: 'Identité',
    profile: 'Profil',
    email: 'Email',
    w_member_social: 'Publication (profil)',
    w_organization_social: 'Publication (page)',
    r_organization_social: 'Lecture (page)',
  };
  return labels[scope] || scope;
}

function getScopeIcon(scope: string): string {
  const icons: Record<string, string> = {
    openid: 'ri-fingerprint-line',
    profile: 'ri-user-line',
    email: 'ri-mail-line',
    w_member_social: 'ri-share-forward-line',
    w_organization_social: 'ri-building-line',
    r_organization_social: 'ri-eye-line',
  };
  return icons[scope] || 'ri-check-line';
}

export default function LinkedInConnectPage() {
  const [oauthStatus, setOauthStatus] = useState<OAuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorizing, setAuthorizing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [authorType, setAuthorType] = useState<'organization' | 'member'>('organization');

  // Check URL params for OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const errorParam = params.get('error');
    const user = params.get('user');
    const scopes = params.get('scopes');

    if (success === 'true') {
      setSuccessMessage(
        `LinkedIn connecté avec succès ! Utilisateur : ${user || 'N/A'}` +
        (scopes ? ` · Scopes : ${scopes}` : '')
      );
      window.history.replaceState({}, '', '/linkedin-connect');
      setTimeout(() => setSuccessMessage(null), 10000);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, '', '/linkedin-connect');
      setTimeout(() => setError(null), 15000);
    }
  }, []);

  const checkStatus = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${LINKEDIN_OAUTH_URL}?action=status`);
      const data = await resp.json();
      setOauthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadQueue = useCallback(async () => {
    try {
      const resp = await fetch(`${LINKEDIN_PUBLISHER_URL}?action=list`);
      const data = await resp.json();
      if (data.posts) {
        setQueueItems(data.posts);
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    checkStatus();
    loadQueue();
  }, [checkStatus, loadQueue]);

  const handleAuthorize = async () => {
    setAuthorizing(true);
    setError(null);
    try {
      const resp = await fetch(`${LINKEDIN_OAUTH_URL}?action=authorize`, { method: 'POST' });
      const data = await resp.json();

      if (data.success && data.auth_url) {
        window.location.href = data.auth_url;
      } else if (data.setup_required) {
        setError(
          'LinkedIn Client ID non configuré. Allez dans KOS External API Config Command pour saisir vos credentials LinkedIn.'
        );
      } else {
        setError(data.error || 'Erreur lors de la génération du lien OAuth');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setAuthorizing(false);
    }
  };

  const handleRevoke = async () => {
    if (!confirm('Révoquer la connexion LinkedIn ? Cette action déconnectera KOS de LinkedIn.')) return;
    try {
      await fetch(`${LINKEDIN_OAUTH_URL}?action=revoke`, { method: 'POST' });
      await checkStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la révocation');
    }
  };

  const handlePublishAll = async () => {
    const drafts = queueItems.filter(i => i.status === 'draft' || i.status === 'scheduled');
    if (drafts.length === 0) {
      setError('Aucun post en brouillon à publier.');
      return;
    }

    setPublishing(true);
    setPublishResult(null);
    setError(null);

    try {
      const resp = await fetch(`${LINKEDIN_PUBLISHER_URL}?action=publish&author_type=${authorType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: drafts.length }),
      });
      const data = await resp.json();
      setPublishResult(data);

      if (data.success) {
        await loadQueue();
      } else if (data.oauth_required) {
        setError('LinkedIn non connecté. Connectez votre compte LinkedIn d\'abord.');
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
      const resp = await fetch(`${LINKEDIN_PUBLISHER_URL}?action=publish&author_type=${authorType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queue_id: queueId }),
      });
      const data = await resp.json();
      setPublishResult(data);

      if (data.success) {
        await loadQueue();
      } else if (data.oauth_required) {
        setError('LinkedIn non connecté. Connectez votre compte LinkedIn d\'abord.');
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
        title="KOS LinkedIn Connect™ — Publication Automatique OAuth | KHEPRA EXPERTS"
        description="Connectez votre page entreprise KHEPRA EXPERTS via OAuth 2.0 LinkedIn pour la publication 100% automatique des posts, articles et vidéos. API LinkedIn v2."
        keywords="KOS LinkedIn, publication LinkedIn automatique, OAuth LinkedIn, KHEPRA EXPERTS, social selling, automatisation LinkedIn"
        canonicalPath="/linkedin-connect"
        ogType="website"
        ogLocale="fr_FR"
      />

      {/* Hero */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-semibold mb-4">
                <i className="ri-linkedin-fill"></i>KOS LinkedIn Connect™
              </div>
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground-950 tracking-tight">
                Publication LinkedIn 100% Automatique — OAuth 2.0
              </h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                Connectez votre page entreprise KHEPRA EXPERTS via OAuth 2.0 LinkedIn. Posts, articles, carrousels et vidéos publiés automatiquement — zéro copier-coller, zéro intervention manuelle.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to="/kos-social-media-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-sm font-bold hover:bg-[#0A66C2]/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-radar-line" />
                Social Command
              </Link>
              <Link
                to="/kos-linkedin-distribution-program"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line" />
                Distribution
              </Link>
              <Link
                to="/kos-linkedin-social-selling-engine"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-bar-chart-line" />
                Social Selling
              </Link>
              <Link
                to="/kos-multichannel-command"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background-200/80 text-foreground-700 text-sm font-bold hover:bg-background-300 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-smartphone-line" />
                Multichannel
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
              {error.includes('Client ID non configuré') && (
                <div className="mt-3 p-4 rounded-lg bg-white border border-red-100">
                  <h4 className="text-sm font-bold text-foreground-950 mb-2">Solution :</h4>
                  <ol className="text-xs text-foreground-600 space-y-1 list-decimal list-inside">
                    <li>Allez sur <Link to="/kos-external-api-config-command" className="text-[#0A66C2] underline font-bold">KOS External API Config Command</Link></li>
                    <li>Saisissez le <strong>Client ID</strong> et <strong>Client Secret</strong> LinkedIn</li>
                    <li>Revenez ici et cliquez sur <strong>"Connecter avec LinkedIn"</strong></li>
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
                  <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center">
                    <i className="ri-linkedin-fill text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground-950">KHEPRA EXPERTS</h2>
                    <p className="text-xs text-foreground-500">Page Entreprise LinkedIn</p>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-foreground-400">
                    <div className="w-4 h-4 border-2 border-[#0A66C2]/30 border-t-[#0A66C2] rounded-full animate-spin" />
                    Vérification de la connexion...
                  </div>
                ) : oauthStatus?.connected ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-600">Connecté via OAuth 2.0</span>
                    </div>

                    {oauthStatus.user_name && (
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ri-user-smile-line text-[#0A66C2] text-sm" />
                        <span className="text-xs font-semibold text-foreground-600">
                          {oauthStatus.user_name}
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
                      {oauthStatus.member_urn && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-500">Member URN</span>
                          <span className="text-foreground-700 font-mono text-xs truncate ml-2 max-w-[150px]">{oauthStatus.member_urn}</span>
                        </div>
                      )}
                      {oauthStatus.organization_id && (
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground-500">Page Entreprise</span>
                          <span className="text-foreground-700 font-mono text-xs">{oauthStatus.organization_id}</span>
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
                      Déconnecter LinkedIn
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-sm font-bold text-amber-600">Non connecté</span>
                    </div>

                    {/* Credentials status */}
                    {oauthStatus?.credentials_configured === false && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <i className="ri-key-2-line text-red-500" />
                          <span className="text-xs font-bold text-red-700">Credentials LinkedIn manquants</span>
                        </div>
                        <CredentialsSetupForm onSaved={() => { checkStatus(); }} />
                      </div>
                    )}

                    {oauthStatus?.credentials_configured === true && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <i className="ri-check-line text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-700">Credentials configurés — prêt à connecter</span>
                        </div>
                      </div>
                    )}

                    {oauthStatus?.credentials_configured === undefined && (
                      <p className="text-xs text-foreground-500 mb-4">
                        Connectez votre compte LinkedIn pour permettre à KOS de publier automatiquement sur la page entreprise KHEPRA EXPERTS.
                      </p>
                    )}

                    <button
                      onClick={handleAuthorize}
                      disabled={authorizing || oauthStatus?.credentials_configured === false}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      title={oauthStatus?.credentials_configured === false ? 'Configurez d\'abord les credentials LinkedIn' : 'Se connecter avec LinkedIn'}
                    >
                      {authorizing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Redirection vers LinkedIn...
                        </>
                      ) : (
                        <>
                          <i className="ri-linkedin-fill text-lg" />
                          {oauthStatus?.credentials_configured === false ? 'Credentials requis' : 'Connecter avec LinkedIn'}
                        </>
                      )}
                    </button>

                    {/* Candidature MDP — Marketing Developer Platform */}
                    <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-vidicon-line text-amber-600 text-lg" />
                        <span className="text-sm font-bold text-amber-800">Pour les vidéos — Candidature MDP</span>
                      </div>
                      <p className="text-xs text-amber-700 mb-3">
                        La publication de <strong>vidéos</strong> sur LinkedIn nécessite l'accès au <strong>Marketing Developer Platform (MDP)</strong>. La candidature LinkedIn est requise.
                      </p>
                      <ol className="text-[11px] text-amber-700 space-y-1 list-decimal list-inside">
                        <li>Vérification Business obligatoire</li>
                        <li>Soumettre la candidature MDP sur LinkedIn Developers</li>
                        <li>Délai : 2-4 semaines (review LinkedIn)</li>
                        <li>Une fois approuvé, les tokens existants fonctionnent</li>
                      </ol>
                      <a
                        href="https://developer.linkedin.com/apply/marketing-developer-platform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold text-[#0A66C2] hover:underline"
                      >
                        <i className="ri-external-link-line" />
                        Lancer la candidature MDP sur LinkedIn Developers
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-background-200 px-6 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Brouillons</span>
                  <span className="text-sm font-bold text-foreground-950">{drafts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Publiés</span>
                  <span className="text-sm font-bold text-emerald-600">{published.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-500">Mode</span>
                  <span className="text-xs font-bold text-foreground-700">
                    {oauthStatus?.connected ? 'Automatique' : 'Manuel'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-background-200">
                  <span className="text-xs text-foreground-500">Publication en tant que</span>
                  <select
                    value={authorType}
                    onChange={(e) => setAuthorType(e.target.value as typeof authorType)}
                    className="text-xs font-bold text-foreground-700 bg-transparent border-none cursor-pointer"
                  >
                    <option value="organization">Page Entreprise</option>
                    <option value="member">Profil Personnel</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Queue & Publishing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Publish All */}
            {drafts.length > 0 && oauthStatus?.connected && (
              <div className="rounded-2xl bg-white border border-background-200 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">
                      {drafts.length} post{drafts.length > 1 ? 's' : ''} prêt{drafts.length > 1 ? 's' : ''} à publier
                    </h3>
                    <p className="text-xs text-foreground-500 mt-1">
                      Publication automatique sur la page entreprise KHEPRA EXPERTS
                    </p>
                  </div>
                  <button
                    onClick={handlePublishAll}
                    disabled={publishing}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {publishing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publication...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line" />
                        Publier {drafts.length > 1 ? `les ${drafts.length}` : ''} sur LinkedIn
                      </>
                    )}
                  </button>
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
                      ? `${publishResult.published_count} post(s) publié(s) sur LinkedIn`
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
                          {r.linkedin_activity ? (
                            <a
                              href={r.linkedin_activity}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#0A66C2] hover:underline truncate block"
                            >
                              Voir sur LinkedIn
                            </a>
                          ) : (
                            <p className="text-xs text-red-500">{r.error}</p>
                          )}
                        </div>
                        {r.status === 'published' && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 uppercase">
                            Publié
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground-950">
                      File d'attente LinkedIn
                    </h3>
                    <p className="text-xs text-foreground-500 mt-1">
                      Posts générés par KOS, prêts à être publiés
                    </p>
                  </div>
                  <Link
                    to="/kos-social-media-command"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold hover:bg-[#0A66C2]/20 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line" />
                    Générer
                  </Link>
                </div>
              </div>

              {queueItems.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-linkedin-line text-3xl text-foreground-300" />
                  </div>
                  <p className="text-sm text-foreground-500 mb-2">Aucun post dans la file d'attente LinkedIn</p>
                  <Link
                    to="/kos-social-media-command"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-magic-line" />
                    Générer du contenu LinkedIn
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-background-200">
                  {queueItems.map((item) => {
                    const metadata = item.metadata || {};
                    const linkedinActivity = metadata.linkedin_activity as string;
                    const linkedinPostUrn = metadata.linkedin_post_urn as string;

                    return (
                      <div key={item.id} className="p-5 hover:bg-background-50/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center flex-shrink-0">
                            <i className={`${linkedinPostUrn ? 'ri-check-line text-emerald-500' : 'ri-time-line text-amber-500'} text-lg`} />
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
                              <span className="text-[10px] font-semibold text-foreground-400 uppercase">{item.post_type?.replace(/_/g, ' ')}</span>
                            </div>

                            {item.content && (
                              <p className="text-xs text-foreground-500 line-clamp-2 mb-1">{item.content}</p>
                            )}

                            {linkedinActivity ? (
                              <a
                                href={linkedinActivity}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#0A66C2] hover:underline"
                              >
                                Voir le post sur LinkedIn
                              </a>
                            ) : (
                              <p className="text-xs text-foreground-500">
                                Créé le {formatDate(item.created_at)}
                                {item.scheduled_for && ` · Programmé pour ${formatDate(item.scheduled_for)}`}
                              </p>
                            )}

                            {item.status !== 'published' && oauthStatus?.connected && (
                              <button
                                onClick={() => handlePublishSingle(item.id)}
                                disabled={publishing}
                                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold hover:bg-[#0A66C2]/20 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <i className="ri-send-plane-line" />
                                Publier sur LinkedIn
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

            {/* Diagnostic Panel — Phase 1 Preflight */}
            <DiagnosticPanel />

            {/* Publish Plan — 14 Drafts Big Four */}
            <PublishPlan14Drafts />

            {/* Guide Setup */}
            {!oauthStatus?.connected && !loading && (
              <div className="rounded-2xl bg-background-100 border border-background-200/70 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">
                  Guide de configuration OAuth 2.0 LinkedIn — Étape par étape
                </h3>

                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-lightbulb-flash-line text-amber-600 text-lg" />
                    <span className="text-sm font-bold text-amber-800">Prérequis — LinkedIn Developer App</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    Vous devez avoir une application créée sur <strong>LinkedIn Developers</strong> avec les produits API suivants : <strong>Sign In with LinkedIn</strong> et <strong>Share on LinkedIn</strong>. Pour les vidéos : <strong>Marketing Developer Platform</strong> (candidature séparée).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">LinkedIn Developers — Créer l'app</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Allez sur <a href="https://developer.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] underline">developer.linkedin.com</a>, créez une application. Associez la page entreprise KHEPRA EXPERTS.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Produits API — Activer les scopes</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Dans l'onglet <strong>Products</strong>, activez : <strong>Sign In with LinkedIn</strong>, <strong>Share on LinkedIn</strong>. MDP pour les vidéos (optionnel, candidature requise).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Auth — Configurer OAuth 2.0</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Dans l'onglet <strong>Auth</strong>, ajoutez l'URI de redirection :<br />
                        <code className="text-[11px] font-mono text-[#0A66C2] bg-white rounded px-2 py-1 border border-background-200">https://khepraexperts.com/linkedin-callback</code>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Saisir les credentials dans KOS</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Copiez le <strong>Client ID</strong> et <strong>Client Secret</strong> LinkedIn. Allez sur <Link to="/kos-external-api-config-command" className="text-[#0A66C2] underline">KOS External API Config Command</Link>, section LinkedIn, et collez-les.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground-950">Revenez ici et connectez-vous</h4>
                      <p className="text-xs text-foreground-500 mt-1">
                        Rafraîchissez cette page, puis cliquez sur <strong>"Connecter avec LinkedIn"</strong>. Acceptez les permissions. C'est fait !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Post Test */}
            {oauthStatus?.connected && (
              <QuickPublishPanel />
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
                Question sur l'authentification LinkedIn OAuth ou la publication automatique ?
              </p>
              <a href="mailto:essochamanu@gmail.com" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline">
                <i className="ri-mail-line" />
                essochamanu@gmail.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground-950 mb-3">Légal</h4>
              <div className="flex flex-col gap-1.5">
                <Link to="/privacy" className="text-xs text-foreground-600 hover:text-foreground-950 transition-colors">
                  <i className="ri-lock-line mr-1.5" />
                  Politique de Confidentialité
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
              <h4 className="text-sm font-bold text-foreground-950 mb-3">KOS LinkedIn Connect™</h4>
              <p className="text-xs text-foreground-600 mb-2">
                Publication automatique sur la page entreprise KHEPRA EXPERTS via l'API LinkedIn v2. OAuth 2.0 avec scopes w_organization_social.
              </p>
              <p className="text-xs text-foreground-500">
                Édité par <strong>KHEPRA EXPERTS SARL U</strong> — RCCM TG-LFW-01-2026-B13-01347
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
                Prêt à automatiser votre présence LinkedIn ?
              </h2>
              <p className="text-gray-400 text-sm">
                Générez du contenu depuis le KOS Social Media Command, publiez en 1 clic sur LinkedIn
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/kos-social-media-command"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-radar-line" />
                Social Command
              </Link>
              <Link
                to="/kos-linkedin-distribution-program"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-foreground-950 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line" />
                Distribution
              </Link>
              <Link
                to="/kos-linkedin-social-selling-engine"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-colors cursor-pointer whitespace-nowrap" style={{ backgroundColor: '#86BC25' }}
              >
                <i className="ri-bar-chart-line" />
                Social Selling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Formulaire de saisie des credentials LinkedIn — stocke via kos-linkedin-oauth */
function CredentialsSetupForm({ onSaved }: { onSaved: () => void }) {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSave = async () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      setFeedback({ ok: false, msg: 'Les deux champs sont requis' });
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const resp = await fetch(`${LINKEDIN_OAUTH_URL}?action=save_credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId.trim(),
          client_secret: clientSecret.trim(),
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setFeedback({ ok: true, msg: 'Credentials enregistrés ! Rafraîchissement...' });
        setClientId('');
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
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        placeholder="Client ID LinkedIn"
        className="w-full px-3 py-2 rounded-lg border border-red-200 text-xs text-foreground-700 placeholder:text-foreground-400 focus:outline-none focus:border-[#0A66C2]/50 focus:ring-2 focus:ring-[#0A66C2]/10"
      />
      <input
        type="password"
        value={clientSecret}
        onChange={(e) => setClientSecret(e.target.value)}
        placeholder="Client Secret LinkedIn"
        className="w-full px-3 py-2 rounded-lg border border-red-200 text-xs text-foreground-700 placeholder:text-foreground-400 focus:outline-none focus:border-[#0A66C2]/50 focus:ring-2 focus:ring-[#0A66C2]/10"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
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
        Trouvez vos credentials sur <a href="https://developer.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] underline">developer.linkedin.com</a> → Mon app → Auth
      </p>
    </div>
  );
}

/** Quick test panel for direct publishing when connected */
function QuickPublishPanel() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; linkedin_activity?: string; error?: string } | null>(null);

  const handleQuickPublish = async () => {
    if (!text.trim()) return;
    setSending(true);
    setResult(null);

    try {
      const resp = await fetch(`${LINKEDIN_PUBLISHER_URL}?action=publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), url: url.trim() || undefined }),
      });
      const data = await resp.json();
      setResult(data);
      if (data.success) setText('');
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Erreur' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-background-200 p-5">
      <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4 flex items-center gap-2">
        <i className="ri-flashlight-line text-[#0A66C2]" />
        Publication rapide
      </h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrivez votre post LinkedIn..."
        className="w-full px-4 py-3 rounded-xl border border-background-200 text-sm text-foreground-700 placeholder:text-foreground-400 resize-none focus:outline-none focus:border-[#0A66C2]/50 focus:ring-2 focus:ring-[#0A66C2]/10 min-h-[100px]"
      />
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL du lien (optionnel)"
          className="flex-1 px-4 py-2.5 rounded-xl border border-background-200 text-sm text-foreground-700 placeholder:text-foreground-400 focus:outline-none focus:border-[#0A66C2]/50"
        />
        <button
          onClick={handleQuickPublish}
          disabled={sending || !text.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi...
            </>
          ) : (
            <>
              <i className="ri-send-plane-line" />
              Publier
            </>
          )}
        </button>
      </div>

      {result && (
        <div className={`mt-3 p-3 rounded-lg border text-xs ${result.success ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {result.success ? (
            <>
              <i className="ri-check-line mr-1" />
              Post publié sur LinkedIn !
              {result.linkedin_activity && (
                <a href={result.linkedin_activity} target="_blank" rel="noopener noreferrer" className="ml-2 underline font-bold">
                  Voir le post
                </a>
              )}
            </>
          ) : (
            <>
              <i className="ri-error-warning-line mr-1" />
              {result.error || 'Erreur inconnue'}
            </>
          )}
        </div>
      )}
    </div>
  );
}