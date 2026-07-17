import { useSocialMetrics } from "@/hooks/useSocialMetrics";
import { useState } from "react";

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

export function SocialMetricsLiveBanner() {
  const { data, loading, error, rawResponse, refetch } = useSocialMetrics();
  const [showDebug, setShowDebug] = useState(false);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-2xl border border-background-200 bg-background-50 p-4 flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="text-xs text-foreground-500">Scan des comptes sociaux en cours...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const source = data.meta.source;
  const isLive = source === "live";
  const isPartial = source === "partial";
  const isBridge = source === "bridge";
  const twitterOk = data.meta.twitter_available;
  const companyOk = data.meta.linkedin_company_available;
  const founderOk = data.meta.linkedin_founder_available;
  const hasError = !!data.meta.error || !!error;
  const bridgeUsed = data.meta.bridge_used;

  // Determine header style based on status
  const headerBg = isLive
    ? "bg-emerald-50 border-emerald-200"
    : isPartial
    ? "bg-sky-50 border-sky-200"
    : isBridge
    ? "bg-emerald-50 border-emerald-200"
    : "bg-amber-50 border-amber-200";
  const headerDot = isLive
    ? "bg-emerald-500 animate-pulse"
    : isPartial
    ? "bg-sky-400 animate-pulse"
    : isBridge
    ? "bg-emerald-500 animate-pulse"
    : "bg-amber-400";
  const headerTextColor = isLive
    ? "text-emerald-700"
    : isPartial
    ? "text-sky-700"
    : isBridge
    ? "text-emerald-700"
    : "text-amber-700";
  const headerLabel = isLive
    ? "Métriques Live — Toutes les APIs connectées"
    : isPartial
    ? "Métriques Partielles — Certaines APIs connectées"
    : isBridge
    ? "Métriques via KOS Bridge — OEmbed + OpenGraph + Snapshots"
    : "Métriques Mock — APIs non configurées";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="rounded-2xl border border-background-200 bg-white overflow-hidden">
        {/* Header bar */}
        <div className={`px-5 py-2.5 flex items-center justify-between border-b ${headerBg}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${headerDot}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${headerTextColor}`}>
              {headerLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-foreground-400">Actualisé {timeAgo(data.meta.last_updated)}</span>
            <button
              onClick={() => refetch()}
              className="text-xs px-2 py-1 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-1" />Rafraîchir
            </button>
          </div>
        </div>

        {/* Warning banner for partial status */}
        {isPartial && (
          <div className="px-5 py-2 bg-sky-50 border-b border-sky-200">
            <div className="flex items-center gap-2 text-xs text-sky-600">
              <i className="ri-information-line flex-shrink-0" />
              <span>Mode hybride : les données live enrichissent les métriques mock. Les cartes avec point <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle mx-0.5" /> sont en direct, celles avec <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle mx-0.5" /> utilisent les données mock.</span>
            </div>
          </div>
        )}

        {/* Bridge notice — KOS LinkedIn Bridge actif */}
        {isBridge && bridgeUsed && (
          <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-200">
            <div className="flex items-center gap-2 text-xs text-emerald-700">
              <i className="ri-link-unlink-m flex-shrink-0" />
              <span>
                <strong>KOS LinkedIn Bridge actif</strong> — Les données de la Page Entreprise proviennent de sources publiques (OEmbed + OpenGraph + Snapshots).
                Le MDP LinkedIn n'est pas requis pour cet affichage.

              </span>
            </div>
          </div>
        )}

        {/* Error banner */}
        {hasError && (
          <div className="px-5 py-2 bg-rose-50 border-b border-rose-200">
            <div className="flex items-center gap-2 text-xs text-rose-600">
              <i className="ri-error-warning-line flex-shrink-0" />
              <span className="font-semibold">Détail technique :</span>
              <span className="truncate">{data.meta.error || error || "Erreur inconnue"}</span>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Twitter */}
            <div className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group hover:border-sky-300 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <i className="ri-twitter-x-line text-foreground-500 text-sm" />
                <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">X/Twitter</span>
                {twitterOk ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </div>
              <span className="block font-display text-xl font-bold text-foreground-950">{formatNumber(data.twitter.followers)}</span>
              <span className="text-xs text-foreground-500">Followers</span>
              <div className="mt-2 pt-2 border-t border-background-200 flex justify-between text-[11px] text-foreground-400">
                <span>{data.twitter.engagement_rate}% eng.</span>
                <span>{formatNumber(data.twitter.impressions_30d)} imp.</span>
              </div>
            </div>

            {/* LinkedIn Company */}
            <div className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group hover:border-blue-300 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <i className="ri-linkedin-box-line text-foreground-500 text-sm" />
                <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">LinkedIn Page</span>
                {companyOk ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </div>
              <span className="block font-display text-xl font-bold text-foreground-950">{formatNumber(data.linkedin_company.followers)}</span>
              <span className="text-xs text-foreground-500">Followers</span>
              <div className="mt-2 pt-2 border-t border-background-200">
                <span className="text-[11px] text-foreground-400">{data.linkedin_company.industry || "—"}</span>
              </div>
            </div>

            {/* LinkedIn Founder */}
            <div className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group hover:border-blue-300 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <i className="ri-user-star-line text-foreground-500 text-sm" />
                <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Profil Fondateur</span>
                {founderOk ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </div>
              <span className="block font-display text-xl font-bold text-foreground-950">{formatNumber(data.linkedin_founder.followers || 0)}</span>
              <span className="text-xs text-foreground-500">Followers</span>
              <div className="mt-2 pt-2 border-t border-background-200">
                <span className="text-[11px] text-foreground-400">+{formatNumber(data.linkedin_founder.connections || 0)} connexions</span>
              </div>
            </div>

            {/* Tweet count */}
            <div className="rounded-xl bg-background-50 border border-background-200 p-4 text-center group hover:border-amber-300 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <i className="ri-chat-3-line text-foreground-500 text-sm" />
                <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Tweets</span>
              </div>
              <span className="block font-display text-xl font-bold text-foreground-950">{data.twitter.tweets}</span>
              <span className="text-xs text-foreground-500">Total</span>
              <div className="mt-2 pt-2 border-t border-background-200 flex justify-between text-[11px] text-foreground-400">
                <span>{data.twitter.likes_30d} likes</span>
                <span>{data.twitter.retweets_30d} RT</span>
              </div>
            </div>

            {/* Connection Status */}
            {(twitterOk || companyOk || founderOk) && !isLive ? (
              <div className="rounded-xl bg-sky-50 border border-sky-200 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <i className="ri-check-double-line text-sky-500 text-sm" />
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">APIs Partielles</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
                  {twitterOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 border border-sky-200 text-sky-700 whitespace-nowrap"><i className="ri-twitter-x-line mr-0.5" />X</span>}
                  {companyOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 border border-blue-200 text-blue-700 whitespace-nowrap"><i className="ri-linkedin-box-line mr-0.5" />LI Page</span>}
                  {founderOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 border border-blue-200 text-blue-700 whitespace-nowrap"><i className="ri-user-star-line mr-0.5" />Profil</span>}
                </div>
                <span className="block text-[10px] text-sky-500 mt-2">{companyOk && founderOk ? "Données live" : "Partiellement live"}</span>
              </div>
            ) : isLive ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <i className="ri-check-double-line text-emerald-500 text-sm" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">APIs Live</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
                  {twitterOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 border border-sky-200 text-sky-700 whitespace-nowrap"><i className="ri-twitter-x-line mr-0.5" />X</span>}
                  {companyOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 border border-blue-200 text-blue-700 whitespace-nowrap"><i className="ri-linkedin-box-line mr-0.5" />LI Page</span>}
                  {founderOk && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 border border-blue-200 text-blue-700 whitespace-nowrap"><i className="ri-user-star-line mr-0.5" />Profil</span>}
                </div>
                <span className="block text-[10px] text-emerald-500 mt-2">Données réelles</span>
              </div>
            ) : (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <i className="ri-key-line text-amber-500 text-sm" />
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">APIs en attente</span>
                </div>
                <span className="block text-[11px] text-amber-600 mt-1">Clés API requises</span>
                <span className="block text-[10px] text-amber-400 mt-1">TWITTER_BEARER_TOKEN</span>
                <span className="block text-[10px] text-amber-400">LINKEDIN_ACCESS_TOKEN</span>
              </div>
            )}

            {/* Top Tweet Preview */}
            {data.twitter.top_tweet && (
              <div className="rounded-xl bg-background-50 border border-background-200 p-4 col-span-2 sm:col-span-3 lg:col-span-6 group hover:border-sky-200 hover:shadow-sm transition-all duration-300">
                <div className="flex items-start gap-3">
                  <i className="ri-twitter-x-line text-sky-400 text-sm mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-foreground-400 uppercase tracking-wider">Top Tweet — {new Date(data.twitter.top_tweet.date).toLocaleDateString("fr-FR")}</span>
                    <p className="text-sm text-foreground-700 mt-1 leading-relaxed line-clamp-2">{data.twitter.top_tweet.text}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-foreground-400">
                      <span className="flex items-center gap-1"><i className="ri-heart-line text-rose-400" />{data.twitter.top_tweet.likes}</span>
                      <span className="flex items-center gap-1"><i className="ri-repeat-line text-emerald-400" />{data.twitter.top_tweet.retweets}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug panel toggle */}
        <div className="px-5 pb-3">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-[11px] text-foreground-400 hover:text-foreground-600 transition-colors flex items-center gap-1"
          >
            <i className={showDebug ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} />
            {showDebug ? "Masquer" : "Afficher"} les détails techniques
          </button>
          {showDebug && rawResponse && (
            <div className="mt-2 p-3 rounded-lg bg-background-100 border border-background-200 overflow-auto max-h-48">
              <pre className="text-[10px] text-foreground-600 font-mono">{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}