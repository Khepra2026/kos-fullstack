import { useState, useCallback } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useThoughtLeadership } from '@/hooks/useThoughtLeadership';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

type Tab = 'insights' | 'research' | 'pipeline' | 'contributors';

export default function KOSThoughtLeadershipCenterPage() {
  const { data, loading } = useThoughtLeadership();
  const { lang, setLang, isEn, t, translateText, translateBatch, translating, cacheCount, exportCache, targetLang, setTargetLang, targetLabels } = useRAGTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('insights');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedPub, setSelectedPub] = useState<string | null>(null);
  const [translatedDomains, setTranslatedDomains] = useState<Record<string, string>>({});
  const [translatedAnalyses, setTranslatedAnalyses] = useState<Record<string, string>>({});
  const [translatedPubs, setTranslatedPubs] = useState<Record<string, string>>({});
  const [translatedContribs, setTranslatedContribs] = useState<Record<string, string>>({});
  const [translatedFormats, setTranslatedFormats] = useState<Record<string, string>>({});
  const [translatedLabels, setTranslatedLabels] = useState<Record<string, string>>({});

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'insights', label: t('KHEPRA Insights™', 'KHEPRA Insights™'), icon: 'ri-lightbulb-line' },
    { id: 'research', label: t('Research Institute™', 'Research Institute™'), icon: 'ri-microscope-line' },
    { id: 'pipeline', label: t('Pipeline Éditorial', 'Editorial Pipeline'), icon: 'ri-bar-chart-line' },
    { id: 'contributors', label: t('Thinkers & Fellows', 'Thinkers & Fellows'), icon: 'ri-team-line' },
  ];

  const domainColors: Record<string, string> = {
    'insight-bceao': 'bg-amber-100 text-amber-700 border-amber-200',
    'insight-uemoa': 'bg-blue-100 text-blue-700 border-blue-200',
    'insight-ohada': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'insight-esg': 'bg-green-100 text-green-700 border-green-200',
    'insight-sfd': 'bg-violet-100 text-violet-700 border-violet-200',
    'insight-fintech': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  };

  const formatNumber = (n: number) => n.toLocaleString('fr-FR');

  const getTranslated = (original: string, cache: Record<string, string>) => (
    isEn && cache[original] ? cache[original] : original
  );

  const totalTranslatable = (() => {
    let count = 0;
    count += insights.domains.length;
    count += insights.domains.reduce((s, d) => s + d.topAnalyses.length, 0);
    count += research.flagshipPublications.length;
    count += contributors.length;
    count += publications.formats.length;
    return count;
  })();

  const allTranslatedCaches = { ...translatedDomains, ...translatedAnalyses, ...translatedPubs, ...translatedContribs, ...translatedFormats };
  const totalTranslated = Object.keys(allTranslatedCaches).length;

  const handleTranslateAll = useCallback(async () => {
    const domainNames = insights.domains.map((d) => d.name);
    const analysisTitles = insights.domains.flatMap((d) => d.topAnalyses.map((a) => a.title));
    const pubTitles = research.flagshipPublications.map((p) => p.title);
    const contribTexts = contributors.map((c) => c.expertise);
    const formatNames = publications.formats.map((f) => f.name);

    const allTexts = [...domainNames, ...analysisTitles, ...pubTitles, ...contribTexts, ...formatNames];
    const translated = await translateBatch(allTexts);

    let idx = 0;
    const dMap: Record<string, string> = {};
    domainNames.forEach((n) => { dMap[n] = translated[idx++] || n; });
    const aMap: Record<string, string> = {};
    analysisTitles.forEach((n) => { aMap[n] = translated[idx++] || n; });
    const pMap: Record<string, string> = {};
    pubTitles.forEach((n) => { pMap[n] = translated[idx++] || n; });
    const cMap: Record<string, string> = {};
    contribTexts.forEach((n) => { cMap[n] = translated[idx++] || n; });
    const fMap: Record<string, string> = {};
    formatNames.forEach((n) => { fMap[n] = translated[idx++] || n; });

    setTranslatedDomains((prev) => ({ ...prev, ...dMap }));
    setTranslatedAnalyses((prev) => ({ ...prev, ...aMap }));
    setTranslatedPubs((prev) => ({ ...prev, ...pMap }));
    setTranslatedContribs((prev) => ({ ...prev, ...cMap }));
    setTranslatedFormats((prev) => ({ ...prev, ...fMap }));
  }, [insights, research, contributors, publications, translateBatch]);

  const translateSingle = useCallback(async (text: string, cache: Record<string, string>, setter: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
    if (cache[text]) return;
    const res = await translateText(text);
    if (res !== text) setter((prev) => ({ ...prev, [text]: res }));
  }, [translateText]);

  const insights = data.khepraInsights;
  const research = data.researchInstitute;
  const publications = data.thoughtLeadershipPublications;
  const contributors = publications.thinkTankContributors;
  const kpis = data.thoughtLeadershipKPIs;

  if (loading) {
    return (
      <KOSHubLayout hubId={65}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-foreground-300"></i>
        </div>
      </KOSHubLayout>
    );
  }

  return (
    <KOSHubLayout hubId={65}>
      {/* Header */}
      <section className="relative bg-background-100 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                <i className="ri-lightbulb-flash-line"></i>KOS Bloc 2 — {t('Thought Leadership Center', 'Thought Leadership Center')}
              </div>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground-950 tracking-tight">KOS Thought Leadership Center™</h1>
              <p className="text-sm md:text-base text-foreground-600 mt-3 max-w-2xl">
                {isEn
                  ? `Big Four-level intellectual production engine — ${formatNumber(insights.totalPublications)} publications, ${formatNumber(insights.totalDownloads)} downloads, ${insights.totalCitations} citations. 6 domains, 12 White Papers, 6 Annual Reports.`
                  : `Machine de production intellectuelle niveau Big Four — ${formatNumber(insights.totalPublications)} publications, ${formatNumber(insights.totalDownloads)} téléchargements, ${insights.totalCitations} citations. 6 domaines, 12 Livres Blancs, 6 Rapports Annuels.`
                }
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
              <button
                onClick={handleTranslateAll}
                disabled={translating}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                  totalTranslated >= totalTranslatable && totalTranslatable > 0
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-accent-100 text-accent-700 border border-accent-200 hover:bg-accent-200'
                }`}
              >
                {translating ? (
                  <><i className="ri-loader-4-line animate-spin"></i>Translating...</>
                ) : totalTranslated >= totalTranslatable && totalTranslatable > 0 ? (
                  <>{t('Tout traduit', 'All Translated')} <i className="ri-check-double-line"></i></>
                ) : (
                  <>{t('Traduire tout', 'Translate All')}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      totalTranslated > totalTranslatable / 2 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                    }`}>{totalTranslated}/{totalTranslatable}</span>
                  </>
                )}
              </button>
              {cacheCount > 0 && (
                <div className="relative group">
                  <button className="whitespace-nowrap px-2 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer bg-background-50 border border-background-200/70 text-foreground-500 hover:text-foreground-700 transition-colors">
                    <i className="ri-download-2-line"></i>
                    <span className="hidden sm:inline">{t('Exporter', 'Export')}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-background-200 shadow-lg py-1 z-50 hidden group-hover:block min-w-[120px]">
                    <button onClick={() => exportCache('csv')} className="w-full text-left px-3 py-1.5 text-xs text-foreground-700 hover:bg-background-50 flex items-center gap-2 cursor-pointer whitespace-nowrap">
                      <i className="ri-file-excel-2-line text-emerald-600"></i>CSV
                    </button>
                    <button onClick={() => exportCache('json')} className="w-full text-left px-3 py-1.5 text-xs text-foreground-700 hover:bg-background-50 flex items-center gap-2 cursor-pointer whitespace-nowrap">
                      <i className="ri-code-line text-amber-600"></i>JSON
                    </button>
                  </div>
                </div>
              )}
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-primary-500">{insights.monthlyOutput}{t('/mois', '/mo')}</div>
                <div className="text-xs text-foreground-500">{t('Publications', 'Publications')}</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-accent-500">{research.kpis.scoreQualite}/10</div>
                <div className="text-xs text-foreground-500">{t('Score Qualité', 'Quality Score')}</div>
              </div>
              <div className="text-center px-4 py-3 bg-background-50 rounded-lg border border-background-200/70">
                <div className="text-2xl font-bold text-foreground-950">{kpis.scoreAutorite.current}/100</div>
                <div className="text-xs text-foreground-500">{t('Score Autorité', 'Authority Score')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background-50 border-b border-background-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id ? 'bg-foreground-950 text-background-50' : 'text-foreground-600 hover:bg-background-100'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ===== ONGLET 1 : KHEPRA INSIGHTS ===== */}
        {activeTab === 'insights' && (
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-2">{isEn ? 'KHEPRA Insights™' : insights.title}</h2>
            <p className="text-sm text-foreground-600 mb-8">{isEn ? 'Continuous intellectual production engine — Analyses across 6 regulatory and sectoral domains' : insights.description}</p>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{formatNumber(insights.totalPublications)}</div>
                <div className="text-[10px] text-foreground-500">{t('Publications', 'Publications')}</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{formatNumber(insights.totalDownloads)}</div>
                <div className="text-[10px] text-foreground-500">{t('Téléchargements', 'Downloads')}</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{insights.totalCitations}</div>
                <div className="text-[10px] text-foreground-500">{t('Citations', 'Citations')}</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">{insights.monthlyOutput}</div>
                <div className="text-[10px] text-foreground-500">{t('Par mois', 'Per month')}</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-foreground-950">6</div>
                <div className="text-[10px] text-foreground-500">{t('Domaines', 'Domains')}</div>
              </div>
              <div className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                <div className="text-lg font-bold text-accent-500">{insights.geoPresence.split('•')[0].trim()}</div>
                <div className="text-[10px] text-foreground-500">{t('Présence ChatGPT', 'ChatGPT Presence')}</div>
              </div>
            </div>

            {/* Domain Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.domains.map((domain) => (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                  className={`p-5 bg-background-50 rounded-lg border cursor-pointer transition-colors ${
                    selectedDomain === domain.id ? 'border-primary-300 bg-primary-50/30' : 'border-background-200/70 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      <i className={`${domain.icon} text-primary-600 text-lg`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground-950">
                        {getTranslated(domain.name, translatedDomains)}
                        {isEn && translatedDomains[domain.name] && (
                          <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-foreground-500 mt-0.5">
                        <span>{domain.publications.total} {t('publications', 'pub.')}</span>
                        <span>·</span>
                        <span>{domain.publications.thisMonth} {t('ce mois', 'this mo.')}</span>
                        <span>·</span>
                        <span>{domain.publications.weekly}{t('/sem', '/wk')}</span>
                      </div>
                      {isEn && !translatedDomains[domain.name] && (
                        <button
                          onClick={(e) => { e.stopPropagation(); translateSingle(domain.name, translatedDomains, setTranslatedDomains); }}
                          className="mt-1 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                        >{t('Traduire', 'Translate')}</button>
                      )}
                    </div>
                  </div>
                  {selectedDomain === domain.id && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-background-200/70">
                      {domain.topAnalyses.map((a, i) => (
                        <div key={i} className="p-3 bg-background-100 rounded-lg">
                          <h4 className="text-xs font-semibold text-foreground-950 leading-relaxed">
                            {getTranslated(a.title, translatedAnalyses)}
                            {isEn && translatedAnalyses[a.title] && (
                              <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                            )}
                          </h4>
                          {isEn && !translatedAnalyses[a.title] && (
                            <button
                              onClick={(e) => { e.stopPropagation(); translateSingle(a.title, translatedAnalyses, setTranslatedAnalyses); }}
                              className="mt-1 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                            >{t('Traduire', 'Translate')}</button>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-500">
                            <span>{new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                            <span><i className="ri-download-line mr-0.5"></i>{formatNumber(a.downloads)}</span>
                            <span><i className="ri-chat-quote-line mr-0.5"></i>{a.citations}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ONGLET 2 : RESEARCH INSTITUTE ===== */}
        {activeTab === 'research' && (
          <div>
            <h2 className="text-xl font-bold text-foreground-950 mb-2">{isEn ? 'KHEPRA Research Institute™' : research.title}</h2>
            <p className="text-sm text-foreground-600 mb-8">{isEn ? 'Applied research center — Barometers, benchmarks, observatories, white papers, annual reports' : research.description}</p>
            {/* Research KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { label: t('Publications/an', 'Pub./year'), value: research.kpis.publicationsAnnuelles, icon: 'ri-file-text-line' },
                { label: t('Citations Académiques', 'Academic Citations'), value: research.kpis.citationsAcademiques, icon: 'ri-chat-quote-line' },
                { label: t('Partenaires', 'Partners'), value: research.kpis.partenaires, icon: 'ri-group-line' },
                { label: t('Téléchargements', 'Downloads'), value: formatNumber(research.kpis.telechargements), icon: 'ri-download-line' },
                { label: t('ROI Recherche', 'Research ROI'), value: research.kpis.roiRecherche, icon: 'ri-funds-line' },
                { label: t('Score Qualité', 'Quality Score'), value: research.kpis.scoreQualite + '/10', icon: 'ri-star-line' },
              ].map((stat, i) => (
                <div key={i} className="p-3 bg-background-50 rounded-lg border border-background-200/70 text-center">
                  <i className={`${stat.icon} text-foreground-400 text-sm mb-1 block`}></i>
                  <div className="text-lg font-bold text-foreground-950">{stat.value}</div>
                  <div className="text-[10px] text-foreground-500">{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Flagship Publications */}
            <h3 className="text-sm font-bold text-foreground-950 mb-4">
              {t('Publications Phares', 'Flagship Publications')} — {research.flagshipPublications.length} {t('publications majeures', 'major publications')}
            </h3>
            <div className="space-y-3 mb-8">
              {research.flagshipPublications.map((pub) => (
                <div
                  key={pub.id}
                  onClick={() => setSelectedPub(selectedPub === pub.id ? null : pub.id)}
                  className={`p-4 bg-background-50 rounded-lg border cursor-pointer transition-colors ${
                    selectedPub === pub.id ? 'border-accent-300 bg-accent-50/30' : 'border-background-200/70 hover:border-background-300/60'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-700 font-medium whitespace-nowrap">{pub.type}</span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground-950 truncate">
                          {getTranslated(pub.title, translatedPubs)}
                          {isEn && translatedPubs[pub.title] && (
                            <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                          )}
                        </h4>
                        {isEn && !translatedPubs[pub.title] && (
                          <button
                            onClick={(e) => { e.stopPropagation(); translateSingle(pub.title, translatedPubs, setTranslatedPubs); }}
                            className="mt-0.5 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                          >{t('Traduire', 'Translate')}</button>
                        )}
                        <span className="text-[10px] text-foreground-500">{pub.period} · {pub.pages} {t('pages', 'p.')} · {formatNumber(pub.downloads)} {t('tél.', 'dls')} · {pub.citations} {t('citations', 'cit.')}</span>
                      </div>
                    </div>
                    {pub.labellisation !== '—' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium whitespace-nowrap">
                        <i className="ri-verified-badge-line mr-0.5"></i>{pub.labellisation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Partners */}
            <h3 className="text-sm font-bold text-foreground-950 mb-4">{t('Partenaires de Recherche', 'Research Partners')}</h3>
            <div className="flex flex-wrap gap-2">
              {research.partners.map((p, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-background-100 text-foreground-600 border border-background-200/70">
                  <i className="ri-building-2-line text-foreground-400"></i>
                  {p.name}
                  <span className="text-[10px] text-foreground-400">· {p.collaborations} collab.</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===== ONGLET 3 : PIPELINE ÉDITORIAL ===== */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {/* Monthly Output */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">{t('Production Mensuelle 2026', 'Monthly Output 2026')}</h3>
              <div className="bg-background-50 rounded-lg border border-background-200/70 p-6 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-background-200/70">
                      <th className="text-left py-2 px-3 text-foreground-500 font-medium">{t('Mois', 'Month')}</th>
                      <th className="text-right py-2 px-3 text-foreground-500 font-medium">{t('Articles', 'Articles')}</th>
                      <th className="text-right py-2 px-3 text-foreground-500 font-medium">{t('Études', 'Studies')}</th>
                      <th className="text-right py-2 px-3 text-foreground-500 font-medium">{t('Livres Blancs', 'White Papers')}</th>
                      <th className="text-right py-2 px-3 text-foreground-500 font-medium">{t('Notes Rég.', 'Reg. Notes')}</th>
                      <th className="text-right py-2 px-3 text-foreground-500 font-medium">{t('Total', 'Total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publications.pipeline.map((m, i) => {
                      const total = m.articles + m.etudes + m.livresBlancs + m.notesReglementaires;
                      return (
                        <tr key={i} className="border-b border-background-100 hover:bg-background-100">
                          <td className="py-2 px-3 font-medium text-foreground-950">{m.month}</td>
                          <td className="py-2 px-3 text-right text-foreground-700">{m.articles}</td>
                          <td className="py-2 px-3 text-right text-foreground-700">{m.etudes}</td>
                          <td className="py-2 px-3 text-right text-foreground-700">{m.livresBlancs}</td>
                          <td className="py-2 px-3 text-right text-foreground-700">{m.notesReglementaires}</td>
                          <td className="py-2 px-3 text-right font-bold text-foreground-950">{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formats */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">{t('Formats Éditoriaux', 'Editorial Formats')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {publications.formats.map((f, i) => (
                  <div key={i} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <h4 className="text-sm font-semibold text-foreground-950 mb-2">
                      {getTranslated(f.name, translatedFormats)}
                      {isEn && translatedFormats[f.name] && (
                        <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                      )}
                    </h4>
                    {isEn && !translatedFormats[f.name] && (
                      <button
                        onClick={() => translateSingle(f.name, translatedFormats, setTranslatedFormats)}
                        className="mb-2 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                      >{t('Traduire', 'Translate')}</button>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-foreground-500">{t('Cadence', 'Cadence')} :</span>
                        <span className="font-bold text-foreground-700 ml-1">{f.cadence}</span>
                      </div>
                      <div>
                        <span className="text-foreground-500">{t('Longueur', 'Length')} :</span>
                        <span className="font-bold text-foreground-700 ml-1">{f.length}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-foreground-500">Score SEO :</span>
                          <span className={`text-xs font-bold ${f.seoScore >= 95 ? 'text-green-600' : 'text-amber-600'}`}>{f.seoScore}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-background-200/70 rounded-full overflow-hidden mt-1">
                          <div className={`h-full rounded-full ${f.seoScore >= 95 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${f.seoScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <h3 className="text-sm font-bold text-foreground-950 mb-4">KPIs Thought Leadership</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(kpis).map(([key, kpi]) => (
                  <div key={key} className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                    <div className="text-[10px] text-foreground-500 capitalize">{t(key.replace(/([A-Z])/g, ' $1').trim(), key.replace(/([A-Z])/g, ' $1').trim())}</div>
                    <div className="text-lg font-bold text-foreground-950">{kpi.current}{kpi.unit === '%' ? '%' : kpi.unit === '/100' ? '/100' : ''}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] font-medium ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-foreground-500'}`}>{kpi.trend}</span>
                      <span className="text-[10px] text-foreground-400">{t('Cible', 'Target')} {kpi.target}{kpi.unit === '%' ? '%' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET 4 : THINKERS & FELLOWS ===== */}
        {activeTab === 'contributors' && (
          <div>
            <h3 className="text-sm font-bold text-foreground-950 mb-6">{contributors.length} {t('Penseurs & Senior Fellows', 'Thinkers & Senior Fellows')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contributors.map((c) => (
                <div key={c.id} className="p-5 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                    <span className="text-primary-600 font-bold text-sm">{c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground-950 mb-1">{c.name}</h4>
                  <p className="text-[10px] text-accent-500 font-medium mb-2">{c.role}</p>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-3">
                    {getTranslated(c.expertise, translatedContribs)}
                    {isEn && translatedContribs[c.expertise] && (
                      <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded bg-emerald-100 text-emerald-700">EN</span>
                    )}
                  </p>
                  {isEn && !translatedContribs[c.expertise] && (
                    <button
                      onClick={() => translateSingle(c.expertise, translatedContribs, setTranslatedContribs)}
                      className="mb-2 text-[10px] text-accent-600 hover:text-accent-800 font-medium cursor-pointer"
                    >{t('Traduire', 'Translate')}</button>
                  )}
                  <div className="flex items-center gap-3 text-[10px] text-foreground-500 mb-2">
                    <span><i className="ri-article-line mr-0.5"></i>{c.publications} {t('pub.', 'pub.')}</span>
                    <span><i className="ri-chat-quote-line mr-0.5"></i>{c.citations} {t('cit.', 'cit.')}</span>
                  </div>
                  <span className="text-[10px] text-foreground-400 italic">{c.affiliation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer KPIs */}
      <section className="border-t border-background-200/70 bg-background-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h4 className="text-sm font-bold text-foreground-950 mb-6">{t('Métriques', 'Metrics')} — KOS Thought Leadership Center™</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">{t('Publications/Mois', 'Pub./Month')}</div>
              <div className="text-lg font-bold text-primary-500">{kpis.publicationsParMois.current}</div>
              <div className="text-xs text-foreground-400 mt-2">{kpis.publicationsParMois.trend}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">{t('Téléchargements Cumulés', 'Cumulative Downloads')}</div>
              <div className="text-lg font-bold text-accent-500">{formatNumber(kpis.telechargements.current)}</div>
              <div className="text-xs text-foreground-400 mt-2">{kpis.telechargements.trend}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">{t('Citations IA/Mois', 'AI Citations/Mo')}</div>
              <div className="text-lg font-bold text-secondary-500">{formatNumber(kpis.citationsIA.current)}</div>
              <div className="text-xs text-foreground-400 mt-2">{kpis.citationsIA.trend}</div>
            </div>
            <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
              <div className="text-xs text-foreground-500 mb-2">{t('Score Autorité', 'Authority Score')}</div>
              <div className="text-lg font-bold text-amber-500">{kpis.scoreAutorite.current}/100</div>
              <div className="text-xs text-foreground-400 mt-2">{t('Cible', 'Target')} {kpis.scoreAutorite.target}</div>
            </div>
          </div>
        </div>
      </section>
    </KOSHubLayout>
  );
}