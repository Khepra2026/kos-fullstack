import { useState, useCallback } from 'react';

const LINKEDIN_OAUTH_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master';
const LINKEDIN_PUBLISHER_URL = 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master';

interface DiagnosticResult {
  uri_ok: boolean;
  scopes_ok: boolean;
  scopes_detail: Record<string, boolean>;
  admin_ok: boolean;
  token_valid: boolean;
  refresh_ok: boolean;
  mdp_ok: boolean;
  blocking_error: string | null;
  recommendations: string[];
  timestamp: string;
  registry_synced: boolean;
}

interface CircuitBreakerState {
  open: boolean;
  failures: number;
  max_failures: number;
  last_failure: string | null;
  open_since: string | null;
  cooldown_seconds: number;
  can_publish: boolean;
}

interface PreflightResult {
  ready: boolean;
  blocking: boolean;
  reason?: string;
  token_valid?: boolean;
  organization_id?: string;
  member_urn?: string;
  has_org_scope?: boolean;
  scopes?: string[];
  can_publish_as_org?: boolean;
  can_publish_as_member?: boolean;
  circuit_breaker_ok?: boolean;
  recommendations?: string[];
  error_code?: string;
}

const CHECK_ICONS: Record<string, string> = {
  'openid': 'ri-fingerprint-line',
  'profile': 'ri-user-line',
  'email': 'ri-mail-line',
  'w_member_social': 'ri-share-forward-line',
  'w_organization_social': 'ri-building-line',
  'r_organization_social': 'ri-eye-line',
  'rw_organization_admin': 'ri-admin-line',
};

const CHECK_LABELS: Record<string, string> = {
  'openid': 'Identité',
  'profile': 'Profil',
  'email': 'Email',
  'w_member_social': 'Publication (profil)',
  'w_organization_social': 'Publication (page)',
  'r_organization_social': 'Lecture (page)',
  'rw_organization_admin': 'Admin (page)',
};

export default function DiagnosticPanel() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [circuitBreaker, setCircuitBreaker] = useState<CircuitBreakerState | null>(null);
  const [preflight, setPreflight] = useState<PreflightResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runFullDiagnostic = useCallback(async () => {
    setLoading(true);
    setError(null);
    setDiagnostic(null);
    setCircuitBreaker(null);
    setPreflight(null);

    try {
      const [diagResp, cbResp, pfResp] = await Promise.all([
        fetch(`${LINKEDIN_OAUTH_URL}?action=diagnostic`),
        fetch(`${LINKEDIN_PUBLISHER_URL}?action=circuit_breaker`),
        fetch(`${LINKEDIN_PUBLISHER_URL}?action=preflight`, { method: 'POST' }),
      ]);

      const diagData = await diagResp.json();
      const cbData = await cbResp.json();
      const pfData = await pfResp.json();

      setDiagnostic(diagData);
      setCircuitBreaker(cbData);
      setPreflight(pfData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion au diagnostic');
    } finally {
      setLoading(false);
    }
  }, []);

  const totalChecks = diagnostic ? 7 : 0;
  const passedChecks = diagnostic
    ? [diagnostic.uri_ok, diagnostic.scopes_ok, diagnostic.admin_ok, diagnostic.token_valid, diagnostic.refresh_ok, diagnostic.mdp_ok, diagnostic.registry_synced].filter(Boolean).length
    : 0;

  return (
    <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
      <div className="p-5 border-b border-background-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground-950 flex items-center gap-2">
              <i className="ri-stethoscope-line text-[#0A66C2]" />
              Diagnostic Forensique OAuth LinkedIn — Phase 1
            </h3>
            <p className="text-xs text-foreground-500 mt-1">
              Preflight check complet : URI, scopes, rôle admin, token, refresh, MDP
            </p>
          </div>
          <button
            onClick={runFullDiagnostic}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#004182] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Diagnostic en cours...
              </>
            ) : (
              <>
                <i className="ri-play-circle-line" />
                Lancer le diagnostic
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 mx-5 mt-4 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2">
            <i className="ri-error-warning-fill text-red-500" />
            <p className="text-xs font-bold text-red-700">{error}</p>
          </div>
        </div>
      )}

      {diagnostic && (
        <div className="p-5 space-y-5">
          {/* Summary bar */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background-100">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              diagnostic.blocking_error ? 'bg-red-100' : passedChecks === totalChecks ? 'bg-emerald-100' : 'bg-amber-100'
            }`}>
              <i className={`${
                diagnostic.blocking_error ? 'ri-close-circle-fill text-red-500' : passedChecks === totalChecks ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-alert-fill text-amber-500'
              } text-xl`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground-950">
                {diagnostic.blocking_error
                  ? `Blocage détecté : ${diagnostic.blocking_error}`
                  : `${passedChecks}/${totalChecks} checks OK`}
              </p>
              <p className="text-xs text-foreground-500">
                {new Date(diagnostic.timestamp).toLocaleString('fr-FR')}
              </p>
            </div>
            {diagnostic.blocking_error && (
              <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase">
                Action requise
              </span>
            )}
          </div>

          {/* Detailed Checks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* URI Check */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.uri_ok ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.uri_ok ? 'ri-check-line text-emerald-500' : 'ri-close-line text-red-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Redirect URI</span>
              </div>
              <p className="text-xs text-foreground-500 mt-1">
                {diagnostic.uri_ok ? 'https://khepraexperts.com/linkedin-callback' : 'Non configurée ou invalide'}
              </p>
            </div>

            {/* Scopes Check */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.scopes_ok ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.scopes_ok ? 'ri-check-line text-emerald-500' : 'ri-alert-line text-amber-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Scopes OAuth</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Object.entries(diagnostic.scopes_detail).map(([scope, present]) => (
                  <span key={scope} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    present ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <i className={`${CHECK_ICONS[scope] || 'ri-question-line'} text-[10px]`} />
                    {CHECK_LABELS[scope] || scope}
                  </span>
                ))}
              </div>
            </div>

            {/* Token Health */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.token_valid ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.token_valid ? 'ri-check-line text-emerald-500' : 'ri-close-line text-red-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Token d'accès</span>
              </div>
              <p className="text-xs text-foreground-500 mt-1">
                {diagnostic.token_valid ? 'Valide et actif' : 'Expiré ou absent'}
              </p>
            </div>

            {/* Refresh Token */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.refresh_ok ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.refresh_ok ? 'ri-check-line text-emerald-500' : 'ri-alert-line text-amber-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Refresh Token</span>
              </div>
              <p className="text-xs text-foreground-500 mt-1">
                {diagnostic.refresh_ok ? 'Stocké et chiffré' : 'Non disponible → réauthentification requise si token expire'}
              </p>
            </div>

            {/* Admin Role */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.admin_ok ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.admin_ok ? 'ri-check-line text-emerald-500' : 'ri-alert-line text-amber-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Rôle Admin Page</span>
              </div>
              <p className="text-xs text-foreground-500 mt-1">
                {diagnostic.admin_ok ? 'ADMINISTRATOR confirmé' : 'Vérification impossible ou non-admin'}
              </p>
            </div>

            {/* MDP Status */}
            <div className={`p-3 rounded-xl border ${
              diagnostic.mdp_ok ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                <i className={`${diagnostic.mdp_ok ? 'ri-check-line text-emerald-500' : 'ri-alert-line text-amber-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">MDP Vidéo</span>
              </div>
              <p className="text-xs text-foreground-500 mt-1">
                {diagnostic.mdp_ok ? 'Marketing Developer Platform activé' : 'PENDING — stratégie carrousel active'}
              </p>
            </div>
          </div>

          {/* Preflight result */}
          {preflight && (
            <div className={`p-4 rounded-xl border ${
              preflight.ready && !preflight.blocking ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <i className={`${preflight.ready && !preflight.blocking ? 'ri-flight-takeoff-line text-emerald-500' : 'ri-flight-land-line text-amber-500'} text-lg`} />
                <span className="text-sm font-bold text-foreground-950">Preflight Publication</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-foreground-500">Mode Organisation</span>
                  <span className={`font-bold ${preflight.can_publish_as_org ? 'text-emerald-600' : 'text-red-500'}`}>
                    {preflight.can_publish_as_org ? 'OK' : 'NON'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Mode Profil</span>
                  <span className={`font-bold ${preflight.can_publish_as_member ? 'text-emerald-600' : 'text-red-500'}`}>
                    {preflight.can_publish_as_member ? 'OK' : 'NON'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Circuit Breaker</span>
                  <span className={`font-bold ${preflight.circuit_breaker_ok ? 'text-emerald-600' : 'text-red-500'}`}>
                    {preflight.circuit_breaker_ok ? 'OK' : 'OUVERT'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-500">Prêt à publier</span>
                  <span className={`font-bold ${preflight.ready ? 'text-emerald-600' : 'text-red-500'}`}>
                    {preflight.ready ? 'OUI' : 'NON'}
                  </span>
                </div>
              </div>
              {preflight.recommendations && preflight.recommendations.length > 0 && (
                <div className="mt-3 space-y-1">
                  {preflight.recommendations.map((rec, i) => (
                    <p key={i} className="text-[11px] text-amber-700 flex items-start gap-1">
                      <i className="ri-information-line text-amber-500 flex-shrink-0 mt-0.5" />
                      {rec}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Circuit Breaker */}
          {circuitBreaker && (
            <div className={`p-4 rounded-xl border ${
              !circuitBreaker.open ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className={`${!circuitBreaker.open ? 'ri-shield-check-line text-emerald-500' : 'ri-shield-flash-line text-red-500'} text-lg`} />
                  <span className="text-sm font-bold text-foreground-950">Circuit Breaker</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  !circuitBreaker.open ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {circuitBreaker.open ? `OUVERT (${circuitBreaker.cooldown_seconds}s)` : 'FERMÉ'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                <div>
                  <span className="text-foreground-500 block">Échecs</span>
                  <span className="font-bold text-foreground-950">{circuitBreaker.failures}/{circuitBreaker.max_failures}</span>
                </div>
                <div>
                  <span className="text-foreground-500 block">Dernier échec</span>
                  <span className="font-bold text-foreground-950">
                    {circuitBreaker.last_failure ? new Date(circuitBreaker.last_failure).toLocaleTimeString('fr-FR') : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-foreground-500 block">Peut publier</span>
                  <span className={`font-bold ${circuitBreaker.can_publish ? 'text-emerald-600' : 'text-red-500'}`}>
                    {circuitBreaker.can_publish ? 'OUI' : 'NON'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {diagnostic.recommendations.length > 0 && (
            <div className="p-4 rounded-xl bg-background-100 border border-background-200/70">
              <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-lightbulb-line text-[#0A66C2]" />
                Actions recommandées ({diagnostic.recommendations.length})
              </h4>
              <div className="space-y-2">
                {diagnostic.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white border border-background-200">
                    <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-foreground-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!diagnostic && !loading && (
        <div className="p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/5 flex items-center justify-center mx-auto mb-4">
            <i className="ri-stethoscope-line text-3xl text-[#0A66C2]/30" />
          </div>
          <p className="text-sm text-foreground-500 mb-2">
            Aucun diagnostic exécuté
          </p>
          <p className="text-xs text-foreground-400">
            Cliquez sur "Lancer le diagnostic" pour vérifier l'état complet de la connexion LinkedIn OAuth
          </p>
        </div>
      )}
    </div>
  );
}



