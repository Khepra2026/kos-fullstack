import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type CountryEntry = {
  pays: string;
  ville: string;
  code: string;
  zone: string;
  slug: string;
  lat: number;
  lng: number;
  status: 'pending' | 'creating' | 'active' | 'error';
  error?: string;
  locationName?: string;
};

const OHADA_COUNTRIES: CountryEntry[] = [
  { pays: 'Bénin', ville: 'Cotonou', code: 'BJ', zone: 'UEMOA', slug: 'benin', lat: 6.3703, lng: 2.3912, status: 'pending' },
  { pays: 'Burkina Faso', ville: 'Ouagadougou', code: 'BF', zone: 'UEMOA', slug: 'burkina-faso', lat: 12.3714, lng: -1.5197, status: 'pending' },
  { pays: 'Cameroun', ville: 'Douala', code: 'CM', zone: 'CEMAC', slug: 'cameroun', lat: 4.0511, lng: 9.7679, status: 'pending' },
  { pays: 'Centrafrique', ville: 'Bangui', code: 'CF', zone: 'CEMAC', slug: 'centrafrique', lat: 4.3947, lng: 18.5582, status: 'pending' },
  { pays: 'Comores', ville: 'Moroni', code: 'KM', zone: 'OHADA', slug: 'comores', lat: -11.7172, lng: 43.2473, status: 'pending' },
  { pays: 'Congo', ville: 'Brazzaville', code: 'CG', zone: 'CEMAC', slug: 'congo', lat: -4.2634, lng: 15.2429, status: 'pending' },
  { pays: "Côte d'Ivoire", ville: 'Abidjan', code: 'CI', zone: 'UEMOA', slug: 'cote-ivoire', lat: 5.3600, lng: -4.0083, status: 'pending' },
  { pays: 'Gabon', ville: 'Libreville', code: 'GA', zone: 'CEMAC', slug: 'gabon', lat: 0.4162, lng: 9.4673, status: 'pending' },
  { pays: 'Guinée', ville: 'Conakry', code: 'GN', zone: 'OHADA', slug: 'guinee', lat: 9.6412, lng: -13.5784, status: 'pending' },
  { pays: 'Guinée-Bissau', ville: 'Bissau', code: 'GW', zone: 'UEMOA', slug: 'guinee-bissau', lat: 11.8817, lng: -15.6170, status: 'pending' },
  { pays: 'Guinée équatoriale', ville: 'Malabo', code: 'GQ', zone: 'CEMAC', slug: 'guinee-equatoriale', lat: 3.7500, lng: 8.7833, status: 'pending' },
  { pays: 'Mali', ville: 'Bamako', code: 'ML', zone: 'UEMOA', slug: 'mali', lat: 12.6392, lng: -8.0029, status: 'pending' },
  { pays: 'Niger', ville: 'Niamey', code: 'NE', zone: 'UEMOA', slug: 'niger', lat: 13.5116, lng: 2.1254, status: 'pending' },
  { pays: 'RDC', ville: 'Kinshasa', code: 'CD', zone: 'OHADA', slug: 'rdc', lat: -4.4419, lng: 15.2663, status: 'pending' },
  { pays: 'Sénégal', ville: 'Dakar', code: 'SN', zone: 'UEMOA', slug: 'senegal', lat: 14.7167, lng: -17.4677, status: 'pending' },
  { pays: 'Tchad', ville: "N'Djamena", code: 'TD', zone: 'CEMAC', slug: 'tchad', lat: 12.1348, lng: 15.0557, status: 'pending' },
  { pays: 'Togo', ville: 'Lomé', code: 'TG', zone: 'UEMOA', slug: 'togo', lat: 6.1256, lng: 1.2254, status: 'pending' },
];

const ZONE_COLORS: Record<string, string> = {
  UEMOA: 'accent',
  CEMAC: 'primary',
  OHADA: 'secondary',
};

type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
};

const PHONE_CODES: Record<string, string> = {
  BJ: '+229', BF: '+226', CM: '+237', CF: '+236', KM: '+269',
  CG: '+242', CI: '+225', GA: '+241', GN: '+224', GW: '+245',
  GQ: '+240', ML: '+223', NE: '+227', CD: '+243', SN: '+221',
  TD: '+235', TG: '+228',
};

export default function KOSGmbOhadaPage() {
  const [countries, setCountries] = useState<CountryEntry[]>(OHADA_COUNTRIES);
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toISOString(), message: 'Dashboard GMB OHADA initialisé. 17 pays en attente.', type: 'info' },
  ]);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [oauthStatus, setOauthStatus] = useState<'unknown' | 'ok' | 'error'>('unknown');
  const [totalExisting, setTotalExisting] = useState<number | null>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [{ timestamp: new Date().toISOString(), message, type }, ...prev.slice(0, 49)]);
  }, []);

  const checkStatus = useCallback(async () => {
    setCheckingStatus(true);
    addLog('Vérification du statut des fiches GMB via Google API...', 'info');

    try {
      const { data, error } = await supabase.functions.invoke('kos-gmb-manager', {
        method: 'GET',
      });

      if (error) throw new Error(error.message);

      if (data?.countries) {
        setCountries(prev =>
          prev.map(c => {
            const match = data.countries.find((dc: { pays: string; exists: boolean; status: string; error?: string }) => dc.pays === c.pays);
            return match
              ? { ...c, status: match.status as CountryEntry['status'], error: match.error, locationName: match.locationName }
              : c;
          })
        );
        setTotalExisting(data.total_existing ?? null);
        setOauthStatus('ok');
        addLog(`Connexion Google OK. ${data.total_existing ?? 0}/17 fiches existantes.`, 'success');
      }
    } catch (e: unknown) {
      const err = e as { message?: string };
      setOauthStatus('error');
      addLog(`Erreur connexion Google API: ${err.message || 'inconnue'}. Vérifiez vos credentials.`, 'error');
    } finally {
      setCheckingStatus(false);
    }
  }, [addLog]);

  const createAll = useCallback(async () => {
    setLoading(true);
    addLog('🚀 Lancement création en masse des 17 fiches GMB...', 'info');

    try {
      const { data, error } = await supabase.functions.invoke('kos-gmb-manager', {
        method: 'POST',
        body: { action: 'create-all' },
      });

      if (error) throw new Error(error.message);

      if (data?.results) {
        setCountries(prev =>
          prev.map(c => {
            const match = data.results.find((r: { pays: string; success: boolean; error?: string }) => r.pays === c.pays);
            if (!match) return c;
            return {
              ...c,
              status: match.success ? 'active' : 'error',
              error: match.error,
            };
          })
        );
        addLog(`Terminé: ${data.created ?? 0} créées, ${data.skipped ?? 0} déjà existantes, ${data.failed ?? 0} échecs.`, data.failed > 0 ? 'warning' : 'success');
        setTotalExisting(data.total_existing ?? null);
        setOauthStatus('ok');
      }
    } catch (e: unknown) {
      const err = e as { message?: string };
      addLog(`Erreur création en masse: ${err.message || 'inconnue'}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  const createOne = useCallback(async (country: CountryEntry) => {
    setCountries(prev =>
      prev.map(c => (c.slug === country.slug ? { ...c, status: 'creating' } : c))
    );
    addLog(`Création fiche: ${country.pays} (${country.ville})...`, 'info');

    try {
      const { data, error } = await supabase.functions.invoke('kos-gmb-manager', {
        method: 'POST',
        body: { action: 'create-one', slug: country.slug },
      });

      if (error) throw new Error(error.message);

      setCountries(prev =>
        prev.map(c => (c.slug === country.slug ? { ...c, status: 'active', error: undefined } : c))
      );
      addLog(`✅ ${country.pays} — Fiche créée avec succès !`, 'success');
      setOauthStatus('ok');
    } catch (e: unknown) {
      const err = e as { message?: string };
      setCountries(prev =>
        prev.map(c => (c.slug === country.slug ? { ...c, status: 'error', error: err.message } : c))
      );
      addLog(`❌ ${country.pays} — ${err.message || 'Erreur inconnue'}`, 'error');
    }
  }, [addLog]);

  const activeCount = countries.filter(c => c.status === 'active').length;
  const errorCount = countries.filter(c => c.status === 'error').length;
  const pendingCount = countries.filter(c => c.status === 'pending').length;
  const creatingCount = countries.filter(c => c.status === 'creating').length;

  const formatTime = (ts: string) => {
    try {
      return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '—';
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Header */}
      <header className="border-b border-background-200/70 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
              <i className="ri-google-fill text-background-50 text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground-950">
                KOS GMB OHADA<span className="text-primary-500">™</span>
              </h1>
              <p className="text-xs text-foreground-500 mt-0.5">Google Business Profile — 17 Pays OHADA</p>
            </div>
          </div>
          <p className="text-sm text-foreground-600 max-w-2xl mb-4">
            Pilotez la création et le suivi des 17 fiches Google Business Profile (ex-Google My Business) 
            couvrant la zone OHADA. Chaque fiche est liée à sa page due diligence dédiée et optimisée pour le SEO local.
          </p>

          {/* Stats & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            {/* OAuth Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-100 border border-background-200/60">
              <div className={`w-2 h-2 rounded-full ${oauthStatus === 'ok' ? 'bg-accent-500' : oauthStatus === 'error' ? 'bg-red-500' : 'bg-foreground-300'}`}></div>
              <span className="text-xs text-foreground-700 font-medium">
                {oauthStatus === 'ok' ? 'Google API connectée' : oauthStatus === 'error' ? 'Erreur OAuth' : 'Non vérifié'}
              </span>
            </div>

            {/* Count badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-100/80 border border-accent-200/60">
                <span className="text-xs font-bold text-accent-700">{activeCount}</span>
                <span className="text-xxs text-accent-600">actives</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-100/80 border border-secondary-200/60">
                <span className="text-xs font-bold text-secondary-700">{pendingCount}</span>
                <span className="text-xxs text-secondary-600">en attente</span>
              </div>
              {errorCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 border border-red-200/60">
                  <span className="text-xs font-bold text-red-700">{errorCount}</span>
                  <span className="text-xxs text-red-600">erreurs</span>
                </div>
              )}
              {totalExisting !== null && (
                <div className="text-xxs text-foreground-400">
                  {totalExisting}/17 dans Google
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={checkStatus}
                disabled={checkingStatus}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-100/80 hover:bg-secondary-200/60 text-secondary-800 text-sm font-medium border border-secondary-200/60 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                <i className={`ri-refresh-line text-sm ${checkingStatus ? 'animate-spin' : ''}`}></i>
                {checkingStatus ? 'Vérification...' : 'Vérifier statut'}
              </button>
              <button
                onClick={createAll}
                disabled={loading || pendingCount === 0}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-background-50 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 shadow-sm"
              >
                <i className="ri-rocket-line text-sm"></i>
                {loading ? 'Création en cours...' : `Créer tout (${pendingCount})`}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {countries.map((country) => {
            const zoneColor = ZONE_COLORS[country.zone] || 'secondary';
            const statusIcon =
              country.status === 'active' ? 'ri-checkbox-circle-fill text-accent-500' :
              country.status === 'creating' ? 'ri-loader-4-line animate-spin text-primary-500' :
              country.status === 'error' ? 'ri-close-circle-fill text-red-500' :
              'ri-time-line text-foreground-300';

            return (
              <div
                key={country.slug}
                className="p-5 rounded-xl bg-background-50 border border-background-200/60 hover:border-background-300/80 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground-900 leading-tight">
                      {country.pays}
                    </h3>
                    <p className="text-xxs text-foreground-500 mt-0.5">{country.ville}</p>
                  </div>
                  <i className={`${statusIcon} text-lg mt-0.5`}></i>
                </div>

                {/* Zone badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xxs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `oklch(var(--${zoneColor}-100) / 0.8)`,
                      color: `oklch(var(--${zoneColor}-700))`,
                    }}
                  >
                    {country.zone}
                  </span>
                  <span className="text-xxs text-foreground-400">{country.code}</span>
                  {country.status === 'error' && country.error && (
                    <span className="text-xxs text-red-500 truncate max-w-[120px]" title={country.error}>
                      {country.error}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://khepraexperts.com/due-diligence-${country.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xxs text-foreground-400 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-external-link-line"></i>
                    Page DD
                  </a>
                  {country.status === 'pending' && (
                    <button
                      onClick={() => createOne(country)}
                      disabled={loading}
                      className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-md text-xxs font-medium bg-background-100 hover:bg-background-200 text-foreground-700 border border-background-200/60 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      <i className="ri-add-line"></i>
                      Créer
                    </button>
                  )}
                  {country.status === 'error' && (
                    <button
                      onClick={() => createOne(country)}
                      disabled={loading}
                      className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-md text-xxs font-medium bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                    >
                      <i className="ri-restart-line"></i>
                      Réessayer
                    </button>
                  )}
                  {country.status === 'creating' && (
                    <span className="ml-auto text-xxs text-primary-600 flex items-center gap-1">
                      <i className="ri-loader-4-line animate-spin"></i>
                      Création...
                    </span>
                  )}
                </div>

                {/* Map preview — Google Maps static thumbnail */}
                <div className="mt-3 rounded-lg overflow-hidden bg-background-100 h-20 relative">
                  <iframe
                    title={`Carte ${country.pays}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=&q=${country.ville},${country.pays}&zoom=5&language=fr`}
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center bg-background-950/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xxs text-background-50 bg-background-950/70 px-2 py-1 rounded">
                      {country.lat.toFixed(2)}, {country.lng.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works section */}
        <div className="mb-8 p-6 rounded-xl bg-background-50 border border-background-200/60">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded bg-primary-500/15 flex items-center justify-center">
              <i className="ri-information-line text-primary-600 text-xs"></i>
            </div>
            <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">Comment ça marche</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-600">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800 mb-1">Credentials Google</p>
                <p className="text-xs text-foreground-500">
                  Les secrets GOOGLE_GMB_CLIENT_ID, CLIENT_SECRET et REFRESH_TOKEN sont stockés dans Supabase Secrets.
                  L'Edge Function gère l'OAuth2 automatiquement.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-600">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800 mb-1">Création via Google API</p>
                <p className="text-xs text-foreground-500">
                  Chaque fiche est créée avec le nom, adresse, coordonnées GPS, catégories (Financial Consultant,
                  Business Management, Accountant) et lien vers la page due diligence dédiée.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-600">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-800 mb-1">SEO Local + GEO</p>
                <p className="text-xs text-foreground-500">
                  Fiches liées aux 17 pages /due-diligence-{'{pays}'}, sitemap GEO, schema.org ProfessionalService,
                  et optimisées pour les crawlers IA (GPTBot, ClaudeBot, PerplexityBot).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-xl bg-background-50 border border-background-200/60 overflow-hidden">
          <div className="p-5 border-b border-background-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-secondary-500/15 flex items-center justify-center">
                <i className="ri-terminal-box-line text-secondary-600 text-xs"></i>
              </div>
              <span className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">
                Journal d'activité
              </span>
            </div>
            <span className="text-xxs text-foreground-400">{logs.length} entrées</span>
          </div>
          <div className="divide-y divide-background-200/40 max-h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-2.5 hover:bg-background-100/50 transition-colors">
                <span
                  className={`text-xxs px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${
                    log.type === 'error'
                      ? 'bg-red-100 text-red-700'
                      : log.type === 'success'
                        ? 'bg-accent-100 text-accent-700'
                        : log.type === 'warning'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-secondary-100 text-secondary-700'
                  }`}
                >
                  {log.type}
                </span>
                <span className="text-xs text-foreground-600 flex-1">{log.message}</span>
                <span className="text-xxs text-foreground-400 whitespace-nowrap">{formatTime(log.timestamp)}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-xs text-foreground-400">Aucune activité pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-background-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-foreground-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>KOS GMB OHADA™ v1.0</span>
            <span className="hidden sm:inline">·</span>
            <span>17 pays · Google Business Profile API</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              UEMOA (8 pays)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              CEMAC (6 pays)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
              OHADA (3 pays)
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}