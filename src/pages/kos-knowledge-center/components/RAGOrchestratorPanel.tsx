import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRAGOrchestrator } from '@/hooks/useRAGOrchestrator';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

const SOURCE_GROUPS: { label: string; icon: string; sources: string[] }[] = [
  {
    label: 'Régulation bancaire',
    icon: 'ri-bank-line',
    sources: ['BCEAO', 'COBAC', 'BEAC', 'Comité de Bâle'],
  },
  {
    label: 'Marchés financiers',
    icon: 'ri-line-chart-line',
    sources: ['AMF-UEMOA', 'AMF-UMOA', 'BVMAC', 'BRVM', 'CIMA', 'FSB'],
  },
  {
    label: 'LBC/FT',
    icon: 'ri-shield-check-line',
    sources: ['GAFI', 'GIABA'],
  },
  {
    label: 'Droit & Commerce',
    icon: 'ri-scales-line',
    sources: ['OHADA', 'UNCITRAL', 'OMC'],
  },
  {
    label: 'Intégration régionale',
    icon: 'ri-global-line',
    sources: ['UEMOA', 'CEMAC', 'CEDEAO', 'Union Africaine', 'Union Européenne'],
  },
  {
    label: 'Normes & Audit',
    icon: 'ri-file-list-3-line',
    sources: ['IFRS Foundation', 'IFAC', 'ISO', 'COSO'],
  },
  {
    label: 'Développement & Fiscalité',
    icon: 'ri-money-dollar-circle-line',
    sources: ['OCDE', 'Banque Mondiale', 'BAD', 'FMI'],
  },
  {
    label: 'Cyber & Tech',
    icon: 'ri-shield-keyhole-line',
    sources: ['NIST', 'ARCEP', 'UNESCO'],
  },
  {
    label: 'Autres',
    icon: 'ri-more-line',
    sources: ['AFRISTAT', 'UNODC'],
  },
];

const ALL_SOURCES = SOURCE_GROUPS.flatMap((g) => g.sources);

export default function RAGOrchestratorPanel() {
  const {
    status,
    result,
    loading,
    error,
    fetchStatus,
    runDryRun,
    runCollect,
  } = useRAGOrchestrator();

  const { lang, setLang, isEn, t, translateText, translating } = useRAGTranslation();

  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [activeLog, setActiveLog] = useState<string[]>([]);
  // Translated log cache
  const [translatedLogs, setTranslatedLogs] = useState<Record<number, string>>({});
  const [translatingLogs, setTranslatingLogs] = useState(false);

  const filteredSources = useMemo(() => {
    if (!selectedDomain) return ALL_SOURCES;
    const group = SOURCE_GROUPS.find((g) => g.label === selectedDomain);
    return group ? group.sources : ALL_SOURCES;
  }, [selectedDomain]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    if (result?.log) {
      setActiveLog(result.log);
      setTranslatedLogs({});
    }
  }, [result]);

  useEffect(() => {
    if (selectedSource && !filteredSources.includes(selectedSource)) {
      setSelectedSource('');
    }
  }, [selectedDomain, selectedSource, filteredSources]);

  const handleDryRun = () => {
    const src = selectedSource || null;
    runDryRun(src);
  };

  const handleCollect = () => {
    const src = selectedSource || null;
    runCollect(src);
  };

  const handleTranslateLogs = useCallback(async () => {
    if (activeLog.length === 0) return;
    setTranslatingLogs(true);
    const newTranslated: Record<number, string> = {};
    for (let i = 0; i < activeLog.length; i++) {
      newTranslated[i] = await translateText(activeLog[i]);
    }
    setTranslatedLogs(newTranslated);
    setTranslatingLogs(false);
  }, [activeLog, translateText]);

  return (
    <div className="rounded-2xl border border-background-200/70 bg-background-50 p-5 md:p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100">
          <i className="ri-database-2-line text-accent-700"></i>
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground-950">{t('KOS RAG Orchestrator')}</h3>
          <p className="text-[11px] text-foreground-500">{t('Collecte automatique des sources réglementaires')}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* FR/EN Toggle */}
          <div className="flex items-center bg-background-100 rounded-full p-0.5 border border-background-200/70">
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                lang === 'fr'
                  ? 'bg-accent-500 text-white'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                lang === 'en'
                  ? 'bg-accent-500 text-white'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              EN
            </button>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {isEn ? 'Cron active (Sun 2 AM)' : 'Cron actif (dim. 2h)'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
          <div className="text-[10px] text-foreground-500 mb-1">{t('Documents RAG')}</div>
          <div className="text-lg font-bold text-foreground-950">
            {status ? status.total_documents.toLocaleString('fr-FR') : '—'}
          </div>
        </div>
        <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
          <div className="text-[10px] text-foreground-500 mb-1">{t('Depuis sources web')}</div>
          <div className="text-lg font-bold text-accent-500">
            {status ? status.enriched_from_sources.toLocaleString('fr-FR') : '—'}
          </div>
        </div>
        <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
          <div className="text-[10px] text-foreground-500 mb-1">{t('Saisis manuellement')}</div>
          <div className="text-lg font-bold text-primary-500">
            {status ? status.manually_entered.toLocaleString('fr-FR') : '—'}
          </div>
        </div>
        <div className="p-3 bg-background-100 rounded-lg border border-background-200/70">
          <div className="text-[10px] text-foreground-500 mb-1">{t('Sources connectées')}</div>
          <div className="text-lg font-bold text-secondary-500">
            {status ? Object.keys(status.sources).length : '—'}
          </div>
        </div>
      </div>

      {/* Domain Filter Chips */}
      <div className="mb-4">
        <label className="block text-[10px] font-semibold text-foreground-600 mb-2">
          {t('Filtrer par domaine')}
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedDomain('')}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer whitespace-nowrap ${
              selectedDomain === ''
                ? 'bg-accent-500 text-white border-accent-500'
                : 'bg-background-100 text-foreground-600 border-background-200/70 hover:border-accent-300 hover:text-accent-700'
            }`}
          >
            <i className="ri-apps-line text-xs"></i>
            {t('Tous')} ({ALL_SOURCES.length})
          </button>
          {SOURCE_GROUPS.map((group) => (
            <button
              key={group.label}
              onClick={() => setSelectedDomain(selectedDomain === group.label ? '' : group.label)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium border transition-all cursor-pointer whitespace-nowrap ${
                selectedDomain === group.label
                  ? 'bg-accent-500 text-white border-accent-500'
                  : 'bg-background-100 text-foreground-600 border-background-200/70 hover:border-accent-300 hover:text-accent-700'
              }`}
            >
              <i className={`${group.icon} text-xs`}></i>
              {isEn ? t(group.label) : group.label} ({group.sources.length})
            </button>
          ))}
        </div>
      </div>

      {/* Source Selector + Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-foreground-600 mb-1.5">
            {t('Source cible (optionnel — laisse vide pour toutes)')}
          </label>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-background-200 text-sm outline-none focus:border-accent-500 transition-colors bg-background-50 cursor-pointer"
          >
            <option value="">
              {selectedDomain
                ? `${isEn ? 'All sources in' : 'Toutes les sources "'}${isEn ? t(selectedDomain) : selectedDomain}" (${filteredSources.length})`
                : `${isEn ? 'All sources' : 'Toutes les sources'} (${ALL_SOURCES.length} ${isEn ? 'organizations' : 'organismes'})`}
            </option>
            {filteredSources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 sm:pt-5">
          <button
            onClick={handleDryRun}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-xs font-semibold border border-secondary-200 hover:bg-secondary-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <i className="ri-eye-line"></i>
            {t('Dry-Run')}
          </button>
          <button
            onClick={handleCollect}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-500 text-white text-xs font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <i className="ri-play-line"></i>
            {t('Lancer Collecte')}
          </button>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background-100 text-foreground-600 text-xs font-semibold border border-background-200 hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            <i className="ri-refresh-line"></i>
            {t('Rafraîchir')}
          </button>
        </div>
      </div>

      {/* Warning: no enriched docs */}
      {status && status.enriched_from_sources === 0 && status.total_documents > 0 && (
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 mb-4">
          <div className="flex items-start gap-2">
            <i className="ri-information-line text-amber-500 text-sm mt-0.5"></i>
            <div>
              <div className="text-xs font-semibold text-amber-700">{t('Aucun document issu de la collecte automatique')}</div>
              <div className="text-[11px] text-amber-600">
                {isEn
                  ? `The ${status.total_documents} current documents are manually entered. Launch a collection to enrich the RAG from regulatory sources.`
                  : `Les ${status.total_documents} documents actuels sont saisis manuellement. Lancez une collecte pour enrichir le RAG depuis les sources réglementaires.`
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-lg border border-accent-200 mb-4">
          <div className="w-4 h-4 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-accent-700 font-medium">
            {translating ? (isEn ? 'Translating logs...' : 'Traduction des logs...') : t('KOS Automaton en cours d\'exécution...')}
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
          <div className="flex items-start gap-2">
            <i className="ri-error-warning-line text-red-500 text-sm mt-0.5"></i>
            <div>
              <div className="text-xs font-semibold text-red-700">{t('Erreur')}</div>
              <div className="text-[11px] text-red-600">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-check-double-line text-emerald-600"></i>
            <span className="text-xs font-bold text-emerald-700">
              {result.mode === 'dry-run' ? t('Dry-Run terminé') : t('Collecte terminée')} — {result.duration_seconds}s
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 bg-white rounded-lg border border-emerald-200">
              <div className="text-sm font-bold text-emerald-700">{result.stats.documents_collected}</div>
              <div className="text-[10px] text-emerald-600">{t('Collectés')}</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg border border-emerald-200">
              <div className="text-sm font-bold text-amber-600">{result.stats.documents_skipped}</div>
              <div className="text-[10px] text-emerald-600">{t('Ignorés (doublons)')}</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg border border-emerald-200">
              <div className="text-sm font-bold text-red-600">{result.stats.documents_failed}</div>
              <div className="text-[10px] text-emerald-600">{t('Échoués')}</div>
            </div>
          </div>
          <div className="text-[10px] text-emerald-600">
            {t('Total en base:')} <strong>{result.stats.total_in_base}</strong> {isEn ? 'documents' : 'documents'}
          </div>
        </div>
      )}

      {/* Logs */}
      {activeLog.length > 0 && (
        <div className="rounded-lg border border-background-200/70 bg-background-950 text-background-50 p-3 overflow-hidden">
          <div className="text-[10px] font-semibold text-background-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <i className="ri-terminal-line"></i>
              {isEn ? 'KOS Automaton Logs' : 'Logs KOS Automaton'}
            </span>
            {isEn && Object.keys(translatedLogs).length === 0 && (
              <button
                onClick={handleTranslateLogs}
                disabled={translatingLogs}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 text-[10px] font-medium hover:bg-accent-500/30 transition-colors cursor-pointer whitespace-nowrap"
              >
                {translatingLogs ? (
                  <>
                    <div className="w-2.5 h-2.5 border border-accent-300 border-t-transparent rounded-full animate-spin"></div>
                    Translating...
                  </>
                ) : (
                  <>
                    <i className="ri-translate-2 text-xs"></i>
                    Translate logs
                  </>
                )}
              </button>
            )}
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 text-[11px] font-mono leading-relaxed">
            {activeLog.map((line, i) => (
              <div key={i} className="text-background-300">
                <span className="text-background-500 mr-1">[{String(i + 1).padStart(3, '0')}]</span>
                {isEn && translatedLogs[i] ? translatedLogs[i] : line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source breakdown */}
      {status && Object.keys(status.sources).length > 0 && (
        <div className="mt-5 pt-5 border-t border-background-200/70">
          <div className="text-[10px] font-semibold text-foreground-600 mb-2">{t('Répartition par source')}</div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(status.sources).map(([src, count]) => (
              <span
                key={src}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background-100 text-foreground-600 text-[10px] border border-background-200/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                {src}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}