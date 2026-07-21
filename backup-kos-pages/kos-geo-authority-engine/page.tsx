import { useState } from 'react';
import hubLayout from '@/components/feature/hubLayout';
import { useGEOAuthorityV3 } from '@/hooks/useGEOAuthorityV3';

type GEOTab = 'pillars' | 'faqs' | 'glossary' | 'guides' | 'cases' | 'schema' | 'kpis';

function CircularGauge({ value, size = 40, strokeWidth = 4, color = 'primary' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const colorClass = color === 'accent' ? 'stroke-accent-500' : color === 'secondary' ? 'stroke-secondary-500' : color === 'emerald' ? 'stroke-emerald-500' : 'stroke-primary-500';
  return <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-background-200" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" className={`${colorClass} transition-all duration-700`} style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg><span className="absolute text-[10px] font-bold text-foreground-950">{value}</span></div>;
}

function BarGauge({ value, color = 'primary' }: { value: number; color?: string }) {
  const colorClass = color === 'accent' ? 'bg-accent-500' : color === 'secondary' ? 'bg-secondary-500' : color === 'emerald' ? 'bg-emerald-500' : 'bg-primary-500';
  return <div className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden"><div className={`h-full ${colorClass} rounded-full transition-all duration-500`} style={{ width: `${value}%` }}></div></div>;
}

function AIEngineBadges({ scores }: { scores: { chatgpt: number; gemini: number; claude: number; perplexity: number; copilot: number } }) {
  const engines = [
    { name: 'ChatGPT', score: scores.chatgpt, icon: 'ri-openai-line' },
    { name: 'Gemini', score: scores.gemini, icon: 'ri-google-line' },
    { name: 'Claude', score: scores.claude, icon: 'ri-sparkling-2-line' },
    { name: 'Perplexity', score: scores.perplexity, icon: 'ri-search-eye-line' },
    { name: 'Copilot', score: scores.copilot, icon: 'ri-microsoft-line' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {engines.map(e => (
        <div key={e.name} className="flex items-center gap-1.5 bg-background-100 rounded-full px-2.5 py-1">
          <span className="text-[10px] font-medium text-foreground-700">{e.name}</span>
          <span className={`text-[10px] font-bold ${e.score >= 90 ? 'text-emerald-600' : e.score >= 80 ? 'text-accent-600' : e.score >= 70 ? 'text-secondary-600' : 'text-red-500'}`}>{e.score}</span>
        </div>
      ))}
    </div>
  );
}

function formatNumber(v: number): string { if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`; if (v >= 1000) return `${(v / 1000).toFixed(1)}k`; return v.toLocaleString('fr-FR'); }

export default function gEOAuthorityPage() {
  const { pillarPages, faqs, glossary, guides, caseStudies, structuredData, agents, globalMetrics: m, loading, error, refetch } = useGEOAuthorityV3();
  const [activeTab, setActiveTab] = useState<GEOTab>('pillars');
  const [selectedTopic, setSelectedTopic] = useState<string>('Tous');

  const allTopics = ['Tous', 'BCEAO', 'UEMOA', 'OHADA', 'ESG', 'Microfinance', 'Fintech'];

  const tabs = [
    { id: 'pillars' as GEOTab, label: 'Pages Piliers', icon: 'ri-layout-column-line', count: pillarPages.length, color: 'primary' as const },
    { id: 'faqs' as GEOTab, label: 'FAQs GEO', icon: 'ri-question-answer-line', count: faqs.length, color: 'accent' as const },
    { id: 'glossary' as GEOTab, label: 'Glossaire', icon: 'ri-book-read-line', count: glossary.length, color: 'secondary' as const },
    { id: 'guides' as GEOTab, label: 'Guides', icon: 'ri-file-text-line', count: guides.length, color: 'emerald' as const },
    { id: 'cases' as GEOTab, label: 'Cas Pratiques', icon: 'ri-briefcase-line', count: caseStudies.length, color: 'accent' as const },
    { id: 'schema' as GEOTab, label: 'Données Structurées', icon: 'ri-code-s-slash-line', count: structuredData.length, color: 'secondary' as const },
    { id: 'kpis' as GEOTab, label: 'KPIs & SOV', icon: 'ri-radar-line', count: 6, color: 'primary' as const },
  ];

  const filteredItems = <T extends { topic: string }>(items: T[]) => selectedTopic === 'Tous' ? items : items.filter(i => i.topic === selectedTopic);

  if (loading) return <hubLayout hubId={71} activeTab="pillars" tabLabel="GEO Authority 3.0"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center py-20"><div className="flex items-center gap-3 text-foreground-500"><div className="w-5 h-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div><span className="text-sm">Chargement GEO Authority 3.0...</span></div></div></hubLayout>;
  if (error && pillarPages.length === 0) return <hubLayout hubId={71} activeTab="pillars" tabLabel="GEO Authority 3.0"><div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col items-center justify-center py-20 gap-4"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><i className="ri-error-warning-line text-xl"></i></div><button onClick={refetch} className="px-4 py-2 rounded-full bg-primary-500 text-background-50 text-xs font-medium hover:bg-primary-600 cursor-pointer whitespace-nowrap"><i className="ri-refresh-line mr-1.5"></i>Réessayer</button></div></hubLayout>;

  return (
    <hubLayout hubId={71} activeTab={activeTab} tabLabel="GEO Authority 3.0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs tracking-widest uppercase text-foreground-500 bg-background-100 px-3 py-1 rounded-full">Master Prompt 2 — Big Four</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">GEO Authority Engine 3.0&trade;</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground-950">GEO Authority Engine 3.0&trade;</h1>
          <p className="text-foreground-600 mt-2 max-w-4xl text-sm md:text-base leading-relaxed">Programme GEO niveau Big Four : 6 thématiques × 5 types de contenu × 5 moteurs IA. 75 000 FAQs, 6 pages piliers, 24 glossaires, 6 guides, 6 cas pratiques, 12 types Schema.org. 24 800+ citations IA/mois. Leader GEO Afrique francophone.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">ChatGPT</p><span className="text-xl font-bold text-foreground-950">{m.presence_chatgpt}%</span><p className="text-[10px] text-foreground-500">SOV {m.sov_chatgpt}%</p></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Gemini</p><span className="text-xl font-bold text-foreground-950">{m.presence_gemini}%</span><p className="text-[10px] text-foreground-500">Présence</p></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Claude</p><span className="text-xl font-bold text-foreground-950">{m.presence_claude}%</span><p className="text-[10px] text-foreground-500">Présence</p></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Perplexity</p><span className="text-xl font-bold text-foreground-950">{m.presence_perplexity}%</span><p className="text-[10px] text-foreground-500">SOV {m.sov_perplexity}%</p></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Copilot</p><span className="text-xl font-bold text-foreground-950">{m.presence_copilot}%</span><p className="text-[10px] text-foreground-500">En croissance</p></div>
          <div className="bg-background-100 rounded-lg p-4 flex flex-col gap-1"><p className="text-[10px] uppercase tracking-wider text-foreground-500">Citations IA/mois</p><span className="text-xl font-bold text-foreground-950">{formatNumber(m.citations_ia_mois)}</span><p className="text-[10px] text-foreground-500">+80% vs Q1</p></div>
        </div>

        {/* Topic Filter */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-foreground-500 mr-1">Thématique :</span>
          {allTopics.map(t => (
            <button key={t} onClick={() => setSelectedTopic(t)} className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors border ${selectedTopic === t ? 'bg-primary-500 text-background-50 border-primary-500' : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}>{t}</button>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors border ${activeTab === t.id ? (t.color === 'accent' ? 'bg-accent-500 text-background-50 border-accent-500' : t.color === 'secondary' ? 'bg-secondary-500 text-background-50 border-secondary-500' : t.color === 'emerald' ? 'bg-emerald-500 text-background-50 border-emerald-500' : 'bg-primary-500 text-background-50 border-primary-500') : 'bg-background-50 text-foreground-700 border-background-200 hover:bg-background-100'}`}><i className={`${t.icon} text-sm`}></i><span>{t.label}</span><span className="opacity-60 text-[10px]">{t.count}</span></button>
          ))}
        </div>

        {/* PILLAR PAGES */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredItems(pillarPages).map(p => (
              <div key={p.id} className="bg-background-50 border border-background-200/60 rounded-lg p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><span className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-200">{p.topic}</span><span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'Publié' ? 'bg-emerald-100 text-emerald-700' : p.status === 'En cours' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'}`}>{p.status}</span></div>
                    <h4 className="text-sm font-semibold text-foreground-950 leading-tight">{p.title}</h4>
                    <p className="text-xs text-foreground-600 mt-1.5 leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                  <CircularGauge value={p.score_geo} size={42} strokeWidth={4} color="primary" />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-lg font-bold text-foreground-950">{p.sections}</span><p className="text-[9px] text-foreground-500">Sections</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-lg font-bold text-foreground-950">{formatNumber(p.wordCount)}</span><p className="text-[9px] text-foreground-500">Mots</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-lg font-bold text-foreground-950">{formatNumber(p.citations_ia)}</span><p className="text-[9px] text-foreground-500">Citations</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-lg font-bold text-foreground-950">{p.structuredData.length}</span><p className="text-[9px] text-foreground-500">Schema</p></div>
                </div>
                <AIEngineBadges scores={p.optimization} />
              </div>
            ))}
          </div>
        )}

        {/* FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-3">
            {filteredItems(faqs).map(f => (
              <div key={f.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1"><h4 className="text-sm font-semibold text-foreground-950 leading-tight">{f.question}</h4><p className="text-xs text-foreground-600 mt-1.5 leading-relaxed line-clamp-3">{f.reponse}</p></div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-3 pt-2 border-t border-background-200/50">
                  <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{f.topic}</span>
                  <span className="text-[10px] text-foreground-500">Source : {f.source}</span>
                  <span className="text-[10px] text-foreground-500 flex items-center gap-1"><i className="ri-robot-2-line text-xs"></i>{formatNumber(f.citations_ia)}</span>
                  <div className="ml-auto"><CircularGauge value={f.score_geo} size={32} strokeWidth={3} color="accent" /></div>
                </div>
                <div className="mt-2"><AIEngineBadges scores={f.optimization} /></div>
              </div>
            ))}
          </div>
        )}

        {/* GLOSSAIRE */}
        {activeTab === 'glossary' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredItems(glossary).map(g => (
              <div key={g.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200">{g.topic}</span>
                  {g.abbreviation !== '—' && <span className="text-[10px] bg-foreground-100 text-foreground-600 px-1.5 py-0.5 rounded font-mono">{g.abbreviation}</span>}
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{g.term}</h4>
                <p className="text-xs text-foreground-600 leading-relaxed line-clamp-4">{g.definition}</p>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-background-200/50 flex-wrap">
                  <span className="text-[10px] text-foreground-500 flex items-center gap-1"><i className="ri-robot-2-line text-xs"></i>{formatNumber(g.citations_ia)}</span>
                  {g.relatedTerms.slice(0, 2).map(t => <span key={t} className="text-[10px] text-foreground-400 bg-background-100 px-1.5 py-0.5 rounded">{t}</span>)}
                  <div className="ml-auto"><CircularGauge value={g.score_geo} size={28} strokeWidth={3} color="secondary" /></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GUIDES */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems(guides).map(g => (
              <div key={g.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">{g.topic}</span>
                  <CircularGauge value={g.score_geo} size={36} strokeWidth={3} color="emerald" />
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1.5">{g.title}</h4>
                <p className="text-xs text-foreground-600 leading-relaxed line-clamp-3 mb-3">{g.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{g.chapters}</span><p className="text-[9px] text-foreground-500">Chap.</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{g.pages}</span><p className="text-[9px] text-foreground-500">Pages</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{formatNumber(g.downloads)}</span><p className="text-[9px] text-foreground-500">D/L</p></div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${g.status === 'Publié' ? 'bg-emerald-100 text-emerald-700' : g.status === 'En cours' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'}`}>{g.status}</span>
                  <span className="text-[10px] text-foreground-500">{g.format}</span>
                  <span className="text-[10px] text-foreground-500 ml-auto">{formatNumber(g.citations_ia)} citations</span>
                </div>
                <AIEngineBadges scores={g.optimization} />
              </div>
            ))}
          </div>
        )}

        {/* CAS PRATIQUES */}
        {activeTab === 'cases' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredItems(caseStudies).map(c => (
              <div key={c.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full border border-accent-200">{c.topic}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{c.status}</span>
                  <span className="text-[10px] text-foreground-500 ml-auto">{formatNumber(c.citations_ia)} citations</span>
                  <CircularGauge value={c.score_geo} size={32} strokeWidth={3} color="accent" />
                </div>
                <h4 className="text-sm font-semibold text-foreground-950 mb-1">{c.title}</h4>
                <p className="text-[11px] text-foreground-500 mb-2">Client : {c.client}</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-background-100 rounded p-2"><span className="font-semibold text-foreground-800">Défi :</span> <span className="text-foreground-600 leading-relaxed">{c.challenge}</span></div>
                  <div className="bg-background-100 rounded p-2"><span className="font-semibold text-foreground-800">Solution :</span> <span className="text-foreground-600 leading-relaxed line-clamp-3">{c.solution}</span></div>
                  <div className="bg-emerald-50 border border-emerald-200/60 rounded p-2"><span className="font-semibold text-emerald-800">Résultats :</span> <span className="text-emerald-700 leading-relaxed line-clamp-3">{c.results}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STRUCTURED DATA */}
        {activeTab === 'schema' && (
          <div className="space-y-3">
            {filteredItems(structuredData).map(s => (
              <div key={s.id} className="bg-background-50 border border-background-200/60 rounded-lg p-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600"><i className="ri-code-s-slash-line text-lg"></i></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-foreground-950">{s.type}</span>
                      <span className="text-[10px] bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200">{s.topic}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.status === 'Déployé' ? 'bg-emerald-100 text-emerald-700' : s.status === 'Partiel' ? 'bg-accent-100 text-accent-700' : 'bg-background-200 text-foreground-600'}`}>{s.status}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{s.pages}</span><p className="text-[9px] text-foreground-500">Pages</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{s.richResults}</span><p className="text-[9px] text-foreground-500">Rich Results</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{formatNumber(s.impressions)}</span><p className="text-[9px] text-foreground-500">Impressions</p></div>
                  <div className="bg-background-100 rounded p-2 text-center"><span className="text-sm font-bold text-foreground-950">{s.ctr}%</span><p className="text-[9px] text-foreground-500">CTR</p></div>
                </div>
                <div className="text-[10px] text-foreground-500 mt-2">Validé : {s.lastValidated} · Erreurs : {s.errors}</div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs */}
        {activeTab === 'kpis' && (
          <div className="space-y-6">
            {/* SOV Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">Score GEO</p>
                <CircularGauge value={m.score_geo_global} size={56} strokeWidth={5} color="primary" />
                <p className="text-[10px] text-foreground-500 mt-1">Global</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">Share of Voice</p>
                <span className="text-2xl font-bold text-foreground-950">{m.share_of_voice}%</span>
                <p className="text-[10px] text-foreground-500 mt-1">Marché cible</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">SOV ChatGPT</p>
                <span className="text-2xl font-bold text-foreground-950">{m.sov_chatgpt}%</span>
                <p className="text-[10px] text-foreground-500 mt-1">Leader</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">SOV Perplexity</p>
                <span className="text-2xl font-bold text-foreground-950">{m.sov_perplexity}%</span>
                <p className="text-[10px] text-foreground-500 mt-1">En croissance</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">Featured Snippets</p>
                <span className="text-2xl font-bold text-foreground-950">{m.featured_snippets}</span>
                <p className="text-[10px] text-foreground-500 mt-1">Actifs</p>
              </div>
              <div className="bg-background-50 border border-background-200/60 rounded-lg p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-foreground-500 mb-2">Knowledge Panels</p>
                <span className="text-2xl font-bold text-foreground-950">{m.knowledge_panels}</span>
                <p className="text-[10px] text-foreground-500 mt-1">Google KG</p>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Share of Voice par Thématique</h3>
              <div className="space-y-3">
                {m.topicBreakdown.map(tb => (
                  <div key={tb.topic} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-foreground-800 w-28 whitespace-nowrap">{tb.topic}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <BarGauge value={tb.sov} color={tb.sov >= 45 ? 'emerald' : tb.sov >= 38 ? 'primary' : 'secondary'} />
                      <span className="text-xs font-bold text-foreground-950 w-8 text-right">{tb.sov}%</span>
                    </div>
                    <span className="text-[10px] text-foreground-500 w-20 text-right">{tb.faqs.toLocaleString()} FAQs</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Inventory */}
            <div className="bg-background-50 border border-background-200/60 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-foreground-950 mb-4">Inventaire Contenu GEO</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{formatNumber(m.total_faq)}</span><p className="text-[10px] text-foreground-500">FAQs</p></div>
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{m.total_pillar_pages}</span><p className="text-[10px] text-foreground-500">Pages Piliers</p></div>
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{m.total_glossary_terms}</span><p className="text-[10px] text-foreground-500">Glossaires</p></div>
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{m.total_guides}</span><p className="text-[10px] text-foreground-500">Guides</p></div>
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{m.total_case_studies}</span><p className="text-[10px] text-foreground-500">Cas Pratiques</p></div>
                <div className="bg-background-100 rounded-lg p-3 text-center"><span className="text-xl font-bold text-foreground-950">{m.total_structured_data_types}</span><p className="text-[10px] text-foreground-500">Schema Types</p></div>
              </div>
            </div>

            {/* Agents Banner */}
            <div className="bg-accent-100/50 rounded-lg border border-accent-200/40 p-5">
              <h3 className="text-sm font-semibold text-accent-900 mb-3 flex items-center gap-2"><i className="ri-robot-2-line"></i>Agents GEO — {agents.length} en production</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {agents.map(a => (
                  <div key={a.id} className="bg-background-50 rounded-lg p-3 border border-accent-200/30">
                    <div className="flex items-center gap-2 mb-1.5"><div className="w-8 h-8 rounded-md bg-accent-100 flex items-center justify-center text-accent-600"><i className={`${a.icon} text-sm`}></i></div><span className="text-xs font-semibold text-foreground-950">{a.nom}</span></div>
                    <p className="text-[10px] text-foreground-600 line-clamp-2">{a.mission}</p>
                    <div className="flex items-center gap-2 mt-2"><span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{a.statut}</span><span className="text-[10px] text-foreground-500">{formatNumber(a.faq_generees)} générées</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 p-5 bg-primary-100/50 rounded-lg border border-primary-200/40">
          <div className="flex items-center gap-2 mb-3"><i className="ri-radar-line text-primary-700 text-lg"></i><span className="text-sm font-semibold text-primary-900">GEO Authority Engine 3.0&trade; — Visibilité IA Générative · Niveau Big Four</span></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-primary-800/70">
            <span><strong>{formatNumber(m.total_faq)}</strong> FAQs</span><span><strong>{m.presence_chatgpt}%</strong> ChatGPT</span><span><strong>{m.share_of_voice}%</strong> SOV</span><span><strong>{formatNumber(m.citations_ia_mois)}</strong> citations/mois</span>
          </div>
        </div>
      </div>
    </hubLayout>
  );
}





