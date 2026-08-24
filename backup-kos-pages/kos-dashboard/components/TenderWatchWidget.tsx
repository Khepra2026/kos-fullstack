import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTenderWatchLive, type TenderAlertLive } from '@/hooks/useTenderWatchLive';

function formatFCFA(val: number): string {
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} Md`;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)} M`;
  return val.toLocaleString('fr-FR');
}

function getRelevanceBadge(relevanceClass: string) {
  if (relevanceClass === 'high') return 'bg-red-100 text-red-700 border-red-200';
  if (relevanceClass === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-background-100 text-foreground-500 border-background-200';
}

function getRelevanceLabel(relevanceClass: string) {
  if (relevanceClass === 'high') return 'HAUTE';
  if (relevanceClass === 'medium') return 'MOYENNE';
  return 'FAIBLE';
}

function getTenderTypeIcon(type: string | null): string {
  if (!type) return 'ri-file-list-3-line';
  const t = type.toLowerCase();
  if (t.includes('ao') || t.includes('appel d\'offres')) return 'ri-file-text-line';
  if (t.includes('ami') || t.includes('manifestation')) return 'ri-user-search-line';
  if (t.includes('rfp') || t.includes('proposal')) return 'ri-draft-line';
  if (t.includes('recrutement') || t.includes('consultant')) return 'ri-team-line';
  return 'ri-briefcase-line';
}

function AlertCard({ alert: a }: { alert: TenderAlertLive }) {
  const daysLeft = a.deadline
    ? Math.ceil((new Date(a.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const isUrgent = daysLeft !== null && daysLeft <= 7;

  return (
    <Link
      to="/kos-tender-intelligence"
      className="group block p-4 bg-background-50 rounded-lg border border-background-200/70 hover:border-background-300/60 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRelevanceBadge(a.relevance_class)}`}>
            {a.relevance_class === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
            {getRelevanceLabel(a.relevance_class)}
          </span>
          {a.tender_type && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">
              {a.tender_type}
            </span>
          )}
          {isUrgent && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold whitespace-nowrap animate-pulse">
              J-{daysLeft}
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-foreground-950 whitespace-nowrap">{a.relevance_score}/10</span>
      </div>
      <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 line-clamp-2 group-hover:text-primary-500 transition-colors font-heading">
        {a.title}
      </h4>
      <div className="flex items-center justify-between text-xs text-foreground-500 font-body">
        <span className="flex items-center gap-1 truncate max-w-[60%]">
          <i className="ri-building-4-line text-[10px]"></i>
          {a.source_name}
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <i className="ri-map-pin-line text-[10px]"></i>
          {a.region || a.country || '—'}
        </span>
        {a.estimated_budget_fcfa && a.estimated_budget_fcfa > 0 && (
          <span className="font-bold text-foreground-950 whitespace-nowrap">{formatFCFA(a.estimated_budget_fcfa)}</span>
        )}
      </div>
      {a.expertise_tags && a.expertise_tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {a.expertise_tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-background-100 text-foreground-500 font-body">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function TenderWatchWidget() {
  const { alerts, stats, loading, error, isLive, lastRefresh, refetch, triggerScraper, notifyNow } = useTenderWatchLive();
  const [scanning, setScanning] = useState(false);
  const [scannerResult, setScannerResult] = useState<string | null>(null);
  const [notifying, setNotifying] = useState(false);
  const [notifyResult, setNotifyResult] = useState<{ sent: boolean; count: number; high_count: number } | null>(null);

  const highAlerts = useMemo(() => alerts.filter(a => a.relevance_class === 'high').slice(0, 6), [alerts]);
  const mediumAlerts = useMemo(() => alerts.filter(a => a.relevance_class === 'medium').slice(0, 4), [alerts]);

  const handleScan = async () => {
    setScanning(true);
    setScannerResult(null);
    const result = await triggerScraper();
    if (result) {
      setScannerResult(`${result.total_found || 0} offres trouvées — ${result.high_relevance || 0} haute pertinence`);
    } else {
      setScannerResult('Scan terminé. Voir les logs scraper pour détails.');
    }
    setScanning(false);
    setTimeout(() => setScannerResult(null), 8000);
  };

  const handleNotify = async () => {
    setNotifying(true);
    setNotifyResult(null);
    const result = await notifyNow('high');
    if (result) {
      setNotifyResult({ sent: result.sent, count: result.count || 0, high_count: result.high_count || 0 });
    } else {
      setNotifyResult({ sent: false, count: 0, high_count: 0 });
    }
    setNotifying(false);
    await refetch();
    setTimeout(() => setNotifyResult(null), 10000);
  };

  return (
    <section className="border-t border-background-200/70 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-700">
              <i className="ri-radar-line text-xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-foreground-950 font-heading">Veille Appels d'Offres</h2>
                {isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    LIVE SUPABASE
                  </span>
                )}
                {!isLive && !loading && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    EN ATTENTE DE DONNÉES
                  </span>
                )}
                {loading && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-background-100 text-foreground-500 text-[10px] font-bold">
                    <i className="ri-loader-4-line animate-spin"></i>
                    CHARGEMENT
                  </span>
                )}
              </div>
              <p className="text-xs text-foreground-500 mt-1 font-body">
                Détection temps réel AO/AMI/Recrutement — {stats.sources} sources · Dernière synchro {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleScan}
              disabled={scanning}
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Scan en cours...
                </>
              ) : (
                <>
                  <i className="ri-radar-line"></i>
                  Scanner Opportunités
                </>
              )}
            </button>
            <button
              onClick={handleNotify}
              disabled={notifying || stats.highRelevance === 0}
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-background-50 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {notifying ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <i className="ri-mail-send-line"></i>
                  Notifier Maintenant
                </>
              )}
            </button>
            <button
              onClick={refetch}
              className="whitespace-nowrap px-3 py-2 rounded-lg border border-background-200/70 text-foreground-600 text-sm hover:bg-background-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <i className="ri-refresh-line"></i>
            </button>
            <Link
              to="/kos-tender-intelligence"
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-foreground-950 text-background-50 text-sm font-semibold hover:bg-foreground-800 transition-all cursor-pointer flex items-center gap-2"
            >
              <i className="ri-arrow-right-line"></i>
              Tender Intelligence
            </Link>
          </div>
        </div>

        {/* Scanner Result Toast */}
        {scannerResult && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-body flex items-center gap-2">
            <i className="ri-check-line text-emerald-600"></i>
            {scannerResult}
            <button onClick={() => setScannerResult(null)} className="ml-auto text-emerald-400 hover:text-emerald-600 cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>
        )}

        {/* Notify Toast */}
        {notifyResult && (
          <div className={`mb-4 p-3 rounded-lg border text-sm font-body flex items-center gap-2 ${notifyResult.sent ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-700'}`}>
            <i className={`${notifyResult.sent ? 'ri-check-double-line text-emerald-600' : 'ri-close-circle-line text-red-500'}`}></i>
            {notifyResult.sent
              ? `Email envoyé à contact@khepraexperts.com — ${notifyResult.count} AO/AMI (${notifyResult.high_count} haute pertinence)`
              : 'Échec de l\'envoi. Vérifiez la configuration Resend ou réessayez.'}
            <button onClick={() => setNotifyResult(null)} className="ml-auto text-current opacity-50 hover:opacity-100 cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-body flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
            <button onClick={refetch} className="ml-auto underline cursor-pointer">Réessayer</button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-red-600 font-heading">{stats.highRelevance}</div>
            <div className="text-[10px] text-foreground-500 font-body">Haute Pertinence</div>
          </div>
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-foreground-950 font-heading">{stats.critical}</div>
            <div className="text-[10px] text-foreground-500 font-body">Critiques (≥5/10)</div>
          </div>
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-foreground-950 font-heading">{stats.totalToday}</div>
            <div className="text-[10px] text-foreground-500 font-body">Aujourd'hui</div>
          </div>
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-accent-500 font-heading">{formatFCFA(stats.totalBudget)}</div>
            <div className="text-[10px] text-foreground-500 font-body">Budget Cumulé</div>
          </div>
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-primary-500 font-heading">{stats.sources}</div>
            <div className="text-[10px] text-foreground-500 font-body">Sources</div>
          </div>
          <div className="p-3 bg-background-100 rounded-lg border border-background-200/70 text-center">
            <div className="text-lg font-bold text-foreground-950 font-heading">{alerts.length}</div>
            <div className="text-[10px] text-foreground-500 font-body">Total AO/AMI</div>
          </div>
        </div>

        {/* High Relevance Alerts Grid */}
        {highAlerts.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <h3 className="text-sm font-bold text-foreground-950 font-heading">Opportunités Haute Pertinence</h3>
              <span className="text-xs text-foreground-400 font-body">({highAlerts.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highAlerts.map(a => <AlertCard key={a.id} alert={a} />)}
            </div>
          </div>
        )}

        {/* Medium Relevance */}
        {mediumAlerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h3 className="text-sm font-bold text-foreground-950 font-heading">Opportunités Moyenne Pertinence</h3>
              <span className="text-xs text-foreground-400 font-body">({mediumAlerts.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediumAlerts.map(a => <AlertCard key={a.id} alert={a} />)}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && alerts.length === 0 && !error && (
          <div className="text-center py-10 bg-background-100 rounded-lg border border-background-200/70">
            <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-full bg-background-200/70">
              <i className="ri-radar-line text-2xl text-foreground-400"></i>
            </div>
            <p className="text-sm text-foreground-500 font-body mb-1">Aucune alerte d'appel d'offres pour le moment</p>
            <p className="text-xs text-foreground-400 font-body mb-4">Lancez un scan ou attendez la prochaine synchronisation automatique</p>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="whitespace-nowrap px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all cursor-pointer disabled:opacity-60"
            >
              {scanning ? 'Scan en cours...' : 'Lancer un scan maintenant'}
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-6 pt-4 border-t border-background-200/70 flex items-center justify-between text-xs text-foreground-400 font-body">
          <span className="flex items-center gap-1">
            <i className="ri-mail-send-line text-emerald-600"></i>
            Notifications auto via <strong className="text-foreground-600">Resend → contact@khepraexperts.com</strong>
          </span>
          <span>Actualisation automatique toutes les 30 secondes · Realtime via Supabase</span>
        </div>
      </div>
    </section>
  );
}





