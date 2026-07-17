import { useState, useCallback } from 'react';
import KOSHubLayout from '@/components/feature/KOSHubLayout';
import { useIntelligenceCenter } from '@/hooks/useIntelligenceCenter';
import TranslateToggle from '@/components/feature/TranslateToggle';
import { useRAGTranslation } from '@/hooks/useRAGTranslation';

type ICTab = 'publications' | 'agents' | 'kpis';

function CircularGauge({ value, size = 48, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : 'stroke-primary-500';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} />
      </svg>
      <span className="absolute text-xs font-bold text-foreground-950">{value}</span>
    </div>
  );
}

function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const m: Record<string, string> = {
    'Publié': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En relecture': 'bg-purple-100 text-purple-700 border-purple-200',
    'En rédaction': 'bg-amber-100 text-amber-700 border-amber-200',
    'Planifié': 'bg-secondary-100 text-secondary-600 border-secondary-200',
    'Actif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'En déploiement': 'bg-primary-100 text-primary-700 border-primary-200',
    'En révision': 'bg-purple-100 text-purple-700 border-purple-200',
  };
  return <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${m[variant] || 'bg-background-200 text-foreground-700 border-background-200'}`}>{label}</span>;
}

function formatNumber(v: number): string { if (v >= 1000) return `${(v / 1000).toFixed(1)}k`; return v.toLocaleString('fr-FR'); }

export default function KOSIntelligenceCenterPage() {
  const { publications, agents, globalMetrics, loading, error, refetch } = useIntelligenceCenter();
  const [activeTab, setActiveTab] = useState<ICTab>('publications');
  const m = globalMetrics;

  // Translation
  const { lang, setLang, isEn, t, translateBatch, targetLang, setTargetLang, targetLabels, exportCache, cacheCount } = useRAGTranslation();
  const [translatedItems, setTranslatedItems] = useState<Record<string, { titre?: string; mission?: string }>>({});
  const [translatingAll, setTranslatingAll] = useState(false);

  const handleTranslateAll = useCallback(async () => {
    if (!isEn) return;
    setTranslatingAll(true);
    const batch: string[] = [];
    const newTranslated: Record<string, { titre?: string; mission?: string }> = { ...translatedItems };
    for (const pub of publications) {
      if (!newTranslated[pub.id]) {
        batch.push(pub.titre);
      }
    }
    for (const agent of agents) {
      if (!newTranslated[`agent-${agent.id}`]) {
        batch.push(agent.mission);
      }
    }
    if (batch.length === 0) { setTranslatingAll(false); return; }
    try {
      const translated = await translateBatch(batch);
      let idx = 0;
      for (const pub of publications) {
        if (!newTranslated[pub.id] && idx < translated.length) {
          newTranslated[pub.id] = { titre: translated[idx] };
          idx++;
        }
      }
      for (const agent of agents) {
        if (!newTranslated[`agent-${agent.id}`] && idx < translated.length) {
          newTranslated[`agent-${agent.id}`] = { mission: translated[idx] };
          idx++;
        }
      }
      setTranslatedItems(newTranslated);
    } catch { /* silent */ }
    setTranslatingAll(false);
  }, [isEn, publications, agents, translatedItems, translateBatch]);

  const tabs = [
    { id: 'publications' as ICTab, label: 'Publications', icon: 'ri-article-line', count: publications.length, color: 'primary' as const },
    { id: 'agents' as ICTab, label: 'Agents IC', icon: 'ri-robot-2-line', count: agents.length, color: 'accent' as const },
    { id: 'kpis' as ICTab, label: 'KPIs', icon: 'ri-bar-chart-2-line', count: 6, color: 'secondary' as const },
  ];

  if (loading) return <KOSHubLayout hubId={70} activeTab="publications" tabLabel="Intelligence Center"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement Intelligence Center...</span></div></div></KOSHubLayout>;
  if (error && publications.length === 0) return <KOSHubLayout hubId={70} activeTab="publications" tabLabel="Intelligence Center"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><p className="text-sm text-red-700 font-medium">Erreur</p><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></KOSHubLayout>;

  return (
    <KOSHubLayout hubId={70} activeTab={activeTab} tabLabel="Intelligence Center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Bloc 02 — Master Plan</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Phase 1 — Fondations</span>
            </div>
            <TranslateToggle lang={lang} setLang={setLang} targetLang={targetLang} setTargetLang={setTargetLang} targetLabels={targetLabels} size="sm" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">KHEPRA Intelligence Center&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">{t('Centre de production intellectuelle Big Four : 500 articles/an, 100 notes, 50 études, 25 livres blancs, 12 rapports. 4 agents IA (Recherche, Veille, Rédaction, Fact-Checking). 1 publication/jour, 4 GEO/semaine.', 'Big Four intellectual production center: 500 articles/year, 100 notes, 50 studies, 25 white papers, 12 reports. 4 AI agents (Research, Monitoring, Writing, Fact-Checking). 1 publication/day, 4 GEO/week.')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Articles/an</p><span className="text-xl font-bold text-foreground-950">{m.articles_an}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Notes Rég.</p><span className="text-xl font-bold text-foreground-950">{m.notes_reglementaires_an}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Études</p><span className="text-xl font-bold text-foreground-950">{m.etudes_sectorielles_an}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Livres Blancs</p><span className="text-xl font-bold text-foreground-950">{m.livres_blancs_an}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Publications/jour</p><span className="text-xl font-bold text-foreground-950">{m.publication_jour}</span></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Score Qualité</p><span className="text-xl font-bold text-foreground-950">{m.score_qualite_moyen}/10</span></div>
        </div>

        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 items-center">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>
              <i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span>
            </button>
          ))}
          {isEn && publications.length > 0 && (
            <>
              <button
                onClick={handleTranslateAll}
                disabled={translatingAll}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer border whitespace-nowrap ${
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
                  <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border border-background-200 bg-background-50 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
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

        {activeTab === 'publications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publications.map(p => (
              <div key={p.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4 hover:border-background-300/80 transition-colors">
                <div className="flex items-center gap-2 flex-wrap mb-2"><Badge label={p.type} variant={p.statut} /><Badge label={p.statut} variant={p.statut} /><span className="text-[10px] text-foreground-500 ml-auto">{p.date}</span></div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5 leading-tight">{isEn && translatedItems[p.id]?.titre ? translatedItems[p.id].titre : p.titre}</h4>
                <div className="flex flex-wrap gap-1.5 mb-2"><span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{p.theme}</span>{p.citations > 0 && <span className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{p.citations} citations</span>}</div>
                <div className="flex flex-wrap gap-1 mb-2">{p.canaux.map((c, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{c}</span>)}</div>
                <div className="mt-auto pt-3 border-t border-background-200/50 flex items-center justify-between text-[11px] text-foreground-500">
                  <span className="flex items-center gap-1"><i className="ri-pages-line text-xs"></i>{p.pages}p &bull; {p.auteur}</span>
                  <span className="flex items-center gap-1 text-primary-600 font-medium"><i className="ri-star-line text-xs"></i>{p.score_qualite}/10</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(a => (
              <div key={a.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-lg`}></i></div><div><h4 className="text-sm font-semibold text-foreground-950">{a.nom}</h4><Badge label={a.statut} variant={a.statut} /></div></div>
                <p className="text-xs text-foreground-600 mb-3">{isEn && translatedItems[`agent-${a.id}`]?.mission ? translatedItems[`agent-${a.id}`].mission : a.mission}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.publications_mois}</p><p className="text-[9px] text-foreground-500">Pubs/mois</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><p className="text-lg font-bold text-foreground-950">{a.score_qualite_moyen}/10</p><p className="text-[9px] text-foreground-500">Score Qualité</p></div>
                </div>
                <div className="flex flex-wrap gap-1">{a.specialites.map((s, i) => <span key={i} className="text-[10px] bg-background-200/70 text-foreground-600 px-2 py-0.5 rounded-full">{s}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kpis' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: 'Articles Experts/an', v: m.articles_an, c: '500', s: 'En cours', i: 'ri-article-line' },
              { n: 'Notes Réglementaires/an', v: m.notes_reglementaires_an, c: '100', s: 'En cours', i: 'ri-file-text-line' },
              { n: 'Études Sectorielles/an', v: m.etudes_sectorielles_an, c: '50', s: 'En cours', i: 'ri-file-chart-line' },
              { n: 'Livres Blancs/an', v: m.livres_blancs_an, c: '25', s: 'En cours', i: 'ri-book-open-line' },
              { n: 'Score Qualité Moyen', v: `${m.score_qualite_moyen}/10`, c: '9.5/10', s: 'En cours', i: 'ri-star-line' },
              { n: 'Citations Médias', v: m.citations_medias, c: '500', s: 'En cours', i: 'ri-megaphone-line' },
            ].map(k => (
              <div key={k.n} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${k.i} text-sm`}></i></div><h4 className="text-sm font-semibold text-foreground-950">{k.n}</h4></div>
                <div className="flex items-baseline justify-between mt-2"><span className="text-2xl font-bold text-foreground-950">{k.v}</span><span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-amber-100 text-amber-700 border-amber-200">{k.s}</span></div>
                <p className="text-[10px] text-foreground-500 mt-1">Cible : {k.c}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 p-5 bg-accent-100/50 rounded-lg border border-accent-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-lightbulb-flash-line text-accent-700 text-lg"></i><span className="text-sm font-semibold text-accent-900">KHEPRA Intelligence Center&trade; — Thought Leadership Big Four</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-accent-800/70">
            <span><strong>{m.articles_an}</strong> articles/an</span><span><strong>{m.etudes_sectorielles_an}</strong> études/an</span><span><strong>{m.citations_medias}</strong> citations</span><span><strong>{m.penseurs_affilies}</strong> experts affiliés</span>
          </div>
        </div>
      </div>
    </KOSHubLayout>
  );
}