import { useState, useCallback } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useAfricaObservatories } from '@/hooks/useAfricaObservatories';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

export default function africaObservatoriesPage() {
  const { data, loading } = useAfricaObservatories();
  const [selectedObservatory, setSelectedObservatory] = useState(0);
  const [expandedIndicator, setExpandedIndicator] = useState<string | null>(null);

  // Translation
  const { lang, setLang, isEn, t, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, { title?: string; description?: string; name?: string }>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  const observatories = data.observatories;
  const kpis = data.observatoryKPIs;
  const schedule = data.weeklySchedule;
  const active = observatories[selectedObservatory];

  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];
    const newTranslated: Record<string, { title?: string; description?: string; name?: string }> = { ...translatedItems };
    
    // Observatory descriptions
    for (const obs of observatories) {
      if (!newTranslated[`obs-${obs.id}`]) {
        batch.push(obs.description);
      }
    }
    // Recent updates for active observatory
    for (let i = 0; i < active.recentUpdates.length; i++) {
      const key = `update-${i}`;
      if (!newTranslated[key]) {
        batch.push(active.recentUpdates[i].title);
      }
    }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try {
      const translated = await translateBatch(batch);
      let idx = 0;
      for (const obs of observatories) {
        if (!newTranslated[`obs-${obs.id}`] && idx < translated.length) {
          newTranslated[`obs-${obs.id}`] = { description: translated[idx] };
          idx++;
        }
      }
      for (let i = 0; i < active.recentUpdates.length; i++) {
        const key = `update-${i}`;
        if (!newTranslated[key] && idx < translated.length) {
          newTranslated[key] = { title: translated[idx] };
          idx++;
        }
      }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
    setTranslatingAll(false);
  }, [isEn, observatories, active.recentUpdates, translatedItems, translateBatch]);

  const getImpactColor = (impact: string) => {
    if (impact === 'Critique') return 'bg-red-100 text-red-700 border-red-200';
    if (impact === 'Élevé') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-secondary-100 text-secondary-700 border-secondary-200';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return 'ri-arrow-up-line text-green-500';
    if (trend === 'down') return 'ri-arrow-down-line text-red-500';
    return 'ri-arrow-right-line text-foreground-400';
  };

  const formatNumber = (n: number) => n.toLocaleString('fr-FR');

  if (loading) {
    return (
      <hubLayout hubId={66}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-foreground-300"></i>
        </div>
      </hubLayout>
    );
  }

  return (
    <hubLayout hubId={66}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
                <i className="ri-earth-line"></i>KOS Bloc 11 — Africa Observatories Program
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">KOS Africa Observatories Program™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                {t(
                  '6 Observatoires sectoriels — Veille continue, indicateurs, analyses hebdomadaires sur BCEAO, SFD, FinTech, Gouvernance, ESG et Investissement en Afrique francophone.',
                  '6 Sectoral Observatories — Continuous monitoring, indicators, weekly analysis on BCEAO, SFD, FinTech, Governance, ESG and Investment in Francophone Africa.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-emerald-500">{kpis.observatoriesActive}</div>
                <div className="text-xs text-foreground-500">Observatoires</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{formatNumber(kpis.totalAlertsThisMonth)}</div>
                <div className="text-xs text-foreground-500">Alertes/Mois</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{formatNumber(kpis.totalSubscribers)}</div>
                <div className="text-xs text-foreground-500">Abonnés</div>
              </div>
              <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
              {isEn && (
                <>
                <button
                  onClick={handleTranslateAll}
                  disabled={translatingAll}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-medium transition-all cursor-pointer border whitespace-nowrap ${
                    translatingAll
                      ? 'bg-background-100 text-foreground-400 border-background-200'
                      : 'bg-foreground-950 text-background-50 border-foreground-950 hover:bg-foreground-800'
                  }`}
                >
                  {translatingAll ? (
                    <>
                      <div className="w-2.5 h-2.5 border border-background-50 border-t-transparent rounded-full animate-spin"></div>
                      {t('Traduction...', 'Translating...')}
                    </>
                  ) : (
                    <>
                      <i className="ri-translate-2 text-[10px]"></i>
                      {t('Traduire tout', 'Translate All')}
                    </>
                  )}
                </button>
                {cacheCount > 0 && (
                  <div className="relative group">
                    <button className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-[10px] font-medium border border-background-200 bg-background-50 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-download-line text-[10px]"></i>
                      Export
                    </button>
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[90px]">
                      <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                        <i className="ri-file-excel-2-line mr-1.5"></i>CSV
                      </button>
                      <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-[10px] font-medium text-foreground-700 hover:bg-background-100 cursor-pointer whitespace-nowrap">
                        <i className="ri-code-line mr-1.5"></i>JSON
                      </button>
                    </div>
                  </div>
                )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Observatory Selector */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {observatories.map((obs, i) => (
              <button
                key={obs.id}
                onClick={() => { setSelectedObservatory(i); setExpandedIndicator(null); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  i === selectedObservatory ? 'bg-emerald-600 text-white' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${obs.icon} text-sm`}></i>
                {obs.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Active Observatory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Observatory Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 bg-background-50 rounded-lg border border-background-200/70 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
                <i className={`${active.icon} text-emerald-600 text-2xl`}></i>
              </div>
              <h2 className="text-lg font-bold text-foreground-950">{active.name}</h2>
              <p className="text-xs text-foreground-600 mt-2 leading-relaxed">{isEn && translatedItems[`obs-${active.id}`]?.description ? translatedItems[`obs-${active.id}`].description : active.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{formatNumber(active.stats.publications)}</div>
                <div className="text-[10px] text-foreground-500">Publications</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-red-500">{active.stats.alertsThisMonth}</div>
                <div className="text-[10px] text-foreground-500">Alertes/Mois</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-accent-500">{active.stats.indicators}</div>
                <div className="text-[10px] text-foreground-500">Indicateurs</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-primary-500">{formatNumber(active.stats.subscribers)}</div>
                <div className="text-[10px] text-foreground-500">Abonnés</div>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <h4 className="text-xs font-bold text-foreground-950 mb-3 flex items-center gap-2">
                <i className="ri-calendar-line text-foreground-400"></i>Programme
              </h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between"><span className="text-foreground-500">Fréquence</span><span className="font-medium text-foreground-950">{active.schedule.frequency}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">Prochaine</span><span className="font-medium text-foreground-950">{new Date(active.schedule.nextPublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span></div>
                <div className="flex justify-between"><span className="text-foreground-500">Format</span><span className="font-medium text-foreground-950 text-right max-w-[60%]">{active.schedule.format}</span></div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Updates */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-notification-3-line text-accent-500 w-4 h-4 flex items-center justify-center"></i>
                Dernières Actualités
              </h3>
              <div className="space-y-2">
                {active.recentUpdates.map((u, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70 flex items-start gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border whitespace-nowrap mt-0.5 ${getImpactColor(u.impact)}`}>
                      {u.impact}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-background-100 text-foreground-500 font-medium">{u.type}</span>
                        <span className="text-[10px] text-foreground-400">{new Date(u.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <p className="text-xs text-foreground-700 leading-relaxed">{isEn && translatedItems[`update-${i}`]?.title ? translatedItems[`update-${i}`].title : u.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators Dashboard */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
                <i className="ri-dashboard-line text-primary-500 w-4 h-4 flex items-center justify-center"></i>
                Indicateurs Clés
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {active.indicators.map((ind, i) => (
                  <div
                    key={i}
                    onClick={() => setExpandedIndicator(expandedIndicator === ind.name ? null : ind.name)}
                    className="p-4 bg-background-50 rounded-lg border border-background-200/70 cursor-pointer hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-foreground-500">{ind.name}</span>
                      <i className={`${getTrendIcon(ind.trend)} text-xs w-3 h-3 flex items-center justify-center`}></i>
                    </div>
                    <div className="text-lg font-bold text-foreground-950">{ind.value}</div>
                    <div className="text-[10px] text-foreground-400 mt-1">{ind.period}</div>
                    {expandedIndicator === ind.name && (
                      <div className="mt-2 pt-2 border-t border-background-200/70">
                        <span className={`text-[10px] font-medium ${ind.trend === 'up' ? 'text-green-600' : ind.trend === 'down' ? 'text-red-600' : 'text-foreground-500'}`}>
                          Tendance : {ind.trend === 'up' ? 'Hausse' : ind.trend === 'down' ? 'Baisse' : 'Stable'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-foreground-950 mb-4 flex items-center gap-2">
            <i className="ri-calendar-todo-line text-secondary-500 w-4 h-4 flex items-center justify-center"></i>
            Planning Hebdomadaire des Publications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {Object.entries(schedule).map(([day, info]) => (
              <div key={day} className="p-4 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-xs font-bold text-foreground-950 capitalize mb-2">{day === 'monday' ? 'Lundi' : day === 'tuesday' ? 'Mardi' : day === 'wednesday' ? 'Mercredi' : day === 'thursday' ? 'Jeudi' : day === 'friday' ? 'Vendredi' : day === 'saturday' ? 'Samedi' : 'Dimanche'}</div>
                <div className="text-[10px] text-emerald-600 font-medium mb-1">{info.observatory}</div>
                <div className="text-[10px] text-foreground-500">{info.type}</div>
                <div className="text-[10px] text-foreground-400 mt-1">{info.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">Métriques — KOS Africa Observatories Program™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Couverture</div>
              <div className="text-lg font-bold text-emerald-500">{kpis.scoreCoverage.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">6 domaines — Cible {kpis.scoreCoverage.target}%</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Fraîcheur des Données</div>
              <div className="text-lg font-bold text-primary-500">{kpis.scoreFreshness.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">Mise à jour &lt; 7 jours</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Exactitude</div>
              <div className="text-lg font-bold text-accent-500">{kpis.scoreAccuracy.current}%</div>
              <div className="text-xs text-foreground-400 mt-2">Indicateurs vérifiés</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">Score d'Impact</div>
              <div className="text-lg font-bold text-secondary-500">{kpis.scoreImpact.current}/100</div>
              <div className="text-xs text-foreground-400 mt-2">Cible {kpis.scoreImpact.target}</div>
            </div>
          </div>
        </div>
      </section>
    </hubLayout>
  );
}





